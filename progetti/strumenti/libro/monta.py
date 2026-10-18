"""Montaggio dei reel del libro «Il Volo delle Radici» (9:16, 1080x1920, 25 fps).

    python3 monta.py reel1|reel2

Le foto del pacchetto (scene_9x16/) diventano clip HeyGen image_to_video (clip/scena_0N.mp4); la chiusura con la
copertina resta immagine con una lenta spinta in avanti. Dissolvenze di 0,5 s tra le scene, tagli sulle frasi
della voce. La voce del pacchetto (Luca Ward, eleven_v4) parte a 0,6 s come dice il COPIONE. Il testo in
sovrimpressione del pacchetto entra in dissolvenza nella sua scena; i sottotitoli (EB Garamond corsivo,
sottotitoli.mjs) sono impressi in basso, tranne dove ripeterebbero il testo già a schermo.
"""
import json, os, subprocess, sys

QUI = os.path.dirname(os.path.abspath(__file__))
PR = os.path.dirname(os.path.dirname(QUI))
FPS, X = 25, 0.5
REEL = {
    'reel1': dict(dir='libro-reel1-radici-non-catene', uscita='Reel1_Radici_non_catene_9x16',
                  tagli=[5.0, 14.0, 17.3], testo=('grafiche/testo_scena_01.png', 1), nascosti=[1, 2, 3, 12, 13]),
    'reel2': dict(dir='libro-reel2-si-pesava-giusto', uscita='Reel2_Si_pesava_giusto_9x16',
                  tagli=[5.6, 11.4, 20.5], testo=('grafiche/testo_scena_02.png', 2), nascosti=[5, 6, 12, 13]),
}
SUB_Y = 1560


def ff(*a):
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', *a], check=True)


def durata(p):
    return float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', p],
                                capture_output=True, text=True, check=True).stdout)


def monta(k):
    c = REEL[k]; D = os.path.join(PR, c['dir']); L = f'{D}/montaggio'; os.makedirs(L, exist_ok=True)
    voce = f'{D}/audio/' + next(f for f in os.listdir(f'{D}/audio') if f.endswith('.mp3'))
    fine = round(0.6 + durata(voce) + 2.6, 2)          # 2,6 s di copertina dopo l'ultima parola
    tg = c['tagli']; bordi = [0.0] + tg + [fine]
    seg = []
    for i in range(4):
        L_i = (bordi[i + 1] - bordi[i]) + (X / 2 if i > 0 else 0) + (X / 2 if i < 3 else 0)
        out = f'{L}/s{i + 1}.mp4'; n = round(L_i * FPS)
        if i < 3:
            src = f'{D}/clip/scena_0{i + 1}.mp4'; lento = max(1.0, L_i / durata(src))
            ff('-i', src, '-vf', f'setpts=PTS*{lento:.4f},fps={FPS},scale=1080:1920:force_original_aspect_ratio=increase:flags=lanczos,'
               'crop=1080:1920,format=yuv420p', '-frames:v', str(n), '-c:v', 'libx264', '-crf', '16', '-preset', 'medium', out)
        else:
            ff('-loop', '1', '-framerate', str(FPS), '-i', f'{D}/scene_9x16/scena_04_chiusura.jpg', '-vf',
               f"scale=2160:3840,zoompan=z='1+0.04*on/{n}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=1080x1920:fps={FPS},format=yuv420p",
               '-frames:v', str(n), '-c:v', 'libx264', '-crf', '16', '-preset', 'medium', out)
        seg.append(out)
    # dissolvenze
    fil, prev = '', '[0:v]'
    for i in range(1, 4):
        fil += f"{prev}[{i}:v]xfade=transition=fade:duration={X}:offset={tg[i - 1] - X / 2:.3f}[x{i}];"; prev = f'[x{i}]'
    # testo del pacchetto nella sua scena
    tpng, ts = c['testo']; t_in, t_out = bordi[ts - 1] + 0.4, bordi[ts] - 0.3
    ins = sum([['-i', s] for s in seg], []) + ['-loop', '1', '-i', f'{D}/{tpng}']
    fil += (f"[4:v]format=rgba,fade=in:st={t_in:.2f}:d=0.6:alpha=1,fade=out:st={t_out - 0.4:.2f}:d=0.4:alpha=1[tt];"
            f"{prev}[tt]overlay=0:0:shortest=1[v0];")
    prev = '[v0]'
    tutti = json.load(open(f'{L}/sub/sub.json'))
    fine_sub = {x['n']: (tutti[i + 1]['a'] if i + 1 < len(tutti) else 1e9) for i, x in enumerate(tutti)}
    subs = [s for s in tutti if s['n'] not in c['nascosti']]     # numeri dei blocchi uniti (sub.json)
    for j, s in enumerate(subs):
        ins += ['-i', f"{L}/sub/{s['n']:03d}.png"]; idx = 5 + j
        fil += f"{prev}[{idx}:v]overlay=0:{SUB_Y}:enable='between(t,{s['a']:.3f},{min(s['b'] + 0.12, fine_sub[s['n']] - 0.02):.3f})'[v{j + 1}];"; prev = f'[v{j + 1}]'
    ins += ['-i', voce]; ai = 5 + len(subs)
    fil += f"{prev}format=yuv420p[v];[{ai}:a]adelay=600|600,apad=whole_dur={fine}[a]"
    ff(*ins, '-filter_complex', fil, '-map', '[v]', '-map', '[a]', '-t', f'{fine}', '-r', str(FPS),
       '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart',
       f"{D}/{c['uscita']}.mp4")
    print('montato', c['uscita'], fine, 's')


if __name__ == '__main__':
    monta(sys.argv[1])
