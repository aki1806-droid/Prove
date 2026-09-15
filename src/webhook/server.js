import http from 'node:http';
import { timingSafeEqual } from 'node:crypto';

import { parseIncoming } from './parse.js';

const MAX_BODY_BYTES = 1024 * 1024; // 1 MB: i payload webhook sono piccoli

/** Confronto a tempo costante, per non esporre il segreto a timing attack. */
function secretMatches(expected, received) {
  if (!received) return false;
  const a = Buffer.from(String(expected));
  const b = Buffer.from(String(received));
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/** Legge il corpo della richiesta applicando il limite di dimensione. */
function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(new Error('Payload troppo grande.'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

/**
 * Interpreta il corpo della richiesta. Picky Assist usa il metodo JSON;
 * il metodo query string (deprecato nel 2020) passa i campi come parametri,
 * quindi accettiamo anche quelli per compatibilita'.
 */
function parseBody(body, contentType, searchParams) {
  const fromQuery = Object.fromEntries(searchParams.entries());
  delete fromQuery.secret;

  if (!body) return fromQuery;

  if ((contentType ?? '').includes('application/json')) {
    return { ...fromQuery, ...JSON.parse(body) };
  }

  if ((contentType ?? '').includes('application/x-www-form-urlencoded')) {
    return { ...fromQuery, ...Object.fromEntries(new URLSearchParams(body).entries()) };
  }

  // Content-Type assente o generico: proviamo comunque il parsing JSON.
  try {
    return { ...fromQuery, ...JSON.parse(body) };
  } catch {
    return { ...fromQuery, ...Object.fromEntries(new URLSearchParams(body).entries()) };
  }
}

function clientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket.remoteAddress ?? '';
}

function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
  });
  res.end(body);
}

/**
 * Crea il server che riceve i messaggi in entrata dal Global Webhook.
 *
 * @param {object} options
 * @param {(message: object, raw: object) => Promise<object|null>} options.handler
 *        Riceve il messaggio normalizzato e restituisce l'eventuale risposta
 *        istantanea (vedi src/webhook/reply.js) oppure null.
 * @param {object} options.config Configurazione applicativa (vedi src/config.js).
 * @param {Console} [options.logger]
 */
export function createWebhookServer({ handler, config, logger = console }) {
  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`);

    // Endpoint di salute, comodo per uptime monitor e load balancer.
    if (req.method === 'GET' && url.pathname === '/health') {
      return sendJson(res, 200, { status: 'ok', uptime: process.uptime() });
    }

    if (url.pathname !== config.webhookPath) {
      return sendJson(res, 404, { error: 'Not found' });
    }

    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return sendJson(res, 405, { error: 'Method not allowed: usare POST.' });
    }

    if (config.allowedIps.length > 0 && !config.allowedIps.includes(clientIp(req))) {
      logger.warn(`[webhook] IP non autorizzato: ${clientIp(req)}`);
      return sendJson(res, 403, { error: 'Forbidden' });
    }

    if (config.webhookSecret) {
      const provided = url.searchParams.get('secret') ?? req.headers['x-webhook-secret'];
      if (!secretMatches(config.webhookSecret, provided)) {
        logger.warn(`[webhook] Segreto non valido da ${clientIp(req)}`);
        return sendJson(res, 401, { error: 'Unauthorized' });
      }
    }

    let raw;
    try {
      const body = await readBody(req);
      raw = parseBody(body, req.headers['content-type'], url.searchParams);
    } catch (error) {
      logger.error(`[webhook] Payload non leggibile: ${error.message}`);
      return sendJson(res, 400, { error: 'Payload non valido.' });
    }

    if (config.logRawPayload) {
      logger.info(`[webhook] payload: ${JSON.stringify(raw)}`);
    }

    const message = parseIncoming(raw);

    try {
      const reply = await handler(message, raw);
      // Rispondiamo sempre 200 con JSON valido: un corpo non JSON fa saltare
      // la replica istantanea lato Picky Assist.
      return sendJson(res, 200, reply ?? {});
    } catch (error) {
      logger.error(`[webhook] Errore nella gestione del messaggio: ${error.stack ?? error.message}`);
      // 200 anche in caso di errore applicativo: evita retry a raffica.
      return sendJson(res, 200, {});
    }
  });

  return server;
}
