"""Chiusura di Luca Ward per il video della colonna sonora di «Sentirsi per sentire» (24 novembre 2026, CISL FP Padova
Rovigo, provinciale): voce e4bd8d8a357f41a99502309874733c16 via API HeyGen come passante (../heygen_api.py, eleven_v4),
scelta di Achille. Testo approvato da Achille il 30/10/2026, parola per parola (il 24 detto in lettere); fra le frasi
pause di regia (<break>), che non cambiano il testo. Tagli: solo le pause oltre 1,2 s scendono a 0,9 s (Ward deve
respirare), niente atempo.

    python3 strumenti/sps/voce_ward.py genera | taglia     -> pdro-sps-colonna-sonora/audio/ward.wav, ward-parole.json
"""
import json, os, sys
QUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(QUI)); sys.path.insert(0, os.path.join(os.path.dirname(QUI), 'chicedomani'))
import voci as cv  # noqa: E402

VOCE = 'e4bd8d8a357f41a99502309874733c16'
A = os.path.join(os.path.dirname(os.path.dirname(QUI)), 'pdro-sps-colonna-sonora', 'audio')
FRASI = ["C'è un silenzio che fa più rumore di un grido.", "È il silenzio di chi ha smesso di ascoltarsi.",
         "Di chi ripete “va tutto bene”, anche quando niente va bene.",
         "Ma nessuna voce si spegne per sempre, se qualcuno resta ad ascoltarla.",
         "Il ventiquattro novembre, al Patronato dell'Arcella, a Padova, ci ritroviamo per questo: per sentirci, e per sentire.",
         "Vieni.", "Il tuo posto ti aspetta."]
PAUSE = [1.0, 0.7, 1.2, 1.3, 1.0, 0.7]
cv.TEMPO['ward'] = (1.2, 0.9, 1.0)

if __name__ == '__main__':
    if sys.argv[1:] == ['genera']:
        t = ''.join(f + (f' <break time="{p}s"/> ' if i < len(PAUSE) else '') for i, (f, p) in enumerate(zip(FRASI, PAUSE + [0])))
        open(f'{QUI}/ward-testo.txt', 'w').write(t); print(len(t), 'caratteri')
        from heygen_api import voce
        voce(VOCE, f'{QUI}/ward-testo.txt', f'{QUI}/ward')
    else:
        pw = [w for b in cv.blocchi('ward', QUI) for w in b]
        attese = len(' '.join(FRASI).split())
        p = cv.taglia(f'{QUI}/ward-grezzo.mp3', pw, 'ward', f'{A}/ward.wav')
        json.dump(p, open(f'{A}/ward-parole.json', 'w'), ensure_ascii=False, indent=0)
        print(f'{cv.dur(f"{A}/ward.wav"):.2f} s', len(pw), 'parole', '' if len(pw) == attese else f'(attese {attese}!)')
