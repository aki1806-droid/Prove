# REGISTRO — PDRO «Chi c'è domani» · Ep. 3 · Il calendario (Reel 9:16)

Data: 16 ottobre 2026 · sessione Claude Code (repo Prove)
Serie di 5 episodi (piano in PDRO_ChiCeDomani_PIANO_SERIE.md). Account HeyGen: quello del connettore.
Scelte di Achille per la serie: voce di Achille con **HeyGen come passante**; stile **grafiche del pacchetto
animate**; ep. 5 **senza testimonianze** dei delegati.

## Voce
- Narratore «Luca Ward» (HeyGen e4bd8d8a357f41a99502309874733c16, motore elevenlabs, eleven_v4, uso autorizzato):
  una traccia per gli ep. 1-3 (request QKVyN3yvO9qd2UfyQmF3), blocchi uniti da pause di 1,6 s.
- Achille «Achille nuovo 1» (HeyGen 9b851842ce54449fb9ff501751ca0271, elevenlabs, eleven_v4): una traccia con le
  cinque chiusure (request 8zQZREgQ75WVbnLvtgLo). Il pacchetto indicava ElevenLabs/eleven_multilingual_v2.
- Tagli: ../strumenti/chicedomani/voci.py, sui word_timestamps di HeyGen (bordi controllati con silencedetect):
  narratore pause >0,6 s → 0,45 s a velocità naturale; Achille pause >0,45 s → 0,35 s e atempo 1,16.
  Testi di voce_testi/ invariati (verificato parola per parola). Tempi di ogni parola in audio/parole.json.
- Durate: S01 9.8 · S02 8.6 · S03 10.0 · S04 9.4 · S05 14.0 s.

## Clip (HeyGen image_to_video, heygen-video-1, 1080p, dalle foto img/ del pacchetto)
- S01 6708630b824944869755c47a8952eab5 (da img/calendario_vento.png, asset 19248491723b4755bef778c7693879cd, 10 s)

## Avatar
Look «Aki with a lapel microphone» e6d73d660d354b94b0a50c9692b7c34e, webm trasparente 193caba07da77598e54984961969b92a
(audio asset aa8664c895ae4eccae5ae7fee7ada701), solo nella scena 5, in basso a destra con alone chiaro.

## Grafica animata
Le grafiche del pacchetto (PNG composti) sono scomposte in pezzi (../strumenti/chicedomani/pezzi.py → grafica/pezzi/)
e rimesse a tempo sulle parole dal motore ../strumenti/chicedomani/motore.html (regia in serie.py, rendi.mjs a 25 fps).
- S01 clip delle pagine che volano; «CHI C'È / DOMANI?» su «pagine» e «volano».
- S02 la pagina 1 del calendario, testi scritti sulle parole («Rinnovo del contratto», «risorse da conquistare», «Chi sarà al tavolo?»); su «progressioni» si strappa e vola via a sinistra e sotto c'è la pagina 2 che si compila.
- S03 stesso movimento con le pagine 3 e 4; la pagina dell'intelligenza artificiale ha un glitch quando compare e su «governare».
- S04 «Ogni pagina / ha un tavolo.» sulle parole, i quattro tavoli compaiono uno per volta su «E ogni tavolo…», i punti interrogativi sulle sedie pulsano da «sedia», la domanda finale si scrive su «chi ci sarà seduto».
- S05 «IL FUTURO / SI PREPARA.» e la freccia dorata che si disegna da sinistra a destra, «Adesso.» su «adesso»; avatar in basso a destra.

## Montato
PDRO_ChiCeDomani_Ep3_Il_calendario_9x16.mp4: 1080x1920, 25 fps, 51.8 s (fuori da git). Montaggio: ../strumenti/chicedomani/monta.py.
Logo CISL FP Padova Rovigo in alto a sinistra (sotto la banda nelle scene con clip).
Sottotitoli: sottotitoli.srt dai tempi reali delle parole (non impressi).

## Da fare (Achille)
- Musica ed effetti sonori indicati nella regia (bussata, scotch, squilli, timbri, cassa…): non aggiunti.

## Originale su HeyGen
Caricato il 16/10/2026 come asset ed364588ef904953b234e62819bbc66a: https://resource2.heygen.ai/video/ed364588ef904953b234e62819bbc66a/original.mp4
