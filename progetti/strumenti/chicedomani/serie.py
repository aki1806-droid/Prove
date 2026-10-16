"""Specifica della serie «Chi c'è domani»: quali pezzi si ritagliano da ogni grafica (EPISODI, per
pezzi.py) e come si animano sulle parole (ANIM, per il motore grafico).

Tempi delle animazioni: un numero (secondi dall'inizio scena) o un'ancora su una parola della voce,
«parola» (prima occorrenza), «parola#2» (seconda), «parola+0.3» / «parola-0.2» (spostamento),
«parola$» (fine della parola). Le parole e i tempi stanno in audio/parole.json.
"""

E1, E2, E3, E4, E5 = ('pdro-chicedomani-ep1-torno-subito', 'pdro-chicedomani-ep2-il-testimone',
                      'pdro-chicedomani-ep3-il-calendario', 'pdro-chicedomani-ep4-promesse-a-scadenza',
                      'pdro-chicedomani-ep5-noi-ci-saremo')


def apertura(png):
    """Overlay del titolo d'apertura (stesso impianto in tutti gli episodi)."""
    return {'base': png, 'pezzi': [
        {'id': 'presenta', 'm': ['chiaro', 380, 1830, 1080, 1905, 110, 3]},
        {'id': 'badge', 'm': ['alfa', 680, 120, 1070, 225, 120]},
        {'id': 'riga1', 'm': ['chiaro', 30, 1310, 1050, 1440, 150, 14]},
        {'id': 'riga2', 'm': ['chiaro', 30, 1440, 1050, 1565, 150, 14]},
        {'id': 'sotto', 'm': ['chiaro', 30, 1572, 1050, 1675, 150, 8]},
        {'id': 'banda_su', 'm': ['rect', 0, 0, 1080, 111]},
        {'id': 'banda_giu', 'm': ['rect', 0, 1809, 1080, 1920]},
    ]}


def bande(png, extra):
    return {'base': png, 'pezzi': extra + [
        {'id': 'banda_su', 'm': ['rect', 0, 0, 1080, 111]},
        {'id': 'banda_giu', 'm': ['rect', 0, 1809, 1080, 1920]},
    ]}


def titolo3(png, w3=960):
    """Chiusura: tre righe di titolo su foto (il riquadro contatti resta fermo nel fondo)."""
    return {'base': png, 'pezzi': [
        {'id': 'r1', 'm': ['chiaro', 50, 285, 980, 405, 150, 14]},
        {'id': 'r2', 'm': ['chiaro', 50, 405, 980, 520, 150, 14]},
        {'id': 'r3', 'm': ['chiaro', 50, 520, w3, 615, 150, 12]},
    ]}


EPISODI = {
    E1: {
        'S01': apertura('overlay_clip/S01A.png'),
        'S02': {'base': 'grafiche/S02B.png', 'pezzi': [
            {'id': 'n4', 'm': ['poly', [[208, 1104], [852, 1070], [866, 1312], [222, 1358]]]},
            {'id': 'n3', 'm': ['poly', [[196, 812], [886, 826], [876, 1072], [190, 1052]]], 'togli_rosso': True},
            {'id': 'n2x', 'm': ['poly', [[170, 570], [898, 552], [906, 796], [178, 830]]]},
            {'id': 'n1', 'm': ['poly', [[150, 296], [928, 340], [918, 584], [148, 540]]], 'togli_rosso': True},
            {'id': 'n2', 'src': 'grafiche/S02A.png', 'buca': False,
             'm': ['poly', [[170, 570], [898, 552], [906, 796], [178, 830]]]},
        ]},
        'S03': {'base': 'grafiche/S03A.png', 'fondi': {'fondoA': 'grafiche/S03A.png', 'fondoB': 'grafiche/S03B.png'}, 'pezzi': [
            {'id': 'capA1', 'm': ['chiaro', 200, 1450, 700, 1560, 150, 5]},
            {'id': 'capA2', 'm': ['chiaro', 700, 1450, 900, 1560, 150, 5]},
            {'id': 'puntini', 'm': ['chiaro', 465, 620, 615, 670, 150, 4]},
            *[{'id': f'f{i}', 'src': 'grafiche/S03B.png', 'm': ['rect', cx - 62, cy - 62, cx + 62, cy + 62]}
              for i, (cx, cy) in enumerate([(410, 716), (540, 716), (670, 716), (410, 886), (540, 886), (670, 886)], 1)],
            {'id': 'bottone', 'src': 'grafiche/S03B.png', 'm': ['rect', 360, 1100, 720, 1210]},
            {'id': 'squadra', 'src': 'grafiche/S03B.png', 'riempi': 'tinta', 'm': ['chiaro', 330, 495, 750, 620, 150, 4]},
            {'id': 'capB', 'src': 'grafiche/S03B.png', 'm': ['chiaro', 220, 1450, 880, 1560, 150, 5]},
            {'id': 'telA', 'buca': False, 'm': ['rect', 286, 378, 794, 1342]},
            {'id': 'telB', 'src': 'grafiche/S03B.png', 'buca': False, 'm': ['rect', 286, 378, 794, 1342]},
        ]},
        'S04': bande('overlay_clip/S04A.png', [
            {'id': 'aperto', 'm': ['alfa', 440, 170, 1000, 400, 6]},
            {'id': 'cap1', 'm': ['chiaro', 190, 1470, 900, 1575, 150, 6]},
            {'id': 'cap2', 'm': ['chiaro', 290, 1580, 820, 1700, 150, 6]},
        ]),
        'S05': titolo3('grafiche/S05A.png', 760),
    },
    E2: {
        'S01': apertura('overlay_clip/S01A.png'),
        'S02': {'base': 'grafiche/S02A.png', 'pezzi': [
            {'id': 'cap', 'riempi': 'tinta', 'm': ['chiaro', 200, 200, 900, 300, 150, 12]},
            *[{'id': f'pin{i}', 'm': ['poly', [[cx - 22, y0 - 4], [cx + 22, y0 - 4], [cx + 22, y0 + 34], [cx + 4, y1 + 4], [cx - 4, y1 + 4], [cx - 22, y0 + 34]]]}
              for i, (cx, y0, y1) in enumerate([(190, 386, 720), (330, 344, 680), (610, 312, 650), (750, 362, 700), (890, 292, 630)], 1)],
            {'id': 'fermo', 'm': ['cerchio', 470, 930, 36]},
            {'id': 'zona', 'buca': False, 'm': ['rect', 118, 758, 1042, 1062]},
            {'id': 'crono', 'buca': False, 'm': ['cerchio', 540, 1382, 178]},
            {'id': 'corona', 'buca': False, 'm': ['rect', 505, 1160, 575, 1215]},
        ]},
        'S03': {'base': 'grafiche/S03A.png', 'pezzi': [
            {'id': 'art1', 'm': ['rect', 130, 472, 470, 562]},
            {'id': 'l1a', 'm': ['rect', 130, 572, 960, 690]},
            {'id': 'l1b', 'm': ['rect', 130, 690, 960, 802]},
            {'id': 'l2a', 'm': ['rect', 130, 816, 960, 930]},
            {'id': 'l2b', 'm': ['rect', 130, 930, 960, 1052]},
            {'id': 'art2', 'm': ['rect', 130, 1092, 470, 1166]},
            {'id': 'testo2', 'm': ['rect', 130, 1166, 980, 1335]},
            {'id': 'baton', 'm': ['rect', 690, 488, 952, 578]},
            {'id': 'carta', 'm': ['rect', 84, 254, 996, 1504]},
        ]},
        'S04': bande('overlay_clip/S04A.png', [
            {'id': 'esperienza', 'm': ['alfa', 80, 1365, 512, 1495, 230]},
            {'id': 'piu', 'm': ['alfa', 512, 1390, 572, 1470, 230]},
            {'id': 'futuro', 'm': ['alfa', 572, 1365, 1002, 1495, 230]},
            {'id': 'cap', 'm': ['chiaro', 200, 1555, 880, 1665, 150, 6]},
        ]),
        'S05': {**titolo3('grafiche/S05A.png'), 'pezzi': titolo3('grafiche/S05A.png')['pezzi'] + [
            {'id': 'baton', 'm': ['giallo', 505, 660, 1025, 910]}]},
    },
    E3: {
        'S01': apertura('overlay_clip/S01A.png'),
        'S02': {'base': 'grafiche/S02A.png', 'pezzi': [
            {'id': 'p1_tit', 'm': ['rect', 176, 630, 720, 836]},
            {'id': 'p1_sub', 'm': ['rect', 186, 1064, 760, 1152]},
            {'id': 'p1_dom', 'm': ['rect', 186, 1154, 690, 1238]},
            {'id': 'p1', 'm': ['poly', [[112, 340], [938, 326], [968, 1300], [144, 1330]]]},
            {'id': 'p2_tit', 'src': 'grafiche/S02B.png', 'm': ['rect', 186, 622, 836, 826]},
            {'id': 'p2_sub', 'src': 'grafiche/S02B.png', 'm': ['rect', 166, 1052, 800, 1150]},
            {'id': 'p2_dom', 'src': 'grafiche/S02B.png', 'm': ['rect', 156, 1146, 720, 1236]},
            {'id': 'p2', 'src': 'grafiche/S02B.png', 'buca': False, 'm': ['poly', [[150, 326], [974, 342], [922, 1340], [104, 1302]]]},
        ]},
        'S03': {'base': 'grafiche/S03A.png', 'pezzi': [
            {'id': 'p3_tit', 'm': ['rect', 176, 630, 930, 836]},
            {'id': 'p3_sub', 'm': ['rect', 186, 1064, 640, 1152]},
            {'id': 'p3_dom', 'm': ['rect', 186, 1154, 690, 1238]},
            {'id': 'p3', 'm': ['poly', [[112, 340], [938, 326], [968, 1300], [144, 1330]]]},
            {'id': 'p4_tit', 'src': 'grafiche/S03B.png', 'm': ['rect', 176, 618, 720, 826]},
            {'id': 'p4_sub', 'src': 'grafiche/S03B.png', 'm': ['rect', 156, 1052, 700, 1150]},
            {'id': 'p4_dom', 'src': 'grafiche/S03B.png', 'm': ['rect', 156, 1146, 650, 1238]},
            {'id': 'p4', 'src': 'grafiche/S03B.png', 'buca': False, 'm': ['poly', [[150, 334], [978, 350], [926, 1340], [100, 1300]]]},
        ]},
        'S04': {'base': 'grafiche/S04A.png', 'pezzi': [
            {'id': 'tit1', 'riempi': 'tinta', 'm': ['chiaro', 60, 255, 720, 356, 140, 12]},
            {'id': 'tit2', 'riempi': 'tinta', 'm': ['chiaro', 60, 356, 760, 452, 140, 12]},
            {'id': 'cap', 'riempi': 'tinta', 'm': ['chiaro', 160, 1395, 940, 1515, 150, 12]},
            {'id': 'q1', 'm': ['rect', 232, 582, 348, 698]},
            {'id': 'q2', 'm': ['rect', 712, 582, 828, 698]},
            {'id': 'q3', 'm': ['rect', 232, 1012, 348, 1128]},
            {'id': 'q4', 'm': ['rect', 712, 1012, 828, 1128]},
            {'id': 't1', 'm': ['rect', 62, 512, 518, 918]},
            {'id': 't2', 'm': ['rect', 542, 512, 998, 918]},
            {'id': 't3', 'm': ['rect', 62, 942, 518, 1348]},
            {'id': 't4', 'm': ['rect', 542, 942, 998, 1348]},
        ]},
        'S05': {**titolo3('grafiche/S05A.png', 640), 'pezzi': titolo3('grafiche/S05A.png', 640)['pezzi'] + [
            {'id': 'freccia', 'm': ['giallo', 40, 470, 1075, 830]}]},
    },
    E4: {
        'S01': apertura('overlay_clip/S01A.png'),
        'S02': {'base': 'grafiche/S02A.png', 'pezzi': [
            {'id': 'timbro', 'm': ['rosso', 460, 1190, 1000, 1470]},
            {'id': 'ingr', 'm': ['rect', 246, 722, 620, 788]},
            {'id': 'parole', 'm': ['rect', 246, 790, 680, 866]},
            {'id': 'foto', 'm': ['rect', 246, 866, 740, 938]},
            {'id': 'consumarsi', 'm': ['rect', 246, 982, 810, 1078]},
            {'id': 'qqq', 'm': ['rect', 250, 1082, 724, 1178]},
            {'id': 'promessa', 'm': ['rect', 216, 596, 864, 704]},
        ]},
        'S03': {'base': 'grafiche/S03A.png', 'pezzi': [
            {'id': 'tit1', 'm': ['rect', 50, 248, 760, 336]},
            {'id': 'tit2', 'm': ['rect', 60, 336, 720, 412]},
            {'id': 'valori', 'm': ['rect', 106, 476, 780, 554]},
            {'id': 'r1', 'm': ['rect', 106, 596, 978, 682]},
            {'id': 'r2', 'm': ['rect', 106, 706, 978, 792]},
            {'id': 'r3', 'm': ['rect', 106, 816, 978, 902]},
            {'id': 'r4', 'm': ['rect', 106, 926, 978, 1012]},
            {'id': 'r5', 'm': ['rect', 106, 1036, 978, 1122]},
            {'id': 'scad', 'm': ['rect', 106, 1196, 620, 1292]},
            {'id': 'nessuna', 'm': ['rect', 620, 1196, 978, 1292]},
        ]},
        'S04': {'base': 'grafiche/S04A.png', 'pezzi': [
            {'id': 'scelta', 'm': ['rect', 516, 980, 826, 1060]},
            {'id': 'scontrino', 'm': ['rect', 222, 212, 868, 1600]},
        ]},
        'S05': {**titolo3('grafiche/S05A.png'), 'pezzi': titolo3('grafiche/S05A.png')['pezzi'] + [
            {'id': 'timbro', 'm': ['verde', 420, 630, 1075, 890]}]},
    },
    E5: {
        'S01': apertura('overlay_clip/S01A.png'),
        'S02': {'pezzi': [
            {'id': 'cisaro', 'src': 'overlay_clip/S02A.png', 'm': ['alfa', 50, 250, 1030, 430, 8]},
        ]},
        'S03': {'base': 'grafiche/S03A.png', 'pezzi': [
            {'id': 'l0', 'm': ['rect', 250, 205, 830, 348]},
            {'id': 'l1', 'm': ['rect', 370, 388, 730, 480]},
            {'id': 'l2', 'm': ['rect', 360, 532, 730, 626]},
            {'id': 'l3', 'm': ['rect', 210, 654, 880, 746]},
            {'id': 'l4', 'm': ['rect', 130, 768, 960, 856]},
            {'id': 'l5', 'm': ['rect', 210, 864, 880, 956]},
            {'id': 'l6', 'm': ['rect', 240, 984, 850, 1076]},
            {'id': 'l7', 'm': ['rect', 340, 1098, 740, 1222]},
        ]},
        'S04': bande('overlay_clip/S04A.png', [
            {'id': 'noi', 'm': ['alfa', 120, 600, 960, 1330, 4]},
            {'id': 'cap1', 'm': ['chiaro', 140, 1495, 940, 1595, 150, 6]},
            {'id': 'cap2', 'm': ['chiaro', 350, 1598, 740, 1700, 150, 6]},
        ]),
        'S05': titolo3('grafiche/S05A.png'),
        'S06': {'pezzi': [
            {'id': 'riga1', 'src': f'../{E3}/overlay_clip/S01A.png', 'm': ['chiaro', 30, 1310, 1050, 1440, 150, 8]},
            {'id': 'riga2', 'src': f'../{E3}/overlay_clip/S01A.png', 'm': ['chiaro', 30, 1440, 1050, 1565, 150, 8]},
        ]},
    },
}


# ---------------------------------------------------------------- regia (ANIM)
def P(p, ent=None, esc=None, fx=None, figli=None, fisso=False):
    s = {'p': p}
    if ent: s['in'] = ent
    if esc: s['out'] = esc
    if fx: s['fx'] = fx
    if figli: s['figli'] = figli
    if fisso: s['fisso'] = True
    return s


def DIS(**d):
    return {'disegno': d}


def ov_apertura(r1, r2, sotto):
    """Overlay del titolo: bande che entrano, badge, titolo a colpi sulle parole."""
    return {'tipo': 'overlay', 'fondi': [['fondo', 0]], 'strati': [
        P('badge', ['pop', 0.7]),
        P('riga1', ['slam', r1, 0.35]), P('riga2', ['slam', r2, 0.35]), P('sotto', ['wipe', sotto, 0.8]),
        P('banda_su', ['bandaSu', 0, 0.6], fisso=True), P('banda_giu', ['bandaGiu', 0, 0.6], fisso=True),
        P('presenta', ['fade', 0.5, 0.6], fisso=True),
    ]}


def ov_bande(strati):
    return {'tipo': 'overlay', 'fondi': [['fondo', 0]], 'strati': strati + [
        P('banda_su', ['bandaSu', 0, 0.4], fisso=True), P('banda_giu', ['bandaGiu', 0, 0.4], fisso=True)]}


def chiusura(t1, t2, t3=None, altri=(), camera=None):
    st = [P('r1', ['slam', t1, 0.35]), P('r2', ['slam', t2, 0.35])]
    if t3 is not None:
        st.append(P('r3', ['wipe', t3, 0.6]))
    return {'tipo': 'pieno', 'fondi': [['fondo', 0]], 'camera': camera or [[0, 1.0, 540, 960], [16, 1.06, 540, 800]],
            'strati': list(altri) + st}


ANIM = {
    E1: {
        'S01': ov_apertura('torno', 'subito', 'peccato'),
        'S02': {'tipo': 'pieno', 'fondi': [['fondo', 0]], 'camera': [[0, 1.0, 540, 900], [12, 1.05, 540, 820]], 'strati': [
            P('n1', ['tape', 0, 0.4], fx=[['ondeggia', 3.1, 0.7]],
              figli=[DIS(tipo='barra', t='cambiato', d=0.35, x0=190, y0=424, x1=890, y1=472)]),
            P('n2', ['tape', 'torno', 0.4], fx=[['ondeggia', 3.4, 0.8, 1]],
              figli=[DIS(tipo='barra', t='poi', d=0.35, x0=210, y0=714, x1=870, y1=682)]),
            P('n3', ['tape', 'torno#2', 0.4], fx=[['ondeggia', 2.9, 0.8, 2]],
              figli=[DIS(tipo='barra', t='poi#2', d=0.35, x0=230, y0=934, x1=850, y1=966)]),
            P('n4', ['tape', 'sentiamo-0.25', 0.4], fx=[['ondeggia', 3.3, 0.9, 3]]),
        ]},
        'S03': {'tipo': 'pieno', 'fondi': [['fondoA', 0], ['fondoB', 'risponde-0.2', 0.3]], 'strati': [
            DIS(tipo='anelli', tempi=['squilla', 'volta', 'due'], cx=540, cy=900, r0=300, r1=760, dur=1.0),
            P('telA', None, ['fade', 'risponde-0.2', 0.3], fx=[['trema', 'squilla', 'squilla+0.5', 6], ['trema', 'due', 'due+0.5', 6]],
              figli=[P('puntini', fx=[['lampeggia', 0, 'risponde', 0.5]])]),
            P('telB', ['fade', 'risponde-0.2', 0.3], figli=[
                P('squadra', ['fade', 'risponde', 0.4]),
                *[P(f'f{i}', ['pop', f'qualcuno+{0.15 * (i - 1):.2f}', 0.35]) for i in range(1, 7)],
                P('bottone', ['pop', 'tanti', 0.4])]),
            DIS(tipo='anelli', tempi=['rispondono', 'tanti'], cx=540, cy=900, r0=320, r1=820, dur=1.1, rgb='247,192,74'),
            DIS(tipo='banda', y0=1400, y1=1610, col='rgba(10,24,19,A)', a=0.92),
            P('capA1', ['wipe', 'squilla', 0.7], ['fade', 'risponde-0.2', 0.3]),
            P('capA2', ['wipe', 'due', 0.35], ['fade', 'risponde-0.2', 0.3]),
            P('capB', ['wipe', 'rispondono', 0.8]),
        ]},
        'S04': ov_bande([P('aperto', ['neon', 0.3, 0.6]), P('cap1', ['wipe', 'non', 0.7]), P('cap2', ['wipe', 'risposta-0.25', 0.6])]),
        'S05': chiusura(0.2, 0.55, 'oggi-0.1'),
    },
    E2: {
        'S01': ov_apertura('testimone-0.35', 'testimone', 'ma'),
        'S02': {'tipo': 'pieno', 'fondi': [['fondo', 0]], 'strati': [
            *[P(f'pin{i}', fx=[['corsa', 0.1 * i, 'passano', 640 + 40 * i, 0], ['sale', 'passano', 30 + 8 * i]]) for i in range(1, 6)],
            P('zona'), P('fermo', fx=[['pulsa', 0, 0.7, 0.14]]),
            P('crono'), P('corona'),
            DIS(tipo='lancetta', cx=540, cy=1382, r=150, per=1.0),
            P('cap', ['wipe', 'gli', 0.8]),
        ]},
        'S03': {'tipo': 'pieno', 'fondi': [['fondo', 0]], 'camera': [[0, 1.0, 540, 900], [11.5, 1.04, 540, 900]], 'strati': [
            P('carta', ['apri', 0, 0.55], figli=[
                P('art1', ['wipe', 'regolamento', 0.4]),
                P('l1a', ['wipe', 'testimone', 0.5]), P('l1b', ['wipe', 'non', 0.45]),
                P('l2a', ['wipe', 'appartiene#2', 0.4]), P('l2b', ['wipe', 'squadra', 0.5]),
                P('art2', ['wipe', 'se', 0.4]), P('testo2', ['wipeD', 'perde', 1.4]),
                P('baton', ['rotola', 'semplice', 0.9]),
            ]),
        ]},
        'S04': ov_bande([P('esperienza', ['slideL', 'esperienza', 0.55]), P('futuro', ['slideR', 'arriva', 0.55]),
                         P('piu', ['pop', 'accelera', 0.4]), P('cap', ['wipe', 'nessuno', 0.8])]),
        'S05': chiusura('testimone-0.3', 'passa', 'vince-0.2', altri=[P('baton', ['vola', 0.15, 1.0])]),
    },
    E3: {
        'S01': ov_apertura('pagine', 'volano', 'veloci'),
        'S02': {'tipo': 'pieno', 'fondi': [['fondo', 0]], 'camera': [[0, 1.0, 540, 860], [9, 1.04, 540, 860]], 'strati': [
            P('p2', ['fade', 'progressioni-0.5', 0.1], figli=[
                P('p2_tit', ['wipe', 'progressioni', 0.5]), P('p2_sub', ['wipe', 'difendere', 0.6]), P('p2_dom', ['wipe', 'dopo', 0.45])]),
            P('p1', ['pop', 0, 0.45], ['strappa', 'progressioni-0.5', 0.6], figli=[
                P('p1_tit', ['wipe', 'rinnovo', 0.5]), P('p1_sub', ['wipe', 'risorse', 0.6]), P('p1_dom', ['wipe', 'tavolo', 0.45])]),
        ]},
        'S03': {'tipo': 'pieno', 'fondi': [['fondo', 0]], 'camera': [[0, 1.0, 540, 860], [10, 1.04, 540, 860]], 'strati': [
            P('p4', ['fade', 'lintelligenza-0.5', 0.1], fx=[['glitch', 'lintelligenza-0.1', 'lintelligenza+0.6'], ['glitch', 'governare', 'governare+0.3']],
              figli=[P('p4_tit', ['wipe', 'lintelligenza', 0.5]), P('p4_sub', ['wipe', 'reparti', 0.7]), P('p4_dom', ['wipe', 'qualcuno', 0.45])]),
            P('p3', ['pop', 0, 0.45], ['strappa', 'lintelligenza-0.5', 0.6], figli=[
                P('p3_tit', ['wipe', 'decreti', 0.6]), P('p3_sub', ['wipe', 'decreti+0.6', 0.6]), P('p3_dom', ['wipe', 'sanitarie', 0.45])]),
        ]},
        'S04': {'tipo': 'pieno', 'fondi': [['fondo', 0]], 'strati': [
            P('tit1', ['slam', 'ogni', 0.35]), P('tit2', ['slam', 'tavolo', 0.35]),
            *[P(f't{i}', ['pop', f'ogni#2+{0.28 * (i - 1):.2f}', 0.4], figli=[
                P(f'q{i}', fx=[['pulsa', 'sedia', 0.9, 0.16]])]) for i in range(1, 5)],
            P('cap', ['wipe', 'chi', 1.0]),
        ]},
        'S05': chiusura(0.2, 0.55, 'adesso-0.1', altri=[P('freccia', ['wipe', 0.8, 1.8])]),
    },
    E4: {
        'S01': ov_apertura('supermercato', 'promesse', 'scaffali'),
        'S02': {'tipo': 'pieno', 'fondi': [['fondo', 0]], 'urti': ['scadenza+0.3'],
                'camera': [[0, 1.0, 540, 960], [0.9, 1.32, 540, 880], ['parole', 1.32, 540, 880], ['consumarsi', 1.3, 540, 1000],
                           ['entro$', 1.3, 540, 1000], ['scadenza-0.2', 1.08, 600, 1040]], 'strati': [
            P('promessa', ['pop', 0.2, 0.4]),
            P('ingr', ['wipe', 'ingredienti', 0.45]), P('parole', ['wipe', 'parole', 0.9]), P('foto', ['wipe', 'qualche', 0.8]),
            P('consumarsi', ['wipeD', 'consumarsi-0.1', 1.2]),
            P('qqq', ['pop', 'entro', 0.35], fx=[['lampeggia', 'entro+0.4', 'scadenza', 0.5]]),
            P('timbro', ['drop', 'scadenza', 0.3]),
        ]},
        'S03': {'tipo': 'pieno', 'fondi': [['fondo', 0]], 'strati': [
            P('tit1', ['wipe', 0.1, 0.5]), P('tit2', ['wipe', 'diverso', 0.4]), P('valori', ['wipe', 'ingredienti', 0.5]),
            P('r1', ['wipe', 'ascolto', 0.5]), P('r2', ['wipe', 'presenza', 0.5]), P('r3', ['wipe', 'competenza', 0.5]),
            P('r4', ['wipe', 'squadra', 0.5]), P('r5', ['wipe', 'rinnova+0.2', 0.5]), P('scad', ['wipe', 'sulla', 0.5]),
            P('nessuna', ['slam', 'nessuna', 0.3], fx=[['pulsa', 'nessuna+0.4', 1.0, 0.07]]),
        ]},
        'S04': {'tipo': 'pieno', 'fondi': [['fondo', 0]], 'strati': [
            P('scontrino', ['stampa', 0, 1.8], figli=[
                P('scelta', ['fade', 'impegno', 0.1], fx=[['lampeggia', 'impegno', 'impegno+1.6', 0.4], ['pulsa', 'impegno+1.6', 1.2, 0.06]])]),
        ]},
        'S05': {**chiusura('leggi', 'letichetta', altri=[P('timbro', ['drop', 'scadenza', 0.3])]), 'urti': ['scadenza+0.3']},
    },
    E5: {
        'S01': ov_apertura('promessa', 'persone', 'colleghi'),
        'S02': {'tipo': 'pieno', 'foto': {'src': 'img/squadra_alba.png', 's0': 1.04, 's1': 1.14, 'durata': 7,
                                          'velo': [[0, 'rgba(0,0,0,.55)'], [0.45, 'rgba(0,0,0,.35)'], [1, 'rgba(0,0,0,.75)']]},
                'testi': {'domanda': {'righe': [['PERCHÉ', '#ffffff'], ['CI SARAI?', '#f7c04a']], 'size': 132, 'y': 760, 'h': 340}},
                'strati': [P('domanda', ['slam', 'perche', 0.35]), P('cisaro', ['pop', 'ecco', 0.45])]},
        'S03': {'tipo': 'pieno', 'fondi': [['fondo', 0]], 'strati': [
            P('l0', ['slam', 0.05, 0.35]), P('l1', ['wipe', 'turni-0.2', 0.5]), P('l2', ['wipe', 'riposi-0.35', 0.55]),
            P('l3', ['wipe', 'appena-0.3', 0.75]), P('l4', ['wipe', 'vita-0.3', 0.9]), P('l5', ['wipe', 'contratti-0.2', 0.7]),
            P('l6', ['wipe', 'problemi-0.2', 0.6]), P('l7', ['slam', 'oggi', 0.35], fx=[['pulsa', 'oggi+0.4', 1.0, 0.06]]),
        ]},
        'S04': ov_bande([P('noi', ['zoom', 'noi', 0.8], fx=[['bagliore', 'insieme', 1.4]]),
                         P('cap1', ['wipe', 'nessuno', 1.0]), P('cap2', ['wipe', 'insieme', 0.6])]),
        'S05': chiusura(0.2, 0.5, 'chi'),
        'S06': {'tipo': 'pieno', 'colore': '#06100b', 'strati': [
            DIS(tipo='alone', cx=540, cy=900, r=900, col='rgba(0,140,70,A)', a=0.55, pulsa=True),
            P('riga1', ['slam', 0.15, 0.35], fx=[['sposta', 0, 0.01, 0, -520]]),
            P('riga2', ['slam', 0.45, 0.35], fx=[['sposta', 0, 0.01, 0, -520]])]},
    },
}


if __name__ == '__main__':
    # scrive grafica/anim.json in ogni progetto (lo legge rendi.mjs)
    import json, os
    PR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    for ep, a in ANIM.items():
        os.makedirs(f'{PR}/{ep}/grafica', exist_ok=True)
        json.dump(a, open(f'{PR}/{ep}/grafica/anim.json', 'w'), ensure_ascii=False, indent=0)
        print(ep, list(a))
