# Registro — 1.1 «Cosa puoi vedere e cosa no»

Apertura del corso «Capire i segni del linguaggio non verbale». Prima lezione
di trentacinque. Trattamento standard del canale, con le scelte nuove di questo
corso: **nessun avatar**, voce **Luca Ward** su **`eleven_v4`**, slide a piena
inquadratura per ogni blocco.

| campo | valore |
|---|---|
| video_id | `7d8cc3f42b1723f8202dc47b4e6dc66a` |
| scene | 50 — copertina, 48 blocchi, chiusura |
| formato | 16:9, 1080p |
| durata | 598,6 s (9:59) |
| parlato | 586,8 s (9:47) |
| voce | Luca Ward `tVdVcJPudubxmTmAw4tE`, `eleven_v4`, 1,12× in post |
| flow ElevenLabs | `ScN5kTNow43G8I4MCEuY` |
| tracce | A `vQmnjyNkqC8T1YBTmR1s` · B `QMFSZ3Yp2scVaBHWHTrC` · C `OIekENSCwewWbcx4OfQs` |

## Il copione è stato riscritto

Da **4.100** caratteri dichiarati dallo script a **10.292**: due volte e mezzo,
che è quello che servono dieci minuti. Lo script aveva lo scheletro giusto — la
rinuncia alla promessa, i tre gradini, le quattro cause, i tre danni, la
sostituzione finale. Mancava quasi tutto il «perché».

- **perché il problema non è la disonestà di chi insegna**: l'effetto di un
  corso sulla lettura delle persone si sente e non si misura, quindi nessuno
  scopre mai che non funziona;
- **perché «più sicuro e non più accurato» è la combinazione peggiore**: e non
  come battuta, ma come anticipo delle misure del modulo 2;
- **che cosa vuol dire davvero verificare**: una lettura resta un'opinione per
  mesi, una domanda si chiude in dieci secondi — ed è l'unica differenza fra un
  metodo e una suggestione;
- **perché il terzo gradino non è un gradino**: fra «forse è a disagio» e «è a
  disagio perché» non manca un ragionamento, manca un dato;
- **perché il meccanismo produce conferme e non ignoranza**: un'ignoranza si
  sente come un buco e prima o poi si corregge, una conferma arriva con la
  faccia di una prova e si deposita;
- **perché il terzo danno è il peggiore**: si autoalimenta, perché chi ha
  saltato la verifica ha anche zittito l'unica persona che poteva smentirlo.

## L'aneddoto

Scene `s39`–`s42`, circa quaranta secondi. **Inventato**, come prevede
`MASTER.md` §0.2: il figlio di una paziente che sta in fondo al corridoio e non
entra in stanza, letto come rabbia verso il reparto, e invece era una cosa sua
che non voleva far vedere alla madre. Chiude su «Avevo visto bene. Avevo capito
male.», che è la frase da cui nasce tutto il corso. Nessun dettaglio
verificabile: niente nomi, niente reparto, niente date.

## Le grafiche

Quarantasette slide. Trentotto portano testo (frasi, elenchi, memo, citazioni,
tabelle, sostituzioni) e **nove un disegno o un'infografica**, di cui **tre
cicliche** — `c07`, `c27`, `c38`.

| slide | tipo | cosa mostra |
|---|---|---|
| `c07` | bilancia (ciclica) | Alla fine pesa la fiducia. L'accuratezza è rimasta dov'era. |
| `c11` | confronto | una lettura contro una domanda, riga per riga |
| `c16` | linea | quanto dura il salto |
| `c17` | ponte | Non manca un ragionamento. Manca un dato. |
| `c24` | raggi | Da fuori producono tutte la stessa immagine. |
| `c27` | anello (ciclica) | Non produce ignoranza. Produce conferme. |
| `c31` | pila | Arriva con la faccia di una prova. E resta. |
| `c38` | imbuto (ciclica) | E non c'è più niente che lo corregga. |
| `c43` | flusso | Tre cose concrete. Nessuna delle tre riguarda l'altro. |

Tre scelte vanno spiegate perché sono state corrette dopo aver guardato i PNG:

- **`c07` bilancia**: la didascalia diceva «Sale una delle due», ma in una
  bilancia il piatto che pesa *scende*, e il disegno contraddiceva la frase.
  Riscritta: «Alla fine pesa la fiducia. L'accuratezza è rimasta dov'era.»
- **`c16` linea**: i tre momenti erano a 2, 9 e 16 su cento per rendere il
  «decimo di secondo», e le tre etichette si sovrapponevano fino a essere
  illeggibili. Spostati a 6, 26 e 46: il contrasto fra i tre punti ammassati a
  sinistra e la linea lunga vuota regge lo stesso significato.
- **`c24` raggi**: nessuna etichetta nomina una direzione. Il layout dispone i
  satelliti su quattro diagonali fisse, e una parola come «a destra» ci finisce
  dove capita — era già successo nella 8.3.

## Le tre riprese

Nessun volto, nessuna persona: ambienti e oggetti, in palette.

| blocco | cosa | perché lì |
|---|---|---|
| `s08` | un taccuino aperto, penna accanto, luce da finestra | sta sulla frase che dice che quello che si può imparare è annotare, non concludere |
| `s20` | una sedia vuota scostata da un tavolo | sta sul blocco delle molte cause: lo stesso fatto visibile, e niente che dica perché |
| `s37` | un corridoio chiaro con una porta socchiusa in fondo | sta sul terzo danno, quello in cui l'altro si è chiuso |

Le ho **viste tutte e tre**. Il primo corridoio generato era scrostato e fuori
palette e la prima sedia non era ispezionabile: rifatti entrambi finché il
generatore non li ha restituiti dentro la risposta.

## I tagli — e il controllo che non si è potuto fare

**Qui c'è un limite dichiarato.** I crediti ElevenLabs sono a zero: la
trascrizione di verifica di `prova.mp3` ne chiede circa mille e la chiamata
fallisce. Non c'è ripiego, perché la policy di rete chiude `huggingface.co` e
`openaipublic.azureedge.net`, quindi nemmeno un riconoscitore locale si può
installare. **I quarantacinque confini non sono stati verificati parola per
parola.**

Quello che si è potuto fare, e che ha trovato e corretto problemi veri:

1. **Il controllo di durata attesa.** Per ogni blocco si confronta la durata del
   taglio con `caratteri ÷ velocità della traccia`. Se un confine cade dentro
   una frase, il blocco prima risulta corto e quello dopo lungo, in misura
   uguale e opposta. Al primo giro: **diciassette blocchi fuori banda**, con
   coppie opposte evidenti (`s08` +4,82 s contro `s09` −5,06 s).
2. **Primo difetto trovato: i pesi contavano i tag.** `tagli.py` pesava i
   blocchi con la lunghezza grezza del testo, e `[serious] ` sono dieci
   caratteri che la voce non pronuncia. La traccia B, l'unica senza tag, veniva
   infatti perfetta. Corretto in `tagli.py`.
3. **Secondo difetto, quello grosso: il pool dei candidati era troppo stretto.**
   Entravano solo le `1,6 × N` pause più lunghe, e la pausa giusta a volte
   restava fuori dall'elenco. Portato a `4 × N`: lo scarto totale è sceso da
   **75,8 s a 35,5 s**, i blocchi fuori banda da **quindici a cinque**, il
   peggiore da 6,55 s a 2,99 s. Oltre 4 non cambia più niente, perché il premio
   alle pause lunghe tiene l'assegnazione lontana dai respiri anche col pool
   saturo.

Restano **cinque confini** con scarto fra 1,5 e 3,0 s: `s20` +2,13, `s22`
−2,09, `s38` −1,59, `s39` −1,52, `s44` +2,99. Cadono comunque tutti dentro un
silenzio di almeno 0,20 s, quindi non spezzano una parola: al peggio una
proposizione breve sta sulla slide del blocco vicino per un paio di secondi.
**Vanno risentiti quando i crediti tornano.**

## Le pose

Trentuno secondi in tutto, e non distribuiti in parti uguali. `script/pose.py`
dà a ogni schermata un minimo in scena e un supplemento per tipo, e spalma il
resto: **1,35 s medi** ai nove disegni, **0,95 s** ai tredici elenchi,
**1,12 s** ai cinque fra memo e citazioni, **0,05 s** alle diciotto frasi. Il
minimo ha risolto un caso che sarebbe passato: il memo `s18` — «La causa non si
vede mai.» — durava **1,65 s**, cioè non si leggeva. Adesso sta in scena 4,65 s.

Il conto chiude a **586,8 s** di parlato che, con i 3 s di copertina e i 10 s di
chiusura, fanno **9:59**.

## Da verificare

Non sento l'audio e non vedo il montato. Ho controllato le slide da ferme (tutte
e quarantasette) e le tre riprese. **I quarantacinque tagli non sono verificati
con la trascrizione**, per i crediti esauriti: vale quanto scritto sopra.

## Blocchi

`·` disegno o infografica · `▪` ripresa

| blocco | slide | tipo | durata (s) | posa (s) |
|---|---|---|---|---|
| s02 | `c02` | citazione | 11.73 | +0.65 |
| s03 | `c03` | frase | 10.16 | +0.05 |
| s04 | `c04` | frase | 11.06 | +0.05 |
| s05 | `c05` | tabella | 12.43 | +0.95 |
| s06 | `c06` | memo | 4.91 | +0.65 |
| s07 | · `c07` | bilancia | 12.36 | +1.35 |
| s08 | ▪ taccuino-aperto | ripresa | 12.82 | — |
| s09 | `c09` | elenco | 14.60 | +0.95 |
| s10 | `c10` | frase | 11.53 | +0.05 |
| s11 | · `c11` | confronto | 13.77 | +1.35 |
| s12 | `c12` | frase | 12.57 | +0.05 |
| s13 | `c13` | elenco | 13.06 | +0.95 |
| s14 | `c14` | elenco | 12.87 | +0.95 |
| s15 | `c15` | elenco | 13.27 | +0.95 |
| s16 | · `c16` | linea | 12.88 | +1.35 |
| s17 | · `c17` | ponte | 11.73 | +1.35 |
| s18 | `c18` | memo | 4.65 | +3.00 |
| s19 | `c19` | frase | 11.82 | +0.05 |
| s20 | ▪ sedia-scostata | ripresa | 14.18 | — |
| s21 | `c21` | elenco | 10.85 | +0.95 |
| s22 | `c22` | elenco | 12.14 | +0.95 |
| s23 | `c23` | elenco | 12.11 | +0.95 |
| s24 | · `c24` | raggi | 12.13 | +1.35 |
| s25 | `c25` | frase | 11.41 | +0.05 |
| s26 | `c26` | frase | 10.79 | +0.05 |
| s27 | · `c27` | anello | 12.13 | +1.35 |
| s28 | `c28` | frase | 12.17 | +0.05 |
| s29 | `c29` | sostituzione | 12.49 | +0.95 |
| s30 | `c30` | frase | 11.77 | +0.05 |
| s31 | · `c31` | pila | 12.63 | +1.35 |
| s32 | `c32` | frase | 12.48 | +0.05 |
| s33 | `c33` | elenco | 13.70 | +0.95 |
| s34 | `c34` | frase | 12.62 | +0.05 |
| s35 | `c35` | elenco | 12.43 | +0.95 |
| s36 | `c36` | frase | 11.36 | +0.05 |
| s37 | ▪ porta-socchiusa | ripresa | 11.27 | — |
| s38 | · `c38` | imbuto | 11.44 | +1.35 |
| s39 | `c39` | frase | 11.40 | +0.05 |
| s40 | `c40` | frase | 12.40 | +0.05 |
| s41 | `c41` | frase | 13.41 | +0.05 |
| s42 | `c42` | memo | 13.64 | +0.65 |
| s43 | · `c43` | flusso | 13.70 | +1.35 |
| s44 | `c44` | frase | 13.95 | +0.05 |
| s45 | `c45` | frase | 10.82 | +0.05 |
| s46 | `c46` | frase | 11.30 | +0.05 |
| s47 | `c47` | sostituzione | 13.72 | +0.95 |
| s48 | `c48` | memo | 12.79 | +0.65 |
| s49 | `c49` | elenco | 21.38 | +0.95 |
