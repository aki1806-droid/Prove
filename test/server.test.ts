import crypto from "node:crypto";
import type { AddressInfo } from "node:net";
import type { Server } from "node:http";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Config } from "../src/config.js";
import type { MessageHandler } from "../src/handler.js";
import { createServer } from "../src/server.js";
import { TtlSet } from "../src/ttl-set.js";

const APP_SECRET = "app-secret-di-prova";
const VERIFY_TOKEN = "token-di-verifica";

const config = {
  appSecret: APP_SECRET,
  verifyToken: VERIFY_TOKEN,
} as Config;

let server: Server;
let baseUrl: string;
let handled: string[];

/** Attende che il dispatch asincrono del webhook sia arrivato all'handler. */
const flush = () => new Promise((resolve) => setImmediate(resolve));

beforeEach(async () => {
  handled = [];
  const handler = {
    handle: vi.fn(async (message: { id: string }) => {
      handled.push(message.id);
    }),
  } as unknown as MessageHandler;

  const app = createServer({ config, handler, seen: new TtlSet(60_000) });
  server = await new Promise<Server>((resolve) => {
    const s = app.listen(0, () => resolve(s));
  });
  baseUrl = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
});

afterEach(async () => {
  await new Promise((resolve) => server.close(resolve));
});

function post(body: unknown, signature?: string): Promise<Response> {
  const raw = JSON.stringify(body);
  const header =
    signature ??
    `sha256=${crypto.createHmac("sha256", APP_SECRET).update(raw).digest("hex")}`;

  return fetch(`${baseUrl}/webhook`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Hub-Signature-256": header },
    body: raw,
  });
}

function textWebhook(id: string) {
  return {
    object: "whatsapp_business_account",
    entry: [
      {
        id: "waba",
        changes: [
          {
            field: "messages",
            value: {
              messages: [{ id, from: "393331234567", type: "text", text: { body: "ciao" } }],
            },
          },
        ],
      },
    ],
  };
}

describe("GET /webhook", () => {
  it("restituisce il challenge quando il verify token combacia", async () => {
    const url = `${baseUrl}/webhook?hub.mode=subscribe&hub.verify_token=${VERIFY_TOKEN}&hub.challenge=1234567890`;
    const response = await fetch(url);

    expect(response.status).toBe(200);
    expect(await response.text()).toBe("1234567890");
  });

  it("rifiuta un verify token sbagliato", async () => {
    const url = `${baseUrl}/webhook?hub.mode=subscribe&hub.verify_token=sbagliato&hub.challenge=123`;
    expect((await fetch(url)).status).toBe(403);
  });

  it("rifiuta una richiesta senza challenge", async () => {
    const url = `${baseUrl}/webhook?hub.mode=subscribe&hub.verify_token=${VERIFY_TOKEN}`;
    expect((await fetch(url)).status).toBe(403);
  });
});

describe("POST /webhook", () => {
  it("accetta un payload firmato e lo passa all'handler", async () => {
    const response = await post(textWebhook("wamid.AAA"));
    await flush();

    expect(response.status).toBe(200);
    expect(handled).toEqual(["wamid.AAA"]);
  });

  it("rifiuta un payload con firma non valida senza elaborarlo", async () => {
    const response = await post(textWebhook("wamid.AAA"), "sha256=deadbeef");
    await flush();

    expect(response.status).toBe(403);
    expect(handled).toEqual([]);
  });

  it("rifiuta un payload privo di firma", async () => {
    const raw = JSON.stringify(textWebhook("wamid.AAA"));
    const response = await fetch(`${baseUrl}/webhook`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: raw,
    });

    expect(response.status).toBe(403);
  });

  it("elabora una sola volta lo stesso messaggio riconsegnato", async () => {
    await post(textWebhook("wamid.AAA"));
    await post(textWebhook("wamid.AAA"));
    await flush();

    expect(handled).toEqual(["wamid.AAA"]);
  });

  it("risponde 200 anche a un evento di stato che non produce risposte", async () => {
    const response = await post({
      entry: [{ changes: [{ value: { statuses: [{ id: "wamid.AAA", status: "read" }] } }] }],
    });
    await flush();

    expect(response.status).toBe(200);
    expect(handled).toEqual([]);
  });
});

describe("GET /health", () => {
  it("risponde ok", async () => {
    const response = await fetch(`${baseUrl}/health`);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ status: "ok" });
  });
});
