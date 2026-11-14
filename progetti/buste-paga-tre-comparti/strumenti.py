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


# --- il parlato, cioe' il testo senza i tag ----------------------------------
#
# I tag audio di eleven_v4 — [warmly], [cautiously] — si MANDANO e si PAGANO,
# ma non si pronunciano. Due conteggi diversi, e confonderli sbaglia in due
# direzioni opposte: contando i tag nella DURATA il video esce corto quanto i
# tag che contiene; non contandoli nel LIMITE della richiesta si sfora il tetto
# del servizio e la chiamata va in timeout. Sta qui e non in profilo.py perche'
# e' una funzione, non una cifra: profilo.py tiene i numeri di questo video,
# strumenti.py le cose che qualunque video userebbe allo stesso modo.
import re as _re
_TAG = _re.compile(r"\[[^\]]+\]\s*")

def parlato(t):
    """Il testo che la voce pronuncia davvero: senza i tag e senza doppi spazi."""
    return _re.sub(r"\s{2,}", " ", _TAG.sub("", t)).strip()
