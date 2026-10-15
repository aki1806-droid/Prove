# Registro — SFL 5.4 «Quando non si scrive»

In un corso di scrittura, una lezione su quando non scrivere: non è un
paradosso, perché scegliere il canale fa parte del mestiere. Quattro casi in
cui non si scrive: c'è tensione, la cosa è complicata, servono risposte a più
domande, la notizia è pesante. Un disaccordo per iscritto si indurisce da
solo, perché **un testo si rilegge e una frase detta no**. La frase che
interrompe tutto senza accusare nessuno è «ci sentiamo due minuti, facciamo
prima». Poi il caso che rovescia la regola: quando l'altro ha bisogno di
tempo, scrivere è un regalo, purché si offra di parlarne. Il perno è la
distinzione fra scrivere per dare spazio e scrivere per evitare una
conversazione, e la domanda da farsi onestamente: è meglio per lui, o è più
comodo per me?

| campo | valore |
|---|---|
| video_id | `ee9973144dcfaad348afc89fcf06b239` |
| scene | 50 — copertina, 47 slide, 1 ripresa, chiusura |
| formato | 16:9, 1080p |
| durata | 598,9 s (9:59) — misurata sul montato |
| parlato | 587,2 s (543,3 s di voce tagliata + 43,8 s di pose) |
| copione | 9.752 caratteri in 48 blocchi, media 203 |
| voce | «Achille nuovo 1» `9b851842ce54449fb9ff501751ca0271` su HeyGen, `create_speech` con `engine: "elevenlabs"` e `eleven_v4`, **1,12×** in post |
| tracce | A `s02`–`s10` · B `s11`–`s20` · C `s21`–`s30` · D `s31`–`s40` · E `s41`–`s49` |
| ripresa | `s19` telefono-fisso |
| costo | 31 crediti HeyGen di voce (6.060 → 6.029, compreso forse il render della 5.2) + 1 di render |

**Confini: 43 su 43** trovati al primo colpo da `confini_heygen.py`, senza trascrizione; pausa di confine più corta **1,43 s**, taglio a metà della pausa.

## Le scelte

**Una schermata F in forma `chat`**, affiancata (`c32`–`c35`): «Senti,
<u>devo dirti una cosa</u> sul modo in cui hai gestito la riunione di ieri.»,
che apre un argomento difficile e poi lascia l'altro ad aspettare, contro il
messaggio che dice di che cosa si tratta e offre di parlarne quando vuole.

**«Un testo si rilegge. / Una frase detta, no.»** (`c14`–`c17`) resta ferma
per tutta la scena: nello script è una scena AVATAR + SLIDE.

**I quattro casi in cui non si scrive** (`c05`–`c09`) sono una slide C a
elenco, una voce accesa alla volta.

**La scena 12** (`c36`–`c39`), perno della lezione, è detta senza giudizio,
come chiede la nota dello script: scrivere per non parlare lo facciamo tutti,
e non c'è niente di cui vergognarsi, basta accorgersene. Il blocco `s37` è
stato riscritto in «Perché lo facciamo tutti…» per non ripetere la frase del
blocco prima.

**Il copione era corto alla prima stesura** (8.409 caratteri) ed è stato
allungato a 9.752 prima di generare la voce.

## La ripresa

**`s19`**, un telefono fisso su una scrivania accanto a una tastiera, luce
d'ufficio: arriva subito dopo il memo sul disaccordo per iscritto, quando la
lezione passa alla voce.

## Verifica

Scaricato e guardato: dodici fotogrammi più la ripresa e la schermata chat a
piena risoluzione, tutto al suo posto e leggibile. Silenzi oltre 2,5 s: la
copertina, la chiusura e i **due memo** (2,7 s e 3,0 s): la loro voce è una
frase sola, e la slide resta a schermo il tempo minimo di lettura, come nella
4.5. È voluto: il memo si legge in silenzio.
