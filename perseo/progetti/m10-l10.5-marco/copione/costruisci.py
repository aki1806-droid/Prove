# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Marco ha ventisei anni, ed e' tecnico di radiologia. Lo vedi al pannello di comando di una TAC, concentrato, con le cuffie appoggiate sul collo."),
 (1,"chiaro",0,"Ha un contratto a tempo determinato di dodici mesi, in un'azienda sanitaria. Sul calendario di casa, la data di fine contratto e' cerchiata in rosso."),
 (1,"chiaro",0,"Il suo pensiero e' semplice: che senso ha aderire a un fondo pensione, se tra un anno potrei essere da un'altra parte? Una domanda ragionevole, che merita una risposta seria."),
 (1,"chiaro",0,"E' la domanda di tantissimi giovani nella sanita' pubblica. Contratti brevi, sostituzioni, graduatorie, e la pensione che sembra lontanissima."),
 (1,"chiaro",0,"Vediamo che cosa risponde il corso, con tre domande in fila: puo' aderire, quanto vale un anno, e che cosa succede alla scadenza."),
 (1,"chiaro",0,"Ricorda: Marco e i suoi numeri sono inventati. E' un caso illustrativo, con un esempio semplificato. Non e' una previsione, ma un ordine di grandezza."),

 (2,"chiaro",0,"Prima domanda: Marco puo' aderire? La risposta e' si'. Anche se il contratto e' breve, e anche se non sa dove sara' tra un anno."),
 (2,"chiaro",0,"Il suo contratto dura piu' di tre mesi, quindi rientra tra i destinatari di Perseo Sirio, come i colleghi a tempo indeterminato."),
 (2,"chiaro",0,"Essendo a tempo determinato, e' in TFR. E aderendo destina al Fondo il cento per cento della quota, nella tasca figurativa."),
 (2,"chiaro",0,"C'e' pero' un dettaglio di tempo, che conviene conoscere prima di firmare. Perche' gli uffici hanno i loro tempi, anche quando la decisione e' presa."),
 (2,"chiaro",0,"Se aderisce troppo vicino alla scadenza, l'ente potrebbe non fare in tempo ad avviare i versamenti."),
 (2,"chiaro",0,'In quel caso i versamenti partirebbero solo dal suo contratto successivo. Per questo il Fondo consiglia di firmare almeno tre mesi prima della fine.'),
 (2,"chiaro",0,'E attenzione: il silenzio-assenso non vale per lui. Riguarda solo gli assunti a tempo indeterminato, come Giulia nella lezione dieci punto tre.'),
 (2,"chiaro",0,"Se Marco vuole aderire, deve farlo esplicitamente, con il modulo. Nessuno lo fara' al posto suo."),

 (3,"chiaro",0,'Seconda domanda: quanto vale, in soldi, un anno di adesione? Facciamo i conti con ventottomila euro di retribuzione utile.'),
 (3,"chiaro",0,"Il suo uno per cento sono duecentottanta euro. Altri duecentottanta li versa l'ente, con il suo uno per cento."),
 (3,"chiaro",0,"E poi il TFR, nella tasca figurativa: circa millenovecentotrentacinque euro, cioe' il sei virgola novantuno per cento della retribuzione utile."),
 (3,"chiaro",0,'Per un anno solo, sono cifre piccole. Nessuno diventa ricco con un contratto di dodici mesi. In tutto, circa duemilacinquecento euro.'),
 (3,"chiaro",0,"Ma l'uno per cento dell'ente, se Marco non aderisce, e' perso per sempre. Non si recupera dopo."),
 (3,"chiaro",0,'E soprattutto, comincia a contare il tempo. Gli anni di partecipazione valgono per i requisiti futuri, e per la scala fiscale.'),
 (3,"chiaro",0,"E non si perdono, se Marco cambia lavoro. A ventisei anni, ogni anno che parte presto e' un anno in piu' a suo favore."),

 (4,"chiaro",0,"Terza domanda, quella che lo preoccupa di piu': che cosa succede alla scadenza del contratto?"),
 (4,"chiaro",0,"Immagina un bivio, alla fine del contratto, con tre strade. Le guardiamo una alla volta. Nessuna e' un vicolo cieco."),
 (4,"chiaro",0,'Primo scenario: Marco viene riassunto, anche in un altro ente pubblico che aderisce al Fondo. La posizione semplicemente continua.'),
 (4,"chiaro",0,"E il TFR resta all'INPS, nella tasca figurativa, perche' la sua iscrizione alla gestione pubblica non si interrompe."),
 (4,"chiaro",0,"Secondo scenario: Marco va a lavorare nel privato, dove c'e' un altro fondo negoziale. Per esempio una clinica, o un centro di diagnostica."),
 (4,"chiaro",0,"Puo' trasferire li' la sua posizione, conservando gli anni di partecipazione. E li' il nuovo datore di lavoro versera' il suo contributo."),
 (4,"chiaro",0,"Terzo scenario: resta per un po' senza lavoro, magari in attesa di una nuova graduatoria."),
 (4,"chiaro",0,"Puo' semplicemente lasciare la posizione in Perseo Sirio, dove continua a essere investita, anche se per un periodo non entra niente."),
 (4,"chiaro",0,"In nessuno dei tre casi, aver aderito gli fa perdere qualcosa. Ogni strada parte da una posizione che e' sua."),

 (5,"chiaro",0,"E se Marco volesse semplicemente riprendersi i soldi? Anche questo si puo' fare, ma conviene sapere il prezzo."),
 (5,"chiaro",0,"Lasciando la pubblica amministrazione, puo' riscattare la posizione. Come hai visto nel modulo otto."),
 (5,"chiaro",0,"La tassazione dipende dalla causa. Per una scelta volontaria, come le dimissioni, e' il ventitre' per cento."),
 (5,"chiaro",0,"Per le cause che non dipendono dalla volonta' delle parti, e' piu' bassa. Il Fondo sapra' indicargli quale si applica al suo caso."),
 (5,"chiaro",0,"Ma riscattando, Marco perde gli anni accumulati. Il contatore torna a zero. Se un giorno aderira' di nuovo, ripartira' da capo."),
 (5,"chiaro",0,"Per un ventiseienne, conservarli vale quasi sempre di piu' di qualche centinaio di euro subito."),

 (6,"profondo",1.2,"Il contratto puo' finire. La tua posizione resta tua, e ti segue."),

 (7,"chiaro",0,'Le tre cose da ricordare dalla storia di Marco, che valgono per tutti i colleghi a tempo determinato.'),
 (7,"chiaro",0,"Uno: anche con un contratto a termine di almeno tre mesi si puo' aderire. E conviene farlo presto."),
 (7,"chiaro",0,"Due: per i tempi determinati non c'e' silenzio-assenso. Bisogna aderire esplicitamente, con il modulo."),
 (7,"chiaro",0,'Tre: alla scadenza la posizione non si perde. Continua, si trasferisce, oppure resta nel Fondo.'),
 (7,"chiaro",0,'La mossa di oggi: se sei a tempo determinato, controlla la data di scadenza del tuo contratto. La trovi nel contratto che hai firmato.'),
 (7,"chiaro",0,"E se decidi di aderire, firma almeno tre mesi prima. Cosi' l'ente fa in tempo ad avviare i versamenti."),
 (7,"chiaro",0,"Nella prossima lezione arriviamo alla fine del corso. Ed e' una fine pratica, da tenere sul tavolo."),
 (7,"chiaro",0,'Mettiamo in fila tutto quello che hai visto in dieci domande da farti, una per una, con la tua situazione davanti.'),
 (7,"chiaro",0,'E vediamo a chi rivolgerti quando una risposta non la trovi da solo. Il Fondo, e chi lavora accanto a te.'),
 (7,"chiaro",0,'[warm] La tua checklist, e chi ti aiuta. Ci vediamo nella lezione dieci punto sei.'),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Apertura', 2: "Puo' aderire?", 3: 'Quanto vale un anno', 4: 'Tre futuri possibili', 5: 'E il riscatto?', 6: 'Memo', 7: 'Chiusura'}
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
