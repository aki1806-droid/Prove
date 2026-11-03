# ISTRUZIONI PER CLAUDE CODE — Le tue segnalazioni: a che punto sono?

Reel 9:16 per CISL FP Padova Rovigo sulle risposte della Direzione AOUP alle segnalazioni sindacali, nel format «tracciamento della consegna». Nessun nome di persone. Personaggi generici: nessun nome di persone o sigle. Non modificare i testi.

## 0. Prima di tutto
- **Chiedi ad Achille su quale dei due account HeyGen lavorare.**

## 1. Voci
- **narratore** → voce HeyGen "Luca Ward", tono informativo e deciso, con un filo di ironia sul format.
- **achille** (solo scena finale) → ElevenLabs "Achille nuovo 1 v4", `eleven_multilingual_v2`, `silenceremove` + `atempo=1.12`.

## 2. Avatar e logo
- Avatar HeyGen "Aki with a lapel microphone" solo nella scena finale, in basso a destra. Logo CISL FP Padova Rovigo in alto a sinistra.

## 3. Visivi e audio
- `img/` — immagini Higgsfield da animare (image-to-video, 5-8 s) secondo il campo `clip`, poi overlay da `overlay_clip/`.
- `grafiche/` — schermate finite; animazioni ed effetti nel campo `regia`. Musica royalty-free incalzante; effetti da app di consegne (notifiche, barre che avanzano).

## 4. Montaggio
- `create_video_from_studio`, durata ~140 s, titolo `PDRO – Le tue segnalazioni: a che punto sono?`. Registro con tutti gli ID.
