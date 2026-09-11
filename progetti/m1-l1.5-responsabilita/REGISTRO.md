# Registro — Modulo 1 · micro-lezione 1.5 «La responsabilita' professionale»

Quinta lezione, prima delle quattro consegnate insieme. Qui il metodo ha
trovato un difetto vero nella **scelta della soglia di pausa**, e per la prima
volta ho dovuto usare il comando di correzione dei confini.

---

## Scheda parametri

| | |
|---|---|
| durata chiesta dallo script | 10 minuti |
| durata ottenuta | **8:44.0** (render) · 8:45.3 (taglio locale) |
| slide dello script | 20 |
| scene | 50 (il tetto) |
| blocchi di parlato | 48 |
| voce | GianP — News Info and Documentary, `eleven_v3` |
| costo voce | $1,47 |
| costo trascrizioni | $0,59 |
| pause senza voce | nessuna; tre pose brevi dentro il parlato |

```
CARATTERI  8.793          BLOCCHI  48         SCENE  50/50
stima a 17,0 car/s        8:54.0
reale                     8:45.3      (parlato 512,0 s)
```

Nove secondi di differenza fra stima e realta', tutti spiegati dal confine
corretto a mano di cui sotto: il blocco `s02` e' finito piu' corto di quanto
la stima assumesse.

---

## Il difetto: la soglia di pausa si sceglieva male

Alla prima passata la traccia A e' uscita cosi':

```
s02   0.00 ->  19.10   19.10s   ~13.1 car/s
s03  19.10 ->  27.80    8.69s   ~32.0 car/s   <-- FUORI FASCIA
```

Un blocco di diciannove secondi accanto a uno di otto. E' la firma esatta di
un confine spostato, e la coppia lunga/corta lo grida.

La causa era nella scelta della soglia di pausa. `tagli.py` provava
`0.18, 0.15, 0.22, 0.12` e si fermava **al primo tentativo che aveva
abbastanza spezzoni**:

```python
for dmin in (0.18, 0.15, 0.22, 0.12):
    D, segs, P = segmenti(traccia, dmin)
    if len(segs) >= len(pezzi)*0.55: break     # criterio di quantita'
```

Con 0,18 s c'erano abbastanza spezzoni, quindi si fermava li'. Ma la pausa
vera fra `s02` e `s03` durava **esattamente 0,18 s** (da 11,44 a 11,62) e
cadeva appena sotto la soglia. Non trovandola, il DTW e' stato costretto sulla
pausa successiva disponibile, a 19,10.

**Il criterio guardava la quantita' invece dell'esito.** Ora si provano tutte
le soglie e si tiene quella che lascia **meno blocchi fuori fascia**, a parita'
la meno sparpagliata:

```
[123 pezzi · 107 spezzoni · pausa minima 0.15 s · 1 fuori fascia]
s02   0.00 ->  11.53   11.53s   ~21.8 car/s
```

Da 13,1 contro 32,0 a un solo blocco marginalmente veloce. Ed e' una
correzione strutturale: la soglia giusta cambia da traccia a traccia, e infatti
in questa lezione la A ha scelto 0,15 e la B 0,18.

### Un bug nella correzione stessa

Scrivendo il nuovo criterio ho introdotto un errore che si e' visto subito
sulla lezione dopo: una soglia sbagliata puo' mettere due confini sulla stessa
pausa, e allora un blocco ha durata zero. La funzione che dava il voto ci
divideva dentro e crashava. Ora un blocco sotto i 0,30 s vale il voto peggiore
possibile: e' il caso peggiore, e come tale va pesato, non fatto esplodere.

Le lezioni gia' fatte le ho ricontrollate con il codice nuovo: **1.5 stessa
non cambia di un centesimo** rispetto ai tagli gia' caricati.

---

## La verifica per trascrizione

```
traccia A   695/695 parole coincidenti (100,0%)   buchi: 0
traccia B   660/660 parole coincidenti (100,0%)   buchi: 0
```

Cento per cento su tutte e due. Ho aggiunto a `RESE` le sigle DAT ed ECM, che
il trascrittore a volte compita lettera per lettera.

`verifica-locale.py`, dopo la correzione dei confini: scarto tipico 0,63 s su
A e 0,64 su B, e **nessuna coppia adiacente di segno opposto** su nessuna delle
due tracce.

---

## Il copione

48 blocchi da 183 caratteri di media, dai 20 blocchi dello script. Vincoli del
MASTER rispettati; ho dovuto accorciare sei blocchi che sforavano i 225
caratteri, e sono accorciamenti di sintassi, non di contenuto: tutti e venti i
blocchi dello script sono coperti.

Le tre pose:

| dove | quanto | perche' |
|---|---|---|
| `s09` | 1,2 s | «autonomi e cumulabili», la frase da ripetere all'orale |
| `s32` | 1,2 s | «dieci e cinque», i due numeri accoppiati ai due soggetti |
| `s44` | 1,4 s | «cio' che non e' documentato si presume non fatto» |

Le due frasi che lo script indicava come enfasi marcata hanno una slide tutta
loro a fondo verde pieno.

---

## Le grafiche

50 PNG, guardati tutti in provini da nove. Nessuno sfora la cornice.

Una correzione al layout condiviso: l'elenco si stringeva da solo **da sette
voci in su**, ma i cinque piani della responsabilita', ognuno con la sua riga
di spiegazione, sforavano di 28 px pur essendo cinque. La soglia ora e'
doppia: sette voci nude, oppure **cinque se almeno una porta la spiegazione**,
perche' una voce con la sua riga sotto occupa il doppio.

---

## Riprese e immagini generate

Nessuna. Lezione a sole slide.

---

## Montaggio

98 asset in un lotto solo, scene video con `audio_asset_id` e
`playback: {freeze, mute}`, copertina e chiusura come immagini a durata
esplicita.

```
video HeyGen   d251612096381487115b356c3afc106c
               app.heygen.com/videos/d251612096381487115b356c3afc106c
durata         8:44.00 (524,00 s)
copia locale   montato-1.5.mp4 · 8:45.3 · 1920x1080 · 25 fps
sottotitoli    montato-1.5.srt · 48 righe
```

---

## Da verificare — quello che non ho potuto giudicare io

1. **Il confine corretto fra `s02` e `s03`.** E' quello che il difetto aveva
   sbagliato, e la correzione l'ho verificata sui numeri, non a orecchio.
   Ascolta i primi venti secondi: la frase «...torna nei casi della prova
   pratica» deve chiudersi prima di «Ed e' la domanda con cui all'orale».
2. **Come suona la voce**, e in particolare le tre pose.
3. **La durata**: 8:44 contro i 10 minuti che stimavi. Il tetto di 48 blocchi
   e i 225 caratteri per blocco danno al massimo circa 10:48, quindi i 10
   minuti sono raggiungibili — ma solo allungando il testo, e ho preferito non
   riempire. Se li vuoi, dimmelo.
4. **Gli esempi delle tre forme di colpa** nelle slide vengono dal tuo script;
   non ne ho aggiunti di miei.


---

# Secondo giro — l'apparato grafico

Rifatte tutte le slide. **L'audio non e' stato toccato**: stesse tracce, stessi
tagli, stessi 48 blocchi, stessa durata. Sono cambiate solo le
immagini, e con loro le clip, le scene e il montato.

```
scene con una figura   19 su 50
figure usate           icone ×7 · tabella ×5 · griglia ×4 · barre ×2 · matrice ×1
durata                 8:45.32   (invariata: l'audio e' lo stesso)
```

## Il video nuovo

```
video HeyGen   6612c5ceceb6644434714271ee6e2965
               app.heygen.com/videos/6612c5ceceb6644434714271ee6e2965
copia locale   montato-1.5.mp4 · 8:45.32 · 1920x1080 · 25 fps
sottotitoli    montato-1.5.srt · 48 righe
```

Il video del primo giro resta dov'era: questo e' un video nuovo, non una
sostituzione. Se il taglio grafico ti convince, il vecchio si puo' cancellare.

## Da verificare — il secondo giro

1. **Le figure**, una per una: i provini stanno in `slide/provino-*.png`.
2. **Il colore non porta mai da solo un significato** nei grafici: il verde e
   il rosso del marchio, accostati, hanno ΔE 3,4 in protanopia. Dove c'e' un
   giusto e uno sbagliato, c'e' anche il segno (✓ ×) e l'etichetta.
3. **I dati non vanno sul verde pieno**: li' il contrasto delle tinte dei dati
   non arriva a 3:1. Sul verde sono rimaste solo le slide di affermazione.
