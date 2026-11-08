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
TR = 'pdro-tracciamento-segnalazioni-aoup'
LG = 'pdro-turni-12-ore-librogame'
K3 = [(530, 640), (730, 887), (930, 1087), (1130, 1287)]        # le quattro card di «La nostra linea» (S03B)
P6 = [(500, 603), (624, 773), (794, 943), (964, 1113), (1134, 1283)]  # le cinque priorità (S06)


def B(pz):
    """pezzo preso dalla seconda grafica della scena (S03B)."""
    return {**pz, 'src': 'grafiche/S03B.png'}


def scheda(n, y0, y1, xb, xbadge=None):
    """card di tracciamento: bollino e barra si ritagliano prima (figli), poi la card intera."""
    return [C(f'bol{n}', 86, y0 + 125, (xbadge or 0) or 600, y0 + 184, 26), R(f'bar{n}', 86, y0 + 212, xb + 8, y0 + 257),
            C(f'card{n}', 46, y0 - 6, 1034, y1 + 9, 28)]


def anim_scheda(n, entra, barra, bollino, fx=None, fuori=None):
    return [P(f'card{n}', ['slideL', entra, 0.45], fuori, figli=[
        P(f'bar{n}', ['wipe', barra, 0.9]), P(f'bol{n}', ['pop', bollino, 0.35], fx=fx)])]




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
    TR: {
        'S01': {'base': 'overlay_clip/S01A.png', 'pezzi': [
            CH('badge', 70, 1104, 520, 1198, 120, 8), CH('t1', 70, 1226, 460, 1314, 120, 14), CH('t2', 70, 1330, 880, 1419, 120, 14),
            CH('sotto', 70, 1452, 530, 1526, 110, 12), CH('firma', 320, 1848, 1060, 1884, 100, 3), *BANDE]},
        'S02': {'base': 'grafiche/S02A.png', 'pezzi': [R('titolo', 60, 288, 760, 350), *scheda(1, 426, 825, 694), *scheda(2, 866, 1305, 694)]},
        'S03': {'base': 'grafiche/S03A.png', 'fondi': {'fondoA': 'grafiche/S03A.png', 'fondoB': 'grafiche/S03B.png'}, 'pezzi': [
            *scheda(1, 426, 865, 411),
            *[B(R(f'{n}', 60, y0, 900, y1, 'righe')) for n, y0, y1 in [('t1', 285, 362), ('t2', 376, 446)]],
            *[B({'id': f'v{i}', 'm': ['verde', 92, (y0 + y1) // 2 - 34, 172, (y0 + y1) // 2 + 34]}) for i, (y0, y1) in enumerate(K3, 1)],
            *[B(C(f'k{i}', 64, y0 - 6, 1016, y1 + 6, 26, 'righe')) for i, (y0, y1) in enumerate(K3, 1)],
            B(R('si', 150, 1350, 930, 1412, 'righe')), B(R('no', 150, 1420, 930, 1478, 'righe'))]},
        'S04': {'base': 'grafiche/S04A.png', 'pezzi': [R('titolo', 60, 288, 760, 350), *scheda(1, 426, 865, 694), *scheda(2, 906, 1345, 694)]},
        'S05': {'base': 'grafiche/S05A.png', 'pezzi': [R('titolo', 60, 288, 760, 350), *scheda(1, 426, 825, 411),
                                                         *scheda(2, 866, 1265, 425, 545)]},
        'S06': {'base': 'grafiche/S06A.png', 'pezzi': [
            R('t1', 66, 294, 560, 366), R('t2', 66, 370, 500, 456),
            *[{'id': f'v{i}', 'm': ['verde', 92, y0 + 18, 160, y0 + 80]} for i, (y0, y1) in enumerate(P6, 1)],
            *[C(f'r{i}', 66, y0 - 3, 1015, y1 + 3, 18) for i, (y0, y1) in enumerate(P6, 1)]]},
        'S07': {'base': 'overlay_clip/S07A.png', 'pezzi': [
            CH('t1', 70, 1251, 830, 1344, 120, 14), CH('t2', 70, 1357, 350, 1425, 120, 14),
            CH('s1', 70, 1470, 820, 1544, 110, 12), CH('s2', 70, 1546, 510, 1608, 110, 12), *BANDE]},
        'S08': {'base': 'grafiche/S08A.png', 'pezzi': [
            CH('t1', 30, 262, 860, 368, 150, 18), CH('t2', 30, 376, 880, 472, 120, 18), CH('s1', 40, 486, 980, 566, 120, 16),
            C('bottone', 64, 612, 770, 716, 45, 'diffusione'), C('box', 58, 892, 648, 1158, 24, 'diffusione')]},
    },
    LG: {
        'S01': {'base': 'overlay_clip/S01A.png', 'pezzi': [
            CH('badge', 70, 1104, 410, 1198, 120, 8), CH('t1', 70, 1225, 480, 1314, 120, 14), CH('t2', 70, 1330, 840, 1419, 120, 14),
            CH('sotto', 70, 1455, 620, 1530, 110, 12), CH('firma', 320, 1848, 1060, 1884, 100, 3), *BANDE]},
        'S02': {'base': 'grafiche/S02A.png', 'pezzi': [
            R('pag', 395, 325, 720, 385), R('titolo', 175, 412, 405, 492), R('domanda', 172, 588, 720, 740),
            C('b1', 150, 846, 918, 1180, 24), C('b2', 146, 1204, 910, 1542, 24), R('nota', 200, 1588, 835, 1709), {'id': 'coda', 'riempi': 'tinta', 'm': ['rosso', 520, 1700, 680, 1722]}]},
        'S03': {'base': 'grafiche/S03A.png', 'pezzi': [
            R('pag', 390, 326, 725, 380), R('titolo', 178, 418, 925, 558),
            R('s1', 170, 604, 905, 766), R('s2', 163, 767, 900, 985), R('s3', 158, 986, 895, 1147), R('s4', 152, 1147, 895, 1300),
            R('nota', 185, 1606, 866, 1690)]},
        'S04': {'base': 'grafiche/S04A.png', 'pezzi': [
            R('pag', 395, 325, 720, 385), R('titolo', 178, 418, 815, 552), R('script', 170, 615, 890, 870),
            C('p1', 158, 1028, 916, 1180, 60), C('p2', 153, 1186, 913, 1342, 60), C('p3', 148, 1345, 909, 1500, 60)]},
        'S05': {'base': 'grafiche/S05A.png', 'pezzi': [
            {'id': 'fine', 'riempi': 'tinta', 'm': ['rosso', 225, 1025, 875, 1238]},
            {'id': 'timbro', 'riempi': 'tinta', 'm': ['rosso', 200, 1240, 885, 1585]},
            R('pag', 350, 322, 692, 392), R('titolo', 145, 422, 768, 512), R('script', 150, 598, 900, 858)]},
        'S06': {'base': 'grafiche/S06A.png', 'pezzi': [
            R('t1', 66, 268, 640, 372, 'righe'), R('t2', 66, 385, 645, 472, 'righe'), R('sub', 66, 488, 845, 542, 'righe'),
            *[C(f'r{i}', 62, c - 80, 1018, c + 80, 18, 'righe') for i, c in enumerate((656, 827, 1000, 1172, 1344), 1)]]},
        'S07': {'base': 'overlay_clip/S07A.png', 'pezzi': [
            CH('t1', 70, 1256, 450, 1330, 120, 14), CH('t2', 70, 1350, 440, 1425, 120, 14), CH('s1', 70, 1470, 790, 1540, 110, 12),
            *BANDE]},
        'S08': {'base': 'grafiche/S08A.png', 'pezzi': [
            CH('t1', 30, 262, 900, 368, 150, 18), CH('t2', 30, 374, 1030, 452, 120, 18),
            *[C(f'f{i}', 64, y0 - 5, 808, y1 + 5, 40, 'diffusione') for i, (y0, y1) in enumerate([(601, 679), (695, 774), (790, 870)], 1)],
            C('box', 58, 892, 648, 1158, 24, 'diffusione')]},
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
    TR: {
        'S01': ov([P('badge', ['pop', 0.3, 0.4]), P('t1', ['slam', 'ecco', 0.35]), P('t2', ['slam', 'segnalazioni', 0.35]),
                   P('sotto', ['wipe', 'punto', 0.9]), P('firma', ['fade', 0.6, 0.8], fisso=True)], 0.5),
        # le schede entrano, la barra si riempie fino allo stato, poi il bollino
        'S02': pieno([P('titolo', ['slam', 0.1, 0.35]), *anim_scheda(1, 'uno', 'sciopero', 'verifichiamo'),
                      *anim_scheda(2, 'due', 'infettive', 'parziale')], camera=[[0, 1.0, 540, 960], [24, 1.04, 540, 900]]),
        'S03': {'tipo': 'pieno', 'fondi': [['fondoA', 0], ['fondoB', 'linea-0.2', 0.3]], 'strati': [
            *anim_scheda(1, 0.2, 'transito', 'tavolo', fuori=['fade', 'linea-0.2', 0.3]),
            P('t1', ['slam', 'linea', 0.35]), P('t2', ['slam', 'linea+0.3', 0.35]),
            *[P(f'k{i}', ['slideL', w, 0.4], figli=[P(f'v{i}', ['pop', f'{w}+0.35', 0.3])])
              for i, w in enumerate(('rispetto', 'regole', 'possibilita', 'nessuna'), 1)],
            P('si', ['fade', 'vestizione', 0.5]), P('no', ['slam', 'consegna+0.2', 0.35])]},
        'S04': pieno([P('titolo', ['slam', 0.1, 0.35]), *anim_scheda(1, 'quattro', 'pediatria', 'lavorazione'),
                      *anim_scheda(2, 'sale', 'operatorie', 'chiamate')], camera=[[0, 1.0, 540, 960], [18, 1.04, 540, 900]]),
        'S05': pieno([P('titolo', ['slam', 0.1, 0.35]),
                      *anim_scheda(1, 'sei', 'cric', 'rinviata', fx=[['trema', 'rinviata+0.3', 'rinviata+0.9', 5]]),
                      *anim_scheda(2, 'sette', 'radiologie', 'attesa', fx=[['pulsa', 'attesa+0.4', 0.9, 0.05]])],
                     camera=[[0, 1.0, 540, 960], [20, 1.04, 540, 900]]),
        # le cinque priorità si spuntano una alla volta
        'S06': pieno([P('t1', ['slam', 0.1, 0.35]), P('t2', ['slam', 0.35, 0.35]),
                      *[P(f'r{i}', ['slideL', w, 0.4], figli=[P(f'v{i}', ['pop', f'{w}+0.35', 0.3])])
                        for i, w in enumerate(('sicurezza', 'rispetto', 'organizzazione', 'ascolto', 'attenzione'), 1)]]),
        'S07': ov([P('t1', ['slam', 'continuiamo', 0.35]), P('t2', ['slam', 'segnalazioni', 0.35]),
                   P('s1', ['wipe', 'verificare', 1.0]), P('s2', ['wipe', 'tavolo', 0.8])]),
        'S08': pieno([P('box', ['pop', 0.0, 0.25]), P('t1', ['slam', 0.1, 0.25]), P('t2', ['slam', 0.25, 0.25]),
                      P('s1', ['wipe', 0.35, 0.4]), P('bottone', ['pop', 0.5, 0.3], fx=[['pulsa', 'continuate', 0.8, 0.05]])],
                     camera=[[0, 1.0, 540, 960], [15, 1.04, 540, 900]]),
    },
    LG: {
        'S01': ov([P('badge', ['pop', 0.3, 0.4]), P('t1', ['slam', 'storia', 0.35]), P('t2', ['slam', 'tu', 0.35]),
                   P('sotto', ['wipe', 'infermiere', 0.9]), P('firma', ['fade', 0.6, 0.8], fisso=True)], 0.5),
        # pagina 1: i due riquadri si accendono a turno
        'S02': pieno([P('pag', ['pop', 0.0, 0.35]), P('titolo', ['slam', 0.15, 0.35]), P('domanda', ['wipe', 0.3, 1.2]),
                      P('b1', ['pop', 'provare', 0.4], fx=[['pulsa', 'entrambe', 0.9, 0.04]]),
                      P('b2', ['pop', 'preferisci', 0.4], fx=[['pulsa', 'giuste', 0.9, 0.04]]),
                      P('nota', ['wipe', 'giuste', 1.2]), P('coda', ['fade', 'giuste+0.9', 0.3])],
                     camera=[[0, 1.0, 540, 960], [14, 1.04, 540, 960]]),
        'S03': pieno([P('pag', ['pop', 0.0, 0.35]), P('titolo', ['slam', 0.3, 0.35]),
                      *[P(f's{i}', ['slideL', w, 0.45]) for i, w in enumerate(('richiesta', 'direzioni', 'passaggi', 'verifica'), 1)],
                      P('nota', ['wipe', 'lavoratori', 1.0])], camera=[[0, 1.0, 540, 960], [20, 1.04, 540, 960]]),
        'S04': pieno([P('pag', ['pop', 0.0, 0.35]), P('titolo', ['slam', 0.3, 0.35]), P('script', ['wipe', 'chi', 2.0]),
                      *[P(f'p{i}', ['pop', w, 0.4]) for i, w in enumerate(('imposto', 'irreversibile', 'stesse'), 1)]],
                     camera=[[0, 1.0, 540, 960], [16, 1.04, 540, 960]]),
        # la pagina trappola: FINE? in rosso, timbro NON VALE con colpo secco
        'S05': pieno([P('pag', ['pop', 0.0, 0.35]), P('titolo', ['slam', 'trappola', 0.35], fx=[['trema', 'trappola+0.3', 'trappola+1.2', 4]]),
                      P('script', ['wipe', 'qualcuno', 2.2]),
                      P('fine', ['slam', 'consegna+0.2', 0.35], fx=[['trema', 'consegna+0.5', 'questa', 5]]),
                      P('timbro', ['stampa', 'vale', 0.3])], urti=['vale+0.2'], camera=[[0, 1.0, 540, 960], [18, 1.05, 540, 960]]),
        'S06': pieno([P('t1', ['slam', 0.1, 0.35]), P('t2', ['slam', 'regole', 0.35]), P('sub', ['wipe', 'regolamento', 0.8]),
                      *[P(f'r{i}', ['drop', w, 0.4]) for i, w in enumerate(('criteri', 'rispetto', 'attenzione', 'possibilita', 'coinvolgimento'), 1)]]),
        'S07': ov([P('t1', ['slam', 'libro', 0.35]), P('t2', ['slam', 'finale', 0.35]), P('s1', ['wipe', 'libera', 1.0])]),
        'S08': pieno([P('box', ['pop', 0.0, 0.25]), P('t1', ['slam', 0.1, 0.25]), P('t2', ['slam', 0.25, 0.25]),
                      *[P(f'f{i}', ['slideL', 0.3 + 0.1 * i, 0.3], fx=[['pulsa', w, 0.8, 0.05]])
                        for i, w in enumerate(('rispetta', 'applicano', 'condividono'), 1)]],
                     camera=[[0, 1.0, 540, 960], [17, 1.04, 540, 900]]),
    },
}


# ---- Serie «Convenzioni CISL FP» (novembre 2026, provinciale): otto reel da cinque scene, chiusura con il riquadro dei
# delegati dei tre territori (../convenzioni/contatti.mjs). Righe dei titoli rilevate sui PNG del pacchetto.
CV = {i: f'pdro-convenzioni-{i}-{s}' for i, s in enumerate(['colpa-grave', 'fondo-sanitario', 'medico-h24', 'formazione',
                                                             'tempo-libero', 'acquisti', 'digitale', 'quanto-vale-la-tessera'], 1)}
_OV1 = {1: (458, (1235, 1304, 671), (1340, 1409, 810), (1467, 1509, 614)), 2: (525, (1236, 1303, 547), (1340, 1409, 749), (1467, 1522, 661)),
        3: (458, (1236, 1303, 432), (1340, 1409, 569), (1467, 1510, 700)), 4: (458, (1235, 1304, 541), (1340, 1409, 985), (1470, 1523, 648)),
        5: (458, (1235, 1304, 673), (1340, 1409, 725), (1470, 1514, 438)), 6: (458, (1235, 1304, 887), (1340, 1409, 618), (1463, 1521, 648)),
        7: (458, (1235, 1304, 688), (1340, 1409, 559), (1467, 1514, 834)), 8: (458, (1235, 1320, 830), (1340, 1409, 852), (1466, 1509, 447))}
# overlay della seconda illustrazione: (scena, righe)
_OV2 = {1: ('S03', [(1266, 1334, 762), (1356, 1429, 928), (1479, 1533, 817), (1561, 1606, 639)]),
        2: ('S04', [(1266, 1320, 432), (1356, 1429, 999), (1480, 1535, 779)]),
        3: ('S03', [(1261, 1331, 781), (1356, 1429, 654), (1480, 1533, 796), (1552, 1595, 330)]),
        4: ('S04', [(1261, 1334, 744), (1356, 1429, 914), (1481, 1535, 751)]),
        5: ('S04', [(1261, 1321, 778), (1357, 1422, 1001), (1480, 1535, 957), (1555, 1593, 237)]),
        6: ('S03', [(1266, 1321, 673), (1353, 1406, 1005), (1478, 1533, 905)]),
        7: ('S04', [(1261, 1334, 446), (1356, 1429, 734), (1477, 1528, 948), (1556, 1593, 170)]),
        8: ('S04', [(1261, 1320, 514), (1361, 1429, 817), (1481, 1523, 583)])}
# chiusura S05: righe di titolo e sottotitolo (le ultime una o due sono la scritta a mano)
_CH = {1: [(284, 351, 761), (389, 456, 780), (502, 556, 918)], 2: [(284, 351, 713), (389, 456, 882), (502, 556, 931), (574, 617, 363)],
       3: [(284, 365, 632), (389, 456, 674), (499, 546, 575)], 4: [(284, 351, 565), (389, 456, 685), (499, 557, 955), (576, 618, 197)],
       5: [(284, 351, 562), (365, 456, 560), (501, 553, 988)], 6: [(284, 351, 877), (385, 442, 1004), (500, 557, 671)],
       7: [(285, 350, 427), (365, 456, 639), (498, 548, 802), (575, 617, 418)], 8: [(284, 351, 667), (389, 456, 836), (502, 546, 409)]}


def _ov1(i):
    bx, r1, r2, r3 = _OV1[i]
    return {'base': 'overlay_clip/S01A.png', 'pezzi': [
        CH('badge', 70, 1104, bx + 70, 1198, 120, 8), CH('t1', 70, r1[0] - 10, r1[2] + 30, r1[1] + 10, 120, 14),
        CH('t2', 70, r2[0] - 10, r2[2] + 30, r2[1] + 10, 120, 14), CH('sotto', 70, r3[0] - 10, r3[2] + 30, r3[1] + 10, 110, 12),
        CH('firma', 320, 1848, 1060, 1884, 100, 3), *BANDE]}


def _ov2(i):
    sid, rr = _OV2[i]
    nomi = ['t1', 't2', 's1', 's2']
    return sid, {'base': f'overlay_clip/{sid}A.png', 'pezzi': [
        CH(nomi[k], 70, y0 - 10, x1 + 30, y1 + 10, 120 if k < 2 else 110, 14 if k < 2 else 12) for k, (y0, y1, x1) in enumerate(rr)] + BANDE}


def _ch(i):
    rr = _CH[i]; pz = [CH('t1', 30, rr[0][0] - 12, rr[0][2] + 40, rr[0][1] + 12, 150, 18), CH('t2', 30, rr[1][0] - 12, rr[1][2] + 40, rr[1][1] + 12, 120, 18)]
    pz += [CH(f's{k}', 40, y0 - 10, x1 + 40, y1 + 10, 120, 16) for k, (y0, y1, x1) in enumerate(rr[2:], 1)]
    return {'base': 'grafiche/S05A.png', 'pezzi': pz + [C('box', 52, 874, 1028, 1258, 32, 'diffusione')]}


def _anim_ov1(w1, w2, w3):
    return ov([P('badge', ['pop', 0.3, 0.4]), P('t1', ['slam', w1, 0.35]), P('t2', ['slam', w2, 0.35]),
               P('sotto', ['wipe', w3, 0.9]), P('firma', ['fade', 0.6, 0.8], fisso=True)], 0.5)


def _anim_ov2(i, ws):
    n = len(_OV2[i][1]); nomi = ['t1', 't2', 's1', 's2']
    return ov([P(nomi[k], ['slam' if k < 2 else 'wipe', ws[k], 0.35 if k < 2 else 0.9]) for k in range(n)])


def _anim_ch(i, durata):
    n = len(_CH[i]) - 2
    return pieno([P('box', ['pop', 0.0, 0.25]), P('t1', ['slam', 0.1, 0.25]), P('t2', ['slam', 0.25, 0.25]),
                  *[P(f's{k}', ['wipe', 0.35 + 0.1 * k, 0.4]) for k in range(1, n + 1)]],
                 camera=[[0, 1.0, 540, 960], [durata, 1.04, 540, 900]])


def _righe(prefisso, rr, x0=66, x1=1015, r=20, m=4, riempi='tinta'):
    return [C(f'{prefisso}{k}', x0, y0 - m, x1, y1 + m, r, riempi) for k, (y0, y1) in enumerate(rr, 1)]


def _spunte(rr, x0=78, x1=160):
    return [{'id': f'v{k}', 'm': ['verde', x0, y0, x1, y1]} for k, (y0, y1) in enumerate(rr, 1)]


def _inchiostro(rr, soglia=130):
    return [{'id': f'l{k}', 'riempi': 'tinta', 'm': ['scuro', x0 - 6, y0 - 6, x1 + 6, y1 + 6, soglia]} for k, (x0, y0, x1, y1) in enumerate(rr, 1)]


_LETTERA = [(179, 324, 761, 397), (173, 448, 636, 501), (173, 577, 948, 641), (164, 717, 961, 777), (159, 858, 685, 900),
            (155, 987, 632, 1034), (150, 1124, 689, 1181), (145, 1254, 505, 1304), (141, 1386, 693, 1449), (598, 1578, 928, 1622)]
_SCONTRINO = [(387, 415), (469, 497), (551, 579), (632, 661), (716, 750), (796, 832), (877, 914), (959, 996), (1042, 1071), (1124, 1153)]
_SARA = [(470, 443, 572), (750, 726, 852), (1030, 1003, 1092), (1310, 1288, 1372)]     # (centro del pallino, testo y0, y1)
_CASA = [(470, 448, 572), (750, 728, 852), (1030, 1003, 1132), (1310, 1283, 1412)]


def _giornata(voci):
    pz = []
    for k, (cy, y0, y1) in enumerate(voci, 1):
        pz += [R(f'h{k}', 12, cy + 44, 170, cy + 107), {'id': f'p{k}', 'riempi': 'tinta', 'm': ['cerchio', 180, cy, 35]},
               R(f'x{k}', 212, y0 - 8, 1016, y1 + 8)]
    return pz


EPISODI.update({
    CV[1]: {'S01': _ov1(1), _ov2(1)[0]: _ov2(1)[1], 'S05': _ch(1),
            'S02': {'base': 'grafiche/S02A.png', 'pezzi': [R('t1', 60, 288, 770, 344), R('t2', 60, 362, 560, 425),
                                                          *_righe('c', [(470, 681), (700, 911), (930, 1141), (1160, 1371)])]},
            'S04': {'base': 'grafiche/S04A.png', 'pezzi': [R('t1', 60, 285, 730, 365), R('t2', 60, 385, 810, 465),
                                                          *_righe('c', [(520, 691), (715, 886), (910, 1081), (1125, 1286)])]}},
    CV[2]: {'S01': _ov1(2), _ov2(2)[0]: _ov2(2)[1], 'S05': _ch(2),
            'S02': {'base': 'grafiche/S02A.png', 'pezzi': _inchiostro(_LETTERA)},
            'S03': {'base': 'grafiche/S03A.png', 'pezzi': [R('t1', 60, 290, 590, 359), R('t2', 60, 369, 460, 438),
                                                          *_spunte([(y0 + 10, y1 - 10) for y0, y1 in [(470 + 106 * k, 563 + 106 * k) for k in range(7)]]),
                                                          *_righe('r', [(470 + 106 * k, 563 + 106 * k) for k in range(7)], m=3),
                                                          C('box', 66, 1228, 1015, 1387, 22)]}},
    CV[3]: {'S01': _ov1(3), _ov2(3)[0]: _ov2(3)[1], 'S05': _ch(3),
            'S02': {'base': 'grafiche/S02A.png', 'pezzi': [
                {'id': 'orologio', 'riempi': 'tinta', 'm': ['cerchio', 540, 560, 258]},
                {'id': 'barra', 'riempi': 'tinta', 'm': ['rosso', 95, 1205, 985, 1242]},
                *_righe('o', [(900, 1011), (1035, 1146), (1170, 1281)], 84, 997, 50), R('oppure', 380, 1295, 712, 1410)]},
            'S04': {'base': 'grafiche/S04A.png', 'pezzi': [R('t1', 60, 276, 300, 359), R('t2', 60, 355, 330, 438),
                                                          *_righe('c', [(480, 717), (746, 905), (934, 1132)])]}},
    CV[4]: {'S01': _ov1(4), _ov2(4)[0]: _ov2(4)[1], 'S05': _ch(4),
            'S02': {'base': 'grafiche/S02A.png', 'pezzi': [R('t1', 60, 275, 620, 356), R('t2', 60, 369, 800, 435),
                                                          *[C(f'k{k}', x0, y0, x1, y1, 26) for k, (x0, y0, x1, y1) in enumerate(
                                                              [(64, 514, 524, 827), (552, 514, 1014, 827), (64, 854, 524, 1167),
                                                               (552, 854, 1014, 1167), (64, 1194, 524, 1507), (552, 1194, 1014, 1507)], 1)]]},
            'S03': {'base': 'grafiche/S03A.png', 'pezzi': [R('titolo', 130, 262, 960, 345),
                                                          {'id': 'barra', 'riempi': 'tinta', 'm': ['rosso', 240, 548, 505, 618]},
                                                          R('carte', 60, 440, 1080, 1485)]}},
    CV[5]: {'S01': _ov1(5), _ov2(5)[0]: _ov2(5)[1], 'S05': _ch(5),
            'S02': {'base': 'grafiche/S02A.png', 'pezzi': [R('timbro', 770, 805, 975, 1032), R('cart', 20, 274, 1062, 1638)]},
            'S03': {'base': 'grafiche/S03A.png', 'pezzi': [
                {'id': 'sotto', 'src': 'grafiche/S02A.png', 'buca': False, 'm': ['rect', 20, 274, 1062, 1638]},
                R('timbro', 770, 805, 975, 1032), R('cart', 20, 274, 1062, 1638)]}},
    CV[6]: {'S01': _ov1(6), _ov2(6)[0]: _ov2(6)[1], 'S05': _ch(6),
            'S02': {'base': 'grafiche/S02A.png', 'pezzi': [R('titolo', 60, 298, 930, 368), *_giornata(_SARA)]},
            'S04': {'base': 'grafiche/S04A.png', 'pezzi': [R('titolo', 60, 298, 650, 378), *_giornata(_CASA)]}},
    CV[7]: {'S01': _ov1(7), _ov2(7)[0]: _ov2(7)[1], 'S05': _ch(7),
            'S02': {'base': 'grafiche/S02A.png', 'pezzi': [R('t1', 60, 250, 1020, 350), R('t2', 60, 354, 1020, 452),
                                                          *_righe('f', [(540, 661), (690, 811), (840, 961), (990, 1111), (1140, 1261)], 84, 997, 22)]},
            'S03': {'base': 'grafiche/S03A.png', 'pezzi': [R('t1', 60, 290, 610, 359), R('t2', 60, 369, 440, 438),
                                                          *_righe('c', [(500, 725), (764, 989)]), C('arancio', 66, 1024, 1015, 1143, 56)]}},
    CV[8]: {'S01': _ov1(8), _ov2(8)[0]: _ov2(8)[1], 'S05': _ch(8),
            'S02': {'base': 'grafiche/S02A.png', 'pezzi': [R('testa', 200, 246, 890, 340),
                                                          *[R(f'r{k}', 200, y0 - 12, 880, y1 + 12) for k, (y0, y1) in enumerate(_SCONTRINO, 1)],
                                                          R('chi', 200, 1225, 880, 1300)]},
            'S03': {'base': 'grafiche/S03A.png', 'pezzi': [R('t1', 60, 282, 670, 353), R('t2', 60, 382, 420, 453), R('t3', 60, 482, 710, 554),
                                                          *_spunte([(y0 + 12, y1 - 12) for y0, y1 in [(640 + 135 * k, 751 + 135 * k) for k in range(5)]], 80, 150),
                                                          *_righe('r', [(640 + 135 * k, 751 + 135 * k) for k in range(5)], r=48, m=3)]}},
})


def _fila(pref, parole, tipo='slideL', d=0.4, spunte=False):
    out = []
    for k, w in enumerate(parole, 1):
        out.append(P(f'{pref}{k}', [tipo, w, d], figli=[P(f'v{k}', ['pop', f'{w}+0.35', 0.3])] if spunte else None))
    return out


def _giorno(parole):
    out = []
    for k, w in enumerate(parole, 1):
        out += [P(f'p{k}', ['pop', w, 0.3]), P(f'h{k}', ['slideL', f'{w}+0.1', 0.35]), P(f'x{k}', ['wipe', f'{w}+0.2', 0.6])]
    return out


ANIM.update({
    CV[1]: {'S01': _anim_ov1('signore', 'benvenuti', 'decollo'), 'S03': _anim_ov2(1, ['paracadute', 'polizza', 'franchigie', 'sorprese']),
            'S05': _anim_ch(1, 14),
            'S02': pieno([P('t1', ['slam', 0.1, 0.35]), P('t2', ['wipe', 0.3, 0.8]), *_fila('c', ['turni', 'colpa', 'senza', 'tasca+0.6'], 'slideR')]),
            'S04': pieno([P('t1', ['slam', 0.1, 0.35]), P('t2', ['slam', 'paracadute', 0.35]), *_fila('c', ['iscritto', 'accedi', 'attivi'], 'slideL'),
                          P('c4', ['pop', 'libera', 0.4])])},
    CV[2]: {'S01': _anim_ov1('cara', 'scrivo', 'pensione'), 'S04': _anim_ov2(2, ['tempo', 'salute', 'firmato']), 'S05': _anim_ch(2, 14),
            'S02': pieno([P('l1', ['wipe', 0.0, 0.7]), P('l2', ['wipe', 0.5, 0.7]),
                          *[P(f'l{k}', ['wipe', w, 1.0]) for k, w in zip(range(3, 10), ['iscrivesti', 'vita', 'carenza', 'qualunque', 'famiglia', 'detraibile', 'detraibile+1.0'])],
                          P('l10', ['fade', 'detraibile+1.8', 0.6])], camera=[[0, 1.0, 540, 960], [15, 1.04, 540, 960]]),
            'S03': pieno([P('t1', ['slam', 0.1, 0.35]), P('t2', ['slam', 0.3, 0.35]),
                          *_fila('r', ['visite', 'ricoveri', 'ricoveri$', 'prevenzione', 'fisioterapia', 'dentale', 'telemedicina'], spunte=True),
                          P('box', ['pop', 'migliaia', 0.4])])},
    CV[3]: {'S01': _anim_ov1('tre', 'notte', 'febbre'), 'S03': _anim_ov2(3, ['lapp', 'medico', 'notte', 'strutture']), 'S05': _anim_ch(3, 12),
            'S02': pieno([P('orologio', ['zoom', 0.0, 0.5]), *_fila('o', ['aspettare', 'correre', 'peggiore'], 'slideL'),
                          P('barra', ['wipe', 'internet+0.2', 0.5]), P('oppure', ['wipe', 'oppure#2', 0.8])], urti=['internet+0.4']),
            'S04': pieno([P('t1', ['slam', 0.1, 0.35]), P('t2', ['slam', 0.3, 0.35]), *_fila('c', ['tutto', 'xte', 'alpifarma'], 'slideU', 0.45)])},
    CV[4]: {'S01': _anim_ov1('benvenuti', 'carriera', 'dadi'), 'S04': _anim_ov2(4, ['mossa', 'consigliamo', 'master']), 'S05': _anim_ch(4, 13),
            'S02': pieno([P('t1', ['slam', 0.1, 0.35]), P('t2', ['slam', 0.3, 0.35]),
                          *[P(f'k{k}', ['pop', w, 0.35]) for k, w in enumerate(['iul', 'izeos', 'unitelma', 'unifortunato', 'ecm', 'inglese'], 1)]]),
            'S03': pieno([P('titolo', ['slam', 0.1, 0.35]), P('carte', ['drop', 'carta', 0.45], figli=[P('barra', ['wipe', 'imprevisti+0.4', 0.4])])],
                         urti=['imprevisti+0.6'])},
    CV[5]: {'S01': _anim_ov1('riposo', 'sacro', 'cartoline'), 'S04': _anim_ov2(5, ['saluti', 'weroad', 'trekking', 'zampe']), 'S05': _anim_ch(5, 14),
            'S02': pieno([P('cart', ['vola', 0.0, 0.7], figli=[P('timbro', ['stampa', 'flash', 0.3])])], urti=['flash+0.2']),
            'S03': pieno([P('sotto'), P('cart', ['vola', 0.0, 0.7], figli=[P('timbro', ['stampa', 'bitq', 0.3])])], urti=['bitq+0.2'])},
    CV[6]: {'S01': _anim_ov1('otto', 'minuto', 'sara'), 'S03': _anim_ov2(6, ['venti', 'eataly', 'calabria']), 'S05': _anim_ch(6, 15),
            'S02': pieno([P('titolo', ['slam', 0.1, 0.35]), *_giorno(['nove', 'dieci', 'piadina', 'capo'])]),
            'S04': pieno([P('titolo', ['slam', 0.1, 0.35]), *_giorno(['luce', 'depuratore', 'piattaforma', 'lauto'])])},
    CV[7]: {'S01': _anim_ov1('mezzanotte', 'schermo', 'pec'), 'S04': _anim_ov2(7, ['digitale', 'paura', 'domande', 'clic']), 'S05': _anim_ch(7, 12),
            'S02': pieno([P('t1', ['neon', 0.1, 0.6]), P('t2', ['neon', 0.4, 0.6]),
                          *_fila('f', ['password', 'codici', 'file', 'sessione', 'spiegazioni'], 'neon', 0.5)]),
            'S03': pieno([P('t1', ['slam', 'esorcismo', 0.35]), P('t2', ['slam', 'esorcismo+0.3', 0.35]),
                          *_fila('c', ['spid', 'pec'], 'slideL', 0.45), P('arancio', ['pop', 'familiari', 0.4])],
                         camera=[[0, 1.0, 540, 960], [11, 1.04, 540, 900]])},
    CV[8]: {'S01': _anim_ov1('quanto', 'tessera', 'conti'), 'S04': _anim_ov2(8, ['risultato', 'sorprende', 'conti']), 'S05': _anim_ch(8, 14),
            'S02': pieno([P('testa', ['wipeD', 0.0, 0.4]),
                          *[P(f'r{k}', ['wipeD', w, 0.35]) for k, w in enumerate(['farmacia', 'animali', 'universita', 'meta', 'enogastronomia',
                                                                                 'cinema', 'viaggi', 'polizza', 'fondo', 'medico'], 1)],
                          P('chi', ['slam', 'famiglia', 0.35])], camera=[[0, 1.0, 540, 700], [19, 1.06, 540, 1000]]),
            'S03': pieno([P('t1', ['slam', 0.1, 0.35]), P('t2', ['slam', 0.3, 0.35]), P('t3', ['slam', 'prezzo', 0.35]),
                          *_fila('r', ['contratto', 'cedolino', 'corsi', 'lassistenza', 'qualcuno'], spunte=True)])},
})


# ---- «La sedia vuota» (RSU AOUP, novembre 2026): nessun avatar, logo RSU (logo.png del progetto)
SV = 'pdro-rsu-la-sedia-vuota'
_SEDIA = [(93 + 100 * (k % 9), 500 + 120 * (k // 9)) for k in range(54)]
_NOMI = [452, 570, 688, 806, 924, 1042, 1160, 1278, 1396]
_PRIMI = ['giovanna', 'marika', 'pasquale', 'antonio', 'giuseppina', 'luigi', 'antonio#2', 'davide', 'stefania', 'elena',
          'carlo', 'manuela', 'maria', 'chiara#2', 'luca', 'tamara', 'luigi#2', 'anna']
EPISODI[SV] = {
    'S01': {'base': 'overlay_clip/S01A.png', 'pezzi': [
        CH('badge', 70, 1110, 600, 1214, 120, 8), CH('t1', 70, 1252, 720, 1358, 120, 14), CH('t2', 70, 1382, 610, 1488, 120, 14),
        CH('sotto', 70, 1518, 830, 1600, 110, 12), *BANDE]},
    'S02': {'base': 'grafiche/S02A.png', 'pezzi': [R('t1', 60, 290, 770, 359), R('t2', 60, 375, 600, 444),
                                                  *[C(f'p{k}', 64, y0 - 4, 1017, y1 + 4, 22) for k, (y0, y1) in
                                                    enumerate([(500, 738), (750, 988), (1000, 1238), (1250, 1451)], 1)]]},
    'S03': {'base': 'grafiche/S03A_grigio.png', 'fondi': {'fondoA': 'grafiche/S03A_grigio.png', 'fondoB': 'grafiche/S03B.png'}, 'pezzi': [
        *[{'id': f'c{k}', 'src': 'grafiche/S03A.png', 'buca': False, 'm': ['rect', x - 4, y - 4, x + 80, y + 100]} for k, (x, y) in enumerate(_SEDIA[:28])],
        R('conta', 270, 1190, 810, 1345), C('badge', 64, 1384, 1017, 1507, 58),
        {'id': 'sedia', 'src': 'grafiche/S03B.png', 'buca': False, 'm': ['rect', 89, 856, 173, 960]},
        {**R('contaB', 270, 1190, 810, 1345), 'src': 'grafiche/S03B.png'}, {**C('badgeB', 64, 1384, 1017, 1507, 58), 'src': 'grafiche/S03B.png'}]},
    'S04': {'base': 'grafiche/S04A.png', 'pezzi': [
        R('t1', 60, 282, 720, 353), R('t2', 60, 372, 500, 443),
        *[{'id': f'x{k}', 'riempi': 'tinta', 'm': ['rosso', x0 - 4, y0 - 4, x1 + 4, y1 + 4]} for k, (x0, y0, x1, y1) in
          enumerate([(192, 711, 319, 830), (477, 711, 604, 830), (762, 711, 889, 830), (192, 941, 319, 1060), (477, 941, 604, 1060), (762, 941, 889, 1060)], 1)],
        C('badge', 86, 1156, 995, 1285, 60), R('scelta', 130, 1318, 960, 1410), R('nota', 80, 1470, 970, 1565)]},
    # versione 3 (5/11): «Cosa vorremmo portare al tavolo», quattro schede (../rsu/grafiche_v3.mjs)
    'S05': {'base': 'grafiche/S05A.png', 'pezzi': [
        R('t1', 60, 280, 780, 368), R('t2', 60, 368, 900, 452),
        *[C(f'c{k}', 64, 500 + 235 * (k - 1) - 5, 1016, 500 + 235 * (k - 1) + 205, 28) for k in range(1, 5)], R('k', 60, 1462, 1020, 1556)]},
    'S06': {'base': 'grafiche/S06A.png', 'pezzi': [R('basta', 34, 294, 1048, 638), R('foglio', 74, 714, 1012, 1294), R('testo', 84, 1340, 952, 1490)]},
    'S07': {'base': 'grafiche/S07A.png', 'fondi': {'fondoA': 'grafiche/S07A.png', 'fondoB': 'grafiche/S07B.png'}, 'pezzi': [
        R('t1', 60, 273, 660, 347), R('t2', 60, 367, 660, 452), R('foto', 34, 494, 1046, 1444), R('dida', 190, 1474, 906, 1558),
        *[{**R(f'n{2 * j + s + 1}', x0, y - 16, x1, y + 48), 'src': 'grafiche/S07B.png'}
          for j, y in enumerate(_NOMI) for s, (x0, x1) in enumerate([(80, 532), (548, 1000)])]]},
    'S08': {'base': 'overlay_clip/S08A.png', 'pezzi': [
        CH('t1', 70, 1234, 930, 1308, 120, 14), CH('t2', 70, 1310, 380, 1386, 120, 14), CH('t3', 70, 1428, 850, 1538, 120, 14), *BANDE]},
    'S09': {'base': 'grafiche/S09A.png', 'pezzi': [R(f's{k}', 60, y0 - 12, 1000, y1 + 12, 'righe') for k, (y0, y1) in
                                                  enumerate([(603, 667), (788, 841), (953, 992)], 1)]},
}


def _sedie():
    """le 28 sedie verdi si accendono una alla volta fra «componenti» e «presenti»."""
    import json
    sys.path.insert(0, os.path.join(os.path.dirname(QUI), 'halloween'))
    from suoni import ancora
    pa = json.load(open(f'{PR}/{SV}/audio/parole.json'))['S03']
    a, b = ancora('componenti', pa), ancora('presenti', pa)
    return [P(f'c{k}', ['pop', round(a + (b - a) * k / 27, 3), 0.18], ['fade', 'ventisette-0.2', 0.3]) for k in range(28)]


FUORI7 = ['fade', 'giovanna-0.3', 0.3]
ANIM[SV] = {
    'S01': ov([P('badge', ['pop', 0.4, 0.4]), P('t1', ['slam', 'sala', 0.35]), P('t2', ['slam', 'guardatela', 0.35]),
               P('sotto', ['wipe', 'mesi', 1.0])], 0.5),
    'S02': pieno([P('t1', ['slam', 0.1, 0.35]), P('t2', ['slam', 0.35, 0.35]),
                  *[P(f'p{k}', ['slideL', w, 0.45]) for k, w in enumerate(['eleggete', 'riunisce', 'siede', 'accordi'], 1)]]),
    'S03': {'tipo': 'pieno', 'fondi': [['fondoA', 0], ['fondoB', 'ventisette-0.2', 0.3]], 'strati': [
        *_sedie(), P('conta', ['slam', 'ventotto#2', 0.35], ['fade', 'ventisette-0.2', 0.3]),
        P('badge', ['pop', 'discute', 0.35], ['fade', 'ventisette-0.2', 0.3]),
        P('sedia', ['pop', 'ventisette', 0.3], fx=[['pulsa', 'ventisette+0.4', 0.8, 0.06]]),
        P('contaB', ['slam', 'ventisette+0.2', 0.35]), P('badgeB', ['pop', 'cominciare', 0.35])],
        'urti': ['ventisette+0.2']},
    'S04': pieno([P('t1', ['slam', 0.1, 0.35]), P('t2', ['slam', 0.35, 0.35]),
                  *[P(f'x{k}', ['stampa', f'mesi+{0.3 * (k - 1):.2f}', 0.25]) for k in range(1, 7)],
                  P('badge', ['pop', 'legale', 0.35], fx=[['pulsa', 'legale+0.4', 0.7, 0.05]]),
                  P('nota', ['fade', 'convocazione', 0.6]), P('scelta', ['wipe', 'unoccasione', 1.0])]),
    'S05': pieno([P('t1', ['slam', 0.1, 0.35]), P('t2', ['slam', 0.35, 0.35]),
                  *[P(f'c{k}', ['slideL', w, 0.45]) for k, w in enumerate(['condizioni', 'pediatria', 'banca', 'welfare'], 1)],
                  P('k', ['wipe', 'migliaia', 1.2])]),
    'S06': pieno([P('basta', ['slam', 0.2, 0.35]), P('foglio', ['drop', 'eletti', 0.45]), P('testo', ['wipe', 'responsabilita', 1.2])],
                 urti=[0.4]),
    'S07': {'tipo': 'pieno', 'fondi': [['fondoA', 0], ['fondoB', 'giovanna-0.3', 0.3]], 'strati': [
        P('t1', ['slam', 0.1, 0.35], FUORI7), P('t2', ['slam', 0.35, 0.35], FUORI7), P('foto', ['zoom', 0.3, 0.6], FUORI7),
        P('dida', ['wipe', 'volti', 1.0], FUORI7), *[P(f'n{k}', ['fade', w, 0.3]) for k, w in enumerate(_PRIMI, 1)]],
        'camera': [[0, 1.0, 540, 960], ['giovanna-0.3', 1.06, 540, 960], ['giovanna', 1.0, 540, 960]]},
    'S08': ov([P('t1', ['slam', 'soli', 0.35]), P('t2', ['slam', 'ruolo', 0.35]), P('t3', ['slam', 'continueremo', 0.4])]),
    'S09': pieno([P('s1', ['slideL', 'responsabilita', 0.4]), P('s2', ['slideL', 'presenza#2', 0.4]), P('s3', ['slideL', 'rispetto#3', 0.4])],
                 camera=[[0, 1.0, 540, 960], [14, 1.04, 540, 960]]),
}


# ---- «20 format attrattivi» (CISL FP Padova Rovigo, solo AOUP, novembre 2026): 01 Traduttore, 02 Green flag, 03 Mito,
# 04 Calendario dell'avvento (25 reel separati, ritagliati dal montaggio unico).
V1, V2, V3, V4 = ('pdro-20f-01-traduttore-aziendalese', 'pdro-20f-02-green-flag', 'pdro-20f-03-mito-da-sfatare',
                  'pdro-20f-04-calendario-avvento')


def _chiusura20(rr):
    pz = [R('t1', 60, rr[0][0] - 10, rr[0][2] + 30, rr[0][1] + 10), R('t2', 60, rr[1][0] - 10, rr[1][2] + 30, rr[1][1] + 10),
          R('s1', 60, rr[2][0] - 10, rr[2][2] + 30, rr[2][1] + 10), C('box', 62, 892, 648, 1158, 24)]
    return {'base': 'grafiche/' + ('S%02dA.png' % 0), 'pezzi': pz}


def _anim_ch20(durata):
    return pieno([P('t1', ['slam', 0.1, 0.3]), P('t2', ['slam', 0.3, 0.3]), P('s1', ['wipe', 0.5, 0.6]), P('box', ['pop', 0.7, 0.35])],
                 camera=[[0, 1.0, 540, 960], [durata, 1.04, 540, 900]])


def _trad(righe):
    pz = []
    for k, (y0, y1) in enumerate(righe, 1):
        pz += [R(f'a{k}', 66, y0 - 3, 522, y1 + 3), R(f'b{k}', 548, y0 - 3, 1014, y1 + 3)]
    return pz


_CH20 = {V1: ('S04', [(284, 353, 807), (389, 458, 561), (497, 548, 795)]), V2: ('S03', [(284, 353, 983), (389, 458, 617), (498, 545, 533)]),
         V3: ('S04', [(284, 351, 698), (389, 456, 736), (498, 552, 939)]), V4: ('S25', [(284, 356, 752), (389, 461, 635), (500, 547, 562)])}
for _pg, (_sid, _rr) in _CH20.items():
    EPISODI.setdefault(_pg, {})[_sid] = {**_chiusura20(_rr), 'base': f'grafiche/{_sid}A.png'}
EPISODI[V1].update({
    'S01': {'base': 'grafiche/S01A.png', 'pezzi': _trad([(501, 682)])},
    'S02': {'base': 'grafiche/S02A.png', 'pezzi': _trad([(501, 738), (769, 1062), (1093, 1330)])},
    'S03': {'base': 'grafiche/S03A.png', 'pezzi': _trad([(501, 682), (713, 894), (925, 1106)])}})
_BAND = [(320, 701), (740, 1121), (1160, 1541)]
EPISODI[V2].update({s: {'base': f'grafiche/{s}A.png', 'pezzi': [C(f'f{k}', 56, y0 - 4, 1025, y1 + 4, 22) for k, (y0, y1) in enumerate(_BAND, 1)]}
                    for s in ('S01', 'S02')})
# il timbro FALSO sta sopra il riquadro del mito: la base è la grafica senza timbro (S0xA_senza.png, ricostruita col colore del
# riquadro e del fondo), il timbro si prende dall'originale senza bucare
EPISODI[V3].update({s: {'base': f'grafiche/{s}A_senza.png', 'pezzi': [
    {'id': 'timbro', 'src': f'grafiche/{s}A.png', 'buca': False, 'm': ['rosso', 380, 700, 890, 1000]},
    C('mito', 64, 374, 1017, 802, 22), C('realta', 64, 994, 1017, 1487, 22)]} for s in ('S01', 'S02', 'S03')})
EPISODI[V4].update({f'S{k:02d}': {'base': f'grafiche/S{k:02d}A.png', 'pezzi': [
    R('porta', 284, 424, 796, 936, 'righe'), C('card', 64, 994, 1016, 1526, 22, 'righe'), R('domani', 20, 1570, 1060, 1640, 'righe')]}
    for k in range(1, 25)})

ANIM[V1] = {
    'S01': pieno([P('a1', ['slideL', 'prima', 0.4]), P('b1', ['wipe', 'traduzione', 1.0])]),
    'S02': pieno([P('a1', ['slideL', 0.2, 0.4]), P('b1', ['wipe', 'chiamiamo', 0.8]), P('a2', ['slideL', 'riorganizzazione', 0.4]),
                  P('b2', ['wipe', 'stesse', 0.8]), P('a3', ['slideL', 'questione', 0.4]), P('b3', ['wipe', 'ora', 0.6])]),
    'S03': pieno([P('a1', ['slideL', 0.2, 0.4]), P('b1', ['wipe', 'si', 0.8]), P('a2', ['slideL', 'valorizzazione', 0.4]),
                  P('b2', ['wipe', 'diciamo', 0.8]), P('a3', ['slideL', 'classico', 0.4]), P('b3', ['wipe', 'traduzione', 0.8])]),
    'S04': _anim_ch20(11)}
ANIM[V2] = {
    'S01': pieno([P(f'f{k}', ['slideL', w, 0.4], fx=[['ondeggia', 3, 1]]) for k, w in enumerate(['green', 'bluered', 'green#2'], 1)]),
    'S02': pieno([P(f'f{k}', ['slideL', w, 0.4], fx=[['ondeggia', 3, 1]]) for k, w in enumerate(['bluered', 'green', 'bluered#2'], 1)]),
    'S03': _anim_ch20(10)}
ANIM[V3] = {s: pieno([P('mito', ['wipe', 0.1, 0.8]), P('timbro', ['stampa', 'falso', 0.3]), P('realta', ['slideU', 'falso+0.5', 0.45])],
                     urti=['falso+0.2'], camera=[[0, 1.0, 540, 960], [14, 1.04, 540, 960]]) for s in ('S01', 'S02', 'S03')}
ANIM[V3]['S04'] = _anim_ch20(8)
ANIM[V4] = {f'S{k:02d}': pieno([P('porta', ['zoom', 0.0, 0.45], fx=[['pulsa', 0.6, 0.9, 0.04]]), P('card', ['slideU', 1.4, 0.45]),
                                 P('domani', ['fade', 'domani', 0.5])], camera=[[0, 1.0, 540, 960], [12, 1.04, 540, 960]]) for k in range(1, 25)}
ANIM[V4]['S25'] = _anim_ch20(10)


# ---- 01 Traduttore, versione 2 (8/11, «più attrattivi»): clip HeyGen sotto, livelli a tutto schermo sopra (../venti/strati_tr.mjs)
def _strato(id, nome):
    return {'id': id, 'src': f'strati/{nome}.png', 'buca': False, 'm': ['alfa', 0, 0, 1080, 1920]}


EPISODI[V1].update({
    'S01': {'base': 'strati/s01_scrim.png', 'pezzi': [_strato('titolo', 's01_titolo'), _strato('p1', 's01_p1'), _strato('t1', 's01_t1')]},
    'S02': {'base': 'strati/scrim.png', 'pezzi': [_strato(f'{x}{k}', f's02_{x}{k}') for k in (1, 2, 3) for x in 'pt']},
    'S03': {'base': 'strati/scrim.png', 'pezzi': [_strato(f'{x}{k}', f's03_{x}{k}') for k in (1, 2, 3) for x in 'pt']}})


def _coppie(voci):
    """voci: [(entrata frase, entrata traduzione)]; ogni coppia esce quando entra la frase dopo."""
    s = []
    for k, (wp, wt) in enumerate(voci, 1):
        fuori = ['fade', f'{voci[k][0]}-0.25', 0.2] if k < len(voci) else None
        s += [P(f'p{k}', ['slideL', wp, 0.35], fuori), P(f't{k}', ['slam', wt, 0.3], fuori, fx=[['trema', f'{wt}+0.3', f'{wt}+0.8', 6]])]
    return s


ANIM[V1].update({
    'S01': {'tipo': 'overlay', 'fondi': [['fondo', 0]], 'strati': [
        P('titolo', ['slam', 0.05, 0.3], fx=[['trema', 0.35, 0.8, 5]]), P('p1', ['slideL', 'ottimizzazione-0.2', 0.35]),
        P('t1', ['slam', 'traduzione', 0.3], fx=[['trema', 'traduzione+0.3', 'traduzione+0.9', 7]])]},
    'S02': {'tipo': 'overlay', 'fondi': [['fondo', 0]], 'strati': _coppie([(0.15, 'chiamiamo'), ('riorganizzazione', 'stesse'), ('questione', 'ora')])},
    'S03': {'tipo': 'overlay', 'fondi': [['fondo', 0]], 'strati': _coppie([(0.15, 'si'), ('valorizzazione', 'diciamo'), ('classico', 'traduzione')])}})


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


# ---- 02 Green flag, 03 Mito, 04 Calendario, versione 2 (8/11): clip HeyGen sotto, livelli a tutto schermo (../venti/strati_v2.mjs)
def _uscita(seq, k):
    return ['fade', f'{seq[k]}-0.25', 0.2] if k < len(seq) else None


EPISODI[V2].update({s: {'base': 'strati/scrim.png', 'pezzi': ([_strato('titolo', 's01_titolo')] if s == 'S01' else []) +
                        [_strato(f'f{k}', f'{s.lower()}_f{k}') for k in (1, 2, 3)]} for s in ('S01', 'S02')})
ANIM[V2].update({s: {'tipo': 'overlay', 'fondi': [['fondo', 0]], 'strati': ([P('titolo', ['slam', 0.05, 0.3], fx=[['trema', 0.35, 0.8, 5]])] if s == 'S01' else []) +
                     [P(f'f{k}', ['slideL', w, 0.35], _uscita(seq, k), fx=[['trema', f'{w}+0.35', f'{w}+0.75', 4 if 'blue' in w else 2]])
                      for k, w in enumerate(seq, 1)]}
                 for s, seq in (('S01', ['green', 'bluered', 'green#2']), ('S02', ['bluered', 'green', 'bluered#2']))})

EPISODI[V3].update({s: {'base': 'strati/scrim.png', 'pezzi': [_strato(x, f'{s.lower()}_{x}') for x in ('titolo', 'mito', 'timbro', 'realta')]}
                    for s in ('S01', 'S02', 'S03')})
ANIM[V3].update({s: {'tipo': 'overlay', 'fondi': [['fondo', 0]], 'strati': [
    P('titolo', ['slam', 0.05, 0.3]), P('mito', ['slideL', 0.25, 0.4]),
    P('timbro', ['slam', 'falso', 0.25], fx=[['trema', 'falso+0.25', 'falso+0.9', 9]]), P('realta', ['slideU', 'falso+0.5', 0.45])]}
    for s in ('S01', 'S02', 'S03')})


def _caselle():
    import json; pa = json.load(open(f'{PR}/{V4}/audio/parole.json')); t = {}
    for k in range(1, 25):
        w = pa[f'S{k:02d}']; i = next(j for j, x in enumerate(w) if x['w'].endswith(':')) + 1
        f = next(j for j in range(i, len(w)) if w[j]['w'].endswith('.')) + 1
        t[k] = (round(w[i]['a'] - 0.15, 2), round(w[f]['a'] - 0.1, 2))
    return t


EPISODI[V4].update({f'S{k:02d}': {'base': 'strati/scrim.png', 'pezzi': [_strato('testa', 'testa'), _strato('domani', 'domani')] +
                                  [_strato(x, f's{k:02d}_{x}') for x in ('porta', 'nome', 'card')]} for k in range(1, 25)})
ANIM[V4].update({f'S{k:02d}': {'tipo': 'overlay', 'fondi': [['fondo', 0]], 'strati': [
    P('testa', ['fade', 0.0, 0.3]), P('porta', ['zoom', 0.0, 0.45], fx=[['pulsa', 0.6, 0.9, 0.05]]),
    P('nome', ['slam', tn, 0.3], fx=[['trema', tn + 0.3, tn + 0.7, 5]]), P('card', ['slideU', tc, 0.45]), P('domani', ['fade', 'domani', 0.5])]}
    for k, (tn, tc) in _caselle().items()})



# ---- 04 Calendario, finale «Buone feste» v3 (8/11, «più bello e più accattivante»): clip della festa in reparto, livelli di
# ../venti/strati_fin.mjs. L'avatar resta in basso a destra, scoperto (le grafiche stanno sopra y 1280 o a sinistra di x 508).
EPISODI[V4]['S25'] = {'base': 'strati/fin_scrim.png', 'pezzi': [_strato(x, f'fin_{x}') for x in
                                                                ('titolo', 'r1', 'r2', 'r3', 'r4', 'mese', 'anno', 'qui', 'feste')]}
_via = ['fade', 2.45, 0.25]
ANIM[V4]['S25'] = {'tipo': 'overlay', 'fondi': [['fondo', 0]], 'strati': [
    P('titolo', ['slam', 0.05, 0.3], _via, fx=[['trema', 0.35, 0.75, 5]]),
    *[P(f'r{k}', ['pop', 0.35 + 0.3 * (k - 1), 0.3], _via) for k in (1, 2, 3, 4)],
    P('mese', ['slideL', 2.6, 0.35], ['fade', 7.2, 0.25]), P('anno', ['slam', 4.5, 0.3], ['fade', 7.2, 0.25], fx=[['trema', 4.8, 5.3, 7]]),
    P('qui', ['slideU', 5.75, 0.4]), P('feste', ['zoom', 7.35, 0.45], fx=[['pulsa', 7.9, 10.0, 0.04]])]}

if __name__ == '__main__':
    import json
    for pg, a in ANIM.items():
        os.makedirs(f'{PR}/{pg}/grafica', exist_ok=True)
        json.dump(a, open(f'{PR}/{pg}/grafica/anim.json', 'w'), ensure_ascii=False, indent=0)
        print(pg, list(a), 'ancore mancanti:', verifica(pg))
