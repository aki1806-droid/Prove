# Registro — Modulo 1 · micro-lezione 1.3 «Formazione, Ordine, ECM e carriera»

Terza lezione del corso. La prima in cui **la verifica per trascrizione e'
stata eseguita davvero**: in 1.2 era rimasta aperta perche' le due funzioni di
caricamento su ElevenLabs erano bloccate da una regola di permessi. Il blocco
c'e' ancora, ma la strada era un'altra e non l'avevo vista.

---

## Scheda parametri

| | |
|---|---|
| durata chiesta | 8 minuti almeno |
| durata ottenuta | **8:57.4** |
| slide dello script | 18 |
| scene | 50 (il tetto) |
| blocchi di parlato | 48 |
| voce | GianP — News Info and Documentary, `eleven_v3` |
| costo voce | $1,47 (0,77 + 0,70) |
| costo trascrizioni | $0,58 (0,30 + 0,28) |
| pause senza voce | nessuna; tre pose brevi dentro il parlato |

---

## Valori derivati

```
CARATTERI  8.839          BLOCCHI  48         SCENE  50/50
stima a 17,0 car/s        8:56.7
reale                     8:57.4      (parlato 524,0 s)
```

La stima ha sbagliato di **0,7 secondi su nove minuti**. Il 17,0 car/s misurato
su 1.2 e' il valore giusto per questa voce anche con molti numeri: la lezione
e' densa di sigle e date quanto la precedente.

Le tracce grezze: A 332,4 s per 4.677 caratteri, B 304,6 s per 4.254. Fa
**14,1 car/s sul grezzo**, che diventano 17,0 dopo il filtro del ritmo
(silenzi accorciati + `atempo` 1,12). Vale la pena scriverlo perche' guardando
il grezzo si ha l'impressione di essere lunghissimi, e non e' vero.

---

## La verifica per trascrizione, finalmente

In 1.2 mi ero fermato davanti a un muro: `creative_create_asset_upload` e
`creative_finalize_asset_upload` bloccate, quindi `prova.mp3` non caricabile,
quindi niente trascrizione. Avevo scritto che serviva riabilitare le funzioni.

Non serviva. **`creative_attach_reference_file` prende un URL https e fa da
sola tutte e tre le cose** (carica, registra, mette il nodo sul flow), e le
tracce appena generate hanno gia' un URL firmato pubblico che dura due ore.
Bastava passare quello. Le due funzioni bloccate restano bloccate, e non
servono.

Cambia anche cosa si verifica, e in meglio in una direzione e in peggio
nell'altra:

| | `prova.mp3` (metodo del MASTER) | traccia intera (questa volta) |
|---|---|---|
| buchi nel parlato | solo intorno ai tagli | **su tutto il testo** |
| posizione dei tagli | sì, e' il suo scopo | no: la trascrizione non porta i tempi |
| costo | ~$0,17 | $0,58 |

Il nuovo strumento e' `audio/verifica-testo.py`: confronta parola per parola la
trascrizione col copione e segnala le sequenze mancanti da tre parole in su —
la firma dell'errore che in 1.1 mangio' sei parole in `s13` e costo' una
rigenerazione intera.

```
traccia A   741/742 parole coincidenti (99,9%)   buchi: 0
traccia B   655/657 parole coincidenti (99,7%)   buchi: 0
```

**La voce ha detto tutto.** Le poche parole non coincidenti sono rese diverse
della stessa cosa, non errori, e per due di esse ho dovuto normalizzare:
la sigla sillabata («elle esse enne ti uno») torna incollata dalla
trascrizione («LSNT1»), e «uno punto cinque» torna «1.5». Sono nella tabella
`RESE` dello script, dichiarate una per una: non e' una tolleranza generica.

### L'unico dubbio, e perche' l'ho sciolto

In `s47` la trascrizione scrive **«OP e FNOP»** invece di «OPI e FNOPI». In
1.1 avevo liquidato un segnale simile e mi ero sbagliato, quindi non l'ho
liquidato.

Tre cose dicono che e' la trascrizione, non la voce:

1. nella **traccia A** gli stessi acronimi sono trascritti giusti, «gli OPI,
   provinciali» e «federati nella FNOPI». Stessa voce, stesso modello, stessa
   sessione: sa dirli;
2. in `s47` seguono la congiunzione «e», e la elisione «OPI e» -> /ˈɔpi e/
   spiega esattamente la I che sparisce nella resa scritta;
3. il blocco `s47` dura 13,2 s contro gli 11,6 previsti: e' **piu' lento**
   della media della traccia. Se la voce avesse mangiato due sillabe sarebbe
   piu' veloce, non piu' lento.

Resta comunque nella lista da ascoltare qui sotto, perche' e' un ragionamento,
non un orecchio.

---

## I tagli

L'allineamento DTW sul grezzo, alla prima passata: **nessun blocco degenere,
un solo blocco fuori fascia** (`s44` a 21,3 car/s sul grezzo, che rientra dopo
il ritmo). In 1.1 la prima passata ne sbagliava 17 su 48.

`verifica-locale.py` — il controllo statistico offline, che resta l'unico modo
che ho di guardare *dove* cadono i tagli — dice:

```
traccia A   scarto tipico 0,55 s      nessuna coppia adiacente di segno opposto
traccia B   scarto tipico 0,91 s      nessuna coppia adiacente di segno opposto
```

Nessuna coppia adiacente di segno opposto su nessuna delle due tracce: e'
quella la firma di un confine spostato (un blocco corto accanto a uno lungo),
e non c'e'.

### Una correzione allo strumento

Alla prima esecuzione lo strumento segnalava la coppia `s09`/`s10`, «taglio
spostato di ~1,0 s». Prima di andare a cercare l'errore ho guardato se lo
scarto avesse una struttura, e ce l'aveva:

```
blocchi con 6+ cifre (7):  scarto medio  -0,81 s
blocchi senza cifre (37):  scarto medio  +0,09 s
```

I blocchi pieni di numeri uscivano **sistematicamente corti** rispetto alla
previsione: il peso di 5,0 caratteri extra per cifra, che in 1.2 avevo messo a
occhio, e' troppo alto per questa voce. Adattandolo sui 48 blocchi misurati il
minimo cade a 3,9, e ho messo **4,0**. La coppia `s09`/`s10` sparisce, ed e'
la prova che era il peso e non il taglio.

Onesta' d'obbligo su due punti: il guadagno complessivo e' piccolo (scarto
tipico da 0,868 a 0,847 s), quindi il peso delle cifre spiega gli estremi ma
non tutto lo scarto; e ho tarato la costante sugli stessi dati che poi
controllo, il che rende il controllo un po' compiacente. Vale come correzione
di uno strumento tarato male, non come assoluzione di questa lezione.

Il residuo piu' grande rimasto e' `s27`, **-1,98 s**: e' il primo blocco della
traccia B, e anche `s28` e' negativo (-1,00). Due negativi di fila non sono un
taglio spostato, sono la voce che parte svelta all'inizio di una generazione
nuova.

---

## Il copione

Riscritto dai 18 blocchi dello script in 48 blocchi da 184 caratteri di media.
Vincoli del MASTER tutti rispettati alla prima: nessuna vocale accentata,
nessun blocco oltre 225 caratteri, 3 tag di intenzione su 6 disponibili.

Per arrivare a 48 ho tolto tre blocchi che ripetevano:

- il secondo blocco sul tirocinio diceva due volte la stessa proporzione;
- nel capitolo del distrattore, il secondo blocco ripeteva la tesi del primo;
- nel capitolo ECM, un blocco ripeteva la regola dell'obbligo individuale
  appena enunciata. La clausola utile («non basta dire che il corso non me
  l'hanno offerto») e' passata dentro il blocco che resta.

Aggiunte mie, che non erano nello script e vanno ricontrollate nel merito:

- «un terzo del corso si fa in reparto» (`s08`), come lettura dei 60 CFU su 180;
- «il triennio e' l'unita' di misura vera, l'anno serve solo a distribuire lo
  sforzo» (`s32`);
- «cambia l'azienda, cambia la mappa degli incarichi» (`s45`).

---

## Le grafiche

50 PNG, tutti guardati da fermi in provini da nove. Nessuno sfora la cornice.

| tipo di slide | quante |
|---|---|
| frase | 13 |
| elenco | 12 |
| confronto | 7 |
| norma | 5 |
| tre riquadri | 4 |
| trappola | 2 |
| copertina, citazione, sostituzione, titolo | 7 |

**Due difetti trovati guardando i PNG, tutti e due nel `layout.mjs` condiviso:**

- nelle slide «trappola» la riga della correzione e' un flex con `gap:20px`,
  pensato per staccare la freccia dal testo. Ma ogni parola accentata e' un
  altro figlio del flex, quindi si prendeva 20 px per lato: «del datore di
  lavoro , non dell'Ordine», con lo spazio prima della virgola. Ora il testo
  sta in un solo figlio;
- il blocco «tre riquadri» sceglieva la griglia a 4 o 5 colonne solo sopra i
  tre riquadri. Con **due** riquadri restava a tre colonne e lasciava un terzo
  di slide vuoto a destra. Aggiunta la griglia a due.

Tutti e due sono difetti vecchi, che 1.1 e 1.2 non avevano mostrato solo
perche' non usavano quelle combinazioni. Le correzioni sono nel `layout.mjs` di
questa lezione e vanno portate indietro sulle altre due.

---

## Riprese e immagini generate

Nessuna. Lezione a sole slide.

---

## Montaggio

98 asset in un lotto solo, come in 1.2. Scene video con `audio_asset_id` e
`playback: {freeze, mute}`, copertina e chiusura come immagini con durata
esplicita di 3 e 10 secondi.

```
video HeyGen   abe7a9379dabba4851d43b7d98e2df21
               app.heygen.com/videos/abe7a9379dabba4851d43b7d98e2df21
copia locale   montato-1.3.mp4 · 8:57.4 · 1920x1080 · 25 fps · 19 MB
sottotitoli    montato-1.3.srt · 48 righe, dal copione e dalle durate reali
scarto A/V     20 ms al massimo, su s49
```

---

## Da verificare — quello che non ho potuto giudicare io

1. **Come suona la voce.** Non l'ho ascoltata. In particolare le tre pose:
   1,2 s dopo le sanzioni (`s23`), 1,2 s dopo il trucco esonero/esenzione
   (`s36`), 1,4 s dopo «il titolo abilita, l'azienda attribuisce» (`s43`).
2. **«OPI e FNOPI» in `s47`**, per il motivo scritto sopra: ho una spiegazione
   solida ma non l'ho sentita.
3. **Le sigle sillabate.** Ho scritto «classe elle esse enne ti uno» perche' la
   voce non sa leggere «L/SNT-1». Funziona — la trascrizione conferma che dice
   le lettere — ma va sentito se il ritmo regge o se suona compitato.
4. **Le tre aggiunte mie** elencate sopra, che non vengono dal tuo script.
5. **Le due slide «trappola» con una riga sola** (`s14`, `s24`): lasciano molto
   bianco intorno. A me sembra una pausa voluta, ma e' una scelta di gusto e
   se non ti piace si riempiono.

---

## Nota sulle due lezioni precedenti

Le correzioni al `layout.mjs` sono state riportate su 1.1 e 1.2, ma i loro
video **erano gia' pubblicati prima**: quelle due lezioni, cosi' come si
vedono su HeyGen, hanno ancora lo spazio in piu' attorno alle parole
accentate nelle slide «trappola». E' un difetto cosmetico minimo e non vale
un render nuovo, ma va saputo se un giorno si ricompongono.

Per 1.2 resta invece aperta una cosa vera: **la sua verifica per trascrizione
non e' mai stata fatta**, e adesso si potrebbe fare, perche' la strada esiste.
Le tracce grezze di 1.2 non hanno piu' l'URL firmato — scaduto — ma si possono
ricaricare, oppure si accetta che 1.2 resti l'unica lezione consegnata senza
quel controllo.


---

# Secondo giro — l'apparato grafico

Rifatte tutte le slide. **L'audio non e' stato toccato**: stesse tracce, stessi
tagli, stessi 48 blocchi, stessa durata. Sono cambiate solo le
immagini, e con loro le clip, le scene e il montato.

```
scene con una figura   19 su 50
figure usate           griglia ×6 · scala ×5 · tabella ×4 · impila ×2 · icone ×1 · tre ×1
durata                 8:57.36   (invariata: l'audio e' lo stesso)
```

## Il video nuovo

```
video HeyGen   2e341c71405f8d8272be0640171b2b2c
               app.heygen.com/videos/2e341c71405f8d8272be0640171b2b2c
copia locale   montato-1.3.mp4 · 8:57.36 · 1920x1080 · 25 fps
sottotitoli    montato-1.3.srt · 48 righe
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
