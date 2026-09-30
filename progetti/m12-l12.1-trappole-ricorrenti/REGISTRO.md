# REGISTRO — Lezione 12.1 · Le trappole ricorrenti

Corso **Progressione verticale · Comparto Sanità**, Modulo 12, La prova.
Stesso metodo, voce, marchio e palette dei moduli 1-11: voce di Luca Ward (`tVdVcJPudubxmTmAw4tE`,
`eleven_v3`), senza avatar, ≥ 7:00. Le slide usano la libreria `slide/illustra.mjs`,
che nel modulo 12 passa da 56 a 61 illustrazioni SVG originali animate: si aggiungono amo
(la trappola), schede e schedina (i quiz), cronometro (il tempo della prova) e traguardo (la fine del corso).
Ogni clip dura quanto il suo blocco audio (fino a 30 s), così l'animazione d'ambiente continua per tutta la scena.

**Fonti**: i distrattori e le «tre cose» delle lezioni 1.1-11.5 (vedi i rispettivi REGISTRO); test su Drive solo per il tipo di trappole (con correzioni).

## Aritmetica

| | valore |
|---|---|
| blocchi / scene | 45 / 47 |
| caratteri | 7.539 con i tag |
| stacco | dopo **s23** |
| grezzo | A 316,48 s · B 317,44 s = 633,9 s |
| parlato lavorato | **493,0 s** (23 pose) |
| CPS misurato | 15,3 car/s sul lavorato |
| montato locale | **8:26,24** |
| montato HeyGen | **8:25,07** |

## Verifiche

- **Trascrizione delle tracce intere** (da asset audio, `eleven_scribe_v1`):
  A: 681/684 parole, 0 buchi
  B: 626/627 parole, 0 buchi
- Rese diverse, non buchi: **s07** e **s10** «primo» trascritto «1»; **s30** «10000» trascritto «10 000».
- **Confini**: Nessuna coppia di segno opposto. Scarti singoli ampi (s11 +3,86 s, s15 +3,43 s, s17 -3,29 s, s19 -3,67 s) dovuti ai blocchi densi di numeri, letti più lentamente: `silencedetect` non trova pause lunghe interne; accettati.
  `audio/correzioni.json` = nessuna.
- **Temi cambiati rispetto al copione**: nessuno.
- **Slide**: PNG guardati in provini da nove, traboccamento verificato con i caratteri veri.
  - Nuove illustrazioni del modulo: `amo` (la trappola), `schede`, `schedina`, `cronometro`, `traguardo`; usate solo su tema chiaro.
  - **s04** e **s41**: titoli accorciati per stare su due righe.
- `controlli.py`: 8/8.

## Montaggio

- Lotto HeyGen `8f683c1ebbca4f188448aafc61e30662`: 92 file accoppiati per posizione, 0 discordi sul `content-type`.
- Payload: 47 scene; 45 scene video, tutte con `audio_asset_id` e `playback {freeze, mute}`.
- Video HeyGen: `c00a1cb88ee8764d401b0e1e68544b1b` (https://app.heygen.com/videos/c00a1cb88ee8764d401b0e1e68544b1b).
- Il file consegnato non si scarica da questa sessione (proxy: 403 su files2.heygen.ai).

## Costo

```
voce, due tracce, 7.539 caratteri, eleven_v3        ≈ $1,26  (misurato)
trascrizione delle due tracce intere               ≈ $0,58  (misurato)
                                                    -------
                                                    ≈ $1,83
```

## Da verificare — quello che non ho potuto giudicare io

- **Nessuno ha ancora ascoltato il video.** La verifica è per trascrizione, durate e fotogrammi.
- Da confrontare con le fonti, in particolare:
  - Ogni trappola citata viene da una lezione precedente: vale la verifica di quella lezione.
  - Gli esempi e le domande sono costruiti a scopo didattico sui contenuti del corso; non sono domande d'esame reali.
- **Il piano del corso prevede che il modulo 12 si scriva sul bando AOUPD, che non è disponibile su Drive.** Il modulo è quindi costruito sui **contenuti già verificati del corso**: le «tre cose» e i distrattori delle lezioni 1.1-11.5, con le fonti e i punti da verificare dei rispettivi REGISTRO. **Modalità, durata, numero di domande e punteggio della prova non sono noti**: i testi non li danno mai per certi e rimandano sempre al bando.
- Come supporto è stato letto un **test multidisciplinare su Drive** (Test 7), usato solo per il tipo di trappole: contiene errori che il corso non riprende (ad esempio un limite del 30% al subappalto, non previsto dal codice vigente). Il Test 6 non è stato letto.
- **Da verificare in generale**: tutto ciò che il modulo ripete eredita i «da verificare» dei moduli 1-11, in particolare soglie e termini degli appalti (cambiano ogni due anni), termini del Titolo II del D.Lgs. 118/2011, date dei LEA e della L.R. 19/2016, durate degli incarichi e termini del procedimento disciplinare.
- Documenti personali presenti su Drive (un compito svolto da una persona, una raccolta di quiz di una persona) e le **lettere e note CISL FP** non sono stati usati; nessuna persona è nominata, né gli autori o i curatori delle dispense.
- Il marchio è il logo CISL FP (non «Padova Rovigo»): vale quanto detto nella 1.1.
