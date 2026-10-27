# ISTRUZIONI PER CLAUDE CODE — Oncoematologia pediatrica: il confronto del 27 ottobre

Reel 9:16 per CISL FP Padova Rovigo sull'incontro del 27/10/2026 con la Direzione AOUP. Tono sobrio, umano e deciso. **Nessun bambino in scena, nessun dettaglio clinico, nessuna ipotesi sulle cause, nessun nome di persone o aziende.** Non modificare i testi.

## 0. Prima di tutto
- **Chiedi ad Achille su quale dei due account HeyGen lavorare.**

## 1. Voci
- **narratore** → voce HeyGen "Luca Ward", tono sobrio e caldo, fuori campo.
- **achille** (solo scena finale) → ElevenLabs "Achille nuovo 1 v4", `eleven_multilingual_v2`, `silenceremove` + `atempo=1.12`.

## 2. Avatar e logo
- Avatar HeyGen "Aki with a lapel microphone" solo nella scena finale, in basso a destra. Logo CISL FP Padova Rovigo in alto a sinistra.
- Scena finale: a schermo i numeri di Achille Pagliaro (391 127 1018) e Giovanna Vullo (389 928 5301).

## 3. Visivi e audio
- `img/` — foto realistiche Higgsfield da animare (image-to-video, 5-8 s) secondo il campo `clip`, poi overlay da `overlay_clip/`. Nessun paziente nelle animazioni.
- `grafiche/` — schermate finite; la tabella delle 4 richieste si accende progressivamente (scene 5 e 7).
- Musica royalty-free sobria; pianoforte nelle scene 6 e 8.

## 4. Montaggio
- `create_video_from_studio`, durata ~147 s, titolo `PDRO – Oncoematologia – confronto 27 ottobre`. Registro con tutti gli ID.
