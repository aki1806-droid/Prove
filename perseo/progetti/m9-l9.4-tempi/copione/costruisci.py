# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,'[warm] Una stazione, un tabellone con gli orari, una valigia accanto alla panchina. Hai chiesto la prestazione, e ora aspetti.'),
 (1,"chiaro",0,'Al pensionamento, i soldi del fondo pensione non arrivano tutti insieme, nello stesso giorno. Arrivano su due treni diversi.'),
 (1,"chiaro",0,"Due treni con due orari diversi, e con due macchinisti diversi: il Fondo e l'INPS. Saperlo prima evita brutte sorprese, e permette di organizzarsi."),
 (1,"chiaro",0,'In questa lezione vediamo quando parte ogni treno, chi lo guida, e che cosa puoi fare tu, in concreto, per non perdere tempo.'),
 (1,"chiaro",0,'E alla fine vediamo anche come organizzare il primo anno di pensione, sapendo con buona approssimazione quando arriva ogni somma, e da chi.'),

 (2,"chiaro",0,'Ricordi le due tasche della posizione? La tasca reale e la tasca figurativa. Ogni tasca ha il suo treno, e la sua clessidra.'),
 (2,"chiaro",0,"Il primo treno e' quello della tasca reale: i tuoi contributi, quelli dell'ente, e i rendimenti che hanno prodotto negli anni."),
 (2,"chiaro",0,"Questi soldi sono gia' nel Fondo, investiti nel tuo comparto. E li paga direttamente il Fondo, senza passaggi intermedi."),
 (2,"chiaro",0,"La legge gli da' fino a centottanta giorni dalla richiesta completa. In pratica, il Fondo indica una media di circa novanta giorni."),
 (2,"chiaro",0,"Una clessidra piccola, che si svuota in fretta. E' la parte che arriva per prima, di solito entro qualche mese dalla domanda."),
 (2,"chiaro",0,"Il secondo treno e' quello della tasca figurativa: il TFR e, per chi viene dal TFS, l'eventuale uno virgola cinque per cento."),
 (2,"chiaro",0,"Ricordi dove sono quei soldi? Non nel Fondo, ma all'INPS. Che deve prima trasferirli al Fondo, quando il rapporto di lavoro finisce."),
 (2,"chiaro",0,"Il Fondo indica che l'INPS impiega in genere fino a dodici mesi per questo trasferimento, con un massimo di diciotto."),
 (2,"chiaro",0,"Una clessidra molto piu' grande, che continua a scorrere a lungo, anche dopo che la prima si e' svuotata."),
 (2,"chiaro",0,"Solo quando l'INPS ha versato, il Fondo puo' pagare anche questa parte. Prima di quel momento, il Fondo non puo' fare nulla, anche volendo."),

 (3,"chiaro",0,'A questo punto, attenzione a non confondere due cose diverse, che spesso vengono messe nello stesso sacco, anche nelle chiacchiere tra colleghi.'),
 (3,"chiaro",0,"C'e' la tua liquidazione ordinaria: il TFS, oppure la parte di TFR che non hai destinato al Fondo."),
 (3,"chiaro",0,"Quella non passa dal Fondo: te la paga direttamente l'INPS, con i tempi che hai visto nel modulo due."),
 (3,"chiaro",0,"Dodici mesi per la pensione di vecchiaia, che dal 2027 scendono a nove, piu' tre mesi tecnici per il pagamento. Un'attesa lunga, da sola."),
 (3,"chiaro",0,"E poi c'e' la parte di TFR destinata al Fondo. Quella l'INPS la versa al Fondo, con i suoi tempi, e il Fondo poi te la paga come prestazione."),
 (3,"chiaro",0,'Sono due percorsi separati, con regole diverse e uffici diversi. Possono concludersi in momenti diversi, anche a distanza di mesi.'),
 (3,"chiaro",0,'Quindi, sul tuo conto corrente, nel primo anno di pensione potresti vedere arrivare tre somme distinte, in tre momenti diversi.'),

 (4,"chiaro",0,"Che cosa puoi fare tu, per non perdere tempo? I tempi dell'INPS non li puoi cambiare, ma puoi fare in modo di non allungarli."),
 (4,"chiaro",0,'Il termine del Fondo decorre dalla ricezione della richiesta completa e corretta. Non dal giorno in cui la spedisci, se manca qualcosa.'),
 (4,"chiaro",0,"Una domanda con un documento mancante, o un IBAN sbagliato, ricomincia da capo. E l'attesa si allunga."),
 (4,"chiaro",0,'Prima regola, quindi: controlla la domanda due volte prima di inviarla. Documenti, firme, coordinate bancarie.'),
 (4,"chiaro",0,"Seconda regola: aggiorna in anticipo i tuoi recapiti nell'area riservata del sito del Fondo, nella sezione anagrafica."),
 (4,"chiaro",0,"Gli aggiornamenti sulla pratica arrivano via email e via SMS. Se l'indirizzo o il numero sono vecchi, non li ricevi."),
 (4,"chiaro",0,'Terza regola: se hai contributi non dedotti, assicurati di averli comunicati al Fondo per tempo. Evita ricalcoli, e quindi altre attese.'),
 (4,"chiaro",0,"Il resto non dipende da te. Ma una domanda fatta bene e' il modo migliore per non aggiungere attese a quelle gia' previste."),

 (5,"chiaro",0,'Un consiglio di pianificazione, che vale soprattutto per il primo anno di pensione, quando le entrate cambiano.'),
 (5,"chiaro",0,'Metti in conto che la parte figurativa della posizione e la liquidazione arriveranno dopo qualche mese. Non subito, e non insieme alla prima pensione.'),
 (5,"chiaro",0,'Se hai spese importanti da affrontare, programma di usare prima la parte reale, che arriva per prima.'),
 (5,"chiaro",0,"Oppure valuta con il patronato la possibilita' di anticipo del TFS o del TFR, prevista per i dipendenti pubblici. Ha delle condizioni, e va chiesta per tempo."),
 (5,"chiaro",0,"Un foglio, una penna, e un calendario: segna quando arriva ogni somma. Sapere in anticipo quando arriva e' gia' meta' della tranquillita'."),

 (6,"profondo",1.2,'La parte reale arriva prima. Il TFR arriva dopo. Organizzati di conseguenza.'),

 (7,"chiaro",0,'Le tre cose da ricordare. Uno: la parte reale la paga il Fondo, in media in circa novanta giorni, entro un massimo di centottanta.'),
 (7,"chiaro",0,"Due: la parte figurativa, cioe' il TFR e l'eventuale uno virgola cinque, arriva solo dopo che l'INPS l'ha versata al Fondo."),
 (7,"chiaro",0,"In genere entro dodici mesi, al massimo diciotto. Una clessidra lunga, da mettere in conto fin dall'inizio."),
 (7,"chiaro",0,"Tre: una domanda completa e corretta e' l'unico modo per non aggiungere ritardi a quelli che gia' ci sono."),
 (7,"chiaro",0,"La mossa di oggi: entra nell'area riservata, sezione anagrafica, e verifica che email e cellulare siano aggiornati."),
 (7,"chiaro",0,"Ci vogliono due minuti, e puoi farlo anche se la pensione e' ancora lontana. Anzi, meglio farlo adesso, finche' non c'e' fretta."),
 (7,"chiaro",0,"Nella prossima lezione, l'ultima del modulo, vediamo come si fa davvero la domanda di prestazione, dall'inizio alla fine."),
 (7,"chiaro",0,"Passo per passo: dove si presenta, quali documenti servono, come si sceglie tra capitale e rendita, e che cosa succede dopo l'invio."),
 (7,"chiaro",0,"E vedremo anche chi puo' aiutarti, se non vuoi farla da solo. Per esempio il patronato, che conosce bene queste pratiche."),
 (7,"chiaro",0,"Perche' una domanda fatta bene, l'abbiamo visto oggi, e' gia' meta' del viaggio."),
 (7,"chiaro",0,'[warm] Fare la domanda. Ci vediamo nella lezione nove punto cinque.'),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Apertura', 2: 'Due tasche, due clessidre', 3: 'Due percorsi da non confondere', 4: 'Come non perdere tempo', 5: 'Pianificare il primo anno', 6: 'Memo', 7: 'Chiusura'}
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
