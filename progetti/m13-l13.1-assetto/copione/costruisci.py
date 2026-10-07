# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Questo e' il modulo che piu' distingue chi si prepara per questo concorso. Il bando e' di Azienda Zero, e la commissione si aspetta che tu sappia come e' organizzata la sanita' veneta."),
 (1,"chiaro",0,"Quali aziende esistono, che cosa fa Azienda Zero, come funzionano la rete ospedaliera, il territorio, la non autosufficienza. Cominciamo dall'assetto generale del sistema regionale."),

 (2,"chiaro",0,"Il primo tratto distintivo: in Veneto si parla di Servizio Socio Sanitario Regionale, perche' da decenni la Regione ha scelto di integrare il sanitario e il sociale."),
 (2,"chiaro",0,"Per questo le aziende si chiamano ULSS: Unita' Locali Socio Sanitarie. E i Comuni possono delegare alle ULSS la gestione dei servizi socio-sanitari."),
 (2,"chiaro",0,"La direzione aziendale comprende un direttore dei servizi socio-sanitari. E la programmazione territoriale passa anche dai Piani di Zona, condivisi fra ULSS e Comuni."),
 (2,"chiaro",0,"Per l'infermiere significa lavorare spesso accanto agli assistenti sociali e ai servizi comunali, dentro un sistema costruito sull'integrazione fra sanitario e sociale."),

 (3,"chiaro",0,"La riforma da conoscere e' la legge regionale del venticinque ottobre duemilasedici, numero diciannove: la legge regionale diciannove del duemilasedici. Fa due cose."),
 (3,"chiaro",0,"La prima: istituisce Azienda Zero, l'ente di governance della sanita' regionale. E' l'azienda che bandisce questo concorso, e la vedremo da vicino nella prossima lezione."),
 (3,"chiaro",0,"La seconda: ridisegna le aziende territoriali. Dal primo gennaio duemiladiciassette le ULSS passano da ventuno a nove, e i territori delle precedenti diventano i distretti delle nuove."),

 (4,"chiaro",0,"Le nove Aziende ULSS, con il loro nome e la sede. Uno, Dolomiti, a Belluno. Due, Marca Trevigiana, a Treviso. Tre, Serenissima, a Venezia."),
 (4,"chiaro",0,"Quattro, Veneto Orientale, a San Dona' di Piave. Cinque, Polesana, a Rovigo. Sei, Euganea, a Padova. Polesana ed Euganea sono le due aziende del territorio di Padova e Rovigo."),
 (4,"chiaro",0,"Sette, Pedemontana, a Bassano del Grappa. Otto, Berica, a Vicenza. Nove, Scaligera, a Verona. Nove aziende, nove nomi: imparali con il loro numero."),
 (4,"chiaro",0,"Se il concorso prevede una scelta dell'ambito di assegnazione, conoscere i territori e le loro aziende ti serve anche in pratica, non solo per rispondere a una domanda."),

 (5,"chiaro",0,"Accanto alle ULSS, gli altri enti del Servizio Sanitario Regionale. Due aziende ospedaliere universitarie: l'Azienda Ospedale-Universita' di Padova e l'Azienda Ospedaliera Universitaria Integrata di Verona."),
 (5,"chiaro",0,"Integrano assistenza, didattica e ricerca con le rispettive universita'. Poi l'Istituto Oncologico Veneto, lo IOV, che e' un IRCCS: un Istituto di Ricovero e Cura a Carattere Scientifico."),
 (5,"chiaro",0,"E Azienda Zero, che fa parte anch'essa del Servizio Sanitario Regionale. A questi enti si aggiungono le strutture private accreditate."),

 (6,"chiaro",0,"La governance regionale. La Giunta e il Consiglio regionale definiscono gli indirizzi e la programmazione. L'Area Sanita' e Sociale della Regione, guidata da un direttore generale, traduce gli indirizzi in atti."),
 (6,"chiaro",0,"Azienda Zero fornisce supporto tecnico e gestisce le funzioni centralizzate del sistema. Che cosa significhi in concreto lo vediamo nella prossima lezione, dedicata proprio a lei."),
 (6,"chiaro",0,"I direttori generali delle aziende sono nominati dalla Giunta regionale, con obiettivi che vengono assegnati e poi valutati ogni anno."),
 (6,"chiaro",0,"E nelle ULSS c'e' la Conferenza dei sindaci, che da' voce ai territori. E' un altro segno dello stesso legame fra l'azienda sanitaria e i Comuni."),

 (7,"chiaro",0,"Lo strumento principale della programmazione regionale e' il Piano Socio Sanitario Regionale, il PSSR. Anche nel nome del piano, sanitario e sociale stanno insieme."),
 (7,"chiaro",0,"Quello vigente e' il piano duemiladiciannove, duemilaventitre', approvato con la legge regionale quarantotto del ventotto dicembre duemiladiciotto."),
 (7,"chiaro",0,"Gli atti regionali continuano a richiamarlo come riferimento della programmazione, in attesa di un nuovo piano. Prima della prova, verifica se e' stato approvato un nuovo piano."),
 (7,"chiaro",0,"I suoi temi: la cronicita' e la stratificazione della popolazione, la rete ospedaliera hub and spoke, il territorio e le cure intermedie, l'integrazione socio-sanitaria, il personale, l'innovazione."),

 (8,"chiaro",0,"Gli altri strumenti. Le schede di dotazione ospedaliera e territoriale, approvate con delibera di Giunta regionale, che stabiliscono per ogni ospedale e ogni territorio funzioni e posti letto."),
 (8,"chiaro",0,"Gli obiettivi annuali assegnati ai direttori generali. I Piani di Zona. Il Piano Regionale della Prevenzione. E i piani di settore, come quello per le dipendenze o per le cure palliative."),
 (8,"chiaro",0,"E la Relazione Socio Sanitaria, pubblicata ogni anno, che descrive lo stato di salute della popolazione e l'attivita' del sistema: una fonte utile per prepararsi all'orale."),

 (9,"chiaro",0,"[thoughtful] Il contesto. Il Veneto ha circa quattro virgola otto milioni di abitanti, ed e' fra le regioni con la popolazione piu' anziana."),
 (9,"chiaro",0,"Ha una fortissima presenza turistica, con decine di milioni di presenze l'anno. E un territorio vario: la montagna, la pianura, la laguna, il delta del Po."),
 (9,"chiaro",0,"Le implicazioni: molta cronicita' e non autosufficienza, picchi stagionali di domanda nelle zone turistiche, e servizi da garantire anche nelle zone disagiate, come la montagna bellunese o il delta polesano."),

 (10,"chiaro",0,"Il distretto, in Veneto, e' il perno dell'integrazione. E' l'articolazione territoriale dell'ULSS che governa la domanda e la presa in carico."),
 (10,"chiaro",0,"Comprende l'assistenza primaria, la specialistica territoriale, l'ADI, la residenzialita', i consultori. E si integra con i Comuni."),
 (10,"chiaro",0,"Nel distretto ha sede l'UVMD, e il distretto coordina le transizioni con la COT. Li approfondiamo nelle lezioni tredici punto quattro e tredici punto cinque."),

 (11,"chiaro",0,"[curious] Il caso d'esame. La domanda tipo: descriva l'assetto del Servizio Socio Sanitario del Veneto. Ecco una risposta strutturata, in cinque elementi."),
 (11,"chiaro",0,"Primo: e' un servizio socio-sanitario, con una forte integrazione fra sanitario e sociale. Secondo: la legge regionale diciannove del duemilasedici ha istituito Azienda Zero."),
 (11,"chiaro",0,"E ha ridotto le ULSS da ventuno a nove, dal duemiladiciassette. Terzo: ci sono due aziende ospedaliere universitarie, a Padova e a Verona, e lo IOV."),
 (11,"chiaro",0,"Quarto: la programmazione si basa sul Piano Socio Sanitario Regionale e sulle schede di dotazione. Quinto: il distretto e' il perno del territorio. Cinque elementi, un minuto e mezzo."),

 (12,"chiaro",0,"Un esempio concreto, dal territorio di Padova e Rovigo. L'ULSS sei Euganea copre la provincia di Padova, l'ULSS cinque Polesana quella di Rovigo. A Padova ci sono l'Azienda Ospedale-Universita' e lo IOV."),
 (12,"chiaro",0,"Insieme formano una rete: l'ospedale universitario fa da hub per le alte specialita', gli ospedali delle ULSS fanno da spoke, e il territorio garantisce la continuita'."),

 (13,"chiaro",0,"Perche' tutto questo serve a un infermiere? Per capire da chi dipendi e chi decide. E per sapere a chi rivolgersi quando un paziente deve essere dimesso o preso in carico: il distretto, la COT, l'UVMD."),
 (13,"chiaro",0,"Per collegare la tua pratica alla programmazione regionale. E all'orale, per dimostrare che conosci il sistema in cui chiedi di entrare."),

 (14,"chiaro",0,"Le fonti da consultare per aggiornarti. Il portale della Regione del Veneto, area Sanita' e Sociale. Il sito di Azienda Zero. E i siti delle ULSS, con i loro atti aziendali."),
 (14,"chiaro",0,"Il Bollettino Ufficiale della Regione del Veneto, il BUR, dove sono pubblicate leggi e delibere. E la Relazione Socio Sanitaria, che esce ogni anno."),

 (15,"chiaro",0,"La tabella. Servizio Socio Sanitario. Legge regionale diciannove del duemilasedici: Azienda Zero, e ULSS da ventuno a nove dal primo gennaio duemiladiciassette."),
 (15,"chiaro",0,"Le nove ULSS: Dolomiti, Marca Trevigiana, Serenissima, Veneto Orientale, Polesana, Euganea, Pedemontana, Berica, Scaligera. Poi le aziende universitarie di Padova e di Verona, e lo IOV."),
 (15,"chiaro",0,"L'Area Sanita' e Sociale. Il PSSR duemiladiciannove, duemilaventitre', legge regionale quarantotto del duemiladiciotto. Le schede di dotazione. I Piani di Zona. Il distretto."),

 (16,"profondo",1.2,"[serious] In Veneto la sanita' e' socio sanitaria: sanitario e sociale insieme, nove ULSS, Azienda Zero. E' il sistema in cui chiedi di entrare, e la commissione si aspetta che tu lo conosca."),

 (17,"chiaro",0,"[warm] Nella prossima lezione: Azienda Zero, l'ente che bandisce questo concorso. Che cos'e', che cosa fa, e che cosa significa per te come candidato. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"Un sistema socio-sanitario",3:"La legge regionale 19 del 2016",4:"Le nove Aziende ULSS",5:"Gli altri enti",6:"La governance regionale",
 7:"Il Piano Socio Sanitario Regionale",8:"Gli altri strumenti di programmazione",9:"I numeri del contesto",10:"Il distretto",
 11:"Il caso d'esame",12:"Padova e Rovigo",13:"Perche' conoscere il sistema",14:"Le fonti da consultare",15:"La tabella",16:"La frase della lezione",17:"Chiusura"}

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
