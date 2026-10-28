"""Musica del reel «Kit Contratto Funzioni Locali» (v3, richiesta di Achille): solo sulla copertina (S01, 3 s) e sulla
chiusura con il QR (S11, 10 s), le due scene senza voce. Traccia del catalogo HeyGen (royalty-free, via ../heygen_api.py)
«corporate inspirational, modern, optimistic»: l'inizio sulla copertina, un tratto più avanti sulla chiusura, con
dissolvenze; volume pieno ma sotto la voce (nessuna voce sopra in quelle scene).

    python3 strumenti/kitlocali/monta.py && mv <NOME>.mp4 <NOME>_voce.mp4 && python3 strumenti/kitlocali/musica.py
"""
import json, os, subprocess, sys, urllib.parse
QUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(QUI))
from heygen_api import chiama  # noqa: E402

D = os.path.join(os.path.dirname(os.path.dirname(QUI)), 'pdro-kit-funzioni-locali')
NOME = 'PDRO_Kit_Contratto_Funzioni_Locali_9x16'
TRACCIA = ('upbeat positive corporate uplifting, confident, modern', 'e21d6bf3f9a6438a9192be6fab09941a')
VOL = 0.42   # circa -21 LUFS: un filo sotto la voce (-18,8)
COPERTINA, CHIUSURA, DA = 2.0, 6.0, 12.0  # v5: come le scene di monta.py   # durate delle scene mute e punto della traccia da cui parte la chiusura


def scarica():
    f = f'{D}/audio/musica/traccia.mp3'
    if not os.path.exists(f):
        os.makedirs(os.path.dirname(f), exist_ok=True)
        r = chiama('GET', '/v3/audio/sounds?' + urllib.parse.urlencode({'type': 'music', 'query': TRACCIA[0], 'limit': 8, 'min_score': 0.4}))
        s = next(x for x in r if x['id'] == TRACCIA[1])
        subprocess.run(['curl', '-sS', '-L', '-o', f + '.tmp', s['audio_url']], check=True)
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', f + '.tmp', '-ar', '48000', '-ac', '2', f], check=True); os.remove(f + '.tmp')
    return f


def mescola(f):
    tot = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f'{D}/{NOME}_voce.mp4'],
                               capture_output=True, text=True).stdout)
    t11 = tot - CHIUSURA; ms = round(t11 * 1000)
    fil = (f"[1:a]volume={VOL},atrim=0:{COPERTINA + 0.4},afade=t=out:st={COPERTINA - 0.8}:d=1.2[m1];"
           f"[2:a]volume={VOL},atrim={DA}:{DA + CHIUSURA},asetpts=PTS-STARTPTS,afade=t=in:d=0.8,"
           f"afade=t=out:st={CHIUSURA - 2.5}:d=2.5,adelay={ms}|{ms}[m2];"
           f"[0:a][m1][m2]amix=inputs=3:normalize=0:duration=first,alimiter=limit=0.95[a]")
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', f'{D}/{NOME}_voce.mp4', '-i', f, '-i', f, '-filter_complex', fil,
                    '-map', '0:v', '-map', '[a]', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart',
                    f'{D}/{NOME}.mp4'], check=True)
    print(f'musica su copertina (0-{COPERTINA:g} s) e chiusura', f'({t11:.1f}-{tot:.1f} s)')


if __name__ == '__main__':
    mescola(scarica())
