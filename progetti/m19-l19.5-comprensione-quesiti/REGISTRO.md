# REGISTRO — 19.5 Comprensione dei testi, quesiti tipo e riepilogo del modulo

Modulo 19 bonus (inglese per il concorso), lezione 5 di 5: il metodo per i
testi, diciotto quesiti risolti nei tre formati del concorso, il quadro del
modulo e la chiusura del corso.
Corso di preparazione al concorso **OSS** Azienda Zero · CISL FP Padova Rovigo.

## Scheda parametri

Invariata rispetto alla 19.1 (vedi il suo registro, anche per il provino di
pronuncia). Lo stacco fra le tracce e' `s28`, fine del capitolo 7 (i quesiti
di completamento).

## L'aritmetica — e la durata

```
caratteri scritti     6.367  ·  48 blocchi  ·  13 capitoli  ·  50 scene su 50
voce grezza           462,8 s   (A 250,7 · B 212,1)
lavorata netta        413,8 s   ·  CPS 15,39  ·  rapporto 1,118
pose                  68,5 s    (18 × 3 s dopo i quesiti, 12 × 1,2 s)
respiro               0 s
montato locale        8:15.81
```

**Questa lezione dura circa 8:14, non 7:50.** I 25 secondi in piu' sono le
pause per provare: le note di produzione chiedono **tre secondi dopo ogni
quesito, prima della risposta**, e sono diciotto quesiti, 54 secondi. Senza,
il montato starebbe sotto i 7:50.

## Il copione di partenza non trasferisce cosi' com'e'

**La pausa per provare.** Ogni quesito chiude un blocco con posa 3 s; la
risposta apre il blocco dopo, insieme al quesito successivo. Cosi' i
diciotto quesiti stanno in 23 blocchi invece di 36, e la lezione nelle 50
scene. Per i quesiti 16-18 la voce di partenza dava la risposta subito, senza
lasciare il tempo di provare: sono diventati «... Che cosa significa?» +
posa.

**Il numero dei quesiti.** La scena 1 del documento dice «dodici quesiti»,
ma le scene 4-8 ne contengono diciotto e le scene 9 e 10 dicono diciotto. Si
dice **diciotto**.

**Tagli per stare nelle 50 scene** (48 blocchi da massimo 225 caratteri):

- metodo, passo cinque: «vai avanti, perche' il senso e' nelle altre» →
  «vai avanti» (la slide lo riporta intero);
- come usare i quesiti: «Se e' lessico, ripassa le schede» → «Lessico:
  ripassa le schede» (e cosi' per struttura e lettura);
- le ultime due settimane: «niente inglese nuovo, solo fiducia nel lessico
  che conosci» → «niente inglese nuovo»;
- chiusura: «una banca di simulazioni che ti accompagna fino al giorno della
  prova» → «una banca di simulazioni fino al giorno della prova».

**Due aggiunte di sola traduzione**, come le altre domande: «La temperatura
era alta?» (quesito 6) e «in the room» (quesito 14, dallo schermo).

**Ritocchi per la voce**, dalle lezioni precedenti (una «e» seguita da un
termine inglese fa passare la voce all'inglese): «present simple e
continuous» → «present simple, present continuous»; «Never e always
rovesciano la frase» → «Never, always: rovesciano la frase».

## Gli strumenti nuovi

Due strumenti nati nel modulo, ora in `audio/` e copiati da
`nuova-lezione.sh`: `trascrivi-locale.py` (la trascrizione con whisper in
locale) e `aggancia.py` (i tagli segnalati portati nel silenzio vero). Su
questa lezione: 6 tagli segnalati, 5 gia' giusti, 1 spostato.

## Le slide

50 scene: quesiti 23 · memo 8 · titolo 4 · testo 4 · griglia 4 · tabella 3 ·
copertina 2 · frase 2.

**Due layout nuovi** in `slide/layout.mjs` (gli altri moduli non cambiano):

- **`quesiti`**: la domanda e le quattro opzioni a, b, c, d in griglia 2×2.
  La slide di ogni blocco mostra sopra il quesito appena risolto, con la
  risposta giusta in **verde pieno** e le altre smorzate, e sotto quello
  aperto, con le opzioni tutte uguali: durante i tre secondi di posa si
  vede solo la domanda. Una `nota` facoltativa sotto, per il distrattore
  (s14 «no, she cannot» ignora il but; s23 le opzioni della stessa area).
  La risposta e' in verde e non in rosso: nel corso il rosso e' l'errore.
- **`testo`**: il brano di Mrs Green, acceso frase per frase mentre la voce
  lo legge; nell'ultimo blocco le parole da riconoscere (nursing home,
  healthcare assistant, walking frame, headache, temperature) in semibold.

Le slide con una risposta stanno sul chiaro, anche a fine capitolo: le
opzioni chiare sul verde pieno non si leggono.

## Esito delle verifiche

| | |
|---|---|
| temi concordi fra `blocchi.json` e `contenuti.mjs` | ✓ 48 su 48 |
| traboccamento, copertine, serie a tappe | ✓ |
| provini guardati | ✓ tutti e 50 |
| verifica per trascrizione, **whisper locale** | 97,4% su A, 97,4% su B · 1 «buco» **falso**, vedi sotto |
| tagli fra due parole | ✓ 46 su 46 — **dopo 1 correzione** |
| blocchi nella fascia 8,5-21 car/s | s22 a 8,2, **per la posa**: vedi sotto |
| scarto audio/video sulle clip | ✓ massimo 20 ms |
| durata del montato locale ≥ 7:50 | ✓ **8:15.81** — vedi sopra |
| sottotitoli SRT | ✓ 48 righe su 48 blocchi |

- **Il «buco» di s02** e' una grafia: «ascoltala con carta» → «ascolta la
  concarta».
- **La correzione**: il taglio fra s22 e s23 cadeva dentro «dormire?», 0,6 s
  prima della fine della parola. Spostato al centro del silenzio (+0,89 s).
  Gli altri 5 tagli segnalati stavano gia' dentro un silenzio vero.
- **s22 a 8,2 car/s**: il conteggio include i tre secondi di posa dopo il
  quesito. Sul solo parlato il blocco e' a 11,7 car/s (83 caratteri in 7,1 s,
  quattro verbi italiani in elenco).

## Il montato

| | |
|---|---|
| montato locale | `montato-19.5.mp4` — **8:15.81** |
| montato HeyGen | `bfe82fef8239006f2bd55c0c172e6d92` — **8:14.32** |
| render | 61 s |
| asset caricati | 98 in un lotto solo, nessun 503 |

Perdita in consegna 1,49 s su 50 scene. Scaricato e controllato: 8:14.32,
1920×1080. Al centro di s21 (3:17, il quesito 8 risolto e il 9 aperto) i due
fotogrammi coincidono: scarto medio 0,4 su 255. Le 50 scene inviate
coincidono col file.

## Costo misurato

```
voce traccia A (eleven_v4, 3.381 car)        3.381 crediti   ($0,56)
voce traccia B (eleven_v4, 3.032 car)        3.032 crediti   ($0,50)
trascrizione (whisper locale)                    0 crediti
```

**La voce, questa volta, e' stata addebitata**: nelle lezioni precedenti
eleven_v4 costava 0 crediti. Il conto ElevenLabs va guardato.

## Da verificare — quello che non ho potuto giudicare io

- **La durata, 8:14 invece di 7:50**: sono le pause dei quesiti (vedi sopra).
  Se servono 7:50 si possono portare a due secondi, ma il documento ne
  chiede tre.
- **La pronuncia inglese va ascoltata**, in particolare il brano di Mrs Green
  (s07-s09) e i quesiti di completamento letti con «spazio» al posto della
  parola mancante.
- **Le lettere delle risposte** («la risposta e' c», «risposta b»): la voce
  le dice all'italiana («ci», «bi»)?
- **La voce cita «le schede»** (s35, s36, s44) come fa il documento: **le
  schede scaricabili non sono state fatte**.
- **«Quindici moduli, centotrentacinque micro-lezioni, quattro moduli
  bonus»** sono i numeri del documento, non verificati.
- **La trascrizione e' di whisper, non di Scribe.**
- **L'SRT porta gli apostrofi del parlato**: decisione ancora aperta.
