# REGISTRO — Perseo Sirio senza segreti · 5.4 I contributi non dedotti

Data: 12 ottobre 2026 · sessione Claude Code (repo Prove, branch `claude/new-session-d7lx19`)
Metodo: `metodo/MASTER-PORTATILE.md` · parametri del corso: vedi `m1-l1.1-pensione/REGISTRO.md`

Modulo 5 · Il fisco: dove si guadagna davvero. Copione allungato a 6 minuti dallo script
`PS_M5_SCRIPT-VIDEO.md` e prodotto **senza approvazioni intermedie**, su indicazione dell'utente
(«Tutto, senza approvazioni»: moduli 2–7 di seguito, link alla fine di ogni modulo).

## Numeri della lezione

- 47 blocchi · 5.740 caratteri · 49 scene (copertina 3 s + 47 + chiusura 10 s)
- tracce: A 164,7 s grezzi (s02–s21) · B 210,7 s grezzi (s22–s48); stacco su cambio di capitolo
- ritmo: atempo 0,999, `MIRA` 16,6 car/s · parlato 349,5 s

## Verifiche

- allineamento DTW e controllo delle pause: 0 blocchi fuori fascia; ogni confine cade in una pausa vera
- trascrizione dall'asset audio: A 99,5 %, B 99,4 % (s36: «d» trascritto «di»)
- slide: 49 PNG guardati nei provini; nessuna sfora la cornice
- `controlli.py`: 8/8

## Grafica

- Grafiche nuove del modulo in `previdenza.mjs` (copiato di lezione in lezione): `colonna` (il reddito con la fetta dei contributi tolta prima dell'IRPEF; fasi `intera`, `dedotta`, `due`), `rimborso` (la moneta da 25 € da cui torna indietro lo spicchio di IRPEF risparmiata), `aliquote` (26%, 20%, 12,5%), `cesti` (1.000 € di raccolto, il fisco prende 260 o 200 €, i 60 € restano investiti), `composto` con la fase `fisco` (due curve, rendimenti al 20% e al 26%), `scala` (la scala del fisco, grafica ricorrente: 21 gradini dal 15% al 9%, l'omino scende fino all'anno `a`), `torta` (la prestazione: rendimenti e contributi non dedotti si staccano, si tassa solo il resto).
- Qui: `bicchiere` (nuovo: il limite di 5.300 € come linea, oltre la linea l'acqua trabocca in una seconda tazza grigia; fasi `pieno`, `trabocca`, `irpef`) in s02, s08–s09, s11–s12 e s28 della 5.5; `scala` in s10; `torta` con il timbro `comunicato`/`dimenticato` in s21–s22 e s31–s34; `tre` dei casi in s23–s26; `foglio` della CU in s42; `icone` in s43.

## Che cosa è andato storto e come si è deciso

- Il timbro «comunicato» e la scritta «dimenticato» si sovrapponevano allo spicchio staccato: spostati sotto la torta.

## Costi

- voce: due generazioni ElevenLabs (A e B), nessuna rigenerata (sessioni in `perseo/sessioni-voce-m5.json`)
- trascrizioni: due, dall'asset audio

## La resa

- video HeyGen: `eef9b3c936b3af86a4251bd45ce29e15` — **completato**, 6:01,6 (361,6 s), 1920×1080,
  sottotitoli SRT. Pagina: https://app.heygen.com/videos/eef9b3c936b3af86a4251bd45ce29e15
- lotto asset `37f96e3ec3934cb1aa1268ea02f4ea4d` (96 file)
- copia di controllo locale: `montato-5.4.mp4` 6:02,9 (non versionata) e `montato-5.4.srt`

## Da verificare — quello che non ho potuto giudicare io

- **Termine**: comunicazione dei contributi non dedotti al Fondo entro il 31 dicembre dell'anno successivo al versamento — dalle note del modulo; l'esempio 2026 → 31/12/2027 è mio.
- **Dove**: «area riservata, sezione contribuzione, funzione per i contributi non dedotti»: dallo script, da confrontare con le voci reali del menu.
- **I tre casi** (versamenti oltre il limite, bonifici non indicati in dichiarazione, reddito senza IRPEF): dallo script; l'esempio dell'anno di aspettativa non retribuita con bonifico volontario è mio.
- «Per il tuo caso, chiedi al Fondo o al CAF»: aggiunta mia.
- «Doppia tassazione che nessuno ti segnalerà»: formulazione mia, da valutare il tono.
- La voce non l'ho ascoltata: verifiche per trascrizione e per pause.
