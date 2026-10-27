"""Voci del reel «Oncoematologia pediatrica – il confronto del 27 ottobre» (CISL FP Padova Rovigo, solo AOUP), via API
HeyGen (../heygen_api.py, elevenlabs eleven_v4): Luca Ward per le scene 1-8 in una traccia (blocchi uniti da
<break time="1.6s"/>, request en8UTmPt06ho4Dg6ivKU), Achille nuovo 1 per la chiusura S09 (request edI9N4tc7ETYlqUTl6V2).
Tagli con ../chicedomani/voci.py: narratore pause >0,6 s → 0,45 s; Achille >0,45 → 0,35 e atempo 1,16.
"""
import os, sys
QUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(os.path.dirname(QUI), 'chicedomani'))
from voci import blocchi, scrivi  # noqa: E402

if __name__ == '__main__':
    w = blocchi('ward-onco27', QUI); a = blocchi('achille-onco27', QUI)
    scrivi('pdro-oncoematologia-27-ottobre', [(f'{QUI}/ward-onco27-grezzo.mp3', b, 'narratore') for b in w] +
           [(f'{QUI}/achille-onco27-grezzo.mp3', a[0], 'achille')])
