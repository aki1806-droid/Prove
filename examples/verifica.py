"""Verifica che la connessione Picky Assist funzioni davvero.

Manda un messaggio di prova al numero indicato e controlla la consegna,
spiegando in italiano ogni eventuale errore.

    export PICKY_API_TOKEN="il-tuo-token"
    python3 examples/verifica.py 393331234567

Se il canale ufficiale rifiuta il testo libero, usa un template approvato:

    python3 examples/verifica.py 393331234567 --template VG7935
"""

import argparse
import os
import sys

# Permette di eseguire l'esempio dal repository senza installare il pacchetto.
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from pickyassist import PickyAssistClient, PickyAssistError
from pickyassist.client import ENV_TOKEN
from pickyassist.diagnostica import Controllo, esito_finale, spiega_errore, verifica_connessione
from examples.campagna import CANALI


def main(argv=None):
    parser = argparse.ArgumentParser(description="Verifica della connessione Picky Assist")
    parser.add_argument("numero", help="numero di prova, es. 393331234567")
    parser.add_argument("--canale", default="whatsapp-managed", choices=sorted(CANALI))
    parser.add_argument("--template", help="ID di un template approvato")
    parser.add_argument("--variabili", default="", help="valori del template separati da virgola")
    parser.add_argument("--lingua", default="it")
    parser.add_argument(
        "--attesa", type=float, default=8.0, help="secondi di attesa prima del report"
    )
    args = parser.parse_args(argv)

    print("Verifica connessione Picky Assist")
    print(f"Canale: {args.canale} | numero di prova: {args.numero}\n")

    if not os.environ.get(ENV_TOKEN):
        print(
            Controllo(
                "Token API",
                False,
                f"La variabile {ENV_TOKEN} non è impostata.",
                f'Esegui: export {ENV_TOKEN}="il-tuo-token" e rilancia.',
            )
        )
        return 1

    try:
        client = PickyAssistClient(application=CANALI[args.canale])
    except PickyAssistError as exc:
        print(spiega_errore(exc))
        return 1

    controlli = verifica_connessione(
        client,
        args.numero,
        template_id=args.template,
        lingua=args.lingua,
        variabili=[v.strip() for v in args.variabili.split(",") if v.strip()],
        attesa_report=args.attesa,
    )

    for controllo in controlli:
        print(controllo)
    print()
    print(esito_finale(controlli))
    return 0 if all(c.ok for c in controlli) else 1


if __name__ == "__main__":
    raise SystemExit(main())
