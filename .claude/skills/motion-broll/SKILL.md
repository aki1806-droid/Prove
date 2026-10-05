---
name: motion-broll
description: Trasforma un video talking-head e la sua trascrizione in B-roll di motion graphics sincronizzato con le parole di chi parla, nello stile "una forma sola" (un elemento che si trasforma senza mai tagliare, guidato da un cursore, con movimento a molla). Funziona con video orizzontali (YouTube) e verticali (Reels, TikTok, Shorts), in italiano o altre lingue, con un brand diverso a ogni video (libreria di brand intercambiabili: colori, font, logo). Si integra con HeyGen (avatar, pulizia, short, traduzioni) e Higgsfield. Usala quando qualcuno fornisce un video o uno script da far dire a un avatar (e idealmente una trascrizione o dei sottotitoli SRT/VTT) e chiede motion graphics, B-roll, grafiche animate, cutaway, overlay o animazioni per un video.
---

# Motion B-roll

Crei clip di motion graphics per il video di un creator. Ogni clip è **una forma che non taglia mai**: cambia dimensione, angoli e colore da uno stato all'altro mentre il contenuto si scambia con una breve sfocatura. Un cursore guida i cambi con clic e trascinamenti veri, e ogni cambio cade su una parola pronunciata.

Il risultato è un set di clip che l'utente porta nel suo editor. Gli dai anche un'anteprima del video con le clip inserite e due pagine HTML: una per scorrere le clip, una per confrontare prima e dopo.

**Lingua:** parla con l'utente in italiano (o nella sua lingua) e scrivi i testi a schermo nella lingua del video, presi dalla trascrizione.

Tutto quello che serve è in questa cartella:

- `engine/`: il motore (`motion.js`), la base CSS (`base.css`), `build.py` (clip → HTML autonomo, con il brand), `render.js` (render frame per frame con motion blur, in parallelo, modalità bozza), `beats.js` (contact sheet di fermi immagine), font Geist (OFL).
- `scripts/`: `setup.sh`, `brand.py` (libreria dei brand), `inspect_video.py`, `words.py`, `transcribe.py`, `composite.py`, `make_pages.py`.
- `templates/`: `brands/` (preset `default` e `scuro`), `viewer.html`, `compare.html`.
- `reference/engine-api.md`: come si scrive una clip. **Leggilo prima di scrivere la prima clip.**
- `examples/opus-aoe2/`: sei clip finite per un video reale di 54 s in 16:9. Sono il livello di qualità da raggiungere e buoni punti di partenza, ma hanno i colori della palette default scritti a mano: quando le riusi, sostituiscili con i token del brand.
- `examples/verticale-it/`: una clip 9:16 in italiano scritta solo con i token del brand (cambia look cambiando brand) e dentro l'area sicura dei social. È il modello da seguire per il colore.

Sotto, `$SKILL` è la cartella di questa skill (nel progetto: `.claude/skills/motion-broll`). Lavora in una cartella `motion/` nella root del progetto.

## 1. Setup (solo la prima volta in ogni sessione/macchina)

```bash
bash $SKILL/scripts/setup.sh ./motion
source motion/env.sh
```

Controlla Node, Python 3 (con numpy), ffmpeg (con ProRes), e Playwright + Chromium. Se sono già installati (come nelle sessioni cloud di Claude Code) li riusa senza scaricare nulla; altrimenti li installa in `motion/node_modules`. Scrive `motion/env.sh` con il `NODE_PATH` giusto e crea `motion/brands/` per la libreria dei brand. **Ogni comando Bash è una shell nuova: anteponi `source motion/env.sh &&` ai comandi `node`.**

## 2. Intervista

Usa AskUserQuestion, in un solo giro. Ti servono:

- **Il video.** Un percorso. Se non c'è un video ma c'è uno script, proponi di generarlo con un avatar HeyGen (vedi "Integrazioni"). Copialo o collegalo come `motion/work/source.*`. Nelle sessioni cloud il file deve essere caricato nella sessione o nel repository (i video pesanti non vanno committati: vedi "Consegna").
- **La trascrizione.** Meglio un SRT o VTT con i tempi (da CapCut, Premiere, DaVinci, Descript, YouTube). Se non c'è, usa `transcribe.py` (sezione 3).
- **Formato:** lo leggi da `inspect_video.py`; chiedi solo dove andrà pubblicato se cambia le scelte (es. un 16:9 che verrà ritagliato in verticale).
- **Densità:**
  - Leggera: 2–4 clip al minuto, solo i momenti più forti.
  - Media (default): 4–7 al minuto.
  - Intensa: quasi tutte le frasi coperte, con brevi pause sul volto.
- **Brand di questo video:** il brand cambia di volta in volta su richiesta, quindi chiedilo per ogni video. Mostra le opzioni con `python3 $SKILL/scripts/brand.py lista` e proponi il brand attivo come default. Le opzioni sono un brand già salvato (preset `default` chiaro, `scuro`, o uno dell'utente) oppure un brand nuovo (vedi "Brand" qui sotto).
- **Cosa evitare o includere.** Frasi da lasciare sul volto, numeri o nomi reali da mostrare, schermate di prodotto da ricreare.

Salta le domande a cui l'utente ha già risposto.

## Brand: una libreria, uno per video

I brand sono file in `motion/brands/<nome>.json` (con font e logo in `motion/brands/<nome>/`), gestiti con `brand.py`. Ogni video può usarne uno diverso, e l'utente può cambiarlo in qualsiasi momento, anche a clip già fatte.

```bash
python3 $SKILL/scripts/brand.py lista                       # brand disponibili, * = attivo
python3 $SKILL/scripts/brand.py nuovo cliente-rossi --da default --accent '#D7263D' --canvas '#F6F1EB' \
        --font motion/inputs/Font.woff2 --logo motion/inputs/logo.png --name "Cliente Rossi"
python3 $SKILL/scripts/brand.py nuovo cliente-rossi --accent '#B81D31'   # modifica solo l'accento
python3 $SKILL/scripts/brand.py usa cliente-rossi           # diventa il brand attivo
```

- **Token:** `canvas` (sfondo), `surface` (card), `ink` (testo sulle card), `strong` (forme scure/piene), `on_strong` (testo su di esse), `accent` e `on_accent`, `muted` (testo secondario), `panel` (forme chiare dei pannelli trasparenti). Tutti in `#RRGGBB`. Nel CSS: `var(--accent)`, `var(--on-strong)`…; nel JS: `BRAND.accent`, `BRAND.on_strong`… Il logo è `BRAND.logo` (data URI).
- **Nuovo brand:** l'utente può darti colori, un font (.woff2/.ttf/.otf) e un logo in `motion/inputs/`, oppure screenshot o un sito da cui ricavarli (leggi i colori e proponili prima di salvare). Se ha un brand kit su Canva, puoi leggerlo con il connettore Canva (`list-brand-kits`), solo se è d'accordo. Controlla il contrasto: `ink` su `surface` e `on_strong` su `strong` devono essere ben leggibili.
- **Scrivi le clip solo con i token**, mai con esadecimali fissi: così cambiare brand significa solo ricostruire e renderizzare, senza toccare le clip.
- **Cambio di brand a lavoro iniziato:** `build.py … --brand <nome>`, nuovi fermi immagine per controllare contrasto e leggibilità, poi di nuovo render e consegna. Aggiorna il campo `"brand"` in `plan.json`.
- **Anteprima veloce di un brand:** costruisci `examples/verticale-it/01-capitolo-checklist.html` con `--brand <nome>` e fai un contact sheet con `beats.js` (un paio di secondi). Mostralo all'utente prima di usarlo sul video.
- Salva il brand scelto in `plan.json` (`"brand": "cliente-rossi"`) e passalo sempre esplicitamente a `build.py` con `--brand`, così il video resta riproducibile anche se poi cambia il brand attivo.

## 3. Analizza il materiale

```bash
python3 $SKILL/scripts/inspect_video.py motion/work/source.mp4 motion/work
python3 $SKILL/scripts/words.py trascrizione.srt > motion/work/words.txt
```

Senza sottotitoli, o per tempi più precisi (reali per parola invece che stimati):

```bash
python3 -m pip install faster-whisper   # una volta; scarica anche il modello
python3 $SKILL/scripts/transcribe.py motion/work/source.mp4 motion/work --lang it --model small
```

Scrive `transcript.srt`, `words.txt` e `words.json` in `motion/work/`. Se l'installazione o il download del modello non riescono (rete limitata), chiedi all'utente un SRT esportato dal suo editor.

Guarda tu stesso `motion/work/contact.png`. `video.json` riporta risoluzione, fps, `aspect`, `orientation`, `has_audio` e i tratti di layout:
- **full:** chi parla riempie l'inquadratura.
- **pip:** chi parla è in un riquadro e il resto è vuoto. Include `free_side` (destra, sinistra, alto, basso), il box del soggetto e un avviso se il box cambia dimensione o si sposta.
- **vuoto:** tratto nero (es. dissolvenza): niente soggetto da rispettare.
- Per i video verticali c'è `safe_area`: la zona non coperta dall'interfaccia di Reels/TikTok/Shorts. Tieni testi, cursore e parti importanti della forma lì dentro.

Le clip devono avere la risoluzione e gli fps del video. I tempi delle parole da un SRT sono stime (±0,2 s): trattali come tali.

## 4. Piano, e approvazione prima di qualsiasi codice

Mostra una tabella con una riga per clip:

| # | In–Out | La frase che copre | Cosa fa la forma, su quali parole | Trattamento | Perché |

**Direzione creativa: decidi quanta parte dell'inquadratura prende ogni clip.** È la scelta più importante; falla clip per clip e motivala.

- **Cutaway a tutto schermo.** L'inquadratura è tutta speaker e la frase descrive qualcosa da *vedere*: un prodotto, un processo, un confronto, un numero, un cambio di capitolo.
  - Stacca per la durata dell'idea (3–10 s), poi restituisci il volto.
  - Non staccare nel primo secondo dell'hook, né su frasi personali, emotive o di opinione.
  - Lascia almeno ~2 s di volto tra un cutaway e l'altro.
  - Nei verticali: più brevi (2–6 s) e più frequenti; il volto è il gancio.
- **Pannello nello spazio vuoto.** Il montaggio lascia già spazio: un PiP, uno split, una zona uniforme.
  - Renderizza una clip trasparente (`bg:null`) centrata nell'area vuota, dimensionata per stare lontana dal box dello speaker in ogni momento.
  - Può durare a lungo (15 s+) come un'unica trasformazione continua, perché lo speaker resta a schermo.
  - Se `inspect_video.py` segnala che il box cambia, chiedi se è voluto, poi dimensiona per il box più grande o dividi il pannello al cambio.
- **Niente.** La frase parla di chi parla, oppure è troppo vicina a un'altra clip.

**Regole sul contenuto:**
- Mostra gli oggetti reali del discorso: la cartella, il terminale, il file, il prodotto, il risultato. Prendili dalle parole. Associa ogni idea a un'interazione del vocabolario in `reference/engine-api.md` (pill + clic, avanzamento, spunta, status island, card con trascinamento, slider, toggle, tab, grafico + tooltip, ricerca/filtro, drag-and-drop di file, terminale che scrive, confronto affiancato, card di capitolo).
- **Non inventare mai numeri, citazioni, prezzi o risultati.** Usa barre relative, righe di testo scheletro o etichette prese dalla trascrizione, ed elenca cosa è illustrativo. Inserisci cifre vere solo se te le dà l'utente.
- Un'idea per clip. Un tratto continuo (un'intera sezione PiP) può essere una clip lunga con più stati.
- Ritmo del parlato, non della musica: un cambio per battuta, circa 0,4–1,2 s di distanza.
- **Testi in italiano:** le parole sono più lunghe che in inglese. Tieni le etichette brevi (2–4 parole), usa `white-space:nowrap` e verifica nei fermi immagine che niente esca dalla forma. Usa l'apostrofo tipografico (’) e gli accenti corretti (è, perché, più).

Aspetta che l'utente approvi o modifichi il piano.

## 5. Costruisci

Scrivi un frammento per clip in `motion/clips/NN-nome.html`, seguendo `reference/engine-api.md` e gli esempi. Usa solo i token del brand (`var(--accent)` nel CSS, `BRAND.accent` nel JS), mai esadecimali fissi. Le immagini locali (`<img src="../inputs/foto.png">`) vengono incorporate nell'HTML. Poi:

```bash
python3 $SKILL/engine/build.py motion/dist motion/clips/*.html --brand <nome>
```

Senza `--brand` usa il brand attivo, oppure `default`. Metti ogni cambio di stato sulla sua parola: tempo locale della clip = tempo della parola − in-point della clip.

## 6. Controlla i fermi immagine sulle parole chiave

```bash
source motion/env.sh && node $SKILL/engine/beats.js motion/dist/NN-nome.html motion/work/NN.png 0.4 1.2 2.1 …
```

Scegli i momenti in cui ogni stato si è assestato e un paio di momenti a metà trasformazione. Guarda tu stesso ogni foglio. Correggi tutto ciò che è stretto, tagliato, illeggibile, fuori parola, o dove il cursore esce dall'inquadratura (o, nei verticali, dalla `safe_area`). Poi ricontrolla. I pannelli trasparenti nel foglio sono mostrati su nero.

Per vedere il movimento prima del render finale, fai una **bozza** (senza motion blur, ~4× più veloce) e mostrala all'utente:

```bash
source motion/env.sh && node $SKILL/engine/render.js motion/dist/NN-nome.html motion/work/NN-bozza.mp4 30000/1001 --draft
```

## 7. Render

```bash
source motion/env.sh && node $SKILL/engine/render.js motion/dist/NN-nome.html motion/out/NN-nome_0m32s40.mp4 30000/1001
```

- Usa gli fps del video (`fps` in `video.json`).
- I pannelli (`bg:null`) devono uscire in `.mov` (ProRes 4444 con alpha); il render si rifiuta altrimenti.
- Dai a ogni file il nome del suo in-point sulla timeline (`0m32s40` = 0:32.40).
- Il render cattura 4 sottoframe per frame, quindi è più lento del tempo reale. Usa già più pagine Chromium in parallelo (`--workers N`, default metà dei core); renderizza le clip una dopo l'altra in background e controlla l'avanzamento invece di aspettare.

## 8. Consegna

Scrivi `motion/plan.json` (schema in `reference/engine-api.md`), poi:

```bash
python3 $SKILL/scripts/composite.py motion/plan.json motion/out/preview.mp4
python3 $SKILL/scripts/make_pages.py motion/plan.json motion/out/preview.mp4
```

L'utente riceve, tutto in `motion/out/`:
- le clip
- `TIMING.md`: file, in, out, timecode, la frase coperta, il trattamento e cosa è illustrativo
- `markers.csv`: le stesse informazioni in tabella, con timecode HH:MM:SS:FF, da usare nel montaggio
- `preview.mp4`: il video con le clip inserite, tagli netti, audio originale
- `viewer.html`: per scorrere le clip
- `compare.html`: originale vs anteprima, sincronizzati, affiancati, sovrapposti o a tendina

Nelle sessioni cloud invia all'utente `preview.mp4` e le clip con lo strumento per l'invio di file, e ricorda che il container è temporaneo: tutto ciò che non è scaricato o committato si perde. **Non committare video e render** (sono esclusi da `.gitignore`); committa `motion/brands/` (la libreria dei brand, da conservare tra una sessione e l'altra) e, se l'utente vuole poter rifare il lavoro, `motion/clips/` e `motion/plan.json`.

Di' chiaramente che l'anteprima serve per la revisione: per il montaggio finale le clip vanno posizionate nel suo editor, dove può ritoccare i tempi, aggiungere transizioni e mixare l'audio.

## Integrazioni facoltative del workspace

Solo se l'utente lo chiede o accetta quando lo proponi: alcune consumano crediti o pubblicano all'esterno.
- **Brand da Canva** (`list-brand-kits`) → `brand.py nuovo <nome> …`.
- **Trascrizione con ElevenLabs** (`creative_transcribe_audio`) se `faster-whisper` non è disponibile; richiede di caricare l'audio su un flow ElevenLabs.
- **Higgsfield** (consuma crediti: prima stima il costo con `get_cost: true` quando lo strumento lo prevede, dillo all'utente e procedi solo con il suo ok; non ripetere mai una generazione per riprovare):
  - *Prima del lavoro:* `reframe` per trasformare un video 16:9 in 9:16 (o viceversa) da cui partire, fino a 60 s; poi rianalizza il risultato con `inspect_video.py`. Per un video sorgente a bassa risoluzione, `upscale_video`.
  - *Dentro le clip:* `generate_image` per un'immagine illustrativa da mettere in una card (un oggetto, un ambiente, un prodotto generico), `remove_background` per scontornare una foto o un prodotto dell'utente. Salva il file in `motion/inputs/`, usalo con `<img src="../inputs/…">`, tienilo coerente con i colori del brand (citali nel prompt) e **dichiaralo in `notes` di `plan.json` come immagine generata dall'AI**. Mai immagini che sembrino dati, screenshot o risultati reali.
  - *Dopo il lavoro:* `virality_predictor` sul montaggio finale o su `preview.mp4` per valutare hook, attenzione e rischio di abbandono; usa l'esito per proporre modifiche al piano (es. un cutaway più forte nei primi secondi), non per cambiare le clip senza chiedere.
  - Caricamento: i file locali vanno caricati con `media_upload` (PUT sull'URL ricevuto, poi `media_confirm`); se il caricamento dal container non riesce, usa `media_upload_widget` e chiedi all'utente di scegliere il file. I risultati si scaricano in `motion/inputs/` o `motion/work/`.
- **HeyGen** (a pagamento: indica all'utente il costo quando è noto, es. rimozione intercalari $0,30/minuto, e procedi solo con il suo ok; non ricreare mai un job per controllarne lo stato, interroga quello esistente ogni ~30 s):
  - *Video sorgente con avatar* (`create_video_from_avatar`): se l'utente non ha un video, ma ha uno script, genera lui che parla con il suo avatar. Avatar e voce li sceglie l'utente (`list_avatar_groups` → `list_avatar_looks`, `list_voices`): mai indovinare gli ID. Lo script resta parola per parola. Chiedi `caption: {file_format: "srt"}`: l'SRT restituito va a `words.py`, così non serve trascrivere. Imposta `aspectRatio` sul formato finale (9:16 per i social).
  - *Layout PiP con avatar trasparente:* con `outputFormat: "webm"` l'avatar esce con lo sfondo trasparente. Componilo sul canvas del brand in un angolo e lascia il resto libero per i pannelli:
    ```bash
    ffmpeg -f lavfi -i "color=c=<canvas>:s=1080x1920:r=<fps>" -c:v libvpx-vp9 -i motion/inputs/avatar.webm \
      -filter_complex "[1:v]scale=iw*0.5:-2[a];[0:v][a]overlay=x=40:y=1000:shortest=1,format=yuv420p[v]" -map "[v]" -map 1:a? \
      -c:v libx264 -crf 18 -c:a aac motion/work/source.mp4
    ```
    `-c:v libvpx-vp9` prima dell'input serve a leggere la trasparenza; scala e posizione (`scale`, `x`, `y`) vanno adattate all'avatar. Poi `inspect_video.py … --bg <canvas>` rileva lo spazio libero su quello sfondo. Ricorda che nel verticale l'avatar deve stare fuori dalle zone coperte dall'interfaccia social.
  - *Pulizia prima del B-roll* (`create_filler_word_removal`): toglie "ehm", "cioè" lunghi e silenzi. Va fatta **prima** di trascrivere e pianificare, perché cambia tutti i tempi.
  - *Da video lungo a short* (`create_ai_clipping`): ricava clip brevi da un video lungo; per il B-roll chiedi `captions: false` (i sottotitoli bruciati coprirebbero i pannelli) e lavora su ogni short come su un video nuovo.
  - *Versioni in altre lingue* (`create_video_translation`, voce clonata e labiale): traduci il video **pulito, senza B-roll**, poi rifai trascrizione, piano e build sulla versione tradotta, con i testi delle clip nella nuova lingua (la durata cambia, i tempi vanno ricalcolati). Il brand resta lo stesso.
  - *Brand kit HeyGen* (`list_brand_kits` → `get_brand_kit`): colori, logo e font da trasformare in un brand con `brand.py nuovo`.
  - Caricamento: `create_asset_upload` → PUT del file sull'URL ricevuto → `complete_asset_upload`; se il PUT dal container è bloccato dalla rete, chiedi all'utente un link pubblico al video o di caricarlo lui su HeyGen. Il risultato si scarica da `video_url` (`get_video`) in `motion/inputs/`.
  - Non usare HyperFrames di HeyGen per le clip: da Claude Code è disabilitato e fa lo stesso lavoro di questa skill con un altro motore.
- **Pubblicazione/programmazione** del video finito con Robin: mai senza conferma esplicita, e mai l'anteprima di revisione al posto del montaggio finale.

## Stile di default

Il brand scelto per il video ha la precedenza.

- **Colore (preset `default`):** canvas `#E9E7E2`, inchiostro `#0B0B0B`, componenti bianchi, un accento `#FF5A1F`. I pannelli su footage scuro usano forme chiare (`--panel`). Un solo accento per clip, qualunque sia il brand.
- **Testo e icone:** Geist per l'interfaccia, Geist Mono per codice, nomi file e terminali (o i font del brand). Un solo set di icone con un solo spessore (`M.icon`).
- **Movimento:** molle con al massimo un minimo overshoot. Bordo anteriore e posteriore su molle diverse, così gli indicatori si allungano. La camera zooma perché ogni stato riempia l'inquadratura.
- **Vietato:** easing rimbalzante, particelle, glow, gradienti sull'interfaccia, icone con spessori misti, tempi morti, tutto ciò che sembra un template, dati inventati.

## Insidie

- Mai `will-change` su qualcosa che la camera scala: il testo diventa sfocato.
- Il testo che si scambia dentro un contenitore che si trasforma ha bisogno di tempi propri di entrata e uscita (`M.vis` din/lin/lout), altrimenti vecchio e nuovo testo si sovrappongono.
- Le etichette con `mix-blend-mode: difference` devono stare in un layer che ha esso stesso il blend mode. Un genitore con filtro le isola.
- Gli elementi che scorrono sotto un'evidenziazione hanno bisogno di molle `M.FAST`, altrimenti la riga evidenziata resta vuota per un attimo.
- Tieni il cursore dentro l'inquadratura a ogni zoom della camera, anche durante le trasformazioni.
- Le stime dall'SRT derivano all'interno di un cue; metti i cambi importanti sulla prima o sull'ultima parola di un cue quando puoi.
- Una clip finisce tenendo l'ultimo stato; il composito tiene l'ultimo frame se lo slot è più lungo.
- Nei verticali scegli `cam` in modo che la forma stia nella larghezza della `safe_area` (es. 660 px × 1,3 ≈ 860 px), non che riempia tutto il frame.
- Il preview di `compare.html` e `viewer.html` va aperto in un browser normale: Chromium headless non riproduce H.264.
