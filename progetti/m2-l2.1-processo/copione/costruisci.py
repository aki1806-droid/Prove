# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Apriamo il secondo modulo. Se il modulo 1 era la grammatica della professione, questo e' la sintassi: il metodo con cui si costruisce una frase assistenziale che regge."),
 (1,"chiaro",0,"E ti dico subito perche' questa lezione e' fra le piu' redditizie del corso: il processo di assistenza e' l'ossatura di ogni risposta a caso clinico. Non un argomento fra gli altri: la forma che tutti gli altri prendono."),
 (1,"tenue",0,"Nel concorso di Azienda Zero i casi non arrivano solo nella prova pratica: arrivano anche nella prova scritta, come quesiti a risposta sintetica. Chi padroneggia questo schema ha una struttura pronta per qualunque traccia."),

 (2,"chiaro",0,"Quattro traguardi. Le cinque fasi del processo, e perche' e' ciclico. La diagnosi infermieristica, con la struttura PES, la differenza dalla diagnosi medica e il problema collaborativo."),
 (2,"chiaro",0,"Poi come si scrive un obiettivo e come si stabiliscono le priorita'. E infine lo schema in cinque passi per rispondere a un caso clinico, che userai per tutto il resto del corso."),

 (3,"chiaro",0,"Il processo di assistenza infermieristica e' il metodo sistematico e razionale con cui l'infermiere pianifica ed eroga l'assistenza. Non e' un adempimento burocratico."),
 (3,"chiaro",0,"E' la traduzione operativa dell'autonomia professionale. E non lo dico io: la legge 251 del 2000 afferma che le professioni infermieristiche operano utilizzando metodologie di pianificazione per obiettivi."),
 (3,"profondo",1.2,"E' la stessa autonomia di cui abbiamo parlato nel modulo 1, vista dal lato del metodo. Il metodo non e' un vincolo all'autonomia: ne e' la prova. Chi decide deve poter dire su quali dati ha deciso."),

 (4,"chiaro",0,"Cinque fasi, e conviene impararle come una frase sola. Accertamento. Diagnosi infermieristica. Pianificazione. Attuazione. Valutazione. Raccolgo, interpreto, decido, faccio, verifico."),
 (4,"chiaro",0,"E nota la freccia che torna indietro: il processo e' ciclico. La valutazione rialimenta l'accertamento, e il piano si modifica di conseguenza. Non e' una scaletta che si percorre una volta sola."),
 (4,"tenue",0,"Nei quiz la domanda tipica chiede l'ordine, oppure quale fase manca da un elenco. La fase che sparisce piu' spesso e' proprio la valutazione: tienila d'occhio, e' anche quella che vale piu' punti."),

 (5,"chiaro",0,"Una precisazione che evita un dubbio in sede d'esame. Alcuni modelli anglosassoni presentano il processo in sei fasi, separando i risultati attesi dalla pianificazione degli interventi."),
 (5,"chiaro",0,"Nei concorsi italiani lo standard resta cinque. Se un quiz ne propone sei, controlla se l'elenco distingue risultati e interventi: ma la risposta attesa e' quasi sempre cinque."),

 (6,"chiaro",0,"Prima fase: l'accertamento, cioe' la raccolta sistematica e continua dei dati. E attenzione alla parola continua: non e' un momento iniziale che si esaurisce all'ingresso."),
 (6,"chiaro",0,"Si ripete a ogni turno e a ogni variazione clinica. I dati si distinguono in soggettivi, cio' che la persona riferisce: ho dolore quando mi giro nel letto. E oggettivi: cio' che tu osservi o misuri."),
 (6,"chiaro",0,"Pressione 150 su 95, cute arrossata al sacro. E poi in primari, che vengono dalla persona, e secondari: familiari, documentazione, altri professionisti. Il dato secondario va sempre attribuito alla fonte."),

 (7,"chiaro",0,"Ed ecco l'errore che distingue una risposta professionale da una generica: confondere il dato con l'interpretazione. Il paziente e' disidratato non e' un dato: e' una conclusione."),
 (7,"tenue",1.2,"I dati sono mucose asciutte, plica cutanea persistente, diuresi 350 millilitri in 24 ore, riferisce di bere poco. Nella prova scritta, prima i dati e poi la conclusione: vale punti immediati."),

 (8,"chiaro",0,"Seconda fase. La diagnosi infermieristica e' il giudizio clinico sulle risposte della persona, della famiglia o della comunita' a problemi di salute o a processi vitali, reali o potenziali."),
 (8,"chiaro",0,"Il confronto con la diagnosi medica e' la domanda piu' chiesta del modulo. La diagnosi medica riguarda il processo patologico, la formula il medico, e resta stabile finche' dura la malattia."),
 (8,"chiaro",0,"La diagnosi infermieristica riguarda la risposta della persona, la formula l'infermiere, e puo' cambiare di ora in ora. Ictus ischemico e' medica. Compromissione della mobilita' e' infermieristica."),

 (9,"chiaro",0,"Come si scrive una diagnosi? Con la struttura PES. P, problem: l'etichetta diagnostica. E, etiology: i fattori correlati, correlato a. S, signs and symptoms: che si manifesta con."),
 (9,"chiaro",0,"Un esempio completo. Compromissione della mobilita', correlata a dolore post operatorio e timore di cadere, che si manifesta con rifiuto di alzarsi dal letto e bisogno di aiuto nei trasferimenti."),
 (9,"profondo",1.2,"Tre pezzi: il problema, la causa, i segni. Se ne manca uno la diagnosi e' incompleta. La causa e' la parte che si dimentica: senza di lei l'intervento non ha bersaglio."),

 (10,"chiaro",0,"Distinzione fondamentale. La diagnosi reale si scrive con PES, perche' il problema c'e' e ha segni. La diagnosi di rischio si scrive con PE: solo problema e fattori di rischio, senza segni e sintomi."),
 (10,"chiaro",0,"Perche' il problema non si e' ancora manifestato. Esempio: rischio di lesione da pressione, correlato a immobilita' e Braden 12. Niente che si manifesta con: se ci fossero segni, la lesione ci sarebbe gia'."),

 (11,"chiaro",0,"Questo genera il distrattore classico del modulo. Se un quiz propone rischio di caduta correlato a instabilita', che si manifesta con caduta avvenuta, la formulazione e' sbagliata."),
 (11,"tenue",1.2,"Se la caduta e' avvenuta, il problema e' reale, non di rischio. Ogni volta che vedi un che si manifesta con dentro una diagnosi di rischio, hai trovato l'opzione errata."),

 (12,"chiaro",0,"Non tutto cio' che l'infermiere gestisce e' una diagnosi infermieristica. Esistono i problemi collaborativi: complicanze fisiologiche che l'infermiere sorveglia, e che gestisce insieme al medico."),
 (12,"chiaro",0,"Si enunciano cosi': complicanza potenziale, emorragia post operatoria. La differenza sta nell'azione prevalente: nella diagnosi infermieristica tratti, nel problema collaborativo sorvegli e attivi."),

 (13,"chiaro",0,"Terza fase, la pianificazione. E prima cosa, la distinzione che vale una domanda in ogni prova: l'obiettivo descrive il risultato atteso nella persona assistita, non l'attivita' dell'infermiere."),
 (13,"chiaro",0,"Mobilizzare il paziente tre volte al giorno e' un intervento. Il paziente mantiene la stazione eretta per due minuti con un ausilio entro 48 ore e' un obiettivo. Guarda il soggetto della frase."),

 (14,"chiaro",0,"Sei criteri. Centrato sulla persona: il soggetto e' lei. Specifico e osservabile, non generico. Misurabile, con un indicatore. Realistico rispetto alle condizioni della persona e alle risorse che hai."),
 (14,"chiaro",0,"Condiviso con la persona, perche' un obiettivo che lei non accetta non si raggiunge. E temporalizzato: entro quando. A breve o a lungo termine, purche' il tempo sia dichiarato."),

 (15,"chiaro",0,"Pianificare significa anche scegliere l'ordine. Tre criteri, in sequenza. Primo, la sopravvivenza: vie aeree, respiro, circolo. Un problema che minaccia la vita precede sempre un problema di comfort."),
 (15,"chiaro",0,"Secondo, la gerarchia dei bisogni: fisiologici e di sicurezza prima di quelli relazionali. Con un'avvertenza: nella pratica il dolore intenso e l'ansia grave diventano prioritari."),
 (15,"chiaro",0,"Perche' impediscono tutto il resto. Terzo, la percezione della persona: a parita' di urgenza clinica, ha priorita' il problema che lei vive come piu' grave. E' il criterio che quasi nessuno cita."),

 (16,"chiaro",0,"[serious] Quale intervento ha priorita' e' la domanda piu' frequente della prova pratica, e il ragionamento e' sempre lo stesso. C'e' un rischio immediato per la vita? Se si', ABC."),
 (16,"chiaro",0,"Se no, c'e' un rischio di danno a breve? Caduta imminente, stravaso, sanguinamento: agisci li'. Se no, guarda l'impatto sulla persona e quello che il piano prevede gia'. In quest'ordine, sempre."),
 (16,"profondo",1.2,"E tieni a mente una cosa che salva molte risposte: valutare non e' perdere tempo. Spesso l'opzione corretta e' rilevo i parametri, o valuto la situazione, e non un intervento impulsivo che sembra piu' attivo."),

 (17,"chiaro",0,"Quarta fase, l'attuazione. Eroghi gli interventi, li adatti alla situazione reale, coordini l'equipe, attribuisci al personale di supporto le attivita' compatibili, e registri."),
 (17,"chiaro",0,"Gli interventi sono di tre tipi: autonomi, su prescrizione, collaborativi. Quinta fase, la valutazione: confronti il risultato con l'obiettivo, con l'indicatore che avevi scelto, e decidi."),
 (17,"chiaro",0,"Raggiunto, parzialmente raggiunto, non raggiunto. E in tutti e tre i casi il piano si aggiorna: chiudi la diagnosi risolta, correggi l'obiettivo irrealistico, cambi gli interventi inefficaci."),

 (18,"chiaro",0,"E qui il consiglio piu' prezioso di questa lezione. Nei casi d'esame la risposta completa si chiude sempre con la valutazione. Rivaluto dopo 30 minuti. Rimisuro l'NRS. Verifico la ripresa della diuresi."),
 (18,"tenue",1.2,"Chi finisce l'elenco degli interventi senza dire come verifichera' l'esito consegna una risposta incompleta, anche se clinicamente perfetta. E' un punto che si perde per distrazione, non per ignoranza."),

 (19,"chiaro",0,"Ti lascio lo schema da usare su qualunque traccia, anche domani. Uno: che cosa so e che cosa mi manca. Due: qual e' il problema prioritario, e con quale criterio l'ho scelto: e il criterio va detto."),
 (19,"chiaro",0,"Tre: qual e' l'obiettivo, centrato sulla persona, misurabile, con un tempo. Quattro: quali interventi, con le cautele. Cinque: come valuto, con quale indicatore e quando."),
 (19,"chiaro",0,"[warm] Vale anche quando l'argomento clinico non e' il tuo piu' forte: una risposta strutturata con qualche contenuto in meno vale piu' di un elenco disordinato di nozioni corrette. A tra poco."),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1:"Apertura",2:"Obiettivi",3:"Che cos'e'",4:"Le cinque fasi",
 5:"Cinque o sei fasi",6:"L'accertamento",7:"Dato o interpretazione",
 8:"La diagnosi infermieristica",9:"La struttura PES",10:"Reale e di rischio",
 11:"Il distrattore",12:"Il problema collaborativo",13:"L'obiettivo",
 14:"I criteri dell'obiettivo",15:"Le priorita'",16:"Quale intervento",
 17:"Attuazione e valutazione",18:"La fase dimenticata",19:"Lo schema e chiusura"}
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
    if len(b["text"])>225: errori.append(f'{b["id"]}: {len(b["text"])} car, blocco troppo lungo')
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

acc=0; stacco=None
for i,b in enumerate(blocchi):
    acc+=len(b["text"])+1
    if acc>tot/2 and stacco is None and i+1<len(blocchi) and b["capitolo"]!=blocchi[i+1]["capitolo"]:
        stacco=b["id"]; a=acc
print(f"\nstacco tracce dopo {stacco}:  chunkA {a} car  ·  chunkB {tot-a} car   (limite 5000)")
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
