import { describe, expect, it, vi } from "vitest";
import { MAX_MESSAGE_LENGTH, WhatsAppClient, splitMessage } from "../src/whatsapp/client.js";

type FetchArgs = Parameters<typeof fetch>;

/** Doppio di `fetch` tipizzato, così `mock.calls` resta ispezionabile. */
function mockFetch(impl: (...args: FetchArgs) => Promise<Response>) {
  return vi.fn<(...args: FetchArgs) => Promise<Response>>(impl);
}

/** Corpo JSON inviato alla n-esima chiamata. */
function bodyOf(mock: ReturnType<typeof mockFetch>, index = 0): unknown {
  return JSON.parse(mock.mock.calls[index]![1]!.body as string);
}

function clientWith(fetchImpl: typeof fetch): WhatsAppClient {
  return new WhatsAppClient({
    token: "token-di-prova",
    phoneNumberId: "123456",
    graphVersion: "v23.0",
    fetchImpl,
  });
}

const ok = async () => new Response("{}", { status: 200 });

describe("splitMessage", () => {
  it("lascia intatto un testo entro il limite", () => {
    expect(splitMessage("ciao")).toEqual(["ciao"]);
  });

  it("restituisce un array vuoto per un testo vuoto", () => {
    expect(splitMessage("   ")).toEqual([]);
  });

  it("spezza sul limite della Cloud API senza superarlo", () => {
    const long = "parola ".repeat(1500);
    const chunks = splitMessage(long);

    expect(chunks.length).toBeGreaterThan(1);
    for (const chunk of chunks) {
      expect(chunk.length).toBeLessThanOrEqual(MAX_MESSAGE_LENGTH);
    }
  });

  it("taglia su un a capo quando è disponibile", () => {
    const body = `${"a".repeat(40)}\n${"b".repeat(40)}`;
    expect(splitMessage(body, 50)).toEqual(["a".repeat(40), "b".repeat(40)]);
  });

  it("taglia netto quando non ci sono spazi su cui appoggiarsi", () => {
    const chunks = splitMessage("x".repeat(120), 50);
    expect(chunks).toEqual(["x".repeat(50), "x".repeat(50), "x".repeat(20)]);
  });

  it("non perde testo nello split", () => {
    const body = "parola ".repeat(1500).trim();
    expect(splitMessage(body).join(" ")).toBe(body);
  });
});

describe("WhatsAppClient", () => {
  it("invia un testo all'endpoint del numero configurato", async () => {
    const fetchImpl = mockFetch(ok);
    await clientWith(fetchImpl as unknown as typeof fetch).sendText("39331", "ciao");

    expect(fetchImpl).toHaveBeenCalledTimes(1);
    const [url, init] = fetchImpl.mock.calls[0]!;
    expect(url).toBe("https://graph.facebook.com/v23.0/123456/messages");
    expect(init!.headers).toMatchObject({ Authorization: "Bearer token-di-prova" });
    expect(bodyOf(fetchImpl)).toEqual({
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: "39331",
      type: "text",
      text: { preview_url: false, body: "ciao" },
    });
  });

  it("manda una chiamata per ogni blocco di un testo lungo", async () => {
    const fetchImpl = mockFetch(ok);
    await clientWith(fetchImpl as unknown as typeof fetch).sendText("39331", "parola ".repeat(1500));

    expect(fetchImpl.mock.calls.length).toBeGreaterThan(1);
  });

  it("propaga l'errore quando la Graph API rifiuta la richiesta", async () => {
    const fetchImpl = mockFetch(async () => new Response('{"error":{"message":"token scaduto"}}', { status: 401 }));

    await expect(
      clientWith(fetchImpl as unknown as typeof fetch).sendText("39331", "ciao"),
    ).rejects.toThrow(/401.*token scaduto/s);
  });

  it("segnala lettura e digitazione riusando il message id", async () => {
    const fetchImpl = mockFetch(ok);
    await clientWith(fetchImpl as unknown as typeof fetch).markAsReadAndTyping("wamid.AAA");

    expect(bodyOf(fetchImpl)).toEqual({
      messaging_product: "whatsapp",
      status: "read",
      message_id: "wamid.AAA",
      typing_indicator: { type: "text" },
    });
  });

  it("non fa fallire il turno se la ricevuta di lettura va in errore", async () => {
    const fetchImpl = mockFetch(async () => new Response("nope", { status: 500 }));

    await expect(
      clientWith(fetchImpl as unknown as typeof fetch).markAsReadAndTyping("wamid.AAA"),
    ).resolves.toBeUndefined();
  });
});
