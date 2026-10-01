# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Le lesioni da pressione sono considerate un indicatore della qualita' dell'assistenza infermieristica: in gran parte sono prevenibili."),
 (1,"chiaro",0,"Le abbiamo gia' incontrate nella scala di Braden e nella mobilizzazione. Qui completiamo il quadro con la stadiazione, che e' la parte che i concorsi chiedono con maggiore precisione."),
 (1,"chiaro",0,"La stadiazione e' un linguaggio comune: chi dice stadio tre dice la stessa cosa in reparto, a domicilio e in sede d'esame. Per questo va imparata parola per parola."),

 (2,"chiaro",0,"La definizione internazionale, dell'NPIAP e dell'EPUAP: una lesione da pressione e' un danno localizzato della cute e dei tessuti sottostanti, di solito su una prominenza ossea o in relazione a un dispositivo medico."),
 (2,"chiaro",0,"Causato da pressione, o da pressione combinata con forze di taglio. Due parole da notare: dispositivo, perche' oggi molte lesioni nascono da sondini, maschere, tubi; e taglio, che abbiamo visto nella lezione tre punto due."),

 (3,"chiaro",0,"Le sedi dipendono dalla posizione. In posizione supina: sacro e talloni, le due sedi piu' frequenti, poi occipite, scapole, gomiti. Sul fianco: trocantere, malleoli, orecchio. Seduti: ischio."),
 (3,"chiaro",0,"E le lesioni da dispositivo: naso e orecchie per sondini e occhialini, il volto per le maschere della ventilazione non invasiva, le labbra per il tubo, la cute sotto collari, tutori e cateteri."),
 (3,"chiaro",0,"Ogni dispositivo va controllato e la sua cute ispezionata. Una maschera stretta per una notte lascia un segno che la Braden non aveva previsto."),

 (4,"chiaro",0,"La stadiazione NPIAP-EPUAP. Stadio uno: la cute e' integra, ma c'e' un eritema non sbiancante. Si verifica con la digitopressione."),
 (4,"chiaro",0,"Si preme con un dito, o con un vetrino trasparente, e se l'area non impallidisce il danno e' iniziato. Nella cute scura l'eritema puo' non vedersi: si valutano temperatura, consistenza e dolore."),
 (4,"chiaro",0,"Lo stadio uno e' il campanello d'allarme: da qui in poi si interviene subito sullo scarico. E' l'unico stadio in cui la cute e' ancora intera."),

 (5,"chiaro",0,"Stadio due: perdita di cute a spessore parziale, con il derma esposto. Il letto e' rosa o rosso, umido. Puo' presentarsi come una flittene a contenuto sieroso, integra o rotta."),
 (5,"chiaro",0,"Non si vedono tessuto adiposo, slough o escara: se ci sono, lo stadio e' piu' avanzato. Il letto rosa e umido e' un derma vivo, non un fondo da riempire."),
 (5,"chiaro",0,"E attenzione: le lesioni da umidita', come la dermatite da incontinenza, e le lesioni da adesivi non sono lesioni da pressione di stadio due, anche se possono somigliarvi."),

 (6,"chiaro",0,"Stadio tre: perdita di cute a spessore totale, con il tessuto adiposo visibile. Possono esserci slough, escara, sottominature e tunnel. Ma non si vedono fascia, muscolo, tendine o osso."),
 (6,"chiaro",0,"La profondita' varia molto con la sede: sul naso o sull'orecchio uno stadio tre e' sottile, sul sacro di una persona obesa puo' essere profondo. Lo stadio dice che cosa si vede, non quanti centimetri."),

 (7,"chiaro",0,"Stadio quattro: perdita a spessore totale con esposizione di fascia, muscolo, tendine, legamento, cartilagine o osso. Sono frequenti sottominature e tunnel, e c'e' il rischio di osteomielite."),
 (7,"chiaro",0,"La regola per distinguere il tre dal quattro e' semplice: nel quattro si vede qualcosa sotto l'adipe. Fascia, muscolo, tendine, legamento, cartilagine o osso: ne basta uno."),

 (8,"chiaro",0,"Due categorie oltre gli stadi. Non stadiabile: la perdita e' a spessore totale, ma il fondo e' coperto da slough o escara e non si puo' valutarne la profondita'."),
 (8,"chiaro",0,"Solo dopo la rimozione si sapra' se e' uno stadio tre o quattro. Danno dei tessuti profondi: un'area rosso scuro, marrone o violacea che non sbianca, o una flittene a contenuto ematico."),
 (8,"chiaro",0,"Il danno e' partito in profondita', vicino all'osso, e puo' evolvere rapidamente anche con ogni cura. Si vede la superficie, ma il danno sta sotto."),
 (8,"chiaro",0,"E una regola: un'escara secca e stabile al tallone, senza segni di infezione, non si rimuove: funziona da copertura naturale, soprattutto se la perfusione e' scarsa."),

 (9,"chiaro",0,"Due regole. La stadiazione non si percorre all'indietro: uno stadio quattro che si sta riempiendo di granulazione non diventa uno stadio tre, ma resta uno stadio quattro in guarigione."),
 (9,"chiaro",0,"Perche' i tessuti ricostruiti non sono uguali a quelli originali. Le lesioni da dispositivo si stadiano con lo stesso sistema; quelle delle mucose, invece, non si stadiano."),

 (10,"chiaro",0,"La diagnosi differenziale, che i concorsi chiedono. La dermatite associata a incontinenza: area perineale diffusa, con margini sfumati, superficiale, non legata a una prominenza ossea."),
 (10,"chiaro",0,"Le MARSI, lesioni cutanee da adesivi medicali: strappi e flittene da trazione causati da cerotti e medicazioni rimossi male. Le lesioni da frizione, o skin tear, nella cute fragile dell'anziano."),
 (10,"chiaro",0,"Nessuna di queste e' una lesione da pressione, e ognuna ha una prevenzione diversa: un prodotto barriera, un cerotto rimosso bene, una manovra piu' delicata."),

 (11,"chiaro",0,"La prevenzione comincia dalla valutazione: scala di Braden all'ingresso e a ogni variazione, ricordi la soglia di sedici della lezione due punto tre."),
 (11,"chiaro",0,"La rivalutazione non e' a scadenza: ogni variazione clinica, un intervento, una febbre, un peggioramento, riapre la Braden."),
 (11,"chiaro",0,"Ispezione quotidiana della cute, con attenzione a tutte le sedi a rischio e ai dispositivi, e valutazione nutrizionale. Tre gesti, ogni giorno, e la maggior parte delle lesioni non nasce."),

 (12,"chiaro",0,"Gli interventi. Riposizionamento programmato, con il decubito laterale a trenta gradi, come nella lezione tre punto due. Talloni sospesi, sollevati dal materasso."),
 (12,"chiaro",0,"Superfici di supporto: materassi in schiuma ad alta specificita' o viscoelastici per il rischio moderato, superfici dinamiche a pressione alternata per il rischio alto o quando la lesione e' gia' presente."),
 (12,"chiaro",0,"Ma nessuna superficie sostituisce il riposizionamento. Gestione del microclima e dell'umidita', con detergenti delicati e prodotti barriera."),
 (12,"chiaro",0,"Nutrizione adeguata in proteine e calorie, come nella lezione tre punto tre. Niente massaggi. E protezione della cute sotto i dispositivi, con medicazioni in schiuma dove indicato."),

 (13,"chiaro",0,"Il paziente seduto in poltrona o in carrozzina. Cuscino antidecubito specifico, mai a ciambella, che comprime i vasi intorno all'area e peggiora la perfusione."),
 (13,"chiaro",0,"Riposizionamento piu' frequente, ogni ora. Se la persona e' in grado, le si insegna a spostare il peso ogni quindici minuti. E i piedi ben appoggiati, per non scaricare tutto sugli ischi."),

 (14,"chiaro",0,"Il caso. Al sacro di un paziente allettato, Braden undici, compare un'area violacea non sbiancante su cute integra, dolente. Come la classifichi?"),
 (14,"chiaro",0,"Non e' uno stadio uno, che e' eritema rosso: e' un danno dei tessuti profondi. Che cosa fai? Scarico completo della sede, niente decubito supino, superficie dinamica, riposizionamento programmato."),
 (14,"chiaro",0,"Valutazione nutrizionale, gestione dell'umidita', documentazione con misure e foto, segnalazione secondo procedura: la lesione e' insorta in reparto, e si dichiara."),
 (14,"profondo",1.2,"[serious] E sorveglianza ravvicinata, perche' puo' evolvere rapidamente verso uno stadio tre o quattro."),

 (15,"chiaro",0,"In Veneto le lesioni da pressione sono monitorate come indicatore di qualita', con procedure aziendali di prevenzione e trattamento, la Braden integrata nella cartella elettronica."),
 (15,"chiaro",0,"E la segnalazione delle lesioni insorte durante la degenza. A domicilio, gli ausili antidecubito, materassi e cuscini, si ottengono tramite il distretto."),
 (15,"chiaro",0,"All'orale, collega sempre la prevenzione alla responsabilita': una lesione insorta in reparto con una Braden non compilata e' difficile da difendere."),

 (16,"chiaro",0,"La tabella da fotografare. Stadio uno: eritema non sbiancante su cute integra. Stadio due: spessore parziale, derma esposto, flittene sierosa. Stadio tre: spessore totale, adipe visibile."),
 (16,"chiaro",0,"Stadio quattro: esposizione di fascia, muscolo, tendine, osso. Non stadiabile: fondo coperto. Danno dei tessuti profondi: viola o marrone, flittene ematica."),

 (17,"chiaro",0,"Ricapitoliamo. Pressione, con o senza taglio, su prominenza ossea o dispositivo. Non si retrostadia. Escara secca e stabile al tallone: non si rimuove."),
 (17,"chiaro",0,"Dermatite da incontinenza e MARSI non sono lesioni da pressione. Niente ciambelle, niente massaggi. E la Braden compilata, sempre."),
 (17,"chiaro",0,"[warm] Nella prossima lezione: ulcere vascolari e piede diabetico. A tra poco."),
]

CAPITOLI = {1:"Apertura",2:"La definizione",3:"Le sedi",4:"Stadio 1",5:"Stadio 2",6:"Stadio 3",7:"Stadio 4",
 8:"Oltre gli stadi",9:"Due regole",10:"La diagnosi differenziale",11:"La prevenzione: valutare",12:"Gli interventi",
 13:"Il paziente seduto",14:"Il caso",15:"In Veneto",16:"La tabella",17:"Chiusura"}

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
