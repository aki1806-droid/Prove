# REGISTRO — Lezione 6b.3 · Il responsabile della prevenzione

Corso **Progressione verticale · Comparto Sanità**, Modulo 6-bis, Anticorruzione (L. 190/2012).
Stesso metodo, voce, marchio e palette degli altri moduli: voce di Luca Ward (`tVdVcJPudubxmTmAw4tE`,
`eleven_v3`), senza avatar, ≥ 7:00. Le slide usano la libreria `slide/illustra.mjs`,
con le 61 illustrazioni SVG originali animate del corso: il modulo 6-bis non ne aggiunge.
Ogni clip dura quanto il suo blocco audio (fino a 30 s), così l'animazione d'ambiente continua per tutta la scena.

**Fonti**: L. 190/2012 art. 1 cc. 7, 8, 8-bis, 10, 12, 13, 14; D.Lgs. 165/2001 artt. 16 c. 1 lett. l-bis/l-ter/l-quater e 21; D.Lgs. 33/2013 art. 5; D.Lgs. 39/2013 art. 15; DPR 62/2013 art. 8; PNA 2019.

## Aritmetica

| | valore |
|---|---|
| blocchi / scene | 46 / 48 |
| caratteri | 7.445 con i tag |
| stacco | dopo **s25** |
| grezzo | A 294,08 s · B 274,48 s = 568,6 s |
| parlato lavorato | **447,8 s** (22 pose) |
| CPS misurato | 16,6 car/s sul lavorato |
| montato locale | **7:41,12** |
| montato HeyGen | **7:39,88** |

## Verifiche

- **Trascrizione delle tracce intere** (da asset audio, `eleven_scribe_v1`):
  A: 609/609 parole, 0 buchi
  B: 564/564 parole, 0 buchi
- **Confini**: Nella prima voce la sigla «OIV» era pronunciata male (trascritta «OVI», «OIICIC»): testo cambiato in «organismo di valutazione» (le slide mantengono la sigla OIV) e **voce rigenerata**; con la nuova voce nessuna coppia di segno opposto.
  `audio/correzioni.json` = nessuna.
- **Temi cambiati rispetto al copione**: nessuno.
- **Slide**: PNG guardati in provini da nove, traboccamento verificato con i caratteri veri.
  - **s10**: elenco con × per le scelte che il PNA sconsiglia.
  - Testo: «Per questo il Piano nazionale sconsiglia» diventato «Proprio per garantire l'autonomia…» prima della voce.
- `controlli.py`: 8/8.

## Montaggio

- Lotto HeyGen `027e3485c2474df9bc17ab1e9cec8ffa`: 94 file accoppiati per posizione, 0 discordi sul `content-type`.
- Payload: 48 scene; 46 scene video, tutte con `audio_asset_id` e `playback {freeze, mute}`.
- Video HeyGen: `7e6df5b86c6f7b0aff44d1852dbff7c3` (https://app.heygen.com/videos/7e6df5b86c6f7b0aff44d1852dbff7c3).
- Il file consegnato non si scarica da questa sessione (proxy: 403 su files2.heygen.ai).

## Costo

```
voce, due tracce, 7.445 caratteri, eleven_v3        ≈ $1,24  (misurato)
trascrizione delle due tracce intere               ≈ $0,52  (misurato)
scarti (prima voce e prima trascrizione di 6b.3, scartate)  ≈ $1,73
                                                    -------
                                                    ≈ $3,49
```

## Da verificare — quello che non ho potuto giudicare io

- **Nessuno ha ancora ascoltato il video.** La verifica è per trascrizione, durate e fotogrammi.
- Da confrontare con le fonti, in particolare:
  - PNA: sconsigliati come RPCT i dirigenti delle aree a rischio e il responsabile dell'UPD; comunicazione del nominativo all'ANAC: da confermare sul PNA vigente.
  - Rotazione straordinaria (art. 16 c. 1 lett. l-quater D.Lgs. 165/2001): formulazione sintetica.
  - Gli esempi (aziende, gare, persone) sono inventati a scopo didattico.
- **Il modulo non era nel piano del corso**: è stato aggiunto su richiesta, dopo il modulo 6 (Trasparenza), come «M6-bis», per non rinumerare i moduli 7-12 già pubblicati. La lezione 6.5 chiude ancora con «nel prossimo: il trattamento dei dati personali»: il video non è stato rifatto.
- Fonti: il **testo della L. 190/2012** su Drive (versione in vigore dal 23 giugno 2016, art. 1 cc. 1-17 e 41-51 letti), due **dispense su Drive sull'anticorruzione in sanità** e la conoscenza generale della materia per D.Lgs. 39/2013, DPR 62/2013 (con DPR 81/2023), D.L. 80/2021 (PIAO), D.Lgs. 24/2023 (whistleblowing) e PNA: questi testi **non sono stati letti** (non sono su Drive e il proxy blocca Gazzetta Ufficiale e normattiva). Sono **da verificare**.
- Le **dispense contengono errori** che il corso non riprende: ANAC «istituita nel 2014» (la L. 190 del 2012 la prevede già, affidandone il ruolo alla CIVIT; D.L. 101/2013 il nome, D.L. 90/2014 le funzioni AVCP); rotazione «ogni 5 anni» come regola (i criteri li fissa il piano); RPCT «di norma il direttore amministrativo» (il PNA sconsiglia dirigenti di aree a rischio); esempio dell'ex assessore regionale inquadrato nell'art. 3 del D.Lgs. 39/2013 (che riguarda le condanne); l'RPCT che «gestisce le richieste FOIA» (decide sul riesame); tutela del segnalante descritta con la L. 179/2017 senza il D.Lgs. 24/2023 in una delle due; PIAO assente; percentuali sulla corruzione in sanità (50%, 10-15%) senza fonte, non usate.
- **Da verificare in generale**: D.Lgs. 24/2023 (canali, 7 giorni e 3 mesi, condizioni del canale esterno e della divulgazione pubblica, sanzioni ANAC 10.000-50.000 euro, perdita delle tutele); PIAO (D.L. 80/2021 art. 6, soglia dei 50 dipendenti, 31 gennaio); PNA vigente (PNA 2022 e aggiornamenti successivi); D.Lgs. 39/2013 artt. 3, 5, 8, 10, 17-20 (periodi di inconferibilità per DG, DA e DS, lasciati generici nel testo); DPR 62/2013 artt. 4, 6, 7, 13 e novità del DPR 81/2023; art. 53 c. 16-ter D.Lgs. 165/2001 (pantouflage); relazione annuale dell'RPCT (15 dicembre, spesso prorogato dall'ANAC).
- Le **slide dei relatori nominati** presenti su Drive, i documenti personali e le **lettere e note CISL FP** non sono stati usati; nessuna persona è nominata.
- Il marchio è il logo CISL FP (non «Padova Rovigo»): vale quanto detto nella 1.1.
