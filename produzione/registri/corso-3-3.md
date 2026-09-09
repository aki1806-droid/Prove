# Registro — 3.3 «Empatia non è essere d'accordo»

Senza avatar, voce Luca Ward, slide animate, dieci grafiche e tre riprese
Higgsfield.

| campo | valore |
|---|---|
| video_id | *(in coda)* |
| scene | 49 — copertina, 47 blocchi, chiusura |
| formato | 16:9, 1080p, sottotitoli SRT |
| durata attesa | 347,6 s (5:48) |
| parlato | 334,6 s |

## Il copione è stato riscritto

Da **3.680** caratteri a **5.791**. Lo script aveva la formula giusta; mancava
quasi tutto quello che la fa funzionare.

- **il test di «capire»**: sai dire perché l'ha fatto senza dover dire che ha
  fatto bene? E il contrario, che nessuno dice mai: puoi dargli ragione senza
  aver capito niente di lui, e si chiama quieto vivere;
- **perché siamo avari di capire**: lo trattiamo come un anticipo
  sull'approvazione. Non lo è, e non c'è nessun anticipo da versare;
- **le tre decisioni dentro le due frasi**, separate e ripetute a schermo una
  alla volta: prima, vera, tua. Ognuna può rovinare le altre due;
- **come si riconosce la comprensione finta**: è generica. Chi ha capito cita
  un dettaglio che l'altro non avrebbe potuto inventarsi — e il dettaglio non
  serve a convincere lui, serve a te per accorgerti se hai capito;
- **cosa costa davvero il «ma»**: non che sia sgarbato, ma che l'altro lo
  sente arrivare dalla prima sillaba e smette di ascoltare la prima metà. Otto
  parole spese per metterlo in guardia;
- **come si recupera un «ma» scappato**: «no, aspetta, non era un ma», e si
  ricomincia dal punto;
- **quando la formula non serve**: quando non ti sta chiedendo di capirlo, ma
  di decidere. Lì la comprensione va detta lo stesso, ma corta;
- **il risultato che si cerca**, che lo script non dichiarava: non che cambi
  idea. Che non alzi la voce.

## Le grafiche

| slide | tipo | cosa mostra |
|---|---|---|
| c04 | schede | capire / condividere / approvare, tre icone nuove |
| c10 | grafico | quanto ti impegna ciascuna delle tre |
| c15 | disegno | il blocco: le due paure, una di fronte all'altra |
| c18 | numero | le «3» decisioni dentro due frasi corte |
| c19 c21 c25 | elenco | le tre decisioni, accese una alla volta |
| c22 | tabella | comprensione finta / comprensione vera |
| c26 | sostituzioni | «Non è così» → «Io la vedo diversamente» |
| c31 | numero | le «8 parole» spese per mettere in guardia |
| c32 | sostituzioni | «Ti capisco, ma…» → le due frasi col punto |
| c36 | schede | le tre trappole, tre icone nuove |
| c43 | elenco | il riassunto in tre righe |

Sei icone nuove: `capire` (una mappa con il percorso rifatto), `condividere`
(la stessa onda due volte), `approvare` (un foglio firmato), `gomma`,
`chiave`, `scansa`.

Tre cose corrette guardando i PNG: l'icona di `approvare` alla prima stesura
era una terza onda e si confondeva con `condividere`; la `gomma` era un
quadratino che non diceva niente, ora è inclinata a metà cancellatura con i
residui; in `c15` il testo dorato arrivava a filo del riquadro, e in `c32` la
seconda riga aveva una freccia che partiva dal vuoto.

## Le tre riprese

| blocco | tipo | cosa |
|---|---|---|
| s16 | b-roll | due colleghi ai due lati di una stanza, girati verso la stessa finestra |
| s28 | foto | una gomma ferma a metà cancellatura, con i residui |
| s40 | foto | una pila di buste mai aperte sul tavolo dell'ingresso |

La prima richiesta del b-roll è tornata indietro come «nsfw» — falso
positivo su «two people... faces not identifiable». Riscritta nominando i
vestiti e l'inquadratura di spalle, è passata al primo colpo.

## I tagli: quarantacinque su quarantacinque sbagliati

Il primo allineamento ha sbagliato **tutti** i confini, e in un modo che le
durate non facevano vedere: tagliava dopo la prima frase di ogni blocco,
quindi ogni blocco restava lungo più o meno quanto doveva e i caratteri al
secondo tornavano tutti fra 10 e 20.

Due cause, tutte e due ora sistemate in `tagli.py`.

**I candidati erano troppi.** Erano tutti i silenzi sopra 0,20 s: ottantotto
in venticinque confini. Fra quelli c'è il respiro di metà frase, e quando la
stima sbaglia di qualche secondo il confine ci si appoggia. Adesso si tengono
solo le pause **più lunghe**, poco più numerose dei confini da collocare: fra
un blocco e l'altro la pausa è quasi sempre la più lunga lì intorno.

**La stima sbagliava sul serio.** I caratteri danno per scontato che si legga
sempre alla stessa velocità, e in apertura la lettura è più lenta: a un sesto
della traccia la stima era avanti di **4,35 secondi**. Adesso c'è un secondo
giro — lo scarto del primo, spianato su una decina di confini, è proprio quel
rallentamento, e rimesso nella stima sposta i confini finiti sulla pausa
sbagliata.

Fra i due accorgimenti gli errori sono passati da 45 a 11, poi a 3 e a 0 con
`correggi`. Quattro confini (`s03`, `s04`, `s30`, `s31`) sono stati messi a
mano: lo scriba fondeva quelle finestre e la coda non arrivava mai.

Per capire cosa stesse succedendo è servita una controprova nuova: cinque
secondi a cavallo di tre confini sospetti, trascritti da soli. Costa 130
crediti e dice senza discussione se il taglio cade dentro o in fondo al
blocco. È finita in `STANDARD.md`.

## Cinque pose

`s16` (il b-roll, a 8 s), `s27` («non c'è nessun ma», a 5 s), `s28` (la foto
della gomma, a 6 s), `s44` («una gomma per cancellare», a 5 s) e `s46` (le due
frasi della prova, a 6,5 s).


## Blocchi

`·` slide grafica · `▪` ripresa Higgsfield

| blocco | slide | tipo | durata (s) |
|---|---|---|---|
| s02 | c02 | frase | 9.64 |
| s03 | c03 | frase | 8.44 |
| s04 | c04 | schede **·** | 5.04 |
| s05 | c05 | frase | 8.42 |
| s06 | c06 | frase | 7.68 |
| s07 | c07 | citazione | 6.73 |
| s08 | c08 | frase | 7.57 |
| s09 | c09 | frase | 7.50 |
| s10 | c10 | grafico **·** | 7.76 |
| s11 | c11 | frase | 8.05 |
| s12 | c12 | frase | 6.92 |
| s13 | c13 | frase | 7.09 |
| s14 | c14 | frase | 6.66 |
| s15 | c15 | disegno **·** | 8.32 |
| s16 | — | b-roll — due colleghi ai due lati di una stanza spoglia, di spalle, girati verso la stessa finestra **▪** | 8.00 |
| s17 | c17 | citazione | 7.09 |
| s18 | c18 | numero **·** | 8.99 |
| s19 | c19 | elenco **·** | 8.96 |
| s20 | c20 | frase | 5.40 |
| s21 | c21 | elenco **·** | 6.12 |
| s22 | c22 | tabella **·** | 9.22 |
| s23 | c23 | citazione | 7.08 |
| s24 | c24 | frase | 9.23 |
| s25 | c25 | elenco **·** | 7.04 |
| s26 | c26 | sostituzioni **·** | 9.41 |
| s27 | c27 | memo (posa) | 5.00 |
| s28 | — | foto — una gomma ferma a metà cancellatura su una pagina scritta, con i residui **▪** | 6.00 |
| s29 | c29 | frase | 5.22 |
| s30 | c30 | frase | 8.14 |
| s31 | c31 | numero **·** | 5.34 |
| s32 | c32 | sostituzioni **·** | 4.02 |
| s33 | c33 | frase | 6.34 |
| s34 | c34 | citazione | 7.76 |
| s35 | c35 | frase | 8.30 |
| s36 | c36 | schede **·** | 3.53 |
| s37 | c37 | frase | 5.48 |
| s38 | c38 | frase | 9.36 |
| s39 | c39 | frase | 7.07 |
| s40 | — | foto — una pila di buste mai aperte sul tavolo dell'ingresso **▪** | 8.21 |
| s41 | c41 | frase | 5.56 |
| s42 | c42 | frase | 9.54 |
| s43 | c43 | elenco **·** | 8.33 |
| s44 | c44 | memo (posa) | 5.00 |
| s45 | c45 | frase | 4.16 |
| s46 | c46 | citazione (posa) | 6.50 |
| s47 | c47 | frase | 7.70 |
| s48 | c48 | frase | 5.69 |

## Da verificare

Non sento l'audio e non vedo il montato: ho controllato le slide da ferme e i
45 tagli con la trascrizione. Restano da giudicare le **tre riprese
Higgsfield**, che non posso aprire da qui.
