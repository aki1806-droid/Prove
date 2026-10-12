# REGISTRO — 19.1 L'inglese del concorso: che cosa chiede, come si prepara, il lessico di base

Modulo 19 bonus (inglese per il concorso), lezione 1 di 5.
Corso di preparazione al concorso **OSS** Azienda Zero · CISL FP Padova Rovigo.

## Scheda parametri

Invariata rispetto alla 18.1: stessa voce, stesso modello (`eleven_v4`), lingua
fissata su italiano, stessa palette del logo, 7:50, nessuna musica. Lo stacco
fra le tracce e' `s26`, fine del capitolo 7 (gli oggetti del reparto).

Il documento del modulo chiede una voce multilingue e la verifica della
pronuncia inglese scena per scena. Prima di scrivere il copione c'e' stato un
**provino** (`progetti/_provini/m19-pronuncia-*.mp3`): lo stesso testo di
glossario, 553 caratteri con ventotto termini inglesi, letto con la lingua
fissata su italiano e con la lingua automatica. Scribe ha riconosciuto **tutti
e ventotto i termini in tutte e due le versioni**, frasi intere comprese («What
time is it?»). Si e' tenuta la lingua italiana, come nei moduli precedenti:
nessun termine isolato in un segmento a parte.

## L'aritmetica

```
caratteri scritti     6.157  ·  47 blocchi  ·  13 capitoli  ·  49 scene su 50
voce grezza           493,8 s   (A 247,5 · B 246,4)
lavorata netta        442,9 s   ·  CPS 13,90  ·  rapporto 1,115
respiro               +0,026 s su 46 blocchi = 1,2 s
montato locale        7:51.87
```

**La forchetta dei moduli in italiano non vale qui.** Il provino ha misurato
13,6 car/s su un testo da glossario («Ward, reparto. Bedpan, padella.»), contro
16,2-16,6 della prosa: ogni coppia inglese-italiano porta due pause. Il
copione di partenza, senza aggiunte, e' bastato da solo: respiro quasi nullo.

## Il copione di partenza non trasferisce cosi' com'e'

Il testo del documento, **nessuna aggiunta**. Una correzione di contenuto: «le
schede di queste cinque lezioni sono il glossario da portare con se'» diventa
«le slide di queste cinque lezioni sono il glossario da rivedere». Le schede
scaricabili non sono state fatte, e la voce non deve promettere un materiale
che non c'e'.

## La slide e' il glossario

Il documento chiede i termini inglesi «sempre in evidenza, con la traduzione
accanto». Le regole adottate per il modulo:

- il glossario e' una **`tabella` a due colonne, Inglese | Italiano**: la
  prima colonna esce in verde semibold da sola. Diciassette scene su 49;
- quando le voci sono nove brevi, una `griglia` 3×3 «**termine** · traduzione»
  (le parole di collegamento, le radici comuni);
- **fuori dalle tabelle il semibold e' solo per l'inglese**. Le parole
  italiane non si accentano: l'accento tondo (`*x*`) esce **rosso**, il colore
  che nel corso segna errori e trappole. Me ne sono accorto sui provini (s05,
  s06: «Traduzione», «Riconoscere» in rosso) e li ho tolti tutti;
- il documento dice «grassetto o arancio»: l'arancio non e' nella palette del
  logo, resta il grassetto;
- una riga `chiave` segna il termine che la voce dice «tra i piu' chiesti»
  (ward) o «che compare spesso» (next of kin);
- le radici comuni hanno la traduzione accanto anche se e' ovvia (s35): la
  prima versione aveva solo l'inglese, e la regola del documento non ha
  eccezioni.

Le traduzioni dei numeri (in cifre) e dei giorni della settimana non sono nel
documento, che li elenca solo in inglese.

49 scene: tabella 17 · elenco 9 · frase 7 · titolo 5 · griglia 3 · trappola 3
· memo 3 · copertina 2.

## Esito delle verifiche

| | |
|---|---|
| temi concordi fra `blocchi.json` e `contenuti.mjs` | ✓ 47 su 47 |
| traboccamento, copertine, serie a tappe | ✓ |
| provini guardati | ✓ tutti e 49, due volte |
| verifica per trascrizione, Scribe | ✓ **99,6% su A, 99,3% su B · 0 buchi** |
| tagli fra due parole, coi tempi di Scribe | ✓ 45 su 45 — **dopo una correzione** |
| blocchi nella fascia 8,5-21 car/s | ✓ tutti e 47 (9,2-18,3) |
| scarto audio/video sulle clip | ✓ massimo 10 ms |
| durata del montato locale ≥ 7:50 | ✓ **7:51.87** |
| sottotitoli SRT | ✓ 47 righe su 47 blocchi |

Un taglio **saltato alla pausa dopo** su s39 (traccia B: taglio a 144,26,
inizio di «Con la frase» a 143,36), corretto in `audio/correzioni.json` al
centro del silenzio vero (−1,10 s). E' lo stesso tipo d'errore della 18.3.

Gli scarti brevi:

- «healthcare» → «health care», «centre» → «center»: grafie di Scribe;
- «somiglia» → «assomiglia» (s36);
- **s44, «E never e always» → «And never and always»**. Questo e' un difetto
  vero della voce: una frase che **comincia con «E» seguita da un termine
  inglese** fa passare la voce all'inglese, e la congiunzione italiana diventa
  «and». A meta' frase non succede (s33 e il riepilogo dicono «never e
  always»). Il senso resta, la slide mostra la forma giusta, e rigenerare la
  traccia B costava una seconda trascrizione: e' rimasto cosi'. Dalla 19.2 il
  copione evita le frasi che cominciano con «E» + inglese.

## Il montato

| | |
|---|---|
| montato locale | `montato-19.1.mp4` — **7:51.87** |
| montato HeyGen | `aee8b8223420d2226624684b6d9f4f4c` — **7:50.55** |
| render | 74 s |
| asset caricati | 96 in un lotto solo, nessun 503 |

Perdita in consegna 1,32 s su 49 scene. Scaricato e controllato: 7:50.56,
1920×1080, audio presente. Al centro di s23 (3:17, il bagno, la cucina) i due
fotogrammi coincidono: scarto medio 0,2 su 255. Il confronto e' preso al
centro di una scena, come chiede la lezione della 18.5.

## Costo misurato

```
voce, due tracce (6.157 car, eleven_v4)          0 crediti
provino di pronuncia, due versioni               0 crediti
trascrizione dei provini (Scribe, 2 × 41 s)    454 crediti
trascrizione A (Scribe, 247,5 s)             1.361 crediti
trascrizione B (Scribe, 246,4 s)             1.355 crediti
```

## Da verificare — quello che non ho potuto giudicare io

- **La pronuncia inglese va ascoltata.** Scribe riconosce i termini, ma
  riconoscere non e' giudicare l'accento: un madrelingua capirebbe «ward»,
  «hoist», «next of kin» detti cosi'? Il provino e' in `progetti/_provini`.
- **Le sigle**: **ICU** (inglese «ai-si-iu» o italiano «i-ci-u»?) e **A and E**.
- **s44**, «And never and always»: vedi sopra.
- **I contenuti di merito sono del documento**, non verificati contro una
  fonte: in particolare «duecento parole coprono quasi tutti i quesiti» e
  «bastano due parole riconosciute su quattro».
- **Le schede scaricabili** consigliate dal documento non sono state fatte.
- **L'SRT porta gli apostrofi del parlato**: decisione ancora aperta.
