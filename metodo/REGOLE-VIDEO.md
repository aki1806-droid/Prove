# REGOLE PER CREARE I VIDEO — ambiente Claude Code di Achille Pagliaro

**Documento unico ed esportabile.** Raccoglie tutte le regole usate per produrre i video di Achille in questo ambiente
(repo `Prove`, sessioni Claude Code in cloud, account HeyGen collegato via connettore). Vale per i video del canale
«La Parola Giusta», per i pezzi dei libri (YouTube, reel, booktrailer) e per i reel della CISL FP Padova Rovigo (PDRO).
Si applica senza che venga richiesto ogni volta.

Documenti di dettaglio nello stesso repo:
- `CLAUDE.md` — le regole di progetto (voce, per chi è il video);
- `metodo/REEL-CISL-PDRO.md` — il procedimento dei reel PDRO con grafiche animate;
- `metodo/REFERENTI-CISL-FP.md` — i delegati per territorio;
- `metodo/MASTER-PORTATILE.md`, `metodo/MASTER-SHORT.md` — metodo dei corsi e dei video brevi;
- i `REGISTRO.md` dei progetti sono i modelli concreti da copiare.

---

## 1. Le domande da fare SEMPRE prima di generare qualunque cosa

Tutte insieme, in una sola domanda a scelte multiple, appena arriva un pacchetto o una proposta di video.

| Domanda | Risposte possibili | Note |
|---|---|---|
| **Con quale strumento faccio la voce?** | «HeyGen come passante» · «ElevenLabs diretto» | Si chiede **ogni volta**, anche se l'ultima risposta è stata la stessa |
| **È per il provinciale o solo per l'Azienda Ospedale-Università?** | «Provinciale» (Padova e Rovigo: AOUP, ULSS 6 Euganea, ULSS 5 Polesana) · «Solo AOUP» | Regola dal 21/10/2026. Decide territori, canali WhatsApp e delegati |
| **Su quale account HeyGen lavoro?** | di solito «quello del connettore» | I pacchetti PDRO lo chiedono sempre |
| **Le grafiche/immagini come le faccio?** | animate · ferme con zoom · foto animate · clip in movimento | Dipende dal tipo di video |
| **Che look dell'avatar?** (YouTube) | finora «19 Microfono a clip» | È lo stesso look del reel CISL: `e6d73d660d354b94b0a50c9692b7c34e` |

Se manca un'informazione che cambia il risultato (percorso giusto fra due versioni, link da usare, testo nuovo) si
chiede, proponendo già il testo pronto da approvare.

---

## 2. Regole fisse sui contenuti

- **I testi approvati non si modificano** senza l'OK di Achille. Se una modifica serve (una data che vale solo per
  l'AOUP, un percorso sbagliato), si propone il testo nuovo e si aspetta il sì.
- **Numeri in lettere nei testi voce**: «duemilaventisei», «centocinquanta», «ULSS sei», «quattro-sette-otto», «acca
  ventiquattro». A schermo e nelle didascalie restano in cifre.
- **Mai «OSS» nella voce**: si dice «operatore/i socio sanitario/i».
- **Mai dati inventati**: cifre, scadenze e requisiti vengono dal pacchetto o dalla fonte; quello che il pacchetto chiede
  di verificare va nel registro sotto «Da fare (Achille)».
- **Lo studio non si presenta mai come fatto in orario di servizio** (per esempio non si dice «si studia anche dopo il
  turno»): deve avvenire sempre fuori dall'orario di servizio.
- **Video per il provinciale**: si citano i tre territori e i delegati di ciascuno (`metodo/REFERENTI-CISL-FP.md`), al posto
  del solo riquadro della sede. Formula: «Per qualsiasi dubbio contatta il tuo delegato di riferimento».
- **Riferimenti che invecchiano** (scadenze di un bando, quote di convenzioni, una sola azienda): nel provinciale si
  rendono generici; comunque si segnalano nel registro.
- **Musica**: non si aggiunge; si segnala nel registro.
- **Sottotitoli**: Achille **non li vuole impressi** nei reel. Si fa il file `sottotitoli.srt` a parte; si inviano solo se
  richiesti.

---

## 3. Voce

### 3.1 Le due strade (tutte e due con `eleven_v4`, mai altri modelli)

| | come | atempo | verifica dei confini |
|---|---|---|---|
| **HeyGen come passante** (la più usata) | `create_speech`, `engine: "elevenlabs"`, `settings: {"model_id": "eleven_v4"}`, `inputType: "text"` | **1,16** | dai `word_timestamps` della risposta |
| **ElevenLabs diretto** | flusso ElevenLabs, nodi `tts` | **1,12** | trascrizione di verifica |

- **Mai** il TTS proprio di HeyGen (`heygen_voice`, `starfish`, `orca`) né il Video Agent per la voce: balbettii e
  artefatti.
- Le due sorgenti **non si mescolano** nello stesso corso o serie.
- `inputType: "ssml"` dà errore 400: il `<break time="1.6s"/>` va nel testo semplice.
- Una traccia sta **sotto ~2.900 caratteri** (oltre ~3.100 va in timeout). Le tracce si fanno lunghe, non un blocco per
  chiamata: il costo si arrotonda a ogni chiamata (1 credito ogni ~16,7 s di grezzo).
- Dopo un errore o un timeout della voce **si chiede prima di riprovare**.

### 3.2 Voci

| Voce | ID HeyGen | Uso |
|---|---|---|
| Achille nuovo 1 | `9b851842ce54449fb9ff501751ca0271` | YouTube dei libri, chiusure dei reel, promo |
| Luca Ward | `e4bd8d8a357f41a99502309874733c16` | narratore dei reel e dei booktrailer |

I pacchetti scrivono spesso «ElevenLabs, eleven_multilingual_v2, atempo 1,12»: con la strada HeyGen si usa invece
`eleven_v4` e atempo 1,16, e lo si scrive nel registro.

### 3.3 Una traccia, blocchi uniti dalla pausa

Le scene della stessa voce stanno in **una traccia**, unite da `<break time="1.6s"/>`. Il JSON della risposta (con i
`word_timestamps`) si salva in `progetti/strumenti/<nome>/<voce>-<nome>.json` e l'audio come `*-grezzo.mp3`; se il JSON
arriva con le lettere accentate rovinate (mojibake) si ripara con latin-1 → utf-8.

### 3.4 Tagli (`progetti/strumenti/chicedomani/voci.py`, funzioni `blocchi` e `scrivi`)

- narratore: pause oltre 0,6 s → 0,45 s, nessun atempo;
- achille: pause oltre 0,45 s → 0,35 s, poi atempo 1,16;
- ogni blocco va dalla prima parola meno 0,08 s all'ultima più 0,25 s, più 0,35 s di coda;
- produce `audio/wav/SNN.wav`, `audio/parole.json`, `audio/tempi-scene.json`, `audio/voce-completa.wav`.

**Controllo obbligatorio**: per ogni scena, prima e ultima parola e numero di parole uguali al testo approvato.

Casi particolari già risolti:
- **due parti del pacchetto spezzano una frase a metà** ed entrambe sono scene avatar → un blocco solo, senza pausa;
- **frase spezzata fra una scena b-roll e una avatar** → si legge senza pausa e si taglia a metà del respiro: ognuna delle
  due metà si prende da una copia della traccia con l'altra metà ammutolita (`strumenti/yt/voci4.py`);
- **togliere una frase già generata** senza rifare la voce → si ammutolisce in una copia della traccia e le sue parole
  escono dal blocco; la pausa che resta si accorcia come le altre (`strumenti/coordinamento/voci.py`).

---

## 4. Avatar

- **Regola generale (canale, YouTube, corsi)**: avatar **mai scontornato e mai coperto da grafiche**, a inquadratura
  piena; le scene avatar si tagliano da un unico video fatto sulle sole voci avatar in fila (`audio/voce-avatar.mp3`,
  `audio/tempi-avatar.json`).
- **Eccezione dei reel CISL PDRO e dei promo 9:16**: l'avatar sta **scontornato in basso a destra** nella chiusura (e dove
  il pacchetto lo chiede), perché lo chiedono i pacchetti ed è stato approvato. Non deve coprire titoli né il riquadro
  dei contatti, e sparisce quando finisce di parlare.
- Generazione: `create_video_from_avatar`, look `e6d73d660d354b94b0a50c9692b7c34e`, `audioAssetId` della voce (mp3 con
  `-id3v2_version 0`), `aspectRatio: "16:9"`, `1080p`; per lo scontornato `outputFormat: "webm"` (sfondo trasparente).
- **Labiale**: si controlla per correlazione fra l'audio dell'avatar e la voce caricata; lo scarto deve essere costante
  (finora 0–23 ms).

---

## 5. Immagini e clip

- HeyGen **non genera immagini da un testo** (`create_image_generation` fa solo ritratti dell'avatar). Quando il pacchetto
  dà dei prompt e si sceglie HeyGen: `text_to_video` (`heygen-video-1`, 1080p, 9:16 o 16:9, da 5 a 15 s); per una foto
  ferma si prende un fotogramma dal clip.
- Foto del pacchetto da animare: `image_to_video` (1080p), durata di poco sopra la voce della scena, prompt in inglese
  dal campo `clip` del pacchetto.
- Si interroga lo stato con `get_model_video` (non `get_video`). Se un clip fallisce si rifà una volta, anche con un prompt
  semplificato.
- Clip più corti della voce: si rallentano. Con `minterpolate` si usa `mi_mode=blend`: `mci` impiega circa 9 minuti a
  scena e ha fatto riavviare il container.
- Clip in movimento come b-roll dei YouTube: `strumenti/yt/monta.py`, gruppo `MOVIMENTO`.

---

## 6. Tipi di video e strumenti

| Tipo | Formato | Strumenti | Modello |
|---|---|---|---|
| YouTube dei libri («Leggo per te» ecc.) | 16:9 1080p | `strumenti/yt/` (`voci*.py`, `chiusura.mjs`, `monta.py`) | `libro-yt19-silenzio` |
| Reel e booktrailer dei libri (foto animate, testi del pacchetto, sottotitoli) | 9:16 | `strumenti/libro/foto.py`, `sottotitoli.mjs` | `libro-reel4-crescita` |
| Reel CISL PDRO con grafiche animate | 9:16 | `strumenti/chicedomani/` (pezzi, motore, monta) + `strumenti/<nome>/serie.py` | `pdro-bonus-mamme-2026` |
| Slide animate 16:9 (convenzioni, corsi) | 16:9 | `strumenti/xte/`, motore con `grafica/formato.json` | `pdro-xte-salute` |
| Promo già montato da rifare con avatar | 9:16 | `strumenti/kit/` | `pdro-kit-contratto-promo` |

### 6.1 YouTube dei libri
Copertina del pacchetto 3 s muta → scene (avatar a inquadratura piena alternato a b-roll a schermo intero, tagli netti) →
chiusura 10 s muta (`chiusura.mjs`). Sottotitoli `.srt` da caricare su YouTube, spostati di 3 s. Le bande nere delle foto
si tolgono solo se sono quasi nere **e** uniformi.

### 6.2 Reel CISL PDRO
Procedimento completo in `metodo/REEL-CISL-PDRO.md`. In breve:
1. si copia il pacchetto in `progetti/pdro-<nome>/` con il `.gitignore`;
2. voci (narratore in una traccia, chiusura di Achille a parte);
3. clip dalle foto e avatar webm;
4. `serie.py` con i pezzi da ritagliare e la regia sulle parole;
5. `pezzi.py`, poi `serie.py ritocca`, poi `serie.py`;
6. `chicedomani/monta.py`.

Regole delle grafiche:
- ogni pezzo entra **quando la voce lo nomina**, mai nell'ultimo secondo della scena;
- le ancore sono parole minuscole senza accenti né apostrofi («un'unica» → `ununica`, «L'indennità» → `lindennita`);
- nei pezzi su fondo con alfa (chip e pillole degli overlay) si ritaglia con `rrect` e si ricostruisce la sfumatura del
  fondo riga per riga, così non restano strisce;
- i riquadri nuovi (delegati, badge senza date) si disegnano con Playwright nello stile della grafica e sostituiscono il
  pezzo in `ritocca`;
- un pezzo che non si deve più vedere si toglie dalla regia: resta ritagliato via dal fondo.

---

## 7. Montaggio: precauzioni nell'ambiente

- **Un solo montaggio alla volta sullo stesso progetto.** Due processi insieme corrompono l'uscita. Prima di rilanciare,
  controllare che non ce ne siano in corsa (`pgrep -af monta.py`, mai `pkill -f` con un pattern che coincide con il
  proprio comando).
- **Il container si può riavviare**: i lavori in background si perdono. Per i montaggi lunghi si usa `nohup` con un log
  e un ciclo `until grep -q FINE log`; `monta.py` dei YouTube ha `RIPRENDI=1` per ripartire dalle scene già fatte. Un file
  scritto a metà da una corsa interrotta va cancellato prima di riprendere.
- Se si cambia la regia di una scena: si cancella `montaggio/G_SNN.*` e si rimonta; se cambiano i tempi della voce:
  si cancella tutta la cartella `montaggio/`.
- **Spazio disco**: le cartelle `montaggio/` dei progetti già consegnati si possono cancellare, perché si rigenerano.
- **Mai** `rm -f $S/*` con una variabile: percorsi scritti per intero o `"${S:?}"`.

---

## 8. Controlli prima della consegna

1. **Foglio di fotogrammi**, da guardare tutto:
   - YouTube: un fotogramma per scena (`foglio.py`);
   - reel: uno ogni 1,2–2,5 s (`foglio2.py`).
   Si controlla che:
   - ogni pezzo entri sulla parola giusta;
   - non ci siano macchie, strisce o buchi nei fondi;
   - niente arrivi troppo tardi;
   - l'avatar non copra niente;
   - non ci siano doppioni.
2. **Labiale** (§4).
3. **Integrità del file**: `ffmpeg -v error -i video.mp4 -f null -` deve uscire senza errori.
4. **Confini delle voci** (§3.4).

---

## 9. Consegna

1. **Copia d'invio sotto i 30 MB**, a due passate: `bitrate = 27,8·8·1024/durata − 96` kbps; sopra i 5 minuti in 720p.
   Se l'originale è già sotto i 30 MB è anche la copia d'invio.
2. **Originale su HeyGen come asset**, massimo **200 MB**. Se lo supera si ricodifica: CRF 20, oppure due passate verso
   ~188 MB. Procedura:
   - `create_asset_upload_batch` **con la dimensione esatta in byte**: l'URL viene firmato su quella dimensione;
   - PUT con `Content-Type` e `x-amz-server-side-encryption: AES256`;
   - `complete_asset_batch`.

   Il link da dare è `https://resource2.heygen.ai/video/<asset_id>/original.mp4` e va controllato che risponda 206 a
   `curl -r 0-100`. Subito dopo il caricamento può dare 403 per qualche secondo: si riprova con un ciclo.
3. **`REGISTRO.md`** nella cartella del progetto, con:
   - le scelte di Achille;
   - per le voci, gli ID delle richieste, i grezzi, i tagli e la tabella delle scene;
   - gli ID di asset, clip e avatar;
   - la regia scena per scena;
   - le caratteristiche dell'uscita e il link HeyGen;
   - «Da fare (Achille)».

   Gli ID si scrivono anche in `strumenti/<nome>/ID.md` appena generati. Le versioni successive si aggiungono in testa
   («Versione 2…») senza cancellare le precedenti.
4. **Commit e push** sul ramo di lavoro, sempre con push alla fine di ogni passo. **Mai** committare `.mp4`, `.webm`,
   `.wav`, `.mov` o `.m4a`: ogni progetto ha il suo `.gitignore`.
5. **Invio** con SendUserFile della copia d'invio, del testo per i social se c'è e dell'`.srt` solo se richiesto.
6. **Messaggio ad Achille**, breve e in italiano:
   - durata e link;
   - che cosa si è fatto diversamente dalle istruzioni del pacchetto e perché;
   - che cosa resta da verificare prima di pubblicare (quote, scadenze, link, musica).

---

## 10. Testi per i social

- Si parte dal `TESTO_POST.md` o dalle didascalie del pacchetto.
- Si adattano a «per chi è» il video: per il provinciale si aggiungono i tre territori e i delegati con i numeri.
- Il percorso descritto deve essere quello giusto: per il Kit Contratto, modulo → scelta dell'azienda → kit e canale
  WhatsApp per mail.
- Il link del primo commento è quello scelto da Achille: per il Kit Contratto il modulo Formly
  `form.getformly.com/f/x8sbZp`. Se ce ne sono due diversi, si chiede.
- L'originale del pacchetto si conserva accanto (`*_pacchetto.txt`).

---

## 11. Riepilogo in dieci righe

1. Prima di tutto chiedere: strumento della voce, provinciale o AOUP, account, grafiche, look.
2. Testi approvati intoccabili; numeri in lettere nella voce; mai «OSS» detto; lo studio mai in orario di servizio.
3. Voce: `eleven_v4`, HeyGen passante con atempo 1,16 oppure ElevenLabs diretto con 1,12; mai il TTS di HeyGen.
4. Una traccia per voce, blocchi uniti da una pausa di 1,6 s, confini controllati parola per parola.
5. Avatar a inquadratura piena e mai coperto; nei reel CISL scontornato in basso a destra solo nella chiusura.
6. HeyGen non fa immagini da un testo: clip `text_to_video` o `image_to_video`.
7. Grafiche che entrano sulle parole; fondi senza macchie; nessun sottotitolo impresso.
8. Provinciale = tre territori + delegati; niente riferimenti validi solo per l'AOUP.
9. Un montaggio alla volta, `nohup` + log, attenzione ai riavvii del container.
10. Foglio di fotogrammi e labiale → copia sotto i 30 MB → originale su HeyGen sotto i 200 MB → registro → commit e push → invio.
