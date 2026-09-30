# REGISTRO — Lezione 11.3 · Il sistema di bilancio

Corso **Progressione verticale · Comparto Sanità**, Modulo 11, Contabilità delle PA (D.Lgs. 118/2011).
Stesso metodo, voce, marchio e palette dei moduli 1-10: voce di Luca Ward (`tVdVcJPudubxmTmAw4tE`,
`eleven_v3`), senza avatar, ≥ 7:00. Le slide usano la libreria `slide/illustra.mjs`,
che nel modulo 11 passa da 51 a 56 illustrazioni SVG originali animate: si aggiungono calcolatrice
(i conti), salvadanaio (la prudenza e gli accantonamenti), spartito (la stessa lingua per tutti),
matrioska (i bilanci uno dentro l'altro) e abaco (il contare).
Ogni clip dura quanto il suo blocco audio (fino a 30 s), così l'animazione d'ambiente continua per tutta la scena.

**Fonti**: D.Lgs. 118/2011 artt. 4, 11-18 e allegati (schemi, piano dei conti integrato, principio applicato della programmazione); D.Lgs. 267/2000 (TUEL) per i termini degli enti locali; test su Drive (con correzioni).

## Aritmetica

| | valore |
|---|---|
| blocchi / scene | 47 / 49 |
| caratteri | 7.375 con i tag |
| stacco | dopo **s24** |
| grezzo | A 272,64 s · B 287,76 s = 560,4 s |
| parlato lavorato | **443,0 s** (23 pose) |
| CPS misurato | 16,6 car/s sul lavorato |
| montato locale | **7:36,36** |
| montato HeyGen | **7:35,10** |

## Verifiche

- **Trascrizione delle tracce intere** (da asset audio, `eleven_scribe_v1`):
  A: 578/579 parole, 0 buchi
  B: 586/586 parole, 0 buchi
- Resa diversa, non buco: **s18** «extratributarie» trascritto «extra tributarie».
- **Confini**: Nessuna coppia di segno opposto, nessun blocco fuori fascia.
  `audio/correzioni.json` = nessuna.
- **Temi cambiati rispetto al copione**: nessuno.
- **Slide**: PNG guardati in provini da nove, traboccamento verificato con i caratteri veri.
  - **s04** e **s34**: titoli riformulati per stare su due righe.
  - **s16**: `piramide` dei tre livelli delle entrate; **s13** e **s41**: `catena`.
- `controlli.py`: 8/8.

## Montaggio

- Lotto HeyGen `ceaafc5e2e44473f99f5eed19352fb4c`: 96 file accoppiati per posizione, 0 discordi sul `content-type`. Tre clip (s11, s30, s45) restavano ferme «in coda» nel lotto: ricaricate nel lotto `3df2e56d671c4468877feb76426d97b1` e sostituite nel payload (`_montaggio/lotto.json` aggiornato).
- Payload: 49 scene; 47 scene video, tutte con `audio_asset_id` e `playback {freeze, mute}`.
- Video HeyGen: `5828ea0103dadbfa8932a8b1a017a6ae` (https://app.heygen.com/videos/5828ea0103dadbfa8932a8b1a017a6ae).
- Il file consegnato non si scarica da questa sessione (proxy: 403 su files2.heygen.ai).

## Costo

```
voce, due tracce, 7.375 caratteri, eleven_v3        ≈ $1,23  (misurato)
trascrizione delle due tracce intere               ≈ $0,51  (misurato)
                                                    -------
                                                    ≈ $1,74
```

## Da verificare — quello che non ho potuto giudicare io

- **Nessuno ha ancora ascoltato il video.** La verifica è per trascrizione, durate e fotogrammi.
- Da confrontare con le fonti, in particolare:
  - Missione 13 «Tutela della salute» e titoli di entrata e spesa: numerazione da confermare sugli schemi vigenti.
  - Termini degli enti locali (DUP, bilancio, rendiconto, consolidato): da confermare sul TUEL vigente.
  - Gli esempi (comuni, regioni, aziende) sono inventati a scopo didattico.
- **La fonte prevista dal piano del corso per il modulo 11 (il testo del D.Lgs. 118/2011) non è disponibile su Drive.** I contenuti vengono da una **dispensa (slide) su Drive sulla contabilità economico patrimoniale** preparata per un corso interno, da un **test multidisciplinare su organizzazione e contabilità** (su Drive), dalla **L.R. Veneto 19/2016** (Azienda Zero, copia su Drive) e dalla conoscenza generale della materia. Il testo vigente del decreto non è stato letto: il proxy blocca Gazzetta Ufficiale e normattiva. Sono **da verificare**.
- Le **fonti contengono errori** che il corso non riprende: la dispensa scrive «principio dell'unicità» (nell'allegato 1 è «dell'unità») ed elenca 17 principi generali, omettendo la prevalenza della sostanza sulla forma (sono 18); il test dà le entrate «in 6 titoli» e le spese «in 4 titoli» (incompleti: mancano anticipazioni dal tesoriere, conto terzi e partite di giro, incremento di attività finanziarie); il test chiama «annuale» il bilancio di previsione degli enti territoriali (è almeno triennale). Refusi della dispensa («IRCSS», «zooprofilatici») non ripresi.
- **Da verificare in generale**: Titolo III (ordinamento contabile delle regioni) e commissione Arconet introdotti dal D.Lgs. 126/2014; numero e contenuto degli allegati (principi applicati, piano dei conti); termini degli enti locali (DUP 31 luglio, bilancio 31 dicembre, rendiconto 30 aprile, consolidato 30 settembre); termini del Titolo II (30 aprile, 31 maggio, 30 giugno, 60 giorni); D.Lgs. 517/1999 sulle AOU; eventuali modifiche della L.R. 19/2016 dopo la versione letta.
- Documenti personali presenti su Drive (tra cui un compito svolto da una persona sul D.Lgs. 118) e le **lettere e note CISL FP** non sono stati usati; nessuna persona è nominata, né gli autori o i curatori delle dispense.
- Il marchio è il logo CISL FP (non «Padova Rovigo»): vale quanto detto nella 1.1.
