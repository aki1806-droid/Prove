"""Montaggio dei video YouTube dell'autore (16:9, 1920x1080, 25 fps).

    python3 monta.py [yt10|yt11|yt12 ...]

Copertina del pacchetto 3 s muta, poi le scene del COPIONE sulla voce (audio/wav/Sxx.wav, voci.py), poi la
chiusura 10 s muta (grafiche/chiusura_1920x1080.png, chiusura.mjs). Scene «AVATAR»: Aki a inquadratura piena,
tagliato dal video avatar fatto su audio/voce-avatar.mp3 (le sole scene avatar in fila, tempi-avatar.json).
Scene «B-ROLL»: la foto del pacchetto a schermo intero con uno zoom lento, alternando avanti e indietro; le bande
nere che alcune foto hanno ai lati si tolgono prima (dal 19: il clip HeyGen in movimento, vedi MOVIMENTO). Tagli netti. Sottotitoli a parte (sottotitoli.srt, dalla
voce, spostati di 3 s per la copertina): YouTube li mostra attivabili.
"""
import json, os, re, subprocess, sys
import numpy as np
from PIL import Image

QUI = os.path.dirname(os.path.abspath(__file__))
PR = os.path.dirname(os.path.dirname(QUI))
FPS, COP, FINE = 25, 3.0, 10.0
PROGETTI = {'yt19': 'libro-yt19-silenzio', 'yt20': 'libro-yt20-emozioni', 'yt17': 'libro-yt17-leggo-per-te-2-valori', 'yt18': 'libro-yt18-quindici-minuti', 'yt09': 'libro-yt09-due-nonni', 'yt10': 'libro-yt10-leggo-per-te-1', 'yt11': 'libro-yt11-momento-di-svolta', 'yt12': 'libro-yt12-mappe-silenziose'}
USCITA = {'yt19': 'YT19_Leggo_per_te_Il_silenzio', 'yt20': 'YT20_Leggo_per_te_Gestire_le_emozioni', 'yt17': 'YT17_Leggo_per_te_Valori_guida', 'yt18': 'YT18_Quindici_minuti_al_giorno', 'yt09': 'YT09_Due_nonni_il_mare_e_la_terra', 'yt10': 'YT10_Leggo_per_te_Insegnamenti_fondamentali', 'yt11': 'YT11_Il_momento_di_svolta',
          'yt12': 'YT12_Cosa_sono_le_mappe_silenziose'}
ZOOM = 0.06         # quanto cresce (o cala) l'inquadratura delle foto in una scena
MOVIMENTO = {'yt19', 'yt20'}   # b-roll col clip HeyGen in movimento (clip/broll_0N.mp4) invece della foto con lo zoom


def durata(p):
    return float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', p],
                                capture_output=True, text=True, check=True).stdout)


def clip(src, wav, d, out):
    """Clip b-roll a schermo intero per tutta la scena: se è più corto della voce si rallenta (fino a ~1,7 volte),
    con fotogrammi intermedi interpolati perché il movimento resti fluido."""
    f = max(1.0, (d + 0.1) / durata(src))
    lento = f'setpts={f:.4f}*PTS,minterpolate=fps={FPS}:mi_mode=mci:mc_mode=aobmc:me_mode=bidir,' if f > 1.02 else ''
    ff('-i', src, '-i', wav, '-filter_complex',
       f'[0:v]{lento}fps={FPS},scale=1920:1080:force_original_aspect_ratio=increase:flags=lanczos,crop=1920:1080,'
       f'format=yuv420p[v]', '-map', '[v]', '-map', '1:a', '-t', f'{d:.3f}', '-c:v', 'libx264', '-crf', '16',
       '-preset', 'medium', '-c:a', 'pcm_s16le', out)


def ff(*a):
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', *a], check=True)


def senza_bande(src, dst):
    """Toglie le bande nere ai bordi: righe e colonne quasi nere E uniformi (le foto notturne hanno bordi
    scuri ma non uniformi, e restano intere)."""
    im = Image.open(src).convert('RGB'); a = np.asarray(im).astype(np.float32).mean(2)
    col = np.where(~((a.mean(0) < 6) & (a.std(0) < 4)))[0]; riga = np.where(~((a.mean(1) < 6) & (a.std(1) < 4)))[0]
    im.crop((col[0], riga[0], col[-1] + 1, riga[-1] + 1)).save(dst, quality=95)


def ferma(img, d, out):
    """Immagine ferma con silenzio (copertina e chiusura)."""
    ff('-loop', '1', '-framerate', str(FPS), '-i', img, '-f', 'lavfi', '-i', 'anullsrc=r=44100:cl=mono', '-vf',
       'scale=1920:1080:force_original_aspect_ratio=increase:flags=lanczos,crop=1920:1080,format=yuv420p',
       '-t', f'{d:.3f}', '-c:v', 'libx264', '-crf', '16', '-preset', 'medium', '-c:a', 'pcm_s16le', out)


def monta(k):
    D = os.path.join(PR, PROGETTI[k]); L = f'{D}/montaggio'; os.makedirs(L, exist_ok=True)
    scene = json.load(open(f'{D}/scene.json'))
    tempi = {t['id']: t for t in json.load(open(f'{D}/audio/tempi-scene.json'))}
    tav = {t['id']: t for t in json.load(open(f'{D}/audio/tempi-avatar.json'))}
    avatar = f'{D}/avatar/avatar.mp4'
    pezzi = [f'{L}/00_copertina.mov']
    ferma(f'{D}/copertina_youtube_1280x720.jpg', COP, pezzi[0])
    nb = 0
    for s in scene:
        sid = s['id']; d = tempi[sid]['durata']; out = f'{L}/{sid}.mov'; wav = f'{D}/audio/wav/{sid}.wav'
        if s['tipo'] == 'avatar':
            a0 = tav[sid]['inizio']
            ff('-ss', f'{a0:.3f}', '-i', avatar, '-i', wav, '-map', '0:v', '-map', '1:a', '-t', f'{d:.3f}', '-vf',
               f'fps={FPS},scale=1920:1080:flags=lanczos,format=yuv420p', '-c:v', 'libx264', '-crf', '16',
               '-preset', 'medium', '-c:a', 'pcm_s16le', out)
        elif k in MOVIMENTO:
            clip(f"{D}/clip/{s['broll'].replace('.jpg', '.mp4')}", wav, d, out)
        else:
            foto = f'{L}/{sid}_foto.jpg'; senza_bande(f"{D}/b-roll_16x9/{s['broll']}", foto)
            n = round(d * FPS) + 1
            z = f"1+{ZOOM}*on/{n}" if nb % 2 == 0 else f"{1 + ZOOM}-{ZOOM}*on/{n}"; nb += 1
            ff('-loop', '1', '-framerate', str(FPS), '-i', foto, '-i', wav, '-filter_complex',
               f"[0:v]scale=3840:2160:force_original_aspect_ratio=increase:flags=lanczos,crop=3840:2160,"
               f"zoompan=z='{z}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=1920x1080:fps={FPS},format=yuv420p[v]",
               '-map', '[v]', '-map', '1:a', '-t', f'{d:.3f}', '-c:v', 'libx264', '-crf', '16', '-preset', 'medium',
               '-c:a', 'pcm_s16le', out)
        pezzi.append(out)
    pezzi.append(f'{L}/99_chiusura.mov'); ferma(f'{D}/grafiche/chiusura_1920x1080.png', FINE, pezzi[-1])
    open(f'{L}/lista.txt', 'w').write(''.join(f"file '{p}'\n" for p in pezzi))
    # CRF 19 alla fine: con i pezzi a CRF 16 copiati il 10 passava i 200 MB, limite degli asset HeyGen
    ff('-f', 'concat', '-safe', '0', '-i', f'{L}/lista.txt', '-c:v', 'libx264', '-preset', 'slow', '-crf', '19',
       '-c:a', 'aac', '-b:a', '192k',
       '-movflags', '+faststart', f'{D}/{USCITA[k]}.mp4')
    # sottotitoli: quelli della voce, spostati della copertina
    subprocess.run([sys.executable, os.path.join(PR, 'strumenti', 'chicedomani', 'sottotitoli.py'), PROGETTI[k]], check=True,
                   capture_output=True)

    def sposta(m):
        h, mi, s, ms = map(int, m.groups()); t = h * 3600000 + mi * 60000 + s * 1000 + ms + int(COP * 1000)
        return f'{t // 3600000:02d}:{t // 60000 % 60:02d}:{t // 1000 % 60:02d},{t % 1000:03d}'
    srt = open(f'{D}/sottotitoli.srt').read()
    open(f'{D}/sottotitoli.srt', 'w').write(re.sub(r'(\d\d):(\d\d):(\d\d),(\d\d\d)', sposta, srt))
    tot = COP + sum(t['durata'] for t in tempi.values()) + FINE
    print('montato', USCITA[k], f'{tot:.1f} s')


if __name__ == '__main__':
    for k in sys.argv[1:] or PROGETTI:
        monta(k)
