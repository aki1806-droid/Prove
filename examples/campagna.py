"""Campagna: invio massivo a partire da un file CSV di contatti.

Prima si fa sempre una prova a vuoto (non parte nulla, nessun credito speso):

    python3 examples/campagna.py contatti.csv --messaggio "Ciao {nome}!"

Poi, quando i testi sono giusti, si aggiunge --invia per spedire davvero:

    python3 examples/campagna.py contatti.csv --messaggio "Ciao {nome}!" --invia

Con un template WhatsApp approvato (obbligatorio sul canale ufficiale per chi
scrive per primo), al posto di --messaggio si usano --template e --variabili:

    python3 examples/campagna.py contatti.csv --template VG7935 \
        --variabili nome,ordine --invia
"""

import argparse
import os
import sys

# Permette di eseguire l'esempio dal repository senza installare il pacchetto.
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from pickyassist import Application, PickyAssistClient, PickyAssistError
from pickyassist.campagne import Campagna, leggi_contatti, leggi_esclusi, salva_esito, scrivi_csv

CANALI = {
    "whatsapp-managed": Application.WHATSAPP_OFFICIAL_MANAGED,
    "whatsapp-official": Application.WHATSAPP_OFFICIAL,
    "whatsapp-cloud": Application.WHATSAPP_CLOUD_API,
    "whatsapp-personal": Application.WHATSAPP_PERSONAL,
    "whatsapp-business": Application.WHATSAPP_BUSINESS,
    "whatsapp-web": Application.WHATSAPP_WEB,
    "sms": Application.SMS,
}


def costruisci_parser():
    p = argparse.ArgumentParser(description="Invio massivo Picky Assist")
    p.add_argument("contatti", help="file CSV con almeno la colonna 'numero'")
    p.add_argument("--messaggio", help="testo, con segnaposto tipo {nome}")
    p.add_argument("--template", help="ID di un template WhatsApp approvato")
    p.add_argument("--variabili", default="", help="colonne del template, separate da virgola")
    p.add_argument("--lingua", default="it", help="lingua del template (default: it)")
    p.add_argument("--canale", default="whatsapp-managed", choices=sorted(CANALI))
    p.add_argument("--colonna-numero", default="numero")
    p.add_argument("--esclusi", help="file con i numeri da non contattare, uno per riga")
    p.add_argument("--lotto", type=int, default=100, help="destinatari per richiesta")
    p.add_argument("--pausa", type=float, default=1.0, help="secondi tra un lotto e l'altro")
    p.add_argument("--esito", default="esito_campagna.csv", help="dove salvare l'esito")
    p.add_argument("--report", help="file CSV in cui salvare i report di consegna")
    p.add_argument("--invia", action="store_true", help="spedisci davvero (senza, è una prova)")
    return p


def main(argv=None):
    args = costruisci_parser().parse_args(argv)

    if not args.messaggio and not args.template:
        print("Serve --messaggio oppure --template. Vedi --help.")
        return 2

    try:
        contatti = leggi_contatti(args.contatti, colonna_numero=args.colonna_numero)
        esclusi = leggi_esclusi(args.esclusi) if args.esclusi else []
        client = PickyAssistClient(application=CANALI[args.canale])
    except PickyAssistError as exc:
        print(f"Non posso partire: {exc}")
        return 1
    except OSError as exc:
        print(f"File non leggibile: {exc}")
        return 1

    print(f"Contatti letti: {len(contatti)} | esclusi: {len(esclusi)} | canale: {args.canale}")
    if not args.invia:
        print("MODALITÀ PROVA: non verrà inviato nulla. Aggiungi --invia per spedire.\n")

    campagna = Campagna(client, dimensione_lotto=args.lotto, pausa=args.pausa, esclusi=esclusi)
    esito = campagna.esegui(
        contatti,
        messaggio=args.messaggio,
        template_id=args.template,
        lingua=args.lingua,
        variabili=[v.strip() for v in args.variabili.split(",") if v.strip()],
        su_progresso=lambda lotto: print(
            f"  lotto {lotto.indice}: {len(lotto.numeri)} destinatari -> "
            + (f"push_id {lotto.push_id}" if lotto.ok else f"ERRORE {lotto.errore}")
        ),
        prova=not args.invia,
    )

    print()
    if not args.invia and esito.anteprima:
        print("Anteprima dei primi messaggi:")
        for riga in esito.anteprima:
            testo = riga.get("message") or riga.get("template_message")
            print(f"  {riga['number']}: {testo}")
        print()
    print(esito.riepilogo(prova=not args.invia))
    for scartato in esito.scartati:
        print(f"  scartato {scartato['numero']}: {scartato['motivo']}")

    salva_esito(args.esito, esito)
    print(f"\nEsito salvato in {args.esito}")

    if args.report and args.invia:
        righe = campagna.raccogli_report(esito)
        scrivi_csv(args.report, righe, ["push_id", "numero", "msg_id", "stato", "codice_errore"])
        print(f"Report di consegna salvato in {args.report}")

    return 0 if esito.falliti == 0 else 1


if __name__ == "__main__":
    raise SystemExit(main())
