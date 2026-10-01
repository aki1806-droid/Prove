# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Il calcolo delle dosi e' la parte del programma che spaventa di piu', e ingiustamente. Tutti i calcoli dell'esame si risolvono con quattro strumenti."),
 (1,"chiaro",0,"Una proporzione, una conversione di unita', la lettura di una percentuale e una formula per le gocce. In questa lezione li vediamo uno per uno, con esercizi svolti."),
 (1,"chiaro",0,"Tieni carta e penna: quando vedi la scritta metti in pausa, prova a risolvere da solo prima di ascoltare la soluzione. Il video ti lascia qualche secondo, e il resto lo fai tu con il tasto pausa."),

 (2,"chiaro",0,"Primo strumento: le conversioni. Un grammo e' mille milligrammi. Un milligrammo e' mille microgrammi. Un litro e' mille millilitri."),
 (2,"chiaro",0,"Poi ci sono le unita' internazionali, per insulina ed eparina, e i milliequivalenti, per gli elettroliti come il potassio: queste non si convertono in grammi, si leggono sulla confezione."),
 (2,"profondo",1.2,"[serious] La regola d'oro: prima di calcolare, porta tutto alla stessa unita'. La maggior parte degli errori nasce qui, non nel calcolo."),

 (3,"chiaro",0,"Secondo strumento: la proporzione. Quasi ogni calcolo di dose si risolve cosi': dose prescritta diviso dose disponibile, moltiplicato per il volume in cui la dose disponibile e' contenuta."),
 (3,"chiaro",0,"Quello che mi serve, quello che ho, e in quanto liquido si trova. Tre numeri, e il quarto viene da solo: e' la stessa proporzione in tutti gli esercizi che seguono."),

 (4,"chiaro",2.5,"Primo esercizio. Prescritti settantacinque milligrammi. Disponibile una fiala da cento milligrammi in due millilitri. Quanti millilitri aspiri? Metti in pausa e prova."),
 (4,"chiaro",0,"Soluzione: settantacinque diviso cento fa zero virgola settantacinque, per due millilitri fa uno virgola cinque. Buon senso: mi servono tre quarti della fiala, e tre quarti di due millilitri sono uno e mezzo. Torna."),

 (5,"chiaro",2.5,"Secondo esercizio, con una trappola. Prescritti cinquecento microgrammi, disponibile una fiala da un milligrammo in due millilitri. Pausa."),
 (5,"chiaro",0,"Prima si uniforma: un milligrammo sono mille microgrammi. Poi la proporzione: cinquecento diviso mille fa zero virgola cinque, per due fa un millilitro."),
 (5,"profondo",1.2,"[serious] Chi dimentica la conversione ottiene un risultato mille volte sbagliato. Ed e' esattamente l'errore che uccide."),

 (6,"chiaro",0,"Terzo strumento: le percentuali. Una soluzione al per cento peso su volume indica i grammi contenuti in cento millilitri."),
 (6,"chiaro",0,"La fisiologica allo zero virgola nove per cento contiene zero virgola nove grammi in cento millilitri, cioe' nove grammi per litro. La glucosata al cinque per cento: cinque grammi in cento millilitri, cinquanta per litro."),
 (6,"chiaro",0,"E un trucco utilissimo: la percentuale moltiplicata per dieci da' i milligrammi per millilitro. Una soluzione al due per cento contiene venti milligrammi per millilitro."),

 (7,"chiaro",2.5,"Esercizio. Prescritti sessanta milligrammi di lidocaina, disponibile al due per cento. Pausa."),
 (7,"chiaro",0,"Il due per cento corrisponde a venti milligrammi per millilitro. Sessanta diviso venti fa tre millilitri. Visto? Con il trucco, un calcolo che sembrava difficile si fa a mente."),

 (8,"chiaro",2.5,"Un caso frequentissimo: la polvere da ricostituire. Flacone da un grammo da sciogliere in dieci millilitri; prescritti settecentocinquanta milligrammi. Pausa."),
 (8,"chiaro",0,"Dopo la ricostituzione ho mille milligrammi in dieci millilitri, cioe' cento milligrammi per millilitro. Settecentocinquanta diviso cento fa sette virgola cinque millilitri."),
 (8,"chiaro",0,"Attenzione: alcune polveri, sciogliendosi, aumentano il volume finale. Se la scheda tecnica indica un volume finale diverso, si usa quello, non i dieci millilitri del solvente."),

 (9,"chiaro",2.5,"Le unita' internazionali. Eparina venticinquemila unita' in cinquanta millilitri; prescritte mille unita' all'ora. A quanti millilitri all'ora imposti la pompa? Pausa."),
 (9,"chiaro",0,"Prima la concentrazione: venticinquemila diviso cinquanta fa cinquecento unita' per millilitro. Poi: mille diviso cinquecento fa due millilitri all'ora."),
 (9,"chiaro",0,"E' lo schema di tutte le infusioni continue: concentrazione, poi velocita'. Due passaggi, sempre nello stesso ordine, qualunque sia il farmaco."),

 (10,"chiaro",0,"L'insulina, che ha regole sue. La concentrazione standard e' cento unita' per millilitro. Si usano siringhe da insulina graduate direttamente in unita', o le penne: non si converte in millilitri."),
 (10,"chiaro",0,"E un dettaglio di sicurezza: nella prescrizione non si scrive mai U per unita', perche' una U scritta male si legge come uno zero: dieci U diventa cento, dieci volte la dose. Si scrive per esteso: unita'."),

 (11,"chiaro",0,"Quarto strumento: la velocita' di infusione. In millilitri all'ora, per le pompe: volume diviso il tempo in ore. Mille millilitri in otto ore: centoventicinque millilitri all'ora."),
 (11,"chiaro",0,"E attenzione ai minuti: duecentocinquanta millilitri in trenta minuti significa duecentocinquanta in mezz'ora, cioe' cinquecento millilitri all'ora. Il tempo va sempre espresso in ore."),

 (12,"chiaro",0,"Per le infusioni a caduta si contano le gocce al minuto: volume per fattore di gocciolamento, diviso il tempo in minuti. E' l'unico calcolo in cui si usano i minuti: ricordalo, e' la trappola piu' frequente."),
 (12,"chiaro",0,"Il fattore di gocciolamento e' il numero di gocce che formano un millilitro, ed e' scritto sulla confezione del deflussore: il deflussore standard ha venti gocce per millilitro, il microgocciolatore sessanta."),

 (13,"chiaro",2.5,"Esercizio. Mille millilitri in otto ore, deflussore da venti gocce per millilitro. Quante gocce al minuto? Pausa."),
 (13,"chiaro",0,"Otto ore sono quattrocentottanta minuti. Mille per venti fa ventimila gocce totali. Ventimila diviso quattrocentottanta fa quarantuno virgola sei, arrotondato a quarantadue gocce al minuto. Le gocce sono intere, si arrotonda."),

 (14,"chiaro",0,"Due scorciatoie che fanno risparmiare tempo in sede d'esame. Con il microgocciolatore da sessanta gocce, le gocce al minuto sono uguali ai millilitri all'ora: trenta millilitri all'ora sono trenta gocce al minuto."),
 (14,"chiaro",0,"Con il deflussore standard da venti, le gocce al minuto sono i millilitri all'ora divisi per tre: centoventicinque millilitri all'ora diventano circa quarantadue gocce. Rifai l'esercizio precedente cosi', e vedrai che torna."),

 (15,"chiaro",2.5,"Il calcolo per chilo di peso, tipico della pediatria. Paracetamolo quindici milligrammi per chilo a un bambino di dodici chili; sciroppo da centoventi milligrammi in cinque millilitri. Pausa."),
 (15,"chiaro",0,"Dose: quindici per dodici fa centottanta milligrammi. Volume: centottanta diviso centoventi fa uno virgola cinque, per cinque fa sette virgola cinque millilitri. Due passaggi: prima la dose, poi il volume."),

 (16,"chiaro",2.5,"Il calcolo piu' lungo: i microgrammi per chilo per minuto, tipici dell'area critica. Dopamina cinque microgrammi per chilo per minuto, settanta chili, duecento milligrammi in cinquanta millilitri. Pausa."),
 (16,"chiaro",0,"Passo uno, la dose al minuto: cinque per settanta fa trecentocinquanta microgrammi al minuto. Passo due, all'ora: per sessanta fa ventunomila microgrammi, cioe' ventuno milligrammi all'ora."),
 (16,"chiaro",0,"Passo tre, la concentrazione: duecento diviso cinquanta fa quattro milligrammi per millilitro. Passo quattro: ventuno diviso quattro fa cinque virgola venticinque millilitri all'ora."),
 (16,"chiaro",0,"Quattro passi, sempre gli stessi: dose al minuto, dose all'ora, concentrazione, velocita'. Scritti in colonna, il calcolo piu' temuto diventa una lista."),

 (17,"chiaro",0,"La domanda inversa: quanto dura un'infusione? Volume diviso velocita'. Duecentocinquanta millilitri a cinquanta millilitri all'ora durano cinque ore; se e' iniziata alle nove, finisce alle quattordici."),
 (17,"chiaro",0,"Sembra banale, ma nella pratica serve a programmare il cambio della sacca e a evitare che una via resti senza infusione, o che un farmaco finisca prima del previsto."),

 (18,"chiaro",0,"E la regola piu' importante di tutte: il controllo di buon senso. Dopo ogni calcolo chiediti: ha senso? Dieci fiale, o una frazione minuscola di fiala, quasi certamente sono un errore, di unita' o di virgola."),
 (18,"chiaro",0,"Per i farmaci ad alto rischio, e in caso di dubbio, il calcolo va sottoposto a doppio controllo indipendente, come abbiamo visto nella lezione due punto sei. Nessuno si offende se un collega ricontrolla un calcolo."),

 (19,"chiaro",0,"Le cinque formule da portare all'esame. Una: volume uguale prescritto diviso disponibile per volume. Due: percentuale per dieci uguale milligrammi per millilitro. Tre: millilitri all'ora uguale volume diviso ore."),
 (19,"chiaro",0,"Quattro: gocce al minuto uguale volume per fattore diviso minuti. Cinque: per i microgrammi per chilo per minuto, dose al minuto, dose all'ora, concentrazione, velocita'. Questa slide e' da fotografare."),

 (20,"chiaro",0,"Una frase da portare via: prima uniformare le unita', poi calcolare, poi chiedersi se ha senso. Nel riepilogo del modulo troverai venti calcoli cronometrati, per allenarti con il tempo contato come all'esame."),
 (20,"chiaro",0,"[warm] Nella prossima lezione: la somministrazione sicura, le regole delle G, il doppio controllo, gli errori che non si devono fare. A tra poco."),
]

CAPITOLI = {1:"Apertura",2:"Le unita' di misura",3:"La proporzione",4:"Esercizio 1",5:"Esercizio 2: le unita' diverse",
 6:"Le percentuali",7:"Esercizio 3",8:"La ricostituzione",9:"Le unita' internazionali",
 10:"L'insulina",11:"Millilitri all'ora",12:"Le gocce al minuto",13:"Esercizio 4",14:"Le scorciatoie",
 15:"Il calcolo per peso",16:"Microgrammi per chilo per minuto",17:"Il tempo di infusione",18:"Il buon senso",19:"Le cinque formule",20:"Chiusura"}

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
