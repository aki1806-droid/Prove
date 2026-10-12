# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Apriamo il secondo modulo di casi avanzati con l'area materno-infantile. L'assistenza ostetrica spetta all'ostetrica, ma una donna in gravidanza puo' arrivare in un pronto soccorso generale, in medicina, in chirurgia."),
 (1,"chiaro",0,"E l'infermiere deve saper riconoscere un'emergenza che mette in pericolo due vite: una preeclampsia grave. Le lezioni: cinque punto tre, otto punto sei, dieci punto uno, undici punto quattro e quattordici punto cinque."),

 (2,"chiaro",0,"Lo scenario. Elisa, trentuno anni, alla prima gravidanza, trentacinque settimane. Arriva in pronto soccorso alle ventidue con una cefalea intensa da ore. E dice: vedo delle lucine."),
 (2,"chiaro",0,"Ha un dolore allo stomaco, che lei attribuisce a una gastrite. Mani e volto sono gonfi da due giorni. La pressione e' centosessantotto su centododici; ripetuta, centosettanta su centodieci."),
 (2,"chiaro",0,"Proteinuria marcata allo stick, riflessi rotulei vivaci. Percepisce i movimenti del bambino. Fermati un momento: perche' quel dolore allo stomaco non e' una gastrite?"),

 (3,"chiaro",0,"[thoughtful] Il ragionamento. Un'ipertensione grave, da centosessanta su centodieci in su, dopo la ventesima settimana, con la proteinuria: e' una preeclampsia con segni di gravita'."),
 (3,"chiaro",0,"E ci sono tutti i segni di gravita' della lezione undici punto quattro: cefalea intensa, disturbi visivi, dolore epigastrico, edemi improvvisi, riflessi vivaci."),
 (3,"chiaro",0,"Il dolore epigastrico non e' una gastrite: puo' indicare un coinvolgimento del fegato, come nella sindrome HELLP. E il rischio e' imminente: eclampsia, cioe' convulsioni, ictus, distacco di placenta, sofferenza del feto."),

 (4,"chiaro",0,"Le prime azioni. Un codice di alta priorita', e l'attivazione immediata di ginecologo e ostetrica, secondo il percorso ostetrico dell'ospedale."),
 (4,"chiaro",0,"Decubito laterale sinistro, che evita la compressione della vena cava. Un ambiente tranquillo, con luci soffuse e pochi stimoli, perche' luce e rumore possono favorire le convulsioni. E non la si lascia sola."),
 (4,"chiaro",0,"Accesso venoso e prelievi: l'emocromo con le piastrine, la funzione epatica, l'LDH, la funzione renale, la coagulazione."),
 (4,"chiaro",0,"La pressione ogni quindici minuti. Il catetere vescicale e la diuresi oraria, secondo indicazione. E il monitoraggio del benessere fetale, che e' di competenza dell'ostetrica."),

 (5,"chiaro",0,"L'abbassamento della pressione. Gli antipertensivi secondo prescrizione, come il labetalolo o la nifedipina, riducono il rischio di ictus materno, una delle principali cause di morte nella preeclampsia."),
 (5,"chiaro",0,"Ma la pressione non va fatta crollare: un calo brusco riduce la perfusione della placenta e danneggia il feto. Si misura bene, con il bracciale giusto e il braccio all'altezza del cuore, e si rivaluta dopo ogni dose."),

 (6,"chiaro",0,"Il magnesio solfato. Non e' un antipertensivo: serve a prevenire e trattare le convulsioni. Si somministra endovena secondo prescrizione: una dose di carico, poi un'infusione continua con pompa e doppio controllo."),
 (6,"chiaro",0,"La sorveglianza della tossicita' e' infermieristica, e i quiz la chiedono sempre. I riflessi rotulei: la loro scomparsa e' il primo segno di sovradosaggio."),
 (6,"chiaro",0,"La frequenza respiratoria, perche' il magnesio in eccesso deprime il respiro. La diuresi, perche' il magnesio si elimina con il rene: un'oliguria significa accumulo. Poi coscienza e saturazione."),
 (6,"chiaro",0,"E l'antidoto, il calcio gluconato, deve essere pronto al letto. Riflessi, respiro, diuresi, calcio gluconato: e' la sequenza da ricordare."),

 (7,"chiaro",0,"[serious] Alle ventitre e dieci Elisa ha una crisi convulsiva generalizzata: e' un'eclampsia. Le regole sono quelle della lezione otto punto sei: chiami aiuto, la proteggi dai traumi, non metti nulla in bocca."),
 (7,"chiaro",0,"Non la trattieni, e cronometri. Al termine, decubito laterale sinistro, aspirazione e ossigeno. Il magnesio secondo prescrizione, con un'eventuale dose aggiuntiva, e il monitoraggio della madre e del feto."),
 (7,"chiaro",0,"E un concetto fondamentale: la cura definitiva della preeclampsia e' il parto. Lo decide il ginecologo, di solito dopo aver stabilizzato la madre."),

 (8,"chiaro",0,"Un approfondimento: la sindrome HELLP, una forma grave della preeclampsia. Il nome e' un acronimo inglese. H: emolisi. EL: enzimi epatici elevati. LP: piastrine basse."),
 (8,"chiaro",0,"I sintomi sono spesso proprio quelli di Elisa: dolore epigastrico o all'ipocondrio destro, nausea, vomito, un malessere generale. E vengono facilmente scambiati per un problema digestivo."),
 (8,"chiaro",0,"Puo' comparire anche con una pressione non altissima, e anche dopo il parto. Espone a emorragie, rottura del fegato, coagulopatia. Ecco perche', negli esami, piastrine e funzione epatica sono cosi' importanti."),

 (9,"chiaro",0,"Dopo il parto. La preeclampsia non finisce sempre con la nascita: puo' persistere, o comparire nei giorni successivi."),
 (9,"chiaro",0,"Per questo il magnesio e la sorveglianza proseguono secondo prescrizione, spesso per ventiquattro ore: pressione, diuresi, segni neurologici, dolore epigastrico."),
 (9,"chiaro",0,"C'e' un rischio maggiore di emorragia post-partum, per le piastrine basse e perche' il magnesio rilassa l'utero: lo vedremo nel prossimo caso. L'allattamento e' compatibile con la maggior parte degli antipertensivi."),

 (10,"chiaro",0,"L'educazione e la prevenzione. In gravidanza la donna deve conoscere i segni d'allarme: cefalea intensa, disturbi visivi, dolore epigastrico, gonfiore improvviso, riduzione dei movimenti del bambino."),
 (10,"chiaro",0,"E rivolgersi subito all'ospedale, senza aspettare il controllo programmato. Nelle donne ad alto rischio il medico puo' prescrivere una profilassi con acido acetilsalicilico a basse dosi, gia' nelle prime fasi."),
 (10,"chiaro",0,"E dopo: chi ha avuto una preeclampsia ha un rischio cardiovascolare aumentato nel lungo periodo. Servono controlli della pressione, e una sorveglianza nelle gravidanze successive."),

 (11,"chiaro",0,"Una precisazione sui ruoli. L'assistenza alla gravidanza, al parto e al puerperio e' di competenza dell'ostetrica, con un profilo professionale specifico. L'infermiere riconosce l'emergenza e attiva il percorso."),
 (11,"chiaro",0,"Collabora nell'emergenza e nella terapia secondo i propri ambiti. E fuori dal blocco parto, in pronto soccorso, in medicina, in chirurgia, e' spesso il primo a vedere la paziente: questi segni sono sua competenza."),

 (12,"chiaro",0,"Gli errori. Attribuire il dolore epigastrico a una gastrite. Far attendere la paziente in sala d'attesa. La posizione supina. Abbassare la pressione bruscamente."),
 (12,"chiaro",0,"Il magnesio senza pompa, e senza sorveglianza di riflessi, respiro e diuresi. Il calcio gluconato non disponibile. E pensare che con il parto il rischio sia finito."),

 (13,"chiaro",0,"[curious] Le domande d'orale. Prima: i segni di gravita'? Pressione da centosessanta su centodieci in su, cefalea intensa, disturbi visivi, dolore epigastrico o all'ipocondrio destro."),
 (13,"chiaro",0,"Poi oliguria, edema polmonare, piastrine basse o alterazioni epatiche e renali. E le convulsioni, che definiscono l'eclampsia."),
 (13,"chiaro",0,"Seconda: come si sorveglia il magnesio? Riflessi rotulei, frequenza respiratoria, diuresi, coscienza e saturazione, con il calcio gluconato pronto come antidoto."),
 (13,"chiaro",0,"Terza: la HELLP? Una forma grave di preeclampsia con emolisi, enzimi epatici elevati e piastrine basse, spesso con dolore epigastrico, che puo' comparire anche dopo il parto."),

 (14,"chiaro",0,"La risposta modello. Gestante di trentacinque settimane, pressione centosettanta su centodieci, proteinuria, cefalea intensa, disturbi visivi, dolore epigastrico ed edemi: preeclampsia grave, a rischio di eclampsia e HELLP."),
 (14,"chiaro",0,"Assegno alta priorita' e attivo subito ginecologo e ostetrica; la posiziono in decubito laterale sinistro in un ambiente tranquillo, e non la lascio sola. Reperisco un accesso ed eseguo i prelievi."),
 (14,"chiaro",0,"Misuro la pressione ogni quindici minuti e la diuresi oraria. Somministro gli antipertensivi prescritti evitando cali bruschi, e il magnesio con pompa e doppio controllo, sorvegliando riflessi, respiro, diuresi e coscienza."),
 (14,"chiaro",0,"Il calcio gluconato e' pronto. In caso di convulsione la proteggo, non metto nulla in bocca, e al termine decubito laterale e ossigeno. La sorveglianza prosegue dopo il parto. Documento ed educo ai segni d'allarme."),

 (15,"chiaro",0,"I collegamenti. Calcoli e pompe con la cinque punto tre. La crisi convulsiva con la otto punto sei. Il triage con la dieci punto uno. L'area materno-infantile con la undici punto quattro."),
 (15,"chiaro",0,"I riflessi con la quattordici punto cinque. E l'emorragia post-partum con la dieci punto quattro, e con il prossimo caso."),

 (16,"chiaro",0,"In Veneto l'assistenza alla gravidanza e' organizzata nel percorso nascita regionale, con una rete di punti nascita: le gravidanze ad alto rischio vanno verso centri con terapia intensiva neonatale."),
 (16,"chiaro",0,"Quando possibile si preferisce il trasporto in utero, cioe' trasferire la madre prima del parto, perche' e' piu' sicuro per il neonato. E i consultori familiari seguono la gravidanza sul territorio."),

 (17,"profondo",1.2,"[serious] La frase del caso: in gravidanza, mal di testa e mal di stomaco con la pressione alta non sono disturbi minori."),

 (18,"chiaro",0,"[warm] Nella prossima lezione: un'emorragia nelle due ore dopo il parto, la regola delle quattro T, e il neonato che nel frattempo ha bisogno di qualcuno. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"Lo scenario",3:"Il ragionamento",4:"Le prime azioni",5:"L'abbassamento della pressione",
 6:"Il magnesio solfato",7:"Ore 23:10: la convulsione",8:"La sindrome HELLP",9:"Dopo il parto",
 10:"L'educazione e la prevenzione",11:"Il ruolo dell'infermiere e dell'ostetrica",12:"Gli errori da evitare",
 13:"Le domande d'orale",14:"La risposta modello",15:"I collegamenti",16:"In Veneto",17:"La frase del caso",18:"Chiusura"}

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
