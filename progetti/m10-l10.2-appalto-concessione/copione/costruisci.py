# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 10.2 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M10): appalto, concessione, ambito. D.Lgs. 36/2023 allegato I.1 (definizioni: appalto, concessione,
# lavori, forniture, servizi, rischio operativo), art. 13 (ambito), art. 14 (contratti misti, oggetto principale;
# valore stimato), art. 56 (contratti esclusi), art. 177 (rischio operativo: lato domanda, lato offerta),
# Libro III (settori speciali), Libro IV (partenariato pubblico privato). Contratti attivi e passivi (dispensa:
# R.D. 2440/1923 per i contratti attivi). Fonti: dispense su Drive (con correzioni); testo vigente da verificare.
BLOCCHI = [
 (1,"chiaro",0.8,"[serious] In un ospedale ci sono una mensa per i pazienti, un parcheggio a pagamento e un bar nell'atrio. Tutti e tre sono gestiti da imprese esterne. Sono tutti appalti?"),
 (1,"chiaro",0,"No. Alcuni sono appalti, altri concessioni. La differenza non sta nel nome del contratto, ma in una domanda precisa: chi si assume il rischio della gestione?"),
 (1,"profondo",1.2,"Tutto dipende da chi corre il rischio della gestione."),

 (2,"chiaro",0.6,"Quattro passaggi. Che cos'e' un appalto e quali tipi esistono. Che cos'e' una concessione e il rischio operativo. Esempi dalla sanita'. E a quali contratti si applica il codice."),

 (3,"chiaro",0.5,"L'appalto e' un contratto a titolo oneroso, stipulato per iscritto tra una o piu' stazioni appaltanti e uno o piu' operatori economici."),
 (3,"chiaro",0,"Ha per oggetto l'esecuzione di lavori, la fornitura di prodotti o la prestazione di servizi. In cambio l'amministrazione paga un prezzo: e' lei a sostenere la spesa."),
 (3,"chiaro",0,"Sono quindi tre i tipi di appalto. I lavori: costruire, ristrutturare, demolire un'opera. Le forniture: acquistare, prendere in locazione o in leasing dei beni."),
 (3,"chiaro",0,"I servizi: tutte le prestazioni che non sono lavori ne' forniture, come pulizie, manutenzioni, lavanderia, ristorazione, vigilanza o servizi informatici."),
 (3,"chiaro",0,"Spesso un contratto mescola prestazioni diverse. Nei contratti misti si guarda all'oggetto principale, di solito quello di valore piu' alto, per decidere quali regole applicare."),
 (3,"chiaro",0,"L'appalto e' un contratto di diritto privato, ma preceduto da una procedura pubblica: la scelta del contraente segue le regole del codice, poi il rapporto segue anche il codice civile."),
 (3,"chiaro",0,"Appalto e concessione sono contratti passivi: comportano una spesa o l'uso di risorse pubbliche. I contratti attivi, come la vendita o l'affitto di un bene pubblico, seguono altre regole."),
 (3,"chiaro",0.6,"Un esempio: un laboratorio prende in uso degli analizzatori, con reagenti e assistenza tecnica compresi. E' un contratto misto, di fornitura e di servizio, spesso chiamato service."),
 (3,"tenue",0.8,"Occhio a un distrattore: la locazione e il leasing di beni non sono estranei al codice. Anche prendere in affitto un'apparecchiatura e' una fornitura."),
 (3,"profondo",1.2,"Lavori, forniture, servizi: l'amministrazione paga."),

 (4,"chiaro",0.5,"La concessione e' anch'essa un contratto a titolo oneroso e scritto. Ma cambia il corrispettivo: l'impresa viene ripagata con il diritto di gestire l'opera o il servizio."),
 (4,"chiaro",0,"A volte a quel diritto si aggiunge un prezzo pagato dall'amministrazione. Ma l'elemento decisivo e' un altro: il concessionario si assume il rischio operativo."),
 (4,"chiaro",0,"Rischio operativo significa che in condizioni normali non e' garantito il recupero degli investimenti e dei costi. Il concessionario puo' guadagnare, ma puo' anche perdere."),
 (4,"chiaro",0,"Il rischio puo' stare dal lato della domanda, quando gli utenti sono meno del previsto. O dal lato dell'offerta, quando il servizio costa piu' del previsto o non rispetta gli standard."),
 (4,"chiaro",0,"Se l'amministrazione garantisce comunque all'impresa di coprire i costi, il rischio non e' trasferito. Allora, anche se si chiama concessione, in sostanza e' un appalto."),
 (4,"chiaro",0,"La durata della concessione e' limitata: deve bastare a recuperare gli investimenti con un ritorno ragionevole, ma non di piu'. Una concessione troppo lunga chiude il mercato."),
 (4,"chiaro",0,"Le concessioni hanno regole proprie nel codice, insieme al partenariato pubblico privato, che unisce capitali privati e finalita' pubbliche, per esempio nella costruzione di un ospedale."),
 (4,"chiaro",0.6,"Un esempio: un'impresa costruisce e gestisce il parcheggio dell'ospedale, incassando le tariffe dagli utenti. Se le auto sono poche, ci perde. Questa e' una concessione."),
 (4,"tenue",0.8,"Attenzione: nella concessione non e' vero che l'amministrazione garantisce i ricavi all'impresa. Se li garantisse, il rischio operativo non passerebbe al concessionario."),
 (4,"profondo",1.2,"Nella concessione il rischio passa all'impresa."),

 (5,"chiaro",0.5,"In sanita' gli appalti sono ovunque. Farmaci, dispositivi medici e apparecchiature sono forniture. Pulizie, mensa, lavanderia e trasporto dei campioni sono servizi."),
 (5,"chiaro",0,"La ristrutturazione di un reparto o la costruzione di un nuovo padiglione sono lavori. E la manutenzione degli impianti, a seconda dei casi, puo' essere un servizio o un lavoro."),
 (5,"chiaro",0,"Le concessioni sono meno frequenti, ma ci sono: il bar interno, i distributori automatici, i parcheggi, alcuni servizi rivolti direttamente ai visitatori."),
 (5,"chiaro",0,"Nella stessa famiglia rientra la finanza di progetto per un nuovo ospedale: il privato costruisce, poi gestisce per anni alcuni servizi non sanitari e si ripaga nel tempo."),
 (5,"chiaro",0,"Torniamo all'inizio. La mensa per i pazienti e' un appalto di servizi: la paga l'azienda. Il parcheggio a pagamento e il bar, pagati dagli utenti, sono di regola concessioni."),
 (5,"chiaro",0,"La distinzione conta: cambiano le regole di gara, la durata del contratto, il calcolo del valore e chi sopporta le perdite se le cose vanno male."),
 (5,"chiaro",0,"Per le concessioni il valore si calcola sul fatturato che il concessionario puo' realizzare per tutta la durata del contratto, non su quanto paga l'amministrazione."),
 (5,"chiaro",0.6,"Un esempio: i distributori automatici di bevande in un ospedale. L'impresa incassa dalle vendite e magari versa un canone all'azienda. Il rischio di vendere poco resta suo."),
 (5,"tenue",0.8,"Un distrattore frequente: non conta come le parti chiamano il contratto. Conta chi sopporta il rischio della gestione e come viene pagata l'impresa."),
 (5,"profondo",1.2,"La sostanza prevale sempre sul nome del contratto."),

 (6,"chiaro",0.5,"Il codice si applica ai contratti di appalto e di concessione delle amministrazioni pubbliche e degli altri soggetti obbligati, come gli organismi di diritto pubblico."),
 (6,"chiaro",0,"Le aziende sanitarie sono amministrazioni aggiudicatrici a tutti gli effetti, come ministeri, regioni e comuni. Per loro il codice vale per intero."),
 (6,"chiaro",0,"Una parte a se' riguarda i settori speciali: acqua, energia, trasporti e servizi postali, dove operano anche imprese private con diritti speciali o esclusivi."),
 (6,"chiaro",0,"Alcuni contratti sono esclusi, perche' hanno una disciplina propria: per esempio l'acquisto o la locazione di terreni e fabbricati, i contratti di lavoro, alcuni servizi legali e di arbitrato."),
 (6,"chiaro",0,"Anche per i contratti esclusi valgono pero' i principi generali del codice: risultato, fiducia, accesso al mercato, trasparenza."),
 (6,"chiaro",0,"Il valore stimato del contratto si calcola al netto dell'IVA, comprendendo opzioni e rinnovi. E un appalto non si puo' frazionare artificialmente per stare sotto le soglie."),
 (6,"chiaro",0.6,"Un esempio: un'azienda divide in dieci piccoli acquisti una fornitura unica, per affidarli direttamente senza gara. E' un frazionamento vietato."),
 (6,"tenue",0.8,"Attenzione: il valore stimato non si calcola IVA compresa, e non esclude i rinnovi previsti. Conta l'importo massimo che il contratto puo' raggiungere, al netto dell'IVA."),
 (6,"profondo",1.2,"Il valore si misura intero, senza trucchi."),

 (7,"chiaro",0.8,"Le tre cose che ti chiederanno. La prima: l'appalto ha per oggetto lavori, forniture o servizi, e il corrispettivo e' un prezzo pagato dall'amministrazione."),
 (7,"chiaro",0.8,"La seconda: nella concessione l'impresa e' ripagata con il diritto di gestire, e si assume il rischio operativo, dal lato della domanda o dell'offerta."),
 (7,"chiaro",0.8,"La terza: il valore stimato si calcola al netto dell'IVA, con opzioni e rinnovi, ed e' vietato frazionare artificialmente un contratto."),
 (7,"tenue",0.8,"L'ultimo distrattore: il bar interno gestito da un'impresa che incassa dagli utenti non e' un appalto di servizi. Di regola e' una concessione."),

 (8,"profondo",0,"[warm] In sintesi: chi paga, chi gestisce, chi rischia. Nella prossima lezione: i soggetti del sistema, dalle stazioni appaltanti alle centrali di committenza."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: "L'appalto", 4: 'La concessione', 5: "Esempi in sanita'", 6: "L'ambito del codice", 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
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
