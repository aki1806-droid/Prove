# REGISTRO — PDRO «Il navigatore del 2010» (Reel 9:16, storytelling)

Data: 15-16 ottobre 2026 · sessione Claude Code (repo Prove). Account HeyGen: quello del connettore (confermato da Achille).

## Voci (scelte di Achille il 15/10)
- Narratore, navigatore, spot: voce privata HeyGen «Luca Ward» (e4bd8d8a357f41a99502309874733c16, motore ElevenLabs,
  eleven_v4), uso autorizzato confermato da Achille. Una sola chiamata create_speech per la storia, blocchi uniti da
  <break time="1.6s"/>, request 639nez1QIn20UcW2x9RX; grezzo in audio/ward-grezzo.mp3.
- Achille (chiusura): HeyGen come passante (create_speech, engine elevenlabs, eleven_v4, voce «Achille nuovo 1»
  9b851842ce54449fb9ff501751ca0271), una chiamata per le tre chiusure (request CbfuRjO4rWZnTjgHX8es),
  atempo 1,16 come da CLAUDE.md; grezzo in ../strumenti/storie/achille-tre-chiusure-grezzo.mp3.
- Taglio e trattamento: ../strumenti/storie/voci.py (tagli a metà delle pause di confine dai word_timestamps;
  narratore a velocità naturale con pause oltre 0,6 s ridotte a 0,45; navigatore con l'effetto altoparlante del pacchetto;
  «Avvertenze» con atempo 1,25).
- Durate: S01 narratore 14.2 s · S02 navigatore 6.0 s · S03 narratore 12.0 s · S04 navigatore 6.3 s · S05 narratore 14.9 s · S06 narratore 12.6 s · S07 achille 18.5 s. Totale 84.6 s.

## Illustrazioni animate
- S01: immagine asset 0135463bfd804d59bd3010700707f4bb → HeyGen image_to_video (heygen-video-1, 1080x1890) 99fa2813057f44bf830e2c7f5db8838c
- S06: immagine asset 90cb5baa7fc04abaaa62e3b74e8a7654 → HeyGen image_to_video (heygen-video-1, 1080x1890) 51a036bd72a54119ad0465b504661cc0
Rallentate alla durata della voce, ritagliate a 1080x1920, con sopra overlay_clip/.

## Avatar (solo chiusura)
Look «Aki with a lapel microphone» e6d73d660d354b94b0a50c9692b7c34e, audio asset cfbc39379ca8452eb8472ed7f7b6a3d1, video webm 20a648040d01cfa876771524fe41f734.
In basso a destra con alone chiaro, come negli altri PDRO.

## Montaggio
../strumenti/storie/monta_storia.py (locale, non create_video_from_studio: l'avatar va in basso a destra e la grafica B
entra sulla frase). Cambi B: audio/cambi-B.json. Logo in alto a sinistra; sotto la banda nera nelle illustrazioni.
PDRO_Il_navigatore_9x16.mp4 (fuori da git) e copia d'invio PDRO_Il_navigatore_9x16_invio.mp4. Sottotitoli: sottotitoli.srt, non impressi.

## Da fare / verificare
- Musica ed effetti (indicati nella «regia»): royalty-free, li aggiunge Achille.
- Animazioni della «regia» (testi carattere per carattere, timbri, contatori) non fatte: grafiche già composte, solo cambio A→B.
- Rivedere prima della pubblicazione (checklist del pacchetto).
