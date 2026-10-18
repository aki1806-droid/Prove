# REGISTRO — «Mappe Silenziose» · Reel 1 · «Silenzio» (9:16)

Data: 18 ottobre 2026 · sessione Claude Code (repo Prove). Account HeyGen: quello del connettore. Esce il 25 novembre.
Il pacchetto porta foto, testi a schermo e copione, senza voce né SRT. Scelte di Achille: voce **HeyGen come passante**,
**foto animate** come i pezzi di «Il Volo delle Radici», **sottotitoli impressi**.

## Voce
Voce: Luca Ward via HeyGen, eleven_v4, nella stessa traccia del reel 07 (../strumenti/yt/ward-reel-coraggio-silenzio*, blocchi 5-8). Pausa tra le scene 0,5 s. Testi del COPIONE senza modifiche, un blocco per scena unito da <break time="1.6s"/>; tagli con
../strumenti/yt/voci2.py (tipo narratore: pause >0,6 s → 0,45 s): tutti i blocchi giusti al primo colpo.

## Clip (HeyGen image_to_video, heygen-video-1, 1080p)
- scena_01 (scena_01.jpg): asset foto 5c26835db50d4c8597d29a0017b9a59e, clip aa4a371cbcf9439c872aeaca838044bf
- scena_02 (scena_02.jpg): asset foto 8f5c70ee8624487c9428420f998ad472, clip 11c553b6340c49c0ad97e8e9a0bb0400
- scena_03 (scena_03.jpg): asset foto cc4b611b48cf49bd80be47ab37afc585, clip 00f0771e85f34c99b3f54bc394c9a617
La chiusura (scena_04_chiusura.jpg) resta immagine con lenta spinta in avanti, 2,6 s dopo l'ultima parola. 

## Montaggio (../strumenti/libro/foto.py m1)
Voce da 0,6 s, una scena per blocco più la pausa, tagli a metà delle pause (8.07, 17.97, 24.52 s), dissolvenze di 0,5 s.
Testi del pacchetto (grafiche/testo_scena_*) che entrano con la prima parola che dicono, con alone scuro e velo in basso.
Sottotitoli dai tempi delle parole (sottotitoli.srt), una frase per riga o spezzata a metà alla virgola, EB Garamond corsivo
(../strumenti/libro/sottotitoli.mjs); tolti dove ripetono il testo a schermo e sulla chiusura (blocchi 8, 11).
Reel_Mappe1_Silenzio_9x16.mp4: 29.2 s (fuori da git), copia d'invio _invio.mp4.

## Originale su HeyGen
Caricato il 18/10/2026 come asset 04b6c73f24f741968471c374fc39bdd0: https://resource2.heygen.ai/video/04b6c73f24f741968471c374fc39bdd0/original.mp4

## Da fare (Achille)
- Musica Artlist leggera sotto la voce (indicata dal COPIONE): non aggiunta.
