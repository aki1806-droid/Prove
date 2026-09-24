# REGISTRO — Lezione 2.5 · La rete ospedaliera hub and spoke

Corso **Progressione verticale · Comparto Sanità**, Modulo 2, Il sistema sanitario regionale del Veneto.
Stesso metodo, voce, marchio e palette del modulo 1 (vedi il REGISTRO della 1.1): slide animate e voce
di Luca Ward (`tVdVcJPudubxmTmAw4tE`, `eleven_v3`), senza avatar, ≥ 7:00.

**Fonti**: PSSR 2019-2023 (allegato L.R. 48/2018), cap. 3.1, pp. 46-53 del Piano; PSSR 2012-2016 (L.R. 23/2012) per l'origine del modello.

## Aritmetica

| | valore |
|---|---|
| blocchi / scene | 45 / 47 |
| caratteri | 7.625 con i tag |
| stacco | dopo **s25** |
| grezzo | A 307,52 s · B 272,40 s = 579,9 s |
| parlato lavorato | **440,6 s** (4 pose) |
| CPS misurato | 17,3 car/s sul lavorato |
| montato locale | **7:34,03** |
| montato HeyGen | **7:32,71** |

## Verifiche

- **Trascrizione delle tracce intere** (da asset audio, `eleven_scribe_v1`):
  A: 691/694 parole, 0 buchi
  B: 570/571 parole, 0 buchi
- «centodiciotto» del Suem reso «118» dal trascrittore (la regola dei numeri di lezione lo legge come «lezione11 8»: è un artefatto della verifica, non un buco); «200000» trascritto «200 000».
- **Confini**: `verifica-locale.py` indicava **s28/s29** (traccia B) come confine da guardare: il taglio sta nella pausa di 1,30 s fra le due frasi, che è quella giusta. Lasciato così.
  `audio/correzioni.json` = nessuna.
- **Temi cambiati rispetto al copione**: nessuno.
- **Slide**: PNG guardati in provini da nove, traboccamento verificato con i caratteri veri.
  - nessuna correzione dopo i provini.
- `controlli.py`: 8/8.

## Montaggio

- Lotto HeyGen `f7d01e9ccf2e46738079af0b47047371`: 92 file accoppiati per posizione, 0 discordi sul `content-type`.
- Payload: 47 scene; 45 scene video, tutte con `audio_asset_id` e `playback {freeze, mute}`.
- Video HeyGen: `38499c71beafadc78e40625b9878c8ad` (https://app.heygen.com/videos/38499c71beafadc78e40625b9878c8ad).
- Il file consegnato non si scarica da questa sessione (proxy: 403 su files2.heygen.ai).

## Costo

```
voce, due tracce, 7.625 caratteri, eleven_v3        ≈ $1,25  (stimato sui caratteri)
trascrizione delle due tracce intere               ≈ $0,53  (stimato sui secondi)
                                                    -------
                                                    ≈ $1,78
```

## Da verificare — quello che non ho potuto giudicare io

- **Nessuno ha ancora ascoltato il video.** La verifica è per trascrizione, durate e fotogrammi.
- Da confrontare con le fonti, in particolare:
  - **Cinque hub** da circa un milione di abitanti; **spoke** da circa 200.000; Padova e Verona hub di eccellenza, lo **IOV** per l'oncologia, **Rovigo e Belluno** hub provinciali per le specialità assegnate.
  - Il **DM 70/2015** e il tetto di **3,7 posti letto per mille** (di cui 0,7 di riabilitazione).
  - Il **Programma Nazionale Esiti** come criterio per i centri di riferimento; revisione **ogni tre anni**.
  - **Chioggia** citata come spoke da salvaguardare anche per i flussi turistici.
- Il marchio è il logo CISL FP (non «Padova Rovigo»): vale quanto detto nella 1.1.
