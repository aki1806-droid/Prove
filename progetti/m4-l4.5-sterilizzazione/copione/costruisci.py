# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Tre parole che nel linguaggio comune si usano come sinonimi, e che nei concorsi sono la fonte di molti errori: decontaminazione, disinfezione, sterilizzazione."),
 (1,"chiaro",0,"Indicano livelli diversi di abbattimento dei microrganismi, per scopi diversi, e si scelgono con un criterio preciso: la classificazione di Spaulding. Partiamo dalle definizioni."),

 (2,"chiaro",0,"Le definizioni. Detersione: rimozione meccanica dello sporco e del materiale organico. Disinfezione: eliminazione dei microrganismi patogeni, ma non necessariamente delle spore."),
 (2,"chiaro",0,"Sterilizzazione: eliminazione di tutti i microrganismi, spore comprese, le forme piu' resistenti. E antisepsi: la disinfezione applicata ai tessuti viventi, cute e mucose."),
 (2,"chiaro",0,"Da qui la distinzione di linguaggio, che vale una domanda: gli antisettici si usano sulla persona, i disinfettanti sugli oggetti. Stessa famiglia di sostanze, due nomi, due bersagli."),

 (3,"chiaro",0,"E la regola che precede tutto, quella da dire per prima all'orale: senza detersione non esiste disinfezione ne' sterilizzazione efficace. Lo sporco va via prima di tutto il resto."),
 (3,"chiaro",0,"Il materiale organico, sangue, secrezioni, residui, protegge i microrganismi dall'agente disinfettante e ne inattiva molti. Un disinfettante su uno strumento sporco non disinfetta."),
 (3,"profondo",1.2,"[serious] E' per questo che la detersione accurata e' il passaggio piu' importante di tutto il ciclo. Prima si pulisce, poi si disinfetta o si sterilizza. Mai al contrario."),

 (4,"chiaro",0,"La classificazione di Spaulding divide i dispositivi secondo il rischio di trasmettere infezioni, cioe' secondo dove arrivano nel corpo del paziente. Tre classi, tre trattamenti."),
 (4,"chiaro",0,"Critici: entrano in tessuti sterili o nel sistema vascolare. Strumenti chirurgici, cateteri vascolari, aghi. Richiedono la sterilizzazione, senza eccezioni."),
 (4,"chiaro",0,"Semicritici: vengono a contatto con mucose o cute non integra. Endoscopi, lame del laringoscopio, termometri rettali. Richiedono almeno una disinfezione di alto livello."),
 (4,"chiaro",0,"Non critici: toccano solo cute integra. Sfigmomanometro, fonendoscopio, padelle. Richiedono detersione e disinfezione di basso livello, fra un paziente e l'altro."),

 (5,"chiaro",0,"Gli esempi da non sbagliare, quelli che i quiz chiedono. Bisturi, pinze chirurgiche, cateteri venosi: critici. Endoscopio flessibile, lama del laringoscopio: semicritici."),
 (5,"chiaro",0,"Fonendoscopio, bracciale dello sfigmomanometro, termometro cutaneo: non critici. La domanda da farsi e' sempre una: dove arriva il dispositivo? Tessuto sterile, mucosa, o cute integra."),

 (6,"chiaro",0,"I tre livelli di disinfezione. Alto livello: uccide tutti i microrganismi, comprese parte delle spore. Si usa per i semicritici, con acido peracetico, glutaraldeide, ortoftalaldeide."),
 (6,"chiaro",0,"Livello intermedio: uccide anche i micobatteri, il bacillo della tubercolosi compreso, ma non le spore. Alcol, cloroderivati, cioe' i composti del cloro, e iodofori."),
 (6,"chiaro",0,"Basso livello: batteri in forma vegetativa e alcuni virus. I sali di ammonio quaternario, sulle superfici e sui non critici. Il parametro che distingue i livelli e' la capacita' di uccidere micobatteri e spore."),

 (7,"chiaro",0,"Gli antisettici piu' usati. La clorexidina, in particolare al due per cento in soluzione alcolica al settanta, che e' l'antisettico di scelta per la cute prima dell'inserimento dei cateteri venosi centrali."),
 (7,"chiaro",0,"Lo vedremo nel modulo sei, con i cateteri. Poi lo iodopovidone, lo iodio legato a un polimero. E l'alcol etilico al settanta per cento, la concentrazione che funziona meglio."),
 (7,"chiaro",0,"E la regola comune a tutti: rispettare il tempo di contatto e lasciar asciugare spontaneamente. Un antisettico asciugato con la garza prima del tempo non ha fatto il suo lavoro."),

 (8,"chiaro",0,"Il ciclo che trasforma uno strumento usato in uno strumento sterile. Decontaminazione, subito dopo l'uso, per ridurre la carica e proteggere l'operatore che lo maneggera'."),
 (8,"chiaro",0,"Detersione, manuale o in lavastrumenti. Risciacquo. Asciugatura, perche' l'umidita' compromette la sterilizzazione. Controllo dell'integrita' e della funzionalita'."),
 (8,"chiaro",0,"Confezionamento. Sterilizzazione. Conservazione e tracciabilita'. Otto passaggi, e il primo e' a carico di chi ha usato lo strumento, cioe' del reparto."),

 (9,"chiaro",0,"La decontaminazione merita un chiarimento, perche' e' spesso confusa con la disinfezione. E' il trattamento iniziale, per immersione in soluzione disinfettante, dello strumento appena usato, prima della detersione."),
 (9,"chiaro",0,"Il suo scopo principale non e' rendere sicuro lo strumento per il paziente: e' proteggere l'operatore che dovra' maneggiarlo e lavarlo. E' un obbligo previsto dalla normativa sul rischio biologico."),

 (10,"chiaro",0,"I metodi di sterilizzazione. Il vapore saturo sotto pressione, in autoclave, e' il metodo di prima scelta per tutto cio' che resiste al calore: economico, rapido, senza residui tossici."),
 (10,"chiaro",0,"I cicli piu' comuni sono a centoventuno o a centotrentaquattro gradi, con tempi piu' brevi alla temperatura piu' alta: piu' caldo, meno minuti. Vapore, pressione, temperatura e tempo sono i quattro parametri del ciclo."),
 (10,"chiaro",0,"Per i materiali termolabili: l'ossido di etilene, efficace ma tossico, che richiede una lunga aerazione; il gas plasma di perossido di idrogeno, a bassa temperatura e senza residui; l'acido peracetico per alcuni dispositivi."),

 (11,"chiaro",0,"Come si sa che la sterilizzazione e' avvenuta? Con gli indicatori. Fisici: i parametri di temperatura, pressione e tempo registrati dall'autoclave."),
 (11,"chiaro",0,"Chimici: sostanze che cambiano colore se esposte alle condizioni richieste. Dal nastro sulla confezione, che dice solo che il pacco e' passato in autoclave, agli indicatori piu' complessi."),
 (11,"chiaro",0,"Fra questi il test di Bowie-Dick, eseguito ogni giorno, prima del primo ciclo, per verificare la rimozione dell'aria nelle autoclavi a vuoto: se resta aria, il vapore non arriva ovunque."),
 (11,"chiaro",0,"Biologici: spore di microrganismi molto resistenti, Geobacillus stearothermophilus per il vapore, che dopo il ciclo non devono crescere. Sono i piu' affidabili."),

 (12,"chiaro",0,"Un'attenzione che i quiz amano. Il nastro indicatore esterno che cambia colore indica soltanto che la confezione e' stata esposta al processo di sterilizzazione, cioe' che e' entrata in autoclave."),
 (12,"profondo",1.2,"[serious] Non garantisce che il contenuto sia sterile. Per questo esistono gli indicatori interni, dentro la confezione, e la verifica dei parametri del ciclo. Il nastro dice: e' passato. Non dice: e' sterile."),

 (13,"chiaro",0,"La conservazione, dopo la centrale. Il materiale sterile si ripone in un luogo asciutto, pulito, chiuso, sollevato dal pavimento e lontano da fonti di umidita' e di calore."),
 (13,"chiaro",0,"Oggi si parla di sterilita' evento-correlata: la confezione resta sterile finche' un evento, una lacerazione, l'umidita', una caduta, non la compromette. Non e' la data a decidere, e' l'evento."),
 (13,"chiaro",0,"Quindi prima dell'uso si verifica: integrita' dell'involucro, assenza di umidita' o macchie, viraggio dell'indicatore, data e lotto. E si usa prima il materiale sterilizzato prima: il principio FIFO."),
 (13,"chiaro",0,"Una confezione caduta a terra o bagnata non e' piu' sterile, qualunque data porti. Si scarta, e si rimanda in centrale."),

 (14,"chiaro",0,"La tracciabilita' collega ogni confezione al suo lotto, al ciclo, all'autoclave e all'operatore, e, tramite etichetta applicata in cartella o nel registro operatorio, al paziente su cui e' stata usata."),
 (14,"chiaro",0,"Serve a una cosa molto concreta: se un ciclo risulta non conforme, si sa esattamente quali pazienti sono stati esposti e quali confezioni vanno ritirate. Senza tracciabilita', un ciclo fallito e' un ciclo invisibile."),

 (15,"chiaro",0,"Un cenno all'ambiente, che e' un serbatoio. Le superfici da trattare con piu' attenzione sono quelle ad alto contatto: sponde del letto, campanello, pompe infusionali, maniglie, tastiere."),
 (15,"chiaro",0,"Anche qui: prima la pulizia, poi la disinfezione; si procede dal pulito allo sporco e dall'alto verso il basso. E con il Clostridioides difficile serve una disinfezione sporicida, come nella lezione quattro punto tre."),

 (16,"chiaro",0,"E una regola netta: un dispositivo monouso e' monouso. Il suo riutilizzo, anche dopo averlo «disinfettato», non e' consentito, perche' il fabbricante non ne garantisce la sicurezza dopo il primo uso."),

 (17,"chiaro",0,"Nelle aziende del servizio sanitario veneto la sterilizzazione e' concentrata in centrali di sterilizzazione aziendali, spesso con tracciabilita' informatizzata dei set chirurgici fino al paziente."),
 (17,"chiaro",0,"Il riprocessamento degli endoscopi segue procedure dedicate, e la sanificazione ambientale e' regolata da capitolati e protocolli con controlli periodici. Per il candidato conta saper dire chi fa che cosa."),

 (18,"chiaro",0,"Ricapitoliamo. Senza detersione, niente disinfezione. Spaulding: critico, sterilizzazione; semicritico, disinfezione di alto livello; non critico, basso livello. L'autoclave a vapore e' il metodo di prima scelta."),
 (18,"chiaro",0,"[warm] Gli indicatori biologici sono i piu' affidabili, e il nastro esterno non garantisce la sterilita' del contenuto. La sterilita' e' evento-correlata: si verifica la confezione prima di ogni uso."),
 (18,"chiaro",0,"Il reparto decontamina e conserva, la centrale sterilizza e traccia. Nella prossima lezione, la minaccia che rende tutto questo ancora piu' urgente: la resistenza agli antibiotici. A tra poco."),
]

CAPITOLI = {1:"Apertura",2:"Le definizioni",3:"Prima la detersione",4:"Spaulding",5:"Gli esempi",
 6:"I livelli di disinfezione",7:"Gli antisettici",8:"Il ciclo",9:"La decontaminazione",
 10:"I metodi di sterilizzazione",11:"Gli indicatori",12:"Il nastro",13:"La conservazione",14:"La tracciabilita'",
 15:"L'ambiente",16:"Il monouso",17:"In Veneto",18:"Chiusura"}

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
