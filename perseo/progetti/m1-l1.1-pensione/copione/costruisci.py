# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Fine turno. Chiudi l'armadietto, prendi le chiavi, pensi alla spesa, ai figli, alle ferie. La pensione, invece, sembra lontanissima: una cosa da sessantenni, da rimandare."),
 (1,"chiaro",0,"Eppure c'e' una domanda che conviene farsi adesso, non tra trent'anni. Quando smettero' di lavorare, quanto mi arrivera' ogni mese? E bastera' per vivere come vivo oggi?"),
 (1,"chiaro",0,"In questa lezione non facciamo conti complicati. Capiamo una cosa sola: perche' la risposta, per chi lavora oggi, e' diversa da quella che hanno avuto i nostri genitori."),

 (2,"chiaro",0,"Vediamo tre passaggi. Primo: come si calcolava la pensione fino a pochi decenni fa. Secondo: come si calcola oggi, dopo le riforme. Terzo: che cosa significa, in concreto, per il tuo assegno."),
 (2,"chiaro",0,"Alla fine avrai chiaro perche' esiste la previdenza complementare, e perche' il contratto del pubblico impiego ha previsto un fondo pensione pensato apposta per te."),

 (3,"chiaro",0,"Fino alla meta' degli anni Novanta valeva il sistema retributivo. Il principio era semplice: la pensione si calcolava sugli stipendi degli ultimi anni di lavoro, di solito i piu' alti."),
 (3,"chiaro",0,"Con una carriera lunga, l'assegno poteva arrivare intorno all'ottanta per cento dell'ultima retribuzione. E un aumento negli ultimi anni alzava la pensione per tutta la vita."),
 (3,"chiaro",0,"Era un sistema generoso, ma costoso. Le pensioni pagate erano piu' alte dei contributi versati, e con l'allungarsi della vita media il conto per lo Stato e' diventato insostenibile."),

 (4,"chiaro",0,"Con la riforma del 1995, la cosiddetta riforma Dini, si e' passati gradualmente al sistema contributivo. Qui conta tutta la vita lavorativa, non solo la fine."),
 (4,"chiaro",0,"Ogni anno circa un terzo del tuo stipendio lordo diventa contributo: una parte la versi tu, la parte piu' grande la versa l'ente. Finisce in una specie di salvadanaio personale, il montante."),
 (4,"chiaro",0,"Il montante non resta fermo: ogni anno viene rivalutato, con un tasso legato alla crescita dell'economia, cioe' alla media del prodotto interno lordo degli ultimi cinque anni."),
 (4,"chiaro",0,"Quando vai in pensione, il montante viene moltiplicato per un coefficiente che dipende dall'eta'. Piu' sei giovane quando esci, piu' e' basso, perche' la pensione dovra' durare piu' a lungo."),
 (4,"chiaro",0,"Un esempio semplificato. Centomila euro di montante, con un coefficiente intorno al cinque e mezzo per cento, diventano circa cinquemilacinquecento euro lordi all'anno di pensione."),
 (4,"chiaro",0,"E i coefficienti si aggiornano ogni due anni, seguendo l'aspettativa di vita: se si vive piu' a lungo, a parita' di montante l'assegno annuo scende un poco."),
 (4,"chiaro",0,"[serious] Dal 2012, con la riforma Fornero, il contributivo vale per tutti, almeno per gli anni lavorati da quel momento in poi. Nessuno ne resta completamente fuori."),

 (5,"chiaro",0,"Non tutti, pero', sono nella stessa situazione. Chi a fine 1995 aveva gia' diciotto anni di contributi ha mantenuto il vecchio calcolo fino al 2011, e il contributivo solo dopo."),
 (5,"chiaro",0,"Chi ne aveva meno ha un sistema misto: una parte calcolata col vecchio metodo, fino al 1995, e una parte col nuovo. Chi ha iniziato a lavorare dal 1996 in poi e' interamente nel contributivo."),
 (5,"chiaro",0,"Se sei nato dopo la meta' degli anni Settanta, quasi certamente sei in quest'ultimo gruppo. Ed e' proprio per te che quello che segue conta di piu'."),

 (6,"chiaro",0,"Arriviamo al punto. Il rapporto tra la prima pensione e l'ultimo stipendio si chiama tasso di sostituzione. Nel sistema retributivo era alto."),
 (6,"chiaro",0,"Nel contributivo, per chi entra oggi nel lavoro pubblico, sara' in genere piu' basso. Dipende da quanti anni lavori, da come cresce lo stipendio, dall'eta' in cui esci."),
 (6,"chiaro",0,"C'e' anche un motivo meno evidente. Nel retributivo un aumento a fine carriera alzava tutta la pensione. Nel contributivo pesa solo per gli anni in cui lo ricevi."),
 (6,"chiaro",0,"[serious] Questa differenza tra l'ultimo stipendio e la prima pensione e' il divario. E' la parte del tuo tenore di vita che la pensione pubblica, da sola, non coprira'."),
 (6,"chiaro",0,"Pensa al mese dopo l'ultimo turno: le spese restano quasi le stesse, l'affitto o il mutuo, le bollette, magari un aiuto ai figli. Quello che cambia e' l'entrata, e cambia in meno."),
 (6,"chiaro",0,"La previdenza complementare serve esattamente a questo: a costruire, un po' alla volta, una seconda pensione che riduca quel divario. Non lo cancella per magia, ma lo rende piu' piccolo."),

 (7,"chiaro",0,"E perche' pensarci adesso, e non a cinquant'anni? Per via del tempo. Un risparmio previdenziale cresce in due modi: con i versamenti e con i rendimenti, che producono altri rendimenti."),
 (7,"chiaro",0,"Nei primi anni la differenza quasi non si vede. Poi, anno dopo anno, la curva si allontana dalla retta. E' quello che si chiama interesse composto."),
 (7,"chiaro",0,"Un esempio semplificato, con un rendimento ipotetico del tre per cento l'anno. Cento euro al mese per trent'anni: versi trentaseimila euro, e ne ritrovi circa cinquantottomila."),
 (7,"chiaro",0,"Gli stessi cento euro al mese, ma per quindici anni: versi diciottomila euro, e ne ritrovi circa ventitremila. Meta' degli anni, e meno della meta' del risultato."),
 (7,"chiaro",0,"Chi inizia a venticinque anni ha davanti molto piu' tempo per far lavorare quel meccanismo di chi inizia a cinquanta. Il tempo, in previdenza, e' la risorsa che non si puo' comprare dopo."),

 (8,"profondo",1.2,"Ricordalo cosi'. Nel nuovo sistema non conta come finisci: conta tutto il percorso."),

 (9,"chiaro",0,"Le tre cose da ricordare. Uno: si e' passati da una pensione calcolata sugli ultimi stipendi a una pensione calcolata sui contributi di tutta la vita."),
 (9,"chiaro",0,"Due: per chi lavora oggi, la pensione pubblica sara' in genere piu' bassa dell'ultimo stipendio. Tre: la previdenza complementare serve a ridurre quel divario, e il tempo e' il suo miglior alleato."),
 (9,"chiaro",0,"E ora la mossa di oggi. Entra nel sito dell'INPS con SPID o carta d'identita' elettronica e apri il tuo estratto conto contributivo. Cerca l'anno del tuo primo contributo."),
 (9,"chiaro",0,"Ti dira' in quale sistema sei. E se vuoi fare un passo in piu', sullo stesso sito c'e' il simulatore La mia pensione futura: una stima, non una promessa, ma utile per vedere il divario."),
 (9,"chiaro",0,"[warm] Lo useremo piu' avanti nel corso. Nella prossima lezione: i tre pilastri della previdenza."),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1:"Apertura",2:"Cosa vedremo",3:"Il retributivo",4:"Il contributivo",
 5:"Chi sta in quale sistema",6:"Il divario",7:"Il tempo",8:"Memo",9:"Chiusura"}
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
