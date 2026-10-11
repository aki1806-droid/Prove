# -*- coding: utf-8 -*-
"""I parametri di questa lezione, dichiarati in un posto solo.

Il metodo non fissa ne' una durata ne' un numero di scene: li fissano il
committente, la voce e il servizio di montaggio. Prima stavano murati a meta'
di quattro strumenti diversi, che e' il modo di farli sbagliare sulla prima
lezione che ha un numero diverso — succede, ed e' costato un montato non
prodotto e tre controlli che fallivano a torto.

Ogni valore porta accanto da dove viene. Quelli senza una fonte misurata non
sono parametri: sono indovinelli.
"""

# --- dal committente ---------------------------------------------------------

# La durata montata chiesta, in secondi. E' la risposta alla seconda domanda
# del §1, ed e' il vincolo da cui discende tutto il resto: i caratteri da
# scrivere, e quindi il numero di blocchi.
DURATA_CHIESTA = 470.0          # 7:50 — standard «7-8 minuti» del corso OSS

# --- dalla forma del video ---------------------------------------------------

# Copertina e chiusura sono immagini ferme: non portano parlato, ma occupano
# durata montata e vanno tolte dal tempo disponibile per la voce.
COPERTINA = 3.0
CHIUSURA  = 10.0

# --- dalla voce --------------------------------------------------------------

# Caratteri al secondo della traccia DOPO il filtro di ritmo. Misurata, non
# stimata: e' il rapporto fra i caratteri del copione e il parlato che ne esce.
# Su nove lezioni il reale e' andato da 15,8 a 17,6 — lo scarto dipende dalla
# densita' di cifre e di sigle, che costano molte piu' sillabe dei caratteri
# che occupano. Cambiando voce o lingua va rimisurata.
#
# MISURATO su questa lezione (GianP, eleven_v3, italiano): 17,52 car/s sui
# 7.708 caratteri e 439,9 s di voce netta. Il 17,0 e' quindi pessimistico del
# 3%, ed e' il motivo per cui il primo montato e' uscito 7 s sotto i 7:50.
#
# Attenzione a quale numero si misura. Il rapporto caratteri / parlato TOTALE
# dava 16,75, perche' il parlato totale comprende le pose, che non sono voce.
# Sul netto sono 17,52. Chi usa il numero sbagliato predice una durata
# sbagliata in un verso o nell'altro, e non capisce perche'.
#
# Quindi l'aritmetica del §2 vuole le pose a parte:
#     voce_netta = durata_chiesta - copertina - chiusura - pose
#     caratteri  = voce_netta * CPS
# Su questa lezione le pose sono 20,3 s su 17 blocchi: 1,2 s a ogni cambio di
# capitolo (12), tre battiti a meta' capitolo, e 2,3 s di allungamento
# automatico dei due blocchi sotto i 3,5 s.
CPS = 17.52

# La fascia entro cui un blocco e' sano. Sotto, la voce striscia e la scena si
# siede; sopra, corre e il testo della slide non fa in tempo a leggersi. Fuori
# fascia non e' un errore da bloccare: e' il segnale che quel confine va
# guardato.
FASCIA_CPS = (8.5, 21.0)

# Il respiro: quanto si puo' allungare OGNI blocco, al taglio, per arrivare
# alla durata chiesta.
#
# Serve perche' il CPS non e' una costante della voce. Misurato 17,52 sulla
# 16.2 e 18,31 sulla 16.3 — stessa voce, stesso modello, stesse impostazioni,
# il 4,5% di differenza fra una lezione e l'altra. Il rapporto fra traccia
# grezza e traccia lavorata invece e' stabile (1,252 e 1,240), quindi la
# variabilita' sta nella lettura, non nel filtro di ritmo. Su otto minuti il
# 4,5% sono venti secondi: la durata non si puo' predire, si puo' solo
# misurare dopo.
#
# Ma le pose si applicano al TAGLIO, non alla generazione. Quindi la durata
# chiesta smette di essere una previsione e diventa un vincolo: si scrive un
# copione un po' corto, si misura la voce, e `tagli.py applica` distribuisce
# la differenza come respiro su ogni blocco. Costa zero e non rigenera niente.
#
# Il tetto esiste perche' il respiro non deve poter coprire un copione
# gravemente corto: oltre questo valore `applica` si ferma e lo dice, invece
# di consegnare un video pieno di buchi.
#
# Funziona in un verso solo. Se il copione e' troppo LUNGO il montato sfora e
# nessuna posa lo accorcia: per questo si mira sotto, non sopra.
RESPIRO_MAX = 0.6

# Quanto perde il servizio di montaggio su OGNI scena, arrotondando al
# fotogramma. Il montato locale e quello renderizzato non durano uguale:
#
#     16.1   470,80 locale ->  469,62 renderizzato   1,18 s su 48 scene
#     16.2   473,60 locale ->  472,27 renderizzato   1,33 s su 48 scene
#     16.3   470,47 locale ->  469,06 renderizzato   1,41 s su 49 scene
#
# Sono 25-29 ms a scena, sempre nello stesso verso. Finche' il respiro mirava
# ai 470 s del montato LOCALE, il video consegnato usciva sotto: la 16.1 di
# 0,38 s, la 16.3 di 0,94. Il controllo del §6 guarda il file locale e passa,
# ma il file che riceve il committente e' l'altro.
#
# Quindi il respiro mira piu' in alto di questo margine per scena. Non e' una
# stima: sono tre misure sullo stesso servizio e nello stesso formato. Con un
# servizio o un frame rate diversi va rimisurato.
ARROTONDA_SCENA = 0.030

# --- dal servizio di montaggio -----------------------------------------------

# Quante scene accetta una singola chiamata di montaggio. Non e' una scelta
# editoriale: e' il tetto del servizio, e sopra rifiuta. Va riverificato se si
# cambia servizio. Cinquanta e' un tetto, non un obiettivo: una lezione da 48
# scene vale quanto una da 50.
MAX_SCENE = 50

# --- dalla leggibilita' della slide ------------------------------------------

# Quanto testo parlato sta sopra una singola inquadratura. Sopra questa
# soglia la slide non regge il testo e la scena dura troppo. Quando un blocco
# sfora non si comprime il testo: si prende una scena in piu', se c'e' spazio
# sotto MAX_SCENE. Una parola tagliata per far stare un blocco cambia il senso,
# ed e' gia' successo.
MAX_CAR_BLOCCO = 225

# --- dal copione -------------------------------------------------------------

# L'ultimo blocco della traccia A. Le due tracce si generano separate perche'
# una sola supererebbe il limite del servizio di sintesi, e lo stacco va su un
# cambio di capitolo, dove il cambio di tono e' voluto. `costruisci.py` lo
# calcola e lo stampa; qui si ricopia. Va riletto A OGNI LEZIONE: quello della
# lezione precedente taglia la traccia nel punto sbagliato e nessun controllo
# se ne accorge, perche' i conti tornano tutti — solo sui blocchi sbagliati.
STACCO = "s25"                  # chunkA 3931 car · chunkB 3758 car
