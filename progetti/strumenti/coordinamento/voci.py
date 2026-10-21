"""Voci del reel «Verso il coordinamento» (CISL FP Padova Rovigo), tutte via HeyGen (elevenlabs, eleven_v4): Luca Ward per
le scene 1-7 in una traccia (blocchi uniti da <break time="1.6s"/>), Achille nuovo 1 per la chiusura (S08). Tagli con
../chicedomani/voci.py: narratore pause >0,6 s → 0,45 s; achille >0,45 → 0,35 e atempo 1,16 (non 1,12 come dice il
pacchetto: con HeyGen passante la voce è più lenta, regola CLAUDE.md).
Versione 2 (21/10/2026, video reso generico per tutti i territori, testi approvati da Achille): S08 nuova, narratore,
i tre canali WhatsApp (ward-coordinamento-canali); la chiusura di Achille diventa S09 con un testo senza il bando AOUP
dell'11/11 (achille-coordinamento-v2).
21/10, su richiesta di Achille (lo studio deve avvenire sempre fuori dall'orario di servizio): dalla S04 si toglie «Si
studia anche dopo il turno.» senza rigenerare la voce: la frase si ammutolisce in una copia della traccia (la pausa che
resta si accorcia come le altre) e le sue parole escono dal blocco.
"""
import os, sys
QUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(os.path.dirname(QUI), 'chicedomani'))
from voci import blocchi, scrivi  # noqa: E402
import subprocess  # noqa: E402
TOGLI = ['Si', 'studia', 'anche', 'dopo', 'il', 'turno.']     # S04

if __name__ == '__main__':
    g = lambda t: f'{QUI}/{t}-grezzo.mp3'
    w = blocchi('ward-coordinamento', QUI); c = blocchi('ward-coordinamento-canali', QUI); a = blocchi('achille-coordinamento-v2', QUI)
    b4 = w[3]; k = next(i for i in range(len(b4)) if [x['word'] for x in b4[i:i + len(TOGLI)]] == TOGLI)
    da, a_ = b4[k]['start'] - 0.06, b4[k + len(TOGLI) - 1]['end'] + 0.12
    muta = f'{QUI}/ward-coordinamento-senza-turno.mp3'
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-i', g('ward-coordinamento'), '-af',
                    f"volume=0:enable='between(t,{da:.3f},{a_:.3f})'", '-c:a', 'libmp3lame', '-b:a', '192k', muta], check=True)
    w[3] = b4[:k] + b4[k + len(TOGLI):]
    scrivi('pdro-verso-il-coordinamento', [(muta if i == 3 else g('ward-coordinamento'), b, 'narratore') for i, b in enumerate(w)] +
           [(g('ward-coordinamento-canali'), c[0], 'narratore'), (g('achille-coordinamento-v2'), a[0], 'achille')])
