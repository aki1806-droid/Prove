# REGISTRO — Lezione 4.5 · Governo clinico e continuità assistenziale

Corso **Progressione verticale · Comparto Sanità**, Modulo 4, Organizzazione aziendale sanitaria e AOUPD.
Stesso metodo, voce, marchio e palette dei moduli 1-3: voce di Luca Ward (`tVdVcJPudubxmTmAw4tE`,
`eleven_v3`), senza avatar, ≥ 7:00. Le slide usano la libreria `slide/illustra.mjs`,
che nel modulo 4 passa da 16 a 22 illustrazioni SVG originali animate: si aggiungono microscopio,
organigramma (impulsi che scorrono), azienda (ingranaggi e moneta), missioni (tre cerchi), percorso
(strada con segnaposto in movimento) e scudo. Ogni clip dura quanto il suo blocco audio
(fino a 30 s), così l'animazione d'ambiente continua per tutta la scena.

**Fonti**: PSSR Veneto 2019-2023: governo clinico e sicurezza (par. 3.5), PDTA (contenuti e stesura: gruppo multidisciplinare, CRITE, Azienda Zero, decreto dell'Area Sanità e Sociale), gestione del rischio, gestione delle transizioni (COT, UVMD); atto aziendale ULSS 5 (DGRV 1831/2008, risk manager, incident reporting, near miss, dimissione protetta, case manager); L. 24/2017.

## Aritmetica

| | valore |
|---|---|
| blocchi / scene | 47 / 49 |
| caratteri | 7.566 con i tag |
| stacco | dopo **s23** |
| grezzo | A 253,52 s · B 322,00 s = 575,5 s |
| parlato lavorato | **437,1 s** (5 pose) |
| CPS misurato | 17,3 car/s sul lavorato |
| montato locale | **7:30,47** |
| montato HeyGen | **{HG}** |

## Verifiche

- **Trascrizione delle tracce intere** (da asset audio, `eleven_scribe_v1`):
  A: 531/533 parole, 0 buchi
  B: 630/630 parole, 0 buchi
- «passa in reparto» trascritto «passa il reparto»: da sentire.
- **Confini**: Nessuna coppia di segno opposto, nessun blocco fuori fascia.
  `audio/correzioni.json` = nessuna.
- **Temi cambiati rispetto al copione**: nessuno.
- **Slide**: PNG guardati in provini da nove, traboccamento verificato con i caratteri veri.
  - **s02**: etichetta «Medico di famiglia» accorciata (usciva dalla cornice).
  - **s18**: etichette del `tavolo` sovrapposte, sostituite da un'etichetta unica.
  - **s24**: l'illustrazione `scudo` (rassicurante) sostituita da `lente` per l'evento avverso.
- `controlli.py`: 8/8.

## Montaggio

- Lotto HeyGen `{LOTTO}`: 96 file accoppiati per posizione, 0 discordi sul `content-type`.{EXTRA}
- Payload: 49 scene; 47 scene video, tutte con `audio_asset_id` e `playback {freeze, mute}`.
- Video HeyGen: `{VID}` (https://app.heygen.com/videos/{VID}).
- Il file consegnato non si scarica da questa sessione (proxy: 403 su files2.heygen.ai).

## Costo

```
voce, due tracce, 7.566 caratteri, eleven_v3        ≈ $1,26  (misurato)
trascrizione delle due tracce intere               ≈ $0,52  (misurato)
                                                    -------
                                                    ≈ $1,79
```

## Da verificare — quello che non ho potuto giudicare io

- **Nessuno ha ancora ascoltato il video.** La verifica è per trascrizione, durate e fotogrammi.
- Da confrontare con le fonti, in particolare:
  - L'esempio del **PDTA dello scompenso** (passaggi e controlli a domicilio) è inventato a scopo didattico.
  - La **distinzione PDTA / linea guida** è una glossa del corso, non una definizione del PSSR.
  - Che il **risk manager risponda al direttore sanitario**: così nell'atto dell'ULSS 5; da confermare per l'AOUPD.
  - Il distrattore «**la COT non è il 118**» è costruito dal corso.
- **La fonte prevista dal piano del corso per il modulo 4, `Organizzazione-Aziendale-Sanitaria-e-AOUPD.pdf`, non è disponibile** (né nel repository né su Drive). I contenuti vengono dalla dispensa CISL FP «Diritto sanitario parte prima» (Galiazzo), dall'atto aziendale dell'ULSS 5 Polesana, dal PSSR Veneto 2019-2023 e, per l'AOUPD, da sintesi di ricerca web. Va fatto un confronto con quel PDF appena c'è.
- Le **lettere CISL FP all'AOUPD** presenti su Drive non sono state usate e nessuna persona è nominata.
- Il marchio è il logo CISL FP (non «Padova Rovigo»): vale quanto detto nella 1.1.
