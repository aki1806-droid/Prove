# REGISTRO — 16.3 La relazione e la comunicazione nel disagio psichico

Modulo 16 bonus, lezione 3 di 5. Corso di preparazione al concorso **OSS**
Azienda Zero · CISL FP Padova Rovigo.

## Scheda parametri

| | |
|---|---|
| copione di partenza | `origine/copione-di-partenza.md` — scena 3 del documento bonus |
| durata chiesta | **7:50** montati, come la 16.1 e la 16.2 |
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
caratteri scritti     7.817   ·  47 blocchi  ·  13 capitoli  ·  49 scene su 50
                      166 car/blocco di media, il piu' lungo 219, tetto 225

misurato              voce grezza 529,3 s  ->  lavorata netta 426,8 s
                      CPS netto 18,31          (la 16.2 ne aveva 17,52)
                      respiro +0,375 s su 46 blocchi  ->  parlato 458,4 s
                      montato locale 7:51.88  ->  renderizzato 7:50.53
stacco tracce         s24  ·  chunkA 3.935 car  ·  chunkB 3.927 car
temi                  32 chiaro · 7 profondo · 8 tenue
tag di intenzione     3  (warm, thoughtful, warm)
```

## Il respiro: la durata smette di essere una previsione

**Il montato grezzo e' uscito 7:34.2, quindici secondi sotto i 7:50.** Non per
un errore di conto: il `CPS` del profilo era quello misurato sulla 16.2, 17,52
car/s, e questa voce ha letto a **18,31**. Stessa voce, stesso modello, stesse
impostazioni, **il 4,5% di differenza fra una lezione e l'altra**.

Il rapporto fra traccia grezza e traccia lavorata invece e' stabile: 1,240 qui
contro 1,252 sulla 16.2. Quindi la variabilita' non e' nel filtro di ritmo, e'
nella lettura — e su otto minuti il 4,5% sono venti secondi. **La durata di un
montato non si puo' predire da un CPS misurato su una lezione sola.**

Ma non serve predirla. Le pose si applicano al **taglio**, non alla
generazione: dopo aver misurato la voce si sa esattamente quanto manca, e lo si
distribuisce. `tagli.py applica` ora calcola la differenza fra la durata chiesta
e quella ottenuta, e la spalma come **respiro** su ogni blocco tranne l'ultimo:

```
respiro: +0.375 s su 46 blocchi  (17.3 s da recuperare, bersaglio 471.5 s
         = 470 chiesti + 1.5 di arrotondamento su 49 scene)
47 blocchi  ·  parlato 458.4 s  ·  montato 7:51.4
```

Il montato esce **esatto**, e non e' costato niente: nessuna voce rigenerata.

### Il bersaglio e' il renderizzato, non il locale

Al primo giro il respiro mirava ai 470 s del montato **locale**, e il video
consegnato e' uscito **7:49.06**: un secondo sotto. E' la terza volta.

```
16.1   470,80 locale  ->  469,62 renderizzato    1,18 s su 48 scene
16.2   473,60 locale  ->  472,27 renderizzato    1,33 s su 48 scene
16.3   470,47 locale  ->  469,06 renderizzato    1,41 s su 49 scene
```

Sono 25-29 ms a scena, **sempre nello stesso verso**: il servizio arrotonda
ogni scena al fotogramma. Il controllo del §6 guarda il file locale e passa,
ma il file che riceve il committente e' l'altro — e la 16.1 e' stata
consegnata 0,38 s sotto proprio per questo.

Il respiro ora mira a `DURATA_CHIESTA + 0,030 x scene`, cioe' 471,5 s invece
di 470. Il montato locale esce 7:51.88 e **il renderizzato 7:50.53**: sopra i
7:50 chiesti, sul file che si consegna. Perdita prevista 1,47 s, reale 1,35.

Il prezzo e' stato rifare il taglio, le 47 clip e 94 caricamenti — una
ventina di minuti di macchina, zero euro. La 16.4 e la 16.5 ci arrivano
giuste al primo giro.

Tre cose da sapere su questo meccanismo:

- **Funziona in un verso solo.** Se il copione e' troppo lungo il montato sfora
  e nessuna posa lo accorcia. Per questo si mira sotto: si scrive un copione un
  po' corto e si lascia che il respiro colmi.
- **Ha un tetto**, `RESPIRO_MAX = 0.6` in `profilo.py`. Oltre quello `applica`
  si ferma e lo dice, invece di consegnare un video pieno di buchi. 0,343 s per
  blocco sta ampiamente sotto, ed e' un respiro, non una pausa.
- **Si somma alle pose, non le sostituisce.** Le pose dicono *dove* il discorso
  vuole un battito (i cambi di capitolo); il respiro dice *quanto* manca in
  tutto.

Il `CPS` del profilo resta 17,52 e serve ancora, ma solo per decidere quanti
caratteri scrivere. Per la durata del montato non serve piu'.

## Il copione di partenza non trasferisce cosi' com'e'

Il documento bonus porta **13 scene** a ~445 caratteri l'una: oltre venti
secondi a inquadratura, contro il tetto di 225 caratteri per blocco del MASTER
§2. I 13 argomenti restano nell'ordine in cui stanno; cambia il taglio, in 47
blocchi.

Il parlato di partenza misurava **5.790 caratteri**, cioe' 5:43 montati, due
minuti sotto i 7:50 che lo stesso documento si da'. I ~2.000 caratteri aggiunti
sono segnati `AGG` in `costruisci.py` e sono **il come**: perche' i quattro
principi tengono (sono verificabili), che cosa si sposta fra una frase e la sua
riformulazione, un esempio concreto di «riferimento concreto». **Nessuna
indicazione nuova su che cosa competa all'OSS**: quelle non le posso verificare
e non le ho inventate.

**Un difetto del documento di partenza, non corretto in silenzio.** La scena 8
dice: «Descrivere invece di chiedere conto: ho visto che apre, perche' non ha
chiude». E' una frase rotta a meta'. Il criterio e' chiaro e l'esempio non lo
e', quindi l'esempio e' stato rifatto con il pasto rimasto — che e' quello
della scena 7 dello stesso documento. La nota sta in testa a `costruisci.py`.

## Esito delle verifiche

| controllo | esito |
|---|---|
| vincoli di `costruisci.py` | ✓ `OK, nessun errore` |
| scene ≤ 50 | ✓ 49 |
| blocchi ≤ 225 car | ✓ il piu' lungo e' 219 |
| vocali accentate nel parlato | ✓ nessuna |
| tag di intenzione ≤ 6 | ✓ 3 |
| ogni cambio di capitolo porta una posa | ✓ 12 su 12 (**vincolo nuovo**) |
| copione riscritto vs. copione di partenza | ✓ 0 termini di contenuto persi |
| temi concordi fra `blocchi.json` e `contenuti.mjs` | ✓ 49 su 49 |
| le 49 scene generano HTML | ✓ nessuna eccezione, nessun `undefined` |
| nessun tipo butta via una chiave | ✓ (**vincolo nuovo**, vedi sotto) |
| traboccamento della cornice | ✓ nessuna slide sfora, coi caratteri e il logo veri |
| copertina: riga rossa e ente non si toccano | ✓ (**vincolo nuovo**, vedi sotto) |
| provini guardati | ✓ |
| verifica per trascrizione | ✓ **100,0% su A · 99,8% su B · 0 buchi** |
| blocchi nella fascia 8,5-21 car/s | ✓ tutti e 47 dentro |
| confini: coppie adiacenti di segno opposto | ✓ nessuna, su entrambe le tracce |
| scarto audio/video sulle clip | ✓ massimo 20 ms, su s07 |
| durata del montato locale ≥ 7:50 | ✓ **7:50.47** |
| sottotitoli SRT | ✓ 47 righe su 47 blocchi |

## Il montato

| | |
|---|---|
| montato locale | `montato-16.3.mp4` — **7:50.47**, 1920×1080, 25 fps |
| montato HeyGen | `b9071743cf8508facb28b29210a994e4` — **7:50.53** |
| render | 64 s |
| asset caricati | 96 al primo giro, 94 al secondo (copertina e chiusura riusate) |
| sottotitoli | `montato-16.3.srt`, 47 righe, coi tempi esatti dei blocchi |

## Costo misurato

```
voce, traccia A (3.935 car, eleven_v3, 286,8 s)     $0,649
voce, traccia B (3.927 car, eleven_v3, 242,5 s)     $0,648
trascrizione della traccia A                        $0,260
trascrizione della traccia B                        $0,220
                                                    -------
                                                     $1,777
```

**Il preventivo del servizio resta pessimistico di 2,2 volte**, esattamente come
sulla 16.1: `estimate_only` dava $2,87 per le due tracce, l'addebito e' stato
$1,297. Il rapporto e' un credito per carattere (3.935 e 3.927 crediti per
3.935 e 3.927 caratteri), quindi il costo della voce si calcola a mano meglio di
come lo stima il servizio. Chi decide se spendere guardando il preventivo
decide su un numero piu' che doppio.

Il re-taglio con il respiro, le 47 clip, i 96 caricamenti e il montaggio non
hanno aggiunto costo.

## Che cosa e' andato storto, e come si e' deciso

**La copertina si rompe in silenzio con un titolo su tre righe.** `layout.mjs`
tiene l'ente in posizione assoluta in fondo e la riga rossa nel flusso: con
tre righe di titolo il flusso cresce e **la riga finisce sopra il nome
dell'ente**. Il controllo di traboccamento non poteva vederlo, perche' confronta
`.corpo` con la cornice e li' niente sfora — si sovrappone. `cards.mjs` ora
misura l'intersezione fra i due rettangoli e la segnala: l'ha trovata da solo,
7px. Il titolo e' passato a due righe.

**`griglia` rende solo `t` e butta via `d` in silenzio.** I quattro elementi
della recovery erano entrati come celle con la definizione in `d` — e sulla
slide comparivano solo «Speranza», «Identita'», «Senso», «Responsabilita'»,
mentre la voce stava pronunciando le definizioni. E' lo stesso difetto «detto
ma non mostrato» della 16.2, ma stavolta la causa e' il modello, non i dati:
nessun errore, nessun avviso, il contenuto semplicemente non c'e'.
`layout.mjs` ora dichiara per ogni tipo quali chiavi legge dalle sue voci e
**solleva un'eccezione** su una chiave che non renderebbe. La scena e' passata
a `tre`, che rende `d`.

**Il controesempio del plurale paternalistico era a sua volta un plurale.**
La slide diceva: non «adesso **ci** laviamo», ma «le va se **facciamo**
l'igiene adesso?». La seconda e' la frase giusta della scena 7 del documento,
ma messa accanto alla prima insegna il contrario di quello che la slide
afferma. La correzione del plurale e' la seconda persona: «vuole lavarsi
adesso, o preferisce tra mezz'ora?».

**Il grassetto di un elenco e' verde in ogni tema.** Su un elenco `vietato` —
quelli con la × rossa, «che cosa non aiuta», «che cosa non compete» — il
grassetto verde accanto alla × rossa dice due cose opposte sulla stessa riga.
Tolto: la × porta gia' la polarita', il testo resta piano. Vale per quattro
scene (s13, s17, s19, s39).

**Il salto «di una pausa» per correggere un confine puo' valere sette
secondi.** s30 usciva a 22,6 car/s mentre s29 stava a 15,8: il confine era
messo tardi. `{"pause": -1}` l'ha spostato di 7,15 s, cioe' su una pausa
tutt'altra. Rifatto con `{"secondi": -1.1}`, che e' il controllo fine: s29 a
17,3 e s30 a 20,7, **zero blocchi fuori fascia**.

**Lo strumento di sintesi ha risposto malformato, due volte.**
`creative_generate_speech` e `creative_get_flow_run_status` violano lo schema
della risposta e il chiamante non riceve niente. Il primo tentativo poteva aver
avviato una generazione a pagamento senza dirmelo: **non ho ritentato alla
cieca**, ho letto il flow (che funziona) e ho visto `nodes: []`, cioe' nessuna
generazione e nessun addebito. La via che funziona e' in tre passi:
`creative_add_flow_node` (gratis, aggiunge senza eseguire) → leggere il
`node_id` → `creative_run_flow_nodes` con `generations_count: 1`. Stessa cosa
per lo stato: `creative_get_flow` espone `node_run_states` e basta.

## Da verificare — quello che non ho potuto giudicare io

- **I contenuti di merito non li ho verificati contro una fonte.** Le quattro
  riformulazioni, i quattro criteri, i quattro principi, i quattro elementi
  della recovery, il perimetro di cio' che compete e non compete sull'aderenza
  alla terapia: sono quelli del documento fornito. **Vanno riviste da chi
  conosce la materia**, a partire dall'elenco di cio' che non compete, che e'
  la parte con conseguenze pratiche piu' dirette.
- **Le aggiunte `AGG` sono mie.** Nessun fatto nuovo, ma il modo di dirli e' una
  mia scelta: che i quattro principi siano «verificabili», che «riproporre vuol
  dire tornare», che la parola che regge la definizione di recovery sia
  «anche». Vanno lette da chi insegna il corso.
- **Il velo rosa sta su otto scene**, piu' che nelle lezioni precedenti, perche'
  questa lezione e' fatta a coppie «aiuta / non aiuta» e il velo ha molto lavoro
  legittimo. Le ho guardate una per una e stanno tutte su contenuto correttivo,
  ma e' il tema che si prende per default: sulla 16.4 e la 16.5 va guardato di
  nuovo.
- **`CPS = 17.52` nel profilo e' ormai un valore di comodo.** Misurato 17,52
  sulla 16.2 e 18,31 qui. Serve solo a decidere quanti caratteri scrivere, e
  sbagliando del 4,5% in meno fa scrivere qualche carattere di troppo — che e'
  il verso sbagliato, perche' il respiro non sa accorciare. **Sulla 16.4
  conviene mirare piu' corto**, non piu' lungo.
- **L'SRT porta gli apostrofi del parlato** (`perche'`, `e'`) invece degli
  accenti veri. Riguarda tutte le lezioni del corso ed e' una decisione da
  prendere una volta.
- I `✓` e le frecce `→` non stanno nei sottoinsiemi latini dei due caratteri:
  li disegna un carattere di sistema. Vedi `slide/font/LICENZE.md`.
