# ISTRUZIONI PER CLAUDE CODE — Sali di livello – corso progressioni verticali

Reel 9:16 per CISL FP Padova Rovigo per rilanciare il corso di preparazione progressioni verticali. Non modificare i testi.

## 0. Prima di tutto
- **Chiedi ad Achille su quale dei due account HeyGen lavorare.**

## 1. Voci (campo `voce_tipo`)
- **narratore** → voce HeyGen "Luca Ward", tono cinematografico, fuori campo.
- **achille** (solo scena finale) → ElevenLabs "Achille nuovo 1 v4", `eleven_multilingual_v2`, poi `silenceremove` + `atempo=1.12`.

## 2. Avatar e logo
- Avatar HeyGen "Aki with a lapel microphone" solo nella scena finale, in basso a destra.
- Logo CISL FP Padova Rovigo in alto a sinistra (sotto la banda nera nelle scene con letterbox).

## 3. Visivi
- `img/` — foto realistiche Higgsfield da animare (image-to-video, 5-8 s) secondo il campo `clip`; sopra va l'overlay di `overlay_clip/`.
- `grafiche/` — schermate finite 1080×1920.
- Animazioni ed effetti: campo `regia`. Musica solo royalty-free.

## 4. Da verificare
- Il corso è gratuito per gli iscritti CISL FP: verificare che l'offerta su SquaddCRM sia attiva prima della pubblicazione.
- I nomi dei moduli nello smartphone (scena 5) sono indicativi: allinearli ai titoli reali dei moduli "PV x.y" su SquaddCRM.

## 5. Montaggio
- `create_video_from_studio`, durata ~78 s, titolo `PDRO – Sali di livello – corso progressioni verticali`. Registro con tutti gli ID.
