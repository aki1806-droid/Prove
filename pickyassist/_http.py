"""Trasporto HTTP minimale basato sulla libreria standard.

Il client accetta un trasporto alternativo (qualunque callable con la stessa
firma di :meth:`UrllibTransport.__call__`), così da poter usare ``requests`` o
un doppio di test senza modificare il resto del codice.
"""

import json
import time
import urllib.error
import urllib.request
from typing import Any, Dict

from .errors import TransportError

USER_AGENT = "pickyassist-python/0.1"


class UrllibTransport:
    """POST JSON con retry esponenziale sugli errori temporanei."""

    def __init__(self, timeout: float = 30.0, tentativi: int = 3, pausa_iniziale: float = 1.0):
        self.timeout = timeout
        self.tentativi = max(1, tentativi)
        self.pausa_iniziale = pausa_iniziale

    def __call__(self, url: str, payload: Dict[str, Any]) -> Dict[str, Any]:
        corpo = json.dumps(payload).encode("utf-8")
        ultimo_errore = None

        for tentativo in range(self.tentativi):
            richiesta = urllib.request.Request(
                url,
                data=corpo,
                method="POST",
                headers={"Content-Type": "application/json", "User-Agent": USER_AGENT},
            )
            try:
                with urllib.request.urlopen(richiesta, timeout=self.timeout) as risposta:
                    return _decodifica(risposta.read())
            except urllib.error.HTTPError as exc:
                # I 4xx sono definitivi: l'API risponde comunque in JSON, quindi
                # proviamo a restituirlo per far emergere il codice applicativo.
                testo = exc.read()
                if exc.code < 500:
                    try:
                        return _decodifica(testo)
                    except TransportError:
                        raise TransportError(f"HTTP {exc.code}: {testo[:200]!r}") from exc
                ultimo_errore = TransportError(f"HTTP {exc.code}: {testo[:200]!r}")
            except urllib.error.URLError as exc:
                ultimo_errore = TransportError(f"errore di rete: {exc.reason}")

            if tentativo < self.tentativi - 1:
                time.sleep(self.pausa_iniziale * (2**tentativo))

        raise ultimo_errore


def _decodifica(grezzo: bytes) -> Dict[str, Any]:
    try:
        dati = json.loads(grezzo.decode("utf-8"))
    except (ValueError, UnicodeDecodeError) as exc:
        raise TransportError(f"risposta non JSON: {grezzo[:200]!r}") from exc
    if not isinstance(dati, dict):
        raise TransportError(f"risposta JSON inattesa: {dati!r}")
    return dati
