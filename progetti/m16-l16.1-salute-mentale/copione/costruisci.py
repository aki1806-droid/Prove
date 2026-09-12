# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Riscrittura del copione in origine/copione-di-partenza.md. Le 14 slide di
# partenza vengono dalla pipeline Gamma e non trasferiscono: a ~500 caratteri
# l'una sarebbero mezzo minuto a inquadratura, contro il tetto di 225. La
# struttura e l'ordine restano quelli; cambia il taglio.
#
# Registro dichiarato nel copione di partenza, e vale come vincolo: fermo nel
# correggere i pregiudizi, mai moralistico, nessuna drammatizzazione. E sempre
# "persona con disturbo psichico", mai un sostantivo che identifichi la persona
# con la diagnosi - la regola e' anche il contenuto del capitolo 2.
BLOCCHI = [
 (1,"chiaro",0,"[warm] Benvenuta e benvenuto nel Modulo 16. E' il primo di tre moduli di approfondimento che si aggiungono al programma, e affronta un'area in cui molti OSS lavorano e su cui il corso finora si era solo affacciato."),
 (1,"chiaro",0,"E parto dalla definizione, perche' e' gia' una correzione di prospettiva: la salute mentale non e' l'assenza di disturbo. E' una condizione di benessere in cui la persona riconosce le proprie capacita'."),
 (1,"chiaro",0,"Affronta le difficolta' della vita, lavora in modo produttivo e contribuisce alla propria comunita'. Riguarda tutti, non solo chi ha una diagnosi."),

 (2,"chiaro",0,"Da questa definizione discendono due conseguenze. La prima: si puo' avere un disturbo psichico ed essere in una condizione di benessere, cosi' come si puo' stare male senza avere alcuna diagnosi."),
 (2,"chiaro",0,"La seconda riguarda il linguaggio, ed e' la fonte di molti fraintendimenti: il disturbo psichico e' una condizione di salute, non un tratto della persona."),
 (2,"profondo",1.2,"Non si e' schizofrenici: si ha una diagnosi di schizofrenia. Sembra una sottigliezza, ma non lo e': il linguaggio costruisce lo sguardo, e lo sguardo determina come si assiste."),

 (3,"chiaro",0,"La legge 180 del 1978, nota come legge Basaglia, ha disposto il superamento degli ospedali psichiatrici e ha affermato un principio: la persona con disturbo psichico e' un cittadino con diritti."),
 (3,"chiaro",0,"Prima della legge si aveva l'internamento in ospedale psichiatrico, con un ricovero fondato sulla pericolosita' e sul pubblico scandalo, e la perdita dei diritti civili: la persona era oggetto di custodia."),
 (3,"chiaro",0,"Dopo la legge si ha la cura nei servizi territoriali, fondata sul consenso come per ogni altra condizione di salute, con piena titolarita' dei diritti: la persona e' soggetto di cura."),
 (3,"chiaro",0,"La legge 180 e' poi confluita nella legge 833, quella che istituisce il Servizio Sanitario Nazionale. Se di questo modulo ti chiedono una data sola, e' il 1978."),

 (4,"profondo",1.2,"E il principio che ne discende, e che vale ancora oggi: il trattamento sanitario e' di norma volontario. Il Trattamento Sanitario Obbligatorio, il TSO, e' l'eccezione, ed e' disciplinato per legge."),
 (4,"chiaro",0,"Lo hai gia' incontrato nella lezione dodici punto uno, ma qui lo vediamo nel dettaglio, perche' e' la domanda piu' probabile dell'intero modulo."),

 (5,"chiaro",0,"Le tre condizioni del TSO. Prima: esistono alterazioni psichiche tali da richiedere urgenti interventi terapeutici. Seconda: gli interventi non sono accettati dalla persona."),
 (5,"chiaro",0,"Terza: non e' possibile adottare tempestive misure extraospedaliere, cioe' fuori dall'ospedale."),
 (5,"profondo",1.2,"E il punto che i quiz chiedono: le tre condizioni devono ricorrere insieme. Non basta il rifiuto delle cure, non basta l'urgenza: servono tutte e tre."),

 (6,"chiaro",0,"La procedura: proposta di un medico, convalida di un secondo medico della struttura pubblica, ordinanza del Sindaco, e comunicazione al giudice tutelare. Quattro passaggi, in quest'ordine."),
 (6,"chiaro",0,"E l'ordine non e' un elenco da mandare a memoria: dice chi decide che cosa. Due medici sulla necessita' di cura, il Sindaco come autorita' sanitaria locale, il giudice tutelare a garanzia della persona."),

 (7,"tenue",0,"Un chiarimento che vale la pena fare esplicitamente, perche' il fraintendimento e' diffuso anche tra gli operatori: il TSO non e' una misura di ordine pubblico."),
 (7,"profondo",1.2,"E non si fonda sulla pericolosita' della persona. Si fonda sulla necessita' di cura. E' una differenza sostanziale, ed e' il lascito della legge 180."),

 (8,"chiaro",0,"L'organizzazione dei servizi, con tre sigle da non confondere. Il DSM, Dipartimento di Salute Mentale, coordina tutti i servizi di salute mentale dell'azienda."),
 (8,"chiaro",0,"Il CSM, Centro di Salute Mentale, e' il servizio territoriale di riferimento: accoglienza, presa in carico, cura, domiciliarita'. Ed e' il perno di tutto il sistema."),
 (8,"chiaro",0,"L'SPDC, Servizio Psichiatrico di Diagnosi e Cura, e' il reparto ospedaliero per il ricovero nella fase acuta, con posti letto limitati per legge."),
 (8,"chiaro",0,"Poi il centro diurno, con attivita' riabilitative e risocializzanti, e le strutture residenziali, comunita' terapeutiche e gruppi appartamento a diversa intensita' assistenziale."),

 (9,"chiaro",0,"Il modello, se lo guardi bene, e' lo stesso della rete per la non autosufficienza che hai visto nella lezione tredici punto cinque: i servizi sono graduali e non alternativi."),
 (9,"profondo",1.2,"E la persona si muove tra i livelli in base ai bisogni. Con una differenza importante rispetto al passato: il baricentro e' il territorio, non l'ospedale."),

 (10,"chiaro",0,"Lo stigma e' un pregiudizio sociale che attribuisce alla persona con disturbo psichico caratteristiche negative, producendo esclusione. Si manifesta in tre forme."),
 (10,"chiaro",0,"Lo stigma sociale, con i pregiudizi diffusi su pericolosita', imprevedibilita' e inguaribilita'. L'autostigma, in cui la persona interiorizza il pregiudizio: si ritira, si vergogna, rinuncia a chiedere aiuto."),
 (10,"chiaro",0,"E lo stigma istituzionale, cioe' pratiche organizzative che trattano diversamente chi ha una diagnosi psichiatrica. Tre forme, e la terza e' quella che da dentro si nota meno."),

 (11,"profondo",0,"[serious] Il pregiudizio piu' diffuso, e il piu' dannoso, e' quello della pericolosita'. Vale la pena dirlo con chiarezza: la grande maggioranza delle persone con disturbo psichico non e' violenta."),
 (11,"profondo",1.2,"E ha anzi una probabilita' piu' alta della media di subire violenza. E' l'esatto contrario di quello che la rappresentazione comune suggerisce."),

 (12,"tenue",0,"Gli effetti concreti dello stigma: ritardo nella richiesta di aiuto, abbandono dei percorsi di cura, isolamento sociale, difficolta' lavorative e abitative."),
 (12,"chiaro",0,"E poi un effetto che riguarda direttamente il tuo lavoro: il peggioramento della salute fisica."),

 (13,"chiaro",0,"Esiste un fenomeno documentato che si chiama diagnostic overshadowing, e consiste nell'attribuire ogni sintomo alla diagnosi psichiatrica."),
 (13,"chiaro",0,"La persona con disturbo psichico che riferisce dolore, che non mangia, che e' confusa, va valutata esattamente come chiunque altro."),
 (13,"profondo",1.2,"Attribuire tutto alla diagnosi e' un errore clinico, e puo' ritardare il riconoscimento di una condizione fisica grave. Quando osservi e segnali, la diagnosi che la persona ha gia' non e' una spiegazione."),

 (14,"chiaro",0,"Il ruolo dell'OSS. Gli ambiti sono l'SPDC, le strutture residenziali, i centri diurni, i servizi territoriali e il domicilio. Che cosa fa: assistenza di base, igiene, alimentazione, cura di se'."),
 (14,"chiaro",0,"Che nella fase acuta sono spesso compromesse. Sostegno all'autonomia, cioe' accompagnare a fare e non fare al posto di: se la persona riesce a vestirsi in dieci minuti, quei dieci minuti sono assistenza."),
 (14,"chiaro",0,"Presenza e relazione, che in quest'area e' lo strumento assistenziale principale. Poi il sostegno alla quotidianita' con una routine stabile."),
 (14,"chiaro",0,"Osservazione di comportamento, ritmo sonno-veglia, alimentazione e variazioni. E segnalazione."),
 # "autonomamente" non e' un avverbio di riempimento e non si taglia per far
 # stare il blocco: senza, la frase dice che all'OSS non compete la terapia,
 # che e' un'altra affermazione. Il blocco sta nei 225 perche' l'elenco del
 # "che cosa fa" si e' preso una scena in piu' - ce n'era: 47 su 50.
 (14,"tenue",0,"Che cosa non compete: interpretare i contenuti del pensiero, gestire autonomamente la terapia, decidere misure restrittive, sostituirsi al colloquio clinico."),

 (15,"profondo",1.2,"[thoughtful] E la sintesi della lezione, che vale la pena tenere. In salute mentale l'assistenza di base non e' un contorno della cura: spesso e' la cura."),
 (15,"profondo",0,"Riprendere a lavarsi, a mangiare con regolarita', a uscire di casa non sono premesse del percorso terapeutico: ne sono parte. E sono esattamente il terreno su cui lavora l'OSS."),

 (16,"chiaro",0,"Riepiloghiamo. La salute mentale non e' assenza di disturbo e riguarda tutti. Il disturbo e' una condizione, non un tratto: non si e', si ha."),
 (16,"chiaro",0,"La legge 180 ha disposto il superamento manicomiale e affermato la titolarita' dei diritti, ed e' confluita nella legge 833. Il TSO richiede tre condizioni che devono ricorrere insieme."),
 (16,"chiaro",0,"Con la procedura proposta, convalida, ordinanza del Sindaco e comunicazione al giudice tutelare, e non e' una misura di ordine pubblico. DSM coordina, CSM e' il territorio, SPDC e' l'ospedale."),
 (16,"chiaro",0,"[warm] E lo stigma si manifesta come sociale, autostigma e istituzionale, con l'attenzione al diagnostic overshadowing. Nella prossima lezione vediamo i quadri principali e i segni da riconoscere. Ci vediamo li'."),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1:"Apertura",2:"Le due conseguenze",3:"La legge 180",
 4:"Volontario, e l'eccezione",5:"Le tre condizioni",6:"La procedura",
 7:"Che cosa il TSO non e'",8:"I servizi",9:"Il modello",10:"Lo stigma",
 11:"La pericolosita'",12:"Gli effetti",13:"Diagnostic overshadowing",
 14:"Il ruolo dell'OSS",15:"La sintesi",16:"Riepilogo"}
CPS = 17.0   # misurata su 1.2, confermata da 1.3 a 1.7

blocchi=[]
for i,(cap,tema,posa,txt) in enumerate(BLOCCHI, start=2):
    blocchi.append({"id":f"s{i:02d}","capitolo":cap,"tema":tema,"posa":posa,"text":txt})

errori=[]
tot=sum(len(b["text"]) for b in blocchi)
nscene=len(blocchi)+2
if nscene>50: errori.append(f"scene {nscene} > 50")
for b in blocchi:
    if any(c in ACCENTATE for c in b["text"]):
        errori.append(f'{b["id"]}: vocale accentata -> ' + "".join(sorted({c for c in b["text"] if c in ACCENTATE})))
    if len(b["text"])>225: errori.append(f'{b["id"]}: {len(b["text"])} car, blocco troppo lungo')
tags=sum(len(re.findall(r"\[[a-z]+\]", b["text"])) for b in blocchi)
if tags>6: errori.append(f"tag di intenzione: {tags} > 6")

pose=sum(b["posa"] for b in blocchi)
parlato=tot/CPS+pose; durata=parlato+3+10
print(f"blocchi   {len(blocchi)}        scene {nscene}/50")
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

acc=0; stacco=None
for i,b in enumerate(blocchi):
    acc+=len(b["text"])+1
    if acc>tot/2 and stacco is None and i+1<len(blocchi) and b["capitolo"]!=blocchi[i+1]["capitolo"]:
        stacco=b["id"]; a=acc
print(f"\nstacco tracce dopo {stacco}:  chunkA {a} car  ·  chunkB {tot-a} car   (limite 5000)")
print("\n" + ("OK, nessun errore" if not errori else "ERRORI:\n  " + "\n  ".join(errori)))
json.dump(blocchi, open("copione/blocchi.json","w",encoding="utf-8"), ensure_ascii=False, indent=1)
