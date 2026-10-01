# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Il wound care e' una delle aree in cui l'infermiere ha l'autonomia piu' ampia: valuta la lesione, sceglie la medicazione, ne segue l'evoluzione."),
 (1,"chiaro",0,"Ed e' anche un'area in cui l'errore piu' comune non e' tecnico, ma di metodo: medicare senza aver valutato. Si guarda la ferita, si apre la medicazione che c'e' nell'armadio, e si copre."),
 (1,"chiaro",0,"Questo modulo parte dunque dalla valutazione, perche' la medicazione giusta discende da una lesione ben descritta. Otto lezioni: valutazione, lesioni da pressione, ulcere, ferite chirurgiche, medicazioni, stomie, drenaggi."),

 (2,"chiaro",0,"La guarigione attraversa quattro fasi, che si sovrappongono. Emostasi: nei primi minuti e nelle prime ore, coagulo e vasocostrizione: il sangue si ferma prima che qualunque altra cosa cominci."),
 (2,"chiaro",0,"Infiammatoria: nei primi giorni, con arrossamento, calore, edema ed essudato. Che quindi, in questa fase, non sono segni di infezione: sono la guarigione che lavora."),
 (2,"chiaro",0,"Proliferativa: formazione del tessuto di granulazione, contrazione dei margini ed epitelizzazione, nell'arco di giorni e settimane: e' la fase in cui la lesione si riempie e si chiude."),
 (2,"chiaro",0,"Rimodellamento: la cicatrice si riorganizza e si rinforza per mesi, fino a uno-due anni, senza mai tornare alla resistenza della cute originaria."),

 (3,"chiaro",0,"Tre modalita'. Per prima intenzione: i margini sono accostati, come in una ferita chirurgica suturata, e la guarigione e' rapida, con una cicatrice sottile."),
 (3,"chiaro",0,"Per seconda intenzione: la lesione resta aperta e si riempie dal fondo con tessuto di granulazione, come nelle lesioni da pressione e nelle ulcere: e' piu' lenta."),
 (3,"chiaro",0,"Per terza intenzione: la ferita viene lasciata aperta per un periodo, per esempio perche' contaminata, e poi chiusa. Chiusura ritardata, non mancata."),

 (4,"chiaro",0,"Una lesione si definisce cronica quando non progredisce attraverso le fasi della guarigione nei tempi attesi, indicativamente dopo quattro-sei settimane. Cronica non vuol dire vecchia: vuol dire ferma."),
 (4,"chiaro",0,"Spesso resta bloccata nella fase infiammatoria. Le lesioni da pressione, le ulcere vascolari e il piede diabetico sono le lesioni croniche per eccellenza, e sono quelle dei prossimi video."),

 (5,"chiaro",0,"I fattori che ostacolano la guarigione. Sistemici: eta', malnutrizione, ricordi le proteine della lezione tre punto tre, diabete, ridotta perfusione, anemia."),
 (5,"chiaro",0,"E ancora fumo, corticosteroidi e immunosoppressori, chemioterapia. Locali: pressione che persiste, infezione, necrosi, essudato non gestito, corpi estranei."),
 (5,"chiaro",0,"E i traumi da medicazione, come rimuovere una garza aderente al fondo. Una lesione non guarisce se si medica bene ma non si toglie la causa."),

 (6,"chiaro",0,"Lo strumento di valutazione piu' usato e' il modello TIME, che il programma cita espressamente. T, tissue: c'e' tessuto non vitale, necrosi o fibrina? Va rimosso con il debridement."),
 (6,"chiaro",0,"I, infection o inflammation: ci sono segni di infezione o di infiammazione persistente? Allora si controlla la carica batterica."),
 (6,"chiaro",0,"M, moisture: l'umidita' e' in equilibrio, o la lesione e' troppo secca o troppo bagnata? Si gestisce l'essudato."),
 (6,"chiaro",0,"E, edge: i margini avanzano, o sono fermi, introflessi, sottominati? Quattro domande, e ciascuna porta a un intervento. E' questo che lo rende uno strumento, e non una sigla."),

 (7,"chiaro",0,"Il fondo della lesione si descrive anche con i colori. Nero: necrosi, l'escara. Giallo: slough, fibrina, tessuto devitalizzato umido."),
 (7,"chiaro",0,"Rosso: tessuto di granulazione, che quando e' sano e' rosso vivo, granuloso e umido. Rosa: epitelizzazione, la cute nuova che avanza dai margini."),
 (7,"chiaro",0,"Una granulazione pallida, scura o friabile, che sanguina facilmente, e' un segnale d'allarme: puo' indicare infezione o scarsa perfusione. Il rosso giusto e' un rosso vivo."),

 (8,"chiaro",0,"L'essudato: si descrivono quantita', assente, scarso, moderato o abbondante, e tipo: sieroso, chiaro; siero-ematico, rosato; ematico; purulento, torbido, giallo-verde."),
 (8,"chiaro",0,"L'odore si valuta dopo la detersione, perche' alcune medicazioni, come gli idrocolloidi, producono un odore caratteristico che non indica infezione."),
 (8,"chiaro",0,"Un cambiamento improvviso di quantita', colore o odore e' un possibile segno di infezione. Il confronto con la medicazione precedente vale piu' del dato isolato."),

 (9,"chiaro",0,"I margini: regolari, macerati, introflessi, l'epibolia, che si arrotolano verso l'interno e impediscono all'epitelio di avanzare, o sottominati, con una cavita' sotto il bordo."),
 (9,"chiaro",0,"La cute perilesionale: integra, arrossata, macerata, bianca e rammollita, segno di un essudato non gestito, eczematosa, callosa."),
 (9,"chiaro",0,"Proteggere la cute intorno alla lesione e' parte della medicazione: una lesione che si allarga per macerazione e' una medicazione sbagliata, non una malattia che peggiora."),

 (10,"chiaro",0,"La misurazione. Si misurano lunghezza, larghezza e profondita', in centimetri. Per descrivere posizione di tunnel e sottominature si usa il metodo a orologio."),
 (10,"chiaro",0,"Le ore dodici sono rivolte verso la testa del paziente: sottominatura di due centimetri a ore tre. Si misura con uno specillo sterile."),
 (10,"chiaro",0,"E per confrontare nel tempo, stessa tecnica e, quando possibile, stesso operatore. Una misura presa in due modi diversi non dice se la lesione migliora."),

 (11,"chiaro",0,"L'infezione. I segni classici sono rossore, calore, dolore, tumefazione e perdita di funzione. Ma nelle lesioni croniche l'infezione e' spesso piu' subdola, e i cinque segni classici possono mancare tutti."),
 (11,"chiaro",0,"Un dolore nuovo o in aumento, granulazione friabile, aumento dell'essudato, odore, una lesione che smette di migliorare o si allarga. E i segni sistemici: febbre, alterazione degli esami."),
 (11,"chiaro",0,"Il dolore che cambia e' uno dei segnali piu' precoci, e va sempre chiesto. Chi medica in silenzio perde il primo segno."),

 (12,"chiaro",0,"Il campione per la coltura si preleva solo quando ci sono segni di infezione: tutte le lesioni croniche sono colonizzate, e un tampone fatto a caso da' sempre un risultato."),
 (12,"chiaro",0,"Prima si deterge con fisiologica, poi si campiona il tessuto vitale, non il pus o la necrosi. La tecnica piu' usata e' quella di Levine."),
 (12,"chiaro",0,"Si ruota il tampone su circa un centimetro quadrato di tessuto vitale, con una lieve pressione. Il riferimento resta la biopsia tissutale, di competenza medica."),

 (13,"chiaro",0,"La documentazione fotografica e' molto utile per seguire l'evoluzione, ma ha regole precise. Il consenso della persona. Un righello o un'etichetta di riferimento nella foto, perche' la misura si legga anche dopo."),
 (13,"chiaro",0,"Stessa distanza, luce e angolazione fra una foto e l'altra. Data, sede, identificativo. E l'archiviazione sicura secondo la procedura aziendale."),
 (13,"profondo",1.2,"[serious] Mai sul telefono personale: e' la violazione della privacy vista nella lezione uno punto sette."),

 (14,"chiaro",0,"Prima della medicazione, la detersione, a ogni cambio: si usa soluzione fisiologica o acqua potabile, a temperatura ambiente o tiepida, perche' una lesione raffreddata rallenta la guarigione."),
 (14,"chiaro",0,"Nelle lesioni con biofilm si usano soluzioni detergenti specifiche. Gli antisettici non si usano di routine sulle lesioni croniche: possono danneggiare il tessuto di granulazione."),
 (14,"chiaro",0,"Si riservano a indicazioni specifiche e periodi limitati. Detergere non e' disinfettare: la prima cosa si fa sempre, la seconda quasi mai."),

 (15,"chiaro",0,"Nelle aziende venete esistono infermieri esperti in wound care, spesso con formazione specifica, ambulatori dedicati e prontuari aziendali delle medicazioni avanzate."),
 (15,"chiaro",0,"La continuita' con il territorio passa da ADI e ambulatori distrettuali, perche' la maggior parte delle lesioni croniche si cura a casa, e chi le medica a casa deve descriverle nello stesso modo."),
 (15,"chiaro",0,"All'orale, la parola chiave e' valutazione strutturata: TIME, misure, foto, documentazione. Chi descrive bene una lesione ha gia' detto come la medichera'."),

 (16,"chiaro",0,"Ricapitoliamo. Quattro fasi: emostasi, infiammatoria, proliferativa, rimodellamento. Guarigione per prima, seconda e terza intenzione. TIME: tessuto, infezione, umidita', margini."),
 (16,"chiaro",0,"Colori: nero, giallo, rosso, rosa. Misure con le ore dodici verso la testa. Tampone solo con segni di infezione, dopo la detersione. [warm] Nella prossima lezione: le lesioni da pressione. A tra poco."),
]

CAPITOLI = {1:"Apertura",2:"Le quattro fasi",3:"Le tre intenzioni",4:"La lesione cronica",5:"I fattori che ostacolano",
 6:"Il modello TIME",7:"I colori del fondo",8:"L'essudato",9:"Margini e cute perilesionale",10:"La misurazione",
 11:"L'infezione",12:"Il campione per la coltura",13:"La fotografia",14:"La detersione",15:"In Veneto",16:"Chiusura"}

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
