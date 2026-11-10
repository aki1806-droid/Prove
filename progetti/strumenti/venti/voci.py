"""Voci della serie «20 format attrattivi» (CISL FP Padova Rovigo, solo AOUP, novembre 2026). Scelte di Achille: HeyGen
come passante (eleven_v4) sul CONNETTORE (crediti del piano), non sulla chiave API. Le tracce si generano con lo strumento
create_speech del connettore (testi in <nome>-testo.txt); poi «scarica» rifà la stessa richiesta sull'API, che risponde dalla
cache di HeyGen (stesso audio, pochi centesimi) e dà il json con i tempi parola per parola. Tagli come in ../halloween/voci.py.
    python3 strumenti/venti/voci.py testi          -> <nome>-testo.txt
    python3 strumenti/venti/voci.py scarica NOME   -> <nome>.json, <nome>-grezzo.mp3
    python3 strumenti/venti/voci.py taglia CHIAVE  (tr, gf, mito, cal)
"""
import glob, json, os, sys
QUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(QUI)); sys.path.insert(0, os.path.join(os.path.dirname(QUI), 'chicedomani'))
from voci import blocchi, scrivi, PR  # noqa: E402
WARD, ACHILLE = 'e4bd8d8a357f41a99502309874733c16', '9b851842ce54449fb9ff501751ca0271'
PG = {'tr': 'pdro-20f-01-traduttore-aziendalese', 'gf': 'pdro-20f-02-green-flag', 'mito': 'pdro-20f-03-mito-da-sfatare',
      'cal': 'pdro-20f-04-calendario-avvento', 'asmr': 'pdro-20f-05-asmr-del-cedolino', 'cl': 'pdro-20f-06-classifica-dei-turni',
      'an': 'pdro-20f-07-il-tuo-anno-in-corsia', 'mic': 'pdro-20f-08-microfono-in-corsia', 'pg': 'pdro-20f-09-primo-giorno-in-ospedale',
      'sec': 'pdro-20f-10-60-secondi-con', 'pd': 'pdro-20f-11-prima-e-dopo', 'news': 'pdro-20f-14-corsia-news',
      'diz': 'pdro-20f-13-dizionario-della-corsia', 'vet': 'pdro-20f-16-i-veterani-reagiscono', 'suono': 'pdro-20f-17-indovina-il-reparto'}
SINGOLI = ('news', 'diz', 'vet', 'suono')   # video fatti da soli, con la propria traccia di chiusura (achille-<chiave>)
SECONDI = ('asmr', 'cl', 'an', 'mic')
TERZI = ('pg', 'sec', 'pd')   # terza tornata (10/11)   # seconda tornata (9/11): una traccia narratore per video, una traccia comune delle quattro chiusure
B = ' <break time="1.6s"/> '


def testi(k):
    fs = sorted(glob.glob(f'{PR}/{PG[k]}/voce_testi/*.txt'))
    return [open(f).read().strip() for f in fs if 'narratore' in f], [open(f).read().strip() for f in fs if 'achille' in f]


def tracce():
    t = {f'ward-{k}': testi(k)[0] for k in ('tr', 'gf', 'mito')}
    n = testi('cal')[0]
    t.update({'ward-cal-a': n[:8], 'ward-cal-b': n[8:16], 'ward-cal-c': n[16:]})
    t['achille-20f'] = [testi(k)[1][0] for k in ('tr', 'gf', 'mito', 'cal')]
    t.update({f'ward-{k}': testi(k)[0] for k in SECONDI})
    t['achille-20f2'] = [testi(k)[1][0] for k in SECONDI]
    t.update({f'ward-{k}': testi(k)[0] for k in TERZI})
    t['achille-20f3'] = [testi(k)[1][0] for k in TERZI]
    for k in SINGOLI:
        t[f'ward-{k}'] = testi(k)[0]; t[f'achille-{k}'] = testi(k)[1]
    return t


if __name__ == '__main__':
    cosa = sys.argv[1]
    if cosa == 'testi':
        for nome, tt in tracce().items():
            open(f'{QUI}/{nome}-testo.txt', 'w').write(B.join(tt)); print(nome, len(B.join(tt)))
    elif cosa == 'scarica':
        from heygen_api import voce
        nome = sys.argv[2]; voce(ACHILLE if nome.startswith('achille') else WARD, f'{QUI}/{nome}-testo.txt', f'{QUI}/{nome}')
    else:
        k = sys.argv[2]
        if k in SECONDI:
            ach = [b for b in blocchi('achille-20f2', QUI) if b][SECONDI.index(k)]; ach_n = 'achille-20f2'
        elif k in SINGOLI:
            ach = [b for b in blocchi(f'achille-{k}', QUI) if b][0]; ach_n = f'achille-{k}'
        elif k in TERZI:
            ach = [b for b in blocchi('achille-20f3', QUI) if b][TERZI.index(k)]; ach_n = 'achille-20f3'
        else:
            ach = [b for b in blocchi('achille-20f', QUI) if b][['tr', 'gf', 'mito', 'cal'].index(k)]; ach_n = 'achille-20f'
        nomi = ['ward-cal-a', 'ward-cal-b', 'ward-cal-c'] if k == 'cal' else [f'ward-{k}']
        w = [(n, b) for n in nomi for b in blocchi(n, QUI) if b]
        assert len(w) == len(testi(k)[0]), (len(w), len(testi(k)[0]))
        scrivi(PG[k], [(f'{QUI}/{n}-grezzo.mp3', b, 'narratore') for n, b in w] + [(f'{QUI}/{ach_n}-grezzo.mp3', ach, 'achille')])
