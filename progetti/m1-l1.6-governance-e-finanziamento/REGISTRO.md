# REGISTRO — Lezione 1.6 · Governance e finanziamento

Corso **Progressione verticale · Comparto Sanità**, Modulo 1, Legislazione sanitaria nazionale.
Stesso metodo, voce, marchio e palette della 1.1 (vedi il suo REGISTRO): slide animate e voce
di Luca Ward (`tVdVcJPudubxmTmAw4tE`, `eleven_v3`), senza avatar, ≥ 7:00.

## Aritmetica

| | valore |
|---|---|
| blocchi / scene | 43 / 45 |
| caratteri | 7,334 con i tag |
| stacco | dopo **s24** |
| grezzo | A 290.16 s · B 256.56 s = 546.7 s |
| parlato lavorato | **418.4 s** (4 pose) |
| CPS misurato | 17.5 car/s sul lavorato (la 1.1 dava 16,8) |
| rapporto grezzo/lavorato | 1.31 |
| montato locale | **7:11,40** |
| montato HeyGen | **{HG}** |

## Voce rigenerata: «Titolo quinto»

Nella prima generazione il copione diceva «Titolo V» e Luca Ward leggeva **«Titolo cinque»**.
Trovato dalla trascrizione. Il testo parlato ora dice «Titolo quinto» (a schermo resta
«Titolo V»); le due tracce sono state rigenerate e ritrascritte, e tagli e confini rifatti da
capo. Le tracce vecchie restano in `audio/scartato-titolo-cinque-{A,B}.mp3` solo nella copia di lavoro (fuori da git), non sono usate.
Regola per il corso: **i numeri romani vanno scritti in lettere nel parlato**.

## Verifiche

- **Trascrizione delle tracce intere** (da asset audio, `eleven_scribe_v1`):
  A: 635/635 parole, 0 buchi
  B: 511/511 parole, 0 buchi
- **Confini**: Sulla traccia rigenerata nessuna coppia di segno opposto, nessun blocco fuori fascia.
  `audio/correzioni.json` = nessuna.
- **Temi cambiati rispetto al copione**: nessuno.
- **Slide**: PNG guardati in provini da nove, traboccamento verificato con i caratteri veri.
- **s27**: layout barrato cambiato in `confronto`, come nella 1.3 e nella 1.4.
- `controlli.py`: 8/8.

## Montaggio

- Lotto HeyGen `{LOTTO}`: 88 file accoppiati per posizione, 0 discordi sul `content-type`.{EXTRA}
- Payload: 45 scene; 43 scene video, tutte con `audio_asset_id` e `playback {freeze, mute}`.
- Video HeyGen: `{VID}` (https://app.heygen.com/videos/{VID}).
- Il file consegnato non si scarica da questa sessione (proxy: 403 su files2.heygen.ai).

## Costo

```
voce. due tracce. 7.334 caratteri con i tag. eleven_v3   ≈ $1.21
trascrizione delle due tracce intere             ≈ $0.52
voce SCARTATA («Titolo cinque»)                  ≈ $1.21
trascrizione della voce scartata                 ≈ $0.52
                                                  -------
                                                  ≈ $3.46
```
Le cifre per lezione sono ripartite in proporzione ai caratteri sul costo misurato del modulo
(voce $6,17 + $2,45 di rigenerazione; trascrizioni $2,58 + $1,00 per le lezioni 1.2–1.6).

## Da verificare — quello che non ho potuto giudicare io

- **Nessuno ha ancora ascoltato il video.** La verifica è per trascrizione, durate e fotogrammi.
- **La dispensa sorgente non c'era.** Da confrontare con la dispensa, in particolare:
  - «**Oltre cento aziende**» e «**oltre cento miliardi** di euro l'anno» di finanziamento: cifre arrotondate, da confrontare con la dispensa.
  - I **piani di rientro «dalla metà degli anni Duemila»** (Intese Stato-Regioni del 2005 e L. 311/2004).
  - Il **collegio sindacale di tre componenti** (Regione, MEF, Ministero della salute).
  - La **L. cost. 3/2001**: salute a legislazione concorrente; LEA allo Stato in esclusiva.
  - Il ponte al modulo 2: **L.R. Veneto 19/2016** e Azienda Zero.
- Il marchio è il logo CISL FP (non «Padova Rovigo»): vale quanto detto nella 1.1.
