# REGISTRO — PDRO «Chi c'è domani» · Ep. 1 · Torno subito (Reel 9:16)

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
- Durate: S01 11.4 · S02 11.8 · S03 8.4 · S04 8.7 · S05 15.3 s.

## Clip (HeyGen image_to_video, heygen-video-1, 1080p, dalle foto img/ del pacchetto)
- S01 10d6b2da77c54465ad1fe42821f016df (da img/porta_chiusa.png, asset 7b32430d7f61445c8a3feda0bc985dc0, 12 s)
- S04 e0eed03c057548fe93552ef25a24d71a (da img/ufficio_vivo.png, asset 24085660b3b24eb0b31c3a9758a802bd, 10 s)

## Avatar
Look «Aki with a lapel microphone» e6d73d660d354b94b0a50c9692b7c34e, webm trasparente 05a146d7d47ed6f2a49cd9fb9e1ebbb4
(audio asset 54d2e05beaf54c6bb32c69198ac766b5), solo nella scena 5, in basso a destra con alone chiaro.

## Grafica animata
Le grafiche del pacchetto (PNG composti) sono scomposte in pezzi (../strumenti/chicedomani/pezzi.py → grafica/pezzi/)
e rimesse a tempo sulle parole dal motore ../strumenti/chicedomani/motore.html (regia in serie.py, rendi.mjs a 25 fps).
- S01 clip della porta chiusa; bande nere che entrano, badge, «TORNO / SUBITO» sbattuti sulle parole «torno subito», sottotitolo che si scrive su «Peccato».
- S02 i cartelli (S02B scomposto): «Torno subito» c'è già e viene barrato in rosso su «cambiato»; ogni cartello nuovo arriva con lo scotch sulla sua frase («Torno presto», «torno appena posso», «ci sentiamo») e il precedente si barra su «Poi:». I cartelli ondeggiano.
- S03 il telefono: anelli che pulsano su «Squilla», «volta» e «Due», telefono che vibra, puntini che lampeggiano, didascalia scritta a tempo; su «risponde» lo schermo diventa verde (S03B), i sei volti entrano uno dopo l'altro, «Ti ascoltiamo» su «tanti», anelli gialli. Sotto le didascalie una banda scura sfumata (il fondo ad anelli non si poteva ricostruire pulito).
- S04 clip dell'ufficio vivo; l'insegna APERTO si accende a sfarfallii di neon, «Non una promessa: / una risposta.» si scrivono sulle parole.
- S05 «LA PORTA / APERTA.» a blocchi, «Oggi e domani.» su «oggi»; lenta spinta in avanti; avatar in basso a destra.

## Montato
PDRO_ChiCeDomani_Ep1_Torno_subito_9x16.mp4: 1080x1920, 25 fps, 55.6 s (fuori da git), copia d'invio _invio.mp4 sotto i 30 MB. Montaggio: ../strumenti/chicedomani/monta.py.
Logo CISL FP Padova Rovigo in alto a sinistra (sotto la banda nelle scene con clip).
Sottotitoli: sottotitoli.srt dai tempi reali delle parole (non impressi).

## Da fare (Achille)
- Musica ed effetti sonori indicati nella regia (bussata, scotch, squilli, timbri, cassa…): non aggiunti.

## Originale su HeyGen
Caricato il 16/10/2026 come asset 24fc42a5aa144d398325642e846f0844: https://resource2.heygen.ai/video/24fc42a5aa144d398325642e846f0844/original.mp4
