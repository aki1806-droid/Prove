# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] E se poi cambio idea? E' la domanda che molti si fanno un attimo prima di firmare. Ed e' giusto farsela."),
 (1,"chiaro",0,"La risposta breve e' questa: in un fondo pensione si entra facilmente, ma non si esce quando si vuole."),
 (1,"chiaro",0,"Pero', una volta dentro, si possono regolare molte cose. Un po' come con un termostato: non lo spegni, ma lo alzi e lo abbassi."),
 (1,"chiaro",0,"In questa lezione vediamo che cosa si puo' fare e che cosa no. E chiudiamo il modulo con un'opportunita' che riguarda la famiglia."),

 (2,"chiaro",0,"Partiamo dal punto fermo. Finche' lavori in un'amministrazione che aderisce a Perseo Sirio, non puoi recedere dall'iscrizione."),
 (2,"chiaro",0,'E non puoi chiedere indietro i soldi accumulati. Il Fondo lo scrive in modo esplicito, nelle sue risposte alle domande frequenti.'),
 (2,"chiaro",0,"Ci sono solo due eccezioni, e le abbiamo gia' incontrate in questo modulo. Riguardano i primi giorni dopo l'adesione, non gli anni successivi."),
 (2,"chiaro",0,"Chi aderisce tramite il portale NoiPA ha trenta giorni per ripensarci. E chi viene iscritto per silenzio-assenso ha trenta giorni dall'avviso del Fondo."),
 (2,"chiaro",0,"Passati quei trenta giorni, la porta d'uscita resta chiusa finche' resti nel lavoro pubblico. Anche se cambi ente, anche se passano molti anni."),
 (2,"chiaro",0,"Perche' tanta rigidita'? Perche' un fondo pensione serve alla pensione. Se si potesse uscire a ogni difficolta', non arriverebbe mai a destinazione."),
 (2,"chiaro",0,"E' un vincolo, ma e' anche una protezione: impedisce di spendere oggi quello che ti servira' domani."),

 (3,"chiaro",0,"Una volta iscritto, pero', hai diverse manopole a disposizione. Sono quattro, e si usano quasi tutte dall'area riservata. Vediamole una per una."),
 (3,"chiaro",0,"Prima manopola: il tuo contributo. Puoi cambiarlo una volta all'anno, aumentandolo o riportandolo verso il minimo, dall'area riservata."),
 (3,"chiaro",0,"La modifica parte dal mese successivo alla richiesta. E l'anno dopo puoi cambiare ancora, nella direzione che ti serve in quel momento."),
 (3,"chiaro",0,'Seconda manopola: i versamenti extra. Puoi farli quando vuoi, con un bonifico, anche una sola volta, per esempio con la tredicesima.'),
 (3,"chiaro",0,'Terza manopola: il profilo di investimento. Puoi cambiarlo, con i tempi e le regole che vedremo nel modulo sei, dedicato proprio ai profili.'),
 (3,"chiaro",0,'Quarta manopola: la sospensione. Puoi sospendere i tuoi versamenti, con un apposito modulo, e riprenderli in seguito quando vuoi.'),
 (3,"chiaro",0,"[serious] Qui pero' fai attenzione. Se sospendi il tuo contributo, perdi anche l'uno per cento dell'ente, che spetta solo a chi versa."),
 (3,"chiaro",0,"E la sospensione non ferma l'accantonamento figurativo del TFR all'INPS, che continua come prima."),
 (3,"chiaro",0,"Sospendere, quindi, e' possibile, ma raramente conviene. Se il bilancio di casa e' stretto, meglio ridurre il contributo al minimo."),
 (3,"chiaro",0,"Con il minimo tieni acceso il contributo dell'ente. Con la sospensione lo spegni, e quella parte non torna piu'."),

 (4,"chiaro",0,"E se cambia il lavoro? E' una domanda frequente, soprattutto per chi ha un contratto a termine. Qui le situazioni sono tre, e ognuna ha una risposta diversa."),
 (4,"chiaro",0,"Prima situazione: passi da un ente all'altro, entrambi dentro Perseo Sirio. Per esempio da un ospedale a un comune."),
 (4,"chiaro",0,'Oppure cambi profilo professionale, con una progressione. In questi casi non cambia nulla: resti iscritto e la posizione continua.'),
 (4,"chiaro",0,'Seconda situazione: lasci del tutto il lavoro pubblico. In quel caso perdi i requisiti di partecipazione al Fondo.'),
 (4,"chiaro",0,"E allora hai tre strade. Puoi riscattare la posizione, cioe' farti liquidare quanto accumulato, con le regole previste."),
 (4,"chiaro",0,"Puoi trasferirla a un'altra forma pensionistica, per esempio il fondo negoziale del tuo nuovo lavoro, cosi' tutto resta in un'unica posizione."),
 (4,"chiaro",0,'Oppure puoi lasciarla nel Fondo, anche senza nuovi versamenti. I soldi restano investiti e continuano a lavorare.'),
 (4,"chiaro",0,"Terza situazione: resti nella pubblica amministrazione, ma vuoi spostarti in un'altra forma pensionistica."),
 (4,"chiaro",0,"Si puo', ma solo dopo almeno tre anni di iscrizione. E perdi il contributo dell'ente, che resta legato a Perseo Sirio."),
 (4,"chiaro",0,'Ogni caso ha i suoi dettagli, i suoi tempi e i suoi costi. Li approfondiremo uno per uno nel modulo otto, con esempi concreti.'),

 (5,"chiaro",0,"Chiudiamo con una porta che si apre. Perseo Sirio permette di iscrivere anche i familiari fiscalmente a carico dell'aderente, per esempio un figlio."),
 (5,"chiaro",0,"Le modalita' di adesione e di contribuzione sono stabilite da un regolamento del Consiglio di amministrazione del Fondo."),
 (5,"chiaro",0,"E per i familiari a carico non e' prevista la quota associativa annua: quello che si versa per loro va tutto sulla loro posizione."),
 (5,"chiaro",0,"Perche' pensarci? Per la stessa ragione che abbiamo visto nella prima lezione del corso: il tempo."),
 (5,"chiaro",0,'Una posizione aperta da giovanissimi ha davanti decenni per crescere. E gli anni di iscrizione contano anche per alcuni requisiti futuri.'),
 (5,"chiaro",0,"Una nota fiscale. I versamenti per un familiare a carico li deduce dal reddito chi lo ha a carico, cioe' di solito il genitore."),
 (5,"chiaro",0,'Ma dentro lo stesso tetto annuo che vedremo nel modulo cinque: cinquemilatrecento euro in tutto, i tuoi versamenti e i suoi insieme.'),
 (5,"chiaro",0,'Se ti interessa, sul sito del Fondo trovi il regolamento e il modulo dedicato ai familiari.'),

 (6,"profondo",1.2,"Dal Fondo non si esce quando si vuole. Ma si puo' regolare quasi tutto."),

 (7,"chiaro",0,"Le tre cose da ricordare. Uno: finche' lavori nella pubblica amministrazione non puoi recedere, salvo i trenta giorni di NoiPA e del silenzio-assenso."),
 (7,"chiaro",0,"Due: puoi modificare il contributo, versare di piu', cambiare profilo o sospendere. Ma sospendere ti fa perdere l'uno per cento dell'ente."),
 (7,"chiaro",0,'Tre: puoi iscrivere anche i familiari fiscalmente a carico, senza quota associativa.'),
 (7,"chiaro",0,"La mossa di oggi, se sei iscritto: entra nell'area riservata, nella sezione dei soggetti designati, e verifica chi riceverebbe la tua posizione."),
 (7,"chiaro",0,"Se non hai mai indicato nessuno, fallo ora. Bastano pochi minuti, ed e' una scelta che protegge chi ti sta vicino."),
 (7,"chiaro",0,"Si chiude cosi' il terzo modulo: ora sai chi puo' aderire, come si fa, e che cosa si puo' regolare."),
 (7,"chiaro",0,'[warm] Nel prossimo modulo vediamo i numeri: quanto si versa, chi lo versa, e dove trovarlo in busta paga.'),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Apertura', 2: 'Niente recesso', 3: 'Il termostato', 4: 'Quando cambia il lavoro', 5: 'La famiglia', 6: 'Memo', 7: 'Chiusura'}
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
