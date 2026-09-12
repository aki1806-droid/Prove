# Registro — Modulo 2 · micro-lezione 2.1 «Il processo di assistenza infermieristica»

Prima lezione del secondo modulo. Nessun difetto nel doppiaggio: le due
tracce coincidono con il copione al 100% e nessun blocco esce dalla fascia.
Quattro correzioni agli strumenti, tutte nate qui e tutte valide per le
lezioni successive.

---

## Scheda parametri

| | |
|---|---|
| durata chiesta dallo script | 9 minuti e 30 |
| durata ottenuta | **8:49.7** |
| slide dello script | 19 |
| scene | 50 (il tetto) |
| blocchi di parlato | 48 |
| voce | GianP — News Info and Documentary, `eleven_v3` |
| costo voce | $1,52 |
| costo trascrizioni | $0,60 |
| pause senza voce | nessuna; sei pose brevi dentro il parlato |

```
CARATTERI  9.127          BLOCCHI  48         SCENE  50/50
stima a 17,0 car/s        9:17.1
reale                     8:49.7      (parlato 516,4 s)
```

**17,7 car/s reali**, il ritmo piu' veloce delle nove lezioni fatte finora
(la banda era 15,8-17,6). Il motivo e' l'inverso di quello della 1.8: questa
lezione e' fatta di prosa continua, con pochissimi numeri. L'unica cifra
ricorrente e' «48 ore», e le date di legge sono due in tutto.

Ne discende una regola di stima che vale per il modulo 2: **una lezione di
metodo corre piu' veloce di una lezione di norme**. Per le prossime, con 17,0
car/s si sottostima la velocita' e quindi si sovrastima la durata: conviene
scrivere un po' piu' lungo di quanto la formula suggerisca.

---

## Il confine s30/s31

Il controllo statistico ha segnalato una coppia adiacente di segno opposto:
s30 a -0,86 s e s31 a +0,74 s, la firma di un taglio spostato in avanti.
Non lo era, e la prova sta nell'aritmetica sulla traccia grezza.

Il confine scelto (70,59 s) cade **dentro** la pausa piu' lunga di quella
zona, 0,759 s da 70,214 a 70,974: e' una pausa di fine periodo, la piu'
marcata fra 60 e 92 secondi. Le alternative sono due e nessuna regge:

| confine | s30 diventa | velocita' grezza |
|---|---|---|
| 68,37 (pausa da 0,26 s) | 10,65 s | troppo veloce |
| **70,59 (pausa da 0,76 s)** | **12,87 s** | **nella banda** |
| 76,79 (pausa da 0,81 s) | 18,67 s | 10,4 car/s — impossibile |

Lo scarto si spiega invece con la punteggiatura: s31 ha quattro fra virgole e
due punti in 196 caratteri, s30 ne ha due. Piu' punteggiatura, piu' pause
interne, blocco piu' lungo a parita' di testo. Confine tenuto.

---

## Nove difetti grafici, tre correzioni alla libreria

Tre slide sforavano la cornice alla prima resa.

- **s10 e s11, catena a cinque anelli**: +9 px in larghezza. «Pianificazione»
  a 40 px e' piu' larga dello spazio che resta fra le due punte della
  freccia. Aggiunta `.catena.fitta`, che scatta da cinque passi in su.
- **s16, matrice**: +139 px in altezza. Aggiunta `.matrice.fitta` per le
  celle con frase piu' didascalia — ma non bastava: il vero colpevole erano
  le **etichette dell'asse verticale**. In `writing-mode: vertical-rl` un
  `<br>` e un `<em>` allungano la colonna invece di mandarla a capo.
  Le etichette di un asse sono etichette: «Primario», «Secondario».

Un difetto di contenuto, trovato guardando i provini e non da un controllo
automatico: la s02 usava `sostituzione` per «modulo 1 → modulo 2», e la
sostituzione **barra** il lato sinistro. Il modulo 1 non e' sbagliato: e' il
precedente. Diventato `confronto`.

---

## Quattro correzioni agli strumenti

1. **`nuova-lezione.sh` non copiava `slide/grafica.mjs`**: lo script e'
   anteriore alla libreria grafica, e la 2.1 e' nata senza. Corretto.
   Corretto anche il glob, che era `progetti/m1-l*/` e avrebbe fatto partire
   ogni lezione del modulo 2 dalla 1.8.
2. **`costruisci.py` scrive i due chunk**. Prima si copiavano a mano dal
   copione: un passaggio manuale fra il testo approvato e il testo letto e'
   esattamente il punto in cui i due possono divergere senza che nessuno se
   ne accorga, perche' la verifica confronterebbe poi due cose gia' diverse.
3. **Lo stacco fra le tracce non e' piu' il primo confine dopo la meta'.**
   Su 2.2 quella regola dava un chunk A da 5.072 caratteri, oltre il limite
   di 5.000. Ora si sceglie, fra i confini di capitolo che tengono entrambi i
   chunk sotto il limite, quello che divide piu' equamente — e `costruisci.py`
   controlla che `tagli.py` abbia lo stesso `STACCO`, perche' se divergono i
   blocchi finiscono sulla traccia sbagliata in silenzio.
4. **`verifica-testo.py`**: «post operatoria» e «postoperatoria» sono la
   stessa parola. Il copione stacca il prefisso per far leggere bene la voce,
   il trascrittore lo riattacca. Resa dichiarata.

---

## L'ordine dei passi, corretto

Il messaggio di `nuova-lezione.sh` elencava `verifica-locale.py` prima di
`tagli.py applica`, ma il controllo statistico legge `blocchi-audio.json`,
che esiste solo dopo il ritaglio. L'ordine giusto e' quello che ho seguito:
allinea, trascrivi, verifica il testo, applica, verifica i confini.

---

## Da verificare

- La stima a 17,0 car/s va ritarata per le lezioni di metodo: qui ha
  sbagliato di 27 secondi in eccesso. Con 9 lezioni misurate (15,8-17,7) si
  puo' cominciare a distinguere due regimi invece di usare una media sola.
- La `matrice` con etichette lunghe sull'asse verticale resta fragile:
  `.fitta` cura le celle, non l'asse. Se una lezione avra' bisogno di
  etichette lunghe li', il tipo va rifatto con le etichette orizzontali.
