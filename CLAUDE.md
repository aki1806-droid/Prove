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
| **HeyGen come passante** | `create_speech`, `engine: "elevenlabs"`, `settings: {"model_id": "eleven_v4"}` | **~33 crediti** del piano HeyGen (0,45% del mese), e **la trascrizione di verifica non serve**: `create_speech` restituisce i tempi parola per parola |

Misurato il 13 ottobre 2026, non stimato: 12,83 s → 1 credito, 68,36 s → 4
crediti, cioè **1 credito ogni 17–20 secondi**, arrotondati per eccesso **a
ogni chiamata** (perciò le tracce lunghe, non un blocco per chiamata).

**Due cose restano aperte e vanno dette ad Achille quando si chiede:**

1. una chiamata `create_speech` da 3.400 caratteri è andata in **timeout a 60
   secondi**; una da 1.150 è passata. Il limite pratico sta in mezzo e non è
   ancora stato trovato;
2. il ritmo di HeyGen è circa il **5% più veloce** della stessa voce presa
   diretta (17,4 contro 16,5 caratteri al secondo). `atempo=1.12` è tarato su
   ElevenLabs: cambiando sorgente va ritarato, e **le due sorgenti non si
   mescolano dentro lo stesso corso**.

**Non si usano mai** il TTS proprio di HeyGen (`heygen_voice`, `starfish`,
`orca`) né il Video Agent per la voce: quelli producono balbettii e artefatti,
verificato più volte. La strada HeyGen di cui sopra non è il loro TTS: è
ElevenLabs fatturato da HeyGen.

**Prova in corso:** il modulo 7 del corso LNV si fa con la strada HeyGen, per
deciderla sui fatti. Finché non è chiusa, tutto il resto resta su ElevenLabs
diretto.
