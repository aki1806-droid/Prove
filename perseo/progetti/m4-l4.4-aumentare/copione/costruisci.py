# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] L'adesione non e' un contratto scolpito nella pietra. E' piu' simile a una radio, con le sue manopole."),
 (1,"chiaro",0,"La vita cambia: un aumento, un figlio, un mutuo, una spesa imprevista, un periodo piu' tranquillo. E la tua contribuzione puo' cambiare con lei, seguendo i tuoi tempi."),
 (1,"chiaro",0,'In questa lezione vediamo le tre manopole che puoi girare da solo, senza chiedere il permesso a nessuno.'),
 (1,"chiaro",0,'Aumentare o ridurre il tuo contributo mensile. Fare versamenti extra. E, se serve davvero, sospendere. Con i tempi e i passaggi pratici.'),

 (2,"chiaro",0,"Prima manopola: la percentuale del tuo contributo. Immaginala come un cursore, che parte dall'uno per cento."),
 (2,"chiaro",0,"Lo Statuto dice che, rispettato il minimo, decidi tu liberamente quanto versare. Due, tre, cinque per cento, o anche di piu'."),
 (2,"chiaro",0,"Oltre una certa cifra, pero', entra in gioco un limite fiscale: il tetto di deducibilita', che vedremo nel modulo cinque."),
 (2,"chiaro",0,"Mentre il tuo cursore si sposta, quello dell'ente resta fermo all'uno per cento, qualunque cifra tu scelga. Lo abbiamo visto nella lezione precedente."),
 (2,"chiaro",0,"Il cursore si puo' muovere una volta all'anno: per alzarlo, oppure per riportarlo verso il minimo. Non serve motivare la scelta."),
 (2,"chiaro",0,"Come si fa? Dall'area riservata del Fondo, nella sezione dedicata alla contribuzione, c'e' la funzione per modificare l'aliquota."),
 (2,"chiaro",0,"Alla fine della procedura stampi un modulo, lo firmi e lo consegni alla tua amministrazione. Solo all'amministrazione, non al Fondo."),
 (2,"chiaro",0,"E' l'ufficio del personale che cambia la trattenuta in busta paga. La modifica parte dal mese successivo alla consegna, e la vedrai nel primo cedolino utile."),
 (2,"chiaro",0,"Se il tuo stipendio e' gestito da NoiPA, invece, fai tutto dal portale, nella sezione dedicata alla previdenza complementare. Senza moduli di carta."),

 (3,"chiaro",0,"Un esempio, con la retribuzione utile di trentamila euro l'anno che usiamo in tutto il modulo. Esempio semplificato, importi lordi."),
 (3,"chiaro",0,"Passare dall'uno al tre per cento significa versare settantacinque euro al mese invece di venticinque."),
 (3,"chiaro",0,"Cinquanta euro in piu' al mese. Seicento euro in piu' l'anno nella tua posizione, che verranno investiti."),
 (3,"chiaro",0,"Prova con il tuo stipendio. Ogni punto percentuale in piu' vale l'uno per cento della tua retribuzione utile: diviso per dodici, e' il costo al mese."),
 (3,"chiaro",0,'E non sono seicento euro persi dalla busta paga. Come vedremo nel modulo cinque, sono deducibili dal reddito.'),
 (3,"chiaro",0,"Quindi, nella pratica, ti costano meno di seicento euro, perche' su quella parte paghi meno IRPEF. Quanto meno, dipende dalla tua aliquota."),
 (3,"chiaro",0,"Ricorda pero': l'ente resta all'uno per cento. Il di piu' e' tutto tuo, ed e' tutto a tuo vantaggio."),

 (4,"chiaro",0,"Seconda manopola: i versamenti volontari. E' come una fessura laterale del salvadanaio, diversa dalle tre che conosci, che si apre quando vuoi tu."),
 (4,"chiaro",0,'Oltre alla trattenuta mensile, puoi versare una somma quando preferisci, anche una sola volta. Per esempio a fine anno, dopo la tredicesima, o quando ricevi un arretrato.'),
 (4,"chiaro",0,"Si fa con un bonifico, seguendo la procedura dell'area riservata, dove trovi anche le coordinate del Fondo e la causale da usare."),
 (4,"chiaro",0,'Il versamento finisce nella tua posizione, e viene investito nel profilo che hai scelto, insieme a tutti gli altri contributi.'),
 (4,"chiaro",0,"C'e' una differenza importante tra le due strade. I contributi trattenuti in busta paga vengono dedotti direttamente dall'ente, senza che tu faccia nulla."),
 (4,"chiaro",0,"I versamenti con bonifico, invece, li porti in deduzione tu, nella dichiarazione dei redditi dell'anno dopo."),
 (4,"chiaro",0,"[serious] Per questo conserva sempre la ricevuta del bonifico. E' il documento che ti serve per avere lo sconto fiscale."),

 (5,"chiaro",0,'Terza manopola: la sospensione. Se attraversi un periodo difficile, puoi sospendere i tuoi versamenti con un apposito modulo.'),
 (5,"chiaro",0,"Non perdi l'iscrizione, e la posizione resta investita. I soldi gia' versati continuano a lavorare per te, anche durante la pausa."),
 (5,"chiaro",0,"Pero', come abbiamo visto nella lezione precedente, insieme ai tuoi si fermano anche i contributi dell'ente."),
 (5,"chiaro",0,"Il TFR figurativo, invece, continua ad accumularsi all'INPS, come prima."),
 (5,"chiaro",0,"E ogni mese di stop e' un mese senza l'uno per cento dell'ente. Una perdita piccola, che pero' si somma nel tempo."),
 (5,"chiaro",0,"Se puoi, valuta prima l'alternativa: ridurre il contributo al minimo. Ti costa poco, e ti fa conservare l'uno per cento dell'amministrazione."),
 (5,"chiaro",0,"Quando la situazione migliora, puoi riprendere i versamenti, o aumentarli di nuovo. Le manopole restano sempre li', a tua disposizione."),

 (6,"chiaro",0,"Un'ultima possibilita', poco conosciuta, che riguarda chi e' gia' vicino alla fine della carriera."),
 (6,"chiaro",0,"Lo Statuto consente di continuare a versare al Fondo anche dopo aver raggiunto l'eta' della pensione."),
 (6,"chiaro",0,"A una condizione: avere gia' almeno un anno di contribuzione nella previdenza complementare al momento della pensione."),
 (6,"chiaro",0,"Puo' essere utile a chi ha iniziato tardi, e vuole dare al proprio salvadanaio qualche anno in piu' per crescere."),
 (6,"chiaro",0,"E' una scelta da valutare con calma, magari con il Fondo o con il sindacato, perche' dipende molto dalla tua situazione."),

 (7,"profondo",1.2,'Il minimo lo fissa il contratto. Il resto lo decidi tu.'),

 (8,"chiaro",0,"Le tre cose da ricordare. Uno: puoi cambiare il tuo contributo una volta l'anno, dall'area riservata, consegnando il modulo all'ente."),
 (8,"chiaro",0,'La modifica parte dal mese dopo. E se sei su NoiPA, fai tutto dal portale.'),
 (8,"chiaro",0,'Due: puoi fare versamenti volontari con bonifico, ma la deduzione la chiedi tu, nella dichiarazione dei redditi.'),
 (8,"chiaro",0,"Tre: puoi sospendere, ma perdi l'uno per cento dell'ente. Spesso conviene ridurre al minimo e tenere aperta la busta."),
 (8,"chiaro",0,"La mossa di oggi, se sei iscritto: entra nell'area riservata del Fondo e trova la sezione della contribuzione, quella con la funzione per modificare l'aliquota."),
 (8,"chiaro",0,"Non devi cambiare nulla, oggi. Basta sapere dov'e', per quando ti servira'. E se non hai ancora le credenziali, chiedile al Fondo."),
 (8,"chiaro",0,'[warm] Nella prossima lezione: come ritrovare tutto questo in busta paga, e nel prospetto annuale del Fondo.'),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Apertura', 2: 'Il cursore', 3: 'Un esempio', 4: 'Versamenti extra', 5: 'Sospendere', 6: 'Dopo la pensione', 7: 'Memo', 8: 'Chiusura'}
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
