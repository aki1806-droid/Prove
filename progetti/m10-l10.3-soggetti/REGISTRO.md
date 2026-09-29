# REGISTRO — Lezione 10.3 · I soggetti

Corso **Progressione verticale · Comparto Sanità**, Modulo 10, Appalti pubblici (D.Lgs. 36/2023).
Stesso metodo, voce, marchio e palette dei moduli 1-9: voce di Luca Ward (`tVdVcJPudubxmTmAw4tE`,
`eleven_v3`), senza avatar, ≥ 7:00. Le slide usano la libreria `slide/illustra.mjs`,
che nel modulo 10 passa da 46 a 51 illustrazioni SVG originali animate: si aggiungono gru
(il cantiere dei lavori pubblici), carrello (gli acquisti), martelletto (la gara), furgone
(le forniture e il servizio che parte) e catena (gli anelli della responsabilità solidale).
Ogni clip dura quanto il suo blocco audio (fino a 30 s), così l'animazione d'ambiente continua per tutta la scena.

**Fonti**: D.Lgs. 36/2023 allegato I.1; art. 15 e allegato I.2 (RUP); art. 16 (conflitto di interesse); artt. 62-63 e allegato II.4 (qualificazione); art. 65; art. 215; D.L. 66/2014 art. 9 (soggetti aggregatori); dispense su Drive (con correzioni).

## Aritmetica

| | valore |
|---|---|
| blocchi / scene | 47 / 49 |
| caratteri | 7.399 con i tag |
| stacco | dopo **s24** |
| grezzo | A 261,68 s · B 268,72 s = 530,4 s |
| parlato lavorato | **434,9 s** (22 pose) |
| CPS misurato | 17,0 car/s sul lavorato |
| montato locale | **7:28,27** |
| montato HeyGen | **7:26,99** |

## Verifiche

- **Trascrizione delle tracce intere** (da asset audio, `eleven_scribe_v1`):
  A: 545/547 parole, 0 buchi
  B: 590/590 parole, 0 buchi
- **Confini**: Nessuna coppia di segno opposto, nessun blocco fuori fascia.
  `audio/correzioni.json` = nessuna.
- **Temi cambiati rispetto al copione**: nessuno.
- **Slide**: PNG guardati in provini da nove, traboccamento verificato con i caratteri veri.
  - **s34**: a capo del titolo rifatti.
- `controlli.py`: 8/8.

## Montaggio

- Lotto HeyGen `4ebb57e2b46441c8aa5ff286efb6f988`: 96 file accoppiati per posizione, 0 discordi sul `content-type`.
- Payload: 49 scene; 47 scene video, tutte con `audio_asset_id` e `playback {freeze, mute}`.
- Video HeyGen: `f73201b16ac5771b66e7193d7034250e` (https://app.heygen.com/videos/f73201b16ac5771b66e7193d7034250e).
- Il file consegnato non si scarica da questa sessione (proxy: 403 su files2.heygen.ai).

## Costo

```
voce, due tracce, 7.399 caratteri, eleven_v3        ≈ $1,24  (misurato)
trascrizione delle due tracce intere               ≈ $0,48  (misurato)
                                                    -------
                                                    ≈ $1,72
```

## Da verificare — quello che non ho potuto giudicare io

- **Nessuno ha ancora ascoltato il video.** La verifica è per trascrizione, durate e fotogrammi.
- Da confrontare con le fonti, in particolare:
  - **Azienda Zero** come centrale di committenza regionale per la sanità veneta: da confermare.
  - Qualificazione delle stazioni appaltanti: soglie per procedere da sole descritte senza importi.
  - Gli esempi in azienda sanitaria sono inventati a scopo didattico.
- **La fonte prevista dal piano del corso per il modulo 10, `Appalti-Pubblici.pdf`, non è disponibile.** I contenuti vengono da **due dispense (slide) su Drive sul D.Lgs. 36/2023** preparate per corsi interni (una sui principi, i soggetti e le procedure; una sulle procedure e sull'esecuzione), che riportano citazioni del codice, e dalla conoscenza generale della materia. Il testo vigente del codice non è stato letto: il proxy blocca Gazzetta Ufficiale e normattiva. Sono **da verificare**.
- Le **dispense contengono errori o dati superati** che il corso non riprende: «Responsabile unico del procedimento» nell'indice (nel D.Lgs. 36/2023 è «del progetto», come dice il testo della stessa dispensa); motivi di esclusione «ex art. 80» (è l'articolo del D.Lgs. 50/2016; oggi artt. 94-98); stand still di «32 giorni» (vecchio codice; nel 36/2023 l'art. 18 c. 3 prevede 35 giorni, da verificare); stipula «entro 60 giorni» (vecchio codice; nel corso non si cita); soglie del biennio 2024-2025 presentate come vigenti (nel corso gli ordini di grandezza, perché cambiano ogni due anni).
- **Da verificare in generale**: D.Lgs. 209/2024 (correttivo) e modifiche del 2025; numero di articoli e allegati; soglie europee 2026-2027; Azienda Zero come centrale di committenza e soggetto aggregatore per la sanità veneta; art. 108 c. 4 (tetto di 30 punti al prezzo); art. 54 (esclusione automatica, almeno 5 offerte); art. 110 (termine per le spiegazioni); art. 100 c. 11 (fatturato); artt. 116, 117, 119, 120, 125, 126 (collaudo, garanzie, subappalto, quinto d'obbligo, anticipazione, penali); D.Lgs. 231/2002 (60 giorni per il servizio sanitario); art. 215 (collegio consultivo tecnico).
- Documenti personali presenti su Drive e le **lettere e note CISL FP** (per esempio quella sugli incentivi per funzioni tecniche) non sono stati usati; nessuna persona è nominata, né gli autori o i curatori delle dispense.
- Il marchio è il logo CISL FP (non «Padova Rovigo»): vale quanto detto nella 1.1.
