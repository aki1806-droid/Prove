"""Voce della versione senza avatar di «Il filo che ci unisce» (richiesta di Achille, 29/10/2026): Luca Ward
(e4bd8d8a357f41a99502309874733c16) via API HeyGen come passante (../heygen_api.py, eleven_v4), scelta di Achille.

Gli stessi testi di voci.py, ma il copione era in prima persona di Achille: adattati al plurale della CISL FP (scelta di
Achille) — S02 senza la presentazione («Ogni giorno, … incontriamo donne …»), S10 «Ti aspettiamo. Il tuo posto è lì.».
Tagli profilo «narratore» di ../chicedomani/voci.py (pause oltre 0,6 s → 0,45 s, niente atempo).

    python3 strumenti/filo/voci_ward.py genera
    python3 strumenti/filo/voci_ward.py taglia      -> pdro-av1-il-filo-che-ci-unisce/audio_ward/{wav/, parole.json, tempi-scene.json}
"""
import importlib.util, json, os, sys
QUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(QUI)); sys.path.insert(0, os.path.join(os.path.dirname(QUI), 'chicedomani'))
import voci as cv  # noqa: E402
_s = importlib.util.spec_from_file_location('filo_voci', f'{QUI}/voci.py'); _m = importlib.util.module_from_spec(_s)
_s.loader.exec_module(_m)

VOCE = 'e4bd8d8a357f41a99502309874733c16'
TESTI = dict(_m.TESTI)
TESTI['S02'] = ("Ogni giorno, nei nostri ospedali e nei nostri uffici, incontriamo donne che si prendono cura di tutti.… "
                "Ma a volte, a casa,… nessuno si prende cura di loro.")
TESTI['S10'] = "Ti aspettiamo.… Il tuo posto è lì."
PAUSE = _m.PAUSE

if __name__ == '__main__':
    if sys.argv[1:] == ['genera']:
        t = ' <break time="1.6s"/> '.join(TESTI.values()); open(f'{QUI}/ward-filo-testo.txt', 'w').write(t)
        print(len(t), 'caratteri')
        from heygen_api import voce
        voce(VOCE, f'{QUI}/ward-filo-testo.txt', f'{QUI}/ward-filo')
    else:
        b = [x for x in cv.blocchi('ward-filo', QUI) if x]
        assert len(b) == len(TESTI), len(b)
        A = f'{_m.D}/audio_ward'; os.makedirs(f'{A}/wav', exist_ok=True); tempi, parole = [], {}
        for (sid, testo), pw in zip(TESTI.items(), b):
            parole[sid] = cv.taglia(f'{QUI}/ward-filo-grezzo.mp3', pw, 'narratore', f'{A}/wav/{sid}.wav', PAUSE.get(sid))
            d = cv.dur(f'{A}/wav/{sid}.wav'); tempi.append({'id': sid, 'durata': round(d, 3)})
            n = len(testo.replace('…', ' ').split())
            print(sid, f'{d:5.2f} s', len(pw), 'parole' + ('' if len(pw) == n else f' (attese {n}!)'))
        json.dump(tempi, open(f'{A}/tempi-scene.json', 'w'), indent=1)
        json.dump(parole, open(f'{A}/parole.json', 'w'), ensure_ascii=False, indent=0)
