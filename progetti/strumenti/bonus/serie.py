"""Specifica del reel «Bonus mamme 2026»: pezzi da ritagliare (EPISODI, per ../chicedomani/pezzi.py con SERIE=questo file)
e regia sulle parole (ANIM, per ../chicedomani/motore.html). Stesso schema di ../coordinamento/serie.py.

    SERIE=strumenti/bonus/serie.py python3 strumenti/chicedomani/pezzi.py bonus
    node strumenti/bonus/grafiche.mjs              -> grafica_v2/box.png (delegati per azienda)
    python3 strumenti/bonus/serie.py ritocca       -> fondo di S07 ripulito, box dei delegati al posto di quello della sede
    python3 strumenti/bonus/serie.py               -> grafica/anim.json

Chip e pillole degli overlay si ritagliano con rrect (diffusione), non con «alfa»: così viene via anche l'ombra
morbida, che altrimenti resta sul fondo come una striscia scura. S02: 60 € e 12 entrano da lati opposti, il × lampeggia, il totale conta fino a 720 (il «720» del pacchetto si toglie e lo
ridisegna il motore col contatore, l'«€» resta un pezzo). Video per il provinciale: nella chiusura il riquadro «Scrivici o
passa in sede» con telefono e mail della sede è sostituito dai delegati per azienda (../../metodo/REFERENTI-CISL-FP.md).
"""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'chicedomani'))
from serie import P, DIS  # noqa: E402

PR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
BM = 'pdro-bonus-mamme-2026'
BANDE = [{'id': 'banda_su', 'm': ['rect', 0, 0, 1080, 111]}, {'id': 'banda_giu', 'm': ['rect', 0, 1809, 1080, 1920]}]
VERDE = 'rgb(0,83,42)'


def T(id, x0, y0, x1, y1):
    return {'id': id, 'riempi': 'tinta', 'm': ['rect', x0, y0, x1, y1]}


def C(id, x0, y0, x1, y1, r=22, riempi='tinta'):
    return {'id': id, 'riempi': riempi, 'm': ['rrect', x0, y0, x1, y1, r]}


EPISODI = {BM: {
    'S01': {'base': 'overlay_clip/S01A.png', 'pezzi': [
        {'id': 'presenta', 'm': ['chiaro', 680, 1830, 1080, 1905, 110, 3]},
        C('chip', 80, 1172, 450, 1252, 34, 'diffusione'),
        {'id': 'r1', 'm': ['chiaro', 85, 1285, 610, 1412, 150, 14]},
        {'id': 'r2', 'm': ['chiaro', 85, 1412, 850, 1525, 150, 14]},
        {'id': 'sotto', 'm': ['chiaro', 85, 1545, 890, 1628, 140, 10]},
        *BANDE]},
    'S02': {'base': 'grafiche/S02A.png', 'pezzi': [
        T('tit', 65, 295, 730, 380),
        T('per', 505, 525, 575, 595),
        C('c60', 68, 418, 503, 703, 40), C('c12', 578, 418, 1013, 703, 40),
        T('linea', 66, 754, 1014, 767),
        T('fino', 455, 825, 625, 895),
        T('n720', 270, 910, 615, 1075), T('euro', 640, 915, 810, 1070),
        C('pill', 198, 1108, 883, 1203, 46),
        T('nota', 135, 1245, 945, 1298),
    ]},
    'S03': {'base': 'grafiche/S03A.png', 'pezzi': [
        {'id': 'tit', 'riempi': 'tinta', 'm': ['chiaro', 65, 270, 740, 365, 150, 12]},
        C('k1', 68, 418, 1013, 543), C('k2', 68, 558, 1013, 683), C('k3', 68, 698, 1013, 823),
        T('escl', 65, 870, 315, 930),
        C('x1', 68, 948, 1013, 1057, 24), C('x2', 68, 1076, 1013, 1274, 24),
    ]},
    'S04': {'base': 'grafiche/S04A.png', 'pezzi': [
        T('tit', 65, 298, 785, 380),
        C('cal1', 66, 416, 574, 924, 40), T('txt1', 612, 515, 875, 705),
        C('cal2', 66, 996, 374, 1304, 32), T('txt2', 402, 1035, 780, 1180),
    ]},
    'S05': {'base': 'overlay_clip/S05A.png', 'pezzi': [
        {'id': 't1', 'm': ['chiaro', 85, 1085, 670, 1185, 150, 12]},
        {'id': 't2', 'm': ['chiaro', 85, 1188, 630, 1285, 150, 12]},
        C('c1', 80, 1312, 832, 1424, 50, 'diffusione'),
        C('c2', 80, 1428, 832, 1538, 50, 'diffusione'),
        C('c3', 80, 1542, 832, 1654, 50, 'diffusione'),
        *BANDE]},
    'S06': {'base': 'overlay_clip/S06A.png', 'pezzi': [
        {'id': 'dubbi', 'm': ['chiaro', 85, 1305, 620, 1405, 150, 12]},
        {'id': 'sola', 'm': ['chiaro', 85, 1425, 710, 1525, 140, 10]},
        C('chip', 80, 1524, 574, 1606, 38, 'diffusione'),
        *BANDE]},
    'S07': {'base': 'grafiche/S07A.png', 'pezzi': [
        {'id': 'r1', 'm': ['chiaro', 62, 290, 780, 390, 150, 12]},
        {'id': 'r2', 'm': ['chiaro', 62, 400, 460, 525, 150, 12]},
        {'id': 'r3', 'm': ['chiaro', 62, 540, 710, 620, 150, 8]},
        C('box', 68, 978, 643, 1133, 24, 'diffusione'),
    ]},
}}


def ov(strati, bande_in=0.4):
    return {'tipo': 'overlay', 'fondi': [['fondo', 0]], 'strati': strati + [
        P('banda_su', ['bandaSu', 0, bande_in], fisso=True), P('banda_giu', ['bandaGiu', 0, bande_in], fisso=True)]}


ANIM = {
    'S01': ov([P('chip', ['pop', 0.6, 0.45]), P('r1', ['fade', 1.0, 1.0]), P('r2', ['fade', 1.5, 1.1]),
               P('sotto', ['wipe', 'mamma', 0.9]), P('presenta', ['fade', 0.5, 0.6], fisso=True)], 0.6),
    'S02': {'tipo': 'pieno', 'fondi': [['fondo', 0]], 'strati': [
        P('tit', ['slam', 0.05, 0.3]),
        P('c60', ['slideR', 'sessanta', 0.5]), P('c12', ['slideL', 'dodici', 0.5]),
        P('per', ['pop', 'dodici+0.4', 0.3], fx=[['lampeggia', 'dodici+0.7', 'dodici+1.7', 0.25]]),
        P('linea', ['wipe', 'mesi$', 0.6]), P('fino', ['fade', 'mesi$+0.2', 0.4]),
        DIS(tipo='contatore', x=612, y=1055, size=176, col=VERDE, align='right', v0=0, v1=720, t0='mesi$+0.3', t1='mesi$+1.6'),
        P('euro', ['pop', 'mesi$+0.3', 0.35]),
        P('pill', ['pop', 'ununica', 0.45], fx=[['pulsa', 'soluzione$', 1.1, 0.04]]),
        P('nota', ['fade', 'ununica+0.5', 0.6]),
    ]},
    'S03': {'tipo': 'pieno', 'fondi': [['fondo', 0]], 'camera': [[0, 1.0, 540, 900], [14, 1.04, 540, 860]], 'strati': [
        P('tit', ['slam', 0.05, 0.3]),
        P('k1', ['slideR', 'madri', 0.45]), P('k2', ['slideR', 'dipendenti', 0.45]), P('k3', ['slideR', 'due', 0.45]),
        P('escl', ['slam', 'escluse', 0.35]),
        P('x1', ['slideR', 'lavoratrici#2', 0.45]), P('x2', ['slideR', 'mamme', 0.45]),
    ]},
    'S04': {'tipo': 'pieno', 'fondi': [['fondo', 0]], 'urti': ['trentuno+0.3'], 'strati': [
        P('tit', ['slam', 0.05, 0.3]),
        P('cal1', ['drop', 'trentuno', 0.35]), P('txt1', ['wipe', 'dicembre', 0.7]),
        P('cal2', ['pop', 'maturi', 0.4]), P('txt2', ['wipe', 'requisito', 0.8]),
    ]},
    'S05': ov([P('t1', ['slam', 0.3, 0.35]), P('t2', ['slam', 0.6, 0.35]),
               P('c1', ['slideR', 'online', 0.45]), P('c2', ['slideR', 'contact', 0.45]), P('c3', ['slideR', 'patronato', 0.45])]),
    'S06': ov([P('dubbi', ['slam', 'dubbi', 0.35]), P('sola', ['wipe', 'farla', 0.9]),
               P('chip', ['pop', 'inas', 0.45], fx=[['pulsa', 'cisl', 1.1, 0.05]])]),
    'S07': {'tipo': 'pieno', 'fondi': [['fondo', 0]], 'camera': [[0, 1.0, 540, 960], [15, 1.05, 540, 820]], 'strati': [
        P('r1', ['slam', 'soldi', 0.35]), P('r2', ['slam', 'tuoi', 0.35]), P('r3', ['wipe', 'lasciarli', 0.9]),
        P('box', ['pop', 'iscritta', 0.45], fx=[['pulsa', 'patronato', 1.1, 0.03]]),
    ]},
}


def ritocca():
    """Dopo pezzi.py: gli overlay S01/S05/S06 riprendono la sfumatura pulita; il fondo di S07 (foto) si sfoca dietro il riquadro della sede tolto; il riquadro dei delegati
    (grafica_v2/box.png, grafiche.mjs) prende il posto del pezzo «box»."""
    import json
    from PIL import Image, ImageFilter
    D = f'{PR}/{BM}/grafica/pezzi'
    f = Image.open(f'{D}/S07/fondo.png').convert('RGBA'); b = f.filter(ImageFilter.GaussianBlur(22))
    m = Image.new('L', f.size, 0); m.paste(255, (40, 950, 680, 1160)); m = m.filter(ImageFilter.GaussianBlur(30))
    Image.composite(b, f, m).save(f'{D}/S07/fondo.png')
    info = json.load(open(f'{PR}/{BM}/grafica/pezzi.json'))
    # overlay delle clip: sotto i titoli il fondo è solo una sfumatura verticale; si ricostruisce riga per riga dalla
    # colonna di destra (senza pezzi), così dove c'erano chip e pillole non resta nessuna macchia
    import numpy as np
    for sid in ('S01', 'S05', 'S06'):
        a = np.asarray(Image.open(f'{D}/{sid}/fondo.png').convert('RGBA')).copy()
        a[1000:1809] = a[1000:1809, 1060:1061]
        Image.fromarray(a, 'RGBA').save(f'{D}/{sid}/fondo.png')
    im = Image.open(f'{PR}/{BM}/grafica_v2/box.png').convert('RGBA'); x0, y0, x1, y1 = im.getbbox()
    im.crop((x0, y0, x1, y1)).save(f'{D}/S07/box.png'); info['S07']['box'] = [x0, y0, x1 - x0, y1 - y0]
    json.dump(info, open(f'{PR}/{BM}/grafica/pezzi.json', 'w'))


if __name__ == '__main__':
    import json
    if sys.argv[1:] == ['ritocca']:
        ritocca(); sys.exit()
    json.dump(ANIM, open(f'{PR}/{BM}/grafica/anim.json', 'w'), ensure_ascii=False, indent=0)
    print(BM, list(ANIM))
