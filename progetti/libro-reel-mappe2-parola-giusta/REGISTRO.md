# REGISTRO — «Mappe Silenziose» · Reel Mappe 2 · «La parola giusta» (9:16)

Data: 19 ottobre 2026 · sessione Claude Code (repo Prove). Account HeyGen: quello del connettore. Uscita: mer 9/12 (FB e IG cartografidellanima), gio 10/12 (TikTok e YouTube Shorts).
Il pacchetto porta testi a schermo, prompt delle immagini e copione, senza voce né foto. Scelte di Achille: voce **HeyGen come
passante**; immagini **con HeyGen**; montaggio **«come prima»** (foto animate, dissolvenze, testo del pacchetto, chiusura,
sottotitoli impressi).

## Voce
Luca Ward via HeyGen create_speech, engine elevenlabs, eleven_v4, una traccia per i reel 13-16 (../strumenti/yt/ward-reel-4-6*,
voce jKSdCkyeOsH6XfrmzmVW): testi del COPIONE senza modifiche, un blocco per scena unito da <break time="1.6s"/>; tagli con
../strumenti/yt/voci3.py (narratore: pause >0,6 s → 0,45 s), tutti i blocchi giusti al primo colpo. Voce: S01 7.1 s · S02 2.4 s · S03 8.1 s.

## Clip (HeyGen text_to_video, heygen-video-1, 1080p, 9:16)
HeyGen non genera immagini da un testo (create_image_generation fa solo ritratti dell'avatar): le scene sono clip
text_to_video dai prompt di PROMPT_IMMAGINI.md, già in movimento.
- scena_01: 079963b38eb44c3e9284e6a3387955d7
- scena_02: 89f0e4db8b07494cae0900e07cb4829b
- scena_03: e171b1b322894a04bc64c5400dec9e5a
La chiusura (scene_9x16/scena_04_chiusura.jpg, del pacchetto) resta immagine con lenta spinta in avanti, muta, 2,6 s dopo l'ultima parola.

## Montaggio (../strumenti/libro/foto.py)
Voce da 0,6 s, una scena per blocco più 0,5 s di pausa, dissolvenze di 0,5 s a metà pausa; testi del pacchetto
(grafiche/testo_scena_*) che entrano con la prima parola che dicono, con alone e velo; sottotitoli impressi dai tempi delle
parole, tolti dove ripetono il testo a schermo e sulla chiusura. Verificato con fogli di fotogrammi.
Reel_Mappe2_Parola_giusta_9x16.mp4 (fuori da git), copia d'invio Reel_Mappe2_Parola_giusta_9x16_invio.mp4 (sotto i 30 MB).

## Originale su HeyGen
Caricato il 19/10/2026 come asset ecd573ebbb6444d4acfc15bba3e4a1ad: https://resource2.heygen.ai/video/ecd573ebbb6444d4acfc15bba3e4a1ad/original.mp4

## Da fare (Achille)
- Musica leggera sotto la voce (indicata dalle ISTRUZIONI): non aggiunta.
