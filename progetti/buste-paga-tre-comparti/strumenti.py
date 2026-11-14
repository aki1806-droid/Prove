# -*- coding: utf-8 -*-
"""Dove sta ffmpeg. Una riga sola, perche' la risposta e' cambiata.

Fino a ottobre 2026 il contenitore aveva `imageio_ffmpeg` e nessun ffmpeg di
sistema, e tutti gli strumenti facevano `imageio_ffmpeg.get_ffmpeg_exe()`.
Il contenitore di novembre ha l'opposto: niente `imageio_ffmpeg`, un ffmpeg in
/usr/bin. Otto strumenti sono morti all'import, tutti insieme, per una cosa che
non c'entra niente col video.

Si risolve una volta qui e si importa. NON si mura /usr/bin/ffmpeg negli
strumenti: sarebbe lo stesso errore al contrario, e la prossima macchina lo
rifarebbe pagare. Si prova quello che c'e', nell'ordine in cui conviene, e si
fallisce dicendo cosa manca.
"""
import shutil

def _trova():
    try:                                   # il pacchetto, se c'e'
        import imageio_ffmpeg
        return imageio_ffmpeg.get_ffmpeg_exe()
    except Exception:
        pass
    for nome in ("ffmpeg", "avconv"):      # quello di sistema
        p = shutil.which(nome)
        if p: return p
    raise SystemExit(
        "ffmpeg non trovato: ne' il pacchetto python imageio_ffmpeg "
        "(pip install imageio_ffmpeg) ne' un eseguibile nel PATH.")

FFMPEG = _trova()
