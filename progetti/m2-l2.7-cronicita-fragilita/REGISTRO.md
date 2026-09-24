# REGISTRO — Lezione 2.7 · Ospedali di comunità, cronicità, fragilità

Corso **Progressione verticale · Comparto Sanità**, Modulo 2, Il sistema sanitario regionale del Veneto.
Stesso metodo, voce, marchio e palette del modulo 1 (vedi il REGISTRO della 1.1): slide animate e voce
di Luca Ward (`tVdVcJPudubxmTmAw4tE`, `eleven_v3`), senza avatar, ≥ 7:00.

**Fonti**: PSSR 2019-2023 cap. 6 (pp. 91-99) e cap. 5 (p. 88); L.R. Veneto 19/2016 art. 14 c. 5.

## Aritmetica

| | valore |
|---|---|
| blocchi / scene | 45 / 47 |
| caratteri | 7.767 con i tag |
| stacco | dopo **s25** |
| grezzo | A 307,20 s · B 262,80 s = 570,0 s |
| parlato lavorato | **433,7 s** (3 pose) |
| CPS misurato | 17,9 car/s sul lavorato |
| montato locale | **7:27,00** |
| montato HeyGen | **{HG}** |

## Verifiche

- **Trascrizione delle tracce intere** (da asset audio, `eleven_scribe_v1`):
  A: 696/702 parole, 0 buchi
  B: 548/549 parole, 0 buchi
- «zero virgola sei» trascritto «0,6»: resa del trascrittore.
- **Confini**: Nessuna coppia di segno opposto, nessun blocco fuori fascia.
  `audio/correzioni.json` = nessuna.
- **Temi cambiati rispetto al copione**: nessuno.
- **Slide**: PNG guardati in provini da nove, traboccamento verificato con i caratteri veri.
  - **s12**: l'etichetta della seconda barra («Bellunese, Polesine, montagna, laguna») era tagliata a sinistra; diventata «Aree disagiate» con l'elenco nella nota.
- `controlli.py`: 8/8.

## Montaggio

- Lotto HeyGen `{LOTTO}`: 92 file accoppiati per posizione, 0 discordi sul `content-type`.{EXTRA}
- Payload: 47 scene; 45 scene video, tutte con `audio_asset_id` e `playback {freeze, mute}`.
- Video HeyGen: `{VID}` (https://app.heygen.com/videos/{VID}).
- Il file consegnato non si scarica da questa sessione (proxy: 403 su files2.heygen.ai).

## Costo

```
voce, due tracce, 7.767 caratteri, eleven_v3        ≈ $1,29  (misurato)
trascrizione delle due tracce intere               ≈ $0,52  (misurato)
                                                    -------
                                                    ≈ $1,81
```

## Da verificare — quello che non ho potuto giudicare io

- **Nessuno ha ancora ascoltato il video.** La verifica è per trascrizione, durate e fotogrammi.
- Da confrontare con le fonti, in particolare:
  - Lo standard di **0,6 posti letto intermedi ogni 1.000 abitanti sopra i 45 anni**, **+0,2** per Bellunese, Polesine, montagna e laguna.
  - La degenza **di norma entro 4-6 settimane**; i **posti letto tecnici per non più di 24 ore**; il **numero unico h24**.
  - La **cronicità avanzata circa l'1%** della popolazione.
  - La **COT** «centrale della continuità»: nome del PSSR; la COT del DM 77/2022 è la stessa idea a livello nazionale.
- Il marchio è il logo CISL FP (non «Padova Rovigo»): vale quanto detto nella 1.1.
