# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,'[warm] Un fondo pensione serve alla pensione. Ma la vita, nel frattempo, non aspetta che arrivi il giorno in cui smetti di lavorare.'),
 (1,"chiaro",0,'Una casa da comprare. Una cura importante, per te o per qualcuno della tua famiglia. Un periodo dedicato alla formazione.'),
 (1,"chiaro",0,'Per questi momenti la legge consente, a certe condizioni, di prendere in anticipo una parte dei soldi accumulati nel Fondo.'),
 (1,"chiaro",0,"Per i dipendenti pubblici, pero', le regole sono diverse da quelle che si leggono spesso online, e che valgono per i lavoratori privati."),
 (1,"chiaro",0,"In questa lezione vediamo quelle che valgono per te: quando si puo' chiedere, per che cosa, quanto, e con quali tasse."),

 (2,"chiaro",0,"La prima condizione e' il tempo. Per chiedere un'anticipazione servono almeno otto anni di iscrizione al Fondo."),
 (2,"chiaro",0,"Prima di otto anni non si puo', qualunque sia il motivo. E' una regola pensata per proteggere la funzione del Fondo: costruire la pensione."),
 (2,"chiaro",0,'La seconda condizione sono i motivi. Per i dipendenti pubblici sono tre, e solo tre.'),
 (2,"chiaro",0,"Il primo: l'acquisto o la ristrutturazione della prima casa di abitazione, per te o per i tuoi figli."),
 (2,"chiaro",0,'Il secondo: le spese sanitarie per terapie e interventi straordinari, per te o per i familiari fiscalmente a carico. Sono spese importanti, non quelle di tutti i giorni.'),
 (2,"chiaro",0,'Il terzo: le spese sostenute durante i congedi per la formazione, quelli previsti dalla legge per chi lavora.'),
 (2,"chiaro",0,"Attenzione a un equivoco molto diffuso. L'anticipazione per ulteriori esigenze, quella che non richiede di spiegare il motivo, esiste solo per i lavoratori privati."),
 (2,"chiaro",0,'Lo stesso vale per i limiti in percentuale che senti citare, come il settantacinque o il trenta per cento. Per i pubblici, le regole sono diverse.'),
 (2,"chiaro",0,"Se leggi un articolo o un forum sulle anticipazioni dei fondi pensione, controlla sempre se parla di lavoratori privati. Molto spesso e' cosi'."),

 (3,"chiaro",0,'Ed ecco il punto decisivo, quello che sorprende quasi tutti. Riguarda le due tasche che abbiamo visto nel modulo due.'),
 (3,"chiaro",0,"Un dipendente pubblico puo' chiedere in anticipo anche tutta la sua posizione. Ma solo la parte che si trova davvero nel Fondo."),
 (3,"chiaro",0,"Cioe' la tasca reale: i contributi versati da te, quelli versati dall'ente, e i rendimenti che hanno prodotto negli anni."),
 (3,"chiaro",0,"La tasca figurativa, invece, resta chiusa. E' quella del TFR e, per chi viene dal TFS, dell'accantonamento aggiuntivo dell'uno virgola cinque per cento."),
 (3,"chiaro",0,"Quelle somme sono all'INPS. Il Fondo le vede, le contabilizza, ma non puo' disporne fino a quando il rapporto di lavoro non finisce."),
 (3,"chiaro",0,"In pratica, l'anticipazione disponibile e' spesso molto piu' piccola di quanto si immagina guardando il totale della posizione."),
 (3,"chiaro",0,"Perche' il TFR, per la maggior parte delle persone, e' la parte piu' grande. E proprio quella non si puo' anticipare."),
 (3,"chiaro",0,"Meglio saperlo prima di fare progetti. Chi conta sull'anticipo per comprare casa deve partire dalla cifra giusta, non da quella complessiva."),

 (4,"chiaro",0,"E le tasse? Anche qui, la risposta dipende dal motivo per cui chiedi l'anticipazione."),
 (4,"chiaro",0,"L'anticipazione per spese sanitarie gode della stessa tassazione agevolata della pensione: dal quindici al nove per cento, in base agli anni di partecipazione."),
 (4,"chiaro",0,"Quelle per la prima casa e per i congedi formativi, invece, pagano una ritenuta del ventitre' per cento."),
 (4,"chiaro",0,"Anche in questo il legislatore premia gli usi piu' vicini alla tutela della persona: la salute vale piu' della casa, dal punto di vista del fisco."),
 (4,"chiaro",0,"Queste aliquote valgono per le somme maturate dal 2018. Per i pubblici iscritti prima, le parti piu' vecchie seguono le regole del loro periodo."),
 (4,"chiaro",0,"Sono gli strati che hai visto nella lezione cinque punto cinque. Il calcolo lo fa il Fondo, ma e' bene sapere perche' il risultato puo' cambiare."),

 (5,"chiaro",0,"Come si chiede? Dall'area riservata, nella sezione dedicata agli anticipi, con una procedura online."),
 (5,"chiaro",0,'Prima di inviare, leggi il documento sulle anticipazioni, che trovi sul sito del Fondo. Indica esattamente quali documenti allegare per ogni motivo.'),
 (5,"chiaro",0,'Il Fondo mette a disposizione anche dei facsimile di autocertificazione: per esempio per la prima casa e per i lavori di ristrutturazione.'),
 (5,"chiaro",0,"E per le spese sanitarie c'e' il modello di dichiarazione che deve compilare l'azienda sanitaria, per attestare che la spesa e' straordinaria."),
 (5,"chiaro",0,"Una richiesta completa e' una richiesta piu' veloce. Un documento mancante, invece, significa attese e richieste di integrazione."),
 (5,"chiaro",0,"Un'ultima cosa che pochi sanno. Le somme anticipate si possono reintegrare, cioe' rimettere nel Fondo in un secondo momento, con un modulo apposito."),
 (5,"chiaro",0,"Chi ha usato l'anticipo per la casa, e poi riesce a risparmiare, puo' cosi' ricostruire la propria posizione per la pensione."),

 (6,"profondo",1.2,'Prima della pensione si apre solo la tasca reale. Il TFR aspetta la fine del lavoro.'),

 (7,"chiaro",0,"Le tre cose da ricordare. Uno: i dipendenti pubblici possono chiedere un'anticipazione dopo otto anni di iscrizione."),
 (7,"chiaro",0,'E solo per tre motivi: la prima casa, le spese sanitarie straordinarie e i congedi formativi.'),
 (7,"chiaro",0,"Due: si puo' chiedere anche tutta la parte reale della posizione, ma non il TFR figurativo, che resta all'INPS."),
 (7,"chiaro",0,"Tre: le spese sanitarie sono tassate dal quindici al nove per cento. La casa e la formazione al ventitre' per cento."),
 (7,"chiaro",0,"La mossa di oggi: apri il prospetto annuale e guarda solo la tasca reale, cioe' i contributi versati e i loro rendimenti."),
 (7,"chiaro",0,"E' la cifra che potresti davvero anticipare. Annotala, e confrontala con il totale: la differenza e' il TFR che aspetta la fine del lavoro."),
 (7,"chiaro",0,"Se pensi di usare l'anticipo nei prossimi anni, controlla anche da quanto tempo sei iscritto. Gli anni di iscrizione li trovi nell'area riservata."),
 (7,"chiaro",0,'Nella prossima lezione restiamo sul tema delle scelte prima della pensione, con una situazione che capita a molti.'),
 (7,"chiaro",0,'Un trasferimento, un concorso, un nuovo lavoro: che cosa succede alla posizione quando cambi lavoro?'),
 (7,"chiaro",0,'Vedremo quali cambi non toccano nulla, e quali invece aprono un bivio, con tre strade possibili.'),
 (7,"chiaro",0,'[warm] Se cambi lavoro. Ci vediamo nella lezione otto punto due.'),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Apertura', 2: 'Quando e per cosa', 3: 'Le due tasche', 4: 'Le tasse', 5: 'Come si chiede', 6: 'Memo', 7: 'Chiusura'}
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
