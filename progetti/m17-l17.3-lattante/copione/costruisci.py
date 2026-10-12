# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Il bambino non e' un adulto piccolo, e questo caso lo mostra in tre modi. I segni di gravita' sono diversi, la riserva di liquidi e' minore, e le dosi si calcolano per chilo, con un rischio di errore molto piu' alto."),
 (1,"chiaro",0,"Il protagonista e' un lattante disidratato per una gastroenterite, insieme ai suoi genitori. Le lezioni: quattro punto tre, cinque punto tre, dieci punto quattro, undici punto quattro e quattordici punto uno."),

 (2,"chiaro",0,"Lo scenario. Leo, nove mesi. Da due giorni ha vomito e diarrea acquosa, otto-dieci scariche al giorno, e febbre. Prima della malattia pesava otto virgola otto chili; oggi ne pesa otto."),
 (2,"chiaro",0,"L'ultimo pannolino bagnato risale a dieci ore fa. Prima era irritabile, ora e' sonnolento. La fontanella anteriore e' depressa, gli occhi sono infossati, le mucose secche, e piange senza lacrime."),
 (2,"chiaro",0,"Frequenza centosettantacinque, riempimento capillare di tre secondi, mani e piedi freddi, cute marezzata. I genitori sono molto spaventati. Fermati: quanto e' grave la disidratazione, e che cosa ti preoccupa di piu'?"),

 (3,"chiaro",0,"[thoughtful] Il ragionamento. Il calo e' di zero virgola otto chili su otto virgola otto: circa il nove per cento, una disidratazione moderata-grave. Il peso prima della malattia, quando si conosce, e' il dato piu' preciso."),
 (3,"chiaro",0,"I segni concordano: fontanella depressa, occhi infossati, mucose secche, pianto senza lacrime, oliguria. E ci sono segni di shock iniziale: tachicardia marcata, riempimento capillare lento, estremita' fredde, marezzatura."),
 (3,"chiaro",0,"E soprattutto la sonnolenza, un segno di gravita' in un lattante. Ricordi la lezione dieci punto quattro: nel bambino l'ipotensione e' un segno tardivo. Non va aspettata."),

 (4,"chiaro",0,"Le prime azioni. Triage di alta priorita' e avviso immediato al pediatra. L'ABCDE pediatrico. La glicemia capillare, perche' un lattante che non mangia da due giorni puo' essere ipoglicemico."),
 (4,"chiaro",0,"Il peso preciso, che sara' la base di tutte le dosi. Poi l'accesso venoso, spesso difficile in un lattante disidratato."),
 (4,"chiaro",0,"Se e' in shock e la vena non si trova in fretta, accesso intraosseo, come nella lezione cinque punto due. Prelievi per elettroliti, funzione renale ed emogas. Monitoraggio. E i genitori restano accanto al bambino."),

 (5,"chiaro",0,"La reidratazione endovenosa, secondo prescrizione. Nello shock si somministra un bolo di cristalloide isotonico, per esempio dieci millilitri per chilo: per Leo, ottanta millilitri, infusi rapidamente."),
 (5,"chiaro",0,"Con una rivalutazione dopo ogni bolo: frequenza, riempimento capillare, coscienza, diuresi. Poi si prosegue con una reidratazione che corregge il deficit e garantisce il mantenimento."),
 (5,"chiaro",0,"Un'attenzione di sicurezza: nel lattante si infonde con una pompa, o con un deflussore pediatrico con buretta. Mai un flacone a caduta libera: un errore di pochi minuti puo' dare un sovraccarico pericoloso."),

 (6,"chiaro",0,"Un esempio di dose per chilo, con i calcoli della lezione cinque punto tre. Viene prescritto il paracetamolo a quindici milligrammi per chilo. Per Leo: otto per quindici fa centoventi milligrammi."),
 (6,"chiaro",0,"Lo sciroppo contiene centoventi milligrammi in cinque millilitri: la dose e' di cinque millilitri. Poi la dose massima giornaliera, e le siringhe per uso orale: mai per iniezione, perche' un farmaco orale non finisca in vena."),
 (6,"chiaro",0,"Gli errori tipici della pediatria: la virgola, milligrammi e millilitri confusi, le dosi da adulto, le confezioni con concentrazioni diverse. Il doppio controllo dei calcoli e' una regola, non una scortesia verso il collega."),

 (7,"chiaro",0,"La diuresi nel lattante si misura pesando i pannolini: un grammo corrisponde circa a un millilitro di urina, sottraendo il peso del pannolino asciutto. L'obiettivo indicativo: circa uno-due millilitri per chilo all'ora."),
 (7,"chiaro",0,"Piu' che nell'adulto. Si distinguono urine e feci, si tiene il bilancio di entrate e uscite, compresi vomito e diarrea, e si pesa il bambino ogni giorno, alla stessa ora e con la stessa bilancia."),

 (8,"chiaro",0,"L'evoluzione. Dopo due boli e la reidratazione endovenosa, la frequenza scende a centoquaranta, il riempimento capillare torna normale, Leo e' piu' reattivo, e bagna il primo pannolino."),
 (8,"chiaro",0,"Si passa gradualmente alla reidratazione per bocca, con la soluzione reidratante orale in piccole quantita' frequenti: per esempio un cucchiaino ogni uno-due minuti. Piccoli volumi sono tollerati anche da chi vomita."),
 (8,"chiaro",0,"Si continua l'allattamento, o la normale alimentazione appena tollerata. E si evitano succhi di frutta, bibite zuccherate, te' e brodi come reidratanti: zuccheri e sali non adatti, che possono peggiorare la diarrea."),

 (9,"chiaro",0,"Le precauzioni per le infezioni. Le gastroenteriti virali dei bambini, come quelle da rotavirus o norovirus, si trasmettono per via oro-fecale e sono molto contagiose."),
 (9,"chiaro",0,"Si applicano le precauzioni da contatto secondo protocollo, e l'igiene delle mani: con acqua e sapone quando il protocollo lo indica, perche' alcuni virus resistono al gel alcolico."),
 (9,"chiaro",0,"Poi una gestione attenta di pannolini e superfici. Si educano i genitori: mani, fasciatoio, giocattoli. E la vaccinazione contro il rotavirus e' offerta nel primo anno di vita."),

 (10,"chiaro",0,"Un approfondimento: i genitori e il dolore del bambino. La presenza dei genitori e' un diritto del bambino e un vero intervento terapeutico: in braccio alla madre, un lattante ha meno paura e meno dolore."),
 (10,"chiaro",0,"Si spiega in modo semplice che cosa si fara', e si coinvolgono i genitori: tenere il bambino in braccio, allattarlo durante la procedura, distrarlo."),
 (10,"chiaro",0,"Per il dolore delle procedure, una crema anestetica locale quando il tempo lo consente, la distrazione, una posizione di conforto."),
 (10,"chiaro",0,"Il dolore si valuta con una scala adatta all'eta', come la FLACC della lezione undici punto quattro. E l'ansia dei genitori fa parte del caso: non e' un disturbo da gestire."),

 (11,"chiaro",0,"La dimissione. I genitori devono riconoscere i segni di disidratazione: pannolini asciutti, sonnolenza, pianto senza lacrime, bocca secca, fontanella depressa."),
 (11,"chiaro",0,"Sapere come somministrare la soluzione reidratante, e continuare l'allattamento. E sapere quando tornare subito: vomito che non si ferma, sangue nelle feci, sonnolenza, poche urine, febbre alta persistente."),
 (11,"chiaro",0,"Poi l'igiene delle mani in famiglia, e il riferimento al pediatra di libera scelta. Tutto verificato con il teach-back."),

 (12,"chiaro",0,"Gli errori. Aspettare l'ipotensione per riconoscere lo shock. Dimenticare la glicemia. Non pesare il bambino. Calcolare le dosi senza doppio controllo."),
 (12,"chiaro",0,"Le siringhe per iniezione per i farmaci orali. Il flacone a caduta libera nel lattante. Reidratare con succhi o bibite. E allontanare i genitori durante le procedure."),

 (13,"chiaro",0,"[curious] Le domande d'orale. Prima: i segni di disidratazione nel lattante? Calo di peso, fontanella depressa, occhi infossati, mucose secche, pianto senza lacrime, oliguria."),
 (13,"chiaro",0,"E nei casi gravi tachicardia, riempimento capillare lento, estremita' fredde e alterazione della coscienza. Seconda: come si calcola una dose per chilo? Si moltiplica la dose per chilo per il peso."),
 (13,"chiaro",0,"Si converte in volume in base alla concentrazione, si verifica la dose massima, si esegue un doppio controllo, e per i farmaci per bocca si usano siringhe per uso orale."),
 (13,"chiaro",0,"Terza: la diuresi? Pesando i pannolini e sottraendo il peso del pannolino asciutto: un grammo corrisponde circa a un millilitro."),

 (14,"chiaro",0,"La risposta modello. Lattante di nove mesi con gastroenterite, calo di peso del nove per cento, segni di disidratazione, tachicardia, riempimento capillare rallentato, estremita' fredde e sonnolenza."),
 (14,"chiaro",0,"Disidratazione moderata-grave con shock iniziale. Assegno alta priorita' e avviso subito il pediatra; valuto ABCDE e glicemia, peso il bambino e reperisco un accesso, intraosseo se necessario."),
 (14,"chiaro",0,"Somministro il bolo prescritto di dieci millilitri per chilo con rivalutazione, infondendo con pompa. Calcolo le dosi per chilo con doppio controllo, e uso siringhe orali. Misuro la diuresi pesando i pannolini."),
 (14,"chiaro",0,"Quando tollerato avvio la reidratazione orale a piccole quantita', e continuo l'allattamento. Applico le precauzioni da contatto. Coinvolgo i genitori, e li educo a riconoscere i segni di disidratazione."),

 (15,"chiaro",0,"I collegamenti. Le precauzioni da contatto con la quattro punto tre. I calcoli con la cinque punto tre. L'accesso intraosseo con la cinque punto due. I segni di gravita' nel bambino con la dieci punto quattro."),
 (15,"chiaro",0,"La pediatria e il dolore con la undici punto quattro. I compartimenti idrici con la quattordici punto uno, che spiegano perche' il lattante si disidrata cosi' in fretta."),

 (16,"chiaro",0,"Un aspetto organizzativo: a volte un bambino viene assistito in un pronto soccorso generale, o in un'area non pediatrica. Serve materiale pediatrico: maschere, bracciali, aghi, pompe, piastre del defibrillatore."),
 (16,"chiaro",0,"Servono tabelle dei parametri normali e delle dosi per eta' e peso, la consulenza pediatrica, e un ambiente adatto, con la presenza dei genitori."),

 (17,"profondo",1.2,"[serious] La frase del caso: nel bambino tutto si calcola per chilo, e lo shock si riconosce prima che la pressione cada."),

 (18,"chiaro",0,"[warm] Nella prossima lezione, un tema delicato: un paziente ricoverato per una malattia fisica che, una notte, lascia intendere di non voler piu' vivere. Che cosa dire, che cosa fare, e come proteggerlo. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"Lo scenario",3:"Il ragionamento",4:"Le prime azioni",5:"La reidratazione endovenosa",
 6:"La dose per chilo: un esempio",7:"La diuresi nel lattante",8:"L'evoluzione e la reidratazione orale",
 9:"Le precauzioni per le infezioni",10:"I genitori e il dolore del bambino",11:"La dimissione",12:"Gli errori da evitare",
 13:"Le domande d'orale",14:"La risposta modello",15:"I collegamenti",16:"Il bambino in un reparto per adulti",
 17:"La frase del caso",18:"Chiusura"}

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
