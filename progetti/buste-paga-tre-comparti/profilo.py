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

# MISURATO il 14 novembre 2026 sulle DIECI TRACCE VERE della sanita' pubblica:
# 19.537 caratteri parlati, 1.284,2 s di grezzo. Non e' piu' la stima su un
# campione: il campione del 13 novembre (1.546 caratteri, 107,08 s) dava 14,44
# car/s, cioe' il 5,3% piu' lento del vero. Un campione non e' una traccia, e
# con il numero del campione il video sarebbe uscito un minuto piu' lungo di
# quanto esce davvero.
#
# Non ereditato: sullo stesso timbro, ma su eleven_multilingual_v2, il grezzo
# era 13,45 car/s. Su v4 e' il 13% piu' veloce.
#
# Le dieci tracce vanno da 13,73 a 16,10 car/s, e NON e' rumore: le due piu'
# lente sono la 8 e la 9, il capitolo del contratto nuovo, pieno di cifre e con
# i tag [slowly] addosso. La voce rallenta dove le si e' chiesto di rallentare.
#
# I caratteri si contano PARLATI, cioe' senza i tag: i tag stanno nel testo
# inviato (e si pagano) ma non si pronunciano — parlato() in strumenti.py.
# Contandoli, il CPS si gonfia e il copione esce corto quanto i tag contiene.
CPS_GREZZO = 15.21
# MISURATO anch'esso sulle dieci tracce vere, passandole per RITMO: il
# rapporto grezzo/lavorato a -40 dB e' 1,0349, non l'1,063 del campione. Il
# campione aveva piu' pause di una traccia intera — e' la stessa ragione per
# cui il suo CPS era piu' lento.
CPS        = 15.74              # lavorato, alla soglia scelta qui sotto
# La fascia e' una rete per i tagli finiti nel posto sbagliato: un blocco molto
# piu' lento o piu' veloce della sua traccia ha quasi sempre preso un pezzo del
# vicino. Il limite basso era 8,5 e lo abbassa UN blocco solo, misurato: s091
# legge ad alta voce sei importi in fila («da 87,79 a 181,14... da 78,27 a
# 161,50... da 73,41 a 151,48») e sta a 7,6 car/s. Non e' un taglio sbagliato:
# e' una tabella detta a voce, e le cifre costano molti secondi e pochi
# caratteri. La prosa di questi copioni non scende mai sotto i 12.
FASCIA_CPS = (7.0, 21.0)

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

# --- i percorsi, dichiarati qui una volta sola -------------------------------
#
# Non e' pignoleria: dieci strumenti si costruivano il percorso per conto loro
# («copione/blocchi.json», «audio/grezzo», «slide/mp4»), ed erano tutti nomi
# SENZA comparto. Il secondo video avrebbe letto i blocchi del primo e scritto
# le sue tracce sopra le sue — in silenzio, perche' un file che esiste si apre
# senza protestare. Il suffisso sta qui, e chi lo dimentica non puo' piu'
# dimenticarlo in dieci posti diversi.
#
# Il vecchio asse VOCE (due edizioni dello stesso video) non c'e' piu': qui la
# voce e' una sola e l'asse che conta e' il comparto.
import pathlib
RADICE = pathlib.Path(__file__).resolve().parent
_S = f"-{COMPARTO}"

P_BLOCCHI_JSON = RADICE/"copione"/f"blocchi{_S}.json"
P_TRACCE       = RADICE/"copione"/f"tracce{_S}.json"

P_CHUNK        = RADICE/"audio"/f"chunk{_S}"
P_GREZZO       = RADICE/"audio"/f"grezzo{_S}"
P_TRASCRIZIONI = RADICE/"audio"/f"trascrizioni{_S}"
P_BLOCCHI_MP3  = RADICE/"audio"/f"blocchi{_S}"
P_REGISTRO     = RADICE/"audio"/f"blocchi-audio{_S}.json"
P_CONFINI      = RADICE/"audio"/f"confini{_S}.json"
P_MISURATE     = RADICE/"audio"/f"tracce-misurate{_S}.json"
P_ESITI_CONFINI= RADICE/"audio"/f"esiti-confini{_S}.json"
P_ESITI_TESTO  = RADICE/"audio"/f"esiti-testo{_S}.json"
P_PROPOSTE     = RADICE/"audio"/f"proposte-confini{_S}.json"
P_PROVA_MP3    = RADICE/"audio"/f"prova{_S}.mp3"
P_PROVA_JSON   = RADICE/"audio"/f"prova{_S}.json"
P_PROVA_DIR    = RADICE/"audio"/f"_prova{_S}"

P_PNG          = RADICE/"slide"/f"png{_S}"
P_CLIP         = RADICE/"slide"/f"mp4{_S}"
P_TROPPO_ALTE  = RADICE/"slide"/f"troppo-alte{_S}.json"

P_SCENE        = RADICE/f"scene{_S}"
P_MONTAGGIO    = RADICE/f"_montaggio{_S}"
P_INDICE       = RADICE/f"indice-capitoli{_S}.txt"
NOME_MONTATO   = f"busta-paga{_S}"
P_MONTATO      = RADICE/f"montato-{NOME_MONTATO}.mp4"
P_SRT          = RADICE/f"montato-{NOME_MONTATO}.srt"
