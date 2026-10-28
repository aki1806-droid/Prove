"""Voce fuori campo dei cinque trailer «Brividi» per «Sentirsi per sentire» (24 novembre 2026, CISL FP Padova Rovigo,
provinciale). Voce privata «DONNA VOCE CALDA PER VIDEO» (87fd26ac5b68410d93b36b2d44a19f8d, ElevenLabs) via API HeyGen
(../heygen_api.py, eleven_v4), scelta di Achille.

Tutte le frasi dei cinque trailer in una sola traccia (blocchi uniti da <break time="1.6s"/>), in ordine di trailer e di
scena; poi ogni blocco si taglia (../chicedomani/voci.py) e si salva nella cartella del suo trailer:
  <Tn>/audio/wav/Sxx.wav, <Tn>/audio/parole.json, <Tn>/audio/tempi-scene.json (durata di ogni blocco per scena).
La regia chiede di leggere lentamente e di lasciar respirare le pause: profilo «pensiero», pause oltre 0,9 s → 0,7 s,
nessun atempo. A voce «ventiquattro novembre» (scelta di Achille); a schermo e nei sottotitoli resta «24».

    python3 strumenti/brividi/voci.py genera     -> voce-brividi.json + voce-brividi-grezzo.mp3
    python3 strumenti/brividi/voci.py taglia
"""
import json, os, sys
QUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(QUI)); sys.path.insert(0, os.path.join(os.path.dirname(QUI), 'chicedomani'))
import voci as cv  # noqa: E402

PR = os.path.dirname(os.path.dirname(QUI))
BASE = os.path.join(PR, 'pdro-brividi-24-novembre')
TRAILER = ['T1_LA_PORTA_20s', 'T2_DOVE_SEI_30s', 'T3_IL_NODO_45s', 'T4_CHI_CURA_60s', 'T5_ACCENDIAMO_UNA_LUCE_75s']
VOCE = '87fd26ac5b68410d93b36b2d44a19f8d'
A_VOCE = [('Il 24 novembre', 'Il ventiquattro novembre')]
cv.TEMPO['pensiero'] = (0.9, 0.7, 1.0)
# pause della regia dentro una frase: (trailer, scena): {parola: secondi}
PAUSE = {('T3_IL_NODO_45s', 'S04'): {'rabbia.': 1.0}}   # «Silenzio di 1 s prima di "Basta ascoltarsi"»


def righe():
    """[(trailer, scena, testo detto)] nell'ordine della traccia."""
    out = []
    for t in TRAILER:
        for s in json.load(open(f'{BASE}/{t}/storyboard.json'))['scene']:
            v = s['voce_fuori_campo'].strip()
            if v:
                for a, b in A_VOCE:
                    v = v.replace(a, b)
                out.append((t, s['n'], v))
    return out


if __name__ == '__main__':
    if sys.argv[1:] == ['genera']:
        r = righe(); testo = ' <break time="1.6s"/> '.join(x[2] for x in r)
        open(f'{QUI}/voce-brividi-testo.txt', 'w').write(testo); print(len(r), 'frasi', len(testo), 'caratteri')
        from heygen_api import voce
        voce(VOCE, f'{QUI}/voce-brividi-testo.txt', f'{QUI}/voce-brividi')
    elif sys.argv[1:] == ['taglia']:
        r = righe(); b = cv.blocchi('voce-brividi', QUI)
        b = [x for x in b if x]
        assert len(b) == len(r), (len(b), len(r))
        src = f'{QUI}/voce-brividi-grezzo.mp3'
        for t in TRAILER:
            A = f'{BASE}/{t}/audio'; os.makedirs(f'{A}/wav', exist_ok=True)
            tempi, parole = [], {}
            for (tt, n, testo), pw in zip(r, b):
                if tt != t:
                    continue
                sid = f'S{n:02d}'
                atteso = len(testo.split())
                parole[sid] = cv.taglia(src, pw, 'pensiero', f'{A}/wav/{sid}.wav', PAUSE.get((t, sid)))
                d = cv.dur(f'{A}/wav/{sid}.wav'); tempi.append({'id': sid, 'durata': round(d, 3)})
                print(t[:2], sid, f'{d:5.2f} s', len(pw), 'parole' + ('' if len(pw) == atteso else f' (attese {atteso}!)'))
            json.dump(tempi, open(f'{A}/tempi-scene.json', 'w'), indent=1)
            json.dump(parole, open(f'{A}/parole.json', 'w'), ensure_ascii=False, indent=0)
