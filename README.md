# Produzione video — micro-lezioni da slide e voce

Slide piu' voce, senza avatar: nove minuti circa, cinquanta scene, sottotitoli,
marchio su ogni slide.

**Il metodo sta in [`MASTER.md`](MASTER.md)**, che e' il documento di
riferimento: contiene l'aritmetica, la pipeline, il vocabolario grafico, i
controlli, le trappole gia' pagate e tutto il codice. Questo README dice solo
come e' disposto qui dentro.

## Struttura

```
MASTER.md                     il metodo e il codice (documento portatile)
nuova-lezione.sh              impianta una lezione nuova dall'ultima fatta
progetti/m1-l1.8-ripasso/     la lezione di riferimento, con gli strumenti
```

Gli strumenti stanno **dentro** la cartella della lezione, non alla radice: e'
li' che li cercano `tagli.py`, `controlli.py` e gli altri, e `nuova-lezione.sh`
li copia da `progetti/m1-l*/` piu' recente.

```
progetti/<lezione>/
  origine/                script di partenza
  copione/costruisci.py   i blocchi del parlato          ⟵ si riscrive ogni volta
  audio/tagli.py          pause, allineamento DTW, ritaglio
  audio/verifica*.py      trascrizione contro copione, durate
  verifica-locale.py      il controllo statistico sui confini
  slide/layout.mjs        temi, marchio, corpi di testo
  slide/grafica.mjs       i 13 tipi grafici, icone, fregi, colori
  slide/contenuti.mjs     le 50 scene                    ⟵ si riscrive ogni volta
  slide/cards.mjs         i PNG · slide/clips.mjs  le clip
  monta-scene.py          il payload delle scene
  monta-locale.py         il montato di controllo e l'SRT
  controlli.py            gli otto controlli finali
```

## Che cosa manca per poter renderizzare

Due cose binarie, che il MASTER non puo' portare con se':

- `progetti/<lezione>/slide/marchio/logo-rifilato.png`
- `progetti/<lezione>/slide/font/` — Inter, Source Serif 4 e
  `font-incorporati.css`

Finche' non ci sono, `node slide/cards.mjs` non produce le slide giuste. Le due
cartelle portano un `MANCA.md` che lo ricorda.

Servono inoltre `python3` con `imageio_ffmpeg`, e `node` 22 con `playwright` e
Chromium (MASTER §0).

## Una lezione nuova

```bash
./nuova-lezione.sh m1-l2.1-nome
```

Copia dall'ultima lezione tutto quello che non cambia e lascia da scrivere due
soli file: `copione/costruisci.py` e `slide/contenuti.mjs`. Poi si segue la
pipeline del MASTER §3, e non si va avanti finche'
`python3 copione/costruisci.py` non dice `OK, nessun errore`.

## Come si lavora

- Il branch principale e' `main`.
- Ogni modifica in un branch dedicato, poi pull request su `main`.
- I derivati (mp3, PNG, clip, montato, `blocchi.json`) restano fuori dal repo:
  li rigenerano gli script.
