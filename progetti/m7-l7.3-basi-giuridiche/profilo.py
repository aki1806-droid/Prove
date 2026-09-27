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
DURATA_CHIESTA = 421.0          # 7:01 — «video da minimo 7 minuti» (corso Progressione
                                # verticale). Un secondo sopra: il montato HeyGen perde
                                # ~25 ms per scena rispetto al locale (MASTER §4, passo 7).

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
CPS = 17.3   # Luca Ward (tVdVcJPudubxmTmAw4tE), eleven_v3 — media delle lezioni 1.2-1.6
             # (16,9 / 17,4 / 17,8 / 17,0 / 17,5 car/s sul lavorato). Prima era 16,8,
             # misurata sulla 1.1 del corso PV:
             # 7777 car in 464,1 s di parlato netto (pose escluse) = 16,76 car/s.
             # Attenzione: su questa voce il rapporto grezzo/lavorato e' 1,39, non 1,30
             # (645 s di grezzo -> 464 s netti): le pause fra i blocchi sono piu' lunghe.

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
STACCO = "s25"                  # calcolato da costruisci.py
