# prove

Produzione delle video-lezioni del corso **Progressione verticale · Comparto Sanità**
(CISL FP Padova Rovigo), col metodo di `docs/MASTER.md`: slide animate + voce, montate su HeyGen.

## Struttura

- `docs/` — MASTER (metodo e codice), STANDARD del corso, STRUTTURA dei 13 moduli
- `progetti/mX-lX.Y-nome/` — una cartella per lezione; il `REGISTRO.md` di ciascuna dice
  com'è andata e cosa resta da verificare
- `nuova-lezione.sh` — impianta la lezione successiva copiando dall'ultima fatta

Lezioni fatte. Modulo 1 completo (voce Luca Ward `eleven_v3`; durate del video HeyGen):

| lezione | titolo | durata |
|---|---|---|
| 1.1 | Dalla 833 alla crisi | 8:02 |
| 1.2 | L'aziendalizzazione | 7:37 |
| 1.3 | Indirizzo, gestione e quasi-mercato | 7:12 |
| 1.4 | Accreditamento e libertà di scelta | 7:12 |
| 1.5 | I livelli essenziali di assistenza | 7:25 |
| 1.6 | Governance e finanziamento | 7:10 |

Modulo 2 completo, Il sistema sanitario regionale del Veneto (stessa voce e stesso metodo):

| lezione | titolo | durata |
|---|---|---|
| 2.1 | I quattro nodi della riforma | 7:45 |
| 2.2 | I sei principi ispiratori | 8:00 |
| 2.3 | Azienda Zero e la governance regionale | 7:40 |
| 2.4 | La nuova geografia sanitaria | 8:00 |
| 2.5 | La rete ospedaliera hub and spoke | 7:33 |
| 2.6 | Il distretto potenziato | 7:22 |
| 2.7 | Ospedali di comunità, cronicità, fragilità | 7:26 |

Modulo 3 completo, Legislazione socio-sanitaria del Veneto (stessa voce e stesso metodo,
più grafica originale):

| lezione | titolo | durata |
|---|---|---|
| 3.1 | Radici del modello veneto | 7:56 |
| 3.2 | L.R. 56/1994: il riordino | 7:20 |
| 3.3 | Organi, distretti e dipartimenti | 7:42 |
| 3.4 | L.R. 55/1994: programmare e rendere conto | 7:10 |
| 3.5 | Budget, controlli e i tre principi guida | 7:11 |

Dal modulo 3 ogni lezione ha `slide/illustra.mjs`: illustrazioni SVG originali animate
(territorio, municipio, ospedale, casa, radici, bivio, documento, bilancio, calendario,
stretta di mano, lente, livelli, incastro, università, tavolo, comunità) e i tipi di slide
`illustrata`, `flusso`, `ciclo`, `rete`, `contatore`, `sigla`. Le clip durano quanto il blocco
audio, così l'animazione continua per tutta la scena. `nuova-lezione.sh` copia anche
`illustra.mjs`; per la lezione successiva si parte dalla 3.5. Nel modulo 3 i testi delle
L.R. 55 e 56 del 1994 non sono stati consultati (vedi i REGISTRO, «Da verificare»).

Modulo 4 completo, Organizzazione aziendale sanitaria e AOUPD (stessa voce e stesso metodo):

| lezione | titolo | durata |
|---|---|---|
| 4.1 | L'azienda sanitaria e le sue autonomie | 7:43 |
| 4.2 | L'AOUPD e le tre missioni | 7:34 |
| 4.3 | Atto aziendale e direzione strategica | 7:05 |
| 4.4 | Dipartimenti e unità operative | 7:17 |
| 4.5 | Governo clinico e continuità assistenziale | 7:29 |

Nel modulo 4 `illustra.mjs` passa a 22 illustrazioni: si aggiungono microscopio, organigramma,
azienda, missioni, percorso e scudo; per la lezione successiva si parte dalla 4.5. La fonte
prevista dal piano, `Organizzazione-Aziendale-Sanitaria-e-AOUPD.pdf`, non era disponibile: il
modulo è costruito sulla dispensa CISL FP (Galiazzo), sull'atto aziendale dell'ULSS 5 Polesana,
sul PSSR 2019-2023 e su sintesi di ricerca per l'AOUPD (vedi i REGISTRO, «Da verificare»).

Modulo 5 completo, Procedimento amministrativo e accesso (stessa voce e stesso metodo):

| lezione | titolo | durata |
|---|---|---|
| 5.1 | Prima e dopo la legge 241 | 7:44 |
| 5.2 | I principi cardine | 7:06 |
| 5.3 | Il responsabile del procedimento | 7:04 |
| 5.4 | Avvio, partecipazione e motivazione | 7:05 |
| 5.5 | Termini, silenzio e semplificazione | 7:24 |
| 5.6 | Il diritto di accesso documentale | 7:08 |

Nel modulo 5 `illustra.mjs` passa a 27 illustrazioni: si aggiungono clessidra, sportello,
archivio, cassaforte e busta; per la lezione successiva si parte dalla 5.6. La fonte prevista
dal piano, `Procedimento-Amministrativo.pdf`, non era disponibile: il modulo è costruito sul
testo della L. 241/1990 aggiornato al 2019 e sulla dispensa CISL FP; le modifiche 2020-2021
sono verificate solo con estratti di ricerca, e gli errori della dispensa non sono ripresi
(vedi i REGISTRO, «Da verificare»).

Modulo 6 completo, Trasparenza nella pubblica amministrazione (stessa voce e stesso metodo):

| lezione | titolo | durata |
|---|---|---|
| 6.1 | Dall'accesso difensivo all'accessibilità totale | 7:25 |
| 6.2 | «Amministrazione Trasparente» | 7:36 |
| 6.3 | L'accesso civico semplice | 7:11 |
| 6.4 | L'accesso civico generalizzato (FOIA) | 7:24 |
| 6.5 | Chi vigila e che cosa si rischia | 7:31 |

Nel modulo 6 `illustra.mjs` passa a 31 illustrazioni: si aggiungono vetro, sito, porta e faro;
per la lezione successiva si parte dalla 6.5. La fonte prevista dal piano,
`Trasparenza-nella-Pubblica-Amministrazione.pdf`, non era disponibile: il modulo è costruito sul
testo del D.Lgs. 33/2013 aggiornato al 2017 (dopo il D.Lgs. 97/2016) e sulle dispense su Drive,
di cui non riprende gli errori (per esempio la sanzione dell'art. 47 presentata come generale).
PIAO, Corte cost. 20/2019 e le altre novità successive al 2017 sono da verificare sul testo
vigente (vedi i REGISTRO, «Da verificare»).

Modulo 7 completo, Trattamento dei dati personali (stessa voce e stesso metodo):

| lezione | titolo | durata |
|---|---|---|
| 7.1 | Dalla 675/1996 al GDPR | 7:50 |
| 7.2 | I principi del trattamento | 7:32 |
| 7.3 | Le basi giuridiche | 7:28 |
| 7.4 | Categorie particolari e dato sanitario | 7:16 |
| 7.5 | I diritti dell'interessato | 7:27 |
| 7.6 | Ruoli, adempimenti e sanzioni | 7:28 |

Nel modulo 7 `illustra.mjs` passa a 36 illustrazioni: si aggiungono globo, imbuto, cartellaclinica,
impronta e bilancia (da non confondere con «bilancio», il libro dei conti); per la lezione successiva
si parte dalla 7.6. La fonte prevista dal piano, `Privacy-e-Protezione-dei-Dati-Personali.pdf`, non era
disponibile: il modulo è costruito sul testo del Regolamento (UE) 2016/679 (edizione del Garante, 2017)
e sulle dispense su Drive, di cui non riprende gli errori (per esempio i «30 giorni» per rispondere, il
consenso per alimentare il FSE, il DPO che notifica le violazioni). Il testo vigente del Codice
(D.Lgs. 196/2003 dopo il D.Lgs. 101/2018) non era raggiungibile: gli articoli del Codice citati sono da
verificare (vedi i REGISTRO, «Da verificare»).

Modulo 8 completo, Normativa sul pubblico impiego (stessa voce e stesso metodo):

| lezione | titolo | durata |
|---|---|---|
| 8.1 | Dalla specialità alla privatizzazione | 7:57 |
| 8.2 | I cinque principi | 7:33 |
| 8.3 | L'accesso | 7:24 |
| 8.4 | La dirigenza | 7:24 |
| 8.5 | Doveri e responsabilità disciplinare | 7:36 |
| 8.6 | Performance, mobilità, lavoro agile | 7:29 |

Nel modulo 8 `illustra.mjs` passa a 41 illustrazioni: si aggiungono timone, podio, firma, cruscotto
e lavoroagile; per la lezione successiva si parte dalla 8.6. La fonte prevista dal piano,
`Pubblico-Impiego.pdf`, non era disponibile: il modulo è costruito sul testo del D.Lgs. 165/2001
aggiornato al 24 gennaio 2020, sul D.P.R. 62/2013 (testo originario), su estratti del D.Lgs. 150/2009 e
su una dispensa del 2025 su Drive, di cui non riprende gli errori (per esempio la contestazione
disciplinare «entro 20 giorni», l'abuso d'ufficio ancora citato, gli incarichi dirigenziali «da 2 a 7
anni», l'OIV che «valida il piano»). Le modifiche successive al 2020 (D.L. 80/2021, D.P.R. 82/2023,
D.P.R. 81/2023, L. 114/2024) non erano raggiungibili sul testo vigente e sono da verificare (vedi i
REGISTRO, «Da verificare»).

Modulo 9 completo, Salute e sicurezza sul lavoro (stessa voce e stesso metodo):

| lezione | titolo | durata |
|---|---|---|
| 9.1 | Dalla frammentazione al Testo Unico | 7:54 |
| 9.2 | I sei principi | 7:38 |
| 9.3 | Campo di applicazione | 7:30 |
| 9.4 | Le figure della sicurezza | 7:20 |
| 9.5 | DVR, formazione, DPI | 7:19 |
| 9.6 | Rischi specifici in sanità | 7:35 |

Nel modulo 9 `illustra.mjs` passa a 46 illustrazioni: si aggiungono casco, cartello, estintore, dpi
e siringa; per la lezione successiva si parte dalla 9.6. La fonte prevista dal piano,
`Tutela-della-Salute-e-Sicurezza-sul-Lavoro.pdf`, non era disponibile: il modulo è costruito sul testo
del D.Lgs. 81/2008 nell'edizione di giugno 2016 del Ministero del Lavoro (letto per esteso solo in parte)
e su una dispensa su Drive, di cui non riprende gli errori (per esempio forze armate e polizia «escluse»,
il direttore generale datore di lavoro «in quanto titolare del rapporto», la sanità «a rischio medio» con
8 ore di formazione specifica, l'aggiornamento dei dirigenti «sessennale»). Le modifiche successive al
2016 (L. 215/2021, D.L. 146/2021, Accordo Stato-Regioni 2025, D.L. 19/2024) e gli articoli letti solo
nell'indice sono da verificare (vedi i REGISTRO, «Da verificare»).

Modulo 10 completo, Appalti pubblici (D.Lgs. 36/2023; stessa voce e stesso metodo):

| lezione | titolo | durata |
|---|---|---|
| 10.1 | Il cambio di paradigma del 2023 | 7:49 |
| 10.2 | Appalto, concessione, ambito | 7:31 |
| 10.3 | I soggetti | 7:27 |
| 10.4 | Soglie e procedure | 7:26 |
| 10.5 | Aggiudicazione e anomalia | 7:20 |
| 10.6 | Requisiti e forme di partecipazione | 7:15 |
| 10.7 | Esecuzione del contratto | 7:12 |

Nel modulo 10 `illustra.mjs` passa a 51 illustrazioni: si aggiungono gru, carrello, martelletto, furgone
e catena; per la lezione successiva si parte dalla 10.7. La fonte prevista dal piano, `Appalti-Pubblici.pdf`,
non era disponibile: il modulo è costruito su due dispense su Drive sul D.Lgs. 36/2023, di cui non riprende
gli errori (per esempio il «responsabile unico del procedimento», le esclusioni «ex art. 80», lo stand still
di «32 giorni», le soglie 2024-2025 presentate come vigenti). Il testo vigente del codice, il correttivo del
2024 e le soglie 2026-2027 non erano raggiungibili e sono da verificare (vedi i REGISTRO, «Da verificare»).
Nella 10.2 la prima traccia B aveva perso tre parole («un frazionamento vietato»): rigenerata, e il video
rifatto (il primo, `76e433298af9728e906e5e9672b77605`, è sostituito).

Modulo 11 completo, Contabilità delle PA (D.Lgs. 118/2011; stessa voce e stesso metodo):

| lezione | titolo | durata |
|---|---|---|
| 11.1 | Perché l'armonizzazione | 7:38 |
| 11.2 | I principi contabili | 7:20 |
| 11.3 | Il sistema di bilancio | 7:35 |
| 11.4 | Il Titolo II: le aziende sanitarie | 7:42 |
| 11.5 | GSA, consolidato e AOU | 7:31 |

Nel modulo 11 `illustra.mjs` passa a 56 illustrazioni: si aggiungono calcolatrice, salvadanaio, spartito,
matrioska e abaco; per la lezione successiva si parte dalla 11.5. La fonte prevista dal piano, il testo del
D.Lgs. 118/2011, non era su Drive: il modulo è costruito su una dispensa sulla contabilità economico
patrimoniale, su un test di organizzazione e contabilità e sulla L.R. Veneto 19/2016 (Azienda Zero), di cui
non riprende gli errori (il principio dell'«unicità» invece che dell'unità, 17 principi generali invece di 18,
le entrate «in 6 titoli», il bilancio di previsione degli enti territoriali «annuale»). Il testo vigente del
decreto e i termini precisi sono da verificare (vedi i REGISTRO, «Da verificare»). Nella 11.3 tre clip erano
rimaste ferme nella coda di HeyGen e sono state ricaricate prima del montaggio.

Modulo 12 completo, La prova (stessa voce e stesso metodo; ultimo modulo del corso):

| lezione | titolo | durata |
|---|---|---|
| 12.1 | Le trappole ricorrenti | 8:25 |
| 12.2 | Le sessanta date e numeri | 8:45 |
| 12.3 | Simulazione commentata | 7:45 |
| 12.4 | Le ultime quarantotto ore | {D124} |

Nel modulo 12 `illustra.mjs` passa a 61 illustrazioni: si aggiungono amo, schede, schedina, cronometro e
traguardo; la 12.3 introduce in `slide/layout.mjs` la scena `quiz` (quattro opzioni, le sbagliate si spengono
quando la voce dice la risposta). Il piano prevedeva di scrivere il modulo sul bando AOUPD, che non era su Drive:
il modulo è costruito sui contenuti già verificati del corso (le «tre cose» e i distrattori delle lezioni
1.1-11.5), e modalità, durata e punteggio della prova non sono mai dati per certi: i testi rimandano sempre al
bando. Tutto ciò che il modulo ripete eredita i «da verificare» dei REGISTRO dei moduli 1-11.

## Come si lavora

- Il branch principale è `main`.
- Ogni modifica in un branch dedicato, poi pull request su `main`.
- `pip install imageio-ffmpeg Pillow`; playwright e Chromium sono già nell'ambiente.
