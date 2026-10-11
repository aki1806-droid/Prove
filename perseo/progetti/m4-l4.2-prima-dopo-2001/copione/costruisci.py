# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,'[warm] Due colleghe dello stesso reparto. Stesso stipendio, stessa scelta: aderire a Perseo Sirio.'),
 (1,"chiaro",0,"Eppure, nei loro salvadanai, ogni anno entrano cifre diverse. E non per un errore, ne' per un favoritismo."),
 (1,"chiaro",0,"Una e' arrivata in reparto nel 2010. L'altra c'era gia' alla fine degli anni novanta. Ed e' proprio questo, e solo questo, a cambiare i conti."),
 (1,"chiaro",0,"Il motivo e' la linea del 2000, che abbiamo incontrato nel modulo due: la data che divide chi e' nato in TFS da chi e' nato in TFR."),
 (1,"chiaro",0,"In questa lezione mettiamo le due ricette una accanto all'altra, con gli stessi numeri, per vedere esattamente che cosa cambia."),

 (2,"chiaro",0,"Ecco la differenza, in una riga del tempo. A destra della tacca del 31 dicembre 2000, chi e' stato assunto dal 2001."),
 (2,"chiaro",0,"Chi e' stato assunto dal 2001, o lavora a tempo determinato, destina al Fondo tutto il TFR: il cento per cento della quota annua."),
 (2,"chiaro",0,"A sinistra della tacca, chi era gia' in servizio a tempo indeterminato al 31 dicembre 2000, e quindi era in TFS."),
 (2,"chiaro",0,"Aderendo, passa dal TFS al TFR, come abbiamo visto nella lezione sull'opzione. Ma al Fondo destina solo una parte del TFR: il ventotto virgola novantaquattro per cento."),
 (2,"chiaro",0,"Quella percentuale non e' casuale: equivale al due per cento della retribuzione. Cosi' la prevedono gli accordi."),
 (2,"chiaro",0,'In pratica, poco meno di un terzo del TFR che matura ogni anno va al Fondo. Gli altri due terzi restano dove sono.'),
 (2,"chiaro",0,"In compenso riceve l'accantonamento aggiuntivo dell'uno virgola cinque per cento, calcolato sull'ottanta per cento della retribuzione."),
 (2,"chiaro",0,"Il resto del suo TFR non va perso: continua a formarsi ogni anno, presso l'INPS, e le viene pagato come liquidazione alla fine del lavoro."),

 (3,"chiaro",0,"Ora gli stessi numeri, per tutte e due: trentamila euro di retribuzione utile all'anno. Esempio semplificato, importi lordi."),
 (3,"chiaro",0,"Per entrambe, trecento euro di contributo proprio e trecento euro dell'ente, l'uno per cento ciascuno. Fin qui, nessuna differenza."),
 (3,"chiaro",0,'Mettiamo tutto in una tabella, riga per riga, una colonna per ciascuna collega. Le differenze stanno tutte nelle righe del TFR.'),
 (3,"chiaro",0,'La collega assunta dal 2001 aggiunge tutto il TFR: il sei virgola novantuno per cento della retribuzione, circa duemilasettanta euro.'),
 (3,"chiaro",0,"In tutto, circa duemilaseicentosettanta euro l'anno verso la pensione complementare. E' la ricetta completa della lezione precedente."),
 (3,"chiaro",0,"La collega in servizio al 2000 aggiunge seicento euro di TFR, cioe' il due per cento della retribuzione."),
 (3,"chiaro",0,"E trecentosessanta euro di accantonamento aggiuntivo: l'uno virgola cinque per cento di ventiquattromila euro."),
 (3,"chiaro",0,"In tutto, circa millecinquecentosessanta euro l'anno verso la pensione complementare."),
 (3,"chiaro",0,"In piu', le restano circa millequattrocentosettanta euro di TFR all'anno, che si accumulano come liquidazione."),

 (4,"chiaro",0,"Guarda il TFR delle due colleghe: e' lo stesso, circa duemilasettanta euro l'anno. Cambia solo come viene diviso."),
 (4,"chiaro",0,'Pensala come una torta: la stessa torta, tagliata in modo diverso. Due barre della stessa lunghezza, colorate in modo diverso.'),
 (4,"chiaro",0,'Per la prima, tutta la barra si colora di verde: tutto il TFR diventa pensione complementare, e niente resta come liquidazione.'),
 (4,"chiaro",0,"Per la seconda, una parte diventa pensione complementare e una parte resta liquidazione. E sopra arriva il premio dell'uno virgola cinque."),
 (4,"chiaro",0,"[serious] Non e' quindi corretto dire che una delle due guadagna di piu'. Sono due modi diversi di dividere lo stesso trattamento di fine lavoro."),
 (4,"chiaro",0,"Da una parte un capitale da ricevere alla cessazione. Dall'altra una pensione complementare da costruire nel tempo."),
 (4,"chiaro",0,"E il premio dell'uno virgola cinque compensa in parte chi rinuncia al TFS, che per molti aveva regole di calcolo piu' favorevoli."),

 (5,"chiaro",0,"C'e' una conseguenza pratica, e riguarda la manopola su cui puoi agire, se un giorno vorrai costruire di piu'."),
 (5,"chiaro",0,"Chi e' stato assunto dal 2001 ha gia' portato al Fondo tutto il suo TFR. Se vuole aumentare la pensione complementare, puo' solo alzare il proprio contributo."),
 (5,"chiaro",0,"Chi ha optato dal TFS, invece, destina al Fondo una parte piu' piccola del TFR, perche' cosi' prevedono le regole."),
 (5,"chiaro",0,"Non puo' decidere di portarne di piu', ne' di portarlo tutto. Se vuole una pensione complementare piu' robusta, anche per lui l'unica leva e' il proprio contributo."),
 (5,"chiaro",0,"In entrambi i casi, dunque, la manopola su cui puoi agire e' una sola: la percentuale a tuo carico. Il resto lo fissano i contratti."),
 (5,"chiaro",0,"E' una manopola che si gira facilmente: come vedremo nella lezione quattro, puoi alzare il contributo dall'area riservata, una volta l'anno."),

 (6,"chiaro",0,'Due ricette diverse, quindi, e due modi diversi di arrivare alla pensione. Ma un principio comune, che vale per entrambe.'),
 (6,"chiaro",0,"Tutte e due ricevono l'uno per cento dell'ente solo perche' hanno aderito. E solo finche' continuano a versare il proprio."),
 (6,"chiaro",0,'E per tutte e due vale la regola che vedremo nella prossima lezione: quel contributo si perde in alcune situazioni precise.'),
 (6,"chiaro",0,"Conviene conoscerle prima di trovarcisi, non dopo. Perche' quando ci si accorge della perdita, di solito, e' gia' passato del tempo."),

 (7,"profondo",1.2,"Il TFR e' lo stesso. Cambia come lo dividi tra liquidazione e pensione."),

 (8,"chiaro",0,"Le tre cose da ricordare. Uno: chi e' assunto dal 2001, o a tempo determinato, destina al Fondo il cento per cento del TFR."),
 (8,"chiaro",0,'Due: chi era in servizio al 2000 e opta destina il ventotto virgola novantaquattro per cento, pari al due per cento della retribuzione.'),
 (8,"chiaro",0,"Piu' l'uno virgola cinque aggiuntivo, sull'ottanta per cento della retribuzione. Il resto del TFR resta liquidazione."),
 (8,"chiaro",0,"Tre: per tutti, l'unica leva personale e' la percentuale del proprio contributo. Il resto lo decidono le regole."),
 (8,"chiaro",0,'La mossa di oggi: rifai la tabella di questa lezione con la tua retribuzione. Bastano una calcolatrice, il tuo cedolino e cinque minuti.'),
 (8,"chiaro",0,"Se non sai da che parte della linea stai, guarda la data di assunzione sul cedolino, o chiedi all'ufficio del personale."),
 (8,"chiaro",0,'[warm] Nella prossima lezione: il contributo che perdi, se non aderisci o se smetti di versare.'),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Apertura', 2: 'La linea del 2000', 3: 'Stessi numeri', 4: 'Lo stesso TFR', 5: 'La leva', 6: 'Un principio comune', 7: 'Memo', 8: 'Chiusura'}
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
