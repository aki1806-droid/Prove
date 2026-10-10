#!/usr/bin/env python3
"""Caricamento a lotti su HeyGen dei soli file che cambiano.

  carica-lotto.py prepara <cartella-lezione> <voce:A|B|AB|-> <slide...>
      scrive _lotto.json (file locali + nomi) e stampa i «files» da passare
      a create_asset_upload_batch: i blocchi di voce della traccia indicata
      (a<N>-sNN.mp3) e le clip delle slide indicate (v<N>-sNN.mp4; s01 e
      s50 sono i PNG i<N>-sNN.png).
  carica-lotto.py carica <cartella-lezione> <risultato-del-lotto.json>
      fa il PUT di ogni file sul suo upload_url e stampa il batch_id.
  carica-lotto.py registra <cartella-lezione> <risultato-get_asset_batch.json>
      dopo complete_asset_batch, e quando il lotto e' tutto «completed»:
      scrive gli id nuovi in asset-id.json / asset-id-audio.json.
"""
import json, re, subprocess, sys
from pathlib import Path

cmd, D = sys.argv[1], Path(sys.argv[2]).resolve()
N = re.search(r"-l([\d.]+)-", D.name)[1]
LOTTO = D/"_lotto.json"

if cmd == "prepara":
    voce, slide = sys.argv[3], sys.argv[4:]
    reg = json.loads((D/"audio"/"blocchi-audio.json").read_text(encoding="utf-8"))
    files = []
    for r in reg:
        if voce != "-" and r["traccia"] in voce:
            files.append(("audio", r["id"], D/"audio"/"blocchi"/f"{r['id']}.mp3", f"a{N}-{r['id']}.mp3", "audio/mpeg"))
    for s in slide:
        if s in ("s01", "s50"):
            files.append(("clip", s, D/"slide"/"png"/f"{s}.png", f"i{N}-{s}.png", "image/png"))
        else:
            files.append(("clip", s, D/"slide"/"mp4"/f"{s}.mp4", f"v{N}-{s}.mp4", "video/mp4"))
    for f in files: assert f[2].exists(), f[2]
    LOTTO.write_text(json.dumps([[k, i, str(p), n, c] for k, i, p, n, c in files]), encoding="utf-8")
    print(json.dumps([{"filename": n, "content_type": c, "size_bytes": p.stat().st_size}
                      for _, _, p, n, c in files], separators=(",", ":")))

elif cmd == "carica":
    d = json.loads(Path(sys.argv[3]).read_text(encoding="utf-8"))
    files = json.loads(LOTTO.read_text(encoding="utf-8"))
    voci = d.get("items") or d.get("files") or d.get("uploads")
    assert voci and len(voci) == len(files), (list(d.keys()), len(files))
    ok = 0
    for (k, i, p, n, c), v in zip(files, voci):
        assert v.get("filename", n) == n, (v.get("filename"), n)
        h = v.get("upload_headers") or {"content-type": c}
        args = ["curl", "-sS", "-o", "/dev/null", "-w", "%{http_code}", "-X", "PUT", "--data-binary", f"@{p}"]
        for a, b in h.items(): args += ["-H", f"{a}: {b}"]
        code = subprocess.run(args + [v["upload_url"]], capture_output=True, text=True).stdout
        ok += code == "200"
        if code != "200": print("FALLITO", n, code)
        v["_locale"] = [k, i]
    (D/"_lotto-id.json").write_text(json.dumps([[f[0], f[1], v.get("asset_id")] for f, v in zip(files, voci)]), encoding="utf-8")
    print(f"caricati {ok} su {len(files)} · batch_id {d.get('batch_id')}")

elif cmd == "registra":
    ids = json.loads((D/"_lotto-id.json").read_text(encoding="utf-8"))
    st = json.loads(Path(sys.argv[3]).read_text(encoding="utf-8"))
    stati = {it["video_id"]: it["status"] for it in st["items"]}
    if all(a for _, _, a in ids):
        nuovi = ids
    else:  # il lotto non restituisce gli id per file: li prende in ordine dal get_asset_batch
        nuovi = [[k, i, it["video_id"]] for (k, i, _), it in zip(ids, sorted(st["items"], key=lambda x: x["item_index"]))]
    assert all(stati.get(a) == "completed" for _, _, a in nuovi), "lotto non ancora completato"
    for nome, kind in (("asset-id.json", "clip"), ("asset-id-audio.json", "audio")):
        p = D/nome; j = json.loads(p.read_text(encoding="utf-8"))
        for k, i, a in nuovi:
            if k == kind: j["asset"][i] = a
        p.write_text(json.dumps(j, indent=1), encoding="utf-8")
    print(f"registrati {len(nuovi)} id nuovi")
