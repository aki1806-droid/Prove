"""Inquadrature di «Sentirsi per sentire - colonna sonora» animate con HeyGen (heygen-video-1 via API, ../heygen_api.py
anima), dalle stesse immagini Higgsfield: nel montaggio si alternano a clip Kling e a immagini ferme (richiesta di Achille).
    python3 strumenti/sps/anima_heygen.py      -> pdro-sps-colonna-sonora/clip_heygen/NNN.mp4 (salta quelle già fatte)
"""
import json, os, sys
from concurrent.futures import ThreadPoolExecutor
QUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(QUI))
import heygen_api as hg  # noqa: E402

D = os.path.join(os.path.dirname(os.path.dirname(QUI)), 'pdro-sps-colonna-sonora', 'clip_heygen')
# indice immagine: (asset HeyGen dell'immagine, movimento)
SCENE = {
    3: ('883686921c464643bac7889409226138', "A single tear slowly rolls down the woman's cheek, she breathes softly with closed eyes, her lips tremble slightly, very slow cinematic push-in, soft window light, intimate and fragile."),
    13: ('136d3d9127cc4c2faa7a8c83ddf11f75', "Her long hair flows in the sea wind, she breathes deeply with eyes closed and slowly lifts her face to the rising sun, waves roll gently behind her, slow cinematic orbit."),
    15: ('cc269c5bb6ed437ab148a12f671332a1', "The elderly woman's hands knit the red wool with calm tenderness, the needles moving rhythmically, the warm lamp light flickers softly, slow push-in."),
    23: ('48356f5726354648a38a6a7b143762d2', "The woman runs freely along the shoreline in slow motion, water splashing and glowing in the golden sunrise, her hair flying, camera tracking alongside."),
    32: ('8ee7e05d97364b63b48f93e0f87e773e', "The two women hold each other tighter, one smiles through her tears with eyes closed, golden backlight flaring softly, slow cinematic orbit around them."),
    40: ('2ef872cf57854a13aaa0be16c5d9183c', "The women on the hill slowly raise their joined hands toward the rising sun, the sky glows orange and pink, a light breeze moves their clothes, slow push-in."),
    103: ('f9e9ad7c1aff4edebdb425e3e1bef6e3', "A single tear slowly rolls down the woman's cheek, she breathes softly with closed eyes, very slow cinematic push-in, soft window light."),
    132: ('6016258a6024485baccd660997d9b9b2', "The two women hold each other tighter, one smiles through her tears with eyes closed, golden backlight, slow cinematic orbit."),
    140: ('05ba2b52fa5d4d418b332a1e1ef03bc6', "The women on the hill slowly raise their joined hands toward the rising sun, the sky glowing, slow push-in."),
}

if __name__ == '__main__':
    os.makedirs(D, exist_ok=True); reg = f'{D}/id.json'
    ids = json.load(open(reg)) if os.path.exists(reg) else {'3': 'e1bdcc1718e34cf3a57150a841326347'}
    def fai(k):
        if os.path.exists(f'{D}/{k:03d}.mp4'):
            return
        a, p = SCENE[k]; ids[str(k)] = hg.anima(a, p + ' No text.', f'{D}/{k:03d}.mp4')
    with ThreadPoolExecutor(4) as ex:
        list(ex.map(fai, SCENE))
    json.dump(ids, open(reg, 'w'), indent=1)
    print('saldo', hg.chiama('GET', '/v3/users/me')['wallet']['remaining_balance'])
