# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Nella lezione undici punto sette hai visto gli standard nazionali del DM settantasette, quelli dell'assistenza territoriale. Qui vediamo come il Veneto li applica."),
 (1,"chiaro",0,"Partendo da un'esperienza che la Regione aveva gia' costruito prima del decreto: le medicine di gruppo integrate, le cure intermedie, l'integrazione con il sociale."),
 (1,"chiaro",0,"Per molti candidati il futuro lavoro sara' proprio sul territorio. Per questo conviene conoscerne bene i servizi, i percorsi e le parole."),

 (2,"chiaro",0,"Il distretto socio-sanitario e' l'articolazione territoriale dell'Azienda ULSS, diretta da un direttore di distretto. In Veneto e' il perno dell'integrazione fra sanitario e sociale."),
 (2,"chiaro",0,"Con la legge regionale diciannove del duemilasedici le ULSS sono passate da ventuno a nove, e i territori delle vecchie aziende sono diventati i distretti delle nuove."),
 (2,"chiaro",0,"Le funzioni del distretto. L'assistenza primaria, con i medici e i pediatri di famiglia. La continuita' assistenziale. La specialistica ambulatoriale. L'assistenza domiciliare. I consultori."),
 (2,"chiaro",0,"La residenzialita' e la semiresidenzialita'. E l'integrazione con i servizi sociali dei Comuni, che in Veneto possono delegare alle ULSS la gestione dei servizi socio-sanitari."),
 (2,"chiaro",0,"E come per l'ospedale, esistono le schede di dotazione territoriale, approvate con delibera della Giunta, che definiscono l'offerta di ogni territorio."),

 (3,"chiaro",0,"Le forme associative della medicina generale. A livello nazionale, la legge centottantanove del duemiladodici ha previsto le AFT, Aggregazioni Funzionali Territoriali, e le UCCP, Unita' Complesse di Cure Primarie."),
 (3,"chiaro",0,"In Veneto il modello caratteristico e' la Medicina di Gruppo Integrata, la MGI: piu' medici di famiglia lavorano in una sede comune, insieme a infermieri e personale di studio."),
 (3,"chiaro",0,"Con un'apertura giornaliera estesa, e con la presa in carico delle persone con malattie croniche secondo i PDTA, i percorsi diagnostico terapeutici assistenziali."),
 (3,"chiaro",0,"E l'infermiere della medicina di gruppo? Gestisce gli ambulatori della cronicita', fa educazione, medicazioni e follow-up. Segue le stesse persone nel tempo, accanto al loro medico di famiglia."),

 (4,"chiaro",0,"Le cure intermedie: strutture che si collocano fra l'ospedale e il domicilio. Il Veneto le aveva sviluppate gia' prima del DM settantasette."),
 (4,"chiaro",0,"Sono gli Ospedali di Comunita', le Unita' Riabilitative Territoriali, le URT, e gli hospice. Il territorio e le cure intermedie sono anche un tema del Piano Socio Sanitario Regionale."),
 (4,"chiaro",0,"Accolgono pazienti che non hanno piu' bisogno dell'ospedale per acuti, ma non possono ancora tornare a casa. L'accesso e' programmato, spesso tramite la COT."),

 (5,"chiaro",0,"L'attuazione del DM settantasette in Veneto. Le Case della Comunita', realizzate con i fondi del PNRR, il Piano Nazionale di Ripresa e Resilienza."),
 (5,"chiaro",0,"Nel duemilaventisei la Regione ha approvato le linee di indirizzo per la loro attivazione, con indicazioni sul punto unico di accesso, sull'integrazione con gli altri servizi e sulla presa in carico."),
 (5,"chiaro",0,"Gli Ospedali di Comunita', che in Veneto non nascono da zero: il decreto serve a potenziare una rete che esisteva gia'."),
 (5,"chiaro",0,"Le COT, una per distretto, secondo lo standard di una ogni centomila abitanti. Coordinano le transizioni del paziente fra un setting e l'altro: ospedale, strutture intermedie, domicilio."),
 (5,"chiaro",0,"E poi l'infermiere di famiglia e comunita', e la telemedicina, che si sviluppa su piattaforme regionali e nazionali, con gli investimenti del PNRR, soprattutto per i pazienti cronici."),

 (6,"chiaro",0,"L'infermiere di famiglia e comunita' in Veneto lavora secondo lo standard del DM settantasette, uno ogni tremila abitanti: in ambulatorio, a domicilio e nella comunita', con le medicine di gruppo e i medici di famiglia."),
 (6,"chiaro",0,"Prende in carico la fragilita' e la cronicita'. E fa prevenzione e promozione della salute: non lavora solo su chi e' gia' malato, ma anche su chi rischia di diventarlo."),
 (6,"chiaro",0,"Si raccorda con la COT, con l'ADI e con i servizi sociali. E' una delle domande d'orale piu' probabili del modulo: preparane una risposta di un minuto."),

 (7,"chiaro",0,"La continuita' assistenziale, l'ex guardia medica, copre le ore in cui il medico di famiglia non c'e': le notti, i prefestivi e i festivi."),
 (7,"chiaro",0,"Il numero uno uno sei, uno uno sette e' il numero europeo per le cure mediche non urgenti. E' previsto dal DM settantasette, ed e' attivato progressivamente nelle Regioni."),
 (7,"chiaro",0,"Non sostituisce il centodiciotto: per le emergenze, il numero resta quello. Due numeri da non confondere, uno per le cure non urgenti, l'altro per l'emergenza."),

 (8,"chiaro",0,"L'assistenza domiciliare integrata, l'ADI, si basa su un piano assistenziale individuale, definito dopo una valutazione multidimensionale."),
 (8,"chiaro",0,"Ha livelli di intensita' diversi, e un'equipe fatta di infermieri, medici, fisioterapisti, OSS e specialisti, che porta l'assistenza nella casa della persona."),
 (8,"chiaro",0,"Le cure palliative domiciliari sono garantite dai Nuclei di Cure Palliative. E l'ADI si integra con il SAD dei Comuni, per la parte sociale dell'assistenza."),
 (8,"chiaro",0,"E c'e' un obiettivo nazionale: aumentare la quota di anziani, le persone sopra i sessantacinque anni, assistiti a domicilio. In una regione fra le piu' anziane d'Italia, come il Veneto, e' un obiettivo che pesa."),

 (9,"chiaro",0,"Le dimissioni protette in Veneto seguono un percorso che conosci dalle lezioni nove punto sette e undici punto sette. Si parte da una segnalazione precoce, fatta dal reparto."),
 (9,"chiaro",0,"La COT organizza il percorso. Se necessario valuta l'UVMD, l'Unita' di Valutazione Multidimensionale Distrettuale, che vedremo nella prossima lezione."),
 (9,"chiaro",0,"Poi si individua il setting: il domicilio con l'ADI, l'Ospedale di Comunita', l'Unita' Riabilitativa Territoriale, l'hospice, oppure il Centro di Servizi."),
 (9,"chiaro",0,"La lettera infermieristica accompagna il paziente, e il territorio lo prende in carico. All'orale puoi dirlo cosi': quando dimetto un paziente fragile, segnalo il caso alla COT per una dimissione protetta."),

 (10,"chiaro",0,"[thoughtful] Un elemento caratteristico del Veneto, che hai gia' incontrato nella lezione undici punto sei: la stratificazione della popolazione per livello di rischio e di bisogno."),
 (10,"chiaro",0,"Si fa con sistemi come l'ACG, e serve a individuare chi ha piu' bisogno di presa in carico. Cronicita' e stratificazione sono fra i temi del Piano Socio Sanitario Regionale."),
 (10,"chiaro",0,"La stratificazione orienta la medicina di iniziativa, i PDTA, il telemonitoraggio e i programmi per la fragilita' verso le persone giuste. Non si aspetta il paziente: lo si va a cercare."),

 (11,"chiaro",0,"[curious] Il caso. Una donna di ottantuno anni, con BPCO e scompenso, seguita da una medicina di gruppo. Negli ultimi tre mesi e' arrivata due volte in pronto soccorso."),
 (11,"chiaro",0,"Che cosa si puo' fare sul territorio? La presa in carico proattiva, da parte dell'infermiere della medicina di gruppo o dell'infermiere di famiglia e comunita'."),
 (11,"chiaro",0,"Si organizzano controlli programmati secondo i PDTA, e l'educazione al monitoraggio dei sintomi e del peso. Il telemonitoraggio, se disponibile. La verifica dell'aderenza alla terapia."),
 (11,"chiaro",0,"E se necessario, l'attivazione dell'ADI. L'obiettivo e' intercettare il peggioramento prima del pronto soccorso: e' la medicina di iniziativa, applicata a una persona."),

 (12,"chiaro",0,"Le parole del territorio, da usare all'orale. Prossimita'. Presa in carico. Medicina di iniziativa. Continuita'. Integrazione socio-sanitaria. Lavoro in rete. E la casa come primo luogo di cura."),

 (13,"chiaro",0,"Le sfide. Trovare il personale per far funzionare le nuove strutture, perche' il PNRR finanzia soprattutto gli edifici. E la carenza di medici di famiglia."),
 (13,"chiaro",0,"Poi l'integrazione dei sistemi informativi, e il coinvolgimento dei Comuni e del terzo settore. All'orale, citare le sfide con equilibrio mostra consapevolezza."),

 (14,"chiaro",0,"La tabella. Distretto socio-sanitario e schede di dotazione territoriale. AFT e UCCP, legge centottantanove del duemiladodici. Medicine di gruppo integrate. Cure intermedie: Ospedali di Comunita', URT, hospice."),
 (14,"chiaro",0,"Il DM settantasette in Veneto: Case della Comunita', COT, infermiere di famiglia e comunita'. Continuita' assistenziale e uno uno sei, uno uno sette. ADI e cure palliative domiciliari. Dimissioni protette. Stratificazione."),

 (15,"profondo",1.2,"[serious] Il territorio veneto non parte da zero. Il DM settantasette si innesta su una rete di medicine di gruppo, cure intermedie e integrazione socio-sanitaria gia' costruita negli anni."),

 (16,"chiaro",0,"[warm] Nella prossima lezione: la rete per la non autosufficienza, con i Centri di Servizi, l'UVMD, la SVaMA e le impegnative di cura. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"Il distretto socio-sanitario",3:"Le forme associative della medicina generale",4:"Le cure intermedie",
 5:"L'attuazione del DM 77 in Veneto",6:"L'infermiere di famiglia e comunita'",7:"La continuita' assistenziale e il 116117",
 8:"L'assistenza domiciliare",9:"Le dimissioni protette",10:"La stratificazione della popolazione",11:"Il caso d'esame",
 12:"Le parole del territorio",13:"Le sfide",14:"La tabella",15:"La frase della lezione",16:"Chiusura"}

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
