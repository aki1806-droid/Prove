"""Registro dei lavori Higgsfield del video «Sentirsi per sentire - colonna sonora» (immagini e clip):
    python3 strumenti/sps/registra.py <immagini|clip> <indice>=<job_id>=<url> ...   -> aggiunge a <tipo>.json e scarica
"""
import json, os, subprocess, sys
D = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), 'pdro-sps-colonna-sonora')
tipo = sys.argv[1]; f = f'{D}/{tipo}.json'
reg = json.load(open(f)) if os.path.exists(f) else {}
for a in sys.argv[2:]:
    i, job, url = a.split('=', 2)
    ext = os.path.splitext(url)[1]; dest = f'{D}/{tipo}/{int(i):03d}{ext}'
    if not os.path.exists(dest):
        subprocess.run(['curl', '-sS', '-f', '-o', dest, url], check=True)
    reg[i] = {'job_id': job, 'file': os.path.basename(dest)}
json.dump(dict(sorted(reg.items(), key=lambda x: int(x[0]))), open(f, 'w'), indent=1)
print(len(reg), tipo)
