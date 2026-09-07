import { describe, expect, it } from "vitest";
import { extractMessages } from "../src/whatsapp/parse.js";
import type { WebhookBody } from "../src/whatsapp/types.js";

function webhook(value: Record<string, unknown>): WebhookBody {
  return {
    object: "whatsapp_business_account",
    entry: [{ id: "123", changes: [{ field: "messages", value }] }],
  } as WebhookBody;
}

describe("extractMessages", () => {
  it("estrae un messaggio di testo con il nome del contatto", () => {
    const messages = extractMessages(
      webhook({
        contacts: [{ wa_id: "393331234567", profile: { name: "Giulia" } }],
        messages: [
          {
            id: "wamid.AAA",
            from: "393331234567",
            timestamp: "1757000000",
            type: "text",
            text: { body: "  Quanto costa la spedizione?  " },
          },
        ],
      }),
    );

    expect(messages).toEqual([
      {
        id: "wamid.AAA",
        from: "393331234567",
        profileName: "Giulia",
        text: "Quanto costa la spedizione?",
      },
    ]);
  });

  it("ignora le ricevute di consegna e lettura", () => {
    expect(extractMessages(webhook({ statuses: [{ id: "wamid.AAA", status: "delivered" }] }))).toEqual([]);
  });

  it("tratta la risposta a un bottone come testo dell'utente", () => {
    const messages = extractMessages(
      webhook({
        messages: [
          {
            id: "wamid.BBB",
            from: "393331234567",
            type: "interactive",
            interactive: {
              type: "button_reply",
              button_reply: { id: "spedizioni", title: "Spedizioni" },
            },
          },
        ],
      }),
    );

    expect(messages[0]?.text).toBe("Spedizioni");
  });

  it("segnala i tipi non testuali invece di scartarli", () => {
    const messages = extractMessages(
      webhook({ messages: [{ id: "wamid.CCC", from: "393331234567", type: "audio" }] }),
    );

    expect(messages[0]).toMatchObject({ id: "wamid.CCC", unsupportedType: "audio" });
    expect(messages[0]?.text).toBeUndefined();
  });

  it("scarta i messaggi senza id o senza mittente", () => {
    const body = webhook({
      messages: [
        { from: "393331234567", type: "text", text: { body: "ciao" } },
        { id: "wamid.DDD", type: "text", text: { body: "ciao" } },
      ],
    });
    expect(extractMessages(body)).toEqual([]);
  });

  it("tratta un testo vuoto come non utilizzabile", () => {
    const messages = extractMessages(
      webhook({
        messages: [{ id: "wamid.EEE", from: "393331234567", type: "text", text: { body: "   " } }],
      }),
    );

    expect(messages[0]?.text).toBeUndefined();
    expect(messages[0]?.unsupportedType).toBe("text");
  });

  it("gestisce payload vuoti o inattesi senza esplodere", () => {
    expect(extractMessages({})).toEqual([]);
    expect(extractMessages({ entry: [{}] })).toEqual([]);
    expect(extractMessages({ entry: [{ changes: [{}] }] })).toEqual([]);
  });

  it("raccoglie i messaggi da più entry nello stesso POST", () => {
    const body: WebhookBody = {
      entry: [
        {
          changes: [
            { value: { messages: [{ id: "wamid.1", from: "39331", type: "text", text: { body: "uno" } }] } },
          ],
        },
        {
          changes: [
            { value: { messages: [{ id: "wamid.2", from: "39332", type: "text", text: { body: "due" } }] } },
          ],
        },
      ],
    };

    expect(extractMessages(body).map((m) => m.text)).toEqual(["uno", "due"]);
  });
});
