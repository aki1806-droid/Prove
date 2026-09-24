# REGISTRO — Lezione 4.2 · L'AOUPD e le tre missioni

Corso **Progressione verticale · Comparto Sanità**, Modulo 4, Organizzazione aziendale sanitaria e AOUPD.
Stesso metodo, voce, marchio e palette dei moduli 1-3: voce di Luca Ward (`tVdVcJPudubxmTmAw4tE`,
`eleven_v3`), senza avatar, ≥ 7:00. Le slide usano la libreria `slide/illustra.mjs`,
che nel modulo 4 passa da 16 a 22 illustrazioni SVG originali animate: si aggiungono microscopio,
organigramma (impulsi che scorrono), azienda (ingranaggi e moneta), missioni (tre cerchi), percorso
(strada con segnaposto in movimento) e scudo. Ogni clip dura quanto il suo blocco audio
(fino a 30 s), così l'animazione d'ambiente continua per tutta la scena.

**Fonti**: dispensa CISL FP (Galiazzo): AOU e D.Lgs. 517/1999; sintesi di ricerca web sull'Azienda Ospedale-Università Padova (protocollo d'intesa 2019, atto aziendale delibera 539/2019, hub nel PSSR 2019-2023, 1.740 posti letto DGR 614/2019, dipartimenti).

## Aritmetica

| | valore |
|---|---|
| blocchi / scene | 47 / 49 |
| caratteri | 7.520 con i tag |
| stacco | dopo **s25** |
| grezzo | A 276,56 s · B 302,80 s = 579,4 s |
| parlato lavorato | **442,1 s** (4 pose) |
| CPS misurato | 17,0 car/s sul lavorato |
| montato locale | **7:35,47** |
| montato HeyGen | **7:34,21** |

## Verifiche

- **Trascrizione delle tracce intere** (da asset audio, `eleven_scribe_v1`):
  A: 585/585 parole, 0 buchi
  B: 579/579 parole, 0 buchi
- **Confini**: Nessuna coppia di segno opposto. **s13** e **s25** erano fuori fascia (frasi `profondo` troppo corte, allungate a 4,6 s): frasi allungate e **traccia A rigenerata** (≈ $0,63 in più, più la sua trascrizione).
  `audio/correzioni.json` = nessuna.
- **Temi cambiati rispetto al copione**: nessuno.
- **Slide**: PNG guardati in provini da nove, traboccamento verificato con i caratteri veri.
  - **s13, s25**: aggiunta la riga `sotto`.
  - Etichette del `tavolo` accorciate (SSR/UNI, AOU/UNI), etichette dell'`assetempo` accorciate, sigla ridotta ad A-O-U-P con «AOUPD» nel sottotesto.
- `controlli.py`: 8/8.

## Montaggio

- Lotto HeyGen `e868f7a16f394a85a0aedd7ddd9085af`: 96 file accoppiati per posizione, 0 discordi sul `content-type`.
- La traccia A è stata generata due volte (la prima scartata per s13/s25 fuori fascia): il costo sotto è quello di una sola generazione, la seconda aggiunge ≈ $0,63 di voce e ≈ $0,25 di trascrizione.
- Payload: 49 scene; 47 scene video, tutte con `audio_asset_id` e `playback {freeze, mute}`.
- Video HeyGen: `3a535f0f41bfb589d53e43a3e5e51316` (https://app.heygen.com/videos/3a535f0f41bfb589d53e43a3e5e51316).
- Il file consegnato non si scarica da questa sessione (proxy: 403 su files2.heygen.ai).

## Costo

```
voce, due tracce, 7.520 caratteri, eleven_v3        ≈ $1,24  (stimato sui caratteri)
trascrizione delle due tracce intere               ≈ $0,53  (stimato sui secondi)
                                                    -------
                                                    ≈ $1,76
```

## Da verificare — quello che non ho potuto giudicare io

- **Nessuno ha ancora ascoltato il video.** La verifica è per trascrizione, durate e fotogrammi.
- Da confrontare con le fonti, in particolare:
  - I **numeri dell'AOUPD**: 1.740 posti letto, 10 dipartimenti ospedalieri (9 strutturali e 1 funzionale) più 1 amministrativo, delibera 539 del 16/5/2019.
  - L'**organo di indirizzo** con al massimo cinque componenti, composizione nel protocollo d'intesa.
  - «**Trapianti**» e «**migliaia di studenti**»: formule generiche, senza fonte puntuale.
  - L'esempio del **protocollo sullo scompenso** è inventato a scopo didattico.
- **La fonte prevista dal piano del corso per il modulo 4, `Organizzazione-Aziendale-Sanitaria-e-AOUPD.pdf`, non è disponibile** (né nel repository né su Drive). I contenuti vengono dalla dispensa CISL FP «Diritto sanitario parte prima» (Galiazzo), dall'atto aziendale dell'ULSS 5 Polesana, dal PSSR Veneto 2019-2023 e, per l'AOUPD, da sintesi di ricerca web. Va fatto un confronto con quel PDF appena c'è.
- Le **lettere CISL FP all'AOUPD** presenti su Drive non sono state usate e nessuna persona è nominata.
- Il marchio è il logo CISL FP (non «Padova Rovigo»): vale quanto detto nella 1.1.
