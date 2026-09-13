"""Monta la lista di scene per create_video_from_studio.

    python3 scene.py <primo> <ultimo>      # es. scene.py 2 49

Si aspetta nella cartella corrente: assets.json (gli asset_id restituiti da
carica.py), media.json (le riprese generate) e slides.json (per sapere quali
slide sono cicliche).

Tre tipi di scena:
  - clip di slide  → video + freeze: la clip entra, poi tiene l'ultimo
    fotogramma per tutto il resto del blocco;
  - clip ciclica   → video + loop: si usa SOLO dove il movimento e' il
    contenuto (il pallino che percorre la curva dell'attivazione). Con freeze
    si congelerebbe a meta' corsa;
  - ripresa        → immagine o video preso dall'URL del generatore, che
    HeyGen scarica lato suo (il CDN da qui non e' raggiungibile).
"""
import json
import sys

A = json.load(open('assets.json'))['ids']
M = json.load(open('media.json'))
try:
    CICLO = {c['file'] for c in json.load(open('slides.json')) if c.get('ciclo')}
except FileNotFoundError:
    CICLO = set()

SIL3 = '521c2a12e4e7441eb63f3f4e2f26dfd8'    # 3 s di silenzio, per la copertina
SIL10 = '7bc049c6b13d491783e143a3c8d8974a'   # 10 s di silenzio, per la chiusura

primo, ultimo = int(sys.argv[1]), int(sys.argv[2])


def clip(c, a):
    return {"type": "video",
            "source": {"type": "asset_id", "asset_id": A[f'v_{c}.mp4']},
            "audio_asset_id": a,
            "playback": {"mode": "loop" if c in CICLO else "freeze", "mute": True}}


sc = [clip('c01', SIL3)]
for n in range(primo, ultimo + 1):
    b = f's{n:02d}'
    a = A[f'a_{b}.mp3']
    if b in M:
        u = M[b]['url']
        sc.append({"type": "video", "source": {"type": "url", "url": u},
                   "audio_asset_id": a, "playback": {"mode": "loop", "mute": True}}
                  if M[b]['tipo'] == 'video' else
                  {"type": "image", "source": {"type": "url", "url": u},
                   "audio_asset_id": a})
    else:
        sc.append(clip(f'c{n:02d}', a))
sc.append(clip('c99', SIL10))

json.dump(sc, open('scene.json', 'w'))
print(len(sc), 'scene', f'| {len(CICLO)} cicliche' if CICLO else '')
