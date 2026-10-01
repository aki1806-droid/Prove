# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] L'emogasanalisi e' una delle parti del programma che i candidati temono di piu', e una delle piu' facili da trasformare in punti sicuri."),
 (1,"chiaro",0,"Non serve diventare rianimatori: serve un metodo in quattro passi e una manciata di valori normali. Alla fine di questa lezione saprai leggere i quattro disturbi fondamentali e il loro compenso."),
 (1,"chiaro",0,"Poi vediamo come si esegue correttamente il prelievo arterioso, dal test di Allen alla siringa senza bolle."),

 (2,"chiaro",0,"I valori da sapere a memoria. pH fra sette virgola trentacinque e sette virgola quarantacinque. Anidride carbonica, la PaCO2, fra trentacinque e quarantacinque millimetri di mercurio."),
 (2,"chiaro",0,"Bicarbonati fra ventidue e ventisei. Ossigeno, la PaO2, fra ottanta e cento in aria nell'adulto, meno nell'anziano. Saturazione sopra il novantacinque per cento. Eccesso di basi fra meno due e piu' due. Lattati sotto due."),

 (3,"chiaro",0,"Il principio. L'equilibrio acido-base dipende da due componenti. L'anidride carbonica, che si comporta come un acido ed e' regolata dal polmone, in pochi minuti, aumentando o riducendo la ventilazione."),
 (3,"chiaro",0,"E il bicarbonato, che e' una base ed e' regolato dal rene, in ore o giorni. Il pH e' il risultato del rapporto fra le due. Piu' CO2 significa piu' acido; piu' bicarbonato significa piu' base. Due organi, due velocita': il polmone corregge in minuti, il rene in giorni."),

 (4,"chiaro",0,"Il metodo. Uno: guarda il pH. Sotto sette virgola trentacinque e' acidosi, sopra sette virgola quarantacinque alcalosi."),
 (4,"chiaro",0,"Due: guarda la CO2. Se spiega il pH, alta nell'acidosi, bassa nell'alcalosi, il disturbo e' respiratorio. Tre: guarda il bicarbonato. Se spiega il pH, basso nell'acidosi, alto nell'alcalosi, il disturbo e' metabolico."),
 (4,"chiaro",0,"Quattro: il compenso. L'altro valore si muove per riportare il pH verso la norma? Se si', il corpo sta gia' lavorando, e il quadro e' compensato in parte o del tutto."),

 (5,"chiaro",0,"Un trucco mnemonico che funziona sempre: ROME, Respiratory Opposite, Metabolic Equal. Quattro lettere, e il passo due e il passo tre si fanno a colpo d'occhio."),
 (5,"chiaro",0,"Nei disturbi respiratori, pH e CO2 vanno in direzione opposta: pH giu', CO2 su. Nei disturbi metabolici, pH e bicarbonato vanno nella stessa direzione: pH giu', bicarbonato giu'."),

 (6,"chiaro",0,"I quattro disturbi. Acidosi respiratoria: pH basso, CO2 alta. La causa e' l'ipoventilazione: la CO2 non viene eliminata, e si accumula come acido."),
 (6,"chiaro",0,"Gli esempi: BPCO riacutizzata, sedazione eccessiva da oppioidi o benzodiazepine, ricordi la lezione cinque punto sei, malattie neuromuscolari, ostruzione delle vie aeree."),
 (6,"chiaro",0,"I segni: sonnolenza, confusione, cefalea, fino al coma ipercapnico. Un paziente con BPCO sempre piu' sonnolento e' un'acidosi respiratoria finche' non si dimostra il contrario."),

 (7,"chiaro",0,"Alcalosi respiratoria: pH alto, CO2 bassa. La causa e' l'iperventilazione: si elimina troppa CO2, e il sangue perde acido."),
 (7,"chiaro",0,"Gli esempi: ansia e attacco di panico, dolore, febbre, le fasi iniziali della sepsi, l'embolia polmonare. I segni: formicolii intorno alla bocca e alle dita, crampi, vertigini."),
 (7,"chiaro",0,"Attenzione: attribuire sempre l'iperventilazione all'ansia e' pericoloso, perche' la stessa alterazione si trova nella sepsi iniziale e nell'embolia."),

 (8,"chiaro",0,"Acidosi metabolica: pH basso, bicarbonato basso. Le cause: chetoacidosi diabetica; acidosi lattica da shock o sepsi; insufficienza renale; diarrea profusa, che perde bicarbonato; intossicazioni."),
 (8,"chiaro",0,"Per questo si misurano i lattati. Il compenso e' respiratorio: il polmone iperventila per eliminare CO2, con il respiro di Kussmaul, profondo e frequente. Vedere un Kussmaul significa pensare a un'acidosi metabolica."),

 (9,"chiaro",0,"Alcalosi metabolica: pH alto, bicarbonato alto. Le cause: vomito e aspirazione gastrica prolungata da sondino, che fanno perdere acido; diuretici; ipokaliemia."),
 (9,"chiaro",0,"Il compenso e' una ipoventilazione, con CO2 che sale. Un paziente con sondino in aspirazione da giorni e diuretico in terapia e' il candidato tipico."),

 (10,"chiaro",0,"Il compenso. Se l'altro valore e' normale, il disturbo e' non compensato. Se l'altro valore si sposta ma il pH e' ancora alterato, e' parzialmente compensato."),
 (10,"chiaro",0,"Se il pH e' rientrato nella norma, e' completamente compensato, e in genere il pH resta vicino al limite del lato del disturbo primario."),
 (10,"profondo",1.2,"[serious] Una regola: il compenso non supera mai la correzione. Il pH non passa dall'acidosi all'alcalosi per effetto del compenso."),

 (11,"chiaro",2.5,"Proviamo. pH sette virgola ventotto, CO2 cinquantotto, bicarbonato venticinque. Metti in pausa e applica i quattro passi."),
 (11,"chiaro",0,"pH basso: acidosi. CO2 alta, in direzione opposta al pH: respiratoria. Bicarbonato normale: non compensata. E' un'acidosi respiratoria acuta: per esempio un paziente sedato eccessivamente."),

 (12,"chiaro",2.5,"Secondo. pH sette virgola ventidue, CO2 ventisei, bicarbonato undici. Metti in pausa, stessi quattro passi."),
 (12,"chiaro",0,"pH basso: acidosi. Bicarbonato basso, nella stessa direzione del pH: metabolica. CO2 bassa: il polmone iperventila, ma il pH e' ancora alterato: parzialmente compensata. La chetoacidosi diabetica, con il Kussmaul."),

 (13,"chiaro",2.5,"Terzo. pH sette virgola trentasette, CO2 sessanta, bicarbonato trentaquattro. Metti in pausa: questo e' il piu' difficile."),
 (13,"chiaro",0,"Il pH e' normale, ma vicino al lato acido. CO2 alta e bicarbonato alto: entrambi alterati. Il disturbo primario e' quello coerente con il lato del pH, cioe' l'acidosi respiratoria."),
 (13,"chiaro",0,"E il rene ha trattenuto bicarbonato fino a compensarla completamente. E' il quadro tipico del paziente con BPCO cronica ipercapnica stabile."),

 (14,"chiaro",0,"Il prelievo arterioso. La sede preferita e' l'arteria radiale, superficiale e con un buon circolo collaterale garantito dall'ulnare: se la radiale si chiude, la mano resta irrorata."),
 (14,"chiaro",0,"Prima di pungere si esegue il test di Allen modificato: si comprimono contemporaneamente radiale e ulnare, si fa aprire e chiudere la mano finche' il palmo impallidisce, poi si rilascia solo l'ulnare."),
 (14,"chiaro",0,"Se il colore ritorna rapidamente, entro il tempo indicato dalla procedura, il circolo collaterale e' adeguato. Se non ritorna, quella radiale non si punge."),

 (15,"chiaro",0,"La tecnica e la gestione del campione. Siringa eparinata dedicata. Angolo di trenta-quarantacinque gradi sulla radiale. Dopo il prelievo si eliminano subito le bolle d'aria e si tappa: l'aria altera i valori dei gas."),
 (15,"chiaro",0,"Si comprime la sede per almeno cinque minuti, di piu' nel paziente anticoagulato, per evitare l'ematoma. Si indicano sulla richiesta la FiO2 e la temperatura."),
 (15,"chiaro",0,"Il campione va analizzato il prima possibile, indicativamente entro un quarto d'ora: le cellule del sangue continuano a consumare ossigeno e a produrre CO2 anche nella siringa."),
 (15,"chiaro",0,"E se si e' appena modificata l'ossigenoterapia, si attende che la situazione si stabilizzi prima del prelievo, altrimenti l'esame fotografa un momento di passaggio."),

 (16,"chiaro",0,"Il caso, che collega questa lezione al modulo otto. Paziente con BPCO in ossigeno a sei litri con maschera semplice, sempre piu' sonnolento. Emogas: pH sette virgola venticinque, CO2 settantacinque, bicarbonato trentadue."),
 (16,"chiaro",0,"Lettura: acidosi respiratoria parzialmente compensata. Il rene aveva gia' compensato una ipercapnia cronica, ma ora la CO2 e' salita ancora. Una delle cause possibili e' l'eccesso di ossigeno nell'ipercapnico cronico."),
 (16,"chiaro",0,"Che cosa fai? Avvisi subito il medico, rivaluti l'ossigenoterapia secondo prescrizione con un obiettivo di saturazione adeguato, spesso ottantotto-novantadue per cento in questi pazienti."),
 (16,"chiaro",0,"Sorvegli la coscienza e prepari la possibile ventilazione non invasiva. E' il caso che chiude il cerchio: la sonnolenza e' il segno, l'emogas la conferma."),

 (17,"chiaro",0,"Nelle aziende venete gli emogasanalizzatori sono disponibili nei reparti critici e in pronto soccorso come strumenti point-of-care, e il prelievo arterioso e' regolato da procedure aziendali."),
 (17,"chiaro",0,"Spesso con percorsi di formazione e verifica della competenza infermieristica. All'orale, citare il test di Allen e la gestione del campione mostra precisione tecnica."),

 (18,"chiaro",0,"Ricapitoliamo. pH fra sette virgola trentacinque e sette virgola quarantacinque; CO2 trentacinque-quarantacinque; bicarbonato ventidue-ventisei. Quattro passi: pH, CO2, bicarbonato, compenso."),
 (18,"chiaro",0,"ROME: respiratorio opposto, metabolico uguale. Kussmaul: acidosi metabolica. Ipoventilazione: acidosi respiratoria."),
 (18,"chiaro",0,"[warm] Prima della radiale il test di Allen; dopo il prelievo niente bolle e compressione di almeno cinque minuti. Nella prossima lezione: la nutrizione parenterale. A tra poco."),
]

CAPITOLI = {1:"Apertura",2:"I valori normali",3:"Polmone e rene",4:"Il metodo in quattro passi",5:"Il trucco ROME",
 6:"L'acidosi respiratoria",7:"L'alcalosi respiratoria",8:"L'acidosi metabolica",9:"L'alcalosi metabolica",10:"Il compenso",
 11:"Esercizio 1",12:"Esercizio 2",13:"Esercizio 3",14:"Il test di Allen",15:"La tecnica e il campione",16:"Il caso",17:"In Veneto",18:"Chiusura"}

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
