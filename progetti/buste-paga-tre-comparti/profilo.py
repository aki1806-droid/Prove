# -*- coding: utf-8 -*-
"""I parametri dei TRE video sulla busta paga, dichiarati in un posto solo.

Tre video da circa venti minuti, uno per comparto: sanita' pubblica, enti
locali, sanita' privata. Stessa voce, stesse slide, stessa libreria grafica —
tre copioni diversi, perche' i tre contratti raccontano storie opposte e un
copione solo adattato sarebbe falso in due casi su tre (vedi FONTI.md).

Un progetto solo con un parametro COMPARTO, non tre progetti copiati: la
libreria grafica e' di 892 righe con venti tipi di figura, e tre copie
diverge-rebbero alla prima correzione. E' la stessa ragione per cui gli
strumenti stanno fuori da profilo.py, applicata un piano piu' su.
"""
import os

# --- i tre comparti ----------------------------------------------------------

COMPARTI = ("sanita-pubblica", "enti-locali", "sanita-privata")
# COMPARTO=enti-locali sceglie quale video. Entra nei PERCORSI (copione,
# contenuti, scene, montato) invece di sovrascrivere, come gia' fa VOCE.
COMPARTO = os.environ.get("COMPARTO", COMPARTI[0]).strip().lower()
if COMPARTO not in COMPARTI:
    raise SystemExit(f"COMPARTO={COMPARTO!r} non esiste. Scegli fra: {', '.join(COMPARTI)}")

DURATA_CHIESTA = 1200.0         # «circa 20 minuti», chiesti dall'utente
SCARTO_DURATA_OK = 20.0         # quanto puo' stare sotto senza che sia un difetto

# --- la voce -----------------------------------------------------------------

# Francesca Bellucci, scelta dall'utente. L'id viene dal profilo del video da
# un'ora, non dalla memoria.
VOCE_ID    = "HLbf5OcXzzI5RP4O3I3d"
VOCE_NOME  = "Francesca Bellucci"
# eleven_v4: lo ha chiesto l'utente, «con tag». Cambiare MODELLO e' come
# cambiare voce — niente si eredita, e infatti qui sotto NIENTE e' ereditato.
MODELLO    = "eleven_v4"

# MISURATO il 13 novembre 2026 su 1.546 caratteri parlati e 107,08 s di grezzo,
# con i tag dentro il testo. Non ereditato: sullo stesso timbro, ma su
# eleven_multilingual_v2, il grezzo era 13,45 car/s. Su v4 e' il 7,4% piu'
# veloce, e con il numero vecchio ogni video sarebbe uscito un minuto e mezzo
# corto su venti.
#
# I caratteri si contano PARLATI, cioe' senza i tag: i tag stanno nel testo
# inviato (e si pagano) ma non si pronunciano. Contandoli, il CPS si gonfia e
# il copione esce corto quanto i tag che contiene.
CPS_GREZZO = 14.44
CPS        = 15.35              # lavorato, alla soglia scelta qui sotto
FASCIA_CPS = (8.5, 21.0)

# La soglia di silenzio e' un parametro DELLA VOCE *e* del modello. Misurata
# sulla stessa traccia, pause lunghe (>=0,18 s) in 107 secondi:
#
#     -50dB    3   inutilizzabile
#     -45dB   21   rapporto grezzo/lavorato 1,028 · CPS lavorato 14,84
#     -40dB   29   rapporto 1,063 · CPS 15,35     <- scelta
#     -35dB   36   rapporto 1,091 · CPS 15,74
#     -30dB   45   rapporto 1,117 · CPS 16,13
#
# Sul video precedente, su multilingual_v2, questa stessa voce a -45dB dava
# QUATTRO pause in 55 secondi e il DTW non aveva appigli: fu quello a imporre
# -35dB. Su v4 il fondo di rumore e' piu' pulito e a -45dB ne da' gia' 21.
# -40dB sta in mezzo: ventinove appigli sono abbondanti per blocchi da dodici a
# diciassette secondi, e sta piu' lontano dal parlato di quanto stesse -35,
# quindi rischia meno di mangiare consonanti deboli.
# DA CONFERMARE sulla prima traccia vera: un campione non e' una traccia.
SOGLIA_SILENZIO = "-40dB"

# Il filtro di ritmo. SENZA atempo, per ora: su eleven_v4 il parametro `speed`
# non esiste (il ritmo si fa con i tag e con questo filtro), e il fattore
# giusto si decide sulla durata VERA del montato, non prima. Sul video da
# un'ora fu 1.08, ma era un'altra lunghezza e un altro modello.
RITMO = (f"silenceremove=start_periods=1:start_silence=0.03:start_threshold={SOGLIA_SILENZIO}:"
         f"stop_periods=-1:stop_silence=0.14:stop_threshold={SOGLIA_SILENZIO}:detection=peak,"
         "aresample=44100")

# --- dalla forma del video ---------------------------------------------------

COPERTINA     = 3.0
CHIUSURA      = 10.0
CARD_CAPITOLO = 2.0

# --- dai servizi -------------------------------------------------------------

MAX_SCENE     = 50
MAX_CAR_CHUNK = 2900            # caratteri per traccia di sintesi
MAX_CAR_BLOCCO_FERME = 225

# Quanto copione serve, ricavato e non indovinato: venti minuti meno le scene
# mute, per il CPS lavorato. Con otto capitoli: 3 + 10 + 8x2 = 29 s muti.
#   (1200 - 29) x 15,35 = circa 17.975 caratteri parlati a video.
# Tre video: ~54.000 caratteri, cioe' ~54.000 crediti ElevenLabs (~$8,90).
CARATTERI_ATTESI = round((DURATA_CHIESTA - 29) * CPS)
