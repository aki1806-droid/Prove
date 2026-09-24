# Registro — Modulo 3 · micro-lezione 3.3 «Nutrizione e valutazione dello stato nutrizionale»

Fabbisogni, BMI, screening, le tre condizioni da non confondere, e poi la
disfagia per metà lezione. Due corpi nuovi: la **fascia** (una scala a segmenti
con le soglie, qui il BMI) e le **consistenze** (tre bicchieri che versano in
una gola: il fluido corre, l'addensato scorre piano, la doppia consistenza
si separa). Tre illustrazioni nuove: la sagoma con il muscolo dentro
(sarcopenia), la sezione della gola, la tazza con beccuccio.

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
| costo voce | $1,53 (A $0,77 · B $0,76) |
| costo trascrizioni | $0,62 |
| pause senza voce | nessuna; due pose brevi sulle slide sul verde (s22, s32) |

```
CARATTERI  9.157          BLOCCHI  48         SCENE  50/50
stima a 17,0 car/s        9:14.0
tracce grezze             A 332,8 s  ·  B 346,6 s   (stacco dopo s25)
silenzi                   fattore 1,105   ->   atempo 1,142
montato locale            9:15.3
```

Il copione è uscito a 8.829 caratteri al primo giro e con due blocchi lunghi
(l'anziano che non mangia, 251 e 229): dieci blocchi corti sono stati
allungati di una chiusa, i due lunghi accorciati senza togliere una causa
delle sette. I numeri sono scritti a parole perché la voce li legga bene
(«venticinque-trenta chilocalorie», «diciotto e mezzo», «uno virgola due»).

## I confini

| | traccia A | traccia B |
|---|---|---|
| blocchi | 24 | 24 |
| blocchi fuori fascia | 0 | 0 |
| tagli dentro una pausa | 23 su 23 | 23 su 23 |
| coppie adiacenti di segno opposto | nessuna | nessuna |

Nessun confine spostato a mano. La trascrizione conferma: **718/724 e 697/701
parole**, nessun buco; le sei rese diverse sono grafie e abbreviazioni
(«chilocalorie» / «kcal», «millilitri» / «ml», «schiarimento» / «squerimento»).

### I decimali, e un buco che non c'era

Al primo confronto la verifica segnalava **due buchi da tre parole** su s06 e
s07: il copione dice «uno virgola due-uno virgola cinque», il trascrittore
scrive «1,2-1,5». Tolta la punteggiatura, «1,2» diventava «1 2», e una regola
già esistente lo leggeva come il rimando alla lezione 1.2. Non era un buco:
era una resa. `verifica-testo.py` ora salva la virgola decimale prima di
togliere la punteggiatura e fa convergere le tre forme («uno virgola due»,
«diciotto e mezzo», «ventiquattro e nove», «24,9») su una sola parola. Il
confronto è tornato a zero buchi senza toccare copione né voce.

## Le scene

| scene | corpo | contenuto |
|---|---|---|
| s01, s50 | copertina | la lezione; la prossima (3.4) |
| s02, s04, s08, s17, s21, s26, s47 | figura | letto, bocca, termometro, bilancia, sarcopenia, gola, beccuccio |
| s05, s07 | tre (cifre) | i fabbisogni: 25–30 · 0,8–1 · 30 · 25–30 |
| s10–s12 | **fascia** | le sei classi del BMI, e la soglia a 22 nell'anziano |
| s13–s15, s18–s20, s28–s30, s42 | griglia | MUST/MNA/NRS · malnutrizione/sarcopenia/cachessia · i sei segni · dopo il pasto |
| s09, s16, s24, s31, s46 | trappola | febbre, albumina, pH, aspirazione silente, PEG |
| s22, s32 | titolo profondo | obesità sarcopenica; l'aspirazione silente |
| s23–s25, s48–s49 | raggiera | sei conseguenze; sette cause dell'anziano che non mangia |
| s27 | mappa (gola) | orofaringea, esofagea |
| s33 | frase | «Nulla per bocca» |
| s35, s36 | percorso, bivio | il test dell'acqua e il suo esito |
| s38–s40 | **consistenze** | fluido, addensato, doppia consistenza |
| s41 | posizioni (pasto, reclinato) | seduto a 90° con il capo flesso; mai reclinato |
| s03, s06, s34, s37, s43–s45 | tre, sostituzione, catena, confronto | il resto |

## Correzioni fatte guardando i provini

- **Le icone degli ausili in 3.2 e i bicchieri qui**: la prima versione delle
  consistenze aveva un filo tratteggiato e gocce da 10 px, invisibili a 640
  di anteprima. Ora c'è un tubo largo e chiaro, il bicchiere è inclinato e
  versa, le gocce sono da 14 a 24 px e il solido è scuro.
- **La gola aveva un volto**, e sembrava un uccello: è diventata una sezione
  senza volto, con palato, lingua, faringe, epiglottide, trachea con gli
  anelli ed esofago. I due richiami della mappa stanno sulla faringe e
  sull'esofago.
- **«Organizzazione» non stava nel cerchio** della raggiera a sette: è
  diventata «Contesto», con la didascalia che spiega.
- **La griglia a tre colonne sforava di 3 px**: «Ospedalizzato» accanto a
  «NRS-2002» non andava a capo. `min-width:0` sulla cella e
  `overflow-wrap:anywhere` sul testo.

---

## La resa

| | |
|---|---|
| resa pubblicata | *in corso* |
| lotto asset | *in corso* |

---

## Da verificare

- Le gocce dei bicchieri corrono lungo un `offset-path`: Chromium lo rende,
  e la clip è registrata da Chromium, quindi il fotogramma finale è quello
  giusto. Se un giorno le clip si facessero con un altro motore, le gocce
  resterebbero ferme in cima.
- La fascia del BMI va da 14 a 46: la classe «≥ 40» è tagliata a 46 per
  disegnarla. Se il committente preferisce una freccia aperta a destra, si
  aggiunge un tratto, non si cambia la scala.
