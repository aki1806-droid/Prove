"""HeyGen via API (v3) con la chiave dell'account aki.pagliaro: si usa quando finiscono i crediti del connettore MCP.
Stesso account del connettore, ma fatturato sul portafoglio API (separato dai crediti premium dell'abbonamento).

La chiave non sta mai nel repository. Strada giusta: segreto di rete dell'ambiente (tipo Bearer, sito
api.heygen.com: HeyGen accetta la chiave anche come «Authorization: Bearer»), che il proxy aggiunge da solo alle richieste. In alternativa HEYGEN_API_KEY o /root/.config/heygen/api_key.

    python3 heygen_api.py utente                                   profilo e saldo del portafoglio API
    python3 heygen_api.py voce <voice_id> <testo.txt> <uscita>     TTS ElevenLabs eleven_v4: <uscita>.json (stesso formato
                                                                   della create_speech del connettore) e <uscita>-grezzo.mp3
    python3 heygen_api.py asset <file>                              carica un file, stampa l'asset_id
    python3 heygen_api.py avatar <look_id> <audio_asset_id> [webm] [titolo]   video avatar sull'audio, stampa il video_id
    python3 heygen_api.py scarica <video_id> <file>                 aspetta il video avatar e lo scarica
    python3 heygen_api.py suoni "<descrizione>" [n]                 effetti sonori dal catalogo HeyGen (titolo, durata, url)
    python3 heygen_api.py musica "<descrizione>" [n]                musica dal catalogo HeyGen (royalty-free)
"""
import json, os, subprocess, sys, time, urllib.parse, urllib.request

API = 'https://api.heygen.com'


def chiave():
    """La chiave locale, se c'è. Senza, la mette il proxy dell'ambiente: segreto di rete di tipo Bearer
    per api.heygen.com, impostato nelle impostazioni dell'ambiente (la sessione non la vede mai)."""
    k = os.environ.get('HEYGEN_API_KEY')
    if not k and os.path.exists('/root/.config/heygen/api_key'):
        k = open('/root/.config/heygen/api_key').read().strip()
    return k


def chiama(metodo, percorso, corpo=None):
    h = {'Content-Type': 'application/json', 'Accept': 'application/json'}
    if chiave():
        h['X-Api-Key'] = chiave()
    req = urllib.request.Request(API + percorso, method=metodo, data=json.dumps(corpo).encode() if corpo is not None else None,
                                 headers=h)
    try:
        with urllib.request.urlopen(req, timeout=300) as r:
            d = json.load(r)
    except urllib.error.HTTPError as e:
        sys.exit(f'{metodo} {percorso}: HTTP {e.code} {e.read().decode()[:600]}')
    return d.get('data', d)


def scarica_url(url, dest):
    subprocess.run(['curl', '-sS', '-L', '-o', dest, url], check=True)


def voce(voice_id, testo, uscita, modello='eleven_v4'):
    t = open(testo).read().strip() if os.path.exists(testo) else testo
    d = chiama('POST', '/v3/voices/speech', {'text': t, 'voice_id': voice_id, 'engine': 'elevenlabs',
                                             'settings': {'model_id': modello}, 'language': 'it'})
    json.dump(d, open(f'{uscita}.json', 'w'), ensure_ascii=False)
    grezzo = f'{uscita}-grezzo.tmp'
    scarica_url(d['audio_url'], grezzo)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', grezzo, '-b:a', '192k', f'{uscita}-grezzo.mp3'], check=True)
    os.remove(grezzo)
    print(d.get('request_id'), f"{d['duration']:.1f} s", d.get('engine'))


def asset(f):
    size, nome = os.path.getsize(f), os.path.basename(f)
    tipo = {'.mp3': 'audio/mpeg', '.wav': 'audio/wav', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
            '.mp4': 'video/mp4', '.webm': 'video/webm'}[os.path.splitext(f)[1].lower()]
    d = chiama('POST', '/v3/assets/direct-uploads', {'filename': nome, 'content_type': tipo, 'size_bytes': size})
    h = sum([['-H', f'{k}: {v}'] for k, v in (d.get('upload_headers') or {'Content-Type': tipo}).items()], [])
    subprocess.run(['curl', '-sS', '-f', '-X', 'PUT', *h, '--upload-file', f, d['upload_url']], check=True)
    chiama('POST', f"/v3/assets/{d['asset_id']}/complete", {})
    print(d['asset_id'])
    return d['asset_id']


def avatar(look, audio_asset, webm=False, titolo=None):
    corpo = {'type': 'avatar', 'avatar_id': look, 'audio_asset_id': audio_asset, 'aspect_ratio': 'auto', 'resolution': '1080p'}
    if webm:
        corpo['output_format'] = 'webm'
    if titolo:
        corpo['title'] = titolo
    d = chiama('POST', '/v3/videos', corpo)
    print(d['video_id'], d.get('output_format'))
    return d['video_id']


def scarica(video_id, dest):
    while True:
        d = chiama('GET', f'/v3/videos/{video_id}')
        if d['status'] == 'completed':
            scarica_url(d['video_url'], dest); print('scaricato', dest, d.get('duration')); return
        if d['status'] in ('failed', 'cancelled'):
            sys.exit(f"{video_id}: {d['status']} {d.get('failure_message')}")
        time.sleep(30)


def anima(asset_id, prompt, dest, durata=5, risoluzione='1080p'):
    """anima un'immagine (asset HeyGen) con il modello video di HeyGen (heygen-video-1, image_to_video); attende e scarica.
    Costo misurato il 30/10/2026: 0,20 $ per 5 s a 1080p dal portafoglio API."""
    d = chiama('POST', '/v3/models/videos', {'model': 'heygen-video-1', 'mode': 'image_to_video', 'prompt': prompt,
                                              'image': {'type': 'asset_id', 'asset_id': asset_id}, 'duration': durata,
                                              'resolution': risoluzione})
    vid = d['video_id']
    while True:
        d = chiama('GET', f'/v3/models/videos/{vid}')
        if d['status'] == 'completed':
            scarica_url(d['video_url'], dest); print(vid, 'scaricato', dest, d.get('width'), d.get('height')); return vid
        if d['status'] in ('failed', 'cancelled'):
            sys.exit(f"{vid}: {d['status']} {d.get('failure_message')}")
        time.sleep(15)


def suoni(q, n=5, tipo='sound_effects'):
    d = chiama('GET', '/v3/audio/sounds?' + urllib.parse.urlencode({'type': tipo, 'query': q, 'limit': n, 'min_score': 0.4}))
    for s in (d if isinstance(d, list) else d.get('sounds') or d.get('items') or []):
        print(json.dumps(s, ensure_ascii=False))


if __name__ == '__main__':
    a = sys.argv[1:]
    if not a:
        sys.exit(__doc__)
    if a[0] == 'utente':
        print(json.dumps(chiama('GET', '/v3/users/me'), ensure_ascii=False, indent=1))
    elif a[0] == 'voce':
        voce(*a[1:4])
    elif a[0] == 'asset':
        asset(a[1])
    elif a[0] == 'avatar':
        avatar(a[1], a[2], len(a) > 3 and a[3] == 'webm', a[4] if len(a) > 4 else None)
    elif a[0] == 'scarica':
        scarica(a[1], a[2])
    elif a[0] == 'suoni':
        suoni(a[1], int(a[2]) if len(a) > 2 else 5)
    elif a[0] == 'musica':
        suoni(a[1], int(a[2]) if len(a) > 2 else 5, 'music')
    else:
        sys.exit(__doc__)
