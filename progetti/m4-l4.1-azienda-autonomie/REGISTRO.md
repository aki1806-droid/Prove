# REGISTRO — Lezione 4.1 · L'azienda sanitaria e le sue autonomie

Corso **Progressione verticale · Comparto Sanità**, Modulo 4, Organizzazione aziendale sanitaria e AOUPD.
Stesso metodo, voce, marchio e palette dei moduli 1-3: voce di Luca Ward (`tVdVcJPudubxmTmAw4tE`,
`eleven_v3`), senza avatar, ≥ 7:00. Le slide usano la libreria `slide/illustra.mjs`,
che nel modulo 4 passa da 16 a 22 illustrazioni SVG originali animate: si aggiungono microscopio,
organigramma (impulsi che scorrono), azienda (ingranaggi e moneta), missioni (tre cerchi), percorso
(strada con segnaposto in movimento) e scudo. Ogni clip dura quanto il suo blocco audio
(fino a 30 s), così l'animazione d'ambiente continua per tutta la scena.

**Fonti**: dispensa CISL FP (Galiazzo): D.Lgs. 502/1992 e 229/1999, personalità giuridica, autonomie, ULSS e aziende ospedaliere, requisiti delle AO, AOU (D.Lgs. 517/1999), IRCCS (D.Lgs. 288/2003); L.R. 19/2016.

## Aritmetica

| | valore |
|---|---|
| blocchi / scene | 45 / 47 |
| caratteri | 7.418 con i tag |
| stacco | dopo **s24** |
| grezzo | A 286,40 s · B 311,36 s = 597,8 s |
| parlato lavorato | **450,8 s** (4 pose) |
| CPS misurato | 16,5 car/s sul lavorato |
| montato locale | **7:44,08** |
| montato HeyGen | **7:42,86** |

## Verifiche

- **Trascrizione delle tracce intere** (da asset audio, `eleven_scribe_v1`):
  A: 540/541 parole, 0 buchi
  B: 579/581 parole, 0 buchi
- **Confini**: Nessuna coppia di segno opposto, nessun blocco fuori fascia.
  `audio/correzioni.json` = nessuna.
- **Temi cambiati rispetto al copione**: nessuno.
- **Slide**: PNG guardati in provini da nove, traboccamento verificato con i caratteri veri.
  - **s21**: la sigla della `norma` finiva sotto il sigillo; sigla ridotta a «Imprenditoriale», il resto nell'etichetta.
- `controlli.py`: 8/8.

## Montaggio

- Lotto HeyGen `d6ce2ceb1fb84f77ba48bc25b2ef7ded`: 92 file accoppiati per posizione, 0 discordi sul `content-type`.
- Payload: 47 scene; 45 scene video, tutte con `audio_asset_id` e `playback {freeze, mute}`.
- Video HeyGen: `a03f1613494f9b7e975426e1e212cbd6` (https://app.heygen.com/videos/a03f1613494f9b7e975426e1e212cbd6).
- Il file consegnato non si scarica da questa sessione (proxy: 403 su files2.heygen.ai).

## Costo

```
voce, due tracce, 7.418 caratteri, eleven_v3        ≈ $1,22  (stimato sui caratteri)
trascrizione delle due tracce intere               ≈ $0,54  (stimato sui secondi)
                                                    -------
                                                    ≈ $1,76
```

## Da verificare — quello che non ho potuto giudicare io

- **Nessuno ha ancora ascoltato il video.** La verifica è per trascrizione, durate e fotogrammi.
- Da confrontare con le fonti, in particolare:
  - Le **«quattro autonomie»** sono una sintesi da esame: la legge ne elenca sei (organizzativa, amministrativa, patrimoniale, contabile, gestionale, tecnica). Deviazione dal piano, da confermare.
  - I **requisiti delle aziende ospedaliere** (organizzazione dipartimentale, contabilità per centri di costo, alta specialità) come li riporta la dispensa.
  - Nuove illustrazioni SVG in questa lezione: **microscopio, organigramma, azienda, missioni, percorso, scudo** (libreria a 22 figure).
- **La fonte prevista dal piano del corso per il modulo 4, `Organizzazione-Aziendale-Sanitaria-e-AOUPD.pdf`, non è disponibile** (né nel repository né su Drive). I contenuti vengono dalla dispensa CISL FP «Diritto sanitario parte prima» (Galiazzo), dall'atto aziendale dell'ULSS 5 Polesana, dal PSSR Veneto 2019-2023 e, per l'AOUPD, da sintesi di ricerca web. Va fatto un confronto con quel PDF appena c'è.
- Le **lettere CISL FP all'AOUPD** presenti su Drive non sono state usate e nessuna persona è nominata.
- Il marchio è il logo CISL FP (non «Padova Rovigo»): vale quanto detto nella 1.1.
