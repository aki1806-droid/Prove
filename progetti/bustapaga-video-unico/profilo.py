# -*- coding: utf-8 -*-
"""I parametri di QUESTO video, dichiarati in un posto solo (MASTER §4).

Non e' una micro-lezione: e' un video unico da circa un'ora, con avatar, e i
numeri vengono dalla scheda tecnica dello script dell'utente, non dal profilo
del corso OSS. Il MASTER §1 lo dice esplicitamente: quando il copione di
partenza si da' uno standard suo, la durata sua vince.

Ogni valore porta accanto da dove viene. Quelli senza una fonte misurata non
sono parametri: sono indovinelli — e qui ce n'e' uno solo, CPS, segnato come
tale finche' non si misura sulla prima traccia.
"""

# --- dallo script dell'utente (origine/SCRIPT_VIDEO_UNICO.md, §1) ------------

DURATA_CHIESTA = 3600.0         # «circa 60 minuti», dichiarati dallo script

# Voce e modello sono dichiarati nella scheda tecnica dello script. NON sono
# quelli del corso OSS (GianP su eleven_v3): questo e' un altro prodotto, per
# lo stesso committente. L'id e' stato risolto con creative_list_voices, non
# ricordato a memoria: «Achille nuovo 1», clonata, italiana.
VOCE_ID    = "KerPEYZvLEWNATg4AARX"
VOCE_NOME  = "Achille nuovo 1"
MODELLO    = "eleven_multilingual_v2"

# --- dalla forma del video ---------------------------------------------------

COPERTINA     = 3.0             # scena 001, muta
CHIUSURA      = 10.0            # scena 218, muta
CARD_CAPITOLO = 2.0             # 13 card di capitolo, mute

# --- dalla voce --------------------------------------------------------------

# ATTENZIONE: 17,0 e' il CPS misurato su GianP, un'ALTRA voce. Il MASTER §2 dice
# che cambiando voce va rimisurato PRIMA di scrivere il copione — qui il copione
# arriva gia' scritto, quindi il numero serve solo a prevedere la durata, e va
# corretto appena la prima traccia e' generata (parlato = grezzo / 1,30).
# Lo script assume 16,2 car/s (56.269 car in 58 min di parlato).
CPS = 17.0                      # DA RIMISURARE sulla prima traccia
FASCIA_CPS = (8.5, 21.0)

# --- dai servizi -------------------------------------------------------------

MAX_SCENE     = 50              # scene per chiamata di montaggio
MAX_CAR_CHUNK = 5000            # caratteri per richiesta di sintesi

# Il tetto dei caratteri per blocco del corso OSS (225) NON si applica qui: veniva
# dalla leggibilita' di una slide ferma, e in questo video 102 scene su 218 sono
# avatar o video, dove quel motivo non c'e'. Sulle 111 scene di immagine ferma
# invece vale, e 97 lo superano: e' un rilievo aperto, non un blocco.
MAX_CAR_BLOCCO_FERME = 225
