# METODO COMPLETO — come si fanno i video nell'ambiente Claude Code di Achille Pagliaro

Versione del 27 ottobre 2026. Documento unico ed esportabile: raccoglie **tutto** il metodo con cui in questo ambiente si
passa da un pacchetto (zip con copione, grafiche, immagini) a un video finito, controllato, caricato e registrato.
Vale per i reel CISL FP Padova Rovigo (PDRO), per le serie dei libri (*Eredità Invisibili*, *Mappe silenziose*) e, con
gli adattamenti indicati, per i video lunghi del canale *La Parola Giusta*.

Gli altri file di `metodo/` approfondiscono singole parti: `REGOLE-VIDEO.md` (regole fisse), `REEL-CISL-PDRO.md` (il reel
PDRO passo per passo), `MASTER-PORTATILE.md` (video lunghi e corsi), `REFERENTI-CISL-FP.md` (delegati per territorio).
Questo file li tiene insieme e aggiunge quello che si è imparato dopo: l'API HeyGen, Higgsfield, gli effetti e la musica
dal catalogo, i controlli che hanno fermato errori veri.

---

## Indice

1. Gli ingredienti: account, connettori, strumenti
2. Prima di generare: le domande ad Achille
3. Regole fisse sui contenuti
4. Il pacchetto e la cartella di progetto
5. Voce
6. Tagli della voce
7. Immagini
8. Clip (image-to-video)
9. Avatar
10. Grafiche animate: il motore
11. Montaggio
12. Sottotitoli
13. Effetti sonori e musica
14. Controlli prima della consegna
15. Consegna: copia d'invio, HeyGen, link
16. Registro, git e ID
17. Correzioni dopo la consegna (versione 2)
18. Errori già fatti e come evitarli
19. Riepilogo in quindici righe

---

## 1. Gli ingredienti

### 1.1 Servizi

| servizio | come si usa | per cosa |
|---|---|---|
| **HeyGen** (connettore MCP) | strumenti `mcp__HEYGEN__*` | voce (ElevenLabs fatturato da HeyGen), avatar, image-to-video, caricamento degli asset |
| **HeyGen** (API con chiave) | `progetti/strumenti/heygen_api.py` | le stesse cose quando i crediti del connettore finiscono; in più effetti sonori e musica dal catalogo |
| **Higgsfield** (connettore MCP) | `mcp__Higgsfield__*` | immagini (`gpt_image_2_5`) e clip (`kling3_0`) |
| **ElevenLabs** (connettore MCP) | `mcp__ElevenLabs__*` | voce diretta (strada alternativa), immagini nei flow |
| **ffmpeg / ffprobe** | da riga di comando | tagli, montaggio, controlli, compressione |
| **Chromium + Playwright** | già installati: `require('playwright')`, `executablePath: '/opt/pw-browsers/chromium'` | il motore delle grafiche animate |
| **git** | ramo di lavoro della sessione | registro, strumenti, testi (mai i video) |

### 1.2 HeyGen: connettore prima, poi la chiave API

- Il connettore e la chiave sono **lo stesso account** (aki.pagliaro@gmail.com), ma con **saldi diversi**: il connettore usa
  i crediti premium dell'abbonamento, la chiave un **portafoglio in dollari** a parte.
- Si usa il connettore finché ha crediti; quando non bastano (una voce narrante di due minuti ne chiede 8-9) si passa
  all'API.
- **La chiave non entra mai nel repository.** `heygen_api.py` la legge da `HEYGEN_API_KEY` o da
  `/root/.config/heygen/api_key` (permessi 600). La strada giusta è metterla nelle impostazioni dell'ambiente (menu
  dell'ambiente → Modifica → Network secrets o variabile `HEYGEN_API_KEY`): una sessione nuova la ritrova da sola. Un file
  scritto a mano in `/root/.config` sparisce quando il contenitore riparte.
- Prima e dopo ogni lavoro si legge il saldo (`python3 heygen_api.py utente`) e lo si scrive nel registro: così si vede
  anche se qualcos'altro ha speso nel frattempo.
- Gli endpoint v1/v2 di HeyGen chiudono il 31 ottobre 2026: `heygen_api.py` usa solo la **v3**.

Costi misurati (API, ottobre 2026): voce di 2 minuti più chiusura ≈ 0,30 $; avatar di 15-17 s ≈ 0,60 $.

### 1.3 Strumenti nel repository (`progetti/strumenti/`)

| file | cosa fa |
|---|---|
| `heygen_api.py` | `utente` (saldo), `voce` (TTS eleven_v4, json con i tempi delle parole + mp3 grezzo), `asset` (carica un file), `avatar` (video avatar sull'audio, anche `webm` trasparente), `scarica` (aspetta e scarica), `suoni` (effetti dal catalogo) |
| `chicedomani/voci.py` | `blocchi()` divide la traccia ai `<break>`, `scrivi()` taglia ogni blocco, accorcia le pause, applica `atempo`, scrive `audio/` del progetto |
| `chicedomani/pezzi.py` | ritaglia le grafiche del pacchetto in pezzi PNG con alfa e ricostruisce il fondo |
| `chicedomani/motore.html` | il motore: rimette i pezzi a tempo sulle parole (ingressi, uscite, effetti, barrature, camera) |
| `chicedomani/rendi.mjs` | rende una scena dal motore (H.264 per le scene piene, ProRes 4444 con alfa per gli overlay; `prova` = PNG singoli) |
| `chicedomani/monta.py` | montaggio PDRO: scene, clip sotto gli overlay, logo, avatar trasparente in basso a destra, voce |
| `chicedomani/sottotitoli.py` | SRT dai tempi delle parole |
| `eredita/monta.py` | montaggio delle serie dei libri: avatar a piena inquadratura, immagini e clip con Ken Burns, sottotitoli impressi, 9:16 e 16:9 |
| `<progetto>/serie.py` | la regia di un singolo video: pezzi da ritagliare (`EPISODI`) e animazioni sulle parole (`ANIM`) |
| `<progetto>/voci.py`, `suoni.py`, `musica.py` | voce, effetti e musica di un singolo video |
| `invio.sh` | copia d'invio sotto i 30 MB |
| `labiale.py` | scarto in millisecondi fra la voce e l'audio del video avatar |

---

## 2. Prima di generare: le domande ad Achille

**Prima di generare qualunque cosa**, in una sola domanda a scelta multipla (al massimo quattro voci):

1. **Con quale strumento faccio la voce?** HeyGen come passante (consigliato, una traccia per tutto il video) oppure
   ElevenLabs diretto. Si chiede **sempre**, anche se la risposta sembra ovvia.
2. **Per chi è il video?** Provinciale (CISL FP Padova Rovigo: AOUP Padova, ULSS 6 Euganea, ULSS 5 Polesana, con i delegati
   di ciascuno da `REFERENTI-CISL-FP.md`) oppure solo AOUP. Decide testi, didascalie, canali e contatti a schermo.
3. **Su quale account HeyGen?** Il pacchetto lo chiede sempre. Con il connettore quasi esaurito, chiedere se usare la chiave
   API (e ricordare dove va messa).
4. **Stile e materiali:** grafiche animate o ferme; clip con HeyGen o Higgsfield (o foto ferme con zoom se mancano i
   crediti); musica ed effetti sì o no (di regola **niente musica**: la aggiunge Achille, salvo che chieda il contrario).

Si aggiunge una domanda solo se il pacchetto la richiede davvero. Esempi: testi da cambiare (vedi §3), formati da
produrre («tutti i formati»), chi manda le immagini. Se il pacchetto è urgente («esce oggi»), le opzioni consigliate vanno
messe per prime e segnate *(Recommended)*.

---

## 3. Regole fisse sui contenuti

- **I testi approvati non si cambiano senza l'ok di Achille.** Se una regola fissa li tocca (per esempio «OSS» detto a
  voce), si chiede; l'originale si conserva in `voce_testi/originali/` o `voce_testi/v1/` e il registro scrive la modifica
  con la data dell'autorizzazione.
- **Numeri in lettere nella voce** («ventisette», «venti dicembre»); a schermo restano in cifre.
- **Mai «OSS» a voce:** «operatori socio sanitari». A schermo la sigla va bene.
- Lo studio non si presenta mai come fatto durante l'orario di lavoro.
- **Nessun volto di bambino visibile:** bambini sempre di spalle, in controluce o solo mani. Nei temi sanitari, nessun
  paziente e nessun dettaglio clinico.
- **Avatar mai coperto da grafiche**; nei video lunghi mai scontornato. Nei reel PDRO si usa il webm trasparente in basso a
  destra perché lo chiede il pacchetto.
- **Niente musica** se non è chiesta esplicitamente. Effetti sonori solo se il pacchetto li vuole e Achille li conferma.
- Mai il TTS proprio di HeyGen (`heygen_voice`, `starfish`, `orca`) né il Video Agent per la voce: balbettii e artefatti.

---

## 4. Il pacchetto e la cartella di progetto

1. Lo zip si apre in una cartella nuova e vuota del **scratchpad**, poi si copia in `progetti/<sigla>-<nome-breve>/`
   (per esempio `pdro-volantini-strappati`, `ei-r03-propositi-al-contrario`).
2. Si leggono **tutti** i file di testo: `00_ISTRUZIONI_CLAUDE_CODE.md` / `LEGGIMI.md`, `SCRIPT.md` / `COPIONE.md`,
   `blocchi.json` / `PIANO_MONTAGGIO.json`, `voce_testi/`, `TESTO_POST.md` / `DIDASCALIE.md`.
3. Si guardano **tutte** le grafiche con una griglia di coordinate sopra (tacche ogni 100 px), ridotte a metà: servono per
   ritagliare i pezzi e per capire dove andranno logo, avatar e sottotitoli.
4. Si guardano le foto del pacchetto: nessun bambino in volto, nessun paziente.
5. Si copia il `.gitignore` di un progetto recente: `*.mp4 *.webm *.wav *.mov *.m4a montaggio*/ audio/sfx/ audio/musica/
   __pycache__/`.
6. Si scrive subito un `REGISTRO.md` di stato (vedi §16), così una sessione che riparte sa dove si era arrivati.

---

## 5. Voce

### 5.1 Voci

| chi | voice_id | uso |
|---|---|---|
| Achille nuovo 1 | `9b851842ce54449fb9ff501751ca0271` | chiusure, serie dei libri, video del canale |
| Luca Ward | `e4bd8d8a357f41a99502309874733c16` | narratore dei reel PDRO |

Sempre **ElevenLabs `eleven_v4`**, in lingua `it`.

### 5.2 Una traccia, blocchi uniti da una pausa

Tutte le scene dello stesso parlatore vanno in **una sola chiamata**, con i blocchi uniti da `<break time="1.6s"/>`. Così
la voce è coerente, si paga meno (HeyGen arrotonda per eccesso **a ogni chiamata**) e i confini si trovano da soli ai
`<break>`. Sotto i ~2.900 caratteri per chiamata: oltre, la chiamata va in timeout e il testo va diviso in più tracce.

- **Connettore:** `create_speech` con `engine: "elevenlabs"`, `settings: {"model_id": "eleven_v4"}`, `language: "it"`. La
  risposta (con `word_timestamps`) si ritrova nel registro della sessione e si salva come `<nome>.json`; l'audio si scarica
  da `audio_url` e si converte in `<nome>-grezzo.mp3`.
- **API:** `python3 heygen_api.py voce <voice_id> <testo.txt> <uscita>` fa le due cose da solo.

Il json e il grezzo stanno in `progetti/strumenti/<progetto>/`; i testi uniti in `ward-testo.txt` e `achille-testo.txt`.

---

## 6. Tagli della voce

`<progetto>/voci.py` chiama `blocchi()` e `scrivi()` di `chicedomani/voci.py`:

| voce | pause tra parole | atempo |
|---|---|---|
| narratore (Luca Ward) | oltre 0,6 s → 0,45 s | 1,0 |
| Achille (HeyGen passante) | oltre 0,45 s → 0,35 s | **1,16** (con ElevenLabs diretto 1,12) |

- Ogni blocco va dalla prima parola meno 0,08 s all'ultima più 0,25 s, più 0,35 s di coda.
- I tempi delle parole restano noti dopo i tagli: `audio/parole.json`. Le grafiche si agganciano lì.
- Scrive `audio/wav/Sxx.wav`, `audio/finali/Sxx.mp3`, `audio/tempi-scene.json`, `audio/voce-completa.wav/mp3`.
- **Pause di regia** («pausa prima di…»): un dizionario `{parola: secondi}` come quarto elemento del pezzo. La parola deve
  avere **già una pausa naturale dopo di sé**: se è attaccata alla successiva, il taglio può mangiare l'inizio della parola
  dopo. Si sceglie la virgola precedente (per esempio «foglio,» e non «ma»).
- **Controllo obbligatorio:** il numero di parole di ogni blocco deve essere uguale a quello del testo (`voce_testi/`). Nove
  su nove, non «quasi».
- Se i blocchi non sono un prefisso delle scene (alcune scene senza voce), i blocchi si rinominano sulle scene vere
  (`rinomina()` in `eredita/voci.py`).

---

## 7. Immagini

- **Prima scelta: le foto del pacchetto.** Se mancano, le si genera dai prompt del pacchetto.
- **Higgsfield** `generate_image_batch`, modello `gpt_image_2_5`, `aspect_ratio` `9:16` o `16:9`, `resolution: 2k`,
  `quality: high` (2,75 crediti l'una). Al massimo ~6 richieste per lotto (oltre: errore 429). Si aspetta con
  `jobs_wait` e si scarica `result_url`.
- **ElevenLabs** (alternativa): nei flow, impostando `aspect_ratio` e 2K sul nodo. Scrivere «verticale» nel prompt **non
  basta**.
- Prompt sempre con le regole del §3 scritte dentro: «no faces visible», «children from behind», «no patients», «no
  readable text, no logos».
- Un'immagine rifiutata come «nsfw» per parole innocue («pugno chiuso con forza») si riscrive in modo neutro.
- **Ogni immagine si guarda** prima di animarla.

---

## 8. Clip (image-to-video)

### 8.1 Con Higgsfield (quando HeyGen non ha crediti, o per scelta)

1. `media_upload` con i nomi dei file, poi `PUT` dei byte (`Content-Type` e `If-None-Match: *`) all'URL firmato, poi
   `media_confirm` (tipo `image`).
2. `generate_video_batch`, modello `kling3_0`, `mode: std`, **`sound: off`**, `aspect_ratio: 9:16`, durata = durata stimata
   della scena (massimo 15 s), `medias: [{value: <media_id>, role: start_image}]`.
3. Se il servizio propone un preset («IN THE DARK») invece di generare, si rimanda la richiesta con
   `declined_preset_id`.
4. Le clip escono a 716x1280: in montaggio si portano a 1080x1920 in cover, rallentate quanto serve per coprire la voce.

### 8.2 Con HeyGen

`image_to_video` (modello `heygen-video-1`, `1080p`, durata 5-15 s) dall'asset caricato; si aspetta con `get_model_video`.

### 8.3 Il prompt

In inglese, con il movimento della regia del pacchetto, «slow steady camera», «realistic subtle motion» e le esclusioni:
«faces never visible», «nobody turns toward the camera», «no patients», «no text added».

### 8.4 Il controllo

**Ogni clip si guarda tutta**, non solo il primo fotogramma: un foglio di contatto con un fotogramma al secondo. Le
persone nelle clip si girano: in un caso la ragazza «di spalle» mostrava il profilo dal quinto secondo. Se succede:

- si rifà la clip con un prompt più stretto («only her hand moves, head still»);
- oppure si usa solo il tratto buono;
- oppure, senza crediti, si usa l'immagine ferma con uno zoom lento dell'8%. Lo si scrive nel registro.

---

## 9. Avatar

| look | id | uso |
|---|---|---|
| «Aki with a lapel microphone» | `e6d73d660d354b94b0a50c9692b7c34e` | reel PDRO, **webm trasparente** in basso a destra (di solito solo nella chiusura) |
| «Aki in his studio», maglione nero, verticale | `0385a9674ffa46d18c07a6d17e6f3e7b` | serie dei libri 9:16, mp4 a piena inquadratura |
| giacca blu, orizzontale | `89cf01e0c22547169c460186be0c67a8` | serie dei libri 16:9 (il maglione nero non ha un look orizzontale) |

Le scene parlate in camera vanno in **un solo video avatar**, una dopo l'altra con 0,6 s di pausa; i tempi si salvano in
`audio/tempi-avatar.json` e in montaggio si ritaglia ogni scena.

1. L'audio della scena (o delle scene in fila) si carica come asset: connettore (`create_asset_upload_batch` → `PUT` →
   `complete_asset_batch`) oppure API (`heygen_api.py asset`).
2. **Connettore:** `create_video_from_avatar` con `audioAssetId`, `outputFormat: webm` per il trasparente. **API:**
   `heygen_api.py avatar <look> <asset_audio> webm "<titolo>"`.
3. Si scarica (`get_video` / `heygen_api.py scarica`). **Le dimensioni cambiano** (1280x714 dal connettore, 1920x1072
   dall'API): il ritaglio dell'avatar si adatta alla larghezza e all'altezza vere (`min(ch, ih)`).
4. `python3 labiale.py <voce> <avatar>` → deve dare **0-30 ms**.

---

## 10. Grafiche animate: il motore

### 10.1 L'idea

Le grafiche del pacchetto arrivano come PNG già composti. Per animarle:

1. si **ritaglia** ogni elemento (riga di testo, card, timbro, bollino) in un PNG con alfa;
2. lo si **toglie** dal fondo riempiendo il buco;
3. il motore lo **rimette** a tempo sulle parole della voce.

Il risultato sembra la grafica del pacchetto, ma prende vita.

### 10.2 La specifica: `strumenti/<progetto>/serie.py`

`EPISODI` dice cosa ritagliare. Tipi di maschera:

| maschera | uso |
|---|---|
| `rect [x0,y0,x1,y1]` | testo su fondo a tinta unita (card, poster) |
| `rrect [..., raggio]` | card, bollini, riquadri |
| `chiaro [x0,y0,x1,y1, soglia, allarga]` | scritte chiare su foto o sfumature (soglia 100-150; 110-120 per giallo e rosso) |
| `rosso / verde / giallo` | timbri, barrature, frecce |
| `alfa` | pezzi di un overlay trasparente |

Opzioni utili per pezzo:

- `riempi` (`tinta`, `diffusione`, `verticale` per i fondi a righe come il legno, `riga` per le sfumature);
- `src` (il pezzo viene da un'altra grafica: per esempio la **versione spenta** di una scheda, presa dalla grafica in cui è
  spenta, per accenderci sopra quella accesa);
- `buca: False` (il pezzo non toglie niente dal fondo).

`ANIM` dice come e quando entra ogni pezzo. Le ancore sono parole della voce:

- `'parola'` (inizio della parola), `'parola$'` (fine), `'parola#2'` (seconda occorrenza), `'parola+0.3'`, `'parola-0.6'`;
- oppure secondi dall'inizio della scena.

Le parole si confrontano **normalizzate**: senza accenti, apostrofi e punteggiatura. Quindi «all'Azienda» diventa
`allazienda` e «un'idea» diventa `unidea`. Un'ancora sbagliata ferma il rendering con «parola non trovata».

Ingressi: `fade`, `pop`, `slam`, `wipe` (scrittura), `wipeD`, `slideL/R/U/D`, `drop` (timbro che cade), `tape`, `apri`,
`risale` (card che salgono), `zoom`, `neon`, `stampa`.

Uscite: `fade`, `strappa`, `su`.

Effetti: `pulsa`, `trema`, `ondeggia`, `bagliore`, `lampeggia`, `glitch`, `sposta`, `grigio`.

Disegni (`DIS`): `barra` (barratura rossa che si traccia), `anelli`, `contatore`, `cifre`, `torta`, `riquadro`, `banda`,
`alone`.

Per scena:

- `camera` (zoom lento, spostamento);
- `urti` (scossa breve sul colpo di un timbro);
- `fondi`;
- `tipo: overlay` (sopra una clip, rende con alfa) oppure `pieno`.

### 10.3 Il giro

```bash
SERIE=strumenti/<progetto>/serie.py python3 strumenti/chicedomani/pezzi.py           # ritaglio (tutte le scene)
SERIE=... python3 strumenti/chicedomani/pezzi.py <parte-del-nome>:S02,S04            # solo alcune scene
python3 strumenti/<progetto>/serie.py ritocca      # (se serve) ritocchi dopo il ritaglio
python3 strumenti/<progetto>/serie.py              # scrive grafica/anim.json
node strumenti/chicedomani/rendi.mjs <progetto> S02 prova 0.05,6,13.5 <cartella>/    # fotogrammi di prova
```

### 10.4 Le prove: tre fotogrammi per scena

Per ogni scena si rendono **inizio, metà e fine**:

- **all'inizio** il fondo dev'essere pulito: senza scritte fantasma, macchie o residui;
- **alla fine** ci dev'essere tutto.

Difetti già incontrati e rimedi:

- **Macchie del riempimento** su un fondo con sfumature o alone (il blu con l'alone verde): nel ritocco si sfoca
  (Gaussian 45) la zona delle scritte con una maschera sfumata.
- **Una barratura del pacchetto** stampata sopra la parola che il motore deve barrare: dal pezzo si toglie il rosso
  ricostruendo le lettere colonna per colonna (sopra/sotto), e il fondo si sfoca. La parola entra **0,6 s prima** della
  barratura, così i piccoli difetti restano scoperti un attimo appena.
- **Il riquadro dei contatti tolto da una foto** lascia una sbavatura: il riquadro entra subito (a 0,6 s) e pulsa poi sulla
  parola giusta («chiamaci»).
- **Ombre di scritte sul legno a righe:** riempimento `verticale` invece di `chiaro`.

Le grafiche **tagliate nel pacchetto** (testo che esce dal bordo) si ridisegnano più piccole sulla stessa riga, con lo stesso
testo; si tiene l'originale (`…_originale.jpg`). Se la parte tagliata non si legge, la si completa e **lo si segnala ad
Achille**.

---

## 11. Montaggio

### 11.1 Reel PDRO (`chicedomani/monta.py <progetto> <NOME>`)

- Per ogni scena: il livello del motore (scena piena) oppure la clip in cover 1080x1920 con l'overlay del motore sopra.
- Tagli netti a fine blocco di voce, 25 fps.
- **Logo** CISL FP Padova Rovigo in alto a sinistra, a 52 px sulle scene piene e a 132 px sotto la banda nera sulle scene
  con clip.
- **Avatar** trasparente in basso a destra nell'ultima scena con voce, con un alone chiaro dietro.
- I livelli già resi (`montaggio/G_Sxx.*`) si riusano: per rifare una scena si cancella il suo `G_`.
- Il montato esce come `<NOME>.mp4`. Se poi si aggiungono effetti o musica, lo si rinomina `<NOME>_voce.mp4` e lo script
  degli effetti o della musica scrive il `<NOME>.mp4` finale.

### 11.2 Serie dei libri (`eredita/monta.py <progetto> [9x16|16x9]`)

- Avatar a piena inquadratura.
  - In 9:16 si abbassa di 110 px, con la parete sopra allungata e sfocata, perché il titolo del gancio stia sopra la testa.
  - In 16:9 si ingrandisce di 1,3 e va nel terzo destro.
- Immagini con Ken Burns lento (zoom massimo 8%), slide con un respiro del 3%, clip.
- Dissolvenze incrociate di 0,5 s.
- Silenzi prima della voce dove la regia li chiede: l'avatar tiene il primo fotogramma.
- Le sovrimpressioni del pacchetto entrano in dissolvenza.
  - Se cadono sul volto: in 9:16 salgono sopra la testa con una banda scura; in 16:9 vanno sulla parete di sinistra con una
    macchia scura dietro.
- `setsar=1` **dappertutto**: senza, un video è uscito stirato (SAR 13:6).
- Più formati e più versioni (per esempio il conto alla rovescia del teaser) dalla stessa specifica.

### 11.3 Precauzioni nell'ambiente

- **Disco:** lo spazio è una quota fissa per sessione. Le cartelle `montaggio*/` dei video già consegnati si possono
  cancellare (sono fuori da git e rigenerabili); prima di cancellare si controlla con `git check-ignore`.
  - `df` può ingannare: «Avail» a zero con «Used» basso vuol dire quota finita, non macchina guasta.
  - Un ffmpeg che finisce lo spazio scrive un file troncato: va rifatto.
- **Comandi lunghi** (montaggi in coda) in background, con un registro (`… >> log; echo FINE >> log`) e un'attesa
  `until grep -q FINE log; do sleep 30; done` lanciata anch'essa in background.
- **Mai `pkill -f` con un testo che compare nel proprio comando:** uccide la shell stessa. E nemmeno un'attesa con
  `pgrep -f '<testo>'`, che trova se stessa e non finisce più.
- **`rm` su variabili:** `"${P:?}"/…` oppure percorsi letterali, mai `$P/*` nudo.

---

## 12. Sottotitoli

- **Reel PDRO:** di regola non impressi; si consegna `sottotitoli.srt` (`chicedomani/sottotitoli.py <progetto>`).
- **Serie dei libri:** impressi come chiede il pacchetto (Jost avorio con ombra, **spenti sulle slide**), da `audio/parole.json`.
  - Ogni schermata al massimo **due righe**. Una frase lunga senza punteggiatura si spezza in più schermate al confine di
    parola più vicino; non si allarga mai fuori dal quadro.
  - Controllo: nessuna riga oltre ~44 caratteri in 9:16 (oltre ~70 in 16:9). Una riga di 60 caratteri esce dai bordi.
  - In 16:9, sulle scene in camera, i sottotitoli vanno sulla parete di sinistra (x 500), **non sulla camicia bianca**,
    con la sfumatura scura alla loro altezza vera (a 1010 su 1080, non dove sta nel verticale).

---

## 13. Effetti sonori e musica

Solo se il pacchetto li chiede **e** Achille li conferma. Fonte: il catalogo HeyGen, royalty-free, attraverso l'API.

- **Effetti:** `python3 heygen_api.py suoni "<descrizione in inglese>" 3` restituisce titolo, durata e punteggio. Si scelgono
  per nome e si mettono in `strumenti/<progetto>/suoni.py`.
  - `EVENTI` = `(scena, ancora, effetto, volume, durata massima)`, con le stesse ancore di parola del motore.
  - Si scaricano in `audio/sfx/`, fuori da git.
- **Musica:** stessa ricerca con `type=music`. Si sceglie per descrizione e durata.
  - Esempio dei reel sobri: un letto documentario nella prima parte, poi il pianoforte che cresce dalla scena emotiva.
  - Dissolvenze di 1,5-2,5 s tra le tracce. Breve sigla di genere (due secondi western) solo dove la regia la vuole.
- **Livelli:** voce intorno a −21 LUFS; **musica 14-15 dB sotto la voce** (−35/−36 LUFS: volume 0,065-0,08 per le tracce
  del catalogo); effetti 0,3-0,9 a seconda del colpo; `alimiter` a 0,95, picco sotto −0,5 dB.
  - Si misura con `ebur128`: la prima prova con la musica solo 6,5 dB sotto la voce era troppo alta.
- Il catalogo non ha tutto (nessuna macchina da scrivere vera: tastiera meccanica). Lo si scrive nel registro.

---

## 14. Controlli prima della consegna

Ogni video, ogni formato, ogni versione:

1. **Integrità:** `ffmpeg -v error -i <file> -f null -` senza righe d'errore; durata attesa.
2. **Formato:** 1080x1920 (o 1920x1080), 25 fps, SAR 1:1.
3. **Foglio di contatto:** 12-18 fotogrammi distribuiti
   (`fps=N/durata,scale=…,tile=…`), guardati davvero. Si controlla:
   - testi non tagliati, overlay non sul volto, sottotitoli dentro il quadro e leggibili;
   - nessun volto di bambino, nessun paziente;
   - avatar non coperto, logo al suo posto;
   - nessun fondo con residui.
4. **Primi piani** dei punti delicati (una frase lunga, la chiusura, una tabella) a risoluzione piena.
5. **Labiale:** `labiale.py`, 0-30 ms.
6. **Sottotitoli:** nessuna riga troppo lunga (§12).
7. **Audio:** LUFS integrato e picco; musica ed effetti sotto la voce.
8. **Testi:** numero di parole dei blocchi uguale ai testi approvati.

Un difetto trovato si corregge **nello strumento** (non a mano sul singolo video) e si rimontano tutti i video toccati.

---

## 15. Consegna

1. **Copia d'invio:** `bash progetti/strumenti/invio.sh <video.mp4> <cartella del scratchpad>`. Sotto i 29 MB è una copia,
   sopra si ricomprime in due passate. Si manda in chat con `SendUserFile` (allegato).
2. **Originale su HeyGen:**
   - Si caricano gli asset con `create_asset_upload_batch` dichiarando la **dimensione esatta in byte**: l'URL è firmato su
     quella. Se il file cambia dopo, si rifà il lotto.
   - Poi `PUT` con `Content-Type` e `x-amz-server-side-encryption: AES256`, poi `complete_asset_batch`.
   - Il link da dare è `https://resource2.heygen.ai/video/<asset_id>/original.mp4`.
3. **Messaggio ad Achille:**
   - Che cosa c'è, in parole semplici.
   - Le scelte fatte al posto suo («look orizzontale con la giacca blu perché…»).
   - Quello che è diverso dal pacchetto.
   - **Quello che deve verificare lui** (date, riferimenti normativi, testi di campagna, novità dopo la data del video).
   - I link HeyGen.
   - Eventuali spese o anomalie del saldo.
   - Niente ID tecnici se non servono.
4. Con molti video: si mandano a gruppi man mano che sono pronti, non tutti alla fine.

---

## 16. Registro, git e ID

**`REGISTRO.md` in ogni progetto**, scritto mentre si lavora, con queste sezioni:

- **Scelte di Achille:** le risposte alle domande.
- **Modifiche ai testi:** autorizzate, con data.
- **Voci:** request id, grezzo, regole di taglio, durate per scena, costo.
- **Avatar:** look, id del video, asset dell'audio, labiale.
- **Immagini e clip:** id dei job.
- **Grafiche:** cosa fa ogni scena.
- **Effetti e musica:** id delle tracce, livelli.
- **Uscita:** file, durata, peso, asset HeyGen e link.
- **Diverso dal pacchetto.**
- **Da fare (Achille).**

Gli ID di una serie si raccolgono anche in `strumenti/<serie>/ID.md`.

**Git:**

- Si lavora sul ramo della sessione e si fa commit e push a ogni tappa (pacchetto, clip, montato, versione 2), con messaggi
  in italiano.
- Nel repository vanno testi, specifiche, script, PNG dei pezzi, json, mp3 delle voci.
- **Mai** mp4, webm, wav, mov, m4a, e mai la chiave API: prima del commit si controlla con
  `git diff --cached --name-only | grep -E '\.(mp4|webm|wav|mov)$'` e `git diff --cached | grep -c sk_`.

---

## 17. Correzioni dopo la consegna (versione 2)

Quando Achille cambia una frase:

1. Il testo nuovo va in `voce_testi/`; il vecchio in `voce_testi/v1/`. Si aggiornano anche `SCRIPT.md` e `blocchi.json`.
2. Si rigenera solo la voce che cambia (la vecchia va in `strumenti/<progetto>/v1/`) e si ritaglia.
3. Se la frase è della chiusura, si rifà l'avatar (il vecchio in `avatar/v1/`).
4. Si cancellano solo i livelli resi delle scene toccate (`montaggio/G_Sxx.*`) e si rimonta; effetti e musica si rimettono
   sui nuovi tempi da soli, perché sono agganciati alle parole.
5. Stessi controlli, nuovo asset HeyGen. Il registro dice quale link sostituisce quale.
6. A schermo non si cambia niente che Achille non abbia chiesto. Se c'è un dubbio (per esempio il nome di una persona tolto
   dalla voce ma ancora nel riquadro), lo si segnala.

---

## 18. Errori già fatti e come evitarli

| errore | rimedio |
|---|---|
| Immagini ElevenLabs a 1280x720 anche con «verticale» nel prompt | `aspect_ratio` 9:16 e 2K sul nodo |
| Video stirato (SAR 13:6) | `setsar=1` in ogni catena di filtri |
| Sottotitoli fuori dal quadro | frasi lunghe spezzate in più schermate; controllo della lunghezza delle righe |
| Sottotitoli 16:9 sulla camicia bianca, sfumatura nel posto sbagliato | sottotitoli sulla parete, sfumatura alla loro altezza |
| Riga «Dal capitolo…» tagliata nel pacchetto | ridisegnata più piccola, originale conservato, parte illeggibile segnalata |
| Profilo di una persona che si gira nella clip | foglio di contatto di tutta la clip; prompt più stretto o immagine ferma |
| Avatar con altezza diversa (714, 1072) | ritaglio adattato alle dimensioni vere |
| Disco pieno a metà di un montaggio | pulizia delle cartelle di montaggio già consegnate; il montaggio interrotto si rifà |
| `pkill -f` che uccide la propria shell, attesa con `pgrep -f` che non finisce | mai cercare un testo che sta nel proprio comando |
| Lotto HeyGen rifiutato dopo aver rimixato il file | dimensione dichiarata = dimensione vera; nuovo lotto |
| Preset proposto da Higgsfield al posto della clip | `declined_preset_id` |
| Immagine bloccata come nsfw | prompt riscritto con parole neutre |
| Pausa di regia che taglia la parola dopo | pausa dopo una parola con una pausa naturale (la virgola prima) |
| Ancora del motore non trovata | parole normalizzate: «all'Azienda» → `allazienda`, «un'idea» → `unidea` |
| Musica troppo alta | misura `ebur128`, musica 14-15 dB sotto la voce |
| Chiave API persa al riavvio della sessione | metterla nelle impostazioni dell'ambiente, non in un file del contenitore |
| Saldo API diverso dall'atteso | leggerlo prima e dopo; segnalare ad Achille lo scarto |

---

## 19. Riepilogo in quindici righe

1. Leggere tutto il pacchetto e guardare tutte le grafiche e le foto.
2. Domande ad Achille: strumento della voce, provinciale o AOUP, account HeyGen, stile/clip/musica.
3. Testi intoccabili; «OSS» e numeri solo con il suo ok.
4. Voce: una traccia per parlatore, `eleven_v4`, blocchi con `<break time="1.6s"/>`; connettore, poi API.
5. Tagli: narratore 0,6 → 0,45 s; Achille 0,45 → 0,35 s e atempo 1,16; parole contate blocco per blocco.
6. Immagini Higgsfield `gpt_image_2_5` 2K; clip Higgsfield Kling senza audio o HeyGen image-to-video; guardate tutte.
7. Avatar: un video per le scene in camera; webm trasparente per i PDRO; labiale 0-30 ms.
8. Grafiche: `serie.py` (pezzi e regia sulle parole), `pezzi.py`, prove a tre fotogrammi, ritocchi dei fondi.
9. Montaggio: `chicedomani/monta.py` (PDRO) o `eredita/monta.py` (libri), logo, `setsar=1`.
10. Effetti e musica dal catalogo HeyGen, solo se chiesti; musica 14-15 dB sotto la voce.
11. Controlli: integrità, formato, foglio di contatto, primi piani, labiale, sottotitoli, LUFS.
12. Copia d'invio sotto i 30 MB in chat; originale su HeyGen con il link.
13. Messaggio ad Achille: cosa c'è, cosa è diverso, cosa deve verificare lui.
14. `REGISTRO.md` con tutti gli ID; commit e push; mai video né chiavi in git.
15. Una correzione si fa nello strumento e si propaga a tutti i video toccati.
