#!/usr/bin/env python3
"""
Taglia una traccia unica di ElevenLabs sui confini dei blocchi.

Perche' serve: una lezione generata in due tracce lunghe ha il tono uniforme,
ma HeyGen vuole una traccia per scena. Bisogna sapere a che secondo finisce
ogni blocco, e la trascrizione di ElevenLabs NON restituisce i tempi per
parola: da qui questo giro.

    python3 tagli.py allinea  <dir>          -> tagli.json + prova.mp3
    python3 tagli.py correggi <dir>          -> legge code.json, riscrive tagli.json
    python3 tagli.py applica  <dir>          -> mp3u/*.mp3 + durate.json

`dir` deve contenere blocchi.json, chunks.json e unico_A_raw.mp3 / unico_B_raw.mp3.

Il passaggio che conta e' la verifica: `allinea` produce anche prova.mp3, che
contiene 1,6 s prima di ogni taglio. Trascrivendolo si legge, parola per
parola, se ogni taglio cade dove deve. Da solo l'allineamento sbaglia: sulla
2.1 nove tagli su trentasei.
"""
import json, os, re, subprocess, sys, unicodedata, difflib

FILTRO = ("silenceremove=start_periods=1:start_silence=0.03:start_threshold=-45dB:"
          "stop_periods=-1:stop_duration=0.20:stop_silence=0.14:stop_threshold=-45dB,"
          "atempo=1.12")
CPS = 16.5          # caratteri di parlato al secondo, sul grezzo
FINESTRA = 1.6      # quanto audio prima di ogni taglio finisce nella prova


def _ff(*a):
    return subprocess.run(['ffmpeg', *a], capture_output=True, text=True)


def durata(p):
    t = re.findall(r'time=(\d+):(\d+):(\d+\.\d+)', _ff('-i', p, '-f', 'null', '-').stderr)
    h, m, s = t[-1]
    return int(h) * 3600 + int(m) * 60 + float(s)


def silenzi_a(p, d=0.20, db=45):
    err = _ff('-i', p, '-af', f'silencedetect=noise=-{db}dB:d={d}', '-f', 'null', '-').stderr
    a = [float(x) for x in re.findall(r'silence_start: ([\d.]+)', err)]
    b = [float(x) for x in re.findall(r'silence_end: ([\d.]+)', err)]
    return list(zip(a, b))


def silenzi(p, d=0.20):
    err = _ff('-i', p, '-af', f'silencedetect=noise=-45dB:d={d}', '-f', 'null', '-').stderr
    a = [float(x) for x in re.findall(r'silence_start: ([\d.]+)', err)]
    b = [float(x) for x in re.findall(r'silence_end: ([\d.]+)', err)]
    return list(zip(a, b))


def norm(s):
    s = unicodedata.normalize('NFD', s.lower())
    s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
    s = s.replace("'", ' ').replace('’', ' ')
    return re.sub(r'[^a-z0-9]+', ' ', s).strip()


SCONTO = 9.0   # peso dello sconto per la lunghezza della pausa


def allinea(d):
    """Sceglie i confini e prepara la prova di verifica."""
    B = {x['id']: x['text'] for x in json.load(open(f'{d}/blocchi.json'))}
    ch = json.load(open(f'{d}/chunks.json'))
    tagli, meta = {}, []
    for k in 'AB':
        ids, tot = ch[k], durata(f'{d}/unico_{k}_raw.mp3')
        sil = sorted(silenzi(f'{d}/unico_{k}_raw.mp3'))

        def parlato(t):                      # tempo al netto dei silenzi
            s = sum(min(b, t) - a for a, b in sil if a < t)
            return t - s

        S = parlato(tot)
        # I pesi sono i caratteri: il parlato scorre a velocita' quasi costante,
        # ed e' l'unico dato disponibile prima di aver tagliato.
        w = [len(B[i]) for i in ids]
        W = sum(w)
        atteso, c = [], 0
        for x in w[:-1]:
            c += x
            atteso.append(c / W * S)
        # I candidati sono le pause vere, a -45 dB: sono i punti dove finisce
        # una frase, e uno scarto di stima si corregge da solo perche' li'
        # accanto non c'e' nient'altro da scegliere. Un respiro a meta' frase
        # non deve entrare nell'elenco, altrimenti il confine ci si appoggia e
        # taglia dentro al blocco.
        # Fra un blocco e l'altro la pausa e' piu' lunga che dentro la frase.
        # Tenendo solo le piu' lunghe — poco piu' numerose dei confini da
        # collocare — restano quasi solo le pause di paragrafo, e la stima a
        # caratteri (che sbaglia di qualche secondo dove la lettura rallenta)
        # non ha piu' un respiro a meta' frase su cui appoggiarsi.
        tutte = [((a + b) / 2, b - a) for a, b in sil if 0.5 < (a + b) / 2 < tot - 0.5]
        quante = min(len(tutte), round(1.6 * (len(ids) - 1)) + 6)
        cand = sorted(x for x, _ in sorted(tutte, key=lambda p: -p[1])[:quante])
        # Unica eccezione: dove il fondo di sala sta sopra i -45 dB non si
        # trova nessuna pausa per decine di secondi. Quei buchi si riempiono
        # con le pause trovate a -40, che li' sono le uniche che ci sono.
        buchi = [(a, b) for a, b in zip([0.0] + cand, cand + [tot]) if b - a > 20]
        if buchi:
            largo = [(a + b) / 2 for a, b in silenzi_a(f'{d}/unico_{k}_raw.mp3', 0.18, 40)]
            cand = sorted(cand + [x for x in largo
                                  if any(a < x < b for a, b in buchi)])
        cs = [parlato(x) for x in cand]
        # Quanto e' lunga la pausa di ogni candidato. Serve perche' la stima
        # a caratteri sbaglia di qualche secondo dove la lettura rallenta (in
        # apertura, per esempio), e a quel punto il confine si appoggia al
        # respiro piu' vicino invece che alla pausa di paragrafo. La pausa fra
        # due blocchi e' sempre la piu' lunga li' intorno: darle uno sconto
        # rimette il confine dove finisce la frase.
        lung = {}
        for a, b in sil:
            lung[(a + b) / 2] = b - a
        prem = [SCONTO * min(lung.get(x, 0.20), 1.2) for x in cand]
        n, K, INF = len(cand), len(atteso), float('inf')
        def percorso(att):
            dp = [[INF] * n for _ in range(K)]
            par = [[-1] * n for _ in range(K)]
            for i in range(n):
                dp[0][i] = (cs[i] - att[0]) ** 2 - prem[i]
            for j in range(1, K):            # monotona: i confini non si scavalcano
                best, bi = INF, -1
                for i in range(n):
                    if i and dp[j - 1][i - 1] < best:
                        best, bi = dp[j - 1][i - 1], i - 1
                    if best < INF:
                        dp[j][i] = best + (cs[i] - att[j]) ** 2 - prem[i]
                        par[j][i] = bi
            i = min(range(n), key=lambda x: dp[K - 1][x])
            s = []
            for j in range(K - 1, -1, -1):
                s.append(i)
                i = par[j][i]
            s.reverse()
            return s

        sel = percorso(atteso)
        # Secondo giro. La stima a caratteri da' per scontato che si legga
        # sempre alla stessa velocita', e non e' vero: l'apertura e' piu' lenta
        # del resto. Lo scarto del primo giro, spianato su una decina di
        # confini, e' proprio quel rallentamento — e rimesso nella stima
        # sposta anche i confini che al primo giro erano finiti sulla pausa
        # sbagliata.
        resto = [cs[i] - a for i, a in zip(sel, atteso)]
        R = 4
        liscio = [sum(resto[max(0, j - R):j + R + 1]) / len(resto[max(0, j - R):j + R + 1])
                  for j in range(K)]
        sel = percorso([a + r for a, r in zip(atteso, liscio)])
        tagli[k] = [0.0] + [cand[i] for i in sel] + [tot]
        for j, i in enumerate(sel):
            meta.append({'chunk': k, 'fine_di': ids[j], 'inizio_di': ids[j + 1]})
    json.dump(tagli, open(f'{d}/tagli.json', 'w'), indent=0)
    json.dump(meta, open(f'{d}/prova_meta.json', 'w'), indent=0)
    prova(d, [m['fine_di'] for m in meta])
    print(f'{len(meta)} confini, prova.mp3 pronto — trascrivilo e scrivi le code in code.json')


def prova(d, blocchi):
    """Concatena la finestra prima di ogni taglio, separata da silenzio."""
    ch = json.load(open(f'{d}/chunks.json'))
    t = json.load(open(f'{d}/tagli.json'))
    os.makedirs(f'{d}/prova', exist_ok=True)
    righe = []
    for n, b in enumerate(blocchi):
        k = 'A' if b in ch['A'] else 'B'
        cut = t[k][ch[k].index(b) + 1]
        o = f'{d}/prova/p{n:03d}.wav'
        _ff('-y', '-ss', str(max(0, cut - FINESTRA)), '-t', str(FINESTRA),
            '-i', f'{d}/unico_{k}_raw.mp3', '-ar', '16000', '-ac', '1', o)
        righe.append(os.path.basename(o))
    # 2,5 s e non 1,5: con una pausa corta `scribe` a volte non chiude la frase
    # e due code finiscono attaccate, sfasando tutto il confronto di uno.
    _ff('-y', '-f', 'lavfi', '-t', '2.5', '-i', 'anullsrc=r=16000:cl=mono',
        '-ar', '16000', '-ac', '1', f'{d}/prova/gap.wav')
    with open(f'{d}/prova/lista.txt', 'w') as f:
        for i, r in enumerate(righe):
            if i:
                f.write("file 'gap.wav'\n")
            f.write(f"file '{r}'\n")
    _ff('-y', '-f', 'concat', '-safe', '0', '-i', f'{d}/prova/lista.txt',
        '-c:a', 'libmp3lame', '-b:a', '128k', f'{d}/prova.mp3')


def correggi(d):
    """code.json: le code trascritte, nell'ordine di prova_meta.json.

    Se la coda letta non e' la fine del blocco, si calcola di quanto spostare
    il taglio contando i caratteri fra le due posizioni. Trappola: se quella
    frase compare due volte nel copione la ricerca sbaglia bersaglio — in quel
    caso si prende il silenzio immediatamente precedente."""
    B = {x['id']: x['text'] for x in json.load(open(f'{d}/blocchi.json'))}
    ch = json.load(open(f'{d}/chunks.json'))
    t = json.load(open(f'{d}/tagli.json'))
    meta = json.load(open(f'{d}/prova_meta.json'))
    code = json.load(open(f'{d}/code.json'))
    cand = {k: sorted((a + b) / 2 for a, b in silenzi(f'{d}/unico_{k}_raw.mp3')) for k in 'AB'}
    # Ripiego: a volte il confine giusto e' una pausa cortissima che la soglia
    # normale non vede — dopo «Perche'.» nella 2.4 erano 0,15 s. Si guarda piu'
    # fine solo quando fra i candidati normali non ce n'e' nessuno utile.
    fini = {k: sorted((a + b) / 2 for a, b in silenzi(f'{d}/unico_{k}_raw.mp3', 0.08)) for k in 'AB'}
    n = 0
    for m, coda in zip(meta, code):
        if not coda:          # confine senza coda riconosciuta: si lascia stare
            continue
        k, ids = m['chunk'], ch[m['chunk']]
        j = ids.index(m['fine_di'])
        pezzi = [norm(B[i]) for i in ids]
        full = ' '.join(pezzi)
        fine = sum(len(p) + 1 for p in pezzi[:j + 1]) - 1
        coda = norm(coda)
        lo, hi = max(0, fine - 300), min(len(full), fine + 300)
        seg = full[lo:hi]
        # La coda sta per definizione vicino alla fine del blocco. Se le sue
        # ultime parole compaiono piu' volte nella finestra — succede, «mentre»
        # nella 2.2 — si prende l'occorrenza piu' vicina a `fine`, non la prima.
        pos = None
        parole = coda.split()
        for quante in (4, 3, 2, 1):       # nota: non chiamarla k, oscura il chunk
            if len(parole) < quante:
                continue
            ago = ' '.join(parole[-quante:])
            occ, i = [], seg.find(ago)
            while i >= 0:
                occ.append(lo + i + len(ago))
                i = seg.find(ago, i + 1)
            if occ:
                pos = min(occ, key=lambda p: abs(p - fine))
                break
        if pos is None:
            a, b, size = difflib.SequenceMatcher(None, seg, coda).find_longest_match(0, len(seg), 0, len(coda))
            if size < len(coda) * 0.5:
                print(f'  ! coda non riconosciuta per {m["fine_di"]}: «{coda}»')
                continue
            pos = lo + a + size + (len(coda) - b - size)
        delta = (fine - pos) / CPS
        if abs(delta) < 0.35:
            continue
        cur = t[k][j + 1]
        prec = t[k][j]
        # Il confine non puo' scavalcare il successivo: senza questo limite una
        # coda molto corta spinge il taglio dentro il blocco dopo, e la lista
        # dei confini smette di essere crescente.
        succ = t[k][j + 2] if j + 2 < len(t[k]) else float('inf')
        # Il confine corrente va sempre escluso: la coda trascritta dice che il
        # taglio e' fuori posto, quindi lasciarlo dov'e' contraddice la prova.
        # Senza questo, una coda corta (+0,4 s) finiva per «correggersi» su se
        # stessa, perche' il candidato piu' vicino alla stima era il vecchio.
        def scegli(pool):
            alto = min(cur + 6, succ - 0.5)
            return [c for c in pool if prec + 1.0 < c < alto and c > cur + 0.05] if delta > 0 else \
                   [c for c in pool if prec + 1.0 < c < cur - 0.15]
        ok = scegli(cand[k]) or scegli(fini[k])
        if not ok:
            continue
        nuovo = min(ok, key=lambda x: abs(x - (cur + delta)))
        print(f'  {m["fine_di"]}: {cur:.2f} -> {nuovo:.2f} ({delta:+.2f}s)  «{coda}»')
        t[k][j + 1] = nuovo
        n += 1
    for k in 'AB':
        assert all(t[k][i] < t[k][i + 1] for i in range(len(t[k]) - 1)), f'confini non monotoni in {k}'
    json.dump(t, open(f'{d}/tagli.json', 'w'), indent=0)
    prova(d, [m['fine_di'] for m in meta])
    print(f'{n} confini spostati — riprova.mp3 aggiornato')


def applica(d, tieni=None):
    """Taglia e monta i pezzi. `tieni` = {blocco: secondi} per allungare con apad."""
    ch = json.load(open(f'{d}/chunks.json'))
    t = json.load(open(f'{d}/tagli.json'))
    tieni = tieni or {}
    os.makedirs(f'{d}/mp3u', exist_ok=True)
    out = {}
    for k in 'AB':
        for i, b in enumerate(ch[k]):
            af = FILTRO + (f',apad=whole_dur={tieni[b]}' if b in tieni else '')
            p = f'{d}/mp3u/{b}.mp3'
            r = _ff('-y', '-ss', str(t[k][i]), '-to', str(t[k][i + 1]),
                    '-i', f'{d}/unico_{k}_raw.mp3', '-af', af,
                    '-c:a', 'libmp3lame', '-b:a', '128k', '-ar', '44100', '-ac', '1', p)
            if r.returncode:
                print('ERRORE', b, r.stderr[-200:])
                continue
            out[b] = round(durata(p), 2)
    json.dump(out, open(f'{d}/durate.json', 'w'), indent=0)
    tot = sum(out.values())
    print(f'{len(out)} blocchi, {tot:.1f} s = {int(tot//60)}:{int(tot%60):02d}')


if __name__ == '__main__':
    cmd, d = sys.argv[1], sys.argv[2]
    tieni = json.loads(sys.argv[3]) if len(sys.argv) > 3 else None
    {'allinea': allinea, 'correggi': correggi}.get(cmd, lambda x: applica(x, tieni))(d)
