# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,'[warm] Una goccia al minuto sembra niente. Non la senti, non la vedi quasi cadere, e di certo non ti preoccupa.'),
 (1,"chiaro",0,"Ma lascia la tanica a perdere per un mese intero, e quando torni la trovi mezza vuota. Nessun disastro, nessun rumore: solo gocce, una dopo l'altra."),
 (1,"chiaro",0,'I costi di un fondo pensione sono gocce. Piccoli, regolari, silenziosi, e proprio per questo facili da ignorare per anni.'),
 (1,"chiaro",0,"Nella lezione precedente li abbiamo misurati in percentuale, con l'ISC. In questa li trasformiamo in euro, su una vita lavorativa."),
 (1,"chiaro",0,"E lo facciamo usando i dati ufficiali della COVIP, l'autorita' di vigilanza. Come sempre: esempi semplificati, non previsioni."),

 (2,"chiaro",0,"Partiamo dalle medie del sistema, cioe' da quanto costano in media le diverse forme pensionistiche in Italia. Sono dati pubblici, che chiunque puo' consultare."),
 (2,"chiaro",0,"Nella relazione annuale pubblicata a giugno 2026, la COVIP riporta l'ISC medio a dieci anni per ogni tipo di forma."),
 (2,"chiaro",0,"Fondi negoziali, come Perseo Sirio, cioe' i fondi nati dai contratti di lavoro: zero virgola quarantasette per cento."),
 (2,"chiaro",0,'Fondi aperti, offerti da banche e assicurazioni: uno virgola trentasei per cento. Quasi il triplo.'),
 (2,"chiaro",0,"Piani individuali pensionistici, i PIP, che sono polizze assicurative: due virgola diciassette per cento. Piu' di quattro volte."),
 (2,"chiaro",0,'Da dove viene questa differenza? Una parte la spiega la COVIP stessa: nei PIP pesa molto il compenso delle reti di vendita.'),
 (2,"chiaro",0,"Nei fondi negoziali, che non hanno scopo di lucro e non hanno venditori a provvigione, quel costo semplicemente non c'e'."),

 (3,"chiaro",0,"Ora facciamo una simulazione semplice, per vedere che cosa significano questi numeri in euro. Niente formule: solo tre persone e trent'anni."),
 (3,"chiaro",0,"Tre persone versano la stessa cifra: duemila euro l'anno, ogni anno, per trent'anni. Sessantamila euro in tutto, per ciascuna."),
 (3,"chiaro",0,"Ottengono lo stesso rendimento lordo ipotetico, il quattro per cento l'anno. Stessi mercati, stessi investimenti, stessa fortuna."),
 (3,"chiaro",0,"Cambia solo una cosa: il costo annuo. Per ciascuna persona, e' pari a una delle tre medie della COVIP che abbiamo appena visto."),
 (3,"chiaro",0,"All'inizio le tre curve partono insieme, dallo stesso punto. Per anni sembrano quasi uguali, e la differenza a occhio non si nota."),
 (3,"chiaro",0,"Poi, piano piano, si separano. E piu' passa il tempo, piu' la distanza cresce: e' l'interesse composto, che lavora anche sui costi."),
 (3,"chiaro",0,"Ecco i risultati. Con il costo medio dei fondi negoziali, dopo trent'anni ci sono circa centosettemila euro."),
 (3,"chiaro",0,'Con il costo medio dei fondi aperti, circa novantaduemila euro. Quindicimila in meno.'),
 (3,"chiaro",0,'Con il costo medio dei PIP, circa ottantamila euro. Altri dodicimila in meno.'),
 (3,"chiaro",0,"Ventisettemila euro di differenza, a parita' di soldi versati e di rendimento lordo. Quasi la meta' di quanto ciascuno ha versato di tasca propria."),
 (3,"chiaro",0,"Non sono stati persi in un crollo di borsa, ne' per una scelta sbagliata. Se ne sono andati, goccia dopo goccia, in costi."),

 (4,"chiaro",0,"Per correttezza, pero', servono due precisazioni. Perche' i numeri vanno letti con onesta', anche quando ci danno ragione."),
 (4,"chiaro",0,"La prima: i costi non sono l'unico fattore. Il risultato finale dipende anche da quanto rischio ha preso il gestore, e da come e' andata sui mercati."),
 (4,"chiaro",0,"Un comparto con piu' azioni, in un anno buono, puo' rendere di piu' anche se costa di piu'. Il costo non dice tutto."),
 (4,"chiaro",0,"La seconda: la COVIP ha osservato che, a parita' di quota azionaria, i fondi negoziali in media rendono di piu'."),
 (4,"chiaro",0,'I loro comparti si collocano in media sopra quelli dei fondi aperti e dei PIP con una quota di azioni simile.'),
 (4,"chiaro",0,"Cioe': quando si confrontano investimenti simili, con lo stesso rischio, i costi piu' bassi si vedono anche nel risultato finale."),
 (4,"chiaro",0,"E per un dipendente pubblico, come sai dal modulo uno, c'e' un elemento in piu' che nessun prodotto individuale offre: l'uno per cento dell'ente."),

 (5,"chiaro",0,"Non puoi controllare i mercati. Non puoi sapere quanto renderanno le azioni il prossimo anno, ne' tra dieci. Nessuno lo sa davvero."),
 (5,"chiaro",0,"Ma i costi li conosci in anticipo. Sono scritti nella Nota informativa, riassunti nell'ISC, e li puoi confrontare con calma."),
 (5,"chiaro",0,"E' l'unica variabile di tutto il percorso che dipende interamente da una tua decisione, presa una volta sola, a mente fredda."),
 (5,"chiaro",0,"Ed e' per questo che vale la pena guardarla bene, prima di scegliere dove mettere i tuoi soldi per tanti anni della tua vita."),
 (5,"chiaro",0,"Chiudere il foro della tanica non costa fatica. Basta sapere che c'e', guardarlo bene, e scegliere il contenitore giusto."),

 (6,"profondo",1.2,"Il rendimento e' un'ipotesi. Il costo e' una certezza. Sceglilo con cura."),

 (7,"chiaro",0,"Le tre cose da ricordare. Uno: secondo la COVIP, l'ISC medio a dieci anni e' dello zero virgola quarantasette per cento nei fondi negoziali."),
 (7,"chiaro",0,"Dell'uno virgola trentasei per cento nei fondi aperti, e del due virgola diciassette per cento nei PIP."),
 (7,"chiaro",0,"Due: su trent'anni, questa differenza puo' valere decine di migliaia di euro, a parita' di soldi versati."),
 (7,"chiaro",0,"Tre: a parita' di rischio, il costo fa la differenza. E il costo, a differenza dei mercati, lo scegli tu."),
 (7,"chiaro",0,"La mossa di oggi: se hai gia' un piano pensionistico individuale o un fondo aperto, cerca il suo ISC a dieci anni."),
 (7,"chiaro",0,'E confrontalo con quello di Perseo Sirio, con la tabella della lezione precedente. Se qualcuno te ne propone uno nuovo, fai la stessa domanda, prima di firmare.'),
 (7,"chiaro",0,"Si chiude cosi' il settimo modulo, quello dei costi. Ora sai quanto costa il Fondo, come leggere l'ISC, e come confrontarlo con le altre forme."),
 (7,"chiaro",0,"Hai visto anche che i costi di Perseo Sirio sono molto sotto le medie dei fondi aperti e dei PIP. E sai anche perche': niente scopo di lucro, niente reti di vendita."),
 (7,"chiaro",0,'Nel prossimo modulo cambiamo argomento: vediamo che cosa puoi fare con la tua posizione prima della pensione, quando la vita lo richiede.'),
 (7,"chiaro",0,'Anticipazioni, riscatti, trasferimenti e RITA: quando servono, come si chiedono, e quali regole valgono per ciascuno.'),
 (7,"chiaro",0,'[warm] Prima della pensione. Ci vediamo nel modulo otto.'),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Apertura', 2: 'Le medie del sistema', 3: 'La simulazione', 4: "Onesta' sui numeri", 5: "L'unica certezza", 6: 'Memo', 7: 'Chiusura'}
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
