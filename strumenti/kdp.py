#!/usr/bin/env python3
"""Produzione di ebook EPUB pronti per il caricamento su Amazon KDP.

    python3 strumenti/kdp.py nuovo mio-libro --titolo "..." --autore "..."
    python3 strumenti/kdp.py copertina libri/mio-libro
    python3 strumenti/kdp.py costruisci libri/mio-libro
    python3 strumenti/kdp.py verifica dist/mio-libro.epub

`costruisci` esegue anche la verifica, salvo --senza-verifica.
Il caricamento su KDP resta manuale: Amazon non espone un'API di
pubblicazione (si veda docs/kdp.md).
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

CARTELLA = Path(__file__).resolve().parent
if str(CARTELLA) not in sys.path:
    sys.path.insert(0, str(CARTELLA))

import copertina as modulo_copertina  # noqa: E402
import epub  # noqa: E402
import verifica as modulo_verifica  # noqa: E402

RADICE = CARTELLA.parent

MANOSCRITTO_ESEMPIO = """# Primo capitolo

Scrivi qui. Le righe consecutive formano un unico paragrafo; una riga vuota
apre il paragrafo successivo.

---

Tre trattini su una riga sono uno stacco di scena.
"""


def _comando_nuovo(argomenti: argparse.Namespace) -> int:
    cartella = Path(argomenti.cartella)
    if not cartella.is_absolute():
        cartella = RADICE / "libri" / argomenti.cartella
    if cartella.exists():
        print(f"esiste gia': {cartella}", file=sys.stderr)
        return 1
    (cartella / "manoscritto").mkdir(parents=True)
    (cartella / "risorse").mkdir()
    metadati = {
        "titolo": argomenti.titolo,
        "sottotitolo": "",
        "autore": argomenti.autore,
        "lingua": argomenti.lingua,
        "editore": "",
        "descrizione": "",
        "diritti": f"© {argomenti.autore}",
        "parole_chiave": [],
        "copertina": "risorse/copertina.png",
    }
    (cartella / "libro.json").write_text(
        json.dumps(metadati, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    (cartella / "manoscritto" / "01-primo-capitolo.md").write_text(
        MANOSCRITTO_ESEMPIO, encoding="utf-8"
    )
    print(f"creato {cartella}")
    print("  poi: python3 strumenti/kdp.py copertina", cartella.relative_to(RADICE))
    return 0


def _comando_copertina(argomenti: argparse.Namespace) -> int:
    cartella = Path(argomenti.cartella)
    metadati = epub.carica_metadati(cartella)
    destinazione = cartella / metadati["copertina"]
    if destinazione.exists() and not argomenti.forza:
        print(f"{destinazione} esiste gia' (usa --forza per sovrascrivere)")
        return 0
    if destinazione.suffix.lower() != ".png":
        print(
            "la copertina segnaposto viene generata in PNG; "
            f"il campo «copertina» indica {destinazione.name}",
            file=sys.stderr,
        )
        return 1
    percorso = modulo_copertina.genera(metadati, destinazione)
    print(f"copertina segnaposto: {percorso}")
    return 0


def _comando_costruisci(argomenti: argparse.Namespace) -> int:
    cartella = Path(argomenti.cartella)
    metadati = epub.carica_metadati(cartella)
    destinazione = (
        Path(argomenti.destinazione)
        if argomenti.destinazione
        else RADICE / "dist" / f"{metadati['slug']}.epub"
    )
    risultato = epub.costruisci(cartella, destinazione)
    print(f"scritto {risultato.percorso} ({len(risultato.capitoli)} capitoli)")
    for capitolo in risultato.capitoli:
        print(f"  {capitolo.identificativo}  {capitolo.titolo}")
    for avviso in risultato.avvisi:
        print(f"  ! {avviso}")
    if argomenti.senza_verifica:
        return 0
    print()
    esito = modulo_verifica.verifica(risultato.percorso)
    modulo_verifica.stampa(esito, risultato.percorso)
    return 0 if esito.promosso else 1


def _comando_verifica(argomenti: argparse.Namespace) -> int:
    percorso = Path(argomenti.epub)
    esito = modulo_verifica.verifica(percorso)
    modulo_verifica.stampa(esito, percorso)
    return 0 if esito.promosso else 1


def principale(argomenti: list[str] | None = None) -> int:
    lettore = argparse.ArgumentParser(
        prog="kdp.py", description="Produzione di ebook EPUB per Amazon KDP"
    )
    comandi = lettore.add_subparsers(dest="comando", required=True)

    nuovo = comandi.add_parser("nuovo", help="crea l'impalcatura di un nuovo libro")
    nuovo.add_argument("cartella", help="nome della cartella (dentro libri/) o percorso")
    nuovo.add_argument("--titolo", required=True)
    nuovo.add_argument("--autore", required=True)
    nuovo.add_argument("--lingua", default="it")
    nuovo.set_defaults(funzione=_comando_nuovo)

    copertina = comandi.add_parser("copertina", help="genera una copertina segnaposto")
    copertina.add_argument("cartella")
    copertina.add_argument("--forza", action="store_true", help="sovrascrivi se esiste")
    copertina.set_defaults(funzione=_comando_copertina)

    costruisci = comandi.add_parser("costruisci", help="produce l'EPUB")
    costruisci.add_argument("cartella")
    costruisci.add_argument("--destinazione", help="percorso del file .epub da scrivere")
    costruisci.add_argument(
        "--senza-verifica", action="store_true", help="non eseguire i controlli finali"
    )
    costruisci.set_defaults(funzione=_comando_costruisci)

    controllo = comandi.add_parser("verifica", help="controlla un EPUB gia' prodotto")
    controllo.add_argument("epub")
    controllo.set_defaults(funzione=_comando_verifica)

    scelte = lettore.parse_args(argomenti)
    try:
        return scelte.funzione(scelte)
    except epub.ErroreLibro as errore:
        print(f"errore: {errore}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(principale())
