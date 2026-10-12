# REGISTRO — 17.1 Le cure palliative

Modulo 17 bonus (cure palliative, fine vita e accompagnamento), lezione 1 di 5.
Corso di preparazione al concorso **OSS** Azienda Zero · CISL FP Padova Rovigo.

## Scheda parametri

| | |
|---|---|
| copione di partenza | `origine/copione-di-partenza.md` — lezione 17.1 del documento bonus (`origine/modulo-17-completo.md`) |
| durata chiesta | **7:50** montati, come il modulo 16 |
| pausa musicale | **no** |
| stile | profilo del MASTER §8, invariato |
| palette | campionata dal logo: verde `#00623A`, rosso `#D70328` |
| | verde pieno `#004E2E` (affermazione), velo rosa `#FCF4F3` (errori) |
| marchio | logo CISL FP Padova Rovigo, in alto a sinistra |
| caratteri | Inter (testo), Source Serif 4 (frasi e citazioni) |
| voce | **nuova dal modulo 17**: clone di workspace `tVdVcJPudubxmTmAw4tE`, `eleven_v4`, `language_code: it` |
| ritmo | **piu' lento** del modulo 16, come chiede il documento: filtro `PAUSA_INTERNA 0,22 s` · `ATEMPO 1,04` (moduli 1-16: 0,14 · 1,12) |
| registro | sobrio, concreto, mai pietistico (dal documento). Tag: `[warm]` in apertura e in chiusura, `[thoughtful]` sul riepilogo, nient'altro |
| formato | 1920×1080, 25 fps, 16:9 |

> **Sul nome della voce.** Nel workspace il clone si chiama «Luca Ward». Non e'
> la voce dell'attore: e' una voce simile, e l'utente ha chiesto di usarla
> sapendolo. **Non va mai accreditata come Luca Ward**, ne' nei titoli ne' nei
> materiali del corso.

## L'aritmetica

```
durata chiesta        7:50 montati  =  470 s
copertina e chiusura  3 s + 10 s
pose dichiarate       14,4 s   (1,2 s a ogni cambio di capitolo, 12 cambi)
caratteri scritti     7.183   ·  46 blocchi  ·  13 capitoli  ·  48 scene su 50
                      156 car/blocco di media, il piu' lungo 210, tetto 225

previsto              CPS 16,6  ·  rapporto grezzo/lavorato 1,10
misurato              voce grezza 470,1 s  ->  lavorata netta 426,0 s
                      CPS netto 16,86      ·  rapporto 1,104
respiro               +0,402 s su 45 blocchi = 18,1 s
montato locale        7:51.84
```

La previsione veniva da un provino solo, di una frase, letto con il filtro nuovo.
Sulla lezione intera la voce e' andata l'**1,6% piu' veloce** del provino e il
rapporto e' rimasto quello: **1,104 contro 1,10**. Il respiro ha colmato i 18
secondi, dentro il tetto di 0,6 s per blocco con margine (0,40).

Per il resto del modulo: `CPS = 16,9` e `RAPPORTO_RITMO = 1,10` sono la base. Una
misura sola non fa una varianza: sulla voce del modulo 16 il CPS oscillava del
4% fra una lezione e l'altra, e qui potra' fare lo stesso.

## Il ritmo piu' lento, misurato e non a orecchio

Il documento chiede un «ritmo di lettura leggermente piu' lento rispetto agli
altri moduli». Non si chiede alla voce di andare piano — non obbedisce in modo
costante — si cambia il filtro che gia' accorcia le pause e accelera il
parlato. Quattro tarature sullo stesso provino:

| pausa interna | atempo | car/s | |
|---|---|---|---|
| 0,14 s | 1,12 | 18,37 | il filtro dei moduli 1-16 |
| 0,20 s | 1,06 | 17,01 | |
| **0,22 s** | **1,04** | **16,59** | scelto: −10% |
| 0,25 s | 1,00 | 15,80 | troppo: le frasi si sfilacciano |

I due numeri sono passati da dentro `tagli.py` a `profilo.py`, accanto alla
voce: sono della voce e del modulo, non dello strumento.

## Il copione di partenza non trasferisce cosi' com'e'

Le 13 scene di partenza stanno a ~506 caratteri l'una, il tetto per blocco e'
225: ogni scena diventa tre o quattro blocchi, nello stesso ordine. Le aggiunte
sono marcate `AGG` in `copione/costruisci.py`, e sono tutte del «come»:

- «Non solo alla fine.» — anticipa l'equivoco del capitolo 4;
- «lo ritroverai nella quinta lezione, sulle scelte di fine vita» — un rimando;
- «Chi le immagina cosi' le chiama troppo tardi.» — la conseguenza pratica;
- «come la pressione o la temperatura» — che cosa vuol dire «parametro»;
- «Senza quell'osservazione, l'equipe decide con un'informazione in meno.»;
- «Ascoltarlo fa parte dell'assistenza, non e' un'eccezione.»

Tre ritocchi non marcati, piccoli: «a vivere quegli anni nel modo migliore
possibile» chiude la frase sull'inguaribilita'; «bassa tecnologia e alta
intensita' assistenziale» passa dal riquadro visivo del documento al parlato;
«pensata per la persona e per la famiglia» la completa.

**Una correzione al documento**: la scena 7 diceva «l'hospice merita una scena
a se'». E' un riferimento visivo, che le regole del documento stesso escludono
dal parlato: e' diventato «un discorso a parte».

## Il repertorio dei tipi

48 scene: copertina 2 · frase 10 · titolo 9 · elenco 9 · icone 7 ·
sostituzione 2 · trappola 2 · tre 2 · tabella 2 · citazione 1 · norma 1 ·
confronto 1.

- **velo rosa** (`tenue`) su tre scene, tutte correttive: s11 («non sono solo le
  cure degli ultimi giorni») e s40-s41, le parole da non dire con quelle giuste;
- **sostituzione** solo dove c'e' davvero uno sbagliato e un giusto: s03 («la
  rinuncia alla cura» → «una forma di cura») e s31 («un visitatore» → «parte
  dell'equipe»);
- **confronto** per due cose da distinguere senza che una sia sbagliata: s12,
  cure precoci o simultanee e fase terminale.

## Esito delle verifiche

| | |
|---|---|
| temi concordi fra `blocchi.json` e `contenuti.mjs` | ✓ 48 su 48 |
| nessun tipo butta via una chiave | ✓ |
| traboccamento della cornice | ✓ nessuna slide sfora |
| copertina: riga rossa e ente non si toccano | ✓ |
| serie a tappe col tema concorde | ✓ |
| provini guardati | ✓ tutti e 48, **tre difetti corretti** (vedi sotto) |
| verifica per trascrizione, Scribe | ✓ **100,0% su A e su B · 0 buchi** |
| **tagli fra due parole, coi tempi di Scribe** | ✓ **44 su 44** (controllo nuovo, vedi sotto) |
| blocchi nella fascia 8,5-21 car/s | ✓ tutti e 46 dentro (12,5-19,5) |
| confini: coppie adiacenti di segno opposto | ✓ nessuna |
| scarto audio/video sulle clip | ✓ massimo 20 ms, su s19 |
| durata del montato locale ≥ 7:50 | ✓ **7:51.84** |
| sottotitoli SRT | ✓ 46 righe su 46 blocchi |

## Tre difetti trovati sui provini

Nessuno dei tre lo vedeva un controllo automatico.

1. **La citazione rientrava a sinistra la prima riga.** Il modello `citazione`
   applica un rientro negativo di mezza lettera per «appendere» la virgoletta
   d'apertura fuori dal margine. Ma il testo dell'OMS non apre con «: la prima
   riga usciva dalla colonna e la seconda no. Il rientro ora si applica solo se
   il testo comincia davvero con «. Lo stesso difetto c'era, meno visibile
   perche' su una riga sola, sulla citazione della 16.2.
2. **Le card del ruolo dell'OSS andavano a capo una parola per riga.** Sei card
   affiancate sono strette: «Sostegno / al / caregiver», «Comfort, / non /
   routine». E il grassetto dentro i titoli li faceva **bicolori**, rosso e
   verde nella stessa riga. I titoli sono diventati una parola sola («Comfort»,
   «Sostegno», «Segnalazione») e il resto e' sceso nella descrizione.
3. **Nella tabella, due delle tre righe chiave non si evidenziavano.** La riga
   chiave ha lo sfondo rosato; la zebratura delle righe pari ha una regola CSS
   piu' specifica e vinceva sulle righe 2 e 4. Si vedeva una riga chiave su
   tre. La regola chiave ora ha la stessa specificita' e viene dopo.

## La verifica per trascrizione e' tornata quella vera

Sulla 16.5 il servizio rispondeva malformato su ogni strumento che crea un asset
audio, e la verifica era stata fatta con un riconoscitore locale, con riserva.
Qui `creative_attach_reference_file` sull'URL firmato della traccia ha
funzionato al primo colpo, e `creative_transcribe_audio` con `eleven_scribe_v1`
ha restituito il testo.

**Controprova del MASTER, superata**: accentate vere (`è`, `perché`, `équipe`),
nessun tag, numeri riscritti in cifre («modulo 17», «legge 38 del 2010»).
Non e' il copione rimandato indietro.

Risultato: **594 parole su 594 e 564 su 564**, nessuna sostituzione breve. E'
la prima volta al 100% pieno; sul modulo 16 con Scribe si stava al 99,7%. La
voce nuova, su questo testo, non ha saltato ne' storpiato niente.

## Un controllo nuovo: i tagli si misurano coi tempi delle parole

Scribe restituisce anche **inizio e fine di ogni parola**
(`audio/trascrizioni/A-parole.json`, `B-parole.json`). Allineato il copione
sulla trascrizione, ogni confine fra due blocchi ha un'ultima parola detta e
una prima parola detta, e il taglio deve stare in mezzo. Lo fa
`audio/confini-parole.py`:

```
traccia A  23 tagli · 594/594 parole con un tempo   ok 23
traccia B  21 tagli · 564/564 parole con un tempo   ok 21
silenzio fra i blocchi 0,32-0,98 s · il taglio cade sempre vicino al centro
```

E' piu' forte dei due controlli che c'erano. `prova.mp3` indovina il confine
dalla somiglianza di un frammento di 1,6 s, e costa una trascrizione in piu';
`verifica-locale.py` vede solo la firma statistica di un confine spostato.
Questo misura in secondi, su tutti i confini, con la trascrizione che si fa
comunque per i buchi. `prova.mp3` qui non e' stata trascritta: non serviva.

## Il 1,30 murato dentro `tagli.py` c'era ancora

Sulla 16.5 il rapporto grezzo/lavorato era passato da dentro il codice a
`profilo.py`. Ma solo in uno dei due punti: `quanto_male`, la funzione che
sceglie la soglia di pausa confrontando le soglie fra loro, divideva ancora per
**1,30 scritto a mano**. Con la voce nuova il rapporto vero e' 1,10: la stima
della velocita' usciva il 18% troppo alta.

Corretto con `RAPPORTO_RITMO`, rilanciato `allinea`: **i confini sono rimasti
identici**, byte per byte, su entrambe le tracce. Il numero sbagliato pesava
tutte le soglie allo stesso modo e la classifica non cambiava. Stavolta non ha
fatto danno; con un rapporto ancora piu' lontano avrebbe potuto.

## Il montato

| | |
|---|---|
| montato locale | `montato-17.1.mp4` — **7:51.84**, 1920×1080, 25 fps |
| montato HeyGen | _(in render)_ |
| asset caricati | 94 in un lotto solo |
| sottotitoli | `montato-17.1.srt`, 46 righe, coi tempi esatti dei blocchi |

## Costo misurato

```
voce, traccia A (3.660 car, eleven_v4, 231,8 s)        0 crediti
voce, traccia B (3.569 car, eleven_v4, 238,3 s)        0 crediti
trascrizione A (Scribe, 231,8 s)                    1.275 crediti   $0,210
trascrizione B (Scribe, 238,3 s)                    1.311 crediti   $0,216
                                                   ------
                                                    $0,427
```

**La voce v4 continua a costare zero** su questo workspace, come nei provini.
Non e' detto che duri: va ricontrollato a ogni lezione, e se cambia il costo
del modulo cambia di ordine di grandezza (in v3 era un credito per carattere).
Le trascrizioni costano **5,5 crediti al secondo**, circa $0,055 al minuto.

## Da verificare — quello che non ho potuto giudicare io

- **I contenuti di merito non li ho verificati contro una fonte.** La
  definizione OMS, i principi, la legge 38/2010 e cio' che istituisce, i
  livelli della rete, l'equipe, il ruolo dell'OSS: sono quelli del documento
  fornito. Vanno riletti da chi conosce la materia. In particolare **«talvolta
  anche la durata»** delle cure precoci e **«gratuito, a carico del Servizio
  Sanitario Nazionale»** per tutti i livelli sono affermazioni che un
  candidato ripetera' all'esame.
- **«Cambia che cosa»** (s40). Nel copione e' un'affermazione: c'e' molto da
  fare, e quello che cambia e' *che cosa* si fa. Scribe l'ha trascritta con il
  punto interrogativo, «Cambia che cosa?», e lo stesso su «Che cosa cambia
  rispetto all'assistenza ordinaria?» (s36). Scribe mette la punteggiatura
  dall'intonazione: **e' probabile che la voce le abbia lette come domande**.
  Su s36 regge (e' un titolo di capitolo); su s40 il senso si sposta. Va
  ascoltato. Se suona come domanda, si rigenera solo il blocco s40 riscritto
  («...c'e' molto da fare: cambia cosa si fa»).
- **«L'OSS»** con la voce v4: Scribe lo trascrive sempre come sigla, ma non
  dice come e' stato pronunciato. Nei provini v4 tutte e sette le voci
  leggevano «L'OSS» come una parola, «loss». Va ascoltato almeno una volta (s02,
  la seconda frase della lezione).
- **Le aggiunte `AGG` e i tre ritocchi** elencati sopra sono mie. Nessun fatto
  nuovo, ma il modo di dirli e' una mia scelta.
- **Il velo rosa sta su tre scene** (s11, s40, s41), tutte su contenuto
  correttivo.
- **L'SRT porta gli apostrofi del parlato** (`perche'`, `e'`) invece degli
  accenti veri. Riguarda tutte le lezioni del corso ed e' **una decisione da
  prendere una volta sola**; e' ancora aperta.
- I `✓`, le `×` e le frecce `→` non stanno nei sottoinsiemi latini dei due
  caratteri: li disegna un carattere di sistema. Vedi `slide/font/LICENZE.md`.
