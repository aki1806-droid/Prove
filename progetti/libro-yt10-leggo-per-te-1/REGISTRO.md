# REGISTRO — YouTube Achille Pagliaro · «Leggo per te: Insegnamenti fondamentali» (16:9)

Data: 18 ottobre 2026 · sessione Claude Code (repo Prove). Account HeyGen: quello del connettore. Uscita: sabato 14/11, 18:00.
Scelte di Achille: voce **HeyGen come passante**; look «No un altro» rispetto ad «Aki in his studio», poi «scegline uno tu» e,
alla mia proposta del 15 (biblioteca), **«Usa la 26»**: «Aki in a dark blazer» (a88bd501839c449a97ae619ebce90fbb, foto-avatar);
b-roll: **foto con lento zoom**.

## Voce
Achille nuovo 1 (9b851842ce54449fb9ff501751ca0271), HeyGen create_speech, engine elevenlabs, eleven_v4, testi del COPIONE
senza modifiche, un blocco per scena unito da <break time="1.6s"/>: tre tracce (scene 1-4, 5-8, 9-12: 1.898, 2.658 e 1.699 caratteri; grezzi 117,8 · 163,8 · 105,6 s).
Grezzi e tempi parola per parola in ../strumenti/yt/; tagli con ../strumenti/yt/voci.py (pause >0,45 s → 0,35 s, atempo 1,16):
tutti i blocchi giusti al primo colpo (prima e ultima parola di ogni scena verificate col COPIONE).
(Primo tentativo con inputType ssml rifiutato da HeyGen per formato: nessuna voce generata.)

## Avatar
Le sole scene AVATAR in fila (audio/voce-avatar.mp3, 161.1 s, asset 4e9e142e3b9545188fa53a6270d122c2) →
create_video_from_avatar 16:9 1080p mp4, motore predefinito: video c4fe8742ad0b52b47ee2bfc658f77488. Tagliato scena per scena con
audio/tempi-avatar.json; labiale verificato per correlazione audio: scarto costante 23 ms in ogni scena.

## Montaggio (../strumenti/yt/monta.py)
Copertina del pacchetto 3 s muta → scene → chiusura 10 s muta (grafiche/chiusura_1920x1080.png, ../strumenti/yt/chiusura.mjs:
il pacchetto non la porta; stessa foto e stile della copertina, i due libri e «I link sono nella descrizione»).
Avatar a inquadratura piena; b-roll a schermo intero con zoom lento alternato avanti/indietro, mai sopra l'avatar; tagli netti.
La foto broll_04 ha bande nere ai lati: monta.py le toglie prima dello zoom.
Copia d'invio a 720p (5:33 in 28 MB).

| Scena | Contenuto | Voce |
|---|---|---|
| S01 | avatar | 7.1 s |
| S02 | b-roll broll_01.jpg | 28.7 s |
| S03 | avatar | 29.7 s |
| S04 | b-roll broll_02.jpg | 31.4 s |
| S05 | avatar | 37.9 s |
| S06 | b-roll broll_03.jpg | 32.3 s |
| S07 | avatar | 32.8 s |
| S08 | b-roll broll_04.jpg | 31.6 s |
| S09 | avatar | 37.5 s |
| S10 | b-roll broll_05.jpg | 28.6 s |
| S11 | avatar | 16.1 s |
| S12 | b-roll broll_06.jpg | 6.1 s |

YT10_Leggo_per_te_Insegnamenti_fondamentali.mp4: 1920x1080, 25 fps, 332.8 s (fuori da git). Sottotitoli: sottotitoli.srt (dalla voce, spostati di 3 s per la copertina) da caricare su YouTube.

## Originale su HeyGen
Caricato il 18/10/2026 come asset f47c3634036c4f0dab3209a248dec92d: https://resource2.heygen.ai/video/f47c3634036c4f0dab3209a248dec92d/original.mp4

## Descrizione YouTube (dal COPIONE)
Leggo per te: Insegnamenti fondamentali. Il Volo delle Radici: https://www.amazon.it/dp/B0CY9Y987M
Mappe Silenziose: https://www.amazon.it/dp/8893606143
Tutti i miei libri: https://laparolagiusta.it/achillepagliaro.html?utm_source=youtube&utm_medium=video&utm_campaign=libri-autore

## Da fare (Achille)
- Caricare su YouTube con sottotitoli.srt e la copertina del pacchetto come miniatura; schermata finale sugli ultimi 10 s.
- Marchio in alto a sinistra: non messo (il COPIONE lo vuole solo se usato sul canale autore).
