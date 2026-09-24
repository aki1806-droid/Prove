# REGISTRO — Lezione 3.5 · Budget, controlli e i tre principi guida

Corso **Progressione verticale · Comparto Sanità**, Modulo 3, Legislazione socio-sanitaria del Veneto.
Stesso metodo, voce, marchio e palette dei moduli 1 e 2: voce di Luca Ward (`tVdVcJPudubxmTmAw4tE`,
`eleven_v3`), senza avatar, ≥ 7:00. Dal modulo 3 le slide usano la libreria `slide/illustra.mjs`:
illustrazioni SVG originali animate (territorio, municipio, ospedale, casa, radici, bivio, documento,
bilancio, calendario, stretta di mano, lente, livelli, incastro, università, tavolo, comunità) e i nuovi
tipi `illustrata`, `flusso`, `ciclo`, `rete`, `contatore`, `sigla`. Ogni clip dura quanto il suo blocco audio
(fino a 30 s), così l'animazione d'ambiente continua per tutta la scena.

**Fonti**: dispensa CISL FP (Galiazzo): metodica di budget, contabilità analitica, centri di responsabilità, reporting, controllo regionale; schede CISL FP (L.R. 55 artt. 13-19 e 25; L.R. 56 art. 20); PSSR 2019-2023 (sussidiarietà, prossimità).

## Aritmetica

| | valore |
|---|---|
| blocchi / scene | 48 / 50 |
| caratteri | 7.350 con i tag |
| stacco | dopo **s29** |
| grezzo | A 323,76 s · B 242,24 s = 566,0 s |
| parlato lavorato | **419,4 s** (5 pose) |
| CPS misurato | 17,5 car/s sul lavorato |
| montato locale | **7:12,83** |
| montato HeyGen | **{HG}** |

## Verifiche

- **Trascrizione delle tracce intere** (da asset audio, `eleven_scribe_v1`):
  A: 673/674 parole, 0 buchi
  B: 468/470 parole, 0 buchi
- «consuntivo» trascritto «consultivo» (due volte) e «ha» reso «a»: rese del trascrittore, da sentire.
- **Confini**: Nessuna coppia di segno opposto; **s19** +1,8 s (l'elenco dei tre oggetti). Lasciato.
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
voce, due tracce, 7.350 caratteri, eleven_v3        ≈ $1,23  (misurato)
trascrizione delle due tracce intere               ≈ $0,51  (misurato)
                                                    -------
                                                    ≈ $1,74
```

## Da verificare — quello che non ho potuto giudicare io

- **Nessuno ha ancora ascoltato il video.** La verifica è per trascrizione, durate e fotogrammi.
- Da confrontare con le fonti, in particolare:
  - I **tre piani dell'integrazione** (istituzionale, gestionale, professionale): formula d'uso comune, non presa dalla dispensa.
  - Le **tre facce del budget generale** con i sottotitoli «costi e ricavi / entrate e uscite / beni e investimenti»: glossa del corso.
  - L'esempio del **report di giugno** è inventato a scopo didattico.
  - Il **visto di congruità**: i quattro atti come li elenca la dispensa.
- **I testi delle L.R. 55 e 56 del 1994 non sono stati letti**: dalla sessione non si raggiungono (rete bloccata). I numeri degli articoli vengono dalle schede CISL FP, i contenuti dalla dispensa CISL FP (Galiazzo) e da sintesi di ricerca.
- **Deviazione dal piano del corso**: il piano indicava la 55 come legge di riordino e la 56 come legge contabile, al contrario; e metteva l'accreditamento dei privati dentro queste leggi, che invece sta nella L.R. 22/2002. Il modulo segue le leggi, non il piano.
- Il marchio è il logo CISL FP (non «Padova Rovigo»): vale quanto detto nella 1.1.
