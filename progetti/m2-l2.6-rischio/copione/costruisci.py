# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] La sicurezza delle cure e' parte costitutiva del diritto alla salute, e tutto il personale vi concorre. L'abbiamo vista nella lezione 1.5 come principio giuridico della legge 24."),
 (1,"chiaro",0,"Oggi vediamo come quel principio diventa metodo. Non e' un passaggio scontato: fra dire che la sicurezza e' un diritto e sapere come si costruisce ci sono cinquant'anni di studi sull'errore."),
 (1,"tenue",0,"E' una delle materie piu' presenti nei concorsi recenti, perche' tocca insieme organizzazione, responsabilita' e pratica quotidiana. Tre cose in una sola domanda, e per questo rende."),

 (2,"chiaro",0,"Prima di tutto il vocabolario, perche' qui le parole sono tecniche e i quiz le mescolano apposta. Near miss: errore che non ha raggiunto il paziente, perche' qualcuno o qualcosa lo ha intercettato in tempo."),
 (2,"chiaro",0,"Evento avverso: danno involontario al paziente dovuto alle cure, non alla malattia di base. Evento sentinella: evento avverso di particolare gravita', che segnala una disfunzione del sistema."),
 (2,"chiaro",0,"E complicanza: evento sfavorevole atteso, correlato alla patologia o alla procedura, e non necessariamente evitabile. Quattro parole, quattro cose diverse, e una sola delle quattro non presuppone un errore."),

 (3,"chiaro",0,"Tre distinzioni da fissare. Nel near miss l'errore c'e' stato ma il danno no. Nell'evento avverso il danno c'e'. E soprattutto: complicanza non e' sinonimo di errore, ed e' la distinzione che pesa di piu'."),
 (3,"profondo",1.2,"Una deiscenza in un paziente ad alto rischio, gestito correttamente, e' una complicanza, non un errore. Confonderle e' uno degli sbagli concettuali piu' comuni, e si paga in piu' di una domanda."),

 (4,"chiaro",0,"James Reason ha proposto due letture dell'errore, e la scelta fra le due decide tutto quello che viene dopo. L'approccio alla persona cerca il colpevole: individua chi ha sbagliato e lo sanziona."),
 (4,"chiaro",0,"L'approccio al sistema riconosce che gli esseri umani sbagliano, e che l'errore e' prevalentemente conseguenza di condizioni latenti. Si interviene quindi sulle difese, non sulle persone."),

 (5,"chiaro",0,"Da qui la distinzione fondamentale, ed e' quella su cui si costruiscono le domande. L'errore attivo e' dell'operatore in prima linea e ha effetto immediato: lo scambio di fiala, il salto di un controllo."),
 (5,"chiaro",0,"L'errore latente appartiene invece a chi progetta l'organizzazione, i processi e le tecnologie. E resta silente anche per anni, finche' una combinazione di circostanze non lo fa emergere."),
 (5,"chiaro",0,"Farmaci LASA riposti vicini. Turni con carichi insostenibili. Una procedura ambigua. L'assenza di un doppio controllo. Nessuno di questi e' un errore di qualcuno: sono errori di qualcosa."),

 (6,"chiaro",0,"Il modello del formaggio svizzero. Il sistema e' protetto da barriere successive, ciascuna con i suoi buchi: le criticita' latenti. Nessuna barriera e' integra, e nessuna da sola basta."),
 (6,"chiaro",0,"L'incidente accade quando i buchi di tutte le barriere si allineano. Ne discende il principio operativo della gestione del rischio: non basta chiudere un buco, servono piu' barriere indipendenti."),
 (6,"profondo",1.2,"E' la ragione per cui esistono insieme il doppio controllo, la check list e il braccialetto identificativo. Non sono tre modi di fare la stessa cosa: sono tre fette, e servono proprio perche' sono tre."),

 (7,"chiaro",0,"Gli strumenti si dividono in due famiglie, ed e' la domanda ricorrente. Reattivi, che guardano indietro: incident reporting, root cause analysis, audit clinico, significant event audit."),
 (7,"chiaro",0,"Proattivo, che guarda avanti: FMEA e FMECA, che analizzano un processo prima che accada qualcosa, per individuare dove potrebbe rompersi. Se il quiz chiede quale sia proattivo, la risposta e' questa."),

 (8,"chiaro",0,"L'incident reporting e' volontario, non punitivo e orientato all'apprendimento. Tre aggettivi, e ciascuno risponde a una obiezione diversa: perche' dovrei, che cosa rischio, a che cosa serve."),
 (8,"chiaro",0,"La scheda raccoglie che cosa e' accaduto, dove, quando e in quali condizioni. Non di chi e' la colpa: quella domanda non compare nel modulo, e la sua assenza non e' una dimenticanza ma una scelta."),
 (8,"chiaro",0,"E si segnalano anche i near miss. Anzi, soprattutto quelli: sono apprendimento gratuito, perche' nessuno si e' fatto male e il sistema ha comunque mostrato il punto in cui si rompe."),

 (9,"chiaro",0,"Due precisazioni che valgono una domanda. L'incident reporting non sostituisce la registrazione dell'evento in cartella clinica: la segnalazione va al gestore del rischio, la cartella resta un atto pubblico."),
 (9,"chiaro",0,"E non sostituisce gli obblighi di comunicazione previsti dalla legge. Sono piani distinti e vanno percorsi entrambi: segnalo, registro e comunico sono tre verbi, non tre modi di dire lo stesso."),

 (10,"chiaro",0,"La root cause analysis ricostruisce la sequenza degli eventi e identifica i fattori contribuenti: umani, organizzativi, tecnologici, ambientali, comunicativi. Cinque famiglie, e si guardano tutte."),
 (10,"chiaro",0,"Poi risale, chiedendosi ripetutamente perche', fino alle cause radice: quelle sulle quali un intervento impedisce il ripetersi. Fermarsi prima vuol dire tornare al punto di partenza."),
 (10,"profondo",1.2,"E il prodotto finale non e' un nome: e' un piano d'azione con responsabili e tempi. Se un'analisi finisce con una persona invece che con un'azione, non e' una root cause analysis."),

 (11,"chiaro",0,"Gli eventi sentinella sono eventi di particolare gravita', potenzialmente indicativi di una disfunzione del sistema, che richiedono indagine immediata e l'adozione di misure correttive."),
 (11,"chiaro",0,"Sono oggetto di monitoraggio nazionale attraverso il SIMES, il sistema informativo per il monitoraggio degli errori in sanita'. La sigla va saputa per esteso, ed e' quella che si chiede allo scritto."),

 (12,"chiaro",0,"Le Raccomandazioni ministeriali sono una ventina, e conviene conoscerne almeno il filo. La numero 1 sul cloruro di potassio e le soluzioni concentrate. La numero 2 sulla ritenzione di garze e strumenti."),
 (12,"chiaro",0,"La numero 3 sulla corretta identificazione di paziente, sito e procedura, che e' il cuore della check list di sala. La numero 5 sulla reazione trasfusionale da incompatibilita' AB0. La numero 7 sugli errori in terapia."),
 (12,"chiaro",0,"La numero 8 sulla violenza agli operatori. La numero 12 sui farmaci LASA. La numero 13 sulle cadute. La numero 17 sulla riconciliazione della terapia. E la numero 19 sulle forme orali solide."),

 (13,"chiaro",0,"Se ne ricordi tre, ricorda queste. La numero 7, errori in terapia. La numero 12, farmaci LASA, cioe' simili nell'aspetto o nel nome, dall'inglese look alike sound alike. La numero 13, cadute."),
 (13,"chiaro",0,"Sono le tre che compaiono piu' spesso nei quiz e nei casi delle prove infermieristiche, perche' sono le tre che toccano il lavoro di ogni turno. E se ne ricordi una sola, ricorda la numero 7."),

 (14,"chiaro",0,"Le barriere nella pratica quotidiana. Identificazione attiva: chiedere nome e data di nascita, non chiamare per cognome aspettando un cenno. E il braccialetto identificativo."),
 (14,"chiaro",0,"Doppio controllo per farmaci ad alto rischio e per le trasfusioni. Check list in sala operatoria e nelle procedure invasive. Standardizzazione di concentrazioni e diluizioni, per non ricalcolare ogni volta."),
 (14,"chiaro",0,"E rimozione dai reparti delle soluzioni concentrate pericolose. Riconciliazione farmacologica a ogni passaggio di setting. Consegne strutturate. E segnalazione. Sette barriere, e nessuna sostituisce le altre."),

 (15,"chiaro",0,"Una precisazione che all'orale fa un'ottima impressione. Se due operatori guardano insieme la stessa fiala, il secondo tende a confermare cio' che il primo ha gia' detto: e' un effetto noto e misurato."),
 (15,"profondo",1.2,"Non e' un controllo, e' un'eco. Il doppio controllo e' efficace solo se indipendente: ciascuno verifica separatamente, senza sapere l'esito dell'altro, e solo dopo ci si confronta."),

 (16,"chiaro",0,"La cultura no blame non significa assenza di responsabilita', ed e' l'equivoco piu' diffuso. Significa che la risposta di sistema all'errore non e' la caccia al colpevole."),
 (16,"profondo",1.2,"Perche' punire fa sparire le segnalazioni, e con esse la possibilita' di imparare. Un sistema che punisce non diventa piu' sicuro: diventa solo piu' silenzioso, e il silenzio somiglia alla sicurezza."),
 (16,"chiaro",0,"Resta ferma la distinzione della just culture fra errore umano, comportamento a rischio, cioe' la scorciatoia consapevole ma non malevola, e condotta temeraria o dolosa, che chiede una risposta disciplinare."),

 (17,"chiaro",0,"Dopo un evento avverso grave l'operatore coinvolto subisce un impatto psicologico rilevante e documentato: senso di colpa, insicurezza, disturbi del sonno, fino all'abbandono della professione."),
 (17,"chiaro",0,"Si parla di seconde vittime: la prima e' il paziente, la terza l'organizzazione. Un operatore lasciato solo dopo un errore e' meno sicuro nei mesi successivi, e le aziende prevedono percorsi di supporto."),

 (18,"chiaro",0,"Sul versante della persona assistita la buona pratica prevede la comunicazione trasparente dell'evento avverso: informare, spiegare, esprimere rammarico, dire quali azioni si adotteranno."),
 (18,"chiaro",0,"E' coerente con l'obbligo di trasparenza della legge 24 e con il Codice deontologico. E, dato controintuitivo ma documentato, riduce il contenzioso invece di aumentarlo: chi riceve una spiegazione ricorre meno al giudice."),

 (19,"chiaro",0,"Gli otto punti. Near miss non raggiunge il paziente, l'evento avverso si', l'evento sentinella impone indagine immediata e misure correttive. E la complicanza non e' un errore."),
 (19,"chiaro",0,"Reason: errore attivo e latente, formaggio svizzero, barriere multiple. Incident reporting e RCA reattivi, FMEA proattiva. Il reporting e' volontario, non punitivo, e copre anche i near miss."),
 (19,"chiaro",0,"[warm] Raccomandazioni 7, 12 e 13. Il doppio controllo funziona solo se indipendente. E no blame non significa nessuna responsabilita'. Nella prossima lezione la comunicazione, che e' anch'essa una barriera. A tra poco."),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1:"Apertura",2:"Il vocabolario esatto",3:"La distinzione che i quiz amano",
 4:"Reason: persona o sistema",5:"Errore attivo ed errore latente",6:"Il formaggio svizzero",
 7:"Reattivo o proattivo",8:"L'incident reporting",9:"Due precisazioni",
 10:"La root cause analysis",11:"Eventi sentinella e SIMES",12:"Le Raccomandazioni ministeriali",
 13:"Le tre da ricordare",14:"Le barriere nella pratica",15:"Il doppio controllo fatto male",
 16:"No blame e just culture",17:"Le seconde vittime",18:"La comunicazione trasparente",
 19:"Chiusura"}
CPS = 17.0   # misurata su 1.2, confermata da 1.3 a 1.8

blocchi=[]
for i,(cap,tema,posa,txt) in enumerate(BLOCCHI, start=2):
    blocchi.append({"id":f"s{i:02d}","capitolo":cap,"tema":tema,"posa":posa,"text":txt})

errori=[]
tot=sum(len(b["text"]) for b in blocchi)
nscene=len(blocchi)+2
if nscene>50: errori.append(f"scene {nscene} > 50")
for b in blocchi:
    if any(c in ACCENTATE for c in b["text"]):
        errori.append(f'{b["id"]}: vocale accentata -> ' + "".join(sorted({c for c in b["text"] if c in ACCENTATE})))
    if len(b["text"])>225: errori.append(f'{b["id"]}: {len(b["text"])} car, blocco troppo lungo')
tags=sum(len(re.findall(r"\[[a-z]+\]", b["text"])) for b in blocchi)
if tags>6: errori.append(f"tag di intenzione: {tags} > 6")

pose=sum(b["posa"] for b in blocchi)
parlato=tot/CPS+pose; durata=parlato+3+10
print(f"blocchi   {len(blocchi)}        scene {nscene}/50")
print(f"caratteri {tot}      media {tot/len(blocchi):.0f} car/blocco")
print(f"parlato   {parlato:.0f} s     montato {durata//60:.0f}:{durata%60:04.1f}   (stima a {CPS} car/s)")
print(f"tag       {tags}        pose {sum(1 for b in blocchi if b['posa'])}")
print()
cur=None
for b in blocchi:
    if b["capitolo"]!=cur:
        cur=b["capitolo"]; print(f'  cap {cur:2d}  {CAPITOLI[cur]}')
    p=f'  +{b["posa"]}s' if b["posa"] else ""
    print(f'    {b["id"]}  {len(b["text"]):3d} car  [{b["tema"]:8s}]{p} {b["text"][:52]}...')

# Lo stacco fra le due tracce: il confine di capitolo che divide i caratteri
# nel modo piu' pari, fra quelli che tengono ENTRAMBI i chunk sotto i 5.000.
# Prendere il primo confine dopo la meta' non basta: su 2.2 dava un chunk A da
# 5.072 caratteri, e la voce avrebbe rifiutato il testo.
LIMITE = 5000
cand = []
acc = 0
for i, b in enumerate(blocchi[:-1]):
    acc += len(b["text"]) + 1
    if b["capitolo"] != blocchi[i+1]["capitolo"]:
        cand.append((b["id"], acc, tot - acc))
buoni = [c for c in cand if c[1] <= LIMITE and c[2] <= LIMITE]
if buoni:
    stacco, a, bb = min(buoni, key=lambda c: abs(c[1] - c[2]))
    print(f"\nstacco tracce dopo {stacco}:  chunkA {a} car  ·  chunkB {bb} car   (limite {LIMITE})")
else:
    stacco, a, bb = min(cand, key=lambda c: max(c[1], c[2]))
    errori.append(f"nessuno stacco tiene i due chunk sotto {LIMITE}: il migliore e' "
                  f"{stacco} con {max(a, bb)} car. Serve un capitolo in piu'.")
    print(f"\nstacco tracce dopo {stacco}:  chunkA {a} car  ·  chunkB {bb} car   (limite {LIMITE})")
# tagli.py deve tagliare dove la voce ha davvero staccato: se le due costanti
# divergono, i blocchi finiscono sulla traccia sbagliata e non se ne accorge
# nessuno finche' non si guarda il video.
import pathlib as _pl
_tagli = _pl.Path("audio/tagli.py")
if _tagli.exists():
    _m = re.search(r'STACCO\s*=\s*"(s\d+)"', _tagli.read_text(encoding="utf-8"))
    if _m and _m.group(1) != stacco:
        errori.append(f'audio/tagli.py ha STACCO = "{_m.group(1)}", qui lo stacco e\' {stacco}')

print("\n" + ("OK, nessun errore" if not errori else "ERRORI:\n  " + "\n  ".join(errori)))
json.dump(blocchi, open("copione/blocchi.json","w",encoding="utf-8"), ensure_ascii=False, indent=1)

# I due chunk per la voce li scrive lo stesso file che ha scritto i blocchi:
# copiarli a mano significherebbe far divergere il copione dal testo letto,
# e la verifica della trascrizione confronterebbe due cose gia' diverse.
i = [b["id"] for b in blocchi].index(stacco)
for nome, gruppo in (("A", blocchi[:i+1]), ("B", blocchi[i+1:])):
    open(f"audio/chunk{nome}.txt","w",encoding="utf-8").write(
        "\n\n".join(b["text"] for b in gruppo) + "\n")
print(f"scritti audio/chunkA.txt e audio/chunkB.txt")
