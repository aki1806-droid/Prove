"""Clip delle illustrazioni delle «Favole del sindacato» e dei «format originali» (pacchetti PDRO, novembre 2026), animate
con il modello video di HeyGen (../heygen_api.py anima, image_to_video, 10 s a 1080p) sulla chiave API: su Higgsfield i
crediti non bastavano. Prompt dal campo «clip» dei pacchetti, in inglese, con l'invito a non trasformare i personaggi.
    python3 strumenti/favole/clip.py [chiave ...]      -> <cartella>/clip/Sxx.mp4 e clip/id.json
"""
import json, os, sys
from concurrent.futures import ThreadPoolExecutor
QUI = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.dirname(QUI))
import heygen_api as hg  # noqa: E402
PR = os.path.dirname(os.path.dirname(QUI))
FERMI = ' Keep the same characters, same style and same scene for the whole shot, no transformation, no text.'
CLIP = {
    'pdro-favola-re-e-accordo-invisibile': {
        'S01': ('fv_re.png', 'The king proudly raises his empty hands, the two tailors bow and wink at each other, the court applauds, slow push-in.'),
        'S03': ('fv_parata.png', 'The young nurse points at the king and laughs, the people around start laughing too, the king freezes with his hands in mid-air, slow camera drift.')},
    'pdro-favola-gatto-volpe-campo-dei-miracoli': {
        'S01': ('fv_volpegatto.png', 'The fox gestures pointing at the field, the cat nods leaning on his cane, the nurse listens curiously, warm sunset light, slow push-in.'),
        'S03': ('fv_campo.png', 'The morning mist slowly clears, the nurse looks down at the empty hole in the field, a crow flies away from the wooden post, slow camera drift.')},
    'pdro-favola-tre-porcellini-e-il-lupo': {
        'S01': ('fv_porcellini.png', 'The three little pigs work on their houses, the one with bricks carefully spreads mortar, the other two have already finished and rest, sunny day, slow push-in.'),
        'S03': ('fv_lupo.png', 'The wolf blows with puffed cheeks, straw flies everywhere, the little pig runs away, dramatic stormy sky, dynamic camera.'),
        'S04': ('fv_mattoni.png', 'The exhausted wolf sits down on the ground and loosens his tie, the three little pigs wave happily from the window of the brick house, golden light, slow push-in.')},
    'pdro-originale-meteo-dei-diritti': {
        'S01': ('or_meteo.png', 'The weather presenter smiles and points at the screen with a wide gesture, studio lights glow, slow push-in.'),
        'S05': ('or_ospedale_meteo.png', 'The dark clouds slowly move away, the sun lights up the hospital building, the rainbow grows brighter, slow camera drift.')},
    'pdro-originale-unboxing-cisl-fp': {
        'S01': ('or_unboxing.png', 'The young woman opens the green box, a warm golden light rises from inside and lights her face, she brings her hands to her mouth amazed, slow push-in.')},
    'pdro-originale-quizzone-della-corsia': {
        'S01': ('or_quiz.png', 'Studio lights sweep and spin, the host smiles at the audience, the contestant in scrubs settles behind the podium, slow push-in.'),
        'S05': ('or_telefono.png', 'The contestant on the phone nods with relief and smiles, the host strokes his chin, a spotlight shines on her, slow push-in.')},
    'pdro-bando-part-time-2026': {
        'S01': ('pt_famiglia.png', 'Warm home kitchen light: the nurse gently helps the little girl with her homework and holds the hand of her elderly father, the wall clock hands move forward, soft warm light, slow push-in.'),
        'S07': ('pt_domanda.png', 'The union delegate checks the papers with a pen, pointing at a line, the nurse nods relieved and smiles, calm office light, slow push-in.')},
    'pdro-originale-archeologi-del-futuro': {
        'S01': ('or_scavo.png', 'The archaeologists gently dust off an old rusty hospital bed overgrown with moss, holograms light up above their tablets, filtered light through the vegetation, slow push-in.'),
        'S04': ('or_museo.png', 'The light slowly focuses on the small green card inside the glass display case, visitors from the future lean in curiously, slow push-in.')},
}


def una(pg, sid, img, prompt):
    D = f'{PR}/{pg}'; os.makedirs(f'{D}/clip', exist_ok=True); out = f'{D}/clip/{sid}.mp4'
    if os.path.exists(out):
        return pg, sid, None
    vid = hg.anima(hg.asset(f'{D}/img/{img}'), prompt + FERMI, out, durata=10)
    return pg, sid, vid


if __name__ == '__main__':
    lavori = [(pg, sid, img, p) for pg, sc in CLIP.items() for sid, (img, p) in sc.items()
              if not sys.argv[1:] or any(k in pg for k in sys.argv[1:])]
    with ThreadPoolExecutor(6) as ex:
        for pg, sid, vid in ex.map(lambda a: una(*a), lavori):
            if vid:
                f = f'{PR}/{pg}/clip/id.json'; d = json.load(open(f)) if os.path.exists(f) else {}
                d[sid] = vid; json.dump(d, open(f, 'w'), indent=0); print(pg, sid, vid, flush=True)
