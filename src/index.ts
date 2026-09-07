import { ClaudeReplyGenerator } from "./claude.js";
import { loadConfig } from "./config.js";
import { InMemoryConversationStore } from "./conversation.js";
import { MessageHandler } from "./handler.js";
import { log } from "./logger.js";
import { createServer } from "./server.js";
import { TtlSet } from "./ttl-set.js";
import { WhatsAppClient } from "./whatsapp/client.js";

/** Finestra entro cui un webhook riconsegnato è ancora considerato duplicato. */
const DEDUPE_TTL_MS = 10 * 60_000;
const PRUNE_INTERVAL_MS = 5 * 60_000;

function main(): void {
  const config = loadConfig();

  const store = new InMemoryConversationStore({
    ttlMs: config.conversationTtlMs,
    maxMessages: config.maxHistoryMessages,
  });
  const seen = new TtlSet(DEDUPE_TTL_MS);

  const handler = new MessageHandler({
    whatsapp: new WhatsAppClient({
      token: config.whatsappToken,
      phoneNumberId: config.phoneNumberId,
      graphVersion: config.graphVersion,
    }),
    generator: new ClaudeReplyGenerator(config),
    store,
  });

  const server = createServer({ config, handler, seen }).listen(config.port, () => {
    log.info("in ascolto", { port: config.port, model: config.model });
  });

  // Senza questa pulizia le due strutture in memoria crescono per sempre:
  // i loro `get`/`add` scartano i record scaduti ma non li rimuovono.
  const pruner = setInterval(() => {
    const conversations = store.prune();
    const ids = seen.prune();
    if (conversations || ids) {
      log.info("pulizia periodica", { conversations, ids, attive: store.size });
    }
  }, PRUNE_INTERVAL_MS);
  pruner.unref();

  for (const signal of ["SIGTERM", "SIGINT"] as const) {
    process.on(signal, () => {
      log.info("arresto in corso", { signal });
      clearInterval(pruner);
      server.close(() => process.exit(0));
    });
  }
}

try {
  main();
} catch (error) {
  log.error("avvio fallito", {
    error: error instanceof Error ? error.message : String(error),
  });
  process.exit(1);
}
