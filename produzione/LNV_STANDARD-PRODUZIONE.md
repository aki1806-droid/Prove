# Standard di produzione — corso «Capire i segni del linguaggio non verbale»

Istanza di `MASTER.md` per il secondo corso di Achille Pagliaro. Vale quello che
sta in `MASTER.md`; qui ci sono solo i valori delle variabili e le due o tre
cose che in questo corso sono diverse.

**Sette moduli, trentacinque lezioni, dieci minuti l'una.**

---

## 1. Scheda parametri

```
TEMA
  corso             Capire i segni del linguaggio non verbale
  moduli            7 × 5 lezioni = 35
  etichetta         "Modulo N · Lezione N.M"
  a chi parla       seconda persona singolare
  registro          asciutto. Nessun compiacimento quando si smonta un mito

COLORI                                    (identici a «La Parola Giusta»)
  fondo chiaro      #F7F3EA
  testo             #12294A
  accento           #C39A4E
  fondo tenue       #E2D2B0               slide degli errori
  fondo profondo    #0B1B33               memo, testo in accento

DURATA
  obiettivo         10:00
  copertina         3 s
  chiusura          10 s
  pausa senza voce  0 s                   salvo dichiarazione nello script

VOCE
  voce              Luca Ward  tVdVcJPudubxmTmAw4tE
  modello           eleven_v4
  velocita'         1,12× in post
  avatar            NESSUNO
```

## 2. Niente avatar

È la differenza che conta rispetto a quello che gli script danno per scontato.
Gli script del corso usano cinque tipi di schermata; senza avatar diventano
quattro, e la mappatura è questa:

| nello script | qui |
|---|---|
| **A** avatar | slide a piena inquadratura — frase, citazione o elenco |
| **B** avatar + slide | la slide che lo script specifica, a piena inquadratura |
| **C** slide | slide, come scritto |
| **D** videoclip | ripresa generata, a pieno schermo |
| **E** memo | memo su fondo profondo, come scritto |

Non si perde niente: le scene A e B dello script portano già il testo parlato,
e quel testo diventa due o tre blocchi con la loro slide. Si guadagna che ogni
concetto ha la sua inquadratura, che è la regola del canale.

## 3. L'aritmetica dei dieci minuti

```
T_parlato  = 600 − 3 − 10            = 587 s
CARATTERI  = 587 × 18                ≈ 10.500
BLOCCHI    ≤ 50 − 2                  = 48
caratteri per blocco                 ≈ 220
```

**Duecentoventi caratteri per blocco sono sopra i 100–150 che `MASTER.md`
chiama ideali, ed è una conseguenza diretta del tetto di cinquanta scene.** Non
c'è modo di starci dentro altrimenti: una lezione da dieci minuti con blocchi
da 150 caratteri vorrebbe settanta scene. Quindi i blocchi sono lunghi, e la
slide che ci sta sopra deve reggere due frasi invece di una. In pratica:

- il **memo** e la **citazione** restano corti, e si tengono per le svolte;
- la **frase** porta due periodi, non uno;
- gli **elenchi** e i **diagrammi** fanno il lavoro pesante, perché una figura
  regge un blocco lungo meglio di un titolo.

Gli script che arrivano stanno sui **4.000–4.800 caratteri**: vanno riscritti a
poco più del doppio. È il caso normale, non un'eccezione.

### La taratura va rifatta ogni volta che la voce cambia velocità

I 18 car/s della formula sono una stima, e la stima invecchia. Il conto che
conta è quello misurato: `banda.py banda` stampa in testa a ogni traccia i
**caratteri al secondo di parlato netto**, e la somma dei supplementi di
posa si legge in coda a `pose.py`.

Alla taratura di ottobre 2025 — voce Luca Ward, `eleven_v4`, 1,12× in post,
silenzi rimossi — la lettura sta intorno ai **18,2 car/s** e il supplemento
di slide di una lezione normale sta intorno ai **27 s**. A quei due numeri il
bersaglio di 587 s si raggiunge con **10.150–10.250 caratteri**, non con i
10.500 della formula.

La 4.1 è stata scritta sulla forbice vecchia ed è uscita dieci secondi lunga:
la correzione è costata 213 caratteri tolti, un chunk rigenerato e cinque
spostamenti di confine rifatti da capo. **Si misura prima di generare la
voce**, non dopo: basta dividere i caratteri del copione per i car/s
dell'ultima lezione e aggiungere il supplemento di posa.

## 4. La voce, in tre tracce

`eleven_v4` al posto di `eleven_v3` dei moduli 6–8 del primo corso. Il limite
per generazione resta prudenzialmente **5.000 caratteri**, quindi un copione da
10.500 sta in **tre** tracce, non in due. Gli stacchi vanno su cambi di
capitolo, dove il cambio di tono è voluto.

Misurato sulla 1.1: la voce esce a **16 caratteri al secondo** sul grezzo, che
dopo il filtro a 1,12× diventano i 18 su cui è fatto il conto qui sopra.

`creative_generate_speech` in questa sessione risponde malformato. La via che
funziona è il canvas: `creative_create_flow`, poi un `creative_add_flow_node`
di tipo `tts` per ogni traccia (`model_parameters` vuole `voice`, non il
deprecato `voice_id`), poi `creative_run_flow_nodes` con tutti e tre i nodi.
Attenzione: un nodo mandato in esecuzione così produce **quattro** varianti.
Si tiene la prima e si ignorano le altre.

### 4-bis. Dal modulo 7 si prova l'altra strada

**Con quale strumento generare la voce si chiede ad Achille prima di ogni
video** (vedi `CLAUDE.md`). Per il modulo 7 la risposta è già data: si prova
**HeyGen come passante verso ElevenLabs**, per decidere sui fatti.

La stessa voce e lo stesso modello, fatturati da HeyGen:

```
create_speech
  voiceId   e4bd8d8a357f41a99502309874733c16   ← "Luca Ward" privata su HeyGen
  engine    elevenlabs
  settings  {"model_id": "eleven_v4"}
  language  it
```

(La stessa voce su ElevenLabs diretto è `tVdVcJPudubxmTmAw4tE`. Che siano la
stessa registrazione è plausibile ma **non dimostrato**: la voce HeyGen è
privata, senza preview e con `language: unknown`.)

**Perché vale la pena provarla.** `create_speech` restituisce `duration` e i
**tempi di inizio e fine di ogni parola**. È esattamente l'informazione che
`tagli.py` dice in testa di non poter avere — «la trascrizione di ElevenLabs
NON restituisce i tempi per parola: da qui questo giro» — e su cui è costruito
tutto il §10-bis. Con i tempi per parola, `prova.mp3`, la trascrizione con
`scribe`, `banda.py`, `correggi` e le clip di controllo **non servono più**:
dove finisce un blocco non si stima, si legge.

**Il costo, misurato il 13 ottobre 2026 e non stimato:**

| campione | durata | crediti |
|---|---|---|
| un blocco | 12,83 s | 1 |
| cinque blocchi | 68,36 s | 4 |

Cioè **1 credito ogni 17–20 secondi**, arrotondati per eccesso **a ogni
chiamata**: una lezione da 587 s di parlato costa **~33 crediti** in tre
tracce lunghe e **48** generata blocco per blocco. Un motivo in più, oltre al
tono, per non spezzare. Contro i ~10.400 crediti ElevenLabs ($1,73) più i
~1.000 di trascrizione che costa oggi.

**Le due incognite sono state chiuse il 14 ottobre, con cinque campioni.**

**1. Il timeout: il limite sta fra 3.097 e 3.401 caratteri.**

| caratteri | durata | esito |
|---|---|---|
| 203 | 12,8 s | passa |
| 1.150 | 68,4 s | passa |
| 2.243 | 143,7 s | passa |
| 2.526 | 164,6 s | passa |
| 3.097 | 192,5 s | passa |
| 3.401 | — | **timeout a 60 s** |

Conseguenza di progetto: con HeyGen un copione da 10.400 caratteri va in
**quattro tracce da ~2.600**, non in tre da ~3.470. Quattro stacchi invece di
tre, su cambi di capitolo come sempre. È il prezzo della strada, ed è piccolo:
il tono si riazzera quattro volte in dieci minuti invece di tre, contro le
quarantotto di una generazione blocco per blocco.

**2. Il ritmo: HeyGen è più LENTO, non più veloce.**

| | caratteri al secondo sul grezzo |
|---|---|
| ElevenLabs diretto (le tre tracce della 6.5) | **16,25** |
| HeyGen v4 (i tre campioni lunghi) | **15,71** |

Il 3,3% in meno. **Il «5% più veloce» scritto il 13 ottobre era sbagliato**, e
vale la pena dire perché: confrontava un campione da 229 caratteri (17,4
car/s) con la media di una traccia intera. I campioni corti hanno meno pause
di frase e sembrano più veloci; il confronto si fa solo fra testi di lunghezza
confrontabile.

Con HeyGen l'`atempo` va quindi da 1,12 a **1,16** — `1.12 × 16.25 / 15.71` —
e **le due sorgenti non si mescolano dentro lo stesso corso**. Il modulo 7 è
il punto giusto per cambiare perché è un modulo intero; a metà modulo no.

**Il costo, rimisurato su cinque campioni:** 30 crediti per 500,8 s, cioè **un
credito ogni 16,7 secondi**. Una lezione da 587 s costa **~35 crediti** in
quattro chiamate. La stima del 13 ottobre (1 credito ogni 17–20 s, ~33 a
lezione) era ottimista di poco.

Il confronto A/B sul blocco `s34` della 6.5, grezzo contro grezzo, sta in
`produzione/prove/voce-heygen-v4/`.

## 5. Vincoli di contenuto del corso

Non sono scelte di stile: sono il motivo per cui il corso esiste, e gli script
li dichiarano in testa a ogni modulo.

- **Nessun segnale nominato senza la sua condizione.** Mai «braccia conserte =
  chiusura»;
- **nessuna formulazione che suggerisca di rilevare la menzogna.** Il corso
  dice l'opposto, con i numeri;
- **dove si smonta un mito, la fonte si dice a voce**, con l'anno;
- **nessuna tabella FACS riprodotta**, in nessuna scena: è materiale protetto, e
  la 2.2 lo dichiara a voce. Quella scena non si taglia.

## 6. Il dizionario di pronuncia

Si aggiunge in testa a ogni traccia generata, nella forma che la voce legge.

| scritto | si legge |
|---|---|
| Mehrabian | Meeràbian |
| Ekman | Écman |
| Barrett | Bàrret |
| FACS | facs |
| DePaulo | De Pàulo |
| Duchenne | Duscèn |
| Hall | Hool |
| Carney | Carni |
| Cuddy | Cadi |
| Yap | Iap |
| Ranehill | Rànehill |

**Nel parlato si scrive la forma che la voce legge; sulle slide si scrive la
grafia vera.** L'accento serve solo dove la sillaba tonica italiana sarebbe
sbagliata: «Carni», «Cadi» e «Iap» non ne hanno bisogno, «Rànehill» sì. Ed è
l'unica eccezione alla regola che nei blocchi non entrano caratteri
accentati: `blocchi.py` della 4.4 la dichiara in una lista invece di
allentare il controllo.

## 7. Gli aneddoti

Come nel primo corso: **si inventano, in prima persona, senza segnaposti e
senza chiedere** (`MASTER.md` §0.2). Gli script del modulo 1 ne chiedono in
ambiente ospedaliero — corsia, pronto soccorso, turni — perché è il mondo da
cui arrivano gli esempi. Si scrivono coerenti con quel mondo, senza dettagli
verificabili, e il registro dice quali scene li contengono.

**Ma ogni modulo decide per sé, e lo dice nelle note dell'ultima lezione.** Il
modulo 2 e il modulo 3 scrivono «Nessun aneddoto», e vale per tutte e cinque le
lezioni del modulo. La nota sta in fondo allo script, cioè nel punto in cui la
si legge per ultima: **va cercata prima di scrivere la prima lezione**, non
dopo aver montato la terza. È costato il rifacimento della 3.2 e della 3.3.

**Nel modulo 4 la nota è per lezione, non per modulo**: la 4.1 e la 4.3
scrivono «Nessun aneddoto», la 4.2, la 4.4 e la 4.5 non dicono niente. Quindi
vanno lette tutte e cinque le note prima di cominciare, non solo l'ultima.

## 7-bis. I difetti di layout che si vedono solo guardando

Le slide si guardano da ferme **prima** di animarle, tutte, non solo quelle
con un disegno. Questi difetti non danno nessun errore e si vedono
soltanto a occhio:

- **`raggi` disegna solo i primi quattro satelliti** (`c.attorno.slice(0, 4)`)
  e scarta il resto in silenzio. Se le voci sono più di quattro, vanno
  raggruppate (3.4, `c22`);
- **in `raggi` il `d` di un satellite è un numero da 0 a 100**, cioè la sua
  distanza dal centro. Una stringa non dà nessun errore: diventa `NaN` e
  ammucchia tutte le etichette nello stesso angolo (5.4, `c08`). Con `d`
  numerico la figura si dispone bene anche con tre satelliti;
- **il `centro` di un `raggi` sta in due parole corte.** Il cerchio ha un
  raggio fisso e il testo non lo allarga: «Quanto si gesticola» sborda,
  «La quantità» no (5.1, `c16`);
- **`quadranti` non disegna le etichette dei poli degli assi.** Vanno scritte
  dentro le celle, o i quattro riquadri sono indistinguibili (3.4, `c34`);
- **la didascalia di una figura sta in una riga.** A due righe la figura si
  alza e il kicker finisce sopra il logo; a tre righe l'ultima riga finisce
  sopra il filetto (3.3 `c22`, 3.5 `c20` e `c33`);
- **`confronto` accende la colonna di destra**, riga per riga con `segna`;
  **`bilancia` fa scendere il piatto più pesante**, quindi la didascalia deve
  dire «pesa», non «vince»;
- **i parametri delle figure non passano da un renderer HTML**: `centro` del
  `raggi` e `da` del `bivio` stampano `<br>` alla lettera (4.1, `c13` e
  `c33`). Prendono testo semplice, e vanno a capo da soli;
- **le etichette dentro una figura hanno una larghezza fissa.** Nell'`imbuto`
  sforano la casella, nel `flusso` escono dal riquadro e le frecce ci passano
  sopra. Stanno in due parole, e quello che non ci sta va nel `sub` (4.3,
  `c09` e `c34`);
- **`pila` impila dal basso**: `blocchi[0]` è il blocco più in basso e
  `blocchi[-1]` quello in cima. Un elenco ordinato va quindi scritto **al
  contrario** di come si dice, altrimenti si legge all'incontrario
  dall'alto (5.3, `c05` e `c15`). La stessa cosa decide dove sta l'`acceso`:
  «l'ultima voce di un elenco lungo» va messa in fondo, non in cima;
- **nel corsivo di `memo` e `quote` la sequenza `'è` si accavalla.**
  L'apostrofo e l'accento grave finiscono uno sull'altro e «cos'è» si legge
  «cos'e» con uno sgorbio sopra (4.3, `c24`). Nel tondo è solo stretta, e si
  legge. Nel corsivo si scrive per esteso: «come è», «che cosa è». **E
  quando tutte le righe del memo ne hanno uno**, come nella 6.5 («Non devi
  dire cos'è. Devi dire che c'è, e che non è lui.»), la slide si riformula
  senza — «Non devi spiegare. Devi solo dire che non è lui.» — e la voce dice
  la frase dello script per intero;
- **`list` regge sette righe.** Fino alla 6.2 il massimo usato era sei; le
  sette cause ordinarie della 6.3 (`c05`–`c12`) stanno nel riquadro senza
  stringersi, con la riga accesa e la nota sotto. Oltre le sette non è stato
  provato;
- **una slide che deve restare a schermo per tutta la scena** si fa tenendo
  lo stesso titolo su più schermate e cambiando solo l'occhiello, che dice
  quale pezzo la voce sta spiegando. È la risposta alle note di script che
  chiedono «la slide resta a schermo per tutta la scena»: 6.4 su cinque
  schermate (`c31`–`c35`), 6.5 su cinque (`c30`–`c34`) e su tre
  (`c25`–`c27`). La frase non si ri-anima: cambia la riga piccola sopra.

## 7-ter. Il montato si rilegge prima di dirlo finito

Le scene si passano a `create_video_from_studio` **esattamente come
`scene.py` le scrive in `scene.json`**, mai ricostruite a mano: la 3.1 e la
3.2 sono state rimontate per questo, una con `freeze` dove voleva `loop` e
l'altra con il `loop` sulla scena successiva a quella giusta.

Dopo il montaggio si rilegge con `get_video_scenes` e si confronta con
`scene.json`: la modalità di ogni scena, la posizione delle riprese, l'ordine
degli audio. La durata che torna a un decimo di secondo conferma solo
l'ordine degli audio, non le modalità.

## 7-quater. La slide si rilegge muta

Un difetto di layout si vede; un difetto di senso no. Una slide scritta
mentre si ha in testa la frase parlata regge perché la voce la sostiene, e
poi da sola dice un'altra cosa — o il contrario di quella giusta.

**Ogni slide va riletta senza la voce sotto**, come la legge chi guarda. Nella
4.2 ne sono uscite tre:

- `c05` diceva «Non è stata verificata e ha dato risultati deboli. / Non è mai
  stata verificata.» Nel parlato la prima parte sta dentro una negazione
  («e non è che sia stata verificata e…»); sulla slide, senza quella
  negazione, le due righe si contraddicono;
- `c16` rispondeva «Sessant'anni» alla riga «Studi a cui rimandare»: una
  durata non risponde a una domanda su quanti studi ci sono;
- `c19` andava a capo tre volte.

La regola pratica: **se la slide da sola dice una cosa diversa da quella che
si sente, è la slide a essere sbagliata**, perché è lei a restare in scena.

## 8. Come si chiamano le cose

I copioni del primo corso stanno in `produzione/copioni/` con nomi tipo
`1-1-blocchi.json`, e questo corso ha anche lui un modulo 1 e una lezione 1.1.
Per non sovrascriverli, **tutto quello che riguarda questo corso porta il
prefisso `lnv-`**:

```
produzione/copioni/lnv-1-1-blocchi.json     i 48 blocchi parlati
                   lnv-1-1-chunks.json      quali blocchi in quale traccia
                   lnv-1-1-slides.json      le 47 slide
                   lnv-1-1-media.json       le riprese, con l'URL del generatore
                   lnv-1-1-pose.json        quanto resta in scena ogni slide
produzione/registri/lnv-1-1.md              il registro della lezione
                    lnv-modulo-1.md         il registro del modulo
```

## 9. Il ritmo delle slide

Il parlato tagliato dura meno dei dieci minuti: la differenza sono le **pose**,
il silenzio che tiene la slide in scena dopo l'ultima parola. Non si
distribuisce in parti uguali — darebbe lo stesso respiro a una frase di tre
parole e a un diagramma con quattro etichette, e il risultato ha un ritmo
piatto. `script/pose.py` fissa un minimo e un supplemento per tipo di
schermata, e spalma il resto:

| schermata | minimo in scena | supplemento |
|---|---|---|
| disegno o infografica | 6,5 s | 1,30 s |
| elenco, tabella, scambio | 5,0 s | 0,90 s |
| memo, citazione | 4,0 s | 0,60 s |
| frase | 3,0 s | — |

Il minimo non è un dettaglio: nella 1.1 il memo «La causa non si vede mai.»
durava 1,65 s, cioè non si leggeva.

## 10. Il controllo dei tagli senza trascrizione

Il metodo prevede di risentire ogni confine parola per parola con
`tagli.py correggi`. Con i crediti ElevenLabs a zero non si può, e al suo
posto si usa una banda di durata: si confronta quanto dura ogni blocco con
quanto dovrebbe durare per il suo testo, e si guardano gli scarti oltre
1,5 s. Un confine caduto dentro una frase lascia una firma riconoscibile —
il blocco prima troppo corto e quello dopo troppo lungo, in misura uguale e
opposta — e un blocco che risulta letto molto sopra la velocità della
traccia è da solo la prova che il suo confine è sbagliato. Così sono stati
trovati e corretti a mano i confini `s07`/`s08` della 2.2, `s44`/`s45` della
2.3 e `s32`/`s33` della 2.4.

**La banda si misura sul parlato netto, non sulla durata lorda.** Un blocco
di frasi brevissime («Imbarazzo. Cortesia. Dolore privato.») respira di più
e sulla durata lorda sembra letto piano; un periodo lungo sembra corso. Sulla
2.4 la banda lorda segnalava tredici confini su quarantotto, e togliendo i
silenzi dalla durata di ogni blocco sono scesi a otto, con la traccia C
pulita del tutto. I silenzi si prendono dallo stesso `silencedetect` che usa
l'allineamento, e il conto diventa: caratteri del blocco diviso secondi di
voce, contro la media della traccia.

**Due ipotesi provate e cadute**, scritte qui perché nessuno le riprovi.

- *I confini sono le pause più lunghe della traccia.* Sarebbe comodo: il
  testo arriva con una riga vuota fra un blocco e l'altro, e verrebbe da
  pensare che lì il modello stacchi di più. Non è vero. Sulla 2.4 la
  quindicesima pausa più lunga misura 0,64 s e la sedicesima 0,62: fra la
  pausa di paragrafo e quella di frase non c'è nessuno stacco su cui
  appoggiarsi. È anche il motivo per cui il premio `SCONTO` di `tagli.py`
  può aiutare solo un po'.
- *Il metro giusto sono le sillabe, non i caratteri.* In italiano le parole
  lunghe hanno meno sillabe per carattere delle corte, e un blocco scritto
  con parole lunghe sembra letto troppo in fretta. L'idea regge in teoria e
  non serve a niente in pratica: contando i gruppi di vocali invece dei
  caratteri, sulla 2.4 i confini fuori banda passano da otto a nove e lo
  scarto medio non si muove. I due metri sono quasi lo stesso. Restano i
  caratteri.

**Quando i confini sospetti sono più di due e consecutivi, `banda.py sposta`
non basta.** Guarda una coppia di blocchi alla volta, e su una catena ogni
singola mossa aggiusta una coppia e ne rompe un'altra. Serve
**`script/griglia.py`**, che tiene fissi i due estremi di una finestra di
blocchi e prova tutte le combinazioni di pause per i confini interni,
tenendo quella che minimizza lo scarto peggiore:

```
python3 griglia.py <dir> <chunk> <primo_blocco> <ultimo_blocco>
```

Sulla 4.2 sei confini consecutivi fra `s08` e `s14` sono tornati tutti in
banda con cinque spostamenti trovati così. Il caso che lo ha reso necessario:
`s12`, 118 caratteri schiacciati in 2,47 s di voce contro 6,36 attesi, con
**entrambi** i confini sbagliati. La finestra si tiene a cinque o sei
blocchi, perché le combinazioni crescono in fretta: se serve più larga, si
applica prima lo spostamento già sicuro con **`script/muovi.py`** — che
sposta un confine nominando il blocco invece dell'indice — e si rilancia la
griglia sul resto.

`muovi.py` serve anche per un'altra ragione: **`tagli.py allinea` azzera
`tagli.json`**, quindi ogni volta che una traccia viene rigenerata gli
spostamenti a mano vanno rifatti da capo, e rifarne cinque contando gli
indici a memoria è il modo più veloce per sbagliarne uno.

**Quello che la banda non dice, e che va detto lo stesso.** Uno scarto fuori
banda non significa che una parola sia stata spezzata: significa solo che il
blocco non dura quanto il suo testo prevede. La garanzia che conta è un'altra
e si può dare sempre — che ogni taglio cada dentro un silenzio. Si verifica
direttamente, ed è quello che va scritto nel registro insieme ai confini
sospetti: sulla 2.4 i quarantacinque confini stanno tutti dentro un silenzio,
il più stretto di 0,36 s con 0,18 s di margine per lato.

## 10-bis. La trascrizione si può fare, e dal 5.1 si fa

**Dall'11 ottobre il controllo parola per parola previsto dal metodo è
possibile.** Il nodo `speech-to-text` del connettore ElevenLabs
(`eleven_scribe_v1`) funziona e restituisce anche i tempi per parola.

La via diretta — `creative_create_asset_upload` — da qui restituisce una
risposta malformata e non va usata. **La via che funziona:**

1. `create_asset_upload` su **HeyGen**, PUT dei byte, `complete_asset_upload`.
   Si ottiene un URL pubblico e stabile,
   `https://resource2.heygen.ai/audio/<id>/original.mp3`;
2. `creative_attach_reference_file` su quell'URL → restituisce un `node_id`;
3. `creative_transcribe_audio` con quel `node_id` come `connect_from`.

Si trascrive `prova.mp3`, che `tagli.py allinea` produce già: 1,6 s di audio
prima di ogni taglio, separati da 2,5 s di silenzio. La trascrizione torna
come una sequenza di frasi, una per confine, nello stesso ordine di
`prova_meta.json`: si confronta ciascuna con la fine del suo blocco e si
scrive l'esito in `verifica_tagli.json`.

**Costo: circa 1.000 crediti ElevenLabs per una lezione intera** (182 s di
`prova.mp3`, poco meno di venti centesimi). Un ritaglio singolo di 1,6 s per
ricontrollare un confine spostato ne costa 9.

**Ordine di lavoro.** Prima `banda.py`, poi gli spostamenti a mano, poi la
trascrizione. Ma `prova.mp3` è generato da `allinea`, cioè **prima** degli
spostamenti: le code dei confini mossi a mano si rileggono con un ritaglio
di controllo preso al nuovo taglio, non rigenerando tutta la prova.

**Cosa hanno detto le prime due verifiche**, e dicono due cose opposte.

Sulla **5.1**: quarantaquattro code su quarantacinque esatte, e l'unica
sbagliata era esattamente il confine che `banda.py` aveva segnalato. Nessun
falso positivo, niente sfuggito.

Sulla **5.2**: sette confini sbagliati su quarantacinque, e la banda ne aveva
visti tre. **Ne ha mancati cinque.** La ragione è precisa e va tenuta a
mente ogni volta che si legge una banda pulita:

> **Una catena di confini spostati tutti nello stesso verso e della stessa
> misura è invisibile a un controllo di durata.** Ogni blocco perde
> all'inizio quello che guadagna alla fine, quindi la sua durata resta
> giusta. Solo il primo confine della catena sporge, e solo se lo
> spostamento è abbastanza grande.

Sulla 5.2 erano quattro di fila, in fondo alla traccia C, spostati tutti in
avanti di circa una frase. La banda vedeva scarti fra −0,7 e +2,1 s: tre
blocchi su quattro erano dentro i limiti.

**Un filtro su una parola si scrive con i confini di parola.** Il modulo 6
ha un controllo automatico sulla radice `ment`, e senza `\b` prendeva dentro
*strumento*, *momento* e *leggermente*; con `\bmente\b` prendeva ancora *in
mente*, che è un'espressione idiomatica e non il verbo. Vale per qualunque
filtro di questo tipo: confini di parola, più le eccezioni idiomatiche
escluse a mano. Le eccezioni del corso sono **due**: `in mente` (6.3) e
`nella mente` (6.4), che sono il sostantivo e non il verbo. **E il filtro
deve coprire anche il participio**: nella 6.5 `mentito` passava indenne,
perché `\bment(e|ono|endo|ire)\b` non lo prende. La forma buona è
`\bmenzogn|\bbugi|\bmentit|(?<!in )(?<!nella )\bment(e|ono|endo|ire)\b`. Quando la frase
si può riscrivere senza l'idiomatismo — nella 6.4 «letto nella mente» è
diventato «letto dentro» — si riscrive: l'eccezione resta nel filtro perché
la frase può ricomparire, ma il blocco non ci si appoggia.

**Il confronto si fa sulle ultime tre parole, non sulla coda intera.** La
finestra di `prova.mp3` è di 1,6 s e taglia quasi sempre a metà la prima
parola, che `scribe` allora inventa: nella 6.1 `risolverlo` è diventato «per
lo», `saprebbe` «sarebbe», `giudizio` «indizio», `sospetto` «detto». Un
confronto sull'intera coda ha dato otto confini sospetti su quarantacinque;
sulle ultime tre parole, uno solo — e quell'uno era davvero sbagliato. Gli
altri sette erano code giuste lette male all'inizio.

**`tagli.py correggi` non basta, e la clip di controllo non è facoltativa.**
`correggi` stima lo spostamento contando i caratteri fra la coda letta e la
fine del blocco, e li converte in secondi con una velocità di lettura fissa.
Nella 6.2, su otto confini ne ha sistemati quattro al primo colpo e quattro
no — tre spostati troppo poco, uno fermato prima della fine della frase.

**E il modo di correggerli non è rilanciare `correggi`**, che rifarebbe la
stessa stima: la clip di controllo porta i propri tempi per parola. La
finestra è `[taglio − 2,2 s, taglio]`, quindi il tempo locale `t` di una
parola vale `taglio − 2,2 + t`; si prende il silenzio fra l'ultima parola
del blocco e la prima del blocco dopo, se ne cerca il centro fra i candidati
di `silenzi()`, e si sposta il confine lì con `muovi.py`. Nella 6.2 la
seconda clip di controllo ha confermato tutti e quattro al primo colpo.

**Quando `correggi` oltrepassa, il silenzio giusto sta nel pool fine.**
`correggi` sposta il confine sul candidato più vicino al bersaglio che trova
nel pool grosso dei silenzi; se lì non c'è niente di vicino prende il più
vicino che esiste, che può stare molto più indietro. Nella 6.4 il confine di
`s28` doveva andare da 150,07 a circa 148, e `correggi` l'ha portato a
142,06 — sei secondi oltre. Il candidato giusto c'era, ma solo nel pool
fine: `tagli.silenzi(path, 0.08)` lo dà a 147,92, e `muovi.py` ce l'ha
messo. **Un confine preso dal pool fine fa poi fallire `banda.py silenzi`**,
che dichiara «non in un silenzio» perché la pausa è sotto la sua soglia
grossa: è un falso allarme previsto, e lo chiude la clip di controllo.

**Conseguenza pratica.** Una banda pulita non è una prova, è un'assenza di
segnale. La verifica sulla trascrizione va fatta su ogni lezione, anche —
anzi soprattutto — quando `banda.py` non segnala niente.

## 11. Lo stato della produzione

| lezione | titolo | durata | video_id |
|---|---|---|---|
| 1.1 | Cosa puoi vedere e cosa no | 9:59 | `7d8cc3f42b1723f8202dc47b4e6dc66a` |
| 1.2 | Il mito del 7-38-55 | 9:59 | `b4ed824ae7dbb0fe62d48ec46ee07946` |
| 1.3 | Il segnale non è un significato | 9:59 | `1def2634f6325ac79f3ab7c13956a9cd` |
| 1.4 | La linea di base | 10:04 | `2fa9b6c92246ddf477394788c35827a1` |
| 1.5 | Guardare senza concludere | 9:59 | `c2f6aadf351260b0cd86cd47a2e73abb` |
| 2.1 | Le sette emozioni | 9:59 | `1f356ac50ea758d66042448ef92a8d49` |
| 2.2 | Il FACS | 9:59 | `2adbe9f7e36bcf736c723adc48b2900c` |
| 2.3 | Le espressioni a occhio nudo | 9:59 | `c27dd213d4388051ce4a449ec4635482` |
| 2.4 | Le microespressioni | 9:58 | `9f3220d21c45256509b20a6d43fc05af` |
| 2.5 | I due sorrisi | 10:02 | `c2ae2215869e7dcf7172bb3709ed82ce` |
| 3.1 | La durata del contatto | 9:59 | `d2e4788a89a7475e2c6a665695da1038` |
| 3.2 | Il mito della direzione | 9:59 | `73628bfda25eb16bdeb7f95b65c38a26` |
| 3.3 | Lo sguardo nel gruppo | 9:59 | `b79f2fa1d5c14eca6b69fc96494d74c4` |
| 3.4 | Pupille e ammiccamento | 9:59 | `6c318a0f029ed071fbdc5a59604330ec` |
| 3.5 | Lo sguardo che mandi tu | 10:04 | `586431bd2f9519ae6515c01548cc3c66` |
| 4.1 | Le distanze | 9:58 | `7c7f0dab16af639ca6b74f809b31d4c7` |
| 4.2 | L'orientamento: dove puntano i piedi | 9:58 | `8a1910badeaab1b88881337b633208c4` |
| 4.3 | Postura, senza luoghi comuni | 9:58 | `2539717ed77fcdfaf35001c760098184` |
| 4.4 | Le pose di potere: cosa non regge | 9:58 | `c1eb0c5772b1cbc752f319564403a18e` |
| 4.5 | Il contatto fisico e i suoi limiti | 9:58 | `7a974e069bc0f469505dad7f456dd5f2` |
| 5.1 | I gesti che accompagnano la parola | 9:59 | `8c512723bc149a5551fde3b06e4faf00` |
| 5.2 | I gesti che la sostituiscono | 9:59 | `38db61ca01bfd8ef074914672defec16` |
| 5.3 | L'autocontatto | 9:59 | `3dfb22213b650cfaff07db0c1dac93c4` |
| 5.4 | La voce come segnale non verbale | 9:59 | `d6a44d680232ca9abedf21dbee8a05ca` |
| 5.5 | Il ritmo e le pause dell'altro | 9:59 | `7050d497cd244561ea5f82401662d2dc` |
| 6.1 | Che cos'è un'incongruenza | 9:59 | `ceb55ec8560b90dbeaa7c8ff92efff39` |
| 6.2 | I tre tipi | 9:59 | `84c55de233d7efc5a750cf3a856b9962` |
| 6.3 | Perché non significa bugia | 9:59 | `aac1db4f5e62111765e4996b61f76a86` |
| 6.4 | Cosa farne: la prossima domanda | 9:59 | `0155f3d29775bb71abffc600802bc260` |
| 6.5 | Quando l'incongruenza sei tu | 9:59 | `32a6c2325425a7613998bc30f84fe0c3` |

**Moduli 1, 2, 3 e 4 completi**: venti lezioni, duecento minuti,
novecentoquarantasette slide, centotrentadue fra diagrammi e infografiche,
cinquantatré riprese. I registri di modulo stanno in
`registri/lnv-modulo-1.md`, `registri/lnv-modulo-2.md`,
`registri/lnv-modulo-3.md` e `registri/lnv-modulo-4.md`. I copioni arrivano
dagli script `LNV_M1_SCRIPT-HEYGEN.md`, `LNV_M2_SCRIPT-HEYGEN.md`,
`LNV_M3_SCRIPT-HEYGEN.md` e `LNV_M4_SCRIPT-HEYGEN.md`.

**Il modulo 4 è chiuso**: cinque lezioni tutte a 9:58, il primo modulo del
corso in cui le cinque durate coincidono al secondo. **Anche il modulo 5 è
chiuso**: cinque lezioni tutte a 9:59, duecentotrentasei slide, ventisette
figure, quattordici riprese, 50.931 caratteri di copione. Il registro di
modulo sta in `registri/lnv-modulo-5.md`. **Anche il modulo 6 è chiuso**: cinque lezioni
tutte a 9:59, duecentotrentotto slide, quindici figure, dodici riprese,
50.978 caratteri di copione. Il registro di modulo sta in
`registri/lnv-modulo-6.md`. **Manca lo script del modulo 7**, l'ultimo del
corso.

**I crediti Artlist sono esauriti** — settanta su sedicimilacinquecento, e
un'immagine ne costa centotrenta — e si rinnovano il 18 ottobre. **Dalla 5.2
le riprese si generano su Higgsfield con `gpt_image_2_5`**, quando si può:
l'11 ottobre Higgsfield ha rifiutato le richieste della 5.3, della 5.4,
della 5.5 e di tutte e cinque le lezioni del modulo 6 — otto lezioni di
fila — per un **tetto giornaliero di generazioni del piano**, che non dipende dai
crediti (ce n'erano 571 sul conto). In quel caso si torna sul nodo immagine
di ElevenLabs, come per la 5.3. La scelta è stata
fatta su una prova a tre: lo stesso soggetto generato con due modelli e messo
accanto a una ripresa del corso. GPT Image 2.5 tiene il registro
documentario, la luce naturale e la palette smorzata delle altre; Soul
Location rende molto più stilizzato ed è stato scartato.

| | costo per immagine |
|---|---|
| Higgsfield, `gpt_image_2_5` | **0,25 crediti** |
| Artlist, Nano Banana 2 | 130 crediti |
| ElevenLabs, Nano Banana 2 | 406 crediti (612 alla prova di settembre) |

Il nodo immagine di ElevenLabs resta buono per una rigenerazione isolata (la
`s27` della 5.1 è stata fatta così) ma non per un modulo intero.

Due vincoli degli script che restano, da portarsi dietro dalla prima lezione:
nel **modulo 5 nessun gesto offensivo** va nominato, descritto o mostrato; nel
**modulo 6 nessuna formulazione** che suggerisca il riconoscimento della
menzogna, nemmeno attenuata o per negazione retorica.

**Il controllo dei tagli è parziale su venti lezioni su ventotto** (vedi i
registri): la trascrizione di verifica non si può fare. Il modulo 3 è il
migliore del corso su questo fronte — la 3.1, la 3.3 e la 3.4 chiudono con
zero confini fuori banda, la 3.5 con uno, la 3.2 con due — e tutti e
duecentoventicinque i suoi tagli cadono dentro un silenzio. Nel modulo 4 la
4.1 chiude con un confine fuori banda, la 4.2, la 4.4 e la 4.5 con zero e la
4.3 con due, e in tutte e cinque i tagli cadono dentro un silenzio — altri
duecentoventicinque. I due della 4.3 sono gli unici del corso di cui si può
dimostrare che NON sono confini sbagliati: `griglia.py` ha provato tutte le
pause della finestra e nessuna migliora la coppia, e la somma dei blocchi
coinvolti è in pari. Quando la trascrizione torna, i confini segnalati nei
registri vanno risentiti uno per uno con `tagli.py correggi`.

**Il modulo 5 è l'eccezione, ed è intero**: duecentoventicinque confini
riletti sulla trascrizione, diciannove sbagliati, tutti corretti e riletti su
un secondo file di controllo. La 5.4 è l'unica lezione del corso uscita
giusta al primo giro. **Anche il modulo 6 è intero**: duecentoventicinque
confini riletti, tredici sbagliati, tutti corretti e tutti riconfermati su
una clip di controllo.

Il conto delle dieci lezioni verificate dice quanto vale la banda da sola:

| | segnalati da `banda.py` | sbagliati davvero |
|---|---|---|
| 5.1 | 1 | 1 |
| 5.2 | 3 | 7 |
| 5.3 | 4 | 8 |
| 5.4 | 0 | **0** |
| 5.5 | 2 | 3 |
| **modulo 5** | **10** | **19** |
| 6.1 | 1 | 1 |
| 6.2 | 4 | 8 |
| 6.3 | **0** | 1 |
| 6.4 | 3 | 2 |
| 6.5 | 2 | 1 |
| **modulo 6** | **10** | **13** |

E la **6.3** è il caso minimo della 5.2: banda pulita, zero segnalati, e un
confine sbagliato lo stesso. La **6.4** mostra la terza combinazione
possibile: tre segnalati e due sbagliati, con **un solo nome in comune**.
`s11` era segnalato e sbagliato, `s28` era sbagliato e non segnalato, `s12`
e `s29` erano segnalati e giusti — e sono i vicini dei due colpevoli.

E nella 5.3 **due dei quattro segnalati erano il blocco vicino, non il
colpevole**: un confine spostato allunga il blocco dopo e accorcia quello
prima, quindi la banda indica spesso la vittima. Si legge come un indizio su
*dove guardare*, mai come una diagnosi. Nella **6.1** i due controlli hanno
coinciso per la prima volta: un segnalato, uno sbagliato, lo stesso. Nella
**6.2** è successo l'opposto e in forma pura: quattro segnalati, otto
sbagliati, e **nessuno dei quattro segnalati era il colpevole** — erano tutti
e quattro il blocco accanto.
Da qui in avanti la verifica si fa su ogni lezione (§10-bis), e le venti già
montate vanno ripassate quando c'è tempo, partendo dalle cinque che hanno un
confine segnalato: `s28` della 4.1, `s10` e `s12` della 4.3, `s26` e `s27`
della 3.2, `s31` della 3.5.

**Due riprese sono state montate senza essere guardate** — `s07` della 3.3 e
`s15` della 4.1 — e **tutte e due sono poi state guardate**: vanno bene. In
entrambi i casi la causa era la stessa, nessuna anteprima in linea dal
connettore e i tre host del CDN chiusi dalla policy di rete. Dal 10 ottobre
il CDN risponde di nuovo. **La regola che ne esce: se l'anteprima non arriva,
prima di rigenerare si prova a scaricare il file dal CDN** — la policy di
rete cambia, e il file è già lì.

**A oggi tutte le riprese del corso sono state guardate.** Sulla `s07` della
3.3 resta una nota editoriale, non tecnica: al tavolo sembrano tutti uomini.
