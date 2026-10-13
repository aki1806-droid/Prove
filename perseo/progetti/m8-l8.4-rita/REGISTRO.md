# REGISTRO — Perseo Sirio senza segreti · 8.4 La RITA

Data: 12 ottobre 2026 · sessione Claude Code (repo Prove, branch `claude/new-session-d7lx19`)
Metodo: `metodo/MASTER-PORTATILE.md` · parametri del corso: vedi `m1-l1.1-pensione/REGISTRO.md`

Modulo 8 · Prima della pensione. Copione allungato a 6 minuti dallo script
`PS_M8_SCRIPT-VIDEO.md` e prodotto **senza approvazioni intermedie**, su indicazione dell'utente
(«Tutto, senza approvazioni»: moduli 2–10 di seguito, link alla fine di ogni modulo).

## Numeri della lezione

- 47 blocchi · 5.756 caratteri · 49 scene (copertina 3 s + 47 + chiusura 10 s)
- tracce: A 180,3 s grezzi (s02–s21) · B 213,5 s grezzi (s22–s48); stacco su cambio di capitolo
- ritmo: atempo 1,043, `MIRA` 16,6 car/s · parlato 348,8 s

## Verifiche

- allineamento DTW e controllo delle pause: 0 blocchi fuori fascia; ogni confine cade in una pausa vera
- trascrizione dall'asset audio: A 99,1 % (solo «tra» trascritto «fra»), B 99,8 %
- slide: 49 PNG guardati nei provini; nessuna sfora la cornice
- `controlli.py`: 8/8

## Grafica

- Grafiche nuove o estese del modulo in `previdenza.mjs` (copiato di lezione in lezione): `tasche` fase `anticipo` (la tasca reale con la freccia «si può anticipare, anche tutta», quella figurativa con il lucchetto), `ponte` (due enti collegati da un ponte, la posizione che attraversa; `insegne` per un altro fondo), `ingressi` con `chiusa` (fessura dell'ente sbarrata) e `senzaBase`; illustrazioni nuove `lucchetto` ed `euro`.
- Figura nuova `rita`: la posizione divisa fra «RITA» e «resta nel Fondo», la linea dalla cessazione alla vecchiaia, le monete delle rate trimestrali (fasi `linea`/`rate`/`resto`). Qui in s02, s05, s16–s17, s21, s34, s44.
- `tabella` delle due strade in s08–s12 e s40, `scala` in s25.

## Che cosa è andato storto e come si è deciso

- Per la slide «un tema delicato» (anticipo della 8.5) il cuore con il tracciato era fuori luogo: sostituito con le mani.

## Costi

- voce: due generazioni ElevenLabs (A e B), nessuna rigenerata (sessioni in `perseo/sessioni-voce-m8.json`)
- trascrizioni: due, dall'asset audio

## La resa

- video HeyGen: `3123297ae96a3094e2a3c32cf82fe344` — **completato**, 6:00,9 (360,9 s), 1920×1080,
  sottotitoli SRT. Pagina: https://app.heygen.com/videos/3123297ae96a3094e2a3c32cf82fe344
- lotto asset `a8d7a589395f4f72bb26a296bfcd1599` (96 file)
- copia di controllo locale: `montato-8.4.mp4` 6:02,2 (non versionata) e `montato-8.4.srt`

## Da verificare — quello che non ho potuto giudicare io

- **Due strade**: A) cessazione, 20 anni di contributi, al massimo 5 anni alla vecchiaia; B) senza lavoro da oltre 24 mesi, al massimo 10 anni; per entrambe 5 anni di partecipazione.
- **Rate trimestrali**, quota investita di norma nel Garantito salvo diversa scelta; quota associativa 10 € l'anno invece di 13.
- **Tassazione 15%→9%**; la RITA si può revocare; trasferire la posizione la revoca.
- **Esempio mio**: 40.000 € destinati, 20 rate → circa 2.000 € a rata, prima delle tasse.
- «Oggi 67 anni» come età di vecchiaia.
- La voce non l'ho ascoltata: verifiche per trascrizione e per pause.
