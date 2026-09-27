# REGISTRO — Lezione 6.5 · Chi vigila e che cosa si rischia

Corso **Progressione verticale · Comparto Sanità**, Modulo 6, Trasparenza nella pubblica amministrazione.
Stesso metodo, voce, marchio e palette dei moduli 1-5: voce di Luca Ward (`tVdVcJPudubxmTmAw4tE`,
`eleven_v3`), senza avatar, ≥ 7:00. Le slide usano la libreria `slide/illustra.mjs`,
che nel modulo 6 passa da 27 a 31 illustrazioni SVG originali animate: si aggiungono vetro
(un palazzo di vetro con le persone e i documenti visibili), sito (la pagina con il menu che si evidenzia), porta (che si apre) e faro (fascio che ruota).
Ogni clip dura quanto il suo blocco audio (fino a 30 s), così l'animazione d'ambiente continua per tutta la scena.

**Fonti**: D.Lgs. 33/2013 artt. 10, 43, 44, 45, 46, 47; artt. 15 cc. 2-3, 22 c. 4, 26 c. 3; L. 190/2012 art. 1 c. 7; D.P.R. 62/2013 art. 9; L. 689/1981; dispense su Drive (con correzioni).

## Aritmetica

| | valore |
|---|---|
| blocchi / scene | 48 / 50 |
| caratteri | 7.487 con i tag |
| stacco | dopo **s26** |
| grezzo | A 262,96 s · B 283,20 s = 546,2 s |
| parlato lavorato | **439,0 s** (21 pose) |
| CPS misurato | 17,1 car/s sul lavorato |
| montato locale | **7:32,23** |
| montato HeyGen | **7:31,02** |

## Verifiche

- **Trascrizione delle tracce intere** (da asset audio, `eleven_scribe_v1`):
  A: 549/549 parole, 0 buchi
  B: 573/573 parole, 0 buchi
- **Confini**: Nessuna coppia di segno opposto, nessun blocco fuori fascia.
  `audio/correzioni.json` = nessuna.
- **Temi cambiati rispetto al copione**: nessuno.
- **Slide**: PNG guardati in provini da nove, traboccamento verificato con i caratteri veri.
  - **s38**: il contatore non separa le migliaia, «10000» diventa «10 mila euro».
- `controlli.py`: 8/8.

## Montaggio

- Lotto HeyGen `b6e4ffaa9bec45799b70e6760803e590`: 98 file accoppiati per posizione, 0 discordi sul `content-type`.
- Payload: 50 scene; 48 scene video, tutte con `audio_asset_id` e `playback {freeze, mute}`.
- Video HeyGen: `5f455fe0792ed08070645bd556de55f4` (https://app.heygen.com/videos/5f455fe0792ed08070645bd556de55f4).
- Il file consegnato non si scarica da questa sessione (proxy: 403 su files2.heygen.ai).

## Costo

```
voce, due tracce, 7.487 caratteri, eleven_v3        ≈ $1,25  (misurato)
trascrizione delle due tracce intere               ≈ $0,50  (misurato)
                                                    -------
                                                    ≈ $1,75
```

## Da verificare — quello che non ho potuto giudicare io

- **Nessuno ha ancora ascoltato il video.** La verifica è per trascrizione, durate e fotogrammi.
- Da confrontare con le fonti, in particolare:
  - Il **PIAO** (D.L. 80/2021) e la sua sezione rischi corruttivi e trasparenza: non nel testo 2017, da verificare.
  - La **sanzione dell'art. 47** vale per artt. 14, 4-bis c. 2 e 22 c. 2: la lezione corregge le dispense che la presentano come generale.
  - L'**ANAC su segnalazione** di cittadini e associazioni: prassi dell'Autorità, non una formula letterale del decreto.
  - L'RPCT «di norma dirigente di ruolo» (L. 190 art. 1 c. 7): da confermare sul testo vigente.
  - Gli esempi (consulenza non pubblicata, direttore generale) sono inventati a scopo didattico.
- **La fonte prevista dal piano del corso per il modulo 6, `Trasparenza-nella-Pubblica-Amministrazione.pdf`, non è disponibile** (né nel repository né su Drive). I contenuti vengono dal testo del D.Lgs. 33/2013 aggiornato al 13/3/2017 (quindi dopo il D.Lgs. 97/2016), dalla L. 190/2012 e dalle dispense su Drive. Le modifiche successive al 2017 (PIAO, D.L. 80/2021; D.Lgs. 36/2023 sui contratti; sentenza Corte cost. 20/2019 sull'art. 14) **non sono state verificate sul testo vigente**: il proxy blocca normattiva.
- Le **dispense contengono errori** che il corso non riprende: la sanzione da 500 a 10.000 € dell'art. 47 presentata come generale (vale solo per artt. 14, 4-bis c. 2, 22 c. 2); l'RPCT «di solito il Direttore amministrativo»; l'RPCT che gestisce tutte le richieste di accesso (riceve solo quelle sui dati da pubblicare e fa il riesame); il piano anticorruzione «elaborato in via esclusiva» dall'RPCT (lo adotta l'organo di indirizzo); «Determinazione» ANAC 833/2016 (è una delibera); statistiche non verificabili; il codice di comportamento elencato fra gli strumenti del D.Lgs. 33; l'accesso documentale descritto come solo formale.
- **Da verificare in generale**: PIAO (D.L. 80/2021, D.P.R. 81/2022, D.M. 132/2022); Corte cost. 20/2019 (dati patrimoniali solo per i dirigenti apicali); art. 37 dopo il D.Lgs. 36/2023; tempi d'attesa (D.L. 73/2024); schemi ANAC successivi alla delibera 1310/2016; il richiamo dell'art. 41 c. 3 all'art. 15.
- Documenti personali presenti su Drive (procedimenti disciplinari, lettere di richiesta di accesso) e le **lettere CISL FP** non sono stati usati; nessuna persona è nominata.
- Il marchio è il logo CISL FP (non «Padova Rovigo»): vale quanto detto nella 1.1.
