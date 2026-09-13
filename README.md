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
| `m2-l2.3-scale` | Modulo 2 · 2.3 L'accertamento e le scale di valutazione | — | `c4a3a9f425274afb4f406719bfa2c827` |
| `m2-l2.4-documentazione` | Modulo 2 · 2.4 La documentazione infermieristica | 9:15.0 | `26c90ec748c5009d31a949f67be2cd5a` |
| `m2-l2.5-ebp` | Modulo 2 · 2.5 EBP, linee guida, PDTA e procedure | 8:43.0 | `6168f18a0839e6bb62899f62fa1fa569` |
| `m2-l2.6-rischio` | Modulo 2 · 2.6 Rischio clinico e sicurezza del paziente | 9:27.6 | `75b091efb11899871b4945411c252556` |
| `m2-l2.7-comunicazione` | Modulo 2 · 2.7 Comunicazione clinica e continuità assistenziale | 9:19.7 | `b132df8b591792f918254d42aa570a6f` |
| `m2-l2.8-riepilogo` | Modulo 2 · 2.8 Riepilogo del Modulo 2 | 8:36.6 | `77a9473e151388c5a15c648b17d224d6` |

Sedici micro-lezioni in due moduli, tutte con la grafica di seconda
generazione (settembre 2026). Gli indici e i registri stanno in `progetti/`.

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
