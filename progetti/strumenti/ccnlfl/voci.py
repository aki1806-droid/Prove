"""Voce di Andrea Ricci per la serie «CCNL Funzioni Locali 2025-2027» (CISL FP Padova Rovigo, provinciale), via API HeyGen
come passante (../heygen_api.py, clone ElevenLabs «ANDREA RICCI» 8c0895c218bf43a69dcaa14e0f78bc96, eleven_v4), scelta di
Achille. Per ogni video una traccia con i sette blocchi di 02_TESTO_AVATAR_HEYGEN.txt (i numeri sono già in lettere nel
pacchetto) uniti da <break time="1.6s"/>, in due tracce (scene 1-4 e 5-7: la traccia intera, 2.100 caratteri, tornava
HTTP 502 dall'API); poi i tagli come nel Kit (profilo «narratore» di ../chicedomani/voci.py:
Andrea parla già svelto, niente atempo, pause oltre 0,6 s → 0,45 s).

    python3 strumenti/ccnlfl/voci.py genera 01 [02 ...]
    python3 strumenti/ccnlfl/voci.py taglia 01 [02 ...]
"""
import glob, json, os, re, sys
QUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(QUI)); sys.path.insert(0, os.path.join(os.path.dirname(QUI), 'chicedomani'))
import voci as cv  # noqa: E402

BASE = os.path.join(os.path.dirname(os.path.dirname(QUI)), 'pdro-ccnl-fl-serie')
VOCE = '8c0895c218bf43a69dcaa14e0f78bc96'


def cartella(n):
    return glob.glob(f'{BASE}/{n}_*')[0]


def blocchi_testo(n):
    """{numero di scena: testo detto} da 02_TESTO_AVATAR_HEYGEN.txt (fino al testo continuo)."""
    t = open(f'{cartella(n)}/02_TESTO_AVATAR_HEYGEN.txt').read().split('TESTO CONTINUO')[0]
    parti = re.split(r'^--- SCENA (\d+) .*---$', t, flags=re.M)
    return {int(parti[i]): ' '.join(parti[i + 1].split()).strip('= ') for i in range(1, len(parti), 2)}


PARTI = {'a': range(1, 5), 'b': range(5, 8)}


if __name__ == '__main__':
    for n in sys.argv[2:]:
        b = blocchi_testo(n)
        if sys.argv[1] == 'genera':
            from heygen_api import voce
            for k, sc in PARTI.items():
                nome = f'andrea-{n}{k}'
                if os.path.exists(f'{QUI}/{nome}-grezzo.mp3'):
                    continue
                testo = ' <break time="1.6s"/> '.join(b[s] for s in sc)
                open(f'{QUI}/{nome}-testo.txt', 'w').write(testo); print(n + k, len(sc), 'blocchi', len(testo), 'caratteri')
                voce(VOCE, f'{QUI}/{nome}-testo.txt', f'{QUI}/{nome}')
        else:
            A = f'{cartella(n)}/audio'; os.makedirs(f'{A}/wav', exist_ok=True); parole, tempi = {}, []
            for k, sc in PARTI.items():
                nome = f'andrea-{n}{k}'
                pw = [x for x in cv.blocchi(nome, QUI) if x]
                assert len(pw) == len(sc), (nome, len(pw), len(sc))
                for s, p in zip(sc, pw):
                    sid = f'S{s:02d}'; testo = b[s]
                    parole[sid] = cv.taglia(f'{QUI}/{nome}-grezzo.mp3', p, 'narratore', f'{A}/wav/{sid}.wav')
                    d = cv.dur(f'{A}/wav/{sid}.wav'); tempi.append({'id': sid, 'durata': round(d, 3)})
                    print(n, sid, f'{d:5.2f} s', len(p), 'parole' + ('' if len(p) == len(testo.split()) else f' (attese {len(testo.split())}!)'))
            json.dump(tempi, open(f'{A}/tempi-scene.json', 'w'), indent=1)
            json.dump(parole, open(f'{A}/parole.json', 'w'), ensure_ascii=False, indent=0)
