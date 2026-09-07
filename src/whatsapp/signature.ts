import crypto from "node:crypto";

/**
 * Verifica l'header `X-Hub-Signature-256` con cui Meta firma ogni webhook.
 *
 * Senza questo controllo l'endpoint è pubblico: chiunque conosca l'URL può
 * iniettare messaggi finti e farci consumare token API. Il confronto usa
 * `timingSafeEqual` per non esporre la firma attesa a un attacco temporale.
 *
 * @param rawBody il body *grezzo*: riserializzare l'oggetto già parsato
 *                cambia gli spazi e invalida la firma.
 */
export function isValidSignature(
  rawBody: Buffer,
  header: string | undefined,
  appSecret: string,
): boolean {
  if (!header?.startsWith("sha256=")) return false;

  const received = Buffer.from(header.slice("sha256=".length), "hex");
  const expected = crypto
    .createHmac("sha256", appSecret)
    .update(rawBody)
    .digest();

  // timingSafeEqual pretende buffer della stessa lunghezza: una firma
  // troncata o non esadecimale va scartata prima del confronto.
  if (received.length !== expected.length) return false;
  return crypto.timingSafeEqual(received, expected);
}
