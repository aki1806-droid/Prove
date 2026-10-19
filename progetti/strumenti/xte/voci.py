"""Voce del video «Convenzione XTE Salute» (CISL FP Padova Rovigo, 16:9): Achille nuovo 1 in tutto il video, avatar e
slide, via HeyGen (elevenlabs, eleven_v4), i 10 blocchi del pacchetto in una traccia (2.644 caratteri, sotto il limite di
~2.900) uniti da <break time="1.6s"/>. Tagli con ../chicedomani/voci.py, tipo achille: pause >0,45 s → 0,35 s, atempo 1,16.
"""
import os, sys
QUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(os.path.dirname(QUI), 'chicedomani'))
from voci import blocchi, scrivi  # noqa: E402

if __name__ == '__main__':
    scrivi('pdro-xte-salute', [(f'{QUI}/achille-xte-grezzo.mp3', b, 'achille') for b in blocchi('achille-xte', QUI)])
