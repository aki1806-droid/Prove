# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Ogni buona ricetta ha pochi ingredienti, nelle giuste dosi. Anche la tua posizione in Perseo Sirio funziona cosi'."),
 (1,"chiaro",0,"Nei moduli precedenti abbiamo visto perche' esiste il Fondo, chi puo' aderire e che cosa succede alla liquidazione."),
 (1,"chiaro",0,'Ora passiamo ai numeri. Che cosa entra, ogni mese, nel tuo conto previdenziale? Chi lo mette? E su quale base si calcola?'),
 (1,"chiaro",0,"In questa lezione vediamo la ricetta completa. E in tutto il modulo useremo lo stesso esempio: una retribuzione utile di trentamila euro l'anno."),

 (2,"chiaro",0,'Ecco il salvadanaio. Ha tre ingressi, e in ognuno entra una moneta diversa, che arriva da una persona diversa e con una regola diversa.'),
 (2,"chiaro",0,"Il primo e' il tuo contributo: almeno l'uno per cento. E' la parte che scegli tu, e che esce dalla tua busta paga."),
 (2,"chiaro",0,"Il secondo e' il contributo della tua amministrazione: l'uno per cento. Arriva solo perche' hai aderito, e solo se versi anche tu."),
 (2,"chiaro",0,"Il terzo e' il TFR, il trattamento di fine rapporto. E' la quota che ogni anno matura sul tuo stipendio, e che senza adesione riceveresti come liquidazione a fine carriera."),
 (2,"chiaro",0,"Poi c'e' un quarto ingresso, piu' piccolo. Si apre solo per chi era in servizio a tempo indeterminato al 31 dicembre 2000 e ha optato per il TFR."),
 (2,"chiaro",0,"E' l'accantonamento aggiuntivo dell'uno virgola cinque per cento. Ne abbiamo parlato nel modulo due, ed e' il premio per chi lascia il TFS."),
 (2,"chiaro",0,'Tutte le percentuali si calcolano sulla stessa base: la retribuzione lorda utile ai fini del TFR.'),
 (2,"chiaro",0,"Non e' tutto lo stipendio lordo. Sono le voci fisse e continuative previste dalle regole del tuo contratto. Straordinari e premi occasionali, di solito, restano fuori."),

 (3,"chiaro",0,"Rimettiamo gli ingredienti nelle due tasche che conosci dal modulo due: la tasca reale, a Perseo Sirio, e la tasca figurativa, all'INPS."),
 (3,"chiaro",0,"Il tuo contributo e quello dell'ente sono soldi veri. Vengono trattenuti o pagati ogni mese, e finiscono nella tasca reale."),
 (3,"chiaro",0,"L'ente li versa al Fondo entro il quindici del mese successivo. E da quel momento vengono investiti, nel profilo che hai scelto."),
 (3,"chiaro",0,"Il TFR e l'eventuale uno virgola cinque, invece, non si spostano. L'INPS li registra nella tasca figurativa."),
 (3,"chiaro",0,'E li trasferisce al Fondo solo quando il rapporto di lavoro finisce. Nel frattempo non restano fermi: si rivalutano ogni anno, con le regole che abbiamo visto nel modulo due.'),
 (3,"chiaro",0,"Quattro ingredienti, due tasche, una sola posizione intestata a te. Ed e' la somma delle due tasche che, un giorno, diventera' la tua pensione complementare."),

 (4,"chiaro",0,"Proviamo con un esempio. Un operatore assunto dopo il 2000, con una retribuzione utile di trentamila euro l'anno."),
 (4,"chiaro",0,"Il suo uno per cento vale trecento euro l'anno. Diviso per dodici mesi, sono venticinque euro al mese: meno di un euro al giorno."),
 (4,"chiaro",0,"L'ente aggiunge altri trecento euro l'anno. Senza che lui debba fare altro: basta che il suo uno per cento continui ad arrivare."),
 (4,"chiaro",0,"E il TFR, il sei virgola novantuno per cento della retribuzione, vale circa duemilasettanta euro l'anno."),
 (4,"chiaro",0,"In tutto, quasi duemilasettecento euro l'anno lavorano per la sua pensione complementare. Su dieci anni, sono oltre ventiseimila euro, prima dei rendimenti."),
 (4,"chiaro",0,'Di questi, quelli che escono davvero dalla sua busta paga sono venticinque euro al mese.'),
 (4,"chiaro",0,"E anche su quelli, come vedremo nel modulo cinque, risparmia una parte di tasse. Il costo reale, quindi, e' ancora piu' basso."),
 (4,"chiaro",0,"Un dettaglio sui numeri: sono importi lordi e arrotondati. E' un esempio semplificato, che serve a capire le proporzioni, non a fare i conti al centesimo."),

 (5,"chiaro",0,"Attenzione, pero', a non leggere male questo esempio. Mettiamo i pezzi su una bilancia."),
 (5,"chiaro",0,"Da una parte, la moneta piccola: venticinque euro al mese dalla tua busta paga. Dall'altra cadono l'ente e il TFR."),
 (5,"chiaro",0,"[serious] Ma il TFR non e' un regalo: e' gia' tuo. Se non aderisci, lo ricevi comunque, come liquidazione, alla fine del lavoro."),
 (5,"chiaro",0,'Aderendo, cambi la sua destinazione e il modo in cui cresce: da liquidazione a pensione complementare.'),
 (5,"chiaro",0,"Il vero ingresso in piu' e' l'uno per cento dell'ente, che senza adesione non avresti. Trecento euro l'anno, nel nostro esempio."),
 (5,"chiaro",0,"E, per chi era in servizio al 2000, l'uno virgola cinque aggiuntivo. Anche quello, senza adesione, non esisterebbe."),
 (5,"chiaro",0,"Tenere distinti questi pezzi e' il modo piu' onesto di valutare la scelta. Senza esagerare i vantaggi, e senza ignorarli."),

 (6,"chiaro",0,"Ultima cosa: il tuo uno per cento e' un minimo, non un tetto."),
 (6,"chiaro",0,"Puoi scegliere di versare di piu', in percentuale o con una cifra fissa. E puoi cambiare idea una volta l'anno, dall'area riservata, come abbiamo visto nel modulo tre."),
 (6,"chiaro",0,"L'ente, invece, resta fermo all'uno per cento, qualunque cifra tu decida di versare. Il resto dipende solo da te."),
 (6,"chiaro",0,"Chi versa di piu', quindi, aumenta la propria parte e i vantaggi fiscali, ma non il contributo dell'ente."),
 (6,"chiaro",0,"Ne parleremo nella lezione quattro. Prima, pero', vediamo come cambia la ricetta a seconda di quando sei stato assunto."),

 (7,"profondo",1.2,"Il TFR e' gia' tuo. L'uno per cento dell'ente arriva solo se aderisci."),

 (8,"chiaro",0,"Le tre cose da ricordare. Uno: la posizione si alimenta con il tuo contributo, almeno l'uno per cento, quello dell'ente, l'uno per cento, e il TFR."),
 (8,"chiaro",0,"Piu' l'uno virgola cinque per chi era in servizio al 2000 e ha optato."),
 (8,"chiaro",0,'Due: tutto si calcola sulla stessa base, la retribuzione lorda utile ai fini del TFR, non sullo stipendio netto.'),
 (8,"chiaro",0,"Tre: i contributi sono soldi versati e investiti. TFR e uno virgola cinque restano figurativi all'INPS fino alla cessazione."),
 (8,"chiaro",0,"La mossa di oggi: prendi la tua retribuzione lorda annua, anche approssimativa, e calcola l'uno per cento."),
 (8,"chiaro",0,"Poi dividilo per dodici, o per tredici se vuoi tenere conto della tredicesima. E' quanto ti costa, al mese, aderire con il minimo, prima del risparmio fiscale."),
 (8,"chiaro",0,"Se hai gia' aderito, confronta la cifra con la trattenuta sul tuo cedolino: dovrebbero somigliarsi. Nella quinta lezione vedremo dove trovarla."),
 (8,"chiaro",0,'[warm] Nella prossima lezione: assunti prima e dopo il 2001. Stessa scelta, due ricette diverse.'),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Apertura', 2: "Tre ingressi, piu' uno", 3: 'Due tasche', 4: 'Un esempio', 5: "Leggere bene l'esempio", 6: 'Un minimo, non un tetto', 7: 'Memo', 8: 'Chiusura'}
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
