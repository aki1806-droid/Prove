# REGISTRO — Lezione 1.4 · Accreditamento e libertà di scelta

Corso **Progressione verticale · Comparto Sanità**, Modulo 1, Legislazione sanitaria nazionale.
Stesso metodo, voce, marchio e palette della 1.1 (vedi il suo REGISTRO): slide animate e voce
di Luca Ward (`tVdVcJPudubxmTmAw4tE`, `eleven_v3`), senza avatar, ≥ 7:00.

## Aritmetica

| | valore |
|---|---|
| blocchi / scene | 44 / 46 |
| caratteri | 7,453 con i tag |
| stacco | dopo **s23** |
| grezzo | A 270.00 s · B 288.32 s = 558.3 s |
| parlato lavorato | **419.9 s** (3 pose) |
| CPS misurato | 17.7 car/s sul lavorato (la 1.1 dava 16,8) |
| rapporto grezzo/lavorato | 1.33 |
| montato locale | **7:13,24** |
| montato HeyGen | **{HG}** |

## Verifiche

- **Trascrizione delle tracce intere** (da asset audio, `eleven_scribe_v1`):
  A: 588/588 parole, 0 buchi
  B: 591/592 parole, 0 buchi
- s40 «distrattore» trascritto «distratteore»: sbavatura del trascrittore o della voce, da sentire.
- **Confini**: Nessuna coppia di segno opposto. `allinea` segnala **s02 fuori fascia** (21,1 car/s grezzi): è il primo blocco, la traccia parte senza silenzio e l'attacco è detto svelto. Il confine s02/s03 è quello giusto (scarti locali −0,1 / +0,2 s), lasciato così.
  `audio/correzioni.json` = nessuna.
- **Temi cambiati rispetto al copione**: **s30** da `profondo` a `chiaro`: è una tabella (le tre A in fila).
- **Slide**: PNG guardati in provini da nove, traboccamento verificato con i caratteri veri.
- **s29**: layout barrato cambiato in `confronto`, per lo stesso motivo della 1.3 s03.
- `controlli.py`: 8/8.

## Montaggio

- Lotto HeyGen `{LOTTO}`: 90 file accoppiati per posizione, 0 discordi sul `content-type`.{EXTRA}
- Payload: 46 scene; 44 scene video, tutte con `audio_asset_id` e `playback {freeze, mute}`.
- Video HeyGen: `{VID}` (https://app.heygen.com/videos/{VID}).
- Il file consegnato non si scarica da questa sessione (proxy: 403 su files2.heygen.ai).

## Costo

```
voce. due tracce. 7.453 caratteri con i tag. eleven_v3   ≈ $1.23
trascrizione delle due tracce intere             ≈ $0.52
                                                  -------
                                                  ≈ $1.75
```
Le cifre per lezione sono ripartite in proporzione ai caratteri sul costo misurato del modulo
(voce $6,17 + $2,45 di rigenerazione; trascrizioni $2,58 + $1,00 per le lezioni 1.2–1.6).

## Da verificare — quello che non ho potuto giudicare io

- **Nessuno ha ancora ascoltato il video.** La verifica è per trascrizione, durate e fotogrammi.
- **La dispensa sorgente non c'era.** Da confrontare con la dispensa, in particolare:
  - I **requisiti minimi** fissati dal **DPR 14 gennaio 1997**.
  - Gli **articoli da 8-bis a 8-quinquies** del 502 introdotti dal **D.Lgs. 229/1999**.
  - La **legge regionale veneta 56/1994** citata come «storia propria» del Veneto col privato: la vedremo nel modulo 3.
  - La distinzione **accordi** (strutture pubbliche ed equiparate) / **contratti** (privati): nel copione è una «trappola da quiz».
- Il marchio è il logo CISL FP (non «Padova Rovigo»): vale quanto detto nella 1.1.
