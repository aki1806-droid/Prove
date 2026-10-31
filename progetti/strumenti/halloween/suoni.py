"""Effetti sonori e musica dei due reel di Halloween, dal catalogo HeyGen (GET /v3/audio/sounds, royalty-free, via
../heygen_api.py), sulle stesse ancore di parola delle grafiche. Il catalogo non ha ululati, risate da strega, pipistrelli,
monete o versi da zombie: al loro posto vento, colpi, campanelle e whoosh, niente versi finti. Musica bassa sotto la voce
(Achille: «musica bassa»): carillon gotico per Jack, pizzicati spettrali e comici per i Fantasmi.

    python3 strumenti/halloween/suoni.py jack|fantasmi    -> audio/sfx/ (fuori da git) e <NOME>.mp4 con effetti e musica
    (prende <NOME>_voce.mp4, l'uscita di ../chicedomani/monta.py rinominata)
"""
import json, os, re, subprocess, sys, unicodedata, urllib.parse
QUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(QUI))
from heygen_api import chiama  # noqa: E402

PR = os.path.dirname(os.path.dirname(QUI))
# id: (tipo, ricerca, id nel catalogo)
CAT = {'vento': ('sound_effects', 'wind howling night', 'dcc590846602e641'),
       'campanella': ('sound_effects', 'small bell ding', '7c6ba3ea3c9e46ed'),
       'chime': ('sound_effects', 'small bell ding', '90afc952d842b17d'),
       'tonfo': ('sound_effects', 'heavy thud', '12b333917db1f54d'),
       'bussa': ('sound_effects', 'knock on wooden door', 'f7e66a7aed7b2dad'),
       'passi': ('sound_effects', 'footsteps on gravel', '723e684e250440eb'),
       'ding': ('sound_effects', 'ding notification', 'fd8d6893299c363d'),
       'tadan': ('sound_effects', 'trumpet fanfare tada comic', 'e552c4c922544a9b'),
       'boing': ('sound_effects', 'trumpet fanfare tada comic', 'f35ddfa09d9f17d3'),
       'colpo': ('sound_effects', 'trumpet fanfare tada comic', 'd045363c0970547e'),
       'tic': ('sound_effects', 'clock ticking', '44eb39f844d99de8'),
       'clic': ('sound_effects', 'light switch click', 'eada0ef7524f3144'),
       'whoosh': ('sound_effects', 'cartoon whoosh', 'a4855a82116cd4cc'),
       'squittio': ('sound_effects', 'bats flapping wings', '71335c7139f13308'),
       'brontolio': ('sound_effects', 'zombie groan', '5a245b7f81501e0c'),
       'mus_jack': ('music', 'gothic fairy tale music box ironic', '39fec2eee49d4dc4bc5f3b60707b40c7'),
       'mus_fantasmi': ('music', 'comic mysterious pizzicato halloween', '685f9059e4cf4904a712fa5318b42de8')}
# (scena, ancora, effetto, volume, durata massima o None)
EVENTI = {
    'jack': [('S01', 0.0, 'vento', 0.35, 5.0), ('S01', 'chiamato$+0.1', 'campanella', 0.5, None), ('S01', 'furbo', 'colpo', 0.4, None),
             ('S02', 'diavolo', 'chime', 0.45, None), ('S02', 'tasca', 'tonfo', 0.5, None), ('S02', 'tasche', 'boing', 0.3, None),
             ('S03', 'arretrati', 'tadan', 0.22, 1.0), ('S03', 'aumenti', 'tadan', 0.22, 1.0), ('S03', 'date', 'tadan', 0.22, 1.0),
             ('S03', 'nessuno+0.3', 'tonfo', 0.8, None),
             ('S04', 'busso', 'bussa', 0.7, None), ('S04', 'busso#2', 'bussa', 0.7, None), ('S04', 'chiuso', 'tonfo', 0.4, None),
             ('S05', 0.0, 'vento', 0.3, 8.0), ('S05', 'vaga', 'passi', 0.35, 4.0), ('S05', 'lui', 'colpo', 0.4, None),
             ('S06', 'diciamo', 'ding', 0.4, None), ('S06', 'sole', 'ding', 0.4, None), ('S06', 'comunichiamo', 'ding', 0.4, None),
             ('S06', 'restiamo', 'ding', 0.4, None),
             ('S07', 'luci', 'chime', 0.35, None), ('S07', 'scherzetti', 'campanella', 0.3, None)],
    'fantasmi': [('S01', 0.0, 'vento', 0.3, 4.0), ('S01', 'fantasmi', 'colpo', 0.4, None), ('S01', 'righe', 'whoosh', 0.35, None),
                 ('S02', 0.1, 'tic', 0.3, 6.0), ('S02', 'straordinario', 'colpo', 0.35, None),
                 ('S03', 'strega', 'whoosh', 0.4, None), ('S03', 'magia', 'chime', 0.4, None),
                 ('S04', 'zombie', 'brontolio', 0.5, 2.5), ('S04', 'vita', 'boing', 0.3, None),
                 ('S05', 'vampiro', 'squittio', 0.35, None), ('S05', 'vampiro+0.4', 'whoosh', 0.35, None),
                 ('S05', 'luce', 'clic', 0.6, None),
                 ('S06', 0.1, 'clic', 0.6, None), ('S06', 'aglio', 'colpo', 0.3, None), ('S06', 'spariscono', 'whoosh', 0.45, None),
                 ('S07', 'aspettiamo', 'campanella', 0.3, None)]}
NOMI = {'jack': 'PDRO_Halloween_Jack_O_Lantern_9x16', 'fantasmi': 'PDRO_Halloween_Fantasmi_del_cedolino_9x16'}
MUSICA_VOL = 0.13


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


def scarica(D):
    os.makedirs(f'{D}/audio/sfx', exist_ok=True)
    for k, (tipo, q, sid) in CAT.items():
        f = f'{D}/audio/sfx/{k}.mp3'
        if os.path.exists(f):
            continue
        r = chiama('GET', '/v3/audio/sounds?' + urllib.parse.urlencode({'type': tipo, 'query': q, 'limit': 10, 'min_score': 0.4}))
        s = next(x for x in (r if isinstance(r, list) else r.get('sounds') or []) if x['id'] == sid)
        subprocess.run(['curl', '-sS', '-L', '-o', f + '.tmp', s['audio_url']], check=True)
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', f + '.tmp', '-ar', '48000', '-ac', '2', f], check=True); os.remove(f + '.tmp')
        print(k, s['name'], s['id'])


def mescola(v, D):
    nome = NOMI[v]
    tempi = {t['id']: t for t in json.load(open(f'{D}/audio/tempi-scene.json'))}
    parole = json.load(open(f'{D}/audio/parole.json'))
    tot = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f'{D}/{nome}_voce.mp4'],
                               capture_output=True, text=True).stdout)
    ins = ['-i', f'{D}/{nome}_voce.mp4', '-stream_loop', '-1', '-i', f'{D}/audio/sfx/mus_{v}.mp3']
    fil = [f'[1:a]atrim=0:{tot:.2f},volume={MUSICA_VOL},afade=t=in:d=1.5,afade=t=out:st={tot - 2.5:.2f}:d=2.5[mus]']; et = ['[mus]']
    for i, (sid, a, k, vol, dmax) in enumerate(EVENTI[v], 2):
        t = tempi[sid]['inizio'] + ancora(a, parole.get(sid, []))
        ins += ['-i', f'{D}/audio/sfx/{k}.mp3']
        cod = f',atrim=0:{dmax},afade=t=out:st={max(0, dmax - 0.6)}:d=0.6' if dmax else ''
        ms = round(t * 1000)
        fil.append(f'[{i}:a]volume={vol}{cod},adelay={ms}|{ms}[e{i}]'); et.append(f'[e{i}]')
        print(f'{sid} {a!s:>16} {k:10} {t:7.2f}')
    fil.append('[0:a]' + ''.join(et) + f'amix=inputs={len(et) + 1}:normalize=0:duration=first,alimiter=limit=0.95[a]')
    subprocess.run(['ffmpeg', '-v', 'error', '-y', *ins, '-filter_complex', ';'.join(fil), '-map', '0:v', '-map', '[a]',
                    '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', f'{D}/{nome}.mp4'], check=True)
    # −16 LUFS come gli altri reel PDRO (il missaggio esce intorno a −20)
    e = subprocess.run(['ffmpeg', '-hide_banner', '-nostats', '-i', f'{D}/{nome}.mp4', '-af', 'ebur128', '-f', 'null', '-'],
                       capture_output=True, text=True).stderr
    g = -16 - float(re.findall(r'I:\s+(-?[\d.]+) LUFS', e)[-1])
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', f'{D}/{nome}.mp4', '-af', f'volume={g:.2f}dB,alimiter=limit=0.89:level=false',
                    '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', f'{D}/{nome}.tmp.mp4'], check=True)
    os.replace(f'{D}/{nome}.tmp.mp4', f'{D}/{nome}.mp4')
    print('montato con effetti e musica', nome, f'guadagno {g:+.1f} dB')


if __name__ == '__main__':
    for v in sys.argv[1:]:
        D = f'{PR}/pdro-halloween-{v}'; scarica(D); mescola(v, D)
