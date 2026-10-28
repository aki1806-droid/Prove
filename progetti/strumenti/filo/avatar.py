"""Avatar di Achille per le tre scene in camera di «Il filo che ci unisce» (S02, S04, S08 in fila con 0,6 s di pausa; dalla v2 ognuna con il suo ritardo e la sua coda in silenzio), look
«Aki with a lapel microphone» (e6d73d660d354b94b0a50c9692b7c34e) in webm con alfa via API HeyGen: scontornato in basso a
destra come nei reel PDRO (scelta di Achille, al posto del primo piano a tutto schermo della regia).

    python3 strumenti/filo/avatar.py     -> audio/voce-avatar.mp3, audio/tempi-avatar.json, avatar/avatar.webm
"""
import json, os, sys
QUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(QUI)); sys.path.insert(0, os.path.join(os.path.dirname(QUI), 'chicedomani'))
from voci import dur, ff  # noqa: E402
import heygen_api as hg  # noqa: E402
import importlib.util  # noqa: E402
_s = importlib.util.spec_from_file_location('filo_voci', f'{QUI}/voci.py'); _m = importlib.util.module_from_spec(_s)
_s.loader.exec_module(_m); IN_CAMERA, D = _m.IN_CAMERA, _m.D

LOOK, PAUSA = 'e6d73d660d354b94b0a50c9692b7c34e', 0.6

def scene():
    """(id, ritardo della voce, durata della scena) delle scene in camera, dagli stessi conti di monta.py."""
    s2 = importlib.util.spec_from_file_location('filo_monta', f'{QUI}/monta.py'); mm = importlib.util.module_from_spec(s2)
    s2.loader.exec_module(mm)
    vd = {t['id']: t['durata'] for t in json.load(open(f'{D}/audio/tempi-scene.json'))}
    return [(s[0], s[2], s[1] or round(s[2] + vd[s[0]] + 0.15, 2)) for s in mm.SCENE if s[0] in IN_CAMERA]


if __name__ == '__main__':
    # v2: ogni scena in camera entra nella traccia già con il suo ritardo e la sua coda in silenzio (più la pausa fra le
    # scene), così l'avatar si muove per tutta la durata della scena e il montaggio non deve più fermarlo
    A = f'{D}/audio'; ins, fil, tav, t = [], [], [], 0.0
    for k, (sid, lead, d) in enumerate(scene()):
        w = f'{A}/wav/{sid}.wav'; ins += ['-i', w]; coda = d - lead - dur(w) + PAUSA
        tav.append({'id': sid, 'inizio': round(t, 3), 'durata': round(d, 3)})
        fil.append(f'[{k}:a]adelay={round(lead * 1000)}:all=1,apad=pad_dur={coda:.3f}[a{k}]'); t += d + PAUSA
    fil.append(''.join(f'[a{k}]' for k in range(len(tav))) + f'concat=n={len(tav)}:v=0:a=1[o]')
    ff(*ins, '-filter_complex', ';'.join(fil), '-map', '[o]', '-c:a', 'libmp3lame', '-b:a', '192k', f'{A}/voce-avatar.mp3')
    json.dump(tav, open(f'{A}/tempi-avatar.json', 'w'), indent=1)
    os.makedirs(f'{D}/avatar/v1', exist_ok=True)
    if os.path.exists(f'{D}/avatar/avatar.webm'):
        os.replace(f'{D}/avatar/avatar.webm', f'{D}/avatar/v1/avatar.webm')
    v = hg.avatar(LOOK, hg.asset(f'{A}/voce-avatar.mp3'), True, 'Il filo che ci unisce - Achille v2')
    hg.scarica(v, f'{D}/avatar/avatar.webm')
