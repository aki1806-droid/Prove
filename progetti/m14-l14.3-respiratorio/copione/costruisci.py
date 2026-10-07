# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Respirare significa due cose: portare ossigeno ai tessuti ed eliminare l'anidride carbonica. Tutto parte da qui."),
 (1,"chiaro",0,"Ripercorriamo l'anatomia delle vie aeree, la meccanica del respiro, gli scambi gassosi, e una curva che spiega molte scelte di assistenza: quella di dissociazione dell'emoglobina."),

 (2,"chiaro",0,"Le vie aeree superiori. Il naso, che riscalda, umidifica e filtra l'aria: funzioni che si perdono nella tracheostomia, come hai visto nella lezione otto punto due. Poi la faringe."),
 (2,"chiaro",0,"E la laringe, con le corde vocali e l'epiglottide, che protegge dall'inalazione. Poi le vie aeree inferiori: la trachea, i bronchi principali, i bronchi lobari e segmentari, i bronchioli, fino agli alveoli."),
 (2,"chiaro",0,"Un dettaglio chiesto spesso: il bronco principale destro e' piu' corto, piu' largo e piu' verticale. Per questo i corpi estranei inalati finiscono piu' spesso a destra."),
 (2,"chiaro",0,"Per lo stesso motivo un tubo endotracheale troppo profondo finisce piu' spesso nel bronco destro. Il polmone destro ha tre lobi, il sinistro due. E tutto e' avvolto dalla pleura, viscerale e parietale."),

 (3,"chiaro",0,"La meccanica del respiro. L'inspirazione e' attiva. Il muscolo principale e' il diaframma, che si contrae e si abbassa; gli intercostali esterni sollevano le coste."),
 (3,"chiaro",0,"Il torace si espande, la pressione negli alveoli scende, e l'aria entra. L'espirazione, invece, a riposo e' passiva: e' il semplice ritorno elastico del polmone."),
 (3,"chiaro",0,"Quando il respiro e' difficile entrano in gioco i muscoli accessori: sternocleidomastoideo, scaleni, addominali. Si vedono contrarsi sul collo: un segno di fatica respiratoria, lezione dieci punto due."),
 (3,"chiaro",0,"E il surfattante, che riveste gli alveoli: riduce la tensione superficiale e ne impedisce il collasso. La sua carenza nel neonato prematuro causa la sindrome da distress respiratorio."),

 (4,"chiaro",0,"I volumi polmonari. Il volume corrente e' l'aria mobilizzata a ogni respiro tranquillo: a riposo, circa cinquecento millilitri."),
 (4,"chiaro",0,"Di questi, circa centocinquanta restano nello spazio morto anatomico, dove non avvengono scambi. Per questo un respiro rapido e superficiale e' poco efficace: gran parte dell'aria non arriva agli alveoli."),
 (4,"chiaro",0,"La capacita' vitale e' la massima quantita' di aria espirabile dopo un'inspirazione massima. Il volume residuo e' quello che resta comunque nei polmoni, dopo l'espirazione massima."),
 (4,"chiaro",0,"E la spirometria. Se il rapporto fra FEV uno e capacita' vitale forzata scende sotto zero virgola sette, indica un'ostruzione, come nella BPCO."),

 (5,"chiaro",0,"Gli scambi gassosi avvengono negli alveoli, per diffusione attraverso la membrana alveolo-capillare, sottilissima: l'ossigeno passa dall'alveolo al sangue, l'anidride carbonica dal sangue all'alveolo."),
 (5,"chiaro",0,"Perche' funzionino serve un buon rapporto ventilazione-perfusione. Un alveolo ventilato ma non perfuso, come nell'embolia, o perfuso ma non ventilato, come nell'atelettasia o nella polmonite: il sangue esce poco ossigenato."),
 (5,"chiaro",0,"Un dettaglio: l'anidride carbonica diffonde circa venti volte piu' facilmente dell'ossigeno. Ed e' per questo che nelle malattie polmonari l'ipossiemia compare di solito prima dell'ipercapnia."),

 (6,"chiaro",0,"Il trasporto dell'ossigeno. Quasi tutto l'ossigeno, circa il novantotto per cento, viaggia legato all'emoglobina. Solo una piccola parte e' disciolta nel plasma."),
 (6,"chiaro",0,"La saturazione indica la percentuale di emoglobina legata all'ossigeno. Ma la quantita' di ossigeno trasportata dipende da due cose: dalla saturazione e dalla quantita' di emoglobina."),
 (6,"chiaro",0,"Ecco perche', come nella lezione otto punto due, un paziente gravemente anemico puo' avere una saturazione normale, e comunque un apporto di ossigeno insufficiente ai tessuti."),

 (7,"chiaro",0,"[curious] La curva di dissociazione dell'emoglobina descrive il rapporto fra la pressione parziale di ossigeno nel sangue, la PaO2, e la saturazione. Ha una forma a S: e' una sigmoide."),
 (7,"chiaro",0,"Nella parte alta la curva e' piatta: la PaO2 puo' scendere molto, mentre la saturazione cambia poco. Grandi variazioni di PaO2, piccole variazioni di saturazione."),
 (7,"chiaro",0,"Ma sotto circa il novanta per cento di saturazione, che corrisponde a una PaO2 di circa sessanta millimetri di mercurio, la curva diventa ripida: piccole riduzioni di PaO2 fanno crollare la saturazione."),
 (7,"chiaro",0,"Da qui un riferimento da ricordare: saturazione novanta, PaO2 sessanta, la soglia dell'insufficienza respiratoria. Un paziente che scende da novantaquattro a novanta e' sul bordo del precipizio."),

 (8,"chiaro",0,"La curva si sposta. A destra, quando l'emoglobina cede piu' facilmente l'ossigeno ai tessuti: con l'aumento di temperatura e anidride carbonica, con l'acidosi, con l'aumento del due-tre-DPG."),
 (8,"chiaro",0,"E' cio' che succede nei tessuti che lavorano, come un muscolo sotto sforzo, che ha piu' bisogno di ossigeno."),
 (8,"chiaro",0,"A sinistra, invece, l'emoglobina trattiene l'ossigeno: con l'ipotermia, con l'alcalosi, con la riduzione dell'anidride carbonica, con il monossido di carbonio, e con l'emoglobina fetale."),
 (8,"chiaro",0,"Un esempio pratico: in un paziente ipotermico o in alcalosi, l'ossigeno arriva ai tessuti con piu' difficolta', anche a parita' di saturazione."),

 (9,"chiaro",0,"L'anidride carbonica viaggia soprattutto come bicarbonato, poi legata all'emoglobina e disciolta. Questo collega il respiro all'equilibrio acido-base, della lezione quattordici punto uno."),
 (9,"chiaro",0,"Il controllo del respiro parte dai centri respiratori del tronco encefalico, nel bulbo e nel ponte. I chemocettori centrali sono sensibili all'anidride carbonica e al pH: sono lo stimolo principale."),
 (9,"chiaro",0,"I chemocettori periferici, carotidei e aortici, cioe' nelle carotidi e nell'aorta, sono sensibili soprattutto all'ipossia."),
 (9,"chiaro",0,"La regola della lezione otto punto due: nel BPCO ipercapnico, troppo ossigeno puo' peggiorare l'ipercapnia, per piu' meccanismi: il rapporto ventilazione-perfusione, l'effetto Haldane e, in parte, la riduzione dello stimolo."),

 (10,"chiaro",0,"L'insufficienza respiratoria ha due tipi. Il tipo uno, ipossiemica: PaO2 sotto sessanta, con anidride carbonica normale o bassa. Le cause tipiche: la polmonite, l'edema polmonare, l'embolia."),
 (10,"chiaro",0,"Il tipo due, ipercapnica: PaO2 sotto sessanta e PaCO2 sopra quarantacinque. Le cause: la BPCO, le malattie neuromuscolari, la depressione del respiro da oppioidi."),
 (10,"chiaro",0,"Due termini da non confondere. Ipossiemia significa poco ossigeno nel sangue. Ipossia significa poco ossigeno ai tessuti."),
 (10,"chiaro",0,"E la cianosi e' un segno tardivo, che puo' mancare del tutto in un paziente anemico."),

 (11,"chiaro",0,"[thoughtful] Il collegamento con l'assistenza. La posizione seduta o semiseduta, che facilita il lavoro del diaframma. La respirazione profonda e lo spirometro incentivante contro l'atelettasia, lezione nove punto cinque."),
 (11,"chiaro",0,"La frequenza respiratoria come parametro sentinella. I target di saturazione, lezione otto punto due. L'umidificazione nelle vie aeree artificiali. E il bronco destro, quando si verifica la posizione del tubo."),

 (12,"chiaro",0,"Il caso d'esame. Paziente post-operatorio, frequenza respiratoria trentadue, respiri superficiali, saturazione novantadue. Perche' la ventilazione e' inefficace, anche se respira velocemente?"),
 (12,"chiaro",0,"Perche' con respiri piccoli gran parte di ogni respiro resta nello spazio morto, e non raggiunge gli alveoli. La ventilazione alveolare effettiva e' bassa: respira tanto, ma respira male."),
 (12,"chiaro",0,"Spesso la causa e' il dolore, che impedisce i respiri profondi. Gli interventi: un'analgesia adeguata, la posizione semiseduta, la respirazione profonda, e la valutazione con il medico."),
 (12,"chiaro",0,"E la saturazione a novantadue ti dice che sei vicino alla parte ripida della curva, dove piccole riduzioni di PaO2 la fanno crollare."),

 (13,"chiaro",0,"I numeri. Volume corrente circa cinquecento millilitri, spazio morto circa centocinquanta. FEV uno su FVC sotto zero virgola sette: ostruzione. Circa il novantotto per cento dell'ossigeno legato all'emoglobina."),
 (13,"chiaro",0,"Saturazione novanta, PaO2 sessanta. PaCO2 normale fra trentacinque e quarantacinque millimetri di mercurio. Insufficienza respiratoria: PaO2 sotto sessanta, e nel tipo due PaCO2 sopra quarantacinque."),

 (14,"chiaro",0,"La tabella. Il bronco destro piu' verticale. Tre lobi a destra, due a sinistra. Inspirazione attiva, con il diaframma, ed espirazione passiva. Il surfattante. Il rapporto ventilazione-perfusione."),
 (14,"chiaro",0,"La curva sigmoide: a destra cede l'ossigeno, a sinistra lo trattiene. Chemocettori centrali per l'anidride carbonica, periferici per l'ipossia. Tipo uno e tipo due. Ipossiemia e ipossia. Cianosi tardiva."),

 (15,"profondo",1.2,"[serious] La frase della lezione: sotto il novanta per cento la curva precipita. La saturazione si sorveglia prima che cada, non dopo."),

 (16,"chiaro",0,"[warm] Nella prossima lezione: l'apparato digerente, il fegato e il rene, con la filtrazione glomerulare e la clearance, che spiegano perche' tanti farmaci vanno adattati. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"Le vie aeree",3:"La meccanica del respiro",4:"I volumi polmonari",5:"Gli scambi gassosi",
 6:"Il trasporto dell'ossigeno",7:"La curva di dissociazione dell'emoglobina",8:"Gli spostamenti della curva",9:"Il trasporto della CO2 e il controllo del respiro",
 10:"L'insufficienza respiratoria",11:"Il collegamento con l'assistenza",12:"Il caso d'esame",13:"I numeri della lezione",14:"La tabella",15:"La frase della lezione",16:"Chiusura"}

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
