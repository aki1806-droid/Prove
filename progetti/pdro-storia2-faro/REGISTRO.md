# REGISTRO — PDRO «Il guardiano del faro» (Reel 9:16, storytelling)

Data: 15-16 ottobre 2026 · sessione Claude Code (repo Prove). Account HeyGen: quello del connettore (confermato da Achille).

## Voci (scelte di Achille il 15/10)
- Narratore, navigatore, spot: voce privata HeyGen «Luca Ward» (e4bd8d8a357f41a99502309874733c16, motore ElevenLabs,
  eleven_v4), uso autorizzato confermato da Achille. Una sola chiamata create_speech per la storia, blocchi uniti da
  <break time="1.6s"/>, request 6qdax7OyDe9g8gGrFYMh; grezzo in audio/ward-grezzo.mp3.
- Achille (chiusura): HeyGen come passante (create_speech, engine elevenlabs, eleven_v4, voce «Achille nuovo 1»
  9b851842ce54449fb9ff501751ca0271), una chiamata per le tre chiusure (request CbfuRjO4rWZnTjgHX8es),
  atempo 1,16 come da CLAUDE.md; grezzo in ../strumenti/storie/achille-tre-chiusure-grezzo.mp3.
- Taglio e trattamento: ../strumenti/storie/voci.py (tagli a metà delle pause di confine dai word_timestamps;
  narratore a velocità naturale con pause oltre 0,6 s ridotte a 0,45; navigatore con l'effetto altoparlante del pacchetto;
  «Avvertenze» con atempo 1,25).
- Durate: S01 narratore 15.4 s · S02 narratore 10.2 s · S03 narratore 10.5 s · S04 narratore 14.8 s · S05 narratore 6.7 s · S06 achille 19.9 s. Totale 77.5 s.

## Illustrazioni animate
- S01: immagine asset 09f3749b7c7e4dd2abd41eba8c4cb838 → HeyGen image_to_video (heygen-video-1, 1080x1890) d454456b3614470e91dac4021483fc4b
- S04: immagine asset 00b7975ee979476e96a269411dc608b3 → HeyGen image_to_video (heygen-video-1, 1080x1890) 15d9715d552c4cb1a62a697c733043a0
Rallentate alla durata della voce, ritagliate a 1080x1920, con sopra overlay_clip/.

## Avatar (solo chiusura)
Look «Aki with a lapel microphone» e6d73d660d354b94b0a50c9692b7c34e, audio asset 767d875156574d95a046211fdb80992b, video webm 021932ed63da07e5d92b52eeeb00d1c8.
In basso a destra con alone chiaro, come negli altri PDRO.

## Montaggio
../strumenti/storie/monta_storia.py (locale, non create_video_from_studio: l'avatar va in basso a destra e la grafica B
entra sulla frase). Cambi B: audio/cambi-B.json. Logo in alto a sinistra; sotto la banda nera nelle illustrazioni.
PDRO_Il_guardiano_del_faro_9x16.mp4 (fuori da git) e copia d'invio PDRO_Il_guardiano_del_faro_9x16_invio.mp4. Sottotitoli: sottotitoli.srt, non impressi.

## Da fare / verificare
- Musica ed effetti (indicati nella «regia»): royalty-free, li aggiunge Achille.
- Animazioni della «regia» (testi carattere per carattere, timbri, contatori) non fatte: grafiche già composte, solo cambio A→B.
- Rivedere prima della pubblicazione (checklist del pacchetto).
