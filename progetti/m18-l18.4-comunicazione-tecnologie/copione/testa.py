# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Riscrittura del copione in origine/copione-di-partenza.md (lezione 18.4). Le
# 13 scene di partenza stanno a ~540 caratteri l'una, contro un tetto di 225
# per blocco: ogni scena diventa tre o quattro blocchi, nello stesso ordine.
#
# Il parlato di partenza misura 7.054 caratteri, circa 7.120 con gli
# apostrofi: al bordo alto della forchetta del modulo (7.020-7.120 con tredici
# capitoli). Nessuna aggiunta; qualche parola di raccordo in meno dove il
# documento si ripete. NESSUN fatto tolto.
#
# Registro del modulo: tecnico e pratico. Il capitolo su tecnologia, dignita'
# e controllo e' il punto delicato della lezione: detto piano, senza tag.
# Tag: [warm] in apertura e in chiusura, [thoughtful] sul riepilogo.
#
# Il velo rosa sta su che cosa NON si fa con chi sente poco o comunica con la
# CAA, sulla tecnologia come contenzione, e sui distrattori.
BLOCCHI = [
 (1,"chiaro",0,"[warm] Bentornata e bentornato. In questa lezione affrontiamo gli ausili per la comunicazione e i sensi, e le tecnologie assistive, cioe' la parte del modulo che cambia piu' rapidamente."),
 (1,"profondo",0,"Parto da un criterio che vale per tutto: la tecnologia aiuta se la persona la governa, non il contrario."),
 (1,"chiaro",1.2,"Un sensore che la persona non capisce, un dispositivo che la sorveglia senza che lo sappia, non sono assistenza: sono controllo. E su questo la lezione sara' chiara."),

 (2,"chiaro",0,"Le protesi acustiche. Esistono retroauricolari, endoauricolari e a occhiale. L'OSS aiuta a inserirla correttamente, verifica che sia accesa, e cambia o ricarica la batteria."),
 (2,"chiaro",0,"La batteria e' la causa piu' frequente di non funzionamento. Pulizia quotidiana con un panno asciutto: cerume e umidita' sono i nemici. Non si bagna: si toglie prima del bagno e della doccia."),
 (2,"chiaro",1.2,"Si conserva in un contenitore identificato, perche' un apparecchio perso significa per la persona giorni di isolamento. E il fischio indica inserimento scorretto o volume troppo alto."),

 (3,"chiaro",0,"Comunicare con chi sente poco, anche con la protesi. Mettersi di fronte, alla stessa altezza, con il viso illuminato, perche' molte persone leggono le labbra senza saperlo."),
 (3,"tenue",0,"Parlare chiaramente, non gridare: gridare distorce i suoni. Frasi brevi, ridurre il rumore di fondo, non coprirsi la bocca."),
 (3,"chiaro",0,"Verificare la comprensione, e se non ha capito ripetere con parole diverse, non piu' forte."),
 (3,"profondo",1.2,"Il deficit uditivo non trattato e' associato a isolamento, depressione e declino cognitivo. L'apparecchio funzionante e' prevenzione."),

 (4,"chiaro",0,"La vista. Gli occhiali devono essere puliti, integri, della persona giusta e a portata di mano: in struttura gli occhiali scambiati sono un problema reale."),
 (4,"chiaro",0,"Lenti d'ingrandimento, anche con luce, caratteri grandi, contrasti netti. Illuminazione forte e uniforme, senza abbagliamento, e una luce notturna."),
 (4,"chiaro",0,"Per chi non vede: ambiente stabile, con gli oggetti sempre nello stesso posto, e descrizione a voce di cio' che si fa."),
 (4,"chiaro",1.2,"Nel pasto si descrive il piatto come un orologio: la carne alle sei, le verdure alle dodici. Poi bastone bianco, cane guida, sintesi vocale."),

 (5,"chiaro",0,"La comunicazione aumentativa e alternativa, la CAA, e' l'insieme degli strumenti per chi non puo' comunicare con la voce o con la scrittura ordinaria."),
 (5,"chiaro",0,"Afasia dopo ictus, SLA, paralisi cerebrale, disabilita' intellettiva, autismo. Gli strumenti vanno dalle tabelle di simboli o lettere, indicate con il dito, lo sguardo o un puntatore,"),
 (5,"chiaro",0,"ai comunicatori con sintesi vocale, ai tablet, fino ai puntatori oculari per chi muove solo gli occhi."),
 (5,"profondo",1.2,"La CAA non sostituisce la voce: la affianca e la sostiene. E va introdotta presto, non quando non c'e' piu' alternativa."),

 (6,"chiaro",0,"L'OSS e la CAA. Conoscere il sistema della persona: quali simboli, quale tabella, quale dispositivo. Tenere lo strumento sempre a portata, perche' una tabella in un cassetto e' una persona senza voce."),
 (6,"tenue",0,"Dare il tempo: la comunicazione con la CAA e' lenta, e la fretta la rende impossibile. Non anticipare, non completare le frasi, non fingere di aver capito."),
 (6,"chiaro",1.2,"Imparare almeno le parole di sopravvivenza: si', no, dolore, bagno, aspetta. E il dispositivo elettronico con batteria carica e acceso, come la protesi acustica."),

 (7,"chiaro",0,"La teleassistenza, o telesoccorso. E' un pulsante portatile, al collo o al polso, collegato a una centrale attiva ventiquattro ore."),
 (7,"chiaro",0,"La persona preme e parla con un operatore che attiva i soccorsi o i familiari. E' per chi vive solo ed e' a rischio di caduta o malore."),
 (7,"chiaro",0,"Due requisiti: la persona deve capire e voler usare il dispositivo, e deve tenerlo addosso, perche' la caduta avviene lontano dal comodino."),
 (7,"chiaro",1.2,"Esiste anche con rilevazione automatica di caduta. E' spesso attivata dal Comune o dall'ULSS, e l'OSS puo' segnalare il bisogno."),

 (8,"chiaro",0,"Telemonitoraggio e telemedicina. Il telemonitoraggio usa dispositivi che rilevano parametri a casa e li trasmettono: pressione, glicemia, saturazione, peso. La telemedicina e' la visita o il consulto a distanza."),
 (8,"chiaro",0,"Sono strumenti del territorio e delle Centrali Operative Territoriali che hai visto nel Modulo tredici: la persona cronica resta a casa, seguita a distanza."),
 (8,"chiaro",0,"L'OSS al domicilio aiuta nell'uso, verifica che la rilevazione avvenga, segnala le difficolta'."),
 (8,"profondo",1.2,"Non interpreta i dati, e non modifica terapie sulla base dei dati: valgono le stesse regole dei parametri del Modulo otto."),

 (9,"chiaro",0,"Sensori, localizzatori e domotica. I sensori di caduta, di letto, di movimento, sulle porte. I localizzatori GPS per chi e' a rischio di allontanamento, tipicamente nella demenza."),
 (9,"chiaro",0,"La domotica: luci che si accendono al passaggio, comandi vocali, controllo del gas, apriporta. Aiutano la sicurezza, ma con tre condizioni: consenso, informazione e proporzionalita'."),
 (9,"chiaro",1.2,"Un sensore non sostituisce la presenza, e un localizzatore non sostituisce la sorveglianza. E il dato raccolto e' un dato personale, trattato con le regole del Modulo dodici."),

 (10,"chiaro",0,"Tecnologia, dignita' e controllo, che e' il punto delicato della lezione. La tecnologia puo' essere contenzione: un sensore che impedisce di uscire, una telecamera in stanza."),
 (10,"profondo",0,"La domanda da porsi, sempre, e' se questo dispositivo amplia la liberta' della persona, o la riduce."),
 (10,"tenue",0,"Sorvegliare senza che la persona lo sappia e' una violazione, anche a fin di bene. Le tecnologie si usano con la persona, mai contro."),
 (10,"chiaro",1.2,"Nella demenza avanzata decide chi la rappresenta, con il principio del minor intervento: il dispositivo meno invasivo che garantisce la sicurezza necessaria."),

 (11,"chiaro",0,"Gli ausili per la memoria e l'orientamento, per la demenza iniziale e il deterioramento cognitivo lieve. L'orologio calendario con data, giorno e ora in caratteri grandi."),
 (11,"chiaro",0,"La lavagna con il programma della giornata. I promemoria sonori per i farmaci, e i dispenser con allarme, preparati da chi ha competenza."),
 (11,"chiaro",0,"Le etichette sugli armadi e sulle porte, le fotografie con il nome accanto. Il telefono con pochi tasti grandi e le foto dei contatti."),
 (11,"profondo",1.2,"E gli ausili piu' efficaci, che non si comprano: la routine stabile e l'ambiente invariato."),

 (12,"tenue",0,"I distrattori tipici della lezione. La protesi acustica non si bagna, e il fischio indica inserimento scorretto o volume troppo alto. Con chi sente poco non si grida: si parla chiaro, di fronte, alla stessa altezza."),
 (12,"tenue",0,"La CAA affianca la voce e non la sostituisce, e si introduce presto. Il telesoccorso funziona solo se la persona lo tiene addosso."),
 (12,"tenue",1.2,"I sensori e i localizzatori richiedono consenso, e il dato raccolto e' un dato personale. E un dispositivo tecnologico puo' essere una forma di contenzione."),

 (13,"chiaro",0,"[thoughtful] Riepiloghiamo. La protesi acustica richiede batteria, pulizia a secco, non si bagna, si conserva identificata."),
 (13,"chiaro",0,"Con chi sente poco si parla di fronte, chiaro, senza gridare; per la vista servono occhiali giusti, luce e ambiente stabile. La CAA comprende tabelle, comunicatori e puntatori oculari: a portata, con tempo, senza anticipare."),
 (13,"chiaro",0,"La teleassistenza va tenuta addosso; nel telemonitoraggio l'OSS aiuta ma non interpreta. Sensori e domotica richiedono consenso e proporzionalita', e la tecnologia non sostituisce la presenza."),
 (13,"chiaro",0,"[warm] Nella prossima lezione: scelta, sicurezza, manutenzione, e il riepilogo del modulo."),
]

CAPITOLI = {1:"La lezione",2:"Le protesi acustiche",3:"Chi sente poco",
 4:"La vista",5:"La CAA",6:"L'OSS e la CAA",
 7:"La teleassistenza",8:"Telemonitoraggio e telemedicina",9:"Sensori e domotica",
 10:"Tecnologia, dignita' e controllo",11:"Memoria e orientamento",12:"I distrattori",
 13:"Riepilogo"}
