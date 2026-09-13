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

@@FILE modello/profilo.json@@

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

@@FILE modello/nuovo-video.sh@@
@@FILE modello/aritmetica.py@@
@@FILE modello/copione/costruisci.py@@
@@FILE modello/clip/prompt.py@@
@@FILE modello/clip/provino.py@@
@@FILE modello/clip/sottotitoli.py@@
@@FILE modello/clip/lavora.py@@
@@FILE modello/clip/cartelli.py@@
@@FILE modello/audio/tagli.py@@
@@FILE modello/audio/verifica-testo.py@@
@@FILE modello/audio/verifica.py@@
@@FILE modello/verifica-locale.py@@
@@FILE modello/monta-scene.py@@
@@FILE modello/monta-heygen.py@@
@@FILE modello/monta-locale.py@@
@@FILE modello/controlli.py@@
@@FILE modello/REGISTRO-modello.md@@
