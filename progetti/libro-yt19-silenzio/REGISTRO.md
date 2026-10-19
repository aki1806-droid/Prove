# REGISTRO — YouTube Achille Pagliaro · «Leggo per te: Il silenzio, la prima frontiera» (Mappe Silenziose) (16:9)

Data: 19 ottobre 2026 · sessione Claude Code (repo Prove). Account HeyGen: quello del connettore. Uscita: sab 19/12, 18:00.
Scelte di Achille: voce **HeyGen come passante**; immagini **HeyGen, clip in movimento**; look **«19 Microfono a clip»**
(e6d73d660d354b94b0a50c9692b7c34e), lo stesso dei YouTube 17 e 18.

## Voce
Achille nuovo 1 (9b851842ce54449fb9ff501751ca0271), HeyGen create_speech, engine elevenlabs, eleven_v4, testi del pacchetto
senza modifiche se non i numeri, un blocco per scena unito da <break time="1.6s"/>, tre tracce (ID in ../strumenti/yt/ID-lotto4.md);
tagli con ../strumenti/yt/voci4.py (pause >0,45 s → 0,35 s, atempo 1,16): tutti i blocchi giusti al primo colpo.
Numeri in lettere: «Agosto 2023» → «duemilaventitré», «h24» → «acca ventiquattro».

## Avatar
Le sole scene avatar in fila (audio/voce-avatar.mp3, asset 781b8572a8694bde82f93e5c455ba5a9) → create_video_from_avatar 16:9 1080p: video ccac16ae8241ed3368a6e381c4392ab1.
Labiale verificato per correlazione audio: scarto costante 23 ms.

## B-roll in movimento (HeyGen text_to_video, heygen-video-1, 1080p, 8-15 s)
Un clip per prompt di PROMPT_IMMAGINI.md (HeyGen non genera immagini da un testo), messo a schermo intero per tutta la scena;
quando la voce dura più del clip, il clip si rallenta (fino a ~1,7 volte) con fotogrammi intermedi sfumati.
broll_01..06: eca17ad352724a4cabfa9805b887db60 · 0b5e96d296be4b15a747a355432990f1 · def4b7c669f04ccea20fc41935377f3a · 201a132e4b9e4d09be3dd7d86606d9d0 · b20c2e24087f4c2796da7cadc85b52f2 · 23a70527ca43430eb7dd57cdb9ae89a5

## Montaggio (../strumenti/yt/monta.py, MOVIMENTO)
Copertina del pacchetto 3 s muta → scene → chiusura 10 s muta (../strumenti/yt/chiusura.mjs). Avatar a inquadratura piena,
b-roll a schermo intero, mai sopra l'avatar; tagli netti. Verificato con foglio di fotogrammi.

| Scena | Contenuto | Voce |
|---|---|---|
| S01 | avatar | 7.7 s |
| S02 | b-roll broll_01.mp4 | 25.0 s |
| S03 | avatar | 37.0 s |
| S04 | b-roll broll_02.mp4 | 21.8 s |
| S05 | avatar | 29.4 s |
| S06 | b-roll broll_03.mp4 | 11.7 s |
| S07 | avatar | 28.5 s |
| S08 | b-roll broll_04.mp4 | 20.9 s |
| S09 | avatar | 26.9 s |
| S10 | b-roll broll_05.mp4 | 19.9 s |
| S11 | avatar | 33.0 s |
| S12 | b-roll broll_06.mp4 | 17.8 s |
| S13 | avatar | 21.1 s |
| S14 | avatar | 23.8 s |
| S15 | avatar | 5.4 s |

YT19_Leggo_per_te_Il_silenzio.mp4: 1920x1080, 25 fps, 342.9 s (fuori da git), a due passate per stare sotto i 200 MB degli asset
HeyGen (i clip in movimento pesano molto più delle foto); copia d'invio YT19_Leggo_per_te_Il_silenzio_invio.mp4 720p, sotto i 30 MB.
Sottotitoli: sottotitoli.srt (dalla voce, spostati di 3 s per la copertina) da caricare su YouTube.

## Originale su HeyGen
ASSET

## Da fare (Achille)
- Caricare su YouTube con sottotitoli.srt e la copertina del pacchetto come miniatura; schermata finale sugli ultimi 10 s.
- Estratto TikTok di 60 s: lo ricava Achille, come da ISTRUZIONI.
