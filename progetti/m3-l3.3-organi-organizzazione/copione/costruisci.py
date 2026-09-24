# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 3.3 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M3): organi e organizzazione interna dell'azienda — organi (L.R. 56/1994
# art. 10, direttore generale art. 13; collegio dei revisori L.R. 55/1994 artt. 40-44);
# direzione strategica e direttore dei servizi socio-sanitari; consiglio dei sanitari;
# collegio di direzione (D.Lgs. 502/1992 art. 17); ospedale, territorio, prevenzione;
# distretto e dipartimento di prevenzione; dipartimenti e UOC/UOS; servizi
# amministrativi (L.R. 56 art. 21) e controllo di gestione (art. 20); atto aziendale.
# Fonti: schede CISL FP con i riferimenti agli articoli; dispensa CISL FP (Galiazzo);
# L.R. 19/2016 (organi art. 31, coordinatori). Testo delle leggi del 1994 non raggiungibile.
BLOCCHI = [
 (1,"chiaro",0,"[serious] Entri in una ULSS come dipendente. Nel primo mese senti nominare il direttore generale, il collegio sindacale, il distretto, il dipartimento, l'unita' operativa complessa. Chi sono? E chi decide che cosa?"),
 (1,"chiaro",0,"La legge 56 risponde in due modi. Con gli organi, che governano l'azienda. E con l'organizzazione interna, che la fa funzionare ogni giorno."),
 (1,"profondo",1.2,"Organi e strutture: la mappa per non perdersi dentro l'azienda."),

 (2,"chiaro",0,"Quattro passaggi. Gli organi dell'azienda. La direzione e gli organismi che la affiancano. Le tre grandi aree: ospedale, territorio, prevenzione. E dipartimenti, unita' operative e servizi di supporto."),

 (3,"chiaro",0,"Nella legge 56 del 1994 gli organi dell'azienda sono due: il direttore generale e il collegio dei revisori. Ne parla l'articolo dieci; al direttore generale e' dedicato l'articolo tredici."),
 (3,"chiaro",0,"Il direttore generale e' nominato dalla Giunta regionale, sentito il Consiglio regionale. E' il legale rappresentante dell'azienda, e ne ha la responsabilita' complessiva."),
 (3,"chiaro",0,"Risponde del raggiungimento degli obiettivi che gli assegna la Giunta, e della gestione corretta ed economica delle risorse. Per questo la sua attivita' viene valutata ogni anno."),
 (3,"chiaro",0,"Ed e' il direttore generale a nominare i suoi piu' stretti collaboratori: il direttore sanitario, il direttore amministrativo e il direttore dei servizi socio-sanitari."),
 (3,"chiaro",0,"Il secondo organo e' il collegio dei revisori. Tre componenti: uno designato dalla Giunta regionale, uno dal ministero dell'Economia e delle finanze, uno dal ministero della Salute."),
 (3,"chiaro",0,"Vigila sulla regolarita' amministrativa e contabile: la tenuta dei libri contabili, gli adempimenti fiscali, i singoli atti di gestione e i titoli di spesa."),
 (3,"chiaro",0,"E vigila sulla gestione economica, finanziaria e patrimoniale: parere preventivo sui bilanci di previsione e sul budget generale, esame del bilancio d'esercizio. Le regole stanno nella legge 55."),
 (3,"tenue",0,"Attenzione ai nomi di oggi: lo stesso organo si chiama collegio sindacale. E con la legge 19 del 2016 gli organi diventano tre: direttore generale, collegio di direzione e collegio sindacale."),
 (3,"profondo",1.2,"Uno decide e risponde. L'altro controlla i conti."),

 (4,"chiaro",0,"Accanto al direttore generale lavora la direzione strategica. Il direttore sanitario e il direttore amministrativo lo coadiuvano, con pareri obbligatori sugli atti delle loro materie."),
 (4,"chiaro",0,"Nel Veneto c'e' una terza figura: il direttore dei servizi socio-sanitari. Lo nomina il direttore generale, sentito il sindaco o la rappresentanza della Conferenza dei sindaci."),
 (4,"chiaro",0,"E' la firma del modello veneto dentro la direzione: il sociale ha un suo direttore, seduto allo stesso tavolo del sanitario e dell'amministrativo."),
 (4,"chiaro",0,"La legge 19 aggiunge due regole. Sopra i tremila posti letto il direttore sanitario puo' farsi aiutare da un coordinatore sanitario. Sopra i cinquecentomila abitanti, l'amministrativo da un coordinatore amministrativo."),
 (4,"chiaro",0,"Poi ci sono gli organismi che consigliano. Il consiglio dei sanitari, previsto dalla legge 56, e' un organismo elettivo di consulenza tecnico-sanitaria."),
 (4,"chiaro",0,"Lo presiede il direttore sanitario, e ne fanno parte i rappresentanti delle professioni sanitarie dell'azienda: medici, infermieri, tecnici, farmacisti e altri."),
 (4,"chiaro",0,"Il collegio di direzione viene invece dal decreto 502. Lo presiede il direttore generale, e riunisce il direttore sanitario, i direttori di dipartimento, il direttore dei servizi socio-sanitari e i responsabili di distretto."),
 (4,"chiaro",0,"Serve al governo clinico: fa lavorare insieme la direzione strategica e i professionisti, sulla programmazione e sulle proposte di miglioramento."),
 (4,"tenue",0,"Uno scambio frequente: il consiglio dei sanitari lo presiede il direttore sanitario. Il collegio di direzione lo presiede il direttore generale."),

 (5,"chiaro",0,"Scendiamo nell'organizzazione. Una ULSS si articola in tre grandi aree: l'ospedale, il territorio e la prevenzione."),
 (5,"chiaro",0,"L'ospedale, con le sue unita' di ricovero e cura. Il territorio, con i distretti, i medici di medicina generale, i pediatri di libera scelta e le farmacie."),
 (5,"chiaro",0,"E la prevenzione, con il dipartimento di prevenzione: igiene e sanita' pubblica, screening, servizi veterinari."),
 (5,"chiaro",0,"Il distretto e' la struttura territoriale fondamentale. Coordina e gestisce i servizi sanitari e socio-sanitari per un territorio definito, di solito un insieme di Comuni."),
 (5,"chiaro",0,"Ha due funzioni: garantire l'integrazione fra assistenza sanitaria e servizi sociali, e pianificare, coordinare e valutare i servizi sul territorio."),
 (5,"chiaro",0,"Gestisce l'assistenza primaria, le cure domiciliari, i consultori, i servizi per anziani e disabili, il raccordo con gli ospedali. E' la casa della salute del cittadino."),
 (5,"chiaro",0,"Il distretto lo abbiamo visto nel modulo due. Qui conta un punto: nel Veneto e' lo snodo dell'integrazione, perche' li' il sociale delegato dai Comuni incontra la sanita'."),
 (5,"chiaro",0,"Il dipartimento di prevenzione si occupa della salute collettiva: malattie infettive e vaccinazioni, igiene degli alimenti, qualita' dell'acqua e dell'aria, sicurezza nei luoghi di lavoro."),
 (5,"chiaro",0,"E poi gli screening, l'educazione alla salute e i servizi veterinari. Lavora su chi sta bene, perche' continui a stare bene."),
 (5,"chiaro",0,"Pensa a una mamma con un neonato: il consultorio e il pediatra stanno nel territorio, le vaccinazioni nella prevenzione, il parto e' avvenuto in ospedale. Tre aree, un solo percorso."),
 (5,"profondo",1.2,"Ospedale, territorio, prevenzione: tre porte, una sola azienda."),

 (6,"chiaro",0,"Dentro le tre aree ci sono le strutture operative. Il dipartimento raggruppa unita' operative affini, per funzione o per area clinica."),
 (6,"chiaro",0,"Le unita' operative possono essere complesse o semplici. Sono i centri operativi, clinici o amministrativi, dove il lavoro si fa ogni giorno."),
 (6,"chiaro",0,"Il modello dipartimentale serve a integrare: professionisti vicini, risorse condivise, percorsi comuni. E' l'integrazione funzionale, dentro l'azienda."),
 (6,"chiaro",0,"Poi i servizi di supporto. La legge 56, all'articolo ventuno, chiede all'azienda di definire l'assetto dei servizi amministrativi, tecnici e professionali."),
 (6,"chiaro",0,"Sono quelli che acquisiscono, organizzano e gestiscono le risorse dell'azienda: umane, informative, finanziarie, patrimoniali e materiali."),
 (6,"chiaro",0,"Qualche esempio: risorse umane, contabilita' e bilancio, provveditorato ed economato, servizi tecnici e patrimoniali, affari generali, sistemi informativi."),
 (6,"chiaro",0,"Sono uffici che il cittadino vede poco. Ma senza di loro nessun reparto aprirebbe: il personale, gli acquisti, gli edifici, i dati."),
 (6,"chiaro",0,"C'e' poi il controllo di gestione, all'articolo venti: un'unita' nominata dal direttore generale, alle sue dirette dipendenze, che applica la metodica di budget. Lo ritroveremo nella lezione tre punto cinque."),
 (6,"chiaro",0,"Tutto questo si mette per iscritto nell'atto aziendale: il documento che fissa organizzazione, funzioni e strutture di ogni azienda. Nel Veneto lo regolano la legge 19 e le linee guida regionali."),

 (7,"chiaro",0,"Le tre cose che ti chiederanno. La prima: nella legge 56 gli organi sono il direttore generale e il collegio dei revisori. Oggi il collegio si chiama sindacale, e la legge 19 aggiunge il collegio di direzione."),
 (7,"chiaro",0,"La seconda: il direttore generale nomina il direttore sanitario, quello amministrativo e quello dei servizi socio-sanitari. Quest'ultimo, sentita la Conferenza dei sindaci."),
 (7,"chiaro",0,"La terza: la ULSS si articola in ospedale, territorio con i distretti, e prevenzione. Dentro, dipartimenti e unita' operative complesse e semplici."),
 (7,"tenue",0,"L'ultimo distrattore: il collegio dei revisori non e' nominato tutto dalla Regione. I tre componenti li designano la Giunta regionale, il ministero dell'Economia e il ministero della Salute."),

 (8,"profondo",0,"[warm] In sintesi: pochi organi che decidono e controllano, e tre aree che portano i servizi vicino alle persone. Nella prossima lezione, la legge 55: programmare e rendere conto."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: 'Gli organi', 4: 'La direzione e chi la affianca', 5: 'Ospedale, territorio, prevenzione', 6: "Dipartimenti, unita' operative e servizi", 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
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
