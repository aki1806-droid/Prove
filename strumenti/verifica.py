"""Controlli sull'EPUB prodotto, prima di caricarlo su KDP.

Non sostituisce epubcheck (che qui non c'e'): verifica la struttura che
rompe piu' spesso il caricamento su KDP - mimetype, manifesto, dorsale,
indice, copertina, riferimenti interni - e segnala gli scostamenti dalle
raccomandazioni Amazon.
"""

from __future__ import annotations

import posixpath
import zipfile
from dataclasses import dataclass, field
from pathlib import Path
from xml.etree import ElementTree

from immagini import dimensioni_da_byte

NS = {
    "contenitore": "urn:oasis:names:tc:opendocument:xmlns:container",
    "opf": "http://www.idpf.org/2007/opf",
    "dc": "http://purl.org/dc/elements/1.1/",
    "xhtml": "http://www.w3.org/1999/xhtml",
}

LIMITE_CARICAMENTO = 650 * 1024 * 1024   # tetto KDP per il file EPUB
SOGLIA_AVVISO = 50 * 1024 * 1024         # oltre, conviene alleggerire le immagini
LATO_MINIMO_COPERTINA = 1000             # px, lato lungo
RAPPORTO_IDEALE = 1.6                    # altezza / larghezza


@dataclass
class Esito:
    errori: list[str] = field(default_factory=list)
    avvisi: list[str] = field(default_factory=list)
    note: list[str] = field(default_factory=list)

    @property
    def promosso(self) -> bool:
        return not self.errori


def _testo(elemento) -> str:
    return (elemento.text or "").strip() if elemento is not None else ""


def verifica(percorso: Path) -> Esito:
    percorso = Path(percorso)
    esito = Esito()
    if not percorso.exists():
        esito.errori.append(f"file inesistente: {percorso}")
        return esito

    peso = percorso.stat().st_size
    esito.note.append(f"dimensione del file: {peso / 1024:.0f} KiB")
    if peso > LIMITE_CARICAMENTO:
        esito.errori.append("il file supera il limite di 650 MB accettato da KDP")
    elif peso > SOGLIA_AVVISO:
        esito.avvisi.append(
            "oltre 50 MB: i costi di consegna incidono sulle royalty al 70%"
        )

    with zipfile.ZipFile(percorso) as archivio:
        nomi = archivio.namelist()
        prima = archivio.infolist()[0]
        if prima.filename != "mimetype":
            esito.errori.append("la prima voce dello zip deve essere «mimetype»")
        elif prima.compress_type != zipfile.ZIP_STORED:
            esito.errori.append("«mimetype» deve essere archiviato senza compressione")
        elif archivio.read("mimetype") != b"application/epub+zip":
            esito.errori.append("il contenuto di «mimetype» non e' application/epub+zip")

        if "META-INF/container.xml" not in nomi:
            esito.errori.append("manca META-INF/container.xml")
            return esito

        contenitore = ElementTree.fromstring(archivio.read("META-INF/container.xml"))
        radice = contenitore.find(".//contenitore:rootfile", NS)
        percorso_opf = radice.get("full-path") if radice is not None else None
        if not percorso_opf or percorso_opf not in nomi:
            esito.errori.append("container.xml non punta a un file OPF presente")
            return esito

        pacchetto = ElementTree.fromstring(archivio.read(percorso_opf))
        base = posixpath.dirname(percorso_opf)

        # --- metadati ---------------------------------------------------
        metadati = pacchetto.find("opf:metadata", NS)
        for tag, etichetta in (
            ("dc:title", "titolo"),
            ("dc:language", "lingua"),
            ("dc:creator", "autore"),
            ("dc:identifier", "identificativo"),
        ):
            if not _testo(metadati.find(tag, NS)):
                esito.errori.append(f"metadato assente o vuoto: {etichetta}")
        identificativo_unico = pacchetto.get("unique-identifier")
        identificativi = [
            elemento.get("id") for elemento in metadati.findall("dc:identifier", NS)
        ]
        if identificativo_unico not in identificativi:
            esito.errori.append(
                "unique-identifier non corrisponde a nessun dc:identifier"
            )
        modificato = [
            elemento
            for elemento in metadati.findall("opf:meta", NS)
            if elemento.get("property") == "dcterms:modified"
        ]
        if not modificato:
            esito.errori.append("manca <meta property=\"dcterms:modified\">, richiesto da EPUB 3")

        # --- manifesto e dorsale ---------------------------------------
        voci: dict[str, tuple[str, str]] = {}
        for elemento in pacchetto.findall("opf:manifest/opf:item", NS):
            identificativo = elemento.get("id")
            href = elemento.get("href")
            interno = posixpath.normpath(posixpath.join(base, href))
            voci[identificativo] = (interno, elemento.get("properties", "") or "")
            if interno not in nomi:
                esito.errori.append(f"il manifesto dichiara «{href}», assente dall'archivio")

        dichiarati = {interno for interno, _ in voci.values()}
        for nome in nomi:
            if nome == "mimetype" or nome.startswith("META-INF/") or nome == percorso_opf:
                continue
            if nome.endswith("/"):
                continue
            if nome not in dichiarati:
                esito.errori.append(f"«{nome}» e' nell'archivio ma non nel manifesto")

        dorsale = pacchetto.findall("opf:spine/opf:itemref", NS)
        if not dorsale:
            esito.errori.append("la dorsale (spine) e' vuota")
        for elemento in dorsale:
            if elemento.get("idref") not in voci:
                esito.errori.append(f"dorsale: idref sconosciuto «{elemento.get('idref')}»")

        indici = [
            interno for interno, proprieta in voci.values() if "nav" in proprieta.split()
        ]
        if not indici:
            esito.errori.append("manca il documento di navigazione (properties=\"nav\")")
        elemento_dorsale = pacchetto.find("opf:spine", NS)
        riferimento_ncx = elemento_dorsale.get("toc") if elemento_dorsale is not None else None
        if riferimento_ncx and riferimento_ncx not in voci:
            esito.errori.append("la dorsale rimanda a un toc.ncx non dichiarato")
        elif not riferimento_ncx:
            esito.avvisi.append(
                "nessun toc.ncx: alcuni dispositivi Kindle piu' vecchi non mostrano l'indice"
            )

        # --- copertina --------------------------------------------------
        copertine = [
            interno
            for interno, proprieta in voci.values()
            if "cover-image" in proprieta.split()
        ]
        if not copertine:
            esito.errori.append("nessuna immagine marcata properties=\"cover-image\"")
        else:
            misure = dimensioni_da_byte(archivio.read(copertine[0]))
            if misure is None:
                esito.avvisi.append("dimensioni della copertina non riconosciute")
            else:
                larghezza, altezza = misure
                esito.note.append(f"copertina: {larghezza}x{altezza} px")
                if max(larghezza, altezza) < LATO_MINIMO_COPERTINA:
                    esito.avvisi.append(
                        f"copertina sotto i {LATO_MINIMO_COPERTINA} px sul lato lungo "
                        "(KDP consiglia 1600x2560)"
                    )
                rapporto = altezza / larghezza if larghezza else 0
                if abs(rapporto - RAPPORTO_IDEALE) > 0.15:
                    esito.avvisi.append(
                        f"rapporto della copertina {rapporto:.2f}:1, KDP consiglia 1,6:1"
                    )
            if copertine[0].lower().endswith(".png"):
                esito.note.append(
                    "copertina PNG: va bene dentro l'EPUB, ma il file caricato a parte "
                    "su KDP deve essere JPEG o TIFF"
                )

        # --- documenti XHTML -------------------------------------------
        for interno, _ in sorted(set(voci.values())):
            if not interno.endswith(".xhtml"):
                continue
            try:
                documento = ElementTree.fromstring(archivio.read(interno))
            except ElementTree.ParseError as errore:
                esito.errori.append(f"{interno}: XHTML non valido ({errore})")
                continue
            cartella = posixpath.dirname(interno)
            for attributo in ("src", "href"):
                for elemento in documento.iter():
                    valore = elemento.get(attributo)
                    if not valore or valore.startswith(("http:", "https:", "mailto:", "#", "data:")):
                        continue
                    bersaglio = posixpath.normpath(
                        posixpath.join(cartella, valore.split("#", 1)[0])
                    )
                    if bersaglio not in nomi:
                        esito.errori.append(
                            f"{interno}: riferimento rotto a «{valore}»"
                        )
            for immagine in documento.iter(f"{{{NS['xhtml']}}}img"):
                if immagine.get("alt") is None:
                    esito.avvisi.append(
                        f"{interno}: <img> senza attributo alt (accessibilita')"
                    )

    return esito


def stampa(esito: Esito, percorso: Path) -> None:
    print(f"Verifica di {percorso}")
    for nota in esito.note:
        print(f"  · {nota}")
    for avviso in esito.avvisi:
        print(f"  ! {avviso}")
    for errore in esito.errori:
        print(f"  ✗ {errore}")
    if esito.promosso:
        print(f"  ✓ nessun errore bloccante ({len(esito.avvisi)} avvisi)")
