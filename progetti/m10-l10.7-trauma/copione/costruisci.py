# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Quattro scenari dell'emergenza, ciascuno con un elemento che i concorsi chiedono sempre. Nel trauma, l'emorragia e il rachide. Nelle ustioni, la regola del nove e la formula di Parkland."),
 (1,"chiaro",0,"Nelle intossicazioni, gli antidoti. Nelle maxi-emergenze, il triage START. Una lezione densa, che pero' si regge sempre sull'ABCDE."),

 (2,"chiaro",0,"Il trauma si affronta con l'ABCDE, con due modifiche. Davanti alla A si aggiunge una X: l'emorragia esterna massiva, che uccide piu' in fretta di un problema delle vie aeree. Si controlla per prima."),
 (2,"chiaro",0,"E la A si accompagna alla protezione del rachide cervicale, dal primo contatto finche' una lesione non e' esclusa. Poi B, C, D, E, e la valutazione secondaria."),
 (2,"chiaro",0,"Il tempo conta: si parla di golden hour, la prima ora dopo il trauma, e il paziente grave va centralizzato verso il centro traumatologico, come nella lezione dieci punto uno."),

 (3,"chiaro",0,"Il controllo dell'emorragia. Prima la compressione diretta della ferita, forte e continua. Poi, se previsto dal protocollo, le medicazioni emostatiche."),
 (3,"chiaro",0,"Per le emorragie degli arti non controllabili, il tourniquet: si posiziona a monte della ferita, e si stringe fino all'arresto del sanguinamento."),
 (3,"chiaro",0,"Si annota l'orario di applicazione, un'informazione vitale per chi riceve il paziente. E non si allenta per controllare: ogni allentamento fa perdere sangue, e libera in circolo sostanze tossiche accumulate a valle."),

 (4,"chiaro",0,"L'immobilizzazione. Si sospetta una lesione del rachide in ogni trauma importante, nel paziente incosciente, con dolore al collo o deficit neurologici."),
 (4,"chiaro",0,"Capo stabilizzato a mano, in asse; collare cervicale; tavola spinale o materasso a depressione. E si muove il paziente in blocco, con il log roll, coordinato da chi tiene la testa."),
 (4,"chiaro",0,"Perche' una lesione instabile del rachide, mobilizzata male, puo' diventare una lesione midollare: un danno che il trauma non aveva fatto, e che fa il soccorso."),

 (5,"chiaro",0,"Le ustioni, partendo dalla profondita'. Superficiale, di primo grado: eritema e dolore, come una scottatura solare. A spessore parziale, di secondo grado: flittene e dolore intenso."),
 (5,"chiaro",0,"A spessore totale, di terzo grado: cute bianca, cerea o carbonizzata, rigida. E, dettaglio che i quiz amano, indolore: le terminazioni nervose sono distrutte."),
 (5,"profondo",1.2,"[serious] Un'ustione che non fa male puo' essere la piu' grave."),

 (6,"chiaro",0,"L'estensione si stima con la regola del nove, di Wallace: il corpo diviso in aree che valgono nove, o multipli di nove. Testa e collo: nove per cento. Ciascun arto superiore: nove."),
 (6,"chiaro",0,"Tronco anteriore: diciotto. Tronco posteriore: diciotto. Ciascun arto inferiore: diciotto. Perineo: uno. In totale, cento."),
 (6,"chiaro",0,"Per ustioni piccole o irregolari, il palmo della mano della persona, dita comprese: circa l'uno per cento. Nel bambino, tabelle specifiche. E si contano solo secondo e terzo grado."),

 (7,"chiaro",0,"La formula di Parkland, per i liquidi delle prime ventiquattro ore nelle ustioni estese: quattro millilitri, per il peso in chili, per la percentuale ustionata. Cristalloidi, tipicamente Ringer lattato."),
 (7,"chiaro",0,"Meta' nelle prime otto ore, contate dal momento dell'ustione, non dall'arrivo in ospedale. L'altra meta' nelle sedici ore successive."),
 (7,"chiaro",0,"L'obiettivo e' una diuresi adeguata: indicativamente mezzo millilitro per chilo all'ora, nell'adulto. La formula e' il punto di partenza; la diuresi dice se basta."),
 (7,"chiaro",0,"Un esempio. Settanta chili, trenta per cento ustionato: quattro per settanta per trenta fa ottomilaquattrocento millilitri. Quattromiladuecento nelle prime otto ore."),

 (8,"chiaro",0,"Il primo soccorso: acqua corrente tiepida per circa venti minuti, mai ghiaccio. Via anelli e indumenti non adesi prima dell'edema, copertura pulita, e prevenzione dell'ipotermia."),
 (8,"chiaro",0,"E l'ustione delle vie aeree: volto ustionato, peli del naso bruciati, fuliggine in bocca, voce rauca, stridore. Le vie aeree si gonfiano in poco tempo: si valuta un'intubazione precoce."),
 (8,"chiaro",0,"In un incendio in ambiente chiuso si pensa anche al monossido, che come sappiamo dalla lezione otto punto due da' una saturazione falsamente normale."),

 (9,"chiaro",0,"Le intossicazioni. Prima, come sempre, l'ABCDE. Poi le informazioni: quale sostanza, quanta, a che ora, per quale via. Si conservano contenitori e campioni."),
 (9,"chiaro",0,"Si contatta il Centro Antiveleni, che da' le indicazioni specifiche. Decontaminazione secondo indicazione. E l'antidoto, quando esiste: non sempre c'e', e allora contano il supporto delle funzioni vitali e il tempo."),

 (10,"chiaro",0,"Gli antidoti. Oppioidi: naloxone. Benzodiazepine: flumazenil, con cautela, perche' nei consumatori cronici puo' scatenare convulsioni. Paracetamolo: N-acetilcisteina, prima e' meglio."),
 (10,"chiaro",0,"Monossido di carbonio: ossigeno al cento per cento, ed eventualmente la camera iperbarica. Anticoagulanti dicumarolici: vitamina K. Organofosfati, come alcuni pesticidi: atropina."),
 (10,"chiaro",0,"Digossina: anticorpi specifici. Beta-bloccanti: glucagone. Metanolo e glicole etilenico: fomepizolo. Una tabella da ripassare: all'orale si chiede spesso la coppia veleno e antidoto."),

 (11,"chiaro",0,"L'ipotermia, sotto i trentacinque gradi centrali: riscaldare gradualmente, muovere con delicatezza, perche' il cuore freddo fibrilla facilmente. E nell'arresto si insiste: nessuno e' morto finche' non e' caldo e morto."),
 (11,"chiaro",0,"Il colpo di calore non e' un semplice malore da caldo: e' ipertermia con alterazione neurologica, e richiede un raffreddamento rapido. A rischio gli anziani e i lavoratori esposti."),

 (12,"chiaro",0,"Le maxi-emergenze: piu' vittime di quante la risposta ordinaria possa gestire. Ogni ospedale ha un PEIMAF, il piano per il massiccio afflusso di feriti: catena di comando, ruoli, aree dedicate."),
 (12,"chiaro",0,"E cambia il principio. Non si fa tutto il possibile per ciascuno: si cerca il risultato migliore per il numero piu' grande di persone."),
 (12,"profondo",1.2,"[serious] Il maggior beneficio, per il maggior numero."),

 (13,"chiaro",0,"Il triage START, Simple Triage And Rapid Treatment: classifica una vittima in meno di un minuto, con quattro domande. Cammina? Allora e' verde."),
 (13,"chiaro",0,"Se non cammina: respira? Se non respira nemmeno dopo l'apertura delle vie aeree, e' nero. Se riprende a respirare dopo l'apertura, e' rosso."),
 (13,"chiaro",0,"Se respira con una frequenza oltre trenta, rosso. Riempimento capillare oltre due secondi, o polso radiale assente: rosso. Se non esegue ordini semplici: rosso. Altrimenti, giallo."),
 (13,"chiaro",0,"Un modo per ricordarlo, in inglese: trenta, due, can do. Respiro, riempimento, ordini eseguiti."),

 (14,"chiaro",0,"I colori. Rosso: priorita' immediata. Giallo: differibile. Verde: lesioni minori, chi cammina. Nero: deceduto, o non salvabile con le risorse di quel momento."),
 (14,"chiaro",0,"Durante lo START si fanno solo manovre salvavita rapide, come aprire le vie aeree o fermare un'emorragia, e si passa alla vittima successiva. E il triage si ripete, perche' le condizioni cambiano."),

 (15,"chiaro",0,"Il caso. Maxi-emergenza: un uomo non cammina, respira a trentaquattro, riempimento capillare tre secondi, risponde alle domande. Che colore?"),
 (15,"chiaro",0,"Non cammina, quindi non e' verde. Respira, ma oltre trenta: rosso. E ci si ferma qui: il ragionamento e' sequenziale, e basta il primo criterio soddisfatto. Il riempimento lento, qui, non cambia nulla."),

 (16,"chiaro",0,"In Veneto il trauma grave e' gestito da una rete di centri hub e spoke. Ogni ospedale ha il suo PEIMAF, con esercitazioni periodiche."),
 (16,"chiaro",0,"E ci sono centri antiveleni e centri ustioni specializzati, coordinati con il SUEM centodiciotto. All'orale, per trauma e maxi-emergenze, la parola chiave e' ancora una volta: rete."),

 (17,"chiaro",0,"La tabella. XABCDE: prima l'emorragia massiva. Tourniquet: annotare l'ora, non allentare. Rachide: collare e movimento in blocco. Il terzo grado e' indolore."),
 (17,"chiaro",0,"Regola del nove, palmo uguale uno per cento. Parkland: quattro per chili per percentuale, meta' in otto ore dall'ustione. Acqua tiepida, niente ghiaccio. START: trenta, due, can do."),

 (18,"chiaro",0,"[warm] Nella prossima lezione ricomponiamo il modulo dieci con gli algoritmi da memorizzare: ABCDE, rianimazione, sepsi, START."),
 (18,"chiaro",0,"E' il modulo in cui sapere la sequenza a memoria fa davvero la differenza, all'esame e in reparto. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"Il trauma: l'approccio",3:"Il controllo dell'emorragia",4:"L'immobilizzazione",5:"Le ustioni: la profondita'",6:"La regola del nove",
 7:"La formula di Parkland",8:"Primo soccorso e vie aeree",9:"Le intossicazioni",10:"Gli antidoti",11:"Ipotermia e colpo di calore",12:"Le maxi-emergenze",
 13:"Il triage START",14:"I colori",15:"Il caso",16:"In Veneto",17:"La tabella",18:"Chiusura"}

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
