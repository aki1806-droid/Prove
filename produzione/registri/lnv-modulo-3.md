# Registro — Modulo 3 · Lo sguardo

| lezione | titolo | durata | video_id |
|---|---|---|---|
| 3.1 | La durata del contatto | 9:59 | `d2e4788a89a7475e2c6a665695da1038` |
| 3.2 | Il mito della direzione | 9:59 | `73628bfda25eb16bdeb7f95b65c38a26` |
| 3.3 | Lo sguardo nel gruppo | 9:59 | `b79f2fa1d5c14eca6b69fc96494d74c4` |
| 3.4 | Pupille e ammiccamento | 9:59 | `6c318a0f029ed071fbdc5a59604330ec` |
| 3.5 | Lo sguardo che mandi tu | 10:04 | `586431bd2f9519ae6515c01548cc3c66` |

**Cinquanta minuti e due secondi**, duecentotrentasei slide, ventisette fra
diagrammi e infografiche, quattordici riprese. Il copione completo è di
**51.722 caratteri**, riscritto dai 21.259 caratteri di parlato degli script:
due volte e mezza.

## È il modulo che dà, dopo due che tolgono

Il modulo 1 dichiarava i limiti, il 2 li applicava smontando il volto. Questo
è il primo che consegna qualcosa di usabile, e lo consegna tardi: quattro
lezioni su cinque tolgono ancora, e la quinta dà.

| lezione | cosa toglie | cosa lascia al suo posto |
|---|---|---|
| 3.1 | il contatto visivo come misura di sincerità | la durata come regolatore di intimità, e la soglia del fastidio |
| 3.2 | la direzione dello sguardo come indizio di processo mentale | il movimento come segno che il pensiero è in corso, non di che tipo |
| 3.3 | — | la convergenza di un gruppo, l'unico segnale del corso leggibile senza una linea di base individuale |
| 3.4 | pupille e ammiccamento come segnali di stato | la regola generale: un segnale è leggibile se ha poche cause e se si distinguono |
| 3.5 | — | tre movimenti: guarda mentre l'altro parla, stacca mentre parli tu, torna quando riprende |

La 3.3 e la 3.5 sono le due che danno, e sono messe al terzo e al quinto
posto: una a metà, una in fondo. Il modulo lo dice in faccia nella 3.5 — «di
queste cinque lezioni, quattro tolgono e una dà» — invece di far finta di
niente.

## Nessun aneddoto, e quanto è costato scoprirlo

**Le note in fondo allo script dicono «Nessun aneddoto nel modulo 3».** Stanno
sotto la 3.5, cioè nel punto in cui si leggono per ultime, e le ho lette dopo
aver montato la 3.2 e scritto la 3.3.

Il conto: quattro blocchi e quattro slide riscritti nella 3.2, quattro blocchi
e tre slide nella 3.3, due tracce rigenerate, i tagli rifatti su tutte e due,
due rimontaggi. E una correzione al registro della 3.1, che dichiarava tre
aneddoti che nel montato non c'erano.

La regola che ne esce sta in `LNV_STANDARD-PRODUZIONE.md` §7: **le note in
fondo allo script del modulo valgono per tutte e cinque le lezioni, e vanno
lette prima di scrivere la prima**, non dopo aver montato la terza.

## La densità delle grafiche

| lezione | slide | disegni e infografiche | cicliche | riprese |
|---|---|---|---|---|
| 3.1 | 47 | 6 | 1 (`c34`) | 3 |
| 3.2 | 47 | 6 | 1 (`c33`) | 3 |
| 3.3 | 47 | 4 + 1 numero | 1 (`c39`) | 3 |
| 3.4 | 48 | 6 | — | 2 |
| 3.5 | 47 | 5 + 1 numero | 1 (`c20`) | 3 |

Meno dense del modulo 2 (ventisette figure contro trentasei) e per una ragione
di materia: lo sguardo si descrive a parole meglio del volto, che invece
richiede di mostrare dove sta il muscolo.

Tre gotcha di layout scoperti in questo modulo e scritti nello standard:

- **`raggi` disegna solo i primi quattro satelliti** (`attorno[:4]`) e scarta
  il resto in silenzio. Trovato sulla 3.4, dove otto cause erano diventate
  quattro senza che niente lo segnalasse;
- **`quadranti` non disegna le etichette dei poli degli assi**: vanno scritte
  dentro le celle, o i quattro riquadri sono indistinguibili;
- **la didascalia di una figura sta in una riga.** A due righe la figura si
  alza e il kicker finisce sopra il logo; a tre righe l'ultima riga finisce
  sopra il filetto. Successo su `c22` della 3.3 e su `c20` e `c33` della 3.5.

## Le riprese

Quattordici, tutte generate e tutte nello stesso mondo visivo del modulo 2.
**Tredici su quattordici sono state guardate prima del montaggio**; la
quattordicesima, `s07` della 3.3 — un tavolo da riunione dall'alto — è stata
guardata dopo, il 10 ottobre, quando il CDN è tornato raggiungibile.
**Adesso sono state viste tutte.**

La causa del ritardo non è stata una dimenticanza: il connettore di
generazione restituisce l'anteprima in linea solo su alcune chiamate, e i tre
CDN da cui si scaricherebbe l'immagine erano chiusi dalla policy di rete del
contenitore. Due cose da fare, in quest'ordine: **generare le immagini in un
batch unico e poi chiederle una per una** (la richiesta in blocco restituisce
l'anteprima di una sola), e, se l'anteprima comunque non arriva, **provare a
scaricare il file dal CDN** — la policy di rete cambia, e il 10 ottobre
`ai-toolkit-generations.imgix.net` rispondeva di nuovo.

Sulla `s07` resta una nota di composizione, scritta per esteso nel registro
della 3.3: le dieci persone sedute al tavolo sembrano tutte uomini. Non è un
difetto tecnico ed è una decisione editoriale, non mia.

## Il montaggio, e due errori di indice

La 3.1 e la 3.2 sono state montate due volte. La prima volta avevano la scena
ciclica sbagliata: la 3.1 con `freeze` dove voleva `loop`, la 3.2 con il
`loop` sulla scena successiva a quella giusta.

Tutti e due nascono dalla stessa cosa — aver ricostruito a mano l'elenco delle
scene invece di passarlo come `scene.py` lo scrive. La regola, adesso nello
standard: **le scene si passano esattamente come stanno in `scene.json`**, e
dopo il montaggio si rileggono con `get_video_scenes` e si confrontano. Sulla
3.5 il confronto è stato fatto e torna.

## Il controllo dei tagli è parziale, e qui c'è il conto

La verifica parola per parola prevista dal metodo non è stata fatta su nessuna
delle cinque lezioni: la trascrizione di controllo non è disponibile. Al suo
posto, il controllo di durata sul parlato netto.

| lezione | confini | corretti a mano | fuori banda residui | silenzio più stretto |
|---|---|---|---|---|
| 3.1 | 45 | — | **0** | 0,38 s |
| 3.2 | 45 | 3 | 2 (`s26`, `s27`) | **0,23 s** |
| 3.3 | 45 | 2 | **0** | 0,22 s |
| 3.4 | 45 | 5 | **0** | 0,28 s |
| 3.5 | 45 | 2 | 1 (`s31`) | 0,35 s |

**È il modulo migliore del corso su questo fronte**: tre lezioni su cinque
chiudono a zero, contro nessuna del modulo 2. Il motivo è il metodo, non la
fortuna — la firma uguale e opposta (un blocco lungo di X, il successivo corto
di X) dice che il confine fra i due è spostato, e `banda.py sposta` elenca le
pause vicine con la coppia di scarti che ciascuna produrrebbe.

I due casi che non si sono chiusi sono di natura diversa e vanno detti come
tali:

- la 3.2, `s26`/`s27`: fra 120,81 e 126,92 secondi **non c'è nessun silenzio
  utilizzabile**, quindi il confine o taglia sei secondi troppo presto o sei
  troppo tardi. Non è un difetto del metodo: è la traccia;
- la 3.5, `s31`: non è un confine spostato, è un blocco **letto più lento**
  della media della traccia (16,4 car/s contro 18,54). Nessuna pausa vicina
  migliora la coppia.

**La garanzia che si può dare su tutte e cinque**: duecentoventicinque tagli,
tutti dentro un silenzio.

## La durata della 3.5

La 3.5 esce a 10:04 invece dei 9:59 delle altre quattro, e non per un errore.
I minimi di lettura delle slide, sommati, superano da soli il bersaglio di
587 s di parlato: `pose.py` ha chiuso con supplemento di base zero. È il
comportamento voluto dallo standard — il minimo vince sul bersaglio — e ha un
precedente nella 2.5, 10:02.

## Cosa resta da fare

- **decidere sulla composizione della ripresa `s07` della 3.3** (al tavolo
  sembrano tutti uomini): rigenerarla e rimontare, oppure tenerla così;
- **risentire i tre confini segnalati** — `s26` e `s27` della 3.2, `s31` della
  3.5 — e i due silenzi più stretti, `s31` della 3.2 (0,23 s) e `s29` della
  3.3 (0,22 s);
- **verificare i tagli parola per parola** su tutte e cinque, appena la
  trascrizione di controllo torna disponibile;
- nessuna delle cinque lezioni è stata ascoltata né vista in riproduzione.
