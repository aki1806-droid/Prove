"""Effetti e musica di «Il filo che ci unisce», dal catalogo HeyGen (royalty-free, via ../heygen_api.py) come per i trailer
«Brividi»; quelli già scaricati o sintetizzati per i trailer (battito, vibrazione, fiammifero, fruscio del filo, uccelli) si
copiano da pdro-brividi-24-novembre/audio/sfx. Tutto in pdro-av1-il-filo-che-ci-unisce/audio/sfx/ (fuori da git).
Musica (audio_brief: minore che si apre in maggiore a «ascolto», violoncello, pieno, quasi zero sotto «non sei sola»,
accordo finale che si spegne): due pianoforti Astral, uno minore e freddo per S02-S03, uno caldo con violoncello da S04.

    python3 strumenti/filo/suoni.py
"""
import os, shutil, subprocess, sys, urllib.parse
QUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(QUI))
from heygen_api import chiama  # noqa: E402

PR = os.path.dirname(os.path.dirname(QUI))
S = f'{PR}/pdro-av1-il-filo-che-ci-unisce/audio/sfx'
DA_BRIVIDI = ['battito', 'vibrazione', 'fiammifero', 'fruscio', 'uccelli']
CAT = {'p_minore': ('music', 'sad solo piano minor', '541a757ad5ee46fc91c3882e7178aac8'),
       'p_maggiore': ('music', 'tender minimal piano cello hope', '47c4aac3211540c4ac7f9d35d5d5c65c'),
       'p_filo': ('music', 'emotional piano cello', '1f7c477f95d243059755794e1cf1feae'),
       'pane': ('sound_effects', 'bread breaking crust', '8a7a02364b5d00e0')}

if __name__ == '__main__':
    os.makedirs(S, exist_ok=True)
    for n in DA_BRIVIDI:
        shutil.copy(f'{PR}/pdro-brividi-24-novembre/audio/sfx/{n}.wav', f'{S}/{n}.wav')
    for nome, (tipo, q, sid) in CAT.items():
        d = chiama('GET', '/v3/audio/sounds?' + urllib.parse.urlencode({'type': tipo, 'query': q, 'limit': 10, 'min_score': 0.4}))
        r = next(x for x in (d if isinstance(d, list) else d.get('sounds') or []) if x['id'] == sid)
        subprocess.run(['curl', '-sS', '-L', '-o', f'{S}/{nome}.tmp', r['audio_url']], check=True)
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', f'{S}/{nome}.tmp', '-ar', '48000', '-ac', '2', f'{S}/{nome}.wav'], check=True)
        os.remove(f'{S}/{nome}.tmp'); print(nome, r.get('name'), r['duration'], r.get('description', ''))
