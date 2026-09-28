# Registro — Modulo 4 · micro-lezione 4.1 «Le ICA: epidemiologia e catena delle infezioni»

La lezione che apre il modulo delle infezioni, e la prima che chiede una
figura che il committente ha nominato nello script: «gli anelli compaiono uno
per volta, poi uno si spezza». È nato così il corpo **anelli**: sei ovali
concatenati che compaiono in sequenza, con `rotto` l'anello che si separa in
due metà in accento. E il **percento**: cento tondini in dieci file, i primi
otto in accento per «otto ricoverati su cento», trentatré pieni e diciassette
a mezza tinta per «fra un terzo e la metà».

Nove illustrazioni nuove, tutte per il modulo: la ferita con i punti (SSI),
il catetere venoso centrale (CLABSI), la mano sulla superficie (contatto), la
goccia (droplet), i nuclei sospesi (via aerea), il microbo, la macchina
fotografica (prevalenza), la pellicola (incidenza), la zanzara (vettori).

---

## Scheda parametri

| | |
|---|---|
| durata chiesta dallo script | 9 minuti |
| durata ottenuta | vedi «La resa» |
| slide dello script | 18 |
| scene | 50 (il tetto) |
| blocchi di parlato | 48 |
| voce | GianP — News Info and Documentary, `eleven_v3` |
| costo voce | $1,49 (A $0,76 · B $0,72) |
| costo trascrizioni | $0,29 (solo A: vedi sotto) |
| pause senza voce | nessuna; tre pose brevi sulle slide sul verde (s12, s19, s35) |

```
CARATTERI  8.923          BLOCCHI  48         SCENE  50/50
stima a 17,0 car/s        9:01.5
tracce grezze             A 315,4 s  ·  B 296,3 s   (stacco dopo s27)
silenzi                   fattore 1,088   ->   atempo 1,071
```

Diciotto slide in quarantotto blocchi: il primo giro era a 8.392 caratteri,
undici blocchi corti sono stati allungati con frasi prese dallo script (le
tre sigle dei dispositivi, «il pavimento le ferma», «le mani fanno da
ponte») e tre lunghi accorciati. La nota cromatica dello script (verde
`#00532A`, arancio `#F39200`) non si applica: il tema resta CISL FP.

## I confini

| | traccia A | traccia B |
|---|---|---|
| blocchi | 26 | 22 |
| blocchi fuori fascia | 0 | 0 |
| tagli nel parlato | nessuno | nessuno |

La voce ha corso nei primi due blocchi (s02 e s03 sopra i 19 car/s grezzi):
nessuna pausa mancante, solo un ritmo più svelto, e dopo il taglio delle
pause i blocchi rientrano.

### La trascrizione di B è arrivata dai sottotitoli della resa

La trascrizione della traccia A conferma **714/719 parole**, nessun buco (le
rese diverse sono «CAUTI» sentito «CAUT» e «di» reso «d'»). La traccia B non
ha potuto essere trascritta da ElevenLabs: la quota mensile si è esaurita di
nuovo (232 crediti residui contro i 1.630 richiesti), subito dopo la voce di
questa lezione. La verifica di B è stata fatta sul file SRT che HeyGen
produce alla resa (`caption`): stesso confronto parola per parola, stessa
soglia. Il metodo lo registra come ripiego valido, non come sostituto.

## Le scene

| scene | corpo | contenuto |
|---|---|---|
| s01, s50 | copertina | la lezione; la prossima (4.2) |
| s17–s19 | **anelli** | i sei anelli, a gruppi; poi il quarto si spezza sul verde |
| s20–s22 | **anelli** | gli interventi sotto ogni anello, a gruppi |
| s10–s11 | **percento** | otto su cento; da un terzo alla metà |
| s13–s14, s24, s27 | icone | le quattro sedi con le illustrazioni nuove; le cinque vie |
| s03, s08, s28, s36–s37 | figura | mani, casa, catetere, fotografia, pellicola |
| s43 | triade | One Health, con il centro su due righe |
| s42, s44 | norma | PNCAR; L. 24/2017 |
| s06 | numero | 48 ore |
| s09, s25 | cifre | 30 e 90 giorni; oltre 5 µm, entro 1–2 m |
| il resto | griglia, confronto, raggiera, frase, catena, trappola, sostituzione, titolo | — |

## Correzioni fatte guardando le card

- **Le etichette degli anelli si toccavano**: le caselle erano larghe 300 px su
  un passo di 266. Ora larghe quanto il passo meno 14, con il carattere a 27.
- **L'anello rotto restava intero sotto le due metà**: la transizione a
  `forwards` non bastava. L'anello rotto ora è disegnato solo come due metà,
  dentro un gruppo che fa il `pop` e poi si separa.
- **La ferita era una scatola con tre asterischi**: a 60 px il rettangolo
  mangiava tutto. Ora è un'incisione lunga con quattro punti a croce.
- **«One Health» usciva dal cerchio della triade**: il centro va su due righe
  quando contiene uno spazio (`tspan`).

---

## La resa

| | |
|---|---|
| resa pubblicata | RESA41 |
| lotto asset | LOTTO41 |

---

## Da verificare

- Il percento colora i primi n tondini in ordine di lettura, da in alto a
  sinistra: è una scelta grafica, non una distribuzione. La forbice «un terzo
  – metà» è resa con 33 pieni e 17 a mezza tinta.
- La trascrizione di B viene dai sottotitoli HeyGen, non da Scribe: quando
  il credito torna, si può rifare con Scribe per uniformità, ma la verifica
  parola per parola è la stessa.
