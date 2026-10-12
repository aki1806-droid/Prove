# REGISTRO — 17.3 La relazione con la persona e con la famiglia

Modulo 17 bonus (cure palliative, fine vita e accompagnamento), lezione 3 di 5.
Corso di preparazione al concorso **OSS** Azienda Zero · CISL FP Padova Rovigo.

## Scheda parametri

Invariata rispetto alla 17.1 (vedi il suo registro): 7:50 montati, niente
musica, palette dal logo, voce clone di workspace `tVdVcJPudubxmTmAw4tE` su
`eleven_v4`, filtro lento (pausa interna 0,22 s, atempo 1,04), registro sobrio.
Lo stacco fra le tracce e' `s25`, fine del capitolo 7 (la famiglia).

## L'aritmetica

```
caratteri scritti     7.065  ·  46 blocchi  ·  13 capitoli  ·  48 scene su 50
voce grezza           485,9 s   (A 261,2 · B 224,7)
lavorata netta        431,1 s   ·  CPS 16,39  ·  rapporto 1,127
respiro               +0,291 s su 45 blocchi = 13,0 s
montato locale        7:51.80
```

Scritto dentro la forchetta ricavata sulla 17.2 (7.050-7.150 caratteri), e al
primo colpo: la voce ha letto a 16,39, in mezzo alle due velocita' viste, e il
respiro ha colmato 13 s. **Quattro misure della voce nuova: 16,86 · 16,12 ·
16,27 · 16,39.**

## Il copione di partenza non trasferisce cosi' com'e'

6.543 caratteri di partenza, 7.065 scritti. Le aggiunte sono marcate `AGG` e
quasi tutte vengono **dallo schermo dello stesso documento**, che nel parlato
non c'era: «che cosa dire, che cosa non dire, che cosa fare quando le parole
non ci sono» (scena 1), «la rabbia non e' personale» e «non si fa da
messaggero» nel riepilogo. Le altre sono del «come»: il patto del silenzio
«va riportato all'equipe, non gestito da soli» e «il silenzio intorno a lei
non la protegge, la lascia sola con quello che sa»; «e' la via d'uscita piu'
facile»; «il compito dell'OSS e' segnalare, non risolvere»; «le risposte
cambiano da una famiglia all'altra, anche nella stessa religione»; il nome
intero di **Elisabeth** Kübler-Ross.

**Una correzione al documento.** La scena 5 diceva: «ricordare la frase della
legge duecentodiciannove: il tempo dato all'ascolto e' tempo di cura». La legge
219/2017 (art. 1, comma 8) dice **«il tempo della comunicazione tra medico e
paziente costituisce tempo di cura»**. Il parlato riporta la formula della
legge, non la parafrasi: «il tempo della comunicazione e' tempo di cura».

## Il repertorio dei tipi

48 scene: copertina 2 · titolo 13 · elenco 13 · frase 12 · griglia 3 · tre 2 ·
confronto 1 · icone 1 · sostituzione 1.

- **velo rosa** su otto scene, tutte su che cosa NON si fa o NON si dice: il
  patto del silenzio (s07), le tre risposte sbagliate a «sto morendo?» (s09,
  s10), il consolare e il confrontare (s17), il parlare della persona come se
  non ci fosse (s21), il prendere posizione nei conflitti (s31), le frasi da
  evitare (s41, s42);
- **confronto** per i due diritti, di sapere e di non sapere (s05): sono due
  cose da distinguere, non una giusta e una sbagliata;
- **sostituzione** solo dove c'e' davvero uno sbagliato: presumere contro
  chiedere (s39);
- le **fasi di Kübler-Ross** stanno in una griglia (s13), non in una catena con
  le frecce: la lezione dice proprio che non sono tappe in fila.

Due difetti trovati dai controlli automatici e corretti: il titolo di copertina
su tre righe toccava la riga rossa (accorciato in «La relazione / e la
famiglia»), e due scene di serie diverse condividevano il sopratitolo «L'OSS»
con temi diversi (rinominato in «Nei conflitti, l'OSS»).

## Esito delle verifiche

| | |
|---|---|
| temi concordi fra `blocchi.json` e `contenuti.mjs` | ✓ 46 su 46 |
| traboccamento, copertine, serie a tappe | ✓ (dopo le due correzioni sopra) |
| provini guardati | ✓ tutti e 48 |
| verifica per trascrizione, Scribe | ✓ **100% su A e su B · 0 buchi** |
| tagli fra due parole, coi tempi di Scribe | ✓ 44 su 44 — **dopo due correzioni**, vedi sotto |
| blocchi nella fascia 8,5-21 car/s | ✓ tutti e 46 (13,1-18,0) |
| scarto audio/video sulle clip | ✓ massimo 10 ms |
| durata del montato locale ≥ 7:50 | ✓ **7:51.80** |
| sottotitoli SRT | ✓ 46 righe su 46 blocchi |

## Due tagli dentro una parola

Sulla traccia A l'allineamento ha scelto una soglia di pausa di **0,10 s**, la
piu' bassa provata. Abbastanza bassa da scambiare per una pausa **la chiusura
di una consonante**: due tagli sono caduti dentro una parola, sull'occlusione
della doppia *t* di «tu|tto» (fine di s06) e della *p* di «col|pa» (fine di
s23). La coda della parola sarebbe finita nella scena dopo.

```
FUORI  s07  fine  52.16 | taglio  51.99 | inizio  52.86
FUORI  s24  fine 244.22 | taglio 244.06 | inizio 244.74
```

`silencedetect` li fa vedere: 0,15 s di silenzio dentro «tutto», poi la pausa
vera di 0,61 s. Corretti in `audio/correzioni.json` al centro della pausa vera
(+0,52 s e +0,42 s).

**E' la seconda lezione di fila in cui `confini-parole.py` prende un errore
vero.** Questo tipo — il taglio dentro una parola — e' anche il piu' difficile
da sentire: un decimo di secondo di consonante che passa nella scena dopo.

## Il montato

| | |
|---|---|
| montato locale | `montato-17.3.mp4` — **7:51.80** |
| montato HeyGen | `c841ac838056d4449553290f8174e7c4` — **7:50.53** |
| render | 162 s |
| asset caricati | 94 in un lotto solo |

Perdita in consegna 1,27 s su 48 scene, 26 ms a scena. Scaricato e
controllato: 7:50.52, audio presente (media −26 dB); al minuto 3:00 c'e' s19,
il non verbale, come nel montato locale.

## Costo misurato

```
voce, due tracce (7.065 car, eleven_v4)          0 crediti
trascrizione A (Scribe, 261,2 s)             1.437 crediti
trascrizione B (Scribe, 224,7 s)             1.236 crediti
```

## Da verificare — quello che non ho potuto giudicare io

- **I contenuti di merito non li ho verificati contro una fonte**, se non il
  comma della legge 219/2017 corretto sopra. Il diritto di non sapere, il patto
  del silenzio, le risposte a «sto morendo?», le fasi di Kübler-Ross, le frasi
  da evitare: sono quelli del documento.
- **Le frasi citate** («ma no, vedra' che si riprende», «chiedo
  all'infermiere», «conosco uno che»...) la voce le legge dentro il discorso,
  senza virgolette. Scribe le ha trascritte tutte; se si sentano come citazioni
  e non come parole del narratore, va ascoltato.
- **«Kübler-Ross»** detto da una voce italiana: va ascoltato.
- **Le aggiunte `AGG`** sono mie, elencate sopra.
- **L'SRT porta gli apostrofi del parlato**: decisione ancora aperta.
