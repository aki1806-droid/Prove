# ISTRUZIONI PER CLAUDE CODE — Aggiornamento pagamenti (ottobre 2026)

Reel 9:16 per CISL FP Padova Rovigo: conguaglio produttività non pagato a ottobre, attesi a novembre (con arretrati DEP 2025), arretrati CCNL 2025-2027 non a novembre. Tono chiaro, trasparente, senza promesse. Non modificare i testi.

## 0. Prima di tutto
- **Chiedi ad Achille su quale dei due account HeyGen lavorare.**

## 1. Voci
- **narratore** → voce HeyGen "Luca Ward", tono informativo e pacato, fuori campo.
- **achille** (solo scena finale) → ElevenLabs "Achille nuovo 1 v4", `eleven_multilingual_v2`, `silenceremove` + `atempo=1.12`.

## 2. Avatar e logo
- Avatar HeyGen "Aki with a lapel microphone" solo nella scena finale, in basso a destra. Logo CISL FP Padova Rovigo in alto a sinistra.

## 3. Visivi
- `img/` — foto realistiche Higgsfield da animare (image-to-video, 5-8 s) secondo il campo `clip`, poi overlay da `overlay_clip/`.
- `grafiche/` — tabellone stile "partenze" (scene 2-4): animare le lettere come palette che girano e le righe che si accendono. Effetto sonoro di palette (royalty-free).

## 4. Montaggio
- `create_video_from_studio`, durata ~85 s, titolo `PDRO – Aggiornamento pagamenti ottobre 2026`. Registro con tutti gli ID.

## 5. Attenzione
- Il video dice che a novembre i pagamenti sono "attesi" e che l'impegno non è ancora certo: se arriva la conferma (o una smentita) prima della pubblicazione, aggiornare scena 3 e tabellone.
