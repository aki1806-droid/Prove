# Registro — 6.3 «Perché non significa bugia»

**È la lezione decisiva del corso.** Lo script la segna così in testa: è il
punto in cui il corso dichiara, dentro il prodotto, quello che la pagina
*Metodo e fonti* promette fuori. Registro asciutto, nessuna formulazione
alleggerita.

La domanda è quella che molti si portano dietro da quando hanno comprato il
corso: se dice una cosa e il corpo ne dice un'altra, non sta mentendo? **No.**
E la risposta è no in un senso preciso — quello che hai visto non ti
autorizza a quella conclusione — per tre ragioni che la lezione mette in
fila una dopo l'altra.

**Le cause ordinarie sono sette**, e nessuna ha bisogno di un inganno per
funzionare: prova due cose insieme, è cortese, controlla l'espressione per
mestiere, è stanca, sta pensando ad altro, non è d'accordo e non lo dice, ha
appena ricevuto una notizia. La menzogna, se la aggiungiamo, è l'ottava — e
la meno frequente. **Poi c'è la frequenza di base**: le incongruenze sono
frequentissime, le menzogne rilevanti sono rare, quindi quasi tutti gli
allarmi riguarderanno persone stanche, ambivalenti, educate o distratte.
**Poi c'è la ricerca**, detta con i nomi e con gli anni: DePaulo e colleghi
2003, nessun indicatore non verbale affidabile; Bond e DePaulo 2006,
accuratezza poco sopra il caso e **nessun vantaggio per i professionisti
addestrati**.

E il danno non è distribuito a caso: chi è in soggezione, chi è stanco, chi
sta male e non lo dice, chi parla una lingua che non è la sua, chi ha una
condizione che altera i segnali. Nessuno di loro sta mentendo, e tutti
risultano sospetti a chi crede di saper leggere.

| campo | valore |
|---|---|
| video_id | `aac1db4f5e62111765e4996b61f76a86` |
| scene | 50 — copertina, 48 blocchi, chiusura |
| formato | 16:9, 1080p |
| durata | 598,9 s (9:59) — misurata sul montato |
| parlato | 587,2 s (538,2 s di voce tagliata + 49,0 s di pose) |
| voce | Luca Ward `tVdVcJPudubxmTmAw4tE`, `eleven_v4`, 1,12× in post |
| flow ElevenLabs | `YeBMHdmrhKGkA5vhprlg` |
| tracce | A `KnHsKhQ6Bgh6ysxImkWE` · B `rKfV0SDmfrrA1oGsjmfu` · C `z4ht4CF3UFntd7noMWin` |
| batch HeyGen | `c88a09c2f05a4dabb4bbb065c1394bc9`, 95 file |

## Qui il vincolo del modulo funziona al contrario

Nelle altre quattro lezioni del modulo la parola «menzogna» non compare
mai, e un controllo automatico lo verifica. **Qui deve comparire**, perché
la lezione esiste per negare che l'incongruenza la riveli. Il controllo è
stato quindi rovesciato: `blocchi.py` elenca i **nove** blocchi in cui la
radice compare — `s03`, `s11`, `s13`, `s14`, `s19`, `s22`, `s33`, `s34`,
`s45` — e verifica che ciascuno la neghi, la metta in fila con le altre
cause o ne dica la rarità. Lo stesso controllo gira su `slides.py`.

Due inciampi del controllo, tutti e due risolti e tutti e due istruttivi:
la ricerca di `ment` prendeva dentro *strumento*, *momento* e *leggermente*,
e la ricerca di `mente` prendeva *in mente* — l'espressione idiomatica, non
il verbo. La regola che ne esce vale per qualunque filtro su questo tema:
**la radice va cercata con i confini di parola**, e `in mente` va escluso a
mano.

## Le note dello script

**Le scene 3, 6, 10 e 11 non si tagliano in nessun caso.** Sono le quattro
che reggono l'argomento, e nel copione occupano `s06`–`s12` (le sette cause,
una per blocco), `s18`–`s21` (la frequenza di base), `s29`–`s33` (chi ci
rimette) e `s34`–`s37` (perché la pagina del sito lo dice). Nessuna è stata
accorciata.

**Le fonti della scena 8 si dicono a voce con gli anni**, e così è: la
rassegna del duemilatré con i suoi centocinquantotto segnali, la
meta-analisi del duemilasei con i suoi trecento studi.

**Nessun aneddoto.**

## Il copione, e perché è più corto degli altri

Da **4.022** caratteri di parlato nello script a **9.887**, media 206 per
blocco — contro i 10.200 e i 212 delle altre lezioni. Non è una svista.

Lo script chiede **0,92× invece di 0,95×**: questa lezione va più lenta
delle altre. La catena di montaggio ha un solo `atempo` fisso (1,12) in
`tagli.py`, uguale per tutte e ventisette le lezioni, e cambiarlo per una
sola vorrebbe dire toccare lo script condiviso. **Il rallentamento si
ottiene scrivendo meno**: a parità di durata, 3% di caratteri in meno sono
3% di parlato in meno e altrettanto silenzio in più. Le pose passano infatti
da 42,0 s della 6.2 a **49,0 s**, le più lunghe del corso.

Quello che il copione aggiunge:

- **perché la risposta è no in un senso preciso** (`s03`): non è prudenza e
  non è una formula per non prendersi responsabilità;
- **che la settima causa è la più ingiusta** (`s12`): chi ha ricevuto una
  notizia dieci minuti prima non sa nemmeno di essere valutato, e paga due
  volte;
- **che cosa succede quando si ha uno strumento nuovo** (`s15`): le otto
  cause diventano una, e l'unica cosa cambiata è che adesso vuoi che lo
  strumento serva a qualcosa;
- **dove un corso fa davvero danno** (`s16`): non quando sbaglia una
  definizione, ma quando lascia qualcuno **convinto**, non incerto;
- **che «nessun vantaggio» è la parte che conta** (`s26`): non vuol dire che
  serva più allenamento, vuol dire che l'allenamento non produce il
  risultato che promette;
- **perché dirlo «prudenza» sarebbe comodo e falso** (`s35`): farebbe
  sembrare che la competenza ci sia e che si scelga di non insegnarla;
- **chi paga** (`s37`): non chi ha fatto il corso, ma chi gli si siede
  davanti, che non ha scelto niente e non sa con che criterio viene
  guardato;
- **che cos'è un segnalibro** (`s40`–`s41`): non dice «in questa
  conversazione», dice «in questo punto». È molto meno di quello che
  speravi e molto più di una sensazione senza indirizzo.

## Le grafiche

Quarantasette slide, di cui **tre con un disegno o un'infografica** e
**nessuna ciclica**:

| slide | tipo | cosa mostra |
|---|---|---|
| `c15` | imbuto | quattro cause ordinarie che diventano una causa sola |
| `c20` | confronto | su cento conversazioni: incongruenze e menzogne rilevanti |
| `c24` | confronto | le due fonti per intero, con anni, numeri e risultato |

**La lista delle sette cause è la più lunga del corso: sette righe**, e
regge benissimo — prima d'ora il massimo usato era sei. Compare otto volte
di fila (`c05` per intero, poi `c06`–`c12` con una riga accesa alla volta),
e ogni passaggio porta in nota l'esempio che la voce sta dicendo.

Una sola correzione: la didascalia di `c15` andava su due righe. Accorciata,
perché la didascalia di una figura sta in una riga sola.

## I tagli: la banda non vedeva niente, e un confine era sbagliato

Quarantacinque confini, tutti dentro un silenzio. **`banda.py` non segnalava
niente**, e la trascrizione ha trovato **un confine sbagliato**: `s20` si
fermava prima di «quasi tutti», e la frase finiva nel blocco dopo.

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

È il caso che la 5.2 aveva insegnato a temere, in forma minima: **una banda
pulita non è una prova**. Qui è costato un confine; nella 5.2 ne costava
cinque.

| blocco | prima | dopo |
|---|---|---|
| `s20` | «non qualche allarme di troppo» | «allarme di troppo. Quasi tutti» |

`tagli.py correggi` l'ha sistemato al primo colpo (+0,73 s) e la clip di
controllo l'ha confermato subito: «Allarmarmi di troppo. Quasi tutti».

Delle altre quarantaquattro code, **dodici** sono state riascoltate a mano
per la ragione ormai nota: la finestra di 1,6 s taglia a metà la prima
parola e `scribe` la inventa — *ogni riunione* letto «opinione», *menzogna*
letta «sogna», *sensazione* letta «azione». In tutti e dodici i casi la coda
finiva dove doveva.

Costo: 1.001 crediti per `prova.mp3` e 12 per la clip di controllo — la
verifica più economica del corso, perché c'era un solo confine da
ricontrollare.

## Le riprese

Tre, `s17`, `s28` e `s38`, **tutte e tre viste**. Higgsfield ha rifiutato per
la sesta lezione di fila (tetto giornaliero del piano), quindi anche queste
sono state generate sul nodo ElevenLabs con **Nano Banana 2**, 406 crediti
l'una.

- **`s17`** — una fila di armadietti metallici chiusi in uno spogliatoio
  vuoto, luce al neon. Introduce il problema dei numeri, e gli armadietti
  chiusi sono tutte le cose che da fuori non si vedono;
- **`s28`** — una sedia sola davanti a una scrivania spoglia, luce fredda.
  Arriva su «e il danno non è distribuito a caso», ed è la sedia di chi
  viene valutato;
- **`s38`** — una porta aperta su un corridoio illuminato, vista da una
  stanza in penombra. Arriva su «allora cosa ne fai», e la porta aperta è
  la prossima domanda.

## Il montato è stato verificato scena per scena

`get_video_scenes`: **cinquanta scene**, le tre immagini esattamente alle
scene 17, 28 e 38 (cioè `s17`, `s28` e `s38`), **nessuna scena in `playback:
loop`** e tutte le altre in `freeze` con `volume: 0`. Copertina con la
traccia muta da 3 s, chiusura con quella da 10 s. 16:9, 1080p.

Durata finale **598,9 s**, come le ventisette che la precedono.
