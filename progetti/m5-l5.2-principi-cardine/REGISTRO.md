# REGISTRO — Lezione 5.2 · I principi cardine

Corso **Progressione verticale · Comparto Sanità**, Modulo 5, Procedimento amministrativo e accesso.
Stesso metodo, voce, marchio e palette dei moduli 1-4: voce di Luca Ward (`tVdVcJPudubxmTmAw4tE`,
`eleven_v3`), senza avatar, ≥ 7:00. Le slide usano la libreria `slide/illustra.mjs`,
che nel modulo 5 passa da 22 a 27 illustrazioni SVG originali animate: si aggiungono clessidra
(sabbia che scende e si gira), sportello, archivio (cassetto che si apre), cassaforte e busta.
Ogni clip dura quanto il suo blocco audio (fino a 30 s), così l'animazione d'ambiente continua per tutta la scena.

**Fonti**: L. 241/1990 art. 1 (economicità, efficacia, imparzialità, pubblicità, trasparenza, principi UE; c. 1-bis diritto privato per gli atti non autoritativi; c. 1-ter privati che svolgono attività amministrativa; c. 2 divieto di aggravamento; c. 2-bis collaborazione e buona fede, D.L. 76/2020); dispensa CISL FP.

## Aritmetica

| | valore |
|---|---|
| blocchi / scene | 46 / 48 |
| caratteri | 7.373 con i tag |
| stacco | dopo **s25** |
| grezzo | A 266,16 s · B 276,16 s = 542,3 s |
| parlato lavorato | **414,1 s** (5 pose) |
| CPS misurato | 17,8 car/s sul lavorato |
| montato locale | **7:07,40** |
| montato HeyGen | **7:06,15** |

## Verifiche

- **Trascrizione delle tracce intere** (da asset audio, `eleven_scribe_v1`):
  A: 585/585 parole, 0 buchi
  B: 556/556 parole, 0 buchi
- **Confini**: Nessuna coppia di segno opposto, nessun blocco fuori fascia.
  `audio/correzioni.json` = nessuna.
- **Temi cambiati rispetto al copione**: nessuno.
- **Slide**: PNG guardati in provini da nove, traboccamento verificato con i caratteri veri.
  - **s20**: cancellatura sostituita da un `confronto`.
  - **s40**: illustrazione inesistente «rete» sostituita da `organigramma`.
  - Icone inesistenti («stretta») sostituite.
- `controlli.py`: 8/8.

## Montaggio

- Lotto HeyGen `6f2aa9c169cc4463aac559117c1bd07e`: 94 file accoppiati per posizione, 0 discordi sul `content-type`.
- Payload: 48 scene; 46 scene video, tutte con `audio_asset_id` e `playback {freeze, mute}`.
- Video HeyGen: `bf1c2b3c7b6cff733fe60625ce53833b` (https://app.heygen.com/videos/bf1c2b3c7b6cff733fe60625ce53833b).
- Il file consegnato non si scarica da questa sessione (proxy: 403 su files2.heygen.ai).

## Costo

```
voce, due tracce, 7.373 caratteri, eleven_v3        ≈ $1,21  (stimato sui caratteri)
trascrizione delle due tracce intere               ≈ $0,49  (stimato sui secondi)
                                                    -------
                                                    ≈ $1,70
```

## Da verificare — quello che non ho potuto giudicare io

- **Nessuno ha ancora ascoltato il video.** La verifica è per trascrizione, durate e fotogrammi.
- Da confrontare con le fonti, in particolare:
  - Il **c. 2-bis** (collaborazione e buona fede) è del D.L. 76/2020: verificato solo con estratti di ricerca.
  - Gli **esempi** in azienda sanitaria sono inventati a scopo didattico.
- **La fonte prevista dal piano del corso per il modulo 5, `Procedimento-Amministrativo.pdf`, non è disponibile** (né nel repository né su Drive). I contenuti vengono dal testo della L. 241/1990 aggiornato al 20/9/2019 (edizione Città di Torino, su Drive) e dalla dispensa CISL FP di legislazione e diritto amministrativo. Le modifiche successive al 2019 (D.L. 76/2020, L. 108/2021) sono state verificate **solo attraverso estratti di ricerca**: il proxy blocca normattiva. Va fatto un confronto con il testo vigente e con quel PDF appena c'è.
- La **dispensa CISL contiene errori** che il corso non riprende: chiama «RUP» il responsabile del procedimento, indica 18 mesi per l'annullamento d'ufficio, attribuisce all'art. 21-septies cause di nullità che non contiene, mette i vizi di merito tra quelli di legittimità e fa discendere la trasparenza dall'art. 97 Cost.
- I **termini dell'autotutela** (art. 21-nonies) sono stati omessi di proposito: il termine è cambiato più volte e le notizie più recenti non si sono potute verificare.
- Documenti personali presenti su Drive (procedimenti disciplinari, lettere di richiesta di accesso) e le **lettere CISL FP** non sono stati usati; nessuna persona è nominata.
- Il marchio è il logo CISL FP (non «Padova Rovigo»): vale quanto detto nella 1.1.
