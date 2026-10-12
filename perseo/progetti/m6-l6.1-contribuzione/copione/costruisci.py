# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Chi pianta un albero sa una cosa: l'ombra non si raccoglie il primo anno. Ci vogliono pazienza, acqua e tempo."),
 (1,"chiaro",0,"Ma sa anche un'altra cosa: se aspetta a piantarlo, l'ombra arrivera' piu' tardi. E nessuno potra' restituirgli gli anni persi."),
 (1,"chiaro",0,'Un fondo pensione funziona allo stesso modo. Si semina oggi, un poco alla volta, e si raccoglie tra molti anni, quando serve davvero.'),
 (1,"chiaro",0,'Con questo modulo entriamo nella gestione finanziaria di Perseo Sirio: dove vanno i soldi, come vengono investiti, e quali scelte puoi fare tu.'),
 (1,"chiaro",0,'Partiamo dalla regola di base, quella che spiega tutto il resto. E ricordiamo, per tutto il modulo, due avvertenze.'),
 (1,"chiaro",0,'Sono informazioni generali, non consulenza finanziaria. E i rendimenti passati non garantiscono quelli futuri.'),

 (2,"chiaro",0,"Perseo Sirio opera in regime di contribuzione definita. Due parole un po' tecniche, che pero' dicono moltissimo su come funziona la tua posizione."),
 (2,"chiaro",0,"Significa che e' definito quanto si versa, non quanto si ricevera'. L'arrivo non e' scritto in partenza."),
 (2,"chiaro",0,"La tua pensione complementare dipendera' da tre cose. Primo: quanto e' stato versato, da te e dall'ente."),
 (2,"chiaro",0,"Secondo: quanto hanno reso gli investimenti, anno dopo anno. Terzo: quanto sono costati, cioe' le spese di gestione."),
 (2,"chiaro",0,"Versamenti, piu' rendimenti, meno costi. E' tutta qui l'equazione della previdenza complementare, e vale per ogni iscritto."),
 (2,"chiaro",0,"Non c'e' un importo garantito in partenza, come succedeva con le vecchie pensioni calcolate sull'ultimo stipendio. Qui l'arrivo si costruisce strada facendo."),
 (2,"chiaro",0,"C'e' invece un conto intestato a te, che cresce nel tempo. E alla fine diventa una rendita, oppure un capitale, o le due cose insieme."),
 (2,"chiaro",0,"Per questo il Fondo ti invia ogni anno una proiezione, che vedremo nel modulo dieci. E' una stima, non una promessa."),

 (3,"chiaro",0,"Dei tre fattori dell'equazione, quello che pesa di piu' e' spesso il piu' semplice da dimenticare: il tempo."),
 (3,"chiaro",0,'Guarda queste tre persone, in un esempio semplificato. Versano la stessa cifra ogni mese, cento euro, e ottengono lo stesso rendimento.'),
 (3,"chiaro",0,"Cambia solo l'eta' in cui cominciano: venticinque, trentacinque e quarantacinque anni. Tutte e tre vanno in pensione a sessantasette."),
 (3,"chiaro",0,"Con un rendimento del quattro per cento l'anno, puramente d'esempio, chi parte a quarantacinque anni arriva a circa quarantaduemila euro."),
 (3,"chiaro",0,'Chi parte a trentacinque arriva a circa settantottomila. E chi parte a venticinque supera i centotrentamila euro.'),
 (3,"chiaro",0,"Eppure la prima persona, rispetto alla seconda, ha versato solo dieci anni in piu': circa dodicimila euro."),
 (3,"chiaro",0,"Ha lasciato piu' a lungo i suoi soldi a lavorare. E i rendimenti dei primi anni hanno prodotto, a loro volta, altri rendimenti."),
 (3,"chiaro",0,"E' l'interesse composto, che hai conosciuto nel modulo uno: all'inizio quasi invisibile, alla fine decisivo."),

 (4,"chiaro",0,"Investire, pero', non significa giocare in borsa, ne' inseguire l'affare del momento. Il Fondo lo dice in modo esplicito."),
 (4,"chiaro",0,"Non e' uno strumento di speculazione, ma di accumulo previdenziale. Lo scopo non e' guadagnare in fretta, ma arrivare alla pensione."),
 (4,"chiaro",0,"Le regole su che cosa si puo' comprare, in che misura e con quali limiti di rischio sono fissate per legge, da un decreto del Ministero dell'Economia."),
 (4,"chiaro",0,'Come hai visto nel modulo uno, i soldi sono affidati a gestori professionali, scelti con una gara pubblica.'),
 (4,"chiaro",0,'E sono custoditi da un depositario, separati dal patrimonio dei gestori. Se un gestore avesse problemi, i tuoi soldi resterebbero tuoi.'),
 (4,"chiaro",0,"La gestione, insomma, e' pensata per il lungo periodo. Non per il prossimo mese, ma per i prossimi dieci, venti, trent'anni."),
 (4,"chiaro",0,'Quello che succede in un singolo anno, positivo o negativo, conta meno della direzione di tutto il percorso.'),

 (5,"chiaro",0,"Qualche numero, allora, per dare un'idea concreta. Ma con prudenza, e dicendo bene da dove viene."),
 (5,"chiaro",0,"Secondo la COVIP, l'autorita' che vigila sui fondi pensione, nei dieci anni dal 2015 al 2025 il TFR si e' rivalutato in media del due e mezzo per cento l'anno."),
 (5,"chiaro",0,"Nello stesso periodo, le linee dei fondi pensione con piu' azioni hanno reso in media circa il cinque per cento l'anno."),
 (5,"chiaro",0,'Attenzione: sono medie di tutto il sistema, non i risultati di Perseo Sirio. E i rendimenti passati non garantiscono quelli futuri.'),
 (5,"chiaro",0,"Ma mostrano un principio: su orizzonti lunghi, accettare un po' di oscillazione, qualche anno su e qualche anno giu', e' stato premiato."),
 (5,"chiaro",0,"Su orizzonti brevi, invece, puo' non esserlo. Chi ha pochi anni davanti ha meno tempo per recuperare un anno storto."),
 (5,"chiaro",0,"Per questo, nelle prossime lezioni, il tempo che ti manca alla pensione tornera' di continuo. E' la bussola di tutte le scelte."),

 (6,"profondo",1.2,'Si conosce quanto versi. Quanto riceverai, lo costruisce il tempo.'),

 (7,"chiaro",0,"Le tre cose da ricordare. Uno: la pensione complementare dipende da versamenti, rendimenti e costi. Non c'e' un importo promesso."),
 (7,"chiaro",0,"Due: il tempo e' il fattore che pesa di piu', grazie all'interesse composto. Dieci anni prima possono fare una grande differenza."),
 (7,"chiaro",0,"Tre: la gestione segue regole di legge, con gestori scelti con gara e un depositario separato, ed e' orientata al lungo periodo."),
 (7,"chiaro",0,"La mossa di oggi e' un semplice calcolo: quanti anni ti mancano, piu' o meno, alla pensione?"),
 (7,"chiaro",0,"Prendi la tua eta' di oggi, e toglila da sessantasette, l'eta' della pensione di vecchiaia. Non serve precisione: basta un ordine di grandezza."),
 (7,"chiaro",0,"Scrivi quel numero da qualche parte, su un foglio o nelle note del telefono, dove lo ritrovi facilmente. E' il numero piu' importante per tutte le scelte di questo modulo."),
 (7,"chiaro",0,"Se e' grande, hai dalla tua parte il tempo. Se e' piccolo, conviene ragionare con piu' attenzione sul rischio."),
 (7,"chiaro",0,"E in entrambi i casi, ricorda: il corso non ti dira' quale profilo scegliere. Ti dara' i criteri per sceglierlo tu."),
 (7,"chiaro",0,'Nella prossima lezione parliamo proprio di questo: rischio e rendimento. Due parole che spesso fanno paura.'),
 (7,"chiaro",0,"[warm] Vedremo che il rischio si puo' capire, e che la paura non e' una buona consigliera. Ci vediamo nella lezione sei punto due."),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Apertura', 2: 'Contribuzione definita', 3: 'Il tempo', 4: 'Le regole della prudenza', 5: 'I numeri, con prudenza', 6: 'Memo', 7: 'Chiusura'}
CPS = 17.0   # GianP eleven_v3, misurata sul corso Infermiere: si rimisura sulla 1.1

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
    if len(b["text"])>225: errori.append(f'{b["id"]}: {len(b["text"])} car, blocco troppo lungo')
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
