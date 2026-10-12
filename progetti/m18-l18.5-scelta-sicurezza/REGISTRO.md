# REGISTRO — 18.5 Scelta, sicurezza e manutenzione degli ausili

Modulo 18 bonus (ausili, presidi e tecnologie assistive), lezione 5 di 5:
l'ultima del modulo, con il quadro completo.
Corso di preparazione al concorso **OSS** Azienda Zero · CISL FP Padova Rovigo.

## Scheda parametri

Invariata rispetto alla 18.1 (vedi il suo registro). Lo stacco fra le tracce e'
`s28`, fine del capitolo 7 (l'intrappolamento nelle sponde).

## L'aritmetica

```
caratteri scritti     7.043  ·  47 blocchi  ·  13 capitoli  ·  49 scene su 50
voce grezza           482,6 s   (A 246,2 · B 236,4)
lavorata netta        435,4 s   ·  CPS 16,17  ·  rapporto 1,108
respiro               +0,187 s su 46 blocchi = 8,6 s
montato locale        7:51.87
```

Le cinque lezioni del modulo, stessa voce e stesso modello: CPS 16,40 · 16,32
· 16,62 · 15,82 · 16,17. La forchetta 7.020-7.120 ha tenuto tutte e cinque
sopra i 7:50 senza mai superare il tetto di respiro (0,6 s).

## Il copione di partenza non trasferisce cosi' com'e'

6.875 caratteri di partenza, circa 6.940 con gli apostrofi: sotto la
forchetta. Cinque aggiunte, tutte dallo schermo dello stesso documento: la
domanda «mi fa vedere come lo usa?», il piano «assistenziale», la differenza
fra protesi e ortesi detta come domanda, il numero del modulo dopo («il
diciannove»), e il richiamo «come nella prima lezione» per la vigilanza.
**Nessun fatto nuovo.**

Una riformulazione per la voce: «anche quando faccio prima a mano», detto in
prima persona dal narratore, diventa «anche quando sembra di fare prima a
mano». Lo schermo tiene la frase originale fra virgolette (s30).

## Il repertorio dei tipi

49 scene: elenco 12 · frase 10 · titolo 8 · griglia 4 · tabella 4 · trappola 3
· memo 3 · copertina 2 · tre 2 · citazione 1.

- **L'equipe e' una `tabella`** (s05-s08): chi, e che cosa porta. Le righe si
  accendono a coppie come le dice la voce (medico e fisioterapista, terapista e
  infermiere, poi l'OSS, poi persona e caregiver).
- **Quando l'ausilio non va** e' una `griglia` numerata a cinque passi (s18,
  s19): non si usa, fuori servizio, si segnala, l'alternativa, si documenta.
  Come nella 18.1, la griglia numerata al posto della catena per le procedure.
- **Dopo un incidente** e' un elenco numerato a tre passi (s23).
- **Il quadro del modulo** (s37-s39) e' un elenco con i numeri delle cinque
  lezioni come marcatori, scoperto a tappe come lo dice la voce.
- La domanda «mi fa vedere come lo usa?» e' una `citazione` (s11).
- La copertina finale annuncia il **Modulo 19, Inglese per il concorso**.
- **velo rosa** sul riparare alla meglio (s20), sull'intrappolamento (s25),
  sugli ausili improvvisati a casa (s34) e sui distrattori (s40-s42).

## Esito delle verifiche

| | |
|---|---|
| temi concordi fra `blocchi.json` e `contenuti.mjs` | ✓ 47 su 47 |
| traboccamento, copertine, serie a tappe | ✓ |
| provini guardati | ✓ tutti e 49 |
| verifica per trascrizione, Scribe | ✓ **99,8% su A, 99,4% su B · 0 buchi** |
| tagli fra due parole, coi tempi di Scribe | ✓ 45 su 45 — **dopo una correzione**, vedi sotto |
| blocchi nella fascia 8,5-21 car/s | ✓ tutti e 47 |
| scarto audio/video sulle clip | ✓ massimo 20 ms |
| durata del montato locale ≥ 7:50 | ✓ **7:51.87** |
| sottotitoli SRT | ✓ 47 righe su 47 blocchi |

Gli scarti brevi sono tutti la stessa resa: la sigla **OSS** trascritta in
minuscolo (s33, s35, s40).

## Un taglio in anticipo

`confini-parole.py` ha trovato un taglio **caduto dentro l'ultima parola** del
blocco precedente, sulla traccia B:

```
FUORI  s38  fine  90.98 | taglio  90.04 | inizio  91.56
```

La fine di s37 («…l'OSS che non ripara») sarebbe finita sotto la slide della
seconda lezione. Corretto in `audio/correzioni.json` al centro del silenzio
vero (+1,23 s, taglio a 91,27). E' l'errore opposto a quello della 18.3: li'
il taglio era saltato alla pausa dopo, qui e' caduto su una pausa dentro la
frase. **Quarta lezione su dieci in cui il controllo prende un errore vero.**

## Il montato

| | |
|---|---|
| montato locale | `montato-18.5.mp4` — **7:51.87** |
| montato HeyGen | `faa5ddb132e5954f0b6506b0a13befc8` — **7:50.50** |
| render | 53 s |
| asset caricati | 96 in un lotto solo, nessun 503 |

Perdita in consegna 1,37 s su 49 scene, 28 ms a scena. Scaricato e
controllato: 7:50.50, 1920×1080, audio presente (media −25,3 dB). Al minuto
5:00 HeyGen mostra gia' s36 e il locale ancora s35: il confine cade a 5:00.17
e HeyGen e' avanti di quasi un secondo, per la perdita accumulata. A 5:04 i
due fotogrammi coincidono (scarto medio 1,9 su 255, la compressione). **Il
fotogramma di controllo va preso lontano da un confine di scena.**

## Costo misurato

```
voce, due tracce (7.043 car, eleven_v4)          0 crediti
trascrizione A (Scribe, 246,2 s)             1.354 crediti
trascrizione B (Scribe, 236,4 s)             1.300 crediti
```

## Da verificare — quello che non ho potuto giudicare io

- **I contenuti di merito sono del documento**, non verificati contro una
  fonte. In particolare: la manutenzione «a carico del fornitore nei tempi
  previsti dal Nomenclatore», l'intrappolamento «che puo' essere mortale» e il
  letto basso «spesso piu' sicuro», la segnalazione degli ausili mancanti come
  **obbligo del lavoratore** previsto dalla normativa sulla sicurezza.
- **Le schede scaricabili** che il documento consiglia per il modulo non sono
  state fatte: il video non le sostituisce.
- **Le sigle** dette dalla voce: **OSS**, **ICF**, **ULSS**, **GPS**. Vanno
  ascoltate.
- **L'SRT porta gli apostrofi del parlato**: decisione ancora aperta.
