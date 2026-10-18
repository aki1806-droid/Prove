# REGISTRO — YouTube Achille Pagliaro · «Cosa sono le mappe silenziose» (16:9)

Data: 18 ottobre 2026 · sessione Claude Code (repo Prove). Account HeyGen: quello del connettore. Uscita: sabato 28/11, 18:00.
Scelte di Achille: voce **HeyGen come passante**; look «No un altro» rispetto ad «Aki in his studio», poi «scegline uno tu» e,
alla mia proposta del 15 (biblioteca), **«Usa la 26»**: «Aki in a dark blazer» (a88bd501839c449a97ae619ebce90fbb, foto-avatar);
b-roll: **foto con lento zoom**.

## Voce
Achille nuovo 1 (9b851842ce54449fb9ff501751ca0271), HeyGen create_speech, engine elevenlabs, eleven_v4, testi del COPIONE
senza modifiche, un blocco per scena unito da <break time="1.6s"/>: una traccia (1.761 caratteri, grezzo 107,0 s).
Grezzi e tempi parola per parola in ../strumenti/yt/; tagli con ../strumenti/yt/voci.py (pause >0,45 s → 0,35 s, atempo 1,16):
tutti i blocchi giusti al primo colpo (prima e ultima parola di ogni scena verificate col COPIONE).
(Primo tentativo con inputType ssml rifiutato da HeyGen per formato: nessuna voce generata.)

## Avatar
Le sole scene AVATAR in fila (audio/voce-avatar.mp3, 41.7 s, asset 01e62842f67443a39f8927324f7d1c95) →
create_video_from_avatar 16:9 1080p mp4, motore predefinito: video 39d664bb72d438256650ea6baa050fba. Tagliato scena per scena con
audio/tempi-avatar.json; labiale verificato per correlazione audio: scarto costante 23 ms in ogni scena.

## Montaggio (../strumenti/yt/monta.py)
Copertina del pacchetto 3 s muta → scene → chiusura 10 s muta (grafiche/chiusura_1920x1080.png, ../strumenti/yt/chiusura.mjs:
il pacchetto non la porta; stessa foto e stile della copertina, i due libri e «I link sono nella descrizione»).
Avatar a inquadratura piena; b-roll a schermo intero con zoom lento alternato avanti/indietro, mai sopra l'avatar; tagli netti.
Copia d'invio 1080p.

| Scena | Contenuto | Voce |
|---|---|---|
| S01 | avatar | 4.7 s |
| S02 | b-roll broll_01.jpg | 9.5 s |
| S03 | avatar | 16.8 s |
| S04 | b-roll broll_02.jpg | 17.7 s |
| S05 | avatar | 10.4 s |
| S06 | b-roll broll_03.jpg | 16.4 s |
| S07 | avatar | 6.9 s |
| S08 | avatar | 2.9 s |

YT12_Cosa_sono_le_mappe_silenziose.mp4: 1920x1080, 25 fps, 98.4 s (fuori da git). Sottotitoli: sottotitoli.srt (dalla voce, spostati di 3 s per la copertina) da caricare su YouTube.

## Originale su HeyGen
Caricato il 18/10/2026 come asset 4f0b446c66764ff685d7b065695f0a65: https://resource2.heygen.ai/video/4f0b446c66764ff685d7b065695f0a65/original.mp4

## Descrizione YouTube (dal COPIONE)
Cosa sono le mappe silenziose. Il Volo delle Radici: https://www.amazon.it/dp/B0CY9Y987M
Mappe Silenziose: https://www.amazon.it/dp/8893606143
Tutti i miei libri: https://laparolagiusta.it/achillepagliaro.html?utm_source=youtube&utm_medium=video&utm_campaign=libri-autore

## Da fare (Achille)
- Caricare su YouTube con sottotitoli.srt e la copertina del pacchetto come miniatura; schermata finale sugli ultimi 10 s.
- Marchio in alto a sinistra: non messo (il COPIONE lo vuole solo se usato sul canale autore).
