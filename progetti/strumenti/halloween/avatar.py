"""Avatar «Aki with a lapel microphone» (e6d73d660d354b94b0a50c9692b7c34e) sulla chiusura S07 dei reel di Halloween, via API
HeyGen in webm con alfa (come nel «Volantino scomparso»): pdro-halloween-<jack|fantasmi>/avatar/avatar.webm.
    python3 strumenti/halloween/avatar.py jack fantasmi
"""
import os, sys
QUI = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.dirname(QUI))
import heygen_api as hg  # noqa: E402
PR = os.path.dirname(os.path.dirname(QUI)); LOOK = 'e6d73d660d354b94b0a50c9692b7c34e'
CARTELLE = {'cicala': 'pdro-favola-cicala-formica'}
for v in sys.argv[1:]:
    D = f"{PR}/{CARTELLE.get(v, f'pdro-halloween-{v}')}"; os.makedirs(f'{D}/avatar', exist_ok=True)
    chiusura = sorted(x for x in os.listdir(f'{D}/audio/finali') if x.endswith('.mp3'))[-1]   # l'ultima scena: Achille
    vid = hg.avatar(LOOK, hg.asset(f'{D}/audio/finali/{chiusura}'), True, f'{v} - Aki')
    open(f'{D}/avatar/video_id.txt', 'w').write(vid); hg.scarica(vid, f'{D}/avatar/avatar.webm')
