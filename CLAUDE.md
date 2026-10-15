# La Parola Giusta — canale YouTube di Achille Pagliaro

Questo repo tiene lo standard di produzione dei video del canale.
**Prima di produrre o modificare un video, leggi `produzione/STANDARD.md`.**
`produzione/METODO.md` è la stessa cosa in forma operativa ed esportabile: la
pipeline passo per passo e, in testa, le domande da fare ad Achille prima di
cominciare.
`produzione/MASTER.md` è la versione madre, valida per qualunque video o
corso: tema, colori e durata sono variabili da compilare in testa, e tutto il
resto — quanti caratteri scrivere, quanti blocchi, quante scene — si ricava da
quelle con un'aritmetica fissa.
È la modalità predefinita: va applicata senza che venga richiesta ogni volta.

In due righe: avatar mai scontornato e mai coperto da grafiche, e molte slide
a piena inquadratura — una per ogni concetto e per ogni elenco, non solo per
le frasi chiave.

## La voce non ha più una risposta sola: si chiede

**Ogni volta che si propone o si comincia un video, PRIMA di generare
qualunque cosa va chiesto ad Achille con quale strumento fare la voce.** Non è
una decisione già presa come le altre: è l'unica cosa che si domanda sempre.

Le strade sono due, tutte e due con la stessa voce e lo stesso modello
`eleven_v4`:

| | come | costo di una lezione da 10 minuti |
|---|---|---|
| **ElevenLabs diretto** | `creative_create_flow` + nodi `tts` | ~10.400 crediti ElevenLabs (**$1,73**), più ~1.000 crediti di trascrizione per verificare i tagli |
| **HeyGen come passante** | `create_speech`, `engine: "elevenlabs"`, `settings: {"model_id": "eleven_v4"}` | **~31 crediti** del piano HeyGen (voce: 30–31 a lezione dalla 7.2 alla 7.5, 39 sulla sola 7.1; render: 1), e **la trascrizione di verifica non serve**: i confini si costruiscono con una pausa e `confini_heygen.py` li trova da solo |

Misurato il 13 ottobre 2026 su cinque campioni, non stimato: **1 credito ogni
16,7 secondi** di grezzo, arrotondati per eccesso **a ogni chiamata** — perciò
le tracce lunghe, non un blocco per chiamata. Sulla prima lezione vera, la
7.1, la voce è costata **39 crediti** e il render **1**; sulla 7.2, con un
grezzo della stessa lunghezza (703 s contro 704) e il saldo letto subito
prima e subito dopo, **30**; poi **31, 31 e 30** sulla 7.3, 7.4 e 7.5. I 39
della 7.1 sono rimasti l'eccezione, senza spiegazione.

**Due cose erano aperte e sono state chiuse la sera stessa del 13 ottobre:**

1. **il limite del timeout sta fra 3.097 e 3.401 caratteri.** 2.243, 2.526 e
   3.097 passano; 3.401 va in timeout a 60 secondi. Un copione da 10.400
   caratteri va in **quattro o cinque tracce** sotto i ~2.900 (la 7.1 ne ha
   usate cinque, perché le pause di confine allungano il testo);
2. **HeyGen è il 3,3% più LENTO**, non più veloce: 15,71 contro 16,25
   caratteri al secondo sul grezzo. (Il «5% più veloce» del 13 ottobre era un
   errore di confronto: un campione da 229 caratteri contro la media di una
   traccia intera, e i campioni corti hanno meno pause di frase.) Con HeyGen
   l'`atempo` va portato da 1,12 a **1,16**, e **le due sorgenti non si
   mescolano dentro lo stesso corso**.

**Non si usano mai** il TTS proprio di HeyGen (`heygen_voice`, `starfish`,
`orca`) né il Video Agent per la voce: quelli producono balbettii e artefatti,
verificato più volte. La strada HeyGen di cui sopra non è il loro TTS: è
ElevenLabs fatturato da HeyGen.

**Prova chiusa, decisione aperta.** Il modulo 7 del corso LNV, cinque
lezioni, è stato fatto tutto con la strada HeyGen per deciderla sui fatti:
**161 crediti** di voce più 5 di render, **213 confini su 213** giusti al
primo colpo senza trascrizione, e due cose imparate — il parametro `speed`
viene ignorato (si rallenta in post con `PIANO` e `ATEMPO` di `tagli.py`) e
il costo è stabile a 30–31 crediti a lezione. I numeri sono in
`produzione/registri/lnv-modulo-7.md`. **La scelta della strada da tenere è
di Achille**: finché non la fa, i video nuovi restano su ElevenLabs diretto,
e la domanda sullo strumento si fa comunque ogni volta.
