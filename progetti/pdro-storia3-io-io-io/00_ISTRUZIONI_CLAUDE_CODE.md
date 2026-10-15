# ISTRUZIONI PER CLAUDE CODE — Io, io, io

Reel 9:16 di **storytelling ironico** per CISL FP Padova Rovigo. Nessun riferimento diretto a persone, sigle, date o slogan di altri sindacati: **non aggiungerne**. Il testo è approvato: non modificare la narrazione.

## 0. Prima di tutto
- **Chiedi ad Achille su quale dei due account HeyGen lavorare.** La voce "Luca Ward" è nella libreria dell'account collegato al connettore (uso autorizzato CISL FP).

## 1. Voci (diverse da scena a scena: guarda il campo `voce_tipo` in `blocchi.json`)
- **spot** → HeyGen · voce "Luca Ward" in tono da televendita
- **narratore** → HeyGen · voce "Luca Ward"
- **achille** → ElevenLabs · "Achille nuovo 1 v4" (atempo 1.12) con avatar HeyGen "Aki with a lapel microphone"
- Narratore e spot: genera le tracce con la voce HeyGen "Luca Ward" (speech HeyGen), ritmo da trailer, pause dove c'è il punto.
- **Spot**: tono da televendita anni Novanta; la scena 'Avvertenze' va accelerata (atempo 1.25) come nei bugiardini.
- **Achille** (solo scena finale): ElevenLabs "Achille nuovo 1 v4", `eleven_multilingual_v2`, poi `silenceremove` + `atempo=1.12`.

## 2. Avatar
- **Solo nella scena finale**: avatar HeyGen "Aki with a lapel microphone", in basso a destra. Nelle scene di racconto **niente avatar**: parla il narratore fuori campo.
- Logo CISL FP Padova Rovigo sempre in alto a sinistra (nelle scene con bande nere, appena sotto la banda).

## 3. Visivi
- `img/` — illustrazioni Higgsfield da animare (image-to-video, 5-8 s, movimento lento e cinematografico) secondo il prompt nel campo `clip`. Poi sovrapponi l'overlay della scena da `overlay_clip/`.
- `grafiche/` — schermate 1080×1920 già finite. Ogni scena ha A e, quando presente, B che entra sulla frase indicata (`grafiche[1].da`).
- Le animazioni (testi che compaiono, timbri, contatori) sono descritte nel campo `regia` e in `SCRIPT.md`.

## 4. Audio
- Musica ed effetti in montaggio (indicati in `regia`): niente musica protetta da copyright, usa librerie royalty-free.

## 5. Montaggio
- `create_video_from_studio`, una chiamata, nell'ordine delle scene. Durata stimata ~66 s. Titolo: `PDRO – Io, io, io`.
- Compila il registro con ID tracce, asset, avatar e video.
