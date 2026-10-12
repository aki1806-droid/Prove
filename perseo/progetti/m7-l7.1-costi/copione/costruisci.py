# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,'[warm] Nessuno compra una casa senza chiedere quanto costa. E nessuno firma un mutuo senza guardare il tasso, le spese, le condizioni.'),
 (1,"chiaro",0,'Eppure molti sottoscrivono una forma di previdenza senza leggere le spese. Si fidano, oppure pensano che siano dettagli.'),
 (1,"chiaro",0,"Il problema e' che i costi di un fondo pensione non arrivano in un'unica fattura. Si prelevano un po' alla volta, ogni anno, per decenni."),
 (1,"chiaro",0,'In questa lezione leggiamo lo scontrino completo di Perseo Sirio, riga per riga. Nella fase di accumulo, e in quella della rendita.'),
 (1,"chiaro",0,'Le cifre vengono dalla scheda «I costi» della Nota informativa, in vigore dal ventisette marzo 2026. Possono cambiare nel tempo.'),

 (2,"chiaro",0,'Primo gruppo: i costi che ti vengono addebitati direttamente, e che quindi puoi vedere nella tua posizione.'),
 (2,"chiaro",0,"Partiamo dalla buona notizia: l'adesione non costa nulla. Non c'e' nessuna spesa di ingresso, qualunque sia il modo in cui sei entrato nel Fondo."),
 (2,"chiaro",0,"Ogni anno, pero', il Fondo preleva una quota associativa di tredici euro. La preleva dal primo versamento utile dell'anno."),
 (2,"chiaro",0,"Per gli aderenti contrattuali della polizia locale la quota e' di undici euro. Per chi ha trasformato la posizione in RITA, di dieci euro."),
 (2,"chiaro",0,'E ci sono casi in cui la quota non si paga. Non la pagano i familiari fiscalmente a carico, iscritti al Fondo.'),
 (2,"chiaro",0,'E non la paga chi in un anno non ha fatto versamenti, oppure ha fatto solo versamenti volontari.'),
 (2,"chiaro",0,"Tredici euro su trecento di contributo annuo sono una cifra sensibile, all'inizio. Ma diventano trascurabili, man mano che la posizione cresce."),

 (3,"chiaro",0,"Secondo gruppo: i costi indiretti. Si chiamano cosi' perche' non li vedi addebitati direttamente sulla tua posizione, come la quota associativa."),
 (3,"chiaro",0,"Vengono prelevati dal patrimonio di ogni comparto, ogni trimestre. E sono gia' compresi nei rendimenti netti che il Fondo pubblica."),
 (3,"chiaro",0,'Pagano soprattutto i gestori, che investono i soldi, e il depositario, che li custodisce e controlla le operazioni.'),
 (3,"chiaro",0,"Ogni comparto ha il suo costo, espresso come percentuale del patrimonio, all'anno. Ricordi i tre comparti della lezione sei punto tre? Vediamoli uno per uno."),
 (3,"chiaro",0,"Il Garantito costa lo zero virgola quarantasei per cento l'anno. E' il piu' caro dei tre, perche' la garanzia ha un prezzo."),
 (3,"chiaro",0,"L'Obbligazionario costa lo zero virgola quattordici per cento. L'Azionario lo zero virgola diciannove per cento."),
 (3,"chiaro",0,"Su questi due comparti si aggiunge una commissione legata ai risultati: il dieci per cento dell'eventuale rendimento oltre l'obiettivo."),
 (3,"chiaro",0,"In pratica il gestore guadagna di piu' solo se fa meglio dell'obiettivo. Se non lo supera, la commissione non si paga."),
 (3,"chiaro",0,'E a tutti i comparti si aggiunge uno zero virgola zero tre per cento di spese amministrative, per il funzionamento del Fondo.'),
 (3,"chiaro",0,"Sono numeri piccoli, con lo zero davanti. Ma si applicano ogni anno a tutto il patrimonio accumulato, non solo ai versamenti dell'anno. E il patrimonio, col tempo, cresce."),

 (4,"chiaro",0,"Terzo gruppo: i costi per le operazioni che puoi chiedere durante gli anni di iscrizione. E qui la risposta e' semplice: zero."),
 (4,"chiaro",0,"Anticipazioni e riscatti: nessuna spesa. Trasferimento per perdita dei requisiti, o trasferimento volontario a un'altra forma: nessuna spesa."),
 (4,"chiaro",0,'Cambio di profilo della posizione, o dei soli versamenti futuri: nessuna spesa. E nessuna spesa nemmeno per la RITA.'),
 (4,"chiaro",0,'La Nota informativa non prevede spese per nessuna di queste sette operazioni. Ne abbiamo parlato anche nella lezione sei punto sei.'),
 (4,"chiaro",0,"Non e' scontato. In molte altre forme pensionistiche, alcune di queste operazioni hanno un costo fisso, a ogni richiesta."),
 (4,"chiaro",0,'Qui, invece, puoi adattare la posizione alla tua vita senza pagare pedaggi. Ogni volta che serve, e senza dover fare conti prima di chiedere.'),

 (5,"chiaro",0,"Infine, i costi della fase di erogazione: cioe' quando ricevi la pensione complementare come rendita, ogni mese."),
 (5,"chiaro",0,'La rendita non la paga direttamente il Fondo. La paga una compagnia di assicurazione convenzionata con il Fondo, che trasforma il capitale in un assegno per tutta la vita.'),
 (5,"chiaro",0,"Al momento della conversione si applica un caricamento: l'uno virgola dieci per cento sul capitale trasformato in rendita. Si paga una volta sola."),
 (5,"chiaro",0,'Il caricamento sale al cinque per cento per la rendita LTC: quella che raddoppia in caso di non autosufficienza.'),
 (5,"chiaro",0,'Poi, ogni anno, la rendita viene rivalutata. E su quella rivalutazione la compagnia trattiene lo zero virgola novanta per cento.'),
 (5,"chiaro",0,'Ne riparleremo con calma nel modulo nove, quando sceglieremo il tipo di rendita. Per ora basta sapere che anche qui ci sono costi.'),
 (5,"chiaro",0,'E che, come gli altri, sono scritti nero su bianco nella Nota informativa. Non sono nascosti: basta sapere dove guardare, e andare a leggerli.'),

 (6,"profondo",1.2,"Un costo piccolo, pagato per trent'anni, non e' piu' piccolo. Leggilo tutto."),

 (7,"chiaro",0,"Le tre cose da ricordare. Uno: aderire e' gratis. Ogni anno si pagano tredici euro di quota associativa."),
 (7,"chiaro",0,"Due: i costi indiretti vanno dallo zero virgola quattordici allo zero virgola quarantasei per cento l'anno, a seconda del comparto."),
 (7,"chiaro",0,"Piu' lo zero virgola zero tre per cento di spese amministrative, uguale per tutti i comparti."),
 (7,"chiaro",0,'Tre: anticipazioni, riscatti, trasferimenti, cambi di profilo e RITA non costano nulla.'),
 (7,"chiaro",0,'La mossa di oggi: sul sito del Fondo, apri la scheda «I costi» della Nota informativa.'),
 (7,"chiaro",0,'Sono tre pagine, e ora sai leggerle. Cerca le righe che abbiamo visto: la quota associativa, i costi dei comparti, le operazioni.'),
 (7,"chiaro",0,'E guarda il comparto del tuo profilo: quanto costa, ogni anno, sul tuo patrimonio?'),
 (7,"chiaro",0,'Non serve fare calcoli complicati. Serve sapere che quei numeri esistono, dove trovarli, e che cosa significano per la tua posizione.'),
 (7,"chiaro",0,'Ma come si confrontano i costi di forme diverse, con strutture diverse? Serve un numero unico, che li riassuma tutti.'),
 (7,"chiaro",0,"Nella prossima lezione vediamo proprio quel numero: l'ISC, l'indicatore sintetico dei costi."),
 (7,"chiaro",0,'[warm] Il numero da guardare. Ci vediamo nella lezione sette punto due.'),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Apertura', 2: 'I costi diretti', 3: 'I costi indiretti', 4: 'Le operazioni', 5: 'La rendita', 6: 'Memo', 7: 'Chiusura'}
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
