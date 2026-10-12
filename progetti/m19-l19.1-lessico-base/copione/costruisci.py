# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Riscrittura del copione in origine/copione-di-partenza.md (lezione 19.1, la
# prima del modulo di inglese). Le 13 scene di partenza stanno a ~470
# caratteri l'una, contro un tetto di 225 per blocco: ogni scena diventa tre o
# quattro blocchi, nello stesso ordine.
#
# La lunghezza NON segue la forchetta dei moduli in italiano (7.020-7.120).
# Il provino di pronuncia (progetti/_provini) misura 13,6 car/s su un testo da
# glossario, «Ward, reparto. Bedpan, padella.», contro 16,2-16,6 della prosa:
# ogni coppia inglese-italiano porta due pause. Il parlato di partenza, circa
# 6.200 caratteri con gli apostrofi, basta gia' quasi da solo ai 7:50. Nessuna
# aggiunta; la durata si misura sulla voce grezza PRIMA della trascrizione.
#
# Una correzione di contenuto: «le schede di queste cinque lezioni sono il
# glossario da portare con se'» diventa «le slide ... sono il glossario da
# rivedere». Le schede scaricabili che il documento consiglia non sono state
# fatte, e la voce non deve promettere un materiale che non c'e'.
#
# I termini inglesi si scrivono come sono, senza trascrizioni: con la lingua
# fissata su italiano il provino li ha resi tutti e ventotto (Scribe li
# riconosce uno per uno). Le sigle restano da ascoltare: ICU, A and E.
#
# Registro del modulo: rassicurante e pratico. Tag: [warm] in apertura e in
# chiusura, [thoughtful] sul riepilogo.
#
# Il velo rosa sta sui distrattori; la chiusura del capitolo, never e always
# che rovesciano il senso, e' una regola da tenere e va sul verde pieno.
BLOCCHI = [
 (1,"chiaro",0,"[warm] Benvenuta e benvenuto nel Modulo diciannove, l'ultimo dei moduli bonus, interamente dedicato all'inglese per il concorso."),
 (1,"chiaro",0,"Nel Modulo quindici hai avuto una lezione introduttiva; qui la espandiamo in cinque lezioni complete."),
 (1,"profondo",0,"E ripeto la cosa piu' importante: il livello richiesto e' elementare. Non serve parlare inglese, non serve saperlo scrivere."),
 (1,"chiaro",1.2,"Serve riconoscere un lessico limitato e ricorrente, e saper rispondere a tre tipi di quesito. Alla fine di questo modulo li avrai visti tutti."),

 (2,"chiaro",0,"I tre tipi di quesito. La traduzione di un termine: quale termine inglese indica il reparto?"),
 (2,"chiaro",0,"Il completamento di una frase: the nurse, spazio, the patient's temperature."),
 (2,"chiaro",0,"La comprensione di un testo breve: una frase o un paragrafo, seguiti da una domanda sul contenuto. A volte compaiono l'abbinamento tra termine e definizione, e il sinonimo o il contrario."),
 (2,"profondo",1.2,"Il punto da tenere: il concorso non chiede di produrre inglese, chiede di capirlo. Ed e' un'abilita' molto piu' facile da costruire."),

 (3,"chiaro",0,"Il metodo. Si prepara il lessico, non la grammatica: duecento parole coprono quasi tutti i quesiti."),
 (3,"chiaro",0,"Si studia per aree, perche' la memoria lavora per categorie: persone, luoghi, corpo, sintomi, azioni, presidi."),
 (3,"chiaro",0,"Si sfruttano le radici comuni con l'italiano, che sono moltissime: hospital, patient, infection, medicine. Si impara a escludere, perche' bastano due parole riconosciute su quattro per arrivare alla risposta."),
 (3,"chiaro",1.2,"Dieci minuti al giorno per quattro settimane. La grammatica serve solo per i completamenti, e la vediamo nella quarta lezione."),

 (4,"chiaro",0,"Le persone che lavorano. Nurse, infermiere. Head nurse o charge nurse, coordinatore. Doctor, o physician, medico. Surgeon, chirurgo. Specialist, specialista."),
 (4,"chiaro",0,"L'OSS si traduce in modi diversi: healthcare assistant, nursing assistant, care worker; tutti indicano l'operatore socio sanitario."),
 (4,"chiaro",1.2,"Physiotherapist, fisioterapista. Social worker, assistente sociale. Staff, personale. Team, equipe. Shift, turno: morning shift, night shift."),

 (5,"chiaro",0,"Le persone assistite. Patient, paziente. Resident, l'ospite di una struttura residenziale. Elderly person, oppure older adult, persona anziana."),
 (5,"chiaro",0,"Relative, o family member, familiare. Carer, o caregiver, chi assiste. Next of kin, il parente piu' prossimo, che compare spesso nei moduli."),
 (5,"chiaro",1.2,"Disabled person, o person with a disability, persona con disabilita'. Child, bambino. E the elderly, gli anziani in generale."),

 (6,"chiaro",0,"I luoghi. Hospital, ospedale. Ward, reparto: e' uno dei termini piu' chiesti in assoluto. Room, stanza. Bed, letto."),
 (6,"chiaro",0,"Emergency room, oppure A and E, oppure emergency department: pronto soccorso. Operating theatre, sala operatoria. Intensive care unit, abbreviato ICU, terapia intensiva."),
 (6,"chiaro",0,"Outpatient clinic, ambulatorio. Nursing home, o care home, casa di riposo. Hospice. Day centre, centro diurno. Pharmacy, farmacia."),
 (6,"chiaro",1.2,"Toilet o bathroom, bagno. Corridor, corridoio. Kitchen, cucina."),

 (7,"chiaro",0,"Gli oggetti del reparto. Wheelchair, carrozzina. Stretcher, o trolley, barella. Walking frame, deambulatore. Walking stick, o cane, bastone. Crutches, stampelle. Hoist, sollevatore."),
 (7,"chiaro",0,"Sheet, lenzuolo. Blanket, coperta. Pillow, cuscino. Towel, asciugamano. Bedpan, padella. Urinal, o bottle, pappagallo."),
 (7,"chiaro",1.2,"Call bell, o buzzer, campanello di chiamata. Gloves, guanti. Mask, mascherina. Apron o gown, grembiule o camice."),

 (8,"chiaro",0,"I numeri e il tempo, che compaiono nei testi di comprensione. One, two, three, four, five, six, seven, eight, nine, ten. Eleven, twelve, thirteen, fourteen, fifteen. Twenty, thirty, forty, fifty, hundred."),
 (8,"chiaro",0,"I giorni: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday. Morning, mattina. Afternoon, pomeriggio. Evening, sera. Night, notte."),
 (8,"chiaro",1.2,"Today, tomorrow, yesterday: oggi, domani, ieri. Every day, ogni giorno. What time is it? Che ore sono? At eight o'clock, alle otto."),

 (9,"chiaro",0,"Le parole di collegamento, che decidono il senso di una frase nei quesiti di comprensione. And, e. Or, o. But, ma. Because, perche'. So, quindi."),
 (9,"chiaro",0,"If, se. When, quando. While, mentre. Before, prima. After, dopo. Always, sempre. Never, mai. Often, spesso. Sometimes, a volte."),
 (9,"chiaro",0,"Every, ogni. All, tutti. Some, alcuni. No, oppure none, nessuno."),
 (9,"profondo",1.2,"Una frase con never e una con always dicono il contrario, e il quesito di comprensione gioca proprio su questo."),

 (10,"chiaro",0,"Le radici comuni, cioe' il vantaggio di chi parla italiano. Molte parole sono quasi identiche: hospital, patient, doctor, infection, medicine, therapy."),
 (10,"chiaro",0,"Temperature, pressure, emergency, operation, diagnosis, hygiene, nutrition. Disability, mobility, hospice, pharmacy, protocol, procedure, document."),
 (10,"profondo",0,"La regola pratica: se la parola somiglia all'italiano, quasi sempre significa la stessa cosa."),
 (10,"chiaro",1.2,"Le eccezioni esistono, si chiamano falsi amici, sono poche e le vediamo nella terza lezione. Tutto il resto e' un regalo."),

 (11,"chiaro",0,"Come si memorizza il lessico. Per aree, non in ordine alfabetico. A voce: leggere e ripetere, perche' la memoria uditiva aiuta."),
 (11,"chiaro",0,"Con la frase: non ward uguale reparto, ma the patient is in the ward, perche' la parola nel contesto resta. Con le coppie: nurse e doctor, sheet e blanket, morning e night."),
 (11,"chiaro",1.2,"Ripasso breve e frequente, dieci minuti al giorno. Le slide di queste cinque lezioni sono il glossario da rivedere fino al giorno della prova."),

 (12,"tenue",0,"I distrattori tipici di questa lezione. Ward significa reparto, non guardia. Nurse significa infermiere, non nutrice."),
 (12,"tenue",0,"Resident, nei testi sanitari, e' l'ospite di una struttura, non il residente anagrafico. Stretcher e' la barella. Hoist e' il sollevatore, e non ha parenti italiani."),
 (12,"tenue",0,"A and E e' il pronto soccorso, ICU e' la terapia intensiva: le sigle vanno sapute."),
 (12,"profondo",1.2,"E never e always rovesciano il senso di una frase: nei quesiti di comprensione sono la prima cosa da cercare."),

 (13,"chiaro",0,"[thoughtful] Riepiloghiamo. Tre tipi di quesito: traduzione, completamento, comprensione. Si prepara il lessico, per aree, dieci minuti al giorno."),
 (13,"chiaro",0,"Le persone: nurse, doctor, healthcare assistant, patient, resident, carer, next of kin. I luoghi: hospital, ward, bed, A and E, ICU, nursing home, operating theatre."),
 (13,"chiaro",0,"Gli oggetti: wheelchair, stretcher, hoist, sheet, blanket, pillow, bedpan, call bell. Le parole di collegamento, con never e always che rovesciano il senso."),
 (13,"chiaro",0,"[warm] Nella prossima lezione: il corpo, i sintomi, i parametri e le azioni assistenziali."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA, STACCO

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1:"Il modulo 19",2:"I tre tipi di quesito",3:"Il metodo",
 4:"Chi lavora",5:"Chi e' assistito",6:"I luoghi",
 7:"Gli oggetti del reparto",8:"Numeri e tempo",9:"Le parole di collegamento",
 10:"Le radici comuni",11:"Come si memorizza",12:"I distrattori",
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
