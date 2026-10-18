"""Voci del secondo lotto dei pezzi dei libri, tutte via HeyGen (elevenlabs, eleven_v4), un blocco per scena del
COPIONE unito da <break time="1.6s"/>:
  - Luca Ward: booktrailer di Mappe Silenziose (8 scene, una traccia) e i reel 07 «coraggio» e 08 «silenzio»
    (4 + 4 scene, una traccia sola); tagli tipo narratore (pause >0,6 s → 0,45 s);
  - Achille nuovo 1: YouTube 09 «Due nonni, il mare e la terra» (9 scene); tipo achille (>0,45 → 0,35, atempo 1,16).
Il booktrailer ha due formati con la stessa voce: si scrive nel 16:9 e si copia nel 9:16.
"""
import os, shutil, sys
QUI = os.path.dirname(os.path.abspath(__file__))
PR = os.path.dirname(os.path.dirname(QUI))
sys.path.insert(0, os.path.join(os.path.dirname(QUI), 'chicedomani'))
from voci import blocchi, scrivi  # noqa: E402

if __name__ == '__main__':
    g = lambda t: f'{QUI}/{t}-grezzo.mp3'
    bt = blocchi('ward-bt-mappe', QUI)
    scrivi('libro-booktrailer-mappe-16x9', [(g('ward-bt-mappe'), b, 'narratore') for b in bt])
    shutil.copytree(f'{PR}/libro-booktrailer-mappe-16x9/audio', f'{PR}/libro-booktrailer-mappe-9x16/audio', dirs_exist_ok=True)
    rl = blocchi('ward-reel-coraggio-silenzio', QUI)
    scrivi('libro-reel3-coraggio', [(g('ward-reel-coraggio-silenzio'), b, 'narratore') for b in rl[:4]])
    scrivi('libro-reel-mappe1-silenzio', [(g('ward-reel-coraggio-silenzio'), b, 'narratore') for b in rl[4:]])
    scrivi('libro-yt09-due-nonni', [(g('achille-yt09'), b, 'achille') for b in blocchi('achille-yt09', QUI)])
