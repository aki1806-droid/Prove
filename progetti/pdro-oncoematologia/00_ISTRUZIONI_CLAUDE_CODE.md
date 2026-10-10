# ISTRUZIONI PER CLAUDE CODE — PDRO Oncoematologia Pediatrica

Reel 9:16 per **CISL FP Padova Rovigo** sul trasferimento temporaneo dell'Oncoematologia Pediatrica del Salus Pueri (AOUP). Segui il metodo di produzione già in uso (METODO.md / STANDARD.md): non reinventarlo.

## 0. Prima di tutto
- **Chiedi ad Achille su quale dei due account HeyGen lavorare** prima di caricare asset o generare qualsiasi cosa.
- Tono: vicinanza, sobrietà, nessuna ipotesi sulle cause, nessun dettaglio clinico sui bambini, nessuna polemica con altre sigle. Il testo è approvato così: **non modificare la narrazione**.

## 1. Parametri fissi
| Voce | Valore |
|---|---|
| Formato | 9:16, 1080×1920, 1080p, sottotitoli attivi |
| Voce | ElevenLabs **"Achille nuovo 1 v4"** (cerca l'ID per nome), `eleven_multilingual_v2`, `generations_count` 1 |
| Post-voce | ffmpeg `silenceremove` poi `atempo=1.12` (in quest'ordine), poi esporta in formato accettato da HeyGen |
| Avatar | HeyGen, look **"Aki with a lapel microphone"** (cerca l'ID per nome tra i look privati) |
| Posizione | avatar **sempre in basso a destra**, mai coperto; logo CISL FP Padova Rovigo **sempre in alto a sinistra** |
| Montaggio | `create_video_from_studio`, una sola chiamata, 7 scene |
| Titolo HeyGen | `PDRO – Oncoematologia Pediatrica – Tutela del personale` |

## 2. Contenuto del pacchetto
- `blocchi.json` — le 7 scene: tipo, testo voce, file visivo, prompt clip, durata stimata
- `voce_testi/` — un .txt per blocco, da passare **così com'è** a ElevenLabs
- `slide/` — sfondi PNG 1080×1920 delle scene 1, 3, 5, 7 (zona logo in alto a sinistra e zona avatar in basso a destra già libere)
- `overlay_clip/` — PNG trasparenti con la banda verde scuro da sovrapporre alle clip delle scene 2, 4, 6
- `SCRIPT.md` — script completo, mappa visiva e checklist
- `TESTO_POST.md` — didascalia per i social

## 3. Pipeline
1. Genera le 7 tracce ElevenLabs da `voce_testi/` (una per blocco).
2. ffmpeg: `silenceremove` + `atempo=1.12`; verifica le durate (stima totale circa 2'30").
3. Clip scene 2, 4, 6: generale su Higgsfield (o dal repertorio HeyGen) dai prompt in `blocchi.json`. Durata ≥ traccia voce del blocco, **audio rimosso**, **viraggio verde** in post, poi sovrapponi l'overlay della scena.
4. **Nessun bambino in primo piano o riconoscibile, nessun paziente, nessun logo aziendale leggibile.** Non usare le foto dell'articolo del Mattino.
5. Carica asset su HeyGen a batch (logo PNG di CISL FP Padova Rovigo compreso: chiedilo ad Achille se non è già tra gli asset).
6. Monta con `create_video_from_studio`: per ogni scena sfondo (slide o clip+overlay) + avatar in basso a destra + audio del blocco.
7. Compila il registro: ID tracce, ID asset, ID avatar, ID video.

## 4. Controlli finali
- Nessun numerale pronunciato, nessun segmento sopra le 90 parole (già verificato)
- Alternanza SLIDE / CLIP rispettata (1S 2C 3S 4C 5S 6C 7S)
- Avatar in basso a destra e logo in alto a sinistra in tutte le scene
- Rosso `#C8102E` non usato (non è un contenuto di allerta)
