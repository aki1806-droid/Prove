# REGISTRO — Fermo Immagine, flash mob 19 ottobre 2026 (16:9)

Data: 10 ottobre 2026 · sessione Claude Code (repo Prove)
Account HeyGen: quello del connettore (come per i video precedenti di oggi)
Avatar: richiesta di Achille «lo stesso avatar del video precedente» → look D
  «Aki with a lapel microphone» (polo verde) e6d73d660d354b94b0a50c9692b7c34e,
  al posto di «Aki in his studio» indicato nel pacchetto. Scene avatar a schermo intero.
Voce: Achille nuovo 1 — KerPEYZvLEWNATg4AARX, eleven_v4 (come gli altri video di oggi; il pacchetto
  indicava eleven_multilingual_v2), 1 generazione per blocco, testi di 01_testi_elevenlabs/ invariati.
  Flusso ElevenLabs DxI8RqEu5Tkk43G3gCfM · ID generazioni in audio/tracce.json
Post: silenceremove (pause > 0,45 s → 0,35 s) + atempo=1.12 + 0,25 s di coda. Parlato 126,7 s.
Clip: rallentate in locale alla durata della voce (minterpolate) o tagliate se più lunghe, senza
  audio → clip_pronte/. In HeyGen playback freeze + mute.
Lotto asset HeyGen: d7e4dd2f966f4b378df9deba95455783 (19 audio + 9 slide + 8 clip) — heygen-asset.json
Scene del montaggio: heygen-scene.json (21 scene, ordine di scene.json)

## Montaggio HeyGen
- Video studio lanciato il 2026-10-10: video_id `240246d037576d93efbc67d94aa8e070` (16:9, 1080p, sottotitoli srt).
- Render completato (138,5 s, 1920x1080, 25 fps). Scaricati: FermoImmagine_16x9_sottotitoli.mp4 (60 MB, non versionato), FermoImmagine_16x9.srt.
- Controllo: un fotogramma per scena (21/21) in ordine, avatar polo verde nelle scene avatar, testo SRT conforme ai testi voce.
- Inviata all'utente la copia compressa FermoImmagine_16x9_compresso.mp4 (27,8 MB, due passate) + SRT.

## Versione 2 (correzioni di Achille, 10 ottobre sera)
- Richieste: «OSS» → «operatori socio sanitari»; invito più diretto a partecipare; adesione tramite il
  modulo https://form.getformly.com/f/sy4MSi (scelta A: un solo modulo, adesione + racconti anonimi;
  il QR v1 portava a https://form.getformly.com/f/5YNRS4).
- Testi riscritti e approvati: B02, B14, B17, B19 (le versioni v1 sono in audio/v1/). Nuove voci eleven_v4,
  stesso post; durate: B02 10,79 · B14 8,72 · B17 12,30 · B19 8,02 s.
- Slide S07 rifatta: 02_slide/S07_adesione_v2.png (grafica/slide_adesione.py), «Aderisci al flash mob»,
  QR nuovo verificato con OpenCV → sy4MSi. Clip B02 riadattata alla nuova durata.
- Lotto asset HeyGen v2: d89d49c7ec234b2089bde5b350f3f1ca; heygen-scene.json aggiornato (6 id sostituiti).
- Montaggio v2 lanciato: video_id `d86c6c55451d086caa26548998e7c6e4`.
- Render v2 completato (150,1 s). Controllo: 21 scene in ordine; QR decodificato dal video (anche dalla copia
  compressa) → https://form.getformly.com/f/sy4MSi; SRT con «operatori sociosanitari», «Partecipa anche tu»,
  «Per partecipare aderisci…», «Abbiamo bisogno di riprenderci la nostra dignità. Partecipate.»
- Inviati all'utente FermoImmagine_16x9_v2_compresso.mp4 (27,8 MB) + FermoImmagine_16x9_v2.srt.
