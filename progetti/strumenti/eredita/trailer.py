"""Book trailer di «Eredità Invisibili» (pacchetto Eredita_Invisibili_BOOK_TRAILER, 14/11/2026): voce, grafica, montaggio.
Scelte di Achille: voce ElevenLabs diretto («Achille nuovo 1» KerPEYZvLEWNATg4AARX, eleven_v4, una passata per trailer, flow
N0YZ2MwkWYIrxhvx87ih), clip HeyGen dal connettore, Robin dopo il suo OK. La voce resta intera (lezione del video di lancio:
i tagli creavano interruzioni): atempo 1,12 e pause aggiunte solo dentro le pause vere fra i paragrafi.
    python3 strumenti/eredita/trailer.py <n> voce      -> audio/voce.wav, tempi.json, parole.json, testi/spec.json
    node strumenti/eredita/trailer.mjs <cartella>     -> testi/*.png, testi/copertina.mp4, copertina_reel.jpg
    python3 strumenti/eredita/trailer.py <n> monta     -> Trailer_<n>_<titolo>.mp4
"""
import json, os, re, subprocess, sys
QUI = os.path.dirname(os.path.abspath(__file__)); PR = os.path.dirname(os.path.dirname(QUI))
SU = f'{QUI}/suoni'
AT, XF, FPS = 1.12, 0.4, 30
PAUSA = 0.35          # aggiunta in ogni pausa fra paragrafi
CODA = 2.5            # la frase finale resta due secondi e mezzo dopo la voce
GRADO = 'eq=contrast=1.03:saturation=0.92:brightness=-0.02'

# Ogni trailer: cartella, titolo, scene (gruppi di paragrafi di voce.txt), pause extra dopo un paragrafo, segmenti video,
# frasi a schermo e suoni. Un'ancora è (scena, parola, n-esima volta) oppure un numero di secondi dall'inizio della scena.
T = {
 1: dict(dir='ei-bt1-poi-passa', nome='Trailer_1_Poi_passa', reel='Poi passa.',
   scene=[[0], [1], [2], [3, 4], [5], [6], [7]], extra={},
   seg=[(['S1'], [('p1', None)]), (['S2'], [('p2a', ('S2', 'Abbasso')), ('p2b', None)]), (['S3'], [('p3', None)]),
        (['S4'], [('nero', None)]), (['S5'], [('p5', None)])],
   testi=[('q1', 'Papà, perché quel signore ha una faccia triste?', ('S1', 'Papà'), None, {}),
          ('q3', 'Oggi sono un po’ triste.', ('S3', 'Oggi'), None, {}),
          ('q4a', 'Anch’io a volte sono triste.', ('S4', 'Anch’io'), ('S4', 'Poi'), {'cls': 'n', 'top': 860}),
          ('q4b', 'Poi passa.', ('S4', 'Poi'), None, {'cls': 'n', 'top': 860, 'size': 110}),
          ('q5', 'la verità è maleducata', ('S5', 'verità'), None, {'barra_anim': ('S5', 'verità', 1, 0.9)})],
   chiusa='I bambini dicono la verità. Noi abbiamo imparato a chiamarla maleducazione.',
   suoni=[('supermercato.mp3', 0, ('S4', 0.0), 0.35, True), ('piano_cv2.mp3', ('S4', 'Poi', 2), None, 0.22, True)]),
 2: dict(dir='ei-bt2-sbrigati', nome='Trailer_2_Sbrigati', reel='Sbrigati.',
   scene=[[0], [1], [2], [3, 4], [5], [6], [7], [8]], extra={},
   seg=[(['S1'], [('s1a', 1.0), ('s1b', 2.0), ('s1a@2', 3.0), ('s1b@2.2', 4.0), ('s1a@3.6', 5.0), ('s1b@4', None)], 'netto'),
        (['S2'], [('s2', None)]), (['S3'], [('s3a', ('S3', 'Un')), ('s3b', ('S3', 'Una', 2)), ('s3c', None)]),
        (['S4'], [('s4', None)]), (['S5', 'S6'], [('s5', None)])],
   testi=[('q1a', 'Rispondi subito.', ('S1', 'Rispondi'), ('S1', 'Decidi'), {'scatto': True, 'cls': 'r'}),
          ('q1b', 'Decidi adesso.', ('S1', 'Decidi'), None, {'scatto': True, 'cls': 'r'}),
          ('q2', 'venti minuti', ('S2', 'venti'), None, {}),
          ('q4a', 'Sbrigati.', ('S4', 'Sbrigati', 1), ('S4', 'Sbrigati', 2), {'size': 120, 'cls': 'n'}),
          ('q4b', 'Sbrigati.', ('S4', 'Sbrigati', 2), ('S4', 'presente'), {'size': 84, 'cls': 'n'}),
          ('q4c', 'Sbrigati.', ('S4', 'presente'), None, {'size': 52, 'cls': 'n'}),
          ('q5', 'le ombre sui muri', ('S5', 'ombre'), ('S6', 0.0), {}),
          ('q6', 'La lentezza dei bambini non è distrazione.', ('S6', 'La'), None, {})],
   chiusa='La fretta si eredita. Anche la lentezza.',
   suoni=[('passi.mp3', 0, ('S2', 0.0), 0.5, True), ('ticchettio.mp3', 0, ('S2', 0.0), 0.35, True),
          ('piano_cv2.mp3', ('S7', 0.0), None, 0.2, True)]),
 3: dict(dir='ei-bt3-non-piangere', nome='Trailer_3_Non_piangere', reel='Non piangere.',
   scene=[[0], [1], [2], [3], [4], [5], [6], [7], [8], [9]], extra={0: 0.6},
   seg=[(['S1', 'S2', 'S3'], [('nero', ('S2', 0.6)), ('n3', None)]), (['S4'], [('n4', None)]), (['S5'], [('n5', None)]),
        (['S6'], [('n6a', ('S6', 'Perché')), ('n6b', None)]), (['S7'], [('n7', None)]), (['S8'], [('n8', None)])],
   testi=[('q1a', 'Non piangere.', ('S1', 'Non'), ('S3', 0.0), {'cls': 'n r', 'top': 760, 'fuori': True}),
          ('q1b', 'Dai, non è niente.', ('S1', 'Dai'), ('S3', 0.0), {'cls': 'n r', 'top': 880, 'fuori': True}),
          ('q1c', 'Sei grande.', ('S1', 'Sei'), ('S3', 0.0), {'cls': 'n r', 'top': 1000, 'fuori': True}),
          ('q4', 'Non ero debole. Ero finalmente vero.', ('S4', 'non'), None, {}),
          ('q6', 'l’eredità più tossica che gli uomini si passano tra loro', ('S6', 'l’eredità'), None, {}),
          ('q7', 'Non è un uomo forte. È un uomo chiuso.', ('S7', 'non', 2), None, {}),
          ('q8', 'Non sempre ci riesco.', ('S8', 'non', 3), None, {})],
   chiusa='Non era la diga che crollava. Era il fiume che tornava.',
   suoni=[('cello.mp3', ('S1', 0.0), None, 0.22, True)]),
 4: dict(dir='ei-bt4-prendimi', nome='Trailer_4_Prendimi', reel='Prendimi.',
   scene=[[0], [1], [2], [3], [4], [5], [6], [7], [8]], extra={5: 1.4},
   seg=[(['S1'], [('f1', None)]), (['S2'], [('f2', None)]), (['S3'], [('f3', None)]), (['S4'], [('f4', None)]),
        (['S5'], [('f5', None)]), (['S6'], [('nero', None)]), (['S7'], [('f7', None)])],
   testi=[('q1', 'Senza girarsi. Senza guardare.', ('S1', 'Senza'), None, {}),
          ('q3', 'papà è lì', ('S3', 'papà'), None, {}),
          ('q4', 'Il sollievo. E un’invidia che mi brucia.', ('S4', 'Il'), None, {}),
          ('q5', 'Non so fidarmi a occhi chiusi.', ('S5', 'Non'), None, {}),
          ('q6', 'Quando è stata l’ultima volta che ho detto «prendimi»?', ('S6', 'Quando'), None, {'cls': 'n', 'size': 84}),
          ('q7', 'Prima del controllo c’era la fiducia.', ('S7', 'Prima'), None, {})],
   chiusa='Il resto è il mondo. E il mondo, a volte, ti prende.',
   suoni=[('piano_caldo.mp3', ('S1', 0.0), None, 0.2, True), ('risata.mp3', ('S7', 1.6), None, 0.5, False)]),
}


def ff(*a):
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', *a], check=True)


def dur(p):
    return float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', p],
                                capture_output=True, text=True, check=True).stdout)


norm = lambda w: re.sub(r'[^\w’\']', '', w.lower()).replace("'", '’')


def silenzi_rms(f):
    """energia della voce in finestre di 10 ms (dB)"""
    import numpy as np
    a = subprocess.run(['ffmpeg', '-v', 'error', '-i', f, '-ac', '1', '-ar', '16000', '-f', 's16le', '-'], capture_output=True).stdout
    x = np.frombuffer(a, np.int16).astype(float) / 32768
    n = len(x) // 160
    return 20 * np.log10(np.sqrt((x[:n * 160].reshape(n, 160) ** 2).mean(1)) + 1e-9)


def pausa_vera(db, fine, inizio):
    """Il punto di taglio fra due paragrafi: i tempi della trascrizione sbagliano di qualche decimo proprio dove le pause
    sono brevi, e il taglio a metà finiva dentro una parola. Cerca, fra 0,6 s prima della fine dell'ultima parola e 0,6 s
    dopo l'inizio della successiva, il tratto di silenzio (sotto −45 dB) più lungo e taglia al suo centro."""
    import numpy as np
    a, b = max(0, int((fine - 0.6) * 100)), min(len(db), int((inizio + 0.6) * 100))
    zitto = db[a:b] < -45
    best, cur, st = (0, None), 0, 0
    for k, z in enumerate(zitto):
        if z:
            if cur == 0: st = k
            cur += 1
            if cur > best[0]: best = (cur, st)
        else:
            cur = 0
    if best[0] >= 3:
        return (a + best[1] + best[0] / 2) / 100
    return (a + int(np.argmin(db[a:b]))) / 100



def voce(n):
    c = T[n]; D = f'{PR}/{c["dir"]}'
    par = [p.split() for p in re.split(r'\n\s*\n', open(f'{D}/voce.txt').read().strip())]
    w = [x for x in json.load(open(f'{D}/audio/parole_grezzo.json'))['words'] if x.get('type', 'word') == 'word']
    # indice della prima parola di ogni paragrafo, contando le parole in ordine
    k, inizi = 0, []
    for p in par:
        inizi.append(k); k += len(p)
    assert k == len(w), (k, len(w))
    tot = dur(f'{D}/audio/grezzo.mp3')
    # tagli a metà delle pause fra paragrafi, con la pausa da aggiungere
    db = silenzi_rms(f'{D}/audio/grezzo.mp3')
    tagli = [(pausa_vera(db, w[i - 1]['end'], w[i]['start']), PAUSA + c['extra'].get(j - 1, 0)) for j, i in enumerate(inizi) if j > 0]
    pezzi, a = [], 0.0
    for t, p in tagli:
        pezzi.append((a, t, p)); a = t
    pezzi.append((a, tot, CODA))
    fil = ''.join(f'[0:a]atrim={a:.3f}:{b:.3f},asetpts=PTS-STARTPTS,afade=t=in:d=0.01,areverse,afade=t=in:d=0.015,areverse,atempo={AT},apad=pad_dur={p}[p{k}];' for k, (a, b, p) in enumerate(pezzi))
    fil += ''.join(f'[p{k}]' for k in range(len(pezzi))) + f'concat=n={len(pezzi)}:v=0:a=1[o]'
    ff('-i', f'{D}/audio/grezzo.mp3', '-filter_complex', fil, '-map', '[o]', '-ar', '44100', '-ac', '1', '-c:a', 'pcm_s16le', f'{D}/audio/voce.wav')
    ini, t = [], 0.0
    for a, b, p in pezzi:
        ini.append(t); t += (b - a) / AT + p
    fine = lambda k: ini[k] + (pezzi[k][1] - pezzi[k][0]) / AT + pezzi[k][2]
    nuovo = lambda x: next(ini[k] + (x - a) / AT for k, (a, b, p) in enumerate(pezzi) if a - 1e-6 <= x <= b + 1e-6)
    tempi, parole = [], {}
    for s, grp in enumerate(c['scene']):
        sid = f'S{s + 1}'; t0, t1 = ini[grp[0]], fine(grp[-1])
        ww = [x for j in grp for x in w[inizi[j]:inizi[j] + len(par[j])]]
        tempi.append({'id': sid, 'inizio': round(t0, 3), 'durata': round(t1 - t0, 3)})
        parole[sid] = [{'w': x['text'], 'a': round(nuovo(x['start']) - t0, 3)} for x in ww]
    json.dump(tempi, open(f'{D}/audio/tempi.json', 'w'), indent=1)
    json.dump(parole, open(f'{D}/audio/parole.json', 'w'), ensure_ascii=False, indent=0)
    # spec per la grafica
    testi = [{'nome': nm, 'testo': tx, **{k: v for k, v in o.items() if k in ('cls', 'top', 'size')}, **({'barra_anim': 1} if 'barra_anim' in o else {})}
             for nm, tx, a, b, o in c['testi']]
    testi.append({'nome': 'chiusa', 'testo': c['chiusa'], 'cls': 'n', 'size': 84, 'top': 760})
    cop = tempi[-2]; P = parole[cop['id']]
    tw = lambda x: next(p['a'] for p in P if norm(p['w']).startswith(x))
    os.makedirs(f'{D}/testi', exist_ok=True)
    json.dump({'testi': testi, 'titolo_reel': c['reel'],
               'copertina': {'durata': cop['durata'] + XF, 'titolo': tw('intitola'), 'amazon': tw('amazon'), 'recensione': tw('recensione')}},
              open(f'{D}/testi/spec.json', 'w'), ensure_ascii=False, indent=1)
    print(c['dir'], ' '.join(f"{x['id']}:{x['durata']:.1f}" for x in tempi), f"totale {t:.1f}")


def monta(n):
    c = T[n]; D = f'{PR}/{c["dir"]}'
    tempi = {t['id']: t for t in json.load(open(f'{D}/audio/tempi.json'))}; par = json.load(open(f'{D}/audio/parole.json'))
    ids = [t['id'] for t in json.load(open(f'{D}/audio/tempi.json'))]
    def T_(an):   # ancora -> secondi assoluti
        if isinstance(an, (int, float)):
            return float(an)
        s, x = an[0], an[1]; k = an[2] if len(an) > 2 else 1
        if isinstance(x, (int, float)):
            return tempi[s]['inizio'] + x
        hit = [p['a'] for p in par[s] if norm(p['w']) == norm(x)]
        return tempi[s]['inizio'] + hit[k - 1]
    L = f'{D}/montaggio'; os.makedirs(L, exist_ok=True)
    tot = tempi[ids[-1]]['inizio'] + tempi[ids[-1]]['durata']
    # segmenti: quelli del trailer, poi la copertina (penultima scena) e la frase finale su nero
    SEG = [(s[0], s[1], s[2] if len(s) > 2 else 'fade') for s in c['seg']] + [([ids[-2]], [('copertina', None)], 'fade'), ([ids[-1]], [('chiusa', None)], 'fade')]
    pezzi = []
    for i, (sc, clips, modo) in enumerate(SEG):
        a0 = tempi[sc[0]]['inizio']; dur_ = tempi[sc[-1]]['inizio'] + tempi[sc[-1]]['durata'] - a0
        Lg = dur_ + (XF if i + 1 < len(SEG) else 0); out = f'{L}/seg{i:02d}.mp4'
        if clips[0][0] == 'copertina':
            ff('-i', f'{D}/testi/copertina.mp4', '-vf', f'fps={FPS},tpad=stop_mode=clone:stop_duration=2', '-t', f'{Lg:.3f}', '-c:v', 'libx264', '-crf', '16', '-pix_fmt', 'yuv420p', out); pezzi.append((out, dur_)); continue
        if clips[0][0] == 'chiusa':
            ff('-f', 'lavfi', '-i', f'color=c=black:s=1080x1920:r={FPS}:d={Lg:.3f}', '-loop', '1', '-t', f'{Lg:.3f}', '-i', f'{D}/testi/chiusa.png', '-filter_complex',
               f'[1:v]format=rgba,fade=in:st=0.3:d=0.9:alpha=1[t];[0:v][t]overlay=0:0:shortest=1,format=yuv420p[v]', '-map', '[v]', '-t', f'{Lg:.3f}', '-c:v', 'libx264', '-crf', '16', out)
            pezzi.append((out, dur_)); continue
        xf = XF if modo == 'fade' else 0.0
        sub, t0 = [], 0.0
        for k, (cl, fine) in enumerate(clips):
            fin = (T_(fine) - a0) if isinstance(fine, tuple) else (fine if fine is not None else Lg)
            sd = fin - t0; t0 = fin; sub.append((cl, sd + (xf if k + 1 < len(clips) else 0)))
        ins, fil = [], []
        for k, (cl, sd) in enumerate(sub):
            if cl == 'nero':
                ins += ['-f', 'lavfi', '-i', f'color=c=black:s=1080x1920:r={FPS}:d={sd:.3f}']; fil.append(f'[{k}:v]format=yuv420p,setsar=1[v{k}]'); continue
            nm, _, da = cl.partition('@'); da = float(da or 0); f = f'{D}/clip/{nm}.mp4'; dc = dur(f) - da
            ins += ['-ss', f'{da:.2f}', '-i', f]
            fil.append(f'[{k}:v]setpts=PTS*{max(1.0, sd / (dc - 0.05)):.4f},fps={FPS},scale=1080:1920:force_original_aspect_ratio=increase,'
                       f'crop=1080:1920,{GRADO},trim=0:{sd:.3f},setpts=PTS-STARTPTS,format=yuv420p,setsar=1[v{k}]')
        if len(sub) == 1:
            fil.append('[v0]null[b]')
        elif xf:
            acc, off = 'v0', sub[0][1] - xf
            for k in range(1, len(sub)):
                fil.append(f'[{acc}][v{k}]xfade=transition=fade:duration={xf}:offset={off:.3f}[x{k}]'); acc = f'x{k}'; off += sub[k][1] - xf
            fil.append(f'[{acc}]null[b]')
        else:
            fil.append(''.join(f'[v{k}]' for k in range(len(sub))) + f'concat=n={len(sub)}:v=1:a=0[b]')
        acc, n_in = 'b', len(sub)
        for nm, tx, a, b, o in c['testi']:
            ta = T_(a) - a0
            if ta < -0.01 or ta > Lg:
                continue
            tb = (T_(b) - a0) if b is not None else Lg
            if o.get('barra_anim'):
                ins += ['-loop', '1', '-t', f'{Lg:.3f}', '-i', f'{D}/testi/{nm}_000.png']
                fil.append(f'[{n_in}:v]format=rgba,fade=in:st={max(0, ta - 0.1):.3f}:d=0.6:alpha=1[t{n_in}];[{acc}][t{n_in}]overlay=0:0:shortest=1[o{n_in}]')
                acc = f'o{n_in}'; n_in += 1
                s_, w_, k_, ritardo = o['barra_anim']; tl = T_((s_, w_, k_)) - a0 + ritardo
                ins += ['-framerate', str(FPS), '-start_number', '0', '-i', f'{D}/testi/{nm}_%03d.png']
                fil.append(f'[{n_in}:v]format=rgba,setpts=PTS+{tl:.3f}/TB[t{n_in}];[{acc}][t{n_in}]overlay=0:0:eof_action=repeat:enable=\'gte(t,{tl:.3f})\'[o{n_in}]')
                acc = f'o{n_in}'; n_in += 1; continue
            ins += ['-loop', '1', '-t', f'{Lg:.3f}', '-i', f'{D}/testi/{nm}.png']
            fx = '' if o.get('scatto') else f'fade=in:st={max(0, ta - 0.1):.3f}:d=0.6:alpha=1,'
            if o.get('fuori'):
                fx += f'fade=out:st={tb - 1.2:.3f}:d=1.2:alpha=1,'
            en = f":enable='between(t,{ta:.3f},{tb:.3f})'"
            fil.append(f'[{n_in}:v]format=rgba,{fx}null[t{n_in}];[{acc}][t{n_in}]overlay=0:0:shortest=1{en}[o{n_in}]')
            acc = f'o{n_in}'; n_in += 1
        fil.append(f'[{acc}]format=yuv420p[v]')
        ff(*ins, '-filter_complex', ';'.join(fil), '-map', '[v]', '-t', f'{Lg:.3f}', '-r', str(FPS), '-c:v', 'libx264', '-crf', '16', out)
        pezzi.append((out, dur_))
    ins = sum([['-i', p] for p, _ in pezzi], []); fil, acc, off = [], '0:v', 0.0
    for i in range(1, len(pezzi)):
        off += pezzi[i - 1][1]; fil.append(f'[{acc}][{i}:v]xfade=transition=fade:duration={XF}:offset={off:.3f}[x{i}]'); acc = f'x{i}'
    # audio: voce + suoni (file, da, a, volume, in loop)
    au = [f'[{len(pezzi)}:a]aformat=channel_layouts=stereo[vo]']; mix = ['[vo]']; extra = []
    for j, (f, da, a, vol, loop) in enumerate(c['suoni']):
        t0 = T_(da); t1 = T_(a) if a is not None else tot; d = t1 - t0
        extra += ['-i', f'{SU}/{f}']; k = len(pezzi) + 1 + j
        lp = f'aloop=loop=-1:size=2e9,' if loop else ''
        fo = f'afade=t=out:st={max(0, d - 1.5):.3f}:d=1.5,' if loop else ''
        au.append(f'[{k}:a]aformat=channel_layouts=stereo,{lp}atrim=0:{d:.3f},afade=t=in:d=0.8,{fo}volume={vol},adelay={int(t0 * 1000)}|{int(t0 * 1000)}[s{j}]')
        mix.append(f'[s{j}]')
    au.append(''.join(mix) + f'amix=inputs={len(mix)}:duration=first:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11[a]')
    fil.append(f'[{acc}]format=yuv420p[v];' + ';'.join(au))
    ff(*ins, '-i', f'{D}/audio/voce.wav', *extra, '-filter_complex', ';'.join(fil), '-map', '[v]', '-map', '[a]', '-t', f'{tot:.3f}',
       '-r', str(FPS), '-c:v', 'libx264', '-preset', 'slow', '-crf', '21', '-c:a', 'aac', '-b:a', '192k', '-ar', '48000',
       '-map_metadata', '-1', '-metadata', 'title=Eredità Invisibili', '-metadata', 'artist=Achille Pagliaro',
       '-movflags', '+faststart', f'{D}/{c["nome"]}.mp4')
    for p, _ in pezzi:
        os.remove(p)
    print('montato', c['nome'], f'{tot:.2f} s')


if __name__ == '__main__':
    n = int(sys.argv[1]); {'voce': voce, 'monta': monta}[sys.argv[2]](n)
