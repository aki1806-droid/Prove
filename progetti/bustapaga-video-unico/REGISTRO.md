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
assaggi di voce (Luca Ward, Andromeda, Sara, Francesca)     $0,50
                                                           ------
                                                           $14,59
(il totale col cambio di voce sta nella sezione piu' sotto)
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

## Francesca: il cambio di voce, e il difetto che l'ha quasi fatto fallire

L'utente ha ascoltato quattro alternative e ha scelto **Francesca Bellucci**
(`HLbf5OcXzzI5RP4O3I3d`). Il video e' stato rifatto per intero: 17 tracce, 203
blocchi, 203 scene, montato.

### Il rapporto 1,000 non era una curiosita'

Nel confronto delle voci Francesca aveva rapporto grezzo/lavorato **1,000**:
`silenceremove` non le toglieva niente. Sembrava solo «lenta di suo». Era il
sintomo di qualcosa di peggio, e trovarlo e' costato zero.

I confini fra i 203 blocchi li trova `silencedetect`. Alla soglia del progetto,
−45 dB, Francesca dava **quattro pause in 55 secondi, nessuna sopra 0,18 s**.
Achille ne dava 47, di cui 19 lunghe. Con quattro appigli il DTW non ha su cosa
appoggiarsi: avrei speso $9,35 di sintesi per scoprirlo al taglio.

**Le pause le fa uguale**, hanno solo un fondo di rumore piu' alto. Misurato
abbassando la soglia:

```
soglia    pause   lunghe   la piu' lunga     Achille a -45dB: 47 / 19 / 0,62s
-45dB        4        0      0,18s
-40dB       17       12      0,50s
-35dB       24       20      0,74s   <- profilo equivalente ad Achille
-30dB       34       22      0,78s
```

La soglia e' finita in `profilo.py` come `SOGLIA_SILENZIO`, ed e' da li' che
la leggono sia `tagli.py` sia `RITMO`: sono **la stessa soglia**, e murate in
due posti diversi potrebbero divergere. E' un parametro DELLA VOCE, non dello
strumento — esattamente come il CPS.

### Misurato sulla traccia vera, non sull'assaggio

Generata la traccia 1 da sola ($0,29) prima delle altre sedici, come la prima
volta. L'assaggio da 756 caratteri prometteva 24 pause; la traccia vera da
1.739 ne ha date **55, di cui 39 lunghe** — meglio del previsto. E su tutte e
17 le tracce le pause sono molte piu' dei confini da trovare, verificato prima
di tagliare.

### Il risultato: zero correzioni

```
                     Achille        Francesca
blocchi fuori fascia    5 (corretti)     0
confini corretti        6 su 186         —
```

Con Achille erano serviti cinque giri di diagnosi e sei correzioni di confine.
Con Francesca, alla soglia giusta, **zero blocchi fuori fascia al primo colpo**.
Non e' merito della voce: e' che la soglia era misurata invece che ereditata.

### La durata si e' ribaltata

```
parlato 203 blocchi, senza atempo   64:12
+ 15 scene mute                        39 s
                                    -------
                                    64:51     contro i 60 dichiarati: +4:51
```

Con Achille il problema era che il video veniva CORTO, e l'utente tolse
`atempo`. Con Francesca viene lungo di quasi cinque minuti, e `atempo` serve
davvero. Misurato sui blocchi veri:

```
senza atempo   64:51      atempo 1.08   60:06   <- scelto dall'utente
atempo 1.05    61:48      atempo 1.10   59:01
```

1,08 e' meno di quanto chiedeva lo script (1,12), e riporta il video sui
60 minuti dichiarati.

**La lezione, per la terza volta in questo lavoro:** nessun numero della voce
si eredita. Non il CPS, non il rapporto grezzo/lavorato, e nemmeno la soglia
di silenzio — che sembrava un dettaglio tecnico dello strumento e invece era
il parametro che decideva se il taglio funzionava.

## Le verifiche sulla voce nuova: 10 controlli su 10

### I confini: 186 su 186

```
                           Achille        Francesca
chiusa ritrovata intera      159             171
ritrovata a meta'             13              15
da guardare                   14               0
```

Un solo sospetto al primo giro, **s071**, e le due prove concordavano: la
trascrizione diceva «taglio in anticipo», l'aritmetica lo confermava (s071 a
16,1 car/s seguito da s072 a 14,4 — veloce poi lento, la firma esatta).

Ma non concordavano sull'ENTITA': la trascrizione suggeriva 2,3 s, il conto
sulla velocita' 1,24 s. Applicato il secondo, perche' e' il criterio che si era
gia' dimostrato quello giusto: la volta scorsa, seguendo la trascrizione alla
lettera, avevo «corretto» due confini sani.

```
s071   16,1 -> 15,2 car/s        media dei 203 blocchi: 15,80
s072   14,4 -> 15,1 car/s
```

**E la riverifica e' costata $0,0015.** Applicare non e' verificare, ma rifare
tutto il provino da 186 spezzoni per controllarne UNO sarebbe costato $0,69.
Estratto il solo spezzone corretto — 1,6 secondi — e trascritto quello. Torna
«trattano con l'azienda»: la chiusa attesa di s071, esatta.

### Il testo: una trascrizione sola invece di diciassette

Le 17 tracce concatenate in un file da 70 minuti, trascritte in una volta.
Stessi minuti di audio, stesso costo, una chiamata invece di diciassette. La
domanda a cui il controllo risponde — «la voce ha detto tutto?» — e' un
confronto fra due sequenze di parole, e farlo sull'intero corpo e' lo stesso
confronto senza le cuciture in mezzo.

```
9.186 parole su 9.237 (99,4%) · buchi da 3+ parole: ZERO
```

L'unico buco segnalato non era un buco: il copione dice «dodici euro **e
mezzo**», il trascrittore scrive «12,50». Dichiarata come resa, una riga in
`verifica-testo.py`, non coperta con una tolleranza.

### Due buchi miei, trovati dai miei stessi controlli

**Il controllo sulla trascrizione non aveva la guardia sulla data.** Quello sui
confini ce l'aveva e ha segnalato subito «verifica piu' vecchia dei confini»;
il fratello no, e passava dicendo «17 tracce, zero buchi» mentre quegli esiti
erano di Achille e in `audio/grezzo` c'era gia' Francesca. Adesso ce l'ha, e la
prima cosa che ha fatto e' stato fallire.

**E il controllo contava le tracce, non l'audio coperto.** Con la trascrizione
unica diceva «1/17 tracce» e falliva, pur avendo verificato esattamente lo
stesso audio. Corretto: la modalita' intero copre tutte le tracce per
costruzione, e il controllo adesso lo sa dire.

## Costo totale

```
voce Achille, 17 tracce (rifatte, restano come riserva)       $9,33
trascrizione del testo, Achille                               $3,38
verifica dei confini, Achille, due provini                    $1,38
assaggi di voce: Luca Ward, Andromeda, Sara, Francesca        $0,50
voce Francesca, 17 tracce                                     $9,44
verifica dei confini, Francesca                               $0,69
trascrizione del testo, Francesca (70 min in un colpo)        $3,81
riverifica del solo confine corretto                          $0,0015
                                                              ------
                                                             $28,53
```

**Il preventivo della trascrizione ha sbagliato di nuovo, dello stesso
fattore.** Diceva $0,26 per i 70 minuti, il reale e' stato $3,81: **14,9
volte**, contro il 14,7 misurato la prima volta. Non e' un caso isolato, e'
il comportamento del modello. Per la sintesi il preventivo resta esatto.

## Le fotografie: quattordici scene che lo script voleva riprese

L'utente ha guardato il video e ha detto che c'e' poca immagine: vuole
«qualche riproduzione realistica delle cose che si spiegano». Ha ragione, e il
numero lo conferma: **87 slide su 218 sono una frase su fondo bianco**, il 40%
del video. Non e' un difetto di gusto, e' un buco che era gia' scritto nel
copione.

Perche' proprio li'. Lo script dell'utente classificava 16 scene come «clip
b-roll»: non slide, RIPRESE. Senza troupe erano diventate slide di testo come
le altre. Quelle sedici sono il posto dove la fotografia mancava per
costruzione, non per scelta — e infatti sono le scene che parlano di SITUAZIONI
(la notte in reparto, il badge, il tavolo di cucina col prospetto turni
accanto) e non di STRUTTURE (una tabella, una scala di aliquote).

E' anche il criterio con cui ho deciso dove NON metterle: dove la voce descrive
una struttura, un vettore dice di piu' di una fotografia. Per questo s125
(i progressivi, quattro caselle) e s157 (due strade a confronto) restano
grafica: hanno un contenuto che una foto non saprebbe dire.

Due delle sedici sono rimaste fuori per un'altra ragione: **s079 e s148 sono
sul tema `tenue`**, che in questo progetto e' il tema DEGLI ERRORI (MASTER §5).
Coprirle con una foto avrebbe spento l'unico segnale che dice «qui si sbaglia».
Al loro posto ho fotografato le due CITAZIONI dello sportello, s033 e s207, che
sono domande di persone vere e stavano su fondo bianco come tutto il resto.

Quattordici in tutto, una ogni quattro minuti circa.

### Non un tipo nuovo: un attributo

La tentazione era aggiungere `foto` ai 28 tipi di corpo. Sbagliato: sarebbe
stato un ventinovesimo tipo da tenere allineato agli altri, con la sua
tipografia che diverge alla prima modifica.

La foto e' invece un ATTRIBUTO — `sfondo:true` — che una slide qualunque puo'
portare. La slide tiene il suo corpo (`frase`, `citazione`, `titolo`) e la
fotografia le sta dietro. Nessuna regola di accento, spaziatura o gerarchia
cambia: cambia lo sfondo.

Il contrasto non e' affidato alla fortuna della foto. Sopra c'e' un velo in
sfumatura, fitto dove sta il testo (96%) e quasi assente sulla fotografia (6%),
con un secondo velo in basso perche' il marchio e la barra di avanzamento
stacchino comunque. Per questo una slide con sfondo DEVE dichiarare il tema
profondo, e `html()` lo PRETENDE invece di forzarlo di nascosto: forzato, chi
legge contenuti.mjs vedrebbe una slide scritta coi colori chiari e non capirebbe
perche' esce bianca.

Il velo l'ho tarato due volte. Alla prima passata era piatto e ingrigiva di
verde anche la parte destra: la divisa azzurra dell'infermiera diventava verde,
cioe' la fotografia perdeva esattamente la cosa per cui l'avevo messa. Ripido,
il testo legge uguale e la foto resta una foto.

### Due difetti trovati guardando, non calcolando

**Il fregio sopra le parole.** Le due citazioni portano un fregio a virgolette,
disegnato in `var(--acc)` al 13%. Sul tema chiaro l'accento e' il rosso del
marchio: una filigrana rosa, invisibile. Sul tema profondo l'accento e' il
BIANCO — e una filigrana bianca su una foto scura non si legge come filigrana,
si legge come una macchia appoggiata sopra il testo. Su una foto il fregio non
serve (la decorazione e' la foto) e ora non si stampa; e fuori dalle foto, sul
tema profondo, e' sceso al 9%. Era un difetto latente di QUALUNQUE citazione
sul verde pieno, non solo di queste due.

**Il manifesto della UIL.** Questo e' il motivo per cui le immagini si guardano
una per una, ingrandite. La prima s207 — mani su un documento in un ufficio
sindacale — aveva sulla parete di fondo due manifesti rossi che si leggono
**UIL**: la sigla di un altro sindacato, dentro un video della CISL FP. Il
modello l'ha inventata da solo: nel prompt c'era «nessun logo, nessuna scritta».
Rifatta con la parete nuda e nessuna bacheca.

Nella stessa passata e' saltata fuori la s053: un cartello a muro e la scritta
sulla giubba di un soccorritore, entrambi in lettere storpiate. Piu' piccoli e
meno gravi — nessuno ci legge un'altra sigla — ma rifatta lo stesso, con
l'ambulanza senza scritte e il piazzale vuoto: due immagini su quattordici a
$0,135 l'una non sono un motivo per lasciare una sbavatura in un video di
un'ora.

Le altre dodici sono passate: nessuna scritta leggibile, nessun marchio.

### Perche' ElevenLabs e non Higgsfield

L'utente ha suggerito Higgsfield, e su Higgsfield ho generato la prima prova:
0,25 crediti a immagine in qualita' bassa, 1 credito in 2K — sui 63,81 crediti
gia' pagati dell'abbonamento, cioe' praticamente gratis.

Non si puo' usare, e il motivo non e' il modello: **la CDN di Higgsfield e'
bloccata dalla policy di rete di questo ambiente** (403 CONNECT sul proxy). Le
immagini si generano e non si scaricano. Ho provato il ponte — importare l'URL
di Higgsfield come asset ElevenLabs, che lo scarica lato server — e funziona,
ma restituisce solo una miniatura da **1024 px**: su uno sfondo a 1920 si
vedrebbe.

ElevenLabs genera sullo stesso `storage.googleapis.com` da cui gia' arrivavano
le tracce audio, ed e' raggiungibile: master a 2048x1152. Costa $0,135
l'una invece che un credito prepagato — in tutto $2,16 per sedici generazioni
(quattordici piu' le due rifatte). Se la policy di rete cambiasse, Higgsfield
tornerebbe la scelta piu' economica: il modello va bene, e la prova fatta li'
(il tavolo di cucina col prospetto turni) era buona quanto le altre.

## L'edizione con la voce di Achille

L'utente l'ha chiesta «visto che ce l'hai gia'», ed e' esatto: costa ZERO in
sintesi. Le 17 tracce grezze stanno in `audio/grezzo-achille/` e i 203 blocchi
gia' tagliati in `audio/blocchi-achille/`, salvati durante il cambio di voce.

La cosa che rende la faccenda facile e' che **le clip animate non dipendono
dalla voce**: sono 1,8 s di ingresso, poi l'ultimo fotogramma tenuto fino alla
fine del parlato. Cambiando voce cambia solo quanto si tiene il fermo. Niente
slide da rifare, niente da rigenerare — la stessa immagine, un altro respiro.

Serviva solo che gli strumenti smettessero di dare per scontata una voce sola.
`VOCE=achille` entra nei PERCORSI invece di sovrascrivere:

    monta-scene.py   blocchi-achille/ + grezzo-achille/blocchi-audio.json  ->  scene-achille/
    monta-locale.py  scene-achille/                                        ->  montato-...-achille.mp4

Due edizioni nello stesso progetto, che non si cancellano a vicenda.

    montato-busta-paga-60min.mp4           Francesca   60:09,76
    montato-busta-paga-60min-achille.mp4   Achille     59:46,85

Il numero di Achille e' lo STESSO di prima del cambio di voce (59:46,79 allora,
59:46,85 adesso: 60 ms su un'ora, l'arrotondamento al fotogramma). E' la prova
che la ricostruzione e' fedele, non una nuova lavorazione.

Le due durate diverse non sono un difetto di una delle due: Achille non ha
l'atempo (l'utente lo tolse, perche' con lui il video usciva gia' giusto),
Francesca ha 1.08 perche' lei e' piu' lenta. Stesso copione, stessi 203 blocchi,
stesse 218 scene.

## La catena rifatta da zero: cosa e' riproducibile e cosa no

L'utente ha rilanciato tutta la catena dopo un riavvio del contenitore. Il
disco era intatto — mp3 compresi — quindi non e' stato un recupero ma una
ricostruzione completa, che nessuno aveva ancora fatto. Ha risposto a una
domanda che era rimasta aperta per costruzione.

**La parte ffmpeg e' riproducibile bit per bit.** Rifatte le 203 scene per
voce, i due montaggi, i sottotitoli, gli indici e i pezzi: i due montati sono
usciti con lo STESSO MD5 di prima.

    montato-busta-paga-60min.mp4           MD5 identico
    montato-busta-paga-60min-achille.mp4   MD5 identico

**Il browser lo e' a meta', e la meta' che conta e' quella buona.**

    218 slide ferme (cards.mjs)     218 su 218 identiche byte per byte
    203 clip animate (clips.mjs)     62 su 203 DIVERSE
    troppo-alte.json                 identico

Le 62 non sono un cambiamento: sono non determinismo fra esecuzioni. Rifacendo
una singola clip due volte di fila, s003 e s011 escono diverse e s002 identica.

Misurato invece che supposto, sul fotogramma finale di s003 (che e' quello che
conta di piu': `tpad=stop_mode=clone` lo tiene fermo per tutta la scena):

    pixel diversi   119.220 su 2.073.600   (5,75%)
    scarto          mediana 2/255 · 95mo percentile 6/255 · massimo 23/255
    sotto 8/255     97,8%

E le differenze stanno SOLO sui bordi delle lettere e dei riquadri: amplificate
dieci volte si vede il testo in controluce, e nient'altro. Niente si e' spostato,
nessun elemento e' in uno stato diverso. E' variazione di antialiasing, sotto la
soglia di visibilita' e sotto a quello che l'H.264 conserva a CRF 18.

Perche' proprio nelle clip e non nelle slide ferme. In `cards.mjs` l'orologio
delle animazioni va a 4.000 ms — oltre la fine di qualunque ingresso — e fra il
salto e lo scatto c'e' la misura del traboccamento: tutto e' fermo e assestato.
In `clips.mjs` si scatta subito dopo aver spostato l'orologio, 45 volte di fila,
mentre gli elementi sono a meta' di una traslazione di frazioni di pixel. Il
livello di composizione che l'animazione promuove si porta dietro un
posizionamento sub-pixel che dipende da come e' andata la corsa — e resta
costante fino alla fine della clip, che e' esattamente quello che si vede nei
numeri (dal fotogramma 24 in poi lo scarto non cambia piu').

**Non l'ho corretto, ed e' una scelta.** Si potrebbe forzare la rasterizzazione
con `--disable-lcd-text` o `--disable-font-subpixel-positioning`, ma quei
parametri cambiano l'aspetto del testo di tutte e 218 le slide per aggiustare
una cosa che nessuno puo' vedere. Quello che ho corretto e' la PROMESSA: il
commento in cima a `clips.mjs` diceva «cosi' il render e' identico a ogni
esecuzione», e non era vero. Deterministico e' l'ISTANTE su cui cade ogni
fotogramma; la rasterizzazione no.

Conseguenza pratica, per chi verifica: **l'MD5 di una clip o di un montato non
e' una prova di riproducibilita' del render.** La prova buona e' il PNG, che e'
stabile su tutte e 218 — ed e' anche quello su cui lavora il controllo 4.

### Il riallineamento, e la conferma che serviva

Le clip ricostruite avevano lasciato `scene/`, `scene-achille/` e i due montati
indietro di una generazione. Rifatto tutto — 406 scene, due montaggi, due
indici, dieci pezzi — con le impronte prese PRIMA di partire.

I due montati sono usciti con un **MD5 diverso**, e questo era il risultato da
volere: 62 clip cambiate devono propagarsi a 62 scene e da li' alla
concatenazione. Fossero venuti uguali, avrebbe voluto dire che qualcosa non si
era rifatto davvero — ed e' il motivo per cui l'impronta si prende prima e non
dopo.

Quello che NON e' cambiato e' tutto il resto, ed e' la prova che il cambiamento
e' solo di byte:

    durata      60:09,76 e 59:46,85            identiche al centesimo
    scarto      20 ms fra montato e somma      identico su tutte e due
    controlli   10 su 10
    indici      gli stessi tredici capitoli agli stessi minuti

Le durate non potevano cambiare: una clip dura 1,8 s comunque sia rasterizzata,
e i blocchi audio sono gli stessi. Si e' mosso solo il peso di qualche pezzo di
un decimo di MiB, e l'accavallamento ai tagli di Achille da +0,43 a +0,35 s,
perche' i fotogrammi chiave cadono qualche frame piu' in la'.

I dieci pezzi gia' consegnati restano validi: contengono la stessa cosa, a meno
di quell'antialiasing che nessuno puo' vedere.

## Sette tipi grafici nuovi, e il disegno che mancava da un'ora

L'utente ha chiesto piu' elementi grafici originali. Il numero gli dava ragione
una seconda volta: dopo le fotografie restavano **90 slide su 218 di solo
testo**, il 41%.

Ma il punto non era il conto. Leggendo tutte e 90 di fila si vede che il
copione ripete poche FORME, e che una domina su tutte: **il cedolino stesso**.
La voce lo richiama in continuazione — «e' una tabella», «l'ultima colonna»,
«le righe con l'asterisco», «il piede si verifica con una sottrazione» — e per
un'ora lo spettatore ha dovuto immaginarselo.

### Il cedolino schematico

E' il disegno portante, usato **undici volte**, ed e' sempre lo STESSO: cambia
solo cosa si accende — una zona, una colonna, un intervallo di righe. Ripetere
la stessa figura evidenziandone un pezzo alla volta e' il modo in cui si insegna
a leggere un documento; disegnarne uno diverso ogni volta sarebbe stato piu'
vario e molto meno utile.

Non contiene nessun numero leggibile, e non e' una scorciatoia: un cedolino
finto con importi finti verrebbe letto come un esempio vero, e gli importi veri
del fac-simile stanno gia' nelle tabelle. Qui servono la FORMA e la POSIZIONE,
e le barrette le danno senza mentire. Le larghezze delle barrette sono
dichiarate in una tabella fissa, non casuali: una figura che cambia a ogni
render non e' una figura, e' rumore.

Le parti non in esame non spariscono — restano, al 26% — perche' il senso della
figura e' proprio che il pezzo evidenziato sta DENTRO un documento.

### Gli altri sei

    prodotto      quantita' x unitario = importo, la prova del nove     2 usi
    sfasamento    il mese lavorato e il mese pagato, con la freccia     1 uso
    sottrazione   il piede come colonna di conti, coi pesi a fianco     3 usi
    soglia        «solo sulla parte che supera», con il taglio          3 usi
    frazione      un quinto, il 15%: quote che a parole restano astratte 3 usi
    domanda       le domande dello sportello, col bollo Si' / No        5 usi
    cedolino      il documento, con una zona accesa per volta          11 usi

Ognuno nasce da una forma che ricorre nel copione, non da un catalogo di
decorazioni. `sfasamento` ha un uso solo ed e' giustificato: lo scarto fra
quando lavori e quando ti pagano e' il dubbio piu' frequente allo sportello, e
il copione ci dedica **due domande intere**.

Dove il vettore non dice piu' della frase, la frase e' rimasta: `s125` (i
progressivi) e `s157` (due strade) restano grafica di prima perche' hanno un
contenuto che una foto o un diagramma nuovo non saprebbero dire meglio.

### L'enunciato: il disegno si aggiunge alle parole, non le scaccia

Un corpo grafico sostituisce TUTTO il testo della slide. Convertendo una
«frase» in disegno si sarebbe persa la frase — che spesso e' il punto («La apri,
guardi l'ultima riga, e la chiudi»).

Per questo i sette tipi nuovi accettano un `enunciato`: una riga forte sopra la
figura. Non e' un h2: a 76px due righe si mangerebbero la figura, e qui la
figura e' l'argomento. Sta a 48, e i due elementi entrano in sequenza perche'
sono due figli di `.corpo`, non un involucro solo.

### Le animazioni: indicare, non intrattenere

Il riquadro che accende una zona del cedolino **si disegna** (`stroke-dashoffset`
da 100 a 0, 0,72 s dopo 0,34 di ritardo), e cosi' la freccia dello sfasamento e
il taglio della soglia. Il movimento serve a dire DOVE guardare — l'unica cosa
che un'animazione deve fare su una slide che poi resta ferma quindici secondi.
Tutto finisce entro 1,3 s, dentro gli 1,8 s della clip.

### Sei difetti trovati guardando, uno trovato dal controllo

Il controllo 4 ne ha preso uno da solo: il cedolino sforava di 90px su nove
slide su undici. Ho compresso la figura da 646 a 512 unita' invece di togliere
l'enunciato — la frase e' il punto.

Gli altri sei si vedevano solo guardando le immagini:

- **La barra dei pesi della sottrazione non si disegnava.** La riga del totale
  non ha un `q` (e' il risultato, non un addendo), e sommandola `Math.abs(undefined)`
  faceva NaN: ogni peso finiva a NaN e la barra spariva **in silenzio**. E' il
  tipo di guasto che nessun controllo prende, perche' il risultato e' una
  figura valida a cui manca un pezzo.
- **La nota della soglia usciva dalla cornice.** Era un `<text>` dentro l'SVG, e
  un testo SVG non va a capo. Il controllo 4 non poteva accorgersene: misura il
  riquadro di `.corpo`, e le figure hanno overflow visibile. Ora le note sono
  HTML e si spezzano da sole.
- **La freccia dello sfasamento passava dietro la sua etichetta.** Le strisce
  erano centrate e la freccia usciva a destra, dove stava la scritta: due segni
  sovrapposti che si annullano. Ora la freccia ha una corsia sua, larga 380.
- **La griglia percentuale sfondava di 1.203px.** Dieci colonne su 1656 fanno
  caselle da 165px, e dieci righe 1650px di figura. La casella ora si misura
  sull'ALTEZZA disponibile, non sulla larghezza.
- **Poi era rannicchiata in un angolo.** Da sei righe in su la didascalia va
  ACCANTO alla griglia invece che sotto: la figura si prende l'altezza che le
  serve e la slide si riempie.
- **Ventuno caselle su venti colonne** lasciavano una casella spaiata sulla
  seconda riga. Le colonne ora sono un divisore di n fra 5 e 20, il piu' vicino
  a dieci: cento fa il quadrato dieci per dieci, ventuno fa sette per tre.

### Il conto

    prima delle fotografie      87 frase + 15 titolo/citazione   su 218
    dopo le fotografie          90 di solo testo                 41%
    dopo i sette tipi nuovi     62 di solo testo                 28%

    tipi di corpo grafico       da 13 a 20
    tipi di corpo in tutto      da 28 a 35

Restano 62 slide di sola parola, e vanno bene cosi': un'ora di diagrammi a
tappeto stanca quanto un'ora di testo. Dove la voce afferma, la slide afferma.

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
- **Le quattordici fotografie sono GENERATE, non scattate.** Le ho guardate
  una per una, ingrandite, e nessuna ha piu' scritte leggibili ne' marchi: e'
  la verifica che potevo fare io. Restano immagini di persone che non esistono,
  in reparti che non esistono. Per un video sindacale e' una cosa da sapere, e
  in due casi vale la pena rimediare: **s033 e s207 mostrano lo sportello della
  CISL FP**, cioe' un servizio vero che ha un ufficio vero e persone vere. Una
  fotografia fatta in sede varrebbe di piu' e costerebbe meno. Se arrivano, si
  sostituiscono i due file in `slide/foto/` e si rifanno solo quelle due scene:
  il resto non si tocca.
- **Il manifesto della UIL e' stato tolto, ma dice qualcosa di generale.** Il
  modello ha inventato la sigla di un altro sindacato senza che nessuno gliela
  chiedesse, in un prompt che diceva «nessun logo». Se un giorno si aggiungono
  altre fotografie, la passata di controllo ingrandita NON e' facoltativa.
- **L'edizione con Achille non l'ha guardata nessuno.** E' ricostruita dai
  blocchi salvati e i numeri tornano al millisecondo con quelli di prima del
  cambio di voce, ma nessuno l'ha vista ne' sentita dopo il rimontaggio.
- **Perche' 62 clip su 203 e non tutte** non l'ho stabilito. Le 14 con
  fotografia ci sono tutte, ma le altre 48 non seguono un tipo di corpo
  solo. La domanda non cambia il video — lo scarto e' invisibile — ma se
  un giorno servisse un render riproducibile bit per bit, si comincia da li'.
- **Le 28 slide grafiche nuove nessuno le ha viste in movimento.** Le ho
  guardate ferma per ferma, ingrandite, e i sei difetti qui sopra vengono da
  li'. Ma l'ingresso dura 1,8 s e il tratto che si disegna l'ho visto solo
  nel fotogramma finale: va guardato scorrere.
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
- ~~I 13,2 secondi che mancano ai 60:00~~ — **chiuso dal cambio di voce.**
  Il numero era di Achille. Francesca e' piu' lenta, e con l'atempo 1.08 scelto
  dall'utente il montato esce 60:09,76, cioe' SOPRA i 60 minuti. Il controllo 7
  e' verde, e non perche' sia stata allargata la tolleranza: perche' il video
  dura quello che doveva durare. `SCARTO_DURATA_OK` resta in `profilo.py` come
  decisione registrata, ma oggi non serve a nessuno.

## La consegna: perche' il video arriva in cinque pezzi

Il canale di consegna accetta 30 MiB per file, il montato ne pesa 108,5.
Ricomprimerlo sarebbe stato il modo sbagliato di risolvere: l'immagine gia'
viaggia a 87 kb/s — sono diapositive ferme, non c'e' altro da togliere — e il
grosso del file e' la voce a 158 kb/s. Per far stare un'ora sotto i 30 MiB
servirebbero 66 kb/s in tutto, cioe' rovinare l'unica cosa che conta in un
video che si ascolta.

Si taglia invece, e non si tocca un bit: `spezza-per-invio.py` copia il flusso
senza ricodificare. Puo' farlo perche' i tagli cadono su inizi di capitolo, che
in questo video sono anche inizi di scena e quindi fotogrammi chiave — a meta'
scena bisognerebbe ricodificare, o il pezzo partirebbe da un fermo immagine.

I punti di taglio NON sono scritti nello strumento. Vengono da
`indice-capitoli.txt`, cioe' dalle durate misurate, e quali usare lo decide il
programma: il minor numero di pezzi che sta sotto il tetto, e fra le divisioni
possibili quella coi pezzi piu' pari. Cambiando il copione l'indice cambia e i
tagli si rifanno da soli — e' la stessa regola del profilo, derivare dal dato
invece di murare un numero.

Con le fotografie il montato e' cresciuto (le diapositive ferme comprimono
molto meglio di una fotografia), e i tagli si sono rifatti da soli sui numeri
nuovi: e' esattamente il motivo per cui non erano scritti nello strumento.
`VOCE=achille` spezza l'altra edizione, con il SUO indice dei capitoli.

Ogni pezzo porta i suoi sottotitoli, ritempificati dal suo minuto zero; quello
intero resta valido se i pezzi si rimettono insieme.

La verifica e' una sottrazione, e va letta nel verso giusto. I pezzi sommano
3.610,25 s contro i 3.609,76 del montato: mezzo secondo IN PIU'. Non e' un
errore, e' che ogni taglio riparte dal fotogramma chiave precedente e quattro
frame si ripetono a cavallo delle giunte. Ripetuto va bene; **perso no** — se
la somma fosse minore dell'intero mancherebbe del video, e lo strumento in quel
caso lo dice e fallisce. I sottotitoli fanno lo stesso: 207 sulle cinque parti
contro 203, perche' quattro righe stanno a cavallo di una giunta e compaiono in
entrambi i pezzi.
