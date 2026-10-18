# REGISTRO — «Il Volo delle Radici» · Reel 3 · «Coraggio» (9:16)

Data: 18 ottobre 2026 · sessione Claude Code (repo Prove). Account HeyGen: quello del connettore. Esce il 18 novembre.
Il pacchetto porta foto, testi a schermo e copione, senza voce né SRT. Scelte di Achille: voce **HeyGen come passante**,
**foto animate** come i pezzi di «Il Volo delle Radici», **sottotitoli impressi**.

## Voce
Voce: Luca Ward via HeyGen, eleven_v4, nella stessa traccia del reel 08 (../strumenti/yt/ward-reel-coraggio-silenzio*, blocchi 1-4). Pausa tra le scene 0,5 s. Testi del COPIONE senza modifiche, un blocco per scena unito da <break time="1.6s"/>; tagli con
../strumenti/yt/voci2.py (tipo narratore: pause >0,6 s → 0,45 s): tutti i blocchi giusti al primo colpo.

## Clip (HeyGen image_to_video, heygen-video-1, 1080p)
- scena_01 (scena_01.jpg): asset foto d26c37a31ad045efbf41adffba8619da, clip 686455eb71ed43b7b9c198080906f4ee
- scena_02 (scena_02.jpg): asset foto 859a1c471f174169933a6c3c9b8de2a7, clip 8fe002b689114eab855f56615e1b1b1a
- scena_03 (scena_03.jpg): asset foto 4a60fb0b89e64111993b3a700da7bd4a, clip 87aba7d57c8e4e7982512b9d0a3649c4
La chiusura (scena_04_chiusura.jpg) resta immagine con lenta spinta in avanti, 2,6 s dopo l'ultima parola. 

## Montaggio (../strumenti/libro/foto.py r3)
Voce da 0,6 s, una scena per blocco più la pausa, tagli a metà delle pause (7.06, 13.83, 21.47 s), dissolvenze di 0,5 s.
Testi del pacchetto (grafiche/testo_scena_*) che entrano con la prima parola che dicono, con alone scuro e velo in basso.
Sottotitoli dai tempi delle parole (sottotitoli.srt), una frase per riga o spezzata a metà alla virgola, EB Garamond corsivo
(../strumenti/libro/sottotitoli.mjs); tolti dove ripetono il testo a schermo e sulla chiusura (blocchi 1, 9).
Reel3_Coraggio_9x16.mp4: 26.5 s (fuori da git), copia d'invio _invio.mp4.

## Originale su HeyGen
Caricato il 18/10/2026 come asset a9f885760e094a0d8a25c85b68dc0ad9: https://resource2.heygen.ai/video/a9f885760e094a0d8a25c85b68dc0ad9/original.mp4

## Da fare (Achille)
- Musica Artlist leggera sotto la voce (indicata dal COPIONE): non aggiunta.
