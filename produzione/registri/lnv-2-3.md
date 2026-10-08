# Registro — 2.3 «Le espressioni che si vedono a occhio nudo»

È la lezione più operativa del modulo, e arriva dopo due che tolgono
certezze: l'ordine è voluto. Le prime due hanno tolto l'etichetta emotiva e
la codifica in tempo reale; questa rimette in mano quattro proprietà che
chiunque vede senza imparare niente.

| campo | valore |
|---|---|
| video_id | `c27dd213d4388051ce4a449ec4635482` |
| scene | 50 — copertina, 48 blocchi, chiusura |
| formato | 16:9, 1080p |
| durata | 598,5 s (9:59) |
| parlato | 586,8 s |
| voce | Luca Ward `tVdVcJPudubxmTmAw4tE`, `eleven_v4`, 1,12× in post |
| flow ElevenLabs | `DRD3QcoGGTgs8dN92rkR` |
| tracce | A `mZqJPevpOJWPPZAAEih1` · B `QJob1zolmPwFTu6Ba9ma` · C `qlQV7FLZdgICW8ENwBWX` |

## Il copione è stato riscritto

Da **4.357** caratteri dichiarati dallo script a **10.252**, media 214
per blocco. Lo script elencava le quattro proprietà; mancava quasi tutto il
motivo per cui sono proprio quelle e non altre.

- **perché chi sbaglia il livello di intensità non vede niente**: cerca la
  faccia del manuale, non la trova per settimane, si convince di non essere
  portato e smette. È il modo più comune di abbandonare;
- **perché l'asimmetria non è falsità**, detto senza ammorbidire: al massimo
  dice che il movimento non era completamente spontaneo, e le ragioni sono la
  cortesia, l'abitudine, il mestiere e l'anatomia;
- **perché la durata è la proprietà più utile**: ha un profilo — sale, resta,
  scende — e due modi di non tornare, cioè restare ferma troppo a lungo o
  sparire di colpo senza scendere;
- **perché la bocca è la parte sbagliata da guardare**: è il primo pezzo di
  faccia che impariamo a usare apposta, e il rimedio costa uno spostamento di
  sguardo di qualche centimetro;
- **perché fissare non funziona**: senza un prima non c'è nessun termine di
  paragone, e i quattro momenti buoni sono quelli che decidi tu.

## Note di contenuto

**L'asimmetria non viene mai collegata alla menzogna**, in nessuna forma: è
il vincolo del modulo, e qui è anche il punto della lezione. La slide `c16`
lo dice da sola, a schermo, in oro tenue.

La frase «tenuta non significa falsa» e la distinzione fra gestire e fingere
(`c29`) preparano la 2.5 sui sorrisi, dove quella confusione è la regola.
Nessun aneddoto, come prevede lo script.

## Le grafiche

Quarantotto slide — due in più delle altre lezioni, perché le riprese qui
sono due e non tre — di cui **cinque con un disegno o un'infografica** e
**tre cicliche**: `c12`, `c22`, `c38`.

| slide | tipo | cosa mostra |
|---|---|---|
| `c12` | termometro (ciclica) | Chi cerca in alto si salta tutto quello che sta in basso. |
| `c22` | curva (ciclica) | Sale, resta, scende. È questione di secondi, non di minuti. |
| `c31` | quadranti | La bocca la governiamo da quando siamo bambini. Il resto molto meno. |
| `c38` | linea (ciclica) | Quattro momenti, e li decidi tutti tu. |
| `c46` | cruscotto | le quattro proprietà, in una riga |

Un parametro sbagliato trovato guardando le slide da ferme: `quadranti` vuole
`{xet, yet, celle}` — una etichetta per asse — e non due estremi per lato.

## Le due riprese

Lo script ne prevede due, non tre, e due restano: non si inventa una terza
per simmetria.

| blocco | cosa | perché lì |
|---|---|---|
| `s09` | un bicchiere d'acqua con un'increspatura appena visibile | sta sull'intensità: è letteralmente l'immagine che la lezione usa per dire cosa vedrai davvero |
| `s28` | un paio di occhiali accanto a un libro aperto, nessuna parola leggibile | sta sulla fine del passaggio su «gestire non è fingere», prima della quarta proprietà |

Le ho **viste tutte e due** prima di montarle, entrambe alla prima
generazione.

## I tagli — e il controllo che non si è potuto fare

**Stesso limite di tutto il corso**: crediti ElevenLabs a zero, trascrizione
di verifica impossibile, nessun riconoscitore locale installabile perché la
policy di rete chiude `huggingface.co` e `openaipublic.azureedge.net`.
**I quarantacinque confini non sono stati verificati parola per parola.**

Il controllo di durata ha trovato un confine spostato e lo ha fatto in modo
inequivocabile: la `s44` leggeva a **20,0 caratteri al secondo**, una
velocità che questa voce non raggiunge mai — la media è sedici. Il confine
`s44`/`s45` era caduto troppo presto e la coda della `s44` stava sulla `s45`.
Spostato nella pausa successiva, a 150,42 s, i due scarti sono rientrati.
**Dopo una correzione a mano non si può rifare `allinea`**: azzererebbe
`tagli.json`.

Restano **due confini** oltre 1,5 s: `s06` +1,58 e `s30` +3,05. Non sono
coppie uguali e opposte, e i due blocchi leggono a 13-14 caratteri al secondo
contro una media di sedici: sono frasi brevi con molte pause, che la voce dice
più lentamente. Cadono dentro un silenzio di 0,65 s e 0,55 s. **Vanno
risentiti quando i crediti tornano.**

## Le pose

35,7 secondi in tutto. È il valore più alto del corso, e ha una ragione
aritmetica: con due riprese invece di tre ci sono due slide in più su cui
distribuire, e il parlato tagliato è più corto.

## Da verificare

Non sento l'audio e non vedo il montato. Ho controllato tutte e cinque le
slide con un disegno e le due riprese. **I quarantacinque tagli non sono
verificati con la trascrizione**, per i crediti esauriti.

## Blocchi

`·` disegno o infografica · `▪` ripresa

| blocco | slide | tipo | durata (s) | posa (s) |
|---|---|---|---|---|
| s02 | `c02` | sostituzione | 12.93 | +1.16 |
| s03 | `c03` | frase | 12.18 | +0.26 |
| s04 | `c04` | sostituzione | 15.03 | +1.16 |
| s05 | `c05` | frase | 13.26 | +0.26 |
| s06 | `c06` | schede | 12.46 | +1.16 |
| s07 | `c07` | memo | 13.03 | +0.86 |
| s08 | `c08` | frase | 10.32 | +0.26 |
| s09 | ▪ bicchiere-increspatura | ripresa | 8.30 | — |
| s10 | `c10` | sostituzione | 11.54 | +1.16 |
| s11 | `c11` | frase | 12.46 | +0.26 |
| s12 | · `c12` | termometro | 13.12 | +1.56 |
| s13 | `c13` | memo | 12.57 | +0.86 |
| s14 | `c14` | frase | 12.12 | +0.26 |
| s15 | `c15` | frase | 12.47 | +0.26 |
| s16 | `c16` | memo | 13.49 | +0.86 |
| s17 | `c17` | elenco | 13.71 | +1.16 |
| s18 | `c18` | frase | 13.46 | +0.26 |
| s19 | `c19` | frase | 12.25 | +0.26 |
| s20 | `c20` | frase | 12.27 | +0.26 |
| s21 | `c21` | frase | 13.02 | +0.26 |
| s22 | · `c22` | curva | 12.36 | +1.56 |
| s23 | `c23` | sostituzione | 14.68 | +1.16 |
| s24 | `c24` | elenco | 12.53 | +1.16 |
| s25 | `c25` | frase | 13.87 | +0.26 |
| s26 | `c26` | memo | 4.86 | +2.92 |
| s27 | `c27` | frase | 12.15 | +0.26 |
| s28 | ▪ occhiali-e-libro | ripresa | 8.43 | — |
| s29 | `c29` | sostituzione | 12.46 | +1.16 |
| s30 | `c30` | frase | 14.43 | +0.26 |
| s31 | · `c31` | quadranti | 11.89 | +1.56 |
| s32 | `c32` | memo | 12.66 | +0.86 |
| s33 | `c33` | frase | 10.45 | +0.26 |
| s34 | `c34` | schede | 12.11 | +1.16 |
| s35 | `c35` | frase | 13.41 | +0.26 |
| s36 | `c36` | frase | 11.25 | +0.26 |
| s37 | `c37` | frase | 12.84 | +0.26 |
| s38 | · `c38` | linea | 15.41 | +1.56 |
| s39 | `c39` | frase | 13.66 | +0.26 |
| s40 | `c40` | frase | 10.48 | +0.26 |
| s41 | `c41` | elenco | 11.28 | +1.16 |
| s42 | `c42` | frase | 13.57 | +0.26 |
| s43 | `c43` | frase | 10.62 | +0.26 |
| s44 | `c44` | frase | 11.05 | +0.26 |
| s45 | `c45` | frase | 9.68 | +0.26 |
| s46 | · `c46` | cruscotto | 12.97 | +1.56 |
| s47 | `c47` | memo | 4.86 | +2.52 |
| s48 | `c48` | frase | 12.49 | +0.26 |
| s49 | `c49` | elenco | 20.34 | +1.16 |
