# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] L'area materno-infantile e' il territorio dell'ostetrica e dell'infermiere pediatrico. Ma l'infermiere generalista la incontra spesso."),
 (1,"chiaro",0,"Una donna in gravidanza ricoverata in medicina, un neonato in pronto soccorso, un bambino in un reparto per adulti. In quei momenti, i fondamenti servono a tutti."),
 (1,"chiaro",0,"I concorsi chiedono proprio quelli: le complicanze della gravidanza da riconoscere, il neonato, e le regole della pediatria di base. Con alcune regole secche, che all'esame si sbagliano facilmente."),

 (2,"chiaro",0,"La gravidanza dura circa quaranta settimane, cioe' duecentottanta giorni, contati dal primo giorno dell'ultima mestruazione. Si parla di parto a termine fra trentasette e quarantadue settimane."),
 (2,"chiaro",0,"La data presunta del parto si calcola con la regola di Naegele: primo giorno dell'ultima mestruazione, piu' sette giorni, meno tre mesi, piu' un anno."),
 (2,"chiaro",0,"La gravidanza e' divisa in tre trimestri, con controlli, ecografie ed esami di screening programmati. Conoscere l'epoca della gravidanza serve a leggere ogni sintomo nel suo momento."),

 (3,"chiaro",0,"La preeclampsia: un'ipertensione da centoquaranta su novanta che compare dopo la ventesima settimana, con proteinuria o altri segni di danno d'organo."),
 (3,"chiaro",0,"I segni d'allarme: cefalea intensa, disturbi visivi, dolore epigastrico, edemi improvvisi. Se compaiono convulsioni, si parla di eclampsia."),
 (3,"chiaro",0,"Il farmaco per prevenirle e trattarle e' il magnesio solfato. L'infermiere sorveglia i segni di tossicita': riflessi tendinei che si riducono, frequenza respiratoria che rallenta, diuresi ridotta."),
 (3,"chiaro",0,"E l'antidoto del magnesio e' il calcio gluconato. Riflessi, respiro, diuresi, calcio gluconato: e' una sequenza che i concorsi chiedono spesso."),

 (4,"chiaro",0,"Le emorragie in gravidanza. La prima e' la placenta previa, cioe' inserita in basso, davanti al canale del parto: un sanguinamento rosso vivo, indolore."),
 (4,"chiaro",0,"E una regola precisa: non si eseguono esplorazioni vaginali, perche' possono scatenare un'emorragia massiva. Il distacco di placenta: sanguinamento con dolore, utero teso e duro, sofferenza fetale."),
 (4,"chiaro",0,"Indolore la previa, doloroso il distacco: e' la distinzione che i concorsi chiedono. Sono entrambe emergenze ostetriche, e in entrambe si avvisa subito."),
 (4,"chiaro",0,"Nel primo trimestre: la minaccia d'aborto e la gravidanza extrauterina, con dolore addominale, sanguinamento e possibile shock. Da sospettare in ogni donna in eta' fertile con dolore addominale."),

 (5,"chiaro",0,"Altre attenzioni. Il diabete gestazionale, che si ricerca con la curva da carico di glucosio, di norma fra la ventiquattresima e la ventottesima settimana, nelle donne con fattori di rischio."),
 (5,"chiaro",0,"E tre attenzioni per chiunque assista una donna in gravidanza. I farmaci: molti sono controindicati, e si verifica sempre. Le radiazioni. E la posizione."),
 (5,"chiaro",0,"Dopo la ventesima settimana, nella posizione supina prolungata l'utero comprime la vena cava, con ipotensione. Si preferisce il decubito laterale sinistro."),

 (6,"chiaro",0,"Il parto: fase prodromica, fase dilatante, fino ai dieci centimetri di dilatazione, fase espulsiva, e il secondamento, cioe' l'espulsione della placenta."),
 (6,"chiaro",0,"Poi le prime due ore del post-partum, le piu' a rischio di emorragia. Il puerperio dura circa sei settimane: l'utero torna alle dimensioni normali, e si osservano i lochi, perdite prima rosse, poi sierose, poi biancastre."),
 (6,"chiaro",0,"E l'umore. Il baby blues, una tristezza transitoria nei primi giorni, e' frequente. La depressione post-partum e' piu' duratura e intensa, e va riconosciuta e segnalata."),

 (7,"chiaro",0,"L'allattamento. L'OMS raccomanda l'allattamento esclusivo fino a circa sei mesi, poi proseguito con l'introduzione di altri alimenti. Si allatta a richiesta."),
 (7,"chiaro",0,"Il colostro dei primi giorni e' poco abbondante, ma ricchissimo di anticorpi. E il contatto pelle a pelle precoce favorisce l'avvio dell'allattamento."),
 (7,"chiaro",0,"Un attacco corretto previene il dolore e le ragadi: bocca ben aperta, labbro inferiore estroflesso, mento a contatto con il seno."),

 (8,"chiaro",0,"Il neonato. La valutazione con l'Apgar, che conosci dalla lezione dieci punto quattro. La prevenzione dell'ipotermia. La vitamina K, per prevenire la malattia emorragica del neonato."),
 (8,"chiaro",0,"La profilassi oculare secondo protocollo. E l'identificazione di madre e neonato, con braccialetti corrispondenti: lo stesso principio di sicurezza dell'identificazione del paziente adulto."),
 (8,"chiaro",0,"E due fenomeni normali: il calo di peso dei primi giorni, fino al sette, dieci per cento, recuperato in circa due settimane. E il moncone ombelicale, che si mantiene asciutto e pulito."),

 (9,"chiaro",0,"Gli screening neonatali, obbligatori e gratuiti. Lo screening metabolico esteso: poche gocce di sangue dal tallone, per ricercare decine di malattie metaboliche ereditarie."),
 (9,"chiaro",0,"E' previsto dalla legge centosessantasette del duemilasedici. Poi lo screening uditivo, quello visivo, con il riflesso rosso, e altri controlli, come quello per la displasia dell'anca."),

 (10,"chiaro",0,"L'ittero neonatale. L'ittero fisiologico compare dopo le prime ventiquattro ore, ha un picco fra il terzo e il quinto giorno, e si risolve spontaneamente."),
 (10,"chiaro",0,"La regola da sapere riguarda il tempo: non quanto e' giallo il neonato, ma quando l'ittero e' comparso. Un ittero che compare prima va sempre segnalato."),
 (10,"profondo",1.2,"[serious] Ittero nelle prime ventiquattro ore: sempre patologico."),
 (10,"chiaro",0,"Il trattamento e' la fototerapia: si proteggono gli occhi, si espone la massima superficie di pelle, si mantengono idratazione e allattamento, si controlla la temperatura."),

 (11,"chiaro",0,"La prevenzione della morte improvvisa del lattante, un tema di educazione ai genitori. Il lattante dorme a pancia in su, su un materasso rigido, senza cuscini, peluche o paracolpi."),
 (11,"chiaro",0,"Non va coperto troppo, e la stanza non va surriscaldata. Niente fumo, ne' in gravidanza ne' attorno al bambino. L'allattamento al seno e' protettivo. E la culla si tiene nella stanza dei genitori."),

 (12,"chiaro",0,"La pediatria di base. I parametri vitali sono diversi dall'adulto: frequenza cardiaca e respiratoria piu' alte, pressione piu' bassa. Si confrontano con i valori dell'eta'."),
 (12,"chiaro",0,"Le dosi si calcolano in base al peso, con i calcoli della lezione cinque punto tre e la verifica della dose massima. Per la febbre, il paracetamolo secondo il peso."),
 (12,"profondo",1.2,"[serious] Niente acido acetilsalicilico nel bambino."),
 (12,"chiaro",0,"Per il rischio della sindrome di Reye, una grave encefalopatia con danno epatico. E la disidratazione nel bambino e' rapida: pannolini asciutti, mucose secche, letargia."),

 (13,"chiaro",0,"Il dolore nel bambino, a lungo sottovalutato. Si valuta con scale adatte all'eta'. La FLACC, sotto i tre anni o nel bambino che non parla: viso, gambe, attivita', pianto, consolabilita'."),
 (13,"chiaro",0,"La scala delle facce di Wong-Baker, dai tre, quattro anni: il bambino indica la faccina che somiglia al suo dolore. La scala numerica, dagli otto anni circa."),
 (13,"chiaro",0,"E gli interventi non farmacologici: la presenza dei genitori, la distrazione, il saccarosio per bocca o l'allattamento nel neonato durante le procedure, una crema anestetica prima del prelievo."),

 (14,"chiaro",0,"Il caso. Un neonato di diciotto ore. La madre nota che pelle e occhi sono diventati gialli, e te lo fa notare, preoccupata. Che cosa pensi?"),
 (14,"chiaro",0,"Un ittero comparso nelle prime ventiquattro ore: quindi patologico, non fisiologico. Che cosa fai? Segnali subito al pediatra o al neonatologo."),
 (14,"chiaro",0,"Che valutera' la bilirubina e la causa, per esempio un'incompatibilita' di gruppo fra madre e neonato. Sorvegli stato generale, alimentazione e urine, e rassicuri la madre, senza minimizzare."),

 (15,"chiaro",0,"In Veneto c'e' il percorso nascita regionale: punti nascita in rete, screening neonatali, consultori familiari per gravidanza e puerperio, pediatri di libera scelta. E l'allattamento e' un obiettivo regionale."),

 (16,"chiaro",0,"La tabella. Termine fra trentasette e quarantadue settimane. Naegele: piu' sette giorni, meno tre mesi, piu' un anno. Preeclampsia dopo la ventesima. Magnesio: riflessi, respiro, diuresi, antidoto calcio gluconato."),
 (16,"chiaro",0,"Previa indolore, distacco doloroso. Decubito laterale sinistro. Allattamento esclusivo sei mesi. Vitamina K. Ittero sotto le ventiquattro ore: patologico. Niente aspirina. FLACC, facce, numerica."),

 (17,"chiaro",0,"[warm] Nella prossima lezione, all'estremo opposto del ciclo di vita: le cure palliative e il fine vita. La sedazione palliativa, la sua differenza dall'eutanasia, l'accompagnamento della persona e della famiglia. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"La gravidanza fisiologica",3:"La preeclampsia",4:"Le emorragie in gravidanza",5:"Il diabete gestazionale e altre attenzioni",6:"Travaglio e puerperio",
 7:"L'allattamento",8:"Il neonato: le prime cure",9:"Gli screening neonatali",10:"L'ittero neonatale",11:"La morte improvvisa del lattante",12:"La pediatria: parametri e farmaci",
 13:"Il dolore nel bambino",14:"Il caso",15:"In Veneto",16:"La tabella",17:"Chiusura"}

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
