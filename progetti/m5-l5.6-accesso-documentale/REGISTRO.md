# REGISTRO — Lezione 5.6 · Il diritto di accesso documentale

Corso **Progressione verticale · Comparto Sanità**, Modulo 5, Procedimento amministrativo e accesso.
Stesso metodo, voce, marchio e palette dei moduli 1-4: voce di Luca Ward (`tVdVcJPudubxmTmAw4tE`,
`eleven_v3`), senza avatar, ≥ 7:00. Le slide usano la libreria `slide/illustra.mjs`,
che nel modulo 5 passa da 22 a 27 illustrazioni SVG originali animate: si aggiungono clessidra
(sabbia che scende e si gira), sportello, archivio (cassetto che si apre), cassaforte e busta.
Ogni clip dura quanto il suo blocco audio (fino a 30 s), così l'animazione d'ambiente continua per tutta la scena.

**Fonti**: L. 241/1990 artt. 22, 23, 24, 25 (testo 2019); D.P.R. 184/2006 artt. 2, 3, 5, 6, 7, 9; D.Lgs. 196/2003 art. 60 (dati sulla salute, rango almeno pari); D.Lgs. 33/2013 art. 5 (solo come confronto); dispensa CISL FP.

## Aritmetica

| | valore |
|---|---|
| blocchi / scene | 46 / 48 |
| caratteri | 7.529 con i tag |
| stacco | dopo **s24** |
| grezzo | A 252,56 s · B 263,04 s = 515,6 s |
| parlato lavorato | **416,3 s** (21 pose) |
| CPS misurato | 18,1 car/s sul lavorato |
| montato locale | **7:09,59** |
| montato HeyGen | **7:08,35** |

## Verifiche

- **Trascrizione delle tracce intere** (da asset audio, `eleven_scribe_v1`):
  A: 568/568 parole, 0 buchi
  B: 578/578 parole, 0 buchi
- **Confini**: Nessuna coppia di segno opposto, nessun blocco fuori fascia.
  `audio/correzioni.json` = nessuna.
- **Temi cambiati rispetto al copione**: nessuno.
- **Slide**: PNG guardati in provini da nove, traboccamento verificato con i caratteri veri.
  - nessuna correzione dopo i provini.
- `controlli.py`: 8/8.

## Montaggio

- Lotto HeyGen `58a8bb83b57a42cead97cd4c0ebcc2b2`: 94 file accoppiati per posizione, 0 discordi sul `content-type`. Un asset del lotto (clip di **s43**) è rimasto «queued» e risultava inesistente: ricaricato a parte (`63dd5902f5a64a6b9cfc648e75bc92be`) e sostituito nel payload.
- Payload: 48 scene; 46 scene video, tutte con `audio_asset_id` e `playback {freeze, mute}`.
- Video HeyGen: `bcecd086cb5a89be8898351b5a9c5ee2` (https://app.heygen.com/videos/bcecd086cb5a89be8898351b5a9c5ee2).
- Il file consegnato non si scarica da questa sessione (proxy: 403 su files2.heygen.ai).

## Costo

```
voce, due tracce, 7.529 caratteri, eleven_v3        ≈ $1,26  (misurato)
trascrizione delle due tracce intere               ≈ $0,47  (misurato)
                                                    -------
                                                    ≈ $1,72
```

## Da verificare — quello che non ho potuto giudicare io

- **Nessuno ha ancora ascoltato il video.** La verifica è per trascrizione, durate e fotogrammi.
- Da confrontare con le fonti, in particolare:
  - Il **termine di 30 giorni per il ricorso al TAR** (art. 116 c.p.a.) non è detto nella lezione: da verificare prima di aggiungerlo.
  - Gli **articoli del D.P.R. 184/2006** (informale art. 5, formale art. 6, controinteressati 10 giorni art. 3, almeno 15 giorni per la visione art. 7, differimento art. 9) vengono dalla sintesi di ricerca, non dal testo del decreto.
  - L'esempio della **graduatoria interna** e dei verbali di selezione è inventato a scopo didattico.
  - Il **riesame del difensore civico** per le aziende sanitarie: la legge parla di atti di comuni, province e regioni; l'applicazione alle aziende sanitarie va confermata.
- **La fonte prevista dal piano del corso per il modulo 5, `Procedimento-Amministrativo.pdf`, non è disponibile** (né nel repository né su Drive). I contenuti vengono dal testo della L. 241/1990 aggiornato al 20/9/2019 (edizione Città di Torino, su Drive) e dalla dispensa CISL FP di legislazione e diritto amministrativo. Le modifiche successive al 2019 (D.L. 76/2020, L. 108/2021) sono state verificate **solo attraverso estratti di ricerca**: il proxy blocca normattiva. Va fatto un confronto con il testo vigente e con quel PDF appena c'è.
- La **dispensa CISL contiene errori** che il corso non riprende: chiama «RUP» il responsabile del procedimento, indica 18 mesi per l'annullamento d'ufficio, attribuisce all'art. 21-septies cause di nullità che non contiene, mette i vizi di merito tra quelli di legittimità e fa discendere la trasparenza dall'art. 97 Cost.
- I **termini dell'autotutela** (art. 21-nonies) sono stati omessi di proposito: il termine è cambiato più volte e le notizie più recenti non si sono potute verificare.
- Documenti personali presenti su Drive (procedimenti disciplinari, lettere di richiesta di accesso) e le **lettere CISL FP** non sono stati usati; nessuna persona è nominata.
- Il marchio è il logo CISL FP (non «Padova Rovigo»): vale quanto detto nella 1.1.
