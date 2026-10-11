# REGISTRO — 16.5 La crisi, l'aggressivita' e il riepilogo del modulo

Modulo 16 bonus, lezione 5 di 5 — **l'ultima**. Corso di preparazione al
concorso **OSS** Azienda Zero · CISL FP Padova Rovigo.

## Scheda parametri

| | |
|---|---|
| copione di partenza | `origine/copione-di-partenza.md` — lezione 16.5 del documento bonus |
| durata chiesta | **7:50** montati, come le quattro lezioni precedenti |
| pausa musicale | **no** |
| stile | profilo del MASTER §8, invariato |
| palette | campionata dal logo: verde `#00623A`, rosso `#D70328` |
| | verde pieno `#004E2E` (affermazione), velo rosa `#FCF4F3` (errori) |
| marchio | logo CISL FP Padova Rovigo, in alto a sinistra |
| caratteri | Inter (testo), Source Serif 4 (frasi e citazioni) |
| voce | GianP, `nNt0YcINdGadGcTx5fBM`, `eleven_v3` |
| formato | 1920×1080, 25 fps, 16:9 |

## L'aritmetica

```
durata chiesta        7:50 montati  =  470 s
copertina e chiusura  3 s + 10 s
pose dichiarate       14,4 s   (1,2 s a ogni cambio di capitolo, 12 cambi)
caratteri scritti     7.772   ·  47 blocchi  ·  13 capitoli  ·  49 scene su 50
                      165 car/blocco di media, il piu' lungo 222, tetto 225

misurato              voce grezza 547,2 s  ->  lavorata netta 424,2 s
                      CPS netto 18,32          (17,52 · 18,31 · 17,63 prima)
                      rapporto grezzo/lavorato 1,290  (1,252 · 1,240 · 1,246)
                      respiro +0,433 s su 46 blocchi  ->  parlato 458,5 s
                      montato locale 7:51.88
stacco tracce         s26  ·  chunkA 4.105 car  ·  chunkB 3.712 car
temi                  33 chiaro · 9 profondo · 7 tenue
tipi di scena         elenco 12 · titolo 10 · frase 7 · timeline 4 · scala 3
                      · catena 3 · trappola 3 · icone 2 · tre 2 · memo 1
                      · copertina 2  —  **undici tipi**
tag di intenzione     3  (warm, thoughtful, warm)
```

## Nemmeno il rapporto grezzo/lavorato e' stabile

La 16.4 chiudeva dicendo che il `CPS` varia del 4% ma il rapporto fra traccia
grezza e lavorata **no**: 1,252 · 1,240 · 1,246, la terza cifra. L'avevo
scritto nel MASTER come il numero su cui si puo' contare.

Questa lezione lo smentisce: **1,290**. E lo smentisce nel modo piu' netto
possibile, perche' la 16.3 e la 16.5 hanno il `CPS` praticamente identico —
18,31 e 18,32 — e rapporti 1,240 e 1,290. **I due numeri non variano insieme**,
quindi non c'e' nemmeno un modo di dedurre l'uno dall'altro.

Conseguenza pratica: nessuno dei due predice la durata del montato. Servono
solo a decidere quanti caratteri scrivere prima di spendere la voce, e li' si
mira **corto**, perche' il respiro allunga e non accorcia. Il MASTER e'
corretto di conseguenza.

### Il numero stava dentro lo strumento, e faceva danno

`tagli.py allinea` deve stimare il ritmo **lavorato** guardando solo la traccia
grezza, per dire quali confini vale la pena guardare. Lo faceva dividendo per
**1.30 scritto dentro il codice**. Su questa voce la stima usciva il 4% troppo
veloce e segnalava **tre blocchi fuori fascia che erano tutti dentro**.

Spostato in `profilo.py` come `RAPPORTO_RITMO`, i tre segnalati sono diventati
uno — s30 a 21,2 contro un tetto di 21. L'ho guardato: il confine stava gia' al
centro dell'unica pausa disponibile, e spostarlo avrebbe messo 0,75 s di
silenzio in testa al blocco per guadagnare l'1%. Lasciato stare. Sul lavorato,
`applica` ha misurato **zero blocchi fuori fascia**: il segnale era della
stima, non del taglio.

E' la stessa trappola del §4 del MASTER, la terza volta in questo modulo: un
numero che e' della voce, o della lezione, murato dentro uno strumento
condiviso.

## Il respiro, e la durata consegnata

```
respiro   +0,433 s su 46 blocchi   (19,9 s da recuperare, bersaglio 471,5 s)
montato locale  7:51.88
```

Piu' respiro della 16.4 (+0,168) e della 16.3 (+0,375), perche' la voce ha
letto piu' veloce del previsto — il copione era dimensionato per 17,52 car/s e
lei ne ha fatti 18,32. **E' esattamente il verso in cui il meccanismo
funziona**: il copione scritto corto si e' lasciato allungare. Se fosse andata
al contrario non ci sarebbe stato rimedio senza rigenerare la voce.

## Il copione di partenza non trasferisce cosi' com'e'

Il documento bonus porta **13 scene** a ~510 caratteri l'una: oltre venti
secondi a inquadratura, contro il tetto di 225 per blocco del MASTER §2. I 13
argomenti restano nell'ordine in cui stanno; cambia il taglio, in 47 blocchi.

Il parlato di partenza misurava **6.631 caratteri**. I ~1.140 aggiunti sono
segnati `AGG` in `costruisci.py` e sono **il come**: perche' i gradini vanno
saputi in ordine (servono a collocare quello che si ha davanti), perche' la
domanda sulla causa rimovibile viene prima delle tecniche, i rimandi alle
quattro lezioni precedenti del modulo. **Nessun fatto nuovo** — ne' clinico,
ne' normativo, ne' sulle procedure: questa lezione dice che cosa fare addosso a
una persona agitata, ed e' l'ultimo posto in cui inventare.

**Le ultime tre sezioni ricompongono il modulo**, e li' la regola e' stata
citare con le stesse parole delle lezioni gia' consegnate: un ripasso che
riformula e' un ripasso che confonde.

## Il repertorio dei tipi, deciso prima di scrivere

La 16.4 chiudeva con un rilievo: sette tipi di scena su ventotto disponibili, e
`frase` + `titolo` che da soli facevano 28 scene su 50. Il consiglio lasciato
era di **decidere il tipo prima di scrivere il blocco, non dopo**.

Fatto, e si vede: **undici tipi**, e nessuno domina.

| | 16.3 | 16.4 | 16.5 |
|---|---|---|---|
| tipi distinti | 9 | 7 | **11** |
| `frase` + `titolo` | 21 su 49 | 28 su 50 | **17 su 49** |

I tipi non sono decorazione, sono argomenti: i quattro gradini dell'escalation
sono una `scala` perche' **l'ordine e' il contenuto**; i distrattori sono una
`trappola` perche' hanno davvero un lato giusto e uno sbagliato — la prima
volta in tutto il modulo che quel tipo e' usato per quello che e'; il quadro
delle cinque lezioni e' una `timeline` perche' e' una sequenza; i tre passi
dopo l'evento sono una `catena` perche' uno porta all'altro.

## Esito delle verifiche

| controllo | esito |
|---|---|
| vincoli di `costruisci.py` | ✓ `OK, nessun errore` |
| scene ≤ 50 | ✓ 49 — **una di margine**, al contrario della 16.4 |
| blocchi ≤ 225 car | ✓ il piu' lungo e' 222 |
| vocali accentate nel parlato | ✓ nessuna |
| tag di intenzione ≤ 6 | ✓ 3 |
| ogni cambio di capitolo porta una posa | ✓ 12 su 12 |
| lo STACCO cade a un cambio di capitolo | ✓ s26 (**vincolo nuovo**, vedi sotto) |
| copione riscritto vs. copione di partenza | ✓ 0 termini di contenuto persi |
| temi concordi fra `blocchi.json` e `contenuti.mjs` | ✓ 49 su 49 |
| le 49 scene generano HTML | ✓ nessuna eccezione, nessun `undefined` |
| nessun tipo butta via una chiave | ✓ (**controllo riscritto**, vedi sotto) |
| traboccamento della cornice | ✓ nessuna slide sfora |
| copertina: riga rossa e ente non si toccano | ✓ |
| serie a tappe col tema concorde | ✓ |
| provini guardati | ✓ tutti e 49 |
| verifica per trascrizione | ✓ **95,8% su A · 0 buchi** — con riserva, vedi sotto |
| blocchi nella fascia 8,5-21 car/s | ✓ tutti e 47 dentro |
| confini: coppie adiacenti di segno opposto | ✓ nessuna, su entrambe le tracce |
| scarto audio/video sulle clip | ✓ massimo 20 ms, su s27 |
| durata del montato locale ≥ 7:50 | ✓ **7:51.88** |
| sottotitoli SRT | ✓ 47 righe su 47 blocchi |

## Il guardiano delle chiavi perse perdeva due chiavi

`layout.mjs` dichiarava, tipo per tipo, quali chiavi ogni modello legge dalle
sue voci, e sollevava un'eccezione su una chiave che non avrebbe reso. E' il
controllo nato sulla 16.3, quando `griglia` aveva buttato via quattro
definizioni mentre la voce le pronunciava.

Preparando questa lezione ho confrontato la tabella con i modelli veri: per
`timeline` dichiarava `t` e `d`, mentre il modello legge **`anno` ed `et`**.
Cioe' il guardiano contro le chiavi perse ne stava perdendo due, e avrebbe
rifiutato le chiavi giuste accettando quelle che spariscono. Una tabella
scritta a mano si scosta dai modelli, e si era scostata.

Riscritto: **non si dichiara, si osserva.** La scena viene resa una prima volta
con le voci avvolte in un `Proxy` che annota ogni accesso, e si confronta con
le chiavi che i dati portano davvero. Vale per qualunque tipo, anche per quelli
che non esistono ancora, e non c'e' niente da tenere allineato.

Provato sulle 147 scene gia' consegnate delle 16.2, 16.3 e 16.4: **zero falsi
allarmi**. E sui due difetti veri, `timeline` con `d` e `griglia` con `d`, li
prende entrambi.

## Lo stacco della lezione precedente era sopravvissuto

`STACCO` in `profilo.py` dice dove finisce la traccia A. Va riletto a ogni
lezione, e il MASTER avverte che quello della lezione precedente **taglia nel
punto sbagliato senza che nessun controllo se ne accorga**, perche' i conti
tornano tutti — sui blocchi sbagliati.

Era rimasto `s25` dalla 16.4. In questa lezione s25 cade **dentro** il capitolo
7. Ora `costruisci.py` lo verifica, e la prima esecuzione l'ha preso:

```
ERRORI:
  - STACCO «s25» cade dentro il capitolo 7, non a un cambio
```

E gia' che calcola lo stacco, **scrive anche i due file di testo** delle
tracce: finora si componevano a mano, ed era proprio il passaggio in cui lo
stacco vecchio sopravviveva.

## La verifica per trascrizione, e perche' qui ha una riserva

**Il servizio di trascrizione non rispondeva.** Tutti gli strumenti che creano
un asset audio — `attach_reference_file`, `add_flow_asset_node`,
`create_asset_upload` — tornavano malformati, nove tentativi in venti minuti.
Nessun addebito: il conteggio dei nodi sul flow e' rimasto fermo, quindi le
chiamate non erano arrivate.

**C'e' una scorciatoia che sembra funzionare e non funziona.** Il nodo che
genera la voce emette audio, quindi la trascrizione gli si puo' collegare
direttamente. L'ho fatto. Torna un testo — ed e' il **copione di partenza**
riallineato sull'audio, con gli apostrofi di comodo (`e'`, `piu'`) e i tag
(`[warm]`) dentro. La verifica avrebbe detto 100% per costruzione senza aver
ascoltato niente. Il MASTER lo descrive gia' e dice come accorgersene: nessuna
voce pronuncia un apostrofo o una parentesi quadra. Buttato.

Verificata allora con **vosk-model-small-it-0.22**, in locale, sulle stesse
tracce grezze. Dettagli in `audio/trascrizioni/PROVENIENZA.md`.

```
traccia A  641/669 parole (95,8%)   buchi da 3+ parole: 0
traccia B  ...                      buchi da 3+ parole: 0
```

Il 95,8% invece del 99,7% di Scribe e' tutto spiegato: il modello piccolo
sbaglia **le sigle e le parole inglesi**, e infatti i 34 scarti sono tutti di
quel tipo (`tso` → «ti esse o», `recovery` → «ricoveri», `de escalation` →
«scale scion»).

Un buco segnalato c'era, su s34: `dsm csm e spdc` reso «di seme ci assieme esse
pidocchi». **Non l'ho archiviato**, ho applicato i criteri del MASTER:

- *la stessa parola altrove*: le tre sigle tornano in s40, dove il
  riconoscitore le rende male ma non le perde;
- *la durata del blocco*: s34 gira a **14,9 car/s contro una media di 17,0**.
  Se le sigle fossero state saltate il blocco sarebbe piu' **veloce**. E' piu'
  lento, perche' sillabare tre sigle costa tempo. E s40, quasi tutto sigle, e'
  il blocco piu' lento della lezione a 12,4.

Conclusione: la voce le ha dette, il riconoscitore non sa scriverle. Le rese
sono dichiarate una per una in `verifica-testo.py`, come vuole il metodo —
«di seme» → DSM, «esse pidocchi» → SPDC, e cosi' via — e la verifica torna
**nessun buco: la voce ha detto tutto**.

> **La riserva.** Un riconoscitore piccolo sbaglia molto, e dentro il rumore
> dei suoi errori potrebbe nascondersi un buco vero che il confronto non
> distingue. Le prove indirette sono solide e convergenti, ma **non sono un
> ascolto**. Se il servizio torna, questa verifica vale la pena di rifarla con
> Scribe prima di considerarla chiusa.

## Il montato

| | |
|---|---|
| montato locale | `montato-16.5.mp4` — **7:51.88**, 1920×1080, 25 fps |
| montato HeyGen | `eb2dbefda53c2450a8f5e8d805a3e21d` — **7:50.54** |
| render | 118 s |
| asset caricati | 96 in un lotto solo |
| sottotitoli | `montato-16.5.srt`, 47 righe, coi tempi esatti dei blocchi |

Perdita in consegna 1,34 s su 49 scene, **27 ms a scena**: dentro la banda
24-29 delle cinque misure precedenti, e sopra i 7:50 chiesti. Il bersaglio del
respiro ha funzionato al primo giro per la seconda lezione di fila.

> **Lo stato del render e' arrivato in ritardo di venti minuti.** Il video era
> pronto dopo 118 secondi — `completed_at` meno `created_at` lo dice — ma
> `get_video` ha continuato a rispondere `processing` per oltre venti minuti.
> Chi aspetta quel campo crede che il lavoro sia bloccato. Non si rilancia il
> montaggio: si continua a chiedere.

## Costo misurato

```
voce, traccia A (4.105 car, eleven_v3, 289,0 s)     $0,677
voce, traccia B (3.712 car, eleven_v3, 258,2 s)     $0,612
trascrizione                                         $0,000   (in locale)
                                                    -------
                                                     $1,289
```

**Un credito per carattere, alla quarta misura**: 4.105 crediti per 4.105
caratteri, 3.712 per 3.712. Il preventivo del servizio diceva 17.291 crediti
contro i 7.817 addebitati — di nuovo **2,2 volte**.

Le due trascrizioni fallite e le due a vuoto sul nodo della voce non hanno
addebitato niente (`credit_costs: 0`).

## Da verificare — quello che non ho potuto giudicare io

- **I contenuti di merito non li ho verificati contro una fonte.** I quattro
  gradini dell'escalation, le tecniche di de-escalation e quelle da evitare, le
  condizioni della contenzione, che cosa si fa dopo l'evento, le cinque
  risposte dell'autovalutazione: sono quelli del documento fornito. **Vanno
  riviste da chi conosce la materia**, e qui piu' che altrove, perche' questa
  lezione dice che cosa fare in una situazione in cui qualcuno puo' farsi male.
- **La sezione di riepilogo riassume le altre quattro lezioni.** Se una di
  quelle va corretta, va corretta anche qui: il quadro del modulo, i
  distrattori e le cinque domande ripetono gli stessi contenuti. **Sono il
  punto del corso in cui un errore si moltiplica per cinque.**
- **Le aggiunte `AGG` sono mie.** Nessun fatto nuovo, ma il modo di dirli e' una
  mia scelta: che i gradini servano «a collocare quello che si ha davanti», che
  «una tecnica applicata bene sopra un dolore non trattato non fa scendere
  niente», che «una segnalazione non fatta e' un'informazione che manchera' a
  chi viene dopo». Vanno lette da chi insegna il corso.
- **La verifica per trascrizione ha la riserva scritta sopra**, ed e' l'unica
  delle cinque lezioni a non essere stata verificata con Scribe.
- **Il velo rosa sta su sette scene**, tutte su contenuto correttivo: le tre di
  «che cosa non fare», le tre dei distrattori, e quella che dice che la
  contenzione non e' de-escalation. Guardate una per una.
- **L'SRT porta gli apostrofi del parlato** (`perche'`, `e'`) invece degli
  accenti veri. Riguarda tutte e cinque le lezioni del corso ed e' **una
  decisione da prendere una volta sola**. E' la quinta volta che la segnalo, ed
  e' rimasta aperta per tutto il modulo.
- I `✓`, le `×` e le frecce `→` non stanno nei sottoinsiemi latini dei due
  caratteri: li disegna un carattere di sistema. Vedi `slide/font/LICENZE.md`.
