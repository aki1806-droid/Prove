import json, glob, os, subprocess, sys
R = '/home/user/Prove/progetti'; E = f'{R}/strumenti/eredita'
asset = dict(l.split() for l in open(sys.argv[1]) if l.strip())
note = json.load(open(sys.argv[2]))
av2 = json.load(open(f'{E}/avatar2.json')); clip = json.load(open(f'{E}/clip2.json')); imm = json.load(open(f'{E}/immagini2.json'))['jobs']
def probe(f):
    o = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f], capture_output=True, text=True).stdout
    return float(o)
for d in sorted(av2) + ['ei-t01-teaser-il-sasso']:
    P = f'{R}/{d}'; cod = d.split('-')[1].upper()
    piano = json.load(open(f'{P}/PIANO_MONTAGGIO.json')); voce = json.load(open(f'{E}/achille-{cod.lower()}.json'))
    fm = ' e '.join(f.replace('x', ':') for f in piano['formati'])
    L = [f"# REGISTRO — Eredità Invisibili · {piano['titolo']} ({fm})", '',
         f"Data: 25-26 ottobre 2026 · sessione Claude Code (repo Prove). Pacchetto {cod} non modificato nei testi.",
         "Scelte di Achille: account HeyGen **del connettore**; voce **HeyGen come passante**; **sottotitoli sì**, come il pacchetto",
         "(Jost avorio con ombra, spenti sulle slide); immagini **generate con Higgsfield** dai prompt del pacchetto; **tutti i formati**.", '',
         '## Voce',
         f"«Achille nuovo 1», HeyGen create_speech elevenlabs eleven_v4, una traccia (request {voce['request_id']}, grezzo {voce['duration']:.1f} s)",
         "con i blocchi delle scene uniti da pause di 1,6 s (../strumenti/eredita/voci.py). Pause >0,45 s → 0,35 s, atempo 1,16.", '',
         '| Scena | Voce |', '|---|---|']
    L += [f"| {t['id']} | {t['durata']:.1f} s |" for t in json.load(open(f'{P}/audio/tempi-scene.json'))]
    ids = av2.get(d)
    if ids:
        L += ['', '## Avatar']
        if ids[0]: L.append(f"9:16 «Aki in his studio» col maglione nero (look 0385a9674ffa46d18c07a6d17e6f3e7b), video {ids[0]}: verticale a piena inquadratura,")
        if ids[0]: L.append("abbassato di 110 px perché il gancio stia sopra la testa.")
        if len(ids) > 1 and ids[1]:
            L.append(f"16:9 look orizzontale con la giacca blu (89cf01e0c22547169c460186be0c67a8; il maglione nero non ha un look orizzontale), video {ids[1]}:")
            L.append("ingrandito di 1,3 e spostato nel terzo destro; scritte e sottotitoli delle scene in camera sulla parete di sinistra.")
        L.append("Mai scontornato, mai coperto. Scene parlate in un solo video (audio/tempi-avatar.json), labiale verificato: 20 ms.")
    ii = [j for j in imm if j['out'].startswith(d)]
    cc = {k: v for k, v in clip.items() if k.startswith(d)}
    if ii or cc:
        L += ['', '## Immagini e clip']
        if ii: L.append(f"{len(ii)} immagini Higgsfield gpt_image_2_5, 2K qualità alta, stile «Notturno luminoso», bambini sempre di spalle (../strumenti/eredita/immagini2.json).")
        for k, v in cc.items():
            L.append(f"- clip {os.path.basename(k)}: HeyGen image-to-video heygen-video-1 1080p, {v['secondi']} s, video {v['video']}")
    L += ['', '## Montaggio',
          "../strumenti/eredita/monta.py: dissolvenze incrociate di 0,5 s, Ken Burns lento sulle immagini, slide con un respiro di zoom,",
          "sovrimpressioni del pacchetto con dissolvenza, sfumatura notte dietro ai sottotitoli sulle immagini, nessuna musica.", '', '## Uscita']
    for f in sorted(glob.glob(f'{P}/EI_*.mp4')):
        n = os.path.basename(f); k = n.replace('EI_', '').split('_')[0]
        suf = n[n.index('_9x16') + 5:-4] if '_9x16' in n else ''
        key = k + (suf if suf else '') if 'T01' in n else (k if piano['formati'] == ['9x16'] else f"{k}_{'16x9' if '16x9' in n else '9x16'}")
        if k == 'Y01': key = 'Y01'
        a = asset.get(key, '—')
        L.append(f"- {n}: {probe(f):.1f} s, {os.path.getsize(f) / 1e6:.1f} MB — asset {a}: https://resource2.heygen.ai/video/{a}/original.mp4")
    L += ['', "Verificati: file integri, SAR 1:1, fogli di contatto, sottotitoli dentro il quadro. Copie d'invio sotto i 30 MB mandate in chat.",
          '', '## Da fare (Achille)', '- Musica: non aggiunta (la aggiunge Achille).', "- Le frasi di campagna del piano vanno confermate prima di pubblicare."]
    L += [f'- {x}' for x in note.get(cod, [])]
    open(f'{P}/REGISTRO.md', 'w').write('\n'.join(L) + '\n'); print(d)
