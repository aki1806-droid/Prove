#!/usr/bin/env node
/**
 * Invia un messaggio di prova.
 *
 *   npm run send -- 393331234567 "Messaggio di prova"
 */
import { createClient } from '../src/client.js';
import { assertSendable, loadConfig, loadEnvFile } from '../src/config.js';

loadEnvFile();
const config = loadConfig();

const [to, ...rest] = process.argv.slice(2);
const message = rest.join(' ') || 'Messaggio di prova da picky-assist-bridge.';

if (!to) {
  console.error('Uso: npm run send -- <numero_con_prefisso> "<messaggio>"');
  process.exit(1);
}

try {
  assertSendable(config);
} catch (error) {
  console.error(`✗ ${error.message}`);
  process.exit(1);
}

const client = createClient(config);

try {
  const result = await client.sendText({ to, message, referenceNumber: `test-${Date.now()}` });
  console.log('✓ Messaggio accettato dai server Picky Assist (status 100).');
  console.log('  Nota: 100 = in coda, non conferma di consegna.');
  console.log(JSON.stringify(result, null, 2));
} catch (error) {
  console.error(`✗ Invio fallito: ${error.message}`);
  if (error.body) console.error(JSON.stringify(error.body, null, 2));
  process.exit(1);
}
