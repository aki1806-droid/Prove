# REGISTRO — YouTube Achille Pagliaro · «Quindici minuti al giorno per sé» (16:9)

Data: 19 ottobre 2026 · sessione Claude Code (repo Prove). Account HeyGen: quello del connettore. Uscita: sab 12/12, 18:00.
Scelte di Achille: voce **HeyGen come passante**; immagini **con HeyGen**; look «Un altro», poi **«19 Microfono a clip»**
(e6d73d660d354b94b0a50c9692b7c34e).

## Voce
Achille nuovo 1 (9b851842ce54449fb9ff501751ca0271), HeyGen create_speech, engine elevenlabs, eleven_v4, testi del pacchetto
(testi_voce/) senza modifiche, un blocco per scena unito da <break time="1.6s"/>; grezzi e tempi in ../strumenti/yt/ (ID in
../strumenti/yt/ID-lotto3.md); tagli con ../strumenti/yt/voci3.py (pause >0,45 s → 0,35 s, atempo 1,16): tutti i blocchi giusti
al primo colpo. Voce montata: 72.7 s.

## Avatar
Le sole scene avatar in fila (audio/voce-avatar.mp3, asset 4bb7d4a76f7c4f3ebf6e35576c66f2c8) → create_video_from_avatar 16:9 1080p: video e0d90399a9f5c87710401797724a5295.
Tagliato scena per scena con audio/tempi-avatar.json; labiale verificato per correlazione audio: scarto costante 23 ms.

## B-roll (HeyGen text_to_video, heygen-video-1, 1080p, 16:9)
HeyGen non genera immagini da un testo: un clip text_to_video per prompt di PROMPT_IMMAGINI.md, da cui si è preso un fotogramma
1920x1080 (b-roll_16x9/broll_0N.jpg) usato con lo zoom lento come negli altri video.
- broll_01: b26b196dd10441eaa2c8dff7cc2798f0
- broll_02: 1204e70f8d6c43c48154117ee3ed2470
- broll_03: 7ca2c3920fa94626aab93582bd19691f

## Montaggio (../strumenti/yt/monta.py)
Copertina del pacchetto 3 s muta → scene → chiusura 10 s muta (../strumenti/yt/chiusura.mjs). Avatar a inquadratura piena,
b-roll a schermo intero, mai sopra l'avatar; tagli netti. Verificato con foglio di fotogrammi.

| Scena | Contenuto | Voce |
|---|---|---|
| S01 | avatar | 7.2 s |
| S02 | b-roll broll_01.jpg | 11.7 s |
| S03 | avatar | 9.3 s |
| S04 | b-roll broll_02.jpg | 14.2 s |
| S05 | avatar | 11.1 s |
| S06 | b-roll broll_03.jpg | 12.2 s |
| S07 | avatar | 7.0 s |

YT18_Quindici_minuti_al_giorno.mp4: 1920x1080, 25 fps, 85.7 s (fuori da git); copia d'invio YT18_Quindici_minuti_al_giorno_invio.mp4 1080p, sotto i 30 MB.
Sottotitoli: sottotitoli.srt (dalla voce, spostati di 3 s per la copertina) da caricare su YouTube.

## Originale su HeyGen
Caricato il 19/10/2026 come asset b34c2c6cf12541ca900b39b93660e526: https://resource2.heygen.ai/video/b34c2c6cf12541ca900b39b93660e526/original.mp4

## Da fare (Achille)
- Caricare su YouTube con sottotitoli.srt e la copertina del pacchetto come miniatura; schermata finale sugli ultimi 10 s.
- Estratto TikTok di 60 s: lo ricava Achille, come da ISTRUZIONI.
