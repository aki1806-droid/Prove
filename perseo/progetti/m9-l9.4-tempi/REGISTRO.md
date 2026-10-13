# REGISTRO — Perseo Sirio senza segreti · 9.4 I tempi reali

Data: 12 ottobre 2026 · sessione Claude Code (repo Prove, branch `claude/new-session-d7lx19`)
Metodo: `metodo/MASTER-PORTATILE.md` · parametri del corso: vedi `m1-l1.1-pensione/REGISTRO.md`

Modulo 9 · Al pensionamento. Copione allungato a 6 minuti dallo script
`PS_M9_SCRIPT-VIDEO.md` e prodotto **senza approvazioni intermedie**, su indicazione dell'utente
(«Tutto, senza approvazioni»: moduli 2–10 di seguito, link alla fine di ogni modulo).

## Numeri della lezione

- 47 blocchi · 5.712 caratteri · 49 scene (copertina 3 s + 47 + chiusura 10 s)
- tracce: A 198,1 s grezzi (s02–s22) · B 224,0 s grezzi (s23–s48); stacco su cambio di capitolo
- ritmo: atempo 1,041, `MIRA` 16,6 car/s · parlato 351,7 s

## Verifiche

- allineamento DTW e controllo delle pause: 0 blocchi fuori fascia; ogni confine cade in una pausa vera; MIRA abbassata a 16,4 car/s (vedi sotto)
- trascrizione dall'asset audio: A 99,8 %, B 99,6 % (solo «centottanta» trascritto «180»)
- slide: 49 PNG guardati nei provini; nessuna sfora la cornice
- `controlli.py`: 8/8

## Grafica

- Grafiche nuove del modulo in `previdenza.mjs` (copiato di lezione in lezione): `varco` (la porta dell'anzianità, larga fino al 2026 e stretta dal 2027, con gli omini da 8 anni di iscrizione; fasi `porte`/`larga`/`stretta`), `secchio` (la posizione come barra fra capitale e rendita, con il cursore che si ferma a metà; fasi `meta`/`blocco`/`destra`/`rendita`/`tutto`).
- Figura nuova ricorrente `clessidre` (*La clessidra* dello script): due clessidre, la piccola della tasca reale (Fondo, in media 90 giorni, massimo 180) e la grande della tasca figurativa (INPS, in genere fino a 12 mesi, massimo 18); fasi `due`/`reale`/`figurativa`. Qui in s10–s11, s14–s15, s40.
- `tasche` in s07–s08 e s12; `timeline` dei tre arrivi in s23; `memo` delle tre regole in s27–s30.

## Che cosa è andato storto e come si è deciso

- Con MIRA 16,6 il montaggio stimato era 6:00,4, troppo vicino al minimo: MIRA abbassata a 16,4 car/s in `audio/tagli.py`, montaggio 6:05,1.
- Nella slide della liquidazione INPS «12 mesi» e «9 mesi» andavano a capo: numeri e unità separati.

## Costi

- voce: due generazioni ElevenLabs (A e B), nessuna rigenerata (sessioni in `perseo/sessioni-voce-m9.json`)
- trascrizioni: due, dall'asset audio

## La resa

- video HeyGen: `6bc0d6ce07d24ffd2be26096accab9c7` — **completato**, 6:03,8 (363,8 s), 1920×1080,
  sottotitoli SRT. Pagina: https://app.heygen.com/videos/6bc0d6ce07d24ffd2be26096accab9c7
- lotto asset `b6f0856435a548b1b3b91d7a0a909e67` (96 file)
- copia di controllo locale: `montato-9.4.mp4` 6:05,1 (non versionata) e `montato-9.4.srt`

## Da verificare — quello che non ho potuto giudicare io

- **Parte reale**: la paga il Fondo; per legge fino a 180 giorni dalla richiesta completa, in media circa 90 (dallo script).
- **Parte figurativa** (TFR e 1,5%): l'INPS la versa al Fondo in genere entro 12 mesi, al massimo 18; solo dopo il Fondo paga.
- **Liquidazione ordinaria INPS** (TFS o TFR non destinato): 12 mesi per la vecchiaia, 9 dal 2027, più 3 mesi tecnici (modulo 2).
- Domanda completa e corretta, recapiti in anagrafica (email e SMS), contributi non dedotti comunicati; anticipo TFS/TFR con il patronato.
- Mie formulazioni: «di solito entro qualche mese dalla domanda», «l'anticipo ha delle condizioni e va chiesto per tempo», «tre somme distinte nel primo anno».
- La voce non l'ho ascoltata: verifiche per trascrizione e per pause.
