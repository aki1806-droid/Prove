# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 7.5 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M7): i diritti dell'interessato. GDPR art. 12 (modalita': un mese, proroga di due; gratuita';
# richieste manifestamente infondate o eccessive; identita'), 13-14 (informativa), 15 (accesso), 16 (rettifica),
# 17 (cancellazione e limiti del par. 3), 18 (limitazione), 19 (notifica), 20 (portabilita': solo consenso o
# contratto e mezzi automatizzati; non per compiti di interesse pubblico), 21 (opposizione), 22 (decisioni
# automatizzate), 77, 79, 82 (reclamo, ricorso, risarcimento). L. 24/2017 art. 4 c. 2 (copia della
# documentazione sanitaria entro 7 giorni). Fonti: GDPR, testo del Garante (ed. 2017); dispense (con correzioni).
BLOCCHI = [
 (1,"chiaro",0.8,"[serious] Una paziente scrive all'azienda sanitaria. Chiede di sapere quali dati avete su di lei, di correggere un'allergia registrata per errore e di cancellare tutta la sua cartella. Cosa si puo' fare, e cosa no?"),
 (1,"chiaro",0,"Sono tre richieste diverse, e ognuna corrisponde a un diritto preciso del regolamento europeo. Due vanno soddisfatte. La terza, in gran parte, no. Vediamo perche'."),
 (1,"profondo",1.2,"I dati sono della persona: i diritti le restituiscono il controllo."),

 (2,"chiaro",0.6,"Quattro passaggi. Come si esercitano i diritti. Accesso e rettifica. Cancellazione e limitazione. E infine portabilita', opposizione e decisioni automatizzate."),

 (3,"chiaro",0.5,"I diritti sono negli articoli da 15 a 22. L'articolo 12 fissa le regole comuni: il titolare deve agevolarne l'esercizio, non ostacolarlo."),
 (3,"chiaro",0,"La risposta arriva senza ingiustificato ritardo e comunque entro un mese dalla richiesta. Se la richiesta e' complessa, o le richieste sono molte, il termine si puo' prorogare di altri due mesi."),
 (3,"chiaro",0,"Ma la proroga va comunicata all'interessato entro il primo mese, con i motivi. E se il titolare non da' seguito alla richiesta, deve spiegare perche' e ricordare la possibilita' di reclamo e di ricorso."),
 (3,"chiaro",0,"L'esercizio dei diritti e' gratuito. Solo per richieste manifestamente infondate o eccessive, per esempio ripetitive, il titolare puo' chiedere un contributo spese o rifiutare, dimostrandone il motivo."),
 (3,"chiaro",0,"E se ci sono dubbi ragionevoli sull'identita' di chi chiede, il titolare puo' chiedere informazioni per verificarla. Consegnare dati sanitari alla persona sbagliata sarebbe una violazione grave."),
 (3,"chiaro",0.6,"Un esempio: la richiesta arriva all'ufficio relazioni con il pubblico. Va protocollata e inoltrata subito all'ufficio competente, perche' il mese decorre dal ricevimento, non da quando arriva sulla scrivania giusta."),
 (3,"tenue",0.8,"Occhio a un distrattore: il termine non e' di trenta giorni fissi. E' un mese, prorogabile di due, sempre con una comunicazione motivata."),
 (3,"profondo",1.2,"Un mese per rispondere, gratis, alla persona giusta."),

 (4,"chiaro",0.5,"Il primo diritto e' l'accesso, articolo 15. La persona ha diritto di sapere se sono trattati dati che la riguardano e, in quel caso, di ottenerne una copia."),
 (4,"chiaro",0,"Insieme ai dati riceve le informazioni essenziali: le finalita', le categorie di dati, i destinatari, il periodo di conservazione, i suoi diritti e l'origine dei dati, se non li ha forniti lei."),
 (4,"chiaro",0.6,"In sanita' l'accesso riguarda anche la documentazione clinica. La legge 24 del 2017 prevede che la copia della documentazione sanitaria sia fornita entro sette giorni dalla richiesta, con eventuali integrazioni entro trenta."),
 (4,"chiaro",0,"Anche un dipendente puo' esercitare l'accesso sui dati che l'azienda tratta su di lui: fascicolo personale, presenze, valutazioni. Con i limiti che tutelano i diritti di altre persone."),
 (4,"chiaro",0,"Il secondo diritto e' la rettifica, articolo 16: correggere i dati inesatti e integrare quelli incompleti, anche con una dichiarazione della persona."),
 (4,"chiaro",0,"E' il caso dell'allergia registrata per errore. L'azienda la corregge senza ritardo: e' un diritto della paziente, ma anche una garanzia per chi la cura."),
 (4,"chiaro",0,"In ambito clinico, pero', la rettifica non cancella la storia. Una diagnosi superata non si riscrive: si aggiorna, lasciando traccia di cio' che era stato registrato."),
 (4,"chiaro",0,"Quando i dati vengono rettificati, cancellati o limitati, il titolare lo comunica anche ai destinatari a cui li aveva trasmessi. E' l'obbligo dell'articolo 19."),
 (4,"tenue",0.8,"Un distrattore frequente: l'accesso non richiede una motivazione. La persona non deve spiegare perche' vuole sapere quali dati la riguardano."),
 (4,"profondo",1.2,"Sapere, avere copia, correggere senza ritardo."),

 (5,"chiaro",0.5,"Il terzo diritto e' la cancellazione, articolo 17, chiamata anche diritto all'oblio. Si applica in casi precisi."),
 (5,"chiaro",0,"Per esempio quando i dati non servono piu', quando la persona revoca il consenso e non c'e' altra base, quando si oppone e prevale il suo interesse, o quando il trattamento e' illecito."),
 (5,"chiaro",0,"Ma il diritto ha dei limiti. Non si applica quando il trattamento e' necessario per un obbligo di legge, per un compito di interesse pubblico, per motivi di sanita' pubblica, per archivio e ricerca."),
 (5,"chiaro",0,"Ecco la risposta alla terza richiesta della paziente: la cartella clinica non si cancella. E' documentazione che l'azienda deve conservare per legge, a garanzia della stessa paziente."),
 (5,"chiaro",0.6,"Si possono cancellare, invece, dati non necessari: per esempio un recapito raccolto per un servizio facoltativo, con il consenso, che la persona ha poi revocato."),
 (5,"chiaro",0,"Il quarto diritto e' la limitazione, articolo 18. I dati restano conservati ma si congelano: si usano solo in casi particolari."),
 (5,"chiaro",0,"Succede quando la persona contesta l'esattezza, per il tempo della verifica; quando il trattamento e' illecito ma lei preferisce non cancellare; quando servono per difendere un suo diritto; o mentre si valuta un'opposizione."),
 (5,"chiaro",0,"Da non confondere con l'oscuramento nel dossier e nel fascicolo sanitario: e' una garanzia diversa, prevista dalle regole specifiche della sanita'."),
 (5,"tenue",0.8,"Attenzione: il diritto all'oblio non e' assoluto. Cede davanti agli obblighi di legge e ai compiti di interesse pubblico, come la conservazione della cartella clinica."),
 (5,"profondo",1.2,"Cancellare quando si puo', congelare quando serve."),

 (6,"chiaro",0.5,"Il quinto diritto e' la portabilita', articolo 20: ricevere i propri dati in un formato strutturato e leggibile da un computer, e trasmetterli a un altro titolare."),
 (6,"chiaro",0,"Ma vale solo se il trattamento si basa sul consenso o su un contratto, ed e' automatizzato. E non si applica ai trattamenti necessari per un compito di interesse pubblico."),
 (6,"chiaro",0,"Per un'azienda sanitaria pubblica, quindi, la portabilita' in senso stretto raramente spetta. Resta pero' il diritto di accesso e di copia, che copre gran parte delle esigenze."),
 (6,"chiaro",0,"Il sesto diritto e' l'opposizione, articolo 21: per motivi legati alla sua situazione particolare, la persona puo' opporsi ai trattamenti basati sull'interesse pubblico o sul legittimo interesse."),
 (6,"chiaro",0,"Il titolare deve fermarsi, a meno che dimostri motivi legittimi cogenti che prevalgono. Per il marketing diretto, invece, l'opposizione vale sempre, senza bisogno di motivi."),
 (6,"chiaro",0,"Infine l'articolo 22: il diritto di non subire una decisione basata unicamente su un trattamento automatizzato, compresa la profilazione, che produca effetti giuridici o incida su di lei in modo significativo."),
 (6,"chiaro",0.6,"Un esempio: un algoritmo che assegna automaticamente le priorita' di una lista d'attesa. Deve restare sempre possibile l'intervento di una persona, che valuti e decida."),
 (6,"chiaro",0,"Se il titolare non risponde, o risponde male, la persona puo' presentare reclamo al Garante o ricorrere al giudice. E chi subisce un danno ha diritto al risarcimento."),
 (6,"chiaro",0,"La regola pratica per gli uffici: ogni richiesta sui dati personali va riconosciuta, registrata e trasmessa subito a chi deve rispondere."),
 (6,"tenue",0.8,"Attenzione: la portabilita' non e' un diritto generale su tutti i dati. Serve il consenso o il contratto, e un trattamento automatizzato."),
 (6,"profondo",1.2,"Diritti forti, ognuno con i suoi confini."),

 (7,"chiaro",0.8,"Le tre cose che ti chiederanno. La prima: i diritti degli articoli da 15 a 22 si esercitano gratuitamente; la risposta arriva entro un mese, prorogabile di due con motivazione."),
 (7,"chiaro",0.8,"La seconda: accesso e rettifica spettano di regola; la cancellazione no, perche' cede davanti agli obblighi di legge e ai compiti pubblici, come la conservazione della cartella clinica."),
 (7,"chiaro",0.8,"La terza: la portabilita' vale solo per consenso o contratto e trattamenti automatizzati; l'opposizione si basa sulla situazione particolare; contro le risposte mancate c'e' il reclamo al Garante."),
 (7,"tenue",0.8,"L'ultimo distrattore: per ottenere la copia dei propri dati la persona non deve pagare. Il contributo spese e' un'eccezione, per richieste eccessive."),

 (8,"profondo",0,"[warm] In sintesi: sapere, correggere, cancellare quando si puo', opporsi quando serve. Nella prossima lezione: ruoli, adempimenti e sanzioni."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: 'Come si esercitano', 4: 'Accesso e rettifica', 5: 'Cancellazione e limitazione', 6: "Portabilita', opposizione, decisioni automatizzate", 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
blocchi=[]
for i,(cap,tema,posa,txt) in enumerate(BLOCCHI, start=2):
    blocchi.append({"id":f"s{i:02d}","capitolo":cap,"tema":tema,"posa":posa,"text":txt})

errori=[]
tot=sum(len(b["text"]) for b in blocchi)
nscene=len(blocchi)+2
if nscene>MAX_SCENE: errori.append(f"scene {nscene} > {MAX_SCENE}")
for b in blocchi:
    if any(c in ACCENTATE for c in b["text"]):
        errori.append(f'{b["id"]}: vocale accentata -> ' + "".join(sorted({c for c in b["text"] if c in ACCENTATE})))
    if len(b["text"])>MAX_CAR_BLOCCO: errori.append(f'{b["id"]}: {len(b["text"])} car, blocco troppo lungo')
tags=sum(len(re.findall(r"\[[a-z]+\]", b["text"])) for b in blocchi)
if tags>6: errori.append(f"tag di intenzione: {tags} > 6")

pose=sum(b["posa"] for b in blocchi)
parlato=tot/CPS+pose; durata=parlato+COPERTINA+CHIUSURA
print(f"blocchi   {len(blocchi)}        scene {nscene}/{MAX_SCENE}")
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

# Lo stacco va su un cambio di capitolo. Non il primo DOPO la meta': quello
# vicino alla meta', da una parte o dall'altra. Nella 1.1 del corso PV il
# primo dopo la meta' lasciava la traccia A a 4968 caratteri, a un soffio dal
# tetto di 5000 del servizio di sintesi, e la B a 2809.
acc=0; stacco=None; a=0; migliore=None
for i,b in enumerate(blocchi):
    acc+=len(b["text"])+1
    if i+1<len(blocchi) and b["capitolo"]!=blocchi[i+1]["capitolo"]:
        if migliore is None or abs(acc-tot/2) < abs(migliore[1]-tot/2):
            migliore=(b["id"],acc)
stacco,a=migliore
if a>=5000 or tot-a>=5000: errori.append(f"stacco dopo {stacco}: una traccia supera i 5000 caratteri")
print(f"\nstacco tracce dopo {stacco}:  chunkA {a} car  ·  chunkB {tot-a} car   (limite 5000)")
print("\n" + ("OK, nessun errore" if not errori else "ERRORI:\n  " + "\n  ".join(errori)))
json.dump(blocchi, open("copione/blocchi.json","w",encoding="utf-8"), ensure_ascii=False, indent=1)
