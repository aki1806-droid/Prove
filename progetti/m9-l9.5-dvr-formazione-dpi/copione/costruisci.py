# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 9.5 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M9): DVR, formazione, DPI. D.Lgs. 81/2008 art. 17 c. 1 lett. a; art. 28 (c. 1 tutti i rischi: stress
# lavoro-correlato, gravidanza, genere, eta', provenienza, tipologia contrattuale; c. 2 contenuti e data certa;
# c. 3-bis nuova impresa 90 giorni); art. 29 (c. 1 con RSPP e medico competente; c. 2 consultazione RLS; c. 3
# rielaborazione entro 30 giorni; c. 4 custodia); art. 36 (informazione); art. 37 cc. 1-6 (formazione; occasioni;
# addestramento da persona esperta sul luogo di lavoro; ripetizione periodica); Accordo Stato-Regioni 21/12/2011
# (4 ore generale + 12 ore specifica per rischio alto, aggiornamento 6 ore ogni 5 anni) e Accordo 17/4/2025 (da
# verificare); artt. 74-78 DPI (testo non disponibile: da verificare); Reg. UE 2016/425 (categorie). Fonti: D.Lgs.
# 81/2008 ed. giugno 2016 su Drive; dispensa su Drive (con correzioni).
BLOCCHI = [
 (1,"chiaro",0.8,"[serious] Un'infermiera neoassunta entra in reparto il primo giorno. Qualcuno le consegna una divisa, un paio di guanti e le dice: il resto lo impari strada facendo. E' sufficiente?"),
 (1,"chiaro",0,"No. Prima di lavorare deve sapere quali rischi corre, come proteggersi e cosa fare in caso di emergenza. E tutto questo parte da un documento: la valutazione dei rischi."),
 (1,"profondo",1.2,"Prima si conosce il rischio, poi si lavora."),

 (2,"chiaro",0.6,"Quattro passaggi. Il documento di valutazione dei rischi. Quando va aggiornato. Informazione, formazione e addestramento. E i dispositivi di protezione individuale."),

 (3,"chiaro",0.5,"La valutazione riguarda tutti i rischi per la sicurezza e la salute dei lavoratori, anche nella scelta delle attrezzature, delle sostanze e nella sistemazione dei luoghi di lavoro."),
 (3,"chiaro",0,"Compresi i rischi di gruppi particolari: lo stress lavoro correlato, le lavoratrici in gravidanza, le differenze di genere, di eta' e di provenienza, e la tipologia del contratto."),
 (3,"chiaro",0,"Il datore di lavoro la effettua insieme al responsabile del servizio di prevenzione e al medico competente, dopo aver consultato il rappresentante dei lavoratori per la sicurezza."),
 (3,"chiaro",0,"Il risultato e' il documento di valutazione dei rischi. Deve avere data certa, anche attraverso la firma del datore di lavoro e delle altre figure che hanno partecipato."),
 (3,"chiaro",0,"Contiene la relazione sui rischi con i criteri usati, le misure di prevenzione e i dispositivi adottati, il programma di miglioramento, le procedure e i ruoli di chi deve attuarle."),
 (3,"chiaro",0,"E indica i nomi del responsabile del servizio, del rappresentante dei lavoratori e del medico competente, e le mansioni che espongono a rischi specifici."),
 (3,"chiaro",0,"Il rappresentante dei lavoratori per la sicurezza, su richiesta, riceve copia del documento, anche su supporto informatico, e puo' consultarlo in azienda."),
 (3,"chiaro",0,"Deve essere semplice, breve e comprensibile: non un faldone da archivio, ma uno strumento operativo per pianificare la prevenzione. E va custodito presso l'unita' produttiva."),
 (3,"tenue",0.8,"Occhio a un distrattore: il documento non e' firmato solo per bellezza. Le firme servono anche a dare data certa, e la valutazione non si puo' delegare."),
 (3,"profondo",1.2,"Un documento vivo, non un faldone in archivio."),

 (4,"chiaro",0.5,"La valutazione non si fa una volta per sempre. Va rielaborata subito quando cambiano in modo significativo il processo di lavoro o l'organizzazione."),
 (4,"chiaro",0,"E ancora: quando evolvono la tecnica, la prevenzione o la protezione, dopo infortuni significativi, o quando i risultati della sorveglianza sanitaria lo rendono necessario."),
 (4,"chiaro",0,"In questi casi il documento va rielaborato entro trenta giorni. Ma le misure di prevenzione si aggiornano subito, e il rappresentante dei lavoratori va informato immediatamente."),
 (4,"chiaro",0.6,"Un esempio: un reparto viene trasformato in area per pazienti infettivi. Cambiano i rischi biologici, i percorsi, i dispositivi. La valutazione va rifatta, non basta una circolare."),
 (4,"chiaro",0,"Per le nuove attivita' la valutazione va fatta subito, e il documento completato entro novanta giorni dall'inizio."),
 (4,"chiaro",0,"Per le aziende piccole esistono procedure standardizzate. Ma non valgono per le strutture sanitarie piu' grandi, ne' dove ci sono rischi chimici o biologici."),
 (4,"tenue",0.8,"Attenzione: non esiste una scadenza fissa ogni tre anni per il documento. Si aggiorna quando cambia qualcosa di significativo, e in quel caso entro trenta giorni."),
 (4,"profondo",1.2,"Cambia il lavoro, cambia la valutazione."),

 (5,"chiaro",0.5,"Ora le persone. Ogni lavoratore deve ricevere un'informazione adeguata: sui rischi generali dell'azienda, sulle procedure di primo soccorso, antincendio ed evacuazione."),
 (5,"chiaro",0,"E sui nomi degli addetti alle emergenze, del responsabile del servizio di prevenzione e del medico competente. Poi sui rischi specifici della sua attivita' e sulle sostanze pericolose che usa."),
 (5,"chiaro",0,"L'informazione deve essere comprensibile. Per i lavoratori stranieri va verificato che capiscano la lingua usata."),
 (5,"chiaro",0,"Poi c'e' la formazione, sufficiente e adeguata. Una parte generale, sui concetti di rischio, danno, prevenzione, diritti e doveri, organi di vigilanza."),
 (5,"chiaro",0,"E una parte specifica, sui rischi della mansione e del settore. La durata e i contenuti sono fissati dagli accordi tra Stato e Regioni."),
 (5,"chiaro",0,"Con l'accordo del 2011 la sanita' e' a rischio alto: quattro ore di formazione generale e dodici di specifica, con aggiornamento di sei ore ogni cinque anni. Un nuovo accordo del 2025 ha riordinato la materia."),
 (5,"chiaro",0,"La formazione va fatta all'assunzione, al cambio di mansione, all'arrivo di nuove attrezzature, tecnologie o sostanze, e va ripetuta periodicamente."),
 (5,"chiaro",0,"L'addestramento, infine, si fa sul luogo di lavoro e da una persona esperta: per esempio l'uso del sollevatore, o la vestizione con i dispositivi per l'isolamento."),
 (5,"chiaro",0,"Anche dirigenti e preposti hanno percorsi di formazione propri, e il rappresentante dei lavoratori ha una formazione iniziale e aggiornamenti periodici."),
 (5,"tenue",0.8,"Un distrattore frequente: la formazione non si fa fuori dall'orario di lavoro a spese del lavoratore. Si svolge in orario di lavoro e non comporta costi per lui."),
 (5,"profondo",1.2,"Informare, formare, addestrare: tre passi diversi."),

 (6,"chiaro",0.5,"L'ultima barriera sono i dispositivi di protezione individuale: attrezzature indossate o tenute dal lavoratore per proteggerlo da uno o piu' rischi."),
 (6,"chiaro",0,"Si usano quando i rischi non si possono evitare o ridurre abbastanza con misure tecniche, protezione collettiva o organizzazione del lavoro."),
 (6,"chiaro",0,"Devono essere conformi alle norme europee, adeguati ai rischi e alle condizioni di lavoro, adatti alla persona che li usa, e compatibili tra loro se ne servono piu' di uno."),
 (6,"chiaro",0,"Il datore di lavoro li sceglie dopo aver analizzato i rischi, li fornisce gratuitamente, ne cura la manutenzione e la sostituzione, e informa e forma sul loro uso."),
 (6,"chiaro",0,"Sono divisi in tre categorie. La terza protegge da rischi gravissimi, come la morte o danni irreversibili: per esempio i facciali filtranti contro gli agenti biologici. Per questi l'addestramento e' obbligatorio."),
 (6,"chiaro",0,"Il lavoratore deve usarli correttamente, averne cura, non modificarli e segnalare subito difetti o problemi al datore di lavoro, al dirigente o al preposto."),
 (6,"chiaro",0,"Di regola i dispositivi sono personali. Se lo stesso dispositivo deve essere usato da piu' persone, vanno prese misure per evitare problemi di igiene e di salute."),
 (6,"chiaro",0.6,"Un esempio: in reparto arriva un paziente con tubercolosi. Serve un facciale filtrante adatto, scelto dopo la valutazione, provato per la tenuta sul viso e indossato come da addestramento."),
 (6,"tenue",0.8,"Attenzione: una mascherina chirurgica non e' sempre un dispositivo di protezione individuale. Protegge soprattutto il paziente; per proteggere chi assiste servono i facciali filtranti."),
 (6,"profondo",1.2,"Il dispositivo giusto, scelto bene, usato bene."),

 (7,"chiaro",0.8,"Le tre cose che ti chiederanno. La prima: il documento di valutazione riguarda tutti i rischi, ha data certa, e si rielabora entro trenta giorni quando cambia qualcosa di significativo."),
 (7,"chiaro",0.8,"La seconda: informazione, formazione e addestramento sono cose diverse; la formazione si fa all'assunzione, al cambio di mansione e con le novita', in orario di lavoro."),
 (7,"chiaro",0.8,"La terza: i dispositivi di protezione individuale sono l'ultima barriera; li sceglie e li fornisce gratis il datore di lavoro, il lavoratore li usa e ne ha cura."),
 (7,"tenue",0.8,"L'ultimo distrattore: il documento di valutazione non si scrive una volta per tutte al momento dell'apertura della struttura. Va tenuto aggiornato."),

 (8,"profondo",0,"[warm] In sintesi: valutare, scrivere, aggiornare, formare, proteggere. Nell'ultima lezione del modulo: i rischi specifici della sanita', le emergenze, la sorveglianza sanitaria e le sanzioni."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: 'Il documento di valutazione', 4: 'Quando si aggiorna', 5: 'Informazione, formazione, addestramento', 6: 'I dispositivi di protezione', 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
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
