# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 6b.3 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M6-bis, Anticorruzione): il responsabile della prevenzione della corruzione e della
# trasparenza. Nomina e autonomia, compiti, responsabilita', la rete di dirigenti, dipendenti e OIV.
# Fonti: L. 190/2012 art. 1 cc. 7, 8, 8-bis, 10, 12, 13, 14; D.Lgs. 165/2001 art. 16 c. 1
# lett. l-bis, l-ter, l-quater; DPR 62/2013 art. 8; D.Lgs. 39/2013 art. 15; PNA 2019; dispense su Drive.
BLOCCHI = [
 (1,"chiaro",0.8,"[serious] In un'azienda sanitaria viene scoperta una tangente sulle forniture di laboratorio. La sentenza diventa definitiva. Oltre al dipendente condannato, chi altro deve rispondere?"),
 (1,"chiaro",0,"La legge 190 da' una risposta precisa: anche il responsabile della prevenzione, salvo che dimostri di aver fatto il proprio lavoro. E' una delle figure piu' esposte dell'intera amministrazione."),
 (1,"profondo",1.2,"Chi deve prevenire risponde di cio' che non ha prevenuto."),

 (2,"chiaro",0.6,"Quattro passaggi. Come viene nominato e perche' deve essere autonomo. Che cosa fa. Di che cosa risponde. E la rete di persone che lavora con lui."),

 (3,"chiaro",0.5,"La sigla e' RPCT: responsabile della prevenzione della corruzione e della trasparenza. Dal 2016 le due funzioni, prima separate, sono riunite di norma in una sola persona."),
 (3,"chiaro",0,"Lo individua l'organo di indirizzo, di norma tra i dirigenti di ruolo in servizio. In azienda sanitaria la nomina spetta al direttore generale."),
 (3,"chiaro",0,"La legge chiede di disporre le modifiche organizzative necessarie perche' il responsabile abbia funzioni e poteri idonei, e possa svolgere l'incarico con piena autonomia ed effettivita'."),
 (3,"chiaro",0,"Il nome del responsabile va comunicato all'ANAC e pubblicato sul sito, in Amministrazione trasparente. Chiunque deve poter sapere chi presidia la prevenzione in quell'ente."),
 (3,"chiaro",0,"Proprio per garantire l'autonomia, il Piano nazionale sconsiglia di scegliere dirigenti che operano nelle aree piu' a rischio, come contratti o patrimonio, e chi guida l'ufficio per i procedimenti disciplinari."),
 (3,"chiaro",0,"L'autonomia e' anche protetta. Le misure discriminatorie contro il responsabile, per motivi legati alle sue funzioni, vanno segnalate all'ANAC, che puo' chiedere informazioni e intervenire."),
 (3,"chiaro",0,"Serve infine una struttura di supporto adeguata: persone e mezzi. Nelle aziende grandi e' di solito un ufficio dedicato, che lavora con il responsabile."),
 (3,"tenue",0.8,"Attenzione: l'RPCT non e' un consulente esterno. E' di norma un dirigente di ruolo in servizio nell'amministrazione, nominato dall'organo di indirizzo."),
 (3,"profondo",1.2,"Un dirigente interno, nominato dal vertice, ma autonomo."),

 (4,"chiaro",0.5,"Il primo compito e' il piano. L'RPCT lo propone all'organo di indirizzo e, entro lo stesso termine del 31 gennaio, definisce come selezionare e formare chi lavora nei settori piu' esposti."),
 (4,"chiaro",0,"Poi verifica che il piano sia attuato davvero e che sia idoneo. Ne propone la modifica quando emergono violazioni importanti o quando cambiano l'organizzazione o le attivita'."),
 (4,"chiaro",0,"Per farlo ha accesso agli atti e alle informazioni necessarie, e puo' chiedere spiegazioni ai dipendenti che hanno istruito o adottato un provvedimento."),
 (4,"chiaro",0,"Verifica, d'intesa con il dirigente competente, la rotazione effettiva degli incarichi negli uffici piu' a rischio. E individua il personale da inserire nei programmi di formazione."),
 (4,"chiaro",0,"Segnala all'organo di indirizzo e all'organismo di valutazione le disfunzioni nell'attuazione delle misure, e indica all'ufficio disciplinare i nomi dei dipendenti che non le hanno applicate."),
 (4,"chiaro",0,"Entro il 15 dicembre di ogni anno trasmette all'organismo di valutazione e all'organo di indirizzo una relazione sui risultati dell'attivita' svolta, e la pubblica sul sito. L'ANAC ne fornisce il modello."),
 (4,"chiaro",0,"Vigila inoltre sul rispetto delle regole su inconferibilita' e incompatibilita' degli incarichi, e sulla trasparenza: la parte che hai visto nell'ultima lezione del modulo precedente."),
 (4,"chiaro",0,"E' anche il destinatario delle richieste di accesso civico semplice, e decide sul riesame quando un accesso generalizzato viene negato o resta senza risposta."),
 (4,"chiaro",0.6,"Un esempio: il piano prevede la rotazione del responsabile degli acquisti di farmacia, ma dopo due anni nulla e' cambiato. L'RPCT lo verifica con il dirigente e lo segnala alla direzione e all'organismo di valutazione."),
 (4,"tenue",0.8,"Occhio al distrattore: la relazione annuale dell'RPCT non va al Parlamento. Va all'organismo di valutazione e all'organo di indirizzo, e si pubblica sul sito entro il 15 dicembre."),
 (4,"profondo",1.2,"Propone il piano, verifica, segnala, riferisce."),

 (5,"chiaro",0.5,"Veniamo alla responsabilita'. Se nell'amministrazione e' commesso un reato di corruzione, accertato con sentenza passata in giudicato, l'RPCT ne risponde."),
 (5,"chiaro",0,"Risponde sul piano dirigenziale, disciplinare, e per il danno erariale e all'immagine della pubblica amministrazione. Non e' una responsabilita' penale: e' per non aver prevenuto."),
 (5,"chiaro",0,"La responsabilita' dirigenziale, secondo l'articolo 21 del decreto 165, puo' portare al mancato rinnovo dell'incarico e, nei casi piu' gravi, alla sua revoca."),
 (5,"chiaro",0,"Puo' liberarsi solo provando due cose insieme: di aver predisposto il piano prima del fatto, rispettandone le regole, e di aver vigilato sul suo funzionamento e sulla sua osservanza."),
 (5,"chiaro",0,"La sanzione disciplinare non puo' essere inferiore alla sospensione dal servizio con privazione della retribuzione, da un minimo di un mese a un massimo di sei mesi."),
 (5,"chiaro",0,"C'e' poi un secondo caso: le ripetute violazioni delle misure del piano. Qui l'RPCT risponde per omesso controllo, salvo che provi di aver comunicato le misure agli uffici e di aver vigilato."),
 (5,"chiaro",0.6,"Torniamo alla tangente sulle forniture. Se il piano c'era, prevedeva controlli sugli acquisti e l'RPCT li ha verificati, non risponde. Se il piano era solo sulla carta, si'."),
 (5,"tenue",0.8,"Attenzione: per la responsabilita' dell'RPCT non basta un'indagine o una condanna in primo grado. Serve un reato di corruzione accertato con sentenza passata in giudicato."),
 (5,"profondo",1.2,"Piano prima del fatto, vigilanza dopo: le due prove che salvano."),

 (6,"chiaro",0.5,"L'RPCT non puo' presidiare da solo un'azienda di migliaia di persone. Il piano individua dei referenti nelle strutture, che raccolgono le informazioni e seguono l'attuazione delle misure."),
 (6,"chiaro",0,"I dirigenti hanno obblighi propri, fissati dall'articolo 16 del decreto 165: concorrono a definire le misure, ne controllano il rispetto negli uffici e monitorano le attivita' piu' esposte."),
 (6,"chiaro",0,"Ai dirigenti spetta anche la rotazione straordinaria: se contro un dipendente si avvia un procedimento penale o disciplinare per condotte corruttive, dispongono lo spostamento con provvedimento motivato."),
 (6,"chiaro",0,"E i dipendenti? Devono rispettare le misure del piano e collaborare con il responsabile. La loro violazione e' illecito disciplinare: lo dice la stessa legge 190."),
 (6,"chiaro",0,"L'organismo di valutazione chiude il cerchio: verifica che piano e performance siano coerenti, puo' chiedere documenti all'RPCT e sentire i dipendenti, e riferisce all'ANAC sullo stato delle misure."),
 (6,"chiaro",0.6,"Un esempio: un referente di dipartimento segnala che il controllo sui campioni gratuiti di farmaci previsto dal piano non si fa. L'RPCT verifica e chiede al dirigente di intervenire."),
 (6,"tenue",0.8,"Occhio: la prevenzione non e' compito del solo RPCT. Dirigenti e dipendenti hanno obblighi propri, e la violazione delle misure del piano e' illecito disciplinare."),
 (6,"profondo",1.2,"Un responsabile al centro, una rete intorno."),

 (7,"chiaro",0.8,"Le tre cose da portare alla prova. La prima: l'RPCT e' nominato dall'organo di indirizzo, di norma tra i dirigenti di ruolo in servizio, e deve avere poteri e autonomia effettivi."),
 (7,"chiaro",0.8,"La seconda: propone il piano, ne verifica l'attuazione e la rotazione, segnala le disfunzioni e, entro il 15 dicembre, trasmette e pubblica la relazione annuale."),
 (7,"chiaro",0.8,"La terza: per un reato di corruzione accertato con sentenza definitiva risponde, salvo provare piano e vigilanza; la sanzione disciplinare va da uno a sei mesi di sospensione."),
 (7,"tenue",0.8,"L'ultimo distrattore: l'RPCT non adotta il piano. Lo propone; l'adozione resta all'organo di indirizzo."),

 (8,"profondo",0,"[warm] In sintesi: un responsabile autonomo, con compiti precisi e una responsabilita' vera. Nella prossima lezione: conflitti di interessi, incarichi e codice di comportamento."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: 'Nomina e autonomia', 4: 'Che cosa fa', 5: 'Di che cosa risponde', 6: 'Non lavora da solo', 7: 'Le tre cose da portare alla prova', 8: 'Chiusura'}
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
