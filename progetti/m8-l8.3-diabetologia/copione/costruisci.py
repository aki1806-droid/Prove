# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Il diabete e' una delle malattie croniche piu' diffuse, e in ospedale lo trovi in quasi ogni reparto, anche quando non e' il motivo del ricovero."),
 (1,"chiaro",0,"I farmaci li abbiamo visti nella lezione cinque punto cinque; qui ci occupiamo della malattia, delle sue emergenze, chetoacidosi e stato iperosmolare, e dell'educazione, che e' la parte piu' infermieristica della cura."),

 (2,"chiaro",0,"Due forme principali. Il tipo uno: autoimmune, il sistema immunitario distrugge le cellule che producono insulina, e la carenza e' assoluta."),
 (2,"chiaro",0,"Esordisce spesso in eta' giovane, richiede insulina da subito, e la sua emergenza tipica e' la chetoacidosi."),
 (2,"chiaro",0,"Il tipo due: c'e' insulino-resistenza con un deficit relativo; riguarda l'adulto, spesso in sovrappeso, con esordio lento e a lungo silente; la sua emergenza tipica e' lo stato iperosmolare."),

 (3,"chiaro",0,"I criteri diagnostici. Glicemia a digiuno da centoventisei in su, confermata. Emoglobina glicata da sei virgola cinque per cento. Glicemia da duecento in su due ore dopo un carico orale di glucosio."),
 (3,"chiaro",0,"Oppure una glicemia casuale da duecento in su con i sintomi tipici: poliuria, polidipsia, calo di peso. L'emoglobina glicata riflette la media glicemica degli ultimi due-tre mesi."),

 (4,"chiaro",0,"La glicemia capillare, gesto quotidiano. Mani lavate con acqua e asciugate: residui di zucchero sulle dita falsano il valore. Si punge il lato del polpastrello, meno doloroso, ruotando le dita."),
 (4,"chiaro",0,"Lo strumento e' controllato secondo procedura. Si registra l'orario e il rapporto con il pasto. E un valore anomalo e inatteso si ripete, guardando la persona: la glicemia e' un dato, non una diagnosi."),

 (5,"chiaro",0,"I sensori per il monitoraggio continuo o flash sono sempre piu' diffusi, e molti pazienti arrivano in ospedale con il loro."),
 (5,"chiaro",0,"Misurano il glucosio nel liquido interstiziale, non nel sangue, con un ritardo di circa dieci-quindici minuti rispetto alla glicemia capillare."),
 (5,"chiaro",0,"Per questo in caso di ipoglicemia o di un valore discordante con i sintomi si conferma con la glicemia capillare. Il sensore racconta il passato prossimo, il dito racconta adesso."),

 (6,"chiaro",0,"L'insulina in ospedale. Lo schema raccomandato e' il basal-bolus: un'insulina basale, una rapida ai pasti e una dose di correzione se la glicemia e' alta."),
 (6,"chiaro",0,"L'uso della sola scala di correzione, senza basale, e' sconsigliato, perche' insegue la glicemia invece di prevenirla."),
 (6,"chiaro",0,"Gli obiettivi in reparto, nella maggior parte dei pazienti, sono indicativamente fra centoquaranta e centottanta: ne' l'ipoglicemia del ricoverato, ne' la glicemia che bagna le ferite."),
 (6,"chiaro",0,"E due regole pratiche: la rapida si coordina con il pasto, se il vassoio arriva in ritardo, si aspetta; e nel paziente a digiuno lo schema si rivede con il medico."),

 (7,"chiaro",0,"L'ipoglicemia, che abbiamo visto nella lezione cinque punto cinque: sotto settanta, regola del quindici, e nell'incosciente niente per bocca, ma glucagone o glucosio endovena."),
 (7,"chiaro",0,"Qui aggiungo un passo: cercare la causa. Pasto saltato, dose eccessiva, attivita' fisica, alcol, peggioramento della funzione renale, che rallenta l'eliminazione dell'insulina e delle sulfaniluree."),
 (7,"chiaro",0,"Senza la causa, l'ipoglicemia si ripete: lo zucchero corregge il numero, la causa corregge il paziente."),

 (8,"chiaro",0,"La chetoacidosi diabetica, tipica del tipo uno, a volte proprio al suo esordio. Senza insulina, l'organismo brucia i grassi e produce corpi chetonici, che sono acidi."),
 (8,"chiaro",0,"Il quadro: glicemia elevata, acidosi metabolica e chetoni nel sangue e nelle urine."),
 (8,"chiaro",0,"I segni: poliuria, sete, disidratazione, nausea, vomito, dolore addominale, che puo' simulare un addome acuto, il respiro di Kussmaul della lezione sei punto quattro, l'alito acetonico, e l'alterazione della coscienza."),

 (9,"chiaro",0,"Il trattamento, che l'infermiere gestisce minuto per minuto. Liquidi, perche' la disidratazione e' grave. Insulina in infusione endovenosa continua, con pompa. E il punto che i concorsi chiedono: il potassio."),
 (9,"chiaro",0,"L'insulina spinge il potassio dentro le cellule, quindi durante il trattamento il potassio plasmatico scende, anche se all'inizio sembrava normale o alto."),
 (9,"chiaro",0,"Si controlla spesso e si reintegra, e l'insulina non si avvia se il potassio di partenza e' troppo basso, per il rischio di aritmie. Glicemia oraria, bilancio idrico, coscienza, emogas."),

 (10,"chiaro",0,"Lo stato iperosmolare, tipico dell'anziano con diabete di tipo due. La glicemia e' molto elevata, spesso oltre seicento, il sangue diventa iperosmolare e la disidratazione e' grave, con la coscienza alterata fino al coma."),
 (10,"chiaro",0,"I chetoni sono assenti o modesti, quindi niente respiro di Kussmaul e niente alito acetonico. L'esordio e' lento, nell'arco di giorni, spesso in un anziano che beve poco o ha un'infezione."),
 (10,"chiaro",0,"E la mortalita' e' piu' alta di quella della chetoacidosi. Il trattamento si basa soprattutto sui liquidi, oltre all'insulina."),

 (11,"chiaro",0,"Il confronto in una tabella. Chetoacidosi: tipo uno, glicemia sopra duecentocinquanta, acidosi e chetoni, Kussmaul e alito acetonico, esordio in ore."),
 (11,"chiaro",0,"Stato iperosmolare: tipo due, glicemia sopra seicento, chetoni assenti o modesti, niente Kussmaul, esordio in giorni, disidratazione grave. Sei righe, e il quiz le incrocia."),

 (12,"chiaro",0,"L'educazione terapeutica, il cuore dell'assistenza al diabetico. Autocontrollo glicemico. Tecnica di iniezione e rotazione delle sedi. Riconoscere e trattare l'ipoglicemia."),
 (12,"chiaro",0,"E le regole per i giorni di malattia, che molti ignorano: quando si ha febbre o non si mangia, non si sospende l'insulina basale, e' proprio cosi' che nasce la chetoacidosi."),
 (12,"chiaro",0,"Si misura piu' spesso, si beve, e si contatta il medico. Poi alimentazione, attivita' fisica, cura del piede come nella lezione sette punto tre, guida e lavoro. Sempre con il teach-back."),

 (13,"chiaro",0,"La tiroide, in sintesi. L'ipotiroidismo rallenta tutto: astenia, intolleranza al freddo, bradicardia, stipsi, aumento di peso, cute secca."),
 (13,"chiaro",0,"L'ipertiroidismo accelera tutto: tachicardia, a volte fibrillazione atriale, calo di peso, tremori, intolleranza al caldo, agitazione, e nel morbo di Graves l'esoftalmo."),
 (13,"chiaro",0,"Un'indicazione pratica ricorrente: la levotiroxina si assume a digiuno, trenta-sessanta minuti prima della colazione, perche' il cibo ne riduce l'assorbimento."),

 (14,"chiaro",0,"Il surrene, con un'implicazione che riguarda molti pazienti: chi assume corticosteroidi a lungo ha il surrene addormentato. Per questo la terapia non si sospende bruscamente, ma si riduce gradualmente."),
 (14,"chiaro",0,"E nelle situazioni di stress, un intervento, un'infezione, puo' comparire una crisi surrenalica, con ipotensione, ipoglicemia, iponatriemia, fino allo shock."),
 (14,"chiaro",0,"E gli effetti dei corticosteroidi da sorvegliare: iperglicemia, ritenzione idrica, osteoporosi, infezioni, ritardo di guarigione delle ferite, come nella lezione sette punto uno."),

 (15,"chiaro",0,"Il caso. Ragazzo di diciannove anni con diabete di tipo uno; da due giorni febbre e vomito, ha sospeso l'insulina perche' non mangiava; ora e' sonnolento, respira profondamente, alito fruttato. Che cosa pensi?"),
 (15,"chiaro",0,"Chetoacidosi, causata proprio dalla sospensione dell'insulina nei giorni di malattia. Che cosa fai? Glicemia, chetonemia, avviso immediato al medico, accesso venoso, prelievi ed emogas, monitoraggio."),
 (15,"chiaro",0,"E preparazione di liquidi e insulina in infusione, con controllo del potassio."),
 (15,"profondo",1.2,"[serious] E poi, a distanza, l'educazione alle regole dei giorni di malattia: l'emergenza di oggi e' la lezione che non e' stata fatta ieri."),

 (16,"chiaro",0,"In Veneto il diabete e' gestito con percorsi diagnostico-terapeutici che integrano i servizi di diabetologia e i medici di medicina generale, con educazione terapeutica strutturata, spesso affidata agli infermieri."),
 (16,"chiaro",0,"E fornitura dei dispositivi per l'autocontrollo tramite il distretto. E' il modello della gestione integrata della cronicita', che vedremo nel modulo tredici."),

 (17,"chiaro",0,"Ricapitoliamo. Tipo uno: chetoacidosi. Tipo due: stato iperosmolare. Diagnosi: digiuno da centoventisei, glicata da sei virgola cinque. Sensore: ritardo di dieci-quindici minuti. Basal-bolus, target centoquaranta-centottanta."),
 (17,"chiaro",0,"Chetoacidosi: liquidi, insulina endovena, e attenzione al potassio. Nei giorni di malattia non si sospende l'insulina. Levotiroxina a digiuno. Corticosteroidi: mai sospensione brusca."),
 (17,"chiaro",0,"[warm] Nella prossima lezione: rene e vie urinarie. A tra poco."),
]

CAPITOLI = {1:"Apertura",2:"Tipo 1 e tipo 2",3:"I criteri diagnostici",4:"La glicemia capillare",5:"I sensori",6:"L'insulina in ospedale",
 7:"L'ipoglicemia",8:"La chetoacidosi",9:"Il trattamento della chetoacidosi",10:"Lo stato iperosmolare",11:"Il confronto",12:"L'educazione",
 13:"La tiroide",14:"Il surrene",15:"Il caso",16:"In Veneto",17:"Chiusura"}

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
