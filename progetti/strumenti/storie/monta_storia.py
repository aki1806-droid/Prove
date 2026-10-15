"""Montaggio di una delle tre storie PDRO (reel 9:16, 1080x1920, 25 fps).

    python3 monta_storia.py <cartella progetto> <NOME_USCITA>

Scene dal blocchi.json del pacchetto:
  ILLUSTRAZIONE ANIMATA  clip/Sxx.mp4 (image-to-video HeyGen dall'illustrazione) adattata a 1080x1920,
                         rallentata alla durata della voce, con sopra overlay_clip/SxxA.png
  GRAFICA                grafiche/SxxA.png con lenta spinta in avanti; SxxB in dissolvenza sulla frase
                         indicata (audio/cambi-B.json)
  GRAFICA + AVATAR       come GRAFICA, e sopra l'avatar trasparente di Achille in basso a destra
Logo CISL FP Padova Rovigo in alto a sinistra in tutte le scene; nelle scene con bande nere
(le illustrazioni) appena sotto la banda. Nessun sottotitolo impresso: le grafiche sono già piene
di testo; l'SRT va a parte.
"""
import json, os, subprocess, sys

D = os.path.abspath(sys.argv[1]); NOME = sys.argv[2]
FPS, DISS = 25, 0.35
TEMPI = json.load(open(f'{D}/audio/tempi-scene.json'))
BL = {f"S{s['n']:02d}": s for s in json.load(open(f'{D}/blocchi.json'))['scene']}
CAMBI = json.load(open(f'{D}/audio/cambi-B.json')) if os.path.exists(f'{D}/audio/cambi-B.json') else {}
LAV = f'{D}/montaggio'; os.makedirs(LAV, exist_ok=True)
AV_CROP, AV_H, AV_X = (520, 0, 1100, 1080), 640, 508
LOGO_Y = {'alto': 52, 'banda': 132}


def ff(*a):
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', *a], check=True)


def durata(p):
    return float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', p],
                                capture_output=True, text=True, check=True).stdout)


def scena(t):
    sid, d = t['id'], t['durata']; b = BL[sid]
    out, n = f'{LAV}/{sid}.mp4', round(d * FPS)
    gr = [g['file'] for g in b['grafiche']]
    if b['tipo'].startswith('ILLUSTRAZIONE'):
        c = f'{D}/clip/{sid}.mp4'; lento = d / durata(c)
        ff('-i', c, '-loop', '1', '-i', f'{D}/{gr[0]}', '-filter_complex',
           f"[0:v]setpts=PTS*{max(1.0, lento):.4f},"
           f"{'minterpolate=fps=25:mi_mode=blend,' if lento > 1 else 'fps=25,'}"
           f"scale=1080:1920:force_original_aspect_ratio=increase:flags=lanczos,crop=1080:1920[c];"
           f"[c][1:v]overlay=0:0,format=yuv420p[v]",
           '-map', '[v]', '-frames:v', str(n), '-r', str(FPS), '-c:v', 'libx264', '-preset', 'medium', '-crf', '17', out)
        return 'banda'
    zp = f"scale=2160:3840,zoompan=z='1+0.03*on/{n}':x='iw/2-(iw/zoom/2)':y='0':d=1:s=1080x1920:fps={FPS}"
    if len(gr) > 1:
        tb = CAMBI[sid]
        ff('-loop', '1', '-framerate', str(FPS), '-i', f'{D}/{gr[0]}', '-loop', '1', '-framerate', str(FPS), '-i', f'{D}/{gr[1]}',
           '-filter_complex', f"[0:v]{zp}[a];[1:v]{zp},format=rgba,fade=in:st={tb:.3f}:d={DISS}:alpha=1[b];"
                              f"[a][b]overlay=0:0,format=yuv420p[v]",
           '-map', '[v]', '-frames:v', str(n), '-c:v', 'libx264', '-preset', 'medium', '-crf', '17', out)
    else:
        ff('-loop', '1', '-framerate', str(FPS), '-i', f'{D}/{gr[0]}', '-vf', f'{zp},format=yuv420p',
           '-frames:v', str(n), '-c:v', 'libx264', '-preset', 'medium', '-crf', '17', out)
    return 'alto'


def logo():
    """Logo su pastiglia bianca come negli altri reel PDRO (stessa resa di grafica/strati.mjs)."""
    p = f'{LAV}/logo.png'
    if not os.path.exists(p):
        subprocess.run(['node', '-e', f"""
const {{chromium}}=require('{D}/node_modules/playwright');const fs=require('fs');
(async()=>{{const b=await chromium.launch({{executablePath:'/opt/pw-browsers/chromium'}}).catch(()=>chromium.launch());
const pg=await b.newPage({{viewport:{{width:1080,height:400}}}});
const img=fs.readFileSync('{D}/grafica/marchio/logo.png').toString('base64');
await pg.setContent(`<html><body style="margin:0;background:transparent"><div style="position:absolute;left:44px;top:0;background:#fff;border-radius:22px;padding:14px 22px;box-shadow:0 6px 24px rgba(0,0,0,.25)"><img src="data:image/png;base64,${{img}}" style="display:block;height:96px"></div></body></html>`);
await pg.screenshot({{path:'{p}',omitBackground:true,clip:{{x:0,y:0,width:1080,height:160}}}});await b.close();}})();
"""], check=True)
    return p


def monta():
    pos = [scena(t) for t in TEMPI]
    open(f'{LAV}/lista.txt', 'w').write(''.join(f"file '{LAV}/{t['id']}.mp4'\n" for t in TEMPI))
    ff('-f', 'concat', '-safe', '0', '-i', f'{LAV}/lista.txt', '-c', 'copy', f'{LAV}/fondo.mp4')
    dur = sum(t['durata'] for t in TEMPI)
    fin = TEMPI[-1]
    # logo: due copie, una per posizione, accese scena per scena
    en = {k: '+'.join(f"between(t,{t['inizio']:.3f},{t['inizio'] + t['durata']:.3f})"
                      for t, p in zip(TEMPI, pos) if p == k) or '0' for k in LOGO_Y}
    cx, cy, cw, ch = AV_CROP
    ff('-i', f'{LAV}/fondo.mp4', '-loop', '1', '-i', logo(),
       '-itsoffset', f"{fin['inizio']:.3f}", '-c:v', 'libvpx-vp9', '-i', f'{D}/avatar/avatar.webm',
       '-i', f'{D}/audio/voce-completa.wav', '-filter_complex',
       f"[1:v]split[l1][l2];"
       f"[0:v][l1]overlay=0:{LOGO_Y['alto']}:shortest=1:enable='{en['alto']}'[a];"
       f"[a][l2]overlay=0:{LOGO_Y['banda']}:enable='{en['banda']}'[a1];"
       f"[2:v]fps={FPS},format=rgba,crop={cw}:{ch}:{cx}:{cy},scale=-2:{AV_H}:flags=lanczos,split[av][om];"
       f"[om]lutrgb=r=255:g=255:b=255,boxblur=luma_radius=14:alpha_radius=14,colorchannelmixer=aa=0.55[al];"
       f"[a1][al]overlay={AV_X}:{1920 - AV_H}:eof_action=pass[a2];"
       f"[a2][av]overlay={AV_X}:{1920 - AV_H}:eof_action=pass,format=yuv420p[v]",
       '-map', '[v]', '-map', '3:a', '-t', f'{dur:.3f}', '-r', str(FPS),
       '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-c:a', 'aac', '-b:a', '192k',
       '-movflags', '+faststart', f'{D}/{NOME}.mp4')
    print('montato', NOME, f'{dur:.2f} s')


if __name__ == '__main__':
    monta()
