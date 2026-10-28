"""Montaggio del reel «Kit Contratto Funzioni Locali» con Andrea Ricci (9:16, 1080x1920, 25 fps).

    python3 strumenti/kitlocali/monta.py      -> pdro-kit-funzioni-locali/PDRO_Kit_Contratto_Funzioni_Locali_9x16.mp4

Scene come nel pacchetto, tagli netti:
  S01 copertina e S11 chiusura con il QR: slide mute (3 s e 10 s), la musica la aggiunge Achille;
  S02, S08, S10: Andrea scontornato (photo avatar HeyGen in webm con alfa, un solo video con le tre scene in fila,
                 audio/tempi-avatar.json; la punta della bandiera dietro di lui è tolta da pulisci_avatar.py) in basso a destra, come nei reel PDRO, con l'alone chiaro; dietro una foto del
                 pacchetto con zoom lento, una sfumatura verde e il logo (S02 e S10 la piazza della copertina, S08 la
                 scrivania della busta paga). I sottotitoli di queste scene salgono sopra l'avatar.
  S03, S06: clip del pacchetto (6 e 7 s: si animano e poi stanno ferme), allungate tenendo l'ultimo fotogramma;
  S04, S05, S07, S09: slide del pacchetto con un respiro di zoom del 3%.
Le slide hanno già il logo. Sottotitoli (IMPRESSI; dalla v3 spenti, resta l'SRT) nella fascia bassa (Inter SemiBold bianco su riquadro nero, come il Kit
precedente), con i tempi veri delle parole; la voce dice i numeri in lettere, i sottotitoli li scrivono in cifre come il
testo del pacchetto. Anche sottotitoli.srt a parte.
"""
import json, os, re, subprocess

QUI = os.path.dirname(os.path.abspath(__file__))
D = os.path.join(os.path.dirname(os.path.dirname(QUI)), 'pdro-kit-funzioni-locali')
NOME = 'PDRO_Kit_Contratto_Funzioni_Locali_9x16'
FPS = 25
L = f'{D}/montaggio'; os.makedirs(L, exist_ok=True)
SCENE = [('S01', 'slide', '02_slide/video-s01-copertina.png', 2.0), ('S02', 'avatar', None, None),
         ('S03a', 'clip', '03_clip/video-c03-numeri.mp4', None),
         ('S03b', 'slide', '02_slide/video-s03b-quanto-aumenta-davvero.png', 'tenuta'),
         ('S03c', 'slide', '02_slide/video-s03c-arretrati.png', 'tenuta'),
         ('S04', 'slide', '02_slide/video-s04-aumenti-per-area.png', None),
         ('S05', 'slide', '02_slide/video-s05-quando-arrivano.png', None), ('S06', 'clip', '03_clip/video-c06-diritti.mp4', None),
         ('S07', 'slide', '02_slide/video-s07-intelligenza-artificiale.png', None), ('S08', 'avatar', None, None),
         ('S09', 'slide', '02_slide/video-s09-come-richiederlo.png', None), ('S10', 'avatar', None, None),
         ('S11', 'slide', '02_slide/video-s11-chiusura-qr.png', 6.0)]   # v5: 2 e 6 s (erano 3 e 10)
CIFRE = [('duemilaventicinque duemilaventisette', '2025-2027'), ('duemilaventisette', '2027'), ('centocinquantadue', '152'),
         ('centoquarantuno', '141'), ('centoventotto', '128'), ('centotrentanove', '139'), ('ventiquattro', '24'), ('ventotto', '28')]
MAXR, SUB_Y = 30, 1905
IMPRESSI = False      # v3 (28/10): Achille non vuole i sottotitoli nel video; resta sottotitoli.srt
SUB_Y_AVATAR = 1250
FOTO = {'S02': 'foto-copertina.png', 'S08': 'foto-stipendio.png', 'S10': 'foto-copertina.png'}
TENUTA = {'S03b': 1.3, 'S03c': 0.8}   # le due slide di Achille restano ferme oltre la voce (v4b 3 e 2 s; v5 più corte)
CODA = 0.2          # v5 (Achille: «pause troppo lunghe»): ogni scena finisce 0,2 s dopo l'ultima parola (prima: tutta la
                    # coda del taglio, 0,6 s, che con l'attacco della scena dopo dava ~0,7 s di silenzio fra le scene)
AV_H = 640          # altezza a schermo di Andrea (avatar_pulito.mov: ritaglio 920x1080 del webm, senza la bandiera)


def ff(*a):
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', *a], check=True)


def durata(p):
    return float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', p],
                                capture_output=True, text=True, check=True).stdout)


def cifre(t):
    for a, b in CIFRE:
        t = t.replace(a, b)
    return t


def righe(t):
    if len(t) <= MAXR:
        return t
    p = t.split(); k = min(range(1, len(p)), key=lambda k: abs(len(' '.join(p[:k])) - len(t) / 2))
    return ' '.join(p[:k]) + r'\N' + ' '.join(p[k:])


def frasi(parole):
    """Schermate di al massimo due righe: si va a capo alla punteggiatura forte, o alla virgola quando è già lunga,
    e una frase troppo lunga si spezza al confine di parola più vicino."""
    out, cur = [], []
    for w in parole:
        cur.append(w); t = cifre(' '.join(x['w'] for x in cur))
        if re.search(r'[.?!:]$', w['w']) or (w['w'].endswith(',') and len(t) > MAXR) or len(t) > 2 * MAXR - 4:
            out.append(cur); cur = []
    if cur:
        out.append(cur)
    return out


def tc(t, ass=True):
    return f'{int(t // 3600)}:{int(t // 60 % 60):02d}:{t % 60:05.2f}' if ass else \
        f'{int(t // 3600):02d}:{int(t // 60 % 60):02d}:{int(t % 60):02d},{round(t % 1 * 1000) % 1000:03d}'


def monta():
    voce = {t['id']: t['durata'] for t in json.load(open(f'{D}/audio/tempi-scene.json'))}
    parole = json.load(open(f'{D}/audio/parole.json'))
    tav = {t['id']: t for t in json.load(open(f'{D}/audio/tempi-avatar.json'))}
    pezzi, t0, ev, srt, voci = [], 0.0, [], [], []
    for sid, tipo, f, fissa in SCENE:
        vs = min(voce[sid], parole[sid][-1]['b'] + CODA) if sid in voce else 0
        d = vs + TENUTA[sid] if fissa == 'tenuta' else (fissa or vs); n = round(d * FPS); out = f'{L}/{sid}.mp4'
        if tipo == 'slide':
            ff('-loop', '1', '-i', f'{D}/{f}', '-filter_complex',
               f"[0:v]scale=2160:3840,zoompan=z='1+0.03*on/{n}':x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2':d=1:s=1080x1920:fps={FPS},"
               f"setsar=1,format=yuv420p[v]", '-map', '[v]', '-frames:v', str(n), '-c:v', 'libx264', '-crf', '16', out)
        elif tipo == 'clip':
            ff('-i', f'{D}/{f}', '-filter_complex', f"[0:v]fps={FPS},scale=1080:1920,setsar=1,tpad=stop_mode=clone:stop_duration={d},"
               f"format=yuv420p[v]", '-map', '[v]', '-an', '-frames:v', str(n), '-c:v', 'libx264', '-crf', '16', out)
        else:
            # foto del pacchetto con zoom lento, sfumatura verde in basso, logo; Andrea scontornato in basso a destra
            a = tav[sid]['inizio']
            ff('-loop', '1', '-i', f'{D}/04_foto_sorgente/{FOTO[sid]}', '-loop', '1', '-i', f'{D}/05_extra/logo-cisl-fp-padova-rovigo.png',
               '-i', f'{D}/avatar/avatar_pulito.mov', '-filter_complex',
               f"[0:v]scale=2160:3840:force_original_aspect_ratio=increase,crop=2160:3840,"
               f"zoompan=z='1.02+0.05*on/{n}':x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2':d=1:s=1080x1920:fps={FPS},"
               f"eq=brightness=-0.06:saturation=0.9,setsar=1[f];"
               f"color=c=0x00663a:s=1080x1920:d={d:.3f},format=rgba,"
               f"geq=r='0':g='102':b='58':a='if(gt(Y,1000),min(235,(Y-1000)*0.5),0)'[g];"
               f"[f][g]overlay=0:0[fg];[1:v]scale=200:-1[l];[fg][l]overlay=40:50[b];"
               f"[2:v]trim=start={a:.3f}:duration={d:.3f},setpts=PTS-STARTPTS,fps={FPS},format=rgba,"
               f"scale=-2:{AV_H}:flags=lanczos,split[av][om];"
               f"[om]lutrgb=r=255:g=255:b=255,boxblur=luma_radius=14:alpha_radius=14,colorchannelmixer=aa=0.55[al];"
               f"[b][al]overlay=W-w:H-h:eof_action=repeat[b2];[b2][av]overlay=W-w:H-h:eof_action=repeat,setsar=1,format=yuv420p[v]",
               '-map', '[v]', '-an', '-frames:v', str(n), '-c:v', 'libx264', '-crf', '16', out)
        pezzi.append(out)
        if sid in voce:
            voci.append((sid, t0))
            cc = frasi(parole[sid])
            for j, c in enumerate(cc):
                a, b = t0 + c[0]['a'] - 0.05, t0 + c[-1]['b'] + 0.3
                if j + 1 < len(cc):
                    b = min(b, t0 + cc[j + 1][0]['a'] - 0.07)
                testo = cifre(' '.join(w['w'] for w in c))
                ev.append(f"Dialogue: 0,{tc(a)},{tc(b)},S,,0,0,0,,{{\\an2\\pos(540,{SUB_Y_AVATAR if tipo == 'avatar' else SUB_Y})}}{righe(testo)}")
                srt.append((a, b, righe(testo).replace(r'\N', '\n')))
        t0 += d
    tot = t0
    open(f'{L}/lista.txt', 'w').write(''.join(f"file '{p}'\n" for p in pezzi))
    ff('-f', 'concat', '-safe', '0', '-i', f'{L}/lista.txt', '-c', 'copy', f'{L}/fondo.mp4')
    open(f'{L}/sub.ass', 'w').write(
        '[Script Info]\nScriptType: v4.00+\nPlayResX: 1080\nPlayResY: 1920\nWrapStyle: 2\n\n[V4+ Styles]\n'
        'Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, '
        'Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, '
        'MarginR, MarginV, Encoding\n'
        'Style: S,Inter SemiBold,48,&H00FFFFFF,&H00FFFFFF,&H00000000,&H00000000,0,0,0,0,100,100,0,0,3,12,0,2,60,60,0,1\n'
        '\n[Events]\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\n' + '\n'.join(ev) + '\n')
    open(f'{D}/sottotitoli.srt', 'w').write(''.join(f'{k}\n{tc(a, False)} --> {tc(b, False)}\n{x}\n\n'
                                                  for k, (a, b, x) in enumerate(srt, 1)))
    ins = sum([['-i', f'{D}/audio/wav/{s}.wav'] for s, _ in voci], [])
    fil = [f"[{k + 1}:a]aresample=48000,adelay={round(t * 1000)}|{round(t * 1000)}[a{k}]" for k, (_, t) in enumerate(voci)]
    fil.append(''.join(f'[a{k}]' for k in range(len(voci))) + f"amix=inputs={len(voci)}:normalize=0,apad=whole_dur={tot:.3f}[au]")
    fil.append(f"[0:v]subtitles={L}/sub.ass,setsar=1,format=yuv420p[v]" if IMPRESSI else "[0:v]setsar=1,format=yuv420p[v]")
    ff('-i', f'{L}/fondo.mp4', *ins, '-filter_complex', ';'.join(fil), '-map', '[v]', '-map', '[au]', '-t', f'{tot:.3f}',
       '-r', str(FPS), '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-c:a', 'aac', '-b:a', '192k',
       '-movflags', '+faststart', f'{D}/{NOME}.mp4')
    print('montato', NOME, f'{tot:.2f} s', len(ev), 'sottotitoli')


if __name__ == '__main__':
    monta()
