"""Scarica le immagini Higgsfield nei progetti: python3 scarica_higgs.py indice=url ... (indici di immagini2.json)."""
import json, os, subprocess, sys
QUI = os.path.dirname(os.path.abspath(__file__)); PR = os.path.dirname(os.path.dirname(QUI))
jobs = json.load(open(f'{QUI}/immagini2.json'))['jobs']
for a in sys.argv[1:]:
    i, u = a.split('=', 1); out = f"{PR}/{jobs[int(i)]['out']}"
    subprocess.run(['curl', '-sS', '-o', out, u], check=True)
    r = subprocess.run(['python3', '-c', f"from PIL import Image;print(Image.open('{out}').size)"], capture_output=True, text=True)
    print(i, os.path.basename(out), r.stdout.strip())
