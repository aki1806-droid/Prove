# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Chiudiamo il modulo dei casi clinici avanzati. Prima riprendiamo le frasi chiave degli undici casi, da usare come ancore, e i fili che li attraversano."),
 (1,"chiaro",0,"Poi sei casi lampo, su situazioni che possono capitare in qualsiasi turno: per ognuno, il ragionamento essenziale. Infine le tracce piu' probabili legate a questo modulo, i calcoli da sapere, e come allenarsi."),

 (2,"chiaro",0,"Le frasi del modulo, come ancore. Ictus, sedici punto uno: l'orologio parte dall'ultima volta in cui stava bene. Emorragia nel cirrotico, sedici punto due: chi vomita sangue e si addormenta rischia prima di soffocare."),
 (2,"chiaro",0,"Iperkaliemia, sedici punto tre: il calcio protegge, ma solo la dialisi porta via il potassio. Embolia, sedici punto quattro: un polpaccio gonfio da un lato non e' da posizione."),
 (2,"chiaro",0,"Clostridioides, sedici punto cinque: con le spore l'alcol non basta, servono acqua e sapone. Politrauma, sedici punto sei: l'ordine delle priorita' salva piu' della velocita'."),
 (2,"chiaro",0,"Ustionato, sedici punto sette: l'orologio parte dalle fiamme, non dalla porta del pronto soccorso. Chetoacidosi, sedici punto otto: l'insulina si sospende per ultima."),
 (2,"chiaro",0,"Nutrizione, sedici punto nove: nutrire piano, e nella posizione giusta. Monossido, sedici punto dieci: il saturimetro non lo legge. Terapia intensiva, sedici punto undici: dietro le macchine c'e' una persona."),

 (3,"chiaro",0,"[thoughtful] I fili che attraversano i casi. Il primo e' il tempo come dato clinico: nell'ictus, nelle ustioni, nel trauma, dove conta anche l'ora dell'acido tranexamico."),
 (3,"chiaro",0,"Il secondo sono i parametri che ingannano: la saturazione nel monossido, l'emoglobina nell'emorragia acuta, il potassio nella chetoacidosi, la pressione nell'ictus."),
 (3,"chiaro",0,"Il terzo: le vie aeree prima di tutto, come nell'ABCDE della lezione dieci punto due. Nel cirrotico che vomita sangue, nell'ustionato con i segni di inalazione, nel paziente ventilato."),
 (3,"chiaro",0,"Il quarto: la prevenzione mancata come radice dell'evento. L'embolia senza profilassi, l'inalazione durante la nutrizione, la rialimentazione troppo rapida, il Clostridioides isolato in ritardo."),
 (3,"chiaro",0,"E il quinto: la persona dietro la malattia. Il cirrotico e il suo rapporto con l'alcol, la ragazza che riceve la diagnosi a diciannove anni, la famiglia fuori dalla porta."),

 (4,"chiaro",0,"[curious] Caso lampo uno. Un ragazzo asmatico di ventidue anni, in pronto soccorso, non riesce a finire una frase e usa i muscoli accessori. Frequenza respiratoria trentaquattro, saturazione novanta."),
 (4,"chiaro",0,"E all'auscultazione, quasi nessun sibilo. Il torace silenzioso non e' un buon segno: passa pochissima aria. E' un attacco grave, vicino all'arresto, come nella lezione otto punto due."),
 (4,"chiaro",0,"Posizione seduta, ossigeno con target, broncodilatatori per aerosol ripetuti e corticosteroide secondo prescrizione; eventualmente il magnesio endovena. Monitoraggio, ed emogas."),
 (4,"chiaro",0,"Un asmatico che smette di sibilare puo' stare peggiorando. E i segni di esaurimento, cioe' sonnolenza, bradicardia, anidride carbonica che sale, richiedono subito il rianimatore."),

 (5,"chiaro",0,"Caso lampo due. Una signora di ottantotto anni, che vive sola, viene trovata a terra in casa al mattino, d'inverno, dopo una caduta notturna. Temperatura trentuno gradi, bradicardica, confusa."),
 (5,"chiaro",0,"E in terapia anticoagulante. E' un'ipotermia moderata: la si manovra con delicatezza, perche' il cuore freddo va facilmente in fibrillazione ventricolare, e la si riscalda in modo graduale."),
 (5,"chiaro",0,"Coperte, e liquidi caldi secondo prescrizione. La lunga permanenza a terra fa pensare alla rabdomiolisi: urine scure, enzimi muscolari, funzione renale."),
 (5,"chiaro",0,"Con l'anticoagulante, il trauma cranico richiede una TC. Si cercano le lesioni da pressione. E alla fine, la domanda di sempre, quella della lezione quindici punto sette: perche' e' caduta?"),

 (6,"chiaro",0,"Caso lampo tre. Un'ora dopo un catetere venoso centrale in succlavia: dolore toracico e dispnea, saturazione da novantasette a novanta, murmure ridotto dallo stesso lato. Sospetto pneumotorace da procedura."),
 (6,"chiaro",0,"Ossigeno, posizione semiseduta, avviso immediato al medico e radiografia del torace, preparando il materiale per un eventuale drenaggio. E l'evento si segnala."),
 (6,"chiaro",0,"E una regola, della lezione sei punto due: il catetere centrale non si usa finche' il corretto posizionamento non e' confermato. Dopo la succlavia, la radiografia esclude anche lo pneumotorace."),

 (7,"chiaro",0,"Caso lampo quattro. Una signora di ottanta anni, in terapia con un diuretico tiazidico, e' ricoverata per confusione e cadute. Ha un sodio di centodiciotto, e nella notte una crisi convulsiva."),
 (7,"chiaro",0,"E' un'iponatriemia grave e sintomatica. Sicurezza, gestione della crisi, avviso al medico. La correzione avviene secondo prescrizione, spesso con soluzione salina ipertonica in piccole dosi."),
 (7,"chiaro",0,"Con controlli ravvicinati del sodio. Perche' la correzione troppo rapida puo' causare un danno neurologico grave, la sindrome da demielinizzazione osmotica, della lezione tre punto cinque."),
 (7,"chiaro",0,"Poi bilancio idrico e diuresi, e la revisione dei farmaci che abbassano il sodio, come alcuni diuretici e antidepressivi: proprio come il tiazidico che la signora assumeva."),

 (8,"chiaro",0,"Caso lampo cinque. Un paziente con un PICC al braccio destro da tre settimane presenta edema e dolore del braccio, vene superficiali evidenti, e una circonferenza aumentata di tre centimetri."),
 (8,"chiaro",0,"E' una sospetta trombosi venosa associata al catetere. Si segnala, senza rimuovere ne' usare il catetere di propria iniziativa, e si esegue un'ecografia."),
 (8,"chiaro",0,"L'anticoagulazione e' su prescrizione, e la decisione sulla rimozione e' medica. Ecco perche' la misurazione della circonferenza del braccio e' parte della sorveglianza del PICC."),

 (9,"chiaro",0,"Caso lampo sei. Un uomo di settantasei anni in terapia anticoagulante e' scivolato in casa e ha battuto la testa. Ora sta bene, e vuole tornare a casa."),
 (9,"chiaro",0,"Un trauma cranico minore, in un paziente anticoagulato, espone a un'emorragia intracranica, anche tardiva: lo stesso rischio della signora Elena, nella lezione quindici punto sette."),
 (9,"chiaro",0,"Si segue il protocollo, che di solito prevede la valutazione medica e la TC, con una sorveglianza neurologica: GCS, pupille, cefalea, vomito, sonnolenza. L'anticoagulante, secondo indicazione."),
 (9,"chiaro",0,"E alla dimissione si danno istruzioni scritte sui segni d'allarme, verificando che un adulto resti con lui nelle ore successive."),

 (10,"chiaro",0,"Le tracce piu' probabili legate a questo modulo. Il sospetto ictus in reparto. L'emorragia digestiva. L'iperkaliemia nel dializzato. L'embolia polmonare in medicina. Il paziente con Clostridioides."),
 (10,"chiaro",0,"Il politrauma, con l'XABCDE. Il grande ustionato, con il calcolo di Parkland. La chetoacidosi. La nutrizione enterale e l'inalazione. Il monossido. Il paziente ventilato, con DOPE e la VAP."),
 (10,"chiaro",0,"Per ognuna di queste tracce hai ora un caso svolto, con lo scenario, le priorita', la risposta modello in quindici righe e tre domande d'orale."),

 (11,"chiaro",0,"I calcoli da sapere a memoria. Parkland: quattro millilitri, per chilo, per percentuale di ustione di secondo e terzo grado, in ventiquattro ore. Per ottanta chili e il trenta per cento, novemilaseicento millilitri."),
 (11,"chiaro",0,"Meta' nelle prime otto ore, contate dal momento dell'ustione: e' la trappola sugli orari della sedici punto sette. E la diuresi obiettivo: mezzo millilitro per chilo all'ora, circa quaranta all'ora per ottanta chili."),
 (11,"chiaro",0,"La velocita' di infusione: dose oraria diviso concentrazione. Il Padua, sviluppato proprio a Padova, con la soglia di quattro per l'alto rischio. La regola del nove, per l'estensione dell'ustione."),
 (11,"chiaro",0,"La GCS, da tre a quindici. E la regola del quindici per l'ipoglicemia: quindici grammi di zuccheri semplici, e un nuovo controllo dopo quindici minuti."),

 (12,"chiaro",0,"Come allenarsi con questo modulo. Una traccia al giorno, alternando i casi del modulo quindici e del sedici. Per i casi con i calcoli, rifare il calcolo senza guardare."),
 (12,"chiaro",0,"Per i casi con una trappola, il potassio, la saturazione, gli orari, scriverla in una riga. Nel quaderno dei casi, aggiungere undici pagine e i sei casi lampo."),
 (12,"chiaro",0,"E ripetere ad alta voce le risposte alle domande d'orale: tre per ogni caso, trentatre' in tutto il modulo, in due o tre minuti ciascuna."),

 (13,"profondo",1.2,"[serious] La frase del modulo: nei casi complessi, la competenza e' sapere quale dato non credere."),
 (13,"chiaro",0,"Una saturazione perfetta, un'emoglobina normale, un potassio nei limiti: ognuno di questi casi ci ha insegnato a guardare oltre il numero."),

 (14,"chiaro",0,"[warm] Nel prossimo modulo cambiamo scenario: la gravidanza e il parto, il bambino, la salute mentale, le cure palliative a domicilio, il territorio veneto e i temi di responsabilita' professionale."),
 (14,"chiaro",0,"Si apre con la preeclampsia grave, che nel modulo quindici era un caso lampo e qui diventa un caso intero. Altri dodici casi, con lo stesso metodo. Ci vediamo li'."),
]
CAPITOLI = {1:"Apertura",2:"Le frasi del modulo 16",3:"I fili che attraversano i casi",
 4:"Caso lampo 1: la crisi asmatica grave",5:"Caso lampo 2: l'anziana trovata a terra",6:"Caso lampo 3: la dispnea dopo un CVC",
 7:"Caso lampo 4: l'iponatriemia",8:"Caso lampo 5: il braccio gonfio con il PICC",9:"Caso lampo 6: il trauma cranico in anticoagulante",
 10:"Le tracce piu' probabili del modulo",11:"I calcoli da sapere a memoria",12:"Come allenarsi",
 13:"La frase del modulo",14:"Chiusura"}

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
