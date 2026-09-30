# REGISTRO — Lezione 12.2 · Le sessanta date e numeri

Corso **Progressione verticale · Comparto Sanità**, Modulo 12, La prova.
Stesso metodo, voce, marchio e palette dei moduli 1-11: voce di Luca Ward (`tVdVcJPudubxmTmAw4tE`,
`eleven_v3`), senza avatar, ≥ 7:00. Le slide usano la libreria `slide/illustra.mjs`,
che nel modulo 12 passa da 56 a 61 illustrazioni SVG originali animate: si aggiungono amo
(la trappola), schede e schedina (i quiz), cronometro (il tempo della prova) e traguardo (la fine del corso).
Ogni clip dura quanto il suo blocco audio (fino a 30 s), così l'animazione d'ambiente continua per tutta la scena.

**Fonti**: le «tre cose» e i distrattori delle lezioni 1.1-11.5 (vedi i rispettivi REGISTRO).

## Aritmetica

| | valore |
|---|---|
| blocchi / scene | 47 / 49 |
| caratteri | 7.197 con i tag |
| stacco | dopo **s21** |
| grezzo | A 319,28 s · B 408,88 s = 728,2 s |
| parlato lavorato | **513,5 s** (20 pose) |
| CPS misurato | 14,0 car/s sul lavorato |
| montato locale | **8:46,88** |
| montato HeyGen | **{HG}** |

## Verifiche

- **Trascrizione delle tracce intere** (da asset audio, `eleven_scribe_v1`):
  A: 478/479 parole, 0 buchi
  B: 628/632 parole, 0 buchi
- Resa diversa, non buco: **s15** «primo» trascritto «1».
- **Confini**: **s16/s17** (-1,14 s / +1,13 s): confine spostato alla pausa successiva (+1,69 s). **s27/s28** (+0,98 s / -1,66 s): confine spostato alla pausa precedente (-2,63 s). Poi tutti i blocchi entro ±0,6 s.
  `audio/correzioni.json` = {"A": {"14": {"pause": 1}}, "B": {"5": {"pause": -1}}}.
- **Temi cambiati rispetto al copione**: nessuno.
- **Slide**: PNG guardati in provini da nove, traboccamento verificato con i caratteri veri.
  - Le sessanta voci sono `elenco` numerati con `da:N`, generati dalla lista delle voci: numero e testo sulla slide coincidono con quelli detti.
  - Nessuna correzione dopo i provini.
- `controlli.py`: 8/8.

## Montaggio

- Lotto HeyGen `{LOTTO}`: 96 file accoppiati per posizione, 0 discordi sul `content-type`.{EXTRA}
- Payload: 49 scene; 47 scene video, tutte con `audio_asset_id` e `playback {freeze, mute}`.
- Video HeyGen: `{VID}` (https://app.heygen.com/videos/{VID}).
- Il file consegnato non si scarica da questa sessione (proxy: 403 su files2.heygen.ai).

## Costo

```
voce, due tracce, 7.197 caratteri, eleven_v3        ≈ $1,20  (misurato)
trascrizione delle due tracce intere               ≈ $0,66  (misurato)
                                                    -------
                                                    ≈ $1,86
```

## Da verificare — quello che non ho potuto giudicare io

- **Nessuno ha ancora ascoltato il video.** La verifica è per trascrizione, durate e fotogrammi.
- Da confrontare con le fonti, in particolare:
  - Soglie degli appalti (140.000 euro servizi e forniture, 150.000 lavori, soglie europee), punteggio massimo al prezzo (30), numero di operatori invitati: da confermare sul testo vigente.
  - Termini del procedimento disciplinare (30, 20, 120 giorni), sospensione massima, termini del ciclo della performance: da confermare.
  - Sanzioni per gli obblighi di pubblicazione (500-10.000 euro) e termine del riesame (20 giorni): da confermare.
  - Gli esempi e le domande sono costruiti a scopo didattico sui contenuti del corso; non sono domande d'esame reali.
- **Il piano del corso prevede che il modulo 12 si scriva sul bando AOUPD, che non è disponibile su Drive.** Il modulo è quindi costruito sui **contenuti già verificati del corso**: le «tre cose» e i distrattori delle lezioni 1.1-11.5, con le fonti e i punti da verificare dei rispettivi REGISTRO. **Modalità, durata, numero di domande e punteggio della prova non sono noti**: i testi non li danno mai per certi e rimandano sempre al bando.
- Come supporto è stato letto un **test multidisciplinare su Drive** (Test 7), usato solo per il tipo di trappole: contiene errori che il corso non riprende (ad esempio un limite del 30% al subappalto, non previsto dal codice vigente). Il Test 6 non è stato letto.
- **Da verificare in generale**: tutto ciò che il modulo ripete eredita i «da verificare» dei moduli 1-11, in particolare soglie e termini degli appalti (cambiano ogni due anni), termini del Titolo II del D.Lgs. 118/2011, date dei LEA e della L.R. 19/2016, durate degli incarichi e termini del procedimento disciplinare.
- Documenti personali presenti su Drive (un compito svolto da una persona, una raccolta di quiz di una persona) e le **lettere e note CISL FP** non sono stati usati; nessuna persona è nominata, né gli autori o i curatori delle dispense.
- Il marchio è il logo CISL FP (non «Padova Rovigo»): vale quanto detto nella 1.1.
