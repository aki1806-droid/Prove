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
console.log(`Canale:   ${config.application}`);

// Token, channel id e webhook devono appartenere tutti allo STESSO progetto.
// Mescolarli produce 401, oppure invii che finiscono sul progetto sbagliato.
if (config.application === 8) {
  console.log(
    '\nNota: 8 è il valore di default (WhatsApp Official gestito).\n' +
      '      Con WhatsApp Cloud API va usato il channel id preso da\n' +
      '      Settings -> Channels DELLO STESSO progetto del token.',
  );
}

const client = createClient(config);

try {
  const balance = await client.checkBalance();
  console.log('\n✓ Collegamento riuscito.');
  console.log(JSON.stringify(balance, null, 2));
  console.log(
    '\nIl saldo è del progetto a cui appartiene questo token:\n' +
      'se non è quello atteso, stai usando il token di un altro progetto.',
  );
} catch (error) {
  console.error(`✗ Collegamento fallito: ${error.message}`);
  if (error.body) console.error(JSON.stringify(error.body, null, 2));
  process.exit(1);
}
