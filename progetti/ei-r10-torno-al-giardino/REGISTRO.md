# REGISTRO — Eredità Invisibili · Reel finale «Torno al giardino» (9:16)

Data: 25-26 ottobre 2026 · sessione Claude Code (repo Prove). Pacchetto R10 non modificato nei testi.
Scelte di Achille: account HeyGen **del connettore**; voce **HeyGen come passante**; **sottotitoli sì**, come il pacchetto
(Jost avorio con ombra, spenti sulle slide); immagini **generate con Higgsfield** dai prompt del pacchetto; **tutti i formati**.

## Voce
«Achille nuovo 1», HeyGen create_speech elevenlabs eleven_v4, una traccia (request qhnprCYaSdCavvUvyHao, grezzo 32.9 s)
con i blocchi delle scene uniti da pause di 1,6 s (../strumenti/eredita/voci.py). Pause >0,45 s → 0,35 s, atempo 1,16.

| Scena | Voce |
|---|---|
| S01 | 3.3 s |
| S02 | 4.2 s |
| S03 | 8.2 s |
| S04 | 4.9 s |
| S05 | 4.4 s |

## Avatar
9:16 «Aki in his studio» col maglione nero (look 0385a9674ffa46d18c07a6d17e6f3e7b), video 3ddcabc9e0e3569aac61fb8e359b5159: verticale a piena inquadratura,
abbassato di 110 px perché il gancio stia sopra la testa.
Mai scontornato, mai coperto. Scene parlate in un solo video (audio/tempi-avatar.json), labiale verificato: 20 ms.

## Immagini e clip
2 immagini Higgsfield gpt_image_2_5, 2K qualità alta, stile «Notturno luminoso», bambini sempre di spalle (../strumenti/eredita/immagini2.json).
- clip IMG_01_giardino.mp4: HeyGen image-to-video heygen-video-1 1080p, 5 s, video 14e235f00c2e47d9a1cf4acc2c4cd914
- clip IMG_02_costruiscono.mp4: HeyGen image-to-video heygen-video-1 1080p, 9 s, video ff60c2d73e0b43a7bd7e99b23518375c

## Montaggio
../strumenti/eredita/monta.py: dissolvenze incrociate di 0,5 s, Ken Burns lento sulle immagini, slide con un respiro di zoom,
sovrimpressioni del pacchetto con dissolvenza, sfumatura notte dietro ai sottotitoli sulle immagini, nessuna musica.

## Uscita
- EI_R10_TORNO_AL_GIARDINO_9x16.mp4: 29.3 s, 26.8 MB — asset a17e1169084e46b9b15a8a9b286c059f: https://resource2.heygen.ai/video/a17e1169084e46b9b15a8a9b286c059f/original.mp4

Verificati: file integri, SAR 1:1, fogli di contatto, sottotitoli dentro il quadro. Copie d'invio sotto i 30 MB mandate in chat.

## Da fare (Achille)
- Musica: non aggiunta (la aggiunge Achille).
- Le frasi di campagna del piano vanno confermate prima di pubblicare.
- Nella slide S04 la riga «Dal capitolo…» del pacchetto era tagliata ai lati: ridisegnata più piccola su due righe (originale in grafiche/9x16/S04_01_frase_originale.jpg). La fine del titolo era illeggibile: completata come «L'eredità che fluisce in entrambe le direzioni», da confermare.
- S05 si può montare sopra le foto #UnSassoInTasca dei lettori (con consenso): per ora c'è l'avatar.
