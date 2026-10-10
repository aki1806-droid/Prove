#!/usr/bin/env python3
"""Scrive scene.json per create_video_from_studio dagli id gia' caricati.

uso: scene-da-asset.py <cartella-lezione>

Legge asset-id.json (clip e copertine) e asset-id-audio.json (blocchi di
voce) della lezione: per rimontare dopo aver sostituito qualche asset basta
aggiornare l'id in quei due file e rilanciare. Le regole sono quelle del
MASTER §7: scene video con audio_asset_id e playback freeze+mute, copertina
3 s, chiusura 10 s."""
import json, sys
from pathlib import Path

D = Path(sys.argv[1])
clip = json.loads((D/"asset-id.json").read_text(encoding="utf-8"))["asset"]
voce = json.loads((D/"asset-id-audio.json").read_text(encoding="utf-8"))["asset"]
ids = [b["id"] for b in json.loads((D/"copione"/"blocchi.json").read_text(encoding="utf-8"))]
assert all(i in clip and i in voce for i in ids), "manca un id di clip o di voce"
scene = [{"type": "image", "source": {"type": "asset_id", "asset_id": clip["s01"]}, "duration": 3}]
scene += [{"type": "video", "source": {"type": "asset_id", "asset_id": clip[i]},
           "audio_asset_id": voce[i], "playback": {"mode": "freeze", "mute": True}} for i in ids]
scene.append({"type": "image", "source": {"type": "asset_id", "asset_id": clip["s50"]}, "duration": 10})
(D/"scene.json").write_text(json.dumps(scene, separators=(",", ":")), encoding="utf-8")
print(f"{D.name}: {len(scene)} scene -> scene.json")
