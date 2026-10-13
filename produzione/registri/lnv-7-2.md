# Registro — 7.2 «Il colloquio»

La lezione sensibile del modulo. Il colloquio è la situazione in cui le
tecniche di questo campo si usano di più e fanno più danni, perché l'errore
non resta un errore di lettura: **diventa una decisione su una persona**. Per
questo la lezione comincia con un divieto e non con una tecnica, e lo script
lo dice in testa: il vincolo del modulo va detto a voce, ed è la ragione per
cui questa lezione esiste in questa forma.

Il divieto: **il linguaggio non verbale non dice niente sulla competenza di
una persona.** Chi valuta un candidato dai segnali sta misurando quanto
quella persona gli assomiglia, e l'errore non è distribuito a caso: penalizza
chi è in soggezione, chi viene da un'altra cultura, chi ha una condizione che
altera i segnali, chi ha più bisogno del lavoro. L'unico uso legittimo
dell'osservazione è quello di tutto il corso — sapere dove fare la prossima
domanda — e la risposta, quella sì, si valuta.

Poi le due metà pratiche, tutte e due su quello che fai tu: **chi conduce**
può abbassare l'attivazione dell'altro (argomenti neutri, sedie ad angolo,
non fissare, tre secondi di pausa), e **chi risponde** ha quattro cose da
decidere — il picco è prima, le prime due frasi a memoria, mani libere, e lo
sguardo che stacca mentre pensa. Contro il consiglio più diffuso, quello di
guardare negli occhi mentre si risponde.

| campo | valore |
|---|---|
| video_id | `16142621aad7e1493baf94b03c530534` |
| scene | 50 — copertina, 48 blocchi, chiusura |
| formato | 16:9, 1080p |
| durata | 598,8 s (9:59) — misurata sul montato |
| parlato | 587,1 s (544,6 s di voce tagliata + 42,5 s di pose) |
| voce | Luca Ward `e4bd8d8a357f41a99502309874733c16` su HeyGen, `create_speech` con `engine: "elevenlabs"` e `eleven_v4`, 1,16× in post |
| tracce | cinque: A `s02`–`s08` · B `s09`–`s18` · C `s19`–`s29` · D `s30`–`s39` · E `s40`–`s49` |
| batch HeyGen | `e7de35e8db6d444dbeebec7c3d315346`, 96 file |
| costo | **30 crediti HeyGen** di voce + **1** di render |

## Il vincolo del modulo, detto a voce

**«Le scene 3 e 4 non si tagliano e non si attenuano: sono il motivo per cui
questa lezione può stare in un corso sul linguaggio non verbale.»** Nel
copione occupano nove blocchi interi, `s05`–`s13`, 116 s di montato:

- `s05` dice la frase dello script parola per parola, e la slide `c05` la
  tiene a schermo per intero, su tre righe;
- `s06`–`s07` danno la fonte **a voce, con l'anno**, come vuole lo standard
  dove si smonta un mito: la rassegna di De Pàulo e colleghi del 2003, la
  stessa della 2.4. La slide `c07` porta nome e anno nell'occhiello;
- `s08` fa il passo che la fonte non fa, e **lo dichiara come
  ragionamento**: se i segnali non reggono nemmeno per quello che una persona
  prova in quel momento, a maggior ragione non reggono per quello che saprà
  fare fra sei mesi. La rassegna è sui segnali di quello che le persone
  tengono per sé, non sulla competenza, e il copione non le attribuisce più
  di quello che ha trovato;
- `s09`–`s13` sono i quattro «penalizza» dello script, uno per blocco, e
  `s13` chiude con la parola che lo script lascia implicita: **è un errore che
  discrimina**.

Il vincolo torna nel primo dei quattro errori (`s43`), detto per tutte e due
le parti del tavolo: vale anche per il candidato che prova a capire dalla
faccia dell'altro come sta andando.

Il filtro del modulo 6 ha preso una parola: in `s33` «la mente stacca», dove
*mente* è il sostantivo. Il filtro non distingue, e la frase è stata
riscritta in «per pensare si stacca da tutto il resto».

## La voce: seconda lezione con HeyGen

**43 confini su 43 al primo colpo**, con la soglia nuova di 1,1 s. Tutti i
tagli cadono dentro la pausa di confine che HeyGen restituisce come token, a
non più di **0,076 s** dal suo centro.

| traccia | caratteri | grezzo | confini | pausa di confine min |
|---|---|---|---|---|
| A | 1.783 | 105,7 s | 6 | 1,50 s |
| B | 2.148 | 137,7 s | 9 | 1,43 s |
| C | 2.647 | 167,9 s | 10 | 1,42 s |
| D | 2.367 | 148,1 s | 9 | 1,42 s |
| E | 2.230 | 144,0 s | 9 | 1,40 s |

**Il costo non torna con la 7.1, e va detto.** La 7.2 ha speso **30
crediti** per 703,4 s di grezzo — saldo letto subito prima (7.335, dopo il
render della 7.1) e subito dopo (7.305), senza nient'altro in mezzo. La 7.1
ne aveva spesi 39 per 704,5 s. Stessa voce, stesso modello, stessa
lunghezza: o il saldo di partenza della 7.1 comprendeva qualcos'altro, o il
conto di HeyGen non è lineare nella durata. Con due lezioni il costo vero
sta fra **30 e 39 crediti di voce**, più uno di render; il «~40» scritto
dopo la 7.1 era il caso peggiore, non la media.

## Le note dello script

**La proporzione un terzo, due terzi.** Misurata sul montato:

| parte | blocchi | durata |
|---|---|---|
| apertura | `s02`–`s04` | 36,0 s |
| il lato di chi osserva | `s05`–`s18` | 164,5 s |
| quello che mandi tu, da conduttore e da candidato | `s19`–`s46` | 357,1 s |
| prova di oggi e chiusura | `s47`–`s49` | 29,4 s |

Fra le due metà, **31,5% e 68,5%**. Slide: tredici e ventisette.

**Nessun aneddoto.** Rispettato. La frase da dire al selezionatore (`s37`) è
quella dello script, «mi interessa parecchio questa cosa, quindi sono un po'
teso», detta come esempio e non come storia.

## Il copione

Da **4.389** caratteri di parlato nello script a **10.229**, media 213 per
blocco. Pose **42,5 s**.

Quello che il copione aggiunge:

- **perché si comincia con un divieto** (`s03`): qui l'errore diventa una
  decisione su una persona, presa per i motivi sbagliati;
- **che cosa il divieto dà a chi risponde** (`s04`): ti dice che cosa di te
  non dovrebbe contare, e ti toglie un peso che non è tuo;
- **la fonte e il passo dichiarato** (`s07`–`s08`), vedi sopra;
- **perché un errore sistematico è peggio di uno casuale** (`s10`): se fosse
  casuale su tanti colloqui si compenserebbe; invece pende sempre dalla
  stessa parte;
- **come si forma l'impressione che poi si conferma** (`s15`): nei primi
  secondi, e da lì ogni risposta viene ascoltata per confermarla invece che
  per capirla;
- **che cosa fa la tensione alle risposte** (`s20`): ricorda meno, frasi più
  corte, la prima risposta invece della migliore;
- **che le quattro mosse di chi conduce non chiedono di leggere niente**
  (`s25`): cambiano le condizioni, che sono l'unica parte del colloquio che
  dipende solo da te;
- **dove sta il picco dell'ansia** (`s28`): nel corridoio, sulla sedia, nei
  minuti di attesa — e scende da solo appena c'è qualcosa da fare;
- **perché il foglio amplifica le mani** (`s30`): ogni tremore diventa un
  fruscio, e ogni sguardo al foglio sembra la ricerca di una risposta;
- **perché la regola dello sguardo si legge come tranquillità** (`s35`): è
  quello che fa chiunque parli tranquillo;
- **perché la frase sulla tensione funziona** (`s38`–`s39`): senza, la
  tensione è un segnale senza causa e chi guarda la riempie con l'ipotesi
  peggiore; con, la causa c'è e non danneggia — ci tieni;
- **come si dice** (`s40`): una volta, all'inizio, e non ripetuta.

La «terza mossa della lezione sei punto cinque» dello script è citata così,
senza nominarla: dire da dove viene il segnale perché l'altro non debba
indovinarlo.

## Le grafiche

Quarantotto slide, di cui **quattro con un'infografica** e **nessuna
ciclica**:

| slide | tipo | cosa mostra |
|---|---|---|
| `c17` | flusso | dal segnale alla valutazione: cambia → chiedi → risponde → valuti, acceso l'ultimo |
| `c20` | confronto | lo stesso candidato teso e tranquillo: che cosa ricorda, dove si ferma, che cosa valuti tu |
| `c35` | flusso | lo sguardo in tre tempi: ascolti/guardi, pensi/stacchi, rispondi/torni |
| `c38` | confronto | la stessa tensione senza e con la frase |

Le liste ripetute sono quattro: chi penalizza (`c11`–`c13`), le quattro
mosse di chi conduce (`c21`–`c24`), le quattro del candidato (`c27`–`c31`) e
i quattro errori (`c42`–`c46`). Due memo e una citazione (`c37`, la frase da
dire al selezionatore).

**Tre correzioni dal foglio di contatto:**

- il flusso `c17` aveva etichette che uscivano dai riquadri («Un
  cambiamento», «aperta, non un sospetto»): ridotte a un verbo per passo,
  «Cambia / Chiedi / Risponde / Valuti»;
- la chiusura era su due liste («se conduci», «se rispondi») con la
  prossima lezione in nota: allineata alla 7.1, con la prova di oggi in una
  lista sola (`c48`) e «La trattativa.» come ultima slide (`c49`);
- `c11` è diventata una lista piena invece che accesa sulla prima voce,
  perché `s11` parla di due voci insieme, la soggezione e la cultura.

## Le riprese

Due, `s14` e `s26`, **viste tutte e due**. Generate sul nodo ElevenLabs con
**Nano Banana 2**, 406 crediti l'una; Higgsfield non è stato riprovato, è lo
stesso giorno della 7.1 e il tetto è giornaliero.

- **`s14`** — una scrivania d'ufficio con due fogli bianchi e una penna, una
  sedia vuota, luce da una finestra laterale. Arriva su «E se stai dalla
  parte di chi valuta, questa lezione ti serve soprattutto per questo»;
- **`s26`** — un corridoio d'ufficio con una fila di sedie vuote e una porta
  chiusa in fondo. Arriva su «E adesso l'altro lato del tavolo. Quello in cui
  ti trovi più spesso».

Nessuna persona, nessuna scritta leggibile, nessun marchio.

## Il montato è stato verificato scena per scena

`get_video_scenes`: **cinquanta scene**, le due immagini esattamente alle
scene 13 e 25 (cioè `s14` e `s26`), **nessuna scena in `playback: loop`** e
tutte le altre in `freeze` con `volume: 0`. Copertina con la traccia muta da
3 s, chiusura con quella da 10 s. 16:9, 1080p.

Il montato è stato scaricato e guardato: undici fotogrammi a metà di
altrettante scene (`s02`, la frase della scena 3, la fonte, le due riprese,
i due flussi, i due confronti, la citazione, «La trattativa.») più la
chiusura, tutti al loro posto. Silenzio iniziale 2,99 s, finale 10,5 s.

Durata finale **598,8 s**, lo stesso scarto di arrotondamento della 7.1.
Saldo HeyGen dopo il render: 7.304.
