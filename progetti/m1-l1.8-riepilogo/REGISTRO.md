# Registro — Modulo 1 · micro-lezione 1.8 «Riepilogo del Modulo 1 e autovalutazione»

Ottava e ultima lezione del modulo. Un difetto trovato e corretto, e una
verifica che sembrava passata e non lo era: la trascrizione mi restituiva il
testo che le avevo dato in pasto, non quello che la voce aveva detto.

---

## Scheda parametri

| | |
|---|---|
| durata chiesta dallo script | 8 minuti e 30 |
| durata ottenuta | **9:11.4** |
| slide dello script | 17 |
| scene | 50 (il tetto) |
| blocchi di parlato | 48 |
| voce | GianP — News Info and Documentary, `eleven_v3` |
| costo voce | $1,42 |
| costo trascrizioni | $0,63 (piu' $0 per due trascrizioni nulle, vedi sotto) |
| pause senza voce | nessuna; cinque pose brevi dentro il parlato |

```
CARATTERI  8.519          BLOCCHI  48         SCENE  50/50
stima a 17,0 car/s        8:40.1
reale                     9:11.4      (parlato 538,0 s)
```

Trentun secondi piu' lunga della stima, lo scarto piu' alto delle otto
lezioni, e il motivo e' il contenuto: questa e' una lezione di ripasso fatta
di **date e numeri di legge**, e un numero pronunciato per esteso dura molto
piu' dei caratteri che occupa. «1974» sono quattro caratteri e
«millenovecentosettantaquattro» ventinove.

---

## La verifica che non verificava

La prima trascrizione l'ho chiesta collegandola direttamente al nodo che
aveva **generato** la voce, invece che a un asset audio. Il testo tornato era
identico al copione: apostrofi compresi (`piu'`, `attivita'`) e con dentro il
tag `[warm]`.

**Nessuna voce puo' pronunciare un apostrofo di comodo o un tag fra
parentesi quadre.** Il servizio mi aveva restituito l'ingresso del nodo, non
una trascrizione dell'audio — e se non me ne fossi accorto avrei consegnato
la lezione con una verifica che dava 100% per costruzione.

Rifatta come si deve, registrando prima le due tracce come asset audio:

```
traccia A   743/745 parole coincidenti (99,7%)   buchi: 0
traccia B   618/619 parole coincidenti (99,8%)   buchi: 0
```

Le tre differenze rimaste sono rese del trascrittore, non buchi:
«extracontrattuale» scritto staccato, «DAT» reso «DIA-T», «OSS» reso «OS».

---

## I numeri scritti a parole

La prima passata segnalava sedici scarti brevi, dodici dei quali erano lo
stesso fenomeno: il copione scrive «739» e il trascrittore, che sente la voce
pronunciarlo per esteso, scrive «settecentotrentanove». E non lo fa nemmeno in
modo costante — **sulla stessa lezione** la traccia A ha reso «739» a parole e
la B in cifre.

Non era il caso di allargare la tolleranza. Ho aggiunto a `verifica-testo.py`
una **regola dichiarata**: un convertitore dei numeri cardinali italiani in
cifre, applicato ai due testi prima del confronto. Gestisce le forme incollate
e le elisioni (`trentotto` → 38, `duecentocinquantuno` → 251,
`millenovecentonovantaquattro` → 1994) e restituisce la parola invariata quando
non e' un numero, cosi' «documento» e «accento» non diventano cifre.

Gli scarti sono passati da 16 a 2 sulla traccia A, e valgono da qui in avanti
per tutte le lezioni: in un corso di diritto sanitario i numeri di legge
tornano in ogni video.

---

## I tagli

Una correzione, fra `s45` e `s46`:

```
prima:   fra s45 e s46: -2,29s / +2,11s — il taglio sembra spostato di ~2,3s
```

Il conto sull'audio grezzo: con il confine dove l'aveva messo l'allineamento
(216,82 s) il segmento 217,16–219,30 sarebbe stato l'inizio di `s46`, cioe'
«L'infermiere e' responsabile dell'assistenza generale infermieristica» in
2,14 secondi — 33 caratteri al secondo, impossibile. Con il confine sulla
pausa successiva (219,64 s) quello stesso segmento diventa la chiusa di `s45`,
«Le fonti del campo di attivita' sono tre», a 18,7 car/s: il ritmo di questa
traccia. Spostato.

```
traccia A   scarto tipico 1,21 s      nessuna coppia adiacente di segno opposto
traccia B   scarto tipico 0,57 s      nessuna coppia adiacente di segno opposto
0 blocchi fuori dalla fascia 8,5-21 car/s
```

**Lo scarto tipico della traccia A, 1,21 s, e' il doppio del solito** — ed e'
un dato da leggere, non da archiviare. Il modello di `verifica-locale.py` pesa
ogni cifra 4,0 caratteri, ma una cifra dentro un anno ne vale sette o otto:
su una traccia fatta di date la previsione sbanda, la dispersione cresce, e
**la soglia di allarme, che e' 1,5 volte la dispersione, si alza con lei**.
Su questa traccia il controllo e' diventato quasi cieco. Non l'ho ritarato
qui — ritarare un modello sulla lezione che lo mette in crisi e' il modo di
farlo sbagliare sulle altre — ma il limite va scritto: il controllo statistico
serve meno del solito quando il testo e' pieno di numeri, e li' conta di piu'
l'aritmetica sul grezzo.

---

## Il copione

48 blocchi da 177 caratteri di media, dalle 17 slide dello script. Nessuna
vocale accentata, nessun blocco oltre i 225 caratteri, 3 tag su 6.

Le cinque pose: 1,2 s dopo «all'autonomia corrisponde la responsabilita'»
(`s06`), 1,2 s su due dei tre blocchi dei dieci numeri, 1,2 s su due dei tre
blocchi delle quattro formule — come chiedevano le note di produzione.

Lo script e' piu' corto degli altri (circa 1.180 parole). Per arrivare agli
8.500 caratteri ho allungato nove blocchi con contenuto del modulo, non con
riempitivo: la FNOPI nel 2018, la riduzione proporzionale dei crediti in
esonero ed esenzione, il principio di affidamento che vale per ogni ruolo
dell'equipe, la fonte delle quattro formule.

---

## Le grafiche

50 PNG, guardati in provini da nove. Nessuno sfora la cornice. Due cose
corrette dopo averle **viste**, non dopo averle contate:

- la linea del tempo del 1999 mescolava numeri di legge e anni sulla stessa
  riga («L. 42», «229», «2000»): ora sono tre anni con la fonte sotto;
- gli agganci veneti erano numerati 1, 2-3, 3-4: il secondo aggancio e' uno
  solo e contiene due nomi, non due agganci.

---

## Riprese e immagini generate

Nessuna.

---

## Montaggio

```
video HeyGen   4ffa4db26160daef5e7ca7e7835f5195
               app.heygen.com/videos/4ffa4db26160daef5e7ca7e7835f5195
copia locale   montato-1.8.mp4 · 9:11.4 · 1920x1080 · 25 fps
sottotitoli    montato-1.8.srt · 48 righe
```

---

## Da verificare — quello che non ho potuto giudicare io

1. **Come suona la voce**, e le cinque pose sui numeri e sulle formule.
2. **La durata**: 9:11 contro gli 8:30 dello script. Non ho tagliato: e' una
   lezione di ripasso e ogni blocco e' un contenuto che serve. Se vuoi
   avvicinarti agli 8:30 la strada e' togliere blocchi, non accorciarli, e
   i primi candidati sono i quattro del memo finale (`s45`-`s48`), che
   ripetono per definizione.
3. **La velocita' del ripasso**: le note di produzione chiedevano un ritmo
   piu' svelto delle lezioni di contenuto. La traccia B lo e' (18,2 peso/s),
   la traccia A no (16,5), perche' e' quella piena di date.
4. **Il contenuto** viene dal tuo script; quello che ho aggiunto per arrivare
   alla lunghezza viene dalle lezioni 1.1-1.7 di questo stesso modulo, non da
   fonti nuove.
