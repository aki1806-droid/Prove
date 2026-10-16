# REGISTRO — PDRO «Chi c'è domani» · Ep. 5 · Noi ci saremo (Reel 9:16)

Data: 16 ottobre 2026 · sessione Claude Code (repo Prove)
Serie di 5 episodi (piano in PDRO_ChiCeDomani_PIANO_SERIE.md). Account HeyGen: quello del connettore.
Scelte di Achille per la serie: voce di Achille con **HeyGen come passante**; stile **grafiche del pacchetto
animate**; ep. 5 **senza testimonianze** dei delegati.

## Voce
- Narratore «Luca Ward» (HeyGen e4bd8d8a357f41a99502309874733c16, motore elevenlabs, eleven_v4, uso autorizzato):
  una traccia per gli ep. 4-5 (request vxeqp4uKaDnbfdhg2GUm), blocchi uniti da pause di 1,6 s.
- Achille «Achille nuovo 1» (HeyGen 9b851842ce54449fb9ff501751ca0271, elevenlabs, eleven_v4): una traccia con le
  cinque chiusure (request 8zQZREgQ75WVbnLvtgLo). Il pacchetto indicava ElevenLabs/eleven_multilingual_v2.
- Tagli: ../strumenti/chicedomani/voci.py, sui word_timestamps di HeyGen (bordi controllati con silencedetect):
  narratore pause >0,6 s → 0,45 s a velocità naturale; Achille pause >0,45 s → 0,35 s e atempo 1,16.
  Testi di voce_testi/ invariati (verificato parola per parola). Tempi di ogni parola in audio/parole.json.
- Durate: S01 12.8 · S02 6.5 · S03 9.8 · S04 10.7 · S05 15.3 s.

## Clip (HeyGen image_to_video, heygen-video-1, 1080p, dalle foto img/ del pacchetto)
- S01 aaa6ccdf626747f484ff01bd4c6b330e (da img/squadra_alba.png, asset 8e31a47d81e244179c298e099748b993, 13 s)
- S04 ced42c55aa294a9ca819f23c06e6cdaa (da img/mani.png, asset 700c076d2d1048bda49b8387dcca18b2, 11 s)

## Avatar
Look «Aki with a lapel microphone» e6d73d660d354b94b0a50c9692b7c34e, webm trasparente 3517fd4f8a55ebb84e53389f2856305e
(audio asset f67e44640dc94f41880fbbf2aeabcf93), solo nella scena 5, in basso a destra con alone chiaro.

## Grafica animata
Le grafiche del pacchetto (PNG composti) sono scomposte in pezzi (../strumenti/chicedomani/pezzi.py → grafica/pezzi/)
e rimesse a tempo sulle parole dal motore ../strumenti/chicedomani/motore.html (regia in serie.py, rendi.mjs a 25 fps).
- S01 clip della squadra all'alba; «NOI / CI SAREMO» su «promessa» e «persone».
- S02 SENZA TESTIMONIANZE (scelta di Achille): la foto della squadra all'alba con lento zoom, «PERCHÉ / CI SARAI?» sbattuto su «perché», il cartiglio «Ci sarò perché…» del pacchetto su «Ecco le loro risposte». Le «risposte» sono la scena 3. I sottopancia NOME COGNOME non sono usati.
- S03 «CI SARÒ» e ogni riga scritta a mano mentre viene pronunciata, «per te» grande per ultimo.
- S04 clip delle mani; NOI compare su «noi» e si accende di un bagliore dorato su «Insieme», le due didascalie si scrivono sulle parole.
- S05 «NOI / CI SAREMO. / Chi c'è domani? Noi.»; avatar in basso a destra.
- S06 cartello finale di serie (2,2 s, senza voce): «CHI C'È / DOMANI?» (dal titolo dell'ep. 3) su fondo verde scuro, con il logo.

## Montato
PDRO_ChiCeDomani_Ep5_Noi_ci_saremo_9x16.mp4: 1080x1920, 25 fps, 57.2 s (fuori da git), copia d'invio _invio.mp4 sotto i 30 MB. Montaggio: ../strumenti/chicedomani/monta.py.
Logo CISL FP Padova Rovigo in alto a sinistra (sotto la banda nelle scene con clip).
Sottotitoli: sottotitoli.srt dai tempi reali delle parole (non impressi).

## Da fare (Achille)
- Musica ed effetti sonori indicati nella regia (bussata, scotch, squilli, timbri, cassa…): non aggiunti.

## Originale su HeyGen
Caricato il 16/10/2026 come asset 521b6ed39ae54f7eb03d50602a014b47: https://resource2.heygen.ai/video/521b6ed39ae54f7eb03d50602a014b47/original.mp4
