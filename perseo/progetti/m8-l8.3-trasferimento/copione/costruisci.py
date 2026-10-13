# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] In ogni trasloco c'e' sempre qualcosa che non entra nel camion. Uno scatolone che resta nella vecchia casa, dimenticato in un angolo."),
 (1,"chiaro",0,"Il trasferimento della posizione da Perseo Sirio a un altro fondo pensione funziona un po' cosi': si sposta molto, ma non tutto."),
 (1,"chiaro",0,"Si puo' fare, anche mentre lavori ancora nella pubblica amministrazione. Ma in quel caso non tutto viaggia, e qualcosa si perde per strada."),
 (1,"chiaro",0,'In questa lezione vediamo che cosa si sposta, che cosa resta indietro, e quando il trasloco ha davvero senso.'),
 (1,"chiaro",0,'E alla fine guardiamo anche il trasloco al contrario: come portare in Perseo Sirio un fondo pensione che avevi prima.'),

 (2,"chiaro",0,"Partiamo dalla regola. Un dipendente pubblico puo' trasferire la posizione a un'altra forma di previdenza complementare dopo almeno tre anni di permanenza in Perseo Sirio."),
 (2,"chiaro",0,"Per i lavoratori privati ne bastano due. Ancora una volta, per i pubblici la regola e' diversa, e vale la pena ricordarlo quando leggi informazioni online."),
 (2,"chiaro",0,"Ma che cosa si trasferisce, esattamente? Solo quanto e' stato effettivamente versato nel Fondo, con i suoi rendimenti."),
 (2,"chiaro",0,"Cioe' la tasca reale: i tuoi contributi, quelli dell'ente fino a quel momento, e quello che hanno prodotto negli anni."),
 (2,"chiaro",0,"La quota di TFR, come sempre, resta all'INPS. E l'INPS la liquidera' solo quando il rapporto di lavoro finira' davvero."),
 (2,"chiaro",0,"Lo stesso vale per l'uno virgola cinque per cento, per chi viene dal TFS: anche quella somma aspetta la fine del lavoro."),
 (2,"chiaro",0,"Il trasferimento in se' non costa nulla in termini di spese del Fondo. E non paga imposte: le tasse arriveranno solo con la prestazione."),

 (3,"chiaro",0,"E poi c'e' il costo nascosto. Non e' scritto in nessuna tabella delle spese, ne' in un modulo, ma e' il piu' importante di tutti."),
 (3,"chiaro",0,"Se trasferisci mentre lavori ancora nella pubblica amministrazione, l'uno per cento dell'ente non ti seguira'."),
 (3,"chiaro",0,"Il contributo del datore di lavoro, ricordi, spetta solo a chi e' iscritto al fondo negoziale del proprio contratto. Per te, Perseo Sirio."),
 (3,"chiaro",0,"Quindi, dal giorno del trasferimento, nel nuovo fondo verserai solo tu. L'ente smette di versare la sua parte."),
 (3,"chiaro",0,"Ogni anno lasci sul tavolo l'uno per cento della tua retribuzione utile. Piu' i rendimenti che quei soldi avrebbero prodotto."),
 (3,"chiaro",0,"Con trentamila euro di retribuzione utile, sono trecento euro l'anno. In vent'anni, seimila euro di soli versamenti, senza contare i rendimenti."),
 (3,"chiaro",0,"Ed e' difficile che un altro fondo compensi questa perdita con rendimenti piu' alti. Soprattutto considerando i costi."),
 (3,"chiaro",0,"Come hai visto nel modulo sette, i fondi aperti e i piani individuali costano in media molto di piu' dei fondi negoziali."),

 (4,"chiaro",0,"Quando ha senso, allora, trasferire la posizione? Ci sono due situazioni molto diverse, e conviene tenerle ben separate, perche' la risposta cambia completamente."),
 (4,"chiaro",0,"Il caso piu' naturale e' quando hai lasciato il pubblico impiego e trovi un nuovo lavoro, con un suo fondo negoziale."),
 (4,"chiaro",0,"Trasferendo la posizione li', la riunisci in un unico posto. E il nuovo datore di lavoro ti versera' il suo contributo."),
 (4,"chiaro",0,"In questo caso il trasferimento segue la tua vita lavorativa. E' esattamente il tipo di trasloco per cui la regola e' stata pensata."),
 (4,"chiaro",0,"Se invece lavori ancora nella PA, il trasferimento volontario e' un'operazione da valutare con molta attenzione, numeri alla mano."),
 (4,"chiaro",0,"Prima di farlo, chiedi l'ISC del fondo di destinazione, e confrontalo con quello di Perseo Sirio, come hai imparato nella lezione sette punto due."),
 (4,"chiaro",0,"Poi calcola quanto vale l'uno per cento dell'ente che perderesti, anno dopo anno, fino alla pensione."),
 (4,"chiaro",0,'E se qualcuno ti propone il trasferimento, magari un consulente o un promotore, chiediti sempre chi ci guadagna. A volte non sei tu.'),

 (5,"chiaro",0,"Il trasferimento funziona anche al contrario, cioe' in entrata. E qui, di solito, le notizie sono buone."),
 (5,"chiaro",0,'Se prima di entrare nella pubblica amministrazione avevi un fondo pensione, per esempio quello di un lavoro nel privato, puoi portare quella posizione in Perseo Sirio.'),
 (5,"chiaro",0,'La domanda si presenta al fondo di provenienza, secondo le sue regole e con i suoi moduli.'),
 (5,"chiaro",0,"Il vecchio fondo avvisa Perseo Sirio, che autorizza l'ingresso della posizione e attende il bonifico. Tu non devi fare altro."),
 (5,"chiaro",0,"Il vantaggio e' doppio. Primo: tutto in un unico posto, con costi bassi, e un solo prospetto da controllare ogni anno."),
 (5,"chiaro",0,'Secondo: gli anni di partecipazione precedenti continuano a contare. Anche per la scala fiscale, che scende dal quindici al nove per cento.'),
 (5,"chiaro",0,"Molti hanno una vecchia posizione dimenticata da qualche parte, magari di pochi anni. Riunirla e' uno dei gesti piu' semplici e piu' utili."),

 (6,"profondo",1.2,"Se trasferisci mentre lavori nella PA, l'uno per cento dell'ente resta indietro."),

 (7,"chiaro",0,'Le tre cose da ricordare. Uno: dopo tre anni puoi trasferire la posizione, ma si sposta solo la parte reale.'),
 (7,"chiaro",0,"Il TFR e l'eventuale uno virgola cinque restano all'INPS fino alla fine del rapporto di lavoro, e poi seguono la posizione."),
 (7,"chiaro",0,"Due: se trasferisci mentre lavori nella PA, perdi il contributo dell'ente. Ogni anno, fino alla pensione."),
 (7,"chiaro",0,'Tre: puoi portare in Perseo Sirio la posizione di un fondo precedente, sommando gli anni di partecipazione.'),
 (7,"chiaro",0,'La mossa di oggi: pensa ai lavori che hai fatto prima di entrare nella PA. Avevi un fondo pensione?'),
 (7,"chiaro",0,"Se si', recupera i documenti, o chiedi al vecchio datore di lavoro quale fondo era. Forse c'e' una posizione da riunire, e da far crescere insieme alla tua."),
 (7,"chiaro",0,'E se qualcuno ti propone di spostare la posizione, torna a questa lezione prima di rispondere.'),
 (7,"chiaro",0,'Nella prossima lezione vediamo uno strumento pensato per chi lascia il lavoro qualche anno prima della pensione.'),
 (7,"chiaro",0,"Un reddito ponte, che usa la posizione nel Fondo per coprire gli anni in cui non hai piu' lo stipendio, e non hai ancora la pensione."),
 (7,"chiaro",0,"Si chiama RITA, rendita integrativa temporanea anticipata. Vedremo chi puo' chiederla, come funziona, e per chi ha davvero senso."),
 (7,"chiaro",0,'[warm] La RITA. Ci vediamo nella lezione otto punto quattro.'),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Apertura', 2: 'Che cosa si sposta', 3: 'Il costo nascosto', 4: 'Quando ha senso', 5: 'Anche in entrata', 6: 'Memo', 7: 'Chiusura'}
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
