"""Specifica dei due reel di rilancio dei corsi: pezzi da ritagliare (EPISODI, per ../chicedomani/pezzi.py
con SERIE=questo file) e regia sulle parole (ANIM, per ../chicedomani/motore.html).
Stesso schema di ../chicedomani/serie.py; le ancore sono parole di audio/parole.json.

    SERIE=strumenti/corsi/serie.py python3 strumenti/chicedomani/pezzi.py progressioni oss
    python3 strumenti/corsi/serie.py            -> grafica/anim.json nei due progetti
"""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'chicedomani'))
from serie import P, DIS  # noqa: E402

PV, OSS = 'pdro-corso-progressioni-verticali', 'pdro-corso-concorso-oss'
BANDE = [{'id': 'banda_su', 'm': ['rect', 0, 0, 1080, 111]}, {'id': 'banda_giu', 'm': ['rect', 0, 1809, 1080, 1920]}]


def tre(r1, r2, r3):
    """Le tre righe di titolo della chiusura (rettangoli x0,y0,x1,y1; solo i pixel chiari)."""
    return [{'id': 'r1', 'm': ['chiaro', *r1, 150, 12]}, {'id': 'r2', 'm': ['chiaro', *r2, 150, 12]},
            {'id': 'r3', 'm': ['chiaro', *r3, 150, 10]}]


EPISODI = {
    PV: {
        'S01': {'base': 'overlay_clip/S01A.png', 'pezzi': [
            {'id': 'presenta', 'm': ['chiaro', 560, 1830, 1080, 1905, 110, 3]},
            {'id': 'badge', 'm': ['rrect', 86, 1286, 604, 1364, 36]},
            {'id': 'riga1', 'm': ['chiaro', 40, 1395, 1040, 1535, 150, 14]},
            {'id': 'riga2', 'm': ['chiaro', 40, 1535, 1040, 1690, 150, 14]},
            *BANDE]},
        'S02': {'base': 'grafiche/S02A.png', 'pezzi': [
            {'id': 'freccia', 'm': ['poly', [[132, 1036], [168, 1046], [470, 650], [500, 668], [452, 596], [430, 680], [458, 654]]]},
            {'id': 'tit1', 'm': ['chiaro', 50, 270, 700, 365, 150, 10]},
            {'id': 'tit2', 'm': ['chiaro', 50, 365, 700, 460, 150, 10]},
            {'id': 'bollino', 'm': ['rrect', 66, 1256, 704, 1354, 46]},
            {'id': 'prof', 'm': ['rect', 366, 666, 1014, 846]},
            {'id': 'assist', 'm': ['rect', 216, 856, 1014, 1034]},
            {'id': 'oper', 'm': ['rect', 66, 1046, 1014, 1224]},
        ]},
        'S03': {'base': 'grafiche/S03A.png', 'pezzi': [
            {'id': 'tit1', 'riempi': 'tinta', 'm': ['chiaro', 50, 280, 700, 378, 140, 12]},
            {'id': 'tit2', 'riempi': 'tinta', 'm': ['chiaro', 50, 378, 700, 490, 140, 12]},
            {'id': 'cap', 'riempi': 'tinta', 'm': ['chiaro', 240, 1240, 940, 1370, 150, 12]},
            {'id': 'c1', 'm': ['rect', 64, 554, 1016, 766]},
            {'id': 'c2', 'm': ['rect', 64, 784, 1016, 996]},
            {'id': 'c3', 'm': ['rect', 64, 1014, 1016, 1226]},
        ]},
        'S04': {'base': 'overlay_clip/S04A.png', 'pezzi': [
            {'id': 'chip1', 'm': ['alfa', 76, 1268, 492, 1362, 230]},
            {'id': 'chip2', 'm': ['alfa', 492, 1268, 792, 1362, 230]},
            {'id': 'chip3', 'm': ['alfa', 792, 1268, 1044, 1362, 230]},
            {'id': 'cap1', 'm': ['chiaro', 60, 1505, 760, 1615, 150, 8]},
            {'id': 'cap2', 'm': ['chiaro', 60, 1615, 960, 1740, 150, 8]},
            *BANDE]},
        'S05': {'base': 'grafiche/S05A.png', 'pezzi': [
            {'id': 'gratis', 'riempi': 'tinta', 'm': ['rrect', 254, 1314, 828, 1416, 46]},
            {'id': 'v1', 'riempi': 'tinta', 'm': ['rect', 270, 620, 360, 702]},
            {'id': 'v2', 'riempi': 'tinta', 'm': ['rect', 270, 760, 360, 842]},
            {'id': 'telefono', 'm': ['rrect', 196, 276, 884, 1504, 64]},
        ]},
        'S06': {'base': 'grafiche/S06A.png', 'pezzi': tre([40, 285, 1000, 392], [40, 395, 1000, 508], [40, 508, 800, 600])},
    },
    OSS: {
        'S01': {'base': 'overlay_clip/S01A.png', 'pezzi': [
            {'id': 'presenta', 'm': ['chiaro', 560, 1830, 1080, 1905, 110, 3]},
            {'id': 'riga1', 'm': ['chiaro', 40, 1385, 1040, 1530, 150, 14]},
            {'id': 'sotto', 'm': ['chiaro', 40, 1530, 1040, 1680, 150, 10]},
            *BANDE]},
        'S02': {'base': 'grafiche/S02A.png', 'pezzi': [
            {'id': 'tit1', 'm': ['chiaro', 150, 250, 940, 350, 140, 10]},
            {'id': 'tit2', 'm': ['chiaro', 150, 355, 940, 460, 120, 10]},
            {'id': 'g1', 'riempi': 'tinta', 'm': ['chiaro', 130, 640, 350, 780, 150, 6]},
            {'id': 'g2', 'riempi': 'tinta', 'm': ['chiaro', 430, 640, 650, 780, 150, 6]},
            {'id': 'g3', 'riempi': 'tinta', 'm': ['chiaro', 730, 640, 950, 780, 150, 6]},
            {'id': 'quiz', 'm': ['rrect', 122, 992, 288, 1078, 38]},
            {'id': 'casi', 'm': ['rrect', 292, 992, 578, 1078, 38]},
            {'id': 'coll', 'm': ['rrect', 588, 992, 842, 1078, 38]},
            {'id': 'cap1', 'm': ['chiaro', 250, 1195, 860, 1300, 140, 8]},
            {'id': 'cap2', 'm': ['chiaro', 230, 1300, 870, 1415, 140, 8]},
        ]},
        'S03': {'base': 'overlay_clip/S03A.png', 'pezzi': [
            {'id': 'fortuna', 'togli_rosso': True, 'm': ['alfa', 70, 1360, 790, 1465, 225]},
            {'id': 'prep', 'm': ['chiaro', 60, 1475, 1075, 1600, 150, 12]},
            *BANDE]},
        'S04': {'base': 'grafiche/S04A.png', 'pezzi': [
            {'id': 'oltre', 'riempi': 'tinta', 'm': ['chiaro', 50, 250, 400, 325, 140, 8]},
            {'id': 'n300', 'riempi': 'tinta', 'm': ['rect', 40, 335, 600, 515]},
            {'id': 'punti', 'riempi': 'tinta', 'm': ['rect', 56, 522, 1016, 1180]},
            {'id': 'cap1', 'riempi': 'tinta', 'm': ['chiaro', 50, 1215, 820, 1300, 140, 10]},
            {'id': 'cap2', 'riempi': 'tinta', 'm': ['chiaro', 50, 1300, 820, 1395, 140, 10]},
            {'id': 'etu', 'riempi': 'tinta', 'm': ['rrect', 54, 1410, 706, 1520, 50]},
        ]},
        'S05': {'base': 'overlay_clip/S05A.png', 'pezzi': [
            {'id': 'tit1', 'm': ['chiaro', 60, 290, 900, 392, 150, 10]},
            {'id': 'tit2', 'm': ['chiaro', 60, 392, 960, 490, 150, 10]},
            {'id': 'spunta', 'riempi': 'tinta', 'm': ['rect', 856, 1456, 924, 1524]},
            {'id': 'rigaB', 'riempi': 'tinta', 'm': ['rrect', 124, 1438, 954, 1542, 18]},
            {'id': 'card', 'm': ['rrect', 78, 1038, 1002, 1682, 40]},
            *BANDE]},
        'S06': {'base': 'grafiche/S06A.png', 'pezzi': tre([40, 280, 1040, 378], [40, 378, 1000, 492], [40, 492, 800, 590])},
    },
}


def ov(strati, bande_in=0.4):
    return {'tipo': 'overlay', 'fondi': [['fondo', 0]], 'strati': strati + [
        P('banda_su', ['bandaSu', 0, bande_in], fisso=True), P('banda_giu', ['bandaGiu', 0, bande_in], fisso=True)]}


def chiusura(t3):
    return {'tipo': 'pieno', 'fondi': [['fondo', 0]], 'camera': [[0, 1.0, 540, 960], [17, 1.06, 540, 800]],
            'strati': [P('r1', ['slam', 0.2, 0.35]), P('r2', ['slam', 0.55, 0.35]), P('r3', ['wipe', t3, 0.6])]}


VERDE, ROSSO = '#0a8a4a', '#e8505b'


def pastiglia(testo, y, bg, col, size=44, x=None):
    """Scritta aggiunta (v2 OSS): testo su pastiglia arrotondata, centrata o da x; y = bordo alto."""
    d = {'righe': [[testo, col]], 'size': size, 'peso': 800, 'y': y, 'h': int(size * 2.4), 'pill': {'bg': bg}}
    if x is not None:
        d['x'] = x
    return d


# righe dei moduli nel telefono (PV S05): passo 140 px
SPUNTE = [0, 0, 280, 420, 560]
ANIM = {
    PV: {
        'S01': ov([P('badge', ['pop', 0.6, 0.4]), P('riga1', ['risale', 'scala', 0.6]), P('riga2', ['risale', 'scala+0.35', 0.6]),
                   P('presenta', ['fade', 0.5, 0.6], fisso=True)], 0.6),
        'S02': {'tipo': 'pieno', 'fondi': [['fondo', 0]], 'camera': [[0, 1.0, 540, 900], [12, 1.04, 540, 860]], 'strati': [
            P('tit1', ['slam', 0.05, 0.3]), P('tit2', ['slam', 0.35, 0.3]),
            DIS(tipo='riquadro', x0=40, y0=570, x1=1040, y1=1250, r=28, col='rgba(6,30,20,.9)', t=0, d=0.01),
            P('oper', ['risale', 0.15, 0.45]), P('assist', ['risale', 'progressioni', 0.45]), P('prof', ['risale', 'aree', 0.45]),
            P('freccia', ['wipe', 'superiore', 0.7]),
            P('bollino', ['pop', 'cambiare', 0.45], fx=[['pulsa', 'ruolo+0.4', 1.2, 0.05]]),
        ]},
        'S03': {'tipo': 'pieno', 'fondi': [['fondo', 0]], 'strati': [
            P('tit1', ['slam', 0.05, 0.3]), P('tit2', ['slam', 0.3, 0.3]),
            P('c1', ['slideR', 'prova', 0.5]), P('c2', ['slideR', 'colloquio', 0.5]), P('c3', ['slideR', 'valutazione', 0.5]),
            P('cap', ['wipe', 'punti', 0.9]),
        ]},
        'S04': ov([P('chip1', ['pop', 'video', 0.4]), P('chip2', ['pop', 'simulazioni', 0.4]), P('chip3', ['pop', 'consigli', 0.4]),
                   P('cap1', ['wipe', 'quando', 0.7]), P('cap2', ['wipe', 'anche#2', 0.8])]),
        'S05': {'tipo': 'pieno', 'fondi': [['fondo', 0]], 'strati': [
            P('telefono', ['slideU', 0, 0.7], figli=[
                *[P('v1' if i == 0 else 'v2' if i == 1 else 'v1', ['pop', t, 0.35], fx=[['sposta', 0, 0.01, 0, SPUNTE[i]]] if i > 1 else None)
                  for i, t in enumerate([0.8, 1.2, 'realistiche', 'preparazione', 'colloquio'])],
                P('gratis', ['pop', 'unico', 0.45], fx=[['pulsa', 'unico+0.5', 0.9, 0.07]]),
            ]),
        ]},
        'S06': chiusura('comincia'),
    },
    OSS: {
        'S01': {**ov([P('pz', ['pop', 'concorso', 0.45]), P('riga1', ['fade', 'immagina', 1.6]), P('sotto', ['wipe', 'mattina', 1.0]),
                      P('presenta', ['fade', 0.5, 0.6], fisso=True)], 0.6),
                'testi': {'pz': pastiglia('CONCORSO OSS · AZIENDA ZERO', 1250, VERDE, '#ffffff')}},
        'S02': {'tipo': 'pieno', 'fondi': [['fondo', 0]], 'testi': {
                    'data': pastiglia('PRIME PROVE · 27 OTTOBRE', 1440, ROSSO, '#ffffff', 62),
                    'posti': pastiglia('84 POSTI · AZIENDA ZERO', 1600, '#ffffff', '#0b3d24', 52)}, 'strati': [
            P('tit1', ['slam', 0.05, 0.3]), P('tit2', ['slam', 0.35, 0.3]),
            DIS(tipo='cifre', caselle=[[240, 710], [540, 710], [840, 710]], size=120, t0=0, t1='prova', per=0.11, max=[99, 24, 60]),
            P('g1', ['pop', 'prova', 0.3]), P('g2', ['pop', 'prova+0.08', 0.3]), P('g3', ['pop', 'prova+0.16', 0.3]),
            P('data', ['slam', 'ventisette', 0.35], fx=[['pulsa', 'ventisette+0.5', 1.1, 0.05]]),
            P('quiz', ['pop', 'quiz', 0.35]), P('casi', ['pop', 'casi', 0.35]), P('coll', ['pop', 'colloquio', 0.35]),
            P('cap1', ['wipe', 'tanti', 1.0]), P('cap2', ['wipe', 'come', 1.0]),
            P('posti', ['pop', 'ottantaquattro', 0.45]),
        ]},
        'S03': ov([P('fortuna', ['wipe', 'non', 0.6], figli=[DIS(tipo='barra', t='fortuna', d=0.35, x0=88, y0=1411, x1=770, y1=1409, w=9)]),
                   P('prep', ['slam', 'chi', 0.4], fx=[['bagliore', 'chi+0.3', 1.2]])]),
        'S04': {'tipo': 'pieno', 'fondi': [['fondo', 0]], 'testi': {
                    'az': pastiglia('CONCORSO OSS · AZIENDA ZERO', 1560, '#ffc45c', '#0b3d24')}, 'strati': [
            P('oltre', ['slam', 0.05, 0.3]),
            DIS(tipo='contatore', x=60, y=494, size=202, col='#ffc45c', v0=0, v1=500, t0=0.1, t1='colleghi$'),
            P('punti', ['wipeD', 'colleghi', 1.6]),
            P('cap1', ['wipe', 'stanno', 0.6]), P('cap2', ['wipe', 'preparando', 0.6]),
            P('az', ['pop', 'azienda', 0.45]),
            P('etu', ['pop', 'anni', 0.4], fx=[['pulsa', 'anni+0.5', 1.0, 0.06]]),
        ]},
        'S05': {**ov([P('tit1', ['slam', 'dieci', 0.3]), P('tit2', ['slam', 'dieci#2', 0.3]),
                      P('data', ['slam', 'ventisette', 0.35]),
                      P('card', ['slideU', 'bus', 0.7], figli=[
                          P('rigaB', fx=[['grigio', 'quiz'], ['bagliore', 'quiz', 0.9]]),
                          P('spunta', ['pop', 'quiz', 0.35])])]),
                'testi': {'data': pastiglia('PRIME PROVE · 27 OTTOBRE', 505, ROSSO, '#ffffff', 46, x=80)}},
        'S06': {**chiusura('comincia'), 'testi': {'data': pastiglia('PRIME PROVE · 27 OTTOBRE', 630, ROSSO, '#ffffff', 54, x=70)}},
    },
}
ANIM[OSS]['S06']['strati'].append(P('data', ['slam', 'ventisette', 0.35], fx=[['pulsa', 'ventisette+0.5', 1.1, 0.05]]))

if __name__ == '__main__':
    import json
    PR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    for ep, a in ANIM.items():
        os.makedirs(f'{PR}/{ep}/grafica', exist_ok=True)
        json.dump(a, open(f'{PR}/{ep}/grafica/anim.json', 'w'), ensure_ascii=False, indent=0)
        print(ep, list(a))
