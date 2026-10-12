# REGISTRO — Perseo Sirio senza segreti · 6.2 Rischio e rendimento senza paura

Data: 12 ottobre 2026 · sessione Claude Code (repo Prove, branch `claude/new-session-d7lx19`)
Metodo: `metodo/MASTER-PORTATILE.md` · parametri del corso: vedi `m1-l1.1-pensione/REGISTRO.md`

Modulo 6 · Dove vanno i tuoi soldi. Copione allungato a 6 minuti dallo script
`PS_M6_SCRIPT-VIDEO.md` e prodotto **senza approvazioni intermedie**, su indicazione dell'utente
(«Tutto, senza approvazioni»: moduli 2–7 di seguito, link alla fine di ogni modulo).

## Numeri della lezione

- 47 blocchi · 5.766 caratteri · 49 scene (copertina 3 s + 47 + chiusura 10 s)
- tracce: A 204,2 s grezzi (s02–s22) · B 186,1 s grezzi (s23–s48); stacco su cambio di capitolo
- ritmo: atempo 1,048, `MIRA` 16,6 car/s · parlato 352,6 s

## Verifiche

- allineamento DTW e controllo delle pause: 0 blocchi fuori fascia; ogni confine cade in una pausa vera
- trascrizione dall'asset audio: A 100 %, B 100 %
- slide: 49 PNG guardati nei provini; nessuna sfora la cornice
- `controlli.py`: 8/8

## Grafica

- Grafiche nuove del modulo in `previdenza.mjs` (copiato di lezione in lezione): `equazione` (versamenti + rendimenti − costi = pensione complementare, con «importo promesso in partenza» barrato), `partenze` (tre curve dell'interesse composto che partono a 25, 35 e 45 anni, 100 € al mese al 4%), `barre` (TFR contro linee più azionarie, dati COVIP), `linee` (due andamenti illustrativi su vent'anni, con la lente su un anno negativo), `pac` (40 € al mese su un prezzo che scende e risale: le quote comprate nei mesi bassi), `profili` (i sei profili come barre obbligazioni/azioni, Life Cycle a gradini), `lifecycle` (il percorso per età del Life Cycle, con i gradini a 45, 50, 55, 60 e 61 anni).
- Qui: `tabella` obbligazioni/azioni in s12, `linee` in s15–s19 (lente su un anno a −20% in s17–s18, «vent'anni: conta la direzione» in s19), `pac` in s26–s27, `tre` dei tre errori in s31–s35.

## Che cosa è andato storto e come si è deciso

- Nelle `linee` la parentesi «vent'anni» si sovrapponeva alla nota e al punto finale: spostata sotto l'asse.
- In s10 l'illustrazione era una cartellina: sostituita con `pilastri`.

## Costi

- voce: due generazioni ElevenLabs (A e B), nessuna rigenerata (sessioni in `perseo/sessioni-voce-m6.json`)
- trascrizioni: due, dall'asset audio

## La resa

- video HeyGen: `886875bb63edc00022187353c8597573` — **completato**, 6:04,6 (364,6 s), 1920×1080,
  sottotitoli SRT. Pagina: https://app.heygen.com/videos/886875bb63edc00022187353c8597573
- lotto asset `7343984d8997421598b124c4bc6554fd` (96 file)
- copia di controllo locale: `montato-6.2.mp4` 6:06,0 (non versionata) e `montato-6.2.srt`

## Da verificare — quello che non ho potuto giudicare io

- **Esempio del Fondo**: 40 € al mese (20 lavoratore + 20 ente) per vent'anni in un indice azionario mondiale — dallo script («sul suo sito»), da confrontare con la pagina del Fondo.
- «Un anno con il dieci o il venti per cento in meno è già successo»: aggiunta mia, generica.
- Le `linee` e il `pac` sono andamenti illustrativi inventati (scritto a schermo).
- I tre errori e la frase sul rischio come «ampiezza delle oscillazioni»: dallo script.
- «Né sui consigli del collega al bar»: aggiunta mia, da valutare il tono.
- La voce non l'ho ascoltata: verifiche per trascrizione e per pause.
