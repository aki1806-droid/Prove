import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

import { APPLICATION } from './constants.js';

/**
 * Carica il file .env (se presente) senza dipendenze esterne.
 * `process.loadEnvFile` e' disponibile da Node 20.12.
 */
export function loadEnvFile(path = resolve(process.cwd(), '.env')) {
  if (!existsSync(path)) return false;
  process.loadEnvFile(path);
  return true;
}

function str(name, fallback = '') {
  const value = process.env[name];
  return value === undefined || value === '' ? fallback : value.trim();
}

function int(name, fallback) {
  const value = process.env[name];
  if (value === undefined || value === '') return fallback;
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed)) {
    throw new Error(`Variabile d'ambiente ${name} non valida: "${value}" non e' un numero.`);
  }
  return parsed;
}

function bool(name, fallback = false) {
  const value = process.env[name];
  if (value === undefined || value === '') return fallback;
  return ['1', 'true', 'yes', 'on'].includes(value.trim().toLowerCase());
}

function list(name) {
  return str(name)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

/** Legge la configurazione dall'ambiente e applica i default. */
export function loadConfig() {
  return {
    token: str('PICKY_API_TOKEN'),
    baseUrl: str('PICKY_BASE_URL', 'https://app.pickyassist.com/api/v2').replace(/\/+$/, ''),
    application: int('PICKY_DEFAULT_APPLICATION', APPLICATION.WHATSAPP_OFFICIAL),
    timeoutMs: int('PICKY_TIMEOUT_MS', 15_000),
    maxRetries: int('PICKY_MAX_RETRIES', 2),
    rateLimitPerMinute: int('PICKY_RATE_LIMIT_PER_MINUTE', 80),
    port: int('PORT', 3000),
    webhookPath: str('WEBHOOK_PATH', '/webhook'),
    webhookSecret: str('WEBHOOK_SECRET'),
    allowedIps: list('WEBHOOK_ALLOWED_IPS'),
    logRawPayload: bool('LOG_RAW_PAYLOAD', false),
  };
}

/** Verifica che la configurazione minima per l'invio sia presente. */
export function assertSendable(config) {
  if (!config.token) {
    throw new Error(
      'PICKY_API_TOKEN mancante. Genera il token dal pannello Picky Assist ' +
        '(Settings -> Developers -> API) e copialo nel file .env.',
    );
  }
}
