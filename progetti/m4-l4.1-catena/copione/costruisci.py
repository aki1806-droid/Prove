# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Apriamo il modulo quattro, uno dei blocchi a resa piu' alta nei quiz: definizioni precise, numeri, sequenze. Ma c'e' anche una ragione piu' profonda per studiarlo bene."),
 (1,"chiaro",0,"Le infezioni correlate all'assistenza sono l'evento avverso piu' frequente in sanita', e l'infermiere e' il professionista che ha piu' contatti con la persona assistita."),
 (1,"chiaro",0,"[serious] La prevenzione passa, letteralmente, dalle sue mani. Questa lezione mette le basi: che cosa sono le ICA, quanto pesano, e il modello a sei anelli che spiega come nascono e come si fermano."),

 (2,"chiaro",0,"Un'infezione correlata all'assistenza e' un'infezione che insorge durante o dopo un percorso di cura, e che non era presente ne' in incubazione al momento dell'accesso."),
 (2,"chiaro",0,"Convenzionalmente, in ospedale, e' quella che compare dopo quarantotto ore dal ricovero. Prima di quel limite l'infezione era gia' in incubazione: non e' correlata all'assistenza."),
 (2,"chiaro",0,"Nota la parola: assistenza, non ospedale. Il vecchio termine infezioni ospedaliere e' stato superato perche' le ICA nascono anche in RSA, a domicilio, negli ambulatori, in dialisi."),

 (3,"chiaro",0,"E un'infezione puo' essere correlata all'assistenza anche se compare dopo la dimissione. L'esempio classico e' l'infezione del sito chirurgico, che si conta con un calendario preciso."),
 (3,"chiaro",0,"Si considera tale se compare entro trenta giorni dall'intervento, ed entro novanta se e' stato impiantato materiale protesico. Il paziente e' a casa, ma l'infezione e' nata in sala operatoria."),

 (4,"chiaro",0,"I numeri. Negli studi di prevalenza italiani, circa otto ricoverati su cento presentano un'ICA in un dato giorno, sopra la media europea. Otto su cento: in un reparto da venticinque letti, due persone."),
 (4,"chiaro",0,"E il dato che da' senso a tutto il modulo: una quota stimata fra un terzo e la meta' di queste infezioni e' prevenibile con misure note."),
 (4,"profondo",1.2,"[serious] Non servono tecnologie nuove: serve applicare bene cio' che gia' sappiamo. Fino a meta' prevenibili: tienilo come titolo del modulo."),

 (5,"chiaro",0,"Le sedi principali sono quattro, e ognuna ha una sigla che devi saper sciogliere. Polmoniti, con la VAP, la polmonite associata a ventilazione. Infezioni urinarie, con le CAUTI, associate a catetere."),
 (5,"chiaro",0,"Infezioni del sito chirurgico, le SSI. E batteriemie, con le CLABSI, associate a catetere venoso centrale. Tre di queste quattro sono legate a un dispositivo: ed e' li' che la prevenzione e' piu' efficace."),
 (5,"chiaro",0,"Fissiamole in inglese, perche' nei quiz compaiono cosi', senza spiegazione. VAP: Ventilator-Associated Pneumonia. CAUTI: Catheter-Associated Urinary Tract Infection."),
 (5,"chiaro",0,"CLABSI: Central Line-Associated Bloodstream Infection. SSI: Surgical Site Infection. Quattro sigle, quattro sedi, tre dispositivi: il ventilatore, il catetere vescicale, il catetere venoso centrale."),

 (6,"chiaro",0,"Il modello che spiega come nasce un'infezione e' la catena delle infezioni, sei anelli. Agente infettivo. Serbatoio, dove l'agente vive e si moltiplica. Porta di uscita."),
 (6,"chiaro",0,"Via di trasmissione. Porta di ingresso. Ospite suscettibile. L'infezione si realizza solo se tutti e sei gli anelli sono presenti, uno dopo l'altro."),
 (6,"profondo",1.2,"[serious] E il principio della prevenzione e' semplice: basta spezzare un anello. Uno qualunque. La catena si interrompe, e l'infezione non arriva."),

 (7,"chiaro",0,"Ed ecco dove agisce l'infermiere su ogni anello. Sull'agente: disinfezione, sterilizzazione, terapia. Sul serbatoio: pulizia e disinfezione ambientale."),
 (7,"chiaro",0,"Sulla porta di uscita: gestione di secrezioni, escreti, ferite, igiene respiratoria. Sulla via di trasmissione: igiene delle mani e DPI, l'anello su cui l'infermiere pesa di piu'."),
 (7,"chiaro",0,"Sulla porta di ingresso: asepsi nella gestione di cateteri, accessi vascolari, ferite. Sull'ospite: nutrizione, mobilizzazione, igiene, vaccinazioni. Sei anelli, e su tutti e sei c'e' un gesto infermieristico."),
 (7,"chiaro",0,"Sei anelli, sei famiglie di interventi. E quasi tutti sono gesti che hai gia' incontrato nel modulo tre: l'igiene, la nutrizione, il catetere. La prevenzione delle ICA e' assistenza di base fatta bene."),

 (8,"chiaro",0,"Le vie di trasmissione. Contatto, diretto, mani e cute, o indiretto, attraverso oggetti e superfici: e' la via piu' frequente in ospedale."),
 (8,"chiaro",0,"Droplet: goccioline di grandi dimensioni, oltre cinque micron, emesse con tosse e starnuti, che cadono entro uno-due metri dalla persona che le emette. Oltre quella distanza, il pavimento le ferma."),
 (8,"chiaro",0,"Via aerea: nuclei di goccioline sotto i cinque micron, che restano sospesi nell'aria a lungo e percorrono distanze maggiori. E' la differenza fra una mascherina e un respiratore."),
 (8,"chiaro",0,"Poi il veicolo comune, cibo, acqua, farmaci contaminati, e i vettori. Questa distinzione e' la base delle precauzioni della lezione quattro punto tre: contatto, droplet, aerea."),

 (9,"chiaro",0,"Un'altra distinzione. Le infezioni endogene sono causate dalla flora della persona stessa, che raggiunge una sede dove non dovrebbe stare: i batteri intestinali che risalgono lungo il catetere vescicale, per esempio."),
 (9,"chiaro",0,"Quelle esogene vengono dall'esterno: altri pazienti, operatori, ambiente, attrezzature: e' il caso in cui le mani dell'operatore fanno da ponte. Molte infezioni da dispositivo, invece, sono endogene."),
 (9,"chiaro",0,"Per questo l'asepsi al momento dell'inserimento e della manipolazione conta tanto quanto l'igiene delle mani: il germe e' gia' li', addosso alla persona, e il dispositivo gli apre la strada."),

 (10,"chiaro",0,"L'ospite suscettibile. I fattori che lo rendono piu' vulnerabile: eta' estreme, immunodepressione, malattie croniche, diabete, malnutrizione, dispositivi invasivi, chirurgia, degenza prolungata, terapia antibiotica."),
 (10,"chiaro",0,"Alcuni non si possono cambiare. Altri si': i dispositivi si tolgono prima, la nutrizione si corregge, la degenza si accorcia. Su quelli lavora l'infermiere: ogni giorno di catetere in meno e' un rischio in meno."),

 (11,"chiaro",0,"Una distinzione che i quiz chiedono e che ha conseguenze pratiche. Colonizzazione: il microrganismo e' presente e si moltiplica, ma senza reazione dell'ospite e senza malattia."),
 (11,"chiaro",0,"Infezione: il microrganismo invade i tessuti e provoca una risposta clinica, con segni e sintomi. Il colonizzato di norma non si tratta con antibiotici: non c'e' una malattia da curare."),
 (11,"profondo",1.2,"[serious] Ma e' comunque un serbatoio, e quindi richiede le precauzioni per non trasmettere il microrganismo ad altri. Non trattare non vuol dire non isolare."),

 (12,"chiaro",0,"Per prevenire bisogna misurare. La sorveglianza delle ICA usa due strumenti. Gli studi di prevalenza, una fotografia di quanti pazienti hanno un'infezione in un dato giorno."),
 (12,"chiaro",0,"Semplici, ripetibili, confrontabili, come quelli europei coordinati dall'ECDC. E gli studi di incidenza, che contano i nuovi casi in un periodo: piu' precisi, piu' onerosi."),
 (12,"chiaro",0,"Accanto a questi, sorveglianze mirate: sito chirurgico, terapia intensiva, batteriemie da germi resistenti. La prevalenza e' una fotografia, l'incidenza e' un film: i quiz chiedono la differenza."),

 (13,"chiaro",0,"L'organizzazione. In ogni ospedale opera il Comitato per il Controllo delle Infezioni Ospedaliere, il CIO, previsto fin dalle circolari ministeriali degli anni Ottanta, con funzioni di indirizzo."),
 (13,"chiaro",0,"Accanto, un gruppo operativo e una figura infermieristica specifica: l'infermiere addetto al controllo delle infezioni, l'ICI, che si occupa di sorveglianza, formazione, supporto ai reparti e verifica delle pratiche."),
 (13,"chiaro",0,"In molte realta' ci sono poi referenti di reparto, il collegamento fra il comitato e chi lavora al letto. E' una possibile evoluzione di carriera, e all'orale vale la pena citarla."),

 (14,"chiaro",0,"Il quadro nazionale. Il riferimento e' il Piano Nazionale di Contrasto all'Antibiotico-Resistenza, il PNCAR, che considera la prevenzione delle ICA uno dei pilastri, insieme all'uso appropriato degli antibiotici."),
 (14,"chiaro",0,"L'approccio e' One Health: salute umana, animale e ambientale sono collegate, e un antibiotico usato male in uno dei tre ambiti pesa sugli altri due. Ne riparleremo nella lezione quattro punto sei."),
 (14,"chiaro",0,"E un aggancio al modulo uno. Le ICA sono eventi avversi, e rientrano nella sicurezza delle cure prevista dalla legge ventiquattro del duemiladiciassette, la legge Gelli-Bianco."),
 (14,"chiaro",0,"In un contenzioso la domanda non e' se il paziente ha avuto un'infezione, ma se sono state adottate le misure previste. E risponde la documentazione: bundle registrato, motivazione del catetere, rivalutazione quotidiana."),

 (15,"chiaro",0,"In Veneto le aziende partecipano alla sorveglianza regionale delle ICA e agli studi di prevalenza coordinati a livello nazionale ed europeo, con comitati aziendali per il controllo delle infezioni."),
 (15,"chiaro",0,"Infermieri addetti al controllo, e indicatori che entrano nella valutazione della qualita'. Per l'orale basta una frase: la prevenzione delle ICA e' organizzata in azienda, con un comitato dedicato e sorveglianza continua."),

 (16,"chiaro",0,"Ricapitoliamo. Un'ICA compare dopo quarantotto ore e non era presente ne' in incubazione. Il sito chirurgico si sorveglia fino a trenta giorni, novanta con impianto. Circa otto ricoverati su cento, e fino a meta' prevenibili."),
 (16,"chiaro",0,"[warm] Sei anelli, e basta spezzarne uno. Colonizzazione non e' infezione, ma il colonizzato e' un serbatoio. Nella prossima lezione, l'anello che l'infermiere controlla piu' di ogni altro: le mani. A tra poco."),
]

# Deroghe al limite di 225 caratteri, dichiarate una per una con il motivo:
# la voce e' gia' generata e non ha fatto pausa dove il copione staccava, e il
# confine si mette dove la voce si ferma, non dove il copione vorrebbe.
DEROGHE = {}
ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1:"Apertura",2:"La definizione",3:"Fuori dall'ospedale",4:"Quanto pesano",5:"Le sedi e le sigle",
 6:"La catena",7:"Spezzare la catena",8:"Le vie di trasmissione",9:"Endogene ed esogene",10:"L'ospite suscettibile",
 11:"Colonizzazione e infezione",12:"La sorveglianza",13:"Chi se ne occupa",14:"Il quadro nazionale e la responsabilita'",
 15:"In Veneto",16:"Chiusura"}
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
