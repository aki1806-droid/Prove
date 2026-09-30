# REGISTRO — Lezione 12.4 · Le ultime quarantotto ore

Corso **Progressione verticale · Comparto Sanità**, Modulo 12, La prova.
Stesso metodo, voce, marchio e palette dei moduli 1-11: voce di Luca Ward (`tVdVcJPudubxmTmAw4tE`,
`eleven_v3`), senza avatar, ≥ 7:00. Le slide usano la libreria `slide/illustra.mjs`,
che nel modulo 12 passa da 56 a 61 illustrazioni SVG originali animate: si aggiungono amo
(la trappola), schede e schedina (i quiz), cronometro (il tempo della prova) e traguardo (la fine del corso).
Ogni clip dura quanto il suo blocco audio (fino a 30 s), così l'animazione d'ambiente continua per tutta la scena.

**Fonti**: metodo di ripasso e di lettura dei quesiti; nessuna fonte normativa nuova. Modalità della prova: rimando al bando.

## Aritmetica

| | valore |
|---|---|
| blocchi / scene | 46 / 48 |
| caratteri | 7.153 con i tag |
| stacco | dopo **s23** |
| grezzo | A 263,20 s · B 281,28 s = 544,5 s |
| parlato lavorato | **415,0 s** (23 pose) |
| CPS misurato | 17,2 car/s sul lavorato |
| montato locale | **7:08,28** |
| montato HeyGen | **7:07,05** |

## Verifiche

- **Trascrizione delle tracce intere** (da asset audio, `eleven_scribe_v1`):
  A: 582/582 parole, 0 buchi
  B: 615/615 parole, 0 buchi
- **Confini**: Nessuna coppia di segno opposto, nessun blocco fuori fascia.
  `audio/correzioni.json` = nessuna.
- **Temi cambiati rispetto al copione**: nessuno.
- **Slide**: PNG guardati in provini da nove, traboccamento verificato con i caratteri veri.
  - **s15** e **s42**: titoli accorciati.
  - Ultima scena: copertina «Fine del corso / Buona prova».
- `controlli.py`: 8/8.

## Montaggio

- Lotto HeyGen `95b4c898af4a434dbf6eaa0aa8022fdc`: 94 file accoppiati per posizione, 0 discordi sul `content-type`.
- Payload: 48 scene; 46 scene video, tutte con `audio_asset_id` e `playback {freeze, mute}`.
- Video HeyGen: `4c04f090942d3e9af945caa816693594` (https://app.heygen.com/videos/4c04f090942d3e9af945caa816693594).
- Il file consegnato non si scarica da questa sessione (proxy: 403 su files2.heygen.ai).

## Costo

```
voce, due tracce, 7.153 caratteri, eleven_v3        ≈ $1,19  (misurato)
trascrizione delle due tracce intere               ≈ $0,49  (misurato)
                                                    -------
                                                    ≈ $1,69
```

## Da verificare — quello che non ho potuto giudicare io

- **Nessuno ha ancora ascoltato il video.** La verifica è per trascrizione, durate e fotogrammi.
- Da confrontare con le fonti, in particolare:
  - Modalità della prova (carta o computer, durata, penalità per le risposte sbagliate, materiali da portare): **non note**, da leggere nel bando.
  - Gli esempi e le domande sono costruiti a scopo didattico sui contenuti del corso; non sono domande d'esame reali.
- **Il piano del corso prevede che il modulo 12 si scriva sul bando AOUPD, che non è disponibile su Drive.** Il modulo è quindi costruito sui **contenuti già verificati del corso**: le «tre cose» e i distrattori delle lezioni 1.1-11.5, con le fonti e i punti da verificare dei rispettivi REGISTRO. **Modalità, durata, numero di domande e punteggio della prova non sono noti**: i testi non li danno mai per certi e rimandano sempre al bando.
- Come supporto è stato letto un **test multidisciplinare su Drive** (Test 7), usato solo per il tipo di trappole: contiene errori che il corso non riprende (ad esempio un limite del 30% al subappalto, non previsto dal codice vigente). Il Test 6 non è stato letto.
- **Da verificare in generale**: tutto ciò che il modulo ripete eredita i «da verificare» dei moduli 1-11, in particolare soglie e termini degli appalti (cambiano ogni due anni), termini del Titolo II del D.Lgs. 118/2011, date dei LEA e della L.R. 19/2016, durate degli incarichi e termini del procedimento disciplinare.
- Documenti personali presenti su Drive (un compito svolto da una persona, una raccolta di quiz di una persona) e le **lettere e note CISL FP** non sono stati usati; nessuna persona è nominata, né gli autori o i curatori delle dispense.
- Il marchio è il logo CISL FP (non «Padova Rovigo»): vale quanto detto nella 1.1.
