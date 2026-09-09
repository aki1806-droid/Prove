"""Conversione di un sottoinsieme di Markdown in XHTML, senza dipendenze esterne.

Il sottoinsieme e' pensato per la narrativa e la saggistica, non per la
documentazione tecnica. Costrutti riconosciuti:

    # Titolo            titoli da <h1> a <h6>
    testo su piu' righe  paragrafo (le righe consecutive vengono unite)
    *corsivo*           <em>, anche con _corsivo_
    **grassetto**       <strong>
    `codice`            <code>
    > citazione         <blockquote> (puo' contenere altri blocchi)
    - voce              elenco puntato
    1. voce             elenco numerato
    ---                 separatore di scena (<hr />)
    [testo](url)        collegamento
    ![alt](percorso)    immagine
    \\*                  la barra rovesciata protegge il carattere successivo

Non sono supportati: tabelle, elenchi annidati, blocchi di codice indentati,
HTML grezzo. Sono scelte deliberate: un manoscritto che ne ha bisogno e'
un manoscritto che sta usando lo strumento sbagliato.

Con `tipografia=True` (predefinito) il testo viene ripulito secondo l'uso
italiano: virgolette caporali, apostrofo tipografico, lineette, puntini di
sospensione.
"""

from __future__ import annotations

import re

__all__ = ["converti", "inline"]


def _escape(testo: str) -> str:
    return testo.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def _escape_attr(testo: str) -> str:
    return _escape(testo).replace('"', "&quot;")


def _tipografia(testo: str) -> str:
    testo = testo.replace("---", "—").replace("--", "–")
    testo = testo.replace("...", "…")
    testo = re.sub(r'"([^"]*)"', "«\\1»", testo)
    return testo.replace("'", "’")


def _testo_semplice(testo: str, tipografia: bool) -> str:
    testo = _escape(testo)
    if tipografia:
        testo = _tipografia(testo)
    testo = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", testo, flags=re.S)
    testo = re.sub(r"\*(.+?)\*", r"<em>\1</em>", testo, flags=re.S)
    testo = re.sub(r"(?<!\w)_(.+?)_(?!\w)", r"<em>\1</em>", testo, flags=re.S)
    return testo


_TOKEN = re.compile(
    r"""
      (?P<protetto>\\.)
    | (?P<codice>`[^`]+`)
    | (?P<immagine>!\[(?P<alt>[^\]]*)\]\((?P<src>[^)\s]+)\))
    | (?P<link>\[(?P<etichetta>[^\]]+)\]\((?P<url>[^)\s]+)\))
    """,
    re.X,
)


def inline(testo: str, tipografia: bool = True) -> str:
    """Converte il contenuto di un blocco (senza tag di blocco attorno)."""
    pezzi: list[str] = []
    posizione = 0
    for trovato in _TOKEN.finditer(testo):
        pezzi.append(_testo_semplice(testo[posizione:trovato.start()], tipografia))
        if trovato.group("protetto"):
            pezzi.append(_escape(trovato.group("protetto")[1]))
        elif trovato.group("codice"):
            pezzi.append("<code>" + _escape(trovato.group("codice")[1:-1]) + "</code>")
        elif trovato.group("immagine"):
            pezzi.append(
                '<img src="%s" alt="%s" />'
                % (_escape_attr(trovato.group("src")), _escape_attr(trovato.group("alt")))
            )
        else:
            pezzi.append(
                '<a href="%s">%s</a>'
                % (
                    _escape_attr(trovato.group("url")),
                    _testo_semplice(trovato.group("etichetta"), tipografia),
                )
            )
        posizione = trovato.end()
    pezzi.append(_testo_semplice(testo[posizione:], tipografia))
    return "".join(pezzi)


_TITOLO = re.compile(r"^(#{1,6})\s+(.*?)\s*$")
_SEPARATORE = re.compile(r"^(?:-{3,}|\*{3,}|_{3,})$")
_VOCE_PUNTATA = re.compile(r"^\s*[-*+]\s+(.*)$")
_VOCE_NUMERATA = re.compile(r"^\s*\d+[.)]\s+(.*)$")


def _inizia_blocco(riga: str) -> bool:
    testo = riga.strip()
    if not testo:
        return True
    return bool(
        _TITOLO.match(riga)
        or _SEPARATORE.match(testo)
        or _VOCE_PUNTATA.match(riga)
        or _VOCE_NUMERATA.match(riga)
        or testo.startswith(">")
    )


def _elenco(righe: list[str], indice: int, tipografia: bool) -> tuple[str, int]:
    numerato = bool(_VOCE_NUMERATA.match(righe[indice]))
    voci: list[list[str]] = []
    while indice < len(righe):
        riga = righe[indice]
        trovato = _VOCE_NUMERATA.match(riga) if numerato else _VOCE_PUNTATA.match(riga)
        if trovato:
            voci.append([trovato.group(1)])
            indice += 1
            continue
        if voci and riga.strip() and not _inizia_blocco(riga):
            voci[-1].append(riga.strip())
            indice += 1
            continue
        break
    tag = "ol" if numerato else "ul"
    corpo = "\n".join(
        "  <li>%s</li>" % inline(" ".join(voce), tipografia) for voce in voci
    )
    return f"<{tag}>\n{corpo}\n</{tag}>", indice


def converti(testo: str, tipografia: bool = True) -> str:
    """Converte un documento Markdown nel frammento XHTML del corpo."""
    righe = testo.replace("\r\n", "\n").replace("\r", "\n").split("\n")
    blocchi: list[str] = []
    indice = 0
    while indice < len(righe):
        riga = righe[indice]
        if not riga.strip():
            indice += 1
            continue

        if _SEPARATORE.match(riga.strip()):
            blocchi.append('<hr class="separatore" />')
            indice += 1
            continue

        titolo = _TITOLO.match(riga)
        if titolo:
            livello = len(titolo.group(1))
            blocchi.append(
                "<h%d>%s</h%d>" % (livello, inline(titolo.group(2), tipografia), livello)
            )
            indice += 1
            continue

        if riga.lstrip().startswith(">"):
            interne: list[str] = []
            while indice < len(righe) and righe[indice].lstrip().startswith(">"):
                interne.append(re.sub(r"^\s*>\s?", "", righe[indice]))
                indice += 1
            blocchi.append(
                "<blockquote>\n%s\n</blockquote>"
                % converti("\n".join(interne), tipografia)
            )
            continue

        if _VOCE_PUNTATA.match(riga) or _VOCE_NUMERATA.match(riga):
            blocco, indice = _elenco(righe, indice, tipografia)
            blocchi.append(blocco)
            continue

        paragrafo = [riga.strip()]
        indice += 1
        while indice < len(righe) and not _inizia_blocco(righe[indice]):
            paragrafo.append(righe[indice].strip())
            indice += 1
        blocchi.append("<p>%s</p>" % inline(" ".join(paragrafo), tipografia))

    return "\n".join(blocchi)
