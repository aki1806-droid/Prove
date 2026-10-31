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
        C('chip', 45, 231, 1036, 372, 46, 'diffusione'), R('ghost', 285, 395, 805, 1035, 'diffusione'),
        R('titolo', titolo_x0, 1070, titolo_x1, 1195, 'diffusione'), R('desc', 31, 1207, 1050, 1330, 'diffusione'),
        C('box', 55, 1340, 1025, 1490, 24, 'diffusione')]}


EPISODI = {
    JK: {
        'S01': {'base': 'overlay_clip/S01A.png', 'pezzi': [
            CH('t1', 240, 1170, 840, 1330, 100), CH('t2', 240, 1330, 840, 1505, 100), CH('sotto', 280, 1510, 800, 1610, 130, 8),
            CH('presenta', 330, 1830, 1060, 1895, 110, 3), *BANDE]},
        'S02': {'base': 'grafiche/S02A.png', 'pezzi': [
            R('titolo', 170, 230, 905, 360), R('moneta', 220, 440, 860, 1080, 'diffusione'),
            R('promesse', 170, 1115, 905, 1238), R('tasche', 340, 1240, 725, 1358), R('spec', 255, 1390, 835, 1485)]},
        'S03': {'base': 'grafiche/S03A.png', 'pezzi': [
            R('titolo', 230, 380, 860, 640, 'diffusione'),
            R('b1', 190, 690, 930, 800, 'diffusione'), R('b2', 190, 830, 930, 945, 'diffusione'),
            R('b3', 190, 965, 930, 1080, 'diffusione'), R('b4', 190, 1105, 930, 1225, 'diffusione'),
            {'id': 'timbro', 'm': ['rosso', 360, 1240, 975, 1505]}]},
        'S04': {'base': 'overlay_clip/S04A.png', 'pezzi': [
            C('par', 80, 1172, 524, 1268, 46, 'diffusione'), C('inf', 556, 1172, 1000, 1268, 46, 'diffusione'),
            CH('t1', 80, 1330, 900, 1430), CH('t2', 80, 1430, 840, 1528, 100), CH('sotto', 80, 1565, 900, 1630, 120, 8),
            *BANDE]},
        'S05': {'base': 'overlay_clip/S05A.png', 'pezzi': [
            CH('t1', 70, 1240, 880, 1335), CH('t2', 70, 1335, 760, 1430), CH('lui', 70, 1455, 330, 1600, 100), *BANDE]},
        'S06': {'base': 'grafiche/S06A.png', 'pezzi': [
            R('titolo', 220, 225, 860, 355), C('hj', 52, 390, 530, 533, 22, 'diffusione'),
            C('hc', 550, 390, 1032, 533, 22, 'diffusione'),
            *[C(f'{l}{i}', x0, y0, x1, y1, 18, 'diffusione') for i, (y0, y1) in
              enumerate([(554, 715), (725, 885), (895, 1055), (1065, 1225), (1235, 1395)], 1)
              for l, x0, x1 in (('j', 58, 524), ('c', 555, 1025))]]},
        'S07': {'base': 'grafiche/S07A.png', 'pezzi': [
            CH('t1', 40, 250, 900, 358), CH('t2', 40, 358, 900, 470, 110), CH('dolc', 60, 485, 720, 572, 110, 8),
            CH('connoi', 60, 572, 800, 660, 130, 8), R('luci', 80, 670, 1075, 1195, 'diffusione'),
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
            CH('t1', 40, 250, 700, 365, 110), CH('t2', 40, 365, 700, 490), CH('p1', 60, 505, 720, 590, 130, 8),
            CH('p2', 60, 590, 780, 670, 100, 8), C('box', 66, 755, 646, 1134, 26, 'diffusione')]},
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
        'S07': pieno([P('t1', ['slam', 'dolcetto', 0.35]), P('t2', ['slam', 'tu', 0.35]), P('p1', ['wipe', 'porta', 1.0]),
                      P('p2', ['wipe', 'riga', 1.0]), P('box', ['pop', 0.6, 0.45], fx=[['pulsa', 'aspettiamo', 1.1, 0.04]])],
                     camera=[[0, 1.0, 540, 960], [11, 1.04, 540, 900]]),
    },
}


if __name__ == '__main__':
    import json
    for pg, a in ANIM.items():
        os.makedirs(f'{PR}/{pg}/grafica', exist_ok=True)
        json.dump(a, open(f'{PR}/{pg}/grafica/anim.json', 'w'), ensure_ascii=False, indent=0)
        print(pg, list(a))
