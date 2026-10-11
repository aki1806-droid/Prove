# REGISTRO — 16.2 I quadri principali e i segni da riconoscere

Modulo 16 bonus, lezione 2 di 5. Corso di preparazione al concorso **OSS**
Azienda Zero · CISL FP Padova Rovigo.

## Scheda parametri

| | |
|---|---|
| copione di partenza | `origine/copione-di-partenza.md` — scena 2 del documento bonus |
| durata chiesta | **7:50** montati, come la 16.1 |
| pausa musicale | **no** |
| stile | profilo del MASTER §8, invariato |
| palette | campionata dal logo: verde `#00623A`, rosso `#D70328` |
| | verde pieno `#004E2E` (affermazione), velo rosa `#FCF4F3` (errori) |
| marchio | logo CISL FP Padova Rovigo, in alto a sinistra |
| caratteri | Inter (testo), Source Serif 4 (frasi e citazioni) |
| voce | GianP, `nNt0YcINdGadGcTx5fBM`, `eleven_v3` |
| formato | 1920×1080, 25 fps, 16:9 |

La palette dichiarata nel documento bonus (`#00863E`, `#F39200`) **non e'
quella del marchio**: campionando il logo quei due colori stanno allo 0,1% e
allo 0,0% dei pixel opachi. Sono stimati. Tenuti quelli della 16.1, che sono
misurati sul file.

## L'aritmetica

```
durata chiesta        7:50 montati  =  470 s
copertina e chiusura  3 s + 10 s
pose                  20,3 s   (non sono voce: vanno tolte a parte)
voce netta            436,7 s  disponibili
caratteri attesi      436,7 × 17,52  =  ~7.650

realizzato            46 blocchi · 13 capitoli · 48 scene su 50 · 7.708 car
                      168 car/blocco di media, il piu' lungo 215, tetto 225
                      17 pose per 20,3 s
                      voce netta 439,9 s  ·  parlato 460,2 s
                      montato locale 7:53.60
stacco tracce         s24  ·  chunkA 4.012 car  ·  chunkB 3.696 car
temi                  32 chiaro · 9 profondo · 5 tenue
tag di intenzione     3  (warm, serious, thoughtful)
```

## La velocita' della voce: il numero che ho sbagliato a misurare

**Il primo montato e' uscito 7:42.80, cioe' 7,2 s sotto i 7:50 chiesti**, e il
controllo del §6 lo ha bocciato. La causa non era il copione: era il `CPS`.

Il profilo portava `CPS = 17.0`, media del corso Infermiere. Il reale su
questa voce e su questo testo e' **17,52 car/s**: il 3% piu' veloce, quindi
gli stessi 7.708 caratteri occupano 7 s in meno di quanto previsto.

Ma la prima misura che ho fatto diceva **17,15**, e sbagliava. Avevo diviso i
caratteri per il parlato **totale**, e il parlato totale comprende le pose —
che sono silenzio, non voce. Al netto delle 20,3 s di posa sono 17,52. Due
numeri a un carattere al secondo di distanza, e il piu' basso non e' una
stima prudente: e' una misura di una cosa diversa. Chi lo usa per predire una
durata sbaglia e non sa perche'.

L'aritmetica corretta, ora dichiarata in `profilo.py` e applicata in
`costruisci.py`, tiene le pose fuori dalla moltiplicazione:

```
voce_netta = durata_chiesta − copertina − chiusura − pose
caratteri  = voce_netta × CPS
```

Con `CPS = 17.52` il predittore dice 7:52.2 contro i 7:53.2 realizzati:
sbaglia di un secondo, e **nel verso sicuro** — conta le pose dichiarate e non
l'allungamento automatico dei blocchi corti, quindi chiede qualche carattere
in piu' del necessario e il montato esce sopra il minimo, non sotto.

Questo valore e' misurato su una lezione sola. Vale per questa voce in
italiano; **cambiando voce va rimisurato.**

## Le pose ai cambi di capitolo

Mentre cercavo i 7 s mancanti ho trovato un difetto indipendente: su **12
cambi di capitolo solo 3 portavano una posa**, gli altri 9 passavano di netto.
E tutti e 9 cadono su una frase conclusiva — «Quattro cose che si osservano
facendo il proprio lavoro», «Chi risponde guardando solo i sintomi fisici
sbaglia», «spetta a te far si' che qualcuno lo valuti, e subito». Sono
esattamente i punti dove un battito serve.

Resa uniforme la regola: **ogni cambio di capitolo porta 1,2 s di posa**, come
i tre che la avevano. Le pose a meta' capitolo (s12, s34, s39) restano e sono
un'altra cosa: un battito dopo un'affermazione da lasciar cadere.

Le 13 scene di partenza sono 13 argomenti distinti, e il passaggio da uno
all'altro va sentito. **Non e' imbottitura per arrivare al numero**: se fosse
servito solo allungare, 0,8 s su nove transizioni avrebbero dato esattamente
7:50.0 — ma avrebbero lasciato pose di due misure diverse nella stessa
lezione. Il secondo effetto, i 7 s recuperati, viene dopo la ragione.

Il re-taglio costa **zero**: `tagli.py applica` ritaglia dalle tracce grezze
che sono già in casa. Nessuna voce rigenerata.

## Il copione di partenza non trasferisce cosi' com'e'

Il documento bonus porta **13 scene** a ~570 caratteri l'una: mezzo minuto a
inquadratura, contro il tetto di 225 caratteri per blocco del MASTER §2. La
struttura e l'ordine dei 13 argomenti restano intatti; cambia solo il taglio,
in 46 blocchi.

Il parlato di partenza misurava **6.140 caratteri**, cioe' 6:14 montati: oltre
un minuto e mezzo sotto i 7:50 che lo stesso documento si da'. I ~1.570
caratteri aggiunti sono segnati `AGG` in `costruisci.py` e sono **il come**:
una conseguenza («scambiare un delirium per una demenza vuol dire lasciare in
piedi una causa che si poteva togliere»), un osservabile concreto, un
orientamento all'esame, un rimando interno al modulo. **Nessun fatto clinico
nuovo**: quelli non li posso verificare e non li ho inventati.

## Esito delle verifiche

| controllo | esito |
|---|---|
| vincoli di `costruisci.py` | ✓ `OK, nessun errore` |
| scene ≤ 50 | ✓ 48 |
| blocchi ≤ 225 car | ✓ il piu' lungo e' 215 |
| vocali accentate nel parlato | ✓ nessuna |
| tag di intenzione ≤ 6 | ✓ 3 |
| copione riscritto vs. copione di partenza | ✓ 0 termini di contenuto persi |
| `STACCO` concorde fra `tagli.py` e l'aritmetica | ✓ s24 |
| temi concordi fra `blocchi.json` e `contenuti.mjs` | ✓ 48 su 48 |
| le 48 scene generano HTML | ✓ nessuna eccezione, nessun `undefined` |
| traboccamento della cornice | ✓ nessuna slide sfora, **con i caratteri e il logo veri** |
| provini guardati | ✓ tutte e 48 |
| verifica per trascrizione | ✓ **99,7% su A · 100,0% su B · 0 buchi nel parlato** |
| blocchi nella fascia 8,5-21 car/s | ✓ tutti e 46 dentro (14,3 - 18,9) |
| confini: coppie adiacenti di segno opposto | ✓ nessuna, su entrambe le tracce |
| scarto audio/video sulle clip | ✓ massimo 10 ms, su s10 |
| durata del montato locale ≥ 7:50 | ✓ **7:53.60** |
| sottotitoli SRT | ✓ 46 righe su 46 blocchi |

`controlli.py` dice **8 su 8 superati**.

## Il montato

| | |
|---|---|
| montato locale | `montato-16.2.mp4` — **7:53.60**, 1920×1080, 25 fps |
| montato HeyGen | `548d0a2abd26e32be0490f21f547e3fb` — **7:52.27** |
| asset caricati | 92 (46 clip + 46 mp3) in un lotto, 92 su 92 ingeriti |
| | copertina e chiusura **riusate** dal lotto precedente |
| render | 62 s (il primo montato, stessa taglia, ne aveva presi 242) |
| sottotitoli | `montato-16.2.srt`, 46 righe, coi tempi esatti dei blocchi |

**I due montati non durano uguale: 473,60 s in locale, 472,27 su HeyGen.** Un
secondo e un terzo di differenza su 48 scene, cioe' ~28 ms per scena: e'
l'arrotondamento al fotogramma a 25 fps, lo stesso scarto misurato sulla 16.1
(1,18 s). Qui non cambia l'esito, perche' **entrambi stanno sopra i 470 s
chiesti** — ma e' il motivo per cui sulla 16.1 il consegnato finiva 0,38 s
sotto: il controllo del §6 guarda il montato locale, non il renderizzato. Con
il margine di 3,6 s di questa lezione lo scarto e' assorbito.

Il lotto ha ripetuto il comportamento che il §6 descrive: alla terza
interrogazione lo stato diceva `completed` mentre il conteggio stava a 61
ingeriti su 92. Aspettato il conteggio, non lo stato.

**C'e' un primo montato HeyGen da buttare**: `363160aba7700df3499122041d9609b1`,
7:41.47, renderizzato in 242 s sul taglio senza le pose di capitolo. L'ho
lanciato prima di decidere che cosa fare dei 7 s mancanti, e l'ho lasciato
finire perche' il render non si paga a consumo. Il secondo lo sostituisce: il
primo resta solo come misura del tempo di render.

## Costo misurato

```
voce, traccia A (4.012 car, eleven_v3, 288,4 s)     $0,66
voce, traccia B (3.696 car, eleven_v3, 262,4 s)     $0,62
                                                    ------
voce                                                $1,28
```

Il costo della trascrizione non l'ho annotato al momento della chiamata. Sulla
16.1, con tracce di lunghezza paragonabile, era $0,53: il totale di questa
lezione sta quindi intorno a **$1,81**, lo stesso della 16.1. Il numero esatto
non lo so, e non lo scrivo come se lo sapessi.

Il re-taglio, le 46 clip rifatte, i 92 caricamenti e i due render di montaggio
**non hanno aggiunto costo**: il montaggio non si paga a consumo (piano Pro).
L'errore sul `CPS` e' costato tempo, non soldi — perche' si e' fermato prima
della voce. Se l'avessi scoperto dopo aver cambiato il copione, sarebbero
stati $1,28 di voce da rigenerare.

## Che cosa e' andato storto, e come si e' deciso

**I `✓` e i `×` nella tabella delirium/demenza marcavano la demenza come
sbagliata su tutte e cinque le righe.** La tabella confronta due quadri
clinici da distinguere, non un giusto e uno sbagliato: col segno accanto,
«graduale», «progressivo», «conservata» e «non reversibile» diventavano errori
da evitare, che e' falso e contrario al registro del modulo. Segni rimossi; la
parola che discrimina sta in accento. Il segno accanto alla parola serve dove
c'e' davvero un giusto e uno sbagliato — le scene `sostituzione` — e li' e'
rimasto. Trovato **guardando i provini**: nessun vincolo automatico distingue
un confronto da una correzione.

**Il DOC era parlato ma non mostrato.** La scena dei disturbi d'ansia
disegnava `ANSIA.slice(0,3)`: ansia generalizzata, panico, fobie. Il parlato
nomina anche il disturbo ossessivo compulsivo con la sua definizione
(ossessioni e compulsioni), e chi guarda non lo vedeva. Tutti e quattro i
riquadri.

**s39 chiedeva un tema che la scena non puo' portare.** Il blocco era
`profondo`, ma la scena e' una `tabella`, che sta nell'elenco `SOLO_CHIARO` di
`layout.mjs` e **solleva un'eccezione** su fondo pieno. Il controllo di
concordanza fra `blocchi.json` e `contenuti.mjs` lo avrebbe preso al primo
render; il blocco e' passato a `chiaro`.

**Il velo rosa era su contenuto positivo, di nuovo.** Due scene (s04, s47)
usavano `tenue`, che `layout.mjs` commenta come «le slide degli errori», per
la regola del descrivere fatti e per la chiusura sul cambiamento. Spostato su
correzioni vere. E' lo stesso difetto della 16.1, su una lezione diversa:
**non e' un caso isolato, e' il tema che si prende per default.** Da guardare
sulle prossime tre.

**`13` era murato in una riga di `tagli.py`.** `m = tot+13` sommava copertina e
chiusura come costante scritta a mano, nel file che stampa la durata del
montato. Su una lezione con una copertina o una chiusura diversa avrebbe
mentito sul numero che serve a decidere. Ora `COPERTINA + CHIUSURA` da
`profilo.py`. E' il terzo numero di lezione che trovo murato in uno strumento
condiviso, dopo lo `s50` di `monta-locale.py` e i tre di `controlli.py`.

## Da verificare — quello che non ho potuto giudicare io

- **I contenuti clinici non li ho verificati contro una fonte.** Il copione di
  partenza e' stato riscritto, non controllato. Le affermazioni di merito —
  i cinque parametri che distinguono delirium e demenza, i segni della
  depressione e della mania, i contenuti tipici del delirio, le cause del
  delirium, i presidi di prevenzione — sono quelle del documento fornito.
  **Vanno riviste da chi conosce la materia**, a partire dalla tabella dei
  cinque parametri, che e' la scena su cui questa lezione si gioca.
- **Le aggiunte `AGG` sono mie**, e sono riformulazioni di quanto c'era: il
  perche' la distinzione delirium/demenza non e' accademica, il sonno che non
  serve piu' come segno da riferire, la frase «io non lo vedo, ma capisco che
  per lei sia reale». Nessun fatto nuovo, ma **il modo di dirli e' una mia
  scelta** e va letto da chi insegna il corso.
- **`CPS = 17.52` e' misurato su una lezione sola.** Sulla 16.3, 16.4 e 16.5 va
  riletto: se la densita' di sigle o di cifre cambia, cambia la velocita'.
  La 16.2 e' densa di termini tecnici lunghi (anedonia, logorrea, delirium),
  che sono caratteri molti e sillabe poche — il verso in cui il reale sale.
- **Il velo rosa sul contenuto positivo e' uscito su due lezioni su due.**
  Sulle prossime tre il passaggio sui provini non e' un controllo di forma:
  e' il solo posto dove questo errore si vede.
- **L'SRT porta gli apostrofi del parlato** (`perche'`, `e'`) invece degli
  accenti veri, perche' il testo e' lo stesso che va alla voce e le vocali
  accentate le fanno sbagliare. Nei sottotitoli non serve: si leggono, non si
  pronunciano. **Riguarda tutte le lezioni del corso** ed e' una decisione da
  prendere una volta, non lezione per lezione.
- I `✓` e le frecce `→` delle tabelle non stanno nei sottoinsiemi latini dei
  due caratteri: li disegna un carattere di sistema. Vedi
  `slide/font/LICENZE.md`.
