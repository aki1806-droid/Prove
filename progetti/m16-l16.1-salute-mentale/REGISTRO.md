# REGISTRO — 16.1 Salute mentale: concetti, stigma e riferimenti normativi

Modulo 16, lezione 1 di 3. Corso di preparazione al concorso **OSS** Azienda
Zero · CISL FP Padova Rovigo.

## Scheda parametri

| | |
|---|---|
| copione di partenza | `origine/copione-di-partenza.md` — fornito dall'utente |
| durata chiesta | **7:50** montati |
| pausa musicale | **no** |
| stile | profilo del MASTER §8, invariato |
| palette | bianco `#FFFFFF`, verde `#00623A`, rosso `#D70328`, testo `#1C1C1C` |
| | verde pieno `#004E2E` (affermazione), velo rosa `#FCF4F3` (errori) |
| marchio | logo CISL FP Padova Rovigo, in alto a sinistra |
| caratteri | Inter (testo), Source Serif 4 (frasi e citazioni) |
| voce | GianP, `nNt0YcINdGadGcTx5fBM`, `eleven_v3` |
| formato | 1920×1080, 25 fps, 16:9 |

Il profilo del §8 e' quello del corso **Infermiere**; questa lezione e' del
corso **OSS**. Stesso cliente e stesso marchio, quindi i parametri di stile
sono stati confermati identici invece di riaprirli.

## L'aritmetica

```
durata chiesta        7:50 montati  =  470 s
parlato               457 s  (470 − 3 di copertina − 10 di chiusura)
caratteri attesi      457 × 17,0  =  ~7.770

realizzato            46 blocchi · 48 scene su 50 · 7.720 caratteri
                      168 car/blocco di media, tetto per blocco 225
                      8 pose per 9,6 s
                      parlato 464 s  ·  montato 7:56.7  (stima a 17,0 car/s)
stacco tracce         s24  ·  chunkA 3.957 car  ·  chunkB 3.763 car
```

Il montato stimato e' **sopra** i 7:50 chiesti, che e' il verso giusto: il
controllo del §6 vuole `durata ≥ quella chiesta`. La densita' di cifre di
questa lezione e' bassa (180, 1978, 833 e tre richiami di lezione), quindi lo
scarto reale dovrebbe restare piccolo — ma se la voce va piu' lenta di 17,0
car/s il montato si allunga, non si accorcia.

## Il copione di partenza non trasferisce cosi' com'e'

Il copione arriva con **14 slide** e dichiara in testa lo standard «7–8
minuti · 14–17 slide». Quello standard viene dalla pipeline Gamma: a ~500
caratteri di parlato per slide sarebbero **mezzo minuto a inquadratura**,
contro il tetto di 225 caratteri per blocco del MASTER §2. Struttura e ordine
del copione restano, ma la ri-blocchettatura in 46 blocchi era obbligata in
ogni caso, qualunque durata si fosse scelta.

Il testo parlato di partenza misurava **7.229 caratteri**, cioe' 7:18 montati:
sotto i 7:50 che il copione stesso si da'. I ~490 caratteri aggiunti sono
**il come**, non riempitivo — un esempio (i dieci minuti per vestirsi), una
conseguenza (chi decide che cosa, nei quattro passaggi del TSO), un
orientamento all'esame (la data sola da ricordare).

## Esito delle verifiche

| controllo | esito |
|---|---|
| vincoli di `costruisci.py` | ✓ `OK, nessun errore` |
| scene ≤ 50 | ✓ 48 |
| blocchi ≤ 225 car | ✓ il piu' lungo e' 214 |
| vocali accentate nel parlato | ✓ nessuna |
| tag di intenzione ≤ 6 | ✓ 4 |
| copione riscritto vs. copione di partenza | ✓ 0 termini di contenuto persi |
| `STACCO` concorde fra `tagli.py` e l'aritmetica | ✓ s24 |
| temi concordi fra `blocchi.json` e `contenuti.mjs` | ✓ 48 su 48 |
| le 48 scene generano HTML | ✓ nessuna eccezione, nessun `undefined` |
| traboccamento della cornice | ✓ nessuna slide sfora, **con i caratteri e il logo veri** |
| provini guardati | ✓ tutte e 48, sul render definitivo |
| verifica per trascrizione (tracce intere) | ✓ 99,8% su A e su B, **0 buchi nel parlato** |
| blocchi nella fascia 8,5-21 car/s | ✓ tutti e 46 dentro |
| confini: coppie adiacenti di segno opposto | ✓ nessuna |
| durata del montato locale ≥ 7:50 | ✓ 7:50.80 |
| sottotitoli SRT | ✓ 46 righe su 46 blocchi |

`controlli.py` dice **8 su 8 superati**. La pipeline e' arrivata in fondo: il
video e' renderizzato.

## Il montato

| | |
|---|---|
| montato locale | `montato-16.1.mp4` — **7:50.80**, 1920×1080, 25 fps, AAC stereo |
| montato HeyGen | `9230e3ed568f06691c3db2a10197fd30` — **7:49.62** |
| render | 120 s (il MASTER misura 179 e 211 s per un montato di questa taglia) |
| asset caricati | 94 in un lotto solo, tutti e 94 ingeriti |
| sottotitoli | `montato-16.1.srt`, 46 righe. Non chiesti a HeyGen: quelli nostri |
| | hanno i tempi esatti dei blocchi, i suoi verrebbero dall'ascolto |

**I due montati non durano uguale: 470,80 s in locale, 469,62 s su HeyGen.**
Un secondo e due decimi di differenza su 48 scene, cioe' circa 25 ms per
scena: e' l'arrotondamento di ogni scena al fotogramma a 25 fps. Conta perche'
**il video consegnato sta 0,38 s sotto i 470 s chiesti**: il controllo del §6
passa sul montato locale e non sul renderizzato. Resta dentro lo standard
«7-8 minuti» del corso, ma il numero giusto da dichiarare e' 7:49.6, non 7:50.

## Costo misurato

```
voce, traccia A (3.956 car, eleven_v3)              $0,65
voce, traccia B (3.808 car, eleven_v3)              $0,63
trascrizione delle due tracce intere                $0,53
                                                    ------
                                                    $1,81
```

Il render del montaggio e i caricamenti non si pagano a consumo (piano Pro,
4.784 crediti disponibili).

Il §8 stima ~$2,05, di cui ~$1,45 di voce: la voce reale e' costata $1,28.
**Ma il preventivo del servizio e' pessimistico di circa 2,2 volte**: chiesto
prima di generare, dava $2,83 per le due tracce (8.751 crediti per la A contro
i 3.956 addebitati, cioe' un credito per carattere). Se si decide se spendere
guardando il preventivo, si decide su un numero piu' che doppio.

## Che cosa e' andato storto, e come si e' deciso

**Il controllo automatico ha detto OK su un copione a cui mancava un
avverbio che cambiava il senso.** `costruisci.py` non ha segnalato niente, ma
la rilettura contro il copione di partenza ha trovato che `autonomamente` era
sparito da «gestire autonomamente la terapia», tagliato per far rientrare il
blocco nei 225 caratteri. Senza quell'avverbio la slide dice che all'OSS non
compete la terapia, che e' un'altra affermazione — e sbagliata. Poi era
sparito «sostegno alla quotidianita'», che e' un'attivita' nominata e non un
giro di frase. La decisione: non comprimere, ma **prendere una scena in piu'**
(c'era spazio, 47 su 50). Conferma della nota del MASTER §4: il controllo
automatico verifica la forma e non sa che cosa doveva esserci.

**Il velo rosa era su contenuto positivo.** `layout.mjs` commenta il tema
`tenue` come «velo di rosso: le slide degli errori». Quattro scene lo usavano
per la definizione di salute mentale, la data della 833, la rete dei servizi e
il riepilogo finale. In una lezione il cui registro dichiarato e' «fermo nel
correggere i pregiudizi», marcare come errore una definizione positiva e' il
contrario di quello che serve. Trovato **solo guardando i provini**: nessun
vincolo automatico poteva prenderlo. Il `tenue` e' ora su s19 (il
fraintendimento sull'ordine pubblico), s32 (gli effetti dello stigma) e s41
(cio' che non compete).

**`nuova-lezione.sh` non sapeva impiantare una lezione fuori dal modulo 1.**
Tre difetti, tutti scoperti usandolo e tutti a danno della lezione *dopo*:
il glob cercava la sorgente in `progetti/m1-l*/`, che non vede il modulo 16;
l'ordinamento era lessicografico, dove `m16` viene prima di `m2`, quindi con
due moduli avanti si sarebbe copiato da una lezione piu' vecchia credendo di
copiare dall'ultima; e `grafica.mjs` non era fra i file copiati pur essendo
importato da `layout.mjs`, quindi ogni lezione nuova sarebbe morta al primo
`node slide/cards.mjs`. Corretti nello script condiviso.

**Il marchio arrivava con 38 pixel di margine trasparente.** `layout.mjs`
scala il logo a un'altezza fissa di 70px: un margine dentro il file avrebbe
rubato altezza al marchio e lo avrebbe reso piu' piccolo del dovuto su ogni
slide. Rifilato sul contenuto opaco, 225x109 diventa 187x97 — ed e' il motivo
per cui il MASTER chiama quel file `logo-rifilato`. Campionandolo si
confermano anche i due colori del §8, che dice esplicitamente di non stimarli:
fra i pixel opachi `#00623A` e' al 35,0% e `#D70328` all'11,7%, gli stessi
valori che `layout.mjs` ha in costante.

**Una slide diceva «il TSO ... e' disciplinata per legge».** TSO e' maschile, e
il parlato dice giustamente «disciplinato»: l'errore stava solo nella slide,
dove nessun controllo lo cercava. Trovato guardando il render definitivo, non
quello con i caratteri di sistema — che e' un argomento per non rimandare il
pass visivo a dopo.

**Il servizio di sintesi genera quattro varianti a pagamento, se non gli si
dice altro.** `creative_generate_speech` ha `generations_count` con default 4.
Messo a 1: quattro varianti delle due tracce sarebbero state $11,32 invece di
$1,28, e non ne serviva nessuna — il copione era fermo.

**Tre numeri della 1.8 erano murati negli strumenti condivisi**, e su una
lezione da 48 scene sbagliavano tutti e tre. `monta-locale.py` aveva `s50`
scritto a mano come scena di chiusura: qui la chiusura e' `s48`, il fotogramma
non esisteva, la concatenazione saltava in silenzio e il montato non veniva
prodotto. `controlli.py` pretendeva `len(png)==50`, 48 righe di SRT e una
durata di almeno 480 s — ma 50 e' il tetto duro del MASTER e non il numero di
scene di ogni lezione, e gli «8 minuti almeno» sono la richiesta del corso
Infermiere. Ora copertina e chiusura sono il primo e l'ultimo PNG renderizzato,
PNG e righe SRT si contano dai blocchi, e la durata chiesta e' una costante
dichiarata in testa al file, come `STACCO` in `tagli.py`.

**Il tag ID3 dei mp3 di blocco c'e', ma e' di 44 byte.** Il §4 avverte che il
caricamento rifiuta la traccia grezza per il tag da ~17 KB che il generatore
scrive in testa, e dice che un mp3 di blocco passa. Misurati: blocco 44 byte
(la firma di ffmpeg), grezzo 16.881 byte. Il §4 era preciso, e i 94
caricamenti sono passati senza toccare niente.

**Il conteggio del lotto e' davvero in ritardo.** Alla prima interrogazione lo
stato del lotto diceva gia' `completed` mentre gli item erano 30 completati e
64 in lavorazione. Aspettato il conteggio, come dice il §6, non lo stato.

**Il controllo di traboccamento non aveva trovato niente.** Prima di crederci
gli e' stata data una slide volutamente troppo alta: l'ha vista, +1608px.
L'esito «nessuna slide sfora» e' quindi vero e non cieco.

## Da verificare — quello che non ho potuto giudicare io

- I `✓` e le frecce `→` delle tabelle e degli elenchi non stanno nei
  sottoinsiemi latini dei due caratteri: li disegna un carattere di sistema.
  Nel render si vedono, ma su una macchina diversa potrebbero cambiare forma.
  Vedi `slide/font/LICENZE.md`.
- **La voce non e' stata generata.** Costa (~$2,05 fra sintesi e trascrizione)
  e non si rifa' a pezzi, quindi non e' stata lanciata senza dirlo. Restano
  quindi non eseguiti: i tagli, la verifica per trascrizione, le clip, il
  caricamento, il montaggio e l'SRT.
- **La velocita' di 17,0 car/s non e' verificata su questa voce e su questo
  testo.** E' la media del corso Infermiere. Se la resa reale sta sotto, il
  montato supera gli 8 minuti e sfora lo standard «7–8» del corso OSS.
- **I contenuti di merito non li ho verificati contro una fonte.** Il copione
  di partenza e' stato riscritto, non controllato: le affermazioni normative
  (le tre condizioni del TSO, i quattro passaggi della procedura, la 180
  confluita nella 833) sono quelle del copione fornito. Le poche aggiunte mie
  sono riformulazioni di quanto c'era — chi decide che cosa nei quattro
  passaggi, e l'ordine per intensita' assistenziale della scala in s25 — e
  **vanno riviste da chi conosce la materia**.
- **`s25` mette i servizi in ordine di intensita' assistenziale** (domicilio →
  centro diurno → residenziale → SPDC). Il copione di partenza dice che i
  servizi sono «graduali e non alternativi» e parla di «diversa intensita'
  assistenziale» per le residenziali, ma **non ordina esplicitamente i quattro
  livelli**: l'ordine e' una mia lettura.
