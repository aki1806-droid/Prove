# ISTRUZIONI PER CLAUDE CODE — Il Gatto, la Volpe e il Campo dei Miracoli

Reel 9:16 della serie **"Le favole del sindacato"** per CISL FP Padova Rovigo: una favola classica (di pubblico dominio) riletta in chiave sindacale e ironica. Personaggi generici: nessun nome di persone o sigle. Non modificare i testi.

## 0. Prima di tutto
- **Chiedi ad Achille su quale dei due account HeyGen lavorare.**

## 1. Voci
- **narratore** → voce HeyGen "Luca Ward", tono da narratore di fiabe con ironia sottile (pause, sorrisi nella voce).
- **achille** (solo scena finale) → ElevenLabs "Achille nuovo 1 v4", `eleven_multilingual_v2`, `silenceremove` + `atempo=1.12`.

## 2. Avatar e logo
- Avatar HeyGen "Aki with a lapel microphone" solo nella scena finale, in basso a destra. Logo CISL FP Padova Rovigo in alto a sinistra.

## 3. Visivi e audio
- `img/` — immagini Higgsfield da animare (image-to-video, 5-8 s) secondo il campo `clip`, poi overlay da `overlay_clip/`.
- `grafiche/` — schermate finite; animazioni ed effetti nel campo `regia`. Musica da fiaba (carillon, archi) royalty-free.

## 4. Montaggio
- `create_video_from_studio`, durata ~59 s, titolo `PDRO – Favole – Il Gatto, la Volpe e il Campo dei Miracoli`. Registro con tutti gli ID.
