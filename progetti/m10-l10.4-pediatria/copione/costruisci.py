# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Le cause di arresto, nel bambino, sono diverse: l'arresto e' quasi sempre respiratorio, non cardiaco. E per questo cambia la sequenza della rianimazione."),
 (1,"profondo",1.2,"[serious] Il bambino non e' un adulto piccolo."),
 (1,"chiaro",0,"In questa lezione: il supporto di base pediatrico, l'ostruzione delle vie aeree nelle tre eta', le convulsioni febbrili e, in cenni, il parto imminente e l'emorragia che puo' seguirlo."),

 (2,"chiaro",0,"Le eta', perche' da queste dipendono le tecniche. Lattante: sotto un anno. Bambino: da un anno alla puberta'. Dopo la puberta' si usano gli algoritmi dell'adulto."),
 (2,"chiaro",0,"E il principio: nel bambino l'arresto cardiaco e' raramente improvviso. E' quasi sempre la conseguenza di un'insufficienza respiratoria o circolatoria non riconosciuta."),
 (2,"chiaro",0,"Per questo, nel supporto pediatrico, l'ossigenazione viene prima di tutto il resto: riconoscere presto un bambino che respira male e' gia' rianimazione."),

 (3,"chiaro",0,"La sequenza del supporto di base pediatrico: sicurezza, coscienza, aiuto, apertura delle vie aeree, valutazione del respiro per non piu' di dieci secondi."),
 (3,"chiaro",0,"Poi la prima differenza rispetto all'adulto: cinque ventilazioni iniziali, perche' il problema e' quasi sempre la mancanza di ossigeno."),
 (3,"chiaro",0,"Poi si cercano i segni di vita: movimenti, tosse, respiro normale. Se sono assenti, si inizia la rianimazione: quindici compressioni e due ventilazioni, per gli operatori sanitari."),

 (4,"chiaro",0,"Le differenze tecniche. Nel lattante il capo va in posizione neutra: un'iperestensione chiude la sua trachea, che e' morbida. Nel bambino, una lieve estensione."),
 (4,"chiaro",0,"La ventilazione del lattante si fa bocca-bocca-naso, coprendo con la propria bocca sia la bocca sia il naso del piccolo. Il volume e' quello che basta a sollevare il torace, niente di piu'."),
 (4,"chiaro",0,"Le compressioni: profondita' di almeno un terzo del diametro del torace, circa quattro centimetri nel lattante e cinque nel bambino, alla stessa frequenza dell'adulto."),
 (4,"chiaro",0,"Nel lattante si usano due pollici, con le mani che circondano il torace, se si e' in due; oppure due dita. Nel bambino, una o due mani."),

 (5,"chiaro",0,"Il defibrillatore si puo' usare anche nel bambino, preferibilmente con piastre pediatriche o con un attenuatore, che riduce l'energia erogata, nei piu' piccoli."),
 (5,"chiaro",0,"Se non ci sono, si usano le piastre per adulto, magari una davanti e una dietro, perche' non si tocchino. Avere solo quelle dell'adulto non e' un motivo per non defibrillare."),

 (6,"chiaro",0,"L'ostruzione delle vie aeree da corpo estraneo. Se la persona tossisce in modo efficace, la si incoraggia a tossire e non si interviene: la tosse e' il meccanismo piu' efficace che esista."),
 (6,"chiaro",0,"Se la tosse diventa inefficace e la persona e' ancora cosciente: cinque colpi interscapolari, fra le scapole, alternati a cinque compressioni addominali, la manovra di Heimlich."),
 (6,"chiaro",0,"Se perde coscienza, la si adagia a terra, si chiama il centodiciotto e si inizia la rianimazione: le compressioni toraciche possono espellere il corpo estraneo."),
 (6,"chiaro",0,"Negli obesi e nelle donne in gravidanza avanzata, al posto delle compressioni addominali si usano compressioni toraciche. Il principio non cambia: colpi e compressioni alternati, finche' il corpo estraneo non esce."),

 (7,"chiaro",0,"Nel lattante la tecnica cambia. Lo si pone a pancia in giu' sull'avambraccio, sostenendo la testa, con la testa piu' in basso del tronco, e si danno cinque colpi dorsali."),
 (7,"chiaro",0,"Poi lo si gira a pancia in su e si eseguono cinque compressioni toraciche, con la tecnica delle due dita. E si alterna: cinque colpi, cinque compressioni, finche' il corpo estraneo non esce."),
 (7,"profondo",1.2,"[serious] Mai compressioni addominali nel lattante."),
 (7,"chiaro",0,"Il fegato e la milza sono esposti e si lesionano facilmente. E non si esplora la bocca alla cieca: si rischia di spingere il corpo estraneo piu' in fondo."),

 (8,"chiaro",0,"Le convulsioni febbrili, frequenti fra circa sei mesi e cinque anni. Si associano alla febbre, sono generalizzate e di solito brevi, e nella maggior parte dei casi sono benigne."),
 (8,"chiaro",0,"Durante la crisi, le regole della lezione otto punto sei: proteggere, niente in bocca, posizione laterale, cronometrare. Oltre cinque minuti, una benzodiazepina secondo protocollo."),
 (8,"chiaro",0,"Per esempio midazolam per via buccale o diazepam per via rettale. E due cose da sapere: gli antipiretici non prevengono le recidive, e i genitori vanno rassicurati e istruiti."),

 (9,"chiaro",0,"I segni di gravita' nel bambino. Respiratori: rientramenti, alitamento delle pinne nasali, gemito espiratorio, tachipnea. Circolatori: tachicardia, riempimento lento, cute marezzata."),
 (9,"chiaro",0,"Neurologici: sonnolenza, irritabilita', e un segno che i genitori notano subito, prima di chiunque altro: un bambino che non li riconosce."),
 (9,"chiaro",0,"E due avvertenze. Nel bambino la bradicardia e' un segno pre-terminale, di ipossia gravissima. E l'ipotensione compare tardi, perche' il bambino compensa a lungo."),

 (10,"chiaro",0,"Il parto imminente, in cenni. I segni: contrazioni ravvicinate e intense, un bisogno irresistibile di spingere, la rottura delle membrane, la testa visibile al perineo."),
 (10,"chiaro",0,"Si chiama aiuto, il centodiciotto, l'ostetrica. Non si ostacola il parto, e non si trasporta la donna se il parto e' in corso: e' piu' sicuro assisterlo dove si e'."),

 (11,"chiaro",0,"L'assistenza. Si sostiene la testa del neonato senza tirare. Si controlla se il cordone e' avvolto attorno al collo: se e' lento, lo si sfila sopra la testa."),
 (11,"chiaro",0,"Appena nato, il neonato si asciuga, si stimola e si riscalda: l'ipotermia e' il pericolo principale. Poi contatto pelle a pelle con la madre."),
 (11,"chiaro",0,"Il clampaggio del cordone non e' urgente: si fa dopo almeno un minuto. Si annota l'ora del parto. E non si tira il cordone: la placenta deve uscire spontaneamente."),

 (12,"chiaro",0,"Il punteggio di Apgar valuta il neonato a uno e a cinque minuti. Cinque parametri, con le iniziali della parola: aspetto, cioe' il colorito; polso, la frequenza cardiaca."),
 (12,"chiaro",0,"Grimace, la risposta riflessa; attivita', il tono muscolare; respirazione. Da zero a due punti ciascuno, totale da zero a dieci. Da sette a dieci e' normale; sotto, il neonato ha bisogno di assistenza."),

 (13,"chiaro",0,"L'emorragia post-partum, la complicanza ostetrica piu' temuta. La causa piu' frequente e' l'atonia uterina: l'utero non si contrae, e la sede placentare continua a sanguinare."),
 (13,"chiaro",0,"Le cause si ricordano con quattro T: tono; trauma; tessuto, cioe' residui placentari; trombina, cioe' problemi della coagulazione."),
 (13,"chiaro",0,"Gli interventi immediati: massaggio del fondo uterino, che stimola la contrazione, chiamare aiuto, accessi venosi, e farmaci uterotonici secondo prescrizione."),

 (14,"chiaro",0,"Il caso. Lattante di otto mesi che stava mangiando: improvvisamente non riesce a piangere ne' a tossire, diventa cianotico, ma e' cosciente. Che cosa fai?"),
 (14,"chiaro",0,"E' un'ostruzione completa, con tosse inefficace. Qualcuno chiama il centodiciotto. Pancia in giu' sull'avambraccio, testa in basso, cinque colpi dorsali."),
 (14,"chiaro",0,"Poi pancia in su, cinque compressioni toraciche. Si alterna fino alla risoluzione. Se perde coscienza, rianimazione con le cinque ventilazioni iniziali. Mai compressioni addominali."),

 (15,"chiaro",0,"In Veneto l'emergenza pediatrica e ostetrica e' organizzata in rete, con i punti nascita, il trasporto neonatale d'emergenza e la formazione PBLSD del personale."),
 (15,"chiaro",0,"Molte aziende organizzano anche corsi di disostruzione per i genitori: un esempio di educazione alla salute con un impatto diretto, perche' i primi minuti, a casa, sono nelle loro mani."),

 (16,"chiaro",0,"La tabella. Lattante sotto un anno. Cinque ventilazioni iniziali, poi quindici a due. Compressioni a un terzo del torace. Nel lattante, capo neutro."),
 (16,"chiaro",0,"Ostruzione: tosse efficace, incoraggiare; inefficace, cinque colpi e cinque compressioni, toraciche nel lattante. Convulsioni oltre cinque minuti, benzodiazepina. Apgar a uno e cinque minuti."),

 (17,"chiaro",0,"E dopo il parto, se sanguina: massaggio del fondo uterino, aiuto, accessi venosi, uterotonici. E le quattro T del post-partum: tono, trauma, tessuto, trombina."),
 (17,"chiaro",0,"[warm] Nella prossima lezione restiamo sulle vie aeree, nell'adulto critico: i presidi, l'intubazione, la ventilazione meccanica e la sicurezza del paziente ventilato. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"Le eta'",3:"Il PBLS",4:"Le differenze tecniche",5:"Il defibrillatore nel bambino",6:"L'ostruzione nell'adulto e nel bambino",
 7:"L'ostruzione nel lattante",8:"Le convulsioni febbrili",9:"I segni di gravita'",10:"Il parto imminente",11:"L'assistenza al parto",12:"L'Apgar",
 13:"L'emorragia post-partum",14:"Il caso",15:"In Veneto",16:"La tabella",17:"Chiusura"}

# Deroghe al limite di 225 caratteri, dichiarate una per una con il motivo:
# la voce e' gia' generata e non ha fatto pausa dove il copione staccava, e il
# confine si mette dove la voce si ferma, non dove il copione vorrebbe.
DEROGHE = {}
ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CPS = 17.0   # misurata su 1.2, confermata da 1.3 a 1.8

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
    if len(b["text"])>225 and b["id"] not in DEROGHE: errori.append(f'{b["id"]}: {len(b["text"])} car, blocco troppo lungo')
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
