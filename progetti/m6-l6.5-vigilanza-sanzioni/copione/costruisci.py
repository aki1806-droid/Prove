# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 6.5 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M6): chi vigila e che cosa si rischia. D.Lgs. 33/2013 art. 43 (RPCT anche responsabile della
# trasparenza; controllo stabile; segnalazioni all'organo di indirizzo, all'OIV, all'ANAC e all'ufficio
# disciplina; c. 3 i dirigenti garantiscono il flusso delle informazioni; c. 4 accesso civico), art. 10 (sezione
# trasparenza del piano anticorruzione; obiettivi strategici), art. 44 (OIV), art. 45 (ANAC: controlli, ordine di
# pubblicare entro 30 giorni, illecito disciplinare), art. 46 (responsabilita' dirigenziale, danno all'immagine,
# retribuzione di risultato; causa non imputabile), art. 47 (sanzioni 500-10.000 euro per artt. 14, 4-bis, 22;
# irrogate dall'ANAC); artt. 15 c. 2-3, 22 c. 4, 26 c. 3 (efficacia e divieti). L. 190/2012 art. 1 c. 7.
# PIAO (D.L. 80/2021): da verificare. Fonti: D.Lgs. 33/2013 agg. 13/3/2017; dispense CISL (con correzioni).
BLOCCHI = [
 (1,"chiaro",0.8,"[serious] Un obbligo di pubblicazione non viene rispettato per mesi. Chi se ne accorge? Chi deve intervenire? E chi ne risponde, il dirigente, l'ufficio o l'intera azienda?"),
 (1,"chiaro",0,"La trasparenza non si regge sulla buona volonta'. Ha dei responsabili dentro l'amministrazione, un'autorita' che vigila da fuori e conseguenze precise per chi non rispetta gli obblighi."),
 (1,"profondo",1.2,"Una regola senza controlli resta sulla carta."),

 (2,"chiaro",0.6,"Quattro passaggi. Chi controlla dentro l'amministrazione. Il controllo esterno dell'ANAC. Le responsabilita' di chi non adempie. E le sanzioni, quelle vere, senza le semplificazioni delle dispense."),

 (3,"chiaro",0.5,"La figura centrale e' il responsabile della prevenzione della corruzione. Per l'articolo 43 del decreto 33 svolge, di norma, anche le funzioni di responsabile per la trasparenza. Da qui la sigla RPCT."),
 (3,"chiaro",0,"E' nominato dall'organo di indirizzo dell'amministrazione, di norma tra i dirigenti di ruolo in servizio. Nelle aziende sanitarie la scelta spetta quindi alla direzione aziendale."),
 (3,"chiaro",0,"L'RPCT svolge stabilmente un'attivita' di controllo: verifica che le informazioni pubblicate siano complete, chiare e aggiornate."),
 (3,"chiaro",0,"Quando trova ritardi o inadempimenti, li segnala all'organo di indirizzo politico, all'organismo indipendente di valutazione, all'ANAC e, nei casi piu' gravi, all'ufficio per i procedimenti disciplinari."),
 (3,"chiaro",0,"Ma l'RPCT non lavora da solo. I dirigenti responsabili degli uffici garantiscono il tempestivo e regolare flusso delle informazioni da pubblicare. Sono loro a fornire i dati."),
 (3,"chiaro",0,"E ognuno ha un ruolo: il codice di comportamento dei dipendenti pubblici chiede a ciascuno di collaborare agli obblighi di trasparenza, fornendo i dati in modo completo e puntuale."),
 (3,"chiaro",0,"La trasparenza entra anche nella programmazione. Una sezione del piano triennale di prevenzione della corruzione indica chi trasmette e chi pubblica ogni informazione."),
 (3,"chiaro",0,"E la promozione di maggiori livelli di trasparenza e' un obiettivo strategico: si traduce in obiettivi organizzativi e individuali, da inserire nella programmazione dell'ente."),
 (3,"chiaro",0,"Oggi, nelle amministrazioni piu' grandi, questa programmazione confluisce nel piano integrato di attivita' e organizzazione, il PIAO, nella sezione dedicata a rischi corruttivi e trasparenza."),
 (3,"chiaro",0,"L'organismo indipendente di valutazione, l'OIV, verifica la coerenza tra piano anticorruzione e piano della performance, e usa i dati sulla trasparenza per valutare dirigenti e responsabili."),
 (3,"tenue",0.8,"Occhio a un distrattore: l'RPCT non e' l'unico responsabile della pubblicazione. I dirigenti degli uffici devono garantire il flusso dei dati."),
 (3,"profondo",1.2,"Un responsabile che controlla, dirigenti che forniscono i dati."),

 (4,"chiaro",0.5,"Da fuori vigila l'Autorita' nazionale anticorruzione, l'ANAC. Controlla l'esatto adempimento degli obblighi di pubblicazione, con poteri ispettivi."),
 (4,"chiaro",0,"Puo' chiedere notizie, informazioni, atti e documenti alle amministrazioni, e controllare l'operato dei responsabili per la trasparenza, anche chiedendo informazioni all'OIV."),
 (4,"chiaro",0,"L'ANAC puo' intervenire anche a seguito di segnalazioni, per esempio di cittadini o di associazioni che trovano un obbligo non rispettato in Amministrazione trasparente."),
 (4,"chiaro",0,"Se trova un inadempimento, ordina di pubblicare i dati mancanti entro un termine non superiore a trenta giorni."),
 (4,"chiaro",0,"Il mancato rispetto dell'ordine dell'ANAC costituisce illecito disciplinare. L'ANAC lo segnala all'ufficio disciplinare, ai vertici dell'amministrazione e all'OIV."),
 (4,"chiaro",0,"Se del caso informa anche la Corte dei conti, per le altre forme di responsabilita'. E rende pubblici i propri provvedimenti sugli inadempimenti."),
 (4,"chiaro",0,"L'ANAC definisce anche i criteri, i modelli e gli schemi standard per organizzare la sezione Amministrazione trasparente, cosi' da renderla uniforme in tutte le amministrazioni."),
 (4,"tenue",0.8,"Attenzione: l'ANAC non si limita a raccomandare. Puo' ordinare la pubblicazione con un termine, e il mancato rispetto dell'ordine e' illecito disciplinare."),
 (4,"profondo",1.2,"Un ordine, trenta giorni, un illecito se si ignora."),

 (5,"chiaro",0.5,"L'articolo 46 descrive le conseguenze generali. L'inadempimento degli obblighi di pubblicazione e il rifiuto illegittimo dell'accesso civico hanno tre effetti."),
 (5,"chiaro",0,"Primo: sono elemento di valutazione della responsabilita' dirigenziale. Secondo: possono causare responsabilita' per danno all'immagine dell'amministrazione."),
 (5,"chiaro",0,"Il danno all'immagine si fa valere davanti alla Corte dei conti: oltre al disservizio, l'amministrazione perde credibilita' agli occhi dei cittadini."),
 (5,"chiaro",0,"Terzo: sono comunque valutati ai fini della retribuzione di risultato e del trattamento accessorio collegato alla performance individuale dei responsabili."),
 (5,"chiaro",0,"Chi e' chiamato a rispondere non e' responsabile se prova che l'inadempimento e' dipeso da una causa a lui non imputabile."),
 (5,"chiaro",0,"Ci sono poi conseguenze sugli atti. Gli incarichi di consulenza non pubblicati non acquistano efficacia e i compensi non si possono pagare; chi li paga risponde in via disciplinare."),
 (5,"chiaro",0,"Le sovvenzioni sopra i mille euro non producono effetti senza pubblicazione. E se mancano i dati sugli enti e le societa' controllate, e' vietato versare somme a loro favore."),
 (5,"chiaro",0.6,"Un esempio: un'azienda sanitaria affida una consulenza e non la pubblica. L'incarico non e' efficace, il compenso resta bloccato e il dirigente che paga comunque ne risponde."),
 (5,"tenue",0.8,"Un distrattore frequente: l'inadempimento non resta senza effetti se nessuno lo contesta. Pesa sulla valutazione e, in certi casi, blocca l'atto stesso."),
 (5,"profondo",1.2,"Responsabilita', risultato, efficacia degli atti."),

 (6,"chiaro",0.5,"E le sanzioni pecuniarie? Qui molte dispense sbagliano. L'articolo 47 non punisce con una multa qualsiasi mancata pubblicazione: riguarda casi precisi."),
 (6,"chiaro",0,"La sanzione va da cinquecento a diecimila euro per la mancata o incompleta comunicazione dei dati dell'articolo 14: situazione patrimoniale, partecipazioni in societa', compensi dei titolari di incarichi."),
 (6,"chiaro",0,"La stessa sanzione si applica al dirigente che non comunica gli emolumenti complessivi percepiti, e a chi non pubblica i dati sui pagamenti dell'amministrazione."),
 (6,"chiaro",0,"E ancora per gli obblighi sugli enti e le societa' controllate dell'articolo 22, e per gli amministratori che non comunicano i propri incarichi e compensi."),
 (6,"chiaro",0.6,"Un esempio: il direttore generale che non comunica i compensi o le partecipazioni richieste dall'articolo 14 rischia la sanzione, e il provvedimento viene pubblicato sul sito."),
 (6,"chiaro",0,"Le sanzioni sono irrogate dall'ANAC, secondo la legge generale sulle sanzioni amministrative, e il provvedimento viene a sua volta pubblicato sul sito dell'amministrazione."),
 (6,"tenue",0.8,"Attenzione: la sanzione da cinquecento a diecimila euro non vale per ogni omessa pubblicazione. Per le altre ci sono responsabilita' dirigenziale, disciplinare e sulla performance."),
 (6,"profondo",1.2,"Sanzioni mirate, responsabilita' diffuse."),

 (7,"chiaro",0.8,"Le tre cose che ti chiederanno. La prima: dentro l'amministrazione vigila l'RPCT, che controlla e segnala; i dirigenti garantiscono il flusso dei dati; l'OIV collega trasparenza e performance."),
 (7,"chiaro",0.8,"La seconda: da fuori vigila l'ANAC, che puo' ordinare di pubblicare entro trenta giorni; il mancato rispetto dell'ordine e' illecito disciplinare."),
 (7,"chiaro",0.8,"La terza: l'inadempimento pesa sulla responsabilita' dirigenziale e sulla retribuzione di risultato; la sanzione da cinquecento a diecimila euro riguarda soprattutto i dati dell'articolo 14 e degli enti controllati."),
 (7,"tenue",0.8,"L'ultimo distrattore: nelle aziende sanitarie la trasparenza non e' affare del solo ufficio informatico. Ogni ufficio che produce dati ne e' responsabile."),

 (8,"profondo",0,"[warm] In sintesi: chi controlla dentro, chi vigila fuori, conseguenze reali per chi non adempie. Si chiude il modulo sulla trasparenza. Nel prossimo: il trattamento dei dati personali."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: "Dentro l'amministrazione", 4: 'Il controllo esterno', 5: "Le responsabilita'", 6: 'Le sanzioni', 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
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
