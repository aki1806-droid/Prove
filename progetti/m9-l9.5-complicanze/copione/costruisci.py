# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Le complicanze postoperatorie hanno una caratteristica utile per chi le deve riconoscere: compaiono in momenti tipici, e ogni giornata dopo l'intervento ha i suoi sospetti."),
 (1,"chiaro",0,"L'emorragia nelle prime ore, l'atelettasia nei primi giorni, l'infezione della ferita dopo qualche giorno, la trombosi piu' avanti. Conoscere questa cronologia permette di cercare la complicanza giusta al momento giusto."),

 (2,"chiaro",0,"La cronologia. Nelle prime ore: emorragia e shock, ostruzione delle vie aeree, nausea e vomito, ritenzione urinaria. Sono le complicanze dell'anestesia e della ferita appena chiusa."),
 (2,"chiaro",0,"Nei primi uno-due giorni: atelettasia e delirium. Fra il terzo e il quinto giorno: polmonite, infezione urinaria, ileo che si prolunga oltre il tempo atteso."),
 (2,"chiaro",0,"Fra il quinto e il decimo: infezione della ferita, deiscenza. E la trombosi venosa con l'embolia polmonare, possibili in ogni momento, ma piu' tipiche dopo i primi giorni."),

 (3,"chiaro",0,"La febbre postoperatoria si interpreta con una regola mnemonica inglese, quella delle cinque W: cinque parole che iniziano con la stessa lettera, una per ogni sede e per ogni giornata."),
 (3,"chiaro",0,"Wind, il vento, cioe' il polmone: primo-secondo giorno. Water, l'acqua, cioe' le vie urinarie: terzo-quinto giorno."),
 (3,"chiaro",0,"Wound, la ferita: quinto-settimo. Walking, il camminare, cioe' la trombosi venosa: dopo il quinto. Wonder drugs, i farmaci e le trasfusioni: in ogni momento."),
 (3,"chiaro",0,"E una precisazione: una febbricola nelle prime ventiquattro-quarantotto ore e' spesso solo la risposta infiammatoria all'intervento, e non richiede di cercare un'infezione."),

 (4,"chiaro",0,"L'emorragia. I segni precoci sono quelli che contano: tachicardia, agitazione, pallore, sudorazione, riempimento capillare lento, oliguria. Sono i segni del compenso: il corpo che difende gli organi vitali."),
 (4,"chiaro",0,"L'ipotensione e' un segno tardivo: quando la pressione crolla, la persona ha gia' perso molto sangue, e il compenso e' finito."),
 (4,"profondo",1.2,"[serious] L'ipotensione e' un segno tardivo."),
 (4,"chiaro",0,"Le fonti: la ferita, i drenaggi, oppure un sanguinamento interno, che si sospetta con addome teso e dolente, perche' il sangue che non esce si accumula dove non si vede."),
 (4,"chiaro",0,"La condotta: avvisare subito, ossigeno, accessi venosi, prelievi con gruppo, liquidi ed emocomponenti secondo prescrizione, digiuno per un possibile reintervento, parametri ravvicinati."),

 (5,"chiaro",0,"L'atelettasia: piccole porzioni di polmone collassano perche' la persona respira in modo superficiale, per il dolore, gli oppioidi, l'immobilita', gli effetti dell'anestesia."),
 (5,"chiaro",0,"I segni: una lieve febbre, tachipnea, desaturazione, murmure ridotto alle basi, cioe' nelle parti piu' basse del polmone, dove l'aria arriva meno quando si sta sdraiati."),
 (5,"chiaro",0,"E' la complicanza in cui l'infermiere conta di piu', perche' si previene quasi del tutto: respirazione profonda, spirometro incentivante, tosse con sostegno della ferita."),
 (5,"chiaro",0,"Mobilizzazione, analgesia adeguata, posizione semiseduta. Se non si previene, evolve in polmonite: il polmone chiuso e' il polmone che si infetta."),

 (6,"chiaro",0,"Trombosi venosa profonda ed embolia polmonare. La TVP: dolore, edema monolaterale del polpaccio, calore. Monolaterale e' la parola chiave: una gamba sola, piu' grossa dell'altra."),
 (6,"chiaro",0,"L'embolia: dispnea improvvisa, dolore toracico, tachicardia, desaturazione, spesso con un'intensa ansia della persona, che sente di non respirare."),
 (6,"chiaro",0,"La prevenzione l'abbiamo vista: mobilizzazione precoce, profilassi meccanica e farmacologica, idratazione. E nel sospetto di TVP vale la regola della lezione tre punto due: non massaggiare, avvisare."),

 (7,"chiaro",0,"La ritenzione urinaria: nessuna minzione entro sei-otto ore, oppure minzioni piccole e frequenti, per rigurgito: la vescica piena che trabocca, e che inganna chi guarda solo il pannolone."),
 (7,"chiaro",0,"Il globo, il dolore sovrapubico, l'agitazione, che nell'anziano viene spesso scambiata per delirium: prima di sedare un anziano agitato, si guarda la vescica."),
 (7,"chiaro",0,"Si valuta con il bladder scanner e si procede al cateterismo secondo indicazione. Ricordi i fattori di rischio: spinale, oppioidi, chirurgia pelvica, prostata."),

 (8,"chiaro",0,"L'ileo paralitico: dopo la chirurgia addominale l'intestino rallenta, e a volte si ferma. I segni: distensione addominale, assenza di gas e feci, nausea, vomito, peristalsi assente all'auscultazione."),
 (8,"chiaro",0,"Si previene con gli strumenti dell'ERAS: mobilizzazione e alimentazione precoci, meno oppioidi, che rallentano l'intestino, equilibrio dei liquidi."),
 (8,"chiaro",0,"Il trattamento e' su prescrizione: digiuno, a volte un sondino naso-gastrico in aspirazione, e correzione degli elettroliti, soprattutto del potassio, la cui carenza rallenta l'intestino."),

 (9,"chiaro",0,"L'infezione della ferita e la deiscenza, che abbiamo approfondito nella lezione sette punto quattro: qui le collochiamo nel tempo."),
 (9,"chiaro",0,"L'infezione: fra il quinto e il settimo giorno, con rossore che si estende, dolore che aumenta invece di diminuire, essudato purulento, febbre."),
 (9,"chiaro",0,"La deiscenza: fra il quinto e il decimo, preannunciata da un abbondante liquido siero-ematico. E l'eviscerazione, con la sua sequenza di emergenza."),

 (10,"chiaro",0,"E le altre complicanze, che non vanno dimenticate. Il delirium dell'anziano, nei primi tre giorni. Le lesioni da pressione, al sacro e ai talloni, che iniziano in sala operatoria."),
 (10,"chiaro",0,"L'iperglicemia da stress, anche in chi non e' diabetico. Gli squilibri elettrolitici, per le perdite, i liquidi infusi, il digiuno: si leggono gli esami, non solo i parametri."),
 (10,"chiaro",0,"Le infezioni da dispositivi: il catetere vescicale e il catetere venoso centrale, che vanno rimossi appena possibile. La stipsi da oppioidi."),

 (11,"chiaro",0,"Il filo comune e' il riconoscimento precoce. Parametri a intervalli definiti, un punteggio di allerta precoce come la NEWS2, che trasforma i parametri in un numero e il numero in un'azione."),
 (11,"chiaro",0,"E poi una cosa che non compare negli strumenti: ascoltare il paziente. Un «non mi sento bene», un'ansia nuova, una confusione improvvisa spesso precedono di ore l'alterazione dei parametri."),
 (11,"chiaro",0,"Si guarda il trend, non il singolo valore: una frequenza di cento che ieri era settanta dice piu' di una frequenza di cento da sola. E si segnala con lo SBAR."),

 (12,"chiaro",0,"Due casi. Primo: secondo giorno dopo una colectomia; febbre a trentasette e nove, frequenza respiratoria ventiquattro, saturazione novantadue, murmure ridotto alle basi."),
 (12,"chiaro",0,"E il paziente e' rimasto a letto per il dolore. Che cosa pensi? Atelettasia: e' il secondo giorno, e' il polmone. Wind, la prima W."),
 (12,"chiaro",0,"Che cosa fai? Avvisi il medico, ossigeno secondo prescrizione, posizione semiseduta, analgesia adeguata, perche' il problema nasce dal dolore. Spirometro incentivante, tosse con sostegno della ferita, mobilizzazione."),

 (13,"chiaro",0,"Secondo: sesto giorno dopo una protesi d'anca; improvvisa dispnea, dolore toracico, frequenza centodiciotto, saturazione ottantotto, paziente molto ansioso."),
 (13,"chiaro",0,"Che cosa pensi? Embolia polmonare, fino a prova contraria: l'ortopedia dell'arto inferiore e' uno dei contesti a piu' alto rischio trombotico, e il sesto giorno e' il momento tipico."),
 (13,"chiaro",0,"Che cosa fai? Avvisi subito il medico, ossigeno, posizione semiseduta, monitoraggio, accesso venoso, prelievi, ECG, e prepari gli esami diagnostici."),
 (13,"chiaro",0,"Non attribuire la dispnea all'ansia: qui l'ansia e' un sintomo, non la causa. Un paziente che dice di non respirare va creduto."),

 (14,"chiaro",0,"Nelle aziende venete il riconoscimento precoce del deterioramento e' supportato da sistemi di allerta e da equipe di risposta rapida, che vedremo nel modulo dieci."),
 (14,"chiaro",0,"Da protocolli di profilassi antitrombotica e dalla sorveglianza delle infezioni del sito chirurgico. In molte realta' esistono percorsi ortogeriatrici per l'anziano operato, dove delirium e complicanze sono piu' frequenti."),

 (15,"chiaro",0,"La tabella. Prime ore: emorragia, con la tachicardia che precede l'ipotensione. Primo-secondo giorno: atelettasia, con spirometro e mobilizzazione. Terzo-quinto: polmonite e urine."),
 (15,"chiaro",0,"Quinto-settimo: ferita. Quinto-decimo: deiscenza. Dopo il quinto: trombosi. Embolia: dispnea improvvisa. Ileo: distensione, e controllo del potassio."),

 (16,"chiaro",0,"[warm] Una frase per chiudere: cercare la complicanza giusta al momento giusto. Nella prossima lezione, le chirurgie specialistiche: ortopedia, addominale, vascolare, toracica, urologica, e il day surgery. A tra poco."),
]

CAPITOLI = {1:"Apertura",2:"La cronologia",3:"La febbre: le cinque W",4:"L'emorragia",5:"L'atelettasia",6:"TVP ed embolia",7:"La ritenzione urinaria",
 8:"L'ileo paralitico",9:"Ferita: infezione e deiscenza",10:"Le altre complicanze",11:"Il riconoscimento precoce",12:"Caso 1",13:"Caso 2",14:"In Veneto",15:"La tabella",16:"Chiusura"}

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
