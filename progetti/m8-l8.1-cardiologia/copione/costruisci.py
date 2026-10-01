# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Chiudiamo il modulo sette. Al centro del riepilogo c'e' uno strumento: l'albero decisionale della medicazione, che collega la valutazione alla scelta."),
 (1,"chiaro",0,"Poi le tabelle, le sequenze di emergenza e le confusioni che costano piu' punti. E otto domande secche, per misurarsi: otto risposte che il quiz pretende in pochi secondi."),

 (2,"chiaro",0,"Sette lezioni: valutazione e TIME, lesioni da pressione e stadiazione, ulcere vascolari e piede diabetico, ferite chirurgiche ed eviscerazione, medicazioni avanzate e NPWT, stomie, drenaggi e drenaggio toracico."),
 (2,"chiaro",0,"Un filo comune: prima si valuta e si toglie la causa, poi si medica. E' la frase del modulo, e torna alla fine."),

 (3,"chiaro",0,"L'albero decisionale, in sette passi. Uno: valutare, con TIME, misure e foto, le ore dodici verso la testa. Due: la causa e' stata rimossa? Scarico, compressione se l'ABI lo consente, rivascolarizzazione, controllo glicemico."),
 (3,"chiaro",0,"Tre: il tessuto: se c'e' necrosi o slough, debridement, salvo l'escara stabile del tallone e l'arto ischemico, dove il tessuto rimosso non ricresce."),
 (3,"chiaro",0,"Quattro: l'infezione: se ci sono segni, antimicrobica, mai occlusiva, tampone dopo la detersione, sul tessuto vitale e non sul pus."),
 (3,"chiaro",0,"Cinque: l'umidita': secca, idrogel; essudante, alginato, idrofibra, schiuma. Sei: i margini e la cute intorno, da proteggere. Sette: rivalutare."),
 (3,"chiaro",0,"Sette passi, e il settimo riporta al primo: una lesione si rivaluta a ogni medicazione, perche' la risposta di oggi puo' non essere quella di domani."),

 (4,"chiaro",0,"La tabella delle lesioni da pressione. Uno: eritema non sbiancante. Due: spessore parziale, flittene sierosa. Tre: spessore totale, adipe visibile."),
 (4,"chiaro",0,"Quattro: fascia, muscolo, tendine, osso. Non stadiabile: fondo coperto. Danno dei tessuti profondi: viola o marrone, flittene ematica."),
 (4,"chiaro",0,"E non si retrostadia: uno stadio quattro che guarisce resta uno stadio quattro in guarigione, perche' i tessuti ricostruiti non sono quelli originali. Sei righe, e il quiz le chiede una per una."),

 (5,"chiaro",0,"Venosa contro arteriosa. Venosa: malleolo mediale, essudato, migliora sollevando, polsi presenti, e si tratta con la compressione, se l'ABI e' almeno zero virgola otto."),
 (5,"chiaro",0,"Arteriosa: dita, cute pallida, peggiora sollevando, polsi assenti, niente compressione e valutazione vascolare, perche' senza rivascolarizzazione spesso non guarisce."),
 (5,"chiaro",0,"ABI normale zero virgola nove-uno virgola tre; sotto zero virgola cinque compressione controindicata. E senza ABI, nessuna compressione."),

 (6,"chiaro",0,"Le sequenze di emergenza. Eviscerazione: aiuto, ginocchia flesse, garze sterili con fisiologica tiepida, non riposizionare, digiuno, chirurgo."),
 (6,"chiaro",0,"Stomia scura: chirurgo subito. Drenaggio toracico scollegato: estremita' in acqua sterile. Tubo estratto dal torace: medicazione occlusiva, medico. Pneumotorace iperteso: riconoscerlo, trachea deviata e ipotensione."),
 (6,"chiaro",0,"Cinque emergenze, e in quattro su cinque la risposta finisce con la stessa parola: medico, o chirurgo. La prima mossa e' quasi sempre dell'infermiere, la seconda non e' mai solo sua."),

 (7,"chiaro",0,"I numeri. Lesione cronica oltre quattro-sei settimane. Medicazione chirurgica sterile per quarantotto ore. Infezione del sito entro trenta o novanta giorni."),
 (7,"chiaro",0,"Punti: volto tre-cinque giorni, articolazioni quattordici o piu'. Deiscenza fra il quinto e il decimo giorno. Antimicrobiche per circa due settimane, poi si rivaluta."),
 (7,"chiaro",0,"NPWT intorno a meno centoventicinque, cambio ogni quarantotto-settantadue ore. Foro della placca due-tre millimetri piu' ampio. Ileostomia ad alta portata oltre uno virgola cinque-due litri."),
 (7,"chiaro",0,"Sono dieci numeri. Fermati, copiali nel quaderno, e riparti: il quiz li chiede tutti."),

 (8,"chiaro",0,"Le confusioni. Uno: l'infiammazione dei primi giorni non e' infezione. Due: l'odore del gel dell'idrocolloide non e' pus."),
 (8,"chiaro",0,"Tre: dermatite da incontinenza e MARSI non sono lesioni da pressione, e hanno una prevenzione diversa. Quattro: lo stadio uno e' rosso, il danno dei tessuti profondi e' viola, e il viola corre."),

 (9,"chiaro",0,"Cinque: colostomia a sinistra con feci formate, ileostomia a destra con feci liquide. Sei: l'irrigazione solo nella colostomia sinistra."),
 (9,"chiaro",0,"Sette: le bollicine nel sigillo idraulico indicano una perdita d'aria, il gorgogliamento nella camera di aspirazione e' normale."),
 (9,"chiaro",0,"Otto: l'assenza di oscillazione significa occlusione oppure polmone riespanso. Otto confusioni, otto punti che si perdono in un attimo e si recuperano con una lettura."),

 (10,"chiaro",0,"I casi. Area viola al sacro in Braden undici: danno dei tessuti profondi, scarico, superficie dinamica, sorveglianza. Ulcera malleolare e richiesta di compressione senza ABI: prima l'ABI."),
 (10,"chiaro",0,"Liquido rosato abbondante al sesto giorno dopo la laparotomia: deiscenza imminente, non si lascia il paziente, ginocchia flesse, chirurgo."),
 (10,"chiaro",0,"Stomia violacea in seconda giornata: chirurgo subito, sacca trasparente per guardarla. Clampare il drenaggio nel trasporto: no, sotto il torace e in verticale."),

 (11,"chiaro",2.0,"L'autovalutazione. Due domande alla volta, risposta secca. Uno: quale medicazione su una lesione secca o necrotica? Due: l'escara secca e stabile al tallone si rimuove?"),
 (11,"chiaro",0,"Uno: l'idrogel, che cede umidita' e favorisce il debridement autolitico. Due: no, non si rimuove: funziona da copertura naturale, soprattutto se la perfusione e' scarsa."),
 (11,"chiaro",2.0,"Tre: uno stadio quattro che si riempie di granulazione, come lo classifichi? Quattro: ulcera venosa, l'ABI non e' stato misurato: si comprime?"),
 (11,"chiaro",0,"Tre: stadio quattro in guarigione, non si retrostadia. Quattro: no, senza ABI non si comprime: un'arteriopatia associata e' frequente nell'anziano."),
 (11,"chiaro",2.0,"Cinque: la prima mossa nell'eviscerazione? Sei: in quale stomia si puo' fare l'irrigazione?"),
 (11,"chiaro",0,"Cinque: restare con il paziente e chiamare aiuto, poi supino a ginocchia flesse. Sei: solo nella colostomia sinistra, mai nell'ileostomia."),
 (11,"chiaro",2.0,"Sette: bollicine continue nel sigillo idraulico, che cosa significano? Otto: il drenaggio toracico si clampa nel trasporto?"),
 (11,"chiaro",0,"Sette: possibile perdita nel sistema, si controllano connessioni e tubo. Otto: no, mai di routine: sotto il torace, in verticale. Otto su otto e' il livello atteso: ogni errore ti dice quale lezione riguardare."),

 (12,"chiaro",0,"I fili con gli altri moduli. Braden e nutrizione con i moduli due e tre: la soglia di sedici e le proteine. Il bundle SSI con il modulo quattro: rasoio, profilassi, normotermia."),
 (12,"chiaro",0,"Tamponi e colture con la lezione sei punto sette. Le lesioni da dispositivo con i dispositivi dei moduli tre e sei. Un modulo che si tiene con gli altri vale di piu' all'orale."),

 (13,"chiaro",0,"Gli agganci veneti. Infermieri esperti in wound care e ambulatori vulnologici. Prontuari delle medicazioni avanzate. Le lesioni da pressione come indicatore di qualita'."),
 (13,"chiaro",0,"Percorsi per il piede diabetico con equipe multidisciplinari. Ambulatori di stomaterapia con infermieri stomaterapisti, e fornitura dei presidi tramite distretto."),

 (14,"chiaro",0,"Come proseguire. Test del modulo, trenta domande, soglia ventuno. Disegna a memoria l'albero decisionale: sette passi, su un foglio bianco, senza guardare."),
 (14,"chiaro",0,"Nel quaderno: stadi, venosa e arteriosa, classi di medicazione. E scrivi il caso dell'eviscerazione con lo schema in cinque passi: che cosa pensi, che cosa fai subito, chi avvisi, che cosa sorvegli, che cosa documenti."),

 (15,"profondo",1.2,"[serious] La frase del modulo: prima si valuta e si toglie la causa, poi si medica."),
 (15,"chiaro",0,"Nessuna medicazione guarisce una lesione da pressione senza scarico, un'ulcera venosa senza compressione, un piede diabetico senza scarico e controllo glicemico. La medicazione e' l'ultimo passo, non il primo."),

 (16,"chiaro",0,"Nel prossimo modulo entriamo nell'area medica, apparato per apparato: cuore, polmone, diabete, rene, fegato, cervello, oncologia ed ematologia. Otto lezioni, come sempre."),
 (16,"chiaro",0,"[warm] E' il modulo in cui tutto cio' che abbiamo studiato finora si applica alle malattie piu' frequenti nei reparti. Ci vediamo li'."),
]

CAPITOLI = {1:"Apertura",2:"La mappa",3:"L'albero decisionale",4:"Le lesioni da pressione",5:"Venosa e arteriosa",6:"Le emergenze",
 7:"I numeri",8:"Le confusioni, prima parte",9:"Le confusioni, seconda parte",10:"I casi",11:"L'autovalutazione",12:"I fili",
 13:"In Veneto",14:"Come proseguire",15:"La frase del modulo",16:"Chiusura"}

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
