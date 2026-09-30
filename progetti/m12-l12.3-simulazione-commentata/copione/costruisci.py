# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 12.3 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M12): simulazione commentata, trenta domande sulle undici materie, risposta per risposta.
# Domande e risposte costruite sui contenuti gia' verificati dei moduli 1-11 (vedi i REGISTRO). Le
# quattro opzioni stanno sulle slide; la voce legge domanda, lettera giusta e il perche'.
BLOCCHI = [
 (1,"chiaro",0.8,"[serious] Trenta domande, dalle undici materie del corso. Per ognuna vedi le quattro risposte sullo schermo. Se vuoi metterti alla prova, ferma il video e scegli, prima di sentire la soluzione."),
 (1,"chiaro",0,"Per ogni domanda diro' la lettera giusta e il perche' in una frase. Il perche' conta piu' della lettera: e' quello che ti fa riconoscere la stessa trappola in una domanda diversa."),
 (1,"profondo",1.2,"Non conta indovinare: conta sapere perche'."),

 (2,"chiaro",0.6,"Quattro serie. Sanita' nazionale e Veneto. Azienda, procedimento e trasparenza. Privacy, lavoro pubblico e sicurezza. Infine sicurezza, appalti e contabilita'."),

 (3,"chiaro",0.5,"Domanda uno. Quale legge istituisce le unita' sanitarie locali? Risposta B: la legge 833 del 1978. Il decreto 502 del 1992 le trasformera' in aziende, con personalita' giuridica pubblica."),
 (3,"chiaro",0.3,"Domanda due. Chi nomina il direttore amministrativo di un'azienda sanitaria? Risposta C: il direttore generale. La Regione nomina il direttore generale; e' lui a scegliere il direttore amministrativo e quello sanitario."),
 (3,"chiaro",0.3,"Domanda tre. Che cosa da' diritto a essere pagati dal servizio sanitario? Risposta C: l'accordo contrattuale, entro volumi e tetti di spesa. L'accreditamento da solo non obbliga a remunerare le prestazioni."),
 (3,"chiaro",0.3,"Domanda quattro. Di quando sono i LEA vigenti? Risposta A: del 12 gennaio 2017. Il 2001 e' l'anno del primo elenco, oggi superato, e il 1999 quello del decreto che li introduce."),
 (3,"chiaro",0.3,"Domanda cinque. Da quando le ULSS del Veneto sono nove? Risposta D: dal primo gennaio 2017. La legge regionale 19 e' dell'ottobre 2016, ma il nuovo assetto parte dopo."),
 (3,"chiaro",0.3,"Domanda sei. Chi approva il Piano di Zona? Risposta C: il Comitato dei Sindaci del distretto. Non la Regione e non il direttore generale: il Piano di Zona e' lo strumento dei Comuni per i servizi sociali."),
 (3,"chiaro",0.3,"Domanda sette. Che cos'e' la centrale operativa territoriale? Risposta A: la centrale della continuita' delle cure, che governa le transizioni. Non e' il 118, che gestisce l'emergenza."),
 (3,"chiaro",0.3,"Domanda otto. Di che cosa si occupa la legge regionale 56 del 1994? Risposta B: del riordino del servizio sanitario regionale. Programmazione, contabilita' e controlli sono della 55, sua gemella."),
 (3,"profondo",1.2,"Otto domande, e dietro ogni risposta sbagliata una trappola precisa."),

 (4,"chiaro",0.5,"Domanda nove. Chi nomina il direttore generale di un'azienda ospedaliero universitaria? Risposta D: la Regione, d'intesa con il Rettore. Nessuno dei due da solo."),
 (4,"chiaro",0.3,"Domanda dieci. Chi adotta l'atto aziendale? Risposta B: il direttore generale, sui criteri della Regione, che poi lo approva. Non e' una legge regionale."),
 (4,"chiaro",0.3,"Domanda undici. Che cos'e' una unita' operativa semplice? Risposta A: una struttura dentro una complessa, senza budget autonomo. E' la UOSD a rispondere al dipartimento."),
 (4,"chiaro",0.3,"Domanda dodici. Qual e' il termine generale del procedimento, se nessuna norma ne fissa un altro? Risposta B: trenta giorni. Si puo' arrivare a novanta, e in casi particolari a centottanta, ma serve una norma che lo preveda."),
 (4,"chiaro",0.3,"Domanda tredici. Quando vale il silenzio assenso? Risposta D: nei procedimenti a istanza di parte, salvo le materie escluse come la salute. Non e' la regola generale."),
 (4,"chiaro",0.3,"Domanda quattordici. Che cosa serve per l'accesso documentale? Risposta A: un interesse diretto, concreto e attuale, collegato al documento. E la richiesta va motivata."),
 (4,"chiaro",0.3,"Domanda quindici. Per quanto restano pubblicati i dati in Amministrazione trasparente? Risposta C: di regola cinque anni, dal primo gennaio successivo."),
 (4,"chiaro",0.3,"Domanda sedici. Chi puo' chiedere l'accesso civico generalizzato? Risposta B: chiunque, senza motivazione, anche su dati e documenti che non sono da pubblicare. E' il FOIA italiano, dal 2016."),
 (4,"profondo",1.2,"Chi chiede, perche' chiede, entro quando si risponde."),

 (5,"chiaro",0.5,"Domanda diciassette. Da quando si applica il regolamento europeo sulla protezione dei dati? Risposta D: dal 25 maggio 2018. In vigore lo era dal 2016: e' la trappola della lezione precedente."),
 (5,"chiaro",0.3,"Domanda diciotto. Su quale base un'azienda sanitaria pubblica tratta i dati per curare? Risposta C: la finalita' di cura, con il segreto professionale. Non sul consenso."),
 (5,"chiaro",0.3,"Domanda diciannove. Entro quando si notifica al Garante una violazione dei dati? Risposta A: entro settantadue ore da quando il titolare ne e' venuto a conoscenza, fine settimana compreso."),
 (5,"chiaro",0.3,"Domanda venti. A quale giudice vanno le liti sul rapporto di lavoro pubblico? Risposta B: al giudice ordinario. Al giudice amministrativo restano le liti sui concorsi per l'assunzione."),
 (5,"chiaro",0.3,"Domanda ventuno. Quanto dura un incarico dirigenziale? Risposta C: da tre a cinque anni. La forbice da due a sette anni era la regola di fine anni Novanta."),
 (5,"chiaro",0.3,"Domanda ventidue. Chi decide il rimprovero verbale? Risposta D: il responsabile della struttura. Le sanzioni piu' gravi spettano all'ufficio per i procedimenti disciplinari."),
 (5,"chiaro",0.3,"Domanda ventitre'. Chi sceglie il rappresentante dei lavoratori per la sicurezza? Risposta A: i lavoratori, che lo eleggono o lo designano, di norma tra le rappresentanze sindacali. Non il datore di lavoro."),
 (5,"profondo",1.2,"Chi decide, chi nomina, chi risponde: sempre la stessa domanda."),

 (6,"chiaro",0.5,"Domanda ventiquattro. Che posto hanno i dispositivi di protezione individuale tra le misure di tutela? Risposta B: l'ultimo. Vengono dopo l'eliminazione del rischio e la protezione collettiva."),
 (6,"chiaro",0.3,"Domanda venticinque. Dove si ricorre contro il giudizio del medico competente? Risposta C: all'organo di vigilanza, entro trenta giorni. Non al datore di lavoro."),
 (6,"chiaro",0.3,"Domanda ventisei. Qual e' il criterio ordinario di aggiudicazione negli appalti? Risposta A: l'offerta economicamente piu' vantaggiosa. Il minor prezzo e' l'eccezione, per le prestazioni standardizzate."),
 (6,"chiaro",0.3,"Domanda ventisette. Che cosa si puo' prestare con l'avvalimento? Risposta D: i requisiti speciali. I requisiti generali, come l'onorabilita', non si prestano, e l'impresa ausiliaria risponde in solido."),
 (6,"chiaro",0.3,"Domanda ventotto. Entro quanto pagano i fornitori le aziende sanitarie? Risposta B: sessanta giorni. Trenta e' il termine ordinario per le altre amministrazioni."),
 (6,"chiaro",0.3,"Domanda ventinove. Quanti sono i principi contabili generali del decreto 118? Risposta C: diciotto. Alcune dispense ne contano diciassette, e dimenticano la prevalenza della sostanza sulla forma."),
 (6,"chiaro",0.3,"Domanda trenta. Entro quando la Giunta approva il consolidato del servizio sanitario regionale? Risposta A: il 30 giugno. Il 30 aprile le aziende adottano i propri bilanci, il 31 maggio la Giunta li approva."),
 (6,"profondo",1.2,"Trenta domande, e le trappole sono sempre le stesse."),

 (7,"chiaro",0.8,"Le tre cose da portare alla prova. La prima: quasi un terzo di queste domande chiedeva chi fa che cosa. Nomine, approvazioni, controlli: ripassali per soggetto."),
 (7,"chiaro",0.8,"La seconda: molte altre chiedevano date e termini. Trenta giorni, sessanta giorni, settantadue ore, il 30 giugno. Sono i numeri della lezione precedente."),
 (7,"chiaro",0.8,"La terza: se una risposta ti ha sorpreso, torna alla lezione da cui viene. Ogni domanda di oggi ha la sua spiegazione piu' ampia in una lezione del corso."),
 (7,"tenue",0.8,"L'ultimo distrattore: una simulazione andata bene non vuol dire che il ripasso sia finito. Ripeti le domande sbagliate tra qualche giorno, e controlla di ricordare il perche'."),

 (8,"profondo",0,"[warm] In sintesi: trenta domande, e un metodo per le prossime. Nell'ultima lezione del corso: le ultime quarantotto ore prima della prova."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: "Sanita' nazionale e Veneto", 4: 'Azienda, procedimento, trasparenza', 5: 'Privacy, lavoro pubblico, sicurezza', 6: "Sicurezza, appalti, contabilita'", 7: 'Le tre cose da portare alla prova', 8: 'Chiusura'}
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
