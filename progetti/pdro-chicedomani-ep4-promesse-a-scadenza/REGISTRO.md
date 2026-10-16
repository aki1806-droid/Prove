# REGISTRO — PDRO «Chi c'è domani» · Ep. 4 · Promesse con la data di scadenza (Reel 9:16)

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
- Durate: S01 13.1 · S02 13.0 · S03 12.1 · S04 6.3 · S05 13.8 s.

## Clip (HeyGen image_to_video, heygen-video-1, 1080p, dalle foto img/ del pacchetto)
- S01 679f4edc1b7149d08971dc3e95368ce6 (da img/scaffale.png, asset bda26644292f40e89919342906583ee6, 13 s)

## Avatar
Look «Aki with a lapel microphone» e6d73d660d354b94b0a50c9692b7c34e, webm trasparente 89be110daf1a19c27ca16ca842b3b29f
(audio asset b3772949193f4905a87ebc7886172d16), solo nella scena 5, in basso a destra con alone chiaro.

## Grafica animata
Le grafiche del pacchetto (PNG composti) sono scomposte in pezzi (../strumenti/chicedomani/pezzi.py → grafica/pezzi/)
e rimesse a tempo sulle parole dal motore ../strumenti/chicedomani/motore.html (regia in serie.py, rendi.mjs a 25 fps).
- S01 clip del supermercato; «DA CONSUMARSI / ENTRO…» su «supermercato» e «promesse».
- S02 il barattolo: zoom sull'etichetta che si compila riga per riga sulle parole, «? ? ?» lampeggia da «entro», il timbro SCADUTA? cade su «scadenza» con un colpo che scuote l'inquadratura.
- S03 la tabella dei valori si compila riga per riga («ascolto», «presenza», «competenza», «squadra»), «NESSUNA» entra per ultimo su «nessuna» e pulsa.
- S04 lo scontrino esce dal basso a scatti come da una stampante, «UNA SCELTA» lampeggia su «impegno».
- S05 «LEGGI / L'ETICHETTA.» sulle parole, il timbro SENZA SCADENZA cade su «scadenza»; avatar in basso a destra.

## Montato
PDRO_ChiCeDomani_Ep4_Promesse_a_scadenza_9x16.mp4: 1080x1920, 25 fps, 58.3 s (fuori da git). Montaggio: ../strumenti/chicedomani/monta.py.
Logo CISL FP Padova Rovigo in alto a sinistra (sotto la banda nelle scene con clip).
Sottotitoli: sottotitoli.srt dai tempi reali delle parole (non impressi).

## Da fare (Achille)
- Musica ed effetti sonori indicati nella regia (bussata, scotch, squilli, timbri, cassa…): non aggiunti.

## Originale su HeyGen
Caricato il 16/10/2026 come asset 68dba3b7136e42df9c8f2a24f6ac1c07: https://resource2.heygen.ai/video/68dba3b7136e42df9c8f2a24f6ac1c07/original.mp4
