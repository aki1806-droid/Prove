"""Specifica del reel «Aggiornamento pagamenti ottobre 2026»: pezzi da ritagliare (EPISODI, per ../chicedomani/pezzi.py
con SERIE=questo file) e regia sulle parole (ANIM, per ../chicedomani/motore.html). Stesso schema di ../bonus/serie.py.

    SERIE=strumenti/pagamenti/serie.py python3 strumenti/chicedomani/pezzi.py
    node strumenti/pagamenti/grafiche.mjs          -> grafica_v2/box.png (delegati AOUP)
    python3 strumenti/pagamenti/serie.py ritocca   -> sfumature degli overlay ripulite, box dei delegati in S06
    python3 strumenti/pagamenti/serie.py           -> grafica/anim.json
    node strumenti/pagamenti/tabellone.mjs         -> montaggio/G_S02..S04.mp4 (il tabellone a palette, fuori dal motore)

S01/S05 overlay sulle clip, S06 chiusura sulla foto del pacchetto. Le scene del tabellone (S02-S04) non passano dal
motore: le disegna tabellone.mjs, qui sono solo «pieno» senza strati perché monta.py le trovi già fatte.
Video solo per l'AOUP Padova: nella chiusura il riquadro con il telefono della sede diventa quello dei delegati AOUP.
"""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'chicedomani'))
from serie import P  # noqa: E402

PR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
PG = 'pdro-aggiornamento-pagamenti-ottobre-2026'
BANDE = [{'id': 'banda_su', 'm': ['rect', 0, 0, 1080, 111]}, {'id': 'banda_giu', 'm': ['rect', 0, 1810, 1080, 1920]}]


def C(id, x0, y0, x1, y1, r=22, riempi='tinta'):
    return {'id': id, 'riempi': riempi, 'm': ['rrect', x0, y0, x1, y1, r]}


EPISODI = {PG: {
    'S01': {'base': 'overlay_clip/S01A.png', 'pezzi': [
        {'id': 'presenta', 'm': ['chiaro', 680, 1840, 1060, 1890, 110, 3]},
        C('chip', 88, 1178, 614, 1247, 34, 'diffusione'),
        {'id': 'eil', 'm': ['chiaro', 85, 1288, 320, 1388, 150, 12]},
        {'id': 'cong', 'm': ['chiaro', 85, 1402, 810, 1502, 150, 12]},
        {'id': 'qm', 'm': ['chiaro', 810, 1402, 885, 1502, 150, 12]},
        {'id': 'sotto', 'm': ['chiaro', 85, 1540, 640, 1628, 140, 10]},
        *BANDE]},
    'S05': {'base': 'overlay_clip/S05A.png', 'pezzi': [
        {'id': 't1', 'm': ['chiaro', 85, 1245, 495, 1338, 150, 12]},
        {'id': 't2', 'm': ['chiaro', 85, 1350, 880, 1432, 150, 12]},
        {'id': 'sotto', 'm': ['chiaro', 85, 1478, 850, 1568, 140, 10]},
        *BANDE]},
    'S06': {'base': 'grafiche/S06A.png', 'pezzi': [
        {'id': 'r1', 'm': ['chiaro', 62, 285, 690, 378, 150, 12]},
        {'id': 'r2', 'm': ['chiaro', 62, 395, 880, 490, 150, 12]},
        {'id': 'r3', 'm': ['chiaro', 62, 515, 560, 608, 150, 12]},
        C('box', 66, 976, 644, 1134, 24, 'diffusione'),
    ]},
}}


def ov(strati, bande_in=0.4):
    return {'tipo': 'overlay', 'fondi': [['fondo', 0]], 'strati': strati + [
        P('banda_su', ['bandaSu', 0, bande_in], fisso=True), P('banda_giu', ['bandaGiu', 0, bande_in], fisso=True)]}


TABELLONE = {'tipo': 'pieno', 'fondi': [], 'strati': []}
ANIM = {
    'S01': ov([P('chip', ['pop', 0.5, 0.45]), P('eil', ['slam', 'conguaglio', 0.35]), P('cong', ['slam', 'conguaglio+0.25', 0.35]),
               P('qm', ['pop', 'ce', 0.4], fx=[['ondeggia', 1.4, 12]]),
               P('sotto', ['wipe', 'ecco', 0.9]), P('presenta', ['fade', 0.5, 0.6], fisso=True)], 0.6),
    'S02': TABELLONE, 'S03': TABELLONE, 'S04': TABELLONE,
    'S05': ov([P('t1', ['slam', 'niente', 0.35]), P('t2', ['slam', 'fughe', 0.35]), P('sotto', ['wipe', 'quando', 1.0])]),
    'S06': {'tipo': 'pieno', 'fondi': [['fondo', 0]], 'camera': [[0, 1.0, 540, 960], [15, 1.05, 540, 820]], 'strati': [
        P('r1', ['slam', 'diciamo', 0.35]), P('r2', ['slam', 'quello', 0.35]), P('r3', ['slam', 'sappiamo#2', 0.35]),
        P('box', ['pop', 'cedolino', 0.45], fx=[['pulsa', 'scrivici', 1.1, 0.03]]),
    ]},
}


def ritocca():
    """Dopo pezzi.py: gli overlay S01/S05 riprendono la sfumatura pulita (riga per riga dalla colonna di destra, senza
    pezzi); il riquadro dei delegati AOUP (grafica_v2/box.png, grafiche.mjs) prende il posto del pezzo «box» di S06."""
    import json
    import numpy as np
    from PIL import Image
    D = f'{PR}/{PG}/grafica/pezzi'
    info = json.load(open(f'{PR}/{PG}/grafica/pezzi.json'))
    for sid in ('S01', 'S05'):
        a = np.asarray(Image.open(f'{D}/{sid}/fondo.png').convert('RGBA')).copy()
        a[1000:1810] = a[1000:1810, 1060:1061]
        Image.fromarray(a, 'RGBA').save(f'{D}/{sid}/fondo.png')
    # fondo di S06 (foto): sotto il riquadro del pacchetto tolto la foto si sfoca, così prima del pop non resta una macchia
    from PIL import ImageFilter
    f = Image.open(f'{D}/S06/fondo.png').convert('RGBA'); b = f.filter(ImageFilter.GaussianBlur(22))
    m = Image.new('L', f.size, 0); m.paste(255, (40, 950, 680, 1160)); m = m.filter(ImageFilter.GaussianBlur(30))
    Image.composite(b, f, m).save(f'{D}/S06/fondo.png')
    im = Image.open(f'{PR}/{PG}/grafica_v2/box.png').convert('RGBA'); x0, y0, x1, y1 = im.getbbox()
    im.crop((x0, y0, x1, y1)).save(f'{D}/S06/box.png'); info['S06']['box'] = [x0, y0, x1 - x0, y1 - y0]
    json.dump(info, open(f'{PR}/{PG}/grafica/pezzi.json', 'w'))


if __name__ == '__main__':
    import json
    if sys.argv[1:] == ['ritocca']:
        ritocca(); sys.exit()
    json.dump(ANIM, open(f'{PR}/{PG}/grafica/anim.json', 'w'), ensure_ascii=False, indent=0)
    print(PG, list(ANIM))
