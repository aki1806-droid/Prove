import Anthropic from "@anthropic-ai/sdk";
import type { Config } from "./config.js";
import type { Turn } from "./conversation.js";
import { log } from "./logger.js";

/**
 * Beta della gestione dei rifiuti lato server: se i classificatori di sicurezza
 * declinano la richiesta, l'API rigira la stessa chiamata su un modello di
 * fallback invece di restituire una risposta vuota al cliente.
 */
const FALLBACK_BETA = "server-side-fallback-2026-07-01";

/** Cosa scriviamo al cliente quando non riusciamo a produrre una risposta. */
export const FALLBACK_REPLY =
  "Scusa, in questo momento non riesco a risponderti. Riprova fra poco oppure scrivi *operatore* per parlare con una persona.";

export interface ReplyGenerator {
  reply(history: Turn[], userMessage: string): Promise<string>;
}

export class ClaudeReplyGenerator implements ReplyGenerator {
  constructor(
    private readonly config: Config,
    private readonly client: Anthropic = new Anthropic(),
  ) {}

  async reply(history: Turn[], userMessage: string): Promise<string> {
    const response = await this.client.beta.messages.create({
      model: this.config.model,
      // Volutamente basso: una risposta su WhatsApp si legge dal telefono e il
      // corpo di un messaggio si ferma comunque a 4096 caratteri. Alzalo solo
      // se il bot deve produrre risposte lunghe (riepiloghi, istruzioni passo
      // passo), tenendo conto che allunga anche la latenza percepita in chat.
      max_tokens: this.config.maxTokens,
      // L'effort di default è "low" perché il servizio clienti è una rotta
      // conversazionale e latency-sensitive: il cliente aspetta davanti alla
      // chat. Alzalo in .env se le domande richiedono più ragionamento.
      output_config: { effort: this.config.effort },
      system: [
        {
          type: "text",
          text: this.config.systemPrompt,
          // Paga solo se il prompt di sistema supera la soglia minima di
          // caching (ordine dei 1024 token), cioè quando ci agganci una base
          // di conoscenza: listino, FAQ, condizioni di reso.
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: [
        ...history.map((turn) => ({ role: turn.role, content: turn.content })),
        { role: "user" as const, content: userMessage },
      ],
      betas: [FALLBACK_BETA],
      fallbacks: "default",
    });

    if (response.stop_reason === "refusal") {
      log.warn("richiesta declinata dai classificatori di sicurezza", {
        stopDetails: response.stop_details,
      });
      return FALLBACK_REPLY;
    }

    const text = response.content
      .filter((block): block is Anthropic.Beta.BetaTextBlock => block.type === "text")
      .map((block) => block.text)
      .join("\n")
      .trim();

    if (!text) {
      log.warn("risposta senza contenuto testuale", {
        stopReason: response.stop_reason,
      });
      return FALLBACK_REPLY;
    }

    log.info("risposta generata", {
      model: response.model,
      stopReason: response.stop_reason,
      inputTokens: response.usage.input_tokens,
      outputTokens: response.usage.output_tokens,
      cacheReadTokens: response.usage.cache_read_input_tokens,
    });

    return text;
  }
}
