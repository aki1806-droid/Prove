# Standard di produzione — corso «Scrivere per farsi leggere»

Istanza di `MASTER.md` per il terzo corso di Achille Pagliaro. Vale quello che
sta in `MASTER.md`; qui ci sono i valori delle variabili e le cose che in
questo corso sono diverse da LNV (`LNV_STANDARD-PRODUZIONE.md`).

**Otto moduli, quaranta lezioni, dieci minuti l'una.** Sono arrivati gli
script dei primi cinque: le venticinque lezioni sono prodotte, una per una,
nei registri `registri/sfl-N-M.md` e, per modulo, in
`registri/sfl-modulo-N.md`. I moduli 6–8 aspettano i loro script.

---

## 1. Scheda parametri

```
TEMA
  corso             Scrivere per farsi leggere
  moduli            8 × 5 lezioni = 40   (prodotti: 1–5)
  etichetta         "Modulo N · Lezione N.M"
  a chi parla       seconda persona singolare
  registro          asciutto e pratico. Gli errori si dicono senza
                    accusare nessuno, come chiedono le note degli script

COLORI                                    (identici a «La Parola Giusta»)
  fondo chiaro      #F7F3EA
  testo             #12294A
  accento           #C39A4E
  fondo tenue       #E2D2B0               slide «Da evitare»
  fondo profondo    #0B1B33               memo, testo in accento
  font              Cormorant Garamond e Jost

DURATA
  obiettivo         10:00   (misurato: 9:58–9:59, una sola a 10:04)
  copertina         3 s
  chiusura          10 s
  parlato           587 s

VOCE
  voce              «Achille nuovo 1»  9b851842ce54449fb9ff501751ca0271
  strada            HeyGen create_speech, engine "elevenlabs", eleven_v4
  velocita'         1,12× in post (ATEMPO=1.12)
  avatar            NESSUNO
```

## 2. La voce: perché HeyGen, e come

Achille ha scelto **la strada HeyGen** per questo corso, con la voce nuova
«Achille nuovo 1». Non è il TTS di HeyGen — `heygen_voice`, `starfish`, `orca`
restano esclusi —: è ElevenLabs `eleven_v4` fatturato da HeyGen.

La chiamata, sempre la stessa:

```
create_speech  voiceId 9b851842ce54449fb9ff501751ca0271
               engine "elevenlabs", settings {"model_id": "eleven_v4"}
               language "it", forceRegenerate true
```

**Il testo che si manda.** ASCII con gli accenti scritti come apostrofo
(`perche'`, `e'`, `piu'`), niente virgolette doppie, niente `<` o `[` salvo il
tag di pausa. Fra un blocco e l'altro `<break time="1.6s"/>`: è il confine che
`confini_heygen.py` ritrova da solo.

**Cinque tracce** per lezione: A `s02`–`s10`, B `s11`–`s20`, C `s21`–`s30`,
D `s31`–`s40`, E `s41`–`s49`, ognuna sotto i 2.900 caratteri (il timeout sta
fra 3.097 e 3.401). Le scrive `script/sfl/tracce.py`, che avvisa se una è
troppo lunga. Le cinque chiamate partono insieme.

**Il costo misurato: 29–34 crediti HeyGen di voce a lezione**, più uno di
render. Il saldo si legge con `get_current_user` prima e dopo la voce; quando
fra le due letture c'è anche un render, il registro lo dice. Un'eccezione
sola: ~63 crediti fra due letture intorno alla 3.1, senza spiegazione. **Le
venticinque lezioni dei moduli 1–5 sono costate 809 crediti** in tutto, voce
e render (6.804 → 5.995): circa 32 a lezione.

**Confini: 1.073 su 1.075 al primo colpo**, senza trascrizione. Gli altri due
(3.5 e 4.4) erano pause vere di 1,01–1,02 s, sotto la soglia di 1,1:
ritrovati abbassando la soglia a 1,0 solo per quella traccia.

**L'`atempo` resta 1,12.** Il 1,16 di `CLAUDE.md` vale per Luca Ward passato
da HeyGen; «Achille nuovo 1» è un'altra voce, e a 1,12 il parlato chiude i
587 s con i caratteri qui sotto. Le due voci non si mescolano.

## 3. L'aritmetica dei dieci minuti

```
T_parlato  = 600 − 3 − 10            = 587 s
BLOCCHI    = 48 (s02–s49), una ripresa fra questi
CARATTERI  ≈ 9.850–10.000            misurato, non stimato
caratteri per blocco                 ≈ 205
```

A 1,12× la voce tagliata va da **534 a 573 s**; il resto fino a 587 lo fanno
le **pose** di `pose.py` (da 18 a 53 s), cioè il tempo minimo di lettura
delle slide. Più slide dense ci sono — elenchi, schermate F — più pose servono
e meno caratteri ci stanno: la 5.3, con 9.801 caratteri e 53 s di pose, è
arrivata a 587 esatti come la 1.3, che con 10.293 caratteri e 18 s di pose ha
sforato di quattro secondi (10:04). **Sopra i 10.000 caratteri si esce.**

**Gli script arrivano a 4.000–5.200 caratteri di parlato**: vanno riscritti a
poco più del doppio. **La prima stesura esce corta** — fra 8.400 e 9.100
caratteri nel modulo 5 — e si allunga prima di generare la voce: una lista di
coppie (fine di un blocco, aggiunta), ognuna controllata perché compaia una
volta sola nel file. Un'aggiunta non apre mai un blocco con un gerundio o una
congiunzione che continua quello prima: dopo 1,6 s di pausa non regge.

## 4. Niente avatar

Come LNV. Gli script del corso hanno sei tipi di schermata; senza avatar la
mappatura è questa:

| nello script | qui |
|---|---|
| **A** avatar | slide a piena inquadratura — frase o elenco, una per concetto |
| **B** avatar + slide | quella slide, **ferma per tutta la scena** (`statica`) |
| **C** slide | slide a elenco, una voce accesa alla volta |
| **D** videoclip | la ripresa della lezione, a pieno schermo |
| **E** memo | memo su fondo profondo |
| **F** prima/dopo | layout `pd` (`prima_dopo.mjs`), ferma per tutta la scena |

## 5. La schermata F

È la schermata propria di questo corso: un testo da evitare e la sua
riscrittura. **Il parlato non legge mai il testo a schermo: lo commenta.**
La prima slide della scena entra con l'animazione, le altre sono
`statica: true`, così la schermata non si ricompone a ogni blocco.

`prima_dopo.mjs` ha quattro forme, una per tipo di testo:

| forma | dove | com'è |
|---|---|---|
| `testo` (predefinita) | moduli 1–4 | sopra la versione da evitare, in grigio e più piccola; sotto quella riscritta, in blu |
| `colonne` | 3.2 | le due versioni affiancate, quando sono strutture e non frasi |
| `mail` | 3.1, modulo 4 | una finta casella di posta: campi (A, Cc, Oggetto) in alto, un filetto, il corpo sotto |
| `chat` | modulo 5 | due conversazioni affiancate, bolle sobrie: ricevuti in panna, inviati in blu, nessuna app riconoscibile |

Nel testo, `<u>…</u>` sottolinea in oro il punto da guardare, e
`<i>(…)</i>` indica un messaggio che non si riporta (il messaggio lungo della
5.2). Con la forma `chat` le conversazioni stanno **affiancate**, e la voce
dice «a sinistra e a destra», mai «qui sopra». Con **`largo: true`** la
colonna di destra si allarga: serve quando a sinistra c'è solo una nota e a
destra un messaggio lungo da leggere riga per riga, come il modello da
copiare della 5.5. `mostra: 'prima'` tiene la riscrittura nascosta ma al suo
posto, così il quadro non salta quando compare.

## 6. Le altre slide

- **Memo** su fondo profondo, in corsivo: righe di 35 caratteri al massimo, e
  nel corsivo niente «'è» o «’è» («È» maiuscola va bene). Lo controllano due
  `assert` in coda a ogni `slides.py`. La voce del memo è la sua frase, e
  basta: la slide resta a schermo il tempo minimo di lettura, e a volte quel
  tempo si sente come due o tre secondi di silenzio (4.5, 5.4). È voluto.
- **«Da evitare»** su oro tenue: l'elenco intero, poi una voce accesa alla
  volta con una nota sotto.
- **«La prova di oggi»** in due slide, l'ultima annuncia la lezione dopo.
- **La chiusura** è `La Parola Giusta`; l'ultima lezione di ogni modulo chiude
  con «Fine del Modulo N» e il titolo del modulo dopo.

## 7. La ripresa

**Una per lezione**, al punto in cui lo script mette la scena D: un'immagine
ferma a pieno schermo, generata su ElevenLabs con Nano Banana 2 e lo stesso
suffisso di stile, caricata su HeyGen e montata come scena `image`. Nessuna
persona riconoscibile, nessun marchio, **nessuna scritta leggibile**: dove la
generazione ne lascia una (il logo di posta della 1.1, il nome del servizio
della 4.1, i fogli della 2.2) si sfoca in post. Le riprese di un modulo si
generano insieme e si registrano in `riprese_mN.json`; `media.py` le scrive
nel `media.json` della lezione.

## 8. La catena, per una lezione

Gli strumenti del corso sono in `script/sfl/`, quelli comuni in `script/`.

1. `blocchi.py` — i 48 blocchi a mano, la ripresa segnata; stampa caratteri
   e media. Si allunga finché non sta fra 9.850 e 10.000.
2. `sfl/tracce.py 2-10,11-20,21-30,31-40,41-49` — le cinque tracce.
3. Cinque `create_speech` in parallelo; `sfl/dl.sh` scarica ognuna.
4. `confini_heygen.py .` e `ATEMPO=1.12 tagli.py applica .` — confini e tagli.
5. `slides.py`, poi `sfl/fase1.sh <lezione> 587` — slide, pose, tagli con le
   pose, immagini; `sfl/foglio.sh` fa i fogli di contatto, **che si guardano
   tutti** prima di andare avanti.
6. `sfl/media.py N.M sXX`, `sfl/clip.sh` — le 49 clip animate.
7. `fa_batch.py`, `create_asset_upload_batch`, `carica.py`,
   `complete_asset_batch`; si aspetta che i 97 file risultino completati.
8. `scene.py 2 49` e `create_video_from_studio`, 16:9, 1080p.
9. `sfl/verifica.sh` — scarica, cerca i silenzi oltre 2,5 s, monta dodici
   fotogrammi; si guardano quelli, la ripresa e la schermata F a piena
   risoluzione. L'istante di un blocco è 3 s di copertina più la somma di
   `durate.json` dei blocchi prima: `pose.json` tiene solo il supplemento di
   posa, e chi ci fa il conto cade sulla slide sbagliata.
10. `sfl/archivia.py` — copioni in `copioni/sfl-N-M-*.json` e registro in
    `registri/sfl-N-M.md`, dalle note scritte a mano più i numeri misurati.

## 9. Lo stato della produzione

| modulo | titolo | lezioni | durata | registro |
|---|---|---|---|---|
| 1 | Perché non ti leggono | 1.1–1.5 | 49:58 | `sfl-modulo-1.md` |
| 2 | La frase | 2.1–2.5 | 49:53 | `sfl-modulo-2.md` |
| 3 | La struttura | 3.1–3.5 | 49:54 | `sfl-modulo-3.md` |
| 4 | La mail | 4.1–4.5 | 49:54 | `sfl-modulo-4.md` |
| 5 | Il messaggio breve | 5.1–5.5 | 49:53 | `sfl-modulo-5.md` |
| 6 | Scrivere quando è difficile | — | — | script non ancora arrivato |
| 7–8 | — | — | — | script non ancora arrivati |

**Quattro ore, nove minuti e trentadue secondi** in venticinque lezioni,
1.175 slide, 42 schermate F, venticinque riprese; 248.033 caratteri di
copione.
