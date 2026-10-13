# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Siamo partiti da qui. Un corridoio d'ospedale al cambio turno, un armadietto che si chiude, e una domanda."),
 (1,"chiaro",0,"Quanto mi arrivera', ogni mese, quando smettero' di lavorare? E' la domanda che ci ha accompagnato per dieci moduli. Una domanda semplice, che quasi nessuno si fa in tempo."),
 (1,"chiaro",0,"Dopo tutto questo percorso, quella domanda non ha ancora una risposta precisa. Nessuno puo' dartela con certezza. Dipende da troppe cose: lo stipendio, gli anni, i mercati, le regole."),
 (1,"chiaro",0,'Ma ora hai gli strumenti per costruirla da solo, un pezzo alla volta, con i tuoi numeri.'),
 (1,"chiaro",0,"In quest'ultima lezione li mettiamo in fila. Dieci domande da farti, una per una, con la tua situazione davanti. Una pagina sola, da tenere nel cassetto."),
 (1,"chiaro",0,"E poi le persone a cui rivolgerti, quando una risposta non la trovi da solo. Prendi un foglio: ti servira'."),

 (2,"chiaro",0,"Ecco le prime cinque domande. Leggile con calma, e per ognuna chiediti se sapresti rispondere oggi. Non e' un esame: e' una fotografia della tua situazione."),
 (2,"chiaro",0,'Uno: sono in TFS o in TFR? Dipende dalla tua data di assunzione, come hai visto nel modulo due. In breve: assunto a tempo indeterminato entro il 2000, TFS. Dopo, TFR.'),
 (2,"chiaro",0,"Due: sono gia' iscritto al Fondo? E se si', come? Molti colleghi, sinceramente, non lo sanno."),
 (2,"chiaro",0,'Con il modulo di adesione, per silenzio-assenso, oppure come aderente contrattuale? Ognuna di queste strade ha le sue regole. Le hai viste nel modulo tre.'),
 (2,"chiaro",0,"Tre: verso almeno l'uno per cento della retribuzione utile? E ricevo l'uno per cento dell'ente? Sono due cose collegate."),
 (2,"chiaro",0,"Lo vedi nel cedolino, riga per riga. E' la condizione per avere il contributo del datore di lavoro."),
 (2,"chiaro",0,'Quattro: quanti anni mancano alla mia pensione pubblica? Da questo numero dipendono molte altre scelte. Per esempio, il profilo, e il momento giusto per chiedere la prestazione.'),
 (2,"chiaro",0,'Cinque: in che profilo sono investiti i miei contributi? E il mio TFR virtuale, in quale profilo si trova? Sono due domande diverse, e le risposte possono essere diverse.'),
 (2,"chiaro",0,"Se non sai rispondere a una di queste domande, nessun problema. La lezione corrispondente e' indicata nella dispensa del corso."),

 (3,"chiaro",0,"Le altre cinque domande. Sono quelle che, di solito, restano in fondo alla lista. Ma contano quanto le prime, e a volte di piu'."),
 (3,"chiaro",0,"Sei: il profilo in cui sono e' coerente con gli anni che mi restano? E con la mia tranquillita', quando i mercati scendono?"),
 (3,"chiaro",0,'Sette: se non ho coniuge, figli o genitori a carico, ho designato qualcuno a cui lasciare la posizione?'),
 (3,"chiaro",0,"E' la domanda della lezione otto punto cinque, ed e' una di quelle che si rimandano piu' facilmente."),
 (3,"chiaro",0,"Otto: ho fatto versamenti oltre il limite di deducibilita', o con un bonifico, da comunicare al Fondo come contributi non dedotti?"),
 (3,"chiaro",0,'Nove: ho un vecchio fondo pensione, di un lavoro precedente, da portare in Perseo Sirio?'),
 (3,"chiaro",0,"Dieci: quando faccio il prossimo punto? La risposta giusta e': una volta l'anno, quando arriva il prospetto. Dieci minuti, come hai visto nella lezione dieci punto uno."),
 (3,"chiaro",0,'Dieci domande in tutto. E nessuna richiede di essere un esperto di finanza.'),
 (3,"chiaro",0,"Richiedono solo un po' di tempo, il cedolino, il prospetto e l'area riservata. Gli strumenti che ormai conosci."),

 (4,"chiaro",0,'E quando una risposta non la trovi? A chi rivolgerti?'),
 (4,"chiaro",0,"Prima di tutto al Fondo. C'e' un numero verde gratuito: ottocento, novecentonovantaquattro, cinquecentoquarantacinque. Annotalo da qualche parte, magari nella rubrica del telefono."),
 (4,"chiaro",0,"E' attivo dal lunedi' al venerdi'. Gli orari li trovi sullo schermo, e sul sito del Fondo."),
 (4,"chiaro",0,"E poi c'e' la consulenza gratuita, che si prenota dal sito. Anche prima di aderire."),
 (4,"chiaro",0,"Serve proprio a questo: scegliere il profilo, e valutare con calma le scelte piu' importanti."),
 (4,"chiaro",0,'Sul sito del Fondo trovi anche le domande frequenti, la Nota informativa, e tutta la modulistica che abbiamo citato nel corso.'),
 (4,"chiaro",0,"Sono documenti scritti con cura. Ora che conosci le parole giuste, li leggerai molto piu' facilmente. E se una parola non ti torna, il numero verde e' li' apposta."),

 (5,"chiaro",0,"E poi c'e' chi lavora accanto a te, ogni giorno."),
 (5,"chiaro",0,"Questo corso e' stato realizzato da CISL FP Padova Rovigo, il sindacato che rappresenta i lavoratori della sanita' e delle funzioni pubbliche."),
 (5,"chiaro",0,'I nostri delegati sono nei luoghi di lavoro. Possono aiutarti a leggere il cedolino, a ritrovare i documenti, a preparare una simulazione.'),
 (5,"chiaro",0,'E il patronato INAS CISL ti accompagna nelle pratiche di pensione, sia quella pubblica, sia quella complementare. Dalla domanda di pensione, alla scelta tra capitale e rendita.'),
 (5,"chiaro",0,'Non serve aspettare di avere un problema. Basta una domanda, fatta al momento giusto.'),
 (5,"chiaro",0,"Una domanda fatta in tempo vale piu' di dieci risposte cercate in fretta."),

 (6,"profondo",1.2,'La pensione non arriva alla fine. Si costruisce oggi, un mese alla volta.'),

 (7,"chiaro",0,"La mossa di oggi, l'ultima del corso: prendi un foglio, e rispondi alle dieci domande."),
 (7,"chiaro",0,"Dove non sai la risposta, torna alla lezione giusta. Oppure chiedi a chi puo' aiutarti: il Fondo, un delegato, il patronato."),
 (7,"chiaro",0,'In questo corso hai visto i tre pilastri, e le due tasche, quella reale e quella figurativa.'),
 (7,"chiaro",0,'Hai visto il salvadanaio con i suoi tre ingressi, la scala del fisco che scende con gli anni, e il pilota automatico del percorso. Ritornano tutti, nelle dieci domande.'),
 (7,"chiaro",0,'Sono strumenti semplici, per una scelta importante. Una scelta che riguarda te, e la persona che sarai tra qualche anno.'),
 (7,"chiaro",0,'Non devi fare tutto stasera. Ma puoi cominciare stasera, con una domanda sola. La prima della lista.'),
 (7,"chiaro",0,'Grazie per aver seguito il corso fino in fondo, lezione dopo lezione.'),
 (7,"chiaro",0,'Perseo Sirio, adesso, ha un segreto in meno.'),
 (7,"chiaro",0,'[warm] E buon lavoro, oggi. Per la pensione di domani.'),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Apertura', 2: 'Le prime cinque domande', 3: 'Le altre cinque', 4: 'Il Fondo', 5: 'Sul tuo posto di lavoro', 6: 'Memo', 7: 'Chiusura del corso'}
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
