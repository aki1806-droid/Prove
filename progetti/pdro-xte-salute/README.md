# Pacchetto video HeyGen — Convenzione XTE Salute

Video informativo 16:9, 1080p, sottotitoli attivi, ~2:45. 12 scene: 4 avatar a piena inquadratura, 6 slide, copertina 3 s e chiusura 10 s mute (musica a parte).

## Contenuto
- `01_script/SCRIPT.md` — script completo, scena per scena, con visual e durata stimata
- `01_script/blocchi_voce/` — un .txt per blocco parlato (10 blocchi), pronto per ElevenLabs
- `01_script/piano_scene.json` — ordine scene, visual e audio collegati (base per create_video_from_studio)
- `02_slide/` — 8 PNG 1920×1080 nella palette del volantino nazionale (verde #1E613E, giallo #EDE21B, verde chiaro #97D676, rosso #DB1936)
- `03_asset/` — foto, smartwatch, logo XTE, logo CISL FP (trasparenti), QR verso convenzionicislfp.it/xte-salute e cislfp.it/iscriviti, PDF originali
- `04_testi/` — post social ed email agli iscritti

## Produzione (metodo standard)
1. Scegliere l'account HeyGen su cui lavorare.
2. Voce: una traccia ElevenLabs per blocco (generations_count 1), poi `ffmpeg -af "silenceremove=...,atempo=1.12"` nell'ordine indicato.
   In alternativa, la voce "Luca Ward" autorizzata per CISL FP.
3. Caricare slide e audio su HeyGen a batch.
4. Montaggio diretto da studio (non Video Agent), seguendo `piano_scene.json`.
5. Avatar mai scontornato né coperto da grafiche.

## Da verificare prima della pubblicazione
- Le URL lette ad alta voce nella scena 10 ("convenzionicislfp punto it, barra xte salute"): ascoltare la resa della pronuncia.
- Il QR della slide punta a https://convenzionicislfp.it/xte-salute/ (generato nuovo dal link della circolare): inquadrarlo col telefono per conferma.
