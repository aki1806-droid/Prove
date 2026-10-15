# Registro — SFL 5.1 «Il tono che manca»

Apre il modulo sul messaggio breve. Un messaggio di quattro parole è troppo
corto perché il contesto lo corregga: in una mail di dieci righe le altre
nove rimettono a posto la frase che suona male, qui non c'è niente intorno.
**Il tono non è assente: lo aggiunge chi legge**, in base al suo stato. Da qui
la regola del modulo: nei messaggi brevi il tono va messo, perché se non lo
metti tu lo mette l'altro. Poi le domande secche, che per iscritto suonano
come richieste di conto; i tre strumenti per aggiungere tono — il nome, un
verbo invece di una sigla, le emoji, che dipendono da chi hai davanti — e
l'errore contrario, la punteggiatura: i puntini comunicano riserva, non
morbidezza. Chiude l'asimmetria: due parole in più adesso, o dieci minuti di
chiarimenti dopo.

| campo | valore |
|---|---|
| video_id | `32cab20ccb4a79f2c10872efe6c8def3` |
| scene | 50 — copertina, 47 slide, 1 ripresa, chiusura |
| formato | 16:9, 1080p |
| durata | 598,7 s (9:59) — misurata sul montato |
| parlato | 587,0 s (556,8 s di voce tagliata + 30,1 s di pose) |
| copione | 9.882 caratteri in 48 blocchi, media 206 |
| voce | «Achille nuovo 1» `9b851842ce54449fb9ff501751ca0271` su HeyGen, `create_speech` con `engine: "elevenlabs"` e `eleven_v4`, **1,12×** in post |
| tracce | A `s02`–`s10` · B `s11`–`s20` · C `s21`–`s30` · D `s31`–`s40` · E `s41`–`s49` |
| ripresa | `s25` telefono-sera |
| costo | 31 crediti HeyGen di voce (6.155 → 6.124, compreso il render della 4.4) + 1 di render |

**Confini: 43 su 43** trovati al primo colpo da `confini_heygen.py`, senza trascrizione; pausa di confine più corta **1,38 s**, taglio a metà della pausa.

## Le scelte

**Prima lezione con le schermate F in forma `chat`**, come chiede la nota di
modulo: bolle sobrie, rettangoli arrotondati, nessuna icona né app
riconoscibile, ricevuti in panna e inviati in blu, la versione da evitare
smorzata. Le due conversazioni stanno **affiancate**, non una sopra l'altra:
la voce lo dice («a sinistra e a destra»), e le due frasi del copione che
dicevano «qui sopra» sono state corrette prima di generare la voce.

**Due schermate F**: l'«Ok» contro il «Sì grazie, mandala pure» alla stessa
domanda (`c08`–`c11`), e la domanda secca sulla riunione contro quella con
il nome di Marco (`c21`–`c24`). Tutte e due ferme per la scena.

**La regola del modulo** (`c12`–`c15`), «Il tono non è assente. / Lo aggiunge
chi legge.», resta ferma per tutta la scena: nello script è una scena
AVATAR + SLIDE.

**I tre strumenti** (`c26`–`c29`) sono una slide C a elenco con una riga
accesa per volta.

## La ripresa

**`s25`**, un telefono appoggiato su un tavolo di legno, lo schermo acceso e
illeggibile, luce di sera. Prima immagine del modulo 5, generata con lo
stesso stile del corso.

## Verifica

Scaricato e guardato: dodici fotogrammi più la ripresa e la prima schermata
chat a piena risoluzione, tutti al loro posto; le bolle si leggono bene.
Silenzi oltre 2,5 s: la copertina e la chiusura.
