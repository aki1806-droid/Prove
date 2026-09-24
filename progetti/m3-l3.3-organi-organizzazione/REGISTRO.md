# REGISTRO — Lezione 3.3 · Organi, distretti e dipartimenti

Corso **Progressione verticale · Comparto Sanità**, Modulo 3, Legislazione socio-sanitaria del Veneto.
Stesso metodo, voce, marchio e palette dei moduli 1 e 2: voce di Luca Ward (`tVdVcJPudubxmTmAw4tE`,
`eleven_v3`), senza avatar, ≥ 7:00. Dal modulo 3 le slide usano la libreria `slide/illustra.mjs`:
illustrazioni SVG originali animate (territorio, municipio, ospedale, casa, radici, bivio, documento,
bilancio, calendario, stretta di mano, lente, livelli, incastro, università, tavolo, comunità) e i nuovi
tipi `illustrata`, `flusso`, `ciclo`, `rete`, `contatore`, `sigla`. Ogni clip dura quanto il suo blocco audio
(fino a 30 s), così l'animazione d'ambiente continua per tutta la scena.

**Fonti**: schede CISL FP (L.R. 56 artt. 10, 13, 20, 21; L.R. 55 artt. 40-44); dispensa CISL FP (Galiazzo); L.R. 19/2016 (organi, coordinatori).

## Aritmetica

| | valore |
|---|---|
| blocchi / scene | 47 / 49 |
| caratteri | 7.544 con i tag |
| stacco | dopo **s23** |
| grezzo | A 269,52 s · B 304,88 s = 574,4 s |
| parlato lavorato | **450,0 s** (3 pose) |
| CPS misurato | 16,8 car/s sul lavorato |
| montato locale | **7:43,44** |
| montato HeyGen | **{HG}** |

## Verifiche

- **Trascrizione delle tracce intere** (da asset audio, `eleven_scribe_v1`):
  A: 551/554 parole, 0 buchi
  B: 599/600 parole, 0 buchi
- «l'articolo dieci» trascritto «all'articolo 10»; «3000» e «500000» resi con lo spazio: rese del trascrittore.
- **Confini**: Nessuna coppia di segno opposto, nessun blocco fuori fascia.
  `audio/correzioni.json` = nessuna.
- **Temi cambiati rispetto al copione**: nessuno.
- **Slide**: PNG guardati in provini da nove, traboccamento verificato con i caratteri veri.
  - nessuna correzione dopo i provini.
- `controlli.py`: 8/8.

## Montaggio

- Lotto HeyGen `{LOTTO}`: 96 file accoppiati per posizione, 0 discordi sul `content-type`.{EXTRA}
- Payload: 49 scene; 47 scene video, tutte con `audio_asset_id` e `playback {freeze, mute}`.
- Video HeyGen: `{VID}` (https://app.heygen.com/videos/{VID}).
- Il file consegnato non si scarica da questa sessione (proxy: 403 su files2.heygen.ai).

## Costo

```
voce, due tracce, 7.544 caratteri, eleven_v3        ≈ $1,24  (stimato sui caratteri)
trascrizione delle due tracce intere               ≈ $0,52  (misurato)
                                                    -------
                                                    ≈ $1,76
```

## Da verificare — quello che non ho potuto giudicare io

- **Nessuno ha ancora ascoltato il video.** La verifica è per trascrizione, durate e fotogrammi.
- Da confrontare con le fonti, in particolare:
  - La **nomina del DG**: «dalla Giunta, sentito il Consiglio regionale» (formula della 56; con la L.R. 19 cambia).
  - Il **collegio dei revisori**: designazioni Giunta, MEF, Salute (artt. 40-44 della 55).
  - Le **soglie dei coordinatori** (3.000 posti letto, 500.000 abitanti) della L.R. 19.
  - Chi siede nel **collegio di direzione** (D.Lgs. 502, art. 17, e atto aziendale).
- **I testi delle L.R. 55 e 56 del 1994 non sono stati letti**: dalla sessione non si raggiungono (rete bloccata). I numeri degli articoli vengono dalle schede CISL FP, i contenuti dalla dispensa CISL FP (Galiazzo) e da sintesi di ricerca.
- **Deviazione dal piano del corso**: il piano indicava la 55 come legge di riordino e la 56 come legge contabile, al contrario; e metteva l'accreditamento dei privati dentro queste leggi, che invece sta nella L.R. 22/2002. Il modulo segue le leggi, non il piano.
- Il marchio è il logo CISL FP (non «Padova Rovigo»): vale quanto detto nella 1.1.
