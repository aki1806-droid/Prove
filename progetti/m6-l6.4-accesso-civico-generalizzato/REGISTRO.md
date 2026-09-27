# REGISTRO — Lezione 6.4 · L'accesso civico generalizzato (FOIA)

Corso **Progressione verticale · Comparto Sanità**, Modulo 6, Trasparenza nella pubblica amministrazione.
Stesso metodo, voce, marchio e palette dei moduli 1-5: voce di Luca Ward (`tVdVcJPudubxmTmAw4tE`,
`eleven_v3`), senza avatar, ≥ 7:00. Le slide usano la libreria `slide/illustra.mjs`,
che nel modulo 6 passa da 27 a 31 illustrazioni SVG originali animate: si aggiungono vetro
(un palazzo di vetro con le persone e i documenti visibili), sito (la pagina con il menu che si evidenzia), porta (che si apre) e faro (fascio che ruota).
Ogni clip dura quanto il suo blocco audio (fino a 30 s), così l'animazione d'ambiente continua per tutta la scena.

**Fonti**: D.Lgs. 33/2013 art. 5 cc. 2-9, art. 5-bis, art. 46 c. 1; linee guida ANAC delibera 1309/2016 (d'intesa con il Garante); dispense su Drive (con correzioni).

## Aritmetica

| | valore |
|---|---|
| blocchi / scene | 47 / 49 |
| caratteri | 7.503 con i tag |
| stacco | dopo **s24** |
| grezzo | A 259,76 s · B 267,52 s = 527,3 s |
| parlato lavorato | **431,6 s** (21 pose) |
| CPS misurato | 17,4 car/s sul lavorato |
| montato locale | **7:24,92** |
| montato HeyGen | **{HG}** |

## Verifiche

- **Trascrizione delle tracce intere** (da asset audio, `eleven_scribe_v1`):
  A: 558/558 parole, 0 buchi
  B: 617/617 parole, 0 buchi
- **Confini**: Nessuna coppia di segno opposto, nessun blocco fuori fascia.
  `audio/correzioni.json` = nessuna.
- **Temi cambiati rispetto al copione**: nessuno.
- **Slide**: PNG guardati in provini da nove, traboccamento verificato con i caratteri veri.
  - **s24**: grafico di dati sul tema profondo sostituito da un `titolo`.
  - **s26**: cella vuota della `griglia` tolta.
  - **s39**: sigillo di spunta tolto (ora `confronto`).
- `controlli.py`: 8/8.

## Montaggio

- Lotto HeyGen `{LOTTO}`: 96 file accoppiati per posizione, 0 discordi sul `content-type`.{EXTRA}
- Payload: 49 scene; 47 scene video, tutte con `audio_asset_id` e `playback {freeze, mute}`.
- Video HeyGen: `{VID}` (https://app.heygen.com/videos/{VID}).
- Il file consegnato non si scarica da questa sessione (proxy: 403 su files2.heygen.ai).

## Costo

```
voce, due tracce, 7.503 caratteri, eleven_v3        ≈ $1,25  (misurato)
trascrizione delle due tracce intere               ≈ $0,48  (misurato)
                                                    -------
                                                    ≈ $1,73
```

## Da verificare — quello che non ho potuto giudicare io

- **Nessuno ha ancora ascoltato il video.** La verifica è per trascrizione, durate e fotogrammi.
- Da confrontare con le fonti, in particolare:
  - «Nessun obbligo di **creare documenti nuovi** o fare elaborazioni»: indicazione delle linee guida ANAC 1309/2016, non della legge.
  - Il **difensore civico** (c. 8) vale per regioni ed enti locali: l'applicazione alle aziende sanitarie va confermata.
  - Gli esempi (giornalista, associazione di pazienti, offerta di gara) sono inventati a scopo didattico.
- **La fonte prevista dal piano del corso per il modulo 6, `Trasparenza-nella-Pubblica-Amministrazione.pdf`, non è disponibile** (né nel repository né su Drive). I contenuti vengono dal testo del D.Lgs. 33/2013 aggiornato al 13/3/2017 (quindi dopo il D.Lgs. 97/2016), dalla L. 190/2012 e dalle dispense su Drive. Le modifiche successive al 2017 (PIAO, D.L. 80/2021; D.Lgs. 36/2023 sui contratti; sentenza Corte cost. 20/2019 sull'art. 14) **non sono state verificate sul testo vigente**: il proxy blocca normattiva.
- Le **dispense contengono errori** che il corso non riprende: la sanzione da 500 a 10.000 € dell'art. 47 presentata come generale (vale solo per artt. 14, 4-bis c. 2, 22 c. 2); l'RPCT «di solito il Direttore amministrativo»; l'RPCT che gestisce tutte le richieste di accesso (riceve solo quelle sui dati da pubblicare e fa il riesame); il piano anticorruzione «elaborato in via esclusiva» dall'RPCT (lo adotta l'organo di indirizzo); «Determinazione» ANAC 833/2016 (è una delibera); statistiche non verificabili; il codice di comportamento elencato fra gli strumenti del D.Lgs. 33; l'accesso documentale descritto come solo formale.
- **Da verificare in generale**: PIAO (D.L. 80/2021, D.P.R. 81/2022, D.M. 132/2022); Corte cost. 20/2019 (dati patrimoniali solo per i dirigenti apicali); art. 37 dopo il D.Lgs. 36/2023; tempi d'attesa (D.L. 73/2024); schemi ANAC successivi alla delibera 1310/2016; il richiamo dell'art. 41 c. 3 all'art. 15.
- Documenti personali presenti su Drive (procedimenti disciplinari, lettere di richiesta di accesso) e le **lettere CISL FP** non sono stati usati; nessuna persona è nominata.
- Il marchio è il logo CISL FP (non «Padova Rovigo»): vale quanto detto nella 1.1.
