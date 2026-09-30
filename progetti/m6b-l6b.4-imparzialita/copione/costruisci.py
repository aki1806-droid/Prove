# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 6b.4 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M6-bis, Anticorruzione): l'imparzialita'. Conflitto di interessi e astensione; incarichi
# extraistituzionali, commissioni e pantouflage; inconferibilita' e incompatibilita' (D.Lgs. 39/2013);
# il codice di comportamento. Fonti: L. 241/1990 art. 6-bis; D.Lgs. 165/2001 artt. 35-bis, 53, 54;
# D.Lgs. 39/2013 artt. 1, 3, 15, 17-20; DPR 62/2013 artt. 4, 6, 7 (con DPR 81/2023); dispense su Drive.
BLOCCHI = [
 (1,"chiaro",0.8,"[serious] Il cognato di un funzionario partecipa a una gara per la manutenzione delle apparecchiature. Il funzionario non ha fatto niente di illecito. Deve comunque fare un passo indietro?"),
 (1,"chiaro",0,"Si'. L'imparzialita' non chiede solo di non favorire nessuno: chiede di non trovarsi nella posizione di poterlo fare. E' il filo che lega le regole di questa lezione."),
 (1,"profondo",1.2,"Imparziale non e' solo chi non favorisce: e' chi non puo' favorire."),

 (2,"chiaro",0.6,"Quattro passaggi. Il conflitto di interessi e l'obbligo di astensione. Incarichi esterni, commissioni e pantouflage. Inconferibilita' e incompatibilita'. E il codice di comportamento."),

 (3,"chiaro",0.5,"La legge 190 ha aggiunto alla legge 241 l'articolo 6-bis. Il responsabile del procedimento e chi adotta pareri, valutazioni tecniche e provvedimento finale deve astenersi in caso di conflitto di interessi."),
 (3,"chiaro",0,"Conta anche il conflitto potenziale. Non serve che l'interesse privato abbia gia' influito sulla decisione: basta che possa influire. E ogni situazione di conflitto va segnalata."),
 (3,"chiaro",0,"Il codice di comportamento precisa quando astenersi: se la decisione coinvolge interessi propri, del coniuge o del convivente, di parenti e affini entro il secondo grado, o di persone con cui si ha frequentazione abituale."),
 (3,"chiaro",0,"E ancora quando si e' in causa pendente o grave inimicizia con chi e' interessato, o si ricopre un ruolo in enti e associazioni coinvolti. E in ogni altro caso di gravi ragioni di convenienza."),
 (3,"chiaro",0,"Chi decide se il dipendente deve astenersi? Il responsabile dell'ufficio di appartenenza, cioe' il suo dirigente. Non il dipendente da solo."),
 (3,"chiaro",0,"Assegnato a un ufficio, il dipendente deve anche comunicare i rapporti di collaborazione retribuiti avuti negli ultimi tre anni con soggetti privati interessati alle attivita' di quell'ufficio."),
 (3,"chiaro",0.6,"Torniamo al cognato in gara. Il funzionario segnala il conflitto al dirigente, che decide l'astensione e affida la pratica ad altri. La gara prosegue, l'imparzialita' e' salva."),
 (3,"tenue",0.8,"Attenzione: l'obbligo di astensione non scatta solo quando il conflitto e' certo e attuale. Scatta anche per il conflitto potenziale."),
 (3,"profondo",1.2,"Segnalare, astenersi, lasciare decidere al dirigente."),

 (4,"chiaro",0.5,"Il dipendente pubblico non puo' svolgere incarichi retribuiti fuori dall'ufficio senza autorizzazione. Lo prevede l'articolo 53 del decreto 165."),
 (4,"chiaro",0,"Prima di autorizzare, l'amministrazione verifica che non ci siano conflitti di interessi, anche potenziali. Chi incassa compensi non autorizzati deve versarli all'ente, o ne risponde alla Corte dei conti."),
 (4,"chiaro",0,"Poi c'e' l'articolo 35-bis. Chi e' condannato, anche con sentenza non definitiva, per reati contro la pubblica amministrazione non puo' far parte di commissioni di concorso, nemmeno come segretario."),
 (4,"chiaro",0,"Non puo' far parte di commissioni di gara, ne' essere assegnato agli uffici che gestiscono risorse finanziarie, acquisti o contributi. Anche questa norma e' figlia della legge 190."),
 (4,"chiaro",0,"Infine il pantouflage, il passaggio dal pubblico al privato. Chi negli ultimi tre anni ha esercitato poteri autoritativi o negoziali non puo' lavorare, nei tre anni dopo la cessazione, per i privati destinatari dei suoi atti."),
 (4,"chiaro",0,"I contratti conclusi in violazione sono nulli. E i privati che li hanno conclusi non possono contrattare con le pubbliche amministrazioni per tre anni, con obbligo di restituire i compensi."),
 (4,"chiaro",0.6,"Un esempio: il dirigente che ha firmato per anni i contratti di fornitura di dispositivi va in pensione e viene assunto da quel fornitore. E' proprio il caso che il divieto vuole impedire."),
 (4,"tenue",0.8,"Occhio al distrattore: il divieto dell'articolo 35-bis non richiede una condanna definitiva. Basta una sentenza anche non passata in giudicato."),
 (4,"profondo",1.2,"Tre anni prima, tre anni dopo: il pantouflage."),

 (5,"chiaro",0.5,"Il decreto legislativo 39 del 2013 distingue due situazioni. L'inconferibilita' guarda al passato: impedisce di conferire un incarico a chi si trova in certe condizioni pregresse."),
 (5,"chiaro",0,"Le condizioni sono tre: una condanna, anche non definitiva, per reati contro la pubblica amministrazione; incarichi in enti privati regolati o finanziati dall'amministrazione; cariche politiche ricoperte di recente."),
 (5,"chiaro",0,"L'incompatibilita' guarda al presente: e' l'obbligo di scegliere tra l'incarico e un'altra carica incompatibile, entro quindici giorni dalla contestazione dell'RPCT. Se non si sceglie, si decade."),
 (5,"chiaro",0,"Il decreto ha articoli dedicati alle aziende sanitarie, per gli incarichi di direttore generale, direttore amministrativo e direttore sanitario. I periodi di attesa dopo una carica politica sono fissati caso per caso."),
 (5,"chiaro",0,"Chi riceve l'incarico presenta una dichiarazione sull'insussistenza delle cause di inconferibilita': senza, l'incarico non acquista efficacia. Sull'incompatibilita' la dichiarazione si rinnova ogni anno."),
 (5,"chiaro",0.6,"Un esempio: il direttore sanitario di un'azienda diventa anche amministratore di una clinica privata accreditata con la stessa Regione. E' un caso di incompatibilita': deve scegliere."),
 (5,"chiaro",0,"Gli atti di conferimento che violano il decreto sono nulli. E chi li ha conferiti non puo', per tre mesi, conferire gli incarichi di sua competenza. Vigilano l'RPCT, che contesta le violazioni, e l'ANAC."),
 (5,"tenue",0.8,"Attenzione a un errore delle dispense: le cariche politiche recenti non rientrano nell'articolo 3 del decreto 39, che riguarda solo le condanne. Hanno articoli propri, anche specifici per la sanita'."),
 (5,"profondo",1.2,"Inconferibile guarda al passato, incompatibile al presente."),

 (6,"chiaro",0.5,"Il codice di comportamento dei dipendenti pubblici e' il decreto del Presidente della Repubblica 62 del 2013, aggiornato nel 2023. Traduce in doveri concreti diligenza, lealta' e imparzialita'."),
 (6,"chiaro",0,"Il caso piu' citato sono i regali. Si possono accettare solo regali d'uso di modico valore, cioe' in via orientativa non oltre centocinquanta euro, anche sotto forma di sconto. Mai chiederli."),
 (6,"chiaro",0,"I codici delle singole amministrazioni possono abbassare quel limite o escludere del tutto i regali. Molte aziende sanitarie lo fanno, per i rapporti con pazienti, fornitori e industria farmaceutica."),
 (6,"chiaro",0,"L'aggiornamento del 2023 aggiunge regole sull'uso delle tecnologie e dei social: niente dichiarazioni che danneggino l'immagine dell'amministrazione, e uso degli strumenti di lavoro per fini di ufficio."),
 (6,"chiaro",0,"Ogni amministrazione adotta anche un proprio codice, con una procedura aperta alla partecipazione e il parere obbligatorio dell'organismo di valutazione. Lo integra, non lo sostituisce."),
 (6,"chiaro",0,"I dirigenti hanno doveri in piu': dare l'esempio, vigilare sui collaboratori e comunicare le partecipazioni e gli interessi finanziari che possono metterli in conflitto."),
 (6,"chiaro",0,"La violazione del codice e' fonte di responsabilita' disciplinare. Le violazioni gravi o reiterate possono portare fino al licenziamento."),
 (6,"tenue",0.8,"Occhio: centocinquanta euro non e' un diritto a ricevere regali fino a quella cifra. E' un limite orientativo massimo, che i codici aziendali possono abbassare."),
 (6,"profondo",1.2,"Modico valore, mai chiesto, e il codice aziendale puo' dire di meno."),

 (7,"chiaro",0.8,"Le tre cose da portare alla prova. La prima: in caso di conflitto di interessi, anche potenziale, ci si astiene e lo si segnala; sull'astensione decide il dirigente dell'ufficio."),
 (7,"chiaro",0.8,"La seconda: il decreto 39 distingue l'inconferibilita', che guarda al passato, dall'incompatibilita', che impone di scegliere entro quindici giorni dalla contestazione; gli atti contrari sono nulli."),
 (7,"chiaro",0.8,"La terza: pantouflage vuol dire tre anni di divieto dopo la cessazione; i regali sono ammessi solo se d'uso e di modico valore, in via orientativa fino a centocinquanta euro."),
 (7,"tenue",0.8,"L'ultimo distrattore: per il divieto di stare in commissione basta una condanna non definitiva. Non bisogna aspettare la Cassazione."),

 (8,"profondo",0,"[warm] In sintesi: astenersi, scegliere, non accettare. Nell'ultima lezione del modulo: chi segnala gli illeciti e le altre misure di prevenzione."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: 'Il conflitto di interessi', 4: 'Incarichi, commissioni, pantouflage', 5: "Inconferibilita' e incompatibilita'", 6: 'Il codice di comportamento', 7: 'Le tre cose da portare alla prova', 8: 'Chiusura'}
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
