# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] La demenza e' una delle sfide piu' grandi dell'assistenza di oggi. Non esiste ancora una cura che la arresti."),
 (1,"chiaro",0,"Ma esiste molto da fare: per la qualita' della vita della persona, per la sua sicurezza, per la famiglia che la assiste. Perche' la demenza dura anni, e cambia la vita di tutta la famiglia."),
 (1,"chiaro",0,"Ed e' un ambito in cui gli strumenti piu' efficaci non sono farmaci, ma comunicazione, ambiente e relazione. Cioe' competenze infermieristiche."),

 (2,"chiaro",0,"Le forme principali. La malattia di Alzheimer, la piu' frequente: esordio graduale, e a essere compromessa per prima e' la memoria recente."),
 (2,"chiaro",0,"La persona ricorda la guerra, ma non che cosa ha mangiato a pranzo. La demenza vascolare, legata a piccoli eventi cerebrovascolari, peggiora spesso a gradini."),
 (2,"chiaro",0,"La demenza a corpi di Lewy: fluttuazioni marcate, allucinazioni visive, parkinsonismo. E un'ipersensibilita' grave agli antipsicotici, che possono dare reazioni pericolose."),
 (2,"chiaro",0,"La frontotemporale: alterazioni del comportamento e del linguaggio, con un esordio spesso piu' precoce. E' facile scambiarla per un problema psichiatrico, perche' all'inizio la memoria regge."),

 (3,"chiaro",0,"Gli stadi. Lieve: deficit di memoria, difficolta' nelle attivita' strumentali, gestire i soldi, i farmaci. Ma le attivita' di base sono conservate."),
 (3,"chiaro",0,"Moderato: disorientamento, difficolta' anche nelle attivita' di base, e i disturbi del comportamento. Grave: dipendenza totale, perdita del linguaggio, disfagia, immobilita'."),
 (3,"chiaro",0,"Per la valutazione cognitiva si usa spesso il Mini Mental State Examination: un punteggio da zero a trenta, da interpretare in base a eta' e scolarita'. Non e' una diagnosi: e' una misura, utile per seguire l'andamento."),

 (4,"chiaro",0,"I disturbi del comportamento, con la sigla inglese BPSD. Agitazione, aggressivita', wandering, cioe' il bisogno di camminare e vagare. Apatia, deliri, allucinazioni, disturbi del sonno."),
 (4,"chiaro",0,"E il sundowning: il peggioramento caratteristico nel tardo pomeriggio e alla sera, quando cala la luce. Va previsto: la sera servono piu' presenza, piu' luce, meno stimoli."),
 (4,"chiaro",0,"Sono la principale causa di stress per chi assiste, e la principale causa di ricovero in struttura. E con loro arrivano spesso sedativi e contenzione, che in molti casi si possono evitare."),

 (5,"chiaro",0,"Il principio piu' importante della lezione. Il comportamento della persona con demenza e' spesso una comunicazione: quando le parole se ne vanno, resta il comportamento."),
 (5,"profondo",1.2,"[serious] Il comportamento ha un significato."),
 (5,"chiaro",0,"Prima di qualunque farmaco si cerca la causa. Il dolore, con la PAINAD della lezione due punto tre. Fame, sete, bisogno di urinare, stipsi, caldo o freddo, rumore, paura, noia."),
 (5,"chiaro",0,"Un farmaco, un'infezione con un delirium sovrapposto. E un metodo utile e' l'ABC: che cosa e' successo prima, qual e' il comportamento, che cosa ne e' seguito."),

 (6,"chiaro",0,"Gli approcci non farmacologici sono la prima scelta. Routine stabili, perche' il cambiamento disorienta: chi non sa piu' dove si trova si orienta con le abitudini."),
 (6,"chiaro",0,"Attivita' significative e gradite, legate alla storia della persona. Musica e attivita' sensoriali. La validazione: accogliere l'emozione invece di correggere i fatti. La distrazione, che sposta l'attenzione."),
 (6,"chiaro",0,"La luce naturale di giorno e luci calde la sera, contro il sundowning. E i familiari, che conoscono la persona meglio di chiunque."),

 (7,"chiaro",0,"La comunicazione. Ci si avvicina di fronte, lentamente, mai alle spalle. Contatto visivo, tono calmo, frasi brevi, una richiesta alla volta, domande chiuse."),
 (7,"chiaro",0,"E tre cose da non fare: contraddire, discutere, mettere alla prova la memoria con domande come: si ricorda chi sono? Generano solo frustrazione."),
 (7,"chiaro",0,"Si risponde all'emozione, non al contenuto. Se la persona e' spaventata, conta che si senta al sicuro, non che abbia ragione sui fatti."),
 (7,"chiaro",0,"Se la persona chiede della madre, morta da trent'anni, dirle che e' morta le fa rivivere il lutto ogni volta. Meglio chiederle di parlarne, e accogliere il bisogno di sicurezza che c'e' dietro."),

 (8,"chiaro",0,"L'ambiente protesico: un ambiente che compensa i deficit, come una protesi compensa un arto. Segnaletica con immagini, orologi e calendari ben visibili."),
 (8,"chiaro",0,"Colori contrastanti: una tavoletta colorata su una ceramica bianca aiuta a riconoscere il water. Illuminazione uniforme, senza zone d'ombra che spaventano."),
 (8,"chiaro",0,"Percorsi sicuri, dove si puo' camminare liberamente. Pochi rumori, oggetti personali. Nelle strutture, i nuclei Alzheimer sono progettati con questi criteri."),

 (9,"chiaro",0,"I farmaci. Esistono farmaci per i sintomi cognitivi, in alcune forme e stadi, su indicazione specialistica. Ma il punto da sapere riguarda gli antipsicotici."),
 (9,"chiaro",0,"Usati per agitazione e aggressivita', nell'anziano con demenza aumentano il rischio di mortalita' e di ictus, come segnalato dalle autorita' regolatorie."),
 (9,"chiaro",0,"Si usano solo se necessario, alla dose minima, per il tempo piu' breve, con rivalutazione periodica. Nei corpi di Lewy, con estrema cautela. E le benzodiazepine aumentano cadute e confusione."),

 (10,"chiaro",0,"Il caregiver: un coniuge anziano, o un figlio. Spesso e' l'unica risorsa della persona, e fragile a sua volta. Il carico e' fisico, emotivo, economico, sociale, e si puo' valutare con scale come quella di Zarit."),
 (10,"chiaro",0,"Il rischio e' il burnout, la depressione, l'isolamento. I supporti: informazione e formazione, gruppi di sostegno, centri diurni, associazioni."),
 (10,"chiaro",0,"E i ricoveri di sollievo, brevi periodi in struttura che permettono al familiare di riposare. Il principio: anche il caregiver e' una persona da assistere."),

 (11,"chiaro",0,"La sicurezza. Il wandering puo' portare la persona ad allontanarsi: braccialetti identificativi, controllo degli accessi, una foto aggiornata. Il camminare in se' non va impedito: va reso sicuro."),
 (11,"chiaro",0,"Le cadute, i farmaci a portata di mano, i fornelli, la guida dell'auto. E la disfagia e la malnutrizione nelle fasi avanzate, con le regole della lezione tre punto tre."),
 (11,"chiaro",0,"E la contenzione, che non risolve: aumenta l'agitazione, le cadute e le lesioni, come nella lezione tre punto uno. La sicurezza si costruisce con l'ambiente e con la presenza."),

 (12,"chiaro",0,"Il caso. Una signora con demenza moderata, da stasera molto agitata: grida, cerca di alzarsi. Non evacua da quattro giorni. Un collega propone un sedativo."),
 (12,"chiaro",0,"Che cosa fai? Cerchi la causa prima del farmaco. Il dolore, con la PAINAD. La stipsi, che qui e' un indizio forte. La ritenzione urinaria. Un'infezione con delirium sovrapposto."),
 (12,"chiaro",0,"Riduci gli stimoli, usi un tono calmo, chiedi se possibile la presenza di un familiare. E segnali al medico i possibili fattori."),
 (12,"chiaro",0,"Il sedativo, se arriva, arriva dopo: non al posto della ricerca della causa. Sedare senza cercare lascia il problema dov'e', e aggiunge il rischio di cadute."),

 (13,"chiaro",0,"In Veneto la diagnosi e la presa in carico passano dai Centri per i Disturbi Cognitivi e Demenze, i CDCD: i centri specialistici di riferimento, dove si fa la diagnosi e si imposta la terapia."),
 (13,"chiaro",0,"Sul territorio, centri diurni, nuclei Alzheimer nei Centri di Servizi e ricoveri di sollievo, attivabili con l'UVMD. E le associazioni dei familiari. All'orale, citare CDCD e sollievo mostra di conoscere la rete."),

 (14,"chiaro",0,"La tabella. Alzheimer: memoria recente. Vascolare: a gradini. Corpi di Lewy: allucinazioni visive e ipersensibilita' agli antipsicotici. BPSD: agitazione, wandering, sundowning."),
 (14,"chiaro",0,"Il comportamento comunica un bisogno: dolore, stipsi, ritenzione, infezione. Non farmacologico come prima scelta. Non contraddire, rispondere all'emozione. Antipsicotici: rischio di mortalita' e ictus."),

 (15,"profondo",1.2,"[serious] Si perde la memoria, non la dignita' ne' le emozioni."),
 (15,"chiaro",0,"La persona puo' non ricordare chi le ha fatto la medicazione. Ma ricordera' come si e' sentita. Le emozioni sono la parte che resta, ed e' li' che lavora l'assistenza."),

 (16,"chiaro",0,"[warm] Nella prossima lezione: la salute mentale, con il trattamento sanitario obbligatorio e le sue regole: che cosa si puo' fare senza consenso, e con quali garanzie."),
 (16,"chiaro",0,"La gestione dell'agitazione, il rischio suicidario e le dipendenze, con le domande che all'orale tornano piu' spesso. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"Le forme",3:"Gli stadi",4:"I disturbi del comportamento",5:"Il comportamento ha un significato",6:"Gli approcci non farmacologici",
 7:"La comunicazione",8:"L'ambiente protesico",9:"I farmaci",10:"Il caregiver",11:"La sicurezza",12:"Il caso",13:"In Veneto",14:"La tabella",15:"La frase della lezione",16:"Chiusura"}

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
