"""Carica su HeyGen i file elencati in batch_in.json.

    python3 carica.py <file-con-la-risposta-di-create_asset_upload_batch>

La risposta di `create_asset_upload_batch` supera sempre il tetto di token e
viene salvata su file dal client: qui la si rilegge, si fa il PUT di ogni file
sul suo upload_url e si scrivono gli asset_id in assets.json.

Gli id vengono UNITI a quelli gia' presenti, non sostituiti: cosi' si puo'
ricaricare solo una parte del materiale — per esempio le clip rifatte, tenendo
l'audio gia' caricato — senza rigenerare niente.

Il prefisso del nome dice dove sta il file:
    a_sNN.mp3 → mp3u/sNN.mp3     v_cNN.mp4 → clip/cNN.mp4     m_* → musica.mp3
"""
import json
import subprocess
import sys
from pathlib import Path

risposta = json.loads(open(sys.argv[1]).read())
richiesti = json.load(open('batch_in.json'))
assert len(risposta['items']) == len(richiesti), (len(risposta['items']), len(richiesti))

ids = {}
if Path('assets.json').exists():
    ids = json.load(open('assets.json')).get('ids', {})
prima = len(ids)

errori = []
for it, f in zip(risposta['items'], richiesti):
    fn = f['filename']
    if fn.startswith('v_'):
        src = 'clip/' + fn[2:]
    elif fn.startswith('m_'):
        src = 'musica.mp3'
    else:
        src = 'mp3u/' + fn[2:]
    hdr = []
    for k, v in it['upload_headers'].items():
        hdr += ['-H', f'{k}: {v}']
    r = subprocess.run(['curl', '-sS', '-X', 'PUT', *hdr, '--data-binary', '@' + src,
                        '-o', '/dev/null', '-w', '%{http_code}', it['upload_url']],
                       capture_output=True, text=True)
    if r.stdout.strip() != '200':
        errori.append((fn, r.stdout.strip()))
    ids[fn] = it['asset_id']

json.dump({'batch': risposta['batch_id'], 'ids': ids}, open('assets.json', 'w'), indent=0)
print('batch', risposta['batch_id'],
      '| caricati', len(richiesti),
      '| in assets.json', prima, '->', len(ids),
      '| errori', errori)
