# ISTRUZIONI PER CLAUDE CODE — Nuovo Bonus mamme 2026

Reel 9:16 per CISL FP Padova Rovigo sul nuovo Bonus mamme 2026 (INPS). Fonte: scheda INPS del 20/10/2026, circolare INPS n. 106 del 16/10/2026. Non modificare i testi.

## 0. Prima di tutto
- **Chiedi ad Achille su quale dei due account HeyGen lavorare.**

## 1. Voci
- **narratore** → voce HeyGen "Luca Ward", tono caldo e chiaro, fuori campo.
- **achille** (solo scena finale) → ElevenLabs "Achille nuovo 1 v4", `eleven_multilingual_v2`, `silenceremove` + `atempo=1.12`.

## 2. Avatar e logo
- Avatar HeyGen "Aki with a lapel microphone" solo nella scena finale, in basso a destra. Logo CISL FP Padova Rovigo in alto a sinistra.

## 3. Visivi
- `img/` — foto realistiche Higgsfield da animare (image-to-video, 5-8 s) secondo il campo `clip`, poi overlay da `overlay_clip/`.
- `grafiche/` — schermate finite 1080×1920. Animazioni nel campo `regia`. Musica royalty-free, dolce.

## 4. Montaggio
- `create_video_from_studio`, durata ~94 s, titolo `PDRO – Bonus mamme 2026`. Registro con tutti gli ID.
