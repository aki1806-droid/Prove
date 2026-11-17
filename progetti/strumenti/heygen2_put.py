# PUT dei file su Heygen 2: legge dal transcript le richieste create_asset_upload (filename) e le risposte (upload_url, headers)
import json, subprocess, sys, os, glob
FILES = dict(a.split('=', 1) for a in sys.argv[1:])   # filename=percorso locale
uses, res = {}, {}
for p in glob.glob('/root/.claude/projects/*/*.jsonl'):
    for l in open(p):
        try: d = json.loads(l)
        except Exception: continue
        c = d.get('message', {}).get('content', []) if isinstance(d.get('message'), dict) else []
        if not isinstance(c, list): continue
        for x in c:
            if not isinstance(x, dict): continue
            if x.get('type') == 'tool_use' and x.get('name', '').endswith('Heygen_2__create_asset_upload'): uses[x['id']] = x['input'].get('filename')
            if x.get('type') == 'tool_result' and x.get('tool_use_id') in uses:
                t = x['content'] if isinstance(x['content'], str) else ''.join(y.get('text', '') for y in x['content'])
                try: res[uses[x['tool_use_id']]] = json.loads(t)
                except Exception: pass
for n, path in FILES.items():
    r = res[n]
    h = sum([['-H', f'{k}: {v}'] for k, v in r['upload_headers'].items()], [])
    code = subprocess.run(['curl', '-sS', '-o', '/dev/null', '-w', '%{http_code}', '-X', 'PUT', *h, '--data-binary', '@' + path, r['upload_url']], capture_output=True, text=True).stdout
    print(n, code, r['asset_id'])
