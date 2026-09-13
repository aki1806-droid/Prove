# Modulo 2 — Metodologia, documentazione e sicurezza

Otto micro-lezioni, tutte 8/8 ai controlli, tutte 50 scene e 48 blocchi.
Le rese qui sotto sono quelle del giro **grafica di seconda generazione**
(illustrazioni che si disegnano, numeri che contano, raggiere): le precedenti
stanno nei registri delle singole lezioni.

| | lezione | durata | resa |
|---|---|---|---|
| 2.1 | Il processo di assistenza | 8:48.4 | `e8ccf810ae2913d43cdc84c52336dd3c` |
| 2.2 | Modelli e tassonomie | 8:56.8 | `3c2bea89378a792e3d96a3f995732dae` |
| 2.3 | Accertamento e scale | 8:59.6 | `c4a3a9f425274afb4f406719bfa2c827` |
| 2.4 | La documentazione infermieristica | 9:15.0 | `26c90ec748c5009d31a949f67be2cd5a` |
| 2.5 | EBP, linee guida, PDTA e procedure | 8:43.0 | `6168f18a0839e6bb62899f62fa1fa569` |
| 2.6 | Rischio clinico e sicurezza del paziente | 9:27.6 | `75b091efb11899871b4945411c252556` |
| 2.7 | Comunicazione clinica e continuita' | 9:19.7 | `b132df8b591792f918254d42aa570a6f` |
| 2.8 | Riepilogo del Modulo 2 | 8:36.6 | `77a9473e151388c5a15c648b17d224d6` |

## Che cosa ha insegnato il modulo alla catena di montaggio

Tre numeri che sembravano costanti non lo erano, e ogni volta il sintomo e'
stato lo stesso: **un controllo che dice una cosa falsa**, in un verso o
nell'altro.

1. **Il fattore dei silenzi** (2.2). Era fisso a 1,12; sulle otto lezioni va da
   1,078 a 1,196. Adesso si misura con una passata di ffmpeg, e con esso
   l'`atempo`.
2. **Il peso di un pezzo di copione** (2.4, poi 2.6). Prima i caratteri, poi
   «una cifra vale cinque caratteri», adesso il numero scritto per esteso.
   E due volte il peso e' finito in due file diversi: la seconda volta il
   disaccordo **mascherava** la coppia sospetta che avrebbe dovuto segnalare.
3. **La soglia delle pause** (2.6). Scritta a mano a 0,15 s, ha accusato un
   taglio di 2.5 che cadeva nel centro esatto di una pausa di 0,143 s.

## I controlli nati qui

- **Il taglio cade dentro una pausa vera?** (2.6) Costa una passata di
  `silencedetect`, non richiede trascrizioni, e vale piu' della firma
  statistica. Rilanciato su tutte e otto: **322 tagli su 322 dentro una pausa**.
- **La slide stampa un dato che non c'e'?** (2.7) `cards.mjs` cerca
  `undefined`, `NaN` e `[object Object]` nel testo reso. Nato da un
  `assetempo` senza anni che avrebbe pubblicato «undefined» due volte.

## Quello che resta umano

Otto slide sbagliate in quattro lezioni, **nessuna delle quali sforava la
cornice**: contenuti inventati, una spunta per un'assenza, un Venn per due
cose che non si sovrappongono, una matrice che faceva passare una barriera per
l'esempio di un'altra. Si vedono solo guardando i provini, uno per uno.
