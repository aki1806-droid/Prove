# ISTRUZIONI PER CLAUDE CODE — PDRO Riforma Professioni Sanitarie

Reel 9:16 per **CISL FP Padova Rovigo**: cosa cambia per infermieri e professionisti sanitari con il ddl delega sulle professioni sanitarie (A.C. 2700-A), in Aula alla Camera dal 12/10/2026. Segui il metodo di produzione già in uso (METODO.md / STANDARD.md): non reinventarlo.

## 0. Prima di tutto
- **Chiedi ad Achille su quale dei due account HeyGen lavorare** prima di caricare asset o generare qualsiasi cosa.
- Tono: pratico, incoraggiante, di servizio. **Non modificare la narrazione** senza l'ok di Achille.
- Grafica volutamente varia: ogni scena ha un layout diverso. Applica le animazioni indicate nella colonna **Regia** di `SCRIPT.md`.

## 1. Parametri fissi
| Voce | Valore |
|---|---|
| Formato | 9:16, 1080×1920, 1080p, sottotitoli attivi |
| Voce | ElevenLabs **"Achille nuovo 1 v4"** (cerca l'ID per nome), `eleven_multilingual_v2`, `generations_count` 1 |
| Post-voce | ffmpeg `silenceremove` poi `atempo=1.12` (in quest'ordine), poi esporta in formato accettato da HeyGen |
| Avatar | HeyGen, look **"Aki with a lapel microphone"** (cerca l'ID per nome tra i look privati) |
| Posizione | avatar **sempre in basso a destra**, mai coperto; logo CISL FP Padova Rovigo **sempre in alto a sinistra** |
| Montaggio | `create_video_from_studio`, una sola chiamata, 9 scene |
| Titolo HeyGen | `PDRO – Riforma professioni sanitarie` |

## 2. Contenuto del pacchetto
- `blocchi.json` — le 9 scene: tipo, testo voce, file visivo, prompt clip, durata stimata
- `voce_testi/` — un .txt per blocco, da passare **così com'è** a ElevenLabs
- `slide/` — due sfondi PNG 1080×1920 (A e B) per ciascuna scena 1, 3, 5, 7, 9 (zona logo in alto a sinistra e zona avatar in basso a destra già libere)
- `overlay_clip/` — due overlay PNG trasparenti (A e B) per ciascuna clip delle scene 2, 4, 6, 8
- `SCRIPT.md` — script completo, mappa visiva e checklist
- `TESTO_POST.md` — didascalia per i social 

## 3. Pipeline
1. Genera le 9 tracce ElevenLabs da `voce_testi/` (una per blocco).
2. ffmpeg: `silenceremove` + `atempo=1.12`; verifica le durate (stima totale circa 3'00").
3. Clip scene 2, 4, 6, 8: generale su Higgsfield (o dal repertorio HeyGen) dai prompt in `blocchi.json`. Durata ≥ traccia voce del blocco, **audio rimosso**, **viraggio verde** in post, poi sovrapponi l'overlay della scena.
4. Nessun paziente o bambino riconoscibile, nessun logo aziendale leggibile.
5. Carica asset su HeyGen a batch (logo PNG di CISL FP Padova Rovigo compreso: chiedilo ad Achille se non è già tra gli asset).
6. Monta con `create_video_from_studio`: per ogni scena grafica A dall'inizio e grafica B dalla frase indicata in `blocchi.json` (campo `grafiche`), + avatar in basso a destra + audio del blocco. Se lo studio non permette il cambio a metà scena, dividi l'audio del blocco in due tracce al punto della frase.
7. Compila il registro: ID tracce, ID asset, ID avatar, ID video.

## 4. Controlli finali
- Nessun numerale pronunciato, nessun segmento sopra le 90 parole (già verificato)
- Alternanza SLIDE / CLIP rispettata (1S 2C 3S 4C 5S 6C 7S 8C 9S)
- Avatar in basso a destra e logo in alto a sinistra in tutte le scene
- Rosso `#C8102E` solo per timbri incentivi e impegni mancanti
