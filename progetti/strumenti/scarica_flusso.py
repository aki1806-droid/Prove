"""Scarica voci e b-roll da file di stato ElevenLabs (creative_get_flow_run_status).
Uso: scarica_flusso.py CARTELLA_PROGETTO PAROLE_CHIAVE_JSON STATO1 [STATO2 ...]
Le voci si abbinano per testo esatto a testi.json; immagini e clip per parola chiave nel prompt."""
import json, os, subprocess, sys
prog, chiavi = sys.argv[1], json.loads(sys.argv[2])
T = json.load(open(os.path.join(prog, 'testi.json')))
os.makedirs(os.path.join(prog, 'audio'), exist_ok=True); os.makedirs(os.path.join(prog, 'broll'), exist_ok=True)
tracce, fatti = [], set()
for f in sys.argv[3:]:
    d = json.load(open(f))
    print(os.path.basename(f), 'completati', d['all_completed'], 'errori', d['has_failures'])
    for m in d['media']:
        p = m['prompt'].strip()
        if m['kind'] == 'audio':
            k = [k for k, v in T.items() if v == p]
            assert len(k) == 1, p[:60]
            dest = os.path.join(prog, 'audio', f'grezzo-{k[0]}.mp3'); tracce.append({'id': k[0], 'generation_id': m['generation_id']})
        else:
            k = [s for kw, s in chiavi.items() if kw.lower() in p.lower()]
            assert len(k) == 1, p[:60]
            ext = 'png' if m['kind'] == 'image' else 'mp4'
            dest = os.path.join(prog, 'broll', f'{k[0]}_sorgente.{ext}')
        subprocess.run(['curl', '-sSf', '-o', dest, m['master_url']], check=True)
        fatti.add(os.path.basename(dest))
json.dump(sorted(tracce, key=lambda x: x['id']), open(os.path.join(prog, 'audio/tracce.json'), 'w'), indent=1)
print(len(fatti), 'file;', len(tracce), 'voci su', len(T))
