# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Nelle prime due lezioni abbiamo visto che cosa l'infermiere e', e che cosa fa. Oggi vediamo come lo si diventa e, soprattutto, come lo si resta: il titolo, l'albo, l'aggiornamento obbligatorio, la carriera."),
 (1,"chiaro",0,"Ti avviso subito: questa e' materia da domande facili. E le domande facili, in un concorso dove passa chi sbaglia meno, sono esattamente quelle che non ci si puo' permettere di regalare."),

 (2,"chiaro",0,"Quattro blocchi. Il percorso formativo, dalla laurea al dottorato. L'Ordine: che cos'e', che cosa fa, come sanziona. L'ECM, con la differenza fra esonero ed esenzione."),
 (2,"chiaro",0,"E lo sviluppo di carriera, che e' il punto piu' insidioso, perche' tre piani diversi si accavallano e i quiz ci giocano sopra apposta. Alla fine avrai un test per non confonderli mai piu'."),

 (3,"chiaro",0,"La formazione infermieristica e' entrata all'universita' con l'articolo 6, comma 3, del decreto legislativo 502 del 1992: lo stesso articolo da cui nascera' il profilo del 1994."),
 (3,"chiaro",0,"Oggi il titolo di accesso e' la laurea in Infermieristica, classe elle esse enne ti uno. Tre anni, centottanta crediti formativi, accesso programmato a livello nazionale."),
 (3,"tenue",0,"Di quei centottanta crediti circa sessanta sono di tirocinio: un terzo del corso si fa in reparto. Ed e' il tirocinio che rende concreti gli ordinamenti didattici, la seconda fonte del campo di attivita'."),

 (4,"chiaro",0,"Punto importante, e recente. Con la legge 163 del 2021 l'esame finale del corso di laurea ha valore di esame di Stato abilitante: non esiste piu' un esame separato da sostenere dopo la laurea."),
 (4,"profondo",0,"Ma attenzione alla distinzione che vale la domanda: abilitazione non e' esercizio. Il titolo ti abilita. Per esercitare serve anche l'iscrizione all'albo. Sono due passaggi, e i quiz li sovrappongono."),

 (5,"chiaro",0,"Sopra la laurea si sviluppa un percorso a scala, e conviene vederlo tutto insieme perche' e' li' che si annidano i distrattori."),
 (5,"chiaro",0,"Il master di primo livello, almeno sessanta crediti, e' la specializzazione clinica: le cinque aree del profilo che abbiamo elencato la volta scorsa, oppure il coordinamento."),
 (5,"chiaro",0,"La laurea magistrale, classe elle emme esse enne ti uno, centoventi crediti, forma alla direzione, alla docenza e alla ricerca. Sopra ancora, il master di secondo livello, che la magistrale la richiede. In cima, il dottorato."),

 (6,"tenue",0,"Ecco il distrattore, ed e' il piu' frequente della lezione. La laurea magistrale non e' una specializzazione clinica: se un quiz te la presenta come master specialistico in area critica, e' sbagliata."),
 (6,"tenue",0,"La clinica specialistica passa dai master di primo livello. Due percorsi diversi, non due nomi della stessa cosa."),
 (6,"chiaro",0,"E ricorda che nel concorso questi titoli contano due volte: come requisito, dove basta la laurea, e come punteggio. Nel pregresso Azienda Zero i titoli valgono fino a trenta punti, di cui al massimo sette per il curriculum."),

 (7,"chiaro",0,"Passiamo all'Ordine. Con la legge 3 del 2018, la legge Lorenzin, i Collegi IPASVI sono diventati Ordini delle Professioni Infermieristiche, gli OPI, provinciali o interprovinciali, federati nella FNOPI."),
 (7,"profondo",0,"La definizione da ricordare e' questa: sono enti pubblici non economici, che operano come organi sussidiari dello Stato per tutelare gli interessi pubblici connessi all'esercizio della professione."),
 (7,"chiaro",0,"Non sono associazioni private e non sono sindacati. Sembra una distinzione di scuola, e invece e' la frase che i quiz smontano un pezzo per volta, cambiando una parola sola."),

 (8,"chiaro",0,"Che cosa fa, in concreto. Tiene l'albo e verifica i requisiti di iscrizione. Vigila sulla condotta degli iscritti ed esercita il potere disciplinare, che vediamo fra un momento."),
 (8,"chiaro",0,"Adotta il codice deontologico, che sara' tutta la prossima lezione. Tutela l'affidamento del pubblico, contrasta l'esercizio abusivo, verifica l'obbligo ECM e rappresenta la professione presso le istituzioni."),

 (9,"chiaro",0,"Le sanzioni dell'Ordine sono quattro, e vanno sapute in ordine crescente. Avvertimento: il richiamo scritto a non ripetere la mancanza. Censura: la dichiarazione formale di biasimo."),
 (9,"profondo",1.2,"Sospensione dall'esercizio della professione, da un mese a un anno. E radiazione: la cancellazione dall'albo."),
 (9,"tenue",0,"Nota bene che il licenziamento non c'e'. Quello e' del datore di lavoro, non dell'Ordine, ed e' il distrattore che compare quasi sempre in questa domanda. Quattro sanzioni, e il licenziamento non e' fra queste."),

 (10,"chiaro",0,"E qui una cosa che sorprende molti. Il procedimento disciplinare dell'Ordine e' del tutto autonomo rispetto a quello del datore di lavoro. Non si escludono, non si aspettano, non si annullano a vicenda."),
 (10,"profondo",0,"Per lo stesso fatto un infermiere dipendente puo' essere sanzionato dall'azienda, in base al contratto collettivo, e dall'Ordine, in base al codice deontologico. Due piani distinti e cumulabili, non alternativi."),

 (11,"chiaro",0,"L'iscrizione all'albo e' obbligatoria per l'esercizio, anche per i dipendenti pubblici: lo dice la legge 43 del 2006, e lo ribadisce ogni bando, che la chiede come requisito specifico di ammissione."),
 (11,"chiaro",0,"Sul fronte opposto c'e' l'esercizio abusivo della professione, l'articolo 348 del codice penale, la cui pena e' stata sensibilmente inasprita proprio nel 2018."),
 (11,"tenue",0,"E attenzione, perche' qui si sbaglia: risponde penalmente non solo chi esercita senza titolo, ma anche, a titolo di concorso, chi agevola l'abuso: per esempio lasciando svolgere atti infermieristici a chi non ha il titolo."),

 (12,"chiaro",0,"Passiamo all'ECM, l'Educazione Continua in Medicina. Nasce con il decreto legislativo 502 del 1992 come modificato dal 229 del 1999, ed e' governata dalla Commissione Nazionale per la Formazione Continua, presso l'Agenas."),
 (12,"profondo",0,"Prima regola, ed e' quella che i quiz chiedono piu' spesso: e' un obbligo individuale. Risponde il professionista, non l'azienda. Non basta dire che il corso non me l'hanno offerto: il debito resta tuo."),

 (13,"chiaro",0,"Il numero da sapere e' centocinquanta crediti nel triennio, indicativamente cinquanta all'anno. Il triennio e' l'unita' di misura vera: l'anno serve solo a distribuire lo sforzo."),
 (13,"chiaro",0,"A questo si aggiunge il dossier formativo, che e' uno strumento di programmazione, individuale o di gruppo, e che se viene costruito e poi rispettato puo' dare diritto a un bonus di crediti."),

 (14,"chiaro",0,"Ed ecco la distinzione che vale la domanda, perche' esonero ed esenzione non sono affatto sinonimi, anche se nel parlato di reparto si usano come se lo fossero."),
 (14,"chiaro",0,"L'esonero riguarda chi sta studiando: un corso di laurea, un master, un dottorato, una scuola di specializzazione. L'esenzione riguarda chi non sta lavorando: congedo di maternita', malattia, aspettativa."),
 (14,"profondo",1.2,"Il trucco per non sbagliare mai. Esonero perche' studio. Esente perche' assente."),

 (15,"chiaro",0,"E vediamo perche' l'ECM conta davvero, al di la' del bollino. Il mancato assolvimento non e' un dettaglio formale: rileva sul piano disciplinare davanti all'Ordine, e incide sulla valutazione dell'idoneita' professionale."),
 (15,"chiaro",0,"La legge 24 del 2017, la Gelli Bianco, collega il possesso dei requisiti formativi alla posizione del professionista, e quindi anche al suo profilo assicurativo."),
 (15,"tenue",0,"C'e' poi un profilo piu' insidioso. Nel giudizio di responsabilita', non conoscere cio' che e' ormai patrimonio consolidato della professione puo' essere letto come colpa per imperizia. Ci torniamo nella uno punto cinque."),

 (16,"chiaro",0,"Ultimo blocco, ed e' quello in cui i quiz mescolano volutamente le carte, perche' tre cose diverse portano nomi che si somigliano. Teniamole su tre colonne separate."),
 (16,"chiaro",0,"I livelli della legge 43 del 2006, cioe' professionista, coordinatore, specialista e dirigente, dipendono dal titolo posseduto. Sono una scala di qualificazione, e la determina il percorso di studi."),
 (16,"chiaro",0,"Le competenze avanzate ampliano l'agire clinico sulla base di formazione certificata. Gli incarichi di funzione, organizzativa o professionale, sono invece del contratto collettivo, e li conferisce l'azienda."),

 (17,"profondo",1.4,"[serious] E la frase da portarsi all'esame e' questa. Il titolo abilita. L'azienda attribuisce."),
 (17,"chiaro",0,"Si puo' avere il master di coordinamento senza avere un incarico di coordinamento, perche' l'incarico dipende dal fabbisogno organizzativo dell'azienda e dal contratto, non dal tuo curriculum."),
 (17,"chiaro",0,"E in Veneto gli incarichi di funzione sono conferiti da ciascuna azienda sulla base del proprio regolamento e della graduazione prevista dall'atto aziendale. Cambia l'azienda, cambia la mappa degli incarichi."),

 (18,"profondo",0,"[warm] Ricapitoliamo i sei punti. Titolo: laurea classe elle esse enne ti uno, centottanta crediti, ed e' abilitante. Per esercitare serve anche l'iscrizione all'albo, obbligatoria dal 2006 anche nel pubblico impiego."),
 (18,"profondo",0,"OPI e FNOPI dalla legge 3 del 2018: enti pubblici non economici, organi sussidiari dello Stato. Sanzioni, quattro in ordine crescente: avvertimento, censura, sospensione, radiazione."),
 (18,"profondo",0,"ECM: obbligo individuale, centocinquanta crediti nel triennio, esonero se studi, esenzione se sei assente. E infine, il sesto: livello e incarico sono cose diverse."),
 (18,"chiaro",0,"Nella prossima lezione entriamo nel codice deontologico del 2019, che e' la terza fonte del campo di attivita' e, secondo me, la piu' bella da studiare. A tra poco."),
]

ACCENTATE = "àèéìíòóùúÀÈÉÌÒÙ"
CAPITOLI = {1:"Apertura",2:"Obiettivi",3:"Il titolo di base",4:"La laurea e' abilitante",
 5:"La formazione post-base",6:"Il distrattore della magistrale",7:"OPI e FNOPI",
 8:"Che cosa fa l'Ordine",9:"Le sanzioni",10:"Il disciplinare e' doppio",
 11:"L'albo e l'esercizio abusivo",12:"L'ECM: che cos'e'",13:"I numeri dell'ECM",
 14:"Esonero ed esenzione",15:"Perche' l'ECM conta",16:"Tre piani da non confondere",
 17:"Il titolo abilita",18:"Chiusura"}
CPS = 17.0   # misurata su 1.2, che ha la stessa densita' di numeri di questa

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
