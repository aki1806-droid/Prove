# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 3.4 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M3): la L.R. 55/1994 — strumenti di programmazione (piani, programmi,
# progetti; piano generale = piano attuativo locale, entro il 31/12, parere della
# Conferenza dei sindaci; piano della performance, D.Lgs. 150/2009); bilancio
# pluriennale e bilancio economico preventivo (entro il 31/12 dell'anno prima);
# contabilita' economico-patrimoniale, piano dei conti (art. 23), libri obbligatori,
# patrimonio; bilancio d'esercizio (entro il 30/04, cinque documenti, criteri, utile e
# perdita); fonti di finanziamento (art. 5). Fonti: dispensa CISL FP (Galiazzo),
# schede CISL FP. Testo della 55 non raggiungibile.
BLOCCHI = [
 (1,"chiaro",0,"[serious] Una famiglia che vuole comprare casa fa tre cose. Decide che cosa vuole. Fa i conti prima. E alla fine verifica quanto ha speso davvero. Un'azienda sanitaria fa lo stesso: ma per legge."),
 (1,"chiaro",0,"La legge che glielo impone e' la 55 del 1994: norme sull'assetto programmatorio, contabile, gestionale e di controllo delle ULSS e delle aziende ospedaliere. Due verbi contano: programmare, e rendere conto."),
 (1,"profondo",1.2,"Programmare prima, rendere conto dopo. E in mezzo, tenere i conti in ordine."),

 (2,"chiaro",0,"Quattro passaggi. Gli strumenti di programmazione. I bilanci di previsione. La contabilita' e il bilancio d'esercizio. E le fonti di finanziamento. Dal perche' ai numeri."),

 (3,"chiaro",0,"La legge parte dall'alto. Gli strumenti di programmazione sono il piano sanitario nazionale, il piano sanitario regionale e gli atti regionali di programmazione."),
 (3,"chiaro",0,"Dentro questa cornice le aziende programmano con tre strumenti, dal piu' generale al piu' dettagliato: piani, programmi e progetti."),
 (3,"chiaro",0,"I piani sono generali: riguardano l'azienda nel suo insieme, e fissano finalita' e obiettivi."),
 (3,"chiaro",0,"I programmi attuano i piani: definiscono le azioni per raggiungere un obiettivo. I progetti sono gli strumenti piu' dettagliati di tutti."),
 (3,"chiaro",0,"Un esempio. Il piano fissa l'obiettivo di ridurre le attese per le visite. Il programma decide di aprire gli ambulatori anche il sabato. Il progetto organizza quegli ambulatori, uno per uno."),
 (3,"chiaro",0,"Il documento principale e' il piano generale. Lo approva il direttore generale, e lo trasmette alla Giunta regionale entro il 31 dicembre. Dura quanto il piano sanitario regionale."),
 (3,"chiaro",0,"Il piano generale si chiama anche piano attuativo locale. E prima di approvarlo il direttore generale chiede il parere della Conferenza dei sindaci."),
 (3,"tenue",0,"Non confonderlo con il piano di zona. Il piano di zona programma i servizi sociali a integrazione socio-sanitaria, ed e' proposto e approvato dalla Conferenza dei sindaci."),
 (3,"chiaro",0,"Una nota di realta': secondo la dispensa, il piano generale triennale nelle ULSS venete non e' mai stato davvero adottato. Di fatto l'ha sostituito il piano della performance."),
 (3,"chiaro",0,"Il piano della performance arriva con il decreto legislativo 150 del 2009, la cosiddetta riforma Brunetta. Obiettivi, indicatori, risultati attesi: la stessa logica, con un nome nuovo."),
 (3,"profondo",1.2,"Piano, programma, progetto: dal perche' al come. Ogni passo piu' concreto del precedente."),

 (4,"chiaro",0,"Dal piano si passa ai numeri. Il bilancio pluriennale di previsione traduce il piano generale in termini economici, finanziari e patrimoniali."),
 (4,"chiaro",0,"Poi c'e' il bilancio economico preventivo. Si approva entro il 31 dicembre dell'anno precedente a quello a cui si riferisce."),
 (4,"chiaro",0,"Arriva prima dell'anno, non durante: l'azienda deve sapere in anticipo quanto prevede di spendere e quanto prevede di incassare. Senza un preventivo, ogni spesa sarebbe una sorpresa."),
 (4,"chiaro",0,"Per costruire il bilancio economico preventivo si usa la metodica di budget. La vedremo per intero nella prossima lezione."),
 (4,"chiaro",0,"Su questi documenti c'e' lo sguardo della Regione, che appone il visto di congruita'. E quello del collegio sindacale, con il suo parere preventivo."),
 (4,"tenue",0,"Occhio alle due date. Il 31 dicembre, per il preventivo dell'anno che viene. Il 30 aprile, per il bilancio d'esercizio dell'anno appena chiuso. Due momenti opposti."),
 (4,"profondo",1.2,"Prima si decide quanto spendere. Poi si spende. Poi si rende conto."),

 (5,"chiaro",0,"Poi la gestione vera. Le aziende tengono la contabilita' economico-patrimoniale, come un'impresa. Lo scopo: il risultato economico dell'esercizio e il patrimonio di funzionamento."),
 (5,"chiaro",0,"I valori si registrano secondo il piano dei conti, all'articolo ventitre': l'insieme dei conti del sistema contabile, ognuno dei quali raggruppa valori omogenei."),
 (5,"chiaro",0,"I libri obbligatori sono quattro: il libro giornale, il libro degli inventari, il libro degli atti del direttore generale, e il libro delle adunanze e dei verbali del collegio sindacale."),
 (5,"chiaro",0,"Il libro degli atti del direttore generale raccoglie le sue deliberazioni: e' la memoria ufficiale di quello che l'azienda ha deciso."),
 (5,"chiaro",0,"Il patrimonio comprende beni disponibili e indisponibili. Gli indisponibili hanno un regime giuridico speciale, perche' servono alle funzioni istituzionali: un ospedale, per esempio."),
 (5,"chiaro",0,"A fine anno arriva il bilancio d'esercizio. Deve rappresentare in modo chiaro, veritiero e corretto il risultato economico e la situazione patrimoniale e finanziaria."),
 (5,"chiaro",0,"Lo approva il direttore generale entro il 30 aprile dell'anno successivo a quello di riferimento."),
 (5,"chiaro",0,"E' composto da cinque documenti: stato patrimoniale, conto economico, nota integrativa, rendiconto finanziario e relazione sulla gestione, con il modello LA dei costi per livelli di assistenza."),
 (5,"chiaro",0,"Qualche criterio di redazione. I beni usati a lungo stanno fra le immobilizzazioni, al costo di acquisto o di produzione. Le scorte si valutano al costo medio ponderato mensile."),
 (5,"chiaro",0,"Per il resto si rinvia al codice civile. E per rendere omogenei i conti fra aziende, le indicazioni contabili le dava la Giunta: oggi le da' Azienda Zero."),
 (5,"chiaro",0,"Se c'e' un utile, ha tre destinazioni: gli investimenti, gli incentivi al personale e il fondo di riserva. Nessun dividendo: l'utile resta dentro il servizio pubblico."),
 (5,"chiaro",0,"Se c'e' una perdita, la relazione sulla gestione deve spiegarne i motivi. E la proposta di copertura della perdita passa dal controllo della Regione."),
 (5,"profondo",1.2,"Il bilancio d'esercizio e' il momento della verita': quello che si era previsto, contro quello che e' successo."),

 (6,"chiaro",0,"Da dove arrivano i soldi? L'articolo cinque della legge 55 elenca le fonti di finanziamento delle aziende. Sono tante voci, ma una pesa piu' di tutte."),
 (6,"chiaro",0,"Per una ULSS la prima e' la quota di riparto regionale, calcolata su base capitaria, cioe' in base alla popolazione, e corretta con la compensazione della mobilita' sanitaria."),
 (6,"chiaro",0,"La mobilita' funziona cosi': se un tuo residente si cura in un'altra azienda, o in un'altra regione, il costo si compensa. I soldi seguono il paziente."),
 (6,"chiaro",0,"Pensa a un paziente di Rovigo operato a Padova: la sua ULSS paga, l'azienda che l'ha curato incassa. La compensazione tiene in equilibrio i conti del sistema."),
 (6,"chiaro",0,"Poi i contributi di Regione e Stato, e le risorse da convenzioni. I ricavi per servizi resi, compresa la libera professione. E concorsi, recuperi e rimborsi, come i ticket."),
 (6,"chiaro",0,"E ancora: ricavi e rendite del patrimonio, contributi per il ripiano delle perdite, utili degli anni precedenti, donazioni. Infine l'anticipazione del tesoriere e i mutui."),
 (6,"chiaro",0,"Per l'azienda ospedaliera la lista e' quasi uguale, con una differenza che conta: al posto della quota capitaria ci sono gli introiti per le prestazioni erogate."),
 (6,"tenue",0,"Un distrattore frequente: la ULSS e l'azienda ospedaliera non si finanziano allo stesso modo. La prima in base alla popolazione, la seconda in base alle prestazioni."),

 (7,"chiaro",0,"Le tre cose che ti chiederanno. La prima: il piano generale lo approva il direttore generale, sentita la Conferenza dei sindaci, e lo trasmette alla Giunta entro il 31 dicembre."),
 (7,"chiaro",0,"La seconda: il bilancio economico preventivo si approva entro il 31 dicembre dell'anno prima. Il bilancio d'esercizio, entro il 30 aprile dell'anno dopo."),
 (7,"chiaro",0,"La terza: l'utile va a investimenti, incentivi al personale e fondo di riserva. E la ULSS si finanzia con la quota capitaria, l'azienda ospedaliera con le prestazioni."),
 (7,"tenue",0,"L'ultimo distrattore: il bilancio d'esercizio non lo approva la Giunta regionale. Lo approva il direttore generale. Alla Regione spetta il controllo."),

 (8,"profondo",0,"[warm] In sintesi: programmare prima, tenere i conti durante, rendere conto dopo. Nell'ultima lezione del modulo: il budget, i controlli e i tre principi guida."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: 'Programmare', 4: 'I bilanci di previsione', 5: 'Tenere i conti e rendere conto', 6: 'Da dove arrivano i soldi', 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
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
