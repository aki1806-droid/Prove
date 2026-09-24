# REGISTRO — Lezione 2.6 · Il distretto potenziato

Corso **Progressione verticale · Comparto Sanità**, Modulo 2, Il sistema sanitario regionale del Veneto.
Stesso metodo, voce, marchio e palette del modulo 1 (vedi il REGISTRO della 1.1): slide animate e voce
di Luca Ward (`tVdVcJPudubxmTmAw4tE`, `eleven_v3`), senza avatar, ≥ 7:00.

**Fonti**: L.R. Veneto 19/2016 art. 26; PSSR 2019-2023 cap. 6 («Il nuovo ruolo del Distretto», pp. 92-96); dispensa CISL FP (Griggio).

## Aritmetica

| | valore |
|---|---|
| blocchi / scene | 45 / 47 |
| caratteri | 7.594 con i tag |
| stacco | dopo **s19** |
| grezzo | A 221,20 s · B 340,24 s = 561,4 s |
| parlato lavorato | **430,2 s** (5 pose) |
| CPS misurato | 17,7 car/s sul lavorato |
| montato locale | **7:23,56** |
| montato HeyGen | **7:22,30** |

## Verifiche

- **Trascrizione delle tracce intere** (da asset audio, `eleven_scribe_v1`):
  A: 484/484 parole, 0 buchi
  B: 707/707 parole, 0 buchi
- **Confini**: Nessuna coppia di segno opposto. **s03** usciva a 21,2 car/s (tetto 21): il confine era giusto, la voce era solo svelta. Aggiunta una **posa di 0,5 s** dopo s03 (prima della slide `profondo`), nel copione e in `copione/blocchi.json`. Dopo: tutti in fascia.
  `audio/correzioni.json` = nessuna (vedi posa).
- **Temi cambiati rispetto al copione**: **s41** da `profondo` a `chiaro`: è una tabella.
- **Slide**: PNG guardati in provini da nove, traboccamento verificato con i caratteri veri.
  - **s21**: blocco troppo lungo, diviso in due.
  - **s27**: la scadenza con gli anni sostituita da una slide `numero`.
- `controlli.py`: 8/8.

## Montaggio

- Lotto HeyGen `bb69752b79394bbb9f1e1eee3d0c3d07`: 92 file accoppiati per posizione, 0 discordi sul `content-type`.
- Payload: 47 scene; 45 scene video, tutte con `audio_asset_id` e `playback {freeze, mute}`.
- Video HeyGen: `0df14fbd1a28aa92bbcfa06cfd29c729` (https://app.heygen.com/videos/0df14fbd1a28aa92bbcfa06cfd29c729).
- Il file consegnato non si scarica da questa sessione (proxy: 403 su files2.heygen.ai).

## Costo

```
voce, due tracce, 7.594 caratteri, eleven_v3        ≈ $1,27  (misurato)
trascrizione delle due tracce intere               ≈ $0,51  (misurato)
                                                    -------
                                                    ≈ $1,78
```

## Da verificare — quello che non ho potuto giudicare io

- **Nessuno ha ancora ascoltato il video.** La verifica è per trascrizione, durate e fotogrammi.
- Da confrontare con le fonti, in particolare:
  - Le **Case della Salute** non sono nel PSSR 2019-2023: il copione le presenta come modello nazionale storico, oggi **Case della Comunità** del **DM 77/2022** (PNRR). Da confermare sul testo del decreto.
  - La scadenza del **Piano della domiciliarità distrettuale entro il 2019**.
  - Le **unità operative distrettuali** elencate dall'art. 26.
- Il marchio è il logo CISL FP (non «Padova Rovigo»): vale quanto detto nella 1.1.
