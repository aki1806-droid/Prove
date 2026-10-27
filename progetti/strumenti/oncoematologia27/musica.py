"""Musica del reel «Oncoematologia pediatrica – il confronto del 27 ottobre», dal catalogo HeyGen (royalty-free, via
../heygen_api.py), come chiede il pacchetto: un sottofondo sobrio per le scene 1-5, poi il pianoforte dalla scena 6 alla
fine (il crescendo cade sul grazie della scena 8). Tutto basso sotto la voce, con dissolvenze tra le due tracce.

    python3 strumenti/oncoematologia27/musica.py   -> audio/musica/*.mp3 (fuori da git) e il montato finale con la musica
"""
import json, os, subprocess, sys, urllib.parse
QUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(QUI))
from heygen_api import chiama  # noqa: E402

D = os.path.join(os.path.dirname(os.path.dirname(QUI)), 'pdro-oncoematologia-27-ottobre')
NOME = 'PDRO_Oncoematologia_confronto_27_ottobre_9x16'
TRACCE = {'sobria': ('sober serious ambient documentary underscore, minimal, calm tension', '6d5b5f31564d489babbb787bd4a11f5e'),
          'piano': ('emotional solo piano, gentle, hopeful, slow', '2c2319a469bc473ebe6e2143b89ee311')}
VOL = {'sobria': 0.065, 'piano': 0.08}   # 14-15 dB sotto la voce (-21,5 LUFS)


def scarica():
    os.makedirs(f'{D}/audio/musica', exist_ok=True)
    for k, (q, id) in TRACCE.items():
        f = f'{D}/audio/musica/{k}.mp3'
        if os.path.exists(f):
            continue
        r = chiama('GET', '/v3/audio/sounds?' + urllib.parse.urlencode({'type': 'music', 'query': q, 'limit': 8, 'min_score': 0.4}))
        s = next(x for x in r if x['id'] == id)
        subprocess.run(['curl', '-sS', '-L', '-o', f + '.tmp', s['audio_url']], check=True)
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', f + '.tmp', '-ar', '48000', '-ac', '2', f], check=True); os.remove(f + '.tmp')
        print(k, s['name'], s['duration'])


def mescola():
    tempi = {t['id']: t for t in json.load(open(f'{D}/audio/tempi-scene.json'))}
    tot = sum(t['durata'] for t in tempi.values()); t6 = tempi['S06']['inizio']
    fil = (f"[1:a]volume={VOL['sobria']},atrim=0:{t6 + 1.5:.3f},afade=t=in:d=1.5,afade=t=out:st={t6 - 1.0:.3f}:d=2.5[m1];"
           f"[2:a]volume={VOL['piano']},atrim=0:{tot - t6 + 1:.3f},afade=t=in:d=2.5,"
           f"afade=t=out:st={tot - t6 - 2.5:.3f}:d=2.5,adelay={round((t6 - 1.0) * 1000)}|{round((t6 - 1.0) * 1000)}[m2];"
           f"[0:a][m1][m2]amix=inputs=3:normalize=0:duration=first,alimiter=limit=0.95[a]")
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', f'{D}/{NOME}_voce.mp4', '-i', f'{D}/audio/musica/sobria.mp3',
                    '-i', f'{D}/audio/musica/piano.mp3', '-filter_complex', fil, '-map', '0:v', '-map', '[a]',
                    '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', f'{D}/{NOME}.mp4'], check=True)
    print('montato con la musica', NOME, f'sobria 0-{t6:.1f} s, piano {t6:.1f}-{tot:.1f} s')


if __name__ == '__main__':
    scarica(); mescola()
