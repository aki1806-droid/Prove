# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] L'errore in terapia e' uno degli eventi avversi piu' frequenti in sanita', e la somministrazione e' l'ultimo anello della catena: dopo, non c'e' piu' nessuno che possa intercettarlo."),
 (1,"profondo",1.2,"[serious] Per questo l'infermiere e' l'ultima barriera. Questa lezione mette insieme rischio clinico, documentazione e responsabilita', e li applica al gesto piu' frequente della giornata."),

 (2,"chiaro",0,"Il processo di gestione della terapia ha piu' fasi: prescrizione, trascrizione, che la scheda unica di terapia tende a eliminare, approvvigionamento e conservazione, preparazione."),
 (2,"chiaro",0,"Poi distribuzione, somministrazione e monitoraggio degli effetti. L'errore puo' nascere in ciascuna. Ma solo alcune sono in mano all'infermiere, e la somministrazione e' la sua."),

 (3,"chiaro",0,"Le regole delle sette G, che trovi in quasi tutti i quiz. Giusto farmaco. Giusta dose. Giusta via. Giusto orario."),
 (3,"chiaro",0,"Giusto paziente. Giusta registrazione. Giusto controllo, cioe' il monitoraggio degli effetti. Sette, e in quest'ordine le ricordi meglio."),
 (3,"chiaro",0,"Alcuni testi ne aggiungono altre, la giusta informazione al paziente, la giusta preparazione, il diritto al rifiuto, ma le sette di base sono queste. Se in un quiz trovi un elenco incompleto, cerca quella che manca."),

 (4,"chiaro",0,"Accanto alle sette G, la regola dei tre controlli: si confronta il farmaco con la prescrizione quando lo si preleva dall'armadio, durante la preparazione, e al letto del paziente, prima di somministrarlo."),
 (4,"chiaro",0,"Il terzo e' il piu' importante, perche' e' l'unico fatto davanti alla persona e al suo braccialetto. Gli altri due si fanno in una stanza; questo si fa con il paziente."),

 (5,"chiaro",0,"Il giusto paziente, che e' la G piu' violata. L'identificazione deve essere attiva: si chiede alla persona di dire nome, cognome e data di nascita."),
 (5,"chiaro",0,"Non si chiede lei e' il signor Rossi?, perche' una persona confusa o ipoacusica risponde si'. Si usano almeno due identificativi e si confrontano con il braccialetto e con la prescrizione."),
 (5,"profondo",1.2,"[serious] E il numero di letto non e' mai un identificativo: i pazienti si spostano."),

 (6,"chiaro",0,"La prescrizione, come abbiamo visto nella lezione due punto quattro, deve essere scritta, leggibile, completa e firmata. Quelle verbali si limitano all'urgenza, con read-back e convalida scritta."),
 (6,"chiaro",0,"E se la prescrizione e' incompleta o dubbia, la risposta e' sempre la stessa del modulo uno: si chiede chiarimento, e se il dubbio permane non si procede e si documenta. L'infermiere non interpreta una prescrizione."),

 (7,"chiaro",0,"Le abbreviazioni pericolose, che i quiz chiedono sempre piu' spesso. Mai U per unita': si scrive per esteso. Mai lo zero dopo la virgola: cinque virgola zero milligrammi puo' essere letto cinquanta."),
 (7,"chiaro",0,"Sempre lo zero prima della virgola: zero virgola cinque, non virgola cinque, che si legge cinque. Il simbolo dei microgrammi si confonde con mg: meglio mcg. Errori di dieci, cento, mille volte nascono da un segno."),

 (8,"chiaro",0,"Una regola organizzativa con un fondamento di responsabilita': chi prepara, somministra e registra. Non si somministrano farmaci preparati da altri, perche' non si puo' garantire cio' che non si e' controllato."),
 (8,"chiaro",0,"Ogni preparazione endovenosa va etichettata, paziente, farmaco, dose, orario, operatore, e non si prepara con largo anticipo. Una siringa senza etichetta e' una siringa sconosciuta."),

 (9,"chiaro",0,"Un fattore di rischio molto studiato: le interruzioni. Ogni interruzione durante la preparazione aumenta la probabilita' di errore. Le strategie adottate in molti ospedali: una zona di preparazione dedicata."),
 (9,"chiaro",0,"Una segnalazione visiva, come la pettorina che indica non disturbare, sto preparando la terapia, e regole condivise nel gruppo. E' un esempio perfetto di intervento sul sistema, secondo la logica di Reason."),

 (10,"chiaro",0,"I farmaci ad alto rischio, o high alert: quelli che, in caso di errore, causano piu' facilmente danni gravi. Anticoagulanti, insuline, oppioidi, potassio e soluzioni elettrolitiche concentrate."),
 (10,"chiaro",0,"Chemioterapici, agonisti adrenergici come adrenalina e noradrenalina, sedativi endovenosi, bloccanti neuromuscolari, digossina. Nove classi, da saper riconoscere a colpo d'occhio."),
 (10,"chiaro",0,"Per questi valgono misure rinforzate: conservazione separata, etichettatura, doppio controllo indipendente, pompe infusionali. Indipendente: ciascuno calcola per conto proprio."),

 (11,"chiaro",0,"Le Raccomandazioni ministeriali sulla terapia, che conviene saper citare per numero. La uno, sul potassio concentrato. La sette, madre di tutte, sulla prevenzione di morte, coma o grave danno da errori in terapia."),
 (11,"chiaro",0,"La dodici, sui farmaci LASA. La quattordici, sugli errori con i farmaci antineoplastici. La diciassette, sulla riconciliazione. La diciannove, sulla manipolazione delle forme orali solide."),

 (12,"chiaro",0,"I farmaci LASA, look-alike, sound-alike: simili per confezione o per nome. Due flaconi quasi identici, due nomi che si pronunciano quasi uguali."),
 (12,"chiaro",0,"Le misure: conservazione separata, etichette di allerta, le lettere maiuscole differenziali, DOPamina e DOBUTamina con le lettere diverse in maiuscolo, la lettura ad alta voce del nome e il read-back."),

 (13,"chiaro",0,"La Raccomandazione diciassette introduce due parole. La ricognizione: la raccolta completa della terapia che la persona assume a casa, compresi integratori, prodotti erboristici e farmaci da banco, che spesso nessuno chiede."),
 (13,"chiaro",0,"La riconciliazione: il confronto fra quella terapia e quella prescritta, a ogni passaggio di setting, ingresso, trasferimento, dimissione, per individuare omissioni, duplicazioni e interazioni."),
 (13,"chiaro",0,"L'infermiere partecipa soprattutto alla ricognizione, perche' e' lui a raccogliere l'anamnesi. Una domanda in piu' all'ingresso, prende qualcosa senza ricetta?, vale un'interazione evitata."),

 (14,"chiaro",0,"Che cosa si fa quando si scopre un errore in terapia? Uno: si valuta il paziente, parametri, sintomi, e lo si mette in sicurezza. Due: si avvisa subito il medico."),
 (14,"chiaro",0,"Tre: si attuano gli interventi prescritti, compreso l'eventuale antidoto. Quattro: si informa la persona, con la trasparenza vista nella lezione due punto sei."),
 (14,"chiaro",0,"Cinque: si documenta in cartella cio' che e' accaduto, in modo oggettivo e senza giudizi. Sei: si segnala con l'incident reporting, che e' cosa diversa dalla registrazione in cartella."),

 (15,"chiaro",0,"E che cosa non si fa mai. Non si nasconde l'errore. Non si modifica la documentazione: sarebbe falso in atto pubblico, come nella lezione due punto quattro."),
 (15,"chiaro",0,"Non si aspetta per vedere se succede qualcosa: il tempo e' spesso cio' che fa la differenza fra un errore senza conseguenze e un danno. E non si attribuisce l'errore ad altri senza verifica."),
 (15,"profondo",1.2,"[serious] La responsabilita' piu' grave, quasi sempre, non nasce dall'errore ma da cio' che si fa dopo."),

 (16,"chiaro",0,"Il rifiuto della terapia. La persona capace ha il diritto di rifiutare, come stabilisce la legge duecentodiciannove. L'infermiere esplora i motivi: spesso effetti collaterali, paura, incomprensione, difficolta' a deglutire."),
 (16,"chiaro",0,"Informa sulle conseguenze, non somministra di nascosto, avvisa il medico e documenta il rifiuto e l'informazione data."),
 (16,"chiaro",0,"Somministrare un farmaco nascosto nel cibo a una persona capace che l'ha rifiutato e' una violazione della sua liberta'. Per la persona non capace, decide un percorso definito con il medico e chi la rappresenta."),

 (17,"chiaro",0,"Un aggancio al modulo uno. L'OSS puo' aiutare la persona nell'assunzione della terapia orale gia' preparata, su attribuzione dell'infermiere e secondo la procedura aziendale."),
 (17,"chiaro",0,"Ma la preparazione, la verifica delle sette G e la responsabilita' della somministrazione restano infermieristiche. Attribuire non significa delegare la responsabilita'. E l'OSS non prepara, non controlla, non registra."),

 (18,"chiaro",0,"Il caso. Alle otto somministri la terapia al paziente del letto dodici; alle otto e un quarto ti accorgi che era quella del letto quattordici. Che cosa fai?"),
 (18,"chiaro",0,"Valuti subito il paziente del letto dodici, parametri, coscienza, sintomi, considerando quali farmaci ha ricevuto. Avvisi il medico con una comunicazione SBAR. Attui gli interventi prescritti."),
 (18,"chiaro",0,"Ricordi che anche il paziente del letto quattordici non ha ricevuto la sua terapia. Informi la persona. Documenti in cartella. Segnali con l'incident reporting. E poi ti chiedi, con il gruppo, perche' e' successo."),

 (19,"chiaro",0,"Nelle aziende venete la terapia e' gestita con la scheda unica di terapia informatizzata, che elimina la trascrizione. Esistono procedure aziendali su farmaci ad alto rischio, LASA, ricognizione e riconciliazione."),
 (19,"chiaro",0,"E in molte realta' l'identificazione avviene con braccialetto, o con codice a barre letto al letto, che chiude il cerchio fra prescrizione, farmaco e persona. Il sistema aiuta, ma il terzo controllo resta tuo."),

 (20,"chiaro",0,"Ricapitoliamo. Le sette G. I tre controlli, l'ultimo al letto. Identificazione attiva con due identificativi. Niente U, niente zero dopo la virgola. Chi prepara somministra. Per i farmaci ad alto rischio, doppio controllo."),
 (20,"chiaro",0,"[warm] Le Raccomandazioni uno, sette, dodici, quattordici, diciassette, diciannove. Davanti a un errore: valutare, avvisare, informare, documentare, segnalare. Mai nascondere. Prossima lezione: le classi di farmaci."),
]

CAPITOLI = {1:"Apertura",2:"Le fasi del processo",3:"Le sette G",4:"I tre controlli",5:"Il giusto paziente",
 6:"La prescrizione",7:"Le abbreviazioni pericolose",8:"Chi prepara somministra",9:"Le interruzioni",
 10:"I farmaci ad alto rischio",11:"Le Raccomandazioni",12:"I farmaci LASA",13:"La riconciliazione",14:"Quando si scopre un errore",
 15:"Che cosa non si fa mai",16:"Il rifiuto della terapia",17:"L'OSS",18:"Il caso d'esame",19:"In Veneto",20:"Chiusura"}

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
