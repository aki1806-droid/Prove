# MASTER — metodo di produzione video

**Documento portatile.** Contiene il metodo *e* il codice: incollato in una chat
nuova, basta a rifare tutto da zero. È scritto per chi non era presente alla
prima lavorazione, quindi ogni regola porta con sé il motivo — quasi tutte sono
costate un render buttato, e poche righe di spiegazione valgono meno di un giro
a vuoto.

Prodotto finale: **micro-lezioni video da slide + voce**, senza avatar. Nove
minuti circa, cinquanta scene, sottotitoli, marchio su ogni slide.

Misurato su **sedici lezioni** portate a termine: due moduli interi.

---

# 0. Che cosa serve avere

| | |
|---|---|
| **voce** | un servizio di sintesi con trascrizione (qui: ElevenLabs via MCP) |
| **montaggio** | un servizio che concatena scene da asset (qui: HeyGen via MCP) |
| **locale** | `python3` con `imageio_ffmpeg`, `node` 22 con `playwright` e Chromium |

Il locale fa tutto il lavoro pesante: slide, clip, tagli, montato di controllo.
I due servizi esterni servono solo per la voce e per il render finale.

---

# 1. Le domande da fare prima di cominciare

Tre, e vanno fatte **prima** di scrivere una riga. Non si indovinano.

1. **Da dove viene il copione?** Lo scrive l'utente, lo scrivo io, o c'è uno
   script di partenza da riscrivere?
2. **Quanto deve durare?** È il vincolo da cui discende tutto il resto.
3. **Ci va una pausa musicale senza voce?** Sì/no cambia l'aritmetica.

Poi i parametri di stile, che si chiedono una volta per tutto il corso e non si
ridiscutono a ogni lezione: **palette**, **marchio** (e dove sta), **voce**,
**lingua**.

> **Quello che non si chiede.** Quanti blocchi, quante scene, che carattere,
> quanto dura l'ingresso di ogni slide: sono decisioni tecniche, e chiederle
> sposta sull'utente un lavoro che è mio. Si decidono con l'aritmetica del §2 e
> si dichiarano nel registro.

---

# 2. L'aritmetica

Tutto discende dalla durata chiesta. Un solo numero da ricordare:

```
VELOCITÀ DI LETTURA = 17,0 caratteri al secondo
```

È misurata, non stimata: è la velocità della traccia **dopo** il filtro di
ritmo. Sulle sedici lezioni il reale è andato da **15,8 a 17,6 car/s**, e lo
scarto non è rumore — dipende dalla **densità di cifre**. Un anno pronunciato
per esteso dura molto più dei quattro caratteri che occupa:
«millenovecentosettantaquattro» sono ventinove caratteri di parlato per quattro
di testo. Le lezioni più lente sono le due di ripasso, fatte di date, numeri di
legge ed elenchi.

> **Il fattore che porta la traccia a 17,0 non è una costante.** Si compone di
> due numeri e **tutti e due si misurano per lezione**, non si copiano da
> quella prima: quanto tolgono i silenzi (misurato con una passata di ffmpeg:
> sulle otto lezioni del modulo 2 è andato da **1,078 a 1,196**, il dieci per
> cento) e l'`atempo` che ne discende. Copiare il numero della lezione
> precedente fa uscire la successiva a 16,1 o a 17,8 a seconda di quale si
> copia.

Quindi:

```
caratteri da scrivere = (durata_parlato_in_secondi) × 17,0
durata montata        = parlato + 3 s di copertina + 10 s di chiusura
```

Per una lezione da nove minuti montati: parlato 527 s → **circa 8.950
caratteri**. Le sedici lezioni stanno fra 8.267 e 9.430.

> **Il vincolo del committente vince sul copione.** Se lo script chiede otto
> minuti e la committenza «otto minuti almeno», scrivere per otto minuti esatti
> porta sotto la soglia: una lezione è uscita a 7:55,6. Si allargano i blocchi
> più magri **con contenuto vero**, non con parole in più — e il tetto di 225
> caratteri per blocco lascia molto margine, perché la media sta sotto 200.

## Blocchi e scene

```
TETTO DURO: 50 scene per video
```

Sopra quello il servizio di montaggio rifiuta. Cinquanta scene sono:

```
 1 copertina  +  48 blocchi di parlato  +  1 chiusura  =  50
```

Da cui, per una lezione da 8.950 caratteri: **48 blocchi da ~186 caratteri di
media**. Il tetto per blocco è **225 caratteri**: sopra, la slide non regge il
testo e la scena dura troppo.

Un blocco è **quello che sta sopra una singola inquadratura**: un concetto, mai
due.

---

# 3. La pipeline

```
1. riscrivere il copione        →  blocchi.json
2. generare la voce             →  grezzo-A.mp3, grezzo-B.mp3   ⟵ costa
3. ritagliare i blocchi         →  48 mp3
4. renderizzare le slide        →  50 PNG + 48 clip mp4
5. riprese e immagini generate  →  (di solito: nessuna)
6. caricare gli asset           →  98 file in un lotto
7. montare                      →  una sola chiamata, 50 scene
8. registro                     →  REGISTRO.md
```

I passi 3 e 4 sono indipendenti: le slide si possono renderizzare mentre la voce
si genera. Il passo 2 è l'unico che costa soldi veri, ed è l'unico che non si
può rifare a pezzi.

---

# 4. Passo per passo

## Passo 1 — Riscrivere il copione

Lo script di partenza si legge, si tiene la struttura, e si riscrive fino alla
lunghezza calcolata al §2. Quello che si aggiunge è il **come**, mai il
riempitivo.

Convenzioni del testo parlato, tutte e tre obbligatorie:

- **niente vocali accentate**: si scrivono con l'apostrofo (`perche'`, `e'`,
  `piu'`). Le accentate restano nelle slide, dove si vedono;
- **cinque o sei tag di intenzione in tutto** (`[serious]`, `[warm]`,
  `[curious]`, `[thoughtful]`), messi alle svolte vere del discorso. Non uno per
  blocco;
- **niente `<break>`**: le pause si fanno tagliando, non chiedendole al modello.

`copione/costruisci.py` (§10) tiene l'elenco dei blocchi, verifica i vincoli e
stampa l'aritmetica. Finché non dice `OK, nessun errore`, non si va avanti.

> **Se serve allungare senza gonfiare.** Si aggiunge contenuto che c'è già
> altrove nel corso — un esempio, una fonte, una conseguenza — non si allungano
> le frasi. Un copione gonfiato si sente: la voce rallenta e il video si siede.

## Passo 2 — Generare la voce, in due tracce

Una traccia continua per metà video, **non una per blocco**: le tracce separate
non hanno lo stesso timbro fra loro e si sente. Lo stacco fra le due va su un
cambio di capitolo, dove il cambio di tono è voluto.

```
chunkA.txt   blocchi fino allo stacco     < 5.000 caratteri
chunkB.txt   blocchi dopo lo stacco       < 5.000 caratteri
```

Lo stacco si dichiara **una volta sola**, nella costante `STACCO` di `tagli.py`.
Tenerne una seconda copia altrove vuol dire che prima o poi le due divergono in
silenzio e il confronto si fa sui blocchi sbagliati.

> **La voce si genera quando il copione è fermo, mai prima.** Una volta ho
> generato la traccia A e poi rivisto i blocchi: la revisione ha invalidato la
> traccia, e rigenerarla è costato $0,75 buttati. Non c'è modo di correggere
> mezza traccia — o è quella giusta, o si rifà tutta.

> **Dopo ogni ri-spezzettatura automatica, i chunk si rileggono contro lo
> script.** Un giro di ri-spezzettatura ha fatto sparire in silenzio due
> passaggi interi. Nessun controllo li avrebbe presi: il conto dei caratteri
> tornava, i vincoli pure. Il controllo automatico verifica la forma; **non sa
> che cosa doveva esserci**.

## Passo 3 — Ritagliare i blocchi dalla traccia

È il passaggio che decide tutto. Un confine sbagliato si vede e si sente.

```
tagli.py allinea    sceglie i confini, prepara prova.mp3
tagli.py correggi   sposta i confini indicati in correzioni.json
tagli.py applica    scrive i 48 mp3 + le pose
```

### Le pause si cercano sul grezzo, non sulla traccia lavorata

È l'errore che costa di più, ed è nascosto. Il filtro di ritmo
(`silenceremove` con `stop_silence=0.14`) pareggia **tutte** le pause a 0,14 s:
dopo il filtro la lunghezza della pausa — che è il segnale su cui si basa tutta
la scelta — **non esiste più**. Confini sul grezzo, ritmo applicato dopo, blocco
per blocco.

### Come si scelgono i confini

Allineamento **DTW fra punteggiatura e spezzoni di parlato**. La voce mette le
pause dove il testo ha la punteggiatura: si spezza il copione a `. : ; ,`,
si spezza l'audio negli spezzoni fra un silenzio e l'altro, e si allineano le
due sequenze con una programmazione dinamica monotona.

Misurato sulla stessa traccia: la strada ingenua (assegnare ogni confine alla
pausa più lunga lì intorno) sbagliava **17 blocchi su 48**; il DTW **2 su 48**.

### La soglia di pausa non si sceglie al primo tentativo che funziona

Provare le soglie in ordine e fermarsi alla prima che «ha abbastanza spezzoni»
guarda la quantità e non l'esito. Su una lezione la soglia di 0,18 s ha mancato
per un centesimo una pausa vera, e i due blocchi attorno sono usciti uno di 19
secondi e uno di 8. **Si provano tutte le soglie e si tiene quella che lascia
meno blocchi fuori fascia** (8,5–21 car/s).

E nel codice che fa quel voto: una soglia bassa può mettere due confini sulla
stessa pausa e lasciare un blocco di durata zero. Non è un caso da far
esplodere, è il caso peggiore possibile, e come tale va pesato.

### `correzioni.json` non è un registro

`tagli.py correggi` **modifica lo stato sul posto**. Rilanciarlo con una
correzione già applicata la applica **una seconda volta**. Quando serve una
seconda correzione sulla stessa traccia:

```
tagli.py allinea    rifà i confini da zero (nessun costo: solo ffmpeg)
                    ↓ correzioni.json con TUTTE le correzioni insieme
tagli.py correggi
tagli.py applica
```

Fatto così, `correzioni.json` descrive davvero come si passa dal grezzo ai
blocchi, e la lavorazione si può rifare da capo.

### La verifica non è opzionale

Da sola, la scelta automatica sbaglia. Due controlli, e fanno cose diverse:

| | `prova.mp3` (1,6 s prima di ogni taglio) | traccia intera |
|---|---|---|
| buchi nel parlato | solo intorno ai tagli | **su tutto il testo** |
| posizione dei tagli | **sì**, è il suo scopo | no: la trascrizione non porta i tempi |
| costo su ~9 minuti | ~$0,17 | ~$0,60 |

Quando si può, si fanno tutte e due. Quando se ne può fare una sola, quella
sulla traccia intera prende l'errore più caro — la voce che salta parole — e i
confini restano affidati all'allineamento e ai due controlli offline di
`controllo-statistico.py`, che non costano niente.

> **Una trascrizione che ripete il copione non è una trascrizione.** Se la si
> chiede collegandola al *nodo che ha generato la voce* invece che a un asset
> audio, torna il testo di partenza, identico: apostrofi di comodo (`piu'`) e
> tag di intenzione (`[warm]`) compresi. La verifica dice allora 100% per
> costruzione, e non ha guardato l'audio. Il segnale d'allarme è proprio quello:
> **nessuna voce pronuncia un apostrofo o una parentesi quadra.**

> **Il tag ID3 fa rifiutare il caricamento.** La traccia grezza viene respinta
> con `Stored file type not supported: application/octet-stream`, mentre lo
> stesso giro con un mp3 di blocco passa. Non è il trasporto: è il tag ID3 da
> ~17 KB che il generatore di voce scrive in testa. Si toglie senza ricodificare:
> `ffmpeg -i grezzo.mp3 -map_metadata -1 -c:a copy pulito.mp3`.

### Le rese si dichiarano una per volta

Il confronto parola per parola va normalizzato, ma **mai con una tolleranza
generica**: la sigla sillabata torna incollata, «uno punto cinque» torna «1.5»,
«lettera acca» torna «lettera h». Ogni resa è una riga dichiarata in
`verifica-testo.py`.

**I numeri pronunciati per esteso** sono la resa che ricorre di più, e non si
trattano a mano: il copione scrive «739», la voce dice «settecentotrentanove» e
il trascrittore lo riscrive a parole — o in cifre, senza costanza (sulla stessa
lezione, la traccia A a parole e la B in cifre). La regola dichiarata è un
convertitore dei cardinali italiani in cifre applicato ai **due** testi. Su una
lezione ha portato gli scarti segnalati da 16 a 2.

### Come non liquidare un segnale dubbio

Quando la trascrizione rende male una parola, la tentazione è archiviare. Una
volta l'ho fatto e la voce aveva davvero mangiato sei parole. Il modo di
decidere senza riascoltare, in ordine di forza:

1. **la stessa parola altrove nella stessa sessione.** Se in un'altra traccia il
   trascrittore la rende giusta, la voce sa dirla;
2. **il contesto fonetico.** Una vocale finale che sparisce davanti a una
   congiunzione che comincia per vocale è elisione, non omissione;
3. **la durata del blocco.** Se mancassero delle sillabe il blocco sarebbe più
   **veloce** della media. Se è più lento, non manca niente.

### E lo stesso vale per un confine sospetto

`controllo-statistico.py` segnala le coppie adiacenti di segno opposto: un
blocco più corto del previsto accanto a uno più lungo, che è la firma di un
confine spostato. Ma il modello pesa le **parole**, non le **pause**, e un
blocco che è un elenco può dare la stessa firma **senza** che ci sia niente di
storto.

> **Il controllo che vale di più costa una passata di ffmpeg.** Un taglio
> giusto cade **dentro una pausa vera della voce**; un taglio spostato cade in
> mezzo a una frase. Si misura in locale con `silencedetect` sulle tracce
> grezze, senza trascrivere niente e senza sapere che cosa la voce dica. È la
> seconda sezione di `controllo-statistico.py`, e va letta **per prima**: la
> statistica dice *dove guardare*, questa dice *se c'è qualcosa da vedere*.
>
> Su 2.6 la statistica ha accusato una coppia e il controllo delle pause l'ha
> assolta in dieci secondi. Rilanciato sulle sette lezioni del modulo: **322
> tagli su 322 dentro una pausa**, nessuna lezione da rifare.
>
> La soglia va tenuta **sotto** la pausa minima che `tagli.py` accetta, che non
> è una costante — la calcola per lezione. Con 0,15 s fissi il controllo ha
> accusato un taglio che cadeva nel centro esatto di una pausa di 0,143 s: un
> falso allarme prodotto dal controllo, non dal taglio. Sta a 0,05 s.

Quando anche quello non basta, il modo di decidere non è ragionare sul
modello: è **fare il conto sull'audio grezzo**. Si prende lo spezzone di
parlato fra le due pause candidate e si divide per i caratteri della frase che
dovrebbe contenere.

Esempio vero: fra 124,57 e 130,02 ci sono 5,4 s di parlato per una frase da 60
caratteri. Col confine dove l'aveva messo l'allineamento (127,59) quella frase
sarebbe stata detta a **20,5 car/s di grezzo**, contro i 14-16 di quella voce.
Confine sbagliato, senza ambiguità e senza riascoltare.

> **Quando il controllo statistico diventa cieco.** La soglia di allarme è
> **1,5 volte la dispersione della traccia**. Su un testo pieno di date o di
> elenchi il modello sbanda su ogni blocco, la dispersione raddoppia (1,03 s su
> una lezione di ripasso contro i 0,53 di una discorsiva) e con essa la soglia.
> Il controllo non è rotto: è **cieco in proporzione**. Su una traccia così si
> guarda il controllo delle pause e si legge la tabella dei blocchi a mano.
>
> Ritarare il peso delle cifre sulla lezione che mette in crisi il modello è la
> tentazione da evitare: si aggiusta quella e si sbaglia sulle altre sette.

### Il peso di un pezzo di copione: quanto DURA, non quanto è lungo

La DTW allinea pezzi di copione a spezzoni di audio, e il costo è il **peso**
del pezzo. Pesarlo in caratteri sbaglia sui numeri: «1.4 e 1.5.» sono dieci
caratteri, ma la voce dice «uno punto quattro e uno punto cinque» e ci mette
quattro secondi. Su una lezione questo ha spostato un confine di 2,1 s.

Il primo rimedio — *una cifra vale cinque caratteri*, piatto — funziona in
media e si rompe agli estremi, **in tutti e due i versi**: `12` pesava dieci e
la voce dice *dodici*, che ne vale sei; `1994` pesava venti e la voce dice
*millenovecentonovantaquattro*, che ne vale ventotto.

La regola giusta è **scrivere il numero per esteso e contare quello**. La
differenza fra «sette» e «millenovecentonovantaquattro» la sa l'italiano, non
un fattore moltiplicativo. Il convertitore sta in `tagli.py` (`in_lettere`), e
tratta il punto fra due cifre come «punto», che è come si legge.

> **Il peso vive in un file solo.** Due volte in due lezioni la DTW e il
> controllo statistico hanno avuto pesi diversi, e ogni volta il sintomo non è
> stato un errore: è stato **un controllo che tace**. Con i pesi in disaccordo
> la coppia sospetta di 2.6 non veniva segnalata affatto.
> `controllo-statistico.py` **importa** `peso` da `tagli.py`.
>
> Vale per ogni numero del sistema, non solo per questo. La soglia delle pause
> è inciampata nello stesso modo, una lezione dopo.

## Passo 4 — Renderizzare le slide

Un solo layout condiviso (`slide/layout.mjs` + `slide/grafica.mjs`), usato sia
per i PNG fermi sia per i fotogrammi delle clip. Le due cose **devono** uscire
identiche, quindi l'orologio delle animazioni non scorre da solo: lo sposta a
mano il generatore.

```
node slide/cards.mjs    50 PNG  — GUARDARLI, in provini da nove
node slide/clips.mjs    48 clip da 1,8 s
```

### Il controllo di traboccamento, e come si sbaglia a scriverlo

Non basta guardare `scrollHeight` del corpo. È un flex item con `flex:1`:
quando il contenuto è troppo alto **non scrolla, cresce**, e a tagliare è la
slide. Il confronto giusto è **geometrico**, fra il rettangolo del corpo e la
cornice interna della slide.

> Quando un controllo automatico non ha mai trovato niente, non è una buona
> notizia finché non gli si è dato qualcosa da trovare. Riscritto bene, questo
> ha trovato subito sei slide tagliate che il vecchio dava per buone.

### Le soglie di densità stanno nella libreria, non nelle scene

Gli elenchi lunghi si stringono da soli; `griglia` si stringe oltre le sei
caselle su una colonna; `icone` oltre le quattro. Se la soglia sta nelle scene,
ogni lezione se ne dimentica per conto suo.

E qualche tipo ha un **tetto**, non solo una soglia: `icone` è un flex
orizzontale e sopra le **cinque** voci esce dalla cornice qualunque sia il
corpo del testo. Sette barriere sforavano di 377 px. Non è un problema di
misura, è di densità: sopra le cinque voci si usa `griglia`. I tetti stanno
scritti nel CSS, accanto alla regola.

### Una slide si rompe in tre modi, e solo due si vedono da soli

1. **Esce dalla cornice.** Lo prende il controllo geometrico.
2. **Stampa un dato che non c'è.** Un `assetempo` senza anni veri scrive
   `undefined` sull'asse, **dentro la cornice**: muto per il controllo di
   sopra, e sarebbe andato in resa. Adesso `cards.mjs` legge il testo reso di
   ogni slide e segnala `undefined`, `NaN` e `[object Object]`.
3. **Dice una cosa falsa, perfettamente impaginata.** Questo non si
   automatizza, e il paragrafo sotto è la sola difesa.

> Quando un controllo automatico non ha mai trovato niente, non è una buona
> notizia finché non gli si è dato qualcosa da trovare. Il controllo dei dati
> mancanti è stato provato rimettendo il difetto che l'aveva motivato, e poi
> ripristinando: **un controllo non provato non è un controllo.**

### Guardare i provini non è una formalità

È il solo modo di prendere il terzo difetto, e ne ha presi otto in quattro
lezioni. Le due famiglie:

**Il contenuto è inventato o sbagliato.** Numeri di un grafico a barre che
nessuno aveva misurato; una matrice 2×2 con tre sigle e la quarta mancante;
un albero che disegnava livelli annidati come rami paralleli; un formaggio
svizzero con le fette vuote («Barriera 1 · un buco»); una spunta usata per
«l'assenza di un doppio controllo».

**La forma dice una cosa diversa dal contenuto.** Un Venn per due cose che
vengono trasferite entrambe, non che si sovrappongono. Una matrice le cui
colonne — «la barriera» / «un esempio» — facevano passare una barriera per un
esempio di un'altra. Tre numeri grandi che erano la cosa da ricordare, scritti
piccoli accanto a parole grandi.

Nessuna di queste sforava la cornice. Tutte erano sbagliate.

## Passo 5 — Riprese e immagini generate

Di solito: nessuna. Se servono, vanno qui, prima del caricamento.

## Passo 6 — Caricare tutto come asset

```
48 clip mp4  +  48 mp3 di blocco  +  2 PNG (copertina e chiusura)  =  98 file
```

Il lotto di caricamento tiene **fino a 100 file**: ci stanno tutti in uno.

> **Non provare a dimezzare montando l'audio dentro le clip.** L'ho fatto:
> costa un giro di caricamenti e un render buttato, perché il servizio di
> montaggio vuole l'audio come asset separato per far durare la scena quanto la
> voce.

> **Se cambiano solo le immagini**, si ricaricano solo quelle: 50 file invece di
> 98, riusando gli id audio già sul servizio. L'ho fatto per rifare l'apparato
> grafico di otto lezioni senza toccare una nota di voce.

**Il contatore del lotto è in ritardo.** Il lotto dice `completed` mentre gli
item sono ancora `processing`. Si aspetta che il conteggio arrivi a 98, non che
lo stato dica «fatto».

## Passo 7 — Montare, in una sola chiamata

Cinquanta scene, un `create_video_from_studio`.

> **La regola che costa un render se la si sbaglia.** Le scene video **devono**
> portare `audio_asset_id` e `playback: {mode:"freeze", mute:true}`. Senza,
> la scena dura quanto la clip — 1,8 secondi — e il video esce di due minuti
> invece di nove. Le scene immagine prendono invece un `duration` esplicito.

### Caricare e aspettare

**Un render da nove minuti e cinquanta scene prende dai tre ai quattro minuti**
(misurati: 179 s e 211 s). È il metro per non scambiare l'attesa normale per un
blocco.

> Una volta l'ho scambiata. Avevo lanciato `sleep` in background e interrogato
> lo stato nella stessa risposta: sette minuti veri sembravano centocinque, ho
> concluso che il render fosse fermo e ne ho lanciato un duplicato. Per
> aspettare davvero: `start=$(date +%s); until [ $(( $(date +%s) - start )) -ge N ]; do sleep 5; done`.

## Passo 8 — Registro

Un `REGISTRO.md` per lezione, con: scheda parametri, esito delle verifiche, che
cosa è andato storto e come si è deciso, e una sezione finale **«Da verificare —
quello che non ho potuto giudicare io»**. In quella sezione va anche quello che
è costato soldi per niente.

---

# 5. Il vocabolario grafico

Un corso fatto di sole parole in pagina non è un video: è una dispensa letta ad
alta voce. Le figure stanno in `grafica.mjs` e sono un **vocabolario chiuso** —
tredici tipi più le icone — non un disegno diverso per ogni slide.

| Famiglia | Tipi | Quando |
|---|---|---|
| dati | `barre` `impila` `assetempo` `scadenza` | c'è una **quantità** vera |
| struttura | `tabella` `matrice` `albero` `venn` | ci sono **due o più dimensioni** da incrociare |
| sequenza | `catena` `scala` `piramide` | c'è un **ordine** o una gerarchia |
| insiemi | `griglia` `icone` | c'è un **elenco** che merita forma |
| fregi | `sigillo` `anello` `virgolette` `barra` | la slide è di sola parola |

Circa **venti scene su cinquanta** portano una figura. Le altre sono i respiri:
una frase sola, una citazione, un numero grande. Un video in cui ogni scena è un
diagramma stanca quanto uno in cui non ce n'è nessuno.

## Il colore dei dati si calcola, non si sceglie a occhio

Il verde e il rosso di questo marchio, accostati in un grafico, hanno
**ΔE 3,4 in protanopia**: per un daltonico sono la stessa tinta. La serie
categoriale qui sotto passa i sei controlli (banda di chiarezza, croma,
separazione CVD, soglia a vista normale, contrasto sul fondo):

```
#00623A   #B07A12   #3E6FA8   #D70328
```

Due regole che ne discendono:

- **il colore non porta mai da solo un significato** — ogni serie ha
  l'etichetta attaccata, e giusto/sbagliato portano anche il segno (✓ ×);
- **i dati non vanno sul fondo scuro.** Sul verde pieno le tinte che rispettano
  la banda di chiarezza per fondo scuro non arrivano a 3:1 di contrasto. Invece
  di forzarle, il render **rifiuta**: sul verde restano le slide di
  affermazione, i dati stanno sul bianco.

## Una figura che esce sempre uguale non è un grafico

Una ciambella che disegna 150 su 150 e un quadrante che segna 48 ore su 48 sono
sempre pieni: non dicono niente. Al loro posto:

- **`impila`** — la composizione: 150 crediti sono tre anni da 50;
- **`scadenza`** — la finestra di tempo con **due** soglie: subito se c'è
  pericolo, 48 ore altrimenti.

## La linea del tempo va in scala

Fra il 1974 e il 1992 ci sono diciotto anni, fra il 1999 e il 2000 uno. Una
timeline a passo fisso dice il contrario di quello che è successo.

## Tre trappole dell'SVG, tutte e tre costate un giro di render

1. **Nel testo di un SVG il markup non esiste.** `<b>` non è un elemento SVG:
   finisce renderizzato come un pezzo di testo a sé, fuori posto. Nei `<text>`
   gli asterischi si tolgono (`piano()`); dove serve il grassetto si usa
   `foreignObject`.
2. **Un `<text>` SVG non va a capo.** Due tappe vicine si sovrappongono e non se
   ne accorge nessun controllo. Le didascalie stanno in `foreignObject`, e la
   loro larghezza non è fissa: è quella che ci sta fino alla tappa vicina **della
   stessa riga** — l'alternanza sopra/sotto separa le vicine, non quelle due
   posizioni più in là.
3. **Un riquadro SVG ad altezza fissa taglia il testo più lungo.** L'albero di
   decisione è in HTML, dove i riquadri crescono col contenuto.

---

# 6. I controlli prima di consegnare

`controlli.py` li fa tutti in una volta. Otto:

- [ ] verifica per trascrizione: **nessun buco nel parlato**
- [ ] tutti i blocchi nella fascia **8,5–21 car/s**
- [ ] **50 PNG** renderizzati **e guardati** nei provini
- [ ] **nessuna slide sfora** la cornice
- [ ] scene totali **≤ 50**
- [ ] **durata** ≥ quella chiesta
- [ ] **sottotitoli** SRT, 48 righe
- [ ] **registro** con la sezione «da verificare»

Un 7/8 si consegna solo dicendo quale controllo non è passato e perché.

---

# 7. Le trappole, tutte in una pagina

Il listino degli errori già pagati. Chi riparte da qui non deve ripagarli.

| Dove | Che cosa succede | Come si evita |
|---|---|---|
| voce | rigenerata perché il copione è cambiato dopo | la voce si genera **a copione fermo** |
| copione | una ri-spezzettatura automatica mangia due passaggi | rileggere i chunk contro lo script |
| tagli | le pause sparite dopo il filtro di ritmo | confini sul **grezzo** |
| tagli | soglia scelta «al primo tentativo che funziona» | provarle tutte, votare sull'esito |
| tagli | `correzioni.json` applicato due volte | rifare `allinea`, poi tutte le correzioni insieme |
| verifica | la trascrizione ripete il copione | trascrivere da un **asset audio**, non dal nodo che ha generato |
| verifica | il caricamento rifiuta la traccia grezza | togliere il tag ID3 (`-map_metadata -1 -c:a copy`) |
| verifica | il controllo statistico non segnala niente su un testo di date | è cieco in proporzione: leggere la tabella a mano |
| slide | il controllo di traboccamento non trova mai niente | confronto **geometrico**, non `scrollHeight` |
| slide | `<b>` dentro un `<text>` SVG | `piano()` nei testi SVG, `foreignObject` dove serve grassetto |
| slide | etichette SVG che si sovrappongono | `foreignObject` con larghezza calcolata sul vicino |
| montaggio | il video esce di due minuti invece di nove | `audio_asset_id` + `playback {freeze, mute}` su ogni scena video |
| montaggio | render dato per bloccato e rilanciato | tre-quattro minuti sono **normali**; attendere con `until` |
| montaggio | il lotto dice «completed» ma gli item no | aspettare il **conteggio**, non lo stato |

---

# 8. Il profilo compilato

Corso di preparazione al concorso per Infermiere · Azienda Zero Veneto ·
CISL FP Padova Rovigo.

| | |
|---|---|
| durata | «8 minuti almeno» → si punta a **9:00** montati |
| pausa musicale | **no** |
| copione | lo fornisce l'utente, uno script per lezione |
| palette | bianco `#FFFFFF`, verde `#00623A`, rosso `#D70328`, testo `#1C1C1C` |
| | verde pieno `#004E2E` (slide di affermazione), velo rosa `#FCF4F3` (errori) |
| marchio | logo CISL FP Padova Rovigo, **in alto a sinistra su ogni slide** |
| caratteri | Inter (testo), Source Serif 4 (frasi e citazioni) |
| voce | GianP — News Info and Documentary, `nNt0YcINdGadGcTx5fBM`, `eleven_v3` |
| trascrizione | `eleven_scribe_v1` |
| formato | 1920×1080, 25 fps, 16:9, 1080p |

I due colori del marchio sono **campionati dal file del logo, non stimati**:
verde `#00623A` (40,7% dei pixel opachi), rosso `#D70328` (14,2%).

## Costo misurato, per lezione

```
voce (due tracce, ~8.700 caratteri, eleven_v3)   ~$1,45
trascrizione delle due tracce intere             ~$0,60
                                                 -------
                                                 ~$2,05
```

Il render del montaggio e i caricamenti non si pagano a consumo.

---

# 9. Come ripartire in una chat nuova

1. Crea la cartella del progetto e scrivi i file del §10 così come sono.
2. `pip install imageio-ffmpeg` · `npm i playwright` · Chromium già presente.
3. Metti il logo in `slide/marchio/logo-rifilato.png` e i caratteri in
   `slide/font/` (con un `font-incorporati.css` che li incorpora in base64).
4. Fai le tre domande del §1.
5. Per ogni lezione: `./nuova-lezione.sh m1-lX.Y-nome`, poi scrivi i due soli
   file che cambiano — `copione/costruisci.py` e `slide/contenuti.mjs` — e segui
   la pipeline del §3.

La prima lezione costa più delle altre: è quella in cui si fissano palette,
marchio e voce. Dalla seconda in poi `nuova-lezione.sh` copia tutto quello che
non cambia **dall'ultima lezione fatta**, non dalla prima — così gli strumenti
migliorano lezione dopo lezione e nessuna resta indietro.

---

# 10. Il codice

Tutti i file, nell'ordine in cui servono. Sono quelli veri, non una versione
semplificata: i commenti dentro spiegano le decisioni che il testo qui sopra
riassume.

| file | righe | a che cosa serve |
|---|---|---|
| `nuova-lezione.sh` | 54 | impianta una lezione nuova dall'ultima fatta |
| `copione/costruisci.py` | 150 | il copione, i blocchi, i chunk per la voce |
| `audio/tagli.py` | 348 | pause, allineamento DTW, ritaglio dei blocchi |
| `audio/verifica-testo.py` | 198 | trascrizione contro copione |
| `audio/controllo-per-trascrizione.py` | 81 | quale confine e' finito fuori posto, e dove |
| `controllo-statistico.py` | 101 | i confini: la firma statistica e le pause |
| `slide/layout.mjs` | 352 | temi, marchio, corpi di testo |
| `slide/grafica.mjs` | 570 | i 13 tipi grafici, le icone, i fregi, i colori |
| `slide/cards.mjs` | 70 | le 50 slide in PNG |
| `slide/clips.mjs` | 49 | le scene animate in MP4 |
| `monta-scene.py` | 37 | il payload delle scene per il montaggio |
| `monta-locale.py` | 49 | il montaggio di prova con ffmpeg |
| `controlli.py` | 73 | gli otto controlli finali |
| `slide/contenuti.mjs` | 260 | le 50 scene — esempio, cambia a ogni lezione |

Si copiano tutti come sono, una volta sola. `copione/costruisci.py` e
`slide/contenuti.mjs` sono gli unici due che si riscrivono a ogni lezione: qui
sono quelli della 1.8, riportati come esempio compilato.

## `nuova-lezione.sh`

Crea una lezione nuova copiando **dall'ultima fatta** tutto quello che non
cambia. I due soli file da riscrivere sono `copione/costruisci.py` e
`slide/contenuti.mjs`.

```bash
#!/usr/bin/env bash
# Prepara la cartella di una nuova lezione copiando dall'ultima fatta tutto
# quello che non cambia: il tema, il marchio, i caratteri e gli strumenti.
# Restano da scrivere due soli file, che il messaggio finale elenca.
set -euo pipefail

[ $# -eq 1 ] || { echo "uso: ./nuova-lezione.sh m2-l2.1-processo"; exit 1; }
NUOVA="progetti/$1"
# Si copia dalla lezione piu' recente, non sempre dalla prima: gli strumenti
# migliorano lezione dopo lezione e la 1.1 resterebbe indietro.
DA=$(ls -d progetti/m*-l*/ | sort | tail -1); DA=${DA%/}
[ -e "$NUOVA" ] && { echo "$NUOVA esiste gia'"; exit 1; }

mkdir -p "$NUOVA"/{origine,copione,audio/trascrizioni,slide,scene}
# il tema e gli strumenti: identici per tutte le lezioni del corso
cp -r "$DA/slide/font" "$DA/slide/marchio" "$NUOVA/slide/"
cp "$DA/slide/layout.mjs" "$DA/slide/grafica.mjs" "$DA/slide/cards.mjs" "$DA/slide/clips.mjs" "$NUOVA/slide/"
cp "$DA/audio/tagli.py" "$DA/audio/controllo-per-trascrizione.py" \
   "$DA/audio/verifica-testo.py" "$NUOVA/audio/"
cp "$DA/monta-scene.py" "$DA/monta-locale.py" "$DA/controlli.py" \
   "$DA/controllo-statistico.py" "$NUOVA/"
# costruisci.py si riscrive, ma solo nelle due liste in testa: il resto
# (vincoli, stacco, chunk) e' identico e va copiato, non ribattuto.
cp "$DA/copione/costruisci.py" "$NUOVA/copione/"
ln -sfn /opt/node22/lib/node_modules "$NUOVA/node_modules"

cat <<TESTO

$NUOVA pronta (copiata da $DA). Da scrivere, due file:

  copione/costruisci.py    i blocchi del parlato (parte da quello di $DA)
  slide/contenuti.mjs      il contenuto delle scene

Poi, nell'ordine:

  python3 copione/costruisci.py          scrive blocchi.json e verifica i vincoli
  → generare le due tracce di voce, salvarle in audio/grezzo-A.mp3 e -B.mp3
  python3 audio/tagli.py allinea         sceglie i confini, prepara prova.mp3
  python3 audio/tagli.py applica         scrive i 48 mp3
  python3 controllo-statistico.py        nessuna coppia adiacente di segno opposto
                                         (legge blocchi-audio.json: va DOPO applica)
  → trascrivere: attaccare l'URL firmato di ciascuna traccia con
    creative_attach_reference_file, poi creative_transcribe_audio;
    salvare i testi in audio/trascrizioni/A.txt e B.txt
  python3 audio/verifica-testo.py        deve dire "la voce ha detto tutto"
  node slide/cards.mjs                   i PNG — GUARDARLI
  node slide/clips.mjs                   le clip animate
  python3 monta-scene.py                 clip + audio, una per blocco
  python3 monta-locale.py                la copia di controllo e l'SRT
  python3 controlli.py                   i controlli del MASTER §5

Lo stacco fra le due tracce sta in audio/tagli.py, costante STACCO.

TESTO
```

## `copione/costruisci.py`

Il copione. Qui si scrive il testo parlato e si tagliano i blocchi: uno per
scena, 225 caratteri al massimo, senza vocali accentate. Produce i due chunk
per la voce e il `blocchi.json` che tutto il resto usa come riferimento.

```python
# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Chiudiamo il secondo modulo. Nessun contenuto nuovo: ricomponiamo. La mappa delle sette lezioni, il filo che le tiene insieme, i numeri, le confusioni che costano di piu', i casi tipici."),
 (1,"chiaro",0,"Guarda questo video due volte: adesso, per chiudere il modulo, e la settimana prima della prova, quando serve rimettere in ordine quello che nel frattempo si e' sparpagliato."),
 (1,"tenue",0,"E' un ripasso, quindi andiamo piu' svelti del solito. Se un punto ti sfugge, e' il segno che quella lezione va ripresa: non tutto il modulo da capo, solo quella. Un ripasso serve a trovare i buchi, non a riempirli tutti."),

 (2,"chiaro",0,"La mappa, in sette righe. 2.1: il processo di assistenza, i cinque passi. 2.2: modelli e tassonomie, cioe' le categorie con cui si guarda. 2.3: accertamento e scale. 2.4: la documentazione."),
 (2,"chiaro",0,"2.5: EBP, linee guida, PDTA e procedure, cioe' da dove viene quello che facciamo. 2.6: rischio clinico e sicurezza del paziente. 2.7: comunicazione clinica e continuita' assistenziale."),
 (2,"chiaro",0,"Sette lezioni, e non sono sette argomenti separati. Sono sette punti di una sola linea, ed e' la linea che conviene saper raccontare all'orale, non i punti presi uno per volta."),

 (3,"chiaro",0,"Una sola catena tiene insieme tutto. Raccolgo i dati con le categorie che la disciplina mi fornisce, e non a caso. Decido sulla base delle migliori evidenze disponibili, integrate con l'esperienza e con la persona."),
 (3,"chiaro",0,"Documento cio' che faccio. Comunico nei passaggi. E sorveglio il sistema, perche' l'errore e' prevedibile, e chi lo prevede costruisce le barriere prima che servano."),
 (3,"chiaro",0,"Metodo, prova, sicurezza: tre facce dello stesso lavoro. Se all'orale ti chiedono che cosa hai imparato in questo modulo, la risposta e' questa catena, in cinque verbi."),

 (4,"chiaro",0,"Dal 2.1: cinque fasi, e il processo e' ciclico, non lineare. La valutazione non chiude niente: riapre l'accertamento. Ed e' il passo che si dimentica piu' spesso, sia nei quiz sia in reparto."),
 (4,"chiaro",0,"Diagnosi reale PES: problema, etiologia, segni e sintomi. Diagnosi di rischio PE, senza segni, perche' se i segni ci fossero non sarebbe piu' un rischio ma un problema in atto."),
 (4,"chiaro",0,"L'obiettivo ha per soggetto la persona, con indicatore e tempo. Le priorita': ABC, poi rischio di danno a breve, poi impatto sull'autonomia e percezione della persona."),

 (5,"chiaro",0,"Dal 2.2: il metaparadigma ha quattro concetti. Henderson quattordici bisogni, Gordon undici modelli funzionali. E non il contrario: e' lo scambio piu' frequente di tutto il modulo."),
 (5,"chiaro",0,"Orem tre sistemi: totalmente compensatorio, parzialmente compensatorio, e di supporto ed educazione. E la catena delle tassonomie: NANDA, NOC, NIC, cioe' diagnosi, risultati, interventi."),
 (5,"chiaro",0,"Un modo per non sbagliare NOC e NIC: NOC finisce come outcome, NIC come intervento. La lettera che cambia nella sigla e' la stessa che cambia nel significato, e non e' un caso."),

 (6,"chiaro",0,"Dal 2.3, e questa e' la slide da fotografare adesso. Braden da 6 a 23, soglia 16. Norton da 5 a 20, soglia 14. Conley da 0 a 10, rischio a partire da 2."),
 (6,"chiaro",0,"Tinetti sotto 19. Barthel da 0 a 100. Glasgow da 3 a 15, con coma sotto o uguale a 8. CAM: uno piu' due, piu' tre oppure quattro. E MUST: rischio alto a partire da 2."),
 (6,"chiaro",0,"Otto scale e otto intervalli, ed e' la parte che si dimentica per prima, perche' sono numeri senza appiglio. Se devi trascrivere una cosa sola nel quaderno di ripasso, trascrivi questa."),

 (7,"chiaro",0,"E poi c'e' la regola che risolve meta' delle domande sulle scale anche quando non le ricordi a memoria. Se la scala misura una capacita', piu' alto e' meglio."),
 (7,"chiaro",0,"Se misura un rischio, piu' alto e' peggio. Barthel misura autonomia: 100 e' ottimo. Conley misura il rischio di caduta: 10 e' pessimo. Fin qui e' intuitivo, e infatti non e' qui che si sbaglia."),
 (7,"profondo",1.2,"Le due eccezioni sono Braden e Norton, che misurano un rischio con punteggio inverso: piu' basso, piu' a rischio. Due eccezioni sole, e sono proprio le due che si chiedono di piu'."),

 (8,"chiaro",0,"Le otto confusioni che costano di piu'. Uno: obiettivo o intervento. Guarda il soggetto della frase: se il soggetto e' la persona e' un obiettivo, se sei tu e' un intervento."),
 (8,"chiaro",0,"Due: diagnosi reale con i segni, di rischio senza. Tre: la diagnosi infermieristica si tratta in autonomia, il problema collaborativo si sorveglia e si gestisce insieme al medico."),
 (8,"chiaro",0,"Quattro: quattordici Henderson, undici Gordon. Se non ricordi quale sia quale, ricorda che quelli di Gordon sono modelli funzionali di salute, e sono i meno numerosi dei due."),

 (9,"chiaro",0,"Cinque: NOC sono gli outcome, i risultati; NIC gli interventi. Sei: Braden e' lesioni da pressione, con punteggio inverso; Conley e' cadute, con punteggio diretto. Due rischi diversi e due direzioni diverse."),
 (9,"chiaro",0,"Sette: la linea guida raccomanda, la procedura dice come si fa qui, il PDTA dice chi fa che cosa lungo il percorso. Scientifica la prima, organizzative le altre due."),
 (9,"chiaro",0,"Otto: il near miss non arriva al paziente, l'evento avverso si'. E la complicanza non e' nessuno dei due, perche' e' attesa e non presuppone un errore di nessuno."),

 (10,"chiaro",0,"I casi tipici. Traccia con dati incompleti: la risposta non e' scegliere l'intervento piu' sensato. Si comincia raccogliendo il dato mancante, ed e' quasi sempre quella l'opzione giusta."),
 (10,"chiaro",0,"Quale intervento ha la priorita': ABC prima di tutto, poi il rischio di danno a breve, poi l'impatto sull'autonomia e la percezione della persona. In quest'ordine, sempre."),
 (10,"chiaro",0,"Braden 12 in paziente allettato: cambi posturali programmati, superficie antidecubito, gestione dell'umidita', valutazione nutrizionale, ispezione cutanea a ogni turno."),

 (11,"profondo",1.2,"Perche' al punteggio deve corrispondere una modifica del piano. Una scala compilata e non seguita da niente e' peggio di una non compilata: dimostra che il rischio era noto."),
 (11,"chiaro",0,"Prescrizione illeggibile o dubbia: chiedo chiarimento al prescrittore, se il dubbio permane non do corso, e documento il dubbio e la richiesta. Tre passi, in quest'ordine."),
 (11,"chiaro",0,"Near miss intercettato in tempo: segnalo comunque, perche' e' apprendimento gratuito. Chiamata al medico per peggioramento: strutturo con SBAR, esplicitando valutazione e richiesta."),

 (12,"chiaro",0,"Cinque formule da saper citare a memoria, per intero. PES: problema, etiologia, segni e sintomi. E la diagnosi di rischio e' PE, perche' i segni non ci sono ancora."),
 (12,"chiaro",0,"PICO: popolazione, intervento, confronto, esito. SBAR: situazione, background, assessment e recommendation, e sono le ultime due quelle che contano. CAM: uno piu' due, piu' tre oppure quattro."),
 (12,"chiaro",0,"E l'EBP: evidenze piu' competenza clinica piu' valori della persona. Tre addendi, e il distrattore classico ne toglie due, proprio i due che riguardano le persone."),

 (13,"chiaro",0,"E la frase che attraversa il modulo dall'inizio alla fine: cio' che non e' documentato si presume non fatto. L'abbiamo incontrata nella 1.5 e non ci ha piu' lasciati."),
 (13,"chiaro",0,"Vale per la scala compilata, per la segnalazione fatta al medico, per il rifiuto della persona, per la rivalutazione del dolore dopo un antidolorifico. Nel dubbio, scrivi."),
 (13,"profondo",1.2,"Non e' un avvertimento burocratico: e' l'unico modo in cui il lavoro che hai fatto continua a esistere a distanza di anni. La memoria non fa prova, il documento si'."),

 (14,"chiaro",0,"Quattro agganci veneti da portare all'orale. Uno: il processo e' strutturato dentro la cartella clinica elettronica, con scale integrate e rivalutazioni a intervalli definiti."),
 (14,"chiaro",0,"Due: la catena delle evidenze e' SNLG, indirizzi regionali e PDTA, procedure aziendali, pratica al letto. Spesso dentro le reti cliniche: oncologica, stroke, trauma."),
 (14,"chiaro",0,"Tre: la filiera del rischio e' l'operatore che segnala, il risk management aziendale, il Centro regionale, l'Osservatorio nazionale, con il Difensore civico nel ruolo di Garante."),

 (15,"chiaro",0,"Quattro: la continuita' verso il territorio passa da dimissioni protette, dalle COT e dall'infermiere di famiglia e comunita'. E adesso come proseguire, in quattro passi."),
 (15,"chiaro",0,"Uno: affronta il test del modulo, trenta domande con soglia ventuno. Due: riprendi solo le lezioni che gli errori ti hanno segnalato, non tutto il modulo da capo."),
 (15,"chiaro",0,"Tre: trasferisci nel quaderno di ripasso i numeri delle scale e le formule. E' la parte che si dimentica per prima, ed e' anche l'unica che si recupera in cinque minuti."),

 (16,"profondo",1.2,"Quattro, ed e' il consiglio con il rendimento piu' alto di tutto il corso: esercita lo schema in cinque passi della lezione 2.1 su due casi clinici. Non su venti: su due, fatti bene."),
 (16,"chiaro",0,"Ci fermiamo qui. Con il modulo 1 hai la grammatica della professione; con il modulo 2 la sintassi, cioe' il metodo, la prova e la sicurezza. Tre parole per sette lezioni."),
 (16,"chiaro",0,"[warm] Dal modulo 3 il metodo diventa clinica: bisogni fondamentali, comfort, assistenza di base avanzata. E comincia la parte che pesa di piu' nella prova pratica. Ci vediamo li'."),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1:"Apertura",2:"La mappa",3:"Il filo del modulo",
 4:"I numeri del processo",5:"I numeri dei modelli",6:"I numeri delle scale",
 7:"La regola della direzione",8:"Confusioni 1-4",9:"Confusioni 5-8",
 10:"I casi tipici, prima parte",11:"I casi tipici, seconda parte",
 12:"Le formule",13:"La frase del modulo",14:"Gli agganci veneti",
 15:"Come proseguire",16:"Chiusura"}
CPS = 17.0   # misurata su 1.2, confermata da 1.3 a 1.8

blocchi=[]
for i,(cap,tema,posa,txt) in enumerate(BLOCCHI, start=2):
    blocchi.append({"id":f"s{i:02d}","capitolo":cap,"tema":tema,"posa":posa,"text":txt})

errori=[]
tot=sum(len(b["text"]) for b in blocchi)
nscene=len(blocchi)+2
if nscene>50: errori.append(f"scene {nscene} > 50")
for b in blocchi:
    if any(c in ACCENTATE for c in b["text"]):
        errori.append(f'{b["id"]}: vocale accentata -> ' + "".join(sorted({c for c in b["text"] if c in ACCENTATE})))
    if len(b["text"])>225: errori.append(f'{b["id"]}: {len(b["text"])} car, blocco troppo lungo')
tags=sum(len(re.findall(r"\[[a-z]+\]", b["text"])) for b in blocchi)
if tags>6: errori.append(f"tag di intenzione: {tags} > 6")

pose=sum(b["posa"] for b in blocchi)
parlato=tot/CPS+pose; durata=parlato+3+10
print(f"blocchi   {len(blocchi)}        scene {nscene}/50")
print(f"caratteri {tot}      media {tot/len(blocchi):.0f} car/blocco")
print(f"parlato   {parlato:.0f} s     montato {durata//60:.0f}:{durata%60:04.1f}   (stima a {CPS} car/s)")
print(f"tag       {tags}        pose {sum(1 for b in blocchi if b['posa'])}")
print()
cur=None
for b in blocchi:
    if b["capitolo"]!=cur:
        cur=b["capitolo"]; print(f'  cap {cur:2d}  {CAPITOLI[cur]}')
    p=f'  +{b["posa"]}s' if b["posa"] else ""
    print(f'    {b["id"]}  {len(b["text"]):3d} car  [{b["tema"]:8s}]{p} {b["text"][:52]}...')

# Lo stacco fra le due tracce: il confine di capitolo che divide i caratteri
# nel modo piu' pari, fra quelli che tengono ENTRAMBI i chunk sotto i 5.000.
# Prendere il primo confine dopo la meta' non basta: su 2.2 dava un chunk A da
# 5.072 caratteri, e la voce avrebbe rifiutato il testo.
LIMITE = 5000
cand = []
acc = 0
for i, b in enumerate(blocchi[:-1]):
    acc += len(b["text"]) + 1
    if b["capitolo"] != blocchi[i+1]["capitolo"]:
        cand.append((b["id"], acc, tot - acc))
buoni = [c for c in cand if c[1] <= LIMITE and c[2] <= LIMITE]
if buoni:
    stacco, a, bb = min(buoni, key=lambda c: abs(c[1] - c[2]))
    print(f"\nstacco tracce dopo {stacco}:  chunkA {a} car  ·  chunkB {bb} car   (limite {LIMITE})")
else:
    stacco, a, bb = min(cand, key=lambda c: max(c[1], c[2]))
    errori.append(f"nessuno stacco tiene i due chunk sotto {LIMITE}: il migliore e' "
                  f"{stacco} con {max(a, bb)} car. Serve un capitolo in piu'.")
    print(f"\nstacco tracce dopo {stacco}:  chunkA {a} car  ·  chunkB {bb} car   (limite {LIMITE})")
# tagli.py deve tagliare dove la voce ha davvero staccato: se le due costanti
# divergono, i blocchi finiscono sulla traccia sbagliata e non se ne accorge
# nessuno finche' non si guarda il video.
import pathlib as _pl
_tagli = _pl.Path("audio/tagli.py")
if _tagli.exists():
    _m = re.search(r'STACCO\s*=\s*"(s\d+)"', _tagli.read_text(encoding="utf-8"))
    if _m and _m.group(1) != stacco:
        errori.append(f'audio/tagli.py ha STACCO = "{_m.group(1)}", qui lo stacco e\' {stacco}')

print("\n" + ("OK, nessun errore" if not errori else "ERRORI:\n  " + "\n  ".join(errori)))
json.dump(blocchi, open("copione/blocchi.json","w",encoding="utf-8"), ensure_ascii=False, indent=1)

# I due chunk per la voce li scrive lo stesso file che ha scritto i blocchi:
# copiarli a mano significherebbe far divergere il copione dal testo letto,
# e la verifica della trascrizione confronterebbe due cose gia' diverse.
i = [b["id"] for b in blocchi].index(stacco)
for nome, gruppo in (("A", blocchi[:i+1]), ("B", blocchi[i+1:])):
    open(f"audio/chunk{nome}.txt","w",encoding="utf-8").write(
        "\n\n".join(b["text"] for b in gruppo) + "\n")
print(f"scritti audio/chunkA.txt e audio/chunkB.txt")
```

## `audio/tagli.py`

Il cuore della lavorazione audio: misura le pause sulla traccia **grezza**,
allinea la punteggiatura del copione ai segmenti di parlato con la DTW, vota
la soglia sull'esito e non sulla quantita' di confini, poi ritaglia i blocchi
applicando il filtro del ritmo. `correzioni.json` va riapplicato sempre da
capo: `correggi` modifica `confini-X.json` sul posto.

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Passo 3 del MASTER: ritaglia i blocchi dalle due tracce continue.

I confini si scelgono sul GREZZO, dove le pause hanno ancora lunghezze diverse:
sulla traccia gia' lavorata silenceremove le ha pareggiate tutte a 0,14 s e
la lunghezza della pausa - il segnale su cui si basa la scelta - sparisce.
Il ritmo (silenzi + atempo calcolato) si applica dopo, blocco per blocco.

  tagli.py allinea   sceglie i confini e prepara prova.mp3
  tagli.py correggi  sposta i confini indicati in correzioni.json
  tagli.py applica   scrive i blocchi + le pose
"""
import json, re, subprocess, sys
from pathlib import Path
import imageio_ffmpeg

QUI    = Path(__file__).resolve().parent
RADICE = QUI.parent
FF     = imageio_ffmpeg.get_ffmpeg_exe()
STACCO = "s25"
SOGLIA = "-45dB"
SILENZI = ("silenceremove=start_periods=1:start_silence=0.03:start_threshold=-45dB:"
           "stop_periods=-1:stop_silence=0.14:stop_threshold=-45dB:detection=peak,"
           "aresample=44100")
MIRA = 17.0          # car/s voluti sul parlato finito

_ritmo = None
_trim = None
def _trimfatt():
    """Di quanto la sola rimozione dei silenzi accorcia questa traccia."""
    ritmo()
    return _trim

def ritmo():
    """Il fattore di velocita' NON e' una costante.

    Era 1,12 per tutto il modulo 1, perche' quella voce leggeva a un ritmo
    suo. Sulla 2.2 la stessa voce, con lo stesso modello, ha letto il 7% piu'
    veloce: con 1,12 sei blocchi sarebbero usciti oltre i 21 car/s e il video
    sarebbe finito sotto gli otto minuti chiesti. L'atempo e' la manopola con
    cui si porta il parlato finito a MIRA car/s, e va calcolata sulla traccia
    che si ha davvero, non su quella dell'altra volta."""
    global _ritmo, _trim
    if _ritmo is None:
        car = sum(len(b["text"]) for b in
                  json.loads((RADICE/"copione"/"blocchi.json").read_text(encoding="utf-8")))
        grezzo = sum(durata(QUI/f"grezzo-{L}.mp3") for L in ("A","B"))
        # Quanto tolgono i silenzi si MISURA, non si stima: fra 2.1 e 2.2 il
        # fattore e' passato da 1,152 a 1,090, e stimarlo sbagliava di mezzo
        # minuto sul montato. Costa una passata di ffmpeg su dieci minuti.
        netto = 0.0
        for L in ("A", "B"):
            f = QUI/f"_trim-{L}.mp3"
            sh(FF,"-y","-v","error","-i",QUI/f"grezzo-{L}.mp3","-af",SILENZI,
               "-c:a","libmp3lame","-b:a","192k",f)
            netto += durata(f); f.unlink()
        _trim = grezzo/netto
        a = max(1.0, min(1.25, netto / (car/MIRA)))
        _ritmo = (round(a, 3), SILENZI + f",atempo={a:.3f}")
        print(f"  ritmo: {grezzo:.0f} s grezzi -> {netto:.0f} s senza pause di troppo "
              f"(x{grezzo/netto:.3f}); {car} caratteri -> atempo {a:.3f} "
              f"(parlato atteso {netto/a:.0f} s, {car/(netto/a):.1f} car/s)")
    return _ritmo
PROVA_PRIMA, PROVA_GAP = 1.6, 2.5

def sh(*a):
    r = subprocess.run([str(x) for x in a], capture_output=True, text=True)
    return r.stdout + r.stderr

def durata(f):
    t = re.findall(r"time=(\d+):(\d+):([\d.]+)", sh(FF,"-i",f,"-f","null","-"))[-1]
    return int(t[0])*3600+int(t[1])*60+float(t[2])

def pause(f, dmin):
    o = sh(FF,"-i",f,"-af",f"silencedetect=noise={SOGLIA}:d={dmin}","-f","null","-")
    ini = [float(x) for x in re.findall(r"silence_start:\s*(-?[\d.]+)", o)]
    fin = [float(x) for x in re.findall(r"silence_end:\s*([\d.]+)", o)]
    return [(a,b) for a,b in zip(ini,fin) if b>a]

def blocchi():
    b = json.loads((RADICE/"copione"/"blocchi.json").read_text(encoding="utf-8"))
    i = [x["id"] for x in b].index(STACCO)
    return b[:i+1], b[i+1:]

# ------------------------------------------------------------------ allineamento
def segmenti(traccia, dmin):
    """Gli spezzoni di parlato fra una pausa e l'altra."""
    D = durata(traccia); P = pause(traccia, dmin)
    segs, t = [], 0.0
    for a,b in P:
        if a > t + 0.05: segs.append((t, a))
        t = b
    if D > t + 0.05: segs.append((t, D))
    return D, segs, P

UNITA  = ("zero","uno","due","tre","quattro","cinque","sei","sette","otto","nove")
DIECI  = ("dieci","undici","dodici","tredici","quattordici","quindici","sedici",
          "diciassette","diciotto","diciannove")
DECINE = ("","","venti","trenta","quaranta","cinquanta","sessanta","settanta",
          "ottanta","novanta")

def in_lettere(n):
    """Il numero come la voce lo pronuncia. Serve solo la LUNGHEZZA, ma scriverlo
    per esteso e' piu' onesto che indovinare un fattore."""
    if n < 10:  return UNITA[n]
    if n < 20:  return DIECI[n-10]
    if n < 100:
        d, u = divmod(n, 10)
        s = DECINE[d]
        if u in (1, 8): s = s[:-1]            # ventuno, ventotto
        return s + (UNITA[u] if u else "")
    if n < 1000:
        c, r = divmod(n, 100)
        return (("" if c == 1 else UNITA[c]) + "cento" + (in_lettere(r) if r else ""))
    m, r = divmod(n, 1000)
    return (("mille" if m == 1 else UNITA[m] + "mila") + (in_lettere(r) if r else ""))

def peso(q):
    """Quanto DURA un pezzo di copione, non quanto e' lungo.

    La DTW pesava i pezzi in caratteri, e su 2.4 questo ha spostato di 2,1 s il
    confine fra s38 e s39: il pezzo «1.4 e 1.5.» sono dieci caratteri, ma la
    voce dice «uno punto quattro e uno punto cinque» e ci mette quattro
    secondi.

    Il rimedio di 2.4 era una cifra = cinque caratteri, piatto. Funziona in
    media e sbaglia agli estremi, in tutti e due i versi: «12» pesava dieci e
    la voce dice «dodici», che ne vale sei; «1994» pesava venti e la voce dice
    «millenovecentonovantaquattro», che ne vale ventotto. Su 2.6, dove i numeri
    di Raccomandazione sono fitti, l'eccesso ha spostato di 1,2 s il confine fra
    s33 e s34. Adesso il numero si scrive per esteso e si conta quello: la
    differenza fra «sette» e «millenovecentonovantaquattro» la sa l'italiano,
    non un fattore moltiplicativo."""
    def sost(m):
        n = int(m.group(0))
        return in_lettere(n) if n < 10000 else m.group(0)
    # Il punto fra due cifre e' un separatore di lezione o di articolo, e si
    # legge «punto»: «1.5» e' «uno punto cinque», non «uno virgola cinque».
    q = re.sub(r"(?<=\d)\.(?=\d)", " punto ", q)
    return float(len(re.sub(r"\d+", sost, q)))

def pezzi_testo(gruppo):
    """Il copione spezzato alla punteggiatura: e' li' che la voce mette le pause.
    Restituisce (peso in tempo, id del blocco, e' l'ultimo pezzo del blocco)."""
    out = []
    for x in gruppo:
        t = re.sub(r"\[[a-z]+\]", "", x["text"]).strip()
        parti = [q for q in re.split(r"(?<=[.:;,])\s+", t) if q.strip()]
        for i,q in enumerate(parti):
            out.append((peso(q), x["id"], i == len(parti)-1))
    return out

def allinea_dtw(pezzi, segs, MAXT=5, MAXA=2):
    """Allineamento monotono fra pezzi di testo e spezzoni di audio.
    Un solo spezzone puo' contenere fino a MAXT pezzi (la voce non fa pausa a
    ogni virgola); un pezzo puo' stendersi su MAXA spezzoni."""
    n, m = len(pezzi), len(segs)
    car = [p[0] for p in pezzi]
    dur = [b-a for a,b in segs]
    rate = sum(car)/sum(dur)
    INF = float("inf")
    costo = lambda c,d: ((d - c/rate)**2)/(0.35 + d)
    D  = [[INF]*(m+1) for _ in range(n+1)]
    da = [[None]*(m+1) for _ in range(n+1)]
    D[0][0] = 0.0
    for i in range(n+1):
        for j in range(m+1):
            base = D[i][j]
            if base == INF: continue
            for kt in range(1, MAXT+1):
                if i+kt > n: break
                c_t = sum(car[i:i+kt])
                for ka in range(1, MAXA+1):
                    if j+ka > m: break
                    d_a = sum(dur[j:j+ka])
                    c = base + costo(c_t, d_a) + 0.25*(kt-1) + 0.45*(ka-1)
                    if c < D[i+kt][j+ka]: D[i+kt][j+ka], da[i+kt][j+ka] = c, (i,j)
    fine = [None]*n
    i, j = n, m
    while (i,j) != (0,0):
        pi, pj = da[i][j]
        for k in range(pi, i): fine[k] = j-1
        i, j = pi, pj
    return fine, rate

def confini_con(traccia, gruppo, dmin):
    """Prova una soglia di pausa e restituisce i confini che ne escono."""
    D, segs, P = segmenti(traccia, dmin)
    pezzi = pezzi_testo(gruppo)
    if len(segs) < len(pezzi)*0.35: return None
    fine, rate = allinea_dtw(pezzi, segs)
    inizi = [a for a,_ in segs] + [D]
    conf = []
    for k,(_,idb,ultimo) in enumerate(pezzi):
        if not ultimo or k == len(pezzi)-1: continue
        j = fine[k]
        conf.append((segs[j][1] + inizi[j+1]) / 2)      # a meta' della pausa
    return D, sorted(conf), len(pezzi), len(segs), rate

def quanto_male(gruppo, D, conf):
    """Quanti blocchi cadono fuori fascia, e quanto e' sparpagliata la velocita'.
    E' il metro con cui si sceglie fra le soglie: un solo confine sbagliato fa
    uscire un blocco lunghissimo accanto a uno cortissimo, e si vede da qui."""
    bordi = [0.0]+list(conf)+[D]
    durate = [bordi[i+1]-bordi[i] for i in range(len(gruppo))]
    # Una soglia sbagliata puo' mettere due confini sulla stessa pausa e lasciare
    # un blocco di durata zero. Non e' un caso da far esplodere: e' il caso
    # peggiore possibile, e come tale va pesato.
    if min(durate) < 0.30: return (10**6, 10**6)
    acc = _trimfatt()*ritmo()[0]
    cps = [len(x["text"])/(d/acc) for x,d in zip(gruppo, durate)]
    fuori = sum(not (8.5 <= c <= 21) for c in cps)
    medio = sum(cps)/len(cps)
    sparso = (sum((c-medio)**2 for c in cps)/len(cps))**0.5
    return fuori, sparso

def scegli(traccia, gruppo):
    """Confini = fine dello spezzone su cui cade l'ultimo pezzo di ogni blocco.

    La soglia di pausa non si sceglie al primo tentativo che «ha abbastanza
    spezzoni»: quel criterio guarda la quantita' e non l'esito. Su 1.5 la
    soglia di 0,18 s ha mancato per un centesimo una pausa vera, e i due
    blocchi attorno sono usciti uno di 19 secondi e uno di 8. Si provano
    tutte le soglie e si tiene quella che lascia meno blocchi fuori fascia."""
    migliore = None
    for dmin in (0.18, 0.15, 0.12, 0.22, 0.10):
        r = confini_con(traccia, gruppo, dmin)
        if r is None: continue
        D, conf, npezzi, nsegs, rate = r
        voto = quanto_male(gruppo, D, conf)
        if migliore is None or voto < migliore[0]:
            migliore = (voto, dmin, D, conf, npezzi, nsegs, rate)
    voto, dmin, D, conf, npezzi, nsegs, rate = migliore
    print(f"  [{npezzi} pezzi di testo · {nsegs} spezzoni di audio · "
          f"{rate:.1f} car/s grezzi · pausa minima {dmin} s · "
          f"{voto[0]} fuori fascia]")
    return D, conf

def stato(L): return QUI/f"confini-{L}.json"

def mostra(L, gruppo, D, conf):
    bordi = [0.0]+conf+[D]
    print(f"\ntraccia {L}  {D:.2f} s grezzi  ·  {len(gruppo)} blocchi")
    fuori = 0
    for i,x in enumerate(gruppo):
        d = bordi[i+1]-bordi[i]
        cps = len(x["text"])/(d/(_trimfatt()*ritmo()[0]))   # stima con l'atempo di questa lezione
        bad = not (8.5 <= cps <= 21); fuori += bad
        print(f"  {x['id']}  {bordi[i]:7.2f} -> {bordi[i+1]:7.2f}  {d:5.2f}s grezzi  "
              f"~{cps:5.1f} car/s{'   <-- FUORI FASCIA' if bad else ''}")
    return fuori

def cmd_allinea():
    A,B = blocchi(); tutti = []; fuori = 0
    for L,gruppo in (("A",A),("B",B)):
        tr = QUI/f"grezzo-{L}.mp3"
        D, conf = scegli(tr, gruppo)
        stato(L).write_text(json.dumps({"durata":D,"confini":conf,
            "ids":[x["id"] for x in gruppo]}, indent=1), encoding="utf-8")
        fuori += mostra(L, gruppo, D, conf)
        bordi=[0.0]+conf+[D]
        tutti += [(L,x["id"],bordi[i]) for i,x in enumerate(gruppo)]
    print(f"\nfuori fascia: {fuori}")
    fai_prova(tutti)

def fai_prova(tutti):
    tmp = QUI/"_prova"; tmp.mkdir(exist_ok=True)
    for p in tmp.glob("*.wav"): p.unlink()
    pezzi, elenco = [], []
    for k,(L,idb,ini) in enumerate(tutti):
        if ini <= 0.01: continue                  # inizio traccia: non e' un confine
        p = tmp/f"p{k:03d}.wav"
        sh(FF,"-y","-v","error","-ss",f"{max(0,ini-PROVA_PRIMA):.3f}","-t",f"{PROVA_PRIMA:.3f}",
           "-i",QUI/f"grezzo-{L}.mp3","-ar","44100","-ac","1",p)
        pezzi.append(p); elenco.append({"n":len(pezzi),"traccia":L,"id":idb,"taglio":round(ini,3)})
    sil = tmp/"sil.wav"
    sh(FF,"-y","-v","error","-f","lavfi","-i","anullsrc=r=44100:cl=mono","-t",PROVA_GAP,sil)
    lst = tmp/"lista.txt"
    lst.write_text("".join(f"file '{p}'\nfile '{sil}'\n" for p in pezzi), encoding="utf-8")
    sh(FF,"-y","-v","error","-f","concat","-safe","0","-i",lst,
       "-c:a","libmp3lame","-b:a","128k",QUI/"prova.mp3")
    (QUI/"prova.json").write_text(json.dumps(elenco,indent=1,ensure_ascii=False),encoding="utf-8")
    print(f"prova.mp3: {len(pezzi)} spezzoni, {durata(QUI/'prova.mp3'):.1f} s "
          f"— 1,6 s prima di ogni taglio, separati da {PROVA_GAP} s di silenzio")

def cmd_correggi():
    """correzioni.json: {"B": {"18": {"pause": -1}, "19": {"secondi": -0.4}}}
    "pause" sposta il confine di N pause (indietro se negativo); "secondi" a mano."""
    corr = json.loads((QUI/"correzioni.json").read_text(encoding="utf-8"))
    A,B = blocchi(); gruppi = {"A":A,"B":B}
    for L, mappa in corr.items():
        st = json.loads(stato(L).read_text(encoding="utf-8"))
        _, segs, _ = segmenti(QUI/f"grezzo-{L}.mp3", 0.18)
        varchi = [(segs[k][1]+segs[k+1][0])/2 for k in range(len(segs)-1)]   # meta' di ogni pausa
        for k, come in mappa.items():
            j = int(k); vecchio = st["confini"][j]
            if "pause" in come:
                n = come["pause"]
                vicino = min(range(len(varchi)), key=lambda i: abs(varchi[i]-vecchio))
                nuovo = varchi[max(0, min(len(varchi)-1, vicino+n))]
            else:
                nuovo = vecchio + float(come["secondi"])
            st["confini"][j] = nuovo
            print(f"  {L}[{j}]  {vecchio:.2f} -> {nuovo:.2f}  ({nuovo-vecchio:+.2f} s)")
        st["confini"].sort()
        stato(L).write_text(json.dumps(st,indent=1),encoding="utf-8")
    tutti = []
    for L,gruppo in (("A",A),("B",B)):
        st = json.loads(stato(L).read_text(encoding="utf-8"))
        bordi = [0.0]+st["confini"]+[st["durata"]]
        mostra(L, gruppo, st["durata"], st["confini"])
        tutti += [(L,x["id"],bordi[i]) for i,x in enumerate(gruppo)]
    fai_prova(tutti)

def cmd_applica():
    A,B = blocchi()
    out = QUI/"blocchi"; out.mkdir(exist_ok=True)
    reg = []
    for L,gruppo in (("A",A),("B",B)):
        st = json.loads(stato(L).read_text(encoding="utf-8"))
        bordi = [0.0]+st["confini"]+[st["durata"]]
        for i,x in enumerate(gruppo):
            ini,fin = bordi[i],bordi[i+1]
            f = out/f"{x['id']}.mp3"
            sh(FF,"-y","-v","error","-ss",f"{ini:.3f}","-to",f"{fin:.3f}",
               "-i",QUI/f"grezzo-{L}.mp3","-af",ritmo()[1],"-c:a","libmp3lame","-b:a","192k",f)
            d = durata(f)
            # §1.4: i blocchi corti si allungano perche' respirino. In piu', il
            # copione puo' chiedere una posa esplicita dove il discorso la vuole.
            posa = round(max(0.0, 4.6-d),2) if d < 3.5 else 0.0
            posa = max(posa, float(x.get("posa", 0)))
            if posa:
                sh(FF,"-y","-v","error","-i",f,"-af",f"apad=pad_dur={posa}",
                   "-c:a","libmp3lame","-b:a","192k",out/f"_{x['id']}.mp3")
                (out/f"_{x['id']}.mp3").replace(f); d = durata(f)
            reg.append({"id":x["id"],"traccia":L,"da":round(ini,3),"a":round(fin,3),
                        "durata":round(d,3),"posa":posa,"car":len(x["text"]),
                        "cps":round(len(x["text"])/d,1)})
    (QUI/"blocchi-audio.json").write_text(json.dumps(reg,indent=1,ensure_ascii=False),encoding="utf-8")
    tot = sum(r["durata"] for r in reg); m = tot+13
    fuori = [r for r in reg if not 8.5<=r["cps"]<=21]
    print(f"{len(reg)} blocchi  ·  parlato {tot:.1f} s  ·  montato {int(m//60)}:{m%60:04.1f}")
    print(f"pose: {sum(1 for r in reg if r['posa'])}   fuori fascia: {len(fuori)}")
    for r in fuori: print(f"   {r['id']}  {r['cps']} car/s  {r['durata']} s")

if __name__ == "__main__":
    {"allinea":cmd_allinea,"correggi":cmd_correggi,"applica":cmd_applica}[sys.argv[1]]()
```

## `audio/verifica-testo.py`

Confronta la trascrizione con il copione. Contiene il convertitore dei
cardinali italiani in cifre (`quarantotto` -> `48`) e le rese dichiarate:
senza quelli segnalerebbe come errori una dozzina di letture corrette.

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Confronta la trascrizione di ogni traccia col copione, parola per parola.

Serve a trovare i buchi della voce: in 1.1 la sintesi aveva mangiato sei parole
di fila e il salto si vedeva solo cosi'. Non verifica dove cadono i tagli -
quello lo fanno l'allineamento DTW e verifica-locale.py - ma verifica che nel
grezzo ci sia tutto quello che c'era nel copione.

Le differenze di sola resa (accenti sciolti, acronimi, cifre scritte in lettere)
non sono errori: si normalizza prima di confrontare, e si segnalano solo le
sequenze di parole del copione che nella trascrizione mancano del tutto.
"""
import json, re, sys, unicodedata, difflib
from pathlib import Path

QUI    = Path(__file__).resolve().parent
RADICE = QUI.parent
# Lo stacco fra le due tracce e' dichiarato una volta sola, in tagli.py:
# tenerne una seconda copia qui vuol dire che prima o poi le due divergono
# in silenzio, e il confronto si fa sui blocchi sbagliati.
STACCO = re.search(r'^STACCO\s*=\s*"([^"]+)"',
                   (QUI/"tagli.py").read_text(encoding="utf-8"),
                   re.M).group(1)
BUCO   = 3   # da quante parole di fila in poi il salto e' sospetto

# I numeri di legge, di articolo e di anno sono la resa che ricorre di piu':
# il copione li scrive in cifre e il trascrittore, quando la voce li pronuncia
# per esteso, li riscrive a parole - e non in modo costante: sulla stessa
# lezione 1.8 la traccia A ha reso «739» come «settecentotrentanove» e la B
# come «739». Non e' una tolleranza generica: e' una regola dichiarata, che
# converte il numero cardinale italiano nella sua cifra, sui due testi.
UNI   = {"zero":0,"uno":1,"un":1,"due":2,"tre":3,"quattro":4,"cinque":5,
         "sei":6,"sette":7,"otto":8,"nove":9}
DIECI = {"dieci":10,"undici":11,"dodici":12,"tredici":13,"quattordici":14,
         "quindici":15,"sedici":16,"diciassette":17,"diciotto":18,"diciannove":19}
DEC   = {"venti":20,"trenta":30,"quaranta":40,"cinquanta":50,
         "sessanta":60,"settanta":70,"ottanta":80,"novanta":90}

def _sotto100(s):
    if s == "": return 0
    if s in DIECI: return DIECI[s]
    if s in DEC:   return DEC[s]
    if s in UNI:   return UNI[s]
    for d,v in DEC.items():
        # le forme elise: venti+uno = ventuno, quaranta+otto = quarantotto
        for u in ("uno","otto"):
            if s == d[:-1]+u: return v+UNI[u]
        if s.startswith(d):
            r = s[len(d):]
            if r in UNI: return v+UNI[r]
    return None

def _sotto1000(s):
    if s == "": return 0
    i = s.find("cento")
    if i >= 0:
        pre, post = s[:i], s[i+5:]
        c = 1 if pre == "" else UNI.get(pre)
        if c is not None:
            p = _sotto1000(post) if post else 0
            if p is not None: return c*100+p
    return _sotto100(s)

def cifra(s):
    """La parola-numero come cifra, oppure la parola stessa se non lo e'."""
    if s.startswith("mille"):
        p = _sotto1000(s[5:])
        if p is not None: return str(1000+p)
    i = s.find("mila")
    if i > 0:
        m, p = _sotto1000(s[:i]), _sotto1000(s[i+4:])
        if m is not None and p is not None: return str(m*1000+p)
    n = _sotto1000(s)
    return s if n is None else str(n)

# Termini che copione e trascrizione scrivono in modo diverso pur dicendo la
# stessa cosa: la sigla sillabata torna incollata, il numero di lezione torna
# in cifre. Si uniformano sul testo grezzo, prima di spezzarlo in parole.
RESE = [
 (r"\bl\s*m\s*/?\s*s\s*n\s*t\s*-?\s*1\b", " siglamagistrale "),
 (r"\b(elle\s+)?emme\s+esse\s+enne\s+ti\s+uno\b", " siglamagistrale "),
 (r"\blms\s*nt\s*1\b",                              " siglamagistrale "),
 (r"\bl\s*/?\s*s\s*n\s*t\s*-?\s*1\b",            " siglatriennale "),
 (r"\belle\s+esse\s+enne\s+ti\s+uno\b",            " siglatriennale "),
 (r"\bls\s*nt\s*1\b",                                " siglatriennale "),
 # I rimandi alle altre lezioni: il copione li scrive a parole, il
 # trascrittore in cifre.
 (r"\b(uno|1)[\s.]+(punto[\s.]+)?uno\b",   " lezione11 "),
 (r"\b1[\s.]+1\b",                        " lezione11 "),
 (r"\b(uno|1)[\s.]+(punto[\s.]+)?due\b",   " lezione12 "),
 (r"\b1[\s.]+2\b",                        " lezione12 "),
 (r"\b(uno|1)[\s.]+(punto[\s.]+)?tre\b",   " lezione13 "),
 (r"\b1[\s.]+3\b",                        " lezione13 "),
 (r"\b(uno|1)[\s.]+(punto[\s.]+)?cinque\b"," lezione15 "),
 (r"\b1[\s.]+5\b",                        " lezione15 "),
 (r"\b(uno|1)[\s.]+(punto[\s.]+)?sei\b",   " lezione16 "),
 (r"\b1[\s.]+6\b",                        " lezione16 "),
 (r"\b(uno|1)[\s.]+(punto[\s.]+)?quattro\b"," lezione14 "),
 (r"\b1[\s.]+4\b",                        " lezione14 "),
 (r"\b(uno|1)[\s.]+(punto[\s.]+)?sette\b", " lezione17 "),
 (r"\b1[\s.]+7\b",                        " lezione17 "),
 # Fonetica: «illecito» e «il lecito» suonano identici in italiano.
 (r"\bil\s+leciti?o\b", " illecito "),
 # Le sigle: il trascrittore a volte le compita lettera per lettera.
 (r"\bf\s+n\s+o\s+p\s+i\b",             " fnopi "),
 (r"\bo\s+p\s+i\b",                       " opi "),
 (r"\bd\s+a\s+t\b",                       " dat "),
 (r"\be\s+c\s+m\b",                       " ecm "),
 # La lettera dell'articolo 9.2 GDPR: il copione la scrive come si pronuncia
 # («lettera acca»), il trascrittore la riporta come si scrive («lettera h»).
 (r"\blettera\s+(acca|h)\b",          " lettera acca "),
 # Il prefisso «post»: il copione lo stacca per farlo leggere bene, il
 # trascrittore lo riattacca. Sono la stessa parola, non una resa diversa.
 (r"\bpost\s+(operatori[ao]|operatorie|operatori)\b", r" post\1 "),
 # Parole che il trascrittore rende in modo suo, senza che la voce abbia
 # sbagliato: le spezza, le anglicizza, o le riscrive con la grafia piu'
 # comune di un cognome straniero.
 (r"\bmeta\s+paradigma\b",               " metaparadigma "),
 (r"\bnewman\b",                          " neuman "),
 (r"\bdiagnosis\b",                       " diagnosi "),
 (r"\banti\s+decubito\b",                 " antidecubito "),
 # Le unita' di misura: il copione le scrive per esteso perche' la voce le
 # legga bene, il trascrittore le abbrevia.
 (r"\bcentimetri\b",                       " cm "),
 # Le sigle lette come parola: il trascrittore le scrive come le sente, e
 # sente una vocale in meno.
 (r"\bsopie\b|\bsopi\b",                    " soapie "),
 (r"\bsop\b",                               " soap "),
 # Sigla piu' numero: il copione li stacca, il trascrittore li unisce.
 (r"\bnrs\s*(\d)\b",                      r" nrs \1 "),
 # Parole composte che il trascrittore stacca o attacca a suo gusto: sono la
 # stessa parola detta nello stesso modo, e la differenza e' solo ortografica.
 (r"\bmeta\s+analisi\b",                  " metanalisi "),
 (r"\bchecklist\b",                        " check list "),
 # Due grafie entrambe corrette: il copione scrive «etiologia», il
 # trascrittore sente «eziologia». La voce dice la stessa cosa.
 (r"\beziologia\b",                        " etiologia "),
 # Il cognome di una scala non e' una parola italiana, e il trascrittore lo
 # scrive come gli suona: su 2.8 tre volte in tre modi diversi.
 (r"\bconleys\b|\bconleigh\b",            " conley "),
]

def parole(s):
    s = re.sub(r"\[[a-z]+\]", " ", s.lower())
    s = unicodedata.normalize("NFD", s)
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    # La punteggiatura va tolta PRIMA delle sostituzioni: il trascrittore
    # scrive «F, N, O, P, I.» e con le virgole in mezzo nessuna regola
    # riconoscerebbe la sigla.
    s = re.sub(r"[^a-z0-9]+", " ", s)
    for pat, con in RESE: s = re.sub(pat, con, s)
    return [cifra(p) for p in re.findall(r"[a-z0-9]+", s)]

def gruppi():
    b = json.loads((RADICE/"copione"/"blocchi.json").read_text(encoding="utf-8"))
    i = [x["id"] for x in b].index(STACCO)
    return {"A": b[:i+1], "B": b[i+1:]}

esiti, guai = {}, 0
for nome, gruppo in gruppi().items():
    atteso = []
    for x in gruppo:
        for p in parole(x["text"]): atteso.append((p, x["id"]))
    detto = parole((QUI/"trascrizioni"/f"{nome}.txt").read_text(encoding="utf-8"))
    sm = difflib.SequenceMatcher(None, [p for p,_ in atteso], detto, autojunk=False)
    mancanti, sostituzioni = [], []
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag == "replace" and (i2-i1) < BUCO:
            sostituzioni.append({
                "blocco": atteso[i1][1],
                "copione": " ".join(p for p,_ in atteso[i1:i2]),
                "detto": " ".join(detto[j1:j2]) or "(nulla)"})
        if tag in ("delete","replace") and (i2-i1) >= BUCO:
            mancanti.append({
                "blocco": atteso[i1][1],
                "parole_copione": " ".join(p for p,_ in atteso[i1:i2]),
                "al_loro_posto": " ".join(detto[j1:j2]) or "(nulla)",
            })
    uguali = sum(k for _,_,k in sm.get_matching_blocks())
    esiti[nome] = {"parole_copione": len(atteso), "parole_dette": len(detto),
                   "coincidenti": uguali, "buchi": mancanti,
                   "sostituzioni_brevi": sostituzioni}
    guai += len(mancanti)
    print(f"traccia {nome}  {uguali}/{len(atteso)} parole coincidenti "
          f"({100*uguali/len(atteso):.1f}%)   buchi da {BUCO}+ parole: {len(mancanti)}")
    for m in mancanti:
        print(f"    {m['blocco']}  copione: «{m['parole_copione']}»")
        print(f"          detto: «{m['al_loro_posto']}»")
    if sostituzioni:
        print(f"    scarti brevi (rese diverse, non buchi): {len(sostituzioni)}")
        for s2 in sostituzioni:
            print(f"      {s2['blocco']}  «{s2['copione']}» -> «{s2['detto']}»")

(QUI/"esiti-testo.json").write_text(json.dumps(esiti, ensure_ascii=False, indent=1), encoding="utf-8")
print("\n" + ("nessun buco: la voce ha detto tutto" if not guai
              else f"ATTENZIONE: {guai} buchi da controllare a orecchio"))
sys.exit(1 if guai else 0)
```

## `audio/controllo-per-trascrizione.py`

La verifica dei blocchi ritagliati: durata, velocita' di lettura, silenzi ai
bordi.

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Dice quali confini cadono fuori posto, e di quanto.

prova.mp3 sono 1,6 s presi prima di ogni taglio, separati da 2,5 s di silenzio:
la trascrizione li rende come frasi separate, una per confine. Per ogni frase
si cerca, fra TUTTI i fini-frase del blocco che precede e di quello che segue,
quello la cui coda le somiglia di piu'. Se il vincitore non e' il confine
voluto, il taglio e' fuori posto e si sa esattamente dove e' finito.
"""
import json, re, sys, difflib, unicodedata
from pathlib import Path

QUI, RADICE = Path(__file__).resolve().parent, Path(__file__).resolve().parent.parent

NUMERI = {"uno":"1","due":"2","tre":"3","quattro":"4","cinque":"5","sei":"6",
          "sette":"7","otto":"8","nove":"9","dieci":"10","punto":""}

def norm(s):
    s = unicodedata.normalize('NFD', s.lower())
    s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
    s = s.replace("'"," ").replace("’"," ")
    p = re.sub(r"[^a-z0-9 ]", " ", s).split()
    return [NUMERI.get(w, w) for w in p if NUMERI.get(w, w)]

def somiglia(a, b):   # sui caratteri: regge i frammenti corti e i numeri
    return difflib.SequenceMatcher(None, " ".join(a), " ".join(b)).ratio()

def fini_frase(testo):
    """Posizioni (in parole) dove finisce una frase, dentro un blocco."""
    t = re.sub(r"\[[a-z]+\]", "", testo)
    fin, n = [], 0
    for pezzo in re.split(r"(?<=[.!?])\s+", t):
        if not norm(pezzo): continue
        n += len(norm(pezzo)); fin.append(n)
    return norm(t), fin

def main():
    bl = json.loads((RADICE/"copione"/"blocchi.json").read_text(encoding="utf-8"))
    testi  = {x["id"]: x["text"] for x in bl}
    ordine = [x["id"] for x in bl]
    fr = json.loads((QUI/"prova.json").read_text(encoding="utf-8"))
    grezza = (QUI/"trascrizioni"/"prova.txt").read_text(encoding="utf-8").strip()
    frasi = [f for f in re.split(r"(?<=[.!?])\s+", grezza) if norm(f)]
    if len(frasi) != len(fr):
        print(f"ATTENZIONE: {len(frasi)} frasi per {len(fr)} confini — il raffronto puo' slittare.\n")

    esiti, fuori = [], []
    for f, frase in zip(fr, frasi):
        i = ordine.index(f["id"])
        prec, segu = ordine[i-1], f["id"]
        sentito = norm(frase)
        L = max(2, len(sentito))

        # candidati: ogni fine-frase del blocco precedente e di quello seguente
        wp, fp = fini_frase(testi[prec])
        ws, fs = fini_frase(testi[segu])
        cand = []
        for k,pos in enumerate(fp):
            cand.append((f"{prec}.{k+1}", pos == fp[-1], somiglia(wp[max(0,pos-L):pos], sentito)))
        for k,pos in enumerate(fs):
            cand.append((f"{segu}.{k+1}", False, somiglia(ws[max(0,pos-L):pos], sentito)))
        cand.sort(key=lambda c: -c[2])
        dove, giusto, punteggio = cand[0]
        ok = giusto
        e = {"id":segu,"traccia":f["traccia"],"taglio":f["taglio"],"sentito":" ".join(sentito),
             "cade_a":dove,"somiglianza":round(punteggio,2),"ok":ok,
             "frasi_di_troppo": int(dove.split(".")[1]) if not ok and dove.startswith(segu) else 0}
        esiti.append(e)
        if not ok: fuori.append(e)
        print(f"{'  ok  ' if ok else 'FUORI '} {segu}  {punteggio:.2f}  cade a {dove:9s}"
              f"  «{e['sentito']}»")
    print(f"\nfuori posto: {len(fuori)}")
    for e in fuori:
        print(f"   {e['id']}: il taglio e' in ritardo di {e['frasi_di_troppo']} frase/i "
              f"(sta dentro {e['cade_a']})")
    (QUI/"esiti-verifica.json").write_text(json.dumps(esiti,indent=1,ensure_ascii=False),encoding="utf-8")
    return len(fuori)

if __name__ == "__main__":
    sys.exit(0 if main()==0 else 1)
```

## `controllo-statistico.py`

Il controllo statistico sui confini: la dispersione della velocita' di lettura
blocco per blocco. Un confine sbagliato si vede come un punto lontano dalla
nuvola — ma va poi confermato con l'aritmetica sulla traccia grezza, perche'
i blocchi densi di cifre sono lenti per conto loro.

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Controllo dei confini SENZA rete, quando la trascrizione non e' disponibile.

Due controlli, e il secondo vale piu' del primo.

1. La firma statistica. Se un taglio scivola in avanti di una frase, il blocco
   prima diventa piu' lungo di quanto il suo testo prometta e quello dopo piu'
   corto: due scarti grandi, adiacenti e di segno opposto. E' un indizio, non
   una prova: su 2.6 ha segnalato s33/s34, e il taglio era giusto — il blocco
   e' un elenco di numeri, e la voce ci mette le pause che il peso non sa
   prevedere.

2. Dove cade il taglio. Un taglio giusto sta DENTRO una pausa vera della voce.
   Un taglio spostato sta in mezzo a una frase, e si vede senza sapere che cosa
   la voce dice. Questo non e' un indizio: un taglio nel parlato e' un errore,
   punto. E' il controllo da guardare per primo, ed e' quello che ha assolto
   s33/s34 in dieci secondi.

Non sostituisce prova.mp3 + controllo-per-trascrizione.py, che sa anche QUALE
frase e' finita dove; ma per «il taglio e' nel posto giusto?» basta.
"""
import json, re, statistics, importlib.util, subprocess
from pathlib import Path
import imageio_ffmpeg

FF = imageio_ffmpeg.get_ffmpeg_exe()

QUI = Path(__file__).resolve().parent
reg = json.loads((QUI/"audio"/"blocchi-audio.json").read_text(encoding="utf-8"))
testi = {x["id"]: x["text"] for x in
         json.loads((QUI/"copione"/"blocchi.json").read_text(encoding="utf-8"))}

# Il peso NON si riscrive qui. Su 2.4 la DTW e questo controllo pesavano i
# pezzi in due modi diversi, e per una lezione intera nessuno se n'e' accorto:
# il peso e' uno solo, sta in tagli.py, e qui si importa.
_spec = importlib.util.spec_from_file_location("_tagli", QUI/"audio"/"tagli.py")
_tagli = importlib.util.module_from_spec(_spec); _spec.loader.exec_module(_tagli)

def peso(t):
    return _tagli.peso(re.sub(r"\[[a-z]+\]", "", t))

for L in ("A","B"):
    g = [r for r in reg if r["traccia"] == L]
    P = [peso(testi[r["id"]]) for r in g]
    D = [r["durata"] - r["posa"] for r in g]
    tasso = sum(P)/sum(D)
    res = [(d - p/tasso) for p,d in zip(P,D)]
    sd = statistics.pstdev(res)
    print(f"\ntraccia {L}   {tasso:.1f} peso/s   scarto tipico {sd:.2f} s")
    sosp = []
    for i,(r,e) in enumerate(zip(g,res)):
        seg = "  " if abs(e) < 1.5*sd else ("++" if e>0 else "--")
        if seg != "  ": sosp.append((i,r["id"],e))
        print(f"  {seg} {r['id']}  {r['durata']:5.2f}s   atteso {P[i]/tasso:5.2f}s   scarto {e:+5.2f}s")
    # la firma di un confine spostato: due scarti grandi, adiacenti, opposti
    print("  confini da guardare per primi:")
    trovati = False
    for a,b in zip(sosp, sosp[1:]):
        if b[0]-a[0] == 1 and a[2]*b[2] < 0:
            print(f"    fra {a[1]} e {b[1]}: {a[2]:+.2f}s / {b[2]:+.2f}s "
                  f"— il taglio sembra spostato di ~{abs(a[2]):.1f}s")
            trovati = True
    if not trovati: print("    nessuna coppia adiacente di segno opposto")


# La soglia va tenuta SOTTO la pausa minima che tagli.py accetta, che non e'
# una costante: la calcola per lezione. Con 0,15 s fissi questo controllo ha
# accusato il taglio s45 di 2.5, che cadeva nel centro esatto di una pausa di
# 0,143 s — un falso allarme prodotto dal controllo, non dal taglio. A 0,05 s
# nessuna pausa vera sfugge, e la durata stampata accanto a ogni taglio lascia
# comunque vedere quelle sospettosamente corte.
MINPAUSA = 0.05

def pause(mp3):
    """Le pause vere della voce, dal file grezzo."""
    err = subprocess.run([FF,"-v","info","-i",str(mp3),"-af",
          f"silencedetect=n=-45dB:d={MINPAUSA}","-f","null","-"],
          capture_output=True, text=True).stderr
    fuori, ini = [], None
    for m in re.finditer(r"silence_(start|end): ([\d.]+)", err):
        if m.group(1) == "start": ini = float(m.group(2))
        elif ini is not None: fuori.append((ini, float(m.group(2)))); ini = None
    return fuori

print("\n\nOGNI TAGLIO CADE DENTRO UNA PAUSA?")
guai = 0
for L in ("A","B"):
    d = json.loads((QUI/"audio"/f"confini-{L}.json").read_text(encoding="utf-8"))
    ps = pause(QUI/"audio"/f"grezzo-{L}.mp3")
    for bid, t in zip(d["ids"], d["confini"]):      # l'ultimo id finisce col file
        dentro = [q for q in ps if q[0] - 0.02 <= t <= q[1] + 0.02]
        if dentro:
            a, b = dentro[0]
            print(f"  {bid} -> pausa di {b-a:.2f}s")
        else:
            vic = min(ps, key=lambda q: min(abs(q[0]-t), abs(q[1]-t)))
            print(f"  {bid} -> NEL PARLATO: taglio a {t:.2f}s, "
                  f"la pausa piu' vicina e' {vic[0]:.2f}-{vic[1]:.2f}s")
            guai += 1
print(f"\n{guai} tagli nel parlato" if guai else "\nnessun taglio nel parlato: i confini sono dove la voce si ferma")
```

## `slide/layout.mjs`

L'impaginazione: temi, marchio in alto a sinistra, barra di avanzamento, i
corpi di testo. Importa la libreria grafica e rifiuta i tipi con dati sul
tema profondo, dove il contrasto delle serie non regge.

```javascript
// Layout unico delle slide: lo usano sia cards.mjs (PNG fermi) sia clips.mjs (fotogrammi).
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { CSS_GRAFICA, CORPI_GRAFICA, collega, FREGI } from './grafica.mjs';
const QUI = dirname(fileURLToPath(import.meta.url));

// --- palette ricavata dal marchio CISL FP Padova Rovigo ---
// I due colori sono campionati dal file del logo, non stimati:
// verde #00623A (40,7% dei pixel opachi) e rosso #D70328 (14,2%).
export const BIANCO='#FFFFFF', VERDE='#00623A', ROSSO='#D70328',
             TESTO='#1C1C1C',
             PROFONDO='#004E2E',   // il verde del marchio, scurito per reggere una campitura intera
             TENUE='#FCF4F3';      // velo di rosso: le slide degli errori

export const TEMI = {
  chiaro:   { bg:BIANCO,   fg:TESTO,     tit:VERDE,   acc:ROSSO,     sop:VERDE,     linea:'#E2E9E5', scuro:false },
  tenue:    { bg:TENUE,    fg:'#2A1D1D', tit:VERDE,   acc:'#C10225', sop:'#9A3040', linea:'#EFDCDA', scuro:false },
  // Sul verde pieno il rosso del marchio non regge: vibra e perde contrasto.
  // Li' l'accento e' il bianco, e la gerarchia la fa il peso, non un secondo colore.
  profondo: { bg:PROFONDO, fg:'#C3DACE', tit:BIANCO,  acc:BIANCO,    sop:'#8FC3A8', linea:'#0F6740', scuro:true  },
};

const FONT = readFileSync(join(QUI,'font','font-incorporati.css'),'utf8');
const MARCHIO = 'data:image/png;base64,' +
  readFileSync(join(QUI,'marchio','logo-rifilato.png')).toString('base64');

// *testo* -> in accento;  **testo** -> in accento e semibold
const acc = s => String(s??'')
  .replace(/\*\*(.+?)\*\*/g, '<b class="a">$1</b>')
  .replace(/\*(.+?)\*/g, '<span class="a">$1</span>');
// grafica.mjs usa la stessa funzione, invece di tenerne una copia che diverge.
collega(acc);
// Il sopratitolo e' gia' tutto di un colore suo: un accento li' non si vedrebbe.
// Ma i marcatori vanno tolti lo stesso, o finiscono a schermo come asterischi —
// e' successo davvero, su «l'accertamento e' *continuo*».
const sop = s => String(s ?? '').replace(/\*\*(.+?)\*\*/g, '$1').replace(/\*(.+?)\*/g, '$1');

const CSS = `
${FONT}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1920px;height:1080px;overflow:hidden}
body{font-family:'Inter',sans-serif;-webkit-font-smoothing:antialiased;
     font-feature-settings:'kern' 1,'liga' 1,'tnum' 1}
.slide{position:relative;width:1920px;height:1080px;display:flex;flex-direction:column;
       padding:178px 132px 118px}   /* 170 in alto: sotto il marchio */
.serif{font-family:'Source Serif 4',serif}
.a{color:var(--acc)}
b.a{font-weight:600}

/* cornice fissa */
.logo{position:absolute;top:42px;left:116px;padding:10px 16px;border-radius:13px;
      background:transparent;line-height:0}
.slide.scuro .logo{background:${BIANCO}}   /* sul verde pieno il marchio va su piastra bianca */
/* Sul verde pieno il titolo e' gia' bianco: se lo fosse anche l'accento, sparirebbe.
   Il titolo si smorza di poco e l'accento resta bianco pieno, piu' pesante. */
.slide.scuro h1,.slide.scuro h2{color:#D3E5DB}
.slide.scuro h1 .a,.slide.scuro h2 .a{color:${BIANCO};font-weight:700}
.logo img{display:block;height:70px;width:auto}
.pagina{position:absolute;top:70px;right:132px;font-size:21px;font-weight:500;letter-spacing:.08em;
        color:var(--sop);opacity:.75;font-variant-numeric:tabular-nums}
.avanz{position:absolute;left:0;bottom:0;height:9px;width:100%;background:var(--linea)}
.avanz i{display:block;height:100%;background:${ROSSO}}

.sop{font-size:26px;margin-top:-6px;font-weight:600;letter-spacing:.19em;text-transform:uppercase;
     color:var(--sop);margin-bottom:44px}
.corpo{flex:1;display:flex;flex-direction:column;justify-content:center;gap:40px}

h1{font-size:104px;line-height:1.08;font-weight:600;color:var(--tit);letter-spacing:-.015em}
h2{font-size:76px;line-height:1.16;font-weight:600;color:var(--tit);letter-spacing:-.01em}
.frase{font-size:66px;line-height:1.30;font-weight:400;color:var(--fg)}
.frase b{font-weight:600;color:var(--tit)}
.sotto{font-size:34px;line-height:1.5;color:var(--fg);opacity:.78;font-weight:400}

/* norma: sigla grande in lineare + una riga */
.norma{font-size:126px;font-weight:700;letter-spacing:-.02em;color:var(--tit);
       font-variant-numeric:lining-nums tabular-nums}
.norma small{display:block;font-size:30px;font-weight:600;letter-spacing:.17em;
             text-transform:uppercase;color:var(--sop);margin-bottom:26px}

/* numero gigante */
.cifra{font-size:300px;font-weight:700;line-height:.92;letter-spacing:-.035em;color:var(--acc);
       font-variant-numeric:lining-nums tabular-nums}

/* citazione */
.cita{font-size:64px;line-height:1.34;font-weight:400;text-indent:-.52em}
.cita .q{color:var(--acc)}
.fonte{font-size:28px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--sop)}

/* elenco */
ol.el,ul.el{list-style:none;display:flex;flex-direction:column;gap:30px}
.el li{display:flex;gap:34px;align-items:baseline;font-size:47px;line-height:1.28;color:var(--fg);
       opacity:.26;transition:none}
.el li.on{opacity:1}
.el li .n{flex:0 0 78px;font-size:34px;font-weight:700;color:var(--acc);letter-spacing:.02em;
          font-variant-numeric:lining-nums tabular-nums;padding-top:.28em}
.el li .n.gr{font-size:46px;padding-top:.12em}
.el li .n.no{color:#B6B6B6}
.el li .n.pt{color:var(--sop)}
.el li b{font-weight:600;color:var(--tit)}
.el li em{display:block;font-style:normal;font-size:33px;line-height:1.45;opacity:.72;margin-top:12px}
/* Gli elenchi lunghi non ci stanno alla misura piena: si stringono da soli
   invece di farsi tagliare dalla cornice. Le soglie stanno qui, non nelle
   scene, cosi' nessuna lezione se ne puo' dimenticare. Sono due perche' una
   voce con la sua spiegazione occupa il doppio: sette voci nude, oppure
   cinque se almeno una porta la riga di spiegazione. */
ol.el.fitto,ul.el.fitto{gap:20px}
.el.fitto li{font-size:40px;line-height:1.24;gap:28px}
.el.fitto li .n{flex:0 0 62px;font-size:29px}
.el.fitto li .n.gr{font-size:38px}
.el.fitto li em{font-size:28px;line-height:1.38;margin-top:8px}

/* tre riquadri */
.tre{display:grid;grid-template-columns:repeat(3,1fr);gap:38px}
/* Con due riquadri la griglia da tre lascerebbe un terzo di slide vuoto a destra. */
.tre.n2{grid-template-columns:repeat(2,1fr);gap:44px}
.tre.n4{grid-template-columns:repeat(4,1fr);gap:28px}
.tre.n5{grid-template-columns:repeat(5,1fr);gap:22px}
.tre.n4 .box,.tre.n5 .box{padding:44px 28px;min-height:250px}
.tre.n4 .box .t{font-size:40px}
.tre.n5 .box .t{font-size:34px}
.tre.n5 .box{padding:40px 22px}
.tre .box.key{border-color:var(--acc);border-width:4px}
.tre .box.key .t{color:var(--acc)}
.tre.cifre .box .t{font-size:104px;font-weight:700;letter-spacing:-.03em;color:var(--acc);
                   font-variant-numeric:lining-nums tabular-nums;line-height:1}
.tre.cifre .box{min-height:250px;gap:14px}
.tre .box{border:3px solid var(--linea);border-radius:22px;padding:52px 40px;min-height:290px;
          display:flex;flex-direction:column;justify-content:center;gap:20px;opacity:.26}
.tre .box.on{opacity:1;border-color:var(--tit)}
.tre .box .n{font-size:28px;font-weight:700;color:var(--acc);letter-spacing:.1em}
.tre .box .t{font-size:46px;font-weight:600;line-height:1.15;color:var(--tit)}
.tre .box .d{font-size:29px;line-height:1.42;opacity:.75;color:var(--fg)}

/* confronto a due colonne */
.due{display:grid;grid-template-columns:1fr 1fr;gap:0;border:3px solid var(--linea);border-radius:22px;
     overflow:hidden}
.due>div{padding:56px 52px;display:flex;flex-direction:column;gap:22px}
.due>div+div{border-left:3px solid var(--linea)}
.due h3{font-size:27px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--sop)}
.due p{font-size:44px;line-height:1.28;color:var(--fg)}
.due .grande{font-size:58px;font-weight:600;color:var(--tit);line-height:1.14}

/* sostituzione A -> B */
.sost{display:flex;align-items:center;gap:56px}
.sost .lato{flex:1;display:flex;flex-direction:column;gap:18px}
.sost h3{font-size:27px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--sop)}
.sost .v{font-size:62px;font-weight:600;line-height:1.16;color:var(--tit)}
.sost .v.no{color:#8A8F8B;opacity:1;text-decoration:line-through;
            text-decoration-thickness:4px;text-decoration-color:#C6CBC7}
.sost .fre{font-size:82px;color:var(--acc);font-weight:300;line-height:1}

/* trappola: riga barrata + correzione */
.trap{display:flex;flex-direction:column;gap:44px}
.trap .r{display:flex;flex-direction:column;gap:14px;opacity:.26}
.trap .r.on{opacity:1}
.trap .sb{font-size:44px;line-height:1.26;color:var(--fg);opacity:.62;
          text-decoration:line-through;text-decoration-thickness:3px;text-decoration-color:#B6B6B6}
/* Il gap deve separare la freccia dal testo, non le parole accentate fra loro:
   percio' il testo sta in un solo figlio del flex. */
.trap .ok{font-size:40px;line-height:1.3;font-weight:600;color:var(--tit);display:flex;gap:20px}
.trap .ok:before{content:'→';color:var(--acc);font-weight:400}

/* timeline */
.tl{display:flex;align-items:flex-start;gap:0;position:relative;padding-top:64px}
.tl:before{content:'';position:absolute;left:0;right:0;top:76px;height:4px;background:var(--linea)}
.tl .t{flex:1;display:flex;flex-direction:column;align-items:center;gap:20px;position:relative;opacity:.24}
.tl .t.on{opacity:1}
.tl .t .p{width:26px;height:26px;border-radius:50%;background:var(--linea);position:relative;z-index:1}
.tl .t.on .p{background:var(--acc);box-shadow:0 0 0 9px var(--bg)}
.tl .t{opacity:.22}
.tl .t.on{opacity:1}
.tl .t .an{font-size:52px;font-weight:700;color:var(--tit);font-variant-numeric:lining-nums tabular-nums}
.tl .t .et{font-size:27px;line-height:1.34;text-align:center;color:var(--fg);opacity:.82;
           max-width:210px;padding:0 6px}
.tl .t.key .an{color:var(--acc)}

/* memo */
.memo{display:flex;flex-direction:column;gap:26px}
.memo .v{display:flex;gap:30px;align-items:baseline;font-size:41px;line-height:1.3;opacity:.26}
.memo .v.on{opacity:1}
.memo .v .n{flex:0 0 62px;font-size:28px;font-weight:700;color:var(--acc);
            font-variant-numeric:lining-nums tabular-nums;padding-top:.2em}
.memo .v b{font-weight:600;color:var(--tit)}

/* fonti: tre riquadri + barra del limite */
.fonti{display:flex;flex-direction:column;gap:34px}
.limite{border:3px dashed var(--acc);border-radius:18px;padding:34px 44px;display:flex;gap:26px;
        align-items:baseline;opacity:.26}
.limite.on{opacity:1}
.limite .lb{font-size:26px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--acc);
            flex:0 0 auto}
.limite .lt{font-size:32px;line-height:1.38;color:var(--fg)}

/* perimetro: elenco chiuso vs perimetro aperto */
.perim{display:grid;grid-template-columns:1fr 120px 1fr;align-items:center;gap:0}
.perim .fre{font-size:76px;color:var(--acc);text-align:center;font-weight:300}
.perim .cl{border:3px solid var(--linea);border-radius:18px;padding:44px 46px;display:flex;
           flex-direction:column;gap:18px;background:#F6F7F6}
.perim .cl .rg{font-size:33px;line-height:1.2;color:#8A8F8B;display:flex;gap:20px;align-items:baseline}
.perim .cl .rg:before{content:'—';color:#C6CBC7}
.perim .cl .rg.fin{color:#B4B9B5}
.perim .ap{border:4px dashed var(--acc);border-radius:26px;padding:56px 44px;min-height:250px;
           display:flex;flex-direction:column;justify-content:center;gap:14px}
.perim .ap .v{font-size:36px;font-weight:600;color:var(--tit);line-height:1.3}
.perim .et{font-size:26px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;
           color:var(--sop);margin-bottom:20px}

/* copertina e chiusura */
.cover{justify-content:center;gap:0;padding-top:150px}
.cover .mod{font-size:28px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;
            color:var(--sop);margin-bottom:52px}
.cover h1{font-size:132px;margin-bottom:34px}
.cover .st{font-size:44px;color:var(--fg);opacity:.8}
.cover .riga{width:196px;height:7px;background:${ROSSO};margin:64px 0 0;border-radius:4px}
.cover .ente{position:absolute;bottom:118px;left:132px;font-size:26px;letter-spacing:.1em;
             color:var(--sop);opacity:.85}

/* --- movimento: entra, e poi finisce (MASTER §Passo 4) ---
   Le animazioni sono ferme: l'orologio lo sposta a mano il generatore,
   cosi' cards.mjs e clips.mjs rendono esattamente la stessa cosa. */
@keyframes entra   {from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:none}}
@keyframes entraOff{from{opacity:0;transform:translateY(22px)} to{opacity:.26;transform:none}}
@keyframes entraTl {from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:none}}
@keyframes entraTlOff{from{opacity:0;transform:translateY(14px)} to{opacity:.22;transform:none}}

.sop,.corpo>*{animation:entra .52s cubic-bezier(.22,.7,.3,1) both}
.sop{animation-delay:0s}
.corpo>*:nth-child(1){animation-delay:.16s}
.corpo>*:nth-child(2){animation-delay:.36s}
.corpo>*:nth-child(3){animation-delay:.54s}
/* i contenitori a piu' voci non entrano interi: entrano le voci, a scalare */
.corpo>ol.el,.corpo>ul.el,.corpo>.tre,.corpo>.trap,.corpo>.tl,.corpo>.memo,
.corpo>.fonti,.corpo>.due,.corpo>.sost,.corpo>.perim{animation:none}
.el li,.tre .box,.trap .r,.memo .v,.fonti .tre .box,.fonti .limite,
.due>div,.sost>*,.perim>*{animation:entra .5s cubic-bezier(.22,.7,.3,1) both}
.tl .t{animation:entraTl .45s cubic-bezier(.22,.7,.3,1) both}
.el li:not(.on),.tre .box:not(.on),.trap .r:not(.on),.memo .v:not(.on),
.fonti .limite:not(.on){animation-name:entraOff}
.tl .t:not(.on){animation-name:entraTlOff}
.el li:nth-child(1),.tre .box:nth-child(1),.trap .r:nth-child(1),.memo .v:nth-child(1),
.due>div:nth-child(1),.perim>*:nth-child(1),.tl .t:nth-child(1),.sost>*:nth-child(1){animation-delay:.20s}
.el li:nth-child(2),.tre .box:nth-child(2),.trap .r:nth-child(2),.memo .v:nth-child(2),
.due>div:nth-child(2),.perim>*:nth-child(2),.tl .t:nth-child(2),.sost>*:nth-child(2){animation-delay:.32s}
.el li:nth-child(3),.tre .box:nth-child(3),.trap .r:nth-child(3),.memo .v:nth-child(3),
.perim>*:nth-child(3),.tl .t:nth-child(3),.sost>*:nth-child(3){animation-delay:.44s}
.el li:nth-child(4),.memo .v:nth-child(4),.tl .t:nth-child(4){animation-delay:.56s}
.el li:nth-child(5),.memo .v:nth-child(5),.tl .t:nth-child(5){animation-delay:.68s}
.tl .t:nth-child(6){animation-delay:.80s}
.tl .t:nth-child(7){animation-delay:.92s}
.fonti .limite{animation-delay:.72s}

${CSS_GRAFICA}

/* ferme: l'orologio lo muove il generatore. Deve stare in coda a tutto. */
.slide *{animation-play-state:paused}
`;

// --- i pezzi di ogni tipo di slide ---
const CORPI = {
  copertina: d => `<div class="mod">${d.modulo}</div><h1>${acc(d.titolo)}</h1>
      <div class="st">${acc(d.sottotitolo)}</div><div class="riga"></div>
      <div class="ente">${d.ente}</div>`,

  titolo: d => `${FREGI.barra}<h1>${acc(d.titolo)}</h1>${
      d.sotto?`<div class="sotto">${acc(d.sotto)}</div>`:''}`,

  frase: d => `<div class="frase serif">${acc(d.testo)}</div>
      ${d.sotto?`<div class="sotto">${acc(d.sotto)}</div>`:''}`,

  norma: d => `${FREGI.sigillo}<div class="norma"><small>${d.etichetta}</small>${d.sigla}</div>
      <div class="frase serif">${acc(d.testo)}</div>`,

  numero: d => `${FREGI.anello}<div class="cifra">${d.cifra}</div><h2>${acc(d.testo)}</h2>`,

  citazione: d => `${FREGI.virgolette}<div class="cita serif">${acc(d.testo)}</div>
      <div class="fonte">${d.fonte}</div>`,

  elenco: d => `<${d.numerato?'ol':'ul'} class="el ${
      d.voci.length>=7 || (d.voci.length>=5 && d.voci.some(v=>v.d)) ? 'fitto':''}">${d.voci.map((v,i)=>
      `<li class="${(d.attive??d.voci.map((_,k)=>k)).includes(i)?'on':''}">
         <span class="n ${d.numerato?'':'pt'} ${d.grandi?'gr':''} ${d.vietato?'no':''}">${
            d.marcatori ? d.marcatori[i] : (d.vietato?'×':(d.numerato?(d.da??1)+i:'—'))}</span>
         <span>${acc(v.t)}${v.d?`<em>${acc(v.d)}</em>`:''}</span></li>`).join('')}</${d.numerato?'ol':'ul'}>`,

  tre: d => `<div class="tre ${d.box.length!==3?'n'+d.box.length:''} ${d.cifre?'cifre':''}">${d.box.map((b,i)=>
      `<div class="box ${(d.attive??d.box.map((_,k)=>k)).includes(i)?'on':''} ${b.key?'key':''}">
         <span class="n">${b.n??''}</span><span class="t">${acc(b.t)}</span>
         ${b.d?`<span class="d">${acc(b.d)}</span>`:''}</div>`).join('')}</div>`,

  confronto: d => `<div class="due">${d.col.map(c=>
      `<div><h3>${c.h}</h3><p class="${c.grande?'grande':''}">${acc(c.t)}</p></div>`).join('')}</div>
      ${d.sotto?`<div class="sotto">${acc(d.sotto)}</div>`:''}`,

  sostituzione: d => `<div class="sost">
      <div class="lato"><h3>${d.da.h}</h3><div class="v no">${acc(d.da.t)}</div></div>
      <div class="fre">→</div>
      <div class="lato"><h3>${d.a.h}</h3><div class="v">${acc(d.a.t)}</div></div></div>
      ${d.sotto?`<div class="sotto">${acc(d.sotto)}</div>`:''}`,

  trappola: d => `<div class="trap">${d.righe.map((r,i)=>
      `<div class="r ${(d.attive??d.righe.map((_,k)=>k)).includes(i)?'on':''}">
         <div class="sb">${acc(r.sb)}</div>
         <div class="ok"><span>${acc(r.ok)}</span></div></div>`).join('')}</div>`,

  timeline: d => `<div class="tl">${d.tappe.map((t,i)=>
      `<div class="t ${(d.attive??d.tappe.map((_,k)=>k)).includes(i)?'on':''} ${t.key?'key':''}">
         <div class="p"></div><div class="an">${t.anno}</div><div class="et">${acc(t.et)}</div></div>`).join('')}</div>`,

  memo: d => `<div class="memo">${d.voci.map((v,i)=>
      `<div class="v ${(d.attive??d.voci.map((_,k)=>k)).includes(i)?'on':''}">
         <span class="n">${i+1}</span><span>${acc(v)}</span></div>`).join('')}</div>`,

  fonti: d => `<div class="fonti">
      <div class="tre">${d.box.map((b,i)=>
        `<div class="box ${(d.attive??[0,1,2]).includes(i)?'on':''}">
           <span class="n">${b.n}</span><span class="t">${acc(b.t)}</span>
           ${b.d?`<span class="d">${acc(b.d)}</span>`:''}</div>`).join('')}</div>
      <div class="limite ${d.limite?'on':''}"><span class="lb">Limite</span>
        <span class="lt">${acc(d.testoLimite)}</span></div></div>`,

  perimetro: d => `<div class="perim">
      <div><div class="et">${d.sx}</div><div class="cl">
        ${d.atti.map((a,i)=>`<div class="rg ${i===d.atti.length-1?'fin':''}">${a}</div>`).join('')}</div></div>
      <div class="fre">→</div>
      <div><div class="et">${d.dx}</div><div class="ap">
        ${d.voci.map(v=>`<div class="v">${acc(v)}</div>`).join('')}</div></div></div>`,
};

const TUTTI = { ...CORPI, ...CORPI_GRAFICA };
// I grafici non vanno sul verde pieno: le tinte dei dati non ci arrivano a 3:1
// di contrasto senza uscire dalla banda di chiarezza. Meglio accorgersene qui
// che scoprirlo guardando il video.
const SOLO_CHIARO = new Set(['tabella','barre','assetempo','impila','scadenza','piramide']);

export function html(d, {avanzamento=0, pagina=''}={}) {
  if (SOLO_CHIARO.has(d.tipo) && d.tema === 'profondo')
    throw new Error(`${d.id}: «${d.tipo}» non va sul tema profondo (contrasto dei dati)`);
  const t = TEMI[d.tema ?? 'chiaro'];
  const corpo = TUTTI[d.tipo](d);
  const cover = d.tipo === 'copertina';
  return `<!doctype html><meta charset="utf-8"><style>${CSS}</style>
<body><div class="slide ${cover?'cover':''} ${t.scuro?'scuro':''}"
  style="--bg:${t.bg};--fg:${t.fg};--tit:${t.tit};--acc:${t.acc};--sop:${t.sop};--linea:${t.linea};
         background:${t.bg};color:${t.fg}">
  <div class="logo"><img src="${MARCHIO}" alt="CISL FP Padova Rovigo"></div>
  ${pagina?`<div class="pagina">${pagina}</div>`:''}
  ${cover?'':`<div class="sop">${sop(d.sopratitolo)}</div>`}
  <div class="corpo">${corpo}</div>
  <div class="avanz"><i style="width:${(avanzamento*100).toFixed(2)}%"></i></div>
</div></body>`;
}
```

## `slide/grafica.mjs`

La libreria grafica: 13 tipi in 5 famiglie, 22 icone a tratto su griglia 24,
4 fregi, la palette dei dati validata per il daltonismo e la rampa
sequenziale. Il colore qui e' calcolato, mai scelto a mano.

```javascript
// Libreria grafica delle slide: tabelle vere, grafici, diagrammi, icone vettoriali.
// La usa layout.mjs, che ne unisce CSS e corpi ai propri.
//
// PALETTE DEI DATI — non scelta a occhio.
// Il verde e il rosso del marchio, messi l'uno accanto all'altro in un grafico,
// hanno ΔE 3,4 in protanopia: per un daltonico sono la stessa tinta. Percio':
//   1. la serie categoriale qui sotto e' stata validata sui sei controlli
//      (banda di chiarezza, croma, separazione CVD, soglia a vista normale,
//      contrasto sul fondo) e li passa tutti;
//   2. il colore non porta MAI da solo un significato: ogni serie ha
//      l'etichetta attaccata, e giusto/sbagliato portano anche il segno (✓ ×).
export const DATI = ['#00623A', '#B07A12', '#3E6FA8', '#D70328'];
// Rampa sequenziale (una sola tinta, chiaro -> scuro) per le grandezze.
export const RAMPA = ['#D5E6DE', '#A8CDBB', '#78B296', '#3E8E6B', '#00623A'];
// I grafici stanno solo sui temi chiari. Sul verde pieno le tinte che superano
// la banda di chiarezza per fondo scuro non arrivano a 3:1 di contrasto: invece
// di forzarle, i dati non ci vanno. Sul verde restano le slide di affermazione.

// --- icone: un solo sistema, tratto 1.7 su griglia 24, estremi tondi ---
const I = {
  bilancia:'M12 3v18M7 21h10M12 6 4 9m8-3 8 3M4 9 1.5 15a3.2 3.2 0 0 0 5 0zM20 9l2.5 6a3.2 3.2 0 0 1-5 0z',
  libro:'M4 4.5A1.5 1.5 0 0 1 5.5 3H19v15H5.5A1.5 1.5 0 0 0 4 19.5zM4 19.5A1.5 1.5 0 0 0 5.5 21H19v-3M8 7.5h7M8 11h5',
  documento:'M6 2.5h7l5 5v14H6zM13 2.5v5h5M9 12.5h6M9 16h6',
  lucchetto:'M6 10.5h12v10H6zM8.5 10.5V7a3.5 3.5 0 0 1 7 0v3.5M12 14.5v2.5',
  occhio:'M1.8 12S5.5 5.5 12 5.5 22.2 12 22.2 12 18.5 18.5 12 18.5 1.8 12 1.8 12Z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z',
  orologio:'M12 2.8a9.2 9.2 0 1 0 0 18.4 9.2 9.2 0 0 0 0-18.4ZM12 7v5.4l3.6 2.2',
  scudo:'M12 2.6 4.5 5.6v6.1c0 4.6 3.1 8.4 7.5 9.7 4.4-1.3 7.5-5.1 7.5-9.7V5.6Z M8.8 12l2.3 2.4 4.1-4.6',
  cuoremano:'M4 13.5V21M4 15.5l3.2-3.1a2 2 0 0 1 2.8 0l.6.6h3.9a2 2 0 0 1 0 4h-2.6M10.5 17.5H20M17 8.6c0-1.5-1.2-2.6-2.6-2.6-.8 0-1.6.4-2.1 1-.5-.6-1.3-1-2.1-1C8.8 6 7.6 7.1 7.6 8.6c0 2.2 4.7 4.4 4.7 4.4S17 10.8 17 8.6Z',
  persona:'M12 3.2a3.9 3.9 0 1 0 0 7.8 3.9 3.9 0 0 0 0-7.8ZM4.5 21v-1.6A5.4 5.4 0 0 1 9.9 14h4.2a5.4 5.4 0 0 1 5.4 5.4V21',
  persone:'M9 3.5a3.4 3.4 0 1 0 0 6.8 3.4 3.4 0 0 0 0-6.8ZM2.5 20.5v-1.2A4.8 4.8 0 0 1 7.3 14.5h3.4a4.8 4.8 0 0 1 4.8 4.8v1.2M16.5 4.2a3.2 3.2 0 0 1 0 6.2M18 14.6h.8a4.2 4.2 0 0 1 4.2 4.2v1.7',
  ospedale:'M3.5 21V8.5L12 3l8.5 5.5V21ZM9.5 21v-5.5h5V21M12 8.5v4M10 10.5h4',
  cappello:'M12 4 1.8 8.6 12 13.2l10.2-4.6ZM5.4 10.6v5.1c0 1.9 3 3.4 6.6 3.4s6.6-1.5 6.6-3.4v-5.1M21 9.4v5.2',
  certificato:'M6 2.8h9l4 4V15H6ZM15 2.8v4h4M9 18.5l-1.4 3.2 2.6-.9 1.6 1.4 1.6-1.4 2.6.9-1.4-3.2M12.4 13.6a2.8 2.8 0 1 0 0-5.6 2.8 2.8 0 0 0 0 5.6Z',
  avviso:'M12 3.4 1.9 20.6h20.2ZM12 9.6v5M12 17.4v.3',
  divieto:'M12 2.9a9.1 9.1 0 1 0 0 18.2 9.1 9.1 0 0 0 0-18.2ZM5.6 5.6l12.8 12.8',
  spunta:'M12 2.9a9.1 9.1 0 1 0 0 18.2 9.1 9.1 0 0 0 0-18.2ZM7.6 12.2l3.1 3.2 5.7-6.4',
  giudice:'M12 21h8M14 4.6 9.4 9.2M4.5 9.4 9.1 4.8m0 0 5.4 5.4-4.8 4.8-5.4-5.4zM12.6 12.2 18 17.6M15.8 9 21 14.2',
  euro:'M18 6.6a7.4 7.4 0 1 0 0 10.8M4.5 10.4h8M4.5 13.8h8',
  chat:'M3.5 5.5h17v11h-10L6 20.5v-4H3.5Z M8 9.5h8M8 12.8h5',
  foto:'M3 7.4h4l1.6-2.6h6.8L17 7.4h4v12H3ZM12 16.6a3.8 3.8 0 1 0 0-7.6 3.8 3.8 0 0 0 0 7.6Z',
  cartella:'M2.8 6.2h6.4l1.8 2.4h10.2v11.2H2.8ZM2.8 6.2V4.2h5.6',
  goccia:'M12 3.2S5.4 10 5.4 14.2a6.6 6.6 0 0 0 13.2 0C18.6 10 12 3.2 12 3.2Z',
  ingranaggio:'M12 8.6a3.4 3.4 0 1 0 0 6.8 3.4 3.4 0 0 0 0-6.8ZM19.6 12a7.7 7.7 0 0 0-.1-1.2l2-1.5-1.9-3.3-2.4 1a7.6 7.6 0 0 0-2-1.2L14.9 3h-3.8l-.3 2.8c-.7.3-1.4.7-2 1.2l-2.4-1-1.9 3.3 2 1.5a7.7 7.7 0 0 0 0 2.4l-2 1.5 1.9 3.3 2.4-1c.6.5 1.3.9 2 1.2l.3 2.8h3.8l.3-2.8c.7-.3 1.4-.7 2-1.2l2.4 1 1.9-3.3-2-1.5c.1-.4.1-.8.1-1.2Z',
};
// Fregi: forme vettoriali che danno peso grafico alle slide di sola parola.
// Non sono decorazione a caso — ognuno dice qualcosa del tipo di slide:
// il sigillo per una norma, l'anello per un numero, le virgolette per una
// citazione, la barra per un titolo.
export const FREGI = {
  sigillo: `<svg class="freg fsigillo" viewBox="0 0 200 200" fill="none" aria-hidden="true">
     <circle cx="100" cy="100" r="86" stroke="currentColor" stroke-width="3"/>
     <circle cx="100" cy="100" r="68" stroke="currentColor" stroke-width="1.5"
       stroke-dasharray="4 9" stroke-linecap="round"/>
     <path d="M64 100l24 24 48-52" stroke="currentColor" stroke-width="6"
       stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  anello: `<svg class="freg fanello" viewBox="0 0 400 400" fill="none" aria-hidden="true">
     <circle cx="200" cy="200" r="178" stroke="currentColor" stroke-width="3"/>
     <path d="M200 22a178 178 0 0 1 178 178" stroke="currentColor" stroke-width="14"
       stroke-linecap="round"/></svg>`,
  virgolette: `<svg class="freg fvirg" viewBox="0 0 200 150" fill="currentColor" aria-hidden="true">
     <path d="M0 150V78C0 34 28 4 74 0v26C46 31 33 48 33 72h37v78zm112 0V78c0-44 28-74 74-78v26
              c-28 5-41 22-41 46h37v78z"/></svg>`,
  barra: `<svg class="freg fbarra" viewBox="0 0 220 18" aria-hidden="true">
     <rect x="0" y="5" width="92" height="8" rx="4" fill="currentColor"/>
     <rect x="104" y="5" width="40" height="8" rx="4" fill="currentColor" opacity=".45"/>
     <rect x="156" y="5" width="16" height="8" rx="4" fill="currentColor" opacity=".25"/></svg>`,
};

export const icona = (n, cls='') =>
  `<svg class="ico ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor"
     stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"
     aria-hidden="true"><path d="${I[n] ?? I.documento}"/></svg>`;

// *testo* -> accento, **testo** -> accento semibold. Duplicato minimo: le due
// funzioni devono restare identiche, e layout.mjs passa la sua quando chiama.
let acc = s => String(s ?? '');
export const collega = fn => { acc = fn; };

const LARG = 1656;                       // 1920 meno i due margini da 132
const num = n => String(Math.round(n * 100) / 100);
// Dentro <text> di un SVG il markup non vale: <b> non e' un elemento SVG e
// finisce renderizzato come un pezzo di testo a se', fuori posto. Nei testi
// SVG gli asterischi si tolgono; dove serve il grassetto si usa foreignObject.
const piano = s => String(s ?? '').replace(/\*\*(.+?)\*\*/g, '$1').replace(/\*(.+?)\*/g, '$1');
// «1 anni» in un grafico si legge come un errore di chi l'ha fatto, non come
// un dato. Il singolare non si lascia alla buona volonta' di chi scrive la scena.
const SING = {anni:'anno', mesi:'mese', ore:'ora', giorni:'giorno', crediti:'credito',
              articoli:'articolo', capi:'capo', punti:'punto', livelli:'livello'};
const unita = (v, u, u1) => !u ? '' : ' ' + (v === 1 ? (u1 ?? SING[u] ?? u) : u);

export const CSS_GRAFICA = `
/* ---------- fregi ---------- */
.freg{position:absolute;pointer-events:none}
.fsigillo{width:300px;height:300px;right:104px;top:280px;color:var(--tit);opacity:.07}
.fanello{width:520px;height:520px;right:-150px;top:-92px;color:var(--acc);opacity:.11}
.fvirg{width:210px;height:158px;left:126px;top:236px;color:var(--acc);opacity:.13}
.fbarra{position:static;width:220px;height:18px;color:var(--acc);margin-bottom:4px}

/* ---------- fondamenta comuni alle figure ---------- */
.gfx{width:100%}
svg.fig{display:block;width:100%;height:auto;overflow:visible}
.fig text{font-family:'Inter',sans-serif;fill:var(--fg)}
.fig .et{font-size:30px;font-weight:500}
.fig .val{font-size:38px;font-weight:700;font-variant-numeric:lining-nums tabular-nums}
.fig .cap{font-size:25px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;
          fill:var(--sop)}
.fig .ass{stroke:var(--linea);stroke-width:3}
.fig .grid{stroke:var(--linea);stroke-width:2;stroke-dasharray:2 12;stroke-linecap:round}
.ico{width:1em;height:1em;flex:0 0 auto}

/* ---------- tabella vera ---------- */
.tab{width:100%;border-collapse:separate;border-spacing:0;border:3px solid var(--linea);
     border-radius:22px;overflow:hidden;table-layout:fixed}
.tab th{font-size:25px;font-weight:700;letter-spacing:.13em;text-transform:uppercase;
        color:var(--sop);text-align:left;padding:26px 30px;background:var(--linea);
        border-bottom:3px solid var(--linea)}
.tab td{font-size:34px;line-height:1.3;color:var(--fg);padding:26px 30px;vertical-align:top;
        border-bottom:2px solid var(--linea)}
.tab tr:last-child td{border-bottom:0}
.tab tbody tr:nth-child(even) td{background:color-mix(in srgb,var(--linea) 34%,transparent)}
.tab td:first-child{font-weight:600;color:var(--tit)}
/* La prima colonna e' gia' la colonna in evidenza: se dentro ci si mette
   anche l'accento, la tabella diventa una colonna rossa e non evidenzia piu'
   niente. Li' il grassetto resta del colore del titolo. */
.tab td:first-child b.a,.tab td:first-child .a{color:var(--tit)}
.tab td+td{border-left:2px solid var(--linea)}
.tab tr.key td{background:color-mix(in srgb,var(--acc) 10%,transparent)}
.tab tr.key td:first-child{color:var(--acc)}
.tab.fitta td{font-size:29px;padding:19px 26px}
.tab.fitta th{font-size:23px;padding:20px 26px}
.tab .si{color:${DATI[0]};font-weight:700}
.tab .no{color:${DATI[3]};font-weight:700}

/* ---------- catena di passi ---------- */
.catena{display:flex;align-items:stretch;gap:14px;min-height:300px}
.catena .p{flex:1;background:color-mix(in srgb,var(--tit) 7%,transparent);
           border:3px solid var(--linea);padding:44px 34px 44px 54px;
           display:flex;flex-direction:column;justify-content:center;gap:14px;
           clip-path:polygon(0 0,calc(100% - 30px) 0,100% 50%,calc(100% - 30px) 100%,0 100%,30px 50%)}
.catena .p:first-child{clip-path:polygon(0 0,calc(100% - 30px) 0,100% 50%,calc(100% - 30px) 100%,0 100%);
                       border-radius:18px 0 0 18px;padding-left:40px}
.catena .p:last-child{clip-path:polygon(0 0,100% 0,100% 100%,0 100%,30px 50%)}
.catena .p.key{background:color-mix(in srgb,var(--acc) 13%,transparent);border-color:var(--acc)}
.catena .t{font-size:40px;font-weight:600;color:var(--tit);line-height:1.14}
.catena .p.key .t{color:var(--acc)}
.catena .d{font-size:25px;line-height:1.36;opacity:.76}
/* Cinque anelli: «Pianificazione» a 40px e' piu' larga dello spazio che resta
   fra le due punte della freccia. La soglia sta qui, non nelle scene. */
.catena.fitta .p{padding:34px 24px 34px 44px}
.catena.fitta .t{font-size:31px}
.catena.fitta .d{font-size:22px;line-height:1.3}

/* ---------- scala di gradini ---------- */
.scala{display:flex;align-items:flex-end;gap:18px;min-height:430px}
.scala .g{flex:1;border:3px solid var(--linea);border-bottom:0;border-radius:18px 18px 0 0;
          padding:32px 26px;display:flex;flex-direction:column;justify-content:flex-end;gap:12px;
          background:color-mix(in srgb,var(--tit) 6%,transparent)}
.scala .g .n{font-size:26px;font-weight:700;color:var(--acc);letter-spacing:.1em}
.scala .g .t{font-size:36px;font-weight:600;color:var(--tit);line-height:1.14}
.scala .g .d{font-size:24px;line-height:1.34;opacity:.74}
.scala .g.key{border-color:var(--acc);background:color-mix(in srgb,var(--acc) 11%,transparent)}
.scalabase{height:5px;background:var(--linea);border-radius:3px;margin-top:-3px}

/* ---------- griglia di caselle ---------- */
.griglia{display:grid;gap:20px;min-height:420px;align-content:center}
.griglia .c{border:3px solid var(--linea);border-radius:18px;padding:30px 28px;
            display:flex;gap:20px;align-items:flex-start;
            background:color-mix(in srgb,var(--tit) 5%,transparent)}
.griglia .c .sg{color:${DATI[0]};font-size:34px;line-height:1;flex:0 0 auto;margin-top:2px}
.griglia .c.no .sg{color:${DATI[3]}}
.griglia .c .t{font-size:31px;line-height:1.3;color:var(--fg)}
.griglia .c .t b{font-weight:600;color:var(--tit)}
.griglia.fitta{gap:14px}
.griglia.fitta .c{padding:19px 24px;gap:16px}
.griglia.fitta .c .t{font-size:27px}
.griglia.fitta .c .sg{font-size:28px}
.griglia.fitta .c .n{font-size:40px}
/* Otto celle su una colonna non ci stanno nemmeno alla misura fitta: servono
   altri 16 px. La soglia e' nel corpo, come per le altre densita'. */
.griglia.fittissima{gap:11px}
.griglia.fittissima .c{padding:15px 22px;gap:14px}
.griglia.fittissima .c .t{font-size:25px;line-height:1.26}
.griglia.fittissima .c .sg{font-size:25px}
.griglia.fittissima .c .n{font-size:34px}
.griglia .c .n{font-size:52px;font-weight:700;color:var(--acc);line-height:1;
               font-variant-numeric:lining-nums tabular-nums;flex:0 0 auto}

/* ---------- icone in fila ---------- */
/* Massimo CINQUE voci: e' un flex orizzontale, e a sei o sette le colonne
   escono dalla cornice qualunque sia il corpo del testo (2.6: +377 px con
   sette barriere). Sopra le cinque voci si usa «griglia». */
.icone{display:flex;gap:30px;min-height:452px}
.icone .v{flex:1;display:flex;flex-direction:column;gap:26px;border:3px solid var(--linea);
          border-radius:22px;padding:54px 38px}
.icone .v .ico{font-size:96px;color:var(--acc);stroke-width:1.4}
.icone .v.key{border-color:var(--acc);background:color-mix(in srgb,var(--acc) 9%,transparent)}
.icone .t{font-size:42px;font-weight:600;color:var(--tit);line-height:1.16}
.icone .d{font-size:28px;line-height:1.38;opacity:.76}
.icone.fitte .v{padding:40px 26px;gap:20px}
.icone.fitte .v .ico{font-size:68px}
.icone.fitte .t{font-size:33px}
.icone.fitte .d{font-size:24px}

/* ---------- matrice 2x2 ---------- */
.matrice{display:grid;grid-template-columns:112px 1fr 1fr;grid-template-rows:80px 1fr 1fr;overflow:hidden;
         gap:0;min-height:560px}
.matrice .ax{display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:700;
             letter-spacing:.13em;text-transform:uppercase;color:var(--sop);text-align:center}
.matrice .ay{writing-mode:vertical-rl;transform:rotate(180deg)}
.matrice .q{border:3px solid var(--linea);margin:-1.5px;padding:36px 34px;display:flex;
            flex-direction:column;gap:12px;justify-content:center}
.matrice .q .t{font-size:34px;font-weight:600;color:var(--tit);line-height:1.16}
.matrice .q .d{font-size:26px;line-height:1.36;opacity:.76}
.matrice .q.key{background:color-mix(in srgb,var(--acc) 11%,transparent);border-color:var(--acc)}
.matrice .q.key .t{color:var(--acc)}
/* Quattro celle con frase + didascalia sforano l'altezza utile: il min-height
   di 560px vale per le matrici a etichetta breve, non per queste. */
.matrice.fitta{min-height:0;grid-template-rows:72px 1fr 1fr}
.matrice.fitta .q{padding:26px 28px;gap:9px}
.matrice.fitta .q .t{font-size:29px;line-height:1.18}
.matrice.fitta .q .d{font-size:23px;line-height:1.3}

/* ---------- albero di decisione ---------- */
.albero{display:flex;flex-direction:column;align-items:center;width:100%}
.albero .radice{border:3px solid var(--tit);border-radius:18px;padding:26px 44px;
  background:color-mix(in srgb,var(--tit) 8%,transparent);font-size:36px;font-weight:600;
  color:var(--tit);text-align:center;line-height:1.16}
.albero .rami{display:flex;gap:24px;width:100%;margin-top:96px;position:relative;align-items:stretch}
/* il gambo, la traversa e le discese: tre righe, nessuna immagine */
.albero .rami:before{content:'';position:absolute;top:-96px;left:calc(50% - 2px);width:4px;height:48px;
  background:var(--linea)}
.albero .rami:after{content:'';position:absolute;top:-48px;left:var(--m);right:var(--m);height:4px;
  background:var(--linea)}
.albero .r{flex:1;display:flex;flex-direction:column;gap:14px;position:relative}
.albero .r:before{content:'';position:absolute;top:-48px;left:calc(50% - 2px);width:4px;height:48px;
  background:var(--linea)}
.albero .cond{font-size:24px;font-weight:700;letter-spacing:.13em;text-transform:uppercase;
  color:var(--sop);text-align:center}
.albero .box{flex:1;border:3px solid var(--tit);border-radius:18px;padding:28px 26px;
  font-size:31px;line-height:1.26;font-weight:600;color:var(--tit)}
.albero .box.key{border-color:var(--acc);color:var(--acc);
  background:color-mix(in srgb,var(--acc) 10%,transparent)}

/* ---------- venn ---------- */
.tsub{font-family:Inter,sans-serif;font-size:25px;line-height:1.22;text-align:center;
  color:var(--fg);opacity:.74}
.vt{font-family:Inter,sans-serif;font-size:28px;line-height:1.3;text-align:center;color:var(--fg)}
.vcomune{margin-top:18px;border:3px dashed var(--tit);border-radius:18px;padding:26px 40px;
  font-size:32px;line-height:1.3;font-weight:600;color:var(--tit);text-align:center}
.vcomune .et{display:block;font-size:23px;font-weight:700;letter-spacing:.15em;
  text-transform:uppercase;color:var(--sop);margin-bottom:10px}

/* ---------- piramide: dentro l'SVG ---------- */
.fig .lbl{font-size:34px;font-weight:600;fill:var(--tit)}
.fig .sub{font-size:25px;fill:var(--fg);opacity:.74}
.fig .big{font-size:64px;font-weight:700;fill:var(--acc);
          font-variant-numeric:lining-nums tabular-nums}

/* Spente: la figura resta intera, ma la parte di cui la voce non sta parlando
   e' in secondo piano. Stessa opacita' degli elenchi, cosi' il modulo ha
   un solo modo di dire «questo viene dopo». */
.catena .p.off,.scala .g.off,.griglia .c.off,.icone .v.off{opacity:.26}

/* ---------- animazione: le figure entrano a pezzi ---------- */
.corpo>.gfx,.corpo>table.tab{animation:none}
.gx{animation:entra .5s cubic-bezier(.22,.7,.3,1) both}
.gx.off{animation-name:entraOff}
svg .gx{transform-box:fill-box;transform-origin:center}
.gx:nth-child(1){animation-delay:.18s}
.gx:nth-child(2){animation-delay:.30s}
.gx:nth-child(3){animation-delay:.42s}
.gx:nth-child(4){animation-delay:.54s}
.gx:nth-child(5){animation-delay:.66s}
.gx:nth-child(6){animation-delay:.78s}
.gx:nth-child(7){animation-delay:.90s}
.gx:nth-child(8){animation-delay:1.02s}
.tab tbody tr{animation:entra .5s cubic-bezier(.22,.7,.3,1) both}
.tab thead tr{animation:entra .5s cubic-bezier(.22,.7,.3,1) both;animation-delay:.14s}
.tab tbody tr:nth-child(1){animation-delay:.26s}
.tab tbody tr:nth-child(2){animation-delay:.36s}
.tab tbody tr:nth-child(3){animation-delay:.46s}
.tab tbody tr:nth-child(4){animation-delay:.56s}
.tab tbody tr:nth-child(5){animation-delay:.66s}
.tab tbody tr:nth-child(6){animation-delay:.76s}
.tab tbody tr:nth-child(7){animation-delay:.86s}
`;

// ======================= i corpi =======================
export const CORPI_GRAFICA = {

  // Tabella vera: intestazioni + righe. «si» e «no» nelle celle diventano
  // segno piu' parola, mai solo colore (vedi la nota sulla protanopia).
  tabella: d => {
    const cel = c => String(c)
      .replace(/^si:/, '<span class="si">✓</span> ')
      .replace(/^no:/, '<span class="no">×</span> ');
    const larg = d.colonne ? `<colgroup>${d.colonne.map(w=>`<col style="width:${w}">`).join('')}</colgroup>` : '';
    return `<table class="tab ${d.righe.length >= 5 ? 'fitta' : ''}">${larg}
      <thead><tr>${d.intestazioni.map(h => `<th>${h}</th>`).join('')}</tr></thead>
      <tbody>${d.righe.map((r, i) =>
        `<tr class="${(d.chiave ?? []).includes(i) ? 'key' : ''}">${
          r.map(c => `<td>${acc(cel(c))}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
  },

  // Barre orizzontali. Etichetta a sinistra, valore in fondo alla barra:
  // l'identita' non e' mai affidata al colore.
  barre: d => {
    const H = 96, GAP = 26, LB = d.etichetta ?? 430, PAD = 150;
    const max = d.max ?? Math.max(...d.barre.map(b => b.v)) * 1.08;
    const y0 = 34, alt = d.barre.length * H + (d.barre.length - 1) * GAP;
    const scala = v => (LARG - LB - PAD) * (v / max);
    const rif = d.riferimento;
    return `<svg class="fig gfx" viewBox="0 0 ${LARG} ${y0 + alt + 58}">
      <line class="ass" x1="${LB}" y1="${y0 - 14}" x2="${LB}" y2="${y0 + alt + 14}"/>
      ${rif ? `<line class="grid" x1="${LB + scala(rif.v)}" y1="${y0 - 14}"
                 x2="${LB + scala(rif.v)}" y2="${y0 + alt + 30}"/>
               <text class="cap" x="${LB + scala(rif.v)}" y="${y0 + alt + 52}"
                 text-anchor="middle">${rif.et}</text>` : ''}
      ${d.barre.map((b, i) => {
        const y = y0 + i * (H + GAP), w = Math.max(scala(b.v), 6);
        const col = b.colore ?? DATI[0];
        return `<g class="gx">
          <text class="et" x="${LB - 34}" y="${y + H / 2 + 2}" text-anchor="end"
            dominant-baseline="middle">${piano(b.et)}</text>
          <rect x="${LB + 3}" y="${y}" width="${num(w)}" height="${H}" rx="10" fill="${col}"/>
          <text class="val" x="${LB + w + 28}" y="${y + H / 2 + 2}" dominant-baseline="middle"
            fill="${col}">${b.v}${unita(b.v, d.unita, d.unita1)}</text>
          ${b.nota ? `<text class="sub" x="${LB + w + 28}" y="${y + H / 2 + 42}"
             dominant-baseline="middle">${piano(b.nota)}</text>` : ''}
        </g>`;
      }).join('')}
    </svg>`;
  },

  // Linea del tempo in scala: le tappe stanno dove cadono davvero.
  // Una timeline a passo fisso mente sulle distanze, e in questo modulo
  // fra il 1974 e il 1992 ci sono diciotto anni, fra il 1999 e il 2000 uno.
  // Vuole ANNI veri in da/a e in decenni: e' un asse cronologico, non un asse
  // generico. Con decenni vuoto stampa «undefined» sulle etichette e non sfora
  // niente, cosi' il controllo della cornice lo lascia passare (2.6 -> 2.7).
  // Per tre momenti in sequenza senza date si usa «catena».
  assetempo: d => {
    // Fasce fisse per anno e didascalia, e la didascalia va a capo: in un
    // <text> SVG non andrebbe a capo e due tappe vicine si sovrappongono.
    // L'alternanza sopra/sotto non basta da sola — con dieci tappe su
    // cinquant'anni si scontrano quelle DUE posizioni piu' in la', che
    // stanno sulla stessa riga. Percio' la larghezza dell'etichetta non e'
    // fissa: e' quella che ci sta fino alla tappa vicina della stessa riga.
    const X0 = 40, X1 = LARG - 40, Y = 236, H = 512;
    const p = a => X0 + (X1 - X0) * ((a - d.da) / (d.a - d.da));
    const xs = d.tappe.map(t => p(t.anno));
    const largh = i => {
      let dist = Infinity;
      for (let k = 0; k < xs.length; k++)
        if (k !== i && (k % 2) === (i % 2)) dist = Math.min(dist, Math.abs(xs[k] - xs[i]));
      return Math.max(122, Math.min(236, dist - 14));
    };
    return `<svg class="fig gfx" viewBox="0 0 ${LARG} ${H}">
      ${(d.decenni ?? []).map(a => `<line class="grid" x1="${num(p(a))}" y1="30"
          x2="${num(p(a))}" y2="${Y + 214}"/>`).join('')}
      ${(d.decenni ?? []).map(a => `<text class="cap" x="${num(p(a))}" y="${Y + 250}"
          text-anchor="middle" opacity=".7">${a}</text>`).join('')}
      <line class="ass" x1="${X0}" y1="${Y}" x2="${X1}" y2="${Y}"/>
      ${d.tappe.map((t, i) => {
        const x = xs[i], su = i % 2 === 0, w = largh(i);
        const col = t.key ? 'var(--acc)' : 'var(--tit)';
        return `<g class="gx">
          <line x1="${num(x)}" y1="${su ? Y - 38 : Y + 38}" x2="${num(x)}" y2="${Y}"
            stroke="${col}" stroke-width="3"/>
          <circle cx="${num(x)}" cy="${Y}" r="${t.key ? 15 : 11}" fill="${col}"
            stroke="var(--bg)" stroke-width="5"/>
          <text class="lbl" x="${num(x)}" y="${su ? Y - 152 : Y + 88}" text-anchor="middle"
            fill="${col}">${t.anno}</text>
          <foreignObject x="${num(x - w / 2)}" y="${su ? Y - 136 : Y + 104}"
            width="${num(w)}" height="98">
            <div xmlns="http://www.w3.org/1999/xhtml" class="tsub">${piano(t.et)}</div>
          </foreignObject>
        </g>`;
      }).join('')}
    </svg>`;
  },

  // Composizione: una barra sola divisa in segmenti etichettati.
  // Sostituisce la ciambella, che su un 150 su 150 disegnava un anello pieno
  // e non diceva niente: una figura che esce sempre uguale non e' un grafico.
  impila: d => {
    const H = 132, Y = 52, tot = d.segmenti.reduce((s, x) => s + x.v, 0);
    let x = 0;
    return `<svg class="fig gfx" viewBox="0 0 ${LARG} ${Y + H + 168}">
      ${d.segmenti.map((s, i) => {
        const w = (LARG - (d.segmenti.length - 1) * 4) * (s.v / tot);
        const xi = x; x += w + 4;
        const col = s.colore ?? RAMPA[RAMPA.length - 1 - (i % 3)];
        const r = i === 0 ? '12 0 0 12' : i === d.segmenti.length - 1 ? '0 12 12 0' : '0';
        return `<g class="gx">
          <path d="M${num(xi + (i === 0 ? 12 : 0))} ${Y}
                   H${num(xi + w - (i === d.segmenti.length - 1 ? 12 : 0))}
                   ${i === d.segmenti.length - 1 ? `a12 12 0 0 1 12 12` : ''}
                   V${Y + H - (i === d.segmenti.length - 1 ? 12 : 0)}
                   ${i === d.segmenti.length - 1 ? `a12 12 0 0 1 -12 12` : ''}
                   H${num(xi + (i === 0 ? 12 : 0))}
                   ${i === 0 ? `a12 12 0 0 1 -12 -12` : ''}
                   V${Y + (i === 0 ? 12 : 0)}
                   ${i === 0 ? `a12 12 0 0 1 12 -12` : ''} Z" fill="${col}"/>
          <text x="${num(xi + w / 2)}" y="${Y + H / 2 + 4}" text-anchor="middle"
            dominant-baseline="middle" class="val"
            fill="${s.chiaro ? 'var(--tit)' : '#FFFFFF'}">${s.v}${unita(s.v, d.unita, d.unita1)}</text>
          <text x="${num(xi + w / 2)}" y="${Y + H + 50}" text-anchor="middle"
            class="et">${piano(s.t)}</text>
          ${s.d ? `<text x="${num(xi + w / 2)}" y="${Y + H + 86}" text-anchor="middle"
             class="sub">${piano(s.d)}</text>` : ''}
        </g>`;
      }).join('')}
      <text x="0" y="32" class="cap">${piano(d.testa ?? '')}</text>
      <text x="${LARG}" y="32" class="cap" text-anchor="end"
        >${tot}${unita(tot, d.unita, d.unita1)} in tutto</text>
    </svg>`;
  },

  // Finestra di tempo: da quando scatta l'obbligo a quando scade, sulla stessa
  // riga, con le soglie che contano. Anche questa sostituisce un quadrante che
  // su 48 ore su 48 disegnava sempre l'arco intero.
  scadenza: d => {
    const X0 = 60, X1 = LARG - 60, Y = 150, H = 54;
    const p = v => X0 + (X1 - X0) * (v / d.max);
    const b = d.banda ?? [0, d.max];
    return `<svg class="fig gfx" viewBox="0 0 ${LARG} 360">
      <g class="gx">
        <rect x="${X0}" y="${Y}" width="${X1 - X0}" height="${H}" rx="12" fill="var(--linea)"/>
        <rect x="${num(p(b[0]))}" y="${Y}" width="${num(p(b[1]) - p(b[0]))}" height="${H}" rx="12"
          fill="${d.colore ?? DATI[0]}"/>
        <text x="${X0}" y="${Y - 26}" class="cap">${piano(d.inizio ?? '')}</text>
        <text x="${X1}" y="${Y - 26}" class="cap" text-anchor="end">${piano(d.fine ?? '')}</text>
      </g>
      ${(() => {
        // Stessa trappola della linea del tempo: le didascalie sono riquadri
        // centrati sulla tacca, e due soglie vicine si sovrappongono. La
        // larghezza e' quella che ci sta fino alla tacca piu' vicina.
        const xs = (d.tappe ?? []).map(t => p(t.a));
        const largh = i => {
          let dist = Infinity;
          for (let k = 0; k < xs.length; k++)
            if (k !== i) dist = Math.min(dist, Math.abs(xs[k] - xs[i]));
          return Math.max(150, Math.min(400, dist - 16));
        };
        return (d.tappe ?? []).map((t, i) => {
        const x = xs[i], W = largh(i), col = t.key ? 'var(--acc)' : 'var(--tit)';
        return `<g class="gx">
          <line x1="${num(x)}" y1="${Y - 12}" x2="${num(x)}" y2="${Y + H + 34}"
            stroke="${col}" stroke-width="4"/>
          <circle cx="${num(x)}" cy="${Y + H + 34}" r="10" fill="${col}"/>
          <text x="${num(x)}" y="${Y + H + 96}" text-anchor="middle" class="big"
            style="font-size:52px" fill="${col}">${t.v ?? ''}</text>
          <foreignObject x="${num(Math.max(0, Math.min(x - W / 2, LARG - W)))}" y="${Y + H + 116}"
            width="${num(W)}" height="130">
            <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Inter,sans-serif;
              font-size:${W < 260 ? 25 : 29}px;line-height:1.3;text-align:center;color:var(--fg)">${acc(t.t)}</div>
          </foreignObject>
        </g>`;
      }).join('');
      })()}
    </svg>`;
  },

  // Piramide: gli strati stanno uno sull'altro e il piu' largo e' la base.
  piramide: d => {
    const n = d.strati.length, H = 108, G = 12, W = LARG * 0.52, X = 40;
    const alt = n * H + (n - 1) * G;
    return `<svg class="fig gfx" viewBox="0 0 ${LARG} ${alt + 20}">
      ${d.strati.map((s, i) => {
        const y = i * (H + G), wTop = W * (0.30 + 0.70 * i / n), wBot = W * (0.30 + 0.70 * (i + 1) / n);
        const col = RAMPA[Math.min(RAMPA.length - 1, RAMPA.length - n + i)];
        const cx = X + W / 2;
        return `<g class="gx">
          <path d="M${num(cx - wTop / 2)} ${y} H${num(cx + wTop / 2)}
                   L${num(cx + wBot / 2)} ${y + H} H${num(cx - wBot / 2)} Z" fill="${col}"/>
          <text class="lbl" x="${X + W + 60}" y="${y + H / 2 - 6}"
            dominant-baseline="middle">${acc(s.t)}</text>
          ${s.d ? `<text class="sub" x="${X + W + 60}" y="${y + H / 2 + 30}"
             dominant-baseline="middle">${acc(s.d)}</text>` : ''}
        </g>`;
      }).join('')}
    </svg>`;
  },

  // Albero di decisione. In HTML e non in SVG: dentro un SVG i riquadri hanno
  // altezza fissa e il testo piu' lungo viene tagliato — succedeva davvero,
  // «la volonta' del minore e' ascoltata» finiva sotto il bordo.
  albero: d => {
    const n = d.rami.length, m = 50 / n;
    return `<div class="albero gfx">
      <div class="radice gx">${acc(d.radice)}</div>
      <div class="rami" style="--m:${num(m)}%">${d.rami.map(r =>
        `<div class="r gx"><div class="cond">${r.cond}</div>
          <div class="box ${r.key ? 'key' : ''}">${acc(r.esito)}</div></div>`).join('')}
      </div></div>`;
  },

  // Due cerchi che si sovrappongono. I testi stanno nelle mezzelune, mai nella
  // lente: la lente e' larga un centinaio di pixel e qualunque frase ci finisca
  // dentro si sovrappone a quelle dei due cerchi.
  venn: d => {
    const R = 230, DX = 175, cy = 262, cx = LARG / 2, TW = 300;
    return `<div class="gfx">
      <svg class="fig" viewBox="0 0 ${LARG} 540">
        <g class="gx">
          <circle cx="${cx - DX}" cy="${cy}" r="${R}" fill="${DATI[0]}" fill-opacity=".14"
            stroke="${DATI[0]}" stroke-width="4"/>
          <text class="lbl" x="${cx - DX - 120}" y="${cy - R - 30}" text-anchor="middle"
            fill="${DATI[0]}">${piano(d.sx.t)}</text>
          <foreignObject x="${cx - DX - 97 - TW / 2}" y="${cy - 66}" width="${TW}" height="150">
            <div xmlns="http://www.w3.org/1999/xhtml" class="vt">${acc(d.sx.d)}</div>
          </foreignObject>
        </g>
        <g class="gx">
          <circle cx="${cx + DX}" cy="${cy}" r="${R}" fill="${DATI[2]}" fill-opacity=".14"
            stroke="${DATI[2]}" stroke-width="4"/>
          <text class="lbl" x="${cx + DX + 120}" y="${cy - R - 30}" text-anchor="middle"
            fill="${DATI[2]}">${piano(d.dx.t)}</text>
          <foreignObject x="${cx + DX + 97 - TW / 2}" y="${cy - 66}" width="${TW}" height="150">
            <div xmlns="http://www.w3.org/1999/xhtml" class="vt">${acc(d.dx.d)}</div>
          </foreignObject>
        </g>
        <g class="gx">
          <circle cx="${cx}" cy="${cy}" r="13" fill="var(--tit)"/>
          <line x1="${cx}" y1="${cy + 13}" x2="${cx}" y2="${cy + R + 46}"
            stroke="var(--linea)" stroke-width="3"/>
        </g>
      </svg>
      <div class="vcomune gx"><span class="et">in comune</span>${acc(d.centro)}</div>
    </div>`;
  },

  catena: d => `<div class="catena gfx ${d.passi.length >= 5 ? 'fitta' : ''}">${d.passi.map((p, i) =>
    `<div class="p gx ${p.key ? 'key' : ''} ${(d.attive ?? d.passi.map((_, k) => k)).includes(i) ? 'on' : 'off'}"><div class="t">${acc(p.t)}</div>
      ${p.d ? `<div class="d">${acc(p.d)}</div>` : ''}</div>`).join('')}</div>`,

  scala: d => `<div class="gfx"><div class="scala">${d.gradini.map((g, i) =>
    `<div class="g gx ${g.key ? 'key' : ''} ${(d.attive ?? d.gradini.map((_, k) => k)).includes(i) ? 'on' : 'off'}" style="height:${num(46 + (i + 1) * (340 / d.gradini.length))}px">
      ${g.n ? `<div class="n">${g.n}</div>` : ''}<div class="t">${acc(g.t)}</div>
      ${g.d ? `<div class="d">${acc(g.d)}</div>` : ''}</div>`).join('')}</div>
    <div class="scalabase"></div></div>`,

  // La soglia sta qui e non nelle scene: sette caselle su una colonna non ci
  // stanno alla misura piena, e ogni lezione se ne dimenticherebbe per conto suo.
  griglia: d => `<div class="griglia gfx ${
      d.celle.length >= (d.colonne === 1 ? 8 : 12) ? 'fittissima'
      : d.celle.length >= (d.colonne === 1 ? 6 : 9) ? 'fitta' : ''}"
      style="grid-template-columns:repeat(${d.colonne ?? 2},1fr)">${d.celle.map((c, i) =>
    `<div class="c gx ${c.no ? 'no' : ''} ${(d.attive ?? d.celle.map((_, k) => k)).includes(i) ? 'on' : 'off'}">${
      c.n != null ? `<span class="n">${c.n}</span>`
      : d.spunta === false ? '' : `<span class="sg">${c.no ? '×' : '✓'}</span>`}
      <span class="t">${acc(c.t)}</span></div>`).join('')}</div>`,

  icone: d => `<div class="icone gfx ${d.voci.length > 4 ? 'fitte' : ''}">${d.voci.map((v, i) =>
    `<div class="v gx ${v.key ? 'key' : ''} ${(d.attive ?? d.voci.map((_, k) => k)).includes(i) ? 'on' : 'off'}">${icona(v.icona)}
      <div class="t">${acc(v.t)}</div>
      ${v.d ? `<div class="d">${acc(v.d)}</div>` : ''}</div>`).join('')}</div>`,

  matrice: d => `<div class="matrice gfx ${
    d.celle.some(c => c.d) && d.celle.reduce((s, c) => s + c.t.length, 0) > 90 ? 'fitta' : ''}">
    <div></div><div class="ax gx">${d.assex[0]}</div><div class="ax gx">${d.assex[1]}</div>
    <div class="ax ay gx">${d.assey[0]}</div>
    ${d.celle.slice(0, 2).map(c => `<div class="q gx ${c.key ? 'key' : ''}">
      <div class="t">${acc(c.t)}</div>${c.d ? `<div class="d">${acc(c.d)}</div>` : ''}</div>`).join('')}
    <div class="ax ay gx">${d.assey[1]}</div>
    ${d.celle.slice(2).map(c => `<div class="q gx ${c.key ? 'key' : ''}">
      <div class="t">${acc(c.t)}</div>${c.d ? `<div class="d">${acc(c.d)}</div>` : ''}</div>`).join('')}
  </div>`,
};
```

## `slide/cards.mjs`

Renderizza le 50 slide in PNG con Playwright, animazioni bloccate al
fotogramma voluto. Scrive anche `troppo-alte.json`: e' il controllo
geometrico di traboccamento.

```javascript
// Renderizza i PNG fermi di tutte le scene: servono per guardarle e correggerle.
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';
import { SCENE } from './contenuti.mjs';
import { html } from './layout.mjs';

// il numero di lezione viene dal nome della cartella: progetti/m1-l1.2-profilo -> 1.2
const LEZIONE = (new URL('..', import.meta.url).pathname.match(/-l([\d.]+)-/) || [,'?'])[1];

const OUT = new URL('./png/', import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });

const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await b.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });

const buchiDati = [];
const troppoAlte = [];
for (const [i, s] of SCENE.entries()) {
  await p.setContent(html(s, { avanzamento: i / (SCENE.length - 1), pagina: LEZIONE }),
                     { waitUntil: 'load' });
  await p.evaluate(() => document.fonts.ready);
  await p.evaluate(() => document.getAnimations().forEach(a => { a.currentTime = 4000; }));
  // Controllo di traboccamento. Attenzione: NON basta guardare scrollHeight di
  // .corpo. E' un flex item con flex:1, quindi quando il contenuto e' troppo
  // alto non scrolla: cresce, e a tagliare e' la slide. Il confronto giusto e'
  // geometrico, fra il rettangolo del corpo e la cornice interna della slide.
  const over = await p.evaluate(() => {
    const c = document.querySelector('.corpo');
    const s = document.querySelector('.slide');
    const st = getComputedStyle(s);
    const rc = c.getBoundingClientRect(), rs = s.getBoundingClientRect();
    const alto  = rs.top    + parseFloat(st.paddingTop);
    const basso = rs.bottom - parseFloat(st.paddingBottom);
    const sx    = rs.left   + parseFloat(st.paddingLeft);
    const dx    = rs.right  - parseFloat(st.paddingRight);
    return {
      sfora: Math.round(Math.max(0, rc.bottom - basso) + Math.max(0, alto - rc.top)
                        + Math.max(0, c.scrollHeight - c.clientHeight)),
      largo: Math.round(Math.max(0, rc.right - dx) + Math.max(0, sx - rc.left)
                        + Math.max(0, c.scrollWidth - c.clientWidth)),
    };
  });
  if (over.sfora > 1 || over.largo > 1) troppoAlte.push([s.id, over]);

  // La cornice non e' l'unico modo in cui una slide si rompe. Su 2.7 la slide
  // dei tre momenti era un «assetempo» senza anni e ha stampato «undefined»
  // due volte sull'asse: dentro la cornice, quindi muta per il controllo di
  // sopra, e sarebbe andata in resa se non l'avessi guardata nel provino.
  // Un dato che manca ha sempre la stessa faccia, e cercarla costa nulla.
  const rotto = await p.evaluate(() => {
    const t = document.querySelector('.slide').innerText;
    return [...new Set((t.match(/undefined|NaN|\[object Object\]/g) ?? []))];
  });
  if (rotto.length) buchiDati.push([s.id, rotto]);

  await p.screenshot({ path: `${OUT}${s.id}.png` });
  process.stdout.write(`${s.id} `);
}
await b.close();
console.log('\n');
if (buchiDati.length) {
  console.log('DATI MANCANTI A SCHERMO:');
  for (const [id, v] of buchiDati) console.log(`  ${id}  ${v.join(' · ')}`);
  console.log('');
}
if (troppoAlte.length) {
  console.log('SFORANO LA CORNICE:');
  for (const [id, o] of troppoAlte) console.log(`  ${id}  +${o.sfora}px in altezza, +${o.largo}px in larghezza`);
} else console.log('nessuna slide sfora la cornice');
writeFileSync(new URL('./troppo-alte.json', import.meta.url), JSON.stringify(troppoAlte, null, 1));
```

## `slide/clips.mjs`

Trasforma in MP4 le sole scene animate, catturando i fotogrammi a passo fisso.

```javascript
// Dallo stesso layout dei PNG: i fotogrammi dell'ingresso, poi mp4 a 25 fps.
// Il tempo non scorre da solo: ogni fotogramma sposta a mano l'orologio delle
// animazioni, cosi' il render e' identico a ogni esecuzione.
import { chromium } from 'playwright';
import { mkdirSync, rmSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { SCENE } from './contenuti.mjs';
import { html } from './layout.mjs';

// il numero di lezione viene dal nome della cartella: progetti/m1-l1.2-profilo -> 1.2
const LEZIONE = (new URL('..', import.meta.url).pathname.match(/-l([\d.]+)-/) || [,'?'])[1];

const FPS = 25, DURATA = 1.8;              // l'ingresso finisce entro 1,3 s
const FOTOGRAMMI = Math.round(FPS * DURATA);
const QUI = new URL('.', import.meta.url).pathname;
const FF = execFileSync('python3', ['-c',
  'import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())']).toString().trim();

// solo i blocchi: copertina e chiusura vanno in scena come immagini ferme
// Con uno o piu' id sulla riga di comando si rifanno solo quelli: una slide
// corretta non deve costare la ri-resa delle altre quarantasette.
const SOLO = new Set(process.argv.slice(2));
const DA_ANIMARE = SCENE.filter(s => s.tipo !== 'copertina')
                        .filter(s => SOLO.size === 0 || SOLO.has(s.id));

mkdirSync(`${QUI}mp4`, { recursive: true });
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await b.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });

for (const s of DA_ANIMARE) {
  const i = SCENE.indexOf(s);
  const dir = `${QUI}fotogrammi/${s.id}`;
  rmSync(dir, { recursive: true, force: true }); mkdirSync(dir, { recursive: true });
  await p.setContent(html(s, { avanzamento: i / (SCENE.length - 1), pagina: LEZIONE }),
                     { waitUntil: 'load' });
  await p.evaluate(() => document.fonts.ready);
  for (let f = 0; f < FOTOGRAMMI; f++) {
    await p.evaluate(ms => document.getAnimations().forEach(a => { a.currentTime = ms; }),
                     (f / FPS) * 1000);
    await p.screenshot({ path: `${dir}/${String(f).padStart(3, '0')}.png` });
  }
  execFileSync(FF, ['-y', '-v', 'error', '-framerate', String(FPS), '-i', `${dir}/%03d.png`,
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p',
    '-an', `${QUI}mp4/${s.id}.mp4`]);
  rmSync(dir, { recursive: true, force: true });
  process.stdout.write(`${s.id} `);
}
await b.close();
console.log(`\n${DA_ANIMARE.length} clip da ${DURATA}s scritte in mp4/`);
```

## `monta-scene.py`

Costruisce il payload delle scene per il montaggio: ogni scena video porta
`audio_asset_id` e `playback: freeze + mute`, altrimenti si tronca a ~1,8 s.

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Per ogni blocco: la clip dell'ingresso (1,8 s) + l'ultimo fotogramma tenuto
fino alla durata del parlato, con l'mp3 del blocco dentro. Una scena, un file."""
import json, subprocess, re
from pathlib import Path
import imageio_ffmpeg

QUI = Path(__file__).resolve().parent
FF  = imageio_ffmpeg.get_ffmpeg_exe()
OUT = QUI/"scene"; OUT.mkdir(exist_ok=True)

def durata(f):
    o = subprocess.run([FF,"-i",str(f),"-f","null","-"],capture_output=True,text=True).stderr
    t = re.findall(r"time=(\d+):(\d+):([\d.]+)", o)[-1]
    return int(t[0])*3600+int(t[1])*60+float(t[2])

reg = json.loads((QUI/"audio"/"blocchi-audio.json").read_text(encoding="utf-8"))
tot = 0.0; righe = []
for r in reg:
    idb, d = r["id"], r["durata"]
    clip, mp3, out = QUI/"slide"/"mp4"/f"{idb}.mp4", QUI/"audio"/"blocchi"/f"{idb}.mp3", OUT/f"{idb}.mp4"
    p = subprocess.run([FF,"-y","-v","error","-i",str(clip),"-i",str(mp3),
        "-filter_complex", f"[0:v]tpad=stop_mode=clone:stop_duration={d+1:.3f},fps=25[v]",
        "-map","[v]","-map","1:a","-t",f"{d:.3f}",
        "-c:v","libx264","-preset","veryfast","-crf","20","-pix_fmt","yuv420p",
        "-c:a","aac","-b:a","160k","-movflags","+faststart",str(out)],
        capture_output=True,text=True)
    if p.returncode: print(idb, p.stderr[-400:]); raise SystemExit(1)
    dr = durata(out); tot += dr
    righe.append((idb, d, dr, abs(dr-d)))
    print(f"  {idb}  audio {d:6.2f}s  scena {dr:6.2f}s  scarto {abs(dr-d)*1000:4.0f} ms")

peggio = max(righe, key=lambda x: x[3])
m = tot + 3 + 10
print(f"\n48 scene · parlato {tot:.1f} s · con copertina 3 s e chiusura 10 s → {int(m//60)}:{m%60:04.1f}")
print(f"scarto massimo audio/video: {peggio[3]*1000:.0f} ms su {peggio[0]}")
```

## `monta-locale.py`

Il montaggio di prova in locale con ffmpeg: serve a guardare il video prima
di spendere una resa vera.

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Copia locale del montato: copertina 3 s + le 48 scene + chiusura 10 s.
Serve a verificare la durata e a guardare il risultato senza aspettare HeyGen."""
import json, subprocess, re
from pathlib import Path
import imageio_ffmpeg
QUI = Path(__file__).resolve().parent
import re as _re
LEZIONE = (_re.search(r"-l([\d.]+)-", QUI.name) or ["","?"])[1]
FF  = imageio_ffmpeg.get_ffmpeg_exe()
TMP = QUI/"_montaggio"; TMP.mkdir(exist_ok=True)
sh  = lambda *a: subprocess.run([str(x) for x in a], capture_output=True, text=True)

def durata(f):
    t = re.findall(r"time=(\d+):(\d+):([\d.]+)", sh(FF,"-i",f,"-f","null","-").stderr)[-1]
    return int(t[0])*3600+int(t[1])*60+float(t[2])

# copertina e chiusura: immagine ferma + silenzio, cosi' hanno una traccia audio
for idb, sec in (("s01", 3), ("s50", 10)):
    sh(FF,"-y","-v","error","-loop","1","-t",str(sec),"-i",QUI/"slide"/"png"/f"{idb}.png",
       "-f","lavfi","-t",str(sec),"-i","anullsrc=r=44100:cl=stereo",
       "-c:v","libx264","-preset","veryfast","-crf","20","-pix_fmt","yuv420p","-r","25",
       "-c:a","aac","-b:a","160k","-shortest",TMP/f"{idb}.mp4")

reg = json.loads((QUI/"audio"/"blocchi-audio.json").read_text(encoding="utf-8"))
ordine = [TMP/"s01.mp4"] + [QUI/"scene"/f"{r['id']}.mp4" for r in reg] + [TMP/"s50.mp4"]
(TMP/"lista.txt").write_text("".join(f"file '{p.resolve()}'\n" for p in ordine), encoding="utf-8")
sh(FF,"-y","-v","error","-f","concat","-safe","0","-i",TMP/"lista.txt",
   "-c","copy","-movflags","+faststart",QUI/f"montato-{LEZIONE}.mp4")

# sottotitoli: dal copione e dalle durate reali dei blocchi
def hms(t):
    h=int(t//3600); m=int(t%3600//60); s=t%60
    return f"{h:02d}:{m:02d}:{s:06.3f}".replace(".",",")
bl = {x["id"]: re.sub(r"\[[a-z]+\]","",x["text"]).strip()
      for x in json.loads((QUI/"copione"/"blocchi.json").read_text(encoding="utf-8"))}
righe, t, n = [], 3.0, 0
for r in reg:
    n += 1
    righe.append(f"{n}\n{hms(t)} --> {hms(t+r['durata'])}\n{bl[r['id']]}\n")
    t += r["durata"]
(QUI/f"montato-{LEZIONE}.srt").write_text("\n".join(righe), encoding="utf-8")

d = durata(QUI/f"montato-{LEZIONE}.mp4")
print(f"montato-{LEZIONE}.mp4  {int(d//60)}:{d%60:05.2f}  "
      f"{(QUI/f'montato-{LEZIONE}.mp4').stat().st_size//1024//1024} MB")
print(f"montato-{LEZIONE}.srt  {n} sottotitoli")
print(sh(FF,"-i",QUI/f"montato-{LEZIONE}.mp4","-f","null","-").stderr.split("Stream #0")[1][:150])
```

## `controlli.py`

Gli otto controlli del §6, in un colpo solo.

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""I controlli del MASTER §5, tutti in una volta."""
import json, re, subprocess
from pathlib import Path
import imageio_ffmpeg
QUI = Path(__file__).resolve().parent
import re as _re
LEZIONE = (_re.search(r"-l([\d.]+)-", QUI.name) or ["","?"])[1]
FF  = imageio_ffmpeg.get_ffmpeg_exe()
ok = lambda b: "OK  " if b else "NO  "
esiti = []

# La verifica passa se la prova non ha trovato nulla, oppure se tutto quello
# che ha trovato e' stato corretto e poi ricontrollato con una controprova.
f = QUI/"audio"/"esiti-verifica.json"
corr = QUI/"audio"/"correzioni.json"
ctrl = sorted((QUI/"audio"/"trascrizioni").glob("controprova*.txt")) if (QUI/"audio"/"trascrizioni").exists() else []
txt = QUI/"audio"/"esiti-testo.json"
if not f.exists() and txt.exists():
    # Strada alternativa: la trascrizione dell'intera traccia grezza. Prova che
    # la voce ha detto tutto - l'errore che in 1.1 e' costato una rigenerazione -
    # ma non dove cadono i tagli, perche' la trascrizione non porta i tempi.
    # Per quelli restano l'allineamento DTW e controllo-statistico.py.
    e = json.loads(txt.read_text(encoding="utf-8"))
    buchi = sum(len(v["buchi"]) for v in e.values())
    perc = min(100*v["coincidenti"]/v["parole_copione"] for v in e.values())
    esiti.append((not buchi, f"verifica per trascrizione (traccia intera): {perc:.1f}% "
                             f"delle parole coincide, buchi nel parlato: {buchi}"))
elif not f.exists():
    esiti.append((False, "verifica per trascrizione: NON ESEGUITA — manca prova.txt"))
else:
    fuori = [e for e in json.loads(f.read_text(encoding="utf-8")) if not e["ok"]]
    if not fuori:
        esiti.append((True, "verifica per trascrizione: nessun confine fuori posto"))
    elif corr.exists() and ctrl:
        n = sum(len(v) for v in json.loads(corr.read_text(encoding="utf-8")).values())
        bastano = n >= len(fuori)
        esiti.append((bastano, f"verifica: {len(fuori)} fuori posto alla prova, {n} corretti "
                          f"e ricontrollati con controprova -> {max(0,len(fuori)-n)}"))
    else:
        esiti.append((False, f"verifica per trascrizione: {len(fuori)} confini fuori posto, non corretti"))

reg = json.loads((QUI/"audio"/"blocchi-audio.json").read_text(encoding="utf-8"))
male = [r for r in reg if not 8.5 <= r["cps"] <= 21]
esiti.append((not male, "fascia 8,5-21 car/s: " +
  (", ".join(f"{r['id']} a {r['cps']}" for r in male) or "tutti dentro")))

png = sorted(Path(QUI/"slide"/"png").glob("s*.png"))
esiti.append((len(png)==50, f"50 PNG renderizzati e guardati: {len(png)}"))
sfora = json.loads((QUI/"slide"/"troppo-alte.json").read_text(encoding="utf-8"))
esiti.append((not sfora, f"nessuna slide sfora la cornice: {len(sfora)} sforano"))

scene = sorted(Path(QUI/"scene").glob("*.mp4"))
esiti.append((len(scene)+2 <= 50, f"scene totali: {len(scene)+2} (tetto 50)"))

o = subprocess.run([FF,"-i",str(QUI/f"montato-{LEZIONE}.mp4"),"-f","null","-"],
                   capture_output=True,text=True).stderr
t = re.findall(r"time=(\d+):(\d+):([\d.]+)", o)[-1]
d = int(t[0])*3600+int(t[1])*60+float(t[2])
esiti.append((d >= 480, f"durata {int(d//60)}:{d%60:05.2f} — richiesto «8 minuti almeno»"))

srt = (QUI/f"montato-{LEZIONE}.srt").read_text(encoding="utf-8")
n = len(re.findall(r"-->", srt))
esiti.append((n==48, f"sottotitoli SRT: {n} righe"))

rf = QUI/"REGISTRO.md"
esiti.append((rf.exists() and "## Da verificare" in rf.read_text(encoding="utf-8"),
              "registro con la sezione «da verificare»"))

print("CONTROLLI PRIMA DI CONSEGNARE (MASTER §5)\n")
for b,t in esiti: print(f"  [{ok(b)}] {t}")
print(f"\n{sum(1 for b,_ in esiti if b)}/{len(esiti)} superati")
```

## `slide/contenuti.mjs — esempio`

Il secondo dei due file per lezione: le 50 scene, una per blocco. Questo e'
quello della 1.8, riportato per intero come esempio di come si usano i 13
tipi grafici.

```javascript
// Contenuto delle 50 scene della lezione 2.8 — il riepilogo del modulo.

const MAPPA = [
 {n:"2.1", t:"**Il processo di assistenza** — i cinque passi"},
 {n:"2.2", t:"**Modelli e tassonomie** — le categorie con cui si guarda"},
 {n:"2.3", t:"**Accertamento e scale**"},
 {n:"2.4", t:"**La documentazione infermieristica**"},
 {n:"2.5", t:"**EBP, linee guida, PDTA e procedure**"},
 {n:"2.6", t:"**Rischio clinico** e sicurezza del paziente"},
 {n:"2.7", t:"**Comunicazione clinica** e continuità", key:true},
];

const CATENA = [
 {t:"Raccolgo", d:"con le categorie della disciplina"},
 {t:"Decido", d:"sulle migliori evidenze disponibili"},
 {t:"Documento", d:"ciò che faccio"},
 {t:"Comunico", d:"nei passaggi"},
 {t:"Sorveglio", d:"il sistema: l'errore è prevedibile", key:true},
];

const CONF = [
 {n:"1", t:"**Obiettivo o intervento** — guarda il *soggetto* della frase"},
 {n:"2", t:"**Reale o di rischio** — con i segni, oppure senza"},
 {n:"3", t:"**Diagnosi o problema collaborativo** — si tratta, oppure si sorveglia"},
 {n:"4", t:"**Henderson 14, Gordon 11** — non il contrario"},
 {n:"5", t:"**NOC o NIC** — outcome, oppure interventi"},
 {n:"6", t:"**Braden o Conley** — lesioni inverso, cadute diretto"},
 {n:"7", t:"**Linea guida, procedura, PDTA** — cosa, come qui, chi lungo il percorso"},
 {n:"8", t:"**Near miss o evento avverso** — non arriva, oppure arriva", key:true},
];

const FORMULE = [
 {n:"1", t:"**PES** — problema, etiologia, segni e sintomi *(di rischio: PE)*"},
 {n:"2", t:"**PICO** — popolazione, intervento, confronto, esito"},
 {n:"3", t:"**SBAR** — situation, background, assessment, recommendation"},
 {n:"4", t:"**CAM** — 1 + 2 + (3 oppure 4)"},
 {n:"5", t:"**EBP** — evidenze + competenza clinica + valori della persona", key:true},
];

const VENETO = [
 {n:"1", t:"Il processo sta dentro la **cartella clinica elettronica** — scale integrate, rivalutazioni a intervalli definiti"},
 {n:"2", t:"La catena delle evidenze: **SNLG → indirizzo regionale e PDTA → procedura aziendale → pratica**, spesso dentro le **reti cliniche**"},
 {n:"3", t:"La filiera del rischio: **operatore → risk management → Centro regionale → Osservatorio nazionale**, con il **Difensore civico** Garante"},
 {n:"4", t:"La continuità verso il territorio: **dimissioni protette, COT, infermiere di famiglia e comunità**", key:true},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 2 · Riepilogo",
  titolo:"Ricomponiamo<br>il modulo", sottotitolo:"Nessun contenuto nuovo: la mappa, i numeri, le confusioni, i casi",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false,
  sopratitolo:"Che cosa c'è in questo video",
  celle:[
   {n:"1", t:"La **mappa** delle sette lezioni"},
   {n:"2", t:"Il **filo** che le tiene insieme"},
   {n:"3", t:"I **numeri** e le **formule**"},
   {n:"4", t:"Le **confusioni** e i **casi tipici**", key:true}]},

{id:"s03", tipo:"titolo", tema:"chiaro", sopratitolo:"Come usarlo",
  titolo:"Guardalo **due volte**:<br>adesso, e la settimana<br>prima della prova.",
  sotto:"Quando serve rimettere in ordine quello che nel frattempo si è sparpagliato."},

{id:"s04", tipo:"titolo", tema:"tenue", sopratitolo:"Un avvertimento",
  titolo:"Un ripasso serve<br>a **trovare i buchi**,<br>non a riempirli tutti.",
  sotto:"Se un punto ti sfugge, riprendi quella lezione — non tutto il modulo da capo."},

{id:"s05", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, attive:[0,1,2,3],
  sopratitolo:"La mappa del modulo", celle:MAPPA},
{id:"s06", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false,
  sopratitolo:"La mappa del modulo", celle:MAPPA},
{id:"s07", tipo:"titolo", tema:"chiaro", sopratitolo:"Come tenerle insieme",
  titolo:"Non sette argomenti:<br>**sette punti di una<br>sola linea**.",
  sotto:"Ed è la linea che conviene saper raccontare all'orale."},

{id:"s08", tipo:"catena", tema:"chiaro", sopratitolo:"Il filo del modulo, in cinque verbi", attive:[0,1],
  passi:CATENA},
{id:"s09", tipo:"catena", tema:"chiaro", sopratitolo:"Il filo del modulo, in cinque verbi",
  passi:CATENA},
{id:"s10", tipo:"tre", tema:"chiaro", sopratitolo:"Tre facce dello stesso lavoro",
  box:[
   {n:"1", t:"Metodo", d:"raccolgo e decido"},
   {n:"2", t:"Prova", d:"documento"},
   {n:"3", t:"Sicurezza", d:"comunico e sorveglio", key:true}]},

{id:"s11", tipo:"titolo", tema:"chiaro", sopratitolo:"Dalla 2.1 · il processo",
  titolo:"Cinque fasi,<br>e il processo è **ciclico**.",
  sotto:"La valutazione non chiude niente: riapre l'accertamento. Ed è il passo che si dimentica più spesso."},

{id:"s12", tipo:"confronto", tema:"chiaro", sopratitolo:"Le due diagnosi",
  col:[
   {h:"Reale — PES", t:"**P**roblema · **E**tiologia · **S**egni e sintomi"},
   {h:"Di rischio — PE", t:"**Senza segni**: se i segni ci fossero, non sarebbe più un rischio"}]},

{id:"s13", tipo:"scala", tema:"chiaro", sopratitolo:"Le priorità, in quest'ordine",
  gradini:[
   {n:"1", t:"ABC", d:"prima di tutto"},
   {n:"2", t:"Rischio di danno a breve", d:"poi"},
   {n:"3", t:"Impatto e percezione", d:"sull'autonomia, e come la vive la persona", key:true}]},

{id:"s14", tipo:"tabella", tema:"chiaro", sopratitolo:"Dalla 2.2 · i numeri dei modelli",
  intestazioni:["Modello","Quanti"], colonne:["58%","42%"],
  righe:[
   ["**Metaparadigma**","**4** concetti"],
   ["**Henderson** — bisogni","**14**"],
   ["**Gordon** — modelli funzionali","**11**"],
   ["**Orem** — sistemi","**3**"]]},

{id:"s15", tipo:"catena", tema:"chiaro", sopratitolo:"La catena delle tassonomie",
  passi:[
   {t:"NANDA-I", d:"le diagnosi"},
   {t:"NOC", d:"i risultati — *outcome*"},
   {t:"NIC", d:"gli interventi", key:true}]},

{id:"s16", tipo:"titolo", tema:"chiaro", sopratitolo:"Come non sbagliare NOC e NIC",
  titolo:"NO**C** come out**c**ome.<br>NI**C** come **i**ntervento.",
  sotto:"La lettera che cambia nella sigla è la stessa che cambia nel significato."},

{id:"s17", tipo:"tabella", tema:"chiaro", sopratitolo:"Dalla 2.3 · la slide da fotografare",
  intestazioni:["Scala","Che cosa misura","Intervallo","Soglia"], colonne:["22%","38%","20%","20%"],
  righe:[
   ["**Braden**","lesioni da pressione","6 – 23","**≤ 16**"],
   ["**Norton**","lesioni da pressione","5 – 20","**≤ 14**"],
   ["**Conley**","rischio di caduta","0 – 10","**≥ 2**"],
   ["**Tinetti**","equilibrio e andatura","0 – 28","**< 19**"]]},
{id:"s18", tipo:"tabella", tema:"chiaro", sopratitolo:"Dalla 2.3 · la slide da fotografare",
  intestazioni:["Scala","Che cosa misura","Intervallo","Soglia"], colonne:["22%","38%","20%","20%"],
  righe:[
   ["**Barthel**","autonomia nelle ADL","0 – 100","—"],
   ["**Glasgow**","stato di coscienza","3 – 15","**coma ≤ 8**"],
   ["**CAM**","delirium","—","**1 + 2 + (3 o 4)**"],
   ["**MUST**","rischio nutrizionale","0 – 6","**≥ 2** alto"]]},
{id:"s19", tipo:"titolo", tema:"chiaro", sopratitolo:"Se devi trascrivere una cosa sola",
  titolo:"Otto scale,<br>**otto intervalli**.",
  sotto:"È la parte che si dimentica per prima, perché sono numeri senza appiglio."},

{id:"s20", tipo:"confronto", tema:"chiaro", sopratitolo:"La regola che risolve metà delle domande",
  col:[
   {h:"Misura una capacità", t:"**Più alto è meglio** — Barthel 100 è ottimo"},
   {h:"Misura un rischio", t:"**Più alto è peggio** — Conley 10 è pessimo"}]},

{id:"s21", tipo:"titolo", tema:"chiaro", sopratitolo:"Fin qui è intuitivo",
  titolo:"E infatti non è qui<br>che si sbaglia.",
  sotto:"Si sbaglia sulle due eccezioni."},

{id:"s22", tipo:"trappola", tema:"profondo", sopratitolo:"Le due eccezioni",
  righe:[
   {sb:"«Misura un rischio, quindi più alto è peggio»",
    ok:"**Braden e Norton** misurano un rischio con punteggio **inverso**: più basso, più a rischio"}]},

{id:"s23", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, attive:[0,1],
  sopratitolo:"Le otto confusioni che costano di più", celle:CONF},
{id:"s24", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, attive:[0,1,2,3],
  sopratitolo:"Le otto confusioni che costano di più", celle:CONF},
{id:"s25", tipo:"titolo", tema:"chiaro", sopratitolo:"Henderson o Gordon",
  titolo:"**14** Henderson.<br>**11** Gordon.",
  sotto:"Se non ricordi quale sia quale: quelli di Gordon sono modelli funzionali di salute, e sono i meno numerosi dei due."},

{id:"s26", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, attive:[0,1,2,3,4,5],
  sopratitolo:"Le otto confusioni che costano di più", celle:CONF},
{id:"s27", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false,
  sopratitolo:"Le otto confusioni che costano di più", celle:CONF},
{id:"s28", tipo:"tre", tema:"chiaro", sopratitolo:"Le tre parole dell'evento",
  box:[
   {n:"1", t:"Near miss", d:"l'errore **non arriva** al paziente"},
   {n:"2", t:"Evento avverso", d:"il danno **c'è**"},
   {n:"3", t:"Complicanza", d:"**attesa** — non presuppone un errore", key:true}]},

{id:"s29", tipo:"trappola", tema:"chiaro", sopratitolo:"Caso · la traccia con dati incompleti",
  righe:[
   {sb:"Scegliere l'intervento più sensato fra quelli proposti",
    ok:"Si comincia **raccogliendo il dato mancante** — è quasi sempre quella l'opzione giusta"}]},

{id:"s30", tipo:"titolo", tema:"chiaro", sopratitolo:"Caso · «quale intervento ha la priorità?»",
  titolo:"**ABC**, poi rischio di<br>danno a breve, poi impatto<br>e percezione.",
  sotto:"In quest'ordine, sempre."},

{id:"s31", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false,
  sopratitolo:"Caso · Braden 12 in paziente allettato",
  celle:[
   {n:"1", t:"Cambi posturali **programmati**"},
   {n:"2", t:"Superficie **antidecubito**"},
   {n:"3", t:"Gestione dell'**umidità**"},
   {n:"4", t:"Valutazione **nutrizionale**"},
   {n:"5", t:"**Ispezione cutanea** a ogni turno", key:true}]},

{id:"s32", tipo:"titolo", tema:"profondo", sopratitolo:"Perché il punteggio non basta",
  titolo:"Una scala compilata e<br>non seguita da niente è<br>**peggio** di una non compilata.",
  sotto:"Dimostra che il rischio era noto. Al punteggio deve corrispondere una modifica del piano."},

{id:"s33", tipo:"catena", tema:"chiaro", sopratitolo:"Caso · prescrizione illeggibile o dubbia",
  passi:[
   {t:"Chiedo chiarimento", d:"al prescrittore"},
   {t:"Non do corso", d:"se il dubbio permane"},
   {t:"Documento", d:"il dubbio e la richiesta", key:true}]},

{id:"s34", tipo:"confronto", tema:"chiaro", sopratitolo:"Altri due casi, due risposte",
  col:[
   {h:"Near miss intercettato", t:"**Segnalo comunque** — è apprendimento gratuito"},
   {h:"Chiamata al medico", t:"Strutturo con **SBAR**, esplicitando **valutazione e richiesta**"}]},

{id:"s35", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, attive:[0,1],
  sopratitolo:"Cinque formule da citare per intero", celle:FORMULE},
{id:"s36", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, attive:[0,1,2,3],
  sopratitolo:"Cinque formule da citare per intero", celle:FORMULE},
{id:"s37", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false,
  sopratitolo:"Cinque formule da citare per intero", celle:FORMULE},

{id:"s38", tipo:"titolo", tema:"chiaro", sopratitolo:"La frase del modulo",
  titolo:"Ciò che non è documentato<br>si presume **non fatto**.",
  sotto:"L'abbiamo incontrata nella 1.5, e non ci ha più lasciati."},

{id:"s39", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false,
  sopratitolo:"Per che cosa vale — cioè per tutto",
  celle:[
   {n:"1", t:"La **scala** compilata"},
   {n:"2", t:"La **segnalazione** fatta al medico"},
   {n:"3", t:"Il **rifiuto** della persona"},
   {n:"4", t:"La **rivalutazione** del dolore", key:true}]},

{id:"s40", tipo:"titolo", tema:"profondo", sopratitolo:"Perché non è burocrazia",
  titolo:"La memoria non fa prova.<br>Il **documento** sì.",
  sotto:"È l'unico modo in cui il lavoro che hai fatto continua a esistere a distanza di anni."},

{id:"s41", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, attive:[0],
  sopratitolo:"Quattro agganci veneti da portare all'orale", celle:VENETO},
{id:"s42", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, attive:[0,1],
  sopratitolo:"Quattro agganci veneti da portare all'orale", celle:VENETO},
{id:"s43", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, attive:[0,1,2],
  sopratitolo:"Quattro agganci veneti da portare all'orale", celle:VENETO},

{id:"s44", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false,
  sopratitolo:"Quattro agganci veneti da portare all'orale", celle:VENETO},
{id:"s45", tipo:"confronto", tema:"chiaro", sopratitolo:"Come proseguire · i primi due passi",
  col:[
   {h:"Primo", t:"Il **test del modulo** — 30 domande, soglia 21"},
   {h:"Secondo", t:"Riprendi **solo le lezioni** che gli errori ti hanno segnalato, non tutto il modulo da capo"}]},
{id:"s46", tipo:"titolo", tema:"chiaro", sopratitolo:"Terzo passo",
  titolo:"Nel quaderno di ripasso:<br>**i numeri delle scale**<br>e le **formule**.",
  sotto:"È la parte che si dimentica per prima, ed è anche l'unica che si recupera in cinque minuti."},

{id:"s47", tipo:"titolo", tema:"profondo", sopratitolo:"Il consiglio con il rendimento più alto del corso",
  titolo:"Lo schema in cinque passi<br>della 2.1, su **due casi**.",
  sotto:"Non su venti: su due, fatti bene."},

{id:"s48", tipo:"confronto", tema:"chiaro", sopratitolo:"Dove sei arrivato",
  col:[
   {h:"Modulo 1", t:"La **grammatica** della professione"},
   {h:"Modulo 2", t:"La **sintassi**: il metodo, la prova, la sicurezza"}]},

{id:"s49", tipo:"titolo", tema:"chiaro", sopratitolo:"E dal modulo 3",
  titolo:"Il metodo<br>diventa **clinica**.",
  sotto:"Bisogni fondamentali, comfort, assistenza di base avanzata: la parte che pesa di più nella prova pratica."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossimo modulo",
  titolo:"Modulo 3", sottotitolo:"Bisogni fondamentali, comfort<br>e assistenza di base avanzata",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
```
