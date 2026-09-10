# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Questa e' la lezione piu' densa del modulo, e una delle piu' redditizie di tutto il corso. La responsabilita' professionale c'e' nella prova scritta e torna nei casi della prova pratica."),
 (1,"profondo",0,"Ed e' la domanda con cui all'orale la commissione capisce se hai davvero interiorizzato quello che abbiamo detto finora. Il filo e' sempre quello: all'autonomia corrisponde la responsabilita'. Chi decide, risponde."),

 (2,"chiaro",0,"Quattro blocchi. I cinque piani della responsabilita' e la loro autonomia. Dolo e colpa, con le tre forme classiche."),
 (2,"chiaro",0,"Poi la legge 24 del 2017, la Gelli Bianco, che e' il cuore della lezione. E l'applicazione ai casi che ricorrono davvero: la prescrizione errata, l'attribuzione all'OSS, il lavoro in equipe."),

 (3,"chiaro",0,"Primo errore da smontare: non esiste «la» responsabilita'. Ne esistono cinque, con presupposti, giudici e sanzioni diversi. Vale la pena impararle con il giudice accanto, perche' e' quello che le distingue."),
 (3,"chiaro",0,"Penale: protegge la vita e l'incolumita', giudica il giudice penale, sanziona con la pena. Civile: protegge il diritto al risarcimento. Amministrativo contabile: protegge il patrimonio pubblico, e giudica la Corte dei conti."),
 (3,"chiaro",0,"Disciplinare: verso il datore di lavoro, dal rimprovero al licenziamento. Deontologico: davanti all'Ordine, dall'avvertimento alla radiazione. Cinque piani, cinque giudici diversi."),

 (4,"profondo",1.2,"E qui la frase da ripetere all'orale. I cinque piani sono autonomi e cumulabili."),
 (4,"chiaro",0,"L'assoluzione in sede penale non esclude automaticamente il risarcimento civile, ne' la sanzione disciplinare, ne' quella deontologica. Un solo fatto puo' aprire cinque strade parallele, non alternative."),

 (5,"chiaro",0,"Passiamo al titolo soggettivo. Nel dolo l'evento e' previsto e voluto. Nella colpa l'evento non e' voluto, ma si verifica lo stesso, e la differenza sta nel perche'."),
 (5,"chiaro",0,"Colpa generica: negligenza, imprudenza o imperizia. Colpa specifica: inosservanza di leggi, regolamenti, ordini o discipline. In sanita' il dolo e' raro: quasi tutto ruota attorno alla colpa."),

 (6,"chiaro",0,"Impariamole con l'esempio, perche' e' cosi' che si riconoscono nei quiz. Negligenza e' trascuratezza: ometto cio' che dovevo fare. Non rilevo i parametri, non registro in cartella, non segnalo un peggioramento."),
 (6,"chiaro",0,"Imprudenza e' avventatezza: agisco quando dovevo usare cautela. Somministro un farmaco senza verificare l'identita', mobilizzo da solo una persona che richiede due operatori."),
 (6,"chiaro",0,"Imperizia e' preparazione tecnica insufficiente: gestisco un presidio senza conoscerne la tecnica, non riconosco un segno d'allarme che la professione impone di conoscere."),

 (7,"tenue",0,"E qui si chiude un cerchio con la uno punto tre. L'imperizia e' il ponte fra formazione e responsabilita': il dovere di aggiornamento non e' un adempimento burocratico."),
 (7,"tenue",0,"La mancata acquisizione di conoscenze ormai consolidate nella professione puo' essere valutata come colpa. Non sapere cio' che oggi un infermiere deve sapere e', in sede di giudizio, un problema."),

 (8,"chiaro",0,"Passiamo al cuore: la legge 24 del 2017, che tutti chiamano Gelli Bianco. Regola pratica per i quiz: se in una domanda compare il 2017 accanto alle parole responsabilita' sanitaria, la risposta e' quasi sempre questa legge."),

 (9,"profondo",0,"Articolo primo, e va saputo quasi alla lettera. La sicurezza delle cure e' parte costitutiva del diritto alla salute."),
 (9,"chiaro",0,"Si realizza anche mediante l'insieme delle attivita' di prevenzione e gestione del rischio connesso all'erogazione delle prestazioni. E tutto il personale concorre, compresi i liberi professionisti."),
 (9,"chiaro",0,"Non e' una responsabilita' della direzione: e' di ciascuno. Da qui nascono incident reporting, audit e raccomandazioni ministeriali, che vedremo nel modulo due."),

 (10,"chiaro",0,"La legge costruisce anche un'architettura di sistema: il Garante per il diritto alla salute, affidato al Difensore civico regionale; i Centri regionali per il rischio sanitario; l'Osservatorio nazionale delle buone pratiche."),
 (10,"chiaro",0,"E introduce obblighi di trasparenza, con la consegna della documentazione sanitaria entro termini definiti. Sono i tre nomi che conviene saper citare: Garante, Centri regionali, Osservatorio."),

 (11,"chiaro",0,"Sul piano penale la legge ha introdotto l'articolo 590 sexies del codice penale. Lo schema e' preciso, e va tenuto tutto insieme perche' e' li' che i quiz lavorano."),
 (11,"chiaro",0,"Se l'evento si e' verificato per imperizia, e risultano rispettate le raccomandazioni delle linee guida accreditate ai sensi di legge, o in mancanza le buone pratiche clinico assistenziali, la punibilita' e' esclusa."),
 (11,"chiaro",0,"Sempre che quelle raccomandazioni risultino adeguate alle specificita' del caso concreto. Tre condizioni, e se ne cade una la non punibilita' non c'e'."),

 (12,"tenue",0,"Primo limite: vale solo per l'imperizia. Negligenza e imprudenza restano fuori, e chi non rileva i parametri non e' coperto da nessuna linea guida."),
 (12,"tenue",0,"Secondo limite: le linee guida devono essere accreditate secondo il sistema previsto dalla legge, oppure devono essere buone pratiche riconosciute."),
 (12,"tenue",0,"Terzo limite: devono essere adeguate al caso concreto. Applicare la linea guida giusta al paziente sbagliato non protegge nessuno. Il distrattore tipico estende la non punibilita' a ogni forma di colpa: e' sempre errato."),

 (13,"chiaro",0,"Sul piano civile la riforma introduce il doppio binario, ed e' forse la domanda piu' frequente in assoluto sulla Gelli Bianco. Due soggetti, due titoli, due prescrizioni."),
 (13,"chiaro",0,"La struttura risponde a titolo contrattuale, articoli 1218 e 1228 del codice civile, prescrizione decennale. L'esercente risponde di regola a titolo extracontrattuale, articolo 2043, prescrizione quinquennale."),
 (13,"profondo",1.2,"E l'onere della prova e' a carico del danneggiato, che deve provare fatto, danno, nesso e colpa. Dieci e cinque: memorizza i due numeri accoppiati ai due soggetti."),

 (14,"chiaro",0,"La logica e' indirizzare il paziente ad agire verso la struttura, dove l'onere probatorio gli e' piu' favorevole, alleggerendo la posizione del singolo professionista."),
 (14,"chiaro",0,"Sul piano processuale la legge prevede inoltre, come condizione di procedibilita', il tentativo di conciliazione attraverso il ricorso per accertamento tecnico preventivo, in alternativa alla mediazione."),

 (15,"chiaro",0,"E il professionista? La struttura che ha risarcito puo' rivalersi su di lui, ma solo in caso di dolo o colpa grave, e deve farlo entro un anno dall'avvenuto pagamento."),
 (15,"chiaro",0,"Per il dipendente pubblico la responsabilita' amministrativa e' giudicata dalla Corte dei conti, e l'importo e' limitato, per ciascun anno, a un multiplo della retribuzione annua lorda."),
 (15,"tenue",0,"Aggiungo un dettaglio che vale una domanda: il professionista che non e' stato parte del giudizio non e' vincolato dalla sentenza pronunciata contro la struttura."),

 (16,"chiaro",0,"Ultimo tassello. Le strutture devono avere copertura assicurativa, o analoghe misure, per la responsabilita' civile verso terzi e verso i prestatori d'opera, compresi i danni causati dal personale."),
 (16,"chiaro",0,"E' prevista l'azione diretta del danneggiato verso l'impresa di assicurazione. E al professionista e' richiesto di provvedere alla copertura per la colpa grave."),

 (17,"chiaro",0,"Una panoramica rapida dei reati che compaiono nella pratica: omicidio colposo e lesioni colpose, omissione di atti d'ufficio, omissione di soccorso, abbandono di persone incapaci, maltrattamenti."),
 (17,"chiaro",0,"Poi violenza privata e sequestro per la contenzione priva dei presupposti, falsita' in atto pubblico per le annotazioni alterate, rivelazione di segreto, esercizio abusivo, e peculato."),

 (18,"chiaro",0,"Fermiamoci sulla documentazione, perche' e' il punto in cui molti candidati perdono i casi. La cartella clinica e quella infermieristica sono atti pubblici: l'annotazione falsa o alterata integra falso in atto pubblico."),
 (18,"chiaro",0,"La correzione si fa senza cancellare, lasciando leggibile il dato precedente, con data e firma. Non e' una formalita': e' quello che rende la cartella una prova e non un racconto."),
 (18,"profondo",1.4,"[serious] E vale un principio pratico durissimo. Cio' che non e' documentato si presume non fatto. Puoi aver fatto tutto correttamente: se non e' scritto, in giudizio non esiste."),

 (19,"chiaro",0,"Nel lavoro in equipe agiscono due principi opposti. Il principio di affidamento: ciascuno puo' confidare nella correttezza dell'operato altrui, e non risponde dell'errore che non era riconoscibile."),
 (19,"chiaro",0,"Ma cade quando l'errore altrui e' evidente e riconoscibile con la diligenza esigibile da un professionista. Tradotto sulla prescrizione errata: non ti nascondi dietro la prescrizione se l'errore era palese."),
 (19,"tenue",0,"Chiedi chiarimento, e se il dubbio resta non dai corso e documenti. Tradotto sull'attribuzione all'OSS: restano tue la culpa in eligendo, per aver scelto male l'operatore, e la culpa in vigilando."),

 (20,"profondo",0,"[warm] Ti lascio lo schema per affrontare qualunque caso, anche quando la traccia e' breve. Uno: qual era la condotta doverosa, fra profilo, procedura, linea guida e Codice. Due: che cosa e' stato fatto o omesso."),
 (20,"profondo",0,"Tre: c'e' nesso causale fra condotta ed evento? Quattro: quale forma di colpa. Cinque: quali piani si attivano. Cinque passi, sempre gli stessi. Nella prossima lezione: consenso informato e DAT. A tra poco."),
]

ACCENTATE = "àèéìíòóùúÀÈÉÌÒÙ"
CAPITOLI = {1:"Apertura",2:"Obiettivi",3:"I cinque piani",4:"Autonomi e cumulabili",
 5:"Dolo e colpa",6:"Le tre forme della colpa generica",7:"L'imperizia e l'aggiornamento",
 8:"La Gelli-Bianco",9:"La sicurezza delle cure e' un diritto",10:"L'architettura della legge",
 11:"L'art. 590-sexies",12:"I tre limiti della non punibilita'",13:"Il doppio binario civile",
 14:"Perche' il doppio binario",15:"L'azione di rivalsa",16:"L'obbligo assicurativo",
 17:"I reati che ricorrono",18:"La documentazione come prova",19:"L'equipe: affidamento e limite",
 20:"Lo schema di risposta"}
CPS = 17.0   # misurata su 1.2, confermata su 1.3 e 1.4

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

acc=0; stacco=None
for i,b in enumerate(blocchi):
    acc+=len(b["text"])+1
    if acc>tot/2 and stacco is None and i+1<len(blocchi) and b["capitolo"]!=blocchi[i+1]["capitolo"]:
        stacco=b["id"]; a=acc
print(f"\nstacco tracce dopo {stacco}:  chunkA {a} car  ·  chunkB {tot-a} car   (limite 5000)")
print("\n" + ("OK, nessun errore" if not errori else "ERRORI:\n  " + "\n  ".join(errori)))
json.dump(blocchi, open("copione/blocchi.json","w",encoding="utf-8"), ensure_ascii=False, indent=1)
