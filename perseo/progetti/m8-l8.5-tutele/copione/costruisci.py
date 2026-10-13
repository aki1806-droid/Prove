# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Ci sono domande che preferiamo non farci. E' normale: nessuno ama pensare a quello che succede quando non ci saremo piu'."),
 (1,"chiaro",0,"Ma farsele per tempo e' un gesto di cura verso chi ci sta vicino. Perche' le risposte, a volte, dipendono da una scelta che possiamo fare solo noi."),
 (1,"chiaro",0,"Che cosa succede alla posizione in Perseo Sirio se l'iscritto muore prima della pensione? Chi la riceve?"),
 (1,"chiaro",0,"E che cosa si puo' fare, oggi, con pochi minuti, perche' vada alle persone giuste?"),
 (1,"chiaro",0,'In questa lezione rispondiamo con calma. E chiudiamo con un tema pratico che riguarda molti lavoratori: la cessione del quinto.'),

 (2,"chiaro",0,"Per i dipendenti pubblici, l'ordine e' fissato dalle regole del Fondo. E' un ordine preciso, a gradini: si scende al gradino successivo solo se quello prima e' vuoto."),
 (2,"chiaro",0,'In caso di decesso prima della pensione, o durante la RITA, la posizione viene riscattata, prima di tutto, dal coniuge.'),
 (2,"chiaro",0,"Se non c'e' il coniuge, la posizione passa ai figli. Il secondo gradino della scala."),
 (2,"chiaro",0,"Se non ci sono nemmeno figli, la posizione va ai genitori, ma solo se erano fiscalmente a carico dell'iscritto."),
 (2,"chiaro",0,"Solo se non c'e' nessuno di loro, la posizione va alle persone che l'iscritto ha designato. E' l'ultimo gradino della scala."),
 (2,"chiaro",0,"E se non c'e' nessuno, nemmeno tra i designati? In quel caso la posizione resta acquisita al Fondo."),
 (2,"chiaro",0,"E' un'eventualita' rara. Ma e' proprio quella che una semplice designazione, fatta per tempo, puo' evitare. Vediamo come."),

 (3,"chiaro",0,"Per chi e' decisiva la designazione, allora? Per chi non ha coniuge, figli o genitori a carico: per loro, e' l'unico modo di scegliere."),
 (3,"chiaro",0,'Pensa a chi vive da solo. A chi convive senza essere sposato, e magari da molti anni.'),
 (3,"chiaro",0,'Oppure a chi vorrebbe lasciare la posizione a un fratello, a una sorella, a un nipote, a una persona cara.'),
 (3,"chiaro",0,"Senza una designazione, queste persone non riceverebbero nulla. Anche se erano le piu' vicine all'iscritto."),
 (3,"chiaro",0,"La designazione si fa online, dall'area riservata, nella sezione dedicata ai soggetti designati. Bastano pochi minuti."),
 (3,"chiaro",0,"Si puo' cambiare in qualsiasi momento, ed e' giusto farlo quando cambia la tua vita. Una nuova relazione, una separazione, una nascita in famiglia."),
 (3,"chiaro",0,'Attenzione a un dettaglio: ogni nuova designazione sostituisce completamente la precedente. Non si aggiunge, la rimpiazza.'),
 (3,"chiaro",0,"Quindi, se vuoi indicare piu' persone, conviene inserirle tutte insieme, nella stessa designazione, e controllare il risultato."),

 (4,"chiaro",0,'E dopo la pensione, che cosa cambia? Le regole che abbiamo visto valgono prima: durante gli anni di lavoro e durante la RITA.'),
 (4,"chiaro",0,'Al pensionamento, se vuoi che dopo di te una persona continui a ricevere qualcosa, lo decidi scegliendo il tipo di rendita.'),
 (4,"chiaro",0,'Per esempio, una rendita reversibile, che prosegue a favore di un beneficiario che indichi tu.'),
 (4,"chiaro",0,'Oppure una rendita controassicurata, che restituisce ai beneficiari il capitale non ancora pagato.'),
 (4,"chiaro",0,'Le vedremo con calma nel modulo nove, insieme alle altre forme di rendita. Sono scelte da fare al momento della pensione, pensando a chi resta.'),
 (4,"chiaro",0,'Sul piano fiscale, il riscatto per decesso gode della tassazione agevolata: dal quindici al nove per cento, sulle somme maturate dal 2018.'),

 (5,"chiaro",0,'Ultimo tema della lezione, e del modulo. Un tema molto concreto, che riguarda tanti colleghi: la cessione del quinto.'),
 (5,"chiaro",0,"Molti lavoratori pubblici hanno un prestito rimborsato con una trattenuta mensile in busta paga. E' la cessione del quinto dello stipendio, molto diffusa nella pubblica amministrazione."),
 (5,"chiaro",0,"Che cosa c'entra con il fondo pensione? Piu' di quanto si pensi. La risposta dipende dal tipo di somma che il Fondo paga."),
 (5,"chiaro",0,'Le prestazioni pensionistiche, compresa la RITA, e le anticipazioni per spese sanitarie sono vincolabili solo nei limiti di un quinto.'),
 (5,"chiaro",0,'I riscatti e le altre anticipazioni, come quella per la prima casa, invece, possono essere usati per intero a garanzia del debito.'),
 (5,"chiaro",0,'In pratica: se chiedi un riscatto con un prestito ancora aperto, il Fondo chiede il via libera alla finanziaria.'),
 (5,"chiaro",0,'Se la finanziaria non lo concede, le somme vanno a estinguere il debito residuo. E a te arriva solo quello che resta.'),
 (5,"chiaro",0,"E alla fine del lavoro, la finanziaria puo' chiedere la liquidazione della posizione solo se il contratto di prestito contiene un'apposita delega, firmata da te."),
 (5,"chiaro",0,'Se hai un prestito in corso, o stai per firmarne uno, leggi con attenzione il contratto. Cerca la parola delega, e chiedi spiegazioni.'),

 (6,"profondo",1.2,'Cinque minuti oggi possono proteggere chi ami domani.'),

 (7,"chiaro",0,'Le tre cose da ricordare. Uno: in caso di decesso di un dipendente pubblico, la posizione va al coniuge, poi ai figli, poi ai genitori a carico, poi alle persone designate.'),
 (7,"chiaro",0,"Due: se non c'e' nessuno di loro, la posizione resta al Fondo. Per questo la designazione e' importante, soprattutto per chi non ha una famiglia stretta."),
 (7,"chiaro",0,'Tre: con un prestito in cessione del quinto, verifica se hai firmato una delega sulla posizione nel fondo pensione.'),
 (7,"chiaro",0,"La mossa di oggi: entra nell'area riservata, nella sezione dei soggetti designati, e verifica che cosa risulta."),
 (7,"chiaro",0,"Se non c'e' nessuno e ne hai bisogno, fai la designazione oggi. Se c'e', controlla che sia ancora quella che vuoi."),
 (7,"chiaro",0,"Si chiude cosi' l'ottavo modulo. Abbiamo visto le anticipazioni, i cambi di lavoro, i trasferimenti, la RITA e le tutele per chi resta."),
 (7,"chiaro",0,'Sono le scelte che si fanno prima della pensione, quando la vita lo richiede. Ora sai quali sono le regole che valgono davvero per i dipendenti pubblici.'),
 (7,"chiaro",0,'Nel prossimo modulo arriviamo finalmente al traguardo del percorso: la pensione complementare vera e propria.'),
 (7,"chiaro",0,"Quando si puo' chiedere, capitale o rendita, le cinque rendite, i tempi di pagamento e come si fa la domanda."),
 (7,"chiaro",0,"E' il momento in cui il salvadanaio si apre, dopo tanti anni di versamenti tuoi, dell'ente e del TFR."),
 (7,"chiaro",0,'[warm] Al pensionamento. Ci vediamo nel modulo nove.'),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Apertura', 2: "L'ordine fissato", 3: 'La designazione', 4: 'Dopo la pensione', 5: 'La cessione del quinto', 6: 'Memo', 7: 'Chiusura'}
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
