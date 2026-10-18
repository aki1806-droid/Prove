"""Voce del promo «Kit Contratto» (video 1): Achille nuovo 1 via HeyGen (elevenlabs, eleven_v4), una traccia
con i 6 blocchi del pacchetto; tagli e tempi con ../chicedomani/voci.py (tipo achille: pause >0,45 s → 0,35 s,
atempo 1,16). La voce del pacchetto (eleven_multilingual_v2) resta in voce/ come riferimento.
"""
import os, sys
QUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(os.path.dirname(QUI), 'chicedomani'))
from voci import blocchi, scrivi  # noqa: E402

b = blocchi('achille-kit', QUI)
scrivi('kit-contratto-promo', [(f'{QUI}/achille-kit-grezzo.mp3', b[j], 'achille') for j in range(6)])
