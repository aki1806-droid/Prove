# REGISTRO — Kit Contratto CISL FP · promo 9:16 con avatar

Data: 21 ottobre 2026 · sessione Claude Code (repo Prove). Account HeyGen: quello del connettore.
Pacchetto: kit-contratto-heygen.zip (promo 9:16 già montato, 32,6 s, senza avatar; più un pacchetto 16:9 da ~80 s,
non fatto). Scelte di Achille: **solo il promo 9:16**, rimontato con l'avatar; voce **HeyGen come passante**; look
**«19 Microfono a clip»** (e6d73d660d354b94b0a50c9692b7c34e, lo stesso dell'«Aki with a lapel microphone» dei reel CISL).

## Voce
Achille nuovo 1 (9b851842ce54449fb9ff501751ca0271), HeyGen create_speech, engine elevenlabs, eleven_v4, testi di
testi/script.txt senza modifiche, un blocco per scena unito da <break time="1.6s"/>: request ArOET8rlnPK5y0Krn1VT,
grezzo 39,8 s (../strumenti/kit/achille-kit-promo*). Tagli: ../strumenti/kit/voci.py (pause >0,45 → 0,35 s,
atempo 1,16): 6 blocchi su 6 giusti al primo colpo. Sostituisce la voce del pacchetto (eleven_multilingual_v2, atempo 1,12).

| Scena | Voce |
|---|---|
| S01 | 2.9 s |
| S02 | 5.2 s |
| S03 | 3.0 s |
| S04 | 8.8 s |
| S05 | 6.2 s |
| S06 | 4.9 s |

## Avatar
Voci delle scene 1 e 6 in fila (audio/voce-avatar.mp3, asset 5f98c74a6b734c28b44e9ee32a9c1de1) →
create_video_from_avatar, webm con alfa, 1080p: video cd1904d45a770021272f2db1bf43bfd5. Labiale verificato (scarto 0 ms).
Scontornato in basso a destra nelle scene 1 e 6, come chiede il LEGGIMI del pacchetto (eccezione dei reel CISL, vedi
../../metodo/REEL-CISL-PDRO.md); sparisce a fine voce.

## Montaggio (../strumenti/kit/monta.py)
Le sei scene del pacchetto (scene/sN.mp4: clip Higgsfield, titoli, grafiche animate, logo) così come sono; ognuna dura
quanto la sua scena o, se la voce nuova è più lunga, quanto la voce (S05 rallentata del 3%). Sottotitoli impressi come
nel promo del pacchetto (Inter SemiBold bianco su riquadro nero), alzati nelle scene con l'avatar; anche sottotitoli.srt.
KitContratto_promo_avatar_9x16.mp4: 1080x1920, 30 fps, 32,8 s, 7 MB (fuori da git; sotto i 30 MB, è anche la copia d'invio).

## Originale su HeyGen
Caricato il 21/10/2026 come asset c9820b5bce5f48a58c287392b5715f8e: https://resource2.heygen.ai/video/c9820b5bce5f48a58c287392b5715f8e/original.mp4

## Da fare (Achille)
- Musica di sottofondo a volume basso (indicata dal pacchetto): non aggiunta.
- Didascalie e primo commento per i social: testi/didascalie.txt (link del modulo sendfox.com/form/1gqrw6/1wwlnj).
- Il pacchetto 16:9 da ~80 s («kit-contratto-heygen»: avatar, slide, clip, QR) non è stato montato.
