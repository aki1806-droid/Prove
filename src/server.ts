import express, { type Express, type Request, type Response } from "express";
import type { Config } from "./config.js";
import type { MessageHandler } from "./handler.js";
import { log } from "./logger.js";
import type { TtlSet } from "./ttl-set.js";
import { extractMessages } from "./whatsapp/parse.js";
import { isValidSignature } from "./whatsapp/signature.js";
import type { WebhookBody } from "./whatsapp/types.js";

/** Express espone il body grezzo qui: serve a verificare la firma di Meta. */
interface RawBodyRequest extends Request {
  rawBody?: Buffer;
}

export interface ServerDeps {
  config: Config;
  handler: MessageHandler;
  seen: TtlSet;
}

export function createServer(deps: ServerDeps): Express {
  const app = express();

  app.use(
    express.json({
      // La firma è calcolata sui byte esatti inviati da Meta: se riserializzassimo
      // l'oggetto già parsato, spazi e ordine delle chiavi la invaliderebbero.
      verify: (req, _res, buf) => {
        (req as RawBodyRequest).rawBody = buf;
      },
    }),
  );

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/webhook", (req, res) => handleVerification(req, res, deps.config));
  app.post("/webhook", (req, res) => handleEvent(req as RawBodyRequest, res, deps));

  return app;
}

/**
 * Handshake di verifica: Meta chiama l'endpoint in GET quando salvi l'URL nel
 * pannello dell'app e si aspetta indietro il `hub.challenge` in chiaro.
 */
function handleVerification(req: Request, res: Response, config: Config): void {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === config.verifyToken && typeof challenge === "string") {
    log.info("webhook verificato da Meta");
    res.status(200).type("text/plain").send(challenge);
    return;
  }

  log.warn("verifica del webhook rifiutata", { mode });
  res.sendStatus(403);
}

function handleEvent(req: RawBodyRequest, res: Response, deps: ServerDeps): void {
  const rawBody = req.rawBody;
  if (!rawBody || !isValidSignature(rawBody, req.get("x-hub-signature-256"), deps.config.appSecret)) {
    log.warn("firma del webhook non valida");
    res.sendStatus(403);
    return;
  }

  // Meta pretende un 200 rapido e riconsegna l'evento se tarda: rispondiamo
  // subito e generiamo la risposta fuori dal ciclo richiesta/risposta.
  res.sendStatus(200);

  const messages = extractMessages(req.body as WebhookBody);
  for (const message of messages) {
    if (!deps.seen.add(message.id)) {
      log.info("webhook duplicato ignorato", { messageId: message.id });
      continue;
    }
    void deps.handler.handle(message);
  }
}
