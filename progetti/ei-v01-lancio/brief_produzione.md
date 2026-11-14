# Brief di produzione (per Claude Code)

Obiettivo: un video verticale di circa 65 secondi che annuncia il libro *Eredità Invisibili* di Achille Pagliaro, da pubblicare stasera. Tono: intimo, lento, notturno. Deve far venire voglia di leggere, non vendere.

## Materiali nel pacchetto

- `03_testi/voce.txt`: testo della voce, pronto per la sintesi.
- `03_testi/copione_e_scene.md`: undici scene con voce, immagine e testo a schermo.
- `03_testi/citazioni.md`: citazioni verificate con numero di pagina.
- `03_testi/post_di_lancio.md`: testi per la pubblicazione.
- `02_immagini/copertina_fronte.png`: copertina (1748×2481). `quarta.png`, `foto_autore.jpg`, `copertina_completa.pdf`.
- `01_libro/`: il libro in PDF e in testo semplice, per controllare o cercare altre frasi.

## 1. Voce

- ElevenLabs, voce «Achille nuovo 1», modello `eleven_multilingual_v2`.
- Generare `voce.txt` in un solo passaggio. Attesi circa 68 secondi di audio grezzo.
- Post con ffmpeg: prima si accorciano i silenzi lunghi, poi si accelera.

```bash
ffmpeg -i voce_raw.mp3 -af "silenceremove=stop_periods=-1:stop_duration=0.7:stop_threshold=-45dB,atempo=1.12,loudnorm=I=-16:TP=-1.5" voce.wav
```

- Ascoltare il risultato: le citazioni dei figli («Papà, non devi fare finta», «Ti voglio bene, papà») devono avere una piccola pausa prima. Se spariscono, alzare `stop_duration` a 0.9.

## 2. Tempi

- Trascrivere `voce.wav` con i tempi per parola (Whisper o equivalente) e ricavare inizio e fine di ognuna delle undici scene. Le scene seguono la voce, non il contrario.

## 3. Immagini

- Formato 1080×1920, 30 fps, H.264, AAC.
- Clip in movimento per le scene 1-9: generate o di archivio, secondo le descrizioni del copione. Stile unico: fotografia realistica, notte o luce bassa, dominante blu, grana leggera, movimenti di camera lenti.
- Se una clip non è disponibile: fondo blu notte con particelle luminose lente e la frase in sovrimpressione. Meglio una scena sobria che un'immagine fuori tono.
- Scene 10-11: `copertina_fronte.png` su fondo `#091521`, zoom dal 100 al 106 per cento, ombra morbida.

## 4. Grafica

- Palette ricavata dalla copertina: fondo `#091521`, blu secondario `#1A2836`, argento `#98A2A5`, testo chiaro `#EEF2F4`.
- Carattere: EB Garamond (Google Fonts), corsivo per le citazioni, tondo maiuscoletto spaziato per titolo e autore, come in copertina.
- Testo a schermo centrato, massimo tre righe, margini laterali di 90 px, zona sicura: niente testo nei 250 px in alto e nei 420 px in basso.
- Sotto ogni frase una velatura scura al 35 per cento, per la leggibilità.

- Cartello finale (scena 11, ultimi due secondi): «Su Amazon, La Feltrinelli e in libreria», corpo piccolo, colore argento. Nessun indirizzo web a schermo.

## 5. Audio finale

- Pianoforte lento senza diritti, a -18 dB sotto la voce, dissolvenza di 2 secondi in chiusura.
- Livello complessivo -14 LUFS.

## 6. Vincoli

- Nessun volto di bambini. Nessun nome di familiari.
- Nessun volto parlante sintetico, nessun riferimento a come è stata realizzata la voce, né nel video né nei testi di accompagnamento.
- Le citazioni a schermo devono essere identiche a `citazioni.md`.
- Nessun logo o marchio diverso da quello dell'editore già presente in copertina.
- File di uscita: `Eredita_Invisibili_lancio.mp4`, più una copertina fissa `copertina_reel.jpg` (scena 4 o scena 10).
- Metadati del file video vuoti, salvo titolo e autore.

## 7. Controllo prima della consegna

- Durata tra 60 e 75 secondi.
- Voce e testo a schermo sincronizzati entro 0,2 secondi.
- Visione completa senza audio: il video deve reggere anche muto, solo con le frasi.
