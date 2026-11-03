"""Avatar «Aki with a lapel microphone» (e6d73d660d354b94b0a50c9692b7c34e) sulla chiusura S07 dei reel di Halloween, via API
HeyGen in webm con alfa (come nel «Volantino scomparso»): pdro-halloween-<jack|fantasmi>/avatar/avatar.webm.
    python3 strumenti/halloween/avatar.py jack fantasmi
"""
import os, sys
QUI = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.dirname(QUI))
import heygen_api as hg  # noqa: E402
PR = os.path.dirname(os.path.dirname(QUI)); LOOK = 'e6d73d660d354b94b0a50c9692b7c34e'
CARTELLE = {'cicala': 'pdro-favola-cicala-formica', 're': 'pdro-favola-re-e-accordo-invisibile', 'gatto': 'pdro-favola-gatto-volpe-campo-dei-miracoli', 'porcellini': 'pdro-favola-tre-porcellini-e-il-lupo', 'meteo': 'pdro-originale-meteo-dei-diritti', 'unboxing': 'pdro-originale-unboxing-cisl-fp', 'quiz': 'pdro-originale-quizzone-della-corsia', 'archeologi': 'pdro-originale-archeologi-del-futuro', 'parttime': 'pdro-bando-part-time-2026', 'segnalazioni': 'pdro-tracciamento-segnalazioni-aoup', 'librogame': 'pdro-turni-12-ore-librogame', 'cv1': 'pdro-convenzioni-1-colpa-grave', 'cv2': 'pdro-convenzioni-2-fondo-sanitario', 'cv3': 'pdro-convenzioni-3-medico-h24', 'cv4': 'pdro-convenzioni-4-formazione', 'cv5': 'pdro-convenzioni-5-tempo-libero', 'cv6': 'pdro-convenzioni-6-acquisti', 'cv7': 'pdro-convenzioni-7-digitale', 'cv8': 'pdro-convenzioni-8-quanto-vale-la-tessera'}
for v in sys.argv[1:]:
    D = f"{PR}/{CARTELLE.get(v, f'pdro-halloween-{v}')}"; os.makedirs(f'{D}/avatar', exist_ok=True)
    chiusura = sorted(x for x in os.listdir(f'{D}/audio/finali') if x.endswith('.mp3'))[-1]   # l'ultima scena: Achille
    vid = hg.avatar(LOOK, hg.asset(f'{D}/audio/finali/{chiusura}'), True, f'{v} - Aki')
    open(f'{D}/avatar/video_id.txt', 'w').write(vid); hg.scarica(vid, f'{D}/avatar/avatar.webm')
