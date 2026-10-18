"""Montaggio del booktrailer «Il Volo delle Radici», in 16:9 (1920x1080) e 9:16 (1080x1920), 25 fps.

    python3 trailer.py 16x9|9x16

Come i reel (monta.py): le 8 foto del pacchetto diventano clip HeyGen image_to_video (clip/scena_0N.mp4), la
chiusura con la copertina resta immagine con una lenta spinta in avanti. Dissolvenze di 0,5 s, tagli nelle pause
fra le frasi della voce (Luca Ward, del pacchetto, parte a 0,6 s). I tre testi del pacchetto (scene 3, 7, 8)
entrano in dissolvenza con la frase che dicono; i sottotitoli impressi (sottotitoli.mjs) tacciono dove
ripeterebbero il testo a schermo o la grafica di chiusura. Sotto testi e sottotitoli una sfumatura scura leggera
(montaggio/velo.png), solo sulle clip, e un alone scuro morbido sotto ogni testo del pacchetto (montaggio/testo_0N.png,
la grafica resta quella): sul cielo chiaro delle rondini altrimenti non si leggono.
"""
import json, os, subprocess, sys
import numpy as np
from PIL import Image
from scipy import ndimage as nd

QUI = os.path.dirname(os.path.abspath(__file__))
PR = os.path.dirname(os.path.dirname(QUI))
FPS, X = 25, 0.5
TAGLI = [5.43, 9.72, 15.9, 19.04, 25.5, 31.72, 36.12, 41.0]       # nelle pause dello SRT
TESTI = [(3, 12.6), (7, 33.25), (8, 36.2)]                        # scena, entrata (con la frase)
NASCOSTI = [8, 9, 21, 23, 26, 27]                                 # numeri dei blocchi uniti (sub.json)
FORMATI = {
    '16x9': dict(W=1920, H=1080, sub_y=820, uscita='Booktrailer_Il_Volo_delle_Radici_16x9'),
    '9x16': dict(W=1080, H=1920, sub_y=1560, uscita='Booktrailer_Il_Volo_delle_Radici_9x16'),
}


def ff(*a):
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', *a], check=True)


def durata(p):
    return float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', p],
                                capture_output=True, text=True, check=True).stdout)


def monta(fmt):
    c = FORMATI[fmt]; W, H = c['W'], c['H']
    D = os.path.join(PR, f'libro-booktrailer-{fmt}'); L = f'{D}/montaggio'; os.makedirs(L, exist_ok=True)
    voce = f'{D}/audio/voce_trailer_completa.mp3'
    fine = round(0.6 + durata(voce) + 2.6, 2)
    bordi = [0.0] + TAGLI + [fine]; N = len(bordi) - 1
    seg = []
    for i in range(N):
        L_i = (bordi[i + 1] - bordi[i]) + (X / 2 if i > 0 else 0) + (X / 2 if i < N - 1 else 0)
        out = f'{L}/s{i + 1}.mp4'; n = round(L_i * FPS)
        if i < N - 1:
            src = f'{D}/clip/scena_0{i + 1}.mp4'; lento = max(1.0, L_i / durata(src))
            ff('-i', src, '-vf', f'setpts=PTS*{lento:.4f},fps={FPS},scale={W}:{H}:force_original_aspect_ratio=increase:flags=lanczos,'
               f'crop={W}:{H},format=yuv420p', '-frames:v', str(n), '-c:v', 'libx264', '-crf', '16', '-preset', 'medium', out)
        else:
            ff('-loop', '1', '-framerate', str(FPS), '-i', f'{D}/grafiche/chiusura_{fmt}.jpg', '-vf',
               f"scale={2 * W}:{2 * H},zoompan=z='1+0.04*on/{n}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s={W}x{H}:fps={FPS},format=yuv420p",
               '-frames:v', str(n), '-c:v', 'libx264', '-crf', '16', '-preset', 'medium', out)
        seg.append(out)
    fil, prev = '', '[0:v]'
    for i in range(1, N):
        fil += f"{prev}[{i}:v]xfade=transition=fade:duration={X}:offset={TAGLI[i - 1] - X / 2:.3f}[x{i}];"; prev = f'[x{i}]'
    a = np.clip((np.linspace(0, 1, H) - 0.5) / 0.5, 0, 1) ** 1.6 * 0.6 * 255
    velo = np.zeros((H, W, 4), np.uint8); velo[..., 3] = a[:, None].astype(np.uint8)
    Image.fromarray(velo, 'RGBA').save(f'{L}/velo.png')
    ins = sum([['-i', s] for s in seg], []) + ['-loop', '1', '-i', f'{L}/velo.png']; k = N + 1
    fil += (f"[{N}:v]format=rgba,fade=out:st={TAGLI[-1] - X / 2:.2f}:d={X}:alpha=1[velo];"
            f"{prev}[velo]overlay=0:0:shortest=1[vv];"); prev = '[vv]'
    for j, (sc, t_in) in enumerate(TESTI):
        t_out = bordi[sc] - 0.3
        T = np.asarray(Image.open(f'{D}/grafiche/testo_scena_0{sc}_{fmt}.png').convert('RGBA')).astype(np.float32) / 255
        ab = np.clip(nd.gaussian_filter(T[..., 3], 22) * 2.2, 0, 1) * 0.7; at = T[..., 3]
        ao = at + ab * (1 - at); rgb = T[..., :3] * at[..., None] / np.maximum(ao, 1e-4)[..., None]
        Image.fromarray((np.dstack([rgb, ao]) * 255).astype(np.uint8), 'RGBA').save(f'{L}/testo_0{sc}.png')
        ins += ['-loop', '1', '-i', f'{L}/testo_0{sc}.png']
        fil += (f"[{k}:v]format=rgba,fade=in:st={t_in:.2f}:d=0.6:alpha=1,fade=out:st={t_out - 0.4:.2f}:d=0.4:alpha=1[t{j}];"
                f"{prev}[t{j}]overlay=0:0:shortest=1[w{j}];"); prev = f'[w{j}]'; k += 1
    tutti = json.load(open(f'{L}/sub/sub.json'))
    fine_sub = {x['n']: (tutti[i + 1]['a'] if i + 1 < len(tutti) else 1e9) for i, x in enumerate(tutti)}
    for j, s in enumerate([s for s in tutti if s['n'] not in NASCOSTI]):
        ins += ['-i', f"{L}/sub/{s['n']:03d}.png"]
        fil += f"{prev}[{k}:v]overlay=0:{c['sub_y']}:enable='between(t,{s['a']:.3f},{min(s['b'] + 0.12, fine_sub[s['n']] - 0.02):.3f})'[v{j}];"
        prev = f'[v{j}]'; k += 1
    ins += ['-i', voce]
    fil += f"{prev}format=yuv420p[v];[{k}:a]adelay=600|600,apad=whole_dur={fine}[a]"
    ff(*ins, '-filter_complex', fil, '-map', '[v]', '-map', '[a]', '-t', f'{fine}', '-r', str(FPS),
       '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart',
       f"{D}/{c['uscita']}.mp4")
    print('montato', c['uscita'], fine, 's')


if __name__ == '__main__':
    monta(sys.argv[1])
