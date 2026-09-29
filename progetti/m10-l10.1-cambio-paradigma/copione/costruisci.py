# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 10.1 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M10): il cambio di paradigma del 2023. L. 109/1994; D.Lgs. 163/2006; D.Lgs. 50/2016 (direttive
# 2014/23, 24, 25/UE; linee guida ANAC; correttivi e decreti semplificazioni 2019-2021); L. 78/2022 (delega);
# D.Lgs. 31 marzo 2023, n. 36 (in vigore 1/4/2023, efficace 1/7/2023; digitalizzazione dal 1/1/2024;
# autoapplicativo, allegati al posto del regolamento); artt. 1 (risultato), 2 (fiducia), 3 (accesso al
# mercato), 4 (criterio interpretativo), 5-11; D.Lgs. 209/2024 (correttivo). Fonti: dispense su Drive sul
# D.Lgs. 36/2023 (con correzioni); conoscenza generale. Testo vigente non letto: da verificare.
BLOCCHI = [
 (1,"chiaro",0.8,"[serious] Un'azienda sanitaria deve acquistare nuovi letti per la terapia intensiva. Servono in fretta, devono essere buoni e il prezzo deve essere giusto. Quale regola viene prima?"),
 (1,"chiaro",0,"Per anni la risposta e' stata: la procedura. Carte perfette, anche se i letti arrivavano tardi. Il codice dei contratti del 2023 prova a cambiare la risposta: prima di tutto, il risultato."),
 (1,"profondo",1.2,"Dalla procedura come fine al risultato come fine."),

 (2,"chiaro",0.6,"Quattro passaggi. I problemi del vecchio codice. Come nasce il codice del 2023. I tre principi che lo reggono: risultato, fiducia, accesso al mercato. E gli altri principi da conoscere."),

 (3,"chiaro",0.5,"Gli appalti pubblici sono i contratti con cui un'amministrazione acquista lavori, beni e servizi. Muovono una parte importante della spesa pubblica, e nella sanita' una parte enorme."),
 (3,"chiaro",0,"Le regole vengono in gran parte dalle direttive europee: concorrenza, parita' di trattamento, trasparenza. L'Italia le ha recepite con codici che si sono succeduti nel tempo."),
 (3,"chiaro",0,"Negli anni Novanta arriva la legge quadro sui lavori pubblici. Nel 2006 il primo codice dei contratti. Nel 2016 un nuovo codice, il decreto legislativo 50, che recepisce le direttive del 2014."),
 (3,"chiaro",0,"Il codice del 2016 rinviava molte regole a linee guida e a un regolamento che non e' mai arrivato del tutto. Il risultato era un sistema frammentato, difficile da leggere e da applicare."),
 (3,"chiaro",0,"E' stato modificato decine di volte: correttivi, decreti per sbloccare i cantieri, semplificazioni legate alla pandemia e al piano nazionale di ripresa e resilienza."),
 (3,"chiaro",0,"Il funzionario, stretto fra regole instabili e timore di sbagliare, tendeva a difendersi: piu' carte, piu' pareri, meno decisioni. E' quella che si chiama burocrazia difensiva."),
 (3,"chiaro",0.6,"Un esempio: per paura di contestazioni, una gara per un servizio semplice viene appesantita da richieste inutili. Partecipano poche imprese, i tempi si allungano, e il reparto aspetta."),
 (3,"tenue",0.8,"Occhio a un distrattore: il codice del 2016 non e' piu' quello da studiare. Dal primo luglio 2023 le nuove procedure seguono il decreto legislativo 36 del 2023."),
 (3,"profondo",1.2,"Troppe regole instabili producono paura, non legalita'."),

 (4,"chiaro",0.5,"Nel 2022 il Parlamento approva una legge delega per riscrivere la materia. Il testo del nuovo codice viene preparato dal Consiglio di Stato, con un lavoro di semplificazione."),
 (4,"chiaro",0,"Nasce cosi' il decreto legislativo 31 marzo 2023, numero 36: il nuovo codice dei contratti pubblici. Entra in vigore il primo aprile 2023, ma le sue regole si applicano dal primo luglio."),
 (4,"chiaro",0,"La digitalizzazione di tutto il ciclo di vita dei contratti diventa operativa dal primo gennaio 2024: piattaforme telematiche, banca dati nazionale, fascicolo digitale dell'impresa."),
 (4,"chiaro",0,"La novita' di metodo e' che il codice e' autoapplicativo: non serve un regolamento per farlo funzionare. Le regole di dettaglio stanno negli allegati, che fanno parte del codice stesso."),
 (4,"chiaro",0,"E' diviso in libri: principi e disposizioni comuni, appalti nei settori ordinari, settori speciali, partenariato pubblico privato e concessioni, contenzioso e disposizioni finali."),
 (4,"chiaro",0,"Le regole seguono le fasi del contratto: programmazione, progettazione, scelta del contraente, esecuzione. Chi lavora in un ufficio acquisti le ritrova nello stesso ordine in cui le incontra."),
 (4,"chiaro",0,"Alla fine del 2024 e' arrivato un decreto correttivo, che ha ritoccato molti articoli senza cambiarne l'impostazione. Per l'esame conviene conoscere l'architettura e i principi."),
 (4,"chiaro",0.6,"Un esempio: l'azienda che compra i letti oggi usa una piattaforma telematica certificata, e i dati della gara confluiscono nella banca dati nazionale dei contratti pubblici."),
 (4,"tenue",0.8,"Attenzione: il nuovo codice non ha bisogno di un regolamento attuativo per funzionare. Le regole di dettaglio sono negli allegati."),
 (4,"profondo",1.2,"Un codice che si applica da solo, allegati compresi."),

 (5,"chiaro",0.5,"Il codice si apre con tre principi. Il primo, all'articolo 1, e' il principio del risultato: affidare ed eseguire il contratto con la massima tempestivita' e il miglior rapporto tra qualita' e prezzo."),
 (5,"chiaro",0,"Il risultato non scavalca la legge: va perseguito nel rispetto dei principi di legalita', trasparenza e concorrenza. Ma diventa il criterio per esercitare la discrezionalita'."),
 (5,"chiaro",0,"Il secondo, all'articolo 2, e' il principio della fiducia: fiducia nell'azione legittima, trasparente e corretta dell'amministrazione, dei suoi funzionari e degli operatori economici."),
 (5,"chiaro",0,"Serve a valorizzare l'iniziativa e l'autonomia decisionale dei funzionari. Per questo il codice delimita la colpa grave e prevede coperture assicurative per il personale."),
 (5,"chiaro",0,"Il terzo, all'articolo 3, e' il principio dell'accesso al mercato: favorire la partecipazione delle imprese, nel rispetto di concorrenza, imparzialita', non discriminazione, pubblicita' e proporzionalita'."),
 (5,"chiaro",0,"I tre principi non sono decorazioni. L'articolo 4 dice che le altre norme del codice si interpretano e si applicano alla luce di questi tre principi."),
 (5,"chiaro",0.6,"Torniamo ai letti. Se il bando chiede requisiti sproporzionati, poche imprese partecipano e la consegna ritarda. Si tradiscono insieme il risultato e l'accesso al mercato."),
 (5,"tenue",0.8,"Un distrattore frequente: il principio del risultato non autorizza a violare le regole per fare prima. Il risultato si persegue nel rispetto della legalita'."),
 (5,"profondo",1.2,"Risultato, fiducia, mercato: la bussola del codice."),

 (6,"chiaro",0.5,"Seguono altri principi. Buona fede e tutela dell'affidamento: amministrazione e imprese devono comportarsi con correttezza, anche prima della firma del contratto."),
 (6,"chiaro",0,"Solidarieta' e sussidiarieta' orizzontale, che consentono forme di collaborazione con il terzo settore. E auto organizzazione: l'amministrazione puo' scegliere se fare da se' o affidare all'esterno."),
 (6,"chiaro",0,"Poi l'autonomia contrattuale, la conservazione dell'equilibrio del contratto quando circostanze straordinarie lo alterano, e la tassativita' delle cause di esclusione."),
 (6,"chiaro",0,"Un principio tocca da vicino il lavoro: al personale impiegato negli appalti si applica il contratto collettivo nazionale del settore, indicato dalla stazione appaltante."),
 (6,"chiaro",0,"E ci sono regole trasversali: prevenire e risolvere i conflitti di interesse di chi partecipa alla procedura, e garantire la trasparenza lungo tutto il ciclo di vita del contratto."),
 (6,"chiaro",0,"Negli affidamenti sotto soglia vale anche il principio di rotazione: di regola non si affida di nuovo allo stesso contraente uscente due commesse consecutive dello stesso settore."),
 (6,"chiaro",0.6,"Un esempio: il servizio di pulizie di un ospedale viene affidato. Nel bando va indicato il contratto collettivo applicabile, a tutela di chi lavorera' nei reparti."),
 (6,"tenue",0.8,"Attenzione: le cause di esclusione non si inventano bando per bando. Sono tassative: quelle previste dal codice, e non altre."),
 (6,"profondo",1.2,"Principi chiari per decisioni piu' libere e piu' responsabili."),

 (7,"chiaro",0.8,"Le tre cose che ti chiederanno. La prima: il nuovo codice e' il decreto legislativo 36 del 2023, in vigore dal primo aprile e applicabile dal primo luglio 2023."),
 (7,"chiaro",0.8,"La seconda: e' autoapplicativo, con le regole di dettaglio negli allegati; la digitalizzazione del ciclo di vita dei contratti e' operativa dal 2024."),
 (7,"chiaro",0.8,"La terza: i principi guida sono il risultato, la fiducia e l'accesso al mercato, e le altre norme si interpretano alla loro luce."),
 (7,"tenue",0.8,"L'ultimo distrattore: il principio della fiducia non elimina i controlli. Valorizza l'autonomia dei funzionari, dentro regole di legalita' e trasparenza."),

 (8,"profondo",0,"[warm] In sintesi: meno burocrazia difensiva, piu' risultato, piu' fiducia. Nella prossima lezione: che cosa distingue un appalto da una concessione, e a quali contratti si applica il codice."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: 'I problemi del vecchio codice', 4: 'Il codice del 2023', 5: 'Risultato, fiducia, accesso al mercato', 6: 'Gli altri principi', 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
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
