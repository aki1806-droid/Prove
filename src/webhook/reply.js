import { MESSAGE_TYPE } from '../constants.js';

/**
 * Costruttori della risposta istantanea: restituendo questo JSON nel corpo
 * della risposta al webhook, Picky Assist invia il messaggio senza che serva
 * una seconda chiamata alla Push API.
 *
 * La risposta DEVE essere JSON valido, altrimenti la replica non viene
 * inviata. `message-out` non va URL-encoded.
 */

/** Risposta testuale. `delay` e' in secondi. */
export function textReply(message, { delay = 0, referenceNumber, application } = {}) {
  return {
    'message-out': String(message),
    delay: String(delay),
    type: String(MESSAGE_TYPE.TEXT),
    ...(application !== undefined ? { application: String(application) } : {}),
    ...(referenceNumber ? { reference_number: String(referenceNumber) } : {}),
  };
}

/** Risposta con allegato multimediale recuperato da un URL pubblico. */
export function mediaReply(mediaUrl, { message = '', type = MESSAGE_TYPE.IMAGE, delay = 0, application, referenceNumber } = {}) {
  return {
    'message-out': String(message),
    'media-url': mediaUrl,
    delay: String(delay),
    type: String(type),
    ...(application !== undefined ? { application: String(application) } : {}),
    ...(referenceNumber ? { reference_number: String(referenceNumber) } : {}),
  };
}

/** Risposta con posizione geografica. Non supportata in Phone Automation. */
export function locationReply({ lat, long, name = '', address = '' }, { application } = {}) {
  return {
    type: String(MESSAGE_TYPE.LOCATION),
    ...(application !== undefined ? { application: String(application) } : {}),
    location: { lat, long, name, address },
  };
}

/** Risposta con una o piu' schede contatto. Non supportata in Phone Automation. */
export function contactReply(contacts, { application } = {}) {
  return {
    type: String(MESSAGE_TYPE.CONTACT),
    ...(application !== undefined ? { application: String(application) } : {}),
    contact: Array.isArray(contacts) ? contacts : [contacts],
  };
}

/** Nessuna replica automatica: si conferma la ricezione e basta. */
export function noReply() {
  return {};
}
