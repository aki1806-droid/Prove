"""Voci del reel «Verso il coordinamento» (CISL FP Padova Rovigo), tutte via HeyGen (elevenlabs, eleven_v4): Luca Ward per
le scene 1-7 in una traccia (blocchi uniti da <break time="1.6s"/>), Achille nuovo 1 per la chiusura (S08). Tagli con
../chicedomani/voci.py: narratore pause >0,6 s → 0,45 s; achille >0,45 → 0,35 e atempo 1,16 (non 1,12 come dice il
pacchetto: con HeyGen passante la voce è più lenta, regola CLAUDE.md).
Versione 2 (21/10/2026, video reso generico per tutti i territori, testi approvati da Achille): S08 nuova, narratore,
i tre canali WhatsApp (ward-coordinamento-canali); la chiusura di Achille diventa S09 con un testo senza il bando AOUP
dell'11/11 (achille-coordinamento-v2).
"""
import os, sys
QUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(os.path.dirname(QUI), 'chicedomani'))
from voci import blocchi, scrivi  # noqa: E402

if __name__ == '__main__':
    g = lambda t: f'{QUI}/{t}-grezzo.mp3'
    w = blocchi('ward-coordinamento', QUI); c = blocchi('ward-coordinamento-canali', QUI); a = blocchi('achille-coordinamento-v2', QUI)
    scrivi('pdro-verso-il-coordinamento', [(g('ward-coordinamento'), b, 'narratore') for b in w] +
           [(g('ward-coordinamento-canali'), c[0], 'narratore'), (g('achille-coordinamento-v2'), a[0], 'achille')])
