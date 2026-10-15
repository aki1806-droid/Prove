#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Il caricamento su HeyGen e la lista delle scene, come per le lezioni del corso.

  heygen.py <cartella del mese> prepara   files.json per create_asset_upload_batch
  heygen.py <cartella del mese> invia     i byte agli URL firmati del lotto (_montaggio/lotto.json)
  heygen.py <cartella del mese> scene     la lista per create_video_from_studio

Otto scene video, ognuna con la sua traccia (voce e musica gia' mixate): anche
la copertina e la chiusura, che sono mute nel pacchetto ma portano la musica.
Il video e' muto e fermo sull'ultimo fotogramma; la durata la detta l'mp3.
"""
import json, time, subprocess, sys
from pathlib import Path

QUI = Path(sys.argv[1]).resolve()
OUT = QUI/"_montaggio"; OUT.mkdir(exist_ok=True)
IDS = [s["id"] for s in json.loads((QUI/"scene.json").read_text(encoding="utf-8"))]

def cmd_prepara():
    voci  = [(f"{i}.mp4", QUI/"scene"/f"{i}.mp4", "video/mp4") for i in IDS]
    voci += [(f"{i}.mp3", QUI/"audio"/"scene"/f"{i}.mp3", "audio/mpeg") for i in IDS]
    for _, p, _ in voci:
        if not p.exists(): raise SystemExit(f"manca {p}")
    (OUT/"files.json").write_text(json.dumps(
        [{"filename": n, "content_type": c, "size_bytes": p.stat().st_size} for n, p, c in voci]))
    (OUT/"percorsi.json").write_text(json.dumps([[n, str(p), c] for n, p, c in voci]))
    print(json.dumps([{"filename": n, "content_type": c, "size_bytes": p.stat().st_size}
                      for n, p, c in voci]))

def cmd_invia():
    lotto = json.loads((OUT/"lotto.json").read_text())
    perc = json.loads((OUT/"percorsi.json").read_text())
    items = lotto["items"]
    if len(items) != len(perc): raise SystemExit("lotto e percorsi non combaciano")
    mappa = {}
    for it, (nome, strada, tipo) in zip(items, perc):
        if it["upload_headers"]["content-type"] != tipo:
            raise SystemExit(f"{nome}: il lotto aspetta {it['upload_headers']['content-type']}")
        testa = [x for k, v in it["upload_headers"].items() for x in ("-H", f"{k}: {v}")]
        for attesa in (0, 2, 4, 8):          # un 503 dello storage e' transitorio
            time.sleep(attesa)
            p = subprocess.run(["curl", "-sS", "--max-time", "300", "-o", "/dev/null", "-w",
                                "%{http_code}", "-X", "PUT", "--upload-file", strada, *testa,
                                it["upload_url"]], capture_output=True, text=True)
            if p.stdout.strip() == "200": break
        if p.stdout.strip() != "200": raise SystemExit(f"{nome}: {p.stdout} {p.stderr[-200:]}")
        mappa[nome] = it["asset_id"]
    (OUT/"asset-heygen.json").write_text(json.dumps(
        {"batch_id": lotto["batch_id"], "asset": mappa}, indent=1))
    print(f"{len(mappa)} file inviati · batch {lotto['batch_id']}")

def cmd_scene():
    a = json.loads((OUT/"asset-heygen.json").read_text())["asset"]
    scene = [{"type": "video", "source": {"type": "asset_id", "asset_id": a[f"{i}.mp4"]},
              "audio_asset_id": a[f"{i}.mp3"], "playback": {"mode": "freeze", "mute": True}}
             for i in IDS]
    (OUT/"scene-heygen.json").write_text(json.dumps(scene))
    print(json.dumps(scene))

if __name__ == "__main__":
    {"prepara": cmd_prepara, "invia": cmd_invia, "scene": cmd_scene}[sys.argv[2]]()
