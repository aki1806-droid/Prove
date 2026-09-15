import { APPLICATION, DIRECTION, MESSAGE_TYPE } from '../constants.js';

/**
 * Il campo `message-in` arriva URL-encoded (con "+" al posto degli spazi).
 * Quando disponibile, `message_in_raw` contiene gia' il testo in chiaro.
 */
export function decodeMessage(value) {
  if (typeof value !== 'string' || value === '') return '';
  try {
    return decodeURIComponent(value.replace(/\+/g, ' '));
  } catch {
    // Percent-encoding malformato: restituiamo il testo cosi' com'e'.
    return value.replace(/\+/g, ' ');
  }
}

function toNumber(value) {
  if (value === undefined || value === null || value === '') return undefined;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
}

function toArray(value) {
  if (value === undefined || value === null) return [];
  return Array.isArray(value) ? value : [value];
}

/**
 * Trasforma il payload del Global Webhook in un oggetto normalizzato,
 * con nomi di campo coerenti in camelCase.
 *
 * Gestisce sia il metodo JSON sia il metodo query string (deprecato), e le
 * incoerenze note della documentazione (es. `location` vs `Location`).
 */
export function parseIncoming(raw = {}) {
  const text = raw.message_in_raw ?? decodeMessage(raw['message-in']);
  const type = toNumber(raw.type) ?? MESSAGE_TYPE.TEXT;
  const application = toNumber(raw.application);
  const location = raw.location ?? raw.Location;

  return {
    /** Numero del mittente, con prefisso internazionale, senza + */
    number: raw.number !== undefined ? String(raw.number) : undefined,
    /** Id utente Facebook, presente solo sul canale Messenger */
    messengerId: raw.messenger_id !== undefined ? String(raw.messenger_id) : undefined,
    name: raw.name ?? undefined,
    text,
    type,
    application,
    direction: toNumber(raw.direction) ?? DIRECTION.INBOUND,
    uniqueId: raw['unique-id'] !== undefined ? String(raw['unique-id']) : undefined,
    projectId: raw['project-id'] !== undefined ? String(raw['project-id']) : undefined,
    groupId: raw['group-id'] ?? undefined,
    groupMentions: raw['group-mentions'] ?? undefined,
    /** msg_id del messaggio a cui l'utente sta rispondendo (contesto conversazione) */
    contextMsgId: raw['context-msg-id'] !== undefined ? String(raw['context-msg-id']) : undefined,
    mediaUrl: raw['media-url'] ?? undefined,
    /** payload custom associato al pulsante premuto */
    payload: raw.payload ?? undefined,
    interactive: raw.interactive ?? undefined,
    referral: raw.referral ?? undefined,
    location: location ?? undefined,
    contacts: toArray(raw.contact),
    /** payload originale, per i campi custom definiti nel progetto */
    raw,
  };
}

/** True se il messaggio in entrata porta un allegato multimediale. */
export function hasMedia(message) {
  return Boolean(message.mediaUrl) ||
    [MESSAGE_TYPE.IMAGE, MESSAGE_TYPE.VIDEO, MESSAGE_TYPE.AUDIO, MESSAGE_TYPE.DOCUMENT].includes(message.type);
}

/** True se il messaggio arriva da un gruppo WhatsApp. */
export function isFromGroup(message) {
  return Boolean(message.groupId);
}

/** Identificativo del mittente da usare per rispondere, qualunque sia il canale. */
export function senderId(message) {
  return message.application === APPLICATION.FACEBOOK_MESSENGER
    ? message.messengerId
    : message.number;
}
