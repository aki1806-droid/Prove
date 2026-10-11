# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Ho aderito al Fondo, entro nell'area riservata, e il mio TFR non c'e'. E' una delle telefonate piu' frequenti ai numeri verdi."),
 (1,"chiaro",0,'E chi la fa ha ragione a stupirsi. Ha visto la trattenuta in busta paga, ha letto che il TFR va al Fondo, e poi sul conto trova molto meno di quanto si aspettava.'),
 (1,"chiaro",0,"La spiegazione e' una particolarita' che esiste solo nel pubblico impiego. Una parte dei soldi destinati al Fondo non si sposta subito: resta in un'altra tasca."),
 (1,"chiaro",0,'In questa lezione impariamo a vedere quella tasca, a capire come cresce, e quando i suoi soldi arrivano davvero a destinazione.'),

 (2,"chiaro",0,"Immagina che la tua posizione nel Fondo sia un cappotto con due tasche. Le tasche sono due, ma il cappotto e' uno solo, ed e' tuo."),
 (2,"chiaro",0,"Nella prima tasca, il conto reale, arrivano davvero i soldi ogni mese: il tuo contributo e quello dell'ente."),
 (2,"chiaro",0,"Sono versati al Fondo e investiti dai gestori. Sono soldi veri, che si muovono, e che trovi nell'area riservata mese dopo mese."),
 (2,"chiaro",0,"Nella seconda tasca, il conto figurativo, finisce la quota di TFR destinata al Fondo. E, per chi era in servizio prima del 2001, anche l'accantonamento aggiuntivo dell'uno virgola cinque per cento."),
 (2,"chiaro",0,"[serious] Questi soldi, pero', non vengono versati. L'INPS li registra, li tiene in conto e li rivaluta."),
 (2,"chiaro",0,"Esistono, ti appartengono, ma sono scritti a matita. Diventeranno soldi veri solo piu' avanti, alla fine del rapporto di lavoro."),
 (2,"chiaro",0,"Facciamo due conti. Per un assunto dopo il 2000, con trentamila euro di retribuzione, nella tasca reale entrano seicento euro l'anno, in quella figurativa circa duemilasettanta."),
 (2,"chiaro",0,"La tasca scritta a matita, quindi, e' spesso la piu' grande delle due. E' per questo che conviene capirla bene."),

 (3,"chiaro",0,"Perche' si chiama figurativo? Perche' nel pubblico impiego il TFR non viene accantonato in un fondo vero e proprio durante il lavoro, come succede in molte aziende private."),
 (3,"chiaro",0,"Viene pagato dall'INPS alla fine. Durante gli anni di lavoro, insomma, nessuno mette da parte quei soldi in una cassaforte con il tuo nome sopra."),
 (3,"chiaro",0,"Non e' un trucco contabile e non e' un rischio in piu': e' lo stesso meccanismo con cui il pubblico impiego gestisce da sempre le liquidazioni."),
 (3,"chiaro",0,"Quando aderisci a Perseo Sirio, la quota destinata al Fondo segue la stessa logica. L'INPS, gestione dipendenti pubblici, la contabilizza come se fosse versata, e la rivaluta anno per anno."),
 (3,"chiaro",0,"Per chi lavora in sanita' e negli enti locali, questo conto lo tiene sempre l'INPS, che e' anche l'ente che pagherebbe la liquidazione."),
 (3,"chiaro",0,'Solo in poche amministrazioni, che pagano direttamente la liquidazione, il conto lo tiene il datore di lavoro. Ma il principio non cambia.'),

 (4,"chiaro",0,"E come cresce quello che c'e' nella tasca figurativa? Qui c'e' una novita' importante, ancora poco conosciuta anche tra gli iscritti."),
 (4,"chiaro",0,"Fino al 31 dicembre 2025, l'INPS rivalutava queste somme con la media dei rendimenti di un gruppo di fondi pensione: un paniere stabilito per legge, uguale per tutti."),
 (4,"chiaro",0,'Qualunque scelta avessi fatto per la tasca reale, la tasca figurativa cresceva come quella di tutti gli altri iscritti.'),
 (4,"chiaro",0,"Dal primo gennaio 2026 non e' piu' cosi'. La quota figurativa viene rivalutata con il rendimento netto del profilo di investimento che scegli tu tra quelli di Perseo Sirio."),
 (4,"chiaro",0,'E puoi persino scegliere, per la tasca figurativa, un profilo diverso da quello della tasca reale.'),
 (4,"chiaro",0,'Ne parleremo a fondo nel modulo sei. Per ora ricorda una cosa: anche il tuo TFR, ora, dipende da una tua scelta.'),

 (5,"chiaro",0,"Ma quando le due tasche diventano una sola? Alla fine del rapporto di lavoro, a condizione che tu esca davvero dal mondo dei dipendenti iscritti all'INPS gestione pubblica."),
 (5,"chiaro",0,"In quel momento l'INPS trasferisce al Fondo tutto quanto ha accumulato e rivalutato, e le due tasche si sommano. Le monete scritte a matita diventano soldi veri."),
 (5,"chiaro",0,"Questo ha tre conseguenze pratiche, che ritroveremo piu' avanti nel corso. Prima: le anticipazioni durante il lavoro possono riguardare solo la tasca reale."),
 (5,"chiaro",0,"Seconda: se trasferisci la posizione a un altro fondo mentre lavori ancora nella pubblica amministrazione, la tasca figurativa resta all'INPS fino alla cessazione."),
 (5,"chiaro",0,"Terza: quando chiedi la prestazione, la parte figurativa arriva dopo, con i tempi dell'INPS."),
 (5,"chiaro",0,"Il Fondo indica che l'INPS impiega in genere fino a dodici mesi, con un massimo di diciotto. Conviene saperlo prima, per non aspettarsi tutto subito."),

 (6,"chiaro",0,"E dove si vede la tasca figurativa? Ogni anno il Fondo mette a disposizione nell'area riservata il prospetto delle prestazioni pensionistiche, fase di accumulo."),
 (6,"chiaro",0,"Li' trovi separati i contributi versati da te e dall'ente, e quanto risulta contabilizzato dall'INPS, che il Fondo chiama anche TFR virtuale."),
 (6,"chiaro",0,"Trovi anche il risultato della gestione, cioe' quanto hanno reso gli investimenti, gia' al netto dei costi e delle tasse."),
 (6,"chiaro",0,"Se la tasca figurativa ti sembra vuota, o piu' leggera del previsto, spesso e' solo questione di tempi: il Fondo aggiorna i dati quando l'INPS li comunica."),
 (6,"chiaro",0,"Se invece qualcosa non torna anche dopo l'aggiornamento, il primo passo e' chiedere all'ufficio del personale, che trasmette i dati all'INPS."),

 (7,"profondo",1.2,"Il TFR figurativo e' scritto a matita. Ma e' tuo."),

 (8,"chiaro",0,"Le tre cose da ricordare. Uno: la posizione di un dipendente pubblico ha due tasche. Quella reale, con i contributi, e quella figurativa all'INPS, con il TFR e l'eventuale uno virgola cinque."),
 (8,"chiaro",0,"Due: dal 2026 anche la tasca figurativa si rivaluta con il profilo di investimento che scegli, che puo' essere diverso da quello dei contributi."),
 (8,"chiaro",0,'Tre: le due tasche si uniscono solo alla fine del rapporto di lavoro.'),
 (8,"chiaro",0,"La mossa di oggi, se sei iscritto: entra nell'area riservata del Fondo, sezione documentazione, e cerca il prospetto annuale. Individua le due tasche: accanto ai contributi c'e' la voce del TFR virtuale."),
 (8,"chiaro",0,"Con questa lezione si chiude il secondo modulo. Ora sai che cosa succede alla tua liquidazione, e perche' una parte non la vedi."),
 (8,"chiaro",0,"[warm] Nel prossimo modulo vediamo chi puo' aderire, e come si fa, passo per passo."),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Apertura', 2: 'Le due tasche', 3: 'Figurativo', 4: 'Dal 2026', 5: 'Quando si uniscono', 6: 'Dove vederle', 7: 'Memo', 8: 'Chiusura'}
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
