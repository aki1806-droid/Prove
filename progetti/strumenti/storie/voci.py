"""Voci delle tre storie (HeyGen create_speech, motore ElevenLabs eleven_v4).

Per ogni storia una traccia «Luca Ward» con i blocchi uniti da <break time="1.6s"/>, e una traccia
«Achille nuovo 1» con le tre chiusure. Si taglia a metà di ogni pausa di confine (posizioni prese dai
word_timestamps di HeyGen), poi per blocco:
  narratore  silenceremove (pause oltre 0,6 s ridotte a 0,45 s), velocità naturale
  navigatore come sopra + effetto vecchio altoparlante del pacchetto
  spot       come narratore; la scena «Avvertenze» con atempo 1,25 (come chiede il pacchetto)
  achille    silenceremove (0,45→0,35) + atempo 1,16 (regola CLAUDE.md per la voce passata da HeyGen)
Scrive in ogni progetto audio/wav/Sxx.wav, audio/finali/Sxx.mp3, audio/tempi-scene.json, voce-completa.wav/mp3.
"""
import json, os, subprocess

QUI = os.path.dirname(os.path.abspath(__file__))
PR = os.path.dirname(os.path.dirname(QUI))
NAV = 'highpass=f=300,lowpass=f=3400,acrusher=bits=8:mix=0.25,aecho=0.6:0.3:30:0.2'
NARR = ('silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.1:stop_periods=-1:'
        'stop_duration=0.6:stop_threshold=-50dB:stop_silence=0.45')
ACH = ('silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.1:stop_periods=-1:'
       'stop_duration=0.45:stop_threshold=-50dB:stop_silence=0.35,atempo=1.16')
CODA = 'apad=pad_dur=0.35'

STORIE = {
    'pdro-storia1-navigatore': dict(pause=[(13.04, 14.64), (19.383, 20.983), (31.794, 33.394), (38.457, 40.057), (53.737, 55.337)],
                                    tipi=['narratore', 'navigatore', 'narratore', 'navigatore', 'narratore', 'narratore']),
    'pdro-storia2-faro': dict(pause=[(14.24, 15.84), (24.811, 26.411), (35.851, 37.451), (50.891, 52.491)],
                              tipi=['narratore'] * 5),
    'pdro-storia3-io-io-io': dict(pause=[(10.88, 12.48), (24.983, 26.583), (38.692, 40.292), (45.206, 46.806)],
                                  tipi=['spot', 'spot', 'avvertenze', 'narratore', 'narratore']),
}
ACH_PAUSE = [(20.24, 21.84), (43.623, 45.223)]


def ff(*a):
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', *a], check=True)


def dur(p):
    return float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', p],
                                capture_output=True, text=True, check=True).stdout)


def tagli(pause, tot):
    c = [0.0] + [(a + b) / 2 for a, b in pause] + [tot]
    return list(zip(c[:-1], c[1:]))


ach_src = os.path.join(QUI, 'achille-tre-chiusure-grezzo.mp3')
ach = tagli(ACH_PAUSE, dur(ach_src))
for k, (nome, st) in enumerate(STORIE.items()):
    d = os.path.join(PR, nome, 'audio')
    os.makedirs(f'{d}/wav', exist_ok=True); os.makedirs(f'{d}/finali', exist_ok=True)
    src = f'{d}/ward-grezzo.mp3'
    pezzi = [(src, a, b, t) for (a, b), t in zip(tagli(st['pause'], dur(src)), st['tipi'])]
    pezzi.append((ach_src, *ach[k], 'achille'))
    tempi, t0 = [], 0.0
    for i, (s, a, b, tipo) in enumerate(pezzi, 1):
        sid = f'S{i:02d}'
        f = {'narratore': NARR, 'spot': NARR, 'navigatore': NARR + ',' + NAV,
             'avvertenze': NARR + ',atempo=1.25', 'achille': ACH}[tipo] + ',' + CODA
        w = f'{d}/wav/{sid}.wav'
        ff('-ss', f'{a:.3f}', '-to', f'{b:.3f}', '-i', s, '-af', f, '-ar', '44100', '-ac', '1', w)
        ff('-i', w, '-c:a', 'libmp3lame', '-b:a', '192k', '-id3v2_version', '3', f'{d}/finali/{sid}.mp3')
        tempi.append({'id': sid, 'tipo': tipo, 'inizio': round(t0, 4), 'durata': round(dur(w), 4)}); t0 += dur(w)
    json.dump(tempi, open(f'{d}/tempi-scene.json', 'w'), indent=1)
    open(f'{d}/lista.txt', 'w').write(''.join(f"file 'wav/{t['id']}.wav'\n" for t in tempi))
    ff('-f', 'concat', '-safe', '0', '-i', f'{d}/lista.txt', '-c', 'copy', f'{d}/voce-completa.wav')
    ff('-i', f'{d}/voce-completa.wav', '-c:a', 'libmp3lame', '-b:a', '192k', '-id3v2_version', '3', f'{d}/voce-completa.mp3')
    print(nome, ' '.join(f"{t['id']}:{t['durata']:.1f}" for t in tempi), f'totale {t0:.1f}')
