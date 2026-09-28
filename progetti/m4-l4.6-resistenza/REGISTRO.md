# Registro — Modulo 4 · micro-lezione 4.6 «Antibiotico-resistenza e stewardship»

La lezione del meccanismo. Lo script spiega la selezione in tre frasi, e la
grafica le segue con un corpo nuovo, la **selezione**: un campo di quaranta
germi, sei dei quali in accento perché già resistenti (s04); l'antibiotico
passa e i sensibili svaniscono, restano i sei (s05); i sei si sono
moltiplicati e il campo è tutto loro (s06). Il testo sta a destra, come nel
percento. Le sigle degli MDRO sono una griglia che si riempie in tre scene, il
ruolo dell'infermiere tre file: i gesti dei campioni (siringa, provetta,
goccia, dispenser), la griglia della somministrazione, la catena della
prevenzione. One Health torna come triade, e il caso d'esame è un percorso.

---

## Scheda parametri

| | |
|---|---|
| durata chiesta dallo script | 9 minuti |
| durata ottenuta | voce non ancora generata (quota ElevenLabs esaurita il 28-09) |
| slide dello script | 18 |
| scene | 50 (il tetto) |
| blocchi di parlato | 48 |
| voce | GianP — News Info and Documentary, `eleven_v3` |
| pause senza voce | nessuna; due pose brevi sulle slide sul verde (s15, s36) |

```
CARATTERI  8.765          BLOCCHI  48         SCENE  50/50
stima a 17,0 car/s        8:51.0
stacco tracce             dopo s24   (chunk A 4.326 car · chunk B 4.439 car)
```

Lo script chiede di «scandire con pausa le sigle della slide 4»: le sigle
stanno in quattro blocchi su quattro scene, e ogni blocco ne porta al massimo
due. La frase da enfatizzare, «ogni infezione prevenuta è un antibiotico non
usato», sta sul verde (s36) e torna in chiusura (s49).

## Le scene

| scene | corpo | contenuto |
|---|---|---|
| s01, s50 | copertina | la lezione; la prossima (4.7) |
| s04–s06 | **selezione** | prima, dopo l'antibiotico, dopo la moltiplicazione |
| s09–s11 | griglia | MRSA, VRE, ESBL, CRE/KPC, Acinetobacter, Pseudomonas, a coppie |
| s28–s30 | gesti | i campioni: prima, due set, 8–10 ml, antisepsi |
| s31–s33 | griglia | la somministrazione, cinque voci a gruppi |
| s25, s40–s41 | percorso | le quattro regole; il caso RSA a cinque tappe |
| s37, s44 | triade | One Health; la stessa battaglia da tre lati |
| s20, s34, s43 | catena | mani-contatto-ambiente; la prevenzione; antibiotico → C. difficile |
| s08, s12, s42 | figura | microbo (Klebsiella; C. difficile); catetere |
| s22 | norma | PNCAR |
| s15, s36 | titolo sul verde | «per il colonizzato come per l'infetto»; «un antibiotico non usato» |
| il resto | confronto, sostituzione, icone, frase, griglia | — |

## Correzioni fatte guardando le card

- **Nella selezione ogni parola in accento andava a capo da sola**: la regola
  che mette il riquadro del testo in colonna (`display:flex`) prendeva anche il
  `div` del titolo, e i suoi figli in linea diventavano righe. Ora la regola
  vale solo per il `div` esterno (`foreignObject > div`).
- **Il testo della selezione usciva dal riquadro**: carattere da 64 a 56 px,
  riquadro a tutta altezza; i germi sensibili avevano il tratto troppo
  chiaro, ora è a mezza tinta del titolo.
- **«Decine di migliaia» non sta in un numero**: la scena è una frase.
- **Le sigle in corsivo con «MDR»**: il triplo asterisco si annodava; ora il
  nome è in corsivo e la sigla in grassetto.
- **La fiala con la croce non è una provetta**: per «due set» si usa la
  provetta disegnata per la 4.5.
- **«Una battaglia» non stava nel cerchio della triade**: «Tre lati».

---

## La resa

Da fare quando il credito ElevenLabs torna: voce A/B, allineamento, verifica
per trascrizione, montaggio, caricamento e resa HeyGen.

## Da verificare

- Nella selezione i sei resistenti sono a posizioni fisse (3, 11, 17, 22, 30,
  37): è una scelta grafica, non una proporzione.
