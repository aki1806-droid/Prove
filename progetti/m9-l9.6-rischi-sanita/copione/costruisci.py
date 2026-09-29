# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 9.6 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M9): rischi specifici in sanita', emergenze, sorveglianza sanitaria, sanzioni. D.Lgs. 81/2008 Titolo X
# (agenti biologici: art. 268 quattro gruppi, art. 271 valutazione, art. 279 vaccinazioni), Titolo X-bis (taglienti,
# D.Lgs. 19/2014, artt. 286-bis/septies: eliminazione del reincappucciamento, dispositivi con meccanismi di
# protezione, segnalazione), Titolo IX (agenti chimici, cancerogeni), Titolo VI (movimentazione manuale dei carichi,
# artt. 167-169), D.Lgs. 101/2020 (radiazioni ionizzanti: esperto di radioprotezione, medico autorizzato), art. 28
# (stress lavoro-correlato), L. 113/2020 e raccomandazione ministeriale n. 8 (aggressioni), artt. 43-46 (emergenze),
# art. 41 (sorveglianza sanitaria; ricorso entro 30 giorni all'organo di vigilanza), artt. 55-59 (sanzioni),
# D.Lgs. 758/1994 (prescrizione). Testi di questi articoli non disponibili in fonte: da verificare. Fonti: D.Lgs.
# 81/2008 ed. giugno 2016 (indice); dispensa su Drive (con correzioni).
BLOCCHI = [
 (1,"chiaro",0.8,"[serious] In un solo turno di notte un infermiere puo' maneggiare aghi, farmaci pericolosi, sollevare pazienti, entrare in radiologia e gestire un familiare aggressivo. Pochi lavori concentrano tanti rischi."),
 (1,"chiaro",0,"Per questo la sanita' e' classificata a rischio alto, e il decreto 81 dedica titoli interi ai rischi che in ospedale si incontrano ogni giorno."),
 (1,"profondo",1.2,"In ospedale i rischi non si sommano: si intrecciano."),

 (2,"chiaro",0.6,"Quattro passaggi. Il rischio biologico e le punture d'ago. Chimico, movimentazione e radiazioni. Stress, aggressioni ed emergenze. Infine sorveglianza sanitaria e sanzioni."),

 (3,"chiaro",0.5,"Il rischio piu' tipico della sanita' e' quello biologico: virus, batteri e altri microrganismi che possono causare infezioni. Lo regola il titolo decimo del decreto."),
 (3,"chiaro",0,"Gli agenti biologici sono divisi in quattro gruppi, secondo la gravita' della malattia, la capacita' di diffondersi e la disponibilita' di cure o profilassi."),
 (3,"chiaro",0,"Il primo gruppo difficilmente causa malattie. Il quarto comprende agenti che causano malattie gravi, si diffondono facilmente e di solito non hanno cure efficaci."),
 (3,"chiaro",0,"Il datore di lavoro valuta il rischio biologico, adotta misure tecniche e organizzative, fornisce i dispositivi e mette a disposizione i vaccini efficaci, su indicazione del medico competente."),
 (3,"chiaro",0,"Un capitolo a parte riguarda le ferite da taglienti: aghi, bisturi, lame. Dal 2014 il decreto ha un titolo dedicato, che recepisce una direttiva europea."),
 (3,"chiaro",0,"Le regole sono precise: eliminare la pratica del reincappucciamento, usare dispositivi medici con meccanismi di protezione, contenitori rigidi vicino al punto di utilizzo."),
 (3,"chiaro",0,"E se l'incidente avviene, il lavoratore deve segnalarlo subito, per ricevere assistenza, profilassi e controlli. L'azienda analizza l'evento per evitare che si ripeta."),
 (3,"chiaro",0.6,"Un esempio: un'infermiera si punge con un ago usato su un paziente con epatite. Segnala subito, riceve la profilassi indicata e segue i controlli nei mesi successivi."),
 (3,"tenue",0.8,"Occhio a un distrattore: reincappucciare l'ago con due mani non e' una buona pratica. E' proprio il gesto che la norma chiede di eliminare."),
 (3,"profondo",1.2,"L'ago non si rincappuccia: si getta subito."),

 (4,"chiaro",0.5,"Poi il rischio chimico. In sanita' si usano disinfettanti, gas anestetici, farmaci antiblastici, e la formaldeide nei laboratori di anatomia patologica."),
 (4,"chiaro",0,"Alcune di queste sostanze sono cancerogene. Per loro valgono regole piu' severe: sostituirle quando possibile, sistemi chiusi, cappe aspiranti, registro degli esposti."),
 (4,"chiaro",0,"Ogni sostanza pericolosa ha una scheda di sicurezza, che indica i pericoli, le precauzioni e cosa fare in caso di contatto o di sversamento. Va tenuta a disposizione."),
 (4,"chiaro",0,"C'e' poi la movimentazione manuale dei carichi, regolata dal titolo sesto. In sanita' il carico piu' frequente e' il paziente, e i disturbi alla schiena sono tra le malattie piu' diffuse."),
 (4,"chiaro",0,"Il datore di lavoro deve evitare la movimentazione manuale con ausili e organizzazione: sollevatori, teli ad alto scorrimento, personale sufficiente. Esistono metodi specifici per valutare il rischio."),
 (4,"chiaro",0,"Per le radiazioni ionizzanti, in radiologia, medicina nucleare e sala operatoria, vale un decreto specifico del 2020, che ha sostituito le vecchie norme del 1995."),
 (4,"chiaro",0,"L'esperto di radioprotezione cura la sorveglianza fisica e i dosimetri; il medico autorizzato segue la salute dei lavoratori piu' esposti."),
 (4,"tenue",0.8,"Attenzione: la fascia lombare non sostituisce gli ausili. La prima misura contro il mal di schiena e' evitare di sollevare a mano, con attrezzature e organizzazione."),
 (4,"profondo",1.2,"Prima gli ausili, poi la forza delle braccia."),

 (5,"chiaro",0.5,"Tra i rischi da valutare c'e' anche lo stress lavoro correlato: turni, carichi di lavoro, conflitti, poca autonomia. La valutazione parte da indicatori oggettivi, come assenze e infortuni."),
 (5,"chiaro",0,"Se emergono problemi, si passa a una valutazione approfondita, ascoltando i lavoratori, e si adottano misure organizzative: non basta un corso sulla gestione dello stress."),
 (5,"chiaro",0,"Un rischio cresciuto molto negli ultimi anni sono le aggressioni al personale, soprattutto in pronto soccorso, psichiatria e servizi a contatto con il pubblico."),
 (5,"chiaro",0,"Una legge del 2020 ha inasprito le pene per chi aggredisce il personale sanitario, ha istituito un osservatorio nazionale e una giornata di sensibilizzazione, il 12 marzo."),
 (5,"chiaro",0,"Il ministero ha anche una raccomandazione specifica per prevenire gli atti di violenza: valutazione dei rischi, organizzazione degli spazi, formazione, segnalazione di ogni episodio."),
 (5,"chiaro",0,"Poi le emergenze. Il datore di lavoro organizza il primo soccorso, la lotta antincendio e l'evacuazione, e designa i lavoratori addetti, che ricevono una formazione specifica."),
 (5,"chiaro",0,"Chi viene designato non puo' rifiutare, se non per un giustificato motivo. E tutti devono conoscere il piano di emergenza e le vie di fuga del proprio reparto."),
 (5,"chiaro",0.6,"Un esempio: in ospedale molti pazienti non possono camminare. Per questo si privilegia l'evacuazione orizzontale progressiva, verso un compartimento vicino e protetto."),
 (5,"tenue",0.8,"Un distrattore frequente: l'aggressione al personale non e' un rischio del mestiere da accettare. Va prevenuta, valutata come ogni altro rischio e sempre segnalata."),
 (5,"profondo",1.2,"Anche la violenza e' un rischio da prevenire."),

 (6,"chiaro",0.5,"La sorveglianza sanitaria, all'articolo 41, la svolge il medico competente per i lavoratori esposti a rischi che la richiedono."),
 (6,"chiaro",0,"Comprende la visita preventiva, prima dell'adibizione alla mansione, e quella periodica, di norma una volta all'anno, salvo diversa periodicita' decisa dal medico o dalla legge."),
 (6,"chiaro",0,"Ci sono poi la visita su richiesta del lavoratore, quella al cambio di mansione, alla cessazione del rapporto nei casi previsti, e al rientro dopo un'assenza per malattia di oltre sessanta giorni."),
 (6,"chiaro",0,"Contro il giudizio di idoneita' si puo' fare ricorso all'organo di vigilanza territorialmente competente, entro trenta giorni dalla comunicazione."),
 (6,"chiaro",0,"Le visite non possono servire ad accertare lo stato di gravidanza, ne' negli altri casi vietati dalla legge. E il giudizio va comunicato per iscritto al lavoratore e al datore di lavoro."),
 (6,"chiaro",0,"Infine le sanzioni. Il decreto prevede soprattutto contravvenzioni, punite con l'arresto o con l'ammenda, per datori di lavoro, dirigenti, preposti, medici competenti e anche lavoratori."),
 (6,"chiaro",0,"Per esempio, il datore di lavoro che non valuta i rischi o non nomina il responsabile del servizio di prevenzione rischia l'arresto da tre a sei mesi o l'ammenda."),
 (6,"chiaro",0,"Molte violazioni si possono sanare: l'organo di vigilanza impartisce una prescrizione con un termine. Se si adempie e si paga una somma ridotta, il reato si estingue."),
 (6,"tenue",0.8,"Attenzione: anche il lavoratore puo' essere sanzionato, per esempio se non usa i dispositivi di protezione o rimuove le protezioni. La sicurezza e' un dovere di tutti."),
 (6,"profondo",1.2,"Visite per proteggere, sanzioni per correggere."),

 (7,"chiaro",0.8,"Le tre cose che ti chiederanno. La prima: gli agenti biologici sono in quattro gruppi; per i taglienti si elimina il reincappucciamento e si usano dispositivi con protezione."),
 (7,"chiaro",0.8,"La seconda: contro il rischio da movimentazione vengono prima gli ausili e l'organizzazione; stress e aggressioni sono rischi da valutare e prevenire."),
 (7,"chiaro",0.8,"La terza: la sorveglianza sanitaria comprende visite preventive, periodiche e su richiesta; contro il giudizio si ricorre entro trenta giorni all'organo di vigilanza."),
 (7,"tenue",0.8,"L'ultimo distrattore: il ricorso contro il giudizio del medico competente non si presenta al datore di lavoro. Si presenta all'organo di vigilanza."),

 (8,"profondo",0,"[warm] In sintesi: conoscere i rischi, prevenirli, sorvegliare la salute. Si chiude il modulo sulla sicurezza. Nel prossimo: gli appalti pubblici e il codice dei contratti."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: 'Il rischio biologico', 4: 'Chimico, carichi, radiazioni', 5: 'Stress, aggressioni, emergenze', 6: 'Sorveglianza sanitaria e sanzioni', 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
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
