# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] C'e' una categoria di dipendenti pubblici che a Perseo Sirio arriva per una strada tutta sua. E' la polizia locale."),
 (1,"chiaro",0,'Per gli agenti e gli ufficiali di polizia locale, una parte dei soldi delle multe stradali diventa un contributo per la pensione complementare.'),
 (1,"chiaro",0,"Sembra una curiosita', ma e' un meccanismo preciso, previsto dalla legge e dal contratto. E molti diretti interessati non lo conoscono fino in fondo."),
 (1,"chiaro",0,"Se lavori in un comune o in una provincia, o hai colleghi della polizia locale, questa lezione ti spiega come funziona, e perche' vale la pena fare un passo in piu'."),

 (2,"chiaro",0,"Partiamo dalla legge. Il Codice della Strada, all'articolo 208, stabilisce come gli enti devono usare i proventi delle sanzioni stradali."),
 (2,"chiaro",0,"Non tutto va dove si vuole: una parte e' vincolata a finalita' precise, come la sicurezza stradale e la manutenzione delle strade."),
 (2,"chiaro",0,"E una parte puo' essere destinata a finalita' di previdenza complementare per il personale di polizia locale."),
 (2,"chiaro",0,"Il contratto delle funzioni locali, oggi all'articolo 98 del contratto firmato nel novembre 2022, ha individuato Perseo Sirio come unico fondo che riceve queste risorse."),
 (2,"chiaro",0,'La quota la decide ciascun ente, ogni anno. E viene versata al Fondo come contributo del datore di lavoro.'),
 (2,"chiaro",0,"Non e' un regalo, ne' una gratifica: e' una destinazione prevista per legge, che riguarda solo chi svolge funzioni di polizia locale."),
 (2,"chiaro",0,"Dal verbale alla pensione, quindi, il percorso e' questo: sanzione, proventi dell'ente, quota decisa dall'ente, posizione dell'agente in Perseo Sirio."),

 (3,"chiaro",0,"Per questo si parla di adesione contrattuale. E' il contratto a prevederla, e l'agente risulta iscritto al Fondo senza dover firmare un modulo."),
 (3,"chiaro",0,"Attenzione, pero': l'adesione contrattuale e' un inizio, non tutto. E' importante capire che cosa c'e' dentro, e soprattutto che cosa manca."),
 (3,"chiaro",0,"Con il solo articolo 208, la posizione viene alimentata unicamente da quel contributo, versato di norma una volta l'anno."),
 (3,"chiaro",0,"In pratica, chi ha solo l'adesione contrattuale ha una posizione aperta, ma piccola, che cresce lentamente."),
 (3,"chiaro",0,"Non c'e' un tuo contributo. Non c'e' l'uno per cento ordinario dell'ente. Non c'e' il TFR."),
 (3,"chiaro",0,"E chi e' in TFS resta in TFS: l'adesione contrattuale non comporta il passaggio al TFR che abbiamo visto nel modulo due."),
 (3,"chiaro",0,"Per i soli aderenti contrattuali e' prevista una quota associativa annua di undici euro, che si paga sulla posizione."),

 (4,"chiaro",0,"Se invece l'agente decide di integrare, aggiunge a quel contributo annuale anche la contribuzione ordinaria mensile, quella che abbiamo visto nelle lezioni precedenti."),
 (4,"chiaro",0,"Il suo uno per cento, trattenuto in busta paga. L'uno per cento dell'ente, che arriva solo se versa anche lui. E la quota di TFR, nella tasca figurativa."),
 (4,"chiaro",0,"Mettiamo le due situazioni una accanto all'altra. Con il solo articolo 208: un contributo all'anno, e niente altro."),
 (4,"chiaro",0,"Con l'integrazione: lo stesso contributo annuale, piu' ogni mese il tuo uno per cento, l'uno per cento dell'ente e il TFR."),
 (4,"chiaro",0,"Con l'integrazione, la posizione diventa uguale a quella di qualunque altro iscritto, con in piu' la quota delle sanzioni."),
 (4,"chiaro",0,"L'integrazione e' sempre volontaria ed esplicita. Serve un apposito modulo, che si trova nella sezione del sito del Fondo dedicata alla polizia locale."),
 (4,"chiaro",0,"E vale tutto quello che abbiamo detto sul passaggio dal TFS al TFR per chi era in servizio prima del 2001: con l'integrazione, il passaggio scatta."),

 (5,"chiaro",0,'Guarda la differenza nel tempo. Immagina due agenti dello stesso comando, con la stessa adesione contrattuale, assunti lo stesso anno.'),
 (5,"chiaro",0,"Il primo resta cosi': riceve una volta l'anno la quota delle sanzioni. Il suo salvadanaio si riempie a scatti, una moneta all'anno."),
 (5,"chiaro",0,'Il secondo compila il modulo di integrazione. Alla stessa quota annuale si aggiungono, ogni mese, i contributi ordinari e il TFR.'),
 (5,"chiaro",0,"Dopo pochi anni la differenza di livello tra i due salvadanai e' evidente. E con il tempo, e i rendimenti, la distanza cresce ancora."),
 (5,"chiaro",0,'[serious] Lo stesso inizio, due arrivi molto diversi. E la differenza la fa una sola scelta: compilare, o no, un modulo.'),
 (5,"chiaro",0,"Naturalmente integrare significa anche versare l'uno per cento del proprio stipendio. Ma e' proprio quel versamento che sblocca il contributo dell'ente."),

 (6,"chiaro",0,"Se sei un agente di polizia locale, quindi, controlla due cose. Prima: se il tuo ente versa davvero la quota dell'articolo 208 al Fondo."),
 (6,"chiaro",0,"La destinazione dei proventi e' una decisione dell'ente, anno per anno. Non e' scontato che arrivi sempre, ne' che l'importo resti uguale."),
 (6,"chiaro",0,"Il prospetto annuale del Fondo e' il modo piu' semplice per verificarlo: li' trovi i versamenti, con la data e l'importo."),
 (6,"chiaro",0,"Seconda: se ti conviene integrarla con la contribuzione ordinaria. Nella grande maggioranza dei casi, la risposta e' si'."),
 (6,"chiaro",0,"Se sei in TFS, pero', la scelta va pesata con le stesse domande della lezione sull'opzione: aumenti di fine carriera e anni che mancano."),
 (6,"chiaro",0,"Il Fondo offre una consulenza telefonica dedicata anche per questo caso. E il sindacato puo' aiutarti a capire che cosa fa, in concreto, il tuo ente."),
 (6,"chiaro",0,"E se non sei della polizia locale, ma hai un collega che lo e', giragli questa lezione. Potrebbe non sapere di avere gia' una posizione nel Fondo."),

 (7,"profondo",1.2,"Il contributo dell'articolo 208 e' un buon inizio. Non e' un punto d'arrivo."),

 (8,"chiaro",0,'Le tre cose da ricordare. Uno: per la polizia locale una parte dei proventi delle sanzioni stradali diventa contributo a Perseo Sirio.'),
 (8,"chiaro",0,"Due: e' un'adesione contrattuale, che non richiede di firmare il modulo, ma da sola porta solo quel contributo, di norma una volta l'anno."),
 (8,"chiaro",0,"Tre: con il modulo di integrazione si aggiungono la contribuzione ordinaria, l'uno per cento dell'ente e il TFR."),
 (8,"chiaro",0,"La mossa di oggi, se sei della polizia locale: entra nell'area riservata del Fondo e controlla se, e quando, e' arrivato l'ultimo versamento dell'articolo 208."),
 (8,"chiaro",0,"Se non trovi nulla, chiedi all'ufficio del personale del tuo ente se la quota e' stata decisa e versata."),
 (8,"chiaro",0,"[warm] Nella prossima lezione: si puo' uscire dal Fondo? E chi altro puo' essere iscritto?"),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Apertura', 2: 'Dalla multa alla pensione', 3: 'Adesione contrattuale', 4: 'Integrare', 5: 'Due agenti', 6: 'Che cosa controllare', 7: 'Memo', 8: 'Chiusura'}
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
