# REGISTRO — Lezione 6b.4 · Imparzialità: conflitti, incarichi, codice

Corso **Progressione verticale · Comparto Sanità**, Modulo 6-bis, Anticorruzione (L. 190/2012).
Stesso metodo, voce, marchio e palette degli altri moduli: voce di Luca Ward (`tVdVcJPudubxmTmAw4tE`,
`eleven_v3`), senza avatar, ≥ 7:00. Le slide usano la libreria `slide/illustra.mjs`,
con le 61 illustrazioni SVG originali animate del corso: il modulo 6-bis non ne aggiunge.
Ogni clip dura quanto il suo blocco audio (fino a 30 s), così l'animazione d'ambiente continua per tutta la scena.

**Fonti**: L. 241/1990 art. 6-bis; D.Lgs. 165/2001 artt. 35-bis, 53 (cc. 7, 7-bis, 16-ter), 54; D.Lgs. 39/2013 artt. 3, 10, 15, 17-20; DPR 62/2013 artt. 4, 6, 7, 13 (con DPR 81/2023); L. 190/2012 cc. 41-46.

## Aritmetica

| | valore |
|---|---|
| blocchi / scene | 45 / 47 |
| caratteri | 7.598 con i tag |
| stacco | dopo **s23** |
| grezzo | A 264,88 s · B 324,32 s = 589,2 s |
| parlato lavorato | **454,1 s** (22 pose) |
| CPS misurato | 16,7 car/s sul lavorato |
| montato locale | **7:47,55** |
| montato HeyGen | **7:46,26** |

## Verifiche

- **Trascrizione delle tracce intere** (da asset audio, `eleven_scribe_v1`):
  A: 570/570 parole, 0 buchi
  B: 605/605 parole, 0 buchi
- **Confini**: Traccia B rigenerata per la sigla «OIV» (trascritta «ho icumbo»). Poi **s29/s30** (-1,61 s / +1,48 s): confine spostato alla pausa successiva (+1,81 s).
  `audio/correzioni.json` = {"B": {"5": {"pause": 1}}}.
- **Temi cambiati rispetto al copione**: nessuno.
- **Slide**: PNG guardati in provini da nove, traboccamento verificato con i caratteri veri.
  - **s41**: titolo accorciato.
  - **s21**: icona `documento` al posto di un'icona inesistente.
- `controlli.py`: 8/8.

## Montaggio

- Lotto HeyGen `8c676f7d695e41dd923e31bbe265f9c2`: 92 file accoppiati per posizione, 0 discordi sul `content-type`.
- Payload: 47 scene; 45 scene video, tutte con `audio_asset_id` e `playback {freeze, mute}`.
- Video HeyGen: `12bf007dcb04c5e0902dc830b88a3bdc` (https://app.heygen.com/videos/12bf007dcb04c5e0902dc830b88a3bdc).
- Il file consegnato non si scarica da questa sessione (proxy: 403 su files2.heygen.ai).

## Costo

```
voce, due tracce, 7.598 caratteri, eleven_v3        ≈ $1,27  (misurato)
trascrizione delle due tracce intere               ≈ $0,53  (misurato)
scarti (prima voce della traccia B e sua trascrizione, scartate)  ≈ $0,94
                                                    -------
                                                    ≈ $2,74
```

## Da verificare — quello che non ho potuto giudicare io

- **Nessuno ha ancora ascoltato il video.** La verifica è per trascrizione, durate e fotogrammi.
- Da confrontare con le fonti, in particolare:
  - Periodi di inconferibilità dopo cariche politiche per DG, DA e DS (D.Lgs. 39/2013): nel corso solo «caso per caso».
  - Esempio di incompatibilità (direttore sanitario amministratore di una clinica accreditata): da confrontare con l'art. 10 del D.Lgs. 39/2013.
  - Gli esempi (aziende, gare, persone) sono inventati a scopo didattico.
- **Il modulo non era nel piano del corso**: è stato aggiunto su richiesta, dopo il modulo 6 (Trasparenza), come «M6-bis», per non rinumerare i moduli 7-12 già pubblicati. La lezione 6.5 chiude ancora con «nel prossimo: il trattamento dei dati personali»: il video non è stato rifatto.
- Fonti: il **testo della L. 190/2012** su Drive (versione in vigore dal 23 giugno 2016, art. 1 cc. 1-17 e 41-51 letti), due **dispense su Drive sull'anticorruzione in sanità** e la conoscenza generale della materia per D.Lgs. 39/2013, DPR 62/2013 (con DPR 81/2023), D.L. 80/2021 (PIAO), D.Lgs. 24/2023 (whistleblowing) e PNA: questi testi **non sono stati letti** (non sono su Drive e il proxy blocca Gazzetta Ufficiale e normattiva). Sono **da verificare**.
- Le **dispense contengono errori** che il corso non riprende: ANAC «istituita nel 2014» (la L. 190 del 2012 la prevede già, affidandone il ruolo alla CIVIT; D.L. 101/2013 il nome, D.L. 90/2014 le funzioni AVCP); rotazione «ogni 5 anni» come regola (i criteri li fissa il piano); RPCT «di norma il direttore amministrativo» (il PNA sconsiglia dirigenti di aree a rischio); esempio dell'ex assessore regionale inquadrato nell'art. 3 del D.Lgs. 39/2013 (che riguarda le condanne); l'RPCT che «gestisce le richieste FOIA» (decide sul riesame); tutela del segnalante descritta con la L. 179/2017 senza il D.Lgs. 24/2023 in una delle due; PIAO assente; percentuali sulla corruzione in sanità (50%, 10-15%) senza fonte, non usate.
- **Da verificare in generale**: D.Lgs. 24/2023 (canali, 7 giorni e 3 mesi, condizioni del canale esterno e della divulgazione pubblica, sanzioni ANAC 10.000-50.000 euro, perdita delle tutele); PIAO (D.L. 80/2021 art. 6, soglia dei 50 dipendenti, 31 gennaio); PNA vigente (PNA 2022 e aggiornamenti successivi); D.Lgs. 39/2013 artt. 3, 5, 8, 10, 17-20 (periodi di inconferibilità per DG, DA e DS, lasciati generici nel testo); DPR 62/2013 artt. 4, 6, 7, 13 e novità del DPR 81/2023; art. 53 c. 16-ter D.Lgs. 165/2001 (pantouflage); relazione annuale dell'RPCT (15 dicembre, spesso prorogato dall'ANAC).
- Le **slide dei relatori nominati** presenti su Drive, i documenti personali e le **lettere e note CISL FP** non sono stati usati; nessuna persona è nominata.
- Il marchio è il logo CISL FP (non «Padova Rovigo»): vale quanto detto nella 1.1.
