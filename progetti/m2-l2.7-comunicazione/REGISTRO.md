# Registro — Modulo 2 · micro-lezione 2.7 «Comunicazione clinica e continuità assistenziale»

Prima lezione in cui il controllo statistico e il controllo delle pause hanno
lavorato insieme dal primo giro. E prima lezione in cui una slide sbagliata
non era un errore di contenuto, ma un **template usato per una cosa che non
sa fare**.

---

## Scheda parametri

| | |
|---|---|
| durata chiesta dallo script | 9 minuti e 30 |
| durata ottenuta | **9:21.1** |
| slide dello script | 19 |
| scene | 50 (il tetto) |
| blocchi di parlato | 48 |
| voce | GianP — News Info and Documentary, `eleven_v3` |
| costo voce | $1,54 |
| costo trascrizioni | $0,60 |
| pause senza voce | nessuna; tre pose brevi dentro il parlato |

```
CARATTERI  9.230          BLOCCHI  48         SCENE  50/50
stima a 17,0 car/s        9:19.5
reale                     9:21.1      (parlato 547,8 s, 16,8 car/s)
```

Un secondo e sei di scarto. Fattore dei silenzi **1,113** (settimo valore
diverso in sette lezioni), atempo calcolato **1,086**.

---

## I due controlli, insieme

| | traccia A | traccia B |
|---|---|---|
| scarto tipico | 0,53 s | 0,94 s |
| blocchi fuori fascia | 0 | 0 |
| coppie adiacenti di segno opposto | nessuna | nessuna |
| tagli dentro una pausa | 23 su 23 | 23 su 23 |

E il confronto con la trascrizione: **99,4%** su A, **100,0%** su B, zero
buchi. I due scarti di A sono sviste del trascrittore, non della voce:
«arantoli» per «ha rantoli» e «semi seduta» per «semiseduta».

Il copione e' stato scritto a 51 blocchi e portato a 48 accorpando tre coppie
che dicevano la stessa cosa a meta'. Vale la pena notarlo: il tetto di 50
scene non e' un vincolo che si subisce, e' una revisione che si fa comunque.

---

## Un template usato per quello che non sa fare

La slide dei tre momenti — briefing, time-out, debriefing — era stata scritta
come `assetempo`, l'asse cronologico. `assetempo` vuole **anni veri** in `da`,
`a` e `decenni`; con `decenni: []` e valori 0-100 ha stampato **«undefined»**
sulle etichette dell'asse.

E non ha sforato niente. Il controllo della cornice, che e' l'unico
automatico, l'ha lasciata passare senza una parola. Una slide con scritto
«undefined» due volte sarebbe andata in resa se non l'avessi guardata nel
provino.

Sostituita con `catena`, che e' la forma giusta per tre momenti in sequenza
senza date. Il limite e' ora scritto sopra la funzione, come per `icone` in
2.6: **la libreria ha due modi di rompersi che il controllo automatico non
vede** — uscire dalla cornice lo vede, stampare `undefined` no.

---

## Tre forme sbagliate per contenuti giusti

Tutte e tre passavano il controllo della cornice. Tutte e tre dicevano una
cosa diversa da quella che la voce diceva.

- **s07** — l'handover era un **Venn**. Ma un Venn dice «che cosa hanno in
  comune», e il punto qui e' che il passaggio trasferisce **tutte e due** le
  cose, informazioni *e* responsabilita'. Diventato un confronto.
- **s31** — le barriere erano una **matrice** con le colonne «la barriera» e
  «un esempio». Risultato: «bassa alfabetizzazione sanitaria» compariva come
  *esempio* di «dolore, ansia, deficit sensoriali». Non e' un esempio, e' una
  barriera diversa. Sono due elenchi, non una matrice: diventata un confronto.
- **s12-s14** — le tre tabelle della chiamata al medico avevano la prima
  intestazione vuota, e la colonna delle lettere SBAR sembrava un margine.

---

## La resa

| | |
|---|---|
| resa pubblicata | `81a2005c747af9bf2fb98c139274e9d5` — **9:19.7** |
| lotto asset | `3456c99a5f4748d88b17865892db33e1` (98 file) |

---

## Da verificare

- Il primo dei due modi di rompersi e' **automatizzato**: `cards.mjs` adesso
  legge il testo reso di ogni slide e segnala «undefined», «NaN» e
  «[object Object]». Provato rimettendo il difetto originale, che viene
  segnalato («DATI MANCANTI A SCHERMO: s20 undefined»), e poi ripristinato:
  un controllo non provato non e' un controllo.
- Il secondo no: che una matrice dica il falso sui suoi stessi assi lo vede
  solo chi guarda i provini. Resta un passo umano, e va tenuto nel MASTER
  come tale.
