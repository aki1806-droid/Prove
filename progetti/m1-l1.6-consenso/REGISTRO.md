# Registro — Modulo 1 · micro-lezione 1.6 «Consenso informato, DAT e autodeterminazione»

Sesta lezione. Lavorazione senza incidenti: e' la prima delle otto in cui non
ho dovuto correggere nulla del metodo.

---

## Scheda parametri

| | |
|---|---|
| durata chiesta dallo script | 10 minuti |
| durata ottenuta | **8:25.1** |
| slide dello script | 20 |
| scene | 50 (il tetto) |
| blocchi di parlato | 48 |
| voce | GianP — News Info and Documentary, `eleven_v3` |
| costo voce | $1,44 |
| costo trascrizioni | $0,54 |
| pause senza voce | nessuna; tre pose brevi dentro il parlato |

```
CARATTERI  8.635          BLOCCHI  48         SCENE  50/50
stima a 17,0 car/s        8:44.7
reale                     8:25.1      (parlato 491,6 s)
```

Diciannove secondi di scarto, il piu' alto delle sei lezioni: qui la voce e'
andata piu' svelta della media (18,3 peso/s sulla traccia A contro i 17,2 di
1.5). E' variabilita' della sintesi, non un errore di taglio — i confini sono
puliti, come dice il controllo qui sotto.

---

## Verifica per trascrizione

```
traccia A   666/670 parole coincidenti (99,4%)   buchi: 0
traccia B   668/670 parole coincidenti (99,7%)   buchi: 0
```

Zero buchi. Le poche differenze sono rese: «venti» che torna «20», «undici»
che torna «11», e «deve» che torna «dev'» per elisione.

---

## I tagli

Prima passata, nessuna correzione:

```
traccia A   scarto tipico 0,52 s      nessuna coppia adiacente di segno opposto
traccia B   scarto tipico 0,56 s      nessuna coppia adiacente di segno opposto
```

Sono gli scarti piu' stretti finora. Il criterio nuovo per la soglia di pausa,
introdotto in 1.5, qui ha scelto **0,12 s per la traccia A e 0,15 per la B**:
due valori diversi sulla stessa lezione, che e' esattamente il motivo per cui
provarle tutte e scegliere sull'esito era la cosa giusta da fare.

### E un bug scoperto qui, nel codice scritto per 1.5

Il criterio nuovo prova soglie basse, e una soglia bassa puo' mettere due
confini sulla stessa pausa: allora un blocco ha durata zero e la funzione che
dava il voto ci divideva dentro. Crash. Ora un blocco sotto i 0,30 s prende il
voto peggiore possibile, che e' quello che merita. Corretto e riportato su
tutte le lezioni.

---

## Il copione

48 blocchi da 180 caratteri di media, dai 20 dello script. Nessuna vocale
accentata, nessun blocco oltre i 225 caratteri, 3 tag su 6.

Le tre pose: 1,2 s dopo «l'infermiere e' parte della relazione di cura»
(`s17`), 1,4 s dopo «rifiutare si', pretendere no» (`s26`), 1,2 s dopo
l'amministrazione di sostegno (`s32`).

Per stare nei 48 blocchi ho tolto tre passaggi che ripetevano: il terzo blocco
dell'apertura, il richiamo al «modulo da far firmare» (che torna comunque
nella slide sulla forma) e la ripetizione dell'asimmetria dopo la frase che
gia' la enuncia.

---

## Le grafiche

50 PNG, guardati in provini da nove. Nessuno sfora.

---

## Riprese e immagini generate

Nessuna.

---

## Montaggio

```
video HeyGen   046a75ffe6ccad917973c3d24c16110b
               app.heygen.com/videos/046a75ffe6ccad917973c3d24c16110b
copia locale   montato-1.6.mp4 · 8:25.1 · 1920x1080 · 25 fps
sottotitoli    montato-1.6.srt · 48 righe
```

---

## Da verificare — quello che non ho potuto giudicare io

1. **Come suona la voce**, e le tre pose.
2. **La durata**: 8:25 contro i 10 minuti stimati. E' la piu' corta delle sei,
   perche' la voce e' andata svelta. Se vuoi avvicinarti ai 10 minuti servono
   circa 1.400 caratteri in piu', cioe' allungare i blocchi verso il tetto dei
   225: si puo' fare, ma allunga il testo, non aggiunge contenuto.
3. **«Lettera acca»**: ho scritto cosi' l'articolo 9.2 lettera h) perche' la
   voce non legge la parentesi. Va sentito se suona bene o se e' meglio
   «lettera h».
4. **Il contenuto normativo** viene dal tuo script; non ho aggiunto nulla di
   mio nel merito.
