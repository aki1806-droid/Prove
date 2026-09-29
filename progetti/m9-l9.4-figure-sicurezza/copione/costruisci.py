# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 9.4 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M9): le figure della sicurezza. D.Lgs. 81/2008 art. 2 lett. b (datore di lavoro, anche nelle PA), d
# (dirigente), e (preposto), f (RSPP), h (medico competente), i (RLS); art. 16 (delega: atto scritto con data certa,
# requisiti, poteri, autonomia di spesa, accettazione scritta, pubblicita', vigilanza); art. 17 (non delegabili: DVR,
# designazione RSPP); art. 18-19 (dirigente, preposto: testo 2016; L. 215/2021 su preposto e art. 18 lett. b-bis da
# verificare); art. 20 (lavoratori); art. 25 (medico competente; cartella sanitaria e di rischio, 10 anni); art. 31
# c. 6 lett. g e c. 7 (ricovero e cura oltre 50 lavoratori: SPP e RSPP interni); art. 32; art. 33; art. 35 (riunione
# periodica oltre 15 lavoratori); artt. 47 e 50 (RLS: testo non disponibile, da verificare). Fonti: D.Lgs. 81/2008
# ed. giugno 2016 su Drive; dispensa su Drive (con correzioni).
BLOCCHI = [
 (1,"chiaro",0.8,"[serious] In un reparto un sollevatore per pazienti e' guasto da settimane. Il personale lo sa, il coordinatore lo sa, qualcuno ha anche scritto una mail. Ma chi, esattamente, doveva fare che cosa?"),
 (1,"chiaro",0,"Il decreto 81 risponde con una catena di figure, ciascuna con i suoi obblighi. Se la catena funziona, il problema si risolve in fretta. Se si spezza, qualcuno ne risponde."),
 (1,"profondo",1.2,"Ogni anello della catena ha il suo compito."),

 (2,"chiaro",0.6,"Quattro passaggi. Il datore di lavoro e i suoi obblighi non delegabili. Dirigenti e preposti. Il servizio di prevenzione e il medico competente. I lavoratori e i loro rappresentanti."),

 (3,"chiaro",0.5,"Il datore di lavoro e' chi ha la responsabilita' dell'organizzazione, con poteri decisionali e di spesa. Nelle pubbliche amministrazioni e' il dirigente con poteri di gestione, individuato dall'organo di vertice."),
 (3,"chiaro",0,"Se l'individuazione manca, o non rispetta i criteri, il datore di lavoro coincide con l'organo di vertice. In un'azienda sanitaria, di regola, il direttore generale."),
 (3,"chiaro",0,"E' la figura che risponde per prima: dalle sue scelte di organizzazione e di spesa dipende tutto il sistema di prevenzione dell'azienda."),
 (3,"chiaro",0,"Il datore di lavoro ha due obblighi che non puo' delegare a nessuno: la valutazione di tutti i rischi, con il documento che ne deriva, e la designazione del responsabile del servizio di prevenzione e protezione."),
 (3,"chiaro",0,"Per il resto, puo' delegare. Ma la delega di funzioni ha condizioni precise: atto scritto con data certa, un delegato con professionalita' ed esperienza adeguate, e tutti i poteri di organizzazione, gestione e controllo."),
 (3,"chiaro",0,"Il delegato deve avere anche l'autonomia di spesa necessaria, e deve accettare la delega per iscritto. Alla delega va data adeguata e tempestiva pubblicita'."),
 (3,"chiaro",0,"E la delega non libera del tutto il datore di lavoro: resta il suo obbligo di vigilare che il delegato svolga correttamente le funzioni trasferite."),
 (3,"tenue",0.8,"Occhio a un distrattore: la valutazione dei rischi non si puo' delegare. Il datore di lavoro puo' farsi aiutare, ma la responsabilita' del documento resta sua."),
 (3,"profondo",1.2,"Si possono delegare i compiti, non la responsabilita' di valutare."),

 (4,"chiaro",0.5,"Il dirigente attua le direttive del datore di lavoro: organizza l'attivita' lavorativa e vigila su di essa, con competenze professionali e poteri adeguati all'incarico."),
 (4,"chiaro",0,"In sanita' sono dirigenti, per la sicurezza, i direttori di struttura complessa e i responsabili dei servizi. Hanno obblighi propri: designare gli addetti alle emergenze, fornire i dispositivi, formare e informare."),
 (4,"chiaro",0,"Il preposto e' chi sovrintende all'attivita' lavorativa e garantisce l'attuazione delle direttive, controllando che siano eseguite correttamente, con un potere di iniziativa."),
 (4,"chiaro",0,"Deve vigilare che i lavoratori rispettino le regole e usino i dispositivi di protezione, far accedere alle zone a rischio grave solo chi e' stato istruito, e segnalare subito carenze e pericoli."),
 (4,"chiaro",0,"Dal 2021 i suoi compiti sono piu' incisivi: se vede un comportamento pericoloso deve intervenire per correggerlo e, se serve, interrompere l'attivita'. E il datore di lavoro deve individuarlo formalmente."),
 (4,"chiaro",0,"Dirigenti e preposti ricevono una formazione specifica, in aggiunta a quella dei lavoratori, e devono aggiornarla periodicamente."),
 (4,"chiaro",0.6,"Torniamo al sollevatore guasto. Il coordinatore, come preposto, deve segnalarlo subito al dirigente. Il dirigente deve provvedere, e intanto va organizzata un'alternativa sicura."),
 (4,"tenue",0.8,"Attenzione: preposto non e' un titolo, e' una funzione. Chi di fatto sovrintende al lavoro di altri e' preposto, anche senza una nomina scritta."),
 (4,"profondo",1.2,"Chi dirige organizza, chi sovrintende vigila."),

 (5,"chiaro",0.5,"Il servizio di prevenzione e protezione e' l'insieme di persone e mezzi che supporta il datore di lavoro. E' guidato da un responsabile, designato dal datore di lavoro, a cui risponde."),
 (5,"chiaro",0,"Il servizio individua i fattori di rischio, contribuisce alla valutazione, elabora misure e procedure di sicurezza, propone i programmi di formazione e partecipa alla riunione periodica."),
 (5,"chiaro",0,"Per farne parte serve almeno un diploma di scuola superiore e corsi specifici con verifica dell'apprendimento. Per il responsabile e' richiesta una formazione ulteriore."),
 (5,"chiaro",0,"Nelle strutture di ricovero e cura con oltre cinquanta lavoratori il servizio deve essere interno, e anche il responsabile deve essere interno all'azienda."),
 (5,"chiaro",0,"Il medico competente e' nominato dal datore di lavoro. Collabora alla valutazione dei rischi, programma ed effettua la sorveglianza sanitaria, e visita gli ambienti di lavoro."),
 (5,"chiaro",0,"Esprime il giudizio di idoneita' alla mansione: idoneo, idoneo con prescrizioni o limitazioni, non idoneo in modo temporaneo o permanente."),
 (5,"chiaro",0,"Per ogni lavoratore sottoposto a sorveglianza tiene una cartella sanitaria e di rischio, coperta dal segreto professionale, che va conservata per almeno dieci anni."),
 (5,"tenue",0.8,"Un distrattore frequente: il responsabile del servizio di prevenzione non e' il datore di lavoro. E' un consulente tecnico che lo supporta, e non ne prende il posto."),
 (5,"profondo",1.2,"Il servizio consiglia, il medico sorveglia, il datore decide."),

 (6,"chiaro",0.5,"Anche i lavoratori hanno obblighi precisi. Ognuno deve prendersi cura della propria salute e sicurezza e di quella delle altre persone presenti, secondo la formazione ricevuta."),
 (6,"chiaro",0,"Devono osservare le istruzioni, usare correttamente attrezzature e dispositivi, segnalare subito carenze e pericoli, partecipare alla formazione e sottoporsi ai controlli sanitari."),
 (6,"chiaro",0,"E non devono rimuovere o modificare i dispositivi di sicurezza, ne' compiere di propria iniziativa operazioni che non sono di loro competenza."),
 (6,"chiaro",0,"Il rappresentante dei lavoratori per la sicurezza e' eletto o designato dai lavoratori. Accede ai luoghi di lavoro, e' consultato sulla valutazione dei rischi e riceve copia del documento."),
 (6,"chiaro",0,"Il numero dei rappresentanti cresce con le dimensioni dell'azienda. In una grande azienda sanitaria ce ne sono diversi, per coprire sedi e servizi."),
 (6,"chiaro",0,"Puo' fare proposte, segnalare i rischi e, se le misure non sono adeguate, rivolgersi agli organi di vigilanza. Non puo' subire pregiudizi per la sua attivita'."),
 (6,"chiaro",0,"Nelle aziende con piu' di quindici lavoratori, almeno una volta all'anno si tiene la riunione periodica: datore di lavoro, responsabile del servizio, medico competente e rappresentante dei lavoratori."),
 (6,"chiaro",0.6,"In quella riunione si esaminano il documento di valutazione, l'andamento di infortuni e malattie professionali, i dispositivi di protezione e i programmi di formazione. E si redige un verbale."),
 (6,"tenue",0.8,"Attenzione: il rappresentante dei lavoratori per la sicurezza non e' nominato dal datore di lavoro. E' eletto o designato dai lavoratori, di norma nell'ambito delle rappresentanze sindacali."),
 (6,"profondo",1.2,"La sicurezza e' un lavoro di squadra, con ruoli chiari."),

 (7,"chiaro",0.8,"Le tre cose che ti chiederanno. La prima: il datore di lavoro non puo' delegare la valutazione dei rischi e la designazione del responsabile del servizio di prevenzione."),
 (7,"chiaro",0.8,"La seconda: il dirigente organizza e vigila, il preposto sovrintende e controlla; il lavoratore deve curare la propria sicurezza e quella degli altri."),
 (7,"chiaro",0.8,"La terza: il servizio di prevenzione supporta il datore di lavoro, il medico competente fa la sorveglianza sanitaria, il rappresentante dei lavoratori e' eletto o designato dai lavoratori."),
 (7,"tenue",0.8,"L'ultimo distrattore: la riunione periodica non e' facoltativa. Oltre i quindici lavoratori va convocata almeno una volta all'anno."),

 (8,"profondo",0,"[warm] In sintesi: un datore che valuta, dirigenti che organizzano, preposti che vigilano, lavoratori che partecipano. Nella prossima lezione: il documento di valutazione, la formazione e i dispositivi di protezione."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: 'Il datore di lavoro', 4: 'Dirigenti e preposti', 5: 'Servizio di prevenzione e medico competente', 6: 'Lavoratori e rappresentanti', 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
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
