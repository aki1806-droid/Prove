"""Avatar di Achille per le tre scene in camera di «Il filo che ci unisce» (S02, S04, S08 in fila con 0,6 s di pausa), look
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

if __name__ == '__main__':
    A = f'{D}/audio'; ins, fil, tav, t = [], [], [], 0.0
    for k, sid in enumerate(IN_CAMERA):
        w = f'{A}/wav/{sid}.wav'; d = dur(w); ins += ['-i', w]; p = PAUSA if k < len(IN_CAMERA) - 1 else 0
        tav.append({'id': sid, 'inizio': round(t, 3), 'durata': round(d, 3)})
        fil.append(f'[{k}:a]apad=pad_dur={p}[a{k}]'); t += d + p
    fil.append(''.join(f'[a{k}]' for k in range(len(IN_CAMERA))) + f'concat=n={len(IN_CAMERA)}:v=0:a=1[o]')
    ff(*ins, '-filter_complex', ';'.join(fil), '-map', '[o]', '-c:a', 'libmp3lame', '-b:a', '192k', f'{A}/voce-avatar.mp3')
    json.dump(tav, open(f'{A}/tempi-avatar.json', 'w'), indent=1)
    os.makedirs(f'{D}/avatar', exist_ok=True)
    v = hg.avatar(LOOK, hg.asset(f'{A}/voce-avatar.mp3'), True, 'Il filo che ci unisce - Achille')
    hg.scarica(v, f'{D}/avatar/avatar.webm')
