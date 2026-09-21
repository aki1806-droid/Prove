# Prove — produzione di micro-lezioni video

Slide e voce, senza avatar. Il metodo sta per intero in **[`MASTER.md`](MASTER.md)**:
è un documento portatile, contiene le regole *e* il codice, e ogni regola porta
con sé il motivo — quasi tutte sono costate un render buttato.

Questo repository è il §9 del MASTER già fatto: gli strumenti sono al loro
posto e una lezione seme è pronta da cui copiare.

## Com'è messo

```
MASTER.md            il metodo, per intero
nuova-lezione.sh     impianta una lezione nuova copiando dall'ultima fatta
progetti/
  m16-l16.1-concetti-stigma-normativa/    la lezione seme (corso OSS)
    profilo.py          TUTTI i numeri della lezione, in un posto solo
    copione/            costruisci.py — i blocchi del parlato
    audio/              tagli.py, verifica.py, verifica-testo.py
    slide/              layout.mjs, grafica.mjs, cards.mjs, clips.mjs, contenuti.mjs
    monta-scene.py · monta-locale.py · controlli.py · verifica-locale.py
```

Un video è fatto di cinque cose e nient'altro: il copione a blocchi, la voce,
le slide, le clip, il montaggio. L'unità che li tiene insieme è il blocco —
**un blocco = un mp3 = una clip = una scena**.

## Le due regole che valgono più delle altre

**I numeri stanno in `profilo.py`, mai dentro uno strumento.** Gli strumenti
sono condivisi fra tutte le lezioni, e `nuova-lezione.sh` li copia dall'ultima
fatta: un numero che vale per una lezione sola e finisce in uno strumento
condiviso non esplode sulla lezione che l'ha scritto, esplode sulla prima che
ha un numero diverso. È già successo tre volte (MASTER §4).

**`OK, nessun errore` non vuol dire che il copione è giusto.** I controlli
verificano la forma; non sanno che cosa doveva esserci. Il copione riscritto si
rilegge contro quello di partenza, e le slide si **guardano** nei provini: tre
difetti veri sono stati trovati solo così.

## Per cominciare

```bash
pip install imageio-ffmpeg Pillow          # node 22 e Chromium già presenti
./nuova-lezione.sh m16-l16.2-nome-lezione  # copia dall'ultima lezione fatta
```

Poi le tre domande del MASTER §1 (da dove viene il copione, quanto deve durare,
ci va una pausa musicale), si ritocca `profilo.py` — **`STACCO` sempre** — e si
scrivono i due soli file che cambiano a ogni lezione: `copione/costruisci.py` e
`slide/contenuti.mjs`. La pipeline è nel §3; `nuova-lezione.sh` la ristampa in
coda, nell'ordine.

## Quello che qui non c'è

- **`slide/marchio/logo-rifilato.png`** — il marchio del committente non è un
  file del metodo. Finché manca, `cards.mjs` e `clips.mjs` si fermano subito.
  Come procurarselo e perché va *rifilato*:
  [`slide/marchio/LEGGIMI.md`](progetti/m16-l16.1-concetti-stigma-normativa/slide/marchio/LEGGIMI.md).
- **le tracce di voce** (`audio/grezzo-A.mp3`, `-B.mp3`) — si generano col
  servizio di sintesi, a copione fermo, e costano: un mp3 non sta in git.
- **i prodotti della lavorazione** — PNG, clip, scene, montato e sottotitoli si
  rigenerano tutti dagli strumenti, e sono in `.gitignore`.

`slide/font/font-incorporati.css` invece **c'è** ed è versionato: Inter e
Source Serif 4 in SIL Open Font License 1.1, solo i sottoinsiemi `latin` e
`latin-ext`, una `@font-face` per faccia con l'intervallo di pesi. La licenza
lo accompagna, come l'OFL chiede, in `slide/font/LICENSE-OFL.txt`.

## Una nota sulla macchina

`slide/cards.mjs` e `slide/clips.mjs` cercano Chromium in
`/opt/pw-browsers/chromium-1194/chrome-linux/chrome`, e `nuova-lezione.sh`
collega `node_modules` a `/opt/node22/lib/node_modules`. Sono i percorsi della
macchina su cui il metodo è stato misurato: su una macchina diversa si
aggiustano lì, una volta, in tutti e due i file.
