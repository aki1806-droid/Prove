# ISTRUZIONI PER CLAUDE CODE — Verso il coordinamento – pacchetto master per gli iscritti

Reel 9:16 promozionale e informativo per CISL FP Padova Rovigo: il pacchetto "Verso il coordinamento" per gli iscritti (master di I livello in management/coordinamento, convenzioni UnitelmaSapienza e Pegaso, accompagnamento). Fonte: Guida Master Coordinamento CISL FP Padova Rovigo, ottobre 2026. Non modificare i testi.

## 0. Prima di tutto
- **Chiedi ad Achille su quale dei due account HeyGen lavorare.**

## 1. Voci
- **narratore** → voce HeyGen "Luca Ward", fuori campo.
- **achille** (solo scena finale) → ElevenLabs "Achille nuovo 1 v4", `eleven_multilingual_v2`, `silenceremove` + `atempo=1.12`.

## 2. Avatar e logo
- Avatar HeyGen "Aki with a lapel microphone" solo nella scena finale, in basso a destra. Logo CISL FP Padova Rovigo in alto a sinistra.

## 3. Visivi
- `img/` — foto realistiche Higgsfield da animare (image-to-video, 5-8 s) secondo il campo `clip`, poi overlay da `overlay_clip/`. `mc_diploma.png` è un'immagine in più, utilizzabile come B-roll nella scena 7 o come copertina.
- `grafiche/` — schermate finite 1080×1920. Animazioni nel campo `regia`. Musica royalty-free.

## 4. Da verificare prima della pubblicazione
- Quote e rate delle convenzioni (cambiano da un'edizione all'altra).
- La scadenza dell'11/11 si riferisce al bando 150 ore dell'AOUP: se il video circola oltre l'AOUP o dopo quella data, togliere il riferimento dalla scena 8.

## 5. Montaggio
- `create_video_from_studio`, durata ~128 s, titolo `PDRO – Verso il coordinamento`. Registro con tutti gli ID.
