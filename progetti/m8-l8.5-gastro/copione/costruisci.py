# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] L'apparato digerente produce due tipi di domande d'esame: le emergenze, l'emorragia digestiva, la pancreatite, e le procedure, l'endoscopia, la preparazione intestinale, la paracentesi."),
 (1,"chiaro",0,"In mezzo c'e' la cirrosi, una malattia cronica con complicanze che l'infermiere deve saper riconoscere presto, a partire dall'encefalopatia."),
 (1,"chiaro",0,"Tre blocchi, quindi: cio' che sanguina, cio' che si scompensa, cio' che si prepara. E un filo: quasi tutto, qui, l'infermiere lo vede prima del laboratorio."),

 (2,"chiaro",0,"L'emorragia digestiva. Si dice alta se l'origine e' a monte del legamento di Treitz, esofago, stomaco, duodeno, e si manifesta con ematemesi, vomito di sangue rosso o a fondo di caffe', cioe' sangue digerito."),
 (2,"chiaro",0,"E con melena, feci nere, picee, maleodoranti. Le cause principali: ulcera peptica e varici esofagee."),
 (2,"chiaro",0,"Si dice bassa se l'origine e' nel colon o nel retto, con sangue rosso dall'ano: diverticoli, neoplasie, emorroidi. Un'avvertenza: un'emorragia alta molto abbondante puo' passare cosi' in fretta da arrivare rossa dal retto."),

 (3,"chiaro",0,"L'assistenza. Parametri e segni di shock: tachicardia, ipotensione, pallore, sudorazione, oliguria, agitazione. Due accessi venosi di grosso calibro."),
 (3,"chiaro",0,"Prelievi: emocromo, coagulazione, gruppo e prove crociate. Digiuno, perche' seguira' un'endoscopia urgente. Liquidi ed emocomponenti secondo prescrizione."),
 (3,"chiaro",0,"E un'avvertenza importante: nelle prime ore l'emoglobina puo' essere ancora normale, perche' si perde sangue intero; scende in ritardo. Un'emoglobina normale non esclude un'emorragia grave: contano i parametri."),

 (4,"chiaro",0,"Le varici esofagee sono vene dilatate dell'esofago, conseguenza dell'ipertensione portale nella cirrosi. Quando sanguinano, il sanguinamento e' spesso massivo."),
 (4,"chiaro",0,"Il trattamento, su prescrizione, comprende farmaci vasoattivi, profilassi antibiotica e legatura endoscopica."),
 (4,"chiaro",0,"Per l'infermiere, oltre allo shock, conta la sorveglianza delle vie aeree, per il rischio di inalazione del sangue vomitato: un paziente che vomita sangue e perde coscienza va messo sul fianco."),

 (5,"chiaro",0,"La cirrosi: un danno epatico cronico in cui il fegato si riempie di tessuto fibroso. Le cause principali: alcol, virus dell'epatite B e C, e sempre piu' la steatosi legata a obesita' e diabete."),
 (5,"chiaro",0,"Le complicanze: ascite, varici, encefalopatia, ittero, coagulopatia, il fegato produce meno fattori della coagulazione, infezioni come la peritonite batterica spontanea, e insufficienza renale."),

 (6,"chiaro",0,"L'ascite: liquido nella cavita' addominale. L'assistenza: dieta iposodica, diuretici secondo prescrizione, peso quotidiano e circonferenza addominale."),
 (6,"chiaro",0,"Misurata sempre nello stesso punto, di solito all'ombelico, segnato con un pennarello, e alla stessa ora. Bilancio idrico."),
 (6,"chiaro",0,"Attenzione al respiro, perche' un'ascite voluminosa comprime il diaframma, e alla cute tesa dell'addome."),

 (7,"chiaro",0,"La paracentesi, eseguita dal medico con l'assistenza infermieristica. Prima: consenso e, dettaglio da ricordare, far svuotare la vescica, per non pungerla. Posizione supina o semiseduta, asepsi."),
 (7,"chiaro",0,"Durante e dopo: sorveglianza della pressione, perche' la rimozione di molti litri puo' causare ipotensione. Si registra la quantita' drenata."),
 (7,"chiaro",0,"E nelle paracentesi di grande volume si somministra albumina secondo prescrizione, la ritrovi nella lezione sei punto tre. Poi si sorveglia il punto di puntura, da cui il liquido puo' continuare a uscire."),

 (8,"chiaro",0,"L'encefalopatia epatica: il fegato malato non elimina l'ammoniaca e altre sostanze prodotte nell'intestino, che arrivano al cervello."),
 (8,"chiaro",0,"I primi segni sono subdoli: inversione del ritmo sonno-veglia, confusione, cambiamenti della personalita'. Chi conosce il paziente li nota prima di chi lo visita."),
 (8,"chiaro",0,"Poi l'asterixis, o flapping tremor: chiedendo alla persona di tenere le braccia tese con i polsi estesi, le mani sbattono come ali. Fino al coma."),
 (8,"chiaro",0,"I fattori scatenanti sono la chiave per l'infermiere: stipsi, emorragia digestiva, il sangue nell'intestino e' una fonte di ammoniaca, infezioni, sedativi, squilibri elettrolitici, disidratazione."),

 (9,"chiaro",0,"L'assistenza. Il lattulosio, secondo prescrizione, con un obiettivo preciso: due-tre evacuazioni morbide al giorno, perche' riduce l'assorbimento dell'ammoniaca. A volte un antibiotico intestinale, la rifaximina."),
 (9,"chiaro",0,"Prevenire la stipsi, evitare i sedativi, sorvegliare lo stato di coscienza e la sicurezza, perche' la persona confusa cade."),
 (9,"chiaro",0,"E cercare sempre il fattore scatenante. Un cirrotico con stipsi da tre giorni che diventa confuso: il nesso c'e'."),

 (10,"chiaro",0,"La pancreatite acuta. Il dolore e' epigastrico, intenso, a barra, irradiato al dorso, con nausea e vomito. Le cause principali sono i calcoli biliari e l'alcol. Gli enzimi amilasi e lipasi sono elevati."),
 (10,"chiaro",0,"L'assistenza: analgesia adeguata, liquidi precoci secondo prescrizione, monitoraggio di parametri, diuresi, glicemia e calcio."),
 (10,"chiaro",0,"E un aggiornamento rispetto ai vecchi manuali: non si tiene il paziente a digiuno a lungo; la nutrizione precoce, preferibilmente enterale, appena possibile, riduce le complicanze."),

 (11,"chiaro",0,"Le procedure. La gastroscopia: digiuno dai solidi, di norma almeno sei ore, e dai liquidi chiari, di norma due, secondo procedura. Consenso, rimozione delle protesi dentarie, gestione degli anticoagulanti secondo indicazione."),
 (11,"chiaro",0,"Dopo: se e' stato usato un anestetico locale in gola, niente cibo ne' bevande finche' non ritorna il riflesso della deglutizione: e' la regola della disfagia della lezione tre punto tre."),
 (11,"chiaro",0,"E sorveglianza di dolore, febbre, enfisema: possibili segni di perforazione."),

 (12,"chiaro",0,"La colonscopia. Il risultato dipende dalla preparazione intestinale: dieta povera di scorie nei giorni precedenti, liquidi chiari il giorno prima."),
 (12,"chiaro",0,"E la soluzione lassativa, spesso in dose frazionata, una parte la sera, una la mattina: la seconda meta' vicina all'esame pulisce meglio."),
 (12,"chiaro",0,"Si sospende il ferro secondo indicazione, perche' scurisce le feci. La preparazione e' adeguata quando le scariche sono liquide, chiare, giallastre."),
 (12,"chiaro",0,"Nell'anziano si sorvegliano disidratazione, squilibri elettrolitici e il rischio di caduta nelle corse notturne al bagno. Dopo l'esame: dolore e sanguinamento, soprattutto dopo l'asportazione di polipi."),

 (13,"chiaro",0,"L'ittero: la colorazione gialla di cute e sclere, da aumento della bilirubina. Nell'ittero da ostruzione delle vie biliari le urine diventano scure e le feci chiare."),
 (13,"chiaro",0,"Il sintomo piu' fastidioso per la persona e' spesso il prurito: igiene delicata, unghie corte, cute idratata, e segnalazione per la terapia."),

 (14,"chiaro",0,"Il caso. Paziente cirrotico, da ieri piu' sonnolento e confuso, alvo chiuso da tre giorni, e stanotte ha ricevuto una benzodiazepina. Che cosa pensi?"),
 (14,"chiaro",0,"Encefalopatia epatica, con due fattori scatenanti evidenti: la stipsi e il sedativo. Che cosa fai? Valuti coscienza e asterixis, rilevi parametri e glicemia."),
 (14,"chiaro",0,"Avvisi il medico segnalando i fattori scatenanti, e prepari il lattulosio secondo prescrizione."),
 (14,"profondo",1.2,"[serious] E sorvegli la sicurezza e il rischio di inalazione. Il nesso c'era gia' ieri sera, nella consegna: tre giorni senza alvo e una benzodiazepina."),

 (15,"chiaro",0,"In Veneto, accanto ai servizi di endoscopia digestiva e ai percorsi per l'emorragia digestiva, e' attivo il programma regionale di screening del tumore del colon-retto."),
 (15,"chiaro",0,"Con la ricerca del sangue occulto nelle feci e la colonscopia di approfondimento: un tema di prevenzione che collega questa lezione al modulo undici."),

 (16,"chiaro",0,"La sintesi. Ematemesi e melena: emorragia alta; rettorragia: bassa. L'emoglobina scende in ritardo. Due accessi di grosso calibro. Ascite: peso e circonferenza. Paracentesi: vescica vuota, albumina."),
 (16,"chiaro",0,"Encefalopatia: asterixis, lattulosio per due-tre scariche, niente sedativi. Pancreatite: dolore a barra verso il dorso. Dopo la gastroscopia: aspettare il riflesso della deglutizione."),

 (17,"chiaro",0,"[warm] Nella prossima lezione entriamo in neurologia, con l'ictus al centro: riconoscerlo in pochi secondi e attivare il percorso giusto puo' cambiare la vita di una persona. A tra poco."),
]

CAPITOLI = {1:"Apertura",2:"L'emorragia digestiva",3:"L'assistenza nell'emorragia",4:"Le varici",5:"La cirrosi",6:"L'ascite",
 7:"La paracentesi",8:"L'encefalopatia",9:"L'assistenza nell'encefalopatia",10:"La pancreatite",11:"La gastroscopia",12:"La colonscopia",
 13:"L'ittero",14:"Il caso",15:"In Veneto",16:"La sintesi",17:"Chiusura"}

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
