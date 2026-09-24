# REGISTRO — Lezione 4.3 · Atto aziendale e direzione strategica

Corso **Progressione verticale · Comparto Sanità**, Modulo 4, Organizzazione aziendale sanitaria e AOUPD.
Stesso metodo, voce, marchio e palette dei moduli 1-3: voce di Luca Ward (`tVdVcJPudubxmTmAw4tE`,
`eleven_v3`), senza avatar, ≥ 7:00. Le slide usano la libreria `slide/illustra.mjs`,
che nel modulo 4 passa da 16 a 22 illustrazioni SVG originali animate: si aggiungono microscopio,
organigramma (impulsi che scorrono), azienda (ingranaggi e moneta), missioni (tre cerchi), percorso
(strada con segnaposto in movimento) e scudo. Ogni clip dura quanto il suo blocco audio
(fino a 30 s), così l'animazione d'ambiente continua per tutta la scena.

**Fonti**: dispensa CISL FP (Galiazzo): atto aziendale, D.Lgs. 171/2016 (elenco nazionale, nomina, verifica, incompatibilità), DS, DA, DSS, collegio di direzione, collegio sindacale; DGR Veneto 1306/2017; atto aziendale ULSS 5.

## Aritmetica

| | valore |
|---|---|
| blocchi / scene | 45 / 47 |
| caratteri | 7.396 con i tag |
| stacco | dopo **s25** |
| grezzo | A 268,40 s · B 269,12 s = 537,5 s |
| parlato lavorato | **412,5 s** (5 pose) |
| CPS misurato | 17,9 car/s sul lavorato |
| montato locale | **7:05,92** |
| montato HeyGen | **7:04,59** |

## Verifiche

- **Trascrizione delle tracce intere** (da asset audio, `eleven_scribe_v1`):
  A: 603/604 parole, 0 buchi
  B: 572/572 parole, 0 buchi
- «ventiquattro» trascritto «24», «Costituzione» con la maiuscola: rese del trascrittore.
- **Confini**: Nessuna coppia di segno opposto. **s20** a 21,2 car/s (0,2 sopra il tetto): aggiunta una posa di 0,3 s nel copione, rientrato.
  `audio/correzioni.json` = nessuna.
- **Temi cambiati rispetto al copione**: nessuno.
- **Slide**: PNG guardati in provini da nove, traboccamento verificato con i caratteri veri.
  - **s41**: corretta dopo i provini (sovrapposizione).
- `controlli.py`: 8/8.

## Montaggio

- Lotto HeyGen `53dd1a8046dc47839e956b498266a8af`: 92 file accoppiati per posizione, 0 discordi sul `content-type`.
- Payload: 47 scene; 45 scene video, tutte con `audio_asset_id` e `playback {freeze, mute}`.
- Video HeyGen: `1ce4466e29f47b44da2a46dd8c7d6799` (https://app.heygen.com/videos/1ce4466e29f47b44da2a46dd8c7d6799).
- Il file consegnato non si scarica da questa sessione (proxy: 403 su files2.heygen.ai).

## Costo

```
voce, due tracce, 7.396 caratteri, eleven_v3        ≈ $1,22  (stimato sui caratteri)
trascrizione delle due tracce intere               ≈ $0,49  (misurato)
                                                    -------
                                                    ≈ $1,70
```

## Da verificare — quello che non ho potuto giudicare io

- **Nessuno ha ancora ascoltato il video.** La verifica è per trascrizione, durate e fotogrammi.
- Da confrontare con le fonti, in particolare:
  - La regola dei **due mandati consecutivi** per il DG.
  - Il **collegio sindacale**: un componente designato dal «Presidente della Regione» secondo la dispensa (nella 3.3 si diceva Giunta).
  - Le «**12 riunioni in un anno**» sono ricavate dalla cadenza mensile.
  - L'elenco delle **incompatibilità** del DG è parziale e di esempio.
  - Che l'atto aziendale **non diventi efficace** senza approvazione regionale.
- **La fonte prevista dal piano del corso per il modulo 4, `Organizzazione-Aziendale-Sanitaria-e-AOUPD.pdf`, non è disponibile** (né nel repository né su Drive). I contenuti vengono dalla dispensa CISL FP «Diritto sanitario parte prima» (Galiazzo), dall'atto aziendale dell'ULSS 5 Polesana, dal PSSR Veneto 2019-2023 e, per l'AOUPD, da sintesi di ricerca web. Va fatto un confronto con quel PDF appena c'è.
- Le **lettere CISL FP all'AOUPD** presenti su Drive non sono state usate e nessuna persona è nominata.
- Il marchio è il logo CISL FP (non «Padova Rovigo»): vale quanto detto nella 1.1.
