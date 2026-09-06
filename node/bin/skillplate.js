#!/usr/bin/env node
/** CLI di verifica per la connessione Skillplate.
 *
 *   node bin/skillplate.js ping
 *   node bin/skillplate.js products --type course
 *   node bin/skillplate.js users --email mario@example.com
 *   node bin/skillplate.js get /orders --param status=completed
 *
 * Il token viene letto da SKILLPLATE_TOKEN o da ~/.config/skillplate/token e
 * non viene mai stampato.
 */

import { DEFAULT_BASE_URL, SkillplateClient, SkillplateError } from "../src/index.js";

const USO = `Uso: skillplate [--base-url URL] [--token-file FILE] [--timeout MS] [--proxy-auth] <comando>

  --proxy-auth   non invia il token: lo allega il proxy (API credentials dell'ambiente)

Comandi:
  ping                        verifica token e raggiungibilità dell'API
  products [--status S] [--type T] [--per-page N]
  users [--search S] [--email E] [--per-page N]
  get <path> [--param k=v ...]
`;

const FLAG = new Set(["proxy-auth", "help"]);

function parseArgs(argv) {
  const opzioni = { param: [] };
  const posizionali = [];
  for (let i = 0; i < argv.length; i += 1) {
    const voce = argv[i];
    if (!voce.startsWith("--")) {
      posizionali.push(voce);
      continue;
    }
    const chiave = voce.slice(2);
    if (FLAG.has(chiave)) {
      opzioni[chiave] = true;
      continue;
    }
    const valore = argv[i + 1];
    if (valore === undefined || valore.startsWith("--")) {
      throw new Error(`Manca il valore per --${chiave}`);
    }
    i += 1;
    if (chiave === "param") opzioni.param.push(valore);
    else opzioni[chiave] = valore;
  }
  return { opzioni, posizionali };
}

function coppie(valori) {
  const params = {};
  for (const voce of valori) {
    const separatore = voce.indexOf("=");
    if (separatore === -1) throw new Error(`Parametro non valido: ${voce} (usa chiave=valore)`);
    params[voce.slice(0, separatore)] = voce.slice(separatore + 1);
  }
  return params;
}

const stampa = (dati) => console.log(JSON.stringify(dati, null, 2));

async function main(argv) {
  let opzioni;
  let posizionali;
  try {
    ({ opzioni, posizionali } = parseArgs(argv));
  } catch (errore) {
    console.error(errore.message);
    return 2;
  }

  const [comando, ...resto] = posizionali;
  if (!comando || opzioni.help !== undefined) {
    console.log(USO.replace("URL", DEFAULT_BASE_URL));
    return comando ? 0 : 2;
  }

  const client = new SkillplateClient({
    baseUrl: opzioni["base-url"] ?? null,
    tokenPath: opzioni["token-file"] ?? null,
    timeout: opzioni.timeout ? Number(opzioni.timeout) : 30000,
    proxyAuth: opzioni["proxy-auth"] ? true : null,
  });

  switch (comando) {
    case "ping": {
      const risposta = await client.ping();
      const totale = risposta.meta?.total;
      console.log(`Connessione OK — ${client.baseUrl}`);
      console.log(`Auth: ${client.proxyAuth ? "delegata al proxy" : "token locale"}`);
      if (totale !== undefined) console.log(`Prodotti visibili: ${totale}`);
      console.log(`Rate limit: ${JSON.stringify(client.rateLimit)}`);
      if (client.deprecation) {
        console.log(`ATTENZIONE — versione deprecata: ${JSON.stringify(client.deprecation)}`);
      }
      return 0;
    }
    case "products":
      stampa(
        await client.listProducts({
          status: opzioni.status ?? "published",
          type: opzioni.type ?? null,
          per_page: Number(opzioni["per-page"] ?? 25),
        })
      );
      return 0;
    case "users": {
      const params = { per_page: Number(opzioni["per-page"] ?? 25) };
      if (opzioni.search) params.search = opzioni.search;
      if (opzioni.email) params["filter[email]"] = opzioni.email;
      stampa(await client.listUsers(params));
      return 0;
    }
    case "get": {
      const [percorso] = resto;
      if (!percorso) {
        console.error("Serve un path, es. `get /orders`");
        return 2;
      }
      stampa(await client.get(percorso, coppie(opzioni.param)));
      return 0;
    }
    default:
      console.error(`Comando sconosciuto: ${comando}\n\n${USO}`);
      return 2;
  }
}

try {
  process.exitCode = await main(process.argv.slice(2));
} catch (errore) {
  if (errore instanceof SkillplateError) {
    console.error(`Errore Skillplate: ${errore.describe()}`);
    process.exitCode = 1;
  } else {
    throw errore;
  }
}
