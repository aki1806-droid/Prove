"""Ricezione dei webhook di Picky Assist.

Copre due flussi distinti:

* **Global Webhook** – i messaggi in entrata dai canali collegati. La risposta
  HTTP può contenere la replica immediata da inviare all'utente.
* **Event Webhook** – eventi asincroni, tra cui i report di consegna.

Il modulo non dipende da alcun framework: espone funzioni di parsing pure e,
in più, una piccola app WSGI utilizzabile con qualunque server (incluso
``wsgiref`` della libreria standard) o montabile dentro Flask/Django.
"""

import json
from dataclasses import dataclass, field
from typing import Any, Callable, Dict, List, Optional
from urllib.parse import parse_qs, unquote_plus

from .models import MessageReport

#: Ritardo massimo, in secondi, accettato da Picky Assist per una risposta.
DELAY_MASSIMO = 3600


@dataclass
class MessaggioInEntrata:
    """Messaggio ricevuto tramite Global Webhook."""

    numero: str
    testo: str
    nome: Optional[str] = None
    tipo: Optional[str] = None
    application: Optional[int] = None
    unique_id: Optional[str] = None
    project_id: Optional[str] = None
    direction: Optional[str] = None
    context_msg_id: Optional[str] = None
    raw: Dict[str, Any] = field(default_factory=dict)

    @classmethod
    def from_payload(cls, payload: Dict[str, Any]) -> "MessaggioInEntrata":
        # ``message-in`` arriva url-encoded, ``message_in_raw`` no: preferiamo
        # il secondo quando c'è, altrimenti decodifichiamo il primo.
        testo = payload.get("message_in_raw")
        if testo is None:
            testo = unquote_plus(str(payload.get("message-in", "")))
        application = payload.get("application")
        return cls(
            numero=str(payload.get("number", "")),
            testo=str(testo),
            nome=_opt_str(payload.get("name")),
            tipo=_opt_str(payload.get("type")),
            application=int(application) if str(application or "").isdigit() else None,
            unique_id=_opt_str(payload.get("unique-id") or payload.get("unique_id")),
            project_id=_opt_str(payload.get("project-id") or payload.get("project_id")),
            direction=_opt_str(payload.get("direction")),
            context_msg_id=_opt_str(payload.get("context-msg-id")),
            raw=payload,
        )


@dataclass
class EventoWebhook:
    """Evento ricevuto tramite Event Webhook (es. delivery report).

    I campi cambiano in base al tipo di evento, quindi oltre a quelli comuni
    resta sempre disponibile il payload completo in :attr:`raw`.
    """

    tipo: Optional[str]
    push_id: Optional[str]
    project_id: Optional[str]
    raw: Dict[str, Any] = field(default_factory=dict)

    @classmethod
    def from_payload(cls, payload: Dict[str, Any]) -> "EventoWebhook":
        return cls(
            tipo=_opt_str(payload.get("event") or payload.get("event_type") or payload.get("type")),
            push_id=_opt_str(payload.get("push_id")),
            project_id=_opt_str(payload.get("project_id") or payload.get("project-id")),
            raw=payload,
        )

    @property
    def report(self) -> List[MessageReport]:
        """Report di consegna contenuti nell'evento, se presenti."""

        dati = self.raw.get("data")
        if isinstance(dati, list):
            return [MessageReport.from_payload(d) for d in dati if isinstance(d, dict)]
        if self.raw.get("number") or self.raw.get("msg_id"):
            return [MessageReport.from_payload(self.raw)]
        return []


def risposta(messaggio: str, delay: int = 0) -> Dict[str, Any]:
    """Costruisce il corpo JSON di replica immediata al Global Webhook.

    ``delay`` è espresso in secondi e non può superare :data:`DELAY_MASSIMO`.
    """

    if not 0 <= delay <= DELAY_MASSIMO:
        raise ValueError(f"delay fuori intervallo 0-{DELAY_MASSIMO}: {delay}")
    corpo: Dict[str, Any] = {"message-out": messaggio}
    if delay:
        corpo["delay"] = str(delay)
    return corpo


def nessuna_risposta() -> Dict[str, Any]:
    """Corpo da restituire quando non si vuole replicare all'utente."""

    return {}


# ------------------------------------------------------------------ app WSGI


def crea_wsgi_app(
    gestore_messaggi: Optional[Callable[[MessaggioInEntrata], Optional[Dict[str, Any]]]] = None,
    gestore_eventi: Optional[Callable[[EventoWebhook], None]] = None,
    *,
    segreto: Optional[str] = None,
    percorso_eventi: str = "/eventi",
):
    """Crea un'app WSGI che instrada i webhook ai due gestori.

    * qualunque POST su ``percorso_eventi`` finisce in ``gestore_eventi``;
    * ogni altro POST è trattato come messaggio in entrata e il valore
      restituito da ``gestore_messaggi`` (tipicamente :func:`risposta`) viene
      serializzato come corpo JSON della replica.

    Picky Assist non firma le chiamate: se ``segreto`` è impostato, l'app
    accetta solo richieste che portano quel valore nel parametro di query
    ``secret`` o nell'header ``X-Webhook-Secret``.
    """

    def app(environ, start_response):
        def rispondi(codice: str, corpo: Dict[str, Any]):
            grezzo = json.dumps(corpo).encode("utf-8")
            start_response(
                codice,
                [
                    ("Content-Type", "application/json"),
                    ("Content-Length", str(len(grezzo))),
                ],
            )
            return [grezzo]

        if environ.get("REQUEST_METHOD") != "POST":
            return rispondi("405 Method Not Allowed", {"errore": "usare POST"})

        if segreto and not _segreto_valido(environ, segreto):
            return rispondi("403 Forbidden", {"errore": "segreto non valido"})

        try:
            payload = _leggi_json(environ)
        except ValueError as exc:
            return rispondi("400 Bad Request", {"errore": str(exc)})

        if environ.get("PATH_INFO", "/").rstrip("/") == percorso_eventi.rstrip("/"):
            if gestore_eventi is not None:
                gestore_eventi(EventoWebhook.from_payload(payload))
            return rispondi("200 OK", {})

        corpo = None
        if gestore_messaggi is not None:
            corpo = gestore_messaggi(MessaggioInEntrata.from_payload(payload))
        return rispondi("200 OK", corpo or {})

    return app


def esegui_server(app, host: str = "0.0.0.0", porta: int = 8080):  # pragma: no cover
    """Avvia l'app WSGI con il server di sviluppo della libreria standard."""

    from wsgiref.simple_server import make_server

    with make_server(host, porta, app) as server:
        print(f"Webhook in ascolto su http://{host}:{porta}")
        server.serve_forever()


def _segreto_valido(environ, segreto: str) -> bool:
    import hmac

    candidati = [environ.get("HTTP_X_WEBHOOK_SECRET", "")]
    candidati.extend(parse_qs(environ.get("QUERY_STRING", "")).get("secret", []))
    return any(hmac.compare_digest(str(c), segreto) for c in candidati if c)


def _leggi_json(environ) -> Dict[str, Any]:
    try:
        lunghezza = int(environ.get("CONTENT_LENGTH") or 0)
    except ValueError:
        lunghezza = 0
    grezzo = environ["wsgi.input"].read(lunghezza) if lunghezza else b""
    if not grezzo:
        raise ValueError("corpo della richiesta vuoto")
    try:
        dati = json.loads(grezzo.decode("utf-8"))
    except (ValueError, UnicodeDecodeError) as exc:
        raise ValueError("corpo della richiesta non è JSON valido") from exc
    if not isinstance(dati, dict):
        raise ValueError("il payload JSON deve essere un oggetto")
    return dati


def _opt_str(valore: Any) -> Optional[str]:
    return None if valore is None else str(valore)
