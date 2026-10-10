"""Sottotitoli del Reel: blocchi brevi sincronizzati sulla voce.

Per ogni scena: il testo di voce_testi/ si spezza in blocchi (prima alla
punteggiatura, poi a lunghezza), e ogni parola prende un tempo in proporzione
ai suoi caratteri lungo il parlato reale della traccia: le pause misurate con
silencedetect sulla traccia finale non consumano testo. Scrive
sottotitoli.json (tempi globali) e sottotitoli.srt.
"""
import json, os, re, subprocess

QUI = os.path.dirname(os.path.abspath(__file__))
TEMPI = json.load(open(os.path.join(QUI, 'audio/tempi-scene.json')))
MAX = 58            # caratteri per blocco: tre righe strette nel riquadro a sinistra


def parlato(wav):
    """Intervalli di parlato (inizio, fine) della traccia, in secondi."""
    e = subprocess.run(['ffmpeg', '-hide_banner', '-nostats', '-i', wav, '-af',
                        'silencedetect=n=-40dB:d=0.18', '-f', 'null', '-'],
                       capture_output=True, text=True).stderr
    st = [float(x) for x in re.findall(r'silence_start: ([\d.]+)', e)]
    en = [float(x) for x in re.findall(r'silence_end: ([\d.]+)', e)]
    dur = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration',
                                '-of', 'csv=p=0', wav], capture_output=True, text=True).stdout)
    seg, t = [], 0.0
    for s, f in zip(st, en + [dur] * (len(st) - len(en))):
        if s > t + 0.05:
            seg.append((t, s))
        t = f
    if dur > t + 0.05:
        seg.append((t, dur))
    return seg


def blocchi(testo):
    """Frasi spezzate alla punteggiatura forte, poi a lunghezza MAX sulle virgole o tra parole."""
    out = []
    for frase in re.split(r'(?<=[.:?!])\s+', testo.strip()):
        parti = re.split(r'(?<=,)\s+', frase)
        cur = ''
        for p in parti:
            for w in p.split():
                if cur and len(cur) + 1 + len(w) > MAX:
                    out.append(cur); cur = w
                else:
                    cur = (cur + ' ' + w).strip()
            if len(cur) > MAX * 0.6:
                out.append(cur); cur = ''
        if cur:
            out.append(cur)
    # una coda di una o due parole lampeggerebbe per mezzo secondo: va col blocco prima
    fuso = []
    for b in out:
        if fuso and len(b) < 18 and len(fuso[-1]) + 1 + len(b) <= MAX + 22:
            fuso[-1] += ' ' + b
        else:
            fuso.append(b)
    return fuso


def tempo_parole(parole, seg):
    """Tempo d'inizio di ogni parola, distribuendo i caratteri sul solo parlato."""
    peso = [len(w) + 1 for w in parole]
    tot = sum(peso); dur_parl = sum(b - a for a, b in seg)
    t_inizi, acc = [], 0.0
    for p in peso:
        x = acc / tot * dur_parl            # posizione nel parlato «compresso»
        for a, b in seg:
            if x <= b - a:
                t_inizi.append(a + x); break
            x -= b - a
        else:
            t_inizi.append(seg[-1][1])
        acc += p
    return t_inizi


def srt_t(s):
    h, r = divmod(s, 3600); m, r = divmod(r, 60)
    return f'{int(h):02d}:{int(m):02d}:{int(r):02d},{int(round((r % 1) * 1000)) % 1000:03d}'


if __name__ == '__main__':
    tutti = []
    for t in TEMPI:
        n = int(t['id'][1:])
        f = [x for x in os.listdir(os.path.join(QUI, 'voce_testi')) if x.startswith(f'{n:02d}_')][0]
        testo = open(os.path.join(QUI, 'voce_testi', f)).read()
        seg = parlato(os.path.join(QUI, 'audio/wav', f"{t['id']}.wav"))
        bl = blocchi(testo)
        parole = [w for b in bl for w in b.split()]
        ti = tempo_parole(parole, seg)
        k = 0
        for b in bl:
            nw = len(b.split())
            ini = ti[k]
            k += nw
            fine = ti[k] if k < len(ti) else seg[-1][1]
            tutti.append({'scena': t['id'], 'inizio': round(t['inizio'] + ini, 3),
                          'fine': round(t['inizio'] + fine - 0.04, 3), 'testo': b})
    json.dump(tutti, open(os.path.join(QUI, 'sottotitoli.json'), 'w'), ensure_ascii=False, indent=1)
    with open(os.path.join(QUI, 'sottotitoli.srt'), 'w') as o:
        for i, s in enumerate(tutti, 1):
            o.write(f"{i}\n{srt_t(s['inizio'])} --> {srt_t(s['fine'])}\n{s['testo']}\n\n")
    for s in tutti:
        print(f"{s['inizio']:7.2f}-{s['fine']:7.2f} {s['testo']}")
