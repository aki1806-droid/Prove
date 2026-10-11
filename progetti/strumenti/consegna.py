"""Scarica il render HeyGen con sottotitoli, crea un foglio con un fotogramma per scena e una copia
compressa 720p sotto 30 MB. Uso: consegna.py CARTELLA NOME URL_VIDEO URL_SRT CHIUSURA"""
import os, subprocess, sys
P, nome, uv, us, chiusura = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4], float(sys.argv[5])
A = lambda *x: os.path.join(P, *x)
def run(*a): subprocess.run(a, check=True)
full, srt, comp = A(nome + '_16x9_sottotitoli.mp4'), A(nome + '.srt'), A(nome + '_compresso.mp4')
run('curl', '-sSf', '-o', full, uv); run('curl', '-sSf', '-o', srt, us)
D = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', full], capture_output=True, text=True).stdout)
print('durata', D)
S = '/tmp/claude-0/-home-user-Prove/88c49a3c-ab22-5204-be86-d15ded680d66/scratchpad/' + nome
os.makedirs(S, exist_ok=True)
d = [3.0] + [float(l.split()[1]) for l in open(A('audio/durate.txt'))] + [chiusura]
t = 0
for k, x in enumerate(d):
    run('ffmpeg', '-v', 'error', '-y', '-ss', f'{t + x * 0.55:.2f}', '-i', full, '-frames:v', '1', '-vf', 'scale=480:-1', f'{S}/{k:02d}.jpg'); t += x
run('ffmpeg', '-v', 'error', '-y', '-pattern_type', 'glob', '-i', f'{S}/[0-9]*.jpg', '-vf', 'tile=5x7:padding=4', '-frames:v', '1', f'{S}/foglio.jpg')
b = int(27.8 * 8 * 1024 / D - 96)
log = f'{S}/pass'
run('ffmpeg', '-v', 'error', '-y', '-i', full, '-vf', 'scale=1280:-2', '-c:v', 'libx264', '-b:v', f'{b}k', '-pass', '1', '-passlogfile', log, '-preset', 'medium', '-an', '-f', 'mp4', '/dev/null')
run('ffmpeg', '-v', 'error', '-y', '-i', full, '-vf', 'scale=1280:-2', '-c:v', 'libx264', '-b:v', f'{b}k', '-pass', '2', '-passlogfile', log, '-preset', 'medium', '-c:a', 'aac', '-b:a', '96k', '-movflags', '+faststart', comp)
print('compresso', os.path.getsize(comp), 'foglio', f'{S}/foglio.jpg')
