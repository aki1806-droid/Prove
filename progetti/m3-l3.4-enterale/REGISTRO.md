# Registro — Modulo 3 · micro-lezione 3.4 «Nutrizione enterale: sondino naso-gastrico, PEG e PEJ»

La lezione procedurale del modulo: venti slide nello script, cinquanta scene
qui. Un corpo nuovo, le **vie di accesso** (il profilo con naso, esofago,
stomaco e digiuno, e le quattro sonde che si disegnano una per volta), e otto
illustrazioni: il metodo NEX, lo stomaco, la PEG in sezione, la radiografia,
la striscia del pH, la pompa, la siringa, la cellula con gli ioni che entrano.

---

## Scheda parametri

| | |
|---|---|
| durata chiesta dallo script | 10 minuti |
| durata ottenuta | 9:06.7 (546,7 s) |
| slide dello script | 20 |
| scene | 50 (il tetto) |
| blocchi di parlato | 48 |
| voce | GianP — News Info and Documentary, `eleven_v3` |
| costo voce | $1,50 (A $0,72 · B $0,78) |
| costo trascrizioni | $0,58 |
| pause senza voce | nessuna; due pose brevi sulle slide sul verde (s19, s45) |

```
CARATTERI  9.029          BLOCCHI  48         SCENE  50/50
stima a 17,0 car/s        9:08.9
tracce grezze             A 303,9 s  ·  B 338,3 s   (stacco dopo s25)
silenzi                   fattore 1,121   ->   atempo 1,079
```

Venti slide in quarantotto blocchi: il primo giro era a 49 blocchi (51
scene) e cinque blocchi oltre i 225. I due blocchi del NEX sono diventati
uno, e i cinque lunghi sono stati accorciati senza perdere una
controindicazione, una regola o una complicanza. Lo script chiedeva dieci
minuti; a 9.029 caratteri la stima è 9:09, sopra gli otto minuti chiesti dal
committente.

## I confini, e una deroga dichiarata

| | traccia A | traccia B |
|---|---|---|
| blocchi | 24 | 24 |
| blocchi fuori fascia | 0 (dopo la deroga, sotto) | 0 |
| tagli dentro una pausa | 23 su 23 | 23 su 23 |
| coppie adiacenti di segno opposto | nessuna | nessuna |

**La voce non ha fatto pausa dove il copione staccava.** Fra s02 e s03 il
copione chiudeva su «…è una somministrazione.» e riapriva con «E come tale
può uccidere se fatta male.»; la voce ha letto le due frasi di fila (la
trascrizione lo conferma: «…una somministrazione e come tale può uccidere se
fatta male») e la prima pausa utile è dopo «fatta male». Il primo taglio
segnalava quindi s03 fuori fascia a 22 car/s: non un blocco veloce, ma
quaranta caratteri contati sul blocco sbagliato. Il confine si mette dove la
voce si ferma, e il copione segue la voce: la frase è passata a s02, che ora
ha 231 caratteri, con una **deroga dichiarata** in `costruisci.py`
(`DEROGHE`), una per una e con il motivo. Nessun confine spostato a mano:
`correzioni.json` non è servito.

La trascrizione conferma: **653/666 e 691/695 parole**, nessun buco; le otto
rese diverse sono grafie («naso gastrico» / «nasogastrico», «chin tuck» /
«cintac», «ab» / «abbi»).

## Le scene

| scene | corpo | contenuto |
|---|---|---|
| s01, s50 | copertina | la lezione; la prossima (3.5) |
| s02, s10, s14, s20, s21, s34, s39, s41, s49 | figura | siringa, stomaco, NEX, radiografia, pH, farmaci, cellula, PEG, persona |
| s08–s09 | **vie** | SNG, naso-digiunale, PEG, PEJ sul profilo |
| s15–s16 | posizioni (flesso, reclinato) | capo flesso contro iperestensione |
| s12–s13, s22, s28–s32, s42 | griglia | quando non si procede · tre metodi (uno sbagliato) · sei regole · sei regole dei farmaci · gestione pulita |
| s05, s35–s37 | raggiera | perché enterale; le complicanze |
| s26–s27 | icone (illustrazioni) | boli, gravità, pompa |
| s38 | catena | carboidrati → insulina → P K Mg → ipofosfatemia → aritmie |
| s43 | mappa (PEG) | disco esterno, disco interno, misura |
| s44 | percorso | se la PEG si sfila |
| s19, s25, s45 | titolo | si ritira; nel dubbio non si somministra; poche ore |
| s04 | frase | «se l'intestino funziona, si usa l'intestino» |
| s47 | norma | L. 219/2017 |
| s03, s06, s07, s11, s17, s18, s23, s24, s33, s40, s46, s48 | confronto, elenco, sostituzione, tre, trappola | il resto |

## Correzioni fatte guardando i provini

- **Le vie sforavano di 195 px in altezza**: lo schema era largo 760 e il
  `viewBox` è 520×620. Larghezza a 520, e l'altezza torna nei 620.
- **Le due card delle posture sforavano di 32 px**: con testi più lunghi di
  quelli della 3.2 il disegno da 400 non ci stava. Disegno a 360.
- **La cellula sembrava un divieto**: quattro tratti in diagonale sopra un
  cerchio si leggono come una X. Ora sono tre frecce con la punta, che
  entrano da sinistra, da destra e dall'alto.
- **La testa del profilo era un arco aperto**: chiusa in un cerchio, con il
  naso come tacca e le sonde che partono dal naso.

---

## La resa

| | |
|---|---|
| resa pubblicata | `ea2c2e3ec62bf852d63e6b2ea4f9bef0` — 546,679 s (9:06.7), 1080p 16:9, resa in 130 s |
| lotto asset | `610061ffb90444c8b9130b7418bceb9c` — 98 file, 20 MB, tutti completati |

---

## Da verificare

- La deroga sui 225 caratteri è la prima del corso. Se capitasse spesso, il
  segnale sarebbe un altro: il copione stacca dove la voce non stacca, e
  andrebbe rivisto il modo di chiudere i blocchi (un punto fermo forte, non
  un'anafora che invita a proseguire).
- Il profilo delle vie è schematico (testa, tronco, tubo): mostra da dove
  entra e dove arriva ciascuna sonda, non l'anatomia. Se serve più realismo,
  si arricchisce il tracciato dello stomaco e del digiuno, non si cambia il
  corpo.
