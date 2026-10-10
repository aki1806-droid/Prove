# ISTRUZIONI PER CLAUDE CODE — Video "Concorso OSS, il giorno della prova"

Committente: **CISL FP Padova Rovigo** · Voce e volto: **Achille Pagliaro**
Fonte dei contenuti: presentazione ufficiale Azienda Zero "Indicazioni per lo svolgimento delle prove concorsuali e prescrizioni di sicurezza" (copia renderizzata in `assets/slide_originali_AziendaZero/`).

---

## 0. Prima di toccare qualsiasi cosa

1. **Chiedi ad Achille su quale dei suoi due account HeyGen lavorare** (quello del connettore o quello via API key/CLI). Non generare né caricare nulla prima della risposta.
2. Leggi `03_FATTI_E_VERIFICHE.md`: ci sono **quattro punti da confermare** (descrizione del corso, link, contatti, logo). Finché restano segnaposto tra parentesi quadre, il video non si pubblica.
3. Se nella cartella di lavoro esiste `METODO.md` / `STANDARD.md`, **segui quello**: questo file ne è un'applicazione, non un'alternativa.

## 1. Contenuto del pacchetto

| Percorso | Cosa contiene |
|---|---|
| `scene.json` | **fonte unica**: 18 scene, tipo, testo voce (con pause SSML), testo a schermo, file |
| `01_SCRIPT_VIDEO.md` | lo stesso script in forma leggibile, per la revisione di Achille |
| `02_SCRIPT_REEL_9x16.md` | versione corta verticale per social (~50 s) |
| `03_FATTI_E_VERIFICHE.md` | cosa viene dal documento ufficiale, cosa è aggiunto, cosa va confermato |
| `04_TESTI_PUBBLICAZIONE.md` | descrizione YouTube/Squadd, post Facebook, messaggio WhatsApp |
| `render_slides.py` | rigenera tutte le slide da `scene.json` (Pillow + font Poppins inclusi) |
| `assets/slide_cisl/` | 14 slide 1920×1080 già renderizzate, pronte per HeyGen |
| `assets/foto/` | 6 immagini estratte dal PDF: esterno palasport, varchi, bagni esterni, mappa auto, mappa bus, piantina interna |
| `assets/slide_originali_AziendaZero/` | le 16 slide originali a 150 dpi, solo come riferimento |
| `assets/logo/` | **vuota**: inserire `logo_cisl_fp.png` (sfondo trasparente) e rilanciare `render_slides.py` |
| `fonts/` | Poppins Bold/Medium/Regular/Light |

## 2. Pipeline (metodo standard di Achille, logica di risparmio crediti)

1. **Logo** → copia `logo_cisl_fp.png` in `assets/logo/`, poi `python3 render_slides.py`. Il logo entra in alto a sinistra in tutte le slide e grande in chiusura.
2. **Voce su ElevenLabs, mai il TTS di HeyGen.** Una traccia per ogni scena con `voce` non vuota (16 tracce). Voce `Achille nuovo 1`, modello `eleven_multilingual_v2`, `generations_count` 1. I tag `<break time="…"/>` sono già nel testo.
3. **Post-produzione audio con ffmpeg**, in quest'ordine: `silenceremove` poi `atempo=1.12`. Serve anche perché HeyGen rifiuta gli mp3 grezzi di ElevenLabs.
4. **Upload asset su HeyGen a batch**: 16 audio + 14 PNG.
5. **Montaggio con `create_video_from_studio`** (mai il Video Agent): 16:9, 1080p, sottotitoli attivi, 18 scene nell'ordine di `scene.json`.
   - scene `avatar` → look **"Aki in his studio"** (gruppo "Aki") a piena inquadratura, mai scontornato né coperto da grafiche;
   - scene `slide` / `immagine` → PNG a piena inquadratura con la sua traccia audio;
   - **S01** copertina 3 s muta · **S18** chiusura 10 s muta (la musica la aggiunge Achille).
6. **B-roll facoltativo** (1–2 clip, Artlist o Higgsfield): solo se una scena risulta troppo statica, ad esempio un orologio da polso spento prima di S09. Niente testo sopra le clip.
7. **Registro**: salva in `REGISTRO.md` gli ID di ogni traccia, asset e del video finale.

## 3. Regole da non rompere

- Massimo 6 parole per testo a schermo (schemi esclusi) — già rispettato nelle slide.
- Il testo a schermo non ripete mai alla lettera quello parlato.
- Nessun testo sopra le foto: nelle scene `immagine` la didascalia sta a lato, su fondo chiaro.
- Velocità: solo `atempo=1.12` in ffmpeg, come da metodo. Nessun'altra accelerazione in HeyGen.
- Max 1.400 caratteri per scena: la più lunga ne ha 485.
- Palette CISL FP: verde `#00633B`, rosso `#D6042B`, fondo `#F4F6F3`.

## 4. Pronuncia (già scritta in forma parlata nello script)

| A schermo | Detto |
|---|---|
| concorsi@azero.veneto.it | "concorsi, chiocciola, a zero, punto veneto, punto it" |
| DPR 445/2000 | "D P R quattrocentoquarantacinque del duemila" |
| OSS | "operatore socio sanitario" |
| A4 | "A quattro" (verificare che ElevenLabs non dica "a4") |

## 5. Durata

4.838 caratteri di parlato ≈ 5 min 30 s grezzi → **circa 5 minuti** dopo atempo 1,12, più 13 s di copertina e chiusura.

## 6. Extra (se c'è tempo)

- **Reel verticale** da `02_SCRIPT_REEL_9x16.md`: 1080×1920. Le slide verticali vanno create adattando `render_slides.py` (W, H = 1080, 1920) in `assets/reel/`.
- **Miniatura**: verde CISL, scritta "27 OTTOBRE · ISTRUZIONI" e foto del palasport (`assets/foto/bagni_esterni.png` è la foto di facciata più nitida, senza annotazioni).
