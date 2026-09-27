# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 7.6 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M7): ruoli, adempimenti, sanzioni. GDPR art. 4 n. 7-8, 10; art. 24, 26 (contitolari), 28 (responsabile:
# contratto, istruzioni documentate, sub-responsabili), 29 e Codice art. due quaterdecies (persone autorizzate,
# soggetti designati), 30 (registro), 32 (sicurezza), 33-34 (violazione: 72 ore; comunicazione agli
# interessati se rischio elevato), 35 (DPIA), 37-39 (DPO obbligatorio per enti pubblici; indipendenza; compiti),
# 77, 82, 83 (10 milioni o 2%; 20 milioni o 4%; par. 7 enti pubblici), Codice artt. 166-167 (da verificare).
# Fonti: GDPR, testo del Garante (ed. 2017); dispense su Drive (con correzioni).
BLOCCHI = [
 (1,"chiaro",0.8,"[serious] Venerdi' sera. Una mail con venti referti parte verso l'indirizzo sbagliato. Chi deve saperlo? Entro quando? E chi ne risponde: chi ha premuto invio, il dirigente, l'azienda?"),
 (1,"chiaro",0,"Per rispondere servono tre cose: sapere chi fa cosa nel trattamento, conoscere gli adempimenti che il regolamento impone, e le conseguenze se qualcosa va storto."),
 (1,"profondo",1.2,"Ruoli chiari, tempi certi, responsabilita' precise."),

 (2,"chiaro",0.6,"Quattro passaggi. Titolare, responsabile e persone autorizzate. Il responsabile della protezione dei dati. Registro, valutazione d'impatto e violazioni. E infine le sanzioni."),

 (3,"chiaro",0.5,"Il titolare e' chi determina finalita' e mezzi del trattamento. In un'azienda sanitaria pubblica e' l'azienda stessa, rappresentata dal direttore generale. Non il singolo dirigente, non l'ufficio."),
 (3,"chiaro",0,"Quando due o piu' soggetti decidono insieme finalita' e mezzi, sono contitolari. Un accordo interno stabilisce chi fa cosa, e l'interessato puo' rivolgersi a ciascuno."),
 (3,"chiaro",0,"Il responsabile del trattamento, nel regolamento, e' un soggetto diverso: tratta i dati per conto del titolare. Di solito e' esterno, come una ditta informatica o un servizio in appalto."),
 (3,"chiaro",0,"Il titolare deve scegliere responsabili che offrono garanzie sufficienti, e vincolarli con un contratto: istruzioni documentate, riservatezza, sicurezza, cancellazione o restituzione dei dati a fine servizio."),
 (3,"chiaro",0,"Il responsabile non puo' affidare il lavoro ad altri senza autorizzazione scritta del titolare. E se decide lui le finalita', diventa a sua volta titolare, con tutte le conseguenze."),
 (3,"chiaro",0.6,"Un esempio: la ditta che gestisce il software delle cartelle cliniche. Accede ai dati solo per la manutenzione, secondo le istruzioni e il contratto dell'azienda."),
 (3,"chiaro",0,"E i dipendenti? Sono persone autorizzate al trattamento: agiscono sotto l'autorita' del titolare e secondo le sue istruzioni. Un tempo si chiamavano incaricati."),
 (3,"chiaro",0,"Il Codice, all'articolo due quaterdecies, permette inoltre al titolare di attribuire compiti specifici a persone designate, per esempio i dirigenti delle strutture."),
 (3,"tenue",0.8,"Occhio a un distrattore: nel regolamento il responsabile non e' il dirigente interno. E' chi tratta i dati per conto del titolare, spesso un soggetto esterno."),
 (3,"profondo",1.2,"Chi decide, chi esegue, chi opera sotto istruzioni."),

 (4,"chiaro",0.5,"Il responsabile della protezione dei dati, in inglese Data Protection Officer, e' obbligatorio per le autorita' e gli organismi pubblici. Ogni azienda sanitaria pubblica deve averlo."),
 (4,"chiaro",0,"E' obbligatorio anche per chi tratta su larga scala categorie particolari di dati, o monitora le persone in modo regolare e sistematico. Puo' essere un dipendente o un professionista esterno."),
 (4,"chiaro",0,"E' scelto per le sue competenze in materia di protezione dei dati. Deve essere indipendente: non riceve istruzioni sui suoi compiti, riferisce al vertice e non puo' essere penalizzato per come li svolge."),
 (4,"chiaro",0,"I suoi compiti: informare e consigliare titolare e dipendenti, sorvegliare il rispetto delle regole, dare pareri sulla valutazione d'impatto, cooperare con il Garante ed essere il suo punto di contatto."),
 (4,"chiaro",0,"Non decide al posto del titolare e non firma le notifiche a nome proprio. Consiglia e controlla; le decisioni e le responsabilita' restano del titolare."),
 (4,"chiaro",0,"I suoi dati di contatto sono pubblicati e indicati nell'informativa. Chiunque, paziente o dipendente, puo' rivolgersi a lui per le questioni sui propri dati."),
 (4,"tenue",0.8,"Un distrattore frequente: il responsabile della protezione dei dati non e' chi risponde delle violazioni. Risponde il titolare; il DPO vigila e consiglia."),
 (4,"profondo",1.2,"Un consigliere indipendente, non un capro espiatorio."),

 (5,"chiaro",0.5,"Il primo adempimento e' il registro delle attivita' di trattamento: per ogni trattamento, finalita', categorie di dati e di persone, destinatari, tempi di cancellazione, misure di sicurezza."),
 (5,"chiaro",0,"Le organizzazioni con meno di duecentocinquanta dipendenti ne sono in parte esonerate, ma non se trattano categorie particolari di dati. Un'azienda sanitaria il registro lo tiene sempre."),
 (5,"chiaro",0,"Il secondo e' la valutazione d'impatto, in inglese DPIA. Si fa prima di un trattamento che presenta un rischio elevato per le persone, per esempio su larga scala di dati sanitari."),
 (5,"chiaro",0.6,"Un esempio: un nuovo servizio di telemedicina, o una piattaforma regionale di dati clinici. Si descrivono i rischi e le misure per ridurli, con il parere del DPO."),
 (5,"chiaro",0,"Sullo sfondo c'e' l'obbligo di sicurezza dell'articolo 32: cifratura, sistemi riservati e disponibili, capacita' di ripristinare i dati, verifiche periodiche."),
 (5,"chiaro",0,"Il terzo riguarda le violazioni dei dati: distruzione, perdita, modifica, divulgazione o accesso non autorizzato, anche solo accidentali."),
 (5,"chiaro",0,"Il titolare notifica la violazione al Garante senza ingiustificato ritardo e, ove possibile, entro settantadue ore da quando ne e' venuto a conoscenza. Non serve se e' improbabile un rischio per le persone."),
 (5,"chiaro",0,"Se la notifica arriva dopo le settantadue ore, va motivato il ritardo. E se il rischio per le persone e' elevato, bisogna avvisare anche loro, con un linguaggio semplice e chiaro."),
 (5,"chiaro",0,"Ogni violazione, anche quella non notificata, va documentata. Torniamo alla mail di venerdi': chi se ne accorge avvisa subito il proprio responsabile e il DPO, secondo la procedura aziendale."),
 (5,"tenue",0.8,"Attenzione: le settantadue ore non partono dal lunedi' mattina. Partono da quando il titolare viene a conoscenza della violazione, weekend compreso."),
 (5,"profondo",1.2,"Registrare, valutare prima, reagire in fretta."),

 (6,"chiaro",0.5,"Le sanzioni amministrative del regolamento hanno due livelli. Il primo arriva fino a dieci milioni di euro o, per le imprese, al due per cento del fatturato mondiale annuo, se superiore."),
 (6,"chiaro",0,"Riguarda la violazione degli obblighi di titolare e responsabile: sicurezza, registro, valutazione d'impatto, notifica delle violazioni, DPO."),
 (6,"chiaro",0,"Il secondo arriva fino a venti milioni di euro o al quattro per cento del fatturato. Riguarda i principi, le basi giuridiche, le condizioni del consenso, le categorie particolari, i diritti degli interessati."),
 (6,"chiaro",0,"Il regolamento lascia agli Stati la scelta di applicare le sanzioni anche agli enti pubblici. L'Italia non li ha esclusi: il Garante sanziona anche aziende sanitarie e ospedali."),
 (6,"chiaro",0,"Chi ha subito un danno, materiale o immateriale, ha diritto al risarcimento. E il Codice prevede anche reati, come il trattamento illecito di dati a fine di profitto o di danno, che provoca un nocumento."),
 (6,"chiaro",0,"Per chi lavora in azienda c'e' poi la responsabilita' disciplinare. Chi viola le istruzioni ricevute, per esempio consultando dati senza ragione, ne risponde personalmente."),
 (6,"tenue",0.8,"Attenzione: le sanzioni non sono tutte da venti milioni. Ci sono due livelli, dieci e venti milioni, a seconda della norma violata."),
 (6,"profondo",1.2,"Due livelli di sanzione, una responsabilita' per ciascuno."),

 (7,"chiaro",0.8,"Le tre cose che ti chiederanno. La prima: il titolare decide finalita' e mezzi; il responsabile tratta per suo conto, con un contratto; i dipendenti sono persone autorizzate, che seguono istruzioni."),
 (7,"chiaro",0.8,"La seconda: il DPO e' obbligatorio negli enti pubblici, indipendente, consiglia e sorveglia; il registro e la valutazione d'impatto sono adempimenti del titolare; le violazioni si notificano entro settantadue ore."),
 (7,"chiaro",0.8,"La terza: le sanzioni hanno due livelli, fino a dieci milioni o due per cento e fino a venti milioni o quattro per cento; si aggiungono risarcimento, reati e responsabilita' disciplinare."),
 (7,"tenue",0.8,"L'ultimo distrattore: la notifica della violazione non spetta al DPO. Spetta al titolare, che il DPO consiglia."),

 (8,"profondo",0,"[warm] In sintesi: ruoli chiari, adempimenti concreti, sanzioni a due livelli. Si chiude il modulo sulla protezione dei dati. Nel prossimo: il pubblico impiego."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: 'Titolare, responsabile, autorizzati', 4: 'Il responsabile della protezione dei dati', 5: "Registro, valutazione d'impatto, violazioni", 6: 'Le sanzioni', 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
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
