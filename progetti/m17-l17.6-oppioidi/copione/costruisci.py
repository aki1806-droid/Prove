# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Questo caso parla di un paziente che molti operatori, ancora oggi, guardano con diffidenza: una persona con una dipendenza da oppioidi, in terapia sostitutiva con il metadone, ricoverata per un altro problema."),
 (1,"chiaro",0,"Vedremo come riconoscere l'astinenza, perche' la terapia sostitutiva non si interrompe, come si tratta il dolore in un paziente tollerante agli oppioidi, e come si superano i pregiudizi."),
 (1,"chiaro",0,"Collegamenti con le lezioni tre punto sette, cinque punto quattro, cinque punto sei, cinque punto sette e undici punto tre."),

 (2,"chiaro",0,"Lo scenario. Stefano, quarantuno anni, e' in terapia con metadone presso il SerD da tre anni, con una buona stabilita'. Viene ricoverato sabato sera in chirurgia, per un ascesso del braccio da drenare."),
 (2,"chiaro",0,"L'ascesso e' legato a un pregresso uso di sostanze per via endovenosa. All'ingresso nessuno ha verificato la terapia con metadone. Domenica alle tre presenta sbadigli continui, sudorazione, lacrimazione."),
 (2,"chiaro",0,"E poi naso che cola, pupille dilatate, pelle d'oca, crampi, diarrea, agitazione. Un collega commenta: sta solo cercando farmaci. Fermati: che cosa sta succedendo, e che cosa rispondi al collega?"),

 (3,"chiaro",0,"Il ragionamento. Stefano e' in terapia con metadone, e la dose non e' stata somministrata dal giorno prima: e' una sindrome da astinenza da oppioidi. I segni oggettivi sono inequivocabili."),
 (3,"chiaro",0,"Pupille dilatate, sudorazione, lacrimazione, naso che cola, pelle d'oca, sbadigli, diarrea, tachicardia. Poi i sintomi soggettivi: ansia, crampi, dolori ossei e muscolari, il desiderio intenso della sostanza."),
 (3,"chiaro",0,"Al collega rispondi che non e' una ricerca di farmaci: e' una condizione clinica, causata dall'interruzione di una terapia prescritta. Il metadone, per Stefano, e' un farmaco come l'insulina per un diabetico."),

 (4,"chiaro",0,"Le azioni. Rilevi i parametri, valuti l'astinenza con una scala, come la COWS, e avvisi il medico di guardia. Poi verifichi la dose: la documentazione del SerD, il piano terapeutico, il servizio di riferimento."),
 (4,"chiaro",0,"Anche attraverso la reperibilita' nei giorni festivi. E soprattutto l'ultima dose assunta e il suo orario, per evitare sia la mancata somministrazione sia la doppia dose."),
 (4,"chiaro",0,"Poi la terapia sostitutiva continua secondo prescrizione, con il registro degli stupefacenti della lezione cinque punto sette. Idratazione, sintomatici, e rassicurazione: Stefano ha paura di non essere creduto."),

 (5,"chiaro",0,"[serious] Perche' la terapia sostitutiva non si interrompe? Interromperla provoca astinenza e sofferenza, e spesso porta ad abbandonare le cure, con le dimissioni contro il parere medico, o a procurarsi sostanze in ospedale."),
 (5,"chiaro",0,"La dose abituale serve a prevenire l'astinenza, non a trattare il dolore acuto. Il ricovero e' un'occasione di cura, non di disintossicazione forzata. Le modifiche, solo con il medico e con il SerD."),

 (6,"chiaro",0,"Dopo il drenaggio Stefano ha un dolore di otto su dieci. Ed ecco il secondo errore frequente: pensare che il metadone copra anche il dolore. La dose abituale non copre il dolore acuto."),
 (6,"chiaro",0,"Anzi, per la tolleranza possono servire dosi di analgesici oppioidi piu' alte del solito, secondo prescrizione, con un'analgesia multimodale: paracetamolo, FANS se non controindicati, anestesia locale o loco-regionale."),
 (6,"chiaro",0,"Si valuta e si rivaluta con la scala, si sorvegliano sedazione e respiro. E il dolore riferito va creduto, come per qualunque altro paziente: e' il principio della lezione tre punto sette."),

 (7,"chiaro",0,"La sicurezza. Il metadone puo' allungare l'intervallo QT: ECG secondo indicazione, e attenzione ai farmaci che lo allungano. Alcuni antibiotici, antimicotici e altri farmaci ne modificano i livelli nel sangue."),
 (7,"chiaro",0,"E' un'interazione da segnalare al medico, perche' Stefano ricevera' antibiotici per l'ascesso. Con benzodiazepine, alcol o altri sedativi cresce il rischio di depressione respiratoria: il naloxone deve essere disponibile."),
 (7,"chiaro",0,"E si evita la doppia dose, che e' un errore reale nei passaggi fra SerD e ospedale: una registrazione puntuale e chiara di chi ha somministrato, quanto e quando."),

 (8,"chiaro",0,"Un approfondimento: astinenza e overdose sono quadri opposti. Nell'astinenza le pupille sono dilatate; la persona suda, lacrima, ha il naso che cola, sbadiglia, ha la pelle d'oca e la diarrea, e' agitata e tachicardica."),
 (8,"chiaro",0,"Una sofferenza intensa, ma raramente pericolosa per la vita in un adulto. Nell'overdose le pupille sono puntiformi, la sedazione e' profonda, il respiro rallenta fino all'apnea, compare la cianosi."),
 (8,"chiaro",0,"E' un'emergenza: si stimola, si ventila, si somministra il naloxone e si chiama aiuto. E il naloxone dura meno degli oppioidi: dopo il risveglio, il paziente puo' riaddormentarsi."),

 (9,"chiaro",0,"La salute oltre la dipendenza. L'ascesso, da un pregresso uso endovenoso, richiede la cura della ferita e l'antibiotico."),
 (9,"chiaro",0,"Il ricovero e' un'occasione per offrire, con il consenso, i test per HIV ed epatiti B e C, e le vaccinazioni, come quella contro l'epatite B. Si applicano i principi della riduzione del danno."),
 (9,"chiaro",0,"Il patrimonio venoso e' spesso compromesso: gli accessi possono richiedere l'ecografo, come nella lezione sei punto uno. E si considerano la salute mentale e la situazione sociale."),

 (10,"chiaro",0,"[thoughtful] Il pregiudizio. Lo stigma verso chi ha una dipendenza e' frequente anche fra i professionisti, e ha conseguenze concrete: dolore non trattato, astinenze non riconosciute, abbandono delle cure."),
 (10,"chiaro",0,"Comincia dal linguaggio: si dice persona con un disturbo da uso di oppioidi, non tossico. Il Codice deontologico chiede rispetto e non discriminazione."),
 (10,"chiaro",0,"E al collega che dice sta solo cercando farmaci si risponde con i fatti clinici: midriasi, sudorazione, dose non somministrata. Non con un altro giudizio."),

 (11,"chiaro",0,"La dimissione e la continuita' con il SerD. Si comunicano il ricovero, la dose somministrata in ospedale e l'orario dell'ultima dose, per evitare sospensioni o doppie dosi nel passaggio."),
 (11,"chiaro",0,"Si segnalano le terapie nuove, come antibiotici e analgesici, per le possibili interazioni. Si informa sul rischio di overdose quando la tolleranza si riduce, per esempio dopo un periodo senza assunzione."),
 (11,"chiaro",0,"E sull'uso del naloxone, secondo le indicazioni locali. Infine si fissano gli appuntamenti di follow-up."),

 (12,"chiaro",0,"Gli errori. Non chiedere all'ingresso della terapia sostitutiva. Interrompere il metadone. Leggere l'astinenza come ricerca di farmaci. Pensare che il metadone copra il dolore acuto."),
 (12,"chiaro",0,"Sottotrattare il dolore per paura. Una doppia dose per mancata verifica. Trascurare le interazioni e il QT. Usare un linguaggio stigmatizzante."),

 (13,"chiaro",0,"[curious] Le domande d'orale. Prima: come si riconosce l'astinenza? Midriasi, sudorazione, lacrimazione, rinorrea, sbadigli, pelle d'oca, crampi, diarrea, tachicardia, ansia e agitazione, con scale dedicate."),
 (13,"chiaro",0,"Seconda: il dolore acuto nel paziente in metadone? Si continua la dose abituale, che previene l'astinenza, e si aggiunge un'analgesia multimodale, con oppioidi a dosi spesso piu' alte, sorvegliando sedazione e respiro."),
 (13,"chiaro",0,"Terza: astinenza e overdose? L'astinenza da' midriasi, agitazione, iperattivita' autonomica. L'overdose miosi, sedazione profonda e depressione respiratoria: un'emergenza, da trattare con il naloxone."),

 (14,"chiaro",0,"La risposta modello. Paziente in terapia con metadone, ricoverato per un ascesso, che dopo la mancata somministrazione della dose presenta midriasi, sudorazione, lacrimazione, rinorrea, sbadigli, crampi, diarrea e agitazione."),
 (14,"chiaro",0,"E' un'astinenza da oppioidi. Rilevo i parametri, valuto l'astinenza con una scala, avviso il medico, e verifico con il SerD dose e orario dell'ultima assunzione."),
 (14,"chiaro",0,"Somministro la terapia sostitutiva prescritta, registrandola ed evitando doppie dosi. Gestisco il dolore con analgesia multimodale, considerando la tolleranza e sorvegliando sedazione e respiro, con naloxone disponibile."),
 (14,"chiaro",0,"Segnalo interazioni e rischio di allungamento del QT. Mi relaziono senza giudizio. Offro, con il consenso, screening e vaccinazioni. E alla dimissione garantisco la continuita' con il SerD."),

 (15,"chiaro",0,"I collegamenti. Dolore e PCA con la tre punto sette. La riconciliazione con la cinque punto quattro. Oppioidi e naloxone con la cinque punto sei. Gli stupefacenti e il DPR trecentonove con la cinque punto sette."),
 (15,"chiaro",0,"Dipendenze e SerD con la undici punto tre. Gli accessi venosi difficili con la sei punto uno. E il Codice deontologico con la uno punto quattro."),

 (16,"chiaro",0,"E un ritorno all'origine del problema: la riconciliazione all'ingresso. La terapia con metadone non e' stata rilevata, perche' spesso non compare fra le terapie di casa: la dispensa il SerD."),
 (16,"chiaro",0,"All'ingresso si chiedono sempre i farmaci in corso, compresi quelli dispensati da servizi come il SerD, il Centro di Salute Mentale o gli ambulatori specialistici, e le terapie a lento rilascio."),
 (16,"chiaro",0,"La dose si verifica con una fonte documentata, e la prima somministrazione si pianifica anche nei giorni festivi. E' la Raccomandazione diciassette."),

 (17,"profondo",1.2,"[serious] La frase del caso: il metadone e' una terapia. Si verifica, si continua e si registra come ogni altro farmaco."),

 (18,"chiaro",0,"[warm] Nella prossima lezione usciamo dall'ospedale: un uomo con una malattia avanzata che ha scelto di essere curato a casa, una famiglia che lo assiste, e un'equipe di cure palliative domiciliari. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"Lo scenario",3:"Il ragionamento",4:"Le azioni",5:"Perche' la terapia sostitutiva non si interrompe",
 6:"Il dolore nel paziente in terapia con oppioidi",7:"La sicurezza: metadone e interazioni",8:"Astinenza e overdose a confronto",
 9:"La salute oltre la dipendenza",10:"Il pregiudizio",11:"La dimissione e la continuita' con il SerD",12:"Gli errori da evitare",
 13:"Le domande d'orale",14:"La risposta modello",15:"I collegamenti",16:"La riconciliazione all'ingresso",17:"La frase del caso",18:"Chiusura"}

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
