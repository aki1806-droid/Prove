# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 1.5 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (STRUTTURA, M1): genesi con il 229/1999; le tre aree (prevenzione,
# distrettuale, ospedaliera); appropriatezza; l'equilibrio diritti/sostenibilita'.
# Elenchi: DPCM 29 novembre 2001, poi DPCM 12 gennaio 2017 (vigente).
# «LEA» nel parlato si legge come parola (STANDARD §4).
# «Titolo V» si scrive «Titolo quinto»: la voce lo leggeva «Titolo cinque».
BLOCCHI = [
 (1,"chiaro",0,"[serious] Il Servizio Sanitario Nazionale e' universale. Ma universale non vuol dire illimitato: nessun sistema al mondo puo' pagare tutto a tutti. Allora che cosa, esattamente, ti e' garantito?"),
 (1,"chiaro",0,"La risposta e' un elenco con un nome preciso: i livelli essenziali di assistenza, i LEA. Sono le prestazioni che il servizio pubblico deve assicurare a ogni cittadino, in ogni Regione."),
 (1,"profondo",1.2,"E' il punto in cui il diritto alla salute smette di essere un principio e diventa una lista. Una lista che vincola lo Stato, le Regioni e le aziende."),

 (2,"chiaro",0,"Tre passaggi. Da dove nascono i LEA. Come sono organizzati, nelle tre grandi aree. E il criterio che decide che cosa entra e che cosa resta fuori: l'appropriatezza."),

 (3,"chiaro",0,"Il decreto 502 del 1992 parla gia' di livelli uniformi di assistenza, da garantire con le risorse del fondo sanitario. Ma resta un'espressione generica, senza un contenuto preciso."),
 (3,"chiaro",0,"Senza un elenco, il diritto alla salute restava vago, e ogni Regione lo interpretava a modo suo. Serviva un pavimento comune, uguale in tutto il Paese."),
 (3,"chiaro",0,"E' il decreto 229 del 1999 a riscrivere l'articolo 1 del 502 e a introdurre i livelli essenziali e uniformi di assistenza, definiti dal Piano Sanitario Nazionale."),
 (3,"chiaro",0,"Il 229 fissa anche i principi che li devono ispirare: la dignita' della persona, il bisogno di salute, l'equita' nell'accesso, la qualita' delle cure, l'appropriatezza e l'economicita'."),
 (3,"chiaro",0,"Il primo elenco concreto arriva con un decreto del Presidente del Consiglio dei ministri del 29 novembre 2001. Resta in vigore per oltre quindici anni."),
 (3,"chiaro",0,"Poi, con il decreto del Presidente del Consiglio dei ministri del 12 gennaio 2017, arrivano i nuovi LEA: un aggiornamento profondo, con nuove prestazioni e nuovi vaccini."),
 (3,"chiaro",0,"Nel frattempo cambia anche la Costituzione. Con la riforma del Titolo quinto del 2001, la determinazione dei livelli essenziali delle prestazioni diventa competenza esclusiva dello Stato."),
 (3,"profondo",1.2,"Ecco il patto: lo Stato fissa che cosa va garantito a tutti, le Regioni decidono come garantirlo. E possono aggiungere, con risorse proprie, ma mai togliere."),

 (4,"chiaro",0,"Come sono organizzati? In tre grandi aree, dette macroaree. La prima e' la prevenzione collettiva e sanita' pubblica."),
 (4,"chiaro",0,"Comprende cio' che protegge la salute della popolazione prima che ci si ammali: vaccinazioni, screening, sicurezza alimentare, sanita' veterinaria, salute nei luoghi di lavoro e negli ambienti di vita."),
 (4,"chiaro",0,"Le vaccinazioni del calendario nazionale, per esempio, sono LEA: una Regione non puo' decidere di non offrirle."),
 (4,"chiaro",0,"La seconda area e' l'assistenza distrettuale: i servizi sul territorio. Il medico di medicina generale e il pediatra di libera scelta, la farmaceutica, la specialistica ambulatoriale, l'assistenza domiciliare."),
 (4,"chiaro",0,"Il distretto e' il luogo naturale di questa assistenza. Nel Veneto lo ritroverai nel modulo due, come distretto potenziato."),
 (4,"chiaro",0,"Ne fanno parte anche l'assistenza sociosanitaria alle persone non autosufficienti, con disabilita', con disturbi mentali o con dipendenze, nelle strutture residenziali e semiresidenziali."),
 (4,"chiaro",0,"La terza area e' l'assistenza ospedaliera: il pronto soccorso, i ricoveri ordinari, il day hospital e il day surgery, la riabilitazione e la lungodegenza, i trapianti, i servizi trasfusionali."),
 (4,"chiaro",0,"E' qui che rientrano i ricoveri della lezione tre: quelli che la Regione paga agli ospedali con i di erre gi sono prestazioni dei LEA ospedalieri."),
 (4,"tenue",0,"Attenzione ai nomi: nell'elenco del 2001 la prima area si chiamava assistenza sanitaria collettiva in ambiente di vita e di lavoro. Il contenuto e' simile, ma i quiz a volte usano il nome vecchio."),
 (4,"chiaro",0,"Accanto alle tre aree ci sono tutele per particolari categorie: le persone con malattie rare, o con malattie croniche e invalidanti, hanno diritto all'esenzione dal ticket per le prestazioni collegate."),
 (4,"chiaro",1.2,"Tre aree da ricordare in quest'ordine: prevenzione collettiva e sanita' pubblica, assistenza distrettuale, assistenza ospedaliera. Dalla popolazione, al territorio, all'ospedale."),

 (5,"chiaro",0,"Che cosa resta fuori? Il decreto indica le prestazioni escluse. Anzitutto quelle che non rispondono a necessita' assistenziali tutelate, come la chirurgia estetica non legata a una malattia."),
 (5,"chiaro",0,"Poi quelle che non soddisfano l'efficacia e l'appropriatezza: prestazioni di cui non e' dimostrata l'efficacia, o usate in pazienti che non ne trarrebbero beneficio."),
 (5,"chiaro",0,"E infine quelle che non rispettano l'economicita': quando esiste un'alternativa ugualmente efficace, a parita' di risultato si garantisce quella che costa meno."),
 (5,"chiaro",0,"E' qui che la medicina basata sulle prove entra nella legge: una prestazione entra nei LEA perche' funziona, non perche' e' richiesta."),
 (5,"chiaro",0,"L'appropriatezza ha due facce. Quella clinica: la prestazione giusta, al paziente giusto, nel momento giusto. E quella organizzativa: nel posto giusto, con il livello di assistenza giusto."),
 (5,"chiaro",0,"Un esempio di appropriatezza organizzativa. L'intervento di cataratta non richiede un ricovero ordinario: si fa in regime ambulatoriale. Ricoverare quel paziente sarebbe inappropriato, anche se l'intervento e' giusto."),
 (5,"chiaro",0,"Per questo i LEA elencano ricoveri e prestazioni ad alto rischio di inappropriatezza: sono ammessi solo a certe condizioni, o vanno spostati su un livello di assistenza meno intensivo."),
 (5,"tenue",0,"Attenzione a un errore diffuso: appropriatezza non vuol dire risparmio. Vuol dire dare cio' che serve. A volte la prestazione appropriata costa piu' di quella che si dava prima."),

 (6,"chiaro",0,"I LEA tengono insieme due esigenze opposte. Da una parte il diritto: cio' che e' nei livelli essenziali deve essere garantito in ogni Regione, e nessuna Regione puo' negarlo."),
 (6,"chiaro",0,"Dall'altra la sostenibilita': i LEA si finanziano con il fondo sanitario, e ogni prestazione aggiunta all'elenco deve trovare copertura. Diritti e risorse vanno definiti insieme."),
 (6,"chiaro",0,"In linea di principio il finanziamento si ragiona proprio a partire dai LEA: prima si stabilisce che cosa garantire, poi quante risorse servono per garantirlo."),
 (6,"chiaro",0,"Per tenere aggiornato l'elenco c'e' una Commissione nazionale per l'aggiornamento dei LEA, presso il Ministero della salute. L'aggiornamento e' previsto ogni anno."),
 (6,"chiaro",0,"E per verificare che le Regioni li garantiscano davvero c'e' un sistema di monitoraggio: prima la griglia LEA, oggi il Nuovo Sistema di Garanzia, con indicatori per ciascuna delle tre aree."),
 (6,"chiaro",0,"Una Regione che non garantisce i LEA e' inadempiente, e rischia di perdere una quota del finanziamento. E se e' anche in disavanzo finisce in un piano di rientro: lo vedremo nella lezione sei."),
 (6,"profondo",1.2,"[thoughtful] Il senso dei LEA e' questo: la salute resta un diritto universale, ma un diritto con un contenuto definito, misurabile e da finanziare."),

 (7,"chiaro",0,"Le tre cose che ti chiederanno. La prima: i LEA sono introdotti dal decreto 229 del 1999. Il primo elenco e' del 2001, quello vigente del 12 gennaio 2017."),
 (7,"tenue",0,"Distrattore: i LEA non li fissa ogni Regione. Li fissa lo Stato, con competenza esclusiva dopo il Titolo quinto. Le Regioni possono solo aggiungere livelli ulteriori, con risorse proprie."),
 (7,"chiaro",0,"La seconda: le tre macroaree. Prevenzione collettiva e sanita' pubblica. Assistenza distrettuale. Assistenza ospedaliera."),
 (7,"chiaro",0,"La terza: i criteri di esclusione. Restano fuori le prestazioni senza necessita' assistenziale tutelata, quelle di efficacia non dimostrata o inappropriate, e quelle non economiche rispetto ad alternative equivalenti."),

 (8,"profondo",0,"[warm] In sintesi: i LEA sono la traduzione in elenco del diritto alla salute. Nell'ultima lezione del modulo: chi governa il sistema e chi lo paga. Stato, Regioni e fondo sanitario."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: 'Da dove nascono', 4: 'Le tre aree', 5: "L'appropriatezza", 6: "Diritti e sostenibilita'", 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
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
