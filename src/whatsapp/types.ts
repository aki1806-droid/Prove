/**
 * Sottoinsieme del payload webhook della WhatsApp Cloud API che ci serve.
 *
 * Tutto è opzionale di proposito: il payload arriva da un servizio esterno che
 * aggiunge campi e tipi di messaggio nel tempo, quindi il parser deve navigarlo
 * in modo difensivo invece di fidarsi della forma.
 */

export interface WebhookBody {
  object?: string;
  entry?: WebhookEntry[];
}

export interface WebhookEntry {
  id?: string;
  changes?: WebhookChange[];
}

export interface WebhookChange {
  field?: string;
  value?: WebhookValue;
}

export interface WebhookValue {
  messaging_product?: string;
  metadata?: { display_phone_number?: string; phone_number_id?: string };
  contacts?: { wa_id?: string; profile?: { name?: string } }[];
  messages?: RawMessage[];
  /** Ricevute di consegna/lettura: le ignoriamo. */
  statuses?: unknown[];
}

export interface RawMessage {
  id?: string;
  from?: string;
  timestamp?: string;
  type?: string;
  text?: { body?: string };
  interactive?: {
    type?: string;
    button_reply?: { id?: string; title?: string };
    list_reply?: { id?: string; title?: string };
  };
  button?: { payload?: string; text?: string };
}

/** Un messaggio in arrivo già normalizzato per il resto dell'applicazione. */
export interface InboundMessage {
  /** `wamid...`, stabile fra le riconsegne dello stesso evento. */
  id: string;
  /** Numero del cliente in formato internazionale senza `+`. */
  from: string;
  profileName?: string;
  /** Testo utilizzabile, assente per i tipi che non sappiamo gestire. */
  text?: string;
  /** Valorizzato quando il messaggio non è testuale (audio, immagine, ...). */
  unsupportedType?: string;
}
