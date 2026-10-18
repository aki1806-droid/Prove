"""Montaggio dei pezzi «foto animate» dei libri quando la voce la facciamo noi, scena per scena (25 fps).

    python3 foto.py bt16|bt9|r3|m1 ...

Come trailer.py e monta.py, ma il pacchetto non porta né voce né SRT: la voce sono i blocchi di audio/wav/Sxx.wav
(voci2.py, HeyGen passante) e tutti i tempi vengono da lì. La voce parte a 0,6 s; ogni scena è il suo blocco più
una pausa (PAUSA: il respiro tra le scene, più lungo nel booktrailer), l'ultima tiene 2,6 s di copertina dopo
l'ultima parola. Le foto della scena sono clip HeyGen image_to_video (clip/scena_0N.mp4), la chiusura del pacchetto
resta immagine con una lenta spinta in avanti; dissolvenze di 0,5 s a metà delle pause.
Il testo a schermo del pacchetto entra con la prima parola che dice e ha l'alone scuro di trailer.py; sotto c'è il
velo in basso. Sottotitoli dai tempi delle parole (sottotitoli.srt, impressi con sottotitoli.mjs), tolti dove
ripeterebbero il testo a schermo e sulla chiusura.
"""
import json, os, re, subprocess, sys
import numpy as np
from PIL import Image
from scipy import ndimage as nd

QUI = os.path.dirname(os.path.abspath(__file__))
PR = os.path.dirname(os.path.dirname(QUI))
FPS, X, ATTACCO, CODA, MAXC = 25, 0.5, 0.6, 2.6, 38
PEZZI = {
    'bt16': dict(dir='libro-booktrailer-mappe-16x9', fmt='16x9', pausa=0.8, uscita='Booktrailer_Mappe_Silenziose_16x9'),
    'bt9': dict(dir='libro-booktrailer-mappe-9x16', fmt='9x16', pausa=0.8, uscita='Booktrailer_Mappe_Silenziose_9x16'),
    'r3': dict(dir='libro-reel3-coraggio', fmt='9x16', pausa=0.5, uscita='Reel3_Coraggio_9x16'),
    'm1': dict(dir='libro-reel-mappe1-silenzio', fmt='9x16', pausa=0.5, uscita='Reel_Mappe1_Silenzio_9x16'),
}
FORMATO = {'16x9': dict(W=1920, H=1080, sub_y=820, sub=(1920, 64)), '9x16': dict(W=1080, H=1920, sub_y=1560, sub=(1080, 72))}


def ff(*a):
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', *a], check=True)


def durata(p):
    return float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', p],
                                capture_output=True, text=True, check=True).stdout)


def norm(s):
    return re.sub(r"[^\wàèéìòù' ]", '', s.lower()).split()


def ts(t):
    ms = round(t * 1000); return f'{ms // 3600000:02d}:{ms // 60000 % 60:02d}:{ms // 1000 % 60:02d},{ms % 1000:03d}'


def frasi(parole):
    """Righe di sottotitolo: a capo alla punteggiatura forte o oltre MAXC caratteri."""
    out, cur = [], []
    for w in parole:
        if cur and len(' '.join(x['w'] for x in cur + [w])) > MAXC:
            out.append(cur); cur = []
        cur.append(w)
        if re.search(r'[.?!:»]$', w['w']):
            out.append(cur); cur = []
    return out + ([cur] if cur else [])


def monta(k):
    c = PEZZI[k]; f = FORMATO[c['fmt']]; W, H = f['W'], f['H']
    D = os.path.join(PR, c['dir']); L = f'{D}/montaggio'; os.makedirs(L, exist_ok=True)
    scene = json.load(open(f'{D}/scene.json'))
    tempi = {t['id']: t['durata'] for t in json.load(open(f'{D}/audio/tempi-scene.json'))}
    parole = json.load(open(f'{D}/audio/parole.json'))
    N = len(scene)
    # quando parte la voce di ogni scena, dove si taglia, quanto dura tutto
    a, t = [], ATTACCO
    for s in scene:
        a.append(t); t += tempi[s['id']] + c['pausa']
    fine = round(a[-1] + tempi[scene[-1]['id']] + CODA, 2)
    tagli = [a[i] - c['pausa'] / 2 for i in range(1, N)]; bordi = [0.0] + tagli + [fine]
    # voce: i blocchi in fila con le pause
    fil = ''.join(f"[{i}:a]apad=whole_dur={tempi[s['id']] + c['pausa']:.3f}[p{i}];" for i, s in enumerate(scene))
    fil += ''.join(f'[p{i}]' for i in range(N)) + f'concat=n={N}:v=0:a=1,adelay={int(ATTACCO * 1000)},apad=whole_dur={fine}[o]'
    ff(*sum([['-i', f"{D}/audio/wav/{s['id']}.wav"] for s in scene], []), '-filter_complex', fil, '-map', '[o]',
       '-t', f'{fine}', '-ar', '44100', f'{L}/voce.wav')
    # sottotitoli
    righe, nascosti = [], []
    for i, s in enumerate(scene):
        schermo = norm(s['schermo']) if s['schermo'] not in ('–', '-') else []
        for fr in frasi(parole[s['id']]):
            n = len(righe) + 1
            righe.append((n, a[i] + fr[0]['a'], a[i] + fr[-1]['b'], ' '.join(w['w'] for w in fr)))
            if i == N - 1 or (schermo and set(norm(righe[-1][3])) <= set(schermo)):
                nascosti.append(n)
    open(f'{D}/sottotitoli.srt', 'w').write('\n'.join(f'{n}\n{ts(x)} --> {ts(y)}\n{z}\n' for n, x, y, z in righe))
    subprocess.run(['node', f'{QUI}/sottotitoli.mjs', D, *map(str, f['sub'])], check=True, capture_output=True)
    # le scene
    seg = []
    for i, s in enumerate(scene):
        L_i = (bordi[i + 1] - bordi[i]) + (X / 2 if i > 0 else 0) + (X / 2 if i < N - 1 else 0)
        out = f'{L}/s{i + 1}.mp4'; n = round(L_i * FPS)
        if i < N - 1:
            src = f'{D}/clip/scena_0{i + 1}.mp4'; lento = max(1.0, L_i / durata(src))
            ff('-i', src, '-vf', f'setpts=PTS*{lento:.4f},fps={FPS},scale={W}:{H}:force_original_aspect_ratio=increase:flags=lanczos,'
               f'crop={W}:{H},format=yuv420p', '-frames:v', str(n), '-c:v', 'libx264', '-crf', '16', '-preset', 'medium', out)
        else:
            ff('-loop', '1', '-framerate', str(FPS), '-i', f"{D}/scene_{c['fmt']}/{s['immagine']}", '-vf',
               f"scale={2 * W}:{2 * H},zoompan=z='1+0.04*on/{n}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s={W}x{H}:fps={FPS},format=yuv420p",
               '-frames:v', str(n), '-c:v', 'libx264', '-crf', '16', '-preset', 'medium', out)
        seg.append(out)
    fil, prev = '', '[0:v]'
    for i in range(1, N):
        fil += f"{prev}[{i}:v]xfade=transition=fade:duration={X}:offset={tagli[i - 1] - X / 2:.3f}[x{i}];"; prev = f'[x{i}]'
    v = np.clip((np.linspace(0, 1, H) - 0.5) / 0.5, 0, 1) ** 1.6 * 0.6 * 255
    velo = np.zeros((H, W, 4), np.uint8); velo[..., 3] = v[:, None].astype(np.uint8)
    Image.fromarray(velo, 'RGBA').save(f'{L}/velo.png')
    ins = sum([['-i', s] for s in seg], []) + ['-loop', '1', '-i', f'{L}/velo.png']; q = N + 1
    fil += (f"[{N}:v]format=rgba,fade=out:st={tagli[-1] - X / 2:.2f}:d={X}:alpha=1[velo];"
            f"{prev}[velo]overlay=0:0:shortest=1[vv];"); prev = '[vv]'
    for i, s in enumerate(scene[:-1]):
        png = f"{D}/grafiche/testo_scena_0{i + 1}_{c['fmt']}.png"
        if not os.path.exists(png):
            continue
        prima = norm(s['schermo'])[0]
        w0 = next((w for w in parole[s['id']] if norm(w['w'])[:1] == [prima]), parole[s['id']][0])
        t_in, t_out = a[i] + w0['a'] - 0.1, bordi[i + 1] - 0.3
        T = np.asarray(Image.open(png).convert('RGBA')).astype(np.float32) / 255
        ab = np.clip(nd.gaussian_filter(T[..., 3], 22) * 2.2, 0, 1) * 0.7; at = T[..., 3]
        ao = at + ab * (1 - at); rgb = T[..., :3] * at[..., None] / np.maximum(ao, 1e-4)[..., None]
        Image.fromarray((np.dstack([rgb, ao]) * 255).astype(np.uint8), 'RGBA').save(f'{L}/testo_0{i + 1}.png')
        ins += ['-loop', '1', '-i', f'{L}/testo_0{i + 1}.png']
        fil += (f"[{q}:v]format=rgba,fade=in:st={t_in:.2f}:d=0.6:alpha=1,fade=out:st={t_out - 0.4:.2f}:d=0.4:alpha=1[t{i}];"
                f"{prev}[t{i}]overlay=0:0:shortest=1[w{i}];"); prev = f'[w{i}]'; q += 1
    tutti = json.load(open(f'{L}/sub/sub.json'))
    fine_sub = {x['n']: (tutti[j + 1]['a'] if j + 1 < len(tutti) else 1e9) for j, x in enumerate(tutti)}
    via = {x['n'] for x in tutti if set(x['parti']) & set(nascosti)}
    for j, s in enumerate([s for s in tutti if s['n'] not in via]):
        ins += ['-i', f"{L}/sub/{s['n']:03d}.png"]
        fil += f"{prev}[{q}:v]overlay=0:{f['sub_y']}:enable='between(t,{s['a']:.3f},{min(s['b'] + 0.12, fine_sub[s['n']] - 0.02):.3f})'[v{j}];"
        prev = f'[v{j}]'; q += 1
    ins += ['-i', f'{L}/voce.wav']
    fil += f"{prev}format=yuv420p[v]"
    ff(*ins, '-filter_complex', fil, '-map', '[v]', '-map', f'{q}:a', '-t', f'{fine}', '-r', str(FPS),
       '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart',
       f"{D}/{c['uscita']}.mp4")
    json.dump({'voce': [round(x, 3) for x in a], 'tagli': [round(x, 3) for x in tagli], 'fine': fine,
               'sottotitoli_nascosti': sorted(via)}, open(f'{D}/audio/tempi-montaggio.json', 'w'), indent=1)
    print('montato', c['uscita'], fine, 's')


if __name__ == '__main__':
    for k in sys.argv[1:]:
        monta(k)
