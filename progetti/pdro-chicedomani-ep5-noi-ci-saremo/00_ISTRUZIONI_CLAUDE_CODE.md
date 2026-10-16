# ISTRUZIONI PER CLAUDE CODE — Chi c'è domani · Ep. 5 · Noi ci saremo

Reel 9:16 della serie **"Chi c'è domani"** (5 episodi) per CISL FP Padova Rovigo. Storytelling ironico e positivo: **nessun riferimento a persone, sigle, date o slogan di altri sindacati, nessuna ironia sull'età**. Non modificare i testi.

## 0. Prima di tutto
- **Chiedi ad Achille su quale dei due account HeyGen lavorare.**

## 1. Voci (campo `voce_tipo` in `blocchi.json`)
- **narratore** → voce HeyGen "Luca Ward" (account collegato, uso autorizzato), tono da racconto cinematografico, fuori campo.
- **achille** (solo scena finale) → ElevenLabs "Achille nuovo 1 v4", `eleven_multilingual_v2`, poi `silenceremove` + `atempo=1.12`.

## 2. Avatar e logo
- Avatar HeyGen "Aki with a lapel microphone" **solo nella scena finale**, in basso a destra.
- Logo CISL FP Padova Rovigo sempre in alto a sinistra (sotto la banda nera nelle scene con letterbox).
- Il badge "CHI C'È DOMANI · EP. 5" è già nel titolo di apertura.

## 3. Visivi
- `img/` — foto realistiche Higgsfield da animare con image-to-video (5-8 s, movimento cinematografico) secondo il campo `clip`; poi sovrapponi l'overlay da `overlay_clip/`.
- `grafiche/` — schermate finite 1080×1920; B entra sulla frase indicata in `grafiche[1].da`.
- Animazioni, effetti sonori e musica: campo `regia` e `SCRIPT.md`. Solo musica royalty-free.
- **Scena 2: testimonianze dei delegati da girare** (vedi campo `clip`): tre clip verticali da 8 s; sottopancia in `overlay_clip/S02A`, `S02B` e `extra/lowerthird_3.png` (sostituire NOME COGNOME e ruolo).

## 4. Montaggio
- `create_video_from_studio`, ordine delle scene, durata ~56 s, titolo `PDRO – Chi c'è domani – Ep. 5 – Noi ci saremo`. Registro con tutti gli ID.
