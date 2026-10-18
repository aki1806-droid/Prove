"""Montaggio del promo «Kit Contratto» (video 1) con l'avatar di Achille (reel 9:16, 1080x1920, 30 fps).

Sfondi: le 6 scene mute del pacchetto (scene/sN.mp4: clip, titoli e grafiche animate già composti, logo compreso).
Ogni scena viene riadattata alla durata del suo blocco della nuova voce (audio/wav/Sxx.wav, HeyGen passante):
lo scarto è di pochi decimi, quindi basta un leggero rallentamento o accelerazione. La chiusura resta lunga
almeno quanto la grafica originale (6,5 s), con silenzio dopo la voce; l'avatar resta fermo
sull'ultimo fotogramma fino alla fine.
Avatar trasparente di Achille in basso a destra nelle scene 1 e 6, come dice il LEGGIMI del pacchetto
(nelle 3, 4, 5 le grafiche restano a tutto schermo). Nessun sottotitolo impresso: sottotitoli.srt a parte.

    python3 monta.py
"""
import json, os, subprocess

QUI = os.path.dirname(os.path.abspath(__file__))
D = os.path.join(os.path.dirname(os.path.dirname(QUI)), 'kit-contratto-promo')
FPS = 30
TEMPI = json.load(open(f'{D}/audio/tempi-scene.json'))
LAV = f'{D}/montaggio'; os.makedirs(LAV, exist_ok=True)
AV_CROP, AV_H, AV_X = (520, 0, 1100, 1080), 640, 508
MIN = {'S06': 6.5}       # la chiusura non si accorcia sotto la durata della grafica


def ff(*a):
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', *a], check=True)


def durata(p):
    return float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', p],
                                capture_output=True, text=True, check=True).stdout)


def monta():
    t0, scene = 0.0, []
    for i, t in enumerate(TEMPI, 1):
        sid = t['id']; d = max(t['durata'], MIN.get(sid, 0)); src = f'{D}/scene/s{i}.mp4'
        k = d / durata(src)
        ff('-i', src, '-i', f'{D}/audio/wav/{sid}.wav', '-filter_complex',
           f'[0:v]setpts=PTS*{k:.5f},fps={FPS},format=yuv420p[v];[1:a]apad=whole_dur={d:.3f}[a]',
           '-map', '[v]', '-map', '[a]', '-t', f'{d:.3f}', '-c:v', 'libx264', '-preset', 'medium', '-crf', '16',
           '-c:a', 'pcm_s16le', '-ar', '44100', f'{LAV}/{sid}.mov')
        scene.append((sid, t0, d)); t0 += d
    open(f'{LAV}/lista.txt', 'w').write(''.join(f"file '{LAV}/{s}.mov'\n" for s, _, _ in scene))
    ff('-f', 'concat', '-safe', '0', '-i', f'{LAV}/lista.txt', '-c', 'copy', f'{LAV}/fondo.mov')
    cx, cy, cw, ch = AV_CROP
    a1, a6 = scene[0][1], scene[5][1]

    def av(i):
        return (f"[{i}:v]fps={FPS},format=rgba,crop={cw}:{ch}:{cx}:{cy},scale=-2:{AV_H}:flags=lanczos,split[av{i}][om{i}];"
                f"[om{i}]lutrgb=r=255:g=255:b=255,boxblur=luma_radius=14:alpha_radius=14,colorchannelmixer=aa=0.55[al{i}];")
    ff('-i', f'{LAV}/fondo.mov',
       '-itsoffset', f'{a1:.3f}', '-c:v', 'libvpx-vp9', '-i', f'{D}/avatar/avatar_S01.webm',
       '-itsoffset', f'{a6:.3f}', '-c:v', 'libvpx-vp9', '-i', f'{D}/avatar/avatar_S06.webm',
       '-filter_complex', av(1) + av(2) +
       f"[0:v][al1]overlay={AV_X}:{1920 - AV_H}:eof_action=pass[b1];[b1][av1]overlay={AV_X}:{1920 - AV_H}:eof_action=pass[b2];"
       f"[b2][al2]overlay={AV_X}:{1920 - AV_H}:eof_action=repeat[b3];[b3][av2]overlay={AV_X}:{1920 - AV_H}:eof_action=repeat,format=yuv420p[v]",
       '-map', '[v]', '-map', '0:a', '-t', f'{t0:.3f}', '-r', str(FPS),
       '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-c:a', 'aac', '-b:a', '192k',
       '-movflags', '+faststart', f'{D}/KitContratto_promo_avatar_9x16.mp4')
    json.dump([{'id': s, 'inizio': round(a, 3), 'durata': round(d, 3)} for s, a, d in scene],
              open(f'{D}/audio/tempi-montaggio.json', 'w'), indent=1)
    print('montato', f'{t0:.2f} s')


if __name__ == '__main__':
    monta()
