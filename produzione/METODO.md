# Metodo di produzione video — La Parola Giusta

Documento esportabile: contiene tutto quello che serve per produrre un video del
canale o una lezione del corso "Dire, ascoltare, convincere", da zero, anche
partendo da un'altra sessione o da un altro strumento.

È autosufficiente. `STANDARD.md` resta la versione interna di riferimento; questo
file la ripete in forma operativa, con in testa le cose che **vanno chieste ad
Achille prima di cominciare**.

---

# 1. Da chiedere prima di iniziare

Queste non si indovinano. Vanno chieste in una volta sola, all'inizio, altrimenti
si scopre a metà lavoro che il montaggio va rifatto.

## 1.1 Sempre

| # | Domanda | Perché serve | Se non risponde |
|---|---|---|---|
| 1 | **Quale video o lezione, e lo script completo** | Senza il testo non si parte | Bloccante |
| 2 | **Durata obiettivo** | Decide quanto testo aggiungere: gli script arrivano quasi sempre corti una volta accelerata la voce | 6:00 per le lezioni del corso |
| 3 | ~~Gli aneddoti sono suoi o li invento?~~ | **Non si chiede più: deciso una volta per tutte, li invento io.** Vedi §1.3 | — |
| 4 | **Canale o corso?** | Cambiano palette, caratteri e generatore di slide | Chiedere |
| 5 | **Musica: la metti tu in coda?** | Qui non si mixa l'audio: copertina e chiusura escono mute | Sì, la mette lui |

## 1.2 Quando cambia qualcosa rispetto all'ultima volta

| # | Domanda | Default attuale |
|---|---|---|
| 6 | Look dell'avatar | `89cf01e0c22547169c460186be0c67a8` — **non si richiede ogni volta** |
| 7 | Voce e velocità | "Achille nuovo 1" `KerPEYZvLEWNATg4AARX`, 1,12× |
| 8 | Durata copertina / chiusura | 3 s / 10 s |
| 9 | Sottotitoli impressi | Sì |
| 10 | Quante clip di b-roll (costano crediti Artlist) | 1-2 per lezione |
| 11 | Formati derivati (short 9:16, caroselli, copertine YouTube) | Nessuno, salvo richiesta |

## 1.3 Gli aneddoti — deciso: li invento io

Gli script del corso contengono segnaposti tipo
`[ANEDDOTO — sostituire con episodio reale]`, scritti per essere raccontati
**in prima persona, come cose vissute**.

**Achille ha deciso che li invento io.** Gliel'avevo chiesto piu' volte, l'ha
confermato: si scrivono inventati, in prima persona, senza segnaposti e senza
chiedere ogni volta. Vale anche per quelli gia' fatti nella 1.1 (scena 11) e
nella 1.2 (scene 16-17), che restano come sono.

Quindi: **non e' piu' una domanda da fare a inizio sessione.** Si scrive
l'aneddoto, si tiene coerente con la vita di un formatore quarantenne che lavora
con aziende e famiglie, si evitano dettagli verificabili (nomi di clienti, date,
luoghi precisi) e si va avanti. Nel registro basta una riga che dica quali
scene contengono un aneddoto inventato, senza segnalarlo come bloccante.

## 1.4 Cosa NON si chiede

Decisioni già prese, da applicare senza ridiscuterle:

- molte slide a piena inquadratura — una per concetto, una per elenco, una per
  ogni cosa da ricordare;
- avatar mai scontornato, mai coperto da grafiche;
- voce sempre ElevenLabs, mai il TTS di HeyGen;
- marchio LPG in alto a sinistra su ogni slide, stessa coordinata;
- 16:9, 1080p, montaggio in una sola chiamata.

---

# 2. Parametri fissi

## Voce
```
voce      Achille nuovo 1  ·  KerPEYZvLEWNATg4AARX
modello   eleven_multilingual_v2
opzioni   generations_count: 1      ← il default è 4 e costa quattro volte tanto
velocità  1,12x, applicata in post con ffmpeg (non esiste il parametro su ElevenLabs)
```

## Avatar
```
look      89cf01e0c22547169c460186be0c67a8   "Aki in his studio"
gruppo    2ecf65e58df54cd7bda384da43c27f2d   "Aki", 57 look
```

## Palette e caratteri

**Video del canale**
```
blu notte #032B54 · avorio #F6F3EA · oro #C39951
titoli Playfair Display 700 · sopratitoli Inter 600 maiuscoletto spaziato
generatore: script/cards.mjs
```

**Corso "Dire, ascoltare, convincere"**
```
blu #12294A · avorio #F7F3EA · oro #C39A4E
oro tenue #E2D2B0 (slide errori) · blu profondo #0B1B33 (memo) · grigio #69748A
frasi Cormorant Garamond · etichette ed elenchi Jost
generatore: script/cards_corso.mjs
```

## Durate
```
copertina  3 s   (fissa: fra il titolo e la prima parola non deve esserci attesa)
chiusura   10 s
slide      nessuna durata propria: la prende l'audio che ci sta sopra
clip       5 s di sorgente, distesa sotto la voce con fit_to_scene
```

---

# 3. La pipeline, passo per passo

## Passo 1 — Spezzare lo script in blocchi

Un blocco = una scena = una traccia audio. Si spezza **ai confini di concetto**,
mai a caso: ogni blocco è quello che sta sopra una singola inquadratura.

Per ogni blocco si decide subito cosa si vede: `avatar`, `slide`, `immagine`, `clip`.

Formato di lavoro (`blocchi.json`):
```json
[
 {"id":"s02","kind":"avatar","text":"..."},
 {"id":"s03","kind":"slide","slide":"c03","text":"..."},
 {"id":"s04","kind":"video","text":"..."}
]
```

**Quanto testo serve.** Misura verificata sul parlato reale: **14,5 caratteri al
secondo** di audio grezzo ElevenLabs. Da lì:

```
durata finale ≈ (caratteri / 14,5) / 1,12 · 0,82   +  13 s di copertina e chiusura
                 └── grezzo ──┘  └accel.┘ └pause┘
```

In pratica: **per 6 minuti servono circa 6.000 caratteri di parlato**, tag
`<break>` esclusi. Gli script arrivano quasi sempre intorno ai 4.000: vanno
sviluppati (§6).

## Passo 2 — Generare le tracce

Una chiamata `creative_generate_speech` per blocco, con `generations_count: 1`.
**Annotare `flow_id` e `session_id` di ognuna**: servono per recuperare gli URL.

Gli URL firmati scadono in **2 ore**, quindi si raccolgono con
`creative_get_flow_run_status(flow_id, session_ids)` **subito prima** di scaricare,
non all'inizio.

## Passo 3 — Lavorare l'audio (il passaggio che fa la differenza)

Una sola catena ffmpeg fa tre cose: accorcia le pause, accelera, e rende il file
accettabile da HeyGen.

```bash
ffmpeg -i grezzo.mp3 -af "silenceremove=start_periods=1:start_silence=0.05:start_threshold=-45dB:stop_periods=-1:stop_duration=0.35:stop_silence=0.30:stop_threshold=-45dB,atempo=1.12" -b:a 128k -ar 44100 -ac 1 finale.mp3
```

Cosa fa, pezzo per pezzo:

- `silenceremove` — taglia il silenzio in testa e in coda e **limita ogni pausa
  interna a 0,30 s**. Il 19% di quello che ElevenLabs restituisce è silenzio oltre
  un quarto di secondo: le pause dei tag `<break>` più quello che lascia ai bordi
  di ogni blocco. Con 35-40 blocchi si somma e il video sembra rallentato. Vale
  il 15-20% di durata.
- `atempo=1.12` — accelera **senza toccare l'intonazione**: il timbro resta
  identico, la voce diventa solo più sveglia.
- il ri-encoding — è ciò che rende l'mp3 caricabile su HeyGen (vedi §5).

L'ordine conta: `silenceremove` **prima** di `atempo`.

Una pausa lunga voluta si ottiene aggiungendo `,apad=pad_dur=N` in fondo alla
catena: HeyGen fa durare la scena quanto l'audio, quindi il silenzio va messo
**dentro** la traccia. Una scena muta non esiste.

ffmpeg si installa con `pip install imageio-ffmpeg`; il percorso lo dà
`imageio_ffmpeg.get_ffmpeg_exe()`.

## Passo 4 — Renderizzare le slide

```bash
node script/cards_corso.mjs slides.json ./png     # corso
node script/cards.mjs      slides.json ./png      # canale
```

Formato di `slides.json` (una voce per slide):
```json
{"file":"c11","layout":"list","kicker":"quattro filtri","active":0,
 "rows":["Stato d'animo","Storia con te","Aspettativa","Contesto"],
 "note":"chi è teso legge una minaccia dove non c'è"}
```

| layout | quando |
|---|---|
| `cover` | copertina: logo esteso, etichetta lezione, titolo, sottotitolo |
| `closing` | chiusura: logo esteso, sito |
| `statement` | affermazione secca, una o due righe |
| `quote` | frase da dire davvero, resa fra « » |
| `list` | elenco di 2-5 voci; `plain: true` usa lineette invece dei numeri |
| `memo` | la frase da ricordare, a tutto quadro, fondo scuro |

`"active": n` accende una sola riga dell'elenco e spegne le altre al 26%: è così
che i punti salgono uno alla volta senza moltiplicare i file JSON.
`"theme"`: `ivory` (default), `sand` (slide errori), `deep` (memo).

## Passo 5 — Generare b-roll

Su Artlist: `generate_video` (Kling 2.6 Pro, 5 s, 16:9, `generate_audio: false`)
e `generate_image` (Nano Banana 2, 2K).

Il b-roll è **evocativo e coerente col discorso, mai decorativo**: la porta chiusa
quando si parla di bussare, il corridoio quando si parla di qualcuno che si
allontana, la cucina vuota con due tazze quando si parla di una discussione finita.

Suffisso di stile: *fotografia documentaristica editoriale, luce naturale morbida,
palette desaturata, poca profondità di campo, nessun volto riconoscibile, niente
testo in sovrimpressione.*

## Passo 6 — Caricare tutto su HeyGen come asset permanenti

```
create_asset_upload_batch(files:[{filename, content_type, size_bytes}, ...])
  → per ogni slot: PUT dei byte sull'upload_url, con gli header
       Content-Type: audio/mpeg  (o image/png)
       x-amz-server-side-encryption: AES256
  → complete_asset_batch(batch_id)
  → get_asset_batch(batch_id) finché status = completed
```

Massimo 100 file per batch. Gli asset **non scadono**: da qui in poi il video si
rimonta quando si vuole senza rigenerare niente.

## Passo 7 — Montare, in una sola chiamata

`create_video_from_studio` con `aspectRatio: "16:9"`, `resolution: "1080p"`,
`caption: {file_format: "srt", style: "default"}`, massimo 50 scene.

Le tre forme di scena:

```json
{"type":"image","source":{"type":"asset_id","asset_id":"..."},"duration":3}

{"type":"image","source":{"type":"asset_id","asset_id":"..."},"audio_asset_id":"..."}

{"type":"avatar_video","input":{"type":"avatar",
   "avatar_id":"89cf01e0c22547169c460186be0c67a8","audio_asset_id":"..."}}

{"type":"video","source":{"type":"url","url":"..."},
   "playback":{"mode":"fit_to_scene","mute":true},"audio_asset_id":"..."}
```

Una scena `image` prende **o** `duration` (muta) **o** una sorgente audio, mai
entrambe. `fit_to_scene` rallenta la clip per coprire la voce, invece di
ripeterla o congelarla.

## Passo 8 — Registro

Un file in `produzione/registri/` per ogni video, con: video_id, struttura,
`flow_id`/`session_id` di ogni traccia, identificativi degli asset, durate reali,
e **cosa resta da confermare** (tagli e scelte fatte al posto suo).

Serve a rimontare il video mesi dopo senza rigenerare niente.

---

# 4. Regole di contenuto

## Slide: molte, e a piena inquadratura

Una slide per **ogni concetto chiave**. Una per **ogni elenco** — l'elenco va
visto, non solo sentito. Una per **ogni cosa da ricordare**. Le frasi-modello,
quelle che funzionano e quelle che non funzionano, sempre a schermo fra caporali.

Ordine di grandezza reale: **25-30 slide per una lezione da sei minuti**.

## Avatar

Copre circa **un terzo** del minutaggio: è la voce narrante, non il contenitore.
Mai scontornato, mai coperto da grafiche. Sopra l'avatar può esserci solo il
sottotitolo.

## Ritmo

Un blocco = un'idea. Se un blocco supera i 20 secondi, quasi sempre contiene due
idee e va spezzato: due scene, due slide.

---

# 5. Trappole già pagate — non ripeterle

- **Gli mp3 di ElevenLabs, presi così come arrivano, HeyGen li rifiuta**
  (`Stored file type not supported: application/octet-stream`), anche dichiarando
  `audio/mpeg`. Passati per ffmpeg vengono accettati. È lo stesso comando che li
  accelera, quindi non costa un passaggio in più.
- **`generations_count` è 4 di default** su `creative_generate_speech`: mettere
  sempre 1.
- **I tag `<break time="Xs"/>` non cambiano la durata totale** in modo utile:
  A/B verificato, 20,5 s senza contro 20,7 s con. Servono a suggerire dove sta il
  respiro; il ritmo lo fa il filtro di silenzio.
- **La velocità 0,95× indicata negli script non esiste** su ElevenLabs: non c'è
  quel parametro. Il passo si governa solo in post.
- **Un look dell'avatar può sparire dalla libreria.** È successo:
  `d679a1daf79e4597ab5ffbea8ad495e9` ha smesso di esistere fra un montaggio e
  l'altro, e HeyGen ha risposto `Avatar not found`. Un video vecchio non si
  rimonta dando per scontato il suo avatar: `get_video_scenes` dice su quale era
  montato, `list_avatar_looks` dice se c'è ancora.
- **Le anteprime degli avatar non sono visibili** da questo ambiente (il proxy
  blocca `files2.heygen.ai`) e **i nomi non descrivono l'immagine**: un look
  chiamato "Aki teaching in the classroom" mostrava in realtà lo studio di casa
  con il microfono. Non proporre look per nome come se si sapesse cosa mostrano:
  li guarda Achille su app.heygen.com e indica l'identificativo.
  Scartare i look con `preferred_orientation: portrait`: il 16:9 li taglia.
- **Chromium non raggiunge fonts.googleapis.com e non lo segnala**: le slide
  escono coi caratteri di sistema e il render non dà errore. I woff2 vanno
  incorporati come data URI — `script/fonts_embed.py` li scarica con curl (che
  passa) e scrive `fonts_canale.css` e `fonts_corso.css`.
- **Il logo è blu notte + oro**: su fondo blu la parte blu sparisce. Su fondo
  scuro va la versione negativa (`script/logo_negativo.py`). Il logo esteso sta su
  fondo avorio ed è solo per copertine e chiusure.
- **Il Video Agent di HeyGen non è affidabile**: dichiara di aver applicato
  parametri che non applica, sbaglia brand kit, e il `video_id` della sessione può
  restare `pending` per sempre mentre il video vero è un altro. Si usa sempre il
  montaggio diretto da studio.
- **Copertina e chiusura escono mute.** La musica la aggiunge Achille in coda.
- Rete: il proxy **blocca** `laparolagiusta.it`, `files2.heygen.ai`,
  `resource2.heygen.ai`. **Passano** `fonts.googleapis.com`,
  `storage.googleapis.com`, `cms-toolkit-artifacts.artlist.io`,
  `heygen-resources-prod.s3-accelerate.amazonaws.com`.

---

# 6. Allungare uno script senza gonfiarlo

Gli script arrivano tarati su una lettura lenta. Accelerati a 1,12× e ripuliti
dalle pause finiscono un terzo sotto l'obiettivo. Non si allunga mettendo più
parole per slide: si allunga **sviluppando i punti che erano solo enunciati**.

Cosa ha funzionato finora:

- **un blocco e una slide per ciascuna voce di un elenco**, invece di leggere
  l'elenco tutto d'un fiato (i quattro filtri della 1.2, i tre livelli della 1.3);
- **la parte pratica che manca quasi sempre**: come ci si accorge della cosa di
  cui si sta parlando — segnali concreti, osservabili;
- **l'obiezione che arriva subito dopo**: "riconoscere non è cedere", "quel sì non
  contiene informazione". Sono i punti dove lo spettatore si irrigidisce;
- **un secondo esempio** quando il primo è astratto.

Quello che non si fa: ripetere con altre parole, aggiungere premesse, allungare
le frasi.

---

# 7. Controlli prima di consegnare

- [ ] Durata entro l'obiettivo, misurata sul render e non stimata
- [ ] Slide: almeno una per concetto, elenco e cosa da ricordare
- [ ] Avatar intero, non scontornato, senza grafiche sopra
- [ ] Copertina 3 s, chiusura 10 s
- [ ] Sottotitoli presenti
- [ ] Marchio in alto a sinistra su tutte le slide, stessa coordinata
- [ ] Registro aggiornato con identificativi e cose da confermare
