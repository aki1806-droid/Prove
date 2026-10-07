# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Questo modulo ripercorre le basi scientifiche dell'assistenza: anatomia, fisiologia, fisiopatologia. Non come in un corso universitario, ma collegandole a cio' che hai gia' studiato."),
 (1,"chiaro",0,"Perche' ogni gesto infermieristico ha una ragione biologica. Cominciamo dalle fondamenta: l'organizzazione del corpo, la cellula, i liquidi e l'equilibrio che li governa."),

 (2,"chiaro",0,"Il corpo e' organizzato in livelli. Si parte dalle molecole, poi le cellule, i tessuti, gli organi, gli apparati e i sistemi, fino all'organismo intero."),
 (2,"chiaro",0,"I tessuti fondamentali sono quattro. L'epiteliale, che riveste e secerne: la cute, le mucose, le ghiandole. E il connettivo, che sostiene e collega: l'osso, la cartilagine, il sangue, il tessuto adiposo."),
 (2,"chiaro",0,"Il terzo e' il tessuto muscolare, che puo' essere scheletrico, cardiaco o liscio. Il quarto e' il tessuto nervoso."),

 (3,"chiaro",0,"La terminologia anatomica serve per documentare con precisione. Tutto si riferisce alla posizione anatomica: in piedi, sguardo in avanti, braccia lungo i fianchi, palmi rivolti in avanti."),
 (3,"chiaro",0,"I piani. Il sagittale divide destra e sinistra, ed e' mediano se passa a meta'. Il frontale, o coronale, divide anteriore e posteriore. Il trasversale, o assiale, superiore e inferiore: quello delle immagini della TC."),
 (3,"chiaro",0,"I termini vanno a coppie. Prossimale e distale: piu' vicino o piu' lontano dalla radice dell'arto. Mediale e laterale. Craniale e caudale. Anteriore, o ventrale, e posteriore, o dorsale. Superficiale e profondo."),
 (3,"chiaro",0,"Perche' conta? Lesione sul malleolo laterale destro e' una descrizione precisa. Lesione sulla caviglia, invece, no. La precisione dei termini e' precisione della documentazione."),

 (4,"chiaro",0,"La cellula e' l'unita' fondamentale della vita. E' delimitata dalla membrana plasmatica, un doppio strato di fosfolipidi con proteine inserite, che ha una permeabilita' selettiva: decide che cosa entra e che cosa esce."),
 (4,"chiaro",0,"All'interno, il nucleo con il DNA. I mitocondri, che producono energia sotto forma di ATP. I ribosomi, che sintetizzano le proteine. E poi il reticolo endoplasmatico, l'apparato del Golgi e i lisosomi."),

 (5,"chiaro",0,"I trasporti di membrana sono di due tipi. Quelli passivi non consumano energia e seguono il gradiente di concentrazione."),
 (5,"chiaro",0,"Sono passivi la diffusione semplice, come quella dell'ossigeno e dell'anidride carbonica negli alveoli; la diffusione facilitata, con proteine trasportatrici, come per il glucosio; e l'osmosi, per l'acqua."),
 (5,"chiaro",0,"Quelli attivi consumano ATP e lavorano contro gradiente. Il piu' importante e' la pompa sodio-potassio, che porta tre ioni sodio fuori e due ioni potassio dentro. Sono attive anche l'endocitosi e l'esocitosi."),
 (5,"chiaro",0,"Ed e' la pompa sodio-potassio il motivo per cui il sodio e' il principale ione extracellulare, e il potassio il principale ione intracellulare."),

 (6,"chiaro",0,"L'osmosi e' il passaggio di acqua attraverso una membrana semipermeabile, dalla soluzione meno concentrata a quella piu' concentrata. Come se l'acqua volesse diluirla."),
 (6,"chiaro",0,"Da qui la tonicita'. Una soluzione isotonica, come la fisiologica allo zero virgola nove per cento, non provoca spostamenti di acqua."),
 (6,"chiaro",0,"Una soluzione ipotonica fa entrare acqua nelle cellule, che si gonfiano. Una soluzione ipertonica, al contrario, la fa uscire, e le cellule si raggrinziscono."),
 (6,"chiaro",0,"E' la base della lezione sei punto tre: perche' le soluzioni ipotoniche sono pericolose nel paziente con edema cerebrale, e perche' il mannitolo o la soluzione salina ipertonica lo riducono."),

 (7,"chiaro",0,"I compartimenti idrici. L'acqua rappresenta circa il sessanta per cento del peso corporeo nell'adulto. E' di piu' nel neonato, e di meno nell'anziano e nella donna, che hanno piu' tessuto adiposo."),
 (7,"chiaro",0,"Per questo neonati e anziani si disidratano facilmente, ma in modi diversi: la loro riserva idrica non e' la stessa."),
 (7,"chiaro",0,"Due terzi dell'acqua sono intracellulari, circa il quaranta per cento del peso. Un terzo e' extracellulare, circa il venti per cento, e si divide in interstiziale, circa tre quarti, e plasma, circa un quarto."),

 (8,"chiaro",0,"Gli scambi di liquidi nei capillari seguono le forze di Starling. La pressione idrostatica spinge il liquido fuori dal vaso. La pressione oncotica, dovuta soprattutto all'albumina, lo richiama dentro."),
 (8,"chiaro",0,"L'edema nasce quando questo equilibrio si rompe, e le cause sono quattro. La prima e' l'aumento della pressione idrostatica, come nello scompenso cardiaco e nella trombosi venosa."),
 (8,"chiaro",0,"La seconda e' la riduzione della pressione oncotica, cioe' l'ipoalbuminemia: nella malnutrizione, nella cirrosi, nella sindrome nefrosica."),
 (8,"chiaro",0,"La terza e' l'aumento della permeabilita' dei capillari: l'infiammazione, la sepsi, le ustioni. La quarta e' l'ostacolo al drenaggio linfatico, che da' il linfedema."),
 (8,"chiaro",0,"Davanti a un edema, chiedersi quale delle quattro cause agisca orienta l'assistenza. Pressione idrostatica, pressione oncotica, permeabilita', drenaggio linfatico."),

 (9,"chiaro",0,"La regolazione dell'acqua e del sodio. Il primo meccanismo e' la sete. Poi l'ormone antidiuretico, l'ADH, prodotto dall'ipotalamo e liberato dall'ipofisi posteriore: fa riassorbire acqua nel rene."),
 (9,"chiaro",0,"L'aldosterone, prodotto dal surrene, fa riassorbire sodio ed eliminare potassio. Agisce all'interno del sistema renina-angiotensina-aldosterone."),
 (9,"chiaro",0,"E il peptide natriuretico, prodotto dal cuore quando e' disteso, che favorisce l'eliminazione di sodio e acqua. E' il BNP, quello che si dosa nello scompenso."),

 (10,"chiaro",0,"L'equilibrio acido-base. Il pH del sangue sta fra sette virgola trentacinque e sette virgola quarantacinque: un intervallo stretto. Tre sistemi lo difendono, ciascuno con tempi diversi."),
 (10,"chiaro",0,"I tamponi, come il bicarbonato, le proteine e l'emoglobina, in pochi secondi. Il polmone, che elimina anidride carbonica, in minuti. Il rene, che elimina ioni idrogeno e riassorbe bicarbonato, in ore o giorni."),
 (10,"chiaro",0,"La CO2 rappresenta la componente respiratoria, il bicarbonato quella metabolica. E' la base della lettura dell'emogas della lezione sei punto quattro, dove il compenso di un sistema corregge lo squilibrio dell'altro."),

 (11,"chiaro",0,"L'omeostasi e' il mantenimento di condizioni interne stabili. Il meccanismo piu' frequente e' il feedback negativo: la risposta contrasta la variazione."),
 (11,"chiaro",0,"Se la glicemia sale, si libera insulina, che la fa scendere. Se la temperatura sale, si suda. Termoregolazione, glicemia e pressione arteriosa sono esempi di feedback negativo."),
 (11,"chiaro",0,"Esiste anche il feedback positivo, in cui la risposta amplifica la variazione fino a un evento finale. Le contrazioni del parto, sostenute dall'ossitocina, o la cascata della coagulazione."),
 (11,"chiaro",0,"[thoughtful] E la malattia, in molti casi, e' proprio questo: un'omeostasi che non riesce piu' a compensare."),

 (12,"chiaro",0,"Il collegamento con l'assistenza. Il bilancio idrico e il peso della lezione tre punto cinque. La scelta delle soluzioni infusionali della lezione sei punto tre. L'edema e il posizionamento. L'emogas della sei punto quattro."),
 (12,"chiaro",0,"E un esempio che ora si spiega da solo: un campione emolizzato da' un potassio falsamente alto. Perche' il potassio e' intracellulare, e i globuli rossi rotti liberano il potassio che contengono."),

 (13,"chiaro",0,"[curious] Il caso d'esame. Paziente cirrotico, albumina a due virgola uno grammi per decilitro, edemi declivi importanti. Qual e' il meccanismo dell'edema?"),
 (13,"chiaro",0,"La riduzione della pressione oncotica. Il fegato malato produce poca albumina, e il liquido non viene piu' trattenuto nei vasi. E' la seconda delle quattro cause di edema."),
 (13,"chiaro",0,"Si aggiunge l'ipertensione portale, che aumenta la pressione idrostatica nel distretto addominale, con l'ascite. Per questo, dopo una paracentesi di grande volume, si da' albumina, come nella lezione otto punto cinque."),

 (14,"chiaro",0,"La tabella. Quattro tessuti: epiteliale, connettivo, muscolare, nervoso. Tre piani: sagittale, frontale, trasversale. Trasporti passivi e attivi, e la pompa sodio-potassio: tre fuori e due dentro."),
 (14,"chiaro",0,"L'osmosi, con l'acqua che va verso il piu' concentrato, e la tonicita': iso, ipo e ipertonica. L'acqua al sessanta per cento del peso: due terzi dentro le cellule, un terzo fuori."),
 (14,"chiaro",0,"Starling: idrostatica fuori, oncotica dentro, e le quattro cause di edema. ADH per l'acqua, aldosterone per il sodio. Il pH e i suoi tre sistemi di difesa. Il feedback negativo e quello positivo."),

 (15,"profondo",1.2,"[serious] La frase della lezione: ogni gesto infermieristico ha una ragione biologica. Conoscerla permette di adattare il gesto quando la situazione cambia."),

 (16,"chiaro",0,"[warm] Nella prossima lezione, l'apparato cardiocircolatorio: dall'anatomia del cuore al sistema di conduzione, fino alla pressione arteriosa."),
 (16,"chiaro",0,"Dalle fondamenta della cellula al primo grande apparato: il cuore e la circolazione. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"L'organizzazione del corpo",3:"La terminologia anatomica",4:"La cellula e la membrana",5:"I trasporti di membrana",
 6:"L'osmosi e la tonicita'",7:"I compartimenti idrici",8:"Le forze di Starling e l'edema",9:"La regolazione dell'acqua e del sodio",
 10:"L'equilibrio acido-base",11:"L'omeostasi e i feedback",12:"Il collegamento con l'assistenza",13:"Il caso d'esame",14:"La tabella",
 15:"La frase della lezione",16:"Chiusura"}

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
