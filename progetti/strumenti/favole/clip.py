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
    'pdro-tracciamento-segnalazioni-aoup': {
        'S01': ('tr_tracking.png', 'In the hospital locker room the nurse scrolls and refreshes the screen of her phone, then slowly raises one eyebrow, sceptical, soft cool light, slow push-in.'),
        'S07': ('tr_postit.png', 'The colleagues hand their coloured notes to the union delegate, she takes them, sticks one on the board behind her and nods firmly, bright corridor light, slow camera drift.')},
    'pdro-turni-12-ore-librogame': {
        'S01': ('lg_bivio.png', 'The nurse, seen from behind, looks left and right at the two hospital corridors, the hands of the two wall clocks move, the light in the corridors slowly changes, slow push-in.'),
        'S07': ('lg_voto.png', 'In the meeting room the staff raise their hands to vote and smile, the coordinator with the clipboard counts the hands and smiles, warm daylight, slow push-in.')},
    'pdro-convenzioni-1-colpa-grave': {
        'S01': ('cv_aereo.png', 'On board the plane the flight attendant demonstrates the safety procedure with calm gestures, the passengers in hospital scrubs watch attentively, soft cabin light, slow push-in.'),
        'S03': ('cv_paracadute.png', 'The nurse walks confidently down the hospital corridor with the parachute pack on her shoulders, her colleagues turn and watch her curiously, bright light, slow camera drift.')},
    'pdro-convenzioni-2-fondo-sanitario': {
        'S01': ('cv_pensionata.png', 'The elderly woman writes with the fountain pen, then looks up and smiles warmly, the flowers move gently in the breeze, warm garden light, slow push-in.'),
        'S04': ('cv_lettera.png', 'The young nurse reads the letter, smiles moved, and gently puts down her mug, soft morning light, slow push-in.')},
    'pdro-convenzioni-3-medico-h24': {
        'S01': ('cv_notte.png', 'At night on the sofa the nurse mother looks at her phone with a worried face, behind her the child keeps sleeping still under the blanket, warm lamp light, very slow push-in.'),
        'S03': ('cv_telemed.png', 'On the phone screen the doctor in the video call smiles and talks reassuringly, the wall clock shows three o clock in the background, soft night light, slow push-in.')},
    'pdro-convenzioni-4-formazione': {
        'S01': ('cv_gioco.png', 'The two dice roll across the colourful board game and stop, the small nurse game pieces move forward along the path, top-down view, slow push-in.'),
        'S04': ('cv_dadi.png', 'The nurse throws the dice on the table, her colleagues around her cheer and laugh, warm evening light, slow push-in.')},
    'pdro-convenzioni-5-tempo-libero': {
        'S01': ('cv_spiaggia.png', 'The sea waves move gently behind her, the nurse under the straw hat raises the postcard and smiles, bright summer light, slow push-in.'),
        'S04': ('cv_trekking.png', 'The group walks laughing along the mountain path, the golden dog wags its tail, autumn valley view in the background, slow camera drift.')},
    'pdro-convenzioni-6-acquisti': {
        'S01': ('cv_spesa.png', 'The woman walks along the tree-lined street with her shopping bags, the golden dog trots happily beside her, autumn leaves fall, slow camera drift.'),
        'S03': ('cv_cena.png', 'The family at the dinner table laughs, they pass the bread and raise their glasses in a toast, warm home light, slow push-in.')},
    'pdro-convenzioni-7-digitale': {
        'S01': ('cv_pec_paura.png', 'The laptop screen lights up the terrified face of the nurse in the dark room, shadows slowly stretch on the wall, comic horror mood, slow push-in.'),
        'S04': ('cv_pec_relax.png', 'The nurse relaxed on the sofa taps her phone, smiles and takes a sip of coffee, soft daylight, slow push-in.')},
    'pdro-convenzioni-8-quanto-vale-la-tessera': {
        'S01': ('cv_tessera.png', 'The hand raises the green card, behind it the lights of the shop windows switch on one after another, evening city light, slow push-in.'),
        'S04': ('cv_calcolatrice.png', 'The nurse types on the calculator, then brings her hand to her mouth, amazed and smiling, warm kitchen light, slow push-in.')},
    'pdro-rsu-la-sedia-vuota': {
        'S01': ('rsu_sala.png', 'Slow tracking shot along the empty meeting table with empty chairs, the hand of the wall clock ticks forward, dust floats in the light beams, silent atmosphere, no people.'),
        'S08': ('rsu_gruppo.png', 'The group of hospital workers walks decisively towards the camera, backlit, confident steps, slow camera push back.')},
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
