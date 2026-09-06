/** Client HTTP per la Skillplate External API.
 *
 * Nessuna dipendenza: usa `fetch` nativo (Node >= 18).
 * Il token non viene mai stampato, loggato o incluso nei messaggi di errore.
 */

import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { MissingTokenError, RateLimitError, SkillplateError } from "./errors.js";

export const DEFAULT_BASE_URL = "https://api.skillplate.com/v1/external";
export const DEFAULT_TOKEN_PATH = "~/.config/skillplate/token";
const USER_AGENT = "skillplate-node-client/1.0";

function espandi(percorso) {
  if (!percorso) return percorso;
  return percorso.startsWith("~") ? path.join(os.homedir(), percorso.slice(1)) : percorso;
}

/** Trova il PAT, in ordine: argomento, SKILLPLATE_TOKEN, SKILLPLATE_TOKEN_FILE,
 * `~/.config/skillplate/token`. */
export function resolveToken({ token = null, tokenPath = null, env = process.env } = {}) {
  if (token && token.trim()) return token.trim();

  const daEnv = env.SKILLPLATE_TOKEN;
  if (daEnv && daEnv.trim()) return daEnv.trim();

  for (const candidato of [tokenPath, env.SKILLPLATE_TOKEN_FILE, DEFAULT_TOKEN_PATH]) {
    if (!candidato) continue;
    const percorso = espandi(candidato);
    try {
      const contenuto = fs.readFileSync(percorso, "utf8").trim();
      if (contenuto) return contenuto;
    } catch {
      // file assente o illeggibile: si passa al candidato successivo
    }
  }

  throw new MissingTokenError(
    `Nessun token Skillplate trovato. Impostalo in SKILLPLATE_TOKEN oppure salvalo in ` +
      `${DEFAULT_TOKEN_PATH} (chmod 600). Si genera dal pannello: Settings -> API Tokens.`
  );
}

function intero(valore) {
  const numero = Number.parseInt(valore, 10);
  return Number.isNaN(numero) ? null : numero;
}

/** Serializza i parametri, espandendo le liste in `chiave[]=valore`. */
export function encodeParams(params) {
  if (!params) return "";
  const query = new URLSearchParams();
  for (const [chiave, valore] of Object.entries(params)) {
    if (valore === null || valore === undefined) continue;
    if (Array.isArray(valore)) {
      for (const elemento of valore) query.append(`${chiave}[]`, String(elemento));
    } else if (typeof valore === "boolean") {
      query.append(chiave, valore ? "true" : "false");
    } else {
      query.append(chiave, String(valore));
    }
  }
  return query.toString();
}

function messaggioDefault(status) {
  if (status === 401) return "Token non valido o scaduto (401)";
  if (status === 403) return "Scope mancante sul token per questa operazione (403)";
  if (status === 404) return "Risorsa non trovata (404)";
  if (status === 429) return "Rate limit superato (429): 100 GET/min, 30 scritture/min";
  return `Errore HTTP ${status} dall'API Skillplate`;
}

const attesaDefault = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export class SkillplateClient {
  /**
   * @param {object} opzioni
   * @param {string} [opzioni.token] PAT esplicito (altrimenti risolto da env/file)
   * @param {string} [opzioni.baseUrl]
   * @param {string} [opzioni.tokenPath] file alternativo da cui leggere il token
   * @param {number} [opzioni.timeout] millisecondi
   * @param {number} [opzioni.maxRetries] tentativi extra su 429/5xx e errori di rete
   */
  constructor({
    token = null,
    baseUrl = null,
    tokenPath = null,
    timeout = 30000,
    maxRetries = 3,
    fetchImpl = globalThis.fetch,
    sleep = attesaDefault,
    env = process.env,
  } = {}) {
    this.token = resolveToken({ token, tokenPath, env });
    this.baseUrl = (baseUrl || env.SKILLPLATE_BASE_URL || DEFAULT_BASE_URL).replace(/\/+$/, "");
    this.timeout = timeout;
    this.maxRetries = maxRetries;
    this.rateLimit = { limit: null, remaining: null, reset: null };
    this.deprecation = null;
    this._fetch = fetchImpl;
    this._sleep = sleep;
  }

  // --------------------------------------------------------------- core

  /** Esegue una chiamata e restituisce il JSON decodificato. */
  async request(method, percorso, { params = null, body = null } = {}) {
    const url = this._buildUrl(percorso, params);
    const headers = {
      Authorization: `Bearer ${this.token}`,
      Accept: "application/json",
      "User-Agent": USER_AGENT,
    };
    let corpo;
    if (body !== null && body !== undefined) {
      corpo = JSON.stringify(body);
      headers["Content-Type"] = "application/json";
    }

    for (let tentativo = 0; ; tentativo += 1) {
      let risposta;
      try {
        risposta = await this._fetch(url, {
          method: method.toUpperCase(),
          headers,
          body: corpo,
          signal: AbortSignal.timeout(this.timeout),
        });
      } catch (errore) {
        if (tentativo < this.maxRetries) {
          await this._sleep(Math.min(2 ** (tentativo + 1), 8) * 1000);
          continue;
        }
        throw new SkillplateError(`Errore di rete verso ${this.baseUrl}: ${errore.message}`);
      }

      this._readMetaHeaders(risposta.headers);
      const grezzo = await risposta.text();

      if (risposta.ok) return this._decode(grezzo);

      const attesa = this._retryAfter(risposta, tentativo);
      if (attesa !== null && tentativo < this.maxRetries) {
        await this._sleep(attesa * 1000);
        continue;
      }
      throw this._httpError(risposta.status, grezzo);
    }
  }

  get(percorso, params = null) {
    return this.request("GET", percorso, { params });
  }

  post(percorso, body = {}, params = null) {
    return this.request("POST", percorso, { params, body: body ?? {} });
  }

  put(percorso, body = {}) {
    return this.request("PUT", percorso, { body: body ?? {} });
  }

  patch(percorso, body = {}) {
    return this.request("PATCH", percorso, { body: body ?? {} });
  }

  delete(percorso) {
    return this.request("DELETE", percorso);
  }

  /** Itera su tutti gli elementi di una lista paginata.
   *
   * Rispetta il limite di 100 GET/minuto inserendo una pausa fra le pagine.
   */
  async *paginate(percorso, { params = null, perPage = 100, pause = 500, maxPages = null } = {}) {
    const query = { ...(params || {}), per_page: perPage };
    let pagina = Number.parseInt(query.page ?? 1, 10);
    let pagineLette = 0;

    for (;;) {
      query.page = pagina;
      const risposta = await this.get(percorso, query);
      for (const elemento of risposta.data ?? []) yield elemento;

      pagineLette += 1;
      const meta = risposta.meta ?? {};
      const ultima = meta.last_page;
      const corrente = meta.current_page ?? pagina;
      if (!ultima || corrente >= ultima) return;
      if (maxPages !== null && pagineLette >= maxPages) return;
      pagina = corrente + 1;
      if (pause) await this._sleep(pause);
    }
  }

  /** Raccoglie in un array tutte le pagine di una lista. */
  async collect(percorso, opzioni = {}) {
    const elementi = [];
    for await (const elemento of this.paginate(percorso, opzioni)) elementi.push(elemento);
    return elementi;
  }

  // ------------------------------------------------------------ risorse

  /** Verifica credenziali e raggiungibilità: una lista minima di prodotti. */
  ping() {
    return this.get("/products", { per_page: 1 });
  }

  // utenti
  listUsers(params = {}) {
    return this.get("/users", params);
  }

  iterUsers(params = {}) {
    return this.paginate("/users", { params });
  }

  getUser(userId, include = null) {
    return this.get(`/users/${userId}`, include ? { include } : null);
  }

  createUser(email, firstName, lastName, campi = {}) {
    return this.post("/users", { email, first_name: firstName, last_name: lastName, ...campi });
  }

  updateUser(userId, campi = {}) {
    return this.put(`/users/${userId}`, campi);
  }

  /** Irreversibile: chiedi conferma esplicita prima di chiamarlo. */
  deleteUser(userId) {
    return this.delete(`/users/${userId}`);
  }

  enroll(userId, productIds) {
    return this.post(`/users/${userId}/enroll`, { product_ids: [...productIds] });
  }

  unenroll(userId, productIds) {
    return this.post(`/users/${userId}/unenroll`, { product_ids: [...productIds] });
  }

  certify(userId, moduleId) {
    return this.post(`/users/${userId}/certify`, { module_id: moduleId });
  }

  // prodotti (sola lettura: il catalogo si gestisce dal pannello)
  listProducts(params = {}) {
    return this.get("/products", { status: "published", ...params });
  }

  iterProducts(params = {}) {
    return this.paginate("/products", { params: { status: "published", ...params } });
  }

  // ordini
  listOrders(params = {}) {
    return this.get("/orders", params);
  }

  iterOrders(params = {}) {
    return this.paginate("/orders", { params });
  }

  getOrder(orderId) {
    return this.get(`/orders/${orderId}`);
  }

  createOrder(lineItems, country, campi = {}) {
    return this.post("/orders", { line_items: lineItems, country, ...campi });
  }

  setOrderStatus(orderId, status) {
    return this.post(`/orders/${orderId}/status`, { status });
  }

  // abbonamenti
  listSubscriptions(params = {}) {
    return this.get("/subscriptions", params);
  }

  iterSubscriptions(params = {}) {
    return this.paginate("/subscriptions", { params });
  }

  getSubscription(subscriptionId) {
    return this.get(`/subscriptions/${subscriptionId}`);
  }

  createSubscription(productId, productPricingId, status, country, campi = {}) {
    return this.post("/subscriptions", {
      product_id: productId,
      product_pricing_id: productPricingId,
      status,
      country,
      ...campi,
    });
  }

  updateSubscription(subscriptionId, campi = {}) {
    return this.patch(`/subscriptions/${subscriptionId}`, campi);
  }

  /** Irreversibile lato utente: conferma prima di chiamarlo. */
  cancelSubscription(subscriptionId) {
    return this.post(`/subscriptions/${subscriptionId}/cancel`);
  }

  subscriptionPaymentSuccess(subscriptionId, campi = {}) {
    return this.post(`/subscriptions/${subscriptionId}/payment-success`, campi);
  }

  subscriptionPaymentFailed(subscriptionId, campi = {}) {
    return this.post(`/subscriptions/${subscriptionId}/payment-failed`, campi);
  }

  // sconti
  listDiscounts(params = {}) {
    return this.get("/discounts", params);
  }

  iterDiscounts(params = {}) {
    return this.paginate("/discounts", { params });
  }

  getDiscount(discountId) {
    return this.get(`/discounts/${discountId}`);
  }

  createDiscount(campi = {}) {
    if (campi.percent_off && campi.amount_off) {
      throw new TypeError("percent_off e amount_off sono alternativi, non entrambi");
    }
    return this.post("/discounts", campi);
  }

  updateDiscount(discountId, campi = {}) {
    return this.put(`/discounts/${discountId}`, campi);
  }

  activateDiscount(discountId) {
    return this.post(`/discounts/${discountId}/activate`);
  }

  deactivateDiscount(discountId) {
    return this.post(`/discounts/${discountId}/deactivate`);
  }

  // ------------------------------------------------------------ interni

  _buildUrl(percorso, params) {
    const url = `${this.baseUrl}/${String(percorso).replace(/^\/+/, "")}`;
    const query = encodeParams(params);
    return query ? `${url}?${query}` : url;
  }

  _readMetaHeaders(headers) {
    if (!headers) return;
    this.rateLimit = {
      limit: intero(headers.get("X-RateLimit-Limit")),
      remaining: intero(headers.get("X-RateLimit-Remaining")),
      reset: intero(headers.get("X-RateLimit-Reset")),
    };
    if (headers.get("Deprecation")) {
      this.deprecation = {
        deprecation: headers.get("Deprecation"),
        sunset: headers.get("Sunset"),
        info: headers.get("X-API-Deprecation-Info"),
      };
    }
  }

  /** Secondi di attesa per una risposta ritentabile, altrimenti null. */
  _retryAfter(risposta, tentativo) {
    if (risposta.status === 429) {
      const intestazione = intero(risposta.headers.get("Retry-After"));
      if (intestazione !== null) return Math.min(intestazione, 60);
      return Math.min(2 ** (tentativo + 1), 30);
    }
    if ([502, 503, 504].includes(risposta.status)) return Math.min(2 ** (tentativo + 1), 16);
    return null;
  }

  _httpError(status, grezzo) {
    let corpo = null;
    try {
      corpo = grezzo ? JSON.parse(grezzo) : null;
    } catch {
      corpo = null;
    }
    const errore = corpo && typeof corpo.error === "object" ? corpo.error : {};
    const opzioni = {
      code: errore.code ?? null,
      status,
      requestId: errore.request_id ?? null,
      body: corpo,
    };
    const messaggio = errore.message || messaggioDefault(status);
    return status === 429
      ? new RateLimitError(messaggio, opzioni)
      : new SkillplateError(messaggio, opzioni);
  }

  _decode(grezzo) {
    if (!grezzo) return {};
    try {
      return JSON.parse(grezzo);
    } catch {
      throw new SkillplateError("Risposta non JSON dall'API Skillplate");
    }
  }
}
