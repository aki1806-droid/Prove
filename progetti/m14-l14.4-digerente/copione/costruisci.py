# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Tre organi che lavorano insieme: l'apparato digerente introduce, il fegato trasforma, il rene elimina. Da loro dipendono la nutrizione, il metabolismo dei farmaci e l'equilibrio dei liquidi."),
 (1,"chiaro",0,"L'obiettivo e' pratico: capire perche' nell'insufficienza epatica e in quella renale cambiano le dosi dei farmaci, i parametri da sorvegliare e i rischi per il paziente."),

 (2,"chiaro",0,"La digestione, tappa per tappa. In bocca, la masticazione e la saliva, con l'amilasi salivare. Nello stomaco, l'acido cloridrico e la pepsina, che inizia a digerire le proteine."),
 (2,"chiaro",0,"Sempre nello stomaco si produce il fattore intrinseco, indispensabile per assorbire la vitamina B dodici. Per questo, dopo una gastrectomia, la B dodici va somministrata per via parenterale."),
 (2,"chiaro",0,"Nel duodeno arrivano la bile, che emulsiona i grassi, e gli enzimi pancreatici: amilasi, lipasi, tripsina. Nella pancreatite della lezione otto punto cinque, attivati troppo presto, digeriscono il pancreas stesso."),
 (2,"chiaro",0,"Nell'intestino tenue, grazie ai villi, avviene l'assorbimento dei nutrienti. Nel colon si assorbono l'acqua e gli elettroliti, e il microbiota produce anche la vitamina K."),

 (3,"chiaro",0,"Il fegato ha funzioni numerose. Il metabolismo di zuccheri, grassi e proteine: immagazzina il glicogeno e produce glucosio quando serve. E fa da deposito di glicogeno, di vitamine e di ferro."),
 (3,"chiaro",0,"La sintesi: l'albumina e i fattori della coagulazione, compresi quelli che dipendono dalla vitamina K, il secondo, il settimo, il nono e il decimo. E' su questi fattori che agisce il warfarin."),
 (3,"chiaro",0,"Il fegato produce la bile e coniuga la bilirubina. E svolge la detossificazione: trasforma l'ammoniaca in urea. Funzioni che fra poco ritroviamo nei segni dell'insufficienza epatica."),
 (3,"chiaro",0,"Il metabolismo dei farmaci, con il citocromo P quattrocentocinquanta. E l'effetto di primo passaggio della lezione cinque punto uno: parte del farmaco preso per bocca e' inattivata prima di arrivare in circolo."),

 (4,"chiaro",0,"Dalle funzioni si ricavano i segni dell'insufficienza epatica, senza bisogno di memorizzarli. Meno albumina: edemi e ascite. Meno fattori della coagulazione: un INR alto, e i sanguinamenti."),
 (4,"chiaro",0,"Meno coniugazione della bilirubina: l'ittero. Meno eliminazione dell'ammoniaca: l'encefalopatia. Meno produzione di glucosio: l'ipoglicemia."),
 (4,"chiaro",0,"Meno metabolismo dei farmaci: l'accumulo, soprattutto di sedativi e oppioidi. E proprio questi farmaci possono scatenare l'encefalopatia."),
 (4,"chiaro",0,"E poi l'ipertensione portale, con le varici e l'ascite. E' il quadro clinico della lezione otto punto cinque, spiegato questa volta dalla fisiologia."),

 (5,"chiaro",0,"Il rene lavora attraverso il nefrone, la sua unita' funzionale: circa un milione per ogni rene. Nel glomerulo il sangue viene filtrato, e il filtrato passa nella capsula di Bowman."),
 (5,"chiaro",0,"Nel tubulo prossimale si riassorbe la maggior parte di acqua, sodio, glucosio e aminoacidi. L'ansa di Henle concentra le urine, ed e' la sede d'azione dei diuretici dell'ansa, come la furosemide."),
 (5,"chiaro",0,"Il tubulo distale e il dotto collettore fanno la regolazione fine, sotto l'azione di due ormoni: l'aldosterone, che fa riassorbire sodio, e l'ADH, l'ormone antidiuretico, che fa riassorbire acqua."),

 (6,"chiaro",0,"Filtrazione e clearance. I reni filtrano circa centottanta litri di plasma al giorno, e producono circa un litro e mezzo di urine: oltre il novantanove per cento del filtrato viene riassorbito."),
 (6,"chiaro",0,"La velocita' di filtrazione glomerulare, il GFR, e' normalmente intorno a novanta, centoventi millilitri al minuto. La clearance e' il volume di plasma depurato da una sostanza nell'unita' di tempo."),
 (6,"chiaro",0,"Nella pratica si usa la creatinina, e con formule come la CKD-EPI si calcola un GFR stimato. Ma attenzione: la creatinina dipende dalla massa muscolare."),
 (6,"chiaro",0,"[thoughtful] In un anziano magro e sarcopenico la creatinina puo' essere normale anche con una funzione renale ridotta. Ecco perche' le dosi si adattano al GFR stimato, e non al solo valore della creatinina."),

 (7,"chiaro",0,"Le funzioni del rene, che spiegano le complicanze della lezione otto punto quattro. L'equilibrio di acqua ed elettroliti. L'equilibrio acido-base. L'eliminazione di scorie e farmaci."),
 (7,"chiaro",0,"Il rene produce l'eritropoietina, per i globuli rossi: per questo l'insufficienza renale cronica causa anemia. E attiva la vitamina D: per questo altera il metabolismo del calcio e dell'osso."),
 (7,"chiaro",0,"E produce la renina: per questo il rene e' cosi' legato alla pressione arteriosa. E' il sistema renina-angiotensina-aldosterone, che restringe i vasi e fa trattenere sodio e acqua."),

 (8,"chiaro",0,"L'insufficienza renale e i farmaci. I farmaci eliminati dal rene si accumulano: alcuni antibiotici, come gli aminoglicosidi e la vancomicina, e le eparine a basso peso molecolare."),
 (8,"chiaro",0,"E ancora la metformina, la digossina, alcuni oppioidi. Le dosi si adattano al GFR, e quando e' previsto si monitorano i livelli del farmaco nel sangue."),
 (8,"chiaro",0,"Si evitano i nefrotossici, come i FANS e il mezzo di contrasto senza prevenzione, che vedremo nella lezione quattordici punto sette. E si fa attenzione all'iperkaliemia."),
 (8,"chiaro",0,"Il rischio di iperkaliemia viene dal potassio, dagli ACE-inibitori e dai diuretici risparmiatori di potassio. E l'infermiere segnala la terapia potenzialmente inappropriata."),

 (9,"chiaro",0,"La diuresi, con le sue definizioni. Nell'adulto la diuresi normale e' di almeno mezzo millilitro per chilo all'ora."),
 (9,"chiaro",0,"Oliguria: meno di quattrocento millilitri nelle ventiquattro ore. Anuria: meno di cento millilitri. Poliuria: oltre due litri e mezzo, tre litri nelle ventiquattro ore."),
 (9,"chiaro",0,"La diuresi e' anche un indicatore della perfusione degli organi. Per questo, nello shock e nella sepsi, si misura ogni ora."),

 (10,"chiaro",0,"La minzione. La vescica e' un serbatoio con un muscolo, il detrusore, e ha una capacita' indicativa di quattrocento, cinquecento millilitri. Lo stimolo compare in genere fra centocinquanta e trecento."),
 (10,"chiaro",0,"Lo svuotamento e' controllato dal parasimpatico, che contrae il detrusore, e dagli sfinteri, uno interno e uno esterno. Lo sfintere esterno e' quello volontario."),
 (10,"chiaro",0,"Ne deriva un collegamento con la farmacologia: i farmaci anticolinergici e gli oppioidi favoriscono la ritenzione urinaria, come hai visto nelle lezioni tre punto sei e nove punto quattro."),

 (11,"chiaro",0,"[curious] Il caso d'esame. Anziana di ottantasei anni, quarantacinque chili, creatinina uno. La funzione renale e' normale, quindi la dose standard del farmaco va bene?"),
 (11,"chiaro",0,"No. In una persona anziana con poca massa muscolare, una creatinina normale puo' corrispondere a un GFR stimato nettamente ridotto. Il valore della creatinina, da solo, inganna."),
 (11,"chiaro",0,"Prima di un farmaco a eliminazione renale si verifica il GFR stimato o la clearance, e si segnala al medico o al farmacista se la dose sembra eccessiva. La fisiologia previene un errore di terapia."),

 (12,"chiaro",0,"Il collegamento con l'assistenza. La valutazione dello stato nutrizionale, della lezione tre punto tre. Nel paziente epatopatico, l'INR e il rischio di sanguinamento, l'encefalopatia e la stipsi."),
 (12,"chiaro",0,"Il bilancio idrico e la diuresi oraria. Le dosi adattate alla funzione renale. La prevenzione della nefrotossicita'. E il cateterismo, quando c'e' una ritenzione."),

 (13,"chiaro",0,"I numeri della lezione. Filtrato circa centottanta litri al giorno, urine circa un litro e mezzo. GFR normale circa novanta, centoventi. Diuresi di almeno mezzo millilitro per chilo all'ora."),
 (13,"chiaro",0,"Oliguria sotto i quattrocento millilitri, anuria sotto i cento, poliuria oltre i due litri e mezzo, tre. Vescica, quattrocento, cinquecento. Fattori vitamina K-dipendenti: due, sette, nove, dieci."),

 (14,"chiaro",0,"La tabella. Stomaco, fattore intrinseco e B dodici. Duodeno, bile ed enzimi pancreatici. Tenue, assorbimento. Colon, acqua e vitamina K. Fegato: albumina, coagulazione, bilirubina, ammoniaca, farmaci."),
 (14,"chiaro",0,"I segni dell'insufficienza epatica. Il nefrone, dal glomerulo all'ansa di Henle, sede della furosemide. La creatinina e la massa muscolare. Eritropoietina, vitamina D, renina."),

 (15,"chiaro",0,"I fili con gli altri moduli. Il primo passaggio e le vie di somministrazione, con le lezioni cinque punto uno e cinque punto due. L'encefalopatia e la paracentesi, con la otto punto cinque."),
 (15,"chiaro",0,"La fistola e la dialisi, con la otto punto quattro. La nutrizione, con la tre punto tre. E la ritenzione urinaria, con la tre punto sei."),

 (16,"profondo",1.2,"[serious] La frase della lezione: una creatinina normale non garantisce un rene normale. Soprattutto nell'anziano fragile."),

 (17,"chiaro",0,"[warm] Nella prossima lezione: il sistema nervoso, con il sistema nervoso autonomo, e il sistema endocrino, con i loro collegamenti con la farmacologia."),
 (17,"chiaro",0,"Il parasimpatico che contrae il detrusore, per esempio, lo ritroverai proprio li', nel sistema nervoso autonomo. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"La digestione",3:"Le funzioni del fegato",4:"L'insufficienza epatica",5:"Il nefrone",
 6:"Filtrazione e clearance",7:"Le funzioni del rene",8:"L'insufficienza renale e i farmaci",9:"La diuresi",10:"La minzione",
 11:"Il caso d'esame",12:"Il collegamento con l'assistenza",13:"I numeri della lezione",14:"La tabella",15:"Il filo con gli altri moduli",
 16:"La frase della lezione",17:"Chiusura"}

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
