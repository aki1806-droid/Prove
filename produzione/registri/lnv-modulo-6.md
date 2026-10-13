# Registro — Modulo 6 · L'incongruenza

| lezione | titolo | durata | video_id |
|---|---|---|---|
| 6.1 | Che cos'è un'incongruenza | 9:59 | `ceb55ec8560b90dbeaa7c8ff92efff39` |
| 6.2 | I tre tipi | 9:59 | `84c55de233d7efc5a750cf3a856b9962` |
| 6.3 | Perché non significa bugia | 9:59 | `aac1db4f5e62111765e4996b61f76a86` |
| 6.4 | Cosa farne: la prossima domanda | 9:59 | `0155f3d29775bb71abffc600802bc260` |
| 6.5 | Quando l'incongruenza sei tu | 9:59 | `32a6c2325425a7613998bc30f84fe0c3` |

**Quarantanove minuti e cinquantacinque secondi**, duecentotrentotto slide,
quindici fra diagrammi e infografiche, dodici riprese. Il copione completo è
di **50.978 caratteri**, riscritti dai **19.335** caratteri di parlato degli
script: due volte e mezza, come nel modulo 5.

Cinque lezioni su cinque a 9:59, come il modulo 5. È il terzo modulo di fila
in cui le cinque durate coincidono al secondo.

## È il modulo centrale del corso

Lo script lo dice in testa: «è la risposta alla domanda che ha portato molte
persone a comprarlo, ed è dove la promessa della pagina di vendita viene
mantenuta — in una forma diversa da quella che lo studente si aspettava».

| lezione | cosa toglie | cosa lascia al suo posto |
|---|---|---|
| 6.1 | l'incongruenza come «segnale che qualcosa non va» | una definizione precisa: due canali che dicono cose diverse, e un punto preciso in cui succede |
| 6.2 | l'idea che siano tutte uguali | tre tipi, con tre significati operativi diversi |
| 6.3 | «se dice una cosa e il corpo ne dice un'altra, sta mentendo» | sette cause ordinarie, la frequenza di base, e due fonti con nome e anno |
| 6.4 | l'idea che un'osservazione che non conclude sia inutilizzabile | tre mosse in ordine di invadenza, e una domanda che funziona meglio di tutte |
| 6.5 | lo sguardo solo verso l'esterno | l'unico caso in cui conosci la causa: la tua |

La curva del modulo è una sola, e va letta nell'ordine: **che cos'è**,
**di quanti tipi**, **che cosa non significa**, **che cosa farne**, **che
cosa farne quando riguarda te**. La 6.3 è la lezione decisiva, la 6.4 è
quella che si userà tutti i giorni, la 6.5 è l'unica che produce un
cambiamento sotto il controllo dello studente.

## Il vincolo assoluto, e le tre forme che ha preso

«In nessuna scena di questo modulo compare una formulazione che suggerisca
di rilevare la menzogna, nemmeno attenuata o per negazione retorica.» È il
vincolo più stretto del corso, e il modulo l'ha rispettato in tre modi
diversi:

- **silenzioso** nella 6.1, 6.2 e 6.4: `blocchi.py` e `slides.py` hanno un
  controllo automatico che la radice non compaia in nessun blocco e su
  nessuna slide;
- **rovesciato** nella 6.3, dove la radice *deve* comparire perché la
  lezione esiste per negarla: il controllo elenca i nove blocchi in cui
  compare e verifica che ciascuno la neghi, la metta in fila con le altre
  cause o ne dica la rarità;
- **silenzioso col filtro più largo** nella 6.5, dove il participio
  `mentito` dello script ha mostrato che il filtro delle lezioni precedenti
  aveva un buco.

Due frasi degli script sono state riscritte prima di generare la voce:

| lezione | lo script diceva | il copione dice |
|---|---|---|
| 6.2 | il primo tipo è «quello che si vede nei film quando qualcuno mente» | la stessa idea senza l'esempio |
| 6.5 | «Tu non hai mentito. E hai comunicato una cosa falsa.» | «Non hai detto niente di falso. E hai comunicato una cosa falsa.» |

Una è stata **tenuta e dichiarata**: nella 6.1 la frase «non sta ingannando
nessuno» è di Achille, sta nello script, e il registro della lezione la
segnala apertamente invece di nasconderla.

Il filtro che ne esce, e che vale per i moduli successivi, sta nello
standard: la radice si cerca **con i confini di parola**, coprendo anche il
participio, con **due eccezioni idiomatiche escluse a mano** — `in mente` e
`nella mente`, che sono il sostantivo e non il verbo. E quando la frase si
può riscrivere senza l'idiomatismo, si riscrive.

## La verifica dei tagli, su tutto il modulo

Tutte e cinque le lezioni sono passate per la trascrizione di controllo
(§10-bis dello standard), come il modulo 5 e a differenza dei moduli 1–4.

| | segnalati da `banda.py` | sbagliati davvero |
|---|---|---|
| 6.1 | 1 | 1 |
| 6.2 | 4 | 8 |
| 6.3 | **0** | 1 |
| 6.4 | 3 | 2 |
| 6.5 | 2 | 1 |
| **modulo 6** | **10** | **13** |

Duecentoventicinque confini riletti, **tredici sbagliati**, tutti corretti e
tutti riconfermati su una clip di controllo. Il modulo 5 aveva la stessa
proporzione: duecentoventicinque confini, diciannove sbagliati.

Il modulo ha aggiunto quattro regole allo standard, tutte nate da un errore
vero:

- **le ultime tre parole, non la coda intera** (6.1): la finestra di 1,6 s
  taglia a metà la prima parola e `scribe` la inventa. Un confronto
  sull'intera coda dava otto confini sospetti su quarantacinque; sulle
  ultime tre parole, uno — e quell'uno era davvero sbagliato;
- **`correggi` non basta** (6.2): la stima si fa contando caratteri a
  velocità fissa, e su otto confini ne ha sistemati quattro. Gli altri si
  correggono dai tempi per parola della clip di controllo;
- **i confini di parola nel filtro** (6.3): `ment` prendeva *strumento*,
  *momento* e *leggermente*;
- **il pool fine dei silenzi** (6.4): quando `correggi` oltrepassa perché nel
  pool grosso non c'è un candidato vicino, il silenzio giusto sta in
  `silenzi(path, 0.08)` — e un confine preso da lì fa poi fallire il
  controllo grosso di `banda.py silenzi`, che è un falso allarme previsto.

E ha confermato quello che il modulo 5 aveva insegnato: **la banda indica
dove guardare, non chi ha sbagliato.** Nella 6.2 nessuno dei quattro
segnalati era il colpevole; nella 6.4 di tre segnalati uno solo lo era;
nella 6.5 i due segnalati erano il colpevole e la sua vittima, cioè la coppia
giusta per la prima volta nel modulo. E la 6.3 è il caso minimo della 5.2:
banda pulita e un confine sbagliato lo stesso.

## Le grafiche

Duecentotrentotto slide, **quindici figure**, nessuna ciclica in tutto il
modulo.

| lezione | figure |
|---|---|
| 6.1 | `c15` · `c26` · `c37` |
| 6.2 | `c09` · `c17` · `c40` |
| 6.3 | `c15` imbuto · `c20` confronto · `c24` confronto |
| 6.4 | `c09` pila · `c23` confronto · `c26` confronto |
| 6.5 | `c17` confronto · `c20` pila · `c41` confronto |

Il modulo ha portato tre fatti nuovi sui layout, tutti nello standard:

- **`list` regge sette righe** (6.3): prima d'ora il massimo usato era sei, e
  le sette cause ordinarie stanno nel riquadro senza stringere;
- **una slide che deve restare a schermo per tutta la scena** si ottiene
  tenendo lo stesso titolo su più schermate e cambiando solo l'occhiello
  (6.4 su cinque, 6.5 su cinque e su tre). È la soluzione per le note di
  script che chiedono «la slide resta a schermo»;
- **il corsivo del `memo` non regge l'apostrofo seguito da è** (6.5): quando
  la frase dello script ne ha uno in ogni riga, la slide si riformula e la
  voce dice la frase intera.

## Le riprese

Dodici in tutto il modulo, **tutte viste**. Nessuna è stata montata senza
guardarla.

**Higgsfield ha rifiutato per tutte e cinque le lezioni** — e per le tre del
modulo 5 prima di queste: otto rifiuti di fila, sempre per il tetto
giornaliero di generazioni del piano, che non dipende dai crediti. Tutte le
riprese del modulo sono quindi nate sul nodo immagine di ElevenLabs con
**Nano Banana 2**, 406 crediti l'una.

## Quello che resta aperto

- la nota editoriale sulla `s07` della 3.3: al tavolo sembrano esserci solo
  uomini;
- le venti lezioni dei moduli 1–4 non hanno la verifica sulla trascrizione.
  Si comincia dalle cinque che hanno un confine segnalato: `s28` della 4.1,
  `s10` e `s12` della 4.3, `s26` e `s27` della 3.2, `s31` della 3.5;
- **manca lo script del modulo 7**, l'ultimo del corso.
