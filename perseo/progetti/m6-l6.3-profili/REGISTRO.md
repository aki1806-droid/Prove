# REGISTRO — Perseo Sirio senza segreti · 6.3 Tre comparti, sei profili

Data: 12 ottobre 2026 · sessione Claude Code (repo Prove, branch `claude/new-session-d7lx19`)
Metodo: `metodo/MASTER-PORTATILE.md` · parametri del corso: vedi `m1-l1.1-pensione/REGISTRO.md`

Modulo 6 · Dove vanno i tuoi soldi. Copione allungato a 6 minuti dallo script
`PS_M6_SCRIPT-VIDEO.md` e prodotto **senza approvazioni intermedie**, su indicazione dell'utente
(«Tutto, senza approvazioni»: moduli 2–7 di seguito, link alla fine di ogni modulo).

## Numeri della lezione

- 47 blocchi · 5.756 caratteri · 49 scene (copertina 3 s + 47 + chiusura 10 s)
- tracce: A 199,5 s grezzi (s02–s25) · B 172,6 s grezzi (s26–s48); stacco su cambio di capitolo
- ritmo: atempo 0,998, `MIRA` 16,6 car/s · parlato 351,6 s

## Verifiche

- allineamento DTW e controllo delle pause: 0 blocchi fuori fascia; ogni confine cade in una pausa vera
- trascrizione dall'asset audio: A 99,2 % (s04 «Perseo Sirio» trascritto «Per SeoSirio», resa corretta all'ascolto), B 99,8 %
- slide: 49 PNG guardati nei provini; nessuna sfora la cornice
- `controlli.py`: 8/8

## Grafica

- Grafiche nuove del modulo in `previdenza.mjs` (copiato di lezione in lezione): `equazione` (versamenti + rendimenti − costi = pensione complementare, con «importo promesso in partenza» barrato), `partenze` (tre curve dell'interesse composto che partono a 25, 35 e 45 anni, 100 € al mese al 4%), `barre` (TFR contro linee più azionarie, dati COVIP), `linee` (due andamenti illustrativi su vent'anni, con la lente su un anno negativo), `pac` (40 € al mese su un prezzo che scende e risale: le quote comprate nei mesi bassi), `profili` (i sei profili come barre obbligazioni/azioni, Life Cycle a gradini), `lifecycle` (il percorso per età del Life Cycle, con i gradini a 45, 50, 55, 60 e 61 anni).
- Qui: `tre` dei tre comparti in s08 e s13–s14, `tabella` dei rendimenti 2025 in s16, `profili` in s18–s25 e s30, `cifre` «100% in azioni» in s29.

## Che cosa è andato storto e come si è deciso

- Nei riquadri dei comparti i testi andavano a capo male: accorciati in «Il più prudente», «Titoli di debito», «Soprattutto azioni».

## Costi

- voce: due generazioni ElevenLabs (A e B), nessuna rigenerata (sessioni in `perseo/sessioni-voce-m6.json`)
- trascrizioni: due, dall'asset audio

## La resa

- in corso

## Da verificare — quello che non ho potuto giudicare io

- **Rendimenti netti 2025** dei comparti: 2,70 % (Garantito), 2,17 % (Obbligazionario), 6,29 % (Azionario) — dalla Nota informativa, da ricontrollare sull'ultima versione.
- Garantito attivo dal 2015; Obbligazionario e Azionario dal dicembre 2023, con criteri ESG.
- I casi in cui vale la garanzia del Garantito (restituzione almeno dei contributi versati, al netto di spese e somme ritirate, in caso di pensione, decesso, invalidità, anticipazioni e riscatto per perdita del lavoro): dallo script, da confrontare con la Nota informativa.
- Il comparto Azionario al 100 % solo tramite Life Cycle fino a 45 anni.
- Questionario di autovalutazione e consulenza: dallo script.
- «Spesso il profilo viene assegnato in automatico» è mia formulazione.
- La voce non l'ho ascoltata: verifiche per trascrizione e per pause.
