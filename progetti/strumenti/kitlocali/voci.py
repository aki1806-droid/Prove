"""Voce del reel «Kit Contratto Funzioni Locali» con Andrea Ricci (CISL FP Padova Rovigo, provinciale), via API HeyGen
(../heygen_api.py, clone ElevenLabs «ANDREA RICCI» 8c0895c218bf43a69dcaa14e0f78bc96, eleven_v4): una traccia con i nove
blocchi uniti da <break time="1.6s"/> (request 6sEsyB1oXuINpRbBHluX, grezzo 98,2 s).
Andrea parla già più svelto di Achille (18 caratteri al secondo sul grezzo contro 15,7): niente atempo, solo le pause
oltre 0,6 s accorciate a 0,45 s (profilo «narratore» di ../chicedomani/voci.py).
Le scene S01 e S11 (copertina e chiusura) sono mute: i blocchi vanno sulle scene S02-S10.
"""
import json, os, sys
QUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(os.path.dirname(QUI), 'chicedomani'))
from voci import blocchi, scrivi, PR  # noqa: E402

PG = 'pdro-kit-funzioni-locali'

if __name__ == '__main__':
    b = blocchi('andrea-kit', QUI)
    scrivi(PG, [(f'{QUI}/andrea-kit-grezzo.mp3', x, 'narratore') for x in b])
    # scrivi() numera S01..S09: si rinominano sulle scene vere S02..S10
    A = os.path.join(PR, PG, 'audio')
    for k in range(9, 0, -1):
        for d, ext in (('wav', 'wav'), ('finali', 'mp3')):
            os.replace(f'{A}/{d}/S{k:02d}.{ext}', f'{A}/{d}/S{k + 1:02d}.{ext}')
    for f in ('tempi-scene.json', 'parole.json'):
        d = json.load(open(f'{A}/{f}'))
        if isinstance(d, list):
            for t in d:
                t['id'] = f"S{int(t['id'][1:]) + 1:02d}"
        else:
            d = {f"S{int(k[1:]) + 1:02d}": v for k, v in d.items()}
        json.dump(d, open(f'{A}/{f}', 'w'), ensure_ascii=False, indent=1 if isinstance(d, list) else 0)
    open(f'{A}/lista.txt', 'w').write(''.join(f"file 'wav/S{k:02d}.wav'\n" for k in range(2, 11)))
    print('rinominate S02-S10')
