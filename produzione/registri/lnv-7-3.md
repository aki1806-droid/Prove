# Registro — 7.3 «La trattativa»

In trattativa circola una promessa precisa: che il corpo della controparte ti
dica quando ha raggiunto il limite, quando bluffa, quando cederebbe. Non
funziona, e la lezione aggiunge una ragione che vale solo qui: **è l'unico
contesto del corso in cui l'osservazione è reciproca e dichiarata.** Chi sa
di essere letto si controlla, e alcuni producono segnali apposta. Il canale è
il meno affidabile proprio dove la promessa vende di più.

L'osservazione però serve, a un'altra cosa: **non quanto cederà, ma su
cosa.** Un cambiamento quando nomini i tempi di consegna, e nessuno quando
nomini il prezzo, ti dice dove fare la prossima domanda; e la differenza fra
posizioni e bisogni, che è il cuore di qualunque negoziazione, si scopre
chiedendo, non leggendo facce. Le quattro cose che reggono meglio — il ritmo
della voce, chi guarda chi, il cambio di postura collettivo, chi interrompe
chi — non riguardano lo stato di una persona ma la struttura del gruppo.

Poi la metà più lunga, su di te: il tuo segnale più costoso è la reazione
alla cosa che ti interessa davvero, e la soluzione non è controllarsi — il
controllo è un secondo segnale sopra il primo — ma **decidere prima**. E la
regola etica del corso applicata qui: **non si nomina mai un segnale della
controparte.** Si torna sul punto, e basta.

| campo | valore |
|---|---|
| video_id | `fd660863d00229eb0afcc2873561d92d` |
| scene | 50 — copertina, 48 blocchi, chiusura |
| formato | 16:9, 1080p |
| durata | 598,7 s (9:59) — misurata sul montato |
| parlato | 587,0 s (553,8 s di voce tagliata + 33,1 s di pose) |
| voce | Luca Ward `e4bd8d8a357f41a99502309874733c16` su HeyGen, `create_speech` con `engine: "elevenlabs"` e `eleven_v4`, 1,16× in post (**1,04×** per `s05`–`s08`) |
| tracce | sei: A `s02`–`s04` · B `s05`–`s08` · C `s09`–`s18` · D `s19`–`s29` · E `s30`–`s39` · F `s40`–`s49` |
| batch HeyGen | `d1fa8eff2bce4177be027a29fe0c6339`, 96 file |
| costo | **31 crediti HeyGen** di voce + **1** di render |

## Il vincolo del modulo, detto a voce

Lo script chiede che nella 7.2 e nella 7.3 il vincolo — nessuna lezione
insegna a valutare una persona dai segnali — sia **detto esplicitamente**. Lo
script della 7.3 non ha una frase dedicata, e il copione la aggiunge in
apertura, prima di qualunque tecnica (`s04`): «Prima però il vincolo di tutto
questo modulo, che qui va detto ad alta voce. Niente di quello che vedi ti
dice che persona hai davanti: non se è onesta, non se è affidabile, non
quanto vale.» La slide `c04` lo tiene a schermo.

Il vincolo torna in `s18` («Nessuna riguarda lo stato interno di una
persona»), che è la ragione per cui le quattro cose leggibili reggono.

## «Va detto piano»: il parametro `speed` non funziona, e il rallentamento si fa in post

La nota dello script: **la scena 3 spiega perché in trattativa il canale è
meno affidabile che altrove; è controintuitivo e va detto piano.** Con la
voce da HeyGen non ci sono tag audio, e il piano era metterla in una traccia
a sé (B, `s05`–`s08`) generata con `speed: 0.9`.

**Il parametro è stato ignorato.** La traccia B è uscita a 16,2 caratteri al
secondo sul grezzo, contro i 15,4 della traccia A generata a velocità
normale: non più lenta, anzi un po' più veloce, perché le frasi della scena 3
sono corte. Con il motore ElevenLabs, `create_speech` non applica `speed`.

Il rallentamento è stato fatto in post, ed è diventato una funzione di
`tagli.py`: la variabile `PIANO` elenca i blocchi da dire piano e
`ATEMPO_PIANO` il loro `atempo` (1,04 invece di 1,16, cioè il 10% più
lenti). È deterministico, non rigenera niente, e si vede nei numeri:

| blocco | caratteri al secondo, tagliato |
|---|---|
| `s04` (prima, normale) | 18,0 |
| `s05`–`s08` (piano) | 16,1 · 17,2 · 16,6 · 18,1 |
| `s10` (dopo, normale) | 19,7 |

La scena 3 dura 56,0 s di montato.

## La voce: terza lezione con HeyGen

**42 confini su 42 al primo colpo**, tutti dentro la pausa che HeyGen
restituisce come token, a non più di **0,088 s** dal suo centro. Pausa di
confine più corta: 1,40 s.

**Il costo conferma la 7.2: 31 crediti** (7.304 → 7.273) per 701,5 s di
grezzo in sei chiamate. Con 30 sulla 7.2 e 31 qui, i 39 della 7.1 sembrano
l'eccezione.

## Le note dello script

**La proporzione un terzo, due terzi.** Lo script della 7.3 è quasi metà e
metà: l'osservazione va da 1:05 a 5:35, quello che mandi tu da 5:35 a 9:50.
La nota dice che la proporzione «vale per tutto il modulo e va mantenuta anche
in montaggio», quindi il copione ha allargato la seconda metà invece di
tagliare la prima:

| parte | blocchi | durata |
|---|---|---|
| apertura e vincolo | `s02`–`s04` | 40,2 s |
| il lato di chi osserva | `s05`–`s18` | 171,9 s |
| quello che mandi tu | `s19`–`s46` | 345,1 s |
| prova di oggi e chiusura | `s47`–`s49` | 29,8 s |

Fra le due metà, **33,2% e 66,8%**. Slide: tredici e ventisette.

**Nessun aneddoto.** Rispettato. «Hai incrociato le braccia appena ho detto
il prezzo» e «Sui tempi, torniamoci un attimo» sono le frasi dello script,
dette come esempi.

## Il copione

Da **4.364** caratteri di parlato nello script a **10.288**, media 214 per
blocco. Pose **33,1 s**.

Quello che il copione aggiunge, quasi tutto nella seconda metà:

- **perché la promessa vende** (`s02`): in trattativa ogni informazione vale
  soldi;
- **che cosa resta da vedere a chi si controlla** (`s06`): soprattutto il
  controllo, non quello che c'è sotto;
- **i segnali costruiti** (`s07`): una pausa lunga prima di un sì, un sospiro
  davanti a una cifra, uno sguardo all'orologio al momento giusto — e
  funzionano proprio con chi crede di saperli leggere;
- **perché la direzione costa poco** (`s12`): la lettura sbaglia, la
  direzione al massimo ti costa una domanda che non serviva;
- **che cosa sono posizione e bisogno** (`s13`): quello che l'altro chiede, e
  il perché;
- **l'asimmetria** (`s21`): tu sai che la lettura dell'altro è inaffidabile,
  ma lui agirà su quella lo stesso;
- **perché postura e braccia non ti costano** (`s22`): l'altro le vede per
  tutta la trattativa, e sono la tua linea di base;
- **perché la reazione invece sì** (`s23`–`s24`): causa, momento e punto
  precisi, nel momento in cui tutti stanno attenti;
- **perché il controllo peggiora le cose** (`s28`): arriva in ritardo, quindi
  l'altro vede prima l'interesse e poi lo sforzo di non mostrarlo;
- **che cosa vuol dire decidere prima** (`s30`): il punto che conta, che cosa
  accetteresti, quando vuoi che arrivi — e **perché scriverlo** (`s31`);
- **il secondo costo di nominare un segnale** (`s35`–`s36`): hai dichiarato
  una lettura probabilmente sbagliata, e ora l'altro sa che leggi e che leggi
  male;
- **che cosa fai dopo essere tornato sul punto** (`s40`–`s41`): se non
  succede niente era rumore; se l'altro dice di più, non commenti nemmeno
  allora.

## Le grafiche

Quarantotto slide, di cui **sette con un'infografica** e **nessuna
ciclica**:

| slide | tipo | cosa mostra |
|---|---|---|
| `c11` | confronto | il prezzo e i tempi di consegna: quando li nomini, che cosa ne fai |
| `c12` | swap | quanto cederà (una lettura: sbaglia) / su cosa (una direzione) |
| `c14` | flusso | l'ordine giusto: osservi → chiedi → sai |
| `c28` | flusso | che cosa vede l'altro: interesse, poi controllo, e li vede tutti e due |
| `c36` | swap | i due costi di nominare un segnale |
| `c40`–`c41` | bivio | tornato sul punto: non succede niente / dice di più, acceso in due tempi |

Le liste ripetute sono due, le quattro cose più leggibili (`c16`–`c17`) e i
quattro errori (`c42`–`c46`). Due citazioni (`c33`, `c38`), due memo.

**Una correzione dal foglio di contatto:** `c16` era accesa sulla seconda
voce, ma `s16` introduce la lista e parla delle prime due; è diventata piena.

## Le riprese

Due, `s09` e `s19`, **viste tutte e due**, generate sul nodo ElevenLabs con
**Nano Banana 2**, 406 crediti l'una.

- **`s09`** — due cartelline chiuse su un lungo tavolo da riunione, viste da
  vicino lungo il piano. Lo script le vuole «una di fronte all'altra»: qui
  sono affiancate. Lo scarto è stato accettato, perché la ripresa regge lo
  stesso la battuta («l'osservazione in trattativa serve davvero, ma a
  un'altra cosa») e una seconda generazione costa altri 406 crediti;
- **`s19`** — una sala riunioni vuota con un tavolo lungo e due file di
  sedie contrapposte, vista da un capo. Arriva su «E adesso l'altra metà. I
  segnali che mandi tu».

Nessuna persona, nessuna scritta leggibile, nessun marchio.

## Il montato è stato verificato scena per scena

`get_video_scenes`: **cinquanta scene**, le due immagini esattamente alle
scene 8 e 18 (cioè `s09` e `s19`), **nessuna scena in `playback: loop`** e
tutte le altre in `freeze` con `volume: 0`. 16:9, 1080p.

Il montato è stato scaricato e guardato: undici fotogrammi a metà di
altrettante scene più la chiusura, tutti al loro posto. Oltre al silenzio
iniziale (2,99 s) e finale (10,3 s), il controllo dei silenzi ne trova
**uno solo, di 2,85 s, a 173,3 s**: è il memo `s15` («Non quanto cederà. Su
cosa.»), 2,2 s di voce che `pose.py` tiene a schermo per 4,8 s, il minimo
dei memo perché si leggano. È voluto.

Durata finale **598,7 s**. Saldo HeyGen dopo il render: 7.241.
