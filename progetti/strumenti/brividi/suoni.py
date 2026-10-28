"""Effetti e pianoforte dei trailer «Brividi», dal catalogo HeyGen (GET /v3/audio/sounds, royalty-free, via ../heygen_api.py;
scelta di Achille: «Effetti e pianoforte dal catalogo»). Quello che il catalogo non ha (vibrazione del telefono, fruscio del
filo) si sintetizza con ffmpeg. Tutto in pdro-brividi-24-novembre/audio/sfx/ (fuori da git).

    python3 strumenti/brividi/suoni.py
"""
import os, subprocess, sys, urllib.parse
QUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(QUI))
from heygen_api import chiama  # noqa: E402

S = os.path.join(os.path.dirname(os.path.dirname(QUI)), 'pdro-brividi-24-novembre', 'audio', 'sfx')
# nome: (tipo, ricerca, id nel catalogo)
CAT = {'orologio': ('sound_effects', 'clock ticking quiet room', 'b9cac060b3e46925'),
       'battito': ('sound_effects', 'heartbeat slow', 'ad9bfd6ef4ab8bdc'),
       'fiammifero': ('sound_effects', 'lighter flick fire', 'efa8930a198201f4'),
       'ronzio': ('sound_effects', 'hospital corridor night ambience', 'f36cf186798d8d4c'),
       'monitor': ('sound_effects', 'heart monitor beep', '1d639bb7221af440'),
       'uccelli': ('sound_effects', 'room tone morning birds', '1504abbcf042b8ef'),
       'p_porta': ('music', 'piano chord sustain', '2bfa472e1eae47c68cdb3872ed10021a'),
       'p_dovesei': ('music', 'sad solo piano minor', 'ca12c766cacf463493174136231bca93'),
       'p_dovesei2': ('music', 'hopeful piano', 'e65a0ef4e3824e33b5de2144ac1c7e43'),
       'p_nodo': ('music', 'piano chord sustain', '19df3cfe5bdf43b28345c1ca8c04a02d'),
       'p_nodo2': ('music', 'sad solo piano minor', '305ad528ef874d249b52ea31811fe33a'),
       'p_cura': ('music', 'piano chord sustain', 'd80ba44849874f5787bbb4f13991f2df'),
       'p_cura2': ('music', 'emotional piano cello', '42203bd929d14b17b0031cca5a9f9540'),
       'p_luce': ('music', 'hopeful piano', 'aa842465e72042488a3b82bc1e6e0d36'),
       'p_luce2': ('music', 'hopeful piano', 'bccebdff431e4b019ed3809bb0adac7c')}


def ff(*a):
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', *a], check=True)


def scarica():
    os.makedirs(S, exist_ok=True)
    for nome, (tipo, q, sid) in CAT.items():
        if os.path.exists(f'{S}/{nome}.wav'):
            continue
        d = chiama('GET', '/v3/audio/sounds?' + urllib.parse.urlencode({'type': tipo, 'query': q, 'limit': 10, 'min_score': 0.4}))
        r = next(x for x in (d if isinstance(d, list) else d.get('sounds') or []) if x['id'] == sid)
        subprocess.run(['curl', '-sS', '-L', '-o', f'{S}/{nome}.tmp', r['audio_url']], check=True)
        ff('-i', f'{S}/{nome}.tmp', '-ar', '48000', '-ac', '2', f'{S}/{nome}.wav'); os.remove(f'{S}/{nome}.tmp')
        print(nome, r['name'], r['duration'], r.get('description', ''))
    # vibrazione del telefono: 0,4 s di ronzio a 160 Hz con armoniche, modulato a 22 Hz, attacco e coda morbidi
    ff('-f', 'lavfi', '-i', "aevalsrc='(0.6*sin(2*PI*160*t)+0.3*sin(2*PI*320*t)+0.12*sin(2*PI*480*t))*(0.6+0.4*sin(2*PI*22*t))"
       "*min(1,t/0.03)*min(1,(0.4-t)/0.06)':s=48000:d=0.4", '-af', 'lowpass=f=1800,aformat=channel_layouts=stereo', f'{S}/vibrazione.wav')
    # fruscio del filo: rumore rosa filtrato, a respiri lenti e irregolari
    ff('-f', 'lavfi', '-i', 'anoisesrc=c=pink:r=48000:a=0.5:d=10', '-af',
       "highpass=f=1800,lowpass=f=7000,volume='0.35+0.65*abs(sin(2*PI*0.7*t)*sin(2*PI*0.23*t+1))':eval=frame,"
       'aformat=channel_layouts=stereo', f'{S}/fruscio.wav')
    # respiro (inspirazione lenta): rumore bianco filtrato sulla banda dell'aria, inviluppo che sale e si spegne in 1,1 s
    ff('-f', 'lavfi', '-i', 'anoisesrc=c=white:r=48000:a=0.4:d=1.1', '-af',
       "bandpass=f=1300:width_type=h:w=1800,lowpass=f=3500,volume='pow(sin(PI*min(1,t/1.1)),1.6)*(0.6+0.4*t/1.1)':eval=frame,"
       'aformat=channel_layouts=stereo', f'{S}/respiro.wav')


if __name__ == '__main__':
    scarica()
