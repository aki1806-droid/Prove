# REGISTRO — Lezione 10.1 · Il cambio di paradigma del 2023

Corso **Progressione verticale · Comparto Sanità**, Modulo 10, Appalti pubblici (D.Lgs. 36/2023).
Stesso metodo, voce, marchio e palette dei moduli 1-9: voce di Luca Ward (`tVdVcJPudubxmTmAw4tE`,
`eleven_v3`), senza avatar, ≥ 7:00. Le slide usano la libreria `slide/illustra.mjs`,
che nel modulo 10 passa da 46 a 51 illustrazioni SVG originali animate: si aggiungono gru
(il cantiere dei lavori pubblici), carrello (gli acquisti), martelletto (la gara), furgone
(le forniture e il servizio che parte) e catena (gli anelli della responsabilità solidale).
Ogni clip dura quanto il suo blocco audio (fino a 30 s), così l'animazione d'ambiente continua per tutta la scena.

**Fonti**: L. 109/1994; D.Lgs. 163/2006; D.Lgs. 50/2016 e direttive 2014/23, 24, 25/UE; L. 78/2022 (delega); D.Lgs. 36/2023 artt. 1-11 e allegati; D.Lgs. 209/2024 (correttivo); dispense su Drive (con correzioni).

## Aritmetica

| | valore |
|---|---|
| blocchi / scene | 46 / 48 |
| caratteri | 7.354 con i tag |
| stacco | dopo **s24** |
| grezzo | A 292,40 s · B 286,32 s = 578,7 s |
| parlato lavorato | **456,5 s** (23 pose) |
| CPS misurato | 16,1 car/s sul lavorato |
| montato locale | **7:49,88** |
| montato HeyGen | **7:48,63** |

## Verifiche

- **Trascrizione delle tracce intere** (da asset audio, `eleven_scribe_v1`):
  A: 579/580 parole, 0 buchi
  B: 553/555 parole, 0 buchi
- Rese diverse, non buchi: **s02** «deve» trascritto «dev'»; **s35** «auto organizzazione» trascritto «autorganizzazione».
- **Confini**: Nessuna coppia di segno opposto, nessun blocco fuori fascia. **Il video è stato montato prima della trascrizione di verifica** (crediti ElevenLabs esauriti in quel momento); la trascrizione, fatta dopo sulle stesse tracce, non ha trovato buchi: il video resta valido.
  `audio/correzioni.json` = nessuna.
- **Temi cambiati rispetto al copione**: nessuno.
- **Slide**: PNG guardati in provini da nove, traboccamento verificato con i caratteri veri.
  - Nuove illustrazioni rifinite sui provini: `gru`, `carrello`, `martelletto`, `furgone`, `catena` (le ruote del carrello non devono sembrare croci; la catena ridisegnata più pulita).
  - **s16** e **s39**: rifatte come `confronto`.
- `controlli.py`: 8/8.

## Montaggio

- Lotto HeyGen `f8562013908547758fb71d8dd2ca8a9b`: 94 file accoppiati per posizione, 0 discordi sul `content-type`.
- Payload: 48 scene; 46 scene video, tutte con `audio_asset_id` e `playback {freeze, mute}`.
- Video HeyGen: `b1340226abc5739188370a3164e3c1ee` (https://app.heygen.com/videos/b1340226abc5739188370a3164e3c1ee).
- Il file consegnato non si scarica da questa sessione (proxy: 403 su files2.heygen.ai).

## Costo

```
voce, due tracce, 7.354 caratteri, eleven_v3        ≈ $1,23  (misurato)
trascrizione delle due tracce intere               ≈ $0,53  (misurato)
                                                    -------
                                                    ≈ $1,75
```

## Da verificare — quello che non ho potuto giudicare io

- **Nessuno ha ancora ascoltato il video.** La verifica è per trascrizione, durate e fotogrammi.
- Da confrontare con le fonti, in particolare:
  - Date: in vigore 1/4/2023, efficace 1/7/2023, digitalizzazione dal 1/1/2024; correttivo di fine 2024 (D.Lgs. 209/2024). Da confermare sul testo.
  - Elenco degli «altri principi» (artt. 5-11) riassunto per gruppi, non letto sul testo vigente.
  - Gli esempi in azienda sanitaria sono inventati a scopo didattico.
- **La fonte prevista dal piano del corso per il modulo 10, `Appalti-Pubblici.pdf`, non è disponibile.** I contenuti vengono da **due dispense (slide) su Drive sul D.Lgs. 36/2023** preparate per corsi interni (una sui principi, i soggetti e le procedure; una sulle procedure e sull'esecuzione), che riportano citazioni del codice, e dalla conoscenza generale della materia. Il testo vigente del codice non è stato letto: il proxy blocca Gazzetta Ufficiale e normattiva. Sono **da verificare**.
- Le **dispense contengono errori o dati superati** che il corso non riprende: «Responsabile unico del procedimento» nell'indice (nel D.Lgs. 36/2023 è «del progetto», come dice il testo della stessa dispensa); motivi di esclusione «ex art. 80» (è l'articolo del D.Lgs. 50/2016; oggi artt. 94-98); stand still di «32 giorni» (vecchio codice; nel 36/2023 l'art. 18 c. 3 prevede 35 giorni, da verificare); stipula «entro 60 giorni» (vecchio codice; nel corso non si cita); soglie del biennio 2024-2025 presentate come vigenti (nel corso gli ordini di grandezza, perché cambiano ogni due anni).
- **Da verificare in generale**: D.Lgs. 209/2024 (correttivo) e modifiche del 2025; numero di articoli e allegati; soglie europee 2026-2027; Azienda Zero come centrale di committenza e soggetto aggregatore per la sanità veneta; art. 108 c. 4 (tetto di 30 punti al prezzo); art. 54 (esclusione automatica, almeno 5 offerte); art. 110 (termine per le spiegazioni); art. 100 c. 11 (fatturato); artt. 116, 117, 119, 120, 125, 126 (collaudo, garanzie, subappalto, quinto d'obbligo, anticipazione, penali); D.Lgs. 231/2002 (60 giorni per il servizio sanitario); art. 215 (collegio consultivo tecnico).
- Documenti personali presenti su Drive e le **lettere e note CISL FP** (per esempio quella sugli incentivi per funzioni tecniche) non sono stati usati; nessuna persona è nominata, né gli autori o i curatori delle dispense.
- Il marchio è il logo CISL FP (non «Padova Rovigo»): vale quanto detto nella 1.1.
