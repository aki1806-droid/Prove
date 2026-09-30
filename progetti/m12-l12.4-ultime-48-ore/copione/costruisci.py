# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 12.4 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M12): le ultime quarantotto ore. Che cosa ripassare, che cosa lasciare perdere, come si
# legge un quesito sotto tempo, il giorno della prova. Nessun bando AOUPD disponibile: modalita',
# durata e punteggio della prova non sono indicati, e il testo rimanda sempre al bando.
BLOCCHI = [
 (1,"chiaro",0.8,"[serious] Mancano due giorni alla prova. Hai studiato undici materie, dalla sanita' alla contabilita', e la tentazione e' ricominciare tutto da capo, dalla prima pagina del primo modulo. E' l'errore piu' comune."),
 (1,"chiaro",0,"Le ultime quarantotto ore non servono a imparare cose nuove. Servono a mettere in ordine quello che sai gia', e ad arrivare alla prova lucidi e riposati."),
 (1,"profondo",1.2,"Nelle ultime ore non si impara: si mette in ordine."),

 (2,"chiaro",0.6,"Quattro passaggi. Che cosa ripassare. Che cosa lasciare perdere. Come si legge un quesito quando il tempo stringe. E il giorno della prova."),

 (3,"chiaro",0.5,"La prima cosa da ripassare sono le tre cose di ogni lezione. Sono poche frasi per lezione, e insieme fanno lo scheletro dell'intero corso. Si rileggono in un pomeriggio."),
 (3,"chiaro",0,"La seconda sono le sessanta date e numeri. Ripetile ad alta voce, e per ognuna di' anche il fatto a cui e' legata. Una data senza il suo fatto e' la prima a scappare sotto tempo."),
 (3,"chiaro",0,"La terza sono i distrattori. Ogni lezione ne ha quattro o cinque, e sono le frasi sbagliate che troverai nei quiz. Leggili cosi': falso, perche'."),
 (3,"chiaro",0,"La quarta sono le domande che hai sbagliato nelle simulazioni. Valgono piu' di quelle giuste: ti dicono dove la trappola ha funzionato, e dove funzionera' ancora."),
 (3,"chiaro",0,"Nelle materie che senti piu' lontane, come appalti e contabilita', fermati sulle tre cose e sui distrattori. Non inseguire i dettagli che non hai mai fissato: non li fisserai adesso."),
 (3,"chiaro",0,"Il ripasso utile e' attivo. Copri la risposta, prova a dirla, poi controlla. Rileggere una pagina gia' letta da' la sensazione di sapere, ma fissa molto meno."),
 (3,"chiaro",0,"Se puoi, ripassa con un collega che prepara la stessa prova. Interrogatevi a turno sulle date e sui distrattori: spiegare ad alta voce e' il modo piu' rapido per scoprire che cosa non e' ancora chiaro."),
 (3,"chiaro",0.6,"Un esempio di piano: il primo giorno, la mattina le tre cose dei primi sei moduli, il pomeriggio quelle degli altri cinque. Il secondo giorno, date e distrattori al mattino, una simulazione al pomeriggio."),
 (3,"tenue",0.8,"Attenzione: rileggere tutto non e' ripassare. Se alla fine del giorno non hai provato a rispondere senza guardare, hai solo riletto."),
 (3,"profondo",1.2,"Tre cose, sessanta numeri, i distrattori: lo scheletro basta."),

 (4,"chiaro",0.5,"Poi c'e' quello che conviene lasciare perdere. Prima di tutto i materiali nuovi: dispense mai viste, raccolte di quiz senza fonte, catene di messaggi con le domande sicure."),
 (4,"chiaro",0,"Nel corso lo abbiamo visto piu' volte: dispense e quiz in circolazione contengono errori. Principi contabili contati come diciassette, entrate in sei titoli, date di codici superati."),
 (4,"chiaro",0,"Lascia perdere anche i dettagli marginali: il numero del comma, la formulazione esatta di un elenco lungo. I quiz premiano chi riconosce il concetto giusto, non chi recita l'articolo."),
 (4,"chiaro",0,"E lascia perdere la notte sui libri. Il sonno serve a fissare quello che hai studiato. Una notte in bianco toglie alla prova piu' di quanto aggiunga il ripasso."),
 (4,"chiaro",0,"Se hai un dubbio su una cifra che cambia nel tempo, come le soglie degli appalti, non cercare conferme dell'ultimo minuto su fonti incerte. Fidati del testo vigente e di cio' che dice il bando."),
 (4,"chiaro",0.6,"Un esempio: la sera prima trovi in rete un quiz che da' le entrate degli enti territoriali in sei titoli. Non cambiare quello che sai: nel corso hai visto perche' e' incompleto."),
 (4,"tenue",0.8,"Occhio: un quiz trovato in rete non e' una fonte. Nel preparare questo corso ne abbiamo trovati diversi con risposte sbagliate, anche su punti da esame."),
 (4,"profondo",1.2,"Meno materiale, piu' sonno, nessuna fonte nuova."),

 (5,"chiaro",0.5,"Durante la prova, leggi la domanda fino in fondo prima di guardare le risposte. Cerca il soggetto e il verbo: chi fa che cosa, e in quale momento."),
 (5,"chiaro",0,"Fai attenzione alle negazioni: non, tranne, fatta eccezione. Molti quiz chiedono quale risposta e' falsa, e chi legge di corsa sceglie la prima frase vera che trova."),
 (5,"chiaro",0,"Poi elimina. Di solito due risposte si scartano subito, e resta un confronto tra due. Li' cerca la trappola: una data vicina, un numero simile, una parola assoluta, un soggetto spostato."),
 (5,"chiaro",0,"Leggi sempre tutte e quattro le risposte, anche quando la prima ti sembra giusta. A volte ce n'e' una piu' completa, e la domanda chiede proprio quella: la piu' corretta, non una corretta."),
 (5,"chiaro",0,"Se una domanda ti blocca, non fermarti. Segnala il numero e passa alla successiva: ci torni alla fine, con la testa piu' libera e il tempo che ti resta."),
 (5,"chiaro",0,"Cambia una risposta solo se ricordi un fatto preciso che la smentisce. Una sensazione vaga, a fine prova, non e' un buon motivo per tornare indietro."),
 (5,"chiaro",0,"Controlla nel bando come si calcola il punteggio. Se le risposte sbagliate tolgono punti, lasciare in bianco una domanda davvero incerta puo' convenire. Se non ne tolgono, rispondi a tutte."),
 (5,"chiaro",0.6,"Un esempio: quale tra questi non e' un organo dell'azienda sanitaria? Direttore generale, collegio di direzione, collegio sindacale, direttore sanitario. La risposta e' il direttore sanitario."),
 (5,"tenue",0.8,"Attenzione alle doppie negazioni, come non e' vero che non. Riformula la frase in positivo prima di rispondere: e' il modo piu' rapido per non cadere nell'inganno."),
 (5,"profondo",1.2,"Soggetto, verbo, negazione: poi elimina."),

 (6,"chiaro",0.5,"La sera prima prepara tutto: documento d'identita', convocazione e quello che il bando chiede di portare. Controlla indirizzo, orario e tempi del viaggio."),
 (6,"chiaro",0,"La mattina mangia qualcosa di leggero e arriva con anticipo. L'identificazione e le istruzioni richiedono tempo, e cominciare di corsa costa lucidita' nelle prime domande."),
 (6,"chiaro",0,"Ascolta con attenzione le istruzioni della commissione: quanto tempo hai, come si segna la risposta, se si puo' correggere. Un errore di procedura puo' costare quanto una risposta sbagliata."),
 (6,"chiaro",0,"Gestisci il tempo in due giri. Nel primo rispondi a tutto cio' che sai con sicurezza. Nel secondo torni sulle domande segnalate. Tieni qualche minuto per controllare di non averne saltata nessuna."),
 (6,"chiaro",0,"Un po' di ansia e' normale, e aiuta a restare attenti. Se una domanda ti mette in difficolta', respira e vai avanti: una domanda difficile non dice come andra' la prova."),
 (6,"chiaro",0,"Prima di consegnare, controlla anche i dati che non riguardano le domande: nome, codice, firme o etichette richieste. Sono dettagli di pochi secondi, ma un foglio incompleto puo' costare la prova."),
 (6,"chiaro",0.6,"Un esempio: a meta' prova ti accorgi di aver saltato una riga del foglio risposte. Fermati, ricontrolla la numerazione dall'ultima domanda sicura, e riallinea. Meglio un minuto perso che dieci risposte spostate."),
 (6,"tenue",0.8,"Occhio: le modalita' cambiano da una prova all'altra. Carta o computer, durata, penalita': vale sempre quello che dice il bando, non quello che raccontano i colleghi."),
 (6,"profondo",1.2,"Arriva presto, ascolta le istruzioni, fai due giri."),

 (7,"chiaro",0.8,"Le tre cose da portare alla prova. La prima: nelle ultime quarantotto ore ripassa in modo attivo tre cose, date e distrattori, e dormi."),
 (7,"chiaro",0.8,"La seconda: leggi ogni quesito cercando soggetto, verbo e negazioni, poi elimina le risposte impossibili e cerca la trappola tra le ultime due."),
 (7,"chiaro",0.8,"La terza: controlla nel bando tempo, punteggio e materiali, e arriva in anticipo, con i documenti pronti."),
 (7,"tenue",0.8,"L'ultimo distrattore e' pensare di non sapere abbastanza. Hai attraversato undici materie, lezione dopo lezione: il lavoro e' fatto. Adesso si raccoglie."),

 (8,"profondo",0,"[warm] In sintesi: ordine, sonno e attenzione alle parole. Qui si chiude il corso. Buona prova, da tutta la CISL FP Padova Rovigo."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: 'Che cosa ripassare', 4: 'Che cosa lasciare perdere', 5: 'Come si legge un quesito', 6: 'Il giorno della prova', 7: 'Le tre cose da portare alla prova', 8: 'Chiusura'}
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

pose=sum(b["posa"] for b in blocchi)
parlato=tot/CPS+pose; durata=parlato+COPERTINA+CHIUSURA
print(f"blocchi   {len(blocchi)}        scene {nscene}/{MAX_SCENE}")
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

# Lo stacco va su un cambio di capitolo. Non il primo DOPO la meta': quello
# vicino alla meta', da una parte o dall'altra. Nella 1.1 del corso PV il
# primo dopo la meta' lasciava la traccia A a 4968 caratteri, a un soffio dal
# tetto di 5000 del servizio di sintesi, e la B a 2809.
acc=0; stacco=None; a=0; migliore=None
for i,b in enumerate(blocchi):
    acc+=len(b["text"])+1
    if i+1<len(blocchi) and b["capitolo"]!=blocchi[i+1]["capitolo"]:
        if migliore is None or abs(acc-tot/2) < abs(migliore[1]-tot/2):
            migliore=(b["id"],acc)
stacco,a=migliore
if a>=5000 or tot-a>=5000: errori.append(f"stacco dopo {stacco}: una traccia supera i 5000 caratteri")
print(f"\nstacco tracce dopo {stacco}:  chunkA {a} car  ·  chunkB {tot-a} car   (limite 5000)")
print("\n" + ("OK, nessun errore" if not errori else "ERRORI:\n  " + "\n  ".join(errori)))
json.dump(blocchi, open("copione/blocchi.json","w",encoding="utf-8"), ensure_ascii=False, indent=1)
