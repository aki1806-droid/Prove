# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 2.4 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (STRUTTURA, M2): da 21 a 9 ULSS; le nove aziende una per una; le aziende
# ospedaliero-universitarie. Fonte: L.R. Veneto 19/2016, art. 14 commi 1-8 (elenco
# delle soppresse e delle incorporazioni), art. 16, art. 26; dispensa CISL FP
# (Galiazzo) per le medie di popolazione. I nomi delle AOU sono quelli del PSSR
# 2019-2023: Azienda Ospedale-Universita' di Padova, AOU Integrata di Verona.
BLOCCHI = [
 (1,"chiaro",0,"[serious] Se lavori a Feltre, a Chioggia o a Legnago, dal primo gennaio 2017 il tuo datore di lavoro ha cambiato nome. Senza un trasferimento, senza una firma: l'ha deciso una legge."),
 (1,"chiaro",0,"E' l'articolo 14 della legge regionale 19 del 2016. Ridisegna la mappa sanitaria del Veneto: da ventuno aziende ULSS a nove."),
 (1,"profondo",1.2,"Nei quiz questa mappa torna di continuo: quale ULSS ha incorporato quale, dove sta la sede, come si chiama oggi. Oggi la impariamo."),

 (2,"chiaro",0,"Tre passaggi. Il meccanismo giuridico con cui si passa da ventuno a nove. Le nove ULSS, una per una. E le aziende che restano fuori dalla mappa delle ULSS: le due ospedaliero-universitarie e lo IOV."),

 (3,"chiaro",0,"Prima di tutto la data. Il nuovo assetto decorre dal primo gennaio 2017, anche se la legge e' del 25 ottobre 2016."),
 (3,"chiaro",0,"Il meccanismo e' la soppressione con incorporazione. Dodici aziende ULSS vengono soppresse. Le altre nove restano, cambiano nome e incorporano le soppresse del loro territorio."),
 (3,"chiaro",0,"Le dodici soppresse sono: Feltre, Alto Vicentino, Ovest Vicentino, Pieve di Soligo, Asolo, Mirano, Chioggia, Alta Padovana, Este, Adria, Legnago e Bussolengo."),
 (3,"chiaro",0,"Nota un dettaglio da quiz: le aziende incorporanti mantengono la loro sede legale. La sede di Treviso resta a Treviso, quella di Bassano resta a Bassano."),
 (3,"chiaro",0,"E cambia anche la numerazione. Le vecchie ULSS andavano da uno a ventidue. Le nuove vanno da uno a nove, e ognuna ha un nome oltre al numero."),
 (3,"tenue",0,"Attenzione: incorporazione non vuol dire chiusura dei servizi. Ospedali, distretti e sportelli delle aziende soppresse restano, e passano all'azienda che le incorpora."),

 (4,"chiaro",0,"Vediamole una per una, partendo da nord. L'ULSS 1 Dolomiti. Era l'ULSS di Belluno, e incorpora Feltre. Il suo territorio e' tutta la provincia di Belluno."),
 (4,"chiaro",0,"L'ULSS 2 Marca trevigiana. Era l'ULSS 9 di Treviso, e incorpora due aziende: Pieve di Soligo e Asolo. Il territorio e' tutta la provincia di Treviso."),
 (4,"chiaro",0,"L'ULSS 3 Serenissima. Era l'ULSS 12 veneziana, e incorpora Mirano e Chioggia. La sede resta a Venezia."),
 (4,"chiaro",0,"L'ULSS 4 Veneto Orientale. E' l'unica che non incorpora nessuno: era l'ULSS 10, cambia solo nome e numero. La sede e' a San Dona' di Piave."),
 (4,"chiaro",0,"Quindi la provincia di Venezia ha due ULSS: la Serenissima e il Veneto Orientale. E' una delle due eccezioni alla regola della provincia."),
 (4,"chiaro",0,"L'ULSS 5 Polesana. Era l'ULSS 18 di Rovigo, e incorpora Adria. Il territorio e' tutta la provincia di Rovigo."),
 (4,"chiaro",0,"L'ULSS 6 Euganea. Era l'ULSS 16 di Padova, e incorpora Alta Padovana ed Este. Il territorio e' tutta la provincia di Padova. E' l'ULSS che circonda l'Azienda Ospedale-Universita' di Padova."),
 (4,"chiaro",0,"L'ULSS 7 Pedemontana. Era l'ULSS 3 di Bassano del Grappa, e incorpora l'Alto Vicentino. La sede resta a Bassano."),
 (4,"chiaro",0,"L'ULSS 8 Berica. Era l'ULSS 6 di Vicenza, e incorpora l'Ovest Vicentino. La sede resta a Vicenza. Ecco la seconda eccezione: la provincia di Vicenza ha due ULSS, Pedemontana e Berica."),
 (4,"chiaro",0,"L'ULSS 9 Scaligera. Era l'ULSS 20 di Verona, e incorpora due aziende: Legnago e Bussolengo. Il territorio e' tutta la provincia di Verona."),
 (4,"chiaro",0,"Un modo per ricordarle: quattro ULSS incorporano due aziende ciascuna. Marca trevigiana, Serenissima, Euganea e Scaligera. Altre quattro ne incorporano una. Il Veneto Orientale, nessuna."),
 (4,"chiaro",0,"Il conto torna: quattro per due fa otto, piu' le quattro che ne incorporano una sola, cioe' Dolomiti, Polesana, Pedemontana e Berica. Otto piu' quattro: dodici soppresse."),
 (4,"chiaro",0,"Occhio ai numeri, perche' i quiz ci giocano. La vecchia ULSS 9 era Treviso, la nuova ULSS 9 e' Verona. La vecchia ULSS 6 era Vicenza, la nuova ULSS 6 e' Padova."),
 (4,"profondo",1.2,"Nove aziende, sette province. Una sola ULSS per provincia, tranne Venezia e Vicenza, che ne hanno due."),

 (5,"chiaro",0,"La mappa delle ULSS non e' tutto. L'articolo 14 chiede di tenere conto delle altre aziende presenti sul territorio: le due aziende ospedaliere di Padova e di Verona, lo IOV e Azienda Zero."),
 (5,"chiaro",0,"A Padova c'e' l'Azienda Ospedale-Universita', che integra assistenza, didattica e ricerca con l'Universita' di Padova. E' l'azienda che vedrai da vicino nel modulo quattro."),
 (5,"chiaro",0,"A Verona c'e' l'Azienda Ospedaliera Universitaria Integrata, con l'Universita' di Verona. Il Piano socio-sanitario le indica entrambe come ospedali di eccellenza di rilievo regionale."),
 (5,"chiaro",0,"E poi l'Istituto Oncologico Veneto, lo IOV: un istituto di ricovero e cura a carattere scientifico, riferimento regionale per la patologia oncologica."),
 (5,"chiaro",0,"Queste aziende non hanno un territorio con dei residenti. Stanno dentro il territorio di una ULSS, ma non ne fanno parte: sono aziende autonome, con i loro organi."),
 (5,"chiaro",0,"Il quadro complessivo, allora: nove ULSS, due aziende ospedaliero-universitarie, un istituto oncologico. E sopra di loro, per le funzioni comuni, Azienda Zero."),
 (5,"chiaro",0,"Con nove aziende ULSS il Veneto ha in media circa cinquecentoquarantacinquemila abitanti per azienda. La media nazionale e' di circa cinquecentoduemila."),

 (6,"chiaro",0,"Che cosa succede dopo il primo gennaio 2017? Ogni riferimento normativo ai vecchi bacini delle ULSS si intende riferito ai nuovi ambiti."),
 (6,"chiaro",0,"I territori delle vecchie ULSS non spariscono: diventano distretti della nuova azienda, con funzioni di coordinamento tra l'ospedale e la rete territoriale. Lo vedremo nella lezione due punto sei."),
 (6,"chiaro",0,"Le nuove aziende devono garantire un'organizzazione capillare di sportelli e servizi, per facilitare l'accesso dei cittadini alle prestazioni."),
 (6,"chiaro",0,"Per le zone con esigenze particolari, come i flussi turistici o l'emergenza-urgenza, la Giunta puo' introdurre modelli gestionali e organizzativi particolari, sentite le Conferenze dei Sindaci."),
 (6,"chiaro",0,"E la legge chiede di misurare il risultato. Dopo il bilancio consuntivo del 2017 l'Area Sanita' e Sociale, con Azienda Zero, quantifica i risparmi del primo anno."),
 (6,"chiaro",0,"Quei risparmi servono a un piano di interventi per rendere omogenei i servizi dentro ogni nuova azienda. I risparmi della fusione tornano ai cittadini dello stesso territorio."),
 (6,"chiaro",0,"Infine la verifica: dopo il primo triennio la Giunta valuta l'assetto delle ULSS, con l'Osservatorio regionale e gli Osservatori aziendali. E sulla base dei risultati puo' proporre nuove leggi."),
 (6,"profondo",1.2,"La mappa, quindi, non e' definitiva per legge: e' sottoposta a verifica periodica. L'assetto a nove ULSS e' quello su cui si basa tutta la programmazione successiva."),

 (7,"chiaro",0,"Aziende piu' grandi, direzioni piu' robuste. La legge 19 modifica la 56 del 1994: gli organi di ULSS e aziende ospedaliere sono direttore generale, collegio di direzione e collegio sindacale."),
 (7,"chiaro",0,"Il direttore sanitario, il direttore amministrativo e il direttore dei servizi socio-sanitari non possono fare piu' di due mandati consecutivi nella stessa azienda."),
 (7,"chiaro",0,"Per le aziende piu' grandi, due figure di supporto: oltre tremila posti letto un coordinatore sanitario, oltre cinquecentomila abitanti un coordinatore amministrativo."),
 (7,"chiaro",0,"Infine i commissari. Se un direttore generale decade, per gravi motivi o per il mancato equilibrio di bilancio, il Presidente della Giunta puo' nominare un commissario, per un anno rinnovabile una sola volta."),

 (8,"chiaro",0,"Le tre cose che ti chiederanno. La prima: dal primo gennaio 2017 le ULSS passano da ventuno a nove, per soppressione di dodici aziende e incorporazione nelle altre nove."),
 (8,"chiaro",0,"La seconda: i nomi. Uno Dolomiti, due Marca trevigiana, tre Serenissima, quattro Veneto Orientale, cinque Polesana, sei Euganea, sette Pedemontana, otto Berica, nove Scaligera."),
 (8,"chiaro",0,"La terza: accanto alle ULSS ci sono l'Azienda Ospedale-Universita' di Padova, l'Azienda Ospedaliera Universitaria Integrata di Verona e l'Istituto Oncologico Veneto."),
 (8,"tenue",0,"Il distrattore: il Veneto Orientale non incorpora nessuna azienda. Cambia solo nome e numero, e la sede resta a San Dona' di Piave."),

 (9,"profondo",0,"[warm] In sintesi: dodici aziende soppresse, nove che le incorporano, sette province, e tre aziende fuori dalla mappa delle ULSS. Nella prossima lezione, la rete degli ospedali: il modello hub and spoke."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: 'Il meccanismo', 4: 'Le nove ULSS, una per una', 5: 'Le aziende ospedaliere e lo IOV', 6: 'Dopo il primo gennaio 2017', 7: 'Le direzioni delle nuove aziende', 8: 'Le tre cose che ti chiederanno', 9: 'Chiusura'}
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
