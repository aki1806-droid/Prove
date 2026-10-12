# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Il grande ustionato e' un paziente in cui ogni ora conta, e gli errori sono spesso di calcolo e di tempo. Usiamo la regola del nove e la formula di Parkland, con una trappola sugli orari che cade quasi sempre nei quiz."),
 (1,"chiaro",0,"E vedremo perche' le vie aeree di un ustionato possono chiudersi in poche ore. Ci servono le lezioni tre punto sette, cinque punto tre, otto punto due, dieci punto cinque e dieci punto sette."),

 (2,"chiaro",0,"Lo scenario. Ore diciannove: un incendio in una cucina chiusa, dall'olio in padella. Il signor Matteo ha quarantacinque anni e pesa ottanta chili. Il centodiciotto lo porta in pronto soccorso alle ventuno."),
 (2,"chiaro",0,"Ha gia' ricevuto cinquecento millilitri di cristalloidi. Ha ustioni profonde e a tutto spessore sul torace anteriore, sull'intero arto superiore destro, sul collo e su parte del volto."),
 (2,"chiaro",0,"Peli del naso bruciacchiati, voce rauca, un escreato nerastro. Saturazione novantotto in aria, frequenza centodiciotto, pressione centoventotto su ottanta, dolore nove."),
 (2,"chiaro",0,"Fermati un momento: quale problema puo' ucciderlo nelle prossime ore, nonostante una saturazione perfetta?"),

 (3,"chiaro",0,"La priorita' e' la A. Ambiente chiuso, ustioni del volto e del collo, peli nasali bruciati, voce rauca, escreato con fuliggine: sono i segni di un'ustione da inalazione."),
 (3,"chiaro",0,"L'edema delle vie aeree non e' ancora massimo: aumenta nelle ore successive, anche per effetto dei liquidi infusi, e puo' chiudere le vie aeree."),
 (3,"chiaro",0,"[serious] Per questo si chiede una valutazione urgente dell'anestesista, che spesso decide un'intubazione precoce, quando e' ancora tecnicamente possibile."),
 (3,"chiaro",0,"Aspettare che il paziente non respiri piu' significa trovarsi davanti a vie aeree impossibili da intubare. Il materiale per le vie aeree difficili deve essere pronto."),

 (4,"chiaro",0,"B: il monossido di carbonio. In un incendio in ambiente chiuso l'intossicazione e' probabile, e la saturazione del novantotto non rassicura."),
 (4,"chiaro",0,"Come hai visto nella lezione otto punto due, il saturimetro non distingue l'emoglobina legata al monossido, e il valore puo' essere falsamente normale."),
 (4,"chiaro",0,"Si esegue un emogas con la carbossiemoglobina, e si da' ossigeno al cento per cento con maschera con reservoir, fino all'esclusione. Con i fumi di materiali sintetici il medico valuta anche il cianuro."),

 (5,"chiaro",0,"L'estensione, con la regola del nove della lezione dieci punto sette. Si contano solo le ustioni di secondo e terzo grado, non gli eritemi superficiali."),
 (5,"chiaro",0,"Torace anteriore: diciotto per cento. Arto superiore destro intero: nove. Collo e parte del volto: circa tre. Totale: circa il trenta per cento. Per le aree irregolari, il palmo della persona, dita comprese: circa uno."),

 (6,"chiaro",0,"I liquidi, con la formula di Parkland. Quattro millilitri, per ottanta chili, per trenta per cento: fa novemilaseicento millilitri nelle prime ventiquattro ore."),
 (6,"chiaro",0,"Meta', cioe' quattromilaottocento, nelle prime otto ore. E qui c'e' la trappola: le otto ore si contano dal momento dell'ustione, cioe' dalle diciannove, non dall'arrivo in pronto soccorso."),
 (6,"chiaro",0,"Quindi i primi quattromilaottocento millilitri vanno infusi entro le tre di notte. L'altra meta' nelle sedici ore successive: circa trecento millilitri all'ora."),

 (7,"chiaro",0,"Il calcolo che cade nei quiz. Alle ventuno sono gia' passate due delle prime otto ore, e il centodiciotto ha gia' infuso cinquecento millilitri."),
 (7,"chiaro",0,"Restano quattromilatrecento millilitri da infondere nelle sei ore che mancano alle tre: circa settecentoquindici millilitri all'ora, secondo prescrizione."),
 (7,"chiaro",0,"L'errore tipico e' far partire le otto ore dall'arrivo: seicento all'ora, e il paziente sarebbe sotto-infuso proprio quando perde piu' liquidi. E la formula e' un punto di partenza, che il medico adegua alla diuresi."),

 (8,"chiaro",0,"Il monitoraggio. Un catetere vescicale con diuresi oraria: l'obiettivo indicativo nell'adulto e' mezzo millilitro per chilo all'ora, cioe' circa quaranta millilitri all'ora per il signor Matteo."),
 (8,"chiaro",0,"Una diuresi troppo bassa indica liquidi insufficienti. Una molto alta, un rischio di sovra-infusione, che peggiora gli edemi e puo' causare una sindrome compartimentale addominale."),
 (8,"chiaro",0,"Si sorvegliano parametri, coscienza e lattati. E urine scure o rosse possono indicare mioglobina, nelle ustioni profonde o elettriche: si segnalano subito."),

 (9,"chiaro",0,"Le ustioni circonferenziali. Un'ustione a tutto spessore che avvolge una parte del corpo forma un'escara rigida, che non si espande quando sotto aumenta l'edema."),
 (9,"chiaro",0,"Al torace limita l'espansione respiratoria; a un arto comprime i vasi, come una sindrome compartimentale. Si sorvegliano polsi, colorito, riempimento capillare, sensibilita' e meccanica respiratoria."),
 (9,"chiaro",0,"Se serve, il medico esegue un'escarotomia, un'incisione che libera la pressione. L'arto si tiene sollevato, e anelli e bracciali si tolgono subito, prima che l'edema li renda impossibili da rimuovere."),

 (10,"chiaro",0,"Dolore, temperatura e ferite. Il dolore si tratta con oppioidi endovena secondo prescrizione, titolati e rivalutati. Non per via intramuscolare: nell'ustionato l'assorbimento e' imprevedibile."),
 (10,"chiaro",0,"La temperatura. L'acqua serve nei primi venti minuti dopo l'ustione; due ore dopo la priorita' e' l'opposto: prevenire l'ipotermia, con coperte, ambiente caldo e liquidi riscaldati."),
 (10,"chiaro",0,"Le ferite si coprono con materiale pulito o sterile secondo protocollo, senza creme o rimedi casalinghi. Si verifica la profilassi antitetanica. E si centralizza a un centro grandi ustionati."),

 (11,"chiaro",0,"[thoughtful] Quando si invia un paziente al centro ustioni? Per ustioni di secondo e terzo grado estese, nell'adulto indicativamente oltre il venti per cento. Per quelle a tutto spessore significative."),
 (11,"chiaro",0,"Per le ustioni di volto, mani, piedi, genitali, perineo e grandi articolazioni, per le conseguenze funzionali ed estetiche. Per quelle da inalazione e per quelle circonferenziali."),
 (11,"chiaro",0,"Per le elettriche, che nascondono danni interni e danno aritmie, e le chimiche, che chiedono un'irrigazione prolungata con acqua. Per bambini, anziani, comorbidita', traumi. Il signor Matteo soddisfa piu' criteri."),

 (12,"chiaro",0,"Gli errori. Fidarsi della saturazione in un incendio in ambiente chiuso. Rinviare la valutazione delle vie aeree. Calcolare le otto ore dall'arrivo, e non dall'ustione."),
 (12,"chiaro",0,"Contare anche le ustioni superficiali. Non sottrarre i liquidi gia' infusi. Raffreddare a lungo un grande ustionato. L'analgesia intramuscolare. Lasciare anelli e bracciali."),

 (13,"chiaro",0,"[curious] Le domande d'orale. Prima: come si calcolano i liquidi? Con Parkland: quattro millilitri per chilo per percentuale di superficie ustionata di secondo e terzo grado, nelle ventiquattro ore."),
 (13,"chiaro",0,"Meta' nelle prime otto ore dal momento dell'ustione, meta' nelle sedici successive; poi si adegua alla diuresi. Seconda: quali segni fanno sospettare un'ustione da inalazione?"),
 (13,"chiaro",0,"Ambiente chiuso, ustioni di volto e collo, peli nasali bruciati, voce rauca, stridore, escreato con fuliggine, dispnea. Terza: perche' la saturimetria non e' affidabile?"),
 (13,"chiaro",0,"Perche' il saturimetro non distingue l'emoglobina legata all'ossigeno da quella legata al monossido, e mostra valori falsamente normali: serve l'emogas con la carbossiemoglobina."),

 (14,"chiaro",0,"La risposta modello. Paziente di ottanta chili, ustioni profonde su circa il trenta per cento della superficie, alle diciannove in ambiente chiuso, con segni di inalazione. Priorita': vie aeree, monossido, liquidi."),
 (14,"chiaro",0,"Richiedo subito l'anestesista per un'intubazione precoce; somministro ossigeno al cento per cento e collaboro all'emogas con carbossiemoglobina. Posiziono due accessi e infondo i cristalloidi secondo Parkland."),
 (14,"chiaro",0,"Novemilaseicento millilitri in ventiquattro ore, quattromilaottocento entro le tre dall'ustione, al netto dei cinquecento gia' infusi, poi circa trecento all'ora, adeguandoli alla diuresi oraria."),
 (14,"chiaro",0,"Rimuovo gli anelli e sorveglio le ustioni circonferenziali. Analgesia endovena, prevengo l'ipotermia, copro le ferite, verifico l'antitetanica. Preparo la centralizzazione al centro grandi ustionati."),

 (15,"chiaro",0,"I collegamenti. Dolore, tre punto sette. Calcoli, cinque punto tre. Monossido e saturimetro, otto punto due. Vie aeree, dieci punto cinque. Ustioni, dieci punto sette. Sindrome compartimentale, nove punto sei."),

 (16,"chiaro",0,"Uno sguardo ai giorni successivi, nel centro ustioni. La barriera cutanea e' perduta: il rischio infettivo e' altissimo, e le medicazioni chiedono asepsi rigorosa. Il fabbisogno nutrizionale cresce enormemente."),
 (16,"chiaro",0,"Per l'ipermetabolismo la nutrizione e' precoce, spesso enterale. L'analgesia prima delle medicazioni. Mobilizzazione e posizionamento contro le retrazioni. E il supporto psicologico, per l'immagine corporea e il trauma."),

 (17,"profondo",1.2,"[serious] La frase del caso: nell'ustionato l'orologio parte dalle fiamme, non dalla porta del pronto soccorso."),

 (18,"chiaro",0,"[warm] Nella prossima lezione: una ragazza di diciannove anni arriva in pronto soccorso con una chetoacidosi, e scopre cosi' di avere il diabete. L'emergenza metabolica, e una notizia che cambia la vita. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"Lo scenario",3:"A: l'ustione delle vie aeree",4:"B: il monossido di carbonio",5:"L'estensione: la regola del nove",
 6:"I liquidi: la formula di Parkland",7:"Il calcolo che cade nei quiz",8:"Il monitoraggio della rianimazione",9:"Le ustioni circonferenziali",
 10:"Dolore, temperatura, ferite",11:"Quando inviare al centro ustioni",12:"Gli errori da evitare",13:"Le domande d'orale",
 14:"La risposta modello",15:"I collegamenti",16:"I giorni successivi",17:"La frase del caso",18:"Chiusura"}

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
