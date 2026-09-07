import { describe, expect, it, vi } from "vitest";
import { FALLBACK_REPLY } from "../src/claude.js";
import { InMemoryConversationStore, type Turn } from "../src/conversation.js";
import { MessageHandler, UNSUPPORTED_REPLY } from "../src/handler.js";
import type { InboundMessage } from "../src/whatsapp/types.js";

function setup(reply: (history: Turn[], userMessage: string) => Promise<string>) {
  const sent: { to: string; body: string }[] = [];
  const whatsapp = {
    sendText: vi.fn(async (to: string, body: string) => {
      sent.push({ to, body });
    }),
    markAsReadAndTyping: vi.fn(async () => {}),
  };
  const store = new InMemoryConversationStore({ ttlMs: 60_000, maxMessages: 20 });
  const handler = new MessageHandler({ whatsapp, generator: { reply }, store });

  return { handler, whatsapp, store, sent };
}

function message(overrides: Partial<InboundMessage> = {}): InboundMessage {
  return { id: "wamid.AAA", from: "393331234567", text: "Quali sono gli orari?", ...overrides };
}

describe("MessageHandler", () => {
  it("risponde al cliente e salva il turno nello storico", async () => {
    const { handler, store, sent, whatsapp } = setup(async () => "Siamo aperti 9-18.");
    await handler.handle(message());

    expect(sent).toEqual([{ to: "393331234567", body: "Siamo aperti 9-18." }]);
    expect(whatsapp.markAsReadAndTyping).toHaveBeenCalledWith("wamid.AAA");
    expect(store.history("393331234567")).toEqual([
      { role: "user", content: "Quali sono gli orari?" },
      { role: "assistant", content: "Siamo aperti 9-18." },
    ]);
  });

  it("passa al modello lo storico dei turni precedenti", async () => {
    const seen: Turn[][] = [];
    const { handler } = setup(async (history) => {
      seen.push(history);
      return "ok";
    });

    await handler.handle(message({ id: "wamid.1", text: "primo" }));
    await handler.handle(message({ id: "wamid.2", text: "secondo" }));

    expect(seen[0]).toEqual([]);
    expect(seen[1]).toEqual([
      { role: "user", content: "primo" },
      { role: "assistant", content: "ok" },
    ]);
  });

  it("serializza i messaggi dello stesso contatto", async () => {
    const order: string[] = [];
    const { handler } = setup(async (_history, userMessage) => {
      order.push(`start:${userMessage}`);
      await new Promise((resolve) => setTimeout(resolve, userMessage === "primo" ? 20 : 0));
      order.push(`end:${userMessage}`);
      return "ok";
    });

    // Il secondo messaggio arriva mentre il primo è ancora in elaborazione:
    // deve comunque attendere, altrimenti vedrebbe uno storico incompleto.
    await Promise.all([
      handler.handle(message({ id: "wamid.1", text: "primo" })),
      handler.handle(message({ id: "wamid.2", text: "secondo" })),
    ]);

    expect(order).toEqual(["start:primo", "end:primo", "start:secondo", "end:secondo"]);
  });

  it("elabora in parallelo contatti diversi", async () => {
    let attivi = 0;
    let picco = 0;
    const { handler } = setup(async () => {
      attivi += 1;
      picco = Math.max(picco, attivi);
      await new Promise((resolve) => setTimeout(resolve, 10));
      attivi -= 1;
      return "ok";
    });

    await Promise.all([
      handler.handle(message({ id: "wamid.1", from: "39331" })),
      handler.handle(message({ id: "wamid.2", from: "39332" })),
    ]);

    expect(picco).toBe(2);
  });

  it("manda il messaggio di ripiego se il modello fallisce", async () => {
    const { handler, sent } = setup(async () => {
      throw new Error("API non raggiungibile");
    });

    await handler.handle(message());
    expect(sent[0]?.body).toBe(FALLBACK_REPLY);
  });

  it("non sporca lo storico con un turno fallito", async () => {
    const { handler, store } = setup(async () => {
      throw new Error("API non raggiungibile");
    });

    await handler.handle(message());
    expect(store.history("393331234567")).toEqual([]);
  });

  it("spiega al cliente che legge solo testo, senza chiamare il modello", async () => {
    const reply = vi.fn(async () => "non dovrebbe essere chiamato");
    const { handler, sent, whatsapp } = setup(reply);

    await handler.handle({ id: "wamid.AAA", from: "393331234567", unsupportedType: "audio" });

    expect(reply).not.toHaveBeenCalled();
    expect(sent[0]?.body).toBe(UNSUPPORTED_REPLY);
    expect(whatsapp.markAsReadAndTyping).not.toHaveBeenCalled();
  });

  it("non propaga un errore di invio: il webhook ha già risposto 200", async () => {
    const { handler, whatsapp } = setup(async () => "ok");
    whatsapp.sendText.mockRejectedValueOnce(new Error("Graph API 500"));

    await expect(handler.handle(message())).resolves.toBeUndefined();
  });
});
