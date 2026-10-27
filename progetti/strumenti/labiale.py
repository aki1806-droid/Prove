"""Verifica del labiale: scarto fra la voce data all'avatar e l'audio del video avatar che torna da HeyGen, per
correlazione degli inviluppi (passi da 10 ms, ±300 ms). Deve venire 0-30 ms; oltre, il labiale è fuori sincrono.
    python3 labiale.py <voce.wav|mp3> <avatar.mp4|webm>
"""
import subprocess, sys
import numpy as np


def inviluppo(p):
    a = np.frombuffer(subprocess.run(['ffmpeg', '-v', 'error', '-i', p, '-ac', '1', '-ar', '8000', '-f', 's16le', '-'],
                                     capture_output=True).stdout, np.int16).astype(float)
    n = len(a) // 80
    return np.abs(a[:n * 80]).reshape(n, 80).mean(1)


v, a = inviluppo(sys.argv[1]), inviluppo(sys.argv[2])
n = min(len(a), len(v)); x = a[:n] - a[:n].mean(); y = v[:n] - v[:n].mean()
c = [np.dot(x[max(0, k):n + min(0, k)], y[max(0, -k):n - max(0, k)]) for k in range(-30, 31)]
print('labiale', (int(np.argmax(c)) - 30) * 10, 'ms', f'(voce {len(v) / 100:.1f} s, avatar {len(a) / 100:.1f} s)')
