# Registro — Modulo 5 · micro-lezione 5.1 «Principi di farmacologia per l'infermiere»

La lezione che apre il modulo della farmacologia, e quella che gli dà i
corpi: cinque nati qui, tutti meccanismi e non elenchi. L'**ADME** è un vaso
che si disegna con quattro stazioni che si accendono nell'ordine della voce
(la pillola entra, i rami vanno ai tessuti, il fegato sopra la M, il rene
sotto la E) e tre puntini del farmaco che corrono nel lume. L'**emivita** è
la curva che si dimezza a ogni t½ con i livelli 100, 50, 25, 12,5 segnati, e
in modo `accumulo` le dosi ripetute che salgono a dente di sega fino al
plateau dello steady state. La **finestra** è la banda fra la concentrazione
minima efficace e quella tossica, con la stessa dose che la rispetta quando è
ampia e la supera quando è `stretta`, e la lista dei sette farmaci da TDM a
destra. Il **recettore** è la membrana con la tasca: a sinistra l'agonista
cala e il segnale parte, a destra l'antagonista la occupa e il segnale non
parte. Il **legame** sono le albumine che tengono i puntini scuri del farmaco
legato e i pochi liberi in accento; con tre albumine invece di sei, i liberi
diventano quattordici.

Sette illustrazioni nuove: la pillola (capsula e compressa), il fegato con
la colecisti, il rene con l'uretere, il pompelmo a spicchi, il triangolo nero
rovesciato, l'anziano con il bastone, il recettore.

---

## Scheda parametri

| | |
|---|---|
| durata chiesta dallo script | 9 minuti e 30 |
| durata ottenuta | vedi «La resa» |
| slide dello script | 18 |
| scene | 50 (il tetto) |
| blocchi di parlato | 48 |
| voce | GianP — News Info and Documentary, `eleven_v3` |
| costo voce | $1,48 (A $0,75 · B $0,73) |
| costo trascrizioni | $0,57 |
| pause senza voce | nessuna; due pose brevi sulle slide sul verde (s29, s32) |

```
CARATTERI  8.853          BLOCCHI  48         SCENE  50/50
stima a 17,0 car/s        8:56.2
stacco tracce             dopo s26   (chunk A 4.496 car · chunk B 4.357 car)
tracce grezze             A 323,9 s  ·  B 308,5 s
silenzi                   fattore 1,089   ->   atempo 1,115
```

Lo script è di 8.188 caratteri di voce per 18 slide: dodici blocchi sono
stati allargati con contenuto dello script stesso (la mappa delle otto
lezioni, «da cento a cinquanta, poi a venticinque», la dose di carico, «uno
studia il farmaco, l'altro studia il processo», il filtrato e la clearance).
Lo script chiede che la finestra terapeutica resti a schermo più a lungo:
ha tre scene (s18–s20).

## I confini

| | traccia A | traccia B |
|---|---|---|
| blocchi | 25 | 23 |
| blocchi fuori fascia | 0 | 0 |
| tagli nel parlato | nessuno | nessuno |

### La verifica per trascrizione

Le trascrizioni partono dagli mp3 caricati come asset. La traccia A conferma
**695/699 parole**, la B **655/661**, nessun buco. Le rese diverse (non
buchi): s16 e s48 «quattro-cinque» sentito «4, 5» (la regola del trattino lo
legge come rimando a una lezione, il trascrittore come due numeri); s36 e s43
«ipoalbuminemia» sentito «ipoalbumina».

## Le scene

| scene | corpo | contenuto |
|---|---|---|
| s01, s50 | copertina | i principi; la 5.2 |
| s03 | anello | le otto lezioni del modulo, con le illustrazioni di figure.mjs quando la clinica non ha il nome |
| s07–s08 | **adme** | A e D accese; poi M ed E, con fegato e rene |
| s13–s14 | **legame** | albumina normale; ipoalbuminemia con warfarin e fenitoina |
| s15–s16 | **emivita** | la curva che si dimezza; l'accumulo fino allo steady state |
| s18–s19 | **finestra** | ampia; stretta, con i sette farmaci da TDM |
| s21 | **recettore** | agonista e antagonista, il naloxone |
| s05–s06, s24–s25 | colonne | cinetica e dinamica; induttori, inibitori, farmacodinamiche |
| s11, s31, s44, s47 | percorso | il primo passaggio; come si segnala; che cosa fai; la catena veneta |
| s34 | bivio | errore che causa una reazione: entrambe le segnalazioni |
| s35–s37 | griglia | l'anziano, in tre accensioni |
| s29, s32 | titolo sul verde | «le più temute»; «basta il sospetto» |
| il resto | icone, frase, confronto, tre, cifre, figura, sostituzione, catena, griglia | — |

## Correzioni fatte guardando le card

- **Il fegato era un cerchio con una croce**: la sagoma a comandi relativi
  si chiudeva su se stessa. Ridisegnata a comandi assoluti, lobo destro
  grande e sinistro a punta, con il legamento e la colecisti.
- **I triangoli delle dosi stavano sull'asse**, sopra le tacche «1 t½»:
  spostati sopra ogni picco, con la punta in giù.
- **La lista dei sette farmaci usciva dal riquadro in alto** (il flex la
  centrava): oltre le cinque voci la lista si stringe (`fitta`).
- **«tossicità» copriva «concentrazione tossica»**: salita di 36 px.
- L'illustrazione `fiala` ha una croce sopra (è la fiala da non riusare):
  per gli aminoglicosidi si usa la siringa.

---

## La resa

| | |
|---|---|
| resa pubblicata | `018849a44c2df09bfd81b0ba739676b9` — 536.350 s (8:56.4), 1080p 16:9, resa in 101 s, con SRT (`subtitle_url`) |
| lotto asset | `f91b0a2c06fa4a3a86bc7048f0d5418e` — 98 file, 20 MB, tutti completati |

---

## Da verificare

- La regola del trattino in `verifica-testo.py` legge «quattro-cinque» come
  rimando a una lezione («lezione45»): non è un buco, ma sporca il conteggio
  degli scarti. Un rimando a lezione ha sempre una cifra fra 1 e 9 seguita da
  una fra 1 e 8; «quattro-cinque emivite» pure. Si distingue solo dal
  contesto, e per ora resta uno scarto dichiarato.
