# ISTRUZIONI PER CLAUDE CODE — Scegli il tuo turno – turni da 12 ore

Reel 9:16 per CISL FP Padova Rovigo sui turni da 12 ore, nel format «librogame» (scegli la tua avventura). Fonte: comunicato «CISL FP informa – Turni da 12 ore». Personaggi generici: nessun nome di persone o sigle. Non modificare i testi.

## 0. Prima di tutto
- **Chiedi ad Achille su quale dei due account HeyGen lavorare.**

## 1. Voci
- **narratore** → voce HeyGen "Luca Ward", tono da narratore di libro-avventura, coinvolgente; più grave sulla «pagina trappola».
- **achille** (solo scena finale) → ElevenLabs "Achille nuovo 1 v4", `eleven_multilingual_v2`, `silenceremove` + `atempo=1.12`.

## 2. Avatar e logo
- Avatar HeyGen "Aki with a lapel microphone" solo nella scena finale, in basso a destra. Logo CISL FP Padova Rovigo in alto a sinistra.

## 3. Visivi e audio
- `img/` — immagini Higgsfield da animare (image-to-video, 5-8 s) secondo il campo `clip`, poi overlay da `overlay_clip/`.
- `grafiche/` — schermate finite; animazioni ed effetti nel campo `regia`. Musica d'avventura royalty-free; effetti di pagine che si girano.

## 4. Montaggio
- `create_video_from_studio`, durata ~124 s, titolo `PDRO – Scegli il tuo turno – turni da 12 ore`. Registro con tutti gli ID.
