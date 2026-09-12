# Registro — Modulo 2 · micro-lezione 2.8 «Riepilogo del Modulo 2»

L'ultima lezione del modulo, e la piu' densa di numeri di tutte: otto scale
con i loro intervalli, otto confusioni, cinque formule. E' il banco di prova
che 2.6 aveva chiesto per il peso delle cifre.

---

## Scheda parametri

| | |
|---|---|
| durata chiesta dallo script | 8 minuti |
| durata ottenuta | **8:38.0** |
| slide dello script | 16 |
| scene | 50 (il tetto) |
| blocchi di parlato | 48 |
| voce | GianP — News Info and Documentary, `eleven_v3` |
| costo voce | $1,41 |
| costo trascrizioni | $0,60 |
| pause senza voce | nessuna; quattro pose brevi dentro il parlato |

```
CARATTERI  8.476          BLOCCHI  48         SCENE  50/50
stima a 17,0 car/s        8:36.4
reale                     8:38.0      (parlato 504,7 s, 16,8 car/s)
```

Il copione dello script chiedeva otto minuti esatti, ma il vincolo del corso
e' **«otto minuti almeno»**: scritto al primo giro veniva 7:55.6, sotto la
soglia. Venticinque blocchi dei piu' magri sono stati allargati con contenuto
vero — non con parole in piu' — fino a 8.476 caratteri.

Fattore dei silenzi **1,176**, il piu' alto degli otto (1,081 – 1,196), e
atempo **1,135**, anch'esso il piu' alto. Coerente: e' una lezione di elenchi,
e un elenco si legge con le pause.

---

## Il peso delle cifre, provato dove doveva esserlo

2.6 aveva lasciato scritto che il nuovo `peso` — il numero scritto per esteso
invece di «una cifra vale cinque caratteri» — era stato provato solo su numeri
piccoli, e che serviva una lezione ricca di numeri. Questa lo e'.

| | traccia A | traccia B |
|---|---|---|
| scarto tipico | 1,03 s | 0,97 s |
| blocchi fuori fascia | 0 | 0 |
| coppie adiacenti di segno opposto | nessuna | nessuna |
| tagli dentro una pausa | 23 su 23 | 23 su 23 |

**Nessun confine spostato.** Lo scarto tipico e' pero' il piu' alto del modulo
— 1,0 s contro gli 0,5-0,9 delle altre — e i cinque blocchi segnalati sono
tutti **positivi**: i blocchi degli elenchi durano piu' di quanto il testo
prometta, tutti nello stesso verso.

E' la stessa cosa vista su 2.6 con s33, e adesso si vede su scala di lezione:
**il peso conta le parole, non le pause**, e un elenco ne ha molte. Non e' un
difetto dell'allineamento — i tagli sono tutti dentro una pausa vera — e' un
limite del controllo statistico, che su una lezione di ripasso e'
strutturalmente piu' rumoroso. Il controllo delle pause, che non stima niente,
non se ne accorge nemmeno.

---

## Due rese dichiarate in piu'

- `eziologia` per `etiologia`: due grafie entrambe corrette, la voce dice la
  stessa cosa.
- `conleys` e `conleigh` per `conley`: il cognome della scala non e' una
  parola italiana, e il trascrittore lo scrive come gli suona. Tre volte in
  tre modi diversi, nella stessa lezione.

Dichiarate in `RESE`, il confronto passa da 99,5% e 98,8% a **99,9% e 99,1%,
zero buchi**. Quello che resta sono sviste una tantum («pess», «distratore»).

---

## Le slide

Nessuna sfora la cornice, nessuna stampa dati mancanti — il controllo nuovo di
2.7 e' passato in silenzio, che e' quello che deve fare. Una sola correzione
dai provini: **s45** era una `scala` a due soli gradini, cioe' mezza slide
vuota a sinistra. Due cose affiancate sono un confronto.

Le due tabelle delle scale (s17 e s18) sono la parte piu' utile della lezione
e vanno controllate a mano contro il 2.3: Braden 6-23 soglia 16, Norton 5-20
soglia 14, Conley 0-10 da 2, Tinetti 0-28 sotto 19, Barthel 0-100, Glasgow
3-15 coma sotto o uguale a 8, CAM 1+2+(3 o 4), MUST 0-6 alto da 2. Verificate.

---

## La resa

| | |
|---|---|
| resa pubblicata | `8426d94288277bcf9bb8ed7f903e78dc` — **8:36.6** |
| lotto asset | `017e6543fd8d410b9f30c4f92cf29686` (98 file) |

---

## Da verificare

- Lo scarto tipico del controllo statistico cresce con la densita' di elenchi:
  0,53 su una lezione discorsiva, 1,03 qui. La soglia di segnalazione e' fissa
  a 1,5 volte lo scarto tipico, quindi si adatta da sola; ma i blocchi
  segnalati su una lezione di ripasso sono quasi tutti falsi allarmi. Vale la
  pena, al modulo 3, non fidarsi della statistica su lezioni di questo tipo e
  guardare solo il controllo delle pause.
- Le otto scale di questa lezione sono state ricontrollate a mano contro il
  2.3. Non esiste un controllo automatico che verifichi la **coerenza dei
  numeri fra lezioni diverse**, ed e' l'errore che in un riepilogo farebbe
  piu' danno. Un file unico di costanti del corso, letto sia da 2.3 sia da
  2.8, lo renderebbe impossibile.
