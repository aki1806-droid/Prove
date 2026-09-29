# REGISTRO — Lezione 9.5 · DVR, formazione, DPI

Corso **Progressione verticale · Comparto Sanità**, Modulo 9, Salute e sicurezza sul lavoro.
Stesso metodo, voce, marchio e palette dei moduli 1-8: voce di Luca Ward (`tVdVcJPudubxmTmAw4tE`,
`eleven_v3`), senza avatar, ≥ 7:00. Le slide usano la libreria `slide/illustra.mjs`,
che nel modulo 9 passa da 41 a 46 illustrazioni SVG originali animate: si aggiungono casco
(l'elmetto con la croce), cartello (il triangolo di pericolo), estintore (con il cartello di uscita),
dpi (mascherina, guanto e occhiali) e siringa (con il contenitore per i taglienti).
Ogni clip dura quanto il suo blocco audio (fino a 30 s), così l'animazione d'ambiente continua per tutta la scena.

**Fonti**: D.Lgs. 81/2008 artt. 17, 28, 29, 36, 37; artt. 74-78 (indice); Accordo Stato-Regioni 21/12/2011; dispensa su Drive (con correzioni).

## Aritmetica

| | valore |
|---|---|
| blocchi / scene | 48 / 50 |
| caratteri | 7.340 con i tag |
| stacco | dopo **s23** |
| grezzo | A 233,20 s · B 283,68 s = 516,9 s |
| parlato lavorato | **426,8 s** (21 pose) |
| CPS misurato | 17,2 car/s sul lavorato |
| montato locale | **7:20,24** |
| montato HeyGen | **7:18,85** |

## Verifiche

- **Trascrizione delle tracce intere** (da asset audio, `eleven_scribe_v1`):
  A: 510/510 parole, 0 buchi
  B: 637/638 parole, 0 buchi
- Resa diversa, non buco: **s45** «ha data certa» trascritto «a data certa».
- **Confini**: **s05/s06**: confine spostato di −0,6 s.
  `audio/correzioni.json` = {"A": {"3": {"secondi": -0.6}}}.
- **Temi cambiati rispetto al copione**: nessuno.
- **Slide**: PNG guardati in provini da nove, traboccamento verificato con i caratteri veri.
  - **s18**: la `scadenza` rifatta con due tappe (subito, 30 giorni).
  - **s41**: `confronto` riscritto (le due colonne dicevano mezza frase ciascuna).
- `controlli.py`: 8/8.

## Montaggio

- Lotto HeyGen `d1b5052cb12944a795ff065c93315b1c`: 98 file accoppiati per posizione, 0 discordi sul `content-type`.
- Payload: 50 scene; 48 scene video, tutte con `audio_asset_id` e `playback {freeze, mute}`.
- Video HeyGen: `a75c3c4bd3c5d0deeb0e3cf0a1b4f16d` (https://app.heygen.com/videos/a75c3c4bd3c5d0deeb0e3cf0a1b4f16d).
- Il file consegnato non si scarica da questa sessione (proxy: 403 su files2.heygen.ai).

## Costo

```
voce, due tracce, 7.340 caratteri, eleven_v3        ≈ $1,23  (misurato)
trascrizione delle due tracce intere               ≈ $0,47  (misurato)
                                                    -------
                                                    ≈ $1,70
```

## Da verificare — quello che non ho potuto giudicare io

- **Nessuno ha ancora ascoltato il video.** La verifica è per trascrizione, durate e fotogrammi.
- Da confrontare con le fonti, in particolare:
  - **Formazione**: 4 + 12 ore e aggiornamento di 6 ore ogni 5 anni sono dell'Accordo 2011; l'Accordo del 17/4/2025 le ha riordinate. Da verificare.
  - DPI (artt. 74-78) e tre categorie (Reg. UE 2016/425): descritti in sintesi, testo non disponibile.
  - Gli esempi in azienda sanitaria sono inventati a scopo didattico.
- **La fonte prevista dal piano del corso per il modulo 9, `Tutela-della-Salute-e-Sicurezza-sul-Lavoro.pdf`, non è disponibile.** I contenuti vengono dal **testo del D.Lgs. 81/2008 nell'edizione di giugno 2016** del Ministero del Lavoro su Drive (testo coordinato non ufficiale, con D.Lgs. 106/2009 e D.Lgs. 39/2016), letto per esteso negli artt. 1-3, 15-20, 25, 28-29, 31-33, 35-37 e solo nell'indice per gli altri; da una dispensa su Drive sulla sicurezza in ambito sanitario e dalla conoscenza generale della materia. Le modifiche successive al 2016 non sono state lette sul testo vigente: il proxy blocca Gazzetta Ufficiale e normattiva. Sono **da verificare**.
- La **dispensa contiene errori** che il corso non riprende: esclusione di forze armate, polizia e vigili del fuoco (art. 3 c. 2 applica il decreto con adattamenti); direttore generale datore di lavoro «in quanto titolare del rapporto» (art. 2 lett. b: dirigente con poteri di gestione individuato dall'organo di vertice); dirigente solo «in delega», con gli obblighi degli «artt. 18 e 19» e le «stesse sanzioni del datore»; ammenda «fino a 7.400 euro dopo il +15,9%» (il calcolo dà circa 8.130); sospensione dell'attività con «oltre il 50% di irregolari» (20% nel 2016, 10% dopo il D.L. 146/2021); servizio di prevenzione «prevalentemente interno» (obbligatoriamente interno, con RSPP interno, nelle strutture di ricovero e cura oltre 50 lavoratori: art. 31 c. 6 lett. g e c. 7); «reparti clinici a rischio medio, 8 ore» (la sanità, ATECO 86, è a rischio alto: 12 ore); aggiornamento dei dirigenti «sessennale» (è quinquennale); visite per i videoterminali «biennali sotto i 50 anni, annuali sopra» (art. 176: quinquennali, biennali oltre i 50 anni o con limitazioni).
- **Da verificare in generale**: L. 215/2021 e D.L. 146/2021 (nuovo art. 19 sul preposto, art. 18 lett. b-bis, art. 37 c. 7-ter, soglie della sospensione); Accordo Stato-Regioni del 17/4/2025 sulla formazione; rivalutazione delle sanzioni (+15,9% nel 2023); D.L. 19/2024 (patente a crediti); D.L. 48/2023 e D.L. 159/2025; D.Lgs. 159/2016 (campi elettromagnetici); D.Lgs. 101/2020 (radiazioni ionizzanti, al posto del D.Lgs. 230/1995); L. 113/2020 (aggressioni); art. 37 cc. 10-12 (RLS: 32 ore iniziali, aggiornamento annuale di 4 o 8 ore); artt. 41, 43, 47, 50, 55-59, 74-78 e Titoli X e X-bis, letti solo nell'indice; «306 articoli, 13 titoli»; accordi tra università e aziende per gli specializzandi.
- Documenti personali presenti su Drive (informative con nomi, lettere d'incarico, disciplinari, lettere di richiesta di accesso, DSU e altre lettere personali) e le **lettere CISL FP** non sono stati usati; nessuna persona è nominata, né gli autori o i curatori della dispensa né l'ospedale citato.
- Il marchio è il logo CISL FP (non «Padova Rovigo»): vale quanto detto nella 1.1.
