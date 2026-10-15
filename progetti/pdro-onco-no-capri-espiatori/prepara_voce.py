"""Voce del Reel: per ogni scena silenceremove (pause oltre 0,45 s ridotte a 0,35 s),
poi atempo=1.12 e 0,3 s di coda; WAV per scena in audio/wav, MP3 in audio/finali,
voce completa unita al campione (audio/voce-completa.wav/.mp3) e audio/tempi-scene.json."""
import json, os, subprocess, wave

QUI = os.path.dirname(os.path.abspath(__file__))
A = os.path.join(QUI, 'audio')
FILTRO = ('silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.1:'
          'stop_periods=-1:stop_duration=0.45:stop_threshold=-50dB:stop_silence=0.35,'
          'atempo=1.12,apad=pad_dur=0.3')


def ff(*a):
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', *a], check=True)


os.makedirs(os.path.join(A, 'wav'), exist_ok=True)
os.makedirs(os.path.join(A, 'finali'), exist_ok=True)
tempi, t = [], 0.0
for n in range(1, 8):
    s = f'S{n:02d}'
    w = os.path.join(A, 'wav', f'{s}.wav')
    ff('-i', os.path.join(A, f'grezzo-{s}.mp3'), '-af', FILTRO, '-ar', '44100', '-ac', '1', w)
    ff('-i', w, '-c:a', 'libmp3lame', '-b:a', '192k', '-id3v2_version', '3', os.path.join(A, 'finali', f'{s}.mp3'))
    with wave.open(w) as f:
        d = f.getnframes() / f.getframerate()
    tempi.append({'id': s, 'inizio': round(t, 4), 'durata': round(d, 4)}); t += d
json.dump(tempi, open(os.path.join(A, 'tempi-scene.json'), 'w'), indent=1)
open(os.path.join(A, 'lista.txt'), 'w').write(''.join(f"file 'wav/S{n:02d}.wav'\n" for n in range(1, 8)))
ff('-f', 'concat', '-safe', '0', '-i', os.path.join(A, 'lista.txt'), '-c', 'copy', os.path.join(A, 'voce-completa.wav'))
ff('-i', os.path.join(A, 'voce-completa.wav'), '-c:a', 'libmp3lame', '-b:a', '192k', '-id3v2_version', '3',
   os.path.join(A, 'voce-completa.mp3'))
for x in tempi:
    print(x['id'], x['durata'])
print('totale', round(t, 3))
