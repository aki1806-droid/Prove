# REGISTRO — Perseo Sirio senza segreti · 9.3 Le cinque rendite

Data: 12 ottobre 2026 · sessione Claude Code (repo Prove, branch `claude/new-session-d7lx19`)
Metodo: `metodo/MASTER-PORTATILE.md` · parametri del corso: vedi `m1-l1.1-pensione/REGISTRO.md`

Modulo 9 · Al pensionamento. Copione allungato a 6 minuti dallo script
`PS_M9_SCRIPT-VIDEO.md` e prodotto **senza approvazioni intermedie**, su indicazione dell'utente
(«Tutto, senza approvazioni»: moduli 2–10 di seguito, link alla fine di ogni modulo).

## Numeri della lezione

- 47 blocchi · 5.757 caratteri · 49 scene (copertina 3 s + 47 + chiusura 10 s)
- tracce: A 183,4 s grezzi (s02–s21) · B 196,4 s grezzi (s22–s48); stacco su cambio di capitolo
- ritmo: atempo 0,976, `MIRA` 16,6 car/s · parlato 349,0 s

## Verifiche

- allineamento DTW e controllo delle pause: 0 blocchi fuori fascia; ogni confine cade in una pausa vera
- trascrizione dall'asset audio: A 99,6 %, B 99,6 % («settant'anni» trascritto «70 anni»)
- slide: 49 PNG guardati nei provini; nessuna sfora la cornice
- `controlli.py`: 8/8

## Grafica

- Grafiche nuove del modulo in `previdenza.mjs` (copiato di lezione in lezione): `varco` (la porta dell'anzianità, larga fino al 2026 e stretta dal 2027, con gli omini da 8 anni di iscrizione; fasi `porte`/`larga`/`stretta`), `secchio` (la posizione come barra fra capitale e rendita, con il cursore che si ferma a metà; fasi `meta`/`blocco`/`destra`/`rendita`/`tutto`).
- Figura nuova `piatti`: la bilancia fra «Importo al mese» e «Protezione per chi resta», che pende verso l'importo con la vitalizia e verso la protezione con le altre (`tipo2`: `pari`/`vitalizia`/`protette`; `nome` in alto). Qui in s17–s19.
- `memo` a cinque voci per le cinque rendite in s06–s15 e s39; `tasche` in s46.

## Che cosa è andato storto e come si è deciso

- La figura `piatti` leggeva `d.tipo`, che è già il tipo della slide: rinominato `tipo2`.
- La scritta lunga «Reversibile · certa · controassicurata» usciva dalla pillola: larghezza calcolata sul testo.
- Il cuore con il tracciato ECG per la reversibile suggeriva la salute: sostituito con due figure.
- Copione: tolte tre frasi non verificate («non si può cambiare facilmente dopo», «mentre i prezzi salgono», «nessun costo in più»).

## Costi

- voce: due generazioni ElevenLabs (A e B), nessuna rigenerata (sessioni in `perseo/sessioni-voce-m9.json`)
- trascrizioni: due, dall'asset audio

## La resa

- video HeyGen: `39e844c23499b7815f1fc81d276c4f0e` — **completato**, 6:01,0 (361,0 s), 1920×1080,
  sottotitoli SRT. Pagina: https://app.heygen.com/videos/39e844c23499b7815f1fc81d276c4f0e
- lotto asset `257780129828402f85b6038d093fdd74` (96 file)
- copia di controllo locale: `montato-9.3.mp4` 6:02,4 (non versionata) e `montato-9.3.srt`

## Da verificare — quello che non ho potuto giudicare io

- **Cinque rendite** (dallo script): vitalizia immediata, reversibile (in tutto o in parte), certa 5 o 10 anni poi vitalizia, controassicurata (capitale residuo ai beneficiari a rate), LTC.
- **LTC**: raddoppio in caso di non autosufficienza, fino a 70 anni di età assicurativa, valutazione sanitaria con possibile rifiuto, costo di conversione 5% invece di 1,10%.
- **Rate** mensili, bimestrali, trimestrali, semestrali o annuali; rivalutazione annua; importo più alto per chi la chiede più tardi.
- Mie formulazioni: «chi ha un coniuge con una buona reversibilità INPS potrebbe preferire la vitalizia semplice», «diffida di chi ti propone una scelta valida per chiunque».
- La voce non l'ho ascoltata: verifiche per trascrizione e per pause.
