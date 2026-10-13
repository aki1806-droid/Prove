# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Arriva il giorno in cui consegni le chiavi dell'armadietto. Saluti i colleghi in corridoio, esci nel sole, e dietro di te si chiude una porta."),
 (1,"chiaro",0,"Dopo anni di versamenti, il salvadanaio e' pronto per essere aperto. Ma quando, esattamente, puoi chiedere la pensione complementare?"),
 (1,"chiaro",0,'Non coincide sempre con la pensione pubblica. Il Fondo ha regole proprie, e dal 2027 ne cambia una importante, che riguarda proprio chi pensa di uscire prima.'),
 (1,"chiaro",0,'In questa lezione vediamo i requisiti con precisione: quelli che valgono sempre, per tutti, e quelli che invece cambiano con il calendario.'),
 (1,"chiaro",0,'Con questo modulo arriviamo al traguardo: il momento in cui la pensione complementare smette di essere una cifra sul prospetto e diventa reale.'),

 (2,"chiaro",0,"Partiamo dalla regola che vale sempre, in ogni caso, per chiunque. E' la piu' semplice, ma anche quella che si dimentica piu' spesso."),
 (2,"chiaro",0,"Per ottenere qualunque prestazione dal Fondo, il requisito imprescindibile e' la cessazione del rapporto di lavoro."),
 (2,"chiaro",0,"Finche' lavori in un ente che aderisce a Perseo Sirio, la posizione non si puo' liquidare. Resta li', investita, e continua a crescere con i versamenti di ogni mese."),
 (2,"chiaro",0,'Le uniche eccezioni sono le anticipazioni che hai visto nel modulo otto: la prima casa, le spese sanitarie straordinarie e i congedi formativi. Solo questi tre motivi.'),
 (2,"chiaro",0,"E abbiamo gia' detto che passare da un ente all'altro tra quelli che aderiscono al Fondo, o cambiare profilo professionale, non conta come cessazione."),
 (2,"chiaro",0,"E' una regola che ha senso: il Fondo nasce per accompagnarti dopo il lavoro, non durante. Il salvadanaio resta chiuso finche' c'e' lo stipendio."),
 (2,"chiaro",0,"Una volta cessato il rapporto, le strade per la pensione complementare sono due: la vecchiaia e l'anzianita'. Vediamole una alla volta."),

 (3,"chiaro",0,"La prima strada: la pensione complementare di vecchiaia. E' la strada principale, quella che la maggior parte degli iscritti percorrera'."),
 (3,"chiaro",0,"Si ottiene quando raggiungi l'eta' della pensione di vecchiaia nel sistema pubblico, che oggi e' di sessantasette anni."),
 (3,"chiaro",0,"E quando hai almeno cinque anni di iscrizione alla previdenza complementare. Due condizioni insieme: l'eta', e un minimo di anni nel Fondo."),
 (3,"chiaro",0,"La seconda strada: la pensione complementare di anzianita'. E' pensata per chi smette di lavorare prima dell'eta' di vecchiaia."),
 (3,"chiaro",0,"Si ottiene quando cessi l'attivita' lavorativa e hai un'eta' inferiore di non piu' di dieci anni rispetto a quella di vecchiaia."),
 (3,"chiaro",0,"Qui, pero', gli anni di iscrizione richiesti non sono cinque. Sono quindici. Tre volte tanto, perche' l'uscita arriva prima."),
 (3,"chiaro",0,"Lo Statuto prevede una deroga transitoria, che riduce questo requisito a cinque anni. Ma solo nei primi anni di attivita' del Fondo."),
 (3,"chiaro",0,"Il sito del Fondo indica che la deroga vale fino al 2026. Ed e' qui che arriva la novita' di cui parlavamo all'inizio."),

 (4,"chiaro",0,"Che cosa significa, in pratica? Facciamo un esempio con due persone, entrambe iscritte da otto anni, entrambe qualche anno prima dell'eta' di vecchiaia."),
 (4,"chiaro",0,"La prima smette di lavorare nel 2026. Per lei la porta e' ancora larga: bastano cinque anni di iscrizione, e lei ne ha otto."),
 (4,"chiaro",0,"Puo' chiedere subito la pensione complementare di anzianita', senza aspettare l'eta' di vecchiaia."),
 (4,"chiaro",0,"La seconda smette nel 2027, con gli stessi otto anni. Ma ora la porta si e' stretta: per l'anzianita' ne servono quindici, e lei si ferma davanti."),
 (4,"chiaro",0,"Non perde nulla, pero'. La posizione resta nel Fondo, continua a essere investita, e potra' chiederla all'eta' di vecchiaia, con il requisito dei cinque anni."),
 (4,"chiaro",0,"Oppure, se ne ha i requisiti, puo' valutare la RITA, il reddito ponte che hai visto nel modulo otto, proprio per coprire quegli anni senza stipendio."),
 (4,"chiaro",0,"Chi invece va in pensione senza aver raggiunto nemmeno i cinque anni di iscrizione non ha accesso a nessuna delle due strade. Puo' solo riscattare la posizione."),
 (4,"chiaro",0,"Con una tassazione meno favorevole: il ventitre' per cento, invece della scala che scende dal quindici al nove. Ecco perche' conviene aderire presto."),

 (5,"chiaro",0,"Un'avvertenza importante sull'eta'. L'eta' della pensione di vecchiaia nel sistema pubblico non e' fissa per sempre."),
 (5,"chiaro",0,"Segue l'aumento della speranza di vita. Oggi e' sessantasette anni, e dal 2027 e' previsto un primo piccolo aumento."),
 (5,"chiaro",0,"Questo cambia anche i conti per la pensione complementare: sia per la vecchiaia, sia per i dieci anni dell'anzianita', che si contano a ritroso da quell'eta'."),
 (5,"chiaro",0,'Per questo, quando pianifichi, parti sempre dalla tua data di pensione pubblica, non da un numero generico sentito in giro.'),
 (5,"chiaro",0,"Puoi verificarla con i servizi online dell'INPS, oppure con il patronato, che ti aiuta anche a leggere l'estratto conto contributivo."),
 (5,"chiaro",0,"E' quella data a determinare anche quando potrai chiedere la pensione complementare. Scrivila sul calendario: da li' parte tutto il resto."),

 (6,"profondo",1.2,"Il salvadanaio si apre quando chiudi l'armadietto. Mai prima."),

 (7,"chiaro",0,'Le tre cose da ricordare. Uno: la pensione complementare si chiede solo dopo aver cessato il rapporto di lavoro.'),
 (7,"chiaro",0,"Due: per la vecchiaia servono l'eta' della pensione pubblica e cinque anni di iscrizione al Fondo."),
 (7,"chiaro",0,"Tre: per l'anzianita', fino a dieci anni prima della vecchiaia, dal 2027 servono quindici anni di iscrizione."),
 (7,"chiaro",0,'La mossa di oggi: conta quanti anni di iscrizione avrai nel momento in cui pensi di smettere di lavorare.'),
 (7,"chiaro",0,'Prendi la data di adesione dal prospetto annuale, e la data di uscita che hai in mente. Fai la sottrazione, con calma.'),
 (7,"chiaro",0,"Ti dira' quale strada si aprira' per te: la vecchiaia, l'anzianita', o solo il riscatto."),
 (7,"chiaro",0,"E se il conto e' vicino a una soglia, ricorda: ogni anno di iscrizione in piu' puo' aprire una porta che altrimenti resterebbe chiusa."),
 (7,"chiaro",0,'Nella prossima lezione affrontiamo la prima grande scelta del pensionamento, quella che si fa una volta sola.'),
 (7,"chiaro",0,"Al momento della pensione, la posizione puo' diventare una somma unica, un assegno per tutta la vita, o un po' di entrambi."),
 (7,"chiaro",0,"Vedremo la regola del cinquanta per cento, l'eccezione per le posizioni piccole, e come scegliere."),
 (7,"chiaro",0,'E vedremo anche come le tasse trattano il capitale e la rendita.'),
 (7,"chiaro",0,'[warm] Capitale o rendita? Ci vediamo nella lezione nove punto due.'),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Apertura', 2: 'La regola che vale sempre', 3: "Vecchiaia e anzianita'", 4: 'Dal 2027', 5: "L'eta' che si muove", 6: 'Memo', 7: 'Chiusura'}
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
