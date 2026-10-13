# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Ricordi il sentiero dell'adesione, nel modulo tre? Cinque tappe per entrare nel Fondo, una dopo l'altra."),
 (1,"chiaro",0,"Ora, molti anni dopo, quel sentiero si percorre al contrario. Anche per uscire dal Fondo, al momento della pensione, c'e' un sentiero."),
 (1,"chiaro",0,"Ed e' altrettanto semplice, se lo si conosce in anticipo. Le sorprese, di solito, arrivano a chi lo scopre all'ultimo momento."),
 (1,"chiaro",0,"In questa lezione lo percorriamo tappa per tappa, con calma, e vediamo anche chi puo' accompagnarti nel tratto finale."),
 (1,"chiaro",0,"E' l'ultima lezione del modulo nove: dopo aver visto quando, come e con quali tempi, ora vediamo la domanda vera e propria."),

 (2,"chiaro",0,"Ecco le tappe, in discesa. Sono cinque, come quelle dell'adesione, e vanno fatte nell'ordine giusto."),
 (2,"chiaro",0,'Prima tappa: la cessazione del rapporto di lavoro, con i requisiti che hai visto nella lezione nove punto uno.'),
 (2,"chiaro",0,"Senza la cessazione, ricordalo, il sentiero non parte nemmeno. E' la porta da cui si esce, e va chiusa per prima."),
 (2,"chiaro",0,'Seconda tappa: compili il modulo di richiesta della prestazione. Quello per i dipendenti pubblici, non quello per i privati.'),
 (2,"chiaro",0,"Lo trovi nella sezione modulistica del sito del Fondo, insieme alle istruzioni. E' il documento in cui prendi le decisioni importanti."),
 (2,"chiaro",0,"Li' indichi quanta parte della posizione vuoi in capitale, fino alla meta', e quale delle cinque rendite scegli per il resto."),
 (2,"chiaro",0,"Terza tappa: carichi il modulo firmato nell'area riservata, nella sezione dedicata alle richieste. Niente buste, niente code allo sportello."),
 (2,"chiaro",0,'Quarta tappa: segui la pratica, con gli avvisi che ricevi via email e via SMS. Per questo i recapiti devono essere aggiornati.'),
 (2,"chiaro",0,'Quinta tappa: ricevi le somme sul tuo conto. Prima la parte reale, e poi quella figurativa, con i due treni e i due orari che hai visto nella lezione precedente.'),

 (3,"chiaro",0,"Prima di caricare il modulo, pero', una piccola checklist. Cinque cose da avere pronte sul tavolo, prima di cominciare."),
 (3,"chiaro",0,"Uno: un documento d'identita' valido. Controlla la scadenza, perche' un documento scaduto puo' fermare la pratica."),
 (3,"chiaro",0,"Due: un IBAN intestato a te. E' il conto su cui arriveranno le somme, quindi controlla ogni cifra, una per una."),
 (3,"chiaro",0,"Tre: la data di cessazione del rapporto di lavoro. E' quella che apre il diritto alla prestazione, e va indicata con precisione, giorno, mese e anno."),
 (3,"chiaro",0,'Quattro: la tua scelta tra capitale e rendita, e il tipo di rendita, che hai visto nella lezione nove punto tre.'),
 (3,"chiaro",0,'Cinque, se ne hai: la comunicazione dei contributi non dedotti, fatta nei tempi. Ne abbiamo parlato nella lezione cinque punto quattro, a proposito delle tasse.'),
 (3,"chiaro",0,'Il modulo stesso indica gli allegati necessari nel tuo caso. Non tutti servono a tutti: dipende dalla tua situazione.'),
 (3,"chiaro",0,"Leggilo tutto prima di firmarlo, con calma. E' l'ultima scelta importante del tuo percorso nella previdenza complementare."),

 (4,"chiaro",0,'E una buona notizia: non devi farlo da solo. Ci sono tre aiuti, a portata di mano.'),
 (4,"chiaro",0,"Il primo e' il numero verde del Fondo, che risponde alle domande sulla pratica: a che punto e', che cosa manca, che cosa fare."),
 (4,"chiaro",0,"Il secondo e' il patronato, per noi l'INAS CISL. Puo' aiutarti a mettere insieme la domanda di pensione pubblica e quella complementare."),
 (4,"chiaro",0,'Due domande che spesso si preparano negli stessi mesi, e che conviene preparare insieme, con le stesse date e gli stessi documenti.'),
 (4,"chiaro",0,"Il terzo e' il delegato sindacale della CISL FP sul tuo posto di lavoro, che puo' aiutarti a ricostruire i documenti con l'ufficio del personale."),
 (4,"chiaro",0,"Il consiglio e' uno solo: muoviti qualche mese prima della data di uscita. E' il modo migliore per arrivare preparati."),

 (5,"chiaro",0,"E poi, un giorno, arriva la notifica sul telefono. Una riga sola: la pratica e' conclusa."),
 (5,"chiaro",0,"Dopo anni di venticinque euro al mese, di contributi dell'ente, di TFR accantonato, il salvadanaio si apre."),
 (5,"chiaro",0,"Non e' un premio della lotteria, e non e' un regalo. E' il risultato di una scelta fatta molti anni prima, e mantenuta con costanza nel tempo."),
 (5,"chiaro",0,"Ed e', in fondo, il motivo per cui esiste questo corso: arrivare a quel giorno sapendo esattamente che cosa succede, e perche'."),

 (6,"profondo",1.2,'La domanda si fa dopo. Ma si prepara prima.'),

 (7,"chiaro",0,'Le tre cose da ricordare. Uno: dopo la cessazione, si compila il modulo di richiesta per i dipendenti pubblici.'),
 (7,"chiaro",0,"E' li' che scegli quanto prendere in capitale, e quale tipo di rendita per il resto della posizione."),
 (7,"chiaro",0,"Due: il modulo firmato si carica nell'area riservata, e la pratica si segue passo per passo con gli avvisi via email e SMS."),
 (7,"chiaro",0,'Tre: numero verde, patronato e delegato possono accompagnarti. Non sei solo, nemmeno nel tratto finale.'),
 (7,"chiaro",0,"La mossa di oggi: scarica dal sito del Fondo il modulo di richiesta della prestazione, e leggilo dall'inizio alla fine."),
 (7,"chiaro",0,"Anche se la pensione e' lontana, molto lontana. Sapere che cosa ti chiederanno, un giorno, ti aiuta a decidere meglio gia' oggi."),
 (7,"chiaro",0,"Si chiude cosi' il nono modulo. Abbiamo visto quando chiedere la pensione complementare, in che forma riceverla, con quali tempi, e come fare la domanda."),
 (7,"chiaro",0,"Nell'ultimo modulo del corso mettiamo tutto insieme. Con i tuoi numeri, e con tre storie concrete."),
 (7,"chiaro",0,"Faremo un giro completo nell'area riservata, proveremo insieme il simulatore, e seguiremo tre colleghi in tre situazioni molto diverse."),
 (7,"chiaro",0,"Un'infermiera appena assunta, un'operatrice socio sanitaria in servizio da molti anni, un tecnico a tempo determinato. Tre percorsi, tre scelte."),
 (7,"chiaro",0,"E alla fine, una checklist da tenere a portata di mano per tutti gli anni che verranno, e l'elenco di chi puo' aiutarti."),
 (7,"chiaro",0,"Il modulo dieci si chiama: decidere con i tuoi numeri. Perche' le regole generali le conosci ormai; adesso tocca ai tuoi numeri."),
 (7,"chiaro",0,"E' il modulo in cui tutto quello che hai imparato fin qui diventa finalmente una decisione tua, presa con consapevolezza."),
 (7,"chiaro",0,'[warm] Ci vediamo nel modulo dieci. Con la lezione dieci punto uno.'),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Apertura', 2: 'Le cinque tappe', 3: 'La checklist', 4: 'Non da solo', 5: 'Il giorno della notifica', 6: 'Memo', 7: 'Chiusura'}
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
