# ISTRUZIONI PER CLAUDE CODE — Decreto PA è legge – 3 cose che ti riguardano

Reel 9:16 per CISL FP Padova Rovigo sulla conversione in legge del DL PA 144/2026. Fonte: nota CISL FP nazionale del 29/09/2026. Non modificare i testi.

## 0. Prima di tutto
- **Chiedi ad Achille su quale dei due account HeyGen lavorare.**

## 1. Voci (campo `voce_tipo`)
- **narratore** → voce HeyGen "Luca Ward", tono giornalistico-cinematografico, fuori campo.
- **achille** (solo scena finale) → ElevenLabs "Achille nuovo 1 v4", `eleven_multilingual_v2`, poi `silenceremove` + `atempo=1.12`.

## 2. Avatar e logo
- Avatar HeyGen "Aki with a lapel microphone" solo nella scena finale, in basso a destra.
- Logo CISL FP Padova Rovigo in alto a sinistra (sotto la banda nera nelle scene con letterbox).

## 3. Visivi
- `img/` — foto realistiche Higgsfield da animare (image-to-video, 5-8 s) secondo il campo `clip`, poi overlay da `overlay_clip/`.
- `grafiche/` — schermate finite 1080×1920. Animazioni ed effetti nel campo `regia`. Musica royalty-free.

## 4. Montaggio
- `create_video_from_studio`, durata ~118 s, titolo `PDRO – Decreto PA è legge – 3 cose`. Registro con tutti gli ID.

## 5. Post
- `post/POST_Decreto_PA_1080x1350.jpg` + testi in `TESTO_POST.md`.
