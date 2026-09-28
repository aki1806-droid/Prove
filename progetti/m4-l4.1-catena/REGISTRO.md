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
| costo trascrizioni | $0,56 (A $0,29 · B $0,27, questa il giorno dopo, al ritorno del credito) |
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

### La verifica per trascrizione

La traccia A conferma **713/717 parole**, la B **659/662**, nessun buco (le
rese diverse sono «CAUTI» sentito «CAUT», «di» reso «d'», «batteriemie»
scritto «batterie mie», «bundle» sentito «bando», «coordinati» reso
«coordinate»). La B è stata trascritta il giorno dopo la resa: la quota
mensile di ElevenLabs si era esaurita subito dopo la voce di questa lezione
(232 crediti residui contro i 1.630 richiesti), e il ripiego dell'SRT di
HeyGen non è raggiungibile da qui perché il proxy blocca `files2.heygen.ai`.
La resa era stata pubblicata con il controllo a 7/8 dichiarato; ora è 8/8.

La B ha anche insegnato una regola a `verifica-testo.py`: «nella lezione
quattro punto sei. È un aggancio» diventa nel trascritto «lezione 4.6. È un»,
che senza punteggiatura è «4 6 e un», e la regola dei decimali lo leggeva
come 6,1 segnalando un buco. I rimandi alle lezioni di qualunque modulo ora
convergono su «lezione46» prima della regola dei decimali.

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
| resa pubblicata | `a35300c5f3e66ecc0a895e332bd70e3e` — 541,730 s (9:01.7), 1080p 16:9, resa in 79 s, con SRT (`subtitle_url`) |
| lotto asset | `2054e227862d405aaf525fb839597e7e` — 98 file, 20 MB, tutti completati |

---

## Da verificare

- Il percento colora i primi n tondini in ordine di lettura, da in alto a
  sinistra: è una scelta grafica, non una distribuzione. La forbice «un terzo
  – metà» è resa con 33 pieni e 17 a mezza tinta.
- La resa pubblicata è quella del 28-09: la trascrizione della B, fatta
  dopo, non ha trovato nulla da correggere, quindi il video non è stato
  rifatto.
