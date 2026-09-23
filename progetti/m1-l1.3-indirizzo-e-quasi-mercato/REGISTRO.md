# REGISTRO — Lezione 1.3 · Indirizzo, gestione e quasi-mercato

Corso **Progressione verticale · Comparto Sanità**, Modulo 1, Legislazione sanitaria nazionale.
Stesso metodo, voce, marchio e palette della 1.1 (vedi il suo REGISTRO): slide animate e voce
di Luca Ward (`tVdVcJPudubxmTmAw4tE`, `eleven_v3`), senza avatar, ≥ 7:00.

## Aritmetica

| | valore |
|---|---|
| blocchi / scene | 43 / 45 |
| caratteri | 7,313 con i tag |
| stacco | dopo **s27** |
| grezzo | A 333.28 s · B 230.56 s = 563.8 s |
| parlato lavorato | **420.3 s** (4 pose) |
| CPS misurato | 17.4 car/s sul lavorato (la 1.1 dava 16,8) |
| rapporto grezzo/lavorato | 1.34 |
| montato locale | **7:13,60** |
| montato HeyGen | **7:12,39 (432,39 s; 1,21 s meno del locale)** |

## Verifiche

- **Trascrizione delle tracce intere** (da asset audio, `eleven_scribe_v1`):
  A: 694/694 parole, 0 buchi
  B: 470/470 parole, 0 buchi
- «di erre gi» nel copione (per la pronuncia) e «DRG» nel trascritto: aggiunta la resa in `verifica-testo.py`.
- **Confini**: Tre confini nella traccia A, tutti segnalati da `verifica-locale.py` come coppie di segno opposto e confermati col conto sul grezzo. Dopo ogni correzione `allinea` è stato rifatto da capo; le tre correzioni sono state applicate insieme. Dopo: nessuna coppia sospetta.
  `audio/correzioni.json` = `{"A": {"15": {"pause": -1}, "21": {"pause": -1}, "22": {"pause": -1}}}`.
- **Temi cambiati rispetto al copione**: **s16** da `profondo` a `chiaro`: è una tabella, e i grafici di dati sul fondo profondo non si leggono (regola della libreria).
- **Slide**: PNG guardati in provini da nove, traboccamento verificato con i caratteri veri.
- **s03**: layout a sostituzione cambiato in `confronto`: barrava «alla Regione» e faceva capire il contrario di quello che dice il parlato.
- **s15**: corretta dopo i provini.
- `controlli.py`: 8/8.

## Montaggio

- Lotto HeyGen `4cafb24d78ff4edfb8ea9b9016911948`: 88 file accoppiati per posizione, 0 discordi sul `content-type`.
- Payload: 45 scene; 43 scene video, tutte con `audio_asset_id` e `playback {freeze, mute}`.
- Video HeyGen: `51267d9fd9b4ed43c0aba934e52db225` (https://app.heygen.com/videos/51267d9fd9b4ed43c0aba934e52db225).
- Il file consegnato non si scarica da questa sessione (proxy: 403 su files2.heygen.ai).

## Costo

```
voce. due tracce. 7.313 caratteri con i tag. eleven_v3   ≈ $1.21
trascrizione delle due tracce intere             ≈ $0.52
                                                  -------
                                                  ≈ $1.73
```
Le cifre per lezione sono ripartite in proporzione ai caratteri sul costo misurato del modulo
(voce $6,17 + $2,45 di rigenerazione; trascrizioni $2,58 + $1,00 per le lezioni 1.2–1.6).

## Da verificare — quello che non ho potuto giudicare io

- **Nessuno ha ancora ascoltato il video.** La verifica è per trascrizione, durate e fotogrammi.
- **La dispensa sorgente non c'era.** Da confrontare con la dispensa, in particolare:
  - L'**articolo 13 del D.Lgs. 502/1992**: le Regioni coprono i disavanzi delle aziende con risorse proprie.
  - Il **D.Lgs. 29/1993** come «figlio della stessa legge delega 421» per la separazione indirizzo/gestione nelle PA.
  - I DRG: **Yale**, adozione **Medicare 1983**; in Italia **tariffe 1994** e pagamento a DRG **dal 1995** (DM 14/12/1994, da confermare sulla dispensa).
  - La promessa «lo ritroverai nel modulo otto» (D.Lgs. 29/1993): va tenuta quando si scrive il modulo 8.
- Il marchio è il logo CISL FP (non «Padova Rovigo»): vale quanto detto nella 1.1.
