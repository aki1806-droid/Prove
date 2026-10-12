# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Questo caso segue un paziente chirurgico per dieci giorni, e ogni giorno ti mette davanti a una complicanza diversa, proprio quando la lezione nove punto cinque diceva di aspettarla."),
 (1,"chiaro",0,"E' un ottimo allenamento, perche' all'esame la traccia dice spesso in seconda giornata, o in settima giornata: quel numero e' gia' meta' della risposta."),

 (2,"chiaro",0,"Lo scenario. Signor Gallo, sessantasette anni, operato di emicolectomia destra per una neoplasia, in un percorso ERAS. Rientra in reparto alle sedici."),
 (2,"chiaro",0,"Ha una peridurale toracica in infusione, un drenaggio addominale, il catetere vescicale e un accesso venoso periferico. E' prescritta la profilassi antitrombotica."),
 (2,"chiaro",0,"All'arrivo: pressione centotrentotto su ottanta, frequenza ottantaquattro, saturazione novantasette con occhialini a due litri, dolore due. Fissa bene questi valori: sono il riferimento per tutto il resto."),

 (3,"chiaro",0,"Giornata zero, ore venti. Frequenza centosedici, pressione centodue su sessantaquattro, cute pallida e sudata. Il paziente e' agitato, e dice: mi sento strano."),
 (3,"chiaro",0,"Il drenaggio ha raccolto duecentottanta millilitri di sangue rosso nell'ultima ora, l'addome e' piu' teso, la diuresi e' di venti millilitri nell'ultima ora. Pausa: che cosa sta succedendo?"),

 (4,"chiaro",0,"[curious] Il ragionamento ha un trabocchetto: con la peridurale la pressione puo' calare per il blocco simpatico. Ma di solito senza una tachicardia marcata, anzi a volte con bradicardia, e senza perdite di sangue."),
 (4,"chiaro",0,"Qui ci sono tutti i segni dell'emorragia: tachicardia, pallore, sudorazione, agitazione, oliguria, drenaggio ematico abbondante, addome teso. E' un'emorragia postoperatoria con shock iniziale."),
 (4,"chiaro",0,"E nota il dettaglio: la pressione sembra ancora accettabile, ma e' scesa di oltre trentacinque rispetto al basale. E' il trend che conta."),

 (5,"chiaro",0,"Le azioni. Avvisi subito il chirurgo con lo SBAR, e informi l'anestesista per la peridurale. Ossigeno, posizione supina, un secondo accesso venoso di grosso calibro."),
 (5,"chiaro",0,"Prelievi: emocromo, coagulazione, gruppo e prove crociate. Liquidi ed emocomponenti secondo prescrizione. Parametri ogni quindici minuti, diuresi oraria, misurazione del drenaggio."),
 (5,"chiaro",0,"Digiuno, perche' e' probabile un reintervento, e preparazione del trasferimento in sala. Il signor Gallo viene rioperato: un vaso sanguinante viene suturato, e rientra stabile."),

 (6,"chiaro",0,"Giornata due. Febbricola a trentasette virgola nove, respiratoria ventiquattro, saturazione novantuno in aria, dolore sette quando tossisce."),
 (6,"chiaro",0,"Il paziente dice: non sono riuscito ad alzarmi, mi faceva troppo male. Il respiro e' superficiale, il murmure ridotto alle basi. Che cosa pensi?"),

 (7,"chiaro",0,"Seconda giornata, polmone, immobilita' e dolore: un'atelettasia, la W di wind della nove punto cinque. E il problema centrale non e' il polmone, e' il dolore, che impedisce di respirare a fondo, tossire e alzarsi."),
 (7,"chiaro",0,"Gli interventi: segnalare; un'analgesia efficace, ottimizzando la peridurale con l'anestesista; ossigeno con target novantaquattro-novantotto; posizione semiseduta."),
 (7,"chiaro",0,"Spirometro incentivante, per esempio dieci respiri ogni ora da sveglio; tosse con un cuscino sull'addome; poltrona e cammino. L'obiettivo, in un giorno: saturazione da novantaquattro in aria, dolore alla tosse fino a quattro."),

 (8,"chiaro",0,"Giornata quattro. Addome disteso e timpanico, niente gas ne' feci dall'intervento, nausea e vomito due volte, peristalsi assente all'auscultazione, potassio tre virgola due. Che cosa pensi?"),

 (9,"chiaro",0,"E' un ileo paralitico prolungato, favorito dall'ipokaliemia, perche' il potassio basso rallenta l'intestino, e dagli oppioidi. Si segnala; digiuno e sondino naso-gastrico in aspirazione, secondo prescrizione."),
 (9,"chiaro",0,"Con la verifica del posizionamento della tre punto quattro. Potassio secondo prescrizione: mai in bolo, sempre diluito e con pompa. Bilancio idrico, contando le perdite dal sondino."),
 (9,"chiaro",0,"Igiene del cavo orale, perche' a digiuno e con il sondino la bocca e' secca. Mobilizzazione. Revisione degli oppioidi con il medico. In due giorni l'intestino riparte."),

 (10,"chiaro",0,"Giornata sette. Dopo un forte colpo di tosse: mi sento come se qualcosa si fosse aperto. Dalla medicazione, abbondante liquido siero-ematico rosato. La rimuovi, e vedi anse intestinali fra i margini della ferita."),

 (11,"chiaro",0,"E' una deiscenza con eviscerazione: un'emergenza chirurgica, con la sequenza della sette punto quattro. Non lasci il paziente, e chiami aiuto. Supino, con le ginocchia flesse, che riducono la tensione sulla parete."),
 (11,"chiaro",0,"Copri con un telo o garze sterili imbevute di fisiologica tiepida. Non reinserisci i visceri. Avvisi subito il chirurgo. Digiuno, parametri, accesso venoso. Rassicuri il paziente, che e' spaventato, e documenti."),
 (11,"chiaro",0,"[thoughtful] Una riflessione: il liquido siero-ematico abbondante era il segno premonitore. Se compare, si segnala prima che la ferita si apra."),

 (12,"chiaro",0,"Perche' proprio a lui? Aveva diversi fattori di rischio: l'eta', la neoplasia, probabilmente uno stato nutrizionale compromesso, l'anemia dopo l'emorragia, e la pressione addominale aumentata da tosse e vomito."),
 (12,"chiaro",0,"La prevenzione era fatta di gesti semplici: nutrizione, sostegno della ferita con il cuscino quando tossisce o si alza, controllo della nausea. Il caso mostra come le complicanze si concatenano."),

 (13,"chiaro",0,"Giornata dodici: la dimissione. Vive con la moglie ed e' autonomo: una dimissione ordinaria. L'educazione: la ferita, e i segni di infezione e di deiscenza."),
 (13,"chiaro",0,"L'eparina a domicilio per la durata prescritta, con la tecnica e lo smaltimento degli aghi. L'alimentazione progressiva. Niente sforzi addominali per il periodo indicato."),
 (13,"chiaro",0,"I segni d'allarme: febbre, dolore in aumento, vomito, alvo chiuso, sanguinamento. Il follow-up chirurgico e oncologico, nella rete oncologica veneta. La lettera infermieristica. E tutto verificato con il teach-back."),

 (14,"chiaro",0,"La linea del tempo, da fotografare. Zero: emorragia e reintervento. Due: atelettasia. Quattro: ileo con ipokaliemia. Sette: eviscerazione. Dodici: dimissione. Ogni giornata ha la sua complicanza tipica: chiediti quale."),

 (15,"tenue",0,"[serious] Gli errori. Attribuire tachicardia e ipotensione alla peridurale senza guardare il drenaggio. Aspettare il crollo della pressione."),
 (15,"tenue",0,"Lasciare a letto il paziente perche' ha dolore, invece di trattare il dolore. Potassio senza pompa. Reinserire i visceri, o coprirli con materiale asciutto. Dimettere senza teach-back."),

 (16,"chiaro",0,"Rileggiamo il caso: il dolore e' la chiave. Non controllato, in seconda giornata ha dato un respiro superficiale, quindi l'atelettasia; ha tenuto il paziente a letto, con piu' rischio di trombosi e un ileo piu' lungo."),
 (16,"chiaro",0,"Ha reso la tosse inefficace, e ha portato ansia e insonnia. Per questo il dolore si valuta a riposo e in movimento, e si tratta con un'analgesia multimodale, a orario piu' le dosi al bisogno."),
 (16,"chiaro",0,"Con la peridurale si sorvegliano livello di analgesia, blocco motorio, pressione e sedazione. E dopo ogni intervento si rivaluta. Un dolore ben controllato previene meta' delle complicanze postoperatorie."),

 (17,"chiaro",0,"Le domande d'orale. Prima: in quale giornata compaiono le complicanze? Nelle prime ore emorragia, ostruzione delle vie aeree, ritenzione. Nei primi due giorni, atelettasia."),
 (17,"chiaro",0,"Fra il terzo e il quinto, polmonite e infezione urinaria. Fra il quinto e il decimo, infezione della ferita e deiscenza. La trombosi in ogni momento, ma piu' tipicamente dopo i primi giorni."),
 (17,"chiaro",0,"Seconda: come si previene l'atelettasia? Educazione preoperatoria, analgesia efficace, respirazione profonda e spirometro, tosse con la ferita sostenuta, posizione semiseduta, mobilizzazione precoce."),
 (17,"chiaro",0,"Terza: i segni precoci di emorragia? Tachicardia, agitazione, pallore, sudorazione, riempimento capillare rallentato, oliguria, perdite dai drenaggi. L'ipotensione e' un segno tardivo."),

 (18,"chiaro",0,"La risposta modello, giornata sette. Dopo emicolectomia, a un colpo di tosse, abbondante essudato siero-ematico e anse esposte: deiscenza con eviscerazione, emergenza chirurgica."),
 (18,"chiaro",0,"Priorita': proteggere i visceri, prevenire shock e contaminazione, attivare subito il chirurgo. Non lascio il paziente, chiamo aiuto; supino, ginocchia flesse; garze sterili con fisiologica tiepida, senza reinserire."),
 (18,"chiaro",0,"Avviso subito il chirurgo con SBAR. Digiuno, accesso venoso, parametri e dolore; preparo per la sala. Rassicuro spiegando cio' che faccio. Documento e segnalo; poi rivaluto i rischi e rafforzo il sostegno della ferita."),

 (19,"chiaro",0,"I collegamenti. Il sondino, con la tre punto quattro. Il potassio, con la tre punto cinque e la cinque punto sette. L'eviscerazione, con la sette punto quattro."),
 (19,"chiaro",0,"Il post-operatorio immediato e la peridurale, con la nove punto quattro. Le complicanze, con la nove punto cinque. La dimissione, con la nove punto sette. La trasfusione, con la sei punto sei."),

 (20,"profondo",1.2,"[serious] La frase del caso: la giornata postoperatoria e' gia' meta' della risposta."),
 (20,"chiaro",0,"[warm] Nella prossima lezione: un dolore toracico in pronto soccorso che diventa, in pochi minuti, un arresto cardiaco. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"Lo scenario",3:"Giornata 0, ore 20",4:"Il ragionamento: emorragia o peridurale?",
 5:"Giornata 0: le azioni",6:"Giornata 2",7:"Giornata 2: atelettasia",8:"Giornata 4",9:"Giornata 4: ileo prolungato",
 10:"Giornata 7",11:"Giornata 7: eviscerazione",12:"Perche' proprio a lui",13:"Giornata 12: la dimissione",
 14:"La linea del tempo del caso",15:"Gli errori da evitare",16:"Il dolore, chiave del caso",
 17:"Le domande d'orale su questo caso",18:"La risposta in 15 righe (giornata 7)",19:"I collegamenti",20:"Chiusura"}

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
