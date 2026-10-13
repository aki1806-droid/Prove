# REGISTRO — Perseo Sirio senza segreti · 8.5 Se succede il peggio

Data: 12 ottobre 2026 · sessione Claude Code (repo Prove, branch `claude/new-session-d7lx19`)
Metodo: `metodo/MASTER-PORTATILE.md` · parametri del corso: vedi `m1-l1.1-pensione/REGISTRO.md`

Modulo 8 · Prima della pensione. Copione allungato a 6 minuti dallo script
`PS_M8_SCRIPT-VIDEO.md` e prodotto **senza approvazioni intermedie**, su indicazione dell'utente
(«Tutto, senza approvazioni»: moduli 2–10 di seguito, link alla fine di ogni modulo).

## Numeri della lezione

- 47 blocchi · 5.668 caratteri · 49 scene (copertina 3 s + 47 + chiusura 10 s)
- tracce: A 216,3 s grezzi (s02–s26) · B 194,4 s grezzi (s27–s48); stacco su cambio di capitolo
- ritmo: atempo 1,046, `MIRA` 16,6 car/s · parlato 351,5 s

## Verifiche

- allineamento DTW e controllo delle pause: 0 blocchi fuori fascia; ogni confine cade in una pausa vera; MIRA abbassata a 16,3 car/s (vedi sotto)
- trascrizione dall'asset audio: A 100 %, B 100 %
- slide: 49 PNG guardati nei provini; nessuna sfora la cornice
- `controlli.py`: 8/8

## Grafica

- Grafiche nuove o estese del modulo in `previdenza.mjs` (copiato di lezione in lezione): `tasche` fase `anticipo` (la tasca reale con la freccia «si può anticipare, anche tutta», quella figurativa con il lucchetto), `ponte` (due enti collegati da un ponte, la posizione che attraversa; `insegne` per un altro fondo), `ingressi` con `chiusa` (fessura dell'ente sbarrata) e `senzaBase`; illustrazioni nuove `lucchetto` ed `euro`.
- Figura nuova `gradini`: la scala dei beneficiari (Coniuge, Figli, Genitori a carico, Persone designate, Il Fondo) con la freccia sul gradino attivo e i gradini vuoti attenuati. Qui in s07–s12.
- `scala` in s27, `tabella` della cessione del quinto in s31–s32, `timeline` in s33.

## Che cosa è andato storto e come si è deciso

- Nei gradini le etichette uscivano dai riquadri: etichette su due righe e gradini più larghi.
- L'attenuazione dei gradini vuoti non si vedeva (l'animazione d'ingresso riporta l'opacità a 1): spostata su un gruppo esterno.
- Il nome di illustrazione `persone` non esiste: sostituito con `generazioni`.
- Il primo montaggio durava 5:58,3: MIRA in `audio/tagli.py` abbassata da 16,6 a 16,3 car/s, montaggio 6:04,8.
- Copione: tolte «nemmeno a orario ridotto» e «non segue le regole dell'eredità» (non verificate).

## Costi

- voce: due generazioni ElevenLabs (A e B), nessuna rigenerata (sessioni in `perseo/sessioni-voce-m8.json`)
- trascrizioni: due, dall'asset audio

## La resa

- video HeyGen: `ea2fc4283fb1599aab085f0b395e4c55` — **completato**, 6:03,5 (363,5 s), 1920×1080,
  sottotitoli SRT. Pagina: https://app.heygen.com/videos/ea2fc4283fb1599aab085f0b395e4c55
- lotto asset `984600b7153a41ad8d8d46e6e888822f` (96 file)
- copia di controllo locale: `montato-8.5.mp4` 6:04,9 (non versionata) e `montato-8.5.srt`

## Da verificare — quello che non ho potuto giudicare io

- **Ordine dei beneficiari**: coniuge → figli → genitori a carico → persone designate → il Fondo (dallo script).
- **Una nuova designazione sostituisce interamente la precedente.**
- **Cessione del quinto**: pensioni, RITA e anticipazioni sanitarie vincolate solo entro il quinto; riscatti e altre anticipazioni per intero; il nulla osta della finanziaria; la clausola di delegazione.
- **Riscatto per decesso** tassato con la scala 15%→9%.
- «Conviene inserirle tutte insieme» (le persone designate): mia deduzione.
- La voce non l'ho ascoltata: verifiche per trascrizione e per pause.
