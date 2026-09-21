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
CPS = 17.0

# La fascia entro cui un blocco e' sano. Sotto, la voce striscia e la scena si
# siede; sopra, corre e il testo della slide non fa in tempo a leggersi. Fuori
# fascia non e' un errore da bloccare: e' il segnale che quel confine va
# guardato.
FASCIA_CPS = (8.5, 21.0)

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
STACCO = "s24"                  # chunkA 3957 car · chunkB 3763 car
