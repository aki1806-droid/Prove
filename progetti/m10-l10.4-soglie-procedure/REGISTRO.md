# REGISTRO — Lezione 10.4 · Soglie e procedure

Corso **Progressione verticale · Comparto Sanità**, Modulo 10, Appalti pubblici (D.Lgs. 36/2023).
Stesso metodo, voce, marchio e palette dei moduli 1-9: voce di Luca Ward (`tVdVcJPudubxmTmAw4tE`,
`eleven_v3`), senza avatar, ≥ 7:00. Le slide usano la libreria `slide/illustra.mjs`,
che nel modulo 10 passa da 46 a 51 illustrazioni SVG originali animate: si aggiungono gru
(il cantiere dei lavori pubblici), carrello (gli acquisti), martelletto (la gara), furgone
(le forniture e il servizio che parte) e catena (gli anelli della responsabilità solidale).
Ogni clip dura quanto il suo blocco audio (fino a 30 s), così l'animazione d'ambiente continua per tutta la scena.

**Fonti**: D.Lgs. 36/2023 art. 14 (soglie), artt. 48-55 (sotto soglia), art. 49 (rotazione), art. 50, artt. 70-76 (procedure); dispense su Drive (con correzioni).

## Aritmetica

| | valore |
|---|---|
| blocchi / scene | 45 / 47 |
| caratteri | 7.340 con i tag |
| stacco | dopo **s23** |
| grezzo | A 276,08 s · B 281,44 s = 557,5 s |
| parlato lavorato | **434,4 s** (23 pose) |
| CPS misurato | 16,9 car/s sul lavorato |
| montato locale | **7:27,71** |
| montato HeyGen | **7:26,48** |

## Verifiche

- **Trascrizione delle tracce intere** (da asset audio, `eleven_scribe_v1`):
  A: 543/561 parole, 0 buchi
  B: 565/572 parole, 0 buchi
- Rese diverse, non buchi: cifre trascritte in numeri («140 000», «€2000»); **s31** «il servizio» trascritto «in servizio».
- **Confini**: Nessuna coppia di segno opposto, nessun blocco fuori fascia. La prima trascrizione della traccia A è fallita per traffico sul server (non addebitata) ed è stata ripetuta.
  `audio/correzioni.json` = nessuna.
- **Temi cambiati rispetto al copione**: nessuno.
- **Slide**: PNG guardati in provini da nove, traboccamento verificato con i caratteri veri.
  - **s17**: `tabella` degli inviti della procedura negoziata.
  - **s39**: illustrazione `cruscotto`.
- `controlli.py`: 8/8.

## Montaggio

- Lotto HeyGen `6f322a331e5f42539f5379d240ed356a`: 92 file accoppiati per posizione, 0 discordi sul `content-type`.
- Payload: 47 scene; 45 scene video, tutte con `audio_asset_id` e `playback {freeze, mute}`.
- Video HeyGen: `53e86cf7788bf89244886b299fd95e32` (https://app.heygen.com/videos/53e86cf7788bf89244886b299fd95e32).
- Il file consegnato non si scarica da questa sessione (proxy: 403 su files2.heygen.ai).

## Costo

```
voce, due tracce, 7.340 caratteri, eleven_v3        ≈ $1,23  (misurato)
trascrizione delle due tracce intere               ≈ $0,51  (misurato)
                                                    -------
                                                    ≈ $1,73
```

## Da verificare — quello che non ho potuto giudicare io

- **Nessuno ha ancora ascoltato il video.** La verifica è per trascrizione, durate e fotogrammi.
- Da confrontare con le fonti, in particolare:
  - **Soglie**: il corso dà gli ordini di grandezza (poco oltre 5 milioni; poco oltre 200.000 euro; 750.000 euro per i servizi sociali). Le cifre del biennio 2026-2027 sono da verificare.
  - Deroga alla rotazione sotto 5.000 euro; almeno tre operatori nella negoziata senza bando: da confermare sul testo vigente.
  - Gli esempi in azienda sanitaria sono inventati a scopo didattico.
- **La fonte prevista dal piano del corso per il modulo 10, `Appalti-Pubblici.pdf`, non è disponibile.** I contenuti vengono da **due dispense (slide) su Drive sul D.Lgs. 36/2023** preparate per corsi interni (una sui principi, i soggetti e le procedure; una sulle procedure e sull'esecuzione), che riportano citazioni del codice, e dalla conoscenza generale della materia. Il testo vigente del codice non è stato letto: il proxy blocca Gazzetta Ufficiale e normattiva. Sono **da verificare**.
- Le **dispense contengono errori o dati superati** che il corso non riprende: «Responsabile unico del procedimento» nell'indice (nel D.Lgs. 36/2023 è «del progetto», come dice il testo della stessa dispensa); motivi di esclusione «ex art. 80» (è l'articolo del D.Lgs. 50/2016; oggi artt. 94-98); stand still di «32 giorni» (vecchio codice; nel 36/2023 l'art. 18 c. 3 prevede 35 giorni, da verificare); stipula «entro 60 giorni» (vecchio codice; nel corso non si cita); soglie del biennio 2024-2025 presentate come vigenti (nel corso gli ordini di grandezza, perché cambiano ogni due anni).
- **Da verificare in generale**: D.Lgs. 209/2024 (correttivo) e modifiche del 2025; numero di articoli e allegati; soglie europee 2026-2027; Azienda Zero come centrale di committenza e soggetto aggregatore per la sanità veneta; art. 108 c. 4 (tetto di 30 punti al prezzo); art. 54 (esclusione automatica, almeno 5 offerte); art. 110 (termine per le spiegazioni); art. 100 c. 11 (fatturato); artt. 116, 117, 119, 120, 125, 126 (collaudo, garanzie, subappalto, quinto d'obbligo, anticipazione, penali); D.Lgs. 231/2002 (60 giorni per il servizio sanitario); art. 215 (collegio consultivo tecnico).
- Documenti personali presenti su Drive e le **lettere e note CISL FP** (per esempio quella sugli incentivi per funzioni tecniche) non sono stati usati; nessuna persona è nominata, né gli autori o i curatori delle dispense.
- Il marchio è il logo CISL FP (non «Padova Rovigo»): vale quanto detto nella 1.1.
