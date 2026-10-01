# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Il rene e' l'organo che fa i conti: elimina scorie, regola acqua ed elettroliti, controlla l'equilibrio acido-base e la pressione. Quando cede, i conti saltano tutti insieme."),
 (1,"chiaro",0,"In questa lezione vediamo l'insufficienza renale acuta e cronica, la dialisi, con la fistola artero-venosa, che i concorsi chiedono sempre, e alcuni quadri urologici."),
 (1,"chiaro",0,"Un filo per tutta la lezione: la diuresi oraria. E' il numero che dice per primo se il rene sta cedendo, prima della creatinina e prima dei sintomi."),

 (2,"chiaro",0,"L'insufficienza renale acuta: la funzione renale si riduce in ore o giorni. Le cause si dividono in tre gruppi. Prerenali: il rene e' sano ma riceve poco sangue: disidratazione, emorragia, shock, scompenso."),
 (2,"chiaro",0,"Renali: il danno e' nel tessuto renale: farmaci nefrotossici, mezzi di contrasto, sepsi. Postrenali: l'urina non riesce a uscire: ipertrofia prostatica, calcoli, e un banale catetere ostruito."),
 (2,"chiaro",0,"I criteri: un aumento rapido della creatinina o una diuresi sotto mezzo millilitro per chilo per ora per sei ore: ecco perche' la diuresi oraria e' cosi' importante."),

 (3,"chiaro",0,"Davanti a un'oliguria, prima di pensare al rene, l'infermiere controlla le cause piu' semplici. Il catetere e' pervio, senza pieghe o coaguli? C'e' un globo vescicale, verificabile con il bladder scanner?"),
 (3,"chiaro",0,"La persona e' disidratata? Che cosa dicono parametri e bilancio? Ci sono farmaci nefrotossici in corso? Spesso l'anuria si risolve sbloccando un catetere."),

 (4,"chiaro",0,"L'insufficienza renale cronica: una riduzione della funzione che dura piu' di tre mesi. Si classifica in stadi in base al filtrato glomerulare, da G uno, con filtrato normale, a G cinque, sotto quindici."),
 (4,"chiaro",0,"Il G cinque e' l'insufficienza terminale, che richiede dialisi o trapianto. Le cause principali sono diabete e ipertensione: le due malattie delle lezioni precedenti arrivano qui."),
 (4,"chiaro",0,"Le complicanze: iperkaliemia, acidosi metabolica, anemia, perche' il rene produce meno eritropoietina, sovraccarico di liquidi, ipertensione, alterazioni di calcio e fosforo con danno osseo."),

 (5,"chiaro",0,"L'assistenza. Bilancio idrico e peso. Una dieta con proteine adattate allo stadio, ridotte prima della dialisi, aumentate in dialisi, come nella lezione tre punto tre, e riduzione di potassio, fosforo e sodio."),
 (5,"chiaro",0,"Restrizione idrica se prescritta. Farmaci con dosi adattate, evitando i nefrotossici."),
 (5,"chiaro",0,"E la protezione del patrimonio venoso dell'arto non dominante, che potrebbe servire per una fistola: niente prelievi ne' cannule su quel braccio, come abbiamo detto nella lezione sei punto uno."),

 (6,"chiaro",0,"L'emodialisi: il sangue esce dal corpo, passa attraverso un filtro, il rene artificiale, e rientra depurato. Di norma tre sedute a settimana di circa quattro ore."),
 (6,"chiaro",0,"Serve un accesso vascolare ad alto flusso: la fistola artero-venosa, che e' l'accesso di scelta, una protesi vascolare, oppure un catetere venoso centrale tunnellizzato per dialisi."),

 (7,"chiaro",0,"La fistola artero-venosa: il chirurgo collega un'arteria e una vena dell'avambraccio, per esempio la radiale e la cefalica. La vena riceve sangue ad alta pressione, si dilata, si rinforza, e diventa pungibile per la dialisi."),
 (7,"chiaro",0,"Il controllo quotidiano: si palpa il fremito, una vibrazione continua, il thrill, e si ausculta il soffio, il bruit."),
 (7,"chiaro",0,"Se il fremito scompare, la fistola potrebbe essere trombizzata: si avvisa subito, perche' un intervento tempestivo puo' salvarla. Un fremito che manca e' una telefonata, non un'annotazione."),

 (8,"chiaro",0,"Ed ecco l'elenco che i concorsi chiedono sempre: che cosa non si fa sul braccio con la fistola. Niente misurazione della pressione. Niente prelievi ne' cannule."),
 (8,"chiaro",0,"Niente lacci, bracciali, orologi, indumenti stretti. Non sollevare pesi. Non dormire sopra quel braccio. Tutto cio' che comprime puo' trombizzarla."),
 (8,"chiaro",0,"Molti reparti mettono un cartello al letto, perche' basta un collega distratto per perdere un accesso che e' la vita del paziente."),

 (9,"chiaro",0,"Il paziente che rientra dalla dialisi. Puo' essere ipoteso, perche' sono stati rimossi liquidi: attenzione all'alzata. Puo' sanguinare dai punti di puntura, perche' durante la seduta si usa l'eparina."),
 (9,"chiaro",0,"Il peso si confronta con il peso secco, l'obiettivo stabilito dal nefrologo. Stanchezza e crampi sono frequenti."),
 (9,"chiaro",0,"E piu' raramente la sindrome da disequilibrio, con cefalea, nausea, confusione, per i rapidi spostamenti di soluti: si segnala, non si aspetta che passi."),

 (10,"chiaro",0,"Il catetere per dialisi merita una regola a parte. E' gestito dal personale della dialisi o secondo una procedura specifica, perche' i suoi lumi contengono un lock ad alta concentrazione di eparina o citrato."),
 (10,"chiaro",0,"Se qualcuno lo usasse per un'infusione spingendo prima la soluzione, inietterebbe al paziente una dose di anticoagulante molto alta."),
 (10,"chiaro",0,"Quindi non si usa per infusioni o prelievi senza indicazione, e quando si usa, il lock va aspirato e scartato, mai spinto."),

 (11,"chiaro",0,"La dialisi peritoneale: il filtro e' il peritoneo stesso. Attraverso un catetere addominale si introduce un liquido, che resta in addome per alcune ore e poi viene drenato portando via scorie e acqua."),
 (11,"chiaro",0,"Puo' essere manuale, con scambi piu' volte al giorno, o automatizzata, con una macchina di notte. Si fa a domicilio, e richiede un'asepsi rigorosa."),
 (11,"chiaro",0,"La complicanza principale e' la peritonite: il primo segno e' spesso un liquido drenato torbido, poi dolore addominale e febbre. Si raccoglie un campione del liquido e si avvisa il centro."),

 (12,"chiaro",0,"Due quadri urologici. La ritenzione l'abbiamo vista nella lezione tre punto sei. L'ematuria: si monitorano colore e coaguli."),
 (12,"chiaro",0,"Dopo alcuni interventi, come la resezione prostatica, si usa il catetere a tre vie con irrigazione continua, per impedire la formazione di coaguli."),
 (12,"chiaro",0,"Il bilancio richiede un piccolo calcolo: le urine reali sono il drenato meno l'irrigato. Chi segna tutto il drenato come diuresi inventa litri di urina che non esistono."),
 (12,"chiaro",0,"E se l'irrigazione non defluisce, compaiono dolore e globo, c'e' un'ostruzione da coaguli da segnalare."),

 (13,"chiaro",0,"La colica renale: un dolore lombare molto intenso che si irradia verso l'inguine. Un segno che aiuta: la persona e' agitata, si muove, non trova una posizione."),
 (13,"chiaro",0,"Al contrario di chi ha una peritonite, che sta immobile perche' ogni movimento fa male. Nausea, ematuria. L'assistenza: analgesia, idratazione secondo indicazione, e filtrare le urine per recuperare il calcolo da analizzare."),

 (14,"chiaro",0,"Il caso. Paziente in emodialisi con fistola al braccio sinistro; un collega sta per misurare la pressione a sinistra, perche' il destro ha una cannula. Che cosa fai?"),
 (14,"chiaro",0,"Lo fermi: sul braccio con la fistola non si misura la pressione. Si misura sul destro, al di sopra della cannula se possibile, o si valutano alternative come l'arto inferiore secondo procedura."),
 (14,"profondo",1.2,"[serious] Poi verifichi il fremito della fistola e suggerisci un cartello al letto. Un accesso che e' la vita del paziente non si affida alla memoria dei colleghi."),

 (15,"chiaro",0,"In Veneto i pazienti in dialisi sono seguiti da una rete nefrologica con centri ospedalieri e centri ad assistenza limitata."),
 (15,"chiaro",0,"E la dialisi peritoneale domiciliare prevede un addestramento strutturato della persona e del caregiver, condotto dagli infermieri di nefrologia."),
 (15,"chiaro",0,"All'orale, la dialisi peritoneale e' un buon esempio di autogestione sostenuta dall'educazione infermieristica: la persona fa a casa, ogni giorno, cio' che le e' stato insegnato bene una volta."),

 (16,"chiaro",0,"La tabella della fistola, da fotografare. Ogni giorno: fremito e soffio. Mai: pressione, prelievi, cannule, lacci, orologi, pesi, dormirci sopra."),
 (16,"chiaro",0,"Fremito assente: possibile trombosi, si avvisa subito. Tre righe, e il quiz le chiede tutte e tre, quasi sempre nella forma: quale di queste azioni e' corretta sul braccio con la fistola? Nessuna."),

 (17,"chiaro",0,"Ricapitoliamo. Insufficienza acuta prerenale, renale, postrenale. Davanti all'oliguria, prima il catetere e il globo. Insufficienza cronica: iperkaliemia, anemia, sovraccarico. Emodialisi tre volte a settimana."),
 (17,"chiaro",0,"Fistola: fremito ogni giorno, niente pressione. Lock del catetere da dialisi: aspirare, mai spingere. Peritoneale: liquido torbido e' peritonite. Colica: agitato; peritonite: immobile."),
 (17,"chiaro",0,"[warm] Nella prossima lezione: apparato digerente e fegato. A tra poco."),
]

CAPITOLI = {1:"Apertura",2:"L'insufficienza renale acuta",3:"Davanti all'oliguria",4:"L'insufficienza renale cronica",5:"L'assistenza",6:"L'emodialisi",
 7:"La fistola",8:"Il braccio con la fistola",9:"Il rientro dalla dialisi",10:"Il catetere per dialisi",11:"La dialisi peritoneale",12:"Ematuria e irrigazione",
 13:"La colica renale",14:"Il caso",15:"In Veneto",16:"La tabella",17:"Chiusura"}

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
