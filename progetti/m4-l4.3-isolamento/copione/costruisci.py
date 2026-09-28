# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Le precauzioni standard valgono per tutti. Ma per alcuni microrganismi, trasmessi in modo particolare, non bastano: servono precauzioni aggiuntive, basate sulla via di trasmissione."),
 (1,"chiaro",0,"Questa lezione e' costruita come una tabella a tre colonne, contatto, droplet, via aerea, e i quiz la interrogano in un solo modo: per questa malattia, quali precauzioni?"),

 (2,"chiaro",0,"Il principio e' nella parola: aggiuntive. Si sommano alle precauzioni standard, non le sostituiscono. E si scelgono in base alla via di trasmissione del microrganismo, vista nella lezione quattro punto uno."),
 (2,"chiaro",0,"Contatto, droplet, via aerea: tre colonne, e ogni malattia sta in una di queste. Alcune ne richiedono piu' di una insieme, e il quiz lo sa: la risposta giusta a volte e' due colonne, non una."),

 (3,"chiaro",0,"Le precauzioni da contatto. Quando: germi multiresistenti, MRSA, VRE, enterobatteri resistenti; Clostridioides difficile; scabbia; norovirus; diarree infettive; lesioni cutanee infette non contenibili."),
 (3,"chiaro",0,"Come: stanza singola o coorte con pazienti colonizzati dallo stesso germe. Guanti e camice indossati all'ingresso nella stanza, non solo quando si tocca il paziente."),
 (3,"chiaro",0,"Attrezzature dedicate: fonendoscopio, sfigmomanometro, termometro restano nella stanza. E pulizia ambientale rinforzata, perche' il germe da contatto vive sulle superfici."),
 (3,"profondo",1.2,"[serious] All'ingresso, non al contatto: e' il dettaglio che i quiz chiedono. Chi indossa i guanti solo quando tocca il paziente ha gia' toccato la sponda, il comodino, la pompa."),

 (4,"chiaro",0,"Un caso particolare che ricorre: il Clostridioides difficile. Oltre alle precauzioni da contatto, richiede il lavaggio delle mani con acqua e sapone, perche' le spore resistono all'alcol, come sai dalla tre punto sette."),
 (4,"chiaro",0,"E la disinfezione ambientale con prodotti sporicidi, tipicamente a base di cloro. Il gel alcolico da solo, qui, non basta: contatto, acqua e sapone, cloro."),

 (5,"chiaro",0,"Le precauzioni da droplet. Quando: influenza, pertosse, meningite da meningococco, parotite, rosolia, infezioni da Mycoplasma, difterite faringea. Malattie che si trasmettono con la tosse, da vicino."),
 (5,"chiaro",0,"Come: stanza singola o coorte. L'operatore indossa la mascherina chirurgica quando si trova entro uno-due metri dal paziente, la distanza che le goccioline percorrono prima di cadere."),
 (5,"chiaro",0,"Distanza adeguata fra i letti se in coorte. E durante i trasferimenti e' il paziente a indossare la mascherina chirurgica, per contenere le proprie emissioni."),
 (5,"chiaro",0,"La porta puo' restare aperta: le goccioline non viaggiano nell'aria del corridoio, cadono entro due metri. E' la differenza con la via aerea, e vale una domanda."),

 (6,"chiaro",0,"Le precauzioni per via aerea. Quando: tubercolosi polmonare o laringea in fase contagiosa, morbillo, varicella, herpes zoster disseminato. Quattro malattie, e l'aria stessa della stanza e' il veicolo."),
 (6,"chiaro",0,"Come: stanza singola a pressione negativa, con un numero elevato di ricambi d'aria orari e scarico all'esterno o filtrato. Porta sempre chiusa, anche quando nessuno sta entrando."),
 (6,"chiaro",0,"L'operatore indossa un respiratore FFP2 o FFP3 prima di entrare, non una mascherina chirurgica. Il paziente, durante i trasferimenti, indossa la mascherina chirurgica."),
 (6,"profondo",1.2,"[serious] Pressione negativa, porta chiusa, respiratore: tre elementi, e se ne manca uno l'isolamento per via aerea non c'e'. I nuclei sotto i cinque micron restano sospesi e viaggiano."),

 (7,"chiaro",0,"Il dettaglio che confonde di piu', e che i quiz mettono nei distrattori. Perche' all'operatore il respiratore e al paziente la mascherina chirurgica? Perche' i due dispositivi fanno cose diverse."),
 (7,"chiaro",0,"Il respiratore FFP protegge chi lo indossa dall'inalazione di particelle. La mascherina chirurgica protegge gli altri dalle emissioni di chi la indossa, e non sigilla."),
 (7,"chiaro",0,"Al paziente contagioso che si sposta serve contenere le proprie emissioni: la chirurgica basta ed e' piu' tollerata. Lo vedremo meglio nella lezione quattro punto quattro."),

 (8,"chiaro",0,"Due note su morbillo e varicella. Dove possibile, si assegna all'assistenza personale immune, per vaccinazione o malattia pregressa: gli operatori suscettibili, se possibile, non entrano."),
 (8,"chiaro",0,"E la varicella richiede via aerea piu' contatto, fino a quando tutte le lesioni non sono in fase di crosta. E' l'esempio classico di malattia con doppia precauzione."),

 (9,"chiaro",0,"Ecco la tabella da fotografare. Contatto: germi multiresistenti, Clostridioides difficile, scabbia, norovirus. Droplet: influenza, pertosse, meningococco, parotite, rosolia."),
 (9,"chiaro",0,"Via aerea: tubercolosi, morbillo, varicella, zoster disseminato. Un trucco per la via aerea: sono quattro, e se ricordi TBC, morbillo e varicella hai gia' le tre che i quiz chiedono quasi sempre."),

 (10,"chiaro",0,"La pressione della stanza, e qui l'errore di inversione e' frequentissimo. Pressione negativa: l'aria entra dal corridoio ma non esce verso il corridoio."),
 (10,"chiaro",0,"Si usa per il paziente contagioso per via aerea: si protegge l'esterno dal paziente, il corridoio, il reparto. Pressione positiva: l'aria esce ma non entra."),
 (10,"chiaro",0,"Si usa per il paziente immunodepresso: si protegge il paziente dall'esterno. Stessa stanza, stessa porta chiusa, ma il ventilatore spinge nella direzione opposta."),
 (10,"profondo",1.2,"[serious] Negativo trattiene dentro, positivo tiene fuori. Chi ha in mente le frecce dell'aria non sbaglia piu': la negativa aspira, la positiva soffia."),

 (11,"chiaro",0,"L'isolamento protettivo, o inverso, protegge il paziente immunodepresso: neutropenia grave, trapianto di midollo. Stanza singola, e nei casi indicati pressione positiva con filtri HEPA."),
 (11,"chiaro",0,"Igiene delle mani rigorosissima. Niente fiori e piante, che veicolano funghi e batteri. Limitazione dei visitatori con sintomi, attenzione agli alimenti secondo le indicazioni."),
 (11,"chiaro",0,"Qui il pericolo non e' il paziente: sono tutti gli altri. Il fiore sul comodino, il visitatore con il raffreddore, la mano non igienizzata di chi entra. La logica dell'isolamento si rovescia."),

 (12,"chiaro",0,"La coorte. Quando le stanze singole non bastano, si possono raggruppare nella stessa stanza pazienti colonizzati o infetti dallo stesso microrganismo, con le stesse precauzioni per tutti."),
 (12,"chiaro",0,"Non pazienti con germi diversi, e non un paziente infetto con uno sospetto. Nelle epidemie si puo' arrivare alla coorte anche del personale, dedicando gli stessi operatori agli stessi pazienti."),

 (13,"chiaro",0,"Un principio che vale una risposta intera: le precauzioni si avviano sul sospetto clinico, non si aspetta la conferma di laboratorio. E' l'isolamento empirico."),
 (13,"chiaro",0,"Diarrea acuta di possibile origine infettiva: contatto, subito. Tosse, febbre, dimagrimento e infiltrato apicale in un paziente a rischio: via aerea, subito."),
 (13,"profondo",1.2,"[serious] Aspettare il referto significa esporre per giorni pazienti e colleghi. Si parte dal sospetto, e se il referto e' negativo si sospende: costa meno di un'epidemia."),

 (14,"chiaro",0,"L'isolamento funziona solo se tutti lo sanno. Segnaletica sulla porta con il tipo di precauzione, cosi' chi arriva sa che cosa indossare; DPI disponibili all'ingresso, prima della soglia."),
 (14,"chiaro",0,"Informazione al paziente e ai visitatori, che devono sapere che cosa fare e perche'. E comunicazione in caso di trasferimento a un altro reparto o servizio, che deve essere avvisato prima."),

 (15,"chiaro",0,"E un aspetto che i candidati migliori citano. L'isolamento ha un costo umano. Studi osservazionali mostrano che i pazienti isolati ricevono meno visite dagli operatori, e piu' brevi."),
 (15,"chiaro",0,"Hanno piu' ansia, depressione e senso di stigma, e vanno incontro a piu' eventi avversi, come cadute e lesioni. La porta chiusa protegge il reparto, ma isola la persona."),
 (15,"chiaro",0,"La risposta professionale e' garantire lo stesso standard di assistenza e di relazione, e spiegare alla persona il senso delle misure. Isolato il germe, non la persona."),

 (16,"chiaro",0,"Le precauzioni si sospendono secondo criteri definiti dalla procedura aziendale e dal microrganismo: criteri clinici, la fine dei sintomi, o microbiologici, i tamponi negativi."),
 (16,"chiaro",0,"Non si sospendono a sensazione, e non si prolungano per abitudine: entrambe le cose hanno un costo, per il reparto la prima, per la persona la seconda. La data di rivalutazione va scritta."),

 (17,"chiaro",0,"Nelle aziende venete le precauzioni aggiuntive seguono procedure aziendali che definiscono, per ogni microrganismo, isolamento, DPI e criteri di sospensione. Le stanze a pressione negativa sono individuate per reparto."),
 (17,"chiaro",0,"E per molte malattie infettive scatta la notifica al Dipartimento di Prevenzione dell'ULSS, che attiva le misure per i contatti: un aggancio utile per le domande su tubercolosi e meningite."),

 (18,"chiaro",0,"Ricapitoliamo. Contatto: guanti e camice all'ingresso, attrezzature dedicate. Droplet: mascherina chirurgica entro uno-due metri, porta anche aperta. Via aerea: respiratore FFP2 o FFP3, pressione negativa, porta chiusa."),
 (18,"chiaro",0,"[warm] La negativa trattiene il contagio dentro, la positiva protegge l'immunodepresso. E le precauzioni si avviano sul sospetto. Prossima lezione: come si indossano e, soprattutto, come si tolgono i DPI. A tra poco."),
]

# Deroghe al limite di 225 caratteri, dichiarate una per una con il motivo:
# la voce e' gia' generata e non ha fatto pausa dove il copione staccava, e il
# confine si mette dove la voce si ferma, non dove il copione vorrebbe.
DEROGHE = {}
ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1:"Apertura",2:"Il principio",3:"Contatto",4:"Il C. difficile",5:"Droplet",6:"Via aerea",
 7:"Chi indossa che cosa",8:"Morbillo e varicella",9:"La tabella",10:"La pressione della stanza",
 11:"L'isolamento protettivo",12:"La coorte",13:"Sul sospetto",14:"Segnaletica e informazione",
 15:"Il costo umano",16:"Quando si sospende",17:"In Veneto",18:"Chiusura"}
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
