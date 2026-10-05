# Adattamenti rispetto all'originale

Basata su `motion-broll` di Bart (github.com/Barty-Bart/motion-graphics, licenza MIT). Modifiche:

## Correzioni di bug
- `render.js`: se la cartella di output non esisteva, ffmpeg falliva e il render restava bloccato per sempre. Ora crea la cartella, rileva la chiusura di ffmpeg ed esce con un errore chiaro.
- `setup.sh`: con `./motion` relativo scriveva `package.json` nel percorso sbagliato (`motion/motion/`) e falliva; il controllo ProRes dava falsi negativi. Ora usa percorsi assoluti e riusa Playwright/Chromium già installati invece di riscaricarli.
- `words.py`: si rompeva con file SRT Windows (CRLF), BOM, VTT (`mm:ss.mmm`, impostazioni del cue, blocchi NOTE) e tag `<i>`. Ora li gestisce tutti; aggiunto `--json`.
- `inspect_video.py`: andava in crash su tratti neri (dissolvenze) e assumeva sempre il 16:9. Ora rispetta le proporzioni, rileva lo spazio libero su tutti e quattro i lati, gestisce la rotazione dei video da smartphone e segnala l'assenza di audio.
- `beats.js`: viewport fisso 1920×1080 (le clip verticali venivano tagliate) e percorsi non quotati. Ora usa la dimensione della clip.
- `make_pages.py`: comandi shell con nomi file interpolati (rotture con spazi o virgolette) e sfondo fisso 1920×1080. Ora usa `subprocess` e la risoluzione reale.
- `composite.py`: `-c:a copy` falliva con sorgenti .mov in PCM; le clip con slot più lungo di 2 s oltre la loro durata sparivano. Ora l'audio va in AAC e l'ultimo frame viene tenuto per tutto lo slot.

## Novità
- Italiano: SKILL.md, intervista, pagine `viewer.html`/`compare.html`, `TIMING.md`, messaggi degli script; regole per i testi italiani a schermo.
- Formati verticali 9:16 (Reels/TikTok/Shorts), 1:1 e 4:5, con area sicura dei social; esempio `examples/verticale-it/`.
- Brand intercambiabili per video: libreria `motion/brands/` gestita con `scripts/brand.py` (lista, nuovo, modifica, usa, elimina), preset `default` e `scuro`, token semantici → variabili CSS e `window.BRAND`, font e logo incorporati. Le clip scritte con i token cambiano look solo ricostruendole con `--brand`.
- Immagini locali nelle clip incorporate automaticamente da `build.py`.
- Render circa 2× più veloce a parità di qualità (pagine in parallelo, cattura JPEG per le clip opache) e modalità `--draft` circa 4× più veloce per le bozze; avanzamento con ETA.
- `transcribe.py`: trascrizione locale con tempi reali per parola (faster-whisper), italiano di default.
- Higgsfield: reframe 16:9↔9:16 e upscale del sorgente, immagini illustrative e scontorni dentro le clip (dichiarati come generati dall'AI), virality predictor sul risultato; sempre con stima dei crediti e conferma.
- HeyGen: video sorgente da script con avatar (con SRT incluso), avatar trasparente composto in PiP sul canvas del brand, rimozione intercalari, short da video lunghi, versioni tradotte, brand kit; `inspect_video.py --bg` rileva lo spazio libero anche su sfondi colorati.
- `markers.csv` con timecode HH:MM:SS:FF per il montaggio.
- Istruzioni per le sessioni cloud (`motion/env.sh`, cosa committare e cosa no) e integrazioni facoltative del workspace (Canva, ElevenLabs, HeyGen, Higgsfield, Robin), sempre su richiesta dell'utente.
