#!/usr/bin/env python3
"""Test della catena di produzione: Markdown -> EPUB -> verifica.

    python3 strumenti/test_pipeline.py
"""

from __future__ import annotations

import json
import shutil
import sys
import tempfile
import unittest
import zipfile
from pathlib import Path

CARTELLA = Path(__file__).resolve().parent
if str(CARTELLA) not in sys.path:
    sys.path.insert(0, str(CARTELLA))

import copertina  # noqa: E402
import epub  # noqa: E402
import markdown_min  # noqa: E402
import verifica  # noqa: E402

RADICE = CARTELLA.parent
LIBRO_ESEMPIO = RADICE / "libri" / "pane-in-casa"


class ProvaMarkdown(unittest.TestCase):
    def test_titoli_e_paragrafi(self):
        xhtml = markdown_min.converti("# Uno\n\nRiga a\nRiga b\n\n## Due\n")
        self.assertIn("<h1>Uno</h1>", xhtml)
        self.assertIn("<p>Riga a Riga b</p>", xhtml)
        self.assertIn("<h2>Due</h2>", xhtml)

    def test_enfasi(self):
        xhtml = markdown_min.converti("**forte** e *lieve* e _lieve_", tipografia=False)
        self.assertIn("<strong>forte</strong>", xhtml)
        self.assertEqual(xhtml.count("<em>"), 2)

    def test_elenchi(self):
        puntato = markdown_min.converti("- a\n- b\n")
        numerato = markdown_min.converti("1. a\n2. b\n")
        self.assertIn("<ul>", puntato)
        self.assertEqual(puntato.count("<li>"), 2)
        self.assertIn("<ol>", numerato)

    def test_citazione_e_separatore(self):
        xhtml = markdown_min.converti("> detto\n> e ridetto\n\n---\n")
        self.assertIn("<blockquote>", xhtml)
        self.assertIn("<p>detto e ridetto</p>", xhtml)
        self.assertIn('<hr class="separatore" />', xhtml)

    def test_tipografia_italiana(self):
        xhtml = markdown_min.converti('Disse "sì" -- poi tacque...', tipografia=True)
        self.assertIn("«sì»", xhtml)
        self.assertIn("–", xhtml)
        self.assertIn("…", xhtml)

    def test_tipografia_disattivabile(self):
        xhtml = markdown_min.converti('Disse "sì"', tipografia=False)
        self.assertIn('"sì"', xhtml)

    def test_caratteri_speciali_e_protezione(self):
        xhtml = markdown_min.converti(r"a < b & c \*non corsivo\*")
        self.assertIn("&lt;", xhtml)
        self.assertIn("&amp;", xhtml)
        self.assertNotIn("<em>", xhtml)

    def test_link_e_immagini_non_alterati(self):
        xhtml = markdown_min.converti("[qui](https://esempio.it/a_b_c) ![foto](risorse/x.png)")
        self.assertIn('href="https://esempio.it/a_b_c"', xhtml)
        self.assertIn('<img src="risorse/x.png" alt="foto" />', xhtml)


class BaseLibro(unittest.TestCase):
    """Costruisce un libro minimo in una cartella temporanea."""

    metadati_extra: dict = {}

    def setUp(self):
        self.temporanea = Path(tempfile.mkdtemp())
        self.cartella = self.temporanea / "libro"
        (self.cartella / "manoscritto").mkdir(parents=True)
        (self.cartella / "risorse").mkdir()
        metadati = {
            "titolo": "Libro di prova",
            "autore": "Chi Scrive",
            "lingua": "it",
            "data_pubblicazione": "2026-01-02",
        }
        metadati.update(self.metadati_extra)
        (self.cartella / "libro.json").write_text(
            json.dumps(metadati, ensure_ascii=False), encoding="utf-8"
        )
        (self.cartella / "manoscritto" / "01-uno.md").write_text(
            "# Uno\n\nTesto del primo capitolo.\n", encoding="utf-8"
        )
        (self.cartella / "manoscritto" / "02-due.md").write_text(
            "# Due\n\nTesto del secondo capitolo.\n", encoding="utf-8"
        )
        copertina.genera(metadati, self.cartella / "risorse" / "copertina.png", 800, 1280)

    def tearDown(self):
        shutil.rmtree(self.temporanea, ignore_errors=True)

    def costruisci(self, nome: str = "prova.epub") -> Path:
        return epub.costruisci(self.cartella, self.temporanea / nome).percorso


class ProvaCostruzione(BaseLibro):
    def test_struttura_dell_archivio(self):
        percorso = self.costruisci()
        with zipfile.ZipFile(percorso) as archivio:
            voci = archivio.infolist()
            self.assertEqual(voci[0].filename, "mimetype")
            self.assertEqual(voci[0].compress_type, zipfile.ZIP_STORED)
            self.assertEqual(archivio.read("mimetype"), b"application/epub+zip")
            nomi = archivio.namelist()
        for atteso in (
            "META-INF/container.xml",
            "OEBPS/content.opf",
            "OEBPS/nav.xhtml",
            "OEBPS/toc.ncx",
            "OEBPS/testo/cap01.xhtml",
            "OEBPS/testo/cap02.xhtml",
            "OEBPS/risorse/copertina.png",
        ):
            self.assertIn(atteso, nomi)

    def test_titoli_dei_capitoli_nell_indice(self):
        percorso = self.costruisci()
        with zipfile.ZipFile(percorso) as archivio:
            indice = archivio.read("OEBPS/nav.xhtml").decode("utf-8")
        self.assertIn("Uno", indice)
        self.assertIn("Due", indice)

    def test_costruzione_riproducibile(self):
        primo = self.costruisci("uno.epub").read_bytes()
        secondo = self.costruisci("due.epub").read_bytes()
        self.assertEqual(primo, secondo)

    def test_immagine_nel_manoscritto(self):
        copertina.genera({"titolo": "Schema", "autore": ""},
                         self.cartella / "risorse" / "schema.png", 400, 640)
        (self.cartella / "manoscritto" / "01-uno.md").write_text(
            "# Uno\n\n![Schema](risorse/schema.png)\n", encoding="utf-8"
        )
        percorso = self.costruisci()
        with zipfile.ZipFile(percorso) as archivio:
            self.assertIn("OEBPS/risorse/schema.png", archivio.namelist())
            capitolo = archivio.read("OEBPS/testo/cap01.xhtml").decode("utf-8")
            opf = archivio.read("OEBPS/content.opf").decode("utf-8")
        self.assertIn('src="../risorse/schema.png"', capitolo)
        self.assertIn('href="risorse/schema.png"', opf)

    def test_identificativo_stabile(self):
        primo = epub.carica_metadati(self.cartella)["identificativo"]
        secondo = epub.carica_metadati(self.cartella)["identificativo"]
        self.assertEqual(primo, secondo)
        self.assertTrue(primo.startswith("urn:uuid:"))


class ProvaErrori(BaseLibro):
    def test_metadato_mancante(self):
        (self.cartella / "libro.json").write_text('{"titolo": "Solo titolo"}', encoding="utf-8")
        with self.assertRaises(epub.ErroreLibro) as contesto:
            epub.carica_metadati(self.cartella)
        self.assertIn("autore", str(contesto.exception))

    def test_json_malformato(self):
        (self.cartella / "libro.json").write_text("{non json}", encoding="utf-8")
        with self.assertRaises(epub.ErroreLibro):
            epub.carica_metadati(self.cartella)

    def test_capitolo_senza_titolo(self):
        (self.cartella / "manoscritto" / "01-uno.md").write_text(
            "Testo senza titolo.\n", encoding="utf-8"
        )
        with self.assertRaises(epub.ErroreLibro) as contesto:
            self.costruisci()
        self.assertIn("titolo", str(contesto.exception))

    def test_copertina_mancante(self):
        (self.cartella / "risorse" / "copertina.png").unlink()
        with self.assertRaises(epub.ErroreLibro) as contesto:
            self.costruisci()
        self.assertIn("copertina", str(contesto.exception))

    def test_immagine_inesistente(self):
        (self.cartella / "manoscritto" / "01-uno.md").write_text(
            "# Uno\n\n![Assente](risorse/assente.png)\n", encoding="utf-8"
        )
        with self.assertRaises(epub.ErroreLibro) as contesto:
            self.costruisci()
        self.assertIn("assente.png", str(contesto.exception))

    def test_data_non_valida(self):
        dati = json.loads((self.cartella / "libro.json").read_text(encoding="utf-8"))
        dati["data_pubblicazione"] = "2 gennaio 2026"
        (self.cartella / "libro.json").write_text(json.dumps(dati), encoding="utf-8")
        with self.assertRaises(epub.ErroreLibro):
            epub.carica_metadati(self.cartella)


class ProvaVerifica(BaseLibro):
    def test_epub_valido_promosso(self):
        esito = verifica.verifica(self.costruisci())
        self.assertEqual(esito.errori, [])
        self.assertTrue(esito.promosso)

    def test_copertina_troppo_piccola_avvisata(self):
        copertina.genera({"titolo": "Piccola", "autore": "X"},
                         self.cartella / "risorse" / "copertina.png", 400, 640)
        esito = verifica.verifica(self.costruisci())
        self.assertTrue(any("lato lungo" in avviso for avviso in esito.avvisi))
        self.assertTrue(esito.promosso)

    def test_mimetype_compresso_bocciato(self):
        origine = self.costruisci()
        guasto = self.temporanea / "guasto.epub"
        with zipfile.ZipFile(origine) as dentro, zipfile.ZipFile(
            guasto, "w", zipfile.ZIP_DEFLATED
        ) as fuori:
            for voce in dentro.infolist():
                fuori.writestr(voce.filename, dentro.read(voce.filename))
        esito = verifica.verifica(guasto)
        self.assertFalse(esito.promosso)
        self.assertTrue(any("mimetype" in errore for errore in esito.errori))

    def test_file_non_dichiarato_bocciato(self):
        origine = self.costruisci()
        guasto = self.temporanea / "intruso.epub"
        with zipfile.ZipFile(origine) as dentro, zipfile.ZipFile(guasto, "w") as fuori:
            for voce in dentro.infolist():
                nuova = zipfile.ZipInfo(voce.filename, date_time=voce.date_time)
                nuova.compress_type = voce.compress_type
                fuori.writestr(nuova, dentro.read(voce.filename))
            fuori.writestr("OEBPS/testo/intruso.xhtml", "<html/>")
        esito = verifica.verifica(guasto)
        self.assertTrue(any("intruso" in errore for errore in esito.errori))

    def test_file_inesistente(self):
        esito = verifica.verifica(self.temporanea / "niente.epub")
        self.assertFalse(esito.promosso)


class ProvaLibroDiEsempio(unittest.TestCase):
    @unittest.skipUnless(LIBRO_ESEMPIO.is_dir(), "libro di esempio assente")
    def test_esempio_si_costruisce_e_passa_la_verifica(self):
        with tempfile.TemporaryDirectory() as temporanea:
            destinazione = Path(temporanea) / "esempio.epub"
            risultato = epub.costruisci(LIBRO_ESEMPIO, destinazione)
            self.assertGreaterEqual(len(risultato.capitoli), 3)
            esito = verifica.verifica(destinazione)
            self.assertEqual(esito.errori, [])


if __name__ == "__main__":
    unittest.main(verbosity=2)
