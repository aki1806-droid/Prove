# Registro — SFL 5.3 «I messaggi di lavoro»

Il messaggio di lavoro arriva su un apparecchio che è anche personale: la
stessa notifica porta il coordinatore e il figlio. Perciò la cosa più
importante non è come si scrive, ma **quando**: un messaggio alle ventidue
comunica il suo contenuto e, insieme, che è normale scriversi alle ventidue;
il contenuto si dimentica, l'orario si accumula. Il rimedio è una riga — «non
c'è nessuna fretta: rispondimi domani» — o l'invio programmato. Poi che cosa
ci va e che cosa no: le cose operative, le conferme, il coordinamento, gli
avvisi urgenti sì; tutto quello che dovrà essere ritrovato no. Si decide dove
si vuole e si scrive in tre righe. Al quinto scambio senza conclusione, si
cambia strumento.

| campo | valore |
|---|---|
| video_id | `f08c8381a2fa5637e7c45ca4fb7e5a02` |
| scene | 50 — copertina, 47 slide, 1 ripresa, chiusura |
| formato | 16:9, 1080p |
| durata | 598,9 s (9:59) — misurata sul montato |
| parlato | 587,2 s (533,7 s di voce tagliata + 53,4 s di pose) |
| copione | 9.801 caratteri in 48 blocchi, media 204 |
| voce | «Achille nuovo 1» `9b851842ce54449fb9ff501751ca0271` su HeyGen, `create_speech` con `engine: "elevenlabs"` e `eleven_v4`, **1,12×** in post |
| tracce | A `s02`–`s10` · B `s11`–`s20` · C `s21`–`s30` · D `s31`–`s40` · E `s41`–`s49` |
| ripresa | `s18` comodino |
| costo | 30 crediti HeyGen di voce (6.090 → 6.060, compreso forse il render della 5.1) + 1 di render |

**Confini: 43 su 43** trovati al primo colpo da `confini_heygen.py`, senza trascrizione; pausa di confine più corta **1,37 s**, taglio a metà della pausa.

## Le scelte

**Una schermata F in forma `chat`**, affiancata (`c32`–`c35`): «ok allora
facciamo <u>come detto</u>, grazie!», che non conferma niente, contro il
riepilogo in tre righe con chi fa che cosa ed entro quando. Qui ci sono solo
messaggi inviati, uno per parte: la risposta dell'altro non serve a capire.

**La scena su chi ha un ruolo** (`c09`–`c12`), «Quando scrivi / è un
messaggio / quanto cosa scrivi.», resta ferma per tutta la scena: è una scena
AVATAR + SLIDE, e la voce la dice senza accusare, come chiede la nota dello
script.

**Le quattro cose per cui il messaggio breve va bene** (`c19`–`c23`) sono una
slide C a elenco, una voce accesa alla volta.

**Il copione era corto alla prima stesura** (8.802 caratteri) ed è stato
allungato a 9.801 prima di generare la voce.

## La ripresa

**`s18`**, presto rispetto al solito: un comodino al buio, un telefono con lo
schermo acceso e illeggibile, una tazza, un letto disfatto. Arriva subito
dopo il memo sull'orario, e ne è l'immagine.

## Verifica

Scaricato e guardato: dodici fotogrammi più la ripresa e la schermata chat a
piena risoluzione, tutto al suo posto e leggibile. Silenzi oltre 2,5 s: la
copertina e la chiusura.
