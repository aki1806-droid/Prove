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
from voci import PR, blocchi, scrivi  # noqa: E402

VIDEO = {'r01': 'ei-r01-credevo-di-crescerli', 'r02': 'ei-r02-un-sasso-in-tasca', 's01': 'ei-s01-quand-e-l-ultima-volta',
         's02': 'ei-s02-venti-minuti-per-le-scarpe', 's03': 'ei-s03-perche-quel-signore',
         # seconda serie (25/10)
         'r03': 'ei-r03-propositi-al-contrario', 'r04': 'ei-r04-il-mare-che-non-sfoga', 'r05': 'ei-r05-i-mattoni-magici',
         'r06': 'ei-r06-cadere-mille-volte', 'r07': 'ei-r07-prendimi', 'r08': 'ei-r08-ti-voglio-bene-papa', 'r09': 'ei-r09-no',
         'r10': 'ei-r10-torno-al-giardino', 's04': 'ei-s04-una-lumaca', 's05': 'ei-s05-perdonare-in-due-minuti',
         's06': 'ei-s06-chiudi-il-pugno', 't01': 'ei-t01-teaser-il-sasso', 'v02': 'ei-v02-il-regalo-che-non-si-incarta',
         'v03': 'ei-v03-lettera-di-un-padre', 'y01': 'ei-y01-perche-ho-scritto-eredita-invisibili'}
PAUSE = {('s01', 4): {'tempo.': 0.5}}



def rinomina(nome):
    """scrivi() numera i blocchi S01, S02… in fila; dove nel piano le scene parlate non sono le prime (S06, T01, V03,
    Y01 hanno tavole mute in mezzo o in testa) si rinominano wav, mp3, tempi e parole con le scene vere del piano."""
    import json
    d = f'{PR}/{nome}'
    vere = [s['scena'] for s in json.load(open(f'{d}/PIANO_MONTAGGIO.json'))['scene'] if s.get('voce')]
    seq = [f'S{i:02d}' for i in range(1, len(vere) + 1)]
    if vere == seq:
        return
    for cart, est in (('wav', 'wav'), ('finali', 'mp3')):
        for a in seq:
            os.replace(f'{d}/audio/{cart}/{a}.{est}', f'{d}/audio/{cart}/_{a}.{est}')
        for a, b in zip(seq, vere):
            os.replace(f'{d}/audio/{cart}/_{a}.{est}', f'{d}/audio/{cart}/{b}.{est}')
    m = dict(zip(seq, vere))
    t = json.load(open(f'{d}/audio/tempi-scene.json'))
    for x in t:
        x['id'] = m[x['id']]
    json.dump(t, open(f'{d}/audio/tempi-scene.json', 'w'), indent=1)
    w = json.load(open(f'{d}/audio/parole.json'))
    json.dump({m[k]: v for k, v in w.items()}, open(f'{d}/audio/parole.json', 'w'), ensure_ascii=False, indent=0)
    open(f'{d}/audio/lista.txt', 'w').write(''.join(f"file 'wav/{x['id']}.wav'\n" for x in t))
    print(nome, 'scene rinominate', m)


if __name__ == '__main__':
    solo = sys.argv[1:]
    for k, nome in VIDEO.items():
        if solo and k not in solo:
            continue
        bl = blocchi(f'achille-{k}', QUI)
        scrivi(nome, [(f'{QUI}/achille-{k}-grezzo.mp3', b, 'achille', PAUSE.get((k, i), {})) for i, b in enumerate(bl)])
        rinomina(nome)
