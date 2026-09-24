# REGISTRO — Lezione 3.1 · Radici del modello veneto

Corso **Progressione verticale · Comparto Sanità**, Modulo 3, Legislazione socio-sanitaria del Veneto.
Stesso metodo, voce, marchio e palette dei moduli 1 e 2: voce di Luca Ward (`tVdVcJPudubxmTmAw4tE`,
`eleven_v3`), senza avatar, ≥ 7:00. Dal modulo 3 le slide usano la libreria `slide/illustra.mjs`:
illustrazioni SVG originali animate (territorio, municipio, ospedale, casa, radici, bivio, documento,
bilancio, calendario, stretta di mano, lente, livelli, incastro, università, tavolo, comunità) e i nuovi
tipi `illustrata`, `flusso`, `ciclo`, `rete`, `contatore`, `sigla`. Ogni clip dura quanto il suo blocco audio
(fino a 30 s), così l'animazione d'ambiente continua per tutta la scena.

**Fonti**: dispensa CISL FP (Galiazzo), schede CISL FP; sintesi di ricerca su L. 281/1970, L.R. 12/1974 e 64/1975 (consorzi socio-sanitari), L. 833/1978, L.R. 55/1982, L.R. 55 e 56 del 14/9/1994 (BUR n. 77 del 16/9/1994); L.R. 19/2016.

## Aritmetica

| | valore |
|---|---|
| blocchi / scene | 48 / 50 |
| caratteri | 7.490 con i tag |
| stacco | dopo **s26** |
| grezzo | A 310,96 s · B 284,32 s = 595,3 s |
| parlato lavorato | **464,6 s** (4 pose) |
| CPS misurato | 16,1 car/s sul lavorato |
| montato locale | **7:57,96** |
| montato HeyGen | **{HG}** |

## Verifiche

- **Trascrizione delle tracce intere** (da asset audio, `eleven_scribe_v1`):
  A: 654/656 parole, 0 buchi
  B: 593/594 parole, 0 buchi
- «esse» trascritto «s»: resa del trascrittore.
- **Confini**: Il confine **s42/s43** era 2,4 s avanti: spostato di una pausa indietro. Resta 0,8 s di scarto spiegato dalla sigla «ULSS» detta lettera per lettera.
  `audio/correzioni.json` = `{"B": {"15": {"pause": -1}}}`.
- **Temi cambiati rispetto al copione**: nessuno.
- **Slide**: PNG guardati in provini da nove, traboccamento verificato con i caratteri veri.
  - **s11**: da `sostituzione` a `confronto` (lo stile barrato resta per le affermazioni false o superate).
  - **s29**: da `norma` all'illustrazione `bilancio`.
- `controlli.py`: 8/8.

## Montaggio

- Lotto HeyGen `{LOTTO}`: 98 file accoppiati per posizione, 0 discordi sul `content-type`.{EXTRA}
- Payload: 50 scene; 48 scene video, tutte con `audio_asset_id` e `playback {freeze, mute}`.
- Video HeyGen: `{VID}` (https://app.heygen.com/videos/{VID}).
- Il file consegnato non si scarica da questa sessione (proxy: 403 su files2.heygen.ai).

## Costo

```
voce, due tracce, 7.490 caratteri, eleven_v3        ≈ $1,23  (stimato sui caratteri)
trascrizione delle due tracce intere               ≈ $0,54  (stimato sui secondi)
                                                    -------
                                                    ≈ $1,77
```

## Da verificare — quello che non ho potuto giudicare io

- **Nessuno ha ancora ascoltato il video.** La verifica è per trascrizione, durate e fotogrammi.
- Da confrontare con le fonti, in particolare:
  - Il **verso della delega** (dai Comuni alle unità locali): la dispensa è ambigua nella formulazione.
  - Che la **L.R. 55/1982** riguardi le funzioni socio-assistenziali.
  - Il rinvio all'**art. 3 del D.Lgs. 502/1992** per la delega dei servizi sociali.
- **I testi delle L.R. 55 e 56 del 1994 non sono stati letti**: dalla sessione non si raggiungono (rete bloccata). I numeri degli articoli vengono dalle schede CISL FP, i contenuti dalla dispensa CISL FP (Galiazzo) e da sintesi di ricerca.
- **Deviazione dal piano del corso**: il piano indicava la 55 come legge di riordino e la 56 come legge contabile, al contrario; e metteva l'accreditamento dei privati dentro queste leggi, che invece sta nella L.R. 22/2002. Il modulo segue le leggi, non il piano.
- Il marchio è il logo CISL FP (non «Padova Rovigo»): vale quanto detto nella 1.1.
