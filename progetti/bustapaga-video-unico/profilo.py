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

# Quanto puo' stare SOTTO la durata chiesta senza che sia un difetto.
# Non e' una tolleranza generica: e' una DECISIONE dell'utente, presa sul
# numero vero. Il montato e' uscito 59:46,84, cioe' 13,2 s sotto, e all'utente
# e' stato chiesto se li voleva recuperati con altro contenuto: ha risposto che
# non sono un problema. Lo script del resto scrive «durata stimata 60 min»,
# non «almeno 60:00».
# Sta qui e non dentro controlli.py perche' e' un numero della lezione, non
# dello strumento — e perche' scritto qui si vede, mentre nascosto in un
# confronto passerebbe inosservato al prossimo video.
SCARTO_DURATA_OK = 20.0

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
# MISURATO sulla traccia 1 di questa voce (1.739 car, 114,70 s di grezzo),
# non ereditato: 15,16 car/s grezzi, 15,68 dopo il filtro di ritmo scelto.
# Aggiornati sulle 17 tracce vere, non piu' sulla sola traccia 1:
# 56.472 caratteri in 3.547,7 s di parlato lavorato.
CPS        = 15.92
CPS_GREZZO = 15.16
FASCIA_CPS = (8.5, 21.0)

# Il filtro di ritmo, SENZA atempo. Lo script dichiarava atempo=1.12, ma quel
# valore veniva da un'altra voce: su «Achille nuovo 1» il rapporto
# grezzo/lavorato e' 1,158 e non 1,30, perche' questa voce lascia pause piu'
# corte e silenceremove toglie meno. Con 1.12 il video usciva di 54,2 min
# contro i 60 dichiarati dallo stesso script; con il solo silenceremove esce
# 60,7. Fra le due righe in conflitto della scheda tecnica l'utente ha scelto
# la durata. Misure in REGISTRO.md.
RITMO = ("silenceremove=start_periods=1:start_silence=0.03:start_threshold=-45dB:"
         "stop_periods=-1:stop_silence=0.14:stop_threshold=-45dB:detection=peak,"
         "aresample=44100")

# --- dai servizi -------------------------------------------------------------

MAX_SCENE     = 50              # scene per chiamata di montaggio
MAX_CAR_CHUNK = 5000            # caratteri per richiesta di sintesi

# Il tetto dei caratteri per blocco del corso OSS (225) NON si applica qui: veniva
# dalla leggibilita' di una slide ferma, e in questo video 102 scene su 218 sono
# avatar o video, dove quel motivo non c'e'. Sulle 111 scene di immagine ferma
# invece vale, e 97 lo superano: e' un rilievo aperto, non un blocco.
MAX_CAR_BLOCCO_FERME = 225
