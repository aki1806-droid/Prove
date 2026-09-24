# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 4.4 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M4): il modello dipartimentale (definizione, finalita', criteri, appartenenza
# unica); i tipi di dipartimento: strutturale (direttore, comitato), funzionale (intra,
# trans-murale, inter-istituzionale; esempi), ad attivita' integrata nelle AOU; le unita'
# operative: UOC, UOSD, UOS, articolazioni funzionali (DGRV 1306/2017); responsabile unico;
# ricadute per il comparto (incarichi di funzione). Fonti: atto aziendale ULSS 5 Polesana;
# dispensa CISL FP «Diritto sanitario parte prima» (Galiazzo).
BLOCCHI = [
 (1,"chiaro",0,"[serious] Sul cartellino c'e' scritto il nome di un'unita' operativa complessa, e sotto quello di un dipartimento. Due sigle, due livelli. Capire la differenza vuol dire capire dove si decide del tuo lavoro."),
 (1,"chiaro",0,"L'organizzazione di un'azienda sanitaria e' fatta a scatole: il dipartimento contiene le unita' operative, e le unita' operative complesse possono contenere quelle semplici. Vediamo le regole."),
 (1,"profondo",1.2,"Le scatole in cui lavoriamo, e chi ne tiene le chiavi."),

 (2,"chiaro",0,"Quattro passaggi. Il modello dipartimentale. I tipi di dipartimento. Le unita' operative: complesse, semplici dipartimentali e semplici. E chi guida ciascuna struttura."),

 (3,"chiaro",0,"Il dipartimento e' un aggregato di unita' operative, complesse e semplici, che perseguono finalita' comuni pur mantenendo ciascuna la propria autonomia."),
 (3,"chiaro",0,"Perche' aggregare? Per integrare i professionisti, condividere le risorse, costruire percorsi comuni. Letti, sale operatorie, apparecchiature: rendono di piu' se gestiti insieme."),
 (3,"chiaro",0,"Pensa a due chirurgie che condividono la stessa piastra operatoria: se le sedute si programmano insieme, le sale non restano vuote e le liste d'attesa si accorciano."),
 (3,"chiaro",0,"L'organizzazione dipartimentale e' anche un requisito di legge: le aziende ospedaliere, come abbiamo visto nella lezione quattro punto uno, devono averla."),
 (3,"chiaro",0,"Il criterio per creare un dipartimento e' semplice da dire: mettere insieme unita' operative che, per motivi assistenziali, scientifici o organizzativi, ottengono di piu' lavorando insieme."),
 (3,"chiaro",0,"Una regola da ricordare: ogni unita' operativa complessa, o semplice dipartimentale, puo' far parte di un solo dipartimento strutturale. Non si sta in due scatole gerarchiche."),
 (3,"tenue",0,"Occhio a un distrattore: il dipartimento non toglie autonomia alle unita' operative. Le coordina e ne condivide le risorse, ma ciascuna resta responsabile della propria attivita'."),
 (3,"profondo",1.2,"Insieme per usare meglio le risorse, ognuno responsabile della propria parte."),

 (4,"chiaro",0,"Il primo tipo e' il dipartimento strutturale. Aggrega in modo gerarchico unita' operative complesse e semplici a valenza dipartimentale, per gestire in comune le risorse."),
 (4,"chiaro",0,"Lo guida un direttore, nominato dal direttore generale fra i direttori delle unita' operative complesse del dipartimento. L'incarico dura tre anni, viene verificato ed e' rinnovabile."),
 (4,"chiaro",0,"Accanto al direttore c'e' il comitato di dipartimento. Esprime pareri e proposte sul budget, sulle nuove attivita', sugli spazi e gli strumenti comuni, sulla formazione del personale."),
 (4,"chiaro",0,"Il secondo tipo e' il dipartimento funzionale. Le sue unita' operative restano nei propri dipartimenti strutturali: il funzionale le collega per coordinare attivita' complesse."),
 (4,"chiaro",0,"Qui la responsabilita' e' soprattutto di coordinamento e di integrazione, non di gestione diretta: le risorse restano alle singole unita' operative che lo compongono."),
 (4,"chiaro",0,"Qualche esempio di dipartimento funzionale: oncologia clinica, materno-infantile, riabilitazione, medicina trasfusionale, dipendenze. Temi che attraversano piu' reparti."),
 (4,"chiaro",0,"Possono essere interni a un ospedale, fra ospedale e territorio, o fra istituzioni diverse. E li affiancano le reti cliniche, per ictus, infarto, trauma e altre patologie."),
 (4,"chiaro",0,"Nelle aziende ospedaliero-universitarie c'e' poi il dipartimento ad attivita' integrata, dove assistenza, didattica e ricerca si incontrano. A Padova i dipartimenti ospedalieri sono dieci."),
 (4,"tenue",0,"Un distrattore frequente: nel dipartimento funzionale le risorse non passano al coordinatore. Restano alle unita' operative. Il funzionale coordina, lo strutturale gestisce."),
 (4,"profondo",1.2,"Lo strutturale gestisce le risorse, il funzionale coordina i percorsi."),

 (5,"chiaro",0,"Dentro i dipartimenti ci sono le unita' operative, di tre tipi: complesse, semplici a valenza dipartimentale e semplici. Nelle ULSS ci sono anche le semplici a valenza distrettuale."),
 (5,"chiaro",0,"L'unita' operativa complessa concentra competenze professionali e risorse umane, tecnologiche e finanziarie, con la responsabilita' di attivita' istituzionali specifiche."),
 (5,"chiaro",0,"Gestisce il budget assegnato ed eroga le prestazioni. La guida un direttore, che risponde sia degli aspetti professionali sia della gestione del personale e delle risorse."),
 (5,"chiaro",0,"Le unita' operative complesse sono stabilite dall'atto aziendale, sulla base della programmazione regionale. Possono essere cliniche, come una cardiologia, o tecniche e amministrative."),
 (5,"chiaro",0,"L'unita' operativa semplice a valenza dipartimentale, detta UOSD, non dipende da una complessa: risponde direttamente al dipartimento."),
 (5,"chiaro",0,"Ha un proprio budget e un proprio responsabile. Si crea quando un'attivita' ha un peso strategico, ha bisogno di molta autonomia, o deve gestire risorse rilevanti."),
 (5,"chiaro",0,"Un esempio tipico di UOSD e' un servizio molto specialistico che lavora per tutto il dipartimento, senza appartenere a un singolo reparto."),
 (5,"chiaro",0,"L'unita' operativa semplice, detta UOS, sta invece dentro un'unita' operativa complessa. Mette in evidenza un pezzo di attivita' che ha bisogno di autonomia e responsabilita'."),
 (5,"chiaro",0,"La guida un responsabile, in stretto rapporto con il direttore della complessa. E non ha un budget distinto e autonomo: i suoi obiettivi stanno dentro quelli della complessa."),
 (5,"chiaro",0,"Ci sono poi le articolazioni funzionali, previste dalla delibera regionale 1306: segmenti interni a una struttura, con competenze molto elevate, affidati a un incarico professionale di alta specializzazione."),
 (5,"chiaro",0,"Un esempio: in un dipartimento di area medica c'e' la complessa di medicina interna; dentro, una semplice di ecografia. Accanto, una semplice dipartimentale che risponde direttamente al dipartimento."),
 (5,"tenue",0,"Attenzione: UOS e UOSD non sono la stessa cosa. La UOS sta dentro una complessa e non ha un budget autonomo. La UOSD risponde al dipartimento e gestisce un proprio budget."),
 (5,"profondo",1.2,"Complessa, dipartimentale, semplice: tre livelli di autonomia e di responsabilita'."),

 (6,"chiaro",0,"Ogni articolazione ha un unico responsabile, con compiti, obiettivi e strumenti coerenti fra loro. E' uno dei criteri di organizzazione fissati dall'atto aziendale."),
 (6,"chiaro",0,"Per chi lavora nel comparto la struttura conta. Il budget della complessa decide risorse e obiettivi, anche quelli che arrivano al personale attraverso la valutazione."),
 (6,"chiaro",0,"Anche il comitato di dipartimento ti riguarda: i suoi pareri su formazione, spazi e organizzazione toccano direttamente il lavoro quotidiano dei reparti."),
 (6,"chiaro",0,"E gli incarichi di funzione del comparto, organizzativi o professionali, si collocano dentro questa architettura: il coordinamento di un'unita' operativa, una funzione trasversale di dipartimento."),
 (6,"chiaro",0,"Per questo leggere l'organigramma della propria azienda non e' un esercizio burocratico: dice chi decide sul tuo lavoro, con quali risorse, e dove puoi crescere."),

 (7,"chiaro",0,"Le tre cose che ti chiederanno. La prima: il dipartimento aggrega unita' operative complesse e semplici con finalita' comuni, e ciascuna mantiene la propria autonomia."),
 (7,"chiaro",0,"La seconda: il dipartimento strutturale gestisce le risorse ed e' guidato da un direttore scelto fra i direttori delle complesse; il funzionale coordina attivita' che attraversano piu' strutture."),
 (7,"chiaro",0,"La terza: la UOC ha un direttore e un budget; la UOSD risponde al dipartimento con un proprio budget; la UOS sta dentro una complessa, senza budget autonomo."),
 (7,"tenue",0,"L'ultimo distrattore: il direttore di dipartimento non e' un organo dell'azienda e non lo sceglie la Regione. Lo nomina il direttore generale, fra i direttori di unita' operativa complessa."),

 (8,"profondo",0,"[warm] In sintesi: dipartimenti che integrano, unita' operative che producono, un responsabile per ogni struttura. Nell'ultima lezione del modulo: governo clinico e continuita' assistenziale."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: 'Il modello dipartimentale', 4: 'I tipi di dipartimento', 5: "Le unita' operative", 6: 'Chi guida, e che cosa cambia per te', 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
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
