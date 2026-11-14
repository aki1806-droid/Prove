# Registro — Leggere la busta paga, tre comparti

Un progetto, tre video da circa venti minuti: **sanità pubblica**, **enti
locali**, **sanità privata**. Stessa voce, stesse slide, stessa libreria
grafica; tre copioni diversi, perché i tre contratti raccontano storie opposte
(vedi `FONTI.md`). Il comparto si sceglie con `COMPARTO=` e entra in tutti i
percorsi, dichiarati una volta sola in `profilo.py`.

Committente: **CISL FP Padova Rovigo**. Niente avatar: slide a piena
inquadratura e voce.

## Dove siamo

| | sanità pubblica | enti locali | sanità privata |
|---|---|---|---|
| copione | 111 scene, fatto | da scrivere | da scrivere |
| slide | 111, renderizzate e guardate | — | — |
| voce | 10 tracce, fatta | — | — |
| confini | 90 su 90, dai tempi delle parole | — | — |
| montato | 21:09, fatto | — | — |

## Le cose misurate, non ereditate

- **CPS grezzo 15,21 car/s** sulle dieci tracce vere (19.537 caratteri parlati,
  1.284,2 s). Il campione del 13 novembre diceva 14,44: era il **5,3% più
  lento** del vero. Un campione non è una traccia.
- **Rapporto grezzo/lavorato 1,0349** a −40 dB, da cui **CPS lavorato 15,74**.
  Anche qui il campione sbagliava (1,063): aveva più pause di una traccia
  intera, ed è la stessa ragione per cui il suo CPS era più lento.
- **Le dieci tracce vanno da 13,73 a 16,10 car/s**, e non è rumore: le due più
  lente sono la 8 e la 9, il capitolo del contratto nuovo, pieno di cifre e con
  i tag `[slowly]` addosso. La voce rallenta dove le si è chiesto di rallentare.
- **Costo della voce: 20.046 crediti ElevenLabs, 3,31 dollari** per i dieci
  chunk, una generazione ciascuno. Le trascrizioni di allineamento: **zero**.

## I confini senza ascoltare

Il metodo del video da un'ora cercava i silenzi, ci appoggiava un DTW, montava
una `prova.mp3` di spezzoni da 1,6 s e la faceva trascrivere per verificare un
confine alla volta. Qui non serve: la trascrizione di una traccia generata
torna con **l'istante di inizio e fine di ogni parola**, e le parole sono
esattamente quelle del copione. Il confine fra due blocchi sta fra l'ultima
parola di uno e la prima del successivo, e si taglia a metà della pausa.

`audio/confini-da-parole.py` lo fa e **controlla che le parole trascritte siano
quelle del copione**: se divergono, l'allineamento non è di questo testo e non
si usa. 90 confini su 90 al primo colpo, nessun ascolto, nessuna seconda
trascrizione.

Una cosa imparata subito: il tag a inizio blocco (`[warmly]`) prende nella
trascrizione un istante largo pochi millesimi, incollato alla fine della frase
precedente. Prendendolo come inizio, la pausa misurava 11 ms e il taglio cadeva
**prima** della pausa vera. Si guarda la prima parola *detta*.

## Da verificare

Queste cose **non le può chiudere chi scrive il codice**: vanno ascoltate o
lette da Achille.

1. **I tag si sentono?** `[warmly]`, `[cautiously]`, `[slowly]`, `[softly]`.
   La trascrizione li riporta come token di pochi millesimi, cioè non vengono
   *pronunciati* — ma che il tono cambi davvero si giudica a orecchio.
2. **Le cifre.** La guida di eleven_v4 dice di lasciarle in cifre, e così sono
   scritte. I punti da ascoltare, in ordine di rischio:
   - `1.250 euro` e `oltre 2.000` (traccia 8). Nell'allineamento «2.000» occupa
     0,36 s: breve per «duemila». **Da sentire.**
   - `130,20`, `112,60`, `106,70` (traccia 8): nell'allineamento occupano fra
     2,2 e 2,5 s l'uno, che è quanto serve a dirli per esteso. Promettente.
   - `87,79 → 181,14`, `78,27 → 161,50`, `73,41 → 151,48` (traccia 9).
   - `7,76 per cento` (traccia 8).
3. **s091 sta a 7,6 car/s**, sotto la fascia di prima. Non è un taglio
   sbagliato: è la scena che legge sei importi in fila. Ascoltarla conferma.
4. **La durata.** Il montato vero è **21:09** contro i 20 minuti chiesti: il
   5,8% in più. (La stima di 20:40 che avevo scritto prima usava ancora il
   rapporto grezzo/lavorato del campione; con quello misurato la stima era
   21:12, e il montato è caduto lì.) Si può portare a 20:00 esatti con un
   `atempo` 1,059, ma la voce sta già a 15,7 caratteri al secondo e
   accelerarla del 6% si sente. **Decide Achille**: così com'è, oppure
   stretta.
5. **Le quattro verifiche di `FONTI.md`** prima degli altri due video: la firma
   definitiva del comparto sanità (riverificata il 14 novembre: ancora
   ipotesi), il tavolo RSA AIOP del 13 novembre, il decreto del comma 3
   dell'art. 10 del D.L. 62/2026, le tabelle per area delle Funzioni Locali.
