"""Versione 4 del reel «Kit Contratto Funzioni Locali» (28/10/2026, richieste di Achille): in apertura «oggi, ventotto
ottobre, si è firmato il contratto»; nell'esempio della slide degli aumenti il funzionario (+138,52 €, «quasi
centotrentanove») al posto dell'istruttore, senza la frase dei 141 € che era dell'istruttore; in chiusura «Buon lavoro a
tutti, e un caro saluto». Testi in 01_testi_voce/ (02, 04, 10).

Rifà la voce solo di S02, S04 e S10 (stessa voce di Andrea, eleven_v4 via API HeyGen, una traccia con i tre blocchi),
i tagli come in voci.py (profilo «narratore»), e l'avatar delle tre scene in camera (S02, S08, S10 in fila con 0,6 s di
pausa, webm con alfa). Poi: pulisci_avatar.py, monta.py, musica.py come nella v3.

    python3 strumenti/kitlocali/v4.py voce | avatar | inserti

inserti (v4b, richiesta di Achille «vorrei inserissi anche queste»): le sue due slide, «Quanto aumenta davvero il mio
stipendio?» e «I tuoi arretrati», vanno in S03 dove la voce ne parla: S03 si divide in S03a (clip dei numeri, «Gli aumenti
arrivano a regime dal duemilaventisette:»), S03b (infografica, «in media centocinquantadue … negli altri enti.») e S03c
(arretrati, «E gli arretrati medi superano i mille euro.»); monta.py tiene ferme S03b e S03c un po' più della voce
(TENUTA) per lasciarle leggere. Slide portate a 9:16 in 02_slide/ (originali in 05_extra/originali_achille/).
"""
import json, os, subprocess, sys
QUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(QUI)); sys.path.insert(0, os.path.join(os.path.dirname(QUI), 'chicedomani'))
from voci import blocchi, taglia, dur, ff  # noqa: E402
import heygen_api as hg  # noqa: E402

D = os.path.join(os.path.dirname(os.path.dirname(QUI)), 'pdro-kit-funzioni-locali')
A = f'{D}/audio'
VOCE, LOOK = '8c0895c218bf43a69dcaa14e0f78bc96', '20b42026236c4145a4c3cdb6a7cdb9ae'
NUOVE = {'S02': '02_avatar', 'S04': '04_slide', 'S10': '10_avatar'}
PAUSA = 0.6


def voce():
    testo = ' <break time="1.6s"/> '.join(open(f'{D}/01_testi_voce/{f}.txt').read().strip() for f in NUOVE.values())
    open(f'{QUI}/andrea-v4-testo.txt', 'w').write(testo)
    hg.voce(VOCE, f'{QUI}/andrea-v4-testo.txt', f'{QUI}/andrea-v4')
    b = [x for x in blocchi('andrea-v4', QUI) if x]
    w = json.load(open(f'{QUI}/andrea-v4.json'))['word_timestamps']
    if w and not w[-1]['word'].startswith('<') and len(b) < len(NUOVE):
        b.append([x for x in w if not x['word'].startswith('<')][-0:])
    assert len(b) == len(NUOVE), len(b)
    tempi = {t['id']: t for t in json.load(open(f'{A}/tempi-scene.json'))}
    parole = json.load(open(f'{A}/parole.json'))
    for (sid, f), pw in zip(NUOVE.items(), b):
        atteso = len(open(f'{D}/01_testi_voce/{f}.txt').read().split())
        assert len(pw) == atteso, (sid, len(pw), atteso)
        wav = f'{A}/wav/{sid}.wav'
        parole[sid] = taglia(f'{QUI}/andrea-v4-grezzo.mp3', pw, 'narratore', wav)
        ff('-i', wav, '-c:a', 'libmp3lame', '-b:a', '192k', '-id3v2_version', '3', f'{A}/finali/{sid}.mp3')
        tempi[sid]['durata'] = round(dur(wav), 4); print(sid, f'{dur(wav):.2f} s', len(pw), 'parole')
    t0 = 0.0
    for t in sorted(tempi.values(), key=lambda x: x['id']):
        t['inizio'] = round(t0, 4); t0 += t['durata']
    json.dump(sorted(tempi.values(), key=lambda x: x['id']), open(f'{A}/tempi-scene.json', 'w'), indent=1)
    json.dump(parole, open(f'{A}/parole.json', 'w'), ensure_ascii=False, indent=0)
    # traccia dell'avatar: S02, S08, S10 in fila con 0,6 s di pausa
    ins, fil, tav, t = [], [], [], 0.0
    for k, sid in enumerate(('S02', 'S08', 'S10')):
        ins += ['-i', f'{A}/wav/{sid}.wav']; d = dur(f'{A}/wav/{sid}.wav')
        tav.append({'id': sid, 'inizio': round(t, 3), 'durata': round(d, 3)})
        fil.append(f'[{k}:a]apad=pad_dur={PAUSA if k < 2 else 0}[a{k}]'); t += d + (PAUSA if k < 2 else 0)
    fil.append('[a0][a1][a2]concat=n=3:v=0:a=1[o]')
    ff(*ins, '-filter_complex', ';'.join(fil), '-map', '[o]', '-c:a', 'libmp3lame', '-b:a', '192k', f'{A}/voce-avatar.mp3')
    json.dump(tav, open(f'{A}/tempi-avatar.json', 'w'), indent=1)
    print('voce-avatar', f'{t:.2f} s')


def avatar():
    a = hg.asset(f'{A}/voce-avatar.mp3')
    v = hg.avatar(LOOK, a, True, 'Kit Funzioni Locali v4 - Andrea')
    hg.scarica(v, f'{D}/avatar/avatar.webm')


def inserti():
    parole = json.load(open(f'{A}/parole.json')); tempi = json.load(open(f'{A}/tempi-scene.json'))
    pw = parole['S03']; src = f'{A}/wav/S03.wav'; fine = dur(src)
    taglio = lambda w: next(i for i, x in enumerate(pw) if x['w'] == w)    # noqa: E731
    i_b, i_c = taglio('in'), taglio('E')
    tagli = [0.0, (pw[i_b - 1]['b'] + pw[i_b]['a']) / 2, (pw[i_c - 1]['b'] + pw[i_c]['a']) / 2, fine]
    pezzi = {'S03a': pw[:i_b], 'S03b': pw[i_b:i_c], 'S03c': pw[i_c:]}
    tempi = [x for x in tempi if x['id'][:3] != 'S03' or x['id'] == 'S03']
    for (sid, p), a, b in zip(pezzi.items(), tagli, tagli[1:]):
        ff('-i', src, '-af', f'atrim={a:.3f}:{b:.3f},asetpts=PTS-STARTPTS', f'{A}/wav/{sid}.wav')
        parole[sid] = [{'w': x['w'], 'a': round(x['a'] - a, 3), 'b': round(x['b'] - a, 3)} for x in p]
        tempi.append({'id': sid, 'tipo': 'narratore', 'inizio': 0, 'durata': round(b - a, 4)})
        print(sid, f'{b - a:.2f} s', ' '.join(x['w'] for x in p))
    json.dump(tempi, open(f'{A}/tempi-scene.json', 'w'), indent=1)
    json.dump(parole, open(f'{A}/parole.json', 'w'), ensure_ascii=False, indent=0)


if __name__ == '__main__':
    {'voce': voce, 'avatar': avatar, 'inserti': inserti}[sys.argv[1]]()
