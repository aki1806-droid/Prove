# LEGGIMI – pacchetto R09 «Reel «No.» – Dire no senza sensi di colpa»

Istruzioni per Claude Code. Il video si monta seguendo il metodo video di Achille (METODO.md): non reinventarlo.

## Prima di tutto
1. **Chiedi ad Achille su quale dei suoi due account HeyGen lavorare.** Non generare né caricare nulla prima della risposta.
2. Controlla che in `immagini/` e `clip/` ci siano tutti i file elencati in PIANO_MONTAGGIO.json. Se ne manca uno, fermati e fai l’elenco.

## Pipeline
1. **Voce:** ElevenLabs, voce «Achille nuovo 1», **modello eleven_v4** (non eleven_multilingual_v2). Una traccia per scena con il testo del campo `voce` (vedi anche COPIONE.md), generations_count 1.
2. **Pulizia:** ffmpeg `silenceremove` e poi `atempo=1.12`, in quest’ordine. Salva in `voce/VO_Sxx.mp3`.
3. **Grafiche:** già pronte in `grafiche/` (PNG 9x16). Le tavole sono a piena inquadratura; i file `OVL_` sono trasparenti e vanno sopra immagini o clip.
4. **Immagini e clip:** da PROMPT_IMMAGINI_E_CLIP.md. Le immagini ferme si animano con un Ken Burns lento (zoom massimo 8%).
5. **Avatar:** gruppo «Aki», look «Aki in his studio». Avatar mai scontornato e mai coperto: le scritte stanno sopra la testa o sotto il busto.
6. **Montaggio:** un’unica chiamata HeyGen `create_video_from_studio`, 1080p, sottotitoli attivi (Jost o simile, avorio con ombra), **sottotitoli spenti sulle scene «slide»** perché la frase è già scritta.
7. **Musica:** non metterla. La aggiunge Achille. Indicazione: Pianoforte minimale molto basso; 1 s di silenzio prima della frase finale.
8. **Registro:** annota ID degli asset HeyGen, ID del video, durata finale.

## Regole di stile
- Palette: notte #0B1A2E, blu marea #1C3A5E, argento #DCE4EC, avorio #F4EFE6, luce #FFF8E7, salvia #7FA79A. Font in `font/` (Cinzel, Cormorant Garamond, Jost – licenza OFL).
- Niente marchio La Parola Giusta su questo video: è il libro dell’autore.
- Bambini mai in volto.
- Transizioni: solo dissolvenze incrociate da 0,4–0,8 s. Nessun effetto vistoso.
- Nei verticali tieni testi e volto tra 250 e 1500 px di altezza (zona libera dall’interfaccia di Reels e TikTok).


## Facoltativo: motion graphics
Se Achille vuole grafiche animate, il brand per la skill motion-broll è in `brand/eredita-invisibili.json`. Densità consigliata: leggera.

## Prima della pubblicazione
Gli aneddoti sono presi dal libro. Le frasi segnate «testo di campagna» vanno confermate da Achille.
