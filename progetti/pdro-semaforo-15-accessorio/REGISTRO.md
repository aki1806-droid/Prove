# PDRO · «Tasse al 15% sul salario accessorio 2026 – Il semaforo» (reel 9:16, provinciale)

Pacchetto PDRO_Imposta_15_accessorio_Il_semaforo.zip mandato da Achille il 25/11/2026. 9 scene. Uscita entro il 4/12.

## Scelte di Achille (25/11)
- HeyGen: **Heygen 2, maglione nero** (690f805f4f5b4963af6b680cc3f71bc9) al posto di «Aki with a lapel microphone».
- Voce: **ElevenLabs diretto**, eleven_v4 con i tag. Narratore «CISL FP – Voce calda 40 v4» (JKBPFityf4CgC86y2ep8), nodo
  bTrOOOFvYgml7byASvys, due prese (zw6mxgHb5jOo0zXsMNFk 115,7 s scelta, 1OgoDElEovbjEFuRCtkY in audio/narratore_take2.mp3);
  trascrizione Scribe jck3KarghadGdkORLZNG. Chiusura «Achille nuovo 1» (KerPEYZvLEWNATg4AARX), 6BpHy7oL9L5FoaMxZguR, atempo 1,12.
- Destinatari: **provinciale**. Scena 7: a schermo la mail di rinuncia con l'etichetta «Dipendenti AOUP» e la riga
  «ULSS 6 e ULSS 5: chiedi al tuo ufficio personale o al tuo delegato CISL FP» (voce invariata). Scena 9: frase cambiata in
  «Chiamami, o chiama il tuo delegato di riferimento» (approvata) e scheda «Il tuo delegato» con AOUP, ULSS 6, ULSS 5 e
  fp.padova.rovigo@cisl.it. Toppe in toppe/ (strumenti/semaforo/patch_frame.js), frame originali in grafiche/originali/.
  TESTO_POST.md adattato (originale AOUP in TESTO_POST_originale_AOUP.md).
- Robin: pubblicare appena pronto, dopo l'OK di Achille, sui profili provinciali/AOUP.

## Montaggio (strumenti/oggetti/os.py)
- Tutte le scene GRAFICA (le foto sono già nei frame). Nuovo in os.py: blocchi.json scena["tagli"] = inizio di ogni frame
  (S3 alert su «Attenzione», S5 «MA…» su «Ma c'è un dettaglio», S6 verde/giallo sulle parole, S7 timbro su «definitiva») e
  suoni/silenzio.json per la pausa secca della musica (S5).
- Musica ElevenLabs eleven_music_v2 XYH5a9vPbug6c71t64YC (elettronica 105 BPM, 175 s); clic 9kvJt2EbOBse2pkOB81o, bip iarPlfjn7mFHHvjg5xOF.
- Avatar Heygen 2: audio asset d1fbae618f2e44ff80b5845d36648e4a, video b8ff7ff3962b1289bbee0a2b16a1abe4 (webm 9:16 1080p).

## Versione definitiva (25/11): narratore Luca Ward
- Achille: «la voce narrante voglio sia quella Luca Ward». Narratore rigenerato con Luca Ward (tVdVcJPudubxmTmAw4tE), stessi
  tag, generazione 9trOeIGdLxy4tNwdeIgP (119,4 s), trascrizione j3PLagTEW2KXApRJv4Xa. La versione con la Voce calda è in
  audio/voce_calda/. Tempi di regia ricalcolati con strumenti/semaforo/tempi_regia.py.
- Avatar Heygen 2 rifatto in 16:9 (os.py vuole il webm orizzontale): a3bb0d181a6e83466625e908186bcfd3 (il 9:16
  b8ff7ff3… resta in avatar/avatar_9x16.webm). S09A_av.jpg = S09A (la mail della scheda non va trattata come motto).
- Uscita: 126,2 s, −16,4 LUFS, picco −1,4 dBFS. Asset HeyGen (account 1): https://resource2.heygen.ai/video/8cfa918213dd427d8b0fbcbe0bb2326b/original.mp4
- Robin: OK di Achille il 25/11; post 1216702 uscito alle 13:31 su YouTube https://www.youtube.com/watch?v=bZ4rKeZ83pg, TikTok https://www.tiktok.com/@cislfpaop/video/7712085763822767382, Instagram https://www.instagram.com/reel/DgKiVEiRfBY/ ; Facebook 18051 rifiutato («flagged by Facebook»), come dal 18/11.
