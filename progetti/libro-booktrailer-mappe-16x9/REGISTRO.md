# REGISTRO — Booktrailer «Mappe Silenziose» (16:9)

Data: 18 ottobre 2026 · sessione Claude Code (repo Prove). Account HeyGen: quello del connettore. Esce il 9 novembre. Gemello: ../libro-booktrailer-mappe-9x16/ (stessa voce e stessi tempi).
Il pacchetto porta foto, testi a schermo e copione, senza voce né SRT. Scelte di Achille: voce **HeyGen come passante**,
**foto animate** come i pezzi di «Il Volo delle Radici», **sottotitoli impressi**.

## Voce
Voce: Luca Ward (e4bd8d8a357f41a99502309874733c16) via HeyGen, eleven_v4, una traccia con le 8 scene (../strumenti/yt/ward-bt-mappe*). Pausa tra le scene 0,8 s. Testi del COPIONE senza modifiche, un blocco per scena unito da <break time="1.6s"/>; tagli con
../strumenti/yt/voci2.py (tipo narratore: pause >0,6 s → 0,45 s): tutti i blocchi giusti al primo colpo.

## Clip (HeyGen image_to_video, heygen-video-1, 1080p)
- scena_01 (scena_01.jpg): asset foto b6c9aa81dbb04f769c75b056231324f3, clip 30d51b05bbf54e48938cb26a1dc8bf33
- scena_02 (scena_02.jpg): asset foto 0431ce39b1fa433098ed256b6c11494d, clip 27791b3de03c48a5ba8189212771f2a4
- scena_03 (scena_03.jpg): asset foto bb041ee9d7b44957bc6769253866ca33, clip 0d25b1a82b6e4ae38baa507166f12d67
- scena_04 (scena_04.jpg): asset foto 02507c48d4074ac89ea89c20bdf88a52, clip 1bebbb69c4c34bf9a424c7075f194e40
- scena_05 (scena_05.jpg): asset foto 84cb32b24cc742a19eb3e2eba0b0d273, clip 8cfb4fd763854f78a33d0b6caaf51fdf
- scena_06 (scena_06.jpg): asset foto 093c7fefd89f45ae9713344b6be25a22, clip 2aafb3fbe12c4e6e8eb86ca9921c04c2
- scena_07 (scena_07.jpg): asset foto 97777930721249afb5b00056e45e8c19, clip 2e7b51f113a646e0bff843fc9f115da2
La chiusura (scena_08_chiusura.jpg) resta immagine con lenta spinta in avanti, 2,6 s dopo l'ultima parola. La foto 2 aveva bande nere ai lati: tolte prima della clip.

## Montaggio (../strumenti/libro/foto.py bt16)
Voce da 0,6 s, una scena per blocco più la pausa, tagli a metà delle pause (7.10, 11.58, 18.72, 23.02, 27.62, 34.58, 39.25 s), dissolvenze di 0,5 s.
Testi del pacchetto (grafiche/testo_scena_*) che entrano con la prima parola che dicono, con alone scuro e velo in basso.
Sottotitoli dai tempi delle parole (sottotitoli.srt), una frase per riga o spezzata a metà alla virgola, EB Garamond corsivo
(../strumenti/libro/sottotitoli.mjs); tolti dove ripetono il testo a schermo e sulla chiusura (blocchi 9, 11, 14, 16).
Booktrailer_Mappe_Silenziose_16x9.mp4: 44.2 s (fuori da git), copia d'invio _invio.mp4.

## Originale su HeyGen
Caricato il 18/10/2026 come asset eeea174a416d4e3480f11c69684e7163: https://resource2.heygen.ai/video/eeea174a416d4e3480f11c69684e7163/original.mp4

## Da fare (Achille)
- Musica Artlist leggera sotto la voce (indicata dal COPIONE): non aggiunta.
