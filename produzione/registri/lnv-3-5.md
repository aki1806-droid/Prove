# Registro — 3.5 «Lo sguardo che mandi tu»

**Delle cinque lezioni del modulo, quattro tolgono strumenti e questa li dà.**
È la proporzione reale, e il copione la dice invece di nasconderla (`s06`).
La cosa utile sta in tre movimenti: guarda mentre l'altro parla, stacca
mentre parli tu, torna quando riprende. L'ultimo dei tre è quello che quasi
nessuno fa, perché sembra superfluo.

| campo | valore |
|---|---|
| video_id | `586431bd2f9519ae6515c01548cc3c66` |
| scene | 50 — copertina, 48 blocchi, chiusura di modulo |
| formato | 16:9, 1080p |
| durata | 604,3 s (10:04) — misurata sul montato |
| parlato | 592,5 s (563,4 s di voce tagliata + 29,1 s di pose) |
| voce | Luca Ward `tVdVcJPudubxmTmAw4tE`, `eleven_v4`, 1,12× in post |
| flow ElevenLabs | `KkzeRopnLe0HeGScgXPU` |
| tracce | A `q23SO2sCngxYpKEW1HAT` · B `9tzj1O1pmVQAWCuP5VEk` · C `DjpiWtHOI9rKJp782YHA` |

## È la lezione più lunga del modulo, e non per caso

Il bersaglio di parlato è 587 s. Qui `pose.py` ha chiuso a **592,5 s con
supplemento di base zero**: i minimi di lettura delle slide, da soli, superano
già il bersaglio. Non c'è margine da distribuire, e il montato esce a 10:04
invece dei 9:59 delle altre quattro.

**È il comportamento voluto dallo standard, non un difetto**: il minimo per
tipo di schermata vince sul bersaglio, perché una slide che sta in scena meno
del tempo di essere letta è peggio di una lezione lunga cinque secondi in più.
La causa è la composizione: sedici schermate di elenco, che chiedono 5 s di
minimo e 0,9 s di supplemento ciascuna. Ha un precedente: la 2.5, 10:02.

## Il copione è stato riscritto

Da **4.273** caratteri di parlato nello script a **10.390**, media 216 per
blocco. Nessun aneddoto, come chiede il modulo 3.

Quello che è stato aggiunto, e perché:

- **perché con te stesso la causa si conosce** (`s02`–`s05`). È l'unica
  eccezione di tutto il corso alla regola che la causa non si vede, e lo
  script la dà per scontata. Il copione la dichiara come eccezione, con il
  nome: su di te non c'è niente da dedurre, c'è solo da decidere;
- **perché la regola di ritmo costa poco** (`s21`–`s24`): non stai aggiungendo
  niente al tuo repertorio, stai togliendo un'interferenza che qualcuno ci ha
  messo dentro. È la ragione per cui funziona anche senza pensarci;
- **i due lavori opposti dello stesso gesto** (`c32`). Chi parla e guarda
  chiede qualcosa; chi ascolta e guarda dà qualcosa. Lo script dice che lo
  sguardo di chi ascolta non è invadente, ma non dice perché;
- **l'avvertenza sullo sguardo costruito** (`s37`–`s40`), che è l'unico punto
  del corso in cui si può peggiorare provando a migliorare. Non si riconosce
  il contenuto di quello che pensi: si riconosce lo sforzo;
- **i tre casi in cui la regola va adattata** (`s34`–`s36`), tenuti distinti
  e con la ragione di ciascuno, perché la regola generale lì produce
  l'effetto sbagliato.

## Le grafiche

Quarantasette slide, di cui **cinque con un disegno o un'infografica** e
**una ciclica**: `c20`.

| slide | tipo | cosa mostra |
|---|---|---|
| `c06` | barre | Quattro lezioni tolgono, una dà: la proporzione reale del modulo. |
| `c20` | anello (ciclica) | Guarda, stacca, torna. Il cerchio si chiude da solo. |
| `c23` | confronto | Quanto si guarda mentre si parla e mentre si ascolta. |
| `c32` | bivio | Lo stesso gesto, due lavori opposti: chiedere e dare. |
| `c33` | bilancia | Effetto e sforzo: il miglior rapporto di tutto il corso. |

**Le ho guardate tutte e quarantasette da ferme prima di animarle**, non solo
le cinque con un disegno. Due difetti corretti in quel passaggio, tutti e due
della stessa famiglia — **didascalia troppo lunga**:

- `c20`: la didascalia andava a due righe, spingeva la figura in alto e il
  kicker finiva sopra il logo. Riscritta in una riga;
- `c33`: la didascalia andava a tre righe e l'ultima finiva sopra il filetto.
  Riscritta in una riga.

È la stessa cosa già annotata per `c22` della 3.3, e adesso è successa due
volte nella stessa lezione: **la didascalia di una figura sta in una riga.**

## Le tre riprese

| blocco | cosa | perché lì |
|---|---|---|
| `s07` | uno specchio appannato in un bagno, il vapore che si dirada | sta sulla frase che rovescia la lezione: governare i propri segnali sembra solo educazione, ed è il contrario |
| `s29` | due persone a un tavolo, di profilo, quella di destra ascolta con il viso rivolto verso l'altra | apre la parte sull'effetto dello sguardo di chi ascolta: è esattamente la cosa di cui si parla |
| `s41` | l'interno di un'auto dal sedile posteriore, due sagome davanti, strada fuori fuoco | sta su «è il motivo per cui certe confidenze arrivano in macchina» |

**Le ho viste tutte e tre.** È la prima volta nel modulo: nella 3.3 una delle
tre era stata montata senza che la guardassi. Il metodo che funziona è
generare le tre in un batch unico e poi chiedere ciascuna singolarmente, una
chiamata per immagine: la richiesta in blocco restituisce l'anteprima di una
sola.

## I tagli

`banda.py banda` ha segnalato **due confini sospetti**, tutti e due nella
traccia C e tutti e due con la firma uguale e opposta:

- `s48` −1,35 e `s49` +1,55 → confine spostato da 191,54 a 192,93 s. Residui
  −0,39 e +0,59;
- `s42` +1,38 e `s43` −1,40 → confine spostato da 115,74 a 113,42 s, che è un
  miglioramento, non una correzione: erano già dentro banda. Residui −0,39 e
  +0,37.

Dopo le correzioni resta **un solo confine fuori banda su quarantacinque**:
`s31`, +1,81. Non è un confine spostato: è un blocco letto più lento della
media della traccia, 16,4 car/s contro 18,54. `banda.py sposta` elenca le
pause vicine e nessuna migliora la coppia — a 174,25 s il difetto passa
semplicemente da `s31` a `s32`. Lasciato dov'è.

**La garanzia che si può dare**: tutti e quarantacinque i tagli cadono dentro
un silenzio, e il più stretto è di **0,35 s** con 0,18 s di margine per lato
(`s02`, a 14,29 s). È il secondo margine più largo del corso, dopo i 0,38 s
della 3.1: nella 3.3 il più stretto era 0,22 s, nella 3.4 0,28 s.

**I confini non sono verificati parola per parola**: la trascrizione di
controllo non è stata possibile.

## Il montato è stato verificato scena per scena

Dopo la 3.1 e la 3.2, rimontate tutte e due per un errore di indice sulla
scena ciclica, il montato viene riletto con `get_video_scenes` e confrontato
con `scene.json`. Qui torna: `loop` sull'indice 19, cioè il blocco `s20` e la
slide `c20`; `freeze` su tutte le altre; le tre immagini agli indici 6, 28 e
40, cioè `s07`, `s29` e `s41`.

## Da verificare

Non sento l'audio e non vedo il montato in riproduzione. Ho guardato tutte e
quarantasette le slide da ferme e tutte e tre le riprese. **I quarantacinque
tagli non sono verificati con la trascrizione**, e `s31` resta fuori banda di
1,81 s.

## Blocchi

`·` disegno o infografica · `▪` ripresa


| blocco | slide | tipo | durata (s) | posa (s) |
|---|---|---|---|---|
| s02 | `c02` | frase | 12.54 | +0.00 |
| s03 | `c03` | elenco | 9.75 | +0.90 |
| s04 | `c04` | memo | 15.15 | +0.60 |
| s05 | `c05` | frase | 11.31 | +0.00 |
| s06 | · `c06` | barre | 12.51 | +1.30 |
| s07 | ▪ specchio-appannato | ripresa | 6.54 | — |
| s08 | `c08` | elenco | 14.30 | +0.90 |
| s09 | `c09` | elenco | 16.94 | +0.90 |
| s10 | `c10` | elenco | 15.71 | +0.90 |
| s11 | `c11` | elenco | 10.87 | +0.90 |
| s12 | `c12` | sostituzione | 15.93 | +0.90 |
| s13 | `c13` | memo | 12.53 | +0.60 |
| s14 | `c14` | frase | 11.01 | +0.00 |
| s15 | `c15` | numero | 14.24 | +0.90 |
| s16 | `c16` | frase | 10.06 | +0.00 |
| s17 | `c17` | frase | 13.77 | +0.00 |
| s18 | `c18` | memo | 4.60 | +1.62 |
| s19 | `c19` | frase | 10.66 | +0.00 |
| s20 | · `c20` | anello | 7.80 | +2.87 |
| s21 | `c21` | frase | 12.28 | +0.00 |
| s22 | `c22` | frase | 12.45 | +0.00 |
| s23 | · `c23` | confronto | 15.06 | +1.30 |
| s24 | `c24` | memo | 12.20 | +0.60 |
| s25 | `c25` | frase | 7.76 | +0.00 |
| s26 | `c26` | elenco | 12.29 | +0.90 |
| s27 | `c27` | frase | 16.07 | +0.00 |
| s28 | `c28` | frase | 13.71 | +0.00 |
| s29 | ▪ due-al-tavolo-di-profilo | ripresa | 4.67 | — |
| s30 | `c30` | elenco | 16.00 | +0.90 |
| s31 | `c31` | frase | 15.38 | +0.00 |
| s32 | · `c32` | bivio | 12.80 | +1.30 |
| s33 | · `c33` | bilancia | 14.80 | +1.30 |
| s34 | `c34` | memo | 12.16 | +0.60 |
| s35 | `c35` | elenco | 11.11 | +0.90 |
| s36 | `c36` | elenco | 12.01 | +0.90 |
| s37 | `c37` | frase | 10.43 | +0.00 |
| s38 | `c38` | elenco | 15.41 | +0.90 |
| s39 | `c39` | frase | 9.91 | +0.00 |
| s40 | `c40` | elenco | 15.47 | +0.90 |
| s41 | ▪ auto-dal-sedile-posteriore | ripresa | 2.90 | — |
| s42 | `c42` | frase | 11.23 | +0.00 |
| s43 | `c43` | memo | 14.97 | +0.60 |
| s44 | `c44` | frase | 13.15 | +0.00 |
| s45 | `c45` | frase | 11.76 | +0.00 |
| s46 | `c46` | elenco | 15.64 | +0.90 |
| s47 | `c47` | elenco | 12.91 | +0.90 |
| s48 | `c48` | memo | 4.60 | +1.94 |
| s49 | `c49` | elenco | 27.10 | +0.90 |
