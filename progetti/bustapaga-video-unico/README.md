# Busta paga — video unico

Il copione arriva dall'utente in `origine/SCRIPT_VIDEO_UNICO.md` e non si
riscrive: `copione/costruisci.py` lo **estrae** in `blocchi.json` e nei chunk
per la voce. I numeri della lavorazione stanno in `profilo.py`, in un posto solo.

```bash
python3 copione/costruisci.py     # blocchi.json, tracce.json, audio/chunk/*.txt
```

Stato e misure: **[`REGISTRO.md`](REGISTRO.md)**. In breve: 218 scene, 56.269
caratteri, 17 tracce; la traccia 1 e' generata e misurata, le altre 16 no —
il registro dice perche'.
