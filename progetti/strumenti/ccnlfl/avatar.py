"""Avatar di Andrea Ricci per la serie «CCNL Funzioni Locali»: la voce di tutto il video in fila (le sette scene di
voci.py con PAUSA s fra l'una e l'altra, ATTACCO s in testa e CODA s di silenzio in fondo, così l'avatar non si ferma
sulla chiusura), un solo render HeyGen via API in webm con alfa (photo avatar ANDREA RICCI 20b42026236c4145a4c3cdb6a7cdb9ae,
lo stesso look del Kit), poi ../kitlocali/pulisci_avatar.py toglie la bandiera dietro la testa.
Scrive audio/voce-video.wav, audio/tempi-video.json ({scena: [inizio, fine] della voce}) e avatar/avatar_pulito.webm (VP9 con alfa).

    python3 strumenti/ccnlfl/avatar.py 01 [02 ...]
"""
import json, os, subprocess, sys
QUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(QUI))
import heygen_api as hg  # noqa: E402
from voci import cartella  # noqa: E402

LOOK = '20b42026236c4145a4c3cdb6a7cdb9ae'
ATTACCO, PAUSA, CODA = 0.3, 0.3, 2.5


def ff(*a):
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', *a], check=True)


def traccia(n):
    A = f'{cartella(n)}/audio'; tempi = json.load(open(f'{A}/tempi-scene.json'))
    t, pos, ins, fil = ATTACCO, {}, [], []
    for k, s in enumerate(tempi):
        pos[s['id']] = [round(t, 3), round(t + s['durata'], 3)]
        ins += ['-i', f"{A}/wav/{s['id']}.wav"]
        fil.append(f"[{k}:a]aresample=48000,adelay={round(t * 1000)}:all=1[a{k}]"); t += s['durata'] + PAUSA
    tot = t - PAUSA + CODA
    fil.append(''.join(f'[a{k}]' for k in range(len(tempi))) + f'amix=inputs={len(tempi)}:normalize=0,apad=whole_dur={tot},atrim=0:{tot}[o]')
    ff(*ins, '-filter_complex', ';'.join(fil), '-map', '[o]', '-ac', '1', f'{A}/voce-video.wav')
    ff('-i', f'{A}/voce-video.wav', '-b:a', '192k', f'{A}/voce-video.mp3')
    json.dump({'durata': round(tot, 3), 'scene': pos}, open(f'{A}/tempi-video.json', 'w'), indent=1)
    print(n, f'{tot:.1f} s')
    return f'{A}/voce-video.mp3'


if __name__ == '__main__':
    for n in sys.argv[1:]:
        AV = f'{cartella(n)}/avatar'; os.makedirs(AV, exist_ok=True)
        if os.path.exists(f'{AV}/video_id.txt'):          # render già chiesto: si riprende da lì
            vid = open(f'{AV}/video_id.txt').read().strip()
        else:
            vid = hg.avatar(LOOK, hg.asset(traccia(n)), True, f'CCNL FL {n} - Andrea')
            open(f'{AV}/video_id.txt', 'w').write(vid)
        if not os.path.exists(f'{AV}/avatar.webm'):
            hg.scarica(vid, f'{AV}/avatar.webm')
        subprocess.run([sys.executable, f'{os.path.dirname(QUI)}/kitlocali/pulisci_avatar.py', AV, 'webm'], check=True)
