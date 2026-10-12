# REGISTRO — Perseo Sirio senza segreti · 5.2 Rendimenti tassati meno

Data: 12 ottobre 2026 · sessione Claude Code (repo Prove, branch `claude/new-session-d7lx19`)
Metodo: `metodo/MASTER-PORTATILE.md` · parametri del corso: vedi `m1-l1.1-pensione/REGISTRO.md`

Modulo 5 · Il fisco: dove si guadagna davvero. Copione allungato a 6 minuti dallo script
`PS_M5_SCRIPT-VIDEO.md` e prodotto **senza approvazioni intermedie**, su indicazione dell'utente
(«Tutto, senza approvazioni»: moduli 2–7 di seguito, link alla fine di ogni modulo).

## Numeri della lezione

- 47 blocchi · 5.860 caratteri · 49 scene (copertina 3 s + 47 + chiusura 10 s)
- tracce: A 249,6 s grezzi (s02–s27) · B 160,9 s grezzi (s28–s48); stacco su cambio di capitolo
- ritmo: atempo 1,030, `MIRA` 16,6 car/s · parlato 357,7 s

## Verifiche

- allineamento DTW e controllo delle pause: 1 blocco segnalato fuori fascia in B: s48 («[warm] Ci vediamo nella lezione cinque punto tre», 2,5 s) — falso allarme, il tag [warm] gonfia il conto dei caratteri; il taglio cade nella pausa 158,11–158,67 s
- trascrizione dall'asset audio: A 98,4 % (s05: «quanto meno» trascritto «quantomeno»), B 99,0 % (s29: «modulo uno» reso dal trascrittore come «lezione12»)
- slide: 49 PNG guardati nei provini; nessuna sfora la cornice
- `controlli.py`: 8/8

## Grafica

- Grafiche nuove del modulo in `previdenza.mjs` (copiato di lezione in lezione): `colonna` (il reddito con la fetta dei contributi tolta prima dell'IRPEF; fasi `intera`, `dedotta`, `due`), `rimborso` (la moneta da 25 € da cui torna indietro lo spicchio di IRPEF risparmiata), `aliquote` (26%, 20%, 12,5%), `cesti` (1.000 € di raccolto, il fisco prende 260 o 200 €, i 60 € restano investiti), `composto` con la fase `fisco` (due curve, rendimenti al 20% e al 26%), `scala` (la scala del fisco, grafica ricorrente: 21 gradini dal 15% al 9%, l'omino scende fino all'anno `a`), `torta` (la prestazione: rendimenti e contributi non dedotti si staccano, si tassa solo il resto).
- Qui: `aliquote` in s07–s10, `cesti` in s14–s17 (in s15 solo il primo cesto paga), `composto` fase `area` in s19 e fase `fisco` in s29–s32, `tasche` in s24.

## Che cosa è andato storto e come si è deciso

- Nei `cesti` il vaso dei 60 € copriva l'etichetta del secondo cesto: cesti allargati (360 e 1200) e vaso al centro.
- Le due curve del `composto` fisco sono quasi sovrapposte (è la verità dei numeri): aggiunta l'etichetta «dopo 30 anni: ≈ 2.400 € in più».

## Costi

- voce: due generazioni ElevenLabs (A e B), nessuna rigenerata (sessioni in `perseo/sessioni-voce-m5.json`)
- trascrizioni: due, dall'asset audio

## La resa

- video HeyGen: `976c6fc1b2ff58a36e3af317bc191b20` — **completato**, 6:09,7 (369,7 s), 1920×1080,
  sottotitoli SRT. Pagina: https://app.heygen.com/videos/976c6fc1b2ff58a36e3af317bc191b20
- lotto asset `733847a482394b70a0ded02a3dc695c0` (96 file)
- copia di controllo locale: `montato-5.2.mp4` 6:11,0 (non versionata) e `montato-5.2.srt`

## Da verificare — quello che non ho potuto giudicare io

- **Aliquote**: 26% investimento ordinario, 20% fondo pensione, 12,5% titoli di Stato (anche nel Fondo) — dalle note del modulo.
- **Esempio** 1.000 € → 260 contro 200 €, 60 € che restano investiti: dallo script.
- **Curva**: 100 € al mese per 30 anni, rendimento lordo 4%, netto 3,2% contro 2,96% → ≈ 60.300 contro 57.900 €, differenza ≈ 2.400 €: calcolo mio, a scopo illustrativo.
- «La tassa sulla prestazione riguarda i contributi, non i rendimenti»: dallo script (lezione 5.3), formulazione mia.
- «Chi esce presto o chiede anticipazioni rinuncia a una parte dell'effetto»: aggiunta mia; le anticipazioni sono annunciate «più avanti nel corso» senza indicare il modulo.
- La voce non l'ho ascoltata: verifiche per trascrizione e per pause.
