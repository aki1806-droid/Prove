#!/usr/bin/env python3
"""
HeyGen per API REST, la riserva del connettore MCP.

Il connettore (OAuth) consuma i crediti del piano web; la chiave API consuma
il saldo API, che e' un conto separato. Quando il piano e' a secco si fanno
le stesse chiamate da qui, con gli stessi parametri e gli stessi file: il
resto della pipeline (confini_heygen.py, tagli.py, carica.py, scene.py) non
cambia.

La chiave si legge da HEYGEN_API_KEY, impostata come variabile o segreto
dell'ambiente. Mai nel repo, mai in chat.

    heygen_api.py crediti                       saldo API (GET /v3/users/me)
    heygen_api.py voce <voice_id> K [K ...]     testo_K.txt -> unico_K_raw.wav + voce_K.json
    heygen_api.py carica                        batch_in.json -> PUT -> assets.json (via carica.py)
    heygen_api.py monta [titolo]                scene.json -> video studio 16:9 1080p, con srt
    heygen_api.py stato <video_id>              aspetta il render e stampa video_url

`voce` e' `create_speech` con engine "elevenlabs", model_id "eleven_v4",
language "it". Il voice_id va dato sempre, come nel connettore: e4bd8d8a...
per LNV, 9b851842... per SFL (vedi gli standard). Una traccia per chiamata,
sotto i ~2.900 caratteri; dopo un errore o un timeout NON si ritenta da soli:
si chiede ad Achille, perche' ogni chiamata si paga.

Tutti i comandi tranne `crediti` vanno lanciati dentro la cartella della lezione.
"""
import json
import os
import subprocess
import sys
import time
import urllib.error
import urllib.request

BASE = 'https://api.heygen.com'
QUI = os.path.dirname(os.path.abspath(__file__))


def chiama(metodo, percorso, corpo=None, timeout=300):
    chiave = os.environ.get('HEYGEN_API_KEY')
    if not chiave:
        sys.exit('HEYGEN_API_KEY non impostata: va aggiunta alle variabili dell\'ambiente.')
    dati = json.dumps(corpo).encode() if corpo is not None else None
    req = urllib.request.Request(BASE + percorso, data=dati, method=metodo, headers={
        'X-Api-Key': chiave, 'Content-Type': 'application/json', 'Accept': 'application/json'})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return json.loads(r.read() or b'{}').get('data', {})
    except urllib.error.HTTPError as e:
        sys.exit(f'{metodo} {percorso} -> {e.code}: {e.read().decode(errors="replace")[:600]}')


def crediti():
    print(json.dumps(chiama('GET', '/v3/users/me'), indent=1, ensure_ascii=False))


def voce(voice_id, chiavi):
    for k in chiavi:
        testo = open(f'testo_{k}.txt').read().strip()
        t0 = time.time()
        d = chiama('POST', '/v3/voices/speech', {
            'text': testo, 'voice_id': voice_id, 'engine': 'elevenlabs',
            'settings': {'model_id': 'eleven_v4'}, 'language': 'it'})
        json.dump(d, open(f'voce_{k}.json', 'w'), ensure_ascii=False)
        urllib.request.urlretrieve(d['audio_url'], f'unico_{k}_raw.wav')
        print(k, len(testo), 'car |', d.get('duration'), 's |', d.get('engine'),
              '|', round(time.time() - t0), 's di attesa')


def carica():
    voci = json.load(open('batch_in.json'))
    d = chiama('POST', '/v3/assets/direct-uploads/batches', {'files': voci})
    json.dump(d, open('risposta_batch.json', 'w'))
    subprocess.run([sys.executable, os.path.join(QUI, 'carica.py'), 'risposta_batch.json'], check=True)
    chiama('POST', '/v3/assets/complete/batches', {'batch_id': d['batch_id']})
    while True:
        b = chiama('GET', f'/v3/assets/batches/{d["batch_id"]}')
        print(b['status'], b.get('counts_by_status'))
        if b['status'] not in ('queued', 'processing', 'pending', 'in_progress'):
            break
        time.sleep(10)


def monta(titolo=None):
    corpo = {'type': 'studio', 'aspect_ratio': '16:9', 'resolution': '1080p',
             'caption': {'file_format': 'srt', 'style': 'default'},
             'scenes': json.load(open('scene.json'))}
    if titolo:
        corpo['title'] = titolo
    d = chiama('POST', '/v3/videos', corpo)
    print('video_id', d.get('video_id'))
    stato(d['video_id'])


def stato(video_id):
    while True:
        d = chiama('GET', f'/v3/videos/{video_id}')
        if d['status'] in ('completed', 'failed'):
            break
        print(d['status'])
        time.sleep(30)
    print(json.dumps({k: d.get(k) for k in ('status', 'video_url', 'subtitle_url', 'duration',
                                             'failure_code', 'failure_message')}, indent=1))


if __name__ == '__main__':
    a = sys.argv[1:]
    if not a:
        sys.exit(__doc__)
    cmd = {'crediti': crediti, 'voce': lambda *x: voce(x[0], x[1:]), 'carica': carica,
           'monta': monta, 'stato': stato}.get(a[0])
    if not cmd:
        sys.exit(__doc__)
    cmd(*a[1:])
