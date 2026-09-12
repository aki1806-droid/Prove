# Standard di produzione — video YouTube "La Parola Giusta"

Modalità predefinita per ogni video del canale. Approvata da Achille dopo il
VIDEO 03. Non va ridiscussa a ogni video: si applica e basta.

---

## 1. Voce

- Sempre **ElevenLabs**, voce **"Achille nuovo 1"** — `KerPEYZvLEWNATg4AARX`,
  modello `eleven_multilingual_v2`.
- **Mai il TTS di HeyGen** e mai il Video Agent per la voce: producono balbettii
  e artefatti. Questo è stato verificato più volte ed è il motivo della regola.
- Una traccia audio per scena. Il parlato si spezza ai confini di concetto,
  non a caso: ogni blocco è quello che sta sopra una singola inquadratura.
- **Ogni traccia si accelera a 1,12x con ffmpeg** prima di andare in HeyGen. Il
  passo naturale del modello è troppo lento per una lezione; `atempo` cambia la
  velocità senza toccare l'intonazione, quindi il timbro resta identico:
  `ffmpeg -i grezzo.mp3 -filter:a atempo=1.12 -b:a 128k -ar 44100 -ac 1 finale.mp3`
  (ffmpeg si installa con `pip install imageio-ffmpeg`, percorso da
  `imageio_ffmpeg.get_ffmpeg_exe()`).
- **Le pause vanno accorciate in post, sempre.** Il 19% di quello che ElevenLabs
  restituisce e' silenzio oltre un quarto di secondo: le pause interne dei tag
  `<break>` piu' il silenzio che lascia in testa e in coda a ogni blocco. Con
  35-40 blocchi per lezione quel silenzio si somma e il video sembra rallentato.
  Il filtro va **prima** di `atempo`, nella stessa catena:
  `silenceremove=start_periods=1:start_silence=0.03:start_threshold=-45dB:stop_periods=-1:stop_duration=0.20:stop_silence=0.14:stop_threshold=-45dB,atempo=1.12`
  Taglia il silenzio ai bordi e limita ogni pausa interna a **0,14 s**. La soglia
  -45 dB prende solo il silenzio vero, non tocca le parole. Vale un altro 15-20%
  di durata oltre all'accelerazione.
- **Le pause corte valgono sempre, anche quando il contenuto parla di pause.**
  Nella 1.4 (il paraverbale) avevo montato a 1,05x con le pause a 0,6 s per non
  contraddire quello che il video diceva. Achille ha bocciato: le vuole brevi
  comunque, e la lezione e' stata rifatta allo standard. **Non esistono
  eccezioni di ritmo**: se un copione chiede 0,92x o "pause reali", si ignora.
- I tag `<break time="Xs"/>` **non** accorciano e non allungano il totale in modo
  utile: verificato con un A/B, 20,5 s senza contro 20,7 s con. Servono solo a
  suggerire dove sta il respiro, e comunque il filtro qui sopra li ridimensiona.
- **Se serve una voce diversa dalla sua, `eleven_v3` con i tag di intenzione.**
  Usato per il cut alternativo della 2.1 con Luca Ward
  (`tVdVcJPudubxmTmAw4tE`). I tag si scrivono in inglese in testa al blocco —
  `[serious]`, `[emphatic]`, `[thoughtful]`, `[curious]`, `[warm]` — e **non
  vengono letti ad alta voce**: verificato con un A/B piu' `silencedetect`,
  6,32 s con tag contro 6,31 s senza. `[pausa]` invece genera silenzio vero
  (1,65 s) che il filtro poi butta via, quindi non serve a niente: non usarlo.
  Il resto della catena non cambia, filtro e 1,12x come sempre.
- **Su un video senza avatar, genera una traccia sola e poi tagliala.** Con una
  generazione per blocco ogni blocco riparte da zero e si sentono i salti di
  tono fra una scena e l'altra: Achille l'ha bocciato sulla 2.1. Dentro una
  sola generazione la lettura e' continua e il problema non esiste. Il limite
  di `eleven_v3` e' **5000 caratteri**, quindi una lezione da 6000 sta in due
  generazioni: taglia fra le due su uno stacco di capitolo, dove il cambio di
  tono e' voluto. Con la traccia unica servono pochi tag di intenzione, cinque
  o sei alle svolte vere del discorso, non uno per blocco.
- **Come si trova dove tagliare.** `silencedetect` sul grezzo da' i candidati
  (un confine di blocco e' sempre un silenzio, ma non tutti i silenzi sono
  confini: molte pause di frase sono piu' lunghe di quelle di paragrafo).
  Le durate attese si calcolano **nel dominio del parlato**, cioe' al netto dei
  silenzi, se no la varianza delle pause sporca la stima. Poi programmazione
  dinamica monotona per scegliere i candidati.
  **Due cose imparate sulla 3.3, dove il primo allineamento ha sbagliato
  quarantacinque confini su quarantacinque.** La prima: i candidati non sono
  tutti i silenzi, sono **solo i piu' lunghi** — se ne tengono poco piu' dei
  confini da collocare (1,6 volte piu' sei). Fra un blocco e l'altro la pausa
  e' quasi sempre la piu' lunga li' intorno, e togliere di mezzo i respiri di
  meta' frase e' l'unica difesa quando la stima sbaglia di qualche secondo: se
  no il confine si appoggia al respiro piu' vicino e taglia dentro al blocco,
  con una durata che sembra perfino plausibile. La seconda: la stima a
  caratteri da' per scontato che si legga sempre alla stessa velocita', e non
  e' vero — l'apertura di una lezione e' piu' lenta del resto, e li' la stima
  arriva a essere avanti di **quattro secondi e mezzo**. Si corregge da sola
  con un secondo giro: lo scarto del primo, spianato su una decina di confini,
  e' proprio quel rallentamento, e rimesso nella stima sposta i confini che
  erano finiti sulla pausa sbagliata. Fra i due accorgimenti gli errori sono
  passati da quarantacinque a undici, poi a zero con `correggi`.
  Una nota sul mestiere: le durate dei blocchi **non bastano a scoprirlo**.
  Tagliando dopo la prima frase di ogni blocco ogni blocco resta lungo piu' o
  meno quanto deve, e tutti i caratteri al secondo tornano fra 10 e 20. Serve
  la prova trascritta, e se anche quella e' ambigua, la controprova: estrai
  cinque secondi a cavallo di tre confini sospetti e trascrivili — costa
  centotrenta crediti e dice senza discussione se il taglio e' dentro o in
  fondo al blocco.
  **Il risultato va verificato, sempre**: da solo l'allineamento sbaglia (9 su
  36 alla prima passata sulla 2.1). Estrai 1,6 s prima di ogni taglio,
  concatenali separati da silenzio e mandali a `eleven_scribe_v1` in una
  trascrizione sola: il testo dice parola per parola se il taglio cade dove
  deve. Correggi e ripeti finche' non e' pulito. Nota: la trascrizione
  restituisce solo il testo, **non i tempi per parola** — per questo serve la
  prova a finestre. E se la coda di un blocco compare due volte nel copione
  (in 2.1 «buona intenzione» e «quattro motivi») la ricerca automatica sbaglia
  bersaglio: in quel caso prendi il silenzio immediatamente precedente.
  **E leggi le code, non solo gli scarti.** `tagli.py` lascia stare gli
  spostamenti sotto 0,35 s, che di solito sono rumore; ma nella 2.3 la coda
  mancante di s06 era la parola «Tre.» — cinque caratteri, sotto la soglia, e
  la battuta di tutto il blocco. Se manca una parola sola che porta il senso,
  spostalo a mano al silenzio successivo. Nella 2.4 sono usciti gli altri due
  pezzi della stessa regola, ora dentro `tagli.py`: il confine giusto puo'
  essere una pausa **sotto la soglia** (dopo «Perche'.» erano 0,15 s), e il
  confine corrente **non va tenuto fra i candidati** — la coda dice che il
  taglio e' fuori posto, lasciarlo dov'e' contraddice la prova.
  Attenzione anche a come separi le code trascritte. `scribe` scrive
  «Perche'?» con il punto interrogativo, e scrive `dire: "Hai ragione."` con
  il punto **dentro** le virgolette: si separa quindi su `.`, `?` o `!`,
  seguiti eventualmente da una virgoletta di chiusura, poi lo spazio. Un solo
  separatore sbagliato sfasa tutto di uno e fa sembrare sbagliati trentacinque
  confini su quarantatre'. Prima di leggere gli scarti, conta i pezzi: devono
  essere tanti quanti i confini.
  **Contare i pezzi non basta.** Nel modulo 1 lo scriba ha sbagliato due volte
  in modo che il conteggio non vede. Nella 1.3 ha **saltato** la coda di un
  confine: `verifica.py` riappaia per contenuto, quindi non se ne accorge e
  `correggi` lascia quel confine dov'e' — che era quattro secondi e mezzo
  fuori posto. Nella 1.4 ha fatto di peggio: **un pezzo in piu'** (una frase
  interna a un blocco, chiusa da un punto) e **uno in meno**, cosi' i conti
  tornavano — 46 pezzi, 46 confini — ma tre finestre erano sfalsate di uno.
  L'unico controllo che li vede e' il **rapporto caratteri/secondo blocco per
  blocco**, letto su `durate.json` dopo `applica`: fuori dalla banda 8-21 c'e'
  quasi sempre un confine sbagliato, e i vicini dicono da che parte. Due
  blocchi adiacenti a 5 e a 55 caratteri al secondo sono un confine spostato,
  non due blocchi strani. Trovato il punto giusto sui caratteri, si cerca il
  silenzio piu' vicino e si conferma con una **controprova** di tre secondi
  (meno di venti crediti): la finestra deve leggere esattamente la coda del
  blocco, e niente altro.
  Piu' confini da confermare si mettono in **una controprova sola**: si
  ritagliano i tre secondi che precedono ognuno, si concatenano, e si legge la
  trascrizione a spezzoni — tre confini della 4.5 sono costati cinquanta
  crediti in tutto.
  E quando `correggi` torna due volte sullo stesso confine spostandolo di
  poco, non e' che il silenzio non c'e': ce ne sono **troppi**. Succede dove la
  voce legge parole staccate — «Chi. Cosa. Entro quando.» nella 4.5 — e ogni
  stacco e' un candidato. Li' si guarda la mappa dei silenzi a mano, con
  `silencedetect` a `d=0.10` invece che a 0,25, e si sceglie il silenzio
  giusto invece di farlo scegliere all'algoritmo.
  Un caso opposto, dalla 5.4: **code mancanti che non sono confini
  sbagliati**. Se lo scriba smette di mettere i punti unisce due o tre code in
  una frase sola, e `verifica.py` segna quei confini come senza coda pur
  essendo giusti. Si riconosce perche' i pezzi sono *meno* dei confini e le
  code mancanti sono consecutive: prima di muovere niente, si guarda la banda
  caratteri/secondo. Se quei blocchi stanno in banda, era punteggiatura.
  E quando la catena e' scalata di uno, il modo piu' solido di ricostruirla
  non sono i caratteri grezzi ma il **tempo di parlato netto**: si somma la
  durata del parlato fra i due confini certi (silenzi esclusi, con
  `silencedetect`), si divide in proporzione ai caratteri dei blocchi in
  mezzo, e si aggancia ogni punto al silenzio piu' vicino. Sulla 5.1 due
  valori messi cosi' hanno riportato cinque blocchi in banda tutti insieme.
  Il conto sul parlato netto serve anche al contrario, cioe' a **scartare un
  candidato plausibile**: nella 6.1 il silenzio che sembrava il confine giusto
  avrebbe fatto girare la seconda meta' del blocco dopo a trenta caratteri al
  secondo, che questa voce non tiene. Il candidato buono era quello prima.
  Un inganno da conoscere, dalla 6.4: **due blocchi vicini che finiscono con
  le stesse parole**. «...non basta a renderlo un effetto» e «...non e' un
  effetto»: `correggi` ha agganciato la coda al blocco sbagliato e ha tirato
  il confine indietro di cinque secondi, dentro il blocco. La trascrizione non
  se ne accorge — la prova e' la banda, con il blocco a 34 caratteri al
  secondo e il successivo improvvisamente senza coda.
  E un dettaglio di conteggio, dalla 6.5: **il tag audio si conta nei
  caratteri ma non si sente**. Un blocco che comincia con `[thoughtful]` porta
  tredici caratteri muti, che a quella lunghezza valgono due o tre punti di
  banda. Prima di dire che un blocco taggato e' fuori banda, il tag va tolto.
    Una cosa da non fare: **muovere un confine verificato per far tornare un
  numero**. Un blocco a 21-22 caratteri al secondo con i confini confermati
  per contenuto e i vicini in banda e' un passaggio letto veloce, non un
  taglio sbagliato. Si annota nel registro e si va avanti.
  Attenzione, li' dove la voce non fa pausa fra due blocchi — succede quando
  il secondo blocco non comincia con una frase nuova, come il memo spezzato in
  due della 1.5 — non c'e' nessun silenzio da trovare: si sceglie il punto sui
  caratteri e si accetta il taglio secco, tanto la posa che segue rimette il
  respiro.
- **Un blocco da una parola vuole una posa.** «Perche'.» dura 1,3 s e «E poi.»
  ne dura 0,8: il tempo di dire la parola, non quello di leggere la slide. Si
  allungano con `apad` a circa quattro secondi passando `{"s18": 4.0}` ad
  `applica`. La pausa e' anche quello che quelle due parole vogliono.
- **Se la lezione chiede una pausa, mettila davvero.** Nella 2.3 il copione dice
  «adesso stai zitto insieme a me»: dopo quella frase c'e' una scena di otto
  secondi con un b-roll muto e un letto di musica, e nessun parlato. Una scena
  cosi' risolve anche due cose per conto suo: porta il proprio audio, quindi
  non incappa nella trappola della scena `video` muta, ed e' il posto giusto in
  cui far cadere la giunzione fra le due generazioni della voce.
- **Nel layout `figure` la didascalia sta in una riga**, circa cinquanta
  caratteri. Se va a capo spinge su tutto il disegno e il sommario finisce
  addosso al logo.
- **Come si porta la prova a ElevenLabs.** Il giro sicuro e' via HeyGen:
  `create_asset_upload` -> PUT dei byte -> `complete_asset_upload`, che
  restituisce un URL pubblico, e quello si passa a
  `creative_attach_reference_file`. Il caricamento diretto
  (`creative_create_asset_upload`) a volte c'e' e a volte e' bloccato da una
  regola di permessi: se c'e' fa risparmiare tre chiamate, ma non ci si conta.
- **La pausa fra le finestre della prova e' 2,5 s**, non 1,5. Con 1,5 s
  `scribe` a volte non chiude la frase e due code finiscono attaccate: il
  confronto si sfasa di uno e sembra che sia sbagliato mezzo montaggio.
- **Higgsfield rifiuta prompt innocui come «nsfw».** Sul modulo 3 e' successo
  due volte, sempre sulla stessa causa: **persone descritte in modo generico**
  («two people... faces not identifiable») e **la parola «bed»** («a chair
  beside a neatly made bed»). Non c'e' da discutere col filtro: si riscrive.
  Nomina i vestiti e l'inquadratura al posto di «people» («two colleagues in
  office clothes, seen from behind»), e sostituisci l'oggetto incriminato con
  uno che porta la stessa immagine (la poltrona vuota al posto del letto).
  Ha funzionato al primo colpo tutte e due le volte.
- **Riprese generate: Higgsfield costa un ordine di grandezza meno.** 32,5
  crediti per 5 s di video e 2 per un'immagine, contro i 400 crediti dei 5 s
  di Artlist. Ma il proxy blocca il suo CDN in scaricamento: i byte qui non
  arrivano. HeyGen se li prende da se' passandogli l'`url` della scena — un
  montaggio di prova da due scene lo conferma in pochi secondi e costa
  briciole, **fallo prima di impegnare il render intero**. Conseguenza da
  tenere a mente: quelle immagini **non si possono comporre sotto il testo**,
  vanno usate come scene intere con il parlato sopra, e **non si possono
  guardare** prima del montato. Su ElevenLabs sarebbero scaricabili e quindi
  controllabili, ma costano 818 crediti l'una.
- **Una scena `video` senza parlato non dura quanto la clip.** Montando
  copertina e chiusura come scene `video` senza `audio_asset_id`, HeyGen ha
  reso in un secondo una clip da dieci. Si ancora la scena a una traccia muta
  della durata esatta
  (`ffmpeg -f lavfi -t 10 -i anullsrc=r=44100:cl=mono ... muto_10.mp3`),
  passata come `audio_asset_id` con `playback.mode = "freeze"`.
- **Controlla sempre la durata del render contro la somma attesa dei blocchi.**
  E' un conto da un secondo e ha trovato questo difetto: 5:42 invece di 5:51.
- In HeyGen la traccia si passa come **`audio_asset_id`**, non come `audio_url`:
  si carica il file già accelerato come asset (vedi sotto) e non scade mai.

### Quanto testo serve per una durata

Il conteggio dei caratteri di `blocchi.json` **non** predice niente, perche'
include i tag `<break>`: la 1.3 aveva 6725 caratteri in 379 s di grezzo, la 1.4
ne aveva 5304 negli stessi 379 s. Tolti i tag il ritmo e' stabile: **16,9
caratteri di testo netto al secondo di parlato**, misurato su due lezioni
(17,02 e 16,75).

```
grezzo  = testo_senza_tag / 16,9 + somma dei <break>
montato = grezzo x 0,764        (pause a 0,14 s + atempo 1,12)
video   = montato + copertina + chiusura
```

Verificato sulla 1.5: previsti 417 s di grezzo, misurati 416,7.
Scorciatoia che vale quanto la formula: **18,6 caratteri di testo netto per
secondo di video finito** (misurato sulla 2.1: 6022 caratteri -> 323,3 s).
Con le pause corte i tag `<break>` contano poco, perche' vengono tagliati a
0,14 s comunque: meglio metterne pochi e brevi, costano meno crediti.

In pratica: **una lezione da 6:00 vuole circa 6.500 caratteri di testo netto**,
distribuiti su 39-40 blocchi. Conviene stimare *prima* di generare le tracce,
perche' gli script di partenza sono sempre corti di un terzo e vanno allungati.

## 2. Avatar

- **Look unico, canale e corso: `89cf01e0c22547169c460186be0c67a8`** ("Aki in his
  studio"). Achille l'ha indicato per identificativo: **è il default dalla lezione
  1.3 in poi e non si torna a chiedere**. È lo stesso già usato nei video del
  canale e nella lezione 1.1.
- Anche la 1.2 usa questo look, dalla versione con le pause corte in poi. Il look
  `d679a1daf79e4597ab5ffbea8ad495e9` della prima versione **non esiste più** nella
  libreria: HeyGen risponde `Avatar not found` e rifiuta il montaggio.
- Regola che ne discende: **un look può sparire fra un montaggio e l'altro**, quindi
  un video vecchio non si rimonta dando per scontato il suo avatar. `get_video_scenes`
  restituisce l'`avatar_id` scena per scena di un video già fatto: è l'unico modo
  affidabile per sapere su cosa era montato, e `list_avatar_looks` dice se c'è ancora.
- Il gruppo "Aki" `2ecf65e58df54cd7bda384da43c27f2d` contiene 57 look, elencabili
  con `list_avatar_looks`. **Le anteprime non sono visibili da qui**: il proxy
  blocca `files2.heygen.ai`, e i nomi non descrivono l'immagine (vedi sopra).
  Quindi non proporre look a memoria o per nome come se si sapesse cosa
  mostrano: se serve cambiare, si guarda la libreria su app.heygen.com.
  Scartare i look con `preferred_orientation: portrait`: il 16:9 li taglia.
- **Nessuno scontorno** (niente `removeBackground`), **nessuna grafica
  sovrapposta all'avatar**. Achille ha bocciato esplicitamente il ritaglio.
  Sopra l'avatar può esserci solo il sottotitolo.
- L'avatar copre circa un terzo del minutaggio: è la voce narrante, non il
  contenitore di tutto.

## 3. Slide e grafiche — la parte più importante

Servono **molte** slide a piena inquadratura, non solo per le frasi a effetto:

- una slide per **ogni concetto chiave**;
- una slide per **ogni elenco** (i tre punti, le tre cose da preparare, le
  alternative se il budget è bloccato...): l'elenco va visto, non solo sentito;
- una slide per **ogni cosa da ricordare** — quello che lo spettatore dovrebbe
  segnarsi;
- le frasi-modello (quelle che funzionano e quelle che non funzionano) vanno
  sempre a schermo, tra caporali.

Layout disponibili in `script/cards.mjs`:

| layout | quando |
|---|---|
| `statement` | affermazione secca, una o due righe |
| `quote` | frase da dire davvero, tra « » |
| `num` | punto numerato di un elenco (numerale grande + etichetta) |
| `list` | elenco di 2-5 voci sulla stessa slide |

Durate: la **slide di copertina dura 3 secondi**, non di più — fra il titolo e la
prima parola non deve esserci attesa. La slide di chiusura sta sui 10 secondi.
Tutte le altre slide non hanno durata propria: la prende l'audio che ci sta sopra.

Regole grafiche: marchio LPG **in alto a sinistra su ogni slide**, stessa
coordinata sempre. Fondo blu notte, testo avorio, accento oro sulla parte che
porta il senso.

Palette e caratteri, **video del canale**:
- blu notte `#032B54` · avorio `#F6F3EA` · oro `#C39951`
- titoli **Playfair Display** 700 · sopratitoli **Inter** 600 maiuscoletto spaziato

Palette e caratteri, **corso "Dire, ascoltare, convincere"** (diversi, definiti
negli script delle lezioni — si usa `script/cards_corso.mjs`):
- blu `#12294A` · avorio `#F7F3EA` · oro `#C39A4E` · oro tenue `#E2D2B0`
  (slide errori) · blu profondo `#0B1B33` (memo) · grigio `#69748A`
- frasi **Cormorant Garamond** · etichette ed elenchi **Jost**
- i tag `<break time="1.0s"/>` degli script vanno lasciati nel testo: ElevenLabs
  li rende. La velocità 0,95× invece non è applicabile — generando la voce su
  ElevenLabs non c'è quel parametro, il ritmo lo fanno le pause.
- copertine e chiusure sono mute: la musica la aggiunge Achille in coda, qui
  non c'è modo di mixare l'audio.

- **Nei titoli in Cormorant i numeri vanno scritti a parole.** Il Cormorant
  Garamond usa cifre di stile antico: in «Fine del Modulo 1» la `1` esce bassa e
  si legge come una `I`, cioe' «Modulo I». Scrivere «Fine del primo modulo».
  Nelle etichette e negli elenchi in Jost le cifre vanno bene.
- Il layout `closing` accetta anche `title` e `sub` oltre al logo esteso: serve
  per le chiusure di modulo, che durano **15 s** invece di 10 e annunciano il
  modulo successivo.

## 4. Immagini e clip

- B-roll **evocativo e coerente col discorso**, mai decorativo: la porta chiusa
  quando si parla di bussare, le bollette quando si parla di bisogno, il tavolo
  vuoto quando si parla di trattativa.
- Generate su Artlist: `generate_image` (Nano Banana 2, 2K) e `generate_video`
  (Kling 2.6 Pro, 5 s 1080p). Stile: fotografia documentaristica editoriale,
  luce calda, nessun volto riconoscibile.
- Le clip durano 5 s: sotto un blocco di voce più lungo vanno messe in
  `playback: {mode: "fit_to_scene", mute: true}`, così rallentano invece di
  ripetersi o congelarsi.

## 5. Output

- 16:9, 1080p.
- Sottotitoli **impressi**: `caption: {file_format: "srt", style: "default"}`.
  Funziona anche con audio esterno — HeyGen trascrive la traccia.
- Montaggio in **una sola** chiamata `create_video_from_studio` (max 50 scene).

## 6. Trappole già incontrate — non ripeterle

- **Gli mp3 di ElevenLabs vanno ri-encodati prima di caricarli su HeyGen.**
  Presi così come arrivano, l'API li registra come `application/octet-stream` e
  li rifiuta anche dichiarando `audio/mpeg`. Passati per ffmpeg (lo stesso
  comando che li accelera a 1,12x) vengono accettati senza problemi. Procedura:
  `create_asset_upload_batch` → PUT su ogni URL firmato con gli header
  `Content-Type: audio/mpeg` e `x-amz-server-side-encryption: AES256` →
  `complete_asset_batch` → si attende `completed` con `get_asset_batch`.
  Questo risolve anche la scadenza degli URL: gli asset non scadono.
- **Gli URL firmati ElevenLabs scadono in 2 ore** (problema aggirato dagli asset
  permanenti, ma resta valido se per qualche motivo si torna a `audio_url`).
  Vecchia nota: Si rigenerano con
  `creative_get_flow_run_status(flow_id, session_ids)`, che restituisce un URL
  nuovo. Vanno quindi raccolti **poco prima** del montaggio, non all'inizio.
  Per questo il registro di ogni video conserva flow_id e session_id di ogni traccia.
- **`creative_generate_speech` ha `generations_count` a 4 di default**: mettere
  sempre 1, altrimenti costa quattro volte tanto.
- **Il Video Agent non è affidabile**: dichiara di aver applicato parametri che
  non applica, sbaglia brand kit, e il `video_id` della sessione può restare
  `pending` per sempre mentre il video vero è un altro (si ritrova con
  `list_videos`). Si usa il montaggio diretto da studio.
- **Il logo del marchio è blu notte + oro**: su fondo blu la parte blu sparisce.
  Va usata la versione negativa, `script/logo_negativo.py`. Il logo esteso
  (`logo_lpg_esteso.png`) sta su fondo avorio ed è per copertine e chiusure.
- **Chromium non raggiunge fonts.googleapis.com**, e non lo segnala: le slide
  escono con i caratteri di sistema e il render non dà errore. I woff2 vanno
  incorporati come data URI — `script/fonts_embed.py` li scarica con curl (che
  invece passa) e scrive `fonts_canale.css` e `fonts_corso.css`. Le slide del
  VIDEO 02 e del VIDEO 03 sono state prodotte prima di questa scoperta, quindi
  hanno i caratteri sbagliati: vanno rigenerate.
- Il proxy di rete **blocca** `laparolagiusta.it`, `files2.heygen.ai`,
  `resource2.heygen.ai`. Passano `fonts.googleapis.com`, `storage.googleapis.com`,
  `cms-toolkit-artifacts.artlist.io`, `heygen-resources-prod.s3-accelerate.amazonaws.com`.

## 7. Ordine di lavoro

1. Spezzare lo script in blocchi (un blocco = una scena) segnando per ciascuno
   che cosa si vede: avatar, slide, immagine o clip.
2. Generare le tracce ElevenLabs, una per blocco. Annotare flow_id e session_id.
3. Renderizzare le slide con `script/cards.mjs` e caricarle come asset HeyGen.
4. Generare le immagini e le clip Artlist mancanti.
5. Raccogliere gli URL audio freschi e montare in una sola chiamata.
6. Aggiornare il registro del video in `produzione/registri/`.

## 8. Da fare quando c'è tempo

Formati derivati già chiesti e non ancora prodotti: short 9:16, caroselli
Instagram, copertine YouTube.
