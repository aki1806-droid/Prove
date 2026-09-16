"""Server di esempio per Global Webhook ed Event Webhook.

Uso:
    export PICKY_WEBHOOK_SECRET="un-segreto-a-tua-scelta"   # opzionale
    python3 examples/server_webhook.py

Poi in Picky Assist (Settings -> Developers -> Webhook) configura:
    messaggi in entrata -> https://tuo-dominio/?secret=...
    eventi              -> https://tuo-dominio/eventi?secret=...
"""

import os
import sys

# Permette di eseguire l'esempio dal repository senza installare il pacchetto.
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from pickyassist import EventoWebhook, MessaggioInEntrata, crea_wsgi_app, esegui_server
from pickyassist.webhook import nessuna_risposta, risposta


def gestisci_messaggio(msg: MessaggioInEntrata):
    """Replica immediata al messaggio in entrata."""

    print(f"[in] {msg.nome or msg.numero}: {msg.testo}")

    testo = msg.testo.strip().lower()
    if testo in {"ciao", "salve", "buongiorno"}:
        return risposta("Ciao! Come posso aiutarti?")
    if testo.startswith("orari"):
        return risposta("Siamo aperti dal lunedì al venerdì, 9:00-18:00.", delay=2)
    # Nessuna replica automatica: lascia la conversazione agli operatori.
    return nessuna_risposta()


def gestisci_evento(evento: EventoWebhook):
    """Traccia i report di consegna che arrivano dall'Event Webhook."""

    print(f"[evento] tipo={evento.tipo} push_id={evento.push_id}")
    for riga in evento.report:
        print(f"    {riga.numero}: {riga.descrizione_stato} (errore={riga.error_code or '-'})")


if __name__ == "__main__":
    app = crea_wsgi_app(
        gestisci_messaggio,
        gestisci_evento,
        segreto=os.environ.get("PICKY_WEBHOOK_SECRET"),
    )
    esegui_server(app, porta=int(os.environ.get("PORT", 8080)))
