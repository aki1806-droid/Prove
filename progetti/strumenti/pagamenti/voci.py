"""Voci del reel «Aggiornamento pagamenti ottobre 2026» (CISL FP Padova Rovigo, solo AOUP), tutte via HeyGen (elevenlabs,
eleven_v4): Luca Ward per le scene 1-5 in una traccia (blocchi uniti da <break time="1.6s"/>), Achille nuovo 1 per la
chiusura (S06). Tagli con ../chicedomani/voci.py: narratore pause >0,6 s → 0,45 s; achille >0,45 → 0,35 e atempo 1,16
(non eleven_multilingual_v2 e 1,12 come dice il pacchetto: con HeyGen passante la voce è più lenta, regola CLAUDE.md).
"""
import os, sys
QUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(os.path.dirname(QUI), 'chicedomani'))
from voci import blocchi, scrivi  # noqa: E402

if __name__ == '__main__':
    w = blocchi('ward-pagamenti', QUI); a = blocchi('achille-pagamenti', QUI)
    scrivi('pdro-aggiornamento-pagamenti-ottobre-2026', [(f'{QUI}/ward-pagamenti-grezzo.mp3', b, 'narratore') for b in w] +
           [(f'{QUI}/achille-pagamenti-grezzo.mp3', a[0], 'achille')])
