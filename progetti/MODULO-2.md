# Modulo 2 — Metodologia, documentazione e sicurezza

Otto micro-lezioni, tutte 8/8 ai controlli, tutte 50 scene e 48 blocchi.

| | lezione | durata | resa |
|---|---|---|---|
| 2.1 | Il processo di assistenza | 8:49.7 | `67b470b623de1392ec89e0161a73b314` |
| 2.2 | Modelli e tassonomie | — | vedi `m2-l2.2-modelli/REGISTRO.md` |
| 2.3 | Accertamento e scale | — | vedi `m2-l2.3-scale/REGISTRO.md` |
| 2.4 | La documentazione infermieristica | 9:15.0 | `d3997f7ad126414387465bdf47f5bf51` |
| 2.5 | EBP, linee guida, PDTA e procedure | 8:43.0 | `d102ae6a673dd2b9af99786b3f226c35` |
| 2.6 | Rischio clinico e sicurezza del paziente | 9:27.6 | `45a9e46e32f19b2a7262dacf3f1d737e` |
| 2.7 | Comunicazione clinica e continuita' | 9:19.7 | `81a2005c747af9bf2fb98c139274e9d5` |
| 2.8 | Riepilogo del Modulo 2 | 8:36.6 | `8426d94288277bcf9bb8ed7f903e78dc` |

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
