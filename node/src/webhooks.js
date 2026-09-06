/** Verifica delle firme dei webhook Skillplate.
 *
 * I payload sono firmati HMAC-SHA256 e arrivano nell'header
 * `X-Skillplate-Signature`. Verifica sempre prima di fidarti del contenuto.
 */

import crypto from "node:crypto";

export const SIGNATURE_HEADER = "X-Skillplate-Signature";

export const EVENTI = [
  "payment.succeeded",
  "payment.failed",
  "subscription.started",
  "subscription.cancelled",
  "user.created",
  "user.updated",
  "lesson.completed",
  "module.completed",
  "course.completed",
];

/** HMAC-SHA256 esadecimale del corpo grezzo della richiesta. */
export function computeSignature(payload, secret) {
  return crypto.createHmac("sha256", secret).update(payload).digest("hex");
}

/** Confronto a tempo costante fra firma attesa e header ricevuto.
 *
 * Accetta sia `<hex>` sia il formato prefissato `sha256=<hex>`.
 */
export function verifySignature(payload, signature, secret) {
  if (!signature) return false;
  let ricevuta = String(signature).trim();
  const separatore = ricevuta.indexOf("=");
  if (separatore !== -1 && ricevuta.slice(0, separatore).toLowerCase() === "sha256") {
    ricevuta = ricevuta.slice(separatore + 1).trim();
  }
  const attesa = computeSignature(payload, secret);
  // timingSafeEqual richiede buffer di pari lunghezza
  if (ricevuta.length !== attesa.length) return false;
  return crypto.timingSafeEqual(Buffer.from(attesa, "utf8"), Buffer.from(ricevuta, "utf8"));
}

/** Verifica la firma e restituisce l'evento decodificato.
 *
 * Solleva `Error` se la firma non torna: il corpo non va usato.
 */
export function parseEvent(payload, signature, secret) {
  if (!verifySignature(payload, signature, secret)) {
    throw new Error("Firma webhook non valida: payload scartato");
  }
  return JSON.parse(Buffer.isBuffer(payload) ? payload.toString("utf8") : payload);
}

/** Estrae i product_id da un payload `payment.succeeded` / `payment.failed`. */
export function productIds(evento) {
  const voci = evento.items ?? evento.data?.items ?? [];
  return voci.map((voce) => voce.product_id).filter(Boolean);
}
