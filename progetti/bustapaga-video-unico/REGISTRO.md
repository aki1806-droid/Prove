# Registro — «Leggere la busta paga. Sanità pubblica»

Video unico, circa un'ora, per CISL FP Padova Rovigo. Il copione arriva gia'
scritto dall'utente (`origine/SCRIPT_VIDEO_UNICO.md`) e si da' uno standard suo:
il MASTER §1 dice che in quel caso la durata dichiarata dal copione vince.

## Scheda

| | |
|---|---|
| scene | 218 (203 con parlato, 15 mute) |
| caratteri di parlato | 56.269, media 277 per scena |
| voce | «Achille nuovo 1» `KerPEYZvLEWNATg4AARX`, clonata, italiana |
| modello | `eleven_multilingual_v2` |
| tracce | 17, ognuna sotto i 5.000 caratteri |
| flow | `UhuFGSNr22nvcoYoValy` |

Voce e modello vengono dalla scheda tecnica dello script, non dal profilo del
corso OSS (GianP su `eleven_v3`): stesso committente, prodotto diverso. L'id e'
stato risolto con `creative_list_voices`, non ricordato a memoria.

## Aritmetica, misurata e non stimata

La traccia 1 (1.739 car) e' stata generata **da sola** prima delle altre, per
misurare questa voce invece di ereditare il CPS di un'altra. Costo: $0,29.

```
grezzo                 114,70 s   15,16 car/s
dopo silenceremove     110,9  s   15,68 car/s
+ atempo 1.06          104,6  s   16,62 car/s
+ atempo 1.12           99,0  s   17,56 car/s
rapporto grezzo/lavorato 1,158   (sul corso OSS era 1,30)
```

**Il rapporto 1,30 del MASTER non vale per questa voce.** «Achille nuovo 1»
lascia pause piu' corte, quindi `silenceremove` toglie meno. Proiettato sui
56.472 caratteri da sintetizzare:

| filtro | video intero | contro i 60 min dichiarati |
|---|---|---|
| `silenceremove` da solo | 60,7 min | **+0,7** |
| `silenceremove` + `atempo=1.06` | 57,3 min | −2,7 |
| `silenceremove` + `atempo=1.12` | 54,2 min | **−5,8** |

Lo script dichiara `atempo=1.12` **e** «circa 60 minuti»: con questa voce le due
cose non stanno insieme. E' un conflitto fra due righe dello stesso documento
dell'utente, e il MASTER §1 dice di portarlo a lui con i numeri di entrambe le
strade, non di scegliere in silenzio.

Il filtro si applica in locale dopo la generazione: la scelta non costa nulla e
si puo' fare in qualunque momento. Non blocca la sintesi.

## Costo

Il preventivo di questo modello **non e' pessimistico**: 305 crediti per 305
caratteri, cioe' un credito per carattere esatto (sul corso OSS, su `eleven_v3`,
il preventivo era ~2,2 volte il reale — qui no, e va riferito com'e').

```
17 tracce, 56.472 caratteri, generations_count=1   $9,33   fatto
```

Speso davvero, sommando le 17 generazioni: **$9,33**. Con `generations_count`
lasciato al default di 4 sarebbero stati $37,3.

## La voce, generata per intero

Tutte e 17 le tracce sono state generate, `generations_count=1`, nessun errore.
L'utente ha confermato che CCNL e importi sono fermi (vedi la sezione dopo) e ha
scelto il filtro senza `atempo`.

Misurato sulle tracce vere, non piu' proiettato:

```
grezzo totale      62,05 min
lavorato totale    59,10 min   (3.546,1 s, somma dei 203 blocchi)
+ scene mute          39 s     (copertina 3 + chiusura 10 + 13 card da 2)
MONTATO PREVISTO   59,75 min   contro i 60 dichiarati: -14,9 secondi
CPS reale          15,92 car/s (la traccia 1 da sola ne prometteva 15,68)

montato vero       59:46,79    (1,7 s in piu': l'arrotondamento al fotogramma
                                di 218 scene, vedi la sezione sul montaggio)
```

Ogni traccia sta dentro la fascia sana 8,5-21 car/s: la piu' lenta e' la 3 a
14,90, la piu' veloce la 9 a 17,27. Nessuna vicina ai bordi.

Il rapporto grezzo/lavorato medio e' 1,050, contro l'1,034 della sola traccia 1:
per questo la proiezione diceva 60,7 min e il totale vero e' 59,78. La
previsione fatta su una traccia sola ha sbagliato di meno di un minuto su
un'ora, ed e' bastata a scegliere il filtro giusto.

## Il conflitto sulla durata, come e' stato risolto

Lo script dichiarava sia «circa 60 minuti» sia `atempo=1.12`. Con questa voce
le due cose non stavano insieme. Portato all'utente con i numeri di entrambe le
strade, ha scelto la durata: **`silenceremove` da solo, senza `atempo`**.

Il risultato misurato gli da' ragione: 59,75 min, quindici secondi sotto l'ora.
Con `atempo=1.12` sarebbero stati circa 53 minuti.

## Quello che la checklist dello script lasciava aperto

Due caselle non spuntate riguardavano **fatti che la voce pronuncia**:

- lo stato del CCNL 2025-2027 (*ipotesi o definitivo*): 26 scene lo nominano,
  fra cui s022 «l'**ipotesi** di rinnovo equipara i neoassunti»;
- gli importi del fac-simile sulle tabelle AOUP 2026: 53 scene, e gli importi
  sono detti **a parole** — s037 «due euro e settantaquattro centesimi»,
  s058 «centotrenta euro e venti centesimi», s047 «firmato in via definitiva il
  ventisette ottobre duemilaventicinque».

Il controllo automatico «nessuna cifra nel parlato» passa proprio perche' sono
scritti in lettere: la forma e' giusta, il fatto puo' non esserlo.

Quelle scene toccano **tutte e 17 le tracce**: ho verificato, non ce n'era
nemmeno una libera da CCNL o importi, quindi non esisteva un sottoinsieme
«sicuro» da generare per primo. Una traccia non si corregge a meta'.

L'utente ha confermato che i fatti sono fermi, e su quella conferma si e'
generato. Resta scritto qui perche', se un importo o lo stato del CCNL dovesse
cambiare, si sappia subito quali tracce vanno rifatte e quanto costano: la
tabella qui sopra ha i caratteri di ognuna, a un credito per carattere.

## La verifica per trascrizione: 17 tracce su 17, nessun buco

E' il controllo che prende l'errore piu' caro, la voce che salta parole, e che
il conteggio dei caratteri NON puo' fare: un blocco che perde sei parole resta
dentro la fascia (280 caratteri in 17,5 s fanno 16 car/s; togline 40 e sono
18,7, ancora in fascia). La fascia dice come va il ritmo, non che cosa e' stato
detto.

Fatta come dice il MASTER: `creative_attach_reference_file` sull'URL firmato
della traccia, poi `creative_transcribe_audio` sull'ASSET. Collegarla al nodo
che ha generato la voce avrebbe restituito il copione identico, e la verifica
avrebbe detto 100% per costruzione senza aver ascoltato niente. La controprova
sul testo tornato lo conferma: accenti veri, nessun tag fra parentesi quadre,
numeri riscritti come si pronunciano.

```
17 tracce su 17 verificate · buchi da 3+ parole: ZERO
coincidenza per traccia: da 97,5% a 100%
```

Gli scarti che restano sono tutti di sola resa, e sono dichiarati uno per uno in
`verifica-testo.py`: separatore delle migliaia (28.000 contro ventottomila),
simbolo dell'euro che si mangia la parola, importi in centesimi, sigle puntate,
forme tronche (ventun, trent), composti con o senza trattino.

Due segnali dubbi NON archiviati ma decisi, col primo criterio del MASTER — la
stessa parola altrove nella stessa sessione:

- traccia 14, «cisl» reso «csl»; traccia 1, reso «Cisel». In sei altre tracce lo
  stesso trascrittore scrive «CISL» correttamente, quindi la voce sa dirlo: e'
  una sbavatura del trascrittore, non della voce.

E un errore mio, lasciato qui perche' e' istruttivo: la prima regola sul
separatore delle migliaia accettava anche lo spazio normale, e ha unito «dal
2027. 130,20 euro» in un solo numero, INVENTANDO un buco che non c'era. Una
tolleranza troppo larga non e' una resa dichiarata: e' esattamente cio' che il
MASTER dice di non fare. Ristretta al solo punto, il buco e' sparito.

## Costo misurato

```
voce, 17 tracce, 56.472 caratteri, generations_count=1     $9,33
trascrizione del testo, 17 tracce (+1 ripetuta, vedi sotto) $3,38
verifica dei confini, due provini da 12,7 min              $1,38
assaggio di Luca Ward, 756 caratteri su eleven_v3           $0,12
                                                           ------
                                                           $14,21
```

Con `generations_count` al suo default di 4 la sola voce sarebbe costata $37,3.

**$0,19 spesi per niente, dichiarati.** La trascrizione della traccia 16 e'
partita ma la chiamata e' andata in timeout senza restituire il session_id, e
senza quello il testo non e' recuperabile: il lavoro era fatto e pagato ma non
raggiungibile. Ho verificato sul flow che fosse davvero partita (per non
lanciarne una seconda alla cieca) e poi l'ho rilanciata di proposito, scegliendo
di pagare $0,19 invece di lasciare 2.650 caratteri senza verifica.

## Le slide: 218 scene, senza avatar

Scelta dell'utente: niente avatar. Ogni scena diventa una slide, che e'
esattamente il prodotto descritto dal MASTER — «micro-lezioni da slide e voce,
senza avatar». Stesso committente del corso OSS, quindi palette, caratteri e
vocabolario grafico si applicano senza riaprirli.

Le 15 scene mute (copertina, 13 card di capitolo, chiusura) sono di tipo
`copertina`: e' cosi' che `clips.mjs` le esclude dall'animazione da solo, e
restano esattamente 203 clip, una per mp3. Verificato che i 218 id e il loro
ordine coincidano con `blocchi.json`, e che le 15 mute dello script siano
esattamente le 15 `copertina`.

### L'equilibrio delle figure, misurato e corretto

Alla prima stesura il conto diceva che andava male: **109 scene su 203 erano
dello stesso identico tipo** (`frase`), il 66% del video era sola parola, e
c'erano 13 sequenze di tre o piu' scene consecutive uguali — una da sette e una
da otto. Il MASTER lo dice senza mezzi termini: «un corso fatto di sole parole
in pagina non e' un video: e' una dispensa letta ad alta voce». E lo script
dell'utente ha la stessa regola: mai due scene consecutive dello stesso tipo.

Riviste 18 scene dando a ciascuna il tipo che il suo contenuto chiedeva gia':
un confronto dove ci sono due casi, una citazione dove il parlato e' una
domanda fra virgolette, barre dove ci sono due percentuali, `tre` dove ci sono
tre quantita' contate.

```
                        prima    dopo
sequenze di 3+ uguali      13       0
figura o struttura        35%      43%      (il MASTER dice «due su cinque»)
scene di tipo frase       109      91
```

### Difetti trovati GUARDANDO, non dal controllo automatico

Il controllo di traboccamento ha sempre detto «nessuna slide sfora». Nei
provini sono usciti lo stesso:

- gli apostrofi al posto degli accenti sulle slide (41 occorrenze): la
  convenzione del parlato applicata per riflesso dove non vale;
- il numero di pagina che stampava `?` su tutte e 218 le slide;
- i valori dei grafici all'inglese: «7.1%» invece di «7,1%»;
- due note a destra delle barre che uscivano dalla slide;
- una scala a cinque gradini che stringeva le etichette fino a renderle
  illeggibili, e una griglia che lasciava mezza slide vuota.

**Il controllo di traboccamento ha un buco dichiarato:** misura il rettangolo
del corpo contro la cornice, e il testo di un SVG disegnato oltre il viewBox
esce senza ingrandire quel rettangolo. Le etichette dei grafici che escono dal
bordo NON le vede. E' il motivo per cui il MASTER dice di guardare i provini.

## Il montaggio, e i due difetti che ha trovato il controllo aggiunto

```
218 PNG  ->  203 clip animate (27 MB)  ->  203 scene con audio (106 MB)
             + 15 scene mute costruite da PNG + silenzio
             ------------------------------------------------
             montato-busta-paga-60min.mp4   59:46,79   104 MB
             montato-busta-paga-60min.srt   203 righe
```

Le 15 scene mute si costruiscono con una traccia di silenzio, non come sola
immagine: `concat -c copy` su uno spezzone senza audio lascia un buco e sfasa
tutto quello che viene dopo.

Al montato ho aggiunto un controllo che il MASTER non chiede: **cammino la
sequenza scena per scena e confronto la somma con la durata del montato.** Le
due cose devono coincidere, e se non coincidono i sottotitoli sono sbagliati.
Ha trovato due difetti veri, uno dei quali era mio.

**Primo: 1,72 s di scarto.** I tempi dell'SRT venivano dalle durate nominali di
`blocchi-audio.json`, ma ogni scena montata e' arrotondata al fotogramma a
25 fps e al pacchetto AAC. Su 218 scene l'arrotondamento si accumula: a fine
video il sottotitolo sarebbe stato in anticipo di quasi due secondi, e lo
scarto cresceva lungo tutta l'ora. Misurando i file di scena invece delle
durate nominali lo scarto e' sceso a 1,38 s — **sceso, non sparito**, e quello
che resta era il difetto vero.

**Secondo: la misura sbagliata.** Misuravo la durata col `time=` che ffmpeg
stampa decodificando. Quel numero e' l'ultimo istante processato, e sulle 218
scene resta indietro di 1,38 s in tutto. La misura giusta e' la `Duration`
dichiarata nell'intestazione del contenitore, perche' e' *esattamente* la
quantita' con cui il demuxer `concat` sposta l'inizio dello spezzone
successivo: cioe' il tempo a cui la scena comincia davvero nel montato.

```
                                    somma camminata   scarto col montato
durate nominali di blocchi-audio      59:45,08           1.720 ms
durate decodificate (time=)           59:45,42           1.380 ms
Duration dell'intestazione            59:46,77              20 ms
```

Venti millisecondi su un'ora. E siccome l'intestazione non richiede di
decodificare niente, il montaggio e' passato da **cinque minuti a venticinque
secondi**.

## I controlli: 8 su 9, e il nono e' un numero da portare all'utente

```
[OK] trascrizione: 17/17 tracce, coincidenza minima 97,5%, buchi: 0
[OK] fascia 8,5-21 car/s su 203 blocchi: tutti dentro
[OK] PNG: 218 su 218 scene
[OK] nessuna slide sfora la cornice
[OK] clip animate: 203 su 203 scene con parlato
[OK] scene per segmento entro il tetto 50: il segmento piu' grande ne ha 41
[NO] durata 59:46,80 — chiesti 60:00,00
[OK] sottotitoli SRT: 203 righe su 203 blocchi
[OK] registro con la sezione «da verificare»
```

**Il montato e' corto di 13,2 s sui 60 minuti: lo 0,37%.** (La somma nuda dei
blocchi ne darebbe 14,9; 1,7 li restituisce l'arrotondamento al fotogramma di
cui sopra — che qui allunga, non accorcia.) Non l'ho compensato, e la ragione
conta piu' del numero.

La proiezione che ha portato alla scelta del filtro (60,7 min con
`silenceremove` da solo) era calcolata su **15,68 car/s**, il CPS misurato dopo
il filtro sulla sola traccia 1. Le diciassette tracce insieme hanno reso
**15,92 car/s**: l'1,5% piu' veloce.

```
                          car/s    parlato    + 39 s di mute
proiezione (traccia 1)    15,68    3.601 s    60,68 min
misura (17 tracce)        15,92    3.546 s    59,75 min
                                              ---------
                                              55 s di differenza
```

Tutti i caratteri sono quelli **inviati** al sintetizzatore (56.472: 56.269 di
copione piu' gli spazi di giunzione fra blocchi), perche' e' su quelli che il
servizio misura e fattura, ed e' su quelli che era fatta la proiezione.

E' la trappola del MASTER §2 vista da un'altra angolazione: il CPS non si
eredita da un'altra voce, ma non si eredita nemmeno da **un solo campione**
della voce giusta. Una traccia su diciassette non e' la media di diciassette.

**Non ho allungato le scene mute per arrivare a 60:00.** Sarebbero bastati 15 s
distribuiti sulle tredici card, ma quelle durate non sono mie: lo script
dell'utente dice «Le card di capitolo […] durano due secondi», e copertina 3 s,
chiusura 10 s. Allungarle per far tornare un totale significa piegare il
contenuto dichiarato dall'utente a un numero — e il numero tornerebbe senza che
il video sia piu' lungo di un istante di contenuto. Lo stesso script scrive
«durata stimata 60 min», non «almeno 60:00»; sono 13,2 secondi su 3.600.

Resta comunque una decisione dell'utente, non mia, e per questo il controllo 7
e' lasciato **rosso**: se servono i 60:00 pieni la strada onesta e' aggiungere
contenuto, non silenzio.

## Guardate tutte e 218, e che cosa e' saltato fuori

Trentasette provini da sei slide, tutte e 218. Il controllo automatico aveva
detto «nessuna slide sfora» anche stavolta. Guardandole sono usciti quattro
difetti che nessun controllo poteva vedere, perche' nessuno di loro e' una
misura: sono cose che si sanno solo leggendo quello che c'e' scritto.

**1 e 2 · Due slide promettevano dei dati che non portavano.** s160 e s217
dicono, con la stessa identica frase, «trovi i nostri recapiti e gli orari di
sportello **qui a schermo**». A schermo non c'era niente: solo il titolo
«Recapiti e orari di sportello» e un sottotitolo che rimandava altrove. La voce
indica la slide, la slide non risponde.

Ora sono due griglie a quattro voci — sportello, telefono, orari, online — con
i valori scritti **«— DA FORNIRE —»**: segnaposto dichiarati, come il
rettangolo grigio del marchio, cosi' e' impossibile consegnarle per sbaglio.
I dati stanno in un unico `RECAPITI` usato da entrambe: quando arrivano quelli
veri si cambia un punto solo, e le due slide non possono divergere.

**3 · L'icona sbagliata.** Per la sede avevo scelto `ospedale`, che ha la croce:
e' l'ospedale, non lo sportello sindacale. L'insieme non ha un segnaposto di
luogo, quindi le quattro icone sono scelte per quello che dicono davvero
(persone, chat, orologio, documento) invece di forzarne una a dire altro.

**4 · Il mio conto sulla monotonia era letto a mio favore.** Avevo scritto
«sequenze di 3+ uguali: 0». Vero, ma contando le quindici scene mute come
stacco. Sulle sole 203 scene animate le sequenze da tre erano **due**, e le
coppie consecutive dello stesso tipo **trenta**. La regola dello script
dell'utente («mai due scene consecutive dello stesso tipo») non era rispettata
come avevo lasciato intendere.

Le due sequenze da tre sono state sciolte prendendo il tipo che il contenuto
chiedeva gia': s192 dice «**due** segnalazioni, non una» ed era un muro di
parole, ora e' un elenco di due; s202 dice «sono i **tre** documenti» ed e'
diventata una figura `tre`. Nessuna delle due e' decorazione: nominavano un
numero che la slide non mostrava.

```
                                 prima    dopo
sequenze di 3+ (203 animate)         2       0
coppie consecutive uguali           30      26
con figura o struttura             46%     48%   (il MASTER dice «due su cinque»)
```

**Le ventisei coppie restano, e non si azzerano decorando.** Con 88 scene di
sola frase su 203 l'ordine e' quello del racconto dell'utente, non mio: per
arrivare a zero bisognerebbe o riordinare il suo copione o mettere una figura
dove il contenuto non ne chiede. Il MASTER e' esplicito sul secondo rischio, e
il primo non e' una mia decisione.

Verificato anche quello che si poteva misurare, e che era a posto: nessuna voce
piu' lunga del limite prudenziale del suo tipo, nessuna figura piu' piena della
sua capienza, e tutte e quattordici le slide col tema `tenue` su contenuti di
errore o di avvertimento — mai per decorazione. I grafici sul tema profondo
sono zero, ma quello lo impedisce gia' `layout.mjs` con un'eccezione.

### Un selettore per non rifare duecento cose per tre

`cards.mjs`, `clips.mjs` e `monta-scene.py` accettano ora `SOLO=s160,s217`.
Senza, rifanno tutto, che resta il comportamento giusto per difetto.

Due guardie, perche' una selezione silenziosa mente:

- `cards.mjs` con `SOLO` **non riscrive** `troppo-alte.json`. Scriverlo
  significherebbe far passare il controllo 4 su tre slide spacciandole per le
  218 — la prima volta che ho usato il selettore e' successo esattamente questo;
- `monta-scene.py` con `SOLO` ricostruisce le scene scelte ma **misura tutte**
  le altre sui file, non su quello che ha appena rifatto: cosi' una scena
  rimasta indietro si vede nel riepilogo invece di nascondersi.

## La verifica dei CONFINI, quella che mancava

Era l'unico controllo del MASTER rimasto fuori, ed e' quello che le altre
strade non possono fare. `verifica-testo.py` dimostra che la voce ha detto
tutto, ma non DOVE cadono i tagli: la trascrizione di una traccia intera non
porta i tempi. `prova.mp3` risolve la cosa da un'altra parte — 1,6 s presi
PRIMA di ogni taglio, separati da silenzio: se un taglio e' al posto giusto,
quello spezzone sono le ultime parole del blocco che finisce li'.

### Due metodi buttati, che valgono piu' del risultato

**Dividere la trascrizione in 186 frasi e confrontarle una a una.** Il
trascrittore ne aveva unite due: da quel punto ogni confronto sarebbe stato
sfasato di uno, e avrebbe dichiarato sbagliati 130 confini giusti.

**Cercare in avanti la chiusa di ogni blocco, avanzando via via.** Basta che
una chiusa finisca su una parola comune e l'avanzamento salta a un'occorrenza
piu' in la': da li' non ritrova piu' niente. Dava 25 «mancanti» in sequenze di
sette — e nella trascrizione quelle parole c'erano tutte, in ordine. Il difetto
era il metodo, non i tagli.

Si allinea per intero, con una programmazione dinamica fra le 186 chiuse attese
e i frammenti, ammettendo che un frammento ne copra due. E' lo stesso principio
del DTW che sceglie i confini: decidere sull'insieme, non sul singolo passo.

E una misura sbagliata all'inizio: cercavo le ultime QUATTRO parole di ogni
blocco. In 1,6 s di audio grezzo, a 15,16 car/s e con dentro la pausa, ci stanno
una ventina di caratteri — DUE parole. Chiederne quattro voleva dire pretendere
parole che nello spezzone non erano mai entrate.

### Che cosa ha trovato

```
                       prima delle correzioni   dopo
chiusa ritrovata intera        153                159
ritrovata a meta'               14                 13
da guardare                     19                 14
```

Diciannove confini sospetti, che **nessun altro controllo aveva visto**: non il
DTW che li aveva scelti, non la fascia dei car/s (erano tutti dentro), non il
controllo statistico. Undici erano diagnosticabili: nello spezzone prima del
taglio si sentivano le prime parole del blocco che doveva COMINCIARE li'. Il
taglio era in ritardo, e il blocco precedente si era mangiato l'attacco del
successivo — sullo schermo la slide cambia dopo che la voce e' gia' passata
oltre.

Di quanto: lo dice il testo. Se prima del taglio sono gia' stati pronunciati K
caratteri del blocco successivo, il taglio e' avanti di K/cps secondi, col cps
GREZZO della sua traccia (le diciassette vanno da 13,9 a 16,0 car/s: una media
avrebbe sbagliato in proporzione).

### Sei applicate su undici, e perche' non tutte

Applicate tutte e undici, due blocchi finivano **fuori fascia**: s064 a 22,0
car/s e s164 a 28,4. Questa voce non ha mai superato 18,5. L'aritmetica
smentisce la lettura della trascrizione, e vince l'aritmetica.

Il criterio per le altre e' quello del MASTER sui voti fra soglie: **si decide
sull'esito.** La somma della coppia e' fissa, quindi un confine giusto lascia i
due blocchi con velocita' simili; una correzione che allontana i due car/s ha
spostato il taglio dalla parte sbagliata.

```
confine   |Δ car/s| prima   dopo    esito
s015            1,4          0,4    tenuta
s033            0,3          0,3    tenuta
s034            0,9          1,0    tenuta
s035            3,6          5,2    rifiutata — meno bilanciata
s057            1,5          2,1    rifiutata — meno bilanciata
s064            1,4          9,4    RIFIUTATA — fuori fascia
s083            5,8          1,6    tenuta
s112            2,4          0,2    tenuta
s140            4,5          0,9    tenuta
s164            0,4         13,9    RIFIUTATA — fuori fascia
s215            1,5          3,9    rifiutata — meno bilanciata
```

### La seconda trascrizione, che e' il punto

Applicare una correzione non e' verificarla. Ho rifatto `prova.mp3` sui confini
NUOVI (`tagli.py prova`, che ritaglia senza rifare il DTW — rilanciare
`allinea` avrebbe ricalcolato tutto e buttato via le correzioni) e l'ho
trascritto di nuovo.

Cinque delle sei correzioni sono confermate: dove si sentiva «Guarda l'esempio»
adesso si sente «Te lo dice», dove si sentiva «Ultima cosa sui codici» adesso
«Del mese corrente» — le chiuse attese.

E il risultato che da' senso al rifiuto: **s064 e s164, le due che l'aritmetica
aveva scartato, adesso si verificano da sole.** Nel secondo provino la chiusa
attesa c'e'. Erano giuste com'erano: la prima lettura era un artefatto
dell'allineamento. Averle «corrette» avrebbe rotto due confini sani.

Restano quattordici confini non ritrovati. Quattro sono ritardi veri e
dichiarati (s035, s057, s058, s215); gli altri sono resa del trascrittore —
numeri in cifre dove il copione ha le parole («22,99» contro «ventidue euro e
novantanove»), frammenti fusi, parole storpiate.

### Costo, e un preventivo da non credere

```
prima trascrizione dei confini    $0,69
seconda, dopo le correzioni       $0,69
                                  -----
                                  $1,38
```

**Il preventivo diceva $0,047.** Il reale e' stato $0,69: quindici volte tanto.
Il registro qui sopra dice che il preventivo di questo servizio e' affidabile —
e' vero per la sintesi (un credito per carattere esatto), **falso per la
trascrizione**. `estimate_only` su questo modello non va creduto.

## L'indice dei capitoli, sui tempi veri

La tabella dello script (da 01:53 a 56:23) era calcolata su 60 minuti ipotetici,
prima che la voce esistesse. Sui tempi veri sbaglia fino a **29 secondi**: chi
la usasse come segnacapitoli manderebbe lo spettatore mezzo minuto fuori posto.

`indice-capitoli.py` la rifa' camminando la sequenza reale, e scrive
`indice-capitoli.txt` pronto da incollare. Il nome di ogni capitolo e' quello
scritto sulla SUA card, non quello della tabella: e' la parola che lo
spettatore vede quando il capitolo comincia.

```
00:00 Copertina          27:45  6. Le tasse in busta paga
01:53  1. Com'e' fatta   33:11  7. Trattenute e totali
06:51  2. Le colonne     37:13  8. I mesi speciali
12:01  3. Stipendio fisso 41:52  9. Dieci controlli
17:55  4. Salario access. 45:28 10. Assenze e busta paga
23:13  5. Contributi      49:35 11. Leggiamo un cedolino
                          53:12 12. Lo stipendio in un anno
                          56:05 13. Le domande dello sportello
```

## Il marchio vero, e la strada ovvia che non funzionava

Il committente ha mandato il logo. Sta su **tutte e 218 le slide**, quindi
sono stati rifatti PNG, clip, scene e montato, e il controllo di traboccamento
e' stato ripetuto col marchio vero — che e' quello che il MASTER §8 chiede,
perche' con un logo diverso le misure cambiano.

**La ricetta che avevo scritto io in `marchio/LEGGIMI.md` non funzionava.**
Diceva di rifilare cosi':

```python
im.crop(im.getchannel("A").getbbox())
```

Il file vero e' arrivato **su bianco pieno, senza canale alfa**: tutti i pixel
hanno alfa 255, `getbbox()` sull'alfa restituisce l'immagine intera e non
rifila niente. Il margine andava cercato sul COLORE. Se l'avessi applicata come
stava, i 38 pixel di margine a destra sarebbero rimasti dentro e il marchio
sarebbe uscito piu' piccolo del dovuto su ogni singola slide — senza che
nessun controllo se ne accorgesse.

`rifila.py` fa le tre cose che servono:

```
arrivato 225x109 -> rifilato 185x95   (margine: dx 38, basso 13)
fondo reso trasparente: 9.554 px · bianco del marchio conservato: 827 px
verde #00623A dichiarato in layout.mjs: 3.372 px nel file ✓
rosso #D70328 dichiarato in layout.mjs: 1.232 px nel file ✓
```

**La trasparenza si propaga dai bordi, non cancella «tutto il bianco».** Le
lettere CISL dentro il fumetto sono bianche: 827 pixel che un `replace` del
bianco avrebbe bucato. E serve davvero — sul tema `chiaro` il fondo e' bianco e
un rettangolo non si vedrebbe, sul `profondo` il marchio sta gia' su piastra
bianca, ma sulle **quattordici slide `tenue`** il fondo e' `#FCF4F3` e il
rettangolo bianco si sarebbe visto.

**La palette era giusta.** I due colori dichiarati in `layout.mjs` si ritrovano
nel file vero pixel per pixel: erano stati campionati bene, e `rifila.py` adesso
lo verifica a ogni marchio nuovo invece di fidarsi.

## I recapiti veri

Arrivati dall'utente, e la griglia e' cambiata di conseguenza: gli sportelli
sono **due**, non uno. Padova e Rovigo hanno una casella ciascuno con indirizzo
e telefono insieme — separarli avrebbe costretto a leggere due caselle per fare
una telefonata.

```
Padova     Via del Carmine 3          Orari      9–13 · 13–17
           049 822 0630
Rovigo     Viale Tre Martiri 87/a     Scrivici   fp.padova.rovigo@cisl.it
           0425 399 239
```

Stessa icona per i due sportelli: sono la stessa cosa, e il sistema di icone
del MASTER vuole un solo segno per un solo concetto.

Indirizzo e telefono vanno su **due righe**, non separati da un trattino: col
trattino la riga andava a capo da sola e la casella di Rovigo cominciava con
«— 0425 399 239», che si legge come una voce di elenco.

Con questo s160 e s217 non sono piu' segnaposto, e la promessa della voce —
«trovi i nostri recapiti e gli orari di sportello qui a schermo» — adesso
trova qualcosa a schermo.

## I 13 secondi, archiviati come decisione e non come tolleranza

L'utente ha risposto che i 13,2 s sotto l'ora «non sono un problema». La
risposta e' finita in `profilo.py`, non dentro `controlli.py`:

```python
SCARTO_DURATA_OK = 20.0
```

La differenza conta. Ammorbidire il confronto dentro il controllo avrebbe
nascosto il numero; dichiararlo nel profilo lo lascia in vista, col commento
che dice chi l'ha deciso e su quale cifra. Il controllo continua a stampare il
valore vero — «mancano 13,2 s (accettati fino a 20)» — e al prossimo video, con
un'altra durata, quel 20 va riguardato invece di essere ereditato in silenzio.

**Controlli: 10 su 10.**

## Luca Ward: l'assaggio, misurato prima di spendere

L'utente ha chiesto quale voce fosse stata usata, dicendo che avrebbe preferito
«Luca Ward v3». La voce di questo video — «Achille nuovo 1» su
`eleven_multilingual_v2` — non e' una scelta mia: e' la riga 10 della scheda
tecnica del suo script.

«Luca Ward» esiste nel suo spazio di lavoro (`tVdVcJPudubxmTmAw4tE`, clonata,
«uomo di circa 50 anni molto carismatico», romana). Invece di discutere, un
assaggio da **$0,12**: l'apertura vera del video, generata con quella voce su
`eleven_v3` e passata dallo stesso filtro del ritmo, cosi' il numero misurato
vale per il montato e non per un'anteprima.

```
                grezzo   lavorato   car/s lavorato   grezzo/lavorato
Luca Ward (v3)   58,44s    48,09s       15,72             1,215
Achille          (misurato sulle 17 tracce)  15,92        1,050
```

```
proiezione sui 56.472 caratteri
   Achille (il montato di adesso)   59:46
   Luca Ward                        60:31      +45 s
```

**Le due voci corrono quasi uguali**, quindi il cambio non romperebbe la durata
— scavallerebbe i 60 minuti invece di restare sotto. La differenza vera e'
un'altra: Luca Ward lascia pause molto piu' lunghe, e `silenceremove` gli toglie
10 secondi su 58 contro i 3 di Achille. E' lo stesso tipo di scoperta della
traccia 1 all'inizio: **il rapporto grezzo/lavorato non si eredita da una voce
all'altra**, e qui cambia del 16%.

Il costo del cambio non e' la sola voce: tracce $9,50 + verifica del testo
$3,40 + verifica dei confini $1,40, piu' un'ora di ricostruzione — e le
sei correzioni sui confini andrebbero rifatte da capo, perche' i tagli cadono
su un'altra voce. Portato all'utente coi numeri, non deciso in silenzio.

## Da verificare — quello che non ho potuto giudicare io

- **Nessuno ha ancora ascoltato nessuna delle 17 tracce.** Le durate sono
  misurate, il timbro no: non posso sentire. Stanno in `audio/grezzo/` e sul
  flow. Da ascoltare almeno gli attacchi e le chiuse delle 17, e i tre punti in
  cui un capitolo e' stato spezzato in due tracce (3, 4, 6): e' li' che uno
  stacco di timbro si sentirebbe.
- **Quattordici confini su 186 non si ritrovano nella trascrizione** (vedi la
  sezione sopra). Quattro sono ritardi veri e misurati — s035, s057, s058,
  s215 — che non ho corretto perche' la correzione calcolata peggiorava
  l'equilibrio della coppia: il taglio giusto sta fra i due, e trovarlo vuole
  un ascolto, non un altro conto. Gli altri dieci sono quasi certamente resa
  del trascrittore, ma nessuno li ha ascoltati.
- Lo stato del CCNL e gli importi del fac-simile: sono i due punti aperti qui sopra.
- ~~Marchio segnaposto~~ — **arrivato e montato**, vedi la sezione sul
  marchio. Il controllo di traboccamento e' stato rifatto col marchio vero:
  zero slide sforano.
- **Gli orari non portano i giorni.** L'utente ha confermato che i due turni
  sono staccati (ora sono su due righe, perche' su una sola il 13 che chiude
  il primo e apre il secondo si legge come un orario continuato 9-17), ma non
  ha detto in quali giorni valgono. I CAP restano fuori: a chi telefona o si
  presenta non servono, e affollavano la casella.
- **Ventisei coppie di scene consecutive dello stesso tipo** restano, contro la
  regola dello script («mai due consecutive»). Vedi la sezione qui sopra per
  perche' non si azzerano senza riordinare il copione o decorare.
- **Nessuno ha guardato il montato.** E' stato costruito e misurato, non visto:
  un'ora di video non si giudica dai numeri. Da guardare almeno gli attacchi dei
  tredici capitoli, dove la card muta incontra la prima scena parlata, e la
  chiusura.
- **I sottotitoli sono lunghi un paragrafo.** Una riga per blocco, com'e' la
  regola del MASTER (blocco = scena = riga) e come lo verifica il controllo 8:
  il piu' lungo e' di 396 caratteri tenuti per 26 secondi. Va bene come traccia
  di trascrizione, NON come sottotitolo da incidere sul video. Se servono
  sottotitoli veri vanno spezzati, e allora salta la corrispondenza uno a uno
  che il controllo 8 pretende: e' una decisione, non una svista.
- **I 13,2 secondi che mancano ai 60:00** (vedi la sezione sui controlli). Il
  controllo 7 resta rosso apposta.
