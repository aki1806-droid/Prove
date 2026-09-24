# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 4.1 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M4): l'azienda sanitaria — personalita' giuridica pubblica e autonomie
# (D.Lgs. 502/1992 come modificato dal D.Lgs. 229/1999: organizzativa, amministrativa,
# patrimoniale, contabile, gestionale e tecnica; autonomia imprenditoriale); criteri di
# efficienza, efficacia, economicita'; atti di diritto privato; atto aziendale; tipologie
# di azienda: ULSS/ASL, azienda ospedaliera (requisiti), azienda ospedaliero-universitaria,
# IRCCS (D.Lgs. 288/2003). Fonti: dispensa CISL FP «Diritto sanitario parte prima» (Galiazzo).
BLOCCHI = [
 (1,"chiaro",0,"[serious] Nella busta paga c'e' scritto Azienda. Non ente, non ufficio: azienda. Eppure non vende niente, non ha azionisti e non distribuisce utili. Perche' allora si chiama cosi'?"),
 (1,"chiaro",0,"Perche' dal 1992 la sanita' pubblica ha scelto un modello preciso: enti pubblici che lavorano con i metodi di un'impresa. Obiettivi, bilanci, responsabilita' di risultato."),
 (1,"profondo",1.2,"Pubblica nei fini, aziendale nei metodi."),

 (2,"chiaro",0,"Quattro passaggi. Che cosa fa di un ente un'azienda. Le autonomie che la legge le riconosce. I tipi di azienda nel servizio sanitario. E da vicino ospedaliere, universitarie e istituti di ricerca."),

 (3,"chiaro",0,"Il punto di partenza e' il decreto 502 del 1992, riscritto in parte dal decreto 229 del 1999. E' il passaggio che chiamiamo aziendalizzazione."),
 (3,"chiaro",0,"Prima c'erano le unita' sanitarie locali della legge 833: strutture dei Comuni, senza una vera autonomia. Dopo il 502 diventano aziende, con una propria personalita' giuridica."),
 (3,"chiaro",0,"Personalita' giuridica pubblica vuol dire che l'azienda e' un soggetto a se': ha un nome, un patrimonio, un legale rappresentante. Puo' firmare contratti e risponde di quello che fa."),
 (3,"chiaro",0,"Resta pubblica: persegue la tutela della salute, non il profitto. Ma deve lavorare secondo tre criteri che vengono dall'economia aziendale: efficienza, efficacia ed economicita'."),
 (3,"chiaro",0,"Efficacia vuol dire raggiungere il risultato di salute. Efficienza, raggiungerlo senza sprecare risorse. Economicita', tenere nel tempo l'equilibrio fra costi e ricavi."),
 (3,"chiaro",0,"Un esempio: un reparto che guarisce i pazienti e' efficace. Se lo fa con meno giornate di degenza, a parita' di esito, e' anche efficiente. Se i conti reggono negli anni, e' economico."),
 (3,"chiaro",0,"C'e' poi una regola che cambia il modo di lavorare: l'azienda agisce con atti di diritto privato. Contratti, accordi, incarichi, come farebbe un'impresa."),
 (3,"tenue",0,"Attenzione: non tutto e' diritto privato. I concorsi, gli appalti e i procedimenti verso i cittadini restano atti amministrativi, con le regole della pubblica amministrazione."),
 (3,"profondo",1.2,"Un soggetto pubblico, con gli strumenti di un'impresa."),

 (4,"chiaro",0,"La seconda parola chiave e' autonomia. Il decreto 502, come modificato nel 1999, riconosce alle aziende autonomia organizzativa, amministrativa, patrimoniale, contabile, gestionale e tecnica."),
 (4,"chiaro",0,"Autonomia organizzativa: l'azienda decide come organizzarsi, dentro le regole della Regione. Lo fa con l'atto aziendale, che vedremo nella lezione quattro punto tre."),
 (4,"chiaro",0,"Autonomia amministrativa: adotta da se' i propri atti, dalle delibere del direttore generale ai provvedimenti dei dirigenti, senza chiedere il permesso caso per caso."),
 (4,"chiaro",0,"Autonomia patrimoniale: ha un patrimonio proprio, fatto di beni disponibili e indisponibili, e ne risponde. Gli ospedali, per esempio, sono beni indisponibili."),
 (4,"chiaro",0,"Autonomia contabile: tiene la propria contabilita' economico-patrimoniale e il proprio bilancio, come abbiamo visto con la legge 55 nel modulo tre."),
 (4,"chiaro",0,"Autonomia gestionale e tecnica: sceglie come usare personale, tecnologie e risorse per raggiungere gli obiettivi assegnati. La responsabilita' del risultato e' sua."),
 (4,"chiaro",0,"Per le ULSS la dispensa usa anche un'espressione sintetica: autonomia imprenditoriale, contabile e patrimoniale. Imprenditoriale riassume l'idea: decidere e rispondere dei risultati."),
 (4,"tenue",0,"Occhio a un distrattore: autonomia non vuol dire indipendenza. L'azienda lavora dentro la programmazione regionale, con gli obiettivi fissati dalla Giunta e i controlli della Regione."),
 (4,"chiaro",0,"Nelle domande d'esame si parla spesso di quattro autonomie: giuridica, amministrativa, patrimoniale e contabile. E' una sintesi utile, purche' si ricordi che la legge ne elenca di piu'."),
 (4,"profondo",1.2,"Libera di organizzarsi. Obbligata a rendere conto."),

 (5,"chiaro",0,"Chi eroga i livelli essenziali di assistenza? La Regione si avvale di piu' soggetti: le aziende sanitarie locali, le aziende ospedaliere, gli istituti di ricovero e cura a carattere scientifico e i privati accreditati."),
 (5,"chiaro",0,"La prima tipologia e' l'azienda sanitaria locale, che nel Veneto si chiama ULSS, unita' locale socio-sanitaria. Copre un territorio e la sua popolazione."),
 (5,"chiaro",0,"Fa prevenzione, assistenza distrettuale e assistenza ospedaliera, attraverso i suoi presidi. E si finanzia soprattutto con la quota capitaria: in base ai residenti."),
 (5,"chiaro",0,"I suoi organi, oggi, sono tre: il direttore generale, il collegio di direzione e il collegio sindacale. Il direttore generale e' affiancato dal direttore sanitario, amministrativo e dei servizi sociali."),
 (5,"chiaro",0,"Le ULSS possono gestire anche attivita' socio-assistenziali su delega dei Comuni. Ma solo dopo aver ricevuto dagli enti locali le risorse per coprirne i costi."),
 (5,"chiaro",0,"Oggi il Veneto ha nove ULSS. Accanto, due aziende ospedaliere universitarie, Padova e Verona, l'Istituto Oncologico Veneto e Azienda Zero, che governa le funzioni comuni."),

 (6,"chiaro",0,"La seconda tipologia e' l'azienda ospedaliera. Non copre un territorio: e' un ospedale, o un gruppo di ospedali, di alta specializzazione, costituito in azienda autonoma."),
 (6,"chiaro",0,"Per diventarlo servono requisiti precisi: organizzazione dipartimentale, almeno tre unita' operative di alta specialita', un dipartimento di emergenza di secondo livello."),
 (6,"chiaro",0,"E ancora: un ruolo di riferimento regionale e interregionale, piu' del dieci per cento di pazienti da fuori regione, e un'alta complessita' dei casi trattati."),
 (6,"chiaro",0,"Si finanzia in base all'attivita' svolta: le prestazioni erogate, pagate secondo le tariffe. E' la differenza con la ULSS che abbiamo gia' visto nella legge 55."),
 (6,"chiaro",0,"La terza tipologia e' l'azienda ospedaliera integrata con l'universita'. Qui l'ospedale e la facolta' di medicina lavorano insieme: assistenza, didattica e ricerca nello stesso luogo."),
 (6,"chiaro",0,"Il direttore generale e' nominato d'intesa con il Rettore. E tra gli organi compare l'organo di indirizzo, che tiene coerenti i programmi dell'assistenza con quelli della didattica e della ricerca."),
 (6,"chiaro",0,"E' il modello dell'Azienda Ospedale Universita' di Padova, a cui dedichiamo la prossima lezione."),
 (6,"chiaro",0,"La quarta tipologia sono gli IRCCS, istituti di ricovero e cura a carattere scientifico, regolati dal decreto 288 del 2003. Uniscono ricerca clinica e biomedica e ricovero di alta specialita'."),
 (6,"chiaro",0,"Sono riconosciuti dal ministero della Salute, d'intesa con la Regione, per una specializzazione, e il possesso dei requisiti si verifica ogni tre anni. Nel Veneto un esempio e' l'Istituto Oncologico Veneto."),
 (6,"tenue",0,"Un distrattore frequente: l'azienda ospedaliera non ha i distretti. Il territorio e la popolazione sono della ULSS; l'azienda ospedaliera eroga prestazioni ad alta specializzazione."),
 (6,"profondo",1.2,"Un territorio, un ospedale, un'universita', un istituto di ricerca: quattro modi di essere azienda."),

 (7,"chiaro",0,"Le tre cose che ti chiederanno. La prima: con il decreto 502 le aziende hanno personalita' giuridica pubblica e agiscono con atti di diritto privato, secondo efficienza, efficacia ed economicita'."),
 (7,"chiaro",0,"La seconda: la legge riconosce autonomia organizzativa, amministrativa, patrimoniale, contabile, gestionale e tecnica. La sintesi d'esame ne ricorda quattro: giuridica, amministrativa, patrimoniale e contabile."),
 (7,"chiaro",0,"La terza: le tipologie sono ULSS, aziende ospedaliere, aziende ospedaliero-universitarie e IRCCS. La ULSS si finanzia a quota capitaria, l'ospedaliera in base alle prestazioni."),
 (7,"tenue",0,"L'ultimo distrattore: azienda non significa societa' privata. L'azienda sanitaria resta un ente pubblico, senza scopo di lucro e dentro la programmazione regionale."),

 (8,"profondo",0,"[warm] In sintesi: un ente pubblico con i metodi di un'impresa, libero di organizzarsi e obbligato a rendere conto. Nella prossima lezione: l'Azienda Ospedale Universita' di Padova e le sue tre missioni."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: "Che cosa fa di un ente un'azienda", 4: 'Le autonomie', 5: 'I tipi di azienda', 6: 'Ospedaliere, universitarie, IRCCS', 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
blocchi=[]
for i,(cap,tema,posa,txt) in enumerate(BLOCCHI, start=2):
    blocchi.append({"id":f"s{i:02d}","capitolo":cap,"tema":tema,"posa":posa,"text":txt})

errori=[]
tot=sum(len(b["text"]) for b in blocchi)
nscene=len(blocchi)+2
if nscene>MAX_SCENE: errori.append(f"scene {nscene} > {MAX_SCENE}")
for b in blocchi:
    if any(c in ACCENTATE for c in b["text"]):
        errori.append(f'{b["id"]}: vocale accentata -> ' + "".join(sorted({c for c in b["text"] if c in ACCENTATE})))
    if len(b["text"])>MAX_CAR_BLOCCO: errori.append(f'{b["id"]}: {len(b["text"])} car, blocco troppo lungo')
tags=sum(len(re.findall(r"\[[a-z]+\]", b["text"])) for b in blocchi)
if tags>6: errori.append(f"tag di intenzione: {tags} > 6")

pose=sum(b["posa"] for b in blocchi)
parlato=tot/CPS+pose; durata=parlato+COPERTINA+CHIUSURA
print(f"blocchi   {len(blocchi)}        scene {nscene}/{MAX_SCENE}")
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

# Lo stacco va su un cambio di capitolo. Non il primo DOPO la meta': quello
# vicino alla meta', da una parte o dall'altra. Nella 1.1 del corso PV il
# primo dopo la meta' lasciava la traccia A a 4968 caratteri, a un soffio dal
# tetto di 5000 del servizio di sintesi, e la B a 2809.
acc=0; stacco=None; a=0; migliore=None
for i,b in enumerate(blocchi):
    acc+=len(b["text"])+1
    if i+1<len(blocchi) and b["capitolo"]!=blocchi[i+1]["capitolo"]:
        if migliore is None or abs(acc-tot/2) < abs(migliore[1]-tot/2):
            migliore=(b["id"],acc)
stacco,a=migliore
if a>=5000 or tot-a>=5000: errori.append(f"stacco dopo {stacco}: una traccia supera i 5000 caratteri")
print(f"\nstacco tracce dopo {stacco}:  chunkA {a} car  ·  chunkB {tot-a} car   (limite 5000)")
print("\n" + ("OK, nessun errore" if not errori else "ERRORI:\n  " + "\n  ".join(errori)))
json.dump(blocchi, open("copione/blocchi.json","w",encoding="utf-8"), ensure_ascii=False, indent=1)
