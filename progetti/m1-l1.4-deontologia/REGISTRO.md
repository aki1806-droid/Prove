# Registro — Modulo 1 · micro-lezione 1.4 «Il Codice deontologico»

Quarta lezione. La verifica per trascrizione e' ormai di routine, e stavolta
la traccia A e' tornata **al 100%**. Il difetto interessante di questa
lavorazione non e' nella lezione: e' nel **controllo di traboccamento**, che
per quattro lezioni ha guardato l'elemento sbagliato.

---

## Scheda parametri

| | |
|---|---|
| durata chiesta dallo script | 9 minuti e 30 |
| durata ottenuta | **9:00.7** |
| slide dello script | 19 |
| scene | 50 (il tetto) |
| blocchi di parlato | 48 |
| voce | GianP — News Info and Documentary, `eleven_v3` |
| costo voce | $1,49 (0,75 + 0,75) |
| costo trascrizioni | $0,60 (0,29 + 0,31) |
| pause senza voce | nessuna; quattro pose brevi dentro il parlato |

Lo script chiedeva 9:30 stimando 135 parole al minuto. Questa voce, dopo il
filtro del ritmo, va piu' svelta: 9:00 con 8.957 caratteri. Per arrivare a
9:30 servirebbero circa 500 caratteri in piu', cioe' due blocchi e mezzo, e
non ho voluto allungare per riempire. La soglia che mi hai dato — «8 minuti
almeno» — e' comunque superata di un minuto.

---

## Valori derivati

```
CARATTERI  8.957          BLOCCHI  48         SCENE  50/50
stima a 17,0 car/s        9:04.7
reale                     9:00.7      (parlato 527,3 s)
```

Quattro secondi di scarto su nove minuti. Il 17,0 car/s regge alla terza
lezione consecutiva.

---

## Il difetto nel controllo, che vale piu' della lezione

Guardando i PNG ho visto che la mappa degli otto capi era **tagliata in
fondo**: l'ottavo capo non si vedeva. Ma `cards.mjs` aveva appena stampato
«nessuna slide sfora la cornice».

Il controllo faceva cosi':

```js
const c = document.querySelector('.corpo');
return { sfora: c.scrollHeight - c.clientHeight, ... };
```

E non poteva funzionare. `.corpo` e' un **flex item con `flex:1`**: quando il
contenuto e' piu' alto dello spazio, non scrolla — **cresce**. `scrollHeight`
resta uguale a `clientHeight`, il controllo dice che va tutto bene, e a
tagliare e' la slide che sta sopra, con `overflow:hidden`.

Il confronto giusto e' geometrico: il rettangolo del corpo contro la cornice
interna della slide, padding compreso. Riscritto cosi', il controllo ha
trovato subito **due** slide fuori, non una:

```
s13, s14, s15   +156px in altezza     (la mappa degli otto capi)
s47, s48, s49    +98px in altezza     (il memo dei sette punti)
```

Il memo dei sette punti non l'avevo ancora notato a occhio.

**Le tre lezioni gia' pubblicate le ho ricontrollate con il controllo
corretto: sono pulite.** Il difetto non aveva nascosto nulla, semplicemente
non aveva mai avuto occasione di scattare — nessuna delle prime tre aveva
elenchi cosi' lunghi. E' la differenza fra «non e' successo» e «non poteva
succedere», e per quattro lezioni ho creduto la seconda.

### La correzione, dove va messa

Ho aggiunto una variante compatta dell'elenco che **scatta da sola a sette
voci o piu'**: corpo da 40px invece di 47, interlinea e spazi ridotti. La
soglia sta nel `layout.mjs`, non nelle singole scene, cosi' nessuna lezione
futura se ne puo' dimenticare. Con la variante, entrambe le slide rientrano
e restano leggibili.

---

## La verifica per trascrizione

```
traccia A   681/681 parole coincidenti (100,0%)   buchi: 0
traccia B   694/696 parole coincidenti (99,7%)    buchi: 0
```

**Nessun buco: la voce ha detto tutto.** Per arrivarci ho dovuto allargare
la tabella `RESE` di `verifica-testo.py`, e una modifica e' strutturale: le
sostituzioni ora si applicano **dopo** aver tolto la punteggiatura. Il
trascrittore scrive «F, N, O, P, I.» e con le virgole in mezzo nessuna regola
riconosceva la sigla.

Le rese nuove, una per una e dichiarate:

- «illecito» che torna «il lecito» — in italiano suonano identici;
- i rimandi alle altre lezioni: «uno punto sei» torna «1.6», e cosi' per
  tutte;
- «FNOPI» compitato lettera per lettera.

Restano due scarti brevi, tutti e due sulla traccia B:

- `s47` «cinquantatre» -> «53»: resa del numero, non un errore;
- `s45` «possano» -> «possono». Questo e' l'unico che **potrebbe** essere la
  voce: e' una vocale, congiuntivo contro indicativo, e non cambia il senso
  della frase. Non vale una rigenerazione, ma sta nella lista da ascoltare.

---

## I tagli

Prima passata, nessuna correzione necessaria:

```
traccia A   scarto tipico 0,57 s      nessuna coppia adiacente di segno opposto
traccia B   scarto tipico 0,59 s      nessuna coppia adiacente di segno opposto
```

Sono gli scarti piu' stretti delle quattro lezioni, e le due tracce per la
prima volta si somigliano (in 1.3 erano 0,55 e 0,91). Zero blocchi fuori
fascia dopo il ritmo.

---

## Il copione

48 blocchi da 187 caratteri di media, dai 19 blocchi dello script. Vincoli
del MASTER rispettati alla prima: nessuna vocale accentata, nessun blocco
oltre 225 caratteri, 2 tag di intenzione su 6.

Le quattro pose vengono dalle tue note di produzione:

| dove | quanto | perche' |
|---|---|---|
| `s22` | 1,2 s | la sequenza a tre passi della prescrizione dubbia |
| `s28` | 1,4 s | «non si contiene per carenza di personale» |
| `s31` | 1,2 s | «non comunica la diagnosi ma non mente» |
| `s41` | 1,0 s | la sequenza a tre passi del collega che sbaglia |

Le due frasi con enfasi marcata hanno anche una slide tutta loro, a fondo
verde pieno e senza altro testo: sono i due punti in cui il video si ferma.

Nessuna aggiunta di contenuto normativo rispetto al tuo script. Ho solo
scritto i distrattori delle due slide «trappola» (`s23` e `s32`) come opzioni
di quiz vere e proprie, perche' lo script diceva «sono sbagliate entrambe le
opzioni estreme» senza formularle.

---

## Le grafiche

50 PNG, guardati tutti in provini da nove.

| tipo di slide | quante |
|---|---|
| frase | 16 |
| elenco | 15 |
| titolo grande | 5 |
| norma | 5 |
| confronto | 4 |
| tre riquadri | 3 |
| trappola, copertina | 4 |

Oltre al controllo di traboccamento, una correzione di gusto: la slide della
regola pratica sui social (`s44`) era una «sostituzione», che barra il lato
sbagliato. Ma il testo barrato conteneva un accento in rosso e in grassetto,
e barrato sopra un colore forte diventa illeggibile. E' diventata un
confronto a due colonne, senza barratura.

---

## Riprese e immagini generate

Nessuna. Lezione a sole slide.

---

## Montaggio

98 asset in un lotto solo. Scene video con `audio_asset_id` e
`playback: {freeze, mute}`, copertina e chiusura come immagini con durata
esplicita di 3 e 10 secondi.

```
video HeyGen   2121a2769f31e8e479897b2c061e30da
               app.heygen.com/videos/2121a2769f31e8e479897b2c061e30da
copia locale   montato-1.4.mp4 · 9:00.7 · 1920x1080 · 25 fps · 20 MB
sottotitoli    montato-1.4.srt · 48 righe, dal copione e dalle durate reali
scarto A/V     20 ms al massimo, su s29
```

---

## Da verificare — quello che non ho potuto giudicare io

1. **Come suona la voce.** Non l'ho ascoltata. In particolare le quattro
   pose, e se i due punti di enfasi marcata (`s28` e `s31`) hanno davvero il
   peso che volevi.
2. **`s45`, «possano» o «possono»**, per il motivo scritto sopra.
3. **I distrattori che ho formulato io** nelle due slide trappola: sono
   plausibili come opzioni di quiz, ma li ho scritti io, non il tuo script.
4. **La lunghezza.** 9:00 contro i 9:30 che avevi stimato. Se li vuoi
   davvero, si allunga: dimmelo e aggiungo due blocchi.
5. **La variante compatta dell'elenco** su `s13`-`s15` e `s47`-`s49`: il
   testo scende da 47 a 40 px. A me sembra ancora ben leggibile a schermo
   pieno, ma su un telefono e' la prima cosa da controllare.
