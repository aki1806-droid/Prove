# Brief di produzione della serie (per Claude Code)

Quattro book trailer di *Eredità Invisibili* di Achille Pagliaro. Ognuno racconta una sola scena del libro, con una sola idea visiva. Per ciascuno: `voce.txt` (testo da sintetizzare), `scene.md` (regia), `post.md` (pubblicazione).

## Regole comuni

- Verticale 9:16, 1080×1920, 30 fps, H.264 e AAC. Durata tra 55 e 70 secondi.
- Voce: ElevenLabs, «Achille nuovo 1», modello `eleven_multilingual_v2`, un solo passaggio per trailer.
- Post della voce: `ffmpeg -i voce_raw.mp3 -af "silenceremove=stop_periods=-1:stop_duration=0.9:stop_threshold=-45dB,atempo=1.12,loudnorm=I=-16:TP=-1.5" voce.wav`. Le pause prima delle frasi dei figli e prima del titolo devono restare: se spariscono, reinserire 0,5 secondi di silenzio.
- Tempi delle scene ricavati dalla trascrizione dell'audio con i tempi per parola.
- Palette: fondo `#091521`, blu `#1A2836`, argento `#98A2A5`, testo `#EEF2F4`. Carattere EB Garamond, corsivo per le citazioni.
- Testo a schermo: massimo tre righe, centrato, niente nei 250 px in alto e nei 420 px in basso, ingresso in dissolvenza (salvo dove `scene.md` chiede diversamente).
- Chiusura uguale per tutti, in due tempi. Primo: `copertina_fronte.png` su fondo blu notte, zoom dal 100 al 106 per cento, titolo, autore, poi le righe «Su Amazon, La Feltrinelli e in libreria. Link in descrizione.» e «Lascia una recensione.» mentre la voce fa l'invito. Secondo: nero pieno e la frase d'impatto da sola, tenuta due secondi oltre la voce. Nessun indirizzo web a schermo.
- Livello finale -14 LUFS. Musica sotto la voce di almeno 18 dB.

## Vincoli

- Mai volti di bambini e mai il volto del padre: mani, piedi, spalle, sagome in controluce, oggetti.
- Nessun nome di familiari. Nessun volto parlante sintetico. Nessun riferimento a come sono realizzate voce e immagini, né nel video né nei testi.
- Le frasi a schermo devono essere identiche a quelle di `scene.md`; in caso di dubbio controllare su `Eredita_Invisibili_testo.txt`.
- Ogni trailer deve reggere anche senza audio, solo con immagini e frasi.
- Metadati dei file video vuoti, salvo titolo e autore.

## Ciò che distingue i quattro

| Trailer | Luogo | Luce | Suono | Movimento |
|---|---|---|---|---|
| Poi passa | supermercato | neon, poi calda | rumore d'ambiente, pianoforte solo dalla frase chiave | camera bassa, a mano |
| Sbrigati | corridoi, poi ingresso di casa | fredda, poi calda | passi e ticchettio, poi silenzio | tagli rapidi, poi inquadrature fisse |
| Non piangere | cucina di notte | una sola fonte | violoncello solo | quasi fermo |
| Prendimi | soggiorno | pomeriggio, controluce | pianoforte, una risata alla fine | rallentatore |

Uscita: `Trailer_1_Poi_passa.mp4`, `Trailer_2_Sbrigati.mp4`, `Trailer_3_Non_piangere.mp4`, `Trailer_4_Prendimi.mp4`, ciascuno con la sua immagine fissa di copertina.
