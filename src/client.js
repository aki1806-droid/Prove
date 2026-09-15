import { APPLICATION, MESSAGE_TYPE, PRIORITY, STATUS, STATUS_OK } from './constants.js';

/** Errore applicativo restituito dalle API Picky Assist (o dal trasporto HTTP). */
export class PickyAssistError extends Error {
  constructor(message, { status, httpStatus, body, endpoint } = {}) {
    super(message);
    this.name = 'PickyAssistError';
    this.status = status;
    this.httpStatus = httpStatus;
    this.body = body;
    this.endpoint = endpoint;
  }
}

/**
 * Normalizza un numero nel formato richiesto: solo cifre, prefisso
 * internazionale incluso, senza "+", spazi o zeri iniziali.
 * Esempio: "+39 333 123 4567" -> "393331234567"
 */
export function normalizeNumber(input) {
  if (input === undefined || input === null) {
    throw new PickyAssistError('Numero destinatario mancante.');
  }
  const digits = String(input).replace(/\D/g, '').replace(/^0+/, '');
  if (digits.length < 5) {
    throw new PickyAssistError(
      `Numero "${input}" non valido: servono almeno 5 cifre con prefisso internazionale, senza + o 0 iniziali.`,
    );
  }
  return digits;
}

/** Finestra scorrevole che tiene le richieste sotto il limite dichiarato dall'API. */
class RateLimiter {
  #timestamps = [];

  constructor(maxPerMinute) {
    this.maxPerMinute = maxPerMinute;
  }

  async acquire() {
    if (!this.maxPerMinute || this.maxPerMinute <= 0) return;
    const now = Date.now();
    this.#timestamps = this.#timestamps.filter((t) => now - t < 60_000);
    if (this.#timestamps.length >= this.maxPerMinute) {
      const waitMs = 60_000 - (now - this.#timestamps[0]) + 50;
      await new Promise((resolve) => setTimeout(resolve, waitMs));
      return this.acquire();
    }
    this.#timestamps.push(Date.now());
  }
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Client per le API di Picky Assist.
 * L'autenticazione avviene passando il token nel body JSON, non negli header.
 */
export class PickyAssistClient {
  constructor({
    token,
    baseUrl = 'https://app.pickyassist.com/api/v2',
    application = APPLICATION.WHATSAPP_OFFICIAL,
    timeoutMs = 15_000,
    maxRetries = 2,
    rateLimitPerMinute = 80,
    fetchImpl = globalThis.fetch,
  } = {}) {
    if (!token) throw new PickyAssistError('Token API mancante: impossibile creare il client.');
    this.token = token;
    this.baseUrl = baseUrl.replace(/\/+$/, '');
    this.application = application;
    this.timeoutMs = timeoutMs;
    this.maxRetries = maxRetries;
    this.fetchImpl = fetchImpl;
    this.limiter = new RateLimiter(rateLimitPerMinute);
  }

  /** Esegue una POST JSON su un endpoint, aggiungendo il token e gestendo i retry. */
  async request(endpoint, body = {}) {
    const url = `${this.baseUrl}/${endpoint.replace(/^\/+/, '')}`;
    const payload = JSON.stringify({ token: this.token, ...body });
    let lastError;

    for (let attempt = 0; attempt <= this.maxRetries; attempt += 1) {
      await this.limiter.acquire();
      try {
        const response = await this.fetchImpl(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
          signal: AbortSignal.timeout(this.timeoutMs),
        });

        const text = await response.text();
        let parsed;
        try {
          parsed = JSON.parse(text);
        } catch {
          throw new PickyAssistError('Risposta non in formato JSON.', {
            httpStatus: response.status,
            body: text.slice(0, 500),
            endpoint,
          });
        }

        // 429: limite di 90 richieste/minuto superato, vale la pena riprovare.
        if (response.status === 429) {
          lastError = new PickyAssistError('Rate limit superato (max 90 richieste/minuto per progetto).', {
            httpStatus: 429,
            body: parsed,
            endpoint,
          });
          if (attempt < this.maxRetries) {
            await sleep(2 ** attempt * 1000);
            continue;
          }
          throw lastError;
        }

        const status = Number(parsed.status);
        if (status !== STATUS_OK) {
          throw new PickyAssistError(
            `Picky Assist ha rifiutato la richiesta: ${parsed.message ?? STATUS[status] ?? 'errore sconosciuto'} (status ${status}).`,
            { status, httpStatus: response.status, body: parsed, endpoint },
          );
        }

        return parsed;
      } catch (error) {
        // Errori applicativi non si ritentano: il risultato non cambierebbe.
        if (error instanceof PickyAssistError && error.status !== undefined) throw error;
        lastError = error;
        if (attempt < this.maxRetries) {
          await sleep(2 ** attempt * 1000);
          continue;
        }
      }
    }

    throw new PickyAssistError(
      `Chiamata a ${endpoint} fallita dopo ${this.maxRetries + 1} tentativi: ${lastError?.message ?? 'errore sconosciuto'}`,
      { endpoint },
    );
  }

  /**
   * Costruisce l'identificativo del destinatario in base al canale.
   * Facebook Messenger non usa il numero di telefono ma il `messenger_id`
   * assegnato da Facebook, che non va normalizzato.
   */
  recipient(to, application) {
    const channel = application ?? this.application;
    if (channel === APPLICATION.FACEBOOK_MESSENGER) {
      if (to === undefined || to === null || String(to).trim() === '') {
        throw new PickyAssistError('messenger_id mancante: obbligatorio sul canale Facebook Messenger.');
      }
      return { messenger_id: String(to).trim() };
    }
    return { number: normalizeNumber(to) };
  }

  /** Invio grezzo: accetta il payload completo della Push API. */
  async push(payload) {
    return this.request('push', {
      application: this.application,
      priority: PRIORITY.LOW,
      ...payload,
    });
  }

  /** Invia un messaggio di testo a un singolo destinatario. */
  async sendText({ to, message, application, priority, referenceNumber, quoted, createContact }) {
    if (!message || !String(message).trim()) {
      throw new PickyAssistError("Il messaggio non puo' essere vuoto.");
    }
    return this.push({
      ...(application !== undefined ? { application } : {}),
      ...(priority !== undefined ? { priority } : {}),
      ...(quoted !== undefined ? { quoted } : {}),
      ...(createContact ? { createcontact: 1 } : {}),
      data: [
        {
          ...this.recipient(to, application),
          message: String(message),
          ...(referenceNumber ? { reference_number: String(referenceNumber) } : {}),
        },
      ],
    });
  }

  /** Invia un media (immagine, video, audio, documento) con didascalia opzionale. */
  async sendMedia({ to, mediaUrl, caption = '', type = MESSAGE_TYPE.IMAGE, application, referenceNumber }) {
    if (!mediaUrl) throw new PickyAssistError('mediaUrl mancante: serve un URL pubblico (max 50 MB).');
    return this.push({
      ...(application !== undefined ? { application } : {}),
      globalmedia: mediaUrl,
      type,
      data: [
        {
          ...this.recipient(to, application),
          message: caption,
          ...(referenceNumber ? { reference_number: String(referenceNumber) } : {}),
        },
      ],
    });
  }

  /**
   * Invio massivo. `recipients` accetta numeri semplici oppure oggetti
   * { to, message, referenceNumber } per messaggi personalizzati.
   * `globalMessage` viene usato per i destinatari senza testo dedicato.
   */
  async sendBulk({ recipients, globalMessage, globalMedia, application, priority, type }) {
    if (!Array.isArray(recipients) || recipients.length === 0) {
      throw new PickyAssistError("Nessun destinatario: la lista e' vuota.");
    }
    const data = recipients.map((item) => {
      const entry = typeof item === 'object' && item !== null ? item : { to: item };
      return {
        ...this.recipient(entry.to ?? entry.number ?? entry.messengerId, application),
        ...(entry.message ? { message: String(entry.message) } : {}),
        ...(entry.referenceNumber ? { reference_number: String(entry.referenceNumber) } : {}),
      };
    });

    const hasPerRecipientMessage = data.every((entry) => entry.message);
    if (!globalMessage && !globalMedia && !hasPerRecipientMessage) {
      throw new PickyAssistError(
        'Serve globalMessage oppure un campo message per ogni destinatario.',
      );
    }

    return this.push({
      ...(application !== undefined ? { application } : {}),
      ...(priority !== undefined ? { priority } : {}),
      ...(type !== undefined ? { type } : {}),
      ...(globalMessage ? { globalmessage: String(globalMessage) } : {}),
      ...(globalMedia ? { globalmedia: globalMedia } : {}),
      data,
    });
  }

  /** Invia un template WhatsApp Official (necessario fuori dalla finestra di 24 ore). */
  async sendTemplate({ to, templateId, language, variables = [], header, application, referenceNumber }) {
    if (!templateId) throw new PickyAssistError('templateId mancante.');
    if (!language) throw new PickyAssistError('language mancante (es. "it" o "en").');
    return this.push({
      application: application ?? this.application,
      template_id: templateId,
      language,
      ...(header ? { template_header: header } : {}),
      ...(variables.length ? { template_globalmessage: variables } : {}),
      data: [
        {
          number: normalizeNumber(to),
          ...(referenceNumber ? { reference_number: String(referenceNumber) } : {}),
        },
      ],
    });
  }

  /** Verifica token e credito residuo del progetto. */
  async checkBalance() {
    return this.request('check-balance');
  }

  /**
   * Stato del dispositivo (batteria, coda, spazio libero) per i canali
   * Phone Automation.
   *
   * Usa per default lo stesso host del resto del client: i token sono legati
   * alla versione dell'endpoint, quindi un token V4 viene rifiutato con 401
   * sull'host legacy. Passare `baseUrl` solo se il progetto vive sul V2.
   *
   * Restituisce status 101 (Service Unavailable) se al progetto non e'
   * associato un dispositivo Phone Automation.
   */
  async deviceStatus({ baseUrl } = {}) {
    if (!baseUrl) return this.request('device-status');

    const previous = this.baseUrl;
    this.baseUrl = baseUrl.replace(/\/+$/, '');
    try {
      return await this.request('device-status');
    } finally {
      this.baseUrl = previous;
    }
  }
}

/** Crea un client a partire dalla configurazione applicativa. */
export function createClient(config) {
  return new PickyAssistClient({
    token: config.token,
    baseUrl: config.baseUrl,
    application: config.application,
    timeoutMs: config.timeoutMs,
    maxRetries: config.maxRetries,
    rateLimitPerMinute: config.rateLimitPerMinute,
  });
}
