# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Per molte persone con diabete di tipo uno la diagnosi arriva cosi': in pronto soccorso, con una chetoacidosi. Il caso ha due facce. Una e' l'emergenza metabolica: insulina in pompa, liquidi e potassio, ora per ora."),
 (1,"chiaro",0,"L'altra e' una ragazza di diciannove anni che scopre una malattia che l'accompagnera' per tutta la vita. Ci servono le lezioni tre punto cinque, cinque punto cinque, sei punto quattro, otto punto tre e undici punto sei."),

 (2,"chiaro",0,"Lo scenario. Giulia, diciannove anni, studentessa. Da una decina di giorni beve molto, urina spesso, ha perso cinque chili ed e' sempre stanca."),
 (2,"chiaro",0,"Oggi ha vomito, dolore addominale, un respiro profondo e frequente, l'alito fruttato, ed e' sonnolenta. Glicemia quattrocentottantasei, chetoni nel sangue cinque virgola due."),
 (2,"chiaro",0,"Emogas: pH sette virgola dodici, bicarbonato nove, anidride carbonica ventidue. Potassio cinque virgola quattro, sodio centotrentuno. Frequenza centoventiquattro, pressione centodue su sessanta."),
 (2,"chiaro",0,"Fermati un momento: come leggi l'emogas? E perche' quel potassio alto e' una trappola?"),

 (3,"chiaro",0,"Il ragionamento. Poliuria, polidipsia e calo di peso in una ragazza sono i segni dell'esordio di un diabete di tipo uno. Glicemia alta, chetoni e acidosi metabolica definiscono la chetoacidosi."),
 (3,"chiaro",0,"L'emogas, con i quattro passi della lezione sei punto quattro. pH sette virgola dodici: acidemia. Bicarbonato nove: origine metabolica. Anidride carbonica ventidue, cioe' bassa: e' il compenso respiratorio."),
 (3,"chiaro",0,"Il respiro profondo di Kussmaul serve proprio a eliminare la CO2. E la tachicardia, con la pressione ai limiti, indica una disidratazione importante."),

 (4,"chiaro",0,"[serious] La trappola del potassio. Il valore nel sangue e' cinque virgola quattro, normale o un po' alto. Ma il potassio totale dell'organismo e' ridotto: Giulia ne ha perso molto con le urine e il vomito."),
 (4,"chiaro",0,"Il valore sembra normale solo perche' l'acidosi e la mancanza di insulina spingono il potassio fuori dalle cellule. Appena si da' l'insulina, il potassio rientra, e il valore nel sangue crolla: ipokaliemia e aritmie."),
 (4,"chiaro",0,"Per questo l'insulina si avvia solo con un potassio adeguato, indicativamente da tre virgola cinque in su, e il potassio si reintegra secondo protocollo durante la terapia."),

 (5,"chiaro",0,"Le prime azioni. ABCDE e avviso al medico. Due accessi venosi. Monitoraggio ECG continuo, per il potassio. E i liquidi, con soluzione fisiologica secondo prescrizione: la prima priorita', perche' la disidratazione e' grave."),
 (5,"chiaro",0,"Prelievi seriati ed emogas. Una misurazione accurata della diuresi. Digiuno per bocca finche' vomita, e un antiemetico secondo prescrizione. E la ricerca di un fattore scatenante, come un'infezione."),

 (6,"chiaro",0,"L'insulina si somministra rapida, endovena, in infusione continua con pompa, secondo protocollo. E' un farmaco ad alto livello di attenzione: si prepara con il doppio controllo."),
 (6,"chiaro",0,"Si infonde in una linea dedicata o chiaramente identificata. Si controllano la glicemia ogni ora, la chetonemia e l'emogas secondo protocollo, e il potassio ogni una-due ore all'inizio."),
 (6,"chiaro",0,"E un punto concettuale: l'obiettivo non e' solo abbassare la glicemia, ma risolvere la chetosi e l'acidosi."),

 (7,"chiaro",0,"Quando la glicemia scende. La glicemia si normalizza prima che i chetoni scompaiano. Per questo, quando si avvicina a circa duecentocinquanta, secondo protocollo si aggiunge una soluzione glucosata."),
 (7,"chiaro",0,"Mantenendo l'insulina: l'insulina serve ancora a eliminare i chetoni, e il glucosio evita l'ipoglicemia. Si evitano discese troppo rapide di glicemia e sodio."),
 (7,"chiaro",0,"E si sorveglia la coscienza: cefalea, vomito, bradicardia o un calo della coscienza possono indicare un edema cerebrale, una complicanza rara ma piu' frequente nei giovani. Si segnala subito."),

 (8,"chiaro",0,"Il passaggio all'insulina sottocutanea, un punto tecnico molto chiesto. Quando la chetoacidosi e' risolta e la paziente riesce a mangiare, si da' la basale sottocutanea prima di sospendere l'infusione."),
 (8,"chiaro",0,"Con una sovrapposizione di una-due ore, indicativamente, secondo protocollo. L'endovena ha un'azione brevissima: sospenderla senza basale fa tornare la chetosi in poche ore. Poi il basal-bolus, con il team diabetologico."),

 (9,"chiaro",0,"[thoughtful] E ora l'altra faccia del caso. Giulia ti chiede: quindi dovro' farmi le punture per sempre? E' un momento delicato. Prima l'ascolto: accogliere le emozioni, paura, rabbia, negazione."),
 (9,"chiaro",0,"Poi un'informazione graduale: non si spiega tutto il primo giorno. Il messaggio di fondo e' realistico e incoraggiante: con le competenze giuste si vive una vita piena, con lo studio, lo sport, i viaggi."),
 (9,"chiaro",0,"Si coinvolgono i familiari secondo i suoi desideri, perche' e' maggiorenne. Si offre un supporto psicologico, e la si affida al team diabetologico."),

 (10,"chiaro",0,"L'educazione, che e' un percorso e non una lezione. La tecnica di iniezione e la rotazione delle sedi, o il microinfusore. L'autocontrollo con il glucometro o il sensore. I carboidrati e le dosi ai pasti."),
 (10,"chiaro",0,"L'ipoglicemia: riconoscerla e trattarla, e il glucagone, che anche familiari e amici devono saper usare. E le regole dei giorni di malattia, che per una persona con diabete di tipo uno sono vitali."),
 (10,"chiaro",0,"Non sospendere mai l'insulina basale, misurare glicemia e chetoni, bere, chiamare. Poi alcol, sport, guida. E le associazioni di pazienti, che per una giovane possono fare la differenza."),

 (11,"chiaro",0,"Un approfondimento: chetoacidosi e stato iperosmolare a confronto, come nella lezione otto punto tre. La chetoacidosi riguarda soprattutto il tipo uno e i giovani, ed esordisce in ore o giorni."),
 (11,"chiaro",0,"Glicemia sopra duecentocinquanta, chetoni abbondanti, acidosi, Kussmaul e alito fruttato. Lo stato iperosmolare riguarda soprattutto il tipo due e gli anziani, ed esordisce in giorni."),
 (11,"chiaro",0,"Glicemie molto alte, spesso oltre seicento, chetoni assenti o lievi, una disidratazione molto grave e un'alterazione della coscienza. In entrambi: liquidi, insulina, potassio e sorveglianza della coscienza."),

 (12,"chiaro",0,"Gli errori. Rassicurarsi per il potassio normale. Avviare l'insulina prima dei liquidi, e senza conoscere il potassio. L'insulina endovena senza pompa e senza doppio controllo."),
 (12,"chiaro",0,"Sospendere l'insulina appena la glicemia si normalizza. Non aggiungere il glucosio. Sospendere l'infusione senza la basale. Sommergere la paziente di informazioni il primo giorno."),

 (13,"chiaro",0,"[curious] Le domande d'orale. Prima: che cos'e' la chetoacidosi? Un'emergenza da carenza di insulina, con iperglicemia, chetoni e acidosi metabolica."),
 (13,"chiaro",0,"Si riconosce da poliuria, sete, disidratazione, vomito, dolore addominale, respiro di Kussmaul, alito fruttato e alterazione della coscienza. Seconda: perche' sorvegliare tanto il potassio?"),
 (13,"chiaro",0,"Perche' il potassio totale e' ridotto anche se il valore nel sangue sembra normale, e con l'insulina rientra nelle cellule e crolla, con rischio di aritmie. Terza: perche' glucosio e insulina insieme?"),
 (13,"chiaro",0,"Perche' la glicemia si normalizza prima della chetosi: l'insulina serve a eliminare i chetoni, il glucosio a evitare l'ipoglicemia."),

 (14,"chiaro",0,"La risposta modello. Giovane con poliuria, polidipsia e calo di peso, ora con vomito, dolore addominale, Kussmaul, alito fruttato e sonnolenza; glicemia quattrocentottantasei, chetoni e acidosi metabolica."),
 (14,"chiaro",0,"Chetoacidosi all'esordio di un diabete di tipo uno. Priorita': correggere disidratazione, carenza di insulina e acidosi, prevenendo le alterazioni del potassio. Valuto ABCDE, avviso il medico, due accessi, ECG."),
 (14,"chiaro",0,"Infondo fisiologica secondo prescrizione e misuro la diuresi. Avvio l'insulina endovena in pompa, con doppio controllo e potassio adeguato, reintegrandolo; glicemia ogni ora, chetoni, emogas e potassio."),
 (14,"chiaro",0,"Vicino a duecentocinquanta aggiungo glucosata, mantenendo l'insulina; sorveglio la coscienza. Al passaggio sottocutaneo, la basale prima di sospendere l'infusione. Accolgo le emozioni e avvio un'educazione graduale."),

 (15,"chiaro",0,"I collegamenti. Gli elettroliti con la tre punto cinque. Le insuline e i farmaci ad alto livello di attenzione con la cinque punto cinque e la cinque punto quattro. L'emogas con la sei punto quattro."),
 (15,"chiaro",0,"Il diabete e le sue emergenze con la otto punto tre. L'educazione terapeutica con la undici punto sei. Il pancreas endocrino con la quattordici punto cinque."),

 (16,"chiaro",0,"Il punto di vista della paziente. Una malattia cronica a diciannove anni tocca l'identita', l'autonomia, le relazioni, lo studio, il futuro. E in questa fase della vita il rischio di scarsa aderenza e' alto."),
 (16,"chiaro",0,"La risposta non e' il controllo, ma l'alleanza: obiettivi condivisi, tecnologie che semplificano la vita, come i sensori, e un linguaggio non colpevolizzante. Si dice glicemia alta, non glicemia cattiva."),
 (16,"chiaro",0,"Sono gli strumenti della lezione undici punto sei, applicati a una persona giovane, che sta imparando a convivere con la sua malattia."),

 (17,"profondo",1.2,"[serious] La frase del caso: nella chetoacidosi la glicemia si corregge in fretta, i chetoni no. L'insulina si sospende per ultima, e mai senza la basale."),

 (18,"chiaro",0,"[warm] Nella prossima lezione: un paziente in nutrizione enterale che sviluppa una polmonite da inalazione, e una complicanza della rialimentazione che pochi conoscono. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"Lo scenario",3:"Il ragionamento",4:"La trappola del potassio",5:"Le prime azioni",
 6:"L'insulina in infusione",7:"Quando la glicemia scende",8:"Il passaggio all'insulina sottocutanea",9:"La notizia",
 10:"L'educazione: il percorso",11:"Chetoacidosi e stato iperosmolare",12:"Gli errori da evitare",13:"Le domande d'orale",
 14:"La risposta modello",15:"I collegamenti",16:"Il punto di vista della paziente",17:"La frase del caso",18:"Chiusura"}

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
