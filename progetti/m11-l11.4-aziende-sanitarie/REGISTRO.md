# REGISTRO — Lezione 11.4 · Il Titolo II: le aziende sanitarie

Corso **Progressione verticale · Comparto Sanità**, Modulo 11, Contabilità delle PA (D.Lgs. 118/2011).
Stesso metodo, voce, marchio e palette dei moduli 1-10: voce di Luca Ward (`tVdVcJPudubxmTmAw4tE`,
`eleven_v3`), senza avatar, ≥ 7:00. Le slide usano la libreria `slide/illustra.mjs`,
che nel modulo 11 passa da 51 a 56 illustrazioni SVG originali animate: si aggiungono calcolatrice
(i conti), salvadanaio (la prudenza e gli accantonamenti), spartito (la stessa lingua per tutti),
matrioska (i bilanci uno dentro l'altro) e abaco (il contare).
Ogni clip dura quanto il suo blocco audio (fino a 30 s), così l'animazione d'ambiente continua per tutta la scena.

**Fonti**: D.Lgs. 118/2011 Titolo II, artt. 19-32 (destinatari, perimetrazione, conti di tesoreria, contabilità economico patrimoniale, bilanci, criteri di valutazione); codice civile artt. 2423 e seguenti; DM 13/11/2007 e DM 20/3/2013 (schemi); DM 17/9/2012 (certificabilità); dispensa su Drive (con correzioni).

## Aritmetica

| | valore |
|---|---|
| blocchi / scene | 45 / 47 |
| caratteri | 7.322 con i tag |
| stacco | dopo **s23** |
| grezzo | A 269,84 s · B 288,08 s = 557,9 s |
| parlato lavorato | **450,1 s** (23 pose) |
| CPS misurato | 16,3 car/s sul lavorato |
| montato locale | **7:43,40** |
| montato HeyGen | **{HG}** |

## Verifiche

- **Trascrizione delle tracce intere** (da asset audio, `eleven_scribe_v1`):
  A: 544/546 parole, 0 buchi
  B: 567/568 parole, 0 buchi
- Rese diverse, non buchi: **s20** «e d» trascritto «ed»; **s42** «zooprofilattici» trascritto «zoo profilattici».
- **Confini**: Nessuna coppia di segno opposto, nessun blocco fuori fascia.
  `audio/correzioni.json` = nessuna.
- **Temi cambiati rispetto al copione**: nessuno.
- **Slide**: PNG guardati in provini da nove, traboccamento verificato con i caratteri veri.
  - **s33**: illustrazione `siringa` per le rimanenze di farmaci e dispositivi.
  - **s35**: `catena` della sterilizzazione degli ammortamenti.
- `controlli.py`: 8/8.

## Montaggio

- Lotto HeyGen `{LOTTO}`: 92 file accoppiati per posizione, 0 discordi sul `content-type`.{EXTRA}
- Payload: 47 scene; 45 scene video, tutte con `audio_asset_id` e `playback {freeze, mute}`.
- Video HeyGen: `{VID}` (https://app.heygen.com/videos/{VID}).
- Il file consegnato non si scarica da questa sessione (proxy: 403 su files2.heygen.ai).

## Costo

```
voce, due tracce, 7.322 caratteri, eleven_v3        ≈ $1,22  (misurato)
trascrizione delle due tracce intere               ≈ $0,51  (misurato)
                                                    -------
                                                    ≈ $1,73
```

## Da verificare — quello che non ho potuto giudicare io

- **Nessuno ha ancora ascoltato il video.** La verifica è per trascrizione, durate e fotogrammi.
- Da confrontare con le fonti, in particolare:
  - Articoli precisi del Titolo II (destinatari art. 19, perimetrazione art. 20, conti di tesoreria art. 21, criteri art. 29): da confermare.
  - Soglia dei beni di valore modesto spesati nell'anno (la dispensa dà 516,46 euro) e aliquote di ammortamento: nel corso senza cifre.
  - Gli esempi (comuni, regioni, aziende) sono inventati a scopo didattico.
- **La fonte prevista dal piano del corso per il modulo 11 (il testo del D.Lgs. 118/2011) non è disponibile su Drive.** I contenuti vengono da una **dispensa (slide) su Drive sulla contabilità economico patrimoniale** preparata per un corso interno, da un **test multidisciplinare su organizzazione e contabilità** (su Drive), dalla **L.R. Veneto 19/2016** (Azienda Zero, copia su Drive) e dalla conoscenza generale della materia. Il testo vigente del decreto non è stato letto: il proxy blocca Gazzetta Ufficiale e normattiva. Sono **da verificare**.
- Le **fonti contengono errori** che il corso non riprende: la dispensa scrive «principio dell'unicità» (nell'allegato 1 è «dell'unità») ed elenca 17 principi generali, omettendo la prevalenza della sostanza sulla forma (sono 18); il test dà le entrate «in 6 titoli» e le spese «in 4 titoli» (incompleti: mancano anticipazioni dal tesoriere, conto terzi e partite di giro, incremento di attività finanziarie); il test chiama «annuale» il bilancio di previsione degli enti territoriali (è almeno triennale). Refusi della dispensa («IRCSS», «zooprofilatici») non ripresi.
- **Da verificare in generale**: Titolo III (ordinamento contabile delle regioni) e commissione Arconet introdotti dal D.Lgs. 126/2014; numero e contenuto degli allegati (principi applicati, piano dei conti); termini degli enti locali (DUP 31 luglio, bilancio 31 dicembre, rendiconto 30 aprile, consolidato 30 settembre); termini del Titolo II (30 aprile, 31 maggio, 30 giugno, 60 giorni); D.Lgs. 517/1999 sulle AOU; eventuali modifiche della L.R. 19/2016 dopo la versione letta.
- Documenti personali presenti su Drive (tra cui un compito svolto da una persona sul D.Lgs. 118) e le **lettere e note CISL FP** non sono stati usati; nessuna persona è nominata, né gli autori o i curatori delle dispense.
- Il marchio è il logo CISL FP (non «Padova Rovigo»): vale quanto detto nella 1.1.
