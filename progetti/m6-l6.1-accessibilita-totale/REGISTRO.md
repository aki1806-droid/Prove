# REGISTRO — Lezione 6.1 · Dall'accesso difensivo all'accessibilità totale

Corso **Progressione verticale · Comparto Sanità**, Modulo 6, Trasparenza nella pubblica amministrazione.
Stesso metodo, voce, marchio e palette dei moduli 1-5: voce di Luca Ward (`tVdVcJPudubxmTmAw4tE`,
`eleven_v3`), senza avatar, ≥ 7:00. Le slide usano la libreria `slide/illustra.mjs`,
che nel modulo 6 passa da 27 a 31 illustrazioni SVG originali animate: si aggiungono vetro
(un palazzo di vetro con le persone e i documenti visibili), sito (la pagina con il menu che si evidenzia), porta (che si apre) e faro (fascio che ruota).
Ogni clip dura quanto il suo blocco audio (fino a 30 s), così l'animazione d'ambiente continua per tutta la scena.

**Fonti**: D.Lgs. 33/2013 artt. 1 (accessibilità totale, c. 2 principio democratico), 2, 3, 5, 6, 7, 7-bis, 8, 9, 43; D.Lgs. 97/2016 (FOIA); L. 190/2012 art. 1 cc. 7, 35; L. 241/1990 art. 22 (confronto); dispense su Drive (con correzioni).

## Aritmetica

| | valore |
|---|---|
| blocchi / scene | 47 / 49 |
| caratteri | 7.332 con i tag |
| stacco | dopo **s24** |
| grezzo | A 250,08 s · B 283,60 s = 533,7 s |
| parlato lavorato | **433,1 s** (21 pose) |
| CPS misurato | 16,9 car/s sul lavorato |
| montato locale | **7:26,44** |
| montato HeyGen | **7:25,08** |

## Verifiche

- **Trascrizione delle tracce intere** (da asset audio, `eleven_scribe_v1`):
  A: 564/564 parole, 0 buchi
  B: 575/575 parole, 0 buchi
- **Confini**: **s16** veloce accanto a **s17** lento: +1 pausa sul confine con `correzioni.json`, poi verifica al 100%.
  `audio/correzioni.json` = {"A": {"14": {"pause": 1}}}.
- **Temi cambiati rispetto al copione**: nessuno.
- **Slide**: PNG guardati in provini da nove, traboccamento verificato con i caratteri veri.
  - **s07**, **s29**: rifatte come `confronto` (niente cancellature su affermazioni non false, niente sigillo di spunta su un divieto).
  - **s22**: rifatta come `sigla` (FOIA).
  - Illustrazione `vetro`: i riflessi sembravano cancellature, sostituiti da piccoli bagliori d'angolo; `porta`: interno schiarito.
- `controlli.py`: 8/8.

## Montaggio

- Lotto HeyGen `a81ed7d1f56b436d911953b7bfbb76e5`: 96 file accoppiati per posizione, 0 discordi sul `content-type`.
- Payload: 49 scene; 47 scene video, tutte con `audio_asset_id` e `playback {freeze, mute}`.
- Video HeyGen: `bba86ab60fc63d9b0ef4e54d4eb5db54` (https://app.heygen.com/videos/bba86ab60fc63d9b0ef4e54d4eb5db54).
- Il file consegnato non si scarica da questa sessione (proxy: 403 su files2.heygen.ai).

## Costo

```
voce, due tracce, 7.332 caratteri, eleven_v3        ≈ $1,22  (misurato)
trascrizione delle due tracce intere               ≈ $0,48  (misurato)
                                                    -------
                                                    ≈ $1,71
```

## Da verificare — quello che non ho potuto giudicare io

- **Nessuno ha ancora ascoltato il video.** La verifica è per trascrizione, durate e fotogrammi.
- Da confrontare con le fonti, in particolare:
  - La formula «prima serviva, **di regola**, un interesse diretto» semplifica l'accesso della L. 241 (interesse diretto, concreto e attuale).
  - Nuove illustrazioni SVG del modulo: **vetro, sito, porta, faro** (libreria a 31 figure).
  - Gli esempi in azienda sanitaria sono inventati a scopo didattico.
- **La fonte prevista dal piano del corso per il modulo 6, `Trasparenza-nella-Pubblica-Amministrazione.pdf`, non è disponibile** (né nel repository né su Drive). I contenuti vengono dal testo del D.Lgs. 33/2013 aggiornato al 13/3/2017 (quindi dopo il D.Lgs. 97/2016), dalla L. 190/2012 e dalle dispense su Drive. Le modifiche successive al 2017 (PIAO, D.L. 80/2021; D.Lgs. 36/2023 sui contratti; sentenza Corte cost. 20/2019 sull'art. 14) **non sono state verificate sul testo vigente**: il proxy blocca normattiva.
- Le **dispense contengono errori** che il corso non riprende: la sanzione da 500 a 10.000 € dell'art. 47 presentata come generale (vale solo per artt. 14, 4-bis c. 2, 22 c. 2); l'RPCT «di solito il Direttore amministrativo»; l'RPCT che gestisce tutte le richieste di accesso (riceve solo quelle sui dati da pubblicare e fa il riesame); il piano anticorruzione «elaborato in via esclusiva» dall'RPCT (lo adotta l'organo di indirizzo); «Determinazione» ANAC 833/2016 (è una delibera); statistiche non verificabili; il codice di comportamento elencato fra gli strumenti del D.Lgs. 33; l'accesso documentale descritto come solo formale.
- **Da verificare in generale**: PIAO (D.L. 80/2021, D.P.R. 81/2022, D.M. 132/2022); Corte cost. 20/2019 (dati patrimoniali solo per i dirigenti apicali); art. 37 dopo il D.Lgs. 36/2023; tempi d'attesa (D.L. 73/2024); schemi ANAC successivi alla delibera 1310/2016; il richiamo dell'art. 41 c. 3 all'art. 15.
- Documenti personali presenti su Drive (procedimenti disciplinari, lettere di richiesta di accesso) e le **lettere CISL FP** non sono stati usati; nessuna persona è nominata.
- Il marchio è il logo CISL FP (non «Padova Rovigo»): vale quanto detto nella 1.1.
