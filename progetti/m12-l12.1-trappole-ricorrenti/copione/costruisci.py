# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 12.1 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M12): le trappole ricorrenti dei quiz normativi. Date vicine, numeri di legge simili,
# parole assolute, competenze scambiate tra organi. Tutti gli esempi vengono dai distrattori gia'
# verificati nelle lezioni dei moduli 1-11 (vedi i rispettivi REGISTRO per le fonti e i punti da
# verificare). Nessun bando AOUPD disponibile: niente riferimenti al formato della prova.
BLOCCHI = [
 (1,"chiaro",0.8,"[serious] Una domanda da quiz: il regolamento europeo sulla protezione dei dati e' entrato in vigore il 25 maggio 2018. Vero o falso? Molti rispondono vero. Ed e' falso."),
 (1,"chiaro",0,"Il regolamento entra in vigore nel 2016, e dal 25 maggio 2018 si applica. Chi ha studiato lo sa, ma sotto tempo una data giusta al posto sbagliato inganna. E le trappole dei quiz si ripetono."),
 (1,"profondo",1.2,"Chi conosce la forma della trappola, non ci cade."),

 (2,"chiaro",0.6,"Quattro trappole. Le date vicine. I numeri simili. Le parole assolute, come sempre e mai. E le competenze scambiate tra organi: chi nomina, chi approva, chi decide."),

 (3,"chiaro",0.5,"La prima trappola usa due date vere, ma le scambia. Succede quando una norma ha piu' momenti: approvazione, entrata in vigore, applicazione. Il quiz ne prende uno e lo attacca all'altro."),
 (3,"chiaro",0,"Il codice dei contratti pubblici, decreto 36 del 2023, entra in vigore il primo aprile e si applica dal primo luglio. Due date dello stesso anno, a tre mesi di distanza: il terreno ideale per un distrattore."),
 (3,"chiaro",0,"Nei bilanci succede lo stesso. Il preventivo si approva entro il 31 dicembre dell'anno prima; il bilancio d'esercizio si adotta entro il 30 aprile dell'anno dopo. Il consolidato regionale, entro il 30 giugno."),
 (3,"chiaro",0,"Poi ci sono le sequenze. Il Trattato di Maastricht a febbraio del 1992, la legge delega 421 a ottobre, il decreto 502 a dicembre. Il quiz inverte l'ordine, e mette il decreto prima della delega."),
 (3,"chiaro",0,"E ci sono gli anni che si confondono. La legge regionale 19 e' dell'ottobre 2016, ma le nove ULSS partono dal primo gennaio 2017. Il modello hub and spoke nasce con il Piano del 2012, non con quello del 2019."),
 (3,"chiaro",0,"Il metodo e' semplice: per ogni data chiediti che cosa succede. Una norma nasce, entra in vigore, si applica. Se la domanda usa un verbo e la data appartiene a un altro, la risposta e' sbagliata."),
 (3,"chiaro",0.6,"Un esempio: il codice della privacy e' del 2003, entra in vigore nel 2004, e non e' stato abrogato dal regolamento europeo. Tre fatti e tre trappole possibili, in una sola domanda."),
 (3,"tenue",0.8,"Attenzione: la trappola delle date non si vince imparando piu' date. Si vince legando ogni data al suo verbo, e ai due o tre fatti che la circondano."),
 (3,"profondo",1.2,"Ogni data ha un verbo: nasce, entra in vigore, si applica."),

 (4,"chiaro",0.5,"La seconda trappola sono i numeri che si somigliano. Leggi con lo stesso numero e anni diversi, numeri vicini e materie lontane. Il quiz ne cambia uno solo, e la frase sembra ancora giusta."),
 (4,"chiaro",0,"Il caso piu' insidioso e' il 517. Il decreto 517 del 1993 corregge il 502. Il decreto 517 del 1999 disciplina le aziende ospedaliero universitarie. Stesso numero, sei anni di distanza, due materie."),
 (4,"chiaro",0,"Nel Veneto c'e' la 55. La legge regionale 55 del 1982 non e' la 55 del 1994. E tra le leggi gemelle del 1994, la 55 regola programmazione e conti, la 56 il riordino. Invertirle e' l'errore classico."),
 (4,"chiaro",0,"Nella privacy ci sono la legge 675 del 1996, il codice del 2003 e il regolamento europeo 679 del 2016. Il 675 e il 679 si somigliano, ma tra l'uno e l'altro ci sono vent'anni e un cambio di sistema."),
 (4,"chiaro",0,"Nel lavoro pubblico, il decreto 29 del 1993 avvia la privatizzazione e il 165 del 2001 la riordina. Nella sicurezza, il 626 del 1994 anticipa l'81 del 2008, che oggi e' il riferimento."),
 (4,"chiaro",0,"Negli appalti le cause di esclusione non stanno piu' all'articolo 80, che era del codice del 2016: oggi stanno agli articoli 94 e seguenti. Nella contabilita', la legge 42 del 2009 delega e il decreto 118 del 2011 attua."),
 (4,"chiaro",0.6,"Un esempio: un quiz chiede quale norma disciplina le aziende ospedaliero universitarie, e offre il decreto 517 del 1993. Il numero e' giusto, l'anno no. Basta quello per sbagliare."),
 (4,"tenue",0.8,"Occhio: il numero da solo non basta mai. Una legge si ricorda con tre elementi insieme, numero, anno e materia. Se uno dei tre non torna, il quiz ti sta tendendo una trappola."),
 (4,"profondo",1.2,"Numero, anno e materia: sempre tutti e tre."),

 (5,"chiaro",0.5,"La terza trappola sono le parole assolute: sempre, mai, solo, tutti, nessuno. Nel diritto le regole hanno quasi sempre eccezioni, e la parola assoluta le cancella."),
 (5,"chiaro",0,"Il silenzio assenso non e' la regola generale: vale nei procedimenti a istanza di parte, e non per la salute. E il consenso non e' l'unica base per trattare i dati: e' una su sei."),
 (5,"chiaro",0,"L'accesso documentale non spetta a chiunque: serve un interesse diretto, concreto e attuale. L'accesso civico, al contrario, spetta davvero a chiunque, e senza motivazione."),
 (5,"chiaro",0,"Il diritto all'oblio non e' assoluto: cede davanti alla conservazione della cartella clinica. E i dispositivi di protezione individuale non sono la prima misura: sono l'ultima barriera."),
 (5,"chiaro",0,"Ma attenzione a non generalizzare: a volte l'assoluto e' giusto. Un contratto a termine irregolare non diventa mai un posto fisso nella pubblica amministrazione. Qui il mai e' corretto."),
 (5,"chiaro",0,"E nella sicurezza gli unici esclusi dalla nozione di lavoratore sono gli addetti ai servizi domestici e familiari. Quando e' la legge a usare l'assoluto, il quiz lo riprende fedelmente."),
 (5,"chiaro",0.6,"Un esempio: la sanzione da cinquecento a diecimila euro vale per ogni omessa pubblicazione? No, riguarda soprattutto i dati dell'articolo 14. E' il per ogni a rendere falsa la frase."),
 (5,"tenue",0.8,"Attenzione: la parola assoluta non prova che la risposta sia sbagliata. E' un segnale per rileggere. Chiediti se conosci un'eccezione: se la conosci, la frase e' falsa."),
 (5,"profondo",1.2,"Davanti a sempre e mai, cerca l'eccezione."),

 (6,"chiaro",0.5,"La quarta trappola scambia i soggetti. La frase descrive un atto vero, ma lo attribuisce a chi non lo compie. Nomina, approva, adotta, presiede: ogni verbo ha il suo titolare."),
 (6,"chiaro",0,"La Regione nomina il direttore generale. Il direttore generale nomina il direttore amministrativo e il direttore sanitario. Nell'azienda ospedaliero universitaria la Regione nomina d'intesa con il Rettore."),
 (6,"chiaro",0,"Il direttore generale adotta il bilancio d'esercizio; alla Regione spetta il controllo. Il Piano di Zona lo approva il Comitato dei Sindaci del distretto, non la Regione e non il direttore generale."),
 (6,"chiaro",0,"Il consiglio dei sanitari lo presiede il direttore sanitario, il collegio di direzione il direttore generale. Il Comitato dei direttori generali lo presiede il direttore dell'Area Sanita' e Sociale."),
 (6,"chiaro",0,"Nella sicurezza il rappresentante dei lavoratori e' eletto o designato dai lavoratori, non nominato dal datore. Nella privacy la violazione la notifica il titolare, non il responsabile della protezione dei dati."),
 (6,"chiaro",0,"Nel pubblico impiego l'OIV valida la relazione sulla performance, non il piano. E il rimprovero verbale lo decide il responsabile della struttura, non l'ufficio per i procedimenti disciplinari."),
 (6,"chiaro",0.6,"Un esempio: chi nomina il direttore generale di Azienda Zero? Non la Giunta nel suo insieme, e non il Consiglio regionale: lo nomina il Presidente della Giunta regionale."),
 (6,"tenue",0.8,"Occhio a un trucco frequente: il soggetto sbagliato e' quasi sempre vicino a quello giusto. Regione e Giunta, direttore generale e direttore sanitario. Il quiz non inventa: sposta."),
 (6,"profondo",1.2,"Ogni verbo ha il suo titolare: chi nomina, chi approva, chi controlla."),

 (7,"chiaro",0.8,"Le tre cose da portare alla prova. La prima: ogni data ha un verbo. Nascita, entrata in vigore, applicazione e scadenza non sono la stessa cosa."),
 (7,"chiaro",0.8,"La seconda: una legge si riconosce da tre elementi insieme, numero, anno e materia. Se il quiz ne cambia uno solo, la risposta e' sbagliata."),
 (7,"chiaro",0.8,"La terza: davanti a una parola assoluta cerca l'eccezione, e davanti a un atto chiediti chi ne e' il titolare."),
 (7,"tenue",0.8,"L'ultimo distrattore: non c'e' una regola per cui la risposta piu' lunga, o sempre la stessa lettera, sia quella giusta. Nei quiz ben fatti l'unica strategia che regge e' conoscere la materia."),

 (8,"profondo",0,"[warm] In sintesi: le trappole si ripetono, e chi le riconosce guadagna punti. Nella prossima lezione: le sessanta date e numeri da mandare a memoria."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: 'Le date vicine', 4: 'I numeri simili', 5: 'Le parole assolute', 6: 'Le competenze scambiate', 7: 'Le tre cose da portare alla prova', 8: 'Chiusura'}
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
