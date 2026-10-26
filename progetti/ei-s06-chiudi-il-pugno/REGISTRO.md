# REGISTRO — Eredità Invisibili · Short interattivo «Chiudi il pugno» – Tenere con mano aperta (9:16)

Data: 25-26 ottobre 2026 · sessione Claude Code (repo Prove). Pacchetto S06 non modificato nei testi.
Scelte di Achille: account HeyGen **del connettore**; voce **HeyGen come passante**; **sottotitoli sì**, come il pacchetto
(Jost avorio con ombra, spenti sulle slide); immagini **generate con Higgsfield** dai prompt del pacchetto; **tutti i formati**.

## Voce
«Achille nuovo 1», HeyGen create_speech elevenlabs eleven_v4, una traccia (request UxWUv574snXTNF1JMigs, grezzo 31.6 s)
con i blocchi delle scene uniti da pause di 1,6 s (../strumenti/eredita/voci.py). Pause >0,45 s → 0,35 s, atempo 1,16.

| Scena | Voce |
|---|---|
| S01 | 5.2 s |
| S02 | 4.8 s |
| S04 | 6.3 s |
| S05 | 3.1 s |
| S06 | 4.3 s |

## Avatar
9:16 «Aki in his studio» col maglione nero (look 0385a9674ffa46d18c07a6d17e6f3e7b), video 386827bf961c5ed1adc45ad442a684c9: verticale a piena inquadratura,
abbassato di 110 px perché il gancio stia sopra la testa.
Mai scontornato, mai coperto. Scene parlate in un solo video (audio/tempi-avatar.json), labiale verificato: 20 ms.

## Immagini e clip
3 immagini Higgsfield gpt_image_2_5, 2K qualità alta, stile «Notturno luminoso», bambini sempre di spalle (../strumenti/eredita/immagini2.json).
- clip IMG_01_pugno.mp4: HeyGen image-to-video heygen-video-1 1080p, 6 s, video eb3af31df34240759122714823b578ed
- clip IMG_03_mano_aperta.mp4: HeyGen image-to-video heygen-video-1 1080p, 5 s, video b5cf23ca16ef47a59a0d197ad30670ea

## Montaggio
../strumenti/eredita/monta.py: dissolvenze incrociate di 0,5 s, Ken Burns lento sulle immagini, slide con un respiro di zoom,
sovrimpressioni del pacchetto con dissolvenza, sfumatura notte dietro ai sottotitoli sulle immagini, nessuna musica.

## Uscita
- EI_S06_CHIUDI_IL_PUGNO_9x16.mp4: 33.0 s, 20.8 MB — asset 511bfa84fec84aceadd1d04e7d97ef7c: https://resource2.heygen.ai/video/511bfa84fec84aceadd1d04e7d97ef7c/original.mp4

Verificati: file integri, SAR 1:1, fogli di contatto, sottotitoli dentro il quadro. Copie d'invio sotto i 30 MB mandate in chat.

## Da fare (Achille)
- Musica: non aggiunta (la aggiunge Achille).
- Le frasi di campagna del piano vanno confermate prima di pubblicare.
