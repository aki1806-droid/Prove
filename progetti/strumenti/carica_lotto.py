"""PUT dei file su un lotto HeyGen (create_asset_upload_batch), leggendo gli URL firmati dal
registro della sessione. Uso: carica_lotto.py BATCH_ID MAPPA.json file1 file2 ...  (stesso ordine
della richiesta). Aggiunge 'percorso': asset_id a MAPPA.json."""
import json, os, subprocess, sys
T = '/root/.claude/projects/-home-user-Prove/88c49a3c-ab22-5204-be86-d15ded680d66.jsonl'
bid, mappa_f, files = sys.argv[1], sys.argv[2], sys.argv[3:]
res = None
def walk(o):
    global res
    if isinstance(o, str):
        if o.startswith('{"batch_id":"%s"' % bid) and 'upload_url' in o: res = json.loads(o)
    elif isinstance(o, dict): [walk(v) for v in o.values()]
    elif isinstance(o, list): [walk(v) for v in o]
for line in open(T):
    if bid in line: walk(json.loads(line))
assert res and len(res['items']) == len(files), 'lotto non trovato o numero di file diverso'
CT = {'.mp3': 'audio/mpeg', '.png': 'image/png', '.mp4': 'video/mp4'}
m = json.load(open(mappa_f)) if os.path.exists(mappa_f) else {}
for p, it in zip(files, res['items']):
    c = subprocess.run(['curl', '-sS', '-o', '/dev/null', '-w', '%{http_code}', '-X', 'PUT', '-H', 'Content-Type: ' + CT[os.path.splitext(p)[1]],
                        '-H', 'x-amz-server-side-encryption: AES256', '--data-binary', '@' + p, it['upload_url']], capture_output=True, text=True).stdout
    if c != '200': print('ERRORE', p, c)
    m[p] = it['asset_id']
json.dump(m, open(mappa_f, 'w'), indent=1)
print('caricati', len(files))
