# REGISTRO — Eredità Invisibili · Video di Natale «Il regalo che non si incarta» (16:9 e 9:16)

Data: 25-26 ottobre 2026 · sessione Claude Code (repo Prove). Pacchetto V02 non modificato nei testi.
Scelte di Achille: account HeyGen **del connettore**; voce **HeyGen come passante**; **sottotitoli sì**, come il pacchetto
(Jost avorio con ombra, spenti sulle slide); immagini **generate con Higgsfield** dai prompt del pacchetto; **tutti i formati**.

## Voce
«Achille nuovo 1», HeyGen create_speech elevenlabs eleven_v4, una traccia (request vbRhlU2URy5SRIr6g0lx, grezzo 56.2 s)
con i blocchi delle scene uniti da pause di 1,6 s (../strumenti/eredita/voci.py). Pause >0,45 s → 0,35 s, atempo 1,16.

| Scena | Voce |
|---|---|
| S01 | 3.7 s |
| S02 | 4.9 s |
| S03 | 8.0 s |
| S04 | 8.0 s |
| S05 | 7.2 s |
| S06 | 8.6 s |
| S07 | 3.5 s |

## Avatar
9:16 «Aki in his studio» col maglione nero (look 0385a9674ffa46d18c07a6d17e6f3e7b), video dc384558279953c0505e53535966eff5: verticale a piena inquadratura,
abbassato di 110 px perché il gancio stia sopra la testa.
16:9 look orizzontale con la giacca blu (89cf01e0c22547169c460186be0c67a8; il maglione nero non ha un look orizzontale), video 94a1c11958e3686b5ad8b99753d69ec4:
ingrandito di 1,3 e spostato nel terzo destro; scritte e sottotitoli delle scene in camera sulla parete di sinistra.
Mai scontornato, mai coperto. Scene parlate in un solo video (audio/tempi-avatar.json), labiale verificato: 20 ms.

## Immagini e clip
4 immagini Higgsfield gpt_image_2_5, 2K qualità alta, stile «Notturno luminoso», bambini sempre di spalle (../strumenti/eredita/immagini2.json).
- clip IMG_01_albero.mp4: HeyGen image-to-video heygen-video-1 1080p, 6 s, video 3b3cb211cea34945a7609b28dced0ac2
- clip IMG_01_albero_9x16.mp4: HeyGen image-to-video heygen-video-1 1080p, 6 s, video dba78f057bcf48dcaea7b184fe21a395

## Montaggio
../strumenti/eredita/monta.py: dissolvenze incrociate di 0,5 s, Ken Burns lento sulle immagini, slide con un respiro di zoom,
sovrimpressioni del pacchetto con dissolvenza, sfumatura notte dietro ai sottotitoli sulle immagini, nessuna musica.

## Uscita
- EI_V02_IL_REGALO_CHE_NON_SI_INCARTA_16x9.mp4: 54.3 s, 35.9 MB — asset fb617909f1a147cda2cebe371e2fd760: https://resource2.heygen.ai/video/fb617909f1a147cda2cebe371e2fd760/original.mp4
- EI_V02_IL_REGALO_CHE_NON_SI_INCARTA_9x16.mp4: 48.3 s, 34.8 MB — asset db37e003b2e44dd7870855c9039bd3a4: https://resource2.heygen.ai/video/db37e003b2e44dd7870855c9039bd3a4/original.mp4

Verificati: file integri, SAR 1:1, fogli di contatto, sottotitoli dentro il quadro. Copie d'invio sotto i 30 MB mandate in chat.

## Da fare (Achille)
- Musica: non aggiunta (la aggiunge Achille).
- Le frasi di campagna del piano vanno confermate prima di pubblicare.
- La data «entro il 20 dicembre» (detta e scritta) va controllata con i tempi di spedizione reali.
