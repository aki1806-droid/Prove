# REGISTRO — 18.3 Gli ausili per la vita quotidiana, il bagno, il letto e l'ambiente

Modulo 18 bonus (ausili, presidi e tecnologie assistive), lezione 3 di 5.
Corso di preparazione al concorso **OSS** Azienda Zero · CISL FP Padova Rovigo.

## Scheda parametri

Invariata rispetto alla 18.1 (vedi il suo registro). Lo stacco fra le tracce e'
`s25`, fine del capitolo 7 (il WC).

## L'aritmetica

```
caratteri scritti     7.045  ·  47 blocchi  ·  13 capitoli  ·  49 scene su 50
voce grezza           469,7 s   (A 243,7 · B 226,0)
lavorata netta        423,9 s   ·  CPS 16,62  ·  rapporto 1,108
respiro               +0,438 s su 46 blocchi = 20,1 s
montato locale        7:51.82
```

La voce ha letto piu' veloce delle lezioni prima (16,62 contro 16,40 e 16,32)
e il respiro e' salito a 0,44 s a blocco: sotto il tetto di 0,6, e il motivo
per cui la forchetta tiene il bordo basso a 7.020.

## Il copione di partenza non trasferisce cosi' com'e'

6.947 caratteri di partenza, circa 7.010 con gli apostrofi: appena sotto la
forchetta. Tre aggiunte, tutte dallo schermo dello stesso documento: «tra
l'altezza dell'anca e quella della spalla», «il rialzo fissato bene», «il
cuscino antidecubito per la carrozzina segue lo stesso principio, **per la
seduta**». **Nessun fatto nuovo.**

## Il repertorio dei tipi

49 scene: elenco 14 · frase 11 · titolo 6 · griglia 6 · tre 4 · memo 4 ·
copertina 2 · norma 1 · citazione 1.

- Le liste di piccoli ausili (alimentazione, vestizione, igiene, bagno,
  incontinenza, ambiente) sono **elenchi con la descrizione sotto**, cioe' a
  chi servono, scoperti a tappe come li dice la voce: il nome dell'ausilio da
  solo non insegna niente.
- **velo rosa** sugli errori che i quiz chiedono: beccuccio e cannuccia nella
  disfagia (s09, s10), il presidio piu' assorbente «caricato» (s29), le
  traverse multiple (s33).
- I maniglioni **a ventosa** stanno nella descrizione dei maniglioni a muro
  (s20): ci avevo messo una `sostituzione` sulla scena dopo, ma la voce lo
  dice dentro l'elenco degli ausili del bagno, e la slide deve stare dove
  sta la voce.
- La frase da riferire al terapista occupazionale e' una citazione (s43).

## Esito delle verifiche

| | |
|---|---|
| temi concordi fra `blocchi.json` e `contenuti.mjs` | ✓ 47 su 47 |
| traboccamento, copertine, serie a tappe | ✓ |
| provini guardati | ✓ tutti e 49 |
| verifica per trascrizione, Scribe | ✓ **99,7% su A, 98,7% su B · 0 buchi** |
| tagli fra due parole, coi tempi di Scribe | ✓ 45 su 45 — **dopo due correzioni**, vedi sotto |
| blocchi nella fascia 8,5-21 car/s | ✓ tutti e 47 (9,0-18,0) |
| scarto audio/video sulle clip | ✓ massimo 20 ms |
| durata del montato locale ≥ 7:50 | ✓ **7:51.82** |
| sottotitoli SRT | ✓ 47 righe su 47 blocchi |

Gli scarti brevi sono rese: «infilacalze» e «infilabottoni» staccati,
«centimetri» → «cm», l'anno in cifre, e **«la cute» → «l'acute»** (s28), vedi
«Da verificare».

## Due tagli in ritardo

`confini-parole.py` ha trovato **due tagli caduti dopo l'inizio della frase
seguente**, sulla traccia A:

```
FUORI  s04  fine  20.78 | taglio  23.05 | inizio  21.48
FUORI  s08  fine  62.94 | taglio  66.54 | inizio  63.98
```

Le prime parole di s04 («Vediamo alimentazione…») e di s08 («Il criterio di
scelta…») sarebbero finite sotto la slide precedente, per due e tre secondi.
Corretti in `audio/correzioni.json` al centro del silenzio vero fra le due
parole (−1,92 s e −3,08 s). **Terza lezione su otto in cui il controllo
prende un errore vero**; questo e' un tipo nuovo: non un taglio sulla virgola
o dentro una parola, ma un taglio saltato alla pausa dopo.

## Il montato

| | |
|---|---|
| montato locale | `montato-18.3.mp4` — **7:51.82** |
| montato HeyGen | `9a06feda642c6ad696d7d8d37fc92982` — **7:50.52** |
| render | 87 s |
| asset caricati | 96 in un lotto solo |

Perdita in consegna 1,30 s su 49 scene, 27 ms a scena. Scaricato e
controllato: 7:50.52, 1920×1080, audio presente (media −26 dB); al minuto
2:00 c'e' s13, gli ausili per la vestizione, come nel montato locale.

## Costo misurato

```
voce, due tracce (7.045 car, eleven_v4)          0 crediti
trascrizione A (Scribe, 243,7 s)             1.340 crediti
trascrizione B (Scribe, 226,0 s)             1.243 crediti
```

## Da verificare — quello che non ho potuto giudicare io

- **I contenuti di merito sono del documento**, non verificati contro una
  fonte. In particolare: la **rampa all'otto per cento** e le **porte di almeno
  ottanta centimetri** (normativa sulle barriere architettoniche), i
  **contributi della legge 13/1989**, il beccuccio «rischioso nella disfagia»,
  la scelta del materasso per livello di rischio.
- **«La cute» (s28)**: Scribe ha trascritto «l'acute». Le due forme si
  distinguono solo per l'accento; va ascoltato se la voce l'ha detto bene.
- **«Infilacalze», «infilabottoni»** e le sigle **«WC»** e **«ICF»** dette
  dalla voce: vanno ascoltate.
- **L'SRT porta gli apostrofi del parlato**: decisione ancora aperta.
