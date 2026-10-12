# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Riscrittura del copione in origine/copione-di-partenza.md (lezione 19.3:
# frasi per situazione, falsi amici, strutture ricorrenti). Le 13 scene di
# partenza stanno a ~485 caratteri l'una: ogni scena diventa tre o quattro
# blocchi.
#
# Lunghezza. La prima voce, sul solo testo del documento (6.335 caratteri),
# e' durata 464,3 s grezzi: frasi intere, piu' veloci del glossario, e il
# montato restava 36 s sotto i 7:50 anche col respiro al tetto. Le aggiunte
# (AGG) vengono dallo schermo dello stesso documento o ne sono la traduzione:
#  - le traduzioni degli esempi delle domande e delle sette strutture, che la
#    voce diceva solo in inglese e la slide traduce («Dov'e' il reparto?»,
#    «Posso aiutarla?»);
#  - i corretti dei falsi amici che lo schermo mette fra parentesi: possibly,
#    bookshop, insult, to expect o to demand;
#  - due «per favore» che lo schermo ha e la voce no.
# NESSUN fatto nuovo.
#
# Ritocchi per la voce, dalla 19.1: nessuna frase comincia con «E» seguita da
# un termine inglese, che fa passare la voce all'inglese. «E disease e' la
# malattia» diventa «Disease, infine, e' la malattia»; «E una frase da
# consegna» e «E due frasi» diventano «Poi una frase», «Poi due frasi».
#
# I numeri inglesi restano in lettere inglesi («thirty eight», «from zero to
# ten»): sono le parole che il quesito userebbe.
#
# Registro del modulo: rassicurante e pratico. Tag: [warm] in apertura e in
# chiusura, [thoughtful] sul riepilogo. Il velo rosa sta sui falsi amici, che
# sono i distrattori di questa lezione.
BLOCCHI = [
 (1,"chiaro",0,"[warm] Bentornata e bentornato. In questa lezione passiamo dalle parole alle frasi: quelle che compaiono nei quesiti di comprensione e di completamento, organizzate per situazione assistenziale."),
 (1,"chiaro",0,"Accoglienza, igiene, pasto, mobilizzazione, dolore, emergenza. Poi i falsi amici, le parole che sembrano italiane e non lo sono."),
 (1,"profondo",1.2,"Le frasi vanno lette a voce alta: la struttura resta piu' della traduzione."),

 (2,"chiaro",0,"L'accoglienza. Good morning. My name is Anna, I am a healthcare assistant: buongiorno, mi chiamo Anna, sono un'operatrice socio sanitaria."),
 (2,"chiaro",0,"How are you feeling today? Come si sente oggi? Do you need anything? Ha bisogno di qualcosa?"),
 (2,"chiaro",0,"Please, call me if you need help: mi chiami se ha bisogno di aiuto. This is the call bell: questo e' il campanello."),
 (2,"chiaro",1.2,"Would you like to sit in the chair? Vuole sedersi sulla sedia? Would you like e' la forma gentile per offrire, e ricorre moltissimo."),

 (3,"chiaro",0,"L'igiene. I am going to help you wash: la aiuto a lavarsi. I am going to e' la struttura piu' frequente di tutte: sto per fare qualcosa."),
 (3,"chiaro",0,"Can you wash your face by yourself? Riesce a lavarsi il viso da solo? By yourself, da solo. Is the water too hot? L'acqua e' troppo calda?"),
 (3,"chiaro",1.2,"I will dry your back: le asciugo la schiena. Let's brush your teeth: laviamo i denti, let's per proporre un'azione insieme. Please, lift your arm: per favore, alzi il braccio."),

 (4,"chiaro",0,"Il pasto. It's time for lunch: e' ora di pranzo. Are you hungry? Are you thirsty? Ha fame? Ha sete? Would you like some water? Vuole un po' d'acqua?"),
 (4,"chiaro",0,"I will help you eat: la aiuto a mangiare. Take small bites and chew slowly: piccoli bocconi e mastichi lentamente, la frase della disfagia. Sit up straight, please: si sieda dritto, per favore."),
 (4,"profondo",1.2,"Poi una frase da consegna: he did not eat his breakfast, non ha mangiato la colazione. Did not, al passato negativo, e' una forma che i completamenti chiedono."),

 (5,"chiaro",0,"La mobilizzazione. I am going to help you get up: la aiuto ad alzarsi. Get up, alzarsi. Put your feet on the floor: metta i piedi a terra."),
 (5,"chiaro",0,"Hold the walking frame: si tenga al deambulatore. Let's turn on your side: giriamoci sul fianco. We will lift you with the hoist: la solleviamo con il sollevatore."),
 (5,"chiaro",1.2,"Take your time, there is no hurry: faccia con calma, non c'e' fretta. Be careful, the floor is wet: attenzione, il pavimento e' bagnato. Be careful compare spesso nei testi sulla sicurezza."),

 (6,"chiaro",0,"Il dolore. Are you in pain? Ha dolore? Where does it hurt? Dove le fa male? Does it hurt here? Le fa male qui?"),
 (6,"chiaro",0,"How bad is the pain, from zero to ten? Quanto e' forte il dolore, da zero a dieci? I will tell the nurse: lo dico all'infermiere."),
 (6,"chiaro",0,"Poi due frasi da testo di comprensione: the patient complains of chest pain, il paziente lamenta dolore al torace."),
 (6,"chiaro",1.2,"She has a headache and feels dizzy: ha mal di testa e ha le vertigini. Feels dizzy, si sente stordita."),

 (7,"chiaro",0,"L'emergenza. Call the nurse immediately! Chiami subito l'infermiere. Call for help! Chiedi aiuto. The patient has fallen: il paziente e' caduto. Has fallen e' il passato di to fall."),
 (7,"chiaro",0,"He is not breathing: non respira. She is unconscious: e' incosciente. Stay with the patient: resta con il paziente."),
 (7,"profondo",1.2,"Do not move him: non spostarlo. Do not, o don't, e' la forma dei divieti, e nei quesiti sulla sicurezza e' sempre presente."),

 (8,"chiaro",0,"Le consegne e il turno, cioe' le frasi dei testi di comprensione piu' realistici. Mrs Rossi slept well last night: la signora Rossi ha dormito bene stanotte."),
 (8,"chiaro",0,"Mr Bianchi refused his lunch: il signor Bianchi ha rifiutato il pranzo. The patient in bed four needs help to walk: il paziente del letto quattro ha bisogno di aiuto per camminare."),
 (8,"chiaro",1.2,"She was confused this morning: era confusa questa mattina. His temperature is thirty eight: ha trentotto di temperatura. Please, check the dressing: per favore, controlla la medicazione."),

 (9,"chiaro",0,"Le domande, che aprono quasi tutti i quesiti di comprensione. What, che cosa. Where, dove. When, quando. Who, chi. Why, perche'. How, come."),
 (9,"chiaro",0,"How many, quanti, per le cose contabili. How much, quanto, per le quantita'. How long, per quanto tempo. How often, quanto spesso. Which, quale."),
 (9,"chiaro",0,"Qualche esempio. Where is the ward? Dov'e' il reparto? When does the shift start? Quando comincia il turno? Who is the patient's doctor? Chi e' il medico del paziente?"),
 (9,"chiaro",0,"How many patients are there? Quanti pazienti ci sono? Why is she crying? Perche' piange?"),
 (9,"profondo",1.2,"Riconoscere la parola interrogativa dice subito che tipo di risposta cercare nel testo."),

 (10,"tenue",0,"I falsi amici, le parole che sembrano italiane e non lo sono. Temperature significa anche febbre, non solo temperatura: the patient has a temperature."),
 (10,"tenue",0,"To attend significa assistere a un evento, non assistere una persona, che si dice to care for. Sensible significa ragionevole, non sensibile, che si dice sensitive."),
 (10,"tenue",0,"Actually significa in realta', non attualmente, che si dice currently. Eventually significa alla fine, non eventualmente, che si dice possibly."),
 (10,"tenue",1.2,"Library significa biblioteca, non libreria, che si dice bookshop. To assist significa aiutare, ma non assistere a uno spettacolo."),

 (11,"tenue",0,"Altri falsi amici dell'area sanitaria. To control significa controllare nel senso di governare, non di verificare, che si dice to check. Confident significa sicuro di se', non confidente."),
 (11,"tenue",0,"Constipated significa stitico, non raffreddato: avere il raffreddore si dice to have a cold. Injury e' la lesione da trauma, non l'ingiuria, che si dice insult."),
 (11,"tenue",0,"To pretend significa fingere, non pretendere, che si dice to expect, o to demand."),
 (11,"tenue",1.2,"Nurse e' l'infermiere, non la nutrice. Patient e' il paziente e anche l'aggettivo paziente. Disease, infine, e' la malattia, non il disagio."),

 (12,"chiaro",0,"Le strutture che tornano sempre, da riconoscere a colpo d'occhio. I am going to piu' verbo, sto per fare: I am going to check your pulse, le controllo il polso."),
 (12,"chiaro",0,"Can I piu' verbo, posso: can I help you? Posso aiutarla? Would you like, vuole: would you like some tea? Vuole un te'? Let's piu' verbo, facciamo insieme: let's sit down, sediamoci."),
 (12,"chiaro",0,"Please piu' l'imperativo: please, open your mouth, apra la bocca. Do not piu' verbo, il divieto: do not get up alone, non si alzi da solo."),
 (12,"chiaro",0,"The patient needs, ha bisogno di: the patient needs help, il paziente ha bisogno di aiuto."),
 (12,"profondo",1.2,"Sette strutture che coprono la grande maggioranza delle frasi assistenziali."),

 (13,"chiaro",0,"[thoughtful] Riepiloghiamo. L'accoglienza: how are you feeling, do you need anything, this is the call bell. Igiene e pasto: I am going to help you wash, are you hungry, take small bites."),
 (13,"chiaro",0,"La mobilizzazione: get up, hold the walking frame, take your time, be careful. Il dolore: are you in pain, where does it hurt, complains of, feels dizzy."),
 (13,"chiaro",0,"L'emergenza: call for help, has fallen, is not breathing, do not move. I falsi amici: temperature, attend, sensible, actually, eventually, library, constipated."),
 (13,"chiaro",0,"[warm] Nella prossima lezione: la grammatica minima per i completamenti."),
]

CAPITOLI = {1:"La lezione",2:"L'accoglienza",3:"L'igiene",
 4:"Il pasto",5:"La mobilizzazione",6:"Il dolore",
 7:"L'emergenza",8:"Le consegne",9:"Le domande",
 10:"I falsi amici",11:"Altri falsi amici",12:"Le strutture ricorrenti",
 13:"Riepilogo"}
