# ISTRUZIONI PER CLAUDE CODE — Quanto vale una tessera?

Reel 9:16 per CISL FP Padova Rovigo, della serie **"Convenzioni CISL FP"**: format originali per far conoscere le convenzioni riservate agli iscritti e alle loro famiglie (fonte: convenzionicislfp.it, novembre 2026). I marchi dei partner si citano a voce e nei testi, ma **non** si riproducono loghi. Personaggi generici: nessun nome di persone o sigle. Non modificare i testi.

## 0. Prima di tutto
- **Chiedi ad Achille su quale dei due account HeyGen lavorare.**

## 1. Voci
- **narratore** → voce HeyGen "Luca Ward", tono adatto al format (vedi regia), ironico e chiaro.
- **achille** (solo scena finale) → ElevenLabs "Achille nuovo 1 v4", `eleven_multilingual_v2`, `silenceremove` + `atempo=1.12`.

## 2. Avatar e logo
- Avatar HeyGen "Aki with a lapel microphone" solo nella scena finale, in basso a destra. Logo CISL FP Padova Rovigo in alto a sinistra.

## 3. Visivi e audio
- `img/` — immagini Higgsfield da animare (image-to-video, 5-8 s) secondo il campo `clip`, poi overlay da `overlay_clip/`.
- `grafiche/` — schermate finite; animazioni ed effetti nel campo `regia`. Musica ed effetti royalty-free adatti al format.

## 4. Montaggio
- `create_video_from_studio`, durata ~59 s, titolo `PDRO – Convenzioni – Quanto vale una tessera?`. Registro con tutti gli ID.
