# Registro — Modulo 2 · micro-lezione 2.6 «Rischio clinico e sicurezza del paziente»

Il controllo statistico ha segnalato un confine spostato che non era spostato.
Il modo in cui e' stato assolto vale piu' della lezione stessa: adesso la
catena ha un controllo che non si limita a insospettirsi.

---

## Scheda parametri

| | |
|---|---|
| durata chiesta dallo script | 9 minuti e 30 |
| durata ottenuta | **9:28.9** |
| slide dello script | 19 |
| scene | 50 (il tetto) |
| blocchi di parlato | 48 |
| voce | GianP — News Info and Documentary, `eleven_v3` |
| costo voce | $1,55 |
| costo trascrizioni | $0,58 |
| pause senza voce | nessuna; cinque pose brevi dentro il parlato |

```
CARATTERI  9.321          BLOCCHI  48         SCENE  50/50
stima a 17,0 car/s        9:27.3
reale                     9:28.9      (parlato 555,6 s, 16,8 car/s)
```

Un secondo e sei di scarto sulla stima: la piu' vicina delle sei lezioni.
Fattore dei silenzi **1,078** (sesto valore diverso in sei lezioni: 1,152 ·
1,090 · 1,081 · 1,196 · 1,122 · 1,078), atempo calcolato **1,076**.

---

## Il falso allarme che ha insegnato qualcosa

`controllo-statistico.py` ha segnalato la coppia **s33 / s34** con +1,36 s e
−1,56 s: esattamente la firma di un taglio scivolato in avanti di una frase.

Ma la firma e' un indizio, non una prova, e qui l'indizio era falso. Il blocco
s33 e' l'elenco delle tre Raccomandazioni da ricordare — «la numero 7, la
numero 12, la numero 13» — e un elenco si legge con le pause che il peso, che
conta caratteri, non sa prevedere. Il blocco successivo e' prosa corrente,
letta di corsa. Due velocita' diverse, nessun confine fuori posto.

**Come si e' visto.** Un taglio giusto cade **dentro una pausa vera della
voce**; un taglio spostato cade in mezzo a una frase. E' una cosa che si misura
in locale, con una passata di `silencedetect` sulle tracce grezze, senza
trascrivere niente e senza sapere che cosa la voce dica. Il taglio di s33 cade
dentro una pausa di 0,31 s, e cosi' tutti gli altri:

```
46 tagli su 46 cadono dentro una pausa
nessun taglio nel parlato: i confini sono dove la voce si ferma
```

Il controllo e' ora la seconda sezione di `controllo-statistico.py`, e viene
prima dell'altra nell'ordine di lettura: la statistica dice *dove guardare*,
questo dice *se c'e' qualcosa da vedere*.

---

## Il peso, di nuovo — e in due file di nuovo

Due difetti veri trovati mentre si indagava il falso allarme.

**Primo: il peso delle cifre era piatto, e sbagliava agli estremi.** «Una cifra
vale cinque caratteri» funziona in media e si rompe ai bordi: `12` pesava dieci
e la voce dice *dodici*, che ne vale sei; `1994` pesava venti e la voce dice
*millenovecentonovantaquattro*, che ne vale ventotto. Adesso `peso()` scrive il
numero per esteso e conta quello. La differenza fra «sette» e
«millenovecentonovantaquattro» la sa l'italiano, non un fattore moltiplicativo.

| | prima | dopo |
|---|---|---|
| `La numero 13, cadute.` | 29 | **26** |
| `dalle lezioni 1.4 e 1.5.` | 40 | **51** |

**Secondo: il peso era tornato a vivere in due file.** E' lo stesso difetto di
2.4 con i ruoli scambiati: li' la DTW aveva il peso vecchio e il controllo
quello giusto, qui il contrario. Per una lezione intera i due numeri sono
rimasti diversi, e il disaccordo ha **mascherato** la coppia s33/s34: con il
peso vecchio il controllo non la segnalava affatto. `controllo-statistico.py`
adesso **importa** `peso` da `tagli.py` invece di riscriverlo.

Vale la pena dirlo per esteso, perche' e' la seconda volta: un numero che
descrive la stessa cosa non puo' stare in due file. Se ci sta, prima o poi
divergono, e il sintomo non e' un errore — e' un controllo che tace.

---

## Quattro slide corrette guardando i provini

Nessuna sforava la cornice. Tutte e quattro erano sbagliate nel merito.

- **s14** — «L'assenza di un doppio controllo» aveva per icona una **spunta**.
  Una spunta per un'assenza dice il contrario di quello che significa: ora e'
  un divieto.
- **s16** — il formaggio svizzero aveva per fette «Barriera 1 · un buco»,
  «Barriera 2 · un altro buco». Non insegnava niente. Ora le fette sono un
  percorso vero: identificazione, prescrizione, somministrazione, e il danno
  quando i tre buchi si allineano.
- **s33** — lo schermo diceva **Terapia · LASA · Cadute** in grande e 7, 12, 13
  in piccolo, mentre la voce chiede di ricordare **i numeri**. Invertiti.
- **s42** — «errore umano: *si consola*» e «comportamento a rischio: *si
  coacha*»: un falso amico e un anglicismo, tradotti a mano dall'inglese della
  just culture. Ora «si sostiene chi ha sbagliato» e «si toglie l'incentivo».

Le prime tre sono lo stesso difetto delle quattro di 2.2: una slide puo' essere
geometricamente perfetta e dire una cosa falsa. Il controllo della cornice non
le vede. Solo i provini le vedono.

---

## Un limite scoperto della libreria

`icone` e' un flex orizzontale, e sopra le **cinque** voci le colonne escono
dalla cornice qualunque sia il corpo del testo: le sette barriere sforavano di
377 px. Non e' un problema di misura, e' un problema di densita': sette voci
vogliono una griglia. Il limite e' ora scritto nel CSS, accanto alla regola.

---

## Il controllo nuovo, applicato all'indietro

Il controllo delle pause non richiede di ritagliare niente: legge
`confini-A/B.json` e le tracce grezze. Rilanciato sulle cinque lezioni gia'
chiuse del modulo:

```
2.1  46/46      2.2  46/46      2.3  46/46      2.4  46/46      2.5  46/46
```

**230 tagli su 230 dentro una pausa.** Nessuna lezione da rifare.

Al primo giro pero' il controllo aveva accusato **2.5 · s45**. Non era vero: il
taglio cadeva nel centro esatto di una pausa di **0,143 s**, e il controllo
cercava pause di almeno 0,15 s. La pausa minima che `tagli.py` accetta non e'
una costante — la calcola per lezione — e un controllo con la soglia scritta a
mano trova difetti che non ci sono. Soglia portata a 0,05 s; la durata della
pausa resta stampata accanto a ogni taglio, cosi' quelle corte davvero si
vedono lo stesso.

E' la terza volta in tre lezioni che il difetto e' **un numero scritto due
volte**: la DTW e il controllo (2.4), il peso di nuovo (2.6), e adesso la
soglia delle pause. Sempre lo stesso sintomo — il controllo dice una cosa
falsa, in un verso o nell'altro — e sempre la stessa cura.

---

## La resa

| | |
|---|---|
| resa pubblicata | `45a9e46e32f19b2a7262dacf3f1d737e` — **9:27.6** |
| lotto asset | `a25217e5b28749808b6708949fb27198` (98 file) |

---

## Da verificare

- Il nuovo `peso` e' stato provato su una lezione ricca di numeri piccoli
  (Raccomandazioni, 7-19). Non e' ancora stato provato su una ricca di anni e
  numeri di legge a quattro cifre, dove il vecchio peso sbagliava dall'altra
  parte: 1.5 e 1.8 sarebbero il banco di prova.
- Le lezioni da 2.1 a 2.5 hanno il peso piatto e `controllo-statistico.py`
  senza il controllo delle pause. Nessuna e' stata rifatta: conviene pero'
  rilanciare su ciascuna il solo controllo delle pause, che non richiede di
  ritagliare niente e costa una passata di ffmpeg.
