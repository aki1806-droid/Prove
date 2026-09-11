# MASTER — metodo di produzione video

Documento madre. Vale per **qualunque** video o corso, non solo per quelli già
fatti: le cose che cambiano da progetto a progetto stanno tutte in cima, come
variabili, e il resto del documento le usa senza doverle ridiscutere.

Si usa così:

1. si compila la **scheda parametri** (§0) — sono tre domande, il resto ha un
   default;
2. si leggono i **valori derivati** (§1), che escono dai parametri con
   un'aritmetica fissa: quanti caratteri scrivere, quanti blocchi, quante scene;
3. si esegue la **pipeline** (§3), che è sempre la stessa.

`STANDARD.md` resta il diario di bordo con le trappole già pagate.
`METODO.md` è l'istanza di questo master per «La Parola Giusta».

---

# 0. Scheda parametri — le tre domande

Queste tre non si indovinano. Tutto il resto ha un default che si applica in
silenzio.

| # | Variabile | Domanda | Formato della risposta |
|---|---|---|---|
| 1 | `{{TEMA}}` | **Di cosa parla, e qual è il testo di partenza?** | Titolo + script o scaletta completa |
| 2 | `{{COLORI}}` | **Che palette?** | Tre colori: fondo, testo, accento. Più due opzionali (vedi §2.2) |
| 3 | `{{DURATA}}` | **Quanto deve durare il montato?** | `mm:ss` |

## 0.1 Scheda da compilare

```
TEMA
  titolo            {{TITOLO}}
  sottotitolo       {{SOTTOTITOLO}}
  numero lezione    {{ETICHETTA}}          es. "Modulo 3 · Lezione 3.4"
  testo di partenza {{SCRIPT}}             file o incollato
  a chi parla       {{DESTINATARIO}}       decide la persona verbale
  registro          {{REGISTRO}}           default: seconda persona singolare

COLORI
  fondo chiaro      {{BG}}                 es. #F7F3EA
  testo             {{FG}}                 es. #12294A
  accento           {{ORO}}                es. #C39A4E
  fondo tenue       {{BG_TENUE}}           opzionale — slide degli errori
  fondo profondo    {{BG_PROFONDO}}        opzionale — memo, testo in accento

DURATA
  obiettivo         {{DURATA}}             es. 6:00
  copertina         {{T_COVER}}            default 3 s
  chiusura          {{T_CLOSING}}          default 10 s
  pausa senza voce  {{T_PAUSA}}            default 0 s — vedi §1.3
```

## 0.2 Quello che non si chiede

Deciso una volta per tutte. Si applica senza ridiscuterlo a ogni video.

- **molte slide a piena inquadratura**: una per concetto e una per ogni elenco,
  non solo per le frasi a effetto;
- **la voce si genera fuori da HeyGen** e si accelera in post;
- **gli aneddoti si inventano**, in prima persona, senza segnaposti e senza
  chiedere;
- **il ritmo è uno solo**: 1,12× con pause di 0,14 s. Non esistono eccezioni;
- **niente avatar scontornato** e niente grafiche sopra l'avatar, quando
  l'avatar c'è;
- **sottotitoli SRT** sempre, impressi solo su richiesta.

---

# 1. Valori derivati — l'aritmetica

Da `{{DURATA}}` esce tutto il resto. Le costanti vengono da undici lezioni
montate, non da una stima.

## 1.1 Quanto testo scrivere

```
T_parlato  = {{DURATA}} − {{T_COVER}} − {{T_CLOSING}} − {{T_PAUSA}} − T_pose
CARATTERI  = T_parlato × 18
```

**18 caratteri al secondo** è la velocità di lettura finita: voce generata,
silenzi tolti, `atempo=1.12` applicato. Misurata fra 17,3 e 18,7 su quattro
lezioni consecutive; 18 è il centro e sbaglia di pochi secondi.

> **Ma dipende dalla voce e da quanti numeri ci sono.** Su una lezione
> normativa letta da una voce italiana informativa (GianP, `eleven_v3`) la
> misura è stata **16,8**: sotto la fascia. Scomposta, dice una cosa più utile
> di una media:
>
> | | car/s |
> |---|---|
> | prosa | **17,6** |
> | blocchi fitti di numeri di legge e anni | **11,8** |
>
> «1974» sono quattro caratteri e nove sillabe. Un blocco che elenca sette
> date costa il doppio del tempo che i caratteri promettono. Se la lezione è
> di quelle — norme, cifre, articoli — **conta 17 sul parlato normale e metti
> in conto un supplemento per le slide dei numeri**, oppure accetta che il
> montato esca più lungo del previsto.
>
> Con una voce nuova, la prima lezione serve anche a misurarla: si divide la
> somma dei caratteri per il parlato totale dopo il ritmo, e da lì in avanti
> si usa quel numero.

`T_pose` sono i secondi che si regalano ai blocchi corti perché respirino
(§1.4): in pratica **10–20 s** su un video da sei minuti.

**Esempio, `{{DURATA}}` = 6:00 e nessuna pausa musicale:**
```
360 − 3 − 10 − 0 − 15  =  332 s di parlato
332 × 18               ≈  5.980 caratteri di copione
```

Un errore ricorrente: gli script che arrivano sono quasi sempre **corti della
metà**. Uno script da 3.500 caratteri fa un video da tre minuti e mezzo, non da
sei. Va riscritto, non allungato (§6).

## 1.2 Quanti blocchi e quante scene

```
BLOCCHI  = CARATTERI ÷ 120        un blocco è una slide: 100–150 caratteri
SCENE    = BLOCCHI + 2            copertina e chiusura
         (+1 per ogni pausa senza voce)
```

**Il limite duro è 50 scene per video.** Sopra quello HeyGen rifiuta. Quindi:

```
BLOCCHI_MAX = 50 − 2 − (numero di pause)
```

Se i caratteri chiedono più blocchi del limite, **non si aggiungono scene: si
allungano i blocchi**. Un blocco da 170 caratteri va benissimo; un video da 52
scene non esiste.

| `{{DURATA}}` | caratteri | blocchi | scene | sta nel limite? |
|---|---|---|---|---|
| 4:00 | ~3.900 | ~33 | 35 | sì |
| 5:00 | ~4.900 | ~41 | 43 | sì |
| 6:00 | ~5.980 | ~48 | 50 | **al pelo** |
| 7:00 | ~7.000 | ~58 | 60 | **no** — blocchi da 150+ caratteri |
| 8:00 | ~8.100 | ~67 | 69 | **no** — o si spezza in due video |

La tabella è a 18 car/s. Con una voce più lenta i caratteri scendono in
proporzione: a 16,8 un montato da 8:00 ne chiede ~7.800, non 8.100. E il
tetto di 48 blocchi non si muove, quindi **8:00 resta l'ultimo minutaggio che
sta in un video solo**: oltre, i blocchi vanno sopra i 190 caratteri e la
slide non regge tre righe.

## 1.3 La pausa senza voce

Facoltativa. Serve dove il discorso ha bisogno di respirare, e va **dichiarata
nei parametri** perché toglie secondi al parlato.

```
{{T_PAUSA}}   default 0
              9 s è la misura giusta quando serve
```

Nove secondi, non venticinque: venticinque è la misura che gli script chiedono
e che alla prova risulta lunga. La scena porta il proprio audio (musica
strumentale), altrimenti non dura.

## 1.4 Le pose

Un blocco di poche parole dura quanto ci mette a dirle, non quanto ci mette lo
spettatore a leggere la slide. «Perché.» dura 1,3 secondi.

```
regola   ogni blocco sotto 3,5 s  →  allungato con apad a 4–6 s
quanti   3–9 per video
costo    la somma va in T_pose (§1.1)
```

---

# 2. Parametri fissi e parametri di stile

## 2.1 Fissi — non dipendono dal progetto

```
voce        ElevenLabs, modello eleven_v3 per il parlato lungo
            generations_count: 1        ← il default è 4 e costa quattro volte
limite      5.000 caratteri per generazione → un copione da 6.000 sta in due,
            spezzate su uno stacco di capitolo
velocità    1,12× applicata in post con ffmpeg (non esiste il parametro a monte)
filtro      silenceremove start_silence=0.03 stop_silence=0.14 soglia −45 dB
            serve un ffmpeg completo: la build che arriva con Playwright non
            ha atempo, silenceremove, apad né l'encoder mp3. `pip install
            imageio-ffmpeg` ne porta uno statico che li ha tutti
copertina   {{T_COVER}} — fra il titolo e la prima parola non deve esserci attesa
chiusura    {{T_CLOSING}}
slide       nessuna durata propria: la prende l'audio che ci sta sopra
clip        5 s di sorgente, in loop o freeze sotto la voce
```

## 2.2 Di stile — vengono da `{{COLORI}}`

I tre colori obbligatori generano tre temi di slide. I due opzionali ne
aggiungono altrettanti; se mancano, si ricavano dal fondo e dal testo.

| tema | fondo | testo | quando si usa |
|---|---|---|---|
| chiaro | `{{BG}}` | `{{FG}}` | il default, la maggior parte delle slide |
| tenue | `{{BG_TENUE}}` | `{{FG}}` scurito | le slide degli errori, delle trappole |
| profondo | `{{BG_PROFONDO}}` | `{{ORO}}` | i memo, le frasi che devono restare |

`{{ORO}}` è l'accento: sopratitoli, virgolette caporali, numeri, la metà della
frase che porta il senso. **Non si usa per il corpo del testo.**

**Se il committente ha un marchio, i colori si campionano dal file, non si
stimano e non si chiedono a voce.** I due colori più frequenti fra i pixel
opachi del logo sono la palette, con le percentuali a dire quale dei due è il
fondo e quale l'accento. Su una lezione lo script diceva «arancio `#F39200`» e
il marchio diceva rosso: aveva ragione il marchio.

Tre cose che il marchio impone, e che si scoprono solo guardando le slide:

- **l'accento del marchio può non reggere sul fondo profondo.** Rosso su verde
  vibra e perde contrasto. Lì l'accento diventa il bianco, e la gerarchia la fa
  il **peso** del carattere invece di un secondo colore;
- **se l'accento è il rosso, il barrato degli errori non può essere rosso.**
  Diventa grigio neutro, altrimenti ogni accento legge «sbagliato»;
- **il marchio in alto a sinistra ruba la riga del sopratitolo.** Il margine
  superiore va rifatto, su tutte le slide.

**Il marchio.** In alto a sinistra su ogni scena, copertina e chiusura
comprese. Si incorpora come data URI, come i caratteri. Due accortezze:

```
rifilare   i PNG dei loghi hanno quasi sempre trasparenza di troppo su un
           lato: sbilancia qualunque cosa ci si metta intorno
altezza    ~70 px su 1080. Deve restare una RIDUZIONE rispetto ai pixel del
           file, altrimenti si sgrana: un logo da 97 px di altezza non va
           messo a 120
```

> Sul fondo profondo il marchio a colori sparisce. Se non c'è una versione in
> negativo, va su una **piastra bianca** con un po' di respiro: è la soluzione
> che i manuali di identità prescrivono e non tocca il marchio. Chiedere il
> negativo resta meglio.

Nel generatore di slide questi cinque valori stanno in una riga sola, in cima:

```js
const IVORY='{{BG}}', NAVY='{{FG}}', GOLD='{{ORO}}',
      SAND='{{BG_TENUE}}', DEEP='{{BG_PROFONDO}}';
```

**Caratteri.** Due famiglie, mai una sola: una con grazie per le frasi, una
lineare per etichette, elenchi e numeri. I woff2 vanno **incorporati come data
URI** — Chromium, dove le slide si renderizzano, non raggiunge Google Fonts e
altrimenti escono i font di sistema.

> Attenzione ai numeri: molti caratteri con grazie hanno le cifre minuscole
> (`old-style figures`), che in un numero grande sembrano un errore. I numeri
> vanno scritti con la lineare.

---

# 3. La pipeline

Otto passi. Cambiano solo i valori delle variabili.

## Passo 1 — Riscrivere il copione a `CARATTERI`

Lo script di partenza si legge, si tiene la struttura, e si riscrive fino alla
lunghezza calcolata in §1.1. Quello che si aggiunge è il **come**, mai il
riempitivo: vedi §6.

Poi si spezza in blocchi. Un blocco è **quello che sta sopra una singola
inquadratura**: 100–150 caratteri, un concetto, mai due.

```
blocchi.json   [{"id": "s02", "text": "..."}, ...]
```

Convenzioni del testo parlato:

- **niente vocali accentate**: si scrivono con l'apostrofo (`perche'`, `e'`).
  Le accentate restano nelle slide, dove si vedono;
- **cinque o sei tag di intenzione in tutto** (`[serious]`, `[curious]`,
  `[warm]`, `[thoughtful]`), messi alle svolte vere del discorso. Non uno per
  blocco;
- niente `<break>`: le pause si fanno tagliando, non chiedendole al modello.

## Passo 2 — Generare la voce in due tracce

Una traccia continua per metà video, non una per blocco: le tracce separate
non hanno lo stesso timbro fra loro e si sente. Lo stacco fra le due va su un
cambio di capitolo, dove il cambio di tono è voluto.

```
chunkA.txt   blocchi fino allo stacco     < 5.000 caratteri
chunkB.txt   blocchi dopo lo stacco       < 5.000 caratteri
```

> **La voce si genera quando il copione è fermo, mai prima.** In 1.7 avevo
> generato la traccia A e poi rivisto i blocchi: la revisione ha invalidato la
> traccia, e rigenerarla è costato $0,75 buttati. Non c'è modo di correggere
> mezza traccia — o è quella giusta, o si rifà tutta.

**Dopo ogni ri-spezzettatura automatica, i `chunk` si rileggono contro lo
script.** In 1.7 un giro di ri-spezzettatura ha fatto sparire in silenzio due
passaggi — la definizione di referto e la frase sul fascicolo sanitario
regionale. Nessun controllo li avrebbe presi: il conto dei caratteri tornava,
i vincoli pure. Il controllo automatico verifica la forma; **non sa che cosa
doveva esserci**. Quello lo sa solo chi rilegge.

## Passo 3 — Ritagliare i blocchi dalla traccia (il passaggio che decide tutto)

```
tagli.py allinea   sceglie i confini e prepara prova.mp3
                   ↓ trascrivere prova.mp3
verifica.py        dice quali confini cadono fuori posto
tagli.py correggi  li sposta
                   ↓ ripetere finché "fuori posto: 0"
tagli.py applica   scrive i blocchi + le pose
```

Come sceglie i confini:

> **Le pause si cercano sul grezzo, non sulla traccia lavorata.** È l'errore
> che costa di più, ed è nascosto: `silenceremove` con `stop_silence=0.14`
> pareggia *tutte* le pause a 0,14 s. Dopo il filtro la lunghezza della pausa —
> che è il segnale su cui si basa tutta la scelta — **non esiste più**. Il
> filtro cancella l'informazione che serve a usarlo. Quindi: confini sul
> grezzo, ritmo applicato dopo, blocco per blocco.

Sul grezzo, due strade. La seconda funziona meglio.

**Per pause** (quella storica): i candidati sono **solo le pause più lunghe**,
poco più numerose dei confini da collocare. Fra un blocco e l'altro la pausa è
quasi sempre la più lunga lì intorno; il respiro di metà frase non deve entrare
nell'elenco, altrimenti il confine ci si appoggia e taglia **dentro** al blocco.
La posizione attesa si stima sui caratteri, **nel dominio del parlato** (al
netto dei silenzi), e poi si corregge con un **secondo giro**: lo scarto del
primo, spianato su una decina di confini, è la velocità di lettura che varia
(l'apertura è più lenta del resto, fino a quattro secondi e mezzo di scarto).
L'assegnamento pausa→confine deve essere **monotono**, non greedy: due confini
che si appoggiano alla stessa pausa producono blocchi da centesimi di secondo.

**Per punteggiatura** (allineamento DTW): la voce mette le pause dove il testo
ha la punteggiatura. Si spezza il copione a `. : ; ,` e l'audio negli spezzoni
fra un silenzio e l'altro, e si allineano le due sequenze con una
programmazione dinamica monotona, minimizzando lo scarto fra la durata di uno
spezzone e i caratteri che dovrebbe contenere. Un solo spezzone può prendersi
**più pezzi di testo**, perché non si fa pausa a ogni virgola: su una traccia,
113 pezzi di testo per 96 spezzoni. I confini di blocco cadono sempre a fine
frase, quindi cadono sempre su un confine dell'allineamento.

Misurato sulla stessa traccia: la prima strada sbagliava **17 blocchi su 48**,
la seconda **2 su 48**.

**La verifica non è opzionale.** Da sola, la scelta automatica sbaglia: su una
lezione ha sbagliato quarantacinque confini su quarantacinque, e le durate dei
blocchi sembravano tutte plausibili. Si estraggono 1,6 s prima di ogni taglio,
si concatenano separati da 2,5 s di silenzio, si trascrivono in una volta sola:
il testo dice parola per parola dove cade il taglio.

Come si legge la trascrizione, senza sbagliare a propria volta: i 2,5 s di
silenzio fanno sì che il trascrittore renda ogni spezzone come **una frase a
sé**, quindi c'è una frase per confine. Ma non basta confrontare la frase con
la coda attesa: **gli spezzoni corti fanno sballare il confronto**. «974» è la
coda giusta di «...225 del 1974» e somiglia zero a sette parole di attesa;
«1 5» è come il trascrittore scrive «uno punto cinque». Un confronto ingenuo
segnalava nove confini fuori posto, di cui **sette falsi allarmi**.

Il confronto che regge: per ogni frase sentita si cerca, fra **tutti i
fini-frase del blocco che precede e di quello che segue**, quello la cui coda
le somiglia di più — sui caratteri, non sulle parole. Se vince un fine-frase
del blocco *seguente*, il taglio è in ritardo, e si sa **di quante frasi**.
Così i due confini davvero fuori posto vengono fuori da soli, e si spostano
indietro di una pausa.

Una **controprova mirata** sui soli confini corretti e sui loro vicini costa
pochi centesimi e chiude il giro: non serve ritrascrivere tutta la prova.

Se anche la prova resta ambigua, **controprova**: cinque secondi a cavallo di
tre confini sospetti, trascritti da soli. Costa una manciata di crediti e non
lascia dubbi.

### `correzioni.json` non è un registro

`tagli.py correggi` **modifica lo stato sul posto**: legge `confini-X.json`,
sposta i confini indicati e riscrive il file. Quindi rilanciarlo con una
correzione che ha già applicato la applica **una seconda volta**, e il confine
se ne va di due pause invece di una.

Quando serve una seconda correzione sulla stessa traccia, il giro giusto è:

```
tagli.py allinea    rifà i confini da zero (nessun costo: solo ffmpeg)
                    ↓ correzioni.json con TUTTE le correzioni insieme
tagli.py correggi
tagli.py applica
```

Non è pignoleria di procedura: fatto così, `correzioni.json` **descrive
davvero** come si passa dal grezzo ai blocchi, e la lavorazione si può
rifare da capo. Fatto a incrementi, descrive solo l'ultimo ritocco.

### Se il caricamento di file è bloccato

Può succedere che le funzioni di caricamento asset del fornitore di voce siano
negate da una regola di permessi. Allora `prova.mp3`, che è un file locale, non
si può far trascrivere — ed è successo, costando una lezione consegnata con la
verifica aperta.

**Non è un muro.** La traccia appena generata ha già un URL firmato pubblico,
valido un paio d'ore, e la funzione che attacca un riferimento *da URL* fa da
sola tutto il giro: scarica, registra l'asset, mette il nodo sul flow. Si
passa quell'URL e si trascrive la **traccia intera**.

Cambia cosa si dimostra, e va detto onestamente:

| | `prova.mp3` | traccia intera |
|---|---|---|
| buchi nel parlato | solo intorno ai tagli | **su tutto il testo** |
| posizione dei tagli | sì, è il suo scopo | **no**: la trascrizione non porta i tempi |
| costo su ~9 minuti | ~$0,17 | ~$0,58 |

Le due verifiche non si sostituiscono: la seconda è più larga sul contenuto e
cieca sui confini. Quando si può, si fanno tutte e due. Quando si può farne
una sola, quella sulla traccia intera prende l'errore più caro — la voce che
salta parole — e i confini restano affidati all'allineamento e al controllo
statistico offline.

> **Una trascrizione che ripete il copione non è una trascrizione.** Se si
> chiede la trascrizione collegandola al *nodo che ha generato la voce*
> invece che a un asset audio, torna il testo di partenza, identico: apostrofi
> di comodo (`piu'`, `attivita'`) e tag di intenzione (`[warm]`) compresi. La
> verifica dice allora 100% per costruzione, e non ha guardato l'audio. Il
> segnale d'allarme è proprio quello: **nessuna voce può pronunciare un
> apostrofo o una parentesi quadra**. Se il testo tornato li contiene, si
> butta e si rifà da un asset audio.

**L'URL firmato scade in un paio d'ore.** Se la trascrizione arriva più tardi
— e con due tracce da nove minuti arriva più tardi — l'URL non c'è più e la
traccia va ricaricata da qualche parte che ne dia uno nuovo. Il servizio di
montaggio va benissimo: accetta mp3 e restituisce un URL pubblico.

> **E qui la trappola.** Il caricamento della traccia grezza viene rifiutato
> con `Stored file type not supported: application/octet-stream`, mentre lo
> stesso identico giro con un mp3 di blocco passa. Non è il trasporto e non è
> il tipo dichiarato: è il **tag ID3 da ~17 KB** che il generatore di voce
> scrive in testa alla traccia. Chi riceve il file lo annusa dai primi byte e
> non trova l'audio. Si toglie senza ricodificare:
>
> ```
> ffmpeg -i grezzo-B.mp3 -map_metadata -1 -c:a copy pulito.mp3
> ```
>
> Stessi campioni, 17 KB in meno, caricamento accettato. La lezione generale:
> quando un errore parla di *tipo di file* e il file è palesemente giusto,
> guarda che cosa c'è **prima** dei dati, non i dati.

**I numeri pronunciati per esteso sono la resa che ricorre di più**, e non si
trattano a mano: il copione scrive «739», la voce dice «settecentotrentanove»
e il trascrittore lo riscrive a parole — o in cifre, senza costanza (sulla
stessa lezione 1.8, la traccia A a parole e la B in cifre). La regola
dichiarata è un convertitore dei cardinali italiani in cifre applicato ai
**due** testi, che gestisce le forme incollate e le elisioni (`trentotto`→38,
`duecentocinquantuno`→251, `millenovecentonovantaquattro`→1994) e lascia
stare la parola quando non è un numero. Su 1.8 ha portato gli scarti
segnalati da 16 a 2.

Il confronto parola per parola va normalizzato, ma **una resa per volta e
dichiarata**, mai con una tolleranza generica: la sigla sillabata («elle esse
enne ti uno») torna incollata dal trascrittore («LSNT1»), «uno punto cinque»
torna «1.5», «Azienda Zero» torna «Azienda 0». Si segnalano le sequenze
mancanti da **tre parole in su**: è la lunghezza a cui un buco vero si vede e
il rumore no.

### Come non liquidare un segnale dubbio

Quando la trascrizione rende male una parola, la tentazione è archiviare. Una
volta l'ho fatto e la voce aveva davvero mangiato sei parole. Il modo di
decidere senza riascoltare, in ordine di forza:

1. **la stessa parola altrove nella stessa sessione.** Se in un'altra traccia
   il trascrittore la rende giusta, la voce sa dirla;
2. **il contesto fonetico.** Una vocale finale che sparisce davanti a una
   congiunzione che comincia per vocale è elisione, non omissione;
3. **la durata del blocco.** Se mancassero delle sillabe il blocco sarebbe più
   **veloce** della media. Se è più lento, non manca niente.

Se i tre indizi non concordano, si riascolta o si rigenera.

### E lo stesso vale per un confine sospetto

Il controllo statistico offline segnala le coppie adiacenti di segno opposto:
un blocco più corto del previsto accanto a uno più lungo, che è la firma di un
confine spostato. Ma il modello pesa male le cifre, e due blocchi fitti di
numeri di articolo possono dare la stessa firma **senza** che ci sia niente
di storto: è successo in 1.3, ed era un falso allarme.

Il modo di decidere non è ragionare sul modello: è **fare il conto
sull'audio grezzo**. Si guardano le pause rilevate intorno al confine, si
prende lo spezzone di parlato fra le due pause candidate, e si divide per i
caratteri della frase che dovrebbe contenere.

In 1.7, fra 124,57 e 130,02 ci sono 5,4 s di parlato per una frase da 60
caratteri: col confine dove l'aveva messo l'allineamento (127,59) quella frase
sarebbe stata detta a **20,5 car/s di grezzo**, contro i 14-16 di questa voce.
Confine sbagliato, senza ambiguità e senza riascoltare. Col confine sulla
pausa da 0,73 s a 130,0 il conto torna a 14,2.

La differenza fra i due casi è tutta qui: il pregiudizio del modello sposta
la **stima**, non l'audio. L'aritmetica sul grezzo non ha pregiudizi.

E c'è un caso in cui il controllo statistico va usato sapendo che vede poco.
La soglia di allarme è **1,5 volte la dispersione della traccia**: su un testo
pieno di date e numeri di legge il modello sbanda su ogni blocco, la
dispersione raddoppia (1,21 s sulla traccia A di 1.8 contro i 0,5-0,6 tipici)
e con essa la soglia. Il controllo non è rotto: è **cieco in proporzione**.
Su una traccia così non ci si appoggia — si legge la tabella dei blocchi a
mano e si fa l'aritmetica sul grezzo dove qualcosa non torna.

Ritarare il peso delle cifre sulla lezione che mette in crisi il modello è la
tentazione da evitare: si aggiusta quella e si sbaglia sulle altre sette.

## Passo 4 — Renderizzare le slide

Due generatori dallo stesso file di layout, così la versione ferma e quella
animata non divergono:

```
cards_*.mjs    PNG fermi     → per guardarli e correggerli
clips_*.mjs    fotogrammi    → poi mp4 a 25 fps
```

Il tempo non scorre da solo: ogni fotogramma sposta a mano l'orologio delle
animazioni, così il render è identico a ogni esecuzione.

**Regola di ritmo**: il movimento entra e poi finisce. Sotto i quindici secondi
di parlato una slide che continua a muoversi diventa rumore. In montaggio la
scena va messa con `playback.mode = "freeze"`.

**Guardare i PNG è parte del lavoro, non un extra.** Su undici lezioni, sette
icone e quattro diagrammi sono stati rifatti dopo averli visti: un'icona che
non si legge a colpo d'occhio non serve a niente, e questo non si scopre
leggendo il codice.

### Le figure: tabelle, grafici, diagrammi, icone

Un corso fatto di sole parole in pagina non e' un video: e' una dispensa letta
ad alta voce. Le figure stanno in `grafica.mjs`, accanto a `layout.mjs`, e sono
un vocabolario chiuso — tredici tipi piu' una serie di icone vettoriali — non
un disegno diverso per ogni slide.

| Famiglia | Tipi | Quando |
|---|---|---|
| dati | `barre` `impila` `assetempo` `scadenza` | c'e' una **quantita'** vera |
| struttura | `tabella` `matrice` `albero` `venn` | ci sono **due o piu' dimensioni** da incrociare |
| sequenza | `catena` `scala` `piramide` | c'e' un **ordine** o una gerarchia |
| insiemi | `griglia` `icone` | c'e' un **elenco** che merita forma |

**Il colore dei dati si calcola, non si sceglie a occhio.** Il verde e il rosso
del marchio, accostati in un grafico, hanno **ΔE 3,4 in protanopia**: per un
daltonico sono la stessa tinta. La serie categoriale passa i sei controlli
(banda di chiarezza, croma, separazione CVD, soglia a vista normale, contrasto
sul fondo) ed e' `#00623A · #B07A12 · #3E6FA8 · #D70328`. Regola che ne discende
e che vale sempre: **il colore non porta mai da solo un significato** — ogni
serie ha l'etichetta attaccata, e giusto/sbagliato portano anche il segno (✓ ×).

**I dati non vanno sul fondo scuro.** Sul verde pieno le tinte che rispettano la
banda di chiarezza per fondo scuro non arrivano a 3:1 di contrasto. Invece di
forzarle, `layout.mjs` rifiuta il render: sul verde restano le slide di
affermazione, i dati stanno sul bianco.

**Una figura che esce sempre uguale non e' un grafico.** Una ciambella che
disegna 150 su 150 e un quadrante che segna 48 ore su 48 sono sempre pieni:
non dicono niente. Al loro posto stanno `impila` (la composizione: 150 crediti
sono tre anni da 50) e `scadenza` (la finestra di tempo con **due** soglie:
subito se c'e' pericolo, 48 ore altrimenti).

**La linea del tempo va in scala.** Fra il 1974 e il 1992 ci sono diciotto anni,
fra il 1999 e il 2000 uno: una timeline a passo fisso dice il contrario di
quello che e' successo. `assetempo` posiziona le tappe sull'asse vero, con la
griglia dei decenni dietro.

#### Tre trappole, tutte e tre costate un giro di render

1. **Nel testo di un SVG il markup non esiste.** `<b>` non e' un elemento SVG:
   finisce renderizzato come un pezzo di testo a se', fuori posto. Nei `<text>`
   gli asterischi si tolgono (`piano()`); dove serve il grassetto si usa
   `foreignObject`.
2. **Un `<text>` SVG non va a capo.** Due tappe vicine si sovrappongono e non
   se ne accorge nessun controllo automatico. Le didascalie stanno in
   `foreignObject`, e la loro larghezza non e' fissa: e' quella che ci sta fino
   alla tappa vicina **della stessa riga** — l'alternanza sopra/sotto separa le
   vicine, non quelle due posizioni piu' in la'.
3. **Un riquadro SVG ad altezza fissa taglia il testo piu' lungo.** L'albero di
   decisione e' in HTML, dove i riquadri crescono col contenuto.

#### Le soglie stanno nella libreria, non nelle scene

Come per gli elenchi: `griglia` si stringe da sola oltre le sei caselle su una
colonna, `icone` oltre le quattro. Se la soglia sta nelle scene, ogni lezione
se ne dimentica per conto suo.

### Il controllo di traboccamento, e come si sbaglia a scriverlo

Un controllo automatico che il testo non esca dalla cornice serve, perché una
slide tagliata in fondo si nota solo se si guarda proprio quella. Ma è facile
scriverlo in modo che non veda niente, e allora è peggio che non averlo: dà
la sicurezza senza darne il motivo.

Il modo sbagliato — usato per quattro lezioni prima di accorgersene:

```js
const c = document.querySelector('.corpo');
sfora = c.scrollHeight - c.clientHeight;      // sempre 0
```

Non funziona quando il contenitore è un **flex item con `flex:1`**. Un
elemento così, se il contenuto è troppo alto, non scrolla: **cresce**, perché
il suo `min-height` vale `auto`. `scrollHeight` resta uguale a `clientHeight`
e il controllo tace. A tagliare è l'antenato con `overflow:hidden`, cioè la
slide.

Il modo giusto è **geometrico**: il rettangolo del corpo contro la cornice
interna della slide, padding compreso.

```js
const rc = corpo.getBoundingClientRect(), rs = slide.getBoundingClientRect();
const st = getComputedStyle(slide);
sfora = Math.max(0, rc.bottom - (rs.bottom - parseFloat(st.paddingBottom)))
      + Math.max(0, (rs.top + parseFloat(st.paddingTop)) - rc.top);
```

Alla prima esecuzione con la versione giusta sono uscite sei slide fuori, di
cui tre che a occhio non avevo ancora notato.

**Regola generale**: quando un controllo automatico non ha mai trovato niente,
non è una buona notizia finché non gli si è dato qualcosa da trovare. Un
controllo che non è mai scattato va messo alla prova apposta.

### Gli elenchi lunghi si stringono da soli

Sette voci non stanno alla misura piena di una che ne ha tre. La soglia va
messa **nel layout**, non nelle singole scene: `voci.length >= 7` accende una
variante compatta (corpo da 40px invece di 47, interlinea e spazi ridotti).
Così una lezione futura non se ne può dimenticare, che è l'unico modo perché
una regola di questo tipo regga.

## Passo 5 — Riprese e immagini generate

Evocative e coerenti col discorso, **mai decorative**: la porta chiusa quando
si parla di bussare, il corridoio quando qualcuno si allontana, la cucina vuota
con due tazze quando la discussione è finita.

Suffisso di stile fisso, in coda a ogni prompt:

> *fotografia documentaristica editoriale, luce naturale morbida, palette
> desaturata, poca profondità di campo, nessun volto riconoscibile, niente
> testo in sovrimpressione.*

## Passo 6 — Caricare tutto come asset permanenti

Un batch solo per video: le clip mp4, gli mp3 dei blocchi, l'eventuale musica.
Si presigna, si fa il PUT dei byte, si chiude il batch, si aspetta che tutti
gli item siano `completed`.

> La dimensione dichiarata deve essere **esatta**: è firmata nell'URL, e un
> byte di differenza dà 403.

## Passo 7 — Montare in una sola chiamata

Una lista ordinata di scene, ognuna con la sua clip e il suo audio:

```
copertina   clip muta + traccia di silenzio da {{T_COVER}}
blocco      clip + mp3 del blocco, playback freeze, muta
pausa       b-roll + musica, playback loop, muta
chiusura    clip muta + traccia di silenzio da {{T_CLOSING}}
```

> **Una scena video prende la durata della VOCE, non quella della clip.** È la
> trappola più cara del passo 7. Se a una scena video non dichiari un audio, la
> piattaforma la tronca a **due secondi** — anche se la clip ne dura dodici, e
> anche se la documentazione dice che senza voce «plays full-length». Misurato:
> un montato di 50 scene uscito **109 secondi invece di 536**.
>
> Non ci si salva montando l'audio dentro la clip: la scena resta troncata lo
> stesso. Serve l'`audio_asset_id` dichiarato sulla scena, con `playback` a
> `freeze`. Cioè: esattamente quello che questo passo prescrive. La tentazione
> di dimezzare gli asset da caricare montando l'audio nelle clip costa un giro
> di caricamenti e un render buttato.

> Le scene **senza parlato** — copertina e chiusura — non hanno bisogno della
> traccia di silenzio: una scena da **immagine ferma** prende una `duration`
> esplicita in secondi e la rispetta. La traccia di silenzio serve solo se la
> copertina deve essere una clip video invece di un fermo immagine.

### Caricare e aspettare

Il lotto di caricamento tiene **fino a 100 file**: 48 clip, 48 mp3 e le due
immagini stanno in un lotto solo. Non serve dividerli.

Il conteggio per stato del lotto **resta indietro**. Può dire `completed`
nell'aggregato con decine di elementi ancora `processing`, mentre quegli
stessi asset, interrogati uno per uno, hanno già il loro URL. Fa fede
l'aggregato; nel dubbio si controlla il singolo asset, non il conteggio.

Un montato di **nove minuti e cinquanta scene si renderizza in tre o quattro
minuti** (misurati: 179 s e 211 s). Serve saperlo per non scambiare
un'attesa normale per un blocco e lanciare un secondo render inutile —
errore commesso, un render buttato. Prima di rilanciare, confronta il tempo
trascorso con questo metro.

## Passo 8 — Registro

Un file per video, con: identificativo e durata reale, di quanto è stato
riscritto il copione e cosa ci si è aggiunto, la tabella delle grafiche, la
tabella delle riprese, quante tornate di correzione hanno richiesto i tagli, le
pose, e — in fondo — **cosa resta da giudicare a chi guarda**, cioè tutto
quello che non ho potuto verificare io.

---

# 4. Regole di contenuto

**Slide.** Molte, a piena inquadratura, una per concetto. Un elenco è una
slide, non tre righe in un angolo. Il testo è corto: se non entra in tre righe,
il blocco è due blocchi.

**Grafiche.** Ogni elemento grafico deve portare il significato di quello che
si sta dicendo in quel momento. Se serve solo a far muovere qualcosa, si
toglie. I tipi che funzionano: tabelle a due colonne per i confronti, elenchi a
rivelazione progressiva per le liste ordinate, barre per i confronti di
quantità, sostituzioni con la freccia per i «questo invece di quello», numeri
grandi per le cifre che sono la frase.

**Avatar.** Se c'è: mai scontornato, mai coperto da grafiche, mai in split con
la slide. O parla lui a tutto schermo, o parla la slide.

**Ritmo.** 1,12× con pause di 0,14 s, senza eccezioni. Le pause che il copione
chiede vanno *rese davvero*, allungando il blocco: una pausa accennata non è
una pausa.

---

# 5. Controlli prima di consegnare

- [ ] `verifica.py` dice **fuori posto: 0** — oppure, se il caricamento di file
      è bloccato, `verifica-testo.py` sulla traccia intera dice **buchi: 0** e
      `verifica-locale.py` non trova **coppie adiacenti di segno opposto**
- [ ] nessun blocco fuori dalla fascia 8,5–21 caratteri al secondo
      (**i blocchi fitti di numeri escono in basso per costruzione**: sono
      sillabe, non caratteri. Vanno guardati, non corretti)
- [ ] tutte le slide guardate da ferme, almeno una volta
- [ ] le grafiche complesse (diagrammi, tabelle a tre righe) guardate **due**
      volte: le etichette si toccano più spesso di quanto sembri
- [ ] la musica delle pause verificata strumentale (la trascrizione torna
      vuota)
- [ ] numero di scene ≤ 50
- [ ] durata attesa entro dieci secondi da `{{DURATA}}`
- [ ] registro scritto, con la sezione «da verificare» compilata

---

# 6. Allungare un copione senza gonfiarlo

Vale la pena metterlo per iscritto, perché è il punto in cui si sbaglia di più.
Uno script da 3.500 caratteri diventa un copione da 6.000 **aggiungendo il
come**, non ripetendo il cosa.

Le sette cose che quasi sempre mancano:

1. **il test** — come fa uno a sapere di averlo fatto giusto? («sai dire perché
   l'ha fatto senza dover dire che ha fatto bene?»);
2. **il criterio di scelta** — fra due opzioni, quale e in base a cosa;
3. **perché funziona** — il meccanismo, non l'effetto;
4. **il contrario** — l'errore speculare, che chiarisce la regola;
5. **come si recupera** — cosa si dice quando è già andata male;
6. **quando non si applica** — il caso in cui la regola non vale;
7. **il risultato che si cerca davvero** — spesso più modesto di quello che il
   lettore immagina, e dirlo aumenta la fiducia.

Quello che **non** allunga: ripetere la tesi con altre parole, gli avverbi, le
premesse («come dicevamo»), gli esempi che ripetono l'esempio precedente.

---

# 7. Profili già compilati

Due istanze di questa scheda, da usare come riferimento.

## 7.1 Corso «Dire, ascoltare, convincere»

```
TEMA      lezioni di comunicazione, seconda persona singolare
COLORI    BG #F7F3EA · FG #12294A · ORO #C39A4E
          BG_TENUE #E2D2B0 · BG_PROFONDO #0B1B33
          frasi Cormorant Garamond · etichette e numeri Jost
DURATA    6:00 · copertina 3 s · chiusura 10 s · pausa 9 s dove serve
DERIVATI  ~5.700 caratteri · ~47 blocchi · 49–50 scene
VOCE      Luca Ward, eleven_v3
GENERATORE script/slide_corso.mjs
```

## 7.2 Video del canale

```
TEMA      episodi singoli, con avatar in campo
COLORI    BG #F6F3EA · FG #032B54 · ORO #C39951
          titoli Playfair Display 700 · sopratitoli Inter 600 spaziato
DURATA    variabile · copertina 3 s · chiusura 10 s
VOCE      Achille nuovo 1, eleven_multilingual_v2
GENERATORE script/cards.mjs
```

## 7.3 Corso concorso infermieri — CISL FP Padova Rovigo

```
TEMA      lezioni normative, seconda persona singolare
          otto micro-lezioni, Modulo 1
COLORI    campionati dal marchio: verde #00623A · rosso #D70328
          BG #FFFFFF · FG #1C1C1C
          tenue #FCF4F3 (velo di rosso) · profondo #004E2E
          frasi Source Serif 4 · etichette e numeri Inter
MARCHIO   slide/marchio/logo.png, rifilato, 70 px, in alto a sinistra
          su fondo profondo: piastra bianca
DURATA    8:00 minimo · copertina 3 s · chiusura 10 s · nessuna pausa
DERIVATI  ~8.800 caratteri · 48 blocchi · 50 scene (il tetto)
VOCE      GianP — News Info and Documentary, eleven_v3
          misurata: 17,6 car/s sulla prosa, 11,8 sui blocchi di numeri
GENERATORE progetti/<lezione>/slide/layout.mjs
```

Una lezione di questo corso costa, in voce e verifiche, **circa 3,20 dollari**:
due tracce continue e sei trascrizioni (due di traccia intera, due prove dei
tagli, due controprove mirate). Il preventivo che ElevenLabs restituisce prima
di generare è **circa il doppio** del costo reale.

Sui tipi di slide, questa è la distribuzione che è venuta fuori su 50 scene e
che vale come punto di partenza per le altre sette:

| tipo | quante | a cosa serve |
|---|---|---|
| frase | 9 | i passaggi di ragionamento |
| elenco a rivelazione progressiva | 11 | tre difetti, cinque attività |
| sostituzione con freccia | 5 | «non è X, è Y» |
| norma (sigla grande + una riga) | 4 | DPR, DM, leggi |
| trappola (barrato + correzione) | 4 | i distrattori dei quiz |
| memo | 3 | i punti finali, a rivelazione |
| timeline · fonti · copertina | 6 | |
| tre riquadri · confronto · citazione · numero · perimetro · titolo | 8 | |
