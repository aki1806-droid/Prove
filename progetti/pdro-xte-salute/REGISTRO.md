# REGISTRO — PDRO · «Convenzione XTE Salute» (16:9)

Data: 19 ottobre 2026 · sessione Claude Code (repo Prove). Account HeyGen: quello del connettore.
Scelte di Achille: voce **HeyGen come passante**, **Achille in tutto il video** (avatar e slide), look **19**
«Aki with a lapel microphone» (e6d73d660d354b94b0a50c9692b7c34e), **slide animate**.

## Voce
Achille nuovo 1 (9b851842ce54449fb9ff501751ca0271), HeyGen create_speech, engine elevenlabs, eleven_v4: i 10 blocchi del
pacchetto (01_script/blocchi_voce/) senza modifiche, una traccia da 2.644 caratteri (request w11LIzofN6V2NigNZVWL, grezzo
173,7 s, ../strumenti/xte/achille-xte*). Tagli con ../strumenti/xte/voci.py (pause >0,45 → 0,35 s, atempo **1,16**, non
1,12 come dice il pacchetto: regola CLAUDE.md per la strada HeyGen): 10 blocchi su 10 giusti al primo colpo.

| Blocco | Scena | Tipo | Voce |
|---|---|---|---|
| S01 | A01_apertura | avatar | 12.7 s |
| S02 | S02_cos_e | slide animata | 12.6 s |
| S03 | S03_servizi | slide animata | 17.6 s |
| S04 | A04_famiglia | avatar | 14.1 s |
| S05 | S05_smartwatch | slide animata | 13.5 s |
| S06 | S06_prezzi | slide animata | 17.9 s |
| S07 | S07_condizioni | slide animata | 12.5 s |
| S08 | A08_valori | avatar | 15.5 s |
| S09 | S09_attivare | slide animata | 12.9 s |
| S10 | A10_chiusura | avatar | 11.4 s |

## Avatar
Scene S01, S04, S08, S10 in fila (audio/voce-avatar.mp3, 53,6 s, asset 11eb7272911945b8a7e9b4b09a86ec12) →
create_video_from_avatar 16:9 1080p mp4: 62e195948a43b3213acdd8d75694681c. A piena inquadratura, mai coperto.
Labiale verificato per correlazione: scarto costante 23 ms.

## Slide
- Animate sulle parole: ../strumenti/xte/serie.py + ../strumenti/chicedomani (pezzi.py, motore.html, rendi.mjs), che ora
  lavorano anche a 1920x1080 con grafica/formato.json. Titoli e occhielli entrano subito, foto e card sulle parole che le
  nominano, i prezzi € 18 / € 62 / € 89 «sbattono» sulla cifra detta, il «+ € 99 una tantum» pulsa su «novantanove», QR e i
  tre passi entrano su «vai», «clicca», «scegli». Ritagli allargati per prendere tutta l'ombra morbida delle card.
- **Correzione**: la slide di chiusura del pacchetto aveva le lettere accentate rovinate («salute Ã¨ piÃ¹ semplice»,
  «Â·» nei contatti, «non Ã¨ un dispositivo» nella nota). Rifatte le sole scritte, stessi testi e caratteri (Barlow /
  Barlow Condensed, OFL): ../strumenti/xte/chiusura.mjs → grafica/S11_chiusura.png. Le altre slide sono a posto.

## Montaggio (../strumenti/xte/monta.py)
Copertina S00 3 s muta → 10 scene → chiusura corretta 10 s muta (copertina e chiusura con lenta spinta in avanti).
PDRO_Convenzione_XTE_Salute_16x9.mp4: 1920x1080, 25 fps, 153,7 s (fuori da git), copia d'invio _invio.mp4 (27 MB).
Sottotitoli: sottotitoli.srt (dalla voce, +3 s per la copertina), da caricare a parte.
Originale su HeyGen: asset 11a18edecb574b09945903206aca24c7 — https://resource2.heygen.ai/video/11a18edecb574b09945903206aca24c7/original.mp4

## Da fare (Achille)
- Ascoltare la lettura delle URL nella scena S09 («convenzionicislfp punto it, barra xte salute»), come chiede il README.
- Inquadrare col telefono il QR della slide S09 (punta a https://convenzionicislfp.it/xte-salute/).
- Musica sotto copertina e chiusura: a cura di Achille, non aggiunta.
- Post ed email: 04_testi/POST.txt, 04_testi/EMAIL.txt (del pacchetto).
