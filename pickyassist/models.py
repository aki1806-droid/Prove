"""Strutture dati per richieste e risposte delle API v2."""

from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional

from .constants import ApiStatus, descrivi_stato_consegna


@dataclass
class Destinatario:
    """Un elemento dell'array ``data`` della Push API.

    ``extra`` permette di aggiungere qualunque campo previsto dalla
    documentazione e non modellato qui (es. variabili dinamiche dei template):
    le chiavi vengono inserite tali e quali nel payload.
    """

    numero: str
    messaggio: Optional[str] = None
    media_url: Optional[str] = None
    media_file: Optional[str] = None
    extra: Dict[str, Any] = field(default_factory=dict)

    def to_payload(self) -> Dict[str, Any]:
        payload: Dict[str, Any] = {"number": _normalizza_numero(self.numero)}
        if self.messaggio is not None:
            payload["message"] = self.messaggio
        if self.media_url is not None:
            payload["media_url"] = self.media_url
        if self.media_file is not None:
            payload["media_file"] = self.media_file
        payload.update(self.extra)
        return payload


def _normalizza_numero(numero: str) -> str:
    """Rimuove spazi, trattini e il prefisso ``+``/``00``.

    Picky Assist vuole il numero con prefisso internazionale ma senza ``+``,
    senza ``0`` iniziale e senza separatori (es. ``393331234567``).
    """

    pulito = "".join(c for c in str(numero) if c.isdigit() or c == "+")
    if pulito.startswith("+"):
        pulito = pulito[1:]
    elif pulito.startswith("00"):
        pulito = pulito[2:]
    if not pulito:
        raise ValueError(f"numero non valido: {numero!r}")
    return pulito


@dataclass
class PushResponse:
    """Risposta della Push API."""

    status: int
    push_id: Optional[str]
    message: Optional[str]
    raw: Dict[str, Any]

    @property
    def ok(self) -> bool:
        return self.status == ApiStatus.SUCCESSO

    @classmethod
    def from_payload(cls, payload: Dict[str, Any]) -> "PushResponse":
        push_id = payload.get("push_id") or payload.get("pushid")
        return cls(
            status=int(payload.get("status", 0)),
            push_id=str(push_id) if push_id is not None else None,
            message=payload.get("message"),
            raw=payload,
        )


@dataclass
class MessageReport:
    """Stato di consegna di un singolo messaggio."""

    numero: str
    msg_id: Optional[str]
    status: Optional[int]
    error_code: Optional[str]
    raw: Dict[str, Any]

    @property
    def descrizione_stato(self) -> str:
        return descrivi_stato_consegna(self.status)

    @classmethod
    def from_payload(cls, payload: Dict[str, Any]) -> "MessageReport":
        status = payload.get("status")
        return cls(
            numero=str(payload.get("number", "")),
            msg_id=_opt_str(payload.get("msg_id")),
            status=int(status) if str(status or "").isdigit() else None,
            error_code=_opt_str(payload.get("error_code")),
            raw=payload,
        )


@dataclass
class DeliveryReport:
    """Risposta dell'endpoint ``/delivery-report``."""

    status: int
    push_id: Optional[str]
    project_id: Optional[str]
    application: Optional[int]
    messaggi: List[MessageReport]
    raw: Dict[str, Any]

    @property
    def ok(self) -> bool:
        return self.status == ApiStatus.SUCCESSO

    @classmethod
    def from_payload(cls, payload: Dict[str, Any]) -> "DeliveryReport":
        application = payload.get("application")
        return cls(
            status=int(payload.get("status", 0)),
            push_id=_opt_str(payload.get("push_id")),
            project_id=_opt_str(payload.get("project_id")),
            application=int(application) if str(application or "").isdigit() else None,
            messaggi=[MessageReport.from_payload(d) for d in payload.get("data") or []],
            raw=payload,
        )


def _opt_str(valore: Any) -> Optional[str]:
    return None if valore is None else str(valore)
