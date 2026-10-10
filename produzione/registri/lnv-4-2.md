# Registro — 4.2 «L'orientamento: dove puntano i piedi»

**È una lezione con due metà che non si somigliano**, e la differenza fra le
due è il punto. La prima smonta l'affermazione più ripetuta di tutta la
divulgazione sul linguaggio del corpo — i piedi puntano dove la persona
vorrebbe andare — e lo fa con tre strumenti già visti nei moduli precedenti,
senza bisogno di niente di nuovo. La seconda mette al suo posto un fenomeno
documentato da sessant'anni, la formazione di Kendon, che è più utile della
credenza che sostituisce. Da una parte un'affermazione ripetuta senza prove,
dall'altra un comportamento osservato e verificato.

| campo | valore |
|---|---|
| video_id | `8a1910badeaab1b88881337b633208c4` |
| scene | 50 — copertina, 48 blocchi, chiusura |
| formato | 16:9, 1080p |
| durata | 598,6 s (9:58) — misurata sul montato |
| parlato | 586,9 s (546,5 s di voce tagliata + 40,3 s di pose) |
| voce | Luca Ward `tVdVcJPudubxmTmAw4tE`, `eleven_v4`, 1,12× in post |
| flow ElevenLabs | `3iRcdmBoeEOK6oWLOP1c` |
| tracce | A `VfBrMGwJ4fDDwQTcfpQU` · B `XNG5FKhLg36zUiyxLmvc` · C `wy2yCdTGewGjQA8PwnWm` |
| batch HeyGen | `54863b1b8ed143ec81721d6ced1e4521`, 95 file |

## La taratura nuova ha funzionato al primo colpo

È la prima lezione scritta sulla forbice rimisurata (10.150–10.250 caratteri
invece di 10.300–10.400, vedi §3 dello standard). Scritta e poi **tagliata
prima di generare la voce**: `allunga.py` l'aveva portata a 10.723 caratteri,
sono stati tolti 518 caratteri — otto aggiunte intere — per riportarla a
**10.212**.

Il risultato: nessuna rigenerazione, nessuno spostamento di confine da
rifare, 586,9 s di parlato contro un bersaglio di 587. Il costo della stessa
svista sulla 4.1 era stato un chunk rigenerato e cinque spostamenti rifatti
a mano. **Misurare prima costa due minuti; misurare dopo costa mezz'ora.**

La voce qui ha letto a **18,56 car/s sulla traccia A, 18,75 sulla B e 19,04
sulla C**: più svelta della 4.1 (18,2). Di conseguenza il supplemento di posa
è salito a 40,3 s, il più alto del corso, e le pose medie restano comunque
sopra il minimo di lettura per ogni tipo di schermata.

## Il copione

Da **4.067** caratteri di parlato nello script a **10.212**, media 213 per
blocco. La nota della lezione non vieta gli aneddoti e non ce ne sono: la
lezione vive di un fenomeno osservabile, e un aneddoto lo indebolirebbe.

Quello che è stato aggiunto, e perché:

- **le tre ragioni per cui la credenza non regge** (`s07`–`s11`), ciascuna
  con il rimando alla lezione in cui lo strumento è stato costruito: la
  causa non si vede (modulo 1), l'involontarietà non implica leggibilità
  (3.4), il ricordo selettivo. È la dimostrazione che il metodo del corso
  sta funzionando, e il copione lo dice ad alta voce;
- **le cinque cause banali** (`s08`–`s09`), elencate per nome. Senza
  l'elenco la frase «la causa non si vede» resta un'asserzione; con
  l'elenco chi ascolta si convince da solo;
- **la differenza fra formazione e disposizione** (`s14`). Una disposizione
  sta ferma, una formazione si mantiene attivamente: se qualcuno si sposta,
  gli altri si riorientano per conservarla. È l'intera base della mossa
  della scena 9, e lo script la dà per scontata;
- **perché il fenomeno è diverso da tutto il resto del corso** (`s20`–`s23`):
  non si deduce uno stato interno, si guarda cosa ha fatto un gruppo. È
  l'unico punto del corso in cui non c'è nessuna inferenza da fare;
- **la mossa, scomposta** (`s28`–`s32`): cosa non serve fare, cosa basta
  fare, entro quando, e perché il gruppo segue. Più il rimando alla 3.3 —
  guardare chi non viene mai guardato — di cui questa è la versione per il
  corpo;
- **la terza voce vuota** (`s45`). «Dei piedi, niente» resta nell'elenco
  apposta: un elenco di cose che funzionano ha bisogno anche di quello che
  non si usa.

**La scena 9 (`s25`–`s30`) non è stata accorciata**, come chiede la nota
dello script: è la parte della lezione che serve davvero a chi coordina un
gruppo.

Kendon si scrive e si dice «Kendon», e la fonte si sente ad alta voce in
`s15` con il nome e l'anno: Adam Kendon, anni Settanta.

## Le grafiche

Quarantasette slide, di cui **cinque con un disegno o un'infografica** e
**una ciclica**, `c14`:

| slide | tipo | cosa mostra |
|---|---|---|
| `c13` | raggi | Nessuno lo decide e nessuno lo propone. |
| `c14` | anello (ciclica) | Si mantiene da sola, e nessuno l'ha firmata. |
| `c16` | confronto | l'affermazione sui piedi contro la formazione |
| `c20` | bivio | Due secondi, e lo vede chiunque stia guardando. |
| `c29` | flusso | Tre secondi, e nessuno se ne accorge. |

`c14` è ciclica perché il movimento *è* il contenuto: la formazione si
mantiene attivamente, e un anello fermo direbbe il contrario di quello che
si sente in quel momento.

## Tre difetti trovati guardando

Tutte e quarantasette le slide sono state renderizzate come fermi immagine e
guardate su provini a quattro. Nessun difetto di layout — le regole del §7-bis
hanno retto — ma **tre difetti di senso**, che si vedono solo leggendo la
slide senza la voce sotto:

- **`c05`** diceva «Non è stata verificata e ha dato risultati deboli. / Non
  è mai stata verificata.» Nel parlato la prima parte è dentro una negazione
  («e non è che sia stata verificata e abbia dato risultati deboli»); sulla
  slide, senza quella negazione, le due righe si contraddicono. Riscritta:
  «Non ha dato risultati deboli. / Non è mai stata verificata.»;
- **`c16`** rispondeva «Sessant'anni» alla riga «Studi a cui rimandare». Una
  durata non è una risposta a una domanda su quanti studi ci sono. La riga è
  diventata «Verifiche», con «Nessuna» e «Sessant'anni di osservazioni»;
- **`c19`** andava a capo tre volte. Accorciata.

**È una classe di difetto diversa da quelle del §7-bis**: non è il layout che
si rompe, è la frase che regge solo con la voce sotto. Una slide si rilegge
muta, perché è così che la si guarda.

## I tagli

Quarantacinque confini, **tutti dentro un silenzio**, e **zero fuori banda**.
È il risultato migliore del corso insieme alla 3.1, alla 3.3 e alla 3.4.

`banda.py banda` aveva segnalato **sei confini**, tutti consecutivi fra `s08`
e `s14` e con la firma classica dello scarto uguale e opposto: un confine
spostato trascina i due blocchi che separa. Il caso peggiore era `s12`, un
blocco da 118 caratteri schiacciato in 2,47 s di voce contro i 6,36 attesi,
con **entrambi** i confini sbagliati.

Spostarli uno per uno non bastava: ogni singola mossa migliorava una coppia e
ne rompeva un'altra. La soluzione è stata una **ricerca a griglia** — provare
tutte le combinazioni di pause per i confini interni a una finestra di
blocchi, e tenere quella che minimizza lo scarto peggiore. Lo strumento è
`griglia.py`, scritto qui e riusabile:

```
python3 griglia.py <dir> <chunk> <primo_blocco> <ultimo_blocco>
```

Cinque spostamenti, e la banda è pulita. **La griglia va usata appena i
confini sospetti sono più di due e consecutivi**: `banda.py sposta` guarda
una coppia alla volta e su una catena non trova la soluzione.

I cinque silenzi più stretti su cui cade un taglio: `s45` 0,26 s · `s08`
0,26 s · `s09` 0,40 s · `s30` 0,41 s · `s31` 0,42 s. Il margine dal bordo non
scende mai sotto 0,13 s.

## Le riprese

Tre, `s12`, `s24` e `s33`. **Tutte e tre viste.**

- **`s12`** — quattro persone che conversano in piedi in un atrio, disposte
  in cerchio e orientate verso il centro. È esattamente la formazione di cui
  parla il blocco che segue;
- **`s24`** — una macchinetta del caffè in un corridoio, due bicchierini
  usati sopra, nessuno in campo. **Rigenerata una volta**: la prima versione
  portava un marchio reale ben leggibile sul pannello frontale. La seconda
  chiede esplicitamente nessun logo;
- **`s33`** — due sedie attorno a un tavolino, quella di destra leggermente
  ruotata verso l'altra, nessuno in campo.

Il CDN di Artlist è tornato raggiungibile proprio in questa lezione, quindi
le anteprime che il connettore non restituisce si recuperano scaricando il
file. È la strada da provare per prima quando un'anteprima non arriva.

## Il montato è stato verificato scena per scena

`get_video_scenes` sul video montato: cinquanta scene, le tre immagini
esattamente alle scene 11, 23 e 32 (cioè `s12`, `s24` e `s33`), la scena 13
in `playback: loop` — è `c14`, l'anello — e tutte le altre in `freeze` con
`volume: 0`. Copertina con la traccia muta da 3 s, chiusura con quella da
10 s.
