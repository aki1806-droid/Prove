"""Invio di un messaggio singolo e lettura del delivery report.

Uso:
    export PICKY_API_TOKEN="il-tuo-token"
    python3 examples/invia_messaggio.py 393331234567 "Ciao dal client Python"
"""

import os
import sys

# Permette di eseguire l'esempio dal repository senza installare il pacchetto.
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import time

from pickyassist import Application, ApiError, PickyAssistClient, PickyAssistError


def main(argv):
    if len(argv) < 3:
        print(__doc__)
        return 2

    numero, messaggio = argv[1], argv[2]
    client = PickyAssistClient(application=Application.WHATSAPP_OFFICIAL)

    try:
        esito = client.invia_messaggio(numero, messaggio)
    except ApiError as exc:
        print(f"L'API ha rifiutato la richiesta: {exc}")
        return 1
    except PickyAssistError as exc:
        print(f"Errore di comunicazione: {exc}")
        return 1

    print(f"Richiesta accettata, push_id={esito.push_id}")

    # Il report non è immediato: diamo al canale qualche secondo.
    time.sleep(5)
    report = client.delivery_report(esito.push_id)
    for riga in report.messaggi:
        print(f"  {riga.numero}: {riga.descrizione_stato} (msg_id={riga.msg_id})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
