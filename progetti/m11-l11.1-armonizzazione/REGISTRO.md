# REGISTRO — Lezione 11.1 · Perché l'armonizzazione

Corso **Progressione verticale · Comparto Sanità**, Modulo 11, Contabilità delle PA (D.Lgs. 118/2011).
Stesso metodo, voce, marchio e palette dei moduli 1-10: voce di Luca Ward (`tVdVcJPudubxmTmAw4tE`,
`eleven_v3`), senza avatar, ≥ 7:00. Le slide usano la libreria `slide/illustra.mjs`,
che nel modulo 11 passa da 51 a 56 illustrazioni SVG originali animate: si aggiungono calcolatrice
(i conti), salvadanaio (la prudenza e gli accantonamenti), spartito (la stessa lingua per tutti),
matrioska (i bilanci uno dentro l'altro) e abaco (il contare).
Ogni clip dura quanto il suo blocco audio (fino a 30 s), così l'animazione d'ambiente continua per tutta la scena.

**Fonti**: D.Lgs. 502/1992; L. 42/2009 artt. 1-2 (delega); L. 196/2009; D.Lgs. 118/2011 (titoli e allegati); D.Lgs. 126/2014 (correttivo); dispensa su Drive (con correzioni).

## Aritmetica

| | valore |
|---|---|
| blocchi / scene | 47 / 49 |
| caratteri | 7.290 con i tag |
| stacco | dopo **s23** |
| grezzo | A 284,00 s · B 286,08 s = 570,1 s |
| parlato lavorato | **446,1 s** (23 pose) |
| CPS misurato | 16,3 car/s sul lavorato |
| montato locale | **7:39,51** |
| montato HeyGen | **7:38,19** |

## Verifiche

- **Trascrizione delle tracce intere** (da asset audio, `eleven_scribe_v1`):
  A: 548/548 parole, 0 buchi
  B: 603/603 parole, 0 buchi
- **Confini**: **s45/s46** (due voci del riepilogo): il confine cadeva dentro la seconda voce (-0,94 s / +0,72 s); spostato alla pausa successiva (+1,50 s). Poi nessuna coppia di segno opposto.
  `audio/correzioni.json` = {"B": {"21": {"pause": 1}}}.
- **Temi cambiati rispetto al copione**: nessuno.
- **Slide**: PNG guardati in provini da nove, traboccamento verificato con i caratteri veri.
  - Nuove illustrazioni del modulo: `spartito` (s03, la stessa lingua) e `calcolatrice` (s41).
  - **s20**: illustrazione `tavolo` (la commissione Arconet); quella scelta prima non esisteva.
- `controlli.py`: 8/8.

## Montaggio

- Lotto HeyGen `d86a3e79c97b4c9e9e70a63980f5aa23`: 96 file accoppiati per posizione, 0 discordi sul `content-type`.
- Payload: 49 scene; 47 scene video, tutte con `audio_asset_id` e `playback {freeze, mute}`.
- Video HeyGen: `e8064509d790999dfcf8b834d219ab9a` (https://app.heygen.com/videos/e8064509d790999dfcf8b834d219ab9a).
- Il file consegnato non si scarica da questa sessione (proxy: 403 su files2.heygen.ai).

## Costo

```
voce, due tracce, 7.290 caratteri, eleven_v3        ≈ $1,22  (misurato)
trascrizione delle due tracce intere               ≈ $0,52  (misurato)
                                                    -------
                                                    ≈ $1,74
```

## Da verificare — quello che non ho potuto giudicare io

- **Nessuno ha ancora ascoltato il video.** La verifica è per trascrizione, durate e fotogrammi.
- Da confrontare con le fonti, in particolare:
  - Sperimentazione dal 2012 e regime dal 2015; Titolo II applicato dal 2012; Titolo III introdotto dal correttivo del 2014: da confermare sul testo.
  - Legge regionale veneta del 1994 sulla contabilità economica delle aziende (L.R. 55/1994, citata dalla dispensa): nel corso solo l'anno.
  - Gli esempi (comuni, regioni, aziende) sono inventati a scopo didattico.
- **La fonte prevista dal piano del corso per il modulo 11 (il testo del D.Lgs. 118/2011) non è disponibile su Drive.** I contenuti vengono da una **dispensa (slide) su Drive sulla contabilità economico patrimoniale** preparata per un corso interno, da un **test multidisciplinare su organizzazione e contabilità** (su Drive), dalla **L.R. Veneto 19/2016** (Azienda Zero, copia su Drive) e dalla conoscenza generale della materia. Il testo vigente del decreto non è stato letto: il proxy blocca Gazzetta Ufficiale e normattiva. Sono **da verificare**.
- Le **fonti contengono errori** che il corso non riprende: la dispensa scrive «principio dell'unicità» (nell'allegato 1 è «dell'unità») ed elenca 17 principi generali, omettendo la prevalenza della sostanza sulla forma (sono 18); il test dà le entrate «in 6 titoli» e le spese «in 4 titoli» (incompleti: mancano anticipazioni dal tesoriere, conto terzi e partite di giro, incremento di attività finanziarie); il test chiama «annuale» il bilancio di previsione degli enti territoriali (è almeno triennale). Refusi della dispensa («IRCSS», «zooprofilatici») non ripresi.
- **Da verificare in generale**: Titolo III (ordinamento contabile delle regioni) e commissione Arconet introdotti dal D.Lgs. 126/2014; numero e contenuto degli allegati (principi applicati, piano dei conti); termini degli enti locali (DUP 31 luglio, bilancio 31 dicembre, rendiconto 30 aprile, consolidato 30 settembre); termini del Titolo II (30 aprile, 31 maggio, 30 giugno, 60 giorni); D.Lgs. 517/1999 sulle AOU; eventuali modifiche della L.R. 19/2016 dopo la versione letta.
- Documenti personali presenti su Drive (tra cui un compito svolto da una persona sul D.Lgs. 118) e le **lettere e note CISL FP** non sono stati usati; nessuna persona è nominata, né gli autori o i curatori delle dispense.
- Il marchio è il logo CISL FP (non «Padova Rovigo»): vale quanto detto nella 1.1.
