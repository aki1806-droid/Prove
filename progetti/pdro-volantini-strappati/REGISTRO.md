# REGISTRO — PDRO · «Il caso del volantino scomparso» (reel 9:16)

Data: 27 ottobre 2026 · sessione Claude Code (repo Prove). Testi del pacchetto non modificati (nessun numerale parlato).
Scelte di Achille: video **solo per l'AOUP Padova** (contatti Achille e Giovanna, come nel pacchetto); voci **HeyGen come
passante** (eleven_v4); account HeyGen di Achille (aki.pagliaro@gmail.com) **via API** con la sua chiave, perché i crediti del
connettore erano finiti (2 rimasti); clip con **Higgsfield video**; grafiche **animate con gli effetti sonori** del pacchetto,
senza musica di fondo.

## Voci (API HeyGen, ../strumenti/heygen_api.py, POST /v3/voices/speech, elevenlabs eleven_v4)
- Luca Ward (e4bd8d8a357f41a99502309874733c16), scene 1-8 in una traccia: request Mb6JYcvSxsPoO8rjFcfy, grezzo 122,1 s.
- Achille nuovo 1 (9b851842ce54449fb9ff501751ca0271), chiusura S09: request 7co83yQXgbaoflcpMRKr, grezzo 19,7 s.
- Tagli ../strumenti/volantini/voci.py (narratore pause >0,6 → 0,45 s; Achille >0,45 → 0,35 e atempo 1,16): 9 blocchi su 9,
  parole uguali ai conteggi del pacchetto. In S08 una pausa di 0,8 s dopo «foglio,» come chiede la regia.
- S01 13,9 · S02 15,4 · S03 10,8 · S04 11,0 · S05 14,5 · S06 17,9 · S07 15,0 · S08 17,1 · S09 16,8 s — totale 132,4 s.
- Costo: 0,30 $ del portafoglio API (47,70 → 47,40).

## Avatar
«Aki with a lapel microphone» (e6d73d660d354b94b0a50c9692b7c34e) via API, webm con alfa sulla voce di S09 (asset audio
b53e5486cd0c40f69c4627880e9f8d8c): video 8230f0a85bf739915c391518a7d65a66, 1920x1072. In basso a destra solo nella chiusura.
Labiale verificato: 0 ms.

## Clip (Higgsfield Kling 3.0 std, senza audio, 9:16, 716x1280, dalle foto del pacchetto)
S01 vs_strappo job cfbbd3a6-d8f6-4937-90e0-374fd70b8eb1 (12 s) · S05 vs_bacheca job 913f4fcd-f911-48c4-9406-fe649897d4e4
(14 s) · S08 vs_riaffiggo job c6a4651a-abce-4e97-a8d4-75862d90cc9f (15 s). Rallentate quanto serve per coprire la voce.

## Grafiche animate (../strumenti/volantini/serie.py, motore ../strumenti/chicedomani/)
- S01 FILE N° 001 scritto, il titolo a colpi su «testimone», «colpevole», «bersaglio».
- S02 il fascicolo si compila voce per voce, la frase a mano su «Davanti», timbro IDEE: NESSUNA su «strappa» con urto.
- S03 PAU / RA? a colpi e tremanti fino a «Vigliaccheria», poi le scritte sotto.
- S04 manifesto CERCASI pezzo per pezzo, il punto interrogativo che oscilla, «Finora nessuno…» scritto.
- S05 LA BACHECA / È DI TUTTI. · S06 le quattro schede di legge una alla volta · S07 timbro SEGNALATO con urto.
- S08 «Non un'idea.» con un bagliore · S09 slogan, riquadro dei contatti subito (pulsa su «chiamaci»), avatar.
Logo CISL FP Padova Rovigo in alto a sinistra (sotto la banda nelle scene con clip).

## Effetti sonori (catalogo HeyGen, royalty-free, ../strumenti/volantini/suoni.py)
Tastiera meccanica sul FILE N° 001 (il catalogo non ha una macchina da scrivere vera), colpi sul titolo, tonfo e boing sul
timbro di S02, due strappi su PAU / RA?, due secondi e mezzo di western (fischio e chitarra) all'inizio di S04 e i grilli su
«Finora», un tonfo per ogni scheda di legge, tonfo sul timbro SEGNALATO e colpo su «Il caso è aperto», tre clic di puntine
in S08. Nessuna musica di fondo. Volume: −21 LUFS integrato, picco −0,4 dB.

## Uscita
PDRO_Il_caso_del_volantino_scomparso_9x16.mp4: 1080x1920, 25 fps, 132,4 s, 43 MB (fuori da git); copia d'invio 28 MB mandata
in chat. Verificati: file integro, foglio di contatto, labiale, volumi. Originale su HeyGen: asset 0a097c5329234288aed7d93f41bc9f41 —
https://resource2.heygen.ai/video/0a097c5329234288aed7d93f41bc9f41/original.mp4
Testo del post: TESTO_POST.md del pacchetto (invariato).

## Diverso dal pacchetto
- Montaggio locale (motore della serie) e non create_video_from_studio, come gli altri reel PDRO.
- Voce di Achille via HeyGen passante eleven_v4 con atempo 1,16, non ElevenLabs eleven_multilingual_v2 con 1,12.

## Da fare (Achille)
- Far verificare i riferimenti normativi all'ufficio legale prima di pubblicare (art. 25 L. 300/1970, condotta
  antisindacale, art. 392 c.p.), come chiede il pacchetto.
