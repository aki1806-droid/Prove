# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Il consenso informato e' il punto in cui il diritto incontra la relazione di cura. Nelle prove di concorso e' materia ad altissima frequenza, e per una ragione precisa."),
 (1,"chiaro",0,"E' regolata da una legge recente e ben costruita, la 219 del 2017, che si presta a domande secche. Ed e' il tema dei casi piu' insidiosi: quelli in cui la risposta che sembra piu' generosa e' quella sbagliata."),

 (2,"chiaro",0,"Quattro tappe. Il fondamento costituzionale. L'impianto della legge, articolo per articolo. Le situazioni particolari: minori, incapaci, disposizioni anticipate di trattamento."),
 (2,"chiaro",0,"E infine il ruolo dell'infermiere, che la legge affida in modo meno esplicito di quanto molti credano. Ma esiste, ed e' preciso."),

 (3,"chiaro",0,"Tre articoli della Costituzione. L'articolo 2 riconosce i diritti inviolabili dell'uomo. L'articolo 13 dichiara inviolabile la liberta' personale: nessuno puo' subire interventi sul proprio corpo senza consenso."),
 (3,"profondo",0,"E l'articolo 32, la norma chiave: la salute e' diritto dell'individuo e interesse della collettivita', e nessuno puo' essere obbligato a un determinato trattamento sanitario se non per disposizione di legge."),
 (3,"chiaro",0,"Che comunque non puo' violare i limiti imposti dal rispetto della persona umana. Sono venti parole che vale la pena saper ripetere quasi alla lettera."),

 (4,"chiaro",0,"Da qui due conseguenze pratiche. Prima: la regola e' il consenso, l'eccezione e' l'obbligo, e l'obbligo richiede una legge."),
 (4,"tenue",0,"Seconda: anche quando la legge impone un trattamento, pensa al TSO che vedremo nel modulo undici, restano fermi i limiti del rispetto della persona. Il consenso non e' un modulo da far firmare."),

 (5,"chiaro",0,"La legge si compone di otto articoli. Uno: consenso informato. Due: terapia del dolore, divieto di ostinazione irragionevole, sedazione palliativa. Tre: minori e incapaci."),
 (5,"chiaro",0,"Quattro: disposizioni anticipate di trattamento e fiduciario. Cinque: pianificazione condivisa delle cure. Gli ultimi tre sono di raccordo, e le domande arrivano quasi sempre dai primi cinque."),

 (6,"profondo",0,"Tre formule da conoscere quasi alla lettera. Prima: nessun trattamento sanitario puo' essere iniziato o proseguito senza il consenso libero e informato della persona interessata, tranne nei casi previsti dalla legge."),
 (6,"chiaro",0,"Seconda: e' promossa e valorizzata la relazione di cura e di fiducia, nella quale sono coinvolti, se il paziente lo desidera, i familiari o una persona di fiducia."),
 (6,"chiaro",0,"Terza: il tempo della comunicazione costituisce tempo di cura. E' la stessa affermazione del Codice deontologico, che abbiamo visto nella uno punto quattro."),

 (7,"chiaro",0,"E attenzione a questo passaggio, che vale una domanda intera. La legge dice che contribuiscono alla relazione di cura, in base alle rispettive competenze, gli esercenti una professione sanitaria che compongono l'equipe."),
 (7,"profondo",1.2,"L'infermiere non e' uno spettatore del consenso. E' parte della relazione di cura."),

 (8,"chiaro",0,"Su che cosa deve vertere l'informazione? Su condizioni di salute, diagnosi, prognosi, benefici e rischi degli accertamenti e dei trattamenti indicati, possibili alternative."),
 (8,"chiaro",0,"E, dettaglio che spesso si dimentica, sulle conseguenze dell'eventuale rifiuto o della rinuncia. Deve essere completa, aggiornata e a lei comprensibile: non esaustiva, ma comprensibile a quella persona."),

 (9,"chiaro",0,"La persona puo' anche rifiutare in tutto o in parte di ricevere le informazioni, oppure indicare familiari o una persona di fiducia incaricati di riceverle e di esprimere il consenso in sua vece."),
 (9,"chiaro",0,"Questa scelta va registrata in cartella e nel fascicolo sanitario elettronico. Non esiste un dovere di informare contro la volonta' della persona: e' il punto su cui molti rispondono d'istinto e sbagliano."),

 (10,"chiaro",0,"Sulla forma: il consenso e' acquisito nei modi piu' consoni alle condizioni del paziente, ed e' documentato in forma scritta, con videoregistrazioni, o con dispositivi che consentano di comunicare."),
 (10,"tenue",0,"Quindi il distrattore da riconoscere: «il consenso e' valido solo se firmato su modulo cartaceo» e' falso. Il modulo documenta il consenso; il consenso e' il processo informativo che lo precede."),

 (11,"chiaro",0,"Ogni persona capace di agire ha diritto di rifiutare in tutto o in parte qualsiasi accertamento o trattamento, e di revocare il consenso in qualsiasi momento, anche quando la revoca interrompa il trattamento."),
 (11,"profondo",0,"E qui la previsione piu' discussa e piu' chiesta: nutrizione e idratazione artificiali sono considerate trattamenti sanitari, e come tali possono essere rifiutate."),

 (12,"profondo",1.4,"[serious] Ed ecco il distrattore piu' elegante dei quiz sulla 219. Rifiutare si', pretendere no."),
 (12,"chiaro",0,"L'autodeterminazione e' asimmetrica. Si puo' rifiutare qualsiasi trattamento, ma non esigere trattamenti contrari a legge, deontologia o buone pratiche: davanti a queste richieste il medico non ha obblighi."),

 (13,"chiaro",0,"Che cosa accade a chi rispetta un rifiuto di cure salvavita? La legge e' netta: il medico e' tenuto a rispettare la volonta' espressa e, in conseguenza di cio', e' esente da responsabilita' civile o penale."),
 (13,"chiaro",0,"Prima, pero', prospetta le conseguenze della decisione e le alternative, e promuove ogni azione di sostegno, anche attivando l'assistenza psicologica. Il rispetto della volonta' non e' abbandono."),

 (14,"chiaro",0,"Articolo tre. Per il minore il consenso e' espresso dagli esercenti la responsabilita' genitoriale o dal tutore, ma la volonta' del minore e' ascoltata e valorizzata in relazione all'eta' e alla maturita'."),
 (14,"chiaro",0,"Per l'interdetto decide il tutore, sentito l'interdetto ove possibile. L'inabilitato, attenzione, presta personalmente il consenso."),
 (14,"profondo",1.2,"E per il beneficiario di amministrazione di sostegno dipende dal decreto di nomina. Va letto: stabilisce se decide la persona o l'amministratore."),

 (15,"chiaro",0,"E questa e' una delle risposte piu' chieste in assoluto. Se il rappresentante legale rifiuta le cure e il medico ritiene che quelle cure siano appropriate e necessarie, la decisione va al giudice tutelare."),
 (15,"profondo",0,"Non si esegue d'autorita', non si desiste: si ricorre al giudice tutelare. Salvo, ovviamente, lo stato di necessita'."),

 (16,"chiaro",0,"Articolo quattro, le disposizioni anticipate di trattamento. Chi puo' farle: ogni persona maggiorenne e capace di intendere e di volere, in previsione di un'eventuale futura incapacita'."),
 (16,"chiaro",0,"E dopo aver acquisito adeguate informazioni mediche. Con esse esprime volonta', consenso o rifiuto rispetto ad accertamenti e trattamenti, e indica un fiduciario maggiorenne e capace che la rappresenti."),

 (17,"chiaro",0,"La forma: atto pubblico, scrittura privata autenticata, o scrittura privata consegnata personalmente all'ufficio di stato civile del comune di residenza. Se le condizioni fisiche non lo consentono, videoregistrazione."),
 (17,"chiaro",0,"Sono esenti da bollo e da ogni tributo, e revocabili in ogni momento. Il medico e' tenuto al rispetto delle DAT, e puo' disattenderle solo in tre casi, e sempre in accordo con il fiduciario."),
 (17,"chiaro",0,"Se sono palesemente incongrue. Se non corrispondono alla condizione clinica attuale. O se esistono terapie non prevedibili alla sottoscrizione. In conflitto fra fiduciario e medico decide il giudice tutelare."),
 (17,"tenue",0,"E un dettaglio che vale una domanda: se manca il fiduciario, le DAT restano efficaci lo stesso."),

 (18,"chiaro",0,"Non confondere le DAT con la pianificazione condivisa delle cure. Le DAT guardano a un'incapacita' futura ed eventuale, e le fa una persona da sola, davanti a un notaio o al comune."),
 (18,"chiaro",0,"La pianificazione nasce da una patologia gia' in atto, cronica e invalidante o a prognosi infausta, e si costruisce insieme al medico, che con l'equipe e' tenuto ad attenersi."),
 (18,"chiaro",0,"Sul fine vita, l'articolo due impone di astenersi da ogni ostinazione irragionevole e dai trattamenti inutili o sproporzionati. E consente, davanti a sofferenze refrattarie, la sedazione palliativa profonda continua."),

 (19,"profondo",0,"La distinzione piu' delicata, e si risponde con tre criteri. Obiettivo: la sedazione palliativa mira al controllo di un sintomo refrattario, l'eutanasia mira alla morte."),
 (19,"profondo",0,"Mezzo: farmaci e dosaggi proporzionati al controllo del sintomo. Proporzionalita': la morte, quando arriva, e' conseguenza della malattia. Dilli in quest'ordine e la risposta e' completa."),

 (20,"chiaro",0,"Chiudiamo con il ruolo dell'infermiere. Acquisisce il consenso per gli atti di propria competenza. Contribuisce alla relazione di cura secondo le sue competenze. Verifica la comprensione."),
 (20,"chiaro",0,"Ed e' spesso l'infermiere ad accorgersi che la persona ha firmato senza aver capito. Documenta consenso, rifiuto e volonta' di non essere informati. Tutela la volonta' espressa, anche quando non la condivide."),
 (20,"chiaro",0,"E non sostituisce il medico nella diagnosi, ma non elude. Il caso classico: il paziente ti dice di aver firmato senza capire. La risposta corretta non e' rassicurarlo, ne' spiegargli tu l'intervento."),
 (20,"profondo",0,"[warm] E' sospendere il percorso, informare il medico e documentare: quel consenso non e' informato, e quindi non e' valido. Nella prossima lezione: segreto, privacy e tutela della persona. A tra poco."),
]

ACCENTATE = "àèéìíòóùúÀÈÉÌÒÙ"
CAPITOLI = {1:"Apertura",2:"Obiettivi",3:"Il fondamento costituzionale",
 4:"La regola e l'eccezione",5:"La L. 219/2017",6:"Le tre formule dell'art. 1",
 7:"L'infermiere e' parte della relazione",8:"Il contenuto dell'informazione",
 9:"Il diritto a non sapere",10:"La forma: il modulo non e' il consenso",
 11:"Rifiuto e revoca",12:"L'asimmetria",13:"Il medico che rispetta il rifiuto",
 14:"Minori e incapaci",15:"Il conflitto: il giudice tutelare",16:"Le DAT",
 17:"Forma delle DAT e disattendibilita'",18:"Pianificazione condivisa e fine vita",
 19:"Sedazione non e' eutanasia",20:"Il ruolo dell'infermiere"}
CPS = 17.0   # misurata su 1.2, confermata su 1.3 e 1.4

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
