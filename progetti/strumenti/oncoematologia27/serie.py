"""Specifica del reel «Oncoematologia pediatrica – il confronto del 27 ottobre»: pezzi da ritagliare (EPISODI, per
../chicedomani/pezzi.py con SERIE=questo file) e regia sulle parole (ANIM, per ../chicedomani/motore.html). Stesso schema di
../volantini/serie.py.

    SERIE=strumenti/oncoematologia27/serie.py python3 strumenti/chicedomani/pezzi.py
    python3 strumenti/oncoematologia27/serie.py ritocca   -> COLPEVOLI e ALLARMISMI senza la barratura del pacchetto
    python3 strumenti/oncoematologia27/serie.py    -> grafica/anim.json
    python3 strumenti/chicedomani/monta.py pdro-oncoematologia-27-ottobre PDRO_Oncoematologia_confronto_27_ottobre_9x16

S01/S04/S06/S08 overlay sulle clip Higgsfield, le altre scene sono le grafiche del pacchetto. Regia del pacchetto: data e
titolo in dissolvenza (S01), COLPEVOLI e ALLARMISMI barrati uno alla volta e le tre parole che entrano con forza (S02), le
tre card che salgono (S03), la tabella delle quattro richieste che si accende (S05: la prima; S07: la seconda, la terza e la
quarta, i bollini per ultimi), GRAZIE grande e le quattro righe a mano una alla volta (S08). Le schede spente della tabella
vengono dall'altra grafica (S05 prende le spente da S07 e viceversa), così una scheda si accende sopra la sua versione spenta.
Video solo per l'AOUP: i contatti della chiusura restano Achille e Giovanna, come nel pacchetto.
"""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'chicedomani'))
from serie import P, DIS  # noqa: E402

PR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
PG = 'pdro-oncoematologia-27-ottobre'
BANDE = [{'id': 'banda_su', 'm': ['rect', 0, 0, 1080, 111]}, {'id': 'banda_giu', 'm': ['rect', 0, 1810, 1080, 1920]}]
S05, S07 = 'grafiche/S05A.png', 'grafiche/S07A.png'
# le quattro schede della tabella (stesse coordinate in S05 e S07) e i bollini
SCHEDA = {1: (60, 520, 1022, 752), 2: (60, 774, 1022, 1006), 3: (60, 1030, 1022, 1262), 4: (60, 1284, 1022, 1516)}


def C(id, box, r=24, riempi='tinta', **k):
    return {'id': id, 'riempi': riempi, 'm': ['rrect', *box, r], **k}


def CH(id, x0, y0, x1, y1, soglia=150, allarga=10, **k):
    return {'id': id, 'm': ['chiaro', x0, y0, x1, y1, soglia, allarga], **k}


EPISODI = {PG: {
    'S01': {'base': 'overlay_clip/S01A.png', 'pezzi': [
        C('chip', (86, 1128, 604, 1204), 38, 'diffusione'), CH('t1', 80, 1240, 995, 1348), CH('t2', 80, 1350, 670, 1445, 120),
        CH('sotto', 80, 1462, 975, 1535, 130, 8), CH('presenta', 680, 1835, 1060, 1895, 110, 3), *BANDE]},
    'S02': {'base': 'grafiche/S02A.png', 'pezzi': [
        {'id': 'colp', 'riempi': 'diffusione', 'm': ['rect', 50, 535, 715, 628]},
        {'id': 'allarm', 'riempi': 'diffusione', 'm': ['rect', 50, 675, 785, 768]},
        CH('vogl', 60, 868, 495, 950), CH('risp', 60, 965, 640, 1075, 120), CH('trasp', 60, 1088, 910, 1195),
        CH('soluz', 60, 1208, 705, 1315, 110)]},
    'S03': {'base': 'grafiche/S03A.png', 'pezzi': [
        C('c1', (70, 420, 1012, 648)), C('c2', (70, 676, 1012, 904)), C('c3', (70, 932, 1012, 1160))]},
    'S04': {'base': 'overlay_clip/S04A.png', 'pezzi': [
        CH('t1', 80, 1250, 660, 1360), CH('t2', 80, 1362, 935, 1470, 120), CH('sotto', 80, 1495, 890, 1570, 130, 8), *BANDE]},
    'S05': {'base': S05, 'pezzi': [
        CH('h1', 60, 260, 500, 345), CH('h2', 60, 350, 740, 455, 120),
        C('b1', (226, 666, 498, 724), 29),
        C('r1', SCHEDA[1], 26, 'diffusione'),
        C('r1spenta', SCHEDA[1], 26, src=S07, buca=False)]},
    'S06': {'base': 'overlay_clip/S06A.png', 'pezzi': [
        CH('t1', 80, 1200, 815, 1295), CH('t2', 80, 1300, 780, 1395, 120), CH('sotto', 80, 1435, 840, 1515, 130, 8), *BANDE]},
    'S07': {'base': S07, 'pezzi': [
        C('b2', (226, 922, 388, 980), 29), C('b3', (226, 1178, 406, 1236), 29), C('b4', (226, 1432, 486, 1490), 29),
        C('l2', SCHEDA[2], 26, 'diffusione'), C('l3', SCHEDA[3], 26, 'diffusione'), C('l4', SCHEDA[4], 26, 'diffusione'),
        C('s2', SCHEDA[2], 26, src=S05, buca=False), C('s3', SCHEDA[3], 26, src=S05, buca=False),
        C('s4', SCHEDA[4], 26, src=S05, buca=False)]},
    'S08': {'base': 'overlay_clip/S08A.png', 'pezzi': [
        CH('grazie', 80, 1155, 710, 1290), CH('l1', 80, 1318, 570, 1380, 130, 8), CH('l2', 80, 1388, 730, 1450, 130, 8),
        CH('l3', 80, 1460, 600, 1520, 120, 8), CH('l4', 80, 1532, 650, 1595, 120, 8), *BANDE]},
    'S09': {'base': 'grafiche/S09A.png', 'pezzi': [
        CH('t1', 60, 275, 630, 372), CH('t2', 60, 380, 610, 480, 120), CH('s1', 60, 512, 520, 585, 130, 8),
        CH('s2', 60, 595, 510, 670, 120, 8), C('box', (66, 776, 646, 1124), 26, 'diffusione')]},
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


def barra(t, x0, x1, y):
    return DIS(tipo='barra', t=t, x0=x0, x1=x1, y0=y, y1=y, w=12, col='#c8102e', d=0.45)


ANIM = {
    # data e titolo in dissolvenza, ritmo sobrio
    'S01': ov([P('chip', ['pop', 0.3, 0.45]), P('t1', ['fade', 'tavolo', 0.9]), P('t2', ['fade', 'tavolo+0.5', 0.9]),
               P('sotto', ['wipe', 'tema', 1.3]), P('presenta', ['fade', 0.6, 0.8], fisso=True)], 0.6),
    # COLPEVOLI e ALLARMISMI barrati uno alla volta, poi le tre parole con forza
    'S02': pieno([P('colp', ['fade', 'colpevoli-0.6', 0.3]), barra('colpevoli', 60, 690, 582),
                  P('allarm', ['fade', 'allarmismi-0.6', 0.3]), barra('allarmismi', 60, 760, 722),
                  P('vogl', ['slam', 'vogliamo', 0.3]), P('risp', ['slam', 'risposte', 0.3]),
                  P('trasp', ['slam', 'trasparenza', 0.3]), P('soluz', ['slam', 'soluzioni', 0.3])]),
    # le tre card salgono una alla volta
    'S03': pieno([P('c1', ['risale', 'cause', 0.6]), P('c2', ['risale', 'trasferimento', 0.6]),
                  P('c3', ['risale', 'salute', 0.6])]),
    'S04': ov([P('t1', ['slam', 'vigilare', 0.35]), P('t2', ['slam', 'vigilare$+0.3', 0.35]), P('sotto', ['wipe', 'segnalazione', 1.4])]),
    # la tabella: la prima richiesta si accende, il bollino verde per ultimo
    'S05': pieno([P('h1', ['slam', 'richieste', 0.3]), P('h2', ['slam', 'richieste$+0.15', 0.35]),
                  P('r1spenta', ['fade', 0, 0.3]), P('r1', ['pop', 'prima', 0.5]),
                  P('b1', ['pop', 'attivando', 0.45], fx=[['pulsa', 'attivando$', 1.2, 0.05]])]),
    'S06': ov([P('t1', ['slam', 'riconoscere', 0.35]), P('t2', ['slam', 'riconoscere$+0.3', 0.35]), P('sotto', ['wipe', 'terza', 1.6])]),
    # si accendono la seconda e la terza (dette nella scena prima), poi la quarta; i bollini per ultimi, DA GARANTIRE in rosso
    'S07': pieno([P('s2', ['fade', 0, 0.3]), P('s3', ['fade', 0, 0.3]), P('s4', ['fade', 0, 0.3]),
                  P('l2', ['pop', 0.25, 0.45]), P('b2', ['pop', 0.6, 0.4]),
                  P('l3', ['pop', 0.9, 0.45]), P('b3', ['pop', 1.25, 0.4]),
                  P('l4', ['pop', 'quarta', 0.5]), P('b4', ['slam', 'garantire', 0.35], fx=[['pulsa', 'garantire$', 1.2, 0.05]])]),
    # GRAZIE grande, poi le quattro righe a mano una alla volta
    'S08': ov([P('grazie', ['slam', 'grazie', 0.45], fx=[['bagliore', 'grazie$', 1.4]]), P('l1', ['wipe', 'senso#2', 1.0]),
               P('l2', ['wipe', 'diventare', 1.1]), P('l3', ['wipe', 'dare', 0.9]), P('l4', ['wipe', 'sacrificio', 1.1])]),
    # chiusura: riquadro dei contatti subito (il suo buco sulla foto si vedrebbe), poi lo slogan sulle parole
    'S09': pieno([P('box', ['pop', 0.6, 0.45]), P('t1', ['slam', 'tutelare', 0.35]), P('t2', ['slam', 'cura', 0.35]),
                  P('s1', ['wipe', 'significa', 0.9]), P('s2', ['wipe', 'curato', 0.9])],
                 camera=[[0, 1.0, 540, 960], [16, 1.04, 540, 900]]),
}


def ritocca():
    """Dopo pezzi.py: dai pezzi COLPEVOLI e ALLARMISMI di S02 si toglie la barratura rossa del pacchetto (la ridisegna il
    motore al momento giusto), ricostruendo le lettere sotto la riga colonna per colonna tra il pixel sopra e quello sotto."""
    import numpy as np
    from PIL import Image
    from scipy import ndimage as nd
    D = f'{PR}/{PG}/grafica/pezzi/S02'
    for id in ('colp', 'allarm'):
        a = np.asarray(Image.open(f'{D}/{id}.png').convert('RGBA')).astype(np.float32)
        r, g, b = a[..., 0], a[..., 1], a[..., 2]
        M = nd.binary_dilation((r > 110) & (r - g > 50) & (r - b > 30), iterations=3)
        for x in np.where(M.any(0))[0]:
            ys = np.where(M[:, x])[0]
            for t in np.split(ys, np.where(np.diff(ys) > 1)[0] + 1):
                y0, y1 = max(t[0] - 1, 0), min(t[-1] + 1, a.shape[0] - 1)
                w = np.linspace(0, 1, len(t) + 2)[1:-1, None]
                a[t, x] = a[y0, x] * (1 - w) + a[y1, x] * w
        Image.fromarray(a.clip(0, 255).astype(np.uint8), 'RGBA').save(f'{D}/{id}.png')
    # il fondo di S02 (blu con alone verde): dove c'erano le scritte il riempimento lascia macchie, si sfoca la zona
    from PIL import ImageFilter
    f = Image.open(f'{D}/fondo.png').convert('RGBA'); b = f.filter(ImageFilter.GaussianBlur(45))
    m = Image.new('L', f.size, 0); m.paste(255, (30, 510, 960, 1340)); m = m.filter(ImageFilter.GaussianBlur(40))
    Image.composite(b, f, m).save(f'{D}/fondo.png')


if __name__ == '__main__':
    import json
    if sys.argv[1:] == ['ritocca']:
        ritocca(); sys.exit()
    json.dump(ANIM, open(f'{PR}/{PG}/grafica/anim.json', 'w'), ensure_ascii=False, indent=0)
    print(PG, list(ANIM))
