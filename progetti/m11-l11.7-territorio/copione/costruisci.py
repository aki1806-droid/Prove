# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Il futuro dell'assistenza sanitaria si gioca sempre di piu' fuori dall'ospedale. Il decreto ministeriale settantasette del duemilaventidue ha ridisegnato l'assistenza territoriale."),
 (1,"chiaro",0,"Con strutture nuove, e con una figura che riguarda direttamente chi si prepara a questo concorso: l'infermiere di famiglia e comunita'."),
 (1,"chiaro",0,"I concorsi chiedono gli standard, con i numeri. E in Veneto anche i servizi propri della regione, che all'orale fanno la differenza."),

 (2,"chiaro",0,"Il DM settantasette definisce i modelli e gli standard dell'assistenza territoriale, ed e' collegato alla Missione sei del PNRR, quella dedicata alla salute."),
 (2,"chiaro",0,"Gli obiettivi: la prossimita', cioe' cure vicine a dove la persona vive. La presa in carico. L'integrazione socio-sanitaria. La continuita' fra ospedale e territorio."),
 (2,"chiaro",0,"L'articolazione organizzativa di riferimento e' il distretto, indicativamente uno ogni centomila abitanti."),

 (3,"chiaro",0,"La Casa della Comunita': un luogo fisico di prossimita', punto di riferimento per la popolazione. Lo standard prevede una Casa hub ogni quaranta, cinquantamila abitanti, con case spoke collegate."),
 (3,"chiaro",0,"Vi lavorano equipe multiprofessionali: medici di medicina generale, pediatri, specialisti, infermieri di famiglia e comunita', assistenti sociali."),
 (3,"chiaro",0,"Ospita il punto unico di accesso ai servizi socio-sanitari, il PUA, servizi diagnostici di base, attivita' di prevenzione e la presa in carico della cronicita'."),

 (4,"chiaro",0,"L'infermiere di famiglia e comunita', con lo standard da ricordare: uno ogni tremila abitanti. E' il professionista di riferimento per la salute della persona, della famiglia e della comunita'."),
 (4,"chiaro",0,"Lavora in ambulatorio, a domicilio e nella comunita': scuole, associazioni, luoghi di lavoro. Non aspetta che la persona arrivi: la va a cercare."),
 (4,"chiaro",0,"Si occupa di prevenzione e promozione della salute, di cronicita' e fragilita', di educazione e self-care, di medicina di iniziativa. Con il medico di medicina generale e i servizi sociali, anche in telemedicina."),
 (4,"chiaro",0,"E' l'applicazione concreta di molto di cio' che abbiamo visto nella lezione precedente: l'allenatore della cronicita' ha un nome e uno standard."),

 (5,"chiaro",0,"L'Ospedale di Comunita': una struttura di ricovero breve della rete territoriale. Lo standard: uno da venti posti letto ogni centomila abitanti."),
 (5,"chiaro",0,"E' a gestione prevalentemente infermieristica, con la responsabilita' clinica affidata a un medico. Accoglie chi non ha bisogno dell'ospedale, ma non puo' essere assistito a casa."),
 (5,"chiaro",0,"Per esempio un anziano dimesso che deve recuperare autonomia, o una riacutizzazione lieve. La degenza e' breve, indicativamente fino a circa trenta giorni, e l'obiettivo e' il rientro a domicilio."),

 (6,"chiaro",0,"La Centrale Operativa Territoriale, la COT: una ogni centomila abitanti. Gestisce le transizioni della persona fra un setting e l'altro: dall'ospedale al domicilio, all'Ospedale di Comunita', a una struttura."),
 (6,"profondo",1.2,"[serious] La COT non cura: coordina."),
 (6,"chiaro",0,"Raccorda servizi e professionisti, e' operativa sette giorni su sette, e vi lavorano soprattutto infermieri. Ricordi la dimissione protetta della lezione nove punto sette: e' la COT che la organizza."),

 (7,"chiaro",0,"Le altre componenti. L'Unita' di Continuita' Assistenziale, l'UCA: un medico e un infermiere ogni centomila abitanti, per le situazioni di particolare complessita'."),
 (7,"chiaro",0,"Il centosedici centodiciassette, il numero europeo armonizzato per le cure mediche non urgenti. Da non confondere con il centododici e il centodiciotto dell'emergenza."),
 (7,"chiaro",0,"Poi la rete delle cure palliative, i consultori familiari e l'assistenza domiciliare. Un obiettivo del DM da citare: portare una quota importante degli ultrasessantacinquenni in assistenza domiciliare."),

 (8,"chiaro",0,"Due sigle da non confondere. L'ADI, Assistenza Domiciliare Integrata: prestazioni sanitarie e socio-sanitarie a casa, con infermieri, medici, fisioterapisti, OSS."),
 (8,"chiaro",0,"Con un piano assistenziale individuale e livelli di intensita' diversi. E' di competenza dell'azienda sanitaria."),
 (8,"chiaro",0,"Il SAD, Servizio di Assistenza Domiciliare: prestazioni socio-assistenziali, cioe' igiene, aiuto in casa, pasti, compagnia. E' dei Comuni. La persona fragile spesso ha bisogno di entrambi, integrati."),

 (9,"chiaro",0,"Il sistema veneto ha strumenti propri. L'UVMD, l'Unita' di Valutazione Multidimensionale Distrettuale: un'equipe con medico di medicina generale, medico del distretto, assistente sociale, infermiere."),
 (9,"chiaro",0,"Valuta i bisogni della persona non autosufficiente con la scheda SVaMA, che esplora gli aspetti sanitari, cognitivi, funzionali e sociali."),
 (9,"chiaro",0,"L'UVMD definisce il progetto personalizzato, ed e' la porta d'accesso ai servizi: ADI, centri diurni, ricoveri di sollievo, residenzialita'."),

 (10,"chiaro",0,"I Centri di Servizi: in Veneto si chiamano cosi' le strutture residenziali per anziani non autosufficienti, quelle che altrove si chiamano RSA."),
 (10,"chiaro",0,"Vi si accede dopo la valutazione UVMD, con un'impegnativa di residenzialita', che riconosce una quota sanitaria a carico del Servizio Sanitario Regionale."),
 (10,"chiaro",0,"La quota alberghiera resta a carico della persona o, se necessario, del Comune. Poi ci sono i centri diurni. Sono strutture accreditate, e vi lavorano molti infermieri."),

 (11,"chiaro",0,"Tutto converge nella continuita' assistenziale. La dimissione protetta della lezione nove punto sette segue un percorso: valutazione precoce in reparto, segnalazione alla COT, valutazione UVMD se serve."),
 (11,"chiaro",0,"Poi la scelta del setting: casa con ADI, Ospedale di Comunita', riabilitazione, Centro di Servizi. La lettera infermieristica, e la presa in carico dell'infermiere di famiglia e comunita'."),
 (11,"chiaro",0,"L'obiettivo e' che non ci sia nessun vuoto fra l'ospedale e la casa. E' nei vuoti che la persona fragile si perde, e torna in pronto soccorso."),

 (12,"chiaro",0,"Il caso. Un uomo di settantanove anni, vive con la moglie anziana, dimissione dopo uno scompenso. Non fa piu' le scale, non si lava da solo, e la moglie non riesce ad aiutarlo."),
 (12,"chiaro",0,"Che cosa fai? Segnali per tempo la necessita' di una dimissione protetta, e attivi la COT secondo procedura. Non il giorno della dimissione: appena il bisogno e' chiaro."),
 (12,"chiaro",0,"Con l'UVMD si valuta il percorso piu' adatto: un periodo in Ospedale di Comunita' per recuperare autonomia, oppure il rientro a casa con ADI, ausili e SAD per l'igiene."),
 (12,"chiaro",0,"Compili la lettera infermieristica, educhi al controllo del peso e attivi l'infermiere di famiglia e comunita'. E consideri la moglie: anche lei e' una persona fragile."),

 (13,"chiaro",0,"Le competenze dell'infermiere sul territorio. Autonomia decisionale, perche' a domicilio non c'e' un medico nella stanza accanto. Valutazione multidimensionale, lavoro in rete, educazione e coaching."),
 (13,"chiaro",0,"Dispositivi e lesioni a domicilio, i bisogni della comunita', la telemedicina, e il fascicolo sanitario elettronico. Sono le competenze di tutto questo corso, fuori dall'ospedale."),

 (14,"chiaro",0,"In Veneto l'assistenza territoriale e' organizzata nelle nove ULSS, con i loro distretti. La regione sta realizzando Case della Comunita', Ospedali di Comunita' e COT, in attuazione del DM settantasette e del PNRR."),
 (14,"chiaro",0,"Con l'infermiere di famiglia e comunita', gli strumenti veneti, UVMD, SVaMA, Centri di Servizi, e il coordinamento di Azienda Zero. Lo approfondiremo nel modulo tredici."),

 (15,"chiaro",0,"La tabella degli standard, da fotografare. DM settantasette del duemilaventidue, Missione sei del PNRR. Distretto, circa uno ogni centomila. Casa della Comunita' hub, una ogni quaranta, cinquantamila."),
 (15,"chiaro",0,"Infermiere di famiglia e comunita', uno ogni tremila. Ospedale di Comunita', venti posti letto ogni centomila, a gestione infermieristica. COT, una ogni centomila."),
 (15,"chiaro",0,"UCA, un medico e un infermiere ogni centomila. Centosedici centodiciassette per le cure non urgenti. ADI dell'azienda sanitaria, SAD dei Comuni. In Veneto: UVMD, SVaMA, Centri di Servizi."),

 (16,"profondo",1.2,"[serious] La casa come primo luogo di cura."),
 (16,"chiaro",0,"E' lo spirito del DM settantasette. L'ospedale resta essenziale per l'acuzie, ma la salute delle persone si costruisce e si mantiene soprattutto dove vivono."),

 (17,"chiaro",0,"[warm] Nella prossima lezione ricomponiamo il modulo undici con una mappa dei servizi: per ogni persona e ogni bisogno, dove viene assistita e da chi. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"Il DM 77/2022",3:"La Casa della Comunita'",4:"L'infermiere di famiglia e comunita'",5:"L'Ospedale di Comunita'",6:"La Centrale Operativa Territoriale",
 7:"Le altre componenti",8:"ADI e SAD",9:"UVMD e SVaMA",10:"I Centri di Servizi",11:"Dimissioni protette e continuita'",12:"Il caso",
 13:"Le competenze sul territorio",14:"In Veneto",15:"La tabella degli standard",16:"La frase della lezione",17:"Chiusura"}

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
