# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,'[warm] Una mappa aperta sul tavolo, con un percorso segnato a matita. E poi, in auto, un navigatore che ricalcola la strada.'),
 (1,"chiaro",0,"Una proiezione della pensione e' proprio come un navigatore. Ti dice dove arriverai, se mantieni la velocita' e la direzione di oggi."),
 (1,"chiaro",0,"Non sa se ci sara' traffico lungo la strada. E non sa se, a un certo punto, deciderai di cambiare percorso."),
 (1,"chiaro",0,"Ma senza navigatore viaggi alla cieca. E chi viaggia alla cieca, di solito, se ne accorge quando e' troppo tardi."),
 (1,"chiaro",0,'In questa lezione impariamo a usare i due strumenti di stima che il Fondo mette a disposizione, e a leggerli con la giusta prudenza.'),

 (2,"chiaro",0,"Gli strumenti sono due, e fanno cose diverse. Conviene conoscerli entrambi, perche' si completano a vicenda."),
 (2,"chiaro",0,"Il primo si chiama la mia pensione complementare. E' un documento che il Fondo consegna con la documentazione di adesione."),
 (2,"chiaro",0,'Stima quanto potresti accumulare fino alla pensione, e quale rendita potresti ottenere con quel capitale, il giorno della pensione.'),
 (2,"chiaro",0,"Usa ipotesi uguali per tutti i fondi pensione italiani, stabilite dalla COVIP, l'autorita' di vigilanza. Per questo e' utile anche per confrontare."),
 (2,"chiaro",0,"Il secondo e' il simulatore sul sito del Fondo, nella pagina della rendita. Qui le ipotesi standard lasciano spazio ai tuoi dati personali."),
 (2,"chiaro",0,"Puoi inserire i tuoi dati: la tua eta', i tuoi contributi, la posizione attuale e il profilo di investimento in cui sei."),
 (2,"chiaro",0,"Il documento con la metodologia e le ipotesi usate e' pubblicato sul sito del Fondo. Chi vuole capire i calcoli, li trova li'."),

 (3,"chiaro",0,"Ora la cosa piu' importante di tutta la lezione: come si legge, correttamente, una proiezione della pensione."),
 (3,"chiaro",0,"Il modo giusto e' leggerla come un ventaglio, non come un numero. Un ventaglio di possibilita' che si apre nel tempo."),
 (3,"chiaro",0,"Nessuno sa quanto renderanno i mercati nei prossimi anni. Nessuno sa quanto crescera' il tuo stipendio, ne' quale sara' l'inflazione."),
 (3,"chiaro",0,"Le proiezioni scelgono ipotesi ragionevoli e prudenti, scelte con un metodo dichiarato. Ma restano ipotesi, non previsioni, e nessuno puo' garantirle."),
 (3,"chiaro",0,"Un buon esercizio e' fare tre simulazioni. La prima con un rendimento prudente, la seconda con uno centrale, la terza con uno piu' ottimista."),
 (3,"chiaro",0,"La tua pensione complementare cadra', probabilmente, da qualche parte in mezzo. In quella zona realistica tra le tre linee."),
 (3,"chiaro",0,"E soprattutto: rifai la simulazione ogni qualche anno, magari quando arriva il prospetto. Perche' piu' ti avvicini alla pensione, piu' il ventaglio si stringe."),
 (3,"chiaro",0,"A trent'anni dalla pensione il ventaglio e' molto largo. A cinque anni dalla pensione, invece, e' quasi una linea sola."),

 (4,"chiaro",0,"Il simulatore e' utile soprattutto per un motivo, che il documento standard non puo' darti: ti mostra che cosa succede se cambi qualcosa."),
 (4,"chiaro",0,'Prova a muovere tre cursori, uno alla volta, lasciando fermi gli altri due, e guarda come cambia il risultato.'),
 (4,"chiaro",0,"Primo cursore: la tua aliquota di contributo. Che differenza fa, alla fine, passare dall'uno al due, o al tre per cento?"),
 (4,"chiaro",0,"Ricordi la lezione quattro punto quattro, sull'aliquota? Ora puoi vederlo con i tuoi numeri, non con quelli di un esempio inventato."),
 (4,"chiaro",0,"Secondo cursore: il profilo di investimento. Che cosa cambia con un profilo piu' prudente, o con uno piu' dinamico?"),
 (4,"chiaro",0,"Terzo cursore: gli anni. Che cosa succede se resti nel Fondo due anni in piu', prima di chiedere la prestazione? Spesso piu' di quanto ci si aspetti."),
 (4,"chiaro",0,"Non cercare il numero perfetto, perche' non esiste. Cerca di capire quale leva pesa di piu' nel tuo caso."),
 (4,"chiaro",0,"Per qualcuno e' l'aliquota, per qualcun altro il profilo, per altri ancora sono gli anni. Saperlo ti dice dove conviene concentrare le energie."),

 (5,"chiaro",0,"Un'ultima cosa, ma non meno importante, anzi: forse e' la piu' importante di tutte."),
 (5,"chiaro",0,'La proiezione del Fondo ti racconta solo una parte della storia. Per avere il quadro completo, servono anche gli altri pezzi.'),
 (5,"chiaro",0,"Mettila accanto alla stima della tua pensione pubblica, che trovi nel servizio online dell'INPS, e ai tuoi altri risparmi personali, se ne hai."),
 (5,"chiaro",0,'Sono i tre pilastri che hai visto nel modulo uno: la pensione pubblica, quella complementare, e il risparmio personale.'),
 (5,"chiaro",0,"Solo guardandoli insieme capisci se il divario tra stipendio e pensione e' coperto, o se c'e' ancora strada da fare."),

 (6,"profondo",1.2,'Una proiezione non dice dove arriverai. Dice dove stai andando.'),

 (7,"chiaro",0,'Le tre cose da ricordare. Uno: il Fondo offre una proiezione con ipotesi standard, e un simulatore con i tuoi dati.'),
 (7,"chiaro",0,"Due: ogni stima va letta come un ventaglio di possibilita', non come un numero sicuro scritto sulla pietra."),
 (7,"chiaro",0,'Tre: per il quadro completo, affianca la stima del Fondo a quella della pensione pubblica, e ai tuoi risparmi.'),
 (7,"chiaro",0,'La mossa di oggi: fai tre simulazioni, cambiando una sola variabile alla volta.'),
 (7,"chiaro",0,"Prima l'aliquota, poi il profilo, poi gli anni. E annota i tre risultati su un foglio, uno sotto l'altro."),
 (7,"chiaro",0,"Vedrai con i tuoi occhi quale leva sposta di piu' la tua pensione complementare, e quale invece conta poco."),
 (7,"chiaro",0,'Nelle prossime tre lezioni passiamo dalla teoria alle persone, e dai concetti alle decisioni.'),
 (7,"chiaro",0,"Vedremo tre storie concrete, con nomi, eta' e numeri precisi. Persone inventate, ma situazioni molto reali, che potrebbero essere le nostre."),
 (7,"chiaro",0,"La prima e' un'infermiera appena assunta in un'azienda sanitaria, con tutta la carriera davanti."),
 (7,"chiaro",0,"Vedremo che cosa puo' cambiare per lei una scelta fatta oggi, con trentanove anni di lavoro davanti."),
 (7,"chiaro",0,'E come i concetti del corso, dal silenzio-assenso al profilo, diventano per lei decisioni pratiche.'),
 (7,"chiaro",0,"Ricordati di tenere a portata di mano il tuo prospetto: confrontare la sua storia con la tua sara' l'esercizio piu' utile."),
 (7,"chiaro",0,"[warm] L'infermiera neoassunta. Ci vediamo nella lezione dieci punto tre."),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Apertura', 2: 'Due strumenti', 3: 'Un ventaglio, non un numero', 4: 'Tre leve', 5: 'La pensione completa', 6: 'Memo', 7: 'Chiusura'}
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
