# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Il cateterismo vescicale e' una delle procedure che l'infermiere esegue piu' spesso, ed e' anche una delle principali cause di infezione correlata all'assistenza."),
 (1,"chiaro",0,"Il punto di questa lezione e' rovesciare una prospettiva: il catetere non e' un comfort per chi assiste. E' un dispositivo invasivo con un rischio che cresce ogni giorno che resta in sede."),
 (1,"profondo",1.2,"[serious] La domanda piu' importante non e' come lo metto, ma: serve davvero? E' la domanda da farsi prima di aprire il kit, e ogni giorno dopo."),

 (2,"chiaro",0,"Prima l'osservazione. Delle urine si valutano colore, limpidezza, odore e peso specifico, normalmente fra milledieci e milleventicinque."),
 (2,"chiaro",0,"E il vocabolario delle alterazioni, che i quiz chiedono per definizione: disuria, minzione dolorosa; pollachiuria, minzioni frequenti di piccolo volume; nicturia, bisogno di urinare di notte."),
 (2,"chiaro",0,"Stranguria, minzione lenta e dolorosa goccia a goccia; urgenza; ematuria, sangue; piuria, pus. Sette parole, sette definizioni secche: valgono una domanda ciascuna."),

 (3,"chiaro",0,"La ritenzione urinaria: la vescica si riempie ma non si svuota. Si manifesta con il globo vescicale, palpabile e dolente sopra il pube, irrequietezza, a volte minzioni frequenti di piccolo volume per rigurgito."),
 (3,"chiaro",0,"E queste ingannano, perche' sembrano incontinenza. Le cause: ipertrofia prostatica, farmaci anticolinergici e oppioidi, anestesia spinale, post-operatorio, e un classico dell'anziano: il fecaloma."),
 (3,"chiaro",0,"Lo strumento di valutazione e' il bladder scanner, l'ecografia vescicale, che misura il residuo: oltre i centocinquanta-duecento millilitri, secondo procedura, il residuo e' significativo."),

 (4,"chiaro",0,"L'incontinenza non e' una sola. Da sforzo: perdita con tosse, starnuto, sollevamento, per debolezza del pavimento pelvico. Da urgenza: stimolo improvviso e impellente che non si riesce a trattenere. Mista."),
 (4,"chiaro",0,"Da rigurgito: la vescica e' piena e trabocca, e' una ritenzione travestita da incontinenza. Funzionale: il sistema urinario funziona, ma la persona non riesce ad arrivare in bagno in tempo, per limiti motori o cognitivi."),

 (5,"chiaro",0,"E la conseguenza piu' importante. Il catetere vescicale non e' una gestione dell'incontinenza. Gli interventi corretti sono altri: minzione programmata a orari fissi, minzione sollecitata, cioe' chiedere e accompagnare."),
 (5,"chiaro",0,"Bladder training, riabilitazione del pavimento pelvico, ausili assorbenti della misura giusta, e nell'incontinenza funzionale rendere raggiungibile il bagno: comoda vicino al letto, campanello, abiti facili da togliere."),
 (5,"profondo",1.2,"[serious] Mettere un catetere a chi e' incontinente per comodita' e' una delle cause evitabili di infezione piu' diffuse. Non e' una gestione: e' un rischio in piu'."),

 (6,"chiaro",0,"Quando il catetere e' appropriato. Ritenzione acuta o ostruzione. Monitoraggio accurato della diuresi nel paziente critico. Interventi chirurgici prolungati o urologici, per il tempo strettamente necessario."),
 (6,"chiaro",0,"Lesioni sacrali o perineali in persona incontinente, per favorirne la guarigione. Comfort nel fine vita, se la persona lo desidera. Tutto il resto va messo in discussione, e di solito non regge."),

 (7,"chiaro",0,"Il primo fattore di rischio delle CAUTI, le infezioni urinarie associate a catetere, e' la durata. Il rischio di batteriuria cresce di alcuni punti percentuali per ogni giorno di permanenza."),
 (7,"chiaro",0,"Ne discende l'intervento piu' efficace di tutti: chiedersi ogni giorno se il catetere serve ancora, e rimuoverlo appena possibile. Molte aziende prevedono promemoria o protocolli di rimozione a gestione infermieristica."),
 (7,"tenue",0,"Un catetere che non serve piu' non e' neutro: e' un dispositivo che sta facendo danno in silenzio. Il giorno in cui lo togli e' il giorno in cui il rischio smette di crescere."),

 (8,"chiaro",0,"Il presidio. Calibro piu' piccolo possibile che garantisca il drenaggio: nell'adulto di norma dodici-quattordici Charriere. Un calibro grande traumatizza l'uretra e aumenta il rischio infettivo."),
 (8,"chiaro",0,"Lattice per il breve termine, con attenzione alle allergie; silicone per il lungo termine. Foley a due vie per il drenaggio, a tre vie per l'irrigazione continua, per esempio nell'ematuria con coaguli."),
 (8,"chiaro",0,"Il palloncino si riempie con acqua sterile, nel volume indicato dal produttore: non fisiologica, che puo' cristallizzare, e non aria, che galleggia."),

 (9,"chiaro",0,"La tecnica si regge su pochi principi. Asepsi: il cateterismo e' una procedura sterile. Operatore formato. Lubrificante sterile, preferibilmente con anestetico locale."),
 (9,"chiaro",0,"Non gonfiare il palloncino finche' non si vede defluire urina: gonfiarlo in uretra provoca lesioni gravi. E raccordare subito il catetere al sistema di drenaggio chiuso, idealmente gia' preconnesso."),

 (10,"chiaro",0,"Nella donna: si divaricano le labbra, si deterge il meato dall'alto verso il basso con una garza per passaggio, e si introduce il catetere."),
 (10,"chiaro",0,"Un dettaglio che vale una domanda: se per errore il catetere entra in vagina, non lo si estrae per ritentare. Lo si lascia in sede come riferimento anatomico e si usa un catetere nuovo sterile. Il primo e' contaminato."),

 (11,"chiaro",0,"Nell'uomo: si retrae il prepuzio, si deterge il glande, si instilla il lubrificante in uretra e si attende che l'anestetico agisca. Il pene si tiene a sessanta-novanta gradi rispetto all'addome per raddrizzare l'uretra."),
 (11,"chiaro",0,"Poi lo si abbassa per superare la curva. Si inserisce fino alla biforcazione del catetere prima di gonfiare, per essere certi che il palloncino sia in vescica."),
 (11,"chiaro",0,"E al termine, lo ripeto, perche' e' lo stesso errore visto nell'igiene: si riposiziona il prepuzio, per evitare la parafimosi. Un catetere ben messo con il prepuzio retratto e' un lavoro a meta'."),

 (12,"chiaro",0,"La gestione del circuito chiuso, cuore della prevenzione. Mai scollegare catetere e sacca: ogni apertura e' una porta d'ingresso. La sacca sempre sotto il livello della vescica, per evitare il reflusso."),
 (12,"chiaro",0,"Ma mai appoggiata a terra. Tubo senza pieghe ne' anse declivi. Svuotare quando e' piena per due terzi, con un contenitore pulito dedicato per ciascun paziente, senza che il rubinetto tocchi il contenitore."),
 (12,"chiaro",0,"E igiene delle mani e guanti a ogni manipolazione. Il circuito chiuso e' chiuso finche' nessuno lo apre: la maggior parte delle aperture non e' necessaria."),

 (13,"chiaro",0,"L'igiene del meato si fa ogni giorno con acqua e sapone, durante l'igiene intima: l'uso routinario di antisettici non riduce le infezioni."),
 (13,"chiaro",0,"Il campione di urine si preleva dal punto di prelievo dedicato, dopo averlo disinfettato, con siringa sterile. Mai dalla sacca, dove l'urina ristagna e si contamina."),
 (13,"chiaro",0,"E una nota: la batteriuria asintomatica nel paziente cateterizzato e' frequentissima e non va trattata; l'urinocoltura si fa se ci sono sintomi, non per abitudine."),

 (14,"chiaro",0,"Tutto questo si riassume nel bundle di prevenzione delle CAUTI. Indicazione appropriata. Inserimento asettico da personale formato. Sistema chiuso mai interrotto."),
 (14,"chiaro",0,"Sacca sotto il livello della vescica. Rivalutazione quotidiana della necessita' e rimozione precoce. Igiene delle mani. Sei misure, da applicare insieme: il bundle funziona come pacchetto, non a pezzi."),

 (15,"chiaro",0,"Due regole che smontano abitudini diffuse. Il catetere non si sostituisce a intervalli fissi di routine: si sostituisce per ostruzione, infezione, malfunzionamento, o secondo le indicazioni del produttore."),
 (15,"chiaro",0,"E l'irrigazione vescicale non e' una misura di prevenzione: si fa solo se indicata, con catetere a tre vie, a circuito chiuso. Lavare per abitudine significa aprire il circuito per abitudine."),

 (16,"chiaro",0,"La rimozione. Si sgonfia il palloncino aspirando con una siringa, lasciando che l'acqua esca passivamente. Mai tagliare la valvola, perche' il palloncino potrebbe non sgonfiarsi del tutto."),
 (16,"chiaro",0,"Si rimuove delicatamente. E poi si sorveglia la ripresa della minzione, di norma entro sei-otto ore: se la persona non urina, si valuta il globo con il bladder scanner prima di pensare a un nuovo catetere."),

 (17,"chiaro",0,"E le alternative al catetere a permanenza. Il cateterismo intermittente, che e' lo standard nella ritenzione cronica e nella vescica neurologica, anche in autocateterismo pulito a domicilio."),
 (17,"chiaro",0,"Il catetere esterno, tipo condom, nell'uomo incontinente senza ritenzione. Il catetere sovrapubico, nei cateterismi a lungo termine selezionati. Tutte hanno un rischio infettivo inferiore al catetere uretrale a permanenza."),

 (18,"chiaro",0,"Nelle aziende del servizio sanitario veneto il cateterismo e' regolato da procedure aziendali che recepiscono il bundle: in cartella si registrano data di inserimento, calibro e motivazione, e la rivalutazione quotidiana."),
 (18,"chiaro",0,"Le CAUTI rientrano nella sorveglianza delle infezioni correlate all'assistenza, che vedremo nel modulo quattro. All'orale, registro la motivazione e rivaluto ogni giorno e' la frase che mostra una cultura della prevenzione."),

 (19,"chiaro",0,"Ricapitoliamo. Il catetere non e' una gestione dell'incontinenza. Il primo fattore di rischio e' la durata: si rivaluta ogni giorno e si toglie appena possibile. Calibro minimo, tecnica sterile, palloncino solo dopo l'urina."),
 (19,"chiaro",0,"Circuito chiuso, sacca sotto la vescica e mai a terra, campione dal punto dedicato e mai dalla sacca. Niente sostituzione di routine, niente antisettici di routine, niente terapia della batteriuria asintomatica."),
 (19,"chiaro",0,"[warm] E, sempre, riposizionare il prepuzio. Sette regole, e la prima le vale tutte: il catetere si toglie appena possibile. Nella prossima lezione: eliminazione intestinale, dolore e sonno. A tra poco."),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1:"Apertura",2:"Le urine",3:"La ritenzione",4:"L'incontinenza",5:"Il catetere non e' una gestione",
 6:"Le indicazioni appropriate",7:"La durata",8:"Il presidio",9:"La tecnica",10:"Nella donna",11:"Nell'uomo",
 12:"Il circuito chiuso",13:"Igiene e campioni",14:"Il bundle CAUTI",15:"Sostituzione e irrigazione",
 16:"La rimozione",17:"Le alternative",18:"In Veneto",19:"Chiusura"}
# Deroghe al limite di 225 caratteri, dichiarate una per una con il motivo:
# la voce e' gia' generata e non ha fatto pausa dove il copione staccava, e il
# confine si mette dove la voce si ferma, non dove il copione vorrebbe.
DEROGHE = {}
ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1:"Apertura",2:"Il principio guida",3:"Indicazioni e controindicazioni",4:"Le vie di accesso",
 5:"Stomaco si', digiuno no",6:"Quando non si procede",7:"Il metodo NEX",8:"Il passaggio faringeo",
 9:"Quando interrompere",10:"La verifica",11:"Verificare sempre",12:"Le modalita'",13:"Le regole di sicurezza",
 14:"I farmaci per sonda",15:"Se non si puo' frantumare",16:"Le complicanze",17:"La sindrome da rialimentazione",
 18:"PEG: la gestione",19:"Se la PEG si sfila",20:"La volonta' della persona"}
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
