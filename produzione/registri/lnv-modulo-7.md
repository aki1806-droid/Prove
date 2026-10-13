# Registro — Modulo 7 · Applicazioni

| lezione | titolo | durata | video_id |
|---|---|---|---|
| 7.1 | Il primo minuto | 9:59 | `ad0dd8d6e70a5b3a22605ed94fe976df` |
| 7.2 | Il colloquio | 9:59 | `16142621aad7e1493baf94b03c530534` |
| 7.3 | La trattativa | 9:59 | `fd660863d00229eb0afcc2873561d92d` |
| 7.4 | La riunione e il gruppo | 9:59 | `7bc45e76fb051e7c824f4c955f98d20d` |
| 7.5 | La mappa dei segnali che mandi tu | DURATA75 | `VIDEO75` |

**TOTALE**, duecentotrentanove slide, ventitré infografiche, undici riprese.
Il copione completo è di **51.188 caratteri**, riscritti dai **21.317**
caratteri di parlato degli script: due volte e mezza, come nei moduli 5 e 6.

Le prime quattro lezioni durano 9:59 come tutte quelle dei moduli 5 e 6. La
7.5 è più lunga per scelta dello script: è l'ultima del corso, va detta più
piano (0,92×), ha venticinque secondi di musica sola a metà e una chiusura
del corso di venti secondi con la musica in dissolvenza.

## Il primo modulo con la voce da HeyGen

Achille ha deciso di provare la voce **passando da HeyGen** su tutto il
modulo 7, per decidere sui fatti. È la stessa voce e lo stesso modello delle
trenta lezioni precedenti — `eleven_v4`, Luca Ward — ma chiamata con
`create_speech` di HeyGen invece che sul nodo `tts` di ElevenLabs. Non è il
TTS proprio di HeyGen, che resta escluso.

I risultati, lezione per lezione:

| lezione | crediti di voce | grezzo | confini al primo colpo | scarto massimo |
|---|---|---|---|---|
| 7.1 | 39 | 704,5 s | 43 su 43 | — |
| 7.2 | 30 | 703,4 s | 43 su 43 | 0,076 s |
| 7.3 | 31 | 701,5 s | 42 su 42 | 0,088 s |
| 7.4 | 31 | 729,5 s | 43 su 43 | 0,077 s |
| 7.5 | 30 | 695,2 s | 42 su 42 | 0,091 s |
| **modulo 7** | **161** | | **213 su 213** | |

Più **cinque crediti** di render, uno a lezione. Per confronto, la strada
ElevenLabs diretta costa circa **10.400 crediti ElevenLabs a lezione**
($1,73), più circa mille di trascrizione per verificare i tagli.

Quello che il modulo ha stabilito:

- **il costo è stabile a 30–31 crediti a lezione.** I 39 della 7.1 sono
  rimasti l'eccezione e non hanno trovato una spiegazione: la 7.2 ha
  smentito quella che era stata data (le pause di confine), e nessuna delle
  lezioni dopo l'ha ripetuto;
- **i confini si trovano senza trascrizione.** `create_speech` restituisce i
  tempi parola per parola, con la pausa di `<break>` come token a sé:
  `confini_heygen.py` taglia nel silenzio più lungo e il taglio si controlla
  contro quel token. Duecentotredici confini su duecentotredici, al primo
  colpo, tutti dentro la pausa. Nei moduli 5 e 6, con la trascrizione di
  controllo, gli errori erano stati trentadue su quattrocentocinquanta;
- **il parametro `speed` viene ignorato** con il motore ElevenLabs (7.3). Il
  «va detto piano» si fa in post: `tagli.py` ha la variabile `PIANO`, che
  rallenta solo i blocchi elencati. E la velocità di tutta una lezione si fa
  con `ATEMPO` (7.5: 1,12 invece di 1,16 per lo 0,92× dello script);
- **la voce tagliata è il 3,3% più lenta** di quella del nodo `tts` sul
  grezzo, e l'`atempo` di riferimento è **1,16** invece di 1,12. Le due
  sorgenti non si mescolano dentro lo stesso corso, e il modulo 7 è tutto
  HeyGen.

**La decisione su quale strada tenere resta di Achille.** Questo registro
porta i numeri; fino ad allora i video nuovi restano su ElevenLabs diretto, e
per ognuno si chiede prima con quale strumento fare la voce.

## Il vincolo del modulo

Nessuna lezione insegna a valutare una persona dai segnali. Lo script chiede
che sia **detto a voce** nella 7.2 e nella 7.3:

- nella **7.2** occupa nove blocchi interi, `s05`–`s13`, con la fonte detta
  a voce e con l'anno, e la parola che lo script lascia implicita: **è un
  errore che discrimina**;
- nella **7.3** lo script non aveva una frase dedicata, e il copione l'ha
  aggiunta in apertura (`s04`), prima di qualunque tecnica.

Il filtro del modulo 6 è rimasto acceso su tutto il modulo, e ha preso due
volte il sostantivo *mente*: «la mente stacca» nella 7.2 e «la mente umana»
nella 7.5. Tutte e due riscritte.

## Un terzo osservazione, due terzi su di te

Lo script lo chiede per tutto il modulo, «anche in montaggio». Misurato sul
montato, fra la parte su chi osserva e quella su quello che mandi tu:

| lezione | osservazione | quello che mandi tu |
|---|---|---|
| 7.1 | 31% | 69% |
| 7.2 | 31,5% | 68,5% |
| 7.3 | 33,2% | 66,8% |
| 7.4 | 32,2% | 67,8% |

La 7.5 è tutta sulla seconda metà: è la mappa dei segnali che mandi tu.

**Nessun aneddoto** in tutto il modulo, come chiede lo script.

## Le grafiche

Duecentotrentanove slide, **ventitré infografiche**, **una sola ciclica**:
l'anello della 7.4 (`c30`), il circolo di chi non viene guardato, parla meno e
viene guardato ancora meno.

| lezione | infografiche |
|---|---|
| 7.1 | `c13` confronto · `c22` confronto · `c39` bivio |
| 7.2 | `c17` flusso · `c20` confronto · `c35` flusso · `c38` confronto |
| 7.3 | `c11` confronto · `c12` swap · `c14` flusso · `c28` flusso · `c36` swap · `c40`–`c41` bivio |
| 7.4 | `c10` cruscotto · `c11` swap · `c16` swap · `c30` anello · `c31` flusso |
| 7.5 | `c28` flusso · `c29` swap · `c40` swap · `c47` bivio |

La 7.5 ha la **chiusura del corso** invece di quella della lezione: titolo
del corso, «Sette moduli · trentacinque lezioni», il sito e il logo esteso
grande.

## Le riprese

Undici, **tutte viste**, tutte sul nodo ElevenLabs con **Nano Banana 2**:
tre nella 7.1, due in ciascuna delle altre. Higgsfield non è stato più
riprovato dopo la 7.1, la nona lezione di fila rifiutata per il tetto
giornaliero.

Una sola è stata accettata con uno scarto dichiarato: nella 7.3 le due
cartelline sono affiancate e non una di fronte all'altra.

## La musica della 7.5

L'unica musica del corso: `eleven_music_v2`, 50 s, **trascritta per
controllo** perché il generatore la dava come non strumentale — trascrizione
vuota. Due tagli: 25 s per la scena muta, 20 s per la chiusura del corso.

## Quello che resta aperto

- **la 7.5 va riascoltata da Achille il giorno dopo**, a mente fresca, prima
  di pubblicarla: lo chiede lo script;
- **la decisione sulla strada della voce**, con i numeri qui sopra;
- la nota editoriale sulla `s07` della 3.3: al tavolo sembrano esserci solo
  uomini;
- le venti lezioni dei moduli 1–4 non hanno la verifica sulla trascrizione.
  Si comincia dalle cinque che hanno un confine segnalato: `s28` della 4.1,
  `s10` e `s12` della 4.3, `s26` e `s27` della 3.2, `s31` della 3.5.
