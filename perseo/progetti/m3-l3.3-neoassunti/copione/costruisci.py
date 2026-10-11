# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,'[warm] Il primo giorno di lavoro ti consegnano tutto: la divisa, il badge, i turni. E una cartellina piena di fogli da leggere.'),
 (1,"chiaro",0,"Tra quei fogli, se sei stato assunto in una pubblica amministrazione dal 2019 in poi, ce n'e' uno che parla di Perseo Sirio."),
 (1,"chiaro",0,"Spesso finisce in fondo allo zaino, sotto il resto. Ed e' comprensibile: il primo giorno si pensa a tutt'altro."),
 (1,"chiaro",0,"Magari conosci anche tu qualche collega che si e' ritrovato iscritto senza ricordarsi perche'. Oggi capiamo come succede."),
 (1,"chiaro",0,"Il problema e' che quel foglio fa partire un orologio. E se non fai nulla, dopo qualche mese sarai iscritto al Fondo."),
 (1,"chiaro",0,"Non e' un errore, e non e' un trucco: e' una regola precisa, scritta in un accordo tra le parti. Vediamola con calma."),
 (1,"chiaro",0,"Questa lezione riguarda soprattutto chi e' appena arrivato, ma serve anche a chi lavora accanto a loro, ogni giorno."),

 (2,"chiaro",0,"La regola nasce da un accordo del settembre 2021 tra l'ARAN e i sindacati, poi ripreso dai contratti di lavoro."),
 (2,"chiaro",0,'Riguarda i dipendenti pubblici dei comparti di Perseo Sirio assunti a tempo indeterminato dal 2019 in poi.'),
 (2,"chiaro",0,"Vale per sanita', funzioni locali e funzioni centrali, cioe' per gli stessi comparti che abbiamo visto nella prima lezione del modulo."),
 (2,"chiaro",0,"Per chi era gia' in servizio prima di quella data, invece, resta l'adesione volontaria con il modulo, quella della lezione precedente."),
 (2,"chiaro",0,"Il principio si chiama silenzio-assenso. Al momento dell'assunzione ti viene data un'informativa sul Fondo, e da li' hai un periodo di tempo per decidere."),
 (2,"chiaro",0,"Se scegli, la tua scelta vale, qualunque sia. Se non dici nulla, il tuo silenzio vale come un si'."),
 (2,"chiaro",0,"L'obiettivo e' che nessuno resti fuori dal Fondo solo perche' non ne ha mai sentito parlare. Ma resta sempre libero di dire no."),

 (3,"chiaro",0,"Ecco l'orologio, tappa per tappa. Dalla data dell'informativa, consegnata con l'assunzione, hai sei mesi per scegliere. Puoi aderire, oppure puoi dire esplicitamente di no. Entrambe le scelte chiudono la questione."),
 (3,"chiaro",0,"Se in quei sei mesi non dici niente, alla scadenza l'amministrazione comunica al Fondo i tuoi dati. Solo i dati di chi non ha scelto."),
 (3,"chiaro",0,'A quel punto il Fondo ti scrive, e ti avvisa che hai altri trenta giorni per tirarti indietro. Se passano anche quei trenta giorni senza risposta, sei iscritto per silenzio-assenso.'),
 (3,"chiaro",0,"L'iscrizione decorre dal primo giorno del mese successivo alla scadenza dei sei mesi, e da li' parte anche la contribuzione."),
 (3,"chiaro",0,'Sei mesi, poi trenta giorni. Sono le due cifre da ricordare, e da far ricordare ai colleghi appena arrivati.'),
 (3,"chiaro",0,"In tutto, quindi, passano circa sette mesi tra l'informativa e l'iscrizione automatica. C'e' tutto il tempo per pensarci, se lo si sa."),

 (4,"chiaro",0,"E che cosa succede, in concreto, a chi entra cosi'? Diventa un iscritto come gli altri, con la contribuzione piena prevista dal contratto."),
 (4,"chiaro",0,"L'uno per cento suo e l'uno per cento dell'ente nella tasca reale. Il TFR nella tasca figurativa, all'INPS, come abbiamo visto nel modulo due."),
 (4,"chiaro",0,"E' una differenza importante rispetto al settore privato, dove il silenzio-assenso porta al fondo solo il TFR."),
 (4,"chiaro",0,"I soldi vengono investiti nel profilo Garantito. E' il profilo piu' prudente, pensato proprio per chi non ha fatto una scelta attiva."),
 (4,"chiaro",0,"Per un ventenne o un trentenne, pero', potrebbe non essere il piu' adatto, con tanti anni davanti. Il Garantito protegge il capitale, ma in cambio, di solito, nel lungo periodo rende meno degli altri profili."),
 (4,"chiaro",0,"Nulla vieta di cambiarlo dall'area riservata, e lo vedremo nel modulo sei."),
 (4,"chiaro",0,"E come ogni iscritto, anche chi aderisce per silenzio-assenso puo' aumentare il proprio contributo, designare i beneficiari, consultare la posizione."),

 (5,"chiaro",0,"Le strade, quindi, sono tre. E partono tutte dallo stesso punto: hai ricevuto l'informativa."),
 (5,"chiaro",0,'Ognuna ha conseguenze diverse sulla busta paga, sul profilo di investimento e sulla liquidazione. Vediamole una per una.'),
 (5,"chiaro",0,'Prima strada: aderisci subito, con il modulo, e scegli tu il profilo e la percentuale da versare.'),
 (5,"chiaro",0,"Seconda strada: dici no per iscritto, e resti fuori, sapendo che potrai comunque aderire piu' avanti, quando vorrai."),
 (5,"chiaro",0,'Terza strada: non fai nulla, e ti ritrovi iscritto con le impostazioni di base, nel profilo Garantito.'),
 (5,"chiaro",0,"[serious] Nessuna delle tre e' sbagliata in se'. Quello che conviene evitare e' la terza strada presa per distrazione. Una scelta consapevole, anche se e' un no, e' sempre meglio di un si' capitato per caso."),

 (6,"chiaro",0,'Un consiglio pratico, soprattutto se hai colleghi appena arrivati in reparto o in ufficio.'),
 (6,"chiaro",0,"Il giorno dell'assunzione, segna sul calendario la data dei sei mesi. Basta un promemoria sul telefono, magari con un avviso un mese prima, per non arrivare all'ultimo giorno."),
 (6,"chiaro",0,"Prima di quella data, leggi l'informativa e, se hai dubbi, chiedi al Fondo o al delegato sindacale del tuo posto di lavoro."),
 (6,"chiaro",0,'Il Fondo offre anche consulenze gratuite, al telefono o su appuntamento, proprio per rispondere a domande come queste.'),
 (6,"chiaro",0,'Sono sei mesi: abbastanza per decidere con calma, troppo pochi per lasciarli passare senza accorgersene. Tra turni, ferie e primi giorni di lavoro, il tempo vola.'),
 (6,"chiaro",0,"E se sei tu il collega esperto, ricordalo ai nuovi. E' una delle informazioni piu' utili che puoi dare a chi comincia."),

 (7,"profondo",1.2,"Per un neoassunto, anche non scegliere e' una scelta."),

 (8,"chiaro",0,'Le tre cose da ricordare. Uno: per i dipendenti pubblici assunti a tempo indeterminato dal 2019 vale il silenzio-assenso.'),
 (8,"chiaro",0,"Due: hai sei mesi dall'informativa per scegliere, e altri trenta giorni per ripensarci dopo l'avviso del Fondo."),
 (8,"chiaro",0,"Tre: chi entra per silenzio-assenso parte dal profilo Garantito, ma puo' cambiarlo quando vuole."),
 (8,"chiaro",0,"La mossa di oggi: se sei stato assunto da meno di sei mesi, trova l'informativa ricevuta all'assunzione e segna la scadenza sul calendario."),
 (8,"chiaro",0,"Se invece sei gia' iscritto per silenzio-assenso, annota di rivedere il tuo profilo dopo il modulo sei."),
 (8,"chiaro",0,"E se un collega ti chiede come mai e' iscritto senza aver firmato nulla, adesso sai cosa rispondergli."),
 (8,"chiaro",0,'[warm] Nella prossima lezione: un caso speciale, la polizia locale.'),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Apertura', 2: 'La regola', 3: "L'orologio", 4: "Chi entra cosi'", 5: 'Tre strade', 6: 'Un consiglio', 7: 'Memo', 8: 'Chiusura'}
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
