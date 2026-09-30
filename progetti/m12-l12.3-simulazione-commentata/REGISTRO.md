# REGISTRO — Lezione 12.3 · Simulazione commentata

Corso **Progressione verticale · Comparto Sanità**, Modulo 12, La prova.
Stesso metodo, voce, marchio e palette dei moduli 1-11: voce di Luca Ward (`tVdVcJPudubxmTmAw4tE`,
`eleven_v3`), senza avatar, ≥ 7:00. Le slide usano la libreria `slide/illustra.mjs`,
che nel modulo 12 passa da 56 a 61 illustrazioni SVG originali animate: si aggiungono amo
(la trappola), schede e schedina (i quiz), cronometro (il tempo della prova) e traguardo (la fine del corso).
Ogni clip dura quanto il suo blocco audio (fino a 30 s), così l'animazione d'ambiente continua per tutta la scena.

**Fonti**: trenta domande costruite sui contenuti verificati delle lezioni 1.1-11.5 (vedi i rispettivi REGISTRO).

## Aritmetica

| | valore |
|---|---|
| blocchi / scene | 43 / 45 |
| caratteri | 7.098 con i tag |
| stacco | dopo **s23** |
| grezzo | A 337,68 s · B 308,24 s = 645,9 s |
| parlato lavorato | **453,1 s** (41 pose) |
| CPS misurato | 15,7 car/s sul lavorato |
| montato locale | **7:46,36** |
| montato HeyGen | **{HG}** |

## Verifiche

- **Trascrizione delle tracce intere** (da asset audio, `eleven_scribe_v1`):
  A: 574/577 parole, 0 buchi
  B: 544/544 parole, 0 buchi
- Rese diverse: **s10** e **s21** «primo» trascritto «1»; **s15** «ospedaliero universitaria» trascritto «ospedaliera universitaria» (**da ascoltare**); **s40** «ripassali per soggetto» trascritto «ripassa l ipersoggetto», stesse sillabe divise in modo diverso: regola di resa dichiarata in `audio/verifica-testo.py`, come per «il lecito» / «illecito» (**da ascoltare**).
- **Confini**: Nessuna coppia di segno opposto, nessun blocco fuori fascia.
  `audio/correzioni.json` = nessuna.
- **Temi cambiati rispetto al copione**: nessuno.
- **Slide**: PNG guardati in provini da nove, traboccamento verificato con i caratteri veri.
  - Nuovo tipo di scena `quiz` in `slide/layout.mjs`: domanda, quattro opzioni, e al momento in cui la voce dice «Risposta» le sbagliate si spengono e la giusta si accende con la spunta.
  - **s14**: titolo accorciato.
- `controlli.py`: 8/8.

## Montaggio

- Lotto HeyGen `{LOTTO}`: 88 file accoppiati per posizione, 0 discordi sul `content-type`.{EXTRA}
- Payload: 45 scene; 43 scene video, tutte con `audio_asset_id` e `playback {freeze, mute}`.
- Video HeyGen: `{VID}` (https://app.heygen.com/videos/{VID}).
- Il file consegnato non si scarica da questa sessione (proxy: 403 su files2.heygen.ai).

## Costo

```
voce, due tracce, 7.098 caratteri, eleven_v3        ≈ $1,18  (misurato)
trascrizione delle due tracce intere               ≈ $0,59  (misurato)
                                                    -------
                                                    ≈ $1,77
```

## Da verificare — quello che non ho potuto giudicare io

- **Nessuno ha ancora ascoltato il video.** La verifica è per trascrizione, durate e fotogrammi.
- Da confrontare con le fonti, in particolare:
  - Le lettere giuste (B C C A D C A B D B A B D A C B D C A B C D A B C A D B C A) sono state controllate sulle slide; i contenuti ereditano le verifiche delle lezioni d'origine.
  - Gli esempi e le domande sono costruiti a scopo didattico sui contenuti del corso; non sono domande d'esame reali.
- **Il piano del corso prevede che il modulo 12 si scriva sul bando AOUPD, che non è disponibile su Drive.** Il modulo è quindi costruito sui **contenuti già verificati del corso**: le «tre cose» e i distrattori delle lezioni 1.1-11.5, con le fonti e i punti da verificare dei rispettivi REGISTRO. **Modalità, durata, numero di domande e punteggio della prova non sono noti**: i testi non li danno mai per certi e rimandano sempre al bando.
- Come supporto è stato letto un **test multidisciplinare su Drive** (Test 7), usato solo per il tipo di trappole: contiene errori che il corso non riprende (ad esempio un limite del 30% al subappalto, non previsto dal codice vigente). Il Test 6 non è stato letto.
- **Da verificare in generale**: tutto ciò che il modulo ripete eredita i «da verificare» dei moduli 1-11, in particolare soglie e termini degli appalti (cambiano ogni due anni), termini del Titolo II del D.Lgs. 118/2011, date dei LEA e della L.R. 19/2016, durate degli incarichi e termini del procedimento disciplinare.
- Documenti personali presenti su Drive (un compito svolto da una persona, una raccolta di quiz di una persona) e le **lettere e note CISL FP** non sono stati usati; nessuna persona è nominata, né gli autori o i curatori delle dispense.
- Il marchio è il logo CISL FP (non «Padova Rovigo»): vale quanto detto nella 1.1.
