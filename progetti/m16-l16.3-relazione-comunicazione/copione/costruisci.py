# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Riscrittura del copione in origine/copione-di-partenza.md. Le 13 scene di
# partenza stanno a ~445 caratteri l'una: oltre venti secondi a inquadratura,
# contro un tetto di 225. La struttura e l'ordine dei 13 argomenti restano;
# cambia il taglio.
#
# Il copione di partenza misurava 5.790 caratteri, cioe' 5:43 montati, due
# minuti sotto i 7:50 che il suo stesso documento si da'. Le aggiunte sono
# segnate AGG e sono il "come", non riempitivo: una conseguenza, un criterio
# reso verificabile, un rimando interno al modulo. Nessuna indicazione nuova
# di che cosa competa all'OSS: quelle non le posso verificare e non le invento.
#
# Le pose. Ogni cambio di capitolo porta 1,2 s: i 13 argomenti sono distinti e
# il passaggio va sentito. Misurato sulla 16.2: queste pose valgono ~20 s di
# montato e vanno tenute FUORI dalla moltiplicazione dei caratteri (vedi
# l'aritmetica in profilo.py, che su questa lezione e' quella corretta dalla
# prima riga e non dopo un montato bocciato).
#
# Un difetto del copione di partenza, non corretto in silenzio: la scena 8 dice
# «Descrivere invece di chiedere conto: ho visto che apre, perche' non ha
# chiude», che e' una frase rotta a meta'. Il criterio e' chiaro e l'esempio
# non lo e', quindi l'esempio e' stato rifatto con il pasto rimasto, che e'
# quello della scena 7 dello stesso documento. Nessun criterio nuovo.
#
# Registro del modulo: sobrio e descrittivo. E la regola di lingua del modulo
# 16: "persona con disturbo psichico", mai un sostantivo che identifichi la
# persona con la diagnosi.
BLOCCHI = [
 (1,"chiaro",0,"[warm] Bentornata e bentornato. In questa lezione entriamo nella parte piu' pratica del modulo: la relazione e la comunicazione con una persona in condizione di disagio psichico."),
 (1,"profondo",0,"Parto da un'affermazione che va presa alla lettera. La relazione non accompagna l'assistenza: e' lo strumento con cui l'assistenza si realizza. Non esiste un fare separato da un come lo si fa."),
 # AGG: che cosa cambia, se la si prende alla lettera.
 (1,"chiaro",1.2,"Preso alla lettera, cambia che cosa conta come lavoro fatto. Non basta che la prestazione risulti erogata: il modo in cui ci si arriva non e' la cornice della prestazione, e' la prestazione."),

 (2,"chiaro",0,"La conseguenza pratica e' questa: il modo in cui si entra in stanza, si propone un'igiene, si sollecita un pasto determina se quella prestazione sara' possibile o no."),
 (2,"tenue",0,"E allora un'igiene rifiutata non e' un problema di igiene: e' un problema di relazione. Cambiare prodotto o insistere non serve. Cambiare il modo, spesso si'."),
 # AGG: il verso che si dimentica, e che e' quello che si puo' riusare.
 (2,"chiaro",1.2,"Vale anche al contrario, ed e' la parte che si dimentica: quando una prestazione riesce, non e' perche' quel giorno la persona era piu' disponibile. Qualcosa nel modo ha funzionato, e vale la pena sapere che cosa."),

 (3,"chiaro",0,"Quattro principi, gia' incontrati nel modulo due, che qui diventano decisivi. Prevedibilita': dire che cosa si fara', e poi farlo, mantenendo gli impegni presi."),
 (3,"chiaro",0,"Rispetto dei tempi: non forzare, riproporre in un altro momento, e riproporre vuol dire tornare, non chiedere due volte di seguito. Non giudizio: accogliere senza valutare la persona."),
 (3,"chiaro",0,"Coerenza dell'equipe: tutti devono tenere la stessa linea, perche' risposte diverse da operatori diversi generano confusione e conflitto. E' una delle cause piu' frequenti di escalation."),
 # AGG: i quattro sono verificabili, e questo e' il motivo per cui tengono.
 (3,"profondo",1.2,"Non sono quattro buone intenzioni: sono quattro cose che si possono controllare. Se un impegno e' stato mantenuto, se una proposta e' stata riproposta, se due operatori hanno risposto uguale."),

 (4,"chiaro",0,"Le situazioni piu' frequenti, e che cosa aiuta in ciascuna. Diffidenza e sospettosita': aiuta la trasparenza, cioe' dire sempre che cosa si sta per fare, con movimenti lenti e visibili e la distanza rispettata."),
 (4,"tenue",0,"Non aiuta avvicinarsi da dietro, parlottare a bassa voce a distanza, e soprattutto toccare senza preavviso. Un contatto non annunciato, in una persona sospettosa, conferma il sospetto."),
 (4,"chiaro",0,"Ritiro e mutismo: aiuta la presenza discreta senza pretendere risposta, con proposte brevi e concrete, tornando piu' volte nel corso del turno."),
 (4,"tenue",1.2,"Non aiuta insistere con domande, ne' interpretare il silenzio come un rifiuto definitivo. Spesso non lo e': e' il tempo che a quella persona serve per accettare una presenza."),

 (5,"chiaro",0,"Discorso disorganizzato: aiutano frasi brevi, una cosa per volta, e riferimenti concreti a cose e a momenti della giornata. Dopo colazione, non piu' tardi; questa sedia, non li'."),
 (5,"tenue",0,"Non aiuta fingere di aver capito, ne' correggere il modo di parlare. Fingere costruisce un malinteso che torna piu' tardi; correggere sposta l'attenzione dal bisogno alla forma."),
 (5,"chiaro",0,"Agitazione: tono basso, ridurre gli stimoli, dare spazio fisico, e una sola persona che parla. Piu' voci insieme, anche gentili, sono comunque piu' stimoli."),
 (5,"tenue",0,"Non aiuta affollare la stanza, alzare la voce, e soprattutto bloccare le vie d'uscita: chiudere l'uscita trasforma il disagio in allarme."),
 (5,"chiaro",1.2,"Richieste ripetute: una risposta breve, coerente e uguale ogni volta. Non aiutano risposte diverse da operatori diversi, ne' promesse che non si potranno mantenere."),

 (6,"profondo",0,"Tutte queste situazioni hanno lo stesso filo comune: prevedibilita', calma, coerenza."),
 # AGG: come si usa il filo comune in sede d'esame.
 (6,"chiaro",1.2,"Sono tre parole che risolvono la maggior parte dei quesiti pratici su quest'area, e buona parte delle situazioni reali. Davanti a una domanda di cui non ricordi la risposta, chiediti quale delle tre manca."),

 (7,"chiaro",0,"Il pezzo piu' concreto della lezione: come si formulano le frasi. Sono quattro riformulazioni, e la cosa da sapere a memoria non sono le frasi: e' quello che si sposta passando dall'una all'altra."),
 (7,"chiaro",0,"Invece di «deve lavarsi»: le va se facciamo l'igiene adesso, o preferisce tra mezz'ora?"),
 (7,"chiaro",0,"Invece di «non e' vero quello che dice»: io non lo vedo, ma capisco che per lei sia reale. Invece di «si calmi», che non ha mai calmato nessuno: sono qui, ci prendiamo un momento."),
 (7,"chiaro",1.2,"E invece di «perche' non ha mangiato?»: ho visto che il pasto e' rimasto, posso portarle qualcos'altro? La prima e' una richiesta di conto, la seconda e' un'offerta."),

 (8,"chiaro",0,"Dietro queste riformulazioni ci sono quattro criteri, e conoscerli permette di costruirne altre. Offrire una scelta invece di un ordine. Validare il vissuto senza validare il contenuto."),
 (8,"chiaro",0,"Il secondo e' la regola della lezione precedente sul delirio. Il terzo: descrivere invece di chiedere conto. Ho visto che il pasto e' rimasto, non perche' non ha mangiato."),
 (8,"tenue",1.2,"E niente plurale paternalistico. «Adesso ci laviamo» e' una formula che riduce una persona adulta a un bambino, e lo fa con il tono di chi sta aiutando."),

 (9,"chiaro",0,"La recovery e' il percorso attraverso cui una persona costruisce una vita soddisfacente anche in presenza del disturbo. La parola che regge la definizione e' «anche»: non al posto del disturbo, e non dopo."),
 (9,"profondo",0,"Il punto centrale, che i quiz chiedono: non coincide con la guarigione clinica. Si puo' essere in recovery pur avendo ancora dei sintomi."),
 (9,"chiaro",0,"Gli elementi sono quattro. La speranza, cioe' la possibilita' di un futuro diverso. L'identita', cioe' essere una persona e non una diagnosi."),
 (9,"chiaro",1.2,"Il senso, cioe' avere ruoli e relazioni che contano. E la responsabilita', cioe' decidere della propria vita, con il rischio che decidere comporta."),

 (10,"chiaro",0,"Che cosa significa per l'OSS: sostenere l'autonomia anche quando sarebbe piu' rapido sostituirsi, e spesso lo e'. Valorizzare ogni capacita' residua, e non decidere al posto della persona cio' che puo' ancora scegliere."),
 (10,"tenue",0,"C'e' un rischio che nasce da un'intenzione buona: l'iperprotezione. Fare al posto della persona per proteggerla produce dipendenza, e conferma l'autostigma di cui si parlava nella sedici punto uno."),
 (10,"profondo",1.2,"La formula da tenere: la sicurezza si garantisce, l'autonomia non si sospende."),

 (11,"chiaro",0,"L'interruzione della terapia e' una delle cause piu' frequenti di ricaduta, ed e' il motivo per cui questo punto riguarda l'OSS da vicino."),
 (11,"chiaro",0,"Che cosa compete: osservare e riferire la mancata assunzione, sostenere la routine quotidiana, riferire gli effetti che la persona riporta, come sonnolenza, tremori, rigidita', e segnalare il rifiuto senza forzare."),
 (11,"tenue",0,"Che cosa non compete: convincere o insistere, discutere l'indicazione clinica, valutare gli effetti collaterali, somministrare contro la volonta'."),
 (11,"profondo",1.2,"Il rifiuto della terapia va sempre riferito, mai forzato. La forzatura non e' una scorciatoia: e' un atto privo di legittimazione."),

 (12,"chiaro",0,"Un ultimo punto, che riguarda te. In quest'area il carico emotivo dell'operatore e' alto, e va riconosciuto anziche' negato."),
 (12,"chiaro",0,"Il rifiuto ripetuto produce senso di inefficacia. Le ricadute dopo un miglioramento producono frustrazione. L'aggressivita' verbale produce difficolta' a non prenderla sul personale."),
 (12,"chiaro",0,"Che cosa aiuta: parlarne in equipe, non attribuire a se' il decorso del disturbo, e distinguere cio' che dipende dal proprio operato da cio' che non ne dipende."),
 (12,"chiaro",1.2,"E riconoscere i segnali di affaticamento prima che diventino esaurimento. Riconoscerli presto e' una competenza, non un'ammissione di debolezza."),

 (13,"chiaro",0,"[thoughtful] Chiudo con due cose. La prima: l'aggressivita' verbale in fase acuta e' un sintomo, non un giudizio sulla persona che la riceve. E' una distinzione che va fatta sul momento, cioe' quando costa farla."),
 (13,"chiaro",0,"Ricordarlo non elimina il disagio, ma evita di trasformarlo in un conflitto personale. E un conflitto personale, in quest'area, non si chiude a fine turno."),
 (13,"profondo",0,"La seconda e' la sintesi della lezione: in salute mentale non si ottiene collaborazione esercitando autorita', si ottiene costruendo prevedibilita'."),
 (13,"chiaro",0,"[warm] Una persona che sa che cosa aspettarsi da te collabora molto piu' di una a cui e' stato ordinato di farlo. Nella prossima lezione affrontiamo le dipendenze patologiche."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1:"La relazione e' lo strumento",2:"La conseguenza pratica",
 3:"I quattro principi",4:"Diffidenza e ritiro",
 5:"Disorganizzazione, agitazione, richieste ripetute",6:"Il filo comune",
 7:"Come si parla",8:"I quattro criteri",9:"La recovery",
 10:"L'autonomia e l'iperprotezione",11:"L'aderenza al percorso di cura",
 12:"Il carico dell'operatore",13:"La sintesi"}

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

# §6: ogni cambio di capitolo deve portare una posa. Sulla 16.2 nove cambi su
# dodici passavano di netto su una frase conclusiva, e l'ho scoperto cercando
# dei secondi mancanti. Qui e' un vincolo, non un'attenzione.
for a,b in zip(blocchi, blocchi[1:]):
    if a["capitolo"]!=b["capitolo"] and not a["posa"]:
        errori.append(f'{a["id"]}: chiude il capitolo {a["capitolo"]} senza posa')

pose=sum(b["posa"] for b in blocchi)
parlato=tot/CPS+pose; durata=parlato+COPERTINA+CHIUSURA
print(f"blocchi   {len(blocchi)}        scene {nscene}/{MAX_SCENE}")
print(f"caratteri {tot}      media {tot/len(blocchi):.0f} car/blocco")
print(f"parlato   {parlato:.0f} s     montato {durata//60:.0f}:{durata%60:04.1f}   (stima a {CPS} car/s)")
print(f"tag       {tags}        pose {sum(1 for b in blocchi if b['posa'])} per {pose:.1f} s")
print()
cur=None
for b in blocchi:
    if b["capitolo"]!=cur:
        cur=b["capitolo"]; print(f'  cap {cur:2d}  {CAPITOLI[cur]}')
    p=f'  +{b["posa"]}s' if b["posa"] else ""
    print(f'    {b["id"]}  {len(b["text"]):3d} car  [{b["tema"]:8s}]{p} {b["text"][:52]}...')

acc=0; stacco=None
for i,b in enumerate(blocchi):
    acc+=len(b["text"])
    if stacco is None and acc>tot/2: stacco=b["id"]
A=sum(len(b["text"]) for b in blocchi[:[x["id"] for x in blocchi].index(stacco)+1])
print(f"\nstacco tracce dopo {stacco}:  chunkA {A} car  ·  chunkB {tot-A} car   (limite 5000)")

if errori:
    print("\nERRORI:"); [print("  -",e) for e in errori]; sys.exit(1)
json.dump(blocchi, open(_pl.Path(__file__).parent/"blocchi.json","w",encoding="utf-8"),
          indent=1, ensure_ascii=False)
print("\nOK, nessun errore")
