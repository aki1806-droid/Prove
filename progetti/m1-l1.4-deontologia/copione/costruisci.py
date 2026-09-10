# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Terza fonte del campo di attivita', dopo il profilo professionale e gli ordinamenti didattici: il Codice deontologico. Ti dico subito perche' questa lezione conta molto piu' di quanto sembri."),
 (1,"chiaro",0,"Il Codice non compare nei quiz soltanto come domanda diretta sull'articolo. Compare dentro i casi clinici, dove la risposta giusta e' quasi sempre quella deontologicamente sostenibile."),

 (2,"chiaro",0,"Quattro cose. Che cos'e' il Codice e chi lo adotta. Come e' strutturato: sapere in quale capo sta un tema e' il modo piu' rapido per rispondere con sicurezza."),
 (2,"chiaro",0,"Poi i temi che tornano sempre: contenzione, prescrizione dubbia, verita', rifiuto delle cure, social media. E infine il rapporto fra violazione deontologica, illecito disciplinare e responsabilita' giuridica."),

 (3,"chiaro",0,"Il testo vigente e' il Codice deontologico delle Professioni Infermieristiche, approvato dal Consiglio nazionale della FNOPI nel 2019, in sostituzione di quello del 2009. Cinquantatre articoli in otto capi."),
 (3,"tenue",0,"E' adottato dalla professione attraverso la sua Federazione, non dal Parlamento: e' una fonte di autoregolamentazione. Ma attenzione, autoregolamentazione non significa priva di peso giuridico."),

 (4,"chiaro",0,"Tieni a mente questa tripartizione, perche' e' la domanda piu' elegante che ti possano fare. La legge e' posta dal Parlamento, e la sua violazione genera responsabilita' civile, penale, amministrativa."),
 (4,"chiaro",0,"Il contratto e il codice di comportamento generano responsabilita' disciplinare verso il datore di lavoro. Il Codice deontologico la genera davanti all'Ordine: avvertimento, censura, sospensione, radiazione."),

 (5,"profondo",0,"E qui il punto che vale la domanda. La deontologia non e' alternativa alla legge: la integra. Un comportamento puo' essere penalmente lecito e costituire comunque illecito deontologico."),
 (5,"chiaro",0,"E lo stesso fatto puo' aprire insieme un procedimento penale, uno disciplinare aziendale e uno dell'Ordine. Tre piani autonomi e cumulabili: e' la stessa logica del doppio disciplinare della uno punto tre."),
 (5,"chiaro",0,"C'e' di piu'. La legge 42 del 1999 fa del Codice una delle fonti che delimitano il campo di attivita': una norma deontologica concorre a definire cio' che devi fare, e il giudice la richiama per valutare la diligenza."),

 (6,"chiaro",0,"Ecco la mappa degli otto capi. Capo primo: principi e valori. Capo secondo: responsabilita' assistenziale, cioe' competenza, prescrizione, dolore, contenzione."),
 (6,"chiaro",0,"Terzo: rapporti professionali, equipe e personale di supporto. Quarto: rapporti con le persone assistite, cioe' informazione, consenso, fine vita, riservatezza. Quinto: comunicazione e social media."),
 (6,"chiaro",0,"Sesto: organizzazione. Settimo: libera professione. Ottavo: disposizioni finali. Non serve la memoria degli articoli: serve sapere dove sta il tema, ed e' quello che ti fa scartare tre opzioni su quattro."),

 (7,"profondo",0,"Del primo capo porta a casa una formula sola, ma imparala bene, perche' e' la piu' citata dell'intero Codice. Il tempo di relazione e' tempo di cura."),
 (7,"chiaro",0,"La stessa affermazione la ritroverai, con altre parole, nella legge 219 del 2017. Accanto a questa: l'assistenza si fonda su valori etici, professionali, giuridici e sociali."),
 (7,"chiaro",0,"L'infermiere rispetta la libera scelta della persona anche quando non coincide con la propria opinione. E davanti a questioni etiche complesse si avvale del confronto con l'equipe e con i comitati etici."),

 (8,"chiaro",0,"Capo secondo, il piu' operativo. L'infermiere fonda il proprio operato su conoscenze validate, si aggiorna, e agisce nei limiti della propria competenza, ricorrendo quando serve alla consulenza di altri."),
 (8,"profondo",0,"Da qui una regola d'oro per i casi d'esame: riconoscere il proprio limite e' un obbligo deontologico, non una debolezza. Quando fra le opzioni compare «chiede supporto», e' quasi sempre quella giusta."),

 (9,"chiaro",0,"Situazione classica. L'infermiere rileva una prescrizione non chiara, non appropriata, o in contrasto con la propria valutazione professionale. Che cosa fa?"),
 (9,"profondo",1.2,"Chiede al prescrittore di chiarire. E se il dubbio permane, non da' corso all'atto, motivandolo e documentandolo."),
 (9,"tenue",0,"E' il corrispettivo deontologico del garantire la corretta applicazione, visto nella uno punto due. Nota che sono sbagliate tutte e due le opzioni estreme: ne' eseguire comunque, ne' modificare di testa propria."),

 (10,"chiaro",0,"Il Codice impegna l'infermiere a prevenire, rilevare e documentare il dolore, e ad attivarsi per il suo controllo. E' la base deontologica della legge 38 del 2010 e della valutazione con le scale."),
 (10,"tenue",0,"Il dolore non rilevato e', prima ancora che un problema clinico, una mancanza deontologica. Non e' una svista: e' un'omissione che ha un nome."),

 (11,"chiaro",0,"E arriviamo al tema che all'orale torna con la regolarita' di un orologio. La contenzione e' un evento eccezionale, motivato da prescrizione medica o da documentate valutazioni assistenziali, e limitato nel tempo."),
 (11,"chiaro",0,"Tre requisiti, e vanno detti tutti e tre: eccezionalita', motivazione documentata, limite temporale. L'infermiere non attua ne' concorre a trattamenti che configurino contenzione non necessaria."),
 (11,"profondo",1.4,"E una frase da ricordare alla lettera. Non si contiene per carenza di personale. La contenzione non e' mai una misura organizzativa."),

 (12,"chiaro",0,"Capo quarto, il rapporto con la persona assistita. L'infermiere ascolta, informa e coinvolge, e verifica che la persona abbia capito. Fornisce le informazioni di sua competenza."),
 (12,"chiaro",0,"Per quelle di altri professionisti facilita l'accesso al professionista giusto. E qui arriva il confine che i quiz testano sempre, in tutte le salse."),
 (12,"profondo",1.2,"L'infermiere non comunica la diagnosi ne' la prognosi. Ma non mente, e non elude."),

 (13,"tenue",0,"Sbagliate quindi tutte e due le opzioni estreme: dire che non si sa nulla e cambiare argomento, oppure comunicare la diagnosi di propria iniziativa per non lasciare solo il paziente."),
 (13,"chiaro",0,"E un dettaglio che vale una domanda intera: la persona ha diritto anche a non essere informata, oppure puo' indicare qualcun altro che riceva le informazioni al suo posto. L'infermiere rispetta questa volonta' e la documenta."),

 (14,"chiaro",0,"L'infermiere rispetta il rifiuto di trattamenti e accertamenti, anche quando comporta un rischio, adoperandosi perche' la scelta sia informata e consapevole."),
 (14,"chiaro",0,"Tutela la volonta' espressa, comprese le disposizioni anticipate di trattamento, e sostiene la pianificazione condivisa delle cure. Su consenso e DAT torniamo in modo sistematico nella uno punto sei."),
 (14,"profondo",0,"Nel fine vita garantisce controllo dei sintomi, sedazione quando indicata, dignita' e presenza dei familiari. Non attua ne' favorisce trattamenti finalizzati a provocare la morte, e assiste fino al termine della vita."),

 (15,"chiaro",0,"Sull'obiezione di coscienza il Codice pone due limiti, e vanno detti insieme, perche' e' la loro combinazione a fare la risposta corretta. Primo: si obietta solo nei casi previsti dalla legge, non a piacimento."),
 (15,"profondo",0,"Secondo: l'obiezione non copre l'assistenza. Restano dovute l'assistenza prima e dopo l'atto e ogni prestazione urgente o indifferibile. La scelta dell'infermiere non puo' ricadere sulla persona assistita."),

 (16,"chiaro",0,"Capo terzo. L'infermiere collabora, tutela la dignita' dei membri dell'equipe, non assume atteggiamenti denigratori verso i colleghi, e i contrasti si affrontano nelle sedi opportune, mai davanti alla persona."),
 (16,"chiaro",0,"Ma quando un comportamento, anche di un collega, mette a rischio la sicurezza o la dignita' della persona assistita, il Codice impone di segnalare. E la sequenza, nei casi, e' sempre la stessa."),
 (16,"profondo",1.0,"Mettere in sicurezza la persona. Informare chi di competenza. Documentare. Coprire il collega non e' solidarieta' professionale: e' illecito deontologico."),

 (17,"chiaro",0,"Il capo quinto e' la novita' piu' moderna del Codice 2019, ed e' terreno di casi d'esame recentissimi. Nei mezzi di comunicazione e nei social media l'infermiere agisce con prudenza e decoro."),
 (17,"chiaro",0,"Tutela la riservatezza e non diffonde immagini o informazioni che rendano identificabile la persona assistita. La regola pratica e' piu' semplice di quanto sembri."),
 (17,"tenue",0,"Fotografare una lesione per la documentazione clinica, col consenso e dentro il sistema aziendale, e' corretto. Farlo col telefono personale e mandarla in chat e' violazione, anche fra colleghi. Togliere il volto non risolve."),

 (18,"chiaro",0,"Capo sesto, l'organizzazione, e sono due obblighi. L'infermiere segnala alle figure competenti le carenze di risorse o di organizzazione che possano compromettere sicurezza e qualita' dell'assistenza."),
 (18,"chiaro",0,"E si adopera perche' la persona assistita non ne subisca le conseguenze. La segnalazione documentata e' la condotta corretta: subire in silenzio una carenza nota non protegge nessuno, ed espone."),

 (19,"profondo",0,"[warm] I sette punti da portare all'esame. Codice 2019, FNOPI, cinquantatre articoli in otto capi. E' la terza fonte del campo di attivita': integra la legge, non la sostituisce. Il tempo di relazione e' tempo di cura."),
 (19,"profondo",0,"Contenzione: eccezionale, motivata, limitata nel tempo, mai per carenza di personale. Prescrizione poco chiara: si chiede il chiarimento e, se il dubbio resta, non si da' corso e si documenta."),
 (19,"chiaro",0,"Non si comunica la diagnosi, ma non si mente. Obiezione: solo nei casi di legge, e restano dovute assistenza e prestazioni indifferibili. Nella prossima lezione, la responsabilita' professionale. A tra poco."),
]

ACCENTATE = "àèéìíòóùúÀÈÉÌÒÙ"
CAPITOLI = {1:"Apertura",2:"Obiettivi",3:"Che cos'e'",4:"I tre piani",
 5:"La deontologia integra la legge",6:"La mappa degli otto capi",
 7:"I principi del Capo I",8:"Competenza e limiti",9:"La prescrizione dubbia",
 10:"Il dolore",11:"La contenzione",12:"Informazione e verita'",
 13:"Il diritto a non sapere",14:"Rifiuto delle cure e fine vita",
 15:"L'obiezione di coscienza",16:"Equipe e collega che sbaglia",
 17:"Social media",18:"Organizzazione e segnalazione",19:"Chiusura"}
CPS = 17.0   # misurata su 1.2 e confermata su 1.3, dove ha sbagliato di 0,7 s

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
