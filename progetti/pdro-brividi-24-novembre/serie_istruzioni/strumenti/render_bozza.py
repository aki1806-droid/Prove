#!/usr/bin/env python3
"""Monta il video MUTO di un pacchetto partendo da storyboard.json (clip, cartelli, testi, bolle).
Uso:  python3 strumenti/render_bozza.py T1_LA_PORTA_20s [--formato 9:16] [--hd]
Esce: <pacchetto>/VIDEO_muto_<formato>.mp4  -> poi si aggiungono voce, musica ed effetti (vedi CLAUDE.md)."""
import json, os, subprocess, shutil, sys
HERE=os.path.dirname(os.path.abspath(__file__)); ROOT=os.path.dirname(HERE)
FONT=os.path.join(HERE,'font','InstrumentSerif-Italic.ttf')
pk=sys.argv[1].rstrip('/'); d=os.path.join(ROOT,pk)+'/'
sb=json.load(open(d+'storyboard.json'))
fmt=sys.argv[sys.argv.index('--formato')+1] if '--formato' in sys.argv else sb['formati'][0]
hd='--hd' in sys.argv
W,H={'16:9':(1920,1080),'9:16':(1080,1920),'1:1':(1080,1080)}[fmt] if hd else {'16:9':(1280,720),'9:16':(720,1280),'1:1':(960,960)}[fmt]
tag={'16:9':'16x9','9:16':'9x16','1:1':'1x1'}[fmt]
def esc(t): return t.replace('\\','\\\\').replace(':','\\:').replace("'","’").replace('%','\\%').replace(',','\\,')
def fix(a):
    for t in ('16x9','9x16','1x1'):
        if a.startswith('cards/') and t in a and os.path.exists(d+a.replace(t,tag)): return a.replace(t,tag)
    return a
tmp=d+'.tmp_render/'; shutil.rmtree(tmp,ignore_errors=True); os.makedirs(tmp); lst=[]
for i,sc in enumerate(sb['scene']):
    dur=sc['fine_s']-sc['inizio_s']; p=d+fix(sc['asset'][0]); out=f'{tmp}s{i:02d}.mp4'
    base=f"scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H},setsar=1,fps=25"
    if p.endswith('.mp4') and '9x16' in p and W>H:
        base=f"scale={W}:{H}:force_original_aspect_ratio=decrease,pad={W}:{H}:(ow-iw)/2:(oh-ih)/2:color=black,setsar=1,fps=25"
    if p.endswith('.png') and 'nero' not in p:
        base=f"scale={W}:{H}:force_original_aspect_ratio=decrease,pad={W}:{H}:(ow-iw)/2:(oh-ih)/2,setsar=1,fps=25"
    if 'bolle_messaggio' in sb and i==0:
        for j,(t0,bl) in enumerate(zip([0,2,3.6,5,6.2,7.2,8],sb['bolle_messaggio'])):
            col='0xB21E2C' if j==6 else 'white'; fc='white' if j==6 else '0x2E1E32'
            base+=f",drawtext=fontfile={FONT}:text='{esc(bl)}':fontsize={int(min(W,H)*0.055)}:fontcolor={fc}:box=1:boxcolor={col}@0.95:boxborderw={int(min(W,H)*0.025)}:x=(w-text_w)/2:y=h*{0.12+j*0.085:.3f}:enable='gte(t,{t0})'"
    if sc.get('testo_a_schermo'):
        base+=f",drawtext=fontfile={FONT}:text='{esc(sc['testo_a_schermo'])}':fontsize={int(min(W,H)*0.07)}:fontcolor=white:shadowcolor=black@0.7:shadowx=2:shadowy=2:x=(w-text_w)/2:y=h*0.80:alpha='min(1,max(0,(t-0.3)/0.6))'"
    if p.endswith('.mp4'):
        ln=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',p])); f=max(1.0,dur/ln)
        cmd=['ffmpeg','-nostdin','-y','-v','error','-i',p,'-t',str(dur),'-vf',f"setpts={f:.3f}*PTS,"+base,'-an','-c:v','libx264','-pix_fmt','yuv420p','-preset','veryfast','-crf','20',out]
    else:
        cmd=['ffmpeg','-nostdin','-y','-v','error','-loop','1','-i',p,'-t',str(dur),'-vf',base,'-an','-c:v','libx264','-pix_fmt','yuv420p','-preset','veryfast','-crf','20',out]
    subprocess.run(cmd,check=True); lst.append(os.path.basename(out)); print('scena',i+1,'ok')
open(tmp+'l.txt','w').write('\n'.join(f"file '{x}'" for x in lst))
dst=d+f'VIDEO_muto_{tag}.mp4'
subprocess.run(['ffmpeg','-nostdin','-y','-v','error','-f','concat','-safe','0','-i',tmp+'l.txt','-c','copy',dst],check=True)
shutil.rmtree(tmp,ignore_errors=True); print('Creato',dst)
