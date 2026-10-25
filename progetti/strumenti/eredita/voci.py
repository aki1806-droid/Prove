"""Voci dei reel e short «Eredità Invisibili» (libro di Achille, R01-R02, S01-S03): voce «Achille nuovo 1» via HeyGen
(elevenlabs, eleven_v4), una traccia per video con i blocchi di scena uniti da <break time="1.6s"/>. Tagli con
../chicedomani/voci.py, profilo achille: pause >0,45 s → 0,35 s, atempo 1,16 (non silenceremove + 1,12 come dice il
pacchetto, che presuppone ElevenLabs diretto: con HeyGen passante la voce è più lenta, regola CLAUDE.md).
Le scene senza voce (tavola capitolo, chiusura) vengono dopo quelle parlate, quindi Sxx coincide con il piano.
S01 (short «Quand'è l'ultima volta?») S05: mezzo secondo di pausa tra le due frasi, come chiede il piano.
"""
import os, sys
QUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(os.path.dirname(QUI), 'chicedomani'))
from voci import blocchi, scrivi  # noqa: E402

VIDEO = {'r01': 'ei-r01-credevo-di-crescerli', 'r02': 'ei-r02-un-sasso-in-tasca', 's01': 'ei-s01-quand-e-l-ultima-volta',
         's02': 'ei-s02-venti-minuti-per-le-scarpe', 's03': 'ei-s03-perche-quel-signore'}
PAUSE = {('s01', 4): {'tempo.': 0.5}}

if __name__ == '__main__':
    for k, nome in VIDEO.items():
        bl = blocchi(f'achille-{k}', QUI)
        scrivi(nome, [(f'{QUI}/achille-{k}-grezzo.mp3', b, 'achille', PAUSE.get((k, i), {})) for i, b in enumerate(bl)])
