# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Quando compri un frigorifero, guardi l'etichetta energetica. Una lettera, un colore, e capisci subito se consuma tanto o poco."),
 (1,"chiaro",0,'Non devi capire come funziona il compressore. Basta quella lettera per confrontarlo con gli altri frigoriferi del negozio.'),
 (1,"chiaro",0,"Per i fondi pensione esiste qualcosa di simile. Non e' una lettera, ma un numero. Si chiama ISC: Indicatore sintetico dei costi."),
 (1,"chiaro",0,"E' un numero solo, calcolato allo stesso modo da tutti i fondi italiani, che permette di confrontarli a colpo d'occhio."),
 (1,"chiaro",0,"In questa lezione impariamo a leggerlo, a capire perche' e' cosi' importante, e a sapere dove trovarlo."),

 (2,"chiaro",0,"Come si calcola l'ISC? Con una regola stabilita dalla COVIP, la commissione che vigila sui fondi pensione. Ed e' uguale per tutti."),
 (2,"chiaro",0,"Si immagina un aderente tipo, sempre lo stesso per tutti i fondi. Un aderente un po' teorico, ma utile per fare i confronti."),
 (2,"chiaro",0,"Questo aderente versa duemilacinquecento euro l'anno, con un rendimento ipotetico del quattro per cento. Non e' una previsione: e' solo un'ipotesi comune, per fare i conti."),
 (2,"chiaro",0,'Poi si mettono insieme tutti i costi che sosterrebbe: la quota associativa e i costi sul patrimonio, quelli della lezione precedente.'),
 (2,"chiaro",0,'Tutto entra in un imbuto, e ne esce un solo numero: il costo annuo, espresso in percentuale della posizione.'),
 (2,"chiaro",0,"Il calcolo si fa per quattro durate: due, cinque, dieci e trentacinque anni di permanenza nel fondo. Cosi' si vede come cambia il costo nel tempo."),
 (2,"chiaro",0,"Proprio perche' le ipotesi sono uguali per tutti, l'ISC permette di confrontare fondi diversi in modo equo. Come l'etichetta del frigorifero."),

 (3,"chiaro",0,"Ecco allora l'ISC dei tre comparti di Perseo Sirio, dalla scheda «I costi» della Nota informativa in vigore dal ventisette marzo 2026."),
 (3,"chiaro",0,"Guarda la tabella da sinistra a destra, colonna per colonna, e nota una cosa: per tutti e tre i comparti, l'ISC scende man mano che gli anni aumentano."),
 (3,"chiaro",0,"Il Garantito passa dallo zero virgola ottantasette per cento su due anni, allo zero virgola cinquantatre' su trentacinque anni."),
 (3,"chiaro",0,"L'Obbligazionario passa dallo zero virgola cinquantatre' allo zero virgola venti per cento."),
 (3,"chiaro",0,"L'Azionario, infine, passa dallo zero virgola cinquantotto allo zero virgola ventiquattro per cento."),
 (3,"chiaro",0,"Perche' scende? Perche' la quota associativa e' fissa. Pesa molto quando la posizione e' piccola, e sempre meno quando la posizione cresce."),
 (3,"chiaro",0,'Tredici euro su poche centinaia di euro sono tanti. Tredici euro su decine di migliaia di euro sono quasi niente.'),
 (3,"chiaro",0,"E i profili bilanciati? Il loro costo e' una via di mezzo tra quelli dei comparti che li compongono, in proporzione a quanto pesa ciascuno."),
 (3,"chiaro",0,"Per confrontare forme diverse, di solito si guarda l'ISC a dieci anni. Per Perseo Sirio va dallo zero virgola ventisette allo zero virgola sessanta per cento."),

 (4,"chiaro",0,"Ma perche' questo numero e' cosi' importante? In fondo, sono tutte percentuali con lo zero davanti. Non lo diciamo noi."),
 (4,"chiaro",0,'Lo dice la stessa avvertenza che la COVIP impone di scrivere in ogni Nota informativa, di ogni forma pensionistica.'),
 (4,"chiaro",0,"Un ISC del due per cento, invece dell'uno per cento, dopo trentacinque anni puo' ridurre il capitale accumulato di circa il diciotto per cento."),
 (4,"chiaro",0,'Per esempio: invece di centomila euro, ottantaduemila euro. Diciottomila euro in meno, solo per un punto di costi.'),
 (4,"chiaro",0,"Un punto percentuale l'anno sembra niente: un euro ogni cento. Ma e' un punto che si toglie ogni anno, per decenni, su tutta la posizione."),
 (4,"chiaro",0,'E che si porta via anche i rendimenti che quel denaro avrebbe prodotto, se fosse rimasto nella tua posizione.'),
 (4,"chiaro",0,"E' l'interesse composto, ma al contrario: lo stesso meccanismo che fa crescere i risparmi, fa crescere anche il peso dei costi."),

 (5,"chiaro",0,"Dove si confronta l'ISC? Ci sono due strumenti, ed entrambi sono pubblici e gratuiti. Non serve chiedere a nessuno, ne' iscriversi da qualche parte."),
 (5,"chiaro",0,"Il primo: sul sito della COVIP c'e' un comparatore dei costi di tutte le forme pensionistiche. Scegli la forma, il comparto, e leggi l'ISC."),
 (5,"chiaro",0,"Il secondo: nella scheda costi di ogni Nota informativa, un grafico mostra l'ISC di quel fondo accanto alle medie."),
 (5,"chiaro",0,'Le medie sono tre: quella dei fondi negoziali, come Perseo Sirio, quella dei fondi aperti, e quella dei piani individuali pensionistici, i PIP.'),
 (5,"chiaro",0,"Un consiglio pratico: quando qualcuno ti propone una forma pensionistica, chiedi l'ISC a dieci anni."),
 (5,"chiaro",0,"E confrontalo con quello di Perseo Sirio. E' una domanda a cui chiunque venda un prodotto serio deve saper rispondere."),
 (5,"chiaro",0,"Se la risposta non arriva, o arriva vaga e piena di giri di parole, anche quella e' un'informazione utile."),

 (6,"profondo",1.2,"Qualunque fondo ti propongano, la prima domanda e' una sola: qual e' l'ISC?"),

 (7,"chiaro",0,"Le tre cose da ricordare. Uno: l'ISC riassume in un solo numero tutti i costi di un fondo pensione."),
 (7,"chiaro",0,"Due: e' calcolato con la stessa regola per tutti i fondi, con lo stesso aderente tipo. Quindi serve proprio a confrontare."),
 (7,"chiaro",0,"Tre: un ISC piu' alto di un punto puo' ridurre il capitale finale di quasi un quinto, in trentacinque anni."),
 (7,"chiaro",0,'La mossa di oggi: apri il comparatore dei costi sul sito della COVIP, e cerca Perseo Sirio.'),
 (7,"chiaro",0,'Guarda dove si colloca rispetto alle medie dei fondi negoziali, dei fondi aperti e dei piani individuali.'),
 (7,"chiaro",0,'Poi guarda il comparto del tuo profilo, e il suo ISC a dieci anni. Annotalo accanto alla quota associativa della lezione precedente.'),
 (7,"chiaro",0,'Non serve diventare esperti di finanza. Basta sapere quale numero guardare, dove trovarlo, e con quali altri numeri confrontarlo.'),
 (7,"chiaro",0,"Le percentuali, pero', da sole dicono poco. Lo zero virgola qualcosa non fa effetto a nessuno, e si dimentica in fretta."),
 (7,"chiaro",0,'Nella prossima lezione traduciamo tutto questo in euro. In euro veri, quelli che restano nella tua posizione.'),
 (7,"chiaro",0,"Vedremo quanto puo' valere una differenza di costo che sembra piccolissima, dopo trent'anni di versamenti."),
 (7,"chiaro",0,'[warm] Lo zero virgola cinque che vale migliaia di euro. Ci vediamo nella lezione sette punto tre.'),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Apertura', 2: 'Come si calcola', 3: "L'ISC di Perseo Sirio", 4: "Perche' conta", 5: 'Dove si confronta', 6: 'Memo', 7: 'Chiusura'}
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
