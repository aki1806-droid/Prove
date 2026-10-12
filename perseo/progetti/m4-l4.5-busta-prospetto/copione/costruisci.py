# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Fidarsi e' bene. Controllare e' meglio. Soprattutto quando si parla dei soldi della tua pensione."),
 (1,"chiaro",0,'Una volta iscritto, i tuoi contributi passano per tre documenti: il cedolino ogni mese, la Certificazione Unica ogni anno, e il prospetto annuale del Fondo.'),
 (1,"chiaro",0,'Chi li sa leggere si accorge subito se qualcosa non torna. E non serve essere esperti: basta sapere dove guardare.'),
 (1,"chiaro",0,'In questa lezione impariamo a trovare, in ciascuno dei tre, le poche righe che contano davvero.'),

 (2,"chiaro",0,"Partiamo dal cedolino, quello che ricevi ogni mese. E' pieno di numeri, ma per noi oggi ne servono solo due."),
 (2,"chiaro",0,'Il Fondo ricorda che in busta paga devono comparire due informazioni: la trattenuta fatta a te, e il versamento della tua amministrazione.'),
 (2,"chiaro",0,'I nomi delle voci cambiano da ente a ente. Di solito contengono parole come previdenza complementare, fondo pensione, oppure il nome del Fondo.'),
 (2,"chiaro",0,"Cerca prima la trattenuta a tuo carico, tra le ritenute. Deve corrispondere alla percentuale che hai scelto al momento dell'adesione, o dopo."),
 (2,"chiaro",0,"Con l'uno per cento e trentamila euro di retribuzione utile, l'esempio di tutto il modulo, sono circa venticinque euro al mese."),
 (2,"chiaro",0,"Poi cerca il contributo dell'ente. Spesso sta in una parte diversa del cedolino, quella dei contributi a carico dell'amministrazione."),
 (2,"chiaro",0,"Con l'uno per cento dell'ente, l'importo e' dello stesso ordine di grandezza della tua trattenuta: anche qui, circa venticinque euro."),
 (2,"chiaro",0,"Il TFR figurativo, invece, nel cedolino non lo vedi. Non e' un movimento di denaro: e' un accantonamento che l'INPS registra a parte."),
 (2,"chiaro",0,"Quindi niente panico se non trovi una riga del TFR: e' normale. Lo ritroverai nel terzo documento, il prospetto del Fondo."),

 (3,"chiaro",0,"Un dettaglio che spesso preoccupa. In un mese dell'anno, di solito all'inizio, la tua posizione registra un importo un po' piu' basso del solito."),
 (3,"chiaro",0,"Non e' un errore, e non sono soldi spariti. E' la quota associativa annuale, il costo fisso dell'iscrizione al Fondo."),
 (3,"chiaro",0,"Vale tredici euro l'anno. Undici per gli aderenti contrattuali della polizia locale. E si paga una sola volta, non ogni mese."),
 (3,"chiaro",0,'Il Fondo la trattiene dal primo versamento utile di ogni anno, e serve a coprire le spese di funzionamento del Fondo stesso.'),
 (3,"chiaro",0,"Chi in un anno non fa versamenti, oppure fa solo versamenti volontari con bonifico, quell'anno la quota non la paga."),

 (4,"chiaro",0,'Secondo documento: la Certificazione Unica, quella che ricevi ogni anno dalla tua amministrazione, di solito in primavera.'),
 (4,"chiaro",0,"Qui trovi i contributi versati al Fondo e gia' dedotti dall'ente in busta paga: sia i tuoi, sia quelli dell'amministrazione."),
 (4,"chiaro",0,"Non devi fare nulla per ottenere lo sconto fiscale su quella parte. L'agevolazione l'hai gia' avuta mese per mese, nel cedolino."),
 (4,"chiaro",0,'Se fai il 730, il dato viene riportato in automatico nella dichiarazione precompilata. Basta controllare che ci sia.'),
 (4,"chiaro",0,'Devi intervenire tu solo per i versamenti fatti con bonifico, come abbiamo visto nella lezione precedente. Con la ricevuta in mano.'),

 (5,"chiaro",0,"Terzo documento, il piu' completo: il prospetto delle prestazioni pensionistiche, nella fase di accumulo. Il nome e' lungo, ma il contenuto e' chiaro."),
 (5,"chiaro",0,"Il Fondo lo mette a disposizione ogni anno nell'area riservata, nella sezione dedicata alla documentazione. Si scarica in pochi secondi."),
 (5,"chiaro",0,'Qui ritrovi le due tasche, le stesse che abbiamo visto nel modulo tre: quella con soldi veri, e quella figurativa.'),
 (5,"chiaro",0,"Nella tasca reale ci sono i versamenti a carico tuo e quelli a carico dell'ente. Sono i soldi che il Fondo investe davvero."),
 (5,"chiaro",0,"Nella tasca figurativa c'e' quanto risulta contabilizzato dall'INPS: il TFR, che il Fondo chiama TFR virtuale."),
 (5,"chiaro",0,"E, per chi ha optato dal TFS, l'accantonamento aggiuntivo dell'uno virgola cinque per cento, chiamato anche TFS virtuale."),
 (5,"chiaro",0,"Poi c'e' il risultato della gestione: cioe' quanto hanno reso gli investimenti nell'anno. Puo' essere positivo, o in qualche anno negativo."),
 (5,"chiaro",0,"La somma di tutto, al netto dei costi, e' la tua posizione individuale. E' il numero che, un giorno, diventera' la tua prestazione."),
 (5,"chiaro",0,"Un consiglio: conserva i prospetti di ogni anno, uno accanto all'altro. Cosi' vedi come cresce la tua posizione nel tempo."),

 (6,"chiaro",0,"E se qualcosa non torna? Per esempio, una trattenuta che c'e' in busta paga, ma che non compare nel prospetto del Fondo."),
 (6,"chiaro",0,'Primo passo: confronta i documenti. Somma le trattenute dei cedolini di un anno, e mettile accanto ai tuoi contributi nel prospetto.'),
 (6,"chiaro",0,"Ricorda che possono esserci piccoli sfasamenti di un mese, perche' l'ente versa entro il mese successivo a quello della trattenuta."),
 (6,"chiaro",0,"Se la differenza resta, il primo interlocutore e' l'ufficio del personale: e' l'amministrazione che versa e trasmette i dati al Fondo."),
 (6,"chiaro",0,"Poi, se serve, il Fondo stesso: al numero verde, oppure scrivendo dall'area riservata, con i cedolini e il prospetto a portata di mano."),
 (6,"chiaro",0,"E ricorda che il delegato sindacale sul tuo posto di lavoro puo' aiutarti a ricostruire i passaggi, senza che tu debba farlo da solo."),

 (7,"profondo",1.2,"Una volta l'anno, dieci minuti di controllo. E' la tua pensione."),

 (8,"chiaro",0,"Le tre cose da ricordare. Uno: nel cedolino trovi la trattenuta a tuo carico e il contributo dell'ente. Il TFR figurativo li' non compare."),
 (8,"chiaro",0,"Due: una volta l'anno il Fondo trattiene la quota associativa di tredici euro, dal primo versamento utile. Non e' un errore."),
 (8,"chiaro",0,"Tre: il prospetto annuale mostra le due tasche, i rendimenti e la posizione complessiva. E' il documento da conservare."),
 (8,"chiaro",0,"La mossa di oggi: scarica l'ultimo prospetto annuale dall'area riservata del Fondo."),
 (8,"chiaro",0,'Poi confronta la somma dei tuoi contributi con quella delle trattenute nei cedolini dello stesso anno. Bastano dieci minuti.'),
 (8,"chiaro",0,"Si chiude cosi' il quarto modulo. Ora sai quanto entra nella tua pensione complementare, da dove arriva, e dove trovarlo scritto."),
 (8,"chiaro",0,'Nel prossimo modulo vediamo il punto in cui la previdenza complementare fa davvero la differenza.'),
 (8,"chiaro",0,'[warm] Il fisco: dove si guadagna davvero. Ci vediamo nel modulo cinque.'),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Apertura', 2: 'Il cedolino', 3: 'La quota associativa', 4: 'La Certificazione Unica', 5: 'Il prospetto', 6: 'Se qualcosa non torna', 7: 'Memo', 8: 'Chiusura'}
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
