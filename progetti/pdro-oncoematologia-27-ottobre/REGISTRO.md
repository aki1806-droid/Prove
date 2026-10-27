# REGISTRO — PDRO · «Oncoematologia pediatrica – il confronto del 27 ottobre» (reel 9:16)

Data: 27 ottobre 2026 · sessione Claude Code (repo Prove).
Scelte di Achille: video **solo per l'AOUP Padova** (contatti Achille e Giovanna come nel pacchetto); voci **HeyGen come
passante** eleven_v4 **via API** (chiave da rimettere come HEYGEN_API_KEY: la sessione è ripartita senza); clip con
**Higgsfield**; grafiche **animate, con musica** (sobria; pianoforte nelle scene 6 e 8, come chiede il pacchetto).

## Modifica al testo (autorizzata da Achille il 27/10/2026)
«OSS» detto a voce → **«operatori socio sanitari»** in S05 e S08 (voce_testi/05 e 08; originali in voce_testi/originali/).
A schermo resta come nel pacchetto.

## Voci (API HeyGen, ../strumenti/heygen_api.py, elevenlabs eleven_v4)
- Luca Ward (e4bd8d8a357f41a99502309874733c16), scene 1-8 in una traccia: request en8UTmPt06ho4Dg6ivKU, grezzo 133,9 s.
- Achille nuovo 1 (9b851842ce54449fb9ff501751ca0271), chiusura S09: request edI9N4tc7ETYlqUTl6V2, grezzo 17,0 s.
- Tagli ../strumenti/oncoematologia27/voci.py (narratore >0,6 → 0,45 s; Achille >0,45 → 0,35 e atempo 1,16): 9 blocchi su 9.
- S01 16,1 · S02 13,8 · S03 19,4 · S04 10,6 · S05 19,8 · S06 16,0 · S07 13,1 · S08 18,3 · S09 14,5 s — totale 141,6 s.

## Avatar
«Aki with a lapel microphone» (e6d73d660d354b94b0a50c9692b7c34e) via API, webm con alfa sulla voce di S09 (asset audio
bba091d4373645e283f385594b71c43e): video ef61de55b8ecc48827951d158b56ba7c. In basso a destra solo nella chiusura. Labiale 0 ms.

## Clip (Higgsfield Kling 3.0 std, senza audio, 9:16, 716x1280, dalle foto del pacchetto; nessun paziente, nessun bambino)
S01 tavolo job 6b49f9bd-82b0-4956-9b71-eb550a4cd333 (14 s) · S04 verifiche 2f77c055-47c8-4c12-ad32-91bfa4de5d5b (11 s) ·
S06 supporto 4566eb71-d9fa-4cdd-8ec8-5888a82ea1b6 (15 s) · S08 squadra fc23bce9-1a31-4268-93b7-6ad1377a0ceb (15 s).

## Grafiche animate (../strumenti/oncoematologia27/serie.py, motore ../strumenti/chicedomani/)
- S01 data e titolo in dissolvenza · S02 COLPEVOLI e ALLARMISMI barrati in rosso uno alla volta (ripuliti dalla barratura
  del pacchetto, fondo sfocato dove c'erano le scritte), poi RISPOSTE, TRASPARENZA, SOLUZIONI a colpi · S03 le tre card
  salgono · S04 VERIFICHE / FINO IN FONDO · S05 si accende la prima richiesta, bollino IN ATTIVAZIONE su «attivando» ·
  S06 «Chi ha dato di più va riconosciuto» · S07 si accendono la seconda, la terza e la quarta, DA GARANTIRE su «garantire» ·
  S08 GRAZIE con un bagliore e le quattro righe a mano · S09 riquadro dei contatti subito, poi lo slogan sulle parole.
Logo CISL FP Padova Rovigo in alto a sinistra.

## Musica (catalogo HeyGen, royalty-free, ../strumenti/oncoematologia27/musica.py)
Sottofondo sobrio documentario (6d5b5f31564d489babbb787bd4a11f5e) nelle scene 1-5, pianoforte caldo che cresce
(2c2319a469bc473ebe6e2143b89ee311) dalla scena 6 alla fine, con dissolvenze. 14-15 dB sotto la voce; montato −21 LUFS.

## Uscita
PDRO_Oncoematologia_confronto_27_ottobre_9x16.mp4: 1080x1920, 25 fps, 141,6 s, 42 MB (fuori da git); copia d'invio 28 MB
mandata in chat. Verificati: file integro, foglio di contatto, labiale, volumi. Originale su HeyGen: asset
686de12ebc824273a3cc722c414ce675 — https://resource2.heygen.ai/video/686de12ebc824273a3cc722c414ce675/original.mp4
Portafoglio API: 38,12 $ prima del video (era 46,12 $ dopo il volantino: 8 $ spesi altrove), 37.23 $ dopo.

## Diverso dal pacchetto
- Montaggio locale (motore della serie) e non create_video_from_studio; voce di Achille HeyGen passante eleven_v4 con
  atempo 1,16, non eleven_multilingual_v2 con 1,12.

## Da verificare (pacchetto)
- Eventuali novità della Direzione dopo il 27/10 prima di pubblicare.
