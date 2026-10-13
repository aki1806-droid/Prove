# REGISTRO — Perseo Sirio senza segreti · 9.1 Quando puoi chiederla

Data: 12 ottobre 2026 · sessione Claude Code (repo Prove, branch `claude/new-session-d7lx19`)
Metodo: `metodo/MASTER-PORTATILE.md` · parametri del corso: vedi `m1-l1.1-pensione/REGISTRO.md`

Modulo 9 · Al pensionamento. Copione allungato a 6 minuti dallo script
`PS_M9_SCRIPT-VIDEO.md` e prodotto **senza approvazioni intermedie**, su indicazione dell'utente
(«Tutto, senza approvazioni»: moduli 2–10 di seguito, link alla fine di ogni modulo).

## Numeri della lezione

- 47 blocchi · 5.961 caratteri · 49 scene (copertina 3 s + 47 + chiusura 10 s)
- tracce: A 170,0 s grezzi (s02–s20) · B 220,9 s grezzi (s21–s48); stacco su cambio di capitolo
- ritmo: atempo 0,992, `MIRA` 16,6 car/s · parlato 361,1 s

## Verifiche

- allineamento DTW e controllo delle pause: 0 blocchi fuori fascia; ogni confine cade in una pausa vera
- trascrizione dall'asset audio: A 100 %, B 100 %
- slide: 49 PNG guardati nei provini; nessuna sfora la cornice
- `controlli.py`: 8/8

## Grafica

- Grafiche nuove del modulo in `previdenza.mjs` (copiato di lezione in lezione): `varco` (la porta dell'anzianità, larga fino al 2026 e stretta dal 2027, con gli omini da 8 anni di iscrizione; fasi `porte`/`larga`/`stretta`), `secchio` (la posizione come barra fra capitale e rendita, con il cursore che si ferma a metà; fasi `meta`/`blocco`/`destra`/`rendita`/`tutto`).
- Qui: `varco` in s21, s23, s25 e s43; `tabella` vecchiaia/anzianità in s15–s18.

## Che cosa è andato storto e come si è deciso

- Prima stesura del copione: fra le anticipazioni avevo scritto «e le altre esigenze personali», che contraddice la 8.1 (per i pubblici solo tre motivi): corretto prima della voce.
- «Segnala sul calendario» (errore di senso): diventato «Scrivila sul calendario».
- Nel varco la barra rossa di stop copriva la porta stretta: sostituita con un cartello di divieto sopra il secondo omino; figura abbassata di 12 px perché sforava di 4.

## Costi

- voce: due generazioni ElevenLabs (A e B), nessuna rigenerata (sessioni in `perseo/sessioni-voce-m9.json`)
- trascrizioni: due, dall'asset audio

## La resa

- video HeyGen: `4a7377d8eef11d44186bac6dea69ff8f` — **completato**, 6:13,1 (373,1 s), 1920×1080,
  sottotitoli SRT. Pagina: https://app.heygen.com/videos/4a7377d8eef11d44186bac6dea69ff8f
- lotto asset `f1bddafa97b44f24990d6fc72d518552` (96 file)
- copia di controllo locale: `montato-9.1.mp4` 6:14,4 (non versionata) e `montato-9.1.srt`

## Da verificare — quello che non ho potuto giudicare io

- **Cessazione** del rapporto come requisito di ogni prestazione; passaggio fra enti aderenti e cambio di profilo non contano (dallo script).
- **Vecchiaia**: età della pensione pubblica (oggi 67) e 5 anni di iscrizione.
- **Anzianità**: cessazione, al massimo 10 anni prima della vecchiaia, 15 anni di iscrizione; deroga a 5 anni fino al 2026 (sito del Fondo, Statuto).
- **Senza 5 anni**: solo riscatto al 23%.
- «Dal 2027 un primo piccolo aumento» dell'età di vecchiaia: dallo script.
- Mie formulazioni: «i dieci anni si contano a ritroso da quell'età», l'esempio delle due persone con 8 anni nel 2026 e nel 2027.
- La voce non l'ho ascoltata: verifiche per trascrizione e per pause.
