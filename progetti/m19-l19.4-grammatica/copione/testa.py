# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Riscrittura del copione in origine/copione-di-partenza.md (lezione 19.4, la
# grammatica minima per i completamenti). Le 13 scene di partenza stanno a
# ~480 caratteri l'una: ogni scena diventa tre o quattro blocchi.
#
# Lunghezza. Il testo del documento, senza aggiunte. Una prima versione con
# le traduzioni degli esempi e gli esempi in piu' dello schermo (6.652
# caratteri, in copione/testa-con-traduzioni.py) e' durata 549 s grezzi, un
# montato di circa 8:23: la grammatica si legge piu' lenta delle frasi della
# 19.3, per le lettere sillabate e gli elenchi di forme. Tolte le aggiunte, le
# traduzioni restano sulle slide.
#
# Ritocchi per la voce, dalla 19.1 e dalla 19.2: una «E» a inizio frase, o una
# «, e» dopo una virgola, seguite da un termine inglese fanno passare la voce
# all'inglese («and»). Quindi «E there is» diventa «Poi there is», «E
# l'apostrofo S» diventa «Poi l'apostrofo S», «May e might» diventa «May,
# oppure might», e le aggiunte evitano «, e» + inglese.
#
# Registro del modulo: rassicurante e pratico. Tag: [warm] in apertura e in
# chiusura, [thoughtful] sul riepilogo. Il velo rosa sta sui due quesiti tipo
# e sulle opzioni da escludere, che sono le trappole di questa lezione.
BLOCCHI = [
 (1,"chiaro",0,"[warm] Bentornata e bentornato. Questa e' l'unica lezione di grammatica del modulo, e contiene solo cio' che serve a scegliere la risposta giusta nei quesiti di completamento."),
 (1,"profondo",1.2,"Non e' un corso di inglese: e' una cassetta degli attrezzi. Ogni regola e' accompagnata dall'esempio tipo del concorso, cosi' la riconosci quando la incontri."),

 (2,"chiaro",0,"Il presente semplice, present simple, per azioni abituali e fatti. Con I, you, we, they si usa il verbo base: I work, they help."),
 (2,"chiaro",0,"Con he, she, it si aggiunge la S: he works, she helps, the nurse checks."),
 (2,"chiaro",0,"La terza persona e' il punto chiesto nei completamenti: S, oppure ES dopo s, sh, ch, x, o, come washes, goes."),
 (2,"chiaro",1.2,"Il negativo: do not, oppure does not alla terza persona, piu' il verbo base: she does not eat. La domanda: do o does, soggetto, verbo base: does he walk?"),

 (3,"chiaro",0,"Il presente continuo, present continuous, per l'azione in corso adesso. Si forma con am, is, are piu' il verbo con ING. I am helping, she is sleeping, they are eating."),
 (3,"chiaro",0,"The patient is resting now: il paziente sta riposando adesso. The nurse is taking the temperature: l'infermiere sta rilevando la temperatura."),
 (3,"chiaro",0,"Il negativo: is not sleeping. La domanda: is she sleeping? Le parole spia che indicano il continuo: now, at the moment, right now."),
 (3,"profondo",1.2,"Se nella frase c'e' now, la risposta e' quasi sempre la forma in ING."),

 (4,"chiaro",0,"Semplice o continuo, che e' il completamento piu' frequente. L'abitudine vuole il semplice: the nurse checks the patients every morning."),
 (4,"chiaro",0,"L'adesso vuole il continuo: the nurse is checking the patients now. Le parole spia del semplice: every day, always, often, usually, never. Quelle del continuo: now, at the moment, right now."),
 (4,"tenue",1.2,"Due quesiti tipo. She, spazio, sleep, now: la risposta e' is sleeping. He, spazio, wash, his hands every day: la risposta e' washes, con la S della terza persona."),

 (5,"chiaro",0,"Il passato, past simple, per l'azione conclusa. I verbi regolari aggiungono ED: helped, washed, called, checked."),
 (5,"chiaro",0,"Gli irregolari vanno saputi, e questi sono quelli del concorso: was e were per essere, had per avere, ate per mangiare, drank per bere, fell per cadere."),
 (5,"chiaro",0,"Slept per dormire, went per andare, took per prendere, gave per dare, said per dire."),
 (5,"chiaro",1.2,"Il negativo: did not piu' il verbo base, she did not eat. La domanda: did, soggetto, verbo base, did he sleep? Le parole spia: yesterday, last night, last week, ago."),

 (6,"chiaro",0,"Il futuro, in due forme. Will piu' il verbo base per decisione, promessa, previsione: I will call the nurse."),
 (6,"chiaro",0,"Be going to piu' il verbo base per intenzione e piano: I am going to help you wash. Nelle frasi assistenziali le due forme sono quasi intercambiabili, e il concorso non pretende la distinzione fine."),
 (6,"chiaro",1.2,"Il negativo: will not, abbreviato won't, oppure is not going to. La domanda: will you help me? Are you going to eat? Le parole spia: tomorrow, next week, later, soon."),

 (7,"chiaro",0,"I verbi modali, che precedono sempre il verbo base senza to. Can, potere o saper fare: she can walk alone; can I help you? Cannot, o can't, non potere: he cannot swallow."),
 (7,"chiaro",0,"Must, dovere come obbligo forte: you must wash your hands. Must not, il divieto: you must not smoke here."),
 (7,"chiaro",0,"Should, dovrebbe, il consiglio: you should drink more water. Have to, dovere come necessita': I have to work tonight."),
 (7,"profondo",1.2,"May, oppure might, potrebbe, la possibilita': the patient may fall. Nei quesiti sulla sicurezza compaiono must e must not."),

 (8,"chiaro",0,"Essere e avere. To be: I am, you are, he she it is, we are, they are. The patient is in bed. Is she awake?"),
 (8,"chiaro",0,"To have: I have, you have, he she it has, con la S, we have, they have. He has a fever. Do you have any pain?"),
 (8,"chiaro",0,"Poi there is, there are: c'e', ci sono, singolare e plurale. There is a nurse in the room. There are three patients in the ward."),
 (8,"profondo",1.2,"Nei completamenti, there is o there are dipende dal nome che segue."),

 (9,"chiaro",0,"Plurali, articoli, possessivi. Il plurale regolare aggiunge S: nurses, beds. ES dopo certe lettere: dresses, boxes. La Y diventa IES: baby, babies."),
 (9,"chiaro",0,"Gli irregolari del concorso: man e men, woman e women, child e children, foot e feet, tooth e teeth, person e people."),
 (9,"chiaro",0,"Gli articoli: a davanti a consonante, an davanti a vocale, a nurse, an injection; the per il determinato."),
 (9,"chiaro",1.2,"I possessivi: my, your, his, her, its, our, their: his arm, her leg, their room. Poi l'apostrofo S: the patient's bed, il letto del paziente."),

 (10,"chiaro",0,"Le preposizioni, che i completamenti chiedono spesso. In per i luoghi chiusi: in the room, in bed, in the ward, in hospital."),
 (10,"chiaro",0,"On per sopra, a contatto, e per i giorni: on the table, on the floor, on the left, on Monday. At per il punto preciso e l'orario: at the hospital, at eight o'clock, at night, at home."),
 (10,"chiaro",0,"To per la direzione: go to the bathroom. From per la provenienza. With e without, con e senza."),
 (10,"chiaro",1.2,"Next to, accanto. Behind, dietro. In front of, davanti. Under, sotto. Between, tra."),

 (11,"chiaro",0,"I pronomi. Soggetto: I, you, he, she, it, we, they. Oggetto: me, you, him, her, it, us, them. Help him, aiutalo. Call her, chiamala. Give it to me, dammelo."),
 (11,"tenue",0,"Chi fa l'azione e' il soggetto, chi la riceve e' l'oggetto. Due quesiti tipo: the nurse helps, spazio, he, la risposta e' him. Spazio, she, is sleeping, la risposta e' she."),
 (11,"chiaro",1.2,"This e that, questo e quello; these e those, questi e quelli. Some nelle affermative, any nelle domande e nelle negative: do you have any pain?"),

 (12,"chiaro",0,"Il metodo per i completamenti, in cinque passi. Uno: cerca la parola spia. Now vuole il continuo, every day il semplice, yesterday il passato, tomorrow il futuro."),
 (12,"chiaro",0,"Due: guarda il soggetto. He, she, it vogliono la S. Tre: guarda che cosa c'e' dopo. Un singolare vuole there is, un plurale there are."),
 (12,"chiaro",0,"Quattro: leggi la frase intera con l'opzione inserita, perche' deve reggere. Cinque: escludi le opzioni impossibili, come un modale seguito da ING, o una S con they."),
 (12,"profondo",1.2,"Nel dubbio, la forma piu' semplice e' spesso quella giusta."),

 (13,"chiaro",0,"[thoughtful] Riepiloghiamo. Il present simple per l'abitudine, con la S alla terza persona; il present continuous per l'adesso, con la forma in ING."),
 (13,"chiaro",0,"Il past simple con ED e gli irregolari: was, had, ate, fell, slept, went, took. Il futuro con will e going to. I modali: can, must, must not, should, have to, may."),
 (13,"chiaro",0,"To be, to have con has, there is e there are. I plurali irregolari: men, women, children, feet, teeth, people. Articoli, possessivi, preposizioni, pronomi, some e any."),
 (13,"chiaro",0,"[warm] Nella prossima lezione: comprensione dei testi e quesiti tipo."),
]

CAPITOLI = {1:"La lezione",2:"Il presente semplice",3:"Il presente continuo",
 4:"Semplice o continuo",5:"Il passato",6:"Il futuro",
 7:"I verbi modali",8:"Essere e avere",9:"Plurali, articoli, possessivi",
 10:"Le preposizioni",11:"I pronomi",12:"Il metodo",
 13:"Riepilogo"}
