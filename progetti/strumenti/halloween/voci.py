"""Voci dei due reel di Halloween 2026 (CISL FP Padova Rovigo, solo AOUP): «Jack O'Lantern – versione sindacale» e «I
fantasmi del cedolino». Via API HeyGen come passante (../heygen_api.py, elevenlabs eleven_v4), scelta di Achille, sulla
chiave API dello stesso account (i crediti del connettore sono finiti): Luca Ward per le scene 1-6 in una traccia (blocchi
uniti da <break time="1.6s"/>), Achille nuovo 1 per la chiusura S07. Testi del pacchetto (voce_testi/), invariati.
Tagli come nel «Volantino scomparso» (../chicedomani/voci.py): narratore pause >0,6 s → 0,45 s; Achille >0,45 → 0,35 e
atempo 1,16 (il pacchetto chiede eleven_multilingual_v2 con silenceremove e 1,12, che presuppone ElevenLabs diretto).

    python3 strumenti/halloween/voci.py genera jack|fantasmi
    python3 strumenti/halloween/voci.py taglia jack|fantasmi
"""
import glob, os, sys
QUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(QUI)); sys.path.insert(0, os.path.join(os.path.dirname(QUI), 'chicedomani'))
from voci import blocchi, scrivi, PR  # noqa: E402

CARTELLE = {'cicala': 'pdro-favola-cicala-formica', 're': 'pdro-favola-re-e-accordo-invisibile', 'gatto': 'pdro-favola-gatto-volpe-campo-dei-miracoli', 'porcellini': 'pdro-favola-tre-porcellini-e-il-lupo', 'meteo': 'pdro-originale-meteo-dei-diritti', 'unboxing': 'pdro-originale-unboxing-cisl-fp', 'quiz': 'pdro-originale-quizzone-della-corsia', 'archeologi': 'pdro-originale-archeologi-del-futuro', 'parttime': 'pdro-bando-part-time-2026', 'segnalazioni': 'pdro-tracciamento-segnalazioni-aoup', 'librogame': 'pdro-turni-12-ore-librogame', 'cv1': 'pdro-convenzioni-1-colpa-grave', 'cv2': 'pdro-convenzioni-2-fondo-sanitario', 'cv3': 'pdro-convenzioni-3-medico-h24', 'cv4': 'pdro-convenzioni-4-formazione', 'cv5': 'pdro-convenzioni-5-tempo-libero', 'cv6': 'pdro-convenzioni-6-acquisti', 'cv7': 'pdro-convenzioni-7-digitale', 'cv8': 'pdro-convenzioni-8-quanto-vale-la-tessera'}   # anche le «Favole del sindacato»
WARD, ACHILLE = 'e4bd8d8a357f41a99502309874733c16', '9b851842ce54449fb9ff501751ca0271'

if __name__ == '__main__':
    cosa, v = sys.argv[1], sys.argv[2]; PG = CARTELLE.get(v, f'pdro-halloween-{v}')
    testi = sorted(glob.glob(f'{PR}/{PG}/voce_testi/*.txt'))
    nar = [open(f).read().strip() for f in testi if 'narratore' in f]; ach = [open(f).read().strip() for f in testi if 'achille' in f]
    # oltre i ~1.500 caratteri la traccia unica di Ward torna HTTP 502: si divide in due tracce (ward-<v>, ward-<v>-b)
    tracce = [nar] if sum(map(len, nar)) < 1400 else [nar[:(len(nar) + 1) // 2], nar[(len(nar) + 1) // 2:]]
    nomi_w = [f'ward-{v}'] + [f'ward-{v}-b'] * (len(tracce) > 1)
    if cosa == 'genera':
        from heygen_api import voce
        for nome, vid, tt in [*zip(nomi_w, [WARD] * len(tracce), tracce), (f'achille-{v}', ACHILLE, ach)]:
            if os.path.exists(f'{QUI}/{nome}-grezzo.mp3') and os.environ.get('RIFAI') is None:
                continue
            t = ' <break time="1.6s"/> '.join(tt); open(f'{QUI}/{nome}-testo.txt', 'w').write(t)
            voce(vid, f'{QUI}/{nome}-testo.txt', f'{QUI}/{nome}')
    else:
        w = [(n, b) for n in nomi_w for b in blocchi(n, QUI) if b]; a = [b for b in blocchi(f'achille-{v}', QUI) if b]
        assert len(w) == len(nar) and len(a) == 1, (len(w), len(a))
        for (_, b), t in zip(w + [(None, x) for x in a], nar + ach):
            print(len(b), 'parole' + ('' if len(b) == len(t.split()) else f' (attese {len(t.split())}!)'))
        scrivi(PG, [(f'{QUI}/{n}-grezzo.mp3', b, 'narratore') for n, b in w] + [(f'{QUI}/achille-{v}-grezzo.mp3', a[0], 'achille')])
