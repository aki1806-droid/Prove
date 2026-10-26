# REGISTRO — Eredità Invisibili · Video «Lettera di un padre» – Festa del papà (16:9 e 9:16)

Data: 25-26 ottobre 2026 · sessione Claude Code (repo Prove). Pacchetto V03 non modificato nei testi.
Scelte di Achille: account HeyGen **del connettore**; voce **HeyGen come passante**; **sottotitoli sì**, come il pacchetto
(Jost avorio con ombra, spenti sulle slide); immagini **generate con Higgsfield** dai prompt del pacchetto; **tutti i formati**.

## Voce
«Achille nuovo 1», HeyGen create_speech elevenlabs eleven_v4, una traccia (request gNgBTK7NXIYfvMddeHiQ, grezzo 45.2 s)
con i blocchi delle scene uniti da pause di 1,6 s (../strumenti/eredita/voci.py). Pause >0,45 s → 0,35 s, atempo 1,16.

| Scena | Voce |
|---|---|
| S02 | 4.3 s |
| S03 | 3.1 s |
| S04 | 8.8 s |
| S05 | 4.8 s |
| S06 | 4.2 s |
| S07 | 3.8 s |
| S08 | 4.9 s |

## Avatar
9:16 «Aki in his studio» col maglione nero (look 0385a9674ffa46d18c07a6d17e6f3e7b), video d4ca4ffa3b439bdba0dafba79fc3c783: verticale a piena inquadratura,
abbassato di 110 px perché il gancio stia sopra la testa.
16:9 look orizzontale con la giacca blu (89cf01e0c22547169c460186be0c67a8; il maglione nero non ha un look orizzontale), video 5310541474cb1459e771081c54104784:
ingrandito di 1,3 e spostato nel terzo destro; scritte e sottotitoli delle scene in camera sulla parete di sinistra.
Mai scontornato, mai coperto. Scene parlate in un solo video (audio/tempi-avatar.json), labiale verificato: 20 ms.

## Immagini e clip
6 immagini Higgsfield gpt_image_2_5, 2K qualità alta, stile «Notturno luminoso», bambini sempre di spalle (../strumenti/eredita/immagini2.json).
- clip IMG_01_spalle.mp4: HeyGen image-to-video heygen-video-1 1080p, 5 s, video 0c75f3fdd2a24797af098733b4cd4df3
- clip IMG_01_spalle_9x16.mp4: HeyGen image-to-video heygen-video-1 1080p, 5 s, video ae5a119f0f6d48c097406a2c3d437150
- clip IMG_02_caduta.mp4: HeyGen image-to-video heygen-video-1 1080p, 10 s, video 2e798dd9cece4363836701864ec59052
- clip IMG_02_caduta_9x16.mp4: HeyGen image-to-video heygen-video-1 1080p, 10 s, video 94ad84928165413fbf71cd735e9830f5

## Montaggio
../strumenti/eredita/monta.py: dissolvenze incrociate di 0,5 s, Ken Burns lento sulle immagini, slide con un respiro di zoom,
sovrimpressioni del pacchetto con dissolvenza, sfumatura notte dietro ai sottotitoli sulle immagini, nessuna musica.

## Uscita
- EI_V03_LETTERA_DI_UN_PADRE_16x9.mp4: 48.4 s, 37.9 MB — asset 578c4eacd3d94827a5a9400e2a31a5c6: https://resource2.heygen.ai/video/578c4eacd3d94827a5a9400e2a31a5c6/original.mp4
- EI_V03_LETTERA_DI_UN_PADRE_9x16.mp4: 42.4 s, 34.7 MB — asset 2978ea18fe47491d80222f1a4edfc657: https://resource2.heygen.ai/video/2978ea18fe47491d80222f1a4edfc657/original.mp4

Verificati: file integri, SAR 1:1, fogli di contatto, sottotitoli dentro il quadro. Copie d'invio sotto i 30 MB mandate in chat.

## Da fare (Achille)
- Musica: non aggiunta (la aggiunge Achille).
- Le frasi di campagna del piano vanno confermate prima di pubblicare.
