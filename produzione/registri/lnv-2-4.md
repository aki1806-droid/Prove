# Registro — 2.4 «Le microespressioni: cosa sono e cosa non fanno»

È la lezione chiave del corso, e lo script lo dice in testa chiedendo registro
asciutto e nessuna ironia. È il punto in cui il corso smonta la promessa che
lo avrebbe venduto meglio di qualunque altra, e tiene fede a quello che
dichiara nella sua pagina sul metodo.

| campo | valore |
|---|---|
| video_id | `9f3220d21c45256509b20a6d43fc05af` |
| scene | 50 — copertina, 48 blocchi, chiusura |
| formato | 16:9, 1080p |
| durata | 598,9 s (9:59) |
| parlato | 585,9 s (561,1 s di voce tagliata + 24,8 s di pose) |
| voce | Luca Ward `tVdVcJPudubxmTmAw4tE`, `eleven_v4`, 1,12× in post |
| flow ElevenLabs | `HgV7iC0t0AHFKPwgkTIo` |
| tracce | A `giNVGybkVa7VmGgr7Zhh` · B `uZI5V6NzUQuwF7W5lJyD` · C `uEKYUHpAGwjl2lthJMBS` |

## Il copione è stato riscritto

Da **4.364** caratteri di parlato nello script a **10.358**, media 216 per
blocco. (Il conto dello script prende le righe citate che finiscono con un
punto — il parlato — e lascia fuori i testi di slide, che non ne hanno.
Con questa regola la 2.2 dichiarava 3.871 e la 2.3 4.297, vicini ai numeri
scritti nei loro registri; quello della 2.1, 5.375, non torna con nessuna
regola e va considerato sbagliato.) Lo script aveva già la struttura giusta — la promessa, i tre salti, i
numeri, il conto della frequenza di base, il danno — e quasi niente di quello
che serve a renderla convincente invece che assertiva.

Tre scene dello script sono marcate come intoccabili, e sono state scritte per
intero senza tagliare:

- **le due fonti con il loro anno** (`s15`–`s19`): la rassegna di De Pàulo e
  colleghi del 2003 e la meta-analisi di Bond e De Pàulo del 2006. Si dicono a
  voce con nome e anno, perché chi vuole deve poter andare a controllare;
- **il conto della frequenza di base per intero** (`s26`–`s31`): cento
  conversazioni, cinque menzogne, un metodo all'ottanta per cento, quattro
  bugie prese, diciannove sinceri segnalati, ventitré segnalazioni in mano.
  Saltare un passaggio del conto lo rende un'affermazione invece che
  un'aritmetica;
- **il danno concreto, ansiosi compresi** (`s34`–`s40`): chi accusa persone
  sincere, chi smette di verificare, e il fatto che il metodo colpisce più
  spesso chi è in difficoltà che chi mente — in un colloquio, in un pronto
  soccorso, in un'aula.

Nel dizionario di pronuncia: **DePaulo si scrive `De Pàulo`**, altrimenti la
voce lo legge all'italiana sulla *a*.

## Note di contenuto

La lezione separa con cura la parte descrittiva da quella applicativa: che i
movimenti brevissimi esistano non è in discussione, e la slide `c06` lo dice
prima di qualunque obiezione. Quello che non regge sono i tre salti che
vengono venduti insieme alla descrizione come se seguissero da soli.

Il dato sull'addestramento — più sicuri, non più accurati — richiama
letteralmente la frase di apertura della 1.1, e qui per la prima volta ha dei
numeri dietro invece di un'intuizione. È voluto: il corso chiude il cerchio sul
proprio claim.

**Cosa resta** non è una concessione di cortesia: un movimento breve dice
*quando*, e l'incongruenza dice *dove fare la prossima domanda*. È la stessa
mossa di tutto il corso applicata al materiale più spettacolare del campo.
Nessun aneddoto, come prevede lo script.

## Le grafiche

Quarantotto slide, di cui **dieci con un disegno o un'infografica** più una
slide a numero, e **due cicliche**: `c29` e `c37`. È la densità più alta del corso, e ha una ragione:
questa lezione argomenta con dei numeri, e i numeri detti a voce senza niente
a schermo non si seguono.

| slide | tipo | cosa mostra |
|---|---|---|
| `c08` | flusso | I tre salti in fila: il movimento, l'emozione, la menzogna, dal vivo. |
| `c13` | raggi | Le ragioni per cui si trattiene un'emozione, nessuna delle quali è una bugia. |
| `c16` | cartellino | De Pàulo e colleghi, 2003: centinaia di studi, zero indicatori che reggono. |
| `c19` | numero | 54% — poco sopra il lancio di una moneta. |
| `c21` | confronto | Addestrati e non addestrati: stessa accuratezza, fiducia molto diversa. |
| `c23` | bilancia | Il piatto che scende è la sicurezza. |
| `c27` | finestra | Cinque menzogne su cento conversazioni. |
| `c29` | imbuto (ciclica) | Dalle cento conversazioni escono ventitré segnalazioni. |
| `c30` | barre | Quattro bugie vere, diciannove persone sincere accusate. |
| `c37` | anello (ciclica) | Hai una lettura, non cerchi prove, la lettura resta. |
| `c48` | cruscotto | Quello che resta, in una riga. |

**Le ho guardate tutte e undici da ferme prima di animarle** — le dieci
figure più la slide a numero — e sette avevano un difetto che solo l'occhio
trova:

- `c08` — il `flusso` disegna da solo le frecce fra un riquadro e l'altro: le
  «→» che avevo messo nelle etichette uscivano doppie;
- `c13` — il centro di `raggi` sta dentro un cerchio piccolo, e
  «un'emozione trattenuta» ne usciva: ridotto a «trattenere». Un satellite
  andava a capo e si staccava dal punto: accorciato;
- `c16` — le due barre del `cartellino` erano entrambe a zero, e «centinaia di
  studi» appariva vuoto quanto «nessun indicatore». Messa la prima piena: è il
  contrasto a essere il punto;
- `c19` — il layout si chiama **`number`**, non `numero`, e i suoi campi sono
  `num`, `unit`, `fill`, `title`. Con il nome sbagliato il render si ferma;
- `c21` — `confronto` accende solo la colonna di destra, e l'enfasi era finita
  sulla fiducia di chi *non* è addestrato: colonne scambiate;
- `c30` — `barre` non conosce il campo `oro`: la barra accesa la sceglie
  `acceso`, e `oro` restava lì a non fare niente;
- `c37` — `anello` chiude il giro da solo: ripetere il primo passo come quarto
  lo mostrava due volte.

`c23` è l'unica `bilancia` del corso, e vale il promemoria: **il piatto più
pesante scende**, quindi la didascalia dice «il piatto che scende è quello che
pesa», mai «sale».

## Le due riprese

Lo script ne prevede due. Stesso mondo visivo del modulo 2 — stanza spoglia,
luce naturale di mattina da una finestra alta fuori campo, 50 mm, camera
ferma, legno chiaro e un blu spento, nessun volto.

| blocco | cosa | perché lì |
|---|---|---|
| `s11` | una pila di cartelline chiuse su un tavolo di legno chiaro | apre il secondo salto, quello in cui si passa dalla psicologia all'accusa: il fascicolo è il gesto di chi ha già deciso |
| `s33` | una sala d'attesa vuota, sedie allineate, nessuno | chiude il conto della frequenza di base, subito prima del danno concreto: è il posto dove quel conto arriva addosso a qualcuno |

Le ho **viste tutte e due** prima di montarle, entrambe alla prima
generazione.

## I tagli — e il controllo che non si è potuto fare

**Stesso limite di tutto il corso**: crediti ElevenLabs a zero, trascrizione di
verifica impossibile, nessun riconoscitore locale installabile perché la policy
di rete chiude `huggingface.co` e `openaipublic.azureedge.net`.
**I quarantacinque confini non sono stati verificati parola per parola.**

Su questa lezione il controllo di durata è stato rifatto meglio, e il metodo
ne esce migliorato per tutte (è scritto in `LNV_STANDARD-PRODUZIONE.md` §10).

**La banda va misurata sul parlato netto, non sulla durata lorda.** Sulla
durata lorda uscivano **tredici** confini sospetti su quarantotto, un numero
che non tornava con nessuna delle altre lezioni. La causa non era nei tagli:
un blocco fatto di frasi brevissime respira molto più di un periodo lungo, e
sulla durata lorda sembra letto piano. Togliendo i silenzi dalla durata di
ogni blocco i sospetti scendono a **otto**, e la traccia C diventa pulita del
tutto.

**Due ipotesi provate e cadute**, scritte perché nessuno le riprovi:

- *i confini sono le pause più lunghe della traccia.* Non è vero: qui la
  quindicesima pausa più lunga misura 0,64 s e la sedicesima 0,62. Fra la
  pausa di paragrafo e quella di frase non c'è nessuno stacco;
- *il metro giusto sono le sillabe.* L'italiano ha parole lunghe con poche
  sillabe, e un blocco scritto così sembra letto in fretta. Contando i gruppi
  di vocali invece dei caratteri i confini fuori banda passano da otto a nove:
  i due metri sono quasi lo stesso. Restano i caratteri.

**Un confine corretto a mano.** Il `s33` leggeva a 23,6 caratteri al secondo
contro una media di 18,4, e `s32` era lungo di 1,42 s: il confine fra i due
era caduto troppo tardi. Provate tutte le pause dell'intorno, quella a
200,11 s rimette entrambi in banda (−0,48 e −0,06). Spostato lì.
**Dopo una correzione a mano non si rifà `allinea`**: azzererebbe
`tagli.json`.

Restano **sette blocchi** fuori banda: `s05` −2,14, `s06` +2,02, `s07` +1,85,
`s09` −3,26, `s11` +1,97, `s29` +3,44, `s30` −1,80. Per ognuno ho provato
tutte le pause dell'intorno e nessuna migliora la coppia: i confini scelti
sono già i migliori disponibili. Due hanno una spiegazione che non è un taglio
sbagliato — `s29` è il blocco pieno di numeri scritti a parole
(«novantacinque», «diciannove», «venti per cento»), che la voce dice lenta, e
`s09` è fatto di parole lunghe e di una tripla ripetizione che corre. **Vanno
risentiti quando i crediti tornano.**

**La garanzia che invece si può dare**: tutti e quarantacinque i tagli cadono
dentro un silenzio, il più stretto di 0,36 s con 0,18 s di margine per lato.
Nessuna parola è spezzata. È una cosa diversa dalla banda, e va letta a parte:
uno scarto fuori banda dice che il blocco non dura quanto il suo testo
prevede, non che una parola sia stata tagliata.

## Le pose

24,8 secondi in tutto, il valore più basso del modulo. Il parlato tagliato è
561,1 s, più lungo del solito perché il copione è il più fitto della serie:
resta meno da distribuire per arrivare ai 587.

## Da verificare

Non sento l'audio e non vedo il montato. Ho guardato tutte e undici le slide
con un disegno e tutte e due le riprese. **I quarantacinque tagli non sono
verificati con la trascrizione**, per i crediti esauriti.

## Blocchi

`·` disegno o infografica · `▪` ripresa

| blocco | slide | tipo | durata (s) | posa (s) |
|---|---|---|---|---|
| s02 | `c02` | frase | 12.01 | +0.00 |
| s03 | `c03` | elenco | 11.62 | +0.95 |
| s04 | `c04` | elenco | 12.18 | +0.95 |
| s05 | `c05` | memo | 14.33 | +0.65 |
| s06 | `c06` | frase | 13.32 | +0.00 |
| s07 | `c07` | frase | 13.63 | +0.00 |
| s08 | · `c08` | flusso | 14.05 | +1.35 |
| s09 | `c09` | frase | 9.58 | +0.00 |
| s10 | `c10` | sostituzione | 12.57 | +0.95 |
| s11 | ▪ cartelline-sul-tavolo | ripresa | 13.79 | — |
| s12 | `c12` | frase | 11.66 | +0.00 |
| s13 | · `c13` | raggi | 13.84 | +1.35 |
| s14 | `c14` | sostituzione | 16.80 | +0.95 |
| s15 | `c15` | frase | 9.74 | +0.00 |
| s16 | · `c16` | cartellino | 13.93 | +1.35 |
| s17 | `c17` | memo | 12.09 | +0.65 |
| s18 | `c18` | frase | 11.66 | +0.00 |
| s19 | `c19` | numero | 11.91 | +0.00 |
| s20 | `c20` | frase | 9.86 | +0.00 |
| s21 | · `c21` | confronto | 13.98 | +1.35 |
| s22 | `c22` | frase | 10.87 | +0.00 |
| s23 | · `c23` | bilancia | 12.56 | +1.35 |
| s24 | `c24` | memo | 4.65 | +0.98 |
| s25 | `c25` | frase | 14.53 | +0.00 |
| s26 | `c26` | frase | 12.37 | +0.00 |
| s27 | · `c27` | finestra | 11.09 | +1.35 |
| s28 | `c28` | frase | 11.05 | +0.00 |
| s29 | · `c29` | imbuto | 18.68 | +1.35 |
| s30 | · `c30` | barre | 12.22 | +1.35 |
| s31 | `c31` | frase | 11.05 | +0.00 |
| s32 | `c32` | frase | 12.46 | +0.00 |
| s33 | ▪ sala-attesa-vuota | ripresa | 8.79 | — |
| s34 | `c34` | frase | 11.09 | +0.00 |
| s35 | `c35` | frase | 12.11 | +0.00 |
| s36 | `c36` | frase | 11.16 | +0.00 |
| s37 | · `c37` | anello | 13.81 | +1.35 |
| s38 | `c38` | frase | 9.82 | +0.00 |
| s39 | `c39` | sostituzione | 12.68 | +0.95 |
| s40 | `c40` | elenco | 11.80 | +0.95 |
| s41 | `c41` | frase | 12.79 | +0.00 |
| s42 | `c42` | sostituzione | 13.97 | +0.95 |
| s43 | `c43` | frase | 13.52 | +0.00 |
| s44 | `c44` | frase | 10.87 | +0.00 |
| s45 | `c45` | memo | 4.65 | +1.45 |
| s46 | `c46` | frase | 12.37 | +0.00 |
| s47 | `c47` | frase | 10.82 | +0.00 |
| s48 | · `c48` | cruscotto | 12.88 | +1.35 |
| s49 | `c49` | elenco | 18.70 | +0.95 |
