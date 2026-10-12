# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Un pittore con tre colori puri puo' ottenere moltissime sfumature. Basta mescolarli in proporzioni diverse."),
 (1,"chiaro",0,"Un po' di questo, un po' di quello, e dalla stessa tavolozza escono quadri molto diversi tra loro: chiari, scuri, accesi o tenui."),
 (1,"chiaro",0,"Perseo Sirio funziona cosi'. Ha tre colori di base, che si chiamano comparti. E li combina in sei sfumature, che si chiamano profili d'investimento."),
 (1,"chiaro",0,'I comparti sono i contenitori in cui il Fondo investe davvero i soldi. I profili, invece, sono le combinazioni che scegli tu.'),
 (1,"chiaro",0,"In questa lezione li vediamo tutti, uno per uno. Senza dire quale sia il migliore: perche' un profilo migliore in assoluto non esiste."),
 (1,"chiaro",0,'Come sempre in questo modulo: informazioni generali, non consulenza finanziaria. E i rendimenti passati non garantiscono quelli futuri.'),

 (2,"chiaro",0,"Partiamo dai tre comparti, i colori di base. Il primo e' il Garantito, attivo dal 2015."),
 (2,"chiaro",0,"E' il comparto piu' prudente dei tre, quello che oscilla meno, e anche quello che, nel tempo, rende di meno."),
 (2,"chiaro",0,"Punta a un rendimento paragonabile alla rivalutazione del TFR. Ed e' l'unico che offre una garanzia, ma solo in casi precisi."),
 (2,"chiaro",0,"Garantisce la restituzione almeno dei contributi versati, al netto delle spese e di quanto eventualmente gia' ritirato."),
 (2,"chiaro",0,"I casi sono quelli che contano davvero: la pensione, il decesso, l'invalidita', le anticipazioni e il riscatto per perdita del lavoro."),
 (2,"chiaro",0,"Il secondo comparto e' l'Obbligazionario. Investe in titoli di debito, cioe' prestiti a Stati e imprese, ed e' pensato per orizzonti tra cinque e dieci anni."),
 (2,"chiaro",0,"Il terzo e' l'Azionario. Investe soprattutto in azioni, quote di imprese di tutto il mondo, ed e' pensato per chi ha piu' di quindici anni davanti."),
 (2,"chiaro",0,"Questi ultimi due sono attivi da dicembre 2023, e nelle scelte d'investimento tengono conto anche di criteri ambientali e sociali."),
 (2,"chiaro",0,"Nel 2025, dice la Nota informativa, il Garantito ha reso il due virgola settanta per cento netto, l'Obbligazionario il due virgola diciassette, l'Azionario il sei virgola ventinove."),
 (2,"chiaro",0,'Ma attenzione: un solo anno non dice nulla sul futuro. Ricordi la lezione precedente? Conta la strada, non il singolo passo.'),

 (3,"chiaro",0,'Ed ecco i sei profili che puoi scegliere. Sono le sfumature ottenute mescolando, in dosi diverse, i tre colori.'),
 (3,"chiaro",0,"Il primo e' il profilo Garantito: tutto nel comparto garantito. E' suggerito a chi e' a meno di cinque anni dalla pensione."),
 (3,"chiaro",0,"Il secondo e' il profilo Obbligazionario: tutto nel comparto obbligazionario, per orizzonti tra cinque e dieci anni."),
 (3,"chiaro",0,'Poi ci sono tre profili bilanciati, che mescolano il comparto obbligazionario e quello azionario in proporzioni diverse.'),
 (3,"chiaro",0,"Il Bilanciato Prudente ha il trenta per cento di azioni e il settanta di obbligazioni, ed e' pensato per chi ha piu' di dieci anni davanti."),
 (3,"chiaro",0,"Il Bilanciato Crescita e' meta' e meta': cinquanta per cento di obbligazioni e cinquanta di azioni. Una via di mezzo."),
 (3,"chiaro",0,"Il Bilanciato Dinamico arriva al settanta per cento di azioni. Questi ultimi due sono pensati per chi ha piu' di quindici anni davanti."),
 (3,"chiaro",0,"Infine c'e' il sesto profilo, il Life Cycle. E' diverso da tutti gli altri, perche' cambia composizione da solo, con l'eta'."),
 (3,"chiaro",0,"Gli dedichiamo tutta la prossima lezione, perche' e' il profilo piu' particolare, e merita di essere capito bene."),

 (4,"chiaro",0,'Ora un dettaglio che sorprende molti iscritti. Il comparto Azionario esiste, ma non lo puoi scegliere da solo.'),
 (4,"chiaro",0,"Non c'e' un profilo tutto azionario da indicare direttamente nel modulo di adesione o di cambio profilo."),
 (4,"chiaro",0,"Il cento per cento in azioni lo raggiunge solo chi sceglie il Life Cycle. E solo finche' ha quarantacinque anni o meno."),
 (4,"chiaro",0,"Chi vuole la quota azionaria piu' alta tra i profili fissi deve scegliere il Bilanciato Dinamico, con il settanta per cento di azioni."),
 (4,"chiaro",0,"Non e' un difetto, ne' una dimenticanza: e' una scelta precisa del Fondo. Serve a evitare che qualcuno resti tutto in azioni anche vicino alla pensione, quando un anno storto pesa di piu'."),

 (5,"chiaro",0,'Ma allora, in pratica, come orientarsi tra sei profili? Il Fondo mette a disposizione due strumenti, entrambi gratuiti.'),
 (5,"chiaro",0,"Il primo e' il questionario di autovalutazione. Lo compili quando aderisci, e puoi rifarlo in qualunque momento, anche ogni anno."),
 (5,"chiaro",0,"Sono poche domande sul tuo orizzonte, sulla tua esperienza e su quanto sopporti le oscillazioni. Ricordi l'esperimento della lezione scorsa?"),
 (5,"chiaro",0,"Il secondo strumento e' la consulenza gratuita, che si prenota dal sito del Fondo. Anche prima di iscriversi, e senza impegno."),
 (5,"chiaro",0,"Il corso non puo' scegliere per te, e non deve farlo: ogni situazione e' diversa. Loro, invece, possono aiutarti a farlo bene, sul tuo caso concreto."),

 (6,"profondo",1.2,'Tre comparti di base, sei profili tra cui scegliere. La sfumatura giusta dipende dai tuoi anni.'),

 (7,"chiaro",0,'Le tre cose da ricordare. Uno: Perseo Sirio ha tre comparti: Garantito, Obbligazionario e Azionario.'),
 (7,"chiaro",0,'Due: li combina in sei profili da scegliere: Garantito, Obbligazionario, i tre Bilanciati e il Life Cycle.'),
 (7,"chiaro",0,'Tre: il comparto Azionario al cento per cento si raggiunge solo con il Life Cycle, fino a quarantacinque anni.'),
 (7,"chiaro",0,"La mossa di oggi e' per chi e' gia' iscritto, e richiede pochi minuti: scopri in quale profilo sei, oggi."),
 (7,"chiaro",0,"Entra nell'area riservata del Fondo, nella sezione dedicata all'investimento, e guarda il profilo indicato accanto al tuo nome."),
 (7,"chiaro",0,"Molti lo scoprono solo cosi'. E spesso e' un profilo scelto anni fa, o assegnato in automatico, che nessuno ha piu' guardato."),
 (7,"chiaro",0,'Poi mettilo accanto ai due numeri della lezione scorsa: gli anni che ti mancano, e la tua risposta sincera al calo del dieci per cento.'),
 (7,"chiaro",0,"Se il profilo e i tuoi anni sembrano non andare d'accordo, rifai il questionario, o prenota la consulenza."),
 (7,"chiaro",0,'Nella prossima lezione parliamo del sesto profilo, il Life Cycle: quello che si muove da solo.'),
 (7,"chiaro",0,"Vedremo come cambia con l'eta', a che eta' scattano i passaggi, e per chi puo' essere una scelta comoda."),
 (7,"chiaro",0,'[warm] A presto: ci vediamo nella lezione sei punto quattro.'),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Apertura', 2: 'Tre comparti', 3: 'Sei profili', 4: "L'Azionario puro", 5: 'Come orientarsi', 6: 'Memo', 7: 'Chiusura'}
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
