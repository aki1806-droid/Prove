"""Voce del reel «In bocca al lupo OSS Azienda Zero» (CISL FP Padova Rovigo, provinciale): «Achille nuovo 1» via HeyGen
(elevenlabs, eleven_v4), una traccia con i sette blocchi uniti da <break time="1.6s"/> (request fpiWGsbomwwMmRhLO8pM).
Tagli con ../chicedomani/voci.py: pause >0,45 s → 0,35 s, atempo 1,16 (regola CLAUDE.md per HeyGen passante).
"""
import os, sys
QUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(os.path.dirname(QUI), 'chicedomani'))
from voci import blocchi, scrivi  # noqa: E402

if __name__ == '__main__':
    a = blocchi('achille-auguri', QUI)
    scrivi('pdro-auguri-concorso-oss-azienda-zero', [(f'{QUI}/achille-auguri-grezzo.mp3', b, 'achille') for b in a])
