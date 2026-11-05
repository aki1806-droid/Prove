"""Voce di «La sedia vuota» (RSU AOUP, novembre 2026): tutta fuori campo, senza avatar, con la voce «UOMO ANZIANO CALDO»
(403b2f166bdd4b4c976e2d7b370d26d6), scelta da Achille (4/11) fra cinque campioni maschili, dopo una prima versione femminile. HeyGen come
passante, eleven_v4, in due tracce (S01-S05 e S06-S09, blocchi uniti da <break time="1.6s"/>); tagli profilo narratore.
    python3 strumenti/rsu/voci.py genera|taglia
"""
import glob, os, sys
QUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(QUI)); sys.path.insert(0, os.path.join(os.path.dirname(QUI), 'chicedomani'))
from voci import blocchi, scrivi, PR  # noqa: E402
PG, VOCE = 'pdro-rsu-la-sedia-vuota', '403b2f166bdd4b4c976e2d7b370d26d6'
testi = [open(f).read().strip() for f in sorted(glob.glob(f'{PR}/{PG}/voce_testi/*.txt'))]
TRACCE = [('rsu-sedia-v3-a', testi[:3]), ('rsu-sedia-v3-b', testi[3:6]), ('rsu-sedia-v3-c', testi[6:])]   # v3: tre tracce (HTTP 502 oltre ~1.400 caratteri)
if sys.argv[1] == 'genera':
    from heygen_api import voce
    for nome, tt in TRACCE:
        if os.path.exists(f'{QUI}/{nome}-grezzo.mp3'):
            continue
        open(f'{QUI}/{nome}-testo.txt', 'w').write(' <break time="1.6s"/> '.join(tt)); voce(VOCE, f'{QUI}/{nome}-testo.txt', f'{QUI}/{nome}')
else:
    pezzi = []
    for nome, tt in TRACCE:
        bb = [b for b in blocchi(nome, QUI) if b]; assert len(bb) == len(tt), (nome, len(bb))
        for b, t in zip(bb, tt):
            print(len(b), 'parole' + ('' if len(b) == len(t.split()) else f' (attese {len(t.split())}!)'))
            pezzi.append((f'{QUI}/{nome}-grezzo.mp3', b, 'narratore'))
    scrivi(PG, pezzi)
