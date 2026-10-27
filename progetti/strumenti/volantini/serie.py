"""Specifica del reel «Il caso del volantino scomparso»: pezzi da ritagliare (EPISODI, per ../chicedomani/pezzi.py con
SERIE=questo file) e regia sulle parole (ANIM, per ../chicedomani/motore.html). Stesso schema di ../pagamenti/serie.py.

    SERIE=strumenti/volantini/serie.py python3 strumenti/chicedomani/pezzi.py
    python3 strumenti/volantini/serie.py           -> grafica/anim.json
    python3 strumenti/chicedomani/monta.py pdro-volantini-strappati PDRO_Il_caso_del_volantino_scomparso_9x16
    python3 strumenti/volantini/suoni.py           -> effetti sonori sul montato

S01/S05/S08 overlay sulle clip Higgsfield, le altre scene sono le grafiche del pacchetto. Regia del pacchetto: macchina da
scrivere sul FILE N° 001 e colpi sul titolo (S01), fascicolo che si compila e timbro IDEE: NESSUNA (S02), PAU / RA? che si
spezza (S03), manifesto western (S04), schede di legge una alla volta (S06), timbro SEGNALATO (S07), puntine (S08).
Video solo per l'AOUP: i contatti della chiusura restano Achille e Giovanna, come nel pacchetto.
"""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'chicedomani'))
from serie import P  # noqa: E402

PR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
PG = 'pdro-volantini-strappati'
BANDE = [{'id': 'banda_su', 'm': ['rect', 0, 0, 1080, 111]}, {'id': 'banda_giu', 'm': ['rect', 0, 1810, 1080, 1920]}]


def R(id, x0, y0, x1, y1, riempi='tinta'):
    return {'id': id, 'riempi': riempi, 'm': ['rect', x0, y0, x1, y1]}


def C(id, x0, y0, x1, y1, r=22, riempi='tinta'):
    return {'id': id, 'riempi': riempi, 'm': ['rrect', x0, y0, x1, y1, r]}


def CH(id, x0, y0, x1, y1, soglia=150, allarga=10):
    return {'id': id, 'm': ['chiaro', x0, y0, x1, y1, soglia, allarga]}


EPISODI = {PG: {
    'S01': {'base': 'overlay_clip/S01A.png', 'pezzi': [
        C('chip', 86, 1136, 564, 1204, 4, 'diffusione'),
        CH('t1', 80, 1240, 670, 1345), CH('t2', 80, 1352, 820, 1468, 110), CH('t3', 80, 1468, 860, 1590),
        CH('presenta', 180, 1835, 1060, 1895, 110, 3), *BANDE]},
    'S02': {'base': 'grafiche/S02A.png', 'pezzi': [
        R('foto', 98, 418, 464, 864),
        R('r1', 492, 412, 992, 556), R('r2', 492, 556, 992, 650), R('r3', 492, 650, 992, 744), R('r4', 492, 744, 992, 842),
        R('segni', 92, 922, 520, 972), R('mano', 92, 990, 790, 1150),
        {'id': 'timbro', 'm': ['rosso', 370, 1210, 965, 1480]}]},
    'S03': {'base': 'grafiche/S03A.png', 'pezzi': [
        {'id': 'pau', 'm': ['rosso', 160, 720, 440, 850]}, {'id': 'ra', 'm': ['rosso', 670, 740, 920, 860]},
        R('dom', 60, 1420, 840, 1500), R('mano', 60, 1520, 640, 1690)]},
    'S04': {'base': 'grafiche/S04A.png', 'pezzi': [
        R('cercasi', 160, 290, 890, 440), R('unidea', 240, 485, 830, 615), R('contr', 190, 625, 880, 710),
        R('qm', 440, 820, 640, 1060), R('ricomp', 280, 1165, 820, 1255), R('confr', 300, 1280, 800, 1440),
        R('finora', 160, 1600, 930, 1690, 'verticale')]},
    'S05': {'base': 'overlay_clip/S05A.png', 'pezzi': [
        CH('t1', 80, 1235, 780, 1340), CH('t2', 80, 1345, 660, 1455, 120), CH('sotto', 80, 1478, 800, 1565, 130, 8),
        *BANDE]},
    'S06': {'base': 'grafiche/S06A.png', 'pezzi': [
        R('h1', 62, 292, 470, 385), R('h2', 62, 385, 880, 450),
        C('c1', 66, 496, 1014, 676, 26), C('c2', 66, 694, 1014, 876, 26), C('c3', 66, 892, 1014, 1114, 26),
        C('c4', 66, 1132, 1014, 1314, 26)]},
    'S07': {'base': 'grafiche/S07A.png', 'pezzi': [
        CH('t1', 60, 290, 660, 385), CH('t2', 60, 395, 660, 492), CH('t3', 60, 500, 930, 600, 110),
        {'id': 'timbro', 'm': ['rosso', 120, 690, 960, 1030]},
        CH('az', 60, 1080, 680, 1190, 150, 8), CH('nonper', 60, 1240, 1000, 1320, 120, 8)]},
    'S08': {'base': 'overlay_clip/S08A.png', 'pezzi': [
        CH('t1', 80, 1185, 730, 1292), CH('t2', 80, 1296, 510, 1392), CH('t3', 80, 1400, 840, 1525, 120),
        CH('sotto', 80, 1550, 910, 1620, 130, 8), *BANDE]},
    'S09': {'base': 'grafiche/S09A.png', 'pezzi': [
        CH('t1', 60, 275, 860, 372), CH('t2', 60, 380, 580, 475, 120), CH('t3', 60, 490, 740, 595),
        CH('t4', 60, 600, 340, 705, 100), C('box', 66, 756, 646, 1124, 26, 'diffusione')]},
}}


def ov(strati, bande_in=0.4):
    return {'tipo': 'overlay', 'fondi': [['fondo', 0]], 'strati': strati + [
        P('banda_su', ['bandaSu', 0, bande_in], fisso=True), P('banda_giu', ['bandaGiu', 0, bande_in], fisso=True)]}


def pieno(strati, camera=None, urti=None):
    s = {'tipo': 'pieno', 'fondi': [['fondo', 0]], 'strati': strati}
    if camera:
        s['camera'] = camera
    if urti:
        s['urti'] = urti
    return s


ANIM = {
    # true crime: il FILE N° 001 si batte a macchina, il titolo entra a colpi
    'S01': ov([P('chip', ['wipe', 0.3, 1.3]), P('t1', ['slam', 'testimone', 0.3]), P('t2', ['slam', 'colpevole', 0.3]),
               P('t3', ['slam', 'bersaglio', 0.3]), P('presenta', ['fade', 'buio', 0.6], fisso=True)], 0.5),
    # il fascicolo si compila voce per voce, il timbro cade sull'ultima parola
    'S02': pieno([P('foto', ['pop', 'profilo', 0.45]), P('r1', ['wipe', 'abitudini', 0.8]), P('r2', ['wipe', 'arma', 0.6]),
                  P('r3', ['wipe', 'teme', 0.8]), P('r4', ['wipe', 'punto', 0.8]), P('segni', ['fade', 'davanti', 0.3]),
                  P('mano', ['wipe', 'davanti', 1.8]), P('timbro', ['drop', 'strappa', 0.3])],
                 camera=[[0, 1.0, 540, 960], ['davanti', 1.0, 540, 960], ['strappa', 1.06, 640, 1250]], urti=['strappa+0.3']),
    # PAU / RA?: le due metà tremano e il colpo arriva sulla domanda
    'S03': pieno([P('pau', ['slam', 0.15, 0.3], fx=[['trema', 0.4, 'vigliaccheria', 3]]),
                  P('ra', ['slam', 0.45, 0.3], fx=[['trema', 0.6, 'vigliaccheria', 3]]),
                  P('dom', ['wipe', 'vigliaccheria', 0.7]), P('mano', ['wipe', 'chi', 1.6])],
                 urti=[0.15, 0.45]),
    # manifesto western: tutto in fila, la ricompensa e poi il silenzio
    'S04': pieno([P('cercasi', ['slam', 'avviso', 0.35]), P('unidea', ['slam', 'cercasi', 0.35]),
                  P('contr', ['wipe', 'contrapporre', 0.6]), P('qm', ['pop', 'contrapporre$', 0.5], fx=[['ondeggia', 2.2, 6]]),
                  P('ricomp', ['slam', 'ricompensa', 0.35]), P('confr', ['wipe', 'confronto', 1.2]),
                  P('finora', ['wipe', 'finora', 1.4])],
                 camera=[[0, 1.04, 540, 900], ['finora', 1.0, 540, 960]]),
    'S05': ov([P('t1', ['slam', 'bacheca', 0.35]), P('t2', ['slam', 'tutti', 0.35]), P('sotto', ['wipe', 'pluralismo', 1.2])]),
    # le quattro schede di legge entrano una alla volta
    'S06': pieno([P('h1', ['slam', 0.2, 0.35]), P('h2', ['wipe', 'legge', 0.6]),
                  P('c1', ['slideL', 'diritto', 0.45]), P('c2', ['slideL', 'antisindacale', 0.45]),
                  P('c3', ['slideL', 'reato', 0.45]), P('c4', ['slideL', 'cose', 0.45])]),
    'S07': pieno([P('t1', ['slam', 0.15, 0.3]), P('t2', ['slam', 'scoperto', 0.3]), P('t3', ['slam', 'segnalato', 0.3]),
                  P('timbro', ['drop', 'segnalato$', 0.3]), P('az', ['wipe', 'allazienda', 0.9]),
                  P('nonper', ['wipe', 'vendetta', 1.4]), ],
                 urti=['segnalato$+0.3'], camera=[[0, 1.0, 540, 960], ['aperto', 1.05, 540, 860]]),
    'S08': ov([P('t1', ['slam', 'perche', 0.35]), P('t2', ['slam', 'foglio', 0.35]),
               P('t3', ['slam', 'non', 0.4], fx=[['bagliore', 'unidea', 1.2]]), P('sotto', ['wipe', 'stampiamo', 1.4])]),
    # chiusura: lo slogan, il riquadro con i contatti, e lo slogan che torna a pulsare sulle ultime parole
    'S09': pieno([P('t1', ['slam', 'confronto', 0.35]), P('t2', ['slam', 'confronto$+0.2', 0.35], fx=[['pulsa', 'sempre', 0.9, 0.06]]),
                  P('t3', ['slam', 'strappare', 0.35]), P('t4', ['slam', 'strappare$+0.2', 0.35], fx=[['pulsa', 'mai', 0.9, 0.06]]),
                  P('box', ['pop', 0.6, 0.45], fx=[['pulsa', 'chiamaci', 1.1, 0.04]])],
                 camera=[[0, 1.0, 540, 960], [16, 1.04, 540, 900]]),
}


if __name__ == '__main__':
    import json
    json.dump(ANIM, open(f'{PR}/{PG}/grafica/anim.json', 'w'), ensure_ascii=False, indent=0)
    print(PG, list(ANIM))
