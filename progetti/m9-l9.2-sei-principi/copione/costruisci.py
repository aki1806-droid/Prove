# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 9.2 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M9): i sei principi. D.Lgs. 81/2008 art. 2 (lett. n prevenzione, o salute, q valutazione dei rischi,
# r pericolo, s rischio, aa formazione, bb informazione, cc addestramento), art. 15 c. 1 (misure generali di
# tutela, lett. a-z) e c. 2 (nessun onere per i lavoratori). Raggruppamento didattico in sei principi:
# prevenzione primaria (lett. c, e, f, g, h, i), valutazione (a), partecipazione (r, s), programmazione (b),
# formazione (n-q), miglioramento continuo (t). Fonti: D.Lgs. 81/2008 edizione giugno 2016 su Drive; dispensa.
BLOCCHI = [
 (1,"chiaro",0.8,"[serious] In un reparto si usa ancora un disinfettante molto irritante. Si puo' dare a tutti una mascherina, oppure cambiare prodotto. La legge dice con chiarezza quale strada va tentata per prima."),
 (1,"chiaro",0,"La risposta sta nell'articolo 15 del decreto 81, che elenca le misure generali di tutela. Non sono consigli: sono il metodo che ogni datore di lavoro deve seguire."),
 (1,"profondo",1.2,"Prima si toglie il pericolo, poi ci si protegge."),

 (2,"chiaro",0.6,"Quattro passaggi. Le parole di base: pericolo, rischio, prevenzione. Poi i sei principi, a coppie: prevenire e valutare, partecipare e programmare, formare e migliorare."),
 (2,"chiaro",0,"L'elenco dell'articolo 15 e' lungo, dalla lettera a fino alla lettera z. Per ricordarlo conviene raggrupparlo in sei principi, come facciamo in questa lezione."),

 (3,"chiaro",0.5,"Il pericolo e' una proprieta' intrinseca di qualcosa: un agente chimico, una macchina, un virus. E' li', che lo si usi o no."),
 (3,"chiaro",0,"Il rischio e' la probabilita' che quel pericolo produca davvero un danno, nelle condizioni concrete in cui si lavora. Dipende da quanto, come e per quanto tempo si e' esposti."),
 (3,"chiaro",0,"Per stimarlo si guardano due cose insieme: quanto e' probabile che l'evento accada, e quanto sarebbe grave il danno. Cresce l'una o l'altra, cresce il rischio."),
 (3,"chiaro",0.6,"Un esempio: un ago usato e' un pericolo. Il rischio cambia molto se l'ago si reincappuccia a mano o se si getta subito nel contenitore rigido accanto al letto."),
 (3,"chiaro",0,"Per questo due reparti con gli stessi pericoli possono avere rischi molto diversi: contano l'organizzazione, le procedure, gli strumenti e la formazione di chi ci lavora."),
 (3,"chiaro",0,"La prevenzione e' l'insieme delle misure per evitare o diminuire i rischi professionali, rispettando anche la salute della popolazione e l'ambiente esterno."),
 (3,"chiaro",0,"E la salute, per il decreto, non e' solo assenza di malattia. E' uno stato di completo benessere fisico, mentale e sociale, come nella definizione dell'Organizzazione mondiale della sanita'."),
 (3,"tenue",0.8,"Occhio a un distrattore: pericolo e rischio non sono sinonimi. Il pericolo e' la fonte del danno, il rischio e' la probabilita' che il danno si verifichi."),
 (3,"profondo",1.2,"Il pericolo resta, il rischio si puo' governare."),

 (4,"chiaro",0.5,"Il primo principio e' la prevenzione primaria. Prima di tutto si eliminano i rischi. Solo quando non e' possibile, si riducono al minimo, secondo il progresso tecnico."),
 (4,"chiaro",0,"Da qui discende un ordine preciso. Ridurre i rischi alla fonte. Sostituire cio' che e' pericoloso con cio' che non lo e', o lo e' meno. Limitare il numero di lavoratori esposti."),
 (4,"chiaro",0,"E soprattutto: le misure di protezione collettiva hanno la priorita' su quelle individuali. Una cappa aspirante viene prima della mascherina."),
 (4,"chiaro",0.6,"Torniamo al disinfettante irritante. Prima si valuta se sostituirlo con uno meno pericoloso. Poi si migliora l'aerazione. Solo alla fine, per il rischio residuo, i dispositivi individuali."),
 (4,"chiaro",0,"Il secondo principio e' la valutazione dei rischi. E' la prima misura dell'elenco: una valutazione globale e documentata di tutti i rischi presenti nell'organizzazione."),
 (4,"chiaro",0,"Non basta guardare le macchine. Contano anche l'organizzazione del lavoro, i turni, l'ergonomia dei posti, il lavoro monotono e ripetitivo, e i gruppi di lavoratori piu' esposti."),
 (4,"chiaro",0,"Tra le misure c'e' anche il controllo sanitario dei lavoratori e, per motivi di salute, l'allontanamento dall'esposizione, con l'adibizione, ove possibile, ad altra mansione."),
 (4,"tenue",0.8,"Attenzione: i dispositivi di protezione individuale non sono la prima misura. Sono l'ultima barriera, quando il rischio non si puo' eliminare o ridurre in altro modo."),
 (4,"profondo",1.2,"Eliminare, ridurre, sostituire. Poi proteggere."),

 (5,"chiaro",0.5,"Il terzo principio e' la partecipazione. Tra le misure generali ci sono la partecipazione e la consultazione dei lavoratori e dei loro rappresentanti per la sicurezza."),
 (5,"chiaro",0,"Chi lavora in reparto conosce i rischi meglio di chiunque altro. Per questo la legge vuole che sia ascoltato, e non solo informato a cose fatte."),
 (5,"chiaro",0,"Il quarto principio e' la programmazione. La prevenzione va programmata come un insieme coerente, che tenga conto della tecnica, dell'ambiente e dell'organizzazione del lavoro."),
 (5,"chiaro",0,"Significa decidere priorita', tempi e responsabili. Le misure di prevenzione non si improvvisano quando accade un infortunio: si pianificano prima."),
 (5,"chiaro",0.6,"Un esempio: i lavoratori segnalano mal di schiena nel sollevare i pazienti. Il rappresentante lo porta in riunione, e l'azienda programma sollevatori e formazione, con tempi e responsabili."),
 (5,"chiaro",0,"Rientrano in questo quadro anche le misure di emergenza: primo soccorso, lotta antincendio, evacuazione, pericolo grave e immediato. E la manutenzione regolare di ambienti e impianti."),
 (5,"chiaro",0,"E ci sono le istruzioni adeguate ai lavoratori e l'uso di segnali di avvertimento e di sicurezza. Il rischio si comunica anche con un cartello chiaro, nel posto giusto."),
 (5,"tenue",0.8,"Un distrattore frequente: consultare i lavoratori non e' una cortesia facoltativa. La partecipazione e la consultazione sono misure generali di tutela, previste dalla legge."),
 (5,"profondo",1.2,"Chi conosce il rischio, partecipa alle scelte."),

 (6,"chiaro",0.5,"Il quinto principio e' la formazione. Il decreto chiede informazione e formazione adeguate per i lavoratori, per i dirigenti e i preposti, e per i rappresentanti per la sicurezza."),
 (6,"chiaro",0,"Sono tre cose diverse. L'informazione fornisce conoscenze utili sui rischi. La formazione e' un processo educativo che costruisce competenze. L'addestramento insegna l'uso pratico di attrezzature e procedure."),
 (6,"chiaro",0,"La formazione va ripetuta periodicamente, e ogni volta che cambia la mansione o arrivano nuove attrezzature, nuove tecnologie o nuove sostanze."),
 (6,"chiaro",0,"Il sesto principio e' il miglioramento continuo. Il decreto chiede di programmare le misure per migliorare nel tempo i livelli di sicurezza, anche con codici di condotta e buone prassi."),
 (6,"chiaro",0,"La sicurezza non e' un traguardo raggiunto una volta per tutte. Si misura, si rivede, si aggiorna quando cambiano i processi, le tecnologie, le conoscenze."),
 (6,"chiaro",0,"Il miglioramento passa anche dai quasi incidenti: eventi che non hanno fatto danni, ma avrebbero potuto. Segnalarli e analizzarli serve a prevenire quelli veri."),
 (6,"chiaro",0.6,"Un esempio: dopo alcune punture accidentali, l'azienda introduce aghi con dispositivo di sicurezza, forma il personale e verifica dopo sei mesi se gli infortuni sono diminuiti."),
 (6,"chiaro",0,"E c'e' una regola che chiude l'articolo 15: le misure di sicurezza, igiene e salute non devono in nessun caso comportare oneri finanziari per i lavoratori."),
 (6,"chiaro",0,"Quindi i dispositivi di protezione, la formazione, le visite mediche sono a carico dell'azienda. La formazione, di regola, si svolge durante l'orario di lavoro."),
 (6,"tenue",0.8,"Attenzione: informazione, formazione e addestramento non sono la stessa cosa. Ricordale in ordine: conoscere, capire, saper fare."),
 (6,"profondo",1.2,"Sapere, saper fare, e fare sempre un po' meglio."),

 (7,"chiaro",0.8,"Le tre cose che ti chiederanno. La prima: il pericolo e' la proprieta' intrinseca di un fattore, il rischio e' la probabilita' che produca un danno."),
 (7,"chiaro",0.8,"La seconda: l'articolo 15 mette al primo posto la valutazione dei rischi e l'eliminazione alla fonte; la protezione collettiva viene prima di quella individuale."),
 (7,"chiaro",0.8,"La terza: i principi comprendono partecipazione, programmazione, formazione e miglioramento continuo, e la sicurezza non costa nulla al lavoratore."),
 (7,"tenue",0.8,"L'ultimo distrattore: il datore di lavoro non puo' far pagare ai lavoratori i dispositivi di protezione o i corsi obbligatori. Lo vieta l'articolo 15."),

 (8,"profondo",0,"[warm] In sintesi: si valuta, si elimina, si riduce, si coinvolge, si forma, si migliora. Nella prossima lezione: a chi si applica il decreto, e fino a dove arriva la nozione di lavoratore."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: 'Pericolo, rischio, prevenzione', 4: 'Prevenire e valutare', 5: 'Partecipare e programmare', 6: 'Formare e migliorare', 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
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
