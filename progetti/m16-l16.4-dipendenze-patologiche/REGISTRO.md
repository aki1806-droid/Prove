# REGISTRO — 16.4 Le dipendenze patologiche

Modulo 16 bonus, lezione 4 di 5. Corso di preparazione al concorso **OSS**
Azienda Zero · CISL FP Padova Rovigo.

## Scheda parametri

| | |
|---|---|
| copione di partenza | `origine/copione-di-partenza.md` — lezione 16.4 del documento bonus |
| durata chiesta | **7:50** montati, come le tre lezioni precedenti |
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
caratteri scritti     7.689   ·  48 blocchi  ·  13 capitoli  ·  50 scene su 50
                      160 car/blocco di media, il piu' lungo 223, tetto 225

misurato              voce grezza 543,3 s  ->  lavorata netta 436,2 s
                      CPS netto 17,63          (17,52 sulla 16.2, 18,31 sulla 16.3)
                      rapporto grezzo/lavorato 1,246  (1,252 e 1,240 prima)
                      respiro +0,168 s su 47 blocchi  ->  parlato 458,5 s
                      montato locale 7:51.76  ->  consegnato 7:50.55
stacco tracce         s25  ·  chunkA 3.931 car  ·  chunkB 3.758 car
temi                  30 chiaro · 12 profondo · 8 tenue
tipi di scena         frase 17 · elenco 14 · titolo 11 · confronto 3 · icone 2
                      · sostituzione 1 · copertina 2
tag di intenzione     3  (warm, thoughtful, warm)
```

## Il respiro e l'arrotondamento, al primo giro

E' la prima lezione che nasce con i due correttivi gia' nel profilo, e si vede
nel conto delle rilavorazioni: **zero**. La 16.3 era uscita 7:34.2 al primo
taglio e 7:49.06 al primo render, e aveva dovuto rifare taglio, clip e
caricamenti.

```
respiro           +0,168 s su 47 blocchi   (bersaglio 471,5 s
                  = 470 chiesti + 0,030 x 50 scene di arrotondamento)
montato locale    471,76 s
consegnato        470,55 s      perdita 1,21 s  =  24 ms a scena
```

Il respiro e' servito poco perche' il copione era gia' quasi in misura: 0,168 s
a blocco contro gli 0,375 della 16.3. La previsione di perdita era 1,50 s, la
perdita reale 1,21: **l'arrotondamento e' stato leggermente generoso**, e il
consegnato e' uscito 0,55 s sopra i 7:50 invece dei 0,03 attesi. Verso giusto.

| | locale | consegnato | perdita | scene | ms/scena |
|---|---|---|---|---|---|
| 16.1 | 470,80 | 469,62 | 1,18 | 48 | 25 |
| 16.2 | 473,60 | 472,27 | 1,33 | 48 | 28 |
| 16.3 | 470,47 | 469,06 | 1,41 | 49 | 29 |
| 16.3 (rifatta) | 471,88 | 470,53 | 1,35 | 49 | 28 |
| 16.4 | 471,76 | 470,55 | 1,21 | 50 | **24** |

Cinque misure fra 24 e 29 ms a scena, sempre in perdita. `ARROTONDA_SCENA =
0.030` resta un po' largo ma e' il verso sicuro: tenerlo.

### Il CPS, terza misura

17,52 · 18,31 · **17,63**. Tre lezioni, stessa voce, stesso modello, stesse
impostazioni: **il 4,5% di escursione**. Il `CPS` del profilo serve solo a
decidere quanti caratteri scrivere, e il consiglio lasciato dalla 16.3 —
«mirare piu' corto» — ha funzionato: 7.689 caratteri invece dei 7.817 della
16.3, con un blocco in piu'. Il respiro ha colmato senza sforzo.

Il rapporto grezzo/lavorato invece e' **stabile alla terza cifra**: 1,252,
1,240, 1,246. La variabilita' sta nella lettura, non nel filtro di ritmo.

## Il copione di partenza non trasferisce cosi' com'e'

Il documento bonus porta **13 scene** a ~505 caratteri l'una: oltre venti
secondi a inquadratura, contro il tetto di 225 caratteri per blocco del MASTER
§2. I 13 argomenti restano nell'ordine in cui stanno; cambia il taglio, in 48
blocchi.

Il parlato di partenza misurava **6.556 caratteri**. I ~1.130 aggiunti sono
segnati `AGG` in `costruisci.py` e sono **il come**: perche' tolleranza e
astinenza contano (sono la parte che si vede dal di fuori), che cosa osserva
l'OSS e che cosa invece non gli spetta chiedere, il rimando al modulo
quattordici sul segreto. **Nessun fatto nuovo** — ne' clinico, ne' normativo,
ne' sui servizi: questa lezione nomina leggi, livelli essenziali di assistenza
e competenze, e inventarci sopra sarebbe il modo peggiore di sbagliare.

**La regola di lingua di questa lezione e' piu' stretta del solito, e la
lezione stessa la enuncia**: «persona con dipendenza», mai «drogato» ne'
«alcolizzato». I due termini compaiono una volta sola in tutta la lezione,
sulla scena che insegna a non usarli (s33), e li' compaiono **sbarrati**: non
si insegna a evitare una parola senza dirla.

## Esito delle verifiche

| controllo | esito |
|---|---|
| vincoli di `costruisci.py` | ✓ `OK, nessun errore` |
| scene ≤ 50 | ✓ **50, esattamente al tetto** |
| blocchi ≤ 225 car | ✓ il piu' lungo e' 223 |
| vocali accentate nel parlato | ✓ nessuna |
| tag di intenzione ≤ 6 | ✓ 3 |
| ogni cambio di capitolo porta una posa | ✓ 12 su 12 |
| copione riscritto vs. copione di partenza | ✓ 0 termini di contenuto persi |
| temi concordi fra `blocchi.json` e `contenuti.mjs` | ✓ 50 su 50 |
| le 50 scene generano HTML | ✓ nessuna eccezione, nessun `undefined` |
| nessun tipo butta via una chiave | ✓ |
| traboccamento della cornice | ✓ nessuna slide sfora, coi caratteri e il logo veri |
| copertina: riga rossa e ente non si toccano | ✓ |
| serie a tappe col tema concorde | ✓ dopo la correzione di s38 (**vincolo nuovo**) |
| provini guardati | ✓ tutti e 50 |
| verifica per trascrizione | ✓ **99,7% su A · 100,0% su B · 0 buchi** |
| blocchi nella fascia 8,5-21 car/s | ✓ tutti e 48 dentro |
| confini: coppie adiacenti di segno opposto | ✓ nessuna, su entrambe le tracce |
| scarto audio/video sulle clip | ✓ massimo 20 ms, su s17 |
| durata del consegnato ≥ 7:50 | ✓ **7:50.55** |
| sottotitoli SRT | ✓ 48 righe su 48 blocchi |

## Il montato

| | |
|---|---|
| montato locale | `montato-16.4.mp4` — **7:51.76**, 1920×1080, 25 fps |
| montato HeyGen | `909ec984c1d96a03ddd342f399b1cfd6` — **7:50.55** |
| render | 61 s |
| asset caricati | 98 in un lotto, piu' 1 rifatto (s38) |
| sottotitoli | `montato-16.4.srt`, 48 righe, coi tempi esatti dei blocchi |

Il primo montaggio portava s38 col tema sbagliato: e' stato rifatto e il
primo cancellato, per non lasciare in giro due video quasi uguali.

## Costo misurato

```
voce, traccia A (3.931 car, eleven_v3, 281,9 s)     $0,652
voce, traccia B (3.758 car, eleven_v3, 261,5 s)     $0,624
trascrizione della traccia A                        $0,256
trascrizione della traccia B                        $0,237
                                                    -------
                                                     $1,769
```

**Il rapporto e' ancora un credito per carattere** (3.931 e 3.758 crediti per
3.931 e 3.758 caratteri). Terza lezione di fila in cui il preventivo del
servizio e' pessimistico di circa 2,2 volte: chi decide se spendere guardando
`estimate_only` decide su un numero piu' che doppio.

Il ri-render di s38, il suo caricamento e il secondo montaggio non hanno
aggiunto costo: solo macchina.

## Che cosa e' andato storto, e come si e' deciso

**Una serie a tappe cambiava fondo a meta'.** s38, s39 e s40 sono la stessa
slide — «Che cosa non fa l'OSS», lo stesso elenco scoperto in tre tempi — ma
s38 era `chiaro` e le altre due `tenue`. Nel montato il fondo passa da bianco a
rosa fra una scena e l'altra, dentro la stessa frase. Nessun controllo di forma
poteva prenderlo: le tre slide sono valide una per una, e il difetto esiste
**solo nel confronto fra loro**. L'ho visto guardando i provini.

`cards.mjs` ora raggruppa le scene per sopratitolo e **segnala le serie col
tema discorde**. Messo in piedi, ha trovato esattamente s38 e nient'altro:

```
SERIE CON TEMI DISCORDI (stesso sopratitolo, fondo diverso):
  s38:chiaro s39:tenue s40:tenue
```

E' il quarto difetto di questa famiglia nel modulo — detto-ma-non-mostrato
(16.2), chiave buttata via (16.3), plurale nel controesempio (16.3) — e tutti e
quattro li ha trovati l'occhio, non il controllo. Ogni volta il controllo e'
arrivato dopo.

**`sostituzione` usata dove i due lati non sono giusto e sbagliato.** s06
metteva tolleranza e astinenza a confronto con la freccia e lo sbarrato, come
se la tolleranza fosse l'errore da correggere. Sono due termini **da
distinguere**, non uno sbagliato e uno giusto: passato a `confronto`. E' lo
stesso errore della tabella ✓/× della 16.2.

**`vietato` usato sulle conseguenze, non sui comportamenti.** s32 elencava con
la × rossa vergogna, ritardo nella richiesta di aiuto e abbandono delle cure:
sono gli **effetti dello stigma**, non cose che l'OSS non deve fare. La × li
trasformava in divieti rivolti all'operatore. Passato a `elenco` piano su
`tenue`, col grassetto tolto.

**Il copione e' stato riequilibrato tre volte.** Prima 6.678 caratteri (6:48,
un minuto sotto), poi un blocco a 250 caratteri sopra il tetto, poi un altro a
227. Si e' chiuso a 7.689 caratteri in 48 blocchi e **50 scene esatte, al tetto,
senza margine**: una scena in piu' e la lezione non ci stava.

**Due rese fonetiche, non corrette.** La trascrizione segnala `ULSS` letto
«uls» e `alcologici` letto «alcolologici». Nessun buco nel parlato: la voce ha
detto tutto. Sono due parole intelligibili e rifare la traccia per questo
sarebbe costato una voce intera.

## Da verificare — quello che non ho potuto giudicare io

- **I contenuti di merito non li ho verificati contro una fonte.** Le
  definizioni di tolleranza e astinenza, le due famiglie di dipendenza, il
  gioco d'azzardo nei LEA, i segni dell'astinenza da alcol e il delirium
  tremens, che cosa offre il SerD, la riduzione del danno, il perimetro di cio'
  che l'OSS fa e non fa: sono quelli del documento fornito. **Vanno riviste da
  chi conosce la materia**, a partire dall'elenco di cio' che non compete, che
  e' la parte con conseguenze pratiche piu' dirette, e dai riferimenti ai
  livelli essenziali di assistenza.
- **Le aggiunte `AGG` sono mie.** Nessun fatto nuovo, ma il modo di dirli e' una
  mia scelta: che tolleranza e astinenza siano «la parte che si vede dal di
  fuori», che «il sospetto si riferisce, non si agisce», che chiedere «quanto,
  da quanto tempo, perche'» chiuda la porta a chi quelle domande le fara' dopo.
  Vanno lette da chi insegna il corso.
- **Il velo rosa sta su otto scene**, come sulla 16.3. Le ho guardate una per
  una: s32 e' stata corretta perche' il velo c'era ma la × no, le altre sette
  stanno su contenuto correttivo o su un fraintendimento da smontare. Sulla
  16.5 va guardato di nuovo.
- **Il repertorio di tipi di scena si e' ristretto.** Sette tipi contro i nove
  della 16.3, e `frase` + `titolo` fanno 28 scene su 50. La materia e'
  enumerativa — definizioni, famiglie, servizi, competenze — e l'elenco e'
  onesto, ma **mezza lezione sullo stesso impianto si sente**. Sulla 16.5
  conviene decidere il tipo prima di scrivere il blocco, non dopo.
- **`CPS = 17.52` nel profilo resta un valore di comodo**, ormai con tre misure
  sopra (17,52 · 18,31 · 17,63). Continua a servire solo per dimensionare il
  copione, e mirare corto si conferma la scelta giusta: il respiro non sa
  accorciare.
- **L'SRT porta gli apostrofi del parlato** (`perche'`, `e'`) invece degli
  accenti veri. Riguarda tutte le lezioni del corso ed e' **una decisione da
  prendere una volta**, non lezione per lezione. E' la quarta volta che la
  segnalo.
- I `✓`, le `×` e le frecce `→` non stanno nei sottoinsiemi latini dei due
  caratteri: li disegna un carattere di sistema. Vedi `slide/font/LICENZE.md`.
