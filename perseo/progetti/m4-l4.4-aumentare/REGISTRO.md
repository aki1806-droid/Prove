# REGISTRO — Perseo Sirio senza segreti · 4.4 Aumentare, ridurre, versare di più

Data: 12 ottobre 2026 · sessione Claude Code (repo Prove, branch `claude/new-session-d7lx19`)
Metodo: `metodo/MASTER-PORTATILE.md` · parametri del corso: vedi `m1-l1.1-pensione/REGISTRO.md`

Modulo 4 · Quanto si versa. Copione allungato a 6 minuti dallo script
`PS_M4_SCRIPT-VIDEO.md` e prodotto **senza approvazioni intermedie**, su indicazione dell'utente
(«Tutto, senza approvazioni»: moduli 2–7 di seguito, link alla fine di ogni modulo).

## Numeri della lezione

- 47 blocchi · 5.766 caratteri · 49 scene (copertina 3 s + 47 + chiusura 10 s)
- tracce: A 169,9 s grezzi (s02–s20) · B 212,6 s grezzi (s21–s48); stacco su cambio di capitolo
- ritmo: atempo 0,973, `MIRA` 16,6 car/s · parlato 349,7 s

## Verifiche

- allineamento DTW e controllo delle pause: 0 blocchi fuori fascia al primo colpo. La voce ha letto veloce (17,1 car/s): con l'atempo fermo al minimo di 1,0 il montato restava a 5:53. In questa lezione `tagli.py` lascia scendere l'atempo fino a 0,96: a 0,973 il parlato torna a 16,6 car/s e il montato a 6:02,7
- trascrizione dall'asset audio: A 98,6 % (cifre trascritte come numeri), B 100 %
- slide: 49 PNG guardati nei provini; nessuna sfora la cornice
- `controlli.py`: 8/8

## Grafica

- Grafiche nuove del modulo in `previdenza.mjs` (copiato di lezione in lezione): `ingressi` (il salvadanaio a tre ingressi, ricorrente nel modulo: tuo 1%, ente 1%, TFR e la quarta fessura rossa +1,5%; `n`, `at`, `base`), `bilancia` (la moneta dalla busta paga contro ente e TFR; fasi `una`, `tutte`, `nota`), `divisione` (lo stesso TFR diviso tra pensione e liquidazione; fasi `vuote`, `piene`, `premio`). Riprese: `tasche`, `linea2000`, `conto`, `tabella`.
- Nuove qui: `manopole` (le tre manopole: contributo, versamenti extra, sospensione; `k` accende la manopola di cui si parla), `cursori` (il tuo cursore scorre fino a `v`, quello dell'ente resta all'1%; `tetto` segna la zona del limite fiscale, `fermo` la scritta), e in `ingressi` l'opzione `laterale` (la fessura sul fianco per il bonifico). Riprese: `buste` (stato `da`) per la sospensione, `ingressi` con il solo TFR acceso.

## Che cosa è andato storto e come si è deciso

- Nelle `manopole` le scritte toccavano il bordo del pannello: pannello allungato e scritte sotto.
- Nei `cursori` «tetto fiscale» si sovrapponeva al 5,5% e «fermo, qualunque cifra…» stava sulla barra: spostate sotto e sopra.
- «bonifico» finiva sulla zampa del salvadanaio: spostato sopra la fessura.

## Costi

- voce: due generazioni ElevenLabs (A e B), nessuna rigenerata (sessioni in `perseo/sessioni-voce-m4.json`)
- trascrizioni: due, dall'asset audio

## La resa

- video HeyGen: `da4588b3388f813567a5f5a7db610dc0` — **completato**, 6:01,7 (361,7 s), 1920×1080,
  sottotitoli SRT. Pagina: https://app.heygen.com/videos/da4588b3388f813567a5f5a7db610dc0
- lotto asset `cf08b7ce2f7c4facad5ac09b96c72458` (96 file)
- copia di controllo locale: `montato-4.4.mp4` 6:03,0 (non versionata) e `montato-4.4.srt`

## Da verificare — quello che non ho potuto giudicare io

- **Una volta l'anno** si può cambiare l'aliquota, dall'area riservata; il modulo firmato va all'amministrazione, non al Fondo; decorrenza dal mese successivo alla consegna; su NoiPA tutto dal portale.
- «Oltre una certa cifra entra in gioco il tetto di deducibilità»: frase mia, che sostituisce una cifra che non potevo verificare.
- **Esempio** 1% → 3% su 30.000 €: 25 → 75 € al mese, 600 € l'anno: cifre mie.
- **Versamenti volontari** con bonifico (coordinate e causale nell'area riservata), deduzione da chiedere in dichiarazione.
- **Sospensione**: il copione dice che «il TFR figurativo continua ad accumularsi all'INPS»; nella 4.3, per le assenze non retribuite, lo Statuto sospende anche l'accantonamento figurativo. Da chiarire se la sospensione volontaria ferma o no il TFR verso il Fondo.
- **Dopo la pensione**: versamenti possibili con almeno un anno di contribuzione alla previdenza complementare al momento della pensione — dallo Statuto, da verificare l'articolo.
- La voce non l'ho ascoltata: verifiche per trascrizione e per pause.
