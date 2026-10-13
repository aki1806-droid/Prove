# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Tra la fine del lavoro e l'inizio della pensione pubblica, a volte, c'e' un fiume da attraversare."),
 (1,"chiaro",0,'Qualche anno senza stipendio e senza pensione. Capita a chi perde il lavoro tardi, a chi deve fermarsi per motivi di salute o di famiglia, a chi sceglie di smettere prima.'),
 (1,"chiaro",0,'Per questi casi la legge ha costruito un ponte. Si chiama RITA: rendita integrativa temporanea anticipata.'),
 (1,"chiaro",0,'Permette di usare la posizione nel fondo pensione come un reddito ponte, fino al momento in cui arriva la pensione di vecchiaia.'),
 (1,"chiaro",0,"In questa lezione vediamo chi puo' attraversarlo, come funziona, e quando conviene davvero usarlo."),

 (2,"chiaro",0,'Le strade per arrivare alla RITA sono due. Hanno un punto di partenza comune, e alcune condizioni diverse. Vediamole una per volta, con calma.'),
 (2,"chiaro",0,"La prima strada. Hai cessato l'attivita' lavorativa. E hai almeno vent'anni di contributi nella pensione pubblica."),
 (2,"chiaro",0,"Hai almeno cinque anni di partecipazione alla previdenza complementare. E ti mancano al massimo cinque anni all'eta' della pensione di vecchiaia."),
 (2,"chiaro",0,"La seconda strada. Hai cessato l'attivita', e sei senza lavoro da piu' di ventiquattro mesi."),
 (2,"chiaro",0,"Anche qui servono cinque anni di partecipazione. Ma il ponte puo' essere piu' lungo: ti possono mancare fino a dieci anni alla vecchiaia."),
 (2,"chiaro",0,"In entrambi i casi, il requisito comune e' aver smesso di lavorare. La RITA non si puo' chiedere mentre si lavora: e' pensata proprio per gli anni senza lavoro."),
 (2,"chiaro",0,"Ed e' importante partire dalla tua data di pensione di vecchiaia, quella del sistema pubblico: e' da quella che si contano gli anni che mancano, non dalla data in cui smetti."),

 (3,"chiaro",0,"Come funziona, in pratica? Il primo passo e' decidere quanta parte della posizione destinare alla RITA."),
 (3,"chiaro",0,"Puoi destinarle tutta la posizione, oppure solo una parte. La scelta e' tua, e dipende da quanto ti serve per vivere negli anni del ponte."),
 (3,"chiaro",0,"Quella somma ti viene pagata in rate trimestrali, dal momento in cui la domanda e' accettata fino all'eta' della pensione di vecchiaia."),
 (3,"chiaro",0,"Una rata ogni tre mesi, come uno stipendio ridotto, che ti accompagna attraverso il ponte fino all'altra sponda."),
 (3,"chiaro",0,"Un esempio semplice, solo per capire. Destini alla RITA quarantamila euro, e ti mancano cinque anni: sono venti rate trimestrali, circa duemila euro l'una, prima delle tasse."),
 (3,"chiaro",0,'Nel frattempo, la parte destinata alla RITA continua a essere investita. Di norma nel comparto Garantito, salvo una tua diversa scelta.'),
 (3,"chiaro",0,"Per questo l'importo delle rate puo' variare un po' nel tempo, in base ai rendimenti: non e' una cifra fissa e garantita."),
 (3,"chiaro",0,'E la parte che non usi per la RITA? Resta nel Fondo. La potrai ricevere al pensionamento, come capitale e rendita.'),
 (3,"chiaro",0,"Un dettaglio che hai visto nel modulo sette: per chi e' in RITA, la quota associativa annua scende a dieci euro."),

 (4,"chiaro",0,'Ci sono poi tre cose buone da sapere, prima di decidere se chiedere la RITA.'),
 (4,"chiaro",0,"La prima: la RITA gode della tassazione agevolata prevista per le prestazioni pensionistiche, non di quella piu' pesante del riscatto volontario."),
 (4,"chiaro",0,"Cioe' la scala dal quindici al nove per cento, in base agli anni di partecipazione, sulle somme a cui si applica."),
 (4,"chiaro",0,"La seconda: la RITA si puo' revocare, secondo le modalita' stabilite dal Fondo. Non e' una scelta definitiva."),
 (4,"chiaro",0,'La terza: se trasferisci la posizione ad altro fondo, la RITA si considera revocata automaticamente. Le due cose non stanno insieme.'),
 (4,"chiaro",0,'La domanda si presenta al Fondo con un modulo dedicato, dopo la cessazione del rapporto di lavoro. Sul sito del Fondo trovi anche un documento informativo che spiega tutto nel dettaglio.'),
 (4,"chiaro",0,'Leggilo prima di firmare: ci sono i requisiti, i documenti da allegare, e gli esempi di calcolo delle rate.'),

 (5,"chiaro",0,"Per chi e' utile la RITA? Per chi lascia il lavoro qualche anno prima della pensione, per scelta o per necessita', e ha bisogno di un reddito ponte."),
 (5,"chiaro",0,'Ma va valutata con cura, senza fretta. Usare la posizione prima significa avere meno pensione complementare dopo.'),
 (5,"chiaro",0,"Quello che spendi negli anni del ponte non ci sara' piu' quando arrivera' la vecchiaia, che puo' durare a lungo."),
 (5,"chiaro",0,"Prima di chiederla, fai i conti. Quanto ti serve ogni mese, per quanti anni, e quanto restera' al momento della pensione."),
 (5,"chiaro",0,'A volte basta destinare alla RITA solo una parte della posizione, e lasciare il resto a crescere per dopo.'),
 (5,"chiaro",0,'Il patronato e il Fondo possono aiutarti a fare la simulazione, con i tuoi numeri veri e non con quelli di un esempio.'),
 (5,"chiaro",0,"E ricordati della pensione pubblica: verifica con l'INPS o con il patronato la data esatta in cui arrivera'."),

 (6,"profondo",1.2,"La RITA e' un ponte verso la pensione. Usalo per attraversare, non per svuotare."),

 (7,"chiaro",0,'Le tre cose da ricordare. Uno: la RITA richiede la cessazione del lavoro e cinque anni di partecipazione alla previdenza complementare.'),
 (7,"chiaro",0,"Due: si puo' chiedere fino a cinque anni prima della vecchiaia, se hai almeno vent'anni di contributi nella pensione pubblica."),
 (7,"chiaro",0,"Oppure fino a dieci anni prima, se si e' senza lavoro da oltre due anni."),
 (7,"chiaro",0,'Tre: si riceve in rate trimestrali, con la tassazione agevolata dal quindici al nove per cento.'),
 (7,"chiaro",0,"La mossa di oggi: prendi l'estratto conto contributivo dell'INPS, quello che hai visto nel modulo uno."),
 (7,"chiaro",0,"E calcola in che anno raggiungerai vent'anni di contributi. E' la prima condizione per la prima strada della RITA."),
 (7,"chiaro",0,"Annota anche l'anno in cui compirai l'eta' della pensione di vecchiaia, che oggi e' sessantasette anni. Tra le due date c'e' lo spazio in cui il ponte potrebbe servirti."),
 (7,"chiaro",0,"Nella prossima lezione, l'ultima del modulo, affrontiamo un tema delicato, ma importante, da guardare con calma."),
 (7,"chiaro",0,"Che cosa succede alla posizione se l'iscritto muore prima della pensione, chi la riceve, e come fare perche' vada alle persone giuste."),
 (7,"chiaro",0,"E chiuderemo con un tema molto pratico per tanti lavoratori pubblici: la cessione del quinto, e che cosa c'entra con il fondo pensione."),
 (7,"chiaro",0,'[warm] Se succede il peggio. Ci vediamo nella lezione otto punto cinque.'),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Apertura', 2: 'Le due strade', 3: 'Come funziona', 4: 'Buono a sapersi', 5: "Per chi e' utile", 6: 'Memo', 7: 'Chiusura'}
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
