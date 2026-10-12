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
# La durata. Questa versione, con un punto dopo ogni coppia, da' 585,6 s di
# voce grezza e un montato di circa 9:00, contro i 7:50 delle altre lezioni:
# la voce legge il glossario a 10,9 car/s grezzi (la 19.1 a 12,5). Si e'
# provato a mettere il punto e virgola dentro gli elenchi
# (copione/testa-puntovirgola.py): 598,4 s, piu' lunga ancora. La lentezza
# viene dalle duecentocinquanta coppie brevi, non dalla punteggiatura.
# Portarla a 7:50 vorrebbe dire togliere un sesto del glossario o accelerare
# la voce del 15%: si e' tenuto il contenuto intero, e la durata e' segnalata.
#
# Registro del modulo: rassicurante e pratico. Tag: [warm] in apertura e in
# chiusura, [thoughtful] sul riepilogo. Il velo rosa sta solo sui distrattori.
BLOCCHI = [
 (1,"chiaro",0,"[warm] Bentornata e bentornato. Questa lezione contiene il lessico che compare in ogni quesito sanitario: il corpo, i sintomi, le condizioni, i parametri vitali e i verbi dell'assistenza."),
 (1,"profondo",1.2,"E' la lezione piu' densa del modulo, e per questo va ascoltata piu' di una volta. Le slide sono il glossario: la voce ti guida, ma sono le slide che devi rileggere."),

 (2,"chiaro",0,"Il corpo: la testa e il tronco. Head, testa. Face, viso. Eye, occhio, eyes al plurale. Ear, orecchio. Nose, naso. Mouth, bocca."),
 (2,"chiaro",0,"Lip, labbro, lips. Tooth, dente, e teeth, denti: il plurale e' irregolare. Tongue, lingua. Neck, collo. Throat, gola."),
 (2,"chiaro",0,"Shoulder, spalla. Chest, torace. Breast, seno. Back, schiena. Stomach, belly, abdomen: stomaco, pancia, addome. Hip, anca."),
 (2,"chiaro",1.2,"Skin, pelle. Hair, capelli. Bone, osso. Joint, articolazione. Muscle, muscolo."),

 (3,"chiaro",0,"Gli arti e gli organi. Arm, braccio. Elbow, gomito. Wrist, polso. Hand, mano. Finger, dito della mano."),
 (3,"chiaro",0,"Leg, gamba. Knee, ginocchio. Ankle, caviglia. Foot, piede, e feet, piedi, altro plurale irregolare. Toe, dito del piede."),
 (3,"chiaro",0,"Gli organi: heart, cuore. Lung, polmone, lungs. Liver, fegato. Kidney, rene. Brain, cervello. Blood, sangue. Vein, vena. Bladder, vescica. Bowel, intestino."),
 (3,"chiaro",1.2,"Poi left e right, sinistro e destro, che compaiono spesso: left arm, right leg."),

 (4,"chiaro",0,"I sintomi. Pain, dolore. Ache, dolore sordo, che si combina: headache, mal di testa; backache, mal di schiena; stomach ache, mal di pancia."),
 (4,"chiaro",0,"Fever o temperature, febbre. Chills, brividi. Sweating, sudorazione. Cough, tosse. Shortness of breath, o breathless, affanno. Wheezing, respiro sibilante."),
 (4,"chiaro",0,"Nausea. Vomiting, vomito. Diarrhoea, diarrea. Constipation, stipsi. Dizziness, vertigine. Weakness, debolezza. Tiredness o fatigue, stanchezza."),
 (4,"chiaro",1.2,"Swelling, gonfiore. Rash, eruzione cutanea. Itching, prurito. Bleeding, sanguinamento."),

 (5,"chiaro",0,"Le condizioni. Illness, disease, sickness: tutti malattia. Injury, lesione da trauma. Wound, ferita. Infection, infezione. Inflammation, infiammazione. Fracture, frattura."),
 (5,"chiaro",0,"Pressure ulcer, pressure sore, bedsore: lesione da pressione, in tre forme. Fall, caduta. Stroke, ictus: attenzione, non significa colpo in senso generico."),
 (5,"chiaro",0,"Heart attack, infarto. Diabetes, diabete. Dementia, demenza. Disability. Chronic, cronico. Acute, acuto."),
 (5,"chiaro",1.2,"Unconscious, incosciente. Confused, confuso. In pain, che ha dolore: the patient is in pain."),

 (6,"chiaro",0,"I parametri vitali, vital signs. Temperature, temperatura. Blood pressure, pressione arteriosa. Pulse, o heart rate, polso e frequenza cardiaca."),
 (6,"chiaro",0,"Breathing, o respiratory rate, respirazione e frequenza respiratoria. Oxygen saturation, saturazione. High, alto. Low, basso. Normal, normale."),
 (6,"chiaro",0,"I verbi: to measure, to take, to check, tutti rilevare. To record, registrare. To report, riferire. Chart, la scheda o la cartella."),
 (6,"profondo",1.2,"Due frasi tipo: the nurse takes the blood pressure. The temperature is high."),

 (7,"chiaro",0,"I verbi dell'assistenza di base, che sono quelli dei completamenti. To help, aiutare. To assist, assistere. To care for, prendersi cura di. To look after, badare a."),
 (7,"chiaro",0,"To wash, lavare. To bathe, fare il bagno. To shower, fare la doccia. To dry, asciugare. To dress, vestire, e anche medicare. To undress, spogliare."),
 (7,"chiaro",0,"To comb, pettinare. To shave, radere. To feed, imboccare o alimentare. To eat, to drink, to swallow: mangiare, bere, deglutire."),
 (7,"chiaro",1.2,"To lift, sollevare. To move, muovere. To turn, girare. To transfer, trasferire. To walk, camminare."),

 (8,"chiaro",0,"I verbi dell'osservazione e della comunicazione. To observe, o to watch, osservare. To check, controllare. To notice, notare. To report, riferire."),
 (8,"chiaro",0,"To record, o to write down, registrare. To inform, informare. To call, chiamare. To ask, chiedere. To answer, rispondere. To listen, ascoltare."),
 (8,"chiaro",1.2,"To explain, spiegare. To reassure, rassicurare. To comfort, confortare. To rest, riposare. To sleep, dormire. To wake up, svegliarsi. To fall, cadere. To complain, lamentarsi: the patient complains of pain."),

 (9,"chiaro",0,"Cura, farmaci e presidi. Care, assistenza o cura. Treatment, trattamento. Therapy, terapia. Medicine, drug, medication: tutti farmaco."),
 (9,"chiaro",0,"Tablet, o pill, compressa. Injection, iniezione. Dose. Prescription, prescrizione. Dressing, medicazione. Bandage, benda. Plaster, cerotto."),
 (9,"chiaro",0,"Syringe, siringa. Needle, ago. Catheter, catetere. Drip, o IV, flebo. Oxygen, ossigeno. Thermometer, termometro."),
 (9,"chiaro",1.2,"Diet, dieta. Meal, pasto. Breakfast, lunch, dinner: colazione, pranzo, cena. Water, acqua."),

 (10,"chiaro",0,"Sicurezza e igiene. Safety, sicurezza. Safe, sicuro. Risk, rischio. Danger, pericolo, e dangerous, pericoloso. Hygiene, igiene. Clean, pulito. Dirty, sporco."),
 (10,"chiaro",0,"To disinfect, disinfettare. Hand washing, o hand hygiene, igiene delle mani. To wear gloves, indossare i guanti. Infection control, controllo delle infezioni. Isolation, isolamento."),
 (10,"chiaro",1.2,"Waste, rifiuti. Sharps, taglienti. To dispose of, smaltire. Emergency, emergenza. First aid, primo soccorso. To call for help, chiedere aiuto."),

 (11,"chiaro",0,"Gli aggettivi dello stato, che descrivono come sta la persona. Well, bene. Unwell, ill, sick: malato. Better, meglio. Worse, peggio."),
 (11,"chiaro",0,"Tired, stanco. Weak, debole. Strong, forte. Comfortable, comodo. Uncomfortable, scomodo. Hot, caldo. Cold, freddo. Hungry, affamato. Thirsty, assetato."),
 (11,"chiaro",1.2,"Awake, sveglio. Asleep, addormentato. Alert, vigile. Drowsy, sonnolento. Anxious, ansioso. Calm, calmo. Upset, turbato. Agitated, agitato. The patient feels better: il paziente si sente meglio."),

 (12,"tenue",0,"I distrattori tipici della lezione. Stroke e' l'ictus, non un colpo generico. Drip e' la flebo, non una goccia. Plaster e' il cerotto, ma anche il gesso."),
 (12,"tenue",0,"Dressing e' la medicazione, non la vestizione, e il verbo to dress significa sia vestire sia medicare."),
 (12,"tenue",0,"Ache si combina: headache, backache. Pain e' il dolore in generale. I plurali irregolari: foot e feet, tooth e teeth."),
 (12,"tenue",1.2,"Chart e' la cartella clinica, non la carta. Tablet, infine, e' la compressa, oltre che il dispositivo."),

 (13,"chiaro",0,"[thoughtful] Riepiloghiamo. Il corpo: head, chest, back, arm, leg, hand, foot e feet, skin, heart, lung, blood. I sintomi: pain, ache, fever, cough, breathless, nausea, dizziness, swelling, bleeding."),
 (13,"chiaro",0,"Le condizioni: illness, injury, wound, infection, fracture, pressure ulcer, fall, stroke. I parametri: vital signs, temperature, blood pressure, pulse, saturation, con to take e to record."),
 (13,"chiaro",0,"I verbi: help, wash, dress, feed, lift, turn, observe, report, call, reassure. I presidi: medicine, tablet, dressing, catheter, drip, gloves."),
 (13,"chiaro",0,"[warm] Nella prossima lezione: frasi, dialoghi in reparto e falsi amici."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA, STACCO

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1:"La lezione",2:"La testa e il tronco",3:"Gli arti e gli organi",
 4:"I sintomi",5:"Le condizioni",6:"I parametri vitali",
 7:"I verbi dell'assistenza",8:"Osservazione e comunicazione",9:"Cura, farmaci e presidi",
 10:"Sicurezza e igiene",11:"Gli aggettivi dello stato",12:"I distrattori",
 13:"Riepilogo"}

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
for a,b in zip(blocchi, blocchi[1:]):
    if a["capitolo"]!=b["capitolo"] and not a["posa"]:
        errori.append(f'{a["id"]}: chiude il capitolo {a["capitolo"]} senza posa')

pose=sum(b["posa"] for b in blocchi)
parlato=tot/CPS+pose; durata=parlato+COPERTINA+CHIUSURA
print(f"blocchi   {len(blocchi)}        scene {nscene}/{MAX_SCENE}")
print(f"caratteri {tot}      media {tot/len(blocchi):.0f} car/blocco")
print(f"parlato   {parlato:.0f} s     montato {durata//60:.0f}:{durata%60:04.1f}   (stima a {CPS} car/s)")
print(f"tag       {tags}        pose {sum(1 for b in blocchi if b['posa'])} per {pose:.1f} s")
print()
cur=None
for b in blocchi:
    if b["capitolo"]!=cur:
        cur=b["capitolo"]; print(f'  cap {cur:2d}  {CAPITOLI[cur]}')
    p=f'  +{b["posa"]}s' if b["posa"] else ""
    print(f'    {b["id"]}  {len(b["text"]):3d} car  [{b["tema"]:8s}]{p} {b["text"][:50]}...')

acc=0; stacco=None
for b in blocchi:
    acc+=len(b["text"])
    if stacco is None and acc>tot/2: stacco=b["id"]
A=sum(len(b["text"]) for b in blocchi[:[x["id"] for x in blocchi].index(stacco)+1])
print(f"\nstacco tracce dopo {stacco}:  chunkA {A} car  ·  chunkB {tot-A} car   (limite 5000)")

# Lo stacco che conta e' quello dichiarato in profilo.py, non quello suggerito
# qui: il suggerimento divide a meta' i caratteri, la scelta la fa chi scrive e
# va su un cambio di capitolo. I due file di testo finora si scrivevano a mano,
# ed e' il passaggio in cui lo stacco della lezione precedente sopravvive senza
# che nessun controllo se ne accorga — i conti tornano tutti, sui blocchi
# sbagliati. Quindi li scrive questo script, dallo STACCO dichiarato.
ids = [b["id"] for b in blocchi]
if STACCO not in ids:
    errori.append(f"STACCO «{STACCO}» non e\' un blocco di questa lezione")
else:
    k = ids.index(STACCO) + 1
    if blocchi[k-1]["capitolo"] == blocchi[k]["capitolo"]:
        errori.append(f"STACCO «{STACCO}» cade dentro il capitolo "
                      f"{blocchi[k]['capitolo']}, non a un cambio")
    if STACCO != stacco:
        print(f"  (STACCO dichiarato {STACCO}, il mezzo dei caratteri cade a {stacco})")

if errori:
    print("\nERRORI:"); [print("  -",e) for e in errori]; sys.exit(1)
qui = _pl.Path(__file__).parent
json.dump(blocchi, open(qui/"blocchi.json","w",encoding="utf-8"),
          indent=1, ensure_ascii=False)

k = ids.index(STACCO) + 1
for nome, parte in (("chunkA", blocchi[:k]), ("chunkB", blocchi[k:])):
    testo = " ".join(b["text"] for b in parte)
    (qui/f"{nome}.txt").write_text(testo + "\n", encoding="utf-8")
    print(f"{nome}.txt  {len(testo)} car  ({parte[0]['id']}-{parte[-1]['id']})")

print("\nOK, nessun errore")
