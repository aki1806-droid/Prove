# Registro — 3.2 «Eco, sintesi, sentimento»

Senza avatar, voce Luca Ward, slide animate, nove grafiche e tre riprese
Higgsfield.

| campo | valore |
|---|---|
| video_id | `c6743d31a807473a4c75d8ff56cdccf5` |
| scene | 46 — copertina, 44 blocchi, chiusura |
| formato | 16:9, 1080p, sottotitoli SRT |
| durata | 346,4 s (5:46) |
| parlato | 334,3 s |

## Il copione è stato riscritto

Da **3.610** caratteri a **5.672**. Lo script aveva i tre strumenti; mancava
quasi tutto il come.

- **la trappola del tono nell'eco**: la stessa parola fa due cose opposte.
  «Inutile» detto piatto è un invito, «inutile?» è una sfida — e con il punto
  interrogativo gli hai appena chiesto di giustificare la parola che ha
  scelto, che è esattamente quello che la 2.4 dice di non fare;
- **il criterio per scegliere i due elementi della sintesi**: non quello che
  ha colpito te, quello su cui lui è tornato due volte. Anche se l'ha detto
  piano e a te sembrava un dettaglio;
- **cosa hanno in comune tutte e tre**: nessuna è una domanda, ma tutte
  lasciano un posto vuoto dopo. Quello che decide se funzionano è che tu stia
  zitto dopo averle dette;
- **quale delle tre e quando**, che è la parte che manca in tutti i manuali:
  l'eco mentre sta ancora cercando, la sintesi quando ha chiuso un blocco, il
  sentimento quando il fatto è chiaro e il peso no;
- **come si corregge un sentimento sbagliato**: «forse ho detto male io», e
  poi si tace.

## Le grafiche

| slide | tipo | cosa mostra |
|---|---|---|
| c03 | schede | i tre strumenti, con tre icone nuove |
| c08 | numero | il «3 parole» dell'eco |
| c09 | tabella | «Inutile.» / «Inutile?» |
| c13 | grafico | il discorso e la sintesi, a confronto |
| c25 | sostituzioni | «Eri arrabbiato» → «Ti sei sentito arrabbiato» |
| c26 | tabella | perché quelle due parole cambiano tutto |
| c34 | disegno | quando si usa quale, sulla stessa conversazione |
| c37 | schede | i tre modi per rovinarle |
| c18 | citazione | «…è così?», da sola, come chiede lo script |

Quattro icone nuove: `unaparola`, `stringi`, `sotto` per i tre strumenti,
`taglio` per «sintetizzare troppo presto».

Il disegno di c34 è venuto al secondo giro: nella prima versione le prime due
etichette si toccavano. Allargata la linea e accorciate le etichette.

## Le tre riprese

| blocco | tipo | cosa |
|---|---|---|
| s12 | foto | un quaderno con due sole righe scritte su una pagina vuota |
| s21 | b-roll | due paia di mani su un tavolo, una gesticola, l'altra ferma |
| s23 | foto | un cappotto rimasto sulla sedia a un tavolo sparecchiato |

## I tagli: la verifica adesso appaia per contenuto

Quarantadue confini, quattro tornate. Ed è la lezione che ha costretto a
rifare lo strumento di verifica, perché il modo vecchio non stava in piedi.

Fin qui le code trascritte le appaiavo ai confini **in ordine**: primo pezzo,
primo confine. Basta che `scribe` salti una coda, ne unisca due, o ne spezzi
una in due — e qui ha fatto tutte e tre le cose — perché da lì in poi tutto
scivoli e sembrino sbagliati quaranta confini su quarantadue.

Adesso c'è `produzione/script/verifica.py`, e l'appaiamento è **per
contenuto**: ogni pezzo va al confine la cui fine di blocco *termina* con
quel pezzo. È un aggancio sicuro, perché una coda giusta cade per
definizione in fondo al blocco. I confini che restano senza pezzo restano
vuoti in `code.json`, e `correggi` li lascia stare invece di inventarsi uno
spostamento.

Due dettagli che sono costati un giro ciascuno:

- l'aggancio su **una parola sola** è troppo largo: «arrabbiato» aggancia
  qualunque blocco che finisca per «arrabbiato», e un confine sbagliato passa
  per giusto. Adesso servono almeno due parole, salvo che il pezzo sia di una
  parola sola;
- `correggi` poteva **scavalcare il confine successivo**, e la lista dei
  confini smetteva di essere crescente (l'assert l'ha fermato). Adesso lo
  spostamento è limitato anche dal confine dopo.

Un confine (`s25`) è rimasto senza coda in tutte le tornate, ed era corto: 0,9
secondi per una frase che ne vuole cinque. Sistemato a mano prendendo il
silenzio più vicino al punto proporzionale fra i due confini che lo
racchiudono.

## Tre pose

`s18` («È così?», 0,9 s), `s23` («Ti sei sentito messo da parte», 1,9 s) e
`s45` («Ci vediamo nella prossima», 1,2 s) allungati con `apad` a 4, 4 e 3,5
secondi.


## Blocchi

`·` slide grafica · `▪` ripresa Higgsfield

| blocco | slide | tipo | durata (s) |
|---|---|---|---|
| s02 | c02 | frase | 11.19 |
| s03 | c03 | schede **·** | 12.84 |
| s04 | c04 | citazione | 4.79 |
| s05 | c05 | citazione | 2.65 |
| s06 | c06 | frase | 10.57 |
| s07 | c07 | frase | 7.85 |
| s08 | c08 | numero **·** | 11.30 |
| s09 | c09 | tabella **·** | 10.25 |
| s10 | c10 | memo | 6.43 |
| s11 | c11 | frase | 6.51 |
| s12 | — | foto — un quaderno aperto su un tavolo da riunione, due righe scritte su una pagina vuota **▪** | 7.88 |
| s13 | c13 | grafico **·** | 10.54 |
| s14 | c14 | memo | 7.75 |
| s15 | c15 | frase | 7.52 |
| s16 | c16 | frase | 11.22 |
| s17 | c17 | frase | 9.88 |
| s18 | c18 | citazione (posa) | 4.00 |
| s19 | c19 | memo | 8.17 |
| s20 | c20 | frase | 7.04 |
| s21 | — | b-roll — due paia di mani su un tavolo, una gesticola piano, l'altra ferma **▪** | 8.79 |
| s22 | c22 | frase | 5.64 |
| s23 | — | foto — un cappotto rimasto sulla sedia a un tavolo sparecchiato **▪** | 4.00 |
| s24 | c24 | frase | 8.34 |
| s25 | c25 | sostituzioni **·** | 3.07 |
| s26 | c26 | tabella **·** | 9.23 |
| s27 | c27 | frase | 8.89 |
| s28 | c28 | frase | 7.82 |
| s29 | c29 | frase | 4.54 |
| s30 | c30 | citazione | 8.29 |
| s31 | c31 | frase | 7.83 |
| s32 | c32 | memo | 6.45 |
| s33 | c33 | frase | 10.59 |
| s34 | c34 | disegno **·** | 9.62 |
| s35 | c35 | frase | 7.14 |
| s36 | c36 | frase | 11.26 |
| s37 | c37 | schede **·** | 3.32 |
| s38 | c38 | frase | 8.89 |
| s39 | c39 | memo | 8.86 |
| s40 | c40 | frase | 6.37 |
| s41 | c41 | memo | 3.25 |
| s42 | c42 | frase | 2.42 |
| s43 | c43 | frase | 9.26 |
| s44 | c44 | frase | 8.57 |
| s45 | c45 | frase (posa) | 3.50 |

## Da verificare

Non sento l'audio e non vedo il montato: ho controllato le slide da ferme e i
43 tagli con la trascrizione. Restano da giudicare le **tre riprese
Higgsfield**, che non posso aprire da qui.
