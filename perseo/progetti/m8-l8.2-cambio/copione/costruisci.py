# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Nella vita lavorativa si cambia. Capita a quasi tutti, prima o poi, e spesso piu' di una volta nel corso degli anni."),
 (1,"chiaro",0,"Un trasferimento in un'altra azienda sanitaria. Una progressione di carriera. Un concorso vinto in un comune."),
 (1,"chiaro",0,"Oppure una scelta piu' netta: lasciare il pubblico impiego, per un lavoro nel privato o per un periodo diverso della vita."),
 (1,"chiaro",0,"Che fine fa, in tutti questi casi, la tua posizione in Perseo Sirio? La risposta breve e': dipende da che tipo di cambio e'."),
 (1,"chiaro",0,'In questa lezione separiamo i cambi che non toccano nulla da quelli che aprono un bivio. E poi vediamo le strade del bivio.'),

 (2,"chiaro",0,"Partiamo dai cambi che non cambiano niente. Sono i piu' frequenti, e sono anche i piu' tranquilli: non devi fare niente, e non perdi niente."),
 (2,"chiaro",0,"Se passi da un ente all'altro senza interruzione, ed entrambi rientrano tra quelli di Perseo Sirio, la posizione continua."),
 (2,"chiaro",0,"Resti iscritto, e i versamenti proseguono con il nuovo ente. Il tuo uno per cento, quello dell'ente, il TFR: tutto continua come prima."),
 (2,"chiaro",0,"Per esempio, dall'azienda ospedaliera a una ULSS. Oppure dalla sanita' a un comune, o a una regione. Tutti enti i cui dipendenti possono aderire a Perseo Sirio."),
 (2,"chiaro",0,'Lo stesso vale se cambi profilo professionale nello stesso ente, per esempio con una progressione verticale.'),
 (2,"chiaro",0,"Il Fondo e' esplicito su questo punto: questi passaggi non fanno perdere i requisiti di partecipazione. La posizione resta una sola, e gli anni continuano a sommarsi."),
 (2,"chiaro",0,'Quindi non danno diritto a ritirare la posizione. Ma nemmeno la mettono in pericolo: il tuo salvadanaio ti segue.'),
 (2,"chiaro",0,"Un consiglio pratico: quando cambi ente, controlla nei primi cedolini che la trattenuta per il Fondo ci sia ancora. Se manca, segnalalo subito all'ufficio del personale."),

 (3,"chiaro",0,"Diverso e' il caso in cui lasci il pubblico impiego. Per dimissioni, per licenziamento, per la fine di un contratto a termine."),
 (3,"chiaro",0,"Oppure perche' vai a lavorare nel settore privato. In tutti questi casi perdi i requisiti di partecipazione al Fondo."),
 (3,"chiaro",0,"E davanti a te si apre un bivio, con tre strade. Nessuna e' obbligatoria, e ognuna ha le sue conseguenze."),
 (3,"chiaro",0,"La prima strada: riscattare. Cioe' chiedere che ti venga liquidata l'intera posizione, in denaro, con un bonifico sul tuo conto."),
 (3,"chiaro",0,"La seconda: trasferirla al fondo pensione del nuovo lavoro, se c'e'. Oppure a un fondo aperto, o a un piano individuale."),
 (3,"chiaro",0,'La terza: mantenerla in Perseo Sirio. Anche senza nuovi versamenti, oppure continuando con soli versamenti volontari.'),
 (3,"chiaro",0,"E c'e' una buona notizia: non c'e' un termine per decidere. Puoi prenderti il tempo che serve, e informarti con calma prima di scegliere."),
 (3,"chiaro",0,'Se non fai nulla, la posizione resta semplicemente nel Fondo, e continua a essere investita nel profilo che avevi scelto.'),

 (4,"chiaro",0,"Come scegliere tra le tre strade? Mettiamole una accanto all'altra, e guardiamo tre cose: che cosa ottieni, le tasse, e gli anni."),
 (4,"chiaro",0,"Il riscatto ti da' i soldi subito. Ma se lo chiedi per una tua scelta, come le dimissioni, paga una ritenuta del ventitre' per cento."),
 (4,"chiaro",0,"Molto di piu' del quindici o del nove per cento che pagheresti sulla pensione complementare. E' la tassazione meno favorevole di tutte."),
 (4,"chiaro",0,"Il ventitre' per cento vale sulle somme dal 2007. Per le parti piu' vecchie della posizione valgono, come sempre, le regole degli strati."),
 (4,"chiaro",0,"E soprattutto, il riscatto chiude la storia. Gli anni di partecipazione si azzerano. Se un giorno aderirai di nuovo a un fondo pensione, si ripartira' da zero."),
 (4,"chiaro",0,"Trasferire o mantenere, invece, non costa imposte al momento della scelta: le tasse arriveranno solo con la prestazione. E conserva l'anzianita' di iscrizione."),
 (4,"chiaro",0,"Quell'anzianita' conta due volte: per i requisiti delle prestazioni future, e per la scala del fisco, che scende fino al nove per cento."),
 (4,"chiaro",0,"Se non hai bisogno immediato di quei soldi, il riscatto e' raramente la scelta piu' vantaggiosa."),
 (4,"chiaro",0,'Il riscatto, in altre parole, ha senso solo quando quei soldi servono davvero, e servono adesso. Negli altri casi, aspettare costa poco.'),

 (5,"chiaro",0,"E il TFR figurativo, quello della tasca che sta all'INPS? Qui serve un'attenzione in piu', perche' segue regole sue."),
 (5,"chiaro",0,"L'INPS lo trasferisce al Fondo quando cessa il rapporto di lavoro. Ma a una condizione: che tu esca davvero dalla gestione dei dipendenti pubblici."),
 (5,"chiaro",0,'Facciamo un esempio. Finisce un contratto a termine, e poco dopo vieni riassunto in un altro ente pubblico.'),
 (5,"chiaro",0,"In questo caso la continuita' non si interrompe, e il TFR resta all'INPS, come se nulla fosse successo."),
 (5,"chiaro",0,"Se invece lasci il pubblico impiego, il TFR arriva al Fondo, con i tempi dell'INPS. E da li' segue la strada che hai scelto per il resto della posizione."),

 (6,"profondo",1.2,"Il riscatto si puo' fare sempre. Annullarlo, mai. Pensaci prima."),

 (7,"chiaro",0,"Le tre cose da ricordare. Uno: cambiare ente all'interno di Perseo Sirio, o cambiare profilo, non tocca la posizione."),
 (7,"chiaro",0,'Due: se lasci il pubblico impiego puoi riscattare, trasferire o mantenere la posizione. Senza scadenze per decidere.'),
 (7,"chiaro",0,"Tre: il riscatto per una tua scelta paga il ventitre' per cento, e azzera gli anni di partecipazione."),
 (7,"chiaro",0,'Trasferire o mantenere, invece, non costa imposte e conserva gli anni, che contano per i requisiti e per il fisco.'),
 (7,"chiaro",0,'La mossa di oggi: sul sito del Fondo, nella sezione modulistica, individua il modulo di richiesta di liquidazione.'),
 (7,"chiaro",0,"Non ti serve ora. Ma sapere dov'e', e che cosa chiede, ti evitera' decisioni affrettate quando servira'."),
 (7,"chiaro",0,'E se un giorno stai per lasciare la PA, ricordati di questa lezione prima di firmare qualunque richiesta. Ne vale la pena.'),
 (7,"chiaro",0,'Nella prossima lezione approfondiamo una delle tre strade del bivio: il trasferimento della posizione ad altro fondo.'),
 (7,"chiaro",0,"Vedremo quando si puo' fare anche restando nella PA, che cosa si porta con se', e qual e' il suo costo nascosto."),
 (7,"chiaro",0,'E vedremo anche il percorso inverso: come portare in Perseo Sirio un vecchio fondo pensione, per esempio di un lavoro nel privato.'),
 (7,"chiaro",0,'[warm] Trasferire ad altro fondo. Ci vediamo nella lezione otto punto tre.'),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Apertura', 2: 'I cambi che non toccano nulla', 3: 'Il bivio', 4: 'Come scegliere', 5: 'E il TFR', 6: 'Memo', 7: 'Chiusura'}
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
