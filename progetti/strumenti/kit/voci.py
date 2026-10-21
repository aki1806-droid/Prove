"""Voce del promo «Kit Contratto» 9:16 (CISL FP Padova Rovigo): Achille nuovo 1 via HeyGen (elevenlabs, eleven_v4),
le sei scene in una traccia (blocchi uniti da <break time="1.6s"/>), testi di testi/script.txt senza modifiche.
Rifatta al posto di quella del pacchetto (eleven_multilingual_v2, atempo 1,12).
21/10, su richiesta di Achille (il video deve dire dei tre canali WhatsApp e come entrarci): la scena 5 del pacchetto
(«Per averlo, basta entrare nel canale WhatsApp…») è sostituita da due scene con testi nuovi approvati da Achille,
traccia achille-kit-canali: S05 il modulo, S06 i tre canali; la chiusura diventa S07. Tipo achille: pause >0,45 → 0,35 s,
atempo 1,16 (regola CLAUDE.md per la strada HeyGen).
"""
import os, sys
QUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(os.path.dirname(QUI), 'chicedomani'))
from voci import blocchi, scrivi  # noqa: E402

if __name__ == '__main__':
    g = lambda t: f'{QUI}/{t}-grezzo.mp3'
    p, c = blocchi('achille-kit-promo', QUI), blocchi('achille-kit-canali', QUI)
    scrivi('pdro-kit-contratto-promo', [(g('achille-kit-promo'), b, 'achille') for b in p[:4]] +
           [(g('achille-kit-canali'), b, 'achille') for b in c] + [(g('achille-kit-promo'), p[5], 'achille')])
