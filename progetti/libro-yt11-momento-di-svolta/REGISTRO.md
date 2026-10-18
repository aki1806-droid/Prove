# REGISTRO — YouTube Achille Pagliaro · «Il momento di svolta» (16:9)

Data: 18 ottobre 2026 · sessione Claude Code (repo Prove). Account HeyGen: quello del connettore. Uscita: sabato 21/11, 18:00.
Scelte di Achille: voce **HeyGen come passante**; look «No un altro» rispetto ad «Aki in his studio», poi «scegline uno tu» e,
alla mia proposta del 15 (biblioteca), **«Usa la 26»**: «Aki in a dark blazer» (a88bd501839c449a97ae619ebce90fbb, foto-avatar);
b-roll: **foto con lento zoom**.

## Voce
Achille nuovo 1 (9b851842ce54449fb9ff501751ca0271), HeyGen create_speech, engine elevenlabs, eleven_v4, testi del COPIONE
senza modifiche, un blocco per scena unito da <break time="1.6s"/>: una traccia (1.738 caratteri, grezzo 108,9 s).
Grezzi e tempi parola per parola in ../strumenti/yt/; tagli con ../strumenti/yt/voci.py (pause >0,45 s → 0,35 s, atempo 1,16):
tutti i blocchi giusti al primo colpo (prima e ultima parola di ogni scena verificate col COPIONE).
(Primo tentativo con inputType ssml rifiutato da HeyGen per formato: nessuna voce generata.)

## Avatar
Le sole scene AVATAR in fila (audio/voce-avatar.mp3, 50.3 s, asset 8fb25e8d714b48e694297e833b8589a8) →
create_video_from_avatar 16:9 1080p mp4, motore predefinito: video 2216b77d115f78a2f7339b250c002057. Tagliato scena per scena con
audio/tempi-avatar.json; labiale verificato per correlazione audio: scarto costante 23 ms in ogni scena.

## Montaggio (../strumenti/yt/monta.py)
Copertina del pacchetto 3 s muta → scene → chiusura 10 s muta (grafiche/chiusura_1920x1080.png, ../strumenti/yt/chiusura.mjs:
il pacchetto non la porta; stessa foto e stile della copertina, i due libri e «I link sono nella descrizione»).
Avatar a inquadratura piena; b-roll a schermo intero con zoom lento alternato avanti/indietro, mai sopra l'avatar; tagli netti.
Copia d'invio 1080p.

| Scena | Contenuto | Voce |
|---|---|---|
| S01 | avatar | 8.4 s |
| S02 | b-roll broll_01.jpg | 6.4 s |
| S03 | avatar | 12.9 s |
| S04 | b-roll broll_02.jpg | 12.7 s |
| S05 | avatar | 11.9 s |
| S06 | b-roll broll_03.jpg | 16.5 s |
| S07 | avatar | 4.9 s |
| S08 | avatar | 5.1 s |
| S09 | avatar | 7.1 s |

YT11_Il_momento_di_svolta.mp4: 1920x1080, 25 fps, 99.0 s (fuori da git). Sottotitoli: sottotitoli.srt (dalla voce, spostati di 3 s per la copertina) da caricare su YouTube.

## Originale su HeyGen
Caricato il 18/10/2026 come asset dc289d349f734beab774a274ddc346b9: https://resource2.heygen.ai/video/dc289d349f734beab774a274ddc346b9/original.mp4

## Descrizione YouTube (dal COPIONE)
Il momento di svolta. Il Volo delle Radici: https://www.amazon.it/dp/B0CY9Y987M
Mappe Silenziose: https://www.amazon.it/dp/8893606143
Tutti i miei libri: https://laparolagiusta.it/achillepagliaro.html?utm_source=youtube&utm_medium=video&utm_campaign=libri-autore

## Da fare (Achille)
- Caricare su YouTube con sottotitoli.srt e la copertina del pacchetto come miniatura; schermata finale sugli ultimi 10 s.
- Marchio in alto a sinistra: non messo (il COPIONE lo vuole solo se usato sul canale autore).
