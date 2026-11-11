"""Voci a personaggi per i 20 format 12 «Spiegato a mia nonna» e 15 «Reparto 7» (Achille 10/11: «Una voce per personaggio»;
nonna D4 Anna, nipote D3 Sofia, Rosa D2 Italian Exec Warmth, Marco U1 Matteo, coordinatrice D1 Elena Rossi, Giulia D5 Isabella;
narratore Luca Ward). Ogni personaggio ha una traccia (eleven_v4 via chiave API HeyGen) con le sue battute separate da pause;
ogni battuta si taglia come un blocco (chicedomani/voci.py taglia) e le battute di una scena si mettono in fila con 0,25 s di stacco.
Il testo di ogni scena resta quello del pacchetto, diviso fra chi parla.
    python3 strumenti/venti/dialoghi.py scarica [ferie] -> tracce <nome>-dlg-grezzo.mp3 / .json
    python3 strumenti/venti/dialoghi.py taglia [ferie]  -> audio/ dei due progetti
"""
import json, os, subprocess, sys
QUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(QUI)); sys.path.insert(0, os.path.join(os.path.dirname(QUI), 'chicedomani'))
from voci import blocchi, taglia, ff, dur, PR  # noqa: E402
VOCI = {'ward': 'e4bd8d8a357f41a99502309874733c16', 'achille': '9b851842ce54449fb9ff501751ca0271', 'nonna': 'QD0T9jWnOtSiLp7pynGA',
        'nipote': 'zQDTlelC5IkNZLUKANwx', 'rosa': '0CaEdjmy45s5ORTgNRBI', 'marco': 'vw1H2Z7qp6p1pBatQwJ3', 'coord': 'NbxMtccexuT0yDzrrTij',
        'giulia': 'rW8vWrZJH2sxKav7WJVV'}
PG = {'nonna': 'pdro-20f-12-spiegato-a-mia-nonna', 'sitcom': 'pdro-20f-15-reparto-7-sitcom', 'ferie': 'pdro-20f-15-reparto-7-ep2-le-ferie'}
SCENE = {
    'nonna': [[('nipote', 'Se lo capisce mia nonna, lo capisci anche tu. Oggi: il fondo pensione.')],
              [('nonna', "E cos'è questo Perseo?"),
               ('nipote', "Metti da parte qualcosa ogni mese per la pensione, nonna. L'Azienda aggiunge la sua parte, e ci sono vantaggi fiscali.")],
              [('nonna', "E perché non l'hai fatto prima? Vai da quelli della CISL, che te lo spiegano bene!")],
              [('achille', "Ha ragione la nonna. Per gli iscritti CISL FP c'è un corso gratuito su Perseo Sirio, spiegato semplice. CISL FP Padova Rovigo.")]],
    'sitcom': [[('ward', "Reparto sette. Rosa, operatrice socio sanitaria da trent'anni. Marco, appena assunto. La coordinatrice, sempre al telefono. E Giulia, delegata CISL FP.")],
               [('marco', 'Rosa, ho scambiato la domenica con un collega, gli ho detto di sì su WhatsApp!'),
                ('rosa', "E l'hai detto alla coordinatrice? Il cambio turno va autorizzato, tesoro.")],
               [('coord', 'Un attimo che rispondo. Chi ha cambiato la domenica senza dirmelo?'), ('ward', 'Arriva Giulia:'),
                ('giulia', 'il cambio si concorda e si fa autorizzare. Così tutti sono in regola.')],
               [('achille', "Reparto sette torna la prossima settimana. E se nel tuo reparto succede qualcosa che merita una puntata, raccontacelo. CISL FP Padova Rovigo.")]],
    # Reparto 7 ep. 2 (testo di Claude approvato da Achille l'11/11)
    'ferie': [[('ward', "Reparto sette, episodio due: le ferie. Marco ha già prenotato il mare. Rosa ha già fatto le valigie. E la coordinatrice? Al telefono.")],
              [('marco', 'Rosa, ho prenotato due settimane ad agosto. Il piano ferie? Lo chiedo dopo.'),
               ('rosa', 'Dopo? Le ferie si chiedono per tempo, tesoro.')],
              [('coord', 'Marco, mi manca uno a Ferragosto. Ti richiamo dalle ferie?'), ('ward', 'Arriva Giulia:'),
               ('giulia', "Se le chiede per tempo, due settimane di fila d'estate gli spettano. E se lo richiamate, il viaggio lo paga l'Azienda.")],
              [('achille', 'Le tue ferie le hai già chieste? Se hai dubbi sul piano ferie, parliamone. CISL FP Padova Rovigo.')]]}
# quali puntate: argomento 2 (es. «ferie»); senza, le prime due. Le tracce di ogni gruppo hanno un suffisso proprio.
KK = tuple(sys.argv[2].split(',')) if len(sys.argv) > 2 else ('nonna', 'sitcom')
SUF = '' if KK == ('nonna', 'sitcom') else '-' + '-'.join(KK)
B = ' <break time="1.6s"/> '


def battute():
    """per ogni personaggio, le sue battute in ordine (tutte e due le puntate)"""
    out = {}
    for k in KK:
        for sc in SCENE[k]:
            for chi, t in sc:
                out.setdefault(chi, []).append(t)
    return out


if __name__ == '__main__':
    if sys.argv[1] == 'scarica':
        from heygen_api import voce
        for chi, tt in battute().items():
            f = f'{QUI}/{chi}-dlg{SUF}-testo.txt'; open(f, 'w').write(B.join(tt))
            voce(VOCI[chi], f, f'{QUI}/{chi}-dlg{SUF}')
    else:
        bl = {chi: [b for b in blocchi(f'{chi}-dlg{SUF}', QUI) if b] for chi in battute()}
        usati = {chi: 0 for chi in bl}
        for k in KK:
            d = f'{PR}/{PG[k]}/audio'; os.makedirs(f'{d}/wav', exist_ok=True); os.makedirs(f'{d}/finali', exist_ok=True)
            tempi, parole, t0 = [], {}, 0.0
            for i, sc in enumerate(SCENE[k], 1):
                sid = f'S{i:02d}'; pz, pw, off = [], [], 0.0
                for j, (chi, _) in enumerate(sc):
                    b = bl[chi][usati[chi]]; usati[chi] += 1
                    w = f'{d}/wav/{sid}_{j}.wav'
                    tipo = 'achille' if chi == 'achille' else 'narratore'
                    pp = taglia(f'{QUI}/{chi}-dlg{SUF}-grezzo.mp3', b, tipo, w)
                    pw += [{**x, 'a': round(x['a'] + off, 3), 'b': round(x['b'] + off, 3), 'chi': chi} for x in pp]
                    pz.append(w); off += dur(w) + (0.25 if j + 1 < len(sc) else 0)
                wav = f'{d}/wav/{sid}.wav'
                if len(pz) == 1:
                    ff('-i', pz[0], wav)
                else:
                    fil = ''.join(f'[{q}:a]' + (f'apad=pad_dur=0.25[x{q}];' if q + 1 < len(pz) else f'anull[x{q}];') for q in range(len(pz)))
                    fil += ''.join(f'[x{q}]' for q in range(len(pz))) + f'concat=n={len(pz)}:v=0:a=1[o]'
                    ff(*sum([['-i', p] for p in pz], []), '-filter_complex', fil, '-map', '[o]', '-ar', '44100', '-ac', '1', wav)
                for p in pz:
                    os.remove(p) if p != wav else None
                ff('-i', wav, '-c:a', 'libmp3lame', '-b:a', '192k', '-id3v2_version', '3', f'{d}/finali/{sid}.mp3')
                parole[sid] = pw
                tempi.append({'id': sid, 'tipo': 'achille' if sc[0][0] == 'achille' else 'narratore', 'inizio': round(t0, 4), 'durata': round(dur(wav), 4)})
                t0 += dur(wav)
            json.dump(tempi, open(f'{d}/tempi-scene.json', 'w'), indent=1)
            json.dump(parole, open(f'{d}/parole.json', 'w'), ensure_ascii=False, indent=0)
            open(f'{d}/lista.txt', 'w').write(''.join(f"file 'wav/{t['id']}.wav'\n" for t in tempi))
            ff('-f', 'concat', '-safe', '0', '-i', f'{d}/lista.txt', '-c', 'copy', f'{d}/voce-completa.wav')
            ff('-i', f'{d}/voce-completa.wav', '-c:a', 'libmp3lame', '-b:a', '192k', '-id3v2_version', '3', f'{d}/voce-completa.mp3')
            print(PG[k], ' '.join(f"{t['id']}:{t['durata']:.1f}" for t in tempi), f'totale {t0:.1f}')
