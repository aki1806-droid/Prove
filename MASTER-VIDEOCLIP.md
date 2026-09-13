# MASTER — metodo di produzione video con clip generate

**Documento portatile.** Contiene il metodo *e* il codice: incollato in una chat
nuova, basta a rifare tutto da zero. È scritto per chi non era presente alla
prima lavorazione, quindi ogni regola porta con sé il motivo — quasi tutte sono
costate un render buttato, e poche righe di spiegazione valgono meno di un giro
a vuoto.

Prodotto finale: **video da clip generate + voce**, senza avatar e senza slide.
Ogni clip è l'inquadratura di un blocco di parlato; sopra ci stanno solo i
sottotitoli e il marchio.

Deriva dal master delle micro-lezioni a slide, e ne tiene tutto l'impianto: la
stessa aritmetica, la stessa voce in due tracce, lo stesso ritaglio DTW, le
stesse verifiche. Quello che cambia è il passo 4: dove prima si renderizzava una
slide, adesso si genera una clip.

---

# 0. Che cosa serve avere

| | |
|---|---|
| **voce** | un servizio di sintesi con trascrizione (qui: ElevenLabs via MCP) |
| **clip** | un generatore video (qui: Higgsfield; si cambia in un punto solo) |
| **montaggio** | un servizio che concatena scene da asset (qui: HeyGen via MCP) |
| **locale** | `python3` con `imageio_ffmpeg`. Nient'altro. |

Il locale fa tutto il lavoro pesante: durate, sottotitoli, marchio, cartelli,
montato di controllo. I tre servizi esterni servono per la voce, per le clip e
per il render finale.

> **Niente più node, niente più Chromium.** Servivano a renderizzare le slide.
> Senza slide restano due sole immagini ferme — copertina e chiusura — e per due
> immagini non vale la pena di tenere in piedi un browser: si fanno con `ffmpeg`
> su un fondo pieno.

> **Il `ffmpeg` di `imageio_ffmpeg` non ha `drawtext`.** Manca `libfreetype`, e
> il giro fallisce con `Unknown filter 'drawtext'`. Il testo a video si imprime
> con il filtro `ass`, che c'è: si scrive un file `.ass` e lo si dà in pasto al
> filtro. Si guadagna anche una tipografia vera — a capo, allineamento, riquadro.

---

# 1. Le domande da fare prima di cominciare

**Cinque, e si fanno ogni volta.** Non si indovinano, non si ereditano dal video
precedente, non si deducono dallo script. Finché non ci sono tutte e cinque, non
si scrive una riga.

1. **Il tema.** Di che cosa parla il video, e — soprattutto — che cosa si vede
   mentre ne parla. Non il titolo: il mondo in cui sta. «Un laboratorio di
   falegnameria in città» è una risposta; «artigianato» non lo è.
2. **La palette.** Quattro colori: fondo, testo, accento, secondario. Se
   l'utente dà un marchio invece di una palette, i colori si **campionano dal
   file**, non si stimano a occhio.
3. **La voce.** Quale, e in che lingua. Si sceglie dall'elenco del servizio, mai
   a memoria.
4. **La durata.** È il vincolo da cui discende tutto il resto: quanti caratteri
   scrivere, quanti blocchi, quante clip, quanto costa.
5. **Il formato.** `16:9`, `9:16`, `1:1`, `4:5`, `5:4`. Cambia il canvas, il
   ritaglio delle clip, la larghezza dei sottotitoli e dove stanno.

Poi una domanda di servizio: **da dove viene il copione** — lo carica l'utente,
lo scrivo io, o c'è uno script di partenza da riscrivere.

Le risposte finiscono in `profilo.json` e non si ripetono altrove. È il solo
posto dove stanno, e tutti gli strumenti le leggono da lì.

> **Quello che non si chiede.** Quanti blocchi, quante clip, che modello video,
> quanto dura ogni inquadratura, come si spezzano i sottotitoli, con che passo si
> monta: sono decisioni tecniche, e chiederle sposta sull'utente un lavoro che è
> mio. Si decidono con l'aritmetica del §2 e si dichiarano nel registro.

## La carta visiva

Dalla risposta 1 e dalla risposta 2 si scrive la **carta visiva**: un paragrafo,
in inglese, che descrive pellicola, luce, obiettivo, movimento, trattamento delle
persone, colore. Finisce **parola per parola in ogni prompt**, identica.

È l'unica cosa che tiene insieme quaranta clip generate una per una. Se cambia
anche solo l'obiettivo fra la clip 12 e la 13, allo stacco si vede — e non si
vede come uno stile, si vede come un errore.

Si scrive una volta, prima della prima clip, e **non si tocca più fino alla fine
del video**. Ritoccarla a metà vuol dire avere due film in uno.

---

# 2. L'aritmetica

Tutto discende dalle risposte 4 e 5. Un solo numero da ricordare:

```
VELOCITÀ DI LETTURA = 17,0 caratteri al secondo
```

È misurata, non stimata: è la velocità della traccia **dopo** il filtro di
ritmo. Su otto lavorazioni il reale è andato da **15,8 a 17,6 car/s**, e lo
scarto non è rumore — dipende dalla **densità di cifre**. Un anno pronunciato
per esteso dura molto più dei quattro caratteri che occupa:
«millenovecentosettantaquattro» sono ventinove caratteri di parlato per quattro
di testo.

```
copertina + chiusura   1,5 + 3 s   sotto 90 s
                       2   + 6 s   fino a 5 minuti
                       3   + 10 s  oltre
parlato                = durata chiesta − copertina − chiusura
caratteri da scrivere  = parlato × 17,0
```

## Blocchi, inquadrature, scene

```
TETTO DURO: 50 scene per video
```

Sopra quello il servizio di montaggio rifiuta. Cinquanta scene sono una
copertina, una chiusura e **48 blocchi** al massimo.

Un blocco è **quello che sta sopra una singola inquadratura**: un concetto, mai
due. Da cui il passo:

```
PASSO TIPICO = 9 s di parlato per inquadratura   (fra 4 e 14)
blocchi = parlato / 9, non oltre 48
```

Sotto i 4 secondi la clip non fa in tempo a leggersi. Sopra i 14 una sola
immagine in movimento stanca, qualunque cosa stia dicendo la voce — ed è il
limite che fissa la durata massima di un video in un render solo:

```
48 blocchi × 14 s = 672 s = 11:12 di parlato
```

Oltre, il video **non sta in una chiamata sola**: si monta a parti e si
concatenano in locale. `aritmetica.py` lo dice da sé invece di lasciarlo
scoprire al momento del render.

Due esempi, entrambi usciti da `aritmetica.py`:

| chiesto | formato | parlato | caratteri | blocchi | passo |
|---|---|---|---|---|---|
| 9:00 | 16:9 | 527 s | 8.959 | 48 | 10,98 s |
| 1:00 | 9:16 | 55,5 s | 944 | 6 | 9,25 s |

Il primo è lo stesso conto del master a slide, che su otto lezioni misurate dava
8.500–8.960 caratteri: l'aritmetica generale ci ricasca sopra da sola.

---

# 3. La pipeline

```
1. profilo + carta visiva        →  profilo.json            ⟵ le cinque risposte
2. riscrivere il copione         →  blocchi.json
3. i prompt delle clip           →  prompts.json
4. generare le clip              →  N mp4 grezzi            ⟵ costa, ed è il grosso
5. guardare i provini            →  fogli a contatto
6. generare la voce              →  grezzo-A.mp3, -B.mp3    ⟵ costa
7. ritagliare i blocchi          →  N mp3 + le durate
8. lavorare le clip              →  N mp4 alla durata esatta
9. montare                       →  una chiamata, ≤50 scene
10. registro                     →  REGISTRO.md
```

I passi 3-5 e il passo 6 sono **indipendenti**: le clip si generano mentre la
voce si genera. Si ricongiungono al passo 8, che ha bisogno delle durate vere
dei blocchi.

Due passi costano soldi: il 4 e il 6. Con una differenza che cambia il modo di
lavorare: **la voce non si può rifare a pezzi, le clip sì.** Una traccia sbagliata
si rigenera tutta; una clip storta si rigenera da sola, per qualche centesimo.
Quindi la voce si genera a copione fermo e con tutte le cautele del caso; sulle
clip si può essere esigenti.

---

# 4. Passo per passo

## Passo 1 — Il profilo

Le cinque risposte del §1 in `profilo.json`, più la carta visiva. `aritmetica.py`
legge lì e stampa la scheda dei conti: quanti caratteri, quanti blocchi, quale
canvas, dove sta la base dei sottotitoli. Si guarda **prima** di scrivere il
copione, non dopo.

## Passo 2 — Riscrivere il copione

Lo script di partenza si legge, si tiene la struttura, e si riscrive fino alla
lunghezza calcolata al §2. Quello che si aggiunge è il **come**, mai il
riempitivo.

Ogni riga di `BLOCCHI` tiene insieme due cose: **quello che la voce dice** e
**quello che si vede mentre lo dice**. Stanno sulla stessa riga proprio perché si
possano leggere insieme — se l'inquadratura parla d'altro, si vede subito. Nel
master a slide erano due file separati, ed era un file di troppo.

Convenzioni del parlato, tutte e tre obbligatorie:

- **niente vocali accentate**: si scrivono con l'apostrofo (`perche'`, `e'`,
  `piu'`);
- **pochi tag di intenzione** (`[serious]`, `[warm]`, `[curious]`,
  `[thoughtful]`), uno ogni otto blocchi circa, alle svolte vere del discorso.
  Non uno per blocco;
- **niente `<break>`**: le pause si fanno tagliando, non chiedendole al modello.

Convenzioni dell'inquadratura:

- **si scrive in inglese**, anche quando il video è in italiano. I modelli video
  sono addestrati su didascalie inglesi, e in inglese il vocabolario di
  obiettivo, luce e movimento arriva preciso;
- **una cosa sola**. «X, poi Y» è due clip: il modello le fa tutte e due male e a
  metà cambia stacco per conto suo, proprio dove il parlato non lo segue.
  `costruisci.py` rifiuta le inquadrature che contengono «then», «cut to»,
  «after that»;
- **niente testo, niente grafici, niente loghi**: ce li mettiamo noi, e quello
  generato torna storpiato. Anche questo lo rifiuta `costruisci.py`.

`copione/costruisci.py` tiene l'elenco, verifica i vincoli e stampa
l'aritmetica. Finché non dice `OK, nessun errore`, non si va avanti.

> **Se serve allungare senza gonfiare.** Si aggiunge contenuto che c'è già
> altrove — un esempio, una fonte, una conseguenza — non si allungano le frasi.
> Un copione gonfiato si sente: la voce rallenta e il video si siede.

## Passo 3 — I prompt

`clip/prompt.py` monta tre pezzi, e due su tre sono identici in tutte le clip:

```
carta visiva  +  palette  +  formato   ⟵ uguale in tutti i prompt
inquadratura del blocco                ⟵ l'unico pezzo che cambia
la coda dei divieti                    ⟵ uguale in tutti i prompt
```

La palette entra col **nome** e con la **cifra**: il modello non legge un
esadecimale, ma legge «burnt orange»; la cifra sta lì perché il registro dica
esattamente quale palette era in uso.

La coda dei divieti non è una precauzione generica. Ogni voce è un errore già
pagato:

| divieto | perché |
|---|---|
| niente testo, didascalie, loghi, interfacce | torna storpiato, e sopra ci va comunque il nostro |
| niente volti riconoscibili in camera | è un problema di liberatoria, non di stile |
| niente parlato, dialogo, musica | l'audio generato parlerebbe sopra la voce |
| un'inquadratura sola, nessuno stacco | lo stacco interno cade a metà di una frase |
| quadro pieno, niente bande nere | il modello sceglie un aspetto suo e arrivano i bordi |

## Passo 4 — Generare le clip

**Il preventivo si chiede prima del lotto, sempre.** È il passo che costa di più
di tutto il video, e il prezzo dipende dal modello, dalla durata e dalla
risoluzione. Non si stima a memoria: si chiede al servizio (`get_cost` su
Higgsfield, `estimate_only` su ElevenLabs, `get_generation_cost` su Artlist) e si
riporta all'utente **prima** di spendere.

Il generatore si dichiara in `profilo.json`, sotto `generatore`, ed è l'unico
punto da cambiare per passarne a un altro:

| servizio | chiamata | note |
|---|---|---|
| Higgsfield | `generate_video_batch` | fino a 12 richieste per volta: è il più comodo su quaranta clip |
| ElevenLabs | `creative_generate_video` | stesso flow della voce, una integrazione sola da tenere |
| Artlist | `generate_video` + style kit | il kit tiene la palette da sé, ma va a una clip per volta |

Tre regole che valgono con tutti e tre:

- **il modello non si cambia a metà video.** Due modelli diversi sono due film
  diversi, e si vede allo stacco più di quanto si creda;
- **la durata base si dichiara una volta** (8 secondi è un buon compromesso: il
  passo tipico è 9, e il resto lo mette `lavora.py`);
- **le clip si scaricano in `clip/grezze/{id}.mp4`**, con il nome del blocco. Il
  nome è l'unico legame fra la clip e quello che la voce dice sopra: una clip
  salvata con il nome sbagliato è un errore che nessun controllo prende.

## Passo 5 — Guardare i provini

`clip/provino.py` fa i fogli a contatto: tre fotogrammi per clip — inizio, metà,
fine — sei clip per foglio, con il nome accanto.

Tre fotogrammi e non uno perché una clip si giudica sul movimento: **il primo
fotogramma di una clip sbagliata è quasi sempre bello.**

È un passo obbligatorio, ed è quello che nessun controllo automatico può fare al
posto mio. Si cerca:

- testo inventato dentro l'immagine (capita anche con il divieto nel prompt);
- volti che guardano in camera;
- stacchi interni: la clip che a metà cambia scena da sola;
- **la clip che stona con le vicine**. È il difetto che conta di più e l'unico
  che si vede solo mettendole in fila.

Quello che non va si rigenera, una clip per volta: `python3 clip/prompt.py s12`
rifà solo quel prompt. Una clip rigenerata però **non torna uguale**: si riguarda
insieme alle due vicine, non da sola.

## Passo 6 — Generare la voce, in due tracce

Una traccia continua per metà video, **non una per blocco**: le tracce separate
non hanno lo stesso timbro fra loro e si sente. Lo stacco fra le due va su un
cambio di capitolo, dove il cambio di tono è voluto, e si dichiara **una volta
sola**, nella costante `STACCO` di `tagli.py`.

```
chunkA.txt   blocchi fino allo stacco     < 5.000 caratteri
chunkB.txt   blocchi dopo lo stacco       < 5.000 caratteri
```

Sotto i 5.000 caratteri in tutto — cioè sotto i cinque minuti circa — la traccia
è **una sola**: `STACCO` va sull'ultimo blocco e il gruppo B resta vuoto.
`tagli.py` salta da sé le tracce vuote.

> **La voce si genera quando il copione è fermo, mai prima.** Una volta ho
> generato la traccia A e poi rivisto i blocchi: la revisione ha invalidato la
> traccia, e rigenerarla è costato $0,75 buttati. Non c'è modo di correggere
> mezza traccia — o è quella giusta, o si rifà tutta.

> **Dopo ogni ri-spezzettatura automatica, i chunk si rileggono contro lo
> script.** Un giro di ri-spezzettatura ha fatto sparire in silenzio due
> passaggi interi. Nessun controllo li avrebbe presi: il conto dei caratteri
> tornava, i vincoli pure. Il controllo automatico verifica la forma; **non sa
> che cosa doveva esserci**.

## Passo 7 — Ritagliare i blocchi dalla traccia

È il passaggio che decide tutto, ed è identico a quello del master a slide: un
confine sbagliato si vede e si sente.

```
tagli.py allinea    sceglie i confini, prepara prova.mp3
tagli.py correggi   sposta i confini indicati in correzioni.json
tagli.py applica    scrive gli mp3 + le pose
```

### Le pause si cercano sul grezzo, non sulla traccia lavorata

È l'errore che costa di più, ed è nascosto. Il filtro di ritmo
(`silenceremove` con `stop_silence=0.14`) pareggia **tutte** le pause a 0,14 s:
dopo il filtro la lunghezza della pausa — che è il segnale su cui si basa tutta
la scelta — **non esiste più**. Confini sul grezzo, ritmo applicato dopo, blocco
per blocco.

### Come si scelgono i confini

Allineamento **DTW fra punteggiatura e spezzoni di parlato**. La voce mette le
pause dove il testo ha la punteggiatura: si spezza il copione a `. : ; ,`, si
spezza l'audio negli spezzoni fra un silenzio e l'altro, e si allineano le due
sequenze con una programmazione dinamica monotona.

Misurato sulla stessa traccia: la strada ingenua (assegnare ogni confine alla
pausa più lunga lì intorno) sbagliava **17 blocchi su 48**; il DTW **2 su 48**.

### La soglia di pausa non si sceglie al primo tentativo che funziona

Provare le soglie in ordine e fermarsi alla prima che «ha abbastanza spezzoni»
guarda la quantità e non l'esito. Su una lezione la soglia di 0,18 s ha mancato
per un centesimo una pausa vera, e i due blocchi attorno sono usciti uno di 19
secondi e uno di 8. **Si provano tutte le soglie e si tiene quella che lascia
meno blocchi fuori fascia** (8,5–21 car/s).

### `correzioni.json` non è un registro

`tagli.py correggi` **modifica lo stato sul posto**. Rilanciarlo con una
correzione già applicata la applica **una seconda volta**. Quando serve una
seconda correzione sulla stessa traccia si rifà `allinea` da zero (non costa
niente: è solo ffmpeg) e si mettono **tutte** le correzioni insieme.

### La verifica non è opzionale

Da sola, la scelta automatica sbaglia. Due controlli, e fanno cose diverse:

| | `prova.mp3` (1,6 s prima di ogni taglio) | traccia intera |
|---|---|---|
| buchi nel parlato | solo intorno ai tagli | **su tutto il testo** |
| posizione dei tagli | **sì**, è il suo scopo | no: la trascrizione non porta i tempi |
| costo su ~9 minuti | ~$0,17 | ~$0,60 |

Quando si può, si fanno tutte e due. Quando se ne può fare una sola, quella
sulla traccia intera prende l'errore più caro — la voce che salta parole — e i
confini restano affidati all'allineamento e al controllo statistico offline
(`verifica-locale.py`).

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
`verifica-testo.py`. I **numeri pronunciati per esteso** sono la resa che ricorre
di più: la regola dichiarata è un convertitore dei cardinali italiani in cifre
applicato ai **due** testi. Su una lezione ha portato gli scarti segnalati da 16
a 2.

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

Per un confine sospetto vale lo stesso: `verifica-locale.py` segnala le coppie
adiacenti di segno opposto — un blocco più corto del previsto accanto a uno più
lungo — ma il modello pesa male le cifre, e due blocchi fitti di numeri possono
dare la stessa firma **senza** che ci sia niente di storto. Il modo di decidere
non è ragionare sul modello: è **fare il conto sull'audio grezzo**. Si prende lo
spezzone di parlato fra le due pause candidate e lo si divide per i caratteri
della frase che dovrebbe contenere.

> **Quando il controllo statistico diventa cieco.** La soglia di allarme è
> **1,5 volte la dispersione della traccia**. Su un testo pieno di date il
> modello sbanda su ogni blocco, la dispersione raddoppia e con essa la soglia.
> Il controllo non è rotto: è **cieco in proporzione**. Su una traccia così si
> legge la tabella dei blocchi a mano.

## Passo 8 — Lavorare le clip

`clip/lavora.py` fa quattro cose, in quest'ordine, e nessuna è rimandabile al
montaggio.

**1. Inquadratura.** Si porta la clip al canvas del formato (`scale` che ingrandisce
fino a coprire, poi `crop`), a 25 fps, **senza audio**. L'audio va tolto qui e
non solo al montaggio: molti modelli generano una traccia sonora per conto loro,
e due voci sovrapposte sono un render buttato.

**2. Durata.** Si porta **esattamente** a quella del blocco. Tre strade, scelte dal
rapporto fra le due durate, e la scelta finisce nel registro:

| rapporto | strada | perché |
|---|---|---|
| la clip è più lunga | **taglio** | si tiene l'inizio, che è la parte che il modello fa meglio |
| fino a 1,25× | **rallenta** | un rallentamento del 25% su un'inquadratura lenta è invisibile, e non ha giunte |
| oltre | **palindromo** | avanti e indietro: la giunta è invisibile perché il fotogramma di svolta è lo stesso |

Il palindromo è il motivo per cui le inquadrature dei blocchi lunghi vogliono un
**movimento reversibile**: una carrellata lenta, la luce che cambia, il fumo. Una
persona che cammina, all'indietro, cammina all'indietro.

**3. Marchio**, in sovrimpressione dove dice il profilo.

**4. Sottotitoli**, impressi con il filtro `ass`. Il testo si spezza in righe da
42 caratteri (24 in verticale) e i tempi si dividono in proporzione ai caratteri,
con un minimo di un secondo per riga: le righe troppo brevi **prendono tempo in
prestito dalla vicina**, non si fondono con lei. Fondere due righe per farle
durare di più vuol dire perderne un pezzo, ed è successo.

La stessa funzione che imprime i sottotitoli scrive l'SRT. Una sola, perché le
due cose devono dire esattamente la stessa cosa negli stessi istanti: se
divergono, il file SRT smentisce il video.

Poi si riguardano i provini, questa volta delle **finite**: `clip/provino.py
finite`. Si cerca una cosa sola che prima non c'era — il sottotitolo che copre
qualcosa che serviva vedere.

## Passo 9 — Caricare e montare

```
N clip mp4  +  N mp3 di blocco  +  2 PNG (copertina e chiusura)
```

Il lotto di caricamento tiene **fino a 100 file**: per un video da 48 blocchi ce
ne stanno 98 in uno.

> **Non provare a dimezzare montando l'audio dentro le clip.** L'ho fatto: costa
> un giro di caricamenti e un render buttato, perché il servizio di montaggio
> vuole l'audio come asset separato per far durare la scena quanto la voce.

> **Il contatore del lotto è in ritardo.** Il lotto dice `completed` mentre gli
> item sono ancora `processing`. Si aspetta che il **conteggio** arrivi al
> totale, non che lo stato dica «fatto».

Poi una sola chiamata a `create_video_from_studio`, con il payload che scrive
`monta-heygen.py`.

> **La regola che costa un render se la si sbaglia.** Le scene video **devono**
> portare `audio_asset_id` e `playback: {mode: "fit_to_scene", mute: true}`.
>
> - senza `audio_asset_id` la scena dura quanto la clip;
> - **`playback` omesso vale `freeze`**, che è il difetto peggiore di tutti con
>   le clip vere: la clip parte, finisce, e resta congelata sull'ultimo
>   fotogramma per tutto il resto del blocco. Sembra un video rotto, e nessun
>   controllo locale lo prende perché in locale la clip dura giusta;
> - senza `mute: true` si sente l'audio che il modello ha generato per conto suo.
>
> Le clip escono già della durata esatta, quindi `fit_to_scene` non cambia
> velocità: è la rete di sicurezza per gli scarti di qualche fotogramma.
>
> Le scene immagine prendono invece un `duration` esplicito.

### Caricare e aspettare

**Un render da nove minuti e cinquanta scene prende dai tre ai quattro minuti**
(misurati: 179 s e 211 s). È il metro per non scambiare l'attesa normale per un
blocco.

> Una volta l'ho scambiata. Avevo lanciato `sleep` in background e interrogato
> lo stato nella stessa risposta: sette minuti veri sembravano centocinque, ho
> concluso che il render fosse fermo e ne ho lanciato un duplicato. Per
> aspettare davvero: `start=$(date +%s); until [ $(( $(date +%s) - start )) -ge N ]; do sleep 5; done`.

`monta-locale.py` intanto fa la copia di controllo con ffmpeg: si guarda quella
mentre il servizio lavora, e se c'è qualcosa da rifare si scopre lì.

## Passo 10 — Registro

Un `REGISTRO.md` per video, con: la scheda delle cinque risposte, la carta
visiva per intero, l'aritmetica, **quanto è costato** (clip generate, clip
rigenerate e perché, voce, trascrizione), l'esito delle verifiche, che cosa è
andato storto e come si è deciso, e una sezione finale **«Da verificare — quello
che non ho potuto giudicare io»**. In quella sezione va anche quello che è
costato soldi per niente.

---

# 5. Il vocabolario delle inquadrature

Un video in cui ogni clip è un'immagine bella e generica non è un video: è uno
sfondo. Le inquadrature sono un **vocabolario chiuso** — sei famiglie — non un
soggetto diverso inventato per ogni blocco.

| Famiglia | Che cosa mostra | Quando |
|---|---|---|
| **gesto** | mani che fanno una cosa, in primo piano | il blocco descrive un'azione |
| **oggetto** | un dettaglio fermo, quasi macro | il blocco nomina una cosa |
| **luogo** | campo largo, la scena intera | il blocco situa, apre o chiude un capitolo |
| **passaggio** | una carrellata lenta, senza soggetto | il respiro fra due concetti |
| **figura** | una persona di spalle o di tre quarti | il blocco parla di qualcuno |
| **materia** | tessitura, luce che cambia, fumo, acqua | il blocco è astratto e non ha referente |

Quattro regole che ne discendono, e tutte e quattro sono state pagate:

**La clip mostra il referente concreto, mai l'illustrazione della parola
astratta.** «Responsabilità» non si filma. Si filma la firma sul registro. Una
clip che illustra il concetto invece della cosa esce sempre uguale a se stessa —
mani che si stringono, ingranaggi, grafici che salgono — ed è il modo più veloce
per fare un video che sembra fatto da chiunque.

**Una clip su tre è un respiro.** Un `passaggio` o una `materia`, senza azione.
Un video in cui ogni inquadratura racconta qualcosa stanca quanto uno in cui non
racconta niente.

**Due clip adiacenti non hanno la stessa scala.** Due primi piani di fila si
leggono come un errore di montaggio, non come una scelta. Il `gesto` si alterna
con il `luogo`, l'`oggetto` con la `figura`.

**Il movimento non cambia dentro il blocco.** Un solo movimento per
inquadratura, e lento: è anche quello che rende possibile il palindromo del
passo 8.

---

# 6. I controlli prima di consegnare

`controlli.py` li fa tutti in una volta. Nove:

- [ ] verifica per trascrizione: **nessun buco nel parlato**
- [ ] tutti i blocchi nella fascia **8,5–21 car/s**
- [ ] **tutte le clip** lavorate, e **guardate** nei provini
- [ ] ogni clip dura **quanto il suo blocco** (±40 ms)
- [ ] scene totali **≤ 50**
- [ ] **durata** ≥ quella chiesta
- [ ] **formato** e fotogrammi giusti
- [ ] **sottotitoli** SRT, nessuna riga oltre 48 caratteri
- [ ] **registro** con la sezione «da verificare»

Un 8/9 si consegna solo dicendo quale controllo non è passato e perché.

---

# 7. Le trappole, tutte in una pagina

Il listino degli errori già pagati. Chi riparte da qui non deve ripagarli. In
alto le nuove, che vengono dalle clip; sotto quelle ereditate dal master a slide.

| Dove | Che cosa succede | Come si evita |
|---|---|---|
| clip | il marchio con `movie=...:loop=0` non finisce mai: il giro macina fotogrammi dopo la fine della clip, senza errori e senza fine (misurato: 90 s e ancora in corso su una clip da 6 s, contro 3,5 s) | un fotogramma solo, e `overlay=...:eof_action=repeat` |
| clip | `Unknown filter 'drawtext'` | nel build di `imageio_ffmpeg` non c'è: si usa il filtro `ass` |
| clip | il taglio a durata esatta con `-c copy` esce 120 ms più lungo | si taglia nel passo che ricodifica comunque, mai in copia |
| clip | rallentando, la durata cade fra due fotogrammi | `setpts` **prima**, `fps=25` **dopo** |
| clip | la clip generata porta un audio suo | `-an` in lavorazione **e** `mute: true` al montaggio |
| clip | il modello scrive testo dentro l'immagine | divieto nel prompt, e comunque si guarda nei provini |
| clip | la clip cambia scena a metà | «una cosa sola» nell'inquadratura; `costruisci.py` rifiuta «then», «cut to» |
| clip | una clip rigenerata non somiglia più alle vicine | si riguarda insieme alle due vicine, mai da sola |
| clip | quaranta clip che non sembrano lo stesso film | carta visiva identica in ogni prompt, modello mai cambiato a metà |
| montaggio | la scena si congela sull'ultimo fotogramma | `playback` omesso vale `freeze`: va messo `fit_to_scene` |
| montaggio | il video esce corto | `audio_asset_id` su ogni scena video |
| voce | rigenerata perché il copione è cambiato dopo | la voce si genera **a copione fermo** |
| copione | una ri-spezzettatura automatica mangia due passaggi | rileggere i chunk contro lo script |
| tagli | le pause sparite dopo il filtro di ritmo | confini sul **grezzo** |
| tagli | soglia scelta «al primo tentativo che funziona» | provarle tutte, votare sull'esito |
| tagli | `correzioni.json` applicato due volte | rifare `allinea`, poi tutte le correzioni insieme |
| verifica | la trascrizione ripete il copione | trascrivere da un **asset audio**, non dal nodo che ha generato |
| verifica | il caricamento rifiuta la traccia grezza | togliere il tag ID3 (`-map_metadata -1 -c:a copy`) |
| verifica | il controllo statistico non segnala niente su un testo di date | è cieco in proporzione: leggere la tabella a mano |
| montaggio | render dato per bloccato e rilanciato | tre-quattro minuti sono **normali**; attendere con `until` |
| montaggio | il lotto dice «completed» ma gli item no | aspettare il **conteggio**, non lo stato |

---

# 8. Costi

Due voci, e una sola è misurata.

```
voce (due tracce, ~8.700 caratteri, eleven_v3)   ~$1,45
trascrizione delle due tracce intere             ~$0,60
clip generate                                     da chiedere al servizio
```

**Il costo delle clip non si stima a memoria**, e non è scritto qui apposta:
dipende dal modello, dalla durata e dalla risoluzione, e cambia nel tempo. Si
chiede al servizio prima del lotto e si riporta all'utente prima di spendere. È
quasi sempre la voce più cara del video, molte volte la voce parlata.

Il render del montaggio e i caricamenti non si pagano a consumo.

---

# 9. Come ripartire in una chat nuova

1. Crea la cartella del progetto e scrivi i file del §11 così come sono.
2. `pip install imageio-ffmpeg`. Nient'altro.
3. Metti il marchio in `clip/marchio/logo.png`.
4. **Fai le cinque domande del §1** e scrivi `profilo.json`.
5. Scrivi la carta visiva e falla approvare prima di generare qualsiasi clip.
6. `python3 aritmetica.py`, poi il copione, poi la pipeline del §3.

Dal secondo video in poi `nuovo-video.sh` copia dall'**ultimo fatto** tutto
quello che non cambia, non dal primo — così gli strumenti migliorano video dopo
video e nessuno resta indietro. Le cinque risposte, invece, si richiedono
comunque: sono le uniche cose che non si ereditano.

---

# 10. Il profilo compilato

L'esempio che accompagna il codice — un video da nove minuti, 16:9, su un
laboratorio di falegnameria. Serve a vedere come si compilano le cinque risposte
e la carta visiva; `copione/costruisci.py` ne riporta tre blocchi come campione,
non un copione intero.

## `profilo.json`

```json
{
  "titolo": "esempio — da riscrivere a ogni video",
  "tema": "il mestiere dell'artigiano del legno, in un laboratorio di citta'",
  "carta_visiva": "35mm documentary film, visible grain. Natural side light from a high window, soft shadows, no artificial key light. 35mm lens, barely perceptible handheld movement, shallow depth of field. Hands, tools, material: people are seen from the shoulders down or in three-quarter profile, never full face. Muted colours, warm wood against cold metal. One single movement per shot, slow.",
  "palette": {
    "fondo": "#F4F1EA",
    "testo": "#1C1A16",
    "accento": "#A6471E",
    "secondario": "#2E4A3F"
  },
  "voce": {
    "nome": "da scegliere con creative_list_voices",
    "voice_id": "",
    "modello": "eleven_v3"
  },
  "lingua": "it",
  "durata_richiesta_s": 540,
  "formato": "16:9",
  "marchio": {
    "file": "clip/marchio/logo.png",
    "posizione": "alto-sinistra",
    "altezza_px": 70
  },
  "generatore": {
    "servizio": "higgsfield",
    "modello": "seedance_2_5",
    "durata_base_s": 8,
    "aspetto": "16:9"
  },
  "pausa_musicale": false,
  "note_carta_visiva": "In inglese: e' il preambolo che finisce in ogni prompt. Il campo tema resta in italiano perche' e' la risposta dell'utente, non un prompt.",
  "carattere": {
    "nome": "DejaVu Sans",
    "nota": "un nome che fontconfig sappia risolvere; per un carattere proprio, metterlo in clip/font/ e installarlo"
  },
  "cartelli": {
    "copertina": {
      "sopra": "LABORATORIO",
      "titolo": "Il gesto ripetuto",
      "sotto": "un mestiere in tre minuti"
    },
    "chiusura": {
      "titolo": "Domani si ricomincia\ndallo stesso gesto",
      "sotto": "grazie per l'ascolto"
    }
  }
}
```


---

# 11. Il codice

Tutti i file, nell'ordine in cui servono. Sono quelli veri, non una versione
semplificata: i commenti dentro spiegano le decisioni che il testo qui sopra
riassume.

| file | a che cosa serve |
|---|---|
| `nuovo-video.sh` | impianta un video nuovo dall'ultimo fatto |
| `aritmetica.py` | i conti del §2, in un posto solo |
| `copione/costruisci.py` | il copione: parlato e inquadrature |
| `clip/prompt.py` | i prompt delle clip |
| `clip/provino.py` | i fogli a contatto |
| `clip/sottotitoli.py` | il testo spezzato in righe, con i tempi |
| `clip/lavora.py` | durata esatta, marchio, sottotitoli |
| `clip/cartelli.py` | copertina e chiusura |
| `audio/tagli.py` | pause, allineamento DTW, ritaglio dei blocchi |
| `audio/verifica-testo.py` | trascrizione contro copione |
| `audio/verifica.py` | dove cade ogni confine |
| `verifica-locale.py` | il controllo statistico sui confini |
| `monta-scene.py` | una scena per blocco |
| `monta-heygen.py` | il payload delle scene |
| `monta-locale.py` | la copia di controllo e l'SRT |
| `controlli.py` | i nove controlli finali |
| `REGISTRO-modello.md` | la traccia del registro |

Si copiano tutti come sono, una volta sola. `profilo.json` e
`copione/costruisci.py` sono gli unici due che si riscrivono a ogni video.

## `nuovo-video.sh`

```bash
#!/usr/bin/env bash
# Prepara la cartella di un video nuovo copiando dall'ultimo fatto tutto quello
# che non cambia: gli strumenti e il marchio. Restano da fare due cose sole, che
# il messaggio finale elenca: rispondere alle cinque domande nel profilo, e
# scrivere il copione.
set -euo pipefail

[ $# -eq 1 ] || { echo "uso: ./nuovo-video.sh nome-del-video"; exit 1; }
NUOVO="progetti/$1"
# Si copia dall'ultimo fatto, non sempre dal primo: gli strumenti migliorano
# video dopo video, e il primo resterebbe indietro.
DA=$(ls -dt progetti/*/ 2>/dev/null | head -1 || true); DA=${DA%/}
[ -n "$DA" ] || DA="modello"
[ -e "$NUOVO" ] && { echo "$NUOVO esiste gia'"; exit 1; }

mkdir -p "$NUOVO"/{origine,copione,audio/trascrizioni,clip/{marchio,grezze},scene}
cp "$DA"/aritmetica.py "$DA"/verifica-locale.py "$DA"/controlli.py "$NUOVO"/
cp "$DA"/monta-scene.py "$DA"/monta-heygen.py "$DA"/monta-locale.py "$NUOVO"/
cp "$DA"/audio/tagli.py "$DA"/audio/verifica.py "$DA"/audio/verifica-testo.py "$NUOVO"/audio/
cp "$DA"/clip/{prompt.py,sottotitoli.py,lavora.py,provino.py,cartelli.py} "$NUOVO"/clip/
cp "$DA"/profilo.json "$NUOVO"/profilo.json
cp -r "$DA"/clip/marchio/. "$NUOVO"/clip/marchio/ 2>/dev/null || true

cat <<TESTO

$NUOVO pronta (copiata da $DA). Da fare, due cose:

  profilo.json             le cinque risposte: tema, palette, voce, durata, formato
  copione/costruisci.py    i blocchi: parlato e inquadratura sulla stessa riga

Poi, nell'ordine:

  python3 aritmetica.py                  la scheda dei conti: quanti caratteri, quanti blocchi
  python3 copione/costruisci.py          scrive blocchi.json e verifica i vincoli
  python3 clip/prompt.py                 scrive i prompt delle clip
  → generare le clip (preventivo del costo PRIMA), scaricarle in clip/grezze/
  python3 clip/provino.py                i fogli a contatto — GUARDARLI
  → generare le due tracce di voce, salvarle in audio/grezzo-A.mp3 e -B.mp3
  python3 audio/tagli.py allinea         sceglie i confini, prepara prova.mp3
  → trascrivere da ASSET AUDIO, non dal nodo che ha generato la voce;
    salvare i testi in audio/trascrizioni/A.txt e B.txt
  python3 audio/verifica-testo.py        deve dire "la voce ha detto tutto"
  python3 verifica-locale.py             nessuna coppia adiacente di segno opposto
  python3 audio/tagli.py applica         scrive gli mp3 dei blocchi
  python3 clip/lavora.py                 clip alla durata esatta, marchio, sottotitoli
  python3 clip/provino.py finite         riguardare: i sottotitoli coprono qualcosa?
  python3 clip/cartelli.py               copertina e chiusura
  python3 monta-scene.py                 clip + audio, una scena per blocco
  python3 monta-locale.py                la copia di controllo e l'SRT
  → caricare gli asset, compilare clip/asset-id.json
  python3 monta-heygen.py                il payload delle scene
  python3 controlli.py                   i controlli del MASTER §6

Lo stacco fra le due tracce di voce sta in audio/tagli.py, costante STACCO.

TESTO
```

## `aritmetica.py`

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""L'aritmetica del MASTER §2, in un posto solo.

Tutto discende da due risposte dell'utente: la durata e il formato. Qui si
calcolano i numeri che ne derivano - quanti caratteri scrivere, quanti blocchi,
quanto dura la copertina, quanto e' alta la fascia dei sottotitoli - e li
leggono tutti gli altri strumenti. Tenerne una seconda copia altrove vuol dire
che prima o poi le due divergono in silenzio, ed e' il tipo di errore che si
scopre a montaggio fatto.

    python3 aritmetica.py      stampa la scheda dei conti
"""
import json
from pathlib import Path

QUI = Path(__file__).resolve().parent

# Misurata, non stimata: e' la velocita' della traccia DOPO il filtro di ritmo.
# Su otto lavorazioni il reale e' andato da 15,8 a 17,6 car/s, e lo scarto
# dipende dalla densita' di cifre, non dal caso.
CPS = 17.0

# Il tetto duro del servizio di montaggio: 50 scene per video, copertina e
# chiusura comprese.
TETTO_SCENE = 50

# La durata di una singola inquadratura. Sotto i 4 s la clip non fa in tempo a
# leggersi; sopra i 14 s una sola immagine in movimento stanca, qualunque cosa
# stia dicendo la voce. Nove secondi e' il passo che regge senza annoiare.
SPALLA_MIN, SPALLA_TIPO, SPALLA_MAX = 4.0, 9.0, 14.0

CANVAS = {"16:9": (1920, 1080), "9:16": (1080, 1920), "1:1": (1080, 1080),
          "4:5": (1080, 1350), "5:4": (1350, 1080)}

def profilo(dove=None):
    return json.loads((Path(dove) if dove else QUI/"profilo.json").read_text(encoding="utf-8"))

def cartelli(durata):
    """Copertina e chiusura in proporzione al video.

    Dieci secondi di chiusura su un video da nove minuti sono un titolo di coda;
    su una clip da quaranta secondi sono un quarto del video."""
    if durata <= 90:   return 1.5, 3.0
    if durata <= 300:  return 2.0, 6.0
    return 3.0, 10.0

def CONTI(p=None):
    p = p or profilo()
    durata = float(p["durata_richiesta_s"])
    cop, chi = cartelli(durata)
    parlato = durata - cop - chi
    if parlato <= 0:
        raise SystemExit(f"durata {durata} s: non ci sta nemmeno la copertina")

    caratteri = parlato * CPS
    # Il numero di blocchi e' il numero di inquadrature: si sceglie dal passo
    # tipico e si taglia sul tetto delle scene, non viceversa.
    n = max(1, min(TETTO_SCENE - 2, round(parlato / SPALLA_TIPO)))
    spalla = parlato / n

    avvisi = []
    if spalla > SPALLA_MAX:
        avvisi.append(
            f"{spalla:.1f} s per blocco: oltre i {SPALLA_MAX:.0f} s di tetto. "
            f"Un video cosi' non sta in un render solo — va diviso in parti da "
            f"{(TETTO_SCENE-2)*SPALLA_MAX/60:.0f} minuti di parlato al massimo "
            f"e concatenato in locale (§4, passo 8).")
    if spalla < SPALLA_MIN:
        avvisi.append(f"{spalla:.1f} s per blocco: sotto i {SPALLA_MIN:.0f} s. "
                      f"Meno blocchi e inquadrature piu' lunghe.")

    w, h = CANVAS[p["formato"]]
    # La fascia bassa dove vanno i sottotitoli. In verticale sta piu' in alto:
    # sotto ci passa l'interfaccia della piattaforma, che ne mangia un pezzo.
    margine = 0.18 if h > w else 0.09
    return {
        "durata": durata, "copertina": cop, "chiusura": chi, "parlato": parlato,
        "caratteri": round(caratteri), "blocchi": n, "scene": n + 2,
        "spalla": round(spalla, 2),
        "car_per_blocco": round(caratteri / n),
        "tetto_blocco": round(SPALLA_MAX * CPS),
        "pavimento_blocco": round(SPALLA_MIN * CPS),
        "larghezza": w, "altezza": h, "formato": p["formato"],
        "base_sottotitoli": round(h * margine),
        "avvisi": avvisi,
    }

if __name__ == "__main__":
    p = profilo(); c = CONTI(p)
    print(f'{p["titolo"]}\n')
    print(f'  formato          {c["formato"]}  ·  {c["larghezza"]}x{c["altezza"]}')
    print(f'  durata chiesta   {int(c["durata"]//60)}:{c["durata"]%60:04.1f}')
    print(f'  copertina        {c["copertina"]} s      chiusura {c["chiusura"]} s')
    print(f'  parlato          {c["parlato"]:.1f} s')
    print(f'  caratteri        {c["caratteri"]}  (a {CPS} car/s)')
    print(f'  blocchi          {c["blocchi"]}   scene {c["scene"]}/{TETTO_SCENE}')
    print(f'  passo            {c["spalla"]} s per inquadratura')
    print(f'  per blocco       {c["car_per_blocco"]} car  '
          f'(fra {c["pavimento_blocco"]} e {c["tetto_blocco"]})')
    print(f'  sottotitoli      base a {c["base_sottotitoli"]} px dal fondo')
    for a in c["avvisi"]: print(f'\n  ATTENZIONE: {a}')
```

## `copione/costruisci.py`

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER.

E' l'unico file che si riscrive per ogni video. Ogni riga di BLOCCHI tiene
insieme le due cose che devono restare coerenti: quello che la voce dice e
quello che si vede mentre lo dice. Tenerle in due file separati vuol dire
scoprire a render fatto che l'inquadratura parla d'altro.

  (capitolo, inquadratura, posa in secondi, testo parlato)

L'inquadratura si scrive in inglese anche quando il video e' in italiano: i
modelli video sono addestrati su didascalie inglesi, e in inglese il vocabolario
di obiettivo, luce e movimento arriva preciso. Il parlato resta nella lingua del
video. Le due cose stanno sulla stessa riga proprio perche' si possano leggere
insieme: se l'inquadratura parla d'altro, si vede subito.
"""
import json, re, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
from aritmetica import CONTI, CPS, TETTO_SCENE, profilo

# ---------------------------------------------------------------- il copione
CAPITOLI = {
 1: "Apertura",
 2: "Il gesto",
 3: "Chiusura",
}

BLOCCHI = [
 (1, "hands rolling up the shutter of a small workshop, morning light cutting "
     "sideways across a workbench covered in wood shavings, slow push in",
     0, "[warm] Ci sono mestieri che non si imparano guardando. Si imparano sbagliando, e poi rifacendo lo stesso gesto per anni."),
 (2, "close on a hand plane travelling along an oak board, the shaving curls up "
     "and falls out of focus, camera locked off",
     0, "La pialla toglie un decimo di millimetro alla volta. Non e' lentezza: e' l'unico modo per accorgersi dell'errore prima che diventi definitivo."),
 (3, "the empty workshop at the end of the day, light has moved onto the wall of "
     "hand tools hanging in order, very slow drift left",
     1.2, "[thoughtful] Alla fine della giornata il banco si pulisce. Domani si ricomincia dallo stesso gesto."),
]

# ------------------------------------------------------------------ controlli
ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
# Segnali che un'inquadratura sta chiedendo due cose invece di una. Una clip
# generata con due azioni dentro le fa tutte e due male, e a meta' cambia
# stacco per conto suo: la coerenza col parlato si perde proprio li'.
DUE_COSE = (" then ", " after that", " cut to ", " next ", " followed by ",
            " poi ", " infine ", " si passa a ", " stacco ")
# Il testo a video lo mettiamo noi in fase di lavorazione. Chiesto al modello
# torna storpiato, in una lingua inventata, e non si puo' correggere.
VIETATI = ("text", "caption", "subtitle", "title card", "lettering", "writing",
           "logo", "watermark", "chart", "graph", "slide", "infographic",
           "scritta", "didascalia", "sottotitol", "cartello")

p = profilo()
c = CONTI(p)

blocchi = []
for i, (cap, inq, posa, txt) in enumerate(BLOCCHI, start=2):
    blocchi.append({"id": f"s{i:02d}", "capitolo": cap, "inquadratura": inq.strip(),
                    "posa": posa, "text": txt})

errori, avvisi = [], list(c["avvisi"])
tot = sum(len(b["text"]) for b in blocchi)
nscene = len(blocchi) + 2
if nscene > TETTO_SCENE:
    errori.append(f"scene {nscene} > {TETTO_SCENE}")

for b in blocchi:
    acc = sorted({x for x in b["text"] if x in ACCENTATE})
    if acc:
        errori.append(f'{b["id"]}: vocale accentata -> ' + "".join(acc))
    if len(b["text"]) > c["tetto_blocco"]:
        errori.append(f'{b["id"]}: {len(b["text"])} car, oltre il tetto di {c["tetto_blocco"]}')
    if len(b["text"]) < c["pavimento_blocco"]:
        avvisi.append(f'{b["id"]}: {len(b["text"])} car, sotto il pavimento di '
                      f'{c["pavimento_blocco"]} — l\'inquadratura non fa in tempo a leggersi')
    if not b["inquadratura"]:
        errori.append(f'{b["id"]}: inquadratura mancante')
    bassa = b["inquadratura"].lower()
    for s in DUE_COSE:
        if s in bassa:
            errori.append(f'{b["id"]}: l\'inquadratura chiede due cose ("{s.strip()}") — una per blocco')
    for v in VIETATI:
        if v in bassa:
            errori.append(f'{b["id"]}: l\'inquadratura chiede «{v}» — il testo a video lo mette clip/lavora.py')

tags = sum(len(re.findall(r"\[[a-z]+\]", b["text"])) for b in blocchi)
tetto_tag = max(3, round(len(blocchi) / 8))
if tags > tetto_tag:
    errori.append(f"tag di intenzione: {tags} > {tetto_tag}")

scarto = len(blocchi) - c["blocchi"]
if abs(scarto) > 2:
    avvisi.append(f'{len(blocchi)} blocchi contro i {c["blocchi"]} dell\'aritmetica '
                  f'({scarto:+d}): le inquadrature escono '
                  f'{"corte" if scarto > 0 else "lunghe"}')

pose = sum(b["posa"] for b in blocchi)
parlato = tot/CPS + pose
durata = parlato + c["copertina"] + c["chiusura"]
atteso = c["durata"]

print(f'{p["titolo"]}   ·   {c["formato"]}   ·   {p["generatore"]["servizio"]}/'
      f'{p["generatore"]["modello"]}\n')
print(f'blocchi   {len(blocchi)}        scene {nscene}/{TETTO_SCENE}')
print(f'caratteri {tot}      media {tot/len(blocchi):.0f} car/blocco  '
      f'(previsti {c["car_per_blocco"]})')
print(f'parlato   {parlato:.0f} s     montato {int(durata//60)}:{durata%60:04.1f}   '
      f'(chiesti {int(atteso//60)}:{atteso%60:04.1f}, stima a {CPS} car/s)')
print(f'tag       {tags}/{tetto_tag}      pose {sum(1 for b in blocchi if b["posa"])}')
print()
cur = None
for b in blocchi:
    if b["capitolo"] != cur:
        cur = b["capitolo"]; print(f'  cap {cur:2d}  {CAPITOLI[cur]}')
    ps = f'  +{b["posa"]}s' if b["posa"] else ""
    print(f'    {b["id"]}  {len(b["text"]):3d} car{ps}  {b["text"][:52]}...')
    print(f'          ↳ {b["inquadratura"][:86]}')

# Lo stacco fra le due tracce di voce cade su un cambio di capitolo, dove il
# cambio di tono e' voluto. Sotto i 5.000 caratteri la traccia e' una sola.
if tot < 4800:
    print(f'\ntraccia unica: {tot} car sotto il limite di 5.000 — '
          f'STACCO va sull\'ultimo blocco ({blocchi[-1]["id"]}), il gruppo B resta vuoto')
else:
    acc = 0; stacco = None; a = 0
    for i, b in enumerate(blocchi):
        acc += len(b["text"]) + 1
        if acc > tot/2 and stacco is None and i+1 < len(blocchi) \
           and b["capitolo"] != blocchi[i+1]["capitolo"]:
            stacco = b["id"]; a = acc
    print(f'\nstacco tracce dopo {stacco}:  chunkA {a} car  ·  chunkB {tot-a} car   (limite 5000)')

if avvisi:
    print("\nAVVISI:\n  " + "\n  ".join(avvisi))
print("\n" + ("OK, nessun errore" if not errori else "ERRORI:\n  " + "\n  ".join(errori)))
json.dump(blocchi, open(Path(__file__).resolve().parent/"blocchi.json", "w", encoding="utf-8"),
          ensure_ascii=False, indent=1)
```

## `clip/prompt.py`

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Passo 3 del MASTER: da blocchi.json ai prompt delle clip.

Un prompt e' fatto di tre pezzi, e due su tre sono identici per tutte le clip:

  carta visiva   il preambolo, uguale parola per parola in tutti i prompt.
                 E' l'unica cosa che tiene insieme quaranta clip generate una
                 per una: se cambia anche solo l'obiettivo, si vede allo stacco.
  inquadratura   l'unico pezzo che cambia, e viene dalla riga del blocco:
                 e' li' che si decide la coerenza col parlato.
  coda           i divieti. Servono tutti, e ognuno e' costato una clip buttata.

  python3 clip/prompt.py            scrive clip/prompts.json e li stampa
  python3 clip/prompt.py s07 s12    solo quei blocchi (per rigenerarne uno)
"""
import json, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
from aritmetica import CONTI, profilo

QUI, RADICE = Path(__file__).resolve().parent, Path(__file__).resolve().parent.parent

# Il modello non legge un esadecimale, ma legge un nome di colore. Si danno
# tutti e due: il nome perche' serva, la cifra perche' il registro dica
# esattamente quale palette era in uso.
NOMI = {
  (255,255,255):"white",(244,241,234):"warm off-white",(240,240,240):"light grey",
  (200,200,200):"grey",(128,128,128):"mid grey",(60,60,60):"charcoal",
  (0,0,0):"black",(120,72,40):"warm brown",(166,71,30):"burnt orange",
  (215,3,40):"deep red",(150,20,20):"dark red",(230,150,60):"amber",
  (215,190,110):"sand",(60,110,80):"forest green",(0,98,58):"deep green",
  (46,74,63):"dark teal green",(62,111,168):"steel blue",(20,40,90):"navy",
  (120,90,160):"muted violet",(200,200,160):"pale olive",
}

def nome(hexs):
    r, g, b = (int(hexs[i:i+2], 16) for i in (1, 3, 5))
    # distanza pesata sui coni: il verde pesa piu' del blu
    return min(NOMI.items(), key=lambda kv: 2*(kv[0][0]-r)**2 + 4*(kv[0][1]-g)**2
                                            + 3*(kv[0][2]-b)**2)[1]

# Ognuno di questi e' un errore gia' pagato, non una precauzione generica:
#  - il testo generato torna storpiato e sopra ci va comunque il nostro;
#  - i volti riconoscibili sono un problema di liberatoria, non di stile;
#  - l'audio della clip parlerebbe sopra la voce (e va tolto anche al montaggio);
#  - il taglio interno fa cambiare scena a meta' blocco, e il parlato non segue;
#  - i bordi neri arrivano quando il modello sceglie un aspetto suo.
CODA = ("no on-screen text, no captions, no subtitles, no lettering, no logos, "
        "no watermarks, no user interface. No recognisable faces looking at camera. "
        "No speech, no dialogue, no music. Single continuous shot, no cuts, no scene "
        "change. Full frame, no letterboxing, no black bars, no split screen.")

def prompts(soli=None):
    p = profilo(); c = CONTI(p)
    g = p["generatore"]
    bl = json.loads((RADICE/"copione"/"blocchi.json").read_text(encoding="utf-8"))
    pal = p["palette"]
    colori = ", ".join(f"{nome(v)} ({v})" for v in pal.values())
    testa = (f'{p["carta_visiva"]} Colour palette: {colori}. '
             f'Aspect ratio {p["formato"]}, cinematic, {g.get("durata_base_s", 8)} seconds.')
    fuori = []
    for b in bl:
        if soli and b["id"] not in soli:
            continue
        fuori.append({
            "id": b["id"],
            "modello": g["modello"],
            "aspetto": g.get("aspetto", p["formato"]),
            "durata": g.get("durata_base_s", 8),
            "prompt": f'{testa} {b["inquadratura"].rstrip(". ")}. {CODA}',
        })
    return p, c, fuori

if __name__ == "__main__":
    soli = set(sys.argv[1:]) or None
    p, c, fuori = prompts(soli)
    (QUI/"prompts.json").write_text(json.dumps(fuori, ensure_ascii=False, indent=1),
                                    encoding="utf-8")
    for f in fuori:
        print(f'\n── {f["id"]}  [{f["modello"]}  {f["aspetto"]}  {f["durata"]}s]\n{f["prompt"]}')
    # I lotti servono a non perdere il filo: dodici richieste per volta e' il
    # massimo che il generatore accetta in una chiamata sola.
    n = len(fuori)
    print(f'\n\n{n} prompt in clip/prompts.json  ·  '
          f'{-(-n//12)} lotti da 12  ·  base {p["generatore"]["durata_base_s"]}s '
          f'per inquadrature da {c["spalla"]}s')
    print("Prima del lotto: preventivo del costo (get_cost), sempre. "
          "Le clip costano piu' della voce.")
```

## `clip/provino.py`

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Passo 5 del MASTER: i provini a contatto delle clip grezze.

Tre fotogrammi per clip - inizio, meta', fine - sei clip per foglio. Serve a
guardarle davvero, ed e' un passo obbligatorio: i difetti che contano non li
prende nessun controllo automatico. Sui provini si vedono in un colpo d'occhio
il testo inventato dentro l'immagine, il volto che guarda in camera, la clip che
a meta' cambia scena da sola, e soprattutto quella che stona con le vicine.

Tre fotogrammi e non uno perche' una clip si giudica sul movimento: il primo
fotogramma di una clip sbagliata e' quasi sempre bello.

  python3 clip/provino.py          fogli da clip/grezze
  python3 clip/provino.py finite   fogli da clip/finite (marchio e sottotitoli)
"""
import json, re, subprocess, sys
from pathlib import Path
import imageio_ffmpeg
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
from aritmetica import CONTI, profilo

QUI, RADICE = Path(__file__).resolve().parent, Path(__file__).resolve().parent.parent
FF = imageio_ffmpeg.get_ffmpeg_exe()
PER_FOGLIO, COLONNE = 6, 3
LARGO = 480

def sh(*a):
    r = subprocess.run([str(x) for x in a], capture_output=True, text=True)
    return r.returncode, r.stdout + r.stderr

def durata(f):
    _, o = sh(FF, "-i", f, "-f", "null", "-")
    t = re.findall(r"time=(\d+):(\d+):([\d.]+)", o)
    if not t: return 0.0
    t = t[-1]
    return int(t[0])*3600 + int(t[1])*60 + float(t[2])

def etichette(dove, nomi, lw, lh, c):
    """I nomi delle clip sul foglio. Senza, un difetto visto non si sa dov'e'."""
    righe = "".join(
        f"Dialogue: 0,0:00:00.00,0:00:10.00,S,,0,0,0,,"
        f"{{\\pos({8},{i*lh + 8})}}{n}\n" for i, n in enumerate(nomi))
    Path(dove).write_text(f"""[Script Info]
ScriptType: v4.00+
PlayResX: {lw*COLONNE}
PlayResY: {lh*len(nomi)}

[V4+ Styles]
Format: Name,Fontname,Fontsize,PrimaryColour,OutlineColour,BackColour,Bold,BorderStyle,Outline,Shadow,Alignment,MarginL,MarginR,MarginV,Encoding
Style: S,DejaVu Sans,{round(lh*0.12)},&H00FFFFFF,&H00000000,&HA0000000,-1,3,3,0,7,0,0,0,1

[Events]
Format: Layer,Start,End,Style,Name,MarginL,MarginR,MarginV,Effect,Text
{righe}""", encoding="utf-8")

def provini(cartella="grezze"):
    p = profilo(); c = CONTI(p)
    dentro = QUI/cartella
    alto = round(LARGO * c["altezza"] / c["larghezza"] / 2) * 2
    clip = sorted(dentro.glob("s*.mp4"))
    if not clip: raise SystemExit(f"nessuna clip in {dentro}")
    tmp = QUI/"_provini"; tmp.mkdir(exist_ok=True)
    for f in tmp.glob("*"): f.unlink()
    fuori = QUI/"provini"; fuori.mkdir(exist_ok=True)
    for f in fuori.glob(f"{cartella}-*.png"): f.unlink()

    fogli = 0
    for k in range(0, len(clip), PER_FOGLIO):
        lotto = clip[k:k+PER_FOGLIO]
        n = 0
        for f in lotto:
            d = durata(f)
            for q in (0.1, 0.5, 0.9):
                rc, o = sh(FF, "-y", "-v", "error", "-ss", f"{d*q:.2f}", "-i", f,
                           "-frames:v", "1", "-vf", f"scale={LARGO}:{alto}",
                           tmp/f"t{n:03d}.png")
                if rc: raise SystemExit(f"{f.name}: {o[-300:]}")
                n += 1
        # la griglia vuole il conto pieno: le caselle che avanzano restano nere
        while n < len(lotto) * COLONNE:
            sh(FF, "-y", "-v", "error", "-f", "lavfi", "-i",
               f"color=c=black:s={LARGO}x{alto}", "-frames:v", "1", tmp/f"t{n:03d}.png")
            n += 1
        ass = tmp/"etichette.ass"
        etichette(ass, [f.stem for f in lotto], LARGO, alto, c)
        via = str(ass).replace("\\", "/").replace(":", r"\:").replace("'", r"\'")
        foglio = fuori/f"{cartella}-{k//PER_FOGLIO + 1:02d}.png"
        rc, o = sh(FF, "-y", "-v", "error", "-framerate", "1", "-i", tmp/"t%03d.png",
                   "-vf", f"tile={COLONNE}x{len(lotto)},ass='{via}'",
                   "-frames:v", "1", foglio)
        if rc: raise SystemExit(o[-400:])
        for f in tmp.glob("t*.png"): f.unlink()
        fogli += 1
        print(f"  {foglio.name}  {', '.join(f.stem for f in lotto)}")
    print(f"\n{len(clip)} clip in {fogli} fogli — da GUARDARE, uno per uno.")
    print("Si cerca: testo inventato dentro l'immagine, volti in camera, "
          "stacchi interni, clip che stona con le vicine.")

if __name__ == "__main__":
    provini(sys.argv[1] if len(sys.argv) > 1 else "grezze")
```

## `clip/sottotitoli.py`

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Il testo di un blocco spezzato in righe di sottotitolo, con i tempi.

Lo usano in due: clip/lavora.py per imprimerli nella clip e monta-locale.py per
scrivere l'SRT. Una funzione sola perche' le due cose devono dire esattamente la
stessa cosa negli stessi istanti - se divergono, il file SRT smentisce il video.

I tempi si dividono in proporzione ai caratteri, non alle parole: e' la stessa
regola con cui e' calcolata la durata del blocco, e sbaglia dello stesso poco.

  python3 clip/sottotitoli.py      mostra come si spezzano i blocchi
"""
import json, re, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
from aritmetica import CONTI, profilo

RADICE = Path(__file__).resolve().parent.parent

MIN_A_VIDEO = 1.0      # sotto, la riga lampeggia e non si legge

def larghezza(c):
    """Caratteri per riga. In verticale la riga e' meta', e non e' un dettaglio:
    una riga da 42 caratteri su un 9:16 esce a corpo otto o va fuori quadro."""
    return 24 if c["altezza"] > c["larghezza"] else 42

def pulito(t):
    return re.sub(r"\s+", " ", re.sub(r"\[[a-z]+\]", "", t)).strip()

def a_righe(testo, largo):
    """Spezza in blocchetti da due righe, rompendo prima alla punteggiatura."""
    parole = pulito(testo).split()
    fuori, riga, righe = [], [], []
    for w in parole:
        prova = " ".join(riga + [w])
        if riga and len(prova) > largo:
            righe.append(" ".join(riga)); riga = [w]
        else:
            riga.append(w)
        # una riga che finisce con punto forte e' un buon punto di rottura
        if riga and re.search(r"[.:;!?]$", riga[-1]) and len(righe) % 2 == 1:
            righe.append(" ".join(riga)); riga = []
        if len(righe) == 2:
            fuori.append("\n".join(righe)); righe = []
    if riga: righe.append(" ".join(riga))
    if righe: fuori.append("\n".join(righe))
    return fuori or [""]

def spezza(testo, durata, largo):
    """(inizio, fine, testo) dentro il blocco, relativi al suo inizio.

    Le durate si dividono in proporzione ai caratteri, poi le righe troppo
    brevi prendono tempo in prestito dalla vicina piu' lunga. Il tempo si
    sposta, il testo no: fondere due righe per farle durare di piu' vuol dire
    perderne un pezzo, ed e' successo."""
    parti = a_righe(testo, largo)
    pesi = [max(1, len(p.replace("\n", " "))) for p in parti]
    tot = sum(pesi)
    d = [durata * w / tot for w in pesi]
    if durata >= MIN_A_VIDEO * len(d):
        for _ in range(len(d) * 2):
            corte = [i for i, x in enumerate(d) if x < MIN_A_VIDEO]
            if not corte: break
            i = corte[0]
            vicini = [j for j in (i-1, i+1) if 0 <= j < len(d)]
            j = max(vicini, key=lambda k: d[k])
            presta = min(MIN_A_VIDEO - d[i], d[j] - MIN_A_VIDEO)
            if presta <= 0: break
            d[i] += presta; d[j] -= presta
    fuori, t = [], 0.0
    for p, x in zip(parti, d):
        fuori.append((t, t + x, p)); t += x
    return fuori

def tutte():
    """Tutte le righe di tutti i blocchi, con i tempi assoluti nel montato."""
    p = profilo(); c = CONTI(p); largo = larghezza(c)
    bl = {x["id"]: x["text"] for x in
          json.loads((RADICE/"copione"/"blocchi.json").read_text(encoding="utf-8"))}
    reg = json.loads((RADICE/"audio"/"blocchi-audio.json").read_text(encoding="utf-8"))
    fuori, t = [], c["copertina"]
    for r in reg:
        for ini, fin, testo in spezza(bl[r["id"]], r["durata"], largo):
            fuori.append({"id": r["id"], "da": t + ini, "a": t + fin, "testo": testo})
        t += r["durata"]
    return fuori

if __name__ == "__main__":
    p = profilo(); c = CONTI(p); largo = larghezza(c)
    bl = json.loads((RADICE/"copione"/"blocchi.json").read_text(encoding="utf-8"))
    print(f'{largo} caratteri per riga ({c["formato"]}), base a '
          f'{c["base_sottotitoli"]} px dal fondo\n')
    for b in bl:
        d = len(pulito(b["text"]))/17.0
        print(f'{b["id"]}  {d:.1f}s')
        for ini, fin, t in spezza(b["text"], d, largo):
            print(f'   {ini:5.1f} → {fin:5.1f}   ' + t.replace("\n", " / "))
```

## `clip/lavora.py`

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Passo 8 del MASTER: dalla clip grezza alla clip finita.

La clip che torna dal generatore dura quello che vuole il modello - otto secondi,
di solito - mentre il blocco dura quanto la voce. Qui si fanno combaciare, e si
mette sopra quello che deve vedersi: marchio e sottotitoli.

Quattro cose, in quest'ordine:

  1. inquadratura   si porta al canvas del formato, 25 fps, senza audio.
     L'audio va tolto qui e non solo al montaggio: molti modelli generano una
     traccia sonora per conto loro, e due voci sovrapposte sono un render buttato.
  2. durata         si porta ESATTAMENTE a quella del blocco. Tre strade, scelte
     dal rapporto fra le due durate, e la scelta finisce nel registro.
  3. marchio        in sovrimpressione, dove dice il profilo.
  4. sottotitoli    impressi con il filtro ass. NON con drawtext: nel build di
     imageio_ffmpeg drawtext non c'e' (manca libfreetype), e il giro fallisce
     con «Unknown filter». Con ass si ha anche una tipografia vera.

  python3 clip/lavora.py          tutte le clip
  python3 clip/lavora.py s07 s12  solo quelle (dopo aver rigenerato una grezza)
"""
import json, re, subprocess, sys
from pathlib import Path
import imageio_ffmpeg
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
from aritmetica import CONTI, profilo
from sottotitoli import spezza, larghezza

QUI, RADICE = Path(__file__).resolve().parent, Path(__file__).resolve().parent.parent
FF = imageio_ffmpeg.get_ffmpeg_exe()
GREZZE, FINITE, TMP = QUI/"grezze", QUI/"finite", QUI/"_lavoro"

# Oltre questo rallentamento il movimento si vede a scatti: si passa al
# palindromo. Sotto, rallentare e' invisibile e non ha giunte.
RALLENTA_MAX = 1.25
SCARTO_TOLLERATO = 0.04   # 40 ms: sotto questo, audio e video restano a posto

def sh(*a):
    r = subprocess.run([str(x) for x in a], capture_output=True, text=True)
    return r.returncode, r.stdout + r.stderr

def durata(f):
    _, o = sh(FF, "-i", f, "-f", "null", "-")
    t = re.findall(r"time=(\d+):(\d+):([\d.]+)", o)
    if not t: raise SystemExit(f"{f}: non e' un video leggibile\n{o[-400:]}")
    t = t[-1]
    return int(t[0])*3600 + int(t[1])*60 + float(t[2])

def ass_colore(hexs, alpha=0):
    """#RRGGBB -> &HAABBGGRR. In ASS l'alfa e' la trasparenza: 00 e' pieno."""
    r, g, b = hexs[1:3], hexs[3:5], hexs[5:7]
    return f"&H{alpha:02X}{b}{g}{r}".upper()

def scrivi_ass(dove, righe, c, p):
    car = p.get("carattere", {})
    corpo = round(min(c["larghezza"], c["altezza"]) / 22)
    testa = f"""[Script Info]
ScriptType: v4.00+
PlayResX: {c["larghezza"]}
PlayResY: {c["altezza"]}
WrapStyle: 2
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name,Fontname,Fontsize,PrimaryColour,SecondaryColour,OutlineColour,BackColour,Bold,Italic,Underline,StrikeOut,ScaleX,ScaleY,Spacing,Angle,BorderStyle,Outline,Shadow,Alignment,MarginL,MarginR,MarginV,Encoding
Style: S,{car.get("nome","DejaVu Sans")},{corpo},{ass_colore(p["palette"]["fondo"])},{ass_colore(p["palette"]["fondo"])},{ass_colore(p["palette"]["testo"])},{ass_colore(p["palette"]["testo"], 0x59)},-1,0,0,0,100,100,0,0,3,{round(corpo*0.34)},0,2,{round(c["larghezza"]*0.08)},{round(c["larghezza"]*0.08)},{c["base_sottotitoli"]},1

[Events]
Format: Layer,Start,End,Style,Name,MarginL,MarginR,MarginV,Effect,Text
"""
    def hms(t):
        h = int(t//3600); m = int(t % 3600//60); s = t % 60
        return f"{h:d}:{m:02d}:{s:05.2f}"
    def riga(a, b, t):
        # in ASS l'a-capo e' \N, non il ritorno a capo vero: quello chiude l'evento
        return f'Dialogue: 0,{hms(a)},{hms(b)},S,,0,0,0,,' + t.replace("\n", r"\N") + "\n"
    corpi = "".join(riga(a, b, t) for a, b, t in righe)
    Path(dove).write_text(testa + corpi, encoding="utf-8")

def catena_marchio(p, c):
    m = p.get("marchio") or {}
    f = RADICE/m.get("file", "")
    if not m.get("file") or not f.exists():
        return "", "[v]"      # niente marchio: la catena finisce sui sottotitoli
    alt = m.get("altezza_px", round(c["altezza"]*0.065))
    mar = round(min(c["larghezza"], c["altezza"]) * 0.04)
    dove = {"alto-sinistra":  f"{mar}:{mar}",
            "alto-destra":    f"W-w-{mar}:{mar}",
            "basso-sinistra": f"{mar}:H-h-{mar}",
            "basso-destra":   f"W-w-{mar}:H-h-{mar}"}[m.get("posizione", "alto-sinistra")]
    # Il marchio e' UN fotogramma, e resta uno: `movie=...:loop=0` lo farebbe
    # ciclare all'infinito e l'overlay non finirebbe mai - il giro resta appeso
    # a macinare fotogrammi dopo la fine della clip, senza errori e senza fine
    # (misurato: 90 s e ancora in corso su una clip da 6 s, contro 3,5 s).
    # Un fotogramma solo piu' eof_action=repeat: e' quello che tiene il marchio
    # per tutta la scena, e finisce quando finisce la clip.
    return (f"movie={f},scale=-1:{alt}[mk];"
            f"[v][mk]overlay={dove}:eof_action=repeat[vm]"), "[vm]"

def adatta(idb, base, obiettivo, c):
    """Porta la clip grezza al canvas e ad ALMENO la durata del blocco.

    Almeno, non esatta: il taglio al millesimo si fa nel passo dopo, che
    ricodifica comunque. Qui tagliare con -c copy sposterebbe la fine sul
    pacchetto piu' vicino - misurato: 120 ms di troppo, che al montaggio
    diventano video piu' lungo dell'audio su ogni scena."""
    TMP.mkdir(exist_ok=True)
    d = durata(base)
    quadro = (f"scale={c['larghezza']}:{c['altezza']}:force_original_aspect_ratio=increase,"
              f"crop={c['larghezza']}:{c['altezza']},fps=25,setsar=1")
    fuori = TMP/f"{idb}-adattata.mp4"
    enc = ["-c:v", "libx264", "-preset", "veryfast", "-crf", "18",
           "-pix_fmt", "yuv420p", "-an"]

    if obiettivo <= d + 0.04:
        modo = "taglio"
        rc, o = sh(FF, "-y", "-v", "error", "-i", base, "-vf", quadro, *enc, fuori)
    elif obiettivo <= d * RALLENTA_MAX:
        modo = f"rallenta {obiettivo/d:.2f}x"
        # setpts prima, fps dopo: rallentare a 25 fps gia' fissi lascia i
        # fotogrammi alle vecchie distanze e la durata cade fra due di essi.
        rc, o = sh(FF, "-y", "-v", "error", "-i", base,
                   "-vf", f"{quadro},setpts={obiettivo/d:.5f}*PTS,fps=25", *enc, fuori)
    else:
        # Palindromo: avanti e indietro. La giunta e' invisibile perche' il
        # fotogramma di svolta e' lo stesso; un semplice loop invece stacca,
        # e lo stacco cade a meta' di una frase.
        modo = f"palindromo x{obiettivo/(2*d):.2f}"
        pp = TMP/f"{idb}-pp.mp4"
        rc, o = sh(FF, "-y", "-v", "error", "-i", base, "-filter_complex",
                   f"[0:v]{quadro},split[a][b];[b]reverse[r];[a][r]concat=n=2:v=1[v]",
                   "-map", "[v]", *enc, pp)
        if rc == 0:
            rc, o = sh(FF, "-y", "-v", "error", "-stream_loop", "-1", "-i", pp,
                       "-t", f"{obiettivo + 1:.3f}", "-c", "copy", fuori)
    if rc: raise SystemExit(f"{idb}: {o[-500:]}")
    return fuori, modo, d

def lavora(soli=None):
    p = profilo(); c = CONTI(p); largo = larghezza(c)
    FINITE.mkdir(exist_ok=True); TMP.mkdir(exist_ok=True)
    testi = {x["id"]: x["text"] for x in
             json.loads((RADICE/"copione"/"blocchi.json").read_text(encoding="utf-8"))}
    reg = json.loads((RADICE/"audio"/"blocchi-audio.json").read_text(encoding="utf-8"))
    fatte, peggio = [], (0.0, "")
    for r in reg:
        idb, obiettivo = r["id"], r["durata"]
        if soli and idb not in soli: continue
        base = GREZZE/f"{idb}.mp4"
        if not base.exists():
            print(f"  {idb}  MANCA la clip grezza"); continue

        adattata, modo, d0 = adatta(idb, base, obiettivo, c)
        ass = TMP/f"{idb}.ass"
        scrivi_ass(ass, spezza(testi[idb], obiettivo, largo), c, p)
        pre, tappo = catena_marchio(p, c)
        fuori = FINITE/f"{idb}.mp4"
        # il percorso dell'ass va protetto: due punti e virgole sono separatori
        via = str(ass).replace("\\", "/").replace(":", r"\:").replace("'", r"\'")
        # tpad prima dei sottotitoli: tiene l'ultimo fotogramma per un secondo,
        # cosi' -t trova sempre materiale fino al millesimo chiesto anche quando
        # la clip adattata finisce un fotogramma prima.
        grafo = (f"[0:v]tpad=stop_mode=clone:stop_duration=1,ass='{via}'[v]"
                 + (";" + pre if pre else ""))
        rc, o = sh(FF, "-y", "-v", "error", "-i", adattata, "-filter_complex", grafo,
                   "-map", tappo, "-t", f"{obiettivo:.3f}",
                   "-c:v", "libx264", "-preset", "medium", "-crf", "20",
                   "-pix_fmt", "yuv420p", "-an", "-movflags", "+faststart", fuori)
        if rc: raise SystemExit(f"{idb}: {o[-500:]}")
        df = durata(fuori); scarto = abs(df - obiettivo)
        if scarto > peggio[0]: peggio = (scarto, idb)
        fatte.append({"id": idb, "base": round(d0, 2), "obiettivo": round(obiettivo, 2),
                      "modo": modo, "finita": round(df, 2), "scarto": round(scarto, 3)})
        print(f'  {idb}  base {d0:5.2f}s → {obiettivo:5.2f}s  [{modo:16s}]  '
              f'uscita {df:5.2f}s  scarto {scarto*1000:4.0f} ms'
              f'{"   <-- FUORI TOLLERANZA" if scarto > SCARTO_TOLLERATO else ""}')

    vecchie = {x["id"]: x for x in json.loads((QUI/"lavorate.json").read_text(encoding="utf-8"))} \
        if (QUI/"lavorate.json").exists() else {}
    vecchie.update({x["id"]: x for x in fatte})
    ordinate = sorted(vecchie.values(), key=lambda x: x["id"])
    (QUI/"lavorate.json").write_text(json.dumps(ordinate, ensure_ascii=False, indent=1),
                                     encoding="utf-8")
    fuori_t = [x for x in ordinate if x["scarto"] > SCARTO_TOLLERATO]
    print(f'\n{len(fatte)} clip lavorate  ·  scarto peggiore {peggio[0]*1000:.0f} ms su {peggio[1]}')
    if fuori_t:
        print("FUORI TOLLERANZA: " + ", ".join(x["id"] for x in fuori_t))

if __name__ == "__main__":
    lavora(set(sys.argv[1:]) or None)
```

## `clip/cartelli.py`

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Le due immagini ferme: copertina e chiusura.

Sono le uniche due cose disegnate di tutto il video, e per due immagini non vale
la pena di tenere in piedi un browser: fondo pieno, testo con ass, marchio in
sovrimpressione. Niente node, niente Chromium, niente caratteri incorporati in
base64 - tutta roba che serviva alle slide e con le clip non serve piu'.

  python3 clip/cartelli.py       scrive clip/copertina.png e clip/chiusura.png
"""
import subprocess, sys
from pathlib import Path
import imageio_ffmpeg
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
from aritmetica import CONTI, profilo

QUI, RADICE = Path(__file__).resolve().parent, Path(__file__).resolve().parent.parent
FF = imageio_ffmpeg.get_ffmpeg_exe()

def ass_colore(hexs, alpha=0):
    r, g, b = hexs[1:3], hexs[3:5], hexs[5:7]
    return f"&H{alpha:02X}{b}{g}{r}".upper()

def cartello(nome, testi, p, c):
    """testi: [(riga, peso, colore, y in frazione d'altezza), ...]"""
    pal = p["palette"]
    car = p.get("carattere", {}).get("nome", "DejaVu Sans")
    stili, righe = [], []
    for i, (t, corpo, colore, y) in enumerate(testi):
        stili.append(
            f"Style: S{i},{car},{round(min(c['larghezza'], c['altezza'])*corpo)},"
            f"{ass_colore(pal[colore])},{ass_colore(pal[colore])},"
            f"{ass_colore(pal['fondo'])},{ass_colore(pal['fondo'])},"
            f"{-1 if corpo > 0.05 else 0},0,0,0,100,100,{round(corpo*40)},0,1,0,0,5,"
            f"{round(c['larghezza']*0.1)},{round(c['larghezza']*0.1)},0,1")
        righe.append(f"Dialogue: 0,0:00:00.00,0:00:10.00,S{i},,0,0,0,,"
                     f"{{\\pos({c['larghezza']//2},{round(c['altezza']*y)})}}"
                     + t.replace("\n", r"\N"))
    ass = QUI/f"_{nome}.ass"
    ass.write_text(f"""[Script Info]
ScriptType: v4.00+
PlayResX: {c['larghezza']}
PlayResY: {c['altezza']}
WrapStyle: 0

[V4+ Styles]
Format: Name,Fontname,Fontsize,PrimaryColour,SecondaryColour,OutlineColour,BackColour,Bold,Italic,Underline,StrikeOut,ScaleX,ScaleY,Spacing,Angle,BorderStyle,Outline,Shadow,Alignment,MarginL,MarginR,MarginV,Encoding
{chr(10).join(stili)}

[Events]
Format: Layer,Start,End,Style,Name,MarginL,MarginR,MarginV,Effect,Text
{chr(10).join(righe)}
""", encoding="utf-8")

    m = p.get("marchio") or {}
    logo = RADICE/m.get("file", "")
    via = str(ass).replace("\\", "/").replace(":", r"\:").replace("'", r"\'")
    grafo = f"[0:v]ass='{via}'[v]"
    tappo = "[v]"
    if m.get("file") and logo.exists():
        alt = m.get("altezza_px", round(c["altezza"]*0.065))
        mar = round(min(c["larghezza"], c["altezza"]) * 0.04)
        dove = {"alto-sinistra":  f"{mar}:{mar}",
                "alto-destra":    f"W-w-{mar}:{mar}",
                "basso-sinistra": f"{mar}:H-h-{mar}",
                "basso-destra":   f"W-w-{mar}:H-h-{mar}"}[m.get("posizione", "alto-sinistra")]
        grafo += f";movie={logo},scale=-1:{alt}[mk];[v][mk]overlay={dove}[vm]"
        tappo = "[vm]"
    fuori = QUI/f"{nome}.png"
    r = subprocess.run([FF, "-y", "-v", "error", "-f", "lavfi", "-i",
        f"color=c={p['palette']['fondo']}:s={c['larghezza']}x{c['altezza']}",
        "-filter_complex", grafo, "-map", tappo, "-frames:v", "1", str(fuori)],
        capture_output=True, text=True)
    if r.returncode: raise SystemExit(r.stderr[-500:])
    ass.unlink()
    print(f"  {fuori.name}  {c['larghezza']}x{c['altezza']}")

if __name__ == "__main__":
    p = profilo(); c = CONTI(p)
    t = p.get("cartelli", {})
    cop, chi = t.get("copertina", {}), t.get("chiusura", {})
    cartello("copertina", [
        (cop.get("sopra", ""),  0.022, "accento",    0.40),
        (cop.get("titolo", p["titolo"]), 0.070, "testo", 0.50),
        (cop.get("sotto", ""),  0.026, "secondario", 0.61),
    ], p, c)
    cartello("chiusura", [
        (chi.get("titolo", ""), 0.048, "testo",      0.46),
        (chi.get("sotto", ""),  0.024, "secondario", 0.57),
    ], p, c)
```

## `audio/tagli.py`

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Passo 7 del MASTER: ritaglia i blocchi dalle due tracce continue.

I confini si scelgono sul GREZZO, dove le pause hanno ancora lunghezze diverse:
sulla traccia gia' lavorata silenceremove le ha pareggiate tutte a 0,14 s e
la lunghezza della pausa - il segnale su cui si basa la scelta - sparisce.
Il ritmo (silenzi + 1,12x) si applica dopo, blocco per blocco.

  tagli.py allinea   sceglie i confini e prepara prova.mp3
  tagli.py correggi  sposta i confini indicati in correzioni.json
  tagli.py applica   scrive i blocchi + le pose
"""
import json, re, subprocess, sys
from pathlib import Path
import imageio_ffmpeg
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
from aritmetica import CONTI

QUI    = Path(__file__).resolve().parent
RADICE = QUI.parent
FF     = imageio_ffmpeg.get_ffmpeg_exe()
STACCO = "s28"
SOGLIA = "-45dB"
RITMO = ("silenceremove=start_periods=1:start_silence=0.03:start_threshold=-45dB:"
         "stop_periods=-1:stop_silence=0.14:stop_threshold=-45dB:detection=peak,"
         "aresample=44100,atempo=1.12")
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

def tracce():
    """Le tracce da lavorare, saltando quelle vuote.

    Sotto i 5.000 caratteri il copione sta in una traccia sola: si mette STACCO
    sull'ultimo blocco e il gruppo B resta vuoto. Senza questo filtro il giro
    andrebbe a cercare un grezzo-B.mp3 che nessuno ha generato."""
    A, B = blocchi()
    return [t for t in (("A", A), ("B", B)) if t[1]]

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

def pezzi_testo(gruppo):
    """Il copione spezzato alla punteggiatura: e' li' che la voce mette le pause.
    Restituisce (caratteri, id del blocco, e' l'ultimo pezzo del blocco)."""
    out = []
    for x in gruppo:
        t = re.sub(r"\[[a-z]+\]", "", x["text"]).strip()
        parti = [q for q in re.split(r"(?<=[.:;,])\s+", t) if q.strip()]
        for i,q in enumerate(parti):
            out.append((len(q), x["id"], i == len(parti)-1))
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
    cps = [len(x["text"])/(d/1.30) for x,d in zip(gruppo, durate)]
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
        cps = len(x["text"])/(d/1.30)          # stima: il ritmo accorcia di ~30%
        bad = not (8.5 <= cps <= 21); fuori += bad
        print(f"  {x['id']}  {bordi[i]:7.2f} -> {bordi[i+1]:7.2f}  {d:5.2f}s grezzi  "
              f"~{cps:5.1f} car/s{'   <-- FUORI FASCIA' if bad else ''}")
    return fuori

def cmd_allinea():
    tutti = []; fuori = 0
    for L,gruppo in tracce():
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
    for L,gruppo in tracce():
        st = json.loads(stato(L).read_text(encoding="utf-8"))
        bordi = [0.0]+st["confini"]+[st["durata"]]
        mostra(L, gruppo, st["durata"], st["confini"])
        tutti += [(L,x["id"],bordi[i]) for i,x in enumerate(gruppo)]
    fai_prova(tutti)

def cmd_applica():
    out = QUI/"blocchi"; out.mkdir(exist_ok=True)
    reg = []
    for L,gruppo in tracce():
        st = json.loads(stato(L).read_text(encoding="utf-8"))
        bordi = [0.0]+st["confini"]+[st["durata"]]
        for i,x in enumerate(gruppo):
            ini,fin = bordi[i],bordi[i+1]
            f = out/f"{x['id']}.mp3"
            sh(FF,"-y","-v","error","-ss",f"{ini:.3f}","-to",f"{fin:.3f}",
               "-i",QUI/f"grezzo-{L}.mp3","-af",RITMO,"-c:a","libmp3lame","-b:a","192k",f)
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
    c = CONTI()
    tot = sum(r["durata"] for r in reg); m = tot + c["copertina"] + c["chiusura"]
    fuori = [r for r in reg if not 8.5<=r["cps"]<=21]
    print(f"{len(reg)} blocchi  ·  parlato {tot:.1f} s  ·  montato {int(m//60)}:{m%60:04.1f}")
    print(f"pose: {sum(1 for r in reg if r['posa'])}   fuori fascia: {len(fuori)}")
    for r in fuori: print(f"   {r['id']}  {r['cps']} car/s  {r['durata']} s")

if __name__ == "__main__":
    {"allinea":cmd_allinea,"correggi":cmd_correggi,"applica":cmd_applica}[sys.argv[1]]()
```

## `audio/verifica-testo.py`

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
UNI   = {"uno":1,"un":1,"due":2,"tre":3,"quattro":4,"cinque":5,
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

## `audio/verifica.py`

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

## `verifica-locale.py`

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Controllo dei confini SENZA rete, quando la trascrizione non e' disponibile.

Non sostituisce prova.mp3 + verifica.py: non sa cosa dice la voce. Sa pero'
riconoscere la firma di un confine spostato. Se un taglio scivola in avanti di
una frase, il blocco prima diventa piu' lungo di quanto il suo testo prometta e
quello dopo piu' corto: due scarti grandi, adiacenti e di segno opposto.
Quelli sono i confini da guardare per primi.
"""
import json, re, statistics
from pathlib import Path

QUI = Path(__file__).resolve().parent
reg = json.loads((QUI/"audio"/"blocchi-audio.json").read_text(encoding="utf-8"))
testi = {x["id"]: x["text"] for x in
         json.loads((QUI/"copione"/"blocchi.json").read_text(encoding="utf-8"))}

# Le cifre costano molte piu' sillabe dei caratteri, e vanno contate a parte.
# Il peso e' stato adattato sui 48 blocchi misurati di 1.3, dove il 5,0 stimato
# a occhio in 1.2 faceva uscire corti tutti i blocchi pieni di numeri: da solo
# non spiega tutto lo scarto, ma toglie un falso allarme sistematico.
def peso(t):
    t = re.sub(r"\[[a-z]+\]", "", t)
    cifre = len(re.findall(r"\d", t))
    return len(t) + cifre * 4.0        # una cifra vale ~5 caratteri di tempo

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
```

## `monta-scene.py`

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Passo 9 del MASTER: una scena per blocco, clip finita + mp3 del blocco.

Qui non si allunga piu' niente: clip/lavora.py ha gia' portato ogni clip alla
durata esatta del suo blocco. Questo passo accoppia e basta, e serve soprattutto
a misurare: se una scena esce di durata diversa dal suo mp3, il montaggio lo
fara' notare molto piu' tardi e molto peggio.
"""
import json, re, subprocess, sys
from pathlib import Path
import imageio_ffmpeg
sys.path.insert(0, str(Path(__file__).resolve().parent))
from aritmetica import CONTI, profilo

QUI = Path(__file__).resolve().parent
FF  = imageio_ffmpeg.get_ffmpeg_exe()
OUT = QUI/"scene"; OUT.mkdir(exist_ok=True)
TOLLERANZA = 0.08

def durata(f):
    o = subprocess.run([FF, "-i", str(f), "-f", "null", "-"],
                       capture_output=True, text=True).stderr
    t = re.findall(r"time=(\d+):(\d+):([\d.]+)", o)[-1]
    return int(t[0])*3600 + int(t[1])*60 + float(t[2])

c = CONTI(profilo())
reg = json.loads((QUI/"audio"/"blocchi-audio.json").read_text(encoding="utf-8"))
tot = 0.0; righe = []
for r in reg:
    idb, d = r["id"], r["durata"]
    clip = QUI/"clip"/"finite"/f"{idb}.mp4"
    mp3  = QUI/"audio"/"blocchi"/f"{idb}.mp3"
    out  = OUT/f"{idb}.mp4"
    if not clip.exists():
        print(f"  {idb}  MANCA la clip finita"); raise SystemExit(1)
    # -shortest non basta: se la clip e' lunga un fotogramma di piu', la scena
    # dura di piu' del suo audio e lo scarto si accumula sulle scene seguenti.
    p = subprocess.run([FF, "-y", "-v", "error", "-i", str(clip), "-i", str(mp3),
        "-map", "0:v", "-map", "1:a", "-t", f"{d:.3f}",
        "-c:v", "copy", "-c:a", "aac", "-b:a", "160k",
        "-movflags", "+faststart", str(out)], capture_output=True, text=True)
    if p.returncode: print(idb, p.stderr[-400:]); raise SystemExit(1)
    dr = durata(out); tot += dr
    righe.append((idb, d, dr, abs(dr-d)))
    print(f"  {idb}  audio {d:6.2f}s  scena {dr:6.2f}s  scarto {abs(dr-d)*1000:4.0f} ms")

peggio = max(righe, key=lambda x: x[3])
m = tot + c["copertina"] + c["chiusura"]
print(f'\n{len(righe)} scene · parlato {tot:.1f} s · con copertina {c["copertina"]} s '
      f'e chiusura {c["chiusura"]} s → {int(m//60)}:{m%60:04.1f}')
print(f"scarto massimo audio/video: {peggio[3]*1000:.0f} ms su {peggio[0]}")
if peggio[3] > TOLLERANZA:
    print("Oltre tolleranza: rilanciare clip/lavora.py su quel blocco prima di caricare.")
```

## `monta-heygen.py`

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Passo 9 del MASTER: il payload delle scene per create_video_from_studio.

Legge clip/asset-id.json - la mappa nome file → asset id, che si compila dopo il
caricamento - e scrive il payload esatto. Esiste per una ragione sola: la regola
che costa un render se la si sbaglia sta scritta qui una volta, invece di essere
ricordata a mano cinquanta volte.

  scene video    audio_asset_id  +  playback {mode fit_to_scene, mute true}
                 - senza audio_asset_id la scena dura quanto la clip;
                 - con mode "freeze" (che e' il DEFAULT se si omette playback)
                   la clip parte, finisce e resta congelata sull'ultimo
                   fotogramma per tutto il resto del blocco;
                 - senza mute true si sente l'audio che il modello ha generato
                   per conto suo, sopra la voce.
                 Le clip escono gia' della durata esatta, quindi fit_to_scene
                 non cambia velocita': e' la rete di sicurezza per gli scarti
                 di qualche fotogramma.
  scene immagine duration esplicito, nessun audio.

  python3 monta-heygen.py        scrive scene/payload.json
"""
import json, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))
from aritmetica import CONTI, profilo

QUI = Path(__file__).resolve().parent
p = profilo(); c = CONTI(p)
mappa = json.loads((QUI/"clip"/"asset-id.json").read_text(encoding="utf-8"))
reg = json.loads((QUI/"audio"/"blocchi-audio.json").read_text(encoding="utf-8"))

def aid(nome):
    if nome not in mappa:
        raise SystemExit(f"manca l'asset id di {nome} in clip/asset-id.json")
    return mappa[nome]

scene = [{"type": "image", "source": {"type": "asset_id", "asset_id": aid("copertina.png")},
          "duration": c["copertina"]}]
for r in reg:
    scene.append({
        "type": "video",
        "source": {"type": "asset_id", "asset_id": aid(f'{r["id"]}.mp4')},
        "audio_asset_id": aid(f'{r["id"]}.mp3'),
        "playback": {"mode": "fit_to_scene", "mute": True},
    })
scene.append({"type": "image", "source": {"type": "asset_id", "asset_id": aid("chiusura.png")},
              "duration": c["chiusura"]})

payload = {"title": p["titolo"], "aspectRatio": p["formato"], "resolution": "1080p",
           "caption": {"file_format": "srt"}, "scenes": scene}
(QUI/"scene"/"payload.json").write_text(json.dumps(payload, ensure_ascii=False, indent=1),
                                        encoding="utf-8")
d = c["copertina"] + c["chiusura"] + sum(r["durata"] for r in reg)
print(f'scene/payload.json  ·  {len(scene)} scene (tetto 50)  ·  {p["formato"]} 1080p')
print(f'durata attesa {int(d//60)}:{d%60:04.1f}')
if len(scene) > 50:
    raise SystemExit("oltre il tetto di 50 scene: il video va diviso in parti")
```

## `monta-locale.py`

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Passo 9 del MASTER: la copia di controllo, in locale.

Copertina + le scene + chiusura, concatenate con ffmpeg, piu' l'SRT. Serve a
guardare il video intero e a misurarne la durata senza aspettare il render del
servizio - e a scoprire li' quello che altrimenti si scopre dopo tre minuti di
attesa e un render buttato.

Per un video che non sta in 50 scene, si montano le parti una per una sul
servizio e si concatenano qui: la lista si fa a mano in _montaggio/parti.txt.
"""
import json, re, subprocess, sys
from pathlib import Path
import imageio_ffmpeg
sys.path.insert(0, str(Path(__file__).resolve().parent))
from aritmetica import CONTI, profilo
sys.path.insert(0, str(Path(__file__).resolve().parent/"clip"))
from sottotitoli import tutte

QUI = Path(__file__).resolve().parent
FF  = imageio_ffmpeg.get_ffmpeg_exe()
TMP = QUI/"_montaggio"; TMP.mkdir(exist_ok=True)
sh  = lambda *a: subprocess.run([str(x) for x in a], capture_output=True, text=True)

def durata(f):
    t = re.findall(r"time=(\d+):(\d+):([\d.]+)", sh(FF, "-i", f, "-f", "null", "-").stderr)[-1]
    return int(t[0])*3600 + int(t[1])*60 + float(t[2])

p = profilo(); c = CONTI(p)
NOME = re.sub(r"[^a-z0-9]+", "-", p["titolo"].lower()).strip("-")[:40] or "montato"

# copertina e chiusura: immagine ferma + silenzio, cosi' hanno una traccia audio
# e la concatenazione non trova un pezzo senza audio a meta' strada
for nome, sec in (("copertina", c["copertina"]), ("chiusura", c["chiusura"])):
    r = sh(FF, "-y", "-v", "error", "-loop", "1", "-t", str(sec), "-i", QUI/"clip"/f"{nome}.png",
           "-f", "lavfi", "-t", str(sec), "-i", "anullsrc=r=44100:cl=stereo",
           "-c:v", "libx264", "-preset", "veryfast", "-crf", "20", "-pix_fmt", "yuv420p",
           "-r", "25", "-c:a", "aac", "-b:a", "160k", "-shortest", TMP/f"{nome}.mp4")
    if r.returncode: raise SystemExit(r.stderr[-400:])

reg = json.loads((QUI/"audio"/"blocchi-audio.json").read_text(encoding="utf-8"))
ordine = ([TMP/"copertina.mp4"] + [QUI/"scene"/f'{r["id"]}.mp4' for r in reg]
          + [TMP/"chiusura.mp4"])
mancano = [f.name for f in ordine if not f.exists()]
if mancano: raise SystemExit("mancano: " + ", ".join(mancano))
(TMP/"lista.txt").write_text("".join(f"file '{f.resolve()}'\n" for f in ordine), encoding="utf-8")
sh(FF, "-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", TMP/"lista.txt",
   "-c", "copy", "-movflags", "+faststart", QUI/f"{NOME}.mp4")

# sottotitoli: dalla stessa funzione che li imprime nelle clip, cosi' l'SRT
# dice esattamente quello che si vede, negli stessi istanti
def hms(t):
    h = int(t//3600); m = int(t % 3600//60); s = t % 60
    return f"{h:02d}:{m:02d}:{s:06.3f}".replace(".", ",")
righe = [f'{n}\n{hms(r["da"])} --> {hms(r["a"])}\n{r["testo"]}\n'
         for n, r in enumerate(tutte(), start=1)]
(QUI/f"{NOME}.srt").write_text("\n".join(righe), encoding="utf-8")

d = durata(QUI/f"{NOME}.mp4")
print(f'{NOME}.mp4  {int(d//60)}:{d%60:05.2f}  '
      f'{(QUI/f"{NOME}.mp4").stat().st_size//1024//1024} MB  ·  {len(ordine)} scene')
print(f'{NOME}.srt  {len(righe)} sottotitoli')
print(f'chiesti   {int(c["durata"]//60)}:{c["durata"]%60:05.2f}   '
      f'scarto {d-c["durata"]:+.1f} s')
```

## `controlli.py`

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""I controlli del MASTER §6, tutti in una volta.

Un 8/9 si consegna solo dicendo quale controllo non e' passato e perche'.
"""
import json, re, subprocess, sys
from pathlib import Path
import imageio_ffmpeg
sys.path.insert(0, str(Path(__file__).resolve().parent))
from aritmetica import CONTI, profilo

QUI = Path(__file__).resolve().parent
FF  = imageio_ffmpeg.get_ffmpeg_exe()
p = profilo(); c = CONTI(p)
NOME = re.sub(r"[^a-z0-9]+", "-", p["titolo"].lower()).strip("-")[:40] or "montato"
ok = lambda b: "OK  " if b else "NO  "
esiti = []

# 1. la voce ha detto tutto
f    = QUI/"audio"/"esiti-verifica.json"
corr = QUI/"audio"/"correzioni.json"
ctrl = sorted((QUI/"audio"/"trascrizioni").glob("controprova*.txt")) \
       if (QUI/"audio"/"trascrizioni").exists() else []
txt  = QUI/"audio"/"esiti-testo.json"
if not f.exists() and txt.exists():
    # Strada alternativa: la trascrizione dell'intera traccia grezza. Prova che
    # la voce ha detto tutto, ma non dove cadono i tagli, perche' la
    # trascrizione non porta i tempi: per quelli restano l'allineamento DTW e
    # verifica-locale.py.
    e = json.loads(txt.read_text(encoding="utf-8"))
    buchi = sum(len(v["buchi"]) for v in e.values())
    perc = min(100*v["coincidenti"]/v["parole_copione"] for v in e.values())
    esiti.append((not buchi, f"verifica per trascrizione (traccia intera): {perc:.1f}% "
                             f"delle parole coincide, buchi nel parlato: {buchi}"))
elif not f.exists():
    esiti.append((False, "verifica per trascrizione: NON ESEGUITA"))
else:
    fuori = [e for e in json.loads(f.read_text(encoding="utf-8")) if not e["ok"]]
    if not fuori:
        esiti.append((True, "verifica per trascrizione: nessun confine fuori posto"))
    elif corr.exists() and ctrl:
        n = sum(len(v) for v in json.loads(corr.read_text(encoding="utf-8")).values())
        esiti.append((n >= len(fuori), f"verifica: {len(fuori)} fuori posto alla prova, "
                      f"{n} corretti e ricontrollati -> {max(0, len(fuori)-n)}"))
    else:
        esiti.append((False, f"verifica: {len(fuori)} confini fuori posto, non corretti"))

# 2. la voce sta nella fascia di velocita'
reg = json.loads((QUI/"audio"/"blocchi-audio.json").read_text(encoding="utf-8"))
male = [r for r in reg if not 8.5 <= r["cps"] <= 21]
esiti.append((not male, "fascia 8,5-21 car/s: " +
              (", ".join(f'{r["id"]} a {r["cps"]}' for r in male) or "tutti dentro")))

# 3. tutte le clip ci sono e sono state guardate nei provini
grezze = sorted((QUI/"clip"/"grezze").glob("s*.mp4"))
finite = sorted((QUI/"clip"/"finite").glob("s*.mp4"))
prov   = sorted((QUI/"clip"/"provini").glob("*.png"))
esiti.append((len(finite) == len(reg), f"clip lavorate: {len(finite)}/{len(reg)} "
                                       f"(grezze {len(grezze)})"))
esiti.append((len(prov) >= -(-len(reg)//6), f"provini a contatto guardati: {len(prov)} fogli"))

# 4. ogni clip dura quanto il suo blocco
lav = QUI/"clip"/"lavorate.json"
if lav.exists():
    L = json.loads(lav.read_text(encoding="utf-8"))
    fuori_t = [x for x in L if x["scarto"] > 0.04]
    esiti.append((not fuori_t, "clip alla durata del blocco (±40 ms): " +
                  (", ".join(f'{x["id"]} {x["scarto"]*1000:.0f} ms' for x in fuori_t)
                   or "tutte")))
else:
    esiti.append((False, "clip alla durata del blocco: clip/lavorate.json manca"))

# 5. scene entro il tetto
scene = sorted((QUI/"scene").glob("s*.mp4"))
esiti.append((len(scene)+2 <= 50, f"scene totali: {len(scene)+2} (tetto 50)"))

# 6. la durata chiesta
o = subprocess.run([FF, "-i", str(QUI/f"{NOME}.mp4"), "-f", "null", "-"],
                   capture_output=True, text=True).stderr
t = re.findall(r"time=(\d+):(\d+):([\d.]+)", o)[-1]
d = int(t[0])*3600 + int(t[1])*60 + float(t[2])
esiti.append((d >= c["durata"] * 0.95,
              f'durata {int(d//60)}:{d%60:05.2f} — chiesti '
              f'{int(c["durata"]//60)}:{c["durata"]%60:05.2f}'))

# 7. formato e fotogrammi
# La riga dello Stream si cerca riga per riga: su tutto il testo in una volta
# il punto-qualsiasi scavalca le righe e torna un 0x4217 a 1063 fps.
riga = next((l for l in o.splitlines() if "Stream" in l and "Video" in l), "")
v = re.search(r"(\d{2,5})x(\d{2,5})", riga)
fps = re.search(r"([\d.]+) fps", riga)
if v:
    giusto = (int(v.group(1)), int(v.group(2))) == (c["larghezza"], c["altezza"])
    esiti.append((giusto, f'formato {v.group(1)}x{v.group(2)} a '
                          f'{fps.group(1) if fps else "?"} fps — chiesto '
                          f'{c["larghezza"]}x{c["altezza"]}'))
else:
    esiti.append((False, "formato: riga dello stream non leggibile"))

# 8. i sottotitoli
srt = (QUI/f"{NOME}.srt").read_text(encoding="utf-8")
n = len(re.findall(r"-->", srt))
lunghe = [r for r in srt.split("\n\n") if any(len(x) > 48 for x in r.split("\n")[2:])]
esiti.append((n > 0 and not lunghe,
              f"sottotitoli SRT: {n} righe, {len(lunghe)} troppo lunghe"))

# 9. il registro
rf = QUI/"REGISTRO.md"
esiti.append((rf.exists() and "## Da verificare" in rf.read_text(encoding="utf-8"),
              "registro con la sezione «da verificare»"))

print(f'CONTROLLI PRIMA DI CONSEGNARE (MASTER §6)\n\n{p["titolo"]}\n')
for b, t in esiti: print(f"  [{ok(b)}] {t}")
print(f"\n{sum(1 for b, _ in esiti if b)}/{len(esiti)} superati")
```

## `REGISTRO-modello.md`

````markdown
# REGISTRO — <titolo del video>

## Scheda

| | |
|---|---|
| tema | |
| palette | |
| voce | |
| durata chiesta | |
| formato | |
| generatore delle clip | modello, versione, aspetto |
| blocchi / scene | |
| carta visiva | il preambolo, per intero |

## Aritmetica

Uscita di `python3 aritmetica.py`, incollata.

## Che cosa e' costato

| | |
|---|---|
| clip generate | n × prezzo = |
| clip rigenerate | quali, e perche' |
| voce | |
| trascrizione | |
| **totale** | |

## Verifiche

- [ ] la voce ha detto tutto
- [ ] blocchi nella fascia 8,5-21 car/s
- [ ] provini delle grezze guardati
- [ ] provini delle finite guardati
- [ ] clip alla durata del blocco
- [ ] scene entro il tetto
- [ ] durata, formato, sottotitoli
- [ ] controlli.py

## Che cosa e' andato storto, e come si e' deciso

## Da verificare — quello che non ho potuto giudicare io

Qui va anche quello che e' costato soldi per niente.
````

