"""Voci dei video YouTube dell'autore (10 «Leggo per te 1», 11 «Il momento di svolta», 12 «Cosa sono le mappe
silenziose»): Achille nuovo 1 via HeyGen (elevenlabs, eleven_v4), un blocco per scena del COPIONE unito da
<break time="1.6s"/>. Il 10 è lungo (6.057 caratteri) e va in tre tracce sotto i ~2.900 caratteri (scene 1-4, 5-8,
9-12); 11 e 12 una traccia ciascuno. Tagli e tempi con ../chicedomani/voci.py (tipo achille: pause >0,45 s → 0,35 s,
atempo 1,16).
"""
import os, sys
QUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(os.path.dirname(QUI), 'chicedomani'))
from voci import blocchi, scrivi  # noqa: E402

TRACCE = {
    'libro-yt10-leggo-per-te-1': ['achille-yt10a', 'achille-yt10b', 'achille-yt10c'],
    'libro-yt11-momento-di-svolta': ['achille-yt11'],
    'libro-yt12-mappe-silenziose': ['achille-yt12'],
}

if __name__ == '__main__':
    for prog, tracce in TRACCE.items():
        if len(sys.argv) > 1 and not any(a in prog for a in sys.argv[1:]):
            continue
        scrivi(prog, [(f'{QUI}/{t}-grezzo.mp3', b, 'achille') for t in tracce for b in blocchi(t, QUI)])
