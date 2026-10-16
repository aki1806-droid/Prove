# REGISTRO — PDRO «Chi c'è domani» · Ep. 2 · Il passaggio del testimone (Reel 9:16)

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
- Durate: S01 10.1 · S02 9.1 · S03 11.2 · S04 11.2 · S05 13.9 s.

## Clip (HeyGen image_to_video, heygen-video-1, 1080p, dalle foto img/ del pacchetto)
- S01 0e0feb84ccb14374af0f4a4857831810 (da img/staffetta_blocco.png, asset d04683d2c9684196b8128a99cda11f0e, 10 s)
- S04 c6c938d622b14184984748198c147fbc (da img/staffetta_passaggio.png, asset bf42b2ecd6334e22b46a5c84ca81c10d, 12 s)

## Avatar
Look «Aki with a lapel microphone» e6d73d660d354b94b0a50c9692b7c34e, webm trasparente 7298d8d5debe8b6dc4911fa734fe43be
(audio asset 4e24a058898c4a7fa90b340577c3b303), solo nella scena 5, in basso a destra con alone chiaro.

## Grafica animata
Le grafiche del pacchetto (PNG composti) sono scomposte in pezzi (../strumenti/chicedomani/pezzi.py → grafica/pezzi/)
e rimesse a tempo sulle parole dal motore ../strumenti/chicedomani/motore.html (regia in serie.py, rendi.mjs a 25 fps).
- S01 clip della staffetta (ralenti comico); bande, badge, «IL / TESTIMONE» su «testimone», sottotitolo su «Ma».
- S02 la pista dall'alto: i cinque birilli degli avversari salgono dal fondo e continuano a scorrere verso l'alto, il pallino verde FERMO pulsa nella zona cambio, una lancetta dorata gira senza fine sul cronometro «+∞», «Gli altri passano avanti.» si scrive su «Gli altri».
- S03 il libretto si apre dall'alto, Art. 1 e le righe si scrivono una per una sulle parole, il testimone dorato rotola sul foglio su «semplice», Art. 2 su «se», il testo su «perde».
- S04 clip del cambio; ESPERIENZA entra da sinistra su «esperienza», FUTURO da destra su «arriva», il «+» su «accelera», «Nessuno resta indietro.» si scrive.
- S05 il testimone dorato attraversa lo schermo ed entra al suo posto, poi «IL TESTIMONE / PASSA. / Si vince insieme.»; avatar in basso a destra.

## Montato
PDRO_ChiCeDomani_Ep2_Il_testimone_9x16.mp4: 1080x1920, 25 fps, 55.5 s (fuori da git). Montaggio: ../strumenti/chicedomani/monta.py.
Logo CISL FP Padova Rovigo in alto a sinistra (sotto la banda nelle scene con clip).
Sottotitoli: sottotitoli.srt dai tempi reali delle parole (non impressi).

## Da fare (Achille)
- Musica ed effetti sonori indicati nella regia (bussata, scotch, squilli, timbri, cassa…): non aggiunti.

## Originale su HeyGen
Caricato il 16/10/2026 come asset ef4bdbdda5964cdd8b156a67eb84a3ee: https://resource2.heygen.ai/video/ef4bdbdda5964cdd8b156a67eb84a3ee/original.mp4
