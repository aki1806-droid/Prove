"""Voci della serie «Chi c'è domani» (HeyGen create_speech, motore ElevenLabs eleven_v4).

Tre tracce grezze: «Luca Ward» ep. 1-3 e ep. 4-5 (blocchi uniti da <break time="1.6s"/>), «Achille
nuovo 1» con le cinque chiusure. Tutto si fa sui word_timestamps di HeyGen, così i tempi di ogni
parola restano noti dopo i tagli (servono alle grafiche animate):
  - ogni blocco va dalla prima parola meno 0,08 s all'ultima più 0,25 s;
  - narratore: le pause tra parole oltre 0,6 s si accorciano a 0,45 s (velocità naturale);
  - achille:   le pause oltre 0,45 s si accorciano a 0,35 s, poi atempo 1,16 (regola CLAUDE.md);
  - in coda 0,35 s di silenzio.
Scrive in ogni progetto audio/wav/Sxx.wav, audio/finali/Sxx.mp3, audio/parole.json (parole con
tempi nella scena), audio/tempi-scene.json, voce-completa.wav/mp3.
"""
import json, os, re, subprocess

QUI = os.path.dirname(os.path.abspath(__file__))
PR = os.path.dirname(os.path.dirname(QUI))
EP = ['pdro-chicedomani-ep1-torno-subito', 'pdro-chicedomani-ep2-il-testimone', 'pdro-chicedomani-ep3-il-calendario',
      'pdro-chicedomani-ep4-promesse-a-scadenza', 'pdro-chicedomani-ep5-noi-ci-saremo']
TEMPO = {'narratore': (0.6, 0.45, 1.0), 'achille': (0.45, 0.35, 1.16)}
CODA = 0.35


def ff(*a):
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', *a], check=True)


def dur(p):
    return float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', p],
                                capture_output=True, text=True, check=True).stdout)


def parlato(src):
    """Tratti di parlato della traccia grezza (silencedetect -40 dB, 0,1 s)."""
    e = subprocess.run(['ffmpeg', '-hide_banner', '-nostats', '-i', src, '-af', 'silencedetect=n=-40dB:d=0.1',
                        '-f', 'null', '-'], capture_output=True, text=True).stderr
    st = [float(x) for x in re.findall(r'silence_start: ([\d.]+)', e)]
    en = [0.0] + [float(x) for x in re.findall(r'silence_end: ([\d.]+)', e)]
    return list(zip(en, st + [dur(src)]))


def bordi(parole, seg):
    """I timestamp di HeyGen a volte sbagliano la prima parola dopo una pausa (es. «Ingredienti»):
    inizio e fine del blocco si prendono dai tratti di parlato che contengono la prima e l'ultima parola."""
    m0 = (parole[0]['start'] + parole[0]['end']) / 2
    a = next((x for x, y in seg if x - 0.4 <= m0 <= y + 0.05), parole[0]['start'])
    m1 = (parole[-1]['start'] + parole[-1]['end']) / 2
    b = next((y for x, y in seg if x - 0.05 <= m1 <= y), parole[-1]['end'])
    return min(a, parole[0]['start']), max(b, parole[-1]['end'])


def blocchi(nome):
    """Parole della traccia divise per blocco (separatore: il tag di pausa)."""
    out, cur = [], []
    for w in json.load(open(f'{QUI}/{nome}.json'))['word_timestamps']:
        if w['word'].startswith('<break') or w['word'] == '<end>':
            out.append(cur); cur = []
        elif not w['word'].startswith('<'):
            cur.append(w)
    return out


def taglia(src, parole, tipo, wav):
    """Tiene il parlato, accorcia le pause lunghe; restituisce le parole con i tempi nuovi."""
    soglia, resta, at = TEMPO[tipo]
    a0, b0 = bordi(parole, parlato(src))
    parole[0]['start'] = a0
    a = a0 - 0.08
    pezzi, nuove = [], []
    for i, w in enumerate(parole):
        if i + 1 < len(parole):
            g0, g1 = w['end'], parole[i + 1]['start']
            if g1 - g0 > soglia:
                fine = g0 + resta * 0.6            # un po' più di coda dopo la parola che prima di quella dopo
                pezzi.append((a, fine)); a = g1 - resta * 0.4
    pezzi.append((a, b0 + 0.25))
    # tempi delle parole nella traccia tagliata (prima di atempo), poi /at
    off, mappa = 0.0, []
    for p0, p1 in pezzi:
        mappa.append((p0, p1, off)); off += p1 - p0

    def nuovo(t):
        for p0, p1, o in mappa:
            if t <= p1 + 1e-6:
                return (o + max(0.0, t - p0)) / at
        return off / at
    for w in parole:
        nuove.append({'w': w['word'], 'a': round(nuovo(w['start']), 3), 'b': round(nuovo(w['end']), 3)})
    fil = ''.join(f"[0:a]atrim={p0:.3f}:{p1:.3f},asetpts=PTS-STARTPTS[p{i}];" for i, (p0, p1) in enumerate(pezzi))
    fil += ''.join(f'[p{i}]' for i in range(len(pezzi))) + f'concat=n={len(pezzi)}:v=0:a=1'
    fil += (f',atempo={at}' if at != 1 else '') + f',apad=pad_dur={CODA}[o]'
    ff('-i', src, '-filter_complex', fil, '-map', '[o]', '-ar', '44100', '-ac', '1', wav)
    return nuove


ward = blocchi('ward-ep1-3') + blocchi('ward-ep4-5')
ach = blocchi('achille-chiusure')
for k, nome in enumerate(EP):
    d = os.path.join(PR, nome, 'audio')
    os.makedirs(f'{d}/wav', exist_ok=True); os.makedirs(f'{d}/finali', exist_ok=True)
    src = f'{QUI}/ward-ep1-3-grezzo.mp3' if k < 3 else f'{QUI}/ward-ep4-5-grezzo.mp3'
    pezzi = [(src, ward[k * 4 + j], 'narratore') for j in range(4)] + [(f'{QUI}/achille-chiusure-grezzo.mp3', ach[k], 'achille')]
    tempi, parole, t0 = [], {}, 0.0
    for i, (s, pw, tipo) in enumerate(pezzi, 1):
        sid = f'S{i:02d}'; w = f'{d}/wav/{sid}.wav'
        parole[sid] = taglia(s, pw, tipo, w)
        ff('-i', w, '-c:a', 'libmp3lame', '-b:a', '192k', '-id3v2_version', '3', f'{d}/finali/{sid}.mp3')
        tempi.append({'id': sid, 'tipo': tipo, 'inizio': round(t0, 4), 'durata': round(dur(w), 4)}); t0 += dur(w)
    json.dump(tempi, open(f'{d}/tempi-scene.json', 'w'), indent=1)
    json.dump(parole, open(f'{d}/parole.json', 'w'), ensure_ascii=False, indent=0)
    open(f'{d}/lista.txt', 'w').write(''.join(f"file 'wav/{t['id']}.wav'\n" for t in tempi))
    ff('-f', 'concat', '-safe', '0', '-i', f'{d}/lista.txt', '-c', 'copy', f'{d}/voce-completa.wav')
    ff('-i', f'{d}/voce-completa.wav', '-c:a', 'libmp3lame', '-b:a', '192k', '-id3v2_version', '3', f'{d}/voce-completa.mp3')
    print(nome, ' '.join(f"{t['id']}:{t['durata']:.1f}" for t in tempi), f'totale {t0:.1f}')
