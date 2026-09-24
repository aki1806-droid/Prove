# REGISTRO — Lezione 2.4 · La nuova geografia sanitaria

Corso **Progressione verticale · Comparto Sanità**, Modulo 2, Il sistema sanitario regionale del Veneto.
Stesso metodo, voce, marchio e palette del modulo 1 (vedi il REGISTRO della 1.1): slide animate e voce
di Luca Ward (`tVdVcJPudubxmTmAw4tE`, `eleven_v3`), senza avatar, ≥ 7:00.

**Fonti**: L.R. Veneto 19/2016, art. 14 e allegati (ambiti delle nuove ULSS).

## Aritmetica

| | valore |
|---|---|
| blocchi / scene | 48 / 50 |
| caratteri | 7.677 con i tag |
| stacco | dopo **s25** |
| grezzo | A 313,52 s · B 327,52 s = 641,0 s |
| parlato lavorato | **468,2 s** (3 pose) |
| CPS misurato | 16,4 car/s sul lavorato |
| montato locale | **8:01,56** |
| montato HeyGen | **8:00,18** |

## Verifiche

- **Trascrizione delle tracce intere** (da asset audio, `eleven_scribe_v1`):
  A: 624/624 parole, 0 buchi
  B: 630/638 parole, 0 buchi
- **Confini**: Una coppia sospetta, **s33/s34** (traccia B), decisa col conto sul grezzo: il confine giusto è la pausa successiva. Dopo: nessuna coppia sospetta.
  `audio/correzioni.json` = `{"B": {"7": {"pause": 1}}}`.
- **Temi cambiati rispetto al copione**: **s24** da `profondo` a `chiaro`: è una tabella.
- **Slide**: PNG guardati in provini da nove, traboccamento verificato con i caratteri veri.
  - Le tabelle da 8-9 righe uscivano dalla cornice: aggiunto lo stile `fittissima` alla libreria.
  - Il copione arrivava a 51 scene (tetto 50): due blocchi uniti.
  - Correzione di contenuto prima della voce: le ULSS che ne incorporano due sono **quattro** (Euganea compresa), non tre.
- `controlli.py`: 8/8.

## Montaggio

- Lotto HeyGen `2eaf8f4f19eb4dc2abda209cd0d29b4f`: 98 file accoppiati per posizione, 0 discordi sul `content-type`.
- Payload: 50 scene; 48 scene video, tutte con `audio_asset_id` e `playback {freeze, mute}`.
- Video HeyGen: `016c445906bd105f6837c1a45388eed7` (https://app.heygen.com/videos/016c445906bd105f6837c1a45388eed7).
- Il file consegnato non si scarica da questa sessione (proxy: 403 su files2.heygen.ai).

## Costo

```
voce, due tracce, 7.677 caratteri, eleven_v3        ≈ $1,26  (stimato sui caratteri)
trascrizione delle due tracce intere               ≈ $0,58  (stimato sui secondi)
                                                    -------
                                                    ≈ $1,84
```

## Da verificare — quello che non ho potuto giudicare io

- **Nessuno ha ancora ascoltato il video.** La verifica è per trascrizione, durate e fotogrammi.
- Da confrontare con le fonti, in particolare:
  - Le **medie di popolazione 545.000 / 502.000 abitanti** per ULSS vengono dalla presentazione, non dalla legge.
  - I **nomi delle Aziende ospedaliere-universitarie** (Padova, Verona) come sono oggi.
- Il marchio è il logo CISL FP (non «Padova Rovigo»): vale quanto detto nella 1.1.
