# Registro — 2.1 «Le sette emozioni: cosa regge e cosa è discusso»

Apre il modulo sul volto dichiarando che cosa, di tutto quello che verrà detto
nelle prossime quattro lezioni, è solido e che cosa è ancora in discussione.
È la lezione che decide se il modulo insegnerà un dizionario di facce oppure
a vedere i cambiamenti.

| campo | valore |
|---|---|
| video_id | `1f356ac50ea758d66042448ef92a8d49` |
| scene | 50 — copertina, 48 blocchi, chiusura |
| formato | 16:9, 1080p |
| durata | 598,8 s (9:59) |
| parlato | 587,0 s |
| voce | Luca Ward `tVdVcJPudubxmTmAw4tE`, `eleven_v4`, 1,12× in post |
| flow ElevenLabs | `Aa6tkAqyoQj1Vgqa40vh` |
| tracce | A `eCXvtIAWDCOlQkF6GPwV` · B `5aTEx7VZQLQItEgqInvX` · C `eCDc6Mktk1rNimNP8khQ` |

## Il copione è stato riscritto

Da **5.375** caratteri dichiarati dallo script a **10.386**, media 216 per
blocco. Lo script aveva la struttura — il dibattito, le due obiezioni, i tre
errori — e quasi nessuna delle ragioni che la reggono.

- **perché la differenza fra le due affermazioni non è una sottigliezza**:
  una è una domanda sul riconoscimento e si verifica con delle fotografie,
  l'altra è una domanda sulla produzione e per verificarla bisogna guardare
  persone che stanno provando qualcosa;
- **perché la lista di sei parole gonfia l'accordo**: è il problema di un test
  a crocette, dove conta anche quanto sono fatte male le alternative
  sbagliate. Un volto non ha una lista accanto;
- **la replica, detta per intero**: il laboratorio comprime le espressioni, e
  cercare corrispondenze perfette è una pretesa che nessun segnale biologico
  ha mai soddisfatto;
- **perché il dibattito esiste**: le parole delle emozioni sono categorie più
  larghe dello strumento che le misura. Cercare l'espressione della rabbia è
  come cercare il sapore della frutta;
- **perché la mossa pratica regge comunque**: usare le espressioni come
  segnale di cambiamento e non come etichetta di stato non dipende da come
  finirà la discussione.

## Note di contenuto

**Vincoli di modulo rispettati.** Nessuna tabella FACS, in nessuna forma.
Nessuna formulazione che suggerisca di rilevare la menzogna. La fonte è detta
a voce con l'anno — «una rassegna molto ampia del duemiladiciannove,
coordinata da Lisa Feldman Bàrret» — e nel copione il cognome è scritto come
va pronunciato, perché a leggerlo è la voce.

La lezione non prende partito. Il quadro delle tre affermazioni (`c27`) dice
esattamente che cosa regge, che cosa è contestato e che cosa non è sostenuto,
e la bilancia di `c26` resta in pari: è quello che vuol dire «contestato».

Nessun aneddoto, come prevede lo script.

## Le grafiche

Quarantasette slide, di cui **sette con un disegno o un'infografica**
e **tre cicliche**: `c26`, `c33`, `c45`.

| slide | tipo | cosa mostra |
|---|---|---|
| `c06` | bivio | La seconda è più modesta, e non scade quando la ricerca cambia idea. |
| `c13` | confronto | riconoscimento e produzione, riga per riga |
| `c17` | barre | cosa succede togliendo la lista di sei parole |
| `c26` | bilancia (ciclica) | Nessuno dei due piatti scende. È questo che vuol dire «contestato». |
| `c33` | anello (ciclica) | Questo giro regge in entrambi i casi, e non chiede nessuna etichetta. |
| `c38` | raggi | Quattro stati diversi sotto una parola sola. E quattro facce diverse. |
| `c45` | termometro (ciclica) | Più scendi verso la parola precisa, più è probabile che sia sbagliata. |

Tre disegni sono stati rifatti dopo averli guardati da fermi. Il `raggi`
usciva con le quattro etichette sovrapposte in un punto solo, perché il campo
`d` di ogni satellite è una **distanza 0..100** e io ci avevo messo una frase.
Il `termometro` contraddiceva la propria didascalia — la scala saliva verso la
parola precisa mentre la voce dice «scendere» — ed è stata rovesciata. Il
`confronto` aveva l'occhiello passato come `kicker`, che le infografiche
ignorano: il nome giusto è `occhio`.

## Il mondo visivo del modulo 2

    LUOGO   uno studio piccolo e una stanza spoglia, mai un ufficio di vetro
    LUCE    naturale di mattina, da una finestra alta fuori campo
    OTTICA  50 mm, poca profondità di campo, camera ferma
    COLORE  legno chiaro, avorio, un blu spento; nessun colore acceso
    PERSONE di spalle o da lontano; mai un volto riconoscibile

La regola sui volti non è estetica: il modulo parla di come si guardano le
facce, e mostrarne una riconoscibile sarebbe un invito a fare la cosa che le
lezioni vietano.

## Le tre riprese

| blocco | cosa | perché lì |
|---|---|---|
| `s07` | una pila di libri rilegati su una scrivania, nessun titolo leggibile sui dorsi | sta sulla frase che apre la parte solida: la letteratura esiste, ed è parecchia |
| `s20` | due persone ai lati opposti di un tavolo, viste di spalle | sta sulla variabilità reale: persone vere, non attori che posano |
| `s35` | un cesto di vimini con frutta mista su un tavolo di legno | prepara il «sapore della frutta» di `s40`, e lo lascia lì senza spiegarlo |

Le ho **viste tutte e tre** prima di montarle, tutte alla prima generazione.

## I tagli — e il controllo che non si è potuto fare

**Stesso limite dichiarato in tutto il modulo 1.** I crediti ElevenLabs sono a
zero: la trascrizione di verifica di `prova.mp3` ne chiede circa mille e la
chiamata fallisce. La policy di rete chiude `huggingface.co` e
`openaipublic.azureedge.net`, quindi non si può installare un riconoscitore
locale di riserva. **I quarantacinque confini non sono stati verificati parola
per parola.**

Il controllo di durata attesa — durata del taglio contro `caratteri ÷ velocità
della traccia` — lascia **tre confini** con scarto oltre 1,5 s, ed è il
risultato migliore finora: `s11` +1,76 · `s39` +1,53 · `s49` +1,91. Il terzo è
la fine della traccia C, dove non c'è nessun confine da sbagliare. Gli altri
due cadono dentro un silenzio di **0,51 s** e **0,66 s**: nessuna parola è
spezzata. **Vanno risentiti quando i crediti tornano.**

## Le pose

26,6 secondi in tutto, distribuiti per tipo di schermata da `script/pose.py`.
Il conto chiude a **587,0 s** di parlato, che con i 3 s di copertina e i 10 s
di chiusura fanno **9:59**.

## Da verificare

Non sento l'audio e non vedo il montato. Ho controllato le slide da ferme —
tutte e sette quelle con un disegno, più un campione delle altre — e le tre
riprese. **I quarantacinque tagli non sono verificati con la trascrizione**,
per i crediti esauriti: vale quanto scritto sopra.

## Blocchi

`·` disegno o infografica · `▪` ripresa

| blocco | slide | tipo | durata (s) | posa (s) |
|---|---|---|---|---|
| s02 | `c02` | frase | 13.69 | +0.09 |
| s03 | `c03` | frase | 12.97 | +0.09 |
| s04 | `c04` | sostituzione | 14.34 | +0.99 |
| s05 | `c05` | frase | 11.62 | +0.09 |
| s06 | · `c06` | bivio | 14.42 | +1.39 |
| s07 | ▪ pila-di-libri | ripresa | 6.48 | — |
| s08 | `c08` | frase | 13.36 | +0.09 |
| s09 | `c09` | elenco | 13.36 | +0.99 |
| s10 | `c10` | frase | 10.78 | +0.09 |
| s11 | `c11` | frase | 13.65 | +0.09 |
| s12 | `c12` | frase | 12.40 | +0.09 |
| s13 | · `c13` | confronto | 12.43 | +1.39 |
| s14 | `c14` | frase | 13.06 | +0.09 |
| s15 | `c15` | elenco | 13.58 | +0.99 |
| s16 | `c16` | frase | 12.15 | +0.09 |
| s17 | · `c17` | barre | 13.93 | +1.39 |
| s18 | `c18` | frase | 12.42 | +0.09 |
| s19 | `c19` | memo | 13.88 | +0.69 |
| s20 | ▪ due-ai-lati-del-tavolo | ripresa | 5.11 | — |
| s21 | `c21` | frase | 12.32 | +0.09 |
| s22 | `c22` | sostituzione | 13.75 | +0.99 |
| s23 | `c23` | frase | 12.48 | +0.09 |
| s24 | `c24` | citazione | 12.36 | +0.69 |
| s25 | `c25` | frase | 11.29 | +0.09 |
| s26 | · `c26` | bilancia | 13.51 | +1.39 |
| s27 | `c27` | tabella | 12.53 | +0.99 |
| s28 | `c28` | frase | 11.95 | +0.09 |
| s29 | `c29` | frase | 11.99 | +0.09 |
| s30 | `c30` | frase | 10.97 | +0.09 |
| s31 | `c31` | sostituzione | 13.18 | +0.99 |
| s32 | `c32` | memo | 4.69 | +1.22 |
| s33 | · `c33` | anello | 13.51 | +1.39 |
| s34 | `c34` | sostituzione | 14.42 | +0.99 |
| s35 | ▪ cesto-di-frutta | ripresa | 5.14 | — |
| s36 | `c36` | frase | 12.08 | +0.09 |
| s37 | `c37` | frase | 12.07 | +0.09 |
| s38 | · `c38` | raggi | 13.70 | +1.39 |
| s39 | `c39` | frase | 13.13 | +0.09 |
| s40 | `c40` | frase | 11.04 | +0.09 |
| s41 | `c41` | frase | 12.87 | +0.09 |
| s42 | `c42` | elenco | 10.92 | +0.99 |
| s43 | `c43` | frase | 11.83 | +0.09 |
| s44 | `c44` | sostituzione | 15.01 | +0.99 |
| s45 | · `c45` | termometro | 14.26 | +1.39 |
| s46 | `c46` | frase | 12.51 | +0.09 |
| s47 | `c47` | memo | 4.69 | +1.32 |
| s48 | `c48` | elenco | 14.71 | +0.99 |
| s49 | `c49` | elenco | 20.47 | +0.99 |
