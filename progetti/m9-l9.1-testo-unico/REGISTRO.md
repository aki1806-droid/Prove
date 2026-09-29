# REGISTRO — Lezione 9.1 · Dalla frammentazione al Testo Unico

Corso **Progressione verticale · Comparto Sanità**, Modulo 9, Salute e sicurezza sul lavoro.
Stesso metodo, voce, marchio e palette dei moduli 1-8: voce di Luca Ward (`tVdVcJPudubxmTmAw4tE`,
`eleven_v3`), senza avatar, ≥ 7:00. Le slide usano la libreria `slide/illustra.mjs`,
che nel modulo 9 passa da 41 a 46 illustrazioni SVG originali animate: si aggiungono casco
(l'elmetto con la croce), cartello (il triangolo di pericolo), estintore (con il cartello di uscita),
dpi (mascherina, guanto e occhiali) e siringa (con il contenitore per i taglienti).
Ogni clip dura quanto il suo blocco audio (fino a 30 s), così l'animazione d'ambiente continua per tutta la scena.

**Fonti**: Art. 2087 c.c.; Cost. artt. 32, 35, 41; D.P.R. 547/1955, 164/1956, 303/1956; L. 300/1970 art. 9; L. 833/1978; direttiva 89/391/CEE; D.Lgs. 626/1994 e 242/1996; L. 123/2007; D.Lgs. 81/2008 artt. 1-3; D.Lgs. 106/2009; dispensa su Drive (con correzioni).

## Aritmetica

| | valore |
|---|---|
| blocchi / scene | 48 / 50 |
| caratteri | 7.456 con i tag |
| stacco | dopo **s25** |
| grezzo | A 302,56 s · B 286,80 s = 589,4 s |
| parlato lavorato | **462,4 s** (22 pose) |
| CPS misurato | 16,1 car/s sul lavorato |
| montato locale | **7:55,64** |
| montato HeyGen | **7:54,46** |

## Verifiche

- **Trascrizione delle tracce intere** (da asset audio, `eleven_scribe_v1`):
  A: 601/601 parole, 0 buchi
  B: 599/599 parole, 0 buchi
- **Confini**: **s22/s23**: confine spostato di −1,8 s.
  `audio/correzioni.json` = {"A": {"20": {"secondi": -1.8}}}.
- **Temi cambiati rispetto al copione**: nessuno.
- **Slide**: PNG guardati in provini da nove, traboccamento verificato con i caratteri veri.
  - Nuove illustrazioni rifinite sui provini: `casco`, `cartello`, `estintore`, `dpi`, `siringa`.
  - **s14**: a capo del titolo rifatti.
- `controlli.py`: 8/8.

## Montaggio

- Lotto HeyGen `899aae3a762b4175a54a493ed045cc1d`: 98 file accoppiati per posizione, 0 discordi sul `content-type`.
- Payload: 50 scene; 48 scene video, tutte con `audio_asset_id` e `playback {freeze, mute}`.
- Video HeyGen: `683bbefd23725b8b9efdd36ea3caf128` (https://app.heygen.com/videos/683bbefd23725b8b9efdd36ea3caf128).
- Il file consegnato non si scarica da questa sessione (proxy: 403 su files2.heygen.ai).

## Costo

```
voce, due tracce, 7.456 caratteri, eleven_v3        ≈ $1,25  (misurato)
trascrizione delle due tracce intere               ≈ $0,53  (misurato)
                                                    -------
                                                    ≈ $1,78
```

## Da verificare — quello che non ho potuto giudicare io

- **Nessuno ha ancora ascoltato il video.** La verifica è per trascrizione, durate e fotogrammi.
- Da confrontare con le fonti, in particolare:
  - «Oltre trecento articoli, tredici titoli» (s29): conteggio sull'edizione 2016, da confermare sul testo vigente.
  - Legge del 2021 sul preposto e patente a crediti del 2024: citate in sintesi, non lette sul testo.
  - Gli esempi in azienda sanitaria sono inventati a scopo didattico.
- **La fonte prevista dal piano del corso per il modulo 9, `Tutela-della-Salute-e-Sicurezza-sul-Lavoro.pdf`, non è disponibile.** I contenuti vengono dal **testo del D.Lgs. 81/2008 nell'edizione di giugno 2016** del Ministero del Lavoro su Drive (testo coordinato non ufficiale, con D.Lgs. 106/2009 e D.Lgs. 39/2016), letto per esteso negli artt. 1-3, 15-20, 25, 28-29, 31-33, 35-37 e solo nell'indice per gli altri; da una dispensa su Drive sulla sicurezza in ambito sanitario e dalla conoscenza generale della materia. Le modifiche successive al 2016 non sono state lette sul testo vigente: il proxy blocca Gazzetta Ufficiale e normattiva. Sono **da verificare**.
- La **dispensa contiene errori** che il corso non riprende: esclusione di forze armate, polizia e vigili del fuoco (art. 3 c. 2 applica il decreto con adattamenti); direttore generale datore di lavoro «in quanto titolare del rapporto» (art. 2 lett. b: dirigente con poteri di gestione individuato dall'organo di vertice); dirigente solo «in delega», con gli obblighi degli «artt. 18 e 19» e le «stesse sanzioni del datore»; ammenda «fino a 7.400 euro dopo il +15,9%» (il calcolo dà circa 8.130); sospensione dell'attività con «oltre il 50% di irregolari» (20% nel 2016, 10% dopo il D.L. 146/2021); servizio di prevenzione «prevalentemente interno» (obbligatoriamente interno, con RSPP interno, nelle strutture di ricovero e cura oltre 50 lavoratori: art. 31 c. 6 lett. g e c. 7); «reparti clinici a rischio medio, 8 ore» (la sanità, ATECO 86, è a rischio alto: 12 ore); aggiornamento dei dirigenti «sessennale» (è quinquennale); visite per i videoterminali «biennali sotto i 50 anni, annuali sopra» (art. 176: quinquennali, biennali oltre i 50 anni o con limitazioni).
- **Da verificare in generale**: L. 215/2021 e D.L. 146/2021 (nuovo art. 19 sul preposto, art. 18 lett. b-bis, art. 37 c. 7-ter, soglie della sospensione); Accordo Stato-Regioni del 17/4/2025 sulla formazione; rivalutazione delle sanzioni (+15,9% nel 2023); D.L. 19/2024 (patente a crediti); D.L. 48/2023 e D.L. 159/2025; D.Lgs. 159/2016 (campi elettromagnetici); D.Lgs. 101/2020 (radiazioni ionizzanti, al posto del D.Lgs. 230/1995); L. 113/2020 (aggressioni); art. 37 cc. 10-12 (RLS: 32 ore iniziali, aggiornamento annuale di 4 o 8 ore); artt. 41, 43, 47, 50, 55-59, 74-78 e Titoli X e X-bis, letti solo nell'indice; «306 articoli, 13 titoli»; accordi tra università e aziende per gli specializzandi.
- Documenti personali presenti su Drive (informative con nomi, lettere d'incarico, disciplinari, lettere di richiesta di accesso, DSU e altre lettere personali) e le **lettere CISL FP** non sono stati usati; nessuna persona è nominata, né gli autori o i curatori della dispensa né l'ospedale citato.
- Il marchio è il logo CISL FP (non «Padova Rovigo»): vale quanto detto nella 1.1.
