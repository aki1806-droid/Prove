# REGISTRO — YouTube Achille Pagliaro · «Due nonni, il mare e la terra» (16:9)

Data: 18 ottobre 2026 · sessione Claude Code (repo Prove). Account HeyGen: quello del connettore. Uscita: sabato 7/11, 18:00.
Scelte di Achille: voce **HeyGen come passante**; look **27** «Aki in light blue shirt» (3a54e8876c9341f4b261deae288adbce,
foto-avatar; «Un altro» rispetto al 26 dei video 10-12); b-roll come gli altri YouTube: foto con lento zoom.

## Voce
Achille nuovo 1 (9b851842ce54449fb9ff501751ca0271), HeyGen create_speech, engine elevenlabs, eleven_v4, testi del COPIONE senza
modifiche, una traccia (1.833 caratteri, grezzo 121,9 s, ../strumenti/yt/achille-yt09*); tagli con ../strumenti/yt/voci2.py
(pause >0,45 s → 0,35 s, atempo 1,16): tutti i blocchi giusti al primo colpo.

## Avatar
Le sole scene AVATAR in fila (audio/voce-avatar.mp3, 59.9 s, asset 1592f982cde948c790ebb0ce028acba9) →
create_video_from_avatar 16:9 1080p mp4: video ed8af205f7ba09196732c675f1a994d9. Labiale verificato: scarto costante 23 ms.

## Montaggio (../strumenti/yt/monta.py yt09)
Copertina 3 s muta → scene → chiusura 10 s muta (grafiche/chiusura_1920x1080.png, ../strumenti/yt/chiusura.mjs). broll_02 ha bande
nere sopra e sotto: tolte prima dello zoom.

| Scena | Contenuto | Voce |
|---|---|---|
| S01 | avatar | 7.0 s |
| S02 | b-roll broll_01.jpg | 21.0 s |
| S03 | avatar | 7.8 s |
| S04 | b-roll broll_02.jpg | 10.9 s |
| S05 | avatar | 16.4 s |
| S06 | b-roll broll_03.jpg | 5.5 s |
| S07 | avatar | 10.9 s |
| S08 | avatar | 10.3 s |
| S09 | avatar | 7.6 s |

YT09_Due_nonni_il_mare_e_la_terra.mp4: 1920x1080, 25 fps, 110.3 s (fuori da git). Sottotitoli: sottotitoli.srt da caricare su YouTube.

## Originale su HeyGen
Caricato il 18/10/2026 come asset 795fc8062fb7428c9b836493ad4e1a88: https://resource2.heygen.ai/video/795fc8062fb7428c9b836493ad4e1a88/original.mp4

## Descrizione YouTube (dal COPIONE)
Due nonni, il mare e la terra. Il Volo delle Radici: https://www.amazon.it/dp/B0CY9Y987M
Mappe Silenziose: https://www.amazon.it/dp/8893606143
Tutti i miei libri: https://laparolagiusta.it/achillepagliaro.html?utm_source=youtube&utm_medium=video&utm_campaign=libri-autore

## Da fare (Achille)
- Caricare su YouTube con sottotitoli.srt e la copertina del pacchetto come miniatura; schermata finale sugli ultimi 10 s.
