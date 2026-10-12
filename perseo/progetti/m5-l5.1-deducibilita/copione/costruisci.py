# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Immagina il tuo stipendio lordo come una torta. Ogni mese lo Stato ne prende una fetta: l'IRPEF."),
 (1,"chiaro",0,'E se ti dicessi che una parte della torta puoi spostarla su un piatto a parte, per la tua pensione, prima che lo Stato tagli la sua fetta?'),
 (1,"chiaro",0,"E' esattamente quello che succede con i contributi a Perseo Sirio. Si chiama deducibilita', ed e' una delle ragioni per cui aderire conviene davvero."),
 (1,"chiaro",0,"E' il primo dei tre vantaggi fiscali della previdenza complementare. Gli altri due li vediamo nelle prossime lezioni del modulo."),
 (1,"chiaro",0,'Una premessa: queste sono informazioni generali, non una consulenza fiscale. Gli esempi sono semplificati e senza addizionali.'),

 (2,"chiaro",0,'Partiamo dalla parola. Dedurre significa sottrarre una somma dal reddito su cui si calcolano le imposte.'),
 (2,"chiaro",0,"Immagina una colonna: e' il tuo reddito lordo. Senza deduzione, l'IRPEF si calcola sulla colonna intera."),
 (2,"chiaro",0,"Con la deduzione, invece, prima si toglie una fetta: i contributi che versi a Perseo Sirio. E solo dopo si calcola l'imposta."),
 (2,"chiaro",0,"La colonna su cui paghi l'IRPEF diventa un po' piu' bassa. E quindi anche l'imposta diventa un po' piu' piccola."),
 (2,"chiaro",0,"Su quella fetta, in pratica, non paghi l'imposta. Prima togli, poi si tassa: e' tutto qui. Non e' un rimborso che arriva dopo: e' un'imposta che non paghi."),
 (2,"chiaro",0,"Ed ecco una particolarita' che pochi conoscono. Nel conto entra anche il contributo che versa l'ente."),
 (2,"chiaro",0,"Anche quell'uno per cento arriva nella tua posizione senza essere tassato come reddito tuo. Se te lo dessero in busta paga, invece, ci pagheresti l'IRPEF."),
 (2,"chiaro",0,"Il TFR e l'accantonamento aggiuntivo dell'uno virgola cinque, invece, non entrano nel calcolo della deduzione: hanno gia' regole proprie."),

 (3,"chiaro",0,"C'e' un limite, naturalmente. Dal 2026, con la legge di bilancio, si possono dedurre fino a cinquemilatrecento euro l'anno."),
 (3,"chiaro",0,"Nel limite si sommano i tuoi contributi e quelli dell'ente. Fino al 2025 il tetto era di cinquemilacentosessantaquattro euro e cinquantasette."),
 (3,"chiaro",0,"Per i dipendenti pubblici, fino al 2017 valevano regole piu' strette, che vedremo nell'ultima lezione del modulo."),
 (3,"chiaro",0,'Dal 2018, invece, i pubblici hanno lo stesso limite dei lavoratori privati. Oggi, quindi, per i contributi nuovi le regole sono le stesse per tutti.'),
 (3,"chiaro",0,"Per capire le proporzioni, torniamo all'esempio di trentamila euro di retribuzione utile, quello che usiamo dall'inizio del corso."),
 (3,"chiaro",0,"Per arrivare al tetto dovresti versare quasi il diciassette per cento, oltre all'uno per cento dell'ente. Per quasi tutti, il limite e' molto lontano."),

 (4,"chiaro",0,"Quanto vale, in euro? Dipende dalla tua aliquota IRPEF piu' alta, cioe' dallo scaglione in cui cade l'ultima parte del tuo reddito."),
 (4,"chiaro",0,"Le aliquote usate negli esempi sono tre: ventitre' per cento fino a ventottomila euro, trentatre' fino a cinquantamila, quarantatre' oltre."),
 (4,"chiaro",0,"Prendiamo il caso base del corso: trentamila euro di retribuzione utile, uno per cento tuo e uno per cento dell'ente. Seicento euro dedotti."),
 (4,"chiaro",0,"Con l'aliquota del ventitre' per cento, risparmi centotrentotto euro di IRPEF in un anno. Sono soldi che restano a te, invece di andare in imposte."),
 (4,"chiaro",0,"Con il trentatre' per cento, lo stesso versamento ne fa risparmiare centonovantotto. Con il quarantatre', duecentocinquantotto."),
 (4,"chiaro",0,"Se sali al tre per cento, i contributi dedotti diventano milleduecento euro, e al ventitre' per cento il risparmio sale a duecentosettantasei euro."),
 (4,"chiaro",0,"Piu' e' alta la tua aliquota, piu' vale ogni euro dedotto. Per chi e' nello scaglione del trentatre' o del quarantatre', il vantaggio cresce di conseguenza."),

 (5,"chiaro",0,'Ora rovesciamo il punto di vista. Ricordi la moneta da venticinque euro al mese della prima lezione del modulo quattro?'),
 (5,"chiaro",0,"All'aliquota del ventitre' per cento, quei venticinque euro non ti costano davvero venticinque euro."),
 (5,"chiaro",0,"Quasi un quarto di quella cifra lo recuperi in minori imposte, gia' nello stesso cedolino. Poco meno di sei euro al mese."),
 (5,"chiaro",0,"Quindi versi venticinque euro, ma la tua busta paga netta scende di poco piu' di diciannove. Il resto lo paga il fisco, in un certo senso."),
 (5,"chiaro",0,"E i venticinque euro dell'ente arrivano nella tua posizione senza che tu ci paghi IRPEF sopra."),
 (5,"chiaro",0,"Ecco perche' si dice che la previdenza complementare costa meno di quanto versi. E' uno sconto vero, non una promessa, e lo vedi ogni mese nel cedolino."),

 (6,"chiaro",0,'Chi applica la deduzione? Non devi fare nulla per ottenerla. La applica direttamente la tua amministrazione.'),
 (6,"chiaro",0,"L'ente fa da sostituto d'imposta: e' lui che trattiene l'IRPEF dallo stipendio, e la calcola mese per mese gia' al netto dei contributi al Fondo."),
 (6,"chiaro",0,"Poi riporta tutto nella Certificazione Unica, come abbiamo visto nell'ultima lezione del modulo quattro."),
 (6,"chiaro",0,'Non serve la dichiarazione dei redditi, salvo per i versamenti fatti con bonifico. Quelli, ricordi, li porti in deduzione tu.'),
 (6,"chiaro",0,"E se fai il 730 per altri motivi, i contributi dedotti dall'ente compaiono gia' nella precompilata. Basta controllare."),

 (7,"profondo",1.2,'Con la deduzione, la tua pensione si prende la sua fetta prima del fisco.'),

 (8,"chiaro",0,"Le tre cose da ricordare. Uno: i contributi tuoi e dell'ente si sottraggono dal reddito su cui paghi l'IRPEF."),
 (8,"chiaro",0,"Due: dal 2026 il limite e' di cinquemilatrecento euro l'anno. TFR e uno virgola cinque non si contano."),
 (8,"chiaro",0,"Tre: la deduzione la applica l'amministrazione in busta paga, senza dichiarazione dei redditi."),
 (8,"chiaro",0,'La mossa di oggi: prendi la tua ultima Certificazione Unica e individua il tuo reddito imponibile.'),
 (8,"chiaro",0,'Confrontalo con gli scaglioni: fino a ventottomila euro, da ventottomila a cinquantamila, oltre cinquantamila. Capirai subito in quale ti trovi.'),
 (8,"chiaro",0,"E saprai quanto vale per te ogni euro dedotto: ventitre', trentatre' o quarantatre' centesimi."),
 (8,"chiaro",0,"Ricorda: sono esempi semplificati, senza addizionali regionali e comunali, che aumentano un po' il vantaggio reale."),
 (8,"chiaro",0,"Nella prossima lezione: il secondo vantaggio fiscale. Perche', dentro il Fondo, i rendimenti sono tassati meno."),
 (8,"chiaro",0,"[warm] E' il vantaggio che lavora in silenzio, anno dopo anno. Ci vediamo nella lezione cinque punto due."),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Apertura', 2: 'Dedurre', 3: 'Il limite', 4: 'Quanto vale', 5: 'Costa meno', 6: 'Chi la applica', 7: 'Memo', 8: 'Chiusura'}
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
