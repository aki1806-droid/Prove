# REGISTRO — Lezione 2.3 · Azienda Zero e la governance regionale

Corso **Progressione verticale · Comparto Sanità**, Modulo 2, Il sistema sanitario regionale del Veneto.
Stesso metodo, voce, marchio e palette del modulo 1 (vedi il REGISTRO della 1.1): slide animate e voce
di Luca Ward (`tVdVcJPudubxmTmAw4tE`, `eleven_v3`), senza avatar, ≥ 7:00.

**Fonti**: L.R. Veneto 19/2016, artt. 1-13 (Azienda Zero), 18-22 e 29 (direttori, commissario), 31 (organi).

## Aritmetica

| | valore |
|---|---|
| blocchi / scene | 46 / 48 |
| caratteri | 7.914 con i tag |
| stacco | dopo **s24** |
| grezzo | A 298,08 s · B 303,84 s = 601,9 s |
| parlato lavorato | **447,8 s** (3 pose) |
| CPS misurato | 17,7 car/s sul lavorato |
| montato locale | **7:41,16** |
| montato HeyGen | **7:39,86** |

## Verifiche

- **Trascrizione delle tracce intere** (da asset audio, `eleven_scribe_v1`):
  A: 606/607 parole, 0 buchi
  B: 643/643 parole, 0 buchi
- «consuntivo» trascritto «consultivo»: resa del trascrittore, da sentire.
- **Confini**: Il confine **s43/s44** è stato guardato col conto sul grezzo ed è rimasto dov'era.
  `audio/correzioni.json` = nessuna.
- **Temi cambiati rispetto al copione**: **s35** da `profondo` a `chiaro`: è una tabella.
- **Slide**: PNG guardati in provini da nove, traboccamento verificato con i caratteri veri.
  - nessuna correzione dopo i provini.
- `controlli.py`: 8/8.

## Montaggio

- Lotto HeyGen `90d45b86c63f48b1ad716b730d3bb3bc`: 94 file accoppiati per posizione, 0 discordi sul `content-type`.
- Payload: 48 scene; 46 scene video, tutte con `audio_asset_id` e `playback {freeze, mute}`.
- Video HeyGen: `0f7c0db1c81063416c4cfa2b33f0f948` (https://app.heygen.com/videos/0f7c0db1c81063416c4cfa2b33f0f948).
- Il file consegnato non si scarica da questa sessione (proxy: 403 su files2.heygen.ai).

## Costo

```
voce, due tracce, 7.914 caratteri, eleven_v3        ≈ $1,30  (stimato sui caratteri)
trascrizione delle due tracce intere               ≈ $0,55  (stimato sui secondi)
                                                    -------
                                                    ≈ $1,85
```

## Da verificare — quello che non ho potuto giudicare io

- **Nessuno ha ancora ascoltato il video.** La verifica è per trascrizione, durate e fotogrammi.
- Da confrontare con le fonti, in particolare:
  - **«Soggetto aggregatore»**: l'espressione non compare nel testo della legge; è la qualifica con cui Azienda Zero opera per gli acquisti centralizzati.
  - I direttori: **massimo due mandati consecutivi**; il coordinatore se **oltre 3.000 posti letto o 500.000 abitanti** (artt. 18-22).
  - Il **commissario: un anno, rinnovabile una volta** (art. 29).
- Il marchio è il logo CISL FP (non «Padova Rovigo»): vale quanto detto nella 1.1.
