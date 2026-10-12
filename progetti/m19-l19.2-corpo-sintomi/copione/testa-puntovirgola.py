# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Riscrittura del copione in origine/copione-di-partenza.md (lezione 19.2, la
# piu' densa del modulo: quasi tutta glossario). Le 13 scene di partenza
# stanno a ~490 caratteri l'una: ogni scena diventa tre o quattro blocchi.
#
# Lunghezza: come nella 19.1, il testo del documento senza aggiunte. La 19.1,
# 6.157 caratteri, ha dato una voce grezza di 493,8 s e un montato di 7:51.5
# con un respiro di appena 0,03 s a blocco: il glossario si legge a ~12,5
# car/s grezzi. Qui i caratteri sono di piu' (circa 6.300) e la durata va
# misurata sulla voce grezza prima di trascrivere.
#
# Due ritocchi per la voce, dalla 19.1:
#  - una frase che comincia con «E» seguita da un termine inglese fa passare
#    la voce all'inglese («E never e always» e' stato letto «And never and
#    always»). Quindi «E left e right» diventa «Poi left e right», «E tablet
#    e' la compressa» diventa «Tablet, infine, e' la compressa», e «Foot e
#    feet, tooth e teeth sono plurali irregolari» diventa «I plurali
#    irregolari: foot e feet, tooth e teeth».
#  - Due blocchi accorpati (l'apertura, gli aggettivi dello stato) per stare
#    nelle 49 scene: le tredici scene di partenza ne darebbero 49 blocchi.
#
# Punteggiatura degli elenchi. La prima voce, con un punto dopo ogni coppia
# («Hip, anca. Skin, pelle.»), e' durata 585,6 s grezzi, 10,9 car/s, per un
# montato di 9:01.7: ogni punto e' una pausa piena, e qui le coppie sono
# duecentocinquanta. Dentro gli elenchi il punto diventa punto e virgola;
# restano i punti dopo la frase che apre il capitolo, nelle frasi tipo, nei
# distrattori e nel riepilogo. Le parole non cambiano. La prima versione e'
# in copione/testa-punti.py.
#
# Registro del modulo: rassicurante e pratico. Tag: [warm] in apertura e in
# chiusura, [thoughtful] sul riepilogo. Il velo rosa sta solo sui distrattori.
BLOCCHI = [
 (1,"chiaro",0,"[warm] Bentornata e bentornato. Questa lezione contiene il lessico che compare in ogni quesito sanitario: il corpo, i sintomi, le condizioni, i parametri vitali e i verbi dell'assistenza."),
 (1,"profondo",1.2,"E' la lezione piu' densa del modulo, e per questo va ascoltata piu' di una volta. Le slide sono il glossario: la voce ti guida, ma sono le slide che devi rileggere."),

 (2,"chiaro",0,"Il corpo: la testa e il tronco. Head, testa; face, viso; eye, occhio, eyes al plurale; ear, orecchio; nose, naso; mouth, bocca."),
 (2,"chiaro",0,"Lip, labbro, lips; tooth, dente, e teeth, denti: il plurale e' irregolare; tongue, lingua; neck, collo; throat, gola."),
 (2,"chiaro",0,"Shoulder, spalla; chest, torace; breast, seno; back, schiena; stomach, belly, abdomen: stomaco, pancia, addome; hip, anca."),
 (2,"chiaro",1.2,"Skin, pelle; hair, capelli; bone, osso; joint, articolazione; muscle, muscolo."),

 (3,"chiaro",0,"Gli arti e gli organi. Arm, braccio; elbow, gomito; wrist, polso; hand, mano; finger, dito della mano."),
 (3,"chiaro",0,"Leg, gamba; knee, ginocchio; ankle, caviglia; foot, piede, e feet, piedi, altro plurale irregolare; toe, dito del piede."),
 (3,"chiaro",0,"Gli organi: heart, cuore; lung, polmone, lungs; liver, fegato; kidney, rene; brain, cervello; blood, sangue; vein, vena; bladder, vescica; bowel, intestino."),
 (3,"chiaro",1.2,"Poi left e right, sinistro e destro, che compaiono spesso: left arm, right leg."),

 (4,"chiaro",0,"I sintomi. Pain, dolore; ache, dolore sordo, che si combina: headache, mal di testa; backache, mal di schiena; stomach ache, mal di pancia."),
 (4,"chiaro",0,"Fever o temperature, febbre; chills, brividi; sweating, sudorazione; cough, tosse; shortness of breath, o breathless, affanno; wheezing, respiro sibilante."),
 (4,"chiaro",0,"Nausea; vomiting, vomito; diarrhoea, diarrea; constipation, stipsi; dizziness, vertigine; weakness, debolezza; tiredness o fatigue, stanchezza."),
 (4,"chiaro",1.2,"Swelling, gonfiore; rash, eruzione cutanea; itching, prurito; bleeding, sanguinamento."),

 (5,"chiaro",0,"Le condizioni. Illness, disease, sickness: tutti malattia; injury, lesione da trauma; wound, ferita; infection, infezione; inflammation, infiammazione; fracture, frattura."),
 (5,"chiaro",0,"Pressure ulcer, pressure sore, bedsore: lesione da pressione, in tre forme; fall, caduta; stroke, ictus: attenzione, non significa colpo in senso generico."),
 (5,"chiaro",0,"Heart attack, infarto; diabetes, diabete; dementia, demenza; disability; chronic, cronico; acute, acuto."),
 (5,"chiaro",1.2,"Unconscious, incosciente; confused, confuso; in pain, che ha dolore: the patient is in pain."),

 (6,"chiaro",0,"I parametri vitali, vital signs. Temperature, temperatura; blood pressure, pressione arteriosa; pulse, o heart rate, polso e frequenza cardiaca."),
 (6,"chiaro",0,"Breathing, o respiratory rate, respirazione e frequenza respiratoria; oxygen saturation, saturazione; high, alto; low, basso; normal, normale."),
 (6,"chiaro",0,"I verbi: to measure, to take, to check, tutti rilevare; to record, registrare; to report, riferire; chart, la scheda o la cartella."),
 (6,"profondo",1.2,"Due frasi tipo: the nurse takes the blood pressure. The temperature is high."),

 (7,"chiaro",0,"I verbi dell'assistenza di base, che sono quelli dei completamenti. To help, aiutare; to assist, assistere; to care for, prendersi cura di; to look after, badare a."),
 (7,"chiaro",0,"To wash, lavare; to bathe, fare il bagno; to shower, fare la doccia; to dry, asciugare; to dress, vestire, e anche medicare; to undress, spogliare."),
 (7,"chiaro",0,"To comb, pettinare; to shave, radere; to feed, imboccare o alimentare; to eat, to drink, to swallow: mangiare, bere, deglutire."),
 (7,"chiaro",1.2,"To lift, sollevare; to move, muovere; to turn, girare; to transfer, trasferire; to walk, camminare."),

 (8,"chiaro",0,"I verbi dell'osservazione e della comunicazione. To observe, o to watch, osservare; to check, controllare; to notice, notare; to report, riferire."),
 (8,"chiaro",0,"To record, o to write down, registrare; to inform, informare; to call, chiamare; to ask, chiedere; to answer, rispondere; to listen, ascoltare."),
 (8,"chiaro",1.2,"To explain, spiegare; to reassure, rassicurare; to comfort, confortare; to rest, riposare; to sleep, dormire; to wake up, svegliarsi; to fall, cadere; to complain, lamentarsi: the patient complains of pain."),

 (9,"chiaro",0,"Cura, farmaci e presidi. Care, assistenza o cura; treatment, trattamento; therapy, terapia; medicine, drug, medication: tutti farmaco."),
 (9,"chiaro",0,"Tablet, o pill, compressa; injection, iniezione; dose; prescription, prescrizione; dressing, medicazione; bandage, benda; plaster, cerotto."),
 (9,"chiaro",0,"Syringe, siringa; needle, ago; catheter, catetere; drip, o IV, flebo; oxygen, ossigeno; thermometer, termometro."),
 (9,"chiaro",1.2,"Diet, dieta; meal, pasto; breakfast, lunch, dinner: colazione, pranzo, cena; water, acqua."),

 (10,"chiaro",0,"Sicurezza e igiene. Safety, sicurezza; safe, sicuro; risk, rischio; danger, pericolo, e dangerous, pericoloso; hygiene, igiene; clean, pulito; dirty, sporco."),
 (10,"chiaro",0,"To disinfect, disinfettare; hand washing, o hand hygiene, igiene delle mani; to wear gloves, indossare i guanti; infection control, controllo delle infezioni; isolation, isolamento."),
 (10,"chiaro",1.2,"Waste, rifiuti; sharps, taglienti; to dispose of, smaltire; emergency, emergenza; first aid, primo soccorso; to call for help, chiedere aiuto."),

 (11,"chiaro",0,"Gli aggettivi dello stato, che descrivono come sta la persona. Well, bene; unwell, ill, sick: malato; better, meglio; worse, peggio."),
 (11,"chiaro",0,"Tired, stanco; weak, debole; strong, forte; comfortable, comodo; uncomfortable, scomodo; hot, caldo; cold, freddo; hungry, affamato; thirsty, assetato."),
 (11,"chiaro",1.2,"Awake, sveglio; asleep, addormentato; alert, vigile; drowsy, sonnolento; anxious, ansioso; calm, calmo; upset, turbato; agitated, agitato. The patient feels better: il paziente si sente meglio."),

 (12,"tenue",0,"I distrattori tipici della lezione. Stroke e' l'ictus, non un colpo generico. Drip e' la flebo, non una goccia. Plaster e' il cerotto, ma anche il gesso."),
 (12,"tenue",0,"Dressing e' la medicazione, non la vestizione, e il verbo to dress significa sia vestire sia medicare."),
 (12,"tenue",0,"Ache si combina: headache, backache. Pain e' il dolore in generale. I plurali irregolari: foot e feet, tooth e teeth."),
 (12,"tenue",1.2,"Chart e' la cartella clinica, non la carta. Tablet, infine, e' la compressa, oltre che il dispositivo."),

 (13,"chiaro",0,"[thoughtful] Riepiloghiamo. Il corpo: head, chest, back, arm, leg, hand, foot e feet, skin, heart, lung, blood. I sintomi: pain, ache, fever, cough, breathless, nausea, dizziness, swelling, bleeding."),
 (13,"chiaro",0,"Le condizioni: illness, injury, wound, infection, fracture, pressure ulcer, fall, stroke. I parametri: vital signs, temperature, blood pressure, pulse, saturation, con to take e to record."),
 (13,"chiaro",0,"I verbi: help, wash, dress, feed, lift, turn, observe, report, call, reassure. I presidi: medicine, tablet, dressing, catheter, drip, gloves."),
 (13,"chiaro",0,"[warm] Nella prossima lezione: frasi, dialoghi in reparto e falsi amici."),
]

CAPITOLI = {1:"La lezione",2:"La testa e il tronco",3:"Gli arti e gli organi",
 4:"I sintomi",5:"Le condizioni",6:"I parametri vitali",
 7:"I verbi dell'assistenza",8:"Osservazione e comunicazione",9:"Cura, farmaci e presidi",
 10:"Sicurezza e igiene",11:"Gli aggettivi dello stato",12:"I distrattori",
 13:"Riepilogo"}
