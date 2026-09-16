"""Eccezioni del client Picky Assist."""

from .constants import ApiStatus, STATUS_MESSAGES


class PickyAssistError(Exception):
    """Errore generico del client."""


class TransportError(PickyAssistError):
    """La richiesta HTTP non è andata a buon fine (rete, DNS, timeout, 5xx)."""


class ApiError(PickyAssistError):
    """L'API ha risposto con un codice di stato diverso da 100.

    Attributi:
        status: codice di stato restituito nel corpo della risposta.
        payload: corpo completo della risposta, così come ricevuto.
    """

    def __init__(self, status, payload=None, message=None):
        self.status = status
        self.payload = payload or {}
        descrizione = message or STATUS_MESSAGES.get(status) or self.payload.get("message")
        super().__init__(f"[{status}] {descrizione or 'errore non documentato'}")


class AuthenticationError(ApiError):
    """Token assente, revocato o non valido (401)."""


class EmptyNumberListError(ApiError):
    """Nessun destinatario valido nella richiesta (402)."""


class InsufficientBalanceError(ApiError):
    """Credito insufficiente sull'account Picky Assist (403)."""


class DeviceUnreachableError(ApiError):
    """Il telefono/canale collegato non è raggiungibile (404)."""


#: Mappa codice di stato -> eccezione specifica.
ERRORI_PER_STATO = {
    ApiStatus.AUTENTICAZIONE_FALLITA: AuthenticationError,
    ApiStatus.LISTA_NUMERI_VUOTA: EmptyNumberListError,
    ApiStatus.CREDITO_INSUFFICIENTE: InsufficientBalanceError,
    ApiStatus.TELEFONO_NON_RAGGIUNGIBILE: DeviceUnreachableError,
}


def errore_da_stato(status, payload=None):
    """Costruisce l'eccezione più specifica per il codice di stato ricevuto."""

    classe = ERRORI_PER_STATO.get(status, ApiError)
    return classe(status, payload)
