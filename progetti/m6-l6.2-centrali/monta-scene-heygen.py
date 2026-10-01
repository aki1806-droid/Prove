#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""La seconda via per la voce: il parlato lo sintetizza lo studio di HeyGen,
scena per scena, dal testo dei blocchi. Niente tracce, niente tagli, niente
trascrizione: solo le 48 clip e le due copertine caricate come asset.

Scrive scene-heygen.json, il carico pronto per create_video_from_studio.
La via ElevenLabs (monta-scene.py + tagli.py) resta intatta accanto: per
tornarci basta fare le tracce e rimontare, le clip sono le stesse.

Misurato il 1° ottobre 2026 (piano Pro, crediti premium): 1 credito ogni
blocco, circa; un render di 48 blocchi costa ~48 crediti, il render in se'
non si paga. Velocita' di lettura della voce: ~15,5 caratteri al secondo."""
import json, re, sys
from pathlib import Path

QUI = Path(__file__).resolve().parent
VOCE = "7b6722df52c44a79b6adb6c3074588d8"       # Giovanni Rossi, catalogo HeyGen
MOTORE = {"engine_type": "elevenlabs", "model": "eleven_v3"}
CARATTERI_AL_SECONDO = 15.5

blocchi = json.loads((QUI / "copione" / "blocchi.json").read_text(encoding="utf-8"))
try:
    asset = json.loads((QUI / "asset-id.json").read_text(encoding="utf-8"))["asset"]
except FileNotFoundError:
    sys.exit("manca asset-id.json: prima si caricano le 48 clip e le 2 copertine "
             "(manifest-clip.py + carica), poi si scrive asset-id.json")

def pulito(t):
    # i tag di eleven_v3 ([warm], [serious]...) qui non servono: lo script
    # della scena finisce anche nei sottotitoli, e un tag letto e' un errore
    return re.sub(r"\[[a-z ]+\]\s*", "", t).strip()

scene = [{"type": "image", "source": {"type": "asset_id", "asset_id": asset["s01"]}, "duration": 3}]
car = 0
for b in blocchi:
    testo = pulito(b["text"]); car += len(testo)
    scene.append({"type": "video", "source": {"type": "asset_id", "asset_id": asset[b["id"]]},
                  "script": testo, "voice_id": VOCE,
                  "voice_settings": {"engine_settings": MOTORE},
                  "playback": {"mode": "freeze", "mute": True}})
scene.append({"type": "image", "source": {"type": "asset_id", "asset_id": asset["s50"]}, "duration": 10})
(QUI / "scene-heygen.json").write_text(json.dumps(scene, ensure_ascii=False), encoding="utf-8")

stima = car / CARATTERI_AL_SECONDO + 13
print(f"{len(scene)} scene · {car} caratteri · stima {int(stima//60)}:{stima%60:04.1f} · ~{len(blocchi)} crediti HeyGen")
