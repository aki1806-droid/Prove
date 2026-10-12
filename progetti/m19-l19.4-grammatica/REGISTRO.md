# REGISTRO — 19.4 La grammatica minima per i quesiti di completamento

Modulo 19 bonus (inglese per il concorso), lezione 4 di 5: l'unica lezione di
grammatica del modulo, solo cio' che serve a scegliere la risposta giusta.
Corso di preparazione al concorso **OSS** Azienda Zero · CISL FP Padova Rovigo.

## Scheda parametri

Invariata rispetto alla 19.1 (vedi il suo registro, anche per il provino di
pronuncia). Lo stacco fra le tracce e' `s25`, fine del capitolo 7 (i verbi
modali).

## L'aritmetica — e la durata

```
caratteri scritti     6.231  ·  47 blocchi  ·  13 capitoli  ·  49 scene su 50
voce grezza           525,1 s   (A 272,8 · B 252,3)
lavorata netta        459,7 s   ·  CPS 13,55  ·  rapporto 1,142
respiro               0 s
montato locale        8:07.64
```

**Questa lezione dura circa 8:06, non 7:50.** La grammatica si legge piu'
lenta delle frasi della 19.3 (13,6 car/s netti contro 15,3): lettere
sillabate («S», «ES», «ING», «ED»), elenchi di forme brevi, ognuna con la sua
pausa.

Una prima versione arricchita con le traduzioni degli esempi e gli esempi in
piu' dello schermo (6.652 caratteri, `copione/testa-con-traduzioni.py`) e'
durata 549 s grezzi, un montato di circa 8:23. Si e' tornati al **testo del
documento**: le traduzioni stanno sulle slide. Accorciare ancora voleva dire
togliere forme che la lezione elenca come «quelle del concorso».

## Il copione di partenza non trasferisce cosi' com'e'

Il testo del documento, **nessuna aggiunta**. Tre ritocchi per la voce, dalle
lezioni precedenti (una «E» a inizio frase, o una «, e», seguite da un
termine inglese fanno passare la voce all'inglese, «and»): «E there is» →
«Poi there is»; «E l'apostrofo S» → «Poi l'apostrofo S»; «May e might» →
«May, oppure might».

## Le slide

Le regole della 19.1. 49 scene: tabella 29 · memo 6 · titolo 5 · griglia 4 ·
trappola 2 · copertina 2 · frase 1.

- Il glossario qui e' fatto di regole: `tabella` a tre colonne, Forma |
  Esempio | Che cosa significa. La forma in verde, l'esempio inglese in
  semibold, la traduzione accanto.
- Gli irregolari del passato in una tabella Il passato | Il verbo base | Che
  cosa significa, divisa in due slide come li divide la voce.
- I plurali irregolari, i possessivi e le preposizioni di luogo in `griglia`
  3×3, «**forma** · traduzione».
- Le trappole di questa lezione sono i **quesiti tipo**: `trappola` sul velo
  rosa, l'opzione sbagliata barrata e la giusta sotto («She sleeps now» →
  «She is sleeping now»; «The nurse helps he» → «The nurse helps him»).
- Il metodo in cinque passi e il riepilogo sono `memo` a tappe.
- Ogni slide mostra solo le forme del suo blocco, senza righe `chiave`, come
  nella 19.3.

## Esito delle verifiche

| | |
|---|---|
| temi concordi fra `blocchi.json` e `contenuti.mjs` | ✓ 47 su 47 |
| traboccamento, copertine, serie a tappe | ✓ |
| provini guardati | ✓ tutti e 49 |
| verifica per trascrizione, **whisper locale** | 96,9% su A, 92,8% su B · 4 «buchi» **falsi**, vedi sotto |
| tagli fra due parole | ✓ 45 su 45 — **dopo 6 correzioni** |
| blocchi nella fascia 8,5-21 car/s | ✓ tutti e 47 (9,4-19,1) |
| scarto audio/video sulle clip | ✓ massimo 20 ms |
| durata del montato locale ≥ 7:50 | ✓ **8:07.64** — vedi sopra |
| sottotitoli SRT | ✓ 47 righe su 47 blocchi |

### La trascrizione

Whisper in locale, come nella 19.3 (i crediti Scribe erano finiti). I
quattro «buchi» della traccia B sono parole dette e trascritte male:

- s33 «l'apostrofo S» → «la postro fosse»;
- s38 «i pronomi soggetto» → «ipronomi soggietto»;
- s46 «e gli irregolari» → «egli regolari»;
- s43 «o una S con they» → vuoto. Ritrascritto da solo il blocco (in
  italiano, in inglese e a lingua automatica) la frase c'e' tutta: «o una S
  con **vei**». **«They» va ascoltato**: whisper ci sente «vei».

### I tagli

`confini-parole.py` ne segnalava 24 «FUORI». Per ognuno si e' cercato il
silenzio vero della traccia (`silencedetect`) vicino al confine fra le
parole:

- **18 restano dove sono**: il taglio sta gia' dentro un silenzio vero.
  Whisper attacca la fine di una parola all'inizio della successiva, e il
  conteggio li segnala per questo;
- **6 spostati** al centro del silenzio giusto (A 2, 4, 18; B 1, 7, 21:
  +1,14, +1,99, −1,25, −0,70, +1,56, +0,82 s). Erano caduti in una pausa
  dentro la frase, per esempio dopo «la S:».

## Il montato

| | |
|---|---|
| montato locale | `montato-19.4.mp4` — **8:07.64** |
| montato HeyGen | `2de6e2071ec7e24e541e2f2d25fb5b75` — **8:06.38** |
| render | 58 s |
| asset caricati | 96 in un lotto solo, nessun 503 |

Perdita in consegna 1,26 s su 49 scene. Scaricato e controllato: 8:06.36,
1920×1080. Al centro di s31 (4:57, i plurali irregolari) i due fotogrammi
coincidono: scarto medio 0,1 su 255. Le 49 scene inviate coincidono col file.

## Costo misurato

```
voce, due tracce, due versioni (eleven_v4)       0 crediti
trascrizione (whisper locale)                    0 crediti
```

## Da verificare — quello che non ho potuto giudicare io

- **La durata, 8:06 invece di 7:50**: vedi sopra.
- **La pronuncia inglese va ascoltata**, in particolare le lettere sillabate
  («S», «ES», «IES», «ING», «ED») e **«they» in s43**.
- **La trascrizione e' di whisper, non di Scribe**: un ascolto completo vale
  piu' del 92,8%.
- **I contenuti di merito sono del documento**, non verificati contro una
  fonte.
- **Le schede scaricabili** che il documento prevede (il metodo per i
  completamenti) non sono state fatte.
- **L'SRT porta gli apostrofi del parlato**: decisione ancora aperta.
