# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,'[warm] Immagina una scala. Per tutta la carriera sali un gradino alla volta, a volte piano e a volte di slancio: gli scatti, le progressioni, un incarico, un passaggio di area.'),
 (1,"chiaro",0,"Il TFS funziona proprio cosi'. Guarda soprattutto l'ultimo gradino che hai raggiunto, e lo moltiplica per gli anni che hai passato a salire."),
 (1,"chiaro",0,"In questa lezione vediamo la formula, senza paura dei numeri. E capiamo chi ci guadagna di piu', e chi un po' meno."),
 (1,"chiaro",0,"Se sei in TFR puoi seguirla comunque: ti servira' per capire i colleghi piu' anziani, e la scelta che molti di loro si trovano davanti."),

 (2,"chiaro",0,"Prima di tutto, i nomi. Il TFS ne ha tre, a seconda del comparto in cui lavori. E questo, da solo, crea gia' parecchia confusione."),
 (2,"chiaro",0,"In sanita', nelle regioni e negli enti locali si chiama indennita' premio di servizio, in sigla IPS. E' quella che riguarda la maggior parte di chi segue questo corso."),
 (2,"chiaro",0,"Nei ministeri, nelle agenzie fiscali e nelle universita' si chiama indennita' di buonuscita. Un nome che molti associano al passato, ma che e' ancora in uso."),
 (2,"chiaro",0,"Negli enti pubblici non economici e nelle camere di commercio si chiama indennita' di anzianita'. Anche qui, il nome racconta da solo la logica: conta quanto tempo sei rimasto."),
 (2,"chiaro",0,"Se non sai quale nome usa il tuo ente, lo trovi spesso nei documenti sul trattamento di fine servizio, oppure basta chiederlo all'ufficio del personale."),
 (2,"chiaro",0,"La logica e' la stessa per tutti: una parte dell'ultima retribuzione, moltiplicata per gli anni di servizio. Cambiano soltanto i coefficienti."),

 (3,"chiaro",0,"Prendiamo l'IPS, e trattiamola come una ricetta di cucina. Gli ingredienti sono tre, e vanno messi nella ciotola in un ordine preciso."),
 (3,"chiaro",0,"Primo ingrediente: si parte dall'ultima retribuzione annua utile. Cioe' quanto guadagni, su base annua, alla fine della carriera."),
 (3,"chiaro",0,"Secondo ingrediente: di quella retribuzione se ne prende l'ottanta per cento. Non tutta, quindi: solo i quattro quinti."),
 (3,"chiaro",0,"Terzo ingrediente: il risultato si divide per quindici. Quello che esce e' una specie di mensilita' di riferimento."),
 (3,"chiaro",0,"Poi questa mensilita' si moltiplica per gli anni di servizio. Ogni anno di lavoro, in pratica, vale una mensilita'."),
 (3,"chiaro",0,"Per la buonuscita dei ministeri il conto e' simile, ma si divide per dodici invece che per quindici. Per l'indennita' di anzianita' si parte dalla retribuzione intera, divisa per dodici."),

 (4,"chiaro",0,"Ora un esempio con numeri tondi. Una lavoratrice della sanita' ha un'ultima retribuzione annua utile di trentamila euro, e trent'anni di servizio."),
 (4,"chiaro",0,"L'ottanta per cento di trentamila fa ventiquattromila euro. Diviso quindici, fa milleseicento euro: e' la sua mensilita' di riferimento."),
 (4,"chiaro",0,"[serious] Milleseicento per trent'anni fa quarantottomila euro lordi di IPS."),
 (4,"chiaro",0,"Facciamo anche la controprova. Con vent'anni di servizio invece di trenta, il risultato sarebbe milleseicento per venti: trentaduemila euro."),
 (4,"chiaro",0,'Sono importi lordi. Sul TFS, come sul TFR, si applica una tassazione separata, con regole sue, che in questa lezione lasciamo da parte.'),
 (4,"chiaro",0,"Una precisazione importante. La retribuzione utile non e' tutto quello che vedi nel cedolino. Comprende solo alcune voci fisse dello stipendio, stabilite dalla legge."),
 (4,"chiaro",0,"Molte indennita' accessorie, anche quelle che vedi ogni mese, possono restare fuori dal calcolo. Per questo il conto fatto a occhio, sul netto in busta paga, di solito sbaglia."),

 (5,"chiaro",0,"Qui sta il punto di forza del TFS. Siccome si calcola sull'ultima retribuzione, premia chi ha un aumento importante verso la fine della carriera."),
 (5,"chiaro",0,'Pensa a una progressione, a un incarico di coordinamento, a un passaggio di area negli ultimi anni di lavoro.'),
 (5,"chiaro",0,"Quell'aumento finale viene, per cosi' dire, applicato a tutti gli anni di servizio, anche a quelli in cui guadagnavi molto meno."),
 (5,"chiaro",0,"Se invece la carriera e' stata piuttosto piatta, con uno stipendio quasi uguale dall'inizio alla fine, questo vantaggio si riduce di molto."),
 (5,"chiaro",0,"Pensa a due colleghe con gli stessi anni di servizio. Una negli ultimi anni fa un salto di stipendio, l'altra no. La prima avra' un TFS piu' alto, perche' parte da una base di calcolo piu' alta."),
 (5,"chiaro",0,"Tienilo a mente. Quando valuteremo se passare dal TFS al TFR aderendo a Perseo Sirio, questa sara' una delle domande da farsi."),
 (5,"chiaro",0,"Come immagino che crescera' il mio stipendio negli ultimi anni? Non serve una risposta precisa: basta un'idea onesta."),

 (6,"chiaro",0,"Un'ultima cosa, che vale per il TFS e anche per il TFR nel pubblico impiego. La liquidazione non arriva il giorno dopo la fine del lavoro."),
 (6,"chiaro",0,"Chi va in pensione di vecchiaia aspetta dodici mesi, piu' tre mesi tecnici per il pagamento."),
 (6,"chiaro",0,"Dal 2027, grazie alla legge di bilancio 2026, l'attesa scende a nove mesi per chi matura i requisiti da quell'anno in poi."),
 (6,"chiaro",0,"Chi si dimette senza andare in pensione aspetta invece ventiquattro mesi, sempre piu' i tempi tecnici."),
 (6,"chiaro",0,"E sopra i cinquantamila euro la somma non arriva tutta insieme: si paga a rate, a un anno di distanza l'una dall'altra."),
 (6,"chiaro",0,"Questi tempi sono quelli delle regole in vigore oggi, e negli anni sono cambiati piu' volte. Prima di uscire dal lavoro conviene sempre verificarli."),
 (6,"chiaro",0,"E' una ragione in piu' per pensare per tempo a come sara' composto il proprio reddito, nei primi anni dopo il lavoro."),

 (7,"profondo",1.2,'Il TFS guarda soprattutto a come finisci la carriera.'),

 (8,"chiaro",0,"Le tre cose da ricordare. Uno: il TFS si chiama IPS, buonuscita o indennita' di anzianita', a seconda del comparto."),
 (8,"chiaro",0,"Due: per l'IPS si prende l'ottanta per cento dell'ultima retribuzione utile, si divide per quindici e si moltiplica per gli anni di servizio."),
 (8,"chiaro",0,"Tre: poiche' guarda all'ultima retribuzione, il TFS premia chi ha aumenti importanti verso fine carriera."),
 (8,"chiaro",0,'La mossa di oggi, solo se sei in TFS: prendi la tua retribuzione tabellare annua lorda di oggi e gli anni di servizio, e fai il conto con la formula che hai visto.'),
 (8,"chiaro",0,"Sara' un conto approssimativo, ma ti dara' un ordine di grandezza. E ti servira' tra due lezioni."),
 (8,"chiaro",0,"[warm] Nella prossima lezione: il TFR, il barattolo che si riempie un po' ogni anno, e che cresce anche quando non ci metti niente."),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Apertura', 2: 'Tre nomi', 3: 'La ricetta', 4: 'Un esempio', 5: 'Chi ci guadagna', 6: 'Quando arriva', 7: 'Memo', 8: 'Chiusura'}
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
