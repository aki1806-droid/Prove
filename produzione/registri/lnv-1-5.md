# Registro — 1.5 «Guardare senza concludere»

Chiude il modulo con la regola operativa che tiene insieme tutte le altre:
osservare serve a sapere dove guardare, non a sapere cosa pensa l'altro.
È la lezione che mette in mano allo studente la mossa — la domanda — al posto
della conclusione.

| campo | valore |
|---|---|
| video_id | `c2f6aadf351260b0cd86cd47a2e73abb` |
| scene | 50 — copertina, 48 blocchi, chiusura |
| formato | 16:9, 1080p |
| durata | 598,9 s (9:59) |
| parlato | 587,2 s |
| voce | Luca Ward `tVdVcJPudubxmTmAw4tE`, `eleven_v4`, 1,12× in post |
| flow ElevenLabs | `p3guSGHNCNEKSkNNRlsc` |
| tracce | A `rZLDfv4Amg1efAlF4xbw` · B `y2JYJFZwfEMrITKtUkEk` · C `vT22IFAxVK7DJfPgXDce` |

## Il copione è stato riscritto

Da **5.375** caratteri dichiarati dallo script a **10.523**, media 219 per
blocco. Lo script aveva la struttura e la mossa finale; mancava il perché la
mossa funzioni, che è tutta la lezione.

- **l'effetto collaterale del corso**, detto per intero: dopo un corso come
  questo si nota di più e si conclude di più, e la seconda cosa peggiora la
  prima;
- **perché l'ipotesi non è un filtro a valle ma a monte**: non seleziona le
  conclusioni, decide cosa entra nell'osservazione — da qui l'imbuto di `c10`;
- **la differenza fra un fatto e una lettura**, che è la sola distinzione da
  cui si può ripartire: a un fatto non c'è niente da aggiungere, si può solo
  confermarlo;
- **le tre mosse in ordine di invadenza**: nominare il fatto, chiedere, tacere
  e aspettare — il flusso di `c24`;
- **la curva di chi ha appena imparato**: più guardi, meno vedi, perché
  l'attenzione finisce nella verifica dell'ipotesi invece che nell'ascolto.

## Note di contenuto

La scena in cui lo studente si riconosce — il periodo subito dopo il corso, in
cui si guarda tutti — qui è `s38`–`s42`, **tenuta per intero e senza ironia**,
come chiede lo script: descrive una cosa che gli succederà davvero.

**Nessun aneddoto**: quello del modulo sta nella 1.1, e lo script lo dice
esplicitamente. Qui il posto dell'aneddoto è occupato dalla descrizione di
quell'effetto collaterale, che fa lo stesso lavoro senza raddoppiare la
confidenza.

La slide di chiusura è un `closing` con `title="Fine del Modulo 1"` e
`sub="Modulo 2 — Il volto"`: il modulo si chiude dichiarando dove si va.

## Le grafiche

Quarantasette slide, di cui **sei con un disegno o un'infografica**
e **tre cicliche**: `c05`, `c10`, `c40`.

| slide | tipo | cosa mostra |
|---|---|---|
| `c05` | bilancia (ciclica) | In questo campo tendono ad andare in direzioni opposte. |
| `c10` | imbuto (ciclica) | L'ipotesi non filtra le conclusioni. Filtra prima: decide cosa entra. |
| `c18` | ponte | A un fatto non c'è più niente da aggiungere. Puoi solo confermarlo. |
| `c24` | flusso | Tre mosse, in ordine di invadenza crescente. |
| `c40` | curva (ciclica) | Si controlla. E proprio mentre guardi di più, cominci a vedere meno. |
| `c46` | cruscotto | le quattro cose da tenere |

## Le tre riprese

| blocco | cosa | perché lì |
|---|---|---|
| `s08` | una lente d'ingrandimento appoggiata accanto a un quaderno chiuso, copertina vuota | sta sulla frase che distingue lo strumento dal verdetto: la lente non legge il quaderno |
| `s20` | due persone ai lati opposti di una scrivania, volti non riconoscibili | sta sulla parte in cui osservare diventa sorvegliare, e l'altro se ne accorge |
| `s37` | una tavola apparecchiata per più persone, sedie vuote, luce di sera | sta sull'inizio della parte in cui lo studente si riconosce: la cena in cui guarda tutti |

Le ho **viste tutte e tre** prima di montarle. Il quaderno della prima
versione aveva un titolo leggibile in copertina: rifatta con la copertina
vuota. Le altre due hanno richiesto una seconda generazione perché la prima non
è tornata dentro la risposta e quindi non era ispezionabile.

## I tagli — e il controllo che non si è potuto fare

**Stesso limite dichiarato nelle quattro lezioni precedenti.** I crediti
ElevenLabs sono a zero: la trascrizione di verifica di `prova.mp3` ne chiede
circa mille e la chiamata fallisce. La policy di rete chiude `huggingface.co` e
`openaipublic.azureedge.net`, quindi non si può nemmeno installare un
riconoscitore locale di riserva. **I quarantacinque confini non sono stati
verificati parola per parola.**

Quello che si è potuto fare è il controllo di durata attesa: per ogni blocco si
confronta la durata del taglio con `caratteri ÷ velocità della traccia`, e un
confine caduto dentro una frase produce uno scarto uguale e opposto fra il
blocco prima e quello dopo. Restano **sei confini** con scarto oltre 1,5 s:
`s07` −3,12 · `s13` +1,76 · `s25` +1,51 · `s41` −2,13 · `s44` +2,76 ·
`s46` −2,50. Cadono tutti dentro un silenzio di almeno 0,20 s, quindi non
spezzano una parola: al peggio una proposizione breve sta sulla slide del
blocco vicino per un paio di secondi. **Vanno risentiti quando i crediti
tornano.**

## Le pose

22,5 secondi in tutto, distribuiti per tipo di schermata da `script/pose.py`:
un minimo in scena e un supplemento per i disegni, gli elenchi e i memo, e il
resto spalmato in parti uguali. Il conto chiude a **587,2 s** di parlato, che
con i 3 s di copertina e i 10 s di chiusura fanno **9:59**.

## Da verificare

Non sento l'audio e non vedo il montato. Ho controllato le slide da ferme e le
tre riprese. **I quarantacinque tagli non sono verificati con la
trascrizione**, per i crediti esauriti: vale quanto scritto sopra.

## Blocchi

`·` disegno o infografica · `▪` ripresa

| blocco | slide | tipo | durata (s) | posa (s) |
|---|---|---|---|---|
| s02 | `c02` | frase | 10.34 | +0.08 |
| s03 | `c03` | elenco | 12.91 | +0.98 |
| s04 | `c04` | frase | 11.67 | +0.08 |
| s05 | · `c05` | bilancia | 10.77 | +1.38 |
| s06 | `c06` | frase | 12.75 | +0.08 |
| s07 | `c07` | frase | 7.62 | +0.08 |
| s08 | ▪ lente-e-quaderno | ripresa | 9.27 | — |
| s09 | `c09` | frase | 11.25 | +0.08 |
| s10 | · `c10` | imbuto | 12.78 | +1.38 |
| s11 | `c11` | frase | 13.69 | +0.08 |
| s12 | `c12` | frase | 13.15 | +0.08 |
| s13 | `c13` | frase | 16.23 | +0.08 |
| s14 | `c14` | memo | 14.40 | +0.68 |
| s15 | `c15` | frase | 12.23 | +0.08 |
| s16 | `c16` | frase | 14.80 | +0.08 |
| s17 | `c17` | sostituzione | 9.94 | +0.98 |
| s18 | · `c18` | ponte | 14.33 | +1.38 |
| s19 | `c19` | frase | 10.81 | +0.08 |
| s20 | ▪ due-alla-scrivania | ripresa | 7.30 | — |
| s21 | `c21` | citazione | 9.89 | +0.68 |
| s22 | `c22` | frase | 11.12 | +0.08 |
| s23 | `c23` | frase | 11.15 | +0.08 |
| s24 | · `c24` | flusso | 14.03 | +1.38 |
| s25 | `c25` | frase | 12.05 | +0.08 |
| s26 | `c26` | frase | 10.73 | +0.08 |
| s27 | `c27` | citazione | 14.68 | +0.68 |
| s28 | `c28` | sostituzione | 11.97 | +0.98 |
| s29 | `c29` | frase | 17.18 | +0.08 |
| s30 | `c30` | memo | 13.99 | +0.68 |
| s31 | `c31` | elenco | 10.94 | +0.98 |
| s32 | `c32` | frase | 3.08 | +0.37 |
| s33 | `c33` | frase | 13.13 | +0.08 |
| s34 | `c34` | frase | 13.08 | +0.08 |
| s35 | `c35` | frase | 11.89 | +0.08 |
| s36 | `c36` | frase | 13.73 | +0.08 |
| s37 | ▪ tavola-apparecchiata | ripresa | 9.22 | — |
| s38 | `c38` | elenco | 13.33 | +0.98 |
| s39 | `c39` | frase | 10.74 | +0.08 |
| s40 | · `c40` | curva | 15.88 | +1.38 |
| s41 | `c41` | frase | 10.69 | +0.08 |
| s42 | `c42` | sostituzione | 11.28 | +0.98 |
| s43 | `c43` | memo | 13.63 | +0.68 |
| s44 | `c44` | frase | 13.57 | +0.08 |
| s45 | `c45` | frase | 10.30 | +0.08 |
| s46 | · `c46` | cruscotto | 11.94 | +1.38 |
| s47 | `c47` | sostituzione | 14.83 | +0.98 |
| s48 | `c48` | memo | 11.10 | +0.68 |
| s49 | `c49` | elenco | 21.80 | +0.98 |
