# Registro — Modulo 3 · micro-lezione 3.1 «Igiene, cura della persona e unita' del paziente»

La prima lezione del modulo clinico, e la prima con la **grafica di terza
generazione**: il committente, rivisto il corso, ha chiesto «immagini SVG
originali, grafici animati, elementi di qualita'». Qui nascono la sagoma con
le zone che si accendono, le strisce delle frequenze, il percorso a tappe, lo
schema della microaspirazione, la mappa della stanza, il bivio.

---

## Scheda parametri

| | |
|---|---|
| durata chiesta dallo script | 9 minuti e 30 |
| durata ottenuta | vedi «La resa» |
| slide dello script | 19 |
| scene | 50 (il tetto) |
| blocchi di parlato | 48 |
| voce | GianP — News Info and Documentary, `eleven_v3` |
| costo voce | $1,57 (A $0,77 · B $0,80) |
| costo trascrizioni | $0,65 |
| pause senza voce | nessuna; due pose brevi sulle slide sul verde |

```
CARATTERI  9.447          BLOCCHI  48         SCENE  50/50
stima a 17,0 car/s        9:31.1
tracce grezze             A 342,2 s  ·  B 373,1 s   (stacco dopo s25)
silenzi                   fattore 1,161   ->   atempo 1,109
```

Lo script chiedeva nove minuti e mezzo, e i diciannove blocchi sono usciti a
9.780 caratteri al primo giro: troppo. Si e' tagliato il riempitivo (le code
esplicative aggiunte per «fare lunghezza»), non il contenuto: i sei principi,
gli otto passi della sequenza, i tre dettagli, le quattro frequenze, il bundle,
gli otto elementi dell'unita', i sette passi del paziente a terra e i sei
principi della contenzione ci sono tutti.

## Copione: un errore di posizione, pagato subito

Il taglio dei quattro blocchi troppo lunghi e' stato fatto per indice, e
l'indice era sbagliato di uno: il testo nuovo e' finito **sul blocco dopo**, e
tre blocchi (i sei principi, la sorveglianza dopo la caduta, l'apertura sulla
contenzione) sono spariti in silenzio — il conto dei caratteri tornava, i
vincoli pure. Se ne e' accorta la rilettura dei chunk contro lo script, che il
metodo prescrive per questo. L'elenco e' stato riscritto per intero, e la voce
generata solo dopo, a copione fermo.

## I confini

| | traccia A | traccia B |
|---|---|---|
| peso/s | 17,2 | 16,6 |
| scarto tipico | 0,64 s | 0,84 s |
| blocchi fuori fascia | 0 | 0 |
| coppie adiacenti di segno opposto | nessuna | nessuna |
| tagli dentro una pausa | 23 su 23 | 23 su 23 |

Nessun confine spostato a mano. La trascrizione conferma: **719/720 e 678/683
parole**, nessun buco; le quattro rese diverse sono grafie («oro faringee» /
«orofaringee», «sub glottica», «collutori» / «colluttori», «a letto» / «al
letto»).

## Le scene

Trenta scene su cinquanta portano una figura, e dodici usano i corpi nuovi:

| corpo | scene | che cosa mostra |
|---|---|---|
| `corpo` (sagoma) | s13 s14 s17 s18 | la sequenza a letto: le zone si accendono nell'ordine della voce, fronte e dorso, il sacro in accento |
| `percorso` | s12 s19 s44 s45 | le otto tappe dell'igiene; i sette passi del paziente a terra |
| `frequenze` | s23 s24 s25 | il cavo orale nelle 24 ore: 2 volte, 2–3, ogni 4–6 h, ogni 2–4 h |
| `vap` | s26 s27 | vie aeree, tubo, cuffia, la pozza sopra la cuffia, le gocce che scendono, il polmone che si colora |
| `mappa` | s35 s36 | la stanza con i sette richiami numerati |
| `bivio` | s49 | le sponde: presidio di sicurezza, oppure contenzione |

E sei illustrazioni nuove (`occhio` con la freccia interno → esterno, `bocca`,
`stanza`, `farmaci`, `letto`, `lente`).

Tre correzioni dopo il primo provino, tutte nella libreria e non nelle scene:
la sagoma si chiamava `.corpo` come il contenitore della slide (usciva alta
900 px); le zone arrivavano al 100 % di opacita' perche' l'animazione vinceva
sulla classe; le etichette del percorso a due righe si sovrapponevano perche'
la seconda riga le metteva sopra i cerchi. Piu' una nelle scene: le didascalie
delle raggiere a sei oltre i 30 caratteri escono dalla cornice a destra, e il
controllo geometrico non le vede.

---

## La resa

| | |
|---|---|
| resa pubblicata | *in corso* |
| lotto asset | *in corso* |

---

## Da verificare

- Le illustrazioni `bocca` e `farmaci` sono le meno leggibili delle dodici
  nuove: a tratto, senza colore, una bocca con i denti e un flacone si
  riconoscono, ma meno di un occhio o di un letto. Se il committente le trova
  deboli, si ridisegnano — non si aggiungono colori.
- La sagoma e' volutamente schematica (cerchio, tronco, arti a tratto): e' una
  mappa delle zone, non un'anatomia. Se serve, si arricchisce nella 3.2 dove
  compaiono le posizioni e i punti di pressione.
