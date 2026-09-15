/**
 * Codici numerici usati dalle API Picky Assist.
 * Fonte: help.pickyassist.com/api-documentation-v2
 */

/** Canale attraverso cui il messaggio viene inviato/ricevuto (campo `application`). */
export const APPLICATION = {
  WHATSAPP_PERSONAL: 1, // Phone Automation
  WHATSAPP_BUSINESS: 2, // Phone Automation
  SMS: 3, // Phone Automation
  CALL: 4, // Phone Automation
  FACEBOOK_MESSENGER: 5, // richiede `messenger_id` al posto di `number`
  TELEGRAM: 6, // nella doc compare come "Telegraph"
  WEB: 7,
  WHATSAPP_OFFICIAL: 8,
  WHATSAPP_CLOUD_API: 101,
  WHATSAPP_BUSINESS_API: 121,
};

/** Tipo di contenuto del messaggio (campo `type`). */
export const MESSAGE_TYPE = {
  TEXT: 1,
  IMAGE: 2,
  VIDEO: 3,
  AUDIO: 4,
  LOCATION: 5, // non supportato in Phone Automation
  DOCUMENT: 6,
  CONTACT: 7, // non supportato in Phone Automation
  INTERACTIVE: 9, // pulsanti interattivi WhatsApp Official
};

/** Tipo di elemento interattivo (campo `interactive.type`). */
export const INTERACTIVE_TYPE = {
  LIST: 1,
  QUICK_REPLY: 2,
};

/** Priorita' in coda (campo `priority`). */
export const PRIORITY = {
  LOW: 0,
  HIGH: 1,
};

/** Direzione del messaggio nel webhook (campo `direction`). */
export const DIRECTION = {
  INBOUND: 0,
  OUTBOUND: 1, // solo WhatsApp Web Automation, se abilitato dalle impostazioni
};

/** Codici di stato restituiti dalle API. 100 = accettato dai server Picky Assist. */
export const STATUS = {
  100: 'Success',
  101: 'Service Unavailable',
  401: 'Authentication Failed',
  402: 'Empty Number List',
  403: 'Insufficient Balance',
  404: 'Unable to Communicate with Your Phone',
  405: 'API Is Not Active For This Plan',
  406: 'Invalid Mobile Number',
  407: 'Message cannot be empty',
  408: 'Project is not Active',
  409: 'Invalid User',
  410: 'Invalid Request',
};

/**
 * Status 100 significa "accettato e messo in coda", non "consegnato".
 * La consegna effettiva arriva tramite Event Webhook (delivery report).
 */
export const STATUS_OK = 100;

/** Limite dichiarato dalla piattaforma: 90 richieste/minuto per progetto. */
export const API_RATE_LIMIT_PER_MINUTE = 90;
