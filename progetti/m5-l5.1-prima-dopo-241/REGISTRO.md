# REGISTRO — Lezione 5.1 · Prima e dopo la legge 241

Corso **Progressione verticale · Comparto Sanità**, Modulo 5, Procedimento amministrativo e accesso.
Stesso metodo, voce, marchio e palette dei moduli 1-4: voce di Luca Ward (`tVdVcJPudubxmTmAw4tE`,
`eleven_v3`), senza avatar, ≥ 7:00. Le slide usano la libreria `slide/illustra.mjs`,
che nel modulo 5 passa da 22 a 27 illustrazioni SVG originali animate: si aggiungono clessidra
(sabbia che scende e si gira), sportello, archivio (cassetto che si apre), cassaforte e busta.
Ogni clip dura quanto il suo blocco audio (fino a 30 s), così l'animazione d'ambiente continua per tutta la scena.

**Fonti**: L. 241/1990 (testo 2019): titolo e obiettivi, art. 28 (segreto d'ufficio riscritto), art. 22 c. 2, art. 29 (ambito, livelli essenziali, garanzie non inferiori per regioni ed enti); riforme L. 15/2005, L. 69/2009, L. 190/2012; dispensa CISL FP.

## Aritmetica

| | valore |
|---|---|
| blocchi / scene | 46 / 48 |
| caratteri | 7.389 con i tag |
| stacco | dopo **s23** |
| grezzo | A 266,40 s · B 323,04 s = 589,4 s |
| parlato lavorato | **452,6 s** (5 pose) |
| CPS misurato | 16,3 car/s sul lavorato |
| montato locale | **7:45,91** |
| montato HeyGen | **7:44,61** |

## Verifiche

- **Trascrizione delle tracce intere** (da asset audio, `eleven_scribe_v1`):
  A: 572/572 parole, 0 buchi
  B: 598/598 parole, 0 buchi
- **Confini**: **s36** e **s39** erano fuori fascia (confini caduti in anticipo): corretti con `correzioni.json`, poi verifica al 100% e nessuna coppia di segno opposto.
  `audio/correzioni.json` = {"B": {"12": {"pause": 1}, "15": {"pause": 2}}}.
- **Temi cambiati rispetto al copione**: nessuno.
- **Slide**: PNG guardati in provini da nove, traboccamento verificato con i caratteri veri.
  - **s06**: la cancellatura su un'affermazione non falsa sostituita da un `confronto`.
  - **s28**: base della piramide «Legge 241 · il fondamento comune».
  - Illustrazione `sportello`: etichette spostate, coprivano le teste dei cittadini.
- `controlli.py`: 8/8.

## Montaggio

- Lotto HeyGen `5614936a0abc4977b70cc0c92f7d58ba`: 94 file accoppiati per posizione, 0 discordi sul `content-type`.
- Payload: 48 scene; 46 scene video, tutte con `audio_asset_id` e `playback {freeze, mute}`.
- Video HeyGen: `ceb9ff24e5048eeee68f243e51e65c73` (https://app.heygen.com/videos/ceb9ff24e5048eeee68f243e51e65c73).
- Il file consegnato non si scarica da questa sessione (proxy: 403 su files2.heygen.ai).

## Costo

```
voce, due tracce, 7.389 caratteri, eleven_v3        ≈ $1,21  (stimato sui caratteri)
trascrizione delle due tracce intere               ≈ $0,53  (stimato sui secondi)
                                                    -------
                                                    ≈ $1,75
```

## Da verificare — quello che non ho potuto giudicare io

- **Nessuno ha ancora ascoltato il video.** La verifica è per trascrizione, durate e fotogrammi.
- Da confrontare con le fonti, in particolare:
  - Il quadro dell'**amministrazione di prima** (autoreferenziale, segreto d'ufficio come regola) è una sintesi didattica, non una citazione.
  - La frase sul **segreto d'ufficio** è stata riformulata per non attribuirle un fondamento normativo preciso.
  - Nuove illustrazioni SVG in questa lezione: **clessidra, sportello, archivio, cassaforte, busta** (libreria a 27 figure).
- **La fonte prevista dal piano del corso per il modulo 5, `Procedimento-Amministrativo.pdf`, non è disponibile** (né nel repository né su Drive). I contenuti vengono dal testo della L. 241/1990 aggiornato al 20/9/2019 (edizione Città di Torino, su Drive) e dalla dispensa CISL FP di legislazione e diritto amministrativo. Le modifiche successive al 2019 (D.L. 76/2020, L. 108/2021) sono state verificate **solo attraverso estratti di ricerca**: il proxy blocca normattiva. Va fatto un confronto con il testo vigente e con quel PDF appena c'è.
- La **dispensa CISL contiene errori** che il corso non riprende: chiama «RUP» il responsabile del procedimento, indica 18 mesi per l'annullamento d'ufficio, attribuisce all'art. 21-septies cause di nullità che non contiene, mette i vizi di merito tra quelli di legittimità e fa discendere la trasparenza dall'art. 97 Cost.
- I **termini dell'autotutela** (art. 21-nonies) sono stati omessi di proposito: il termine è cambiato più volte e le notizie più recenti non si sono potute verificare.
- Documenti personali presenti su Drive (procedimenti disciplinari, lettere di richiesta di accesso) e le **lettere CISL FP** non sono stati usati; nessuna persona è nominata.
- Il marchio è il logo CISL FP (non «Padova Rovigo»): vale quanto detto nella 1.1.
