# Registro — 1.4 «La linea di base»

Il concetto portante del corso: la linea di base come unità di misura, e la
regola che tutte le altre lezioni useranno — non conta come sta, conta come
sta rispetto a come stava.

| campo | valore |
|---|---|
| video_id | `a30c34a8a353be9153dce1b6663dbc9b` |
| scene | 50 — copertina, 48 blocchi, chiusura |
| formato | 16:9, 1080p |
| durata | 604,5 s (10:04) |
| parlato | 592,6 s |
| voce | Luca Ward `tVdVcJPudubxmTmAw4tE`, `eleven_v4`, 1,12× in post |
| flow ElevenLabs | `3LAckHiR1guVFe9AezYt` |
| tracce | A `m5L3Y7Nz4S3zqsFOW9Cz` · B `7XzDvvqNj3Swy7TZcIQq` · C `V3Ql3sAtPtUOqTddE64z` |

## Il copione è stato riscritto

Da circa **5.300** caratteri dichiarati dallo script a **10.533**. Lo
script aveva lo scheletro giusto; mancava quasi tutto il «perché».

- **cosa la linea di base non è**: non un tratto della personalità, non una
  diagnosi. Un metro, che non dice niente su quello che misura;
- **dove si costruisce**: nei primi minuti su argomenti neutri, che sembrano
  sprecati e sono i più informativi, perché non c'è ancora niente da difendere;
- **perché descrizioni e non giudizi**: «è agitata» diventa il metro con cui
  misurerai tutto il resto, e un metro storto non sbaglia una misura: le storce
  tutte nella stessa direzione;
- **il picco contro la transizione**: quando noti che una persona è rigida sei
  già in ritardo, e la cosa che l'ha prodotto è già passata;
- **i tre casi in cui lo strumento non si usa**, detti per intero, perché sono
  quelli in cui qualcuno prova a usarlo lo stesso.

## Note di contenuto

La scena degli errori dello script — il metro siamo noi — è qui `s44`–`s46`,
su fondo tenue, e non è stata né tagliata né abbreviata: lo script la segnala
come la parte che gli studenti citeranno.

Questa lezione ha sforato di poco i dieci minuti (parlato 592,6 s invece di
587): i minimi di permanenza in scena, sommati, superavano il bersaglio e
`pose.py` ha azzerato la base invece di comprimerli.

## Le grafiche

Quarantasette slide, di cui **sei con un disegno o un'infografica**
e **tre cicliche**: `c19`, `c31`, `c35`.

| slide | tipo | cosa mostra |
|---|---|---|
| `c05` | bivio | Lo stesso dato. Un non-dato, e un dato enorme. |
| `c10` | cruscotto | le quattro voci che compongono il metro |
| `c19` | linea (ciclica) | quando guardare |
| `c26` | confronto |  |
| `c31` | curva (ciclica) | Non il picco. L'istante in cui cambia. |
| `c35` | bilancia (ciclica) | Il primo è facile e arriva tardi. Il secondo è difficile e arriva in tempo. |

## Le tre riprese

| blocco | cosa | perché lì |
|---|---|---|
| `s08` | un metro da sarto arrotolato su un piano di legno | sta dove il concetto prende il suo nome: è un metro, non un giudizio |
| `s20` | una tazzina di caffè al bancone, due persone sfocate che parlano | sta sui primi minuti su argomenti neutri, dove la linea di base si costruisce |
| `s37` | una sedia vuota davanti a una scrivania | sta sui tre casi in cui lo strumento non si può usare |

Le ho **viste tutte e tre** prima di montarle: il proxy blocca il CDN in
scaricamento, ma il generatore le restituisce dentro la risposta, una per
chiamata. La prima versione del metro da sarto non è tornata dentro la
risposta e quindi non si poteva guardare: rigenerata finché non è stata
ispezionabile.

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
pool dei candidati a 4×N — restano **cinque confini** con scarto oltre 1,5 s:
`s04` −1,50 · `s13` −2,07 · `s15` +1,85 · `s30` −2,03 · `s49` +2,33. Cadono tutti dentro un silenzio di almeno 0,20 s, quindi non
spezzano una parola: al peggio una proposizione breve sta sulla slide del
blocco vicino per un paio di secondi. **Vanno risentiti quando i crediti
tornano.**

## Le pose

21,9 secondi in tutto, distribuiti per tipo di schermata da
`script/pose.py`: un minimo in scena e un supplemento per i disegni, gli
elenchi e i memo, e il resto spalmato in parti uguali. Il conto chiude a
**592,6 s** di parlato, che con i 3 s di copertina e i 10 s di chiusura
fanno **10:04**.

## Da verificare

Non sento l'audio e non vedo il montato. Ho controllato le slide da ferme e
le tre riprese. **I quarantacinque tagli non sono verificati con la
trascrizione**, per i crediti esauriti: vale quanto scritto sopra.

## Blocchi

`·` disegno o infografica · `▪` ripresa

| blocco | slide | tipo | durata (s) | posa (s) |
|---|---|---|---|---|
| s02 | `c02` | frase | 11.22 | +0.00 |
| s03 | `c03` | memo | 11.57 | +0.60 |
| s04 | `c04` | frase | 10.21 | +0.00 |
| s05 | · `c05` | bivio | 11.61 | +1.30 |
| s06 | `c06` | frase | 11.18 | +0.00 |
| s07 | `c07` | frase | 11.01 | +0.00 |
| s08 | ▪ metro-da-sarto | ripresa | 9.81 | — |
| s09 | `c09` | elenco | 13.22 | +0.90 |
| s10 | · `c10` | cruscotto | 12.47 | +1.30 |
| s11 | `c11` | sostituzione | 13.60 | +0.90 |
| s12 | `c12` | memo | 14.59 | +0.60 |
| s13 | `c13` | frase | 10.61 | +0.00 |
| s14 | `c14` | memo | 4.60 | +2.19 |
| s15 | `c15` | frase | 14.27 | +0.00 |
| s16 | `c16` | frase | 11.85 | +0.00 |
| s17 | `c17` | elenco | 14.18 | +0.90 |
| s18 | `c18` | frase | 14.53 | +0.00 |
| s19 | · `c19` | linea | 14.58 | +1.30 |
| s20 | ▪ tazzina-al-bancone | ripresa | 9.06 | — |
| s21 | `c21` | schede | 12.06 | +0.90 |
| s22 | `c22` | frase | 12.10 | +0.00 |
| s23 | `c23` | frase | 12.30 | +0.00 |
| s24 | `c24` | frase | 12.95 | +0.00 |
| s25 | `c25` | memo | 13.82 | +0.60 |
| s26 | · `c26` | confronto | 13.38 | +1.30 |
| s27 | `c27` | frase | 11.65 | +0.00 |
| s28 | `c28` | frase | 14.93 | +0.00 |
| s29 | `c29` | frase | 11.91 | +0.00 |
| s30 | `c30` | elenco | 12.65 | +0.90 |
| s31 | · `c31` | curva | 16.08 | +1.30 |
| s32 | `c32` | memo | 4.60 | +2.26 |
| s33 | `c33` | frase | 10.67 | +0.00 |
| s34 | `c34` | frase | 12.02 | +0.00 |
| s35 | · `c35` | bilancia | 13.07 | +1.30 |
| s36 | `c36` | citazione | 14.12 | +0.60 |
| s37 | ▪ sedia-davanti-scrivania | ripresa | 12.12 | — |
| s38 | `c38` | elenco | 13.17 | +0.90 |
| s39 | `c39` | frase | 10.77 | +0.00 |
| s40 | `c40` | frase | 11.61 | +0.00 |
| s41 | `c41` | frase | 11.42 | +0.00 |
| s42 | `c42` | frase | 13.15 | +0.00 |
| s43 | `c43` | frase | 11.12 | +0.00 |
| s44 | `c44` | frase | 14.26 | +0.00 |
| s45 | `c45` | tabella | 13.23 | +0.90 |
| s46 | `c46` | frase | 11.67 | +0.00 |
| s47 | `c47` | frase | 13.38 | +0.00 |
| s48 | `c48` | frase | 9.88 | +0.00 |
| s49 | `c49` | elenco | 24.33 | +0.90 |
