# REGISTRO — Perseo Sirio senza segreti · 6.6 Cambiare idea: switch e questionario

Data: 12 ottobre 2026 · sessione Claude Code (repo Prove, branch `claude/new-session-d7lx19`)
Metodo: `metodo/MASTER-PORTATILE.md` · parametri del corso: vedi `m1-l1.1-pensione/REGISTRO.md`

Modulo 6 · Dove vanno i tuoi soldi. Copione allungato a 6 minuti dallo script
`PS_M6_SCRIPT-VIDEO.md` e prodotto **senza approvazioni intermedie**, su indicazione dell'utente
(«Tutto, senza approvazioni»: moduli 2–7 di seguito, link alla fine di ogni modulo).

## Numeri della lezione

- 47 blocchi · 5.789 caratteri · 49 scene (copertina 3 s + 47 + chiusura 10 s)
- tracce: A 182,2 s grezzi (s02–s22) · B 216,8 s grezzi (s23–s48); stacco su cambio di capitolo
- ritmo: atempo 0,993, `MIRA` 16,6 car/s · parlato 352,2 s

## Verifiche

- allineamento DTW e controllo delle pause: 0 blocchi fuori fascia; ogni confine cade in una pausa vera
- trascrizione dall'asset audio: A 100 %, B 100 %
- slide: 49 PNG guardati nei provini; nessuna sfora la cornice
- `controlli.py`: 8/8

## Grafica

- Grafiche nuove del modulo in `previdenza.mjs` (copiato di lezione in lezione): `equazione` (versamenti + rendimenti − costi = pensione complementare, con «importo promesso in partenza» barrato), `partenze` (tre curve dell'interesse composto che partono a 25, 35 e 45 anni, 100 € al mese al 4%), `barre` (TFR contro linee più azionarie, dati COVIP), `linee` (due andamenti illustrativi su vent'anni, con la lente su un anno negativo), `pac` (40 € al mese su un prezzo che scende e risale: le quote comprate nei mesi bassi), `profili` (i sei profili come barre obbligazioni/azioni, Life Cycle a gradini), `lifecycle` (il percorso per età del Life Cycle, con i gradini a 45, 50, 55, 60 e 61 anni), `switch` (due barattoli, profilo di oggi e nuovo profilo, con il rubinetto dei versamenti: si sposta tutta la posizione, o solo il rubinetto).
- Qui: `tre` delle regole in s10, s13 e s15, `switch` in s17–s21 (fase `base`, poi `tutto`, poi `futuro`), `tabella` buoni/cattivi motivi in s25–s29, `linee` fase `venti` in s31, `tasche` in s36–s37.

## Che cosa è andato storto e come si è deciso

- La frase-memo andava a capo lasciando «vita.» da sola: sullo schermo ho usato la formula dello script, «Si cambia per la vita, non per la borsa.»

## Costi

- voce: due generazioni ElevenLabs (A e B), nessuna rigenerata (sessioni in `perseo/sessioni-voce-m6.json`)
- trascrizioni: due, dall'asset audio

## La resa

- video HeyGen: `9b7af6795d846740023086762da824ff` — **completato**, 6:04,2 (364,2 s), 1920×1080,
  sottotitoli SRT. Pagina: https://app.heygen.com/videos/9b7af6795d846740023086762da824ff
- lotto asset `3e4c12d8205a4326850e1d54e86a31c9` (96 file)
- copia di controllo locale: `montato-6.6.mp4` 6:05,6 (non versionata) e `montato-6.6.srt`

## Da verificare — quello che non ho potuto giudicare io

- **Regole dello switch**: almeno 12 mesi di permanenza e 12 mesi tra un cambio e l'altro; con la nuova gestione finanziaria il primo cambio subito — dallo script, da confrontare con la Nota informativa vigente.
- **Silenzio-assenso e aderenti contrattuali** possono lasciare il profilo di partenza in qualunque momento (Statuto): dallo script.
- **Nessun costo** per spostare posizione e versamenti futuri (Nota informativa): dallo script. «Nessuna commissione, nessuna penale» è mia parafrasi.
- Lo spostamento dei soli versamenti futuri «in alcuni casi» e il rinvio al **Regolamento multicomparto**: dallo script, da verificare sul sito del Fondo.
- Il contenuto del questionario («età, obiettivi, reazione a un calo») e gli esempi «un figlio, una casa, un nuovo lavoro» sono miei.
- La voce non l'ho ascoltata: verifiche per trascrizione e per pause.
