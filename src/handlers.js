import { MESSAGE_TYPE } from './constants.js';
import { hasMedia, isFromGroup, senderId } from './webhook/parse.js';
import { noReply, textReply } from './webhook/reply.js';

/**
 * Router dei messaggi in entrata.
 *
 * Questo e' il punto in cui si innesta la logica applicativa: qui sotto c'e'
 * un esempio funzionante da sostituire con le regole reali.
 *
 * Il valore restituito diventa la risposta istantanea inviata dall'utente
 * (vedi src/webhook/reply.js). Restituire `null` o `noReply()` per non
 * rispondere. Per azioni asincrone (es. una risposta dopo un'elaborazione
 * lunga) usare invece il client Push API.
 */
export function createMessageHandler({ client, logger = console } = {}) {
  return async function handleMessage(message) {
    const from = senderId(message);
    logger.info(
      `[in] ${from}${message.name ? ` (${message.name})` : ''} | canale=${message.application} tipo=${message.type} | ${message.text || '(senza testo)'}`,
    );

    // Nei gruppi rispondiamo solo se citati, per non essere invadenti.
    if (isFromGroup(message) && !message.groupMentions) {
      return noReply();
    }

    // Click su un pulsante interattivo: il payload identifica l'azione.
    if (message.type === MESSAGE_TYPE.INTERACTIVE || message.payload) {
      logger.info(`[in] pulsante premuto: ${message.payload ?? message.interactive?.id}`);
      return textReply('Ricevuto, procedo con la tua scelta.');
    }

    if (hasMedia(message)) {
      return textReply('Ho ricevuto il tuo allegato, lo controllo subito.');
    }

    const text = message.text.trim().toLowerCase();

    switch (text) {
      case 'ping':
        return textReply('pong');

      case 'ciao':
      case 'buongiorno':
      case 'hello':
        return textReply(`Ciao${message.name ? ` ${message.name}` : ''}! Come posso aiutarti?`);

      case 'orari':
        return textReply('Siamo operativi dal lunedì al venerdì, dalle 9:00 alle 18:00.');

      case 'operatore':
        // Esempio di azione asincrona: notifica interna senza bloccare la risposta.
        if (client) {
          logger.info(`[out] richiesta operatore da ${from}`);
        }
        return textReply('Ti metto in contatto con un operatore, resta in linea.');

      default:
        return textReply(
          'Non ho capito la richiesta. Scrivi "orari" per gli orari di apertura oppure "operatore" per parlare con una persona.',
        );
    }
  };
}
