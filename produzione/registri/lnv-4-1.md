# Registro — 4.1 «Le distanze»

**È la lezione che apre il modulo sullo spazio, ed è la prima del corso in
cui lo strumento non è un segnale da leggere negli altri ma una cosa che
fai tu senza accorgertene.** Le quattro fasce di Hall si raccontano per
intero e poi si mettono da parte: quello che resta leggibile non è la
distanza, è chi la cambia e quando.

| campo | valore |
|---|---|
| video_id | `7c7f0dab16af639ca6b74f809b31d4c7` |
| scene | 50 — copertina, 48 blocchi, chiusura |
| formato | 16:9, 1080p |
| durata | 598,1 s (9:58) — misurata sul montato |
| parlato | 586,3 s (558,7 s di voce tagliata + 27,6 s di pose) |
| voce | Luca Ward `tVdVcJPudubxmTmAw4tE`, `eleven_v4`, 1,12× in post |
| flow ElevenLabs | `YVi28tnhbwSKpaMMDHm4` |
| tracce | A `WzJPXYXXNJDuufWxxPpa` · B `cjWSkAasqJqcDiCUoXfK` · C `IrIRlSYXQqadao61CtgZ` |
| batch HeyGen | `8cb26403275147dd88a5035fd4ccbaf5`, 96 file |

## La taratura dei caratteri è cambiata, e qui si è vista

Scritta con la forbice dello standard (10.300–10.400 caratteri per
quarantotto blocchi), la lezione è uscita a **597,2 s**: dieci secondi oltre
il bersaglio. Il margine non stava nelle pose — quelle erano già al minimo —
stava nel parlato.

La causa è una taratura vecchia. La forbice dello standard presuppone una
lettura intorno ai 17,5 car/s; la voce oggi, dopo l'1,12× e la rimozione dei
silenzi, legge a **circa 18,2 car/s**. A quella velocità il bersaglio di 587 s
si raggiunge con **10.150–10.250 caratteri**, non con 10.300–10.400.

La correzione è stata togliere **213 caratteri di riempimento dal chunk C** e
**rigenerare solo quel chunk**. Il copione finale sta a **10.172 caratteri**,
media 212 per blocco, e il parlato chiude a 586,3 s.

Costo della rigenerazione: `tagli.py allinea` azzera `tagli.json`, quindi
dopo la nuova traccia C sono andati **rifatti da capo i cinque spostamenti a
mano** dei confini. Per questo è nato `muovi.py`, che sposta un confine per
id di blocco invece che per indice: rifare cinque spostamenti a mano, a
memoria, è il modo più veloce per sbagliarne uno.

## Il copione

Da **4.326** caratteri di parlato nello script a **10.172**. Il modulo 4 non
vieta gli aneddoti come il 3, ma la nota di questa lezione dice
«Nessun aneddoto»: non ce ne sono.

Quello che è stato aggiunto, e perché:

- **perché i centimetri di Hall non sono costanti** (`s10`–`s14`). Lo script
  dà le misure e basta; il copione dice da dove vengono — adulti
  statunitensi, classe media, anni Sessanta — e che Hall non le ha mai
  presentate come universali. La fonte si dice ad alta voce due volte, nella
  scena 2 e nella scena 4, perché è il punto in cui chi ascolta può
  controllare;
- **lo spostamento che regge tutta la seconda metà** (`s16`–`s19`):
  leggibile non è la distanza, è il *cambiamento* di distanza. È la stessa
  mossa del modulo 3 applicata allo spazio;
- **perché lo scostamento all'indietro è il più affidabile dei tre**
  (`s25`–`s29`), con le quattro ragioni in catena: costa energia, è una
  reazione e non uno stato, ha un innesco, e l'innesco si ritrova. È
  l'unico punto della lezione in cui si può risalire alla causa;
- **l'asimmetria di ruolo** (`s40`–`s42`). Lo stesso mezzo passo, fatto da
  chi ha il ruolo e da chi non ce l'ha, non è lo stesso mezzo passo. Lo
  script non lo dice e senza quello il consiglio è monco;
- **la disposizione dei posti** (`s43`–`s46`), tre righe soltanto, perché è
  la cosa concreta che quasi nessuno sceglie e costa zero sceglierla.

Hall si dice **«Hool»** nel parlato e si scrive **«Hall»** sulle slide: è
l'unica parola della lezione con due grafie, e sta scritta anche in testa a
`blocchi.py` e a `slides.py`.

## Le grafiche

Quarantotto slide, di cui **cinque con un disegno o un'infografica**:

| slide | tipo | cosa mostra |
|---|---|---|
| `c13` | raggi | Varia perfino con la temperatura della stanza. |
| `c26` | flusso | L'informazione non è il movimento: è la frase. |
| `c28` | confronto | il giudizio contro l'osservazione |
| `c33` | bivio | Restituiscono la distanza senza nominarla. |
| `c38` | linea | Si vede solo da fuori. |

Nessuna slide ciclica.

## Quattro difetti che si vedevano solo guardando

Tutte e quarantotto le slide sono state renderizzate come fermi immagine e
guardate su provini a quattro. Quattro difetti, in tre slide:

- **`c13` (raggi) e `c33` (bivio) stampavano `<br>` alla lettera.** I
  parametri delle figure — `centro` del raggi, `da` del bivio — non passano
  da un renderer HTML: prendono testo semplice. È una classe di difetto
  nuova, ed è finita nello standard (§7-bis);
- **le didascalie di `c26` e `c33` andavano a capo.** Una didascalia su due
  righe alza la figura e il kicker finisce addosso al logo. Entrambe
  accorciate a una riga sola (≈45 caratteri).

## I tagli

Quarantacinque confini, **tutti dentro un silenzio**. Cinque spostati a mano
dopo il controllo di banda (rifatti una seconda volta dopo la rigenerazione
del chunk C).

**Resta un confine fuori banda: `s28`, −1,96 s.** Non è un taglio sbagliato:
il confine cade in un silenzio e nessuna pausa vicina migliora la coppia. È
parlato genuinamente più svelto del previsto su un blocco di periodo corto
(`c28` è il confronto fra il giudizio e l'osservazione, e la voce lo corre).

I cinque silenzi più stretti su cui cade un taglio: `s31` 0,24 s · `s29`
0,26 s · `s30` 0,38 s · `s47` 0,43 s · `s46` 0,45 s. Il margine dal bordo
non scende mai sotto 0,12 s.

## Le riprese

Due, `s15` e `s34`.

- **`s34`** — due persone in piedi in un corridoio lungo, riprese da
  lontano, volti non visibili. **Vista.**
- **`s15`** — una carrozza della metropolitana affollata ripresa dall'alto.
  **Montata senza essere vista, e guardata subito dopo.** Tre generazioni
  successive non avevano restituito l'anteprima in linea, e al momento del
  montaggio i tre host del CDN di Artlist erano chiusi dalla policy di rete:
  il file non si poteva né vedere nell'anteprima né scaricare. È stata
  montata segnalata, come la `s07` della 3.3, perché la struttura VIDEOCLIP
  dello script non si cambia per un problema di rete.

  Poche ore dopo il CDN ha ripreso a rispondere, l'immagine è stata scaricata
  e guardata senza rigenerarla. **Va bene**: carrozza piena, volti girati o
  coperti, nessuno riconoscibile, nessun marchio, nessuna deformazione. È
  esattamente la distanza intima subita di cui parla il blocco.

## Il montato è stato verificato scena per scena

`get_video_scenes` sul video montato: cinquanta scene, le due immagini
esattamente alle scene 14 e 33 (cioè `s15` e `s34`), tutti i fondi video in
`playback: freeze` e `volume: 0`, la copertina con la traccia muta da 3 s e
la chiusura con quella da 10 s.
