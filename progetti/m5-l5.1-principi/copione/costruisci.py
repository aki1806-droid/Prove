# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Entriamo nel modulo che, nei concorsi infermieristici, pesa piu' di ogni altro. La farmacologia produce domande secche, calcoli e casi clinici."),
 (1,"chiaro",0,"E soprattutto riguarda l'attivita' in cui l'infermiere si assume una responsabilita' diretta: la somministrazione. Otto lezioni: i principi, le vie, i calcoli, la sicurezza, le classi di farmaci, la gestione in reparto."),
 (1,"chiaro",0,"Si comincia dai principi. Non per diventare farmacologi, ma per capire perche' un farmaco si comporta in un certo modo, e quindi che cosa sorvegliare."),

 (2,"chiaro",0,"Due parole da non confondere, perche' i quiz le mettono una accanto all'altra. La farmacocinetica studia che cosa fa l'organismo al farmaco: come lo assorbe, lo distribuisce, lo trasforma e lo elimina."),
 (2,"chiaro",0,"La farmacodinamica studia che cosa fa il farmaco all'organismo: dove agisce e con quale effetto. Una frase ciascuna, ed e' gia' una risposta d'esame."),

 (3,"chiaro",0,"La farmacocinetica si riassume nella sigla ADME. Assorbimento: il passaggio dal sito di somministrazione al sangue. Distribuzione: il trasporto ai tessuti."),
 (3,"chiaro",0,"Metabolismo: la trasformazione, soprattutto nel fegato, attraverso gli enzimi del citocromo P450. Eliminazione: soprattutto per via renale, ma anche biliare, polmonare, cutanea."),
 (3,"chiaro",0,"Fegato e rene sono i due organi da cui dipende quanto a lungo un farmaco resta nel corpo. Quando uno dei due funziona male, il farmaco resta di piu'."),

 (4,"chiaro",0,"La biodisponibilita' e' la frazione della dose che raggiunge la circolazione in forma attiva. Per la via endovenosa e' per definizione il cento per cento: il farmaco e' gia' nel sangue."),
 (4,"chiaro",0,"Per la via orale e' minore, perche' il farmaco assorbito dall'intestino passa prima dal fegato, che ne inattiva una parte: e' l'effetto di primo passaggio."),
 (4,"chiaro",0,"Ecco perche' la dose orale di un farmaco e' spesso piu' alta di quella endovenosa. La via sublinguale evita questo passaggio, la nitroglicerina e' l'esempio classico, e la via rettale lo evita in parte."),

 (5,"chiaro",0,"Nel sangue molti farmaci si legano alle proteine plasmatiche, soprattutto all'albumina. Solo la quota libera e' attiva: quella legata e' una riserva che non agisce."),
 (5,"chiaro",0,"Se l'albumina e' bassa, ricordi la malnutrizione della lezione tre punto tre, aumenta la quota libera, e con essa effetto e tossicita', anche a dose invariata. Conta soprattutto per warfarin e fenitoina."),

 (6,"chiaro",0,"L'emivita e' il tempo necessario perche' la concentrazione plasmatica del farmaco si dimezzi: da cento a cinquanta, poi a venticinque, poi a dodici e mezzo. Da questa definizione discendono due regole molto utili."),
 (6,"chiaro",0,"Con somministrazioni regolari, lo stato stazionario, la concentrazione stabile, si raggiunge dopo circa quattro-cinque emivite. E dopo la sospensione, il farmaco si considera eliminato dopo altre quattro-cinque."),
 (6,"chiaro",0,"Un farmaco con emivita lunga ci mette tanto ad agire del tutto, e tanto ad andarsene. Ed e' per questo che alcune terapie partono con una dose di carico, per non aspettare cinque emivite."),

 (7,"chiaro",0,"La finestra terapeutica e' l'intervallo fra la concentrazione efficace e quella tossica. Quando e' stretta, basta poco per passare dall'una all'altra."),
 (7,"chiaro",0,"E il farmaco richiede il monitoraggio dei livelli ematici, il TDM. I farmaci da ricordare: digossina, litio, warfarin, che si monitora con l'INR, fenitoina, teofillina, gli aminoglicosidi e la vancomicina."),
 (7,"chiaro",0,"Per questi l'infermiere presta attenzione anche all'orario del prelievo rispetto alla dose: un livello prelevato al momento sbagliato non si interpreta."),

 (8,"chiaro",0,"La farmacodinamica in tre concetti. Un agonista si lega al recettore e lo attiva; un antagonista si lega e lo blocca. Il naloxone, antagonista degli oppioidi, ne e' l'esempio perfetto."),
 (8,"chiaro",0,"La tolleranza e' la necessita' di dosi crescenti per ottenere lo stesso effetto. La dipendenza puo' essere fisica, con sindrome da astinenza alla sospensione, o psichica."),
 (8,"chiaro",0,"Vedremo nella lezione cinque punto sei come tolleranza e dipendenza si applicano agli oppioidi, dove il confine fra l'una e l'altra decide la terapia del dolore."),

 (9,"chiaro",0,"Le interazioni. Farmacocinetiche: un farmaco modifica il destino di un altro, tipicamente agendo sugli enzimi epatici. Gli induttori, come la rifampicina, accelerano il metabolismo e riducono l'effetto."),
 (9,"chiaro",0,"Gli inibitori, come alcuni antibiotici macrolidi e antimicotici, lo rallentano e aumentano l'effetto. Farmacodinamiche: due farmaci sommano o contrastano i loro effetti."),
 (9,"chiaro",0,"E le interazioni farmaco-cibo: warfarin e vitamina K; levotiroxina a digiuno; latte e calcio che riducono l'assorbimento di tetracicline e chinoloni; il pompelmo, che inibisce il metabolismo di molti farmaci."),

 (10,"chiaro",0,"La reazione avversa, o ADR, e' una risposta nociva e non voluta a un medicinale. La definizione attuale include anche le reazioni da errore terapeutico, uso off-label, abuso ed esposizione professionale."),
 (10,"chiaro",0,"Si classificano in tipo A, dose-dipendenti e prevedibili dall'azione del farmaco: l'emorragia da anticoagulante. E tipo B, non dose-dipendenti e imprevedibili: l'allergia, l'idiosincrasia."),
 (10,"profondo",1.2,"[serious] Le prime sono le piu' frequenti, le seconde le piu' temute. E in tutte e due i casi chi le vede per primo, al letto, e' quasi sempre l'infermiere."),

 (11,"chiaro",0,"La farmacovigilanza e' il sistema che raccoglie e valuta le reazioni avverse dopo l'immissione in commercio. Per gli operatori sanitari, infermieri compresi, segnalare le sospette reazioni avverse e' un obbligo."),
 (11,"chiaro",0,"Si fa tempestivamente tramite la scheda o la piattaforma online della Rete Nazionale di Farmacovigilanza dell'AIFA, che fa capo al Responsabile locale di farmacovigilanza. Anche i cittadini possono segnalare."),
 (11,"profondo",1.2,"[serious] Basta il sospetto, non serve la certezza del nesso. E i farmaci contrassegnati dal triangolo nero rovesciato sono sotto monitoraggio addizionale: per questi la segnalazione e' ancora piu' preziosa."),

 (12,"chiaro",0,"Una distinzione che collega questo modulo al modulo due. La reazione avversa si segnala alla farmacovigilanza. L'errore in terapia si segnala con l'incident reporting del rischio clinico."),
 (12,"chiaro",0,"Se un errore provoca una reazione avversa, si fanno entrambe le segnalazioni, perche' servono a sistemi diversi: uno studia il farmaco, l'altro studia il processo."),

 (13,"chiaro",0,"Il paziente anziano, che e' la maggior parte dei ricoverati. Ha meno acqua corporea, quindi i farmaci idrosolubili raggiungono concentrazioni piu' alte."),
 (13,"chiaro",0,"Ha piu' massa grassa, quindi i farmaci liposolubili, come le benzodiazepine, si accumulano e durano di piu'. Ha una ridotta funzione renale ed epatica, spesso ipoalbuminemia."),
 (13,"chiaro",0,"E soprattutto e' in politerapia, con un rischio di interazioni che cresce con il numero dei farmaci. La regola e': start low, go slow. Si comincia con dosi basse e si aumenta lentamente."),

 (14,"chiaro",0,"Esistono strumenti, come i criteri di Beers, che elencano i farmaci potenzialmente inappropriati nell'anziano: benzodiazepine a lunga durata, anticolinergici, alcuni antistaminici e altri."),
 (14,"chiaro",0,"E si parla sempre piu' di deprescrizione: ridurre o sospendere i farmaci non piu' utili. L'infermiere non deprescrive, ma osserva e segnala: la sonnolenza nuova, la confusione, le cadute, la stipsi, l'ipotensione."),

 (15,"chiaro",0,"Il paziente con insufficienza renale. Molti farmaci si eliminano per via renale, quindi la dose o l'intervallo vanno adattati alla funzione renale stimata, il filtrato o la clearance della creatinina."),
 (15,"chiaro",0,"E vanno sorvegliati i farmaci nefrotossici: FANS, aminoglicosidi, vancomicina, mezzi di contrasto iodati. La metformina va gestita secondo protocollo prima di un esame con contrasto, per il rischio di acidosi lattica."),

 (16,"chiaro",0,"Un caso da ragionare. Anziana in politerapia, da due giorni sonnolenta e confusa, albumina bassa, in terapia con fenitoina e una benzodiazepina la sera. Che cosa pensi?"),
 (16,"chiaro",0,"Due meccanismi insieme. L'ipoalbuminemia aumenta la quota libera della fenitoina, farmaco a finestra stretta. La benzodiazepina si accumula nel tessuto adiposo dell'anziano."),
 (16,"chiaro",0,"Che cosa fai? Rilevi parametri e stato di coscienza, avvisi il medico segnalando il sospetto, sorvegli il rischio di caduta, e se confermato si valuta la segnalazione di farmacovigilanza. E' il livello che la prova premia."),

 (17,"chiaro",0,"In Veneto le segnalazioni confluiscono dal Responsabile aziendale di farmacovigilanza al Centro regionale di farmacovigilanza, che le valuta e le trasmette alla rete nazionale."),
 (17,"chiaro",0,"Le aziende promuovono inoltre la ricognizione della terapia all'ingresso e la sua riconciliazione nei passaggi di setting, come prevede la Raccomandazione diciassette del Ministero."),
 (17,"chiaro",0,"All'orale, la catena completa e' questa: l'operatore segnala, il responsabile aziendale raccoglie, il centro regionale valuta, l'AIFA mette in rete. Quattro passaggi, e la risposta e' piena."),

 (18,"chiaro",0,"Ricapitoliamo. ADME. Endovenosa cento per cento, orale ridotta dal primo passaggio. Steady state ed eliminazione in quattro-cinque emivite. Finestra stretta: digossina, litio, warfarin, fenitoina, aminoglicosidi, vancomicina."),
 (18,"chiaro",0,"[warm] La reazione avversa si segnala sul sospetto. E nell'anziano: start low, go slow. Nella prossima lezione, le vie di somministrazione e le tecniche: angoli, aghi, sedi e volumi. A tra poco."),
]

CAPITOLI = {1:"Apertura",2:"Cinetica e dinamica",3:"ADME",4:"La biodisponibilita'",5:"Il legame con le proteine",
 6:"L'emivita",7:"La finestra terapeutica",8:"La farmacodinamica",9:"Le interazioni",
 10:"Le reazioni avverse",11:"La farmacovigilanza",12:"Due segnalazioni",13:"L'anziano",14:"La deprescrizione",
 15:"Il nefropatico",16:"Il caso d'esame",17:"In Veneto",18:"Chiusura"}

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
