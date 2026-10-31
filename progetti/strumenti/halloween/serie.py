"""Specifica dei due reel di Halloween 2026 (CISL FP Padova Rovigo, solo AOUP): pezzi da ritagliare dalle grafiche del
pacchetto (EPISODI, per ../chicedomani/pezzi.py con SERIE=questo file) e regia sulle parole (ANIM, per
../chicedomani/motore.html). Stesso schema di ../volantini/serie.py.

    SERIE=strumenti/halloween/serie.py python3 strumenti/chicedomani/pezzi.py
    python3 strumenti/halloween/serie.py            -> grafica/anim.json dei due progetti
    python3 strumenti/chicedomani/monta.py pdro-halloween-jack PDRO_Halloween_Jack_O_Lantern_9x16
    python3 strumenti/halloween/suoni.py jack|fantasmi

Regia del pacchetto. Jack: titolo a colpi (S01), la moneta col diavoletto che oscilla e le parole PROMESSE, MONETE E
TASCHE (S02), gli annunci sulla pergamena uno alla volta e il timbro FONTE: BOH con l'urto (S03), i due CHIUSO (S04),
LUI. grande (S05), le cinque differenze a coppie (S06), le luci che si accendono e i contatti (S07). Fantasmi: titolo che
cade (S01), per ogni fantasma la pastiglia, il fantasma che ondeggia, il nome, la descrizione e il «come si scaccia»
(S02-S05), «Niente aglio. Niente acqua santa.» (S06), il dolcetto e i contatti (S07).
Video solo per l'AOUP: contatti di Achille e Giovanna; dal riquadro dei Fantasmi è tolta la sede di Rovigo
(grafiche/S07A.png; l'originale in grafiche/originali/).
"""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'chicedomani'))
from serie import P  # noqa: E402

PR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
JK, FA = 'pdro-halloween-jack', 'pdro-halloween-fantasmi'
TR, SM = 'pdro-halloween-turno', 'pdro-halloween-sindamatch'
BANDE = [{'id': 'banda_su', 'm': ['rect', 0, 0, 1080, 117]}, {'id': 'banda_giu', 'm': ['rect', 0, 1810, 1080, 1920]}]


def R(id, x0, y0, x1, y1, riempi='tinta'):
    return {'id': id, 'riempi': riempi, 'm': ['rect', x0, y0, x1, y1]}


def C(id, x0, y0, x1, y1, r=22, riempi='tinta'):
    return {'id': id, 'riempi': riempi, 'm': ['rrect', x0, y0, x1, y1, r]}


def CH(id, x0, y0, x1, y1, soglia=150, allarga=10):
    return {'id': id, 'm': ['chiaro', x0, y0, x1, y1, soglia, allarga]}


def fantasma(base, titolo_x0=150, titolo_x1=930):
    """schema comune dei quattro fantasmi (S02-S05 dei Fantasmi del cedolino)."""
    return {'base': base, 'pezzi': [
        C('chip', 45, 231, 1036, 372, 46, 'diffusione'), R('ghost', 22, 374, 1058, 1062, 'righe'),
        R('titolo', titolo_x0, 1070, titolo_x1, 1195, 'diffusione'), R('desc', 31, 1207, 1050, 1330, 'diffusione'),
        C('box', 55, 1340, 1025, 1490, 24, 'diffusione')]}


EPISODI = {
    JK: {
        'S01': {'base': 'overlay_clip/S01A.png', 'pezzi': [
            CH('t1', 240, 1170, 840, 1330, 100), CH('t2', 240, 1330, 840, 1505, 100), CH('sotto', 280, 1510, 800, 1610, 130, 8),
            CH('presenta', 330, 1830, 1060, 1895, 110, 3), *BANDE]},
        'S02': {'base': 'grafiche/S02A.png', 'pezzi': [
            R('titolo', 170, 230, 905, 360), R('moneta', 40, 372, 1040, 1104, 'righe'),
            R('promesse', 150, 1108, 930, 1240, 'righe'), R('tasche', 320, 1240, 745, 1366, 'righe'),
            R('spec', 235, 1383, 855, 1494, 'righe')]},
        'S03': {'base': 'grafiche/S03A.png', 'pezzi': [
            R('titolo', 230, 380, 860, 640, 'diffusione'),
            R('b1', 190, 690, 930, 800, 'diffusione'), R('b2', 190, 830, 930, 945, 'diffusione'),
            R('b3', 190, 965, 930, 1080, 'diffusione'), R('b4', 190, 1105, 930, 1225, 'diffusione'),
            {'id': 'timbro', 'm': ['rosso', 360, 1240, 975, 1505]}]},
        'S04': {'base': 'overlay_clip/S04A.png', 'pezzi': [
            C('par', 72, 1164, 532, 1276, 52, 'diffusione'), C('inf', 548, 1164, 1008, 1276, 52, 'diffusione'),
            CH('t1', 80, 1330, 900, 1430), CH('t2', 80, 1430, 840, 1528, 100), CH('sotto', 80, 1565, 900, 1630, 120, 8),
            *BANDE]},
        'S05': {'base': 'overlay_clip/S05A.png', 'pezzi': [
            CH('t1', 70, 1240, 880, 1335), CH('t2', 70, 1335, 760, 1430), CH('lui', 70, 1455, 330, 1600, 100), *BANDE]},
        'S06': {'base': 'grafiche/S06A.png', 'pezzi': [
            R('titolo', 220, 225, 860, 355), C('hj', 46, 384, 536, 539, 24, 'righe'),
            C('hc', 544, 384, 1038, 539, 24, 'righe'),
            *[C(f'{l}{i}', x0 - 7, y0 - 6, x1 + 7, y1 + 6, 22, 'righe') for i, (y0, y1) in
              enumerate([(554, 715), (725, 885), (895, 1055), (1065, 1225), (1235, 1395)], 1)
              for l, x0, x1 in (('j', 58, 524), ('c', 555, 1025))]]},
        'S07': {'base': 'grafiche/S07A.png', 'pezzi': [
            CH('t1', 30, 240, 940, 360, 150, 18), CH('t2', 30, 360, 940, 476, 110, 18), CH('dolc', 40, 478, 760, 574, 110, 16),
            CH('connoi', 40, 574, 840, 664, 130, 16), R('luci', 8, 640, 1072, 1235, 'righe'),
            C('box', 66, 1242, 564, 1505, 24, 'diffusione')]},
    },
    FA: {
        'S01': {'base': 'overlay_clip/S01A.png', 'pezzi': [
            CH('t1', 230, 1180, 850, 1305, 120), CH('t2', 230, 1318, 850, 1445, 100), CH('sotto', 200, 1480, 890, 1565, 130, 8),
            CH('presenta', 330, 1830, 1060, 1895, 110, 3), *BANDE]},
        'S02': fantasma('grafiche/S02A.png'), 'S03': fantasma('grafiche/S03A.png'),
        'S04': fantasma('grafiche/S04A.png', 40, 1040), 'S05': fantasma('grafiche/S05A.png', 13, 1067),
        'S06': {'base': 'overlay_clip/S06A.png', 'pezzi': [
            CH('t1', 80, 1260, 700, 1345), CH('t2', 80, 1355, 960, 1445), CH('t3', 80, 1485, 760, 1575, 110, 8), *BANDE]},
        'S07': {'base': 'grafiche/S07A.png', 'pezzi': [
            CH('t1', 30, 240, 760, 368, 110, 18), CH('t2', 30, 368, 760, 496, 150, 18), CH('p1', 40, 496, 780, 592, 130, 18),
            CH('p2', 40, 592, 820, 676, 100, 18), C('box', 66, 755, 646, 1134, 26, 'diffusione')]},
    },
    TR: {
        'S01': {'base': 'overlay_clip/S01A.png', 'pezzi': [
            CH('presenta', 150, 1170, 930, 1232, 110, 3), CH('t1', 150, 1262, 930, 1345, 120, 6),
            CH('t2', 150, 1350, 930, 1440, 120, 6), *BANDE]},
        'S02': {'base': 'grafiche/S02A.png', 'pezzi': [
            *[{'id': f'c{i * 5 + j + 1}', 'riempi': 'tinta', 'm': ['cerchio', x, y, 58]} for i, y in enumerate((380, 500, 620, 740, 860, 980))
              for j, x in enumerate((170, 340, 510, 680, 850))],
            R('t1', 150, 1170, 930, 1300), R('t2', 150, 1320, 930, 1450)]},
        'S03': {'base': 'grafiche/S03A.png', 'pezzi': [
            R('t1', 150, 1430, 930, 1535), R('t2', 150, 1555, 930, 1665),
            C('dots', 578, 826, 790, 903, 30, 'diffusione'), C('msg', 284, 553, 790, 800, 26, 'diffusione'),
            C('tel', 222, 328, 848, 1356, 50, 'diffusione')]},
        'S04': {'base': 'grafiche/S04A.png', 'pezzi': [
            CH('r1', 60, 200, 350, 370, 120, 5), CH('r2', 360, 200, 690, 370, 120, 5), CH('r3', 690, 200, 1060, 370, 120, 5),
            {'id': 'titolo', 'm': ['rosso', 130, 1320, 950, 1545]},
            CH('basato', 150, 1568, 930, 1630, 140, 5), CH('ogni', 150, 1635, 930, 1690, 110, 4)]},
        'S05': {'base': 'grafiche/S05A.png', 'pezzi': [
            R('titolo', 150, 240, 930, 355), R('sotto', 150, 365, 930, 445),
            *[{'id': f'o{i}', 'm': ['giallo', 95, y0 + 20, 235, y1 - 20]} for i, (y0, y1) in
              enumerate([(546, 706), (744, 908), (943, 1107), (1141, 1305)], 1)],
            *[C(f'm{i}', 54, y0 - 6, 1018, y1 + 6, 22, 'tinta') for i, (y0, y1) in
              enumerate([(546, 706), (744, 908), (943, 1107), (1141, 1305)], 1)],
            R('fine', 150, 1385, 930, 1470)]},
        'S06': {'base': 'overlay_clip/S06A.png', 'pezzi': [
            {'id': 'badge', 'm': ['giallo', 270, 225, 810, 300]}, CH('t1', 120, 340, 960, 455, 140, 6),
            CH('t2', 150, 470, 930, 575, 110, 6), CH('p1', 120, 1468, 960, 1532, 140, 5),
            CH('p2', 120, 1538, 960, 1602, 140, 5), CH('p3', 120, 1622, 960, 1702, 100, 5)]},
        'S07': {'base': 'grafiche/S07A.png', 'pezzi': [
            CH('t1', 30, 255, 1040, 380, 140, 20), CH('t2', 30, 380, 1040, 492, 110, 20), CH('r1', 40, 492, 940, 584, 130, 18),
            CH('r2', 40, 584, 940, 668, 100, 18), C('box', 60, 752, 640, 1068, 24, 'diffusione')]},
    },
    SM: {
        'S01': {'base': 'grafiche/S01A.png', 'pezzi': [
            CH('cuore', 250, 490, 830, 968, 100, 10), CH('titolo', 80, 962, 1000, 1104, 130, 28),
            CH('edition', 160, 1100, 920, 1206, 110, 28), CH('s1', 90, 1278, 990, 1378, 120, 28),
            CH('s2', 90, 1378, 990, 1470, 120, 28), CH('s3', 60, 1486, 1020, 1580, 110, 24)]},
        **{s: {'base': f'grafiche/{s}A.png', 'pezzi': [
            {'id': 'timbro', 'm': ['rosso', 520, 440, 1010, 900]}, C('card', 160, 428, 920, 1330, 30),
            C('no', 298, 1438, 452, 1594, 77), C('si', 616, 1438, 774, 1594, 77)]} for s in ('S02', 'S03', 'S04', 'S05')},
        'S06': {'base': 'grafiche/S06A.png', 'fondi': {'fondo': 'grafiche/S06A.png', 'fondoB': 'grafiche/S06B.png'}, 'pezzi': [
            {'id': 'timbro', 'm': ['verde', 160, 440, 760, 870]}, C('card', 160, 428, 920, 1330, 30),
            C('no', 298, 1438, 452, 1594, 77), C('si', 616, 1438, 774, 1594, 77),
            {'id': 'eun', 'src': 'grafiche/S06B.png', 'm': ['chiaro', 250, 280, 830, 380, 200, 5]},
            {'id': 'match', 'src': 'grafiche/S06B.png', 'm': ['giallo', 250, 390, 830, 570]},
            {'id': 'cuoreB', 'src': 'grafiche/S06B.png', 'm': ['chiaro', 440, 1225, 640, 1365, 100, 4]}]},
        'S07': {'base': 'grafiche/S07A.png', 'pezzi': [
            CH('t1', 30, 262, 1040, 375, 150, 18), CH('t2', 30, 375, 1050, 480, 90, 18), CH('t3', 30, 488, 1040, 598, 130, 18),
            C('box', 60, 750, 645, 1105, 24, 'diffusione')]},
    },
}


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


def anim_fantasma(nome, desc, box):
    return pieno([P('chip', ['slam', 0.15, 0.3]), P('ghost', ['pop', 'numero', 0.5], fx=[['ondeggia', 2.4, 4]]),
                  P('titolo', ['drop', nome, 0.35]), P('desc', ['wipe', desc, 1.0]), P('box', ['slideL', box, 0.45])],
                 camera=[[0, 1.0, 540, 960], [12, 1.03, 540, 900]])


def profilo(parola, uscita, bottone='no', via='strappa'):
    """SindaMatch S02-S06: la card sale, sulla parola il timbro (NOPE o LIKE) e il bottone pulsa, poi la card vola via.
    La foto della card è viva: la clip Kling ci passa sopra fino al timbro (finestra, montata da ../chicedomani/monta.py)."""
    b = {'no': P('no', ['pop', 0.2, 0.4]), 'si': P('si', ['pop', 0.3, 0.4])}
    b[bottone]['fx'] = [['pulsa', parola, 0.4, 0.14, f'{parola}+1.2']]
    if bottone == 'si':
        for x in b.values():
            x['out'] = ['fade', 'subito', 0.04]
    s = pieno([*b.values(), P('card', ['slideU', 0, 0.5], [via, uscita, 0.6], figli=[P('timbro', ['slam', parola, 0.3])])])
    if bottone == 'si':
        s['strati'] += [P('eun', ['slam', 'subito', 0.35]), P('match', ['slam', 'subito+0.15', 0.4], fx=[['bagliore', 'match', 1.0]]),
                        P('cuoreB', ['pop', 'match+0.2', 0.4], fx=[['pulsa', 'match+0.6', 0.6, 0.08]])]
        s['urti'] = ['subito']
    s['finestra'] = {'rect': [160, 430, 760, 898], 'da': 0.55, 'a': parola, 'sfuma': [530, 650], 'raggio': 30}
    return s


ANIM = {
    JK: {
        # fiaba gotica: il titolo a colpi su «Jack» e «il Furbo», la firma della serie in basso
        'S01': ov([P('t1', ['slam', 'chiamato$+0.1', 0.35]), P('t2', ['slam', 'furbo', 0.35]),
                   P('sotto', ['wipe', 'prometteva', 1.2]), P('presenta', ['fade', 0.5, 0.6], fisso=True)], 0.5),
        # la moneta col diavoletto entra sul Diavolo e oscilla; PROMESSE, MONETE / E TASCHE sulle parole
        'S02': pieno([P('titolo', ['slam', 0.2, 0.35]), P('moneta', ['pop', 'diavolo', 0.5], fx=[['ondeggia', 1.6, 8]]),
                      P('promesse', ['slam', 'promesse', 0.35]), P('tasche', ['slam', 'tasche', 0.35]),
                      P('spec', ['wipe', 'specialita', 1.0])], urti=['tasche+0.3']),
        # gli annunci uno alla volta, il timbro FONTE: BOH cade con l'urto
        'S03': pieno([P('titolo', ['wipe', 0.2, 0.8]), P('b1', ['wipe', 'arretrati', 0.7]), P('b2', ['wipe', 'aumenti', 0.7]),
                      P('b3', ['wipe', 'date', 0.7]), P('b4', ['wipe', 'anzi', 0.7]), P('timbro', ['drop', 'nessuno', 0.3])],
                     urti=['nessuno+0.3'], camera=[[0, 1.0, 540, 960], ['nessuno', 1.05, 640, 1250]]),
        'S04': ov([P('par', ['pop', 'paradiso', 0.4]), P('inf', ['pop', 'allinferno', 0.4]),
                   P('t1', ['slam', 'troppe', 0.35]), P('t2', ['slam', 'mantenute', 0.35]), P('sotto', ['wipe', 'diavolo', 1.2])]),
        'S05': ov([P('t1', ['wipe', 'luce', 0.9]), P('t2', ['wipe', 'sola', 0.8]),
                   P('lui', ['slam', 'lui', 0.4], fx=[['bagliore', 'lui', 1.2]])]),
        # le cinque differenze a coppie: prima la zucca, poi la risposta della CISL FP
        'S06': pieno([P('titolo', ['slam', 0.2, 0.35]), P('hj', ['slideL', 'differenza', 0.4]), P('hc', ['slideR', 'differenza+0.2', 0.4]),
                      P('j1', ['slideL', 'promette', 0.4]), P('c1', ['slideR', 'diciamo', 0.4]),
                      P('j2', ['slideL', 'buio', 0.4]), P('c2', ['slideR', 'sole', 0.4]),
                      P('j3', ['slideL', 'inventa', 0.4]), P('c3', ['slideR', 'comunichiamo', 0.4]),
                      P('j4', ['slideL', 'sparisce', 0.4]), P('c4', ['slideR', 'restiamo', 0.4]),
                      P('j5', ['slideL', 'restiamo$+0.3', 0.4]), P('c5', ['slideR', 'restiamo$+0.7', 0.4])]),
        # chiusura: lo slogan, le luci che si accendono, i contatti subito (pulsano sulle ultime parole)
        'S07': pieno([P('t1', ['slam', 'nostra', 0.35]), P('t2', ['slam', 'tutti', 0.35]), P('luci', ['fade', 'luci', 1.4]),
                      P('dolc', ['wipe', 'dolcetto', 0.9]), P('connoi', ['wipe', 'niente', 1.0]),
                      P('box', ['pop', 0.6, 0.45], fx=[['pulsa', 'scherzetti', 1.1, 0.04]])],
                     camera=[[0, 1.0, 540, 960], [16, 1.04, 540, 900]]),
    },
    FA: {
        'S01': ov([P('t1', ['drop', 'fantasmi', 0.4]), P('t2', ['drop', 'fantasmi+0.5', 0.4]),
                   P('sotto', ['wipe', 'nascondono', 1.2]), P('presenta', ['fade', 0.5, 0.6], fisso=True)], 0.5),
        'S02': anim_fantasma('straordinario', 'fatto', 'stanche'),
        'S03': anim_fantasma('strega', 'arretrate', 'attenzione'),
        'S04': anim_fantasma('zombie', 'turni', 'controlla'),
        'S05': anim_fantasma('vampiro', 'voci', 'accende'),
        'S06': ov([P('t1', ['slam', 'aglio', 0.35]), P('t2', ['slam', 'santa', 0.35]), P('t3', ['wipe', 'evidenziatore', 1.0])]),
        'S07': pieno([P('t1', ['slam', 0.1, 0.25]), P('t2', ['slam', 0.25, 0.25]), P('p1', ['wipe', 0.35, 0.4]),
                      P('p2', ['wipe', 0.5, 0.4]), P('box', ['pop', 0.0, 0.25], fx=[['pulsa', 'aspettiamo', 1.1, 0.04]])],
                     camera=[[0, 1.0, 540, 960], [11, 1.04, 540, 900]]),
    },
    TR: {
        # trailer: il cartello «una produzione» e le due righe sul corridoio animato
        'S01': ov([P('presenta', ['fade', 0.2, 0.6], fisso=True), P('t1', ['wipe', 'reparto', 1.0]),
                   P('t2', ['wipe', 'notte', 1.0])], 0.5),
        # i trenta campanelli si accendono a cascata e suonano sul telefono che squilla
        'S02': pieno([*[P(f'c{i}', ['pop', round(0.05 + (i - 1) * 0.02, 2), 0.25],
                          fx=[['pulsa', 'squilla', 0.3, 0.14, 'coordinatore$']]) for i in range(1, 31)],
                      P('t1', ['slam', 'campanelli', 0.35]), P('t2', ['slam', 'oss', 0.35])],
                     camera=[[0, 1.0, 540, 960], [10, 1.04, 540, 900]], urti=['squilla']),
        # il messaggio del coordinatore col telefono che vibra; l'urlo tagliato su «più»
        'S03': pieno([P('tel', ['slideU', 0, 0.45], fx=[['trema', 0.45, 1.1, 9]], figli=[
                          P('msg', ['pop', 'puoi', 0.4]),
                          P('dots', ['pop', 'mattina$+0.2', 0.3], fx=[['lampeggia', 'mattina$+0.5', 'rispetti$', 0.5]])]),
                      P('t1', ['slam', 'giorno', 0.35]), P('t2', ['slam', 'riposo', 0.35])],
                     camera=[[0, 1.0, 540, 960], [10, 1.05, 540, 900]], urti=['piu']),
        # la locandina: le recensioni scorrono, il titolo gocciola dall'alto
        'S04': pieno([P('titolo', ['wipeD', 'turno', 1.1], fx=[['bagliore', 'turno', 1.0]]),
                      P('r1', ['slideR', 'critica', 0.45]), P('r2', ['slideR', 'unanime', 0.45]),
                      P('r3', ['slideR', 'terrificante', 0.45]), P('basato', ['wipe', 'basato', 0.9]),
                      P('ogni', ['fade', 'vera', 0.6])],
                     camera=[[0, 1.06, 540, 1000], [3, 1.0, 540, 960], [11, 1.03, 540, 1000]], urti=['turno']),
        # i quattro mostri: ogni riga entra e gli occhi gialli si aprono
        'S05': pieno([P('titolo', ['slam', 'mostri', 0.35]), P('sotto', ['wipe', 'zanne', 0.8]),
                      *[P(f'm{i}', ['slideL', w, 0.45], figli=[P(f'o{i}', ['apri', f'{w}+0.45', 0.3])])
                        for i, w in enumerate(('carenze', 'doppi', 'riposi', 'aggressioni'), 1)],
                      P('fine', ['wipe', 'spariscono', 1.0])], urti=['aggressioni+0.4']),
        # il sequel: luce piena, PROSSIMAMENTE e il nuovo titolo
        'S06': {'tipo': 'overlay', 'fondi': [['fondo', 0]], 'strati': [
            P('badge', ['pop', 'seguito', 0.45]), P('t1', ['slam', 'due', 0.35]), P('t2', ['wipe', 'organici', 0.8]),
            P('p1', ['wipe', 'personale', 0.9]), P('p2', ['wipe', 'turni', 0.8]), P('p3', ['wipe', 'film', 1.0])]},
        'S07': pieno([P('t1', ['slam', 0.1, 0.25]), P('t2', ['slam', 0.25, 0.25]), P('r1', ['wipe', 0.35, 0.4]),
                      P('r2', ['wipe', 0.5, 0.4]), P('box', ['pop', 0.0, 0.25], fx=[['pulsa', 'paura', 1.1, 0.04]])],
                     camera=[[0, 1.0, 540, 960], [14, 1.04, 540, 900]]),
    },
    SM: {
        'S01': pieno([P('cuore', ['pop', 0.1, 0.5], fx=[['pulsa', 0.6, 0.8, 0.06]]), P('titolo', ['slam', 'sindamatch', 0.35]),
                      P('edition', ['slam', 'sindamatch+0.5', 0.35]), P('s1', ['wipe', 'scegli', 0.9]),
                      P('s2', ['wipe', 'prossimi', 0.9]), P('s3', ['fade', 'attenzione', 0.6])],
                     camera=[[0, 1.0, 540, 960], [13, 1.04, 540, 960]]),
        'S02': profilo('sinistra', 'volte'), 'S03': profilo('sinistra', 'sinistra$+0.2'),
        'S04': profilo('sinistra', 'croce'), 'S05': profilo('sinistra', 'avvolga'),
        # il LIKE e poi «È un match!» con i coriandoli (seconda grafica)
        'S06': {**profilo('destra', 'destra$+0.1', 'si', 'su'), 'fondi': [['fondo', 0], ['fondoB', 'subito', 0.04]]},
        'S07': pieno([P('t1', ['slam', 0.1, 0.25]), P('t2', ['slam', 0.25, 0.25]), P('t3', ['wipe', 0.35, 0.4]),
                      P('box', ['pop', 0.0, 0.25], fx=[['pulsa', 'cedolino', 1.1, 0.04]])],
                     camera=[[0, 1.0, 540, 960], [15, 1.04, 540, 900]]),
    },
}


if __name__ == '__main__':
    import json
    for pg, a in ANIM.items():
        os.makedirs(f'{PR}/{pg}/grafica', exist_ok=True)
        # la finestra della clip (SindaMatch) va in secondi: monta.py non legge le parole
        for sid, sc in a.items():
            if 'finestra' in sc:
                from suoni import ancora
                parole = json.load(open(f'{PR}/{pg}/audio/parole.json'))[sid]
                sc['finestra'] = {**sc['finestra'], 'clip': f'clip_kling/{sid}.mp4',
                                  'a': round(ancora(sc['finestra']['a'], parole), 3)}
        json.dump(a, open(f'{PR}/{pg}/grafica/anim.json', 'w'), ensure_ascii=False, indent=0)
        print(pg, list(a))
