"""Voci del quarto lotto (YouTube 19 «Il silenzio, la prima frontiera» e 20 «Gestire le emozioni»), Achille nuovo 1 via
HeyGen (elevenlabs, eleven_v4), un blocco per scena unito da <break time="1.6s"/>, tre tracce per video sotto i ~2.900
caratteri; tipo achille (pause >0,45 → 0,35 s, atempo 1,16). Numeri scritti in lettere (duemilaventitré, acca
ventiquattro, dieci minuti, quattro-sette-otto).
Nel 20 il pacchetto spezza due frasi a metà:
  - parti 13-14 («utilizzo la / tecnica del respiro»): due scene avatar di seguito, un blocco solo (scene.json, 21 scene);
  - parti 6-7 («dedico almeno dieci minuti / ogni giorno»): b-roll e poi avatar, che restano due scene. Si leggono senza
    pausa, poi il blocco si taglia a metà del respiro tra «minuti» e «ogni»: ognuna delle due metà si prende da una copia
    della traccia con l'altra metà ammutolita, così i bordi del parlato non sconfinano.
"""
import os, subprocess, sys
QUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(os.path.dirname(QUI), 'chicedomani'))
from voci import blocchi, scrivi  # noqa: E402


def muta(src, out, da=None, a=None):
    """Copia della traccia con il tratto [da, a] in silenzio (tempi invariati)."""
    e = f"between(t,{da or 0},{a or 1e6})"
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-i', src, '-af', f"volume=0:enable='{e}'",
                    '-c:a', 'libmp3lame', '-b:a', '192k', out], check=True)
    return out


if __name__ == '__main__':
    g = lambda t: f'{QUI}/{t}-grezzo.mp3'
    scrivi('libro-yt19-silenzio', [(g(t), b, 'achille') for t in ['achille-yt19a', 'achille-yt19b', 'achille-yt19c'] for b in blocchi(t, QUI)])
    a = blocchi('achille-yt20a', QUI)
    b6 = a[5]; k = next(i for i, w in enumerate(b6) if w['word'] == 'minuti') + 1
    m = (b6[k - 1]['end'] + b6[k]['start']) / 2
    p1 = muta(g('achille-yt20a'), f'{QUI}/achille-yt20a-fino-minuti.mp3', da=m)
    p2 = muta(g('achille-yt20a'), f'{QUI}/achille-yt20a-da-ogni.mp3', a=m)
    pezzi = [(g('achille-yt20a'), x, 'achille') for x in a[:5]] + [(p1, b6[:k], 'achille'), (p2, b6[k:], 'achille')]
    pezzi += [(g(t), x, 'achille') for t in ['achille-yt20b', 'achille-yt20c'] for x in blocchi(t, QUI)]
    scrivi('libro-yt20-emozioni', pezzi)
