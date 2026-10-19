"""Voci del terzo lotto dei pezzi dei libri, tutte via HeyGen (elevenlabs, eleven_v4), un blocco per scena unito da
<break time="1.6s"/>:
  - Luca Ward: i reel 13 «crescita», 14 «parola giusta», 15 «gentilezza», 16 «onorare la storia» (3 parti ciascuno) in una
    traccia sola; tipo narratore (pause >0,6 s → 0,45 s);
  - Achille nuovo 1: YouTube 17 «Leggo per te 2 – Valori guida» in tre tracce (parti 1-8, 9-15, 16-22, sotto i ~2.900
    caratteri) e 18 «Quindici minuti» in una; tipo achille (>0,45 → 0,35, atempo 1,16).
Nel 17 le parti 13-14 e 20-21 del pacchetto spezzano una frase a metà («con pazienti / difficili», «Invece / di evitare»):
sono due scene avatar di seguito, e si leggono come un blocco solo, senza pausa (scene.json le unisce, 20 scene).
"""
import os, sys
QUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(os.path.dirname(QUI), 'chicedomani'))
from voci import blocchi, scrivi  # noqa: E402

if __name__ == '__main__':
    g = lambda t: f'{QUI}/{t}-grezzo.mp3'
    w = blocchi('ward-reel-4-6', QUI)
    for k, p in enumerate(['libro-reel4-crescita', 'libro-reel-mappe2-parola-giusta', 'libro-reel5-gentilezza', 'libro-reel6-onorare-la-storia']):
        scrivi(p, [(g('ward-reel-4-6'), b, 'narratore') for b in w[3 * k:3 * k + 3]])
    scrivi('libro-yt17-leggo-per-te-2-valori', [(g(t), b, 'achille') for t in ['achille-yt17a', 'achille-yt17b', 'achille-yt17c'] for b in blocchi(t, QUI)])
    scrivi('libro-yt18-quindici-minuti', [(g('achille-yt18'), b, 'achille') for b in blocchi('achille-yt18', QUI)])
