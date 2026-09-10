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

| | lezione | durata | stato |
|---|---|---|---|
| `m1-l1.1-mansionario` | Modulo 1 · 1.1 Dal mansionario alle competenze | 8:56 | montato |

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
