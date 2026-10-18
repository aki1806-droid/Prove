# REGISTRO — PDRO «Immagina quella mattina – corso concorso OSS» (Reel 9:16)

Data: 18 ottobre 2026 · sessione Claude Code (repo Prove). Account HeyGen: quello del connettore.
Scelte di Achille: voce di Achille con **HeyGen come passante**; stile **grafiche del pacchetto animate**
(stesso metodo della serie «Chi c'è domani»).

## Modifica al testo (autorizzata da Achille il 18/10/2026)
«Oltre trecento colleghi» → **«Oltre cinquecento colleghi»** (voce_testi/04, blocchi.json, SCRIPT.md); a schermo 500
(contatore), nei post «oltre 500». Il pacchetto si basava su 312 iscritti.

## Voce
- Narratore «Luca Ward» (HeyGen e4bd8d8a357f41a99502309874733c16, elevenlabs, eleven_v4): una traccia con i blocchi
  dei due reel dei corsi (request exIBbpPvspYV6iWSl1Nn), pause di 1,6 s tra i blocchi.
- Achille «Achille nuovo 1» (HeyGen 9b851842ce54449fb9ff501751ca0271, elevenlabs, eleven_v4): una traccia con le due
  chiusure (request 3ZHtz6cAWWIu8Unbf7sL). Il pacchetto indicava ElevenLabs/eleven_multilingual_v2.
- Tagli: ../strumenti/corsi/voci.py (stessi strumenti della serie): narratore pause >0,6 s → 0,45 s; Achille pause
  >0,45 s → 0,35 s e atempo 1,16. Testi di voce_testi/ verificati parola per parola. Tempi in audio/parole.json.
- Durate: S01 14.7 · S02 10.8 · S03 13.1 · S04 12.4 · S05 9.9 · S06 15.2 s.

## Clip (HeyGen image_to_video, heygen-video-1, 1080p, dalle foto img/)
- S01 f853cb6bc7e14af5a27c70fd0e0a71a1 (da img/oss_divisa.png, asset 4b3d0527253b48a49bc5a42eacc6f472, 15 s)
- S03 acad79ea7394424a9afc145338b05fb9 (da img/oss_esame.png, asset e0e8db4c3aa24324a82c379bd7f70dca, 13 s)
- S05 4ca791db9e514e25a09f7eb2becf727f (da img/oss_bus.png, asset 939dd2b94f9047cea7fc245c14bc6763, 10 s)

## Avatar
Look «Aki with a lapel microphone» e6d73d660d354b94b0a50c9692b7c34e, webm trasparente c2e842e7e837bc6182895f3076efbf0c (audio asset 69f8b4c39c88405daa101e68a323158a),
solo nella scena 6, in basso a destra.

## Grafica animata
Pezzi ritagliati dalle grafiche (SERIE=../strumenti/corsi/serie.py ../strumenti/chicedomani/pezzi.py), regia in
../strumenti/corsi/serie.py, motore ../strumenti/chicedomani/motore.html, montaggio ../strumenti/chicedomani/monta.py.
- S01 clip della divisa all'alba; bande, «IMMAGINA» in dissolvenza lenta, «quella mattina.» scritto. Pausa di un secondo dopo «su questa immagine» come chiede la regia.
- S02 «IL CONCORSO / È ALLE PORTE», il flip clock gira a vuoto con cifre che cambiano e si ferma su «?? -- --» su «prova»; i chip Quiz, Casi pratici, Colloquio sulle parole; la frase finale scritta a mano.
- S03 clip della sala d'esame; «Non la fortuna.» si scrive e viene barrato in rosso su «fortuna», «LA PREPARAZIONE.» entra in oro su «chi» con un bagliore.
- S04 «OLTRE» e il numero che conta da 0 a **500** (disegnato dal motore al posto del 300 del pacchetto), i puntini che si accendono a cascata, «colleghi si stanno / già preparando.», «E tu?» per ultimo.
- S05 clip del bus; «10 minuti oggi. / 10 minuti domani.» sulle parole, la card del quiz sale dal basso, la risposta B è grigia e si illumina in verde con la spunta su «quiz».
- S06 «QUELLA MATTINA / TI ASPETTA.» a blocchi, «Comincia oggi.» su «comincia»; riquadro arancio del primo commento fermo; avatar in basso a destra.

## Montato
PDRO_Immagina_quella_mattina_corso_OSS_9x16.mp4: 1080x1920, 25 fps, 76.2 s (fuori da git), copia d’invio _invio.mp4 sotto i 30 MB.
Logo in alto a sinistra (sotto la banda nelle scene con clip). Sottotitoli: sottotitoli.srt (non impressi).

## Originale su HeyGen
Caricato il 18/10/2026 come asset 65a1497caf78484e9afa9f145482a93d: https://resource2.heygen.ai/video/65a1497caf78484e9afa9f145482a93d/original.mp4

## Da verificare prima di pubblicare
- La domanda del quiz (scena 5) è un esempio didattico: farla verificare a un docente del corso (Achille: da verificare dopo).
- Nessuna data del concorso a schermo: se è nota si può aggiungere nella scena 2.
- Musica ed effetti sonori della regia: non aggiunti.
