import { describe, expect, it, vi } from "vitest";
import {
  checkAnthropicKey,
  checkAppSecret,
  checkWhatsAppNumber,
  describeGraphError,
} from "../src/setup/validators.js";

type FetchArgs = Parameters<typeof fetch>;

function respond(status: number, body: unknown) {
  return vi.fn<(...args: FetchArgs) => Promise<Response>>(async () =>
    new Response(JSON.stringify(body), { status }),
  ) as unknown as typeof fetch;
}

const graph = { graphVersion: "v23.0", token: "tok", phoneNumberId: "123" };

describe("checkWhatsAppNumber", () => {
  it("conferma il numero mittente quando le credenziali sono valide", async () => {
    const result = await checkWhatsAppNumber({
      ...graph,
      fetchImpl: respond(200, {
        display_phone_number: "+39 02 1234567",
        verified_name: "Panetteria Rossi",
      }),
    });

    expect(result).toEqual({
      ok: true,
      detail: "numero mittente +39 02 1234567 (Panetteria Rossi)",
    });
  });

  it("interroga il numero passando il token come Bearer", async () => {
    const fetchImpl = respond(200, { display_phone_number: "+39 02 1234567" });
    await checkWhatsAppNumber({ ...graph, fetchImpl });

    const [url, init] = (fetchImpl as unknown as ReturnType<typeof vi.fn>).mock.calls[0]!;
    expect(url).toBe(
      "https://graph.facebook.com/v23.0/123?fields=display_phone_number,verified_name",
    );
    expect((init as RequestInit).headers).toMatchObject({ Authorization: "Bearer tok" });
  });

  it("spiega che il token è scaduto sul codice 190", async () => {
    const result = await checkWhatsAppNumber({
      ...graph,
      fetchImpl: respond(401, { error: { code: 190, message: "Session expired" } }),
    });

    expect(result.ok).toBe(false);
    expect(result).toMatchObject({ problem: expect.stringContaining("scaduto") });
    if (!result.ok) expect(result.fix).toContain("24 ore");
  });

  it("spiega che l'id del numero è sbagliato sul codice 100", async () => {
    const result = await checkWhatsAppNumber({
      ...graph,
      fetchImpl: respond(400, { error: { code: 100 } }),
    });

    if (!result.ok) expect(result.fix).toContain("non il numero di telefono");
  });

  it("segnala una rete irraggiungibile senza confonderla con credenziali errate", async () => {
    const fetchImpl = vi.fn(async () => {
      throw new Error("getaddrinfo ENOTFOUND");
    }) as unknown as typeof fetch;

    const result = await checkWhatsAppNumber({ ...graph, fetchImpl });
    expect(result).toMatchObject({ ok: false, problem: expect.stringContaining("contattare") });
  });
});

describe("checkAppSecret", () => {
  const args = { appId: "999", appSecret: "sec", graphVersion: "v23.0" };

  it("accetta una coppia app id / chiave segreta valida", async () => {
    const result = await checkAppSecret({
      ...args,
      fetchImpl: respond(200, { access_token: "999|abc" }),
    });

    expect(result).toEqual({ ok: true, detail: "chiave segreta valida" });
  });

  it("dice che i due valori non combaciano sul codice 1", async () => {
    const result = await checkAppSecret({
      ...args,
      fetchImpl: respond(400, { error: { code: 1 } }),
    });

    expect(result).toMatchObject({ ok: false, problem: expect.stringContaining("non combaciano") });
    if (!result.ok) expect(result.fix).toContain("Mostra");
  });

  it("non manda la chiave segreta nell'URL senza codificarla", async () => {
    const fetchImpl = respond(200, {});
    await checkAppSecret({ ...args, appSecret: "a b&c", fetchImpl });

    const [url] = (fetchImpl as unknown as ReturnType<typeof vi.fn>).mock.calls[0]!;
    expect(url).toContain("client_secret=a%20b%26c");
  });
});

describe("checkAnthropicKey", () => {
  it("accetta una chiave valida", async () => {
    const result = await checkAnthropicKey({
      apiKey: "sk-ant-xxx",
      fetchImpl: respond(200, { data: [] }),
    });

    expect(result).toEqual({ ok: true, detail: "chiave Anthropic valida" });
  });

  it("spiega dove rigenerare la chiave su 401", async () => {
    const result = await checkAnthropicKey({
      apiKey: "sbagliata",
      fetchImpl: respond(401, { error: { message: "invalid x-api-key" } }),
    });

    if (!result.ok) expect(result.fix).toContain("console.anthropic.com");
  });

  it("distingue il limite di richieste da una chiave invalida", async () => {
    const result = await checkAnthropicKey({
      apiKey: "sk-ant-xxx",
      fetchImpl: respond(429, {}),
    });

    expect(result).toMatchObject({ ok: false, problem: expect.stringContaining("limiti") });
  });
});

describe("describeGraphError", () => {
  it("riconosce la mancanza di permessi", () => {
    expect(describeGraphError({ code: 200 }, 403).fix).toContain("whatsapp_business_messaging");
  });

  it("riporta il messaggio originale quando il codice è sconosciuto", () => {
    const result = describeGraphError({ code: 4242, message: "Qualcosa di strano" }, 500);
    expect(result.fix).toContain("Qualcosa di strano");
  });

  it("non spaccia per errore di Meta una risposta che Meta non ha mandato", () => {
    // Capita dietro proxy o firewall che intercettano la richiesta: senza
    // oggetto d'errore nel corpo non possiamo attribuire la colpa alle
    // credenziali, o l'utente cerca il problema dove non e'.
    const result = describeGraphError(undefined, 403);
    expect(result.problem).toContain("non arriva da Meta");
    expect(result.fix).toContain("firewall");
  });

  it("mantiene la diagnosi sui permessi quando Meta risponde davvero 403", () => {
    expect(describeGraphError({ code: 200 }, 403).fix).toContain("whatsapp_business_messaging");
  });

  it("resta utile su uno stato inatteso senza corpo d'errore", () => {
    expect(describeGraphError(undefined, 500).problem).toContain("HTTP 500");
  });
});
