#!/usr/bin/env python3
"""Prepara batch_in.json per `create_asset_upload_batch`.

    python3 fa_batch.py            # tutto: clip e audio
    python3 fa_batch.py clip       # solo le clip
    python3 fa_batch.py audio      # solo l'audio

Va eseguito dentro la cartella della lezione. I nomi portano il prefisso che
`carica.py` usa per ritrovare il file sul disco: `v_` per le clip, `a_` per
l'audio dei blocchi, `m_` per la musica.

HeyGen accetta fino a 100 file per batch. Conviene mandarli tutti in una volta
anche quando sono pochi: una risposta corta il client la tiene in conversazione
invece di salvarla su file, e `carica.py` non trova niente da leggere.

I nomi dei campi sono quelli del batch — `content_type` e `size_bytes` — che
NON sono quelli di `create_asset_upload` singolo (`contentType`, `sizeBytes`).
"""
import json
import os
import sys
from pathlib import Path

quali = sys.argv[1] if len(sys.argv) > 1 else 'tutto'
voci = []

if quali in ('tutto', 'clip'):
    for p in sorted(Path('clip').glob('*.mp4')):
        voci.append({'filename': 'v_' + p.name,
                     'content_type': 'video/mp4',
                     'size_bytes': p.stat().st_size})

if quali in ('tutto', 'audio'):
    for p in sorted(Path('mp3u').glob('*.mp3')):
        voci.append({'filename': 'a_' + p.name,
                     'content_type': 'audio/mpeg',
                     'size_bytes': p.stat().st_size})
    m = Path('musica.mp3')
    if m.exists():
        voci.append({'filename': 'm_musica.mp3',
                     'content_type': 'audio/mpeg',
                     'size_bytes': m.stat().st_size})

assert voci, 'niente da caricare'
assert len(voci) <= 100, f'{len(voci)} file: il batch ne regge 100'
json.dump(voci, open('batch_in.json', 'w'), indent=0)
print(len(voci), 'file |',
      sum(1 for v in voci if v['filename'].startswith('v_')), 'clip |',
      sum(1 for v in voci if v['filename'].startswith('a_')), 'audio |',
      round(sum(v['size_bytes'] for v in voci) / 1e6, 1), 'MB')
