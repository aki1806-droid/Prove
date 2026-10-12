# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] L'emorragia post-partum e' una delle principali cause di morte materna nel mondo, e resta temuta anche nei paesi ad alto reddito. Spesso si sviluppa in pochi minuti, in una donna giovane che compensa e poi crolla."),
 (1,"chiaro",0,"Vediamo la regola delle quattro T, le azioni in sequenza, e il neonato, che nel frattempo ha bisogno di qualcuno. Le lezioni: sei punto sei, dieci punto quattro, dieci punto sei, undici punto quattro e quattordici punto sei."),

 (2,"chiaro",0,"Lo scenario. Sara, trentaquattro anni, secondo parto, vaginale, dopo un travaglio lungo, con un neonato grande: quattro chili e cento. Trenta minuti dopo l'espulsione della placenta, comincia a sanguinare."),
 (2,"chiaro",0,"La perdita e' abbondante e continua, i telini sono intrisi. L'utero e' molle e alto, non si sente bene. Frequenza centodiciotto, pressione cento su sessantadue: in travaglio era centoventicinque su ottanta."),
 (2,"chiaro",0,"E' pallida, sudata, ansiosa. La vescica e' distesa. Il neonato e' in braccio al padre. Fermati un momento: qual e' la causa piu' probabile, e qual e' il primo gesto?"),

 (3,"chiaro",0,"[thoughtful] Il ragionamento. Una perdita di sangue abbondante dopo il parto, con segni di ipovolemia: e' un'emorragia post-partum. E i fattori di rischio ci sono: un travaglio lungo e un neonato grande."),
 (3,"chiaro",0,"Hanno sovradisteso e affaticato l'utero. E l'utero molle indica un'atonia uterina, la causa piu' frequente: l'utero non si contrae, e i vasi della sede placentare continuano a sanguinare."),
 (3,"chiaro",0,"Una donna giovane compensa a lungo: la tachicardia arriva prima dell'ipotensione, e quando la pressione crolla la perdita e' gia' grave. E un dettaglio pratico: la vescica distesa ostacola la contrazione dell'utero."),

 (4,"chiaro",0,"La regola delle quattro T orienta la ricerca della causa. Tono: l'atonia uterina, la piu' frequente. Trauma: lacerazioni del canale del parto, ematomi, raramente una rottura dell'utero."),
 (4,"chiaro",0,"Tessuto: residui di placenta o di membrane. Trombina: alterazioni della coagulazione, come nella HELLP del caso precedente o nel distacco di placenta. Si cercano tutte, perche' possono coesistere."),

 (5,"chiaro",0,"Le prime azioni, molte in parallelo. Chiamare aiuto: ostetrica, ginecologo, anestesista, secondo il protocollo per l'emorragia post-partum. E il massaggio del fondo uterino, che stimola la contrazione."),
 (5,"chiaro",0,"Svuotare la vescica con un catetere. Due accessi venosi di grosso calibro. I prelievi: emocromo, coagulazione, fibrinogeno, gruppo e prove crociate. Ossigeno. Parametri ravvicinati e monitoraggio."),
 (5,"chiaro",0,"E quantificare le perdite, pesando telini e garze, o con raccoglitori graduati: la stima a occhio sottovaluta quasi sempre la perdita. Infine, mantenere la temperatura."),

 (6,"chiaro",0,"La terapia, secondo prescrizione. Gli uterotonici, come l'ossitocina in infusione, e altri farmaci se non e' sufficiente. L'acido tranexamico, il prima possibile ed entro tre ore dal parto, come nel trauma."),
 (6,"chiaro",0,"Liquidi riscaldati. Gli emocomponenti secondo protocollo, con attenzione anche al fibrinogeno, che nell'emorragia ostetrica cala rapidamente."),
 (6,"chiaro",0,"Se la causa non si risolve, si passa agli interventi ostetrici e chirurgici, o alla radiologia interventistica. E sempre la sicurezza trasfusionale della lezione sei punto sei."),

 (7,"chiaro",0,"La valutazione. Dopo il massaggio, lo svuotamento della vescica e l'uterotonico, l'utero e' contratto, duro, a palla, e le perdite si riducono. Frequenza centoquattro, pressione centootto su sessantasei."),
 (7,"chiaro",0,"La perdita totale, quantificata, e' di milletrecento millilitri: molto piu' di quanto si sarebbe stimato a occhio. Si ripetono emocromo e coagulazione."),
 (7,"chiaro",0,"Nelle ore successive si sorvegliano il tono uterino, le perdite, i parametri e la diuresi. E l'indice di shock, frequenza diviso sistolica, e' un utile campanello d'allarme."),

 (8,"chiaro",0,"Il neonato. E' stato valutato con l'Apgar a uno e cinque minuti, con punteggi di nove e dieci."),
 (8,"chiaro",0,"Mentre la madre e' instabile, il contatto pelle a pelle si puo' fare con il padre: riscalda il neonato e lo calma."),
 (8,"chiaro",0,"Si previene l'ipotermia, si somministra la vitamina K con la profilassi secondo protocollo, e si verifica l'identificazione madre-neonato."),
 (8,"chiaro",0,"E un dettaglio: un neonato grande, di quattro chili e cento, e' a rischio di ipoglicemia. Si seguono i controlli glicemici del protocollo e un'alimentazione precoce."),
 (8,"chiaro",0,"Appena la madre e' stabile, si favorisce il contatto, e il primo attacco al seno."),

 (9,"chiaro",0,"Un approfondimento: l'allattamento dopo un'emorragia. L'anemia, la stanchezza e lo stress possono ritardare la montata lattea, e la madre puo' scoraggiarsi."),
 (9,"chiaro",0,"Si sostiene un attacco al seno precoce e frequente, con posizioni comode per una donna affaticata, e il supporto dell'ostetrica. La terapia con il ferro, secondo prescrizione."),
 (9,"chiaro",0,"E un effetto positivo da spiegarle: la suzione stimola l'ossitocina, che favorisce la contrazione dell'utero. Attenzione alla prima alzata: ipotensione e anemia espongono alle cadute, e la si accompagna sempre."),

 (10,"chiaro",0,"Il benessere emotivo. Un'emorragia puo' essere vissuta come un parto traumatico, dalla madre e dal partner. Quando la donna e' pronta, le si spiega che cosa e' successo, con ascolto e la presenza del partner."),
 (10,"chiaro",0,"Nelle settimane successive si distingue il baby blues, transitorio, dalla depressione post-partum e dai sintomi da stress post-traumatico, che richiedono un aiuto. E si dice chi contattare: consultorio, ostetrica, medico."),

 (11,"chiaro",0,"La dimissione. I segni d'allarme del puerperio, per cui rivolgersi subito: un sanguinamento abbondante, coaguli grandi, febbre, dolore addominale, perdite maleodoranti."),
 (11,"chiaro",0,"Poi cefalea intensa, dolore o gonfiore di un polpaccio, difficolta' respiratoria. Ricordi il caso sedici punto quattro: il puerperio e' un periodo di rischio tromboembolico aumentato."),
 (11,"chiaro",0,"Poi l'anemia, con il ferro, l'alimentazione e il riposo. E i riferimenti sul territorio: il consultorio familiare e il pediatra di libera scelta."),

 (12,"chiaro",0,"Gli errori. Stimare le perdite a occhio. Rassicurarsi per una pressione ancora normale. Dimenticare la vescica piena. Aspettare di conoscere la causa per iniziare il massaggio e l'uterotonico."),
 (12,"chiaro",0,"Non chiamare subito aiuto. Dimenticare il fibrinogeno. Lasciare il neonato senza un adulto e senza calore. E alzare la madre da sola dopo l'emorragia."),

 (13,"chiaro",0,"[curious] Le domande d'orale. Prima: le quattro T? Tono, cioe' l'atonia uterina, la causa piu' frequente. Trauma, cioe' lacerazioni ed ematomi."),
 (13,"chiaro",0,"Tessuto, cioe' residui placentari. Trombina, cioe' alterazioni della coagulazione. Seconda: le prime azioni? Chiamare aiuto, massaggio del fondo uterino, svuotamento della vescica."),
 (13,"chiaro",0,"Due accessi di grosso calibro, prelievi con gruppo e fibrinogeno, ossigeno, uterotonici e acido tranexamico secondo prescrizione, la quantificazione delle perdite e il monitoraggio."),
 (13,"chiaro",0,"Terza: l'Apgar? Un punteggio da zero a dieci, a uno e cinque minuti, con cinque parametri: colorito, frequenza cardiaca, reattivita', tono, respiro. E' normale da sette a dieci."),

 (14,"chiaro",0,"La risposta modello. Puerpera dopo un travaglio lungo e un neonato grande, con perdita ematica abbondante, utero molle, tachicardia, pressione in calo, pallore e sudorazione: emorragia post-partum da probabile atonia uterina."),
 (14,"chiaro",0,"Chiamo subito aiuto secondo il protocollo; eseguo il massaggio del fondo uterino e svuoto la vescica; posiziono due accessi di grosso calibro ed eseguo i prelievi con fibrinogeno e gruppo."),
 (14,"chiaro",0,"Somministro ossigeno, liquidi riscaldati, uterotonici, acido tranexamico ed emocomponenti secondo prescrizione. Quantifico le perdite pesando telini e garze, monitoro parametri, tono uterino e diuresi, e cerco le altre cause."),
 (14,"chiaro",0,"Garantisco al neonato calore e contatto pelle a pelle con il padre. Dopo la stabilizzazione sostengo l'allattamento, accompagno la prima alzata, ascolto il vissuto della coppia ed educo ai segni d'allarme."),

 (15,"chiaro",0,"I collegamenti. La trasfusione con la sei punto sei. Il parto, l'Apgar e l'emorragia post-partum con la dieci punto quattro. Lo shock con la dieci punto sei."),
 (15,"chiaro",0,"Il puerperio e il neonato con la undici punto quattro. La coagulazione con la quattordici punto sei. E il tromboembolismo con il caso sedici punto quattro."),

 (16,"chiaro",0,"Il lavoro di squadra. Nei punti nascita esistono protocolli e check-list per l'emorragia post-partum, e l'equipe si allena con simulazioni periodiche."),
 (16,"chiaro",0,"Durante l'evento un operatore registra tempi, farmaci e perdite, si comunica a ciclo chiuso, e un kit con il materiale e' sempre pronto. Dopo, un debriefing. E' un esempio di come l'organizzazione salvi vite."),

 (17,"profondo",1.2,"[serious] La frase del caso: dopo il parto, un utero molle e' un'emergenza. Massaggio, vescica vuota, aiuto."),

 (18,"chiaro",0,"[warm] Nella prossima lezione: un lattante di nove mesi con vomito e diarrea, dei genitori preoccupati, e i calcoli per chilo che in pediatria fanno la differenza fra la dose giusta e un errore. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"Lo scenario",3:"Il ragionamento",4:"La regola delle quattro T",5:"Le prime azioni",
 6:"La terapia",7:"La valutazione",8:"Il neonato",9:"L'allattamento dopo un'emorragia",10:"Il benessere emotivo",
 11:"La dimissione",12:"Gli errori da evitare",13:"Le domande d'orale",14:"La risposta modello",15:"I collegamenti",
 16:"Il lavoro di squadra in sala parto",17:"La frase del caso",18:"Chiusura"}

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
