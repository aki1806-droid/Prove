# REGISTRO — Booktrailer «Mappe Silenziose» (9:16)

Data: 18 ottobre 2026 · sessione Claude Code (repo Prove). Account HeyGen: quello del connettore. Esce il 9 novembre. Gemello: ../libro-booktrailer-mappe-16x9/ (stessa voce e stessi tempi).
Il pacchetto porta foto, testi a schermo e copione, senza voce né SRT. Scelte di Achille: voce **HeyGen come passante**,
**foto animate** come i pezzi di «Il Volo delle Radici», **sottotitoli impressi**.

## Voce
Voce: Luca Ward (e4bd8d8a357f41a99502309874733c16) via HeyGen, eleven_v4, una traccia con le 8 scene (../strumenti/yt/ward-bt-mappe*), copiata dal 16:9. Pausa tra le scene 0,8 s. Testi del COPIONE senza modifiche, un blocco per scena unito da <break time="1.6s"/>; tagli con
../strumenti/yt/voci2.py (tipo narratore: pause >0,6 s → 0,45 s): tutti i blocchi giusti al primo colpo.

## Clip (HeyGen image_to_video, heygen-video-1, 1080p)
- scena_01 (scena_01.jpg): asset foto 4449cc0345e54cb9a1dd728bd7a046cd, clip fe17b27125e14052a0848f8536dd7196
- scena_02 (scena_02.jpg): asset foto 797a31b3391349e186bea00a41c54370, clip f9e8841899194ec2bccc892281a0f984
- scena_03 (scena_03.jpg): asset foto 6c0da58ed04d442e922703e2515fe4a7, clip 1f07bfcc7ec14eebbc52cae058356c1a
- scena_04 (scena_04.jpg): asset foto 7fa89a1203144d0fa2174b16b0db40b9, clip 4fe8a5a83a0d48ee9117e8957ebb947b
- scena_05 (scena_05.jpg): asset foto 9b75862374224062a9aa9e416d32a4bd, clip 6f3cf94b4cff4b789bcba861cc74fea8
- scena_06 (scena_06.jpg): asset foto 34ed40add9d44cda90d1b7e272191816, clip 8da54e65ae254057b2e880ed785d8e36
- scena_07 (scena_07.jpg): asset foto a9f9c72232c046cd895e902b99fcb0af, clip 6ea574388c394f7992170561a47b358b
La chiusura (scena_08_chiusura.jpg) resta immagine con lenta spinta in avanti, 2,6 s dopo l'ultima parola. 

## Montaggio (../strumenti/libro/foto.py bt9)
Voce da 0,6 s, una scena per blocco più la pausa, tagli a metà delle pause (7.10, 11.58, 18.72, 23.02, 27.62, 34.58, 39.25 s), dissolvenze di 0,5 s.
Testi del pacchetto (grafiche/testo_scena_*) che entrano con la prima parola che dicono, con alone scuro e velo in basso.
Sottotitoli dai tempi delle parole (sottotitoli.srt), una frase per riga o spezzata a metà alla virgola, EB Garamond corsivo
(../strumenti/libro/sottotitoli.mjs); tolti dove ripetono il testo a schermo e sulla chiusura (blocchi 9, 11, 14, 16).
Booktrailer_Mappe_Silenziose_9x16.mp4: 44.2 s (fuori da git), copia d'invio _invio.mp4.

## Originale su HeyGen
Caricato il 18/10/2026 come asset 12351b8d935c4d38b4b939f75cdb5c37: https://resource2.heygen.ai/video/12351b8d935c4d38b4b939f75cdb5c37/original.mp4

## Da fare (Achille)
- Musica Artlist leggera sotto la voce (indicata dal COPIONE): non aggiunta.
