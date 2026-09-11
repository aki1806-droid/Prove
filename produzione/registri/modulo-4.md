# Modulo 4 — Costruire un messaggio che resta

Cinque lezioni prodotte con il trattamento standard: nessun avatar, voce unica
di Luca Ward tagliata a blocchi, slide animate a piena inquadratura, grafiche
e riprese generate. Ogni lezione ha il suo registro con i dettagli.

| lezione | video_id | durata | scene |
|---|---|---|---|
| 4.1 Una cosa sola | `6656b86555a809880898c4d4de77ee8c` | 5:30 | 50 |
| 4.2 L'apertura: i primi trenta secondi | `33920b956c76b078617a0ea9e7b0db3c` | 5:31 | 50 |
| 4.3 L'ordine delle idee | `a4a0a53fedc19292b0344b223727e22c` | 5:38 | 50 |
| 4.4 Concreto batte astratto | `79d5bda0bba88be7ea0c6ca26ee39d3a` | 5:37 | 50 |
| 4.5 La chiusura e la richiesta | `73bde8f710ddda508c1c53eb59e0f1a6` | 6:05 | 50 |

Durata del modulo: **28 minuti e 20 secondi**.

## È il modulo più tecnico del corso

Lo dice la nota di montaggio di ognuno dei cinque script, e ha una conseguenza
pratica: **nessuna delle cinque lezioni ha un aneddoto**. È l'unico modulo del
corso in cui non ce n'è nemmeno uno. Il metodo li prescrive, e qui gli script
li escludono esplicitamente — gli esempi sono già dentro le regole.

Al posto degli aneddoti ci sono le grafiche, e sono **cinquantaquattro**, più
quindici riprese Higgsfield. Il modulo cresce man mano: otto grafiche nella
4.1, otto nella 4.2, nove nella 4.3, dodici nella 4.4, diciassette nella 4.5.

## I copioni sono stati riscritti

| lezione | script | in video |
|---|---|---|
| 4.1 | 2.906 | 5.298 |
| 4.2 | 3.249 | 5.088 |
| 4.3 | 3.257 | 5.188 |
| 4.4 | 3.337 | 5.061 |
| 4.5 | 3.396 | 5.250 |

Lo schema è sempre lo stesso: gli script avevano le tesi — la regola della
cosa sola, le tre aperture, il criterio dell'ordine, la scala del concreto, i
tre elementi della richiesta — e quasi mai il perché. Il lavoro è stato
mettere sotto ogni regola il motivo per cui funziona, e sotto ogni errore il
segnale per accorgersene da soli.

Due passaggi che lo script chiedeva di non toccare, e che infatti sono stati
allargati invece che tagliati:

- **la scena 8 della 4.4**, il rovescio della medaglia: il concreto persuade a
  prescindere dal fatto che sia rappresentativo, funziona anche su un caso
  isolato, ed è il meccanismo su cui si regge buona parte della
  disinformazione. È l'unico punto in cui il corso dice che la propria tecnica
  può essere usata male, e il ponte con il modulo 5;
- **la scena 8 della 4.5**, il silenzio dopo la richiesta: la nota chiedeva
  pause lunghe davvero, perché il video insegna a tacere. Sono diventate la
  posa da dieci secondi su «taci» e quella da nove e mezzo sul numero tre —
  le due pause più lunghe di tutto il corso.

## Le grafiche che hanno funzionato meglio

- **la scala del concreto della 4.4** (`c14`–`c18`): la stessa slide cinque
  volte con il gradino acceso che scende, uno per blocco, come chiedeva la
  nota di montaggio;
- **la coppia di tabelle della 4.5** (`c27` e `c29`): gli stessi tre elementi
  — chi, cosa, entro quando — dentro due frasi. Nella seconda al posto dei
  valori ci sono tre trattini. Si legge in un secondo;
- **i due grafici a barre della 4.4** (`c33` e `c37`): venticinque parole
  contro otto, e un caso contro diecimila.

## Le icone

Nuove in questo modulo: `preambolo`, `scusa`, `indice` (4.2), `tre` (4.3),
`gradino`, `gonfia` (4.4), più `cestino` e `infondo` nate nella 4.1. Quattro
sono state ridisegnate o spostate dopo aver guardato il PNG — la regola del
repo per cui guardare i PNG è parte del lavoro ha pagato ogni volta:

- 4.1: l'orologio su «dopo» duplicava `momento` due slide prima → `infondo`;
- 4.2: `scusa` (due archi e un trattino) leggeva come una faccina → cerchio
  con un meno oro;
- 4.3: nelle schede delle tre strutture le icone della seconda e della terza
  erano scambiate → invertite, e nata `tre`;
- 4.5: le tre schede di «bisogna / si dovrebbe / andrebbe fatto» avevano tre
  icone che non dicevano niente di diverso l'una dall'altra → diventate un
  elenco.

Nella 4.1 si è aggiunto un controllo che prima non facevo: **la slide deve
stare sul blocco che la nomina**. Tre grafiche erano una o due scene più
avanti di dove la voce le annunciava, e le ho spostate.

## I tagli

| lezione | primo giro | secondo | ricostruzioni | controprove |
|---|---|---|---|---|
| 4.1 | 4 | 1, poi 0 al terzo | — | — |
| 4.2 | 1 | 0 | — | — |
| 4.3 | 2 | 0 | — | — |
| 4.4 | 2 | 0 | — | — |
| 4.5 | 3 | 1 | 2 | 1 (50 crediti) |

La 4.1 ha avuto bisogno di tre giri, la 4.5 di una ricostruzione a mano. È
la 4.5 che ha aggiunto due casi al repertorio di `STANDARD.md`.

Il primo: **una pausa fra due parole staccate confonde `correggi`**. Il blocco
`s26` legge «Chi. Cosa. Entro quando.» con tre stacchi veri, e il confine
precedente continuava ad agganciarsi a uno di quelli invece che al punto dopo
«tutti e tre». Risolto sulla mappa dei silenzi a 0,10 s invece che a 0,25.

Il secondo è quello già noto dal modulo 1, ma qui più netto: **quarantasei
pezzi e quarantasei confini non vogliono dire che siano appaiati**. Lo scriba
non ha mai prodotto la coda di `s43`, i pezzi sono scivolati di uno, e
`verifica.py` — che appaia per contenuto — non poteva accorgersene. Il segnale
è stato di nuovo quello dei caratteri al secondo: tre blocchi adiacenti a
24,8, 27,7 e 6,0. Ricostruiti dai caratteri, agganciati alle pause vere, e
confermati con una sola controprova di nove secondi che conteneva tutti e tre
gli spezzoni.

## Cosa resta da giudicare ad Achille

Non sento l'audio e non vedo il montato. Per ogni lezione ho controllato le
slide da ferme e tutti i tagli con la trascrizione. Restano da guardare le
**quindici riprese Higgsfield** del modulo: il proxy blocca il CDN in
scaricamento, quindi le ho descritte ma non viste.

Sulle durate: quattro lezioni stanno fra 5:30 e 5:38, la quinta a 6:05. Lo
sbalzo è voluto e sta tutto nelle pose della 4.5 — è la lezione che insegna a
tacere, e sarebbe stato strano farla di corsa. Lo script stesso dava 6:35 come
durata accettabile per via della chiusura di modulo.

Con la 4.5 il modulo 4 è chiuso. La slide finale annuncia **Modulo 5 —
Persuadere senza manipolare**, e il testo della lezione fa il ponte esplicito:
si comincia da cosa separa una richiesta da una pressione.
