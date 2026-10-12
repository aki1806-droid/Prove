# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Il paziente diabetico e' presente in quasi ogni reparto, e porta con se' tre rischi che l'infermiere gestisce ogni giorno: l'ipoglicemia, gli errori con l'insulina, le lesioni del piede."),
 (1,"chiaro",0,"Questo caso li mette insieme. E mostra come un dato apparentemente secondario, la funzione renale, cambi il ragionamento."),

 (2,"chiaro",0,"Lo scenario. Il signor Antonio ha settantuno anni e un diabete di tipo due in insulina: la basale la sera, la rapida ai pasti. Ha un'insufficienza renale cronica, con un GFR stimato di quarantadue."),
 (2,"chiaro",0,"E' ricoverato per un'ulcera plantare infetta, sotto la testa del primo metatarso destro. Ieri sera ha mangiato poco per la nausea, ma ha ricevuto le dosi abituali di insulina."),
 (2,"chiaro",0,"Alle sei e trenta e' sudato, tremante, confuso, ma risponde e deglutisce. La glicemia capillare e' quarantotto. Che cosa fai?"),

 (3,"chiaro",0,"Le azioni. Il paziente e' cosciente e deglutisce: si applica la regola del quindici. Quindici grammi di zuccheri semplici, per esempio tre bustine di zucchero sciolte in acqua, o un bicchiere di succo."),
 (3,"chiaro",0,"Poi si ricontrolla dopo quindici minuti, e si ripete se la glicemia e' ancora sotto settanta. Alla risoluzione, uno spuntino con carboidrati complessi, oppure si anticipa la colazione, per evitare una recidiva."),
 (3,"chiaro",0,"Se non fosse cosciente o non deglutisse: niente per bocca, ma glucagone o glucosio endovena secondo protocollo. Poi si avvisa il medico e si documenta. Alle sei e quarantacinque: glicemia novantasei, e lui e' lucido."),

 (4,"chiaro",0,"[thoughtful] Ora la domanda piu' importante: perche' e' successo? Le cause sono piu' d'una. Uno: una cena ridotta, con una dose piena di insulina rapida."),
 (4,"chiaro",0,"Due: l'insufficienza renale, che rallenta l'eliminazione dell'insulina e ne prolunga l'effetto, come nella lezione quattordici punto quattro. Tre: l'infezione migliora con l'antibiotico, e cala il fabbisogno di insulina."),
 (4,"chiaro",0,"Quattro: la dose basale serale non e' stata rivalutata. Il risultato pratico: lo schema va rivisto con il medico, e l'infermiere porta i dati per farlo."),

 (5,"chiaro",0,"La gestione dell'insulina ai pasti previene casi come questo. Glicemia prima di ogni somministrazione, e rapida coordinata con l'arrivo del pasto. A digiuno per un esame o un intervento, lo schema si rivede con il medico."),
 (5,"chiaro",0,"Se l'assunzione e' incerta, per nausea o inappetenza, si segue il protocollo: puo' prevedere la rapida subito dopo il pasto, in base a quanto il paziente ha davvero mangiato. E le variazioni si comunicano nelle consegne."),

 (6,"chiaro",0,"[serious] L'insulina e' un farmaco ad alto livello di attenzione, con errori tipici. La prescrizione va in unita' scritte per esteso: la U puo' essere letta come uno zero, e dieci U diventare cento."),
 (6,"chiaro",0,"Siringhe da insulina o penne, mai generiche. La penna e' personale, mai condivisa fra pazienti, nemmeno cambiando l'ago. Doppio controllo secondo procedura. La penna in uso a temperatura ambiente, le scorte in frigorifero."),

 (7,"chiaro",0,"Il piede. La sede plantare, sotto una prominenza ossea, indica una componente neuropatica: la persona non sente il dolore, ed e' per questo che l'ulcera e' arrivata a infettarsi."),
 (7,"chiaro",0,"Si valutano i segni di infezione: rossore, calore, edema, secrezione, odore. Se lo specillo, nel sondaggio, arriva all'osso, si sospetta un'osteomielite, da confermare con l'imaging."),
 (7,"chiaro",0,"E si documenta con il metodo TIME della lezione sette punto uno: dimensioni, fondo, essudato, margini, cute perilesionale."),

 (8,"chiaro",0,"La perfusione. Polsi pedidio e tibiale posteriore, colorito, temperatura, riempimento capillare. E un dettaglio che i quiz amano: l'indice caviglia-braccio della lezione sette punto tre."),
 (8,"chiaro",0,"Nel diabetico puo' essere falsamente normale, o addirittura elevato, perche' le arterie calcificate non si lasciano comprimere dal bracciale."),
 (8,"chiaro",0,"Allora si usano altri esami, come l'indice alluce-braccio o l'ossimetria transcutanea, secondo indicazione. E se c'e' un'arteriopatia, la ferita non guarira' senza una rivascolarizzazione."),

 (9,"chiaro",0,"Il trattamento del piede. Prima di tutto lo scarico, l'offloading: niente carico sull'ulcera, con calzature o tutori specifici, ausili e riposo dell'arto. Senza scarico l'ulcera non guarisce, qualunque medicazione si usi."),
 (9,"chiaro",0,"Poi medicazione secondo valutazione, antibiotico secondo prescrizione, controllo glicemico, perche' l'iperglicemia ritarda la guarigione, nutrizione. E si proteggono talloni e piede controlaterale, a rischio quanto l'altro."),

 (10,"chiaro",0,"Il caso mostra un equilibrio difficile. Troppo zucchero favorisce l'infezione e rallenta la guarigione. Troppo poco porta ipoglicemie, cadute, aritmie."),
 (10,"chiaro",0,"L'obiettivo in reparto e' indicativamente fra centoquaranta e centottanta, personalizzato. E nell'anziano con insufficienza renale la priorita' e' evitare l'ipoglicemia, piu' pericolosa di una glicemia moderatamente alta."),

 (11,"chiaro",0,"L'educazione per il piede, che e' prevenzione delle amputazioni. L'ispezione quotidiana, anche con uno specchio o con l'aiuto di un familiare, perche' la neuropatia toglie il dolore che avviserebbe."),
 (11,"chiaro",0,"Il lavaggio con acqua tiepida, di cui si controlla la temperatura, e l'asciugatura accurata fra le dita. La crema idratante, ma non fra le dita. Le unghie tagliate dritte, le callosita' dal podologo."),
 (11,"chiaro",0,"Mai camminare scalzi. Scarpe comode, controllandone l'interno prima di indossarle. Niente borse dell'acqua calda. E ogni lesione si segnala subito."),

 (12,"chiaro",0,"E l'educazione sull'ipoglicemia: riconoscerne i sintomi, anche quelli notturni, come sudorazione, incubi, cefalea al risveglio. Avere sempre zuccheri con se'. Conoscere la regola del quindici."),
 (12,"chiaro",0,"Poi le regole dei giorni di malattia della lezione otto punto tre, che qui si leggono anche al contrario. Quando si mangia meno, non si sospende di propria iniziativa l'insulina basale."),
 (12,"chiaro",0,"Si misura piu' spesso, e si contatta il medico per adattare le dosi. Il percorso continua nell'ambulatorio del piede diabetico e in diabetologia."),

 (13,"chiaro",0,"Gli errori. Dare la stessa dose di rapida senza considerare il pasto. Dimenticare la funzione renale. Trattare l'ipoglicemia senza cercarne la causa. Dare zuccheri per bocca a chi non deglutisce."),
 (13,"chiaro",0,"Scrivere, o accettare, la U per unita'. Fidarsi di un ABI normale nel diabetico. Medicare senza scaricare il piede."),

 (14,"chiaro",0,"Un approfondimento per il turno di notte: l'ipoglicemia notturna. Di notte i sintomi possono essere mascherati dal sonno."),
 (14,"chiaro",0,"I segnali da cogliere: sudorazione, agitazione, respiro rumoroso, un risveglio confuso, incubi, cefalea al mattino. I beta-bloccanti possono mascherare il tremore e la tachicardia, i segnali d'allarme piu' evidenti."),
 (14,"chiaro",0,"Anziani e insufficienza renale sono piu' a rischio: nei pazienti a rischio, controlli notturni secondo prescrizione o protocollo. E una cena ridotta con insulina invariata va detta nelle consegne."),

 (15,"chiaro",0,"[curious] Le domande d'orale. Prima: come si tratta l'ipoglicemia? Nel cosciente che deglutisce, con la regola del quindici: quindici grammi di zuccheri semplici, ricontrollo dopo quindici minuti, poi carboidrati complessi."),
 (15,"chiaro",0,"Nel paziente incosciente niente per bocca, ma glucagone o glucosio endovena secondo protocollo. Seconda: perche' l'indice caviglia-braccio e' inaffidabile nel diabetico?"),
 (15,"chiaro",0,"Perche' le arterie calcificate non si comprimono, e il valore risulta falsamente normale o elevato: si ricorre ad altri esami, come l'indice alluce-braccio. Terza: che cosa insegna per il piede?"),
 (15,"chiaro",0,"Ispezione quotidiana, igiene con acqua tiepida e asciugatura fra le dita, niente piedi nudi, scarpe adeguate, niente fonti di calore, e segnalazione immediata di ogni lesione."),

 (16,"chiaro",0,"La risposta modello. Paziente diabetico in insulina, con insufficienza renale cronica, che dopo una cena ridotta e dosi abituali presenta sudorazione, tremori, confusione e glicemia quarantotto: ipoglicemia sintomatica."),
 (16,"chiaro",0,"Cosciente e in grado di deglutire: applico la regola del quindici, ricontrollo dopo quindici minuti e poi do carboidrati complessi. Se fosse incosciente, niente per bocca, ma glucagone o glucosio endovena."),
 (16,"chiaro",0,"Avviso il medico e documento. Analizzo le cause per la revisione dello schema; poi verifico la glicemia prima di ogni dose, e coordino la rapida con l'effettiva assunzione del pasto."),
 (16,"chiaro",0,"Per l'ulcera valuto infezione e perfusione, garantisco scarico, medicazione e controllo glicemico. Educo a riconoscere l'ipoglicemia e alla cura del piede, con il teach-back."),

 (17,"chiaro",0,"I collegamenti. Insuline e ipoglicemia con la cinque punto cinque. Il diabete in ospedale con la otto punto tre. Il TIME e le medicazioni con la sette punto uno e la sette punto cinque."),
 (17,"chiaro",0,"Arteriopatia e ABI con la sette punto tre. Rene e farmaci con la quattordici punto quattro. E i farmaci ad alto livello di attenzione con la cinque punto quattro."),

 (18,"profondo",1.2,"[serious] La frase del caso: ogni ipoglicemia ha una causa. Trattarla senza cercarla significa aspettare la prossima."),

 (19,"chiaro",0,"[warm] Nella prossima lezione: una paziente in chemioterapia con la febbre, nove giorni dopo l'ultimo ciclo. Neutropenia, catetere venoso, piastrine basse e la dimensione umana della malattia oncologica. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"Lo scenario",3:"L'ipoglicemia: le azioni",4:"Perche' e' successo",
 5:"L'insulina ai pasti",6:"L'insulina: un farmaco ad alto rischio",7:"Il piede: la valutazione dell'ulcera",
 8:"Il piede: la perfusione",9:"Il piede: il trattamento infermieristico",10:"L'equilibrio difficile",
 11:"L'educazione: il piede",12:"L'educazione: l'ipoglicemia e i giorni di malattia",13:"Gli errori da evitare",
 14:"L'ipoglicemia notturna",15:"Le domande d'orale",16:"La risposta modello",17:"I collegamenti",
 18:"La frase del caso",19:"Chiusura"}

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
