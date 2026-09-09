# prove

Produzione di ebook EPUB pronti per il caricamento su Amazon KDP.

Si scrive il libro in Markdown, si lancia un comando, si ottiene un `.epub`
verificato. Il caricamento su KDP resta manuale, perché Amazon non espone
un'API di pubblicazione: si veda [docs/kdp.md](docs/kdp.md).

## Requisiti

Python 3.11 o successivo. Nient'altro: niente pandoc, niente LaTeX, nessun
pacchetto da installare. Tutto è costruito sulla libreria standard, copertina
segnaposto compresa.

## Come si usa

```bash
# 1. impalcatura di un nuovo libro
python3 strumenti/kdp.py nuovo mio-libro --titolo "Il mio libro" --autore "Nome Cognome"

# 2. copertina segnaposto, da sostituire con quella vera
python3 strumenti/kdp.py copertina libri/mio-libro

# 3. si scrive in libri/mio-libro/manoscritto/*.md

# 4. EPUB + verifica
python3 strumenti/kdp.py costruisci libri/mio-libro
```

Il file finisce in `dist/<slug>.epub`. `costruisci` esegue anche i controlli;
per rieseguirli da soli su un file già prodotto:

```bash
python3 strumenti/kdp.py verifica dist/mio-libro.epub
```

## Struttura

```
libri/                 un libro per cartella (manoscritto, metadati, risorse)
  pane-in-casa/        libro di prova: serve a verificare la catena
strumenti/
  kdp.py               interfaccia a riga di comando
  markdown_min.py      Markdown -> XHTML (sottoinsieme, con tipografia italiana)
  epub.py              costruzione dell'EPUB 3
  verifica.py          controlli strutturali e raccomandazioni KDP
  copertina.py         copertina segnaposto dai metadati
  immagini.py          lettura misure e scrittura PNG
  test_pipeline.py     test della catena
docs/
  kdp.md               requisiti Amazon e lista di controllo prima di caricare
  formato-manoscritto.md   metadati e Markdown riconosciuto
dist/                  EPUB prodotti (non versionati)
```

## Che cosa fa la verifica

Controlla ciò che più spesso fa rifiutare un EPUB da KDP: `mimetype` non
compresso e in prima posizione, corrispondenza fra manifesto e contenuto
dell'archivio, dorsale coerente, presenza dell'indice di navigazione e del
`toc.ncx`, riferimenti interni non rotti, copertina dichiarata correttamente.
Segnala inoltre gli scostamenti dalle raccomandazioni Amazon (misure e
proporzione della copertina, peso del file).

Non sostituisce epubcheck né Kindle Previewer: prima di pubblicare conviene
passare anche da lì.

## Test

```bash
python3 strumenti/test_pipeline.py
```

## Come si lavora

- Il branch principale è `main`.
- Ogni modifica in un branch dedicato, poi pull request su `main`.
