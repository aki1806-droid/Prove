# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 3.1 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M3, legislazione socio-sanitaria del Veneto): tradizione territoriale; anni
# Settanta e Ottanta; il bivio del 1992; le leggi gemelle del 14 settembre 1994;
# filosofia di governo. Fonti: dispensa CISL FP (Galiazzo), «Normativa regione Veneto
# in materia sanitaria»; schede CISL FP con i riferimenti agli articoli delle L.R. 55
# e 56/1994; Regione del Veneto, «Origini e storia del Sistema socio sanitario
# regionale» (via sintesi di ricerca: L.R. 12/1974, 64/1975, 55/1982); L.R. 19/2016.
# Il testo delle due leggi del 1994 non era raggiungibile: vedi REGISTRO.
BLOCCHI = [
 (1,"chiaro",0,"[serious] Nel Veneto l'azienda sanitaria si chiama ULSS: unita' locale socio-sanitaria. Nella maggior parte d'Italia si dice azienda sanitaria. Quella esse in piu' non e' un dettaglio."),
 (1,"chiaro",0,"E' il segno di una scelta fatta piu' di cinquant'anni fa, e mai abbandonata: tenere insieme la sanita' e il sociale, dentro la stessa organizzazione. E di governarle insieme ai Comuni."),
 (1,"profondo",1.2,"Per capire la legislazione socio-sanitaria del Veneto bisogna partire dalle radici. E le radici stanno negli anni Settanta."),

 (2,"chiaro",0,"Quattro passaggi. La tradizione territoriale, dagli anni Settanta agli Ottanta. Il bivio della riforma del 1992. Le due leggi gemelle del 1994. E la filosofia di governo che ne esce."),

 (3,"chiaro",0,"Nel 1970 partono le Regioni a statuto ordinario. Il Veneto, appena riceve le prime competenze, sceglie una strada precisa: integrare l'assistenza sanitaria e i servizi sociali."),
 (3,"chiaro",0,"Le prime tappe sono due leggi regionali: la 12 del 1974 e la 64 del 1975. Introducono i consorzi socio-sanitari fra i Comuni."),
 (3,"chiaro",0,"Un consorzio e' un gruppo di Comuni che si mettono insieme per gestire servizi che da soli non reggerebbero. E li' la cura della salute e l'aiuto sociale stanno gia' vicini."),
 (3,"chiaro",0,"Conta piu' l'idea delle date: chi ha bisogno di cure ha spesso bisogno anche di aiuto in casa, di un sostegno, di una rete. Separare le due cose vuol dire far girare la persona fra sportelli."),
 (3,"chiaro",0,"Poi arriva la riforma nazionale. La legge 833 del 1978 istituisce il Servizio sanitario nazionale, e sul territorio le unita' sanitarie locali, le USL."),
 (3,"chiaro",0,"Il Veneto la applica a modo suo. Le sue unita' locali non sono solo sanitarie: sono socio-sanitarie. Da qui la sigla che usiamo ancora oggi, ULSS."),
 (3,"chiaro",0,"Nel 1982 una nuova legge regionale, la 55, detta le norme per le funzioni socio-assistenziali sul territorio. E rafforza il legame fra unita' locali e Comuni."),
 (3,"chiaro",0,"Il meccanismo e' la delega. I Comuni sono titolari dei servizi sociali, ma possono affidarne la gestione all'unita' locale. Un solo gestore, due mestieri: la sanita' e il sociale."),
 (3,"tenue",0,"Attenzione a una trappola di numeri: la legge regionale 55 del 1982 non e' la 55 del 1994. Stesso numero, dodici anni di distanza, materie diverse."),
 (3,"chiaro",0,"Alla fine degli anni Ottanta il quadro e' chiaro: un sistema radicato nei territori, con i Comuni dentro il governo della sanita' e i servizi sociali gestiti insieme a quelli sanitari."),
 (3,"profondo",1.2,"La esse di ULSS e' una scelta politica: la persona non si divide tra un ufficio sanitario e uno sociale."),

 (4,"chiaro",0,"Poi arriva la riforma del 1992, il decreto legislativo 502, che abbiamo visto nel modulo uno. Le unita' sanitarie locali diventano aziende."),
 (4,"chiaro",0,"Aziende con personalita' giuridica pubblica, un direttore generale, i conti in termini economici. E una spinta forte a concentrarsi sulla sanita' in senso stretto."),
 (4,"chiaro",0,"Per il Veneto e' un bivio. Da una parte, separare: aziende solo sanitarie, e il sociale che torna ai Comuni. Dall'altra, integrare: aziende che restano socio-sanitarie."),
 (4,"chiaro",0,"Separare ha i suoi argomenti: bilanci piu' chiari, un mestiere solo, responsabilita' nette. Integrare ne ha altri: una sola porta per il cittadino, e percorsi che non si spezzano."),
 (4,"chiaro",0,"Il decreto 502 lascia spazio alle Regioni. Sono loro a definire il quadro istituzionale del servizio sanitario regionale e a individuare le unita' locali e i loro ambiti territoriali."),
 (4,"chiaro",0,"Sono sempre le Regioni a scegliere quali ospedali costituire in aziende ospedaliere, e a disciplinare come le unita' locali si organizzano e funzionano."),
 (4,"chiaro",0,"Il decreto prevede anche che l'unita' locale possa gestire servizi socio-assistenziali su delega dei Comuni, con i costi a loro carico. E' la porta che il Veneto usa."),
 (4,"chiaro",0,"La scelta e' integrare. Le aziende venete restano ULSS: aziende unita' locali socio-sanitarie, con i servizi sociali che i Comuni delegano loro."),
 (4,"tenue",0,"Un distrattore frequente: il decreto 502 non obbliga a separare sanita' e sociale. Lascia la scelta alle Regioni, e il Veneto sceglie di tenere insieme."),
 (4,"profondo",1.2,"Nel 1992 molte Regioni hanno separato. Il Veneto ha scelto di tenere insieme."),

 (5,"chiaro",0,"La scelta diventa legge il 14 settembre 1994. Con la stessa data escono due leggi regionali, la 55 e la 56, pubblicate insieme sul Bollettino regionale numero 77."),
 (5,"chiaro",0,"Sono gemelle perche' si dividono il lavoro. La 56 disegna l'architettura: detta le norme e i principi per il riordino del servizio sanitario regionale."),
 (5,"chiaro",0,"La 55 fa girare la macchina: regola l'assetto programmatorio, contabile, gestionale e di controllo delle ULSS e delle aziende ospedaliere."),
 (5,"chiaro",0,"Detto in breve: la 56 dice chi fa che cosa. La 55 dice come si programma, come si tengono i conti e come si controlla. Una e' la pianta dell'edificio, l'altra il suo impianto."),
 (5,"chiaro",0,"Entrambe attuano il decreto 502 del 1992, come modificato dal decreto 517 del 1993. Sono la traduzione veneta della riforma nazionale."),
 (5,"chiaro",0,"Nella 56 la Regione si tiene la programmazione, l'indirizzo, il controllo e la vigilanza. Alle aziende tocca la gestione dei servizi."),
 (5,"chiaro",0,"Ed e' la 56 a promuovere la delega della gestione dei servizi sociali dai Comuni alle ULSS, con finanziamenti specifici. L'integrazione non e' piu' solo prassi: e' legge."),
 (5,"chiaro",0,"Nella 55 arrivano gli strumenti dell'azienda: il piano generale, i bilanci, la metodica di budget, la contabilita' economico-patrimoniale e il controllo di gestione."),
 (5,"tenue",0,"Un classico dei quiz: la 55 e' la legge della programmazione e dei conti, la 56 quella del riordino. Chi inverte i due numeri sbaglia la domanda."),
 (5,"chiaro",0,"Non sono storia chiusa. La legge 19 del 2016 modifica la 56 e la richiama piu' volte: per esempio sul direttore generale e sulla Conferenza dei sindaci."),
 (5,"profondo",1.2,"Trent'anni dopo, le fondamenta del sistema veneto sono ancora quelle del 1994."),

 (6,"chiaro",0,"Che filosofia di governo esce da questa storia? Tre idee, che nell'ultima lezione del modulo vedremo come principi guida."),
 (6,"chiaro",0,"La prima e' l'integrazione socio-sanitaria. Sanita' e sociale nello stesso sistema, perche' i bisogni delle persone non si dividono per competenze."),
 (6,"chiaro",0,"La seconda e' la sussidiarieta'. Le decisioni stanno il piu' vicino possibile ai cittadini: i Comuni dentro il governo, la Conferenza dei sindaci accanto al direttore generale."),
 (6,"chiaro",0,"La terza e' la prossimita'. Servizi radicati nei territori, dal distretto alla casa della persona. Il cittadino trova i servizi dove vive, e l'ospedale resta il luogo della fase acuta."),
 (6,"chiaro",0,"Pensa a un anziano non autosufficiente: gli servono l'infermiere, il medico, l'assistente sociale e un aiuto per l'assistenza a casa. Nel Veneto la regia sta in un posto solo: la ULSS."),
 (6,"chiaro",0,"E c'e' un metodo che le tiene insieme: la Regione programma e controlla, le aziende gestiscono con strumenti d'impresa, e i risultati si misurano."),
 (6,"chiaro",0,"Questo equilibrio ha retto. Nel 2016 le ULSS scendono da ventuno a nove, ma restano socio-sanitarie. La esse non si perde, e i Comuni restano dentro, con la Conferenza dei sindaci."),

 (7,"chiaro",0,"Le tre cose che ti chiederanno. La prima: ULSS vuol dire unita' locale socio-sanitaria. Nel Veneto l'azienda gestisce anche i servizi sociali delegati dai Comuni."),
 (7,"chiaro",0,"La seconda: le leggi gemelle sono del 14 settembre 1994. La 56 riordina il servizio sanitario regionale, la 55 ne regola programmazione, contabilita', gestione e controllo."),
 (7,"chiaro",0,"La terza: entrambe attuano il decreto legislativo 502 del 1992, come modificato dal 517 del 1993. E restano il riferimento, aggiornate dalle leggi venute dopo."),
 (7,"tenue",0,"L'ultimo distrattore: il modello socio-sanitario veneto non nasce nel 1994. Le radici sono negli anni Settanta, con i consorzi socio-sanitari fra i Comuni."),

 (8,"profondo",0,"[warm] In sintesi: una storia lunga e una scelta costante, tenere insieme sanita' e sociale. Nella prossima lezione entriamo nella legge 56: le ULSS, i Comuni, la Regione."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: 'La tradizione territoriale', 4: 'Il bivio del 1992', 5: 'Le leggi gemelle del 1994', 6: 'La filosofia di governo', 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
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
