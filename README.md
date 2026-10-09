# prove

Produzione video secondo il metodo di [`MASTER.md`](MASTER.md), che sta in
repo con le correzioni che ogni lezione gli fa pagare.

## Struttura

```
progetti/<modulo>-<lezione>/
  origine/     lo script di partenza, com'è arrivato
  copione/     costruisci.py → blocchi.json + copione.md    (Passo 1)
  audio/       tagli.py, verifica.py, blocchi/*.mp3         (Passi 2-3)
  slide/       layout.mjs → cards.mjs (PNG) · clips.mjs (mp4)  (Passo 4)
  scene/       clip + audio, una per blocco                 (Passo 6)
  controlli.py i controlli del MASTER §5
  REGISTRO.md  cosa è stato fatto, e cosa resta da giudicare (Passo 8)
```

## Progetti

| | lezione | durata | resa (grafica v2) |
|---|---|---|---|
| `m1-l1.1-mansionario` | Modulo 1 · 1.1 Dal mansionario alle competenze | 8:55.3 | `d9733a6863da821ed13907623604fbae` |
| `m1-l1.2-profilo` | Modulo 1 · 1.2 Il profilo professionale | 8:54.5 | `9ab0159b5e319daa5adf6cfec37a08df` |
| `m1-l1.3-formazione` | Modulo 1 · 1.3 Formazione, Ordine, ECM e carriera | 8:56.0 | `66df9bb6d6b163b3652a87738cfec374` |
| `m1-l1.4-deontologia` | Modulo 1 · 1.4 Il Codice deontologico | 8:59.4 | `7aa042f904cdb94d3a485f30a7ac97c7` |
| `m1-l1.5-responsabilita` | Modulo 1 · 1.5 La responsabilita' professionale | 8:44.0 | `bb23459a1ea6ba5e42441684b7154a30` |
| `m1-l1.6-consenso` | Modulo 1 · 1.6 Consenso informato, DAT e autodeterminazione | 8:23.7 | `42cb484cab2390d77faa71f6af231bf8` |
| `m1-l1.7-segreto` | Modulo 1 · 1.7 Segreto, privacy e tutela della persona | 9:01.0 | `ac5a5b4a4bd723f7654986271a801c73` |
| `m1-l1.8-riepilogo` | Modulo 1 · 1.8 Riepilogo del Modulo 1 e autovalutazione | 9:10.0 | `598b34eef3314967acc9f2c14472ce62` |
| `m2-l2.1-processo` | Modulo 2 · 2.1 Il processo di assistenza infermieristica | 8:48.4 | `e8ccf810ae2913d43cdc84c52336dd3c` |
| `m2-l2.2-modelli` | Modulo 2 · 2.2 Modelli teorici e tassonomie infermieristiche | 8:56.8 | `3c2bea89378a792e3d96a3f995732dae` |
| `m2-l2.3-scale` | Modulo 2 · 2.3 L'accertamento e le scale di valutazione | 8:59.6 | `c4a3a9f425274afb4f406719bfa2c827` |
| `m2-l2.4-documentazione` | Modulo 2 · 2.4 La documentazione infermieristica | 9:15.0 | `26c90ec748c5009d31a949f67be2cd5a` |
| `m2-l2.5-ebp` | Modulo 2 · 2.5 EBP, linee guida, PDTA e procedure | 8:43.0 | `6168f18a0839e6bb62899f62fa1fa569` |
| `m2-l2.6-rischio` | Modulo 2 · 2.6 Rischio clinico e sicurezza del paziente | 9:27.6 | `75b091efb11899871b4945411c252556` |
| `m2-l2.7-comunicazione` | Modulo 2 · 2.7 Comunicazione clinica e continuità assistenziale | 9:19.7 | `b132df8b591792f918254d42aa570a6f` |
| `m2-l2.8-riepilogo` | Modulo 2 · 2.8 Riepilogo del Modulo 2 | 8:36.6 | `77a9473e151388c5a15c648b17d224d6` |
| `m3-l3.1-igiene` | Modulo 3 · 3.1 Igiene, cura della persona e unità del paziente | 9:31.1 | `dec4430f7f0792b0acbab83f15cbdbff` |
| `m3-l3.2-postura` | Modulo 3 · 3.2 Postura, mobilizzazione e sindrome da immobilizzazione | 9:12.5 | `e4b4f734e5e819c2a9fdfbadb385adf4` |
| `m3-l3.3-nutrizione` | Modulo 3 · 3.3 Nutrizione e valutazione dello stato nutrizionale | 9:13.9 | `216a2b5ee98eed24240ce6dd5faab039` |
| `m3-l3.4-enterale` | Modulo 3 · 3.4 Nutrizione enterale: SNG, PEG e PEJ | 9:06.7 | `ea2c2e3ec62bf852d63e6b2ea4f9bef0` |
| `m3-l3.5-idratazione` | Modulo 3 · 3.5 Idratazione, bilancio idrico ed equilibrio elettrolitico | 9:03.8 | `1404ecab794435636b7bc67f4b4f9b8c` |
| `m3-l3.6-urinaria` | Modulo 3 · 3.6 Eliminazione urinaria e cateterismo vescicale | 9:10.1 | `8b180936da81cf50525bf356ea0df4cb` |
| `m3-l3.7-intestinale` | Modulo 3 · 3.7 Eliminazione intestinale, dolore e sonno | 9:08.6 | `d09962bf851b8ea74931786cba69b23b` |
| `m3-l3.8-riepilogo` | Modulo 3 · 3.8 Riepilogo del Modulo 3 e autovalutazione | 9:09.5 | `76d4ae9f8f169396b1cdb1af1e87dcff` |
| `m4-l4.1-catena` | Modulo 4 · 4.1 Le ICA: epidemiologia e catena delle infezioni | 9:01.7 | `a35300c5f3e66ecc0a895e332bd70e3e` |
| `m4-l4.2-mani` | Modulo 4 · 4.2 Igiene delle mani e precauzioni standard | 8:47.3 | `56cbc037a5362ca3652459fb787e9eb5` |
| `m4-l4.3-isolamento` | Modulo 4 · 4.3 Precauzioni aggiuntive e isolamento | 8:48.0 | `6e62854a021ec5bce27e4fbe2b664c16` |
| `m4-l4.4-dpi` | Modulo 4 · 4.4 DPI: scelta, vestizione e svestizione | 9:01.0 | `0947e8d07532a5b4a3fd27bdc8e35195` |
| `m4-l4.5-sterilizzazione` | Modulo 4 · 4.5 Decontaminazione, disinfezione e sterilizzazione | 8:56.5 | `3e03259979d0e2f276cbdeaf1ac8d70c` |
| `m4-l4.6-resistenza` | Modulo 4 · 4.6 Antibiotico-resistenza e stewardship | 8:50.8 | `52ecbceb599dde5bbcac5e0bd10d895b` |
| `m4-l4.7-rifiuti` | Modulo 4 · 4.7 Rischio biologico e gestione dei rifiuti | 8:41.7 | `985f3cc648f6125ad1f8f7a805acb6c1` |
| `m4-l4.8-riepilogo` | Modulo 4 · 4.8 Riepilogo del Modulo 4 e autovalutazione | 8:40.1 | `129704b8932ee7cb4672dd2aba0d00eb` |
| `m5-l5.1-principi` | Modulo 5 · 5.1 Principi di farmacologia per l'infermiere | 8:56.4 | `018849a44c2df09bfd81b0ba739676b9` |
| `m5-l5.2-vie` | Modulo 5 · 5.2 Vie di somministrazione e tecniche | 9:03.1 | `d13d3dbee433d679793e5750a63ccddf` |
| `m5-l5.3-calcoli` | Modulo 5 · 5.3 Il calcolo delle dosi e delle velocità di infusione | 8:55.1 | `66548d96aa8517e4bec4f9e8625dda93` |
| `m5-l5.4-sicurezza` | Modulo 5 · 5.4 La somministrazione sicura | 9:01.6 | `54a45652bb75397a8dcde4ab22d7deb1` |
| `m5-l5.5-cardio` | Modulo 5 · 5.5 Farmaci cardiovascolari, antidiabetici e anticoagulanti | 9:09.9 | `d7a8f04a011109093aa06963b2e3c851` |
| `m5-l5.6-antibiotici` | Modulo 5 · 5.6 Antibiotici, analgesici e stupefacenti | 8:57.3 | `dab37aec0729846a0c7d4cab4aeeafd6` |
| `m5-l5.7-preparazione` | Modulo 5 · 5.7 Preparazione, stabilità e gestione dei farmaci in reparto | 8:51.3 | `3b8af158d5f642d323faa6718896cc0e` |
| `m5-l5.8-riepilogo` | Modulo 5 · 5.8 Riepilogo del Modulo 5 e venti calcoli cronometrati | 8:42.7 | `5f46bdb252f19a560f4a8912dfba9103` |
| `m6-l6.1-periferici` | Modulo 6 · 6.1 Accessi venosi periferici | 8:23.6 | `ae14883ced57d1917d449ec7c759536c` |
| `m6-l6.2-centrali` | Modulo 6 · 6.2 Accessi venosi centrali | 8:24.9 | `b7d89f3bcdce393631983c5c57b0a385` |
| `m6-l6.3-fluidoterapia` | Modulo 6 · 6.3 Fluidoterapia | 8:32.7 | `b7a9e247a2c694ed0b4299a4d0402790` |
| `m6-l6.4-emogas` | Modulo 6 · 6.4 Emogasanalisi | 8:43.4 | `840e62425c2b1a9f66f9085a60c7e3b9` |
| `m6-l6.5-parenterale` | Modulo 6 · 6.5 Nutrizione parenterale | 8:05.9 | `1583231c274bd3f524fc3cf1e01c6df6` |
| `m6-l6.6-trasfusione` | Modulo 6 · 6.6 Emocomponenti ed emotrasfusione | 8:21.6 | `e2369fe63a53badbe49665fa41a20289` |
| `m6-l6.7-preanalitica` | Modulo 6 · 6.7 Prelievi ed esami: la fase preanalitica | 8:39.8 | `54c41def1cc81dbb69f61944792a5515` |
| `m6-l6.8-riepilogo` | Modulo 6 · 6.8 Riepilogo del Modulo 6 e autovalutazione | 8:23.4 | `3147b0285563d62ee7de1e4bb5b83ba8` |
| `m7-l7.1-riparazione` | Modulo 7 · 7.1 Riparazione tessutale e valutazione della lesione | 8:14.9 | `c6629b845a60382038b7cf0a1ca80ed2` |
| `m7-l7.2-pressione` | Modulo 7 · 7.2 Lesioni da pressione | 8:25.4 | `e82517348e27587fb43e4ca5761e38bd` |
| `m7-l7.3-ulcere` | Modulo 7 · 7.3 Ulcere vascolari e piede diabetico | 8:16.7 | `bed5eeb5c526c358561e049053deeed0` |
| `m7-l7.4-chirurgiche` | Modulo 7 · 7.4 Ferite chirurgiche e infezione del sito chirurgico | 8:03.3 | `191943f9cbd1be058bda05dbae15d5d2` |
| `m7-l7.5-medicazioni` | Modulo 7 · 7.5 Medicazioni avanzate | 8:03.0 | `287406f78e06e0a1a8a6121b8c31169c` |
| `m7-l7.6-stomie` | Modulo 7 · 7.6 Stomie digestive e urinarie | 8:16.6 | `0a180b973fe009e9b36fc838472bb0d4` |
| `m7-l7.7-drenaggi` | Modulo 7 · 7.7 Drenaggi | 8:09.4 | `a179f39182fd1518e15132ca40c6e82a` |
| `m7-l7.8-riepilogo` | Modulo 7 · 7.8 Riepilogo del Modulo 7 e autovalutazione | 8:09.1 | `cbf37aa65a78ba33a073f730dbf78db9` |
| `m8-l8.1-cardiologia` | Modulo 8 · 8.1 Cardiologia | 8:07.1 | `a8b1a17fdd66c1f748077eaf9d985ca5` |
| `m8-l8.2-pneumologia` | Modulo 8 · 8.2 Pneumologia e ossigenoterapia | 8:24.6 | `23789c8afd1e75a4af429a6035a1cbbe` |
| `m8-l8.3-diabetologia` | Modulo 8 · 8.3 Diabetologia e malattie endocrine | 8:15.6 | `010ca3d02fd3b24b28f5449a6655d1a3` |
| `m8-l8.4-nefrologia` | Modulo 8 · 8.4 Nefrologia e urologia | 8:22.7 | `e4be113283c84a9f760e58afd948f0e1` |
| `m8-l8.5-gastro` | Modulo 8 · 8.5 Gastroenterologia ed epatologia | 8:09.4 | `652e822b8f82309e44d6d66aceb36812` |
| `m8-l8.6-neurologia` | Modulo 8 · 8.6 Neurologia | 8:21.8 | `e530e796af58aefe4458e46a487c06e1` |
| `m8-l8.7-oncologia` | Modulo 8 · 8.7 Oncologia ed ematologia | 8:08.2 | `bd22c1650e001c8315796d124c568b32` |
| `m8-l8.8-riepilogo` | Modulo 8 · 8.8 Riepilogo del Modulo 8 e autovalutazione | 8:11.0 | `89c49dd0e7a35086bf71dc39562ef2c0` |
| `m9-l9.1-percorso` | Modulo 9 · 9.1 Il percorso perioperatorio | 8:12.1 | `d8a4dbaa397c9b75af4d96dce567a5db` |
| `m9-l9.2-preparazione` | Modulo 9 · 9.2 La preparazione all'intervento | 8:57.2 | `32b599d0955cb30e9f8f7003a31c803c` |
| `m9-l9.3-anestesia` | Modulo 9 · 9.3 Anestesia e sorveglianza intraoperatoria | 8:30.4 | `1a807e740fcaa70f44137ff2d8d43b88` |
| `m9-l9.4-postoperatorio` | Modulo 9 · 9.4 Il post-operatorio immediato | 8:32.1 | `6fcc5d93d5ca2ba0c3af3c19e632453c` |
| `m9-l9.5-complicanze` | Modulo 9 · 9.5 Le complicanze postoperatorie | 8:17.0 | `464025a6d06b93f959d7c830e89e1148` |
| `m9-l9.6-specialistiche` | Modulo 9 · 9.6 Chirurgie specialistiche: specificità assistenziali | 8:16.0 | `fa786952ca10e92ec1c135da1f1e9620` |
| `m9-l9.7-dimissione` | Modulo 9 · 9.7 Dimissione ed educazione terapeutica | 8:17.1 | `8a0146048e92acd4ead0c6ef7f40e58b` |
| `m9-l9.8-riepilogo` | Modulo 9 · 9.8 Riepilogo del Modulo 9 e autovalutazione | 8:10.8 | `6631bfa992afb4cda2c61e76c802bf28` |
| `m10-l10.1-triage` | Modulo 10 · 10.1 Il sistema dell'emergenza e il triage | 8:08.3 | `98e334b6caa8f7a6aa72984fb729072a` |
| `m10-l10.2-abcde` | Modulo 10 · 10.2 La valutazione del paziente critico: ABCDE | 8:06.0 | `bc00f06bf5e7840004237d625ad69544` |
| `m10-l10.3-rcp` | Modulo 10 · 10.3 BLSD e ALS nell'adulto | 8:06.7 | `3529f8bcb233781a2ed942c64f7741bf` |
| `m10-l10.4-pediatria` | Modulo 10 · 10.4 Emergenze pediatriche e ostetriche | 8:06.6 | `abbe0ef8e3b87eac156e882db0cdfa03` |
| `m10-l10.5-vie-aeree` | Modulo 10 · 10.5 Gestione delle vie aeree e ventilazione | 8:04.6 | `a1999a03f4ed6e051b23ee1951bb08f0` |
| `m10-l10.6-shock` | Modulo 10 · 10.6 Shock e sepsi | 8:04.0 | `1f0416bfb36b539701e3a277f2d20fc5` |
| `m10-l10.7-trauma` | Modulo 10 · 10.7 Trauma, ustioni, intossicazioni e maxi-emergenze | 8:03.9 | `6b5f066c095f41310d74e209c845f89c` |
| `m10-l10.8-riepilogo` | Modulo 10 · 10.8 Riepilogo del Modulo 10 e autovalutazione | 8:14.5 | `f65f97b5ea615a59adcd8812c511fbaf` |
| `m11-l11.1-anziano` | Modulo 11 · 11.1 L'anziano fragile | 8:01.9 | `f7eb02ef8927ad2b0ebf871e27c49e46` |
| `m11-l11.2-demenze` | Modulo 11 · 11.2 Demenze e disturbi cognitivi | 8:07.4 | `9a0b5839602a5e94425efc55c15b7f9e` |
| `m11-l11.3-salute-mentale` | Modulo 11 · 11.3 Salute mentale e dipendenze | 8:50.8 | `59e3e02b62f28567d93c9039bd07e0bf` |
| `m11-l11.4-materno-infantile` | Modulo 11 · 11.4 Area materno-infantile | 8:21.7 | `3063029a6cbcb294aa5768bf6602f9fc` |
| `m11-l11.5-palliative` | Modulo 11 · 11.5 Cure palliative e fine vita | 8:11.2 | `0c5d4216a04c013153077b9963d5aa34` |
| `m11-l11.6-cronicita` | Modulo 11 · 11.6 Cronicità, educazione terapeutica e self-care | 8:14.4 | `f8f9ff6d5e4f7626d43bd43a26630e8d` |
| `m11-l11.7-territorio` | Modulo 11 · 11.7 Territorio e cure primarie | 8:12.0 | `a59714e446dde257b6180deb8ac36576` |
| `m11-l11.8-riepilogo` | Modulo 11 · 11.8 Riepilogo del Modulo 11 e autovalutazione | 8:11.9 | `69dea68bea6eb467103d6aa9d6871219` |
| `m12-l12.1-fonti` | Modulo 12 · 12.1 Le fonti e il diritto alla salute | 8:34.8 | `0116e17159b837b67ae644dc6de4a3e0` |
| `m12-l12.2-riforme` | Modulo 12 · 12.2 Le riforme del SSN e i LEA | 8:31.2 | `9d893062f6e8d92787dc46dbf97e0c15` |
| `m12-l12.3-organizzazione` | Modulo 12 · 12.3 L'organizzazione aziendale e ospedaliera | 8:29.6 | `88a53bcb1c3bfe06e317db336658ee7c` |
| `m12-l12.4-finanziamento` | Modulo 12 · 12.4 Finanziamento ed economia del SSN | 8:28.9 | `8f1203f161219ff519a21d4729d7239d` |
| `m12-l12.5-ccnl` | Modulo 12 · 12.5 Il rapporto di lavoro e il CCNL Comparto Sanità | 8:44.4 | `b8dd47c30f00336fe5921bcb14bd2eec` |
| `m12-l12.6-sicurezza` | Modulo 12 · 12.6 La sicurezza sul lavoro in sanità | 8:41.9 | `936f6613014762ebf26b39b69c727821` |
| `m12-l12.7-qualita` | Modulo 12 · 12.7 Qualità, accreditamento e governo clinico | 8:27.7 | `12b5529de6d554d77935ef75e22f34e5` |
| `m12-l12.8-riepilogo` | Modulo 12 · 12.8 Riepilogo del Modulo 12 e autovalutazione | 8:31.7 | `6c27008e1e243ece059d91a49577577f` |
| `m13-l13.1-assetto` | Modulo 13 · 13.1 L'assetto del Servizio Socio Sanitario Regionale veneto | 8:21.6 | `9767e35f8d190b0100d06b8ce0dc4804` |

Le micro-lezioni pubblicate: i primi due moduli con la grafica di seconda
generazione, dal 3 in poi con la terza (`slide/clinica.mjs`, settembre
2026). Gli indici e i registri stanno in `progetti/`.

I moduli 6, 7 e 8 sono pubblicati per intero (2 ottobre 2026): ventiquattro
lezioni in un giro solo di voce GianP, con le rese nella tabella qui sopra e
lo stato lezione per lezione nelle schede di modulo (`progetti/MODULO-N.md`).

Il modulo 9 è pubblicato per intero il 4 ottobre 2026; il 10 e l'11 il
6 ottobre; il 12 il 9 ottobre. I moduli 13 e 14 sono in lavorazione.

La voce del corso è GianP da ElevenLabs, tagliata in blocchi
(`monta-scene.py`). Esiste una seconda via, il parlato sintetizzato dallo
studio HeyGen scena per scena (`monta-scene-heygen.py`), provata sulla 5.7 il
1° ottobre 2026 e scartata per la voce: resta documentata nel MASTER («Due
vie per la voce») come ripiego, le clip sono le stesse.

## Una lezione nuova

```
./nuova-lezione.sh m1-l1.2-profilo
```

Copia da 1.1 il tema, il marchio, i caratteri e gli strumenti — cioè tutto
quello che non cambia fra una lezione e l'altra del corso — e stampa la
sequenza dei comandi. Restano da scrivere due soli file: `copione/costruisci.py`
e `slide/contenuti.mjs`.

## Come si lavora

- Il branch principale è `main`.
- Ogni modifica in un branch dedicato, poi pull request su `main`.
- I sorgenti pesanti e rigenerabili (grezzi della voce, PNG, fotogrammi,
  scene, montato) non stanno in repo: li rifà la pipeline.

## Cosa serve nell'ambiente

```
node 22 + playwright        rendere le slide (Chromium)
ffmpeg completo             pip install imageio-ffmpeg
                            la build di Playwright NON basta: le mancano
                            atempo, silenceremove, apad e l'encoder mp3
python 3.11
```
