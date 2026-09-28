# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 8.2 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M8): i cinque principi. 1) Distinzione indirizzo/gestione: D.Lgs. 165 art. 4 (c. 1 organi di governo,
# c. 2 dirigenti, c. 3 deroghe solo per legge, c. 4 enti con vertice non politico), art. 14 c. 3. 2) Concorso:
# art. 97 c. 4 Cost., art. 35; art. 52 c. 1-bis (progressioni fra aree: procedura comparativa, riserva almeno
# 50% all'esterno, D.L. 80/2021; testo Drive al 2020, da verificare). 3) Contrattazione: art. 40 c. 1 e 3-bis,
# artt. 41-47 (ARAN), quattro comparti (CCNQ 2016). 4) Flessibilita': art. 2 c. 1 lett. b, art. 36 c. 1-2 e 5,
# art. 7 c. 5-bis. 5) Valutazione: D.Lgs. 150/2009 art. 3 c. 1, 2, 5. Fonti: D.Lgs. 165 al 24/1/2020; D.Lgs.
# 150/2009 vigente dal 22/6/2017; dispensa su Drive (con correzioni).
BLOCCHI = [
 (1,"chiaro",0.8,"[serious] Un assessore regionale chiede al direttore di un ufficio di assumere subito una persona che conosce, senza selezione. Il direttore risponde di no. Ha ragione lui?"),
 (1,"chiaro",0,"Si', e per almeno due motivi. La riforma del pubblico impiego poggia su alcuni principi che nessuno, nemmeno chi governa, puo' scavalcare. In questa lezione ne vediamo cinque."),
 (1,"profondo",1.2,"Cinque principi tengono in piedi tutto il resto."),

 (2,"chiaro",0.6,"Eccoli. La distinzione tra indirizzo politico e gestione. Il concorso. La contrattazione collettiva. La flessibilita'. E la valutazione della performance."),

 (3,"chiaro",0.5,"Il primo principio e' nell'articolo 4 del 165. Gli organi di governo esercitano l'indirizzo politico amministrativo: fissano obiettivi, programmi, priorita' e direttive generali."),
 (3,"chiaro",0,"Distribuiscono le risorse tra gli uffici, fanno le nomine previste dalla legge e poi verificano che i risultati corrispondano agli indirizzi dati."),
 (3,"chiaro",0,"Ai dirigenti spetta invece la gestione: adottano gli atti e i provvedimenti, compresi quelli che impegnano l'amministrazione verso l'esterno, con autonomi poteri di spesa e di organizzazione."),
 (3,"chiaro",0,"E ne rispondono in via esclusiva: dell'attivita' amministrativa, della gestione e dei risultati. Queste competenze si possono derogare solo per espressa previsione di legge."),
 (3,"chiaro",0,"Per i ministeri l'articolo 14 e' ancora piu' netto: il ministro non puo' revocare, riformare o adottare lui stesso gli atti di competenza dei dirigenti."),
 (3,"chiaro",0,"Questa separazione protegge due cose. L'imparzialita', perche' l'amministrazione non cambia regole a ogni cambio di maggioranza. E la responsabilita', perche' si sa sempre chi ha deciso che cosa."),
 (3,"chiaro",0,"E nelle aziende sanitarie? Il vertice non e' un organo politico. Ma l'articolo 4 chiede anche a questi enti di distinguere tra indirizzo e controllo, da un lato, e attuazione e gestione dall'altro."),
 (3,"chiaro",0.6,"Torniamo all'assessore. Scegliere chi assumere e' un atto di gestione, e segue le regole del reclutamento. Non e' materia di indirizzo politico."),
 (3,"tenue",0.8,"Occhio a un distrattore: la politica non e' esclusa dall'amministrazione. Decide gli obiettivi e controlla i risultati. Quello che non puo' fare e' sostituirsi ai dirigenti negli atti di gestione."),
 (3,"profondo",1.2,"La politica indica la rotta, la dirigenza governa la nave."),

 (4,"chiaro",0.5,"Il secondo principio viene dalla Costituzione. L'articolo 97 dice che agli impieghi nelle pubbliche amministrazioni si accede mediante concorso, salvo i casi stabiliti dalla legge."),
 (4,"chiaro",0,"Il concorso serve a due cose: scegliere i piu' capaci, e garantire a tutti la stessa possibilita' di entrare. E' il merito, insieme all'imparzialita'."),
 (4,"chiaro",0,"L'articolo 35 del 165 traduce il principio in regole: pubblicita' dei bandi, imparzialita', economicita' e rapidita' delle procedure, commissioni di esperti, pari opportunita'."),
 (4,"chiaro",0,"Anche le commissioni sono pensate per l'imparzialita': non possono farne parte i componenti dell'organo politico dell'amministrazione, chi ricopre cariche politiche, i rappresentanti sindacali."),
 (4,"chiaro",0,"Il principio vale anche quando si cambia area. Le progressioni tra le aree sono una forma di accesso a un inquadramento superiore, e per questo devono essere selettive."),
 (4,"chiaro",0,"Oggi si fanno con una procedura comparativa: contano la valutazione degli ultimi tre anni, l'assenza di sanzioni disciplinari, i titoli e gli incarichi. Almeno meta' dei posti resta per l'esterno."),
 (4,"tenue",0.8,"Attenzione: il concorso non e' l'unica via in assoluto. La Costituzione ammette eccezioni, ma solo se stabilite dalla legge, come le assunzioni obbligatorie delle categorie protette."),
 (4,"profondo",1.2,"Si entra per merito, con regole uguali per tutti."),

 (5,"chiaro",0.5,"Il terzo principio e' la contrattazione collettiva. L'articolo 40 dice che il contratto disciplina il rapporto di lavoro e le relazioni sindacali."),
 (5,"chiaro",0,"Ci sono due livelli. Il contratto nazionale, firmato tra l'ARAN e i sindacati rappresentativi, per ogni comparto. E il contratto integrativo, firmato in ogni azienda."),
 (5,"chiaro",0,"Il contratto nazionale dura tre anni, per la parte normativa e per quella economica. Prima della firma definitiva i costi passano ai controlli, con la certificazione della Corte dei conti."),
 (5,"chiaro",0,"I comparti sono quattro: funzioni centrali, funzioni locali, istruzione e ricerca, sanita'. Chi lavora in un'azienda sanitaria segue il contratto nazionale del comparto sanita'."),
 (5,"chiaro",0,"L'integrativo si muove solo sulle materie, nei vincoli e nei limiti del contratto nazionale, e dentro i vincoli di bilancio. Non puo' inventare voci di stipendio nuove."),
 (5,"chiaro",0.6,"Un esempio: il contratto nazionale fissa le indennita' e i criteri generali. L'integrativo aziendale decide come ripartire le risorse per la produttivita' tra i servizi, secondo quei criteri."),
 (5,"chiaro",0,"E ci sono materie escluse dal contratto: l'organizzazione degli uffici, le prerogative dei dirigenti, il conferimento e la revoca degli incarichi dirigenziali."),
 (5,"chiaro",0,"Su sanzioni disciplinari, valutazione ai fini del salario accessorio e mobilita', invece, la contrattazione e' ammessa, ma solo nei limiti fissati dalla legge."),
 (5,"tenue",0.8,"Un distrattore frequente: il contratto integrativo non puo' derogare al contratto nazionale. Lo attua sulle materie che il nazionale gli affida."),
 (5,"profondo",1.2,"Il contratto regola il rapporto, la legge ne fissa i confini."),

 (6,"chiaro",0.5,"Il quarto principio e' la flessibilita'. L'organizzazione deve adattarsi ai compiti e ai programmi, con ampi margini per le decisioni operative e gestionali."),
 (6,"chiaro",0,"Flessibilita' pero' non vuol dire precariato. L'articolo 36 dice che per il fabbisogno ordinario si assume solo a tempo indeterminato, attraverso le procedure dell'articolo 35."),
 (6,"chiaro",0,"Tempo determinato, somministrazione e formazione lavoro sono ammessi solo per esigenze temporanee o eccezionali, comprovate. E le collaborazioni organizzate dal committente sono vietate."),
 (6,"chiaro",0,"Se le regole sulle assunzioni vengono violate, il rapporto non si trasforma mai in un posto a tempo indeterminato. Il lavoratore ha diritto al risarcimento, e chi ha sbagliato ne risponde."),
 (6,"chiaro",0,"Il quinto principio e' la valutazione. Secondo il decreto legislativo 150 del 2009, misurare e valutare la performance serve a migliorare i servizi e a far crescere le competenze."),
 (6,"chiaro",0,"Ogni amministrazione valuta su tre piani: l'ente nel suo complesso, le singole unita' organizzative e ogni dipendente. E rispettare queste regole e' condizione per dare premi e progressioni."),
 (6,"chiaro",0,"Ogni amministrazione adotta il proprio sistema di misurazione e valutazione, con il parere dell'organismo indipendente di valutazione. Lo vedremo nella lezione sulla performance."),
 (6,"chiaro",0,"E una valutazione negativa conta. Pesa sulla responsabilita' dei dirigenti e, se si ripete per tre anni di fila, puo' portare al licenziamento disciplinare del dipendente."),
 (6,"chiaro",0.6,"Un esempio: il premio di produttivita' in reparto. Si paga in base agli obiettivi raggiunti e alla valutazione, non a tutti in parti uguali per il solo fatto di essere in servizio."),
 (6,"tenue",0.8,"Attenzione: flessibilita' non significa assumere a termine per coprire posti stabili. Il contratto a tempo determinato e' un'eccezione, non la regola."),
 (6,"profondo",1.2,"Organizzazione flessibile, lavoro stabile, merito misurato."),

 (7,"chiaro",0.8,"Le tre cose che ti chiederanno. La prima: gli organi di governo fissano obiettivi e controllano i risultati; i dirigenti gestiscono e ne rispondono in via esclusiva."),
 (7,"chiaro",0.8,"La seconda: si accede per concorso, come vuole l'articolo 97 della Costituzione; il contratto collettivo ha due livelli, nazionale con l'ARAN e integrativo in azienda."),
 (7,"chiaro",0.8,"La terza: il fabbisogno ordinario si copre a tempo indeterminato, il lavoro flessibile solo per esigenze temporanee; la valutazione e' condizione per premi e progressioni."),
 (7,"tenue",0.8,"L'ultimo distrattore: un contratto a termine irregolare non diventa mai un posto fisso nella pubblica amministrazione. Da' diritto al risarcimento del danno."),

 (8,"profondo",0,"[warm] In sintesi: indirizzo e gestione, concorso, contratto, flessibilita', valutazione. Nella prossima lezione entriamo nell'accesso: come si diventa dipendenti pubblici."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: 'Chi decide e chi gestisce', 4: 'Il concorso', 5: 'La contrattazione', 6: "Flessibilita' e valutazione", 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
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
