"""Specifica del reel «Verso il coordinamento»: pezzi da ritagliare (EPISODI, per ../chicedomani/pezzi.py con
SERIE=questo file) e regia sulle parole (ANIM, per ../chicedomani/motore.html). Stesso schema di ../decreto/serie.py;
le ancore sono parole di audio/parole.json.

    SERIE=strumenti/coordinamento/serie.py python3 strumenti/chicedomani/pezzi.py coordinamento
    python3 strumenti/coordinamento/serie.py ritocca   -> fondi di S03 e S08 ripuliti
    python3 strumenti/coordinamento/serie.py      -> grafica/anim.json

S02 la chiave si disegna (anello, poi l'asta), i due denti si accendono sui due requisiti. S06 le barrature rosse del
pacchetto si tolgono dai prezzi pieni e il motore le ridisegna (disegno «barra»), poi entrano i prezzi per gli iscritti.
"""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'chicedomani'))
from serie import P, DIS  # noqa: E402

PR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
VC = 'pdro-verso-il-coordinamento'
BANDE = [{'id': 'banda_su', 'm': ['rect', 0, 0, 1080, 111]}, {'id': 'banda_giu', 'm': ['rect', 0, 1809, 1080, 1920]}]
ROSSO = 'rgb(200,16,46)'


def T(id, x0, y0, x1, y1):
    return {'id': id, 'riempi': 'tinta', 'm': ['rect', x0, y0, x1, y1]}


def C(id, x0, y0, x1, y1, r=22, riempi='tinta'):
    return {'id': id, 'riempi': riempi, 'm': ['rrect', x0, y0, x1, y1, r]}


EPISODI = {VC: {
    'S01': {'base': 'overlay_clip/S01A.png', 'pezzi': [
        {'id': 'presenta', 'm': ['chiaro', 680, 1830, 1080, 1905, 110, 3]},
        {'id': 'chip', 'm': ['alfa', 85, 1222, 525, 1302, 230]},
        {'id': 'r1', 'm': ['chiaro', 85, 1335, 650, 1445, 150, 14]},
        {'id': 'r2', 'm': ['chiaro', 85, 1450, 1070, 1550, 150, 14]},
        {'id': 'sotto', 'm': ['chiaro', 85, 1578, 870, 1665, 140, 10]},
        *BANDE]},
    'S02': {'base': 'grafiche/S02A.png', 'pezzi': [
        T('tit1', 65, 275, 660, 375), T('tit2', 65, 380, 825, 462),
        T('d1', 697, 702, 744, 804), T('d2', 837, 702, 884, 844),
        T('asta', 322, 656, 966, 704), T('anello', 86, 556, 334, 806),
        C('c1', 68, 928, 1013, 1073), C('c2', 68, 1098, 1013, 1243),
        T('legge', 65, 1288, 440, 1335),
    ]},
    'S03': {'base': 'grafiche/S03A.png', 'pezzi': [
        {'id': 'tit1', 'm': ['chiaro', 65, 275, 650, 375, 150, 12]},
        {'id': 'tit2', 'm': ['chiaro', 65, 380, 745, 465, 150, 12]},
        T('cifra', 100, 625, 900, 720),
        C('card', 68, 518, 1013, 863, 32, 'diffusione'),
        *[C(f'k{i + 1}', 68, y, 1025, y + 93, 22, 'diffusione') for i, y in enumerate([918, 1028, 1138])],
    ]},
    'S04': {'base': 'overlay_clip/S04A.png', 'pezzi': [
        {'id': 'c60', 'm': ['alfa', 88, 1238, 274, 1310, 230]},
        {'id': 'c12', 'm': ['alfa', 285, 1238, 473, 1310, 230]},
        {'id': 'c500', 'm': ['alfa', 484, 1238, 870, 1310, 230]},
        {'id': 'online', 'm': ['chiaro', 85, 1360, 945, 1435, 150, 10]},
        {'id': 'turno', 'm': ['chiaro', 85, 1460, 680, 1555, 140, 10]},
        *BANDE]},
    'S05': {'base': 'grafiche/S05A.png', 'pezzi': [
        {'id': 'fiocco', 'riempi': 'tinta', 'm': ['chiaro', 436, 200, 646, 252, 120, 2]},
        T('coperchio', 298, 250, 783, 362),
        T('scatola', 328, 362, 753, 623),
        T('tit', 262, 640, 818, 720), T('nome', 198, 724, 888, 800),
        *[C(f'v{i + 1}', 68, y, 1013, y + 98, 22) for i, y in enumerate([848, 958, 1068, 1178, 1288])],
    ]},
    'S06': {'base': 'grafiche/S06A.png', 'pezzi': [
        T('tit1', 65, 275, 545, 375), T('tit2', 65, 385, 600, 480),
        {'id': 'o850', 'riempi': 'tinta', 'togli_rosso': True, 'm': ['rect', 610, 695, 800, 752]},
        {'id': 'o1500', 'riempi': 'tinta', 'togli_rosso': True, 'm': ['rect', 610, 1064, 838, 1122]},
        T('n640', 115, 665, 475, 770), T('n800', 115, 1035, 475, 1140),
        C('card1', 68, 538, 1013, 873, 30), C('card2', 68, 908, 1013, 1243, 30),
        T('nota', 65, 1298, 935, 1342),
    ]},
    'S07': {'base': 'grafiche/S07A.png', 'pezzi': [
        T('tit', 65, 298, 885, 372),
        *[{'id': f'p{i + 1}', 'riempi': 'diffusione', 'm': ['cerchio', 130, cy, 47]} for i, cy in enumerate([460, 765, 1015])],
        T('linea', 122, 500, 139, 1294),
        T('lab1', 195, 428, 410, 497), T('b1', 200, 518, 645, 682),
        T('lab2', 195, 733, 505, 802), T('b2', 200, 823, 625, 928),
        T('lab3', 195, 983, 395, 1052), T('b3', 200, 1073, 730, 1238),
    ]},
    # v2 (21/10): S08 sono i tre canali, già montati in clip/S08.mp4 da canali.py (fondo trasparente, nessun pezzo);
    # la vecchia chiusura diventa S09, coi pezzi «badge» e «box» poi sostituiti da grafica_v2/ (ritocca).
    'S08': {'base': 'grafica_v2/trasparente.png', 'pezzi': []},
    'S09': {'base': 'grafiche/S08A.png', 'pezzi': [
        {'id': 'r1', 'm': ['chiaro', 62, 290, 535, 392, 150, 12]},
        {'id': 'r2', 'm': ['chiaro', 62, 400, 615, 510, 150, 12]},
        C('badge', 68, 518, 703, 613, 47, 'diffusione'),
        C('box', 68, 978, 643, 1133, 24, 'diffusione'),
    ]},
}}


def ov(strati, bande_in=0.4):
    return {'tipo': 'overlay', 'fondi': [['fondo', 0]], 'strati': strati + [
        P('banda_su', ['bandaSu', 0, bande_in], fisso=True), P('banda_giu', ['bandaGiu', 0, bande_in], fisso=True)]}


ANIM = {
    'S01': ov([P('chip', ['pop', 0.6, 0.45]), P('r1', ['fade', 1.0, 1.0]), P('r2', ['fade', 1.5, 1.1]),
               P('sotto', ['wipe', 'quel', 0.9]), P('presenta', ['fade', 0.5, 0.6], fisso=True)], 0.6),
    'S02': {'tipo': 'pieno', 'fondi': [['fondo', 0]], 'camera': [[0, 1.0, 540, 900], [14, 1.04, 540, 860]], 'strati': [
        P('tit1', ['slam', 0.05, 0.3]), P('tit2', ['slam', 0.35, 0.3]),
        P('anello', ['zoom', 'chiara', 0.6]), P('asta', ['wipe', 'chiara+0.4', 0.8]),
        P('d1', ['wipeD', 'master', 0.4], fx=[['bagliore', 'master+0.3', 1.0]]),
        P('c1', ['slideR', 'master', 0.5]),
        P('d2', ['wipeD', 'almeno', 0.4], fx=[['bagliore', 'almeno+0.3', 1.0]]),
        P('c2', ['slideR', 'almeno', 0.5]),
        P('legge', ['fade', 'profilo', 0.6]),
    ]},
    'S03': {'tipo': 'pieno', 'fondi': [['fondo', 0]], 'camera': [[0, 1.0, 540, 960], [16, 1.04, 540, 900]], 'strati': [
        P('tit1', ['slam', 0.05, 0.3]), P('tit2', ['slam', 0.35, 0.3]),
        P('card', ['slideU', 'lindennita', 0.6]),
        P('cifra', ['slam', 'novemila', 0.35], fx=[['bagliore', 'novemila+0.3', 1.2]]),
        P('k1', ['risale', 'incarichi', 0.5]), P('k2', ['risale', 'anni', 0.5]), P('k3', ['risale', 'possono', 0.5]),
    ]},
    'S04': ov([P('c12', ['pop', 'anno', 0.4]), P('c60', ['pop', 'sessanta', 0.4]), P('c500', ['pop', 'cinquecento', 0.4]),
               P('online', ['wipe', 'lezioni', 0.8])]),
    # 21/10: «Anche dopo il turno.» non si mostra più (il pezzo resta ritagliato via dal fondo): Achille ha tolto la frase,
    # perché lo studio deve avvenire sempre fuori dall'orario di servizio.
    'S05': {'tipo': 'pieno', 'fondi': [['fondo', 0]], 'strati': [
        P('scatola', ['zoom', 0.15, 0.5]), P('fiocco', ['pop', 0.4, 0.4]), P('coperchio', ['pop', 0.35, 0.4]),
        P('tit', ['slam', 'pacchetto', 0.35]), P('nome', ['wipe', 'verso', 1.0]),
        P('v1', ['slideR', 'convenzioni', 0.45]), P('v2', ['slideR', 'guida', 0.45]), P('v3', ['slideR', 'passo#2', 0.45]),
        P('v4', ['slideR', 'accompagna', 0.45]), P('v5', ['slideR', 'dopo', 0.45]),
    ]},
    'S06': {'tipo': 'pieno', 'fondi': [['fondo', 0]], 'strati': [
        P('tit1', ['slam', 0.05, 0.3]), P('tit2', ['slam', 0.35, 0.3]),
        P('card1', ['slideR', 'unitelmasapienza', 0.5], figli=[P('o850', ['fade', 'unitelmasapienza', 0.3])]),
        DIS(tipo='barra', t='seicentoquaranta', d=0.4, x0=615, y0=722, x1=790, y1=722, col=ROSSO, w=7),
        P('n640', ['slam', 'seicentoquaranta+0.35', 0.35], fx=[['bagliore', 'seicentoquaranta+0.6', 1.0]]),
        P('card2', ['slideR', 'pegaso', 0.5], figli=[P('o1500', ['fade', 'pegaso', 0.3])]),
        DIS(tipo='barra', t='ottocento', d=0.4, x0=615, y0=1092, x1=828, y1=1092, col=ROSSO, w=7),
        P('n800', ['slam', 'ottocento+0.35', 0.35], fx=[['bagliore', 'ottocento+0.6', 1.0]]),
        P('nota', ['fade', 'rate', 0.6]),
    ]},
    'S07': {'tipo': 'pieno', 'fondi': [['fondo', 0]], 'strati': [
        P('tit', ['slam', 0.05, 0.3]), P('linea', ['wipeD', 0.3, 1.6]),
        P('p1', ['pop', 'prima', 0.35]), P('lab1', ['slideR', 'prima', 0.4]), P('b1', ['wipe', 'scegliere', 0.9]),
        P('p2', ['pop', 'durante', 0.35]), P('lab2', ['slideR', 'durante', 0.4]), P('b2', ['wipe', 'tirocinio', 0.8]),
        P('p3', ['pop', 'dopo', 0.35]), P('lab3', ['slideR', 'dopo', 0.4]), P('b3', ['wipe', 'regolamento', 1.0]),
    ]},
    'S08': {'tipo': 'overlay', 'fondi': [['fondo', 0]], 'strati': []},
    'S09': {'tipo': 'pieno', 'fondi': [['fondo', 0]], 'camera': [[0, 1.0, 540, 960], [17, 1.05, 540, 820]], 'strati': [
        P('r1', ['slam', 'arrivi', 0.35]), P('r2', ['slam', 'pronto', 0.35]),
        P('badge', ['pop', 'attenzione', 0.45], fx=[['pulsa', 'scadenze', 1.1, 0.05]]),
        P('box', ['pop', 'chiedi', 0.45], fx=[['pulsa', 'delegato', 1.1, 0.03]]),
    ]},
}

def ritocca():
    """Dopo pezzi.py: sulle foto sfocate di S03 e S09 i buchi riempiti lasciano macchie; S03 si sfoca tutta un po' di
    più (la foto è già sfocata), S09 solo dietro il riquadro dei contatti, con bordo sfumato; S05 riprende il crema."""
    from PIL import Image, ImageFilter
    D = f'{PR}/{VC}/grafica/pezzi'
    f = Image.open(f'{D}/S03/fondo.png'); f.filter(ImageFilter.GaussianBlur(16)).save(f'{D}/S03/fondo.png')
    f = Image.open(f'{D}/S09/fondo.png').convert('RGBA'); b = f.filter(ImageFilter.GaussianBlur(22))
    m = Image.new('L', f.size, 0); m.paste(255, (40, 500, 740, 1160)); m = m.filter(ImageFilter.GaussianBlur(30))
    Image.composite(b, f, m).save(f'{D}/S09/fondo.png')
    # v2: badge senza la data AOUP e riquadro dei delegati per azienda (grafiche_v2.mjs) al posto dei pezzi ritagliati
    import json
    info = json.load(open(f'{PR}/{VC}/grafica/pezzi.json'))
    for n in ('badge', 'box'):
        im = Image.open(f'{PR}/{VC}/grafica_v2/{n}.png').convert('RGBA'); x0, y0, x1, y1 = im.getbbox()
        im.crop((x0, y0, x1, y1)).save(f'{D}/S09/{n}.png'); info['S09'][n] = [x0, y0, x1 - x0, y1 - y0]
    json.dump(info, open(f'{PR}/{VC}/grafica/pezzi.json', 'w'))
    # S05: sotto il coperchio la tinta prende il verde della banda; si rimette il crema del fondo
    f = Image.open(f'{D}/S05/fondo.png').convert('RGBA'); f.paste(f.getpixel((100, 500)), (290, 251, 792, 368))
    f.save(f'{D}/S05/fondo.png')


if __name__ == '__main__':
    import json
    if sys.argv[1:] == ['ritocca']:
        ritocca(); sys.exit()
    json.dump(ANIM, open(f'{PR}/{VC}/grafica/anim.json', 'w'), ensure_ascii=False, indent=0)
    print(VC, list(ANIM))
