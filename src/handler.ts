import type { ReplyGenerator } from "./claude.js";
import { FALLBACK_REPLY } from "./claude.js";
import type { ConversationStore } from "./conversation.js";
import { log, redactPhone } from "./logger.js";
import type { WhatsAppClient } from "./whatsapp/client.js";
import type { InboundMessage } from "./whatsapp/types.js";

/** Risposta ai messaggi che non sappiamo leggere (audio, immagini, posizione...). */
export const UNSUPPORTED_REPLY =
  "Al momento riesco a leggere solo messaggi di testo. Puoi scrivermi cosa ti serve?";

export interface MessageHandlerDeps {
  /** Solo i due metodi che usiamo, così i test possono passare un doppio. */
  whatsapp: Pick<WhatsAppClient, "sendText" | "markAsReadAndTyping">;
  generator: ReplyGenerator;
  store: ConversationStore;
}

/**
 * Orchestra il ciclo messaggio in arrivo -> risposta.
 *
 * I messaggi dello stesso contatto vengono elaborati in sequenza: se un cliente
 * manda due righe di fila, la seconda deve vedere lo storico aggiornato dalla
 * prima. Contatti diversi restano indipendenti e procedono in parallelo.
 */
export class MessageHandler {
  private readonly queues = new Map<string, Promise<void>>();

  constructor(private readonly deps: MessageHandlerDeps) {}

  handle(message: InboundMessage): Promise<void> {
    const previous = this.queues.get(message.from) ?? Promise.resolve();
    const next = previous.then(() => this.process(message));

    this.queues.set(message.from, next);
    // Liberiamo la voce quando la coda si svuota, altrimenti la mappa cresce
    // con un'entry per ogni contatto che ha scritto almeno una volta.
    void next.finally(() => {
      if (this.queues.get(message.from) === next) this.queues.delete(message.from);
    });

    return next;
  }

  private async process(message: InboundMessage): Promise<void> {
    const contact = redactPhone(message.from);

    if (!message.text) {
      log.info("messaggio non testuale ignorato", {
        contact,
        type: message.unsupportedType,
      });
      await this.safeSend(message.from, UNSUPPORTED_REPLY);
      return;
    }

    await this.deps.whatsapp.markAsReadAndTyping(message.id);

    let reply: string;
    try {
      const history = this.deps.store.history(message.from);
      reply = await this.deps.generator.reply(history, message.text);
      this.deps.store.append(
        message.from,
        { role: "user", content: message.text },
        { role: "assistant", content: reply },
      );
    } catch (error) {
      // Lo storico non viene toccato: un turno fallito non deve lasciare in
      // memoria una domanda senza risposta, che confonderebbe il turno dopo.
      log.error("generazione della risposta fallita", {
        contact,
        error: describe(error),
      });
      reply = FALLBACK_REPLY;
    }

    await this.safeSend(message.from, reply);
  }

  private async safeSend(to: string, body: string): Promise<void> {
    try {
      await this.deps.whatsapp.sendText(to, body);
    } catch (error) {
      // Qui la catena finisce: se non riusciamo nemmeno a scrivere al cliente
      // resta solo il log. Meta non riconsegna il webhook se abbiamo già
      // risposto 200, quindi non c'è un retry automatico da attendere.
      log.error("invio del messaggio fallito", {
        contact: redactPhone(to),
        error: describe(error),
      });
    }
  }
}

function describe(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
