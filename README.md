# prove

Metodo di produzione video con **clip generate** e voce fuori campo — senza
slide e senza avatar. Ogni clip è l'inquadratura di un blocco di parlato; sopra
ci stanno solo i sottotitoli e il marchio.

## Struttura

| | |
|---|---|
| `MASTER-VIDEOCLIP.md` | il documento portatile: metodo + codice. È il file da incollare in una chat nuova. **Generato**, non si modifica a mano. |
| `master/prosa.md` | la prosa del master, con i segnaposto `@@FILE ...@@` |
| `modello/` | i file veri del progetto, quelli che girano |
| `assembla.py` | rimette insieme il master dalla prosa e dai file |

Il master contiene il codice per essere portatile, ma la copia che conta è
quella in `modello/`: `python3 assembla.py` la riporta dentro il documento,
`python3 assembla.py --check` verifica che le due non siano divergenti.

## Le cinque domande

Prima di ogni video, sempre, senza indovinarle: **tema**, **palette**, **voce**,
**durata**, **formato**. Vanno in `modello/profilo.json`, ed è il solo posto
dove stanno.

## Un video nuovo

```
pip install imageio-ffmpeg        # è l'unica dipendenza
./nuovo-video.sh nome-del-video
```

Poi si seguono i passi che il comando stampa, o il §3 del master.

## Come si lavora

- Il branch principale è `main`.
- Ogni modifica in un branch dedicato, poi pull request su `main`.
