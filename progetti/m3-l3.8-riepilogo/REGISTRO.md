# Registro — Modulo 3 · micro-lezione 3.8 «Riepilogo del Modulo 3 e autovalutazione»

Niente contenuti nuovi: il modulo ricomposto in sequenze, numeri, confusioni,
regole, casi e bundle. Due corpi nuovi, pensati per un riepilogo: l'**anello**
delle sette lezioni, ognuna con la sua illustrazione dentro un tondo
sull'ellisse che si disegna; e i **gesti**, la fila di riquadri illustrati con
le frecce che si disegnano fra l'uno e l'altro, per dire una sequenza in
ordine. Tre illustrazioni nuove: il quaderno, il quiz, l'orologio a cerchio.

Le due tracce sono state generate un'ora dopo il blocco della quota
ElevenLabs, nello stesso giro di 3.6 e 3.7.

---

## Scheda parametri

| | |
|---|---|
| durata chiesta dallo script | 8–9 minuti |
| durata ottenuta | vedi «La resa» |
| slide dello script | 16 |
| scene | 50 (il tetto) |
| blocchi di parlato | 48 |
| voce | GianP — News Info and Documentary, `eleven_v3` |
| costo voce | $1,51 (A $0,77 · B $0,74) |
| costo trascrizioni | $0,60 |
| pause senza voce | nessuna; due pose brevi sulle slide sul verde (s09, s31) |

```
CARATTERI  9.075          BLOCCHI  48         SCENE  50/50
stima a 17,0 car/s        9:09.2
tracce grezze             A 359,5 s  ·  B 302,8 s   (stacco dopo s25)
silenzi                   fattore 1,111   ->   atempo 1,116
```

## I confini

| | traccia A | traccia B |
|---|---|---|
| blocchi | 24 | 24 |
| blocchi fuori fascia | 0 | 0 |
| tagli nel parlato | nessuno | nessuno |

La trascrizione conferma: **695/703 e 670/675 parole**, nessun buco. Le rese
diverse sono quasi tutte numeri scritti in cifre dal trascrittore («kcal»,
«ml», «0,5 ml»): un riepilogo di numeri è il caso in cui la regola dei
decimali della 3.3 lavora di più. E un «alvo» sentito «albo».

Sedici slide in quarantotto blocchi: lo script del riepilogo è più corto degli
altri (5.952 caratteri al primo giro, 37 blocchi). I blocchi aggiunti
riprendono soltanto contenuti già detti nelle sette lezioni — screening della
deglutizione, cateterismo, cavo orale, laboratorio, PEG sfilata, bundle della
disfagia, cartella elettronica, il metodo di ripasso — senza numeri nuovi. Due
aggiunte tentate e tolte perché non stavano nello script (una soglia di Braden,
una velocità del potassio): un riepilogo non introduce dati.

## Le scene

| scene | corpo | contenuto |
|---|---|---|
| s01, s50 | copertina | la lezione; il Modulo 4 |
| s04–s05 | **anello** | le sette lezioni con le loro illustrazioni: prime quattro, poi tutte |
| s07, s10, s13, s47 | **gesti** | il filo (igiene, pasto, sacca); l'igiene; il sondino; il metodo |
| s02, s49 | icone | sequenze, numeri, casi, confusioni; CAUTI, VAP, CLABSI, sito chirurgico |
| s16–s17, s19, s22, s45 | cifre | postura; dopo il pasto; nutrizione; catetere e dolore; il test |
| s18 | frequenze | il cavo orale |
| s20 | tre (cifre) | sodio, potassio, calcio |
| s21 | fascia (uguali) | anuria, oliguria, normale |
| s12, s34 | bivio | lo screening; l'ictus che chiede acqua |
| s11, s03, s38 | catena | la persona a terra; quando riascoltare; oppioide e sonnolenza |
| s32, s46 | percorso | la persona a terra; i cinque passi del caso |
| s23–s24, s26–s27 | trappola | le dieci confusioni |
| s29–s30, s39–s43 | griglia | le cinque regole; VAP, CAUTI, disfagia; gli agganci veneti |
| s36 | numero | sodio 152 |
| il resto | confronto, sostituzione, raggiera, figura, titolo, frase | — |

## Correzioni fatte guardando le card

- **Le illustrazioni dell'anello uscivano a tutta slide**: un `<svg>` annidato
  eredita il CSS di `.illu` (`width:100%`). Ora sta in un `<g transform>` con
  larghezza fissa a 88 px.
- **La raggiera a sette raggi era illeggibile** (due didascalie fuori posto):
  sei raggi senza didascalie, e «l'organizzazione del pasto» nel sopratitolo.
- **Il centro della raggiera** («Bisogno lasciato indietro») non stava nel
  tondo: «Trascurato», con la frase intera nel sopratitolo.
- **`frequenze` stampava «undefined»**: il corpo vuole `q` (e `qd`) per la
  colonna di destra.

---

## La resa

| | |
|---|---|
| resa pubblicata | RESA38 |
| lotto asset | `dd0f5a8437a94588b7c9a12ce7652670` — 98 file, 20 MB, tutti completati |

---

## Da verificare

- L'anello mette le lezioni su un'ellisse in senso orario a partire dall'alto:
  la 3.1 è in cima e la 3.7 in alto a sinistra. È una scelta di lettura, non
  cronologica; se il committente preferisce una fila, il corpo `gesti` con
  sette voci non ci sta, e servirebbe un `percorso` con le illustrazioni.
- La scena s21 ripete la fascia della diuresi della 3.5, con le stesse soglie.
