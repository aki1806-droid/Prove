# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Le prime ore dopo l'intervento sono quelle in cui la persona passa dall'anestesia alla coscienza, e in cui gli effetti dei farmaci e dell'intervento si sommano: un periodo ad alto rischio."),
 (1,"chiaro",0,"Si gestisce in sala risveglio e poi in reparto. L'approccio e' sempre lo stesso, ed e' quello che vedremo anche nel modulo dieci: A, B, C, poi tutto il resto. Vie aeree, respiro, circolo, nell'ordine."),

 (2,"chiaro",0,"Tutto comincia con una consegna strutturata, dall'anestesista e dall'equipe di sala all'infermiere della recovery room, con lo SBAR che abbiamo imparato nei primi moduli."),
 (2,"chiaro",0,"Identita', intervento, tipo di anestesia, eventi intraoperatori, liquidi infusi e perdite, farmaci somministrati, soprattutto oppioidi e antagonisti, analgesia prevista, drenaggi, indicazioni."),
 (2,"chiaro",0,"Un'informazione persa qui si scopre ore dopo, quando e' un problema: un oppioide dato in sala e non riferito e' una depressione respiratoria che nessuno si aspetta."),

 (3,"chiaro",0,"A, le vie aeree. Il rischio principale e' l'ostruzione da caduta della lingua, perche' i muscoli sono ancora rilassati e la lingua scivola all'indietro contro la parete del faringe."),
 (3,"chiaro",0,"I segni: russamento, rientramenti, un movimento paradosso fra torace e addome, cioe' l'addome che si gonfia mentre il torace si abbassa, e desaturazione."),
 (3,"chiaro",0,"Le manovre: sublussazione della mandibola o sollevamento del mento, e una cannula orofaringea se non c'e' ancora il riflesso faringeo. Se vomita, posizione laterale e aspiratore pronto e funzionante."),

 (4,"chiaro",0,"B, il respiro: frequenza, saturazione, profondita', ossigeno secondo prescrizione, e attenzione all'effetto residuo di oppioidi e miorilassanti, che deprimono il respiro."),
 (4,"chiaro",0,"C, il circolo: frequenza cardiaca, pressione, colorito, riempimento capillare, e le perdite: dalla ferita, dai drenaggi, nella diuresi."),
 (4,"chiaro",0,"Una tachicardia nuova, anche con pressione normale, puo' essere il primo segno di un sanguinamento: il cuore compensa prima che la pressione scenda."),

 (5,"chiaro",0,"Poi gli altri controlli. Coscienza e orientamento. Temperatura, con attenzione all'ipotermia e ai brividi, che aumentano il consumo di ossigeno e il dolore."),
 (5,"chiaro",0,"Dolore, con la scala. Nausea e vomito. Ferita e drenaggi: quantita' e aspetto di quello che esce. Diuresi. Glicemia se indicata, per esempio nel diabetico."),
 (5,"chiaro",0,"E dopo un'anestesia spinale o peridurale, la sensibilita' e la ripresa della motilita' degli arti inferiori: finche' le gambe non rispondono, la persona non si alza."),

 (6,"chiaro",0,"Quando si puo' dimettere il paziente dalla sala risveglio? Lo strumento classico e' il punteggio di Aldrete, con cinque parametri da zero a due punti ciascuno."),
 (6,"chiaro",0,"Attivita' motoria, respirazione, circolazione, cioe' la pressione rispetto ai valori preoperatori, coscienza e saturazione, o il colorito dove non c'e' il saturimetro."),
 (6,"chiaro",0,"Il totale va da zero a dieci, e il paziente e' di norma trasferibile in reparto con un punteggio di almeno nove: un solo parametro puo' non essere ancora al massimo."),
 (6,"chiaro",0,"Nel day surgery, per la dimissione a casa, si usano criteri specifici piu' ampi, che comprendono dolore, nausea, sanguinamento e capacita' di camminare."),

 (7,"chiaro",0,"La nausea e il vomito postoperatori, la PONV. I quattro fattori di rischio del punteggio di Apfel: sesso femminile, non fumatore, storia di PONV o di mal d'auto, uso di oppioidi nel postoperatorio."),
 (7,"chiaro",0,"Piu' fattori, piu' rischio, piu' farmaci in profilassi. Se il paziente vomita: posizione laterale, aspirazione se serve, antiemetico secondo prescrizione, e sostegno della ferita con le mani o un cuscino."),
 (7,"chiaro",0,"Molti pazienti ricordano la nausea come l'esperienza peggiore dell'intervento, peggio del dolore: prevenirla non e' un dettaglio di comfort."),

 (8,"chiaro",0,"Il dolore postoperatorio. Si valuta con la scala a intervalli regolari, a riposo e in movimento, perche' un dolore accettabile a letto puo' impedire di alzarsi o di tossire."),
 (8,"chiaro",0,"Si usa l'analgesia multimodale: paracetamolo, FANS se non controindicati, oppioidi al bisogno, tecniche loco-regionali come la peridurale. Farmaci diversi, su bersagli diversi, con meno dose di ciascuno."),
 (8,"chiaro",0,"Si somministra a orario fisso, con una dose di soccorso per i picchi, e si rivaluta dopo ogni somministrazione: il dolore che non risponde si segnala."),
 (8,"chiaro",0,"L'obiettivo non e' solo il comfort: e' permettere di respirare profondamente, tossire e mobilizzarsi, cioe' prevenire le complicanze della prossima lezione."),

 (9,"chiaro",0,"La peridurale per l'analgesia postoperatoria richiede una sorveglianza specifica: livello di analgesia, blocco motorio, pressione, sedazione e frequenza respiratoria se la miscela contiene oppioidi, sede del catetere."),
 (9,"chiaro",0,"E un segnale d'allarme preciso: la comparsa o l'aumento del blocco motorio, un mal di schiena intenso o nuovi deficit vanno segnalati subito. Il blocco motorio non dovrebbe aumentare, mai."),
 (9,"chiaro",0,"Possono indicare un ematoma epidurale, che comprime il midollo e richiede un intervento urgente: qui le ore contano."),

 (10,"chiaro",0,"La ripresa dell'alimentazione. Secondo il modello ERAS si offrono liquidi gia' poche ore dopo l'intervento, quando la persona e' sveglia e senza nausea, e poi un'alimentazione progressiva."),
 (10,"chiaro",0,"Nella maggior parte degli interventi non e' necessario aspettare la canalizzazione ai gas: e' un'altra abitudine rovesciata, perche' l'alimentazione precoce la favorisce."),
 (10,"chiaro",0,"Prima si verifica che la deglutizione e la tosse siano efficaci, soprattutto nell'anziano: il primo sorso d'acqua si osserva."),

 (11,"chiaro",0,"La prima mobilizzazione: il prima possibile, spesso gia' la sera dell'intervento. Prima si valutano parametri, dolore, nausea ed eventuale blocco motorio residuo."),
 (11,"chiaro",0,"Alzata in due tempi della lezione tre punto due: seduto al bordo del letto, poi in piedi. La prima volta la persona e' sempre accompagnata, anche se si sente bene: l'ipotensione ortostatica e' frequente."),
 (11,"chiaro",0,"Si gestiscono drenaggi, cateteri e linee prima di muoversi, e ci si ferma se compaiono vertigini, pallore, sudorazione o dispnea: si torna seduti, non si insiste."),

 (12,"chiaro",0,"La prima minzione e' attesa entro sei-otto ore. I fattori di rischio di ritenzione: anestesia spinale, oppioidi, chirurgia pelvica, ipertrofia prostatica."),
 (12,"chiaro",0,"Se la persona non urina, si valuta il globo con il bladder scanner prima di pensare al catetere, come nella lezione tre punto sei: si misura, non si presume."),

 (13,"chiaro",0,"Il delirium postoperatorio, frequentissimo nell'anziano. I fattori: eta', demenza preesistente, dolore, farmaci, ipossia, ritenzione urinaria, disidratazione, mancanza di occhiali e apparecchi acustici."),
 (13,"chiaro",0,"Si riconosce con la CAM della lezione due punto tre; si previene restituendo subito occhiali e apparecchi, con i familiari, il controllo del dolore, la mobilizzazione e il sonno. Lo riprenderemo nel modulo undici."),

 (14,"chiaro",0,"Il caso. Due ore dopo una colecistectomia: frequenza da settantotto a centododici, pressione centodieci su settanta contro centoquaranta su ottantacinque prima dell'intervento."),
 (14,"chiaro",0,"Paziente pallido e agitato, drenaggio con duecentocinquanta millilitri di sangue nell'ultima ora. Che cosa pensi?"),
 (14,"chiaro",0,"Emorragia postoperatoria con shock iniziale: la tachicardia e l'agitazione arrivano prima del crollo della pressione, e una pressione «normale» qui e' gia' trenta punti sotto quella del paziente."),
 (14,"profondo",1.2,"[serious] La tachicardia arriva prima del crollo della pressione."),
 (14,"chiaro",0,"Che cosa fai? Avvisi subito il chirurgo con SBAR, ossigeno, parametri ravvicinati, verifichi gli accessi venosi, prepari prelievi e richiesta di emocomponenti secondo indicazione, digiuno per un possibile reintervento."),

 (15,"chiaro",0,"Nelle aziende venete i blocchi operatori dispongono di recovery room con criteri condivisi di dimissibilita', e molte realta' hanno un servizio per il dolore acuto postoperatorio."),
 (15,"chiaro",0,"Con infermieri dedicati che seguono peridurali e PCA nei reparti: e' un esempio della rete della legge trentotto della lezione tre punto sette."),

 (16,"chiaro",0,"Ricapitoliamo. Consegna SBAR. A: ostruzione da lingua, sublussazione della mandibola. B e C: saturazione, pressione, perdite. Aldrete da zero a dieci, trasferibile da nove."),
 (16,"chiaro",0,"Apfel: donna, non fumatore, storia di nausea, oppioidi. Analgesia multimodale, valutata a riposo e in movimento. Peridurale: blocco motorio in aumento e' un allarme. Prima minzione entro sei-otto ore."),
 (16,"chiaro",0,"[warm] Nella prossima lezione: le complicanze postoperatorie, con l'emorragia, le infezioni, la trombosi e la deiscenza della ferita. A tra poco."),
]

CAPITOLI = {1:"Apertura",2:"La consegna",3:"A: le vie aeree",4:"B e C",5:"Gli altri controlli",6:"Il punteggio di Aldrete",7:"Nausea e vomito",
 8:"Il dolore",9:"La peridurale",10:"L'alimentazione",11:"La prima mobilizzazione",12:"La prima minzione",13:"Il delirium",14:"Il caso",15:"In Veneto",16:"Chiusura"}

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
