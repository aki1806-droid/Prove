"""Dal registro della sessione Claude: le generazioni ElevenLabs avviate su un flusso,
come righe 'chiave session_id' (chiave = testo del prompt). Uso: sessioni_flusso.py FLOW_ID"""
import json, sys
T = '/root/.claude/projects/-home-user-Prove/88c49a3c-ab22-5204-be86-d15ded680d66.jsonl'
flow = sys.argv[1]
uso, ris = {}, {}
for line in open(T):
    try: e = json.loads(line)
    except Exception: continue
    c = (e.get('message') or {}).get('content')
    if not isinstance(c, list): continue
    for b in c:
        if b.get('type') == 'tool_use' and b.get('input', {}).get('flow_id') == flow and 'prompt' in b['input']:
            uso[b['id']] = b['input']
        if b.get('type') == 'tool_result':
            t = b.get('content')
            if isinstance(t, list): t = ''.join(x.get('text', '') for x in t)
            if isinstance(t, str) and t.startswith('{"flow_id"'):
                try: ris[b['tool_use_id']] = json.loads(t)
                except Exception: pass
out = {}
for k, inp in uso.items():
    if k in ris and ris[k].get('session_ids'):
        out[inp['prompt']] = ris[k]['session_ids'][0]
json.dump(out, sys.stdout, ensure_ascii=False, indent=1)
