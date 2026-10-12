# Istruzioni per scrivere una lezione (copione e scene)

Repository: `/home/user/Prove`. Corso video CISL FP Padova Rovigo per il concorso
infermieri di Azienda Zero (Veneto). Ogni lezione è una cartella
`progetti/mNN-lN.M-nome/` già preparata con `nuova-lezione.sh`: strumenti, tema,
caratteri e marchio ci sono già. **Mancano due file**, che scrivi tu:

1. `copione/costruisci.py` — solo le due liste in testa, `BLOCCHI` e `CAPITOLI`
   (il resto del file è già lì, copiato dalla 14.7: non toccarlo);
2. `slide/contenuti.mjs` — le 50 scene.

Più l'inizio del `REGISTRO.md`.

## Da leggere prima di scrivere

- lo script del committente: `origine/script-N.M.md`. È **l'unica fonte dei
  contenuti**: non si inventano dati, numeri, norme, farmaci, dosi. Si può
  aggiungere solo il *come* (un collegamento a una lezione già fatta del corso,
  una conseguenza esplicita di ciò che lo script dice), mai fatti nuovi;
- `metodo/MASTER-PORTATILE.md`: §2 (l'aritmetica), §4 «Passo 1 — Riscrivere
  il copione», §5 (il vocabolario grafico) e la tabella del §7 (le trappole);
- due lezioni fatte, come modello di tono, densità e formato, entrambe con lo
  script di partenza accanto: `progetti/m14-l14.2-cardiocircolatorio/` e
  `progetti/m13-l13.5-non-autosufficienza/` (`origine/`, `copione/costruisci.py`,
  `slide/contenuti.mjs`, `REGISTRO.md`);
- i tipi di scena disponibili e i loro campi: `slide/layout.mjs`,
  `slide/grafica.mjs`, `slide/figure.mjs`, `slide/clinica.mjs` della lezione.
  **Usa solo tipi e campi che esistono**: se un tipo non c'è, non inventarlo.

## Il copione (`copione/costruisci.py`)

- **48 blocchi** (s02…s49): con la copertina s01 e la chiusura s50 fanno le 50
  scene, il tetto del servizio di montaggio;
- **caratteri totali fra 8.400 e 9.000** (il video deve durare **almeno 8
  minuti**: lo script dice ~1.400 parole); ogni blocco **al massimo 225
  caratteri**, media ~180; un blocco = un concetto, quello che sta sopra una
  sola inquadratura;
- i capitoli (`CAPITOLI`) seguono le slide dello script, nello stesso ordine;
- testo parlato: **niente vocali accentate** (si scrive `e'`, `perche'`,
  `piu'`); **numeri in lettere** come nelle lezioni modello («trentanove gradi»,
  «otto su dieci», «lezione dieci punto due»); le sigle come nelle lezioni
  modello; **5 o 6 tag di intenzione in tutto** (`[warm]` in apertura e in
  chiusura, `[serious]`, `[thoughtful]`, `[curious]` alle svolte vere), niente
  `<break>`;
- lo script del committente si **riscrive** per l'ascolto: frasi brevi, una
  idea per blocco, il grassetto dello script diventa enfasi di costruzione, non
  asterischi. Tutto quello che lo script dice nella VOCE deve esserci;
  l'«A schermo» va nelle scene;
- lancia `python3 copione/costruisci.py` dalla cartella della lezione: deve
  finire senza errori. Stampa lo stacco fra le due tracce: **scrivi lo stesso
  id nella costante `STACCO` di `audio/tagli.py`** e rilancia finché non dà
  errori.

## Le scene (`slide/contenuti.mjs`)

- 50 scene, id s01…s50, una per blocco (s02…s49) più copertina (s01) e
  chiusura (s50), nello stesso formato della 14.2 (`export const SCENE = [...]`);
- **s01**: copertina, `modulo:"Modulo N · titolo del modulo"` come nella 14.2,
  titolo della lezione, sottotitolo dallo script; **s50**: copertina di
  chiusura sul tema `profondo` con la prossima lezione (per le lezioni N.12 il
  prossimo modulo, come dice lo script);
- un titolo di copertina va **al massimo su due righe** (un solo `<br>`);
- circa **30 scene su 50 con una figura** (tabella, percorso, griglia, catena,
  raggiera, corpo, scala, misura, ...), le altre di respiro (frase, citazione,
  numero grande). Per i casi clinici funzionano bene: il **percorso** per
  l'evoluzione nel tempo (tappa che si accende), la **tabella** per errori e
  risposta modello, la **griglia** per gli interventi, i parametri come numeri
  grandi;
- testi di scena **con** gli accenti (le slide si leggono, non si ascoltano);
- ogni scena deve dire la stessa cosa del suo blocco di voce, non un'altra.

Poi, dalla cartella della lezione:

```
node slide/cards.mjs        # 50 PNG in slide/png/: deve dire «nessuna slide sfora la cornice»
```

e **guarda i PNG**: un foglio di provini per volta, per esempio

```
python3 -c "import imageio_ffmpeg,subprocess;FF=imageio_ffmpeg.get_ffmpeg_exe();subprocess.run([FF,'-y','-v','error','-pattern_type','glob','-i','slide/png/s*.png','-vf','scale=480:-1,tile=5x10:padding=4','-frames:v','1','/tmp/claude-0/provino-N.M.png'])"
```

e aprilo con lo strumento di lettura delle immagini (ingrandisci le singole
slide dubbie leggendo `slide/png/sNN.png`). Correggi testi troppo lunghi,
sovrapposizioni, figure vuote o con `undefined`, finché le 50 slide sono
pulite.

## Il registro (`REGISTRO.md`)

Come quello della 14.2: titolo, un paragrafo che riassume la lezione, la scheda
parametri (voce GianP — News Info and Documentary, `eleven_v3`; slide dello
script; 50 scene; 48 blocchi; caratteri; stima), «La resa: *in corso*», e la
sezione finale **«## Da verificare»**: lì scrivi, uno per riga, i dubbi sul
contenuto dello script (un dato che ti sembra sbagliato o in contrasto con
altre lezioni del corso: **non correggerlo da solo**, segnalalo) e le scelte
fatte.

## Che cosa NON fare

- non generare voce, non chiamare servizi esterni, non caricare niente;
- non fare commit né push (li fa chi ti ha dato il lavoro);
- non toccare altre lezioni né gli strumenti condivisi.

## Che cosa riportare alla fine

Per ogni lezione, in poche righe: caratteri totali e stima di durata dati da
`costruisci.py`, lo stacco, l'esito di `cards.mjs`, e i dubbi messi in «Da
verificare».
