# REGISTRO — Lezione 2.2 · I sei principi ispiratori

Corso **Progressione verticale · Comparto Sanità**, Modulo 2, Il sistema sanitario regionale del Veneto.
Stesso metodo, voce, marchio e palette del modulo 1 (vedi il REGISTRO della 1.1): slide animate e voce
di Luca Ward (`tVdVcJPudubxmTmAw4tE`, `eleven_v3`), senza avatar, ≥ 7:00.

**Fonti**: L.R. Veneto 19/2016 (art. 15, finalità del riordino; art. 16, Osservatorio).

## Aritmetica

| | valore |
|---|---|
| blocchi / scene | 47 / 49 |
| caratteri | 7.674 con i tag |
| stacco | dopo **s24** |
| grezzo | A 328,40 s · B 278,56 s = 607,0 s |
| parlato lavorato | **467,8 s** (6 pose) |
| CPS misurato | 16,4 car/s sul lavorato |
| montato locale | **8:01,16** |
| montato HeyGen | **7:59,82** |

## Verifiche

- **Trascrizione delle tracce intere** (da asset audio, `eleven_scribe_v1`):
  A: 581/585 parole, 0 buchi
  B: 590/600 parole, 0 buchi
- **Confini**: Nessuna coppia di segno opposto.
  `audio/correzioni.json` = nessuna.
- **Temi cambiati rispetto al copione**: **s48** da `profondo` a `chiaro`: è un grafico di dati.
- **Slide**: PNG guardati in provini da nove, traboccamento verificato con i caratteri veri.
  - **s41**: sopratitolo accorciato (usciva dalla cornice).
- `controlli.py`: 8/8.

## Montaggio

- Lotto HeyGen `6617cb75bfc943c1819b3fc8f01d0ce8`: 96 file accoppiati per posizione, 0 discordi sul `content-type`.
- Payload: 49 scene; 47 scene video, tutte con `audio_asset_id` e `playback {freeze, mute}`.
- Video HeyGen: `96a28680d10bd27d3da5a7917fa5adf5` (https://app.heygen.com/videos/96a28680d10bd27d3da5a7917fa5adf5).
- Il file consegnato non si scarica da questa sessione (proxy: 403 su files2.heygen.ai).

## Costo

```
voce, due tracce, 7.674 caratteri, eleven_v3        ≈ $1,26  (stimato sui caratteri)
trascrizione delle due tracce intere               ≈ $0,55  (stimato sui secondi)
                                                    -------
                                                    ≈ $1,81
```

## Da verificare — quello che non ho potuto giudicare io

- **Nessuno ha ancora ascoltato il video.** La verifica è per trascrizione, durate e fotogrammi.
- Da confrontare con le fonti, in particolare:
  - I **«sei principi»** sono una lettura del corso dell'art. 15, non un elenco numerato della legge.
  - La **verifica dopo tre anni** e la regola dei **due terzi** (art. 16).
- Il marchio è il logo CISL FP (non «Padova Rovigo»): vale quanto detto nella 1.1.
