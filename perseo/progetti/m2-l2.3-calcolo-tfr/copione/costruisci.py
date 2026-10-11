# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Se il TFS e' una scala, il TFR e' un barattolo. Ogni anno ci metti dentro qualcosa, e quello che c'e' dentro cresce un po' con il passare del tempo."),
 (1,"chiaro",0,"Alla fine non conta solo l'ultimo stipendio, come nel TFS. Conta tutto quello che hai messo nel barattolo, anno dopo anno, per tutta la carriera."),
 (1,"chiaro",0,"In questa lezione vediamo quanto ci entra ogni anno, e come cresce quello che c'e' gia' dentro. Nessuna formula complicata: una percentuale e una regola di crescita. Sono due meccanismi diversi, e conviene tenerli separati."),
 (1,"chiaro",0,"Riguarda direttamente chi e' stato assunto dal 2001 o lavora a tempo determinato. Ma riguarda anche chi e' in TFS, perche' e' il sistema in cui passerebbe aderendo al Fondo."),

 (2,"chiaro",0,"Partiamo dalla quota che entra ogni anno. E' il sei virgola novantuno per cento della retribuzione utile."),
 (2,"chiaro",0,"[serious] Ripeto, perche' e' il numero piu' importante della lezione: sei virgola novantuno per cento."),
 (2,"chiaro",0,"E' come se, ogni anno, una piccola striscia del tuo stipendio venisse tagliata con le forbici e messa da parte nel barattolo."),
 (2,"chiaro",0,"Con una retribuzione utile di trentamila euro, la striscia vale circa duemilasettanta euro all'anno. Un po' piu' di una mensilita'."),
 (2,"chiaro",0,'Attenzione alla parola utile. Come per il TFS, la retribuzione utile al TFR comprende le voci previste dalle regole, non per forza tutto il lordo che vedi nel cedolino.'),
 (2,"chiaro",0,"Anno dopo anno, queste strisce si sommano. Dieci anni di lavoro sono dieci strisce, trent'anni sono trenta strisce, ciascuna calcolata sullo stipendio di quell'anno."),
 (2,"chiaro",0,"Nel pubblico impiego queste quote non escono dalla busta paga e non finiscono su un conto: le calcola e le tiene l'INPS, che poi paga il TFR alla fine del rapporto di lavoro."),

 (3,"chiaro",0,"Ma il barattolo non resta fermo. Ogni anno quello che hai gia' accumulato viene rivalutato, cioe' aumentato, con una regola fissata dalla legge."),
 (3,"chiaro",0,"La regola ha due pezzi. Il primo e' fisso: uno virgola cinque per cento. Il secondo dipende dai prezzi: il settantacinque per cento dell'inflazione registrata dall'ISTAT."),
 (3,"chiaro",0,"Facciamo un esempio. Se in un anno l'inflazione e' del due per cento, il settantacinque per cento di due fa uno virgola cinque."),
 (3,"chiaro",0,"Piu' l'uno virgola cinque fisso, fa tre. Quell'anno, quindi, il TFR gia' accumulato cresce del tre per cento."),
 (3,"chiaro",0,"E se l'inflazione e' zero? Il barattolo cresce comunque dell'uno virgola cinque per cento: quella parte fissa c'e' sempre."),
 (3,"chiaro",0,"Nota pero' una cosa. Con l'inflazione alta la rivalutazione insegue i prezzi, ma resta indietro: ne recupera solo tre quarti, piu' la parte fissa."),
 (3,"chiaro",0,"Prova con l'inflazione all'otto per cento. Il settantacinque per cento fa sei; piu' l'uno e mezzo fisso, il TFR cresce del sette e mezzo. Mezzo punto meno dei prezzi."),

 (4,"chiaro",0,"Ora guardiamo come funziona nel tempo, su dieci anni. Ogni barra del grafico e' un anno di lavoro."),
 (4,"chiaro",0,"In basso ci sono le quote accumulate negli anni precedenti. Sopra c'e' la rivalutazione di quell'anno. In cima, la nuova quota annuale, la striscia del sei virgola novantuno."),
 (4,"chiaro",0,"All'inizio la rivalutazione e' un filo sottile, quasi invisibile. Con il crescere del barattolo diventa piu' spessa, perche' si applica a una somma sempre piu' grande."),
 (4,"chiaro",0,"Per questo, a parita' di quote, chi ha lavorato piu' a lungo vede una rivalutazione molto piu' grande di chi ha cominciato da poco: il barattolo pieno cresce di piu'."),
 (4,"chiaro",0,"Il TFR, quindi, riflette tutta la tua storia lavorativa: gli stipendi di ogni anno, non solo l'ultimo. Gli anni di part-time, per esempio, pesano per quello che hanno pagato."),
 (4,"chiaro",0,"E cresce con una regola prudente, che protegge abbastanza dall'inflazione bassa, ma meno da quella alta."),

 (5,"chiaro",0,"Mettiamo ora TFS e TFR uno accanto all'altro, riga per riga."),
 (5,"chiaro",0,"Il TFS si basa sull'ultima retribuzione. Il TFR, invece, sulle retribuzioni di ogni anno, dalla prima all'ultima."),
 (5,"chiaro",0,"Il TFS prende l'ottanta per cento, diviso quindici o dodici, per gli anni di servizio. Il TFR accantona il sei virgola novantuno per cento ogni anno."),
 (5,"chiaro",0,'Il TFS cresce soprattutto con gli aumenti di carriera. Il TFR cresce con le quote annuali e con la rivalutazione.'),
 (5,"chiaro",0,"Il TFS, in genere, premia di piu' le carriere che salgono molto alla fine. Il TFR premia la regolarita', e non penalizza chi ha una carriera senza grandi salti."),
 (5,"chiaro",0,"Nessuno dei due e' migliore in assoluto. Dipende dalla tua storia lavorativa, ed e' proprio per questo che ogni scelta va fatta con i propri numeri, non con quelli di un collega."),

 (6,"chiaro",0,"E ora il collegamento con Perseo Sirio. Per chi e' in TFR, aderire al Fondo significa destinare alla pensione complementare una parte o tutto questo barattolo."),
 (6,"chiaro",0,"Per chi e' stato assunto dal 2001, tutto: l'intero sei virgola novantuno per cento della retribuzione utile."),
 (6,"chiaro",0,"E' una somma importante ogni anno, che arriva alla pensione complementare senza togliere un euro in piu' dallo stipendio netto: il TFR, infatti, lo maturi comunque."),
 (6,"chiaro",0,"Per chi e' passato dal TFS al TFR, solo una parte. Le percentuali precise le vedremo nel modulo quattro, con un esempio completo."),
 (6,"chiaro",0,"E il barattolo, una volta nel Fondo, cambia anche il modo di crescere. Ma di questo parleremo nell'ultima lezione del modulo."),
 (6,"chiaro",0,"Prima, pero', dobbiamo parlare proprio di quel passaggio dal TFS al TFR: che cosa comporta, e che cosa conviene valutare."),

 (7,"profondo",1.2,'Il TFR non guarda solo come finisci, ma tutto il percorso.'),

 (8,"chiaro",0,'Le tre cose da ricordare. Uno: ogni anno il TFR accantona il sei virgola novantuno per cento della retribuzione utile.'),
 (8,"chiaro",0,"Due: quanto accumulato si rivaluta ogni anno dell'uno virgola cinque per cento, piu' il settantacinque per cento dell'inflazione."),
 (8,"chiaro",0,"Tre: il TFR riflette tutti gli anni di lavoro, non solo l'ultimo, e cresce anche quando non aggiungi nulla."),
 (8,"chiaro",0,"La mossa di oggi: moltiplica la tua retribuzione annua lorda per zero virgola zero sei nove uno. E', in modo approssimativo, quanto TFR maturi in un anno."),
 (8,"chiaro",0,"Se sei in TFS, fai lo stesso conto: e' quanto matureresti ogni anno nel nuovo sistema, se un giorno decidessi di aderire."),
 (8,"chiaro",0,"[warm] Nella prossima lezione: cosa succede a chi e' in TFS e decide di aderire a Perseo Sirio."),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Apertura', 2: 'La quota annua', 3: 'La rivalutazione', 4: 'Anno dopo anno', 5: 'TFS e TFR a confronto', 6: 'E Perseo Sirio', 7: 'Memo', 8: 'Chiusura'}
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
