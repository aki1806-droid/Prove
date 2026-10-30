"""Voce fuori campo dei cinque trailer «Brividi» per «Sentirsi per sentire» (24 novembre 2026, CISL FP Padova Rovigo,
provinciale). Voce privata «DONNA VOCE CALDA PER VIDEO» (87fd26ac5b68410d93b36b2d44a19f8d, ElevenLabs) via API HeyGen
(../heygen_api.py, eleven_v4), scelta di Achille.

Tutte le frasi dei cinque trailer in una sola traccia (blocchi uniti da <break time="1.6s"/>), in ordine di trailer e di
scena; poi ogni blocco si taglia (../chicedomani/voci.py) e si salva nella cartella del suo trailer:
  <Tn>/audio/wav/Sxx.wav, <Tn>/audio/parole.json, <Tn>/audio/tempi-scene.json (durata di ogni blocco per scena).
Profilo «pensiero»: pause oltre 0,6 s → 0,4 s (v1: 0,9 → 0,7; troppo lente per Achille), nessun atempo. A voce «ventiquattro novembre» (scelta di Achille); a schermo e nei sottotitoli resta «24».

    python3 strumenti/brividi/voci.py genera     -> voce-brividi.json + voce-brividi-grezzo.mp3
    python3 strumenti/brividi/voci.py taglia
    python3 strumenti/brividi/voci.py genera|taglia P     (serie P: P2, P3 -> voce-serieP)
    python3 strumenti/brividi/voci.py genera|taglia Q     (P4, P5 a due voci -> voce-serieQ-donna, voce-serieQ-uomo)
"""
import json, os, sys
QUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(QUI)); sys.path.insert(0, os.path.join(os.path.dirname(QUI), 'chicedomani'))
import voci as cv  # noqa: E402

PR = os.path.dirname(os.path.dirname(QUI))
BASE = os.path.join(PR, 'pdro-brividi-24-novembre')
TRAILER = ['T1_LA_PORTA_20s', 'T2_DOVE_SEI_30s', 'T3_IL_NODO_45s', 'T4_CHI_CURA_60s', 'T5_ACCENDIAMO_UNA_LUCE_75s']
# serie P (pacchetto «SERIE parte 1», 30/10): P2 e P3 in una traccia a parte, così T1-T5 restano come consegnati
NOME = 'voce-brividi'
if 'P' in sys.argv[2:]:
    TRAILER, NOME = ['P2_SCARPE_ROSSE_30s', 'P3_PRENDERE_PAROLA_40s'], 'voce-serieP'
VOCE = '87fd26ac5b68410d93b36b2d44a19f8d'
# serie Q (pacchetti «SERIE parte 2 e 3», 30/10): P4 con la voce di Achille (la regia chiede un uomo, «meglio un padre o un
# delegato vero»), P5 a coro: una frase per voce, alternate, e l'ultima detta da tutte e due insieme (scelte di Achille)
VOCI = {'donna': (VOCE, 'pensiero'), 'uomo': ('9b851842ce54449fb9ff501751ca0271', 'achille')}
CHI = {('P5_PADOVA_SI_ACCENDE_90s', n): c for n, c in
       [(2, 'donna'), (3, 'uomo'), (4, 'donna'), (5, 'uomo'), (6, 'donna'), (8, 'uomo'), (9, 'donna'), (10, 'uomo'),
        (11, 'donna'), (12, 'tutti'), (15, 'donna')]}
if 'Q' in sys.argv[2:]:
    TRAILER, NOME = ['P4_ANCHE_GLI_UOMINI_60s', 'P5_PADOVA_SI_ACCENDE_90s'], 'voce-serieQ'


def chi(t, n):
    return CHI.get((t, n), 'uomo' if t.startswith('P4') else 'donna')
A_VOCE = [('Il 24 novembre', 'Il ventiquattro novembre'), ('il 24 novembre', 'il ventiquattro novembre'), ('chiama il 1522', "chiama l'uno cinque due due")]   # 1522 cifra per cifra come in «Il filo»
cv.TEMPO['pensiero'] = (0.6, 0.4, 1.0)      # v2: pause più corte (Achille: «troppe pause lunghe»)
# pause della regia dentro una frase: (trailer, scena): {parola: secondi}
PAUSE = {('T3_IL_NODO_45s', 'S04'): {'rabbia.': 0.7}}   # «Silenzio di 1 s prima di "Basta ascoltarsi"»


def righe():
    """[(trailer, scena, testo detto)] nell'ordine della traccia."""
    out = []
    for t in TRAILER:
        for s in json.load(open(f'{BASE}/{t}/storyboard.json'))['scene']:
            v = s['voce_fuori_campo'].strip()
            if v:
                for a, b in A_VOCE:
                    v = v.replace(a, b)
                out.append((t, s['n'], v))
    return out


def coro(cmd):
    """Serie Q: una traccia per voce; le frasi di tutti e due finiscono in tutte e due le tracce e poi si sommano."""
    r = righe(); from heygen_api import voce
    for v, (vid, prof) in VOCI.items():
        mie = [x for x in r if chi(x[0], x[1]) in (v, 'tutti')]; nome = f'{NOME}-{v}'
        if cmd == 'genera':
            testo = ' <break time="1.6s"/> '.join(x[2] for x in mie)
            open(f'{QUI}/{nome}-testo.txt', 'w').write(testo); print(v, len(mie), 'frasi', len(testo), 'caratteri')
            voce(vid, f'{QUI}/{nome}-testo.txt', f'{QUI}/{nome}')
            continue
        b = [x for x in cv.blocchi(nome, QUI) if x]
        assert len(b) == len(mie), (v, len(b), len(mie))
        for (t, n, testo), pw in zip(mie, b):
            A = f'{BASE}/{t}/audio'; os.makedirs(f'{A}/wav', exist_ok=True); sid = f'S{n:02d}'
            out = f'{A}/wav/{sid}.wav' if chi(t, n) != 'tutti' else f'{A}/wav/{sid}_{v}.wav'
            json.dump(cv.taglia(f'{QUI}/{nome}-grezzo.mp3', pw, prof, out, PAUSE.get((t, sid))),
                      open(out[:-4] + '.json', 'w'), ensure_ascii=False)
            print(v, t[:2], sid, f'{cv.dur(out):5.2f} s', len(pw), 'parole' + ('' if len(pw) == len(testo.split()) else ' (diverse!)'))
    if cmd == 'genera':
        return
    for t in TRAILER:
        A = f'{BASE}/{t}/audio'; tempi, parole = [], {}
        for tt, n, _ in r:
            if tt != t:
                continue
            sid = f'S{n:02d}'; w = f'{A}/wav/{sid}'
            if chi(t, n) == 'tutti':          # all'unisono: le due voci insieme, partono nello stesso istante
                # la voce più corta si allunga fino alla fine dell'altra, così le due frasi finiscono insieme
                pd, pu = (json.load(open(f'{w}_{v}.json')) for v in ('donna', 'uomo'))
                k = pu[-1]['b'] / pd[-1]['b']
                cv.ff('-i', f'{w}_donna.wav', '-i', f'{w}_uomo.wav', '-filter_complex',
                      f'[0:a]volume=0.8[a];[1:a]atempo={k:.4f},volume=0.8[b];[a][b]amix=inputs=2:duration=longest:normalize=0',
                      f'{w}.wav')
                p = pd
            else:
                p = json.load(open(f'{w}.json'))
            for f in [f'{w}.json', f'{w}_donna.wav', f'{w}_uomo.wav', f'{w}_donna.json', f'{w}_uomo.json']:
                if os.path.exists(f):
                    os.remove(f)
            parole[sid] = p; tempi.append({'id': sid, 'durata': round(cv.dur(f'{w}.wav'), 3)})
        json.dump(tempi, open(f'{A}/tempi-scene.json', 'w'), indent=1)
        json.dump(parole, open(f'{A}/parole.json', 'w'), ensure_ascii=False, indent=0)


if __name__ == '__main__':
    if 'Q' in sys.argv[2:]:
        coro(sys.argv[1])
    elif sys.argv[1:2] == ['genera']:
        r = righe(); testo = ' <break time="1.6s"/> '.join(x[2] for x in r)
        open(f'{QUI}/{NOME}-testo.txt', 'w').write(testo); print(len(r), 'frasi', len(testo), 'caratteri')
        from heygen_api import voce
        voce(VOCE, f'{QUI}/{NOME}-testo.txt', f'{QUI}/{NOME}')
    elif sys.argv[1:2] == ['taglia']:
        r = righe(); b = cv.blocchi(NOME, QUI)
        b = [x for x in b if x]
        assert len(b) == len(r), (len(b), len(r))
        src = f'{QUI}/{NOME}-grezzo.mp3'
        for t in TRAILER:
            A = f'{BASE}/{t}/audio'; os.makedirs(f'{A}/wav', exist_ok=True)
            tempi, parole = [], {}
            for (tt, n, testo), pw in zip(r, b):
                if tt != t:
                    continue
                sid = f'S{n:02d}'
                atteso = len(testo.split())
                parole[sid] = cv.taglia(src, pw, 'pensiero', f'{A}/wav/{sid}.wav', PAUSE.get((t, sid)))
                d = cv.dur(f'{A}/wav/{sid}.wav'); tempi.append({'id': sid, 'durata': round(d, 3)})
                print(t[:2], sid, f'{d:5.2f} s', len(pw), 'parole' + ('' if len(pw) == atteso else f' (attese {atteso}!)'))
            json.dump(tempi, open(f'{A}/tempi-scene.json', 'w'), indent=1)
            json.dump(parole, open(f'{A}/parole.json', 'w'), ensure_ascii=False, indent=0)
