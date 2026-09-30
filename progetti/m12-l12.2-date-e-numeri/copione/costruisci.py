# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 12.2 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M12): le sessanta date e numeri da mandare a memoria, in quattro gruppi. Ogni voce viene
# dalle «tre cose» e dai distrattori delle lezioni dei moduli 1-11; le fonti e i punti da verificare
# sono nei rispettivi REGISTRO. Soglie degli appalti e termini da confermare sul testo vigente.
BLOCCHI = [
 (1,"chiaro",0.8,"[serious] In una prova a quiz molte domande chiedono una data, un numero, un termine. Sono le domande che si sbagliano per un soffio, e che si possono preparare con certezza."),
 (1,"chiaro",0,"In tutto il corso ne sono passate centinaia. Qui ne restano sessanta: quelle che tornano piu' spesso nei quiz e che reggono tutte le altre. Non vanno capite di nuovo: vanno ripassate, fino a saperle a memoria."),
 (1,"profondo",1.2,"Sessanta numeri, e ognuno con la sua storia."),

 (2,"chiaro",0.6,"Quattro gruppi. La sanita' nazionale. Il Veneto e l'azienda. Procedimento, trasparenza e privacy. E infine lavoro pubblico, sicurezza, appalti e contabilita'."),

 (3,"chiaro",0.5,"Uno: la legge 833 del 1978, che istituisce il servizio sanitario nazionale. Due: febbraio 1992, il Trattato di Maastricht. Tre: la legge delega 421 del 1992."),
 (3,"chiaro",0,"Quattro: il decreto 502 del dicembre 1992, che crea le aziende sanitarie. Cinque: il decreto 517 del 1993, che lo corregge. Sei: il decreto 229 del 1999, la riforma che introduce i LEA."),
 (3,"chiaro",0,"Sette: da tre a cinque anni, il contratto del direttore generale. Otto: il 2001, anno del primo elenco dei LEA e della riforma del Titolo quinto della Costituzione."),
 (3,"chiaro",0,"Nove: il 12 gennaio 2017, data dei LEA vigenti. Dieci: tre macroaree, cioe' prevenzione, assistenza distrettuale e assistenza ospedaliera."),
 (3,"chiaro",0,"Undici: il decreto 68 del 2011, che introduce i costi standard nel riparto. Dodici: tre organi dell'azienda, cioe' direttore generale, collegio di direzione e collegio sindacale."),
 (3,"chiaro",0.6,"Un modo per ricordarle: raccontale come una storia. Nel 1978 nasce il servizio, nel 1992 diventa azienda, nel 1999 si completa, e dal 2001 la Costituzione lo divide tra Stato e Regioni."),
 (3,"tenue",0.8,"Attenzione: il decreto 517 compare due volte in questo corso. Quello del 1993 corregge il 502; quello del 1999 disciplina le aziende ospedaliero universitarie."),
 (3,"profondo",1.2,"Settantotto, novantadue, novantanove: la sanita' in tre anni."),

 (4,"chiaro",0.5,"Tredici: il 14 settembre 1994, le leggi regionali 55 e 56. Quattordici: la legge regionale 19 del 25 ottobre 2016, che istituisce Azienda Zero."),
 (4,"chiaro",0,"Quindici: il primo gennaio 2017, quando le ULSS passano da ventuno a nove. Sedici: il 30 settembre, entro cui la Giunta riferisce ogni anno al Consiglio regionale."),
 (4,"chiaro",0,"Diciassette: il 31 dicembre, per il bilancio preventivo dell'anno dopo. Diciotto: il 30 aprile, per il bilancio d'esercizio dell'anno appena chiuso."),
 (4,"chiaro",0,"Diciannove: cinque hub, con un bacino di circa un milione di abitanti ciascuno. Venti: quattro reti tempo dipendenti, cioe' emergenza, cardiologia, trauma e ictus."),
 (4,"chiaro",0,"Ventuno: da quattro a sei settimane, la degenza di norma nelle cure intermedie. Ventidue: la delibera 1306 del 2017, sull'atto aziendale nel Veneto."),
 (4,"chiaro",0,"Ventitre': il decreto 171 del 2016, con l'elenco nazionale dei direttori generali, verificati entro ventiquattro mesi. Ventiquattro: il decreto 517 del 1999, sulle aziende ospedaliero universitarie."),
 (4,"chiaro",0.6,"Un modo per ricordarle: il 1994 fonda il modello veneto, il 2016 lo riorganizza, il 2017 lo rende operativo. E i bilanci corrono tra due date, 31 dicembre e 30 aprile."),
 (4,"profondo",1.2,"Novantaquattro fonda, duemilasedici riorganizza."),

 (5,"chiaro",0.5,"Venticinque: la legge 241 del 7 agosto 1990. Ventisei: trenta giorni, il termine generale del procedimento, fino a novanta e in casi particolari fino a centottanta."),
 (5,"chiaro",0,"Ventisette: una sola sospensione, per non piu' di trenta giorni. Ventotto: dieci giorni per le osservazioni dopo il preavviso di rigetto."),
 (5,"chiaro",0,"Ventinove: un anno dalla scadenza del termine, per ricorrere contro il silenzio. Trenta: nell'accesso documentale, dieci giorni per l'opposizione e trenta per concludere."),
 (5,"chiaro",0,"Trentuno: la legge 190 del 2012, anticorruzione. Trentadue: il decreto 33 del 2013, sulla trasparenza. Trentatre': il decreto 97 del 2016, che introduce l'accesso civico generalizzato."),
 (5,"chiaro",0,"Trentaquattro: cinque anni di pubblicazione, dal primo gennaio successivo. Trentacinque: venti giorni per il riesame del responsabile della trasparenza."),
 (5,"chiaro",0,"Trentasei: da cinquecento a diecimila euro, la sanzione per alcuni obblighi di pubblicazione. Trentasette: la legge 675 del 31 dicembre 1996, la prima sulla privacy."),
 (5,"chiaro",0,"Trentotto: il codice della privacy del 2003, in vigore dal 2004. Trentanove: il regolamento europeo del 27 aprile 2016, che si applica dal 25 maggio 2018."),
 (5,"chiaro",0,"Quaranta: settantadue ore per notificare una violazione dei dati. Quarantuno: un mese per rispondere ai diritti dell'interessato, prorogabile di due."),
 (5,"chiaro",0,"Quarantadue: le sanzioni del regolamento, fino a dieci milioni o il due per cento, e fino a venti milioni o il quattro per cento del fatturato."),
 (5,"tenue",0.8,"Attenzione a due termini gemelli: dieci giorni ai controinteressati per opporsi valgono sia nell'accesso documentale sia nel FOIA. Ma solo il primo richiede una motivazione."),
 (5,"profondo",1.2,"Trenta giorni per decidere, settantadue ore per avvisare."),

 (6,"chiaro",0.5,"Quarantatre': il decreto 29 del 1993, che avvia la privatizzazione del lavoro pubblico. Quarantaquattro: il decreto 165 del 2001, che la riordina."),
 (6,"chiaro",0,"Quarantacinque: da tre a cinque anni, l'incarico dirigenziale. Quarantasei: nel procedimento disciplinare, trenta giorni per contestare, venti di preavviso, centoventi per concludere."),
 (6,"chiaro",0,"Quarantasette: sei mesi, la sospensione massima dal servizio. Quarantotto: il piano della performance entro il 31 gennaio, la relazione entro il 30 giugno."),
 (6,"chiaro",0,"Quarantanove: il decreto 81 del 9 aprile 2008, sulla sicurezza. Cinquanta: la direttiva quadro europea del 1989, recepita dal decreto 626 del 1994."),
 (6,"chiaro",0,"Cinquantuno: trenta giorni, per rielaborare la valutazione dei rischi e per ricorrere contro il giudizio del medico competente. Cinquantadue: oltre quindici lavoratori, la riunione periodica annuale."),
 (6,"chiaro",0,"Cinquantatre': il codice dei contratti, decreto 36 del 2023, in vigore dal primo aprile e applicato dal primo luglio. Cinquantaquattro: centoquarantamila euro, sotto cui si affida direttamente."),
 (6,"chiaro",0,"Cinquantacinque: almeno cinque operatori invitati nella procedura negoziata. Cinquantasei: trenta punti al massimo al prezzo, quando il criterio e' l'offerta economicamente piu' vantaggiosa."),
 (6,"chiaro",0,"Cinquantasette: sessanta giorni, il termine di pagamento per le aziende sanitarie. Cinquantotto: la legge 42 del 2009 e il decreto 118 del 2011, sull'armonizzazione dei bilanci."),
 (6,"chiaro",0,"Cinquantanove: diciotto principi contabili generali. Sessanta: il 30 giugno, entro cui la Giunta approva il bilancio consolidato del servizio sanitario regionale."),
 (6,"tenue",0.8,"Occhio: i centoquarantamila euro valgono per servizi e forniture. Per i lavori l'affidamento diretto arriva a centocinquantamila, e le soglie europee cambiano ogni due anni."),
 (6,"profondo",1.2,"Trenta, sessanta, centoventi: i giorni che contano."),

 (7,"chiaro",0.8,"Le tre cose da portare alla prova. La prima: ogni data si ricorda con il suo fatto. Il 1978 e' la nascita del servizio, il 1992 le aziende, il 2016 Azienda Zero e il regolamento europeo."),
 (7,"chiaro",0.8,"La seconda: i termini tornano. Trenta giorni ricorrono nel procedimento, nell'accesso, nel disciplinare e nella sicurezza; il 30 aprile e il 31 dicembre in ogni bilancio."),
 (7,"chiaro",0.8,"La terza: le soglie e i termini degli appalti cambiano nel tempo. Prima della prova, controlla le cifre vigenti sul bando e sui testi aggiornati."),
 (7,"tenue",0.8,"L'ultimo distrattore: il GDPR non e' del 2018. E' del 2016; dal 2018 si applica. E' la data che piu' spesso finisce nel posto sbagliato."),

 (8,"profondo",0,"[warm] In sintesi: sessanta numeri, legati ai loro fatti. Nella prossima lezione: una simulazione commentata, trenta domande sulle undici materie."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: "La sanita' nazionale", 4: "Il Veneto e l'azienda", 5: 'Procedimento, trasparenza, privacy', 6: 'Lavoro, sicurezza, appalti, conti', 7: 'Le tre cose da portare alla prova', 8: 'Chiusura'}
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
