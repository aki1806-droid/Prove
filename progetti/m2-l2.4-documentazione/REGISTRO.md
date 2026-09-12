# Registro — Modulo 2 · micro-lezione 2.4 «La documentazione infermieristica»

Un difetto vero nell'allineamento, trovato dal controllo statistico e
risolto alla radice: la DTW pesava i pezzi di copione in **caratteri**
invece che in **tempo**.

---

## Scheda parametri

| | |
|---|---|
| durata chiesta dallo script | 9 minuti |
| durata ottenuta | **9:16.3** |
| slide dello script | 18 |
| scene | 50 (il tetto) |
| blocchi di parlato | 48 |
| voce | GianP — News Info and Documentary, `eleven_v3` |
| costo voce | $1,52 |
| costo trascrizioni | $0,64 |
| pause senza voce | nessuna; quattro pose brevi dentro il parlato |

```
CARATTERI  9.129          BLOCCHI  48         SCENE  50/50
stima a 17,0 car/s        9:14.8
reale                     9:16.3      (parlato 543,0 s, 16,8 car/s)
```

Un secondo e mezzo di scarto sulla stima. Il fattore dei silenzi qui e'
**1,196**, il quarto valore diverso in quattro lezioni (1,152 · 1,090 ·
1,081 · 1,196), e l'atempo calcolato **1,099**.

---

## La DTW pesava i caratteri, non il tempo

`verifica-locale.py` ha segnalato la coppia s38 / s39 con **-2,10 s e
+2,51 s**: la firma di un confine spostato, e questa volta grande.

Il blocco s38 contiene «dalle lezioni 1.2, 1.4 e 1.5». Spezzato alla
punteggiatura, uno dei pezzi e' **«1.4 e 1.5.»**: dieci caratteri, che la
voce pronuncia «uno punto quattro e uno punto cinque» in circa quattro
secondi. La DTW allineava i pezzi di copione agli spezzoni di audio usando
`len(q)` come costo, e quel pezzo pesava dieci quando avrebbe dovuto pesare
una quarantina. Il risultato: l'ultima frase di s38 finiva dentro s39.

La correzione e' la stessa funzione che `verifica-locale.py` usava gia' dal
modulo 1 per il suo controllo — `len(t) + cifre*4` — portata dentro
`pezzi_testo`. Il peso non era sbagliato: era in un file solo.

| | prima | dopo |
|---|---|---|
| scarto tipico traccia B | 1,00 s | **0,74 s** |
| coppie segnalate | s38/s39 | **nessuna** |

Vale la pena notare **come** e' stato trovato. Il controllo statistico non
sa che cosa dice la voce: sa solo che due blocchi adiacenti hanno scarti
grandi e di segno opposto. E' bastato per puntare al punto esatto, e il
copione ha spiegato il resto.

---

## Nessuna nuova figura, una densita' nuova

Otto celle su una colonna non stavano nella cornice nemmeno alla misura
`fitta`: mancavano 16 px. Aggiunta `.griglia.fittissima`, che scatta da otto
celle in una colonna (o dodici in due).

---

## La resa

| | |
|---|---|
| resa pubblicata | `d3997f7ad126414387465bdf47f5bf51` — **9:15.0** |
| lotto asset | `a592eb6b6296499e92b8c2ad1eef074b` (98 file) |

---

## Da verificare

- Il peso delle cifre (×4) e' tarato sui 48 blocchi di 1.3. Ora che serve
  anche alla DTW e non solo al controllo, vale la pena ritararlo su tutte le
  lezioni misurate: un peso troppo alto sposterebbe i confini nell'altro
  verso.
- Le lezioni 2.1, 2.2 e 2.3 sono state ritagliate con la DTW non pesata. Il
  loro controllo statistico non ha segnalato coppie sospette e il confine
  dubbio di 2.1 e' stato verificato a mano sulla traccia grezza, quindi non
  sono state rifatte. Se una di quelle lezioni dovesse essere rifatta per
  altri motivi, il ritaglio migliorerebbe da solo.
