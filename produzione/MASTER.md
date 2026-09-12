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

- i candidati sono **solo le pause più lunghe**, poco più numerose dei confini
  da collocare. Fra un blocco e l'altro la pausa è quasi sempre la più lunga lì
  intorno; il respiro di metà frase non deve entrare nell'elenco, altrimenti il
  confine ci si appoggia e taglia **dentro** al blocco;
- la posizione attesa si stima sui caratteri, **nel dominio del parlato** (al
  netto dei silenzi), e poi si corregge con un **secondo giro**: lo scarto del
  primo, spianato su una decina di confini, è la velocità di lettura che varia
  (l'apertura è più lenta del resto, fino a quattro secondi e mezzo di scarto).

**La verifica non è opzionale.** Da sola, la scelta automatica sbaglia: su una
lezione ha sbagliato quarantacinque confini su quarantacinque, e le durate dei
blocchi sembravano tutte plausibili. Si estraggono 1,6 s prima di ogni taglio,
si concatenano separati da 2,5 s di silenzio, si trascrivono in una volta sola:
il testo dice parola per parola dove cade il taglio.

Se anche la prova resta ambigua, **controprova**: cinque secondi a cavallo di
tre confini sospetti, trascritti da soli. Costa una manciata di crediti e non
lascia dubbi.

E **contare i pezzi non basta**: lo scriba può saltare una coda (e allora quel
confine resta dov'è, senza che niente lo segnali) oppure saltarne una e
aggiungerne un'altra, e allora i conti tornano ma le finestre sono sfalsate.
L'unico controllo che li vede è il **rapporto caratteri/secondo blocco per
blocco**, letto dopo `applica`: fuori dalla banda 8-21 c'è quasi sempre un
confine sbagliato, e i vicini dicono da che parte. Due blocchi adiacenti a 5 e
a 55 caratteri al secondo sono un confine spostato, non due blocchi strani.

Due varianti utili. Se i confini da confermare sono più d'uno, si ritagliano i
tre secondi che precedono ognuno, si concatenano e si trascrive **una volta
sola**: la trascrizione torna a spezzoni, uno per confine. E se `correggi`
torna due volte sullo stesso confine spostandolo di poco, il problema non è
che manca il silenzio — è che ce ne sono troppi, perché lì la voce legge
parole staccate. Si guarda la mappa dei silenzi a mano (`silencedetect` a
`d=0.10` invece di 0,25) e si sceglie il punto invece di farlo scegliere
all'algoritmo.

E due avvertenze opposte. **Code mancanti consecutive non sono confini
sbagliati**: se i pezzi sono meno dei confini, lo scriba ha smesso di mettere
i punti e ha unito due o tre code in una frase sola — si guarda la banda, e se
quei blocchi stanno in banda era punteggiatura. **E un confine verificato non
si muove per far tornare un numero**: un blocco a 21-22 caratteri al secondo
con i confini confermati per contenuto e i vicini in banda è un passaggio
letto veloce, si annota e si va avanti.

Quando la catena è scalata di uno, il modo più solido di ricostruirla non sono
i caratteri grezzi ma il **tempo di parlato netto**: si somma il parlato fra i
due confini certi (silenzi esclusi), si divide in proporzione ai caratteri dei
blocchi in mezzo, e si aggancia ogni punto al silenzio più vicino.

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

> Una scena video **muta non dura quanto la clip**: senza un audio che la
> ancori, collassa. Le scene senza parlato vanno agganciate a una traccia di
> silenzio della lunghezza voluta.

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

- [ ] `verifica.py` dice **fuori posto: 0**
- [ ] nessun blocco fuori dalla fascia 8,5–21 caratteri al secondo
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
