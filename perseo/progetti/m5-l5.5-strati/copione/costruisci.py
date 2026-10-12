# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Le rocce raccontano la loro storia a strati. Ogni strato si e' formato in un'epoca diversa, con condizioni diverse."),
 (1,"chiaro",0,"Anche la posizione di un dipendente pubblico iscritto da molti anni e' fatta a strati. Non si vedono, ma ci sono."),
 (1,"chiaro",0,"Perche' per i pubblici le regole fiscali della previdenza complementare sono cambiate due volte, e ogni periodo ha conservato le sue."),
 (1,"chiaro",0,"Questa lezione serve soprattutto a chi e' iscritto da prima del 2018. Ma e' utile a tutti, per capire da dove viene la regola di oggi, e perche' vale la pena restare."),
 (1,"chiaro",0,'Come sempre in questo modulo: informazioni generali, non consulenza fiscale, ed esempi semplificati.'),

 (2,"chiaro",0,"Gli strati sono tre, uno sopra l'altro, come in una parete di roccia. Ognuno corrisponde a un periodo di versamenti."),
 (2,"chiaro",0,"Il primo strato, il piu' profondo, riguarda le somme maturate fino al 2000. E' sottile, e riguarda solo chi era gia' iscritto allora."),
 (2,"chiaro",0,"Il secondo riguarda quelle maturate dal 2001 al 2017. Per molti iscritti di lunga data e' lo strato piu' spesso."),
 (2,"chiaro",0,"Il terzo, quello in superficie, riguarda le somme maturate dal primo gennaio 2018 in poi. Ed e' l'unico che continua a crescere."),
 (2,"chiaro",0,"Perche' proprio il 2018? Perche' i dipendenti pubblici sono rimasti a lungo regolati dalla vecchia legge sulla previdenza complementare, del 1993."),
 (2,"chiaro",0,"Ai lavoratori privati, invece, dal 2007 si applicavano gia' le regole nuove, quelle della scala del fisco."),
 (2,"chiaro",0,'Solo dal 2018 una legge di bilancio ha esteso anche ai pubblici le regole fiscali dei privati. Undici anni dopo.'),
 (2,"chiaro",0,"Le somme maturate prima di quella data, pero', conservano le regole del loro tempo. Come uno strato di roccia, che non cambia piu'."),

 (3,"chiaro",0,"Ecco le regole, in sintesi, strato per strato. Partiamo dal piu' profondo, quello fino al 2000."),
 (3,"chiaro",0,"Su questa parte, la pensione complementare in rendita paga l'IRPEF ordinaria. Ma solo sull'ottantasette e mezzo per cento dell'importo."),
 (3,"chiaro",0,"Sul secondo strato, dal 2001 al 2017, la rendita paga l'IRPEF ordinaria, sull'importo pieno, con gli scaglioni che conosci."),
 (3,"chiaro",0,"Per entrambi gli strati, se invece ritiri in capitale, si applica la tassazione separata: quella usata per la liquidazione, con un'aliquota media calcolata sui redditi."),
 (3,"chiaro",0,'Sul terzo strato, quello maturato dal 2018, vale la scala del quindici-nove per cento che hai visto nella lezione cinque punto tre.'),
 (3,"chiaro",0,"Sia per la rendita, sia per il capitale. E' lo strato con le regole piu' favorevoli, e anche l'unico che cresce."),
 (3,"chiaro",0,"E in tutti e tre gli strati vale una regola comune: i rendimenti gia' tassati e i contributi non dedotti, se comunicati, restano fuori dal calcolo."),
 (3,"chiaro",0,"Quello che ha gia' pagato, non paga due volte. Ormai lo sai."),

 (4,"chiaro",0,'Anche la deduzione, prima del 2018, funzionava diversamente per i pubblici.'),
 (4,"chiaro",0,"Non c'era un limite unico, uguale per tutti. Si poteva dedurre il valore piu' basso tra tre limiti diversi."),
 (4,"chiaro",0,'Il primo: il doppio del TFR destinato al Fondo. Il secondo: il dodici per cento del reddito complessivo.'),
 (4,"chiaro",0,"Il terzo: cinquemilacentosessantaquattro euro e cinquantasette, lo stesso tetto dei privati. E vinceva sempre il piu' piccolo dei tre."),
 (4,"chiaro",0,"Per chi aveva optato dal TFS, con una quota di TFR destinata al Fondo piu' piccola, il primo limite poteva essere piuttosto stretto."),
 (4,"chiaro",0,"Ecco perche' alcuni iscritti di lunga data possono avere, in quegli anni, contributi non dedotti. Proprio quelli della lezione precedente."),
 (4,"chiaro",0,"Dal 2018, invece, vale per tutti il limite unico, quello della lezione cinque punto uno, che dal 2026 e' di cinquemilatrecento euro."),

 (5,"chiaro",0,"Che cosa significa, in pratica, tutto questo? La buona notizia e' che non devi fare nessun calcolo, ne' conservare documenti particolari."),
 (5,"chiaro",0,"Le stratificazioni le gestisce il Fondo quando paga la prestazione, sulla base dei dati di ogni periodo, che ha gia' nei suoi archivi."),
 (5,"chiaro",0,"Ma devi sapere una cosa importante. Ogni anno che passa, lo strato piu' favorevole, quello dal 2018, cresce."),
 (5,"chiaro",0,"Gli strati piu' vecchi, invece, restano fermi. E in proporzione diventano sempre piu' sottili, anno dopo anno, fino a pesare poco."),
 (5,"chiaro",0,"Per chi ha aderito da poco, la regola del quindici-nove per cento riguardera' quasi tutta la posizione. Gli strati vecchi, per lui, non esistono o quasi."),
 (5,"chiaro",0,"Per chi e' iscritto da molti anni, conviene chiedere al Fondo una simulazione che tenga conto degli strati, soprattutto quando si avvicina la pensione."),
 (5,"chiaro",0,"Ti aiutera' a scegliere, per esempio, tra rendita e capitale, sapendo quanto pesa ogni strato. Ne parleremo piu' avanti nel corso, quando arriveremo alla prestazione."),

 (6,"profondo",1.2,'Ogni periodo conserva le sue regole. Dal 2018, quelle migliori valgono anche per te.'),

 (7,"chiaro",0,"Le tre cose da ricordare. Uno: per i dipendenti pubblici la posizione e' divisa in tre strati: fino al 2000, dal 2001 al 2017, e dal 2018."),
 (7,"chiaro",0,"Due: solo dal 2018 vale la tassazione agevolata dal quindici al nove per cento. Prima valevano le regole dell'IRPEF e della tassazione separata."),
 (7,"chiaro",0,'Tre: le stratificazioni le calcola il Fondo, non tu. A te basta sapere che esistono.'),
 (7,"chiaro",0,"La mossa di oggi: trova la data della tua adesione a Perseo Sirio. La trovi nell'area riservata, o nel prospetto annuale."),
 (7,"chiaro",0,"Se e' prima del 2018, segnati di chiedere una simulazione degli strati quando mancheranno pochi anni alla pensione."),
 (7,"chiaro",0,"Se e' dal 2018 in poi, puoi stare tranquillo: per te vale gia' tutta la regola nuova, su tutta la posizione."),
 (7,"chiaro",0,"Si chiude cosi' il quinto modulo. Abbiamo visto i tre vantaggi fiscali: sui contributi, sui rendimenti e sulla prestazione."),
 (7,"chiaro",0,'E i due dettagli che li proteggono: i contributi non dedotti da comunicare, e gli strati dei pubblici.'),
 (7,"chiaro",0,'Ora sai dove la previdenza complementare fa davvero la differenza: il fisco.'),
 (7,"chiaro",0,'Nel prossimo modulo cambiamo prospettiva: dal fisco agli investimenti. Vediamo dove vanno, concretamente, i tuoi soldi.'),
 (7,"chiaro",0,'[warm] Comparti, profili, rischio e rendimento. Ci vediamo nel modulo sei.'),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Apertura', 2: 'Tre strati', 3: 'Le regole', 4: 'La vecchia deduzione', 5: 'Lo strato buono cresce', 6: 'Memo', 7: 'Chiusura'}
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
