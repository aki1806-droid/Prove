#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Passo 9 del MASTER: il payload delle scene per create_video_from_studio.

Legge clip/asset-id.json - la mappa nome file → asset id, che si compila dopo il
caricamento - e scrive il payload esatto. Esiste per una ragione sola: la regola
che costa un render se la si sbaglia sta scritta qui una volta, invece di essere
ricordata a mano cinquanta volte.

  scene video    audio_asset_id  +  playback {mode fit_to_scene, mute true}
                 - senza audio_asset_id la scena dura quanto la clip;
                 - con mode "freeze" (che e' il DEFAULT se si omette playback)
                   la clip parte, finisce e resta congelata sull'ultimo
                   fotogramma per tutto il resto del blocco;
                 - senza mute true si sente l'audio che il modello ha generato
                   per conto suo, sopra la voce.
                 Le clip escono gia' della durata esatta, quindi fit_to_scene
                 non cambia velocita': e' la rete di sicurezza per gli scarti
                 di qualche fotogramma.
  scene immagine duration esplicito, nessun audio.

  python3 monta-heygen.py        scrive scene/payload.json
"""
import json, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))
from aritmetica import CONTI, profilo

QUI = Path(__file__).resolve().parent
p = profilo(); c = CONTI(p)
mappa = json.loads((QUI/"clip"/"asset-id.json").read_text(encoding="utf-8"))
reg = json.loads((QUI/"audio"/"blocchi-audio.json").read_text(encoding="utf-8"))

def aid(nome):
    if nome not in mappa:
        raise SystemExit(f"manca l'asset id di {nome} in clip/asset-id.json")
    return mappa[nome]

scene = [{"type": "image", "source": {"type": "asset_id", "asset_id": aid("copertina.png")},
          "duration": c["copertina"]}]
for r in reg:
    scene.append({
        "type": "video",
        "source": {"type": "asset_id", "asset_id": aid(f'{r["id"]}.mp4')},
        "audio_asset_id": aid(f'{r["id"]}.mp3'),
        "playback": {"mode": "fit_to_scene", "mute": True},
    })
scene.append({"type": "image", "source": {"type": "asset_id", "asset_id": aid("chiusura.png")},
              "duration": c["chiusura"]})

payload = {"title": p["titolo"], "aspectRatio": p["formato"], "resolution": "1080p",
           "caption": {"file_format": "srt"}, "scenes": scene}
(QUI/"scene"/"payload.json").write_text(json.dumps(payload, ensure_ascii=False, indent=1),
                                        encoding="utf-8")
d = c["copertina"] + c["chiusura"] + sum(r["durata"] for r in reg)
print(f'scene/payload.json  ·  {len(scene)} scene (tetto 50)  ·  {p["formato"]} 1080p')
print(f'durata attesa {int(d//60)}:{d%60:04.1f}')
if len(scene) > 50:
    raise SystemExit("oltre il tetto di 50 scene: il video va diviso in parti")
