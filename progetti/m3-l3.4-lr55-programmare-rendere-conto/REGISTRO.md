# REGISTRO — Lezione 3.4 · L.R. 55/1994: programmare e rendere conto

Corso **Progressione verticale · Comparto Sanità**, Modulo 3, Legislazione socio-sanitaria del Veneto.
Stesso metodo, voce, marchio e palette dei moduli 1 e 2: voce di Luca Ward (`tVdVcJPudubxmTmAw4tE`,
`eleven_v3`), senza avatar, ≥ 7:00. Dal modulo 3 le slide usano la libreria `slide/illustra.mjs`:
illustrazioni SVG originali animate (territorio, municipio, ospedale, casa, radici, bivio, documento,
bilancio, calendario, stretta di mano, lente, livelli, incastro, università, tavolo, comunità) e i nuovi
tipi `illustrata`, `flusso`, `ciclo`, `rete`, `contatore`, `sigla`. Ogni clip dura quanto il suo blocco audio
(fino a 30 s), così l'animazione d'ambiente continua per tutta la scena.

**Fonti**: dispensa CISL FP (Galiazzo): programmazione, bilanci, contabilità, libri, bilancio d'esercizio, fonti di finanziamento; schede CISL FP (artt. 5, 23).

## Aritmetica

| | valore |
|---|---|
| blocchi / scene | 48 / 50 |
| caratteri | 7.419 con i tag |
| stacco | dopo **s23** |
| grezzo | A 246,72 s · B 311,04 s = 557,8 s |
| parlato lavorato | **418,6 s** (4 pose) |
| CPS misurato | 17,7 car/s sul lavorato |
| montato locale | **7:11,96** |
| montato HeyGen | **{HG}** |

## Verifiche

- **Trascrizione delle tracce intere** (da asset audio, `eleven_scribe_v1`):
  A: 519/520 parole, 0 buchi
  B: 677/677 parole, 0 buchi
- «il sabato» trascritto «in sabato»: resa del trascrittore.
- **Confini**: Nessuna coppia di segno opposto; **s31** (i cinque documenti) +1,6 s: elenco lungo, detto piano. Lasciato.
  `audio/correzioni.json` = nessuna.
- **Temi cambiati rispetto al copione**: nessuno.
- **Slide**: PNG guardati in provini da nove, traboccamento verificato con i caratteri veri.
  - nessuna correzione dopo i provini.
- `controlli.py`: 8/8.

## Montaggio

- Lotto HeyGen `{LOTTO}`: 98 file accoppiati per posizione, 0 discordi sul `content-type`.{EXTRA}
- Payload: 50 scene; 48 scene video, tutte con `audio_asset_id` e `playback {freeze, mute}`.
- Video HeyGen: `{VID}` (https://app.heygen.com/videos/{VID}).
- Il file consegnato non si scarica da questa sessione (proxy: 403 su files2.heygen.ai).

## Costo

```
voce, due tracce, 7.419 caratteri, eleven_v3        ≈ $1,24  (misurato)
trascrizione delle due tracce intere               ≈ $0,51  (misurato)
                                                    -------
                                                    ≈ $1,75
```

## Da verificare — quello che non ho potuto giudicare io

- **Nessuno ha ancora ascoltato il video.** La verifica è per trascrizione, durate e fotogrammi.
- Da confrontare con le fonti, in particolare:
  - Il **piano generale mai davvero adottato** nelle ULSS venete e sostituito dal piano della performance: lo dice la dispensa.
  - Le **date**: piano generale e preventivo entro il 31/12, bilancio d'esercizio entro il 30/04.
  - Le **fonti di finanziamento** dell'art. 5 e la differenza ULSS / azienda ospedaliera.
  - La **mobilità** spiegata con un esempio (Rovigo-Padova): semplificazione didattica.
- **I testi delle L.R. 55 e 56 del 1994 non sono stati letti**: dalla sessione non si raggiungono (rete bloccata). I numeri degli articoli vengono dalle schede CISL FP, i contenuti dalla dispensa CISL FP (Galiazzo) e da sintesi di ricerca.
- **Deviazione dal piano del corso**: il piano indicava la 55 come legge di riordino e la 56 come legge contabile, al contrario; e metteva l'accreditamento dei privati dentro queste leggi, che invece sta nella L.R. 22/2002. Il modulo segue le leggi, non il piano.
- Il marchio è il logo CISL FP (non «Padova Rovigo»): vale quanto detto nella 1.1.
