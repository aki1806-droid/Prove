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
con un disegno. Questi quattro difetti non danno nessun errore e si vedono
soltanto a occhio:

- **`raggi` disegna solo i primi quattro satelliti** (`c.attorno.slice(0, 4)`)
  e scarta il resto in silenzio. Se le voci sono più di quattro, vanno
  raggruppate (3.4, `c22`);
- **`quadranti` non disegna le etichette dei poli degli assi.** Vanno scritte
  dentro le celle, o i quattro riquadri sono indistinguibili (3.4, `c34`);
- **la didascalia di una figura sta in una riga.** A due righe la figura si
  alza e il kicker finisce sopra il logo; a tre righe l'ultima riga finisce
  sopra il filetto (3.3 `c22`, 3.5 `c20` e `c33`);
- **`confronto` accende la colonna di destra**, riga per riga con `segna`;
  **`bilancia` fa scendere il piatto più pesante**, quindi la didascalia deve
  dire «pesa», non «vince».

## 7-ter. Il montato si rilegge prima di dirlo finito

Le scene si passano a `create_video_from_studio` **esattamente come
`scene.py` le scrive in `scene.json`**, mai ricostruite a mano: la 3.1 e la
3.2 sono state rimontate per questo, una con `freeze` dove voleva `loop` e
l'altra con il `loop` sulla scena successiva a quella giusta.

Dopo il montaggio si rilegge con `get_video_scenes` e si confronta con
`scene.json`: la modalità di ogni scena, la posizione delle riprese, l'ordine
degli audio. La durata che torna a un decimo di secondo conferma solo
l'ordine degli audio, non le modalità.

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

**Quello che la banda non dice, e che va detto lo stesso.** Uno scarto fuori
banda non significa che una parola sia stata spezzata: significa solo che il
blocco non dura quanto il suo testo prevede. La garanzia che conta è un'altra
e si può dare sempre — che ogni taglio cada dentro un silenzio. Si verifica
direttamente, ed è quello che va scritto nel registro insieme ai confini
sospetti: sulla 2.4 i quarantacinque confini stanno tutti dentro un silenzio,
il più stretto di 0,36 s con 0,18 s di margine per lato.

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

**Moduli 1, 2 e 3 completi**: quindici lezioni, centocinquanta minuti,
settecentonove slide, novantanove fra diagrammi e infografiche, quarantuno
riprese. I registri di modulo stanno in `registri/lnv-modulo-1.md`,
`registri/lnv-modulo-2.md` e `registri/lnv-modulo-3.md`. I copioni arrivano
dagli script `LNV_M1_SCRIPT-HEYGEN.md`, `LNV_M2_SCRIPT-HEYGEN.md` e
`LNV_M3_SCRIPT-HEYGEN.md`.

**Il modulo 4 è in lavorazione**: la 4.1 è montata, la 4.2 è in produzione.
Gli script dei moduli 4, 5 e 6 sono arrivati; manca quello del modulo 7. Il
registro di modulo si scrive quando le cinque lezioni sono chiuse.

**Il controllo dei tagli è parziale su tutte e quindici le lezioni** (vedi i
registri): la trascrizione di verifica non si può fare. Il modulo 3 è il
migliore del corso su questo fronte — la 3.1, la 3.3 e la 3.4 chiudono con
zero confini fuori banda, la 3.5 con uno, la 3.2 con due — e tutti e
duecentoventicinque i suoi tagli cadono dentro un silenzio. Quando la
trascrizione torna, i confini segnalati nei registri vanno risentiti uno per
uno con `tagli.py correggi`.

**Due riprese sono state montate senza essere guardate**: `s07` della 3.3 e
`s15` della 4.1. Vanno guardate prima di pubblicare. In entrambi i casi la
causa è stata la stessa: nessuna anteprima in linea dal connettore e i tre
host del CDN chiusi dalla policy di rete. Dal 10 ottobre
`ai-toolkit-generations.imgix.net` risponde di nuovo, quindi si scaricano da
lì e si guardano senza rigenerarle.
