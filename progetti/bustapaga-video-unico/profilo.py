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

# La scheda tecnica dello script dichiarava «Achille nuovo 1»
# (KerPEYZvLEWNATg4AARX), e con quella voce il video e' stato fatto una prima
# volta. L'utente ha poi ascoltato quattro alternative e ha scelto Francesca.
# L'id e' stato risolto con creative_list_voices, non ricordato a memoria.
VOCE_ID    = "HLbf5OcXzzI5RP4O3I3d"
VOCE_NOME  = "Francesca Bellucci"
MODELLO    = "eleven_multilingual_v2"

# La soglia di rumore sotto la quale si considera silenzio. NON e' un dettaglio
# tecnico ereditabile: e' un parametro DELLA VOCE, e cambiarla voce senza
# rimisurarla rompe il taglio dei blocchi.
#
# Su Achille, a -45dB, la traccia 1 dava 47 pause. Su Francesca, alla stessa
# soglia, ne dava QUATTRO in 55 secondi, e nessuna sopra 0,18 s: le pause le fa
# uguale, ma con un fondo di rumore piu' alto, e a -45dB sono invisibili. Con
# quattro appigli il DTW non ha su cosa appoggiarsi per trovare i confini.
#
# A -35dB il profilo torna quello di Achille (55 pause sulla traccia 1, 39
# lunghe) e su tutte e 17 le tracce le pause sono molte piu' dei confini da
# trovare. Misurato prima di generare, non scoperto dopo.
SOGLIA_SILENZIO = "-35dB"

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
CPS        = 16.04
CPS_GREZZO = 13.45
FASCIA_CPS = (8.5, 21.0)

# Il filtro di ritmo. La soglia NON e' scritta qui dentro: viene da
# SOGLIA_SILENZIO, perche' e' la stessa che serve a trovare i confini e le due
# non devono poter divergere. Con la soglia sbagliata silenceremove non toglie
# niente (su Francesca a -45dB il rapporto grezzo/lavorato era 1,000) e il
# video esce nove minuti piu' lungo.
#
# Su atempo la storia e' istruttiva. Lo script dichiarava 1.12, ereditato da
# una voce ancora diversa. Su «Achille nuovo 1» quel valore dava 54,2 min
# contro i 60 dichiarati dallo stesso script, e l'utente scelse di toglierlo:
# senza atempo il video usciva 59:46.
#
# Con Francesca il conto si ribalta. Lei e' piu' lenta, e senza atempo il video
# esce 64:51, quasi cinque minuti SOPRA i 60. Misurato sulle 203 tracce vere,
# non proiettato:
#
#     senza atempo   64:51        atempo 1.08   60:06   <- scelto
#     atempo 1.05    61:48        atempo 1.10   59:01
#
# 1.08 riporta il video sui 60 minuti dichiarati, ed e' meno di quanto chiedeva
# lo script. Scelta dell'utente sui numeri veri.
#
# Il filtro si applica in locale dopo la generazione: cambiarlo non costa una
# sintesi, solo un nuovo taglio dei blocchi.
RITMO = (f"silenceremove=start_periods=1:start_silence=0.03:start_threshold={SOGLIA_SILENZIO}:"
         f"stop_periods=-1:stop_silence=0.14:stop_threshold={SOGLIA_SILENZIO}:detection=peak,"
         "atempo=1.08,aresample=44100")

# --- dai servizi -------------------------------------------------------------

MAX_SCENE     = 50              # scene per chiamata di montaggio
MAX_CAR_CHUNK = 5000            # caratteri per richiesta di sintesi

# Il tetto dei caratteri per blocco del corso OSS (225) NON si applica qui: veniva
# dalla leggibilita' di una slide ferma, e in questo video 102 scene su 218 sono
# avatar o video, dove quel motivo non c'e'. Sulle 111 scene di immagine ferma
# invece vale, e 97 lo superano: e' un rilievo aperto, non un blocco.
MAX_CAR_BLOCCO_FERME = 225
