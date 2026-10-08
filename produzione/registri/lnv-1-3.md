# Registro — 1.3 «Il segnale non è un significato»

Smonta il dizionario segnale-significato e mette al suo posto le tre
condizioni: il gruppo, il contesto, il cambiamento. È la lezione che fissa il
vincolo di contenuto del corso — nessun segnale viene nominato senza la sua
condizione.

| campo | valore |
|---|---|
| video_id | `1def2634f6325ac79f3ab7c13956a9cd` |
| scene | 50 — copertina, 48 blocchi, chiusura |
| formato | 16:9, 1080p |
| durata | 598,7 s (9:59) |
| parlato | 587,0 s |
| voce | Luca Ward `tVdVcJPudubxmTmAw4tE`, `eleven_v4`, 1,12× in post |
| flow ElevenLabs | `jbsNx5iWBaiqwwdFZdCQ` |
| tracce | A `jIuk3ezz74tSr0tnEbnc` · B `bmCYeqUl50NdS1DWxmjP` · C `chSTU9NI2facwfMdirLc` |

## Il copione è stato riscritto

Da circa **5.800** caratteri dichiarati dallo script a **10.342**. Lo
script aveva lo scheletro giusto; mancava quasi tutto il «perché».

- **perché un dizionario non può funzionare, non solo perché sbaglia**: una
  corrispondenza stabile qui non c'è, e le cinque cause delle braccia conserte
  lo mostrano una per una;
- **perché il dizionario è attraente**: toglie fatica, e la sensazione di
  sapere si prova identica quando hai ragione e quando hai torto;
- **come diventa inattaccabile**: funziona a posteriori, raccoglie solo i casi
  che lo confermano, e li raccoglie quando il finale è già noto;
- **perché il gruppo conta**: non perché tre segnali valgano più di uno, ma
  perché rendono meno probabili le spiegazioni banali — il freddo non sa di
  cosa stai parlando, quindi non può sincronizzarsi con te;
- **le due differenze che lo affondano**: fra persone il rumore è più grande
  del segnale, e fra culture cambia perfino cosa è educato.

## Note di contenuto

`c14` usa il layout `raggi`, e come nella 1.1 nessuna etichetta nomina una
direzione: il layout dispone i satelliti su quattro diagonali fisse, e una
parola come «a destra» ci finisce dove capita.

## Le grafiche

Quarantasette slide, di cui **otto con un disegno o un'infografica**
e **tre cicliche**: `c19`, `c23`, `c46`.

| slide | tipo | cosa mostra |
|---|---|---|
| `c14` | raggi | Da fuori sono indistinguibili. Nessun addestramento le separa. |
| `c19` | bilancia (ciclica) | Si prova identica quando hai ragione e quando hai torto. |
| `c23` | anello (ciclica) | Raccoglie solo i casi che lo confermano, e li raccoglie dopo. |
| `c24` | flusso | Tre condizioni. È la regola centrale di tutto il corso. |
| `c33` | linea | lo stesso segnale, due letture |
| `c34` | linea | e invece questo |
| `c40` | barre | Il rumore è più grande del segnale, se non parti dalla persona. |
| `c46` | imbuto (ciclica) | Più sicuro. E non più preciso. |

## Le tre riprese

| blocco | cosa | perché lì |
|---|---|---|
| `s08` | una persona seduta con le braccia incrociate, di tre quarti da dietro, volto non visibile | è l'esempio della lezione, e sta dove si comincia a elencarne le cause |
| `s20` | un tavolo da riunione dall'alto, quattro posti, nessuno seduto | sta sul secondo motivo: il dizionario spiega sempre, a cose fatte |
| `s37` | due persone in corridoio, una gesticola e l'altra tiene le mani ferme | sta sulle differenze fra persone, che è il punto successivo |

Le ho **viste tutte e tre** prima di montarle: il proxy blocca il CDN in
scaricamento, ma il generatore le restituisce dentro la risposta, una per
chiamata. Nessun volto è identificabile in nessuna delle tre.

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
pool dei candidati a 4×N — restano **sei confini** con scarto oltre 1,5 s:
`s02` +1,95 · `s25` +1,55 · `s29` +1,80 · `s37` −1,58 · `s41` +1,53 · `s46` −2,59. Cadono tutti dentro un silenzio di almeno 0,20 s, quindi non
spezzano una parola: al peggio una proposizione breve sta sulla slide del
blocco vicino per un paio di secondi. **Vanno risentiti quando i crediti
tornano.**

## Le pose

35,0 secondi in tutto, distribuiti per tipo di schermata da
`script/pose.py`: un minimo in scena e un supplemento per i disegni, gli
elenchi e i memo, e il resto spalmato in parti uguali. Il conto chiude a
**587,0 s** di parlato, che con i 3 s di copertina e i 10 s di chiusura
fanno **9:59**.

## Da verificare

Non sento l'audio e non vedo il montato. Ho controllato le slide da ferme e
le tre riprese. **I quarantacinque tagli non sono verificati con la
trascrizione**, per i crediti esauriti: vale quanto scritto sopra.

## Blocchi

`·` disegno o infografica · `▪` ripresa

| blocco | slide | tipo | durata (s) | posa (s) |
|---|---|---|---|---|
| s02 | `c02` | tabella | 16.70 | +1.09 |
| s03 | `c03` | frase | 12.67 | +0.19 |
| s04 | `c04` | sostituzione | 14.40 | +1.09 |
| s05 | `c05` | frase | 13.31 | +0.19 |
| s06 | `c06` | memo | 13.50 | +0.79 |
| s07 | `c07` | citazione | 10.46 | +0.79 |
| s08 | ▪ braccia-incrociate | ripresa | 11.55 | — |
| s09 | `c09` | elenco | 11.02 | +1.09 |
| s10 | `c10` | elenco | 13.04 | +1.09 |
| s11 | `c11` | elenco | 12.95 | +1.09 |
| s12 | `c12` | elenco | 12.43 | +1.09 |
| s13 | `c13` | elenco | 11.37 | +1.09 |
| s14 | · `c14` | raggi | 11.81 | +1.49 |
| s15 | `c15` | memo | 10.88 | +0.79 |
| s16 | `c16` | frase | 9.94 | +0.19 |
| s17 | `c17` | frase | 11.44 | +0.19 |
| s18 | `c18` | frase | 14.41 | +0.19 |
| s19 | · `c19` | bilancia | 14.15 | +1.49 |
| s20 | ▪ tavolo-dall-alto | ripresa | 10.97 | — |
| s21 | `c21` | frase | 13.97 | +0.19 |
| s22 | `c22` | frase | 11.75 | +0.19 |
| s23 | · `c23` | anello | 12.76 | +1.49 |
| s24 | · `c24` | flusso | 12.30 | +1.49 |
| s25 | `c25` | elenco | 12.90 | +1.09 |
| s26 | `c26` | frase | 11.03 | +0.19 |
| s27 | `c27` | frase | 13.54 | +0.19 |
| s28 | `c28` | sostituzione | 11.23 | +1.09 |
| s29 | `c29` | frase | 12.40 | +0.19 |
| s30 | `c30` | frase | 11.74 | +0.19 |
| s31 | `c31` | frase | 12.11 | +0.19 |
| s32 | `c32` | memo | 8.38 | +0.79 |
| s33 | · `c33` | linea | 13.84 | +1.49 |
| s34 | · `c34` | linea | 11.76 | +1.49 |
| s35 | `c35` | memo | 4.79 | +2.43 |
| s36 | `c36` | frase | 10.68 | +0.19 |
| s37 | ▪ due-in-corridoio | ripresa | 8.57 | — |
| s38 | `c38` | frase | 9.93 | +0.19 |
| s39 | `c39` | frase | 11.14 | +0.19 |
| s40 | · `c40` | barre | 12.37 | +1.49 |
| s41 | `c41` | frase | 14.02 | +0.19 |
| s42 | `c42` | elenco | 13.58 | +1.09 |
| s43 | `c43` | frase | 14.79 | +0.19 |
| s44 | `c44` | elenco | 10.86 | +1.09 |
| s45 | `c45` | frase | 12.14 | +0.19 |
| s46 | · `c46` | imbuto | 10.07 | +1.49 |
| s47 | `c47` | citazione | 13.70 | +0.79 |
| s48 | `c48` | frase | 12.21 | +0.19 |
| s49 | `c49` | elenco | 21.39 | +1.09 |
