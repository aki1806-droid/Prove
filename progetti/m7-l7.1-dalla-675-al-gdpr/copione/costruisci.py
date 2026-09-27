# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 7.1 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M7): dalla 675/1996 al GDPR. Le tre stagioni: L. 675 del 31/12/1996 (direttiva 95/46/CE, nasce il
# Garante); D.Lgs. 196 del 30/6/2003, Codice in vigore dall'1/1/2004; Reg. UE 2016/679 (27/4/2016, in vigore
# 24/5/2016, applicabile dal 25/5/2018, direttamente applicabile: art. 99) e D.Lgs. 101/2018 che adegua il
# Codice. Carta dei diritti fondamentali UE art. 8. GDPR artt. 1, 2, 3 (ambito territoriale), 4 (definizioni),
# 5 par. 2 (responsabilizzazione), 24, 25. Fonti: GDPR, testo del Garante (ed. 2017); dispense su Drive.
BLOCCHI = [
 (1,"chiaro",0.8,"[serious] In una giornata di reparto passano per le tue mani decine di dati: nomi, diagnosi, terapie, numeri di telefono, turni dei colleghi. Chi decide come vanno trattati? E da quando?"),
 (1,"chiaro",0,"La risposta ha trent'anni di storia: una legge del 1996, un codice del 2003, un regolamento europeo del 2016. Tre stagioni, e ognuna ha cambiato il modo di lavorare negli ospedali."),
 (1,"profondo",1.2,"Proteggere i dati significa proteggere le persone."),

 (2,"chiaro",0.6,"Quattro passaggi. La prima stagione, con la legge 675. La seconda, con il Codice del 2003. La terza, con il regolamento europeo. E l'idea che la attraversa: la responsabilizzazione."),

 (3,"chiaro",0.5,"La prima legge organica italiana sulla protezione dei dati e' la legge 675 del 31 dicembre 1996. Nasce per dare attuazione a una direttiva europea, la 95/46."),
 (3,"chiaro",0,"Fino ad allora, in Italia, non c'era una disciplina generale. Esistevano il segreto professionale, il segreto d'ufficio, qualche norma sparsa. Mancava un diritto della persona sui propri dati."),
 (3,"chiaro",0,"La 675 introduce parole che usiamo ancora: trattamento, interessato, titolare, consenso. E istituisce un'autorita' indipendente: il Garante per la protezione dei dati personali."),
 (3,"chiaro",0,"Per i dati piu' delicati, come quelli sulla salute, la 675 prevede cautele rafforzate. Nasce la distinzione tra dati comuni e dati sensibili."),
 (3,"chiaro",0,"Il messaggio e' nuovo: i dati di una persona non appartengono a chi li raccoglie. Chi li tratta deve farlo secondo regole, e la persona puo' intervenire."),
 (3,"tenue",0.8,"Occhio a un distrattore: la privacy non nasce con il regolamento europeo. In Italia la prima legge organica e' del 1996, oltre vent'anni prima."),
 (3,"profondo",1.2,"Il 1996: i dati diventano un diritto della persona."),

 (4,"chiaro",0.5,"Nel giro di pochi anni le norme si moltiplicano. Il legislatore le riunisce in un testo unico: il decreto legislativo 196 del 30 giugno 2003, il Codice in materia di protezione dei dati personali."),
 (4,"chiaro",0,"Il Codice entra in vigore il primo gennaio 2004. Contiene una parte generale e parti dedicate ai settori: tra queste, una disciplina specifica per i trattamenti in ambito sanitario."),
 (4,"chiaro",0,"Il Codice elenca anche le misure minime di sicurezza, in un disciplinare tecnico: password, aggiornamenti, copie di sicurezza. Un elenco di adempimenti uguale per tutti."),
 (4,"chiaro",0,"Nel Codice le figure sono tre: il titolare, il responsabile e gli incaricati. Con il regolamento europeo, gli incaricati diventeranno le persone autorizzate al trattamento."),
 (4,"chiaro",0,"In quegli anni la protezione dei dati sale di rango. La Carta dei diritti fondamentali dell'Unione europea, all'articolo 8, la riconosce come diritto autonomo, distinto dal rispetto della vita privata."),
 (4,"chiaro",0.6,"Negli ospedali questa stagione porta l'informativa ai pazienti, le regole sulla consegna dei referti, la cura nel chiamare le persone in sala d'attesa senza rivelarne la malattia."),
 (4,"tenue",0.8,"Attenzione: il Codice del 2003 non e' stato abrogato dal regolamento europeo. E' ancora in vigore, profondamente modificato."),
 (4,"profondo",1.2,"Il 2003: un codice unico, regole per ogni settore."),

 (5,"chiaro",0.5,"La terza stagione e' europea. Il regolamento 2016/679, noto come GDPR, e' adottato il 27 aprile 2016 ed entra in vigore nel maggio dello stesso anno."),
 (5,"chiaro",0,"Ma si applica dal 25 maggio 2018. Due anni di tempo per adeguarsi: e' questa la data che tutti ricordano."),
 (5,"chiaro",0,"Perche' un regolamento e non un'altra direttiva? Perche' il regolamento e' direttamente applicabile in ciascuno Stato membro. Non serve una legge nazionale che lo recepisca: le regole sono le stesse ovunque."),
 (5,"chiaro",0,"Il regolamento abroga la vecchia direttiva 95/46, quella da cui era nata la legge 675. Si chiude cosi' la prima stagione anche sul piano europeo."),
 (5,"chiaro",0,"L'Italia adegua comunque il proprio diritto con il decreto legislativo 101 del 2018. Il Codice resta, ma viene riscritto: tiene le norme nazionali negli spazi che il regolamento lascia agli Stati."),
 (5,"chiaro",0,"Proprio la sanita', il lavoro e la pubblica amministrazione sono tra questi spazi. Per questo, nelle prossime lezioni, leggeremo insieme il regolamento e il Codice."),
 (5,"chiaro",0,"Il regolamento parte da alcune definizioni. Dato personale e' qualsiasi informazione su una persona fisica identificata o identificabile, anche indirettamente: un nome, un numero, un codice, un'immagine."),
 (5,"chiaro",0,"Trattamento e' qualsiasi operazione sui dati: raccogliere, registrare, consultare, comunicare, conservare, cancellare. Anche solo leggere una cartella clinica e' un trattamento."),
 (5,"chiaro",0,"L'interessato e' la persona a cui i dati si riferiscono. Il titolare e' chi decide finalita' e mezzi del trattamento: in un'azienda sanitaria, l'azienda stessa."),
 (5,"chiaro",0,"E il regolamento guarda oltre i confini. Si applica a chi ha uno stabilimento nell'Unione, ovunque tratti i dati. E anche a chi sta fuori, se offre beni o servizi a persone nell'Unione o ne monitora il comportamento."),
 (5,"chiaro",0.6,"Un esempio: una piattaforma di telemedicina con sede fuori dall'Europa, che offre consulti a pazienti italiani, deve rispettare il regolamento come un'azienda italiana."),
 (5,"tenue",0.8,"Un distrattore frequente: il GDPR non vale solo per chi ha sede in Europa. Conta anche dove si trovano le persone a cui i dati si riferiscono."),
 (5,"profondo",1.2,"Il 2018: regole uguali in tutta Europa, anche per chi viene da fuori."),

 (6,"chiaro",0.5,"L'idea che distingue il regolamento e' la responsabilizzazione, in inglese accountability. E' scritta nell'articolo 5: il titolare e' competente per il rispetto dei principi, ed e' in grado di comprovarlo."),
 (6,"chiaro",0,"Non basta fare le cose giuste: bisogna poterlo dimostrare. Documenti, procedure, scelte motivate. Se il Garante chiede, il titolare deve saper mostrare come protegge i dati."),
 (6,"chiaro",0,"L'articolo 24 precisa il metodo. Il titolare mette in atto misure tecniche e organizzative adeguate, tenendo conto della natura, del contesto, delle finalita' e dei rischi per le persone."),
 (6,"chiaro",0,"Cambia la logica. Prima c'era un elenco di misure minime, uguali per tutti. Ora c'e' un approccio basato sul rischio: ogni titolare valuta i propri trattamenti e sceglie le misure proporzionate."),
 (6,"chiaro",0,"L'articolo 25 aggiunge due principi. Protezione dei dati fin dalla progettazione: pensarci prima, quando si sceglie un software o si organizza un servizio."),
 (6,"chiaro",0,"E protezione per impostazione predefinita: di base, si trattano solo i dati necessari, e non si rendono accessibili a un numero indefinito di persone."),
 (6,"chiaro",0.6,"Un esempio in azienda sanitaria: un nuovo gestionale di reparto. Si decide prima chi vede quali dati, per quanto tempo si conservano, come si registrano gli accessi. Non dopo."),
 (6,"chiaro",0,"E per chi lavora in reparto o in ufficio? La responsabilizzazione passa anche da ciascuno: seguire le istruzioni ricevute, usare solo le proprie credenziali, consultare solo i dati che servono."),
 (6,"tenue",0.8,"Attenzione: accountability non significa inviare moduli al Garante. Significa organizzarsi e poter dimostrare di rispettare le regole."),
 (6,"profondo",1.2,"Non solo rispettare le regole: saperlo dimostrare."),

 (7,"chiaro",0.8,"Le tre cose che ti chiederanno. La prima: tre stagioni. La legge 675 del 1996, il Codice del 2003 in vigore dal 2004, il regolamento europeo 2016/679, applicabile dal 25 maggio 2018."),
 (7,"chiaro",0.8,"La seconda: il regolamento e' direttamente applicabile; il decreto 101 del 2018 adegua il Codice, che resta in vigore. E il regolamento vale anche per chi e' fuori dall'Unione, se tratta dati di persone nell'Unione."),
 (7,"chiaro",0.8,"La terza: responsabilizzazione. Il titolare rispetta i principi e sa dimostrarlo, con misure adeguate ai rischi, fin dalla progettazione e per impostazione predefinita."),
 (7,"tenue",0.8,"L'ultimo distrattore: il GDPR non e' entrato in vigore il 25 maggio 2018. Quella e' la data da cui si applica; in vigore lo era dal 2016."),

 (8,"profondo",0,"[warm] In sintesi: tre stagioni, un diritto della persona, un titolare che deve saper dimostrare. Nella prossima lezione: i principi del trattamento."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: 'La prima stagione', 4: 'La seconda stagione', 5: 'La terza stagione', 6: 'La responsabilizzazione', 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
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
