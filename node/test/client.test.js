/** Test end-to-end del client contro un server HTTP locale che imita l'API. */

import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import test, { after, before, beforeEach, describe } from "node:test";

import { MissingTokenError, SkillplateClient, SkillplateError, resolveToken, webhooks } from "../src/index.js";

const UTENTI = Array.from({ length: 5 }, (_, i) => ({
  id: `usr_${i + 1}`,
  email: `u${i + 1}@example.com`,
}));

let richieste = [];
let server;
let baseUrl;

function rispondi(res, status, corpo) {
  const grezzo = JSON.stringify(corpo);
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(grezzo),
    "X-RateLimit-Limit": "100",
    "X-RateLimit-Remaining": "97",
    "X-RateLimit-Reset": "60",
  });
  res.end(grezzo);
}

function gestisci(req, res, corpo) {
  const url = new URL(req.url, "http://127.0.0.1");
  richieste.push({
    metodo: req.method,
    path: url.pathname,
    query: url.searchParams,
    body: corpo ? JSON.parse(corpo) : null,
    auth: req.headers.authorization,
  });

  // nessun header = auth delegata al proxy, che la allegherebbe a valle
  if (req.headers.authorization !== undefined && req.headers.authorization !== "Bearer token-di-test") {
    return rispondi(res, 401, {
      error: { code: "unauthenticated", message: "Token non valido", status: 401, request_id: "req_401" },
    });
  }

  if (url.pathname === "/v1/external/products") {
    return rispondi(res, 200, {
      data: [{ id: "prd_1", type: "course" }],
      meta: { current_page: 1, last_page: 1, total: 1 },
    });
  }

  if (url.pathname === "/v1/external/users" && req.method === "GET") {
    const pagina = Number(url.searchParams.get("page") ?? 1);
    const perPage = Number(url.searchParams.get("per_page") ?? 2);
    const inizio = (pagina - 1) * perPage;
    return rispondi(res, 200, {
      data: UTENTI.slice(inizio, inizio + perPage),
      meta: {
        current_page: pagina,
        last_page: Math.ceil(UTENTI.length / perPage),
        per_page: perPage,
        total: UTENTI.length,
      },
    });
  }

  if (url.pathname === "/v1/external/users" && req.method === "POST") {
    return rispondi(res, 201, { data: { id: "usr_new", ...JSON.parse(corpo) } });
  }

  if (url.pathname === "/v1/external/users/usr_1/enroll") {
    return rispondi(res, 200, { data: { enrolled: JSON.parse(corpo).product_ids } });
  }

  if (url.pathname === "/v1/external/discounts" && req.method === "POST") {
    return rispondi(res, 403, {
      error: { code: "missing_scope", message: "Manca lo scope discounts:write", status: 403, request_id: "req_403" },
    });
  }

  return rispondi(res, 404, {
    error: { code: "not_found", message: "Risorsa non trovata", status: 404, request_id: "req_404" },
  });
}

before(async () => {
  server = http.createServer((req, res) => {
    const pezzi = [];
    req.on("data", (pezzo) => pezzi.push(pezzo));
    req.on("end", () => gestisci(req, res, Buffer.concat(pezzi).toString("utf8")));
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}/v1/external`;
});

after(() => server.close());

describe("SkillplateClient", () => {
  let client;

  beforeEach(() => {
    richieste = [];
    client = new SkillplateClient({ token: "token-di-test", baseUrl, sleep: async () => {} });
  });

  test("ping legge i dati e gli header di rate limit", async () => {
    const risposta = await client.ping();
    assert.equal(risposta.data[0].id, "prd_1");
    assert.equal(client.rateLimit.remaining, 97);
    assert.equal(richieste[0].auth, "Bearer token-di-test");
  });

  test("paginate percorre tutte le pagine", async () => {
    const utenti = await client.collect("/users", { perPage: 2, pause: 0 });
    assert.deepEqual(
      utenti.map((u) => u.id),
      UTENTI.map((u) => u.id)
    );
    assert.equal(richieste.filter((r) => r.path.endsWith("/users")).length, 3);
  });

  test("createUser invia i campi opzionali", async () => {
    const risposta = await client.createUser("a@example.com", "Anna", "Rossi", {
      tags: ["vip"],
      send_welcome_email: true,
    });
    assert.equal(risposta.data.id, "usr_new");
    const inviato = richieste.at(-1).body;
    assert.equal(inviato.email, "a@example.com");
    assert.deepEqual(inviato.tags, ["vip"]);
  });

  test("enroll manda i product_ids", async () => {
    const risposta = await client.enroll("usr_1", ["prd_1"]);
    assert.deepEqual(risposta.data.enrolled, ["prd_1"]);
  });

  test("un 403 espone code e request_id", async () => {
    await assert.rejects(
      () => client.createDiscount({ code: "ESTATE", percent_off: 20 }),
      (errore) => {
        assert.ok(errore instanceof SkillplateError);
        assert.equal(errore.status, 403);
        assert.equal(errore.code, "missing_scope");
        assert.equal(errore.requestId, "req_403");
        return true;
      }
    );
  });

  test("un token errato dà 401", async () => {
    const altro = new SkillplateClient({ token: "sbagliato", baseUrl, sleep: async () => {} });
    await assert.rejects(() => altro.ping(), (errore) => errore.status === 401);
  });

  test("percent_off e amount_off sono esclusivi", () => {
    assert.throws(() => client.createDiscount({ percent_off: 10, amount_off: 5 }), TypeError);
  });

  test("liste, booleani e valori nulli nella query", async () => {
    await assert.rejects(() =>
      client.get("/inesistente", { tags: ["a", "b"], active: true, vuoto: null })
    );
    const { query } = richieste.at(-1);
    assert.deepEqual(query.getAll("tags[]"), ["a", "b"]);
    assert.equal(query.get("active"), "true");
    assert.equal(query.has("vuoto"), false);
  });

  test("proxyAuth non invia l'header Authorization", async () => {
    const finto = new SkillplateClient({ baseUrl, proxyAuth: true, env: {}, sleep: async () => {} });
    const risposta = await finto.ping();
    assert.equal(risposta.data[0].id, "prd_1");
    assert.equal(richieste.at(-1).auth, undefined);
    assert.equal(finto.token, null);
  });

  test("proxyAuth si attiva da SKILLPLATE_AUTH=proxy", () => {
    const finto = new SkillplateClient({ baseUrl, env: { SKILLPLATE_AUTH: "proxy" } });
    assert.equal(finto.proxyAuth, true);
  });

  test("un 401 in proxyAuth parla di credenziale, non di token", async () => {
    const finto = new SkillplateClient({
      baseUrl,
      proxyAuth: true,
      env: {},
      sleep: async () => {},
      fetchImpl: async () => new Response("", { status: 401 }),
    });
    await assert.rejects(
      () => finto.ping(),
      (errore) => {
        assert.match(errore.message, /credenziale/);
        assert.match(errore.message, /Allowed websites/);
        return true;
      }
    );
  });

  test("un 403 non-Skillplate riporta il corpo reale, non lo scope", async () => {
    const finto = new SkillplateClient({
      token: "t",
      baseUrl,
      sleep: async () => {},
      fetchImpl: async () =>
        new Response("Host not in allowlist: api.skillplate.com.", { status: 403 }),
    });
    await assert.rejects(
      () => finto.ping(),
      (errore) => {
        assert.match(errore.message, /non proveniente da Skillplate/);
        assert.match(errore.message, /Host not in allowlist/);
        assert.doesNotMatch(errore.message, /scope/i);
        assert.equal(errore.code, null);
        return true;
      }
    );
  });

  test("ritenta sui 429 e poi riesce", async () => {
    let chiamate = 0;
    const finto = new SkillplateClient({
      token: "t",
      baseUrl,
      sleep: async () => {},
      fetchImpl: async () => {
        chiamate += 1;
        if (chiamate === 1) {
          return new Response("{}", { status: 429, headers: { "Retry-After": "1" } });
        }
        return new Response(JSON.stringify({ data: [] }), { status: 200 });
      },
    });
    assert.deepEqual(await finto.ping(), { data: [] });
    assert.equal(chiamate, 2);
  });
});

describe("resolveToken", () => {
  test("l'env ha la precedenza e viene ripulito", () => {
    assert.equal(resolveToken({ env: { SKILLPLATE_TOKEN: "  da-env  " } }), "da-env");
  });

  test("senza token solleva MissingTokenError", () => {
    // home isolata: il test non deve dipendere dai file dell'utente
    const home = fs.mkdtempSync(path.join(os.tmpdir(), "skillplate-test-"));
    try {
      assert.throws(
        () => resolveToken({ env: { HOME: home }, tokenPath: path.join(home, "assente") }),
        MissingTokenError
      );
    } finally {
      fs.rmSync(home, { recursive: true, force: true });
    }
  });

  test("legge il token dal file indicato", () => {
    const home = fs.mkdtempSync(path.join(os.tmpdir(), "skillplate-test-"));
    const file = path.join(home, "token");
    fs.writeFileSync(file, "  dal-file\n");
    try {
      assert.equal(resolveToken({ env: { HOME: home }, tokenPath: file }), "dal-file");
    } finally {
      fs.rmSync(home, { recursive: true, force: true });
    }
  });
});

describe("webhooks", () => {
  test("firma valida: l'evento viene decodificato", () => {
    const payload = JSON.stringify({ event: "payment.succeeded", items: [{ product_id: "prd_1" }] });
    const firma = webhooks.computeSignature(payload, "segreto");
    const evento = webhooks.parseEvent(payload, `sha256=${firma}`, "segreto");
    assert.deepEqual(webhooks.productIds(evento), ["prd_1"]);
  });

  test("firma non valida: payload scartato", () => {
    assert.throws(() => webhooks.parseEvent('{"event":"user.created"}', "sha256=deadbeef", "segreto"));
  });

  test("firma di lunghezza diversa non manda in crash timingSafeEqual", () => {
    assert.equal(webhooks.verifySignature("{}", "corta", "segreto"), false);
  });
});
