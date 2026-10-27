"""Toglie la punta della bandiera che sta sopra la testa di Andrea nel webm scontornato (la foto del photo avatar ha una
bandiera dietro di lui e lo scontorno se la porta via con sé).

Fotogramma per fotogramma, nel ritaglio di Andrea: la testa comincia alla prima riga in cui la sagoma opaca è più larga di
LARGA px (la punta della bandiera è stretta, ~130-150 px); tutto quello che sta sopra quella riga diventa trasparente, con
qualche riga di sfumatura; sotto la cima si tolgono i pixel della base della bandiera (bianco acceso, bianco
in ombra azzurrino, verde saturo: i capelli sono grigi), con il bordo ammorbidito e, in tutto il fotogramma, i pezzi staccati dalla sagoma (l'asta). Esce un ProRes 4444 con alfa già ritagliato, che monta.py usa al posto del webm.

    python3 strumenti/kitlocali/pulisci_avatar.py
"""
import os, subprocess
import numpy as np
from scipy import ndimage as nd

D = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), 'pdro-kit-funzioni-locali')
X0, W, H = 500, 920, 1080            # ritaglio di Andrea nel webm 1920x1080
LARGA, SFUMA = 220, 6


def main():
    dec = subprocess.Popen(['ffmpeg', '-v', 'error', '-c:v', 'libvpx-vp9', '-i', f'{D}/avatar/avatar.webm',
                            '-vf', f'crop={W}:{H}:{X0}:0,format=rgba', '-f', 'rawvideo', '-'], stdout=subprocess.PIPE)
    enc = subprocess.Popen(['ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgba', '-s', f'{W}x{H}', '-r', '25',
                            '-i', '-', '-c:v', 'prores_ks', '-profile:v', '4444', '-pix_fmt', 'yuva444p10le',
                            f'{D}/avatar/avatar_pulito.mov'], stdin=subprocess.PIPE)
    n, cime = 0, []
    while True:
        b = dec.stdout.read(W * H * 4)
        if len(b) < W * H * 4:
            break
        f = np.frombuffer(b, np.uint8).reshape(H, W, 4).copy()
        larghe = np.where((f[..., 3] > 30).sum(1) > LARGA)[0]
        cima = int(larghe[0]) if len(larghe) else 0
        if cima > SFUMA:
            f[:cima - SFUMA, :, 3] = 0
            rampa = np.linspace(0, 1, SFUMA + 2)[1:-1, None]
            f[cima - SFUMA:cima, :, 3] = (f[cima - SFUMA:cima, :, 3] * rampa).astype(np.uint8)
        # base della bandiera appoggiata sui capelli: bianco acceso o verde saturo nelle righe sotto la cima
        z = f[max(cima - SFUMA, 0):cima + 60, :, :3].astype(int); r, g, bb = z[..., 0], z[..., 1], z[..., 2]
        bandiera = ((r + g + bb) / 3 > 200) | ((g - r > 35) & (g - bb > 10)) | ((bb - r > 25) & (bb > 165))
        bandiera = nd.binary_dilation(bandiera, iterations=3)
        zona = f[max(cima - SFUMA, 0):cima + 60, :, 3]
        zona[bandiera] = 0
        # bordo della testa ammorbidito dove si è tagliato: erosione di un pixel e sfocatura dell'alfa solo nella zona
        m = nd.binary_erosion(zona > 30, iterations=1, border_value=1)
        zona[:] = np.minimum(zona, (nd.gaussian_filter(m.astype(np.float32), 1.6) * 255).astype(np.uint8))
        # l'asta e gli altri pezzi staccati: resta solo la sagoma più grande
        lab, k = nd.label(f[..., 3] > 30)
        if k > 1:
            grande = np.argmax(np.bincount(lab.ravel())[1:]) + 1
            f[..., 3][(lab != grande) & (lab > 0)] = 0
        cime.append(cima); enc.stdin.write(f.tobytes()); n += 1
    enc.stdin.close(); enc.wait(); dec.wait()
    print('fotogrammi', n, 'cima della testa: min', min(cime), 'max', max(cime))


if __name__ == '__main__':
    main()
