# Registro — 2.1 «Perché non ascoltiamo», senza avatar, voce Luca Ward

Tre montaggi della stessa lezione, in ordine di lavorazione. Ognuno nasce da
una critica di Achille sul precedente.

| versione | video_id | durata | novità |
|---|---|---|---|
| **slide animate** (buona) | `75679e722ab75421c653a819d6a563b1` | — | movimento + grafica |
| traccia unica, slide ferme | `44eceb4fc2d1f6daca2133ba926f58b4` | 5:51 | tono uniforme |
| audio a blocchi | `dffb49988fa3e412db6b8e5ca400063e` | 5:53 | prima prova |

La versione standard con avatar resta `698a04930db66aee2a9938c9f754f185`
(registro `corso-2-1.md`). Nessuna di queste la sostituisce.

## Cosa cambia in questa versione

Tutte le scene sono `video`, non più `image`: ogni slide è una clip di tre
secondi in cui il contenuto entra, e poi si ferma. In HeyGen si monta con
`playback.mode = "freeze"`, che riproduce la clip una volta e poi tiene
l'ultimo fotogramma per tutto il resto del parlato.

**La regola: il movimento entra e finisce.** Sotto quindici secondi di
parlato una slide che continua a muoversi diventa rumore. Per lo stesso
motivo niente zoom lenti sulla tipografia: fanno vibrare i bordi delle
lettere e si legge peggio.

Cinque slide non sono più solo testo:

| blocco | cosa mostra |
|---|---|
| c03 | l'ottanta per cento come cifra grande con barra proporzionale che si riempie |
| c10 | i quattro motivi come schede con icone disegnate, una alla volta |
| c19 | tabella: il motivo a sinistra, la buona intenzione a destra |
| c23 | disegno a tratto: i due fumetti del cambio di soggetto |
| c27 | schema a due rami: torna alla sua storia / non ci torna |

Le altre 34 restano tipografia, animata solo in entrata.

## Come si producono

`clips_corso.mjs` riusa gli stessi layout di `cards_corso.mjs` — stanno
entrambi in `slide_corso.mjs` — e invece di uno screenshot cattura
venticinque fotogrammi al secondo. **Il tempo non scorre da solo**: ogni
fotogramma sposta a mano l'orologio delle animazioni, quindi il render è
identico a ogni esecuzione e non dipende dal carico della macchina.

```
node clips_corso.mjs slides.json ./frames 3.0
ffmpeg -framerate 25 -i frames/cNN/f%04d.png -c:v libx264 -pix_fmt yuv420p -crf 19 cNN.mp4
```

3100 fotogrammi per la lezione intera, circa otto minuti di render, 4,6 MB
di clip in tutto. **Su HeyGen non costa nulla in più**: fattura al minuto di
video finito, ~10 crediti, che la scena sia una foto ferma o una clip.

Attenzione a una cosa: la clip non deve essere più lunga del parlato del suo
blocco, se no HeyGen la taglia. Tre secondi vanno bene per tutti — il blocco
più corto della 2.1 dura 3,50 s.

## Difetti trovati guardando le slide rese

Tutti e quattro scoperti guardando i PNG, non leggendo il codice:

- l'opacità sul binario della barra spegneva anche l'oro che ci stava dentro;
- su contenuti alti l'occhiello finiva addosso al logo (risolto con
  `.stage.graf { padding-top:190px }`);
- la chiave inglese sembrava una macchia e lo specchio un palloncino:
  sostituite con lampadina e figura con freccia di ritorno;
- nello schema a due rami il testo sbordava dai riquadri.

## Voce e montaggio audio

Invariati rispetto alla versione precedente: Luca Ward
(`tVdVcJPudubxmTmAw4tE`) su `eleven_v3`, due generazioni lunghe tagliate sui
confini dei blocchi, filtro standard e 1,12x. Vedi la sezione «Come si taglia
una traccia unica» più sotto.

## Blocchi

Il punto `·` segna le slide grafiche.

| blocco | slide | tipo | durata (s) |
|---|---|---|---|
| s02 | c02 | frase | 6.55 |
| s03 | c03 | numero **·** | 11.01 |
| s04 | c04 | frase | 9.00 |
| s05 | c05 | frase | 13.19 |
| s06 | c06 | frase | 14.15 |
| s07 | c07 | citazione | 9.81 |
| s08 | c08 | citazione | 9.69 |
| s09 | — | clip del bar | 6.00 |
| s10 | c10 | schede **·** | 6.34 |
| s11 | c11 | elenco | 13.24 |
| s12 | c12 | frase | 13.18 |
| s13 | c13 | elenco | 9.40 |
| s14 | c14 | frase | 13.45 |
| s15 | c15 | elenco | 9.80 |
| s16 | c16 | citazione | 10.85 |
| s17 | c17 | elenco | 4.29 |
| s18 | c18 | frase | 6.33 |
| s19 | c19 | tabella **·** | 11.77 |
| s20 | c20 | frase | 11.05 |
| s21 | c21 | frase | 4.68 |
| s22 | c22 | frase | 3.86 |
| s23 | c23 | disegno **·** | 5.37 |
| s24 | c24 | elenco | 13.42 |
| s25 | c25 | frase | 8.48 |
| s26 | c26 | frase | 6.67 |
| s27 | c27 | disegno **·** | 10.89 |
| s28 | c28 | elenco | 5.11 |
| s29 | c29 | elenco | 8.37 |
| s30 | c30 | frase | 10.17 |
| s31 | c31 | elenco | 9.97 |
| s32 | c32 | frase | 15.81 |
| s33 | c33 | elenco | 7.19 |
| s34 | c34 | frase | 12.19 |
| s35 | c35 | memo | 4.32 |
| s36 | c36 | citazione | 6.03 |
| s37 | c37 | citazione | 5.35 |
| s38 | c38 | elenco | 8.54 |
| s39 | c39 | frase | 3.50 |
## Come si taglia una traccia unica sui blocchi

Il limite di `eleven_v3` è **5000 caratteri**, e la lezione ne conta 6092:
quindi due generazioni, tagliate su uno stacco di capitolo vero (fra s17 e
s18), dove un cambio di tono è voluto.

1. **Candidati.** `silencedetect` sul grezzo. Un confine di blocco è sempre
   un silenzio, ma non tutti i silenzi sono confini: molte pause di frase
   sono più lunghe di quelle di paragrafo, quindi una soglia non basta.
2. **Attese** calcolate **nel dominio del parlato**, al netto dei silenzi:
   lo scarto medio scende da 0,43 s a 0,31 s.
3. **Scelta** con programmazione dinamica monotòna.
4. **Verifica, il passaggio che conta.** Si estraggono 1,6 s *prima* di ogni
   taglio, si concatenano separati da silenzio e si mandano a
   `eleven_scribe_v1` in una sola trascrizione: il testo dice parola per
   parola se il taglio cade dove deve. Alla prima tornata **9 tagli su 36
   erano sbagliati**.
5. **Correzione e ricontrollo**: 36 → 9 → 2 → 0 errori.

Due trappole. La trascrizione **non restituisce i tempi per parola**, solo il
testo: per questo serve la prova a finestre. E se la coda di un blocco
compare due volte nel copione — «buona intenzione» chiude sia s21 sia s35,
«quattro motivi» appare in s08 e s10 — la ricerca automatica sbaglia
bersaglio: lì la regola sicura è prendere il silenzio immediatamente
precedente.

## Da verificare

Non posso ascoltare l'audio né vedere il video montato: ho controllato le
slide una per una da ferme, e i 36 tagli con la trascrizione, ma non so come
suonano gli stacchi né se il ritmo del movimento regge sulla durata reale
dei blocchi. Guarda il primo minuto e il passaggio fra s17 e s18, che è la
giunzione fra le due generazioni.
