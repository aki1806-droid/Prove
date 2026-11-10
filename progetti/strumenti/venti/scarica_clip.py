"""Scarica le clip HeyGen (text_to_video) elencate in <cartella>/clip/id.json non appena sono pronte (GET gratuiti via API).
    python3 strumenti/venti/scarica_clip.py <cartella> [<cartella> ...]
"""
import json, os, sys, time
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
import heygen_api as h  # noqa: E402
lavoro = [(d, s, v) for d in sys.argv[1:] for s, v in json.load(open(f'{d}/clip/id.json')).items() if s.startswith('S')]
while lavoro:
    resto = []
    for d, s, v in lavoro:
        r = h.chiama('GET', f'/v3/models/videos/{v}')
        if r.get('status') == 'completed':
            h.scarica_url(r['video_url'], f'{d}/clip/{s}.mp4'); print('clip', d, s, r.get('duration'))
        elif r.get('status') in ('failed', 'cancelled'):
            print('FALLITA', d, s, v, r.get('failure_message'))
        else:
            resto.append((d, s, v))
    lavoro = resto
    if lavoro: time.sleep(20)
print('clip pronte')
