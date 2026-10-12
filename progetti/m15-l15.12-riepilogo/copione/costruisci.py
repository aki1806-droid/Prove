# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Chiudiamo il modulo dei casi clinici in tre tempi. Prima ricapitoliamo lo schema, e le frasi chiave dei dieci casi che abbiamo risolto insieme."),
 (1,"chiaro",0,"Poi sei casi lampo, su situazioni che non abbiamo sviluppato per esteso ma che possono comparire all'esame: per ognuno, il ragionamento essenziale in meno di un minuto. Infine, le tracce piu' probabili, e come allenarsi."),

 (2,"chiaro",0,"Lo schema, un'ultima volta. Accertamento mirato, con l'ABCDE se il paziente e' instabile. Priorita': prima la vita, poi l'acuto, poi i rischi, poi i bisogni e l'educazione."),
 (2,"chiaro",0,"Obiettivi misurabili. Interventi autonomi, collaborativi, con il secondo prescrizione, e attribuiti. Poi la valutazione, la comunicazione, la documentazione e la continuita'."),
 (2,"chiaro",0,"E le sei domande di emergenza. E' stabile? Che cosa puo' peggiorare? Che cosa faccio subito? Chi avviso? Che cosa preparo e insegno? Come documento?"),

 (3,"chiaro",0,"Le frasi dei dieci casi, da ricordare come ancore. Sepsi: la confusione nuova e' un parametro vitale. Chirurgia: la giornata postoperatoria e' meta' della risposta. Infarto: dieci minuti per l'ECG, pochi secondi per lo shock."),
 (3,"chiaro",0,"BPCO: una saturazione perfetta non e' un paziente perfetto. Scompenso: la crisi si cura in un'ora, la ricaduta si previene in una settimana. Anziana: le sponde la fanno cadere da piu' in alto."),
 (3,"chiaro",0,"Diabete: ogni ipoglicemia ha una causa. Oncologia: la febbre e' un'emergenza anche se dice di stare bene. Terapia: fermarsi a controllare e' sicurezza. Turno: si attribuisce un'attivita', non si delega la responsabilita'."),

 (4,"chiaro",0,"[curious] Caso lampo uno. Alle undici un paziente in chirurgia non riesce piu' a parlare bene, e ha la bocca storta. Alle dieci era normale."),
 (4,"chiaro",0,"FAST positiva: sospetto ictus. Annoti l'ultima volta visto in benessere, le dieci. Attivi subito il medico e il percorso stroke. Glicemia, parametri, GCS. Nulla per bocca. Un accesso venoso."),
 (4,"chiaro",0,"E un'informazione cruciale da comunicare: se il paziente e' appena stato operato, o assume anticoagulanti, cambia l'indicazione alla trombolisi. Lezione otto punto sei."),

 (5,"chiaro",0,"Caso lampo due. Cinque minuti dopo l'inizio di un antibiotico endovena: orticaria, gonfiore delle labbra, sibili, pressione ottanta su cinquanta. E' un'anafilassi."),
 (5,"chiaro",0,"Interrompi l'infusione mantenendo l'accesso, e chiami aiuto. Adrenalina intramuscolo: zero virgola cinque milligrammi nell'adulto, nella faccia anterolaterale della coscia, secondo protocollo, ripetibile dopo cinque minuti."),
 (5,"chiaro",0,"Ossigeno, posizione supina con le gambe sollevate, o seduta se prevale la dispnea, e liquidi. Poi registri l'allergia, e segnali la reazione alla farmacovigilanza."),

 (6,"chiaro",0,"Caso lampo tre. In pronto soccorso pediatrico, un bambino di due anni con febbre ha una crisi convulsiva generalizzata. I genitori urlano."),
 (6,"chiaro",0,"Proteggi il bambino dai traumi. Niente in bocca, non trattieni i movimenti, e cronometri. Al termine: posizione laterale di sicurezza, ossigeno, glicemia."),
 (6,"chiaro",0,"Se la crisi dura oltre cinque minuti, una benzodiazepina secondo protocollo, per esempio il midazolam per via buccale. E rassicuri e informi i genitori: per loro sono i minuti piu' lunghi della vita."),

 (7,"chiaro",0,"Caso lampo quattro. Una donna di trentaquattro anni, alla trentaquattresima settimana, arriva con cefalea intensa, disturbi visivi, dolore epigastrico, pressione centosessantacinque su centodieci."),
 (7,"chiaro",0,"Sospetta preeclampsia grave. Avvisi subito il medico e l'ostetrica. Decubito laterale sinistro, ambiente tranquillo, accesso venoso, prelievi, ricerca della proteinuria. E il monitoraggio del feto."),
 (7,"chiaro",0,"Se si somministra il magnesio solfato, sorvegli i riflessi, la frequenza respiratoria e la diuresi, con il calcio gluconato disponibile come antidoto. Lezione undici punto quattro."),

 (8,"chiaro",0,"Caso lampo cinque. Un giovane uomo in pronto soccorso e' agitato, dice di essere perseguitato, rifiuta qualsiasi cura. I familiari chiedono il ricovero obbligatorio."),
 (8,"chiaro",0,"Sicurezza e de-escalation. Si escludono le cause organiche: glicemia, ipossia, sostanze, astinenza. E si spiega ai familiari che il TSO non lo decide l'infermiere."),
 (8,"chiaro",0,"Richiede i tre requisiti e una procedura precisa: la proposta del medico, la convalida, l'ordinanza del sindaco, il giudice tutelare. La contenzione resta una misura estrema. Lezione undici punto tre."),

 (9,"chiaro",0,"Caso lampo sei. Un paziente oncologico terminale, incosciente, ha un respiro rumoroso e irregolare. La figlia, angosciata, chiede di aspirarlo. E' il rantolo terminale."),
 (9,"chiaro",0,"Posizione laterale, testata sollevata, antisecretivi secondo prescrizione, igiene del cavo orale. L'aspirazione profonda di routine non e' raccomandata: e' traumatica e poco efficace."),
 (9,"chiaro",0,"E soprattutto spieghi alla figlia che cosa sta accadendo, e che di solito il paziente non ne soffre. La tua presenza conta quanto i farmaci. Lezione undici punto cinque."),

 (10,"chiaro",0,"Le dieci tracce piu' probabili, secondo l'analisi dei contenuti del programma. Il paziente che si deteriora in reparto. La sospetta sepsi. Il dolore toracico. Una complicanza postoperatoria in una giornata indicata."),
 (10,"chiaro",0,"Il paziente con BPCO in ossigeno. La caduta di un anziano. L'ipoglicemia. La reazione trasfusionale. Un errore di terapia intercettato. La dimissione di un paziente fragile. Per ognuna, un caso svolto e una risposta modello."),

 (11,"chiaro",0,"La prova pratica puo' chiedere anche la descrizione di una procedura. La struttura: l'indicazione; la preparazione di paziente e materiale, con igiene delle mani, identificazione e consenso; l'esecuzione, con i punti critici."),
 (11,"chiaro",0,"Poi controllo e smaltimento, documentazione e sorveglianza. Le piu' probabili: cateterismo vescicale, sondino naso-gastrico, emocoltura, CVC, trasfusione, ferita chirurgica, broncoaspirazione. Moduli tre, sei e otto."),

 (12,"chiaro",0,"Gli errori ricorrenti di tutto il modulo. Non leggere il dato anomalo. Elencare senza priorita'. Interventi generici. Dimenticare il secondo prescrizione. Dimenticare la sicurezza."),
 (12,"chiaro",0,"Dimenticare la comunicazione e la documentazione. Non cercare la causa. Dimenticare la persona e la famiglia. Non pensare alla continuita'."),

 (13,"chiaro",0,"Un consiglio pratico: come gestire il tempo nella prova scritta. Leggi la traccia due volte e sottolinea i dati anomali: uno-due minuti. Una scaletta con i cinque passi: due-tre minuti. La scrittura: otto-dieci minuti."),
 (13,"chiaro",0,"E una rilettura finale di uno-due minuti, con tre domande. Le priorita' sono chiare? C'e' il secondo prescrizione? Ci sono sicurezza, comunicazione e documentazione?"),
 (13,"chiaro",0,"Rispetta lo spazio indicato, scrivi in modo leggibile, con frasi brevi. Una risposta completa e ordinata vale piu' di una lunga e confusa."),

 (14,"chiaro",0,"[thoughtful] Tre domande che collegano i casi. Prima: che cosa hanno in comune sepsi e neutropenia febbrile? Sono emergenze infettive tempo-dipendenti, con l'antibiotico entro un'ora."),
 (14,"chiaro",0,"Le emocolture prima, senza ritardarlo, e segni che possono essere sfumati. Seconda: perche' si misura sempre la glicemia? Perche' un'ipoglicemia puo' simulare un ictus, un delirium, un'alterazione della coscienza."),
 (14,"chiaro",0,"Ed e' l'unica causa che si corregge in pochi minuti. Terza: perche' gli orari ritornano in quasi tutti i casi? Perche' nelle condizioni tempo-dipendenti il tempo e' un dato clinico."),
 (14,"chiaro",0,"L'ora di insorgenza, la prima dose, lo shock, la trasfusione. Documentarlo garantisce cure corrette, continuita' e tutela professionale."),

 (15,"chiaro",0,"Come allenarsi. Una traccia al giorno, scritta a mano, in quindici righe e in quindici minuti, come all'esame. Poi il confronto con la risposta modello e con lo schema."),
 (15,"chiaro",0,"Lo scambio con un collega: si impara molto anche correggendo. Le risposte per l'orale, ad alta voce, in due o tre minuti. I casi in cui hai sbagliato la priorita'. E il test del modulo."),

 (16,"chiaro",0,"Il quaderno dei casi. Per ogni caso, una pagina: lo scenario in due righe, il dato anomalo, le priorita', cinque interventi chiave, l'errore da evitare, la frase del caso, i riferimenti ai moduli."),
 (16,"chiaro",0,"In tutto, dieci casi e sei casi lampo: sedici pagine, da ripassare negli ultimi giorni prima della prova."),

 (17,"chiaro",0,"Che cosa cerca il commissario in una risposta a un caso? La sicurezza del paziente. Un ragionamento ordinato. Una competenza tecnica precisa. La consapevolezza della responsabilita' e dei limiti del proprio ruolo."),
 (17,"chiaro",0,"La comunicazione. L'attenzione alla persona. E la conoscenza del contesto, cioe' della rete in cui lavorerai. Se la tua risposta mostra queste sette cose, hai fatto il tuo lavoro."),

 (18,"profondo",1.2,"[serious] La frase del modulo: non si studia per sapere tutto, si studia per sapere che cosa fare prima. La priorita' e' la vera competenza dell'infermiere."),

 (19,"chiaro",0,"[warm] Nel prossimo modulo, i casi clinici avanzati: area medica, chirurgica e critica. Si apre con l'ictus, seguito questa volta per intero, dal primo segno in reparto alla riabilitazione."),
 (19,"chiaro",0,"Poi l'emorragia digestiva, l'iperkaliemia, l'embolia polmonare, il politrauma, l'ustionato, la chetoacidosi, fino al paziente ventilato. Lo schema resta quello di questo modulo. Ci vediamo li'."),
]
CAPITOLI = {1:"Apertura",2:"Lo schema",3:"Le frasi dei dieci casi",4:"Caso lampo 1: l'ictus in reparto",
 5:"Caso lampo 2: l'anafilassi",6:"Caso lampo 3: la convulsione febbrile",7:"Caso lampo 4: la preeclampsia",
 8:"Caso lampo 5: l'agitazione psichiatrica",9:"Caso lampo 6: il fine vita",10:"Le dieci tracce piu' probabili",
 11:"Le procedure passo-passo",12:"Gli errori ricorrenti di tutto il modulo",13:"Gestire il tempo nella prova",
 14:"Le domande che collegano i casi",15:"Come allenarsi",16:"Il quaderno dei casi",17:"Che cosa cerca il commissario",
 18:"La frase del modulo",19:"Chiusura"}

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
