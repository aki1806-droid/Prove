# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 1.6 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (STRUTTURA, M1): Stato-Regioni; regionalizzazione e Titolo quinto; FSN e
# fabbisogno standard; le tipologie di azienda; la direzione strategica.
# Due «517» diversi: D.Lgs. 517/1993 (correttivo del 502) e D.Lgs. 517/1999
# (aziende ospedaliero-universitarie). Il copione lo dice apertamente.
# IRCCS mai come sigla nel parlato. «Titolo V» si scrive «Titolo quinto»:
# la voce lo leggeva «Titolo cinque» (prima generazione, buttata).
BLOCCHI = [
 (1,"chiaro",0,"[serious] Chi governa la sanita' italiana? Non c'e' una risposta sola. Ci sono lo Stato, ventuno sistemi sanitari regionali e oltre cento aziende. E ognuno risponde di un pezzo diverso."),
 (1,"chiaro",0,"E chi paga? Un finanziamento pubblico che vale oltre cento miliardi di euro l'anno, ripartito tra le Regioni con regole precise. E' la parte meno raccontata della riforma, e una delle piu' chieste."),
 (1,"profondo",1.2,"E' l'ultima lezione del modulo, e tiene insieme le altre: aziende, Regioni, quasi-mercato e livelli essenziali trovano qui chi li governa e chi li finanzia."),

 (2,"chiaro",0,"Quattro passaggi. Il rapporto tra Stato e Regioni, e la riforma del Titolo quinto. Il finanziamento, dal fondo sanitario ai costi standard. Le tipologie di azienda. E la direzione strategica."),

 (3,"chiaro",0,"Il decreto 502 aveva gia' spostato il baricentro verso le Regioni. Negli anni successivi il processo va avanti: si parla di regionalizzazione del Servizio Sanitario Nazionale."),
 (3,"chiaro",0,"La svolta costituzionale e' la riforma del Titolo quinto, con la legge costituzionale 3 del 2001. La tutela della salute diventa materia di legislazione concorrente tra Stato e Regioni."),
 (3,"chiaro",0,"Legislazione concorrente vuol dire che lo Stato fissa i principi fondamentali, e le Regioni fanno il resto: leggi di dettaglio, organizzazione, programmazione."),
 (3,"chiaro",0,"Allo Stato resta in esclusiva la determinazione dei livelli essenziali delle prestazioni, i LEA della lezione cinque. E' la garanzia che il diritto alla salute sia uguale in tutto il Paese."),
 (3,"chiaro",0,"Il risultato sono ventuno servizi sanitari regionali: diciannove Regioni e due Province autonome, Trento e Bolzano. Stesso quadro nazionale, organizzazioni anche molto diverse."),
 (3,"chiaro",0,"Il luogo dove Stato e Regioni si accordano e' la Conferenza Stato-Regioni. Le decisioni principali passano per intese, e per i Patti per la salute: accordi pluriennali su risorse e obiettivi."),
 (3,"tenue",0,"La regionalizzazione ha un prezzo: le differenze tra Regioni, nei servizi e nei tempi di attesa. E' la tensione permanente del sistema, tra autonomia e uguaglianza."),
 (3,"profondo",1.2,"Il principio: lo Stato garantisce l'uguaglianza, fissando i LEA e le risorse. Le Regioni garantiscono il servizio, organizzandolo e rispondendo dei conti."),

 (4,"chiaro",0,"Veniamo ai soldi. Ogni anno lo Stato fissa il livello complessivo del finanziamento del Servizio Sanitario Nazionale: il fabbisogno sanitario nazionale standard."),
 (4,"chiaro",0,"Le fonti sono diverse: l'IRAP, l'addizionale regionale all'IRPEF, una compartecipazione all'IVA, e le entrate proprie delle aziende, come i ticket."),
 (4,"chiaro",0,"Come si divide tra le Regioni? Il 502 introduce la quota capitaria: una cifra per abitante, ponderata per l'eta' della popolazione, perche' un anziano consuma piu' sanita' di un giovane."),
 (4,"chiaro",0,"E' gia' una rivoluzione rispetto alla spesa storica della lezione uno: le risorse non seguono piu' quanto si e' speso, ma quante persone si devono curare."),
 (4,"chiaro",0,"Con il federalismo fiscale arriva un criterio in piu': i costi standard, fissati dal decreto legislativo 68 del 2011."),
 (4,"chiaro",0,"L'idea e' semplice. Si prendono come riferimento le Regioni piu' virtuose, quelle che garantiscono i LEA in equilibrio di bilancio, e i loro costi diventano il parametro per tutte."),
 (4,"chiaro",0,"Il fabbisogno standard di ogni Regione si calcola cosi': quanto costerebbe garantire i LEA alla sua popolazione, se fosse gestita come le Regioni di riferimento."),
 (4,"tenue",0,"Attenzione: il costo standard non e' il costo medio di tutte le Regioni. E' il costo delle Regioni migliori. Chi spende di piu' copre la differenza con risorse proprie."),
 (4,"chiaro",0,"Poi la Regione distribuisce le risorse alle sue aziende, secondo criteri propri, e ne verifica ogni anno i bilanci. Una quota del finanziamento e' premiale: la ricevono le Regioni in regola con gli adempimenti."),
 (4,"chiaro",0,"E chi non rientra? Dalla meta' degli anni Duemila le Regioni con disavanzi gravi sottoscrivono con lo Stato un piano di rientro, con misure correttive, aumento delle imposte regionali e, nei casi estremi, il commissariamento."),
 (4,"profondo",1.2,"E' la fine definitiva del ripiano a pie' di lista. Chi spende oltre il dovuto paga con risorse proprie, e ne risponde ai cittadini e allo Stato."),

 (5,"chiaro",0,"Le aziende del sistema non sono tutte uguali. La prima tipologia e' l'azienda sanitaria locale, che nel Veneto si chiama ULSS: tutela la salute di chi risiede sul territorio."),
 (5,"chiaro",0,"La seconda e' l'azienda ospedaliera: un ospedale di rilievo nazionale e di alta specializzazione, costituito in azienda autonoma. La terza e' l'azienda ospedaliero-universitaria."),
 (5,"chiaro",0,"L'azienda ospedaliero-universitaria nasce con il decreto legislativo 517 del 1999: integra assistenza, didattica e ricerca, insieme a un'universita'. Attenzione: e' un altro 517, non il correttivo del 1993."),
 (5,"chiaro",0,"E' il caso dell'Azienda Ospedale Universita' di Padova, che vedrai da vicino nel modulo quattro."),
 (5,"chiaro",0,"Infine gli istituti di ricovero e cura a carattere scientifico: ospedali di eccellenza che fanno ricerca, riconosciuti dal Ministero della salute. Possono essere pubblici o privati."),
 (5,"chiaro",0,"E nel Veneto c'e' in piu' Azienda Zero, un ente di governance regionale che accentra funzioni comuni a tutte le aziende. La vedremo nel modulo due."),
 (5,"tenue",0,"Il distrattore: l'azienda ospedaliera non ha un territorio da tutelare. Non ha residenti: eroga prestazioni. La tutela della salute di una popolazione e' compito dell'azienda sanitaria locale."),

 (6,"chiaro",0,"Chi guida un'azienda, oggi? La direzione strategica: il direttore generale, con il direttore sanitario e il direttore amministrativo."),
 (6,"chiaro",0,"Il direttore sanitario dirige i servizi sanitari, ai fini organizzativi e igienico-sanitari: deve essere un medico con esperienza di direzione. Il direttore amministrativo dirige i servizi amministrativi."),
 (6,"chiaro",0,"Entrambi li nomina il direttore generale, e con lui condividono la direzione dell'azienda. Ma la responsabilita' ultima, e la rappresentanza legale, restano del direttore generale."),
 (6,"chiaro",0,"Accanto alla direzione ci sono altri due organi. Il collegio sindacale, che vigila sulla regolarita' amministrativa e contabile e sulla gestione economica."),
 (6,"chiaro",0,"Oggi il collegio sindacale ha tre componenti: uno designato dalla Regione, uno dal Ministero dell'economia e delle finanze, uno dal Ministero della salute."),
 (6,"chiaro",0,"E il collegio di direzione, che porta i professionisti nel governo dell'azienda: i direttori di dipartimento, di distretto, di presidio. E' la base del governo clinico."),
 (6,"chiaro",0,"L'organizzazione interna la fissa l'atto aziendale: dipartimenti, distretti, presidi. Nel modulo quattro lo ritroverai come la costituzione dell'azienda."),
 (6,"profondo",1.2,"Quindi gli organi sono tre: direttore generale, collegio di direzione, collegio sindacale. Il direttore sanitario e il direttore amministrativo non sono organi: affiancano il direttore generale."),

 (7,"chiaro",0,"Le tre cose che ti chiederanno. La prima: dopo il Titolo quinto del 2001 la tutela della salute e' legislazione concorrente. Allo Stato resta in esclusiva la determinazione dei LEA."),
 (7,"chiaro",0,"La seconda: il finanziamento. Il fabbisogno sanitario nazionale lo fissa lo Stato; si ripartisce tra le Regioni per quota capitaria ponderata e, dal decreto 68 del 2011, con i costi standard."),
 (7,"chiaro",0,"La terza: gli organi dell'azienda sono tre. Direttore generale, collegio di direzione, collegio sindacale."),
 (7,"tenue",0,"Il distrattore finale: il direttore sanitario e il direttore amministrativo non sono organi dell'azienda. E li nomina il direttore generale, non la Regione."),

 (8,"profondo",0,"[warm] In sintesi: lo Stato garantisce l'uguaglianza, le Regioni organizzano e rispondono dei conti, le aziende gestiscono. Con il modulo due entriamo nel Veneto: la legge regionale 19 del 2016 e Azienda Zero."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: 'Stato e Regioni', 4: 'Il finanziamento', 5: 'Le tipologie di azienda', 6: 'La direzione strategica', 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
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
