"""Voci dei due reel di rilancio dei corsi (progressioni verticali, concorso OSS).

Una traccia «Luca Ward» con i 5+5 blocchi del narratore e una traccia «Achille nuovo 1» con le due
chiusure (HeyGen create_speech, motore elevenlabs, eleven_v4). Tagli e tempi delle parole con gli
stessi strumenti della serie «Chi c'è domani» (../chicedomani/voci.py).
"""
import os, sys
QUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(os.path.dirname(QUI), 'chicedomani'))
from voci import blocchi, scrivi  # noqa: E402

PROG = ['pdro-corso-progressioni-verticali', 'pdro-corso-concorso-oss']
ward = blocchi('ward-corsi', QUI); ach = blocchi('achille-corsi', QUI)
for k, nome in enumerate(PROG if len(sys.argv) == 1 else []):
    # regia OSS S01: «Pausa di un secondo dopo "su questa immagine"»
    pause = [{'immagine.': 1.0} if (k, j) == (1, 0) else {} for j in range(5)]
    scrivi(nome, [(f'{QUI}/ward-corsi-grezzo.mp3', ward[k * 5 + j], 'narratore', pause[j]) for j in range(5)]
           + [(f'{QUI}/achille-corsi-grezzo.mp3', ach[k], 'achille')])

# Versione 2 del reel OSS (18/10/2026, richiesta di Achille: più riferimenti al concorso di Azienda Zero,
# 84 posti, prime prove il 27 ottobre): nuove tracce, sostituiscono la v1 (copiata in audio/v1/).
if len(sys.argv) > 1 and sys.argv[1] == 'oss-v2':
    w2 = blocchi('ward-oss-v2', QUI); a2 = blocchi('achille-oss-v2', QUI)
    scrivi(PROG[1], [(f'{QUI}/ward-oss-v2-grezzo.mp3', w2[j], 'narratore', {'immagine.': 1.0} if j == 0 else {}) for j in range(5)]
           + [(f'{QUI}/achille-oss-v2-grezzo.mp3', a2[0], 'achille')])
