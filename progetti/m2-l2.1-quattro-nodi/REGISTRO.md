# REGISTRO — Lezione 2.1 · I quattro nodi della riforma

Corso **Progressione verticale · Comparto Sanità**, Modulo 2, Il sistema sanitario regionale del Veneto.
Stesso metodo, voce, marchio e palette del modulo 1 (vedi il REGISTRO della 1.1): slide animate e voce
di Luca Ward (`tVdVcJPudubxmTmAw4tE`, `eleven_v3`), senza avatar, ≥ 7:00.

**Fonti**: L.R. Veneto 19/2016 (artt. 1-16); dispensa CISL FP sul riordino.

## Aritmetica

| | valore |
|---|---|
| blocchi / scene | 47 / 49 |
| caratteri | 7.634 con i tag |
| stacco | dopo **s22** |
| grezzo | A 272,00 s · B 307,28 s = 579,3 s |
| parlato lavorato | **453,5 s** (6 pose) |
| CPS misurato | 16,8 car/s sul lavorato |
| montato locale | **7:46,80** |
| montato HeyGen | **7:45,49** |

## Verifiche

- **Trascrizione delle tracce intere** (da asset audio, `eleven_scribe_v1`):
  A: 583/588 parole, 0 buchi
  B: 645/659 parole, 0 buchi
- «accentrata» trascritto «centrata»: resa del trascrittore, da sentire.
- **Confini**: Il confine **s23/s24** è stato guardato col conto sul grezzo ed è rimasto dov'era: la pausa scelta è quella della frase.
  `audio/correzioni.json` = nessuna.
- **Temi cambiati rispetto al copione**: **s43** da `profondo` a `chiaro`: è un grafico di dati.
- **Slide**: PNG guardati in provini da nove, traboccamento verificato con i caratteri veri.
  - **impila**: la libreria scriveva i decimali col punto; ora con la virgola (vale per tutto il modulo).
  - **venn**: il testo toccava il bordo del cerchio, ristretto.
  - **s48**: a capo sistemati.
- `controlli.py`: 8/8.

## Montaggio

- Lotto HeyGen `47aa2aa82f53434e9916609204b8c573`: 96 file accoppiati per posizione, 0 discordi sul `content-type`.
- Payload: 49 scene; 47 scene video, tutte con `audio_asset_id` e `playback {freeze, mute}`.
- Video HeyGen: `7ebd30ad4c11d4b447dbb590c674f51a` (https://app.heygen.com/videos/7ebd30ad4c11d4b447dbb590c674f51a).
- Il file consegnato non si scarica da questa sessione (proxy: 403 su files2.heygen.ai).

## Costo

```
voce, due tracce, 7.634 caratteri, eleven_v3        ≈ $1,27  (misurato)
trascrizione delle due tracce intere               ≈ $0,53  (stimato sui secondi)
                                                    -------
                                                    ≈ $1,80
```

## Da verificare — quello che non ho potuto giudicare io

- **Nessuno ha ancora ascoltato il video.** La verifica è per trascrizione, durate e fotogrammi.
- Da confrontare con le fonti, in particolare:
  - I **«quattro nodi»** sono una sintesi del corso, non una formula della legge: vanno presentati come tali.
  - Le **12 ULSS soppresse / 9 incorporanti dal 1° gennaio 2017** (art. 14).
  - Gli obiettivi dell'art. 14: **+15% ospedali di comunità entro il 2017**, **MGI al 60% nel 2017 e all'80% nel 2018**.
- Il marchio è il logo CISL FP (non «Padova Rovigo»): vale quanto detto nella 1.1.
