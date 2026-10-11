# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Riscrittura del copione in origine/copione-di-partenza.md. Le 13 scene di
# partenza stanno a ~570 caratteri l'una: mezzo minuto a inquadratura, contro
# un tetto di 225. La struttura e l'ordine restano; cambia il taglio.
#
# Il copione di partenza misurava 6.140 caratteri, cioe' 6:14 montati, sotto i
# 7:50 che il suo stesso documento si da'. Le aggiunte sono segnate qui sotto
# con AGG e sono il "come", non riempitivo: una conseguenza, un osservabile
# concreto, un orientamento all'esame, un rimando interno al modulo. Nessun
# fatto clinico nuovo: quelli non li posso verificare e non li invento.
#
# Le pose. Una posa chiude un blocco e precede il successivo. Qui ogni cambio
# di capitolo ne porta una di 1,2 s: le 13 scene di partenza sono 13 argomenti
# distinti, e il passaggio da uno all'altro va sentito. La prima stesura la
# metteva solo su 3 dei 12 cambi, e gli altri 9 passavano di netto su una
# frase conclusiva. Le pose in mezzo a un capitolo (s12, s34, s39) sono
# un'altra cosa: un battito dopo un'affermazione che va lasciata cadere.
#
# Registro del modulo: sobrio e descrittivo, nessuna drammatizzazione dei
# sintomi. E la regola di lingua del modulo 16: "persona con disturbo
# psichico", mai un sostantivo che identifichi la persona con la diagnosi.
BLOCCHI = [
 (1,"chiaro",0,"[warm] Bentornata e bentornato. In questa lezione vediamo i principali quadri del disagio psichico, e parto da un chiarimento che vale per tutta la lezione: l'OSS non diagnostica e non interpreta."),
 (1,"chiaro",0,"Questo materiale non serve a riconoscere una malattia. Serve a sapere che cosa guardare, e con quali parole riferirlo."),
 # AGG: perche' quella distinzione regge tutto il resto della lezione.
 (1,"chiaro",1.2,"E' una distinzione che regge tutto il resto: quello che segue non ti rende capace di dire che cosa ha una persona, ti rende capace di dire che cosa hai visto, in modo che qualcun altro possa deciderlo."),

 (2,"chiaro",0,"La regola che attraversa tutto il modulo: si descrivono fatti osservati, non interpretazioni. Invece di «e' aggressivo» si scrive: ha alzato la voce e battuto la mano sul tavolo alle quattordici e trenta."),
 (2,"chiaro",0,"Invece di «e' depresso»: non si e' alzato dal letto, non ha assunto il pasto, non ha risposto alle sollecitazioni. Invece di «delira»: riferisce che il cibo e' avvelenato e rifiuta di mangiare."),
 (2,"chiaro",0,"La descrizione oggettiva e' utilizzabile da chi valuta, l'interpretazione no. Una descrizione precisa vale piu' di una diagnosi tentata."),
 # AGG: la conseguenza pratica, che e' la ragione per cui la regola tiene.
 (2,"profondo",1.2,"E c'e' una ragione pratica oltre a quella giusta: un'interpretazione non si puo' verificare, e nessuno puo' farci niente. Un fatto con l'ora accanto si confronta col turno prima, e diventa un andamento."),

 (3,"chiaro",0,"I disturbi dell'umore. Nella depressione i segni osservabili sono l'umore depresso e la perdita di interesse e di piacere, che si chiama anedonia: e' un termine che i quiz chiedono."),
 (3,"chiaro",0,"Poi il rallentamento, i disturbi del sonno e dell'appetito, l'affaticabilita', la svalutazione di se' e la trascuratezza della cura di se'."),
 (3,"chiaro",1.2,"Sono tutti elementi che l'OSS vede prima di chiunque altro: l'assunzione dei pasti, il ritmo sonno veglia, la cura di se' e l'isolamento. Quattro cose che si osservano facendo il proprio lavoro."),

 (4,"profondo",1.2,"[serious] Un punto che merita una scena a se'. Ogni riferimento a mancanza di speranza, o al non voler piu' andare avanti, va sempre riferito tempestivamente al professionista."),
 (4,"profondo",1.2,"Senza minimizzare, e senza rimandare a fine turno. Non spetta a te valutare quanto sia serio: spetta a te far si' che qualcuno lo valuti, e subito."),

 (5,"chiaro",0,"La mania. I segni sono umore elevato, oppure irritabile, e questo e' meno noto; ridotto bisogno di sonno, logorrea, agitazione e iperattivita'."),
 (5,"chiaro",0,"Poi grandiosita', disinibizione e comportamenti a rischio. Il disturbo bipolare e' l'alternanza di fasi depressive e fasi maniacali, con periodi di benessere in mezzo."),
 (5,"chiaro",0,"Un'avvertenza: nella fase maniacale la persona puo' non percepire di stare male. L'apparente euforia non e' benessere, e i comportamenti a rischio sono parte del quadro, non un capriccio."),
 # AGG: l'osservabile concreto che rende la fase maniacale riferibile.
 (5,"tenue",1.2,"Ed e' il motivo per cui una fase maniacale si sottovaluta: una persona che dorme due ore e si alza piena di progetti non sembra una persona che sta male. Il segno da riferire e' proprio il sonno che non serve piu'."),

 (6,"chiaro",0,"I disturbi psicotici: qui si altera il rapporto con la realta'. I due sintomi che i quiz chiedono piu' spesso vanno tenuti distinti."),
 (6,"chiaro",0,"Il delirio e' un'idea, una convinzione: falsa, e non modificabile con la persuasione. I contenuti tipici sono persecuzione, rovina, gelosia, grandezza."),
 (6,"profondo",1.2,"L'allucinazione invece e' una percezione senza stimolo esterno reale, e le voci sono le piu' frequenti. Il modo piu' rapido per non confonderli: il delirio si pensa, l'allucinazione si percepisce."),

 (7,"chiaro",0,"Ci sono poi il ritiro sociale, l'appiattimento affettivo e la riduzione dell'iniziativa: si chiamano sintomi negativi, e sono spesso i piu' invalidanti e i meno riconosciuti, perche' non fanno rumore."),
 (7,"chiaro",0,"E la domanda pratica piu' frequente: come ci si comporta davanti a un delirio. Non si conferma e non si contraddice. Non si discute il contenuto."),
 (7,"chiaro",0,"Si resta sul piano della relazione e del vissuto. Contraddire alimenta il conflitto, assecondare rinforza il sintomo. La via e' la terza, e passa dall'emozione, non dal contenuto."),
 # AGG: la frase concreta, e il rimando interno al modulo.
 (7,"profondo",1.2,"In pratica suona cosi': io non lo vedo, ma capisco che per lei sia reale. Si valida il vissuto senza validare il contenuto, ed e' la stessa regola che torna nella lezione sedici punto tre."),

 (8,"chiaro",0,"I disturbi d'ansia. L'ansia generalizzata si manifesta con preoccupazione persistente, tensione e disturbi del sonno."),
 (8,"chiaro",0,"L'attacco di panico ha esordio improvviso, con palpitazioni, sudorazione, tremore, difficolta' respiratoria, dolore toracico, paura di morire o di perdere il controllo, e una durata limitata."),
 (8,"chiaro",0,"Le fobie sono paura intensa ed evitamento di situazioni specifiche. Il disturbo ossessivo compulsivo e' fatto di ossessioni, cioe' pensieri ricorrenti, e compulsioni, cioe' comportamenti ripetitivi."),
 # AGG: orientamento all'esame, ricavato dal testo e non aggiunto da fuori.
 (8,"tenue",1.2,"La differenza che i quiz usano di piu' sta nel tempo: l'ansia generalizzata e' persistente e dura mesi, l'attacco di panico e' improvviso e passa. Chi risponde guardando solo i sintomi fisici sbaglia."),

 (9,"chiaro",0,"Un'avvertenza sull'attacco di panico: i sintomi fisici sono intensi e assomigliano a un evento cardiaco o respiratorio. Non spetta all'OSS stabilire di che cosa si tratti: si attiva chi di competenza."),
 # AGG: perche' quella frase e' sbagliata in tutti e due i casi.
 (9,"tenue",0,"E non si liquida come «e' solo ansia». E' la frase che fa perdere tempo in tutti e due i casi: se e' panico non aiuta, e se panico non e' ritarda."),
 (9,"chiaro",1.2,"Che cosa aiuta: restare con la persona, tono calmo e frasi brevi, ridurre gli stimoli, rassicurare che passera', invitare a respirare lentamente. Che cosa non aiuta: affollare la stanza, alzare la voce, minimizzare."),

 (10,"chiaro",0,"E arriviamo al quadro che l'OSS intercetta piu' spesso di chiunque altro: il delirium. E' uno stato confusionale acuto, a esordio improvviso e andamento fluttuante, causato da una condizione organica."),
 (10,"chiaro",0,"E' frequente nell'anziano ospedalizzato, ed e' un'emergenza: va riferito subito."),
 (10,"profondo",1.2,"Attenzione al nome, perche' e' uno degli scambi piu' frequenti nei quiz: delirium e delirio sono cose diverse. Il delirio e' un'idea falsa. Il delirium e' uno stato confusionale acuto."),
 # AGG: come si usa quella distinzione quando la domanda e' scritta.
 (10,"tenue",1.2,"Una lettera di differenza, e chi legge in fretta la salta. Se in una domanda compare la parola delirium, la risposta giusta non parla mai di un'idea falsa."),

 (11,"chiaro",0,"La distinzione tra delirium e demenza, su cinque parametri. L'esordio: improvviso nel delirium, in ore o giorni; graduale nella demenza, in mesi o anni."),
 (11,"chiaro",0,"L'andamento: fluttuante nel delirium, con peggioramento serale; progressivo e stabile nella demenza."),
 (11,"chiaro",0,"L'attenzione: gravemente compromessa nel delirium, relativamente conservata all'inizio della demenza. La coscienza: alterata nel delirium, integra nelle fasi iniziali della demenza."),
 # La riga della reversibilita' e' l'ultima rivelazione della tabella, e una
 # tabella non va sul verde pieno: le tinte dei dati non ci arrivano a 3:1 di
 # contrasto. L'enfasi la fa l'evidenziazione di riga, non il fondo.
 (11,"chiaro",1.2,"E la reversibilita', che e' il punto decisivo: il delirium e' reversibile se si rimuove la causa, la demenza no."),
 # AGG: la conseguenza assistenziale della distinzione.
 (11,"tenue",1.2,"Ed e' la ragione per cui la distinzione non e' accademica: scambiare un delirium per una demenza vuol dire lasciare in piedi una causa che si poteva togliere."),

 (12,"chiaro",0,"Le cause piu' frequenti del delirium sono cose che l'OSS puo' intercettare: un'infezione, in particolare urinaria o respiratoria; la disidratazione; il dolore non trattato."),
 (12,"chiaro",0,"Poi la ritenzione urinaria e la stipsi, i farmaci, la privazione di sonno, il disorientamento ambientale, e i deficit sensoriali non corretti, cioe' occhiali e apparecchi acustici mancanti."),
 (12,"profondo",0,"Questo significa che la prevenzione e' in gran parte assistenziale."),
 (12,"chiaro",1.2,"Idratazione, gestione del dolore, mobilizzazione precoce, orientamento con orologio e luce naturale, ripristino di occhiali e apparecchi, sonno protetto, presenza dei familiari."),

 (13,"profondo",1.2,"[thoughtful] Chiudo con il motivo per cui questa lezione riguarda l'OSS piu' di chiunque altro. Il delirium si manifesta spesso di notte, o durante l'assistenza di base."),
 (13,"profondo",0,"Ed e' chi sta accanto alla persona a notare per primo che non e' come ieri. Quella frase, riferita subito, puo' portare a individuare un'infezione in corso."),
 (13,"chiaro",0,"[warm] Il dato piu' prezioso non e' il sintomo: e' il cambiamento. Da tre giorni non si alza, da ieri non parla, stanotte era diversa. Nella prossima lezione vediamo la relazione nel disagio psichico."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1:"Apertura",2:"Fatti, non interpretazioni",3:"La depressione",
 4:"Il punto da non rimandare",5:"Mania e disturbo bipolare",
 6:"Delirio e allucinazione",7:"Sintomi negativi, e il delirio in pratica",
 8:"I disturbi d'ansia",9:"Durante un attacco di panico",10:"Il delirium",
 11:"Delirium e demenza",12:"Cause e prevenzione",13:"La sintesi"}

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

acc=0; stacco=None
for i,b in enumerate(blocchi):
    acc+=len(b["text"])+1
    if acc>tot/2 and stacco is None and i+1<len(blocchi) and b["capitolo"]!=blocchi[i+1]["capitolo"]:
        stacco=b["id"]; a=acc
print(f"\nstacco tracce dopo {stacco}:  chunkA {a} car  ·  chunkB {tot-a} car   (limite 5000)")
print("\n" + ("OK, nessun errore" if not errori else "ERRORI:\n  " + "\n  ".join(errori)))
json.dump(blocchi, open("copione/blocchi.json","w",encoding="utf-8"), ensure_ascii=False, indent=1)
