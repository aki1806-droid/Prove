"""Costanti e codici usati dalle API v2 di Picky Assist."""

from enum import IntEnum

# Endpoint di default (le API v2 vivono sotto /app/api/v2).
BASE_URL = "https://pickyassist.com/app/api/v2"

PUSH_PATH = "/push"
DELIVERY_REPORT_PATH = "/delivery-report"


class Application(IntEnum):
    """Canale su cui inviare il messaggio (campo ``application``)."""

    WHATSAPP_PERSONAL = 1
    WHATSAPP_BUSINESS = 2
    SMS = 3
    CALL = 4
    FACEBOOK_MESSENGER = 5
    WHATSAPP_OFFICIAL = 8
    WHATSAPP_WEB = 10
    WHATSAPP_CLOUD_API = 101
    WHATSAPP_OFFICIAL_MANAGED = 121


class Priority(IntEnum):
    """Priorità della richiesta di push."""

    NORMALE = 0
    ALTA = 1


class ApiStatus(IntEnum):
    """Codici di stato restituiti nel corpo della risposta."""

    SUCCESSO = 100
    AUTENTICAZIONE_FALLITA = 401
    LISTA_NUMERI_VUOTA = 402
    CREDITO_INSUFFICIENTE = 403
    TELEFONO_NON_RAGGIUNGIBILE = 404


#: Descrizione leggibile dei codici di stato conosciuti.
STATUS_MESSAGES = {
    ApiStatus.SUCCESSO: "Richiesta accettata dai server Picky Assist",
    ApiStatus.AUTENTICAZIONE_FALLITA: "Autenticazione fallita: token non valido",
    ApiStatus.LISTA_NUMERI_VUOTA: "Lista numeri vuota",
    ApiStatus.CREDITO_INSUFFICIENTE: "Credito insufficiente sull'account",
    ApiStatus.TELEFONO_NON_RAGGIUNGIBILE: "Impossibile comunicare con il telefono collegato",
}


class DeliveryStatus(IntEnum):
    """Stati di consegna documentati per delivery report ed event webhook.

    La documentazione v2 conferma esplicitamente solo questi due valori; gli
    altri codici numerici restituiti dall'API vengono mantenuti come interi
    grezzi (vedi :attr:`pickyassist.models.MessageReport.status`).
    """

    INVIATO_AL_CANALE = 4  # "Submitted": messaggio accettato dal canale
    RIMBORSATO = 5  # "Refunded": credito riaccreditato, da trattare come fallito


def descrivi_stato_consegna(status):
    """Ritorna una descrizione leggibile di uno stato di consegna."""

    try:
        return {
            DeliveryStatus.INVIATO_AL_CANALE: "Inviato al canale",
            DeliveryStatus.RIMBORSATO: "Rimborsato (messaggio fallito)",
        }[DeliveryStatus(status)]
    except ValueError:
        return f"Stato {status} non documentato"
