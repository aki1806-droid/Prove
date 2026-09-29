# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 9.3 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M9): campo di applicazione. D.Lgs. 81/2008 art. 3 c. 1 (tutti i settori, tutte le tipologie di rischio),
# c. 2 (forze armate, polizia, vigili del fuoco, protezione civile, universita', scuole: applicazione con le
# particolari esigenze, non esclusione), c. 4 (tutti i lavoratori, subordinati e autonomi, ed equiparati),
# c. 11 (autonomi art. 2222 c.c.: artt. 21 e 26), c. 12-bis (volontari: art. 21; obblighi informativi del datore);
# art. 2 lett. a (lavoratore: indipendentemente dalla tipologia contrattuale, con o senza retribuzione, anche al solo
# fine di apprendere; equiparati tirocinanti, allievi in laboratorio); lett. b (datore di lavoro nelle PA); art. 26
# (appalti: DUVRI, cooperazione e coordinamento, da verificare). Specializzandi: lavoratori in formazione presso
# l'azienda, tutela a carico della struttura (da verificare). Fonti: D.Lgs. 81/2008 ed. giugno 2016; dispensa.
BLOCCHI = [
 (1,"chiaro",0.8,"[serious] In una sala operatoria lavorano insieme un'infermiera dipendente, uno specializzando, una studentessa in tirocinio e il tecnico di una ditta esterna. Chi di loro e' tutelato dal decreto 81?"),
 (1,"chiaro",0,"La risposta e': tutti. Ma ciascuno in modo diverso, e con responsabilita' che ricadono su soggetti diversi. Capire il campo di applicazione serve proprio a questo."),
 (1,"profondo",1.2,"La tutela segue il lavoro, non il contratto."),

 (2,"chiaro",0.6,"Quattro passaggi. L'universalita' del decreto. La nozione di lavoratore. I casi di tirocinanti, specializzandi e volontari. E il lavoro delle ditte esterne dentro l'ospedale."),

 (3,"chiaro",0.5,"L'articolo 3 apre con una frase netta: il decreto si applica a tutti i settori di attivita', privati e pubblici, e a tutte le tipologie di rischio."),
 (3,"chiaro",0,"Non ci sono settori esclusi in partenza. Ospedali, uffici, laboratori, cucine, magazzini, servizi territoriali: ovunque c'e' lavoro organizzato, si applica il decreto."),
 (3,"chiaro",0,"Il decreto vuole anche una tutela uniforme su tutto il territorio nazionale, con gli stessi livelli essenziali di protezione in ogni regione."),
 (3,"chiaro",0,"Per alcuni ambiti, come forze armate, polizia, vigili del fuoco, protezione civile, universita' e scuole, le regole si applicano tenendo conto delle particolari esigenze del servizio."),
 (3,"chiaro",0,"Ma attenzione: non e' un'esclusione. E' un adattamento, che deve essere definito con appositi decreti. La tutela resta."),
 (3,"chiaro",0,"E il decreto copre tutti i rischi: non solo quelli fisici e chimici, ma anche quelli legati all'organizzazione, come lo stress lavoro correlato, e le differenze di genere, di eta' e di provenienza."),
 (3,"chiaro",0.6,"Un esempio: in un'azienda sanitaria il decreto vale per il pronto soccorso come per l'ufficio del personale. Cambiano i rischi da valutare, non l'obbligo di valutarli."),
 (3,"tenue",0.8,"Occhio a un distrattore: forze armate, polizia e vigili del fuoco non sono esclusi dal decreto. Il decreto si applica anche a loro, adattato alle esigenze del servizio."),
 (3,"profondo",1.2,"Tutti i settori, tutti i rischi, nessuna esclusione."),

 (4,"chiaro",0.5,"Il cuore della lezione e' la definizione di lavoratore, all'articolo 2. E' la persona che svolge un'attivita' lavorativa nell'organizzazione di un datore di lavoro, pubblico o privato."),
 (4,"chiaro",0,"Tre parole contano piu' di tutte. Primo: indipendentemente dalla tipologia contrattuale. Tempo indeterminato, determinato, somministrato, part time: non fa differenza."),
 (4,"chiaro",0,"Secondo: con o senza retribuzione. Anche chi non e' pagato, se lavora dentro l'organizzazione, e' tutelato. Terzo: anche al solo fine di apprendere un mestiere, un'arte o una professione."),
 (4,"chiaro",0,"E' una nozione sostanziale, non formale. Non si guarda l'etichetta del contratto, ma il fatto che una persona lavori dentro un'organizzazione altrui, esposta ai suoi rischi."),
 (4,"chiaro",0,"Il lavoratore somministrato, inviato da un'agenzia, e' tutelato anche dall'azienda dove lavora, che deve proteggerlo dai rischi del luogo di lavoro come i propri dipendenti."),
 (4,"chiaro",0,"Resta tutelato anche chi lavora a distanza o in modalita' agile: il datore di lavoro deve informarlo sui rischi e fornirgli attrezzature adeguate e sicure."),
 (4,"chiaro",0,"La legge equipara poi al lavoratore alcune figure: i soci lavoratori di cooperativa, i tirocinanti, gli allievi di scuole e universita' quando usano laboratori, attrezzature e agenti chimici, fisici o biologici."),
 (4,"chiaro",0,"Restano fuori soltanto gli addetti ai servizi domestici e familiari. Per i lavoratori autonomi valgono regole minime: attrezzature a norma, dispositivi di protezione, e il cartellino di riconoscimento negli appalti."),
 (4,"chiaro",0.6,"Un esempio: un'operatrice socio sanitaria assunta da una cooperativa lavora in reparto. E' lavoratrice ai fini del decreto, anche se il suo contratto non e' con l'azienda sanitaria."),
 (4,"tenue",0.8,"Attenzione: non e' vero che il decreto tutela solo i dipendenti a tempo indeterminato. Conta il lavoro svolto nell'organizzazione, non il tipo di contratto."),
 (4,"profondo",1.2,"Conta dove lavori, non come sei assunto."),

 (5,"chiaro",0.5,"In sanita' questa nozione estesa ha conseguenze concrete, perche' negli ospedali lavorano molte persone che non sono dipendenti."),
 (5,"chiaro",0,"I tirocinanti, come gli studenti dei corsi di laurea in infermieristica, sono equiparati ai lavoratori. Devono ricevere informazione, formazione, dispositivi di protezione e, se esposti, sorveglianza sanitaria."),
 (5,"chiaro",0,"Gli specializzandi svolgono attivita' assistenziale in reparto, sotto la guida dei tutor. Sono esposti agli stessi rischi del personale, e devono avere la stessa protezione."),
 (5,"chiaro",0,"Chi deve garantirla dipende dagli accordi tra universita' e azienda sanitaria. Ma per chi lavora in reparto le misure devono esserci, e devono essere uguali."),
 (5,"chiaro",0,"I volontari, per esempio quelli delle associazioni che operano in ospedale, hanno una tutela piu' leggera. Ma l'azienda deve informarli sui rischi specifici e sulle misure di emergenza."),
 (5,"chiaro",0,"E deve adottare le misure utili a eliminare o ridurre al minimo i rischi di interferenza tra l'attivita' dei volontari e quella del personale."),
 (5,"chiaro",0,"Per tutti la regola pratica e' la stessa: prima di entrare in reparto bisogna sapere quali rischi si incontrano, cosa fare in caso di emergenza e a chi rivolgersi."),
 (5,"chiaro",0.6,"Un esempio: una studentessa di infermieristica in tirocinio si punge con un ago. L'evento va gestito come per un dipendente: primo soccorso, profilassi, segnalazione, analisi dell'accaduto."),
 (5,"tenue",0.8,"Un distrattore frequente: il tirocinante non pagato non e' escluso dalla tutela. La legge lo equipara espressamente al lavoratore."),
 (5,"profondo",1.2,"Chi impara in reparto, va protetto come chi ci lavora."),

 (6,"chiaro",0.5,"Resta un caso tipico dell'ospedale: le ditte esterne. Pulizie, mensa, manutenzione, trasporti, lavanderia. Il loro personale lavora dentro gli spazi dell'azienda sanitaria."),
 (6,"chiaro",0,"Qui il decreto chiede cooperazione e coordinamento. Il committente verifica l'idoneita' dell'impresa, la informa sui rischi dei luoghi e coordina gli interventi di prevenzione."),
 (6,"chiaro",0,"Lo strumento e' il documento unico di valutazione dei rischi da interferenze. Individua i rischi che nascono dalla presenza contemporanea di piu' imprese e le misure per eliminarli o ridurli."),
 (6,"chiaro",0,"Il documento si allega al contratto d'appalto e si aggiorna quando cambiano i lavori. E i costi della sicurezza per le interferenze non possono essere ribassati in gara."),
 (6,"chiaro",0.6,"Un esempio: la ditta delle pulizie lava i pavimenti del corridoio mentre passano i letti dei pazienti. Il rischio di scivolare nasce dall'incontro delle due attivita', e va previsto prima."),
 (6,"chiaro",0,"E chi lavora per una ditta in appalto deve essere riconoscibile: porta una tessera con fotografia, generalita' e indicazione del proprio datore di lavoro."),
 (6,"tenue",0.8,"Attenzione: il personale delle ditte esterne non e' fuori dalla responsabilita' dell'azienda sanitaria. Per i rischi da interferenza, il committente deve cooperare e coordinare."),
 (6,"profondo",1.2,"Dove si incontrano due lavori, nasce un rischio nuovo."),

 (7,"chiaro",0.8,"Le tre cose che ti chiederanno. La prima: il decreto si applica a tutti i settori, pubblici e privati, e a tutte le tipologie di rischio; per alcuni ambiti si adatta, ma non esclude."),
 (7,"chiaro",0.8,"La seconda: lavoratore e' chi lavora nell'organizzazione altrui, con qualunque contratto, con o senza retribuzione, anche solo per imparare; tirocinanti e allievi sono equiparati."),
 (7,"chiaro",0.8,"La terza: per le ditte esterne servono cooperazione, coordinamento e il documento sui rischi da interferenze; per i volontari, informazione e riduzione delle interferenze."),
 (7,"tenue",0.8,"L'ultimo distrattore: gli unici esclusi dalla nozione di lavoratore sono gli addetti ai servizi domestici e familiari, non i precari o i tirocinanti."),

 (8,"profondo",0,"[warm] In sintesi: la tutela segue la persona che lavora, ovunque e comunque lavori. Nella prossima lezione: le figure della sicurezza, dal datore di lavoro al medico competente."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: 'Tutti i settori, tutti i rischi', 4: "Chi e' lavoratore", 5: 'Tirocinanti, specializzandi, volontari', 6: 'Appalti e interferenze', 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
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
