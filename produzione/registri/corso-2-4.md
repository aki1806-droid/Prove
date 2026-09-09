# Registro — 2.4 «Le domande che aprono e quelle che indagano»

Senza avatar, voce Luca Ward, slide animate. È la prima lezione con
l'impianto visivo che Achille ha chiesto: molte più grafiche, e per la prima
volta fotografie e videoclip generati con **Higgsfield**.

| campo | valore |
|---|---|
| video_id | `6432fccdb786c880535c7412b32d45e6` |
| scene | 44 — copertina, 42 blocchi, chiusura |
| formato | 16:9, 1080p, sottotitoli SRT |
| durata | **5:59** (359,1 s — attesi 360,0) |
| parlato | 347,0 s |
| pagina | https://app.heygen.com/videos/6432fccdb786c880535c7412b32d45e6 |

## Il copione è stato riscritto

Da **2.095** caratteri a **5.861**. Le aggiunte non sono riempitivo:

- la **scena delle undici e mezza**: la porta che si apre e le due frasi che
  hai tutte e due sulla punta della lingua;
- lo stesso identico meccanismo **al lavoro** — «com'è andata col cliente»
  contro «ha firmato»;
- la **regola dell'imbuto**, che è l'unica regola d'ordine che serve, con il
  premio che nessuno si aspetta: la domanda stretta, fatta dopo, riceve una
  risposta migliore, perché a quel punto l'altro te la sta dando invece di
  consegnartela;
- il **test delle risposte possibili**: se ce n'è una sola stai indagando. E
  la trappola delle chiuse travestite da aperte («ti è piaciuto?»);
- il perché **non lo salvi con il tono**: la parola arriva prima del tono;
- dove il perché va benissimo — **sulle cose**: lì cerca una causa, sulle
  persone cerca una colpa;
- come si dice «e poi»: **la faccia di chi aspetta il seguito** è un invito,
  quella di chi aspetta il punto è fretta, ed è peggio del silenzio.

Nessun aneddoto: qui le sostituzioni fanno quel lavoro.

## Le grafiche

Sette slide grafiche, contro le tre della 2.3.

| slide | tipo | cosa mostra |
|---|---|---|
| c05 | tabella | Apre / Indaga, tre righe di confronto |
| c12 | disegno | l'imbuto: bocca larga in blu, collo stretto in oro |
| c15 | grafico | risposte possibili: una barra corta contro una piena |
| c24 | sostituzioni | perché → cosa, con la freccia d'oro |
| c28 | numero | il «2» di «e poi» |
| c31 | tabella | invito / fretta, le due versioni della stessa frase |
| c33 | schede | le tre finte domande, con tre icone nuove |

Due layout sono nuovi e stanno ora in `slide_corso.mjs`: **`chart`** e
**`swap`**. Il grafico non serve a fare statistica — se servisse a quello
sarebbe un numero inventato — serve quando il confronto **è** la frase:
«una risposta possibile» contro «molte» è un fatto di struttura, non una
misura. Aggiunto anche `table` con `pari: true`, per quando le due colonne
sono ugualmente legittime e non un prima/dopo.

## Le sei riprese

Quattro fotografie e due videoclip, tutti generati con Higgsfield.

| blocco | tipo | cosa |
|---|---|---|
| s04 | b-roll | ingresso di casa la sera, chiavi sul mobile, luce in fondo al corridoio |
| s11 | foto | sala riunioni appena svuotata, due tazze, una cartella chiusa |
| s22 | foto | cucina di sera, due sedie storte |
| s26 | foto | cofano aperto, vano motore, lampada da lavoro |
| s35 | b-roll | stanza spoglia, due sedie di fronte, luce dura: un interrogatorio |
| s42 | foto | due tazze, una fuma ancora, l'altra è fredda |

**Higgsfield costa un ordine di grandezza meno di Artlist**: 32,5 crediti per
5 secondi di video e 2 per un'immagine, contro i 400 crediti dei 5 secondi
Artlist della 2.2. Le sei riprese sono costate **73 crediti in tutto**.

Due cose da sapere, però.

1. **Il proxy blocca il CDN di Higgsfield in scaricamento.** HeyGen se li
   prende da sé passandogli l'URL — verificato con un montaggio di prova da
   due scene prima di impegnare il render intero — ma qui i byte non
   arrivano. Quindi queste immagini **non si possono comporre sotto il
   testo**: vanno usate come scene intere, con il parlato sopra. Il layout
   `foto` resta valido solo per immagini che riesco a scaricare.
2. **Non le ho viste.** Per lo stesso motivo non posso aprirle. I prompt sono
   prudenti — nessuna persona, nessun volto, nessun testo — ma il giudizio su
   queste sei inquadrature tocca ad Achille.

Per confronto: generare le stesse immagini su ElevenLabs, che sarebbero
scaricabili e quindi controllabili, costa **818 crediti l'una**. Ne ho fatta
una sola, per misurare, e non la uso.

## I tagli

Quaranta confini, tre tornate: 7 sbagliati alla prima, 3 alla seconda, zero
alla terza. Sono usciti due difetti di `tagli.py`, corretti:

- **il confine giusto può essere una pausa sotto la soglia.** Dopo «Perché.»,
  che è un blocco da una parola sola, la pausa era di **0,15 s**: il
  rilevamento normale non la vedeva e il taglio finiva quattro secondi più
  in là, dentro la frase dopo. Ora, quando fra i candidati normali non ce n'è
  nessuno utile, si guarda con una soglia più fine.
- **il confine corrente non va considerato fra i candidati.** La coda
  trascritta dice che il taglio è fuori posto: lasciarlo dov'è contraddice la
  prova. Senza questa regola una coda corta — mancava «e poi», mezzo secondo
  — si «correggeva» su se stessa, perché il candidato più vicino alla stima
  era il vecchio.

Una trappola di lettura, non di codice: `scribe` ha trascritto «Perché?» con
il punto interrogativo, e il mio taglio delle code in frasi si è sfasato di
uno, facendo sembrare sbagliati ventiquattro confini su quaranta. Le code si
separano su `.`, `?` e `!`, non solo sul punto.

## Due pose

`s18` («Perché.») dura 1,3 secondi e `s28` («E poi.») ne dura 0,8: il tempo
di dire la parola. Troppo poco perché la slide arrivi. Tutte e due sono
allungate a **4 secondi** con `apad`, che è anche la pausa che quelle due
parole vogliono.

## Blocchi

`·` slide grafica · `▪` ripresa Higgsfield

| blocco | slide | tipo | durata (s) |
|---|---|---|---|
| s02 | c02 | frase | 6.73 |
| s03 | c03 | memo | 10.92 |
| s04 | — | b-roll — ingresso di casa la sera, chiavi sul mobile, luce in fondo al corridoio **▪** | 10.10 |
| s05 | c05 | tabella **·** | 9.62 |
| s06 | c06 | frase | 10.26 |
| s07 | c07 | frase | 9.74 |
| s08 | c08 | frase | 12.32 |
| s09 | c09 | memo | 5.35 |
| s10 | c10 | frase | 8.84 |
| s11 | — | foto — sala riunioni appena svuotata, due tazze, una cartella chiusa **▪** | 11.83 |
| s12 | c12 | disegno **·** | 8.99 |
| s13 | c13 | frase | 10.46 |
| s14 | c14 | frase | 7.31 |
| s15 | c15 | grafico **·** | 11.24 |
| s16 | c16 | frase | 12.21 |
| s17 | c17 | frase | 2.40 |
| s18 | c18 | citazione (posa) | 4.00 |
| s19 | c19 | frase | 7.40 |
| s20 | c20 | frase | 8.49 |
| s21 | c21 | memo | 10.16 |
| s22 | — | foto — cucina di sera, due sedie storte, una conversazione finita male **▪** | 10.39 |
| s23 | c23 | frase | 6.04 |
| s24 | c24 | sostituzioni **·** | 9.34 |
| s25 | c25 | frase | 6.94 |
| s26 | — | foto — cofano aperto, vano motore, lampada da lavoro **▪** | 12.33 |
| s27 | c27 | frase | 3.94 |
| s28 | c28 | numero **·** (posa) | 4.00 |
| s29 | c29 | frase | 9.55 |
| s30 | c30 | frase | 7.43 |
| s31 | c31 | tabella **·** | 11.79 |
| s32 | c32 | frase | 8.38 |
| s33 | c33 | schede **·** | 5.54 |
| s34 | c34 | citazione | 10.74 |
| s35 | — | b-roll — stanza spoglia, tavolo e due sedie di fronte, luce dura: un interrogatorio **▪** | 10.32 |
| s36 | c36 | memo | 4.92 |
| s37 | c37 | frase | 7.88 |
| s38 | c38 | frase | 7.61 |
| s39 | c39 | frase | 9.49 |
| s40 | c40 | memo | 6.98 |
| s41 | c41 | frase | 6.87 |
| s42 | — | foto — due tazze sul tavolo, una fuma ancora, l'altra fredda **▪** | 6.97 |
| s43 | c43 | frase | 1.20 |

## Da verificare

Non sento l'audio e non vedo il montato: ho controllato le slide da ferme e i
40 tagli con la trascrizione. Restano da giudicare **le sei riprese
Higgsfield**, che non posso aprire da qui, e la tenuta delle due pose da
quattro secondi su «Perché.» e «E poi.».
