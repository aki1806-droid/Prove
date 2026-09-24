# REGISTRO — Lezione 4.4 · Dipartimenti e unità operative

Corso **Progressione verticale · Comparto Sanità**, Modulo 4, Organizzazione aziendale sanitaria e AOUPD.
Stesso metodo, voce, marchio e palette dei moduli 1-3: voce di Luca Ward (`tVdVcJPudubxmTmAw4tE`,
`eleven_v3`), senza avatar, ≥ 7:00. Le slide usano la libreria `slide/illustra.mjs`,
che nel modulo 4 passa da 16 a 22 illustrazioni SVG originali animate: si aggiungono microscopio,
organigramma (impulsi che scorrono), azienda (ingranaggi e moneta), missioni (tre cerchi), percorso
(strada con segnaposto in movimento) e scudo. Ogni clip dura quanto il suo blocco audio
(fino a 30 s), così l'animazione d'ambiente continua per tutta la scena.

**Fonti**: atto aziendale ULSS 5 Polesana (modello dipartimentale, dipartimento strutturale e funzionale, UOC, UOSD, UOS, articolazioni funzionali, responsabile unico); dispensa CISL FP (Galiazzo); DGR Veneto 1306/2017.

## Aritmetica

| | valore |
|---|---|
| blocchi / scene | 45 / 47 |
| caratteri | 7.429 con i tag |
| stacco | dopo **s23** |
| grezzo | A 259,44 s · B 302,00 s = 561,4 s |
| parlato lavorato | **424,5 s** (4 pose) |
| CPS misurato | 17,5 car/s sul lavorato |
| montato locale | **7:17,84** |
| montato HeyGen | **7:16,63** |

## Verifiche

- **Trascrizione delle tracce intere** (da asset audio, `eleven_scribe_v1`):
  A: 507/508 parole, 0 buchi
  B: 577/577 parole, 0 buchi
- «quattro punto uno» trascritto «4.1», «dieci» trascritto «10»: rese del trascrittore.
- **Confini**: Nessuna coppia di segno opposto, nessun blocco fuori fascia.
  `audio/correzioni.json` = nessuna.
- **Temi cambiati rispetto al copione**: nessuno.
- **Slide**: PNG guardati in provini da nove, traboccamento verificato con i caratteri veri.
  - **s20**: due icone non presenti nella libreria sostituite, punti ridotti a tre.
  - **s34**: tolta l'etichetta «UOS ecografia» che cadeva sotto il riquadro sbagliato dell'organigramma.
- `controlli.py`: 8/8.

## Montaggio

- Lotto HeyGen `cb227397ace0498e9622659116612676`: 92 file accoppiati per posizione, 0 discordi sul `content-type`.
- Payload: 47 scene; 45 scene video, tutte con `audio_asset_id` e `playback {freeze, mute}`.
- Video HeyGen: `204e70120b8eaa491ce03a80de298cf2` (https://app.heygen.com/videos/204e70120b8eaa491ce03a80de298cf2).
- Il file consegnato non si scarica da questa sessione (proxy: 403 su files2.heygen.ai).

## Costo

```
voce, due tracce, 7.429 caratteri, eleven_v3        ≈ $1,24  (misurato)
trascrizione delle due tracce intere               ≈ $0,51  (misurato)
                                                    -------
                                                    ≈ $1,75
```

## Da verificare — quello che non ho potuto giudicare io

- **Nessuno ha ancora ascoltato il video.** La verifica è per trascrizione, durate e fotogrammi.
- Da confrontare con le fonti, in particolare:
  - Gli **esempi** (due chirurgie con una piastra operatoria, medicina interna con UOS di ecografia e una UOSD accanto) sono inventati a scopo didattico.
  - La **durata triennale** dell'incarico di direttore di dipartimento, come nell'atto aziendale ULSS 5.
  - Gli **esempi di dipartimento funzionale** vengono dall'atto dell'ULSS 5: altre aziende possono averne di diversi.
- **La fonte prevista dal piano del corso per il modulo 4, `Organizzazione-Aziendale-Sanitaria-e-AOUPD.pdf`, non è disponibile** (né nel repository né su Drive). I contenuti vengono dalla dispensa CISL FP «Diritto sanitario parte prima» (Galiazzo), dall'atto aziendale dell'ULSS 5 Polesana, dal PSSR Veneto 2019-2023 e, per l'AOUPD, da sintesi di ricerca web. Va fatto un confronto con quel PDF appena c'è.
- Le **lettere CISL FP all'AOUPD** presenti su Drive non sono state usate e nessuna persona è nominata.
- Il marchio è il logo CISL FP (non «Padova Rovigo»): vale quanto detto nella 1.1.
