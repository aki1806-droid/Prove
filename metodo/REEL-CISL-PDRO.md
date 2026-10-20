# REGOLA — reel CISL FP Padova Rovigo (PDRO) con grafiche animate

**Documento operativo, da seguire senza che venga richiesto ogni volta.** Vale per i
pacchetti `PDRO_*.zip` che Achille manda per i reel informativi o promozionali della
CISL FP Padova Rovigo: 9:16, narratore fuori campo, chiusura di Achille con avatar.
Esempi fatti così: `progetti/pdro-decreto-pa-legge-3-cose` (19/10/2026) e
`progetti/pdro-verso-il-coordinamento` (20/10/2026). I loro `REGISTRO.md` sono il
modello da copiare.

Gli strumenti stanno in `progetti/strumenti/chicedomani/` (motore comune) e in una
cartella per reel, `progetti/strumenti/<nome>/` (voci e specifica delle grafiche).

---

## 0. Prima di generare qualunque cosa: le domande ad Achille

Si fanno **tutte insieme**, in una sola domanda a scelta multipla:

| domanda | risposta solita |
|---|---|
| **Con quale strumento faccio la voce?** (si chiede **sempre**, regola del CLAUDE.md) | «HeyGen come passante» oppure «ElevenLabs diretto» |
| **Su quale account HeyGen lavoro?** (il pacchetto lo chiede sempre) | «quello del connettore» |
| **Le grafiche come le faccio?** | «animate come il Decreto PA» oppure «ferme con zoom lento» |

Non si usano **mai** il TTS proprio di HeyGen (`heygen_voice`, `starfish`, `orca`) né il
Video Agent.

---

## 1. Il pacchetto: com'è fatto

```
PDRO_<Titolo>/
  00_ISTRUZIONI_CLAUDE_CODE.md   istruzioni (voci, avatar, controlli prima di pubblicare)
  SCRIPT.md                      copione scena per scena, con «Regia» e «Animazione»
  blocchi.json                   le stesse scene in forma leggibile dal codice (campo voce, voce_tipo, regia, clip)
  voce_testi/NN_narratore.txt    testi voce, uno per scena (NN_achille.txt per la chiusura)
  img/*.png                      foto da animare (image-to-video)
  overlay_clip/SNNA.png          schermate con alfa da mettere sopra le clip (bande nere, titoli)
  grafiche/SNNA.png              schermate finite 1080x1920 delle scene grafiche
  *.pdf                          la fonte
```

Si copia tutto in `progetti/pdro-<nome-breve>/` e si aggiunge il `.gitignore` di un reel
precedente (`*.mp4 *.webm *.wav *.mov montaggio/`). **I testi non si modificano.** Si
controlla solo che non ci siano numeri in cifre nei testi voce (i pacchetti li scrivono già
in lettere) e che la voce dica «operatori socio sanitari», mai «OSS».

---

## 2. Voci

**Narratore:** Luca Ward `e4bd8d8a357f41a99502309874733c16`, tutte le scene narrate in
**una sola traccia**, blocchi uniti da `<break time="1.6s"/>` (sotto ~2.900 caratteri;
oltre, due tracce).
**Chiusura:** Achille nuovo 1 `9b851842ce54449fb9ff501751ca0271`, una traccia a parte.

Strada **HeyGen come passante** (quella usata finora):

```
create_speech  voiceId=<voce>  engine="elevenlabs"  settings={"model_id":"eleven_v4"}  inputType="text"
```

`inputType="ssml"` dà errore 400: il break va nel testo semplice. Il JSON della risposta (con i
`word_timestamps`) si salva come `strumenti/<nome>/ward-<nome>.json` e
`achille-<nome>.json`; l'audio come `*-grezzo.mp3`.

Tagli: `strumenti/<nome>/voci.py`, copia di `strumenti/coordinamento/voci.py` con i nomi
cambiati. Usa `chicedomani/voci.py`:
- narratore: pause oltre 0,6 s → 0,45 s;
- achille: pause oltre 0,45 s → 0,35 s, poi `atempo` **1,16** (non 1,12 come scrivono i
  pacchetti: quel valore vale per ElevenLabs diretto).

Scrive `audio/wav/SNN.wav`, `audio/parole.json`, `audio/tempi-scene.json`,
`audio/voce-completa.wav`. **Controllo obbligatorio:** per ogni scena, la prima e l'ultima
parola e il numero di parole devono coincidere con `blocchi.json`.

Se Achille sceglie **ElevenLabs diretto**: stesse voci e `eleven_v4`, atempo 1,12, e serve
la trascrizione di verifica per i confini.

---

## 3. Clip e avatar (HeyGen, account scelto)

1. Caricare in un solo lotto le foto da animare e la voce della chiusura
   (`audio/voce-avatar.mp3` = `SNN.wav` della chiusura in mp3, `-id3v2_version 0`):
   `create_asset_upload_batch` → PUT con `Content-Type` e
   `x-amz-server-side-encryption: AES256` → `complete_asset_batch`.
2. Clip: `image_to_video`, `heygen-video-1`, `1080p`, durata di poco sopra la voce della
   scena (es. 12 s per 11,7 s), prompt in inglese dal campo `clip` del pacchetto. Si
   scaricano in `clip/SNN.mp4` (il nome è quello della scena).
3. Avatar della chiusura: `create_video_from_avatar`, look «Aki with a lapel microphone»
   `e6d73d660d354b94b0a50c9692b7c34e`, `audioAssetId` della voce, **`outputFormat="webm"`**
   (sfondo trasparente), `aspectRatio="16:9"`, `1080p`. Si scarica in `avatar/avatar.webm`.

> **Eccezione alla regola del canale.** Nei reel PDRO l'avatar sta **scontornato in basso a
> destra** sopra la grafica della chiusura, perché lo chiede il pacchetto ed è stato
> approvato col Decreto PA. Non deve coprire titoli né il riquadro contatti. Nei video
> YouTube l'avatar resta a inquadratura piena e non scontornato.

Tutti gli ID vanno in `strumenti/<nome>/ID.md` appena generati.

---

## 4. Grafiche animate

Le schermate del pacchetto si **smontano in pezzi** che poi rientrano sulle parole della voce.

### 4.1 La specifica: `strumenti/<nome>/serie.py`

Si copia `strumenti/coordinamento/serie.py` e si riscrivono due dizionari.

**`EPISODI`**: per ogni scena, l'immagine di base e i pezzi da ritagliare (coordinate in
pixel della 1080x1920; si misurano aprendo la grafica a grandezza piena):

| maschera | quando |
|---|---|
| `['rect', x0,y0,x1,y1]` | pezzo su fondo piatto (riempimento «tinta») |
| `['rrect', x0,y0,x1,y1,r]` | card arrotondate |
| `['cerchio', cx,cy,r]` | pallini, bollini |
| `['poly', [[x,y],...]]` | forme irregolari |
| `['chiaro', x0,y0,x1,y1, soglia, dilata]` | testo chiaro su foto o su alfa (titoli) |
| `['alfa', x0,y0,x1,y1, soglia]` | chip e badge degli overlay con alfa |
| `['rosso'\|'verde'\|'giallo', ...]` | elementi di quel colore |

Opzioni per pezzo: `'riempi': 'tinta' | 'diffusione' | 'riga'` (come si chiude il buco nel
fondo: `tinta` sui fondi piatti, `diffusione` sulle foto), `'togli_rosso': True` (toglie le
barrature rosse, che poi il motore ridisegna), `'src'` (pezzo preso da un'altra immagine),
`'buca': False` (il pezzo non lascia buco).
**L'ordine conta:** un pezzo dentro un altro (il prezzo dentro la card) si ritaglia **prima**.

Per le scene con clip si aggiungono le bande nere
`BANDE = [rect 0,0,1080,111 ; rect 0,1809,1080,1920]`.

**`ANIM`**: la regia. Per scena:
- `'tipo': 'pieno'` (la grafica è tutta la scena) oppure `ov([...])` (overlay sopra la clip);
- `'camera': [[t, zoom, cx, cy], ...]` per una lenta spinta;
- `'strati': [P('pezzo', [ingresso, quando, durata], fx=[...], figli=[...])]`.

**Ingressi:** `slam`, `pop`, `fade`, `wipe` (si scrive da sinistra), `wipeD` (dall'alto),
`zoom`, `risale`, `slideR`/`slideL`/`slideU`/`slideD`, `drop`, `stampa`, `vola`, `rotola`,
`strappa`, `tape`, `neon`, `apri`, `bandaSu`/`bandaGiu`.
**Effetti:** `['bagliore', t, durata]`, `['pulsa', t, periodo, ampiezza]`,
`['sposta', t, durata, dx, dy]`, `['ondeggia', periodo, gradi]`, `['lampeggia', ...]`,
`['grigio', t]`.
**Disegni** (`DIS(tipo=...)`): `barra` (barratura rossa che si traccia), `torta`,
`contatore` (numero che sale, senza separatore delle migliaia), `anelli`, `alone`,
`riquadro`, `banda`, `lancetta`, `cifre`.

**Quando:** un numero (secondi dall'inizio della scena) o un'**ancora su una parola** della
voce: `'parola'` (prima occorrenza), `'parola#2'`, `'parola+0.3'`, `'parola$'` (fine
parola). Le parole si scrivono **minuscole, senza accenti né apostrofi**: «L'indennità» →
`'lindennita'`.

**Regole di regia:**
- seguire il campo «Regia» del pacchetto;
- ogni pezzo entra **quando la voce lo nomina**;
- un pezzo che non viene nominato entra su una parola vicina, mai nell'ultimo secondo della
  scena: se ci entra, si sposta prima;
- titoli: `slam` a 0,05 s e 0,35 s.

### 4.2 Ritaglio e ritocchi

```
cd progetti
SERIE=strumenti/<nome>/serie.py python3 strumenti/chicedomani/pezzi.py <parola-del-nome-cartella>
python3 strumenti/<nome>/serie.py ritocca     # se servono ritocchi dei fondi
python3 strumenti/<nome>/serie.py             # -> grafica/anim.json
```

**Controllo dei fondi** (`grafica/pezzi/SNN/fondo.png`): si guarda un foglio con tutti i
fondi. Difetti tipici e rimedi già usati (`ritocca()` in `coordinamento/serie.py`):
- macchie dove si è riempito un buco su foto sfocata → sfocare il fondo (tutto o solo lì,
  con bordo sfumato);
- «tinta» che prende il colore sbagliato vicino a una banda → ridipingere quel rettangolo
  col colore del fondo;
- bordi di pallini rimasti → maschera di qualche pixel più grande.

`ritocca` va rilanciato **una sola volta dopo ogni** `pezzi.py`, perché sfoca di nuovo
quello che trova.

---

## 5. Montaggio

```
python3 strumenti/chicedomani/monta.py pdro-<nome> PDRO_<Titolo>_9x16
python3 strumenti/chicedomani/sottotitoli.py pdro-<nome>
```

Il montaggio è locale con ffmpeg, **non** con `create_video_from_studio` come propongono i
pacchetti; va scritto nel registro. `monta.py` fa:
- il livello grafico di ogni scena dal motore (`montaggio/G_SNN`);
- le clip adattate a 1080x1920 e rallentate se più corte della voce;
- il logo CISL FP Padova Rovigo in alto a sinistra (sotto la banda nera nelle scene con clip);
- l'avatar `webm` in basso a destra nella chiusura;
- l'audio.

I sottotitoli **non sono impressi**: `sottotitoli.srt` va a parte. Se si cambia la regia di una
scena, si cancella `montaggio/G_SNN.*` e si rilancia `monta.py`.
**Musica:** non si aggiunge; si segnala nel registro.

---

## 6. Controlli prima della consegna

1. **Foglio di fotogrammi** ogni 2,5 s (`foglio2.py`), da guardare scena per scena:
   - ogni pezzo entra sulla parola giusta;
   - nessun buco o macchia nei fondi;
   - nessun pezzo che arriva troppo tardi;
   - l'avatar non copre niente.
2. **Labiale:** correlazione fra l'audio di `avatar.webm` e `voce-avatar.mp3`; lo scarto
   deve essere costante e sotto i 40 ms.
3. **Durata:** circa la somma delle voci (il pacchetto ne dà una stima).

---

## 7. Consegna

1. **Copia d'invio** `_invio.mp4` sotto i 30 MB: due passate,
   `bitrate = 27,8·8·1024/durata − 96` kbps.
2. **Originale su HeyGen come asset** (massimo 200 MB). Si dà il link
   `https://resource2.heygen.ai/video/<asset_id>/original.mp4` e si controlla che risponda
   206 a `curl -r 0-100`.
3. **`REGISTRO.md`** nella cartella del progetto, con:
   - le scelte di Achille;
   - per le voci, gli ID delle richieste, i grezzi, i tagli e una tabella delle scene;
   - gli ID di asset, clip e avatar;
   - la regia scena per scena;
   - le caratteristiche dell'uscita e il link HeyGen;
   - «Da fare (Achille)».
4. **Commit e push** sul ramo di lavoro. Mai committare `.mp4 .webm .wav .mov .m4a`.
5. **Invio** con SendUserFile della copia `_invio.mp4` e di `sottotitoli.srt`.
6. **Messaggio ad Achille**, breve:
   - durata e link all'originale;
   - che cosa si è fatto diversamente dalle istruzioni del pacchetto e perché (atempo,
     montaggio locale, animazioni non possibili);
   - i controlli che il pacchetto chiede prima di pubblicare (quote, scadenze, riferimenti
     che invecchiano).
