# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Aderire a un fondo pensione sembra una pratica complicata, di quelle che si rimandano. In realta' e' un sentiero con poche tappe, ben segnate."),
 (1,"chiaro",0,"Il segreto e' non saltarne nessuna, e sapere in anticipo quali scelte ti verranno chieste. Cosi' non decidi di fretta, davanti a un modulo."),
 (1,"chiaro",0,'In questa lezione percorriamo il sentiero insieme, dalla prima lettura fino alla lettera di conferma del Fondo.'),
 (1,"chiaro",0,"Le tappe sono cinque. Leggere i documenti. Rispondere al questionario. Compilare il modulo. Farlo firmare all'amministrazione. Ricevere la conferma."),

 (2,"chiaro",0,"Prima tappa: leggere. Non e' una formalita', anche se a molti sembra tale. E' il momento in cui capisci che cosa stai firmando."),
 (2,"chiaro",0,"Il Fondo chiede di leggere, prima di aderire, due documenti. Il primo sono le Informazioni chiave per l'aderente, cioe' la prima parte della Nota informativa."),
 (2,"chiaro",0,"Il secondo e' l'appendice sulla sostenibilita', che spiega come il Fondo tiene conto di ambiente e societa' nei suoi investimenti."),
 (2,"chiaro",0,'Insieme trovi anche un documento che si chiama La mia pensione complementare, con una proiezione standardizzata di quanto potresti ricevere.'),
 (2,"chiaro",0,"Non serve leggerle tutte d'un fiato. Bastano le prime pagine per capire chi sei come iscritto, quanto costa il Fondo e quali scelte avrai davanti."),
 (2,"chiaro",0,'Sono pagine scritte secondo un modello uguale per tutti i fondi. Proprio per questo, se vuoi, puoi confrontare Perseo Sirio con altre forme.'),

 (3,"chiaro",0,"Seconda tappa: il questionario di autovalutazione. Sono poche domande su di te, e servono a te piu' che al Fondo."),
 (3,"chiaro",0,'Ti chiede quanti anni ti mancano alla pensione, quanta oscillazione dei risparmi sei disposto a sopportare, e se hai altre forme di risparmio.'),
 (3,"chiaro",0,"E ti chiede che cosa conosci della previdenza e degli investimenti. Non e' un esame, e non c'e' una risposta giusta."),
 (3,"chiaro",0,"Serve a orientarti verso il profilo di investimento piu' coerente con la tua situazione. I profili li vedremo con calma nel modulo sei."),
 (3,"chiaro",0,"Per ora basta sapere che il questionario esiste, e che va compilato con sincerita'. Una risposta di comodo ti porta verso un profilo sbagliato."),

 (4,"chiaro",0,'Terza tappa: il modulo di adesione. Il Fondo chiede di compilarlo solo in formato digitale, scaricandolo dal sito oppure con la pre-adesione online.'),
 (4,"chiaro",0,"Ecco le scelte che ti verranno chieste. La prima: quanto versare. Il minimo e' l'uno per cento della retribuzione utile."),
 (4,"chiaro",0,"Ed e' proprio la soglia che fa scattare l'uno per cento dell'ente. Puoi indicare anche di piu', e cambiare idea piu' avanti."),
 (4,"chiaro",0,"Un consiglio: se puoi, non fermarti al minimo per abitudine. Anche mezzo punto in piu', su molti anni, fa una differenza visibile."),
 (4,"chiaro",0,'La seconda scelta: il profilo di investimento, quello verso cui ti ha orientato il questionario.'),
 (4,"chiaro",0,'La terza, solo se sei in TFS: la conferma del passaggio al TFR, che abbiamo visto nel modulo due.'),
 (4,"chiaro",0,"E, se vuoi, le persone a cui andra' la posizione in caso di decesso. Si possono indicare anche dopo, ma conviene pensarci subito."),
 (4,"chiaro",0,"[serious] Attenzione: compilare il modulo online non basta per essere iscritti. Il Fondo lo dice chiaramente. Manca ancora la tappa piu' importante."),

 (5,"chiaro",0,"Quarta tappa: l'amministrazione. Il modulo compilato va firmato da te e consegnato al tuo ente."),
 (5,"chiaro",0,"L'ente completa la sua parte, lo data, lo firma e lo trasmette al Fondo con la posta elettronica certificata, all'indirizzo dedicato alle adesioni."),
 (5,"chiaro",0,"Tu conservane sempre una copia completa e firmata. E' la prova della tua scelta, e della data in cui l'hai fatta."),
 (5,"chiaro",0,"Questa data, infatti, e' decisiva. L'iscrizione decorre dalla firma del datore di lavoro, non dalla tua."),
 (5,"chiaro",0,"E i versamenti partono dal primo giorno del mese successivo al timbro. Se l'ente firma il 20 marzo, i versamenti partono ad aprile."),
 (5,"chiaro",0,"Per questo conviene consegnare il modulo appena hai deciso, e verificare che l'ufficio lo abbia davvero inviato. Ogni mese di ritardo e' un mese in meno."),
 (5,"chiaro",0,"Un modulo dimenticato in un cassetto non fa partire nulla. Dopo qualche settimana, chiedi conferma all'ufficio: e' una domanda legittima."),
 (5,"chiaro",0,"Quinta tappa: entro qualche settimana il Fondo ti invia una lettera di conferma, con i dati per accedere all'area riservata. Da li' puoi seguire la tua posizione."),

 (6,"chiaro",0,"Un percorso a parte e' previsto per chi lavora in ministeri, agenzie fiscali o altri enti il cui stipendio e' gestito dal portale NoiPA."),
 (6,"chiaro",0,"Qui l'adesione si fa solo online, dal portale, nella sezione dei servizi self-service dedicata alla previdenza complementare. Non sono accettati moduli cartacei."),
 (6,"chiaro",0,"Per entrare nel portale servono le tue credenziali personali, le stesse con cui consulti il cedolino. Il percorso e' guidato, schermata dopo schermata."),
 (6,"chiaro",0,'Dentro trovi le informazioni chiave da scaricare, il questionario e le stesse scelte del modulo. Le tappe, quindi, sono le stesse.'),
 (6,"chiaro",0,'Per confermare serve il PIN dispositivo, un codice di cinque cifre che si richiede al proprio ufficio del personale.'),
 (6,"chiaro",0,'E per le adesioni fatte tramite NoiPA la legge prevede anche il diritto di ripensarci entro trenta giorni.'),
 (6,"chiaro",0,"Se lavori in sanita' o in un ente locale, invece, il percorso e' quello del modulo da far firmare. Nel dubbio, chiedi al tuo ufficio del personale quale vale per te."),

 (7,"profondo",1.2,'Compilare non basta. Sei iscritto quando il tuo ente ha firmato.'),

 (8,"chiaro",0,'Le tre cose da ricordare. Uno: prima di aderire si leggono le informazioni chiave e si compila il questionario.'),
 (8,"chiaro",0,"Due: nel modulo scegli quanto versare, almeno l'uno per cento per avere il contributo dell'ente, il profilo di investimento e i beneficiari."),
 (8,"chiaro",0,"Tre: l'iscrizione scatta con la firma dell'amministrazione, e i versamenti dal mese dopo. Chi e' su NoiPA aderisce solo online."),
 (8,"chiaro",0,"La mossa di oggi: vai sul sito del Fondo, nella sezione dei documenti per l'adesione, e scarica le informazioni chiave per l'aderente."),
 (8,"chiaro",0,"Leggile con calma, anche solo la prima pagina. Ti accorgerai che sono piu' chiare di quanto immagini."),
 (8,"chiaro",0,"E se hai gia' aderito, controlla di avere la copia firmata del tuo modulo, e la lettera di conferma del Fondo. Sono i due documenti da conservare."),
 (8,"chiaro",0,"[warm] Nella prossima lezione: i neoassunti, e il silenzio che vale un si'."),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Apertura', 2: 'Leggere', 3: 'Il questionario', 4: 'Il modulo', 5: "La firma dell'ente", 6: 'NoiPA', 7: 'Memo', 8: 'Chiusura'}
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
