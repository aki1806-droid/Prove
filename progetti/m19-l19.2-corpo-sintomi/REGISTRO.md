# REGISTRO — 19.2 Il corpo, i sintomi, i parametri e le azioni assistenziali

Modulo 19 bonus (inglese per il concorso), lezione 2 di 5: la piu' densa del
modulo, quasi tutta glossario.
Corso di preparazione al concorso **OSS** Azienda Zero · CISL FP Padova Rovigo.

## Scheda parametri

Invariata rispetto alla 19.1 (vedi il suo registro, anche per il provino di
pronuncia). Lo stacco fra le tracce e' `s27`, fine del capitolo 7 (i verbi
dell'assistenza).

## L'aritmetica — e la durata che non torna

```
caratteri scritti     6.327  ·  47 blocchi  ·  13 capitoli  ·  49 scene su 50
voce grezza           585,7 s   (A 308,3 · B 277,4)
lavorata netta        514,4 s   ·  CPS 12,30  ·  rapporto 1,139
respiro               0 s
montato locale        9:02.08
```

**Questa lezione dura circa 9:00, non 7:50.** La voce legge il glossario a
10,8 car/s grezzi, contro i 12,5 della 19.1: duecentocinquanta coppie brevi
(«Hip, anca. Skin, pelle.»), ognuna chiusa da un punto, e ogni punto e' una
pausa piena.

Si e' provato a mettere il **punto e virgola** dentro gli elenchi, lasciando
le parole come sono (`copione/testa-puntovirgola.py`): la voce e' durata
598,4 s, **piu' lunga ancora**. La lentezza viene dalle coppie, non dalla
punteggiatura.

Portarla a 7:50 voleva dire togliere circa un sesto del glossario (un migliaio
di caratteri) o accelerare la voce del 15%. Tutte e due le strade peggiorano
proprio la lezione che il documento chiede di «ascoltare piu' di una volta»:
**si e' tenuto il contenuto intero.** Una versione a 7:50 si puo' fare
togliendo dalla voce le coppie piu' trasparenti (infection, fracture, dose,
oxygen...) e lasciandole sulla slide: la slide resta il glossario completo.

## Il copione di partenza non trasferisce cosi' com'e'

Il testo del documento, **nessuna aggiunta**. Tre ritocchi per la voce, dalla
lezione della 19.1 (una frase che comincia con «E» + inglese fa passare la
voce all'inglese): «E left e right» → «Poi left e right»; «E tablet e' la
compressa» → «Tablet, infine, e' la compressa»; «Foot e feet, tooth e teeth
sono plurali irregolari» → «I plurali irregolari: foot e feet, tooth e teeth».
Due blocchi accorpati per stare nelle 49 scene.

## Le slide

Le regole della 19.1. 49 scene: tabella 32 · griglia 5 · trappola 4 · memo 3
· copertina 2 · titolo 2 · frase 1.

- Il glossario e' quasi tutto in `tabella` Inglese | Italiano; gli organi, gli
  aggettivi dello stato e i verbi della comunicazione in `griglia` 3×3.
- Una riga `chiave` segna la trappola che la voce nomina: teeth e feet
  (plurali irregolari), stroke, to dress.
- Nel riepilogo «to take» andava a capo fra «to» e «take»: spazio
  indivisibile (`to&nbsp;take`).

## Esito delle verifiche

| | |
|---|---|
| temi concordi fra `blocchi.json` e `contenuti.mjs` | ✓ 47 su 47 |
| traboccamento, copertine, serie a tappe | ✓ |
| provini guardati | ✓ tutti e 49 |
| verifica per trascrizione, Scribe | ✓ **98,8% su A, 99,8% su B · 0 buchi** |
| tagli fra due parole, coi tempi di Scribe | ✓ 45 su 45 — **dopo due correzioni** |
| blocchi nella fascia 8,5-21 car/s | ✓ tutti e 47 (8,9-16,5) |
| scarto audio/video sulle clip | ✓ massimo 20 ms |
| durata del montato locale ≥ 7:50 | ✓ **9:02.08** — vedi sopra |
| sottotitoli SRT | ✓ 47 righe su 47 blocchi |

Due tagli **caduti dentro l'ultima parola** del blocco prima (s47 e s48,
traccia B), corretti al centro del silenzio vero (+0,99 e +0,92 s).

Gli scarti brevi:

- grafie di Scribe: «stomachache», «diarrhea», «bed sore»;
- s09, «foot, piede, e feet» → «eh feet»: la «e» detta come esitazione;
- **s25, «vestire, e anche medicare» → «medicate»**: va ascoltato. Puo' essere
  Scribe, o la voce che ha detto la parola all'inglese;
- **s35, «pericolo, e dangerous» → «and dangerous»**: lo stesso difetto della
  19.1, in un'altra forma. **Anche una «e» italiana dopo una virgola, seguita
  da un termine inglese, fa passare la voce all'inglese.** Dalla 19.3 il
  copione evita «, e» + inglese.

## Il montato

| | |
|---|---|
| montato locale | `montato-19.2.mp4` — **9:02.08** |
| montato HeyGen | `c71fe55a41ebf51863508d682327bd29` — **9:00.80** |
| render | 114 s |
| asset caricati | 96 in un lotto solo, nessun 503 |

Perdita in consegna 1,28 s su 49 scene. Scaricato e controllato: 9:00.80,
1920×1080, audio presente (media −27,1 dB). Al centro di s29 (4:57, i verbi
della comunicazione) i due fotogrammi coincidono: scarto medio 0,3 su 255.

## Costo misurato

```
voce, due tracce, due versioni (eleven_v4)       0 crediti
trascrizione A (Scribe, 308,3 s)             1.695 crediti
trascrizione B (Scribe, 277,4 s)             1.525 crediti
```

## Da verificare — quello che non ho potuto giudicare io

- **La durata, 9:00 invece di 7:50**: decisione da prendere (vedi sopra).
- **La pronuncia inglese va ascoltata**, in particolare le parole lunghe e i
  gruppi consonantici: «wheezing», «diarrhoea», «thermometer», «bladder».
- **s25 «medicare»** e **s35 «and dangerous»**: vedi sopra.
- **La sigla IV** (drip, o IV): inglese «ai-vi» o italiano «i-vu»?
- **I contenuti di merito sono del documento**, non verificati contro una
  fonte.
- **L'SRT porta gli apostrofi del parlato**: decisione ancora aperta.
