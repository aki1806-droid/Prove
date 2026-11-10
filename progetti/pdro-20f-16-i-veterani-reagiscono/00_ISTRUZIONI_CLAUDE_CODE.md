# ISTRUZIONI PER CLAUDE CODE — I veterani reagiscono (v2)

Video n. 16 della serie «20 format attrattivi» di **CISL FP Padova Rovigo**. Non modificare i testi.
## 5. Clip d'aggancio (NOVITÀ v2)
- Ogni video si apre con un **hook di 1,5-2 secondi**: titolo gigante + movimento. Se disponibile, usa come sfondo del hook la clip video indicata nel campo `clip` (da generare con HeyGen text-to-video / image-to-video o Higgsfield), altrimenti anima la grafica con zoom-in rapido (110%→100%) e shake leggero.
- **Ritmo:** cambio di inquadratura o di grafica ogni 1,5-2,5 secondi (le grafiche A/B/C di ogni scena sono i "beat" da montare in sequenza sulle parole).
- **Testo cinetico:** le parole evidenziate entrano con "pop" (scala 80%→105%→100%) e un suono «whoosh/pop»; sottotitoli dinamici parola-per-parola nella fascia bassa (1450-1700 px).
- **Barra di avanzamento** in alto già disegnata nelle grafiche: va animata (o lasciata statica per scena).
- Musica: traccia royalty-free ritmata (110-125 BPM), con stacco sul colpo di scena.

**Questo format richiede RIPRESE REALI: vedi SHOT_LIST.md e LIBERATORIA.md.**

## 0. Prima di tutto
- **Chiedi ad Achille su quale dei due account HeyGen lavorare.**

## 1. Voci
- **narratore** → voce HeyGen "Luca Ward", tono divertito da reaction.
- **achille** (chiusura) → ElevenLabs "Achille nuovo 1 v4", `eleven_multilingual_v2`, `silenceremove` + `atempo=1.12`, avatar HeyGen "Aki with a lapel microphone" in basso a destra.

## 2. Identità
- Logo CISL FP Padova Rovigo in alto a sinistra in tutte le scene. Formato 9:16, 1080×1920. Sottotitoli grandi sempre attivi.
- Aggancio: i primi 2 secondi devono mostrare subito il titolo forte, mai il logo da solo.

## 3. Visivi
- `img/` immagini da animare (image-to-video) secondo il campo `clip`, con overlay da `overlay_clip/`; `grafiche/` schermate finite con animazioni nel campo `regia`. Audio royalty-free.

## 4. Montaggio
- `create_video_from_studio`, durata ~19 s, titolo `PDRO – I veterani reagiscono (v2)`. Registro con tutti gli ID.
