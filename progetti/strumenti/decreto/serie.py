"""Specifica del reel «Decreto PA è legge – 3 cose che ti riguardano»: pezzi da ritagliare (EPISODI, per
../chicedomani/pezzi.py con SERIE=questo file) e regia sulle parole (ANIM, per ../chicedomani/motore.html).
Stesso schema di ../corsi/serie.py; le ancore sono parole di audio/parole.json.

    python3 strumenti/decreto/serie.py base       -> grafica/S04_base.png (torta senza fetta né «20»)
    SERIE=strumenti/decreto/serie.py python3 strumenti/chicedomani/pezzi.py decreto
    python3 strumenti/decreto/serie.py            -> grafica/anim.json

S04: la fetta arancio del 20% e il «20» non si ritagliano: la base li ridipinge (grigio dell'anello, crema del
fondo) e il motore li ridisegna, la fetta col disegno «torta» che si riempie e il numero col contatore 0 → 20.
"""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'chicedomani'))
from serie import P, DIS  # noqa: E402

PR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
DPA = 'pdro-decreto-pa-legge-3-cose'
BANDE = [{'id': 'banda_su', 'm': ['rect', 0, 0, 1080, 111]}, {'id': 'banda_giu', 'm': ['rect', 0, 1809, 1080, 1920]}]
# torta della S04 (misurata su grafiche/S04A.png)
TORTA = dict(cx=540, cy=819, r0=150, r1=300, ang=72, col='rgb(243,146,0)')
ANNO = 185                               # passo fra i riquadri ANNO della S05


def tre(r1, r2, r3, extra=()):
    return [{'id': 'r1', 'm': ['chiaro', *r1, 150, 12]}, {'id': 'r2', 'm': ['chiaro', *r2, 140, 12]},
            {'id': 'r3', 'm': ['chiaro', *r3, 150, 10]}, *extra]


EPISODI = {DPA: {
    'S01': {'base': 'overlay_clip/S01A.png', 'pezzi': [
        {'id': 'presenta', 'm': ['chiaro', 680, 1830, 1080, 1905, 110, 3]},
        {'id': 'chip', 'm': ['alfa', 80, 1210, 610, 1296, 230]},
        {'id': 'tre', 'm': ['chiaro', 80, 1340, 640, 1480, 150, 14]},
        {'id': 'sotto', 'm': ['chiaro', 80, 1495, 720, 1600, 140, 10]},
        *BANDE]},
    'S02': {'base': 'grafiche/S02A.png', 'pezzi': [
        {'id': 'num', 'm': ['giallo', 55, 280, 135, 395]},
        {'id': 'tit', 'm': ['chiaro', 160, 280, 720, 375, 150, 10]},
        {'id': 'mensa', 'riempi': 'tinta', 'm': ['chiaro', 420, 665, 660, 735, 150, 5]},
        {'id': 'buono', 'riempi': 'tinta', 'm': ['chiaro', 380, 742, 700, 795, 150, 5]},
        {'id': 'ferie', 'riempi': 'tinta', 'm': ['giallo', 440, 800, 640, 880]},
        {'id': 'scudo', 'm': ['poly', [[285, 480], [795, 480], [795, 762], [540, 1090], [285, 762]]]},
        {'id': 'tentativo', 'm': ['chiaro', 60, 1115, 380, 1222, 150, 8]},
        {'id': 'respinto', 'm': ['rosso', 470, 1080, 1030, 1350]},
    ]},
    'S03': {'base': 'overlay_clip/S03A.png', 'pezzi': tre([80, 1345, 860, 1430], [80, 1450, 560, 1550], [80, 1572, 830, 1665], BANDE)},
    'S04': {'base': 'grafica/S04_base.png', 'pezzi': [
        {'id': 'num', 'riempi': 'tinta', 'm': ['rect', 60, 296, 156, 412]},
        {'id': 'tit1', 'riempi': 'tinta', 'm': ['rect', 160, 296, 760, 368]},
        {'id': 'tit2', 'riempi': 'tinta', 'm': ['rect', 160, 370, 760, 440]},
        {'id': 'perc', 'riempi': 'tinta', 'm': ['rect', 560, 826, 664, 916]},
        {'id': 'p1', 'riempi': 'tinta', 'm': ['rect', 60, 1172, 900, 1228]},
        {'id': 'p2', 'riempi': 'tinta', 'm': ['rect', 60, 1228, 900, 1278]},
        {'id': 'p3', 'riempi': 'tinta', 'm': ['rect', 60, 1278, 900, 1334]},
        {'id': 'pill', 'riempi': 'tinta', 'm': ['rrect', 66, 1376, 804, 1474, 47]},
    ]},
    'S05': {'base': 'grafiche/S05A.png', 'pezzi': [
        {'id': 'tit', 'riempi': 'tinta', 'm': ['chiaro', 60, 265, 660, 380, 150, 10]},
        *[{'id': f'anno{i + 1}', 'riempi': 'tinta', 'm': ['rrect', 86 + ANNO * i, 556, 259 + ANNO * i, 729, 22]} for i in range(5)],
        {'id': 'cap', 'riempi': 'tinta', 'm': ['chiaro', 80, 752, 930, 812, 150, 6]},
        *[{'id': f'v{i + 1}', 'riempi': 'tinta', 'm': ['verde', 85, y + 8, 165, y + 102]} for i, y in enumerate([878, 1008, 1138, 1268])],
        *[{'id': f'c{i + 1}', 'riempi': 'tinta', 'm': ['rrect', 66, y, 1014, y + 114, 22]} for i, y in enumerate([878, 1008, 1138, 1268])],
    ]},
    'S06': {'base': 'overlay_clip/S06A.png', 'pezzi': tre([80, 1365, 660, 1468], [80, 1470, 940, 1556], [80, 1585, 690, 1678], BANDE)},
    'S07': {'base': 'grafiche/S07A.png', 'pezzi': [
        {'id': 'num', 'm': ['rect', 62, 285, 152, 392]},
        {'id': 'tit', 'm': ['chiaro', 160, 285, 735, 378, 150, 10]},
        {'id': 'card', 'm': ['rrect', 68, 478, 1012, 902, 26]},
        {'id': 'ripro', 'm': ['chiaro', 62, 990, 780, 1080, 150, 12]},
        {'id': 'ogni', 'm': ['chiaro', 62, 1092, 770, 1172, 140, 10]},
    ]},
    'S08': {'base': 'grafiche/S08A.png', 'pezzi': [
        {'id': 'r1', 'm': ['chiaro', 62, 285, 700, 382, 150, 12]},
        {'id': 'r2', 'm': ['chiaro', 62, 398, 940, 502, 140, 12]},
        {'id': 'r3', 'm': ['chiaro', 62, 510, 715, 575, 150, 10]},
        {'id': 'box', 'm': ['rrect', 68, 978, 622, 1130, 22]},
    ]},
}}


def ov(strati, bande_in=0.4):
    return {'tipo': 'overlay', 'fondi': [['fondo', 0]], 'strati': strati + [
        P('banda_su', ['bandaSu', 0, bande_in], fisso=True), P('banda_giu', ['bandaGiu', 0, bande_in], fisso=True)]}


GRIGI = [(0, 'almeno'), (1, 'almeno+0.1'), (2, 'almeno+0.2'), (3, 'almeno+0.3'), (4, 'almeno+0.4')]
ANIM = {
    'S01': ov([P('chip', ['pop', 'legge', 0.45]), P('tre', ['slam', 'tre', 0.35], fx=[['pulsa', 'tre+0.5', 1.2, 0.04]]),
               P('sotto', ['wipe', 'riguardano', 0.8]), P('presenta', ['fade', 0.5, 0.6], fisso=True)], 0.6),
    'S02': {'tipo': 'pieno', 'fondi': [['fondo', 0]], 'camera': [[0, 1.0, 540, 900], [15, 1.04, 540, 860]],
            'urti': ['quelle+0.3'], 'strati': [
        P('num', ['slam', 0.05, 0.3]), P('tit', ['slam', 0.3, 0.3]),
        P('scudo', ['zoom', 'prima+0.2', 0.7], figli=[P('mensa', ['risale', 'mensa', 0.45]), P('buono', ['risale', 'buono', 0.45]),
                                                      P('ferie', ['risale', 'ferie', 0.45], fx=[['bagliore', 'ferie+0.3', 1.0]])]),
        P('tentativo', ['wipe', 'regioni', 0.7]),
        P('respinto', ['drop', 'quelle', 0.3]),
    ]},
    'S03': ov([P('r3', ['wipe', 'cancella', 0.9]), P('r1', ['slam', 'contratti', 0.35]), P('r2', ['slam', 'tavolo', 0.35],
              fx=[['bagliore', 'tavolo+0.3', 1.0]])]),
    'S04': {'tipo': 'pieno', 'fondi': [['fondo', 0]], 'strati': [
        P('num', ['slam', 0.05, 0.3]), P('tit1', ['slam', 'proposta', 0.35]), P('tit2', ['slam', 'diventata', 0.35]),
        DIS(tipo='torta', t='riservare', d=1.4, **TORTA),
        DIS(tipo='contatore', x=556, y=910, size=112, col='#00532a', align='right', v0=0, v1=20, t0='riservare', t1='venti$'),
        P('perc', ['pop', 'riservare', 0.35]),
        P('p1', ['wipe', 'posti', 0.6]), P('p2', ['wipe', 'lavorato', 0.6]), P('p3', ['wipe', 'flessibili', 0.6]),
        P('pill', ['pop', 'somministrazione+0.2', 0.45], fx=[['pulsa', 'somministrazione+0.8', 1.1, 0.04]]),
    ]},
    'S05': {'tipo': 'pieno', 'fondi': [['fondo', 0]], 'strati': [
        P('tit', ['slam', 0.05, 0.3]),
        *[P('anno2', ['pop', t, 0.35], fx=[['sposta', 0, 0.01, ANNO * (i - 1), 0]]) for i, t in GRIGI],
        P('anno1', ['pop', 'anni', 0.35]), P('anno3', ['pop', 'anni+0.18', 0.35]), P('anno4', ['pop', 'anni+0.36', 0.35]),
        P('cap', ['wipe', 'negli', 0.8]),
        P('c1', ['slideR', 'stesso', 0.5]), P('v1', ['pop', 'profilo', 0.35]),
        P('c2', ['slideR', 'presso', 0.5]), P('v2', ['pop', 'bandisce', 0.35]),
        P('c3', ['slideR', 'concorso', 0.5]), P('v3', ['pop', 'concorso+0.35', 0.35]),
        P('c4', ['slideR', 'lesperienza', 0.5]), P('v4', ['pop', 'valorizzata', 0.35]),
    ]},
    'S06': ov([P('r1', ['slam', 'precario', 0.35]), P('r3', ['wipe', 'strada', 0.8]), P('r2', ['slam', 'tempo', 0.35],
              fx=[['bagliore', 'indeterminato', 1.0]])]),
    'S07': {'tipo': 'pieno', 'fondi': [['fondo', 0]], 'camera': [[0, 1.0, 540, 960], [15, 1.05, 540, 900]],
            'urti': ['respinta+0.1'], 'strati': [
        P('num', ['slam', 0.05, 0.3]), P('tit', ['slam', 0.3, 0.3]),
        P('card', ['slideU', 'ottenuto', 0.7]),
        P('ripro', ['slam', 'riproporremo', 0.35], fx=[['bagliore', 'riproporremo+0.3', 1.0]]),
        P('ogni', ['wipe', 'ogni', 0.8]),
    ]},
    'S08': {'tipo': 'pieno', 'fondi': [['fondo', 0]], 'camera': [[0, 1.0, 540, 960], [16, 1.06, 540, 820]], 'strati': [
        P('r1', ['slam', 'proposte', 0.35]), P('r2', ['slam', 'protestare', 0.35]), P('r3', ['wipe', 'portate', 0.7]),
        P('box', ['pop', 'trovarci', 0.45], fx=[['pulsa', 'requisiti', 1.1, 0.04]]),
    ]},
}


def base_s04():
    """La torta senza fetta arancio (ridipinta col grigio dell'anello) e senza il «20» (crema del fondo)."""
    import numpy as np
    from PIL import Image
    D = f'{PR}/{DPA}'; os.makedirs(f'{D}/grafica', exist_ok=True)
    a = np.asarray(Image.open(f'{D}/grafiche/S04A.png').convert('RGBA')).copy()
    yy, xx = np.mgrid[0:a.shape[0], 0:a.shape[1]]
    d = np.hypot(xx - TORTA['cx'], yy - TORTA['cy']); ang = np.degrees(np.arctan2(xx - TORTA['cx'], -(yy - TORTA['cy'])))
    fetta = (d >= TORTA['r0'] - 3) & (d <= TORTA['r1'] + 3) & (ang >= -2) & (ang <= TORTA['ang'] + 2)
    a[fetta & (a[..., 0].astype(int) - a[..., 2] > 40), :3] = (225, 232, 228)   # solo i pixel arancio, anche sui bordi
    a[826:916, 414:560, :3] = (250, 246, 236)
    Image.fromarray(a, 'RGBA').save(f'{D}/grafica/S04_base.png')


if __name__ == '__main__':
    if sys.argv[1:] == ['base']:
        base_s04()
    else:
        import json
        json.dump(ANIM, open(f'{PR}/{DPA}/grafica/anim.json', 'w'), ensure_ascii=False, indent=0)
        print(DPA, list(ANIM))
