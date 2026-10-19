"""Specifica delle slide animate del video «Convenzione XTE Salute» (16:9, 1920x1080): pezzi da ritagliare (EPISODI, per
../chicedomani/pezzi.py con SERIE=questo file) e regia sulle parole (ANIM, per ../chicedomani/motore.html, che con
grafica/formato.json lavora a 1920x1080). Le scene hanno i numeri dei blocchi voce: S02 cos'è, S03 servizi,
S05 smartwatch, S06 prezzi, S07 condizioni, S09 attivare (S01, S04, S08, S10 sono l'avatar).

    SERIE=strumenti/xte/serie.py python3 strumenti/chicedomani/pezzi.py xte
    python3 strumenti/xte/serie.py            -> grafica/anim.json e grafica/formato.json

Fondo delle slide a tinta unita: tutti i buchi si riempiono col colore intorno («tinta»). Logo CISL FP, logo XTE, la
banda in basso e le note restano ferme.
"""
import json, os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'chicedomani'))
from serie import P, DIS  # noqa: E402

PR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
XTE = 'pdro-xte-salute'


def R(id, x0, y0, x1, y1, r=None):
    return {'id': id, 'riempi': 'tinta', 'm': ['rrect', x0, y0, x1, y1, r] if r else ['rect', x0, y0, x1, y1]}


def C(id, x0, y0, x1, y1, r, lati=22, su=14, giu=44):
    """Card con l'ombra morbida delle slide (scende ~40 px, la foto ~70): il ritaglio la prende tutta, se no
    prima che la card entri ne resta il fantasma grigio sul fondo."""
    return R(id, x0 - lati, y0 - su, x1 + lati, y1 + giu, r + lati)


EPISODI = {XTE: {
    'S02': {'base': '02_slide/S02_cos_e.png', 'pezzi': [
        R('kick', 100, 250, 300, 300), R('t1', 100, 312, 760, 410), R('t2', 100, 410, 720, 515),
        R('b1', 100, 545, 950, 664), R('b2', 100, 685, 950, 804), R('b3', 100, 825, 950, 944),
        C('foto', 1049, 220, 1829, 960, 36, lati=30, su=20, giu=76)]},
    'S03': {'base': '02_slide/S03_servizi.png', 'pezzi': [
        R('kick', 100, 200, 370, 250), R('tit', 100, 255, 1680, 356),
        *[C(f'c{i + 1}', x, 469, x + 401, 944, 24, lati=15) for i, x in enumerate([110, 544, 977, 1411])]]},
    'S05': {'base': '02_slide/S05_smartwatch.png', 'pezzi': [
        R('orologio', 262, 322, 658, 818),
        {'id': 'disco', 'riempi': 'tinta', 'm': ['cerchio', 469, 560, 352]},
        R('kick', 950, 268, 1660, 322), R('t1', 950, 330, 1660, 428), R('t2', 950, 435, 1690, 532), R('t3', 950, 536, 1170, 622),
        R('corpo', 950, 650, 1830, 770), R('venu', 950, 780, 1232, 846), R('p99', 1232, 782, 1578, 846, 8)]},
    'S06': {'base': '02_slide/S06_prezzi.png', 'pezzi': [
        R('kick', 100, 190, 805, 245),
        R('e18', 145, 820, 335, 925), R('e62', 725, 820, 935, 925), R('e89', 1305, 820, 1515, 925),
        *[C(f'k{i + 1}', x, 270, x + 540, 1000, 26, lati=18) for i, x in enumerate([110, 690, 1270])]]},
    'S07': {'base': '02_slide/S07_condizioni.png', 'pezzi': [
        R('kick', 100, 200, 380, 250), R('tit', 100, 260, 1260, 360),
        C('c1', 110, 440, 943, 650, 24, lati=15, giu=33), C('c2', 977, 440, 1810, 650, 24, lati=15, giu=33),
        C('c3', 110, 686, 943, 893, 24, lati=15, su=3), C('c4', 977, 686, 1810, 893, 24, lati=15, su=3)]},
    'S09': {'base': '02_slide/S09_attivare.png', 'pezzi': [
        R('kick', 100, 215, 400, 260), R('tit', 100, 270, 505, 368),
        R('p1', 100, 405, 1050, 520), R('p2', 100, 540, 1050, 655), R('p3', 100, 675, 1050, 790),
        R('iscr', 100, 806, 1218, 918, 26), R('qr', 1218, 238, 1802, 819, 36), R('inq', 1230, 834, 1795, 894)]},
}}

CAM = [[0, 1.0, 960, 540], [20, 1.035, 960, 560]]
ANIM = {
    'S02': {'tipo': 'pieno', 'fondi': [['fondo', 0]], 'camera': CAM, 'strati': [
        P('kick', ['fade', 0.05, 0.4]), P('t1', ['slam', 'xte', 0.35]), P('t2', ['slam', 'digitale', 0.35]),
        P('foto', ['slideR', 0.25, 0.8]),
        P('b1', ['risale', 'autorizzato', 0.5]), P('b2', ['risale', 'telemedicina', 0.5]), P('b3', ['risale', 'monitoraggio', 0.5]),
    ]},
    'S03': {'tipo': 'pieno', 'fondi': [['fondo', 0]], 'camera': CAM, 'strati': [
        P('kick', ['fade', 0.05, 0.4]), P('tit', ['wipe', 0.15, 0.9]),
        P('c1', ['risale', 'assistenza', 0.5]), P('c2', ['risale', 'televisite', 0.5]),
        P('c3', ['risale', 'dossier', 0.5]), P('c4', ['risale', 'percorsi', 0.5]),
    ]},
    'S05': {'tipo': 'pieno', 'fondi': [['fondo', 0]], 'camera': CAM, 'strati': [
        P('disco', ['zoom', 0.1, 0.7]), P('kick', ['fade', 'plus', 0.4]),
        P('orologio', ['pop', 'smartwatch', 0.5], fx=[['ondeggia', 4.5, 1.2]]),
        P('t1', ['slam', 'smartwatch', 0.35]), P('t2', ['slam', 'venu', 0.35]), P('t3', ['slam', 'venu+0.35', 0.35]),
        P('corpo', ['wipe', 'collegato', 0.8]), P('venu', ['wipe', 'preferisci', 0.5]),
        P('p99', ['pop', 'novantanove', 0.4], fx=[['pulsa', 'novantanove+0.5', 1.1, 0.05]]),
    ]},
    'S06': {'tipo': 'pieno', 'fondi': [['fondo', 0]], 'camera': CAM, 'strati': [
        P('kick', ['fade', 0.05, 0.4]),
        P('k1', ['risale', 'xte', 0.5]), P('k2', ['risale', 'xte#2', 0.5]), P('k3', ['risale', 'xte#3', 0.5]),
        P('e18', ['slam', 'diciotto', 0.35], fx=[['bagliore', 'diciotto+0.3', 1.0]]),
        P('e62', ['slam', 'sessantadue', 0.35], fx=[['bagliore', 'sessantadue+0.3', 1.0]]),
        P('e89', ['slam', 'ottantanove', 0.35], fx=[['bagliore', 'ottantanove+0.3', 1.0]]),
    ]},
    'S07': {'tipo': 'pieno', 'fondi': [['fondo', 0]], 'camera': CAM, 'strati': [
        P('kick', ['fade', 0.05, 0.4]), P('tit', ['wipe', 0.15, 0.9]),
        P('c1', ['pop', 'abbonamenti', 0.45]), P('c2', ['pop', 'rate', 0.45]),
        P('c3', ['pop', 'detrarla', 0.45]), P('c4', ['pop', 'presupposti', 0.45]),
    ]},
    'S09': {'tipo': 'pieno', 'fondi': [['fondo', 0]], 'camera': CAM, 'strati': [
        P('kick', ['fade', 0.05, 0.4]), P('tit', ['slam', 0.2, 0.35]),
        P('qr', ['pop', 'attivarla', 0.55], fx=[['pulsa', 'abbonamento', 1.2, 0.03]]), P('inq', ['fade', 'attivarla+0.6', 0.6]),
        P('p1', ['slideR', 'vai', 0.5]), P('p2', ['slideR', 'clicca', 0.5]), P('p3', ['slideR', 'scegli', 0.5]),
        P('iscr', ['pop', 'iscritto', 0.45]),
    ]},
}

if __name__ == '__main__':
    os.makedirs(f'{PR}/{XTE}/grafica', exist_ok=True)
    json.dump(ANIM, open(f'{PR}/{XTE}/grafica/anim.json', 'w'), ensure_ascii=False, indent=0)
    json.dump({'W': 1920, 'H': 1080}, open(f'{PR}/{XTE}/grafica/formato.json', 'w'))
    print(XTE, list(ANIM))
