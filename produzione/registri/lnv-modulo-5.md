# Registro — Modulo 5 · Gesti e voce

| lezione | titolo | durata | video_id |
|---|---|---|---|
| 5.1 | I gesti che accompagnano la parola | 9:59 | `8c512723bc149a5551fde3b06e4faf00` |
| 5.2 | I gesti che la sostituiscono | 9:59 | `38db61ca01bfd8ef074914672defec16` |
| 5.3 | L'autocontatto | 9:59 | `3dfb22213b650cfaff07db0c1dac93c4` |
| 5.4 | La voce come segnale non verbale | 9:59 | `d6a44d680232ca9abedf21dbee8a05ca` |
| 5.5 | Il ritmo e le pause dell'altro | 9:59 | `7050d497cd244561ea5f82401662d2dc` |

**Quarantanove minuti e cinquantacinque secondi**, duecentotrentasei slide,
ventisette fra diagrammi e infografiche, quattordici riprese. Il copione
completo è di **50.931 caratteri**, riscritto dai **19.840** caratteri di
parlato degli script: due volte e mezza.

Cinque lezioni su cinque a 9:59, come il modulo 4 era stato tutto a 9:58: la
taratura dei caratteri regge.

## È il modulo in cui il corso smette di guardare e comincia ad ascoltare

Le prime tre lezioni chiudono il discorso sui gesti; le ultime due aprono
quello sul suono, che nei corsi di linguaggio del corpo di solito non si apre
affatto.

| lezione | cosa toglie | cosa lascia al suo posto |
|---|---|---|
| 5.1 | il gesto come finestra sul pensiero | i gesti aiutano a parlare, e due spiegazioni probabili per ogni causa |
| 5.2 | il «dizionario dei gesti» come psicologia | un dizionario vero, ma di lingua: dice cosa uno ha voluto dire, e si ferma lì |
| 5.3 | «si tocca il naso, quindi mente» | dieci cause banali, la linea di base, e l'aumento improvviso |
| 5.4 | «la voce della menzogna» | quattro parametri e il punto in cui la voce cambia |
| 5.5 | il silenzio come spazio vuoto | due tipi di pausa, e chi interrompe chi |

**La 5.3 è la lezione centrale del modulo**: smonta il segnale più usato
dagli improvvisati, con nome e anno della fonte detti a voce — la rassegna di
DePaulo e colleghi del 2003 — e chiude sul danno, senza nessuna formula
consolatoria. Chi viene colpito da un segnale senza supporto è chi è teso,
chi ha un'allergia, chi ha l'abitudine, chi porta gli occhiali. **Non chi
mente.**

**La 5.5 chiude il modulo con la terza prova della stessa forma**: le
interruzioni seguono la gerarchia come gli sguardi del modulo 3 e il contatto
del modulo 4. Tre segnali diversi, lo stesso ordine, e nessuno dei tre deciso
da qualcuno.

## I vincoli del modulo, e come sono stati rispettati

**Nessun aneddoto in tutto il modulo**, come chiede la nota di apertura: non
ce n'è uno in cinquanta minuti.

**Nessun gesto offensivo nominato, descritto o mostrato** (5.2). Il copione
rispetta la nota con una mossa che è anche contenuto: dice *perché* non fa
esempi, invece di evitarli e basta.

**Nessuna formulazione che suggerisca di rilevare la menzogna.** Il mito
compare due volte, tutte e due fra virgolette e tutte e due smontate nelle
slide successive: «si tocca il naso, quindi mente» nella 5.3 e «la voce della
menzogna» nella 5.4.

## La verifica dei tagli, per la prima volta su un modulo intero

**Duecentoventicinque confini, tutti riletti sulla trascrizione.** È il primo
modulo del corso in cui questo è stato fatto su tutte e cinque le lezioni.

| | segnalati da `banda.py` | sbagliati davvero |
|---|---|---|
| 5.1 | 1 | 1 |
| 5.2 | 3 | 7 |
| 5.3 | 4 | 8 |
| 5.4 | 0 | 0 |
| 5.5 | 2 | 3 |
| **totale** | **10** | **19** |

**Diciannove confini sbagliati su duecentoventicinque, e la banda ne vedeva
dieci.** Non è solo una questione di numeri: di quei dieci, almeno tre
indicavano il blocco *vicino* al colpevole, perché un confine spostato
allunga il blocco dopo e accorcia quello prima. La banda dice dove guardare,
non che cosa è rotto.

Le due lezioni agli estremi dicono il resto:

- la **5.2** aveva la banda quasi pulita e sette confini sbagliati, quattro
  dei quali in catena — tutti spostati nello stesso verso, quindi invisibili
  a un controllo di durata (§10-bis dello standard);
- la **5.4** è uscita **giusta al primo giro**, quarantacinque su
  quarantacinque, ed è l'unica del corso.

Tutti e diciannove sono stati corretti e riletti su un secondo file di
controllo. Costo totale della verifica sul modulo: circa **cinque crediti
ElevenLabs su mille** per lezione, cioè meno di un euro in tutto.

## Le riprese: il modulo dei fornitori che finiscono

Quattordici riprese, **tutte viste**, e tre fornitori diversi in cinque
lezioni:

- i crediti **Artlist** si sono esauriti durante la 5.1 (settanta su
  sedicimilacinquecento, rinnovo il 18 ottobre);
- la 5.2 e le prime prove della 5.3 sono passate a **Higgsfield con GPT Image
  2.5**, scelto dopo una prova a tre e di gran lunga il più economico: 0,25
  crediti per immagine;
- dalla 5.3 in poi Higgsfield ha rifiutato ogni richiesta per un **tetto
  giornaliero di generazioni del piano** — non per mancanza di crediti, che
  erano 571 — e le otto riprese delle ultime tre lezioni sono state generate
  sul nodo **ElevenLabs con Nano Banana 2**, a 406 crediti l'una.

Tutte e quattordici sono senza volti riconoscibili, senza scritte leggibili e
senza marchi.

## Che cosa ha imparato lo standard, in questo modulo

Tre regole nuove, tutte e tre nate da un errore visto su una slide:

- **il `centro` di un `raggi` sta in due parole corte** (5.1, `c16`);
- **`pila` impila dal basso**, quindi un elenco ordinato va scritto al
  contrario se si vuole leggerlo dall'alto (5.3, `c05` e `c15`);
- **in `raggi`, `attorno[].d` è un numero da 0 a 100** — la distanza del
  satellite dal centro. Una stringa non dà nessun errore: diventa `NaN` e
  ammucchia tutte le etichette in un angolo (5.4, `c08`).

E una regola che non riguarda il layout ma il metodo, ed è la più cara:
**una banda pulita non è una prova, è un'assenza di segnale.**

## Che cosa resta aperto

- la `s07` della 3.3 ha una nota editoriale che non è stata chiusa: al tavolo
  sembrano tutti uomini;
- le **venti lezioni dei moduli 1–4** non hanno la verifica sulla
  trascrizione. Dopo quello che ha mostrato questo modulo — diciannove
  confini sbagliati su duecentoventicinque, nove dei quali invisibili alla
  banda — vale la pena ripassarle, partendo dalle cinque che hanno un confine
  segnalato: `s28` della 4.1, `s10` e `s12` della 4.3, `s26` e `s27` della
  3.2, `s31` della 3.5.
