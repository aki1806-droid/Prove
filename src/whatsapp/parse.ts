import type { InboundMessage, RawMessage, WebhookBody } from "./types.js";

/**
 * Estrae i messaggi in arrivo da un payload webhook.
 *
 * Un singolo POST può contenere più entry, più change e più messaggi; Meta
 * consegna anche eventi di stato (consegnato/letto) sullo stesso endpoint, che
 * qui vengono scartati perché non richiedono risposta.
 */
export function extractMessages(body: WebhookBody): InboundMessage[] {
  const out: InboundMessage[] = [];

  for (const entry of body.entry ?? []) {
    for (const change of entry.changes ?? []) {
      const value = change.value;
      if (!value?.messages) continue;

      // I contatti arrivano in un array parallelo ai messaggi, non dentro di essi.
      const names = new Map<string, string>();
      for (const contact of value.contacts ?? []) {
        if (contact.wa_id && contact.profile?.name) {
          names.set(contact.wa_id, contact.profile.name);
        }
      }

      for (const raw of value.messages) {
        const message = normalize(raw, names);
        if (message) out.push(message);
      }
    }
  }

  return out;
}

function normalize(
  raw: RawMessage,
  names: Map<string, string>,
): InboundMessage | undefined {
  // Senza id non possiamo deduplicare, senza mittente non possiamo rispondere.
  if (!raw.id || !raw.from) return undefined;

  const profileName = names.get(raw.from);
  const base = profileName ? { id: raw.id, from: raw.from, profileName } : { id: raw.id, from: raw.from };

  const text = extractText(raw);
  if (text) return { ...base, text };

  return { ...base, unsupportedType: raw.type ?? "unknown" };
}

/**
 * Testo trattabile come input dell'utente. Oltre al testo semplice accettiamo
 * le risposte a bottoni e liste: per il modello sono a tutti gli effetti
 * qualcosa che il cliente ha "detto".
 */
function extractText(raw: RawMessage): string | undefined {
  switch (raw.type) {
    case "text":
      return nonEmpty(raw.text?.body);
    case "interactive":
      return nonEmpty(
        raw.interactive?.button_reply?.title ?? raw.interactive?.list_reply?.title,
      );
    case "button":
      return nonEmpty(raw.button?.text ?? raw.button?.payload);
    default:
      return undefined;
  }
}

function nonEmpty(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}
