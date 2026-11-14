"""Voci a personaggi per i 20 format 12 «Spiegato a mia nonna» e 15 «Reparto 7» (Achille 10/11: «Una voce per personaggio»;
nonna D4 Anna, nipote D3 Sofia, Rosa D2 Italian Exec Warmth, Marco U1 Matteo, coordinatrice D1 Elena Rossi, Giulia D5 Isabella;
narratore Luca Ward). Ogni personaggio ha una traccia (eleven_v4 via chiave API HeyGen) con le sue battute separate da pause;
ogni battuta si taglia come un blocco (chicedomani/voci.py taglia) e le battute di una scena si mettono in fila con 0,25 s di stacco.
Il testo di ogni scena resta quello del pacchetto, diviso fra chi parla.
    python3 strumenti/venti/dialoghi.py scarica [ferie] -> tracce <nome>-dlg-grezzo.mp3 / .json
    python3 strumenti/venti/dialoghi.py taglia [ferie]  -> audio/ dei due progetti
"""
import json, os, subprocess, sys
QUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(QUI)); sys.path.insert(0, os.path.join(os.path.dirname(QUI), 'chicedomani'))
from voci import blocchi, taglia, ff, dur, PR  # noqa: E402
VOCI = {'ward': 'e4bd8d8a357f41a99502309874733c16', 'achille': '9b851842ce54449fb9ff501751ca0271', 'nonna': 'QD0T9jWnOtSiLp7pynGA',
        'nipote': 'zQDTlelC5IkNZLUKANwx', 'rosa': '0CaEdjmy45s5ORTgNRBI', 'marco': 'vw1H2Z7qp6p1pBatQwJ3', 'coord': 'NbxMtccexuT0yDzrrTij',
        'giulia': 'rW8vWrZJH2sxKav7WJVV'}
PG = {'nonna': 'pdro-20f-12-spiegato-a-mia-nonna', 'sitcom': 'pdro-20f-15-reparto-7-sitcom', 'ferie': 'pdro-20f-15-reparto-7-ep2-le-ferie', 'reper': 'pdro-20f-15-reparto-7-ep3-la-reperibilita', 'perm': 'pdro-20f-15-reparto-7-ep4-i-permessi', 'form': 'pdro-20f-15-reparto-7-ep5-la-formazione', 'pag11': 'pdro-aggiornamento-pagamenti-novembre-2026'}
SCENE = {
    'nonna': [[('nipote', 'Se lo capisce mia nonna, lo capisci anche tu. Oggi: il fondo pensione.')],
              [('nonna', "E cos'è questo Perseo?"),
               ('nipote', "Metti da parte qualcosa ogni mese per la pensione, nonna. L'Azienda aggiunge la sua parte, e ci sono vantaggi fiscali.")],
              [('nonna', "E perché non l'hai fatto prima? Vai da quelli della CISL, che te lo spiegano bene!")],
              [('achille', "Ha ragione la nonna. Per gli iscritti CISL FP c'è un corso gratuito su Perseo Sirio, spiegato semplice. CISL FP Padova Rovigo.")]],
    'sitcom': [[('ward', "Reparto sette. Rosa, operatrice socio sanitaria da trent'anni. Marco, appena assunto. La coordinatrice, sempre al telefono. E Giulia, delegata CISL FP.")],
               [('marco', 'Rosa, ho scambiato la domenica con un collega, gli ho detto di sì su WhatsApp!'),
                ('rosa', "E l'hai detto alla coordinatrice? Il cambio turno va autorizzato, tesoro.")],
               [('coord', 'Un attimo che rispondo. Chi ha cambiato la domenica senza dirmelo?'), ('ward', 'Arriva Giulia:'),
                ('giulia', 'il cambio si concorda e si fa autorizzare. Così tutti sono in regola.')],
               [('achille', "Reparto sette torna la prossima settimana. E se nel tuo reparto succede qualcosa che merita una puntata, raccontacelo. CISL FP Padova Rovigo.")]],
    # Reparto 7 ep. 2 (testo di Claude approvato da Achille l'11/11)
    'ferie': [[('ward', "Reparto sette, episodio due: le ferie. Marco ha già prenotato il mare. Rosa ha già fatto le valigie. E la coordinatrice? Al telefono.")],
              [('marco', 'Rosa, ho prenotato due settimane ad agosto. Il piano ferie? Lo chiedo dopo.'),
               ('rosa', 'Dopo? Le ferie si chiedono per tempo, tesoro.')],
              [('coord', 'Marco, mi manca uno a Ferragosto. Ti richiamo dalle ferie?'), ('ward', 'Arriva Giulia:'),
               ('giulia', "Se le chiede, quindici giorni lavorativi di fila d'estate gli spettano. E se lo richiamate, il viaggio glielo rimborsa l'Azienda.")],
              [('achille', 'Le tue ferie le hai già chieste? Se hai dubbi sul piano ferie, parliamone. CISL FP Padova Rovigo.')]],
    # Reparto 7 ep. 3 (testo di Claude verificato sul CCNL, art. 31, approvato da Achille l'11/11)
    'reper': [[('ward', "Reparto sette, episodio tre: la reperibilità. Marco è di turno, ma da casa. Rosa ne ha già fatte troppe. E la coordinatrice? Al telefono, ovviamente.")],
              [('marco', 'Rosa, ero reperibile e mi hanno chiamato alle tre di notte. Ma quelle ore chi me le paga?'),
               ('rosa', 'Se ti chiamano e lavori, tesoro, non è un favore.')],
              [('coord', "Rosa, mi copri un'altra reperibilità? Sarebbe l'ottava questo mese."), ('ward', 'Arriva Giulia:'),
               ('giulia', 'Non più di sette al mese. E se ti chiamano, le ore lavorate si pagano come straordinario, o si recuperano.')],
              [('achille', 'Le tue reperibilità ti tornano? Se hai dubbi su turni o pagamenti, parliamone. CISL FP Padova Rovigo.')]],
    # Reparto 7 ep. 4 (CCNL 2.11.2022 art. 51; approvato da Achille il 12/11)
    'perm': [[('ward', "Reparto sette, episodio quattro: i permessi. Marco deve sbrigare una cosa sua. Rosa conta le ore. E la coordinatrice? Al telefono, come sempre.")],
             [('marco', 'Rosa, mi servono due ore per una cosa mia. Devo inventarmi una scusa?'),
              ('rosa', 'Nessuna scusa, tesoro. Basta chiederle.')],
             [('coord', "Marco, due ore di permesso? E la giustificazione dov'è?"), ('ward', 'Arriva Giulia:'),
              ('giulia', "Per motivi personali ci sono diciotto ore l'anno, senza dover giustificare niente. Si chiedono, e si concedono se il servizio lo permette.")],
             [('achille', 'Le tue diciotto ore le conosci? Se hai dubbi sui permessi, parliamone. CISL FP Padova Rovigo.')]],
    # Reparto 7 ep. 5 (CCNL 2022-2024 art. 48; approvato da Achille il 13/11)
    'form': [[('ward', "Reparto sette, episodio cinque: la formazione. Marco deve fare i crediti formativi. Rosa ha già fatto tutti i corsi. E la coordinatrice? Al telefono, come sempre.")],
             [('marco', 'Rosa, il corso obbligatorio lo devo fare a casa, la sera, e magari pure pagarlo?'),
              ('rosa', 'A casa, la sera? Tesoro, quello è lavoro.')],
             [('coord', 'Marco, il corso fallo nel fine settimana, qui non ho nessuno.'), ('ward', 'Arriva Giulia:'),
              ('giulia', "La formazione obbligatoria è servizio a tutti gli effetti, e i costi sono dell'Azienda. Ventiquattro ore l'anno sono garantite a tutti.")],
             [('achille', 'I tuoi crediti formativi li hai? Se non ti mettono in condizione di farli, parliamone. CISL FP Padova Rovigo.')]],
    # Aggiornamento pagamenti novembre 2026 (testo approvato da Achille il 14/11): narratore + chiusura, nessun personaggio
    'pag11': [[('ward', 'Ultime notizie dal pianeta cedolino. Niente panico, niente sfere di cristallo: solo fatti. Ecco come stanno le cose.')],
              [('ward', "Il conguaglio della produttività arriva con lo stipendio di novembre. Nessun miracolo e nessun colpo di scena: solo lavoro serio con l'Amministrazione.")],
              [('ward', 'Sul contratto nazionale, la firma definitiva è attesa, presumibilmente, a dicembre. Appena ci sarà la data certa, la saprete da noi. Come sempre.')],
              [('ward', 'E a chi nei mesi scorsi si era lanciato in previsioni che nemmeno Nostradamus, date, cifre e catastrofi assortite, un consiglio affettuoso: la sfera di cristallo rimettetela in soffitta.')],
              [('ward', "Perché c'è una bella differenza tra chi lavora sui fatti e chi fa proclami sul nulla. I primi portano risultati. I secondi, al massimo, l'oroscopo della settimana.")],
              [('achille', 'Noi continuiamo come sempre: poche promesse, molti fatti, e vi teniamo costantemente aggiornati. Per dubbi sul tuo cedolino, scrivici. CISL FP Padova Rovigo.')]]}
# quali puntate: argomento 2 (es. «ferie»); senza, le prime due. Le tracce di ogni gruppo hanno un suffisso proprio.
KK = tuple(sys.argv[2].split(',')) if len(sys.argv) > 2 else ('nonna', 'sitcom')
SUF = '' if KK == ('nonna', 'sitcom') else '-' + '-'.join(KK)
B = ' <break time="1.6s"/> '


def battute():
    """per ogni personaggio, le sue battute in ordine (tutte e due le puntate)"""
    out = {}
    for k in KK:
        for sc in SCENE[k]:
            for chi, t in sc:
                out.setdefault(chi, []).append(t)
    return out


if __name__ == '__main__':
    if sys.argv[1] == 'scarica':
        from heygen_api import voce
        solo = os.environ.get('SOLO', '').split(',') if os.environ.get('SOLO') else None   # rifà solo questi personaggi
        for chi, tt in battute().items():
            if solo and chi not in solo: continue
            f = f'{QUI}/{chi}-dlg{SUF}-testo.txt'; open(f, 'w').write(B.join(tt))
            voce(VOCI[chi], f, f'{QUI}/{chi}-dlg{SUF}')
    else:
        bl = {chi: [b for b in blocchi(f'{chi}-dlg{SUF}', QUI) if b] for chi in battute()}
        usati = {chi: 0 for chi in bl}
        for k in KK:
            d = f'{PR}/{PG[k]}/audio'; os.makedirs(f'{d}/wav', exist_ok=True); os.makedirs(f'{d}/finali', exist_ok=True)
            tempi, parole, t0 = [], {}, 0.0
            for i, sc in enumerate(SCENE[k], 1):
                sid = f'S{i:02d}'; pz, pw, off = [], [], 0.0
                for j, (chi, _) in enumerate(sc):
                    b = bl[chi][usati[chi]]; usati[chi] += 1
                    w = f'{d}/wav/{sid}_{j}.wav'
                    tipo = 'achille' if chi == 'achille' else 'narratore'
                    pp = taglia(f'{QUI}/{chi}-dlg{SUF}-grezzo.mp3', b, tipo, w)
                    pw += [{**x, 'a': round(x['a'] + off, 3), 'b': round(x['b'] + off, 3), 'chi': chi} for x in pp]
                    pz.append(w); off += dur(w) + (0.25 if j + 1 < len(sc) else 0)
                wav = f'{d}/wav/{sid}.wav'
                if len(pz) == 1:
                    ff('-i', pz[0], wav)
                else:
                    fil = ''.join(f'[{q}:a]' + (f'apad=pad_dur=0.25[x{q}];' if q + 1 < len(pz) else f'anull[x{q}];') for q in range(len(pz)))
                    fil += ''.join(f'[x{q}]' for q in range(len(pz))) + f'concat=n={len(pz)}:v=0:a=1[o]'
                    ff(*sum([['-i', p] for p in pz], []), '-filter_complex', fil, '-map', '[o]', '-ar', '44100', '-ac', '1', wav)
                for p in pz:
                    os.remove(p) if p != wav else None
                ff('-i', wav, '-c:a', 'libmp3lame', '-b:a', '192k', '-id3v2_version', '3', f'{d}/finali/{sid}.mp3')
                parole[sid] = pw
                tempi.append({'id': sid, 'tipo': 'achille' if sc[0][0] == 'achille' else 'narratore', 'inizio': round(t0, 4), 'durata': round(dur(wav), 4)})
                t0 += dur(wav)
            json.dump(tempi, open(f'{d}/tempi-scene.json', 'w'), indent=1)
            json.dump(parole, open(f'{d}/parole.json', 'w'), ensure_ascii=False, indent=0)
            open(f'{d}/lista.txt', 'w').write(''.join(f"file 'wav/{t['id']}.wav'\n" for t in tempi))
            ff('-f', 'concat', '-safe', '0', '-i', f'{d}/lista.txt', '-c', 'copy', f'{d}/voce-completa.wav')
            ff('-i', f'{d}/voce-completa.wav', '-c:a', 'libmp3lame', '-b:a', '192k', '-id3v2_version', '3', f'{d}/voce-completa.mp3')
            print(PG[k], ' '.join(f"{t['id']}:{t['durata']:.1f}" for t in tempi), f'totale {t0:.1f}')
