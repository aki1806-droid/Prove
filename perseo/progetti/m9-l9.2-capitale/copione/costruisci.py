# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Un secchio d'acqua, o una fontana? Immagina di dover scegliere tra queste due cose, per il resto della tua vita."),
 (1,"chiaro",0,"Con il secchio hai tutta l'acqua subito, e decidi tu come usarla: per bere, per lavare, per annaffiare. Ma quando e' vuoto, e' vuoto."),
 (1,"chiaro",0,'Con la fontana hai poca acqua alla volta. Ma scorre sempre, giorno dopo giorno, per tutto il tempo che serve.'),
 (1,"chiaro",0,"Al pensionamento, la posizione in Perseo Sirio puo' diventare l'una o l'altra cosa. Un capitale, cioe' una somma unica."),
 (1,"chiaro",0,"Oppure una rendita, cioe' un assegno periodico pagato per tutta la vita. O, piu' spesso, un po' di entrambe le cose."),
 (1,"chiaro",0,'In questa lezione vediamo le regole: quanto puoi prendere subito, quando puoi prendere tutto, e come scegliere con la testa.'),

 (2,"chiaro",0,"Partiamo dalla regola generale. E' semplice da ricordare, e vale per la grande maggioranza degli iscritti al Fondo."),
 (2,"chiaro",0,"Al momento della pensione puoi ricevere in capitale al massimo il cinquanta per cento della posizione. La meta', non di piu'."),
 (2,"chiaro",0,"Il resto viene trasformato in una rendita vitalizia, cioe' un assegno pagato per tutta la vita, da quel momento in poi."),
 (2,"chiaro",0,"Puoi scegliere di prendere meno capitale e piu' rendita. Per esempio un quarto in capitale e tre quarti in rendita."),
 (2,"chiaro",0,"Puoi anche scegliere di trasformare tutta la posizione in rendita, senza prendere nulla in capitale. E' una scelta che massimizza l'assegno."),
 (2,"chiaro",0,"Quello che non puoi fare e' superare la meta' in capitale. Il cursore si muove liberamente verso la rendita, ma dall'altra parte si ferma a meta'."),
 (2,"chiaro",0,"Il motivo e' nella natura stessa del fondo pensione. Deve servire a integrare il reddito per tutta la vecchiaia, non solo nei primi anni."),
 (2,"chiaro",0,"Se si potesse prendere tutto subito, sarebbe un semplice risparmio. Invece e' una pensione, e la pensione dura quanto dura la vita."),

 (3,"chiaro",0,"C'e' pero' un'eccezione importante, pensata per chi arriva alla pensione con una posizione piccola. Per esempio chi ha aderito tardi."),
 (3,"chiaro",0,"Se trasformando meta' della posizione in rendita si ottiene un assegno annuo piu' basso della meta' dell'assegno sociale, cambia tutto."),
 (3,"chiaro",0,"In quel caso puoi ricevere tutta la posizione in capitale, senza penalizzazioni fiscali. Tutta l'acqua, in un secchio solo."),
 (3,"chiaro",0,'Ha senso: una rendita troppo piccola sarebbe poco utile, e un assegno di pochi euro al mese non cambierebbe la vita a nessuno.'),
 (3,"chiaro",0,"Facciamo i conti con i numeri di oggi. Nel 2026 l'assegno sociale vale settemilacentouno euro l'anno, pagati in tredici mensilita'."),
 (3,"chiaro",0,"La meta' e' circa tremilacinquecentocinquanta euro l'anno. E' questa la soglia da confrontare con la tua rendita."),
 (3,"chiaro",0,"In altre parole, se la rendita che otterresti con meta' della posizione e' inferiore a circa trecento euro al mese, puoi prendere tutto subito."),
 (3,"chiaro",0,"Quanto capitale serva per superare questa soglia dipende dall'eta' al pensionamento e dai coefficienti della compagnia che paga la rendita."),
 (3,"chiaro",0,'Non serve fare il calcolo a mano: il simulatore del Fondo te lo dice con precisione, partendo dalla tua posizione.'),

 (4,"chiaro",0,"E se invece la tua posizione supera la soglia? Allora la scelta e' tua. Come scegliere tra il secchio e la fontana?"),
 (4,"chiaro",0,"Il capitale e' utile se hai spese importanti al momento della pensione. Un mutuo da chiudere, una casa da sistemare, un aiuto ai figli."),
 (4,"chiaro",0,"E' disponibile subito, e lo usi come vuoi. Ma va gestito con attenzione, anno dopo anno: una volta speso, non torna piu'."),
 (4,"chiaro",0,"La rendita, invece, ti protegge da un rischio che spesso sottovalutiamo, perche' sembra una buona notizia: vivere piu' a lungo del previsto."),
 (4,"chiaro",0,"Pensaci: nessuno sa quanti anni avra' davanti. E chi vive a lungo rischia di vedere finire i propri risparmi prima di se'."),
 (4,"chiaro",0,"La rendita arriva ogni mese, finche' vivi, e si rivaluta ogni anno. E non ti chiede nessuna scelta da fare, anno dopo anno."),
 (4,"chiaro",0,'Per questo molti scelgono una combinazione. Una parte di capitale per le esigenze immediate, e una rendita come integrazione stabile.'),
 (4,"chiaro",0,"Un'integrazione che si aggiunge, ogni mese, alla pensione pubblica. Ed e' proprio questo lo scopo per cui hai versato tutti quegli anni."),

 (5,"chiaro",0,"E le tasse? Qui c'e' una buona notizia: per le somme maturate dal 2018, capitale e rendita scendono la stessa scala."),
 (5,"chiaro",0,'Dal quindici al nove per cento, in base agli anni di partecipazione. Il secchio e la fontana si fermano allo stesso gradino.'),
 (5,"chiaro",0,"Per le parti piu' vecchie della posizione valgono le regole degli strati, che hai visto nella lezione cinque punto cinque."),
 (5,"chiaro",0,"Un'aggiunta da conoscere: le rivalutazioni annuali della rendita, una volta in pagamento, sono tassate al ventisei per cento."),

 (6,"profondo",1.2,'Il capitale si usa una volta. La rendita ti accompagna per tutta la vita.'),

 (7,"chiaro",0,"Le tre cose da ricordare. Uno: al pensionamento puoi prendere in capitale al massimo meta' della posizione."),
 (7,"chiaro",0,"Il resto diventa rendita vitalizia, pagata per tutta la vita. E puoi sempre scegliere di prendere piu' rendita, fino a tutta la posizione."),
 (7,"chiaro",0,"Due: se la rendita di meta' posizione e' sotto la meta' dell'assegno sociale, cioe' circa trecento euro al mese, puoi prendere tutto in capitale."),
 (7,"chiaro",0,"Tre: la rendita ti protegge dal rischio di vivere piu' a lungo dei tuoi risparmi. Arriva finche' vivi, e si rivaluta ogni anno."),
 (7,"chiaro",0,'La mossa di oggi: vai sul sito del Fondo, nella pagina dedicata alla rendita, e prova il simulatore. Bastano pochi minuti.'),
 (7,"chiaro",0,"Inserisci l'ultimo valore della tua posizione. Lo trovi nell'area riservata o nel prospetto annuale: e' il punto di partenza di tutti i conti."),
 (7,"chiaro",0,"Vedrai quanto vale oggi la tua rendita, in euro al mese. E' un numero che rende tutto molto piu' concreto."),
 (7,"chiaro",0,"Nella prossima lezione entriamo nel dettaglio della fontana: perche' le rendite non sono tutte uguali."),
 (7,"chiaro",0,"Perseo Sirio ne offre cinque tipi, e ognuno risponde a un'esigenza diversa: dalla persona sola alla coppia, a chi teme di perdere l'autosufficienza."),
 (7,"chiaro",0,"Vedremo come funzionano, che cosa cambia nell'importo dell'assegno, e come scegliere quella giusta per la tua situazione familiare."),
 (7,"chiaro",0,'[warm] Le cinque rendite. Ci vediamo nella lezione nove punto tre.'),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Apertura', 2: 'La regola del cinquanta per cento', 3: "L'eccezione per le posizioni piccole", 4: 'Come scegliere', 5: 'Le tasse', 6: 'Memo', 7: 'Chiusura'}
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
