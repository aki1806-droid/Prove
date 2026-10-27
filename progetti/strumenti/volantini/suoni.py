"""Effetti sonori del reel «Il caso del volantino scomparso», dal catalogo HeyGen (GET /v3/audio/sounds, royalty-free, via
../heygen_api.py), messi sulle stesse ancore di parola delle grafiche e mescolati sotto la voce. Niente musica di fondo:
solo i due secondi western della scena 4 (con il grillo dopo), come chiede la regia del pacchetto.

    python3 strumenti/volantini/suoni.py      -> audio/sfx/*.mp3 (fuori da git) e il montato finale con gli effetti
"""
import json, os, re, subprocess, sys, unicodedata, urllib.parse
QUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(QUI))
from heygen_api import chiama  # noqa: E402

D = os.path.join(os.path.dirname(os.path.dirname(QUI)), 'pdro-volantini-strappati')
NOME = 'PDRO_Il_caso_del_volantino_scomparso_9x16'
# id: (tipo, ricerca, nome atteso nel risultato o None per il primo)
CAT = {'tasti': ('sound_effects', 'old mechanical typewriter keys clacking', 'Mechanical keyboard typing'),
       'colpo': ('sound_effects', 'cinematic timpani hit boom', 'Cinematic Brass Hit'),
       'tonfo': ('sound_effects', 'comic thud bonk', 'Heavy Thud'),
       'boing': ('sound_effects', 'comic thud bonk', 'Cartoon boing'),
       'strappo': ('sound_effects', 'paper tearing rip', 'Quick paper tear'),
       'grilli': ('sound_effects', 'crickets chirping night silence', 'Crickets'),
       'clic': ('sound_effects', 'push pin into cork board click', 'Sharp click'),
       'western': ('music', 'spaghetti western whistle guitar', None)}
# (scena, ancora, effetto, volume, durata massima o None)
EVENTI = [('S01', 0.3, 'tasti', 0.45, 1.3), ('S01', 'testimone', 'colpo', 0.55, None), ('S01', 'colpevole', 'colpo', 0.55, None),
          ('S01', 'bersaglio', 'colpo', 0.55, None),
          ('S02', 'strappa+0.28', 'tonfo', 0.85, None), ('S02', 'strappa+0.45', 'boing', 0.3, None),
          ('S03', 0.12, 'strappo', 0.8, None), ('S03', 0.42, 'strappo', 0.8, None),
          ('S04', 0.0, 'western', 0.4, 2.6), ('S04', 'finora', 'grilli', 0.4, 3.2),
          ('S06', 'diritto', 'tonfo', 0.45, None), ('S06', 'antisindacale', 'tonfo', 0.45, None),
          ('S06', 'reato', 'tonfo', 0.45, None), ('S06', 'cose', 'tonfo', 0.45, None),
          ('S07', 'segnalato$+0.28', 'tonfo', 0.9, None), ('S07', 'aperto', 'colpo', 0.45, None),
          ('S08', 'puntine', 'clic', 0.6, None), ('S08', 'puntine+0.25', 'clic', 0.6, None), ('S08', 'puntine+0.5', 'clic', 0.6, None)]


def norm(s):
    return re.sub(r'[^a-z0-9]', '', unicodedata.normalize('NFD', s.lower()).encode('ascii', 'ignore').decode())


def ancora(v, parole):
    """Stessa sintassi del motore: «parola», «parola#2», «parola$» (fine), «parola+0.3»."""
    if isinstance(v, (int, float)):
        return float(v)
    m = re.match(r'^([^#+\-$]+)(?:#(\d+))?(\$)?([+-][\d.]+)?$', v); w, n = norm(m[1]), int(m[2] or 1); k = 0
    for p in parole:
        if norm(p['w']) == w:
            k += 1
            if k == n:
                return (p['b'] if m[3] else p['a']) + float(m[4] or 0)
    raise ValueError(f'parola {v} non trovata')


def scarica():
    os.makedirs(f'{D}/audio/sfx', exist_ok=True)
    for k, (tipo, q, nome) in CAT.items():
        f = f'{D}/audio/sfx/{k}.mp3'
        if os.path.exists(f):
            continue
        r = chiama('GET', '/v3/audio/sounds?' + urllib.parse.urlencode({'type': tipo, 'query': q, 'limit': 5, 'min_score': 0.4}))
        s = next(x for x in r if nome is None or x['name'] == nome)
        subprocess.run(['curl', '-sS', '-L', '-o', f + '.tmp', s['audio_url']], check=True)
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', f + '.tmp', '-ar', '48000', '-ac', '2', f], check=True); os.remove(f + '.tmp')
        print(k, s['name'], s['id'])


def mescola():
    tempi = {t['id']: t for t in json.load(open(f'{D}/audio/tempi-scene.json'))}
    parole = json.load(open(f'{D}/audio/parole.json'))
    ins, fil, et = ['-i', f'{D}/{NOME}_voce.mp4'], [], []
    for i, (sid, a, k, vol, dmax) in enumerate(EVENTI, 1):
        t = tempi[sid]['inizio'] + ancora(a, parole.get(sid, []))
        ins += ['-i', f'{D}/audio/sfx/{k}.mp3']
        cod = f',atrim=0:{dmax},afade=t=out:st={max(0, dmax - 0.6)}:d=0.6' if dmax else ''
        ms = round(t * 1000)
        fil.append(f'[{i}:a]volume={vol}{cod},adelay={ms}|{ms}[e{i}]'); et.append(f'[e{i}]')
        print(f'{sid} {a!s:>16} {k:8} {t:7.2f}')
    fil.append('[0:a]' + ''.join(et) + f'amix=inputs={len(et) + 1}:normalize=0:duration=first,alimiter=limit=0.95[a]')
    subprocess.run(['ffmpeg', '-v', 'error', '-y', *ins, '-filter_complex', ';'.join(fil), '-map', '0:v', '-map', '[a]',
                    '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', f'{D}/{NOME}.mp4'], check=True)
    print('montato con gli effetti', NOME)


if __name__ == '__main__':
    scarica(); mescola()
