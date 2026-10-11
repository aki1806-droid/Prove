"""Dopo il render dell'avatar: taglia avatar/avatar-unico.mp4 nelle scene *_avatar (monogramma LPG
in alto a sinistra), oppure costruisce heygen-scene.json dalle mappe asset.
  monta.py taglia CARTELLA
  monta.py scene CARTELLA SECONDI_CHIUSURA"""
import json, os, subprocess, sys
QUI = os.path.dirname(os.path.abspath(__file__))
fase, P = sys.argv[1], os.path.abspath(sys.argv[2])
A = lambda *x: os.path.join(P, *x)
if fase == 'taglia':
    for t in json.load(open(A('audio/avatar-tempi.json'))):
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', f"{t['inizio']:.3f}", '-i', A('avatar/avatar-unico.mp4'),
                        '-i', os.path.join(QUI, 'logo-lpg-avatar.png'), '-filter_complex',
                        '[0:v]fps=25,scale=1920:1080[a];[a][1:v]overlay=56:48,format=yuv420p[v]', '-map', '[v]', '-an',
                        '-t', f"{t['durata'] + 0.12:.3f}", '-c:v', 'libx264', '-crf', '18', '-preset', 'medium', A('avatar', t['id'] + '.mp4')], check=True)
        print(t['id'])
else:
    chiusura = float(sys.argv[3])
    m = {}
    for f in ('heygen-asset.json', 'heygen-asset-avatar.json'):
        if os.path.exists(A(f)): m.update({os.path.relpath(os.path.join(os.path.dirname(P), k), P): v for k, v in json.load(open(A(f))).items()})
    ids = [l.split()[0] for l in open(A('audio/durate.txt'))]
    sc = [{"type": "image", "source": {"type": "asset_id", "asset_id": m['grafiche/00_copertina.png']}, "duration": 3}]
    for i in ids:
        a = m[f'audio/finali/{i}.mp3']
        if i.endswith('_avatar') or i.endswith('_broll'):
            v = m[('avatar/' if i.endswith('_avatar') else 'broll/') + i + '.mp4']
            sc.append({"type": "video", "source": {"type": "asset_id", "asset_id": v}, "audio_asset_id": a, "playback": {"mode": "freeze", "mute": True}})
        else:
            sc.append({"type": "image", "source": {"type": "asset_id", "asset_id": m[f'grafiche/{i}.png']}, "audio_asset_id": a})
    sc.append({"type": "image", "source": {"type": "asset_id", "asset_id": m['grafiche/99_chiusura.png']}, "duration": chiusura})
    json.dump(sc, open(A('heygen-scene.json'), 'w'), indent=1)
    print(len(sc), 'scene')
