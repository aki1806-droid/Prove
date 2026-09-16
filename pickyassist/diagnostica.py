"""Verifica di una connessione Picky Assist già configurata.

Esegue i controlli nell'ordine in cui possono fallire e traduce ogni errore in
una causa concreta e in un'azione da fare, invece di lasciare un codice numerico.
"""

import time
from dataclasses import dataclass
from typing import Any, List, Optional

from .constants import ApiStatus
from .errors import ApiError, PickyAssistError, TransportError


@dataclass
class Controllo:
    """Esito di un singolo controllo."""

    nome: str
    ok: bool
    dettaglio: str = ""
    da_fare: str = ""

    def __str__(self) -> str:
        simbolo = "OK   " if self.ok else "FALLITO"
        riga = f"[{simbolo}] {self.nome}"
        if self.dettaglio:
            riga += f"\n         {self.dettaglio}"
        if self.da_fare:
            riga += f"\n         Cosa fare: {self.da_fare}"
        return riga


def spiega_errore(exc: Exception) -> Controllo:
    """Traduce un'eccezione del client in causa e rimedio.

    La diagnosi si basa sul codice di stato dell'API, non sulla classe
    dell'eccezione: così vale anche per un ``ApiError`` generico.
    """

    if isinstance(exc, ApiError):
        return _spiega_api_error(exc)
    if isinstance(exc, TransportError):
        return Controllo(
            "Rete",
            False,
            f"Non sono riuscito a contattare Picky Assist: {exc}",
            "Controlla la connessione. Se sei dietro un proxy aziendale, "
            "potrebbe bloccare pickyassist.com.",
        )
    if isinstance(exc, PickyAssistError):
        return Controllo("Configurazione", False, str(exc), "")
    raise exc


def _spiega_api_error(exc: ApiError) -> Controllo:
    if exc.status == ApiStatus.AUTENTICAZIONE_FALLITA:
        return Controllo(
            "Token API",
            False,
            "Picky Assist non riconosce il token (401).",
            "Rigenera il token in Settings -> Developers -> API e riesporta "
            "PICKY_API_TOKEN. Se il token era finito in una chat o in un file, "
            "va rigenerato comunque.",
        )
    if exc.status == ApiStatus.CREDITO_INSUFFICIENTE:
        return Controllo(
            "Credito",
            False,
            "Il wallet Picky Assist non ha credito sufficiente (403).",
            "Ricarica il credito dal pannello. Il canale è collegato: questo "
            "errore arriva dopo che il token è stato accettato.",
        )
    if exc.status == ApiStatus.TELEFONO_NON_RAGGIUNGIBILE:
        return Controllo(
            "Canale WhatsApp",
            False,
            "Il canale non risponde (404).",
            "Controlla in Settings -> Channels che il numero risulti connesso. "
            "Sui canali che pilotano un telefono, controlla che sia acceso e online.",
        )
    if exc.status == ApiStatus.LISTA_NUMERI_VUOTA:
        return Controllo(
            "Destinatario",
            False,
            "Picky Assist non ha trovato numeri validi nella richiesta (402).",
            "Scrivi il numero con prefisso internazionale e senza +, "
            "per esempio 393331234567.",
        )
    if "template" in str(exc.payload.get("message", "")).lower():
        return Controllo(
            "Messaggio",
            False,
            f"L'API ha rifiutato il messaggio: {exc}",
            "Sui canali ufficiali il primo messaggio deve usare un template "
            "approvato. In alternativa, scrivi tu al numero aziendale da "
            "WhatsApp e rilancia la verifica entro 24 ore.",
        )
    return Controllo(
        "Invio",
        False,
        f"Errore non previsto: {exc}",
        "Riporta al supporto Picky Assist il codice e la risposta completa: "
        f"{exc.payload}",
    )


def verifica_connessione(
    client,
    numero: str,
    *,
    messaggio: str = "Messaggio di prova: la connessione funziona.",
    template_id: Optional[str] = None,
    lingua: str = "it",
    variabili: Any = (),
    attesa_report: float = 8.0,
    pausa=time.sleep,
) -> List[Controllo]:
    """Controlla token, invio e consegna verso un numero di prova."""

    controlli = [
        Controllo("Token API", True, "Trovato e pronto all'uso (non viene mai stampato).")
    ]

    try:
        if template_id:
            risposta = client.invia_template(
                [numero], template_id, lingua=lingua, variabili_globali=list(variabili) or None
            )
        else:
            risposta = client.invia_messaggio(numero, messaggio)
    except Exception as exc:  # tradotto in causa e rimedio
        controlli.append(spiega_errore(exc))
        return controlli

    controlli.append(
        Controllo(
            "Invio",
            True,
            f"Richiesta accettata da Picky Assist (push_id {risposta.push_id}).",
            "",
        )
    )

    if not risposta.push_id:
        controlli.append(
            Controllo(
                "Consegna",
                False,
                "L'API non ha restituito un push_id, impossibile chiedere il report.",
                "Controlla direttamente sul telefono se il messaggio è arrivato.",
            )
        )
        return controlli

    if attesa_report:
        pausa(attesa_report)

    try:
        report = client.delivery_report(risposta.push_id)
    except Exception as exc:
        controllo = spiega_errore(exc)
        controllo.nome = "Consegna"
        controlli.append(controllo)
        return controlli

    if not report.messaggi:
        controlli.append(
            Controllo(
                "Consegna",
                True,
                "Report non ancora disponibile: è normale subito dopo l'invio.",
                "Controlla sul telefono se il messaggio è arrivato, oppure "
                "rilancia la verifica tra qualche minuto.",
            )
        )
        return controlli

    for riga in report.messaggi:
        fallito = riga.status == 5 or riga.error_code
        controlli.append(
            Controllo(
                "Consegna",
                not fallito,
                f"{riga.numero}: {riga.descrizione_stato}"
                + (f" (codice errore {riga.error_code})" if riga.error_code else ""),
                "Chiedi al supporto Picky Assist il significato del codice errore."
                if fallito
                else "",
            )
        )
    return controlli


def esito_finale(controlli: List[Controllo]) -> str:
    """Riga di verdetto da mostrare in fondo alla verifica."""

    falliti = [c for c in controlli if not c.ok]
    if not falliti:
        return "Tutto a posto: la connessione funziona e il messaggio è partito."
    return f"Verifica fallita al passo: {falliti[0].nome}. Vedi 'Cosa fare' qui sopra."
