# REGISTRO — Lezione 1.2 · Primo principio: l'aziendalizzazione

Corso **Progressione verticale · Comparto Sanità**, Modulo 1, Legislazione sanitaria nazionale.
Stesso metodo, voce, marchio e palette della 1.1 (vedi il suo REGISTRO): slide animate e voce
di Luca Ward (`tVdVcJPudubxmTmAw4tE`, `eleven_v3`), senza avatar, ≥ 7:00.

## Aritmetica

| | valore |
|---|---|
| blocchi / scene | 42 / 44 |
| caratteri | 7.512 con i tag |
| stacco | dopo **s19** |
| grezzo | A 253,76 s · B 333,44 s = 587,2 s |
| parlato lavorato | **445,1 s** (4 pose) |
| CPS misurato | 16,9 car/s sul lavorato (la 1.1 dava 16,8) |
| rapporto grezzo/lavorato | 1,32 |
| montato locale | **7:38,36** |
| montato HeyGen | **7:37,22 (457,22 s; 1,14 s meno del locale)** |

## Verifiche

- **Trascrizione delle tracce intere** (da asset audio, `eleven_scribe_v1`):
  A: 486/486 parole, 0 buchi
  B: 690/692 parole, 0 buchi
- s34 «100000 euro» trascritto «100 000»: è la resa del trascrittore, la voce dice «centomila».
- **Confini**: `verifica-locale.py` ha segnalato due coppie adiacenti di segno opposto, **s16/s17** (traccia A) e **s30/s31** (traccia B). Decise col conto sul grezzo: in entrambi i casi il confine giusto è la pausa precedente (1,15 s e 1,12 s), con cui i due blocchi escono alla velocità mediana della voce. Dopo: nessuna coppia sospetta.
  `audio/correzioni.json` = `{"A": {"14": {"pause": -1}}, "B": {"10": {"pause": -1}}}`.
- **Temi cambiati rispetto al copione**: nessuno: i temi del copione erano già compatibili con i tipi di slide.
- **Slide**: PNG guardati in provini da nove, traboccamento verificato con i caratteri veri.
  - **s15**: da `tre` a `griglia`.
  - **s35**: da `impila` a `frase`.
  - **s17**: etichetta accorciata.
  - **s23**: tolta l'etichetta finale dell'asse del tempo.
- `controlli.py`: 8/8.

## Montaggio

- Lotto HeyGen `6265f482a30547209ef7d32ba5036a9f`: 86 file accoppiati per posizione, 0 discordi sul `content-type`.
- Payload: 44 scene; 42 scene video, tutte con `audio_asset_id` e `playback {freeze, mute}`.
- Video HeyGen: `20187e23bbc95a5e65b972badcb89e5b` (https://app.heygen.com/videos/20187e23bbc95a5e65b972badcb89e5b).
- Il file consegnato non si scarica da questa sessione (proxy: 403 su files2.heygen.ai).

## Costo

```
voce, due tracce, 7.512 caratteri con i tag, eleven_v3   ≈ $1,24
trascrizione delle due tracce intere              ≈ $0,52
                                                   -------
                                                   ≈ $1,76
```
Le cifre per lezione sono ripartite in proporzione ai caratteri sul costo misurato del modulo
(voce $6,17 + $2,45 di rigenerazione; trascrizioni $2,58 + $1,00 per le lezioni 1.2–1.6).

## Da verificare — quello che non ho potuto giudicare io

- **Nessuno ha ancora ascoltato il video.** La verifica è per trascrizione, durate e fotogrammi.
- **La dispensa sorgente non c'era.** Da confrontare con la dispensa, in particolare:
  - Il contratto del direttore generale **da tre a cinque anni** (D.Lgs. 229/1999) e la **verifica a diciotto mesi** dalla nomina.
  - L'**elenco nazionale degli idonei dal 2016** (D.Lgs. 171/2016), tenuto al Ministero della salute.
  - Il distrattore sull'autonomia imprenditoriale: detto che **non c'è nel testo del 1992** e arriva col 229/1999 insieme all'atto aziendale di diritto privato.
- Il marchio è il logo CISL FP (non «Padova Rovigo»): vale quanto detto nella 1.1.
