# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,'[warm] Prima o poi qualcuno te lo propone. In banca, in assicurazione, a volte persino al telefono: ha pensato alla sua pensione integrativa?'),
 (1,"chiaro",0,'E ti trovi davanti sigle e nomi che sembrano tutti uguali: fondo, piano, polizza, linea, comparto. Non lo sono.'),
 (1,"chiaro",0,"In questa lezione mettiamo ordine. Esistono tre famiglie di forme pensionistiche complementari, e per un lavoratore pubblico la differenza tra l'una e l'altra puo' valere migliaia di euro."),

 (2,"chiaro",0,'Le tre famiglie sono queste. I fondi negoziali, chiamati anche chiusi o contrattuali. I fondi aperti. E i PIP, i piani individuali pensionistici.'),
 (2,"chiaro",0,"Tutti e tre sono controllati dalla stessa autorita', la COVIP, la Commissione di vigilanza sui fondi pensione. E tutti e tre godono degli stessi vantaggi fiscali previsti dalla legge."),
 (2,"chiaro",0,"Ma sono costruiti in modo molto diverso: chi li crea, chi puo' entrare, chi li governa, quanto costano. Vediamoli uno alla volta."),

 (3,"chiaro",0,"In Italia le forme pensionistiche complementari sono alcune centinaia. Ma ognuna rientra in una di queste tre famiglie, e sapere la famiglia dice gia' molto di come funziona."),
 (3,"chiaro",0,"Il fondo negoziale nasce da un accordo tra le parti sociali: da una parte i rappresentanti dei datori di lavoro, dall'altra i sindacati."),
 (3,"chiaro",0,"E' riservato ai lavoratori di una categoria precisa, quella coperta dal contratto. Non e' in vendita: non lo trovi allo sportello, e nessuno guadagna una provvigione se aderisci."),
 (3,"chiaro",0,'Non ha scopo di lucro: non deve fare utili per qualcuno. I suoi costi sono solo quelli che servono a farlo funzionare, e si dividono su moltissimi iscritti.'),
 (3,"chiaro",0,"E' governato in modo paritetico: meta' dai rappresentanti dei lavoratori, meta' da quelli dei datori. E i lavoratori eleggono i propri delegati."),
 (3,"chiaro",0,"[serious] Perseo Sirio e' esattamente questo: il fondo negoziale dei lavoratori della pubblica amministrazione e della sanita'."),

 (4,"chiaro",0,"Il fondo aperto e' istituito da banche, societa' di gestione del risparmio, compagnie di assicurazione. Puo' aderire chiunque, anche individualmente, a prescindere dal lavoro che fa."),
 (4,"chiaro",0,"Nel fondo aperto le adesioni possono essere anche collettive: un'azienda privata puo' sceglierlo per i suoi dipendenti. Ma per la pubblica amministrazione la strada prevista dal contratto e' un'altra."),
 (4,"chiaro",0,"Il PIP, il piano individuale pensionistico, e' costruito come un contratto di assicurazione sulla vita. Lo sottoscrivi tu, con un intermediario, di solito un agente o uno sportello bancario."),
 (4,"chiaro",0,"Dentro un PIP i soldi possono andare in una gestione separata, piu' prudente, oppure in fondi interni, piu' esposti ai mercati. Spesso c'e' un mix delle due."),
 (4,"chiaro",0,"Con un PIP non c'e' un'assemblea, ne' delegati da eleggere: il rapporto e' un contratto tra te e la compagnia, e le regole sono quelle scritte nel contratto."),
 (4,"chiaro",0,"Fondi aperti e PIP sono prodotti commerciali, legittimi e vigilati. Ma sono proposti da soggetti che hanno anche l'obiettivo di guadagnare. E questo, di solito, si vede nei costi."),

 (5,"chiaro",0,'Ed ecco il punto che riguarda davvero chi lavora nel pubblico. Il contributo del datore di lavoro, quello che il contratto prevede in aggiunta al tuo, spetta solo a chi si iscrive al fondo negoziale della categoria.'),
 (5,"chiaro",0,"Lo dice chiaramente anche il Fondo: chi non si iscrive non ha diritto a quel contributo. Non c'e' un modo di portarlo altrove."),
 (5,"chiaro",0,'Lo stesso vale per il trattamento di fine rapporto. Per i dipendenti pubblici, la parte di TFR destinata alla previdenza complementare segue un meccanismo pensato per il fondo negoziale di categoria.'),
 (5,"chiaro",0,"Lo vedremo nel modulo due: e' quello che si chiama accantonamento figurativo, gestito dall'INPS."),
 (5,"chiaro",0,"Quindi un dipendente pubblico puo' anche aprire un fondo aperto o un PIP, nessuno glielo vieta. Ma li' versa da solo, senza il contributo del suo ente."),

 (6,"chiaro",0,"Mettiamole a confronto. Il negoziale e' promosso dalle parti sociali, non ha scopo di lucro, prevede il contributo dell'ente e in genere ha i costi piu' bassi."),
 (6,"chiaro",0,"Il fondo aperto e il PIP sono offerti da intermediari finanziari, non prevedono il contributo del tuo ente, e in genere costano di piu'. I PIP sono spesso in cima alla classifica dei costi."),
 (6,"chiaro",0,"I costi sembrano piccoli: frazioni di punto percentuale all'anno. Ma su trent'anni pesano moltissimo, perche' si mangiano anche i rendimenti che quei soldi avrebbero prodotto."),
 (6,"chiaro",0,"Per dare un'idea: su un versamento costante di trent'anni, mezzo punto di costi in piu' ogni anno puo' portarsi via una fetta importante del capitale finale."),
 (6,"chiaro",0,"Per confrontarli c'e' uno strumento semplice. Ogni forma pensionistica deve indicare l'indicatore sintetico dei costi, che riassume tutte le spese in un solo numero."),
 (6,"chiaro",0,"E la COVIP pubblica sul suo sito un comparatore dei costi, che mette tutte le forme una accanto all'altra. Lo useremo con calma nel modulo sette."),

 (7,"chiaro",0,"Questo non significa che fondi aperti e PIP siano da evitare in assoluto. Possono servire a chi non ha un fondo di categoria, o a chi vuole versare qualcosa in piu', dopo aver usato il proprio."),
 (7,"chiaro",0,'Significa che, per un dipendente pubblico, ha senso valutarli dopo aver usato il fondo del proprio contratto, non al posto suo.'),
 (7,"chiaro",0,'E che, prima di firmare qualunque cosa, conviene sempre fare due domande. Quanto costa? E chi ci aggiunge qualcosa oltre a me?'),
 (7,"chiaro",0,"Se chi ti propone il prodotto non sa rispondere con un numero, o cambia discorso, hai gia' una prima risposta."),

 (8,"profondo",1.2,"Il contributo dell'ente ha un solo indirizzo: il fondo del tuo contratto."),

 (9,"chiaro",0,'Le tre cose da ricordare. Uno: esistono fondi negoziali, fondi aperti e PIP, tutti vigilati dalla COVIP.'),
 (9,"chiaro",0,"Due: il fondo negoziale nasce dal contratto, non ha scopo di lucro ed e' governato da lavoratori e datori insieme."),
 (9,"chiaro",0,"Tre: il contributo dell'amministrazione arriva solo se aderisci al fondo negoziale della tua categoria."),
 (9,"chiaro",0,'La mossa di oggi: apri il tuo ultimo cedolino e cerca una voce con la parola Perseo, oppure previdenza complementare.'),
 (9,"chiaro",0,"Se c'e', sei gia' iscritto. Se non c'e', il resto del corso ti servira' per decidere."),
 (9,"chiaro",0,"[warm] Nella prossima lezione: chi e', esattamente, Perseo Sirio."),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Apertura', 2: 'Tre porte', 3: 'Il fondo negoziale', 4: 'Aperto e PIP', 5: 'Il bivio', 6: 'Il confronto', 7: 'Non da evitare', 8: 'Memo', 9: 'Chiusura'}
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
