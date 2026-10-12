# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,'[warm] Dal ponte di una nave, in mezzo alla tempesta, sembra di non andare da nessuna parte. Le onde salgono e scendono, e il mare sembra decidere tutto.'),
 (1,"chiaro",0,"Ma se guardi la scia dall'alto, vedi che la nave procede dritta verso la sua meta. Le onde ci sono, ma non cambiano la rotta."),
 (1,"chiaro",0,'Gli investimenti fanno lo stesso effetto. Visti da vicino, giorno per giorno, oscillano. Visti da lontano, anno dopo anno, hanno una direzione.'),
 (1,"chiaro",0,"In questa lezione capiamo perche' succede, e che cosa c'entra la tua eta'. Senza formule, senza grafici complicati, e soprattutto senza paura."),
 (1,"chiaro",0,'Come sempre in questo modulo: informazioni generali, non consulenza finanziaria. E i rendimenti passati non garantiscono quelli futuri.'),

 (2,"chiaro",0,"Partiamo dalle basi, dai due ingredienti di ogni investimento: le obbligazioni e le azioni. Quasi tutto quello che fa un fondo pensione e' una miscela di questi due."),
 (2,"chiaro",0,"Le obbligazioni sono prestiti. Il fondo presta denaro a uno Stato o a un'impresa, che lo restituisce alla scadenza con un interesse."),
 (2,"chiaro",0,'Rendono meno, ma oscillano meno. Sono la parte calma del viaggio, quella che tiene la barca in equilibrio.'),
 (2,"chiaro",0,"Le azioni, invece, sono quote di imprese. Comprare un'azione significa possedere un piccolo pezzo di un'azienda, con i suoi successi e i suoi momenti difficili."),
 (2,"chiaro",0,'Se le imprese crescono, crescono anche le azioni. E una parte degli utili viene distribuita agli azionisti, come dividendo.'),
 (2,"chiaro",0,"Nel lungo periodo, le azioni hanno reso di piu'. Ma nel breve possono scendere anche molto, e in fretta: un anno con il dieci o il venti per cento in meno e' gia' successo."),
 (2,"chiaro",0,"Ecco allora una parola da chiarire subito, perche' spaventa piu' del dovuto. Il rischio, in finanza, non e' la probabilita' di perdere tutto."),
 (2,"chiaro",0,"E' l'ampiezza delle oscillazioni lungo la strada: quanto il valore puo' salire e scendere prima di arrivare."),

 (3,"chiaro",0,"Guarda queste due linee, in un andamento puramente illustrativo. Una ha piu' azioni, l'altra piu' obbligazioni."),
 (3,"chiaro",0,"Quella con piu' obbligazioni sale piano, quasi senza scosse, e con regolarita'. Quella con piu' azioni sale a scatti, con cadute evidenti."),
 (3,"chiaro",0,"Se osservi un solo anno, puo' capitare che quella con piu' azioni scenda, mentre l'altra resta quasi ferma."),
 (3,"chiaro",0,"Chi ha bisogno dei soldi proprio in quell'anno, per esempio perche' va in pensione, ci rimette. Deve vendere quando i prezzi sono bassi, senza poter aspettare la risalita."),
 (3,"chiaro",0,"Ma se allarghi lo sguardo a vent'anni, il quadro cambia. Le cadute ci sono ancora, ma la direzione complessiva e' piu' alta."),
 (3,"chiaro",0,"Ecco perche' la domanda giusta non e': quale investimento e' il migliore? Una risposta valida per tutti, semplicemente, non esiste."),
 (3,"chiaro",0,"La domanda giusta e' un'altra, molto piu' personale: fra quanti anni mi serviranno questi soldi?"),
 (3,"chiaro",0,"E' quello che i fondi pensione chiamano orizzonte temporale. Ricordi il numero che hai calcolato nella lezione precedente? Eccolo."),
 (3,"chiaro",0,"Piu' lungo e' l'orizzonte, piu' tempo c'e' per assorbire un anno storto. Piu' e' corto, piu' conta la stabilita'."),

 (4,"chiaro",0,"C'e' poi un secondo alleato, oltre al tempo: la regolarita'."),
 (4,"chiaro",0,"Tu non investi tutto in un giorno. Versi una piccola somma ogni mese, con la busta paga, per molti anni. E' un modo di investire molto diverso da chi mette tutto in una volta."),
 (4,"chiaro",0,"Quando i mercati scendono, la stessa somma compra piu' quote, perche' ogni quota costa meno."),
 (4,"chiaro",0,"Quando i mercati risalgono, quelle quote comprate a buon prezzo valgono di piu'. Il calo, per chi continua a versare, e' anche un'occasione."),
 (4,"chiaro",0,"Il Fondo lo illustra sul suo sito con un esempio: quaranta euro al mese, venti del lavoratore e venti dell'ente."),
 (4,"chiaro",0,"Investiti per vent'anni in un indice azionario mondiale, attraverso crisi e riprese, una dopo l'altra. Come e' successo davvero ai mercati."),
 (4,"chiaro",0,"Il versamento costante attenua l'effetto dei momenti negativi. Non li elimina, ma li rende meno pesanti nel percorso complessivo."),

 (5,"chiaro",0,"Ora, tre errori comuni da evitare. Sono errori che fanno in tanti, e che costano piu' delle oscillazioni stesse."),
 (5,"chiaro",0,"Primo errore: controllare la posizione ogni settimana, e farsi prendere dall'ansia a ogni piccolo calo."),
 (5,"chiaro",0,"Secondo errore: spostare tutto sul prudente subito dopo un calo. Cosi' un ribasso temporaneo diventa una perdita vera."),
 (5,"chiaro",0,"Chi esce dopo la caduta, infatti, non partecipa alla risalita. E di solito la risalita arriva quando nessuno se l'aspetta."),
 (5,"chiaro",0,"Terzo errore: scegliere il profilo che e' andato meglio l'anno scorso, come se il futuro fosse una copia del passato."),
 (5,"chiaro",0,"La scelta del profilo si fa sull'orizzonte e sulla propria tranquillita'. Non sulle notizie del giorno, ne' sui consigli del collega al bar."),

 (6,"profondo",1.2,'Prima di chiederti quanto rende, chiediti quando ti serviranno.'),

 (7,"chiaro",0,"Le tre cose da ricordare. Uno: le obbligazioni oscillano meno e rendono meno. Le azioni oscillano di piu', e nel lungo periodo hanno reso di piu'."),
 (7,"chiaro",0,"Due: la scelta dipende soprattutto da quanti anni mancano a quando ti serviranno i soldi. E' l'orizzonte temporale."),
 (7,"chiaro",0,"Tre: versare ogni mese attenua l'effetto dei momenti negativi. La regolarita' e' un alleato silenzioso, che lavora anche quando non ci pensi."),
 (7,"chiaro",0,"La mossa di oggi e' un piccolo esperimento mentale, da fare con calma e con sincerita'."),
 (7,"chiaro",0,'Immagina di aprire il prospetto annuale e di trovare la tua posizione scesa del dieci per cento in un anno.'),
 (7,"chiaro",0,"Che cosa faresti? Resteresti tranquillo, ti preoccuperesti un po', o correresti a cambiare tutto?"),
 (7,"chiaro",0,"Non c'e' una risposta giusta, e nessuno ti giudica. Ma la tua risposta sincera conta, quanto il numero degli anni che ti mancano."),
 (7,"chiaro",0,'Tienila accanto a quel numero, scritta da qualche parte: insieme, saranno i due criteri per scegliere il tuo profilo.'),
 (7,"chiaro",0,'Nella prossima lezione entriamo in Perseo Sirio: i comparti in cui il Fondo investe davvero i soldi, e i profili che puoi scegliere tu.'),
 (7,"chiaro",0,"Vedremo che i profili sceglibili sono sei, e perche' uno dei comparti, l'azionario, non si sceglie direttamente."),
 (7,"chiaro",0,'[warm] Ci vediamo nella lezione sei punto tre.'),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Apertura', 2: 'Due ingredienti', 3: "Un anno contro vent'anni", 4: "La regolarita'", 5: 'Tre errori da evitare', 6: 'Memo', 7: 'Chiusura'}
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
