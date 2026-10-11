#!/usr/bin/env python3
"""Lotto HeyGen di una lezione.
  richiesta <lezione>  -> lotto-richiesta.json (copertina, chiusura, clip, mp3)
  carica <lezione>     -> legge heygen-lotto.json (risposta di create_asset_upload_batch),
                          fa i PUT e scrive asset-id.json
  scene <lezione>      -> heygen-scene.json per create_video_from_studio"""
import sys, json, hashlib, subprocess
from pathlib import Path
cmd, L = sys.argv[1], Path(sys.argv[2]).resolve()
reg = json.loads((L/"audio/blocchi-audio.json").read_text())
ids = [r["id"] for r in reg]
ultima = f"s{len(ids)+2:02d}"
FILE = ["slide/png/s01.png", f"slide/png/{ultima}.png"] + \
       [f"slide/mp4/{i}.mp4" for i in ids] + [f"audio/blocchi/{i}.mp3" for i in ids]
TIPI = {"png": "image/png", "mp4": "video/mp4", "mp3": "audio/mpeg"}
if cmd == "richiesta":
    out = []
    for f in FILE:
        b = (L/f).read_bytes()
        out.append({"filename": f, "content_type": TIPI[f[-3:]], "size_bytes": len(b),
                    "checksum_sha256": hashlib.sha256(b).hexdigest()})
    (L/"lotto-richiesta.json").write_text(json.dumps(out, indent=1))
    print(len(out), "file")
elif cmd == "carica":
    lotto = json.loads((L/"heygen-lotto.json").read_text())
    items = lotto.get("items") or lotto["data"]["items"]
    ok, mappa = 0, {}
    for f, it in zip(FILE, items):
        h = sum([["-H", f"{k}: {v}"] for k, v in it["upload_headers"].items()], [])
        p = subprocess.run(["curl", "-sS", "-o", "/dev/null", "-w", "%{http_code}", "-X", "PUT",
                            *h, "--data-binary", f"@{L/f}", it["upload_url"]], capture_output=True, text=True)
        if p.stdout.strip() == "200": ok += 1
        else: print(f, p.stdout, p.stderr[-200:])
        mappa[f] = it["asset_id"]
    (L/"asset-id.json").write_text(json.dumps(mappa, indent=1))
    print(f"{ok}/{len(FILE)} caricati · batch {lotto.get('batch_id')}")
elif cmd == "scene":
    a = json.loads((L/"asset-id.json").read_text())
    sc = [{"type": "image", "source": {"type": "asset_id", "asset_id": a["slide/png/s01.png"]}, "duration": 3}]
    for i in ids:
        sc.append({"type": "video", "source": {"type": "asset_id", "asset_id": a[f"slide/mp4/{i}.mp4"]},
                   "audio_asset_id": a[f"audio/blocchi/{i}.mp3"], "playback": {"mode": "freeze", "mute": True}})
    sc.append({"type": "image", "source": {"type": "asset_id", "asset_id": a[f"slide/png/{ultima}.png"]}, "duration": 10})
    (L/"heygen-scene.json").write_text(json.dumps(sc, indent=1))
    print(len(sc), "scene")
