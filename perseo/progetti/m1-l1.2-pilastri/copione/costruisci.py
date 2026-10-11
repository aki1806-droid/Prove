# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Pensa a una casa costruita su un solo pilastro. Puo' reggere, finche' tutto va bene. Ma basta una scossa, e oscilla."),
 (1,"chiaro",0,"Le case solide poggiano su piu' pilastri, che si dividono il peso. Se uno cede un poco, gli altri tengono, e chi ci abita quasi non se ne accorge."),
 (1,"chiaro",0,"Il sistema pensionistico italiano e' stato pensato proprio cosi', con tre pilastri. In questa lezione li conosciamo uno per uno, e vediamo su quale si appoggia il Fondo Perseo Sirio."),

 (2,"chiaro",0,"Eccoli. Il primo pilastro e' la pensione pubblica obbligatoria, quella dell'INPS. Il secondo e' la previdenza complementare collettiva: i fondi pensione legati al contratto di lavoro."),
 (2,"chiaro",0,"Il terzo e' il risparmio individuale: tutto quello che decidi di mettere da parte per conto tuo, con gli strumenti che scegli tu."),
 (2,"chiaro",0,"Il primo e' il piu' grande, e regge la maggior parte del peso. Ma come abbiamo visto nella lezione precedente, da solo regge meno di un tempo. Gli altri due servono a distribuire il carico."),

 (3,"chiaro",0,"Il primo pilastro e' obbligatorio: non scegli se aderire, ci sei dentro dal primo giorno di lavoro. Per i dipendenti pubblici lo gestisce l'INPS, attraverso la gestione dipendenti pubblici."),
 (3,"chiaro",0,"Funziona a ripartizione: i contributi di chi lavora oggi pagano le pensioni di chi e' in pensione oggi. Il tuo montante non e' un salvadanaio pieno: e' un conto che registra quanto hai versato."),
 (3,"chiaro",0,"Ed e' il pilastro su cui si versa di piu'. Nel pubblico impiego circa un terzo della retribuzione lorda diventa contributo, ogni mese, fin dal primo stipendio, come abbiamo visto nella lezione precedente."),
 (3,"chiaro",0,"E' un patto tra generazioni. Chi lavora oggi sostiene chi ha lavorato ieri, e domani sara' sostenuto da chi lavorera' dopo."),
 (3,"chiaro",0,"Il suo punto debole e' proprio questo. Se i lavoratori diminuiscono, e i pensionati aumentano e vivono piu' a lungo, il patto si fa piu' stretto: meno spalle per lo stesso peso."),
 (3,"chiaro",0,"Per questo le riforme hanno legato l'assegno ai contributi versati e all'eta' di uscita. Il primo pilastro resta solido, ma promette meno di prima."),

 (4,"chiaro",0,"Il secondo pilastro e' la previdenza complementare. Qui le cose cambiano su tre punti, e conviene guardarli uno per uno."),
 (4,"chiaro",0,"Primo: e' volontaria. Sei tu a decidere se aderire, e quando. Nessuno ti iscrive senza che tu lo sappia, salvo un caso preciso per i neoassunti, che vedremo nel modulo tre."),
 (4,"chiaro",0,"Secondo: funziona a capitalizzazione. I tuoi soldi non pagano la pensione di qualcun altro: vanno su una posizione individuale, intestata a te, e vengono investiti."),
 (4,"chiaro",0,"Quello che accumuli e' tuo, ed e' separato dal patrimonio di chi lo gestisce. Cresce con i versamenti e con i rendimenti, come la curva della lezione precedente."),
 (4,"chiaro",0,"Ed e' un sistema controllato: sui fondi pensione vigila la COVIP, la Commissione di vigilanza, che ne sorveglia le regole, i conti e la trasparenza verso gli iscritti."),
 (4,"chiaro",0,"Terzo, e per un lavoratore dipendente e' il punto piu' importante: se aderisci al fondo previsto dal tuo contratto, anche il datore di lavoro versa una quota."),
 (4,"chiaro",0,"[serious] E' qui che si trova Perseo Sirio: il fondo pensione del secondo pilastro previsto dai contratti della pubblica amministrazione e della sanita'."),
 (4,"chiaro",0,"E c'e' un vantaggio in piu', che vale per tutta la previdenza complementare: i versamenti godono di agevolazioni fiscali. Ne parleremo con calma nel modulo cinque."),

 (5,"chiaro",0,"Il terzo pilastro e' il risparmio personale: un conto deposito, i titoli di Stato, una polizza. Ma anche un piano pensionistico individuale, sottoscritto in banca o in assicurazione."),
 (5,"chiaro",0,"E' libero e flessibile: decidi tu quanto, quando e come. Pero' tutto il peso e' sulle tue spalle. Nessun datore di lavoro aggiunge nulla."),
 (5,"chiaro",0,"E spesso i costi sono piu' alti: commissioni di ingresso, di gestione, di caricamento. Piccole percentuali che, anno dopo anno, si mangiano una parte del rendimento."),
 (5,"chiaro",0,"C'e' anche un terzo pilastro dedicato alla pensione: il PIP, il piano individuale pensionistico. Ha le agevolazioni fiscali dei fondi, ma senza il contributo del datore di lavoro."),
 (5,"chiaro",0,"Non e' un pilastro da trascurare. Ma ha senso costruirlo sopra il secondo, non al suo posto."),

 (6,"chiaro",0,"Facciamo un esempio concreto. Una lavoratrice pubblica mette da parte cinquanta euro al mese su un conto. E' il terzo pilastro: cinquanta euro suoi, e basta."),
 (6,"chiaro",0,"Un suo collega, invece, aderisce al fondo del contratto. Versa la sua quota, l'ente ne aggiunge un'altra, e in piu' nel fondo confluisce il trattamento di fine rapporto."),
 (6,"chiaro",0,"Lo stesso sforzo mensile. Ma nel secondo caso, a lavorare per la pensione non c'e' solo lui: ci sono tre fonti che si sommano ogni mese."),
 (6,"chiaro",0,"E su quella somma lavora anche il tempo, con i rendimenti che producono altri rendimenti. Piu' e' grande quello che entra, piu' e' grande quello che cresce."),
 (6,"chiaro",0,"Vedremo nel modulo quattro le percentuali esatte. Per ora tieni a mente l'immagine: un pilastro sostenuto da tre mani, invece che da una."),

 (7,"chiaro",0,"Riassumiamo dove siamo. Il primo pilastro c'e' comunque, ed e' obbligatorio. Il terzo dipende solo da te."),
 (7,"chiaro",0,"Il secondo, per chi lavora nella pubblica amministrazione e nella sanita', ha un nome preciso: Perseo Sirio."),
 (7,"chiaro",0,"Nel resto del corso parleremo quasi solo di lui: come funziona, quanto costa, quanto conviene dal punto di vista fiscale, e che cosa ti restituisce quando smetti di lavorare."),

 (8,"profondo",1.2,"Una pensione che poggia su un solo pilastro oscilla di piu'."),

 (9,"chiaro",0,"Le tre cose da ricordare. Uno: il primo pilastro, quello dell'INPS, e' obbligatorio e funziona come un patto tra generazioni."),
 (9,"chiaro",0,"Due: il secondo pilastro e' volontario e costruisce una posizione intestata a te. Tre: solo nel secondo pilastro, aderendo al fondo del tuo contratto, versa anche il datore di lavoro."),
 (9,"chiaro",0,"La mossa di oggi: prendi un foglio e scrivi su quali pilastri stai gia' costruendo. Hai un fondo pensione? Un piano individuale? Un risparmio dedicato alla vecchiaia?"),
 (9,"chiaro",0,"Accanto a ciascuno, scrivi quanto ci metti al mese. Anche un foglio quasi vuoto e' un punto di partenza: ci servira' nei prossimi moduli."),
 (9,"chiaro",0,"[warm] Nella prossima lezione: le tre famiglie di fondi pensione, e perche' non sono tutte uguali."),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1:"Apertura",2:"I tre pilastri",3:"Il primo pilastro",4:"Il secondo pilastro",
 5:"Il terzo pilastro",6:"Un esempio",7:"Il tuo secondo pilastro",8:"Memo",9:"Chiusura"}
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
