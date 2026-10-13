# REGISTRO — Perseo Sirio senza segreti · 10.3 Giulia, infermiera neoassunta

Data: 12 ottobre 2026 · sessione Claude Code (repo Prove, branch `claude/new-session-d7lx19`)
Metodo: `metodo/MASTER-PORTATILE.md` · parametri del corso: vedi `m1-l1.1-pensione/REGISTRO.md`

Modulo 10 · Decidere con i tuoi numeri. Copione allungato a 6 minuti dallo script
`PS_M10_SCRIPT-VIDEO.md` e prodotto **senza approvazioni intermedie**, su indicazione dell'utente
(«Tutto, senza approvazioni»: moduli 2–10 di seguito, link alla fine di ogni modulo).

## Numeri della lezione

- 47 blocchi · 5.552 caratteri · 49 scene (copertina 3 s + 47 + chiusura 10 s)
- tracce: A 178,6 s grezzi (s02–s21) · B 208,7 s grezzi (s22–s48); stacco su cambio di capitolo
- ritmo: atempo 1,014, `MIRA` 16,6 car/s · parlato 349,0 s

## Verifiche

- allineamento DTW e controllo delle pause: 0 blocchi fuori fascia; ogni confine cade in una pausa vera; MIRA 16,0 car/s
- trascrizione dall'asset audio: A 97,5 %, B 97,7 % (le cifre trascritte in numeri; due rese brevi: «hai»→«ha» in s06, «quanto i»→«quanti» in s30; nessun buco)
- slide: 49 PNG guardati nei provini; nessuna sfora la cornice
- `controlli.py`: 8/8

## Grafica

- Grafiche nuove del modulo in `previdenza.mjs` (copiato di lezione in lezione): `cassettiera` (l'area riservata come otto cassetti etichettati; `at`, `spunte`, `tutti`), `ventaglio` (tre linee che si aprono nel tempo, con la retta facoltativa del versato e la «zona realistica»; `linee`, `base`, `da`/`a`, `zona`, `solo`).
- Avviso fisso in basso a sinistra su ogni slide del caso: «Caso illustrativo · Esempio semplificato · Non è una previsione» (`avviso` in `layout.mjs`, come chiede lo script).
- `orologio` del silenzio-assenso con le date di Giulia (marzo 2026 → settembre → iscritta) in s10–s12 (`etichette` nuove); `tabella` dei versamenti in s17–s19; `ventaglio` con la retta del versato ≈ 104.000 € e le linee 2/3/4% in s27–s29 (`solo` mostra una linea); `memo` delle quattro scelte in s31–s36.

## Che cosa è andato storto e come si è deciso

- Tolta «consulenza gratuita» (non era nello script di questa lezione).
- Nella mossa il primo passo ripeteva il titolo: diventato «Tu, o un collega neoassunto».
- L'illustrazione con le mani per Anna sembrava una lettera: sostituita con la persona.

## Costi

- voce: due generazioni ElevenLabs (A e B), nessuna rigenerata (sessioni in `perseo/sessioni-voce-m10.json`)
- trascrizioni: due, dall'asset audio

## La resa

- video HeyGen: `060decd17afea1acc46e89b91d806fe4` — **completato**, 6:01,0 (361,0 s), 1920×1080,
  sottotitoli SRT. Pagina: https://app.heygen.com/videos/060decd17afea1acc46e89b91d806fe4
- lotto asset `2480596048014c9dac57266b04a99aaa` (96 file)
- copia di controllo locale: `montato-10.3.mp4` 6:02,3 (non versionata) e `montato-10.3.srt`

## Da verificare — quello che non ho potuto giudicare io

- **Conti di Giulia** (miei, su 30.000 € di retribuzione utile): 1% = 300 € (25 € al mese), ente 300 €, TFR 6,91% ≈ 2.073 €, totale ≈ 2.673 €; IRPEF risparmiata ≈ 138 € (23% sui 600 € dedotti, contributo suo e dell'ente), sforzo netto ≈ 162 €.
- **Proiezione**: 39 anni × ≈ 2.673 € ≈ 104.000 € versati; ≈ 159.000 € al 2%, ≈ 199.000 € al 3%, ≈ 251.000 € al 4% (rendita posticipata annua, senza tasse, costi e aumenti); TFR ≈ 78% dei versamenti (detto «quasi l'ottanta per cento»).
- **Silenzio-assenso** per gli assunti a tempo indeterminato dal 2019: 6 mesi dall'informativa, poi 30 giorni dalla lettera del Fondo, iscrizione con contribuzione piena nel profilo Garantito (lezione 3.3).
- 9% sulla prestazione con 35 anni o più di partecipazione.
- Mie formulazioni: il primo turno e il badge, «a ventotto anni il tempo è il capitale più grande».
- La voce non l'ho ascoltata: verifiche per trascrizione e per pause.
