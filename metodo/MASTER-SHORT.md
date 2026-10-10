# MASTER — video brevi su modello di un riferimento

**Documento portatile, da incollare in una chat nuova di Claude Code.** Serve
a rifare, con lo stesso sistema dei corsi CISL (slide animate + voce +
montaggio), un video **simile a un video di riferimento** che l'utente
indica: di solito un Short di YouTube, un Reel o un video Facebook.

Il metodo completo, con il codice di tutti gli strumenti, è in
`metodo/MASTER-PORTATILE.md` di questa stessa repository. Questo file dice
**che cosa cambia** per i video brevi e **come si parte da un riferimento**;
per tutto il resto rimanda lì, sezione per sezione.

---

# 0. Le regole fisse, che non si ridiscutono

| | |
|---|---|
| **voce** | ElevenLabs, modello **`eleven_v4`, sempre**. Mai v3, mai multilingual |
| **chi sceglie la voce** | l'utente. Se non l'ha detta: `creative_list_voices`, si propongono 3 voci adatte e si aspetta la scelta. Un `voice_id` viene solo da quella lista o dall'utente, mai dalla memoria |
| **lingua** | `language_code` del modello v4 (`it` per l'italiano) |
| **fatti** | nessun dato inventato: i contenuti vengono dall'utente o da una fonte che l'utente approva |
| **marchio altrui** | il riferimento si imita nello **stile** (ritmo, impaginazione, tipo di grafica), mai nel marchio, nel logo, nel volto o nel nome di chi l'ha fatto |
| **montaggio** | HeyGen `create_video_from_studio`, come per i corsi; in più un montato locale ffmpeg, che è il controllo e, se serve, il file da consegnare |

> **Perché v4 cambia il modo di scrivere il copione.** Il v4 accetta solo due
> parametri, la voce e la lingua (`creative_get_model_schema`): niente
> stabilità, niente stile. Tutto il resto lo fa il testo. Le regole della
> guida ElevenLabs per v4:
>
> - **i tag fra quadre funzionano**, e la voce li recita: `[excited]`,
>   `[warmly]`, `[softly]`, `[pause]`, `[short pause]`. Un tag vale fino al
>   successivo, quindi va messo **dove cambia il tono**, non a ogni frase. Si
>   scrivono in inglese, sono parole semplici e descrivono come si dice la
>   battuta, non che cosa fa chi parla (`[grinning]` non viene recitato);
> - **i numeri restano come sono scritti**: «19,99 €», «2026», «118». Non si
>   scrivono per esteso come si faceva con i modelli vecchi;
> - **una pronuncia difficile** si corregge scrivendo la parola in IPA fra
>   barre (`/ʃɪˈvɔːn/`), solo dove la voce sbaglierebbe di sicuro;
> - **le pause** vengono da virgole, punti, puntini (…) e dai tag `[pause]`.
>   `<break time>` non è per il v4.
>
> I tag vanno tolti prima di ogni confronto con la trascrizione: lo fa già
> `verifica-testo.py` con `re.sub(r"\[[^\]]*\]\s*", "", testo)`.

> **La velocità di lettura del v4 non è quella del v3.** Il 17,0 car/s del
> MASTER è misurato su v3 con la voce GianP. Sul v4 e con un'altra voce **si
> rimisura alla prima traccia** (§3), e il `MIRA` di `tagli.py` si tara su
> quel numero. Fino ad allora per le stime si usa 15,5 car/s, che è prudente.

---

# 1. Fase zero: guardare il riferimento prima di scrivere una riga

Non si rifà un video che non si è visto. La fase zero produce **una scheda di
stile**, `riferimento/SCHEDA.md`, e tutto il resto si decide su quella.

## 1.1 Procurarsi il video

Da questo ambiente cloud **YouTube e Facebook sono bloccati** dalla politica
di rete (`CONNECT 403`, `ENOTFOUND`). Tre strade, in ordine:

1. **l'utente carica il file** (mp4) nella chat. È la strada migliore: si
   misura tutto in locale, ed è l'unica che funziona per Facebook;
2. **YouTube via Higgsfield**: `video_analysis_create` con `youtube_url`
   accetta solo link youtube.com / youtu.be. Restituisce l'analisi scena per
   scena, ma **è una coda**: di norma 3-5 minuti, una volta è rimasta in coda
   oltre mezz'ora. Si lancia subito e intanto si lavora ad altro;
3. **la descrizione dell'utente**, se le prime due non ci sono: durata,
   formato, che cosa si vede, che voce, che scritte. È la più debole e la
   scheda lo dichiara.

## 1.2 Misurare (file in locale)

```
python3 metodo/short/analizza-riferimento.py riferimento.mp4 riferimento/
```

Scrive `misure.json` (formato, durata, fps, i tempi di ogni taglio di scena,
la durata di ogni inquadratura), un provino per inquadratura, un foglio unico
`provino.png` e l'audio estratto. Poi:

- **si guarda `provino.png`** (Read sull'immagine) e i provini singoli dove
  serve. La misura dice *dove* sono i tagli, non *che cosa* c'è dentro;
- **si trascrive `audio.mp3`** con ElevenLabs: `creative_attach_reference_file`
  non serve, perché il file è locale. Quindi `creative_create_asset_upload`,
  PUT dei byte, `creative_finalize_asset_upload`, poi
  `creative_transcribe_audio` con `connect_from` sul nodo dell'asset. Mai
  collegarlo a un nodo voce: torna il testo di partenza, non l'audio;
- dalla trascrizione e dalla durata si calcola la **velocità del parlato** del
  riferimento, in car/s.

## 1.3 La scheda di stile

Si compila **tutta**, con quello che si è misurato e visto, e si mostra
all'utente prima di andare avanti. È l'unico momento in cui si chiede
conferma sullo stile.

```markdown
# Scheda del riferimento

fonte            <link o file> · analizzato con <file locale | Higgsfield | descrizione>
formato          9:16 · 1080x1920 · <fps>
durata           <s>  ·  parlato <s>  ·  <car/s> car/s
inquadrature     <n>  ·  media <s>  ·  da <s> a <s>
apertura         che cosa succede nei primi 2 s (è il gancio)
chiusura         invito finale? logo? schermata ferma?

voce             uomo/donna · tono · ritmo · una o più voci
musica           sì/no · genere · volume rispetto alla voce
effetti          whoosh, pop, clic: dove

grafica          slide tipografiche / illustrazioni / foto / riprese / avatar
scritte          dimensione, posizione, colore, quante parole per volta
sottotitoli      sì/no · parola per parola o frase · colore della parola detta
movimento        come entrano le cose: scatto, scorrimento, zoom, a molla
palette          3-5 colori misurati dai provini

che cosa NON si copia   marchio, logo, volto, nome, musica protetta
```

> **Quello che il sistema non sa rifare, la scheda lo dice subito.** Una
> persona vera in camera, riprese dal vero o un avatar parlante non vengono
> dalle slide. Le strade ci sono (HeyGen avatar, Higgsfield o Veo per le
> riprese generate), ma costano un ordine di grandezza in più: si propongono
> all'utente con il costo, non si scelgono da soli.

---

# 2. L'aritmetica dei video brevi

Il MASTER fa lezioni da nove minuti con 48 blocchi. Un video breve rovescia le
proporzioni: **poche parole, molte inquadrature, tagli rapidi**.

```
caratteri da scrivere = parlato_s × velocità_v4 (15,5 finché non si misura)
blocchi               = inquadrature della scheda (tetto 48 + copertina + chiusura = 50)
caratteri per blocco  = da 25 a 90   (il MASTER: ~186)
durata di un blocco   = da 1,5 a 5 s
```

Un esempio: riferimento da 45 s, 30 inquadrature. Parlato ~40 s → **620
caratteri** in **28 blocchi** da ~22 caratteri, più apertura e chiusura.

> **Una traccia sola, non due.** Le due tracce del MASTER esistono perché la
> voce rifiuta i testi sopra 5.000 caratteri. Un video breve sta sotto i 1.500:
> un solo `chunk.txt`, un solo `grezzo.mp3`. In `tagli.py` lo `STACCO` va
> sull'ultimo blocco, e la traccia B non esiste.

> **La fascia di velocità si allarga in alto.** Nei corsi la fascia era 8,5-21
> car/s. In un video breve un blocco da tre parole detto di slancio arriva a
> 22-23 senza che niente sia sbagliato. Fascia **8-23 car/s**, e il controllo
> che conta resta quello delle pause: il taglio cade dentro una pausa vera?

> **Il tetto di 50 scene vale anche qui**, ed è il servizio di montaggio a
> imporlo. Un riferimento con 70 inquadrature si rifà con 48 blocchi e alcune
> slide che cambiano **dentro** la clip (due stati nella stessa animazione),
> non con 70 scene.

---

# 3. La pipeline

È la stessa del MASTER (§3-§4), con cinque differenze.

```
0. scheda del riferimento        →  riferimento/SCHEDA.md          ⟵ nuova
1. copione                       →  copione/blocchi.json
2. voce v4, una traccia          →  audio/grezzo.mp3               ⟵ costa
3. tagli                         →  audio/blocchi/sNN.mp3
4. slide 1080x1920 + clip        →  slide/png, slide/mp4           ⟵ verticali
5. sottotitoli dentro le clip    →  (parte del passo 4)            ⟵ nuova
6. musica (se la scheda la vuole)→  audio/musica.mp3               ⟵ nuova
7. caricamento + montaggio       →  HeyGen 9:16
8. montato locale + controlli    →  montato.mp4, REGISTRO.md
```

## 3.1 Il copione

Si scrive **sulla scheda**: un blocco per inquadratura del riferimento, la
stessa scansione di gancio, sviluppo e chiusura. Per ogni blocco:
`(id, tipo di slide, posa, testo parlato)` come in `copione/costruisci.py` del
MASTER.

- **il gancio** è il blocco 1: la frase più forte, entro i primi 2 secondi.
  Nessuna copertina ferma davanti: nei video brevi la copertina da 3 s del
  MASTER si toglie, oppure dura 0,5 s;
- **i tag v4** si mettono nel testo parlato, dove il tono cambia
  (`[excited]` sul gancio, `[warmly]` sulla chiusura). Si contano nei
  caratteri della voce ma **non** in quelli dei sottotitoli;
- **le cifre** restano cifre: è il v4 a leggerle.

## 3.2 La voce

```
creative_generate_speech  model_id="eleven_v4"  voice_id=<scelta dell'utente>
                          prompt=<contenuto esatto di chunk.txt>
```

- `language_code` non è un parametro della chiamata: se la voce sbaglia
  lingua, si imposta sul nodo con `creative_update_node` (prima
  `creative_get_model_schema` per il nome esatto);
- la chiamata produce **più varianti** sullo stesso nodo. Si trascrivono
  tutte e si tiene quella con meno scarti dal copione; l'utente può
  sceglierne un'altra;
- **mai una seconda chiamata per riprovare**: fa partire e paga una seconda
  generazione. Le varianti servono proprio a questo;
- appena la traccia c'è: **velocità misurata** = caratteri senza tag ÷
  secondi di parlato dopo `silenceremove`. Quel numero va nel registro e
  diventa il `MIRA` di `tagli.py`.

## 3.3 I tagli

`tagli.py` del MASTER, senza cambiare l'algoritmo (DTW fra punteggiatura e
spezzoni di parlato, soglia di pausa scelta per voto). Due costanti:

```python
STACCO = "<id dell'ultimo blocco>"   # una traccia sola
MIRA   = <velocità misurata sul v4>
```

Nei blocchi molto corti le pause fra una frase e l'altra sono brevi: se il
voto lascia blocchi accorpati, si scende con la soglia minima di pausa
(`dmin`) a 0,12 s. La verifica per trascrizione e `controllo-statistico.py` si
fanno come nel MASTER, ed è più facile: un minuto di audio costa pochi
centesimi.

## 3.4 Slide e clip verticali

Il layout del MASTER è 1920x1080. Per il 9:16 si cambia **il telaio**, non le
librerie (`grafica.mjs`, `figure.mjs` restano):

```js
// slide/layout.mjs — i tre numeri che cambiano
export const W = 1080, H = 1920;
export const MARGINE = 72;               // 16:9 usava 96
export const ZONA_SOTTOTITOLI = [1180, 1560];   // banda libera per i sottotitoli
```

- **la regola del centro**: nei Short l'interfaccia copre il fondo (titolo,
  pulsanti) e il lato destro. Il contenuto sta fra **y 240 e y 1500** e a
  sinistra di x 940. Il controllo geometrico del MASTER (il corpo dentro la
  cornice) si fa contro **questa** cornice, non contro il bordo;
- **una idea per inquadratura**, scritta grande: titolo 96-120 px, testo
  64-80 px. Le figure del MASTER vanno scalate a 0,8;
- **il movimento** si prende dalla scheda: entrata a scatto (0,15 s) se il
  riferimento taglia secco, a molla se rimbalza. Le clip durano quanto
  l'animazione d'ingresso, **1,2-2,0 s** invece di 3,2: dopo, la scena si
  ferma sull'ultimo fotogramma (`playback.mode: "freeze"`), come nel MASTER.

## 3.5 I sottotitoli dentro le clip

HeyGen ha un solo stile di sottotitoli (`caption.style: "default"`), quindi i
sottotitoli **in stile** si disegnano nelle clip, come parte della slide.

- i tempi delle parole si ricavano dal blocco: dopo `applica` si conosce la
  durata di ogni blocco, e dentro il blocco ogni parola dura in proporzione
  ai caratteri (`in_lettere` per i numeri, come il peso di `tagli.py`);
- la clip allora **non** dura 1,5 s: dura quanto il blocco, perché i
  sottotitoli devono scorrere con la voce. Si rendono con `clips.mjs`
  passando la durata del blocco da `blocchi-audio.json`, e la scena usa
  `playback.mode: "fit_to_scene"` solo se la clip è più corta di 0,1 s
  rispetto alla voce, altrimenti `freeze`;
- stile: quello della scheda. Se il riferimento evidenzia la parola detta, la
  parola corrente prende il colore d'accento e le altre restano bianche con
  contorno nero da 6 px;
- `caption: {"file_format": "srt"}` resta nella chiamata di HeyGen: il file
  SRT a parte serve comunque per la pubblicazione.

> **Questa è la differenza più costosa da sbagliare.** Le clip con i
> sottotitoli si rendono **dopo** i tagli della voce, non in parallelo come
> nel MASTER. Se si rendono prima, alla prima correzione di un confine vanno
> rifatte tutte.

## 3.6 La musica

Se la scheda dice musica:

- si genera con ElevenLabs (`node_type: music`, modello di default del
  workspace, `creative_get_flow_node_types`), lunga quanto il video, senza
  voce. Mai prendere la musica del riferimento;
- il servizio di montaggio non ha una traccia di sottofondo globale: la
  musica si mescola **in locale** nel montato (`amix` con la voce a 0 dB e la
  musica fra -20 e -16 dB, `sidechaincompress` per abbassarla quando si
  parla). In quel caso il file da consegnare è il **montato locale**, e il
  render HeyGen resta come controllo.

## 3.7 Caricamento e montaggio

Come il MASTER §6-§7. Cambiano tre valori:

```
create_video_from_studio  aspectRatio "9:16"  resolution "1080p"
                          caption {"file_format": "srt"}
copertina                 image, duration 0.5 (o assente)
chiusura                  image, duration 2-3 (invito finale), non 10
```

Le regole che costano un render restano identiche: scene video con
`audio_asset_id` e `playback: {mode: "freeze", mute: true}`, scene immagine
con `duration`, lotto di caricamento fino a 100 file e si aspetta che il
conteggio degli item arrivi al totale.

---

# 4. I controlli prima di consegnare

Gli otto controlli del MASTER (§6), con questi valori:

| controllo | corsi | video brevi |
|---|---|---|
| durata | ≥ 8 minuti | entro ±10% della scheda |
| fascia car/s | 8,5-21 | 8-23 |
| scene | 50/50 | quante ne ha chiesto la scheda, ≤ 50 |
| sottotitoli | SRT di HeyGen | SRT **e** sottotitoli nelle clip, con gli stessi testi |
| zona sicura | cornice della slide | contenuto fra y 240 e 1500, x < 940 |
| gancio | — | prima parola detta entro 0,8 s dall'inizio |

E un controllo in più, che si fa guardando: **il provino del nostro video
accanto a quello del riferimento** (`analizza-riferimento.py` sul montato
locale, poi i due `provino.png` uno accanto all'altro). Se il ritmo dei tagli
o la densità delle scritte sono diversi, si vede lì prima che lo veda
l'utente.

---

# 5. Il registro

`REGISTRO.md` come nel MASTER, con in più in cima:

```
riferimento      <link> · scheda in riferimento/SCHEDA.md
voce             <nome> (<voice_id>) · eleven_v4 · lingua <codice>
velocità v4      <car/s misurati>  ·  MIRA <valore>
variante scelta  <generation_id> e perché
```

E la sezione «Da verificare» dice sempre quanto del riferimento **non** si è
potuto rifare (persone in camera, riprese, musica protetta) e che cosa si è
messo al suo posto.

---

# 6. Come si parte in una chat nuova

1. Leggere questo file, poi le sezioni del MASTER che richiama (§2, §4, §6,
   §7 e il codice al §10);
2. preparare l'ambiente: `pip install imageio-ffmpeg`, Node 22 con
   Playwright (Chromium è già in `/opt/pw-browsers`, non fare
   `playwright install`);
3. chiedere all'utente il riferimento (file o link) e la voce;
4. fase zero → scheda → conferma dell'utente sullo stile;
5. copione → conferma dell'utente sul testo (la voce si genera solo a
   copione fermo: rigenerarla costa);
6. il resto della pipeline senza fermarsi, commit e push a ogni passo.

Le domande da fare sono solo queste tre: **il riferimento**, **la voce**,
**l'argomento** del video nuovo (con le fonti, se ci sono dati). Formato,
numero di scene, durata dei blocchi e stile delle animazioni vengono dalla
scheda, e non si chiedono.
