"""Costruzione di un EPUB 3 a partire da una cartella-libro.

Struttura attesa della cartella:

    libri/<slug>/
        libro.json          metadati (titolo, autore, lingua, ...)
        manoscritto/        i capitoli in Markdown, in ordine alfabetico
        risorse/            copertina e immagini

L'EPUB prodotto e' riproducibile: a parita' di sorgenti i byte sono
identici, perche' le date interne allo zip vengono prese dai metadati e
non dall'orologio.
"""

from __future__ import annotations

import json
import re
import unicodedata
import uuid
import zipfile
from dataclasses import dataclass, field
from datetime import date
from pathlib import Path

import markdown_min
from immagini import dimensioni

CAMPI_OBBLIGATORI = ("titolo", "autore", "lingua")

TIPI_MEDIA = {
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".webp": "image/webp",
    ".otf": "font/otf",
    ".ttf": "font/ttf",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
}

FOGLIO_STILE = """@charset "utf-8";

body {
  margin: 0 5%;
  line-height: 1.45;
  text-align: justify;
  hyphens: auto;
  -webkit-hyphens: auto;
  -epub-hyphens: auto;
}

h1, h2, h3 {
  font-weight: normal;
  line-height: 1.25;
  page-break-after: avoid;
}

h1 {
  font-size: 1.6em;
  text-align: center;
  letter-spacing: 0.06em;
  margin: 2em 0 1.6em;
  page-break-before: always;
}

h2 { font-size: 1.2em; text-align: left; margin: 1.8em 0 0.6em; }
h3 { font-size: 1.05em; text-align: left; margin: 1.4em 0 0.5em; font-style: italic; }

p { margin: 0; text-indent: 1.2em; }
h1 + p, h2 + p, h3 + p, hr + p, blockquote + p, ul + p, ol + p { text-indent: 0; }

blockquote { margin: 1.2em 2em; font-style: italic; }
ul, ol { margin: 1em 0 1em 1.4em; text-align: left; }
li { margin-bottom: 0.4em; }
code { font-family: monospace; font-size: 0.95em; }

hr.separatore {
  border: 0;
  border-top: 1px solid currentColor;
  opacity: 0.45;
  width: 22%;
  margin: 1.6em auto;
}

img { max-width: 100%; height: auto; }

body.copertina { margin: 0; padding: 0; text-align: center; }

body.frontespizio { text-align: center; margin-top: 22%; }
body.frontespizio p { text-indent: 0; margin: 0.6em 0; }
.titolo { font-size: 1.9em; letter-spacing: 0.05em; }
.sottotitolo { font-size: 1.1em; font-style: italic; }
.autore { font-size: 1.2em; margin-top: 2.4em; }
.editore { font-size: 0.9em; margin-top: 3.4em; }

nav ol { list-style: none; margin-left: 0; }
nav li { margin-bottom: 0.6em; }
"""


class ErroreLibro(Exception):
    """Problema nei sorgenti del libro: il messaggio e' rivolto all'autore."""


@dataclass
class Capitolo:
    identificativo: str
    nome_file: str
    titolo: str
    xhtml: str


@dataclass
class Risultato:
    percorso: Path
    capitoli: list[Capitolo]
    avvisi: list[str] = field(default_factory=list)


def _sigla(testo: str) -> str:
    testo = unicodedata.normalize("NFKD", testo).encode("ascii", "ignore").decode()
    testo = re.sub(r"[^a-zA-Z0-9]+", "-", testo).strip("-").lower()
    return testo or "libro"


def carica_metadati(cartella: Path) -> dict:
    percorso = Path(cartella) / "libro.json"
    if not percorso.exists():
        raise ErroreLibro(f"manca il file dei metadati: {percorso}")
    try:
        metadati = json.loads(percorso.read_text(encoding="utf-8"))
    except json.JSONDecodeError as errore:
        raise ErroreLibro(f"{percorso} non e' JSON valido: {errore}") from errore

    mancanti = [campo for campo in CAMPI_OBBLIGATORI if not metadati.get(campo)]
    if mancanti:
        raise ErroreLibro(
            "campi obbligatori mancanti in %s: %s" % (percorso, ", ".join(mancanti))
        )

    metadati.setdefault("data_pubblicazione", date.today().isoformat())
    if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", metadati["data_pubblicazione"]):
        raise ErroreLibro("data_pubblicazione deve essere nel formato AAAA-MM-GG")
    metadati.setdefault("copertina", "risorse/copertina.png")
    metadati.setdefault("tipografia", True)
    metadati.setdefault("slug", _sigla(metadati["titolo"]))
    metadati.setdefault(
        "identificativo",
        "urn:uuid:%s"
        % uuid.uuid5(uuid.NAMESPACE_URL, f"{metadati['titolo']}|{metadati['autore']}"),
    )
    return metadati


def _escape(testo: str) -> str:
    return (
        str(testo)
        .replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )


def _documento(titolo: str, lingua: str, corpo: str, classe: str = "",
               foglio: str = "../stile.css", extra_html: str = "") -> str:
    attributo_classe = f' class="{classe}"' if classe else ""
    return (
        '<?xml version="1.0" encoding="utf-8"?>\n'
        "<!DOCTYPE html>\n"
        '<html xmlns="http://www.w3.org/1999/xhtml" '
        'xmlns:epub="http://www.idpf.org/2007/ops" '
        f'xml:lang="{lingua}" lang="{lingua}"{extra_html}>\n'
        "<head>\n"
        '  <meta charset="utf-8" />\n'
        f"  <title>{_escape(titolo)}</title>\n"
        f'  <link rel="stylesheet" type="text/css" href="{foglio}" />\n'
        "</head>\n"
        f"<body{attributo_classe}>\n{corpo}\n</body>\n</html>\n"
    )


_RIFERIMENTO = re.compile(r'(src|href)="(?!https?:|mailto:|#|\.\./|/)([^"]+)"')


def _corregge_percorsi(xhtml: str) -> tuple[str, list[str]]:
    """I capitoli stanno in OEBPS/testo/, le risorse in OEBPS/risorse/."""
    riferimenti: list[str] = []

    def sostituisci(trovato: re.Match) -> str:
        percorso = trovato.group(2).lstrip("./")
        riferimenti.append(percorso)
        return f'{trovato.group(1)}="../{percorso}"'

    return _RIFERIMENTO.sub(sostituisci, xhtml), riferimenti


def leggi_capitoli(cartella: Path, metadati: dict) -> tuple[list[Capitolo], list[str]]:
    manoscritto = Path(cartella) / "manoscritto"
    if not manoscritto.is_dir():
        raise ErroreLibro(f"manca la cartella del manoscritto: {manoscritto}")
    sorgenti = sorted(manoscritto.glob("*.md"))
    if not sorgenti:
        raise ErroreLibro(f"nessun capitolo (*.md) in {manoscritto}")

    capitoli: list[Capitolo] = []
    riferimenti: list[str] = []
    for numero, sorgente in enumerate(sorgenti, start=1):
        testo = sorgente.read_text(encoding="utf-8")
        titolo = next(
            (
                riga[2:].strip()
                for riga in testo.splitlines()
                if riga.startswith("# ")
            ),
            None,
        )
        if not titolo:
            raise ErroreLibro(
                f"{sorgente} non ha un titolo: la prima riga utile deve essere '# Titolo'"
            )
        corpo = markdown_min.converti(testo, tipografia=bool(metadati["tipografia"]))
        corpo, trovati = _corregge_percorsi(corpo)
        riferimenti += trovati
        capitoli.append(
            Capitolo(
                identificativo=f"cap{numero:02d}",
                nome_file=f"cap{numero:02d}.xhtml",
                titolo=markdown_min.inline(titolo, bool(metadati["tipografia"])),
                xhtml=_documento(titolo, metadati["lingua"], corpo, classe="capitolo"),
            )
        )
    return capitoli, riferimenti


def _pagina_copertina(metadati: dict, copertina: Path) -> str:
    misure = dimensioni(copertina) or (1600, 2560)
    larghezza, altezza = misure
    corpo = (
        '<svg xmlns="http://www.w3.org/2000/svg" '
        'xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" '
        f'width="100%" height="100%" viewBox="0 0 {larghezza} {altezza}" '
        'preserveAspectRatio="xMidYMid meet">\n'
        f'  <image width="{larghezza}" height="{altezza}" '
        f'xlink:href="../risorse/{copertina.name}" />\n'
        "</svg>"
    )
    return _documento("Copertina", metadati["lingua"], corpo, classe="copertina")


def _frontespizio(metadati: dict) -> str:
    righe = [f'<p class="titolo">{_escape(metadati["titolo"])}</p>']
    if metadati.get("sottotitolo"):
        righe.append(f'<p class="sottotitolo">{_escape(metadati["sottotitolo"])}</p>')
    righe.append(f'<p class="autore">{_escape(metadati["autore"])}</p>')
    if metadati.get("editore"):
        righe.append(f'<p class="editore">{_escape(metadati["editore"])}</p>')
    return _documento(
        metadati["titolo"], metadati["lingua"], "\n".join(righe), classe="frontespizio"
    )


def _indice(metadati: dict, capitoli: list[Capitolo]) -> str:
    voci = "\n".join(
        f'    <li><a href="testo/{capitolo.nome_file}">{capitolo.titolo}</a></li>'
        for capitolo in capitoli
    )
    corpo = (
        '<nav epub:type="toc" id="toc">\n'
        "  <h1>Indice</h1>\n"
        f"  <ol>\n{voci}\n  </ol>\n"
        "</nav>\n"
        '<nav epub:type="landmarks" hidden="hidden">\n'
        "  <ol>\n"
        '    <li><a epub:type="cover" href="testo/copertina.xhtml">Copertina</a></li>\n'
        '    <li><a epub:type="titlepage" href="testo/frontespizio.xhtml">Frontespizio</a></li>\n'
        f'    <li><a epub:type="bodymatter" href="testo/{capitoli[0].nome_file}">Inizio</a></li>\n'
        "  </ol>\n"
        "</nav>"
    )
    return _documento("Indice", metadati["lingua"], corpo, foglio="stile.css")


def _ncx(metadati: dict, capitoli: list[Capitolo]) -> str:
    punti = "\n".join(
        f'    <navPoint id="{capitolo.identificativo}" playOrder="{numero}">\n'
        f"      <navLabel><text>{capitolo.titolo}</text></navLabel>\n"
        f'      <content src="testo/{capitolo.nome_file}" />\n'
        "    </navPoint>"
        for numero, capitolo in enumerate(capitoli, start=1)
    )
    return (
        '<?xml version="1.0" encoding="utf-8"?>\n'
        '<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">\n'
        "  <head>\n"
        f'    <meta name="dtb:uid" content="{_escape(metadati["identificativo"])}" />\n'
        '    <meta name="dtb:depth" content="1" />\n'
        '    <meta name="dtb:totalPageCount" content="0" />\n'
        '    <meta name="dtb:maxPageNumber" content="0" />\n'
        "  </head>\n"
        f"  <docTitle><text>{_escape(metadati['titolo'])}</text></docTitle>\n"
        f"  <docAuthor><text>{_escape(metadati['autore'])}</text></docAuthor>\n"
        f"  <navMap>\n{punti}\n  </navMap>\n"
        "</ncx>\n"
    )


def _opf(metadati: dict, capitoli: list[Capitolo], risorse: list[tuple[str, str, str]]) -> str:
    dc = [
        f'    <dc:identifier id="pub-id">{_escape(metadati["identificativo"])}</dc:identifier>',
        f'    <dc:title>{_escape(metadati["titolo"])}</dc:title>',
        f'    <dc:language>{_escape(metadati["lingua"])}</dc:language>',
        f'    <dc:creator id="autore">{_escape(metadati["autore"])}</dc:creator>',
        '    <meta refines="#autore" property="role" scheme="marc:relators">aut</meta>',
        f'    <dc:date>{metadati["data_pubblicazione"]}</dc:date>',
        '    <meta property="dcterms:modified">%sT00:00:00Z</meta>'
        % metadati["data_pubblicazione"],
    ]
    if metadati.get("autore_ordinamento"):
        dc.append(
            '    <meta refines="#autore" property="file-as">%s</meta>'
            % _escape(metadati["autore_ordinamento"])
        )
    if metadati.get("sottotitolo"):
        dc.append(
            f'    <dc:title id="sottotitolo">{_escape(metadati["sottotitolo"])}</dc:title>'
        )
        dc.append('    <meta refines="#sottotitolo" property="title-type">subtitle</meta>')
    for campo, tag in (("editore", "dc:publisher"), ("descrizione", "dc:description"),
                       ("diritti", "dc:rights")):
        if metadati.get(campo):
            dc.append(f"    <{tag}>{_escape(metadati[campo])}</{tag}>")
    for parola in metadati.get("parole_chiave", []):
        dc.append(f"    <dc:subject>{_escape(parola)}</dc:subject>")
    dc.append('    <meta name="cover" content="copertina" />')

    manifesto = [
        '    <item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav" />',
        '    <item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml" />',
        '    <item id="stile" href="stile.css" media-type="text/css" />',
        '    <item id="pagina-copertina" href="testo/copertina.xhtml" '
        'media-type="application/xhtml+xml" properties="svg" />',
        '    <item id="frontespizio" href="testo/frontespizio.xhtml" '
        'media-type="application/xhtml+xml" />',
    ]
    manifesto += [
        f'    <item id="{capitolo.identificativo}" href="testo/{capitolo.nome_file}" '
        'media-type="application/xhtml+xml" />'
        for capitolo in capitoli
    ]
    manifesto += [
        '    <item id="%s" href="%s" media-type="%s"%s />'
        % (
            identificativo,
            percorso,
            tipo,
            ' properties="cover-image"' if identificativo == "copertina" else "",
        )
        for identificativo, percorso, tipo in risorse
    ]

    dorsale = [
        '    <itemref idref="pagina-copertina" />',
        '    <itemref idref="frontespizio" />',
        '    <itemref idref="nav" />',
    ] + [f'    <itemref idref="{capitolo.identificativo}" />' for capitolo in capitoli]

    return (
        '<?xml version="1.0" encoding="utf-8"?>\n'
        '<package xmlns="http://www.idpf.org/2007/opf" version="3.0" '
        f'unique-identifier="pub-id" xml:lang="{_escape(metadati["lingua"])}">\n'
        '  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">\n'
        + "\n".join(dc)
        + "\n  </metadata>\n"
        "  <manifest>\n" + "\n".join(manifesto) + "\n  </manifest>\n"
        '  <spine toc="ncx">\n' + "\n".join(dorsale) + "\n  </spine>\n"
        "  <guide>\n"
        '    <reference type="cover" title="Copertina" href="testo/copertina.xhtml" />\n'
        '    <reference type="toc" title="Indice" href="nav.xhtml" />\n'
        "  </guide>\n"
        "</package>\n"
    )


CONTAINER = (
    '<?xml version="1.0" encoding="utf-8"?>\n'
    '<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">\n'
    "  <rootfiles>\n"
    '    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml" />\n'
    "  </rootfiles>\n"
    "</container>\n"
)


def costruisci(cartella: Path, destinazione: Path) -> Risultato:
    """Costruisce l'EPUB della cartella-libro e lo scrive in `destinazione`."""
    cartella = Path(cartella)
    metadati = carica_metadati(cartella)
    avvisi: list[str] = []

    copertina = cartella / metadati["copertina"]
    if not copertina.exists():
        raise ErroreLibro(
            f"copertina mancante: {copertina}\n"
            "  generane una segnaposto con: python3 strumenti/kdp.py copertina "
            f"{cartella}"
        )
    if copertina.suffix.lower() not in TIPI_MEDIA:
        raise ErroreLibro(f"formato di copertina non supportato: {copertina.name}")

    capitoli, riferimenti = leggi_capitoli(cartella, metadati)

    risorse: list[tuple[str, str, str]] = []
    cartella_risorse = cartella / "risorse"
    file_risorse: dict[str, Path] = {}
    if cartella_risorse.is_dir():
        for numero, file in enumerate(sorted(cartella_risorse.iterdir()), start=1):
            if not file.is_file():
                continue
            tipo = TIPI_MEDIA.get(file.suffix.lower())
            if not tipo:
                avvisi.append(f"risorsa ignorata (tipo sconosciuto): {file.name}")
                continue
            identificativo = "copertina" if file == copertina else f"risorsa{numero:02d}"
            risorse.append((identificativo, f"risorse/{file.name}", tipo))
            file_risorse[f"risorse/{file.name}"] = file

    for riferimento in riferimenti:
        if riferimento not in file_risorse:
            raise ErroreLibro(
                f"il manoscritto rimanda a «{riferimento}», che non esiste in {cartella_risorse}"
            )

    anno, mese, giorno = (int(pezzo) for pezzo in metadati["data_pubblicazione"].split("-"))
    data_zip = (max(anno, 1980), mese, giorno, 0, 0, 0)

    destinazione = Path(destinazione)
    destinazione.parent.mkdir(parents=True, exist_ok=True)

    def aggiungi(archivio: zipfile.ZipFile, nome: str, dati: bytes,
                 compressione: int = zipfile.ZIP_DEFLATED) -> None:
        voce = zipfile.ZipInfo(nome, date_time=data_zip)
        voce.compress_type = compressione
        voce.external_attr = 0o644 << 16
        archivio.writestr(voce, dati)

    with zipfile.ZipFile(destinazione, "w") as archivio:
        aggiungi(archivio, "mimetype", b"application/epub+zip", zipfile.ZIP_STORED)
        aggiungi(archivio, "META-INF/container.xml", CONTAINER.encode("utf-8"))
        aggiungi(archivio, "OEBPS/stile.css", FOGLIO_STILE.encode("utf-8"))
        aggiungi(
            archivio,
            "OEBPS/testo/copertina.xhtml",
            _pagina_copertina(metadati, copertina).encode("utf-8"),
        )
        aggiungi(
            archivio, "OEBPS/testo/frontespizio.xhtml", _frontespizio(metadati).encode("utf-8")
        )
        for capitolo in capitoli:
            aggiungi(
                archivio, f"OEBPS/testo/{capitolo.nome_file}", capitolo.xhtml.encode("utf-8")
            )
        aggiungi(archivio, "OEBPS/nav.xhtml", _indice(metadati, capitoli).encode("utf-8"))
        aggiungi(archivio, "OEBPS/toc.ncx", _ncx(metadati, capitoli).encode("utf-8"))
        for percorso_interno, file in file_risorse.items():
            aggiungi(archivio, f"OEBPS/{percorso_interno}", file.read_bytes())
        aggiungi(
            archivio, "OEBPS/content.opf", _opf(metadati, capitoli, risorse).encode("utf-8")
        )

    return Risultato(percorso=destinazione, capitoli=capitoli, avvisi=avvisi)
