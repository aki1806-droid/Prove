#!/usr/bin/env node
/**
 * Verifica il collegamento con Picky Assist: valida il token e mostra il
 * credito residuo del progetto. Non invia alcun messaggio.
 *
 *   npm run check
 */
import { createClient } from '../src/client.js';
import { assertSendable, loadConfig, loadEnvFile } from '../src/config.js';

loadEnvFile();
const config = loadConfig();

try {
  assertSendable(config);
} catch (error) {
  console.error(`✗ ${error.message}`);
  process.exit(1);
}

console.log(`Endpoint: ${config.baseUrl}`);
console.log(`Token:    ${config.token.slice(0, 4)}…${config.token.slice(-4)}`);

const client = createClient(config);

try {
  const balance = await client.checkBalance();
  console.log('✓ Collegamento riuscito.');
  console.log(JSON.stringify(balance, null, 2));
} catch (error) {
  console.error(`✗ Collegamento fallito: ${error.message}`);
  if (error.body) console.error(JSON.stringify(error.body, null, 2));
  process.exit(1);
}
