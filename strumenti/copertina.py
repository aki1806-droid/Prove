"""Copertina segnaposto generata dai metadati del libro.

Serve a chiudere il ciclo di produzione quando la copertina definitiva non
c'e' ancora: l'EPUB si costruisce e si verifica lo stesso. Per la pubblicazione
va sostituita con la copertina vera (JPEG 1600x2560, si veda docs/kdp.md).

Il carattere e' una griglia 5x7 disegnata qui dentro, perche' nell'ambiente
non c'e' nessuna libreria grafica.
"""

from __future__ import annotations

from pathlib import Path

from immagini import Tela

LARGHEZZA_PREDEFINITA = 1600
ALTEZZA_PREDEFINITA = 2560

_GLIFI_GREZZI = {
    "A": ".###.|#...#|#...#|#####|#...#|#...#|#...#",
    "B": "####.|#...#|#...#|####.|#...#|#...#|####.",
    "C": ".###.|#...#|#....|#....|#....|#...#|.###.",
    "D": "####.|#...#|#...#|#...#|#...#|#...#|####.",
    "E": "#####|#....|#....|####.|#....|#....|#####",
    "F": "#####|#....|#....|####.|#....|#....|#....",
    "G": ".###.|#...#|#....|#.###|#...#|#...#|.###.",
    "H": "#...#|#...#|#...#|#####|#...#|#...#|#...#",
    "I": "#####|..#..|..#..|..#..|..#..|..#..|#####",
    "J": "..###|...#.|...#.|...#.|...#.|#..#.|.##..",
    "K": "#...#|#..#.|#.#..|##...|#.#..|#..#.|#...#",
    "L": "#....|#....|#....|#....|#....|#....|#####",
    "M": "#...#|##.##|#.#.#|#.#.#|#...#|#...#|#...#",
    "N": "#...#|##..#|#.#.#|#.#.#|#..##|#...#|#...#",
    "O": ".###.|#...#|#...#|#...#|#...#|#...#|.###.",
    "P": "####.|#...#|#...#|####.|#....|#....|#....",
    "Q": ".###.|#...#|#...#|#...#|#.#.#|#..#.|.##.#",
    "R": "####.|#...#|#...#|####.|#.#..|#..#.|#...#",
    "S": ".####|#....|#....|.###.|....#|....#|####.",
    "T": "#####|..#..|..#..|..#..|..#..|..#..|..#..",
    "U": "#...#|#...#|#...#|#...#|#...#|#...#|.###.",
    "V": "#...#|#...#|#...#|#...#|#...#|.#.#.|..#..",
    "W": "#...#|#...#|#...#|#.#.#|#.#.#|##.##|#...#",
    "X": "#...#|#...#|.#.#.|..#..|.#.#.|#...#|#...#",
    "Y": "#...#|#...#|.#.#.|..#..|..#..|..#..|..#..",
    "Z": "#####|....#|...#.|..#..|.#...|#....|#####",
    "0": ".###.|#...#|#..##|#.#.#|##..#|#...#|.###.",
    "1": "..#..|.##..|..#..|..#..|..#..|..#..|.###.",
    "2": ".###.|#...#|....#|...#.|..#..|.#...|#####",
    "3": "#####|...#.|..#..|...#.|....#|#...#|.###.",
    "4": "...#.|..##.|.#.#.|#..#.|#####|...#.|...#.",
    "5": "#####|#....|####.|....#|....#|#...#|.###.",
    "6": "..##.|.#...|#....|####.|#...#|#...#|.###.",
    "7": "#####|....#|...#.|..#..|.#...|.#...|.#...",
    "8": ".###.|#...#|#...#|.###.|#...#|#...#|.###.",
    "9": ".###.|#...#|#...#|.####|....#|...#.|.##..",
    ".": ".....|.....|.....|.....|.....|.##..|.##..",
    ",": ".....|.....|.....|.....|.##..|.##..|.#...",
    ":": ".....|.##..|.##..|.....|.##..|.##..|.....",
    "!": "..#..|..#..|..#..|..#..|..#..|.....|..#..",
    "?": ".###.|#...#|....#|...#.|..#..|.....|..#..",
    "-": ".....|.....|.....|#####|.....|.....|.....",
    "’": "..#..|..#..|.....|.....|.....|.....|.....",
    "«": ".....|..#.#|.#.#.|#.#..|.#.#.|..#.#|.....",
    "»": ".....|#.#..|.#.#.|..#.#|.#.#.|#.#..|.....",
    "&": ".##..|#..#.|#.#..|.#...|#.#.#|#..#.|.##.#",
    " ": ".....|.....|.....|.....|.....|.....|.....",
}

GLIFI = {carattere: righe.split("|") for carattere, righe in _GLIFI_GREZZI.items()}

_EQUIVALENZE = {
    "À": "A", "Á": "A", "Â": "A", "Ä": "A",
    "È": "E", "É": "E", "Ê": "E", "Ë": "E",
    "Ì": "I", "Í": "I", "Î": "I", "Ï": "I",
    "Ò": "O", "Ó": "O", "Ô": "O", "Ö": "O",
    "Ù": "U", "Ú": "U", "Û": "U", "Ü": "U",
    "Ç": "C", "Ñ": "N",
    "'": "’", "’": "’", "—": "-", "–": "-", "…": ".",
    '"': "«",
}

LARGHEZZA_GLIFO = 5
ALTEZZA_GLIFO = 7


def _normalizza(carattere: str) -> str:
    carattere = carattere.upper()
    carattere = _EQUIVALENZE.get(carattere, carattere)
    return carattere if carattere in GLIFI else "?"


def larghezza_testo(testo: str, scala: int, spaziatura: int = 1) -> int:
    if not testo:
        return 0
    passo = (LARGHEZZA_GLIFO + spaziatura) * scala
    return passo * len(testo) - spaziatura * scala


def disegna_testo(tela: Tela, testo: str, x: int, y: int, scala: int,
                  colore: tuple[int, int, int], spaziatura: int = 1) -> None:
    passo = (LARGHEZZA_GLIFO + spaziatura) * scala
    for indice, carattere in enumerate(testo):
        glifo = GLIFI[_normalizza(carattere)]
        origine_x = x + indice * passo
        for riga, motivo in enumerate(glifo):
            for colonna, punto in enumerate(motivo):
                if punto == "#":
                    tela.rettangolo(
                        origine_x + colonna * scala, y + riga * scala, scala, scala, colore
                    )


def _spezza(testo: str, caratteri_per_riga: int) -> list[str]:
    righe: list[str] = []
    corrente = ""
    for parola in testo.split():
        candidata = f"{corrente} {parola}".strip()
        if len(candidata) <= caratteri_per_riga or not corrente:
            corrente = candidata
        else:
            righe.append(corrente)
            corrente = parola
    if corrente:
        righe.append(corrente)
    return righe


def _testo_centrato(tela: Tela, righe: list[str], y: int, scala: int,
                    colore: tuple[int, int, int], interlinea: float = 1.8) -> int:
    passo = int(ALTEZZA_GLIFO * scala * interlinea)
    for numero, riga in enumerate(righe):
        x = (tela.larghezza - larghezza_testo(riga, scala)) // 2
        disegna_testo(tela, riga, x, y + numero * passo, scala, colore)
    return y + len(righe) * passo


def genera(metadati: dict, destinazione: Path,
           larghezza: int = LARGHEZZA_PREDEFINITA,
           altezza: int = ALTEZZA_PREDEFINITA) -> Path:
    """Disegna una copertina segnaposto con titolo, sottotitolo e autore."""
    inchiostro = (243, 240, 232)
    fondo = (26, 38, 52)
    accento = (198, 138, 63)

    tela = Tela(larghezza, altezza, fondo)
    margine = larghezza // 10
    tela.rettangolo(margine, margine, larghezza - 2 * margine, 6, accento)
    tela.rettangolo(margine, altezza - margine - 6, larghezza - 2 * margine, 6, accento)

    scala_titolo = max(1, larghezza // 190)
    caratteri_per_riga = max(6, (larghezza - 2 * margine) // (6 * scala_titolo))
    righe_titolo = _spezza(metadati.get("titolo", "Senza titolo"), caratteri_per_riga)

    y = altezza // 4
    y = _testo_centrato(tela, righe_titolo, y, scala_titolo, inchiostro)

    sottotitolo = metadati.get("sottotitolo")
    if sottotitolo:
        scala_sottotitolo = max(1, scala_titolo // 2)
        y += ALTEZZA_GLIFO * scala_titolo
        righe = _spezza(sottotitolo, max(10, caratteri_per_riga * 2))
        y = _testo_centrato(tela, righe, y, scala_sottotitolo, accento)

    scala_autore = max(1, int(scala_titolo * 0.6))
    righe_autore = _spezza(metadati.get("autore", ""), caratteri_per_riga * 2)
    _testo_centrato(
        tela,
        righe_autore,
        altezza - altezza // 4,
        scala_autore,
        inchiostro,
    )
    return tela.salva(Path(destinazione))
