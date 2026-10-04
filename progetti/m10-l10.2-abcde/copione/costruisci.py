# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Davanti a un paziente che sta male, la tentazione e' cercare subito la diagnosi. L'approccio ABCDE fa il contrario: prima si cercano e si trattano i problemi che uccidono piu' in fretta, nell'ordine in cui uccidono."),
 (1,"chiaro",0,"Funziona per qualunque paziente critico, in qualunque contesto, e ti da' una struttura quando l'ansia rischia di toglierla. E' probabilmente lo strumento piu' utile di tutto il corso, e il piu' chiesto all'orale."),

 (2,"chiaro",0,"Cinque lettere. A, airway, le vie aeree. B, breathing, il respiro. C, circulation, il circolo. D, disability, lo stato neurologico. E, exposure, l'esposizione."),
 (2,"chiaro",0,"E una regola che fa la differenza: tratta cio' che trovi prima di passare al punto successivo."),
 (2,"profondo",1.2,"[serious] Tratta cio' che trovi, prima di passare oltre."),
 (2,"chiaro",0,"Se le vie aeree sono ostruite, non si misura la pressione: si liberano le vie aeree. Dopo ogni intervento si rivaluta. E si chiama aiuto presto, non quando si e' finito."),

 (3,"chiaro",0,"A, le vie aeree. La prima domanda e' semplice: il paziente parla? Se risponde normalmente, le vie aeree sono pervie, e in quel momento anche il cervello riceve ossigeno."),
 (3,"chiaro",0,"I segni di ostruzione: rumori come russamento, gorgoglio, che indica liquidi, stridore, che indica un'ostruzione alta, rientramenti, movimento paradosso di torace e addome."),
 (3,"chiaro",0,"Gli interventi: aprire le vie aeree con iperestensione del capo e sollevamento del mento; nel trauma, sublussazione della mandibola, per non muovere il rachide."),
 (3,"chiaro",0,"Aspirare, inserire una cannula, posizione laterale, ossigeno, e chiamare un aiuto esperto. Un'ostruzione delle vie aeree uccide in pochi minuti: per questo viene prima di tutto."),

 (4,"chiaro",0,"B, il respiro. La frequenza respiratoria e' il parametro piu' sensibile di deterioramento, e il piu' dimenticato: va contata per un minuto, non stimata."),
 (4,"chiaro",0,"Poi la saturazione. Il lavoro respiratorio: muscoli accessori, rientramenti, capacita' di parlare in frasi complete. La simmetria del torace e l'auscultazione. Il colorito."),
 (4,"chiaro",0,"Gli interventi: posizione seduta, ossigeno secondo il target della lezione otto punto due, broncodilatatori, e se serve ventilazione assistita."),
 (4,"chiaro",0,"Un paziente che non riesce a finire una frase senza fermarsi a respirare ti sta dicendo quanto e' grave, prima ancora del saturimetro."),

 (5,"chiaro",0,"C, il circolo. Frequenza cardiaca e ritmo. Pressione. Riempimento capillare: si preme sul polpastrello o sullo sterno per cinque secondi e si conta quanto tempo serve perche' il colore ritorni."),
 (5,"chiaro",0,"Normale sotto i due secondi. Colorito e temperatura della cute: una cute fredda e marezzata e' un circolo che si sta chiudendo. Emorragie visibili. Diuresi. Giugulari."),
 (5,"chiaro",0,"Gli interventi: due accessi venosi di buon calibro, prelievi, liquidi secondo prescrizione, controllo delle emorragie con la compressione, ECG e monitoraggio continuo."),

 (6,"chiaro",0,"D, lo stato neurologico. Una valutazione rapida con AVPU: il paziente e' Alert, sveglio; risponde alla Voice, alla voce; risponde solo al Pain, al dolore; oppure e' Unresponsive, non risponde."),
 (6,"chiaro",0,"Oppure la GCS della lezione due punto tre. Le pupille. E la glicemia, sempre: un'ipoglicemia puo' simulare qualsiasi quadro neurologico e si corregge in un minuto."),
 (6,"chiaro",0,"Poi segni di lato, dolore, e i farmaci che possono alterare la coscienza, come oppioidi e sedativi: un paziente sonnolento con le pupille a punta di spillo fa pensare subito all'oppioide."),

 (7,"chiaro",0,"E, l'esposizione. Si scopre il paziente per esaminarlo completamente, nel rispetto della dignita': si cercano emorragie nascoste, lesioni, eruzioni cutanee."),
 (7,"chiaro",0,"Una porpora che non sbianca alla pressione puo' indicare una meningite. Edemi, segni di trauma, accessi, drenaggi. Si misura la temperatura."),
 (7,"chiaro",0,"E poi si ricopre, perche' il paziente critico perde calore rapidamente e l'ipotermia peggiora tutto: la coagulazione, il ritmo cardiaco, la risposta ai farmaci."),

 (8,"chiaro",0,"Solo dopo aver stabilizzato le funzioni vitali con l'ABCDE si passa alla valutazione secondaria: un esame testa-piedi e un'anamnesi rapida."),
 (8,"chiaro",0,"Con lo schema AMPIA: Allergie, Medicamenti, Patologie, ultimo Introito di cibo, Ambiente ed evento. In inglese, SAMPLE. Poi documentazione e consegna SBAR, con i valori e l'ora di ogni rilievo."),

 (9,"chiaro",0,"In reparto, il deterioramento si intercetta prima con i punteggi di allerta precoce, come la NEWS2 della lezione due punto tre."),
 (9,"chiaro",0,"Somma punteggi per sette elementi: frequenza respiratoria, saturazione, con una scala dedicata per i pazienti ipercapnici, ossigenoterapia, pressione sistolica, frequenza cardiaca."),
 (9,"chiaro",0,"Coscienza, compresa la confusione di nuova insorgenza, e temperatura. Sette numeri che si misurano in due minuti al letto, senza nessuno strumento speciale."),
 (9,"chiaro",0,"Da zero a quattro il rischio e' basso, ma un tre in un singolo parametro richiede una valutazione urgente; cinque-sei rischio medio, risposta urgente; da sette in su rischio alto, risposta d'emergenza."),

 (10,"chiaro",0,"Al punteggio corrisponde una risposta. In molti ospedali esistono team di risposta rapida, chiamati MET o RRT, che si attivano con criteri definiti."),
 (10,"chiaro",0,"Un punteggio di allerta elevato, un singolo parametro critico, e in molti sistemi anche la semplice preoccupazione dell'infermiere, anche se i numeri sembrano accettabili."),
 (10,"chiaro",0,"Il loro scopo e' intervenire prima dell'arresto: la maggior parte degli arresti cardiaci in reparto e' preceduta da ore di segni di deterioramento, scritti in cartella e non letti insieme."),

 (11,"chiaro",0,"Il monitoraggio multiparametrico: ECG, saturazione, pressione, frequenza respiratoria, temperatura, capnografia. Gli allarmi vanno impostati su soglie adatte al paziente e mai disattivati."),
 (11,"chiaro",0,"E un fenomeno da conoscere: l'alarm fatigue. Quando i monitor suonano continuamente per motivi irrilevanti, gli operatori si abituano e finiscono per ignorare anche gli allarmi veri."),
 (11,"chiaro",0,"La soluzione non e' silenziare, ma personalizzare le soglie e verificare sempre il paziente, non solo lo schermo: un saturimetro staccato e un arresto respiratorio suonano allo stesso modo."),

 (12,"chiaro",0,"Il caso, da affrontare con l'ABCDE. Paziente con polmonite, alle tre di notte: frequenza respiratoria ventotto, saturazione novanta, frequenza cardiaca centoquindici, pressione sistolica novantacinque."),
 (12,"chiaro",0,"Confuso, mentre prima era orientato, febbre a trentotto e sei. A: parla, ma confuso, vie aeree pervie. B: tachipnea e desaturazione: ossigeno secondo target, posizione seduta."),
 (12,"chiaro",0,"C: tachicardia e pressione bassa: accessi venosi, prelievi, lattati, emocolture. D: confusione nuova, glicemia. E: febbre."),
 (12,"chiaro",0,"La NEWS2 e' alta: attivazione del team o del medico in emergenza. E' un quadro di possibile sepsi, che vedremo nella lezione dieci punto sei."),

 (13,"chiaro",0,"L'errore da evitare, in quattro frasi che si sentono nei reparti. «Il paziente e' sempre stato cosi'». «Aspettiamo il giro del mattino». Abituarsi a un parametro alterato, perche' e' alterato da ieri."),
 (13,"chiaro",0,"E soprattutto: una confusione di nuova insorgenza nell'anziano non e' «normale per l'eta'»."),
 (13,"profondo",1.2,"[serious] Una confusione nuova non e' normale per l'eta'."),
 (13,"chiaro",0,"E' uno dei segni piu' precoci di sepsi, ipossia, ipoglicemia, globo vescicale. Va trattata come un allarme, e si riparte dalla A."),

 (14,"chiaro",0,"Nelle aziende venete i punteggi di allerta precoce sono sempre piu' spesso integrati nella cartella elettronica, che calcola il punteggio dai parametri inseriti."),
 (14,"chiaro",0,"E molti ospedali hanno team di risposta rapida con criteri di attivazione definiti. All'orale, la catena da citare e': parametri, punteggio, risposta graduata. Nessuno dei tre funziona senza gli altri due."),

 (15,"chiaro",0,"La tabella. A: parla? B: frequenza respiratoria, saturazione, lavoro respiratorio. C: frequenza, pressione, riempimento capillare sotto i due secondi, emorragie."),
 (15,"chiaro",0,"D: AVPU o GCS, pupille, glicemia. E: esporre, temperatura, ricoprire. Tratta cio' che trovi, e rivaluta. NEWS2: da cinque urgente, da sette emergenza, e attenzione al tre in un singolo parametro."),

 (16,"chiaro",0,"[warm] Nella prossima lezione, cio' che si fa quando l'ABCDE trova un paziente che non risponde e non respira: la rianimazione cardiopolmonare, dal BLSD all'ALS. A tra poco."),
]

CAPITOLI = {1:"Apertura",2:"Il principio",3:"A: le vie aeree",4:"B: il respiro",5:"C: il circolo",6:"D: lo stato neurologico",7:"E: l'esposizione",
 8:"La valutazione secondaria",9:"La NEWS2",10:"I team di risposta rapida",11:"Il monitoraggio",12:"Il caso",13:"L'errore da evitare",14:"In Veneto",15:"La tabella",16:"Chiusura"}

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
