# Strumenti di montaggio · L'IA per chi fa sindacato

Montaggio tutto locale, come chiede `CLAUDE.md`: ffmpeg per immagini, clip e audio; Chromium (Playwright) per le scene di `kit/scena.html` e per gli SVG, renderizzati fotogramma per fotogramma.

## Ordine di lavoro per una lezione `IAS_Mxx_Lyy`

1. **Voce.** Una generazione ElevenLabs per blocco `### Bnn` dello script, file in `build/<lez>/audio/grezzo/Bnn.mp3`, poi `silenceremove` su testa e coda e `atempo=1.12` in `audio/lavorato/Bnn.wav` (48 kHz mono). Somma le durate: con 0,35 s di pausa, 3 s di copertina e 10 s di chiusura deve fare almeno 12:00.
2. **Immagini e clip** in `build/<lez>/media/` con i nomi della scaletta (`I01.png`, `C01a.mp4`, `C01b.mp4`…); prompt e modelli usati vanno in `Mxx/<lez>_GENERAZIONI.json`.
3. **Pagine da renderizzare:** `python3 strumenti/pagine.py . Mxx build/<lez>` (scena.html e SVG con i font locali di `kit/font`).
4. **Fine delle animazioni:** `node strumenti/fine_animazioni.js build/<lez>/pagine/*.html`, risultato in `build/<lez>/fine_animazioni.json` (chiave = nome della pagina, valore in ms).
5. **Piano:** `python3 strumenti/piano.py . <lez>`. Legge `SCALETTA.json` e, se ci sono, `AGGIUNTE.json` (inquadrature aggiunte, riordino `_ordine`, varianti `_varianti`, ritagli `_ritaglio`) e `CAMERA.json` (movimenti di camera sugli SVG). Stampa le inquadrature e gli avvisi: oltre il limite, sotto 2,5 s, più di tre fondi grafici uguali di fila, registrazioni mancanti.
6. **Montaggio:** `python3 strumenti/monta.py . <lez> segmenti`, poi `audio`, `video`, `srt`, `provini` (oppure `tutto`). Variabili: `FFMPEG` (eseguibile) e `NODE_PATH` (moduli globali con playwright). I segmenti già fatti si saltano: per rifarne uno si cancella `build/<lez>/seg/<Sxxx>-*`.
7. **Controlli e registro:** `python3 strumenti/controlla_testi.py . <lez>` (testi a schermo), poi `python3 strumenti/registro.py . <lez> Mxx/<lez>_LAVORAZIONE.json`.
8. **Dispensa:** `python3 strumenti/dispensa.py . <lez>` e `node strumenti/pdf.js build/<lez>/pagine/dispensa.html build/<lez>/<lez>_DISPENSA.pdf`.

## Che cosa finisce in git

Della cartella `build/` si tengono solo `registro.json`, `.srt`, `_DISPENSA.pdf` e `provini.png`: video, audio e segmenti si rigenerano e pesano troppo.
