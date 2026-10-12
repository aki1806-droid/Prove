# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Cosa succede se il bicchiere trabocca? Immagina di versare acqua in un bicchiere, fino all'orlo, e poi ancora un po'."),
 (1,"chiaro",0,"Abbiamo visto nella lezione cinque punto uno che si possono dedurre fino a cinquemilatrecento euro l'anno, sommando i tuoi contributi e quelli dell'ente."),
 (1,"chiaro",0,'Ma che fine fanno i contributi che superano quel limite? E quelli che, per qualche ragione, non sono stati dedotti?'),
 (1,"chiaro",0,"Questa lezione riguarda pochi lavoratori. Ma per loro e' decisiva, e vale la pena conoscerla anche se oggi non ti riguarda."),
 (1,"chiaro",0,"Perche' con una semplice comunicazione, fatta in tempo, si evita di pagare le tasse due volte sugli stessi soldi."),
 (1,"chiaro",0,'Come sempre in questo modulo: informazioni generali, non consulenza fiscale. Per il tuo caso, chiedi al Fondo o al CAF.'),

 (2,"chiaro",0,"La regola e' semplice. Immagina il bicchiere con una linea disegnata sopra: cinquemilatrecento euro."),
 (2,"chiaro",0,"Fino alla linea, l'acqua e' verde: i contributi sono dedotti. Non pagano IRPEF quando li versi, perche' li togli dal reddito."),
 (2,"chiaro",0,"E quando un giorno li riceverai come prestazione, saranno tassati con l'aliquota agevolata, quella della scala: dal quindici al nove per cento."),
 (2,"chiaro",0,"Oltre la linea, invece, l'acqua cambia colore e trabocca in una seconda tazza, grigia. Sono i contributi non dedotti."),
 (2,"chiaro",0,"Su quella parte paghi l'IRPEF normale, gia' oggi, con la tua aliquota. Come se fosse stipendio: ventitre', trentatre' o quarantatre' per cento."),
 (2,"chiaro",0,'Ma il beneficio, dice il Fondo, non si perde: si sposta nel tempo. Non lo hai oggi, lo avrai alla fine.'),
 (2,"chiaro",0,"Proprio perche' su quei soldi hai gia' pagato, al momento della prestazione non verranno tassati di nuovo."),
 (2,"chiaro",0,"E' lo stesso principio dei rendimenti, che abbiamo visto nella lezione cinque punto due: quello che ha gia' pagato, non paga due volte."),

 (3,"chiaro",0,"C'e' pero' una condizione, ed e' il cuore di questa lezione. Senza questa condizione, il beneficio puo' sparire."),
 (3,"chiaro",0,"Il Fondo non puo' sapere da solo quanti dei tuoi contributi non sono stati dedotti. Non vede la tua dichiarazione dei redditi, ne' la tua Certificazione Unica."),
 (3,"chiaro",0,"Devi comunicarglielo tu. Entro il trentuno dicembre dell'anno successivo a quello del versamento."),
 (3,"chiaro",0,"Per esempio: per i contributi versati nel 2026, la comunicazione va fatta entro il trentuno dicembre 2027. C'e' un anno intero di tempo, ma non va dimenticata."),
 (3,"chiaro",0,"Si fa dall'area riservata del Fondo, nella sezione dedicata alla contribuzione, con la funzione per i contributi non dedotti."),
 (3,"chiaro",0,'Se la comunicazione non arriva, al momento della prestazione quella somma rischia di essere trattata come se fosse stata dedotta.'),
 (3,"chiaro",0,"E quindi tassata una seconda volta, anche se l'IRPEF l'avevi gia' pagata. Una doppia tassazione che nessuno ti segnalera'."),

 (4,"chiaro",0,'Quando capita, in pratica? I casi sono tre, e conviene riconoscerli.'),
 (4,"chiaro",0,'Primo caso: chi versa molto. Per esempio con contributi volontari importanti negli ultimi anni prima della pensione, e supera il limite annuo.'),
 (4,"chiaro",0,'Secondo caso: chi fa un versamento con bonifico, e poi non lo indica nella dichiarazione dei redditi. Ricordi? La deduzione dei bonifici la chiedi tu.'),
 (4,"chiaro",0,"Terzo caso: chi ha un reddito cosi' basso da non pagare IRPEF, e quindi non ha imposte da cui dedurre. La deduzione, in quel caso, resta senza effetto."),
 (4,"chiaro",0,"Pensa, per esempio, a un anno di aspettativa non retribuita, con pochi mesi di stipendio, e a un bonifico volontario fatto proprio quell'anno."),
 (4,"chiaro",0,'In tutti questi casi vale la stessa regola: verifica quanto hai effettivamente dedotto, anno per anno.'),
 (4,"chiaro",0,'Lo trovi nella Certificazione Unica, oppure nella tua dichiarazione dei redditi. Poi confrontalo con tutto quello che hai versato.'),
 (4,"chiaro",0,"Se c'e' una differenza, comunicala al Fondo, nei tempi. Bastano pochi minuti, dall'area riservata."),

 (5,"chiaro",0,"Ecco la differenza tra chi comunica e chi no. Torniamo alla torta della prestazione, quella della lezione precedente, e mettiamone due una accanto all'altra."),
 (5,"chiaro",0,'Chi comunica i non dedotti vede quella parte esclusa dal calcolo delle imposte sulla prestazione, proprio come i rendimenti.'),
 (5,"chiaro",0,"Lo spicchio si sposta di lato, con un timbro verde: comunicato. Alla fine non paga piu' nulla, perche' aveva gia' pagato."),
 (5,"chiaro",0,'Chi non lo fa, invece, rischia di pagare due volte sulla stessa somma. Lo spicchio, senza timbro, finisce sotto la lente delle tasse.'),
 (5,"chiaro",0,"Una volta con l'IRPEF, quando l'ha versata. E una seconda volta alla fine, con l'imposta sulla prestazione, anche se piu' bassa."),
 (5,"chiaro",0,"E' uno di quei casi in cui un modulo compilato al momento giusto vale piu' di qualunque strategia d'investimento. E costa solo un po' di attenzione."),

 (6,"profondo",1.2,"Se un contributo non e' stato dedotto, dillo al Fondo. Entro l'anno successivo."),

 (7,"chiaro",0,"Le tre cose da ricordare. Uno: i contributi oltre il limite, o comunque non dedotti, pagano l'IRPEF quando li versi."),
 (7,"chiaro",0,'Due: al momento della prestazione non vengono tassati una seconda volta, come i rendimenti.'),
 (7,"chiaro",0,"Tre: perche' questo accada, devi comunicarli al Fondo entro il trentuno dicembre dell'anno successivo al versamento."),
 (7,"chiaro",0,'La mossa di oggi riguarda soprattutto chi fa versamenti volontari, o ha avuto un anno con un reddito molto basso.'),
 (7,"chiaro",0,"Prendi la tua ultima Certificazione Unica, e trova i contributi alla previdenza complementare dedotti. E' la stessa riga che abbiamo cercato nella lezione quattro punto cinque."),
 (7,"chiaro",0,"Poi confrontali con tutto quello che hai versato nello stesso anno: trattenute in busta paga, contributo dell'ente e bonifici."),
 (7,"chiaro",0,"Se c'e' una differenza, comunicala dall'area riservata. Hai tempo fino al trentuno dicembre dell'anno dopo."),
 (7,"chiaro",0,"E se non fai versamenti volontari e il tuo reddito e' normale, probabilmente questa lezione non ti riguarda. Ma ora sai che esiste."),
 (7,"chiaro",0,"Nella prossima lezione, l'ultima del modulo: perche' per i dipendenti pubblici la tassazione si calcola a strati."),
 (7,"chiaro",0,"E' una storia a tre strati: fino al 2000, dal 2001 al 2017, e dal 2018 in poi. Ognuno con le sue regole."),
 (7,"chiaro",0,'[warm] Ci vediamo nella lezione cinque punto cinque.'),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Apertura', 2: 'La regola', 3: 'La comunicazione', 4: 'Quando capita', 5: 'Chi comunica e chi no', 6: 'Memo', 7: 'Chiusura'}
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
