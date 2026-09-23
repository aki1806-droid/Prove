# REGISTRO — Lezione 1.5 · I livelli essenziali di assistenza

Corso **Progressione verticale · Comparto Sanità**, Modulo 1, Legislazione sanitaria nazionale.
Stesso metodo, voce, marchio e palette della 1.1 (vedi il suo REGISTRO): slide animate e voce
di Luca Ward (`tVdVcJPudubxmTmAw4tE`, `eleven_v3`), senza avatar, ≥ 7:00.

## Aritmetica

| | valore |
|---|---|
| blocchi / scene | 43 / 45 |
| caratteri | 7,374 con i tag |
| stacco | dopo **s24** |
| grezzo | A 298.64 s · B 260.48 s = 559.1 s |
| parlato lavorato | **433.0 s** (4 pose) |
| CPS misurato | 17.0 car/s sul lavorato (la 1.1 dava 16,8) |
| rapporto grezzo/lavorato | 1.29 |
| montato locale | **7:26,24** |
| montato HeyGen | **{HG}** |

## Voce rigenerata: «Titolo quinto»

Nella prima generazione il copione diceva «Titolo V» e Luca Ward leggeva **«Titolo cinque»**.
Trovato dalla trascrizione. Il testo parlato ora dice «Titolo quinto» (a schermo resta
«Titolo V»); le due tracce sono state rigenerate e ritrascritte, e tagli e confini rifatti da
capo. Le tracce vecchie restano in `audio/scartato-titolo-cinque-{A,B}.mp3` solo nella copia di lavoro (fuori da git), non sono usate.
Regola per il corso: **i numeri romani vanno scritti in lettere nel parlato**.

## Verifiche

- **Trascrizione delle tracce intere** (da asset audio, `eleven_scribe_v1`):
  A: 614/614 parole, 0 buchi
  B: 545/545 parole, 0 buchi
- **Confini**: Una coppia sospetta nella traccia A rigenerata, decisa col conto sul grezzo: il confine giusto è la pausa successiva. Dopo: nessuna coppia sospetta.
  `audio/correzioni.json` = `{"A": {"6": {"pause": 1}}}` (sulla traccia rigenerata).
- **Temi cambiati rispetto al copione**: **s24** da `profondo` a `chiaro`: è una piramide (le tre aree dei LEA).
- **Slide**: PNG guardati in provini da nove, traboccamento verificato con i caratteri veri.
- nessuna correzione dopo i provini.
- `controlli.py`: 8/8.

## Montaggio

- Lotto HeyGen `{LOTTO}`: 88 file accoppiati per posizione, 0 discordi sul `content-type`.{EXTRA}
- Payload: 45 scene; 43 scene video, tutte con `audio_asset_id` e `playback {freeze, mute}`.
- Video HeyGen: `{VID}` (https://app.heygen.com/videos/{VID}).
- Il file consegnato non si scarica da questa sessione (proxy: 403 su files2.heygen.ai).

## Costo

```
voce. due tracce. 7.374 caratteri con i tag. eleven_v3   ≈ $1.22
trascrizione delle due tracce intere             ≈ $0.52
voce SCARTATA («Titolo cinque»)                  ≈ $1.22
trascrizione della voce scartata                 ≈ $0.52
                                                  -------
                                                  ≈ $3.48
```
Le cifre per lezione sono ripartite in proporzione ai caratteri sul costo misurato del modulo
(voce $6,17 + $2,45 di rigenerazione; trascrizioni $2,58 + $1,00 per le lezioni 1.2–1.6).

## Da verificare — quello che non ho potuto giudicare io

- **Nessuno ha ancora ascoltato il video.** La verifica è per trascrizione, durate e fotogrammi.
- **La dispensa sorgente non c'era.** Da confrontare con la dispensa, in particolare:
  - **DPCM 29 novembre 2001** (primo elenco) e **DPCM 12 gennaio 2017** (nuovi LEA).
  - La riforma del **Titolo quinto (L. cost. 3/2001)**: i LEA competenza esclusiva dello Stato (art. 117, c. 2, lett. m).
  - Il vecchio nome della prima area, «assistenza sanitaria collettiva in ambiente di vita e di lavoro».
  - «Resta in vigore per oltre quindici anni» (2001 → 2017).
- Il marchio è il logo CISL FP (non «Padova Rovigo»): vale quanto detto nella 1.1.
