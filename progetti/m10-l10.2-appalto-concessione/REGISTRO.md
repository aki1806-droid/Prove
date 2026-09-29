# REGISTRO — Lezione 10.2 · Appalto, concessione, ambito

Corso **Progressione verticale · Comparto Sanità**, Modulo 10, Appalti pubblici (D.Lgs. 36/2023).
Stesso metodo, voce, marchio e palette dei moduli 1-9: voce di Luca Ward (`tVdVcJPudubxmTmAw4tE`,
`eleven_v3`), senza avatar, ≥ 7:00. Le slide usano la libreria `slide/illustra.mjs`,
che nel modulo 10 passa da 46 a 51 illustrazioni SVG originali animate: si aggiungono gru
(il cantiere dei lavori pubblici), carrello (gli acquisti), martelletto (la gara), furgone
(le forniture e il servizio che parte) e catena (gli anelli della responsabilità solidale).
Ogni clip dura quanto il suo blocco audio (fino a 30 s), così l'animazione d'ambiente continua per tutta la scena.

**Fonti**: D.Lgs. 36/2023 allegato I.1 (definizioni), artt. 13, 14, 56, 177; Libri III e IV; R.D. 2440/1923 (contratti attivi); dispense su Drive (con correzioni).

## Aritmetica

| | valore |
|---|---|
| blocchi / scene | 48 / 50 |
| caratteri | 7.282 con i tag |
| stacco | dopo **s25** |
| grezzo | A 294,08 s · B 266,96 s = 561,0 s |
| parlato lavorato | **438,9 s** (23 pose) |
| CPS misurato | 16,6 car/s sul lavorato |
| montato locale | **7:32,16** |
| montato HeyGen | **7:30,96** |

## Verifiche

- **Trascrizione delle tracce intere** (da asset audio, `eleven_scribe_v1`):
  A: 590/590 parole, 0 buchi
  B: 570/570 parole, 0 buchi
- **Confini**: Nessuna coppia di segno opposto, nessun blocco fuori fascia. **Traccia B rigenerata**: nella prima presa «È un frazionamento vietato» (s42) risultava «È vato» (buco di tre parole, trovato dalla trascrizione). Seconda presa: 570/570 parole. Tagli, confini e clip rifatti; il primo video (`76e433298af9728e906e5e9672b77605`) è **sostituito** da quello qui sotto.
  `audio/correzioni.json` = nessuna.
- **Temi cambiati rispetto al copione**: nessuno.
- **Slide**: PNG guardati in provini da nove, traboccamento verificato con i caratteri veri.
  - **s23**: illustrazione `furgone` (le forniture).
  - **s40**: icona sostituita con `cuoremano` (quella scelta non esisteva).
- `controlli.py`: 8/8.

## Montaggio

- Lotto HeyGen `0620465ddb604fb98d5a1fd72c834925`: 98 file accoppiati per posizione, 0 discordi sul `content-type`.
- Payload: 50 scene; 48 scene video, tutte con `audio_asset_id` e `playback {freeze, mute}`.
- Video HeyGen: `cd96e078ef6c86ed0e81f13e0d7b8fdc` (https://app.heygen.com/videos/cd96e078ef6c86ed0e81f13e0d7b8fdc).
- Il file consegnato non si scarica da questa sessione (proxy: 403 su files2.heygen.ai).

## Costo

```
voce, due tracce, 7.282 caratteri, eleven_v3        ≈ $1,22  (misurato)
trascrizione delle due tracce intere               ≈ $0,51  (misurato)
scarti (prima traccia B scartata e sua trascrizione)  ≈ $0,85
                                                    -------
                                                    ≈ $2,57
```

## Da verificare — quello che non ho potuto giudicare io

- **Nessuno ha ancora ascoltato il video.** La verifica è per trascrizione, durate e fotogrammi.
- Da confrontare con le fonti, in particolare:
  - Rischio operativo (lato domanda e lato offerta) e durata delle concessioni: descritti in sintesi.
  - Contratti esclusi: elenco d'esempio, non completo.
  - Gli esempi in azienda sanitaria sono inventati a scopo didattico.
- **La fonte prevista dal piano del corso per il modulo 10, `Appalti-Pubblici.pdf`, non è disponibile.** I contenuti vengono da **due dispense (slide) su Drive sul D.Lgs. 36/2023** preparate per corsi interni (una sui principi, i soggetti e le procedure; una sulle procedure e sull'esecuzione), che riportano citazioni del codice, e dalla conoscenza generale della materia. Il testo vigente del codice non è stato letto: il proxy blocca Gazzetta Ufficiale e normattiva. Sono **da verificare**.
- Le **dispense contengono errori o dati superati** che il corso non riprende: «Responsabile unico del procedimento» nell'indice (nel D.Lgs. 36/2023 è «del progetto», come dice il testo della stessa dispensa); motivi di esclusione «ex art. 80» (è l'articolo del D.Lgs. 50/2016; oggi artt. 94-98); stand still di «32 giorni» (vecchio codice; nel 36/2023 l'art. 18 c. 3 prevede 35 giorni, da verificare); stipula «entro 60 giorni» (vecchio codice; nel corso non si cita); soglie del biennio 2024-2025 presentate come vigenti (nel corso gli ordini di grandezza, perché cambiano ogni due anni).
- **Da verificare in generale**: D.Lgs. 209/2024 (correttivo) e modifiche del 2025; numero di articoli e allegati; soglie europee 2026-2027; Azienda Zero come centrale di committenza e soggetto aggregatore per la sanità veneta; art. 108 c. 4 (tetto di 30 punti al prezzo); art. 54 (esclusione automatica, almeno 5 offerte); art. 110 (termine per le spiegazioni); art. 100 c. 11 (fatturato); artt. 116, 117, 119, 120, 125, 126 (collaudo, garanzie, subappalto, quinto d'obbligo, anticipazione, penali); D.Lgs. 231/2002 (60 giorni per il servizio sanitario); art. 215 (collegio consultivo tecnico).
- Documenti personali presenti su Drive e le **lettere e note CISL FP** (per esempio quella sugli incentivi per funzioni tecniche) non sono stati usati; nessuna persona è nominata, né gli autori o i curatori delle dispense.
- Il marchio è il logo CISL FP (non «Padova Rovigo»): vale quanto detto nella 1.1.
