"""Voce di «Il filo che ci unisce» (AV1, 9:16, CISL FP Padova Rovigo, provinciale): Achille nuovo 1
(9b851842ce54449fb9ff501751ca0271) via API HeyGen come passante (../heygen_api.py, eleven_v4), scelta di Achille.

Dal COPIONE_AVATAR.txt del pacchetto, una scena per blocco (il segmento 8 del copione diviso fra S09, su v02 all'alba, e
S10, sul cartello del titolo), blocchi uniti da <break time="1.6s"/>. Cambi a voce, autorizzati da Achille: «il 24
novembre» → «il ventiquattro novembre»; «Il 1522 risponde» → «L'uno cinque due due risponde» (a schermo e nei sottotitoli
restano in cifre). I «…» del copione restano: il motore ci fa le sue pause, che i tagli accorciano.
Tagli profilo «achille» di ../chicedomani/voci.py (pause oltre 0,45 s → 0,35 s, atempo 1,16); in S04 la pausa prima di
«ascolto» della regia (PAUSE).

    python3 strumenti/filo/voci.py genera
    python3 strumenti/filo/voci.py taglia      -> pdro-av1-il-filo-che-ci-unisce/audio/{wav/Sxx.wav, parole.json, tempi-scene.json}
"""
import json, os, sys
QUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(QUI)); sys.path.insert(0, os.path.join(os.path.dirname(QUI), 'chicedomani'))
import voci as cv  # noqa: E402

D = os.path.join(os.path.dirname(os.path.dirname(QUI)), 'pdro-av1-il-filo-che-ci-unisce')
VOCE = '9b851842ce54449fb9ff501751ca0271'
TESTI = {
    'S02': "Mi chiamo Achille Pagliaro e sono il segretario della CISL FP Padova Rovigo.… Ogni giorno, nei nostri ospedali e "
           "nei nostri uffici, incontro donne che si prendono cura di tutti.… Ma a volte, a casa,… nessuno si prende cura di loro.",
    'S03': "La violenza non sempre fa rumore.… A volte comincia con un messaggio: dove sei,… con chi sei.… E piano piano ti "
           "allontana da te stessa.",
    'S04': "Per questo, il ventiquattro novembre, abbiamo scelto di parlare di ascolto.… Di ascolto di sé.",
    'S05': "Con quattro donne straordinarie:… Elena Paccagnella,… Daniela Lucangeli,… Sara Cordella… e Luisa Morbiato.",
    'S06': "All'ingresso riceverete un filo rosso.… Lo annoderemo insieme a un grande telaio.… Perché ogni filo, da solo, si "
           "spezza.… Insieme diventa una trama.",
    'S07': "E alla fine ci siederemo a una tavola condivisa, a spezzare il pane insieme.… Il gesto più antico della fiducia.",
    'S08': "Se oggi qualcuno ti sta facendo sentire piccola,… sbagliata,… sola… voglio che tu sappia una cosa.… Non sei sola.… "
           "L'uno cinque due due risponde,… sempre.",
    'S09': "E se puoi, vieni.… Anche solo per ascoltare.… A volte basta un posto accanto a qualcuno.",
    'S10': "Ti aspetto.… Il tuo posto è lì.",
}
PAUSE = {'S04': {'parlare': 0.7}}          # regia: «pausa di 1 s prima di "ascolto"» (accorciata: Achille non vuole pause lunghe)
IN_CAMERA = ['S02', 'S04', 'S08']

if __name__ == '__main__':
    if sys.argv[1:] == ['genera']:
        t = ' <break time="1.6s"/> '.join(TESTI.values()); open(f'{QUI}/achille-filo-testo.txt', 'w').write(t)
        print(len(t), 'caratteri')
        from heygen_api import voce
        voce(VOCE, f'{QUI}/achille-filo-testo.txt', f'{QUI}/achille-filo')
    else:
        b = [x for x in cv.blocchi('achille-filo', QUI) if x]
        assert len(b) == len(TESTI), len(b)
        A = f'{D}/audio'; os.makedirs(f'{A}/wav', exist_ok=True); tempi, parole = [], {}
        for (sid, testo), pw in zip(TESTI.items(), b):
            parole[sid] = cv.taglia(f'{QUI}/achille-filo-grezzo.mp3', pw, 'achille', f'{A}/wav/{sid}.wav', PAUSE.get(sid))
            d = cv.dur(f'{A}/wav/{sid}.wav'); tempi.append({'id': sid, 'durata': round(d, 3)})
            n = len(testo.replace('…', ' ').split())
            print(sid, f'{d:5.2f} s', len(pw), 'parole' + ('' if len(pw) == n else f' (attese {n}!)'))
        json.dump(tempi, open(f'{A}/tempi-scene.json', 'w'), indent=1)
        json.dump(parole, open(f'{A}/parole.json', 'w'), ensure_ascii=False, indent=0)
