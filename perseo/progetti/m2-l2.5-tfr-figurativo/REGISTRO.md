# REGISTRO — Perseo Sirio senza segreti · 2.5 Il TFR figurativo

Data: 11 ottobre 2026 · sessione Claude Code (repo Prove, branch `claude/new-session-d7lx19`)
Metodo: `metodo/MASTER-PORTATILE.md` · parametri del corso: vedi `m1-l1.1-pensione/REGISTRO.md`

Modulo 2 · La tua liquidazione: TFS e TFR. Copione allungato a 6 minuti dallo script
`PS_M2_SCRIPT-VIDEO.md` e prodotto **senza approvazioni intermedie**, su indicazione dell'utente
(«Tutto, senza approvazioni»: moduli 2–7 di seguito, link alla fine di ogni modulo).

## Numeri della lezione

- 42 blocchi · 5.864 caratteri · 44 scene (copertina 3 s + 42 + chiusura 10 s)
- tracce: A 177,6 s grezzi (s02–s18) · B 234,1 s grezzi (s19–s43); stacco su cambio di capitolo
- ritmo: atempo 1,043, `MIRA` 16,6 car/s · parlato 355,4 s

## Verifiche

- allineamento DTW e controllo delle pause: 0 blocchi fuori fascia, nessun taglio nel parlato
- trascrizione dall'asset audio: A 99,6 %, B 99,8 %, nessun buco
- slide: 44 PNG guardati nei provini; nessuna sfora la cornice
- `controlli.py`: 8/8

## Grafica

- Grafiche nuove del modulo in `previdenza.mjs` (uguale nelle cinque lezioni): `linea2000` (la linea del 31 dicembre 2000, TFS ocra / TFR verde, fasi `linea`, `persone`, `termine`), `scalini` (carriera che sale alla fine contro carriera piatta, base del TFS e media), `strati` (dieci anni di TFR: accumulato, rivalutazione, nuova quota), `scambio` (lo scambio ferroviario dell'adesione, fase `vagone` con il TFS maturato), `tasche` (il cappotto con il conto reale e il conto figurativo: fasi `reale`, `due`, `manopola`, `unione`, `garantito`, `profili`; ricorrente nei moduli successivi). `montante` accetta ora `etichetta`, `rivtit` e `riv` per diventare il barattolo del TFR.
- Qui: `tasche` in quasi tutte le fasi (reale, due, con gli importi 600/2.070, manopola 2025→2026, profili, unione); le tre conseguenze come `catena` a stati.

## Che cosa è andato storto e come si è deciso

- `tasche` con i profili sforava la cornice di 54 px: le targhe dei profili ora stanno al posto delle scritte Perseo Sirio / INPS.

## Costi

- voce: due generazioni ElevenLabs (A e B), nessuna rigenerata (sessioni in `perseo/sessioni-voce-m2.json`)
- trascrizioni: due, dall'asset audio

## La resa

- video HeyGen: `04b1781579620470ee9f150eb636a727` — **completato**, 6:07,5 (367,5 s), 1920×1080,
  sottotitoli SRT. Pagina: https://app.heygen.com/videos/04b1781579620470ee9f150eb636a727
- lotto asset `c807ddceb9f746a5a509d7b653fe99fd` (86 file)
- copia di controllo locale: `montato-2.5.mp4` 6:08,7 (non versionata) e `montato-2.5.srt`

## Da verificare — quello che non ho potuto giudicare io

- **Rivalutazione del figurativo dal 1° gennaio 2026** con il rendimento del profilo scelto (prima: paniere di fondi) e possibilità di un profilo diverso dalla tasca reale.
- **Tempi INPS**: in genere fino a 12 mesi, massimo 18 («il Fondo indica»).
- Chi tiene il conto: INPS per sanità ed enti locali; il datore di lavoro solo dove paga direttamente la liquidazione.
- Nomi nel prospetto: «TFR virtuale», «risultato della gestione»; percorso area riservata → documentazione.
- La voce non l'ho ascoltata: verifiche per trascrizione e per pause.
