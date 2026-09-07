import { log, redactPhone } from "../logger.js";

/** Limite del corpo di un messaggio di testo imposto dalla Cloud API. */
export const MAX_MESSAGE_LENGTH = 4096;

export interface WhatsAppClientOptions {
  token: string;
  phoneNumberId: string;
  graphVersion: string;
  /** Iniettabile nei test; di default il `fetch` globale di Node. */
  fetchImpl?: typeof fetch;
}

export class WhatsAppClient {
  private readonly endpoint: string;
  private readonly token: string;
  private readonly fetchImpl: typeof fetch;

  constructor(options: WhatsAppClientOptions) {
    this.endpoint = `https://graph.facebook.com/${options.graphVersion}/${options.phoneNumberId}/messages`;
    this.token = options.token;
    this.fetchImpl = options.fetchImpl ?? fetch;
  }

  /**
   * Invia un testo al cliente, spezzandolo se supera il limite della Cloud API.
   * I blocchi partono in sequenza per non arrivare fuori ordine.
   */
  async sendText(to: string, body: string): Promise<void> {
    for (const chunk of splitMessage(body)) {
      await this.post({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to,
        type: "text",
        text: { preview_url: false, body: chunk },
      });
    }
  }

  /**
   * Segna il messaggio come letto e mostra i tre puntini finché non rispondiamo.
   *
   * È puramente cosmetico ma cambia molto l'esperienza: senza, il cliente resta
   * davanti a una chat immobile per tutta la latenza del modello. Un errore qui
   * non deve impedire la risposta vera, quindi viene solo loggato.
   */
  async markAsReadAndTyping(messageId: string): Promise<void> {
    try {
      await this.post({
        messaging_product: "whatsapp",
        status: "read",
        message_id: messageId,
        typing_indicator: { type: "text" },
      });
    } catch (error) {
      log.warn("impossibile segnare il messaggio come letto", {
        messageId,
        error: describe(error),
      });
    }
  }

  private async post(payload: Record<string, unknown>): Promise<void> {
    const response = await this.fetchImpl(this.endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15_000),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      throw new Error(
        `Graph API ha risposto ${response.status}: ${detail.slice(0, 500)}`,
      );
    }

    log.info("messaggio inviato", {
      to: typeof payload.to === "string" ? redactPhone(payload.to) : undefined,
      type: payload.type ?? payload.status,
    });
  }
}

/**
 * Spezza un testo in blocchi da al massimo `MAX_MESSAGE_LENGTH` caratteri,
 * tagliando su un a capo o uno spazio quando possibile per non troncare parole.
 */
export function splitMessage(
  body: string,
  limit = MAX_MESSAGE_LENGTH,
): string[] {
  const text = body.trim();
  if (text.length <= limit) return text ? [text] : [];

  const chunks: string[] = [];
  let rest = text;

  while (rest.length > limit) {
    const window = rest.slice(0, limit);
    // Cerchiamo il punto di taglio più avanzato fra fine paragrafo e spazio;
    // se il testo non ne offre (una URL lunghissima) si taglia netto.
    const cut = Math.max(window.lastIndexOf("\n\n"), window.lastIndexOf("\n"), window.lastIndexOf(" "));
    const end = cut > limit * 0.5 ? cut : limit;
    chunks.push(rest.slice(0, end).trim());
    rest = rest.slice(end).trim();
  }

  if (rest) chunks.push(rest);
  return chunks;
}

function describe(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
