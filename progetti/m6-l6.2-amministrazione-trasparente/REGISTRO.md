# REGISTRO — Lezione 6.2 · «Amministrazione Trasparente»

Corso **Progressione verticale · Comparto Sanità**, Modulo 6, Trasparenza nella pubblica amministrazione.
Stesso metodo, voce, marchio e palette dei moduli 1-5: voce di Luca Ward (`tVdVcJPudubxmTmAw4tE`,
`eleven_v3`), senza avatar, ≥ 7:00. Le slide usano la libreria `slide/illustra.mjs`,
che nel modulo 6 passa da 27 a 31 illustrazioni SVG originali animate: si aggiungono vetro
(un palazzo di vetro con le persone e i documenti visibili), sito (la pagina con il menu che si evidenzia), porta (che si apre) e faro (fascio che ruota).
Ogni clip dura quanto il suo blocco audio (fino a 30 s), così l'animazione d'ambiente continua per tutta la scena.

**Fonti**: D.Lgs. 33/2013 artt. 9, 12, 13, 14, 15, 20, 23, 26, 27, 29, 30, 31, 32, 33, 35, 37, 38, 41, Allegato A; delibera ANAC 1310/2016; dispense su Drive (con correzioni).

## Aritmetica

| | valore |
|---|---|
| blocchi / scene | 48 / 50 |
| caratteri | 7.288 con i tag |
| stacco | dopo **s27** |
| grezzo | A 314,32 s · B 254,56 s = 568,9 s |
| parlato lavorato | **444,1 s** (20 pose) |
| CPS misurato | 16,4 car/s sul lavorato |
| montato locale | **7:37,52** |
| montato HeyGen | **7:36,16** |

## Verifiche

- **Trascrizione delle tracce intere** (da asset audio, `eleven_scribe_v1`):
  A: 605/613 parole, 0 buchi
  B: 514/517 parole, 0 buchi
- **Confini**: **s09** veloce accanto a **s10** lento: +1 pausa sul confine, poi verifica al 100%.
  `audio/correzioni.json` = {"A": {"7": {"pause": 1}}}.
- **Temi cambiati rispetto al copione**: nessuno.
- **Slide**: PNG guardati in provini da nove, traboccamento verificato con i caratteri veri.
  - **s40**: cancellatura sostituita da un `confronto`.
  - **s49**: a capo del titolo rifatti.
  - **s18**: icona inesistente «sito» sostituita da «occhio».
- `controlli.py`: 8/8.

## Montaggio

- Lotto HeyGen `de0d4ed50a78445c9a6755da2f4421a4`: 98 file accoppiati per posizione, 0 discordi sul `content-type`.
- Payload: 50 scene; 48 scene video, tutte con `audio_asset_id` e `playback {freeze, mute}`.
- Video HeyGen: `de87685d91d1deb4001153587ba09c68` (https://app.heygen.com/videos/de87685d91d1deb4001153587ba09c68).
- Il file consegnato non si scarica da questa sessione (proxy: 403 su files2.heygen.ai).

## Costo

```
voce, due tracce, 7.288 caratteri, eleven_v3        ≈ $1,22  (misurato)
trascrizione delle due tracce intere               ≈ $0,52  (misurato)
                                                    -------
                                                    ≈ $1,73
```

## Da verificare — quello che non ho potuto giudicare io

- **Nessuno ha ancora ascoltato il video.** La verifica è per trascrizione, durate e fotogrammi.
- Da confrontare con le fonti, in particolare:
  - L'**Allegato A** del testo disponibile è la versione 2013: la struttura oggi segue gli schemi ANAC (delibera 1310/2016 e successivi).
  - **Art. 14**: dopo Corte cost. 20/2019 i dati patrimoniali valgono solo per i dirigenti apicali; da confermare.
  - **Art. 41** (sanità) e **art. 37** (contratti dopo il D.Lgs. 36/2023): da confrontare con il testo vigente.
  - Gli esempi in azienda sanitaria sono inventati a scopo didattico.
- **La fonte prevista dal piano del corso per il modulo 6, `Trasparenza-nella-Pubblica-Amministrazione.pdf`, non è disponibile** (né nel repository né su Drive). I contenuti vengono dal testo del D.Lgs. 33/2013 aggiornato al 13/3/2017 (quindi dopo il D.Lgs. 97/2016), dalla L. 190/2012 e dalle dispense su Drive. Le modifiche successive al 2017 (PIAO, D.L. 80/2021; D.Lgs. 36/2023 sui contratti; sentenza Corte cost. 20/2019 sull'art. 14) **non sono state verificate sul testo vigente**: il proxy blocca normattiva.
- Le **dispense contengono errori** che il corso non riprende: la sanzione da 500 a 10.000 € dell'art. 47 presentata come generale (vale solo per artt. 14, 4-bis c. 2, 22 c. 2); l'RPCT «di solito il Direttore amministrativo»; l'RPCT che gestisce tutte le richieste di accesso (riceve solo quelle sui dati da pubblicare e fa il riesame); il piano anticorruzione «elaborato in via esclusiva» dall'RPCT (lo adotta l'organo di indirizzo); «Determinazione» ANAC 833/2016 (è una delibera); statistiche non verificabili; il codice di comportamento elencato fra gli strumenti del D.Lgs. 33; l'accesso documentale descritto come solo formale.
- **Da verificare in generale**: PIAO (D.L. 80/2021, D.P.R. 81/2022, D.M. 132/2022); Corte cost. 20/2019 (dati patrimoniali solo per i dirigenti apicali); art. 37 dopo il D.Lgs. 36/2023; tempi d'attesa (D.L. 73/2024); schemi ANAC successivi alla delibera 1310/2016; il richiamo dell'art. 41 c. 3 all'art. 15.
- Documenti personali presenti su Drive (procedimenti disciplinari, lettere di richiesta di accesso) e le **lettere CISL FP** non sono stati usati; nessuna persona è nominata.
- Il marchio è il logo CISL FP (non «Padova Rovigo»): vale quanto detto nella 1.1.
