"""Voce del promo «Kit Contratto» 9:16 (CISL FP Padova Rovigo): Achille nuovo 1 via HeyGen (elevenlabs, eleven_v4),
le sei scene in una traccia (blocchi uniti da <break time="1.6s"/>), testi di testi/script.txt senza modifiche.
Rifatta al posto di quella del pacchetto (eleven_multilingual_v2, atempo 1,12). Tipo achille: pause >0,45 → 0,35 s,
atempo 1,16 (regola CLAUDE.md per la strada HeyGen).
"""
import os, sys
QUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(os.path.dirname(QUI), 'chicedomani'))
from voci import blocchi, scrivi  # noqa: E402

if __name__ == '__main__':
    scrivi('pdro-kit-contratto-promo', [(f'{QUI}/achille-kit-promo-grezzo.mp3', b, 'achille') for b in blocchi('achille-kit-promo', QUI)])
