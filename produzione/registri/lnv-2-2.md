# Registro — 2.2 «Il FACS: cos'è e a cosa serve davvero»

Prende lo strumento che dà autorevolezza scientifica a mezzo settore e spiega
che cosa fa davvero: descrive movimenti, non legge persone. È la lezione che
consegna una domanda da usare fuori da qui — «per fare cosa, esattamente?».

| campo | valore |
|---|---|
| video_id | `2adbe9f7e36bcf736c723adc48b2900c` |
| scene | 50 — copertina, 48 blocchi, chiusura |
| formato | 16:9, 1080p |
| durata | 598,9 s (9:59) |
| parlato | 587,1 s |
| voce | Luca Ward `tVdVcJPudubxmTmAw4tE`, `eleven_v4`, 1,12× in post |
| flow ElevenLabs | `q8kLJpmNlIlUOLv8osoq` |
| tracce | A `ybbu8kuNSuATcOWHJc0D` · B `ffwnK1KGkpLGl1poa6AS` · C `PNyfdrJhMK7GamS18iCE` |

## Il copione è stato riscritto

Da **3.924** caratteri dichiarati dallo script a **10.421**, media 217 per
blocco: è il raddoppio più largo di tutto il corso finora. Lo script aveva
tutte le affermazioni giuste e quasi nessuna delle ragioni.

- **perché un alfabeto serve**: senza, ogni laboratorio descriverebbe la
  stessa faccia con parole sue e nessuno potrebbe replicare niente;
- **che cosa significa «descrittivo»**: tre informazioni per movimento —
  quale unità, quale intensità, quanto a lungo — e nessuna parola che somigli
  al nome di uno stato d'animo;
- **perché la lentezza è un argomento e non un dettaglio**: se annotare pochi
  minuti richiede ore, l'uso in tempo reale non è impreciso, è impossibile;
- **come funziona una credenziale**: il nome trasferisce autorevolezza a una
  tecnica che non ha dimostrato niente, e l'autorevolezza viaggia mentre la
  verifica resta ferma;
- **perché la domanda funziona**: non accusa nessuno, chiede un chiarimento, e
  chi non ha la risposta cambia argomento — che è già l'informazione.

## Note di contenuto

**Vincolo di copyright dichiarato e non tagliato.** Lo script lo chiede
esplicitamente: la scena 13 non va tolta. Qui occupa i blocchi `s38`–`s41`, ed
è detta per intero, con i due motivi — che è corretto dirlo, e che chi mostra
quelle tabelle sta dando un'indicazione su come tratta la materia.

**Nessuna tabella FACS, in nessuna forma.** Non c'è una sola slide che
riproduca unità, codici o intensità. Le due tabelle della lezione — i quattro
usi veri e le tre risposte possibili — riguardano l'**uso** dello strumento,
non il suo contenuto.

**Nessuna formulazione sulla menzogna.** Il tema compare solo per dire che il
sistema non è mai stato progettato per quello, e il rimando è alla 2.4.

Nel copione l'acronimo è scritto `facs` perché la voce lo legge come una
parola, e Ekman come `Écman`.

## Le grafiche

Quarantasette slide, di cui **sei con un disegno** e **una ciclica**: `c26`.

| slide | tipo | cosa mostra |
|---|---|---|
| `c09` | strati | Non una lista di espressioni. Una lista di movimenti possibili. |
| `c18` | ponte | Il FACS ti porta fino al bordo di quel passaggio e si ferma lì. |
| `c22` | barre | pochi minuti di filmato, molte ore di lavoro |
| `c25` | flusso | Il nome fa tutto il lavoro, e la tecnica non deve dimostrare niente. |
| `c26` | bilancia (ciclica) | Alla fine pesa il nome. La verifica non entra mai nel conto. |
| `c35` | finestra | Leggere un volto in tempo reale con precisione è fuori scala. |

Tre disegni hanno richiesto una correzione dopo averli guardati da fermi.
`strati` vuole `{sopra, sotto:[...]}` e non una lista sola — con il campo
sbagliato il renderer si ferma con un errore, che almeno è onesto; usa inoltre
il quadro alto, e l'occhiello finiva addosso al logo, quindi è stato tolto.
L'etichetta di `finestra` sta sopra la finestra ed è centrata su di essa: con
una quota del cinque per cento una frase lunga esce dal quadro a sinistra, ed
è stata accorciata. Il `ponte` aveva l'etichetta su due righe che toccava
l'arco.

## Le tre riprese

| blocco | cosa | perché lì |
|---|---|---|
| `s07` | una lavagna piena di annotazioni, completamente fuori fuoco | sta su «è un sistema per descrivere i movimenti del volto»: si vede che c'è un metodo, non si legge quale |
| `s20` | un orologio da parete senza numeri, stanza di lavoro vuota | sta sulla certificazione e sulla lentezza della codifica: il tema è il tempo |
| `s36` | uno schermo con un grafico fuori fuoco, nessuna etichetta leggibile | sta sulla terza cosa da portare a casa, quella che vale fuori da qui |

Le ho **viste tutte e tre** prima di montarle. Lo schermo è stato generato due
volte: la seconda versione aveva un marchio commerciale leggibile sulla
cornice del monitor, ed è stata scartata in favore della prima.

Una deviazione dallo script, dichiarata: il prompt della scena 7 chiedeva
«luce fredda» per l'orologio. Il mondo visivo del modulo è a luce naturale di
mattina, e quindici riprese che non stanno insieme costano più di quanto renda
una singola inquadratura fredda. L'orologio in una stanza vuota porta il
significato — il tempo che passa — anche a luce calda.

## I tagli — e il controllo che non si è potuto fare

**Stesso limite di tutto il corso.** I crediti ElevenLabs sono a zero e la
trascrizione di verifica non si può fare; la policy di rete chiude
`huggingface.co` e `openaipublic.azureedge.net`, quindi non esiste un
riconoscitore locale di riserva. **I quarantacinque confini non sono stati
verificati parola per parola.**

Il controllo di durata ha però trovato un confine davvero spostato, ed è stato
corretto a mano. Fra `s07` e `s08` lo scarto era **+2,46 / −3,86**: uguale e
opposto, la firma di un confine caduto dentro una frase. La prima proposizione
della `s08` restava sulla ripresa della lavagna. Il confine era finito nella
pausa corta a 83,36 s invece che in quella lunga a 80,22–80,77, e spostandolo
a 80,50 i due scarti sono rientrati. **Dopo una correzione a mano non si può
rifare `allinea`**: azzererebbe `tagli.json`.

Restano **tre confini** oltre 1,5 s: `s10` +2,13 · `s12` −1,69 · `s40` −1,52.
Non sono coppie uguali e opposte — sono blocchi con frasi brevi e molte pause,
che la voce legge più lentamente della media della traccia. Cadono dentro un
silenzio di 0,33 s, 0,65 s e 0,62 s: nessuna parola è spezzata. **Vanno
risentiti quando i crediti tornano.**

## Le pose

28,1 secondi in tutto, distribuiti per tipo di schermata da `script/pose.py`.
Il conto chiude a **587,1 s** di parlato.

## Da verificare

Non sento l'audio e non vedo il montato. Ho controllato tutte e sei le slide
con un disegno e le tre riprese. **I quarantacinque tagli non sono verificati
con la trascrizione**, per i crediti esauriti: vale quanto scritto sopra.

## Blocchi

`·` disegno o infografica · `▪` ripresa

| blocco | slide | tipo | durata (s) | posa (s) |
|---|---|---|---|---|
| s02 | `c02` | frase | 13.45 | +0.18 |
| s03 | `c03` | sostituzione | 11.50 | +1.08 |
| s04 | `c04` | frase | 12.72 | +0.18 |
| s05 | `c05` | frase | 12.30 | +0.18 |
| s06 | `c06` | memo | 12.72 | +0.78 |
| s07 | ▪ lavagna-sfocata | ripresa | 8.87 | — |
| s08 | `c08` | frase | 12.67 | +0.18 |
| s09 | · `c09` | strati | 15.50 | +1.48 |
| s10 | `c10` | schede | 16.01 | +1.08 |
| s11 | `c11` | frase | 12.37 | +0.18 |
| s12 | `c12` | sostituzione | 12.55 | +1.08 |
| s13 | `c13` | frase | 12.51 | +0.18 |
| s14 | `c14` | frase | 11.28 | +0.18 |
| s15 | `c15` | frase | 12.12 | +0.18 |
| s16 | `c16` | tabella | 15.13 | +1.08 |
| s17 | `c17` | frase | 12.99 | +0.18 |
| s18 | · `c18` | ponte | 14.00 | +1.48 |
| s19 | `c19` | frase | 12.02 | +0.18 |
| s20 | ▪ orologio-stanza-vuota | ripresa | 7.27 | — |
| s21 | `c21` | frase | 12.24 | +0.18 |
| s22 | · `c22` | barre | 14.92 | +1.48 |
| s23 | `c23` | frase | 13.46 | +0.18 |
| s24 | `c24` | frase | 12.42 | +0.18 |
| s25 | · `c25` | flusso | 12.79 | +1.48 |
| s26 | · `c26` | bilancia | 15.05 | +1.48 |
| s27 | `c27` | citazione | 13.03 | +0.78 |
| s28 | `c28` | tabella | 11.92 | +1.08 |
| s29 | `c29` | frase | 12.40 | +0.18 |
| s30 | `c30` | frase | 12.63 | +0.18 |
| s31 | `c31` | frase | 12.98 | +0.18 |
| s32 | `c32` | memo | 4.78 | +1.45 |
| s33 | `c33` | elenco | 11.64 | +1.08 |
| s34 | `c34` | frase | 14.07 | +0.18 |
| s35 | · `c35` | finestra | 14.86 | +1.48 |
| s36 | ▪ schermo-sfocato | ripresa | 6.62 | — |
| s37 | `c37` | frase | 11.80 | +0.18 |
| s38 | `c38` | frase | 11.65 | +0.18 |
| s39 | `c39` | memo | 11.39 | +0.78 |
| s40 | `c40` | frase | 10.35 | +0.18 |
| s41 | `c41` | frase | 13.40 | +0.18 |
| s42 | `c42` | elenco | 11.68 | +1.08 |
| s43 | `c43` | frase | 12.25 | +0.18 |
| s44 | `c44` | frase | 12.67 | +0.18 |
| s45 | `c45` | frase | 12.19 | +0.18 |
| s46 | `c46` | frase | 12.27 | +0.18 |
| s47 | `c47` | memo | 4.78 | +2.09 |
| s48 | `c48` | frase | 11.14 | +0.18 |
| s49 | `c49` | sostituzione | 17.73 | +1.08 |
