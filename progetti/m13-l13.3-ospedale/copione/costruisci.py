# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Nel modulo dieci hai imparato che per l'infarto, l'ictus e il trauma e' il tempo a decidere l'esito. In questa lezione vediamo come il Veneto ha organizzato la risposta a queste emergenze."),
 (1,"chiaro",0,"Tre parti: la rete ospedaliera hub and spoke, il SUEM centodiciotto e le reti cliniche regionali. E' la traduzione veneta del DM settanta del duemilaquindici, che hai visto nella lezione dodici punto tre."),

 (2,"chiaro",0,"Lo strumento con cui la Regione disegna la rete ospedaliera sono le schede di dotazione ospedaliera, approvate con deliberazione della Giunta regionale. Sono il punto di partenza di tutto il resto."),
 (2,"chiaro",0,"Per ogni ospedale le schede stabiliscono quattro cose: la classificazione, le unita' operative, i posti letto, e le funzioni che quell'ospedale svolge all'interno della rete."),
 (2,"chiaro",0,"Attuano gli standard del DM settanta e vengono aggiornate periodicamente. Accanto ci sono le schede di dotazione territoriale, per il territorio. E la rete hub and spoke e' uno dei temi del Piano Socio Sanitario Regionale."),

 (3,"chiaro",0,"Il modello e' hub and spoke. Gli hub sono gli ospedali con funzioni di alta specialita' e di riferimento: le Aziende Ospedaliere Universitarie di Padova e di Verona, e i grandi ospedali provinciali."),
 (3,"chiaro",0,"Gli spoke sono gli ospedali di rete, collegati funzionalmente agli hub per i casi complessi. Un esempio vicino a noi: a Padova l'Azienda Ospedale-Universita' fa da hub, gli ospedali delle ULSS fanno da spoke."),
 (3,"chiaro",0,"Ci sono poi i presidi nelle zone particolarmente disagiate, come la montagna, la laguna e il delta, dove la distanza dall'hub impone soluzioni specifiche. Pensa alla montagna bellunese, o al delta polesano."),
 (3,"chiaro",0,"E le strutture private accreditate sono integrate nella rete. Ospedali delle ULSS, aziende universitarie e privati accreditati lavorano cosi' dentro un unico disegno, quello delle schede regionali."),

 (4,"chiaro",0,"Il SUEM centodiciotto, il Servizio Urgenza Emergenza Medica. E' organizzato in centrali operative su base provinciale: in Veneto le centrali sono sette."),
 (4,"chiaro",0,"I mezzi: mezzi di soccorso di base e avanzati, automediche, l'elisoccorso, e perfino le idroambulanze per la laguna di Venezia, dove il soccorso arriva via acqua."),
 (4,"chiaro",0,"Il SUEM dispone anche di nuclei specializzati per gli eventi NBCR, cioe' nucleari, biologici, chimici e radiologici: eventi rari, che richiedono competenze e dotazioni dedicate."),
 (4,"chiaro",0,"In centrale e' l'infermiere ad attribuire il codice di priorita' alla chiamata, con un sistema regionale di dispatch. Da quel codice dipende il mezzo che viene inviato."),
 (4,"chiaro",0,"E c'e' un coordinamento regionale dell'emergenza urgenza, il CREU, che uniforma le procedure e i sistemi delle centrali in tutta la regione."),

 (5,"chiaro",0,"Il NUE centododici, il Numero Unico di Emergenza europeo. La Regione ha firmato con il Ministero dell'Interno un protocollo d'intesa per attuarlo in Veneto."),
 (5,"chiaro",0,"Il modello prevede centrali uniche di risposta, che ricevono le chiamate e le smistano al centodiciotto, ai vigili del fuoco o alle forze dell'ordine."),
 (5,"chiaro",0,"Le centrali SUEM sono state dotate di un software unificato, predisposto per questa integrazione. Il passaggio e' progressivo: prima della prova verifica lo stato di attivazione del NUE centododici."),

 (6,"chiaro",0,"La rete per l'infarto. Il centodiciotto esegue l'ECG a dodici derivazioni direttamente sul territorio, prima del trasporto, e lo teletrasmette al cardiologo."),
 (6,"chiaro",0,"Se si tratta di uno STEMI, il paziente viene portato direttamente al centro con emodinamica, saltando il pronto soccorso dell'ospedale piu' vicino, se questo non ha l'emodinamica."),
 (6,"chiaro",0,"L'obiettivo e' ridurre il tempo alla riperfusione, come hai visto nella lezione otto punto uno. Ogni passaggio che si salta e' tempo guadagnato."),

 (7,"chiaro",0,"La seconda rete tempo-dipendente e' la rete ictus. Le stroke unit, presenti nelle aziende. E i centri hub, quelli in grado di eseguire la trombectomia meccanica."),
 (7,"chiaro",0,"I centri spoke eseguono la trombolisi, e si collegano agli hub con il teleconsulto. Cosi' anche l'ospedale piu' piccolo, e piu' lontano, resta collegato alla rete."),
 (7,"chiaro",0,"E un percorso preospedaliero, in cui il centodiciotto pre-allerta l'ospedale e centralizza il paziente. Il principio e': il tempo e' cervello. E' la rete della lezione otto punto sei."),

 (8,"chiaro",0,"La terza e' la rete trauma. Prevede due livelli: i centri traumatologici di riferimento, ad alta specializzazione, e gli ospedali di rete."),
 (8,"chiaro",0,"Il politrauma grave viene centralizzato il prima possibile, spesso con l'elisoccorso, verso il centro di riferimento, quello che dispone del trauma team."),
 (8,"chiaro",0,"E le specialita' necessarie: la neurochirurgia, la chirurgia toracica, il centro ustioni. E' la rete della lezione dieci punto sette."),

 (9,"chiaro",0,"Le altre reti cliniche regionali. La Rete Oncologica Veneta, la ROV, con i percorsi diagnostico-terapeutici per tipo di tumore e i gruppi multidisciplinari."),
 (9,"chiaro",0,"La rete dei punti nascita e del trasporto neonatale. E la rete trapianti, coordinata dal Centro Regionale Trapianti, con il procurement degli organi."),
 (9,"chiaro",0,"La rete per le malattie rare, con un coordinamento regionale. La rete di terapia del dolore e cure palliative, prevista dalla legge trentotto del duemiladieci. E la rete pediatrica."),

 (10,"chiaro",0,"L'infermiere e' presente in ogni nodo di queste reti. In centrale centodiciotto e sui mezzi di soccorso. E al triage, dove attiva i percorsi tempo-dipendenti."),
 (10,"chiaro",0,"Come case manager nella rete oncologica. Come coordinatore infermieristico del procurement degli organi. E in stroke unit e in emodinamica."),
 (10,"chiaro",0,"Una rete funziona se ogni nodo conosce il proprio ruolo e i propri tempi. E all'orale vale lo stesso: non solo che cos'e' la rete, ma come la usi da infermiere."),

 (11,"chiaro",0,"[curious] Il caso d'esame. Uomo di cinquantotto anni, dolore toracico da quaranta minuti, in un paese di montagna. Come si attiva la rete?"),
 (11,"chiaro",0,"Prima la chiamata al centodiciotto. La centrale assegna il codice di priorita' e invia il mezzo adeguato: in un paese di montagna, eventualmente l'elisoccorso."),
 (11,"chiaro",0,"Sul posto si esegue l'ECG a dodici derivazioni e lo si teletrasmette. Se e' uno STEMI, il paziente viene centralizzato direttamente al centro con emodinamica, che viene pre-allertato."),
 (11,"chiaro",0,"Il percorso salta i passaggi che non servono, per guadagnare tempo. Ed e' una delle domande d'orale piu' probabili del modulo: come funziona la rete per l'infarto o per l'ictus."),

 (12,"chiaro",0,"[thoughtful] Anche le criticita' vanno conosciute, per una risposta matura all'orale. La prima e' la carenza di personale, soprattutto in pronto soccorso e nelle aree periferiche."),
 (12,"chiaro",0,"Poi il sovraffollamento e il boarding. E la difficolta' di garantire servizi negli ospedali di montagna e nelle aree turistiche, con i loro picchi stagionali."),
 (12,"chiaro",0,"Il tema di fondo e' l'equilibrio fra centralizzazione, che concentra le competenze, e prossimita', che avvicina i servizi alle persone. Nessuna delle due, da sola, basta."),

 (13,"chiaro",0,"Le aziende ospedaliere universitarie: l'Azienda Ospedale-Universita' di Padova e l'Azienda Ospedaliera Universitaria Integrata di Verona. Integrano assistenza, didattica e ricerca."),
 (13,"chiaro",0,"Sono sedi dei corsi di laurea, anche in Infermieristica, insieme alle Universita' di Padova e di Verona. E svolgono funzioni regionali di alta specialita'."),
 (13,"chiaro",0,"E poi lo IOV, l'Istituto Oncologico Veneto. E' un IRCCS, un Istituto di Ricovero e Cura a Carattere Scientifico: unisce la ricerca e la cura in oncologia."),

 (14,"chiaro",0,"La tabella. Le schede di dotazione ospedaliera, approvate con delibera di Giunta. Il modello hub and spoke. L'AOU di Padova, l'AOUI di Verona, lo IOV."),
 (14,"chiaro",0,"Il SUEM centodiciotto: sette centrali provinciali, il dispatch infermieristico, l'elisoccorso, le idroambulanze, il CREU. E il NUE centododici, con il protocollo d'intesa firmato con il Ministero dell'Interno."),
 (14,"chiaro",0,"Le reti: infarto, con l'ECG teletrasmesso e l'accesso diretto all'emodinamica; ictus, con gli hub per la trombectomia; trauma; ROV; punti nascita; trapianti; malattie rare; dolore e cure palliative."),

 (15,"profondo",1.2,"[serious] La frase della lezione: non l'ospedale piu' vicino, ma l'ospedale giusto. E' il principio di tutte le reti tempo-dipendenti: infarto, ictus, trauma."),

 (16,"chiaro",0,"[warm] Nella prossima lezione usciamo dall'ospedale: il distretto, le medicine di gruppo integrate, gli ospedali di comunita' e l'attuazione del DM settantasette in Veneto."),
 (16,"chiaro",0,"Dopo la rete dell'emergenza, la rete della prossimita', in cui la casa e' il primo luogo di cura. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"Le schede di dotazione ospedaliera",3:"Il modello hub and spoke veneto",4:"Il SUEM 118",5:"Il NUE 112 in Veneto",
 6:"La rete per l'infarto",7:"La rete ictus",8:"La rete trauma",9:"Le altre reti cliniche",10:"L'infermiere nelle reti",
 11:"Il caso d'esame",12:"Le criticita'",13:"Le aziende ospedaliere universitarie",14:"La tabella",15:"La frase della lezione",16:"Chiusura"}

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
