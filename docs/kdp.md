# Pubblicare l'EPUB su Amazon KDP

## Quello che si può automatizzare e quello che no

KDP **non espone un'API pubblica di pubblicazione**: non esiste un modo
ufficiale per caricare un manoscritto, aggiornare i metadati o scaricare i
report di vendita via codice. L'unica API Amazon utile a chi pubblica è
quella pubblicitaria (Amazon Ads API, per le campagne Sponsored Products),
soggetta ad approvazione.

Di conseguenza questo repository si ferma un passo prima del caricamento:
produce il file EPUB e lo verifica. Il resto — upload, prezzo, distribuzione —
si fa a mano dalla dashboard di KDP.

Automatizzare la dashboard con browser automation è tecnicamente possibile ma
viola i termini di servizio di Amazon e si rompe a ogni cambio di interfaccia,
login o verifica in due passaggi. Non è una strada che vale la pena prendere.

## Requisiti del file da caricare

| Voce | Valore |
| --- | --- |
| Formati accettati | EPUB (consigliato), DOCX, KPF (Kindle Create), HTML |
| Formato non più accettato | MOBI |
| Dimensione massima | 650 MB |
| Soglia di attenzione | oltre ~50 MB i costi di consegna erodono le royalty al 70% |

La verifica inclusa (`kdp.py verifica`) controlla mimetype, manifesto,
dorsale, indice, copertina e riferimenti interni. **Non sostituisce
epubcheck**: se hai Java a disposizione, prima del caricamento vale la pena
eseguire anche quello, e poi aprire il file in Kindle Previewer per vedere
come impagina davvero.

## Copertina

| Voce | Valore |
| --- | --- |
| Formato del file da caricare | JPEG (.jpg) o TIFF (.tif) |
| Proporzione | 1,6 : 1 (altezza : larghezza) |
| Misura consigliata | 1600 × 2560 px |
| Lato lungo minimo | 1000 px |
| Peso massimo | 50 MB |

La copertina PNG generata da `kdp.py copertina` va benissimo *dentro* l'EPUB,
ma il file che si carica separatamente su KDP deve essere JPEG o TIFF. È una
copertina segnaposto: serve a chiudere il ciclo di produzione, non a vendere
il libro.

## Prima del caricamento

- [ ] `python3 strumenti/kdp.py costruisci libri/<slug>` senza errori
- [ ] EPUB aperto in Kindle Previewer: indice funzionante, capitoli separati,
      copertina al posto giusto
- [ ] Titolo, sottotitolo e autore in `libro.json` scritti **esattamente**
      come andranno nella scheda KDP (devono coincidere)
- [ ] Descrizione pronta (max 4000 caratteri, si può formattare in HTML)
- [ ] Sette parole chiave scelte, e due categorie
- [ ] Copertina definitiva in JPEG 1600 × 2560
- [ ] Deciso se aderire a KDP Select (90 giorni di esclusiva) o no
- [ ] Deciso il prezzo: la royalty al 70% richiede un prezzo tra 2,99 e 9,99
      USD (e fasce equivalenti nelle altre valute); fuori da quella fascia si
      scende al 35%

## ISBN

Per l'ebook Kindle l'ISBN non serve: Amazon assegna un ASIN. Serve invece se
pubblichi anche altrove, o se vuoi che il libro sia identificato
indipendentemente dal negozio.

## Dopo la pubblicazione

Il libro diventa raggiungibile all'indirizzo `https://www.amazon.it/dp/ASIN`,
dove l'ASIN è quello assegnato da KDP. Con un account Amazon Associates lo
stesso indirizzo diventa un collegamento affiliato aggiungendo `?tag=iltuotag-21`.

I report di vendita si scaricano a mano dalla dashboard, in CSV o XLSX.
