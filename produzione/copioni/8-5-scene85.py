"""Monta le scene della 8.5 — l'unica lezione con una scena senza voce.

    python3 scene85.py

Differisce da scene.py per due cose, ed e' per questo che sta a parte:
  - `s22` non ha parlato. E' la ripresa delle due sedie, venticinque secondi,
    con la traccia di musica al posto dell'audio del blocco;
  - la chiusura dura venti secondi invece di dieci, perche' e' la fine del
    corso e non di una lezione: porta la seconda traccia di musica.
Il conto torna a cinquanta scene, che e' il tetto di HeyGen.
"""
import json

A = json.load(open('assets.json'))['ids']
M = json.load(open('media.json'))
CICLO = {c['file'] for c in json.load(open('slides.json')) if c.get('ciclo')}

SIL3 = '521c2a12e4e7441eb63f3f4e2f26dfd8'
MUTO = A['a_muto25.mp3']
FINE = A['a_chiusura20.mp3']


def clip(c, a):
    return {"type": "video",
            "source": {"type": "asset_id", "asset_id": A[f'v_{c}.mp4']},
            "audio_asset_id": a,
            "playback": {"mode": "loop" if c in CICLO else "freeze", "mute": True}}


def ripresa(b, a):
    u = M[b]['url']
    if M[b]['tipo'] == 'video':
        return {"type": "video", "source": {"type": "url", "url": u},
                "audio_asset_id": a, "playback": {"mode": "loop", "mute": True}}
    return {"type": "image", "source": {"type": "url", "url": u}, "audio_asset_id": a}


sc = [clip('c01', SIL3)]
for n in range(2, 50):
    b = f's{n:02d}'
    if b == 's22':
        sc.append(ripresa(b, MUTO))          # la scena muta: musica sola
    elif b in M:
        sc.append(ripresa(b, A[f'a_{b}.mp3']))
    else:
        sc.append(clip(f'c{n:02d}', A[f'a_{b}.mp3']))
sc.append(clip('c99', FINE))

json.dump(sc, open('scene.json', 'w'))
print(len(sc), 'scene |', len(CICLO), 'cicliche | s22 muta, chiusura 20 s')
