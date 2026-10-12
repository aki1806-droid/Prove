# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Questo e' un caso di infezione correlata all'assistenza. Mette alla prova tutto il modulo quattro: igiene delle mani, precauzioni di isolamento, sanificazione, uso responsabile degli antibiotici."),
 (1,"chiaro",0,"Il protagonista forma spore resistenti e trova terreno favorevole negli ospedali: il Clostridioides difficile. Le lezioni: quattro punto due, quattro punto tre, quattro punto cinque, quattro punto sei, tre punto cinque."),

 (2,"chiaro",0,"Lo scenario. Il signor Aldo ha ottantuno anni, ed e' ricoverato in medicina per una polmonite. E' in terapia con una cefalosporina e con un inibitore di pompa protonica."),
 (2,"chiaro",0,"In sesta giornata presenta cinque scariche di feci acquose nelle ultime ventiquattro ore, febbricola e dolore addominale crampiforme. Divide la stanza con un altro paziente, e usa il bagno comune."),
 (2,"chiaro",0,"Fermati un momento: che cosa sospetti? E che cosa fai, prima ancora di avere un risultato di laboratorio?"),

 (3,"chiaro",0,"[thoughtful] Il ragionamento. Tre o piu' scariche non formate in ventiquattro ore, in un paziente ricoverato e in terapia antibiotica: sospetta infezione da Clostridioides difficile. I fattori di rischio ci sono tutti."),
 (3,"chiaro",0,"Gli antibiotici, che alterano il microbiota intestinale; l'eta' avanzata; l'ospedalizzazione; gli inibitori di pompa. Il batterio si trasmette per via oro-fecale, con spore che resistono a lungo nell'ambiente."),
 (3,"chiaro",0,"E che l'alcol non distrugge. La regola organizzativa piu' importante: le precauzioni si avviano al sospetto, non alla conferma. Aspettare l'esito significa dare al batterio uno o due giorni di vantaggio."),

 (4,"chiaro",0,"Le precauzioni da contatto. Una stanza singola con bagno dedicato, o almeno una comoda dedicata. Se non ci sono stanze singole, una coorte con altri pazienti infetti, secondo le indicazioni del gruppo per le infezioni."),
 (4,"chiaro",0,"Guanti e camice per ogni contatto con il paziente o con il suo ambiente. Dispositivi dedicati: fonendoscopio, termometro, sfigmomanometro. La segnaletica sulla porta."),
 (4,"chiaro",0,"Trasporti limitati, e comunicati in anticipo. E si informa il gruppo operativo per il controllo delle infezioni. Sono le precauzioni da contatto della lezione quattro punto tre."),

 (5,"chiaro",0,"[serious] L'igiene delle mani ha qui la sua eccezione piu' famosa. La frizione alcolica, che di solito e' il metodo di riferimento, non elimina le spore."),
 (5,"chiaro",0,"Per questo, dopo il contatto con il paziente o con il suo ambiente, ci si toglie i guanti e ci si lava le mani con acqua e sapone: e' l'azione meccanica a rimuovere le spore."),
 (5,"chiaro",0,"I guanti restano fondamentali. In tutte le altre situazioni del reparto, la frizione alcolica resta il metodo di riferimento. Ed e' una domanda d'esame quasi certa."),

 (6,"chiaro",0,"La diagnosi. Si invia un campione di feci non formate. Le feci formate di norma non vanno inviate, perche' il test potrebbe essere positivo in un semplice portatore."),
 (6,"chiaro",0,"Contenitore idoneo, etichettatura corretta, invio rapido o conservazione secondo procedura. Il laboratorio ricerca le tossine, o il gene che le produce, secondo il proprio protocollo."),
 (6,"chiaro",0,"E non si ripete il test per verificare la guarigione: il batterio puo' restare a lungo, anche quando il paziente sta bene."),

 (7,"chiaro",0,"La terapia, su prescrizione: un trattamento specifico per via orale, come la vancomicina orale o la fidaxomicina. La vancomicina orale non viene assorbita, e agisce proprio nell'intestino."),
 (7,"chiaro",0,"Si rivaluta con il medico l'antibiotico in corso, che ha causato il problema, e l'inibitore di pompa. Si sospendono i lassativi, che a volte si trovano ancora in terapia."),
 (7,"chiaro",0,"Si evitano gli antidiarroici senza indicazione. E sullo sfondo c'e' la stewardship della lezione quattro punto sei: meno antibiotici inutili significa meno infezioni da Clostridioides."),

 (8,"chiaro",0,"L'assistenza al paziente. Idratazione, bilancio idrico e peso, perche' un anziano con diarrea si disidrata rapidamente. Gli elettroliti, con il rischio di ipokaliemia della lezione tre punto cinque."),
 (8,"chiaro",0,"Un diario delle scariche, con numero e consistenza, per esempio con la scala di Bristol. La cura della cute perianale, con igiene delicata e prodotti barriera, per prevenire la dermatite associata all'incontinenza."),
 (8,"chiaro",0,"Il rischio di cadute, per l'urgenza di andare in bagno e per la debolezza. La dignita' e la privacy, in una condizione imbarazzante. E l'alimentazione."),

 (9,"chiaro",0,"I segni di gravita', da conoscere. Febbre elevata, leucocitosi marcata, aumento della creatinina, distensione addominale dolorosa. E una trappola: una riduzione improvvisa delle scariche, con l'addome che si distende."),
 (9,"chiaro",0,"Non e' sempre un miglioramento. Puo' indicare un ileo, o un megacolon tossico: una complicanza grave, in cui il colon si dilata e non si svuota piu'. Con ipotensione e confusione, si segnala subito."),

 (10,"chiaro",0,"Ottava giornata: il compagno di stanza inizia ad avere diarrea. Due casi collegati possono indicare un cluster, cioe' una trasmissione in reparto."),
 (10,"chiaro",0,"Si informano subito il gruppo per il controllo delle infezioni e la direzione, e si avviano le precauzioni anche per il secondo paziente. Poi si rivede che cosa puo' aver favorito la trasmissione."),
 (10,"chiaro",0,"Il bagno comune, i dispositivi condivisi, l'aderenza all'igiene delle mani. Sanificazione straordinaria, e sorveglianza degli altri pazienti. Il secondo caso conferma quanto fosse importante isolare il primo al sospetto."),

 (11,"chiaro",0,"La sanificazione. Servono prodotti sporicidi, per esempio a base di cloro, secondo la procedura aziendale: e' la disinfezione sporicida della lezione quattro punto cinque."),
 (11,"chiaro",0,"Attenzione alle superfici ad alto contatto: sponde, campanello, comodino, maniglie, bagno, comoda. I dispositivi riutilizzabili si puliscono e si disinfettano dopo ogni uso."),
 (11,"chiaro",0,"Alla dimissione, o al termine dell'isolamento, la sanificazione terminale della stanza, coordinandosi con il servizio di pulizia, che deve conoscere il tipo di prodotto da usare."),

 (12,"chiaro",0,"Un approfondimento sui germi multiresistenti, che seguono una logica simile. Lo MRSA, lo stafilococco resistente alla meticillina."),
 (12,"chiaro",0,"Gli enterobatteri produttori di carbapenemasi, come la Klebsiella KPC, molto diffusi negli ospedali italiani. E gli enterococchi resistenti alla vancomicina."),
 (12,"chiaro",0,"Per i pazienti a rischio, uno screening secondo protocollo, per esempio un tampone rettale all'ingresso. Poi le precauzioni da contatto, l'igiene delle mani, i dispositivi dedicati, la sanificazione, la stewardship."),
 (12,"chiaro",0,"E la colonizzazione si segnala nei trasferimenti e alla dimissione, anche verso le strutture residenziali, per non interrompere la catena di prevenzione."),

 (13,"chiaro",0,"Gli errori. Aspettare il referto per isolare. Usare solo la frizione alcolica. Lasciare il paziente nel bagno comune. Condividere fonendoscopio e termometro. Inviare feci formate."),
 (13,"chiaro",0,"Continuare lassativi e antibiotico senza rivalutazione. Interpretare come un miglioramento la riduzione delle scariche con l'addome disteso. Trascurare la cute e la dignita'."),

 (14,"chiaro",0,"[curious] Le domande d'orale. Prima: perche' acqua e sapone? Perche' il batterio forma spore che l'alcol non distrugge, e il lavaggio le rimuove meccanicamente. Seconda: le precauzioni da contatto?"),
 (14,"chiaro",0,"Stanza singola o coorte, bagno dedicato, guanti e camice per ogni contatto, dispositivi dedicati, segnaletica, trasporti limitati, sanificazione accurata, gruppo per le infezioni informato."),
 (14,"chiaro",0,"Terza: i fattori di rischio? Terapia antibiotica, eta' avanzata, ospedalizzazione o residenza in strutture, inibitori di pompa protonica, comorbidita' e immunodepressione."),

 (15,"chiaro",0,"La risposta modello. Paziente anziano in terapia antibiotica e con inibitore di pompa, che in sesta giornata presenta diarrea acquosa, febbricola e dolore addominale: sospetta infezione da Clostridioides difficile."),
 (15,"chiaro",0,"Trasmissibile tramite spore. Al sospetto attivo le precauzioni da contatto: stanza singola con bagno dedicato, guanti e camice, dispositivi dedicati. Informo il medico e il gruppo per le infezioni."),
 (15,"chiaro",0,"Eseguo l'igiene delle mani con acqua e sapone. Invio un campione di feci non formate. Somministro la terapia orale prescritta, segnalo per la rivalutazione antibiotico e inibitore di pompa, sospendo i lassativi."),
 (15,"chiaro",0,"Garantisco idratazione, elettroliti, cura della cute, prevenzione delle cadute e dignita'. Sorveglio i segni di gravita'. Coordino la sanificazione con prodotti sporicidi, e segnalo eventuali nuovi casi."),

 (16,"chiaro",0,"I collegamenti. Igiene delle mani con la quattro punto due. Precauzioni e isolamento con la quattro punto tre. Sanificazione con la quattro punto cinque. Stewardship con la quattro punto sei."),
 (16,"chiaro",0,"Elettroliti e bilancio con la tre punto cinque. L'alvo con la tre punto sette. E la cute con la sette punto due."),

 (17,"profondo",1.2,"[serious] La frase del caso: con le spore, l'alcol non basta. Servono acqua, sapone, e un isolamento al primo sospetto."),

 (18,"chiaro",0,"[warm] Nella prossima lezione: un giovane motociclista politraumatizzato, che arriva in pronto soccorso di notte. L'approccio XABCDE in equipe, minuto per minuto. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"Lo scenario",3:"Il ragionamento",4:"Le precauzioni da contatto",5:"L'igiene delle mani: l'eccezione",
 6:"La diagnosi",7:"La terapia e la stewardship",8:"L'assistenza al paziente",9:"I segni di gravita'",
 10:"Ottava giornata: il secondo caso",11:"La sanificazione",12:"I germi multiresistenti",13:"Gli errori da evitare",
 14:"Le domande d'orale",15:"La risposta modello",16:"I collegamenti",17:"La frase del caso",18:"Chiusura"}

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
