# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] In oncologia l'infermiere accompagna la persona per mesi o anni, attraverso trattamenti pesanti e momenti difficili. Questa lezione unisce due piani."),
 (1,"chiaro",0,"Quello tecnico: la gestione degli effetti dei trattamenti e delle emergenze, prima fra tutte la neutropenia febbrile. E quello umano: la persona con un tumore non e' solo un corpo da trattare."),

 (2,"chiaro",0,"Un richiamo alla lezione cinque punto sette, che contiene la parte tecnica: allestimento centralizzato nell'UFA, DPI nella somministrazione, la sequenza dello stravaso."),
 (2,"chiaro",0,"Gli escreti contaminati per almeno quarantotto ore, e la Raccomandazione quattordici sugli errori con gli antineoplastici. Qui ci occupiamo degli effetti dei trattamenti sulla persona."),

 (3,"chiaro",0,"Nausea e vomito da chemioterapia si distinguono in tre tipi. Anticipatori: compaiono prima del trattamento, per un meccanismo di condizionamento, basta l'odore dell'ospedale."),
 (3,"chiaro",0,"Acuti: entro ventiquattro ore. Ritardati: dopo ventiquattro ore, anche per giorni."),
 (3,"chiaro",0,"La regola: gli antiemetici si somministrano prima del trattamento e secondo lo schema prescritto, non solo al bisogno, perche' e' molto piu' facile prevenire la nausea che fermarla."),
 (3,"chiaro",0,"E consigli pratici: pasti piccoli e frequenti, cibi freddi, meno odorosi, evitare odori forti."),

 (4,"chiaro",0,"La mucosite: infiammazione e ulcerazione delle mucose, soprattutto della bocca. Provoca dolore, difficolta' a mangiare e un rischio di infezione."),
 (4,"chiaro",0,"L'assistenza: igiene orale con spazzolino morbido, sciacqui blandi con soluzione fisiologica o bicarbonato, niente collutori alcolici, che bruciano e seccano."),
 (4,"chiaro",0,"Analgesia, perche' una mucosite grave fa male come un'ustione, e nutrizione. Con alcuni farmaci si usa la crioterapia: tenere ghiaccio in bocca durante l'infusione riduce la mucosite."),

 (5,"chiaro",0,"La mielosoppressione: la chemioterapia riduce la produzione del midollo, con un calo di globuli bianchi, rossi e piastrine."),
 (5,"chiaro",0,"Il punto piu' basso si chiama nadir, e cade di solito sette-quattordici giorni dopo il trattamento: e' il periodo di maggiore rischio, spesso quando la persona e' gia' a casa."),
 (5,"chiaro",0,"La neutropenia espone alle infezioni, l'anemia da' astenia e dispnea, la piastrinopenia espone al sanguinamento."),

 (6,"chiaro",0,"La neutropenia febbrile, l'emergenza oncologica piu' frequente. Neutrofili sotto cinquecento, o sotto mille con previsione di calo, con febbre da trentotto virgola tre in una singola misurazione, o da trentotto persistente."),
 (6,"chiaro",0,"E' un'emergenza: una persona senza difese puo' morire di sepsi in poche ore. La regola: emocolture, periferiche e dal catetere, e antibiotico ad ampio spettro entro sessanta minuti."),
 (6,"chiaro",0,"E una trappola: i segni di infezione possono essere minimi, perche' senza neutrofili non si forma pus ne' infiammazione evidente. A volte la febbre e' l'unico segno."),

 (7,"chiaro",0,"Le misure nel paziente neutropenico. Igiene delle mani rigorosissima. Niente visitatori con sintomi di infezione. Igiene orale e cutanea. Sicurezza degli alimenti secondo indicazione. Niente fiori e piante."),
 (7,"chiaro",0,"Nessuna manovra rettale: niente temperatura rettale, niente supposte ne' clisteri, che possono causare microlesioni e batteriemie. Nei casi indicati, l'isolamento protettivo della lezione quattro punto tre."),
 (7,"chiaro",0,"E l'educazione: misurare la febbre a casa e sapere chi chiamare, subito, se supera la soglia."),

 (8,"chiaro",0,"La piastrinopenia. Il rischio di sanguinamento aumenta sotto circa cinquantamila piastrine, e diventa spontaneo sotto diecimila-ventimila."),
 (8,"chiaro",0,"I segni: petecchie, piccoli puntini rossi, ecchimosi, sangue dalle gengive, epistassi, sangue nelle urine o nelle feci."),
 (8,"chiaro",0,"Le precauzioni sono quelle dell'anticoagulato della lezione cinque punto cinque: spazzolino morbido, rasoio elettrico, niente intramuscolari ne' manovre rettali, prevenire le cadute, compressione prolungata dopo i prelievi."),
 (8,"chiaro",0,"E trasfusione di piastrine secondo prescrizione: a venti-ventiquattro gradi, in agitazione, come nella lezione sei punto sei."),

 (9,"chiaro",0,"Le emergenze oncologiche da riconoscere. La sindrome da lisi tumorale: la distruzione rapida di molte cellule tumorali libera nel sangue potassio, fosforo e acido urico, con danno renale."),
 (9,"chiaro",0,"Si previene con idratazione e farmaci specifici, e si monitorano elettroliti e diuresi."),
 (9,"chiaro",0,"La compressione midollare: dolore dorsale che peggiora, debolezza delle gambe, disturbi sfinterici: e' un'urgenza, perche' ogni ora di ritardo aumenta il rischio di paralisi permanente."),
 (9,"chiaro",0,"La sindrome della vena cava superiore, con edema di volto e collo e dispnea. E l'ipercalcemia, con confusione, stipsi e poliuria."),

 (10,"chiaro",0,"Gli altri effetti. L'alopecia, che ha un forte impatto sull'immagine di se': va spiegata prima, perche' coglierla di sorpresa e' peggio."),
 (10,"chiaro",0,"La fatigue, una stanchezza che non passa con il riposo: e' l'effetto piu' frequente e piu' sottovalutato. La neuropatia periferica, con formicolii a mani e piedi. Le alterazioni del gusto, che peggiorano l'alimentazione."),
 (10,"chiaro",0,"L'infertilita', di cui si informa prima del trattamento, per le possibili misure di preservazione. Diarrea o stipsi."),

 (11,"chiaro",0,"Il supporto nutrizionale. La persona con un tumore e' ad alto rischio di malnutrizione e di cachessia, che ricordi dalla lezione tre punto tre non si corregge solo con il cibo."),
 (11,"chiaro",0,"Si esegue lo screening nutrizionale, si offrono pasti piccoli e frequenti e cibi graditi, supplementi, e soprattutto si trattano i sintomi che impediscono di mangiare: nausea, mucosite, dolore, stipsi."),

 (12,"chiaro",0,"Il supporto psicologico. La diagnosi e i trattamenti portano ansia, paura, a volte depressione, e cambiano la vita della famiglia e il lavoro."),
 (12,"chiaro",0,"L'infermiere offre ascolto, informazione graduale, presenza: gli strumenti della lezione due punto sette. Coinvolge il caregiver e attiva, quando serve, la psico-oncologia."),
 (12,"chiaro",0,"E un concetto importante: le cure palliative non riguardano solo il fine vita. Le cure palliative precoci, simultanee alle terapie oncologiche, migliorano la qualita' della vita. Lo vedremo nel modulo undici."),

 (13,"chiaro",0,"La radioterapia, in cenni. La cute dell'area irradiata va trattata con delicatezza: lavaggio delicato, asciugare tamponando, niente creme subito prima della seduta, niente sole."),
 (13,"chiaro",0,"E non cancellare i segni di centratura disegnati sulla pelle. La fatigue. Gli effetti legati alla sede: mucosite nel distretto testa-collo, diarrea nella pelvi."),
 (13,"chiaro",0,"E nella brachiterapia, in cui la sorgente radioattiva e' dentro il corpo, valgono le regole della radioprotezione: limitare il tempo, aumentare la distanza, usare le schermature."),

 (14,"chiaro",0,"Il caso. Una donna in chemioterapia, ultimo ciclo dieci giorni fa, siamo nel periodo del nadir, telefona: febbre a trentotto virgola quattro, nessun altro sintomo, si sente solo un po' stanca. Che cosa fai?"),
 (14,"chiaro",0,"La tratti come una possibile neutropenia febbrile finche' non si dimostra il contrario: deve presentarsi subito in ospedale secondo il percorso previsto."),
 (14,"chiaro",0,"Dove si eseguono emocromo, emocolture e antibiotico entro un'ora."),
 (14,"profondo",1.2,"[serious] Prenda un antipiretico e vediamo domani e' la risposta che puo' costarle la vita."),

 (15,"chiaro",0,"In Veneto la Rete Oncologica Veneta coordina i percorsi diagnostico-terapeutici per ciascun tipo di tumore, con figure infermieristiche dedicate e case manager che accompagnano la persona lungo il percorso."),
 (15,"chiaro",0,"Ci sono i day hospital oncologici, la rete delle cure palliative e gli screening regionali per mammella, cervice e colon-retto. All'orale, citare la Rete Oncologica Veneta e il case manager mostra conoscenza del sistema."),

 (16,"chiaro",0,"La sintesi. Antiemetici prima del trattamento. Mucosite: niente collutori alcolici. Nadir a sette-quattordici giorni. Neutropenia febbrile: sotto cinquecento e febbre da trentotto virgola tre, antibiotico entro un'ora."),
 (16,"chiaro",0,"Nel neutropenico niente manovre rettali, niente fiori. Piastrine sotto cinquantamila rischio, sotto dieci-ventimila sanguinamento spontaneo. Compressione midollare: urgenza. Radioterapia: non cancellare i segni."),

 (17,"chiaro",0,"[warm] Una frase da portare via: la febbre in un paziente in chemioterapia e' un'emergenza finche' non si dimostra il contrario. Nella prossima lezione ricomponiamo il modulo otto, con i segni d'allarme. A tra poco."),
]

CAPITOLI = {1:"Apertura",2:"Il richiamo alla 5.7",3:"Nausea e vomito",4:"La mucosite",5:"La mielosoppressione",6:"La neutropenia febbrile",
 7:"Il paziente neutropenico",8:"La piastrinopenia",9:"Le emergenze oncologiche",10:"Gli altri effetti",11:"Il supporto nutrizionale",12:"Il supporto psicologico",
 13:"La radioterapia",14:"Il caso",15:"In Veneto",16:"La sintesi",17:"Chiusura"}

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
