# REGISTRO — «Il Volo delle Radici» · Reel 6 · «Onorare la storia» (9:16)

Data: 19 ottobre 2026 · sessione Claude Code (repo Prove). Account HeyGen: quello del connettore. Uscita: mer 23/12 (FB e IG tralerighedelsapere), gio 24/12 (TikTok e YouTube Shorts).
Il pacchetto porta testi a schermo, prompt delle immagini e copione, senza voce né foto. Scelte di Achille: voce **HeyGen come
passante**; immagini **con HeyGen**; montaggio **«come prima»** (foto animate, dissolvenze, testo del pacchetto, chiusura,
sottotitoli impressi).

## Voce
Luca Ward via HeyGen create_speech, engine elevenlabs, eleven_v4, una traccia per i reel 13-16 (../strumenti/yt/ward-reel-4-6*,
voce jKSdCkyeOsH6XfrmzmVW): testi del COPIONE senza modifiche, un blocco per scena unito da <break time="1.6s"/>; tagli con
../strumenti/yt/voci3.py (narratore: pause >0,6 s → 0,45 s), tutti i blocchi giusti al primo colpo. Voce: S01 4.7 s · S02 5.2 s · S03 4.8 s.

## Clip (HeyGen text_to_video, heygen-video-1, 1080p, 9:16)
HeyGen non genera immagini da un testo (create_image_generation fa solo ritratti dell'avatar): le scene sono clip
text_to_video dai prompt di PROMPT_IMMAGINI.md, già in movimento.
- scena_01: 295e119bab244be9925158521aa851c0
- scena_02: a081c4436a5140d8a478ea4a053df639
- scena_03: 4491c406d8e94758889c7d18ac6362dd
La chiusura (scene_9x16/scena_04_chiusura.jpg, del pacchetto) resta immagine con lenta spinta in avanti, muta, 2,6 s dopo l'ultima parola.

## Montaggio (../strumenti/libro/foto.py)
Voce da 0,6 s, una scena per blocco più 0,5 s di pausa, dissolvenze di 0,5 s a metà pausa; testi del pacchetto
(grafiche/testo_scena_*) che entrano con la prima parola che dicono, con alone e velo; sottotitoli impressi dai tempi delle
parole, tolti dove ripetono il testo a schermo e sulla chiusura. Verificato con fogli di fotogrammi.
Reel6_Onorare_la_storia_9x16.mp4 (fuori da git), copia d'invio Reel6_Onorare_la_storia_9x16_invio.mp4 (sotto i 30 MB).

## Originale su HeyGen
Caricato il 19/10/2026 come asset 58ffb8f3119f4ebea63d99be3aebbf79: https://resource2.heygen.ai/video/58ffb8f3119f4ebea63d99be3aebbf79/original.mp4

## Da fare (Achille)
- Musica leggera sotto la voce (indicata dalle ISTRUZIONI): non aggiunta.
