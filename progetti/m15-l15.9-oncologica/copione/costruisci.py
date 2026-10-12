# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Una paziente in chemioterapia con la febbre. E' uno dei casi in cui la rapidita' infermieristica salva la vita, e in cui la persona, oltre al corpo, porta con se' la paura."),
 (1,"chiaro",0,"Lo affrontiamo con le lezioni quattro punto tre sull'isolamento, sei punto due sui cateteri venosi centrali, sei punto sei sulla trasfusione, sei punto sette sulle emocolture e otto punto sette sull'oncologia."),

 (2,"chiaro",0,"Lo scenario. La signora Chiara ha cinquantaquattro anni e un carcinoma mammario in chemioterapia adiuvante, con un port-a-cath. L'ultimo ciclo e' stato nove giorni fa."),
 (2,"chiaro",0,"Alle venti arriva in pronto soccorso: febbre a trentotto virgola sette, brividi, e dice mi sento solo molto stanca. Pressione centododici su settanta, frequenza centotto, respiratoria diciotto, saturazione novantasette."),
 (2,"chiaro",0,"Ha due figli, di dodici e quindici anni. Fermati un momento: perche' il nove giorni fa e' il dato piu' importante della traccia?"),

 (3,"chiaro",0,"Il ragionamento. Nove giorni dopo la chemioterapia siamo nel nadir: il periodo fra il settimo e il quattordicesimo giorno in cui i globuli bianchi sono al minimo."),
 (3,"chiaro",0,"Febbre in una paziente in chemioterapia significa neutropenia febbrile, fino a prova contraria. E i segni di infezione possono essere minimi: senza neutrofili non c'e' un'infiammazione evidente."),
 (3,"chiaro",0,"La stanchezza e la febbre possono essere tutto. La tachicardia puo' indicare una sepsi iniziale. [serious] E' un'emergenza, con un obiettivo preciso: l'antibiotico entro sessanta minuti."),

 (4,"chiaro",0,"Il triage e l'accoglienza. Priorita' elevata, secondo il percorso per la neutropenia febbrile. Non resta in sala d'attesa con altri pazienti, magari con l'influenza: va in un'area dedicata, in isolamento protettivo."),
 (4,"chiaro",0,"Igiene delle mani rigorosa. Parametri completi e NEWS2. Si avvisa subito il medico. E si registra l'ora di arrivo: da qui partono i sessanta minuti."),

 (5,"chiaro",0,"Gli esami. L'emocromo urgente conferma: neutrofili trecento, cioe' una neutropenia grave. Piastrine diciottomila. Emoglobina nove virgola uno."),
 (5,"chiaro",0,"Le emocolture, con la tecnica della lezione sei punto sette: una dal port e una da una vena periferica, prelevate insieme. Il confronto dei tempi di positivizzazione dice se l'infezione nasce dal catetere."),
 (5,"chiaro",0,"Poi funzione renale ed epatica, lattati, PCR, urinocoltura. E la regola che conosci: le emocolture non devono ritardare l'antibiotico."),

 (6,"chiaro",0,"Il port e l'antibiotico. Si accede al port con tecnica asettica: ago di Huber non carotante, verifica del reflusso, lavaggio pulsato, come nella lezione sei punto due."),
 (6,"chiaro",0,"Si ispezionano la tasca sottocutanea e il tragitto: rossore, dolore o secrezione fanno pensare a un'infezione del catetere, e vanno segnalati."),
 (6,"chiaro",0,"Poi l'antibiotico ad ampio spettro secondo prescrizione, entro sessanta minuti dall'arrivo. Qui la prima dose va alle venti e quarantotto, e l'orario si documenta: e' l'indicatore di qualita' del percorso."),

 (7,"chiaro",0,"Le misure nel paziente neutropenico, della lezione otto punto sette. Igiene delle mani. Stanza singola secondo protocollo. Niente visitatori con sintomi di infezione."),
 (7,"chiaro",0,"Niente manovre rettali: niente temperatura rettale, supposte o clisteri. Igiene orale e cutanea. Niente fiori e piante. Alimenti sicuri. E meno procedure invasive: ogni ago e' una porta d'ingresso."),

 (8,"chiaro",0,"La signora riferisce un dolore di sei su dieci alla deglutizione, con afte nel cavo orale: e' una mucosite. Igiene orale con spazzolino morbido, sciacqui blandi con fisiologica o bicarbonato, niente collutori alcolici."),
 (8,"chiaro",0,"Analgesia secondo prescrizione, valutata con la scala. Cibi morbidi, freschi, non irritanti, e idratazione. E l'ispezione quotidiana del cavo orale, anche per cercare una candidosi."),

 (9,"chiaro",0,"Le piastrine sono diciottomila: petecchie alle gambe, una lieve gengivorragia. Le precauzioni: spazzolino morbido, rasoio elettrico, niente intramuscolari, compressione prolungata dopo i prelievi, prevenzione delle cadute."),
 (9,"chiaro",0,"La trasfusione di piastrine si fa secondo prescrizione e secondo le soglie del protocollo, che tengono conto anche di febbre e sanguinamento. Con l'identificazione al letto della lezione sei punto sei."),

 (10,"chiaro",0,"L'evoluzione. In terza giornata la febbre e' risolta, i parametri sono stabili, le emocolture negative. I neutrofili risalgono a millecento, e la mucosite migliora."),
 (10,"chiaro",0,"Si prosegue la terapia secondo prescrizione, e si pianifica la dimissione. Ma prima c'e' una parte del caso che non sta negli esami."),

 (11,"chiaro",0,"[thoughtful] La sera della seconda giornata la signora Chiara ti dice: ho avuto paura di non tornare a casa dai miei figli. E' un momento che conta quanto l'antibiotico."),
 (11,"chiaro",0,"Ascolto, presenza, domande aperte, senza frasi fatte come vedra' che andra' tutto bene. Informazioni chiare, dentro le tue competenze."),
 (11,"chiaro",0,"L'offerta del supporto psico-oncologico. I familiari coinvolti secondo i suoi desideri. E le associazioni di volontariato oncologico, che in Veneto sono molto presenti."),

 (12,"chiaro",0,"L'educazione alla dimissione. Misurare la temperatura in caso di malessere, brividi o sudorazione. Con febbre da trentotto in su, chiamare subito il centro, al numero dedicato."),
 (12,"chiaro",0,"E non prendere l'antipiretico aspettando che passi: l'antipiretico abbassa la febbre, ma non cura un'infezione in una persona senza difese."),
 (12,"chiaro",0,"Igiene delle mani, evitare chi ha infezioni, igiene orale. La cura del port e i segni di infezione. I segni di sanguinamento. Alimentazione sicura. Il calendario dei controlli. Il case manager e la Rete Oncologica Veneta."),

 (13,"chiaro",0,"Gli errori. Dire: ha solo un po' di febbre, prenda il paracetamolo e torni domani. Lasciarla in sala d'attesa. Ritardare l'antibiotico per aspettare l'emocromo o le emocolture."),
 (13,"chiaro",0,"Temperature rettali e supposte. Intramuscolari con le piastrine basse. E trascurare la paura, e i figli."),

 (14,"chiaro",0,"Un approfondimento sul port-a-cath nel tempo. Si accede con l'ago di Huber, non carotante, con tecnica asettica. Prima dell'uso si verifica il reflusso."),
 (14,"chiaro",0,"Lavaggio pulsato con fisiologica, con siringhe da almeno dieci millilitri per non generare pressioni eccessive: prima e dopo ogni uso, e fra farmaci incompatibili. Da fermo, lavaggi secondo protocollo."),
 (14,"chiaro",0,"I segni da segnalare. Dolore o gonfiore durante l'infusione fanno pensare a uno stravaso, pericolosissimo con gli antiblastici. L'assenza di reflusso, o una resistenza, a un'occlusione."),
 (14,"chiaro",0,"Arrossamento o secrezione, a un'infezione. E un edema del braccio o del collo puo' indicare una trombosi."),

 (15,"chiaro",0,"[curious] Le domande d'orale. Prima: che cos'e' il nadir? Il punto piu' basso dei valori ematici dopo la chemioterapia, di solito fra il settimo e il quattordicesimo giorno: il massimo rischio di infezione e sanguinamento."),
 (15,"chiaro",0,"Seconda: quali misure per il neutropenico? Igiene delle mani, isolamento protettivo secondo protocollo, niente visitatori con sintomi, niente manovre rettali, igiene orale e cutanea."),
 (15,"chiaro",0,"Alimenti sicuri, niente fiori, meno procedure invasive. E la regola della febbre: antibiotico entro sessanta minuti. Terza: come risponde a una paziente che ha paura?"),
 (15,"chiaro",0,"Con ascolto e presenza, domande aperte, senza frasi rassicuranti generiche. Dando informazioni nei limiti delle proprie competenze, e offrendo il supporto psico-oncologico."),

 (16,"chiaro",0,"La risposta modello. Paziente in chemioterapia, nove giorni dopo l'ultimo ciclo, con febbre, brividi e tachicardia: neutropenia febbrile fino a prova contraria, emergenza, antibiotico entro sessanta minuti."),
 (16,"chiaro",0,"Assegno priorita' elevata, la accolgo in area separata con isolamento protettivo, rilevo i parametri e avviso subito il medico, registrando l'orario di arrivo. Eseguo l'emocromo urgente."),
 (16,"chiaro",0,"Emocolture contemporanee dal port, con ago di Huber e tecnica asettica, e da vena periferica, senza ritardare l'antibiotico, che somministro documentandone l'orario. Applico le misure per il neutropenico."),
 (16,"chiaro",0,"Con piastrine basse, le precauzioni antiemorragiche. Gestisco mucosite e dolore. Rivaluto. Offro ascolto e supporto psico-oncologico. Alla dimissione educo a chiamare subito in caso di febbre, con il teach-back."),

 (17,"chiaro",0,"I collegamenti. L'isolamento protettivo con la quattro punto tre. Il port con la sei punto due. La trasfusione con la sei punto sei. Le emocolture con la sei punto sette."),
 (17,"chiaro",0,"Neutropenia, mucosite e piastrinopenia con la otto punto sette. Gli antiblastici con la cinque punto sette. La comunicazione con la due punto sette. La Rete Oncologica Veneta con la tredici punto tre."),

 (18,"profondo",1.2,"[serious] La frase del caso: nel paziente in chemioterapia, la febbre e' un'emergenza anche quando lui dice di stare bene."),

 (19,"chiaro",0,"[warm] Nella prossima lezione: un turno di mattina con quattro trappole nella terapia. Potassio, eparina in pompa, morfina, trasfusione: quattro situazioni in cui l'infermiere e' l'ultima barriera prima del danno. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"Lo scenario",3:"Il ragionamento",4:"Il triage e l'accoglienza",5:"Gli esami e le emocolture",
 6:"Il port e l'antibiotico",7:"Le misure nel paziente neutropenico",8:"La mucosite",9:"Le piastrine basse",
 10:"L'evoluzione",11:"La persona, non solo la neutropenia",12:"L'educazione alla dimissione",13:"Gli errori da evitare",
 14:"Il port-a-cath nel tempo",15:"Le domande d'orale",16:"La risposta modello",17:"I collegamenti",
 18:"La frase del caso",19:"Chiusura"}

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
