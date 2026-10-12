# REGISTRO — Perseo Sirio senza segreti · 5.3 Dal 15% al 9%

Data: 12 ottobre 2026 · sessione Claude Code (repo Prove, branch `claude/new-session-d7lx19`)
Metodo: `metodo/MASTER-PORTATILE.md` · parametri del corso: vedi `m1-l1.1-pensione/REGISTRO.md`

Modulo 5 · Il fisco: dove si guadagna davvero. Copione allungato a 6 minuti dallo script
`PS_M5_SCRIPT-VIDEO.md` e prodotto **senza approvazioni intermedie**, su indicazione dell'utente
(«Tutto, senza approvazioni»: moduli 2–7 di seguito, link alla fine di ogni modulo).

## Numeri della lezione

- 47 blocchi · 5.771 caratteri · 49 scene (copertina 3 s + 47 + chiusura 10 s)
- tracce: A 201,4 s grezzi (s02–s24) · B 198,1 s grezzi (s25–s48); stacco su cambio di capitolo
- ritmo: atempo 1,034, `MIRA` 16,6 car/s · parlato 351,8 s

## Verifiche

- allineamento DTW e controllo delle pause: 0 blocchi fuori fascia; ogni confine cade in una pausa vera
- trascrizione dall'asset audio: A 99,6 % (s15: «quarant» trascritto «40»), B 99,8 %
- slide: 49 PNG guardati nei provini; nessuna sfora la cornice
- `controlli.py`: 8/8

## Grafica

- Grafiche nuove del modulo in `previdenza.mjs` (copiato di lezione in lezione): `colonna` (il reddito con la fetta dei contributi tolta prima dell'IRPEF; fasi `intera`, `dedotta`, `due`), `rimborso` (la moneta da 25 € da cui torna indietro lo spicchio di IRPEF risparmiata), `aliquote` (26%, 20%, 12,5%), `cesti` (1.000 € di raccolto, il fisco prende 260 o 200 €, i 60 € restano investiti), `composto` con la fase `fisco` (due curve, rendimenti al 20% e al 26%), `scala` (la scala del fisco, grafica ricorrente: 21 gradini dal 15% al 9%, l'omino scende fino all'anno `a`), `torta` (la prestazione: rendimenti e contributi non dedotti si staccano, si tassa solo il resto).
- Qui: `scala` in s03, s07, s09–s13, s15 e s43 (l'omino scende fino all'anno indicato), `conto` 15% − 12 × 0,30 = 11,4% in s16, `tabella` IRPEF contro pensione complementare in s18–s20, `torta` in s26–s30, `tabella` delle uscite in s31–s35.

## Che cosa è andato storto e come si è deciso

- Le etichette della `torta` si sovrapponevano agli spicchi staccati: spostate fuori dal cerchio.

## Costi

- voce: due generazioni ElevenLabs (A e B), nessuna rigenerata (sessioni in `perseo/sessioni-voce-m5.json`)
- trascrizioni: due, dall'asset audio

## La resa

- video HeyGen: `331ce609bfea7024200d0de57a79427b` — **completato**, 6:03,9 (363,9 s), 1920×1080,
  sottotitoli SRT. Pagina: https://app.heygen.com/videos/331ce609bfea7024200d0de57a79427b
- lotto asset `2ef266cbe90a46f198bc182d401e754d` (96 file)
- copia di controllo locale: `montato-5.3.mp4` 6:05,2 (non versionata) e `montato-5.3.srt`

## Da verificare — quello che non ho potuto giudicare io

- **Scala**: 15%, meno 0,30 punti per ogni anno oltre il quindicesimo, minimo 9% a 35 anni — dalle note del modulo.
- **Uscite**: anticipazione per spese sanitarie e riscatti per decesso/invalidità/inoccupazione al 15→9%; anticipazione per la casa, congedi formativi e riscatto per dimissioni al 23% — dalle note; «perdita del lavoro per lunghi periodi» fra i riscatti agevolati è formulazione mia, da controllare.
- **Esempio** adesione a 40 anni, pensione a 67 → 27 anni → 11,4%: calcolo mio.
- «Imposta sostitutiva, senza addizionali, non si somma agli altri redditi»: formulazione mia.
- Si tassa solo il resto (contributi dedotti), non i rendimenti né i non dedotti comunicati: dallo script.
- La voce non l'ho ascoltata: verifiche per trascrizione e per pause.
