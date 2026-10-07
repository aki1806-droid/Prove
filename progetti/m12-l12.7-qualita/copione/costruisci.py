# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Che cosa significa che un ospedale lavora bene? Come si misura, e come si migliora? Questa lezione ti da' gli strumenti per rispondere."),
 (1,"chiaro",0,"I modelli della qualita', il ciclo del miglioramento continuo, gli indicatori, l'accreditamento, il governo clinico. Concetti che ritrovi nei quiz, e che collegano la pratica di tutti i giorni all'organizzazione."),

 (2,"chiaro",0,"La qualita' in sanita' ha piu' dimensioni. Efficacia, sicurezza, appropriatezza, equita' e accessibilita', tempestivita', efficienza, e centralita' della persona."),
 (2,"chiaro",0,"E si guarda da tre punti di vista. Il primo e' la qualita' tecnico-professionale, cioe' fare le cose giuste nel modo giusto. Il secondo e' la qualita' organizzativa."),
 (2,"chiaro",0,"Il terzo e' la qualita' percepita dal paziente, che si misura per esempio con i questionari di gradimento o di esperienza. Ci torniamo verso la fine della lezione."),

 (3,"chiaro",0,"Il modello piu' classico e' quello di Donabedian, con tre dimensioni. La struttura: le risorse, cioe' il personale, gli ambienti, le tecnologie, l'organizzazione."),
 (3,"chiaro",0,"Il processo: le attivita' svolte, cioe' come si lavora. E l'esito: il risultato di salute, quello che in inglese si chiama outcome. Risorse, attivita', risultati."),
 (3,"chiaro",0,"Un esempio sulle lesioni da pressione. Indicatore di struttura: la disponibilita' di superfici antidecubito. Indicatore di processo: la percentuale di pazienti valutati con la Braden all'ingresso."),
 (3,"chiaro",0,"Indicatore di esito: l'incidenza di nuove lesioni. Struttura, processo, esito: e' uno schema utilissimo all'orale, e lo ritroviamo nel caso d'esame."),

 (4,"chiaro",0,"Il ciclo PDCA, o ciclo di Deming, e' lo strumento del miglioramento continuo. Plan: pianificare, cioe' analizzare il problema, fissare un obiettivo, definire le azioni."),
 (4,"chiaro",0,"Do: realizzare le azioni. Check: verificare i risultati con gli indicatori. Act: se funziona, si standardizza; se non funziona, si corregge."),
 (4,"chiaro",0,"E poi si ricomincia. Il ciclo non si chiude mai su se stesso: ogni giro parte dal risultato del precedente. E' proprio questo il miglioramento continuo."),
 (4,"chiaro",0,"Un esempio. Le cadute notturne sono aumentate. Si introduce un giro di controllo con il bagno assistito, si misura l'incidenza per tre mesi, e se cala si inserisce nella procedura."),

 (5,"chiaro",0,"Gli indicatori: variabili misurabili che descrivono un fenomeno, e che permettono confronti e decisioni. I tipi sono quelli di Donabedian: struttura, processo, esito."),
 (5,"chiaro",0,"Un buon indicatore e' valido, cioe' misura cio' che deve misurare. E' affidabile, cioe' da' lo stesso risultato a parita' di condizioni. E' sensibile e specifico, rilevante e fattibile."),
 (5,"chiaro",0,"Da solo, un indicatore dice poco: si confronta con uno standard, cioe' un valore di riferimento. Ed e' il confronto con lo standard che permette di decidere se, e dove, intervenire."),
 (5,"chiaro",0,"Indicatori tipicamente infermieristici: le cadute per mille giornate di degenza, le lesioni da pressione, le infezioni da catetere, e l'aderenza all'igiene delle mani della lezione quattro punto due."),

 (6,"chiaro",0,"Il Programma Nazionale Esiti, il PNE, e' gestito dall'AGENAS, l'Agenzia nazionale per i servizi sanitari regionali. Valuta gli esiti delle cure negli ospedali italiani."),
 (6,"chiaro",0,"Con indicatori come la mortalita' a trenta giorni dopo un infarto, i tagli cesarei, e la percentuale di fratture di femore operate entro quarantotto ore, che hai visto nella lezione nove punto sei."),
 (6,"chiaro",0,"Usa i dati delle SDO, le schede di dimissione ospedaliera, e permette di confrontare le strutture. E' uno strumento di miglioramento, non una classifica punitiva."),

 (7,"chiaro",0,"[serious] Ora due livelli da non confondere. Il primo e' l'autorizzazione all'esercizio: per poter operare, una struttura sanitaria, pubblica o privata, deve avere requisiti minimi strutturali, tecnologici e organizzativi."),
 (7,"chiaro",0,"Il secondo e' l'accreditamento istituzionale. Per erogare prestazioni per conto del Servizio Sanitario Nazionale servono requisiti ulteriori di qualita', e poi gli accordi contrattuali con la Regione o l'azienda."),
 (7,"chiaro",0,"Lo prevede il decreto legislativo cinquecentodue del millenovecentonovantadue, come modificato dal duecentoventinove del millenovecentonovantanove. In Veneto lo approfondiremo nella lezione tredici punto sei."),

 (8,"chiaro",0,"Esistono poi forme volontarie. L'accreditamento all'eccellenza, rilasciato da enti nazionali o internazionali, come la Joint Commission International, e basato su standard di qualita' e sicurezza."),
 (8,"chiaro",0,"E la certificazione ISO novemilauno, che attesta la conformita' di un sistema di gestione della qualita' a una norma internazionale."),
 (8,"chiaro",0,"Sono strumenti volontari, diversi dall'accreditamento istituzionale. Quello, invece, e' obbligatorio per lavorare per il Servizio Sanitario Nazionale."),

 (9,"chiaro",0,"Il governo clinico, o clinical governance: il sistema con cui le organizzazioni sanitarie si rendono responsabili del miglioramento continuo della qualita', e della tutela di standard elevati."),
 (9,"chiaro",0,"Mette insieme strumenti che hai gia' incontrato. Le linee guida e le evidenze. L'audit clinico. La gestione del rischio clinico, della lezione due punto sei. La formazione continua, cioe' l'ECM."),
 (9,"chiaro",0,"Poi gli indicatori, il coinvolgimento dei pazienti, e l'HTA. E tutto si basa su una responsabilita' condivisa fra la direzione e i professionisti."),

 (10,"chiaro",0,"L'audit clinico e' il confronto sistematico della pratica con standard espliciti. Le fasi: si sceglie un tema e uno standard, si raccolgono i dati, si confrontano con lo standard."),
 (10,"chiaro",0,"Poi si definiscono le azioni di miglioramento. E si ripete la misurazione, il re-audit, per verificare che il cambiamento ci sia stato davvero."),
 (10,"chiaro",0,"Un esempio. Lo standard dice che il dolore va valutato e registrato per tutti i pazienti. Quanti lo hanno davvero in cartella? Diverso e' l'audit su un evento, che analizza un singolo caso, come nella lezione due punto sei."),

 (11,"chiaro",0,"L'HTA, Health Technology Assessment: la valutazione multidisciplinare delle tecnologie sanitarie. Farmaci, dispositivi, procedure, modelli organizzativi."),
 (11,"chiaro",0,"Considera l'efficacia, la sicurezza, i costi, e l'impatto organizzativo, etico e sociale. Serve a decidere se adottare una tecnologia, e come."),
 (11,"chiaro",0,"Coinvolge anche gli infermieri: per esempio nella scelta delle medicazioni avanzate, o dei dispositivi di sicurezza per i taglienti."),

 (12,"chiaro",0,"[curious] Ora la domanda tipo d'esame: proponga un indicatore di struttura, uno di processo e uno di esito per la prevenzione delle cadute in reparto."),
 (12,"chiaro",0,"Struttura: la disponibilita' di letti ad altezza variabile, e di campanelli a portata di mano. Sono le risorse che rendono possibile la prevenzione."),
 (12,"chiaro",0,"Processo: la percentuale di pazienti valutati con una scala del rischio di caduta entro ventiquattro ore dall'ingresso. Misura come lavora il reparto, non che cosa possiede."),
 (12,"chiaro",0,"Esito: il numero di cadute per mille giornate di degenza, e il numero di cadute con danno. E' il risultato che conta davvero per il paziente."),
 (12,"chiaro",0,"Poi aggiungi come li useresti, con un ciclo PDCA: pianifichi, realizzi, verifichi con gli indicatori, e standardizzi o correggi. E' una risposta che dimostra metodo."),

 (13,"chiaro",0,"La qualita' percepita e la partecipazione. I questionari di soddisfazione e, sempre piu', di esperienza del paziente. I reclami e le segnalazioni raccolti dall'URP, l'Ufficio relazioni con il pubblico."),
 (13,"chiaro",0,"La Carta dei servizi, che dichiara gli impegni dell'azienda verso i cittadini. Il coinvolgimento delle associazioni dei pazienti. Perche' la voce del paziente e' un dato di qualita', non solo un'opinione."),

 (14,"chiaro",0,"In Veneto autorizzazione e accreditamento sono disciplinati dalla legge regionale ventidue del duemiladue, con verifiche e rinnovi periodici delle strutture."),
 (14,"chiaro",0,"E la Regione utilizza sistemi di valutazione delle performance delle aziende, insieme ai dati del Programma Nazionale Esiti. Sono gli stessi strumenti di questa lezione, applicati alla regione in cui lavorerai."),

 (15,"chiaro",0,"La tabella. Le dimensioni della qualita'. Donabedian: struttura, processo, esito. Il PDCA di Deming: plan, do, check, act. Gli indicatori, validi, affidabili, sensibili e specifici, e lo standard."),
 (15,"chiaro",0,"Il PNE dell'AGENAS. Autorizzazione, accreditamento istituzionale, accreditamento all'eccellenza e ISO: tre cose diverse. Il governo clinico, l'audit con il re-audit, l'HTA."),

 (16,"profondo",1.2,"[serious] Cio' che non si misura non si puo' migliorare."),

 (17,"chiaro",0,"[warm] Nella prossima lezione ricomponiamo tutto il modulo dodici con la tabella fonte, contenuto, anno: il modo piu' efficace per memorizzare le norme. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"Le dimensioni della qualita'",3:"Il modello di Donabedian",4:"Il ciclo PDCA",5:"Gli indicatori",6:"Il Programma Nazionale Esiti",
 7:"Autorizzazione e accreditamento",8:"L'accreditamento all'eccellenza",9:"Il governo clinico",10:"L'audit clinico",11:"L'HTA",12:"Il caso d'esame",
 13:"La qualita' percepita",14:"In Veneto",15:"La tabella",16:"La frase della lezione",17:"Chiusura"}

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
