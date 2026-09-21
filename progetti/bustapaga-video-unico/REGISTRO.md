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

Con `generations_count` lasciato al suo default di 4 sarebbero stati $37,3.

## La voce, generata per intero

Tutte e 17 le tracce sono state generate, `generations_count=1`, nessun errore.
L'utente ha confermato che CCNL e importi sono fermi (vedi la sezione dopo) e ha
scelto il filtro senza `atempo`.

Misurato sulle tracce vere, non piu' proiettato:

```
grezzo totale      62,05 min
lavorato totale    59,13 min   (3.547,7 s)
+ scene mute          39 s     (copertina 3 + chiusura 10 + 13 card da 2)
MONTATO PREVISTO   59,78 min   contro i 60 dichiarati: -13 secondi
CPS reale          15,92 car/s (la traccia 1 da sola ne prometteva 15,68)
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

Il risultato misurato gli da' ragione: 59,78 min, tredici secondi sotto l'ora.
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
trascrizione, 17 tracce (+1 ripetuta, vedi sotto)          $3,38
                                                           ------
                                                           $12,71
```

Con `generations_count` al suo default di 4 la sola voce sarebbe costata $37,3.

**$0,19 spesi per niente, dichiarati.** La trascrizione della traccia 16 e'
partita ma la chiamata e' andata in timeout senza restituire il session_id, e
senza quello il testo non e' recuperabile: il lavoro era fatto e pagato ma non
raggiungibile. Ho verificato sul flow che fosse davvero partita (per non
lanciarne una seconda alla cieca) e poi l'ho rilanciata di proposito, scegliendo
di pagare $0,19 invece di lasciare 2.650 caratteri senza verifica.

## Da verificare — quello che non ho potuto giudicare io

- **Nessuno ha ancora ascoltato nessuna delle 17 tracce.** Le durate sono
  misurate, il timbro no: non posso sentire. Stanno in `audio/grezzo/` e sul
  flow. Da ascoltare almeno gli attacchi e le chiuse delle 17, e i tre punti in
  cui un capitolo e' stato spezzato in due tracce (3, 4, 6): e' li' che uno
  stacco di timbro si sentirebbe.
- **La verifica sui CONFINI non e' stata fatta con la trascrizione.**
  `prova.mp3` (186 spezzoni da 1,6 s prima di ogni taglio) e' pronto ma non
  trascritto. La verifica fatta e' quella sulla traccia intera, che dimostra che
  la voce ha detto tutto ma NON dove cadono i tagli, perche' la trascrizione non
  porta i tempi. Per i confini restano l'allineamento DTW, il controllo
  statistico e il conto sull'audio grezzo - che hanno gia' trovato e corretto
  cinque confini.
- Lo stato del CCNL e gli importi del fac-simile: sono i due punti aperti qui sopra.
- La tabella dei capitoli dello script (da 01:53 a 56:23) e' calcolata su 60
  minuti. Qualunque filtro si scelga, i minutaggi vanno rifatti sulle durate
  reali dei blocchi, non su quella tabella.
- Gli asset non esistono ancora: 126 PNG di slide, 12 animazioni, 16 clip
  b-roll, piu' l'avatar, che lo script stesso segna «da confermare».
