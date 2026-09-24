# REGISTRO — Lezione 3.2 · L.R. 56/1994: il riordino

Corso **Progressione verticale · Comparto Sanità**, Modulo 3, Legislazione socio-sanitaria del Veneto.
Stesso metodo, voce, marchio e palette dei moduli 1 e 2: voce di Luca Ward (`tVdVcJPudubxmTmAw4tE`,
`eleven_v3`), senza avatar, ≥ 7:00. Dal modulo 3 le slide usano la libreria `slide/illustra.mjs`:
illustrazioni SVG originali animate (territorio, municipio, ospedale, casa, radici, bivio, documento,
bilancio, calendario, stretta di mano, lente, livelli, incastro, università, tavolo, comunità) e i nuovi
tipi `illustrata`, `flusso`, `ciclo`, `rete`, `contatore`, `sigla`. Ogni clip dura quanto il suo blocco audio
(fino a 30 s), così l'animazione d'ambiente continua per tutta la scena.

**Fonti**: dispensa CISL FP (Galiazzo), schede CISL FP (art. 5 Conferenza dei sindaci), sintesi della Regione su finalità e delega; L.R. 19/2016 (artt. 17-26).

## Aritmetica

| | valore |
|---|---|
| blocchi / scene | 48 / 50 |
| caratteri | 7.410 con i tag |
| stacco | dopo **s25** |
| grezzo | A 269,92 s · B 294,80 s = 564,7 s |
| parlato lavorato | **428,7 s** (4 pose) |
| CPS misurato | 17,3 car/s sul lavorato |
| montato locale | **7:22,16** |
| montato HeyGen | **7:20,77** |

## Verifiche

- **Trascrizione delle tracce intere** (da asset audio, `eleven_scribe_v1`):
  A: 573/573 parole, 0 buchi
  B: 588/589 parole, 0 buchi
- «consuntivo» trascritto «consultivo»: resa del trascrittore, da sentire.
- **Confini**: Nessuna coppia di segno opposto.
  `audio/correzioni.json` = nessuna.
- **Temi cambiati rispetto al copione**: nessuno.
- **Slide**: PNG guardati in provini da nove, traboccamento verificato con i caratteri veri.
  - **s05, s34, s41**: parole dei flussi e un'etichetta uscivano dalla cornice; regole di corpo e larghezza aggiunte alla libreria, un'etichetta accorciata.
  - Il centro della rete («Conferenza») ora riduce il corpo sopra i 7 caratteri.
- `controlli.py`: 8/8.

## Montaggio

- Lotto HeyGen `8d0e52a382604a35a213d6fc789ad9a1`: 98 file accoppiati per posizione, 0 discordi sul `content-type`.
- Payload: 50 scene; 48 scene video, tutte con `audio_asset_id` e `playback {freeze, mute}`.
- Video HeyGen: `5150ff793c44dca6bdcabde19f8456d7` (https://app.heygen.com/videos/5150ff793c44dca6bdcabde19f8456d7).
- Il file consegnato non si scarica da questa sessione (proxy: 403 su files2.heygen.ai).

## Costo

```
voce, due tracce, 7.410 caratteri, eleven_v3        ≈ $1,22  (stimato sui caratteri)
trascrizione delle due tracce intere               ≈ $0,51  (stimato sui secondi)
                                                    -------
                                                    ≈ $1,73
```

## Da verificare — quello che non ho potuto giudicare io

- **Nessuno ha ancora ascoltato il video.** La verifica è per trascrizione, durate e fotogrammi.
- Da confrontare con le fonti, in particolare:
  - I **quattro compiti della Conferenza dei sindaci** (art. 5) come li riportano le schede CISL.
  - La **relazione annuale della Giunta al Consiglio entro il 30 settembre**.
  - I **tre scopi dei protocolli Regione-Università**.
- **I testi delle L.R. 55 e 56 del 1994 non sono stati letti**: dalla sessione non si raggiungono (rete bloccata). I numeri degli articoli vengono dalle schede CISL FP, i contenuti dalla dispensa CISL FP (Galiazzo) e da sintesi di ricerca.
- **Deviazione dal piano del corso**: il piano indicava la 55 come legge di riordino e la 56 come legge contabile, al contrario; e metteva l'accreditamento dei privati dentro queste leggi, che invece sta nella L.R. 22/2002. Il modulo segue le leggi, non il piano.
- Il marchio è il logo CISL FP (non «Padova Rovigo»): vale quanto detto nella 1.1.
