"""Voci del reel «Il caso del volantino scomparso» (CISL FP Padova Rovigo, solo AOUP), via API HeyGen (../heygen_api.py,
elevenlabs eleven_v4) perché i crediti del connettore erano finiti: Luca Ward per le scene 1-8 in una traccia (blocchi uniti
da <break time="1.6s"/>, request Mb6JYcvSxsPoO8rjFcfy), Achille nuovo 1 per la chiusura S09 (request hVzVkwzepXHTNzpOF1O3; la prima, 7co83yQXgbaoflcpMRKr in v1/, diceva «io e Giovanna Vullo rispondiamo sempre»).
Tagli con ../chicedomani/voci.py: narratore pause >0,6 s → 0,45 s; achille >0,45 → 0,35 e atempo 1,16 (non
eleven_multilingual_v2, silenceremove e 1,12 come dice il pacchetto, che presuppone ElevenLabs diretto).
S08: pausa di 0,8 s dopo «foglio,» («puoi strappare un foglio, … ma non puoi strappare un'idea»), come chiede la regia.
"""
import os, sys
QUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(os.path.dirname(QUI), 'chicedomani'))
from voci import blocchi, scrivi  # noqa: E402

if __name__ == '__main__':
    w = blocchi('ward-volantini', QUI); a = blocchi('achille-volantini', QUI)
    scrivi('pdro-volantini-strappati', [(f'{QUI}/ward-volantini-grezzo.mp3', b, 'narratore') + (({'foglio,': 0.8},) if i == 7 else ()) for i, b in enumerate(w)] +
           [(f'{QUI}/achille-volantini-grezzo.mp3', a[0], 'achille')])
