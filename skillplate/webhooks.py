"""Verifica delle firme dei webhook Skillplate.

I payload sono firmati HMAC-SHA256 e arrivano nell'header
``X-Skillplate-Signature``. Verifica sempre prima di fidarti del contenuto.
"""

import hashlib
import hmac
import json

SIGNATURE_HEADER = "X-Skillplate-Signature"

EVENTI = (
    "payment.succeeded",
    "payment.failed",
    "subscription.started",
    "subscription.cancelled",
    "user.created",
    "user.updated",
    "lesson.completed",
    "module.completed",
    "course.completed",
)


def compute_signature(payload, secret):
    """HMAC-SHA256 esadecimale del corpo grezzo della richiesta."""
    if isinstance(payload, str):
        payload = payload.encode("utf-8")
    if isinstance(secret, str):
        secret = secret.encode("utf-8")
    return hmac.new(secret, payload, hashlib.sha256).hexdigest()


def verify_signature(payload, signature, secret):
    """Confronto a tempo costante fra firma attesa e header ricevuto.

    Accetta sia ``<hex>`` sia il formato prefissato ``sha256=<hex>``.
    """
    if not signature:
        return False
    ricevuta = signature.strip()
    if "=" in ricevuta:
        prefisso, _, resto = ricevuta.partition("=")
        if prefisso.lower() == "sha256":
            ricevuta = resto.strip()
    return hmac.compare_digest(compute_signature(payload, secret), ricevuta)


def parse_event(payload, signature, secret):
    """Verifica la firma e restituisce l'evento decodificato.

    Solleva ``ValueError`` se la firma non torna: il corpo non va usato.
    """
    if not verify_signature(payload, signature, secret):
        raise ValueError("Firma webhook non valida: payload scartato")
    if isinstance(payload, bytes):
        payload = payload.decode("utf-8")
    return json.loads(payload)


def product_ids(evento):
    """Estrae i product_id da un payload ``payment.succeeded`` / ``payment.failed``."""
    voci = evento.get("items") or evento.get("data", {}).get("items") or []
    return [voce.get("product_id") for voce in voci if voce.get("product_id")]
