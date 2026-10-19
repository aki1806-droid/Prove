# REGISTRO — YouTube Achille Pagliaro · «Leggo per te: Valori guida» (16:9)

Data: 19 ottobre 2026 · sessione Claude Code (repo Prove). Account HeyGen: quello del connettore. Uscita: sab 5/12, 18:00.
Scelte di Achille: voce **HeyGen come passante**; immagini **con HeyGen**; look «Un altro», poi **«19 Microfono a clip»**
(e6d73d660d354b94b0a50c9692b7c34e).

Il pacchetto ha 22 parti, ma le parti 13/14 e 20/21 spezzavano una frase a metà: sono scene avatar consecutive e ognuna delle due coppie è un blocco solo, senza pausa in mezzo (scene.json, campo «parti»): 20 scene.
Originale ricodificato a CRF 20 (a CRF 19 era 222 MB, sopra il limite di 200 MB degli asset HeyGen).

## Voce
Achille nuovo 1 (9b851842ce54449fb9ff501751ca0271), HeyGen create_speech, engine elevenlabs, eleven_v4, testi del pacchetto
(testi_voce/) senza modifiche, un blocco per scena unito da <break time="1.6s"/>; grezzi e tempi in ../strumenti/yt/ (ID in
../strumenti/yt/ID-lotto3.md); tagli con ../strumenti/yt/voci3.py (pause >0,45 s → 0,35 s, atempo 1,16): tutti i blocchi giusti
al primo colpo. Voce montata: 325.4 s.

## Avatar
Le sole scene avatar in fila (audio/voce-avatar.mp3, asset bb7ccf829bc44adaad6b5f89c1353900) → create_video_from_avatar 16:9 1080p: video 994ea36cbb4785be56f52260d03f9fb4.
Tagliato scena per scena con audio/tempi-avatar.json; labiale verificato per correlazione audio: scarto costante 23 ms.

## B-roll (HeyGen text_to_video, heygen-video-1, 1080p, 16:9)
HeyGen non genera immagini da un testo: un clip text_to_video per prompt di PROMPT_IMMAGINI.md, da cui si è preso un fotogramma
1920x1080 (b-roll_16x9/broll_0N.jpg) usato con lo zoom lento come negli altri video.
- broll_01: 3ddabc00cefb47d380948e455fd2882f
- broll_02: d522449f36d24c8bb9e4c268595ab4c3
- broll_03: bf35b3c382914feba8cf1bbe0b05da36
- broll_04: 202adaae57a74090b786242045aa4cc5
- broll_05: b508896ad0be4943bb666fa2d4b519cb
- broll_06: 45c356c2338947c3b0362c10a164d10b

## Montaggio (../strumenti/yt/monta.py)
Copertina del pacchetto 3 s muta → scene → chiusura 10 s muta (../strumenti/yt/chiusura.mjs). Avatar a inquadratura piena,
b-roll a schermo intero, mai sopra l'avatar; tagli netti. Verificato con foglio di fotogrammi.

| Scena | Contenuto | Voce |
|---|---|---|
| S01 | avatar | 6.6 s |
| S02 | b-roll broll_01.jpg | 24.5 s |
| S03 | avatar | 14.9 s |
| S04 | b-roll broll_02.jpg | 15.2 s |
| S05 | avatar | 17.2 s |
| S06 | b-roll broll_03.jpg | 18.2 s |
| S07 | avatar | 15.6 s |
| S08 | b-roll broll_04.jpg | 9.2 s |
| S09 | avatar | 16.0 s |
| S10 | b-roll broll_05.jpg | 15.7 s |
| S11 | avatar | 15.4 s |
| S12 | b-roll broll_06.jpg | 14.0 s |
| S13 | avatar | 21.3 s |
| S14 | avatar | 18.7 s |
| S15 | avatar | 21.9 s |
| S16 | avatar | 20.4 s |
| S17 | avatar | 17.1 s |
| S18 | avatar | 15.3 s |
| S19 | avatar | 22.2 s |
| S20 | avatar | 5.9 s |

YT17_Leggo_per_te_Valori_guida.mp4: 1920x1080, 25 fps, 338.4 s (fuori da git); copia d'invio YT17_Leggo_per_te_Valori_guida_invio.mp4 720p (5:38), sotto i 30 MB.
Sottotitoli: sottotitoli.srt (dalla voce, spostati di 3 s per la copertina) da caricare su YouTube.

## Originale su HeyGen
Caricato il 19/10/2026 come asset a36d2c1602c34a90851c54cbdee6a64c: https://resource2.heygen.ai/video/a36d2c1602c34a90851c54cbdee6a64c/original.mp4

## Da fare (Achille)
- Caricare su YouTube con sottotitoli.srt e la copertina del pacchetto come miniatura; schermata finale sugli ultimi 10 s.
- Estratto TikTok di 60 s: lo ricava Achille, come da ISTRUZIONI.
