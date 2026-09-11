# Registro — Modulo 1 · micro-lezione 1.7 «Segreto, privacy e tutela della persona»

Settima lezione. Due difetti veri, tutti e due trovati leggendo e non a
orecchio: un contenuto perso in una ri-spezzettatura automatica e un confine
messo sulla pausa sbagliata. Piu' un caricamento rifiutato per un motivo che
non c'entrava niente con il file.

---

## Scheda parametri

| | |
|---|---|
| durata chiesta dallo script | 9 minuti e 30 |
| durata ottenuta | **9:02.3** |
| slide dello script | 19 |
| scene | 50 (il tetto) |
| blocchi di parlato | 48 |
| voce | GianP — News Info and Documentary, `eleven_v3` |
| costo voce | ~$1,46 + **$0,75 buttati** (vedi sotto) |
| costo trascrizioni | $0,60 ($0,31 traccia A + $0,30 traccia B) |
| pause senza voce | nessuna; quattro pose brevi dentro il parlato |

```
CARATTERI  8.773          BLOCCHI  48         SCENE  50/50
stima a 17,0 car/s        8:54.1
reale                     9:02.3      (parlato 528,9 s)
```

Otto secondi piu' lunga della stima: la voce e' andata leggermente piu' piano
della media. E' la lezione piu' lunga delle sette.

---

## Verifica per trascrizione

```
traccia A   684/687 parole coincidenti (99,6%)   buchi: 0
traccia B   660/663 parole coincidenti (99,5%)   buchi: 0
```

Zero buchi: la voce ha detto tutto. Le quattro differenze rimaste sono rumore
del trascrittore o elisione — «e d'ufficio» che torna «ed ufficio», «mal
eseguita» che torna «male eseguita», «l'infermiere» che torna «gli
infermiere», «sequestro» che torna «secuestro».

Due rese ricorrenti sono state **dichiarate** in `audio/verifica-testo.py`,
non tollerate genericamente: «lettera acca» ↔ «lettera h» (l'articolo 9.2 del
GDPR) e «dodici» ↔ «12». Erano segnalate anche in 1.6; ora non tornano piu'.

---

## Il caricamento della traccia B, e perche' veniva rifiutato

Le funzioni di caricamento del fornitore di voce restano bloccate da una
regola di permessi, quindi la trascrizione passa da un URL pubblico. Per la
traccia A l'URL firmato della generazione era ancora valido; per la B era
scaduto, e ho provato a ricaricare l'mp3 su HeyGen per ottenerne uno nuovo.

Rifiutato tre volte con `Stored file type not supported:
application/octet-stream`, mentre lo stesso identico giro con un mp3 di blocco
funzionava. Non era il trasporto: era il **tag ID3 da 17 KB** che il
generatore di voce scrive in testa alla traccia. Chi riceve il file lo annusa
dai primi byte e non trova l'audio.

```
ffmpeg -i grezzo-B.mp3 -map_metadata -1 -c:a copy pulito.mp3
```

Nessuna ricodifica, stessi campioni, 17 KB in meno — e il caricamento passa.

---

## I tagli

La prima passata ha lasciato `s38` a 37,2 car/s: un confine caduto una pausa
troppo avanti. Corretto con `correzioni.json`. Ma la correzione ne ha scoperta
una seconda, che la prima passata nascondeva:

```
prima:   fra s35 e s36: -1,20s / +2,41s — il taglio sembra spostato di ~1,2s
```

`s35` e `s36` sono i due blocchi piu' densi di numeri della lezione (593, 591,
572, 328, 609 bis). La tentazione era archiviare come pregiudizio del modello
sulle cifre — lo stesso che in 1.3 aveva dato un falso allarme. Ma il conto
sull'audio grezzo diceva altro: fra 124,57 e 130,02 ci sono 5,4 secondi di
parlato per «591, abbandono di incapaci: riguarda chi ha custodia o cura», e
col confine a 127,59 quella frase sarebbe stata detta a 20,5 car/s di grezzo,
cioe' molto sopra il ritmo di questa voce. **Il confine era davvero sulla
pausa sbagliata**: quella giusta e' la pausa da 0,73 s a 130,0.

Esito dopo le due correzioni:

```
traccia A   scarto tipico 0,62 s      nessuna coppia adiacente di segno opposto
traccia B   scarto tipico 0,54 s      nessuna coppia adiacente di segno opposto
0 blocchi fuori dalla fascia 8,5-21 car/s
```

**Nota di metodo, e vale piu' della correzione.** `correzioni.json` non e' un
registro: `tagli.py correggi` modifica lo stato sul posto, quindi rilanciarlo
con la stessa correzione dentro la sposta una seconda volta. Il giro giusto
quando serve una seconda correzione e' rifare `allinea` da zero e applicare
tutte le correzioni insieme — che e' anche l'unico modo di avere un file che
descrive davvero come si arriva dal grezzo ai blocchi.

---

## Il copione

48 blocchi da 183 caratteri di media, dalle 19 slide dello script. Nessuna
vocale accentata, nessun blocco oltre i 225 caratteri, 4 tag su 6.

Le quattro pose: 1,2 s dopo il segreto d'ufficio procedibile d'ufficio
(`s07`), 1,4 s dopo «e' un trattamento illecito» (`s20`), 1,2 s su due dei tre
blocchi degli otto elementi della contenzione.

### Il contenuto perso, e come l'ho ripreso

Rifacendo la spezzettatura dei blocchi in automatico dopo una revisione, due
passaggi sono spariti in silenzio: la **definizione di referto** (articolo 365
c.p., «esercente una professione sanitaria che presta assistenza in casi che
possono presentare i caratteri di un delitto perseguibile d'ufficio») e la
frase sul **fascicolo sanitario elettronico regionale** del Veneto. Nessun
controllo li avrebbe presi: il conto dei caratteri tornava, i vincoli pure.
Li ho trovati **rileggendo `chunkB.txt`** riga per riga contro lo script, e
rimessi a mano.

Da qui in avanti: dopo ogni ri-spezzettatura automatica, il testo generato si
rilegge contro l'originale. Il controllo automatico verifica la forma, non
sa che cosa doveva esserci.

---

## Le grafiche

50 PNG, guardati in provini da nove. Nessuno sfora la cornice.

---

## Riprese e immagini generate

Nessuna.

---

## Montaggio

```
video HeyGen   fdcac7c2037443e265055d1fc93d6cc2
               app.heygen.com/videos/fdcac7c2037443e265055d1fc93d6cc2
               durata resa 9:00.96
copia locale   montato-1.7.mp4 · 9:02.3 · 1920x1080 · 25 fps
sottotitoli    montato-1.7.srt · 48 righe
```

---

## Da verificare — quello che non ho potuto giudicare io

1. **Come suona la voce**, e le quattro pose.
2. **I due passaggi rimessi a mano** — referto (art. 365 c.p.) e fascicolo
   sanitario elettronico regionale: vanno riletti, perche' sono gli unici due
   punti della lezione che hanno fatto un giro in piu'.
3. **$0,75 buttati.** Avevo generato la traccia A prima di chiudere la
   revisione dei blocchi; la revisione l'ha invalidata e ho dovuto
   rigenerarla. La voce si genera **dopo** che il copione e' fermo, mai prima.
4. **Il contenuto normativo** viene dal tuo script; non ho aggiunto nulla di
   mio nel merito.


---

# Secondo giro — l'apparato grafico

Rifatte tutte le slide. **L'audio non e' stato toccato**: stesse tracce, stessi
tagli, stessi 48 blocchi, stessa durata. Sono cambiate solo le
immagini, e con loro le clip, le scene e il montato.

```
scene con una figura   26 su 50
figure usate           griglia ×10 · tabella ×8 · icone ×3 · catena ×3 · venn ×1 · scadenza ×1
durata                 9:02.32   (invariata: l'audio e' lo stesso)
```

## Il video nuovo

```
video HeyGen   318873116f29dbaad79f0c170cb58fb5
               app.heygen.com/videos/318873116f29dbaad79f0c170cb58fb5
copia locale   montato-1.7.mp4 · 9:02.32 · 1920x1080 · 25 fps
sottotitoli    montato-1.7.srt · 48 righe
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
