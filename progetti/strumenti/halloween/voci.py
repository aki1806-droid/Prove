"""Voci dei due reel di Halloween 2026 (CISL FP Padova Rovigo, solo AOUP): «Jack O'Lantern – versione sindacale» e «I
fantasmi del cedolino». Via API HeyGen come passante (../heygen_api.py, elevenlabs eleven_v4), scelta di Achille, sulla
chiave API dello stesso account (i crediti del connettore sono finiti): Luca Ward per le scene 1-6 in una traccia (blocchi
uniti da <break time="1.6s"/>), Achille nuovo 1 per la chiusura S07. Testi del pacchetto (voce_testi/), invariati.
Tagli come nel «Volantino scomparso» (../chicedomani/voci.py): narratore pause >0,6 s → 0,45 s; Achille >0,45 → 0,35 e
atempo 1,16 (il pacchetto chiede eleven_multilingual_v2 con silenceremove e 1,12, che presuppone ElevenLabs diretto).

    python3 strumenti/halloween/voci.py genera jack|fantasmi
    python3 strumenti/halloween/voci.py taglia jack|fantasmi
"""
import glob, os, sys
QUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(QUI)); sys.path.insert(0, os.path.join(os.path.dirname(QUI), 'chicedomani'))
from voci import blocchi, scrivi, PR  # noqa: E402

WARD, ACHILLE = 'e4bd8d8a357f41a99502309874733c16', '9b851842ce54449fb9ff501751ca0271'

if __name__ == '__main__':
    cosa, v = sys.argv[1], sys.argv[2]; PG = f'pdro-halloween-{v}'
    testi = sorted(glob.glob(f'{PR}/{PG}/voce_testi/*.txt'))
    nar = [open(f).read().strip() for f in testi if 'narratore' in f]; ach = [open(f).read().strip() for f in testi if 'achille' in f]
    if cosa == 'genera':
        from heygen_api import voce
        for nome, vid, tt in ((f'ward-{v}', WARD, nar), (f'achille-{v}', ACHILLE, ach)):
            t = ' <break time="1.6s"/> '.join(tt); open(f'{QUI}/{nome}-testo.txt', 'w').write(t)
            voce(vid, f'{QUI}/{nome}-testo.txt', f'{QUI}/{nome}')
    else:
        w = [b for b in blocchi(f'ward-{v}', QUI) if b]; a = [b for b in blocchi(f'achille-{v}', QUI) if b]
        assert len(w) == len(nar) and len(a) == 1, (len(w), len(a))
        for b, t in zip(w + a, nar + ach):
            print(len(b), 'parole' + ('' if len(b) == len(t.split()) else f' (attese {len(t.split())}!)'))
        scrivi(PG, [(f'{QUI}/ward-{v}-grezzo.mp3', b, 'narratore') for b in w] + [(f'{QUI}/achille-{v}-grezzo.mp3', a[0], 'achille')])
