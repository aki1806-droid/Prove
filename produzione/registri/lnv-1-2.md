# Registro — 1.2 «Il mito del 7-38-55»

Smonta il numero più ripetuto di tutta la formazione sulla comunicazione.
È la lezione che dichiara il metodo del corso: si smonta senza compiacimento,
e la fonte si dice a voce, con l'anno.

| campo | valore |
|---|---|
| video_id | `bfcfb4e1e8833c21023690bffe193dbc` |
| scene | 50 — copertina, 48 blocchi, chiusura |
| formato | 16:9, 1080p |
| durata | 598,7 s (9:59) |
| parlato | 586,8 s |
| voce | Luca Ward `tVdVcJPudubxmTmAw4tE`, `eleven_v4`, 1,12× in post |
| flow ElevenLabs | `T9KRw4MPY5MwWhXAgeOk` |
| tracce | A `oyLb6CGnLS3VUrgDusjp` · B `3gpitytzmzeNzpVPoxt2` · C `NaHIWGG4y7qaSVEZYxnn` |

## Il copione è stato riscritto

Da circa **5.400** caratteri dichiarati dallo script a **10.299**. Lo
script aveva lo scheletro giusto; mancava quasi tutto il «perché».

- **perché una lezione intera su un numero sbagliato**: se si cominciasse a
  parlare di volti e di sguardi lasciando in piedi quel numero, tutto il corso
  poggerebbe sulla premessa che le parole non contino;
- **cosa misuravano davvero i due esperimenti**: canali costruiti apposta
  incoerenti, e una domanda stretta — a quale credono le persone quando i due
  si contraddicono;
- **la verifica dell'ungherese, fatta per intero**: non «non capisci niente»,
  ma che cosa capisci davvero (il tono emotivo) e che cosa no (il contenuto);
- **perché l'autore non è stato ascoltato**: il numero è comodo, sta in una
  slide, e dà una struttura a un corso che altrimenti dovrebbe ammettere di
  essere più incerto;
- **il danno pratico, per intero**: una generazione di formazione che lavora
  solo sulla forma, e la frase che lo chiude — un argomento sbagliato detto
  benissimo resta un argomento sbagliato.

## Note di contenuto

La fonte è detta a voce con l'anno, come prevede lo standard del corso: «due
esperimenti di Albert Mehrabian, pubblicati nel millenovecentosessantasette».
Nel copione il nome è scritto come va pronunciato — `Meeràbian` — perché a
leggerlo è la voce, non il lettore.

La scena sulla forma e la sostanza (qui `s43`–`s46`) non è stata tagliata: lo
script la segnala come la parte che corregge il danno pratico del mito.

## Le grafiche

Quarantasette slide, di cui **sette con un disegno o un'infografica**
e **tre cicliche**: `c19`, `c25`, `c36`.

| slide | tipo | cosa mostra |
|---|---|---|
| `c10` | ponte | Che è esattamente il contrario di quello che insegno. |
| `c14` | confronto |  |
| `c19` | imbuto (ciclica) | Per passare dalla prima alla seconda si buttano via tutte le condizioni. |
| `c25` | termometro (ciclica) | Il tono emotivo arriva. Il contenuto no. |
| `c36` | bilancia (ciclica) | In caso di contraddizione vince il tono. Sempre. |
| `c41` | raggi | L'incongruenza è il luogo in cui c'è informazione. |
| `c45` | imbuto | Se il 93% sta fuori dalle parole, perché perdere tempo sulle parole? |

## Le tre riprese

| blocco | cosa | perché lì |
|---|---|---|
| `s08` | una presentazione proiettata e completamente fuori fuoco in una sala vuota | sta sulla frase che dice che il numero si è staccato dagli studi e viaggia da solo |
| `s20` | un televisore acceso in penombra, immagine irriconoscibile | sta sulla verifica dell'ungherese: hai tutto il non verbale e non capisci niente |
| `s37` | due mani che si stringono, volti fuori campo | sta sulla parte costruttiva: quello che resta, ed è solido |

Le ho **viste tutte e tre** prima di montarle: il proxy blocca il CDN in
scaricamento, ma il generatore le restituisce dentro la risposta, una per
chiamata. La prima versione della slide proiettata aveva un testo
pseudo-inglese ancora leggibile: rifatta chiedendo una proiezione
completamente fuori fuoco, senza nessuna lettera riconoscibile.

## I tagli — e il controllo che non si è potuto fare

**Stesso limite dichiarato nella 1.1.** I crediti ElevenLabs sono a zero: la
trascrizione di verifica di `prova.mp3` ne chiede circa mille e la chiamata
fallisce. La policy di rete chiude `huggingface.co` e
`openaipublic.azureedge.net`, quindi non si può nemmeno installare un
riconoscitore locale di riserva. **I quarantacinque confini non sono stati
verificati parola per parola.**

Quello che si è potuto fare è il controllo di durata attesa: per ogni blocco
si confronta la durata del taglio con `caratteri ÷ velocità della traccia`, e
un confine caduto dentro una frase produce uno scarto uguale e opposto fra il
blocco prima e quello dopo. Con `tagli.py` corretto — pesi al netto dei tag,
pool dei candidati a 4×N — restano **otto confini** con scarto oltre 1,5 s:
`s03` −1,71 · `s10` +2,36 · `s14` +2,14 · `s17` −1,56 · `s22` +1,74 · `s28` +1,55 · `s43` −1,94 · `s46` +1,68. Cadono tutti dentro un silenzio di almeno 0,20 s, quindi non
spezzano una parola: al peggio una proposizione breve sta sulla slide del
blocco vicino per un paio di secondi. **Vanno risentiti quando i crediti
tornano.**

## Le pose

24,4 secondi in tutto, distribuiti per tipo di schermata da
`script/pose.py`: un minimo in scena e un supplemento per i disegni, gli
elenchi e i memo, e il resto spalmato in parti uguali. Il conto chiude a
**586,8 s** di parlato, che con i 3 s di copertina e i 10 s di chiusura
fanno **9:59**.

## Da verificare

Non sento l'audio e non vedo il montato. Ho controllato le slide da ferme e
le tre riprese. **I quarantacinque tagli non sono verificati con la
trascrizione**, per i crediti esauriti: vale quanto scritto sopra.

## Blocchi

`·` disegno o infografica · `▪` ripresa

| blocco | slide | tipo | durata (s) | posa (s) |
|---|---|---|---|---|
| s02 | `c02` | grafico | 13.95 | +0.90 |
| s03 | `c03` | frase | 13.74 | +0.00 |
| s04 | `c04` | memo | 4.60 | +3.60 |
| s05 | `c05` | frase | 12.74 | +0.00 |
| s06 | `c06` | elenco | 14.12 | +0.90 |
| s07 | `c07` | frase | 8.84 | +0.00 |
| s08 | ▪ slide-sfocata | ripresa | 8.37 | — |
| s09 | `c09` | frase | 14.39 | +0.00 |
| s10 | · `c10` | ponte | 14.14 | +1.30 |
| s11 | `c11` | frase | 9.54 | +0.00 |
| s12 | `c12` | frase | 13.06 | +0.00 |
| s13 | `c13` | frase | 10.12 | +0.00 |
| s14 | · `c14` | confronto | 17.97 | +1.30 |
| s15 | `c15` | frase | 11.34 | +0.00 |
| s16 | `c16` | citazione | 11.73 | +0.60 |
| s17 | `c17` | frase | 12.67 | +0.00 |
| s18 | `c18` | frase | 11.89 | +0.00 |
| s19 | · `c19` | imbuto | 16.19 | +1.30 |
| s20 | ▪ televisore-sfocato | ripresa | 8.87 | — |
| s21 | `c21` | frase | 12.93 | +0.00 |
| s22 | `c22` | elenco | 15.01 | +0.90 |
| s23 | `c23` | memo | 10.10 | +0.60 |
| s24 | `c24` | frase | 13.65 | +0.00 |
| s25 | · `c25` | termometro | 12.46 | +1.30 |
| s26 | `c26` | frase | 13.27 | +0.00 |
| s27 | `c27` | schede | 11.76 | +0.90 |
| s28 | `c28` | frase | 11.93 | +0.00 |
| s29 | `c29` | frase | 13.00 | +0.00 |
| s30 | `c30` | memo | 14.57 | +0.60 |
| s31 | `c31` | elenco | 11.12 | +0.90 |
| s32 | `c32` | frase | 11.35 | +0.00 |
| s33 | `c33` | memo | 13.25 | +0.60 |
| s34 | `c34` | frase | 4.21 | +0.00 |
| s35 | `c35` | citazione | 11.27 | +0.60 |
| s36 | · `c36` | bilancia | 12.40 | +1.30 |
| s37 | ▪ stretta-di-mano | ripresa | 11.70 | — |
| s38 | `c38` | frase | 6.87 | +0.00 |
| s39 | `c39` | frase | 12.51 | +0.00 |
| s40 | `c40` | sostituzione | 13.03 | +0.90 |
| s41 | · `c41` | raggi | 13.66 | +1.30 |
| s42 | `c42` | frase | 10.61 | +0.00 |
| s43 | `c43` | frase | 10.27 | +0.00 |
| s44 | `c44` | elenco | 15.40 | +0.90 |
| s45 | · `c45` | imbuto | 11.95 | +1.30 |
| s46 | `c46` | frase | 12.37 | +0.00 |
| s47 | `c47` | elenco | 14.37 | +0.90 |
| s48 | `c48` | memo | 12.62 | +0.60 |
| s49 | `c49` | elenco | 20.88 | +0.90 |
