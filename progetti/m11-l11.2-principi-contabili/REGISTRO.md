# REGISTRO — Lezione 11.2 · I principi contabili

Corso **Progressione verticale · Comparto Sanità**, Modulo 11, Contabilità delle PA (D.Lgs. 118/2011).
Stesso metodo, voce, marchio e palette dei moduli 1-10: voce di Luca Ward (`tVdVcJPudubxmTmAw4tE`,
`eleven_v3`), senza avatar, ≥ 7:00. Le slide usano la libreria `slide/illustra.mjs`,
che nel modulo 11 passa da 51 a 56 illustrazioni SVG originali animate: si aggiungono calcolatrice
(i conti), salvadanaio (la prudenza e gli accantonamenti), spartito (la stessa lingua per tutti),
matrioska (i bilanci uno dentro l'altro) e abaco (il contare).
Ogni clip dura quanto il suo blocco audio (fino a 30 s), così l'animazione d'ambiente continua per tutta la scena.

**Fonti**: D.Lgs. 118/2011 art. 3 e allegato 1 (principi generali), allegato 4/2 (competenza finanziaria potenziata, FPV, FCDE); dispensa e test su Drive (con correzioni).

## Aritmetica

| | valore |
|---|---|
| blocchi / scene | 47 / 49 |
| caratteri | 7.259 con i tag |
| stacco | dopo **s23** |
| grezzo | A 264,32 s · B 273,04 s = 537,4 s |
| parlato lavorato | **428,8 s** (23 pose) |
| CPS misurato | 16,9 car/s sul lavorato |
| montato locale | **7:22,07** |
| montato HeyGen | **{HG}** |

## Verifiche

- **Trascrizione delle tracce intere** (da asset audio, `eleven_scribe_v1`):
  A: 529/531 parole, 0 buchi
  B: 627/629 parole, 0 buchi
- Rese diverse, non buchi: **s07** «primo» trascritto «1»; **s09** «ai» trascritto «a».
- **Confini**: **s45/s46** (due voci del riepilogo): il confine cadeva dentro la seconda voce (-1,05 s / +1,68 s); spostato alla pausa successiva (+1,68 s). Poi nessuna coppia di segno opposto.
  `audio/correzioni.json` = {"B": {"21": {"pause": 1}}}.
- **Temi cambiati rispetto al copione**: nessuno.
- **Slide**: PNG guardati in provini da nove, traboccamento verificato con i caratteri veri.
  - Nuove illustrazioni: `salvadanaio` (s17 la prudenza, s37 il fondo crediti), `matrioska` (s20 la sostanza sulla forma), `abaco` (s30).
  - **s41**: `barre` delle multe (accertate, riscosse, nel fondo).
- `controlli.py`: 8/8.

## Montaggio

- Lotto HeyGen `{LOTTO}`: 96 file accoppiati per posizione, 0 discordi sul `content-type`.{EXTRA}
- Payload: 49 scene; 47 scene video, tutte con `audio_asset_id` e `playback {freeze, mute}`.
- Video HeyGen: `{VID}` (https://app.heygen.com/videos/{VID}).
- Il file consegnato non si scarica da questa sessione (proxy: 403 su files2.heygen.ai).

## Costo

```
voce, due tracce, 7.259 caratteri, eleven_v3        ≈ $1,21  (misurato)
trascrizione delle due tracce intere               ≈ $0,49  (misurato)
                                                    -------
                                                    ≈ $1,70
```

## Da verificare — quello che non ho potuto giudicare io

- **Nessuno ha ancora ascoltato il video.** La verifica è per trascrizione, durate e fotogrammi.
- Da confrontare con le fonti, in particolare:
  - Elenco dei 18 principi generali, raggruppati nel corso: da confrontare con l'allegato 1 vigente.
  - Regole del debito (solo investimenti) e del recupero del disavanzo descritte in sintesi.
  - Gli esempi (comuni, regioni, aziende) sono inventati a scopo didattico.
- **La fonte prevista dal piano del corso per il modulo 11 (il testo del D.Lgs. 118/2011) non è disponibile su Drive.** I contenuti vengono da una **dispensa (slide) su Drive sulla contabilità economico patrimoniale** preparata per un corso interno, da un **test multidisciplinare su organizzazione e contabilità** (su Drive), dalla **L.R. Veneto 19/2016** (Azienda Zero, copia su Drive) e dalla conoscenza generale della materia. Il testo vigente del decreto non è stato letto: il proxy blocca Gazzetta Ufficiale e normattiva. Sono **da verificare**.
- Le **fonti contengono errori** che il corso non riprende: la dispensa scrive «principio dell'unicità» (nell'allegato 1 è «dell'unità») ed elenca 17 principi generali, omettendo la prevalenza della sostanza sulla forma (sono 18); il test dà le entrate «in 6 titoli» e le spese «in 4 titoli» (incompleti: mancano anticipazioni dal tesoriere, conto terzi e partite di giro, incremento di attività finanziarie); il test chiama «annuale» il bilancio di previsione degli enti territoriali (è almeno triennale). Refusi della dispensa («IRCSS», «zooprofilatici») non ripresi.
- **Da verificare in generale**: Titolo III (ordinamento contabile delle regioni) e commissione Arconet introdotti dal D.Lgs. 126/2014; numero e contenuto degli allegati (principi applicati, piano dei conti); termini degli enti locali (DUP 31 luglio, bilancio 31 dicembre, rendiconto 30 aprile, consolidato 30 settembre); termini del Titolo II (30 aprile, 31 maggio, 30 giugno, 60 giorni); D.Lgs. 517/1999 sulle AOU; eventuali modifiche della L.R. 19/2016 dopo la versione letta.
- Documenti personali presenti su Drive (tra cui un compito svolto da una persona sul D.Lgs. 118) e le **lettere e note CISL FP** non sono stati usati; nessuna persona è nominata, né gli autori o i curatori delle dispense.
- Il marchio è il logo CISL FP (non «Padova Rovigo»): vale quanto detto nella 1.1.
