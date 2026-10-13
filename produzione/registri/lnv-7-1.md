# Registro — 7.1 «Il primo minuto»

Il modulo 7 non introduce segnali nuovi: mette al lavoro quelli dei sei
moduli precedenti in cinque situazioni che chiunque conosce. La prima è
l'inizio di un incontro, e la lezione parte da una constatazione che rovescia
l'aspettativa di chi ha fatto il corso: **nel primo minuto non si legge
niente**, perché non c'è ancora la linea di base. Qualunque impressione ti
fai lì è fatta con il tuo metro, non con il suo — è la 1.4 nella sua
applicazione più scomoda, perché il primo minuto è proprio quello in cui
l'impressione si forma più in fretta e con più sicurezza.

Quello che si può fare è una cosa sola: **tarare**. Gli argomenti sono
neutri, l'altro è vicino al suo normale, e i convenevoli che molti tagliano
per efficienza diventano l'unico momento dell'incontro in cui si costruisce
il metro. Poi l'altra metà, quella più lunga: l'impressione che l'altro si fa
di te, con gli stessi strumenti sbagliati, e le quattro cose che decidi tu —
il ritmo con cui entri, dove guardi nei primi dieci secondi, che cosa fanno
le mani, la prima frase. E l'errore specifico di chi ha appena fatto un corso
come questo: **osservare invece di ascoltare**.

| campo | valore |
|---|---|
| video_id | `ad0dd8d6e70a5b3a22605ed94fe976df` |
| scene | 50 — copertina, 48 blocchi, chiusura |
| formato | 16:9, 1080p |
| durata | 598,7 s (9:59) — misurata sul montato |
| parlato | 586,9 s (549,1 s di voce tagliata + 37,9 s di pose) |
| voce | Luca Ward `e4bd8d8a357f41a99502309874733c16` su HeyGen, `create_speech` con `engine: "elevenlabs"` e `eleven_v4`, **1,16×** in post |
| tracce | cinque: A `s02`–`s08` · B `s09`–`s17` · C `s18`–`s29` · D `s30`–`s41` · E `s42`–`s49` |
| batch HeyGen | `963993838d4841b2a937e6eea5f44192`, 95 file |
| costo | **39 crediti HeyGen** di voce + **1** di render |

## La prima lezione fatta con la strada HeyGen

È la prova decisa per il modulo 7: la stessa voce e lo stesso modello, ma
generati con `create_speech` di HeyGen invece che con i nodi `tts` di
ElevenLabs. I risultati, misurati sulla lezione vera e non sui campioni:

**Il ritmo torna.** Con `atempo` 1,16 la voce tagliata dura 549,1 s, contro i
550,5 della 6.5 fatta con ElevenLabs diretto a 1,12. La correzione dell'1,16
calcolata sui campioni era giusta: la lezione suona alla stessa velocità
delle trentaquattro precedenti.

**I confini non si cercano più: si costruiscono.** I blocchi di una traccia
si uniscono con `<break time="1.6s"/>`, HeyGen lo rispetta alla lettera, e
`script/confini_heygen.py` taglia a metà di ogni silenzio oltre la soglia.
**Quarantatré confini su quarantatré al primo colpo**, senza trascrizione,
senza `banda.py`, senza `correggi`, senza clip di controllo. Il controllo
incrociato con i tempi parola per parola che `create_speech` restituisce
insieme all'audio dà uno scarto massimo di 0,053 s. Per confronto, il modulo
6 aveva tredici confini sbagliati su 225, e ogni lezione costava 1.001
crediti di trascrizione per trovarli.

**La soglia è stata spostata dopo la misura.** Lo script è nato con 1,2 s.
Sulle cinque tracce la pausa naturale più lunga dentro un blocco è di
**0,89 s** (traccia E), la pausa di confine più corta di **1,29 s** (traccia
B): con 1,2 il margine sopra la soglia era di nove centesimi. Portata a
**1,1**, a metà fra le due; i tagli rifatti con la soglia nuova sono
identici bit per bit.

| traccia | caratteri | grezzo | confini | pausa interna max | pausa di confine min |
|---|---|---|---|---|---|
| A | 1.823 | 115,0 s | 6 | 0,69 s | 1,34 s |
| B | 2.042 | 130,6 s | 8 | 0,51 s | 1,29 s |
| C | 2.790 | 173,6 s | 11 | 0,66 s | 1,34 s |
| D | 2.913 | 176,0 s | 11 | 0,63 s | 1,46 s |
| E | 1.682 | 109,4 s | 7 | 0,89 s | 1,42 s |

Cinque tracce e non quattro: il limite del timeout (fra 3.097 e 3.401
caratteri) più le pause di confine portavano le quattro tracce del piano
sopra i ~2.750 caratteri che si tengono come margine. Gli stacchi cadono su
cambi di capitolo — l'apertura, l'osservare, il ribaltamento verso di te, la
prima frase e l'errore, le quattro cose da non fare.

**Il costo: 39 crediti per la voce** (7.375 → 7.336) e **1 per il render**
(7.336 → 7.335). La stima dei campioni diceva ~35 su 587 s di parlato, e qui
era stata data la colpa alle pause di confine (43 × 1,6 s, 69 s di silenzio
dentro i 704,5 s di grezzo). **La 7.2 smentisce la spiegazione**: grezzo di
703,4 s con 43 pause di confine, saldo letto subito prima e subito dopo, 30
crediti. Con due misure il conto sta fra 30 e 40 crediti HeyGen a lezione,
render compreso — contro i ~10.400 crediti ElevenLabs più 1.001 di
trascrizione della strada diretta.

Niente tag `[warm]`: sulla strada HeyGen non è stato provato, e la prova non
si fa su una lezione vera.

## Il vincolo del modulo

**Nessuna lezione insegna a valutare una persona dai segnali.** Nella 7.1 il
vincolo non va detto a voce (lo script lo chiede per la 7.2 e la 7.3), ma la
lezione lo rispetta per costruzione: la metà sull'osservare dice che nel
primo minuto **non si conclude niente**, e `s13` ne fa l'esempio — «Parla
piano» è una descrizione, «parla piano perché è insicuro» è già un giudizio,
e nel primo minuto non hai niente per sostenerlo. Il confronto `c13` lo mette
a schermo con la colonna del giudizio segnata «Non si può sostenere».

Il filtro delle parole vietate del modulo 6 è rimasto acceso sui blocchi.

## Le note dello script

**«La proporzione un terzo osservazione, due terzi sé stessi vale per tutto
il modulo e va mantenuta anche in montaggio.»** Misurata sul montato:

| parte | blocchi | durata |
|---|---|---|
| apertura | `s02`–`s04` | 41,5 s |
| osservare | `s05`–`s17` | 160,2 s |
| quello che mandi tu | `s18`–`s46` | 355,2 s |
| prova di oggi e chiusura | `s47`–`s49` | 30,1 s |

Fra le due metà, **31% e 69%**. Lo stesso vale per le slide: dodici per
l'osservare (`c05`–`c17`), ventisette per l'altra metà (`c19`–`c46`).

**Nessun aneddoto.** Rispettato.

## Il copione

Da **3.963** caratteri di parlato nello script a **10.304**, media 215 per
blocco. Lo script chiede 0,95×, il passo normale del corso. Pose **37,9 s**.

Quello che il copione aggiunge:

- **che cosa fa il modulo** (`s03`): non segnali nuovi, ma quelli dei sei
  moduli precedenti al lavoro, in cinque situazioni;
- **perché la proporzione è quella** (`s04`): la seconda metà è l'unica che
  puoi cambiare;
- **il metro sbagliato in due esempi** (`s07`): ti sembra lento perché tu sei
  veloce, freddo perché tu saluti in un altro modo — stai misurando la
  distanza da te;
- **che la sicurezza non dice niente sulla precisione** (`s08`);
- **perché il punto di partenza serve dopo** (`s11`): fra dieci minuti si
  parlerà di qualcosa che conta, e ogni cambiamento sarà un'informazione solo
  se sai da dove è partito;
- **come si usano i convenevoli** (`s16`): non allungarli, non farne un
  interrogatorio sul viaggio — non tagliarli, e usarli;
- **che cosa ti resta in mano** (`s22`): non controlli l'impressione che
  l'altro si fa di te, ma controlli quello che gli dai da guardare;
- **che nessuna delle quattro cose riguarda come sembri** (`s29`): riguardano
  quello che fai, che è l'unica parte sotto il tuo controllo;
- **perché le tre forme della prima frase funzionano** (`s31`) e **perché va
  saputa a memoria** (`s32`–`s33`): l'attivazione è al massimo proprio lì;
- **perché l'altro si chiude** (`s39`): non per diffidenza, per lo stesso
  motivo per cui chiunque si controlla quando si sente guardato;
- **che due delle quattro cose da non fare le fanno soprattutto le persone
  attente** (`s42`), e che **la quarta è l'unica che questo corso rende più
  probabile** (`s46`).

Le «quattro cose» della 1.4 sono dette in forma descrittiva (`s12`: il ritmo
con cui parla, i gesti che fa e quanti, la postura e quanto cambia, lo
sguardo e dove va quando pensa) e finiscono in «quattro righe, nessuna
conclusione».

## Le grafiche

Quarantasette slide, di cui **tre con un'infografica** e **nessuna ciclica**:

| slide | tipo | cosa mostra |
|---|---|---|
| `c13` | confronto | la stessa osservazione in due frasi: descrizione / giudizio, e che cosa se ne fa nel primo minuto |
| `c22` | confronto | le due impressioni del primo minuto: la tua di lui / la sua di te — linea di base e che cosa puoi fare tu |
| `c39` | bivio | il primo minuto: osservi (l'altro si controlla e ti dà meno) o ascolti (l'altro resta com'è, e lo vedi), acceso il secondo |

Le liste ripetute sono due, le quattro cose che decidi tu (`c24`–`c28`) e le
quattro da non fare (`c42`–`c46`); le quattro cose da annotare della 1.4
stanno in una lista sola (`c12`), e la prima frase in due — che cosa non
metterci (`c30`) e le tre forme che funzionano (`c31`). Due memo, «I convenevoli non sono tempo perso. Sono la taratura.» e «Nel primo
minuto non si legge. Si tara.».

**Due correzioni dal foglio di contatto:**

- due titoli con l'apostrofo dentro `G(...)` in un f-string si erano rotti
  sostituendo le virgolette tipografiche; riscritti come concatenazione;
- il memo `c17` andava a capo su tre righe nei punti sbagliati: spezzato a
  mano in «I convenevoli / non sono tempo perso. / Sono la taratura.».

## Le riprese

Tre, `s09`, `s18` e `s35`, **viste tutte e tre**. Higgsfield ha rifiutato per
la **nona lezione di fila** (tetto giornaliero del piano), quindi sono nate
sul nodo ElevenLabs con **Nano Banana 2**, 406 crediti l'una.

- **`s09`** — una porta di ufficio aperta su una sala riunioni illuminata e
  vuota, vista dal corridoio in penombra. Arriva su «Quello che puoi fare nel
  primo minuto è una cosa sola, e non è leggere»;
- **`s18`** — due poltrone e un tavolino in una sala d'attesa, luce naturale
  da una finestra, una tazza e un libro chiuso. Arriva su «E adesso l'altra
  metà. Quella che conta di più»;
- **`s35`** — una mano che posa una cartellina chiara su un tavolo di legno,
  volto fuori campo come chiede lo script. Arriva su «E c'è un errore che
  quasi tutti fanno nel primo minuto».

Nessuna persona in volto, nessuna scritta leggibile, nessun marchio.

## Il montato è stato verificato scena per scena

`get_video_scenes`: **cinquanta scene**, le tre immagini esattamente alle
scene 8, 17 e 34 (cioè `s09`, `s18` e `s35`), **nessuna scena in `playback:
loop`** e tutte le altre in `freeze` con `volume: 0`. Copertina con la
traccia muta da 3 s, chiusura con quella da 10 s. 16:9, 1080p.

Il montato è stato anche **scaricato e guardato** — `files2.heygen.ai`, che
lo standard dava per bloccato dal proxy, adesso passa. Dieci fotogrammi presi
a metà di altrettante scene (copertina, `s02`, le tre riprese, i due
confronti, il memo, il bivio, la chiusura «Nella prossima lezione: Il
colloquio.») sono tutti al loro posto; il silenzio iniziale dura 2,99 s e
quello finale 10,5 s, come le due tracce mute.

Durata finale **598,7 s**: 1,2 s meno della somma delle scene, lo stesso
scarto di arrotondamento dei fotogrammi che dava 598,8 s sulla 6.5.
