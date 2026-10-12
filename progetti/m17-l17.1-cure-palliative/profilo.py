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

# La voce e il modello con cui si generano le tracce. Non li legge nessuno
# strumento: entrano a mano nella chiamata di sintesi. Stanno qui perche' e'
# l'unico posto che la lezione successiva eredita, e una scelta che vive solo
# nella testa di chi lavora non sopravvive al cambio di chat.
#
# Moduli 1-16: GianP News Info and Documentary (`nNt0YcINdGadGcTx5fBM`).
# Dal modulo 17 il committente ha scelto una voce diversa: il clone del suo
# spazio di lavoro che si chiama «Luca Ward». Per sua dichiarazione NON e' la
# voce di Luca Ward ma una voce simile; il nome resta quello dato nel suo
# account. Quindi: mai accreditarla come Luca Ward, ne' nei titoli ne' nei
# materiali del corso.
#
# Dal modulo 17 il modello e' eleven_v4, su richiesta del committente.
# Provato prima di adottarlo, su sette voci compresa quella scelta: i tag di
# intenzione non vengono letti, gli accenti con l'apostrofo (e', piu') escono
# come vocali accentate, i numeri a parole restano a parole. Stessi parametri
# di eleven_v3, piu' `language_code`, che va messo a "it".
#
# Una differenza da tenere d'occhio: su v3 «l'OSS» veniva sillabato («o esse
# esse»); su v4 il riconoscitore sente «loss» con tutte e sette le voci, cioe'
# la sigla letta come parola. E' una pronuncia corrente nel settore, ma cambia
# rispetto ai moduli 1-16. Se si vuole sillabata, su v4 la pronuncia si fissa
# scrivendo l'IPA fra barre al posto della parola.
#
# Tutti i numeri qui sotto — CPS, RAPPORTO_RITMO, il costo di un credito per
# carattere — sono misurati su eleven_v3. Sulla prima lezione in v4 vanno
# rimisurati, e fino ad allora il copione si scrive CORTO: il respiro allunga,
# non accorcia.
VOCE         = "tVdVcJPudubxmTmAw4tE"   # clone «Luca Ward» del workspace (non e' Luca Ward)
MODELLO_VOCE = "eleven_v4"              # moduli 1-16: eleven_v3
LINGUA_VOCE  = "it"

# Il filtro di ritmo: quanto si accelera la voce e a quanto si riducono le
# pause dentro un blocco. Sono i due numeri che decidono quanto una lezione
# suona veloce, e stavano scritti dentro tagli.py come 1.12 e 0,14 s — tarati
# su GianP con eleven_v3, e mai dichiarati.
#
# Il modulo 17 chiede un «ritmo di lettura leggermente piu' lento rispetto
# agli altri moduli». Tarato sul provino della voce nuova (eleven_v4), stessa
# frase, filtri a confronto:
#
#     pause 0,14 s · 1,12x   18,37 car/s   (il filtro dei moduli 1-16)
#     pause 0,20 s · 1,06x   17,01 car/s   -7%
#     pause 0,22 s · 1,04x   16,59 car/s   -10%   <- scelto
#     pause 0,25 s · 1,00x   15,80 car/s   -14%
#
# La voce resta quasi alla sua velocita' naturale e le frasi respirano. Era
# una misura su una frase sola; la 17.1 l'ha confermata (16,86 car/s netti
# sulla lezione intera, +1,6%).
ATEMPO        = 1.04    # moduli 1-16: 1.12
PAUSA_INTERNA = 0.22    # secondi; moduli 1-16: 0.14

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
# Dal modulo 17 (voce nuova, eleven_v4, filtro qui sopra): 16,59 car/s sul
# provino, 16,86 misurati sulla 17.1 intera. Il copione si scrive un po' piu'
# corto di quanto questo numero suggerisce, e lo colma il respiro.
CPS = 16.9               # 17.1: 16,86 · moduli 1-16, GianP v3: 17,52 · 18,31 · 17,63 · 18,32

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
# Di quanto il filtro di ritmo accorcia la traccia: grezzo diviso lavorato
# netto. Misurato 1,252 · 1,240 · 1,246 · 1,290 su quattro lezioni della stessa
# voce: varia del 4%, esattamente come il CPS. Per tre lezioni e' sembrato
# stabile alla terza cifra e l'ho scritto; la quarta misura lo ha smentito.
# Le due lezioni col CPS praticamente identico (18,31 e 18,32) hanno dato
# rapporti 1,240 e 1,290, quindi i due numeri non vanno nemmeno insieme.
#
# Serve a una cosa sola: a `tagli.py allinea`, che deve stimare il ritmo
# LAVORATO guardando soltanto la traccia grezza, per segnalare i confini da
# guardare. E' una stima e sbaglia in entrambi i versi — il controllo vero e'
# quello che `applica` fa sul lavorato. Prima stava scritto 1.30 dentro lo
# strumento: il numero non e' sbagliato, e' che non e' degli strumenti.
#
# Niente di tutto questo serve a prevedere la durata del montato: a quella
# pensa il respiro, che misura invece di stimare.
RAPPORTO_RITMO = 1.10   # 17.1: 1,104 (provino 1,10) · moduli 1-16: 1,24-1,29

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
STACCO = "s25"                  # chiude il cap 7 · chunkA 3660 car · chunkB 3569 car
