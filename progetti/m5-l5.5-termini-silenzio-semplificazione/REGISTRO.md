# REGISTRO — Lezione 5.5 · Termini, silenzio e semplificazione

Corso **Progressione verticale · Comparto Sanità**, Modulo 5, Procedimento amministrativo e accesso.
Stesso metodo, voce, marchio e palette dei moduli 1-4: voce di Luca Ward (`tVdVcJPudubxmTmAw4tE`,
`eleven_v3`), senza avatar, ≥ 7:00. Le slide usano la libreria `slide/illustra.mjs`,
che nel modulo 5 passa da 22 a 27 illustrazioni SVG originali animate: si aggiungono clessidra
(sabbia che scende e si gira), sportello, archivio (cassetto che si apre), cassaforte e busta.
Ogni clip dura quanto il suo blocco audio (fino a 30 s), così l'animazione d'ambiente continua per tutta la scena.

**Fonti**: L. 241/1990 artt. 2 (30/90/180 giorni, sospensione, c. 8-bis, poteri sostitutivi c. 9-bis e 9-ter), 2-bis, 17-bis, 18, 19, 20, 14; D.P.R. 445/2000; dispensa CISL FP.

## Aritmetica

| | valore |
|---|---|
| blocchi / scene | 46 / 48 |
| caratteri | 7.467 con i tag |
| stacco | dopo **s23** |
| grezzo | A 265,84 s · B 280,40 s = 546,2 s |
| parlato lavorato | **432,0 s** (20 pose) |
| CPS misurato | 17,3 car/s sul lavorato |
| montato locale | **7:25,32** |
| montato HeyGen | **7:24,09** |

## Verifiche

- **Trascrizione delle tracce intere** (da asset audio, `eleven_scribe_v1`):
  A: 556/560 parole, 0 buchi
  B: 618/620 parole, 0 buchi
- «inadempimento» trascritto «in adempimento» quattro volte: resa del trascrittore.
- **Confini**: Nessuna coppia di segno opposto, nessun blocco fuori fascia.
  `audio/correzioni.json` = nessuna.
- **Temi cambiati rispetto al copione**: nessuno.
- **Slide**: PNG guardati in provini da nove, traboccamento verificato con i caratteri veri.
  - **s39**: etichette del `tavolo` sovrapposte, «Soprintendenza» diventa «Tutela».
  - **s47**: a capo del titolo rifatti.
- `controlli.py`: 8/8.

## Montaggio

- Lotto HeyGen `295395c0cb3d4e68b99fe3041f461a8a`: 94 file accoppiati per posizione, 0 discordi sul `content-type`.
- Payload: 48 scene; 46 scene video, tutte con `audio_asset_id` e `playback {freeze, mute}`.
- Video HeyGen: `f3365a60cc1448194dce6f8414fe556d` (https://app.heygen.com/videos/f3365a60cc1448194dce6f8414fe556d).
- Il file consegnato non si scarica da questa sessione (proxy: 403 su files2.heygen.ai).

## Costo

```
voce, due tracce, 7.467 caratteri, eleven_v3        ≈ $1,23  (stimato sui caratteri)
trascrizione delle due tracce intere               ≈ $0,50  (misurato)
                                                    -------
                                                    ≈ $1,72
```

## Da verificare — quello che non ho potuto giudicare io

- **Nessuno ha ancora ascoltato il video.** La verifica è per trascrizione, durate e fotogrammi.
- Da confrontare con le fonti, in particolare:
  - Il **ricorso contro il silenzio entro un anno** (art. 31 c.p.a.): non nel testo della 241, da verificare.
  - L'**art. 2 c. 8-bis** (atti di assenso tardivi inefficaci, 2020) e l'**attestazione del silenzio assenso** (art. 20 c. 2-bis, 2021): verificati solo con estratti di ricerca.
  - L'**indennizzo da ritardo**: citato senza importi (la cifra di 30 € al giorno non è verificata).
  - L'esempio dell'azienda sanitaria con termine di 60 giorni è inventato.
- **La fonte prevista dal piano del corso per il modulo 5, `Procedimento-Amministrativo.pdf`, non è disponibile** (né nel repository né su Drive). I contenuti vengono dal testo della L. 241/1990 aggiornato al 20/9/2019 (edizione Città di Torino, su Drive) e dalla dispensa CISL FP di legislazione e diritto amministrativo. Le modifiche successive al 2019 (D.L. 76/2020, L. 108/2021) sono state verificate **solo attraverso estratti di ricerca**: il proxy blocca normattiva. Va fatto un confronto con il testo vigente e con quel PDF appena c'è.
- La **dispensa CISL contiene errori** che il corso non riprende: chiama «RUP» il responsabile del procedimento, indica 18 mesi per l'annullamento d'ufficio, attribuisce all'art. 21-septies cause di nullità che non contiene, mette i vizi di merito tra quelli di legittimità e fa discendere la trasparenza dall'art. 97 Cost.
- I **termini dell'autotutela** (art. 21-nonies) sono stati omessi di proposito: il termine è cambiato più volte e le notizie più recenti non si sono potute verificare.
- Documenti personali presenti su Drive (procedimenti disciplinari, lettere di richiesta di accesso) e le **lettere CISL FP** non sono stati usati; nessuna persona è nominata.
- Il marchio è il logo CISL FP (non «Padova Rovigo»): vale quanto detto nella 1.1.
