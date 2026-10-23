# REGISTRO — PDRO · «Aggiornamento pagamenti ottobre 2026» (reel 9:16)

Data: 23 ottobre 2026 · sessione Claude Code (repo Prove). Testi voce del pacchetto non modificati (nessun numerale).
Scelte di Achille: video **solo per l'AOUP Padova**; voce **HeyGen come passante**; chiusura con **Achille**
(«19 Microfono a clip»); account HeyGen **del connettore**; tabellone **animato**.

## Voci (HeyGen create_speech, engine elevenlabs, eleven_v4)
- Luca Ward, scene 1-5 in una traccia: request VPM3BNYR6k3Op40VJuYw, grezzo 67,0 s (../strumenti/pagamenti/ward-pagamenti*).
  Narratore: pause >0,6 s → 0,45 s.
- Achille nuovo 1, chiusura S06: request hfAkuIV4r26KTgasZMSd, grezzo 17,2 s. Pause >0,45 → 0,35, atempo 1,16 (non
  eleven_multilingual_v2 e 1,12 come dice il pacchetto, che presuppone ElevenLabs diretto).
- Tagli: ../strumenti/pagamenti/voci.py, 6 blocchi su 6 giusti al primo colpo.

| Scena | Voce | Durata |
|---|---|---|
| S01 | narratore | 11,4 s |
| S02 | narratore | 8,8 s |
| S03 | narratore | 16,2 s |
| S04 | narratore | 14,1 s |
| S05 | narratore | 12,7 s |
| S06 | achille | 14,8 s |

## Clip e avatar (ID anche in ../strumenti/pagamenti/ID.md)
- image_to_video heygen-video-1 1080p: S01 infermiera col cedolino 6b38cb1fd0b945979567188e806d6f7f (12 s) · S05 delegata al
  telefono 3a7f131a47e1487e93eac5f916ad25ba (13 s).
- Avatar «Aki with a lapel microphone» (e6d73d660d354b94b0a50c9692b7c34e), webm con alfa: dcc8b46954051f50d8d853a3eef1a050;
  labiale 0 ms. In basso a destra, sotto il riquadro dei contatti.

## Grafiche
- S01/S05 overlay sulle clip (../strumenti/pagamenti/serie.py + motore della serie): chip, «E IL / CONGUAGLIO» a colpi su
  «conguaglio», il punto interrogativo entra su «c'è» e oscilla; «NIENTE / FUGHE IN AVANTI» sulle parole, la frase a mano
  su «Quando avremo date certe».
- S02-S04 tabellone «partenze» rifatto in HTML (../strumenti/pagamenti/tabellone.mjs) per far girare le lettere come
  palette: all'inizio gira tutto il tabellone; S02 riga 1 accesa, «ottobre: non pagato» lampeggia, «novembre: atteso»
  arancio su «novembre»; S03 riga 2 accesa sugli arretrati, bollino arancio su «duemilaventicinque», timbro giallo
  «Impegno preso · conferma in arrivo» sull'ultima frase; S04 righe 1-2 spente, riga 3 accesa su «contratto»,
  «novembre: no» rosso su «non saranno pagati».
- S06 chiusura: al posto del riquadro arancio con il telefono della sede, lo stesso riquadro con i delegati CISL FP
  dell'AOUP (Achille 391 127 1018, Giovanna 389 928 5301) e la mail (../strumenti/pagamenti/grafiche.mjs), perché il video
  è solo per l'AOUP.
Logo CISL FP Padova Rovigo in alto a sinistra. Nessun sottotitolo impresso, nessuna musica.

## Uscita
PDRO_Aggiornamento_pagamenti_ottobre_2026_9x16.mp4: 1080x1920, 25 fps, 78,2 s, 26 MB (fuori da git; sotto i 30 MB, è anche
la copia d'invio). Originale su HeyGen: asset 4c5dbda0145c41ddab85a8795b3d45b5 —
https://resource2.heygen.ai/video/4c5dbda0145c41ddab85a8795b3d45b5/original.mp4
Testo del post: TESTO_POST.md (contatti ridotti all'AOUP: delegati, mail, sede di Padova).

## Diverso dal pacchetto
- Montaggio locale (ffmpeg) e non create_video_from_studio, come gli altri reel PDRO.
- Nessun effetto sonoro di palette: niente audio aggiunto oltre alla voce.
- Durata 78 s invece di ~85: la voce di Ward con pause accorciate è più rapida della stima.

## Da fare (Achille)
- Prima di pubblicare: l'impegno per novembre è ancora «atteso»? Se arriva conferma o smentita vanno cambiati S03 e il
  tabellone (lo dice il pacchetto).
- La voce dice «scrivici o passa in sede» (testo del pacchetto); a schermo ci sono i delegati AOUP.
