"""Client Python non ufficiale per le API v2 di Picky Assist.

Esempio rapido::

    from pickyassist import PickyAssistClient

    client = PickyAssistClient()            # legge $PICKY_API_TOKEN
    esito = client.invia_messaggio("393331234567", "Ciao!")
    print(esito.push_id)
"""

from .client import ENV_TOKEN, PickyAssistClient
from .constants import (
    BASE_URL,
    ApiStatus,
    Application,
    DeliveryStatus,
    Priority,
    descrivi_stato_consegna,
)
from .errors import (
    ApiError,
    AuthenticationError,
    DeviceUnreachableError,
    EmptyNumberListError,
    InsufficientBalanceError,
    PickyAssistError,
    TransportError,
)
from .models import DeliveryReport, Destinatario, MessageReport, PushResponse
from .webhook import (
    EventoWebhook,
    MessaggioInEntrata,
    crea_wsgi_app,
    esegui_server,
    nessuna_risposta,
    risposta,
)

__version__ = "0.1.0"

__all__ = [
    "ApiError",
    "ApiStatus",
    "Application",
    "AuthenticationError",
    "BASE_URL",
    "DeliveryReport",
    "DeliveryStatus",
    "Destinatario",
    "DeviceUnreachableError",
    "ENV_TOKEN",
    "EmptyNumberListError",
    "EventoWebhook",
    "InsufficientBalanceError",
    "MessaggioInEntrata",
    "MessageReport",
    "PickyAssistClient",
    "PickyAssistError",
    "Priority",
    "PushResponse",
    "TransportError",
    "crea_wsgi_app",
    "descrivi_stato_consegna",
    "esegui_server",
    "nessuna_risposta",
    "risposta",
    "__version__",
]
