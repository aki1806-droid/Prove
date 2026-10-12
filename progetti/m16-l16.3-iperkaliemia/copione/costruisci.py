# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Il potassio e' l'elettrolita che uccide piu' in silenzio: un'iperkaliemia grave puo' dare pochi sintomi e poi, all'improvviso, un'aritmia mortale."),
 (1,"chiaro",0,"Qui un paziente in emodialisi salta una seduta e arriva in pronto soccorso con un potassio pericoloso. Vedremo come si legge l'ECG, perche' i farmaci d'urgenza agiscono in modi diversi, e come si protegge la fistola."),
 (1,"chiaro",0,"Ci servono le lezioni tre punto cinque, sei punto uno, otto punto quattro, quattordici punto quattro e quattordici punto sette."),

 (2,"chiaro",0,"Lo scenario. Il signor Sergio ha sessantotto anni ed e' in emodialisi il lunedi', il mercoledi' e il venerdi', con una fistola al braccio sinistro. E' quasi anurico. Venerdi' non si e' presentato alla seduta."),
 (2,"chiaro",0,"Lunedi' alle otto arriva in pronto soccorso: una forte astenia, le gambe molli, formicolii, nausea, dispnea. Frequenza quarantasei, pressione centocinquanta su novanta."),
 (2,"chiaro",0,"Frequenza respiratoria ventisei, saturazione novantadue, edemi declivi, crepitii alle basi. E pesa tre chili e mezzo piu' del suo peso secco. Fermati: quali due problemi vedi, e quale e' piu' pericoloso adesso?"),

 (3,"chiaro",0,"Il ragionamento. Un paziente quasi anurico che salta una seduta accumula tutto cio' che il rene non elimina: potassio, liquidi, scorie, acidi."),
 (3,"chiaro",0,"La debolezza muscolare, le parestesie e la bradicardia fanno sospettare un'iperkaliemia grave. Gli edemi, i crepitii, la dispnea e il peso aumentato indicano un sovraccarico di liquidi."),
 (3,"chiaro",0,"[serious] Il problema piu' pericoloso nell'immediato e' l'iperkaliemia, perche' puo' causare aritmie e arresto cardiaco senza preavviso."),

 (4,"chiaro",0,"Le prime azioni. Monitor continuo, con il defibrillatore pronto. Avvisi subito il medico. ECG a dodici derivazioni. Accesso venoso e prelievi sul braccio destro: mai su quello con la fistola, l'accesso vitale del paziente."),
 (4,"chiaro",0,"Il potassio si puo' avere in pochi minuti con l'emogas, senza aspettare il laboratorio. Semiseduto, ossigeno secondo protocollo, i farmaci d'urgenza pronti. E avvisi la dialisi, che sara' il trattamento definitivo."),

 (5,"chiaro",0,"L'emogas conferma un potassio di sette virgola quattro, su un campione non emolizzato. E l'ECG dell'iperkaliemia cambia in modo progressivo."),
 (5,"chiaro",0,"Prima onde T alte e appuntite. Poi un PR allungato, con l'onda P che si appiattisce. Poi un QRS che si allarga, fino alla bradicardia estrema, ai ritmi a QRS largo, all'arresto in fibrillazione ventricolare o asistolia."),
 (5,"chiaro",0,"Il signor Sergio ha onde T appuntite, PR lungo e un QRS che inizia ad allargarsi: e' un'emergenza. E un avvertimento: un ECG normale non esclude un'iperkaliemia grave."),

 (6,"chiaro",0,"I farmaci d'urgenza, sempre secondo prescrizione, con tre meccanismi diversi da saper spiegare. Uno: stabilizzare il cuore. Il calcio endovena protegge il miocardio dalle aritmie in pochi minuti."),
 (6,"chiaro",0,"Ma non abbassa il potassio. E' una protezione temporanea, e richiede cautela nei pazienti in digossina."),
 (6,"chiaro",0,"Due: spostare il potassio dentro le cellule. L'insulina rapida con il glucosio, il salbutamolo per aerosol, e il bicarbonato se c'e' acidosi. Anche questo e' temporaneo: il potassio resta nel corpo."),
 (6,"chiaro",0,"Tre: eliminarlo. Con l'emodialisi urgente, che e' il trattamento definitivo, e con le resine o i leganti del potassio. E' l'unico dei tre che lo porta fuori dal corpo."),

 (7,"chiaro",0,"La sorveglianza durante la terapia. ECG continuo, e il potassio ripetuto secondo prescrizione. La glicemia dopo l'insulina e il glucosio: l'ipoglicemia puo' comparire anche ore dopo."),
 (7,"chiaro",0,"Il rischio e' maggiore nel nefropatico, che elimina l'insulina piu' lentamente: il caso quindici punto otto. Poi velocita' e sede del calcio, perche' lo stravaso danneggia i tessuti. E il salbutamolo: tachicardia, tremori."),

 (8,"chiaro",0,"Il sovraccarico di liquidi. Posizione semiseduta e ossigeno con un target. Nel paziente anurico i diuretici sono poco o per nulla efficaci: i liquidi in eccesso si rimuovono con la dialisi, con l'ultrafiltrazione."),
 (8,"chiaro",0,"Nel frattempo restrizione dei liquidi, bilancio e peso, e i segni di edema polmonare. Ricordi il caso quindici punto sei? Li' la furosemide funzionava; qui il rene non risponde, e la soluzione e' un'altra."),

 (9,"chiaro",0,"La fistola, ancora una volta. Si controllano fremito e soffio. Sul braccio della fistola niente pressione, prelievi, cannule o lacci, e lo si segnala al letto."),
 (9,"chiaro",0,"Dopo la dialisi, il sanguinamento dai punti di puntura, l'ipotensione, il peso rispetto al peso secco. E con un catetere per dialisi, la regola della lezione otto punto quattro: il lock si aspira, non si spinge mai."),

 (10,"chiaro",0,"[thoughtful] E poi la domanda che cambia il caso: perche' ha saltato la seduta? Si chiede senza giudicare: che cosa le ha impedito di venire venerdi'?"),
 (10,"chiaro",0,"Le cause possono essere molto diverse: un problema di trasporto, la stanchezza, una depressione, difficolta' familiari o economiche, oppure la volonta' di sospendere il trattamento."),
 (10,"chiaro",0,"La risposta orienta l'intervento: un servizio di trasporto, un supporto psicologico, l'assistente sociale, oppure un colloquio sulle scelte di cura."),
 (10,"chiaro",0,"Il diritto di rifiutare la dialisi esiste, come prevede la legge duecentodiciannove. Ma deve essere una scelta informata e accompagnata, non il risultato di un problema pratico irrisolto."),

 (11,"chiaro",0,"Un approfondimento pratico: il potassio nel piatto. Ne sono ricchi molti frutti, come banane, kiwi, agrumi, frutta secca; molte verdure, come patate, pomodori, legumi, verdure a foglia; il cioccolato, i succhi."),
 (11,"chiaro",0,"Per ridurlo si tagliano le verdure, si lasciano in ammollo, poi si bollono in abbondante acqua da eliminare. E un'attenzione che pochi conoscono: i sostituti del sale iposodici contengono spesso cloruro di potassio."),
 (11,"chiaro",0,"Per un dializzato possono essere pericolosi. Anche alcuni farmaci aumentano il potassio: ACE-inibitori, sartani, diuretici risparmiatori di potassio, FANS. E il piano alimentare si costruisce con il dietista."),

 (12,"chiaro",0,"L'educazione. Non saltare le sedute, e in caso di impedimento contattare subito il centro dialisi, che puo' spostarle. La dieta, con attenzione a potassio, fosforo e sale."),
 (12,"chiaro",0,"I liquidi, con il limite indicato e il controllo del peso fra una seduta e l'altra. I segni d'allarme per cui chiamare subito: debolezza, formicolii, palpitazioni, dispnea, aumento rapido di peso."),
 (12,"chiaro",0,"La cura della fistola. E nessun farmaco da banco senza consiglio, in particolare i FANS."),

 (13,"chiaro",0,"Gli errori. Pungere o misurare la pressione sul braccio della fistola. Aspettare il laboratorio senza il monitor. Pensare che il calcio abbassi il potassio."),
 (13,"chiaro",0,"Dimenticare la glicemia dopo insulina e glucosio. Contare sui diuretici in un paziente anurico. E non chiedere perche' ha saltato la seduta."),

 (14,"chiaro",0,"[curious] Le domande d'orale. Prima: le alterazioni ECG dell'iperkaliemia? Onde T alte e appuntite, poi PR allungato e onda P appiattita, poi QRS che si allarga, fino alla bradicardia e all'arresto."),
 (14,"chiaro",0,"Seconda: come agiscono i farmaci? Il calcio stabilizza la membrana del miocardio senza abbassare il potassio. Insulina con glucosio e salbutamolo spostano il potassio nelle cellule. La dialisi lo elimina."),
 (14,"chiaro",0,"Terza: che cosa non si fa sul braccio con la fistola? Non si misura la pressione, niente prelievi, cannule, lacci, indumenti stretti."),
 (14,"chiaro",0,"Non si sollevano pesi, e non ci si dorme sopra: e' l'elenco della lezione otto punto quattro. E ogni giorno si controllano fremito e soffio."),

 (15,"chiaro",0,"La risposta modello. Paziente in emodialisi che ha saltato una seduta, con astenia, parestesie, bradicardia, dispnea, edemi e aumento di peso: sospetta iperkaliemia grave e sovraccarico. Priorita': prevenire le aritmie."),
 (15,"chiaro",0,"Avvio il monitoraggio con il defibrillatore pronto, avviso subito il medico ed eseguo l'ECG. Posiziono l'accesso sul braccio senza fistola, e ottengo il potassio rapido con l'emogas."),
 (15,"chiaro",0,"Somministro secondo prescrizione calcio endovena, insulina con glucosio e salbutamolo, sorvegliando ECG, potassio e glicemia. E avviso la dialisi per il trattamento urgente."),
 (15,"chiaro",0,"Gestisco il sovraccarico: semiseduto, ossigeno, restrizione idrica. Proteggo la fistola. Indago senza giudizio il motivo della seduta saltata. Educo su sedute, dieta povera di potassio, liquidi e segni d'allarme."),

 (16,"chiaro",0,"I collegamenti. Potassio ed emolisi con la tre punto cinque. Il patrimonio venoso con la sei punto uno. Dialisi e fistola con la otto punto quattro. Il rene con la quattordici punto quattro."),
 (16,"chiaro",0,"I valori di laboratorio con la quattordici punto sette. Le alterazioni dell'ECG con la tre punto cinque. E la legge duecentodiciannove, sul consenso e sul rifiuto delle cure, con la uno punto sei."),

 (17,"profondo",1.2,"[serious] La frase del caso: il calcio protegge il cuore, ma il potassio resta. Solo la dialisi lo porta via."),

 (18,"chiaro",0,"[warm] Nella prossima lezione: una paziente in medicina che, al primo tentativo di alzarsi, diventa improvvisamente dispnoica. Una trombosi che nessuno aveva cercato, e una profilassi che nessuno aveva prescritto. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"Lo scenario",3:"Il ragionamento",4:"Le prime azioni",5:"L'ECG dell'iperkaliemia",
 6:"I farmaci d'urgenza: tre meccanismi diversi",7:"La sorveglianza durante la terapia",8:"Il sovraccarico di liquidi",9:"La fistola: ancora una volta",
 10:"Perche' ha saltato la seduta?",11:"Il potassio nel piatto",12:"L'educazione",13:"Gli errori da evitare",
 14:"Le domande d'orale",15:"La risposta modello",16:"I collegamenti",17:"La frase del caso",18:"Chiusura"}

# Deroghe al limite di 225 caratteri, dichiarate una per una con il motivo:
# la voce e' gia' generata e non ha fatto pausa dove il copione staccava, e il
# confine si mette dove la voce si ferma, non dove il copione vorrebbe.
DEROGHE = {}
ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CPS = 17.0   # misurata su 1.2, confermata da 1.3 a 1.8

blocchi=[]
for i,(cap,tema,posa,txt) in enumerate(BLOCCHI, start=2):
    blocchi.append({"id":f"s{i:02d}","capitolo":cap,"tema":tema,"posa":posa,"text":txt})

errori=[]
tot=sum(len(b["text"]) for b in blocchi)
nscene=len(blocchi)+2
if nscene>50: errori.append(f"scene {nscene} > 50")
for b in blocchi:
    if any(c in ACCENTATE for c in b["text"]):
        errori.append(f'{b["id"]}: vocale accentata -> ' + "".join(sorted({c for c in b["text"] if c in ACCENTATE})))
    if len(b["text"])>225 and b["id"] not in DEROGHE: errori.append(f'{b["id"]}: {len(b["text"])} car, blocco troppo lungo')
tags=sum(len(re.findall(r"\[[a-z]+\]", b["text"])) for b in blocchi)
if tags>6: errori.append(f"tag di intenzione: {tags} > 6")

pose=sum(b["posa"] for b in blocchi)
parlato=tot/CPS+pose; durata=parlato+3+10
print(f"blocchi   {len(blocchi)}        scene {nscene}/50")
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

# Lo stacco fra le due tracce: il confine di capitolo che divide i caratteri
# nel modo piu' pari, fra quelli che tengono ENTRAMBI i chunk sotto i 5.000.
# Prendere il primo confine dopo la meta' non basta: su 2.2 dava un chunk A da
# 5.072 caratteri, e la voce avrebbe rifiutato il testo.
LIMITE = 5000
cand = []
acc = 0
for i, b in enumerate(blocchi[:-1]):
    acc += len(b["text"]) + 1
    if b["capitolo"] != blocchi[i+1]["capitolo"]:
        cand.append((b["id"], acc, tot - acc))
buoni = [c for c in cand if c[1] <= LIMITE and c[2] <= LIMITE]
if buoni:
    stacco, a, bb = min(buoni, key=lambda c: abs(c[1] - c[2]))
    print(f"\nstacco tracce dopo {stacco}:  chunkA {a} car  ·  chunkB {bb} car   (limite {LIMITE})")
else:
    stacco, a, bb = min(cand, key=lambda c: max(c[1], c[2]))
    errori.append(f"nessuno stacco tiene i due chunk sotto {LIMITE}: il migliore e' "
                  f"{stacco} con {max(a, bb)} car. Serve un capitolo in piu'.")
    print(f"\nstacco tracce dopo {stacco}:  chunkA {a} car  ·  chunkB {bb} car   (limite {LIMITE})")
# tagli.py deve tagliare dove la voce ha davvero staccato: se le due costanti
# divergono, i blocchi finiscono sulla traccia sbagliata e non se ne accorge
# nessuno finche' non si guarda il video.
import pathlib as _pl
_tagli = _pl.Path("audio/tagli.py")
if _tagli.exists():
    _m = re.search(r'STACCO\s*=\s*"(s\d+)"', _tagli.read_text(encoding="utf-8"))
    if _m and _m.group(1) != stacco:
        errori.append(f'audio/tagli.py ha STACCO = "{_m.group(1)}", qui lo stacco e\' {stacco}')

print("\n" + ("OK, nessun errore" if not errori else "ERRORI:\n  " + "\n  ".join(errori)))
json.dump(blocchi, open("copione/blocchi.json","w",encoding="utf-8"), ensure_ascii=False, indent=1)

# I due chunk per la voce li scrive lo stesso file che ha scritto i blocchi:
# copiarli a mano significherebbe far divergere il copione dal testo letto,
# e la verifica della trascrizione confronterebbe due cose gia' diverse.
i = [b["id"] for b in blocchi].index(stacco)
for nome, gruppo in (("A", blocchi[:i+1]), ("B", blocchi[i+1:])):
    open(f"audio/chunk{nome}.txt","w",encoding="utf-8").write(
        "\n\n".join(b["text"] for b in gruppo) + "\n")
print(f"scritti audio/chunkA.txt e audio/chunkB.txt")
