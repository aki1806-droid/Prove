# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Le risorse della sanita' sono pubbliche, e sono limitate. Capire da dove arrivano e come vengono distribuite aiuta a capire molte cose che vedi ogni giorno in reparto."),
 (1,"chiaro",0,"Perche' un'azienda definisce un budget, perche' si misura la durata della degenza, perche' si parla di appropriatezza. E l'infermiere gestisce ogni giorno tempo, materiali, farmaci, posti letto."),
 (1,"chiaro",0,"Sono tutte risorse, e le scelte dell'infermiere su ciascuna di queste hanno anche un peso economico. Vediamo allora da dove arrivano i soldi, e dove vanno."),

 (2,"chiaro",0,"Le risorse del Servizio Sanitario Nazionale vengono soprattutto dalla fiscalita' generale: imposte nazionali e regionali, come l'IRAP e l'addizionale regionale all'IRPEF, e una compartecipazione all'IVA."),
 (2,"chiaro",0,"A queste si aggiungono le entrate proprie delle aziende sanitarie: i ticket pagati dai cittadini, e l'attivita' libero-professionale."),
 (2,"chiaro",0,"Ogni anno lo Stato fissa, con la legge di bilancio, il fabbisogno sanitario nazionale standard: la somma complessiva destinata al finanziamento del Servizio Sanitario Nazionale."),

 (3,"chiaro",0,"Il fondo viene poi ripartito fra le Regioni, con un'intesa in Conferenza Stato-Regioni. Il criterio principale e' la popolazione pesata per eta', perche' una popolazione piu' anziana consuma piu' risorse."),
 (3,"chiaro",0,"A questo si aggiungono altri indicatori. E con il decreto legislativo sessantotto del duemilaundici sono arrivati i costi standard, che prendono come riferimento le Regioni piu' efficienti."),
 (3,"chiaro",0,"Sono le cosiddette regioni benchmark, e il Veneto e' stato piu' volte fra queste. Le Regioni, a loro volta, ripartiscono poi le risorse fra le proprie aziende sanitarie."),

 (4,"chiaro",0,"Ora il cuore della lezione: i DRG, Diagnosis Related Groups. Un sistema di classificazione dei ricoveri in gruppi omogenei per consumo di risorse."),
 (4,"chiaro",0,"Ogni ricovero viene attribuito a un DRG in base alla diagnosi principale, agli interventi, all'eta', alle complicanze e alla modalita' di dimissione."),
 (4,"chiaro",0,"Sono informazioni prese dalla scheda di dimissione ospedaliera, la SDO. E a ogni DRG corrisponde una tariffa. La catena da ricordare e': SDO, DRG, tariffa."),
 (4,"chiaro",0,"Introdotti in Italia dalla meta' degli anni Novanta, i DRG hanno sostituito il finanziamento a pie' di lista, basato sulla spesa storica, con un pagamento per prestazione."),

 (5,"chiaro",0,"Gli effetti. I DRG incentivano l'efficienza e la riduzione della degenza media, perche' la tariffa e' fissa, indipendentemente dai giorni di ricovero."),
 (5,"chiaro",0,"Ma comportano dei rischi: dimissioni precoci, selezione dei casi piu' convenienti, codifiche opportunistiche, frammentazione dei ricoveri. Per questo esistono i controlli di appropriatezza sulle SDO."),
 (5,"profondo",1.2,"[serious] La SDO deve essere completa e accurata."),
 (5,"chiaro",0,"E qui entra l'infermiere: una documentazione infermieristica precisa, per esempio di una lesione da pressione o di un'infezione, contribuisce a descrivere correttamente la complessita' del ricovero."),

 (6,"chiaro",0,"Fuori dal ricovero, l'attivita' di specialistica ambulatoriale e' remunerata secondo i nomenclatori tariffari, che elencano le prestazioni con la loro tariffa."),
 (6,"chiaro",0,"I nuovi nomenclatori previsti dai LEA del duemiladiciassette sono entrati in vigore alla fine del duemilaventiquattro. E le Regioni possono definire tariffe proprie, entro i limiti nazionali."),

 (7,"chiaro",0,"Dentro l'azienda, lo strumento di gestione e' il budget: la direzione negozia con ogni struttura gli obiettivi, di attivita', qualita', appropriatezza e costi, e le risorse per l'anno."),
 (7,"chiaro",0,"Il controllo di gestione ne monitora l'andamento durante l'anno, attraverso i centri di costo, gli indicatori e i report periodici."),
 (7,"chiaro",0,"Gli obiettivi di budget si collegano alla valutazione della performance, e quindi a una parte della retribuzione. Anche l'infermiere partecipa: per esempio con obiettivi sulla prevenzione delle cadute o delle lesioni."),

 (8,"chiaro",0,"La spesa farmaceutica e' soggetta a tetti fissati per legge, espressi in percentuale del fabbisogno sanitario. Le percentuali cambiano spesso con le leggi di bilancio: conta il meccanismo."),
 (8,"chiaro",0,"I tetti sono distinti: la spesa convenzionata, cioe' quella delle farmacie, e la spesa per acquisti diretti, cioe' l'ospedale e la distribuzione diretta e per conto."),
 (8,"chiaro",0,"Se i tetti vengono superati, scattano i meccanismi di payback, a carico delle aziende farmaceutiche. E l'AIFA classifica i farmaci e ne negozia il prezzo."),
 (8,"chiaro",0,"Gli strumenti di contenimento: i farmaci equivalenti, i biosimilari, e la centralizzazione degli acquisti, che in Veneto e' affidata ad Azienda Zero."),

 (9,"chiaro",0,"I piani di rientro riguardano le Regioni con disavanzi sanitari strutturali. La Regione sottoscrive un accordo con i Ministeri della Salute e dell'Economia, e adotta misure di riequilibrio."),
 (9,"chiaro",0,"Riorganizzazione, riduzione dei costi, aumento delle imposte regionali. Nei casi piu' gravi, il commissariamento della sanita' regionale. Da ricordare: il Veneto non e' sottoposto a piano di rientro."),

 (10,"chiaro",0,"Poi il PNRR, il Piano Nazionale di Ripresa e Resilienza, con la Missione sei, dedicata alla salute. Vale circa quindici virgola sei miliardi, ed e' divisa in due componenti."),
 (10,"chiaro",0,"La prima: reti di prossimita', strutture e telemedicina per l'assistenza territoriale. Case della Comunita', COT, Ospedali di Comunita', assistenza domiciliare, telemedicina."),
 (10,"chiaro",0,"Sono gli strumenti del DM settantasette, visti nella lezione undici punto sette. La seconda: innovazione, ricerca e digitalizzazione. Ammodernamento degli ospedali, Fascicolo Sanitario Elettronico, formazione."),
 (10,"chiaro",0,"[thoughtful] Un punto che si sente spesso nei dibattiti: il PNRR finanzia soprattutto investimenti, cioe' strutture e tecnologie. Il personale che le fa funzionare va pagato con le risorse ordinarie."),

 (11,"chiaro",0,"Tre parole da distinguere. Efficacia: raggiungere il risultato di salute. Efficienza: il rapporto fra le risorse impiegate e i risultati ottenuti. Economicita': l'equilibrio fra costi e ricavi nel tempo."),
 (11,"chiaro",0,"Non sono in contrapposizione con la qualita'. In un sistema con risorse limitate, ogni spreco ha un prezzo, e quel prezzo non lo paga un'astrazione."),
 (11,"profondo",1.2,"[serious] Lo spreco toglie risorse ad altri pazienti."),
 (11,"chiaro",0,"Un dispositivo aperto e non usato, un esame ripetuto senza motivo, una degenza prolungata per un'organizzazione inefficiente: sono tutti costi per la collettivita'."),

 (12,"chiaro",0,"[curious] La domanda tipo: che cosa sono i DRG, e quali effetti hanno sull'organizzazione dell'assistenza? Proviamo a rispondere come all'orale."),
 (12,"chiaro",0,"Sono un sistema di classificazione dei ricoveri in gruppi omogenei per consumo di risorse, basato sui dati della SDO, a cui corrisponde una tariffa. Hanno sostituito il finanziamento a pie' di lista."),
 (12,"chiaro",0,"Incentivano l'efficienza e la riduzione della degenza media, ma possono favorire dimissioni precoci, e per questo richiedono controlli di appropriatezza."),
 (12,"chiaro",0,"Poi il collegamento infermieristico: dimissioni piu' rapide richiedono una pianificazione precoce della dimissione, e una continuita' con il territorio, come nella lezione nove punto sette."),

 (13,"chiaro",0,"L'infermiere e le risorse. Prima di tutto, l'uso appropriato di dispositivi e materiali. Poi la prevenzione degli eventi avversi."),
 (13,"chiaro",0,"Una lesione da pressione, una caduta con frattura, un'infezione da catetere: sono sofferenza per il paziente, e sono anche costi evitabili, spesso molto alti."),
 (13,"chiaro",0,"Poi la documentazione accurata, la gestione delle scorte, la partecipazione agli obiettivi di budget. E il Codice deontologico, che richiama l'infermiere a un uso responsabile delle risorse."),

 (14,"chiaro",0,"In Veneto la gestione sanitaria accentrata, cioe' la parte del finanziamento gestita direttamente a livello regionale, e' affidata ad Azienda Zero, che gestisce anche gli acquisti centralizzati."),
 (14,"chiaro",0,"Lo fa attraverso la CRAV, la Centrale Regionale Acquisti. E il Veneto e' stato piu' volte fra le regioni di riferimento per i costi standard. Lo vedremo nella lezione tredici punto due."),

 (15,"chiaro",0,"La tabella, da fotografare. Fiscalita' generale. Fabbisogno sanitario nazionale standard. Riparto per popolazione pesata. Costi standard e regioni benchmark. DRG: ricoveri, SDO, tariffa."),
 (15,"chiaro",0,"Budget e controllo di gestione. Tetti di spesa farmaceutica e payback. Piani di rientro. PNRR Missione sei, con due componenti. Efficacia, efficienza, economicita'."),

 (16,"chiaro",0,"[warm] Prossima lezione: il rapporto di lavoro dell'infermiere dipendente pubblico. Il contratto collettivo del Comparto Sanita', gli obblighi di comportamento, l'anticorruzione, il procedimento disciplinare. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"Da dove arrivano le risorse",3:"Il riparto fra le Regioni",4:"I DRG",5:"Effetti e limiti dei DRG",6:"Le tariffe ambulatoriali",
 7:"Budget e controllo di gestione",8:"La spesa farmaceutica",9:"I piani di rientro",10:"Il PNRR, Missione 6",11:"Efficacia, efficienza, economicita'",
 12:"Il caso d'esame",13:"L'infermiere e le risorse",14:"In Veneto",15:"La tabella",16:"Chiusura"}

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
