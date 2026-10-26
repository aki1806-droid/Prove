# REGISTRO — Eredità Invisibili · Short «Una lumaca» – Stelle sul marciapiede (9:16)

Data: 25-26 ottobre 2026 · sessione Claude Code (repo Prove). Pacchetto S04 non modificato nei testi.
Scelte di Achille: account HeyGen **del connettore**; voce **HeyGen come passante**; **sottotitoli sì**, come il pacchetto
(Jost avorio con ombra, spenti sulle slide); immagini **generate con Higgsfield** dai prompt del pacchetto; **tutti i formati**.

## Voce
«Achille nuovo 1», HeyGen create_speech elevenlabs eleven_v4, una traccia (request 5LStl6OEahDNkgJfDdKe, grezzo 25.1 s)
con i blocchi delle scene uniti da pause di 1,6 s (../strumenti/eredita/voci.py). Pause >0,45 s → 0,35 s, atempo 1,16.

| Scena | Voce |
|---|---|
| S01 | 1.4 s |
| S02 | 5.9 s |
| S03 | 5.8 s |
| S04 | 1.8 s |
| S05 | 3.7 s |

## Avatar
9:16 «Aki in his studio» col maglione nero (look 0385a9674ffa46d18c07a6d17e6f3e7b), video 4ec1622aaecbae588b8776d72d869dfd: verticale a piena inquadratura,
abbassato di 110 px perché il gancio stia sopra la testa.
Mai scontornato, mai coperto. Scene parlate in un solo video (audio/tempi-avatar.json), labiale verificato: 20 ms.

## Immagini e clip
3 immagini Higgsfield gpt_image_2_5, 2K qualità alta, stile «Notturno luminoso», bambini sempre di spalle (../strumenti/eredita/immagini2.json).
- clip IMG_01_lumaca.mp4: HeyGen image-to-video heygen-video-1 1080p, 5 s, video 751f5c62536645d985ed12b6af02580f
- clip IMG_02_bambino_lumaca.mp4: HeyGen image-to-video heygen-video-1 1080p, 7 s, video 655304ae00b2409abe8939e1791b71f3

## Montaggio
../strumenti/eredita/monta.py: dissolvenze incrociate di 0,5 s, Ken Burns lento sulle immagini, slide con un respiro di zoom,
sovrimpressioni del pacchetto con dissolvenza, sfumatura notte dietro ai sottotitoli sulle immagini, nessuna musica.

## Uscita
- EI_S04_UNA_LUMACA_9x16.mp4: 24.0 s, 20.3 MB — asset 3ca598af5a9b4a7e829c5932e9613ef4: https://resource2.heygen.ai/video/3ca598af5a9b4a7e829c5932e9613ef4/original.mp4

Verificati: file integri, SAR 1:1, fogli di contatto, sottotitoli dentro il quadro. Copie d'invio sotto i 30 MB mandate in chat.

## Da fare (Achille)
- Musica: non aggiunta (la aggiunge Achille).
- Le frasi di campagna del piano vanno confermate prima di pubblicare.
