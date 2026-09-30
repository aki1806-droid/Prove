# REGISTRO — Lezione 6b.1 · La legge 190 e il sistema di prevenzione

Corso **Progressione verticale · Comparto Sanità**, Modulo 6-bis, Anticorruzione (L. 190/2012).
Stesso metodo, voce, marchio e palette degli altri moduli: voce di Luca Ward (`tVdVcJPudubxmTmAw4tE`,
`eleven_v3`), senza avatar, ≥ 7:00. Le slide usano la libreria `slide/illustra.mjs`,
con le 61 illustrazioni SVG originali animate del corso: il modulo 6-bis non ne aggiunge.
Ogni clip dura quanto il suo blocco audio (fino a 30 s), così l'animazione d'ambiente continua per tutta la scena.

**Fonti**: L. 190/2012 art. 1 cc. 1-4, 2-bis, 46, 49-51, 59 (testo su Drive); D.L. 101/2013 e D.L. 90/2014 (ANAC); PNA 2013, aggiornamento 2015, PNA 2022; L. 3/2019; dispense su Drive (con correzioni).

## Aritmetica

| | valore |
|---|---|
| blocchi / scene | 46 / 48 |
| caratteri | 7.422 con i tag |
| stacco | dopo **s22** |
| grezzo | A 256,56 s · B 304,88 s = 561,4 s |
| parlato lavorato | **449,4 s** (22 pose) |
| CPS misurato | 16,5 car/s sul lavorato |
| montato locale | **7:42,72** |
| montato HeyGen | **7:41,45** |

## Verifiche

- **Trascrizione delle tracce intere** (da asset audio, `eleven_scribe_v1`):
  A: 524/525 parole, 0 buchi
  B: 635/636 parole, 0 buchi
- Rese diverse, non buchi: **s06** «il» trascritto «al»; **s39** «spazzacorrotti» trascritto «spazza corrotti».
- **Confini**: Nessuna coppia di segno opposto, nessun blocco fuori fascia.
  `audio/correzioni.json` = nessuna.
- **Temi cambiati rispetto al copione**: nessuno.
- **Slide**: PNG guardati in provini da nove, traboccamento verificato con i caratteri veri.
  - Nessuna illustrazione nuova: la libreria resta di 61.
  - **s12**: da `sostituzione` a `confronto` (la frase barrata sarebbe stata vera); **s23**: sigla A-N-A-C in quattro lettere; **s19**: `icone` al posto di `griglia` con le spunte.
- `controlli.py`: 8/8.

## Montaggio

- Lotto HeyGen `5b267a267a514b6bac4b14c961db8aae`: 94 file accoppiati per posizione, 0 discordi sul `content-type`.
- Payload: 48 scene; 46 scene video, tutte con `audio_asset_id` e `playback {freeze, mute}`.
- Video HeyGen: `2d80a30adc2016a7c1f03cf5d95157ce` (https://app.heygen.com/videos/2d80a30adc2016a7c1f03cf5d95157ce).
- Il file consegnato non si scarica da questa sessione (proxy: 403 su files2.heygen.ai).

## Costo

```
voce, due tracce, 7.422 caratteri, eleven_v3        ≈ $1,24  (misurato)
trascrizione delle due tracce intere               ≈ $0,51  (misurato)
                                                    -------
                                                    ≈ $1,75
```

## Da verificare — quello che non ho potuto giudicare io

- **Nessuno ha ancora ascoltato il video.** La verifica è per trascrizione, durate e fotogrammi.
- Da confrontare con le fonti, in particolare:
  - Relazione annuale dell'ANAC al Parlamento «entro il 31 dicembre» (art. 1 c. 2 lett. g): da confrontare con la prassi vigente.
  - Nozione ampia di corruzione (cattiva amministrazione): dal PNA; formulazione del corso sintetica.
  - Gli esempi (aziende, gare, persone) sono inventati a scopo didattico.
- **Il modulo non era nel piano del corso**: è stato aggiunto su richiesta, dopo il modulo 6 (Trasparenza), come «M6-bis», per non rinumerare i moduli 7-12 già pubblicati. La lezione 6.5 chiude ancora con «nel prossimo: il trattamento dei dati personali»: il video non è stato rifatto.
- Fonti: il **testo della L. 190/2012** su Drive (versione in vigore dal 23 giugno 2016, art. 1 cc. 1-17 e 41-51 letti), due **dispense su Drive sull'anticorruzione in sanità** e la conoscenza generale della materia per D.Lgs. 39/2013, DPR 62/2013 (con DPR 81/2023), D.L. 80/2021 (PIAO), D.Lgs. 24/2023 (whistleblowing) e PNA: questi testi **non sono stati letti** (non sono su Drive e il proxy blocca Gazzetta Ufficiale e normattiva). Sono **da verificare**.
- Le **dispense contengono errori** che il corso non riprende: ANAC «istituita nel 2014» (la L. 190 del 2012 la prevede già, affidandone il ruolo alla CIVIT; D.L. 101/2013 il nome, D.L. 90/2014 le funzioni AVCP); rotazione «ogni 5 anni» come regola (i criteri li fissa il piano); RPCT «di norma il direttore amministrativo» (il PNA sconsiglia dirigenti di aree a rischio); esempio dell'ex assessore regionale inquadrato nell'art. 3 del D.Lgs. 39/2013 (che riguarda le condanne); l'RPCT che «gestisce le richieste FOIA» (decide sul riesame); tutela del segnalante descritta con la L. 179/2017 senza il D.Lgs. 24/2023 in una delle due; PIAO assente; percentuali sulla corruzione in sanità (50%, 10-15%) senza fonte, non usate.
- **Da verificare in generale**: D.Lgs. 24/2023 (canali, 7 giorni e 3 mesi, condizioni del canale esterno e della divulgazione pubblica, sanzioni ANAC 10.000-50.000 euro, perdita delle tutele); PIAO (D.L. 80/2021 art. 6, soglia dei 50 dipendenti, 31 gennaio); PNA vigente (PNA 2022 e aggiornamenti successivi); D.Lgs. 39/2013 artt. 3, 5, 8, 10, 17-20 (periodi di inconferibilità per DG, DA e DS, lasciati generici nel testo); DPR 62/2013 artt. 4, 6, 7, 13 e novità del DPR 81/2023; art. 53 c. 16-ter D.Lgs. 165/2001 (pantouflage); relazione annuale dell'RPCT (15 dicembre, spesso prorogato dall'ANAC).
- Le **slide dei relatori nominati** presenti su Drive, i documenti personali e le **lettere e note CISL FP** non sono stati usati; nessuna persona è nominata.
- Il marchio è il logo CISL FP (non «Padova Rovigo»): vale quanto detto nella 1.1.
