# REGISTRO — PDRO · «Nuovo Bonus mamme 2026» (reel 9:16)

Data: 21 ottobre 2026 · sessione Claude Code (repo Prove). Fonte: scheda INPS 20/10/2026, circolare INPS 106/2026 (testi
voce del pacchetto non modificati; nessun numerale nei testi voce).
Scelte di Achille: video **per il provinciale** (tutti i territori); account HeyGen **del connettore**; voce **HeyGen come
passante**; grafiche **animate come il Decreto PA**; senza sottotitoli impressi.

## Voci (HeyGen create_speech, engine elevenlabs, eleven_v4)
- Luca Ward (e4bd8d8a357f41a99502309874733c16), scene 1-6 in una traccia: request Ztq2EWA7yDoZpBKl2OtN, grezzo 77,1 s
  (../strumenti/bonus/ward-bonus*). Tipo narratore: pause >0,6 s → 0,45 s.
- Achille nuovo 1 (9b851842ce54449fb9ff501751ca0271), chiusura S07: request nymYhSGLVRihwxo913j8, grezzo 16,7 s. Pause
  >0,45 → 0,35, atempo 1,16 (non 1,12 né eleven_multilingual_v2 come dice il pacchetto, che presuppone ElevenLabs diretto).
- Tagli: ../strumenti/bonus/voci.py, 7 blocchi su 7 giusti al primo colpo.

| Scena | Voce | Inizio | Durata |
|---|---|---|---|
| S01 | narratore | 0.0 s | 12.7 s |
| S02 | narratore | 12.7 s | 13.9 s |
| S03 | narratore | 26.6 s | 13.8 s |
| S04 | narratore | 40.4 s | 10.0 s |
| S05 | narratore | 50.4 s | 12.0 s |
| S06 | narratore | 62.4 s | 10.8 s |
| S07 | achille | 73.3 s | 14.6 s |

## Clip e avatar (HeyGen; ID anche in ../strumenti/bonus/ID.md)
- Asset: bm_abbraccio 8d121eb3b9f94d02bc5d104264053504 · bm_domanda 6484c099292349bc80333b10267764f5 · bm_patronato
  c3c10c6f418645dc94f93922e87ef149 · voce S07 26046c4afb744713817504872ca455b3
- image_to_video heygen-video-1 1080p: S01 abbraccio ebd01289a1e443c6b4e50447e433a051 (13 s) · S05 domanda
  bce0fc521b2b4a61be6221a55ec8254f (12 s) · S06 patronato 26ebed91188a4b17bc6606098cd05844 (11 s)
- Avatar «Aki with a lapel microphone» (e6d73d660d354b94b0a50c9692b7c34e), webm con alfa, S07: 108510ceb639f3eb4e934acf11864372;
  labiale verificato (scarto 0 ms). In basso a destra, come nei reel CISL, senza coprire il riquadro dei contatti.

## Grafiche animate
../strumenti/bonus/serie.py (pezzi e regia sulle parole) + ../strumenti/chicedomani/pezzi.py, motore.html, rendi.mjs, monta.py.
- S01/S05/S06 overlay sulle clip con bande nere: chip, titolo BONUS MAMME 2026 in dissolvenza; i tre canali della domanda
  sulle parole; chip PATRONATO INAS CISL con pop. Chip e pillole ritagliate con rrect e sfumatura del fondo ricostruita riga
  per riga (ritocca), così non restano strisce.
- S02 60 € e 12 da lati opposti, il × lampeggia, il totale conta da 0 a 720 (contatore del motore), poi «in un'unica soluzione».
- S03 le tre spunte in sequenza, poi ESCLUSE e le due esclusioni.
- S04 il calendario grande cade con un tonfo, il piccolo entra con un pop (un primo «drop» era troppo vistoso).
- S07 titolo, e al posto del riquadro «Scrivici o passa in sede» (telefono e mail della sede) il riquadro «Scrivici o
  contatta il tuo delegato» con i delegati di AOUP Padova, ULSS 6 Euganea e ULSS 5 Polesana e la mail
  (../strumenti/bonus/grafiche.mjs; ../../metodo/REFERENTI-CISL-FP.md), perché il video è per il provinciale.
Logo CISL FP Padova Rovigo in alto a sinistra.

## Uscita
PDRO_Bonus_mamme_2026_9x16.mp4: 1080x1920, 25 fps, 87,9 s (fuori da git), copia d'invio _invio.mp4 (29 MB).
Testo del post: TESTO_POST.md (del pacchetto, con i delegati per territorio aggiunti al posto di «passa in sede»).
Originale su HeyGen: asset b72b618fcfa94ec5a3c189726ffa2d78 — https://resource2.heygen.ai/video/b72b618fcfa94ec5a3c189726ffa2d78/original.mp4

## Da fare (Achille)
- Revisione prima della pubblicazione; eventuali altri requisiti (reddito, età dei figli) sono nella circolare INPS 106/2026
  e il video non li cita (nota del pacchetto).
- Confermare che le iscritte possano essere indirizzate al patronato INAS CISL per la domanda.
- La voce di Achille dice «passa in sede o scrivici» (testo del pacchetto, non modificato); a schermo ci sono i delegati.
- Musica dolce royalty-free (indicata dal pacchetto): non aggiunta.
- Il montaggio è locale (ffmpeg), non create_video_from_studio come proponeva il pacchetto: stesso metodo dei reel CISL precedenti.

## Versione 2 — 22 ottobre 2026: chiusura con Brenda
Richiesta di Achille: «Rifai il video bonus mamma mettendo come avatar Brenda cisl v4». Restano uguali scene S01-S06, voce di
Luca Ward, grafiche e riquadro dei delegati; cambia solo la chiusura S07.
- Avatar «BRENDA CISL» (photo avatar 3c2cc8ad8ba241389916e5367abc2ccb), motore **Avatar IV** (il «v4»), webm con alfa,
  1080x1440: video 01c41dd8dfeadb45a19f038144980a6a → avatar/avatar.webm. Ritaglio nel reel in avatar/ritaglio.json
  (crop 110,300 870x1140, alto 640, x 560), letto da ../strumenti/chicedomani/monta.py.
- Voce della chiusura: voce clonata «BRENDA CISL» (61f7115a45c74820bbfe68be7d902bfd), HeyGen come passante, eleven_v4,
  request nDTnAU6Iu5fukFZLLWku, grezzo 16,5 s (../strumenti/bonus/brenda-bonus*). Testo del pacchetto invariato. Stesso
  taglio della voce di Achille (pause >0,45 → 0,35, atempo 1,16): S07 dura 14,4 s invece di 14,6. Asset voce
  25aa981bcd0947e2a3fbccad655924ff. Grafica S07 rifatta sui tempi nuovi.
- Verifiche: labiale 20 ms, voce nel reel a 0 ms, file integro, foglio di contatto della chiusura (Brenda in basso a destra,
  sotto il riquadro dei delegati, senza coprirlo).
- Uscita: PDRO_Bonus_mamme_2026_9x16.mp4 87,6 s (38 MB), copia d'invio _invio.mp4 (28,5 MB). Originale su HeyGen: asset
  22b9d6857b944498acf0a36ef8dd5640 — https://resource2.heygen.ai/video/22b9d6857b944498acf0a36ef8dd5640/original.mp4
- La versione 1 (chiusura con Achille, asset b72b618fcfa94ec5a3c189726ffa2d78) resta su HeyGen.
- Da vedere (Achille): la voce dice «passa in sede o scrivici» e «se sei una nostra iscritta» — vanno bene anche in bocca a
  Brenda (ULSS 6)?
