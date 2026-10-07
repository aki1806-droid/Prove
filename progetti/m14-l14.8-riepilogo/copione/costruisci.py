# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Chiudiamo il modulo delle basi biomediche con due strumenti: le tabelle dei valori da fotografare, e i collegamenti fra fisiologia e assistenza, la vera utilita' del modulo."),
 (1,"chiaro",0,"All'esame, molte domande cliniche si risolvono ragionando sul meccanismo. Ripassiamo gli apparati, poi la tabella e i collegamenti."),

 (2,"chiaro",0,"Liquidi e acido-base. L'acqua e' circa il sessanta per cento del peso nell'adulto: due terzi dentro le cellule, un terzo fuori. Il sodio domina fuori, il potassio dentro."),
 (2,"chiaro",0,"A tenerli separati e' la pompa sodio-potassio, che porta fuori tre ioni sodio e dentro due ioni potassio. E l'osmosi: l'acqua si sposta verso la soluzione piu' concentrata."),
 (2,"chiaro",0,"Le forze di Starling. La pressione idrostatica spinge il liquido fuori dal vaso; la pressione oncotica, dovuta soprattutto all'albumina, lo richiama dentro. Se l'equilibrio si rompe, nasce l'edema."),
 (2,"chiaro",0,"L'ADH, l'ormone antidiuretico, fa riassorbire acqua nel rene. L'aldosterone, prodotto dal surrene, fa riassorbire sodio, e in cambio fa perdere potassio."),
 (2,"chiaro",0,"Il pH, fra sette virgola trentacinque e sette virgola quarantacinque, e' difeso da tre sistemi con tempi diversi: i tamponi in pochi secondi, il polmone in minuti, il rene in giorni."),

 (3,"chiaro",0,"Cuore e circolo. A destra la valvola tricuspide, a sinistra la mitrale. L'arteria polmonare porta al polmone sangue povero di ossigeno. Le coronarie si riempiono in diastole, a muscolo rilassato."),
 (3,"chiaro",0,"L'impulso nasce nel nodo senoatriale, il pacemaker naturale, da sessanta a cento battiti al minuto. Poi nodo atrioventricolare, fascio di His, branche e fibre di Purkinje."),
 (3,"chiaro",0,"La gittata cardiaca e' la gittata sistolica per la frequenza: circa cinque litri al minuto, a riposo. E la pressione arteriosa e' la gittata per le resistenze periferiche."),
 (3,"chiaro",0,"La pressione media e' circa la diastolica piu' un terzo della differenza fra sistolica e diastolica: con centoventi su sessanta, circa ottanta. Nello shock, l'obiettivo e' almeno sessantacinque."),
 (3,"chiaro",0,"A breve termine la pressione la regolano i barocettori, attraverso il sistema autonomo. A lungo termine, il sistema renina-angiotensina-aldosterone, che restringe i vasi e trattiene sodio e acqua."),

 (4,"chiaro",0,"Respiro. Il bronco destro e' piu' verticale. L'inspirazione e' attiva, con il diaframma. Volume corrente circa cinquecento millilitri, spazio morto circa centocinquanta."),
 (4,"chiaro",0,"Circa il novantotto per cento dell'ossigeno viaggia legato all'emoglobina. La curva di dissociazione e' a S, con un punto da ricordare: saturazione novanta, pressione parziale di ossigeno sessanta."),
 (4,"chiaro",0,"Sotto quel punto la curva diventa ripida. Si sposta a destra con temperatura e anidride carbonica alte, e con l'acidosi: l'emoglobina cede piu' facilmente l'ossigeno ai tessuti."),
 (4,"chiaro",0,"L'insufficienza respiratoria. Tipo uno, ipossiemica: ossigeno arterioso sotto sessanta. Tipo due, ipercapnica: in piu', anidride carbonica sopra quarantacinque."),

 (5,"chiaro",0,"Digerente, fegato, rene. Nello stomaco, il fattore intrinseco, che serve ad assorbire la vitamina B dodici: dopo una gastrectomia, la B dodici si da' per via parenterale."),
 (5,"chiaro",0,"Il fegato produce albumina e fattori della coagulazione: due, sette, nove e dieci. Coniuga la bilirubina, trasforma l'ammoniaca in urea, e metabolizza i farmaci: il primo passaggio."),
 (5,"chiaro",0,"Il rene filtra circa centottanta litri al giorno, e produce circa un litro e mezzo di urine. Il GFR, da novanta a centoventi millilitri al minuto. La creatinina dipende dalla massa muscolare."),
 (5,"chiaro",0,"Il rene produce eritropoietina e renina, e attiva la vitamina D. Oliguria sotto i quattrocento millilitri nelle ventiquattro ore, anuria sotto i cento."),

 (6,"chiaro",0,"Nervoso ed endocrino. Via motoria incrociata: una lesione dell'emisfero sinistro da' un deficit a destra. E nella maggior parte delle persone il linguaggio sta a sinistra."),
 (6,"chiaro",0,"Simpatico: beta uno sul cuore, beta due sui bronchi, midriasi, ritenzione. Parasimpatico: acetilcolina, vago, bradicardia, miosi. Un beta-bloccante non selettivo puo' dare broncospasmo."),
 (6,"chiaro",0,"Nell'ipotiroidismo primario la tiroide produce poco, e il TSH risulta alto. Il PTH aumenta il calcio. L'insulina abbassa la glicemia, il glucagone la alza."),
 (6,"chiaro",0,"Gli ormoni dello stress, come cortisolo e adrenalina, alzano la glicemia. E i corticosteroidi presi a lungo non si sospendono mai bruscamente: rischio di crisi surrenalica."),

 (7,"chiaro",0,"Sangue e difese. Il globulo rosso vive circa centoventi giorni, la piastrina da sette a dieci. Lo zero e' donatore universale di globuli rossi, l'AB ricevente universale; per il plasma vale il contrario."),
 (7,"chiaro",0,"Il fattore Rh, e la profilassi anti-D nella madre Rh negativa. L'emostasi: vascolare, piastrinica, coagulativa, e la fibrinolisi, che scioglie il coagulo e libera il D-dimero."),
 (7,"chiaro",0,"La coagulazione: l'INR controlla il warfarin, l'aPTT l'eparina non frazionata. E gli antidoti: la vitamina K per il warfarin, la protamina per l'eparina."),
 (7,"chiaro",0,"Le immunoglobuline. Le G attraversano la placenta, le M sono la prima risposta, le A difendono le mucose, le E sono quelle delle allergie. Immunita' attiva con il vaccino, passiva con le immunoglobuline."),
 (7,"chiaro",0,"I vaccini vivi attenuati non si fanno in gravidanza. E la febbre: si copre il paziente nella salita, con i brividi, e lo si scopre nella defervescenza, quando suda."),

 (8,"chiaro",0,"La tabella dei valori, da fotografare. Con la solita premessa: sono indicativi, cambiano fra laboratori, e fa fede l'intervallo del referto."),
 (8,"chiaro",0,"L'emocromo. Emoglobina da tredici a diciassette nell'uomo, da dodici a sedici nella donna. Globuli bianchi da quattromila a diecimila. Neutrofili sotto cinquecento: neutropenia grave."),
 (8,"chiaro",0,"Piastrine da centocinquantamila a quattrocentocinquantamila. Sodio da centotrentacinque a centoquarantacinque. Potassio da tre virgola cinque a cinque. Calcio totale da otto virgola cinque a dieci virgola cinque."),
 (8,"chiaro",0,"Glicemia a digiuno da settanta a novantanove. Creatinina da zero virgola sei a uno virgola due. INR da zero virgola otto a uno virgola due, e da due a tre in terapia. aPTT da venticinque a trentacinque secondi."),
 (8,"chiaro",0,"Albumina da tre virgola cinque a cinque. Bilirubina totale sotto uno virgola due. Lattati sotto due. E la saturazione: da novantaquattro a novantotto, e da ottantotto a novantadue negli ipercapnici."),
 (8,"chiaro",0,"L'emogas. pH da sette virgola trentacinque a sette virgola quarantacinque. Anidride carbonica da trentacinque a quarantacinque, ossigeno da ottanta a cento. Bicarbonato da ventidue a ventisei."),

 (9,"chiaro",0,"I collegamenti piu' utili, ciascuno una domanda d'esame. Un campione emolizzato da' un potassio falsamente alto, perche' il potassio sta nelle cellule. La tachicardia accorcia la diastole: meno perfusione coronarica."),
 (9,"chiaro",0,"L'ipoalbuminemia abbassa la pressione oncotica, e porta all'edema. Una creatinina normale, nell'anziano magro, puo' nascondere un GFR ridotto. E sotto il novanta di saturazione, la curva precipita."),
 (9,"chiaro",0,"Lo stress alza la glicemia. Il bronco destro spiega l'intubazione selettiva e i corpi estranei. Il beta-bloccante non selettivo da' broncospasmo. In risonanza, l'effetto proiettile."),

 (10,"chiaro",0,"[thoughtful] Le confusioni che costano piu' punti. L'arteria polmonare porta sangue povero di ossigeno, le vene polmonari sangue ricco. Il primo tono chiude le atrioventricolari, il secondo le semilunari."),
 (10,"chiaro",0,"Ipossiemia e' poco ossigeno nel sangue, ipossia poco ossigeno ai tessuti. Il sintomo lo riferisce la persona, il segno lo rileva l'operatore. E l'INR segue il warfarin, l'aPTT l'eparina."),
 (10,"chiaro",0,"Lo zero dona globuli rossi a tutti, ma per il plasma e' l'AB. Nell'addome, l'auscultazione viene prima della palpazione. La risonanza non usa radiazioni, ma il magnete e' sempre attivo."),

 (11,"chiaro",0,"[curious] Le domande d'orale piu' probabili. La curva di dissociazione. Le cause dell'edema, con Starling. Simpatico e parasimpatico, e i farmaci. I gruppi sanguigni e la trasfusione."),
 (11,"chiaro",0,"Le fasi della febbre e l'assistenza. La preparazione alla TC con contrasto. La sicurezza in risonanza. I valori critici. Per ognuna, una risposta dal meccanismo all'azione infermieristica."),

 (12,"chiaro",0,"Come proseguire. Il test del modulo: trenta domande, soglia ventuno. Poi trascrivi nel quaderno la tabella dei valori che abbiamo appena visto."),
 (12,"chiaro",0,"Per ogni apparato, costruisci una catena: un meccanismo, una conseguenza clinica, un intervento infermieristico. Ripassa con gli schemi: nefrone, sistema di conduzione, curva di dissociazione, emostasi."),

 (13,"profondo",1.2,"[serious] La frase del modulo: dal meccanismo all'azione. La fisiologia e' il motivo, l'assistenza e' la risposta."),

 (14,"chiaro",0,"[warm] Siamo all'ultimo modulo: il percorso trasversale, dedicato alle prove del concorso. Il metodo per i quiz, la prova scritta e pratica, l'orale."),
 (14,"chiaro",0,"E poi l'inglese e l'informatica, con le simulazioni finali. Ci vediamo li'."),
]
CAPITOLI = {1:"Apertura",2:"Liquidi e acido-base",3:"Cuore e circolo",4:"Respiro",5:"Digerente, fegato, rene",
 6:"Nervoso ed endocrino",7:"Sangue e difese",8:"La tabella dei valori",9:"I collegamenti piu' utili",
 10:"Le confusioni che costano piu' punti",11:"Le domande d'orale",12:"Come proseguire",13:"La frase del modulo",14:"Chiusura"}

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
