/**
 * Configurazione letta dall'ambiente e validata all'avvio.
 *
 * Il processo termina subito se manca una variabile obbligatoria: meglio
 * fallire al boot che scoprire una credenziale assente al primo messaggio
 * di un cliente reale.
 */

export type Effort = "low" | "medium" | "high" | "xhigh" | "max";

const EFFORTS: readonly Effort[] = ["low", "medium", "high", "xhigh", "max"];

export interface Config {
  port: number;
  /** Token arbitrario che condividi con Meta per la verifica del webhook. */
  verifyToken: string;
  /** App secret dell'app Meta: firma ogni POST in arrivo. */
  appSecret: string;
  /** Access token (permanente, da system user) per la Graph API. */
  whatsappToken: string;
  /** ID del numero mittente, non il numero di telefono. */
  phoneNumberId: string;
  graphVersion: string;
  model: string;
  effort: Effort;
  maxTokens: number;
  systemPrompt: string;
  /** Dopo quanta inattività lo storico di un contatto viene dimenticato. */
  conversationTtlMs: number;
  /** Numero massimo di messaggi (user + assistant) tenuti nello storico. */
  maxHistoryMessages: number;
}

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Variabile d'ambiente mancante: ${name}. Copia .env.example in .env e compilala.`,
    );
  }
  return value;
}

function intOr(name: string, fallback: number): number {
  const raw = process.env[name];
  if (!raw) return fallback;
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error(`${name} deve essere un intero positivo, ricevuto "${raw}".`);
  }
  return parsed;
}

const DEFAULT_SYSTEM_PROMPT = `Sei l'assistente virtuale del servizio clienti su WhatsApp.

Regole di comportamento:
- Rispondi sempre nella lingua del cliente.
- Sii breve: su WhatsApp si legge dal telefono. Punta a 2-4 frasi, senza elenchi puntati se non servono davvero.
- Niente markdown complesso: WhatsApp supporta solo *grassetto*, _corsivo_ e ~barrato~.
- Se non conosci la risposta o serve un intervento umano (reclami, rimborsi, dati sensibili), dillo apertamente e proponi il passaggio a un operatore.
- Non inventare mai prezzi, disponibilità, tempi di consegna o condizioni contrattuali.
- Non chiedere e non ripetere dati di pagamento, password o documenti d'identità.`;

export function loadConfig(): Config {
  const effort = (process.env.CLAUDE_EFFORT ?? "low") as Effort;
  if (!EFFORTS.includes(effort)) {
    throw new Error(
      `CLAUDE_EFFORT deve essere uno tra ${EFFORTS.join(", ")}, ricevuto "${effort}".`,
    );
  }

  return {
    port: intOr("PORT", 3000),
    verifyToken: required("WHATSAPP_VERIFY_TOKEN"),
    appSecret: required("WHATSAPP_APP_SECRET"),
    whatsappToken: required("WHATSAPP_TOKEN"),
    phoneNumberId: required("WHATSAPP_PHONE_NUMBER_ID"),
    graphVersion: process.env.WHATSAPP_GRAPH_VERSION ?? "v23.0",
    model: process.env.CLAUDE_MODEL ?? "claude-opus-5",
    effort,
    maxTokens: intOr("CLAUDE_MAX_TOKENS", 1024),
    systemPrompt: process.env.CLAUDE_SYSTEM_PROMPT ?? DEFAULT_SYSTEM_PROMPT,
    conversationTtlMs: intOr("CONVERSATION_TTL_MINUTES", 60) * 60_000,
    maxHistoryMessages: intOr("MAX_HISTORY_MESSAGES", 20),
  };
}
