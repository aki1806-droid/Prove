"""Divide il render unico dell'avatar (avatar/avatar-unico.mp4) nelle 9 scene AVATAR
secondo audio/avatar-tempi.json, e su ognuna appoggia il monogramma LPG in alto a
sinistra (grafica/logo-lpg-avatar.png), lontano dal volto. Le clip escono mute:
in HeyGen la voce arriva dalla traccia della scena."""
import json, os, subprocess
QUI = os.path.dirname(os.path.abspath(__file__))
T = json.load(open(os.path.join(QUI, 'audio/avatar-tempi.json')))
os.makedirs(os.path.join(QUI, 'avatar'), exist_ok=True)
for t in T:
    out = os.path.join(QUI, 'avatar', f"{t['id']}.mp4")
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', f"{t['inizio']:.3f}", '-i', os.path.join(QUI, 'avatar/avatar-unico.mp4'),
                    '-i', os.path.join(QUI, 'grafica/logo-lpg-avatar.png'),
                    '-filter_complex', '[0:v]fps=25,scale=1920:1080[a];[a][1:v]overlay=56:48,format=yuv420p[v]',
                    '-map', '[v]', '-an', '-t', f"{t['durata'] + 0.12:.3f}", '-c:v', 'libx264', '-crf', '18', '-preset', 'medium', out], check=True)
    print(t['id'], subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', out], capture_output=True, text=True).stdout.strip())
