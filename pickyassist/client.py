"""Client per le API v2 di Picky Assist (Push e Delivery Report)."""

import os
from typing import Any, Dict, Iterable, List, Optional, Sequence, Union

from ._http import UrllibTransport
from .constants import (
    BASE_URL,
    DELIVERY_REPORT_PATH,
    PUSH_PATH,
    Application,
    ApiStatus,
    Priority,
)
from .errors import PickyAssistError, errore_da_stato
from .models import Destinatario, DeliveryReport, PushResponse

#: Variabile d'ambiente da cui viene letto il token se non passato esplicitamente.
ENV_TOKEN = "PICKY_API_TOKEN"

DestinatarioLike = Union[Destinatario, Dict[str, Any], str]


class PickyAssistClient:
    """Client sincrono per le API v2.

    Il token non va mai scritto nel codice: per default viene letto dalla
    variabile d'ambiente ``PICKY_API_TOKEN``.

        >>> client = PickyAssistClient()
        >>> client.invia_messaggio("393331234567", "Ciao!")  # doctest: +SKIP
    """

    def __init__(
        self,
        token: Optional[str] = None,
        *,
        application: Union[Application, int] = Application.WHATSAPP_OFFICIAL,
        base_url: str = BASE_URL,
        priority: Union[Priority, int] = Priority.NORMALE,
        timeout: float = 30.0,
        transport=None,
    ):
        self.token = token or os.environ.get(ENV_TOKEN)
        if not self.token:
            raise PickyAssistError(
                f"token mancante: passalo al costruttore o imposta ${ENV_TOKEN}"
            )
        self.application = int(application)
        self.priority = int(priority)
        self.base_url = base_url.rstrip("/")
        self.transport = transport or UrllibTransport(timeout=timeout)

    # ------------------------------------------------------------------ push

    def invia_messaggio(
        self,
        numero: str,
        messaggio: str,
        *,
        media_url: Optional[str] = None,
        media_file: Optional[str] = None,
        **opzioni,
    ) -> PushResponse:
        """Invia un singolo messaggio a un numero."""

        destinatario = Destinatario(
            numero=numero,
            messaggio=messaggio,
            media_url=media_url,
            media_file=media_file,
        )
        return self.push([destinatario], **opzioni)

    def invia_bulk(
        self,
        destinatari: Iterable[DestinatarioLike],
        *,
        messaggio_globale: Optional[str] = None,
        media_globale: Optional[str] = None,
        **opzioni,
    ) -> PushResponse:
        """Invia a più destinatari con una sola richiesta.

        ``destinatari`` accetta stringhe (solo numero), dizionari già nel
        formato dell'API oppure oggetti :class:`Destinatario`. Con
        ``messaggio_globale`` lo stesso testo viene usato per tutti.
        """

        return self.push(
            destinatari,
            messaggio_globale=messaggio_globale,
            media_globale=media_globale,
            **opzioni,
        )

    def push(
        self,
        destinatari: Iterable[DestinatarioLike],
        *,
        messaggio_globale: Optional[str] = None,
        media_globale: Optional[str] = None,
        application: Optional[Union[Application, int]] = None,
        priority: Optional[Union[Priority, int]] = None,
        campi_extra: Optional[Dict[str, Any]] = None,
    ) -> PushResponse:
        """Chiamata di basso livello a ``POST /push``."""

        data = [_a_payload_destinatario(d) for d in destinatari]
        if not data:
            raise ValueError("nessun destinatario: la lista è vuota")

        payload: Dict[str, Any] = {
            "token": self.token,
            "application": str(int(application if application is not None else self.application)),
            "priority": str(int(priority if priority is not None else self.priority)),
            "data": data,
        }
        if messaggio_globale is not None:
            payload["globalmessage"] = messaggio_globale
        if media_globale is not None:
            payload["globalmedia"] = media_globale
        if campi_extra:
            payload.update(campi_extra)

        risposta = self._post(PUSH_PATH, payload)
        return PushResponse.from_payload(risposta)

    def invia_template(
        self,
        destinatari: Iterable[DestinatarioLike],
        template_id: str,
        *,
        lingua: str = "it",
        variabili_globali: Optional[Sequence[Any]] = None,
        media_globale: Optional[str] = None,
        **opzioni,
    ) -> PushResponse:
        """Invia un template WhatsApp già approvato da Meta.

        Sui canali WhatsApp ufficiali i messaggi inviati per primi (fuori dalla
        finestra di 24 ore) devono usare un template approvato: ``template_id``
        è l'identificativo che Picky Assist mostra nella sezione Template.

        Le variabili del template si passano nell'ordine in cui compaiono:
        ``variabili_globali`` vale per tutti i destinatari, mentre per valori
        personalizzati si usa ``Destinatario(..., template_variabili=[...])``.
        """

        campi_extra = dict(opzioni.pop("campi_extra", None) or {})
        campi_extra["template_id"] = str(template_id)
        campi_extra.setdefault("language", lingua)
        if variabili_globali is not None:
            campi_extra["template_globalmessage"] = [str(v) for v in variabili_globali]
        if media_globale is not None:
            campi_extra["globalmedia"] = media_globale
        return self.push(destinatari, campi_extra=campi_extra, **opzioni)

    # --------------------------------------------------------- report eventi

    def delivery_report(self, push_id: str) -> DeliveryReport:
        """Recupera i report di consegna di un push (``POST /delivery-report``).

        Per volumi alti conviene usare l'Event Webhook: questo endpoint serve
        per interrogare lo stato di invii specifici.
        """

        risposta = self._post(
            DELIVERY_REPORT_PATH, {"token": self.token, "push_id": str(push_id)}
        )
        return DeliveryReport.from_payload(risposta)

    # ----------------------------------------------------------------- utils

    def _post(self, path: str, payload: Dict[str, Any]) -> Dict[str, Any]:
        risposta = self.transport(self.base_url + path, payload)
        status = int(risposta.get("status", 0))
        if status != ApiStatus.SUCCESSO:
            raise errore_da_stato(status, risposta)
        return risposta

    def __repr__(self) -> str:  # pragma: no cover - solo diagnostica
        return (
            f"PickyAssistClient(application={self.application}, "
            f"base_url={self.base_url!r}, token='***')"
        )


def _a_payload_destinatario(destinatario: DestinatarioLike) -> Dict[str, Any]:
    if isinstance(destinatario, Destinatario):
        return destinatario.to_payload()
    if isinstance(destinatario, str):
        return Destinatario(numero=destinatario).to_payload()
    if isinstance(destinatario, dict):
        if "number" in destinatario:
            dati = dict(destinatario)
            dati["number"] = Destinatario(numero=dati["number"]).to_payload()["number"]
            return dati
        return Destinatario(**destinatario).to_payload()
    raise TypeError(f"destinatario non supportato: {destinatario!r}")
