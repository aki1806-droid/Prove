# REGISTRO — PDRO · Halloween 2026: «Jack O'Lantern – versione sindacale» e «I fantasmi del cedolino» (reel 9:16)

Data: 31 ottobre 2026 · sessione Claude Code (repo Prove). Pacchetti PDRO_Halloween_Jack_O_Lantern e
PDRO_Halloween_Fantasmi_del_cedolino (questa cartella e ../pdro-halloween-fantasmi). Testi del pacchetto non modificati.
Scelte di Achille: voci **HeyGen come passante** (eleven_v4), video **solo AOUP**, account HeyGen di Achille
(aki.pagliaro@gmail.com) **via chiave API** (connettore senza crediti), programmazione su **Robin dopo il suo OK**.

## Voci (../strumenti/halloween/voci.py)
Luca Ward e4bd8d8a357f41a99502309874733c16 (scene 1-6 in una traccia), Achille nuovo 1 9b851842ce54449fb9ff501751ca0271
(chiusura S07); tagli come nel «Volantino scomparso» (narratore pause >0,6 → 0,45 s; Achille >0,45 → 0,35 e atempo 1,16).
- Jack: request Mz8uW8GoiOgm6Iu7iyFQ (Ward, 91,1 s) e j8CBHRTiesScf8pUa3Zo (Achille, 19,5 s); 7 blocchi su 7, parole uguali.
  S01 11,8 · S02 15,0 · S03 14,4 · S04 14,0 · S05 13,2 · S06 18,6 · S07 16,8 s = 103,9 s.
- Fantasmi: request gJOOMhO8NKi7pOwqm0mp (Ward, 79,3 s) e 3DWwUbmxLoxwBHvKcUbM (Achille, 14,4 s); 7 su 7.
  S01 12,2 · S02 11,6 · S03 11,9 · S04 14,2 · S05 12,8 · S06 12,7 · S07 12,4 s = 87,7 s.

## Avatar (../strumenti/halloween/avatar.py)
«Aki with a lapel microphone» e6d73d660d354b94b0a50c9692b7c34e via API, webm con alfa sulla voce di S07, in basso a destra
solo nella chiusura: Jack video 5c0e14b5bf658794f84e8d3501b7fa99, Fantasmi 2b8f4ef2a549e115460f96793d2ff0e4. Labiale 0 ms.

## Clip (Higgsfield Kling 3.0 std, senza audio, 10 s, 716x1280, dalle illustrazioni del pacchetto)
Jack S01 hw_jack 83493467-e1cd-44b0-9eba-13e779472c84 · S04 hw_cancelli 8b9222b2-c9c1-4617-8e3a-5148a90a38fc ·
S05 hw_lanterna 44001b8f-3514-4be4-b8db-4ed34618a831. Fantasmi S01 hw_cedolino aee8bd30-d727-4bbc-8a6e-135bf95c36fc ·
S06 hw_ufficio 2c3c9fab-93e3-4b10-9169-c7f31fe7e952. 62,5 crediti Higgsfield.

## Grafiche animate (../strumenti/halloween/serie.py, motore ../strumenti/chicedomani/)
Pezzi ritagliati dalle grafiche del pacchetto e rimessi sulle parole. Jack: titolo a colpi, la moneta col diavoletto che
oscilla, PROMESSE, MONETE / E TASCHE, gli annunci uno alla volta e il timbro FONTE: BOH con l'urto, i due CHIUSO, LUI. con un
bagliore, le cinque differenze a coppie, le luci e i contatti. Fantasmi: titolo che cade, per ogni fantasma la pastiglia, il
fantasma che ondeggia, il nome, la descrizione e il «come si scaccia», «Niente aglio. Niente acqua santa.», il dolcetto e i
contatti. Logo CISL FP Padova Rovigo in alto a sinistra.
**Solo AOUP:** dal riquadro dei contatti dei Fantasmi tolta la sede di Rovigo (resta Padova · Via del Carmine 3); l'originale
in ../pdro-halloween-fantasmi/grafiche/originali/. I contatti (Achille e Giovanna) sono già quelli AOUP.
Un primo montaggio di Jack aveva S05-S07 tronche (render interrotto e poi riusato): rifatte e verificate durata per durata.

## Suoni (../strumenti/halloween/suoni.py, catalogo HeyGen royalty-free)
Il catalogo non ha ululati, risate da strega, pipistrelli, monete o versi da zombie: vento, campanelle, colpi, tonfi, bussate,
passi, ding, tic tac, clic della lampada, whoosh, squittio, brontolio basso, sulle parole della regia. Musica bassa: carillon
gotico (39fec2ee) per Jack, «Halloween Mischief» pizzicati (685f9059) per i Fantasmi. Uscite −16 LUFS, picco ≤ −0,6 dBFS.

## Uscite (1080x1920, 25 fps, integre; fuori da git; copie d'invio 28 MB mandate in chat)
| Video | Durata | Asset HeyGen |
|---|---|---|
| PDRO_Halloween_Jack_O_Lantern_9x16 | 1:44 | 6a9003fc705d4aab93a68c17b462774e |
| PDRO_Halloween_Fantasmi_del_cedolino_9x16 | 1:28 | 2d7b7ed72f0a4fb49bcd40f12ce47de5 |
(https://resource2.heygen.ai/video/<asset>/original.mp4). Portafoglio API: 17,12 → 15,60 $.

## Diverso dal pacchetto
- Montaggio locale (motore della serie PDRO), non create_video_from_studio.
- Voce di Achille via HeyGen passante eleven_v4 con atempo 1,16, non ElevenLabs eleven_multilingual_v2 con 1,12.

## Da fare
- OK di Achille → Robin (pubblicazione entro il 31/10-1/11). Nel post dei Fantasmi togliere la riga di Rovigo (solo AOUP).
