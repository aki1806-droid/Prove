# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Tre famiglie di farmaci che trovi in quasi ogni reparto, e tre famiglie ad alto rischio. Per ciascuna l'approccio e' lo stesso, ed e' quello che i concorsi premiano."),
 (1,"chiaro",0,"Non serve conoscere tutti i principi attivi: serve sapere che cosa controllare prima di somministrare, che cosa sorvegliare dopo, e qual e' l'antidoto se qualcosa va storto."),

 (2,"chiaro",0,"Un trucco che fa risparmiare molte domande: i suffissi. Pril: ACE-inibitori, come ramipril ed enalapril. Sartan: sartani. Olol: beta-bloccanti. Dipina: calcio-antagonisti come l'amlodipina."),
 (2,"chiaro",0,"Gliflozin, gliptin, glutide: tre famiglie di antidiabetici. Parina: eparine a basso peso molecolare. Riconoscere la classe dal nome ti dice subito che cosa sorvegliare."),

 (3,"chiaro",0,"I diuretici. Quelli dell'ansa, come la furosemide, sono i piu' potenti: sorvegliare potassio, pressione, segni di disidratazione, e in endovena non somministrarli rapidamente, per il rischio di ototossicita'."),
 (3,"chiaro",0,"I tiazidici danno ipokaliemia, iperglicemia e aumento dell'acido urico. I risparmiatori di potassio, come lo spironolattone, fanno il contrario: iperkaliemia."),
 (3,"chiaro",0,"E una regola pratica: si danno al mattino, per non costringere la persona ad alzarsi di notte, con il rischio di caduta che ne consegue."),

 (4,"chiaro",0,"Il monitoraggio di chi assume un diuretico e' quello della lezione tre punto cinque: peso quotidiano, bilancio idrico, diuresi, pressione, anche in piedi, per l'ipotensione ortostatica, potassio e funzione renale."),

 (5,"chiaro",0,"ACE-inibitori e sartani abbassano la pressione e proteggono cuore e reni. Gli ACE-inibitori hanno un effetto collaterale caratteristico: la tosse secca, che spesso porta a passare a un sartano."),
 (5,"chiaro",0,"Il piu' grave e' l'angioedema, gonfiore di labbra, lingua, glottide, che e' un'emergenza. Entrambe le classi possono dare iperkaliemia e ipotensione, soprattutto alla prima dose."),

 (6,"chiaro",0,"I beta-bloccanti. Rallentano il cuore, quindi il primo effetto da sorvegliare e' la bradicardia, insieme all'ipotensione. Quelli non selettivi possono dare broncospasmo negli asmatici."),
 (6,"chiaro",0,"Nel diabetico mascherano i segni adrenergici dell'ipoglicemia, come tremore e tachicardia. Non si sospendono bruscamente, per il rischio di rimbalzo."),
 (6,"chiaro",0,"E prima di somministrarli si controllano frequenza e pressione: se la prescrizione indica soglie, sotto quelle soglie si sospende e si avvisa."),

 (7,"chiaro",0,"Tre classi in una slide. I calcio-antagonisti diidropiridinici danno edemi alle caviglie e cefalea; verapamil e diltiazem danno bradicardia."),
 (7,"chiaro",0,"I nitrati, come la nitroglicerina, danno cefalea e ipotensione, e sono controindicati in chi ha assunto farmaci per la disfunzione erettile, come il sildenafil: la combinazione provoca ipotensioni gravi. Va chiesto."),
 (7,"chiaro",0,"L'amiodarone, antiaritmico, e' irritante per le vene, in periferica da' flebite, e a lungo termine puo' alterare tiroide, cute e polmone."),

 (8,"chiaro",0,"La digossina, domanda classica. Ha una finestra terapeutica stretta, ricordi la lezione cinque punto uno. Prima della somministrazione si controlla la frequenza apicale per un minuto; sotto la soglia si sospende e si avvisa."),
 (8,"chiaro",0,"I segni di tossicita': nausea, vomito, perdita di appetito, disturbi visivi, la visione gialla, bradicardia e aritmie."),
 (8,"chiaro",0,"E un'interazione da sapere: l'ipokaliemia, per esempio da diuretico dell'ansa, aumenta la tossicita' della digossina. Due farmaci che spesso si trovano nella stessa terapia."),

 (9,"chiaro",0,"Le insuline. Gli analoghi rapidi agiscono in dieci-quindici minuti e si somministrano al pasto: se la persona poi non mangia, il rischio di ipoglicemia e' immediato. La regolare umana agisce in circa mezz'ora."),
 (9,"chiaro",0,"L'intermedia, la NPH, e' lattiginosa e va rotolata fra le mani, non agitata. Le basali, glargine e degludec, non hanno picco e non si miscelano. In vena si usa solo la rapida o la regolare."),

 (10,"chiaro",0,"La conservazione. Le confezioni non aperte stanno in frigorifero, fra due e otto gradi. Mai congelare: l'insulina congelata si altera anche se scongelata."),
 (10,"chiaro",0,"La penna in uso si tiene a temperatura ambiente per il periodo indicato dal produttore, generalmente alcune settimane, e si annota la data di apertura. E' la catena del freddo della lezione cinque punto sette."),

 (11,"chiaro",0,"L'ipoglicemia, sotto i settanta milligrammi per decilitro. I sintomi sono di due tipi: adrenergici, tremore, sudorazione, tachicardia, fame; e neuroglicopenici, confusione, comportamento anomalo, sonnolenza fino al coma."),
 (11,"chiaro",0,"Nell'anziano e in chi assume beta-bloccanti i primi possono mancare. Nella persona cosciente vale la regola del quindici: quindici grammi di zuccheri semplici, succo, zucchero sciolto in acqua, bustine di glucosio."),
 (11,"profondo",1.2,"[serious] E ricontrollo dopo quindici minuti. Nella persona incosciente, niente per bocca: glucagone intramuscolo o sottocute, oppure glucosio endovena, secondo protocollo."),

 (12,"chiaro",0,"Gli antidiabetici non insulinici. La metformina, il farmaco di base: disturbi gastrointestinali e, raramente, acidosi lattica; va gestita secondo protocollo prima di esami con mezzo di contrasto e interventi."),
 (12,"chiaro",0,"Le sulfaniluree stimolano l'insulina e possono dare ipoglicemie, anche prolungate, soprattutto nell'anziano. Gli agonisti GLP-1, i glutide, sono iniettivi e danno spesso nausea."),
 (12,"chiaro",0,"Gli SGLT2-inibitori, i gliflozin, eliminano glucosio con le urine: favoriscono infezioni genitourinarie e possono dare chetoacidosi anche con glicemia normale; si sospendono prima degli interventi."),

 (13,"chiaro",0,"Gli anticoagulanti, cominciando dalle eparine. L'eparina non frazionata si somministra di solito in infusione endovenosa continua, con pompa, e si monitora con l'aPTT; il suo antidoto e' la protamina solfato."),
 (13,"chiaro",0,"Le eparine a basso peso molecolare, come l'enoxaparina, si danno sottocute, a dose calcolata sul peso e adattata alla funzione renale; non richiedono monitoraggio di routine, e la protamina le neutralizza solo in parte."),
 (13,"chiaro",0,"Con tutte le eparine si sorvegliano le piastrine, per il rischio di trombocitopenia indotta da eparina, la HIT."),

 (14,"chiaro",0,"Il warfarin, antagonista della vitamina K. Agisce in giorni, non in ore, e si monitora con l'INR, il cui range abituale e' fra due e tre, piu' alto in alcuni portatori di valvole meccaniche."),
 (14,"chiaro",0,"Molte interazioni: antibiotici, amiodarone, FANS, alcol. Sull'alimentazione, un errore da quiz: la vitamina K non va esclusa, va assunta con costanza, perche' sono le variazioni brusche a destabilizzare l'INR."),
 (14,"chiaro",0,"L'antidoto e' la vitamina K; nel sanguinamento grave si usa il concentrato di complesso protrombinico."),

 (15,"chiaro",0,"I DOAC, gli anticoagulanti orali diretti. Il dabigatran inibisce la trombina; rivaroxaban, apixaban, edoxaban inibiscono il fattore dieci attivato. Non richiedono l'INR di routine, e hanno meno interazioni del warfarin."),
 (15,"chiaro",0,"Ma hanno un'emivita breve: una dose saltata lascia la persona scoperta in fretta, e l'aderenza e' cruciale. Antidoti: idarucizumab per il dabigatran; per gli anti-Xa un antidoto specifico, o il complesso protrombinico."),

 (16,"chiaro",0,"Gli antiaggreganti non sono anticoagulanti, ma aumentano anch'essi il rischio di sanguinamento: acido acetilsalicilico, clopidogrel, ticagrelor, prasugrel."),
 (16,"chiaro",0,"Dopo l'impianto di uno stent coronarico si usa la doppia antiaggregazione, e sospenderla senza indicazione del cardiologo espone alla trombosi dello stent, un evento spesso fatale."),
 (16,"chiaro",0,"Se un paziente dice il medico di base mi ha detto di smettere l'aspirina prima dell'intervento, la domanda da porre e': ha uno stent?"),

 (17,"chiaro",0,"L'assistenza al paziente anticoagulato. Sorvegliare i segni di sanguinamento: gengive, epistassi, urine scure o rosse, feci nere, ematomi, e una cefalea improvvisa, che puo' indicare un sanguinamento cerebrale."),
 (17,"chiaro",0,"Spazzolino morbido e rasoio elettrico. Evitare le intramuscolari. Compressione prolungata dopo prelievi e rimozione di accessi. Prevenzione delle cadute, lezione tre punto uno. E educazione alla dimissione."),

 (18,"chiaro",0,"La tabella degli antidoti, da fotografare. Eparina non frazionata: protamina. Warfarin: vitamina K, e nei casi gravi complesso protrombinico. Dabigatran: idarucizumab."),
 (18,"chiaro",0,"Anti-Xa: antidoto specifico dove disponibile o complesso protrombinico. Ipoglicemia da insulina: glucagone o glucosio. Digossina: anticorpi specifici antidigossina."),

 (19,"chiaro",0,"In Veneto la sorveglianza della terapia anticoagulante orale passa da centri e ambulatori dedicati, spesso con presa in carico territoriale, e le aziende hanno procedure sull'ipoglicemia e sull'insulina in reparto."),
 (19,"chiaro",0,"All'orale, la risposta completa collega il farmaco all'educazione terapeutica alla dimissione, con il teach-back: chi va a casa con un anticoagulante o con l'insulina deve saper riconoscere i segni di allarme."),

 (20,"chiaro",0,"Ricapitoliamo. Diuretici al mattino, controllando il potassio. Beta-bloccanti: frequenza e pressione prima. Digossina: polso apicale per un minuto, e l'ipokaliemia ne aumenta la tossicita'."),
 (20,"chiaro",0,"[warm] Ipoglicemia sotto settanta: regola del quindici, niente per bocca se incosciente. Warfarin: INR due-tre, vitamina K con costanza. DOAC: niente INR, nessuna dose saltata. Gli antidoti a memoria. A tra poco."),
]

CAPITOLI = {1:"Apertura",2:"Il trucco dei suffissi",3:"I diuretici",4:"Il monitoraggio del diuretico",5:"ACE-inibitori e sartani",
 6:"I beta-bloccanti",7:"Calcio-antagonisti, nitrati, amiodarone",8:"La digossina",9:"Le insuline",
 10:"La conservazione dell'insulina",11:"L'ipoglicemia",12:"Gli antidiabetici orali",13:"Le eparine",14:"Il warfarin",
 15:"I DOAC",16:"Gli antiaggreganti",17:"Il paziente anticoagulato",18:"Gli antidoti",19:"In Veneto",20:"Chiusura"}

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
