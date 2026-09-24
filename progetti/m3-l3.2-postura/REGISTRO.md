# Registro — Modulo 3 · micro-lezione 3.2 «Postura, mobilizzazione e sindrome da immobilizzazione»

La lezione in cui la terza generazione grafica cresce di cinque corpi: il
letto visto di lato con la persona che si disegna, la sagoma con gli organi,
la curva forza/tempo, le tre forze che muovono davvero qualcosa, la triade.
Undici illustrazioni nuove (colon, gambe, tallone, i sei ausili, l'appoggio
al bastone, il sollevamento con le gambe).

---

## Scheda parametri

| | |
|---|---|
| durata chiesta dallo script | 9 minuti e 30 |
| durata ottenuta | vedi «La resa» |
| slide dello script | 19 |
| scene | 50 (il tetto) |
| blocchi di parlato | 48 |
| voce | GianP — News Info and Documentary, `eleven_v3` |
| costo voce | $1,52 (A $0,80 · B $0,72) |
| costo trascrizioni | $0,61 |
| pause senza voce | nessuna; due pose brevi sulle slide sul verde (s18, s40) |

```
CARATTERI  9.122          BLOCCHI  48         SCENE  50/50
stima a 17,0 car/s        9:12.0
tracce grezze             A 360,2 s  ·  B 311,2 s   (stacco dopo s26)
silenzi                   fattore 1,135   ->   atempo 1,102
montato locale            9:13.4
```

Il copione è uscito a 8.822 caratteri al primo giro, sotto la fascia: dieci
blocchi corti sono stati allungati di una frase ciascuno (una chiusa che
riprende il senso, mai un dato nuovo), e uno da 231 è stato accorciato. Le
parti dello script ci sono tutte: nove posizioni, quattro associazioni, il
perché anatomico del clistere, otto apparati, la progressione in cinque tappe,
l'alzata in due tempi, i cambi posturali, le tre forze, la triade, sei misure,
i segni della TVP e la regola d'oro, sei ausili, otto principi di ergonomia.

## I confini

| | traccia A | traccia B |
|---|---|---|
| blocchi | 25 | 23 |
| blocchi fuori fascia | 1 (s02, l'apertura: 10,2 s per 170 caratteri, confine corretto) | 0 |
| tagli dentro una pausa | 24 su 24 | 22 su 22 |
| coppie adiacenti di segno opposto | nessuna | nessuna |

Nessun confine spostato a mano. La trascrizione conferma: **699/700 e 664/666
parole**, nessun buco; le tre rese diverse sono grafie («semiprona» / «semi
prona», «semiseduta», «contrazioni» / «contrazione»).

## Le scene

| scene | corpo | contenuto |
|---|---|---|
| s01, s50 | copertina | la lezione; la prossima (3.3) |
| s02, s11, s24, s30, s39, s44, s49 | figura | letto, colon, orologio, tallone, gambe, appoggio, sollevare |
| s04–s05, s07–s08 | **posizioni** | supina, prona, laterale, Sims; Fowler, semi-Fowler, ortopnoica, Trendelenburg e anti |
| s27 | **posizioni** (2 card) | seduto al bordo → in piedi |
| s09–s10, s23, s28, s46–s48 | griglia | le quattro associazioni; gli otto apparati in sintesi; quando fermarsi; gli otto principi |
| s13–s15, s19–s22 | **apparati** | la sagoma con gli organi, accesi nell'ordine della voce |
| s17 | **curva** | forza che scende in giorni e risale in settimane |
| s18, s40 | titolo profondo | «la forza si perde in giorni…»; «non si massaggia» |
| s25 | percorso | seduto a letto → cammino assistito |
| s29 | cifre | 2 h · 1 h · 30° |
| s31–s32 | **forze** | pressione, frizione, taglio, con il movimento |
| s34–s35 | **triade** | Virchow, poi la stasi sola |
| s36–s38 | raggiera | le sei misure contro la TVP |
| s42–s43 | icone (illustrazioni) | i sei ausili |
| s03, s06, s12, s16, s26, s33, s41, s45 | confronto, tre, sostituzione, elenco, norma | il resto |

In grassetto i corpi nati qui.

## Correzioni fatte guardando i provini

- **Gli spilli degli apparati coprivano gli organi.** Otto numeri rossi sopra
  cuore, polmoni e intestino in 300 px di sagoma: illeggibili. Ora stanno ai
  lati, fuori dal corpo, con una linea guida tratteggiata, e ogni organo
  dichiara da che lato e a che altezza vuole il suo numero.
- **Il letto occupava un terzo della card.** Il disegno è stato scalato di
  1,2 e il `viewBox` ritagliato; le etichette di Trendelenburg («testa in
  basso») sono passate sopra il disegno, perché sotto incontravano il titolo.
- **Le icone degli ausili uscivano tutte uguali** (il documento di ripiego):
  `icone` conosceva solo le icone a 24. Ora un nome sconosciuto cade sulle
  illustrazioni a 240, che `layout.mjs` collega all'avvio.
- **Il calore sulla gamba con l'edema** sembrava una parentesi: tre tratti
  radiali al posto delle due parentesi.
- **s27 (l'alzata) sforava di 296 px** con il disegno a 520: ridotto a 400, con
  `min-width:0` sulla card.
- **La copertina aveva il titolo su tre righe** e la riga dell'ente finiva
  sotto la barra rossa, che sembrava barrarla. Titolo ridotto a due righe
  («Postura, mobilizzazione, immobilizzazione»), il resto nel sottotitolo.
- **«Mobilizzazione» non stava nel cerchio della raggiera** (r = 100 px):
  la voce è diventata «Muoversi», con la spiegazione nella didascalia.

---

## La resa

| | |
|---|---|
| resa pubblicata | *in corso* |
| lotto asset | *in corso* |

---

## Da verificare

- La persona sul letto è uno stick figure a tratto tondo: leggibile a colpo
  d'occhio, ma senza volume. Se il committente vuole più corpo, la strada è
  una sagoma piena (come `persona`) ruotata per posizione, non un disegno per
  posizione.
- Le tre forze muovono l'osso o i tessuti di 34–70 px: nella clip da 3,2 s il
  movimento avviene fra 1,5 e 2,4 s e il fotogramma finale è quello spostato.
  Se sembra troppo rapido, si allunga `.mossa` a 1,4 s senza superare i 2,8.
