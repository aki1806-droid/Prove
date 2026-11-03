"""Grafiche animate delle «Favole del sindacato» e dei «format originali» PDRO (novembre 2026, solo AOUP): pezzi da ritagliare
(EPISODI, per ../chicedomani/pezzi.py con SERIE=questo file) e regia sulle parole (ANIM). Stessi attrezzi di
../halloween/serie.py; la «Cicala e la formica» è là.

    SERIE=strumenti/favole/serie.py python3 strumenti/chicedomani/pezzi.py re
    python3 strumenti/favole/serie.py           -> grafica/anim.json
Regola dopo i reel di Halloween («aloni»): le scritte si ritagliano con l'ombra; sui fondi a foto tutto entra entro
mezzo secondo; sui fondi a sfumatura il buco si riempie a righe o per diffusione da un bordo pulito.
"""
import importlib.util, os, sys
QUI = os.path.dirname(os.path.abspath(__file__))
_sp = importlib.util.spec_from_file_location('serie_hw', os.path.join(os.path.dirname(QUI), 'halloween', 'serie.py'))
_hw = importlib.util.module_from_spec(_sp); _sp.loader.exec_module(_hw)
P, R, C, CH, BANDE, ov, pieno = _hw.P, _hw.R, _hw.C, _hw.CH, _hw.BANDE, _hw.ov, _hw.pieno
PR = _hw.PR
RE = 'pdro-favola-re-e-accordo-invisibile'
GV = 'pdro-favola-gatto-volpe-campo-dei-miracoli'
PO = 'pdro-favola-tre-porcellini-e-il-lupo'
ME = 'pdro-originale-meteo-dei-diritti'
UN = 'pdro-originale-unboxing-cisl-fp'
QZ = 'pdro-originale-quizzone-della-corsia'
AR = 'pdro-originale-archeologi-del-futuro'
PT = 'pdro-bando-part-time-2026'


def titolo_favola(t1y, t2y, soty, x1=(440, 880, 840)):
    """S01 delle favole: badge FAVOLA N°, due righe di titolo, sottotitolo, firma della serie (overlay con bande)."""
    return {'base': 'overlay_clip/S01A.png', 'pezzi': [
        CH('badge', 70, 1104, 340, 1198, 120, 8), CH('t1', 70, t1y[0] - 10, x1[0], t1y[1] + 10, 120, 14),
        CH('t2', 70, t2y[0] - 10, x1[1], t2y[1] + 10, 120, 14), CH('sotto', 70, soty[0] - 10, x1[2], soty[1] + 10, 110, 12),
        CH('firma', 280, 1848, 1060, 1884, 100, 3), *BANDE]}


def anim_titolo(w1, w2, w3):
    return ov([P('badge', ['pop', 0.3, 0.4]), P('t1', ['slam', w1, 0.35]), P('t2', ['slam', w2, 0.35]),
               P('sotto', ['wipe', w3, 0.9]), P('firma', ['fade', 0.6, 0.8], fisso=True)], 0.5)


def citazione(r1, r2, r3, x=(700, 700, 1000)):
    """S03/S04 delle favole: due righe grandi e una piccola su overlay con bande."""
    return {'base': None, 'pezzi': [
        CH('t1', 70, r1[0] - 10, x[0], r1[1] + 10, 120, 14), CH('t2', 70, r2[0] - 10, x[1], r2[1] + 10, 120, 14),
        CH('sotto', 70, r3[0] - 10, x[2], r3[1] + 10, 110, 12), *BANDE]}


def chiusura_foto(righe, box=(58, 885, 640, 1160), extra=()):
    """chiusura su foto: titolo su due righe, eventuali righe piccole, riquadro dei contatti."""
    pz = [CH('t1', 30, 274, 1060, 361, 150, 18), CH('t2', 30, 379, 1060, 466, 120, 18)]
    pz += [CH(f's{i}', 40, y0 - 10, 860, y1 + 10, 120, 16) for i, (y0, y1) in enumerate(righe, 1)]
    return {'base': 'grafiche/S05A.png', 'pezzi': pz + list(extra) + [C('box', *box, 24, 'diffusione')]}


def anim_chiusura(n_righe, extra=()):
    return pieno([P('box', ['pop', 0.0, 0.25]), P('t1', ['slam', 0.1, 0.25]), P('t2', ['slam', 0.25, 0.25]),
                  *[P(f's{i}', ['wipe', 0.35 + 0.12 * i, 0.4]) for i in range(1, n_righe + 1)], *extra],
                 camera=[[0, 1.0, 540, 960], [15, 1.04, 540, 900]])


EPISODI = {
    RE: {
        'S01': titolo_favola((1236, 1303), (1333, 1405), (1436, 1492), (460, 980, 860)),
        'S02': {'base': 'grafiche/S02A.png', 'pezzi': [
            R('proclama', 200, 375, 900, 458, 'diffusione'), R('risultato', 190, 480, 910, 712, 'diffusione'),
            {'id': 'timbro', 'm': ['scuro', 260, 820, 905, 1125, 80]},
            {'id': 'sigillo', 'riempi': 'diffusione', 'm': ['cerchio', 548, 1370, 122]},
            R('pergamena', 66, 218, 1004, 1556, 'verticale')]},
        'S03': {'base': 'overlay_clip/S03A.png', 'pezzi': [
            CH('t1', 70, 1256, 700, 1331, 120, 14), CH('t2', 70, 1350, 400, 1425, 120, 14),
            CH('sotto', 70, 1468, 1000, 1545, 110, 12), *BANDE]},
        'S04': {'base': 'grafiche/S04A.png', 'pezzi': [
            R('t1', 50, 300, 1030, 360, 'verticale'), R('t2', 50, 384, 1030, 456, 'verticale'),
            R('lente', 672, 466, 1036, 852, 'verticale'),
            *[C(f'v{i}', 58, y0 - 6, x1, y1 + 6, 16, 'verticale') for i, (y0, y1, x1) in
              enumerate([(520, 671, 660), (695, 846, 660), (870, 1021, 1012), (1045, 1196, 1012)], 1)],
            R('fine', 50, 1300, 1030, 1398, 'verticale')]},
        'S05': {'base': 'grafiche/S05A.png', 'pezzi': [
            CH('t1', 50, 270, 420, 365, 150, 18), CH('t2', 30, 375, 740, 470, 120, 18),
            CH('s1', 50, 489, 860, 569, 120, 16), CH('s2', 50, 566, 360, 640, 120, 16),
            C('box', 58, 885, 640, 1150, 24, 'diffusione')]},
    },
    GV: {
        'S01': titolo_favola((1231, 1301), (1315, 1366), (1410, 1466), (1060, 1060, 760)),
        'S02': {'base': 'grafiche/S02A.png', 'pezzi': [
            R('garantito', 300, 1092, 830, 1198, 'verticale'), R('piuomeno', 300, 1205, 800, 1308, 'verticale'),
            R('cartello', 66, 282, 1004, 982, 'verticale')]},
        'S03': {**citazione((1266, 1321), (1361, 1429), (1478, 1525)), 'base': 'overlay_clip/S03A.png'},
        'S04': {'base': 'grafiche/S04A.png', 'pezzi': [
            R('t1', 60, 266, 840, 326, 'verticale'), R('t2', 60, 338, 740, 408, 'verticale'), R('t3', 60, 440, 620, 522, 'verticale'),
            C('f1', 180, 626, 466, 773, 66, 'verticale'), C('f2', 497, 685, 878, 829, 66, 'verticale'),
            C('f3', 27, 882, 519, 1030, 66, 'verticale'), C('f4', 523, 922, 889, 1070, 66, 'verticale'),
            C('f5', 247, 1118, 572, 1269, 66, 'verticale'), R('albero', 262, 560, 810, 1572, 'verticale')]},
        'S05': chiusura_foto([(500, 558)]),
    },
    PO: {
        'S01': titolo_favola((1234, 1301), (1324, 1362), (1401, 1451), (1060, 1060, 640)),
        'S02': {'base': 'grafiche/S02A.png', 'pezzi': [
            R('t1', 60, 276, 580, 368, 'verticale'), R('t2', 60, 376, 740, 444, 'verticale'),
            R('l1', 34, 1196, 360, 1256, 'righe'), R('l2', 368, 1196, 696, 1256, 'righe'), R('l3', 704, 1196, 1050, 1256, 'righe'),
            R('d1', 40, 1293, 362, 1366, 'righe'), R('d2', 375, 1293, 702, 1366, 'righe'), R('d3', 710, 1293, 1045, 1366, 'righe'),
            R('h1', 34, 718, 360, 1194, 'righe'), R('h2', 368, 718, 696, 1194, 'verticale'), R('h3', 704, 718, 1050, 1194, 'verticale')]},
        'S03': {**citazione((1261, 1321), (1356, 1429), (1478, 1536), (700, 1040, 520)), 'base': 'overlay_clip/S03A.png'},
        'S04': {**citazione((1261, 1334), (1361, 1429), (1480, 1535), (560, 320, 820)), 'base': 'overlay_clip/S04A.png'},
        'S05': chiusura_foto([], extra=[C(f'm{i}', 44, y0 - 6, 566, y1 + 6, 10, 'diffusione') for i, (y0, y1) in
                                        enumerate([(580, 661), (670, 747), (760, 837)], 1)]),
    },
    ME: {
        'S01': {'base': 'overlay_clip/S01A.png', 'pezzi': [
            {'id': 'banda', 'm': ['alfa', 0, 1178, 1080, 1256, 8]}, CH('t1', 70, 1312, 1060, 1418, 120, 14),
            CH('t2', 70, 1440, 1060, 1537, 120, 14), CH('sotto', 70, 1571, 860, 1648, 110, 12),
            CH('firma', 500, 1848, 1060, 1884, 100, 3), *BANDE]},
        'S02': {'base': 'grafiche/S02A.png', 'pezzi': [
            R('t1', 60, 280, 560, 346, 'righe'), R('t2', 60, 358, 700, 414, 'righe'),
            C('z1', 64, 466, 522, 906, 30, 'righe'), C('z2', 550, 466, 1008, 906, 30, 'righe'),
            C('z3', 64, 926, 522, 1366, 30, 'righe'), C('z4', 550, 926, 1008, 1366, 30, 'righe')]},
        'S03': {'base': 'grafiche/S03A.png', 'pezzi': [
            R('banda', 0, 300, 1080, 440, 'diffusione'), R('fenomeno', 60, 535, 1020, 590, 'diffusione'),
            C('riquadro', 112, 622, 966, 918, 30, 'diffusione'), R('consiglio', 60, 996, 1020, 1150, 'diffusione')]},
        'S04': {'base': 'grafiche/S04A.png', 'pezzi': [
            {'id': 'sole', 'riempi': 'righe', 'm': ['cerchio', 852, 377, 185]}, R('nuvola', 110, 310, 400, 510, 'righe'),
            R('t1', 60, 620, 760, 716, 'righe'), R('t2', 60, 733, 560, 806, 'righe'),
            *[C(f'c{i}', 64, y0 - 5, 1004, y1 + 5, 20, 'righe') for i, (y0, y1) in enumerate([(860, 991), (1010, 1141), (1160, 1291)], 1)],
            C('pillola', 64, 1326, 800, 1425, 44, 'righe')]},
        'S05': {**citazione((1261, 1335), (1356, 1416), (1480, 1534), (720, 1060, 740)), 'base': 'overlay_clip/S05A.png'},
        'S06': {'base': 'grafiche/S06A.png', 'pezzi': [
            CH('t1', 30, 274, 760, 361, 150, 18), CH('t2', 30, 379, 860, 466, 120, 18), CH('s1', 40, 488, 960, 567, 120, 16),
            R('ombrello', 580, 610, 1080, 1030, 'diffusione'), C('box', 58, 890, 640, 1160, 24, 'diffusione')]},
    },
    UN: {
        'S01': {'base': 'overlay_clip/S01A.png', 'pezzi': [
            {'id': 'live', 'm': ['alfa', 50, 132, 330, 220, 8]}, {'id': 'diretta', 'm': ['alfa', 740, 132, 1030, 220, 8]},
            CH('t1', 70, 1314, 900, 1427, 120, 14), CH('sotto', 70, 1440, 760, 1513, 110, 12), *BANDE]},
        **{s: {'base': f'grafiche/{s}A.png', 'pezzi': [R('titolo', 240, 250, 840, 308, 'righe'),
                                                    *[C(f'c{i}', 104, y0 - 6, 968, y1 + 6, 22, 'righe') for i, (y0, y1) in enumerate(cc, 1)]]}
           for s, cc in (('S02', [(380, 585)]), ('S03', [(380, 585), (614, 819)]), ('S04', [(380, 543), (572, 735), (764, 927)]))},
        'S05': {'base': 'grafiche/S05A.png', 'pezzi': [
            R('titolo', 60, 282, 1020, 360, 'verticale'),
            *[{'id': f'st{i}', 'riempi': 'righe', 'm': ['cerchio', x, 511, 100]} for i, x in enumerate((201, 369, 541, 709, 875), 1)],
            *[R(f'r{i}', 60, y0 - 8, 1020, y1 + 8, 'verticale') for i, (y0, y1) in enumerate([(735, 773), (855, 897), (977, 1017), (1097, 1137)], 1)],
            R('fine', 60, 1222, 1020, 1312, 'verticale')]},
        'S06': {'base': 'grafiche/S06A.png', 'pezzi': [
            CH('t1', 30, 274, 760, 361, 150, 18), CH('t2', 30, 361, 560, 466, 120, 18), CH('s1', 40, 490, 1010, 562, 120, 16),
            CH('s2', 40, 566, 300, 612, 120, 12), C('pillola', 60, 592, 800, 712, 48, 'diffusione'), C('box', 58, 890, 640, 1160, 24, 'diffusione')]},
    },
    QZ: {
        'S01': {'base': 'overlay_clip/S01A.png', 'pezzi': [
            {'id': 'luci', 'm': ['alfa', 40, 970, 1060, 1062, 8]}, CH('t1', 60, 1168, 1040, 1294, 120, 14),
            CH('t2', 60, 1305, 1040, 1397, 120, 14), CH('sotto', 120, 1451, 960, 1524, 110, 12), *BANDE]},
        **{s: {'base': f'grafiche/{s}A.png', 'pezzi': [
            {'id': 'verde', 'buca': False, 'm': ['rrect', 45, verde - 62, 1035, verde + 62, 20]},
            {'id': 'badge', 'm': ['giallo', 250, 240, 830, 336]}, CH('domanda', 150, qy[0] - 8, 930, qy[1] + 8, 140, 6),
            *[CH(f'r{i}', 110, y - 30, 880, y + 30, 150, 6) for i, y in enumerate((853, 994, 1135, 1275), 1)],
            CH('nota', 40, 1390, 1070, 1462, 110, 10)]}
           for s, qy, verde in (('S02', (470, 602), 1135), ('S03', (470, 602), 994), ('S04', (494, 584), 1135))},
        'S05': {**citazione((1261, 1334), (1356, 1416), (1479, 1526), (840, 830, 540)), 'base': 'overlay_clip/S05A.png'},
        'S06': {'base': 'grafiche/S06A.png', 'pezzi': [
            CH('t1', 30, 274, 760, 361, 150, 18), CH('t2', 30, 379, 560, 466, 120, 18), CH('s1', 40, 492, 520, 554, 120, 16),
            C('pillola', 60, 596, 780, 700, 44, 'diffusione'), C('box', 58, 890, 640, 1160, 24, 'diffusione')]},
    },
    AR: {
        'S01': {'base': 'overlay_clip/S01A.png', 'pezzi': [
            CH('anno', 70, 1204, 860, 1317, 120, 14), CH('t1', 70, 1334, 700, 1434, 120, 14), CH('t2', 70, 1438, 540, 1519, 120, 14),
            CH('sotto', 70, 1571, 760, 1643, 110, 12), CH('firma', 250, 1848, 1060, 1884, 100, 3), *BANDE]},
        'S02': {'base': 'grafiche/S02A.png', 'pezzi': [C('targhetta', 172, 1034, 898, 1462, 6, 'verticale')]},
        'S03': {'base': 'grafiche/S03A.png', 'pezzi': [C('targhetta', 172, 1034, 898, 1462, 6, 'verticale')]},
        'S04': {**citazione((1268, 1334), (1356, 1429), (1479, 1535), (600, 1060, 950)), 'base': 'overlay_clip/S04A.png',
                'pezzi': citazione((1268, 1334), (1356, 1429), (1479, 1535), (600, 1060, 950))['pezzi'][:3]
                + [CH('s2', 70, 1546, 270, 1605, 110, 12), *BANDE]},
        'S05': {'base': 'grafiche/S05A.png', 'pezzi': [
            R('t1', 60, 276, 780, 384, 'righe'), R('t2', 60, 392, 640, 489, 'righe'),
            R('e1', 105, 582, 1000, 764, 'righe'), R('e2', 105, 792, 1000, 922, 'righe'), R('e3', 105, 1010, 1000, 1140, 'righe'),
            R('e4', 105, 1232, 1000, 1384, 'righe'), R('linea', 128, 556, 178, 1460, 'righe')]},
        'S06': chiusura_foto([(502, 546)]) | {'base': 'grafiche/S06A.png'},
    },
    PT: {
        'S01': {'base': 'overlay_clip/S01A.png', 'pezzi': [
            CH('badge', 70, 1104, 550, 1198, 120, 8), CH('t1', 70, 1226, 1060, 1313, 120, 14), CH('t2', 70, 1330, 1060, 1419, 120, 14),
            CH('sotto', 70, 1456, 860, 1533, 110, 12), CH('firma', 320, 1848, 1060, 1884, 100, 3), *BANDE]},
        'S02': {'base': 'grafiche/S02A.png', 'pezzi': [
            R('titolo', 150, 206, 930, 276, 'righe'), {'id': 'orologio', 'riempi': 'righe', 'm': ['cerchio', 537, 620, 300]},
            C('b1', 56, 972, 376, 1270, 18, 'righe'), C('b2', 380, 972, 692, 1270, 18, 'righe'), C('b3', 696, 966, 1016, 1276, 20, 'righe'),
            R('azienda', 150, 1352, 930, 1412, 'righe')]},
        'S03': {'base': 'grafiche/S03A.png', 'pezzi': [
            R('t1', 60, 292, 700, 368, 'verticale'), R('t2', 60, 380, 700, 442, 'verticale'),
            *[R(f'p{i}', 56, y0 - 6, 920, y1 + 6, 'verticale') for i, (y0, y1) in enumerate(
                [(490, 603), (618, 731), (746, 859), (874, 982), (1002, 1115), (1130, 1243), (1258, 1366), (1386, 1499), (1514, 1622)], 1)]]},
        'S04': {'base': 'grafiche/S04A.png', 'pezzi': [
            R('t1', 60, 268, 760, 372, 'righe'), R('t2', 60, 395, 1040, 471, 'righe'),
            *[C(f'c{i}', 56, y0 - 6, 1012, y1 + 6, 20, 'righe') for i, (y0, y1) in enumerate([(540, 649), (672, 781), (804, 1009), (1052, 1245)], 1)]]},
        'S05': {'base': 'grafiche/S05A.png', 'pezzi': [
            R('t1', 60, 292, 760, 368, 'verticale'), R('t2', 60, 383, 760, 457, 'verticale'),
            *[R(f'r{i}', 56, y0 - 3, 1024, y0 + 76, 'righe') for i, y0 in enumerate(range(505, 1451, 105), 1)],
            R('nota', 56, 1552, 1024, 1598, 'verticale')]},
        'S06': {'base': 'grafiche/S06A.png', 'pezzi': [
            R('t1', 60, 286, 760, 366, 'righe'), R('t2', 60, 390, 900, 472, 'righe'),
            *[C(f'a{i}', 56, y0 - 6, 1012, y1 + 6, 20, 'righe') for i, (y0, y1) in enumerate([(520, 653), (674, 849), (870, 1045), (1066, 1199)], 1)]]},
        'S07': {'base': 'overlay_clip/S07A.png', 'pezzi': [
            CH('titolo', 70, 1110, 900, 1184, 120, 12), *[CH(f'm{i}', 60, y0 - 4, 1020, y1 + 4, 200, 6) for i, (y0, y1) in
                                                        enumerate([(1200, 1291), (1310, 1401), (1420, 1511)], 1)],
            CH('fine', 70, 1560, 900, 1644, 100, 12), *BANDE]},
        'S08': {'base': 'grafiche/S08A.png', 'pezzi': [
            CH('t1', 30, 256, 760, 361, 150, 18), CH('t2', 30, 379, 860, 466, 120, 18), CH('s1', 40, 488, 960, 558, 120, 16),
            C('scadenza', 56, 612, 700, 720, 40, 'diffusione'), C('box', 56, 890, 650, 1176, 24, 'diffusione')]},
    },
}

ANIM = {
    RE: {
        'S01': anim_titolo('re', 'accordo', 'straordinario'),
        # la pergamena si srotola, il proclama, «risultato storico», il timbro INVISIBILE su «niente», il sigillo
        'S02': pieno([P('pergamena', ['apri', 0.0, 0.7]), P('proclama', ['wipe', 'annuncio', 0.7]),
                      P('risultato', ['slam', 'risultato', 0.4]), P('timbro', ['slam', 'niente', 0.35]),
                      P('sigillo', ['pop', 'applaudivano', 0.4])],
                     urti=['niente+0.3'], camera=[[0, 1.0, 540, 960], [11, 1.04, 540, 900]]),
        'S03': ov([P('t1', ['slam', 'laccordo', 0.35]), P('t2', ['slam', 'dove', 0.35]), P('sotto', ['wipe', 'silenzio', 2.4])]),
        # la lente passa sulle quattro voci, che si spuntano una alla volta
        'S04': pieno([P('t1', ['slam', 0.1, 0.35]), P('t2', ['slam', 'accordo', 0.35]),
                      P('lente', ['pop', 'riconosce', 0.4], fx=[['sposta', 'firma', 0.45, -330, -40], ['sposta', 'date', 0.45, 0, 175],
                                                                 ['sposta', 'cifre', 0.45, 0, 175], ['sposta', 'leggere', 0.45, 0, 175],
                                                                 ['sposta', 'vede', 0.6, 330, -485]]),
                      P('v1', ['pop', 'firma', 0.35]), P('v2', ['pop', 'date', 0.35]), P('v3', ['pop', 'cifre', 0.35]),
                      P('v4', ['pop', 'leggere', 0.35]), P('fine', ['wipe', 'vede', 1.0])]),
        'S05': pieno([P('box', ['pop', 0.0, 0.25]), P('t1', ['slam', 0.1, 0.25]), P('t2', ['slam', 0.25, 0.25]),
                      P('s1', ['wipe', 0.35, 0.4]), P('s2', ['wipe', 0.5, 0.4])],
                     camera=[[0, 1.0, 540, 960], [15, 1.04, 540, 900]]),
    },
    GV: {
        'S01': anim_titolo('volpe', 'gatto', 'eleganti'),
        # il cartello cade e oscilla appeso al palo; «Garantito.» e, in ritardo, «(Più o meno.)»
        'S02': pieno([P('cartello', ['drop', 0.05, 0.5], fx=[['ondeggia', 2.6, 1.6]]), P('garantito', ['slam', 'garantito', 0.4]),
                      P('piuomeno', ['fade', 'meno+0.3', 0.8])], urti=['garantito+0.3']),
        'S03': ov([P('t1', ['slam', 'albero', 0.35]), P('t2', ['slam', 'lombra', 0.35]), P('sotto', ['wipe', 'cartellino', 1.6])]),
        # l'albero cresce dal basso, le foglie-etichetta si aprono sulle parole
        'S04': pieno([P('t1', ['slam', 0.1, 0.35]), P('t2', ['slam', 0.4, 0.35]), P('t3', ['wipe', 'troverai#2', 0.9]),
                      P('albero', ['cresce', 'magico', 1.2]),
                      P('f3', ['pop', 'contratti', 0.4]), P('f2', ['pop', 'cedolini', 0.4]), P('f1', ['pop', 'tutela', 0.4]),
                      P('f4', ['pop', 'corsi', 0.4]), P('f5', ['pop', 'assistenza', 0.4])]),
        'S05': anim_chiusura(1),
    },
    PO: {
        'S01': anim_titolo('porcellini', 'lupo#2', 'riorganizzazioni'),
        # le tre case: paglia veloce, legno un po' meno, mattoni pezzo per pezzo
        'S02': pieno([P('t1', ['slam', 0.1, 0.35]), P('t2', ['slam', 0.4, 0.35]),
                      P('h1', ['risale', 'paglia', 0.3]), P('l1', ['pop', 'paglia', 0.3]), P('d1', ['wipe', 'promesse', 0.6]),
                      P('h2', ['risale', 'legno', 0.8]), P('l2', ['pop', 'legno', 0.3]), P('d2', ['wipe', 'annunci', 0.8]),
                      P('h3', ['stampa', 'mattoni', 1.6]), P('l3', ['pop', 'mattoni+1.2', 0.3]), P('d3', ['wipe', 'contratti', 0.9])]),
        'S03': ov([P('t1', ['slam', 'stravolti', 0.35]), P('t2', ['slam', 'trasferimenti', 0.35]), P('sotto', ['wipe', 'servizi', 0.9])],),
        'S04': ov([P('t1', ['slam', 'soffio', 0.35]), P('t2', ['slam', 'soffio#2', 0.35]), P('sotto', ['wipe', 'dentro', 1.4])]),
        # tre mattoni con le parole si impilano
        'S05': anim_chiusura(0, [P('m3', ['drop', 0.3, 0.3]), P('m2', ['drop', 0.45, 0.3]), P('m1', ['drop', 0.6, 0.3])]),
    },
    ME: {
        # telegiornale: banda EDIZIONE STRAORDINARIA, poi il titolo
        'S01': ov([P('banda', ['slideL', 0.2, 0.4], fx=[['lampeggia', 0.6, 2.0, 0.5]]), P('t1', ['slam', 'previsioni', 0.35]),
                   P('t2', ['slam', 'corsia', 0.35]), P('sotto', ['wipe', 'settimana', 1.0]), P('firma', ['fade', 0.6, 0.8], fisso=True)], 0.5),
        # le quattro zone si accendono una alla volta, con le icone che si muovono
        'S02': pieno([P('t1', ['slam', 0.1, 0.35]), P('t2', ['slam', 0.35, 0.35]),
                      P('z1', ['pop', 'soccorso', 0.4], fx=[['trema', 'temporali', 'temporali+0.8', 6]]),
                      P('z2', ['pop', 'chirurgie', 0.4], fx=[['sposta', 'nebbia', 3.0, 8, 0]]),
                      P('z3', ['pop', 'grandinate', 0.4], fx=[['trema', 'grandinate+0.2', 'grandinate+1.0', 4]]),
                      P('z4', ['pop', 'ambulatori', 0.4], fx=[['ondeggia', 1.4, 1.2]])]),
        # allerta: tutto entra subito (fondo a righe diagonali), il riquadro trema su «puoi rientrare»
        'S03': pieno([P('banda', ['slideL', 0.0, 0.35], fx=[['lampeggia', 0.4, 1.6, 0.4]]), P('fenomeno', ['wipe', 0.3, 0.5]),
                      P('riquadro', ['pop', 0.5, 0.4], fx=[['trema', 'puoi', 'domani$', 7], ['pulsa', 'puoi', 0.6, 0.05, 'domani$+0.6']]),
                      P('consiglio', ['wipe', 0.8, 0.6])], urti=['puoi']),
        # schiarite: il sole spunta, le tre voci entrano con un ding
        'S04': pieno([P('nuvola', ['slideL', 0.0, 0.5]), P('sole', ['risale', 'schiarite', 0.8], fx=[['ondeggia', 6, 8]]),
                      P('t1', ['slam', 'schiarite', 0.4]), P('t2', ['slam', 'nordest', 0.35]),
                      P('c1', ['pop', 'corsi', 0.35]), P('c2', ['pop', 'cedolini', 0.35]), P('c3', ['pop', 'assistenza', 0.35]),
                      P('pillola', ['pop', 'temperature', 0.4], fx=[['pulsa', 'iscritti', 0.6, 0.06]])]),
        'S05': ov([P('t1', ['wipe', 'clima', 0.8]), P('t2', ['wipe', 'persone', 0.9]), P('sotto', ['wipe', 'periodo', 0.8])]),
        'S06': pieno([P('box', ['pop', 0.0, 0.25]), P('t1', ['slam', 0.1, 0.25]), P('t2', ['slam', 0.25, 0.25]),
                      P('s1', ['wipe', 0.35, 0.4]), P('ombrello', ['zoom', 0.45, 0.5], fx=[['ondeggia', 3, 3]])],
                     camera=[[0, 1.0, 540, 960], [13, 1.04, 540, 900]]),
    },
    UN: {
        'S01': ov([P('live', ['pop', 0.1, 0.3], fx=[['lampeggia', 0.5, 12, 0.8]]), P('diretta', ['pop', 0.3, 0.3]),
                   P('t1', ['slam', 'lunboxing', 0.35]), P('sotto', ['wipe', 'liscrizione', 1.0])], 0.4),
        # le card escono dalla scatola
        'S02': pieno([P('titolo', ['wipe', 0.1, 0.5]), P('c1', ['slideU', 'controllo', 0.6])]),
        'S03': pieno([P('titolo', ['wipe', 0.1, 0.5]), P('c1', ['slideU', 'corsi', 0.6]), P('c2', ['slideU', 'convenzioni', 0.6])]),
        'S04': pieno([P('titolo', ['wipe', 0.1, 0.5]), P('c1', ['slideU', 'assistenza', 0.5]), P('c2', ['slideU', 'patronato', 0.5]),
                      P('c3', ['slideU', 'squadra', 0.5], fx=[['trema', 'telefono', 'telefono+0.6', 5]])]),
        # la recensione: le stelle si accendono una alla volta
        'S05': pieno([P('titolo', ['slam', 0.1, 0.35]), *[P(f'st{i}', ['pop', f'stelle+{0.15 * (i - 1):.2f}', 0.3]) for i in range(1, 6)],
                      P('r1', ['wipe', 'voto', 0.6]), P('r2', ['wipe', 'rapporto', 0.6]), P('r3', ['wipe', 'servizio', 0.6]),
                      P('r4', ['wipe', 'unico', 0.6]), P('fine', ['wipe', 'attiva', 1.0])]),
        'S06': pieno([P('box', ['pop', 0.0, 0.25]), P('t1', ['slam', 0.1, 0.25]), P('t2', ['slam', 0.25, 0.25]),
                      P('s1', ['wipe', 0.35, 0.4]), P('s2', ['wipe', 0.5, 0.2]),
                      P('pillola', ['pop', 0.55, 0.3], fx=[['pulsa', 'like', 0.5, 0.08]])],
                     camera=[[0, 1.0, 540, 960], [13, 1.04, 540, 900]]),
    },
    QZ: {
        'S01': ov([P('luci', ['fade', 0.0, 0.3], fx=[['lampeggia', 0.3, 3.0, 0.3]]), P('t1', ['slam', 'quizzone', 0.35]),
                   P('t2', ['slam', 'corsia', 0.35]), P('sotto', ['wipe', 'vince', 1.0])], 0.4),
        # le risposte si scoprono mentre Ward le legge; quella giusta si illumina sul «risposta esatta»
        'S02': pieno([P('badge', ['pop', 0.1, 0.35]), P('domanda', ['wipe', 0.4, 0.8]),
                      P('r1', ['pop', 'cinquanta', 0.3]), P('r2', ['pop', 'cento', 0.3]), P('r3', ['pop', 'centocinquanta', 0.3]),
                      P('r4', ['pop', 'trecento', 0.3]), P('verde', ['fade', 'esatta', 0.2], fx=[['bagliore', 'esatta', 1.2], ['pulsa', 'esatta+1.2', 0.7, 0.03]]),
                      P('nota', ['wipe', 'azienda', 1.2])]),
        'S03': pieno([P('badge', ['pop', 0.1, 0.35]), P('domanda', ['wipe', 0.4, 0.8]),
                      P('r1', ['pop', 'sei', 0.3]), P('r2', ['pop', 'undici', 0.3]), P('r3', ['pop', 'otto', 0.3]),
                      P('r4', ['pop', 'dipende', 0.3], fx=[['trema', 'coordinatore', 'coordinatore+0.6', 5]]),
                      P('verde', ['fade', 'esatta', 0.2], fx=[['bagliore', 'esatta', 1.2]]), P('nota', ['wipe', 'incubo-2.6', 1.4])]),
        'S04': pieno([P('badge', ['pop', 0.1, 0.35]), P('domanda', ['wipe', 0.4, 0.8]),
                      P('r1', ['pop', 'gatto', 0.3]), P('r2', ['pop', 'loroscopo', 0.3]), P('r3', ['pop', 'cisl', 0.3]),
                      P('r4', ['pop', 'nessuno', 0.3]), P('verde', ['fade', 'esatta', 0.2], fx=[['bagliore', 'esatta', 1.2], ['pulsa', 'esatta+1.2', 0.7, 0.03]]),
                      P('nota', ['wipe', 'esatta+0.6', 1.0])], urti=['esatta+0.3']),
        'S05': ov([P('t1', ['slam', 'risposta', 0.35]), P('t2', ['slam', 'aiuto', 0.35]), P('sotto', ['wipe', 'telefonata', 0.8])]),
        'S06': pieno([P('box', ['pop', 0.0, 0.25]), P('t1', ['slam', 0.1, 0.25]), P('t2', ['slam', 0.25, 0.25]),
                      P('s1', ['wipe', 0.35, 0.4]), P('pillola', ['pop', 0.5, 0.3], fx=[['pulsa', 'chiamaci', 0.6, 0.08]])],
                     camera=[[0, 1.0, 540, 960], [13, 1.04, 540, 900]]),
    },
    AR: {
        'S01': ov([P('anno', ['slam', 'anno', 0.4], fx=[['bagliore', 'anno', 1.0]]), P('t1', ['wipe', 'archeologi', 0.8]),
                   P('t2', ['wipe', 'archeologi+0.5', 0.8]), P('sotto', ['wipe', 'scava', 1.0]), P('firma', ['fade', 0.6, 0.8], fisso=True)], 0.5),
        # la teca in luce, la targhetta che si scrive; zoom lento sul reperto
        'S02': pieno([P('targhetta', ['wipeD', 'dispositivo', 1.2])], camera=[[0, 1.0, 540, 960], [13, 1.12, 540, 720]]),
        'S03': pieno([P('targhetta', ['wipeD', 'zoccoli', 1.2])], camera=[[0, 1.0, 540, 960], [12.8, 1.16, 540, 700]]),
        'S04': ov([P('t1', ['slam', 'importante', 0.35]), P('t2', ['slam', 'tessera', 0.35], fx=[['bagliore', 'tessera', 1.2]]),
                   P('sotto', ['wipe', 'possedeva', 1.0]), P('s2', ['wipe', 'solo', 0.4])]),
        # la linea del tempo si disegna dall'alto, gli anni si accendono, l'ultima riga si scrive
        'S05': pieno([P('t1', ['slam', 0.1, 0.35]), P('t2', ['slam', 0.4, 0.35]), P('linea', ['wipeD', 0.7, 2.4]),
                      P('e1', ['wipe', 'duemilaventisei', 0.8]), P('e2', ['pop', 'resto', 0.35]), P('e3', ['pop', 'storia', 0.35]),
                      P('e4', ['wipe', 'scrivendo', 1.2])]),
        'S06': anim_chiusura(1),
    },
    PT: {
        'S01': ov([P('badge', ['pop', 0.3, 0.4]), P('t1', ['slam', 'bando', 0.35]), P('t2', ['slam', 'duemilaventisei', 0.35]),
                   P('sotto', ['wipe', 'padova', 0.9]), P('firma', ['fade', 0.6, 0.8], fisso=True)], 0.5),
        # l'orologio con la metà verde, poi i tre numeri sulle parole
        'S02': pieno([P('titolo', ['slam', 0.1, 0.35]), P('orologio', ['zoom', 0.2, 0.6], fx=[['ondeggia', 4, 2]]),
                      P('b1', ['pop', 'centotrentacinque', 0.35]), P('b2', ['pop', 'quattro', 0.35]), P('b3', ['pop', 'tre', 0.35]),
                      P('azienda', ['fade', 'duemilaventisei', 0.8])]),
        # le barre crescono da sinistra una alla volta
        'S03': pieno([P('t1', ['slam', 0.1, 0.35]), P('t2', ['slam', 0.35, 0.35]),
                      *[P(f'p{i}', ['wipe', w, 0.7]) for i, w in enumerate(
                          ('infermieri', 'diciannove', 'dodici', 'ostetriche', 'tecnici', 'fisioterapisti', 'molti', 'altri', 'profili'), 1)]]),
        # spunte verdi in sequenza, l'esclusione in rosso
        'S04': pieno([P('t1', ['slam', 0.1, 0.35]), P('t2', ['slam', 0.35, 0.35]),
                      P('c1', ['slideL', 'indeterminato', 0.4]), P('c2', ['slideL', 'servizio', 0.4]), P('c3', ['slideL', 'gia', 0.4]),
                      P('c4', ['pop', 'revisione', 0.4], fx=[['trema', 'revisione+0.3', 'revisione+0.9', 5]])]),
        # la classifica si compila dall'alto
        'S05': pieno([P('t1', ['slam', 0.1, 0.35]), P('t2', ['slam', 0.35, 0.35]),
                      *[P(f'r{i}', ['wipe', w, 0.5]) for i, w in enumerate(
                          ('patologie', 'lhandicap', 'lassistenza', 'familiari', 'disabilita', 'figli', 'figlio', 'tredici', 'leta', 'notti'), 1)],
                      P('nota', ['fade', 'notti+1.0', 0.6])]),
        # quattro avvisi, uno alla volta
        'S06': pieno([P('t1', ['slam', 0.1, 0.35]), P('t2', ['slam', 0.35, 0.35]),
                      P('a1', ['slideR', 'ferie', 0.4]), P('a2', ['slideR', 'incarico', 0.4]), P('a3', ['slideR', 'documenti', 0.4]),
                      P('a4', ['slideR', 'modello', 0.4])]),
        'S07': ov([P('titolo', ['wipe', 'consegna', 0.6]), P('m1', ['slideL', 'mano', 0.4]), P('m2', ['slideL', 'raccomandata', 0.4]),
                   P('m3', ['slideL', 'pec', 0.4]), P('fine', ['wipe', 'controllare', 1.0])]),
        'S08': pieno([P('box', ['pop', 0.0, 0.25]), P('t1', ['slam', 0.1, 0.25]), P('t2', ['slam', 0.25, 0.25]),
                      P('s1', ['wipe', 0.35, 0.4]), P('scadenza', ['pop', 0.5, 0.3], fx=[['pulsa', 'tempi', 0.8, 0.05]])],
                     camera=[[0, 1.0, 540, 960], [16, 1.04, 540, 900]]),
    },
}


def verifica(pg):
    """tutte le parole-ancora devono esistere nella voce tagliata."""
    import json
    sys.path.insert(0, os.path.join(os.path.dirname(QUI), 'halloween'))
    from suoni import ancora
    pa = json.load(open(f'{PR}/{pg}/audio/parole.json')); male = []

    def giro(x, sid):
        if isinstance(x, dict):
            for k, v in x.items():
                if k in ('in', 'out') and isinstance(v[1], str):
                    try: ancora(v[1], pa[sid])
                    except Exception: male.append((sid, v[1]))
                if k == 'fx':
                    for fx in v:
                        for y in fx[1:]:
                            if isinstance(y, str):
                                try: ancora(y, pa[sid])
                                except Exception: male.append((sid, y))
                giro(v, sid)
        elif isinstance(x, list):
            for y in x: giro(y, sid)
    for sid, sc in ANIM[pg].items():
        giro(sc, sid)
        for c in sc.get('camera', []):
            if isinstance(c[0], str):
                try: ancora(c[0], pa[sid])
                except Exception: male.append((sid, c[0]))
    return male


if __name__ == '__main__':
    import json
    for pg, a in ANIM.items():
        os.makedirs(f'{PR}/{pg}/grafica', exist_ok=True)
        json.dump(a, open(f'{PR}/{pg}/grafica/anim.json', 'w'), ensure_ascii=False, indent=0)
        print(pg, list(a), 'ancore mancanti:', verifica(pg))
