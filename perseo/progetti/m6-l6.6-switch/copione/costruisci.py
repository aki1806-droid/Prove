# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Un buon ciclista cambia marcia prima della salita, non a meta'. E non la cambia a ogni curva, solo perche' la strada gira un po'."),
 (1,"chiaro",0,"Anche nel fondo pensione si puo' cambiare marcia. Si chiama switch: e' il passaggio da un profilo di investimento a un altro."),
 (1,"chiaro",0,'In questa lezione vediamo le regole per farlo, gli strumenti che ti aiutano a decidere, e il momento giusto per cambiare.'),
 (1,"chiaro",0,'Con questa lezione chiudiamo il modulo sulla gestione finanziaria: dove vanno i tuoi soldi, e come puoi orientarli tu.'),
 (1,"chiaro",0,'Come sempre in questo modulo: informazioni generali, non consulenza finanziaria. E i rendimenti passati non garantiscono quelli futuri.'),

 (2,"chiaro",0,'Partiamo dalle regole. Sono poche, e per fortuna sono semplici da ricordare. Le trovi nella Nota informativa e nello Statuto del Fondo.'),
 (2,"chiaro",0,'La regola generale prevede almeno dodici mesi di permanenza in un profilo, prima di poterlo cambiare.'),
 (2,"chiaro",0,"E poi almeno dodici mesi tra un cambio e l'altro. Una marcia alla volta, insomma, senza scatti continui."),
 (2,"chiaro",0,"Con la nuova gestione finanziaria, pero', c'e' un'eccezione importante: il primo cambio si puo' fare subito, senza aspettare."),
 (2,"chiaro",0,"Lo Statuto prevede la stessa possibilita' anche per chi e' entrato per silenzio-assenso, o come aderente contrattuale."),
 (2,"chiaro",0,"Possono spostarsi dal profilo di partenza in qualunque momento. Non devono aspettare i dodici mesi: il profilo di partenza non e' una gabbia."),
 (2,"chiaro",0,"E c'e' una buona notizia per tutti: cambiare profilo non costa nulla. Nessuna commissione, nessuna penale, qualunque sia il profilo di arrivo."),
 (2,"chiaro",0,"La Nota informativa non prevede spese, ne' per spostare la posizione gia' accumulata, ne' per spostare i versamenti futuri."),
 (2,"chiaro",0,"Ricapitolando: primo cambio subito, poi almeno dodici mesi tra un cambio e l'altro. E nessun costo."),

 (3,"chiaro",0,'Quando cambi profilo, puoi fare due cose diverse. Sembrano simili, ma non lo sono: conviene capire bene la differenza, prima di confermare.'),
 (3,"chiaro",0,"Immagina un salvadanaio pieno, dentro un barattolo di un certo colore. E' la posizione che hai accumulato fino a oggi."),
 (3,"chiaro",0,"Sopra c'e' un rubinetto, che ogni mese versa nel barattolo i nuovi contributi, con la busta paga. Sono i versamenti futuri."),
 (3,"chiaro",0,"La prima strada e' spostare tutta la posizione gia' accumulata nel nuovo profilo. Il salvadanaio pieno cambia barattolo."),
 (3,"chiaro",0,"La seconda strada, in alcuni casi, e' spostare solo i versamenti futuri. Si devia il rubinetto verso un barattolo nuovo."),
 (3,"chiaro",0,"Quello che hai gia' accumulato, invece, resta dov'e'. Cambia solo la direzione di quello che verserai da domani."),
 (3,"chiaro",0,"Le modalita' precise sono descritte nel Regolamento multicomparto. Lo trovi sul sito del Fondo, nella sezione della gestione finanziaria."),
 (3,"chiaro",0,'Prima di confermare, leggi con attenzione la schermata di riepilogo. Ti dice esattamente che cosa viene spostato, e dove.'),

 (4,"chiaro",0,"Ma quando ha senso cambiare? E' la domanda piu' importante di tutta la lezione, perche' le regole dicono come si cambia, non quando."),
 (4,"chiaro",0,"Ci sono buoni motivi. Il primo: ti stai avvicinando alla pensione, e vuoi piu' stabilita' per i soldi che ti serviranno presto."),
 (4,"chiaro",0,"Il secondo: e' cambiata la tua situazione familiare o economica. Un figlio, una casa, un nuovo lavoro. La vita si muove, e il profilo puo' seguirla."),
 (4,"chiaro",0,"Il terzo: sei entrato per silenzio-assenso, e non hai mai fatto una scelta consapevole. Forse e' arrivato il momento di farla."),
 (4,"chiaro",0,"E poi ci sono i cattivi motivi. Il primo: il mercato e' sceso il mese scorso, e la posizione e' calata."),
 (4,"chiaro",0,"Il secondo: un collega racconta di aver guadagnato di piu', con un altro profilo. Il terzo: una notizia allarmante al telegiornale."),
 (4,"chiaro",0,'Cambiare per paura, dopo un calo, significa spesso vendere quando i prezzi sono bassi. E rinunciare alla risalita, quando arriva.'),
 (4,"chiaro",0,'Ricordi la lezione sei punto due? Chi esce dopo la caduta, di solito, non partecipa alla ripresa. E un calo temporaneo diventa una perdita vera.'),
 (4,"chiaro",0,"Lo switch e' uno strumento per adattarsi alla vita, non per inseguire i mercati. Come il cambio della bicicletta: si usa prima della salita."),

 (5,"chiaro",0,'Per decidere bene, non sei solo. Hai a disposizione due strumenti, ed entrambi sono gratuiti. Usarli non ti obbliga a cambiare nulla.'),
 (5,"chiaro",0,"Il primo e' il questionario di autovalutazione. Poche domande sulla tua eta', sui tuoi obiettivi e su come reagisci a un calo. Puoi rifarlo dall'area riservata ogni volta che la tua situazione cambia."),
 (5,"chiaro",0,"Il secondo e' la consulenza del Fondo. Si prenota dal sito, e serve proprio a scegliere il profilo piu' adatto a te."),
 (5,"chiaro",0,'E ricorda anche le due tasche, che abbiamo visto nella lezione precedente: quella dei contributi, e quella del TFR virtuale.'),
 (5,"chiaro",0,'Quando rivedi la tua scelta, rivedile entrambe. Dal 2026 anche il TFR virtuale segue un profilo, e quel profilo lo puoi scegliere tu.'),

 (6,"profondo",1.2,'Si cambia profilo quando cambia la tua vita. Non quando cambia la borsa.'),

 (7,"chiaro",0,"Le tre cose da ricordare. Uno: il primo cambio di profilo si puo' fare subito. Poi devono passare almeno dodici mesi tra un cambio e l'altro."),
 (7,"chiaro",0,"Due: cambiare non ha costi. Ne' per la posizione accumulata, ne' per i versamenti futuri. Quello che conta e' il motivo per cui cambi."),
 (7,"chiaro",0,'Tre: per decidere usa il questionario e la consulenza gratuita. E rivedi sia la tasca reale, sia il TFR virtuale.'),
 (7,"chiaro",0,"La mossa di oggi: entra nell'area riservata, e rifai il questionario di autovalutazione. Ci vogliono pochi minuti."),
 (7,"chiaro",0,'Poi confronta il risultato con il profilo in cui sei oggi. Coincidono? Se no, prima di cambiare, prenota una consulenza.'),
 (7,"chiaro",0,"Si chiude cosi' il sesto modulo. Abbiamo visto la contribuzione definita, il rischio e il rendimento, i comparti e i profili."),
 (7,"chiaro",0,"E poi il Life Cycle, la novita' del TFR nel 2026, e oggi le regole per cambiare idea."),
 (7,"chiaro",0,"Ora sai dove vanno i tuoi soldi, e come puoi orientarli. Non e' poco: e' la parte del fondo su cui puoi decidere davvero."),
 (7,"chiaro",0,'Nel prossimo modulo vediamo un tema che spesso si trascura, e che invece pesa molto, anno dopo anno: i costi.'),
 (7,"chiaro",0,'[warm] Costi e trasparenza. Ci vediamo nel modulo sette.'),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Apertura', 2: 'Le regole', 3: 'Tutto o solo il futuro', 4: 'Quando cambiare', 5: 'Gli strumenti', 6: 'Memo', 7: 'Chiusura'}
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
