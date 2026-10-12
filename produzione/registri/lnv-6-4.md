# Registro — 6.4 «Cosa farne: la prossima domanda»

Tre lezioni di cautele, e qui arriva la parte che si usa. La domanda della
lezione è quella che uno studente si fa subito dopo aver imparato che
un'incongruenza non prova niente: **e allora cosa ne faccio?** La risposta
sono tre mosse in ordine di invadenza — non fare niente, cambiare
direzione, nominare il fatto — con la regola che le tiene insieme: **si
parte sempre dalla meno invadente che fa il lavoro**, e quasi sempre la
meno invadente basta.

La mossa centrale è la seconda, e la lezione la tratta per quello che è: la
più utile delle tre e quella che da fuori non si vede. Si torna
sull'argomento in cui l'incongruenza è comparsa, non sul segnale. «Sui
tempi, dicevi?» — tre parole, e il punto è riaperto senza mettere nessuno
sotto esame. Il vantaggio è un'asimmetria: **se avevi ragione ottieni
qualcosa, se avevi torto non perdi niente**, e nessuna delle altre due
mosse ha un conto così favorevole.

La terza mossa ha una regola sola che la rende accettabile: **nomini il
fatto, non il significato.** «Ti vedo perplesso» è un fatto osservabile e
restituisce all'altro la lettura del proprio stato; «non ti fidi» è una
diagnosi, gliela toglie, e quasi sempre ottiene una smentita — non perché
sia falsa, ma perché nessuno accetta volentieri di essere letto dentro da
chi non ha chiesto il permesso. E la smentita costa doppio: da quel momento
la persona si controlla.

Poi la formulazione che la lezione consegna come la frase più usata di
tutto il corso — **«C'è qualcosa che non ti convince, su questo?»** —
smontata parola per parola in quattro ragioni; la regola del silenzio dopo
averla fatta (**taci**, tre secondi contati); e l'ultima regola, che vale
per tutte e tre le mosse: **una per conversazione**. Chi torna su due, tre,
quattro incongruenze non sta più facendo domande, sta conducendo un esame.
Lo strumento si consuma usandolo troppo.

| campo | valore |
|---|---|
| video_id | `0155f3d29775bb71abffc600802bc260` |
| scene | 50 — copertina, 48 blocchi, chiusura |
| formato | 16:9, 1080p |
| durata | 598,6 s (9:59) — misurata sul montato |
| parlato | 586,8 s (560,3 s di voce tagliata + 26,5 s di pose) |
| voce | Luca Ward `tVdVcJPudubxmTmAw4tE`, `eleven_v4`, 1,12× in post |
| flow ElevenLabs | `OBdGXJk5hzuW7n1ed9yI` |
| tracce | A `3RHU0mv2QwXQksfXTk9k` · B `copn2sviFQI1zJJXwWtp` · C `6aLqGFUYn716HqAQ945G` |
| batch HeyGen | `34af91fabbfb4064864d04fe80280648`, 96 file |

## Il vincolo del modulo, e la seconda espressione idiomatica

Qui il controllo torna nella forma silenziosa delle altre lezioni: la
radice di «menzogna» e «bugia» non compare mai, e `blocchi.py` lo verifica
da sé. Il filtro ha però trovato un caso nuovo. La formulazione dello
script per la terza mossa era «nessuno accetta di essere letto **nella
mente**»: `\bment(e|ono|endo|ire)\b` la prende, perché il confine di parola
c'è, ma *nella mente* è il sostantivo, non il verbo — esattamente come *in
mente*, l'eccezione trovata nella 6.3.

Due decisioni, non una:

- il filtro ha ora **due eccezioni idiomatiche escluse a mano**, `in mente`
  e `nella mente`, e sono scritte nel codice con il commento che spiega
  perché;
- il blocco è stato comunque **riscritto** in «essere letto **dentro**»,
  che è più diretto e non chiede nessuna eccezione per passare.

Il secondo intervento rende il primo superfluo in questa lezione, e serve
nelle prossime: l'eccezione resta nel filtro perché la frase può ricomparire.

## Le note dello script

**«La scena 11 è la formulazione che gli studenti useranno di più: la slide
resta a schermo per tutta la scena.»** La scena 11 occupa `s31`–`s35`: la
frase per intero e poi le sue quattro ragioni, una per blocco. La slide è
quindi la stessa cinque volte di fila — `c31`–`c35`, titolo identico — e
quello che cambia è soltanto l'occhiello, che dice quale delle quattro
ragioni la voce sta spiegando. La frase non si muove dallo schermo per
cinquantatré secondi.

**Nessun aneddoto.** Rispettato.

## Il copione

Da **3.950** caratteri di parlato nello script a **10.382**, media 216 per
blocco. Lo script chiede 0,95×, cioè il passo normale del corso: niente da
compensare, a differenza della 6.3.

Il copione sta in cima alla banda (10.150–10.400), e questo si vede nelle
pose: **26,5 s**, le più corte del modulo, contro i 42 s della 6.2 e i 49
della 6.3. Il parlato è lo stesso — 586,8 s — ma qui è quasi tutto voce.

Quello che il copione aggiunge:

- **perché sembra inutilizzabile e invece si usa** (`s03`): una cosa che
  non si può concludere sembra una cosa che non si può usare, e il
  malinteso nasce dai manuali, dove la mossa dopo è sempre dire all'altro
  quello che si è capito;
- **che la prima mossa è una decisione** (`s04`, `s10`): quella che nessuno
  considera una mossa è quasi sempre la più sensata della giornata, anche
  se non dà nessuna soddisfazione;
- **che cosa cambia rispetto alla 1.5** (`s05`): là erano tre consigli
  generici su come guardare senza concludere, qui si sa *quando* usarle e
  **su che cosa**: non su una persona, su un punto preciso;
- **perché l'ordine conta** (`s09`): si parte dalla meno invadente che fa
  il lavoro, non dalla più efficace;
- **che un'incongruenza notata e non toccata resta disponibile** (`s13`):
  domani ci si può ancora fare qualcosa, mentre una toccata male non torna
  più — è l'argomento pratico a favore del non fare niente;
- **le varianti della seconda mossa** (`s18`, `s19`): «torniamo un attimo
  sui tempi», «sui tempi mi interessa capire meglio», «scusa, sui tempi:
  come siete messi davvero?» — la forma cambia poco, conta che la domanda
  abbia un oggetto, e che l'oggetto sia l'argomento. **L'argomento si può
  nominare, la persona no;**
- **l'asimmetria come conto esplicito** (`s23`): tutto il vantaggio della
  seconda mossa in una riga, e il fatto che le altre due non l'abbiano;
- **i tre modi di riempire il silenzio** (`s38`): un esempio in più, un «non
  so» che attenua, una risposta suggerita per mettere a suo agio — chiudono
  tutte e tre, e si fanno tutte e tre con le migliori intenzioni;
- **cosa arriva nel terzo secondo** (`s39`): spesso la cosa che cercavi,
  perché nei primi due stava ancora decidendo se dirtela;
- **perché l'esame si sente** (`s41`): anche se ogni singola domanda, presa
  da sola, era innocua — è il ripetersi a fare l'esame, non la domanda;
- **quanto in fretta si consuma lo strumento** (`s42`): bastano due domande
  di troppo nella stessa mezz'ora;
- **che le altre incongruenze non spariscono** (`s46`): si ritrovano
  domani, se c'erano davvero.

## Le grafiche

Quarantotto slide, di cui **tre con un'infografica** e **nessuna ciclica**:

| slide | tipo | cosa mostra |
|---|---|---|
| `c09` | pila | le tre mosse impilate per invadenza, con la prima accesa |
| `c23` | confronto | la seconda mossa nei due casi: avevi ragione / avevi torto |
| `c26` | confronto | «Ti vedo perplesso» contro «Non ti fidi» |

`c23` è la slide che regge l'argomento della lezione, e il confronto la
rende leggibile in due righe: *che cosa ottieni* — qualcosa / niente; *che
cosa perdi* — niente / niente, con la seconda riga segnata. È la forma più
chiara che l'asimmetria abbia preso in tutto il corso.

Le liste ripetute sono due: le tre mosse (`c04`, poi `c06`–`c08` con una
riga accesa alla volta) e i quattro errori da evitare (`c41`–`c44`).

**Nessuna correzione.** Quarantotto slide, quattro fogli di contatto
guardati uno per uno, niente da rifare — come nella 6.1.

## I tagli: due confini sbagliati, e il pool fine dei silenzi

Quarantacinque confini. `banda.py` ne segnalava **tre** (`s11`, `s12`,
`s29`); la trascrizione ha trovato **due sbagliati davvero** (`s11` e
`s28`), tutti e due in ritardo di una frase.

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

Si vede di nuovo quello che il modulo 5 aveva insegnato: **la banda indica
dove guardare, non chi ha sbagliato.** `s11` era segnalato e sbagliato;
`s28` era sbagliato e non segnalato; `s12` e `s29` erano segnalati e
giusti, e sono i vicini dei due colpevoli.

| blocco | prima | dopo |
|---|---|---|
| `s11` | «ma non è il momento» | «non ti ha offerto e che non ti deve» |
| `s28` | «smentita che costa doppio» | «non ha chiesto il permesso di farlo» |

`tagli.py correggi` ha sistemato `s11` al primo colpo (156,89 → 153,28).
Su `s28` ha **oltrepassato**: dal 150,07 di partenza è andato a 142,06,
circa sei secondi oltre il punto giusto. La ragione è la stessa della 6.2:
la stima si fa contando caratteri a velocità fissa, e quando nel pool
grosso dei silenzi non c'è un candidato vicino al bersaglio, `correggi`
prende il più vicino che trova — che può stare molto più indietro.

Il silenzio giusto c'era, ma **solo nel pool fine**: `tagli.silenzi(path,
0.08)` lo dà a **147,92**, e `muovi.py . B s28 147.92` l'ha messo lì. Dopo
lo spostamento `banda.py banda` non segnala più niente, e `banda.py
silenzi` dichiara quel confine «non in un silenzio» — correttamente, dal
suo punto di vista: la pausa è sotto la sua soglia grossa. **È un falso
allarme previsto**, e la clip di controllo lo chiude: «Uno che non ha
chiesto il permesso di farlo».

Delle altre quarantatré code, **otto** sono state riascoltate a mano per la
ragione ormai nota — la finestra di 1,6 s taglia a metà la prima parola e
`scribe` la inventa: *domanda* letta «manda», *domani* letto «mani»,
*ancora* letto «ora», *comunicando* letto «chiedendo». In tutti e otto i
casi la coda finiva dove doveva. Un nono caso è nuovo e innocuo: su `s36`
la finestra ha restituito **una parola sola**, «Taci.» — che è davvero
l'ultima parola del blocco.

## Le riprese

Due, `s14` e `s30`, **viste tutte e due**. Higgsfield ha rifiutato per la
settima lezione di fila (tetto giornaliero del piano), quindi anche queste
sono nate sul nodo ElevenLabs con **Nano Banana 2**, 406 crediti l'una.

- **`s14`** — un quaderno aperto su una scrivania, una sola riga scritta a
  mano su una pagina altrimenti bianca, grafia non leggibile. Arriva su «la
  seconda è quella che userai di più, ed è quella che nessun corso
  insegna»: la riga scritta a mano è l'appunto che non c'è nei manuali;
- **`s30`** — due tazze su un tavolo di legno, una ancora piena, luce di
  pomeriggio. Arriva su «e c'è una formulazione che funziona meglio di
  tutte»: la conversazione a due in cui la frase si dice.

Nessuna persona, nessuna scritta leggibile, nessun marchio.

## Il montato è stato verificato scena per scena

`get_video_scenes`: **cinquanta scene**, le due immagini esattamente alle
scene 14 e 30 (cioè `s14` e `s30`), **nessuna scena in `playback: loop`** e
tutte le altre in `freeze` con `volume: 0`. Copertina con la traccia muta
da 3 s, chiusura con quella da 10 s. 16:9, 1080p.

Durata finale **598,6 s**, come le ventotto che la precedono.
