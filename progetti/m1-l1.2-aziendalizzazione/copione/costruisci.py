# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 1.2 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (STRUTTURA, M1): USL -> ASL e AO; personalita' giuridica pubblica e
# autonomia imprenditoriale; il Direttore Generale; contabilita' economico-
# patrimoniale e competenza economica. Forma e regole come la 1.1.
# Attenzione ai due tempi: il testo del 1992 (con il correttivo 517/1993) da'
# personalita' giuridica e sei autonomie; l'autonomia IMPRENDITORIALE e l'atto
# aziendale di diritto privato arrivano con il 229/1999. Il copione li tiene
# separati perche' e' esattamente il distrattore dei quiz.
BLOCCHI = [
 (1,"chiaro",0,"[serious] Fino al 1992 un ospedale pubblico non aveva un bilancio suo, non aveva un responsabile dei conti, e non poteva andare in perdita. Era un pezzo del Comune. Il decreto 502 cambia tutto con una parola: azienda."),
 (1,"chiaro",0,"Una parola che allora fece discutere. Un'azienda che cura le persone? Eppure la scelta non era vendere la salute: era dare a chi la gestisce gli strumenti, e le responsabilita', di un'impresa."),
 (1,"profondo",1.2,"E' il primo principio della riforma, e il piu' visibile. Se ti chiedono che cosa ha cambiato il 502, la prima risposta e' questa: l'aziendalizzazione."),

 (2,"chiaro",0,"Quattro passaggi. Le unita' sanitarie locali diventano aziende. Che cosa vuol dire personalita' giuridica e autonomia. Chi comanda: il direttore generale. E come si tengono i conti."),

 (3,"chiaro",0,"Ricordi il punto debole della 833? Le unita' sanitarie locali erano strutture operative dei Comuni, senza personalita' giuridica. Il decreto 502 le trasforma in aziende sanitarie locali."),
 (3,"chiaro",0,"E' un cambio di natura, non di nome. L'azienda sanitaria locale non dipende piu' dal Comune: e' un ente strumentale della Regione, con un patrimonio, un bilancio e organi propri."),
 (3,"chiaro",0,"Cambia anche la dimensione. L'ambito territoriale dell'azienda sanitaria locale coincide, di norma, con quello della provincia. Le vecchie unita' sanitarie locali, spesso piccolissime, vengono accorpate."),
 (3,"chiaro",0,"Nel Veneto le aziende sanitarie locali si chiamano ULSS, e le ritroverai nel modulo due: il nome e' diverso, la natura giuridica e' la stessa."),
 (3,"chiaro",0,"Accanto alle aziende sanitarie locali nasce una seconda figura: l'azienda ospedaliera. I grandi ospedali di rilievo nazionale e di alta specializzazione vengono scorporati e diventano aziende autonome."),
 (3,"chiaro",0,"Due tipi di azienda, due ruoli. L'azienda sanitaria locale tutela la salute di chi risiede sul suo territorio. L'azienda ospedaliera eroga prestazioni ospedaliere di alta complessita'."),
 (3,"profondo",1.2,"E' la base della prossima lezione: chi garantisce la salute di una popolazione non e' per forza chi eroga ogni singola prestazione."),

 (4,"chiaro",0,"Che cosa significa, in concreto, diventare azienda? Significa acquistare la personalita' giuridica pubblica: l'azienda e' un soggetto di diritto, che agisce in nome proprio."),
 (4,"chiaro",0,"Puo' stipulare contratti, essere titolare di beni, stare in giudizio. E risponde delle proprie obbligazioni con il proprio patrimonio."),
 (4,"chiaro",0,"Alla personalita' giuridica si accompagna l'autonomia. Il decreto la declina in sei forme: organizzativa, amministrativa, patrimoniale, contabile, gestionale e tecnica."),
 (4,"chiaro",0,"Autonomia patrimoniale vuol dire che l'azienda ha beni suoi: ospedali, attrezzature, immobili. Autonomia contabile vuol dire che tiene un bilancio proprio, separato da quello della Regione."),
 (4,"chiaro",0,"Nel 1999 il decreto legislativo 229 fa un passo in piu': le aziende si costituiscono con personalita' giuridica pubblica e autonomia imprenditoriale. Imprenditoriale, cioe' orientata ai risultati."),
 (4,"chiaro",0,"E l'organizzazione interna non la fissa piu' una regola uguale per tutti. La fissa l'atto aziendale, un atto di diritto privato adottato dal direttore generale."),
 (4,"tenue",0,"Attenzione pero' al distrattore: autonomia imprenditoriale non vuol dire scopo di lucro. L'azienda sanitaria resta un ente pubblico, e il suo fine resta la tutela della salute."),

 (5,"chiaro",0,"Il cambio piu' profondo riguarda chi guida l'azienda. Spariscono l'assemblea generale e il comitato di gestione, gli organi espressi dai partiti. Al loro posto arriva una figura sola: il direttore generale."),
 (5,"chiaro",0,"Metti a confronto i due modelli. Prima: organi collegiali di nomina politica, senza responsabilita' personale. Dopo: un organo monocratico, che risponde dei risultati."),
 (5,"chiaro",0,"Il direttore generale e' nominato dalla Regione, tra persone con esperienza di direzione. Ha tutti i poteri di gestione e la rappresentanza legale dell'azienda."),
 (5,"chiaro",0,"Il suo rapporto di lavoro e' esclusivo, ed e' regolato da un contratto di diritto privato a tempo determinato: il decreto 229 lo fissa tra tre e cinque anni."),
 (5,"chiaro",0,"Dopo diciotto mesi dalla nomina la Regione verifica i risultati raggiunti. E se la gestione va in grave disavanzo, o viola la legge, il direttore generale puo' essere dichiarato decaduto."),
 (5,"chiaro",0,"Accanto a lui, due figure che nomina lui stesso: il direttore amministrativo e il direttore sanitario. Lo affiancano nella direzione dell'azienda."),
 (5,"chiaro",0,"A controllare la gestione c'e' un organo di vigilanza: il collegio dei revisori, che il decreto 229 chiamera' collegio sindacale. Verifica la regolarita' amministrativa e contabile."),
 (5,"chiaro",0,"Oggi, dal 2016, il direttore generale si sceglie da un elenco nazionale di idonei, tenuto presso il Ministero della salute. E' un filtro in piu' contro le nomine di pura appartenenza."),
 (5,"profondo",1.2,"[thoughtful] Il senso e' semplice: un solo responsabile, con poteri veri e obiettivi misurabili. Dove prima c'era un comitato che non rispondeva a nessuno, ora c'e' qualcuno che risponde dei risultati."),

 (6,"chiaro",0,"L'ultimo pilastro dell'aziendalizzazione riguarda i conti. Le unita' sanitarie locali usavano la contabilita' finanziaria, quella tipica della pubblica amministrazione."),
 (6,"chiaro",0,"La contabilita' finanziaria registra le entrate e le uscite autorizzate: quanto posso spendere, quanto ho impegnato, quanto ho pagato. Ti dice se hai rispettato il bilancio, non se hai lavorato bene."),
 (6,"chiaro",0,"Il decreto 502 porta nelle aziende la contabilita' economico-patrimoniale, quella delle imprese, con i criteri del codice civile. Il documento di riferimento diventa il bilancio d'esercizio."),
 (6,"chiaro",0,"Lo stato patrimoniale fotografa che cosa l'azienda possiede e che cosa deve. Il conto economico racconta i costi e i ricavi dell'anno, e il risultato: utile o perdita."),
 (6,"chiaro",0,"Il principio che regge tutto e' la competenza economica. Costi e ricavi si registrano quando le risorse vengono consumate o prodotte, non quando i soldi entrano o escono dalla cassa."),
 (6,"chiaro",0,"Un esempio. Un'apparecchiatura da un milione di euro, che dura dieci anni. Per la contabilita' finanziaria e' una spesa tutta nell'anno dell'acquisto. Per quella economica costa centomila euro l'anno."),
 (6,"chiaro",0,"Quella quota annuale si chiama ammortamento. Cosi' il bilancio racconta quanto costa davvero produrre salute, anno per anno, e quanto vale il patrimonio dell'azienda."),
 (6,"chiaro",0,"Accanto al bilancio arriva la contabilita' analitica, per centri di costo: sapere quanto costa ogni reparto, ogni servizio, ogni prestazione. Senza conoscere i costi, nessuno puo' governarli."),
 (6,"profondo",1.2,"Ed e' la risposta al ripiano a pie' di lista: un'azienda con un bilancio suo ha un risultato suo. Una perdita non si puo' piu' scaricare su qualcun altro senza che si veda."),

 (7,"chiaro",0,"E ora le tre cose che ti chiederanno. La prima: con il decreto 502 le unita' sanitarie locali diventano aziende con personalita' giuridica pubblica. Nascono le aziende sanitarie locali e le aziende ospedaliere."),
 (7,"tenue",0,"Il distrattore tipico e' l'autonomia imprenditoriale. Non c'e' nel testo del 1992: arriva con il decreto 229 del 1999, insieme all'atto aziendale di diritto privato."),
 (7,"chiaro",0,"La seconda: il direttore generale. Lo nomina la Regione, ha tutti i poteri di gestione e la rappresentanza legale, lavora con un contratto di diritto privato da tre a cinque anni."),
 (7,"tenue",0,"Occhio a chi nomina chi. La Regione nomina il direttore generale. Il direttore generale nomina il direttore amministrativo e il direttore sanitario. Non il contrario, e non il Comune."),
 (7,"chiaro",0,"La terza: la contabilita' economico-patrimoniale, con il principio della competenza economica. Costi e ricavi si registrano quando si consumano o si producono le risorse, non quando si paga."),

 (8,"profondo",0,"[warm] In sintesi: l'azienda da' alla sanita' pubblica un responsabile, un bilancio e dei conti da rendere. Nella prossima lezione il secondo principio: chi indirizza, chi gestisce, e il quasi-mercato."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: 'Da USL ad azienda', 4: "Personalita' e autonomia", 5: 'Il direttore generale', 6: 'I conti', 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
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
