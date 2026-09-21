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
traccia 1, gia' generata      1.739 car    $0,29   fatto
le altre 16                  54.733 car    $9,04   NON generate
                                           ------
                                           $9,33
```

Con `generations_count` lasciato al suo default di 4 sarebbero stati $37,3.

## Perche' le altre 16 tracce non sono state generate

La checklist dello script ha due caselle non spuntate, e riguardano **fatti che
la voce pronuncia**:

- lo stato del CCNL 2025-2027 (*ipotesi o definitivo*): 26 scene lo nominano,
  fra cui s022 «l'**ipotesi** di rinnovo equipara i neoassunti»;
- gli importi del fac-simile sulle tabelle AOUP 2026: 53 scene, e gli importi
  sono detti **a parole** — s037 «due euro e settantaquattro centesimi»,
  s058 «centotrenta euro e venti centesimi», s047 «firmato in via definitiva il
  ventisette ottobre duemilaventicinque».

Il controllo automatico «nessuna cifra nel parlato» passa proprio perche' sono
scritti in lettere: la forma e' giusta, il fatto puo' non esserlo.

Quelle scene toccano quasi tutte le 17 tracce, e una traccia non si corregge a
meta': o e' quella giusta, o si rifa' tutta. Generare adesso vuol dire rischiare
di pagare $9 due volte — l'errore che il MASTER elenca come «voce rigenerata
perche' il copione e' cambiato dopo».

## Da verificare — quello che non ho potuto giudicare io

- **Nessuno ha ancora ascoltato la traccia 1.** La durata e' misurata, il timbro
  no: non posso sentire. Sta in `audio/grezzo/traccia01.mp3` e sul flow.
- Lo stato del CCNL e gli importi del fac-simile: sono i due punti aperti qui sopra.
- La tabella dei capitoli dello script (da 01:53 a 56:23) e' calcolata su 60
  minuti. Qualunque filtro si scelga, i minutaggi vanno rifatti sulle durate
  reali dei blocchi, non su quella tabella.
- Gli asset non esistono ancora: 126 PNG di slide, 12 animazioni, 16 clip
  b-roll, piu' l'avatar, che lo script stesso segna «da confermare».
