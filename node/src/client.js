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

function espandi(percorso, env = process.env) {
  if (!percorso) return percorso;
  if (!percorso.startsWith("~")) return percorso;
  return path.join(env.HOME || os.homedir(), percorso.slice(1));
}

/** Trova il PAT, in ordine: argomento, SKILLPLATE_TOKEN, SKILLPLATE_TOKEN_FILE,
 * `~/.config/skillplate/token`. */
export function resolveToken({ token = null, tokenPath = null, env = process.env } = {}) {
  if (token && token.trim()) return token.trim();

  const daEnv = env.SKILLPLATE_TOKEN;
  if (daEnv && daEnv.trim()) return daEnv.trim();

  for (const candidato of [tokenPath, env.SKILLPLATE_TOKEN_FILE, DEFAULT_TOKEN_PATH]) {
    if (!candidato) continue;
    const percorso = espandi(candidato, env);
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

/** Blocco di paginazione, normalizzato.
 *
 * L'API reale annida i contatori sotto `meta.pagination` e chiama
 * `total_pages` quella che la documentazione chiama `last_page`; questa
 * funzione accetta entrambe le forme.
 */
export function pagination(risposta) {
  const meta = risposta?.meta ?? {};
  const blocco = meta.pagination && typeof meta.pagination === "object" ? meta.pagination : meta;
  return {
    current_page: blocco.current_page,
    last_page: blocco.last_page ?? blocco.total_pages,
    per_page: blocco.per_page,
    total: blocco.total,
  };
}

/** Elementi di una risposta di lista, qualunque sia la forma di `data`.
 *
 * `/products` non restituisce una lista ma un oggetto raggruppato per tipo
 * (`courses`, `bundles`, `digital_downloads`, `generics`, `communities`): qui
 * i gruppi vengono concatenati.
 */
export function items(risposta) {
  const data = risposta && !Array.isArray(risposta) && "data" in risposta ? risposta.data : risposta;
  if (Array.isArray(data)) return data;
  if (data && typeof data === "object") {
    return Object.values(data).flatMap((gruppo) => (Array.isArray(gruppo) ? gruppo : []));
  }
  return [];
}

/** Gruppi di una risposta con `data` raggruppato, es. `/products`.
 *
 * Restituisce `{ courses: [...], bundles: [...], ... }`. Serve perche` il tipo
 * del prodotto sta nella chiave del gruppo, non in un campo dell'elemento:
 * `items()` appiattisce e quell'informazione la perde. Su una risposta con
 * `data` gia` piatto restituisce `{}`.
 */
export function groups(risposta) {
  const data = risposta && !Array.isArray(risposta) && "data" in risposta ? risposta.data : risposta;
  if (!data || typeof data !== "object" || Array.isArray(data)) return {};
  return Object.fromEntries(Object.entries(data).filter(([, gruppo]) => Array.isArray(gruppo)));
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

function messaggioDefault(status, proxyAuth = false) {
  if (status === 401) {
    return proxyAuth
      ? "401 con auth delegata al proxy: la credenziale non e` stata allegata. " +
          "Controlla che l'host sia fra le Allowed websites della credenziale"
      : "Token non valido o scaduto (401)";
  }
  if (status === 403) return "Scope mancante sul token per questa operazione (403)";
  if (status === 404) return "Risorsa non trovata (404)";
  if (status === 429) return "Rate limit superato (429): 100 GET/min, 30 scritture/min";
  return `Errore HTTP ${status} dall'API Skillplate`;
}

/** Estratto del corpo grezzo, per gli errori che non arrivano da Skillplate. */
function estratto(grezzo, limite = 200) {
  const testo = String(grezzo ?? "").trim();
  if (!testo) return "";
  const breve = testo.length > limite ? `${testo.slice(0, limite)}...` : testo;
  return ` — risposta ricevuta: ${breve.replace(/\s+/g, " ")}`;
}

/** La `fetch` di Node ignora HTTPS_PROXY se non e` attivo NODE_USE_ENV_PROXY:
 * la richiesta esce diretta e salta un eventuale proxy che allega credenziali.
 * Il flag si legge all'avvio del processo, quindi qui si puo` solo segnalarlo. */
function suggerimentoProxy(env) {
  const proxy = env.HTTPS_PROXY || env.https_proxy;
  const attivo = String(env.NODE_USE_ENV_PROXY ?? "").trim() === "1";
  if (!proxy || attivo) return "";
  return (
    " — nota: HTTPS_PROXY e` impostata ma la fetch di Node la ignora, " +
    "quindi la richiesta e` uscita diretta: riesegui con NODE_USE_ENV_PROXY=1 (Node >= 22.21)"
  );
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
    proxyAuth = null,
    fetchImpl = globalThis.fetch,
    sleep = attesaDefault,
    env = process.env,
  } = {}) {
    // Auth delegata al proxy: la credenziale viene allegata a valle (es. le API
    // credentials di un ambiente cloud), quindi qui non serve un token e
    // l'header Authorization non va inviato.
    this.proxyAuth =
      proxyAuth === null ? (env.SKILLPLATE_AUTH ?? "").trim().toLowerCase() === "proxy" : Boolean(proxyAuth);
    this.token = this.proxyAuth ? null : resolveToken({ token, tokenPath, env });
    this.baseUrl = (baseUrl || env.SKILLPLATE_BASE_URL || DEFAULT_BASE_URL).replace(/\/+$/, "");
    this.timeout = timeout;
    this.maxRetries = maxRetries;
    this.rateLimit = { limit: null, remaining: null, reset: null };
    this.deprecation = null;
    this._fetch = fetchImpl;
    this._sleep = sleep;
    this._env = env;
  }

  // --------------------------------------------------------------- core

  /** Esegue una chiamata e restituisce il JSON decodificato. */
  async request(method, percorso, { params = null, body = null } = {}) {
    const url = this._buildUrl(percorso, params);
    const headers = { Accept: "application/json", "User-Agent": USER_AGENT };
    if (!this.proxyAuth) headers.Authorization = `Bearer ${this.token}`;
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
        throw new SkillplateError(
          `Errore di rete verso ${this.baseUrl}: ${errore.message}${suggerimentoProxy(this._env)}`
        );
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
      for (const elemento of items(risposta)) yield elemento;

      pagineLette += 1;
      const info = pagination(risposta);
      const ultima = info.last_page;
      const corrente = info.current_page ?? pagina;
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
    // Un corpo non-JSON significa che a rispondere non e` stato Skillplate ma
    // un intermediario (proxy, gateway, captive portal): dare la spiegazione
    // Skillplate — "manca lo scope", "token scaduto" — manderebbe fuori strada.
    let messaggio;
    if (errore.message) {
      messaggio = errore.message;
    } else if (corpo === null && String(grezzo ?? "").trim()) {
      messaggio =
        `Risposta HTTP ${status} non proveniente da Skillplate ` +
        `(corpo non JSON): controlla proxy, firewall o allowlist di rete` +
        estratto(grezzo) +
        suggerimentoProxy(this._env);
    } else {
      messaggio = messaggioDefault(status, this.proxyAuth);
    }
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
