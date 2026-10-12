# REGISTRO — Perseo Sirio senza segreti · 6.4 Life Cycle: il pilota automatico

Data: 12 ottobre 2026 · sessione Claude Code (repo Prove, branch `claude/new-session-d7lx19`)
Metodo: `metodo/MASTER-PORTATILE.md` · parametri del corso: vedi `m1-l1.1-pensione/REGISTRO.md`

Modulo 6 · Dove vanno i tuoi soldi. Copione allungato a 6 minuti dallo script
`PS_M6_SCRIPT-VIDEO.md` e prodotto **senza approvazioni intermedie**, su indicazione dell'utente
(«Tutto, senza approvazioni»: moduli 2–7 di seguito, link alla fine di ogni modulo).

## Numeri della lezione

- 47 blocchi · 5.743 caratteri · 49 scene (copertina 3 s + 47 + chiusura 10 s)
- tracce: A 208,5 s grezzi (s02–s23) · B 194,0 s grezzi (s24–s48); stacco su cambio di capitolo
- ritmo: atempo 0,996, `MIRA` 16,6 car/s · parlato 350,7 s

## Verifiche

- allineamento DTW e controllo delle pause: 0 blocchi fuori fascia; ogni confine cade in una pausa vera
- trascrizione dall'asset audio: A 99,4 %, B 99,6 %
- slide: 49 PNG guardati nei provini; nessuna sfora la cornice
- `controlli.py`: 8/8

## Grafica

- Grafiche nuove del modulo in `previdenza.mjs` (copiato di lezione in lezione): `equazione` (versamenti + rendimenti − costi = pensione complementare, con «importo promesso in partenza» barrato), `partenze` (tre curve dell'interesse composto che partono a 25, 35 e 45 anni, 100 € al mese al 4%), `barre` (TFR contro linee più azionarie, dati COVIP), `linee` (due andamenti illustrativi su vent'anni, con la lente su un anno negativo), `pac` (40 € al mese su un prezzo che scende e risale: le quote comprate nei mesi bassi), `profili` (i sei profili come barre obbligazioni/azioni, Life Cycle a gradini), `lifecycle` (il percorso per età del Life Cycle, con i gradini a 45, 50, 55, 60 e 61 anni), `switch` (due barattoli, profilo di oggi e nuovo profilo, con il rubinetto dei versamenti: si sposta tutta la posizione, o solo il rubinetto).
- Qui: `lifecycle` fase `percorso` in s08–s14 e s44, fase `due` (zoom sulle età 42–68) in s28–s29, `cifre` del costo zero in s16 e del neoassunto di 25 anni in s23, `confronto` silenzio-assenso in s21.

## Che cosa è andato storto e come si è deciso

- Nel `lifecycle` l'aereo e le etichette delle età si sovrapponevano alla linea: riposizionati.
- Nella fase `due` le due uscite erano troppo vicine: vista ingrandita sulle età 42–68.
- In s04 l'illustrazione non c'entrava: sostituita con `orologio`.

## Costi

- voce: due generazioni ElevenLabs (A e B), nessuna rigenerata (sessioni in `perseo/sessioni-voce-m6.json`)
- trascrizioni: due, dall'asset audio

## La resa

- video HeyGen: `0f66361d04a1646458fff85896d86b23` — **completato**, 6:02,8 (362,8 s), 1920×1080,
  sottotitoli SRT. Pagina: https://app.heygen.com/videos/0f66361d04a1646458fff85896d86b23
- lotto asset `3531b97c98f7457dba73f97fb6c3050f` (96 file)
- copia di controllo locale: `montato-6.4.mp4` 6:04,1 (non versionata) e `montato-6.4.srt`

## Da verificare — quello che non ho potuto giudicare io

- **Gradini del Life Cycle** a 45, 50, 55, 60 e 61 anni (fino a 45 tutto Azionario, da 61 tutto Garantito): da confrontare con la Nota informativa vigente.
- Life Cycle profilo di default dal dicembre 2023 per chi aderisce con il modulo senza scegliere e per gli aderenti contrattuali della polizia locale: dallo script.
- Chi entra per silenzio-assenso parte dal Garantito e ci resta finché non cambia: dallo script.
- «Nessun costo per gli spostamenti» automatici tra comparti: dallo script.
- L'esempio dei due colleghi di 61 anni con uscite diverse è mio.
- La voce non l'ho ascoltata: verifiche per trascrizione e per pause.
