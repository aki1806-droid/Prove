# Registro — SFL 4.4 «Rispondere»

Metà delle mail che scriviamo sono risposte, e hanno regole diverse: dall'altra
parte qualcuno sta aspettando, e l'attesa cambia anche il significato del
silenzio. Il silenzio viene sempre interpretato, e quasi mai bene. Il rimedio
costa cinque parole: **«Ricevuto, ti rispondo entro venerdì.»** — una conferma
che poi va mantenuta. Seguono le quattro cose da fare rispondendo: conferma
di aver ricevuto, rispondi a tutte le domande, cita solo se serve davvero,
riscrivi l'oggetto se l'argomento è cambiato. Chiude la tentazione di
rimandare: un no rapido vale più di un no tardivo, e infinitamente più del
silenzio.

| campo | valore |
|---|---|
| video_id | `9c86bb3d0ec4eba025a2e0086a4bbb62` |
| scene | 50 — copertina, 47 slide, 1 ripresa, chiusura |
| formato | 16:9, 1080p |
| durata | 598,6 s (9:59) — misurata sul montato |
| parlato | 586,9 s (553,9 s di voce tagliata + 33,0 s di pose) |
| copione | 9.834 caratteri in 48 blocchi, media 205 |
| voce | «Achille nuovo 1» `9b851842ce54449fb9ff501751ca0271` su HeyGen, `create_speech` con `engine: "elevenlabs"` e `eleven_v4`, **1,12×** in post |
| tracce | A `s02`–`s10` · B `s11`–`s20` · C `s21`–`s30` · D `s31`–`s40` · E `s41`–`s49` |
| ripresa | `s25` tastiera |
| costo | 32 crediti HeyGen di voce (6.216 → 6.184, compresi i render della 4.1 e della 4.2) + 1 di render |

**Confini: 42 su 43** trovati al primo colpo da `confini_heygen.py`, senza trascrizione; pausa di confine più corta **1,39 s**, taglio a metà della pausa.

## Le scelte

**La slide della scena 4** (`c09`–`c12`), «Viene sempre interpretato. / E quasi
mai bene.», resta ferma per tutta la scena, come chiede la nota dello script:
sotto passa la frase più spendibile del modulo.

**Una schermata F**, layout `pd`, forma testo, con i momenti in piccolo
corsivo (`c17`–`c20`): nove giorni di silenzio e poi le scuse, contro la
conferma lo stesso giorno e la risposta il venerdì. Le due versioni stanno
una sopra l'altra, e la voce dice «una dopo l'altra», non «accanto».

**Le quattro cose da fare rispondendo** (`c30`–`c34`) sono una slide C a
elenco con una riga accesa per volta.

## La ripresa

**`s25`**, una mano ferma sulla tastiera, prima di rispondere.

## Verifica

Scaricato e guardato: dodici fotogrammi più la ripresa e la schermata F a
piena risoluzione, tutti al loro posto. Silenzi oltre 2,5 s: la copertina e
la chiusura.

Sulla traccia E un confine è stato riconosciuto solo abbassando la soglia
della pausa da 1,1 a 1,0 s: la pausa c'era (1,01 s a 15,7 s, dove il token
di pausa la mette), ma più corta del solito. Lo script dei confini non è
stato modificato; la soglia è stata cambiata solo per quella esecuzione.
