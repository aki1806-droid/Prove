import { createClient } from './client.js';
import { assertSendable, loadConfig, loadEnvFile } from './config.js';
import { createMessageHandler } from './handlers.js';
import { createWebhookServer } from './webhook/server.js';

loadEnvFile();
const config = loadConfig();

// Il client serve per le risposte asincrone e per l'invio proattivo.
// Senza token il server webhook resta comunque operativo (sola ricezione).
let client = null;
try {
  assertSendable(config);
  client = createClient(config);
} catch (error) {
  console.warn(`[avvio] ${error.message}`);
  console.warn('[avvio] Modalità sola ricezione: l’invio di messaggi è disabilitato.');
}

const handler = createMessageHandler({ client });
const server = createWebhookServer({ handler, config });

server.listen(config.port, () => {
  console.log(`[avvio] Webhook in ascolto su http://localhost:${config.port}${config.webhookPath}`);
  if (!config.webhookSecret) {
    console.warn(
      '[avvio] WEBHOOK_SECRET non impostato: l’endpoint è pubblico. ' +
        'Imposta un segreto prima di esporlo su internet.',
    );
  }
});

function shutdown(signal) {
  console.log(`[stop] Ricevuto ${signal}, chiusura in corso...`);
  server.close(() => process.exit(0));
  // Se le connessioni non si chiudono entro 10s, usciamo comunque.
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
