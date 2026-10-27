# ISTRUZIONI PER CLAUDE CODE — Il caso del volantino scomparso

Reel 9:16 per CISL FP Padova Rovigo contro lo strappo dei volantini sindacali, in forma di finto documentario true crime: ironico nella prima parte (scene 1-4), serio e fermo nella seconda (5-7), chiusura con un sorriso e i contatti. Nessun nome di persone o sigle avversarie. Non modificare i testi.

## 0. Prima di tutto
- **Chiedi ad Achille su quale dei due account HeyGen lavorare.**

## 1. Voci
- **narratore** → voce HeyGen "Luca Ward": tono da documentario poliziesco nelle scene 1-4, poi più aperto e serio dalla scena 5 ("Torniamo seri").
- **achille** (solo scena finale) → ElevenLabs "Achille nuovo 1 v4", `eleven_multilingual_v2`, `silenceremove` + `atempo=1.12`.

## 2. Avatar e logo
- Avatar HeyGen "Aki with a lapel microphone" solo nella scena finale, in basso a destra. Logo CISL FP Padova Rovigo in alto a sinistra.
- Scena finale: a schermo i contatti di Achille Pagliaro (391 127 1018) e Giovanna Vullo (389 928 5301).

## 3. Visivi e audio
- `img/` — foto realistiche Higgsfield da animare (image-to-video, 5-8 s) secondo il campo `clip`, poi overlay da `overlay_clip/`.
- `grafiche/` — schermate finite (fascicolo, foglio strappato, manifesto CERCASI, schede normative, timbro, chiusura).
- Effetti: macchina da scrivere, strappo di carta, timbri, due secondi di musica western con grillo (scena 4), puntine (scena 8). Musica royalty-free.

## 4. Montaggio
- `create_video_from_studio`, durata ~135 s, titolo `PDRO – Il caso del volantino scomparso`. Registro con tutti gli ID.
