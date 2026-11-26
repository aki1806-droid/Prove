#!/usr/bin/env python3
"""Dalle clip in src/ (segnaposto __W__ __H__ __CX__ __CY__ __K__) scrive clips/NN-nome-h.html e -v.html."""
import glob, os
QUI = os.path.dirname(os.path.abspath(__file__))
F = {"h": dict(W=1920, H=1080, CX=960, CY=470, K=1.22), "v": dict(W=1080, H=1920, CX=540, CY=820, K=1.05)}
os.makedirs(os.path.join(QUI, "clips"), exist_ok=True)
for src in sorted(glob.glob(os.path.join(QUI, "src", "*.html"))):
    s0 = open(src).read()
    for o, p in F.items():
        s = s0
        for k, v in p.items():
            s = s.replace(f"__{k}__", str(v))
        n = os.path.basename(src)[:-5]
        open(os.path.join(QUI, "clips", f"{n}-{o}.html"), "w").write(s)
print("ok")
