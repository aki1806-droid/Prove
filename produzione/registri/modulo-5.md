# Modulo 5 — Persuadere senza manipolare

Cinque lezioni prodotte con il trattamento standard: nessun avatar, voce unica
di Luca Ward tagliata a blocchi, slide animate a piena inquadratura, grafiche
e riprese generate. Ogni lezione ha il suo registro con i dettagli.

| lezione | video_id | durata | scene |
|---|---|---|---|
| 5.1 Dove finisce l'influenza, dove comincia l'abuso | `36a1bf43d45a07e291437e2223108503` | 5:44 | 50 |
| 5.2 La credibilità si costruisce prima di parlare | `ff882ea68048247dc7aff348280d2691` | 5:50 | 50 |
| 5.3 Parlare ai bisogni, non alle posizioni | `a761b3c6ae0d9c32d42293093fc6e7c1` | 5:51 | 50 |
| 5.4 Le leve legittime | `9662ad79bab64721c49e4b6484f5f3ad` | 5:49 | 50 |
| 5.5 Rinunciare a convincere | `21ed8ca40804c8908daf69af00ac852c` | 5:54 | 50 |

Durata del modulo: **29 minuti e 8 secondi**.

## È il modulo che tiene in piedi tutti gli altri

Lo dice la 5.1 in apertura e la 5.5 in chiusura, e in mezzo c'è la tecnica.
La 5.1 definisce il confine — chi persuade passa attraverso il giudizio, chi
manipola lo aggira — e la 5.5 lo chiude con la frase che costa di più: una
persona adulta e informata ha il diritto di prendere una decisione che tu
ritieni sbagliata.

Sono le due lezioni con le pose più lunghe del corso: **dieci secondi** su
«Nessuna sul merito» nella 5.1 e **dieci secondi e mezzo** sul memo etico
della 5.5. Nessuna delle due l'ho accorciata, perché le note di montaggio
chiedevano esattamente il contrario.

## I copioni sono stati riscritti

| lezione | script | in video |
|---|---|---|
| 5.1 | 3.060 | 5.146 |
| 5.2 | 3.139 | 5.056 |
| 5.3 | 3.223 | 4.965 |
| 5.4 | 3.571 | 4.865 |
| 5.5 | 3.505 | 4.894 |

La 5.4 è la riscrittura più contenuta del corso (+36% invece del solito +60%),
perché era già lo script più pieno: cinque leve e cinque abusi non lasciano
spazio. Le altre quattro hanno seguito lo schema di sempre — sotto ogni regola
il motivo per cui funziona, sotto ogni errore il segnale per accorgersene.

**Un aneddoto in cinque lezioni**, nella 5.5: cinque argomenti tutti solidi
usati di fila su un collega, e la procedura cambiata da lui sette mesi dopo,
da solo. È inventato in prima persona come prescrive il metodo, e sta lì
perché la lezione dice che chi ha buoni argomenti è più esposto — e quella
frase va detta da chi parla, non su un terzo. Le altre quattro non ne hanno:
le prime due lo escludono per scritto, la 5.3 ha l'esempio del sabato che fa
lo stesso lavoro, la 5.4 non ha spazio.

## Le grafiche

**Settantatré** in tutto, più quindici riprese Higgsfield. Le tre che
funzionano meglio:

- **la curva della 5.5** (`c05`): la disponibilità di chi ascolta che sale con
  i primi argomenti e poi scende, con il punto di svolta segnato. È la prima
  volta che il corso usa il layout `figure`, che esisteva in
  `slide_corso.mjs` da mesi e non era mai servito. Qui serviva: il testo la
  spiega in tre frasi, la curva la dice in un fotogramma;
- **la tabella del perno della 5.1** (`c36`): tre righe, colonna «su cosa
  agisce» → il tempo, l'emozione, il tempo. Il merito non compare mai. La
  slide dopo è un memo di tre parole;
- **le tre righe della 5.4** (`c39`): «quando ti va bene?» → proponi già la
  data, «lo trovi in cartella» → allega il documento, «fammi sapere» → riduci
  a due opzioni. È la slide più direttamente applicabile del modulo.

**La 5.4 ha un problema di forma tutto suo**: cinque coppie leva-abuso hanno
per forza la stessa struttura, e la nota di montaggio chiedeva di variare il
ritmo. Senza avatar la variazione sta in tre cose — un'unica slide-elenco che
si accende cinque volte, un tipo di grafica diverso per ogni abuso, e pose non
uniformi (8,0 / 8,5 / 9,0 a rotazione).

## Le icone

Una sola nuova in tutto il modulo: **`conto`**, uno scontrino con il totale a
doppia riga oro, per «il debito come argomento» nella 5.1. Alla prima versione
era un rettangolo con due righe e leggeva come un documento generico;
guardando il PNG a 104 px l'ho ridisegnato più largo e con il bordo inferiore
strappato.

Due correzioni sono nate dal guardare i PNG, e una è una lezione sul layout:

- 5.2, `c44`: la seconda scheda usava `approvare` e leggeva «documento
  firmato» invece di «piace a tutti» → sostituita con `annuire`;
- 5.4, `c14` e `c42`: il layout `table` mette in evidenza la **seconda**
  colonna, e su quelle due slide la seconda colonna era la versione abusiva —
  quindi l'enfasi diceva «questa è la risposta giusta». `c14` è diventata
  sostituzioni, `c42` è stata ristrutturata con le colonne «il gesto» e «che
  cos'è», così l'enfasi cade sul verdetto.

## I tagli

| lezione | primo giro | poi | ricostruzioni | controprove |
|---|---|---|---|---|
| 5.1 | 7 | 3, poi 0 | 2 | 1 (33 crediti) |
| 5.2 | 2 | 1, poi 0 | — | — |
| 5.3 | 0 | — | — | — |
| 5.4 | 2 | 0 | — | — |
| 5.5 | 2 | 1, poi 0 | — | — |

La **5.3** è la prima lezione del corso a prendere tutti e quarantasei i
confini al primo giro.

La **5.1** è la peggiore mai vista, e ha aggiunto un caso al repertorio. Dopo
tre giri di `correggi` i confini erano tutti a posto per contenuto, ma i
caratteri al secondo dicevano il contrario: `s18` a 9,1 e poi `s20` a 48,6.
Lo scriba non aveva mai prodotto la coda di `s18`, quindi quello che
`verifica.py` leggeva come fine di `s18` era in realtà la fine di `s19`, e
così via a cascata. La controprova ha risolto il primo anello (di due silenzi
candidati, quello a 8,86 s legge esattamente «in questo momento?»), e la
catena è stata ricostruita sul **tempo di parlato netto** — silenzi esclusi —
invece che sui caratteri grezzi. Con due valori messi a mano i cinque blocchi
intorno tornano tutti fra 15 e 20 caratteri al secondo, e un confine spurio
che stava dentro `s21` è sparito.

La **5.4** ha aggiunto un caso più semplice ma utile: lo scriba ha prodotto 43
pezzi invece di 46 perché ha smesso di mettere i punti, unendo tre code
consecutive in una frase sola. `verifica.py` ha segnato tre blocchi come senza
coda, ma non erano confini sbagliati — erano punti mancanti, e la banda
caratteri/secondo lo confermava. **Tre code mancanti non sono tre confini
sbagliati**: prima di muovere qualcosa va guardata la banda.

Due blocchi in tutto il modulo restano appena fuori banda — `s19` della 5.1 a
22,4 e `s19` della 5.5 a 21,5, contro un limite di 21. In tutti e due i casi i
confini intorno sono verificati per contenuto e i vicini stanno in banda:
sono passaggi letti veloce, non tagli sbagliati. Muovere un confine verificato
per far tornare un numero sarebbe il contrario del metodo.

## Cosa resta da giudicare ad Achille

Non sento l'audio e non vedo il montato. Per ogni lezione ho controllato le
slide da ferme e tutti i tagli con la trascrizione, più una controprova sulla
5.1. Restano da guardare le **quindici riprese Higgsfield** del modulo: il
proxy blocca il CDN in scaricamento, quindi le ho descritte ma non viste.

Una nota su una ripresa: il primo tentativo per la 5.3 (una porta chiusa col
buco della chiave, per «nessuno si scopre con chi userà l'informazione contro
di lui») è stato **rifiutato dal generatore**, con ogni probabilità per un
falso positivo del filtro. L'ho sostituito con un fascicolo chiuso
dall'elastico, che dice la stessa cosa.

Sulle durate: cinque lezioni fra 5:44 e 5:54, la fascia più compatta di tutto
il corso. Gli script chiedevano 6:00-6:45; la differenza sta nella velocità di
lettura della voce, e allungare oltre vorrebbe dire aggiungere silenzio invece
che contenuto.

Con la 5.5 il modulo 5 è chiuso. La slide finale annuncia **Modulo 6 —
Obiezioni, tensioni, conflitti**, e il testo fa il ponte: nel prossimo modulo
si sta dall'altra parte, cioè cosa fare quando è l'altro a non essere
d'accordo con te.
