# Standard di produzione — video YouTube "La Parola Giusta"

Modalità predefinita per ogni video del canale. Approvata da Achille dopo il
VIDEO 03. Non va ridiscussa a ogni video: si applica e basta.

---

## 1. Voce

- Sempre **ElevenLabs**, voce **"Achille nuovo 1"** — `KerPEYZvLEWNATg4AARX`,
  modello `eleven_multilingual_v2`.
- **Mai il TTS di HeyGen** e mai il Video Agent per la voce: producono balbettii
  e artefatti. Questo è stato verificato più volte ed è il motivo della regola.
- Una traccia audio per scena. Il parlato si spezza ai confini di concetto,
  non a caso: ogni blocco è quello che sta sopra una singola inquadratura.
- **Ogni traccia si accelera a 1,12x con ffmpeg** prima di andare in HeyGen. Il
  passo naturale del modello è troppo lento per una lezione; `atempo` cambia la
  velocità senza toccare l'intonazione, quindi il timbro resta identico:
  `ffmpeg -i grezzo.mp3 -filter:a atempo=1.12 -b:a 128k -ar 44100 -ac 1 finale.mp3`
  (ffmpeg si installa con `pip install imageio-ffmpeg`, percorso da
  `imageio_ffmpeg.get_ffmpeg_exe()`).
- I tag `<break time="Xs"/>` **non** cambiano il ritmo: verificato con un A/B,
  20,5 s senza contro 20,7 s con. Non usarli per accelerare.
- In HeyGen la traccia si passa come **`audio_asset_id`**, non come `audio_url`:
  si carica il file già accelerato come asset (vedi sotto) e non scade mai.

## 2. Avatar

- Avatar **Aki in his studio** — `89cf01e0c22547169c460186be0c67a8` per i video
  del canale. Per il corso il look si sceglie lezione per lezione (la 1.1 usa
  questo, la 1.2 "Aki teaching in the classroom"
  `d679a1daf79e4597ab5ffbea8ad495e9`). Il gruppo "Aki"
  `2ecf65e58df54cd7bda384da43c27f2d` ne contiene 57: si elencano con
  `list_avatar_looks`, ma **le anteprime non sono visibili da qui** perché il
  proxy blocca `files2.heygen.ai` — la scelta si fa sui nomi, o guardando la
  libreria su app.heygen.com. Scartare i look con
  `preferred_orientation: portrait`: il 16:9 li taglia.
- **Nessuno scontorno** (niente `removeBackground`), **nessuna grafica
  sovrapposta all'avatar**. Achille ha bocciato esplicitamente il ritaglio.
  Sopra l'avatar può esserci solo il sottotitolo.
- L'avatar copre circa un terzo del minutaggio: è la voce narrante, non il
  contenitore di tutto.

## 3. Slide e grafiche — la parte più importante

Servono **molte** slide a piena inquadratura, non solo per le frasi a effetto:

- una slide per **ogni concetto chiave**;
- una slide per **ogni elenco** (i tre punti, le tre cose da preparare, le
  alternative se il budget è bloccato...): l'elenco va visto, non solo sentito;
- una slide per **ogni cosa da ricordare** — quello che lo spettatore dovrebbe
  segnarsi;
- le frasi-modello (quelle che funzionano e quelle che non funzionano) vanno
  sempre a schermo, tra caporali.

Layout disponibili in `script/cards.mjs`:

| layout | quando |
|---|---|
| `statement` | affermazione secca, una o due righe |
| `quote` | frase da dire davvero, tra « » |
| `num` | punto numerato di un elenco (numerale grande + etichetta) |
| `list` | elenco di 2-5 voci sulla stessa slide |

Durate: la **slide di copertina dura 3 secondi**, non di più — fra il titolo e la
prima parola non deve esserci attesa. La slide di chiusura sta sui 10 secondi.
Tutte le altre slide non hanno durata propria: la prende l'audio che ci sta sopra.

Regole grafiche: marchio LPG **in alto a sinistra su ogni slide**, stessa
coordinata sempre. Fondo blu notte, testo avorio, accento oro sulla parte che
porta il senso.

Palette e caratteri, **video del canale**:
- blu notte `#032B54` · avorio `#F6F3EA` · oro `#C39951`
- titoli **Playfair Display** 700 · sopratitoli **Inter** 600 maiuscoletto spaziato

Palette e caratteri, **corso "Dire, ascoltare, convincere"** (diversi, definiti
negli script delle lezioni — si usa `script/cards_corso.mjs`):
- blu `#12294A` · avorio `#F7F3EA` · oro `#C39A4E` · oro tenue `#E2D2B0`
  (slide errori) · blu profondo `#0B1B33` (memo) · grigio `#69748A`
- frasi **Cormorant Garamond** · etichette ed elenchi **Jost**
- i tag `<break time="1.0s"/>` degli script vanno lasciati nel testo: ElevenLabs
  li rende. La velocità 0,95× invece non è applicabile — generando la voce su
  ElevenLabs non c'è quel parametro, il ritmo lo fanno le pause.
- copertine e chiusure sono mute: la musica la aggiunge Achille in coda, qui
  non c'è modo di mixare l'audio.

## 4. Immagini e clip

- B-roll **evocativo e coerente col discorso**, mai decorativo: la porta chiusa
  quando si parla di bussare, le bollette quando si parla di bisogno, il tavolo
  vuoto quando si parla di trattativa.
- Generate su Artlist: `generate_image` (Nano Banana 2, 2K) e `generate_video`
  (Kling 2.6 Pro, 5 s 1080p). Stile: fotografia documentaristica editoriale,
  luce calda, nessun volto riconoscibile.
- Le clip durano 5 s: sotto un blocco di voce più lungo vanno messe in
  `playback: {mode: "fit_to_scene", mute: true}`, così rallentano invece di
  ripetersi o congelarsi.

## 5. Output

- 16:9, 1080p.
- Sottotitoli **impressi**: `caption: {file_format: "srt", style: "default"}`.
  Funziona anche con audio esterno — HeyGen trascrive la traccia.
- Montaggio in **una sola** chiamata `create_video_from_studio` (max 50 scene).

## 6. Trappole già incontrate — non ripeterle

- **Gli mp3 di ElevenLabs vanno ri-encodati prima di caricarli su HeyGen.**
  Presi così come arrivano, l'API li registra come `application/octet-stream` e
  li rifiuta anche dichiarando `audio/mpeg`. Passati per ffmpeg (lo stesso
  comando che li accelera a 1,12x) vengono accettati senza problemi. Procedura:
  `create_asset_upload_batch` → PUT su ogni URL firmato con gli header
  `Content-Type: audio/mpeg` e `x-amz-server-side-encryption: AES256` →
  `complete_asset_batch` → si attende `completed` con `get_asset_batch`.
  Questo risolve anche la scadenza degli URL: gli asset non scadono.
- **Gli URL firmati ElevenLabs scadono in 2 ore** (problema aggirato dagli asset
  permanenti, ma resta valido se per qualche motivo si torna a `audio_url`).
  Vecchia nota: Si rigenerano con
  `creative_get_flow_run_status(flow_id, session_ids)`, che restituisce un URL
  nuovo. Vanno quindi raccolti **poco prima** del montaggio, non all'inizio.
  Per questo il registro di ogni video conserva flow_id e session_id di ogni traccia.
- **`creative_generate_speech` ha `generations_count` a 4 di default**: mettere
  sempre 1, altrimenti costa quattro volte tanto.
- **Il Video Agent non è affidabile**: dichiara di aver applicato parametri che
  non applica, sbaglia brand kit, e il `video_id` della sessione può restare
  `pending` per sempre mentre il video vero è un altro (si ritrova con
  `list_videos`). Si usa il montaggio diretto da studio.
- **Il logo del marchio è blu notte + oro**: su fondo blu la parte blu sparisce.
  Va usata la versione negativa, `script/logo_negativo.py`. Il logo esteso
  (`logo_lpg_esteso.png`) sta su fondo avorio ed è per copertine e chiusure.
- **Chromium non raggiunge fonts.googleapis.com**, e non lo segnala: le slide
  escono con i caratteri di sistema e il render non dà errore. I woff2 vanno
  incorporati come data URI — `script/fonts_embed.py` li scarica con curl (che
  invece passa) e scrive `fonts_canale.css` e `fonts_corso.css`. Le slide del
  VIDEO 02 e del VIDEO 03 sono state prodotte prima di questa scoperta, quindi
  hanno i caratteri sbagliati: vanno rigenerate.
- Il proxy di rete **blocca** `laparolagiusta.it`, `files2.heygen.ai`,
  `resource2.heygen.ai`. Passano `fonts.googleapis.com`, `storage.googleapis.com`,
  `cms-toolkit-artifacts.artlist.io`, `heygen-resources-prod.s3-accelerate.amazonaws.com`.

## 7. Ordine di lavoro

1. Spezzare lo script in blocchi (un blocco = una scena) segnando per ciascuno
   che cosa si vede: avatar, slide, immagine o clip.
2. Generare le tracce ElevenLabs, una per blocco. Annotare flow_id e session_id.
3. Renderizzare le slide con `script/cards.mjs` e caricarle come asset HeyGen.
4. Generare le immagini e le clip Artlist mancanti.
5. Raccogliere gli URL audio freschi e montare in una sola chiamata.
6. Aggiornare il registro del video in `produzione/registri/`.

## 8. Da fare quando c'è tempo

Formati derivati già chiesti e non ancora prodotti: short 9:16, caroselli
Instagram, copertine YouTube.
