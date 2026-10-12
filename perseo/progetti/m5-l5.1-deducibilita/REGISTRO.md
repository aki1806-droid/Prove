# REGISTRO — Perseo Sirio senza segreti · 5.1 Deducibilità: lo sconto in busta paga

Data: 12 ottobre 2026 · sessione Claude Code (repo Prove, branch `claude/new-session-d7lx19`)
Metodo: `metodo/MASTER-PORTATILE.md` · parametri del corso: vedi `m1-l1.1-pensione/REGISTRO.md`

Modulo 5 · Il fisco: dove si guadagna davvero. Copione allungato a 6 minuti dallo script
`PS_M5_SCRIPT-VIDEO.md` e prodotto **senza approvazioni intermedie**, su indicazione dell'utente
(«Tutto, senza approvazioni»: moduli 2–7 di seguito, link alla fine di ogni modulo).

## Numeri della lezione

- 47 blocchi · 5.798 caratteri · 49 scene (copertina 3 s + 47 + chiusura 10 s)
- tracce: A 144,5 s grezzi (s02–s19) · B 236,3 s grezzi (s20–s48); stacco su cambio di capitolo
- ritmo: atempo 1,019, `MIRA` 16,6 car/s · parlato 349,9 s

## Verifiche

- allineamento DTW e controllo delle pause: 0 blocchi fuori fascia. La traccia A ha letto stretta (18,1 car/s grezzi, pause di 0,2 s fra i blocchi): il controllo le elenca tutte, ma ogni taglio cade in una pausa vera
- trascrizione dall'asset audio: A 99,0 % (s16: «euro e cinquantasette» trascritto come «virgola cinquantasette»), B 97,3 % (solo cifre scritte come numeri)
- slide: 49 PNG guardati nei provini; nessuna sfora la cornice
- `controlli.py`: 8/8

## Grafica

- Grafiche nuove del modulo in `previdenza.mjs` (copiato di lezione in lezione): `colonna` (il reddito con la fetta dei contributi tolta prima dell'IRPEF; fasi `intera`, `dedotta`, `due`), `rimborso` (la moneta da 25 € da cui torna indietro lo spicchio di IRPEF risparmiata), `aliquote` (26%, 20%, 12,5%), `cesti` (1.000 € di raccolto, il fisco prende 260 o 200 €, i 60 € restano investiti), `composto` con la fase `fisco` (due curve, rendimenti al 20% e al 26%), `scala` (la scala del fisco, grafica ricorrente: 21 gradini dal 15% al 9%, l'omino scende fino all'anno `a`), `torta` (la prestazione: rendimenti e contributi non dedotti si staccano, si tassa solo il resto).
- Qui: `colonna` in s03 e s08–s10, `tabella` dell'IRPEF risparmiata (600 e 1.200 € al 23/33/43%) in s24–s27, `rimborso` in s28–s30, `conto` 25 − 5,75 = 19,25 € in s31.

## Che cosa è andato storto e come si è deciso

- La `colonna` era piccola e decentrata: ingrandita (300 × 560) e centrata; nella versione affiancata la fetta dei contributi esce a destra, non sopra l'altra colonna.
- Nel `rimborso` lo spicchio finiva sopra le scritte e dietro la busta: ora atterra dentro la busta, disegnato sopra.
- «23 cent» andava a capo: diventato «0,23 €».

## Costi

- voce: due generazioni ElevenLabs (A e B), nessuna rigenerata (sessioni in `perseo/sessioni-voce-m5.json`)
- trascrizioni: due, dall'asset audio

## La resa

- video HeyGen: `bcb1f71bb731001ea93b8010d44bc1b5` — **completato**, 6:01,8 (361,8 s), 1920×1080,
  sottotitoli SRT. Pagina: https://app.heygen.com/videos/bcb1f71bb731001ea93b8010d44bc1b5
- lotto asset `dd854e1700a1439393ecaf570f716864` (96 file)
- copia di controllo locale: `montato-5.1.mp4` 6:03,2 (non versionata) e `montato-5.1.srt`

## Da verificare — quello che non ho potuto giudicare io

- **Limite di deducibilità** 5.300 € dal 2026 (Legge 199/2025), 5.164,57 € fino al 2025; tuoi + ente; TFR e 1,5% non si contano — dalle note del modulo.
- **Contributo dell'ente deducibile** e non tassato come reddito del lavoratore: dallo script.
- «Per arrivare al tetto dovresti versare quasi il 17%» (lo script dice «circa il 16%»): 5.000 / 30.000 = 16,7%, ho corretto io.
- **Esempio**: 600 € dedotti → 138 / 198 / 258 € al 23/33/43%; 1.200 € → 276 € al 23%; 25 € → ≈ 5,75 € di IRPEF, 19,25 € in meno nel netto: cifre mie, senza addizionali.
- «Con le addizionali il vantaggio cresce un po'»: aggiunta mia.
- L'avvertenza «Informazioni generali, non consulenza fiscale» è nel sottotitolo della copertina (3 s, lo script chiede 4) e ripresa a voce e a schermo in s06.
- La voce non l'ho ascoltata: verifiche per trascrizione e per pause.
