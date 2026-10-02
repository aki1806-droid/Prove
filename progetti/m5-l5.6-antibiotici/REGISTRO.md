# Registro — Modulo 5 · micro-lezione 5.6 «Antibiotici, analgesici e stupefacenti»

Tre famiglie di farmaci e una normativa, e quattro corpi nuovi, uno per
ciascuna cosa che si capisce meglio con un disegno che con un elenco. Il
**mic** sono due pannelli con la soglia efficace tratteggiata: a sinistra
tre dosi a intervalli e, sotto l'asse, la fascia di tempo in cui la curva
sta sopra la soglia (i tempo-dipendenti); a destra una dose sola, alta,
con il picco marcato (i concentrazione-dipendenti). Il **respiro** è la
linea del tempo con due tracce: il livello di sedazione che sale a gradini
e la frequenza respiratoria che resta normale a lungo e cala solo alla
fine, con la finestra «qui si interviene» fra le due; in modo `caso` segna
il punto d'arrivo, FR 9 e SpO₂ 90. L'**antidoto** sono le due curve di
oppioide e naloxone che calano dalla stessa altezza, l'antidoto in fretta
e l'oppioide piano, con la fascia in cui la persona torna a sedarsi. Il
**registro** è la pagina del registro di carico e scarico, numerata e con
il timbro della vidimazione, che si compila riga per riga (data, carico,
scarico, paziente, giacenza, firma); `evidenzia` accende una riga,
`correzione` ne barra una con una riga sola e la firma accanto.

Nessuna illustrazione nuova: microbo, siringa, libro e armadio sono già in
libreria.

---

## Scheda parametri

| | |
|---|---|
| durata chiesta dallo script | 10 minuti |
| durata ottenuta | vedi «La resa» |
| slide dello script | 20 |
| scene | 50 (il tetto) |
| blocchi di parlato | 48 |
| voce | GianP — News Info and Documentary, `eleven_v3` |
| costo voce | $1,48 (A $0,76 · B $0,72) |
| costo trascrizioni | $0,58 (A $0,29 · B $0,29), fatte il 2 ottobre al ritorno del credito |
| pause senza voce | nessuna; due pose brevi sulle slide sul verde (s20, s38) |

```
CARATTERI  8.864          BLOCCHI  48         SCENE  50/50
stima a 17,0 car/s        8:56.8
stacco tracce             dopo s26   (chunk A 4.559 car · chunk B 4.305 car)
tracce grezze             A 315,2 s  ·  B 321,6 s
silenzi                   fattore 1,117   ->   atempo 1,093
```

Lo script è di circa 1.950 parole per 20 slide, il più lungo del modulo:
i blocchi lo seguono tagliando le ripetizioni, senza aggiunte. Lo script
chiede una pausa fra la parte clinica e quella normativa: non c'è una pausa
musicale, ma la slide sul verde «mai firmare per un collega» e la figura
del DPR 309 fanno da cerniera.

## I confini

| | traccia A | traccia B |
|---|---|---|
| blocchi | 25 | 23 |
| blocchi fuori fascia | 0 | 0 |
| tagli nel parlato | nessuno | nessuno |

### La verifica per trascrizione

Fatta il 2 ottobre, al ritorno del credito: le tracce grezze sono state
riattaccate al flow dai nuovi URL firmati della generazione (gli URL del 30
settembre erano scaduti) e trascritte dagli asset, non dal nodo della voce.
La traccia A conferma **639/645 parole**, la B **631/637**, nessun buco. Le
rese diverse (non buchi): s11 «anterolaterale» sentito «antero laterale»; s12
«chili» sentito «kg»; s17 «fentanil» sentito «fentanyl»; s26 «lezione23»
sentito «2virgola3» (il rimando «5.1» e il «2-3 a 1» fusi dal normalizzatore);
s33 «deve» sentito «dev»; s40 «pseudodipendenza» sentito «pseudo dipendenza»;
le solite «e» sentite «ee».

## Le scene

| scene | corpo | contenuto |
|---|---|---|
| s01, s50 | copertina | antibiotici, analgesici, stupefacenti; la 5.7 |
| s04–s05 | **mic** | tempo-dipendenti; concentrazione-dipendenti |
| s19, s41 | **respiro** | la sedazione compare prima; il caso, con FR 9 e SpO₂ 90 |
| s22 | **antidoto** | il naloxone dura meno dell'oppioide |
| s29, s30, s33 | **registro** | la pagina vidimata; lo scarico evidenziato; la correzione con riga e firma |
| s06–s08 | colonne | aminoglicosidi, vancomicina, gli altri |
| s11, s26, s28 | cifre | l'adrenalina 0,5 mg; le conversioni 2–3 : 1; DPR 309 e legge 38 |
| s42 | percorso | che cosa fai nel caso |
| s45 | catena | normativa, registro, custodia, responsabilità |
| s13 | trappola | il paracetamolo nelle associazioni |
| s20, s38 | titolo sul verde | «la sedazione compare prima»; «mai firmare per un collega» |
| il resto | griglia, figura, frase, confronto | — |

## Correzioni fatte guardando le card

- **s28 sforava di 23 px in larghezza**: «309/1990» come cifra unica era
  troppo largo; la cifra è «309» con suffisso «/1990».
- **Due etichette del respiro non comparivano** («tempo →», «FR 9 ·
  SpO₂ 90%»), e il «picco» del mic nemmeno: `${num(y) + 50}` in un
  template concatena stringhe («451» + 50 = «45150») e manda il testo fuori
  dal foglio. La somma va dentro `num()`. Cercato in tutta la libreria del
  5.6: sette casi, tutti corretti.
- **Le classi `.tempo` e `.caso`** sono state rinominate (`assetempo`,
  `segno`) per non collidere con classi del tema: precauzione, non era
  quella la causa.
- **«oppioide» copriva «soglia di sedazione»**: etichetta spostata a un
  terzo della curva; «naloxone» sotto la sua curva, lontano dalla soglia.
- **Il timbro copriva «pag. 12»**: spostato verso il centro della testata.

---

## La resa

| | |
|---|---|
| resa pubblicata | `dab37aec0729846a0c7d4cab4aeeafd6` — 537.257 s (8:57.3), 1080p 16:9, resa in 64 s, con SRT (`subtitle_url`) |
| lotto asset | `fbb4ff0e7a12493d997910e8185713c9` — 98 file, 19 MB, tutti completati in ~4 minuti |

---

## Da verificare

- Nulla di aperto: la verifica per trascrizione non segnala buchi e gli
  otto controlli passano. Da ascoltare come sempre: la sindrome dell'uomo
  rosso (s07), «zero virgola cinque milligrammi» (s11), la scansione del caso
  con FR 9 e SpO₂ 90 (s41), il DPR 309 letto per esteso (s27).
- La voce e' stata generata il 30 settembre e trascritta il 2 ottobre, al
  ritorno del credito: in mezzo la lezione e' rimasta montata in locale senza
  verifica, come previsto dal MASTER quando il credito manca.
