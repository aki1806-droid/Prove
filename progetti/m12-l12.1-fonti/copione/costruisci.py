# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Apriamo il modulo che chiede di cambiare prospettiva: non piu' il letto del paziente, ma il sistema in cui lavoriamo. Nei concorsi pubblici questa parte non manca mai."),
 (1,"chiaro",0,"E premia chi sa collegare una norma al suo anno e al suo contenuto. Cominciamo dalle fondamenta: le fonti del diritto, l'articolo trentadue della Costituzione, e la legge che ha istituito il Servizio Sanitario Nazionale."),

 (2,"chiaro",0,"La gerarchia delle fonti. Al vertice la Costituzione, con le leggi costituzionali. Poi le fonti dell'Unione europea, regolamenti e direttive, che prevalgono sulle leggi nazionali nelle materie di competenza europea."),
 (2,"chiaro",0,"Poi le leggi ordinarie dello Stato e gli atti con forza di legge. Il decreto legislativo e' emanato dal Governo su delega del Parlamento."),
 (2,"chiaro",0,"Il decreto-legge, invece, e' emanato dal Governo in casi di necessita' e urgenza, e va convertito in legge entro sessanta giorni."),
 (2,"chiaro",0,"Sotto, le leggi regionali, nelle materie di competenza delle Regioni. Poi i regolamenti: per esempio i decreti del Presidente della Repubblica e i decreti ministeriali."),
 (2,"chiaro",0,"E infine gli atti amministrativi, come le delibere della Giunta regionale e le delibere aziendali. Sono l'ultimo gradino, quello piu' vicino al lavoro di tutti i giorni."),
 (2,"profondo",1.2,"[serious] Una fonte inferiore non puo' contraddire una superiore."),

 (3,"chiaro",0,"L'articolo trentadue della Costituzione, da conoscere quasi a memoria. Primo comma: la Repubblica tutela la salute come fondamentale diritto dell'individuo e interesse della collettivita'."),
 (3,"chiaro",0,"E garantisce cure gratuite agli indigenti. Attenzione a un dettaglio: e' l'unico diritto che la Costituzione definisce espressamente fondamentale."),
 (3,"chiaro",0,"Secondo comma: nessuno puo' essere obbligato a un determinato trattamento sanitario se non per disposizione di legge. E la legge non puo' in nessun caso violare i limiti imposti dal rispetto della persona umana."),
 (3,"chiaro",0,"Da qui derivano due cose: il principio del consenso informato, e la possibilita', eccezionale, dei trattamenti sanitari obbligatori."),

 (4,"chiaro",0,"[thoughtful] L'articolo trentadue contiene due anime, che a volte si tengono in equilibrio: la salute come diritto individuale, e la salute come interesse della collettivita'."),
 (4,"chiaro",0,"Come diritto individuale, la persona e' libera di scegliere e anche di rifiutare le cure. Lo abbiamo visto con la legge duecentodiciannove del duemiladiciassette, nella lezione uno punto sei."),
 (4,"chiaro",0,"Come interesse della collettivita', in casi eccezionali una legge puo' imporre un trattamento: il TSO della lezione undici punto tre, o le vaccinazioni obbligatorie."),
 (4,"profondo",1.2,"[serious] Si chiama riserva di legge: nessun atto diverso da una legge puo' imporre un trattamento sanitario."),

 (5,"chiaro",0,"Altri articoli si collegano alla sanita'. L'articolo due, sui diritti inviolabili e i doveri di solidarieta'. L'articolo tre, sull'uguaglianza, formale e sostanziale."),
 (5,"chiaro",0,"L'articolo tredici, sulla liberta' personale inviolabile, che ritroviamo nella contenzione. E l'articolo centodiciassette, sul riparto delle competenze fra Stato e Regioni."),
 (5,"chiaro",0,"L'articolo novantasette, sul buon andamento e l'imparzialita' della pubblica amministrazione. Stabilisce anche che agli impieghi pubblici si accede mediante concorso: proprio la prova che stai preparando."),

 (6,"chiaro",0,"Il riparto delle competenze fra Stato e Regioni e' stato ridisegnato dalla riforma del Titolo quinto della Costituzione, con la legge costituzionale numero tre del duemilauno."),
 (6,"chiaro",0,"La tutela della salute e' materia di legislazione concorrente: lo Stato fissa i principi fondamentali, le Regioni legiferano nel dettaglio e organizzano i servizi."),
 (6,"chiaro",0,"Ma allo Stato spetta in via esclusiva la determinazione dei livelli essenziali delle prestazioni, quelli che in sanita' si chiamano LEA, da garantire in modo uniforme su tutto il territorio."),
 (6,"chiaro",0,"La sede in cui Stato e Regioni si accordano e' la Conferenza Stato-Regioni. Per questo la sanita' veneta, che studieremo nel modulo tredici, ha regole proprie dentro una cornice nazionale."),

 (7,"chiaro",0,"Per capire la riforma, si guarda a com'era prima. Fino al millenovecentosettantotto in Italia c'era un sistema mutualistico: l'assistenza dipendeva dalla categoria lavorativa e dai contributi versati."),
 (7,"chiaro",0,"Numerosi enti mutualistici, con prestazioni diverse. Ne derivavano disuguaglianze e persone escluse, oltre a una crisi finanziaria degli enti. Il millenovecentosettantotto e' l'anno della svolta."),

 (8,"chiaro",0,"La legge ottocentotrentatre' del ventitre' dicembre millenovecentosettantotto istituisce il Servizio Sanitario Nazionale. Con tre principi, da dire sempre insieme."),
 (8,"chiaro",0,"Universalita': il servizio e' rivolto a tutta la popolazione, non a categorie. Uguaglianza: a parita' di bisogno, parita' di accesso, senza distinzioni di condizioni individuali o sociali."),
 (8,"chiaro",0,"Globalita': il servizio si occupa di prevenzione, di cura e di riabilitazione, non solo della malattia. Universalita', uguaglianza, globalita': sempre tutti e tre."),
 (8,"chiaro",0,"Il finanziamento non passa piu' dai contributi delle categorie, ma dalla fiscalita' generale. E l'organizzazione si basa sulle Unita' Sanitarie Locali."),
 (8,"chiaro",0,"E agli articoli dal trentatre' al trentacinque ci sono gli accertamenti e i trattamenti sanitari volontari e obbligatori, che hai visto nella lezione undici punto tre."),

 (9,"chiaro",0,"La legge elenca obiettivi ancora attuali: la formazione di una coscienza sanitaria nella popolazione, la prevenzione delle malattie e degli infortuni, la diagnosi e cura, la riabilitazione."),
 (9,"chiaro",0,"La salute nei luoghi di lavoro, l'igiene degli alimenti, la salute mentale, la tutela materno-infantile e degli anziani, la partecipazione dei cittadini. Molti temi di questo corso hanno qui la loro radice."),

 (10,"chiaro",0,"Oggi il Servizio Sanitario Nazionale si articola nei servizi sanitari regionali. In Veneto la scelta caratteristica e' l'integrazione fra sanitario e sociale: il Servizio Socio Sanitario Regionale."),
 (10,"chiaro",0,"Per questo le aziende si chiamano ULSS, Unita' Locali Socio Sanitarie, con la esse di socio. All'orale ricordarlo dimostra conoscenza del contesto in cui lavorerai. Lo approfondiamo nel modulo tredici."),

 (11,"chiaro",0,"[curious] Una domanda d'orale tipica: quale articolo della Costituzione tutela la salute, e che cosa stabilisce in materia di trattamenti sanitari obbligatori?"),
 (11,"chiaro",0,"La risposta completa. E' l'articolo trentadue, che tutela la salute come diritto fondamentale dell'individuo e interesse della collettivita', e garantisce cure gratuite agli indigenti."),
 (11,"chiaro",0,"Al secondo comma prevede che nessuno possa essere obbligato a un trattamento se non per legge, e sempre nel rispetto della persona umana."),
 (11,"chiaro",0,"Poi un collegamento: il TSO della legge ottocentotrentatre', e il consenso della legge duecentodiciannove. Una risposta cosi' dimostra che sai collegare la norma alla pratica."),

 (12,"chiaro",0,"Una parte pratica: come si leggono le sigle. Elle e' legge. Di elle gi esse, decreto legislativo. Di elle, decreto-legge. Di pi erre, decreto del Presidente della Repubblica."),
 (12,"chiaro",0,"Di emme, decreto ministeriale. Di pi ci emme, decreto del Presidente del Consiglio dei Ministri. Elle erre, legge regionale. Di gi erre, deliberazione della Giunta regionale. Numero e anno identificano l'atto."),

 (13,"chiaro",0,"Il metodo per tutto il modulo, da usare anche nel quaderno: una tabella a tre colonne, fonte, contenuto, anno. Costituzione, articolo trentadue: diritto alla salute, in vigore dal millenovecentoquarantotto."),
 (13,"chiaro",0,"Legge costituzionale tre: Titolo quinto, salute materia concorrente, duemilauno. Legge ottocentotrentatre': istituzione del Servizio Sanitario Nazionale, millenovecentosettantotto."),

 (14,"chiaro",0,"In Veneto l'autonomia del Titolo quinto si e' tradotta in un modello proprio, con una forte integrazione socio-sanitaria e la legge regionale diciannove del duemilasedici, che ha istituito Azienda Zero."),

 (15,"chiaro",0,"La tabella. La gerarchia delle fonti: Costituzione, Unione europea, leggi e atti con forza di legge, leggi regionali, regolamenti, atti amministrativi."),
 (15,"chiaro",0,"Articolo trentadue: diritto fondamentale e interesse collettivo, cure gratuite agli indigenti, trattamenti obbligatori solo per legge, nel rispetto della persona."),
 (15,"chiaro",0,"Titolo quinto del duemilauno: salute materia concorrente, LEA di competenza esclusiva dello Stato. Legge ottocentotrentatre' del millenovecentosettantotto: un servizio universale, uguale, globale."),

 (16,"chiaro",0,"[warm] Nella prossima lezione vediamo come il Servizio Sanitario Nazionale e' cambiato con le riforme degli anni Novanta: l'aziendalizzazione."),
 (16,"chiaro",0,"E che cosa sono i LEA, i livelli essenziali di assistenza, che oggi abbiamo incontrato come competenza esclusiva dello Stato. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"La gerarchia delle fonti",3:"L'articolo 32",4:"Le due anime dell'articolo 32",5:"Gli altri articoli",6:"Il riparto Stato-Regioni",
 7:"Prima del SSN",8:"La legge 833/1978",9:"Gli obiettivi della 833",10:"Il SSN e il Servizio Socio Sanitario veneto",11:"Il caso d'esame",
 12:"Le sigle normative",13:"Il metodo per ricordare",14:"In Veneto",15:"La tabella",16:"Chiusura"}

# Deroghe al limite di 225 caratteri, dichiarate una per una con il motivo:
# la voce e' gia' generata e non ha fatto pausa dove il copione staccava, e il
# confine si mette dove la voce si ferma, non dove il copione vorrebbe.
DEROGHE = {}
ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CPS = 17.0   # misurata su 1.2, confermata da 1.3 a 1.8

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
    if len(b["text"])>225 and b["id"] not in DEROGHE: errori.append(f'{b["id"]}: {len(b["text"])} car, blocco troppo lungo')
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
