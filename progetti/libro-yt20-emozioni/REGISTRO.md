# REGISTRO — YouTube Achille Pagliaro · «Leggo per te: Gestire le emozioni» (Il Volo delle Radici) (16:9)

Data: 19 ottobre 2026 · sessione Claude Code (repo Prove). Account HeyGen: quello del connettore. Uscita: sab 26/12, 18:00.
Scelte di Achille: voce **HeyGen come passante**; immagini **HeyGen, clip in movimento**; look **«19 Microfono a clip»**
(e6d73d660d354b94b0a50c9692b7c34e), lo stesso dei YouTube 17 e 18.

## Voce
Achille nuovo 1 (9b851842ce54449fb9ff501751ca0271), HeyGen create_speech, engine elevenlabs, eleven_v4, testi del pacchetto
senza modifiche se non i numeri, un blocco per scena unito da <break time="1.6s"/>, tre tracce (ID in ../strumenti/yt/ID-lotto4.md);
tagli con ../strumenti/yt/voci4.py (pause >0,45 s → 0,35 s, atempo 1,16): tutti i blocchi giusti al primo colpo.
Numeri in lettere: «10 minuti» → «dieci», «4-7-8» → «quattro-sette-otto», «4/7/8 secondi» → «quattro/sette/otto».
Il pacchetto spezza due frasi a metà: parti 13-14 («utilizzo la / tecnica del respiro»), due scene avatar di seguito, unite in un blocco solo (21 scene); parti 6-7 («dedico almeno dieci minuti / ogni giorno»), b-roll e poi avatar, lette senza pausa e tagliate a metà del respiro fra «minuti» e «ogni» (../strumenti/yt/voci4.py).

## Avatar
Le sole scene avatar in fila (audio/voce-avatar.mp3, asset 8feb965f393345de9d3a3d5cf6a89599) → create_video_from_avatar 16:9 1080p: video 32e218f20ea22b4991cf0860ee1bcae1.
Labiale verificato per correlazione audio: scarto costante 23 ms.

## B-roll in movimento (HeyGen text_to_video, heygen-video-1, 1080p, 8-15 s)
Un clip per prompt di PROMPT_IMMAGINI.md (HeyGen non genera immagini da un testo), messo a schermo intero per tutta la scena;
quando la voce dura più del clip, il clip si rallenta (fino a ~1,7 volte) con fotogrammi intermedi sfumati.
broll_01..06: 74d09a192b6b49dc85e18a280e20b3eb (il primo, 4c59ae911fec4bfbb2344d7b5c536608, è fallito) · c34fa5716fba49ba94ebdcace8c56480 · 27a1e72efd234e0396afb88564e5d784 · b5fc312348ca4ba797834712b959d912 · aaa04acce50e4b47a05642cd2ea17e4b · c5e602ec4a1a4f5ebfe4c064bd558a6e

## Montaggio (../strumenti/yt/monta.py, MOVIMENTO)
Copertina del pacchetto 3 s muta → scene → chiusura 10 s muta (../strumenti/yt/chiusura.mjs). Avatar a inquadratura piena,
b-roll a schermo intero, mai sopra l'avatar; tagli netti. Verificato con foglio di fotogrammi.

| Scena | Contenuto | Voce |
|---|---|---|
| S01 | avatar | 7.0 s |
| S02 | b-roll broll_01.mp4 | 16.6 s |
| S03 | avatar | 13.3 s |
| S04 | b-roll broll_02.mp4 | 21.7 s |
| S05 | avatar | 21.2 s |
| S06 | b-roll broll_03.mp4 | 10.0 s |
| S07 | avatar | 10.6 s |
| S08 | b-roll broll_04.mp4 | 17.1 s |
| S09 | avatar | 17.9 s |
| S10 | b-roll broll_05.mp4 | 7.1 s |
| S11 | avatar | 18.4 s |
| S12 | b-roll broll_06.mp4 | 19.5 s |
| S13 | avatar | 24.2 s |
| S14 | avatar | 22.0 s |
| S15 | avatar | 17.0 s |
| S16 | avatar | 15.0 s |
| S17 | avatar | 16.2 s |
| S18 | avatar | 17.9 s |
| S19 | avatar | 10.7 s |
| S20 | avatar | 20.1 s |
| S21 | avatar | 6.1 s |

YT20_Leggo_per_te_Gestire_le_emozioni.mp4: 1920x1080, 25 fps, 342.6 s (fuori da git), a due passate per stare sotto i 200 MB degli asset
HeyGen (i clip in movimento pesano molto più delle foto); copia d'invio YT20_Leggo_per_te_Gestire_le_emozioni_invio.mp4 720p, sotto i 30 MB.
Sottotitoli: sottotitoli.srt (dalla voce, spostati di 3 s per la copertina) da caricare su YouTube.

## Originale su HeyGen
ASSET

## Da fare (Achille)
- Caricare su YouTube con sottotitoli.srt e la copertina del pacchetto come miniatura; schermata finale sugli ultimi 10 s.
- Estratto TikTok di 60 s: lo ricava Achille, come da ISTRUZIONI.
