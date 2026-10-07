# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Sistema nervoso ed endocrino sono i due sistemi di controllo del corpo. Il primo comunica con impulsi elettrici, rapidissimi; il secondo con gli ormoni, piu' lenti ma duraturi."),
 (1,"chiaro",0,"Conoscerli spiega i segni neurologici della lezione otto punto sei, le emergenze endocrine della otto punto tre e, soprattutto, l'azione di molti farmaci. Partiamo dal sistema nervoso."),

 (2,"chiaro",0,"Il sistema nervoso centrale comprende l'encefalo e il midollo spinale. Il sistema nervoso periferico comprende dodici paia di nervi cranici e trentuno paia di nervi spinali."),
 (2,"chiaro",0,"Funzionalmente si distingue una componente somatica, volontaria, e una componente autonoma, involontaria, che a sua volta ha due branche: il simpatico e il parasimpatico."),
 (2,"chiaro",0,"L'unita' e' il neurone, che comunica con gli altri attraverso le sinapsi, rilasciando i neurotrasmettitori: acetilcolina, noradrenalina, dopamina, serotonina, GABA, glutammato."),
 (2,"chiaro",0,"Molti farmaci agiscono proprio su questi messaggeri: le benzodiazepine sul GABA, la levodopa sulla dopamina, gli antidepressivi sulla serotonina."),

 (3,"chiaro",0,"Le vie motorie e sensitive. Le vie sensitive conducono il tatto, il dolore, la temperatura e la posizione. La via motoria principale e' la via corticospinale, detta anche piramidale."),
 (3,"chiaro",0,"Parte dalla corteccia e scende nel midollo incrociandosi: e' la decussazione. Per questo una lesione dell'emisfero sinistro provoca un deficit motorio a destra."),
 (3,"chiaro",0,"E siccome nella maggior parte delle persone il linguaggio ha sede nell'emisfero sinistro, un ictus con debolezza a destra si accompagna spesso ad afasia. Ricordi il caso della lezione otto punto sei?"),

 (4,"chiaro",0,"I riflessi. L'arco riflesso va dal recettore, per la via sensitiva, fino al midollo, e torna per la via motoria al muscolo, senza passare dalla volonta': la risposta e' rapida e involontaria."),
 (4,"chiaro",0,"Gli esempi: il riflesso rotuleo, il riflesso pupillare alla luce, i riflessi della deglutizione e della tosse, che proteggono le vie aeree. E i riflessi tendinei ridotti segnalano la tossicita' da magnesio."),
 (4,"chiaro",0,"Il segno di Babinski, cioe' l'estensione dell'alluce stimolando la pianta del piede, e' patologico nell'adulto: indica una lesione della via piramidale."),

 (5,"chiaro",0,"Il sistema nervoso autonomo ha due branche. Il simpatico prepara alla lotta o fuga, e i suoi mediatori sono la noradrenalina e l'adrenalina."),
 (5,"chiaro",0,"Agiscono su due famiglie di recettori. Gli alfa restringono i vasi. Poi i beta: i beta uno, nel cuore, aumentano frequenza e contrattilita'; i beta due, nei bronchi, li dilatano."),
 (5,"chiaro",0,"Gli effetti del simpatico: aumento di frequenza e pressione, broncodilatazione, pupille dilatate, cioe' midriasi, intestino rallentato, ritenzione urinaria, glicemia piu' alta, sudorazione."),

 (6,"chiaro",0,"Il parasimpatico governa invece il riposo e la digestione. Il suo mediatore e' l'acetilcolina, che agisce sui recettori muscarinici, e il suo nervo principale e' il vago."),
 (6,"chiaro",0,"Gli effetti sono opposti a quelli del simpatico: frequenza ridotta, broncocostrizione, pupille strette, cioe' miosi, intestino piu' attivo, piu' secrezioni, e lo svuotamento della vescica."),
 (6,"chiaro",0,"Una stimolazione vagale, durante un'aspirazione tracheale, uno sforzo o un dolore viscerale, puo' dare una bradicardia improvvisa, come abbiamo visto nella lezione otto punto due."),

 (7,"chiaro",0,"[thoughtful] Ed ecco il collegamento con la farmacologia. I beta-bloccanti riducono frequenza e pressione. Quelli non selettivi bloccano anche i beta due bronchiali: possono scatenare un broncospasmo, cautela nell'asma."),
 (7,"chiaro",0,"Il salbutamolo, un agonista beta due, dilata i bronchi, ma puo' dare tachicardia, tremori e ipokaliemia. L'adrenalina, che agisce su alfa e beta, si usa nell'anafilassi e nell'arresto."),
 (7,"chiaro",0,"L'atropina e' un antimuscarinico: blocca l'acetilcolina e aumenta la frequenza. Ma secca le mucose, e puo' causare ritenzione urinaria, midriasi e confusione."),
 (7,"chiaro",0,"E i farmaci anticolinergici, nell'anziano, provocano delirium, stipsi e ritenzione: ecco perche' compaiono fra i farmaci potenzialmente inappropriati della lezione undici punto uno."),

 (8,"chiaro",0,"Il circolo cerebrale. Il cervello riceve sangue dalle carotidi interne e dalle arterie vertebrali, che si uniscono nel poligono di Willis. E il suo flusso ha una propria autoregolazione."),
 (8,"chiaro",0,"Il cervello consuma circa il venti per cento dell'ossigeno del corpo e dipende quasi solo dal glucosio: ecco perche' ipossia e ipoglicemia alterano subito la coscienza."),
 (8,"chiaro",0,"Ha una barriera ematoencefalica, che seleziona le sostanze che possono raggiungerlo. E il liquor, che viene prodotto nei ventricoli cerebrali."),
 (8,"chiaro",0,"Un principio spiega l'ipertensione endocranica della lezione otto punto sei: il cranio e' rigido e contiene encefalo, sangue e liquor. Se uno dei tre aumenta, la pressione sale."),

 (9,"chiaro",0,"Passiamo al sistema endocrino. Ha il suo centro nell'asse ipotalamo-ipofisi: l'ipotalamo controlla l'ipofisi, e l'ipofisi regola a sua volta le altre ghiandole."),
 (9,"chiaro",0,"L'ipofisi anteriore produce il GH, l'ormone della crescita; il TSH, che stimola la tiroide; l'ACTH, che stimola il surrene; l'FSH e l'LH per le gonadi; e la prolattina."),
 (9,"chiaro",0,"L'ipofisi posteriore libera l'ADH, che fa riassorbire acqua nel rene, e l'ossitocina, per le contrazioni uterine e l'eiezione del latte. E tutto e' regolato a feedback negativo."),

 (10,"chiaro",0,"La tiroide produce due ormoni, il T tre e il T quattro, che regolano il metabolismo. E per produrli ha bisogno dello iodio."),
 (10,"chiaro",0,"Il feedback spiega i valori di laboratorio. Nell'ipotiroidismo primario la tiroide produce poco, e l'ipofisi aumenta il TSH, che risulta alto. Nell'ipertiroidismo primario, invece, il TSH e' basso."),
 (10,"chiaro",0,"Le paratiroidi producono il PTH, che aumenta il calcio nel sangue. Per questo la loro lesione durante una tiroidectomia causa l'ipocalcemia della lezione nove punto sei."),

 (11,"chiaro",0,"Il surrene. La parte corticale produce il cortisolo, l'ormone dello stress, che alza la glicemia e riduce l'infiammazione; l'aldosterone, che regola sodio e potassio; e gli androgeni."),
 (11,"chiaro",0,"La parte midollare del surrene produce invece l'adrenalina e la noradrenalina: gli stessi mediatori del simpatico che abbiamo appena visto."),
 (11,"chiaro",0,"Il pancreas endocrino, nelle isole di Langerhans. Le cellule beta producono l'insulina, che abbassa la glicemia; le cellule alfa producono il glucagone, che la alza."),
 (11,"chiaro",0,"Gli ormoni dello stress, glucagone, cortisolo, adrenalina e GH, sono tutti iperglicemizzanti. Ecco perche' un paziente con un'infezione, o dopo un intervento, ha la glicemia alta anche se non e' diabetico."),

 (12,"chiaro",0,"Il feedback spiega anche i corticosteroidi usati come farmaci. Somministrati a lungo, spengono l'ACTH e il surrene, che smette di produrre cortisolo."),
 (12,"chiaro",0,"Per questo una sospensione brusca puo' causare la crisi surrenalica della lezione otto punto tre. E gli effetti da sorvegliare: iperglicemia, ritenzione idrica, osteoporosi, infezioni, ritardo di guarigione."),
 (12,"chiaro",0,"Si somministrano di solito al mattino, perche' imitano il ritmo naturale del cortisolo, che e' piu' alto al risveglio."),

 (13,"chiaro",0,"[curious] Il caso d'esame. Paziente asmatico con ipertensione: il medico prescrive il propranololo. Che cosa segnala l'infermiere?"),
 (13,"chiaro",0,"Il propranololo e' un beta-bloccante non selettivo: blocca anche i recettori beta due dei bronchi, e in un paziente asmatico puo' scatenare un broncospasmo."),
 (13,"chiaro",0,"Lo segnali al medico prima della somministrazione, chiedendo conferma. E' la fisiologia del sistema autonomo che previene un evento avverso."),

 (14,"chiaro",0,"Il collegamento con l'assistenza. La valutazione neurologica e delle pupille. Il lato del deficit, e il linguaggio. La glicemia in ogni alterazione della coscienza. La bradicardia vagale durante le manovre."),
 (14,"chiaro",0,"Gli effetti autonomici dei farmaci. Il TSH e la terapia tiroidea. La glicemia da stress. E i corticosteroidi, che non si sospendono mai bruscamente."),

 (15,"chiaro",0,"La tabella. Dodici nervi cranici, trentuno spinali. Via motoria incrociata, linguaggio a sinistra, Babinski patologico. Simpatico: alfa e beta, beta uno cuore, beta due bronchi. Parasimpatico: acetilcolina e vago."),
 (15,"chiaro",0,"Ipofisi anteriore e posteriore. Ipotiroidismo primario: TSH alto. Il PTH alza il calcio. Cortisolo e aldosterone. L'insulina abbassa la glicemia, il glucagone la alza. Gli ormoni dello stress sono iperglicemizzanti."),

 (16,"profondo",1.2,"[serious] La frase della lezione: capire il recettore e' capire il farmaco. Se sai dove agisce un farmaco, sai prevederne gli effetti e i rischi."),

 (17,"chiaro",0,"[warm] Nella prossima lezione: il sangue, i gruppi sanguigni, la coagulazione, l'immunita' e l'infiammazione. Le basi della trasfusione, degli anticoagulanti e delle infezioni. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"L'organizzazione del sistema nervoso",3:"Le vie motorie e sensitive",4:"I riflessi",5:"Il simpatico",
 6:"Il parasimpatico",7:"Il sistema autonomo e i farmaci",8:"Il circolo cerebrale e la pressione intracranica",9:"L'asse ipotalamo-ipofisi",
 10:"Tiroide e paratiroidi",11:"Surrene e pancreas endocrino",12:"I corticosteroidi esogeni",13:"Il caso d'esame",
 14:"Il collegamento con l'assistenza",15:"La tabella",16:"La frase della lezione",17:"Chiusura"}

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
