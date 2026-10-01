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

Le micro-lezioni pubblicate: i primi due moduli con la grafica di seconda
generazione, dal 3 in poi con la terza (`slide/clinica.mjs`, settembre
2026). Gli indici e i registri stanno in `progetti/`.

Le lezioni 5.6–5.8 e i moduli 6, 7 e 8 (ventiquattro lezioni, cartelle
`m6-*`, `m7-*`, `m8-*`) sono pronti fino alle slide e ai registri, in
attesa della voce: i crediti ElevenLabs si sono esauriti dopo la voce
della 5.6, e per il MASTER le voci si fanno in un giro solo al rinnovo. Le
schede di modulo (`progetti/MODULO-N.md`) dicono lo stato lezione per
lezione.

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
