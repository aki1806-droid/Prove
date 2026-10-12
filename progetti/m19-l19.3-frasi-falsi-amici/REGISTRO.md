# REGISTRO — 19.3 Frasi, dialoghi in reparto e falsi amici

Modulo 19 bonus (inglese per il concorso), lezione 3 di 5: le frasi per
situazione assistenziale, le domande, i falsi amici, le strutture ricorrenti.
Corso di preparazione al concorso **OSS** Azienda Zero · CISL FP Padova Rovigo.

## Scheda parametri

Invariata rispetto alla 19.1 (vedi il suo registro, anche per il provino di
pronuncia). Lo stacco fra le tracce e' `s24`, fine del capitolo 7
(l'emergenza).

## L'aritmetica

```
caratteri scritti     6.706  ·  48 blocchi  ·  13 capitoli  ·  50 scene su 50
voce grezza           496,0 s   (A 228,6 · B 267,4)
lavorata netta        437,8 s   ·  CPS 15,32  ·  rapporto 1,133
respiro               0,133 s × 47
montato locale        7:51.80
```

Le frasi intere si leggono molto piu' veloci del glossario (15,3 car/s netti,
contro i 12,3 della 19.2). La prima voce, sul solo testo del documento (6.335
caratteri), e' durata 464,3 s grezzi: il montato restava **36 s sotto i
7:50** anche col respiro al tetto. Da qui le aggiunte.

## Il copione di partenza non trasferisce cosi' com'e'

Le aggiunte (`AGG` in `copione/testa.py`) vengono **tutte dallo schermo dello
stesso documento**, o ne sono la traduzione. Nessun fatto nuovo:

- le traduzioni degli esempi delle domande e delle sette strutture, che la
  voce diceva solo in inglese e lo schermo traduce («Dov'e' il reparto?»,
  «Posso aiutarla?», «sediamoci»);
- i corretti dei falsi amici che lo schermo mette fra parentesi: possibly,
  bookshop, insult, to expect o to demand;
- due «per favore» che lo schermo ha e la voce no.

Ritocchi per la voce, dalla 19.1 e dalla 19.2: nessuna «E» a inizio frase, e
nessuna «, e», seguite da un termine inglese («E disease e' la malattia» →
«Disease, infine, e' la malattia»; «E una frase da consegna» → «Poi una frase
da consegna»). I numeri inglesi restano in lettere inglesi («thirty eight»,
«from zero to ten»): sono le parole che il quesito userebbe.

## Le slide

Le regole della 19.1. 50 scene: tabella 28 · trappola 8 · titolo 5 · memo 3
· copertina 2 · frase 2 · griglia 2.

- Il glossario qui e' fatto di frasi: `tabella` In inglese | Che cosa
  significa; le strutture ricorrenti a tre colonne, Struttura | Esempio | Che
  cosa significa.
- **Ogni slide mostra solo le frasi del suo blocco** (`parte()` in
  `contenuti.mjs`). Una prima versione teneva la tabella intera e accendeva
  in rosa le righe gia' dette (`chiave`): sembrava un elenco di errori,
  perche' il rosa nel corso e' il colore delle trappole.
- I falsi amici sono i distrattori della lezione: `trappola` sul velo rosa,
  il significato sbagliato barrato e quello giusto sotto.
- La frase da consegna «He did not eat his breakfast» (s14) era un `titolo`
  su tema chiaro: il titolo su chiaro esce rosso, il colore dell'errore.
  Spostata sul profondo.

## Esito delle verifiche

| | |
|---|---|
| temi concordi fra `blocchi.json` e `contenuti.mjs` | ✓ 48 su 48 |
| traboccamento, copertine, serie a tappe | ✓ |
| provini guardati | ✓ tutti e 50 |
| verifica per trascrizione, **whisper locale** | 94,8% su A, 97,6% su B · 3 «buchi» **falsi**, vedi sotto |
| tagli fra due parole | ✓ 46 su 46 — **dopo 22 + 4 correzioni** |
| blocchi nella fascia 8,5-21 car/s | ✓ tutti e 48 (11,7-19,1) |
| scarto audio/video sulle clip | ✓ |
| durata del montato locale ≥ 7:50 | ✓ 7:51.80 |
| sottotitoli SRT | ✓ 48 righe su 48 blocchi |

### La trascrizione senza Scribe

**I crediti ElevenLabs sono finiti** («0 credits remaining») durante questa
lezione: Scribe non trascrive piu'. La voce (eleven_v4) costa 0 crediti e
continua a funzionare.

Al posto di Scribe, **faster-whisper in locale** (modello small, CPU, lingua
italiana forzata, tempi per parola), con lo stesso formato d'uscita: le
verifiche del MASTER restano quelle. Ha un limite: con l'italiano forzato le
frasi **tutte inglesi** le salta o le traduce. I tre «buchi» che segnala sono
questo:

- s05 «Good morning. My name is Anna, I am a healthcare assistant»;
- s06 «How are you feeling today?»;
- s27 «thirty eight».

Controprova: una seconda trascrizione in inglese degli stessi blocchi le
riporta tutte e tre, e la velocita' dei blocchi (15,8 e 18,5 car/s) e'
quella di un blocco detto per intero. Il controllo automatico resta «NO» per
questo, non per un buco vero.

### I tagli

L'allineamento sui silenzi si e' confuso sulle domande inglesi brevi (le
pause dentro «Are you hungry? Are you thirsty?» sembrano fine blocco).
Corretti in due passi:

1. **22 tagli** portati al centro del silenzio fra l'ultima parola del blocco
   e la prima del successivo, coi tempi di whisper (A 13, B 9);
2. **4 tagli** dove whisper attacca le parole l'una all'altra (A 13 e 19,
   B 7 e 20), agganciati al silenzio vero della traccia (+0,38, +0,38,
   −0,13, +0,22 s).

Restano 4 «FUORI» nel conteggio: sono quei quattro, dove per whisper la
parola prima finisce esattamente dove comincia la dopo. Il taglio sta dentro
un silenzio vero (verificato con `silencedetect`).

## Il montato

| | |
|---|---|
| montato locale | `montato-19.3.mp4` — **7:51.80** |
| montato HeyGen | `720e342ac947cbc473bb62ecd614aa63` — **7:50.52** |
| render | 65 s |
| asset caricati | 98 in un lotto solo, nessun 503 |

Perdita in consegna 1,28 s su 50 scene. Scaricato e controllato: 7:50.52.
Al centro di s27 (4:01, le consegne) i due fotogrammi coincidono: scarto
medio 0,2 su 255.

## Costo misurato

```
voce, due tracce, due versioni (eleven_v4)       0 crediti
trascrizione (whisper locale)                    0 crediti
```

## Da verificare — quello che non ho potuto giudicare io

- **La pronuncia inglese va ascoltata**, in particolare le frasi intere in
  apertura di blocco (s05, s06) e «healthcare assistant», «walking frame»,
  «hoist», «dizzy», «constipated».
- **Mrs e Mr** (s25, s26): la voce dice «Missis» e «Mister»?
- **La trascrizione e' di whisper, non di Scribe**: e' meno affidabile sulle
  parti inglesi. Un ascolto completo vale piu' del 94,8%.
- **I contenuti di merito sono del documento**, non verificati contro una
  fonte.
- **Le schede scaricabili** che il documento prevede per il modulo non sono
  state fatte.
- **L'SRT porta gli apostrofi del parlato**: decisione ancora aperta.
