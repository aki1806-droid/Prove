# Registro — 6.5 «Quando l'incongruenza sei tu»

Per quattro lezioni il modulo ha parlato delle incongruenze degli altri.
Questa parla delle tue, e lo script la mette alla fine per una ragione che il
copione rende esplicita: **è l'unico caso di tutto il corso in cui conosci la
causa.** Da fuori hai un segnale e otto cause possibili, e tre lezioni hanno
spiegato che non puoi scegliere fra loro. Da dentro hai la causa. È anche
l'unica metà del problema su cui puoi intervenire: gli altri non
diventeranno più leggibili perché tu hai fatto un corso, tu puoi diventare
meno ambiguo.

Il meccanismo che regge la lezione sta in una riga: **l'incongruenza non
comunica quello che nascondi, comunica che stai nascondendo.** Chi ti
ascolta non capisce che cosa c'è sotto — vale anche per lui, mentre guarda
te — ma percepisce che c'è qualcosa, e quella percezione non resta a
mezz'aria: la riempie con l'ipotesi peggiore che ha a disposizione, perché
se devi decidere come proteggerti sbagliare in eccesso costa meno che
sbagliare in difetto.

L'esempio è quello che chiunque riconosce: dici a un collaboratore che il
suo lavoro va bene mentre sei preoccupato per una scadenza tua. Lui la
spiega nell'unico modo in cui lo riguarda. **Non hai detto niente di falso,
e hai comunicato una cosa falsa** — e nessuno dei due lo saprà mai, perché
nessuno viene a chiedertelo.

Poi i tre modi di gestirla — **allinearsi, dichiararla, separarla** — e la
scoperta della lezione: la terza è quella che quasi nessuno usa ed è spesso
la più utile, perché è l'unica che funziona anche quando non puoi dire di
cosa si tratta. Le altre due chiedono di aprire qualcosa; questa chiede solo
di chiudere una porta che non c'entra.

| campo | valore |
|---|---|
| video_id | `32a6c2325425a7613998bc30f84fe0c3` |
| scene | 50 — copertina, 48 blocchi, chiusura di modulo |
| formato | 16:9, 1080p |
| durata | 598,8 s (9:59) — misurata sul montato |
| parlato | 587,0 s (550,5 s di voce tagliata + 36,6 s di pose) |
| voce | Luca Ward `tVdVcJPudubxmTmAw4tE`, `eleven_v4`, 1,12× in post |
| flow ElevenLabs | `nC0WdLS0rHTAvlbSka0X` |
| tracce | A `FSZEjcylMXNpbqXrMitk` · B `hft5dvNoNM2z8fHuRSud` · C `zJPLiNGmPosf8NROadc7` |
| batch HeyGen | `5ffe2da8e82f4f1d8bfd0eac1a3be7d7`, 96 file |

## Il vincolo del modulo: il filtro si allarga, e una frase si riscrive

Lo script della scena 6 chiude l'esempio così: «Tu non hai mentito. E hai
comunicato una cosa falsa.» Il paradosso è il centro della scena e non si
tocca; la **formulazione** però usa la radice che il modulo vieta, e per di
più in una forma — il participio `mentito` — che il filtro della 6.4 non
prendeva: `\bment(e|ono|endo|ire)\b` non copre `mentit`.

Due interventi, tutti e due necessari:

- **il filtro si allarga**, e adesso copre `menzogn`, `bugi`, `mentit` e le
  voci verbali, con le due eccezioni idiomatiche del corso (`in mente`,
  `nella mente`). Un filtro che non prendeva il participio avrebbe lasciato
  passare la frase in silenzio, che è peggio di non avere il filtro;
- **la frase si riscrive**: `s17` dice «**Non hai detto niente di falso. E
  hai comunicato una cosa falsa.**» Il paradosso resta intero — anzi, la
  simmetria *falso / falso* lo rende più netto — e non serve nessuna
  eccezione.

È la terza forma che il vincolo prende nel modulo: silenziosa nella 6.1,
6.2 e 6.4, rovesciata nella 6.3, e qui silenziosa ma con il filtro più largo
di tutti.

## Le note dello script

**«La scena 12 impedisce che la lezione diventi un obbligo di trasparenza:
non tagliarla.»** Occupa `s35`–`s38`, quattro blocchi interi e quattro
slide. Il copione le dà anche l'unica frase dichiarativa del corso su questo
punto — «Questa non è una lezione sul dire tutto» — e in `s38` aggiunge la
parte che lo script lascia implicita: **«non posso dirti altro» è
legittimo**, e quasi nessuno sa di poterlo dire.

**«La scena 11 è la frase che gli studenti proveranno per prima.»** Stesso
trattamento della 6.4: la slide resta a schermo per tutta la scena —
`c30`–`c34`, titolo identico, cambia solo l'occhiello. Lo stesso
accorgimento è usato per la frase della scena 9 su tre schermate
(`c25`–`c27`).

**Nessun aneddoto.** Rispettato.

## Il copione

Da **3.854** caratteri di parlato nello script a **10.368**, media 216 per
blocco, in cima alla banda ma dentro. Lo script chiede 0,95×, il passo
normale del corso. Pose **36,6 s**.

Quello che il copione aggiunge:

- **perché la lezione sta alla fine** (`s03`): le quattro precedenti
  insegnano quanto poco si può concludere da fuori, e quella cautela è
  quello che rende utilizzabile questa, invece di farne un esercizio di
  sincerità;
- **che è l'unico caso in cui conosci la causa** (`s04`): da fuori un
  segnale e otto cause, da dentro la causa e nessun bisogno di indovinarla;
- **che cosa puoi cambiare davvero** (`s05`): la metà del problema su cui
  puoi intervenire;
- **perché il corpo ne produce** (`s06`): non ha un modo per dire due cose
  insieme in modo ordinato, e ne dice una con la faccia e una con la voce;
- **che sei dall'altra parte dello stesso problema** (`s09`): chi ti ascolta
  ha il tuo identico handicap, e farà quello che faresti tu — indovinerà;
- **perché il vuoto va riempito** (`s13`): nessuno regge a lungo l'idea che
  una conversazione abbia un pezzo mancante;
- **perché l'ipotesi è la peggiore** (`s14`): non per cattiveria, per
  asimmetria del costo dell'errore;
- **quanto dura il danno** (`s18`): due settimane di lavoro su un giudizio
  mai dato, e il malinteso resta in piedi perché verificarlo è scomodo per
  tutti e due;
- **in che ordine stanno le tre mosse** (`s20`): in ordine di quanto
  chiedono a te, e **in ordine inverso di quanto spesso si possono usare**;
- **che cosa fa ciascuna delle due informazioni** (`s27`): la prima conferma
  che ha visto bene e gli evita di dubitare dei propri occhi, la seconda gli
  dice che non lo riguarda;
- **il conto** (`s28`): tre secondi e un po' di imbarazzo contro due
  settimane di ipotesi sbagliata, che non costano niente a te e tutto a lui;
- **perché un sì con l'esitazione dentro torna indietro** (`s33`): dopo tre
  giorni, sotto forma di ripensamento, e a quel punto costa a tutti e due
  più di quanto costava dirlo subito;
- **che cos'è l'onestà qui** (`s34`): non raccontare tutto, ma non far
  lavorare l'altro su un segnale che sai di stargli dando e che sai non
  essere leggibile;
- **perché fingere mette l'altro in una posizione impossibile** (`s41`): se
  crede a te impara a non fidarsi di quello che vede, se crede ai propri
  occhi impara a non fidarsi di quello che dici;
- **che tacere e dirlo lascia tutto in piedi** (`s42`): tre informazioni
  vere, e nessuna delle tre lo mette in difficoltà.

## Le grafiche

Quarantotto slide, di cui **tre con un'infografica** e **nessuna ciclica**:

| slide | tipo | cosa mostra |
|---|---|---|
| `c17` | confronto | lo stesso scambio dai due lati: quello che hai detto / quello che è arrivato |
| `c20` | pila | le tre mosse impilate per quanto chiedono a te |
| `c41` | confronto | se crede a te / se crede ai propri occhi, e che cosa impara |

Le liste ripetute sono due: i tre modi (`c21`–`c23`) e i quattro errori
(`c43`–`c46`). Due memo, due frasi tenute a schermo per tutta la scena.

**Due correzioni**, tutte e due dal foglio di contatto:

- la frase di `c25`–`c27` andava su tre righe: «Scusa, oggi sono di cattivo
  umore per una cosa mia» si spezzava dopo «cosa». Accorciata in «**Sono di
  cattivo umore per una cosa mia**», che sta in una riga; la voce dice la
  frase per intero, con lo «Scusa» davanti;
- la seconda riga del confronto `c41` diceva «Che cosa resta — Niente /
  Niente», che si legge male. Riscritta in «**E tu che cosa ottieni**»:
  qualunque cosa scelga, tu non ottieni niente.

**Il memo della scena 15 è stato riscritto per un motivo tipografico.** Lo
script dice «Non devi dire cos'è. Devi dire che c'è, e che non è lui.»: nel
corsivo del layout `memo` la sequenza apostrofo-è collide, e **tutte e due
le righe ne hanno una**. La slide dice «Non devi spiegare. Devi solo dire
che non è lui.»; la voce dice la frase dello script.

## I tagli: un confine sbagliato, e la banda ha indicato la coppia

Quarantacinque confini. `banda.py` ne segnalava **due** (`s44` troppo lungo
di 2,59 s, `s45` troppo corto di 1,70 s): la firma classica di un confine
spostato, che allunga un blocco e accorcia il vicino. La trascrizione ha
confermato che il colpevole era **`s44`**, e che `s45` era solo la vittima.

| | segnalati da `banda.py` | sbagliati davvero |
|---|---|---|
| 5.1 | 1 | 1 |
| 5.2 | 3 | 7 |
| 5.3 | 4 | 8 |
| 5.4 | 0 | **0** |
| 5.5 | 2 | 3 |
| 6.1 | 1 | 1 |
| 6.2 | 4 | 8 |
| 6.3 | **0** | 1 |
| 6.4 | 3 | 2 |
| 6.5 | 2 | 1 |

| blocco | prima | dopo |
|---|---|---|
| `s44` | «secondo portato all'estremo» | «senza che nessuno dei due l'abbia deciso» |

`tagli.py correggi` l'ha sistemato al primo colpo (155,47 → 152,32, −2,79 s)
e la clip di controllo l'ha confermato parola per parola: «Senza che nessuno
dei due l'abbia deciso». Dopo lo spostamento `banda.py banda` non segnala
più niente e tutti e quarantacinque i confini stanno dentro un silenzio —
quello di `s44` è il più corto della lezione, 0,27 s, ma è un silenzio vero
e il controllo grosso lo accetta.

Delle altre quarantaquattro code, **cinque** sono state riascoltate a mano
per la ragione nota — la finestra di 1,6 s taglia a metà la prima parola e
`scribe` la inventa: *modulo* letto «ulo», *duraturo* letto «Naturale»,
*propri* letto «Gli». Due code sono tornate **più corte di tre parole**
(`s09` «Indovinerà.» e `s19` «Stai nascondendo.»): in tutti e due i casi le
parole restituite sono le ultime del blocco, e il confine è giusto.

Costo: 1.001 crediti per `prova.mp3` e 12 per la clip di controllo.

## Le riprese

Due, `s10` e `s29`, **viste tutte e due**. Higgsfield ha rifiutato per
l'**ottava lezione di fila** (tetto giornaliero del piano), quindi anche
queste sono nate sul nodo ElevenLabs con **Nano Banana 2**, 406 crediti
l'una.

- **`s10`** — uno specchio appeso nell'ingresso di casa con una giacca a un
  gancio accanto, luce bassa; nello specchio solo una scala e una porta,
  nessuna persona. Arriva su «e questo ha un costo che quasi nessuno
  calcola»: è il punto in cui la lezione gira verso di te;
- **`s29`** — una porta di ufficio socchiusa vista da un corridoio in
  penombra, la luce interna che cade sul pavimento. Arriva su «e la seconda
  forma è ancora più utile, perché si usa mentre parli»: la porta lasciata
  aperta è la dichiarazione fatta in tempo reale.

Nessuna persona, nessuna scritta leggibile, nessun marchio.

## Il montato è stato verificato scena per scena

`get_video_scenes`: **cinquanta scene**, le due immagini esattamente alle
scene 10 e 29 (cioè `s10` e `s29`), **nessuna scena in `playback: loop`** e
tutte le altre in `freeze` con `volume: 0`. Copertina con la traccia muta da
3 s, chiusura con quella da 10 s. 16:9, 1080p.

Durata finale **598,8 s**. **Con questa il modulo 6 è chiuso.**
