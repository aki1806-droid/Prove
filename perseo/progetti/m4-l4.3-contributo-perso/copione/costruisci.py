# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,'[warm] Immagina che ogni mese, sulla tua scrivania, ci sia una busta con il tuo nome.'),
 (1,"chiaro",0,"Dentro c'e' una piccola somma, che il tuo contratto ha previsto per te. Non e' un regalo: e' una parte del tuo trattamento."),
 (1,"chiaro",0,"Per prenderla basta una firma. Se non firmi, la busta resta li', e il mese dopo sparisce. E non torna piu'."),
 (1,"chiaro",0,"Il contributo dell'ente a Perseo Sirio funziona esattamente cosi'. Ogni mese c'e', ma solo per chi firma."),
 (1,"chiaro",0,'In questa lezione vediamo quando spetta, quanto vale davvero nel tempo, e in quali situazioni si perde.'),

 (2,"chiaro",0,"Le regole sono due, e sono scritte nella Nota informativa del Fondo, il documento ufficiale che riassume come funziona e che ricevi al momento dell'adesione."),
 (2,"chiaro",0,"Prima regola: il contributo dell'amministrazione spetta solo a chi e' iscritto al fondo negoziale del proprio contratto. Per noi, Perseo Sirio."),
 (2,"chiaro",0,'Chi non si iscrive non ha diritto a riceverlo in altro modo. Non in busta paga, e non in un altro fondo pensione.'),
 (2,"chiaro",0,"Seconda regola: spetta solo se versi almeno il contributo minimo a tuo carico, l'uno per cento della retribuzione utile al TFR."),
 (2,"chiaro",0,"Detto in positivo: con l'uno per cento tuo, scatta automaticamente l'uno per cento dell'ente. Non devi chiederlo."),
 (2,"chiaro",0,"Se versi di piu', pero', l'ente resta all'uno per cento. Non c'e' un raddoppio di quello che aggiungi: il di piu' e' tutto tuo."),
 (2,"chiaro",0,"E' una differenza importante rispetto ad altri sistemi. Qui il contributo dell'ente e' fisso, e lo sblocca il tuo minimo."),
 (2,"chiaro",0,"Una precisazione: le due regole valgono per tutti. Assunti prima o dopo il 2001, a tempo pieno o part-time, e anche per chi e' entrato per silenzio-assenso."),

 (3,"chiaro",0,"Quanto vale quella busta? Riprendiamo l'esempio della prima lezione: trentamila euro di retribuzione utile all'anno."),
 (3,"chiaro",0,"L'uno per cento dell'ente vale trecento euro l'anno. Sembra poco: venticinque euro al mese."),
 (3,"chiaro",0,"Con altri stipendi cambia la cifra, non la logica. Con venticinquemila euro di retribuzione, l'ente vale duecentocinquanta euro l'anno. Con quarantamila, quattrocento."),
 (3,"chiaro",0,"Torniamo ai trecento euro, e moltiplichiamoli per trent'anni di carriera: novemila euro. Solo di contributi dell'ente, senza contare nient'altro."),
 (3,"chiaro",0,'E questi soldi non restano fermi. Vengono investiti insieme ai tuoi, e producono rendimenti per tutti gli anni che restano nel Fondo.'),
 (3,"chiaro",0,"I rendimenti di oggi, poi, producono altri rendimenti domani. E' l'effetto del tempo che abbiamo visto nel primo modulo."),
 (3,"chiaro",0,"In piu', con gli aumenti contrattuali la retribuzione cresce. E con lei cresce anche l'uno per cento dell'ente."),
 (3,"chiaro",0,"[serious] Novemila euro sono quindi una stima prudente di quanto lascia sul tavolo chi non aderisce. La cifra vera, di solito, e' piu' alta."),

 (4,"chiaro",0,"Ci sono tre situazioni in cui la busta sparisce. Sono tutte scelte che dipendono da te, ed e' per questo che conviene conoscerle. Vediamole una per una."),
 (4,"chiaro",0,"La prima l'abbiamo appena vista: non aderire. Chi resta fuori dal Fondo, il contributo dell'ente non lo vede mai, per tutta la carriera."),
 (4,"chiaro",0,'La seconda: sospendere i propri versamenti. Lo Statuto permette di farlo, con un apposito modulo.'),
 (4,"chiaro",0,"Ma insieme ai tuoi si fermano anche quelli dell'ente. Il TFR figurativo, invece, continua ad accumularsi all'INPS."),
 (4,"chiaro",0,"La terza: trasferire la posizione a un altro fondo pensione. E' possibile dopo tre anni di iscrizione, anche mentre lavori ancora nella pubblica amministrazione."),
 (4,"chiaro",0,"Ma il nuovo fondo non ricevera' il contributo dell'ente. Quello resta legato a Perseo Sirio, e da quel momento non arriva piu' a nessuno."),
 (4,"chiaro",0,"Il messaggio e' semplice. Se il problema e' il costo, invece di sospendere conviene riportare il tuo contributo al minimo."),
 (4,"chiaro",0,"Con il minimo, l'uno per cento dell'ente resta. Con la sospensione, sparisce."),
 (4,"chiaro",0,'Per questo, prima di sospendere o trasferire, conviene sempre fare due conti. E magari chiedere un parere al Fondo o al sindacato.'),

 (5,"chiaro",0,"Un caso diverso e' quello in cui sei tu a non ricevere lo stipendio. Qui non si tratta di una tua scelta sul Fondo."),
 (5,"chiaro",0,"Per esempio un'aspettativa non retribuita, per motivi personali o familiari, o un periodo di sospensione dal servizio senza assegni."),
 (5,"chiaro",0,"In questo caso lo Statuto prevede che si sospendano tutte le contribuzioni al Fondo: la tua, quella dell'ente e l'accantonamento figurativo del TFR."),
 (5,"chiaro",0,"Riprendono tutte al rientro in servizio, senza che tu debba fare nulla. E in questo caso non si perde niente di cio' che spettava."),
 (5,"chiaro",0,"Se invece l'assenza e' coperta da un trattamento economico, anche ridotto, i contributi tuoi e dell'ente continuano a essere versati, secondo le regole del Fondo."),
 (5,"chiaro",0,"In questi casi non devi fare nulla: e' l'amministrazione a comunicarlo al Fondo. Ma puoi sempre controllare nel prospetto annuale che i versamenti risultino."),

 (6,"chiaro",0,"Ricorda la busta sulla scrivania. Non e' un premio da meritare: e' una parte del tuo contratto."),
 (6,"chiaro",0,'Il contratto la mette a disposizione ogni mese, a te come a ogni collega. Sta a te decidere se prenderla, e da quando.'),
 (6,"chiaro",0,"E se l'hai gia' presa, sta a te non lasciarla cadere per una sospensione fatta in fretta."),

 (7,"profondo",1.2,"Se devi risparmiare, riduci al minimo. Non fermarti: perderesti anche l'ente."),

 (8,"chiaro",0,"Le tre cose da ricordare. Uno: il contributo dell'ente spetta solo a chi aderisce al fondo negoziale del proprio contratto."),
 (8,"chiaro",0,"Due: scatta se versi almeno l'uno per cento. Versare di piu' conviene per altri motivi, ma non lo fa crescere."),
 (8,"chiaro",0,'Tre: si perde se sospendi i versamenti, o se trasferisci la posizione ad altro fondo mentre lavori nella pubblica amministrazione.'),
 (8,"chiaro",0,"La mossa di oggi: prendi la tua retribuzione lorda annua, calcola l'uno per cento e moltiplicalo per gli anni che ti mancano alla pensione."),
 (8,"chiaro",0,"E' il valore della busta sulla tua scrivania, senza contare i rendimenti e gli aumenti di stipendio. Un numero prudente, ma gia' significativo."),
 (8,"chiaro",0,"Se non hai ancora aderito, quel numero e' quanto stai lasciando sul tavolo. Se hai aderito, e' quanto stai gia' mettendo da parte."),
 (8,"chiaro",0,'[warm] Nella prossima lezione: come aumentare, ridurre o integrare i versamenti.'),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Apertura', 2: 'Quando spetta', 3: 'Quanto vale', 4: 'Tre modi per perderlo', 5: 'Quando manca lo stipendio', 6: 'La busta', 7: 'Memo', 8: 'Chiusura'}
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
