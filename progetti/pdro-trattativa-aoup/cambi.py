"""Istante in cui entra la grafica B di ogni scena: la frase indicata in blocchi.json
(«sulla frase …») si cerca nel testo della voce, se ne stima l'inizio con lo stesso
calcolo dei sottotitoli e lo si aggancia all'inizio del tratto di parlato più vicino
(la frase segue sempre una pausa). Scrive audio/cambi-B.json (secondi dall'inizio scena)."""
import json, os, re
import sottotitoli as st

QUI = os.path.dirname(os.path.abspath(__file__))
B = json.load(open(os.path.join(QUI, 'blocchi.json')))['scene']
out = {}
for s, t in zip(B, st.TEMPI):
    frase = re.search(r'«(.+?)…?»', s['grafiche'][1]['da']).group(1).rstrip('…')
    parole = s['voce'].split()
    testa = frase.split()
    i = next(k for k in range(len(parole)) if [w.strip('.,:;?!') for w in parole[k:k + len(testa)]] == testa)
    seg = st.parlato(os.path.join(QUI, 'audio/wav', f"{t['id']}.wav"))
    stima = st.tempo_parole(parole, seg)[i]
    aggancio = min((a for a, _ in seg), key=lambda a: abs(a - stima))
    out[t['id']] = round(aggancio if abs(aggancio - stima) < 0.8 else stima, 3)
    print(t['id'], frase, f'stima {stima:.2f} → {out[t["id"]]:.2f}')
json.dump(out, open(os.path.join(QUI, 'audio/cambi-B.json'), 'w'), indent=1)
